---
name: reaching-the-owner
description: >
  How the operator reaches the business owner when they are not in Claude —
  setting up their number and the WhatsApp templates, sending an update, and
  asking for a decision that EXECUTES the moment they tap Approve. Use during
  setup, whenever an approval is needed and the owner is away, when sending a
  brief, and when something has been waiting on them too long.
---

# Reaching the owner

The owner is not sitting in Claude. They are serving a customer, driving, or
asleep. An operator that can only speak when spoken to is not running anything —
so the two things that must travel to their phone are **what happened** and
**what needs deciding**.

Both go over WhatsApp, on the business's **own** number — the one their
customers already message and they already have saved. Not a second sender they
have to learn to trust.

## Setting it up (once, during `/setup`)

Three steps, in this order. Doing them out of order produces a configured
operator that cannot actually send anything.

**1. Create the templates on their account.**

```
setup_owner_notifications   { languageCode: "he" | "en" }
```

Submits two templates to the business's own WhatsApp account — one for updates,
one for approvals. Idempotent: a template that already exists is left alone,
because it is *their* template and they may have reworded it.

**`ready: false` right after this is NORMAL and is not a failure.** Meta reviews
new templates; it usually takes minutes and can take hours. Say that plainly to
the owner and carry on with setup — do not retry in a loop, and do not report it
as broken.

**2. Ask for their number, and say what it is for.**

Ask once, in plain words: *"What number should I message when something needs
you? It'll come from your own business WhatsApp."* Take it however they type it.
More than one person can run a business — take them all; the first to answer
resolves a decision.

**3. Save it.**

```
GET  /api/v1/assistants/:id/notifications      → read what is there
PATCH /api/v1/assistants/:id/notifications     → write it back with `operator`
```

The whole `notifications` object is replaced, so **read it first and send the
existing `rules` back with it**. Overwriting a business's conversation-
notification rules while setting up a phone number is exactly the kind of
silent damage that gets noticed a week later.

```json
{
  "notifications": {
    "rules": [ ...whatever was already there, unchanged... ],
    "operator": {
      "phoneNumbers": ["+972501234567"],
      "languageCode": "he",
      "enabled": true,
      "name": "Ronit"
    }
  }
}
```

**4. Check the wiring before spending a message on it.**

```
check_owner_notifications        → { ready, checks: [{ ok, detail, fix }] }
```

Read-only — it sends nothing and creates nothing. `ready: true` means a message
would reach them right now. Anything failing comes with a `fix`; do that first
rather than sending into a loop that cannot deliver.

**5. Prove it works — send one real message.**

```
notify_owner { text: "זה אני. מכאן אשלח לך עדכונים ובקשות אישור." }
```

Then **ask them whether it arrived.** A `delivered` list is our side of the
story; their phone is the other one, and the whole feature is worthless if it
silently does not land. If it did not, the usual cause is a template still under
review — say so and try again later.

## Roles are not approvers

The `people` memory page may name a finance person, someone who handles staff,
whoever signs things off. **None of that makes them reachable here.** Every
update and every approval goes to the numbers in the assistant's own operator
contact and nowhere else — there is no recipient parameter on any of these tools,
deliberately, because that separation is what keeps `operator:notify` from being a
quieter way to message anyone.

So when a decision genuinely belongs to somebody other than the owner:

- **Put it on the board with their name on it** — that is how the work reaches
  them.
- **Tell the owner what is waiting on whom**, if it is holding something up.
- **If that person should be reachable directly, their number goes in the
  operator contact** — a deliberate act by the owner during setup, not something
  inferred from a memory page. More than one number is supported, and the first
  to answer resolves the decision.

## Telling them something

```
notify_owner { text: "…" }
```

One way. It tells them; it does not ask them.

- **Write it for a phone.** A few lines. No markdown, no headings, no bullets —
  it renders as plain text in WhatsApp.
- **In their language**, from the `voice` memory page.
- **Lead with the thing that changes what they do.** "3 people are waiting for a
  reply, oldest since Sunday" — not a summary that buries it in line four.
