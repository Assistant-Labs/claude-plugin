# Changelog

## 0.14.1 — 2026-10-01

- **WhatsApp journeys are built from templates.** A journey can't tell who wrote
  to the business in the last day, and WhatsApp quietly drops anything else
  after that — so every WhatsApp step is now an approved template. When none of
  yours says the right thing, it offers to write one with you and sends it to
  Meta for approval.
- **Audiences from your Shopify segments and labels** are added in the Sales
  app, where you see how many people are in them first.

## 0.14.0 — 2026-09-30

**Your marketing, run from Claude: posts, email, Instagram automations and ads.**

- **Email campaigns.** Ask for a newsletter or a sale announcement and it builds
  the whole thing — who it goes to, with the exact number of people, the emails,
  and the waits between them. You get a test in your own inbox, and it goes out
  on your yes. Afterwards it tells you who opened, who clicked and who
  unsubscribed.
- **Email templates.** It designs emails in Studio from ready-made starters —
  a sale, a launch, a newsletter, a welcome — and files them by category and tag
  so a campaign can start from one.
- **One brand, everywhere.** Every email takes its logo and colours from your
  brand kit. Change them once and every template follows; it can update the kit
  for you, and asks first.
- **Instagram automations.** "Comment GUIDE and I'll send you the link": it
  reads what people really write under your posts, builds the rule, tries it
  without sending anything, and switches it on only when you say so.
- **Meta ads.** It drafts the ad, puts it on your ad account paused, and asks
  before switching it on — naming the daily budget and who will see it. Pausing
  never needs a yes.
- **Your plan.** It can keep the marketing strategy, the research and the
  product profile up to date, and proposes changes to goals and budget rather
  than making them.
- **Three new permissions**, all off unless you tick them when you sign in:
  *Send marketing email*, *Run Instagram automations* and *Spend on ads*.
  Without them it still prepares everything and you press the button in the
  app. Already connected? Reconnect to add them.

**The approval gate reaches further.**

- It now stops and asks before a public post, an email campaign, a test email,
  an ad being created on your account or switched on, and any automation or
  follow-up sequence being switched on.
- It now runs however the plugin was installed. Before, the check and the
  record of what went out (`.assistantlabs/outbound.jsonl`) were attached only
  to a connection added by hand; on a normal install Claude stopped because its
  instructions said to, with no second check behind it.
- The background helpers that read and analyse for it — the lead board, the
  customer sweep, the agent review — are fenced the same way: they cannot send,
  publish, email or spend.
- Links into Marketing open the page itself. Posts, automations, ads and the
  social accounts moved, and the old addresses were only redirecting.

## 0.13.0 — 2026-09-29

**A first run that feels like one: your agent is ready before you've finished signing in.**

- `/al` now goes one step at a time. A welcome that says what AssistantLabs does
  for your business, then one question: your business, what you sell, your
  website.
- While you sign in, it reads your website and builds your agent from it. When
  you come back, the agent is already there, with a link you can open and chat
  with, before any customer sees it.
- It works out whether your site runs on Shopify, WooCommerce, Wix or WordPress,
  and plans your setup around it. If you have a store, connecting it comes first.
- Every product you switched on gets its own steps, quickest wins first, and
  each step says which product it sets up. A free integration meeting with our
  team is offered alongside the plan, for anyone who'd rather do it together.
- The sign-in screen now shows each product and what it does for you. Your task
  board is always included, because approvals depend on it.
- Links into the app now open the exact page: each channel, each integration,
  every product. Signing in on the way no longer loses where the link was going.

**Talk to AssistantLabs support without leaving Claude.**

- `/al-help` opens a conversation with our support, right in Claude. It is the
  same support that answers our WhatsApp line: ask anything about the product,
  your setup or your bill, book a meeting with the team, or ask for a person.
- A person on our team can pick the conversation up. When they answer, run
  `/al-help` again and their reply is waiting.
- It works before you've signed in, and even when your connection is the thing
  that broke. After you sign in, the same conversation carries on. And if Claude
  can't reach us at all, `/al-help` gives you every other way in: WhatsApp, the
  support page, email and a meeting link.
