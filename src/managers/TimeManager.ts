import * as vscode from 'vscode';
import { DataManager } from './DataManager';

export class TimeManager implements vscode.Disposable {
  private disposables: vscode.Disposable[] = [];
  private debounceTimer: NodeJS.Timeout | undefined;

  private fileStates: Map<
    string,
    { startTime: number; state: 'IDLE' | 'TYPING' }
  > = new Map();

  private lastWindowFocusTime: number = Date.now();

  constructor(private dataManager: DataManager) {
    this.registerListeners();

    if (vscode.window.state.focused) {
      this.updateVisibleFiles(vscode.window.visibleTextEditors);
    }
  }

  public forceFlush() {
    const now = Date.now();

    for (const [fsPath, stateData] of this.fileStates) {
      this.flushFile(fsPath, stateData, now);
      stateData.startTime = now;
    }

    if (vscode.window.state.focused) {
      this.recordWindowFocus(now);
      this.lastWindowFocusTime = now;
    }
  }

  public stopTracking(fsPath: string) {
    if (this.fileStates.has(fsPath)) {
      this.fileStates.delete(fsPath);
    }
  }

  public getPendingStats(fsPath: string): { active: number; focus: number } {
    const stateData = this.fileStates.get(fsPath);
    if (!stateData) return { active: 0, focus: 0 };

    const now = Date.now();
    const duration = now - stateData.startTime;

    return {
      active: stateData.state === 'TYPING' ? duration : 0,
      focus: duration,
    };
  }

  public getTrackedPaths(): string[] {
    return Array.from(this.fileStates.keys());
  }

  public getTotalPendingStats(): { active: number; focus: number } {
    let totalActive = 0;
    let totalFocus = 0;
    const now = Date.now();

    for (const stateData of this.fileStates.values()) {
      const duration = now - stateData.startTime;
      totalFocus += duration;
      if (stateData.state === 'TYPING') {
        totalActive += duration;
      }
    }
    return { active: totalActive, focus: totalFocus };
  }

  public getPendingProjectFocus(): number {
    if (vscode.window.state.focused) {
      return Date.now() - this.lastWindowFocusTime;
    }
    return 0;
  }

  private registerListeners() {
    this.disposables.push(
      vscode.workspace.onDidChangeTextDocument((e) => this.onTextChange(e)),
    );

    this.disposables.push(
      vscode.window.onDidChangeWindowState((e) => this.onWindowStateChange(e)),
    );

    this.disposables.push(
      vscode.window.onDidChangeVisibleTextEditors((editors) =>
        this.onVisibleEditorsChange(editors),
      ),
    );
  }

  private onWindowStateChange(state: vscode.WindowState) {
    const now = Date.now();
    if (state.focused) {
      this.lastWindowFocusTime = now;
      this.updateVisibleFiles(vscode.window.visibleTextEditors);
    } else {
      this.recordWindowFocus(now);
      this.stopAllTracking(now);
    }
  }

  private onVisibleEditorsChange(editors: readonly vscode.TextEditor[]) {
    if (vscode.window.state.focused) {
      this.updateVisibleFiles(editors);
    }
  }

  private updateVisibleFiles(editors: readonly vscode.TextEditor[]) {
    const currentPaths = new Set<string>();
    const now = Date.now();

    for (const editor of editors) {
      if (editor.document.uri.scheme === 'file') {
        const fsPath = editor.document.fileName;

        if (fsPath.endsWith('time-analytics.json')) continue;

        currentPaths.add(fsPath);

        if (!this.fileStates.has(fsPath)) {
          this.fileStates.set(fsPath, { startTime: now, state: 'IDLE' });
        }
      }
    }

    for (const [path, stateData] of this.fileStates) {
      if (!currentPaths.has(path)) {
        this.flushFile(path, stateData, now);
        this.fileStates.delete(path);
      }
    }
  }

  private stopAllTracking(now: number) {
    for (const [path, stateData] of this.fileStates) {
      this.flushFile(path, stateData, now);
    }
    this.fileStates.clear();
  }

  private flushFile(
    fsPath: string,
    stateData: { startTime: number; state: 'IDLE' | 'TYPING' },
    now: number,
  ) {
    const duration = now - stateData.startTime;
    if (duration <= 0) return;

    const uri = vscode.Uri.file(fsPath);
    const doc =
      vscode.workspace.textDocuments.find((d) => d.fileName === fsPath) ||
      ({ uri } as vscode.TextDocument);

    this.dataManager.updateFileFocusTime(doc, duration);

    if (stateData.state === 'TYPING') {
      this.dataManager.updateDuration(doc, duration);
    }
  }

  private recordWindowFocus(now: number) {
    const duration = now - this.lastWindowFocusTime;

    if (
      duration > 0 &&
      vscode.workspace.workspaceFolders &&
      vscode.workspace.workspaceFolders.length > 0
    ) {
      this.dataManager.updateProjectFocusTime(
        vscode.workspace.workspaceFolders[0].uri,
        duration,
      );
    }
  }

  private onTextChange(event: vscode.TextDocumentChangeEvent) {
    if (event.document.uri.scheme !== 'file') return;
    const fsPath = event.document.fileName;
    if (fsPath.endsWith('time-analytics.json')) return;

    const now = Date.now();
    let stateData = this.fileStates.get(fsPath);

    if (!stateData) {
      stateData = { startTime: now, state: 'IDLE' };
      this.fileStates.set(fsPath, stateData);
    }

    if (stateData.state === 'IDLE') {
      this.flushFile(fsPath, stateData, now);
      stateData.state = 'TYPING';
      stateData.startTime = now;
    }

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      const endNow = Date.now();
      const currentData = this.fileStates.get(fsPath);
      if (currentData && currentData.state === 'TYPING') {
        this.flushFile(fsPath, currentData, endNow);
        currentData.state = 'IDLE';
        currentData.startTime = endNow;
      }
    }, 500);
  }

  dispose() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    const now = Date.now();
    this.recordWindowFocus(now);
    this.stopAllTracking(now);
    this.disposables.forEach((d) => d.dispose());
  }
}
