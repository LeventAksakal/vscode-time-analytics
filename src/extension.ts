import * as vscode from 'vscode';
import { TimeAnalyticsApi } from './api/time-analytics-api';
import { TimeTracker } from './core/time-tracker';
import { StatusBarProvider } from './ui/StatusBarProvider';
import { SidebarView } from './ui/SidebarView';
import { formatTime } from './utils/timeUtils';

export function activate(context: vscode.ExtensionContext) {
  const api = new TimeAnalyticsApi(context);
  const tracker = new TimeTracker(api);
  const statusBar = new StatusBarProvider(api, tracker);
  const sidebarProvider = new SidebarView(api, tracker);

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
      tracker.forceFlush();

      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage('Open a file to see stats');
        return;
      }

      const stats = api.getFileStats(editor.document);
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
      tracker.forceFlush();
      sidebarProvider.refresh();
    },
  );

  context.subscriptions.push(tracker);
  context.subscriptions.push(statusBar);
  context.subscriptions.push(fileStatsCommand);
  context.subscriptions.push(refreshCommand);

  context.subscriptions.push(
    vscode.workspace.onDidRenameFiles(async (e) => {
      for (const file of e.files) {
        tracker.stopTracking(file.oldUri.fsPath);
        tracker.forceFlush();
        api.handleFileRename(file.oldUri, file.newUri);
      }
      sidebarProvider.refresh();
    }),
  );

  context.subscriptions.push(
    vscode.workspace.onDidDeleteFiles(async (e) => {
      for (const uri of e.files) {
        tracker.stopTracking(uri.fsPath);
        tracker.forceFlush();
        api.handleFileDelete(uri);
      }
      sidebarProvider.refresh();
    }),
  );
}

export function deactivate() {}
