import * as vscode from 'vscode';
import { TimeAnalyticsApi } from '../api/time-analytics-api';

type Activity = { kind: 'IDLE' } | { kind: 'ACTIVE'; filePath: string };

interface ContextState {
  inFocusFiles: Set<string>;
  activity: Activity;
  lastTs: number | null;
}

export class BucketContext implements vscode.Disposable {
  private state: ContextState = {
    inFocusFiles: new Set(),
    activity: { kind: 'IDLE' },
    lastTs: null,
  };

  constructor(private readonly api: TimeAnalyticsApi) {}

  flushNow(now: number = Date.now()) {
    this.flush(now);
  }

  updateContext(partial: Partial<ContextState>, now: number = Date.now()) {
    this.flush(now);

    if (partial.inFocusFiles) {
      this.state.inFocusFiles = new Set(partial.inFocusFiles);
    }
    if (partial.activity) {
      this.state.activity = partial.activity;
    }
    this.state.lastTs = now;
  }

  private flush(now: number) {
    const { lastTs, inFocusFiles, activity } = this.state;
    if (lastTs === null) {
      this.state.lastTs = now;
      return;
    }

    const delta = Math.max(0, now - lastTs);
    if (delta === 0 || inFocusFiles.size === 0) {
      this.state.lastTs = now;
      return;
    }

    if (activity.kind === 'ACTIVE') {
      const target = activity.filePath;
      if (inFocusFiles.has(target)) {
        this.writeDelta(target, { active: delta, idle: 0 });
        this.state.lastTs = now;
        return;
      }
    }

    const share = delta / inFocusFiles.size;
    for (const filePath of inFocusFiles) {
      this.writeDelta(filePath, { active: 0, idle: share });
    }

    this.state.lastTs = now;
  }

  private writeDelta(
    filePath: string,
    deltas: { active: number; idle: number },
  ) {
    this.api.addDocumentDurations(filePath, {
      activeDelta: deltas.active,
      idleDelta: deltas.idle,
    });
  }

  dispose() {
    this.flush(Date.now());
  }
}
