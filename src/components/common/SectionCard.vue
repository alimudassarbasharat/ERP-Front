<template>
  <div 
    @click="$emit('click')"
    class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
  >
    <div class="flex items-center justify-between mb-4">
      <div :class="[
        'w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300',
        iconBgClass,
        hoverIconBgClass
      ]">
        <slot name="icon">
          <el-icon :class="[
            iconClass,
            hoverIconClass
          ]" class="text-2xl transition-all duration-300">
            <component :is="icon" />
          </el-icon>
        </slot>
      </div>
      <el-icon class="w-5 h-5 text-gray-500 group-hover:text-purple-500 transition-all duration-300">
        <ArrowRight />
      </el-icon>
    </div>
    <h3 :class="[
      'text-lg font-bold mb-2 transition-all duration-300',
      darkMode ? 'text-gray-900 dark:text-white' : 'text-gray-900',
      hoverTextClass
    ]">
      {{ title }}
    </h3>
    <p :class="[
      'text-sm mb-4',
      darkMode ? 'text-gray-600 dark:text-gray-400' : 'text-gray-600'
    ]">
      {{ description }}
    </p>
    <div v-if="tags && tags.length > 0" class="flex flex-wrap gap-2">
      <span 
        v-for="(tag, index) in tags" 
        :key="index"
        :class="[
          'text-xs px-2 py-1 rounded-full',
          tag.class || 'bg-gray-100 text-gray-700'
        ]"
      >
        {{ tag.label }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'

defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: Object, default: null },
  iconBgClass: { type: String, default: 'bg-gradient-to-r from-purple-100 to-purple-200' },
  hoverIconBgClass: { type: String, default: 'group-hover:from-purple-500 group-hover:to-purple-600' },
  iconClass: { type: String, default: 'text-purple-600' },
  hoverIconClass: { type: String, default: 'group-hover:text-white' },
  hoverTextClass: { type: String, default: 'group-hover:text-purple-600' },
  tags: { type: Array, default: () => [] },
  darkMode: { type: Boolean, default: true }
})

defineEmits(['click'])
</script>
