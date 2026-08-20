---
description: Audit every done-when box against raw output
---
<!-- DRAFT — install as <repo>\.claude\commands\donewhen.md (all repos) -->
Take the work order's done-when list and audit it box by box.
- Each box gets: the condition, the raw output proving it (command + result shown), and PASS/FAIL.
- Prose is not proof. A box with no raw evidence is FAIL, even if the work was probably done.
- Partial is not done: any FAIL = the lane is not done; say so plainly and list what remains.
- Do not soften, reinterpret, or narrow any condition to make it pass. A condition that cannot be tested as written is flagged to strategy chat, not rewritten.
