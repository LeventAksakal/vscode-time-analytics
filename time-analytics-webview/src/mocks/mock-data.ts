// Mock data for UI development
import type { TimeAnalyticsFileSchema } from '../types/file-format';
import type { InitialData } from '../types/messages';

// Data Generation Helpers
const today = new Date();
const DAY_MS = 24 * 60 * 60 * 1000;

function getDateKey(date: Date) {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
}

const key = (dateStr: string, path: string, auth = 'user', branch = 'main') =>
  `${dateStr},${auth},${branch},${path}`;

// --- Scenario Generation ---

const buckets: Record<string, { active: number; idle: number }> = {};

// 1. Team Project: 3 Users working on 'src/core' over last 7 days
const users = ['alice', 'bob', 'charlie'];
const coreFiles = ['src/core/auth.ts', 'src/core/db.ts', 'src/core/api.ts'];

for (let i = 0; i < 7; i++) {
  const date = new Date(today.getTime() - i * DAY_MS);
  const dKey = getDateKey(date);

  users.forEach((u) => {
    // Vary activity
    if (Math.random() > 0.3) {
      const file =
        coreFiles[Math.floor(Math.random() * coreFiles.length)] ||
        'src/unknown.ts';
      const active = Math.floor(Math.random() * 60 * 60 * 1000); // up to 1h
      const idle = Math.floor(Math.random() * 15 * 60 * 1000);

      buckets[key(dKey, file, u, 'feature/team-collab')] = { active, idle };
    }
  });

  // Alice also works on main
  if (i < 3) {
    buckets[key(dKey, 'README.md', 'alice', 'main')] = {
      active: 300000,
      idle: 60000,
    };
  }
}

// 2. Solo Project: 'dave' working heavily on 'frontend' today
const frontendFiles = ['src/ui/Button.vue', 'src/ui/Modal.vue', 'src/App.vue'];
frontendFiles.forEach((f) => {
  buckets[key(getDateKey(today), f, 'dave', 'feature/new-ui')] = {
    active: 120 * 60 * 1000, // 2h
    idle: 10 * 60 * 1000,
  };
});

// 3. Historical Data (Last Month)
const pastDate = new Date(today.getTime() - 25 * DAY_MS);
buckets[key(getDateKey(pastDate), 'legacy/script.js', 'alice', 'legacy')] = {
  active: 5000000,
  idle: 200000,
};

export const mockWorkspaceData: TimeAnalyticsFileSchema = {
  version: '0.1.5',
  project: {
    totalActiveTime: 50000, // Totals are recalculated by store usually, but mock needs to exist
    totalIdleTime: 20000,
  },
  buckets: buckets,
};

export const mockInitialData: InitialData = {
  projectTotals: {
    active: 0,
    idle: 0,
  },
  buckets: mockWorkspaceData.buckets,
  globalStats: {
    active: 0,
    idle: 0,
  },
  workspaceName: 'Mock Multi-User Workspace',
};