- Only what you write goes to support. Your customers' conversations and
  details stay in your workspace unless you ask to send something specific.

## 0.12.0 — 2026-09-27

**Your agent trains itself every night. You approve.**

- `/al-agent-self-training` sets up a nightly routine on your own Claude plan.
  Every night at 02:00 it reads the day's conversations, finds where the agent
  got it wrong — a wrong price, a question it could not answer, a callback it
  promised — and writes the exact fix.
- Each fix waits in the agent's Training tab until you approve it. Approve
  there, or open that night's run in Claude and say which ones.
- It runs in the cloud, so your computer can be off. It needs the AssistantLabs
  connector on your claude.ai account.
- Suggestions you no longer want can be deleted from Claude, not only rejected.

## 0.11.0 — 2026-09-09

**Your agent can learn from what you already told customers.**

- `/al-conversations` reads the WhatsApp conversations you have already had —
  the questions people keep asking and the answers you keep typing — and turns
  them into answers your agent gives. You see every one before anything is
  saved, and drop whatever is wrong or out of date.
- For a business that has been running on WhatsApp for years this replaces most
  of the interview. You have typed the delivery charge two hundred times; there
  is no reason to be asked for it again.
- Nothing with a person in it is kept — no names, phone numbers, addresses or
  order numbers. These answers get shown to your other customers.
- Needs your WhatsApp history to have been brought in, which happens when you
  connect the channel.

**The day and the week, written for you.**

- `/al-daily` is today's queue: who is waiting on you, what is broken, what you
  can clear in ten minutes. `/al-weekly` is the review — what moved, what is at
  risk, and the decisions waiting on you.

**One connection, every product.**

- The plugin declares a single connector again. A second Sales connection had
  crept back in, which meant signing in twice for tools the one connection
  already carries.

## 0.10.6 — 2026-09-04

**Review and approve the agent's training, not just suggest it.**

- Before, a training suggestion could only be filed for later — you had to open
  the app to see the queue and decide. Now the whole loop is here: list the
  proposals waiting on a decision, read the exact change each one would make,
  tune it, then approve it (the agent starts answering the new way) or reject
  it. Approving changes how the agent talks to real customers, so it approves
  only what you would want live.

## 0.10.5 — 2026-09-02

**A connector address you can read.**

- The connector is now `https://mcp.assistantlabs.io/mcp`, in place of the long
  Google-hosted one. Same service, same permissions. If you already connected
  with the old address it keeps working, and reconnecting with this one takes
  the usual few seconds.

## 0.10.4 — 2026-09-01

**It speaks your language, and it reads the page your rules are on.**

- An agent built from a Hebrew website used to answer Hebrew customers in
  English — correctly, about the right business, in the wrong language. Setting
  the language is now part of building it.
- Your terms page — cancellation, deposits, refunds — was being skipped by the
  website reader and could not even be reported as skipped, so it looked like
  your site had no rules. It is now read ahead of your product pages.
- Teaching it from your website no longer hides your own business details behind
  a "mirrored from another agent" card, or leaves a second copy of them in your
  agent when you fix the empty form it used to show you.
- Opening hours and your Facebook and Instagram links were being written into
  fields nothing reads. They now go where the app shows them.

## 0.10.3 — 2026-09-01

**Small corrections, from watching a real first run.**

- The screen after you sign in now opens by naming your workspace and what you
  turned on, and shows which kind of source each route creates.
- Writing knowledge into the wrong field is refused with the right field named,
  for every part of your agent — not just the one that broke last time. A
  question without an answer, or a link without an address, no longer counts as
  saved.
- Teaching it from the same website twice stopped renaming that source after
  whichever page it happened to read.

## 0.10.2 — 2026-09-01

**Rules it wrote for you are no longer blank.**

- The studio rules it took off your website — cancellations, health forms, what
  never to promise — were saved in a shape the app cannot read, so the Guidelines
  screen showed a dozen empty rows and your agent followed none of them. It was
  also possible to end up with two copies of every rule, all of them empty.
