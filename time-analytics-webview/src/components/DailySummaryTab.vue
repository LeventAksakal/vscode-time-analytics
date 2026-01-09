<script setup lang="ts">
import { useAnalyticsStore } from '@/stores/analytics';
import { computed } from 'vue';
import { formatDuration } from '@/utils/formatters';
import FileActivityTable from './FileActivityTable.vue';
import { getThemeColors } from '@/utils/chart-setup';

const store = useAnalyticsStore();
const theme = getThemeColors();

const summary = computed(() => store.dailySummary);
</script>

<template>
    <div class="daily-summary">
        <section class="stats-grid">
            <div class="stat-card">
                <span class="stat-label">Active Time</span>
                <div class="stat-value active" :style="{ color: theme.blue }">{{ formatDuration(summary.active) }}</div>
            </div>
            <div class="stat-card">
                <span class="stat-label">Idle Time</span>
                <div class="stat-value idle" :style="{ color: theme.orange }">{{ formatDuration(summary.idle) }}</div>
            </div>
            <div class="stat-card">
                <span class="stat-label">Files Touched</span>
                <div class="stat-value" :style="{ color: theme.green }">{{ summary.fileCount }}</div>
            </div>
        </section>

        <section class="top-files">
            <h3>Top Files Today</h3>
            <div v-if="summary.files.length === 0" class="no-data">No activity recorded today.</div>
            <div v-else class="table-box">
                <FileActivityTable :files="summary.files" />
            </div>
        </section>
    </div>
</template>

<style scoped>
.daily-summary {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.stat-card {
    background: var(--vscode-editor-background);
    border: 1px solid var(--vscode-widget-border);
    border-radius: 6px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.stat-label {
    font-size: 0.85em;
    color: var(--vscode-descriptionForeground);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.stat-value {
    font-size: 1.8rem;
    font-weight: 300;
}

.top-files h3 {
    margin: 0 0 1rem 0;
    font-weight: 500;
    font-size: 0.95rem;
}

.table-box {
    background: var(--vscode-editor-background);
    border: 1px solid var(--vscode-widget-border);
    border-radius: 6px;
    padding: 0.5rem;
}

.no-data {
    text-align: center;
    padding: 2rem;
    color: var(--vscode-descriptionForeground);
    font-style: italic;
    background: var(--vscode-editor-background);
    border: 1px solid var(--vscode-widget-border);
    border-radius: 6px;
}

@media (max-width: 600px) {
    .stats-grid {
        grid-template-columns: 1fr;
    }
}
</style>