import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

interface FileData {
  pending: number;
  focus: number;
}

interface AnalyticsData {
  version: string;
  project: {
    totalFocusTime: number;
    totalActiveTime?: number;
  };
  files: { [relativePath: string]: FileData };
  deleted?: {
    active: number;
    focus: number;
  };
}

export class DataManager {
  private static readonly WORKSPACES_KEY = 'time-analytics.knownWorkspaces';
  private static readonly GLOBAL_STATS_KEY = 'time-analytics.globalStats';

  constructor(private context: vscode.ExtensionContext) {
    this.registerWorkspace();
  }

  private registerWorkspace() {
    const folders = vscode.workspace.workspaceFolders;
    if (!folders) return;

    const knownWorkspaces = this.context.globalState.get<string[]>(
      DataManager.WORKSPACES_KEY,
      [],
    );
    let changed = false;

    folders.forEach((folder) => {
      if (!knownWorkspaces.includes(folder.uri.fsPath)) {
        knownWorkspaces.push(folder.uri.fsPath);
        changed = true;
      }
    });

    if (changed) {
      this.context.globalState.update(
        DataManager.WORKSPACES_KEY,
        knownWorkspaces,
      );
    }
  }

  public getGlobalStats(): { totalFocusTime: number; totalActiveTime: number } {
    const stats = this.context.globalState.get<{
      totalFocusTime: number;
      totalActiveTime: number;
    }>(DataManager.GLOBAL_STATS_KEY, { totalFocusTime: 0, totalActiveTime: 0 });
    return stats;
  }

  private updateGlobalStats(activeDelta: number, focusDelta: number) {
    const stats = this.context.globalState.get<{
      totalFocusTime: number;
      totalActiveTime: number;
    }>(DataManager.GLOBAL_STATS_KEY, { totalFocusTime: 0, totalActiveTime: 0 });

    stats.totalActiveTime += activeDelta;
    stats.totalFocusTime += focusDelta;

    this.context.globalState.update(DataManager.GLOBAL_STATS_KEY, stats);
  }

  public getProjectTotals(uri: vscode.Uri): { focus: number; active: number } {
    const filePath = this.getStoragePath(uri);
    if (!filePath || !fs.existsSync(filePath)) return { focus: 0, active: 0 };

    const data = this.loadData(filePath);
    let active = data.project?.totalActiveTime;

    if (active === undefined) {
      active = 0;
      Object.values(data.files).forEach((f) => (active! += f.pending));
    }

    return {
      focus: data.project?.totalFocusTime || 0,
      active: active,
    };
  }

  public getProjectStats(uri: vscode.Uri): {
    focusTime: number;
    activeTime: number;
  } {
    const filePath = this.getStoragePath(uri);
    if (!filePath || !fs.existsSync(filePath))
      return { focusTime: 0, activeTime: 0 };

    const data = this.loadData(filePath);
    let activeTime = 0;
    Object.values(data.files).forEach((f) => {
      activeTime += f.pending;
    });

    return {
      focusTime: data.project?.totalFocusTime || 0,
      activeTime,
    };
  }

  public getDeletedStats(
    uri: vscode.Uri,
  ): { active: number; focus: number } | undefined {
    const filePath = this.getStoragePath(uri);
    if (!filePath || !fs.existsSync(filePath)) return undefined;

    const data = this.loadData(filePath);
    return data.deleted;
  }

  public getWorkspaceData(uri: vscode.Uri): {
    [relativePath: string]: FileData;
  } {
    const filePath = this.getStoragePath(uri);
    if (!filePath || !fs.existsSync(filePath)) return {};

    const data = this.loadData(filePath);
    return data.files;
  }