- **Never send an update that needs nothing from them and tells them nothing
  new.** Every message costs them attention and costs the business a fraction of
  a shekel. A quiet day is a message not sent.
- **Batch.** One message at the end of a pass beats six as you go.

## Asking them to decide

```
ask_owner_to_approve {
  question:    "Reply to Dana about her missing order?"
  summary:     "I send her one WhatsApp message: <the text>"
  actionKind:  "send-customer-message"
  threadId:    "…"
  message:     "<the complete, final text>"
  customerName:"Dana Levi"
  taskId:      "…"
}
```

They get a message with **Approve / No** buttons. Tapping Approve **sends the
message** — the tap is the last step, not a signal for you to do something later.

This is the rule from the operating contract made real: *an approval must carry
the action*. So:

- **`message` is the final text, word for word.** Never a plan, never a summary,
  never "I'll draft something". Whatever is in that field is what the customer
  receives.
- **`summary` is what they see**, and it is all they see. One sentence: what
  approving DOES, plainly, in their language.
- **One question per approval.** Two questions in one get one tap and one
  unanswered thing.
- **Use `record-decision`** when the decision is about something off-platform
  ("shall I offer her a refund?"). It runs nothing and records their answer.
  Never use it to smuggle an action past the whitelist by describing it in prose
  — nothing in `summary` is ever executed.
- **Then file the task too**, `blocked-on-a-human`, with the same artefact. The
  WhatsApp message is how they hear about it; the board is where it lives.

**Getting the answer back:**

```
list_owner_approvals { status: "live" }     → still outstanding
list_owner_approvals                        → everything, newest first
```

**Read `executed`, not `status`.** `approved` means they said yes; `executed`
means it actually happened. A failed send leaves `executed: false` with the
reason — and telling the owner their message went out when it did not is the one
mistake this whole design exists to prevent.

**Withdraw a question you no longer need** rather than leaving it to fire later:

```
POST /api/v1/assistants/:id/operator/approvals/:approvalId/cancel
```

A decision that arrives about something already handled makes the operator look
like it is not paying attention — and approving it could send a message twice.

## What happens on their side

They reply on WhatsApp — a button, or typing "yes", "כן", "אל תשלח". That reply
is recognised as **the owner, not a customer**: it never opens a conversation,
never creates a contact, and the business's AI never answers it. They get one
short confirmation of what actually happened.

**Two questions outstanding at once make a button tap ambiguous** — a tap carries
no id, so it cannot say which question it answers. Every approval therefore
carries a short code (`A1`, `A2`) and the operator replies asking which one. Keep
the queue short and this never comes up; that is the real reason to batch.

**If they say something that is not a decision** — a question, "what?", or a
sentence with both a yes and a no in it — nothing is resolved and they are asked
again. Ambiguity never approves.

## When the owner says it stopped messaging them

**Run `check_owner_notifications` first, before theorising.** It names which of
the four things broke — the channel, the contact, the numbers, the templates —
and each failing check carries the fix. Say the fix in their words, not the
check's name.

A business's WhatsApp connection can be re-authorised, a template can be edited
or deleted on Meta's side, a number can be retyped wrong. None of those announce
themselves, and all of them look identical from the owner's end: silence.

Two things it reports that are **not** an outage, and must never be relayed as
one — a queue of unanswered decisions, and a day's message rail running low.
Those are worth mentioning; they do not mean anything is broken.

## When it is not set up

No operator, no WhatsApp channel, templates still under review — all of it
degrades the same way, and **degrading is not failing**:

- Everything still gets done up to the point of needing them.
- The decision is filed on the board as `blocked-on-a-human` with the complete
  artefact, so `/needs-me` clears it the moment they open Claude.
- Say once, plainly, that they are not reachable on their phone yet and what
  would fix it. Do not repeat it every pass.

**Never respond to "I cannot reach them" by deciding yourself.** That is the
line the whole product is built on.
