---
description: Assemble the pre-commit review packet for strategy chat
---
<!-- DRAFT — install as <repo>\.claude\commands\holdpacket.md (ezra, pegasus, alexandras-properties) -->
Assemble the hold packet for the current change set. Output everything as text in the reply — never "see file" or a read confirmation. Write the packet copy to `_packets\PACKET_<ticket>_<n>.md` (never repo root).

1. `git status` — raw output.
2. `git diff` for every changed file — IN FULL. If a diff exceeds output limits, split across replies and say which part is which. No truncation without the remainder following.
3. The proposed commit subject (#-prefixed ticket number first) and full commit body — pasted as text.
4. Full suite results — raw output, including the count. Compare against the count in CLAUDE.md; mismatch = say so, do not proceed.
5. JS error count — must be 0. Show the evidence.
6. State plainly: what changed, why, what was NOT touched.
Then STOP. Do not stage, commit, or state ship commands. The packet goes to strategy chat; ship commands come back only after it passes.
