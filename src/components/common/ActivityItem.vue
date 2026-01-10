<template>
  <div class="flex items-center gap-4 p-4 bg-white dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
    <div :class="[
      'w-10 h-10 rounded-full flex items-center justify-center',
      iconBgClass
    ]">
      <el-icon class="text-xl" :class="iconColorClass">
        <component :is="icon" />
      </el-icon>
    </div>
    <div class="flex-1">
      <h4 class="font-semibold text-gray-900 dark:text-white text-sm">{{ title }}</h4>
      <p class="text-gray-600 dark:text-gray-400 text-xs">{{ description }}</p>
    </div>
    <div class="text-right">
      <div class="text-xs text-gray-500 dark:text-gray-500">{{ time }}</div>
      <div v-if="amount" :class="[
        'text-sm font-semibold',
        amountColorClass
      ]">
        {{ formatCurrency ? formatCurrency(amount) : amount }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: String, required: true },
  amount: { type: [String, Number], default: null },
  type: { type: String, default: 'default' }, // payment, due, notification, default
  icon: { type: Object, required: true },
  formatCurrency: { type: Function, default: null }
})

const iconBgClass = computed(() => {
  const classes = {
    payment: 'bg-green-100 dark:bg-green-900/30',
    due: 'bg-red-100 dark:bg-red-900/30',
    notification: 'bg-blue-100 dark:bg-blue-900/30',
    default: 'bg-gray-100 dark:bg-gray-700'
  }
  return classes[props.type] || classes.default
})

const iconColorClass = computed(() => {
  const classes = {
    payment: 'text-green-600 dark:text-green-400',
    due: 'text-red-600 dark:text-red-400',
    notification: 'text-blue-600 dark:text-blue-400',
    default: 'text-gray-600 dark:text-gray-400'
  }
  return classes[props.type] || classes.default
})

const amountColorClass = computed(() => {
  return props.type === 'payment' 
    ? 'text-green-600 dark:text-green-400' 
    : 'text-red-600 dark:text-red-400'
})
</script>
