import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { updateEchoAuth } from './echo'
import { useToast } from 'vue-toastification'

// Initialize toast (will be available globally)
let toast = null
try {
  toast = useToast()
} catch (e) {
  // Toast might not be available during initial module load
  // It will be set later when used
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

let isRefreshing = false
let refreshSubscribers = []

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb)
}

const onTokenRefreshed = (token) => {
  refreshSubscribers.forEach(cb => cb(token))
  refreshSubscribers = []
}

const debugLog = (message, data = null) => {
  if (import.meta.env.DEV) {
    const importantMessages = ['Error', 'Token', '401', '403', '500', 'Failed', 'Refresh']
    const shouldLog = importantMessages.some(msg => message.includes(msg))
    
    if (shouldLog) {
      console.log(`[Axios] ${message}`, data || '')
    }
  }
}

api.interceptors.request.use(
  async (config) => {
    const isAuthRoute = config.url?.includes('/login') || 
                        config.url?.includes('/sign-up') || 
                        config.url?.includes('/forgot-password') || 
                        config.url?.includes('/reset-password')
    
    if (isAuthRoute) {
      // CRITICAL FIX: Remove any existing token from auth routes
      // This prevents token from previous session from interfering
      delete config.headers.Authorization
      return config
    }

    try {
      // CRITICAL FIX: Get token directly from localStorage, not from store
      // This ensures each request gets the CURRENT session's token
      // The store might have stale data if multiple tabs are open
      let token = localStorage.getItem('authToken')
      
      // Fallback to store if localStorage is empty (shouldn't happen, but safety)
      if (!token) {
        const authStore = useAuthStore()
        token = authStore.getToken()
      }

      if (!token) {
        const isLoginPage = window.location.pathname === '/login' || window.location.pathname.includes('/login')
        if (import.meta.env.DEV && !isLoginPage) {
          debugLog('No token available for request', { url: config.url })
        }
        return config
      }

      // CRITICAL FIX: Check token expiry before using it
      // Get expiry from localStorage (per-session)
      const storedExpiry = localStorage.getItem('tokenExpiry')
      if (storedExpiry) {
        const expiryDate = new Date(storedExpiry)
        const now = new Date()
        if (now >= expiryDate) {
          debugLog('Token expired, attempting refresh...')
          const authStore = useAuthStore()
          if (authStore.shouldRefreshToken() && !isRefreshing) {
            try {
              const refreshed = await authStore.refreshToken()
              if (refreshed) {
                token = localStorage.getItem('authToken') // Get fresh token
                updateEchoAuth()
                debugLog('Token refreshed proactively')
              } else {
                debugLog('Token refresh failed, clearing auth')
                return config // Will fail with 401, handled by response interceptor
              }
            } catch (error) {
              debugLog('Proactive refresh failed', error.message)
            }
          }
        }
      }

      // CRITICAL FIX: Always get fresh token from localStorage
      // This ensures we're using the token for THIS browser session
      token = localStorage.getItem('authToken') || token

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      // Only add socket_id if Echo is connected (prevent socket_id errors)
      try {
        const { getEcho } = require('./echo')
        const echo = getEcho()
        if (echo) {
          // Get socketId safely - handle both property and function access
          let socketId = null
          try {
            // Try as function first (Laravel Echo calls it as function)
            if (typeof echo.socketId === 'function') {
              socketId = echo.socketId()
            } else {
              // Try as property
              socketId = echo.socketId
            }
          } catch (e) {
            // If both fail, socketId is not available
            if (import.meta.env.DEV) {
              // Only log in dev mode
            }
          }
          
          if (socketId) {
            config.headers['X-Socket-ID'] = socketId
          }
        }
      } catch (error) {
        // Echo not available or not connected, skip socket_id
      }
    } catch (error) {
      debugLog('Error in request interceptor', error.message)
    }
    
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
    if (csrfToken) {
      config.headers['X-CSRF-TOKEN'] = csrfToken
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    // ============================================
    // AUTOMATIC TOAST FOR SUCCESS RESPONSES
    // Based on standardized ApiResponse format
    // ============================================
    if (!toast) {
      try {
        toast = useToast()
      } catch (e) {
        // Toast not available yet
      }
    }
    
    // Only show toast for non-GET requests (avoid toasts on data fetching)
    const method = response.config.method?.toUpperCase()
    const shouldShowToast = method !== 'GET' && toast

    if (shouldShowToast && response.data) {
      // Check if response follows standard ApiResponse format
      if (response.data.success === true && response.data.message) {
        toast.success(response.data.message, {
          timeout: 3000,
          hideProgressBar: false,
        })
      }
    }
    
    return response
  },
  async (error) => {
    // ============================================
    // AUTOMATIC TOAST FOR ERROR RESPONSES
    // Based on standardized ApiResponse format
    // ============================================
    if (!toast) {
      try {
        toast = useToast()
      } catch (e) {
        // Toast not available yet
      }
    }
    const originalRequest = error.config
    const status = error.response?.status

    // ============================================
    // DISPLAY ERROR TOAST (except for auth errors)
    // ============================================
    if (status !== 401 && status !== 403 && toast) {
      const errorData = error.response?.data
      
      // Check if response follows standard ApiResponse format
      if (errorData) {
        if (errorData.success === false && errorData.message) {
          // Standard error message
          toast.error(errorData.message, {
            timeout: 5000,
            hideProgressBar: false,
          })
        } else if (errorData.errors && typeof errorData.errors === 'object') {
          // Validation errors - show first error
          const firstError = Object.values(errorData.errors)[0]
          const errorMessage = Array.isArray(firstError) ? firstError[0] : firstError
          toast.error(errorMessage || 'Validation failed', {
            timeout: 5000,
            hideProgressBar: false,
          })
        } else if (errorData.error && typeof errorData.error === 'string') {
          // Fallback error field
          toast.error(errorData.error, {
            timeout: 5000,
            hideProgressBar: false,
          })
        } else {
          // Generic error
          toast.error('An error occurred. Please try again.', {
            timeout: 5000,
            hideProgressBar: false,
          })
        }
      } else {
        // No response data
        toast.error(error.message || 'Network error. Please check your connection.', {
          timeout: 5000,
          hideProgressBar: false,
        })
      }
    }
    
    // CRITICAL FIX: Handle 401 and 403 errors (both indicate auth issues)
    if (status !== 401 && status !== 403) {
      debugLog('API Error', { 
        status: status || 'unknown', 
        url: originalRequest?.url || 'unknown',
        message: error.response?.data?.message || error.message || 'Unknown error'
      })
      return Promise.reject(error)
    }

    // Handle 403 (Forbidden) - also redirect to login
    if (status === 403) {
      debugLog('403 Forbidden - redirecting to login')
      
      // Show toast for forbidden error
      if (toast && error.response?.data?.message) {
        toast.error(error.response.data.message, {
          timeout: 3000,
          hideProgressBar: false,
        })
      }
      
      const authStore = useAuthStore()
      authStore.clearAuth()
      
      const router = useRouter()
      const currentRoute = router.currentRoute.value
      const isLoginPage = currentRoute.name === 'Login' || currentRoute.path === '/login'
      
      if (!isLoginPage) {
        // CRITICAL FIX: Use window.location for reliable redirect
        window.location.href = `/login?redirect=${encodeURIComponent(currentRoute.fullPath)}`
      }
      
      return Promise.reject(error)
    }

    if (originalRequest._retry) {
      debugLog('Request already retried, redirecting to login')
      const authStore = useAuthStore()
      authStore.clearAuth() // Clear auth without API call
      
      const router = useRouter()
      const currentRoute = router.currentRoute.value
      const isLoginPage = currentRoute.name === 'Login' || currentRoute.path === '/login'
      
      if (!isLoginPage) {
        // CRITICAL FIX: Use window.location for reliable redirect
        window.location.href = `/login?redirect=${encodeURIComponent(currentRoute.fullPath)}`
      }
      
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          resolve(api(originalRequest))
        })
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const authStore = useAuthStore()
      const refreshed = await authStore.refreshToken()
      
      if (refreshed) {
        const newToken = authStore.getToken()
        updateEchoAuth()
        onTokenRefreshed(newToken)
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        isRefreshing = false
        debugLog('Token refreshed, retrying request')
        return api(originalRequest)
      } else {
        throw new Error('Token refresh failed')
      }
    } catch (refreshError) {
      debugLog('Token refresh failed', refreshError.message)
      isRefreshing = false
      refreshSubscribers = []
      
      // CRITICAL FIX: Always redirect to login on 401
      const authStore = useAuthStore()
      authStore.clearAuth() // Clear auth without API call
      
      // Import router dynamically to avoid circular dependency
      const router = useRouter()
      const currentRoute = router.currentRoute.value
      const isLoginPage = currentRoute.name === 'Login' || currentRoute.path === '/login'
      
      if (!isLoginPage) {
        // CRITICAL FIX: Use window.location for reliable redirect
        // Router.push might fail in some cases, window.location always works
        window.location.href = `/login?redirect=${encodeURIComponent(currentRoute.fullPath)}`
      }
      
      return Promise.reject(refreshError)
    }
  }
)

window.axios = api

export default api
