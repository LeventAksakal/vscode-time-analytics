import * as vscode from 'vscode';
import { BucketContext } from './bucket-context';

// Debounce before marking typing as idle; acts as a grace period after the last change.
const TYPING_IDLE_DEBOUNCE_MS = 500;

type ActivityState = { kind: 'IDLE' } | { kind: 'ACTIVE'; filePath: string };

export class TypingTracker implements vscode.Disposable {
  private disposables: vscode.Disposable[] = [];
  private resetTimer: NodeJS.Timeout | undefined;
  private activity: ActivityState = { kind: 'IDLE' };

  constructor(private readonly buckets: BucketContext) {
    this.disposables.push(
      vscode.workspace.onDidChangeTextDocument((e) => this.onTextChange(e)),
    );
  }

  private onTextChange(event: vscode.TextDocumentChangeEvent) {
    if (event.document.uri.scheme !== 'file') return;
    const fsPath = event.document.fileName;
    if (fsPath.endsWith('time-analytics.json')) return;

    const now = Date.now();
    const nextActivity: ActivityState = { kind: 'ACTIVE', filePath: fsPath };
    if (!this.isSameActivity(this.activity, nextActivity)) {
      this.activity = nextActivity;
      this.buckets.updateContext({ activity: nextActivity }, now);
    }

    if (this.resetTimer) clearTimeout(this.resetTimer);
    this.resetTimer = setTimeout(() => {
      const idleTs = Math.max(0, Date.now() - TYPING_IDLE_DEBOUNCE_MS);
      const idle: ActivityState = { kind: 'IDLE' };
      if (!this.isSameActivity(this.activity, idle)) {
        this.activity = idle;
        this.buckets.updateContext({ activity: idle }, idleTs);
      }
    }, TYPING_IDLE_DEBOUNCE_MS);
  }

  dispose() {
    if (this.resetTimer) clearTimeout(this.resetTimer);
    const idle: ActivityState = { kind: 'IDLE' };
    if (!this.isSameActivity(this.activity, idle)) {
      this.buckets.updateContext({ activity: idle }, Date.now());
      this.activity = idle;
    }
    this.disposables.forEach((d) => d.dispose());
  }

  private isSameActivity(a: ActivityState, b: ActivityState): boolean {
    if (a.kind !== b.kind) return false;
    if (a.kind === 'IDLE') return true;
    return (
      a.filePath === (b as Extract<ActivityState, { kind: 'ACTIVE' }>).filePath
    );
  }
}
