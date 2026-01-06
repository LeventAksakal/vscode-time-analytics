export type BucketKey = `${string},${string},${string},${string}`;

export interface TimeAnalyticsFileSchema {
  version: string;
  project: {
    totalIdleTime: number;
    totalActiveTime: number;
  };
  buckets: Record<
    BucketKey,
    {
      active: number;
      idle: number;
      commits?: Record<string, { active: number; idle: number }>;
    }
  >;
  deleted?: Record<
    string,
    {
      active: number;
      idle: number;
    }
  >;
}
