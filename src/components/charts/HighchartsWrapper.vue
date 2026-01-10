<template>
  <div class="relative w-full h-full">
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-lg z-10">
      <div class="flex items-center gap-3">
        <IconLoader2 :size="20" class="text-indigo-600 animate-spin" stroke-width="2" />
        <span class="text-indigo-600 font-medium text-sm">Loading chart...</span>
      </div>
    </div>
    <div ref="chartContainer" :style="{ height: height }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Highcharts from 'highcharts'
import { IconLoader2 } from '@tabler/icons-vue'

/**
 * HighchartsWrapper Component
 * 
 * A reusable wrapper for Highcharts with modern styling and responsive design
 * 
 * @component
 */
const props = defineProps({
  /**
   * Chart configuration object
   * @type {Object}
   * @required
   */
  options: {
    type: Object,
    required: true
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

const chartContainer = ref(null)
let chartInstance = null

const defaultOptions = {
  chart: {
    backgroundColor: 'transparent',
    style: {
      fontFamily: 'Inter, system-ui, sans-serif'
    }
  },
  credits: {
    enabled: false
  },
  accessibility: {
    enabled: false // Disable accessibility module to remove warning
  },
  title: {
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#111827'
    }
  },
  legend: {
    itemStyle: {
      fontSize: '12px',
      fontWeight: '500',
      color: '#374151'
    }
  },
  tooltip: {
    backgroundColor: 'rgba(31, 41, 55, 0.95)',
    style: {
      color: '#F9FAFB',
      fontSize: '13px'
    },
    borderRadius: 8,
    padding: 12
  },
  plotOptions: {
    series: {
      animation: {
        duration: 1500
      }
    }
  }
}

const initChart = () => {
  if (!chartContainer.value) return

  // Destroy existing chart
  if (chartInstance) {
    chartInstance.destroy()
  }

  // Merge default options with custom options
  const mergedOptions = Highcharts.merge(defaultOptions, props.options)

  chartInstance = Highcharts.chart(chartContainer.value, mergedOptions)
}

const updateChart = () => {
  if (chartInstance && props.options) {
    chartInstance.update(props.options, true, true)
  }
}

const destroyChart = () => {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
}

// Watch for options changes
watch(() => props.options, () => {
  updateChart()
}, { deep: true })

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

