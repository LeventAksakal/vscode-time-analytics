import { type FileFormat_0_1_4 } from '../file-versions/0.1.4';
import { type FileFormat_0_1_5 } from '../file-versions/0.1.5';
import { FileVersion } from '../file-versions/version-finder';

const MIGRATED_DATE = '<Migrated Date>';

export function migrate0_1_4_to0_1_5(data: FileFormat_0_1_4): FileFormat_0_1_5 {
  const buckets: FileFormat_0_1_5['buckets'] = {};
  for (const [key, value] of Object.entries(data.buckets)) {
    const newKey = `${MIGRATED_DATE},${key}`;
    buckets[newKey] = value;
  }

  const deleted = data.deleted
    ? { [MIGRATED_DATE]: { ...data.deleted } }
    : undefined;

  return {
    version: FileVersion.V_0_1_5,
    project: {
      totalActiveTime: data.project.totalActiveTime,
      totalIdleTime: data.project.totalIdleTime,
    },
    buckets,
    deleted,
  };
}
