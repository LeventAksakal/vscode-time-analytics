<script setup lang="ts">
import { computed } from 'vue';
import { Pie } from 'vue-chartjs';
import { useChartOptions, getThemeColors } from '@/utils/chart-setup';
import type { ChartData, ChartOptions } from 'chart.js';

const props = defineProps<{
    data: { label: string; value: number }[];
}>();

const chartData = computed<ChartData<'pie'>>(() => {
    const c = getThemeColors();
    const palette = [c.blue, c.red, c.yellow, c.green, c.orange, c.purple];

    return {
        labels: props.data.map(d => d.label),
        datasets: [
            {
                data: props.data.map(d => d.value),
                backgroundColor: props.data.map((_, i) => palette[i % palette.length]),
                borderWidth: 1,
                borderColor: c.background, // Match background for separation
            }
        ]
    };
});

const chartOptions = computed(() => {
    const opts = useChartOptions() as ChartOptions<'pie'>;
    // Pie charts don't use cartesian scales
    if (opts.scales) {
        delete opts.scales;
    }
    return opts;
});
</script>

<template>
    <div class="chart-container">
        <Pie :data="chartData" :options="chartOptions" />
    </div>
</template>

<style scoped>
.chart-container {
    position: relative;
    height: 100%;
    width: 100%;
    min-height: 250px;
}
</style>
