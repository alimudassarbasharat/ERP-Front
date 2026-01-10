import './assets/main.css'
import './assets/toast-custom.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import VueApexCharts from 'vue3-apexcharts'
import App from './App.vue'
import router from './router'
import api from './utils/axios'

const originalConsoleError = console.error
const originalConsoleWarn = console.warn

const shouldSuppressError = (errorString) => {
  const lower = errorString.toLowerCase()
  
  // CRITICAL: Never suppress our Reverb/Echo debug logs
  if (
    lower.includes('[echo]') ||
    lower.includes('[notifications]') ||
    lower.includes('[directmessagechat]') ||
    lower.includes('[messagingapp]') ||
    lower.includes('[reverb]')
  ) {
    return false
  }
  
  return (
    lower.includes('contentscript') ||
    lower.includes('contentScript') ||
    lower.includes('contentScript.js') ||
    lower.includes('chrome-extension://') ||
    lower.includes('moz-extension://') ||
    lower.includes('safari-extension://') ||
    lower.includes('jquery.deferred') ||
    lower.includes('jQuery.Deferred') ||
    lower.includes('indexOf') ||
    lower.includes('i18next') ||
    // Runtime.lastError variations (browser extension errors)
    lower.includes('runtime.lasterror') ||
    lower.includes('runtime.lasterror:') ||
    lower.includes('runtime.lastError') ||
    lower.includes('runtime.lastError:') ||
    lower.includes('runtime.lasterror:') ||
    lower.includes('unchecked runtime.lasterror') ||
    lower.includes('unchecked runtime.lasterror:') ||
    lower.includes('unchecked runtime.lasterror') ||
    lower.includes('unchecked runtime.lastError') ||
    lower.includes('unchecked runtime.lastError:') ||
    // Message port errors (browser extension communication errors)
    lower.includes('message port closed') ||
    lower.includes('the message port closed') ||
    lower.includes('message port closed before') ||
    lower.includes('message port closed before a response') ||
    lower.includes('message port closed before a response was received') ||
    lower.includes('the message port closed before a response was received') ||
    lower.includes('a listener indicated an asynchronous response') ||
    lower.includes('listener indicated an asynchronous response') ||
    lower.includes('asynchronous response') ||
    lower.startsWith('unchecked') ||
    // Additional browser extension error patterns
    (lower.includes('understand this error') && lower.includes('contentScript')) ||
    (lower.includes('understand this warning') && lower.includes('contentScript'))
  )
}

console.error = (...args) => {
  const errorString = args.join(' ')
  if (shouldSuppressError(errorString)) {
    return
  }
  originalConsoleError.apply(console, args)
}

console.warn = (...args) => {
  const warnString = args.join(' ')
  
  // CRITICAL: Never suppress Echo/Reverb warnings - they are important for debugging
  if (
    warnString.toLowerCase().includes('[echo]') ||
    warnString.toLowerCase().includes('[reverb]') ||
    warnString.toLowerCase().includes('reverb server') ||
    warnString.toLowerCase().includes('connection timeout')
  ) {
    // Always show Echo/Reverb warnings
    originalConsoleWarn.apply(console, args)
    return
  }
  
  if (shouldSuppressError(warnString)) {
    return
  }
  originalConsoleWarn.apply(console, args)
}

const app = createApp(App)

app.config.globalProperties.$api = api
app.config.globalProperties.$http = api
window.axios = api

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.component('apexchart', VueApexCharts)

const toastOptions = {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  toastClassName: 'my-toast bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl shadow-lg px-6 py-4 flex items-center gap-3',
  bodyClassName: 'text-white text-base font-medium',
  containerClassName: '',
}

// Import stores before using Pinia
import { useThemeStore } from './stores/theme'
import { useAuthStore } from './stores/auth'
import { useSessionStore } from './stores/session'

const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(Toast, toastOptions)

// Now that Pinia is installed, we can use stores
const themeStore = useThemeStore()
themeStore.initializeTheme()
// Watch for system theme changes after initialization
if (typeof window !== 'undefined') {
  themeStore.watchSystemTheme()
}

const authStore = useAuthStore()
authStore.initFromStorage()

// Initialize session store for authenticated users
if (authStore.isAuthenticated || localStorage.getItem('user')) {
  const sessionStore = useSessionStore()
  sessionStore.initialize().catch(err => {
    console.warn('⚠️ Session store initialization failed:', err)
  })
}

