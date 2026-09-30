---
name: onboarding-plan
description: >
  The per-customer setup plan that runs after the agent is built and they have
  tried it: which products they ticked, what the site read found (a store and
  its platform, or not), each product's fastest real wow, the steps ordered by
  time-to-wow with the product named on every one, and how to run them one at a
  time — by tool where one exists, by one titled link where it does not. Use
  right after the "try your agent" moment in the `start` skill, when a setup plan is resuming,
  and whenever someone mid-setup asks "what's next?".
---

# The onboarding plan

They signed in, ticked products, and just watched their agent answer with their
own prices. **That is the moment their attention is highest and their patience
shortest.** Everything they ticked still needs setting up, and a generic tour of
seven products loses them by the third.

So the plan is **built for this one business before step 1**, and it is ordered
by **how fast each step pays off**, not by product. They get a real result every
couple of minutes, and they always know what is being set up and for which
product.

---

## 1 · Read the state first — silently

One pass, before saying anything. Every question the data answers is a
question you must not ask.

| Call | Tells you |
|---|---|
| the site read (`read_business_website` before sign-in, `read_website` after — already run in the background) and the claim's own `platform` | what they sell, and `platform`: shopify, woocommerce, wix, wordpress — or empty, which means *could not tell*, never *no store* |
| `get_agent_config` | what the agent knows, its language, whether the persona is still the default |
| `list_channels` | which channels are already live |
| `get_booking_setup` | Booking: its public address, hours, whether an agent is connected |
| `get_sales_overview` | Sales: agent connected, WhatsApp ready, groups, journeys |
| `list_crm_companies` | CRM: that it answers — the agent link itself cannot be read |
| `get_helpdesk_order_status_policy` | Helpdesk: whether an agent is connected, and whether order answers are live |
| `get_marketing_overview` | Marketing: connected social accounts, posts |
| `.assistantlabs/setup.json` → `plan` | a plan already running — resume it, never rebuild it |

**Only call a product's read if they ticked it.** The tools a connection
carries are the products its consent ticked, so a read that is not there — or
comes back refused for permission — means that product was not ticked. Leave it
out of the plan and do not mention it.

**Booking comes pre-ticked**, like Tasks. Its tools being there is not a request.
It earns a step only when something is actually bookable — a workshop, a
fitting, a treatment, a consultation. A shop with nothing to book gets no
Booking step and one line saying why.

**Tasks is always on.** It never appears as a choice and never gets a setup
step — it is where anything waiting on Meta or on them lands.

### When the site read found no store

`platform` empty, `wordpress`, or no website at all: **ask before you show the
plan**, because the answer changes it. One question, `multiSelect: true`:

> What do you already run the business on?
> *An online shop* · *A calendar or booking system* · *A spreadsheet or a CRM* ·
> *None of these*

The read recognises Shopify, WooCommerce, eShop, Wix and WordPress. Anything
else — Konimbo, a custom build, a site that refused the read (`blocked`) —
reads as empty, so a store you could not detect is asked about, never assumed
away. Map the answer with the table in `teaching-the-business` (*Then: what they
already run*); anything with no page there is the `integration` skill.

**eShop is a store** — `platform: eshop` puts connecting it first, like Shopify,
on `…/settings/integrations/eshop`.

---

## 2 · Each product's fastest real wow

**Only these.** Each one was checked against what the product does today. Never
promise a result that is not in this table — a wow that does not happen is worse
than none.

| Product | Fastest real wow | Time | Who does it |
|---|---|---|---|
| **Agents** | Answers with their real prices — already delivered by the surprise | done | — |
| **Agents + their store** | **Shopify:** answers from the live shop — in-stock items, today's price — and a buyer who writes in is recognised by the phone or email they bought with, because the install brings the store's customers in as contacts. **WooCommerce / Wix:** answers from the live store | ~2 min | they, one link |
| **Marketing** | A first post about what their site leads with, written in their words, saved as a draft | ~1 min | you, by tool |
| **Booking** + Agents | Their public booking page is live, and the agent books appointments mid-conversation | ~2 min | you, by tool, after one confirm |
| **CRM** | Everyone the agent knows, one record each — for a Shopify store, the whole customer list on day one | ~1 min | they, one link (admin only) |
| **Sales** + Shopify | Three win-back audiences counted live from the store: top spenders, loyal customers at risk, likely to buy again | ~2 min | they, one link |
| **Channels** (Agents) | A real customer can reach the agent | 2–10 min | they, a link per channel |
| **Helpdesk** + Agents, on Shopify | "Where's my order?" answered from Shopify | ~3 min | they, one link — then you, one switch on their yes |
| **Helpdesk** with history | Their recent conversations arrive as tickets, each with a title | ~2 min | they, one link |
| **Sales** + Agents | A first win-back journey, drafted — nothing sent | ~3 min; Meta approves the templates in hours | they, one link — then you |
| **Tasks** | Already on | 0 | — |

