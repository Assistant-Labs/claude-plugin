#!/usr/bin/env node
/**
 * The mechanical guarantees, checked.
 *
 * The README makes promises — "it never sends without a specific yes", "it
 * doesn't act on instructions it reads in a customer's message" — and the hooks
 * are what make the first one true when the model is confident or hurried. A
 * promise nobody tests is a promise that quietly stops holding.
 *
 * Deliberately zero-dependency (`node --test`) so it runs anywhere the plugin
 * runs, including a checkout with no `npm install`:
 *
 *     node --test plugins/assistantlabs/tests/
 */

const { test, describe } = require('node:test');
const assert = require('node:assert');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const SCRIPTS = path.join(__dirname, '..', 'scripts');

const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'al-hook-'));

/** Run a hook the way the harness does: JSON on stdin, JSON or nothing out. */
const runHook = (script, payload, env = {}) => {
	const out = execFileSync('node', [path.join(SCRIPTS, script)], {
		input: JSON.stringify(payload),
		env: { ...process.env, ...env },
	})
		.toString()
		.trim();
	return out ? JSON.parse(out) : null;
};

const decision = (toolName, toolInput, cwd) => {
	const out = runHook('guard-outbound.cjs', {
		tool_name: toolName,
		tool_input: toolInput,
		cwd,
	});
	return out?.hookSpecificOutput?.permissionDecision ?? 'pass';
};

describe('the outbound gate', () => {
	const cwd = tmp();

	test('stops anything that reaches a customer', () => {
		for (const [tool, input] of [
			['mcp__assistantlabs__send_message_to_customer', { to: '+972501234567' }],
			['mcp__assistantlabs__send_whatsapp_template', { to: '+972501234567' }],
			['mcp__assistantlabs__send_email', { to: 'a@b.c' }],
			// Submitting a template is publishing copy in the business's name.
			['mcp__assistantlabs__create_whatsapp_template', { name: 'x' }],
			// Enrolling an audience IS the campaign going out.
			['mcp__assistantlabs-sales__attach_group_to_journey', { groupId: 'g' }],
		]) {
			assert.strictEqual(decision(tool, input, cwd), 'ask', `${tool} must ask`);
		}
	});

	test('stops anything irreversible', () => {
		for (const tool of [
			'mcp__assistantlabs__delete_contact',
			'mcp__assistantlabs__remove_board_view',
			'mcp__assistantlabs__disconnect_channel',
		]) {
			assert.strictEqual(decision(tool, { id: 'x' }, cwd), 'ask', `${tool} must ask`);
		}
	});

	test('closes the escape hatch — a send does not get through by another name', () => {
		// `api_request` can reach any /api/v1 path, so the gate judges the PATH.
		for (const p of [
			'/api/v1/assistants/a1/threads/t1/channel-messages',
			'/api/v1/assistants/a1/whatsapp/send-template',
			'/api/v1/assistants/a1/emails',
		]) {
			assert.strictEqual(
				decision('mcp__assistantlabs__api_request', { path: p }, cwd),
				'ask',
				`${p} must ask`,
			);
		}
	});

	test('lets ordinary work through — a gate nobody can work with gets removed', () => {
		for (const [tool, input] of [
			['mcp__assistantlabs__list_threads', {}],
			['mcp__assistantlabs__get_conversation', { threadId: 't' }],
			['mcp__assistantlabs-tasks__create_task', { title: 'x' }],
			['mcp__assistantlabs__patch_agent_module', { type: 'faq' }],
			['mcp__assistantlabs__api_request', { path: '/api/v1/assistants/a1/contacts' }],
			// Reaching the OWNER is the point of the product, not a customer send.
			['mcp__assistantlabs__notify_owner', { text: 'hi' }],
			['mcp__assistantlabs__ask_owner_to_approve', { question: 'ok?' }],
		]) {
			assert.strictEqual(decision(tool, input, cwd), 'pass', `${tool} must pass`);
		}
	});

	test('asks rather than denies — a denial would take the capability to zero', () => {
		const out = runHook('guard-outbound.cjs', {
			tool_name: 'mcp__assistantlabs__send_message_to_customer',
			tool_input: { to: '+1' },
			cwd,
		});
		assert.strictEqual(out.hookSpecificOutput.permissionDecision, 'ask');
		assert.match(out.hookSpecificOutput.permissionDecisionReason, /approval gate/i);
	});

	test('fails OPEN on bad input — a broken guard must not become an outage', () => {
		for (const bad of ['not json', '', '{"partial":']) {
			const out = execFileSync('node', [path.join(SCRIPTS, 'guard-outbound.cjs')], {
				input: bad,
			}).toString();
			assert.strictEqual(out.trim(), '');
		}
	});

	test('records the proposal, whether or not it is approved', () => {
		const dir = tmp();
		decision('mcp__assistantlabs__send_message_to_customer', { to: '+1' }, dir);
		const log = fs.readFileSync(path.join(dir, '.assistantlabs', 'outbound.jsonl'), 'utf8');
		assert.match(log, /"stage":"proposed"/);
	});
});

