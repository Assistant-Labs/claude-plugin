---
name: teaching-the-business
description: >
  How an agent learns a business — the three sources (website, document,
  interview), recording each one so the owner can see where a fact came from,
  which module every kind of fact goes into, and the receipt you show when the
  writing is done. Read before creating or teaching an agent, before running
  /al-website, /al-document or /al-interview, and any time you are about to
  write knowledge into somebody's agent.
---

# Teaching the business

An agent that does not know the business is a chatbot. Everything an owner
values — the right price, the right hours, the answer they are tired of typing
— arrives through here.

**Three ways in, and no ranking between them:**

| Route | Command | Source type | For |
|---|---|---|---|
| Their website | `/al-website` | `url` | anyone with a site, however thin |
| A document they already send people | `/al-document` | `file` | price lists, menus, the PDF for new customers |
| Asking them | `/al-interview` | `interview` | no site, nothing written down — most small businesses |

They stack. A site plus twenty minutes of questions beats either alone, and the
second route is not a repair of the first.

## Never open on what they lack

"There is no agent yet", "your agent knows nothing", "nothing is set up" — all
true, all the wrong first sentence. It is their first minute; naming the hole
makes the product sound unfinished and makes them feel behind. Offer the three
doors instead. Every business can walk through at least one of them.

## Every route records a source, before it writes anything

`add_agent_source` first, then the modules, each carrying `sourceId`.

This is not bookkeeping. It is what lets the owner ask "where did it get that?",
replace one source's knowledge wholesale when their prices change, and delete a
bad import in one action instead of hunting the modules it left behind. Modules
written with no source belong to nothing, and nothing can take them away as a
set.

**In the app it is Settings → Sources**, the same list, so what you did from
here looks exactly like what the app does. Use the name they would use — the
site's name, the document's name, "What Michal told me, 14 Aug".

## Where each kind of fact goes

`patch_agent_module`, one call per module, content under the key that module
uses — `get_agent_module` first, and send the FULL object back.

| Module | Write it when | Content key |
|---|---|---|
| 🏢 `business` | always — what they do, where, hours, how to reach them | `options.about` + `options.contactInformation` |
| ❓ `faq` | always — the questions they are plainly tired of answering | `options.faq` |
| 🛍️ `catalog` | they sell nameable things: classes, treatments, products, courses | `options.items` |
| 🔗 `links` | booking, price list, timetable, terms | `options.items` |
| 📏 `guidelines` | a stated rule: cancellation, deposits, health form, refunds | `options.rules` |
| 🏷️ `labels` | rarely at setup — labels come from real conversations | `options.labels` |

**Stopping after `business` is the commonest failure and the worst**, because
the agent looks configured and answers nothing.

**These stay empty after any source, and that is correct:** 🎬 `scenario`,
🎯 `lead-qualification`, 🙋 `human-escalation`, 🩹 `unsatisfied-customer`,
🏷️ `labels`. They come from watching real conversations. Propose them later,
from what customers actually wrote.

## Show your working before you write

Whatever the route, the owner sees what you understood **before** it goes in,
and can correct it in the same breath. Watching their agent learn, and fixing
it while it happens, is the entire reason to do this in a conversation instead
of in a settings screen.

Correct first, write second. Never both at once, and never a write announced as
a question.

## The receipt

When the writes are done, say exactly what went in — one line per module, with
its emoji and a **count**:

> Saved. Here's what your agent now knows:
>
> 🏢 **Business** — Michal Yoga, Ramat Gan, since 2003. Closed Saturdays.
> ❓ **FAQ** — 11 answers: mats · beginners · what to wear · parking · cancelling…
> 🛍️ **Catalog** — 4 items: single class ₪70 · card of 10 ₪650 *(your correction)* · monthly ₪450…
> 🔗 **Links** — 3: the timetable, the booking page, directions
> 📏 **Guidelines** — 1 rule: Thursday evening is advanced, say so before anyone books
>
> Empty on purpose: scenarios, lead questions, when to fetch you, unhappy
> customer, labels. Those come from real conversations, and I'll propose them
> once there are some.
>
> **Anything above wrong? Say so and I'll change it now.**

**Counts, not adjectives.** "11 answers" is checkable; "your FAQ is set up" is
not, and the second is how people end up believing their agent knows things it
does not.

**Quote their correction back** on the line it changed. It is the proof you
listened, and it takes four words.

**Name the empty ones.** A summary that quietly omits half the modules reads as
complete when it is not — and saying *why* they are empty turns a gap into the
next thing that happens.

**Read the config back before you claim any of it.** `get_agent_config` and
look. Reporting knowledge the agent does not have is a false statement about
somebody's business, and they find out from a customer.

## Then: what they already run

Knowledge is what they *say*. Integrations are what is *happening* — the
timetable, the orders, the stock, the sheet. Offer them right after the receipt,
while the agent is fresh in their mind, and before any channel goes live.

**Two to four, chosen — never a list of fifteen.** Pick from what you just
learned about them:

| They are | Offer |
|---|---|
| selling online (Shopify / WooCommerce / Wix / eShop detected on the site) | that store first, always |
| booking time — classes, treatments, appointments | 📅 `googleCalendar`, `calendly` |
| tracking people and deals | 📇 `monday`, `fireberry`, and the Assistant Labs CRM |
| running a spreadsheet everyone edits | 📊 `googleSheets` |
| none of the above, or something bespoke | 🔌 `/al-integration` — if it has an API, it can be built |

**Say what you skipped and why**, in one line: *"Skipping the shop connectors —
you don't sell online."* That is what proves the two you offered were chosen
rather than listed alphabetically.

**Connecting is a link, never a paragraph.** Each one has a screen at
`/app/assistants/:assistantId/settings/integrations/:integrationKey` — OAuth happens where it
already works. See `opening-the-app`. The one route with no screen is a custom
one, which is what `/al-integration` is for.

## What never happens here

- **No channel until the agent is worth reaching.** Connecting WhatsApp to an
  empty agent puts real customers in front of something that cannot help them.
- **No "setup complete".** End on their business — what happens the next time a
  customer writes.
- **No inventing.** If the site does not say the cancellation policy, it is an
  open question you ask, not a sensible-sounding default you write into
  somebody's agent.
