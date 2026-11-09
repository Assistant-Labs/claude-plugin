---
description: Make a landing page for an offer — a draft to preview, changed in your words, live only when you say
argument-hint: "[what the page is for]"
---

Read `build-a-landing-page` first if you have not this session.

`$ARGUMENTS` may already say what the page is for. If it says nothing, ask in
one line what the page is for — nothing else yet.

## What you do

1. **Gather before asking.** The business memory, the agent's knowledge and
   their website usually hold the offer, the prices and the tone. Then ask only
   what is still missing — the offer and its real details, who it is for, what
   the visitor should do — in one message, three questions at most. Never
   invent a price, a date or a testimonial; ask.
2. **Write the page and create it.** Read `landing_page_vocabulary`, write the
   page yourself in their language (Hebrew for an Israeli business) from the
   facts you have, and send it as `content` to `create_landing_page`.
3. **Send the preview link** with three lines — the headline, the offer as the
   page states it, what the button does — and ask what to change.
4. **Change it in their words**: `get_landing_page`, change only what they
   asked (keep every other block and its id), send the whole `content` back
   with `update_landing_page`. Send the preview link again each round.
5. **Publish only on their yes** to this page, after they opened the preview:
   `publish_landing_page`, then send the public address. Away or unattended →
   a "blocked-on-a-human" task with the preview link, never a publish.
6. **Wire the leads.** `get_pages_settings`; no agent connected → offer
   `connect_landing_pages_agent` in one line, so every lead lands in the CRM
   and the agent answers them on WhatsApp.

If they already have pages, `list_landing_pages` first — "change my page" means
one of those, not a new one.
