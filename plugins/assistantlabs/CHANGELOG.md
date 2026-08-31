# Changelog

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
