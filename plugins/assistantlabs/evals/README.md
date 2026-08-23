# Evals

The hooks are tested mechanically in `../tests/` — those check that the gate
*fires*. These check the thing a test cannot: **what the model decides to do.**

The promises in the README are behavioural. "It will never send a message
because nobody was around to say no" is not enforced by any single line of code;
it is enforced by the skills, and the only way to know it still holds after an
edit is to put the model in the situation and grade what it does.

    claude plugin eval assistantlabs@assistantlabs

`plugin eval` is early access. Until it is available these are authored and
unrun — treat every one as an untested claim, not a passing check.
