#!/usr/bin/env node
/**
 * AssistantLabs — session start.
 *
 * Tells the session, before it does anything, how to find out which business it
 * runs. A session that starts without knowing is a stranger with API access,
 * and the failure is invisible: it just answers generically and confidently.
 *
 * **What this hook can and cannot know.** A hook is a local process with no
 * network and no MCP. Setup lives in the workspace — the app's own four steps,
 * returned by `get_workspace_setup` — and the business memory lives there too,
 * so both survive a new laptop and are the same in the app and in every client.
 * This hook only says where to look; it never guesses the answer from a file.
 */

const fs = require('fs');

function main() {
	try {
		fs.readFileSync(0, 'utf8');
	} catch {
		// no stdin is fine
	}

	const autonomy = process.env.CLAUDE_PLUGIN_OPTION_AUTONOMY || 'standard';

	const context = [
		'# AssistantLabs',
		'',
		'**Find out where this business stands before any business work:** call',
		'`get_workspace_setup`. Only a call you just made is evidence.',
		'',
		'- **It fails, or the tool is not here:** they are not connected yet. If they ask',
		'  for business work, run `/al` — the only start command. It welcomes them and',
		'  hands over the connector. Do not answer business questions generically in the',
		'  meantime; say plainly it is not connected.',
		'- **Setup is not finished:** `/al` picks up at the first open step. Never walk',
		'  them back through a step the workspace already has.',
		'- **Set up:** read the `assistantlabs` skill, then `list_business_memory`, what is',
		'  waiting on the owner (`list_tasks` with status `blocked-on-a-human`) and who is',
		'  owed a reply.',
		'',
		'The plugin ships no connection of its own: AssistantLabs arrives as the',
		"connector they add on claude.ai, which Claude Code loads from their account.",
		'',
		`Autonomy: **${autonomy}**.`,
		autonomy === 'supervised'
			? 'The owner wants to approve anything that leaves the building, including reversible fixes.'
			: 'Act on reversible internal work. Stop for anything reaching a customer, moving money, or that cannot be undone.',
	].join('\n');

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
