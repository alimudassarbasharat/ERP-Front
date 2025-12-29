<template>
  <div class="relative w-full h-full">
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-lg z-10">
      <div class="flex items-center gap-3">
        <IconLoader2 :size="20" class="text-indigo-600 animate-spin" stroke-width="2" />
        <span class="text-indigo-600 font-medium text-sm">Loading chart...</span>
      </div>
    </div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { IconLoader2 } from '@tabler/icons-vue'

Chart.register(...registerables)

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
    validator: (value) => ['bar', 'line', 'pie', 'doughnut', 'radar', 'polarArea'].includes(value)
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

const defaultOptions = {
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
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(31, 41, 55, 0.95)',
      padding: 12,
      titleFont: { size: 14, weight: 'bold' },
      bodyFont: { size: 13 },
      titleColor: '#F9FAFB',
      bodyColor: '#F9FAFB',
      cornerRadius: 8,
      displayColors: true
    }
  },
  animation: {
    duration: 1500,
    easing: 'easeOutQuart'
  }
}

const initChart = () => {
  if (!chartCanvas.value) return

  const ctx = chartCanvas.value.getContext('2d')
  if (!ctx) return

  // Destroy existing chart
  if (chartInstance) {
    chartInstance.destroy()
  }

  // Merge default options with custom options
  const mergedOptions = {
    ...defaultOptions,
    ...props.options,
    plugins: {
      ...defaultOptions.plugins,
      ...(props.options.plugins || {})
    }
  }

  chartInstance = new Chart(ctx, {
    type: props.type,
    data: props.data,
    options: mergedOptions
  })
}

const updateChart = () => {
  if (chartInstance && props.data) {
    chartInstance.data = props.data
    chartInstance.update('active')
  }
}

const destroyChart = () => {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
}

// Watch for data changes
watch(() => props.data, () => {
  updateChart()
}, { deep: true })

watch(() => props.type, () => {
  initChart()
})

onMounted(() => {
  initChart()
})

onBeforeUnmount(() => {
  destroyChart()
})

defineExpose({
  chart: chartInstance,
  update: updateChart,
  destroy: destroyChart
})
</script>

<style scoped>
canvas {
  max-height: v-bind(height);
}
</style>