// CRITICAL FIX: Initialize Echo early so it's available globally
// This ensures getEcho() works in all components
// Note: We import it but don't initialize immediately to avoid circular dependencies
// Echo will be initialized when first accessed via getEcho()
import './utils/echo' // Import to ensure module is loaded

// CRITICAL: Register service worker for push notifications (works when site is closed)
if ('serviceWorker' in navigator) {
  import('./utils/pushNotifications').then(({ registerServiceWorker, subscribeToPushNotifications }) => {
    registerServiceWorker().then((registration) => {
      if (registration && authStore.isAuthenticated && authStore.user?.id) {
        // Subscribe to push notifications after user is authenticated
        subscribeToPushNotifications(authStore.user.id).catch(err => {
          if (import.meta.env.DEV) {
            console.warn('[Push] Failed to subscribe to push notifications:', err)
          }
        })
      }
    })
  })
}

const isExtensionError = (error, stack) => {
  const errorMessage = error?.message || error?.toString() || stack || ''
  const errorString = errorMessage.toLowerCase()
  const errorStack = stack || error?.stack || ''
  
  return shouldSuppressError(errorString) || (
    errorString.includes('message channel closed') ||
    errorString.includes('message port closed') ||
    errorString.includes('the message port closed before a response was received') ||
    errorString.includes('extension context invalidated') ||
    errorString.includes('receiving end does not exist') ||
    errorString.includes('a listener indicated an asynchronous response') ||
    errorString.includes('runtime.lasterror') ||
    errorString.includes('runtime.lastError') ||
    errorString.includes('unchecked runtime.lasterror') ||
    errorString.includes('unchecked runtime.lastError') ||
    errorString.includes('selectors_instance_found') ||
    (errorString.includes('indexOf') && (errorStack.includes('extension') || errorStack.includes('contentScript'))) ||
    (errorString.includes('cannot read properties of null') && (errorStack.includes('extension') || errorStack.includes('contentScript'))) ||
    (errorString.includes('cannot read properties of undefined') && (errorStack.includes('extension') || errorStack.includes('contentScript'))) ||
    errorStack.includes('chrome-extension://') ||
    errorStack.includes('moz-extension://') ||
    errorStack.includes('safari-extension://') ||
    errorStack.includes('contentScript.js')
  )
}

window.onerror = (message, source, lineno, colno, error) => {
  const errorMessage = message?.toString() || error?.message || ''
  const errorString = errorMessage.toLowerCase()
  
  // Suppress browser extension errors including "Unchecked runtime.lastError"
  if (
    isExtensionError(error || message, error?.stack) ||
    errorString.includes('runtime.lasterror') ||
    errorString.includes('runtime.lastError') ||
    errorString.includes('message port closed') ||
    errorString.includes('unchecked runtime.lasterror') ||
    errorString.includes('unchecked runtime.lastError') ||
    (source && (
      source.includes('chrome-extension://') ||
      source.includes('moz-extension://') ||
      source.includes('safari-extension://') ||
      source.includes('contentScript')
    ))
  ) {
    return true // Suppress the error
  }
  return false
}

app.config.errorHandler = (err, vm, info) => {
  if (isExtensionError(err, err?.stack)) {
    return
  }
  
  console.error('Global error:', err)
  console.error('Error info:', info)
  
  if (err?.response?.status === 401) {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('user')
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    window.location.href = '/login'
  }
}

window.addEventListener('unhandledrejection', (event) => {
  const errorMessage = event.reason?.message || event.reason?.toString() || ''
  const errorString = errorMessage.toLowerCase()
  
  // Suppress browser extension errors
  if (
    isExtensionError(event.reason, event.reason?.stack) ||
    errorString.includes('a listener indicated an asynchronous response') ||
    errorString.includes('listener indicated an asynchronous response') ||
    errorString.includes('message channel closed') ||
    errorString.includes('extension context invalidated') ||
    errorString.includes('receiving end does not exist')
  ) {
    event.preventDefault()
    return
  }
  
  console.error('Unhandled promise rejection:', event.reason)
  
  if (event.reason?.response?.status === 401) {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('user')
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    window.location.href = '/login'
    event.preventDefault()
  }
})

app.mount('#app')
