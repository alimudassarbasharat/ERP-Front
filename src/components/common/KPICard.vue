<template>
  <div class="relative overflow-hidden rounded-xl border border-gray-200/80 dark:border-gray-700/80 bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-800/70 backdrop-blur-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300">
    <div class="flex items-start gap-3">
      <div :class="[
        'w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0',
        iconBgClass
      ]">
        <slot name="icon">
          <el-icon :class="iconClass" class="text-2xl">
            <component :is="icon" />
          </el-icon>
        </slot>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-[10px] sm:text-xs font-semibold text-gray-500 tracking-wide uppercase mb-1">{{ label }}</p>
        <p class="text-base sm:text-lg font-black text-gray-900 tracking-tight mb-1.5 dark:text-white">{{ value }}</p>
        <div v-if="trend" class="flex items-center gap-1.5">
          <span :class="[
            'text-[10px] font-bold px-2 py-0.5 rounded-full',
            trend.type === 'positive' ? 'text-green-600 bg-green-100' : 
            trend.type === 'negative' ? 'text-red-600 bg-red-100' : 
            'text-blue-600 bg-blue-100'
          ]">
            {{ trend.value }}
          </span>
        </div>
        <div v-else-if="badge" class="flex items-center gap-1.5">
          <span :class="[
            'text-[10px] font-bold px-2 py-0.5 rounded-full',
            badgeClass
          ]">
            {{ badge }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  icon: { type: Object, default: null },
  iconBgClass: { type: String, default: 'bg-gradient-to-br from-blue-100 to-indigo-100' },
  iconClass: { type: String, default: 'text-blue-600' },
  trend: { type: Object, default: null }, // { type: 'positive'|'negative'|'neutral', value: '+12.5%' }
  badge: { type: String, default: null },
  badgeClass: { type: String, default: 'text-gray-600 bg-gray-100' }
})
</script>
