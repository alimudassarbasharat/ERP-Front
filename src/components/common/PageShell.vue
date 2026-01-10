<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center p-4 sm:p-6 lg:p-8">
    <!-- Header Section (Matching Fee Analytics exactly) -->
    <div class="w-full max-w-7xl mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200 dark:border-gray-700">
      <h2 class="text-base font-medium text-gray-600 dark:text-gray-400 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        {{ title }}
      </h2>
      <nav v-if="breadcrumbs && breadcrumbs.length > 0" class="flex items-center gap-2 text-base font-medium text-gray-500 dark:text-gray-400">
        <template v-for="(crumb, index) in breadcrumbs" :key="index">
          <span 
            v-if="crumb.route"
            class="hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors duration-200"
            @click="router.push(crumb.route)"
          >
            {{ crumb.label }}
          </span>
          <span v-else class="text-gray-900 dark:text-white font-bold">{{ crumb.label }}</span>
          <span v-if="index < breadcrumbs.length - 1" class="mx-2">|</span>
        </template>
      </nav>
    </div>

    <div class="w-full max-w-7xl mx-auto flex-1">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({
  title: { type: String, required: true },
  breadcrumbs: { type: Array, default: () => [] }
})

const router = useRouter()
</script>
