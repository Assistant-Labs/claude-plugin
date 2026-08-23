---
name: getting-started
description: >
  Onboarding from wherever they actually are — including no Assistant Labs
  account, no agent, no connected channel, and no conversation history yet. The
  setup state file, what to do at each dead end, and how to give a brand-new
  business a real first result. Read at the start of /setup and /status, and any
  time a connector, an agent, a channel or a customer history turns out to be
  missing.
---

# Getting started

**`/assistantlabs` is the front door** — the one command a business owner has to
remember. It reads the state, works out which of the situations below they are
in, and takes them one step forward. `/setup` runs the steps themselves and
`/status` reports without changing anything; both are for people who want them,
not things anyone must learn.

Most onboarding is written for the customer you already have. This one has to
work for the person who found a plugin in a marketplace on a Tuesday night, has
never heard of Assistant Labs, and has a hairdressing business and a WhatsApp
full of unanswered messages.

**Find out where they actually are before doing anything.** Every question you
ask that the data could have answered is a question that makes them feel like
they are filling in a form.

## The state file

`.assistantlabs/setup.json`, in their project. `/setup` and `/status` write it;
the session-start hook reads it back. It exists because setup is long, gets
interrupted, and **must never restart from the top.**

```json
{
  "assistantId": "assistant_…",
  "assistantName": "Ori's Lighting",
  "updatedAt": "2026-08-18T09:00:00.000Z",
  "steps": {
    "account": true,        "connected": true,
    "agent": true,          "channels": true,
    "memory": true,
    "ownerNumber": true,    "templates": false,
    "roles": "skipped",     "brief": false
  },
  "notes": "Templates submitted 18/8, waiting on Meta. They said the roles thing isn't relevant — one-person business."
}
```

**Write it the moment a step becomes true**, not at the end. A crash between
step 3 and step 8 must not lose steps 1–3.

**Only record a step as done when it is verifiably done.** `templates: true`
means Meta approved them, not that they were submitted. An optimistic file is
worse than no file: the next session skips a step that never happened, and the
failure shows up when the owner is counting on a message arriving.

### Required, optional, and the third state

**Five steps are required** — `account`, `connected`, `agent`, `channels`,
`memory`. Without them the operator cannot run the business at all, and setup is
genuinely unfinished until each is `true`.

**Four are optional** — `ownerNumber`, `templates`, `roles`, `brief`. They are
real value and worth offering, and a business is entirely free to decline them.
**Setup is complete without them.**

Each step has three states:

| Value | Means |
|---|---|
| `true` | done, verifiably |
| `"skipped"` | offered, and they said no |
| absent | never offered |

**`"skipped"` is the one that earns its keep.** Without it an optional step
either gets asked every single session — which is nagging — or gets offered once
and forgotten. It only settles an OPTIONAL step; on a required one it still reads
as outstanding, because declining an account does not produce a working operator.

**Never mark a step `"skipped"` on your own.** It records that a person was asked
and declined. Recording it because the moment did not come up is how a business
silently never gets offered the thing that would have helped most.

**`notes` is for the human**, and for the next session — one line about what is
in flight and why.

## The five places people actually are

### 1. No Assistant Labs account (or nothing authorised yet)

The connectors will not authorise, because there is nothing to authorise
against. **A tool call failing here is the answer, not an error to report** — it
means they have not connected, which is the expected state on a first run.

**Say what this is, in one short paragraph, before sending them anywhere.** They
installed a plugin; they did not sign up for a platform. Something like: *"This
runs on Assistant Labs — it's what connects your WhatsApp and gives you the AI
that answers customers. It's free to start. You'll make an account, I'll do the
rest."*

