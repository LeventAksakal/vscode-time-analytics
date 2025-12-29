import * as vscode from 'vscode';
import { BucketContext } from './bucket-context';

export interface AuthUser {
  providerId: string;
  username: string;
  accountId: string;
  label: string;
}

export class AuthTracker implements vscode.Disposable {
  private disposables: vscode.Disposable[] = [];
  private currentUser: AuthUser | null = null;
  private readonly onDidChangeUserEmitter =
    new vscode.EventEmitter<AuthUser | null>();
  readonly onDidChangeUser = this.onDidChangeUserEmitter.event;

  private lastRefresh: Promise<void> = Promise.resolve();

  constructor(
    private readonly buckets: BucketContext,
    private readonly providerId: string = 'github',
  ) {
    this.disposables.push(
      vscode.authentication.onDidChangeSessions(async (e) => {
        if (e.provider.id === this.providerId) {
          await this.refreshSession(true);
        }
      }),
    );

    this.lastRefresh = this.refreshSession(true);
  }

  getUser(): AuthUser | null {
    return this.currentUser;
  }

  async promptSignIn() {
    if (this.currentUser) return;
    const choice = await vscode.window.showInformationMessage(
      'Sign in to GitHub to attribute your time data.',
      'Sign in',
      'Later',
    );
    if (choice === 'Sign in') {
      await this.refreshSession(false);
    }
  }

  async promptIfSignedOut() {
    await this.lastRefresh;
    if (!this.currentUser) {
      await this.promptSignIn();
    }
  }

  private async refreshSession(silent: boolean) {
    try {
      const session = await vscode.authentication.getSession(
        this.providerId,
        ['user:email'],
        { createIfNone: !silent, silent },
      );

      console.log(
        `[time-analytics] auth refresh (silent=${silent}) session=${session ? `${session.account.label} (${session.account.id})` : 'none'}`,
      );

      const nextUser = session
        ? {
            providerId: this.providerId,
            username: session.account.label,
            accountId: session.account.id,
            label: session.account.label,
          }
        : null;

      this.updateUser(nextUser);
    } catch (err) {
      console.log(
        `[time-analytics] auth refresh failed (silent=${silent}):`,
        err,
      );
      if (!silent) {
        void vscode.window.showErrorMessage(
          'GitHub sign-in failed. You can try again later.',
        );
      }
      this.updateUser(null);
    }
  }

  private updateUser(user: AuthUser | null) {
    if (
      this.currentUser?.providerId === user?.providerId &&
      this.currentUser?.accountId === user?.accountId &&
      this.currentUser?.label === user?.label
    ) {
      return;
    }
    console.log(
      '[time-analytics] auth user update',
      user ? `${user.username} (${user.accountId})` : 'signed out',
    );
    this.currentUser = user;
    this.onDidChangeUserEmitter.fire(user);
    this.buckets.updateContext({ authUser: user }, Date.now());
  }

  dispose() {
    this.onDidChangeUserEmitter.dispose();
    this.disposables.forEach((d) => d.dispose());
  }
}
