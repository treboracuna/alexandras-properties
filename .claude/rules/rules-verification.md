# RULES — VERIFICATION
<!-- Destinations: ezra\.claude\rules\ · Pegasus\pegasus\.claude\rules\ · alexandras-properties\.claude\rules\ · Loads: always -->

- "Verified" = raw output shown. Prose claiming verification is not verification.
- Truncated output: say so and provide the remainder. Never re-run to dodge showing it.
- A surprising result is investigated before it is called a bug.
- Tag position proves location only (`git tag --points-at HEAD`). Verify status is provable only from an explicit record of it.
- Live verify starts with the build stamp (`#verStamp`). Stamp mismatch = stale bundle: STOP, check the deploy SHA before walking any checklist.
- Full suite green with 0 JS errors before a hold is even offered. Current count lives in this repo's CLAUDE.md — if it says [[FACT]], stop and get the number.
- Tests are corrected to new contracts, never loosened. Test against real data files, not synthetics.
- Behavior-preserving refactors are proven by diffing old vs new outputs across hundreds of cases, not by inspection.
