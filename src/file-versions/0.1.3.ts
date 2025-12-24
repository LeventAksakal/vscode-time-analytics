import { FileVersion } from './version-finder';

export interface FileFormat_0_1_3 {
  version: string;
  project: {
    totalIdleTime: number;
    totalActiveTime: number;
  };
  buckets: BucketsMap_0_1_3;
  deleted?: Deleted_0_1_3;
}

export function is0_1_3(file: unknown): file is FileFormat_0_1_3 {
  if (typeof file !== 'object' || file === null) return false;

  const candidate = file as Partial<FileFormat_0_1_3>;

  if (candidate.version !== FileVersion.V_0_1_3) return false;

  const project = candidate.project as FileFormat_0_1_3['project'] | undefined;
  if (
    !project ||
    typeof project.totalIdleTime !== 'number' ||
    typeof project.totalActiveTime !== 'number'
  ) {
    return false;
  }

  if (typeof candidate.buckets !== 'object' || candidate.buckets === null) {
    return false;
  }

  return true;
}

export interface BucketEntry_0_1_3 {
  active: number;
  idle: number;
}

export type BucketsMap_0_1_3 = Record<string, BucketEntry_0_1_3>;

export interface Deleted_0_1_3 {
  active: number;
  idle: number;
}
