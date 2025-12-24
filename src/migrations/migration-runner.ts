import { FileVersion, findFileVersion } from '../file-versions/version-finder';
import { type FileFormat_0_1_3 } from '../file-versions/0.1.3';
import { type FileFormat_0_1_2 } from '../file-versions/0.1.2';
import { type FileFormat_0_1_1 } from '../file-versions/0.1.1';
import { migrate0_1_1_to0_1_2 } from './0.1.1-0.1.2';
import { migrate0_1_2_to0_1_3 } from './0.1.2-0.1.3';

type MigrationMap = Partial<Record<FileVersion, (value: unknown) => unknown>>;

const MIGRATIONS: MigrationMap = {
  [FileVersion.V_0_1_1]: (value) =>
    migrate0_1_1_to0_1_2(value as FileFormat_0_1_1),
  [FileVersion.V_0_1_2]: (value) =>
    migrate0_1_2_to0_1_3(value as FileFormat_0_1_2),
};

export function createEmptyLatest(): FileFormat_0_1_3 {
  return {
    version: FileVersion.V_0_1_3,
    project: { totalIdleTime: 0, totalActiveTime: 0 },
    buckets: {},
    deleted: undefined,
  };
}

export function migrateToLatest(raw: unknown): {
  data: FileFormat_0_1_3;
  from: FileVersion;
  to: FileVersion;
} {
  const detected = findFileVersion(raw);

  if (detected === FileVersion.Unknown) {
    return {
      data: createEmptyLatest(),
      from: FileVersion.Unknown,
      to: FileVersion.V_0_1_3,
    };
  }

  let currentVersion: FileVersion = detected;
  let working: unknown = raw;
  const seen = new Set<FileVersion>();

  while (true) {
    if (seen.has(currentVersion)) {
      return {
        data: createEmptyLatest(),
        from: FileVersion.Unknown,
        to: FileVersion.V_0_1_3,
      };
    }
    seen.add(currentVersion);

    const step = MIGRATIONS[currentVersion];
    if (!step) break;

    working = step(working);
    currentVersion = findFileVersion(working);

    if (currentVersion === FileVersion.Unknown) {
      return {
        data: createEmptyLatest(),
        from: FileVersion.Unknown,
        to: FileVersion.V_0_1_2,
      };
    }
  }

  if (currentVersion === FileVersion.V_0_1_3) {
    return {
      data: working as FileFormat_0_1_3,
      from: detected,
      to: currentVersion,
    };
  }

  return {
    data: createEmptyLatest(),
    from: FileVersion.Unknown,
    to: FileVersion.V_0_1_3,
  };
}