  public getFileStats(
    document: vscode.TextDocument,
  ): { active: number; focus: number } | undefined {
    const filePath = this.getStoragePath(document.uri);
    const relativePath = this.getRelativePath(document.uri);

    if (!filePath || !relativePath || !fs.existsSync(filePath))
      return undefined;

    const data = this.loadData(filePath);
    const fileData = data.files[relativePath];

    if (!fileData) return undefined;

    return { active: fileData.pending, focus: fileData.focus || 0 };
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

  private loadData(filePath: string): AnalyticsData {
    if (fs.existsSync(filePath)) {
      try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (e) {
        console.error('Failed to parse analytics file', e);
      }
    }
    return { version: '1.0', project: { totalFocusTime: 0 }, files: {} };
  }

  private saveData(filePath: string, data: AnalyticsData) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  public async updateProjectFocusTime(uri: vscode.Uri, durationMs: number) {
    const filePath = this.getStoragePath(uri);
    if (!filePath) return;

    const data = this.loadData(filePath);
    if (!data.project) data.project = { totalFocusTime: 0 };

    data.project.totalFocusTime += durationMs;
    this.saveData(filePath, data);

    this.updateGlobalStats(0, durationMs);
  }

  public async updateDuration(
    document: vscode.TextDocument,
    durationMs: number,
  ) {
    const filePath = this.getStoragePath(document.uri);
    if (!filePath) return;

    const relativePath = this.getRelativePath(document.uri);
    if (!relativePath) return;

    const data = this.loadData(filePath);

    if (!data.files[relativePath]) {
      data.files[relativePath] = { pending: 0, focus: 0 };
    }

    data.files[relativePath].pending += durationMs;

    if (!data.project) data.project = { totalFocusTime: 0 };
    if (data.project.totalActiveTime === undefined) {
      let sumActive = 0;
      Object.values(data.files).forEach((f) => (sumActive += f.pending));

      data.project.totalActiveTime = sumActive;
    } else {
      data.project.totalActiveTime += durationMs;
    }

    this.saveData(filePath, data);

    this.updateGlobalStats(durationMs, 0);
  }

  public async updateFileFocusTime(
    document: vscode.TextDocument,
    durationMs: number,
  ) {
    const filePath = this.getStoragePath(document.uri);
    if (!filePath) return;

    const relativePath = this.getRelativePath(document.uri);
    if (!relativePath) return;

    const data = this.loadData(filePath);

    if (!data.files[relativePath]) {
      data.files[relativePath] = { pending: 0, focus: 0 };
    }

    if (data.files[relativePath].focus === undefined) {
      data.files[relativePath].focus = 0;
    }

    data.files[relativePath].focus += durationMs;

    this.saveData(filePath, data);
  }

  public async handleFileRename(oldUri: vscode.Uri, newUri: vscode.Uri) {
    const filePath = this.getStoragePath(oldUri);
    if (!filePath || !fs.existsSync(filePath)) return;

    const oldRelPath = this.getRelativePath(oldUri);
    const newRelPath = this.getRelativePath(newUri);

    if (!oldRelPath || !newRelPath) return;

    const data = this.loadData(filePath);
    let modified = false;

    if (data.files[oldRelPath]) {
      data.files[newRelPath] = data.files[oldRelPath];
      delete data.files[oldRelPath];
      modified = true;
    }

    const oldPrefix = oldRelPath + '/';
    const newPrefix = newRelPath + '/';

    for (const key of Object.keys(data.files)) {
      if (key.startsWith(oldPrefix)) {
        const newKey = newPrefix + key.substring(oldPrefix.length);
        data.files[newKey] = data.files[key];
        delete data.files[key];
        modified = true;
      }
    }

    if (modified) {
      this.saveData(filePath, data);
    }
  }

  public async handleFileDelete(uri: vscode.Uri) {
    const filePath = this.getStoragePath(uri);
    if (!filePath || !fs.existsSync(filePath)) return;

    const relPath = this.getRelativePath(uri);
    if (!relPath) return;

    const data = this.loadData(filePath);
    let modified = false;

    if (!data.deleted) {
      data.deleted = { active: 0, focus: 0 };
    }

    const moveToDeleted = (fileData: FileData) => {
      if (data.deleted) {
        data.deleted.active += fileData.pending;
        data.deleted.focus += fileData.focus || 0;
      }
    };

    if (data.files[relPath]) {
      moveToDeleted(data.files[relPath]);
      delete data.files[relPath];
      modified = true;
    }

    const prefix = relPath + '/';
    for (const key of Object.keys(data.files)) {
      if (key.startsWith(prefix)) {
        moveToDeleted(data.files[key]);
        delete data.files[key];
        modified = true;
      }
    }

    if (modified) {
      this.saveData(filePath, data);
    }
  }
}
