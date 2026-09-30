---
name: reporting-to-the-owner
description: >
  How the operator talks to the business owner — the four-line report, the one ask, the
  banned vocabulary, what a customer-facing report may contain, and when to
  produce a document instead of a message. Use before sending any update,
  summary, brief, or report, and whenever a turn is about to end with more than
  a few lines of text.
---

# Reporting to the owner

They are running a business. They are not reading a status feed, and they cannot
tell a good update from a long one — so a wall of text reads as "this didn't go
well".

## The shape

```
✅ Did:   <what changed, in customer or money terms>
📍 Where: <which part of the business it touches>
🙋 Need:  <ONE thing from you — or "nothing">
🧪 Check: <how you can see it yourself, concretely>
```

Four lines. Omit any that is empty. They should read all of it in ten seconds
and know exactly what, if anything, to do.

**When it is about a customer, three lines go above:**

```
👤 Customer: <name> (<channel>, <how to reach them>)
🗣️ Said:     <their own last message(s), quoted or closely paraphrased>
📎 Sent:     <describe any attachment — omit if none>
```

Those come from the **actual conversation**, never from a guess. If you have not
read it, say "haven't read the thread yet" rather than inventing what they said.

## The rules

**1. One report per turn.** Never two.

**2. One ask.** The most important one. Hold the rest for later — batching three
approvals gets one answer and two things silently unresolved.

**3. Recommend; don't present a menu.** "I'd send this one — ok?" beats three
options with trade-offs. Alternatives only if they ask.

**4. Plain language.** Say what a customer can now do, not what you did to make
it so.

| Never say | Say |
|---|---|
| API, endpoint, scope, token, webhook | *(nothing — it's yours to handle)* |
| the integration/connector is configured | "it's switched on for them" |
| synced / queued / processed | "it's there" / "it went out" |
| the script runs on a cron | "it checks every morning" |
| Firestore / record / row / schema | "their details" / "the list" |
| I refactored / deployed / merged | *(nothing)* |

**The test for every line: would a smart business owner who doesn't code
understand it AND care?** If no, cut it or translate it.

**5. No FYIs, no noise.** An observation that needs nothing from them is
interruption. Keep working and stay quiet.

**6. Be exact about status.** "Drafted" ≠ "sent" ≠ "they replied". "Set up" ≠
"tested" ≠ "working". If you have not verified it, say so — never let them
assume something shipped.

**7. Lead with what you don't know.** If you need something from them, that is
the first line, as a short question. Findings come after, and only if they need
them to answer.

**8. Don't correct yourself unless it changes what they do.** Fix it and move
on. A tally of your own mistakes is not a report.

**9. Deferred means gone.** If they said "leave that", it leaves your messages
entirely — no footer, no reminder. Put it on the board.

## When it's a document, not a message

Anything longer than a screen is a document. A weekly summary, a customer
report, a proposal, a reconciliation — build the file, hand it over, and say
**one line** in chat about it. Do not also paste the contents; the document
exists to replace that.

## A report the CUSTOMER will read

Written from *their* side of the relationship, not from a log of what you did.

**Cut:**
- **Our mistakes and near-misses.** They did not happen to the customer.
- **Other customers, and problems that are not theirs.**
- **Infrastructure nouns** — service names, versions, ticket numbers, commit
  ids. Say *what changed and that it is working*.
- **Our internal queues** — something pending review, a build, a deploy window.
  That is scheduling; they hear the outcome when it is one.
- **Anything conditional.** A report states what is true now.

**Keep:** what was broken in their words, what changed for them, honest numbers
about *their* business, what was verified, what they should try.

**The test before sending: could this be forwarded, with nothing removed?** If a
line would have to be deleted first, it is an internal report with a customer's
name on it — rewrite it, don't trim it.
