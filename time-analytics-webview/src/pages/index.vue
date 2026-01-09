<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAnalyticsStore } from '@/stores/analytics';
import TimelineTab from '@/components/TimelineTab.vue';
import SearchTab from '@/components/SearchTab.vue';
import SettingsTab from '@/components/SettingsTab.vue';

const store = useAnalyticsStore();

type TabId = 'timeline' | 'search' | 'settings';

const currentTab = ref<TabId>('timeline');

const tabs = [
    { id: 'timeline' as const, label: 'Dashboard', component: TimelineTab },
    { id: 'search' as const, label: 'Search', component: SearchTab },
    { id: 'settings' as const, label: 'Settings', component: SettingsTab },
];

const activeComponent = computed(() => {
    return tabs.find(t => t.id === currentTab.value)?.component;
});
</script>

<template>
    <div class="page-container">
        <header class="navbar">
            <div class="workspace-section" v-if="store.workspaceName">
                <div class="workspace-pill">
                    <span class="icon">📂</span>
                    <span class="name">{{ store.workspaceName }}</span>
                </div>
            </div>

            <div class="divider"></div>

            <nav class="tab-list" role="tablist">
                <button v-for="tab in tabs" :key="tab.id" role="tab" class="tab-btn"
                    :class="{ active: currentTab === tab.id }" :aria-selected="currentTab === tab.id"
                    @click="currentTab = tab.id">
                    {{ tab.label }}
                </button>
            </nav>
        </header>

        <main class="content-area">
            <KeepAlive>
                <component :is="activeComponent" />
            </KeepAlive>
        </main>
    </div>
</template>

<style scoped>
.page-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--vscode-editor-background);
}

.navbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
    background-color: var(--vscode-editor-background);
    padding: 0 1rem;
    height: 50px;
    flex-shrink: 0;
}

.workspace-section {
    display: flex;
    align-items: center;
    padding-right: 1.5rem;
}

.workspace-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.1em;
    font-weight: 600;
    color: var(--text-primary);
    max-width: 250px;
}

.workspace-pill .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.divider {
    width: 1px;
    height: 24px;
    background-color: var(--border-color);
    margin-right: 1.5rem;
}

.tab-list {
    display: flex;
    gap: 1.5rem;
    height: 100%;
}

.tab-btn {
    background: none;
    border: none;
    padding: 0 0.5rem;
    color: var(--text-muted);
    font-size: 1.1em;
    /* Larger font size */
    font-weight: 500;
    /* More weight */
    cursor: pointer;
    position: relative;
    transition: all 0.2s;
    height: 100%;
    display: flex;
    align-items: center;
    border-bottom: 2px solid transparent;
}

.tab-btn:hover {
    color: var(--text-primary);
    background-color: transparent;
}

.tab-btn.active {
    color: var(--text-primary);
    font-weight: 700;
    /* Even bolder for active state */
    border-bottom-color: var(--focus-border);
}

.content-area {
    flex: 1;
    overflow-y: auto;
    padding-top: 1.5rem;
    /* Additional spacing from navbar */
    position: relative;
}
</style>