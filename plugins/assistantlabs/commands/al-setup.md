---
description: Set up — or pick up where setup left off
---

Read `getting-started` first, then `connect-your-business` and
`business-memory`.

**This is resumable, and that is the point.** Read
`.assistantlabs/setup.json` before anything else and do **only what is
outstanding**. Walking someone back through a step they already did is the
fastest way to make a good product feel careless.

Run it as a conversation, not a form. Ask two things, do some work, ask two
more. Every question the data could answer is a question you must not ask.

**Write each step to the state file the moment it becomes true** — not at the
end. And only when it is verifiably true: `templates` means Meta approved them,
not that they were submitted.

**Five steps are REQUIRED — `account`, `connected`, `agent`, `channels`,
`memory`. Four are OPTIONAL — `ownerNumber`, `templates`, `roles`, `brief`.**
Each is labelled below. Setup is complete once the five are done; an optional one
is either done or declined, and declining changes nothing about that.
See `getting-started` § "Required, optional, and the third state".

- An optional step they decline is recorded as `"skipped"` — that is what stops
  it being asked again every session.
- **Only record `"skipped"` if you actually asked and they actually declined.**
  Marking one because you ran out of conversation is how a business never gets
  offered the thing that would have helped it most.
- Never present an optional step as a requirement, and never end with "setup is
  incomplete" because one was declined. It is not.

---

**1 · account** (required) — Can the connectors authorise at all? Try `list_assistants`.
If there is no Assistant Labs account yet, follow `getting-started` §1: explain
in one short paragraph what this is, send them to sign up themselves, wait.
Never create an account or take a password.

**2 · connected** (required) — Run `/al-login`. It probes each connector, names
only the ones actually missing, and gives the connect path for the surface they
are on — Settings → Connectors on claude.ai/desktop/Cowork, `/mcp` in a
terminal. Never assert a connector is missing without calling it first, and
never ask for an API key.

**3 · agent** (required) — Bind the agent. One → bind it silently. Several → ask once which
business this project is about. None → `getting-started` §2. Record the id and
the name.

**4 · channels** (required) — `list_channels`. If nothing is live, say plainly that nobody
can message the agent yet and walk them to connecting one — WhatsApp first if
they use it, because their customers already have it and approvals ride on it.
Do not block: carry on and say once what is limited.

**5 · Fill the agent's head before interviewing them.** If the agent's
knowledge is thin, offer the doors — `/al-conversations` first if their WhatsApp
history is in, because the answers are already written and in their words;
`/al-website` if they have a site; `/al-document` if they have a price list or a
PDF they already send people; `/al-interview` if none of those. Check the result
with them rather than asking from scratch — see `teaching-the-business`.
Correcting beats composing, and one reading replaces twenty questions.

**6 · Look around before asking anything.** How many conversations, how many
contacts, what the agent already knows, whether anyone is waiting, what it has
been getting wrong. This is where the first real result comes from.

**7 · memory** (required) — Ask only what the data cannot tell you, a couple at a time:
what the business does and who buys; what a normal week looks like and what goes
wrong most; what they want off their plate first; the standing rules they already
have; how much they want it doing alone. (Who else works here is 7b, and asking
it twice is exactly the form-filling this command exists to avoid.)

Mine `voice` from the business's own **human** replies — real sentences, not
adjectives. No history yet? `getting-started` §4: ask for one real example
instead.

Run `start_business_memory` once to create the empty pages, then
`write_business_memory` for each thing you learned. Leave gaps as gaps — an empty
page is honest, an invented one is not.

**7b · roles** (optional) — Who else works here, and who handles what.

Most useful in a business with more than two or three people, and worth
skipping outright in a one-person shop. Ask it as one question, once, when it
comes up naturally — a customer asks about an invoice, or the owner mentions
somebody by name:

> "Who else should I know about? Someone who handles the money, someone who
> deals with staff, whoever signs off on things — just names and what they
> handle is enough."

Take whatever they give and stop. **Do not walk a list of departments at them.**
A business with a bookkeeper who comes in on Thursdays does not have an HR
function, and asking makes the product feel like software written for someone
else.

What to write to the `people` memory page — the shape is in `business-memory`:

- **Their name and what they actually handle**, in the owner's words ("Dana does
  the invoices and chases payment"), not a job title we picked.
- **How to reach them**, if the owner offers it. Never ask for a personal number
  they did not volunteer.
- **What they decide**, if anything — this is the part that changes behaviour
  later.

**Knowing a role is NOT permission to contact them.** A name on the `people`
page changes who work is *routed* to and who gets *named* in a draft; it does not
make anyone an approver, and it does not authorise messaging them. Approvals
reach only the numbers configured in step 9 — see `reaching-the-owner`.

Record `roles: true` if they told you anything, `roles: "skipped"` if they would
rather not, and leave it absent if the moment never came.

**8 · board** — Make sure the task board answers, and file the real things you
found in step 6. Their first board should be their own business, not a tutorial.

**9 · templates + ownerNumber** (optional, and the one most worth having) —
Follow `reaching-the-owner`: create the two
templates on their own WhatsApp account, ask which number should get updates and
approvals, save it alongside the existing notification rules, then **send one
real test message and ask whether it arrived.**

This is what turns a tool they open into an operator that runs. Meta review
takes minutes to hours — say so, put it in `notes`, carry on, and record
`templates: true` only once it is approved.

**10 · brief** (optional) — Offer the scheduled morning brief. It is what makes
step 9 pay off. If they would rather not have a scheduled message, record
`brief: "skipped"` and move on — it changes nothing else.

---

Finish with the four-line report and **one true thing about their business**
(`getting-started` §"a real first result"). Not "setup complete" — "three people
are waiting for a reply, the oldest since Sunday."

If a REQUIRED step is still outstanding, say what, what it costs them until it is
done, and that `/al-setup` picks up from there. Never report setup as complete while
one is open.

An outstanding OPTIONAL step is not a caveat and does not belong in the report.
Mention it once, later, when the moment makes it obviously useful — "you'd have
heard about this on your phone if we set that up" beats a checklist item every
time.
