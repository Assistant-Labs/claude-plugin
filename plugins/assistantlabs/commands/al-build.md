---
description: Build something the suite doesn't do yet
argument-hint: "<what it should do>"
---

The owner wants: `$ARGUMENTS`. Read `build-a-custom-app` first.

**Do not start building.** Answer three questions, out loud, in order:

1. **What are they actually trying to achieve?** The outcome, not the artefact
   they named. Say it back in one sentence and let them correct it.
2. **Which existing feature is that?** Name the product and the feature. If it
   already exists, set it up instead — and say plainly that you are doing
   something different from what they asked, and why. A hand-built substitute
   for a feature that exists is the wrong answer even when it works.
3. **If nothing covers it — which shape?**
   - **A tool for the AI agent** (a Custom Integration) if it belongs inside a
     customer conversation. This is usually the answer.
   - **A local automation** if it happens on a schedule, around the business.
   - **A small internal app** if a person needs to look at it.

Then build the smallest version that is genuinely useful:

- A tool for the agent gets a description written for a model, small
  human-shaped results, credentials in the integration's own config, and a real
  test against the live system before the agent gets it. Then simulate the
  conversation and check the agent actually calls it.
- An automation reads and prepares — it never sends or spends — and it fails
  loudly.
- An app is one page answering one question, reading live data. Never a second
  copy of the business's data.

Finish by writing it into the `stack` memory page: what it is, who asked for it,
what it touches, how to switch it off. Then show the owner it working on their
real data — not a description of it working.

If the honest answer is "the product can't do this yet", say so, say what the
nearest thing gets them, and don't quietly build a permanent replacement.
