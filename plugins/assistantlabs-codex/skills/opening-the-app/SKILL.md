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

## Where each product lives

Seven products, seven hosts. **Never invent one** — an `app.` subdomain, a
`tasks.` one, a path under the wrong host: each of those is a browser error with
our name on it.

| Product | Host |
|---|---|
| Agents | `https://assistantlabs.io` — the app itself is under `/app/...` |
| Sales | `https://sales.assistantlabs.io` |
| Booking | `https://booking.assistantlabs.io` |
| CRM | `https://crm.assistantlabs.io` |
| Helpdesk | `https://helpdesk.assistantlabs.io` |
| Marketing | `https://marketing.assistantlabs.io` |
| Tasks | `https://assistantlabs-tasks.web.app` |

**Agents links carry the agent's id** — everything sits under
`/app/assistants/:id`. **The other six never do** — each reads the workspace from whoever is signed in, so the same
link works for anyone on the team.

**Not signed in there yet is fine** — every product signs them in and returns
them to the exact link, query string included.

**Two things that do break a good link:**

- **Not switched on for them.** Each product sends somebody without access to
  its own request-access page. Link only products this connection actually
  reaches.
- **Sales hides two sections by default** — Team (where groups live) and
  Customers. A link into either bounces to the Sales home unless that
  workspace turned it on.

## Agents — the screens

Every path below is `https://assistantlabs.io` + the route, with `:id` filled
in from the workspace. Keep this in step with `RoutePath` in the app — if a link
404s, the enum is the source of truth, not this table.

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
| **Channels** | `/app/assistants/:id/settings/channels` — the overview; each channel has its own page (below) | They want to see everything at once |
| **Integrations** | `/app/assistants/:id/settings/integrations` — the overview; each one has its own page (below) | They ask what it can connect to |
| **Notifications** | `/app/assistants/:id/settings/notifications` | Setting up who gets told what. Behind a feature flag — if it bounces them to Sources, that account does not have it, so do the work over the API and do not send them again |
| **MCP connection** | `/app/assistants/:id/settings/claude-mcp` | Permissions need changing, or a connection was revoked |
| **Flows** | `/app/assistants/:id/settings/flows` | A deterministic flow may already handle what they are asking for |
| **Catalogue media** | `/app/assistants/:id/settings/catalog` | A catalogue item needs a picture — the gallery lives inside the item, not on its own screen |
| **Marketing media library** | `/app/assistants/:id/growth/media` | Images for posts and campaigns. A different library from the catalogue one |
| **Billing** | `/app/billing` | Plan, invoices, payment |
| **API keys** | `/app/account/organization/api-docs` | API keys, scopes, the developer reference |
| **Inbox** | `/app/assistants/:id/crm` | The agent's own inbox of conversations |
| **Sources** | `/app/assistants/:id/settings/sources` | Where each piece of the agent's knowledge came from |
| **Public chat page** | `https://assistantlabs.io/chat/:id` | Somebody wants to talk to the agent with no app — see *Try the agent* below |

## Try the agent

Two doors, for two different people:

| For | Link | What happens |
|---|---|---|
| **The owner, signed in** | `/app/assistants/:id?test=1` | The app opens with the test chat already up. `?test=1` works on every agent page, so pair it with the page you want them on — `/app/assistants/:id/settings/faq?test=1` shows the answers and the chat side by side |
| **Anyone, no sign-in** | `https://assistantlabs.io/chat/:id` | A public chat page. An agent made with `create_agent` has it switched on, and the call returns it as `chatLink` — hand over that. **An older agent shows "unavailable" there until the owner switches it on** (`/app/assistants/:id/settings/channels/shareable-link`), so for one of those, send that page instead of a link that opens on an error |

`?test=1` is read once and removed, so a refresh does not reopen a chat they
closed.

## Connecting a channel — one page each

**Every channel has its own page, and that page is the door.** It explains the
channel and carries the button that starts the connection. Nothing opens by
itself: there is no parameter that starts a connection for them, and the old
`?connect=` on the channels overview is dead — nothing reads it any more.

| Channel | Page | What they do there |
|---|---|---|
| WhatsApp | `/app/assistants/:id/settings/channels/whatsapp` | Click connect and sign in with Facebook. The page shows our Meta badge |
| Instagram | `/app/assistants/:id/settings/channels/instagram` | Click connect and approve in Instagram |
| Messenger | `/app/assistants/:id/settings/channels/messenger` | Click connect and pick the Facebook page |
| Email | `/app/assistants/:id/settings/channels/email` | Set up a forwarding address — step-by-step guides per provider at `/app/assistants/:id/settings/channels/email/guides` |
| Website chat | `/app/assistants/:id/settings/channels/website` | Copy one snippet onto their site |
| Public chat link | `/app/assistants/:id/settings/channels/shareable-link` | Switch it on, then copy the link or the QR code |
| LinkedIn | `/app/assistants/:id/settings/channels/linkedin` | Click connect |

## Connecting the tools they already run

**Agents** — `/app/assistants/:id/settings/integrations/:key`, one page each.
The keys: `shopify`, `woocommerce`, `eshop`, `wix`, `monday`, `googleCalendar`,
`googleSheets`, `booking`, `calendly`, `facebookCatalog`, `flashy`, `sendMsg`,
`make`, `assistantlabs`. Anything with no page there: the `integration` skill.

