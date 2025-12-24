import { FileVersion } from './version-finder';

export interface FileFormat_0_1_4 {
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
  deleted?: {
    active: number;
    idle: number;
  };
}

export function is0_1_4(file: unknown): file is FileFormat_0_1_4 {
  if (typeof file !== 'object' || file === null) return false;

  const candidate = file as Partial<FileFormat_0_1_4>;
  if (candidate.version !== FileVersion.V_0_1_4) return false;

  const project = candidate.project as FileFormat_0_1_4['project'] | undefined;
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