- Fixed at both ends: writing a rule in the wrong shape is now refused with the
  right shape named, and rules already stored wrongly repair themselves the next
  time anything is saved — the text was never lost.
- The same trap sat under links, where the label could vanish the same way.
- The screen after you sign in now opens with your workspace name and what you
  turned on, instead of repeating the welcome you already read.

## 0.10.1 — 2026-09-01

**Reading your website actually reads it now.**

- Every page came back as `[object Object]` — the reader had the text and threw
  it away on the way out. Fixed: a real site now returns thousands of words of
  its own copy.
- It only ever read your home page. Link discovery rejected every link on your
  own site as "external", so prices, timetable and contact pages were never
  opened. A yoga studio that returned 1 page now returns 8, including its price
  list.
- **Your phone, email, WhatsApp and address are picked up properly.** They live
  in links, which the reader skips as navigation — so it used to report a
  business with no way to contact it. They now come back separately, and two
  different phone numbers get shown to you as a contradiction rather than
  silently picked.
- Menus no longer swamp the page. Your navigation was being read as content, on
  every page, four times over.
- The agent is now created **after** the site is read, so it gets the name the
  business actually uses instead of a guess from the domain.
- It stopped telling you a seat on your plan was used the moment it made one.

## 0.10.0 — 2026-09-01

**Three ways to teach it your business, and a receipt for what it wrote.**

- A website was the only real door. Now there are three, and no ranking between
  them: `/al-website` reads your site, `/al-document` reads the price list or
  PDF you already send people — drop it straight into the chat — and
  `/al-interview` just asks you, one question at a time, when there's nothing
  written down anywhere. Most small businesses are in that last case.
- Each one is recorded as a **source** on your agent, the same list you see in
  the app under Settings → Sources. So you can tell where any fact came from,
  replace one source when your prices change, or delete it and take everything
  it taught with it. Until now, knowledge taught through Claude belonged to
  nothing — and asking "where did it learn from?" answered "nothing" for every
  agent that had sources.
- When the writing is done you get a **receipt**: every section, with a count.
  "11 answers", "4 items with prices", your correction quoted back on the line
  it changed — and the sections that are still empty, named, with the reason.
  Half of them stay empty after any source, because they come from real
  conversations.
- Then it offers the two or three integrations that actually fit you — your
  calendar, your shop, your spreadsheet — and says out loud which ones it
  skipped and why.
- It no longer opens by telling you what you haven't got.

## 0.9.3 — 2026-09-01

**It asks you one clear thing, instead of a question about a feeling.**

- "How should she sound?" got skipped, because it isn't answerable in ten
  seconds. It now asks you to write one line — exactly as you'd really send it —
  in reply to a real customer message. That single sentence gives it your tone,
  your length and whether you use emoji.
- It stops asking you grammar. Whether she speaks as "I" or "we" is now
  proposed from what your site already told it, for you to correct.
- And it says plainly what skipping costs: she answers correctly and sounds
  like a form.

## 0.9.2 — 2026-09-01

**What it wrote into your agent now actually shows up.**

- Setup wrote your FAQ, links, catalogue and rules into the wrong field. Every
  write was accepted, nothing errored, and the settings screens stayed empty —
  so you were told your agent knew 14 answers while the FAQ page showed none.
- Writing to the wrong place is now refused outright, with the right place
  named, instead of quietly succeeding.

## 0.9.1 — 2026-09-01

**She isn't finished until she sounds like you.**

- Setup could report an agent as built while she still had no voice of her own —
  everything written, every question answerable, and no tone, no greeting, and
  the wrong grammatical gender. It looks fine and it fails quietly: she answers,
  and she sounds like nobody.
- It's the one part of setup your website can't answer, which is exactly why it
  got skipped. Setup now checks the agent's real configuration before saying
  she's ready, and asks again if her voice is still empty.

## 0.9.0 — 2026-09-01

**Three messages, and you meet her at the end of them.**

