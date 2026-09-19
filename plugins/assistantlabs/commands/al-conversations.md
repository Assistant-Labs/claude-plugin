---
description: Been on WhatsApp for years? I'll read what you already told customers and teach it to your agent
argument-hint: "[anything you want to say first]"
---

Read `teaching-the-business` first if you have not this session.

**This is the best route for a business that has been answering on WhatsApp**,
and it is the one they never think to ask for. They have typed the price two
hundred times. Read it back to them instead of asking again.

## What you do

1. **`get_imported_conversations`.** If it comes back empty, this route is not
   open — say so in one line and offer the others. It is empty when the
   business has not brought their WhatsApp history in, which happens at connect
   time, so this is a "not yet", not a "no".
2. **Read them properly.** Every `Business:` line was typed by a person who
   works there. Find the questions that come up again and again, and the answer
   they give — not the answer you would give.
3. **Show them the list before anything is saved.** One line per entry,
   question and answer, numbered so they can say "drop 4 and 9". This is the
   whole point of doing it in a conversation.
4. **`save_learned_answers`** with the entries that survived, and the
   `conversationsRead` count from step 1 so the app can show where it came from.
   It records the source itself — no `add_agent_source` call on this route.
5. **The receipt** — counts, not adjectives, and the empty modules named. Then
   the integrations offer, as always.
   **Set the agent's language here too** (`patch_agent_language`); it defaults
   to English whatever the conversations were in.

## What to keep, and what to throw away

The judgement is the job. Everything else is mechanical.

- **Keep what is true of the next customer too.** "Delivery is 35 and free over
  400" is knowledge. "Yours is going out Tuesday" is not.
- **Throw away anything with a person in it.** Names, phone numbers,
  addresses, order numbers. These answers get shown to their OTHER customers —
  and the owner will not think to check for this, because to them it is just
  their own chat history.
- **Throw away what has expired.** A holiday closure, a sale that ended, "we're
  short-staffed this week".
- **Merge the ten phrasings into one entry.** Prefer the answer they give
  consistently; where they answered differently over time, prefer the recent one.
- **Never smooth their wording into yours.** The value here is that it sounds
  like them. Keep the language, keep the tone, keep the phrasing they use for
  their own products.

## What to say while doing it

Show them what you found in their own words, and be specific about the count:

> I read 84 of your conversations. You've answered "do you deliver to Haifa"
> eleven times — here's what you say, and eighteen other things that come up:

Then the numbered list. Then: **"Anything here you'd rather it didn't say?"**

**Never present this as the agent having learned already.** Nothing is saved
until step 4, and saying otherwise means an owner approves a list they think is
already live and stops reading.

## Where this sits against the other routes

Not a replacement for the interview — a shortcut past most of it. Run this
first when there are conversations, then ask about what the conversations never
covered: the things customers do not ask but the agent needs to know. Usually
that is opening hours, the rules nobody likes hearing, and what it must never
do without checking.
