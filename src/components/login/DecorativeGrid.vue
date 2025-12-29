<template>
  <div class="grid-container">
    <div class="grid-wrapper">
      <div 
        v-for="i in 20" 
        :key="i" 
        class="grid-dot"
      ></div>
    </div>
  </div>
</template>

<script setup>
// Pure presentational component
</script>

<style scoped>
.grid-container {
  @apply absolute top-8 right-8 z-10 md:top-4 md:right-4;
}

.grid-wrapper {
  @apply grid grid-cols-10 grid-rows-2 gap-1.5 opacity-30;
  @apply md:grid-cols-8 md:gap-1;
}

.grid-dot {
  @apply w-2 h-2 bg-white rounded-sm;
  @apply md:w-1.5 md:h-1.5;
}
</style>

