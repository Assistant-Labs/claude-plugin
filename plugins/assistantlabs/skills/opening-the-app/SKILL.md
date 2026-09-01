---
name: opening-the-app
description: >
  Putting the right Assistant Labs screen in front of the owner at the right
  moment — the real product UI, by link, rather than a rebuilt version of it.
  The screen map, when each one is worth opening, how to offer it in one line,
  and the rule against building a view for something that already has one. Use
  whenever the answer would be easier to SEE than to read: a conversation, a
  contact, the inbox, settings, the board, a channel that needs reconnecting.
---

# Opening the app

The business already has a full interface: an inbox, contact records, the
agent's knowledge, settings, a task board. **Never rebuild one of those as a
generated page.** A rebuilt screen is a second version of the truth that goes
stale the day someone ships a change to the real one, and it cannot do the thing
the real one does — let them click.

The job is not to make a UI. It is to **load the right thing at the right
moment**, so the owner goes straight to the screen that answers the question
instead of hunting through a menu.

## The rule

> **If a screen exists, link to it. If it doesn't, ask whether the answer really
> needs a screen — it usually needs a sentence.**

A generated page is justified only when something genuinely spans surfaces that
have no shared screen, and even then, prefer a short written answer plus a link
to the nearest real one. Building one is a decision to maintain it.

## The screens

**The host is `https://assistantlabs.io`.** There is no `app.` subdomain — it
does not resolve, so a link built on one is dead and the owner sees a browser
error with our name on it. The app lives at `assistantlabs.io/app/...`.

Every path below is `https://assistantlabs.io` + the route, with `:assistantId`
filled in from the workspace. Keep this in step with `RoutePath` in the app —
if a link 404s, the enum is the source of truth, not this table.

| Screen | Path | Open it when |
|---|---|---|
| **Create an agent** | `/onboarding` | FALLBACK ONLY. `create_agent` makes the same record from here — send them to the app only when that tool is absent (older connection, or `agent:create` not granted) |
| **Home** | `/app` | "Show me everything" — the dashboard the owner already knows |
| **Conversations** | `/app/assistants/:id/conversations` | They ask who wrote in, or you have just told them someone is waiting |
| **One conversation** | `/app/assistants/:id/conversations/:threadId` | Any time you quote or summarise a thread — always link the thread itself |
| **Contacts** | `/app/assistants/:id/contacts` | Anything about the customer list, labels, tidying |
| **One contact** | `/app/assistants/:id/contacts/:contactId` | After updating a record — this is the link that lets them check your work |
| **Audiences (segments)** | `/app/assistants/:id/audience` | Before building a group, so they can see who is in it |
| **Follow-ups** | `/app/assistants/:id/settings/follow-ups` | You drafted a sequence and it needs switching on |
| **Training** | `/app/assistants/:id/training` | You filed a training proposal for review |
| **Analytics** | `/app/assistants/:id/analytics` | They ask how it is going over time |
| **Agent knowledge** | `/app/assistants/:id/settings/faq` · `…/catalog` · `…/business-details` · `…/persona` · `…/links` · `…/guidelines` | You changed something in the agent's head, or want them to check it |
| **Labels** | `/app/assistants/:id/settings/labels` | Labels come up — they are the substrate for everything targetable |
| **Channels** | `/app/assistants/:id/settings/channels` (`…/whatsapp`, `…/email`, `…/instagram`, `…/messenger`, `…/website`, `…/shareable-link`) | A channel is down, or nothing is connected yet |
| **Notifications** | `/app/assistants/:id/settings/notifications` | Setting up who gets told what. Behind a feature flag — if it bounces them to Sources, that account does not have it, so do the work over the API and do not send them again |
| **Claude connection** | `/app/assistants/:id/settings/claude-mcp` | Permissions need changing, or a connection was revoked |
| **Flows** | `/app/assistants/:id/settings/flows` | A deterministic flow may already handle what they are asking for |
| **Catalogue media** | `/app/assistants/:id/settings/catalog` | A catalogue item needs a picture — the gallery lives inside the item, not on its own screen |
| **Marketing media library** | `/app/assistants/:id/growth/media` | Images for posts and campaigns. A different library from the catalogue one |
| **Billing** | `/app/billing` | Plan, invoices, payment |
| **API keys** | `/app/account/organization/api-docs` | API keys, scopes, the developer reference |
| **Task board** | `https://assistantlabs-tasks.web.app` (a task: `/t/<taskId>`) | Anything you filed, and every approval waiting on them |

