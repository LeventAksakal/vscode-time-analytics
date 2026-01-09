import * as vscode from 'vscode';
import type { API as GitApi, GitExtension, Repository } from '../types/git';
import { BucketContext } from './bucket-context';

const NO_BRANCH = 'null';

export class GitTracker implements vscode.Disposable {
  private disposables: vscode.Disposable[] = [];
  private git: GitApi | undefined;
  private watched = new WeakSet<Repository>();
  private branches = new Map<string, string>();

  constructor(private readonly buckets: BucketContext) {
    this.initPromise = this.init();
  }

  private initPromise: Promise<void>;

  async waitForInitialSync() {
    return this.initPromise;
  }

  private async init() {
    const ext = vscode.extensions.getExtension<GitExtension>('vscode.git');
    if (!ext) return;

    try {
      if (!ext.isActive) {
        await ext.activate();
      }
      const api: GitApi | undefined = ext.exports?.getAPI?.(1);
      if (!api) return;
      this.git = api;

      this.syncAll();

      this.disposables.push(
        api.onDidOpenRepository(() => this.syncAll()),
        api.onDidCloseRepository((repo) => this.handleRepoClosed(repo)),
        vscode.window.onDidChangeActiveTextEditor(() => this.syncActive()),
      );

      for (const repo of api.repositories) {
        this.watchRepo(repo);
      }
    } catch (err) {
      console.log('[time-analytics] git tracker init failed', err);
    }
  }

  private watchRepo(repo: Repository) {
    if (this.watched.has(repo)) return;
    this.watched.add(repo);
    this.disposables.push(
      repo.onDidCommit(() => this.handleCommit(repo)),
      repo.onDidCheckout(() => this.handleCheckout(repo)),
      repo.state.onDidChange(() => {
        this.syncRepo(repo);
      }),
    );
    this.syncRepo(repo);
  }

  private handleCheckout(repo: Repository) {
    const repoKey = repo.rootUri.fsPath;
    const prevBranch = this.branches.get(repoKey) ?? NO_BRANCH;
    const head = repo.state.HEAD;
    const nextBranch = head?.name ?? NO_BRANCH;

    if (prevBranch !== nextBranch && this.isDirty(repo)) {
      this.buckets.transferBranchStaging(prevBranch, nextBranch, repo.rootUri);
    }

    this.syncRepo(repo);
  }

  private handleCommit(repo: Repository) {
    const head = repo.state.HEAD;
    const branch = head?.name ?? NO_BRANCH;
    const commit = head?.commit;
    if (!commit) {
      this.syncRepo(repo);
      return;
    }

    const repoRoot = repo.rootUri;
    const workspace = vscode.workspace.getWorkspaceFolder(repoRoot);
    if (workspace) {
      this.buckets.finalizeCommit(repoRoot, branch, commit);
    }

    this.syncRepo(repo);
  }

  private handleRepoClosed(repo: Repository) {
    this.buckets.collapseRepository(repo.rootUri);
    this.syncAll();
  }

  private syncAll() {
    if (!this.git) return;
    for (const repo of this.git.repositories) {
      this.watchRepo(repo);
    }
    this.syncActive();
  }

  private syncRepo(repo: Repository) {
    // If the active editor belongs to this repo, prefer its HEAD; otherwise just refresh overall context.
    this.syncActive(repo);
  }

  private syncActive(preferredRepo?: Repository) {
    if (!this.git) return;
    const editor = vscode.window.activeTextEditor;
    const targetUri = editor?.document.uri;

    let repo = preferredRepo;
    if (!repo && targetUri) {
      repo = this.git.getRepository(targetUri) ?? undefined;
    }

    if (!repo) {
      repo = this.git.repositories[0];
    }

    if (!repo) {
      this.buckets.updateContext(
        { gitBranch: NO_BRANCH, gitCommit: null },
        Date.now(),
      );
      return;
    }

    const head = repo.state.HEAD;
    const branch = head?.name ?? NO_BRANCH;
    const commit = head?.commit ?? null;
    this.branches.set(repo.rootUri.fsPath, branch);
    this.buckets.updateContext(
      { gitBranch: branch, gitCommit: commit },
      Date.now(),
    );
  }

  private isDirty(repo: Repository) {
    const state = repo.state;
    return (
      state.workingTreeChanges.length > 0 ||
      state.indexChanges.length > 0 ||
      state.mergeChanges.length > 0
    );
  }

  dispose() {
    this.disposables.forEach((d) => d.dispose());
  }
}
