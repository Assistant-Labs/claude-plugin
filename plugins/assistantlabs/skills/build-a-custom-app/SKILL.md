---
name: build-a-custom-app
description: >
  When the business needs something the suite doesn't do — deciding whether to
  build at all, choosing between a Custom Integration (a new tool the business's
  AI agent can call), a local automation, or a small internal app, and shipping
  it without creating something only the operator can operate. Use for "can it also
  do X", "connect it to <some system>", "build me a tool/dashboard/automation",
  or any request that does not map onto an existing feature.
---

# Building something custom

The business owner should be able to say "it should also do X" and get X. That
is the promise. This file is about doing it in a way that still works in six
months.

## Before building: three questions, in order

**1. What are they actually trying to achieve?** Not the artefact they named —
the outcome on the other side of it. Someone asking for "a spreadsheet of my
customers cleaned up" wants their list *usable*, not a file.

**2. Which existing feature is that?** Name it. Contacts import and labels. A
segment. A journey. An agent module. **A hand-built substitute for a feature
that exists is a warning sign, not service** — it teaches the business to depend
on you doing it by hand, it leaves nothing behind, and it hides the gap from
everyone.

**3. Only then: what do we build?** Usually far less than the literal ask, and
it lands somewhere the owner can keep using without you.

**This overrides a promise the agent already made.** If the AI told a customer
it would produce a file, deliver the right thing instead and say plainly what
changed.

## The three shapes

### 1. A Custom Integration — a new tool for the business's own AI agent

**This is the right answer most of the time**, and it is what makes the suite
extensible. Any HTTP API becomes a tool the agent can call mid-conversation:
check stock in their warehouse system, look up a booking, create a job in their
field-service app, read a delivery status.

```
create_custom_integration   — define the endpoint, auth, arguments
list_custom_integrations    — what the agent can already reach
```

Or import an OpenAPI spec and get the endpoints in one step.

Rules that matter:

- **Describe the tool for a model, not for a developer.** The description is the
  only thing deciding when it gets called. "Checks live stock for a SKU. Use when
  a customer asks whether something is available." — not "GET /inventory".
- **Return small, human-shaped results.** A 400-row JSON dump costs the
  conversation its context and the customer their answer. Return the three
  fields the reply needs.
- **Never put a credential in a place a customer could reach.** Auth belongs in
  the integration's own config.
- **Test it against the real system before the agent gets it.** A tool that
  errors mid-conversation is worse than no tool.
- **Then check what the agent does with it** — simulate the conversation a
  customer would actually have. A registered tool the agent never calls is the
  same as no tool, and the cause is almost always the description.

### 2. A local automation — a script the operator runs

For work that happens *around* the business rather than inside a conversation:
a nightly reconciliation, a report, an import, a sync between two systems that
have nothing to do with each other.

- Keep it in the owner's project, in plain sight, with a one-line comment saying
  what it is for and who asked for it.
- **It reads and prepares. It does not send or spend** — those go through the
  approval path like everything else.
- **Fail loudly.** A sync that silently stops is worse than one that never
  existed, because everyone keeps believing it.
- Prefer boring: a script that runs on a schedule and writes a task beats a
  service that needs babysitting.

### 3. A small internal app — something the owner opens

A dashboard, a form for their staff, a screen for the shop counter. Build it if
it removes a daily manual step; don't build it because it demos well.

- **One page that answers one question** beats a system.
- The data comes from the live system on load. **Never build a second copy of
  the business's data** — a stale dashboard makes worse decisions than no
  dashboard.
- If two people need to see it, it needs a real home, not a file on a laptop.

## The rules that apply to all three

**Build the tool the second time, not the first.** The first time something is
needed, do it by hand and note it. The second time, build it — now you know the
shape. Building on the first ask produces the wrong thing, confidently.

**When you reach for a third workaround, the design is wrong.** One special case
is engineering. A third rule patching the first two means the thing underneath
is broken — stop and fix that. **The best outcome of a fix is deleting code**,
not adding a smarter layer.

**A domain usually has a standard answer.** Look for it before inventing one.

**Nothing you build may become something only you can operate.** The owner must
be able to see it, understand roughly what it does, turn it off, and get someone
else to maintain it. An automation that only the operator understands is a dependency
the business did not agree to take on.

**Write it into the `stack` memory page** — what it is, who asked for it, what it
touches, and how to switch it off. Something running that nobody remembers
authorising is the worst artefact in a small business.

## When the honest answer is "the product doesn't do that"

Say so. Then say what it *would* take, and what the nearest thing that exists
today gets them. Do not hand-build a permanent substitute for a missing feature
and let everyone believe the gap was filled — that is how a business ends up
running on something nobody owns.