- Setup asked six questions across six replies. It now asks one — your website —
  then does the whole build and comes back with what she knows, the two things
  your site contradicts itself on, and how you'd like her to sound. All
  answerable in one reply.
- **It opens on what you get, not on what's missing.** "There's no agent yet" is
  a deflating first sentence, and asking what to call it before doing anything
  spent your opening reply on a novelty. That question moved to the end, where
  it belongs.
- **You can try her before anyone else can.** The link opens the app with the
  test chat already up — ask her something a customer would and watch her
  answer. No customer sees any of it.

## 0.8.0 — 2026-09-01

**Your agent is finished before anyone can message her.**

- Setup used to write your business details and stop, then offer to connect
  WhatsApp — putting real customers in front of an agent that knew almost
  nothing. It now writes everything your site gave it: what you sell, your
  links, your rules, and the questions you already answer.
- **And it gives her a voice.** Type one reply the way you'd really send it and
  she picks up your tone, your length, and whether you speak as "I" or "we" —
  which Hebrew needs on every verb. A new agent defaults to none of that.
- **Then you can try her before a customer can.** Ask her something a customer
  would and watch her answer.
- It no longer tells you she can answer things it hasn't written. It reads her
  configuration back and reports what is actually there.
- Channels come last, once she's actually ready.

## 0.7.0 — 2026-09-01

**Setting up your agent, as four moments instead of one long message.**

- **It tells you the moment your agent exists.** Before this it created one and
  carried on talking about your website, so you had to ask whether something had
  been made on your account. Anything that spends a seat or changes your agent
  now gets said out loud, on its own line, as it happens.
- **It writes in everything that's clear, and holds back only what isn't.**
  Saying "later" to one detail used to leave you with an agent that knew
  nothing. Now the certain things go in and the two open questions wait.
- **One question at a time.** Naming it and asking for your website in the same
  breath got one answer and lost the other.
- **It ends on what's next, never on "done"** — which after this step is always
  the same thing: nobody can reach her yet.

## 0.6.1 — 2026-09-01

**Every link went to a host that doesn't exist.**

- Links during setup pointed at `app.assistantlabs.io`, which does not resolve.
  Anyone who tapped one got a browser error with our name on it. They now go to
  `assistantlabs.io`, and the rule is written down where the routes are.
- Creating an agent no longer reads as finished when it isn't. An agent with a
  name and nothing else answers nobody, and stopping halfway now says so.
- On a brand-new account, the first call used to fail with "this key reaches
  several agents" and an empty list — the wrong reason, on the first thing that
  happens. It now says there are no agents yet and what to do about it.

## 0.6.0 — 2026-09-01

**Your agent learns your website in front of you.**

- Reading the site now splits at the seam it always had: the server finds the
  pages, renders them properly and strips the navigation — and the reading, the
  working-out, is done here, in the conversation, where you can see it.
- **So you get shown what it learned before any of it goes live.** Hours,
  prices, what you sell, the questions your site already answers — with the two
  things it probably got wrong flagged, because there are always two.
- The old background crawl is still there for a site too big to read, and now
  says plainly that its result lands in the app rather than here.
- Everything the operator tells you now reads like the welcome: headed, ticked,
  and scannable on a phone in ten seconds. ✅ what's true, ⚠️ what needs you.

## 0.5.1 — 2026-08-31

**The agent learns the website in front of you.**

- Reading the site is now the operator's own job: it fetches the pages, shows
  you what it worked out, takes your corrections, and only then writes it in.
  You watch your agent learn and fix it in the same breath.
- It no longer hands the site to the background crawler for this. That crawler
  reports nothing back to the conversation, so "I'll show you what it got" was a
  promise it could not keep — and it merges into a live agent, which can move
  hours you typed by hand. Still there for a catalog too large to read, and it
  now says plainly that the result lands in the app instead.

## 0.5.0 — 2026-08-31

**The first minute.** Nothing that used to hand somebody an instruction still
does.

