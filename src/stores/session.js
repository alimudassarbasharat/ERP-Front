import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/utils/axios'

/**
 * Session Store
 * =============
 * 
 * Manages current academic session (e.g., 2024-2025) for the logged-in merchant.
 * 
 * Features:
 * - Loads current active session
 * - Caches session to avoid repeated DB calls
 * - Validates session exists before module access
 * - Multi-tenant safe (merchant_id scoped)
 */
export const useSessionStore = defineStore('session', () => {
  // State
  const currentSession = ref(null)
  const availableSessions = ref([])
  const isLoading = ref(false)
  const lastLoadTime = ref(null)
  const cacheTimeout = 5 * 60 * 1000 // 5 minutes

  // Computed
  const hasActiveSession = computed(() => {
    return !!currentSession.value && !!currentSession.value.id
  })

  const currentSessionId = computed(() => {
    return currentSession.value?.id || null
  })

  const currentSessionName = computed(() => {
    return currentSession.value?.name || null
  })

  const shouldReload = computed(() => {
    if (!lastLoadTime.value) return true
    const now = Date.now()
    return (now - lastLoadTime.value) > cacheTimeout
  })

  /**
   * Load current active session from backend
   * Uses caching to avoid repeated calls
   */
  const loadCurrentSession = async (force = false) => {
    // Use cache if recent and not forcing reload
    if (!force && !shouldReload.value && currentSession.value) {
      console.log('📋 Using cached session:', currentSession.value.name)
      return currentSession.value
    }

    isLoading.value = true
    
    try {
      console.log('🔍 Loading current session from API...')
      
      // First try to get from localStorage (for offline first load)
      const cachedSessionId = localStorage.getItem('currentSessionId')
      if (cachedSessionId && !force) {
        const cachedSession = JSON.parse(localStorage.getItem('currentSession') || 'null')
        if (cachedSession && cachedSession.id == cachedSessionId) {
          currentSession.value = cachedSession
          console.log('📱 Loaded session from localStorage:', cachedSession.name)
        }
      }

      // Fetch active session from backend
      const response = await api.get('/sessions/active')
      
      if (response.data.success && response.data.data) {
        currentSession.value = response.data.data
        lastLoadTime.value = Date.now()
        
        // Cache in localStorage
        localStorage.setItem('currentSessionId', currentSession.value.id)
        localStorage.setItem('currentSession', JSON.stringify(currentSession.value))
        
        console.log('✅ Active session loaded:', currentSession.value.name)
        return currentSession.value
      } else {
        console.warn('⚠️ No active session found')
        currentSession.value = null
        localStorage.removeItem('currentSessionId')
        localStorage.removeItem('currentSession')
        return null
      }
    } catch (error) {
      console.error('❌ Failed to load current session:', error)
      
      // If API fails but we have cached session, use it
      if (currentSession.value) {
        console.log('📦 Using cached session due to API error')
        return currentSession.value
      }
      
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Load all available sessions for dropdown
   */
  const loadAvailableSessions = async () => {
    try {
      const response = await api.get('/sessions/select-options')
      
      if (response.data.success && Array.isArray(response.data.data)) {
        availableSessions.value = response.data.data
        console.log(`📚 Loaded ${availableSessions.value.length} available session(s)`)
        return availableSessions.value
      }
      
      return []
    } catch (error) {
      console.error('❌ Failed to load available sessions:', error)
      return []
    }
  }

  /**
   * Set current session
   * Called when user selects a session from dropdown
   */
  const setCurrentSession = async (sessionId) => {
    try {
      // If null, clear session
      if (!sessionId) {
        currentSession.value = null
        localStorage.removeItem('currentSessionId')
        localStorage.removeItem('currentSession')
        console.log('🔄 Session cleared')
        return true
      }

      // Find session in available sessions
      let session = availableSessions.value.find(s => s.id == sessionId)
      
      // If not in cache, fetch it
      if (!session) {
        const response = await api.get(`/sessions/${sessionId}`)
        if (response.data.success) {
          session = response.data.data
        }
      }

      if (session) {
        currentSession.value = session
        lastLoadTime.value = Date.now()
        
        // Cache in localStorage
        localStorage.setItem('currentSessionId', session.id)
        localStorage.setItem('currentSession', JSON.stringify(session))
        
        console.log('✅ Session set:', session.name)
        return true
      }
      
      return false
    } catch (error) {
      console.error('❌ Failed to set current session:', error)
      return false
    }
  }

  /**
   * Clear current session
   */
  const clearSession = () => {
    currentSession.value = null
    availableSessions.value = []
    lastLoadTime.value = null
    localStorage.removeItem('currentSessionId')
    localStorage.removeItem('currentSession')
    console.log('🧹 Session store cleared')
  }

  /**
   * Validate session exists and is active
   * Clears cache if session was soft-deleted
   */
  const validateSession = async () => {
    if (!currentSession.value) {
      return false
    }

    try {
      // Verify session still exists and is valid
      const response = await api.get(`/sessions/${currentSession.value.id}`)
      
      if (response.data.success && response.data.data) {
        const session = response.data.data
        
        // Check if session was deleted
        if (session.deleted_at) {
          console.warn('⚠️ Current session was deleted, clearing...')
          clearSession()
          return false
        }
        
        // Update cached session
        currentSession.value = session
        localStorage.setItem('currentSession', JSON.stringify(session))
        
        return true
      } else {
        console.warn('⚠️ Session validation failed, clearing...')
        clearSession()
        return false
      }
    } catch (error) {
      console.error('❌ Session validation error:', error)
      // Keep current session if API fails (might be network issue)
      return !!currentSession.value
    }
  }

  /**
   * Initialize on app start
   */
  const initialize = async () => {
    console.log('🚀 Initializing session store...')
    await loadCurrentSession()
    await loadAvailableSessions()
  }

  return {
    // State
    currentSession,
    availableSessions,
    isLoading,
    
    // Computed
    hasActiveSession,
    currentSessionId,
    currentSessionName,
    
    // Actions
    loadCurrentSession,
    loadAvailableSessions,
    setCurrentSession,
    clearSession,
    validateSession,
    initialize
  }
})
