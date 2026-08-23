---
name: growth-and-leads
description: >
  Who to chase and in what order — ranking leads by warmth, telling a lead from
  an existing customer, what to say and what never to say, outreach campaigns
  and the consent rules around a first cold message, and keeping the lead record
  true. Use for "who should I follow up with", "any new leads", "chase X", "run
  a campaign", or anything about winning new business.
---

# Growth & leads

Small businesses lose deals to silence, not to competitors. Almost every lost
lead in a real inbox is one nobody got back to.

## Rank by when they last spoke. Nothing else.

**The ranking key is the timestamp of the lead's own last real message.** Most
recent = warmest = chase first.

| Days since their last message | Priority |
|---|---|
| ≤ 10 | **P1 · now** |
| 11–17 | **P1 · soon** |
| 18–28 | **P2 · soon** |
| 29+ / never | **P2 · open** |

**Not** by deal size, not by how excited they sounded, not by how far they got,
not by how bad it feels that they were dropped. Ranking by impressiveness is
exactly how a lead who messaged nine days more recently ends up below one with a
better story. Interest decays on a clock, and the clock is the only input that
measures it.

**Boilerplate is not contact.** Away-messages, "thanks for contacting us",
delivery receipts, and webhook placeholders get stripped before you take the
last timestamp. Without that filter, a lead whose *machine* answered outranks a
person who typed a sentence.

**One lead, one row.** A grouped "cold leads ×5" task cannot carry a warmth date,
so it hides the one member who is still warm.

**Record the warmth in the row**: `last real message <date> — <n> days ago`. A
priority nobody can trace to a fact gets re-argued every session.

**Recency ranks; it does not decide what to say.** A 14-day lead who sent one
ad-click opener and a 14-day lead who said "let's start" get the same priority
and completely different actions — and one of those actions is "mark it lost".

## Who is a lead

**A lead is defined by what they want, never by how they arrived.**

- **An existing customer asking about something they don't have yet is a lead** —
  the highest-intent kind there is, because they already trust the business.
  Expansion and acquisition are the same board.
- **The disqualifying question is "are they already paying for THIS?"** — check,
  don't assume from name recognition.
- **Someone who signed up and never used it is not cold — they are stuck.** That
  gap is the most valuable signal in the funnel, and it means something in the
  product or the onboarding stopped them. Find out what.
- **When a lead you expected is missing from your list, ask what filter removed
  them** before concluding the list is right.

## What to say

- **Open warm and short, then go straight to the next step.** No apology for the
  gap — it makes the business's failure the subject.
- **Ask for the artefact, not the intention.** "Send me the list" starts the work
  and tests seriousness in one move. "Would you like to proceed?" does neither.
- **Never make them choose a product.** Ask what they want to *happen*, then say
  what the business will do. A customer forced to pick a package is a customer
  doing the business's job.
- **The bottleneck is the specification.** Most people know their pain and not
  their ask. The work is turning "I want more repeat customers" into: which list,
  who consented, what triggers a message, what it says, what happens on a reply.
- **One concrete next step per message.** Two asks get zero answers.

## Someone went quiet — reach for the automation, not your keyboard

The commonest thing a small business loses money to is a conversation that
trailed off. The product already solves it: a **follow-up sequence** waits for
silence, then chases on a schedule, and stops the moment they answer.

**Check `list_follow_ups` BEFORE writing a chase message by hand.** If a
sequence already covers this person, a hand-written chase duplicates it — they
get two messages, and the business learns nothing about which one worked.

**When nothing covers it, draft a sequence rather than a message.** A message
helps one customer once. A sequence helps every customer who goes quiet from now
on, and the owner can see it, edit it and switch it off without you.

```
list_follow_ups                     what already chases people
draft_follow_up  { name, steps }    saved SWITCHED OFF — sends nothing
update_follow_up { enabled: true }  🔴 this is what starts it
```

**Drafting is 🟢. Switching one on is 🔴** — from that moment the business
messages real people on a timer with nobody reading each send. The API refuses
to enable one without the separate permission, in both directions; treat that as
the floor, not the rule. The rule is that it is the owner's decision.

**What makes a good sequence, and what the API will refuse:**

- **Wait at least 30 minutes** before the first step. Anything shorter chases
  somebody who is still typing. (Refused below 30.)
