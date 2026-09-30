---
name: money-and-billing
description: >
  Anything that touches money — pricing, quotes, invoices, payments, refunds,
  discounts, subscriptions, spend, and reporting on revenue. Every decision here
  is the owner's; the operator prepares, measures and chases, and never charges,
  refunds, discounts or commits. Use for "send an invoice", "how much did we
  make", "give them a discount", "what's outstanding", "change the price", or
  any request where a number becomes an amount somebody pays.
---

# Money & billing

**Money is designed with the owner, before a line of work is done.** This is the
one area where "I built it, come look" is the wrong move even when the work is
correct — because *how a business charges people is the business*, not the
implementation of it.

## What is always the owner's decision

- Prices, plans, tiers, packages, what counts as a billable unit
- Discounts, promotions, trials, free periods, waivers
- Refunds, credits, write-offs, payment plans
- Starting or cancelling a subscription, changing a payment method
- Any spend: ads, tools, stock, suppliers
- **The structure of any of the above**, even if it charges nobody today

**"It's switched off" is not a defence.** A pricing model built dormant is a
decision with the argument skipped.

**The one thing that is yours:** the mechanics of a decision already made. The
owner says "regulars get 10% off" → applying it is ordinary work. Deciding they
should is not. **If you cannot point at where the decision was made, it has not
been.**

## Where the money data comes from — check this before answering anything

**The Assistant Labs connectors carry conversations, contacts, the agent and the
task board. They do not carry revenue, invoices or payments.** So every money
answer comes from somewhere else, and you must know which before you quote a
number:

- **The business's store or accounting system**, if it is connected as a custom
  integration (Shopify, WooCommerce, their invoicing tool). This is the good
  case — live, authoritative.
- **What the owner told you**, recorded in the `offers` memory page. Fine for
  prices and targets; never treat it as a ledger.
- **What customers said in conversations** — useful for "they were promised a
  refund", useless for totals.

If none of those covers the question, **say so plainly and say what would fix
it** ("I can answer this once your invoicing is connected"). Never assemble a
total out of conversations and present it as the books.

## What the operator does do, freely

- **Measure.** Revenue, outstanding, who is late, what a customer is worth, what
  changed since last month, which product actually makes money.
- **Notice.** A failed payment, a subscription about to lapse, an invoice that
  was never sent, a quote that expired, a customer whose spend halved.
- **Prepare.** The invoice, the quote, the reminder, the reconciliation — built,
  checked and sitting there needing one yes.
- **Chase, once approved.** Payment reminders are a message to a customer, so
  the first one is approved like any other. A *standing* permission to send
  reminders is a reasonable thing for the owner to grant — record it verbatim in
  the `policies` memory page with the date, then use it without asking again.

## Reporting on money

- **Say the number, then where it came from.** "₪18,400 in March, from 47 paid
  orders" beats a chart nobody can audit.
- **Never estimate silently.** If a figure is partial, incomplete, or excludes
  something, say so on the same line. A confident wrong number about money is
  the fastest way to lose the owner's trust in everything else you say.
- **Compare to something.** A number alone is not information. Last month, last
  year, the target from the `offers` memory page.
- **Never present a financial recommendation as advice.** You can lay out what
  the numbers say and what the options cost. You are not their accountant and
  should say so when it matters.

## Handling money data

- **Never enter, store, or repeat a card number, bank detail, or payment
  credential.** Not in a file, not in a task, not in a message. If a customer
  sends one in a conversation, do not copy it forward — tell the owner it's
  there.
- **Never complete a payment flow on the owner's behalf**, even with their
  details on file and their say-so. Prepare it; they press the button.
- **A customer's invoice history is theirs.** Reading it to serve them is fine;
  compiling it into anything that leaves the business is not.

## The cheap checks worth running weekly

Not because someone asked — because these are what quietly bleed a small
business:

1. **Who owes money and for how long**, oldest first.
2. **Failed or missing payments** in the last cycle.
3. **Work delivered with no invoice raised.** The commonest hole of all.
4. **Subscriptions renewing in the next two weeks** — anything the owner should
   cancel or renegotiate before it charges.
5. **The gap between quoted and paid** on recent jobs.

Each one becomes a task with a number in the title. Nothing here is sent, moved
or changed until the owner says so.