**They create the account themselves.** Point them at
[assistantlabs.io](https://assistantlabs.io) and wait. Never offer to create an
account, and never take a password — that is theirs, and it stays theirs.

Then pick straight back up: as soon as they say they are in, run the connector
authorisation and carry on. Record `account: true`.

**If they do not want to sign up right now**, say plainly what the plugin can
and cannot do without it (nothing useful — every tool needs their workspace),
put it down, and leave the state file so it resumes cleanly. Do not sell.

### 2. Account, but no agent

`list_assistants` comes back empty.

An agent is the thing that answers their customers, so this is the real first
step, not an administrative one. Creating one is done in the app — walk them to
it, then let them come back. Once one exists, bind to it and record
`agent: true` with its id and name.

**Do not build an agent for them from a blank slate here.** The app's own
onboarding asks better questions than a conversation can, and duplicating it
produces a worse agent and a second place the setup lives.

### 3. Agent, but no channel connected

`list_channels` shows nothing live.

This is the most important gap to name plainly, because **everything downstream
is theatre without it**: no customers can reach the agent, there is nothing to
answer, nobody to notify, and no WhatsApp for approvals.

Say it in one line — *"nobody can message it yet"* — and walk them to connecting
one. WhatsApp first if they use it, because it is what their customers already
have and it is what approvals ride on.

If they are not ready, carry on: the memory and the board still work, and the
operator can prepare everything. **Say once what is limited, and do not repeat
it every session.**

### 3b. Nothing in the agent's head yet

Connected, but the agent knows nothing about the business — no FAQ, no
catalogue, no opening hours. Do **not** start interviewing them for it.

**Scan their website first** (`scan_website`). It reads their own site and
merges what it finds into the agent's knowledge — hours, services, prices,
the answers they already wrote for their customers. One call replaces twenty
questions, and it is better than the interview because it is their own wording.

Then read back what it produced and check it WITH them, one screenful at a
time — "it thinks you close at 17:00 on Fridays, right?". Correcting is
faster than composing, and it catches the thing a scan always gets wrong.

No website? Then interview, and keep it short: what you sell, who buys, the
five questions customers ask most.

### 4. Everything connected, but no history

The hardest one to get right, and the easiest to fake badly. Steps that read
live conversations have nothing to read.

- **Scan the website first** if there is one (§3b) — it is the only source of
  truth about the business that exists before a single customer writes.
- **`voice` cannot be mined**, so ask instead — and ask for *examples*, not
  adjectives: "how would you answer someone asking if you're open Saturday?
  Type it how you'd really send it." One real sentence beats a paragraph of
  description.
- **There is no "three people are waiting" to close on.** Do not invent one, and
  do not pad. Close on something true and forward-looking: what will happen the
  next time a customer messages, and what you will tell them in the morning.
- **Set up the brief anyway.** For a business with no traffic yet, the first
  message that says "someone messaged you and I answered" is the moment the
  product becomes real.
- **Check back.** File a task to review the first real conversations once there
  are some — that is when `voice` gets written properly.

### 5. Several agents

`list_assistants` returns more than one. Ask once which business this project is
about, bind it, and record it. Never guess from the name, and never operate two
in one project — the memory, the board and the owner's number all belong to one
business.

## Giving them a real first result

**Setup must end with something true about their business**, not with "setup
complete". Look for it in this order and use the first one that exists:

1. Someone waiting for a reply, with how long.
2. A promise the AI made that nobody kept.
3. A lead who went quiet.
4. Something the agent has been getting wrong.
5. A real count that means something — how many conversations last week, the
   busiest day.
6. Nothing yet: say what happens next time a customer writes, and that you will
   tell them in the morning.

Then file it as a task, so the first thing they see on the board is their own
business rather than a tutorial.

## Do not

- **Do not run the whole thing as a questionnaire.** Six questions in a row is a
  form. Ask two, do some work, ask two more.
- **Do not block on Meta.** Template review takes minutes to hours. Say so, move
  on, record it in `notes`, and finish the rest.
- **Do not repeat what a previous session already established.** That is what
  the state file is for, and re-asking is the single most annoying thing this
  design exists to prevent.
- **Do not claim setup is complete while a step is outstanding.** Say what is
  done, what is not, and what it costs them until it is.
