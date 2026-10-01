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
	// An email campaign starting: everyone in the audience, and no recall.
	'launch_email_campaign',
	'resume_email_campaign',
	// A "test" is still mail from the business, to whatever address was typed.
	'send_campaign_test_email',
	'send_email_template_test',
];

/** Public, in the business's name, and not recallable from here. */
const PUBLIC = ['publish_post', 'retry_failed_channels'];

/**
 * The business's ad account. Switching an ad on spends its budget every day
 * until someone pauses it; pushing one to Meta creates it there, and re-pushes
 * a running one live.
 */
const SPEND = ['activate_ad', 'launch_ad'];

/**
 * Saving one of these switched off is ordinary drafting. `enabled: true` is
 * the moment it starts answering or chasing real people with nobody reading
 * each send — so the gate is on the switch, not on the tool.
 */
const SWITCH_ON = [
	'create_instagram_automation',
	'update_instagram_automation',
	'update_follow_up',
];

/** Anything irreversible. */
const DESTRUCTIVE = /(^|_)(delete|remove|disconnect|revoke|cancel|purge)_/;

/**
 * The escape hatches reach any `/api/v1` path, so a red action can arrive
 * wearing a generic name. Judge them by the path they are about to call. The
 * server splits them one per verb (`api_request` is the old single one).
 */
const ESCAPE_HATCHES = new Set([
	'api_request',
	'api_create',
	'api_update',
	'api_replace',
	'api_delete',
]);
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

	if (PUBLIC.includes(short)) {
		return [
			'This goes out publicly on the business\'s social accounts and cannot be recalled from here.',
			'The owner approves the exact post, once, for this one publish.',
		].join(' ');
	}

	if (SPEND.includes(short)) {
		return short === 'activate_ad'
			? 'This switches an ad on: it spends the daily budget from the business\'s ad account until it is paused. The owner approves the ad, the budget and the audience first.'
			: 'This creates the ad on the business\'s Meta ad account (an ad that is already running is re-pushed live). The owner approves the ad, the budget and the audience first.';
	}

	if (SWITCH_ON.includes(short) && input?.enabled === true) {
		return [
			'This switches it on: from now it messages real people by itself, with nobody reading each send.',
			'Save it switched off, show the owner exactly what it says and to whom, and switch it on only on their yes.',
		].join(' ');
	}

	if (ESCAPE_HATCHES.has(short)) {
		const target = `${input?.path || ''} ${input?.url || ''}`;
		if (OUTBOUND_PATH.test(target)) {
			return `This call reaches customers or money (${target.trim()}). It needs the owner's yes, not a workaround through a generic endpoint.`;
		}
		if (short === 'api_delete') {
			return `This deletes ${target.trim()} and cannot be undone. Confirm with the owner, and say exactly what disappears.`;
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
