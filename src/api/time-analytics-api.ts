import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import {
  migrateToLatest,
  createEmptyLatest,
} from '../migrations/migration-runner';
import { FileVersion } from '../file-versions/version-finder';
import type { FileFormat_0_1_5 } from '../file-versions/0.1.5';
import { formatDay } from '../utils/time-utils';
import { parseBucketKey } from '../utils/bucket-utils';

// Alias the current latest version so we only change one import when bumping schema.
type LatestFileFormat = FileFormat_0_1_5;
type LatestBucketEntry = LatestFileFormat['buckets'][string];
type LatestDeleted = NonNullable<LatestFileFormat['deleted']>;

interface GlobalStats {
  active: number;
  idle: number;
}

export class TimeAnalyticsApi {
  private static readonly WORKSPACES_KEY = 'time-analytics.knownWorkspaces';
  private static readonly GLOBAL_STATS_KEY = 'time-analytics.globalStats';

  constructor(private readonly context: vscode.ExtensionContext) {
    this.registerWorkspace();
  }

  // -------- Workspace registration --------
  private registerWorkspace() {
    const folders = vscode.workspace.workspaceFolders;
    if (!folders) return;

    const known = this.context.globalState.get<string[]>(
      TimeAnalyticsApi.WORKSPACES_KEY,
      [],
    );
    let changed = false;

    for (const folder of folders) {
      if (!known.includes(folder.uri.fsPath)) {
        known.push(folder.uri.fsPath);
        changed = true;
      }
    }

    if (changed) {
      this.context.globalState.update(TimeAnalyticsApi.WORKSPACES_KEY, known);
    }
  }

  // -------- Public API --------

  public getGlobalStats(): GlobalStats {
    return this.context.globalState.get<GlobalStats>(
      TimeAnalyticsApi.GLOBAL_STATS_KEY,
      { active: 0, idle: 0 },
    );
  }

  public getProjectTotals(uri: vscode.Uri): { active: number; idle: number } {
    const data = this.readWorkspaceData(uri);
    return {
      active: data.project.totalActiveTime,
      idle: data.project.totalIdleTime,
    };
  }

  public getWorkspaceBuckets(
    uri: vscode.Uri,
  ): Record<string, LatestBucketEntry> {
    const data = this.readWorkspaceData(uri);
    return data.buckets;
  }

  public getDeletedStats(uri: vscode.Uri): LatestDeleted | undefined {
    const data = this.readWorkspaceData(uri);
    return data.deleted;
  }

  public getDocumentStats(
    document: vscode.TextDocument,
  ): LatestBucketEntry | undefined {
    const context = this.resolveDocumentContext(
      document.uri,
      formatDay(new Date()),
      null,
    );
    if (!context || !fs.existsSync(context.storagePath)) return undefined;

    const data = this.readFile(context.storagePath);
    return data.buckets[context.bucketKey];
  }

  public addDocumentDurations(
    filePath: string,
    dateKey: string,
    authIdentity: string | null,
    deltas: { activeDelta: number; idleDelta: number },
  ) {
    const context = this.resolveDocumentContext(
      vscode.Uri.file(filePath),
      dateKey,
      authIdentity,
    );
    if (!context) return;
    if (deltas.activeDelta <= 0 && deltas.idleDelta <= 0) return;

    this.addBucketDurations(context, deltas);
  }

  public addProjectIdle(workspaceUri: vscode.Uri, idleDelta: number) {
    if (idleDelta <= 0) return;
    const storagePath = this.getStoragePath(workspaceUri);

    const data = this.readFile(storagePath);
    data.project.totalIdleTime += idleDelta;
    this.writeFile(storagePath, data);
    this.updateGlobalStats(0, idleDelta);
  }

  public handleDocumentRename(oldUri: vscode.Uri, newUri: vscode.Uri) {
    const today = formatDay(new Date());
    const oldContext = this.resolveDocumentContext(oldUri, today, null);
    const newContext = this.resolveDocumentContext(newUri, today, null);
    if (!oldContext || !newContext) return;
    if (oldContext.storagePath !== newContext.storagePath) return;

    const data = this.readFile(oldContext.storagePath);
    let modified = false;

    if (data.buckets[oldContext.bucketKey]) {
      data.buckets[newContext.bucketKey] = data.buckets[oldContext.bucketKey];
      delete data.buckets[oldContext.bucketKey];
      modified = true;
    }

    const oldPrefix = `${oldContext.bucketKey}/`;
    const newPrefix = `${newContext.bucketKey}/`;

    for (const key of Object.keys(data.buckets)) {
      if (key.startsWith(oldPrefix)) {
        const newKey = newPrefix + key.substring(oldPrefix.length);
        data.buckets[newKey] = data.buckets[key];
        delete data.buckets[key];
        modified = true;
      }
    }

    if (modified) {
      this.writeFile(oldContext.storagePath, data);
    }
  }

