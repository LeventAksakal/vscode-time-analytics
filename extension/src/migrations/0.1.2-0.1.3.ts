import { type FileFormat_0_1_2 } from '../file-versions/0.1.2';
import { type FileFormat_0_1_3 } from '../file-versions/0.1.3';
import { FileVersion } from '../file-versions/version-finder';

export function migrate0_1_2_to0_1_3(data: FileFormat_0_1_2): FileFormat_0_1_3 {
  return {
    version: FileVersion.V_0_1_3,
    project: {
      totalActiveTime: data.project.totalActiveTime,
      totalIdleTime: data.project.totalIdleTime,
    },
    buckets: { ...data.files },
    deleted: data.deleted,
  };
}
