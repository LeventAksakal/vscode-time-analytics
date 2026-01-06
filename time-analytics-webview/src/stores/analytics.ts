import { defineStore } from 'pinia';
import { computed, shallowRef, ref } from 'vue';
import type { InitialData, BackendMessages } from '../types/messages';
import type { BucketKey, TimeAnalyticsFileSchema } from '../types/file-format';

// Helper to parse the date from the key "DD-MM-YYYY,..."
function getDateFromKey(key: string): string {
  const commaIndex = key.indexOf(',');
  return commaIndex === -1 ? key : key.substring(0, commaIndex);
}

export const useAnalyticsStore = defineStore('analytics', () => {
  // STATE
  // We use the exact types from the file schema
  const buckets = shallowRef<TimeAnalyticsFileSchema['buckets']>({});
  const projectTotals = ref<TimeAnalyticsFileSchema['project']>({
    totalActiveTime: 0,
    totalIdleTime: 0,
  });

  const globalStats = ref({ active: 0, idle: 0 });
  const workspaceName = ref('');
  const error = ref<string | undefined>(undefined);
  const isReady = ref(false);
  const loading = ref(true);

  // ACTIONS
  function handleMessage(message: BackendMessages) {
    switch (message.type) {
      case 'initialData':
        setInitialData(message.data);
        loading.value = false;
        break;
      case 'workspaceData':
        console.log('[Store] Received workspaceData:', message.data.buckets);
        buckets.value = message.data.buckets;
        break;
      case 'globalStats':
        globalStats.value = message.stats;
        break;
      case 'updateBucket':
        updateBucket(message.bucketKey, message.value);
        break;
      case 'newBucket':
        updateBucket(message.bucketKey, message.value);
        break;
      case 'deleteBucket':
        deleteBucket(message.bucketKey);
        break;
      case 'error':
        error.value = message.reason;
        break;
    }
  }

  function setInitialData(data: InitialData) {
    console.log('[Store] Setting initial data:', data);
    buckets.value = data.buckets;
    // Map the message format to the schema format
    projectTotals.value = {
      totalActiveTime: data.projectTotals.active,
      totalIdleTime: data.projectTotals.idle,
    };
    globalStats.value = data.globalStats;
    workspaceName.value = data.workspaceName;
    error.value = data.error;
    isReady.value = true;
  }

  function updateBucket(key: BucketKey, value: any) {
    // We must create a new object reference for shallowRef to trigger updates
    // or use triggerRef(). Spreading is cleaner for immutability.
    const newVal = typeof value === 'string' ? JSON.parse(value) : value;
    buckets.value = { ...buckets.value, [key]: newVal };
  }

  function deleteBucket(key: BucketKey) {
    const newBuckets = { ...buckets.value };
    delete newBuckets[key];
    buckets.value = newBuckets;
  }

  // GETTERS (Computed)

  // 1. Get today's date string (DD-MM-YYYY)
  const todayDateKey = computed(() => {
    const now = new Date();
    const d = String(now.getDate()).padStart(2, '0');
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const y = now.getFullYear();
    return `${d}-${m}-${y}`;
  });

  // 2. Filter buckets for today
  const todayBuckets = computed(() => {
    const targetDate = todayDateKey.value;
    const result: Record<string, any> = {};

    for (const [key, val] of Object.entries(buckets.value)) {
      if (key.startsWith(targetDate)) {
        result[key] = val;
      }
    }
    return result;
  });

  // 3. Aggregate Today's Stats
  const dailySummary = computed(() => {
    const targetDate = todayDateKey.value;
    console.log('[Store] Computing daily summary for date:', targetDate);
    console.log(
      '[Store] Total buckets count:',
      Object.keys(buckets.value).length,
    );

    let active = 0;
    let idle = 0;
    let fileCount = 0;
    const files: Array<{ path: string; active: number; idle: number }> = [];

    const todayBucketsVal = todayBuckets.value;
    console.log(
      '[Store] Today buckets count:',
      Object.keys(todayBucketsVal).length,
    );

    for (const [key, val] of Object.entries(todayBucketsVal)) {
      active += val.active || 0;
      idle += val.idle || 0;
      fileCount++;

      // Extract path from key: "DATE,AUTH,BRANCH,PATH"
      const parts = key.split(',');
      // Rejoin the rest in case path has commas, though schema implies simple CSV structure
      // Ideally we use a robust parser, but for now assuming standard format:
      const filePath = parts.slice(3).join(',');

      files.push({
        path: filePath,
        active: val.active || 0,
        idle: val.idle || 0,
      });
    }

    // Sort files by duration (descending)
    files.sort((a, b) => b.active - a.active);

    return {
      active,
      idle,
      fileCount,
      files,
    };
  });

  return {
    // State
    buckets,
    projectTotals,
    globalStats,
    workspaceName,
    error,
    isReady,
    loading,

    // Actions
    handleMessage,

    // Getters
    dailySummary,
  };
});
