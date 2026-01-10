<template>
  <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
    <div v-if="showIcon" class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
      <el-icon class="text-white"><component :is="icon" /></el-icon>
    </div>
    {{ title }}
    <slot name="badge" />
  </h2>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  icon: { type: Object, default: null },
  showIcon: { type: Boolean, default: true }
})
</script>
