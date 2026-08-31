#!/usr/bin/env node
/**
 * Assistant Labs — session start.
 *
 * Tells the session, before it does anything, whether this project is connected
 * to a business at all. A session that starts without knowing which business it
 * operates is a stranger with API access, and the failure is invisible: it just
 * answers generically and confidently.
 *
 * **What this hook can and cannot know.** A hook is a local process with no
 * network and no MCP, so it can report the SETUP state — which is written to
 * disk by `/al-setup` — but it cannot read the business memory, which lives in the
 * workspace. That split is deliberate: memory moved off the machine so it would
 * survive a new laptop and be readable by a scheduled run. The cost is that
 * "what do we know about this business?" is a question for the session to ask
 * with `list_business_memory`, not something a startup hook can answer.
 */

const fs = require('fs');
const path = require('path');

/**
 * Every setup step, in the order they unlock each other, with what to say when
 * one is outstanding.
 *
 * `required` is the whole point of this table. A step is required only when the
 * operator cannot run the business at all without it — an account, a connection,
 * an agent, a channel for customers to arrive on, and enough memory not to be a
 * stranger. Everything else is real value the business is free to decline.
 *
 * Getting this wrong in either direction is a product bug:
 * - Marking an optional step required holds setup at "unfinished" forever for
 *   every business that does not want it, and a warning that is permanently on
 *   is a warning nobody reads.
 * - Marking a required step optional lets setup report itself finished while the
 *   operator cannot actually do anything.
 *
 * `/al-setup` and `/al-status` write what they establish into
 * `.assistantlabs/setup.json`, and this reads it back — which is what turns a
 * long setup into one that can be stopped and picked up, instead of one that
 * silently starts from the top every time.
 *
 * **Each step has THREE states, and the third is the one that earns its keep:**
 * `true` = done, `'skipped'` = offered and declined, absent = never offered.
 * Without the middle state an optional step either nags every session or is
 * offered once and lost. `'skipped'` is only meaningful on an optional step; on
 * a required one it is treated as still outstanding, because declining an
 * account does not produce a working operator.
 */
const STEPS = [
	{ key: 'account', required: true, what: 'they have an Assistant Labs account' },
	{ key: 'connected', required: true, what: 'the connectors are authorised' },
	{ key: 'agent', required: true, what: 'an agent is chosen' },
	{
		key: 'channels',
		required: true,
		what: 'a channel customers actually use is live',
	},
	{ key: 'memory', required: true, what: 'the business is written down' },
	{
		key: 'ownerNumber',
		required: false,
		what: 'a number to reach them on when they are not in Claude',
		why: 'without it every decision waits on the board until they next open Claude',
	},
	{
		key: 'templates',
		required: false,
		what: 'the WhatsApp templates that carry updates and approvals',
		why: 'these are what let an approval reach their phone and execute on a tap',
	},
	{
		key: 'roles',
		required: false,
		what: 'who else works here — the finance person, whoever handles staff, who signs off what',
		why: 'so a question goes to the right person instead of always to the owner',
	},
	{
		key: 'brief',
		required: false,
		what: 'a scheduled morning brief',
		why: 'it is what makes the operator something that runs rather than something they open',
	},
];

const REQUIRED = STEPS.filter(step => step.required);

/** Done. `'skipped'` counts as settled for an optional step only. */
const isSettled = (state, step) => {
	const value = state?.steps?.[step.key];
	if (value === true) return true;
	return !step.required && value === 'skipped';
};

/** What `/al-setup` has established so far. Absent = never started. */
const readSetupState = dir => {
	try {
		const raw = fs.readFileSync(
			path.join(dir, '.assistantlabs', 'setup.json'),
			'utf8',
		);
		const parsed = JSON.parse(raw);
		return parsed && typeof parsed === 'object' ? parsed : null;
	} catch {
		return null;
	}
};

