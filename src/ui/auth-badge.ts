import * as vscode from 'vscode';
import { AuthTracker } from '../core/auth-tracker';

/**
 * Persistent badge to re-trigger sign-in if the initial prompt was missed.
 */
export class AuthBadge implements vscode.Disposable {
  private readonly item: vscode.StatusBarItem;
  private readonly disposables: vscode.Disposable[] = [];

  constructor(private readonly auth: AuthTracker) {
    this.item = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      2000,
    );
    this.item.command = 'timeAnalytics.signIn';

    this.disposables.push(this.auth.onDidChangeUser(() => this.refresh()));

    this.refresh();
    this.item.show();
  }

  private refresh() {
    const user = this.auth.getUser();
    if (user) {
      this.item.text = `$(account) ${user.label}`;
      this.item.tooltip = 'Signed in to GitHub';
    } else {
      this.item.text = '$(account) Sign in';
      this.item.tooltip =
        'Sign in to GitHub to attribute your time data (click to sign in)';
    }
  }

  dispose() {
    this.item.dispose();
    this.disposables.forEach((d) => d.dispose());
  }
}
