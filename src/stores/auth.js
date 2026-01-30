import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/utils/axios'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const user = ref(null)
  const tokenExpiry = ref(null)
  const isRefreshing = ref(false)

  const isAuthenticated = computed(() => {
    return !!token.value && !!user.value && !isTokenExpired()
  })

  const isTokenExpired = () => {
    if (!tokenExpiry.value) return false
    return new Date() >= new Date(tokenExpiry.value)
  }

  const shouldRefreshToken = () => {
    if (!tokenExpiry.value) return false
    const expiry = new Date(tokenExpiry.value)
    const now = new Date()
    const timeUntilExpiry = expiry - now
    const fiveMinutes = 5 * 60 * 1000
    return timeUntilExpiry < fiveMinutes && timeUntilExpiry > 0
  }

  const debugLog = (message, data = null) => {
    if (import.meta.env.DEV) {
      const importantMessages = ['Error', 'Failed', 'Token refreshed', 'Logout', 'Login']
      const shouldLog = importantMessages.some(msg => message.includes(msg))
      
      if (shouldLog) {
        console.log(`[Auth Store] ${message}`, data || '')
      }
    }
  }

  const initFromStorage = () => {
    try {
      const storedToken = localStorage.getItem('authToken')
      const storedUser = localStorage.getItem('user')
      const storedExpiry = localStorage.getItem('tokenExpiry')

      if (storedToken) {
        token.value = storedToken
      }

      if (storedUser) {
        try {
          user.value = JSON.parse(storedUser)
        } catch (e) {
          console.error('[Auth Store] Failed to parse user from storage', e)
        }
      }

      if (storedExpiry) {
        tokenExpiry.value = storedExpiry
      }

      if (storedToken && isTokenExpired()) {
        debugLog('Stored token expired, clearing auth')
        clearAuth()
        return false
      }

      return !!storedToken && !!storedUser
    } catch (error) {
      console.error('[Auth Store] Error initializing from storage', error)
      return false
    }
  }

  const checkAuth = async () => {
    if (initFromStorage()) {
      if (isTokenExpired()) {
        const refreshed = await refreshToken()
        return refreshed
      }
      return true
    }

    try {
      const response = await api.get('/user')
      if (response.data?.success && response.data?.data) {
        const userData = response.data.data
        user.value = userData
        localStorage.setItem('user', JSON.stringify(userData))
        return true
      }
    } catch (error) {
      debugLog('Failed to check auth', error.message)
    }

    return false
  }

  const login = async (credentials) => {
    try {
      // CRITICAL FIX: Use a fresh axios instance without interceptors for login
      // This prevents token from previous sessions from interfering
      const loginApi = axios.create({
        baseURL: import.meta.env.VITE_API_URL || 'https://erp-back-f0xb.onrender.com/api',
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      
      const response = await loginApi.post('/login', credentials)
      const { access_token, token_type, expires_in, admin, user: userData } = response.data

      if (!access_token) {
        throw new Error('Access token is required')
      }

      // CRITICAL FIX: Store token and user data atomically
      // This ensures the current session's data is stored correctly
      // localStorage is already isolated per browser/origin, so this is safe
      token.value = access_token
      localStorage.setItem('authToken', access_token)
      debugLog('Token stored', { userId: (userData || admin)?.id })

      const userToStore = userData || admin
      if (userToStore) {
        user.value = userToStore
        localStorage.setItem('user', JSON.stringify(userToStore))
        debugLog('User stored', { id: userToStore.id, email: userToStore.email })
      }

      if (expires_in) {
        const expiryDate = new Date(Date.now() + expires_in * 1000)
        tokenExpiry.value = expiryDate.toISOString()
        localStorage.setItem('tokenExpiry', expiryDate.toISOString())
      } else {
        const expiryDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
        tokenExpiry.value = expiryDate.toISOString()
        localStorage.setItem('tokenExpiry', expiryDate.toISOString())
      }

      return true
    } catch (error) {
      console.error('[Auth Store] Login error:', error)
      clearAuth()
      throw error
    }
  }

  const logout = async () => {
    try {
      if (token.value) {
        await api.post('/logout')
      }
    } catch (error) {
      debugLog('Logout API call failed', error.message)
    } finally {
      clearAuth()
      debugLog('User logged out')
    }
  }

  const refreshToken = async () => {
    if (isRefreshing.value) {
      return false
    }

    if (!token.value) {
      debugLog('No token to refresh')
      return false
    }

    isRefreshing.value = true

    try {
      const response = await api.post('/refresh')
      const { access_token, expires_in } = response.data

      if (!access_token) {
        throw new Error('No access token in refresh response')
      }

      token.value = access_token
      localStorage.setItem('authToken', access_token)

      if (expires_in) {
        const expiryDate = new Date(Date.now() + expires_in * 1000)
        tokenExpiry.value = expiryDate.toISOString()
        localStorage.setItem('tokenExpiry', expiryDate.toISOString())
      }

      debugLog('Token refreshed successfully')
      isRefreshing.value = false
      return true
    } catch (error) {
      debugLog('Token refresh failed', error.message)
      clearAuth()
      isRefreshing.value = false
      return false
    }
  }

  const clearAuth = () => {
    token.value = null
    user.value = null
    tokenExpiry.value = null
    
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    localStorage.removeItem('tokenExpiry')
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('tokenExpiry')
  }

  const getToken = () => {
    return token.value || localStorage.getItem('authToken')
  }

  return {
    token,
    user,
    tokenExpiry,
    isAuthenticated,
    isRefreshing,
    login,
    logout,
    refreshToken,
    checkAuth,
    clearAuth,
    getToken,
    shouldRefreshToken,
    isTokenExpired,
    initFromStorage
  }
})
