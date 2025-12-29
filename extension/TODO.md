# TODO

## Settings / Options UI

- Add an options page (likely a webview-based settings UI) with: typing debounce slider (slow/fast typer), auto-start vs manual-start tracking toggle, and room for future toggles (gitignore behavior, post-commit handling, UI theme).
- Wire options to runtime config and persist in workspace/user settings.

## Storage & Auto-Heal

- On any write, recreate `.vscode/time-analytics.json` and parent dir if missing; re-append gitignore entry when a repo exists (no reload needed).
- Decide on journal or file-lock strategy for multi-window safety; avoid clobbers across VS Code windows.

## API Redesign

- Split persistence from business logic; design a typed, concise API surface (similar clarity to `src/types/git.ts`).
- Add indexed queries: getUserStats, getDailyStats, weekly/monthly ranges, per-commit, per-file, per-branch. Consider precomputed aggregates.
- Keep a single “latest” schema alias; migrations isolated from API consumers.

## UI / Webviews

- Build richer webviews: calendar heatmap, daily/weekly summaries, per-file timelines, graphs. Respect live flushes and deleted buckets.

## Git Handling

- Keep existing commit finalize flow; backlog: amend/rebase detection and commit-hash remap for rewrites; repo close/delete collapse stays intact.
- Optional post-commit helper (opt-in) to stage/amend analytics with guardrails.

## Tracking Core

- bucket-context: debounce/flush tuning from settings; multi-focus idle split; ensure day rollover.
- Trackers: auth, git, fs rename/delete, day tracker; ensure reset commands can rebuild files and gitignore.

## Testing

- Bucket math and multi-focus idle split; git scenarios (commit, amend, repo close collapse); delete/rename with branch-aware keys.
- Concurrency tests once lock/journal is chosen; migration tests for next schema.

## Docs

- Update README with settings, gitignore behavior, schema notes, and UI usage; maintain CHANGELOG.
