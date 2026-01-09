<script setup lang="ts">
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { useChartOptions, getThemeColors, withOpacity } from '@/utils/chart-setup';
import type { ChartData, ScriptableContext } from 'chart.js';

const props = defineProps<{
    data: { label: string; active: number; idle: number; isCurrent?: boolean }[];
    horizontal?: boolean;
}>();

const plugins = [{
    id: 'current-indicator',
    afterDatasetsDraw(chart: any) {
        const { ctx, chartArea, scales } = chart;
        const colors = getThemeColors();
        const xScale = scales.x;

        props.data.forEach((d, index) => {
            if (d.isCurrent) {
                const meta = chart.getDatasetMeta(0);
                if (!meta.data[index]) return;

                const x = meta.data[index].x;

                // Position below the X-axis labels
                // xScale.bottom is the bottom edge of the axis area (including labels)
                const yTip = xScale.bottom + 4;
                const yBase = yTip + 6;

                ctx.save();

                // Indicator Triangle pointing UP towards the label
                ctx.beginPath();
                ctx.fillStyle = colors.red;
                ctx.moveTo(x, yTip);           // Top point (Tip)
                ctx.lineTo(x - 5, yBase);      // Bottom left
                ctx.lineTo(x + 5, yBase);      // Bottom right
                ctx.closePath();
                ctx.fill();

                ctx.restore();
            }
        });
    }
}];

const chartData = computed<ChartData<'bar'>>(() => {
    const colors = getThemeColors();

    return {
        labels: props.data.map(d => d.label),
        datasets: [
            {
                label: 'Active',
                backgroundColor: (ctx: ScriptableContext<'bar'>) => {
                    const chart = ctx.chart;
                    const { ctx: canvasMs, chartArea } = chart;
                    if (!chartArea) return colors.blue;

                    try {
                        const gradient = canvasMs.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                        gradient.addColorStop(0, colors.blue);
                        gradient.addColorStop(1, withOpacity(colors.blue, 'B3')); // ~70% 
                        return gradient;
                    } catch (e) {
                        return colors.blue;
                    }
                },
                hoverBackgroundColor: withOpacity(colors.blue, 'dd'),
                borderWidth: 0,
                borderRadius: 4,
                data: props.data.map(d => d.active),
                maxBarThickness: 12,
                stack: 'total',
            },
            {
                label: 'Idle',
                backgroundColor: (ctx: ScriptableContext<'bar'>) => {
                    const chart = ctx.chart;
                    const { ctx: canvasMs, chartArea } = chart;
                    if (!chartArea) return withOpacity(colors.foreground, '20');

                    try {
                        const gradient = canvasMs.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                        // Smooth transition from Active's top color? 
                        // Approximate visual continuity:
                        gradient.addColorStop(0, withOpacity(colors.foreground, '10'));
                        gradient.addColorStop(1, withOpacity(colors.foreground, '40'));
                        return gradient;
                    } catch (e) {
                        return withOpacity(colors.foreground, '30');
                    }
                },
                hoverBackgroundColor: withOpacity(colors.foreground, '40'),
                borderWidth: 0,
                borderRadius: 4,
                data: props.data.map(d => d.idle),
                maxBarThickness: 12,
                stack: 'total',
            }
        ]
    };
});


const chartOptions = computed(() => {
    const opts = useChartOptions();
    if (props.horizontal) {
        opts.indexAxis = 'y';
    }

    // Ensure scales are configured for stacking
    if (!opts.scales) opts.scales = {};

    opts.scales.x = { ...opts.scales.x, stacked: true };
    opts.scales.y = { ...opts.scales.y, stacked: true };

    // Update tooltip mode for stacked
    if (opts.plugins && opts.plugins.tooltip) {
        opts.plugins.tooltip.mode = 'index';
        opts.plugins.tooltip.intersect = false;
    }

    // Add padding at bottom for the indicator triangle
    if (!opts.layout) opts.layout = {};
    const existingPadding = typeof opts.layout.padding === 'object' ? opts.layout.padding : { top: 0, bottom: 0, left: 0, right: 0 };
    opts.layout.padding = {
        ...existingPadding,
        bottom: 20 // Ensure space for the arrow below axis labels
    };

    return opts as any;
});
</script>

<template>
    <div class="chart-container">
        <Bar :data="chartData" :options="chartOptions" :plugins="plugins" />
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
