import { type FileFormat_0_1_5 } from '../file-versions/0.1.5';
import { type FileFormat_0_1_6 } from '../file-versions/0.1.6';
import { FileVersion } from '../file-versions/version-finder';

const NO_BRANCH = '<no-branch>';

export function migrate0_1_5_to0_1_6(data: FileFormat_0_1_5): FileFormat_0_1_6 {
  const buckets: FileFormat_0_1_6['buckets'] = {};

  for (const [key, value] of Object.entries(data.buckets)) {
    const first = key.indexOf(',');
    const second = first >= 0 ? key.indexOf(',', first + 1) : -1;
    if (first < 0 || second < 0) {
      // Malformed; keep under migrated date with no-branch
      const newKey = `${key},${NO_BRANCH}`;
      buckets[newKey] = { ...value };
      continue;
    }

    const date = key.substring(0, first);
    const auth = key.substring(first + 1, second);
    const rel = key.substring(second + 1);
    const newKey = `${date},${auth},${NO_BRANCH},${rel}`;
    buckets[newKey] = { ...value };
  }

  return {
    version: FileVersion.V_0_1_6,
    project: {
      totalActiveTime: data.project.totalActiveTime,
      totalIdleTime: data.project.totalIdleTime,
    },
    buckets,
    deleted: data.deleted,
  };
}
