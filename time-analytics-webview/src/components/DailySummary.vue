<script setup lang="ts">
import { useAnalyticsStore } from '@/stores/analytics';
import { computed } from 'vue';

const store = useAnalyticsStore();

const summary = computed(() => store.dailySummary);

function formatDuration(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const parts = [];
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    if (s > 0 || parts.length === 0) parts.push(`${s}s`);

    return parts.join(' ');
}
</script>

<template>
    <div class="daily-summary">
        <section class="stats-grid">
            <div class="stat-card">
                <span class="stat-label">Active Time</span>
                <div class="stat-value active">{{ formatDuration(summary.active) }}</div>
            </div>
            <div class="stat-card">
                <span class="stat-label">Idle Time</span>
                <div class="stat-value idle">{{ formatDuration(summary.idle) }}</div>
            </div>
            <div class="stat-card">
                <span class="stat-label">Files Touched</span>
                <div class="stat-value">{{ summary.fileCount }}</div>
            </div>
        </section>

        <section class="top-files">
            <h3>Top Files Today</h3>
            <div v-if="summary.files.length === 0" class="no-data">No activity recorded today.</div>
            <div v-else class="file-list">
                <div v-for="file in summary.files" :key="file.path" class="file-item">
                    <span class="file-path" :title="file.path">{{ file.path }}</span>
                    <span class="file-duration">{{ formatDuration(file.active) }}</span>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.daily-summary {
    padding: 1rem;
    max-width: 800px;
    margin: 0 auto;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
}

.stat-card {
    background: var(--vscode-editor-background);
    border: 1px solid var(--vscode-widget-border);
    padding: 1rem;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.stat-label {
    font-size: 0.9rem;
    color: var(--vscode-descriptionForeground);
    margin-bottom: 0.5rem;
}

.stat-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--vscode-foreground);
}

.stat-value.active {
    color: var(--vscode-charts-blue);
}

.stat-value.idle {
    color: var(--vscode-charts-orange);
}

.top-files {
    background: var(--vscode-editor-background);
    border: 1px solid var(--vscode-widget-border);
    border-radius: 4px;
    padding: 1rem;
}

h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: var(--vscode-foreground);
}

.file-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    background: var(--vscode-list-hoverBackground);
    border-radius: 3px;
}

.file-path {
    font-family: monospace;
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 70%;
}

.file-duration {
    font-size: 0.9rem;
    color: var(--vscode-descriptionForeground);
}

.no-data {
    text-align: center;
    padding: 2rem;
    color: var(--vscode-descriptionForeground);
    font-style: italic;
}
</style>