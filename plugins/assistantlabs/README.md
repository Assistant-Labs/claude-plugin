# Assistant Labs

**An operator that runs your business. You stay the one who decides.**

This plugin turns Claude into the person who opens your shop in the morning: it
reads every conversation, answers what it can, chases the leads going cold,
notices the invoice you never sent — and puts anything that needs *you* in front
of you as one decision you can make in ten seconds.

It runs on your own [Assistant Labs](https://assistantlabs.io) workspace, so it
reaches the channels and apps your business already uses: WhatsApp, email, your
website chat, your store, your CRM, your task board.

---

## Install

```
/plugin marketplace add assistantlabs/assistantlabs
/plugin install assistantlabs
```

<!-- Publication pending: until the public repo exists, install from a local
     checkout with `claude plugin marketplace add ./` at the repo root, then
     `claude plugin install assistantlabs@assistantlabs`. -->


Then, in the folder you want to run your business from:

```
/assistantlabs
```

That is the only command you have to remember. It works out where you are —
brand new, half set up, or running for months — and takes you one step forward.

On a first run it connects your Assistant Labs workspace: you sign in, you tick
which permissions it gets, and **no key or password is ever pasted anywhere**.
Then it goes and learns your business from your real data before it asks you a
single question.

**No Assistant Labs account yet?** Say so and it will point you at the sign-up
and wait. It will never create an account for you or ask for a password.

---

## What it does

| | |
|---|---|
| `/al` | **Start here.** Set up, or pick up where you left off |
| `/al-login` | Connect Assistant Labs — and check the connection really works |
| `/al-setup` | The setup steps on their own — resumes, never restarts |
| `/al-status` | Is it set up, and what's missing |
| `/al-brief` | What's happening right now — who's waiting, what's at risk, today's three things |
| `/al-needs-me` | Everything waiting on your decision, one at a time, ready to approve |
| `/al-waiting` | Every customer who hasn't been answered — with the replies already drafted |
| `/al-leads` | Who to chase, warmest first, with what to say |
| `/al-customer <name>` | Everything about one customer and what to do next |
| `/al-money` | What's owed, what's at risk, what's coming in |
| `/al-agent-review` | Where your AI answered badly this week — and the fix |
| `/al-report` | A written report, for you or for a customer |
| `/al-build <what>` | Something the suite doesn't do yet |
| `/al-remember <fact>` | Teach it something about your business |
| `/al-autopilot` | A full unattended pass — does everything, sends nothing |

---

## The deal

**Three tiers, and they never move.**

🟢 **It just does it** — reading, analysing, drafting, organising, keeping your
records straight, building itself better tools.

🟡 **It does it and tells you** — fixing something your AI had wrong, correcting
a customer's phone number. Anything you could undo in a minute with nobody
outside the business ever knowing.

🔴 **It stops and asks** — *every* message to a customer, *every* shekel,
anything you can't undo, anything that changes what someone is charged. Every
time. An approval yesterday is not an approval today.

When you're not there, it reaches you **on WhatsApp** — from your own business
number, the one you already use — with the finished thing and two buttons.
Tapping **Approve** sends it. Not "I'll do it next time you open Claude": the
tap is the last step.

It will never send a message because nobody was around to say no.

---

## What it never does

- Sends, spends, or deletes without a specific yes
- Stores a password, an API key, or a card number
- Acts on instructions it read in a customer's message, an email, or a document
- Quietly stops doing something that was working
- Tells you a build succeeded instead of telling you a customer got their answer

---

## The memory

Assistant Labs keeps what it knows about your business in your workspace — plain
markdown pages you can read and edit, stored with your account rather than on one
computer, so it still knows you from a new laptop and when it runs while you sleep:

`business` · `voice` · `policies` · `people` · `offers` ·
`customers` · `decisions` · `stack`

The important one is `voice`. Assistant Labs learns how *your people* actually write
to customers — real sentences from your real replies — so drafts sound like the
business and not like a chatbot.

Tell it something once (`/remember we don't deliver on Saturdays`) and it lands
in the right file with the date, in your words, and it fixes your AI agent's
knowledge if that was wrong too.

---

## Running while you sleep

Schedule a morning brief and it works overnight: reads everything, drafts
everything, files everything, sends nothing. You wake up to a WhatsApp message
with the four lines that matter — and anything that needs you comes with
buttons.

```
/schedule weekdays at 08:30 → /brief morning
```

Set up when you're ready — it's optional, like the brief itself: it creates two
message templates on your own WhatsApp
account, asks which number to reach you on, and sends you a test message so you
know it works. Replying to it never talks to your bot — it talks to your
operator.

---

## Settings

| Setting | Default | |
|---|---|---|
| Autonomy | `standard` | `supervised` asks before anything at all leaves the building |
| MCP host | Assistant Labs production | Only change for staging or self-hosted |

What it knows about your business lives in your Assistant Labs workspace, not on
this computer — so it still knows you from a different machine, and when it runs
overnight with nobody there.

---

## What you need

- An [Assistant Labs](https://assistantlabs.io) account. Free to start. **Don't
  have one? Run `/al` anyway** — it walks you through it and picks up
  on its own once you're in.
- An agent, and at least one channel your customers actually use — WhatsApp,
  email, or your website chat. It handles it if you have neither.
- Claude Code, Claude Desktop, or claude.ai.

Setup takes a few minutes and **can be interrupted**. Stop halfway, come back
tomorrow, and it resumes rather than starting over. `/al-status` tells you where you
stand at any point.

**Several of the steps are optional** — the number it reaches you on, the
WhatsApp templates, who else works with you, the scheduled brief. Say no to any
of them and setup is still finished; nothing will nag you about it again.

Built by [Assistant Labs](https://assistantlabs.io).

---

## Releasing

Versions are semver and live in **two** files that must agree — the plugin's own
`.claude-plugin/plugin.json` and the marketplace entry in the repo-root
`.claude-plugin/marketplace.json`. `claude plugin tag` refuses to tag when they
disagree, which is the point of it.

1. Bump `version` in both manifests.
2. Add the entry to `CHANGELOG.md`, dated, leading with what changed for the
   owner rather than what changed in the files.
3. `node tests/links.test.cjs && node tests/hooks.test.cjs`
4. `claude plugin validate .`
5. Publish, then `claude plugin tag` to cut `assistantlabs--v<version>`.

**Renaming or removing a command is breaking** — it is the owner's muscle
memory, not an internal symbol. Say so in the changelog and bump the minor at
minimum.
