<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAnalyticsStore } from '@/stores/analytics';
import { getThemeColors } from '@/utils/chart-setup';
import FileActivityTable from '@/components/FileActivityTable.vue';

const store = useAnalyticsStore();
const theme = getThemeColors();

// --- Types & Data ---
interface SearchFilters {
    path: string;
    author: string;
    branch: string;
    startDate: string; // YYYY-MM-DD
    endDate: string;   // YYYY-MM-DD
}

const filters = ref<SearchFilters>({
    path: '',
    author: '',
    branch: '',
    startDate: '',
    endDate: ''
});

// --- Date Helpers ---
function parseDateKey(key: string): Date | null {
    // Key format: DD-MM-YYYY
    const parts = key.split('-');
    if (parts.length !== 3) return null;
    const d = parseInt(parts[0] || '1', 10);
    const m = parseInt(parts[1] || '1', 10) - 1;
    const y = parseInt(parts[2] || '1970', 10);
    return new Date(y, m, d);
}

function parseInputDate(str: string): Date | null {
    // Input format: YYYY-MM-DD
    if (!str) return null;
    return new Date(str);
}

// --- Bucket Parsing ---
function parseBucketKey(k: string) {
    // Format: DD-MM-YYYY,<auth>,<branch>,<relpath>
    const first = k.indexOf(',');
    if (first < 0) return null;
    const second = k.indexOf(',', first + 1);
    if (second < 0) return null;
    const third = k.indexOf(',', second + 1);
    // If no branch (old schema), third might be missing? 
    // But we confirmed new schema has it. 
    // If third < 0, maybe it's the old schema without branch?
    // Let's assume standard format or fail gracefully.

    if (third < 0) {
        // Fallback or skip? Let's skip to be safe, or assume rest is path
        // Old Schema: Date,Auth,Path ?
        // If strict 0.1.5+ compliance:
        return null;
    }

    const dateStr = k.substring(0, first);
    const auth = k.substring(first + 1, second);
    const branch = k.substring(second + 1, third);
    const path = k.substring(third + 1);

    return { dateStr, auth, branch, path };
}

// --- Fuzzy Search Logic ---
function fuzzyMatch(query: string, text: string): boolean {
    if (!query) return true;
    const q = query.toLowerCase();
    const t = text.toLowerCase();
    let qIdx = 0;
    let tIdx = 0;
    while (qIdx < q.length && tIdx < t.length) {
        if (q[qIdx] === t[tIdx]) qIdx++;
        tIdx++;
    }
    return qIdx === q.length;
}

const hasSearchInput = computed(() => {
    return Object.values(filters.value).some(v => v.trim() !== '');
});

const filteredResults = computed(() => {
    if (!hasSearchInput.value && Object.keys(store.buckets).length > 200) {
        // Optimization: Don't show everything if no filter and dataset is huge
        // But for "Dashboard" behavior, user might want to see *something*.
        // SearchTab usually implies searching. 
        return [];
    }

    const start = parseInputDate(filters.value.startDate);
    const end = parseInputDate(filters.value.endDate);

    // Aggregation Map: Key = "PATH::BRANCH"
    const agg: Record<string, { path: string, branch: string, active: number, idle: number }> = {};

    for (const [k, v] of Object.entries(store.buckets)) {
        const parsed = parseBucketKey(k);
        if (!parsed) continue;

        const { dateStr, auth, branch, path } = parsed;

        // 1. Path Filter (Fuzzy)
        if (filters.value.path && !fuzzyMatch(filters.value.path, path)) continue;

        // 2. Author Filter (Substring)
        if (filters.value.author && !auth.toLowerCase().includes(filters.value.author.toLowerCase())) continue;

        // 3. Branch Filter (Substring)
        // Handle "null" or "unknown" if desired, but here specific filter
        if (filters.value.branch && !branch.toLowerCase().includes(filters.value.branch.toLowerCase())) continue;

        // 4. Date Range
        if (start || end) {
            const dateObj = parseDateKey(dateStr);
            if (!dateObj) continue; // Invalid date in key

            // Allow start/end to be inclusive
            if (start && dateObj < start) continue;
            if (end && dateObj > end) continue;
        }

        // Aggregate
        const key = `${path}::${branch}`;
        if (!agg[key]) {
            agg[key] = { path, branch, active: 0, idle: 0 };
        }
        agg[key].active += v.active || 0;
        agg[key].idle += v.idle || 0;
    }

    // Convert to Array & Sort
    return Object.values(agg).sort((a, b) => b.active - a.active);
});
</script>

<template>
    <div class="search-container">
        <!-- Filter Form -->
        <div class="filters-box">
            <!-- Row 1: File Path -->
            <div class="filter-row full-width">
                <label>File Path</label>
                <input type="text" v-model="filters.path" placeholder="Search files (fuzzy)..." class="vs-input"
                    autofocus />
            </div>

            <!-- Row 2: Metadata grid -->
            <div class="filter-grid">
                <div class="filter-group">
                    <label>Author</label>
                    <input type="text" v-model="filters.author" placeholder="Filter by author..." class="vs-input" />
                </div>
                <div class="filter-group">
                    <label>Branch</label>
                    <input type="text" v-model="filters.branch" placeholder="Filter by branch..." class="vs-input" />
                </div>
                <!-- Hash removed as it is not in the bucket key schema -->

                <div class="filter-group date-group">
                    <label>Start Date</label>
                    <input type="date" v-model="filters.startDate" class="vs-input" />
                </div>
                <div class="filter-group date-group">
                    <label>End Date</label>
                    <input type="date" v-model="filters.endDate" class="vs-input" />
                </div>
            </div>
        </div>

        <!-- Results Area -->
        <div class="results-area">
            <!-- Empty State -->
            <div v-if="!hasSearchInput" class="empty-state">
                <div class="empty-icon" :style="{ color: theme.foreground + '40' }">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" class="filter-svg"
                        stroke="currentColor">
                        <path stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
                <h4>Start searching</h4>
                <p>Use the filters above to search specific activity logs</p>
            </div>

            <!-- No Results -->
            <div v-else-if="filteredResults.length === 0" class="empty-state">
                <p>No matches found.</p>
            </div>

            <!-- Results List -->
            <div v-else class="results-list">
                <div class="results-meta">
                    Found {{ filteredResults.length }} matching entries
                </div>
                <FileActivityTable :files="filteredResults" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.search-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1.5rem;
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
}

.filters-box {
    background-color: var(--vscode-editor-background);
    border: 1px solid var(--vscode-widget-border);
    border-radius: 6px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.filter-row {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.filter-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.filter-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

label {
    font-size: 0.85em;
    color: var(--vscode-descriptionForeground);
    font-weight: 500;
}

.vs-input {
    background: var(--vscode-input-background);
    color: var(--vscode-input-foreground);
    border: 1px solid var(--vscode-input-border);
    padding: 6px 8px;
    border-radius: 2px;
    outline: none;
}

.vs-input:focus {
    border-color: var(--vscode-focusBorder);
}

.results-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
}

.empty-state {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--vscode-descriptionForeground);
    opacity: 0.8;
}

.empty-icon {
    margin-bottom: 1rem;
    opacity: 0.5;
}

.results-meta {
    margin-bottom: 0.5rem;
    font-size: 0.9em;
    color: var(--vscode-descriptionForeground);
}
</style>