---
description: Teach your agent from your website — it reads it and shows you what it found
argument-hint: "[your website address]"
---

Read `teaching-the-business` first if you have not this session.

`$ARGUMENTS` may already be the address. If not, ask for it in one line and
nothing else — no form, no second question.

## What you do

**Read first. It needs no agent, so nothing is created on a guess.**

1. **`read_website`.** It returns the readable text of the entry page plus the
   highest-signal internal pages — about, contact, prices, timetable. The server
   fetches and strips; **you** work out what they sell, when they are open, what
   things cost, and the questions the site is plainly written to answer.
   `notRead` lists what it skipped — call again with a specific URL when
   something important is missing.
   - **`contacts` is a separate array, and it is where the phone, the email, the
     WhatsApp number and the address are.** Those live in links, and link text
     is skipped as navigation, so they never appear in `text`. A read that
     reports "no phone number" without looking there is wrong.
2. **`list_assistants`; if there is none, `create_agent` — now, with the name
   the site uses for the business.** Its own name, in its own language, not the
   domain and not a transliteration. This is the whole reason reading comes
   first: an agent named "Michal Yoga" when the site says הסטודיו של מיכל is a
   correction the owner has to make in their first two minutes.
3. **`add_agent_source`** — `type: 'url'`, `name` = the site's name, `url` = the
   address. Keep the id. Reading the same site again reuses the same row, so a
   re-read replaces rather than stacks.
4. **Show them what you understood, before writing a word.** Grouped the way the
   modules are grouped, in their language, plus:
   - **anything the site contradicts itself on** — two phone numbers, two
     cancellation windows — asked as a real choice, never resolved by you;
   - **the two or three questions customers will certainly ask that the site
     does not answer.** Those are worth more than anything you extracted.
5. **Take their corrections, then write.** `patch_agent_module` per module, each
   carrying `sourceId`, content under the key that module uses. The contacts go
   into `business` → `options.contactInformation`.
6. **The receipt** — every module, with its emoji and a count, their correction
   quoted on the line it changed, and the empty ones named. Then the
   integrations offer.
   **Set the agent's language here too** (`patch_agent_language`) — it defaults
   to English, whatever the source was written in.

## What you do not do

- **Do not write what the site does not say.** A plausible cancellation policy
  is still one you made up, and it will be quoted to a customer as theirs.
- **Do not stop at `business`.** An agent with only a business section looks
  configured and answers nothing.
- **Do not hand the job to a server-side crawl.** Reading it yourself is the
  point: the owner watches their agent learn and fixes it in the same breath. A
  background job gives them a progress bar and a stranger's summary.

**Judge the read before you trust it.** `pagesRead: 1` with `linksFound: 0` on a
site that plainly has a menu means the read failed, not that the business has
one page. Say so rather than reporting a thin business — and try a named inner
page from the site's own navigation.

If the site really is a one-page holding page, say that plainly too — there is
little to read, and `/al-interview` will get further in five minutes.
