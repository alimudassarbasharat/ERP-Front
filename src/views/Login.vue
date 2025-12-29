<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Left Side - Illustration -->
      <div class="illustration-section">
        <LoginIllustration />
      </div>
      
      <!-- Right Side - Login Form -->
      <div class="form-section">
        <div class="form-wrapper">
          <LoginHeader />
          <LoginForm
            :loading="loading"
            :show-password="showPassword"
            :email-error="emailError"
            :password-error="passwordError"
            :is-form-valid="isFormValid"
            @toggle-password="showPassword = !showPassword"
            @submit="handleLogin"
            @update:email="loginForm.email = $event"
            @update:password="loginForm.password = $event"
            @validate-email="validateEmail"
            @validate-password="validatePassword"
          />
        </div>
      </div>
    </div>
    
    <DecorativeGrid />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useLoginValidation } from '@/composables/useLoginValidation'
import { useAuth } from '@/composables/useAuth'
import LoginIllustration from '@/components/login/LoginIllustration.vue'
import LoginHeader from '@/components/login/LoginHeader.vue'
import LoginForm from '@/components/login/LoginForm.vue'
import DecorativeGrid from '@/components/login/DecorativeGrid.vue'

const router = useRouter()
const route = useRoute()
const toast = useToast()

// State
const loading = ref(false)
const showPassword = ref(false)
const loginForm = reactive({
  email: '',
  password: ''
})

// Composables
const { emailError, passwordError, validateEmail, validatePassword, isFormValid } = useLoginValidation(loginForm)
const { login, handleAuthSuccess } = useAuth(router, route, toast)

// Handlers
const handleLogin = async () => {
  if (!validateForm()) return

  try {
    loading.value = true
    const response = await login(loginForm)
    await handleAuthSuccess(response)
  } catch (error) {
    handleLoginError(error)
  } finally {
    loading.value = false
  }
}

const validateForm = () => {
  const emailValid = validateEmail()
  const passwordValid = validatePassword()
  
  if (!emailValid || !passwordValid) {
    toast.error('Please fix the errors before submitting')
    return false
  }
  return true
}

const handleLoginError = (error) => {
  console.error('Login error:', error)
  const message = error.response?.data?.message || 'Login failed. Please try again.'
  toast.error(message)
}
</script>

<style scoped>
/* Full Screen Container - Desktop */
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #8B5CF6 0%, #A855F7 30%, #9333EA 70%, #7C3AED 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-y: auto;
  padding: 0;
}

/* Main Card - Full Screen on Desktop */
.login-card {
  background: #FFFFFF;
  border-radius: 32px;
  width: 90vw;
  max-width: 1100px;
  height: 85vh;
  max-height: 650px;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: relative;
  margin: auto;
}

/* Illustration Section */
.illustration-section {
  position: relative;
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
}

/* Form Section */
.form-section {
  background: linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #9333EA 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
}

.form-wrapper {
  width: 100%;
  max-width: 320px;
}

/* Tablet - 1024px and below */
@media (max-width: 1024px) {
  .login-container {
    padding: 20px;
  }

  .login-card {
    width: 95vw;
    height: 90vh;
    max-height: 600px;
    grid-template-columns: 1fr 1fr;
  }

  .illustration-section {
    padding: 40px 30px;
  }

  .form-section {
    padding: 50px 35px;
  }

  .form-wrapper {
    max-width: 100%;
    padding: 0 10px;
  }
}

/* Mobile - 768px and below */
@media (max-width: 768px) {
  .login-container {
    padding: 20px;
    align-items: flex-start;
    padding-top: 20px;
  }

  .login-card {
    grid-template-columns: 1fr;
    grid-template-rows: 0.5fr 1fr;
    width: 100%;
    max-width: 100%;
    height: auto;
    min-height: 90vh;
    max-height: none;
    border-radius: 24px;
  }

  .illustration-section {
    padding: 30px 20px;
    min-height: 200px;
  }

  .form-section {
    padding: 40px 30px;
    min-height: auto;
  }

  .form-wrapper {
    max-width: 100%;
    padding: 0;
  }
}

/* Small Mobile - 480px and below */
@media (max-width: 480px) {
  .login-container {
    padding: 10px;
    align-items: flex-start;
    padding-top: 20px;
  }

  .login-card {
    border-radius: 20px;
    width: 100%;
    height: auto;
    min-height: 100vh;
    max-height: none;
    grid-template-rows: 0.4fr 1fr;
    margin: 0;
  }

  .illustration-section {
    padding: 20px 15px;
    min-height: 150px;
  }

  .form-section {
    padding: 30px 20px;
  }

  .form-wrapper {
    max-width: 100%;
  }
}

/* Extra Small - 360px and below */
@media (max-width: 360px) {
  .login-container {
    padding: 10px;
  }

  .login-card {
    border-radius: 16px;
  }

  .illustration-section {
    padding: 15px 10px;
    min-height: 120px;
  }

  .form-section {
    padding: 25px 15px;
  }
}
</style>

