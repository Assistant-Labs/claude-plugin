# Changelog

## 0.2.0 — 2026-08-31

Named the commands, and stopped the operator inventing its own connection state.

- **Every command is namespaced `/al-*`.** `/al` is the front door; `/al-setup`,
  `/al-status`, `/al-brief`, `/al-waiting` and the rest follow it. Nothing
  collides with a built-in command any more. **Breaking** — the bare names are
  gone.
- **`/al-login`** — new. Probes each connector, names only the ones actually
  missing, gives the connect path for the surface the owner is really on, and
  proves the result by calling a tool instead of announcing success.
- **Probe, never infer.** A startup hook, a session notice listing servers as
  unauthorised, or a tool missing from context are no longer treated as evidence
  about the connection — only a call just made is. Inferring is what made a
  connected business get told to go and connect itself.
- **Connection is per connector, not all-or-nothing.** One answering and three
  not is the ordinary state, and is now reported that way.
- **`/mcp` is terminal-only.** It was being offered on claude.ai, the desktop app
  and Cowork, where it does not exist and the owner hits a dead end. Those
  surfaces are sent to Settings → Connectors instead.

## 0.1.0 — 2026-08-24

First version. Not yet run against a real business.

- **The operating contract** — three tiers of autonomy, and the rule that an
  approval carries the action rather than waiting to be noticed.
- **Reaching the owner on WhatsApp** — updates and approvals over the
  business's own number, with Approve / No buttons that perform the action. A
  reply from the owner never becomes a customer conversation and is never
  answered by their own AI.
- **Onboarding from wherever they are** — no account, no agent, no channel or no
  history. Resumable: it records what it establishes and picks up rather than
  starting over.
- **The business memory** — `business/`, in plain markdown the owner can read
  and edit, with the voice mined from their own people's replies.
- 14 commands, 6 subagents, 3 hooks.
- Hook guarantees covered by `tests/`; behavioural promises authored as
  `evals/` and not yet run (`plugin eval` is early access).
