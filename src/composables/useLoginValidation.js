import { ref, computed } from 'vue'

/**
 * Reusable login validation composable
 * Provides email and password validation logic
 */
export function useLoginValidation(form) {
  const emailError = ref('')
  const passwordError = ref('')

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const MIN_PASSWORD_LENGTH = 6

  const validateEmail = () => {
    if (!form.email?.trim()) {
      emailError.value = 'Email is required'
      return false
    }
    
    if (!EMAIL_REGEX.test(form.email)) {
      emailError.value = 'Please enter a valid email address'
      return false
    }
    
    emailError.value = ''
    return true
  }

  const validatePassword = () => {
    if (!form.password?.trim()) {
      passwordError.value = 'Password is required'
      return false
    }
    
    if (form.password.length < MIN_PASSWORD_LENGTH) {
      passwordError.value = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
      return false
    }
    
    passwordError.value = ''
    return true
  }

  const isFormValid = computed(() => {
    return (
      form.email?.trim() &&
      form.password?.trim() &&
      !emailError.value &&
      !passwordError.value
    )
  })

  return {
    emailError,
    passwordError,
    validateEmail,
    validatePassword,
    isFormValid
  }
}

