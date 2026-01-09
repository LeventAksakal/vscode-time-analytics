<script setup lang="ts">
import { computed } from 'vue';
import { getThemeColors } from '@/utils/chart-setup';
import { formatDuration } from '@/utils/formatters';

interface FileActivity {
    path: string;
    branch?: string;
    author?: string; // Add Author field
    active: number;
    idle: number;
}

const props = defineProps<{
    files: FileActivity[]
}>();

const theme = getThemeColors();

const maxTotalMap = computed(() => {
    if (!props.files.length) return 1;
    // Find absolute max to calculate percentage from 0 to 100
    const max = Math.max(...props.files.map(f => f.active + f.idle));
    return max || 1; // avoid divide by zero
});
</script>

<template>
    <div class="file-table-container">
        <table class="file-table">
            <thead>
                <tr>
                    <th class="col-path">Path</th>
                    <th class="col-auth">Author</th> <!-- New Column -->
                    <th class="col-branch">Branch</th>
                    <th class="col-activity">Activity</th>
                    <th class="col-time">Time</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(file, idx) in files" :key="idx">
                    <td class="col-path" :title="file.path">{{ file.path }}</td>
                    <td class="col-auth" :title="file.author">{{ file.author || '-' }}</td> <!-- New Column Data -->
                    <td class="col-branch">
                        <span class="branch-tag" v-if="file.branch !== 'null' && file.branch !== 'unknown'">{{
                            file.branch }}</span>
                        <span class="branch-tag" v-else>main</span>
                    </td>
                    <td class="col-activity">
                        <div class="activity-cell">
                            <!-- Stacked bar for active/idle -->
                            <div class="bar-container">
                                <div class="bar-segment active"
                                    :style="{ width: ((file.active / maxTotalMap) * 100) + '%', backgroundColor: theme.blue }">
                                </div>
                                <div class="bar-segment idle"
                                    :style="{ width: ((file.idle / maxTotalMap) * 100) + '%', backgroundColor: theme.orange }">
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="col-time">{{ formatDuration(file.active) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.file-table-container {
    overflow-x: auto;
}

.file-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9em;
}

.file-table th {
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid var(--vscode-widget-border);
    color: var(--vscode-descriptionForeground);
    font-weight: normal;
}

.file-table td {
    padding: 8px;
    border-bottom: 1px solid var(--vscode-widget-border);
    vertical-align: middle;
}

.col-path {
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: 'Consolas', 'Courier New', monospace;
    color: var(--vscode-textLink-foreground);
}

.col-auth {
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: 0.9;
}

.col-branch {
    width: 100px;
}

.branch-tag {
    background: var(--vscode-badge-background);
    color: var(--vscode-badge-foreground);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.85em;
}

.col-activity {
    width: 200px;
}

.col-time {
    width: 80px;
    text-align: right;
    font-variant-numeric: tabular-nums;
}

.activity-cell {
    width: 100%;
    display: flex;
    align-items: center;
}

.bar-container {
    display: flex;
    height: 6px;
    width: 100%;
    background: var(--vscode-widget-shadow);
    border-radius: 3px;
    overflow: hidden;
}

.bar-segment {
    height: 100%;
}
</style>