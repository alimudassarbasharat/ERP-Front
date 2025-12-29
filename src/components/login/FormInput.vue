<template>
  <div class="input-wrapper">
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :class="inputClasses"
      @input="handleInput"
      @blur="$emit('input')"
      required
    />
    
    <!-- Password Toggle Button -->
    <button
      v-if="showPasswordToggle"
      type="button"
      @click="$emit('toggle-password')"
      class="password-toggle"
      tabindex="-1"
    >
      <IconEye v-if="!showPassword" :size="20" class="icon" stroke="black" fill="none" />
      <IconEyeOff v-else :size="20" class="icon" stroke="black" fill="none" />
    </button>
    
    <!-- Error Message -->
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { IconEye, IconEyeOff } from '@tabler/icons-vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  showPasswordToggle: {
    type: Boolean,
    default: false
  },
  showPassword: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'input', 'toggle-password'])

const inputClasses = computed(() => {
  const baseClasses = [
    'w-full h-12 bg-white/15 border border-white rounded-xl px-4 text-[15px] text-white',
    'backdrop-blur-[10px] transition-all duration-300 placeholder:text-white/70 placeholder:font-normal',
    'focus:outline-none focus:border-white focus:bg-white focus:text-gray-900',
    'focus:shadow-[0_0_0_3px_rgba(255,255,255,0.1)]',
    'lg:h-11 lg:text-sm md:h-[42px] md:text-sm md:px-3.5 md:rounded-[10px]'
  ]
  
  if (props.showPasswordToggle) {
    baseClasses.push('pr-12 md:pr-[42px]')
  }
  
  if (props.error) {
    baseClasses.push('border-red-500 bg-red-500/10')
  }
  
  return baseClasses.join(' ')
})

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
  emit('input', event)
}
</script>

<style scoped>
.input-wrapper {
  @apply relative;
}

.password-toggle {
  @apply absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-1 flex items-center justify-center text-black transition-all duration-300 z-[1] hover:scale-110 focus:outline-none;
  @apply md:right-2.5 md:p-0.5;
}

.icon {
  @apply pointer-events-none md:w-[18px] md:h-[18px];
}

.error-message {
  @apply text-red-300 text-xs mt-1 ml-1;
  @apply md:text-[11px] md:mt-0.5;
}
</style>

