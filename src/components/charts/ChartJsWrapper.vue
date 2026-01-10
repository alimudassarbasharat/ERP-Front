<template>
  <div class="relative w-full h-full">
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg z-10">
      <div class="flex items-center gap-3">
        <IconLoader2 :size="20" class="text-indigo-600 dark:text-indigo-400 animate-spin" stroke-width="2" />
        <span class="text-indigo-600 dark:text-indigo-400 font-medium text-sm">Loading chart...</span>
      </div>
    </div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick, computed } from 'vue'
import { Chart, registerables } from 'chart.js'
import { IconLoader2 } from '@tabler/icons-vue'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'

Chart.register(...registerables)

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

/**
 * ChartJsWrapper Component
 * 
 * A reusable wrapper for Chart.js with modern styling and responsive design
 * 
 * @component
 */
const props = defineProps({
  /**
   * Chart type (bar, line, pie, doughnut, etc.)
   * @type {String}
   * @required
   */
  type: {
    type: String,
    required: true,
    validator: (value) => ['bar', 'line', 'area', 'pie', 'doughnut', 'radar', 'polarArea'].includes(value)
  },

  /**
   * Chart data
   * @type {Object}
   * @required
   */
  data: {
    type: Object,
    required: true
  },

  /**
   * Chart options
   * @type {Object}
   * @default () => ({})
   */
  options: {
    type: Object,
    default: () => ({})
  },

  /**
   * Loading state
   * @type {Boolean}
   * @default false
   */
  loading: {
    type: Boolean,
    default: false
  },

  /**
   * Chart height
   * @type {String}
   * @default '320px'
   */
  height: {
    type: String,
    default: '320px'
  }
})

const chartCanvas = ref(null)
let chartInstance = null

// Computed default options that react to dark mode
const defaultOptions = computed(() => {
  const textColor = isDark.value ? '#e5e7eb' : '#374151'
  const gridColor = isDark.value ? 'rgba(229, 231, 235, 0.1)' : 'rgba(229, 231, 235, 0.5)'
  const tooltipBg = isDark.value ? 'rgba(31, 41, 55, 0.95)' : 'rgba(17, 24, 39, 0.95)'
  const tooltipText = isDark.value ? '#f9fafb' : '#ffffff'
  
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            weight: '500'
          },
          color: textColor
        }
      },
      tooltip: {
        backgroundColor: tooltipBg,
        padding: 12,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        titleColor: tooltipText,
        bodyColor: tooltipText,
        cornerRadius: 8,
        displayColors: true,
        borderColor: isDark.value ? 'rgba(75, 85, 99, 0.5)' : 'rgba(156, 163, 175, 0.5)',
        borderWidth: 1
      }
    },
    scales: props.type !== 'pie' && props.type !== 'doughnut' && props.type !== 'radar' && props.type !== 'polarArea' ? {
      x: {
        ticks: {
          color: textColor,
          font: {
            size: 11
          }
        },
        grid: {
          color: gridColor,
          drawBorder: false
        }
      },
      y: {
        ticks: {
          color: textColor,
          font: {
            size: 11
          }
        },
        grid: {
          color: gridColor,
          drawBorder: false
        }
      }
    } : {},
    animation: {
      duration: 1500,
      easing: 'easeOutQuart'
    }
  }
})

const initChart = () => {
  if (!chartCanvas.value) return

  const ctx = chartCanvas.value.getContext('2d')
  if (!ctx) return

  // Destroy existing chart properly
  if (chartInstance) {
    try {
      chartInstance.destroy()
    } catch (e) {
      console.warn('Error destroying chart:', e)
    }
    chartInstance = null
  }

  // Convert "area" type to "line" with fill
  const chartType = props.type === 'area' ? 'line' : props.type
  
  // Prepare data - if area chart, add fill to datasets
  let chartData = { ...props.data }
  if (props.type === 'area' && chartData.datasets) {
    chartData = {
      ...chartData,
      datasets: chartData.datasets.map(dataset => ({
        ...dataset,
        fill: true,
        tension: 0.4
      }))
    }
  }

  // Merge default options with custom options
  const baseOptions = defaultOptions.value
  const mergedOptions = {
    ...baseOptions,
    ...props.options,
    plugins: {
      ...baseOptions.plugins,
      ...(props.options.plugins || {})
    }
  }
  
  // Only merge scales if they exist in base options (for chart types that support scales)
  if (baseOptions.scales && Object.keys(baseOptions.scales).length > 0) {
    mergedOptions.scales = {
      ...baseOptions.scales,
      ...(props.options.scales || {})
    }
  } else if (props.options.scales) {
    // If custom scales are provided but base doesn't have scales, use custom
    mergedOptions.scales = props.options.scales
  }

  try {
    chartInstance = new Chart(ctx, {
      type: chartType,
      data: chartData,
      options: mergedOptions
    })
  } catch (error) {
    console.error('Error initializing chart:', error)
    chartInstance = null
  }
}

const updateChart = () => {
  if (!chartInstance || !props.data) return
  
  try {
    // Check if chart is still valid (not destroyed)
    if (chartInstance.canvas && chartInstance.canvas.parentNode) {
      // Convert "area" type to "line" with fill
      let chartData = { ...props.data }
      if (props.type === 'area' && chartData.datasets) {
        chartData = {
          ...chartData,
          datasets: chartData.datasets.map(dataset => ({
            ...dataset,
            fill: true,
            tension: 0.4
          }))
        }
      }
      
      chartInstance.data = chartData
      chartInstance.update('active')
    } else {
      // Chart was destroyed, reinitialize
      initChart()
    }
  } catch (error) {
    console.error('Error updating chart:', error)
    // Try to reinitialize if update fails
    initChart()
  }
}

const destroyChart = () => {
  if (chartInstance) {
    try {
      // Check if chart is still valid before destroying
      if (chartInstance.canvas && chartInstance.canvas.parentNode) {
        chartInstance.destroy()
      }
    } catch (error) {
      console.warn('Error destroying chart:', error)
    } finally {
      chartInstance = null
    }
  }
}

// Watch for data changes
watch(() => props.data, () => {
  if (chartInstance) {
    updateChart()
  } else {
    nextTick(() => {
      initChart()
    })
  }
}, { deep: true })

watch(() => props.type, () => {
  nextTick(() => {
    initChart()
  })
})

// Watch for theme changes and update chart
watch(() => isDark.value, () => {
  if (chartInstance) {
    nextTick(() => {
      // Update chart options with new theme colors
      const baseOptions = defaultOptions.value
      const mergedOptions = {
        ...baseOptions,
        ...props.options,
        plugins: {
          ...baseOptions.plugins,
          ...(props.options.plugins || {})
        }
      }
      
      // Only merge scales if they exist in base options
      if (baseOptions.scales && Object.keys(baseOptions.scales).length > 0) {
        mergedOptions.scales = {
          ...baseOptions.scales,
          ...(props.options.scales || {})
        }
      } else if (props.options.scales) {
        mergedOptions.scales = props.options.scales
      }
      
      chartInstance.options = mergedOptions
      chartInstance.update('none') // Update without animation for theme change
    })
  }
})

onMounted(() => {
  initChart()
})

onBeforeUnmount(() => {
  destroyChart()
})

defineExpose({
  get chart() {
    return chartInstance
  },
  update: updateChart,
  destroy: destroyChart
})
</script>

<style scoped>
canvas {
  max-height: v-bind(height);
}
</style>

