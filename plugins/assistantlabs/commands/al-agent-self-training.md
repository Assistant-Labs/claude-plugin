---
description: Train your agent every night from its own conversations — you approve each fix
---

Set up the nightly training review: every night a cloud routine on the owner's
own Claude plan reads the day's conversations, works out what the agent got
wrong, and files each fix as a proposal waiting for the owner's approval. It
never changes the agent by itself.

**The schedule is fixed: every night at 02:00 in the owner's local time.** Do
not ask them to pick a time, and do not offer one. If they ask for a different
time, say it runs nightly at 02:00 so that it reads a full day.

## 1 · Check what it needs

1. **Signed in to AssistantLabs.** Call `list_assistants`. If it fails, run
   `/al-login` first. If it returns no agents, stop — there is nothing to train.
2. **Claude routines.** The routine is created with Claude Code's built-in
   `/schedule` skill (the `RemoteTrigger` tool). If neither is available here,
   say that this needs Claude Code signed in to a claude.ai account, and stop.
3. **The AssistantLabs connector on their claude.ai account.** The routine runs
   in Anthropic's cloud, not on this computer, so the plugin's sign-in here does
   not reach it. It reaches AssistantLabs only through the connector at
   `https://mcp.assistantlabs.io/mcp`. Look for it in the connector list the
   `/schedule` skill shows.

## 2 · Create the routine

Use the `/schedule` skill to create — or, when a routine named exactly
**AssistantLabs — nightly agent training** already exists, update — the
routine with:

- **name:** `AssistantLabs — nightly agent training`
- **schedule:** daily at 02:00 in the owner's local timezone, converted to UTC
  for the cron expression. Do not ask them to confirm the time.
- **repository:** none — it works only through the connector.
- **model:** the skill's default.
- **connector:** AssistantLabs, and only AssistantLabs. A routine created
  without naming a connector gets EVERY connector on the account — mail,
  calendar, drive — and this one reads messages written by strangers. If that
  happened, clear the routine's connectors before anything else.
- **prompt:** the block under _The nightly prompt_ below, verbatim.

Updating an existing one instead of creating a second keeps this command safe
to run again, and running it again is how an owner picks up a newer prompt.

**If the connector list could not be loaded, or AssistantLabs is not on it,**
create the routine anyway with no connectors (clear them as above), then tell
the owner the one step left: connect AssistantLabs at
https://claude.ai/customize/connectors (if they have not already), then open
the routine's page and add the AssistantLabs connector to it. Until then the
routine cannot read anything — say so plainly, and do not run it.

Once AssistantLabs is attached, run it once right away, so the first
suggestions do not wait for tonight.

## 3 · Tell the owner

Three lines, in their language:

- it reads every agent's conversations every night at 02:00 and suggests fixes;
- nothing changes until they approve — in each agent's Training tab
  (`https://assistantlabs.io/app/assistants/:assistantId/training`), or by
  opening that night's run in Claude and saying which ones to approve;
- the routine's link, where they can pause or delete it.

## The nightly prompt

```text
You are the nightly training review for this business's AssistantLabs AI
agents. You work only through the AssistantLabs connector, and nobody is
watching this run.

HARD RULES
- File proposals only. Never call approve_training_proposal,
  patch_agent_module, set_agent_persona, set_extra_instructions,
  send_message_to_customer or send_whatsapp_template. The owner approves.
- Only propose what a real conversation from the last 24 hours shows.
- At most 5 proposals per agent per night. Fewer and right beats many.
- If a tool is missing or every call fails, stop and report that clearly.

FOR EACH AGENT from list_assistants:

1. Read. list_conversations with days: 1 for that agent. Skip conversations
   the agent never answered. For the rest, list_thread_messages to get every
   message with its id.

2. Find what went wrong. Look for:
   - human-correction: someone from the business (senderType "business")
     stepped in to answer or correct. What they wrote is the desired answer.
   - wrong-fact: the agent said something untrue (price, hours, stock, policy).
   - unknown-answer: it did not know, and nothing in its setup covered it.
   - over-promise: it committed to a callback, a refund, a time or a person.
   - dropped-question: the customer asked something and never got an answer.
   - off-voice: correct, but not how this business talks.
   Ignore conversations that went fine, tests and spam.

3. Skip what is already known. list_training_proposals for that agent, with
   no status filter. Do not file for a message that already
   has a proposal, and do not re-propose an idea the owner rejected.

4. Work out the fix. Read get_agent_config once per agent. Find the cause in
   what the agent was told — a missing FAQ answer, a missing rule, an FAQ or
   rule that contradicts another, a persona setting — then write the smallest
   patch that fixes it:
   - touch only persona, i18n and modules; never additionalInstructions;
   - target an existing module by its id; add a new item or module with id
     null; module types faq, guidelines, business, catalog, links, labels,
     scenario, with the same shapes patch_agent_module takes;
   - write every human-readable word in the agent's own language
     (i18n.defaultLanguage).

5. File it with propose_training, proposal:
   {
     threadId, messageId (the agent message that went wrong),
     incorrectAnswer (what it said), desiredAnswer (what it should have said),
     patch,
     analysis: { rootCause: persona | module | missing-rule | conflict,
                 title: a few words, explanation: one plain sentence },
     review: { flagType: one of the kinds in step 2,
               confidence: 0 to 1, reason: one plain sentence for the owner }
   }
   If it is refused, read the reason, fix the patch and retry once. If it is
   refused again, skip it and mention it in the report.

6. If you filed anything for this agent and check_owner_notifications shows
   the owner can be reached, send ONE notify_owner message: how many new
   suggestions, and https://assistantlabs.io/app/assistants/:assistantId/training
   (with the agent's id in place of :assistantId). Otherwise do not message
   anyone.

REPORT (in the agent's language, short):
Per agent: conversations read, suggestions filed — numbered, each with its
title and one line on why — and the Training link. Anything you could not do,
and why. End with: "To apply a suggestion, approve it in the Training tab, or
reply here with its number."

If the owner later replies in this conversation asking to approve or reject
suggestions, read each with get_training_proposal, then call
approve_training_proposal or reject_training_proposal for exactly the ones
they named.
```
