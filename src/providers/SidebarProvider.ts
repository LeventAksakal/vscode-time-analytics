import * as vscode from 'vscode';
import * as path from 'path';
import { DataManager } from '../managers/DataManager';
import { TimeManager } from '../managers/TimeManager';
import { formatTime } from '../utils/timeUtils';

interface AggregatedStats {
  active: number;
  focus: number;
  idle: number;
}

class FileTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly stats: AggregatedStats,
    public readonly resourceUri?: vscode.Uri,
    public readonly isRoot: boolean = false,
  ) {
    super(label, collapsibleState);
    this.description = `(Total: ${formatTime(
      stats.focus / 1000,
    )}, Active: ${formatTime(stats.active / 1000)}, Idle: ${formatTime(
      stats.idle / 1000,
    )})`;
    this.tooltip = `${label}\nTotal: ${formatTime(
      stats.focus / 1000,
    )}\nActive: ${formatTime(stats.active / 1000)}\nIdle: ${formatTime(
      stats.idle / 1000,
    )}`;

    if (isRoot) {
      this.iconPath = new vscode.ThemeIcon('globe');
    } else if (collapsibleState !== vscode.TreeItemCollapsibleState.None) {
      this.iconPath = vscode.ThemeIcon.Folder;
    } else {
      this.iconPath = vscode.ThemeIcon.File;
    }
  }
}

