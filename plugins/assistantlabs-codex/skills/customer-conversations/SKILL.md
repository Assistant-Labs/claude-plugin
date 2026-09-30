---
name: customer-conversations
description: >
  Handling the business's real conversations — finding who is waiting for a
  reply, reading a complaint correctly, drafting the response, escalating to a
  human, steering the AI agent on a thread the operator has a job on, and closing the
  loop when something is fixed. Use for "who hasn't been answered", "this
  customer says X is broken", "reply to them", "what did they say", or any work
  that touches a customer conversation.
---

# Customer conversations

This is the work that matters most and gets skipped most. A customer waiting on
a reply outranks everything else on the board.

## Find who is waiting — before anything else

`conversation_stats` reports **no reply** — the customer's last message is newer
than the last reply, or nobody ever replied. That list is the top of the day.

- **Anyone waiting with no task on the board is something you have missed.**
  File it, then work it.
- **Strip the machines first.** An away-message ("פנייתכם התקבלה", "Thanks for
  contacting us"), an auto-reply, a delivery receipt — none of those are a
  person waiting or a person answering. A thread where only robots spoke is not
  a conversation.
- **Sort by how long they have waited**, and treat anything past a business day
  as urgent regardless of what it is about.

**Link the thread whenever you quote it.** They will want to see it for
themselves, and hunting for the conversation you just summarised is the friction
worth removing — `opening-the-app` has the link shape.

## Read the complaint correctly

**One customer with four complaints has four problems, not one story.** The most
common failure is reading a history end to end, forming a single narrative, and
fixing the wrong thing — then reporting it as the answer. Every distinct report
gets its own task row, with the customer's own words and a date.

- **A vague complaint gets identified before it gets diagnosed.** "It's not
  working", "I couldn't get in" — find out *which* thing. Ask, or find it in the
  data. Never map it onto the first plausible bug.
- **What they keep re-asking IS the problem.** A question asked twice in a
  thread is the thing blocking them; everything else is noise.
- **An image the agent could not read is an unanswered question.** If the thread
  contains a screenshot and the agent replied "thanks, received", assume the
  question is still open. Get the image before deciding what they want.
- **Attachments expire.** Pull the picture the day the issue is filed, not the
  week you get to it.
- **Ask whether anything happened off-channel** before analysing. Calls,
  WhatsApp from a personal phone, a conversation in the shop — none of it is in
  the data. A thread is evidence of what was *messaged*, never of what happened.
  If a task note says something the thread doesn't, **the note is right**.

## Drafting the reply

The draft is yours to write, unprompted, every time. Waiting to be asked for it
is a failure. **Sending it is the owner's** (see `autonomy-and-approvals`).

- **Plain, sendable text.** No greeting scaffolding, no markdown, no blockquote.
  It gets pasted or sent as-is.
- **In the business's voice** — read the `voice` memory page first. In the language
  the customer wrote in.
- **Say the cause in one concrete sentence.** "We fixed it" reads as a brush-off.
  "The order went out to the old address on your account — I've corrected it and
  it ships today" tells them somebody actually looked.
- **Address every open thing separately.** If they have complained three times,
  a message about one implies the other two were ignored.
- **Never claim something is fixed that you have not checked.** Say plainly
  what's fixed, what's still being looked at, and what you need from them.
- **Don't apologise more than once, and never open with it** to a lead. An
  apology makes the business's failure the subject and invites them to weigh it.
  Say hello, answer the thing, move to the next step.
- **Never promise a time nobody committed to.** "Someone will get back to you
  today" is a promise the business now has to keep. Name who, not when — or
  don't name it at all.

## Steering the agent on a thread you have a job on

The business's AI agent answers customers continuously. When the operator starts
something on a thread — asks for a file, promises a follow-up, opens a topic the
agent knows nothing about — **the agent will keep answering, with no idea what
the plan is.** Left alone it will helpfully agree to things the business cannot
do.

**There is no per-thread context tool on the customer API yet.** So today the
steer is done with the tools that do exist, and the order matters:

1. **Before the message goes out**, add what the agent needs to know to its
   knowledge — the fact, the offer, what the business can and cannot do about
   this — so it answers from truth rather than improvising. That is amber work.
2. **Set extra instructions** for the run if the situation needs a temporary
   rule ("we are collecting lists from customers this week; take the file,
   confirm what arrived, say a person is preparing it").
3. **Watch the thread after the send**, not before the next brief. The first
   reply is where an unsteered agent commits the business to something.
4. **Take the temporary instruction back off** when the job is done, or the next
   conversation inherits a goal that is over.

When a per-thread brief becomes available, use it instead — it is the right
mechanism, and it is set **in the same action as the outbound message**, never
after. The reply is what creates the conversation; context set afterwards
arrives too late to steer the first answer.

**Write it as a task brief, not a rulebook.** A long list of prohibitions is the
wrong artefact — an agent with a job to finish does not need a cage; one with no
job needs ten.

```
1. THE TASK      — what we are doing for this customer, one sentence.
2. WHERE IT IS   — what is already true, so it can answer "what's happening?"
3. WHAT WE NEED  — numbered, specific, in their terms. This is the body.
4. WHEN IT'S DONE— summarise back, confirm, stop. Name who continues.
5. UNKNOWNS      — one line: what it cannot answer, and who will.
```

Then one closing guardrail line — *don't promise a timeline, don't commit to
work, don't ask for anything beyond the list above.* One line, not ten.

**Clear the context when the task ends.** Otherwise the next conversation
inherits a goal that is over.

## Escalating to a human — to WHICH human

**Read the `people` memory page before deciding who.** If the business told us
who handles money, stock, or staff, a question about an invoice goes to that
person; sending everything to the owner is the thing they are paying to stop.

- **Route by what they HANDLE, not by job title.** The page records the owner's
  own words for a reason — "Dana does the invoices" answers a billing question,
  "Finance Manager" answers nothing.
- **An empty `people` page means everything goes to the owner.** That is correct
  for a one-person business and is not a gap to apologise for.
- **Name the person in the task, not just the topic.** "Dana — refund request
  from Levi, ₪380" is work somebody can pick up; "billing issue" is a category.
- **Knowing who handles it is not permission to message them.** Route the work
  and name them; approvals still reach only the configured owner numbers, and
  nobody gets contacted because a memory page mentioned them.
- **If the page says what they decide, use it.** "Refunds up to ₪500 on her own"
  means a ₪380 refund is Dana's call and does not need the owner at all — that
  line is the whole reason the page is worth keeping.
- **Check the page is still true when routing fails.** Someone who left is worse
  than someone missing; fix the page the same turn you find out.

The agent's job is to **notice and flag**. The human's job is to **decide**. Keep
them separate:

- The agent records what the customer asked for, in their words, and says a
  person will look at it. It must not know who approves, must not see anyone's
  calendar, must not commit to a time.
- The operator picks it up, works out what is actually needed, and puts it in front of
  the owner as a decision.
- **A promise of a callback with nothing scheduled is the commonest way a small
  business loses a customer.** If the business promised a person would call,
  that is a task with a name on it, today.

## Booking a call for the owner

If the outcome is "they should talk":

1. **Check the calendar first.** Never offer a slot without looking.
2. **Offer one concrete time**, not "when suits you?".
3. **Hold it in the calendar immediately**, titled `[TENTATIVE]`, with the
   customer's number and the thread link in the description.
4. **Clean it up.** They accept → drop the prefix. They decline or go quiet →
   **delete it**. A held slot nobody confirmed is a promise the business made to
   itself, and the owner plans their day around it.

## Closing the loop

**A fix is not done until the customer has been told.** The moment something a
customer reported is actually working:

- Draft their message in the same turn, unprompted, ready to send.
- Say what was wrong, in their words, in one sentence.
- **A fixed task is not a closed one.** Between "fixed" and "closed" sits *told,
  awaiting their word*. Only the customer confirming closes it.