### Not a step yet — pitch it, never hand it over as done

Sell the whole product and where it is going; that is what they are buying.
These are the few things that cannot be a *step's wow today*, because a wow
they tap has to work when they tap it. Talk about them as what is coming or
what the integration meeting sets up — never as something already in their
account.

- **Last week's abandoned carts, or their ₪ value.** Sales catches abandoned
  carts only from the moment the store is connected. The closest real thing is
  the *likely to buy again* audience, which counts recent checkout-abandoners
  together with repeat buyers — say *counted*, never a shekel figure.
- **Order answers on Shopify without the Helpdesk.** The lookup runs through
  it. No Helpdesk ticked, no order promise.
- **The order answer in the test chat.** The default rule answers only the
  customer whose phone or email is on the order, and the test chat proves
  neither — it shows itself on WhatsApp. Loosening it to *order number is
  enough* is their call, offered once, never yours.
- **Sales on WooCommerce, Wix or eShop.** Store-driven journeys are Shopify
  only; elsewhere Sales runs on groups and leads.
- **A journey's trigger or its going live, by tool.** `create_journey` drafts the
  steps; the trigger and the switch are theirs, in the app.

---

## 3 · Order the steps

1. **Their store first**, when the site read found Shopify, WooCommerce or eShop. The
   agent should know the orders and the stock before a real customer reaches
   it. Wix, and a store they named when asked, go first too.
2. **Then by time-to-wow, shortest first.**
3. **Dependencies beat speed.** A channel comes before anything that sends on
   WhatsApp — booking messages, a journey going live, the order answer's demo.
   The voice comes after they have chatted with the agent — never first, and
   ideally before real customers reach it.
4. **Alternate where you can:** a step they do by link, then one you do by tool.
   Two trips out of the chat in a row is where people drift off.
5. **Drop what has no wow for this business**, and say so in one line —
   *"Skipping Booking — nothing on your site is booked by time."*
6. **Skip what is already done.** A live channel, a connected store, an agent
   already on Booking — none of it reappears.

**Zig-zagging between products is fine; an unclear step is not.** Every step is
labelled with what it sets up and for which product.

---

## 4 · Show the plan once

**The one message allowed to run past five lines** — one line per step, and
nothing else. More than nine steps means the plan is too fine: merge, or leave
the weakest for a later session.

- **The meeting first, once** — the block below, word for word. It is the
  founder's own wording: an offer, then a way to keep going without it. Never
  again this session, unless they ask for a person.
- **Then the plan: number · bold label · the product(s) · what they get**, in
  their words.
- **Tasks as a fact**, not an offer.
- **Then step 1, straight away**, in the same turn. Then stop.

