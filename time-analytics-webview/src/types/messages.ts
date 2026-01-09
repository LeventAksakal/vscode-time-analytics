import type { BucketKey, TimeAnalyticsFileSchema } from './file-format';

export type ClientMessages =
  | { type: 'getUserStats'; userId: string }
  | { type: 'getFileStats'; filePath: string }
  | { type: 'getInitialState' }
  | { type: 'webviewBoot' }
  | { type: 'requestInitialData' }
  | { type: 'requestWorkspaceData' }
  | { type: 'requestGlobalStats' }
  | { type: 'refreshData' }
  | { type: 'updateConfig'; config: { key: string; value: any } }
  | { type: 'addToGitignore' }
  | { type: 'exportData' }
  | { type: 'clearData' };

export interface InitialData {
  projectTotals: { active: number; idle: number };
  buckets: Record<string, any>;
  globalStats: { active: number; idle: number };
  workspaceName: string;
  error?: string;
}

export type BackendMessages =
  | { type: 'updateBucket'; bucketKey: BucketKey; value: string }
  | { type: 'newBucket'; bucketKey: BucketKey; value: string }
  | { type: 'deleteBucket'; bucketKey: BucketKey }
  | { type: 'initialState'; state: TimeAnalyticsFileSchema }
  | { type: 'initialData'; data: InitialData }
  | { type: 'workspaceData'; data: { buckets: Record<string, any> } }
  | { type: 'globalStats'; stats: { active: number; idle: number } }
  | { type: 'error'; reason: string };
