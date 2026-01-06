<script setup lang="ts">
import DailySummary from '@/components/DailySummary.vue';
import FilesView from '@/components/FilesView.vue';
import SettingsView from '@/components/SettingsView.vue';
import { useAnalyticsStore } from '@/stores/analytics';
import { computed, ref } from 'vue';

const store = useAnalyticsStore();
const currentTab = ref('summary');

const workspaceName = computed(() => {
    // In a real app, we might get this from the extension
    // For now, we can just show a generic title or nothing
    return 'Workspace Analytics';
});

const tabs = [
    { id: 'summary', label: 'Daily Summary' },
    { id: 'files', label: 'Files' },
    { id: 'settings', label: 'Settings' }
];
</script>

<template>
    <div class="app-container">
        <header class="app-header">
            <h1>{{ workspaceName }}</h1>
            <div class="meta-info">
                <span v-if="store.loading">Loading...</span>
                <span v-else>Last updated: {{ new Date().toLocaleTimeString() }}</span>
            </div>
        </header>

        <nav class="app-nav">
            <button v-for="tab in tabs" :key="tab.id" :class="['nav-tab', { active: currentTab === tab.id }]"
                @click="currentTab = tab.id">
                {{ tab.label }}
            </button>
        </nav>

        <main class="app-content">
            <DailySummary v-if="currentTab === 'summary'" />
            <FilesView v-else-if="currentTab === 'files'" />
            <SettingsView v-else-if="currentTab === 'settings'" />
        </main>
    </div>
</template>

<style scoped>
.app-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 100%;
    overflow: hidden;
}

.app-header {
    padding: 1rem;
    border-bottom: 1px solid var(--vscode-widget-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--vscode-editor-background);
}

.app-header h1 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: normal;
    color: var(--vscode-foreground);
}

.meta-info {
    font-size: 0.8rem;
    color: var(--vscode-descriptionForeground);
}

.app-nav {
    display: flex;
    padding: 0 1rem;
    background: var(--vscode-editor-background);
    border-bottom: 1px solid var(--vscode-widget-border);
}

.nav-tab {
    background: none;
    border: none;
    padding: 0.8rem 1rem;
    color: var(--vscode-foreground);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    opacity: 0.7;
    transition: all 0.2s;
}

.nav-tab:hover {
    opacity: 1;
    background: var(--vscode-toolbar-hoverBackground);
}

.nav-tab.active {
    opacity: 1;
    border-bottom-color: var(--vscode-activityBar-activeBorder);
    font-weight: bold;
}

.app-content {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
}
</style>
