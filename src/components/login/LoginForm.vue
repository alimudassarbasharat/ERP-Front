<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <!-- Email Input -->
    <FormInput
      :model-value="email"
      type="email"
      placeholder="username"
      :error="emailError"
      @update:model-value="email = $event; $emit('update:email', $event)"
      @input="$emit('validate-email')"
    />

    <!-- Password Input -->
    <FormInput
      :model-value="password"
      :type="showPassword ? 'text' : 'password'"
      placeholder="password"
      :error="passwordError"
      :show-password-toggle="true"
      :show-password="showPassword"
      @update:model-value="password = $event; $emit('update:password', $event)"
      @input="$emit('validate-password')"
      @toggle-password="$emit('toggle-password')"
    />

    <!-- Forgot Password -->
    <div class="forgot-password">
      <a href="#" class="forgot-link">forgot password?</a>
    </div>

    <!-- Submit Button -->
    <button 
      type="submit" 
      class="submit-button"
      :disabled="loading || !isFormValid"
    >
      <span v-if="!loading">Login</span>
      <span v-else class="loading-text">Loading...</span>
    </button>

    <!-- Create Account -->
    <div class="create-account">
      <a href="#" class="create-link">Create Account</a>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import FormInput from './FormInput.vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  showPassword: {
    type: Boolean,
    default: false
  },
  emailError: {
    type: String,
    default: ''
  },
  passwordError: {
    type: String,
    default: ''
  },
  isFormValid: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'toggle-password', 'update:email', 'update:password', 'validate-email', 'validate-password'])

const email = ref('')
const password = ref('')

const handleSubmit = () => {
  emit('submit')
}
</script>

<style scoped>
.login-form {
  @apply flex flex-col gap-5 lg:gap-4 md:gap-4;
}

.forgot-password {
  @apply text-right -mt-2 md:-mt-1.5;
}

.forgot-link {
  @apply text-white no-underline text-sm font-normal transition-colors duration-300 hover:text-white hover:underline;
  @apply md:text-[13px];
}

.submit-button {
  @apply w-full h-12 bg-white text-purple-600 border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 mt-2;
  @apply hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)];
  @apply disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0;
  @apply lg:h-11 lg:text-[15px] md:h-[42px] md:text-sm md:mt-1.5 md:rounded-[10px];
}

.loading-text {
  @apply inline-block;
}

.create-account {
  @apply text-center mt-3 md:mt-2.5;
}

.create-link {
  @apply text-white no-underline text-sm font-medium transition-colors duration-300 hover:text-white hover:underline;
  @apply md:text-[13px];
}
</style>

