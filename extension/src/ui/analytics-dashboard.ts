import * as vscode from 'vscode';
import * as path from 'path';
import { getWebviewContent } from '../utils/webview-content';
import { TimeAnalyticsApi } from '../api/time-analytics-api';
import { BucketContext } from '../core/bucket-context';
import { BackendMessages, ClientMessages } from '../types/messages';

export class AnalyticsDashboardProvider {
  public static readonly viewType = 'timeAnalyticsDashboard';

  private panel: vscode.WebviewPanel | undefined;
  private readonly extensionUri: vscode.Uri;

  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly api: TimeAnalyticsApi,
    private readonly bucketContext: BucketContext,
  ) {
    this.extensionUri = context.extensionUri;
  }

  public async openDashboard() {
    if (this.panel) {
      this.panel.reveal(vscode.ViewColumn.One);
      return;
    }

    this.panel = vscode.window.createWebviewPanel(
      AnalyticsDashboardProvider.viewType,
      'Time Analytics Dashboard',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.joinPath(this.extensionUri, 'webview-ui'),
        ],
      },
    );

    try {
      this.panel.webview.html = await getWebviewContent(
        this.panel.webview,
        this.extensionUri,
        'webview-ui/index.html',
      );
    } catch (e) {
      console.error('[AnalyticsDashboard] Failed to load webview content', e);
      this.panel.webview.html = `<h1>Error loading dashboard</h1><p>${e}</p>`;
    }

    this.panel.webview.onDidReceiveMessage(
      async (message: ClientMessages) => {
        console.log('[Extension] Received message:', message);
        await this.#handleMessage(message);
      },
      undefined,
      this.context.subscriptions,
    );

    this.panel.onDidDispose(
      () => {
        this.panel = undefined;
      },
      null,
      this.context.subscriptions,
    );

    this.#sendInitialData();
  }

  async #handleMessage(message: ClientMessages) {
    switch (message.type) {
      case 'webviewBoot':
        break;
      case 'requestInitialData':
        await this.#sendInitialData();
        break;

      case 'requestWorkspaceData':
        await this.#sendWorkspaceData();
        break;

      case 'requestGlobalStats':
        await this.#sendGlobalStats();
        break;

      case 'refreshData':
        this.bucketContext.flushNow();
        await this.#sendInitialData();
        break;

      case 'getUserStats':
      case 'getFileStats':
      case 'getInitialState':
        console.log('Unimplemented');
        break;
    }
  }

  #postMessage(message: BackendMessages) {
    console.log('[Extension] Sending message:', message.type);
    this.panel?.webview.postMessage(message);
  }

  async #sendInitialData() {
    if (!this.panel) return;

    // Ensure any pending data is written to disk before reading
    this.bucketContext.flushNow();

    try {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        // Case 3: No Workspace Open
        // We cannot track project-specific stats, but we can show global stats.
        const globalStats = this.api.getGlobalStats();
        this.#postMessage({
          type: 'globalStats',
          stats: globalStats,
        });
        return;
      }

      // Case 1 & 2: Workspace Open
      const workspaceUri = workspaceFolders[0].uri;
      const projectTotals = this.api.getProjectTotals(workspaceUri);
      const buckets = this.api.getWorkspaceBuckets(workspaceUri);
      const globalStats = this.api.getGlobalStats();

      this.#postMessage({
        type: 'initialData',
        data: {
          projectTotals,
          buckets,
          globalStats,
          workspaceName: path.basename(workspaceUri.fsPath),
        },
      });
    } catch (error) {
      this.#postMessage({
        type: 'error',
        reason: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async #sendWorkspaceData() {
    if (!this.panel) return;

    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) return;

    const workspaceUri = workspaceFolders[0].uri;
    const buckets = this.api.getWorkspaceBuckets(workspaceUri);

    this.#postMessage({
      type: 'workspaceData',
      data: { buckets },
    });
  }

  async #sendGlobalStats() {
    if (!this.panel) return;

    const globalStats = this.api.getGlobalStats();

    this.#postMessage({
      type: 'globalStats',
      stats: globalStats,
    });
  }
}
