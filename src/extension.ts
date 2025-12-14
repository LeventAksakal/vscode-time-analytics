import * as vscode from 'vscode';
import { DataManager } from './managers/DataManager';
import { TimeManager } from './managers/TimeManager';
import { StatusBarProvider } from './providers/StatusBarProvider';
import { SidebarProvider } from './providers/SidebarProvider';
import { formatTime } from './utils/timeUtils';

export function activate(context: vscode.ExtensionContext) {
  const dataManager = new DataManager(context);

  const timeManager = new TimeManager(dataManager);
  const statusBar = new StatusBarProvider();
  const sidebarProvider = new SidebarProvider(dataManager, timeManager);

  const treeView = vscode.window.createTreeView('time-analytics-sidebar', {
    treeDataProvider: sidebarProvider,
  });
  sidebarProvider.bindView(treeView);

  const fileStatsCommand = vscode.commands.registerCommand(
    'timeAnalytics.showFileStats',
    async () => {
      timeManager.forceFlush();

      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage('Open a file to see stats');
        return;
      }

      const stats = dataManager.getFileStats(editor.document);
      if (!stats) {
        vscode.window.showInformationMessage(
          'No stats available for this file yet',
        );
        return;
      }

      const active = stats.active;
      const total = stats.focus;
      const idle = Math.max(0, total - active);

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
          description: formatTime(total / 1000),
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
      timeManager.forceFlush();
      sidebarProvider.refresh();
    },
  );

  context.subscriptions.push(timeManager);
  context.subscriptions.push(statusBar);
  context.subscriptions.push(fileStatsCommand);
  context.subscriptions.push(refreshCommand);

  context.subscriptions.push(
    vscode.workspace.onDidRenameFiles(async (e) => {
      for (const file of e.files) {
        await dataManager.handleFileRename(file.oldUri, file.newUri);
      }
      sidebarProvider.refresh();
    }),
  );

  context.subscriptions.push(
    vscode.workspace.onDidDeleteFiles(async (e) => {
      for (const uri of e.files) {
        timeManager.stopTracking(uri.fsPath);
        await dataManager.handleFileDelete(uri);
      }
      sidebarProvider.refresh();
    }),
  );
}

export function deactivate() {}