- **Anything more than 24 hours out must be an approved WhatsApp template** —
  outside that window nothing else can be delivered. (Refused otherwise.) So a
  three-day chase needs a template approved in advance, which is worth saying to
  the owner before they get excited about a two-week sequence.
- **`stopOnReply` stays true.** Almost always. A sequence that keeps sending
  after someone answers is how a business looks like it is not listening.
- **`stopOnLabels`** for the outcomes that should end it — bought, not
  interested, complained.
- **Two or three steps.** A fourth chase to someone who has ignored three is not
  persistence, it is a reason to block the number.
- **Target with labels**, so it chases the right conversations rather than
  everyone.

## How outreach actually works here

Not "send everyone a message". The model is **a group, and a journey attached to
it** — and using it beats hand-rolling messages, because it survives you and the
business can see it.

1. **A group is the audience** (`create_group`) — built from a label, a segment,
   or a list they give you. Getting the group right is most of the work; a
   journey against a sloppy group is a mistake delivered efficiently.
2. **A journey is the sequence** (`create_journey`, `update_journey`) — the
   steps, what each one says, how long between them. **Drafting one is 🟢.**
3. **Attaching the group to the journey is what sends it** — 🔴, always. That
   single call is the campaign going live to real people.
4. **Temperature** (`get_temperature_settings`) is how hot/warm/cold is scored
   for the whole workspace. Read it before ranking anything by it, and change it
   only when the owner asks — it silently re-sorts every list they look at.
5. **Watch it** (`get_journey_stats`, `get_journey_audience`) and report what
   actually happened, per step, not just that it went out.

**Contacts are the substrate for all of it.** Labels and segments are how a
group gets built, so keeping the contact base tidy is not admin — it is what
makes any of this targetable. A business whose contacts are untagged can only
message everyone, which is the one thing they should never do.

## Outreach campaigns

Going live with a campaign is 🔴 — it is real messages to real people, and it is
the single easiest way to damage a business's number and its name.

Before proposing one, every line must be answerable:

1. **Who is on the list, and how did they get there?** A list nobody consented
   to is not an audience.
2. **Did these people ask to hear from this business?** If the honest answer is
   no, the campaign is cold outreach and the rules below apply.
3. **What is the message, word for word**, in the business's voice?
4. **What happens when someone replies?** If the answer is "the agent will handle
   it", the agent needs a brief (see `customer-conversations`).
5. **How does someone stop hearing from us**, and is it one step?
6. **What does success look like**, measured, so the owner can judge round two?

**Cold WhatsApp is regulated, and it is the business's account at risk.** A first
message to someone outside a recent conversation must go as an approved
template. Templates are copy in the business's name — **the owner approves the
words before one is submitted**, not after it is created.

**Drafting a campaign is 🟢. Activating it is 🔴.** Build the whole thing, show
it, then wait.

## Keeping the record true

The record comes before the message. A reply is a guess made visible to the
customer; a record is the same guess made visible to the business, where it is
still free to be wrong.

**Order, for every lead:** read the thread → ask what happened off-channel →
**update the contact/task record** → hand the owner a link → *then* discuss the
message.

Keep four fields current, because they are what turn a record into work:

- **what they actually want** (in their words)
- **next action** — one line, someone's name on it
- **blocked on** — us, them, or a decision
- **last human contact** — including calls and meetings the data cannot see

Everything else is background.

### Which record — contacts or the CRM?

Two stores, and putting a fact in the wrong one is how it goes missing.

| | **Contacts** (`list_contacts`) | **CRM** (`list_crm_companies`) |
|---|---|---|
| Holds | whoever has messaged the business, per agent | companies the business sells to, and the people at them |
| Keyed on | a phone number or an email | a company, with its people hanging off it |
| Use for | anyone in a conversation — the usual case | B2B, where the account matters more than the individual |

**Most businesses only need contacts.** A hairdresser has customers, not
accounts. Reach for the CRM when the business sells to *organisations* — when
"who else works there" and "what stage is this account at" are real questions.

If the business uses both, the CRM is the **system of record** and a contact is
how someone happened to arrive. Fix the CRM; do not maintain the same fact twice.

**`get_entity_schema` before writing.** Every workspace has its own custom fields,
and a field name that is not in that list is silently not stored — you will
report a value as saved that nobody will ever see again.

**Enrich fills blanks; it does not overwrite.** That default is deliberate: what
you learned from a website should never quietly replace what a person typed. If
the new value really is better, say so to the owner and pass `overwrite`.
