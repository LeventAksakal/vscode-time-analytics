import { FileVersion } from './version-finder';

export interface FileFormat_0_1_5 {
  version: string;
  project: {
    totalIdleTime: number;
    totalActiveTime: number;
  };
  buckets: Record<
    string,
    {
      active: number;
      idle: number;
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

export function is0_1_5(file: unknown): file is FileFormat_0_1_5 {
  if (typeof file !== 'object' || file === null) return false;

  const candidate = file as Partial<FileFormat_0_1_5>;
  if (candidate.version !== FileVersion.V_0_1_5) return false;

  const project = candidate.project as FileFormat_0_1_5['project'] | undefined;
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

  if (candidate.deleted !== undefined) {
    if (typeof candidate.deleted !== 'object' || candidate.deleted === null) {
      return false;
    }
  }

  return true;
}
