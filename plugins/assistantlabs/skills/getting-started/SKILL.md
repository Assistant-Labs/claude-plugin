---
name: getting-started
description: >
  Onboarding from wherever they actually are — no AssistantLabs account, no
  agent, no connected channel, no conversation history yet. What to do at each
  dead end, and how to give a brand-new business a real first result. Read from
  /al, and any time a connection, an agent, a channel or a customer history
  turns out to be missing.
---

# Getting started

**`/al` is the only start command.** It checks where they are with
`get_workspace_setup`, shows the card, and takes them one step forward. This
skill is what each of those steps needs to get right.

Most onboarding is written for the customer you already have. This one has to
work for the person who found a plugin in a marketplace on a Tuesday night, has
never heard of Assistant Labs, and has a hairdressing business and a WhatsApp
full of unanswered messages.

**Find out where they actually are before doing anything.** Every question you
ask that the data could have answered is a question that makes them feel like
they are filling in a form.

## Where setup lives

**In the workspace, not on this machine.** Setup is the app's own four steps —
connect your AI, tell us about the business, pick your channels, pick your
tools — and `get_workspace_setup` returns them, with what is still open and a
link to each. Finish a step here and it is ticked in the app; finish it in the
app and the next `/al` already knows. That is what lets setup stop and resume
on any device, and never restart from the top.

**After they connect, the order is fixed** (`/al` has the words): learn the
business from every source at once → pick the channels → pick the tools →
connect each pick, one at a time, in the connect window → set up every module
from what is now connected, wired to the agent and to each other → test it,
and close. Nothing gets connected while they are still picking.

**Back from the connect window, read it, never ask.** `get_workspace_setup`'s
`picked` says where every pick stands (connected, open, skipped, stuck with
their note) and `toolRequests` what they asked us to support. `/al` has how to
say it, and the fix for each stuck screen.

**Only call a step done when the call that does it came back.** An optimistic
answer is worse than none: the next session skips a step that never happened.

## The five places people actually are

### 1. Not connected yet

`get_workspace_setup` fails or is not there. **That is the answer, not an error
to report** — it is the expected state on a first run. `/al` shows the welcome
and the connect step.

**They create the account themselves**, on the sign-in screen the connector
opens ("sign up free"). Never offer to create an account, and never take a
password — that is theirs, and it stays theirs.

**If they do not want to connect right now**, say in one line what is waiting
for them and put it down. Do not sell.

### 2. Account, but no agent

`list_assistants` comes back empty.

An agent is the thing that answers their customers, so this is the real first
step, not an administrative one.

**Make it here** — `create_agent` mints the same record the app's
onboarding does, and a hosted plugin cannot open a browser on their machine to
reach that onboarding anyway. Bind to it.

**Ask where it can learn, not for answers.** Create the agent, then offer the
doors — `/al-website`, `/al-document`, `/al-interview`, and `/al-conversations`
once their WhatsApp history is in — and check what it found WITH them a
screenful at a time. Correcting a wrong opening hour beats
composing twenty answers from nothing, and the wording that comes back is
theirs. No website is not the lesser door; most small businesses have nothing
written down. See `teaching-the-business`.

**It costs them a seat on their plan — which is not something to announce.**
Said while creating one, it reads as a meter starting. At the limit the call
fails with a quota error; that is when you say so plainly, rather than retrying.

**An agent with the default persona is not finished.** `toneAndStyle` empty and
`assistantGender: 'plural'` is what a brand-new agent ships with. It fails
silently: everything looks configured, the agent replies, and it sounds like
nobody. A first guess comes from how their site talks; the owner's own line refines
it — **after** they have tried the agent, never before, and before real
customers reach it. Check it in the
config, not in your memory of having asked.

**Finish the agent before mentioning a channel.** `business` AND `faq`, plus
`catalog` / `links` / `guidelines` wherever the site gave you something, and then
`set_agent_persona` — an agent with no tone, no greeting and the default plural
gender is not set up. Stopping after `business` leaves something that looks
configured and answers nothing, and connecting a channel to it puts real
customers in front of an agent that cannot help them.

**Walking them into the app is the fallback, not the default.** Take it only
when `create_agent` is genuinely absent — an older connection, or `agent:create`
not granted on the consent screen. Offer to reconnect and tick Agents first.

### 3. Agent, but no channel connected

`list_channels` shows nothing live.

This is the most important gap to name plainly, because **everything downstream
is theatre without it**: no customers can reach the agent, there is nothing to
answer, nobody to notify, and no WhatsApp for approvals.

Say it in one line — *"nobody can message it yet"* — then ask which ones they
want and **hand over a link per channel, straight to that channel's own page**
(`…/settings/channels/whatsapp` — every one is in `opening-the-app`). WhatsApp
first if they use it, because it is what their customers already have and it is
what approvals ride on.

**A link, never navigation instructions.** "Go to Settings → Channels → click
WhatsApp" is a chore; a link that lands on the channel's page is a door.

If they are not ready, carry on: the memory and the board still work, and the
operator can prepare everything. **Say once what is limited, and do not repeat
it every session.**

### 3b. Nothing in the agent's head yet

Connected, but the agent knows nothing about the business — no FAQ, no
catalogue, no opening hours. Do **not** start interviewing them for it.

**Read their website yourself** with `read_website`. The server finds the pages,
renders a JavaScript site and strips the furniture; you work out the hours, the
services, the prices and the questions the site is plainly written to answer,
then write it in with `patch_agent_module` (`business`, `faq`, and `links` /
`catalog` where there is something real). Their own wording beats anything an
interview produces.

**Show it to them BEFORE you write it**, one screenful at a time — "it thinks
you close at 17:00 on Fridays, right?". Correcting is faster than composing, and
it catches the thing a reading always gets wrong.

**Read the site yourself** — `read_website` returns the text and leaves the
understanding to you, which is what lets you show the owner what their agent
learned while they can still correct it. A server-side crawl reports nothing
back here, so you would be promising a look at something you never saw.

**Record the source before you write** (`add_agent_source`) and stamp its
`sourceId` on every module. Knowledge with no source cannot be traced or
removed as a set.

No website? If they have been answering on WhatsApp, `/al-conversations` first —
the five questions customers ask most are already answered there, in their
words. Otherwise `/al-interview`, and keep it short: what you sell, who buys,
the five questions customers ask most.

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
about, and bind it. Never guess from the name, and never operate two
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
  on, and finish the rest.
- **Do not repeat what a previous session already established.** The workspace
  already knows, and re-asking is the single most annoying thing this design
  exists to prevent.
- **Do not claim setup is complete while a step is outstanding.** Say what is
  done, what is not, and what it costs them until it is.
