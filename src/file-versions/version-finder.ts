import { is0_1_1, type FileFormat_0_1_1 } from './0.1.1';
import { is0_1_2, type FileFormat_0_1_2 } from './0.1.2';
import { is0_1_3, type FileFormat_0_1_3 } from './0.1.3';

export enum FileVersion {
  V_0_1_1 = '1.0',
  V_0_1_2 = '0.1.2',
  V_0_1_3 = '0.1.3',
  Unknown = 'unknown',
}

export type AnyFileFormat =
  | FileFormat_0_1_1
  | FileFormat_0_1_2
  | FileFormat_0_1_3;

export function findFileVersion(file: unknown): FileVersion {
  if (is0_1_3(file)) return FileVersion.V_0_1_3;
  if (is0_1_2(file)) return FileVersion.V_0_1_2;
  if (is0_1_1(file)) return FileVersion.V_0_1_1;
  return FileVersion.Unknown;
}
