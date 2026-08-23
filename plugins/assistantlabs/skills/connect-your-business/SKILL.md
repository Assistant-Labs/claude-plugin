---
name: connect-your-business
description: >
  First run and wiring — connecting the operator to the business's Assistant Labs
  workspace (channels, agent, tasks board, sales, CRM) over the remote MCP
  connectors, what each permission actually lets it do, what to do when a
  connector is missing or a permission is not granted, and how to verify a
  connection really works. Use on setup, when a tool is unavailable, on
  "connect X", or when something that used to work stopped.
---

# Connecting the business

The operator does not hold the business's data or credentials. It works through the
business's own Assistant Labs workspace over three remote connectors, and the
owner authorises each one by signing in — **no key is ever pasted, copied, or
stored in a file.**

## The four connectors

| Connector | Endpoint | What it reaches |
|---|---|---|
| `assistantlabs` | `/mcp` | The AI agent, its knowledge, conversations, contacts, channels, WhatsApp templates, custom integrations |
| `assistantlabs-tasks` | `/tasks/mcp` | The task board — the owner’s window into the operator, and where approvals live |
| `assistantlabs-sales` | `/sales/mcp` | Audiences, outreach journeys, funnel state |
| `assistantlabs-crm` | `/crm/mcp` | The system of record — companies, the people at them, and the fields this business tracks |

They are separate on purpose: wanting a task board should never mean
pre-approving access to every conversation the business has ever had.

## Connecting

1. `/setup` walks the whole thing. Or: `/mcp` → pick the connector → **Connect**.
2. Claude opens the Assistant Labs sign-in. The owner signs in as themselves.
3. A consent screen lists **which agent** and **which permissions**. They tick
   and approve.
4. Done. The grant belongs to their organisation and they can revoke it any time
   from **Account → Developers → Connected apps**.

An API key still works and is fully supported (some connector UIs need one) —
but signing in is the default and the better path, because a key in a URL leaks
into logs and a grant does not.

## The permissions, in plain language

Tick what the business actually wants the operator to do. Fewer is genuinely fine —
every tool the operator lacks simply doesn't appear.

| Permission | Lets the operator |
|---|---|
| Read the agent | See how the agent is set up and what it knows |
| Change the agent | Fix its knowledge — prices, hours, answers, links |
| Read conversations | Read what customers said and how it went |
| Read contacts | See the customer list |
| Change contacts | Fix and enrich customer records |
| Read channels | See which channels are connected and healthy |
| Train the agent | Propose improvements from real conversations |
| **Message a customer** | **Speak to real people as the business** |
| Read the board / change the board | Run the task board and the approval queue |
| Sales: read / draft | See audiences and funnels, prepare campaigns |
| **Sales: activate** | **Take a campaign live — real messages to real people** |
| Read the CRM | See the companies and people the business tracks |
| Change the CRM | Add a company or a person, and fill in what was missing |

**The two in bold reach real people.** They are the ones the consent screen
tags, and they are the ones the operator never uses without a specific yes (see
`autonomy-and-approvals`). It is entirely reasonable to grant them — the gate is
the operator's behaviour, not the absence of the permission.

**A missing permission degrades, it does not break.** If the operator cannot message
customers, it still reads, analyses, drafts and files everything — the owner
just sends. That is a legitimate way to run, and for a nervous first month it is
the right one.

## Verifying — actually verify

A connector showing "connected" proves an OAuth handshake, not a working
capability.

```
list_assistants        → the business's agent is named and reachable
list_channels          → which channels are live (WhatsApp, email, web…)
list_tasks             → the board answers
conversation_stats     → real numbers came back
list_crm_companies     → the system of record answers
```

**If a call fails, read what it says.** The connectors translate a permission
error into a sentence naming the missing permission and where to add it — that
is the answer, not a reason to guess.

**One agent → it binds automatically.** Several → the tools take an
`assistantId`, and `list_assistants` names them. Ask the owner which one this
project is about, once, and write it into the `stack` memory page.

## What to record

After connecting, the `stack` memory page gets:

- The agent's name and id, and which one this project operates.
- Which channels are live, and which are the ones customers actually use.
- Which apps are connected (Shopify, WooCommerce, a calendar, a CRM…) and what
  each is the source of truth for.
- Which permissions were granted, and any deliberately withheld — **with the
  reason**. "No send permission — Ronit wants to press send herself for now"
  stops a future session from reporting it as a broken setup.

## When something that worked stops

In this order, and stop at the first thing that is actually wrong:

1. **Was the connection revoked?** Account → Developers → Connected apps.
2. **Is the permission still granted?** A revoke-and-reconnect can drop a tick.
3. **Is the channel itself healthy?** `list_channels`. A disconnected WhatsApp
   is the business's problem, not the connector's — and it is urgent, because
   customers are messaging into nothing.
4. **Is it one agent or all of them?** One agent failing is a configuration
   problem; all of them is a platform problem.

**Never respond to a broken connection by working around it** — building a
private copy of the data, scraping a screen, storing a key in a file. Fix the
connection. The workaround becomes the thing that silently goes stale.