## During setup, a link beats a paragraph

The moments in onboarding where a screen is the right answer, in the order they
come up:

| They need to | Send them to |
|---|---|
| Create their first agent | `/onboarding` |
| Connect WhatsApp | `/app/assistants/:id/settings/channels?connect=whatsapp` |
| Connect Instagram | `/app/assistants/:id/settings/channels?connect=instagram` |
| Connect Messenger | `/app/assistants/:id/settings/channels?connect=messenger` |
| Connect website chat | `/app/assistants/:id/settings/channels?connect=website` |
| Connect email, or anything else | `/app/assistants/:id/settings/channels` |
| **Try the agent** | `/app/assistants/:id?test=1` — opens with the test chat already up |

**Always render these as titled markdown links** — `**[Connect WhatsApp →](…)**`
— never as a bare URL. These URLs carry an `assistant_` uuid and a query string;
pasted raw they read as machinery and make the conversation feel technical.

**`?test=1` opens the try-it dock on arrival.** Use it the moment an agent is
built — watching her answer is what makes it real, and "you can try her in the
app" is the version that never gets done. It works on any assistant route, so
pair it with the page you actually want them on.

**`?connect=` opens that channel's connect flow on arrival** — the modal is
already up when the page paints, so they are one click from connected rather
than hunting a tile. Use it every time you name a channel. Values:
`whatsapp`, `instagram`, `messenger`, `website`.

- **The param is consumed once** and stripped from the URL, so a refresh does
  not reopen a modal they just closed. Send the link again if they need it again.
- **Email and the shareable link have no `?connect=` value** — they have their
  own screens rather than a modal on this page. Link the plain channels page.
- **An unknown value lands them on the channels page with everything visible**,
  which is a safe failure, but do not rely on it: send a value from the list.
| Check what the website scan found | `/app/assistants/:id/settings/faq` (and the other knowledge tabs) |
| See the board you just filled | `https://assistantlabs-tasks.web.app` |
| Change what this connection may do | `/app/assistants/:id/settings/claude-mcp` |

**Do not narrate a screen you could open.** "Go to Settings, then Channels, then
find WhatsApp and click Connect" is four chances to lose somebody. One link is
none.

## How to offer one

- **One link, named by what they will see.** "Dana's conversation" — not a bare
  URL, and not three links in case one is useful.
- **After the answer, not instead of it.** Say what is true, then offer the
  screen so they can check it. A link on its own is homework.
- **Link the specific thing.** The thread, the contact, the sequence — never the
  list when you know the id. Making them find the row again is the friction this
  whole skill exists to remove.
- **When you changed something, always link it.** That is how they audit you,
  and it is the difference between "I updated her record" and something they can
  verify in two seconds.
- **Don't link what they are already looking at**, and don't repeat a link you
  gave a moment ago.

## What this is not

- **Not a menu.** Offering six screens is the same as offering none.
- **Not a substitute for the answer.** "Here's the conversations screen" when
  they asked who is waiting is a dodge; the answer is the count and the name.
- **Not a place to send them for something you can do.** If it is yours to fix,
  fix it and link the result.

## When a generated view IS the right call

Rare, and worth naming so it does not become a habit:

- A **cross-product summary** with no home — a week that spans conversations,
  money and leads. Even then: the brief on their phone usually beats a page.
- A **document they will keep or forward** — a report for a customer, a
  proposal. That is a document, and `/al-report` already covers it.

If you do build one: it must be readable on a phone, work in both light and dark,
handle right-to-left text if the business writes Hebrew, and **carry only data
you actually fetched**. A page with an invented number on it is worse than no
page, because a page looks authoritative.
