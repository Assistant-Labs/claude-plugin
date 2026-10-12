# AssistantLabs — Personal Assistant for Business

**A personal assistant for your business, inside Claude.** It answers your
customers on WhatsApp, Instagram, Messenger, email and website chat, and keeps
the rest of the business moving: your helpdesk, CRM, leads, appointment
bookings, tasks, social media posts, email campaigns and Meta ads.

**You stay in charge.** Anything that reaches a customer, goes public or spends
money waits for your approval, which you can give with one tap on WhatsApp.

Use it for WhatsApp Business automation, customer support, lead follow-up,
booking appointments, and recovering abandoned carts, all from one place.

**Ask Claude things like**

- "Who is waiting for a reply?"
- "Which leads went cold this week?"
- "Fill Thursday's empty appointment slots."
- "Write this week's posts and an email campaign for the new collection."
- "What are customers asking about most?"

**Built for** small businesses, online stores (Shopify) and agencies.

It runs on your own [AssistantLabs](https://assistantlabs.io) workspace, so it
reaches the channels and apps your business already uses: WhatsApp, email, your
website chat, your store, your CRM, your task board.

---

## Install

Add **AssistantLabs** from the Claude plugin directory (claude.ai, Cowork or
Claude Code), or from the command line:

```
claude plugin marketplace add Assistant-Labs/claude-plugin
claude plugin install assistantlabs@assistantlabs
```

Then, in the folder you want to run your business from:

```
/al
```

That is the only command you have to remember. It works out where you are —
brand new, half set up, or running for months — and takes you one step forward.

On a first run it asks about your business and your website, reads the site
while you connect your AssistantLabs workspace, and has your assistant built and
ready to try by the time you're back. You sign in and tick the products you
want, and **no key or password is ever pasted anywhere**.

The plugin carries two connections: your workspace, and a small login-free one
that can read a website, hold the assistant it builds until you sign in, and
reach our support. The login-free one never sees your workspace.

**No AssistantLabs account yet?** Say so and it will point you at the sign-up
and wait. It will never create an account for you or ask for a password.

---

## What it does

| | |
|---|---|
| `/al` | **Start here.** Set up, or pick up where you left off |
| `/al-login` | Connect AssistantLabs — and check the connection really works |
| `/al-setup` | The setup steps on their own — resumes, never restarts |
| `/al-status` | Is it set up, and what's missing |
| `/al-brief` | What's happening right now — who's waiting, what's at risk, today's three things |
| `/al-needs-me` | Everything waiting on your decision, one at a time, ready to approve |
| `/al-waiting` | Every customer who hasn't been answered — with the replies already drafted |
| `/al-leads` | Who to chase, warmest first, with what to say |
| `/al-customer <name>` | Everything about one customer and what to do next |
| `/al-money` | What's owed, what's at risk, what's coming in |
| `/al-agent-review` | Where your assistant answered badly this week — and the fix |
| `/al-agent-self-training` | Every night, your assistant learns from its own conversations — you approve each fix |
| `/al-conversations` | Teach the assistant from the WhatsApp answers you have already typed |
| `/al-daily` | Today's queue: who is waiting on you, and what is broken |
| `/al-weekly` | The weekly review — what moved, what's at risk, what needs you |
| `/al-report` | A written report, for you or for a customer |
| `/al-build <what>` | Something the suite doesn't do yet |
| `/al-integration <system>` | Connect your assistant to a system you already run |
| `/al-remember <fact>` | Teach it something about your business |
| `/al-autopilot` | A full unattended pass — does everything, sends nothing |
| `/al-help` | Talk to AssistantLabs support — questions, a meeting with the team, or a person |

---

## The deal

**Three tiers, and they never move.**

🟢 **It just does it** — reading, analysing, drafting, organising, keeping your
records straight, building itself better tools.

🟡 **It does it and tells you** — fixing something your AI had wrong, correcting
a customer's phone number. Anything you could undo in a minute with nobody
outside the business ever knowing.

🔴 **It stops and asks** — *every* message to a customer, *every* public post
and email campaign, *every* shekel, anything you can't undo, anything that
changes what someone is charged. Every time. An approval yesterday is not an
approval today.

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

AssistantLabs keeps what it knows about your business in your workspace — plain
markdown pages you can read and edit, stored with your account rather than on one
computer, so it still knows you from a new laptop and when it runs while you sleep:

`business` · `voice` · `policies` · `people` · `offers` ·
`customers` · `decisions` · `stack`

The important one is `voice`. AssistantLabs learns how *your people* actually write
to customers — real sentences from your real replies — so drafts sound like the
business and not like a chatbot.

Tell it something once (`/al-remember we don't deliver on Saturdays`) and it lands
in the right file with the date, in your words, and it fixes your assistant's
knowledge if that was wrong too.

---

## Running while you sleep

Schedule a morning brief and it works overnight: reads everything, drafts
everything, files everything, sends nothing. You wake up to a WhatsApp message
with the four lines that matter — and anything that needs you comes with
buttons.

```
/schedule weekdays at 08:30 → /al-brief morning
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
| MCP host | AssistantLabs production | Only change for staging or self-hosted |

What it knows about your business lives in your AssistantLabs workspace, not on
this computer — so it still knows you from a different machine, and when it runs
overnight with nobody there.

---

## What you need

- An [AssistantLabs](https://assistantlabs.io) account. Free to start. **Don't
  have one? Run `/al` anyway** — it walks you through it and picks up
  on its own once you're in.
- An assistant, and at least one channel your customers actually use — WhatsApp,
  email, or your website chat. It handles it if you have neither.
- Claude Code, Claude Desktop, or claude.ai.

Setup takes a few minutes and **can be interrupted**. Stop halfway, come back
tomorrow, and it resumes rather than starting over. `/al-status` tells you where you
stand at any point.

**Several of the steps are optional** — the number it reaches you on, the
WhatsApp templates, who else works with you, the scheduled brief. Say no to any
of them and setup is still finished; nothing will nag you about it again.

Built by [AssistantLabs](https://assistantlabs.io).

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
