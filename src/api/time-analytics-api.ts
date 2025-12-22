import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import {
  migrateToLatest,
  createEmptyLatest,
} from '../migrations/migration-runner';
import { FileVersion } from '../file-versions/version-finder';
import type {
  FileFormat_0_1_2,
  FileEntry_0_1_2,
  Deleted_0_1_2,
} from '../file-versions/0.1.2';

// Alias the current latest version so we only change one import when bumping schema.
type LatestFileFormat = FileFormat_0_1_2;
type LatestFileEntry = FileEntry_0_1_2;
type LatestDeleted = Deleted_0_1_2;

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

  public getWorkspaceData(uri: vscode.Uri): Record<string, LatestFileEntry> {
    const data = this.readWorkspaceData(uri);
    return data.files;
  }

  public getDeletedStats(uri: vscode.Uri): LatestDeleted | undefined {
    const data = this.readWorkspaceData(uri);
    return data.deleted;
  }

  public getFileStats(
    document: vscode.TextDocument,
  ): LatestFileEntry | undefined {
    const filePath = this.getStoragePath(document.uri);
    const relative = this.getRelativePath(document.uri);
    if (!filePath || !relative || !fs.existsSync(filePath)) return undefined;

    const data = this.readFile(filePath);
    return data.files[relative];
  }

  public addFileDurations(
    document: vscode.TextDocument,
    deltas: { activeDelta: number; idleDelta: number },
  ) {
    const filePath = this.getStoragePath(document.uri);
    const relative = this.getRelativePath(document.uri);
    if (!filePath || !relative) return;

    const data = this.readFile(filePath);

    if (!data.files[relative]) {
      data.files[relative] = { active: 0, idle: 0 };
    }

    data.files[relative].active += deltas.activeDelta;
    data.files[relative].idle += deltas.idleDelta;

    data.project.totalActiveTime += deltas.activeDelta;
    data.project.totalIdleTime += deltas.idleDelta;

    this.writeFile(filePath, data);
    this.updateGlobalStats(deltas.activeDelta, deltas.idleDelta);
  }

  public addProjectIdle(uri: vscode.Uri, idleDelta: number) {
    if (idleDelta <= 0) return;
    const filePath = this.getStoragePath(uri);
    if (!filePath) return;

    const data = this.readFile(filePath);
    data.project.totalIdleTime += idleDelta;
    this.writeFile(filePath, data);
    this.updateGlobalStats(0, idleDelta);
  }

  public handleFileRename(oldUri: vscode.Uri, newUri: vscode.Uri) {
    const filePath = this.getStoragePath(oldUri);
    if (!filePath || !fs.existsSync(filePath)) return;

    const oldRel = this.getRelativePath(oldUri);
    const newRel = this.getRelativePath(newUri);
    if (!oldRel || !newRel) return;

    const data = this.readFile(filePath);
    let modified = false;

    if (data.files[oldRel]) {
      data.files[newRel] = data.files[oldRel];
      delete data.files[oldRel];
      modified = true;
    }

    const oldPrefix = `${oldRel}/`;
    const newPrefix = `${newRel}/`;

    for (const key of Object.keys(data.files)) {
      if (key.startsWith(oldPrefix)) {
        const newKey = newPrefix + key.substring(oldPrefix.length);
        data.files[newKey] = data.files[key];
        delete data.files[key];
        modified = true;
      }
    }

    if (modified) {
      this.writeFile(filePath, data);
    }
  }

  public handleFileDelete(uri: vscode.Uri) {
    const filePath = this.getStoragePath(uri);
    if (!filePath || !fs.existsSync(filePath)) return;

    const relPath = this.getRelativePath(uri);
    if (!relPath) return;

    const data = this.readFile(filePath);
    let modified = false;

    if (!data.deleted) {
      data.deleted = { active: 0, idle: 0 };
    }

    const moveToDeleted = (stats: LatestFileEntry) => {
      if (!data.deleted) return;
      data.deleted.active += stats.active;
      data.deleted.idle += stats.idle;
    };

    if (data.files[relPath]) {
      moveToDeleted(data.files[relPath]);
      delete data.files[relPath];
      modified = true;
    }

    const prefix = `${relPath}/`;
    for (const key of Object.keys(data.files)) {
      if (key.startsWith(prefix)) {
        moveToDeleted(data.files[key]);
        delete data.files[key];
        modified = true;
      }
    }

    if (modified) {
      this.writeFile(filePath, data);
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

  private getStoragePath(uri: vscode.Uri): string | undefined {
    const folder = vscode.workspace.getWorkspaceFolder(uri);
    return folder
      ? path.join(folder.uri.fsPath, '.vscode', 'time-analytics.json')
      : undefined;
  }

  private getRelativePath(uri: vscode.Uri): string | undefined {
    const folder = vscode.workspace.getWorkspaceFolder(uri);
    return folder
      ? path.relative(folder.uri.fsPath, uri.fsPath).replace(/\\/g, '/')
      : undefined;
  }

  private readWorkspaceData(uri: vscode.Uri): LatestFileFormat {
    const filePath = this.getStoragePath(uri);
    if (!filePath) return createEmptyLatest();
    return this.readFile(filePath);
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
      migrated.from !== FileVersion.V_0_1_2 ||
      migrated.to !== FileVersion.V_0_1_2
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
