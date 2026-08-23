# Changelog

## 0.1.0 — unreleased

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
