<template>
  <div class="figma-login-container">
    <!-- Main White Card Container -->
    <div class="login-card-wrapper">
      <!-- Left Side - Illustration -->
      <div class="illustration-section">
        <!-- Decorative Clouds -->
        <div class="cloud cloud-1"></div>
        <div class="cloud cloud-2"></div>
        <div class="cloud cloud-3"></div>
        
        <!-- Main Illustration -->
        <div class="main-illustration">
          <!-- Large Monitor/Screen -->
          <div class="monitor">
            <div class="monitor-stand"></div>
            <div class="monitor-base"></div>
            <div class="monitor-screen">
              <div class="screen-content">
                <div class="screen-header"></div>
                <div class="screen-lines">
                  <div class="screen-line"></div>
                  <div class="screen-line"></div>
                  <div class="screen-line short"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Person Character -->
          <div class="person-character">
            <!-- Body -->
            <div class="person-body"></div>
            <!-- Head -->
            <div class="person-head"></div>
            <!-- Pointing Arm -->
            <div class="person-arm"></div>
            <!-- Legs -->
            <div class="person-legs">
              <div class="leg-left"></div>
              <div class="leg-right"></div>
            </div>
          </div>
          
          <!-- Abstract Shapes -->
          <div class="abstract-shapes">
            <div class="shape-1"></div>
            <div class="shape-2"></div>
          </div>
        </div>
      </div>
      
      <!-- Right Side - Login Form -->
      <div class="login-form-section">
        <div class="login-form-container">
          <!-- Brand Header -->
          <div class="brand-header">
            <h1 class="brand-title">Teachify</h1>
            <p class="brand-subtitle">Login your account</p>
          </div>
          
          <!-- Login Form -->
          <form @submit.prevent="handleLogin" class="login-form">
            <!-- Username Input -->
            <div class="input-group">
              <input
                v-model="loginForm.email"
                type="email"
                placeholder="username"
                class="form-input"
                :class="{ 'error': emailError }"
                @input="validateEmail"
                required
              />
              <div v-if="emailError" class="error-message">{{ emailError }}</div>
            </div>

            <!-- Password Input -->
            <div class="input-group">
              <input
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="password"
                class="form-input"
                :class="{ 'error': passwordError }"
                @input="validatePassword"
                required
              />
              <div v-if="passwordError" class="error-message">{{ passwordError }}</div>
            </div>

            <!-- Forgot Password -->
            <div class="forgot-password">
              <a href="#" class="forgot-link">forgot password?</a>
            </div>

            <!-- Login Button -->
            <button type="submit" class="login-button" :disabled="loading || !isFormValid">
              <span v-if="!loading">Login</span>
              <span v-else class="loading-spinner">Loading...</span>
            </button>

            <!-- Create Account -->
            <div class="create-account">
              <a href="#" class="create-link">Create Account</a>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <!-- Top Right Decorative Grid -->
    <div class="top-decoration">
      <div class="decoration-grid">
        <div class="grid-dot" v-for="i in 20" :key="i"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import api from '@/utils/axios'

const router = useRouter()
const route = useRoute()
const toast = useToast()

// Reactive data
const loading = ref(false)
const showPassword = ref(false)
const emailError = ref('')
const passwordError = ref('')

const loginForm = reactive({
  email: '',
  password: ''
})

// Validation
const validateEmail = () => {
  if (!loginForm.email) {
    emailError.value = 'Email is required'
    return false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(loginForm.email)) {
    emailError.value = 'Please enter a valid email address'
    return false
  }
  emailError.value = ''
  return true
}

const validatePassword = () => {
  if (!loginForm.password) {
    passwordError.value = 'Password is required'
    return false
  }
  if (loginForm.password.length < 6) {
    passwordError.value = 'Password must be at least 6 characters'
    return false
  }
  passwordError.value = ''
  return true
}

const isFormValid = computed(() => {
  return loginForm.email && loginForm.password && !emailError.value && !passwordError.value
})