| To connect | Link | What they do there |
|---|---|---|
| **A Shopify store** | `/app/assistants/:id/settings/integrations/shopify` | One button, **Install from Shopify**. They pick the store in Shopify, approve, and land back connected. **One install serves every product** — Sales and the Helpdesk reuse it, with no second approval in Shopify |
| **A WooCommerce store** | `/app/assistants/:id/settings/integrations/woocommerce` | Paste the store's REST API keys (WooCommerce → Settings → Advanced → REST API in their WordPress) |
| **Booking, into the agent** | `/app/assistants/:id/settings/integrations/booking` | Switch it on; the agent books appointments mid-conversation |

**The other side of a connection has its own page too:**

| To | Link |
|---|---|
| Put Sales on their Shopify store | `https://sales.assistantlabs.io/settings/store/shopify` — asks for the store's name, then reuses the existing install |
| Put Sales on their agent | `https://sales.assistantlabs.io/connect` |
| Put Booking on their agent | `https://booking.assistantlabs.io/settings/agent` |
| Connect Google Calendar to Booking | `https://booking.assistantlabs.io/settings/calendar` |
| Put the CRM on their agent | `https://crm.assistantlabs.io/settings/connections` — only an admin can connect |
| Put the Helpdesk on their agent | `https://helpdesk.assistantlabs.io/settings/agent` — channels and intake live here too |
| Connect Instagram, Facebook, YouTube or TikTok for posting | `https://marketing.assistantlabs.io/settings/channels` |
| Connect a Meta ad account | `https://marketing.assistantlabs.io/settings/ads` |

## The other products — the screens worth opening

**Sales** — `https://sales.assistantlabs.io`

| Screen | Path |
|---|---|
| Leads board / one lead | `/leads` · `/leads/<contactId>` |
| Journeys / one journey | `/journeys` · `/journeys?open=<journeyId>` (no page of its own) |
| Groups / one group | `/team/source` · `/team/source/<groupId>` — Team is off by default |
| WhatsApp templates | `/tools/whatsapp-templates` |
| Test users | `/settings/test-users` |
| Integrations | `/settings/integrations` (`/agents`, `/booking`) |
| Lead settings | `/settings/leads` |

**Booking** — `https://booking.assistantlabs.io`

| Screen | Path |
|---|---|
| The diary / one appointment | `/` · `/appointments/<appointmentId>` |
| Services / new service | `/services` · `/services/new` |
| Business name and booking address | `/settings` |
| Opening hours / booking rules | `/settings/hours` · `/settings/rules` |
| The public booking page | `/book/<slug>` — public, no sign-in. The slug is set at `/settings` |

**CRM** — `https://crm.assistantlabs.io`

| Screen | Path |
|---|---|
| Contacts / one contact | `/contacts` · `/contacts/<contactId>` — import is a button on `/contacts`, not a page |
| Companies / one company | `/companies` · `/companies/<companyId>` |
| Customers | `/customers` |
| Record types | `/settings/record-layouts` |

**Helpdesk** — `https://helpdesk.assistantlabs.io`

| Screen | Path |
|---|---|
| Inbox / one ticket | `/inbox` · `/inbox/<ticketId>` — `?queue=escalated`, `?queue=unassigned`, `?queue=stale`, `?queue=me` narrow it |
| Workflows / a new one | `/settings/workflows` · `/settings/workflows/new` |
| Business hours / SLA / team | `/settings/business-hours` · `/settings/sla` · `/settings/team` |
| Integrations | `/settings/integrations` |

**Marketing** — `https://marketing.assistantlabs.io`

| Screen | Path |
|---|---|
| Strategy / one strategy | `/strategy` · `/strategy/<strategyId>` |
| Product profile / research | `/strategy/profile` · `/strategy/research` |
| Posts / a new post / one post | `/social/posts` · `/social/posts/new` · `/social/posts/<postId>` |
| Instagram automations / one rule / what they did | `/social/automations` · `/social/automations/<automationId>` · `/social/automations/activity` |
| Email campaigns / one campaign | `/email` · `/email/<campaignId>` — Launch and Pause are buttons on the campaign |
| Email templates / one in the editor | `/studio/email-templates` · `/studio/email-templates/<templateId>` |
| Media library / brand kit | `/studio` · `/studio/branding` |
| Ads / a new ad / one ad | `/ads` · `/ads/new` · `/ads/<adId>` |
| Settings: social accounts / Meta ad account / in-app AI | `/settings/channels` · `/settings/ads` · `/settings/ai` |

**Tasks** — `https://assistantlabs-tasks.web.app`

| Screen | Path |
|---|---|
| What needs them | `/needs-you` |
| The board / one task | `/board` · `/t/<taskId>` |

## During setup, a link beats a paragraph

**Always render these as titled markdown links** — `**[Connect WhatsApp →](…)**`
— never as a bare URL. These URLs carry an `assistant_` uuid; pasted raw they
read as machinery and make the conversation feel technical.

| To | Send them |
|---|---|
| Check what the agent learned from their website | `/app/assistants/:id/settings/faq` |
| Change what this connection may do | `/app/assistants/:id/settings/claude-mcp` |
| See the board you just filled | `https://assistantlabs-tasks.web.app/board` |

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
  proposal. That is a document, and the `report` skill already covers it.

If you do build one: it must be readable on a phone, work in both light and dark,
handle right-to-left text if the business writes Hebrew, and **carry only data
you actually fetched**. A page with an invented number on it is worse than no
page, because a page looks authoritative.