  public handleDocumentDelete(uri: vscode.Uri) {
    const folder = vscode.workspace.getWorkspaceFolder(uri);
    if (!folder) return;

    const storagePath = this.getStoragePath(folder.uri);
    const relPath = path
      .relative(folder.uri.fsPath, uri.fsPath)
      .replace(/\\/g, '/');

    const data = this.readFile(storagePath);
    let modified = false;

    if (!data.deleted) {
      data.deleted = {};
    }

    const moveToDeleted = (dateKey: string, stats: LatestBucketEntry) => {
      const bin = data.deleted![dateKey] ?? { active: 0, idle: 0 };
      bin.active += stats.active;
      bin.idle += stats.idle;
      data.deleted![dateKey] = bin;
    };

    for (const key of Object.keys(data.buckets)) {
      const parsed = parseBucketKey(key);
      if (!parsed) continue;

      if (
        parsed.relPath === relPath ||
        parsed.relPath.startsWith(`${relPath}/`)
      ) {
        moveToDeleted(parsed.date, data.buckets[key]);
        delete data.buckets[key];
        modified = true;
      }
    }

    if (modified) {
      this.writeFile(storagePath, data);
    }
  }

  public ensureWorkspaceInitialized(uri: vscode.Uri) {
    const filePath = this.getStoragePath(uri);
    if (!filePath) return;
    if (!fs.existsSync(filePath)) {
      this.writeFile(filePath, createEmptyLatest());
    } else {
      // Reading will migrate and rewrite if needed.
      this.readFile(filePath);
    }
  }

  // -------- Internal helpers --------
  private updateGlobalStats(activeDelta: number, idleDelta: number) {
    const stats = this.context.globalState.get<GlobalStats>(
      TimeAnalyticsApi.GLOBAL_STATS_KEY,
      { active: 0, idle: 0 },
    );

    stats.active += activeDelta;
    stats.idle += idleDelta;

    this.context.globalState.update(TimeAnalyticsApi.GLOBAL_STATS_KEY, stats);
  }

  private addBucketDurations(
    context: { storagePath: string; bucketKey: string },
    deltas: { activeDelta: number; idleDelta: number },
  ) {
    const data = this.readFile(context.storagePath);

    if (!data.buckets[context.bucketKey]) {
      data.buckets[context.bucketKey] = { active: 0, idle: 0 };
    }

    data.buckets[context.bucketKey].active += deltas.activeDelta;
    data.buckets[context.bucketKey].idle += deltas.idleDelta;

    data.project.totalActiveTime += deltas.activeDelta;
    data.project.totalIdleTime += deltas.idleDelta;

    this.writeFile(context.storagePath, data);
    this.updateGlobalStats(deltas.activeDelta, deltas.idleDelta);
  }

  private resolveDocumentContext(
    uri: vscode.Uri,
    dateKey: string,
    authIdentity: string | null,
  ):
    | { workspaceUri: vscode.Uri; storagePath: string; bucketKey: string }
    | undefined {
    const folder = vscode.workspace.getWorkspaceFolder(uri);
    if (!folder) return undefined;

    const storagePath = this.getStoragePath(folder.uri);
    const bucketKey = this.toBucketKey(folder.uri, uri, dateKey, authIdentity);
    return { workspaceUri: folder.uri, storagePath, bucketKey };
  }

  private toBucketKey(
    workspaceUri: vscode.Uri,
    targetUri: vscode.Uri,
    dateKey: string,
    authIdentity: string | null,
  ): string {
    const migratedDate = '<Migrated Date>';
    const rel = path
      .relative(workspaceUri.fsPath, targetUri.fsPath)
      .replace(/\\/g, '/');
    const dayPart = dateKey || migratedDate;
    const authPart = authIdentity ?? 'null';
    return `${dayPart},${authPart},${rel}`;
  }

  private getStoragePath(workspaceUri: vscode.Uri): string {
    return path.join(workspaceUri.fsPath, '.vscode', 'time-analytics.json');
  }

  private readWorkspaceData(workspaceUri: vscode.Uri): LatestFileFormat {
    const storagePath = this.getStoragePath(workspaceUri);
    return this.readFile(storagePath);
  }

  private readFile(filePath: string): LatestFileFormat {
    let raw: unknown = createEmptyLatest();
    let needsWrite = false;

    if (fs.existsSync(filePath)) {
      try {
        raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (e) {
        console.error('Failed to parse analytics file', e);
        needsWrite = true;
      }
    } else {
      needsWrite = true;
    }

    const migrated = migrateToLatest(raw);
    if (
      needsWrite ||
      migrated.from !== FileVersion.V_0_1_5 ||
      migrated.to !== FileVersion.V_0_1_5
    ) {
      this.writeFile(filePath, migrated.data);
    }

    return migrated.data;
  }

  private writeFile(filePath: string, data: LatestFileFormat) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
}
