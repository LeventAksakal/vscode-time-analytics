# TODO

## Current State (0.1.3 buckets)

- Buckets replace files; API uses bucket keys (relative path) with `active/idle` deltas.
- Document/typing trackers drive a shared bucket-context; UI reads persisted data only.

## Multi-Window Concurrency

- Add cross-process safety when multiple VS Code windows share the same workspace:
  - Prefer advisory file locking around read/modify/write of `.vscode/time-analytics.json` (e.g., retry with backoff), or
  - Switch to an append-only journal + periodic compaction.

## Next Schema (0.2.0 – backlog)

- Flat bucketKey with dimensions (day|file|user|commit|branch), plus indexes for day/user/file/commit.
- Aggregate caches: project, users[userId], files[path].users[userId], daily[day], commits[hash], deleted.users[userId].
- Migration 0.1.2 -> 0.2.0: wrap file stats into users.anonymous, carry project totals/deleted, init indexes, set version.

## API Layer

- Keep single latest alias; expose bucket helpers: addToBucket, rename, markDeleted, stats helpers; persist with locking/journal strategy.

## Core / Tracking

- bucket-context: flush on context changes; split idle across focused files; single active target at a time.
- Trackers backlog: auth (user), git (commit/branch), fs (open/close/rename/delete->markDeleted), day rollover.

## UI

- SidebarView: aggregate buckets (incl. deleted) without double counting; live flush per refresh tick.
- Future webviews: calendar heatmap, recent activity, daily summary, ad-hoc stats.

## Extension Wiring

- Instantiate API + bucket-context + trackers; hook VS Code events; register sidebar/status bar/webviews; remove legacy managers.

## Testing

- Migration test 0.1.2 -> 0.2.0 (when built).
- bucket-context: flush math and multi-focus idle split.
- Trackers: debounce active/idle timing.
- Concurrency: lock/journal write path under multi-window scenario.

## Docs

- README for 0.1.3 buckets (and 0.2.0 when ready): bucket semantics, multi-focus rules, concurrency note.
- CHANGELOG via release-please.
