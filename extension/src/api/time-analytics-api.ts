import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import {
  migrateToLatest,
  createEmptyLatest,
} from '../migrations/migration-runner';
import { FileVersion } from '../file-versions/version-finder';
import type { FileFormat_0_1_6 } from '../file-versions/0.1.6';
import { formatDay } from '../utils/time-utils';
import { parseBucketKey } from '../utils/bucket-utils';

const NO_BRANCH = 'null';

// Alias the current latest version so we only change one import when bumping schema.
type LatestFileFormat = FileFormat_0_1_6;
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

  getWorkspaceState(uri: vscode.Uri): LatestFileFormat {
    return this.readWorkspaceData(uri);
  }

  public getDocumentStats(
    document: vscode.TextDocument,
  ): LatestBucketEntry | undefined {
    const context = this.resolveDocumentContext(
      document.uri,
      formatDay(new Date()),
      NO_BRANCH,
      null,
    );
    if (!context || !fs.existsSync(context.storagePath)) return undefined;

    const data = this.readFile(context.storagePath);
    return data.buckets[context.bucketKey];
  }

  public addDocumentDurations(
    filePath: string,
    dateKey: string,
    gitBranch: string,
    authIdentity: string | null,
    deltas: { activeDelta: number; idleDelta: number },
  ) {
    const normalized = filePath.replace(/\\/g, '/');
    if (normalized.includes('/.git/')) return;

    const context = this.resolveDocumentContext(
      vscode.Uri.file(filePath),
      dateKey,
      gitBranch,
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

  public collapseRepository(workspaceUri: vscode.Uri, repoRoot: vscode.Uri) {
    const storagePath = this.getStoragePath(workspaceUri);
    const data = this.readFile(storagePath);
    const workspaceFs = workspaceUri.fsPath.replace(/\\/g, '/');
    const repoRootFs = repoRoot.fsPath.replace(/\\/g, '/');
    const repoRootRel = path
      .relative(workspaceFs, repoRootFs)
      .replace(/\\/g, '/');
    const repoPrefix = repoRootRel === '' ? '' : `${repoRootRel}/`;

    let modified = false;

    for (const key of Object.keys(data.buckets)) {
      const parsed = parseBucketKey(key);
      if (!parsed) continue;

      const inRepo =
        repoRootRel === '' ||
        parsed.relPath === repoRootRel ||
        parsed.relPath.startsWith(repoPrefix);

      if (!inRepo) continue;

      const bucket = data.buckets[key];
      const commitTotals = bucket.commits
        ? Object.values(bucket.commits).reduce(
            (acc, c) => {
              acc.active += c.active;
              acc.idle += c.idle;
              return acc;
            },
            { active: 0, idle: 0 },
          )
        : { active: 0, idle: 0 };

      const stagingActive = bucket.active + commitTotals.active;
      const stagingIdle = bucket.idle + commitTotals.idle;

      const targetKey = `${parsed.date},${parsed.auth},null,${parsed.relPath}`;

      if (targetKey === key) {
        bucket.active = stagingActive;
        bucket.idle = stagingIdle;
        if (bucket.commits) delete bucket.commits;
        modified = true;
        continue;
      }

      const target = data.buckets[targetKey] ?? { active: 0, idle: 0 };
      target.active += stagingActive;
      target.idle += stagingIdle;
      data.buckets[targetKey] = target;

      delete data.buckets[key];
      modified = true;
    }

    if (modified) {
      this.writeFile(storagePath, data);
    }
  }

  public finalizeCommit(
    workspaceUri: vscode.Uri,
    repoRoot: vscode.Uri,
    branch: string,
    commitHash: string,
  ) {
    const storagePath = this.getStoragePath(workspaceUri);
    const data = this.readFile(storagePath);
    let modified = false;

    const repoRootFs = repoRoot.fsPath.replace(/\\/g, '/');
    const workspaceFs = workspaceUri.fsPath.replace(/\\/g, '/');

    for (const key of Object.keys(data.buckets)) {
      const parsed = parseBucketKey(key);
      if (!parsed) continue;
      if (parsed.branch !== branch && parsed.branch !== 'null') continue;

      const absPath = `${workspaceFs}/${parsed.relPath}`;
      // Ensure the file is inside the repository root.
      if (
        !absPath.startsWith(
          repoRootFs.endsWith('/') ? repoRootFs : `${repoRootFs}/`,
        )
      ) {
        continue;
      }

      const bucket = data.buckets[key];
      const targetKey = `${parsed.date},${parsed.auth},${branch},${parsed.relPath}`;

      const target = data.buckets[targetKey] ?? { active: 0, idle: 0 };

      const mergedCommits: Record<string, { active: number; idle: number }> = {
        ...(target.commits ?? {}),
        ...(bucket.commits ?? {}),
      };

      if (bucket.active !== 0 || bucket.idle !== 0) {
        const stats = mergedCommits[commitHash] ?? { active: 0, idle: 0 };
        stats.active += bucket.active;
        stats.idle += bucket.idle;
        mergedCommits[commitHash] = stats;
      }

      target.commits = Object.keys(mergedCommits).length
        ? mergedCommits
        : undefined;

      // Staging moves to commits; keep any existing staging in target as-is.
      bucket.active = 0;
      bucket.idle = 0;

      data.buckets[targetKey] = target;
      if (targetKey !== key) {
        delete data.buckets[key];
      }

      modified = true;
    }

    if (modified) {
      this.writeFile(storagePath, data);
    }
  }

  public transferBranchStaging(
    workspaceUri: vscode.Uri,
    fromBranch: string,
    toBranch: string,
  ) {
    if (fromBranch === toBranch) return;
    const storagePath = this.getStoragePath(workspaceUri);
    const data = this.readFile(storagePath);
    let modified = false;

    for (const key of Object.keys(data.buckets)) {
      const parsed = parseBucketKey(key);
      if (!parsed) continue;
      if (parsed.branch !== fromBranch) continue;

      const bucket = data.buckets[key];
      if (bucket.active === 0 && bucket.idle === 0) {
        continue;
      }

      const targetKey = `${parsed.date},${parsed.auth},${toBranch},${parsed.relPath}`;
      const target = data.buckets[targetKey] ?? { active: 0, idle: 0 };

      target.active += bucket.active;
      target.idle += bucket.idle;

      bucket.active = 0;
      bucket.idle = 0;

      data.buckets[targetKey] = target;
      if (targetKey !== key) {
        data.buckets[key] = bucket;
      }

      modified = true;
    }

    if (modified) {
      this.writeFile(storagePath, data);
    }
  }

  public handleDocumentRename(oldUri: vscode.Uri, newUri: vscode.Uri) {
    const folder = vscode.workspace.getWorkspaceFolder(newUri);
    if (!folder) return;

    const storagePath = this.getStoragePath(folder.uri);
    const oldRel = path
      .relative(folder.uri.fsPath, oldUri.fsPath)
      .replace(/\\/g, '/');
    const newRel = path
      .relative(folder.uri.fsPath, newUri.fsPath)
      .replace(/\\/g, '/');

    const data = this.readFile(storagePath);
    let modified = false;

    for (const key of Object.keys(data.buckets)) {
      const parsed = parseBucketKey(key);
      if (!parsed) continue;
      if (
        parsed.relPath === oldRel ||
        parsed.relPath.startsWith(`${oldRel}/`)
      ) {
        const suffix = parsed.relPath.substring(oldRel.length);
        const updatedRel = `${newRel}${suffix}`;
        const newKey = `${parsed.date},${parsed.auth},${parsed.branch},${updatedRel}`;
        data.buckets[newKey] = data.buckets[key];
        delete data.buckets[key];
        modified = true;
      }
    }

    if (modified) {
      this.writeFile(storagePath, data);
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

  // Legacy entry point used by activation; delegates to setupTimeAnalytics.
  public ensureWorkspaceInitialized(uri: vscode.Uri) {
    this.setupTimeAnalytics(uri);
  }

  public setupTimeAnalytics(uri: vscode.Uri) {
    const filePath = this.getStoragePath(uri);
    if (!filePath) return;
    if (!fs.existsSync(filePath)) {
      this.writeFile(filePath, createEmptyLatest());
    } else {
      // Reading will migrate and rewrite if needed.
      this.readFile(filePath);
    }

    this.ensureGitignore(uri);
  }

  public removeTimeAnalytics(uri: vscode.Uri) {
    const filePath = this.getStoragePath(uri);
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (e) {
      console.error('Failed to remove time analytics file', e);
    }

    this.removeGitignoreEntry(uri);
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
    gitBranch: string,
    authIdentity: string | null,
  ):
    | { workspaceUri: vscode.Uri; storagePath: string; bucketKey: string }
    | undefined {
    const folder = vscode.workspace.getWorkspaceFolder(uri);
    if (!folder) return undefined;

    const storagePath = this.getStoragePath(folder.uri);
    const bucketKey = this.toBucketKey(
      folder.uri,
      uri,
      dateKey,
      gitBranch,
      authIdentity,
    );
    return { workspaceUri: folder.uri, storagePath, bucketKey };
  }

  private toBucketKey(
    workspaceUri: vscode.Uri,
    targetUri: vscode.Uri,
    dateKey: string,
    gitBranch: string,
    authIdentity: string | null,
  ): string {
    const migratedDate = '<Migrated Date>';
    const rel = path
      .relative(workspaceUri.fsPath, targetUri.fsPath)
      .replace(/\\/g, '/');
    const dayPart = dateKey || migratedDate;
    const authPart = authIdentity ?? 'null';
    const branchPart = gitBranch || 'null';
    return `${dayPart},${authPart},${branchPart},${rel}`;
  }

  private getStoragePath(workspaceUri: vscode.Uri): string {
    return path.join(workspaceUri.fsPath, '.vscode', 'time-analytics.json');
  }

  private ensureGitignore(workspaceUri: vscode.Uri) {
    const gitDir = path.join(workspaceUri.fsPath, '.git');
    if (!fs.existsSync(gitDir)) return;

    const gitignorePath = path.join(workspaceUri.fsPath, '.gitignore');
    const entry = '.vscode/time-analytics.json';

    let lines: string[] = [];
    if (fs.existsSync(gitignorePath)) {
      try {
        lines = fs.readFileSync(gitignorePath, 'utf8').split(/\r?\n/);
      } catch (e) {
        console.error('Failed to read .gitignore', e);
        return;
      }
      if (lines.some((line) => line.trim() === entry)) {
        return;
      }
    }

    const needsNewline =
      lines.length > 0 && lines[lines.length - 1].trim() !== '';
    if (needsNewline) {
      lines.push('');
    }
    lines.push(entry);

    try {
      fs.writeFileSync(gitignorePath, lines.join('\n'));
    } catch (e) {
      console.error('Failed to update .gitignore', e);
    }
  }

  private removeGitignoreEntry(workspaceUri: vscode.Uri) {
    const gitDir = path.join(workspaceUri.fsPath, '.git');
    if (!fs.existsSync(gitDir)) return;

    const gitignorePath = path.join(workspaceUri.fsPath, '.gitignore');
    const entry = '.vscode/time-analytics.json';
    if (!fs.existsSync(gitignorePath)) return;

    try {
      const lines = fs.readFileSync(gitignorePath, 'utf8').split(/\r?\n/);
      const filtered = lines.filter((line) => line.trim() !== entry);
      if (filtered.length === lines.length) return;
      fs.writeFileSync(gitignorePath, filtered.join('\n'));
    } catch (e) {
      console.error('Failed to clean .gitignore', e);
    }
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
      migrated.from !== FileVersion.V_0_1_6 ||
      migrated.to !== FileVersion.V_0_1_6
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
