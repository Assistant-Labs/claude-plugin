#!/usr/bin/env node
/**
 * Assistant Labs — the outbound audit trail.
 *
 * PostToolUse hook. Records what actually happened, not what was proposed.
 * A proposal and a send look identical in a transcript days later, and the
 * owner is entitled to a list of everything that went out in their name.
 *
 * Writes `.assistantlabs/outbound.jsonl` in the project. One line per event, append
 * only. Silent, and silent about its own failures — an audit log that breaks a
 * send is worse than one that misses a line.
 */

const fs = require('fs');
const path = require('path');

/**
 * `ask_owner_to_approve` belongs here even though the gate lets it through: it
 * carries the exact text a customer will receive, and a tap on the owner's
 * phone sends it. The proposal is the only record of what was put in front of
 * them, and it is written from here — nowhere else in this session sees it.
 */
const RECORDED =
	/(send_message_to_customer|send_whatsapp_template|send_email|send_message|create_whatsapp_template|attach_group_to_journey|notify_owner|ask_owner_to_approve|create_task|update_task|patch_agent_module|set_extra_instructions|update_contact|api_request)/;

try {
	const payload = JSON.parse(fs.readFileSync(0, 'utf8'));
	const tool = payload.tool_name || '';
	if (!RECORDED.test(tool)) process.exit(0);

	const dir = path.join(payload.cwd || process.cwd(), '.assistantlabs');
	fs.mkdirSync(dir, { recursive: true });

	// The response can be large; keep enough to prove what happened without
	// copying a customer's whole conversation into a log file.
	const result = JSON.stringify(payload.tool_response ?? null);

	fs.appendFileSync(
		path.join(dir, 'outbound.jsonl'),
		`${JSON.stringify({
			at: new Date().toISOString(),
			stage: 'done',
			tool,
			input: payload.tool_input ?? null,
			result: result && result.length > 2000 ? `${result.slice(0, 2000)}…` : result,
		})}\n`,
	);
} catch {
	// never surface
}
process.exit(0);
