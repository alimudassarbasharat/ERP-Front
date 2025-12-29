<template>
  <div 
    class="relative bg-gradient-to-br p-4 sm:p-5 rounded-xl border hover:shadow-md transition-all duration-300 cursor-pointer group overflow-hidden"
    :class="stat.bgClass"
    @click="$emit('click', stat)"
  >
    <!-- Icon in top right corner -->
    <div class="absolute top-2 right-2 sm:top-3 sm:right-3 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
      <component :is="stat.iconComponent" :size="24" :stroke-width="1.5" class="sm:w-8 sm:h-8" />
    </div>
    
    <p class="text-xs font-bold mb-1 sm:mb-2 tracking-wide uppercase relative z-10" :class="stat.textClass">{{ stat.label }}</p>
    <p class="text-sm sm:text-base font-black tracking-tight relative z-10" :class="stat.valueClass">{{ stat.value }}</p>
    <p class="text-xs font-semibold mt-1 relative z-10" :class="stat.changeClass">{{ stat.change }}</p>
    <div class="mt-2 w-full bg-white/20 rounded-full h-1 relative z-10">
      <div class="h-1 rounded-full transition-all duration-300" :class="stat.progressClass" :style="{ width: stat.percentage + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stat: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])
</script>

