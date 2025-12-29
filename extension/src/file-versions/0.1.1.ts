import { FileVersion } from './version-finder';

export interface FileFormat_0_1_1 {
  version: string;
  project: {
    totalFocusTime: number;
    totalActiveTime: number;
  };
  files: Record<
    string,
    {
      pending: number;
      focus: number;
    }
  >;
  deleted?: {
    active: number;
    focus: number;
  };
}

export function is0_1_1(file: unknown): file is FileFormat_0_1_1 {
  if (typeof file !== 'object' || file === null) return false;

  const candidate = file as Partial<FileFormat_0_1_1>;

  if (candidate.version !== FileVersion.V_0_1_1) return false;

  const project = candidate.project as FileFormat_0_1_1['project'] | undefined;
  if (
    !project ||
    typeof project.totalFocusTime !== 'number' ||
    typeof project.totalActiveTime !== 'number'
  ) {
    return false;
  }

  if (typeof candidate.files !== 'object' || candidate.files === null)
    return false;

  return true;
}
