import * as vscode from 'vscode';
import { TimeAnalyticsApi } from '../api/time-analytics-api';
import { formatTime } from '../utils/time-utils';

export class StatusBarProvider implements vscode.Disposable {
  private item: vscode.StatusBarItem;
  private timer: NodeJS.Timeout | undefined;

  constructor(private readonly api: TimeAnalyticsApi) {
    this.item = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      1000,
    );
    this.item.command = 'timeAnalytics.showFileStats';
    this.item.show();
    this.update();
    this.timer = setInterval(() => this.update(), 1000);
  }

  private update() {
    const workspace = vscode.workspace.workspaceFolders?.[0];
    if (!workspace) {
      this.item.text = '$(clock) Time Analytics: no workspace';
      this.item.tooltip = 'Open a workspace to track time';
      return;
    }

    const projectTotals = this.api.getProjectTotals(workspace.uri);
    const active = projectTotals.active;
    const idle = projectTotals.idle;

    this.item.text = `$(clock) Active ${formatTime(active / 1000)} · Idle ${formatTime(
      idle / 1000,
    )}`;
    this.item.tooltip = 'Click to view current file stats';
  }

  dispose() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.item.dispose();
  }
}
