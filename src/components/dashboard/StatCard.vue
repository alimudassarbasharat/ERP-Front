<template>
  <div 
    class="group relative overflow-hidden rounded-xl border border-gray-200/80 dark:border-gray-700/80 bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-800/70 backdrop-blur-xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer"
    @click="$emit('click', stat)"
  >
    <!-- Animated gradient overlay on hover -->
    <div class="absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-purple-50/0 to-pink-50/0 dark:from-indigo-900/0 dark:via-purple-900/0 dark:to-pink-900/0 group-hover:from-indigo-50/20 group-hover:via-purple-50/15 group-hover:to-pink-50/20 dark:group-hover:from-indigo-900/20 dark:group-hover:via-purple-900/15 dark:group-hover:to-pink-900/20 transition-all duration-500 pointer-events-none"></div>
    <div class="relative z-10">
    <div class="flex items-start gap-3">
      <!-- Icon Container -->
      <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0" :class="iconBgClass">
        <component 
          :is="stat.icon" 
          :size="20"
          :stroke-width="2" 
          class="sm:w-6 sm:h-6"
          :class="iconColorClass"
          aria-hidden="true"
        />
      </div>
      
      <!-- Content -->
      <div class="flex-1 min-w-0">
        <p class="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-300 tracking-wide uppercase mb-1">{{ stat.label }}</p>
        <p class="text-base sm:text-lg font-black text-gray-900 dark:text-white tracking-tight mb-1.5">
          {{ formattedValue }}
        </p>
        <div class="flex items-center gap-1.5">
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full" :class="badgeClass">{{ stat.change }}</span>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { TrendingUp, TrendingDown } from 'lucide-vue-next'

/**
 * StatCard Component
 * Modern, responsive statistics card with animations and hover effects
 */
const props = defineProps({
  stat: {
    type: Object,
    required: true,
    validator: (value) => {
      return value && typeof value === 'object' && 'label' in value && 'value' in value
    }
  }
})

defineEmits({
  click: (stat) => stat && typeof stat === 'object'
})

// Format number with commas (Pakistan format)
const formatNumber = (num) => {
  if (typeof num !== 'number') return num
  return num.toLocaleString('en-PK', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

// Computed formatted value
const formattedValue = computed(() => {
  const prefix = props.stat.prefix || ''
  const suffix = props.stat.suffix || ''
  return `${prefix}${formatNumber(props.stat.value)}${suffix}`
})

// Icon background and color classes based on stat type
const iconBgClass = computed(() => {
  const label = props.stat.label?.toLowerCase() || ''
  if (label.includes('total fee') && !label.includes('received')) {
    return 'bg-gradient-to-br from-green-100 to-emerald-100'
  } else if (label.includes('received')) {
    return 'bg-gradient-to-br from-blue-100 to-indigo-100'
  } else if (label.includes('present')) {
    return 'bg-gradient-to-br from-purple-100 to-pink-100'
  } else if (label.includes('absent')) {
    return 'bg-gradient-to-br from-red-100 to-pink-100'
  }
  // Default fallback
  return props.stat.iconBg || 'bg-gradient-to-br from-gray-100 to-gray-200'
})

const iconColorClass = computed(() => {
  const label = props.stat.label?.toLowerCase() || ''
  if (label.includes('total fee') && !label.includes('received')) {
    return 'text-green-600'
  } else if (label.includes('received')) {
    return 'text-blue-600'
  } else if (label.includes('present')) {
    return 'text-purple-600'
  } else if (label.includes('absent')) {
    return 'text-red-600'
  }
  return 'text-gray-600'
})

// Badge class based on trend
const badgeClass = computed(() => {
  const change = props.stat.change || ''
  if (change.includes('+') || change.toLowerCase().includes('up')) {
    return 'text-green-600 bg-green-100'
  } else if (change.includes('-') || change.toLowerCase().includes('down')) {
    return 'text-red-600 bg-red-100'
  }
  // Default for neutral or unknown
  return 'text-blue-600 bg-blue-100'
})
</script>

