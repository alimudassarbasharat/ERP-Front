<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <!-- Left: Title & Description -->
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-2">
          <div v-if="icon" :class="[
            'w-10 h-10 rounded-lg flex items-center justify-center',
            iconBgClass
          ]">
            <el-icon :class="['text-xl', iconClass]">
              <component :is="icon" />
            </el-icon>
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ title }}</h2>
            <p v-if="subtitle" class="text-sm text-gray-600 dark:text-gray-400">{{ subtitle }}</p>
          </div>
        </div>

        <!-- Breadcrumb (Optional) -->
        <nav v-if="breadcrumbs && breadcrumbs.length > 0" class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <template v-for="(crumb, index) in breadcrumbs" :key="index">
            <span 
              v-if="crumb.to"
              class="hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors"
              @click="router.push(crumb.to)"
            >
              {{ crumb.label }}
            </span>
            <span v-else class="text-gray-900 dark:text-white font-semibold">{{ crumb.label }}</span>
            <el-icon v-if="index < breadcrumbs.length - 1" class="text-xs">
              <ArrowRight />
            </el-icon>
          </template>
        </nav>
      </div>

      <!-- Right: Action Buttons - Matching ClassList Style -->
      <div class="flex flex-wrap items-center gap-2">
        <slot name="actions">
          <button 
            v-if="showResetButton"
            @click="$emit('reset')"
            type="button"
            class="h-9 px-6 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium rounded-full border border-gray-200 dark:border-gray-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Reset
          </button>
          <button 
            v-if="showSaveButton"
            @click="$emit('save')"
            type="button"
            :disabled="isSaving"
            class="h-9 px-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="!isSaving" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
            </svg>
            <svg v-else class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Save Draft
          </button>
          <button 
            v-if="showGenerateButton"
            @click="$emit('generate')"
            type="button"
            :disabled="isGenerating"
            class="h-9 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="!isGenerating" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
            </svg>
            <svg v-else class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Generate
          </button>
          <button 
            v-if="showSubmitButton"
            @click="$emit('submit')"
            type="button"
            :disabled="isSubmitting"
            class="h-9 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="!isSubmitting" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <svg v-else class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Submit
          </button>
        </slot>
      </div>
      </div>
    </div>
  </div>
</template>
    </div>

    <!-- Optional: Summary Stats Bar -->
    <div v-if="stats && stats.length > 0" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div v-for="(stat, index) in stats" :key="index" class="text-center">
          <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">{{ stat.label }}</div>
          <div :class="[
            'text-lg font-bold',
            stat.color || 'text-gray-900 dark:text-white'
          ]">
            {{ stat.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ArrowRight, Refresh, Document, Plus, CircleCheck } from '@element-plus/icons-vue'

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  icon: { type: Object, default: null },
  iconClass: { type: String, default: 'text-purple-600' },
  iconBgClass: { type: String, default: 'bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30' },
  breadcrumbs: { type: Array, default: () => [] },
  showResetButton: { type: Boolean, default: false },
  showSaveButton: { type: Boolean, default: false },
  showGenerateButton: { type: Boolean, default: false },
  showSubmitButton: { type: Boolean, default: false },
  isSaving: { type: Boolean, default: false },
  isGenerating: { type: Boolean, default: false },
  isSubmitting: { type: Boolean, default: false },
  stats: { type: Array, default: () => [] }
})

defineEmits(['reset', 'save', 'generate', 'submit'])

const router = useRouter()
</script>

<style scoped>
/* Additional styles if needed */
</style>
