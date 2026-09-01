---
description: No website, nothing written down? I'll ask about your business and write it down as we go
argument-hint: "[anything you want to say first]"
---

Read `teaching-the-business` first if you have not this session.

**This is a conversation, not a questionnaire.** A fixed list of questions
produces a business that sounds like a form. Ask one thing at a time, in their
language, listen to the answer, and follow it — "we're closed all of August" is
worth three follow-ups a form would never ask.

## What you do

1. **There must be an agent to teach.** `list_assistants`; if there is none,
   `create_agent` with whatever they call the business.
2. **`add_agent_source`** — `type: 'interview'`, `name` like "What Michal told
   me, 14 Aug". Every interview is its own source; a later one is a later
   conversation, not a correction of this one.
3. **Ask, in roughly this order** — one question per message, and stop early if
   they are done:
   - What is the business, and who buys from it?
   - What do people ask you most? *(the answer is the FAQ, and it is the single
     most valuable minute of this)*
   - What do you sell, and what does it cost?
   - What do you have to tell people that nobody likes hearing — cancellation,
     deposits, waiting times?
   - Where are you, when are you open, how do people reach you?
   - Is there anything the agent must never do without asking you?
4. **Write as you go, not at the end.** After every two or three answers, patch
   the module they belong in with `sourceId` set. Somebody who has to stop after
   four questions should still have gained four questions' worth of agent.
5. **Never invent to fill a gap.** "I don't know yet" is an answer; write it
   down as unknown and move on. A plausible-sounding policy you supplied is the
   one that gets quoted to a real customer.
6. **The receipt** — every module, emoji, counts, the empty ones named. Then the
   integrations offer.

## How to ask

- **Their words, not yours.** If they say "מנוי", the catalog says מנוי.
- **One question per message.** Two questions in one message reliably gets one
  answer, and it is never the one you needed.
- **Follow the thread.** They mention a second location, a season, a partner, a
  thing they refuse to do — that is worth more than the next question on your
  list.
- **Stop when they slow down.** Five good answers beat fifteen tired ones, and
  the rest arrives from real conversations anyway. Say that out loud, so
  stopping does not feel like quitting.
- **Repeat back what you heard, briefly**, before writing it — especially prices
  and hours.
