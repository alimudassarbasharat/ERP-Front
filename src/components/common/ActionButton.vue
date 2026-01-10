<template>
  <button 
    :class="[
      'px-4 py-2.5 text-white text-sm font-medium rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2',
      variant === 'primary' ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' :
      variant === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600' :
      variant === 'info' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600' :
      variant === 'warning' ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600' :
      'bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
    ]"
    :disabled="disabled || loading"
    @click="$emit('click')"
  >
    <el-icon v-if="loading" class="animate-spin"><Loading /></el-icon>
    <el-icon v-else-if="icon"><component :is="icon" /></el-icon>
    <span>{{ label }}</span>
  </button>
</template>

<script setup>
import { Loading } from '@element-plus/icons-vue'

defineProps({
  label: { type: String, required: true },
  icon: { type: Object, default: null },
  variant: { type: String, default: 'primary' }, // primary, success, info, warning, secondary
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false }
})

defineEmits(['click'])
</script>
