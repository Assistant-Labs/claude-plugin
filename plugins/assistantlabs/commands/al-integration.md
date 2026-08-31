---
description: Connect your agent to a system you already run
argument-hint: "<the system, or what it should be able to check>"
---

They want their agent connected to: `$ARGUMENTS`. Read `build-a-custom-app`
first — this command is its Custom Integration path, taken deliberately.

**This and `/al-build` are different doors.** `/al-build` is "make it do
something new" and decides between three shapes. This one is already decided:
a system exists, it has a way in, and the agent should be able to reach it
**mid-conversation, while the customer is still typing.** That is the whole
value — not a nightly sync, not a report.

## Who this is for

**A workspace, and a paying account.** This builds against their live systems
and puts a new tool in front of real customers; it is not part of a free trial.

- **Check before you build, not after.** No workspace → `/al-setup`. Not on a
  paid plan → say so once, plainly, name what it would let them do, and stop.
  Never half-build it and hold it hostage.
- **The check is not enforceable in the tools yet.** Until it is, ask, take
  their answer, and record it. Do not invent an entitlement you cannot read, and
  do not refuse somebody because you could not verify.

## What you actually need from them

Ask for these together, once. Chasing them one per message is how a
five-minute job becomes a week:

1. **What should the agent be able to answer?** In customer words: *"is the
   black one in stock"*, *"where's my delivery"*, *"when's my appointment"*.
   This decides everything else and it is the only question that matters.
2. **Which system holds that**, and its docs or OpenAPI spec if they have one.
3. **How it authenticates.** Never take a credential in the chat — it goes in
   the integration's own config. If they paste one anyway, tell them to rotate it.

**If they name a system with no API, say so immediately.** A scraped or
hand-maintained substitute is worse than nothing, because everyone starts
believing it. Name the nearest real thing instead.

## Build it

```
create_custom_integration   — define the endpoint, auth, arguments
list_custom_integrations    — what the agent can already reach
```

Or import an OpenAPI spec and get the endpoints in one step.

- **Write the description for a model, not a developer.** It is the only thing
  deciding when the tool gets called. *"Checks live stock for a SKU. Use when a
  customer asks whether something is available."* — not `GET /inventory`.
- **Return three fields, not four hundred rows.** A JSON dump costs the
  conversation its context and the customer their answer.
- **Test against the real system before the agent gets it.** A tool that errors
  mid-conversation is worse than no tool.
- **Then simulate the conversation a customer would actually have.** A
  registered tool the agent never calls is the same as no tool, and the cause is
  almost always the description.

## Finish

Write it to the `stack` memory page: what it is, who asked for it, what it
touches, how to switch it off.

Then **show them it working on their real data** — the actual answer to the
actual question from step 1, not a description of it working.
