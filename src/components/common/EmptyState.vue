<template>
  <div class="text-center py-12 px-4">
    <el-icon :class="[
      'text-6xl mb-4',
      iconColorClass
    ]">
      <component :is="icon" />
    </el-icon>
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ title }}</h3>
    <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">{{ description }}</p>
    <slot name="action">
      <el-button v-if="actionLabel" type="primary" @click="$emit('action')">
        {{ actionLabel }}
      </el-button>
    </slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: Object, default: null },
  iconColor: { type: String, default: 'gray' }, // gray, blue, green, orange
  actionLabel: { type: String, default: null }
})

const iconColorClass = computed(() => {
  const colors = {
    gray: 'text-gray-300 dark:text-gray-600',
    blue: 'text-blue-300 dark:text-blue-600',
    green: 'text-green-300 dark:text-green-600',
    orange: 'text-orange-300 dark:text-orange-600'
  }
  return colors[props.iconColor] || colors.gray
})

defineEmits(['action'])
</script>
