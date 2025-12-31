import * as vscode from 'vscode';
import * as path from 'path';
import { TimeAnalyticsApi } from '../api/time-analytics-api';
import { BucketContext } from '../core/bucket-context';

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

  public openDashboard() {
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

    this.panel.webview.html = this.getWebviewContent();

    // Handle messages from the webview
    this.panel.webview.onDidReceiveMessage(
      async (message) => {
        await this.handleMessage(message);
      },
      undefined,
      this.context.subscriptions,
    );

    // Clean up when panel is closed
    this.panel.onDidDispose(
      () => {
        this.panel = undefined;
      },
      null,
      this.context.subscriptions,
    );

    // Send initial data
    this.sendInitialData();
  }

  private getWebviewContent(): string {
    const webviewUri = this.panel!.webview;
    const webviewPath = vscode.Uri.joinPath(this.extensionUri, 'webview-ui');

    // Convert file paths to webview URIs
    const indexHtml = vscode.Uri.joinPath(webviewPath, 'index.html');
    const cssUri = webviewUri.asWebviewUri(
      vscode.Uri.joinPath(webviewPath, 'assets', 'index-B25io0Jl.css'),
    );
    const jsUri = webviewUri.asWebviewUri(
      vscode.Uri.joinPath(webviewPath, 'assets', 'index-YO2220ZM.js'),
    );

    // Read and modify the built HTML
    const fs = require('fs');
    let html = fs.readFileSync(indexHtml.fsPath, 'utf8');

    // Replace asset paths with webview URIs
    html = html.replace(/\/assets\/index-B25io0Jl\.css/g, cssUri.toString());
    html = html.replace(/\/assets\/index-YO2220ZM\.js/g, jsUri.toString());

    return html;
  }

  private async handleMessage(message: any) {
    switch (message.type) {
      case 'requestInitialData':
        await this.sendInitialData();
        break;

      case 'requestWorkspaceData':
        await this.sendWorkspaceData();
        break;

      case 'requestGlobalStats':
        await this.sendGlobalStats();
        break;

      case 'refreshData':
        this.bucketContext.flushNow();
        await this.sendInitialData();
        break;

      default:
        console.log('Unknown message type:', message.type);
    }
  }

  private async sendInitialData() {
    if (!this.panel) return;

    try {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        this.panel.webview.postMessage({
          type: 'initialData',
          data: { error: 'No workspace folders found' },
        });
        return;
      }

      // Get data for the first workspace (you can extend this for multi-workspace)
      const workspaceUri = workspaceFolders[0].uri;
      const projectTotals = this.api.getProjectTotals(workspaceUri);
      const buckets = this.api.getWorkspaceBuckets(workspaceUri);
      const globalStats = this.api.getGlobalStats();

      this.panel.webview.postMessage({
        type: 'initialData',
        data: {
          projectTotals,
          buckets,
          globalStats,
          workspaceName: path.basename(workspaceUri.fsPath),
        },
      });
    } catch (error) {
      this.panel.webview.postMessage({
        type: 'initialData',
        data: {
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
    }
  }

  private async sendWorkspaceData() {
    if (!this.panel) return;

    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) return;

    const workspaceUri = workspaceFolders[0].uri;
    const buckets = this.api.getWorkspaceBuckets(workspaceUri);

    this.panel.webview.postMessage({
      type: 'workspaceData',
      data: { buckets },
    });
  }

  private async sendGlobalStats() {
    if (!this.panel) return;

    const globalStats = this.api.getGlobalStats();

    this.panel.webview.postMessage({
      type: 'globalStats',
      data: { globalStats },
    });
  }
}
