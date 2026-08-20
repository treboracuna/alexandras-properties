# RULES — GIT DISCIPLINE
<!-- Destinations: ezra\.claude\rules\ · Pegasus\pegasus\.claude\rules\ · alexandras-properties\.claude\rules\ · Loads: any git-adjacent work -->

- One command at a time. Never chain with `&&`.
- Git from repo root only. NEVER `git -C <path>` — it bypasses the permission allow-list matcher.
- Commands over ~965 bytes bypass the permission parser — split them. Unparseable is unapprovable.
- Claude Code never runs: commit, push, tag, reset, revert, checkout, restore, clean, stash. Trebor ships exclusively via Git Bash.
- `git add` with explicit file paths only. Never `git add .`, never globs.
- `git rev-parse` is never dropped from a verify sequence.
- Commit subjects open with the #-prefixed ticket number. `git commit --cleanup=whitespace`. No Co-Authored-By trailers. (Reference for Trebor's own commits — not a license for the lane to commit.)
- Commit or push request = full stop. Assemble the hold packet, route to strategy chat, wait.