- **A welcome that says what it does for the business**, not what the product
  is. Four things, each with the command that does it, in English and Hebrew —
  both written out rather than translated at runtime, because a live
  translation reads translated.
- **Real selectable options** instead of bold text pretending to be buttons.
  Two on the welcome; multi-select when picking channels, because most
  businesses want more than one.
- **It asks what to call it** before anything else. Never names itself.
- **The agent gets created here.** `create_agent` mints the same record the
  app's onboarding does, then `scan_website` fills it from their own site —
  correcting one wrong opening hour beats answering twenty questions. Walking
  somebody into the app is now the fallback, not the default.
- **Channels are doors, not directions.** Each channel gets a titled link that
  opens the app with that channel's connect screen already up.
- **`/al-integration`** — connect the agent to a system they already run, so it
  can answer from it mid-conversation.
- Fixed: the README pointed at `/brief` and `/remember`, which are not the
  commands' names.

**Requires** the `agent:create` permission. An existing connection does not have
it — reconnect once to pick it up.

## 0.4.0 — 2026-08-31

**One connector, everything.** Connecting is a single URL, once.

- Assistant Labs served five addresses — the agent, the task board, the CRM,
  Sales, Marketing — so wanting the suite meant adding five connectors, signing
  in five times and reading five consent screens before anything worked. `/mcp`
  now carries all of it.
- **The consent screen decides what appears**, not the URL. Somebody who ticks
  only customer replies gets those 49 tools; nobody carries the CRM's tools for
  a product they did not ask for.
- The URL split had been the safety gate — wanting a task board should not
  pre-approve reading every conversation. The module picker is that gate now,
  and it asks in the owner's own language before any of it is reachable.
- The per-product addresses still work for anyone already connected to one.

## 0.3.3 — 2026-08-31

Connecting is now three numbered steps and one thing to paste.

- **The whole instruction fits on one screen**: open the page, click Add custom
  connector, paste the URL. No explanation of connectors, no permission list, no
  mention of OAuth or MCP — those are our words, not the owner's.
- **All three steps at once**, with the URL alone in a code block so it is one
  clean copy, and "about two minutes" said out loud.
- **Never "find Assistant Labs in the list"** — it is not in the connector
  directory, so there is nothing to find and looking for it wastes the first
  five minutes.
- **The welcome promises only what exists.** It named a helpdesk module the
  consent screen does not offer; it now names the four that do.
- **Coming back is a probe, not a question.** The operator checks for itself
  rather than making anybody prove the connection worked.

## 0.3.2 — 2026-08-31

Tells people the route that actually works on the surface they are on.

- **The plugin cannot sign anybody in on claude.ai or Cowork.** That sandbox
  ships no executables from a plugin, cannot open a browser on the person's
  machine, and blocks outbound calls to the auth host. `/al-login` no longer
  tries and fails first — a blocked network call is a poor opening experience.
- **Assistant Labs is not in the connector directory**, so there is no entry to
  search for and the old copy sent people hunting for one that does not exist.
  It now gives the exact three clicks and the URL to paste, plus the Team and
  Enterprise variant.
- **The terminal keeps the one-link sign-in** — the device grant works there,
  and that is where it stays until the directory listing lands.

## 0.3.1 — 2026-08-31

0.3.0's sign-in only worked in a terminal. This makes it work everywhere.

- **No bundled executable in the path.** Hosted surfaces (claude.ai, Cowork)
  receive a plugin's content files and not its `scripts/` directory, so the
  connect script simply was not there and `/al-login` fell straight back to the
  settings menu it exists to replace. The whole flow is now plain HTTP run
  inline, which needs nothing shipped.
- **A link, not a browser window.** On a hosted surface the shell is a remote
  sandbox, so opening a browser was never going to reach the person's own
  machine. One clickable link is the same single action and works everywhere.
- **The header helper no longer needs the script either.** It uses the bundled
  one where it exists — a terminal, which also gets silent token refresh — and
  reads the credential file inline everywhere else.

## 0.3.0 — 2026-08-31