> 💜 **Want us to set it up with you?**
> Our team does it with you in a **free integration meeting**, a video call where we connect everything together.
>
> 📅 **[Book your free meeting →](https://booking.assistantlabs.io/book/assistantlabs)**
>
> **Or keep going here. What we'll set up, one at a time:**

In Hebrew:

> 💜 **רוצים שנגדיר את זה יחד איתכם?**
> הצוות שלנו עושה את זה איתכם ב**פגישת הטמעה חינם**, שיחת וידאו שבה אנחנו מחברים הכול ביחד.
>
> 📅 **[לקביעת פגישה חינם ←](https://booking.assistantlabs.io/book/assistantlabs)**
>
> **או שנמשיך כאן. מה נגדיר, צעד אחרי צעד:**

In Hebrew, the plan is written in Hebrew from the first word, and the product
labels stay the product names — the same word on every step, so they learn it.

---

## 5 · Run one step

**One step, then stop and wait.** Never two doors in one message — the channel
step is the one exception (§7) — and never the next step before this one is
verified.

### A step they do — one link

> **Step 3 of 9 · Every customer, one record** · CRM
> One line on why it matters to them.
>
> 🔗 **[Connect your CRM to your agent →](https://crm.assistantlabs.io/settings/connections)**
> One line on what they do on that page.
>
> Say **done** when you're back.

- **One titled link, from `opening-the-app`.** Never a bare URL, never a path
  you built, never "go to Settings, then…".
- **Then verify with a tool call before claiming anything.** If the check fails,
  say what you see in one line and offer the same link once more.
- **If nothing can read it back, say so** — *"I can't see that side from here —
  open your contacts and check they're there"* — never a ✅ you did not earn.

### A step you do — by tool

1. **Show what you are about to write**, from what the site read found — the
   services and prices, the hours, the post. One screenful.
2. **One yes**, then write.
3. **Read it back**, then report with a link so they can see it.

**Drafting needs no yes** — a post saved as a draft reaches nobody. **Anything a
customer will see or be able to use does**: a public booking page, the agent
starting to book, order answers switched on. Publishing and sending stay
`autonomy-and-approvals` red — their yes on the exact thing, every time.

### After every step

> ✅ **What is now true**, with a real number from the check.
> 💬 **One thing to try**, in a customer's words.
> 🔗 **[The screen that shows it →](…)**
>
> **Next · <label>** · <product> — one line. Go?

**"Not now" moves to the next step**, costs nothing, and is recorded. Do not
bring a skipped step back this session.

---

## 6 · The doors and the checks

Every link below is copied from `opening-the-app`. If the two ever disagree,
that skill wins — and nothing here is a link you may build yourself.

| Step · product(s) | Door | Check |
|---|---|---|
| **Your store** · Agents — Shopify | 🔗 `https://assistantlabs.io/app/assistants/:assistantId/settings/integrations/shopify` — one button, **Install from Shopify**; Sales and the Helpdesk reuse the install | `list_contacts` — the store's customers start arriving within a couple of minutes. None yet: say you can't see it, and offer the same link once more |
| **Your store** · Agents — WooCommerce | 🔗 `…/settings/integrations/woocommerce` — they paste the store's REST keys, and switch orders on there | nothing reads it back — ask them to try a product question |
| **Your store** · Agents — Wix, eShop | 🔗 `…/settings/integrations/wix` · `…/settings/integrations/eshop` | as above. Helpdesk ticked on Wix: then `connect_helpdesk_wix` reuses the install |
| **Your first post** · Marketing | by tool: `get_product_profile` → `update_product_profile` from the site → `draft_post` about what the site leads with | `list_posts`, then 🔗 `https://marketing.assistantlabs.io/social/posts` |
| **Booking page** · Booking + Agents | by tool: `update_booking_setup` (name, hours from the site — the defaults are not theirs) → `add_service` → `connect_agent` with the id from `list_connectable_agents` | `get_booking_setup` and `list_services`, then the public page `https://booking.assistantlabs.io/book/<slug>` |
| **Every customer, one record** · CRM | 🔗 `https://crm.assistantlabs.io/settings/connections` — they pick the agent | nothing reads the link back — `list_contacts` gives the number to quote, 🔗 `https://crm.assistantlabs.io/contacts` shows it |
| **Who to win back** · Sales + Shopify | 🔗 `https://sales.assistantlabs.io/settings/store/shopify` — they type the store's name; it reuses the install and shows the three audiences with live counts | nothing reads it back — they see the counts on that page |
| **Go live** · Agents | a link per channel — §7 | `list_channels` |
| **"Where's my order?"** · Helpdesk + Agents | 🔗 `https://helpdesk.assistantlabs.io/settings/agent`. Then ask *"answer order questions for the customer whose phone or email is on the order?"* and, on yes, `set_helpdesk_order_status_disclosure` — Shopify, on, the default fields that `get_helpdesk_order_status_policy` lists. A new store has them off until this is set | `get_helpdesk_order_status_policy` — its coverage must say lookups answer. The screen can show them on while nothing answers; the coverage is the truth |
| **First win-back journey** · Sales + Agents | 🔗 `https://sales.assistantlabs.io/connect`, then `create_journey` as a draft | `get_sales_overview` — agent connected, WhatsApp ready — then 🔗 `https://sales.assistantlabs.io/journeys` |
| **Booking messages** · Booking + Agents | by tool: `setup_booking_messages` — needs WhatsApp live | `list_booking_messages`. Meta approves in hours: file it with `create_task`, move on |
| **Its voice** · Agents | one line from them, the way they would really send it → `set_agent_persona` | `get_agent_config` — the tone is set, then 🔗 `…/settings/persona?test=1` |

`…` is `https://assistantlabs.io/app/assistants/:assistantId`.

---

## 7 · The channel step

List all five, say who we are to Meta, and let them pick several:

> **Step 7 of 9 · Go live** · Agents
> Where should customers reach your agent? WhatsApp, Instagram, Messenger, email,
> your website — pick as many as you like. We're a verified Meta partner, so
> WhatsApp, Instagram and Messenger connect straight from our page.

In Hebrew, the partner line is **שותפים רשמיים של מטא**, as written.

Ask with the question control, `multiSelect: true`, and never re-offer a channel
`list_channels` shows live. Then **the one exception to one link per step: a
titled link per channel they picked, all in one message**, each with its one
line — the channel pages and what they do on each are in `opening-the-app`.
WhatsApp needs a Meta business account and their number; website chat needs
nothing. Say that once, only for the ones they picked.

When `list_channels` shows one live, also record `channels: true` in the state
file — it is one of the five required steps (`getting-started`).

---

## 8 · Keep the plan

Setup gets interrupted. The plan must survive it.

- **Write it to `.assistantlabs/setup.json` as `plan`** the moment you show it,
  one entry per step: `{ "step": "store", "products": ["agents"], "state": "open" }`.
  `state` is `open`, `done` — only once the check passed — or `skipped`, only when
  they said not now.
- **Resume at the first open step.** Never re-show the plan to somebody who has
  seen it; say where you are in one line and carry on.
- **Anything waiting goes on the board** with `create_task` — a template with
  Meta, a step they said they would do tonight. That is what Tasks is for.

---

## Worked example — Luma Studio

The site read found a **Shopify** candle shop: soy candles ₪69–₪149, gift sets,
and candle-making workshops on Fridays. They ticked Agents, Booking, CRM, Sales,
Helpdesk and Marketing. No channel is live yet. *(Numbers below are
illustrative.)*

**The plan, then step 1 — one turn:**

> 💜 **Want us to set it up with you?**
> Our team does it with you in a **free integration meeting**, a video call where we connect everything together.
>
> 📅 **[Book your free meeting →](https://booking.assistantlabs.io/book/assistantlabs)**
>
> **Or keep going here. What we'll set up, one at a time:**
>
> 1. **Your Shopify store** · Agents — it answers from live stock and prices
> 2. **Your first post** · Marketing — I write it from your site
> 3. **Every customer, one record** · CRM — your Shopify buyers, organised
> 4. **Workshop booking page** · Booking + Agents — Friday workshops, bookable
> 5. **Who to win back** · Sales + Shopify — three audiences, counted from your store
> 6. **Its voice** · Agents — one line from you, and it sounds like you
> 7. **Go live** · Agents — WhatsApp, Instagram, Messenger, email, your site
> 8. **"Where's my order?"** · Helpdesk + Agents — answered from Shopify
> 9. **Your first win-back message** · Sales + Agents — drafted, sent only on your yes
>
> **Tasks is already on** — anything waiting on Meta or on you lands on your board.

> **Step 1 of 9 · Your Shopify store** · Agents *(Sales and Helpdesk reuse it)*
> So your agent knows what's in stock and today's price before a real customer asks.
>
> 🔗 **[Connect your Shopify store →](https://assistantlabs.io/app/assistants/:assistantId/settings/integrations/shopify)**
> One button, **Install from Shopify** — pick the store, approve, you land back connected.
>
> Say **done** when you're back.

**They say done.** `list_contacts` first, then:

> ✅ **Luma Studio's shop is connected** — your customers are coming in, 312 so far.
> 💬 Ask it *"any soy candle under ₪90?"* — it answers from the shop, in stock only.
> 🔗 **[Try it →](https://assistantlabs.io/app/assistants/:assistantId?test=1)**
>
> **Next · Your first post** · Marketing — nothing for you to do. Go?

Why this order: the store is first because it is Shopify, and it is what makes
the CRM (its buyers) and Sales (its audiences) pay off on the spot. The post,
the booking page and the voice are yours to do, so each sits between two trips
out of the chat. The voice comes after it has been tried and before customers
reach it. The order answer and the win-back message wait for WhatsApp — the
first because the default rule shows itself there, the second because it sends
there.

---

## Do not

- **Do not show the plan twice**, and do not re-number it mid-way — a step
  skipped is marked, not deleted.
- **Do not announce a product they did not tick**, and never offer Tasks as a
  choice.
- **Do not claim a step done on their "done" alone** when a tool can check it.
- **Do not build a link.** If `opening-the-app` has no page for it, it is a
  tool step, or a question.