export class SidebarProvider implements vscode.TreeDataProvider<FileTreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<
    FileTreeItem | undefined | null | void
  > = new vscode.EventEmitter<FileTreeItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    FileTreeItem | undefined | null | void
  > = this._onDidChangeTreeData.event;

  private refreshInterval: NodeJS.Timeout | undefined;

  constructor(
    private dataManager: DataManager,
    private timeManager: TimeManager,
  ) {}

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  bindView(view: vscode.TreeView<FileTreeItem>) {
    view.onDidChangeVisibility((e) => {
      if (e.visible) {
        this.startAutoRefresh();
      } else {
        this.stopAutoRefresh();
      }
    });

    if (view.visible) {
      this.startAutoRefresh();
    }
  }

  private startAutoRefresh() {
    if (this.refreshInterval) return;
    this.refreshInterval = setInterval(() => this.refresh(), 1000);
  }

  private stopAutoRefresh() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = undefined;
    }
  }

  getTreeItem(element: FileTreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: FileTreeItem): Thenable<FileTreeItem[]> {
    if (!element) {
      const items: FileTreeItem[] = [];

      const globalStats = this.dataManager.getGlobalStats();
      const pendingTotal = this.timeManager.getTotalPendingStats();
      const pendingProjectFocus = this.timeManager.getPendingProjectFocus();

      const totalGlobalActive =
        globalStats.totalActiveTime + pendingTotal.active;
      const totalGlobalFocus = globalStats.totalFocusTime + pendingProjectFocus;
      const totalGlobalIdle = Math.max(0, totalGlobalFocus - totalGlobalActive);

      items.push(
        new FileTreeItem(
          'Global Stats (All Workspaces)',
          vscode.TreeItemCollapsibleState.None,
          {
            active: totalGlobalActive,
            focus: totalGlobalFocus,
            idle: totalGlobalIdle,
          },
          undefined,
          true,
        ),
      );

      if (
        vscode.workspace.workspaceFolders &&
        vscode.workspace.workspaceFolders.length > 0
      ) {
        const rootUri = vscode.workspace.workspaceFolders[0].uri;
        const rootName = rootUri.fsPath.split(path.sep).pop() || 'Workspace';

        const tree = this.buildWorkspaceTree(rootUri);
        const rootStats = tree._stats;

        items.push(
          new FileTreeItem(
            rootName,
            vscode.TreeItemCollapsibleState.Expanded,
            rootStats,
            rootUri,
            false,
          ),
        );

        const deletedStats = this.dataManager.getDeletedStats(rootUri);
        if (
          deletedStats &&
          (deletedStats.active > 0 || deletedStats.focus > 0)
        ) {
          const deletedIdle = Math.max(
            0,
            deletedStats.focus - deletedStats.active,
          );
          const deletedItem = new FileTreeItem(
            'Deleted Files',
            vscode.TreeItemCollapsibleState.None,
            {
              active: deletedStats.active,
              focus: deletedStats.focus,
              idle: deletedIdle,
            },
            undefined,
            false,
          );
          deletedItem.iconPath = new vscode.ThemeIcon('trash');
          items.push(deletedItem);
        }
      }

      return Promise.resolve(items);
    }

    if (
      vscode.workspace.workspaceFolders &&
      vscode.workspace.workspaceFolders.length > 0
    ) {
      const rootUri = vscode.workspace.workspaceFolders[0].uri;

      const tree = this.buildWorkspaceTree(rootUri);

      let node = tree;
      if (
        element.resourceUri &&
        element.resourceUri.fsPath !== rootUri.fsPath
      ) {
        const relPath = path
          .relative(rootUri.fsPath, element.resourceUri.fsPath)
          .replace(/\\/g, '/');
        node = this.findNode(tree, relPath.split('/'));
      }

      if (node) {
        // If we are at the root of the tree (which corresponds to the workspace folder),
        // we need to pass the root path.
        // If we are deeper, we pass the element's path.
        const parentPath = element.resourceUri
          ? element.resourceUri.fsPath
          : rootUri.fsPath;
        return Promise.resolve(this.getTreeItemsFromNode(node, parentPath));
      }
    }

    return Promise.resolve([]);
  }

  private buildWorkspaceTree(rootUri: vscode.Uri): any {
    const workspaceData = this.dataManager.getWorkspaceData(rootUri);
    const tree: any = {
      _stats: { active: 0, focus: 0, idle: 0 },
      _children: {},
    };
    const rootPath = rootUri.fsPath;

    for (const [relPath, stats] of Object.entries(workspaceData)) {
      this.addPathToTree(tree, relPath.split('/'), stats.focus, stats.pending);
    }

    const trackedPaths = this.timeManager.getTrackedPaths();
    for (const absPath of trackedPaths) {
      if (absPath.startsWith(rootPath)) {
        const relPath = path.relative(rootPath, absPath).replace(/\\/g, '/');
        if (relPath && !relPath.startsWith('..')) {
          const pending = this.timeManager.getPendingStats(absPath);
          this.addPathToTree(
            tree,
            relPath.split('/'),
            pending.focus,
            pending.active,
          );
        }
      }
    }

    return tree;
  }

  private addPathToTree(
    tree: any,
    parts: string[],
    focusToAdd: number,
    activeToAdd: number,
  ) {
    let current = tree;

    current._stats.focus += focusToAdd;
    current._stats.active += activeToAdd;
    current._stats.idle = Math.max(
      0,
      current._stats.focus - current._stats.active,
    );

    for (const part of parts) {
      if (!current._children[part]) {
        current._children[part] = {
          _stats: { active: 0, focus: 0, idle: 0 },
          _children: {},
        };
      }
      current = current._children[part];

      current._stats.focus += focusToAdd;
      current._stats.active += activeToAdd;
      current._stats.idle = Math.max(
        0,
        current._stats.focus - current._stats.active,
      );
    }
  }

  private findNode(tree: any, parts: string[]) {
    let current = tree;
    for (const part of parts) {
      if (!current._children[part]) return null;
      current = current._children[part];
    }
    return current;
  }

  private getTreeItemsFromNode(
    node: any,
    parentAbsPath: string,
  ): FileTreeItem[] {
    const items: FileTreeItem[] = [];

    for (const key of Object.keys(node._children)) {
      const childNode = node._children[key];
      const absPath = path.join(parentAbsPath, key);
      const hasChildren = Object.keys(childNode._children).length > 0;

      items.push(
        new FileTreeItem(
          key,
          hasChildren
            ? vscode.TreeItemCollapsibleState.Collapsed
            : vscode.TreeItemCollapsibleState.None,
          childNode._stats,
          vscode.Uri.file(absPath),
          false,
        ),
      );
    }

    return items.sort((a, b) => {
      const aIsFolder =
        a.collapsibleState !== vscode.TreeItemCollapsibleState.None;
      const bIsFolder =
        b.collapsibleState !== vscode.TreeItemCollapsibleState.None;

      if (aIsFolder && !bIsFolder) return -1;
      if (!aIsFolder && bIsFolder) return 1;

      return b.stats.focus - a.stats.focus;
    });
  }
}
