<template>
  <div class="relative z-10 mb-4 sm:mb-6 rounded-xl border border-gray-200/50 bg-white/60 px-4 sm:px-6 py-6 sm:py-8 shadow-lg backdrop-filter backdrop-blur-xl">
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
      <div class="header-content w-full lg:w-auto">
        <div class="flex items-center gap-2 sm:gap-3 mb-2">
          <div class="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span class="text-xs sm:text-sm text-green-600 font-medium">System Online</span>
        </div>
        <h1 class="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
          Good {{ timeOfDay }}, <span class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{{ userName }}</span>
        </h1>
        <p class="text-gray-600 mt-2 sm:mt-3 font-medium text-xs sm:text-sm">{{ greetingMessage }}</p>
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-3 sm:mt-4">
          <div class="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            <Clock :size="14" :stroke-width="2" class="text-gray-600 flex-shrink-0" />
            <span>{{ currentTime }}</span>
          </div>
          <div class="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            <Calendar :size="14" :stroke-width="2" class="text-gray-600 flex-shrink-0" />
            <span>{{ currentDate }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full lg:w-auto">
        <button 
          @click="$emit('refresh')" 
          :disabled="refreshing" 
          class="flex items-center justify-center gap-2 h-10 sm:h-12 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw :size="16" :stroke-width="2" :class="refreshing ? 'animate-spin' : ''" />
          <span class="hidden sm:inline">{{ refreshing ? 'Refreshing...' : 'Refresh Data' }}</span>
          <span class="sm:hidden">{{ refreshing ? 'Refreshing...' : 'Refresh' }}</span>
        </button>
        <button 
          @click="$emit('export')" 
          class="flex items-center justify-center gap-2 h-10 sm:h-12 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <Download :size="16" :stroke-width="2" />
          <span class="hidden sm:inline">Export Report</span>
          <span class="sm:hidden">Export</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Clock, Calendar, RefreshCw, Download } from 'lucide-vue-next'

defineProps({
  timeOfDay: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  greetingMessage: {
    type: String,
    required: true
  },
  currentTime: {
    type: String,
    required: true
  },
  currentDate: {
    type: String,
    required: true
  },
  refreshing: {
    type: Boolean,
    default: false
  }
})

defineEmits(['refresh', 'export'])
</script>
