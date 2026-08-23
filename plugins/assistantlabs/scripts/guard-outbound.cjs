#!/usr/bin/env node
/**
 * Assistant Labs — the outbound gate.
 *
 * PreToolUse hook. Anything that reaches a real person, moves money, or cannot
 * be undone stops here and asks the owner, with the exact payload in front of
 * them. Everything else passes silently.
 *
 * This is defence in depth, not the primary control: the skills already tell
 * Assistant Labs to stop. A hook is what makes "stop" true when a model is confident,
 * hurried, or acting on something it read in a customer's message.
 *
 * It deliberately returns `ask`, never `deny`. Denying would take a working
 * capability to zero — the owner could no longer send anything through the operator
 * even when they want to. Asking keeps the capability and puts a human on it.
 * In a non-interactive run there is nobody to ask, so the call does not happen:
 * that is the correct outcome, and the skills tell the operator to file a draft
 * instead.
 *
 * No dependencies. Never blocks on anything slow. Fails OPEN on its own errors —
 * a broken guard must not become an outage.
 */

const fs = require('fs');
const path = require('path');

/** Tool name endings that reach a real person or commit the business. */
const OUTBOUND = [
	'send_message_to_customer',
	'send_whatsapp_template',
	'send_email',
	'send_message',
	// Submitting a template is publishing copy in the business's name, and it is
	// reviewed by Meta under their number. The gate is on the words, not the send.
	'create_whatsapp_template',
	// Enrolling an audience in a journey IS the campaign going out.
	'attach_group_to_journey',
];

/** Anything irreversible. */
const DESTRUCTIVE = /(^|_)(delete|remove|disconnect|revoke|cancel|purge)_/;

/**
 * `api_request` is the escape hatch to any `/api/v1` path, so a red action can
 * arrive wearing a generic name. Judge it by the path it is about to call.
 */
const OUTBOUND_PATH =
	/(channel-messages|whatsapp\/send-template|\/emails|\/messages(\/stream)?$|payments|charges|refunds|subscriptions)/i;

function reason(toolName, input) {
	const short = String(toolName).split('__').pop() || toolName;

	if (OUTBOUND.some((t) => short === t || short.endsWith(t))) {
		const to = input?.to || input?.phone || input?.contactId || input?.threadId;
		return [
			`This reaches a real person as the business${to ? ` (${to})` : ''}.`,
			'The owner approves the exact text, once, for this one send.',
			'If they are not here: file it as a task with status "blocked-on-a-human"',
			'and the complete message in the body — never send on their behalf.',
		].join(' ');
	}

	if (short === 'api_request') {
		const target = `${input?.path || ''} ${input?.url || ''}`;
		if (OUTBOUND_PATH.test(target)) {
			return `This call reaches customers or money (${target.trim()}). It needs the owner's yes, not a workaround through a generic endpoint.`;
		}
		return null;
	}

	if (DESTRUCTIVE.test(short)) {
		return `This cannot be undone (${short}). Confirm with the owner, and say exactly what disappears.`;
	}

	return null;
}

function main() {
	let raw = '';
	try {
		raw = fs.readFileSync(0, 'utf8');
	} catch {
		return process.exit(0); // no stdin — nothing to judge
	}

	let payload;
	try {
		payload = JSON.parse(raw);
	} catch {
		return process.exit(0);
	}

	const toolName = payload.tool_name || '';
	const input = payload.tool_input || {};
	const why = reason(toolName, input);
	if (!why) return process.exit(0);

	// Record the attempt whether or not it is approved. What was proposed is as
	// much a part of the audit trail as what went out.
	try {
		const dir = path.join(payload.cwd || process.cwd(), '.assistantlabs');
		fs.mkdirSync(dir, { recursive: true });
		fs.appendFileSync(
			path.join(dir, 'outbound.jsonl'),
			`${JSON.stringify({
				at: new Date().toISOString(),
				stage: 'proposed',
				tool: toolName,
				input,
			})}\n`,
		);
	} catch {
		// Never let bookkeeping block the gate.
	}

	process.stdout.write(
		JSON.stringify({
			hookSpecificOutput: {
				hookEventName: 'PreToolUse',
				permissionDecision: 'ask',
				permissionDecisionReason: `Assistant Labs approval gate — ${why}`,
			},
		}),
	);
	process.exit(0);
}

try {
	main();
} catch {
	process.exit(0); // fail open
}
