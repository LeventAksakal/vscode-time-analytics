<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useAnalyticsStore } from '@/stores/analytics';
import { webviewApi } from '@/webview-client';
import { formatDuration } from '@/utils/formatters';

const store = useAnalyticsStore();

const lifetimeStats = computed(() => ({
  activeTime: formatDuration(store.projectTotals.totalActiveTime),
  idleTime: formatDuration(store.projectTotals.totalIdleTime)
}));

const config = reactive({
  autoTrack: true,
  repoTracking: true
});

// Watch config changes - simplified, sending update on change could be done via watchers or just manual call if UI had save button.
// But specs say toggles. Let's send message on change.
const updateConfig = (key: string, value: any) => {
  webviewApi.postMessage({ type: 'updateConfig', config: { key, value } });
};

// --- Actions ---
const handleAction = (action: 'gitignore' | 'export' | 'clear') => {
  switch (action) {
    case 'gitignore': webviewApi.postMessage({ type: 'addToGitignore' }); break;
    case 'export': webviewApi.postMessage({ type: 'exportData' }); break;
    case 'clear': webviewApi.postMessage({ type: 'clearData' }); break;
  }
};
</script>

<template>
  <div class="settings-container">
    <!-- Lifetime Statistics -->
    <div class="card">
      <div class="card-header">
        <h3>Lifetime Statistics</h3>
      </div>
      <div class="stats-layout">
        <div class="stat-item">
          <span class="stat-label">Total Active Time</span>
          <span class="stat-value active-color">{{ lifetimeStats.activeTime }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Total Idle Time</span>
          <span class="stat-value idle-color">{{ lifetimeStats.idleTime }}</span>
        </div>
      </div>
    </div>

    <!-- Configuration -->
    <div class="card">
      <div class="card-header">
        <h3>Configuration</h3>
      </div>
      <div class="config-list">
        <div class="config-item">
          <div class="config-info">
            <span class="config-title">Auto-track Activity</span>
            <span class="config-desc">Automatically track time spent in files</span>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="config.autoTrack" @change="updateConfig('autoTrack', config.autoTrack)">
            <span class="slider round"></span>
          </label>
        </div>
        <div class="config-item">
          <div class="config-info">
            <span class="config-title">Repository Tracking</span>
            <span class="config-desc">Track branch and commit information</span>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="config.repoTracking"
              @change="updateConfig('repoTracking', config.repoTracking)">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="card actions-section">
      <div class="card-header">
        <h3>Actions</h3>
      </div>
      <div class="actions-list">
        <button class="action-btn" @click="handleAction('gitignore')">
          <span class="icon">
            <!-- File Plus Icon -->
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="12" y1="18" x2="12" y2="12"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
          </span>
          <div class="btn-text">
            <span class="btn-title">Add to .gitignore</span>
            <span class="btn-desc">Prevent tracking data from being committed</span>
          </div>
        </button>
        <button class="action-btn" @click="handleAction('export')">
          <span class="icon">
            <!-- Download Icon -->
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </span>
          <div class="btn-text">
            <span class="btn-title">Export JSON</span>
            <span class="btn-desc">Download all tracking data as JSON</span>
          </div>
        </button>
        <button class="action-btn danger" @click="handleAction('clear')">
          <span class="icon">
            <!-- Trash Icon -->
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </span>
          <div class="btn-text">
            <span class="btn-title">Clear All Data</span>
            <span class="btn-desc">Permanently delete all tracking data</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-container {
  padding: 24px;
  max-width: 1000px;
  margin: 0 auto;
  color: var(--vscode-foreground);
  font-family: var(--vscode-font-family);
}

/* Card Styles */
.card {
  background-color: var(--vscode-editor-background);
  border: 1px solid var(--vscode-panel-border);
  border-radius: 4px;
  margin-bottom: 24px;
  overflow: hidden;
}

.card-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--vscode-panel-border);
  background-color: var(--vscode-sideBar-background);
  /* Subtle contrast for header */
}

.card-header h3 {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.9;
}

/* Stats Layout */
.stats-layout {
  display: flex;
  padding: 30px 40px;
  gap: 60px;
}



.stat-label {
  display: block;
  font-size: 0.85rem;
  color: var(--vscode-descriptionForeground);
  margin-bottom: 8px;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 300;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
  line-height: 1;
}

.active-color {
  color: #3b82f6;
}

.idle-color {
  color: #f97316;
}



/* Config List */
.config-list {
  padding: 10px 0;
}

.config-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--vscode-panel-border);
}

.config-item:last-child {
  border-bottom: none;
}

.config-info {
  display: flex;
  flex-direction: column;
}

.config-title {
  font-weight: 500;
  font-size: 0.95rem;
}

.config-desc {
  font-size: 0.8rem;
  color: var(--vscode-descriptionForeground);
  margin-top: 4px;
}

/* Toggle Switch */
.switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--vscode-scrollbarSlider-background);
  transition: .3s;
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: var(--vscode-foreground);
  transition: .3s;
  border-radius: 50%;
}

input:checked+.slider {
  background-color: var(--vscode-button-background);
}

input:checked+.slider:before {
  transform: translateX(16px);
  background-color: var(--vscode-button-foreground);
}

/* Actions */
.actions-list {
  display: flex;
  flex-direction: column;
}

.action-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
  /* Taller items like image */
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--vscode-panel-border);
  cursor: pointer;
  text-align: left;
  color: var(--vscode-foreground);
  transition: background 0.1s;
}

.action-btn:last-child {
  border-bottom: none;
}

.action-btn:hover {
  background-color: var(--vscode-list-hoverBackground);
}

.action-btn.danger {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  /* bright red text */
}

.action-btn.danger:hover {
  background-color: rgba(239, 68, 68, 0.2);
}

.action-btn .icon {
  width: 24px;
  height: 24px;
  margin-right: 16px;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn.danger .icon {
  opacity: 1;
}

.btn-title {
  font-weight: 500;
  font-size: 0.95rem;
  display: block;
}

.btn-desc {
  font-size: 0.8rem;
  color: var(--vscode-descriptionForeground);
  margin-top: 2px;
  display: block;
}

.action-btn.danger .btn-desc {
  color: inherit;
  opacity: 0.8;
}

@media (max-width: 700px) {
  .stats-layout {
    flex-direction: column;
    gap: 30px;
  }
}
</style>
