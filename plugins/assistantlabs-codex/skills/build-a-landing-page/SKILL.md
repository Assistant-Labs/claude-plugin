---
name: build-a-landing-page
description: >
  Making a landing page for the business with AssistantLabs Pages — for an
  offer, a launch, an event, a campaign or an ad to point at — and wiring its
  leads into the CRM and the WhatsApp agent. Use for "make me a landing page",
  "I need a page for the summer sale", "a page for my Facebook ad", "change the
  headline on my page", "publish the page" or "who signed up on the page".
  Covers the short brief, the draft and its preview link, changes
  by instruction, publishing only on the owner's yes, and connecting the agent.
---

# Building a landing page

A landing page here is a **draft until the owner says it goes live**. The
conversation is always the same four beats: a short brief → a draft with a
preview link → changes in their words → publish on their yes. Then make sure
the leads go somewhere.

The page is data, not HTML: blocks (hero, benefits, steps, offer, gallery,
testimonials, FAQ, form, call-to-action band, text, footer) and a theme, drawn
by one renderer. The preview link shows exactly what visitors will see. You
never write HTML, and you never build the page anywhere else — a page outside
Pages has no lead form wired to the CRM and nobody can change it but you.

## If the Pages tools are missing

`list_landing_pages` not among your tools means this connection has no Pages
permission, or the workspace does not have Pages switched on yet.

- **The connection** — they reconnect AssistantLabs and tick **Pages** on the
  consent screen (see `connect-your-business` for the path on their surface).
- **The workspace** — Pages is switched on per workspace. If the Pages tile is
  not offered at all, they ask for it: `ask_assistantlabs_support` with one
  line saying they want Pages.

## 1. The brief — one to three questions, then go

You need three things. **Look before you ask**: the business memory, the
agent's knowledge (business, catalog, FAQ) and their website usually already
answer most of it.

1. **The offer** — what this page is for. With the real details: price,
   dates, what is included, where.
2. **Who it is for** — new customers, past customers, a neighbourhood, a
   season.
3. **What the visitor should do** — leave their details (the form), message on
   WhatsApp, or book a time.

Ask only for what is still missing, **all in one message, three questions at
most**. "A page for the summer offer" from a clinic whose agent already knows
its prices needs one question at most: which offer.

**Never invent a price, a discount, a date, a guarantee, a number of happy
customers or a testimonial.** The page is published under their name, and a
made-up ₪99 is a promise they now owe a stranger. If the price matters and you
do not have it, ask. If they have no real testimonials, the page has none.

**Language.** An Israeli business gets a Hebrew page unless they say
otherwise (`language: "he"`); an English-speaking one gets English. Write the
page in the owner's voice — their words, not marketing filler.

## 2. The draft

Read `landing_page_vocabulary` once, then **write the page yourself** and send
it as `content` to `create_landing_page`: a hero with one promise, the
benefits, the offer with its real details, a short FAQ, the lead form (name +
phone, with the marketing-consent line), a closing WhatsApp strip, and the
footer with the contact details and a one-line privacy notice. Only facts the
owner gave. Use the business's colours if you know them.


It comes back as a **draft with a `previewUrl`**. Nothing is public yet.

## 3. Show it, then change it in their words

Send the **preview link** with three lines: the headline, the offer as the page
states it, and what the button does. Then one question: what would they change?

Make each round of changes by reading the draft (`get_landing_page`),
changing the blocks they asked about — keep every other block and its id
exactly as it is — and sending the whole `content` back with
`update_landing_page`. Gather several changes into one round when they come
together. After each round, send one line on what changed and the same
preview link (it shows the change straight away).

`update_landing_page` also sets the page's address (`slug`) and its internal
title.

## 4. Publish — only on their yes

`publish_landing_page` puts the page on its public address,
`pages.assistantlabs.io/p/{slug}`, under the business's name. It is 🔴 in
`autonomy-and-approvals`:

- **Only on the owner's yes to this page, in this conversation, after they
  opened the preview.** Not because it "looks done", not on a guess, never a
  page they did not see.
- **Owner away, or running unattended** — do not publish. File a task with
  status "blocked-on-a-human", the preview link and the one-line summary, and
  stop there.
- After publishing, send them the **public address**. A later change goes to
  the draft only; the live page changes when they say publish again.
- `unpublish_landing_page` takes it down (the draft and its leads stay) — also
  their call, not yours.

## 5. Make the leads go somewhere

Straight after the first page, `get_pages_settings`:

- **No agent connected** → offer it, in one line: connected, every lead becomes
  a contact in their CRM, and the WhatsApp buttons open a chat their agent
  answers. On their yes, `connect_landing_pages_agent` with the agent id it
  listed.
- **A follow-up message** (`update_landing_page` →
  `leadActions.followUpTemplate`) sends an approved WhatsApp template to every
  new lead who ticked the form's consent box, automatically. That is 🔴 —
  switching on something that messages people by itself. Show the exact
  template and get their yes first. It goes only to people who ticked consent;
  keep the consent box on the form whenever a follow-up is planned.

## Afterwards

"Who signed up?" → `list_landing_page_leads` (one page with `pageId`, or all).
Name each lead, which page, whether they agreed to messages, and whether they
reached the CRM. A lead marked "not in the CRM" is the cue to connect an agent.

When they want to bring people to the page — a post, an email, an ad — that is
`marketing`. The page's public address is the link.
