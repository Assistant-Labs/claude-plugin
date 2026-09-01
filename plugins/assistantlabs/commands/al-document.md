---
description: Teach your agent from a document — a price list, menu, or the PDF you send new customers
argument-hint: "[what the document is]"
---

Read `teaching-the-business` first if you have not this session.

**The file comes into this conversation, not through an upload screen.** Ask
them to drop it in here — PDF, Word, a spreadsheet, a photo of a printed price
list, several at once. You read it directly; there is no format to get right and
nothing to convert first.

## What you do

1. **There must be an agent to teach.** `list_assistants`; if there is none,
   `create_agent` first.
2. **Read the file.** All of it. A price list has a footnote, a menu has a
   section on the second page, a terms document has the cancellation window
   buried in clause 9 — those are exactly the parts customers ask about.
3. **`add_agent_source`** — `type: 'file'`, `name` = what the owner calls the
   document ("Price list, Aug 2026"), not the filename. Every document is its
   own source, so replacing one later does not disturb the others.
4. **Show them what you understood, before writing a word.** Prices and dates
   read back exactly — a wrong price is the one mistake a customer acts on. Say
   which parts you are **not** taking: an internal note, a supplier's terms, a
   staff-only rate.
5. **Ask about staleness, once.** A document has a date on it and the world
   moves: *"This is dated March — are these still the prices?"* One question,
   and it prevents the agent quoting last year's rates all year.
6. **Take their corrections, then write.** `patch_agent_module` per module, each
   carrying `sourceId`.
7. **The receipt** — every module, emoji, counts, the empty ones named. Then the
   integrations offer.
   **Set the agent's language here too** (`patch_agent_language`) — it defaults
   to English, whatever the source was written in.

## Careful with

- **A photo or a scan.** Read what is legible and say what is not, rather than
  guessing a number from a blurry line.
- **Anything that is not theirs to publish.** A supplier price sheet, a
  contract, a customer list — that belongs in the agent only if the owner says
  so, and a customer list does not belong there at all.
- **Documents that contradict the website.** Show both and let them say which is
  current; then fix the one that is wrong at its source, not only in the agent.
