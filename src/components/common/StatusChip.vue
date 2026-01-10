<template>
  <span :class="[
    'text-xs font-bold px-2 py-1 rounded-full',
    chipClass
  ]">
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  status: { type: String, default: 'default' } // success, warning, danger, info, default
})

const chipClass = computed(() => {
  const classes = {
    success: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30',
    warning: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30',
    danger: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30',
    info: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30',
    default: 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700'
  }
  return classes[props.status] || classes.default
})
</script>
