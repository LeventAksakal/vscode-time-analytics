import * as vscode from 'vscode';
import { formatTime } from '../utils/time-utils';

export class StatusBarProvider implements vscode.Disposable {
  private item: vscode.StatusBarItem;
  private timer: NodeJS.Timeout | undefined;
  private sessionStart: number | null = null;
  private totalMs = 0;
  private disposables: vscode.Disposable[] = [];

  constructor() {
    this.item = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      1000,
    );
    this.item.command = 'timeAnalytics.showFileStats';
    this.item.show();

    // Sync with current focus state then listen for changes.
    if (vscode.window.state.focused) {
      this.startTimer();
    } else {
      this.updateText();
    }

    this.disposables.push(
      vscode.window.onDidChangeWindowState((state) => {
        if (state.focused) {
          this.startTimer();
        } else {
          this.stopTimer();
        }
      }),
    );
  }

  private startTimer() {
    if (this.timer) return;
    this.sessionStart = Date.now();
    this.timer = setInterval(() => this.tick(), 1000);
    this.tick();
  }

  private stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }

    if (this.sessionStart !== null) {
      this.totalMs += Date.now() - this.sessionStart;
      this.sessionStart = null;
    }

    this.updateText();
  }

  private tick() {
    const runningMs = this.sessionStart ? Date.now() - this.sessionStart : 0;
    this.updateText(this.totalMs + runningMs);
  }

  private updateText(totalMs: number = this.totalMs) {
    const totalSeconds = totalMs / 1000;
    this.item.text = `$(clock) Focus ${formatTime(totalSeconds)}`;
    this.item.tooltip = 'Time this window has stayed in focus';
  }

  dispose() {
    this.stopTimer();
    this.disposables.forEach((d) => d.dispose());
    this.item.dispose();
  }
}
