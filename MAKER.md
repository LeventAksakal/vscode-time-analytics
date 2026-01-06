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

### 3.1. Daily View (Default)

**Header**: Date Picker (Today default).
**Hero Cards**:

1. **Active Time** (`var(--vscode-charts-blue)`).
2. **Idle Time** (`var(--vscode-charts-orange)`).
3. **Impact** (Files Touched).
   **Visualizations**:

- **Language**: Donut chart (Top 5 langs). Interactable legend.
- **Heatmap**: Punch card / Hourly bars (00:00-23:59) showing intensity.
  **File List**:
- Cols: Path (trunc), Branch, **Ratio Bar**, Text Values.
- **Ratio Bar**: Horizontal bar. `Active%` (Green/Blue) + `Idle%` (Yellow/Orange).
- Sort: Descending by Active Time. Empty State: "No activity for [Date]".

### 3.2. Timeline View

**Controls**: Segmented `[7 Days | 30 Days | 12 Months]`.
**Chart**: Vertical Bar Chart.

- X in Days/Months. Y in Duration (Stacked Active + Idle).
- Hover: Tooltip with `StatSummary`.
  **Aggregation**: Summary footer for selected range (Total Active/Idle, Avg/Day).

### 3.3. Search View

**Inputs**: Text query (path). Filters: Author, Date Range, Commit Hash, Branch.
**Results**:

- "Found X files...".
- Global `StatSummary` for matches.
- Virtualized list of matching files.

### 3.4. Settings View

**Global Stats**: Lifetime Active Time (all workspaces), Language Pie Chart.
**Config**:

- Toggles: "Auto-track", "Repo Tracking".
- Actions: "Add .gitignore", "Clear Data", "Export JSON".

## 4. Technical Constraints

**Theming**: MUST use `var(--vscode-*)` (foreground, editor-background, widget-border, charts-\*).
**Perf**:

- Heavy aggregation (12m) in backend/worker.
- `shallowRef` for large bucket stores.
- Virtualize lists > 50 items.
