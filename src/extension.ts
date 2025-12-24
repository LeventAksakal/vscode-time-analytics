import * as vscode from 'vscode';
import { TimeAnalyticsApi } from './api/time-analytics-api';
import { BucketContext } from './core/bucket-context';
import { DocumentTracker } from './core/document-tracker';
import { TypingTracker } from './core/typing-tracker';
import { AuthTracker } from './core/auth-tracker';
import { StatusBarProvider } from './ui/statusbar-timer';
import { SidebarView } from './ui/sidebar-view';
import { formatTime } from './utils/time-utils';
import { AuthBadge } from './ui/auth-badge';

export function activate(context: vscode.ExtensionContext) {
  const api = new TimeAnalyticsApi(context);
  const bucketContext = new BucketContext(api);
  const documentTracker = new DocumentTracker(bucketContext);
  const typingTracker = new TypingTracker(bucketContext);
  const authTracker = new AuthTracker(bucketContext);
  const statusBar = new StatusBarProvider();
  const authBadge = new AuthBadge(authTracker);
  const sidebarProvider = new SidebarView(api, bucketContext);

  void authTracker.promptIfSignedOut();

  vscode.workspace.workspaceFolders?.forEach((folder) =>
    api.ensureWorkspaceInitialized(folder.uri),
  );

  const treeView = vscode.window.createTreeView('time-analytics-sidebar', {
    treeDataProvider: sidebarProvider,
  });
  sidebarProvider.bindView(treeView);

  const fileStatsCommand = vscode.commands.registerCommand(
    'timeAnalytics.showFileStats',
    async () => {
      bucketContext.flushNow();

      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage('Open a file to see stats');
        return;
      }

      const stats = api.getDocumentStats(editor.document);
      if (!stats) {
        vscode.window.showInformationMessage(
          'No stats available for this file yet',
        );
        return;
      }

      const active = stats.active;
      const idle = stats.idle;
      const focus = active + idle;

      const items = [
        {
          label: '$(pencil) Active Time',
          description: formatTime(active / 1000),
        },
        {
          label: '$(history) Idle Time',
          description: formatTime(idle / 1000),
        },
        {
          label: '$(clock) Total Time',
          description: formatTime(focus / 1000),
        },
      ];

      await vscode.window.showQuickPick(items, {
        placeHolder: `Stats for ${editor.document.fileName
          .split(/[\\/]/)
          .pop()}`,
      });
    },
  );

  const refreshCommand = vscode.commands.registerCommand(
    'timeAnalytics.refreshStats',
    () => {
      sidebarProvider.refresh();
    },
  );

  const signInCommand = vscode.commands.registerCommand(
    'timeAnalytics.signIn',
    async () => {
      if (authTracker.getUser()) {
        void vscode.window.showInformationMessage('Already signed in.');
        return;
      }
      await authTracker.promptSignIn();
    },
  );

  context.subscriptions.push(documentTracker);
  context.subscriptions.push(typingTracker);
  context.subscriptions.push(statusBar);
  context.subscriptions.push(authTracker);
  context.subscriptions.push(authBadge);
  context.subscriptions.push(fileStatsCommand);
  context.subscriptions.push(refreshCommand);
  context.subscriptions.push(signInCommand);

  context.subscriptions.push(
    vscode.workspace.onDidRenameFiles(async (e) => {
      for (const file of e.files) {
        api.handleDocumentRename(file.oldUri, file.newUri);
      }
    }),
  );

  context.subscriptions.push(
    vscode.workspace.onDidDeleteFiles(async (e) => {
      for (const uri of e.files) {
        api.handleDocumentDelete(uri);
      }
    }),
  );
}

export function deactivate() {}
