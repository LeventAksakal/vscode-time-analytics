<script setup lang="ts">
defineProps<{
    label: string;
    value: string | number;
    subtext?: string;
    color?: string; // hex or css var
}>();
</script>

<template>
    <div class="stat-card">
        <div class="stat-header">
            <div v-if="color" class="indicator" :style="{ backgroundColor: color }"></div>
            <span class="label">{{ label }}</span>
        </div>
        <div class="value">{{ value }}</div>
        <div v-if="subtext" class="subtext">{{ subtext }}</div>
    </div>
</template>

<style scoped>
.stat-card {
    background-color: var(--bg-highlight);
    /* or var(--vscode-editor-background) with border */
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    min-width: 140px;
    flex: 1;
}

.stat-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
}

.indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.label {
    font-size: 0.85em;
    color: var(--text-muted);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.value {
    font-size: 1.5em;
    font-weight: 600;
    color: var(--text-primary);
}

.subtext {
    font-size: 0.85em;
    color: var(--text-muted);
    margin-top: 4px;
}
</style>
