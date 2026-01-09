<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAnalyticsStore } from '@/stores/analytics';
import { formatDuration } from '@/utils/formatters';
import ActivityBarChart from './charts/ActivityBarChart.vue';
import ActivityPieChart from './charts/ActivityPieChart.vue';
import FileActivityTable from './FileActivityTable.vue';
import { getThemeColors } from '@/utils/chart-setup';

const store = useAnalyticsStore();
const theme = getThemeColors();

type TimeRange = '24h' | '7d' | '30d';
const activeRange = ref<TimeRange>('7d');
const searchQuery = ref('');

// --- Data Helpers ---
function getKeysForDate(date: Date): string {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}-${m}-${y}`;
}

function getStatsForDate(dateKey: string) {
    let active = 0;
    let idle = 0;
    for (const [k, v] of Object.entries(store.buckets)) {
        if (k.startsWith(dateKey + ',')) {
            active += v.active || 0;
            idle += v.idle || 0;
        }
    }
    // Return in MINUTES for the chart
    // Store data is in Milliseconds
    // Use raw division to preserve seconds (e.g. 0.5m = 30s)
    return {
        active: active / 60000,
        idle: idle / 60000
    };
}

// --- Charts Logic ---
function getDailyChartData(range: 'week' | 'month') {
    const now = new Date();
    const result = [];

    let startDate = new Date();
    let daysCount = 0;

    if (range === 'week') {
        // Start from Monday
        const day = now.getDay();
        // 0=Sun, 1=Mon ... 6=Sat
        // We want 1=Mon as start. 
        // If Sun(0), offset is -6. If Mon(1), offset 0.
        const diff = (day === 0 ? -6 : 1) - day;
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff);
        daysCount = 7;
    } else {
        // Start from 1st of Month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        // Days in month
        daysCount = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    }

    // Iterate
    for (let i = 0; i < daysCount; i++) {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);

        // Don't show future days? Or show empty? 
        // Requirement: "week start from monday", "month start from current months beginning"
        // Showing empty future days gives better context of "progress".

        const dateKey = getKeysForDate(d);
        const stats = getStatsForDate(dateKey);

        // Is Current?
        const isCurrent = d.toDateString() === now.toDateString();

        // Label
        let label = '';
        if (range === 'week') {
            label = d.toLocaleDateString('en-US', { weekday: 'short' });
        } else {
            label = d.getDate().toString();
        }

        result.push({
            label,
            active: stats.active, // ms 
            idle: stats.idle,     // ms
            isCurrent
        });
    }
    return result;
}

// 24h: Hourly breakdown (Placeholder until backend supports hourly buckets)
function getHourlyData() {
    const result = [];
    const currentHour = new Date().getHours();

    // We only have Daily totals, so we can't show real hourly data yet.
    // However, to satisfy the visualization, we will place the day's total
    // into the current hour bucket so the user sees *something*.

    // Fetch today's total minutes
    const dateKey = getKeysForDate(new Date());
    const stats = getStatsForDate(dateKey); // returns { active: number(min), idle: number(min) }

    for (let i = 0; i < 24; i++) {
        // If it's the current hour, dump the daily stats here
        // This is a placeholder behavior until backend migration supports hourly buckets
        const isTarget = i === currentHour;

        result.push({
            label: `${String(i).padStart(2, '0')}:00`,
            active: isTarget ? stats.active : 0,
            idle: isTarget ? stats.idle : 0,
            isCurrent: isTarget
        });
    }
    return result;
}

const chartData = computed(() => {
    switch (activeRange.value) {
        case '24h': return getHourlyData();
        case '7d': return getDailyChartData('week');
        case '30d': return getDailyChartData('month');
        default: return [];
    }
});

const rangeBuckets = computed(() => {
    // We need to match the chart range logic strictly for the File Activity list too
    const now = new Date();
    const prefixes = new Set<string>();

    let startDate = new Date();
    let daysCount = 0;

    if (activeRange.value === '24h') {
        startDate = now;
        daysCount = 1;
    } else if (activeRange.value === '7d') {
        const day = now.getDay();
        const diff = (day === 0 ? -6 : 1) - day;
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff);
        daysCount = 7;
    } else {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        daysCount = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    }

    for (let i = 0; i < daysCount; i++) {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        prefixes.add(getKeysForDate(d));
    }

    const fileStats: Record<string, { active: number, idle: number }> = {};
    let totalActive = 0;
    let totalIdle = 0;

    for (const [k, v] of Object.entries(store.buckets)) {
        // Key: DATE,AUTH,BRANCH,PATH
        const parts = k.split(',');
        const datePart = parts[0];

        if (datePart && prefixes.has(datePart)) {
            const branch = parts[2] || 'unknown';
            const path = parts.slice(3).join(',');
            const uniqueKey = `${path}::${branch}`;

            if (!fileStats[uniqueKey]) {
                fileStats[uniqueKey] = { active: 0, idle: 0 };
            }
            fileStats[uniqueKey].active += v.active || 0;
            fileStats[uniqueKey].idle += v.idle || 0;

            totalActive += v.active || 0;
            totalIdle += v.idle || 0;
        }
    }

    // --- Flatten for Table ---
    // User requirement: Flatten by file path, but show Author/Branch columns.
    // If multiple authors/branches exist for one file path, we list them all (comma separated)
    // or pick the most significant. Since distinct Author is valuable context, 
    // we aggregate authors/branches into Sets.

    interface AggregatedFile {
        active: number;
        idle: number;
        authors: Set<string>;
        branches: Set<string>;
    }

    const flatMap = new Map<string, AggregatedFile>();

    // bucket keys are DATE,AUTH,BRANCH,PATH
    for (const [k, v] of Object.entries(store.buckets)) {
        const parts = k.split(',');
        const date = parts[0];
        if (date && prefixes.has(date)) {
            const rawAuth = parts[1];
            const rawBranch = parts[2];
            const path = parts.slice(3).join(',');

            const auth = (rawAuth === 'null' || !rawAuth) ? null : rawAuth;
            const branch = (rawBranch === 'null' || !rawBranch) ? 'main' : rawBranch;

            if (!flatMap.has(path)) {
                flatMap.set(path, {
                    active: 0,
                    idle: 0,
                    authors: new Set(),
                    branches: new Set()
                });
            }
            const entry = flatMap.get(path)!;
            entry.active += v.active || 0;
            entry.idle += v.idle || 0;

            if (auth) entry.authors.add(auth);
            if (branch) entry.branches.add(branch);
        }
    }

    // Convert to array
    const filesArray = Array.from(flatMap.entries()).map(([path, s]) => {
        // If no author found (nulls only), default to 'Unknown' or empty
        const authorList = Array.from(s.authors).join(', ');
        const branchList = Array.from(s.branches).join(', ');

        return {
            path,
            branch: branchList || 'main',
            author: authorList || '(me)', // If totally null, assume local user
            active: s.active,
            idle: s.idle
        };
    }).sort((a, b) => b.active - a.active);


    // Flatten for Pie Chart uses fileStats? NO, check languageData logic.
    // languageData iterates `rangeBuckets.value.files`.
    // So if we change `rangeBuckets.value.files` structure, we might break languageData.
    // languageData only needs `path` and `active`.

    // Re-verify `fileStats` usage... it was used to build `filesArray` before.
    // We replaced it with `flatMap`. 
    // We need to ensure `filesArray` returns compatible objects.

    const maxActive = Math.max(...filesArray.map(f => f.active), 1);
    const filesWithRatio = filesArray.map(f => ({
        ...f,
        ratio: f.active / maxActive
    }));

    return {
        files: filesWithRatio,
        totalActive,
        totalIdle,
        fileCount: filesArray.length
    };
});

const dashboardStats = computed(() => {
    const s = rangeBuckets.value;
    const efficiency = Math.round((s.totalActive / (s.totalActive + s.totalIdle || 1)) * 100);

    return {
        activeStr: formatDuration(s.totalActive),
        idleStr: formatDuration(s.totalIdle),
        files: s.fileCount,
        efficiencyStr: `${efficiency}%`
    };
});

const languageData = computed(() => {
    const counts: Record<string, number> = {};
    for (const file of rangeBuckets.value.files) {
        // file.path should be string, but safeguard
        const p = file.path || 'unknown';
        const ext = p.split('.').pop() || 'other';
        // Convert MS to Minutes for the Chart/Tooltip formatter (keep precision)
        const minutes = file.active / 60000;
        counts[ext] = (counts[ext] || 0) + minutes;
    }

    return Object.entries(counts)
        .map(([label, value]) => ({ label, value }))
        .sort((a, b) => b.value - a.value)
        .reverse() // Sort decr for pie
        .slice(0, 6);
});
</script>

<template>
    <div class="dashboard-root">
        <!-- Header Controls -->
        <header class="dashboard-header">
            <h2 class="title">Dashboard</h2>
            <div class="control-group">
                <div class="range-pills">
                    <button :class="{ active: activeRange === '24h' }" @click="activeRange = '24h'">Today</button>
                    <button :class="{ active: activeRange === '7d' }" @click="activeRange = '7d'">Week</button>
                    <button :class="{ active: activeRange === '30d' }" @click="activeRange = '30d'">Month</button>
                </div>
            </div>
        </header>

        <!-- 1. Summary Cards Row -->
        <section class="summary-row">
            <div class="stat-card">
                <label>Active Time</label>
                <div class="stat-value" :style="{ color: theme.blue }">{{ dashboardStats.activeStr }}</div>
            </div>
            <div class="stat-card">
                <label>Idle Time</label>
                <div class="stat-value" :style="{ color: theme.orange }">{{ dashboardStats.idleStr }}</div>
            </div>
            <div class="stat-card">
                <label>Files Touched</label>
                <div class="stat-value" :style="{ color: theme.green }">{{ dashboardStats.files }}</div>
            </div>
            <div class="stat-card">
                <label>Efficiency</label>
                <div class="stat-value" :style="{ color: theme.purple }">{{ dashboardStats.efficiencyStr }}</div>
            </div>
        </section>

        <!-- Main Content Area with Transition -->
        <TransitionGroup name="grid-anim" tag="div" class="main-grid">

            <!-- Language (Always Visible) -->
            <div key="lang" class="chart-box layout-item item-lang" :class="{ 'lang-today': activeRange === '24h' }">
                <h4>Language Distribution</h4>
                <div class="chart-inner">
                    <ActivityPieChart :data="languageData" />
                </div>
            </div>

            <!-- Trend (Hidden on Today) -->
            <div v-if="activeRange !== '24h'" key="trend" class="chart-box layout-item item-trend">
                <h4>Activity Trend</h4>
                <div class="chart-inner">
                    <ActivityBarChart :data="chartData" />
                </div>
            </div>

            <!-- Files (Always Visible) -->
            <div key="files" class="layout-item item-files" :class="{ 'files-today': activeRange === '24h' }">
                <h4>File Activity Today</h4>
                <div class="table-box">
                    <FileActivityTable :files="rangeBuckets.files" />
                </div>
            </div>

        </TransitionGroup>
    </div>
</template>

<style scoped>
/* Main Grid Container */
.main-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    position: relative;
    width: 100%;
}

/* Item Base Styles */
.layout-item {
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Grid Animation Classes (Vue TransitionGroup) */
.grid-anim-move,
.grid-anim-enter-active,
.grid-anim-leave-active {
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.grid-anim-enter-from,
.grid-anim-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

.grid-anim-leave-active {
    position: absolute;
    /* Take out of flow to allow others to move */
    visibility: hidden;
    /* Hide immediately but keep strict size for anim? no, display:none is safer for reflow */
    display: none;
    /* Force reflow immediately for others to move */
}

/* 
   LAYOUT LOGIC 
   Flex-basis acts as width.
   Order controls position.
*/

/* --- LANGUAGE CHART --- */
.item-lang {
    /* Default: Top Right */
    flex: 1 1 250px;
    /* Reduced basis */
    max-width: 350px;
    order: 2;
    height: 280px;
    /* Reduced height from 350px */
}

.item-lang.lang-today {
    /* Today: Stays Top Right */
    order: 2;
    flex: 0 0 300px;
    /* Fixed width in Today view to prevent squashing */
    max-width: 300px;
}

/* --- TREND CHART --- */
.item-trend {
    /* Default: Top Left */
    flex: 10 1 400px;
    /* Grow to fill space */
    min-width: 300px;
    order: 1;
    height: 280px;
    /* Match Lang height */
}

/* --- FILES TABLE --- */
.item-files {
    /* Default: Bottom Full */
    flex: 1 1 100%;
    width: 100%;
    order: 3;
    display: flex;
    flex-direction: column;
}

.item-files h4 {
    margin: 0 0 1rem 0;
    font-weight: 500;
}

.item-files.files-today {
    /* Today: Top Left (Main) */
    order: 1;
    flex: 1 1 300px !important;
    /* Remove calculation that forces gaps */
    max-width: none;
}

/* Breakpoint for vertical stacking */
@media (max-width: 900px) {
    .main-grid {
        flex-direction: column;
    }

    .item-lang,
    .item-trend,
    .item-files {
        width: 100% !important;
        max-width: none !important;
        flex: auto !important;
        order: initial !important;
        height: auto;
    }

    .item-lang {
        height: 250px;
        /* Keep height constraint for Pie */
    }

    .item-trend {
        height: 250px;
    }
}

.table-box {
    border: 1px solid var(--vscode-widget-border);
    border-radius: 6px;
    overflow: hidden;
    background: var(--vscode-editor-background);
}

/* Base Styles */
.dashboard-root {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
}

.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title {
    margin: 0;
    font-weight: 500;
}

.range-pills {
    display: flex;
    background: var(--vscode-editor-background);
    border: 1px solid var(--vscode-widget-border);
    border-radius: 4px;
    padding: 2px;
}

.range-pills button {
    background: transparent;
    border: none;
    color: var(--vscode-foreground);
    padding: 4px 12px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 0.9em;
    opacity: 0.7;
}

.range-pills button:hover {
    opacity: 1;
}

.range-pills button.active {
    background: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
    opacity: 1;
}

.summary-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
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

.stat-card label {
    font-size: 0.85em;
    color: var(--vscode-descriptionForeground);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.stat-value {
    font-size: 1.8rem;
    font-weight: 300;
}

/* Old .charts-row and .files-row styles cleared to avoid conflicts */
.chart-box {
    background: var(--vscode-editor-background);
    border: 1px solid var(--vscode-widget-border);
    border-radius: 6px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
}

.chart-box h4 {
    margin: 0 0 1rem 0;
    font-weight: 500;
    font-size: 0.95rem;
}

.chart-inner {
    flex: 1;
    position: relative;
    min-height: 0;
}

@media (max-width: 900px) {
    .main-grid {
        flex-direction: column;
    }

    .item-lang,
    .item-trend,
    .item-files {
        flex: 1 1 auto;
        max-width: 100%;
        order: initial !important;
        /* Stack vertically on small screens */
    }

    .summary-row {
        grid-template-columns: 1fr 1fr;
    }
}
</style>