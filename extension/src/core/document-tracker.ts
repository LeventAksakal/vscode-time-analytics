import * as vscode from 'vscode';
import { BucketContext } from './bucket-context';

export class DocumentTracker implements vscode.Disposable {
  private disposables: vscode.Disposable[] = [];

  constructor(private readonly buckets: BucketContext) {
    // Moved listener registration to start() to allow waiting for Auth/Git
  }

  start() {
    this.registerListeners();
    // Catch-up if editor was already open
    this.captureVisibleEditors(vscode.window.visibleTextEditors);
  }

  private registerListeners() {
    this.disposables.push(
      vscode.window.onDidChangeVisibleTextEditors((editors) =>
        this.onVisibleEditorsChange(editors),
      ),
    );
    this.disposables.push(
      vscode.window.onDidChangeActiveTextEditor(() =>
        this.captureVisibleEditors(vscode.window.visibleTextEditors),
      ),
    );
    this.disposables.push(
      vscode.window.onDidChangeWindowState((e) => {
        if (!e.focused) {
          this.buckets.updateContext({
            inFocusFiles: new Set(),
            activity: { kind: 'IDLE' },
          });
        }
      }),
    );
  }

  private onVisibleEditorsChange(editors: readonly vscode.TextEditor[]) {
    this.captureVisibleEditors(editors);
  }

  private captureVisibleEditors(editors: readonly vscode.TextEditor[]) {
    const next = new Set<string>();
    for (const editor of editors) {
      if (editor.document.uri.scheme !== 'file') continue;
      const fsPath = editor.document.fileName;
      if (fsPath.endsWith('time-analytics.json')) continue;
      next.add(fsPath);
    }
    this.buckets.updateContext({ inFocusFiles: next });
  }

  dispose() {
    this.buckets.updateContext({
      inFocusFiles: new Set(),
      activity: { kind: 'IDLE' },
    });
    this.disposables.forEach((d) => d.dispose());
  }
}
