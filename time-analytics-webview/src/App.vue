<script setup lang="ts">
import { onMounted } from 'vue';
import { useAnalyticsStore } from './stores/analytics';
import { mockInitialData } from './mocks/mock-data';

// Development helper: Load mock data if we are running in browser (not VS Code)
onMounted(() => {
  const isVsCode = 'acquireVsCodeApi' in window;
  if (!isVsCode) {
    console.log('Detected browser environment, loading mock data...');
    const store = useAnalyticsStore();
    store.handleMessage({
      type: 'initialData',
      data: mockInitialData
    });
  }
});
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped></style>
