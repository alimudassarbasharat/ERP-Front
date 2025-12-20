<template>
  <!-- Copy of GenerateChallan.vue, update title and references to 'View Fee' -->
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
    <!-- View Mode Tabs -->
    <div class="w-full">
      <div class="flex bg-white rounded-full shadow-lg p-1 border border-purple-100">
        <template v-for="(tab, idx) in viewTabs" :key="tab.key">
          <button 
            @click="setViewMode(tab.key)"
            :class="[
              (viewMode === tab.key ? 'px-3' : 'px-4'),
              'py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform relative overflow-hidden',
              viewMode === tab.key 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105' 
                : 'text-purple-600 hover:text-purple-700 hover:bg-purple-50 hover:scale-102'
            ]"
          >
            <span class="relative z-10 flex items-center gap-2">
              <component :is="tab.icon" class="w-4 h-4" />
              {{ tab.label }}
              <span v-if="tab.count !== null" class="px-2 py-0.5 rounded-full text-xs font-bold bg-white text-purple-700 border border-purple-200 ml-1">
                {{ tab.count }}
              </span>
            </span>
            <div 
              v-if="viewMode === tab.key" 
              class="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-pulse rounded-full"
            ></div>
          </button>
          <div
            v-if="idx < viewTabs.length - 1"
            class="h-6 w-px bg-purple-200 mx-1 self-center"
          ></div>
        </template>
      </div>
    </div>

    <!-- Top Bar Header -->
    <div class="w-full max-w-7xl mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
      <h2 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        View Fee - {{ currentViewLabel }}
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Dashboard</span>
        <span class="mx-2">|</span>
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Fees</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">View Fee</span>
      </nav>
    </div>

    <!-- The rest of the content is a direct copy of GenerateChallan.vue -->
    <!-- You can further customize as needed for View Fee functionality -->
  </div>
</template>

<script setup>
// Copy all relevant script logic from GenerateChallan.vue here
</script>

<style scoped>
/* Copy styles from GenerateChallan.vue or customize as needed */
</style> 