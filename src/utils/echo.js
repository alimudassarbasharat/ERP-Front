import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

// CRITICAL FIX: Create a proper singleton that's always available
let echoInstance = null
let initializationPromise = null
let isInitializing = false
let connectionState = 'disconnected' // Track connection state: 'disconnected', 'connecting', 'connected', 'failed'

const getAuthToken = () => {
  try {
    const { useAuthStore } = require('@/stores/auth')
    const authStore = useAuthStore()
    if (authStore && authStore.token) {
      return authStore.token
    }
  } catch (error) {
    // Pinia not initialized yet, use localStorage directly
  }
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || ''
}

/**
 * Check if Echo is connected using Echo's API (not Pusher internals)
 */
const isEchoConnected = () => {
  if (!echoInstance) return false
  
  try {
    // Use Echo's socketId() method to check connection
    const socketId = echoInstance.socketId()
    return socketId !== null && socketId !== undefined
  } catch (error) {
    return false
  }
}

/**
 * Initialize Echo instance - ensures only one instance exists
 * This fixes "getEcho is not defined" errors by making it always available
 */
const initializeEcho = () => {
  // Return existing instance if available and connected
  if (echoInstance && isEchoConnected()) {
    updateEchoAuth()
    return Promise.resolve(echoInstance)
  }

  // If already initializing, return the existing promise
  if (initializationPromise) {
    return initializationPromise
  }

  // Prevent multiple simultaneous initializations
  if (isInitializing) {
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (echoInstance && isEchoConnected()) {
          clearInterval(checkInterval)
          resolve(echoInstance)
        }
      }, 100)
    })
  }

  isInitializing = true
  connectionState = 'connecting'

  initializationPromise = new Promise((resolve, reject) => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://erp-back-f0xb.onrender.com'
    const reverbHost = import.meta.env.VITE_REVERB_HOST || 'localhost'
    const reverbPort = import.meta.env.VITE_REVERB_PORT || '8080'
    const reverbKey = import.meta.env.VITE_REVERB_APP_KEY || 'your-reverb-key'

    // Get fresh auth token
    const authToken = getAuthToken()
    if (!authToken) {
      isInitializing = false
      initializationPromise = null
      connectionState = 'disconnected'
      if (import.meta.env.DEV) {
        console.warn('[Echo] No auth token available, Echo will not connect')
      }
      resolve(null)
      return
    }

    try {
      // Construct WebSocket URL for debugging
      const wsUrl = `ws://${reverbHost}:${reverbPort}/app/${reverbKey}`
      
      if (import.meta.env.DEV) {
        console.log('[Echo] Initializing WebSocket connection...')
        console.log('[Echo] WebSocket URL:', wsUrl)
        console.log('[Echo] Config:', {
          host: reverbHost,
          port: reverbPort,
          key: reverbKey ? reverbKey.substring(0, 10) + '...' : 'missing',
          authEndpoint: `${apiBaseUrl}/broadcasting/auth`
        })
      }

      echoInstance = new Echo({
        broadcaster: 'reverb',
        key: reverbKey,
        wsHost: reverbHost,
        wsPort: reverbPort,
        wssPort: reverbPort,
        wsPath: '/app', // Reverb WebSocket path
        forceTLS: false,
        enabledTransports: ['ws', 'wss'],
        disableStats: true,
        authEndpoint: `${apiBaseUrl}/broadcasting/auth`,
        // CRITICAL: Add connection timeout to prevent hanging
        activityTimeout: 30000, // 30 seconds
        pongTimeout: 6000, // 6 seconds
        auth: {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        },
        client: Pusher
      })

      // Override socketId to prevent errors when connection isn't ready
      echoInstance.socketId = function() {
        try {
          const pusher = this.connector?.pusher
          if (pusher?.connection?.state === 'connected' && pusher.socket_id) {
            return pusher.socket_id
          }
          return null
        } catch (error) {
          return null
        }
      }.bind(echoInstance)

      // CRITICAL FIX: Use Echo connection state, not Pusher internals
      let connectionTimeout = null
      let maxWaitTime = 100000 // 10 seconds max wait
      let startTime = Date.now()
      let listenersBound = false
      
      const checkConnection = () => {
        // Check if we've waited too long
        if (Date.now() - startTime > maxWaitTime) {
          if (connectionTimeout) {
            clearTimeout(connectionTimeout)
          }
          connectionState = 'failed'
          isInitializing = false
          initializationPromise = null
          if (import.meta.env.DEV) {
            console.error('[Echo] ❌ Connection timeout after 10 seconds')
            console.error('[Echo] Reverb server may not be running. Start it with: php artisan reverb:start')
            console.error('[Echo] Check Reverb configuration in .env file')
          }
          reject(new Error('Echo connection timeout - Reverb server may not be running. Check: php artisan reverb:start'))
          return
        }
        
        // Use Echo's socketId() to check connection (not Pusher internals)
        if (isEchoConnected()) {
          if (connectionTimeout) {
            clearTimeout(connectionTimeout)
          }
          connectionState = 'connected'
          isInitializing = false
          if (import.meta.env.DEV) {
            const socketId = echoInstance.socketId()
            console.log('[Echo] ✅ Connected to Reverb WebSocket server')
            console.log('[Echo] Socket ID:', socketId)
            console.log('[Echo] Reverb config:', {
              host: reverbHost,
              port: reverbPort,
              key: reverbKey.substring(0, 10) + '...'
            })
          }
          resolve(echoInstance)
          return
        }
        
        // Not connected yet, set up event listeners if not already set
        const pusher = echoInstance.connector?.pusher
        
        if (!pusher) {
          // Pusher connector not available yet, check again
          connectionTimeout = setTimeout(checkConnection, 200)
          return
        }
        
        if (!pusher.connection) {
          // Connection object not available yet, check again
          connectionTimeout = setTimeout(checkConnection, 200)
          return
        }
        
        // CRITICAL: Ensure Pusher is actually trying to connect
        const currentState = pusher.connection.state
        
        // Log connection state for debugging
        if (import.meta.env.DEV && Date.now() - startTime > 2000) {
          // Only log after 2 seconds to avoid spam
          console.log('[Echo] Connection state:', currentState, '| Time elapsed:', Math.round((Date.now() - startTime) / 1000) + 's')
        }
        
        if (currentState === 'disconnected' || currentState === 'failed') {
          // Try to initiate connection
          try {
            if (import.meta.env.DEV) {
              console.log('[Echo] Initiating Pusher connection, current state:', currentState)
              console.log('[Echo] Attempting to connect to:', `ws://${reverbHost}:${reverbPort}/app/${reverbKey.substring(0, 10)}...`)
            }
            pusher.connect()
          } catch (e) {
            if (import.meta.env.DEV) {
              console.warn('[Echo] Could not manually trigger connection:', e)
            }
          }
        }
        
        // Check for connection errors early
        if (currentState === 'failed' || currentState === 'unavailable') {
          // Connection failed, reject immediately
          if (connectionTimeout) {
            clearTimeout(connectionTimeout)
          }
          connectionState = 'failed'
          isInitializing = false
          initializationPromise = null
          listenersBound = false
          
          const errorMsg = `WebSocket connection failed. State: ${currentState}. Reverb server may not be running on ${reverbHost}:${reverbPort}`
          console.error('[Echo] ❌', errorMsg)
          console.error('[Echo] Start Reverb server: cd ERP-Back && php artisan reverb:start')
          reject(new Error(errorMsg))
          return
        }
        
        if (!listenersBound) {
          listenersBound = true
          
          pusher.connection.bind('connected', () => {
            if (connectionTimeout) {
              clearTimeout(connectionTimeout)
            }
            connectionState = 'connected'
            isInitializing = false
            console.log('[Echo] ✅ Connected to Reverb WebSocket server')
            console.log('[Echo] Socket ID:', pusher.socket_id)
            resolve(echoInstance)
          })

          pusher.connection.bind('disconnected', () => {
            connectionState = 'disconnected'
            console.warn('[Echo] ⚠️ WebSocket Disconnected from Reverb server')
            console.warn('[Echo] Check if Reverb server is still running: php artisan reverb:start')
          })

          pusher.connection.bind('error', (err) => {
            if (connectionTimeout) {
              clearTimeout(connectionTimeout)
            }
            connectionState = 'failed'
            isInitializing = false
            initializationPromise = null
            listenersBound = false
            
            // CRITICAL: Always show connection errors with full details
            console.error('[Echo] ❌ WebSocket Connection Error:', err)
            console.error('[Echo] Error details:', {
              type: err?.type,
              error: err?.error,
              data: err?.data,
              message: err?.message,
              code: err?.code
            })
            console.error('[Echo] WebSocket Config:', {
              host: reverbHost,
              port: reverbPort,
              wsPath: '/app',
              key: reverbKey ? reverbKey.substring(0, 10) + '...' : 'missing',
              authEndpoint: `${apiBaseUrl}/broadcasting/auth`,
              wsUrl: `ws://${reverbHost}:${reverbPort}/app/${reverbKey ? reverbKey.substring(0, 10) + '...' : 'missing'}`
            })
            console.error('[Echo] ⚠️ Reverb server may not be running!')
            console.error('[Echo] Start Reverb server: cd ERP-Back && php artisan reverb:start')
            
            reject(err)
          })

          pusher.connection.bind('state_change', (states) => {
            connectionState = states.current
            console.log('[Echo] Connection state changed:', states.previous, '->', states.current)
            
            if (states.current === 'connected') {
              if (connectionTimeout) {
                clearTimeout(connectionTimeout)
              }
              isInitializing = false
              console.log('[Echo] ✅ Connected via state_change event')
              resolve(echoInstance)
            }
          })
        }
        
        // Continue checking if not connected yet
        connectionTimeout = setTimeout(checkConnection, 200)
      }
      
      // CRITICAL: Start checking for connection immediately
      // Also ensure Pusher starts connecting
      setTimeout(() => {
        const pusher = echoInstance.connector?.pusher
        if (pusher && pusher.connection) {
          const currentState = pusher.connection.state
          if (currentState === 'disconnected' || currentState === 'failed' || !currentState) {
            if (import.meta.env.DEV) {
              console.log('[Echo] Starting Pusher connection, initial state:', currentState)
            }
            try {
              pusher.connect()
            } catch (e) {
              if (import.meta.env.DEV) {
                console.warn('[Echo] Could not start connection:', e)
              }
            }
          }
        }
        checkConnection()
      }, 100)
    } catch (error) {
      console.error('[Echo] Failed to initialize:', error)
      connectionState = 'failed'
      isInitializing = false
      initializationPromise = null
      reject(error)
    }
  })

  return initializationPromise
}

