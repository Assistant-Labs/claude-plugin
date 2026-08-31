---
description: The brief — what's happening in the business right now
argument-hint: "[morning|midday|evening]"
---

Brief the owner. If `$ARGUMENTS` names a slot use it; otherwise pick from the
local time. Read the `daily-operations` and `reporting-to-the-owner` skills.

Gather first, write second. Never narrate the gathering.

1. **Who is waiting for a reply** — `conversation_stats`, strip auto-replies,
   oldest first.
2. **What is blocked on the owner** — `list_tasks status: blocked-on-a-human`.
3. **What the agent did since the last brief** — volume, anything that needed a
   human, anything it got wrong.
4. **Money to watch** — outstanding, failed payments, anything renewing.
5. **The board** — what is open, by priority.
6. **Drift** — what the last plan said, and what actually happened.

Then write the slot's brief, and **only that slot's blocks** (the table in
`daily-operations` says which). Do not repeat what an earlier brief today
already said.

**Morning** ends with today's three, each with a category, and starts #1.
**Midday** reports what #1 produced and prints any ready-to-send drafts in full.
**Evening** reports what closed, **what didn't happen and why**, sweeps held
calendar slots and promises made today, and names tomorrow's opener.

Keep it short enough to read standing up. One ask, at the end.
