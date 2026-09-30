# Assistant Labs for Codex and ChatGPT

An operator that runs your small business day to day — reads every
conversation, answers what it can, chases leads going cold, keeps the records
straight, and puts anything that needs you in front of you as one decision.

This is the OpenAI build. The Claude Code plugin is `plugins/assistantlabs` in
this same repository; both are generated from one set of operating rules, so
they behave the same way.

## Install

**1. Get the files.**

```bash
git clone https://github.com/Assistant-Labs/claude-plugin
cd claude-plugin/plugins/assistantlabs-codex
```

**2. Connect the data.** Append `config.toml.example` to your Codex config,
then sign in and tick the products you want:

```bash
cat config.toml.example >> ~/.codex/config.toml
codex mcp login assistantlabs
codex mcp list
```

**3. Install the operator.**

```bash
mkdir -p ~/.codex/skills
cp -R skills/* ~/.codex/skills/
```

For one project rather than the whole machine, copy them into `.agents/skills/`
in that repo and put `AGENTS.md` at its root instead.

**4. Start.** Open Codex and ask for what you want — "brief me", "who is
waiting", "what needs me". Codex loads the matching skill on its own.

## What is in here

| | |
|---|---|
| `skills/` | The operator. The skills that carry the operating rules, plus one per task you will ask for most days (`brief`, `waiting`, `needs-me`, `leads`, `money`, `agent-review`, `autopilot`, …). Begin with `start`. |
| `agents/` | Research briefs for the deeper sweeps — customer health, lead scouting, money checks. |
| `AGENTS.md` | Project-level entry point, if you want the operator scoped to one repo. |
| `config.toml.example` | The MCP connection — one address for every product. |

Codex keeps only skill *descriptions* in context and loads a skill's full
instructions when a task matches it, so the whole set costs almost nothing
until it is used.

## What differs from the Claude Code plugin

The rules, the skills and the connection are identical. Four mechanical
differences, and one of them matters:

1. **No slash commands.** Codex deprecated custom prompts in favour of skills,
   so `/al-brief` is a `brief` skill — ask for it by name or in your own words.
2. **No client-side outbound guard.** This is the one that matters. The Claude
   Code plugin adds a `PreToolUse` hook that intercepts an outbound tool call
   and puts it in front of you before it runs. **Codex's `PreToolUse` fires on
   shell commands only, never on MCP tool calls**, so that layer does not exist
   here and cannot be built with a hook.

   What still holds: the skills stop for approval (which was always the primary
   control — the hook was defence in depth), and **the server only ever hands
   the model the tools your granted permissions allow**, so a read-only
   connection is never shown a tool that could send anything. That gate is
   server-side and applies to every client.

   If you want the hard stop, connect read-only and approve sends yourself in
   Assistant Labs.
3. **Two commands are not here.** Signing in is `codex mcp login assistantlabs`,
   and the nightly self-training routine runs on a scheduler Codex does not
   have.
4. **ChatGPT on the web** takes the connection but not the skills — custom MCP
   apps there carry instructions, not a skill library. The setup guide at
   https://assistantlabs.io/academy/guide/connect-chatgpt covers that path.

## Editing

**These files are generated — do not edit them here.** The source is the Claude
Code plugin, and changing the rules means changing that and re-running the port
in the Assistant Labs monorepo. Editing a skill in this copy is lost on the next
publish.
