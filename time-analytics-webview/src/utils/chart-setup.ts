import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  type ChartOptions,
} from 'chart.js';

// Register standard components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

// Helper to resolve CSS variable values
function getCssVar(name: string): string {
  const rootStyle = getComputedStyle(document.documentElement);
  let val = rootStyle.getPropertyValue(name).trim();
  if (!val) {
    const bodyStyle = getComputedStyle(document.body);
    val = bodyStyle.getPropertyValue(name).trim();
  }
  return val;
}

export function getThemeColors() {
  return {
    foreground: getCssVar('--vscode-foreground') || '#cccccc',
    background: getCssVar('--vscode-editor-background') || '#1e1e1e',
    blue: getCssVar('--vscode-charts-blue') || '#3794ff',
    orange: getCssVar('--vscode-charts-orange') || '#d18616',
    green: getCssVar('--vscode-charts-green') || '#89d185',
    purple: getCssVar('--vscode-charts-purple') || '#b180d7',
    red: getCssVar('--vscode-charts-red') || '#f14c4c',
    yellow: getCssVar('--vscode-charts-yellow') || '#cca700',
  };
}

// Simple Hex+Alpha helper to avoid crashes with non-hex colors
export function withOpacity(color: string, opacityHex: string): string {
  if (color.startsWith('#')) {
    // Ensure 6 chars if 3
    if (color.length === 4) {
      color =
        '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
    }
    return color + opacityHex;
  }
  return color;
}

// Basic formatter for minutes to H:M
function formatTime(minutes: number) {
  // Handle very small values that are not zero (e.g. 5 seconds -> 0.08m)
  if (minutes > 0 && minutes < 1) {
    const seconds = Math.max(1, Math.round(minutes * 60));
    return `${seconds}s`;
  }
  if (minutes <= 0) return '0m';
  if (minutes < 60) return `${Math.round(minutes)}m`;
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

/**
 * Generates base options that work well with VS Code themes
 */
export function useChartOptions(overrides: ChartOptions = {}): ChartOptions {
  const textColor = getCssVar('--vscode-foreground') || '#cccccc';
  const gridColor = getCssVar('--vscode-panel-border') || '#333333';
  const fontFamily = getCssVar('--vscode-font-family') || 'sans-serif';
  const fontSize = 12;

  const defaults: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    color: textColor,
    font: {
      family: fontFamily,
      size: fontSize,
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: withOpacity(gridColor, '40'),
        },
        ticks: {
          color: withOpacity(textColor, '80'),
          font: { family: fontFamily, size: 10 },
          callback: (val) => formatTime(Number(val)),
          // Removed manual stepping to allow auto-scale for small values
        },
        border: { display: false },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: textColor,
          font: { family: fontFamily, size: 10 },
        },
        border: { display: false },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: textColor,
          font: { family: fontFamily, size: fontSize },
        },
      },
      tooltip: {
        backgroundColor: getCssVar('--vscode-menu-background') || '#252526',
        titleColor: getCssVar('--vscode-menu-foreground') || '#cccccc',
        bodyColor: getCssVar('--vscode-menu-foreground') || '#cccccc',
        borderColor:
          getCssVar('--vscode-menu-border') ||
          getCssVar('--vscode-focusBorder') ||
          '#454545',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 6,
        displayColors: true,
        position: 'nearest',
        yAlign: 'bottom',
        callbacks: {
          title: (items) => {
            if (!items.length) return '';
            return items[0]?.label || '';
          },
          label: (item) => {
            const val = Number(item.raw || 0);
            return ` ${item.dataset.label}: ${formatTime(val)}`;
          },
        },
      },
    },
  };
  return defaults;
}
