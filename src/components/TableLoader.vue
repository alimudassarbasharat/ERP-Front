<template>
  <div class="p-8">
    <div class="flex flex-col items-center justify-center py-12">
      <div class="relative mb-6">
        <div class="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <div class="absolute inset-0 w-8 h-8 border-4 border-transparent border-r-pink-500 rounded-full animate-ping opacity-20"></div>
      </div>
      <div class="text-center">
        <p class="text-gray-600 font-medium mb-1">{{ message || 'Loading table data...' }}</p>
        <p class="text-gray-500 text-sm font-normal">Please wait while fetching details...</p>
        <!-- Pink 3 Dots Animation -->
        <div class="flex justify-center mt-3 space-x-1">
          <div class="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
          <div class="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
          <div class="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'Loading table data...'
  }
})
</script>

<style scoped>
/* Component styles are handled by Tailwind classes */
</style>
