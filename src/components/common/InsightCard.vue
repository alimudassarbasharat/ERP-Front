<template>
  <div :class="[
    'p-4 rounded-lg border',
    colorClass
  ]">
    <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{{ label }}</p>
    <p :class="[
      'text-lg font-bold mb-1',
      valueColorClass
    ]">
      {{ value }}
    </p>
    <p v-if="description" class="text-xs text-gray-600 dark:text-gray-400 mt-1">{{ description }}</p>
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  description: { type: String, default: null },
  color: { type: String, default: 'orange' } // orange, blue, green, purple, red
})

const colorClass = computed(() => {
  const colors = {
    orange: 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800',
    blue: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800',
    green: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800',
    purple: 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800',
    red: 'bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-800'
  }
  return colors[props.color] || colors.orange
})

const valueColorClass = computed(() => {
  const colors = {
    orange: 'text-orange-600 dark:text-orange-400',
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    red: 'text-red-600 dark:text-red-400'
  }
  return colors[props.color] || colors.orange
})
</script>
