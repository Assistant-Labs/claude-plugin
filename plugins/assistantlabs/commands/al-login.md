---
description: Connect Assistant Labs — and prove the connection actually works
---

# Connect

**Probe before you speak.** Call the tools below *first*. Never describe the
connection state from a session notice, a startup hook, or the absence of a tool
in your context — only from a call you just made. Reporting a working connector
as missing sends someone through a setup they already finished, and it is the
easiest way to look broken on the first run.

| Connector | Probe with |
|---|---|
| `assistantlabs` | `list_assistants` |
| `assistantlabs-tasks` | `list_tasks` |
| `assistantlabs-sales` | `list_segments` |
| `assistantlabs-crm` | `list_crm_companies` |

**Connection is per connector, never all-or-nothing.** One answering and three
not is the ordinary state. Report exactly what you found.

## They all answer

One line, then stop:

> "Connected — סוכן AssistantLabs. WhatsApp is live and 3 people are waiting."

Never walk someone through connecting what is already connected.

## Some are missing

Name **only** the ones that failed, and only the ones they actually need. Wanting
the agent is not a reason to sit through Sales and CRM consent screens — offer
those when something asks for them.

Then give the path for the surface they are on. `/mcp` exists **only** in the
Claude Code terminal; saying it anywhere else is a dead end:

- **claude.ai, the desktop app, Cowork** — Settings → Connectors → Assistant
  Labs → Connect.
- **Claude Code in a terminal** — `/mcp`, pick the connector, Connect. Or
  `claude mcp login <name>`.

Either way they sign in as themselves on our own page and tick what the operator
may do. **No API key, no password, nothing to paste.** If they ask what they are
agreeing to, answer it properly — one plain line per permission, and say which
ones reach real customers. Someone asking that is the best customer you will get
today.

No Assistant Labs account yet? The sign-in says so. Point at
[assistantlabs.io](https://assistantlabs.io), say it is free to start, and wait.
**Never create an account and never take a password.**

## Then verify — do not assume

When they say they are done, **run the probes again** and report what came back.
"Should be connected now" is not a result. If it still fails, say which connector
and what the error said, rather than sending them round the loop a second time.

Once something answers, go straight on to `/al-setup` — do not make them ask.
