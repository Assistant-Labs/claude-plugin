---
name: daily-operations
description: >
  The rhythm — the morning brief, the working pass, the evening tally, and how
  the operator runs unattended on a schedule without the owner present. Use for
  "what's happening today", "brief me", "run the day", "end of day", setting up
  a recurring routine, or whenever deciding what to work on next.
---

# Daily operations

A business does not need an assistant that answers when asked. It needs one that
opens the shop.

## The rhythm

Three moments, three different jobs. Do not send the same message three times a
day — that is the fastest way to teach the owner to ignore you.

| | **Morning** | **Midday** | **Evening** |
|---|---|---|---|
| Job | **plan** | **delta** | **tally + hand off** |
| Who is waiting on a reply | full list | — | count |
| Today's three things | ✅ | — | — |
| Money to watch | ✅ | — | — |
| What the agent did overnight | ✅ | — | — |
| What changed since morning | — | ✅ | ✅ |
| Drafts ready to send | — | ✅ | — |
| Started but gone quiet | — | ✅ | ✅ |
| Closed today | — | — | ✅ |
| **Didn't happen, and why** | — | — | ✅ |
| Held calendar slots | — | — | ✅ |
| Tomorrow's opener | — | — | ✅ |
| The one thing needing them | ✅ | "still" | "still" |

The blanks are structural, not stylistic. A midday message has no "today's
plan" — the plan already happened this morning.

## Today's three

The morning picks **three things**, not a list. A small business has one person
and about three real slots in a day; a plan with nine items is a plan that will
be ignored by 11am.

- Each one names its **category** — support, sales, marketing, product, billing,
  ops. A week of categories tells the owner where their business actually went;
  a week of titles never does.
- **The plan is a hypothesis, not a contract.** Later passes diff it against the
  board and say what drifted: a row closed, blocked, or a new urgent thing that
  outranked it. You may work something the plan never mentioned. You may never
  do it silently.
- **Anything unstarted rolls into tomorrow's plan**, ahead of anything fresh. A
  task that slides three days without being mentioned is one you have quietly
  dropped.

## The working pass

1. **Anyone owed a reply** — see `customer-conversations`.
2. **Anything blocked on the owner** — finished work stuck one word from done.
   Re-surface it; do not re-do it.
3. **Money at risk** — a failed payment, an unsent invoice.
4. **Leads, warmest first** — see `growth-and-leads`.
5. **The board**, by priority then urgency.

Take the top unblocked item. Do it **end to end** — including the record and the
message to whoever was waiting. Then the next one. Five things half-done is
worse than two things finished, because half-done work is invisible and gets
done twice.

## Running unattended

A scheduled run, a routine, an autopilot pass. The owner is not there.

- **Never send. Never spend. Never delete.** See `autonomy-and-approvals`.
- **Do everything up to those**, so a yes costs one tap.
- **One consolidated queue.** Group by decision, not by task. Twelve approval
  rows from one overnight run is a chore, and a chore gets closed unread.
- **A customer waiting while you may not answer is the top line of the next
  brief**, marked now. An approval gate must never quietly become an unanswered
  customer.
- **Say what you did while they were away, in one block.** Silence overnight
  followed by "all good" is not a report.

**Send the brief to their phone, not to a screen nobody opens.** `notify_owner`
puts it in WhatsApp on the business's own number — see `reaching-the-owner`. A
brief that waits for them to open Claude is a brief that gets read at 4pm, and
the whole point of the morning one is that it lands before the day starts.

Write it for a phone: a few lines, the thing that changes what they do first, no
markdown. And **send nothing on a quiet day** — a message that says "all good"
three times a week is how someone learns to ignore the channel.

Set it up with the `/schedule` command or a routine — a morning brief on
weekdays is the highest-value scheduled thing in the whole plugin, because the
owner starts the day already knowing.

## The end of the day

The evening pass is the only one that reports **what did not happen and why**.
That line is what keeps the whole arrangement honest. Every operator looks
productive if it only reports what it finished.

Also sweep, every evening:

- **Held calendar slots** — anything `[TENTATIVE]` that nobody confirmed gets
  deleted and the row reopened.
- **Promises made today** — anything the agent or the operator told a customer would
  happen. Each one is a task with a name and a date, or it is a lie with a
  delay.
- **Anything started and gone quiet** — a job with no movement in 48 hours is
  either blocked or forgotten, and both need saying.

## Set their board up — once, early

The board is the owner's window into an operator that runs while they sleep, and
by default it is a list. **A list is not a window.** Make it one, during setup or
the first time they ask a question the board should already answer.

```
get_board_schema     → what a view may filter, group and show (call this FIRST)
list_board_views     → what tabs exist already
save_board_view      → add or edit a tab
```

Five views ship with the app and cannot be deleted, so the board is never empty.
What to add on top, in this order:

1. **Needs me** — `blocked-on-a-human`, newest first, with the customer's name
   on each row. This is the tab they will actually live in.
2. **Owed a reply** — anything filed because a customer is waiting.
3. **Whatever they just asked for.** When they say "I want to see all the money
   stuff in one place", that sentence IS a view. Build it in that turn rather
   than answering the question once.

**Name the tab in their words and their language**, not ours. And do not build
six on day one — a board with more tabs than the owner has questions is a
settings screen, which is the thing they are paying not to have.

## Weekly, on top

- The money checks in `money-and-billing`.
- A pass over the business memory for anything that has gone stale.
- The board's own rot: tasks pointing at things already done, duplicates,
  priority inflation, rows nobody has touched in three weeks.
- **What the agent got wrong this week.** Read a sample of real conversations,
  find where it answered badly, and propose the fix. This is the compounding
  one — a business whose agent improves weekly is a different business in six
  months.
