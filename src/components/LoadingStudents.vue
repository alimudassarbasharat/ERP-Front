<template>
  <div class="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm z-50 flex items-center justify-center">
    <div class="text-center">
      <!-- Modern Loading Animation -->
      <div class="relative mb-8">
        <div class="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
        <div class="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-purple-600 rounded-full animate-spin mx-auto animation-delay-150"></div>
      </div>
      
      <!-- Loading Content -->
      <div class="w-full">
        <h3 class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          {{ title || 'Loading' }}
        </h3>
        <p class="text-gray-600 mb-6">
          {{ message || 'Please wait while we process your request...' }}
        </p>
        
        <!-- Progress Dots -->
        <div class="flex justify-center space-x-2">
          <div class="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
          <div class="w-2 h-2 bg-purple-600 rounded-full animate-bounce animation-delay-100"></div>
          <div class="w-2 h-2 bg-pink-600 rounded-full animate-bounce animation-delay-200"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Loading'
  },
  message: {
    type: String,
    default: 'Please wait while we process your request...'
  }
})
</script>

<style scoped>
.animation-delay-100 {
  animation-delay: 0.1s;
}

.animation-delay-150 {
  animation-delay: 0.15s;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translateY(0);
  }
  40%, 43% {
    transform: translateY(-8px);
  }
  70% {
    transform: translateY(-4px);
  }
  90% {
    transform: translateY(-2px);
  }
}
</style> 