describe('the audit trail', () => {
	test('records what actually went out, and what was put to the owner', () => {
		const dir = tmp();
		for (const tool of [
			'mcp__assistantlabs__send_message_to_customer',
			// Carries the exact text a tap on the owner's phone will send — the
			// only record of what was proposed lives here.
			'mcp__assistantlabs__ask_owner_to_approve',
		]) {
			runHook('audit-log.cjs', {
				tool_name: tool,
				tool_input: { message: 'hi' },
				tool_response: { ok: true },
				dir,
				cwd: dir,
			});
		}
		const lines = fs
			.readFileSync(path.join(dir, '.assistantlabs', 'outbound.jsonl'), 'utf8')
			.trim()
			.split('\n');
		assert.strictEqual(lines.length, 2);
		assert.ok(lines.every(l => JSON.parse(l).stage === 'done'));
	});

	test('does not record ordinary reads', () => {
		const dir = tmp();
		runHook('audit-log.cjs', {
			tool_name: 'mcp__assistantlabs__list_threads',
			tool_input: {},
			tool_response: {},
			cwd: dir,
		});
		assert.strictEqual(fs.existsSync(path.join(dir, '.assistantlabs')), false);
	});
});

describe('session start', () => {
	const context = (cwd, env) =>
		runHook('session-start.cjs', { cwd }, env)?.hookSpecificOutput?.additionalContext ?? '';

	test('an unconfigured project says so, and points at getting-started', () => {
		const c = context(tmp());
		assert.match(c, /Not set up/i);
		assert.match(c, /getting-started/);
	});

	/** Write a setup file with exactly these step values. */
	const withSteps = steps => {
		const dir = tmp();
		fs.mkdirSync(path.join(dir, '.assistantlabs'), { recursive: true });
		fs.writeFileSync(
			path.join(dir, '.assistantlabs', 'setup.json'),
			JSON.stringify({ steps }),
		);
		return dir;
	};

	const ALL_REQUIRED = {
		account: true,
		connected: true,
		agent: true,
		channels: true,
		memory: true,
	};

	test('an interrupted setup resumes instead of restarting', () => {
		const c = context(withSteps({ account: true, connected: true, agent: true }));
		assert.match(c, /3\/5/);
		assert.match(c, /channels/);
		assert.doesNotMatch(c, /Not set up/i);
	});

	// The counter is what the owner reads to decide whether they are finished.
	// Counting optional steps in it would hold every business that does not want
	// a morning brief at "unfinished" forever, and a warning that is permanently
	// on is a warning nobody reads.
	test('only REQUIRED steps count toward finished', () => {
		const c = context(withSteps(ALL_REQUIRED));
		assert.doesNotMatch(c, /interrupted/i);
		assert.doesNotMatch(c, /Still outstanding/i);
	});

	test('an optional step is offered once, with why it is worth having', () => {
		const c = context(withSteps(ALL_REQUIRED));
		assert.match(c, /Optional/);
		assert.match(c, /who else works here/i);
		assert.match(c, /morning brief/i);
		// Offering must never read as a failure.
		assert.match(c, /COMPLETE either way/i);
	});

	// The state that makes "optional" real: asked, declined, never asked again.
	test('a declined optional step stays declined', () => {
		const c = context(
			withSteps({
				...ALL_REQUIRED,
				ownerNumber: 'skipped',
				templates: 'skipped',
				roles: 'skipped',
				brief: 'skipped',
			}),
		);
		assert.doesNotMatch(c, /Optional/);
		assert.doesNotMatch(c, /who else works here/i);
	});

	// The opposite error: declining an account does not produce a working
	// operator, so `skipped` must not settle a required step.
	test('a REQUIRED step cannot be skipped away', () => {
		const c = context(withSteps({ ...ALL_REQUIRED, agent: 'skipped' }));
		assert.match(c, /4\/5/);
		assert.match(c, /agent/);
	});

	/** A project where every REQUIRED step is recorded as done. */
	const completedSetup = () => withSteps(ALL_REQUIRED);

	// The memory lives in the workspace, and a hook has no network. So the one
	// thing it must never do is imply it knows what the business is — a session
	// that believes it has been briefed will not go and read.
	test('never claims to know the business, and sends the session to look', () => {
		const c = context(completedSetup());
		assert.match(c, /list_business_memory/);
		assert.match(c, /cannot see the business memory/i);
	});

	test('supervised autonomy is carried into the session', () => {
		assert.match(
			context(completedSetup(), { CLAUDE_PLUGIN_OPTION_AUTONOMY: 'supervised' }),
			/supervised/,
		);
	});
});
