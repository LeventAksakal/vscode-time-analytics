import * as vscode from 'vscode';
import * as path from 'path';
import { TimeAnalyticsApi } from '../api/time-analytics-api';
import { BucketContext } from '../core/bucket-context';
import { formatTime } from '../utils/time-utils';
import { parseBucketKey } from '../utils/bucket-utils';

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

export class SidebarView implements vscode.TreeDataProvider<vscode.TreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<
    vscode.TreeItem | undefined | null | void
  > = new vscode.EventEmitter<vscode.TreeItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    vscode.TreeItem | undefined | null | void
  > = this._onDidChangeTreeData.event;

  private refreshInterval: NodeJS.Timeout | undefined;

  constructor(
    private api: TimeAnalyticsApi,
    private buckets: BucketContext,
  ) {}

  refresh(): void {
    this.buckets.flushNow();
    this._onDidChangeTreeData.fire();
  }

  bindView(view: vscode.TreeView<vscode.TreeItem>) {
    view.onDidChangeVisibility((e) => {
      if (e.visible) {
        this.refresh();
        this.startAutoRefresh();
      } else {
        this.stopAutoRefresh();
      }
    });

    if (view.visible) {
      this.refresh();
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

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: FileTreeItem): Thenable<vscode.TreeItem[]> {
    if (!element) {
      const items: vscode.TreeItem[] = [];

      // 0. Dashboard Button
      const dashboardItem = new vscode.TreeItem(
        'Open Dashboard',
        vscode.TreeItemCollapsibleState.None,
      );
      dashboardItem.contextValue = 'dashboardButton';
      dashboardItem.iconPath = new vscode.ThemeIcon('graph');
      dashboardItem.command = {
        command: 'timeAnalytics.openDashboard',
        title: 'Open Dashboard',
      };
      // Make it look primary-ish (using description or just being top)
      dashboardItem.description = 'Analyze your time';
      items.push(dashboardItem);

      const globalStats = this.api.getGlobalStats();
      const totalGlobalActive = globalStats.active;
      const totalGlobalIdle = globalStats.idle;
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

        const deletedStats = this.api.getDeletedStats(rootUri);
        const deletedTotals = { active: 0, idle: 0 };
        if (deletedStats) {
          for (const value of Object.values(deletedStats)) {
            deletedTotals.active += value.active;
            deletedTotals.idle += value.idle;
          }
          rootStats.active += deletedTotals.active;
          rootStats.idle += deletedTotals.idle;
        }

        items.push(
          new FileTreeItem(
            rootName,
            vscode.TreeItemCollapsibleState.Expanded,
            rootStats,
            rootUri,
            false,
          ),
        );
        if (deletedTotals.active > 0 || deletedTotals.idle > 0) {
          const deletedItem = new FileTreeItem(
            'Deleted Files',
            vscode.TreeItemCollapsibleState.None,
            {
              active: deletedTotals.active,
              idle: deletedTotals.idle,
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
    const buckets = this.api.getWorkspaceBuckets(rootUri);

    const tree: any = { _stats: { active: 0, idle: 0 }, children: {} };

    const addToNode = (node: any, stats: AggregatedStats) => {
      node._stats.active += stats.active;
      node._stats.idle += stats.idle;
    };

    Object.entries(buckets).forEach(([bucketPath, stats]) => {
      const parsed = parseBucketKey(bucketPath);
      if (!parsed) return;
      const parts = parsed.relPath.split('/');
      let node = tree;

      // Always aggregate into root for every bucket.
      addToNode(node, stats);

      parts.forEach((part, index) => {
        if (!node.children[part]) {
          node.children[part] = {
            _stats: { active: 0, idle: 0 },
            children: {},
          };
        }
        node = node.children[part];

        addToNode(node, stats);
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
