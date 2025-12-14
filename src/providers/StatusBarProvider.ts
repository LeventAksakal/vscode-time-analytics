import * as vscode from 'vscode';
import { formatTime } from '../utils/timeUtils';

export class StatusBarProvider implements vscode.Disposable {
  private item: vscode.StatusBarItem;
  private timer: NodeJS.Timeout;
  private seconds = 0;

  constructor() {
    this.item = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      1000,
    );
    this.item.show();
    this.update();
    this.timer = setInterval(() => this.update(), 1000);
  }

  private update() {
    this.seconds++;
    this.item.text = `$(clock) ${formatTime(this.seconds)}`;
    this.item.tooltip = 'Time spent in this session';
  }

  dispose() {
    clearInterval(this.timer);
    this.item.dispose();
  }
}