const handleLogin = async () => {
  validateEmail()
  validatePassword()
  
  if (!isFormValid.value) {
    toast.error('Please fix the errors before submitting')
    return
  }

  try {
    loading.value = true
    
    const response = await api.post('/login', loginForm)
    
    if (response.data.success) {
      const userData = {
        ...response.data.admin,
        token: response.data.access_token,
        api_token: response.data.access_token
      }
      
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('authToken', response.data.access_token)
      
      toast.success('🎉 Welcome Back!', {
        position: 'top-right',
        duration: 4000
      })
      
      setTimeout(() => {
        const redirectPath = route.query.redirect || '/dashboard'
        router.push(redirectPath)
      }, 2000)
      
    } else {
      toast.error(response.data.message || 'Invalid credentials')
    }
  } catch (error) {
    console.error('Login error:', error)
    toast.error(error.response?.data?.message || 'Login failed. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* FIGMA EXACT DESIGN REPLICA */
.figma-login-container {
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
  overflow: hidden;
}

/* Main White Container */
.login-card-wrapper {
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
}

/* LEFT SIDE - ILLUSTRATION */
.illustration-section {
  position: relative;
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
}

/* Decorative Clouds */
.cloud {
  position: absolute;
  background: linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%);
  border-radius: 50px;
  opacity: 0.4;
}

.cloud-1 {
  width: 80px;
  height: 35px;
  top: 15%;
  right: 25%;
}

.cloud-2 {
  width: 60px;
  height: 25px;
  top: 25%;
  right: 15%;
}

.cloud-3 {
  width: 45px;
  height: 20px;
  top: 35%;
  right: 35%;
}

/* Main Illustration Container */
.main-illustration {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 400px;
}

/* Monitor/Screen */
.monitor {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.monitor-screen {
  width: 320px;
  height: 200px;
  background: linear-gradient(135deg, #1E293B 0%, #334155 100%);
  border-radius: 12px;
  position: relative;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  border: 8px solid #E2E8F0;
}

.monitor-stand {
  width: 8px;
  height: 60px;
  background: linear-gradient(135deg, #94A3B8 0%, #64748B 100%);
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px;
}

.monitor-base {
  width: 80px;
  height: 20px;
  background: linear-gradient(135deg, #94A3B8 0%, #64748B 100%);
  position: absolute;
  bottom: -80px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
}

.screen-content {
  padding: 20px;
  height: 100%;
}

.screen-header {
  width: 100%;
  height: 20px;
  background: linear-gradient(90deg, #8B5CF6 0%, #A855F7 100%);
  border-radius: 4px;
  margin-bottom: 15px;
}

.screen-lines {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.screen-line {
  height: 8px;
  background: rgba(148, 163, 184, 0.3);
  border-radius: 4px;
}

.screen-line:first-child {
  width: 80%;
}

.screen-line:nth-child(2) {
  width: 95%;
}

.screen-line.short {
  width: 60%;
}

/* Person Character */
.person-character {
  position: absolute;
  bottom: 20%;
  left: 20%;
  z-index: 3;
}

.person-body {
  width: 50px;
  height: 70px;
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border-radius: 25px 25px 8px 8px;
  position: relative;
}

.person-head {
  width: 35px;
  height: 40px;
  background: linear-gradient(135deg, #FED7AA 0%, #FDBA74 100%);
  border-radius: 50% 50% 40% 40%;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
}

.person-arm {
  width: 35px;
  height: 12px;
  background: linear-gradient(135deg, #FED7AA 0%, #FDBA74 100%);
  border-radius: 6px;
  position: absolute;
  top: 15px;
  right: -25px;
  transform: rotate(-25deg);
  transform-origin: left center;
}

.person-legs {
  position: absolute;
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.leg-left,
.leg-right {
  width: 16px;
  height: 35px;
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  border-radius: 8px;
}

/* Abstract Shapes */
.abstract-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.shape-1 {
  position: absolute;
  width: 120px;
  height: 80px;
  background: linear-gradient(135deg, #EC4899 0%, #BE185D 100%);
  border-radius: 40px;
  bottom: 10%;
  right: 10%;
  opacity: 0.8;
  transform: rotate(-15deg);
}

.shape-2 {
  position: absolute;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  border-radius: 50%;
  top: 20%;
  left: 15%;
  opacity: 0.6;
}

/* RIGHT SIDE - LOGIN FORM */
.login-form-section {
  background: linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #9333EA 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
}

.login-form-container {
  width: 100%;
  max-width: 320px;
}

/* Brand Header */
.brand-header {
  text-align: center;
  margin-bottom: 40px;
}

.brand-title {
  font-size: 32px;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.brand-subtitle {
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  margin: 0;
}

/* Form Styles */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  position: relative;
}

.form-input {
  width: 100%;
  height: 48px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid #ffffff;
  border-radius: 12px;
  padding: 0 16px;
  font-size: 15px;
  color: #FFFFFF;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

.form-input:focus {
  outline: none;
  border-color: #ffffff;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}

.form-input.error {
  border-color: #EF4444;
  background: rgba(239, 68, 68, 0.1);
}

.error-message {
  color: #FCA5A5;
  font-size: 12px;
  margin-top: 4px;
  margin-left: 4px;
}

/* Forgot Password Link */
.forgot-password {
  text-align: right;
  margin-top: -8px;
}

.forgot-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  transition: color 0.3s ease;
}

.forgot-link:hover {
  color: #FFFFFF;
  text-decoration: underline;
}

/* Login Button */
.login-button {
  width: 100%;
  height: 48px;
  background: #FFFFFF;
  color: #8B5CF6;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
}

.login-button:hover:not(:disabled) {
  background: #F8FAFC;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
}

/* Create Account Link */
.create-account {
  text-align: center;
  margin-top: 12px;
}

.create-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.create-link:hover {
  color: #FFFFFF;
  text-decoration: underline;
}

/* Top Right Decorative Grid */
.top-decoration {
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 10;
}

.decoration-grid {
  display: grid;
  grid-template-columns: repeat(10, 8px);
  grid-template-rows: repeat(2, 8px);
  gap: 6px;
  opacity: 0.3;
}

.grid-dot {
  width: 8px;
  height: 8px;
  background: #ffffff;
  border-radius: 2px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .login-card-wrapper {
    width: 95vw;
    height: 90vh;
    grid-template-columns: 1fr 1fr;
  }
  
  .monitor-screen {
    width: 280px;
    height: 180px;
  }
}

@media (max-width: 768px) {
  .login-card-wrapper {
    grid-template-columns: 1fr;
    grid-template-rows: 0.6fr 1fr;
    width: 95vw;
    height: 95vh;
  }
  
  .illustration-section {
    padding: 30px 20px;
  }
  
  .login-form-section {
    padding: 40px 30px;
  }
  
  .monitor-screen {
    width: 240px;
    height: 150px;
  }
  
  .brand-title {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .login-card-wrapper {
    border-radius: 20px;
    margin: 20px;
  }
  
  .monitor-screen {
    width: 200px;
    height: 125px;
  }
  
  .login-form-section {
    padding: 30px 25px;
  }
  
  .brand-title {
    font-size: 24px;
  }
}
</style> 