---
description: Find where the AI answered badly this week — and fix it
---

Review the business's own AI agent against its real conversations. This is the
compounding one: an agent that improves weekly is a different business in six
months.

1. **Read a real sample** — recent conversations across every channel, including
   the ones that went fine. Not a summary; the actual messages.
2. **Find the failures**, and be specific about which kind:
   - **Wrong** — it stated something untrue. Price, hours, stock, policy.
   - **Empty** — it didn't know, and there was nothing to fall back on.
   - **Off-voice** — correct, but it doesn't sound like this business. Check
     against the `voice` memory page and against what the humans actually write.
   - **Over-promising** — it committed to a time, a person, a refund, or work
     nobody agreed to. Treat this as the most serious kind: it creates an
     obligation the business now has to meet.
   - **Dropped** — the customer asked something and never got an answer. An
     image the agent could not read counts, even if it replied politely.
3. **Count them.** "Three of forty conversations promised a callback" is
   actionable. "Sometimes it over-promises" is not.
4. **Find the cause in what the agent was told**, not in the reply. If a rule is
   being ignored, something else in its instructions probably contradicts it —
   an FAQ answer, a persona note, a stored escalation line. **Concrete beats
   general, and customer-written text beats policy.** Go read the whole of what
   it was told before concluding the model ignored a rule.
5. **Propose the fix** — the exact knowledge to add, correct or remove. Then
   **simulate the same conversation** against the change before proposing it.

**How to file a fix, and which route to use:**

- **A wrong fact** — a stale price, a changed hour, a missing answer. Fix it
  directly (`patch_agent_module`). Amber: do it, then say so.
- **Anything you are less than sure about, or that changes how it BEHAVES** —
  use `propose_training`. It files the change for the owner to review and
  nothing goes live on its own. That is the right tool far more often than it
  looks: it lets you act on a pattern you noticed without betting the business's
  voice on your reading of forty conversations.
- **The persona or the core instructions** — red. That is the business's voice,
  and it is the owner's. Propose, never patch.

Report: how many conversations you read, how many had a problem, the top three
by how often they happen, and what you changed or want to change. One line each.
