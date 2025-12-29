import { type FileFormat_0_1_3 } from '../file-versions/0.1.3';
import { type FileFormat_0_1_4 } from '../file-versions/0.1.4';
import { FileVersion } from '../file-versions/version-finder';

export function migrate0_1_3_to0_1_4(data: FileFormat_0_1_3): FileFormat_0_1_4 {
  const buckets: FileFormat_0_1_4['buckets'] = {};
  for (const [key, value] of Object.entries(data.buckets)) {
    const newKey = `null,${key}`;
    buckets[newKey] = value;
  }

  return {
    version: FileVersion.V_0_1_4,
    project: {
      totalActiveTime: data.project.totalActiveTime,
      totalIdleTime: data.project.totalIdleTime,
    },
    buckets,
    deleted: data.deleted,
  };
}
