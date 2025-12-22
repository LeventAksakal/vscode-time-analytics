import { FileVersion } from './version-finder';

export interface FileFormat_0_1_2 {
  version: string;
  project: {
    totalIdleTime: number;
    totalActiveTime: number;
  };
  files: FilesMap_0_1_2;
  deleted?: Deleted_0_1_2;
}

export function is0_1_2(file: unknown): file is FileFormat_0_1_2 {
  if (typeof file !== 'object' || file === null) return false;

  const candidate = file as Partial<FileFormat_0_1_2>;

  if (candidate.version !== FileVersion.V_0_1_2) return false;

  const project = candidate.project as FileFormat_0_1_2['project'] | undefined;
  if (
    !project ||
    typeof project.totalIdleTime !== 'number' ||
    typeof project.totalActiveTime !== 'number'
  ) {
    return false;
  }

  if (typeof candidate.files !== 'object' || candidate.files === null)
    return false;

  return true;
}

export interface FileEntry_0_1_2 {
  active: number;
  idle: number;
}

export type FilesMap_0_1_2 = Record<string, FileEntry_0_1_2>;

export interface Deleted_0_1_2 {
  active: number;
  idle: number;
}