function main() {
	let cwd = process.cwd();
	try {
		const payload = JSON.parse(fs.readFileSync(0, 'utf8'));
		if (payload.cwd) cwd = payload.cwd;
	} catch {
		// no stdin is fine
	}

	const autonomy = process.env.CLAUDE_PLUGIN_OPTION_AUTONOMY || 'standard';
	const state = readSetupState(cwd);

	/**
	 * What setup still owes. Only steps explicitly recorded as done are treated
	 * as done — an unrecorded step is outstanding, because assuming otherwise is
	 * how a half-finished setup reports itself complete.
	 */
	const missingRequired = state
		? REQUIRED.filter(step => !isSettled(state, step))
		: null;
	/** Optional steps nobody has offered yet. Declined ones stay declined. */
	const unoffered = state
		? STEPS.filter(step => !step.required && !isSettled(state, step))
		: [];

	let context;

	if (!state) {
		context = [
			'# Assistant Labs',
			'',
			'**Not set up in this project.** The operator does not know which business it',
			"runs, so it cannot act on anyone's behalf yet.",
			'',
			'If the user asks for business work, run `/al` — the front door. It',
			'works out where they are and takes them one step forward, including the case',
			'where they have no account, no agent and no connected channel. Read',
			'`getting-started` rather than assuming they are an existing customer.',
			'',
			'Do not answer business questions generically in the meantime; say plainly that',
			'it is not set up.',
		].join('\n');
	} else if (missingRequired && missingRequired.length) {
		// The most valuable state to get right: they started and stopped. Saying
		// "not set up" here would restart a long conversation they were most of
		// the way through, and saying nothing would leave it unfinished forever.
		const done = REQUIRED.length - missingRequired.length;
		context = [
			'# Assistant Labs',
			'',
			`**Setup is ${done}/${REQUIRED.length} done and was interrupted.**`,
			state.assistantName ? `Agent: ${state.assistantName}` : null,
			'',
			'Still outstanding:',
			...missingRequired.map(step => `- ${step.key} — ${step.what}`),
			'',
			'`/al-setup` picks up from here — it re-checks what is recorded rather than',
			'starting again, so do not walk them back through what is already done.',
			'`/al-status` shows this without changing anything.',
			'',
			'Work that does not depend on an outstanding step can proceed normally.',
		]
			.filter(line => line !== null)
			.join('\n');
	} else {
		context = [
			'# Assistant Labs',
			'',
			`Set up and connected${state.assistantName ? ` — agent: ${state.assistantName}` : ''}.`,
			'',
			'**This hook cannot see the business memory** — it lives in the workspace, not',
			'on this machine. Run `list_business_memory` before acting on the business:',
			'it shows what is known and how full each page is, and an empty page is a gap',
			'to fill from the next natural conversation.',
			'',
			`Autonomy: **${autonomy}**.`,
			autonomy === 'supervised'
				? 'The owner wants to approve anything that leaves the building, including reversible fixes.'
				: 'Act on reversible internal work. Stop for anything reaching a customer, moving money, or that cannot be undone.',
			'',
			'Before business work: read the `assistantlabs` skill, then check what is waiting on',
			'the owner (`list_tasks` with status `blocked-on-a-human`) and who is owed a',
			'reply.',
			...(unoffered.length
				? [
						'',
						'**Optional, and never offered.** Worth one question each when the',
						'conversation reaches it naturally — never a form, and never a nag:',
						...unoffered.map(
							step => `- ${step.what}${step.why ? ` — ${step.why}` : ''}`,
						),
						'If they would rather not, record that step as `"skipped"` so nobody',
						'asks again. Setup is COMPLETE either way.',
					]
				: []),
		]
			.filter(line => line !== null)
			.join('\n');
	}

	process.stdout.write(
		JSON.stringify({
			hookSpecificOutput: {
				hookEventName: 'SessionStart',
				additionalContext: context,
			},
		}),
	);
}

try {
	main();
} catch {
	// A broken briefing must never stop a session.
}
process.exit(0);
