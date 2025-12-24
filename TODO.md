# TODO

## Data Model (0.2.0 schema)

- Flat maps only (no nested maps) plus indexes for day/user/file/commit:
  - buckets: Record<bucketKey, { active, idle }>
  - indexes: indexByDay, indexByUser, indexByFile, indexByCommit (Record<string, string[]>)
- Aggregate caches (fast reads):
  - project totals; users[userId]; files[path].users[userId]; daily[day]; commits[hash]; deleted.users[userId]
- bucketKey format: day|file|user|commit|branch (omit missing parts, canonical order).
- Update file-version guards/version finder for 0.2.0.

## Migration

- Add 0.1.2 -> 0.2.0 migration:
  - Wrap files[path] into files[path].users.anonymous { active, idle }
  - users.anonymous from project totals; deleted -> deleted.users.anonymous
  - Init daily, commits, buckets, indexes as empty
  - Set version 0.2.0
- Ensure runner picks up the new step.

## API Layer (time-analytics-api)

- Use latest schema via a single alias.
- On init: load, migrateToLatest, or create fresh 0.2.0.
- Methods:
  - addToBucket(bucketKey, activeDelta, idleDelta); upsert indexes when bucketKey is new
  - Update aggregates: project, users, files, daily, commits, deleted
  - markDeleted(path); rename(oldPath, newPath); stats helpers for UI
- Persist on flush; consider throttled writes.

## Core / Tracking

- bucket-context:
  - Holds current { day, user, file, commit, branch, activity }
  - updateContext(partial, ts): flush previous bucket with duration (ts - lastTs), start new bucket
- Distribution rules:
  - If multiple files focused and idle: split idle equally (1/n) across focused files per tick.
  - Only one file can be active at a time; active delta goes only to that file’s bucket.
- Trackers:
  - document-tracker: typing → activity=active; idle debounce → activity=idle; focus change → update file
  - auth-tracker: update user (default anonymous)
  - git-tracker: update commit/branch
  - fs-tracker: open/close/rename/delete; on delete call markDeleted
  - day-tracker: handle date rollover → update day
- Use Date.now() and pass ts into context updates.

## UI

- SidebarView: use new API aggregates + pending deltas; avoid double counting.
- StatusBarProvider: use persisted + pending session time.
- Webviews (add):
  - Calendar view (daily heatmap)
  - Recent activity
  - Daily summary
  - Stats page for arbitrary queries with charts/graphs.

## Extension Wiring

- extension.ts: instantiate API; run migration or create fresh; create bucket-context + trackers; wire VS Code events; register sidebar/status bar/webviews; remove old managers.

## Cleanup

- Remove obsolete managers/providers; no interfaces outside file-versions; keep comments removed.

## Testing

- Migration test 0.1.2 -> 0.2.0
- bucket-context tests: flush on context change with correct deltas and multi-focus idle split
- Tracker tests: debounce active/idle
- Run lint/prettier/tests in CI.

## Docs

- Update README for 0.2.0 (per-user, daily, commits, buckets, multi-focus rules, webviews)
- Update CHANGELOG via release-please after merges
