---
description: Teach your agent from your website — it reads it and shows you what it found
argument-hint: "[your website address]"
---

Read `teaching-the-business` first if you have not this session.

`$ARGUMENTS` may already be the address. If not, ask for it in one line and
nothing else — no form, no second question.

## What you do

1. **There must be an agent to teach.** `list_assistants`; if there is none,
   `create_agent` with the business's name (the domain is a fine first guess —
   you will correct it in a moment). `read_website` is assistant-scoped, so this
   has to come first.
2. **`add_agent_source`** — `type: 'url'`, `name` = the site's name, `url` = the
   address. Keep the id. Reading the same site again reuses the same row, so a
   re-read replaces rather than stacks.
3. **`read_website`.** It returns the readable text of the entry page plus the
   highest-signal internal pages. The server fetches and strips; **you** work
   out what they sell, when they are open, what things cost, and the questions
   the site is plainly written to answer. `notRead` lists what it skipped — call
   again with a specific URL when something important is missing.
4. **Show them what you understood, before writing a word.** Grouped the way the
   modules are grouped, in their language, plus:
   - **anything the site contradicts itself on** — two phone numbers, two
     cancellation windows — asked as a real choice, never resolved by you;
   - **the two or three questions customers will certainly ask that the site
     does not answer.** Those are worth more than anything you extracted.
5. **Take their corrections, then write.** `patch_agent_module` per module, each
   carrying `sourceId`, content under the key that module uses.
6. **The receipt** — every module, with its emoji and a count, their correction
   quoted on the line it changed, and the empty ones named. Then the
   integrations offer.

## What you do not do

- **Do not write what the site does not say.** A plausible cancellation policy
  is still one you made up, and it will be quoted to a customer as theirs.
- **Do not stop at `business`.** An agent with only a business section looks
  configured and answers nothing.
- **Do not hand the job to a server-side crawl.** Reading it yourself is the
  point: the owner watches their agent learn and fixes it in the same breath. A
  background job gives them a progress bar and a stranger's summary.

If the site is a one-page holding page, say so plainly — there is little to
read, and `/al-interview` will get further in five minutes.
