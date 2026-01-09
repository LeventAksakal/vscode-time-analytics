# UI Specification: Time Analytics Dashboard (v1.0.0)

## 1. Core Data

**Units**: Seconds (`H:mm:ss`).  
**Source**: JSON Buckets (`DD-MM-YYYY,<auth>,<branch>,<path>`).  
**StatSummary**: Standard object for all aggregations.

- `active`: Duration (typing/interaction).
- `idle`: Duration (focused but inactive).
- `files`: Count of unique paths.
- `topFiles`: Sorted list of files.
- `languages`: Map `{ [ext]: seconds }`.

## 2. Global Layout

**Container**: Single shell, responsive, standard VS Code theming.
**Nav**: Sticky Top Bar. Tabs: `[Daily | Timeline | Search | Settings]`. Persist state.

## 3. View Specifications

### 3.1. Dashboard View (Default)

**Controls**: Date Range Picker + Presets `[Daily | Weekly | Monthly]`.

**Layout Grid**:

1. **Summary Row**:
   - Active Time (Card).
   - Idle Time (Card).
   - Files Touched (Card).

2. **Charts Row**:
   - **Left**: Language Distribution (Donut chart + Legend).
   - **Right**: Timeline Activity (Column chart: Time vs Duration).

3. **File Activity Row**:
   - Table listing files.
   - Columns: Path | Branch | **Activity Ratio** | Duration.
   - **Activity Ratio**: Horizontal bar showing Active (Blue) vs Idle (Orange) proportions.

### 3.2. Search View [Implemented]

**Inputs**:

- File Path (Fuzzy match)
- Filters: Author, Date Range, Branch.
  **Results**:
- "Found X matching files..."
- Filtered `FileActivityTable` listing results.

- Global `StatSummary` for matches.
- Virtualized list of matching files.

### 3.4. Settings View

**Global Stats**: Lifetime Active Time, Lifetime Idle Time.
**Config**:

- Toggles: "Auto-track", "Repo Tracking".
- Actions: "Add .gitignore", "Clear Data", "Export JSON".

## 4. Technical Constraints

**Theming**: MUST use `var(--vscode-*)` (foreground, editor-background, widget-border, charts-\*).
**Perf**:

- Heavy aggregation (12m) in backend/worker.
- `shallowRef` for large bucket stores.
- Virtualize lists > 50 items.
