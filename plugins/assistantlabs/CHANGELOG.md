# Changelog

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
