import { type FileFormat_0_1_1 } from '../file-versions/0.1.1';
import { type FileFormat_0_1_2 } from '../file-versions/0.1.2';
import { FileVersion } from '../file-versions/version-finder';

export function migrate0_1_1_to0_1_2(data: FileFormat_0_1_1): FileFormat_0_1_2 {
  return {
    version: FileVersion.V_0_1_2,
    project: {
      totalActiveTime: data.project.totalActiveTime,
      totalIdleTime: data.project.totalFocusTime,
    },
    files: Object.fromEntries(
      Object.entries(data.files).map(([path, entry]) => [
        path,
        {
          active: entry.pending ?? 0,
          idle: entry.focus ?? 0,
        },
      ]),
    ),
    deleted: data.deleted
      ? {
          active: data.deleted.active ?? 0,
          idle: data.deleted.focus ?? 0,
        }
      : undefined,
  };
}
