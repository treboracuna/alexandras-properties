# ALEXANDRAS-PROPERTIES — PROJECT MEMORY

The ACUÑA umbrella site. Alexandra's Properties owns the real estate; Exclusiva builds. Two separate companies, owner and builder, one shared social presence. Not a holding structure (ruled 2026-08-26 with Roberto). Hand-coded HTML; copy ships as markdown from copy lanes and is placed by the site lane.

**Voice is a contract, not a preference** — see rules-brand-voice.md. Violations are rejections. Never corporate, never generic, never a listing.

**Repo facts:** remote is live; #033, #034 and #035 pushed 2026-09-04/05. Ship record and next handoff live in `_packets\` (gitignored). `.claude\settings.local.json` was corrected 2026-08-20 and shows as modified in git — leave it; commit-or-gitignore decision happens at next ship. A Texaswide-branded image sits in `images\` (cross-entity, flagged 2026-08-20).

**Test suite:** `npm test` runs `scripts/gate-test.js` - 15 assertions covering the #074 tracking gate across three states: Global Privacy Control on, opted out via localStorage, and default allowed. Expected count is 15 green. A count that disagrees with 15 is a finding, not something to paper over. The harness runs the tag block in a context where `window` IS the global object; a harness that passes `window` in as a parameter reports a false failure.

@.claude/rules/rules-git-discipline.md
@.claude/rules/rules-verification.md
@.claude/rules/rules-never-delete.md
@.claude/rules/rules-brand-voice.md
@.claude/rules/rules-lane-discipline.md
@.claude/rules/rules-computer-use.md
