# Time Analytics for VS Code

Track your coding activity locally, privately, and accurately. Time Analytics helps you understand how you spend your time in VS Code without sending data to third-party servers.

## Features

- **Real-time Tracking:** See your stats update live as you type.
- **Active vs. Idle Time:** Distinguishes between time spent typing (`Active`) and time spent reading/thinking (`Idle`).
- **Global Stats:** Aggregates data across all your workspaces and windows.
- **Workspace Tree:** View a hierarchical breakdown of time spent per folder and file.
- **Deleted Files Bin:** Keeps track of time spent on files even after you delete them.
- **Privacy First:** All data is stored locally in a `.vscode/time-analytics.json` file.

## Usage

1.  **Sidebar:** Click the clock icon in the Activity Bar to view the full breakdown.
2.  **Status Bar:** See your current session duration at a glance.
3.  **File Stats:** Click the graph icon in the editor title bar to see detailed stats for the current file.

## Data Storage

Data is stored in `.vscode/time-analytics.json` in your workspace root. You can commit this file to share stats with your team or add it to `.gitignore` to keep it private.

## License

MIT
