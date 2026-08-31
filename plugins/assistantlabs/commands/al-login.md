---
description: Connect Assistant Labs — opens your browser, signs you in, picks up by itself
---

# Connect

**Probe first, silently.** Call `list_assistants`. If it answers, they are
already connected — say who they are in one line and go on to `/al-setup`.
Never describe the connection from a session notice or a startup hook; only a
call you just made is evidence.

## Connecting

One command. It opens their browser, and it waits:

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/al-connect.cjs"
```

Before running it, say what is about to happen in **one sentence** — a browser
window opening unannounced is alarming:

> "I'll open Assistant Labs in your browser — sign in, tick what you want me
> running, and I'll carry on from here by myself."

Then run it and **stay quiet until it returns.** It is polling; there is nothing
to narrate and nothing to ask. Do not tell them to come back and confirm — the
whole point is that it knows.

It prints one JSON line: `connected`, the `scopes` granted, and which `modules`
they ticked. If the browser could not be opened it prints the link instead —
give them the link and keep waiting.

**Then re-probe.** `list_assistants` should now answer. The first tool call
after a sign-in may 401 once while the connection picks up the new token; that
is expected, and calling again is the fix, not a reason to report failure.

## What they chose decides what happens next

The `modules` in the result are the real answer — the consent screen is the
authority, not what was asked for. Continue into `/al-setup` with only those:

| Module | What setup then owes them |
|---|---|
| `agents` | a live channel, and an agent that knows the business |
| `tasks` | the board, and a number to reach them on |
| `crm` | their companies and people imported |
| `sales` | Shopify connected, and a first journey |

**Never walk somebody through setting up a module they did not tick.**

## Then earn it immediately

Do not stop on "connected" — that is a status, not a result. Go straight to the
business:

> "You're in — סוכן AssistantLabs. Give me your website and I'll read it so I
> actually know what you sell, or just tell me in your own words."

Scan the site (`scan_website`), check what it found *with* them, and look at
what is already waiting. Correcting beats composing, and one scan replaces
twenty questions.

## When it does not work

- **They declined in the browser** — `connected: false, reason: "declined"`.
  Take it. Say nothing was granted and that `/al-login` is there when they want
  it. Do not ask why.
- **It timed out** — the window expired. Offer to run it again; that is all.
- **The deployment is too old** — the script says so. Fall back to
  Settings → Connectors on claude.ai and the desktop app, `/mcp` in a Claude
  Code terminal.
- **Still nothing after a successful sign-in** — say plainly which connector is
  silent, in their words, never as a tool name.

**No API key, no password, nothing pasted into the chat.** If they offer one,
decline and point them back at the sign-in.
