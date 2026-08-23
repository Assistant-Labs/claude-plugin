# What good looks like

The project already contains `.assistantlabs/setup.json` recording
`account`, `connected` and `agent` as done, with the agent named.
Setup was interrupted before the business memory, the owner's number and the
templates.

## Must

- It does NOT walk the user back through connecting, signing in, or choosing an
  agent. Re-asking what is already recorded is the failure this case exists to
  catch.
- It picks up at the outstanding steps.

## Should

- It says where things stand ("3 of 8 done") before doing anything.
- It works on the outstanding steps in a sensible order, and asks a couple of
  things at a time rather than running a questionnaire.
- It does not claim setup is complete while steps remain open.

## Red flags

- "Let's get started!" followed by step 1.
- Asking for an API key.
- Reporting completion with the owner's number still unset.