/**
 * Get Echo instance - always returns a valid instance or null
 * This is the main export that components should use
 */
export const getEcho = () => {
  // Return existing instance immediately if available
  if (echoInstance && isEchoConnected()) {
    updateEchoAuth()
    return echoInstance
  }

  // If not initialized, return null (caller should handle this)
  // Components should use getEchoAsync() or check for null
  return null
}

/**
 * Get Echo instance asynchronously - recommended for new code
 * Returns a promise that resolves when Echo is ready
 */
export const getEchoAsync = async () => {
  if (echoInstance && isEchoConnected()) {
    updateEchoAuth()
    return echoInstance
  }

  return await initializeEcho()
}

/**
 * Check if Echo is connected (public API)
 */
export const isConnected = () => {
  return isEchoConnected()
}

/**
 * Get current connection state
 */
export const getConnectionState = () => {
  return connectionState
}

export const updateEchoAuth = () => {
  if (echoInstance) {
    const token = getAuthToken()
    
    if (echoInstance.connector?.options?.auth) {
      echoInstance.connector.options.auth.headers.Authorization = `Bearer ${token}`
    }
  }
}

export const disconnectEcho = () => {
  if (echoInstance) {
    try {
      echoInstance.disconnect()
    } catch (error) {
      console.error('[Echo] Error disconnecting:', error)
    }
    echoInstance = null
    initializationPromise = null
    isInitializing = false
    connectionState = 'disconnected'
  }
}

// Export both sync and async versions
export default getEcho
