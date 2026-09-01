---
name: business-memory
description: >
  What the operator knows about THIS business — the memory pages stored in the
  Assistant Labs workspace, what belongs in each, and the discipline that keeps
  them true. Read at the start of any session that will act on the business's
  behalf, and whenever you learn something about the business, its customers, its
  prices, its policies, its people, or a decision the owner made. Also covers
  what must never go in them.
---

# Business memory

A generic operator is worthless. What makes it *this business's* operator is a
small set of pages it reads before acting and writes the moment it learns
something.

**They live in the business's Assistant Labs account, not on anyone's laptop.**

**Stored against the AGENT, not the workspace.** Every memory route is
`/assistants/:assistantId/memory*`, so the pages belong to one agent and a
business running two agents has two independent sets with nothing reconciling
them. Two consequences worth knowing before you write anything: **there is
nowhere to write until an agent exists** — on a true first run, create the agent
first — and if the business later adds a second agent, its memory starts empty
rather than inheriting what the first one learned.

```
list_business_memory                    → what is known, and how full each page is
read_business_memory  { key }           → the whole page
write_business_memory { key, content }  → REPLACES that page
start_business_memory                   → creates the empty starter pages (setup, once)
```

They are plain markdown and the owner can read and edit every one. **Nothing in
here is written for a machine.**

## Why the account and not a local folder

Four reasons, and each one is a way the local version fails:

- **A scheduled run has no laptop.** The brief that goes out at 08:00 with nobody
  present must know how the business talks. Memory on a machine that is asleep is
  memory that does not exist when it matters most.
- **The owner changes computer, or has two.** Their business should not forget
  them because they opened Claude somewhere else.
- **Everything else can read it.** Memory held against the agent is available to
  the rest of the product and to anything built on top of it. Memory in a folder
  is available to one process on one machine.
- **It survives this project.** A folder gets deleted, renamed, or left behind in
  a repo nobody opens again.

## The pages

| Key | Holds | Written by |
|---|---|---|
| `business` | What the business is, what it sells, who buys it, how it runs | setup, then rarely |
| `voice` | How this business talks to customers — real examples, not adjectives | setup, refined from real messages |
| `offers` | What they sell and for how much; what "a good week" means | setup, updated on change |
| `customers` | The ones that matter — regulars, big accounts, difficult histories | as you learn them |
| `policies` | Standing decisions: refunds, discounts, hours, escalation, standing permissions | the owner, quoted verbatim |
| `people` | Who works here, what each of them handles, who decides what | setup (optional — see below) |
| `decisions` | Append-only log of what the owner decided, when, and why | every time they decide |
| `stack` | Which channels and apps are connected, and what runs where | `connect-your-business` |

An empty page is not an error — it is a gap to fill during the next natural
conversation. **Do not interrogate the owner to complete a form.** Ask when the
answer is about to matter. You may create other pages; keep the names short and
obvious.

## Reading and writing

**Start a session with `list_business_memory`, not by reading everything.** The
list shows what exists and how full each page is, which is enough to decide what
this piece of work actually needs. Reading all eight pages to answer one question
spends the context you need for the work.

**A write REPLACES the whole page.** So the order is always read → edit → write
back. There is no append, deliberately: an agent appending to a page it has not
read is how a business ends up with three different prices and no way to tell
which is current.

## The rules

**1. Write it the same turn you learn it.** The owner mentions on a Tuesday that
they no longer do Saturday deliveries. If that sentence does not reach `policies`
before the turn ends, the next session tells a customer the wrong thing. This is
the single highest-value habit in the whole plugin.

**2. Quote the owner, don't summarise them.** `policies` and `decisions` carry
their actual words with a date. A paraphrase drifts; a quote is auditable, and
when it turns out to be wrong the owner recognises their own sentence instead of
arguing with your interpretation.

**3. Describe the present.** When something changes, **rewrite the line**. Do not
append "(updated — was previously ₪120)". A page that grows a changelog becomes
one nobody reads to the bottom of, and the bottom is where the current truth
ended up.

`decisions` is the one exception, and it is append-only on purpose: it exists to
answer "why is it like this?"

