import * as vscode from 'vscode';
import * as path from 'path';
import { TimeAnalyticsApi } from '../api/time-analytics-api';
import { TimeTracker } from '../core/time-tracker';
import { formatTime } from '../utils/timeUtils';

interface AggregatedStats {
  active: number;
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
    const focus = stats.active + stats.idle;
    this.description = `(Total: ${formatTime(
      focus / 1000,
    )}, Active: ${formatTime(stats.active / 1000)}, Idle: ${formatTime(
      stats.idle / 1000,
    )})`;
    this.tooltip = `${label}\nTotal: ${formatTime(
      focus / 1000,
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

export class SidebarView implements vscode.TreeDataProvider<FileTreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<
    FileTreeItem | undefined | null | void
  > = new vscode.EventEmitter<FileTreeItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    FileTreeItem | undefined | null | void
  > = this._onDidChangeTreeData.event;

  private refreshInterval: NodeJS.Timeout | undefined;

  constructor(
    private api: TimeAnalyticsApi,
    private tracker: TimeTracker,
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

      const globalStats = this.api.getGlobalStats();
      const pendingTotal = this.tracker.getTotalPendingStats();
      const pendingProjectIdle = this.tracker.getPendingProjectIdle();

      const totalGlobalActive = globalStats.active + pendingTotal.active;
      const totalGlobalIdle =
        globalStats.idle + pendingTotal.idle + pendingProjectIdle;
      const totalGlobalFocus = totalGlobalActive + totalGlobalIdle;

      items.push(
        new FileTreeItem(
          'Global Stats (All Workspaces)',
          vscode.TreeItemCollapsibleState.None,
          {
            active: totalGlobalActive,
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

        const deletedStats = this.api.getDeletedStats(rootUri);
        if (
          deletedStats &&
          (deletedStats.active > 0 || deletedStats.idle > 0)
        ) {
          const deletedItem = new FileTreeItem(
            'Deleted Files',
            vscode.TreeItemCollapsibleState.None,
            {
              active: deletedStats.active,
              idle: deletedStats.idle,
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
        const parentPath = element.resourceUri
          ? element.resourceUri.fsPath
          : rootUri.fsPath;
        return Promise.resolve(this.getTreeItemsFromNode(node, parentPath));
      }
    }

    return Promise.resolve([]);
  }

  private buildWorkspaceTree(rootUri: vscode.Uri): any {
    const files = this.api.getWorkspaceData(rootUri);

    const tree: any = { _stats: { active: 0, idle: 0 }, children: {} };

    Object.entries(files).forEach(([filePath, stats]) => {
      const parts = filePath.split('/');
      let node = tree;

      parts.forEach((part, index) => {
        if (!node.children[part]) {
          node.children[part] = {
            _stats: { active: 0, idle: 0 },
            children: {},
          };
        }
        node = node.children[part];

        const isFile = index === parts.length - 1;
        node._stats.active += stats.active;
        node._stats.idle += stats.idle;

        if (isFile) {
          const pending = this.tracker.getPendingStats(
            path.join(rootUri.fsPath, filePath),
          );
          node._stats.active += pending.active;
          node._stats.idle += pending.idle;
        }
      });
    });

    return tree;
  }

  private findNode(node: any, parts: string[]): any {
    let current = node;
    for (const part of parts) {
      if (!current.children[part]) return null;
      current = current.children[part];
    }
    return current;
  }

  private getTreeItemsFromNode(node: any, parentPath: string): FileTreeItem[] {
    const items: FileTreeItem[] = [];

    // Direct files
    for (const [name, child] of Object.entries<any>(node.children)) {
      const childPath = path.join(parentPath, name);
      const resourceUri = vscode.Uri.file(childPath);

      if (Object.keys(child.children).length === 0) {
        items.push(
          new FileTreeItem(
            name,
            vscode.TreeItemCollapsibleState.None,
            child._stats,
            resourceUri,
            false,
          ),
        );
      }
    }

    // Folders
    for (const [name, child] of Object.entries<any>(node.children)) {
      if (Object.keys(child.children).length > 0) {
        const childPath = path.join(parentPath, name);
        const resourceUri = vscode.Uri.file(childPath);
        items.push(
          new FileTreeItem(
            name,
            vscode.TreeItemCollapsibleState.Collapsed,
            child._stats,
            resourceUri,
            false,
          ),
        );
      }
    }

    return items.sort((a, b) => a.label.localeCompare(b.label));
  }
}