**`/al-login` now connects you itself.** It opens your browser, you sign in and
tick what you want it running, and the session carries on by itself. No settings
menu, no permission list to hunt through, and nothing to come back and confirm.

- **The device grant (RFC 8628) on the Assistant Labs OAuth server.** The grant
  that exists for exactly this: a client and a browser that are not the same
  machine. Every chat surface that is not a local terminal is that case, which
  is why the old flow could only ever hand somebody an instruction and wait.
- **One sign-in covers every module.** One token, scoped by what was ticked,
  works across the agent, the board, Sales and the CRM — instead of four consent
  screens for somebody who wanted one thing.
- **The consent screen asks about products, not permissions.** Customer replies,
  the task board, the CRM, Sales — with the exact permission list one click away
  for anyone who wants to read it. Nothing that reaches a real customer is ever
  ticked by picking a product.
- **What they ticked decides what setup does next.** Setup no longer walks
  anybody through a module they did not ask for.
- **The token refreshes itself.** A `headersHelper` renews it in the background,
  so nobody signs in again because an hour passed.
- **Declining is a real answer.** Saying no in the browser ends the wait
  immediately instead of leaving the session polling until the code expired.

## 0.2.1 — 2026-08-31

A first run that welcomes somebody instead of instructing them.

- **The first minute is an onboarding, not a setup screen.** `/al` now opens
  with a welcome, what the operator actually does in the owner's terms, the
  three things the next five minutes hold, and a question they can answer in one
  word — then stops. It offers the next step rather than leaving a blank pause,
  and one of the options always costs nothing.
- **The welcome is used once.** Somebody coming back gets their business, not a
  greeting they have already had.
- **No tool names out loud.** "None of them answer — list_assistants,
  list_tasks, list_segments aren't reachable" is a stack trace in a sentence.
  Nothing connected now reads as "nothing's connected yet".
- **Nothing connected is a first run, not a failure** — it hands to the welcome
  instead of reporting a failed probe.
- **`/al-login` never ends on a blank wait.** Once a connector answers it names
  the agent, says what it can see, and offers the next step instead of waiting
  to be asked for `/al-setup`.

## 0.2.0 — 2026-08-31

Named the commands, and stopped the operator inventing its own connection state.

- **Every command is namespaced `/al-*`.** `/al` is the front door; `/al-setup`,
  `/al-status`, `/al-brief`, `/al-waiting` and the rest follow it. Nothing
  collides with a built-in command any more. **Breaking** — the bare names are
  gone.
- **`/al-login`** — new. Probes each connector, names only the ones actually
  missing, gives the connect path for the surface the owner is really on, and
  proves the result by calling a tool instead of announcing success.
- **Probe, never infer.** A startup hook, a session notice listing servers as
  unauthorised, or a tool missing from context are no longer treated as evidence
  about the connection — only a call just made is. Inferring is what made a
  connected business get told to go and connect itself.
- **Connection is per connector, not all-or-nothing.** One answering and three
  not is the ordinary state, and is now reported that way.
- **`/mcp` is terminal-only.** It was being offered on claude.ai, the desktop app
  and Cowork, where it does not exist and the owner hits a dead end. Those
  surfaces are sent to Settings → Connectors instead.

## 0.1.0 — 2026-08-24

First version. Not yet run against a real business.

- **The operating contract** — three tiers of autonomy, and the rule that an
  approval carries the action rather than waiting to be noticed.
- **Reaching the owner on WhatsApp** — updates and approvals over the
  business's own number, with Approve / No buttons that perform the action. A
  reply from the owner never becomes a customer conversation and is never
  answered by their own AI.
- **Onboarding from wherever they are** — no account, no agent, no channel or no
  history. Resumable: it records what it establishes and picks up rather than
  starting over.
- **The business memory** — `business/`, in plain markdown the owner can read
  and edit, with the voice mined from their own people's replies.
- 14 commands, 6 subagents, 3 hooks.
- Hook guarantees covered by `tests/`; behavioural promises authored as
  `evals/` and not yet run (`plugin eval` is early access).