**4. Verify before you rely on something load-bearing.** A price, a phone number,
an opening hour, a delivery cost — these get quoted to real customers. If the
page and the live system disagree, **the live system wins and the page gets
fixed**. Never quote a number from memory that you could have read.

**5. What never goes in a memory page:**
- **Passwords, API keys, card numbers, tokens.** Ever. Credentials live in the
  connection itself; if you need one, the owner grants it, they never paste it.
- **A customer's ID number, full card, or medical/legal detail** — keep the
  minimum needed to serve them.
- **Guesses presented as facts.** If you inferred it, label it: `(unconfirmed)`.
  A guess laundered into a page gets read as authority by every session after.
- **Things the product already knows.** The agent's FAQ, the catalogue, the
  contact list live in Assistant Labs and are read live. Copying them here
  creates a second version that goes stale.

## The `people` page

Optional, and genuinely so — a one-person business should have an empty one and
nobody should feel behind. It earns its place the moment there is more than one
person, because it is what stops every question going to the owner.

Write it as people, not as an org chart:

```markdown
**Dana** — invoices, chasing payment, anything about money.
Decides: refunds up to ₪500 on her own. Above that, asks Ronit.
dana@… · answers fastest on WhatsApp, not email.

**Yossi** — deliveries and stock. Knows what is actually on the shelf.
Not in on Fridays.

**Ronit (owner)** — everything else, and the final word on price and staff.
```

- **In the owner's words, not a job title we picked.** "Dana does the invoices
  and chases payment" is useful; "Finance Manager" is not, and is often wrong —
  a bookkeeper who comes in on Thursdays is not a finance department.
- **What they DECIDE is the load-bearing line.** It is the part that changes
  behaviour later: it is how a refund question becomes "ask Dana" rather than
  "ask the owner about everything".
- **Contact details only if the owner volunteered them.** Never ask for someone's
  personal number to complete a record.
- **Nothing personal beyond the job.** No ID numbers, no salary, no home address,
  nothing about their health or their family. It is a page about who handles
  what, and anything else on it is a liability with no upside.
- **Rewrite when someone leaves.** A stale name is worse than a missing one —
  routing work to somebody who left is a visible failure.

**Knowing a role is not permission to contact them.** This page changes who work
is *routed* to and who gets *named*; it never makes anyone an approver. Approvals
reach only the numbers in the operator contact — see `reaching-the-owner`.

## Memory is NOT the agent's knowledge

Two different things, and mixing them is a leak rather than a tidy-up.

| | Business memory | Agent knowledge (`patch_agent_module`) |
|---|---|---|
| Who reads it | you, the operator | the business's customers, indirectly |
| Contains | how the owner likes things done, who is difficult, what was decided and why | FAQ answers, catalogue, opening hours |
| Safe to show a customer | **no** | yes — that is its whole job |

When you learn something a *customer* should benefit from — a price, an opening
hour, a policy they can be told — put it in the agent's knowledge so it answers
correctly, and note in memory only what the customer must not see.

## What good looks like

`voice` is the one most often written badly. This is wrong:

> Friendly, professional, customer-focused tone.

That describes every business on earth and steers nothing. This is right:

> We answer in Hebrew unless they wrote in English. Short. No "היי, מה שלומך" —
> straight to the answer. We say "אין בעיה" a lot. We never apologise twice.
> When we don't know, we say "אני בודק ומעדכן" and then we actually update.
>
> Real example, Ronit to a customer asking about a delay:
> "היי, ההזמנה יצאה אתמול, אמורה להגיע מחר. אם לא הגיעה עד 18:00 תכתבי לי ואני
> מטפלת."

Mine it from the business's own messages — the owner's real replies in the
conversation history are the best source there is. Never mine it from the AI's
replies; that is imitating yourself.

## Keeping it honest

Once a week, or whenever something feels off:

- Read `business` and `offers` against the live system. Anything that disagrees
  gets fixed on the page, not defended.
- Delete what is no longer true. A stale line costs more than a missing one — a
  missing line makes you ask, a stale line makes you confident.
- Check `policies` against what actually happened. If the policy says one thing
  and the owner has overridden it three times, the policy is wrong. Say so,
  propose the real one, let them confirm.
