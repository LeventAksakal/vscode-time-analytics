---
applyTo: '**'
---

# Copilot Instructions

## Project snapshot (Dec 25, 2025)

- VS Code extension tracking file activity/time with bucketed storage.
- Latest schema: **0.1.5**. Buckets keyed as `DD-MM-YYYY,<auth>,<relpath>`; if date missing during migration, date part is `<Migrated Date>`. Auth part is GitHub username (fallback account id), else `null`.
- Schema/migrations: see `src/file-versions/0.1.5.ts`, `src/file-versions/version-finder.ts`, `src/migrations/0.1.4-0.1.5.ts`, `src/migrations/migration-runner.ts`.
- Bucket key parsing in UI: `src/ui/sidebar-view.ts` strips date + auth prefixes before building the tree.
- Trackers: `BucketContext` holds `authUser` and `dateKey`; `DayTracker` updates `dateKey` and sleeps until next midnight; `AuthTracker` listens to GitHub auth sessions; `DocumentTracker`/`TypingTracker` handle activity; `StatusBarProvider` is a focus-duration timer only.
- Auth: `AuthBadge` status bar item to trigger sign-in. Auth debug logs remain in `src/core/auth-tracker.ts`.
- Status bar timer text: clock icon + formatted time (no "Focus" label).

## Behavior notes

- `TimeAnalyticsApi.addDocumentDurations(filePath, dateKey, authIdentity, deltas)` builds keys with date+auth+path. Default date when missing is `<Migrated Date>`.
- Migration 0.1.4→0.1.5 prefixes all existing buckets with `<Migrated Date>,` to preserve legacy data.
- `DayTracker` sets dateKey on init and reschedules at midnight; avoids constant polling.

## Working agreements

- Default to ASCII in edits. Keep console logs minimal (auth tracker debug logs are currently intentional).
- Maintain Conventional Commit style; suggested recent prefix: `feat(tracking): ...`.
- Do not remove user changes; avoid destructive git commands.
- Prefer `apply_patch` for single-file edits; use tooling (runTests, get_errors) instead of raw commands when possible.
- When referencing files/lines in responses, follow link formatting rules in system instructions (workspace-relative, with #Lx when needed).

## Quick file map

- API/storage: `src/api/time-analytics-api.ts`
- Context/trackers: `src/core/bucket-context.ts`, `src/core/day-tracker.ts`, `src/core/auth-tracker.ts`, `src/core/document-tracker.ts`, `src/core/typing-tracker.ts`
- UI: `src/ui/sidebar-view.ts`, `src/ui/statusbar-timer.ts`, `src/ui/auth-badge.ts`
- Versions/migrations: `src/file-versions/*`, `src/migrations/*`

## Open considerations

- Auth debug logs could be gated or removed before release.
- Legacy data is tagged `<Migrated Date>`; if you need richer bucketing of pre-date data, add a more specific migration.
