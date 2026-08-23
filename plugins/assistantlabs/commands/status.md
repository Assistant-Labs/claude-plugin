---
description: Is this actually set up, and what's missing?
---

Report where setup stands and whether the operator can really do its job.
**Change nothing** — this is a check, not a repair. Read `getting-started` for
what each step means.

Check the live system, not just the state file. A file saying `connected: true`
is a claim; a call that comes back is evidence — and the commonest real fault is
a permission that was revoked weeks after setup.

**Every check here is read-only.** Nothing in a status report may submit a
template, send a message, or write a setting. If a check has no read-only
version, leave it out and say it is unknown rather than repairing it silently —
`/setup` is where repairs belong.

| Check | How |
|---|---|
| Connectors authorised | `list_assistants` returns |
| The agent | bound, and its name matches the state file |
| Channels | `list_channels` — which are live, and do customers use them |
| Board | `list_tasks` answers |
| Reaching the owner | `check_owner_notifications` → `ready`, plus a `fix` on anything failing. Covers the channel, their number, and both templates in one read-only call |
| Waiting on them | `list_owner_approvals { status: "live" }` |
| Memory | `list_business_memory` — which pages have real answers in them |
| Brief | is a scheduled run set up |

Then print a short list — one line per item, ✅ or ✗ with the reason. Lead with
**anything that means it cannot do its job right now**, in plain language:

- No live channel → *nobody can message the agent.*
- Missing permission → name the permission and where to add it.
- Nothing in `voice` → *drafts will sound generic.*

**Separate the required from the optional, and label them.** Five steps are
required and four are optional (`getting-started` § "Required, optional, and the
third state"). An optional step they DECLINED is settled — print it as declined,
never as a fault, and do not offer it again here.

- No owner number, or templates not approved → *nothing can reach them on their
  phone; decisions will wait on the board.* Worth having, not broken.
- Optional and never offered → mention it in one line at the end, with what it
  would do for them. Not a ✗.

Update `.assistantlabs/setup.json` to match what you actually found. **If a step
recorded as done turns out not to be**, correct it and say so — a state file
that disagrees with reality is worse than none, because the next session trusts
it.

End with the single next thing worth doing, and `/setup` to do it. If every
required step passes, **say setup is complete** — an outstanding optional step
does not make it incomplete — then name the one thing that would most improve it.
