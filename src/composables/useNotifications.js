import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { getEcho, getEchoAsync, isConnected } from '@/utils/echo'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import axios from '@/utils/axios'

/**
 * Realtime notification composable
 * Handles header notifications for DMs and channels
 */
export function useNotifications() {
  const authStore = useAuthStore()
  const toast = useToast()
  const router = useRouter()
  
  const notifications = ref([])
  const unreadCount = ref(0)
  const isLoading = ref(false)
  let echoInstance = null
  let userChannel = null

  // Computed
  const hasUnread = computed(() => unreadCount.value > 0)
  const recentNotifications = computed(() => {
    return notifications.value
      .filter(n => !n.is_read)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 10)
  })

  /**
   * Load notifications from API
   */
  const loadNotifications = async () => {
    if (!authStore.user?.id) return
    
    try {
      isLoading.value = true
      const response = await axios.get('/notifications', {
        params: {
          per_page: 50,
          unread_only: false
        }
      })
      
      if (response.data?.success && response.data?.data) {
        notifications.value = response.data.data.data || response.data.data || []
        unreadCount.value = notifications.value.filter(n => !n.is_read).length
      }
    } catch (error) {
      console.error('[Notifications] Failed to load:', error)
      // If endpoint doesn't exist, start with empty array
      notifications.value = []
      unreadCount.value = 0
    } finally {
      isLoading.value = false
    }
  }

  // CRITICAL FIX: Add retry counter to prevent infinite loops
  let retryCount = 0
  const MAX_RETRIES = 3 // Reduced from 10 - if connection fails, stop retrying
  let connectionFailed = false // Track if connection has permanently failed

  /**
   * Setup Echo listeners for realtime notifications
   */
  const setupEchoListeners = async () => {
    if (!authStore.user?.id) {
      if (import.meta.env.DEV) {
        console.warn('[Notifications] No user ID, skipping listener setup')
      }
      return
    }

    // CRITICAL FIX: Stop retrying if connection has permanently failed
    if (connectionFailed) {
      if (import.meta.env.DEV) {
        console.warn('[Notifications] Connection failed permanently. Reverb server may not be running.')
      }
      return
    }

    // CRITICAL FIX: Prevent infinite retry loops
    if (retryCount >= MAX_RETRIES) {
      console.error('[Notifications] Max retries reached. Echo connection failed.')
      console.error('[Notifications] Make sure Reverb server is running: php artisan reverb:start')
      connectionFailed = true
      return
    }

    try {
      // CRITICAL FIX: Use async version to ensure Echo is properly initialized
      echoInstance = await getEchoAsync()
      if (!echoInstance) {
        retryCount++
        if (import.meta.env.DEV) {
          console.warn(`[Notifications] Echo not initialized, retrying... (${retryCount}/${MAX_RETRIES})`)
        }
        setTimeout(setupEchoListeners, 2000)
        return
      }
      
      // CRITICAL FIX: Use Echo's connection state API, not Pusher internals
      if (!isConnected()) {
        retryCount++
        if (import.meta.env.DEV) {
          console.warn(`[Notifications] Echo not connected, retrying... (${retryCount}/${MAX_RETRIES})`)
        }
        setTimeout(setupEchoListeners, 2000)
        return
      }

      // Connection is ready, setup listeners
      retryCount = 0 // Reset on success
      connectionFailed = false
      setupChannelListeners()
    } catch (error) {
      console.error('[Notifications] Failed to setup listeners:', error)
      
      // Check if it's a connection timeout error
      if (error?.message?.includes('timeout') || error?.message?.includes('Reverb server')) {
        connectionFailed = true
        console.error('[Notifications] Connection timeout. Reverb server is not running.')
        console.error('[Notifications] Start Reverb server: php artisan reverb:start')
        return
      }
      
      retryCount++
      if (retryCount < MAX_RETRIES) {
        setTimeout(setupEchoListeners, 3000)
      } else {
        connectionFailed = true
        console.error('[Notifications] Max retries reached. Connection failed.')
      }
    }
  }

  /**
   * Setup channel listeners (called after connection is ready)
   */
  const setupChannelListeners = () => {
    try {
      // CRITICAL FIX: Use Echo's connection state API, not Pusher internals
      if (!isConnected()) {
        if (import.meta.env.DEV) {
          console.warn('[Notifications] Connection not ready for subscriptions, retrying...')
        }
        setTimeout(setupEchoListeners, 2000)
        return
      }

      // Subscribe to user's private channel for notifications
      userChannel = echoInstance.private(`user.${authStore.user.id}`)
      
      // CRITICAL FIX: Wait for subscription to be authorized before setting up listeners
      userChannel.subscribed(() => {
        if (import.meta.env.DEV) {
          console.log('[Notifications] User channel subscribed successfully')
        }
        
        // Setup listeners only after subscription is confirmed
        // Listen for DM notifications
        userChannel.listen('.dm.notification', (data) => {
          handleNotification(data, 'dm')
        })

        // Listen for channel notifications
        userChannel.listen('.channel.notification', (data) => {
          handleNotification(data, 'channel')
        })

        // Listen for unread count updates
        userChannel.listen('.unread.updated', (data) => {
          // Update unread count for specific conversation
          // This is handled by the messaging components
          if (import.meta.env.DEV) {
            console.log('[Notifications] Unread count updated:', data)
          }
        })

        console.log('[Notifications] Listeners setup complete')
      })
      
      userChannel.error((error) => {
        console.error('[Notifications] Channel subscription error:', error)
        retryCount++
        if (retryCount < MAX_RETRIES) {
          setTimeout(setupEchoListeners, 3000)
        }
      })
    } catch (error) {
      console.error('[Notifications] Failed to setup channel listeners:', error)
      // Retry after delay
      retryCount++
      if (retryCount < MAX_RETRIES) {
        setTimeout(setupEchoListeners, 2000)
      }
    }
  }

  /**
   * Handle incoming notification
   */
  const handleNotification = (data, type) => {
    if (!data?.notification) return

    const notification = {
      id: data.notification.id || Date.now(),
      conversation_id: data.notification.conversation_id,
      conversation_name: data.notification.conversation_name || 'Unknown',
      conversation_type: type,
      sender: data.notification.sender || {},
      message_preview: data.notification.message_preview || '',
      created_at: data.notification.created_at || new Date().toISOString(),
      is_read: false
    }

    // CRITICAL FIX: If conversation data is included, emit event so MessagingApp can add it to sidebar
    if (data.conversation && type === 'dm') {
      // Emit custom event that MessagingApp can listen to
      window.dispatchEvent(new CustomEvent('dm-conversation-updated', {
        detail: { conversation: data.conversation }
      }))
    }

    // Add to notifications array (avoid duplicates)
    const exists = notifications.value.find(n => 
      n.id === notification.id && 
      n.conversation_id === notification.conversation_id
    )
    
    if (!exists) {
      notifications.value.unshift(notification)
      unreadCount.value++
      
      // Show toast notification
      const senderName = notification.sender?.name || 'Someone'
      const conversationName = notification.conversation_name
      
      toast.info(`${senderName} sent a message in ${conversationName}`, {
        onClick: () => {
          navigateToNotification(notification)
        },
        timeout: 5000
      })

      // Browser notification (if permission granted)
      if (typeof window !== 'undefined' && 'Notification' in window) {
        if (Notification.permission === 'granted') {
          new Notification(`${senderName} - ${conversationName}`, {
            body: notification.message_preview || 'New message',
            icon: notification.sender?.avatar || '/favicon.ico',
            tag: `notification-${notification.id}`
          })
        } else if (Notification.permission === 'default') {
          Notification.requestPermission()
        }
      }
    }
  }

  /**
   * Navigate to notification conversation
   */
  const navigateToNotification = (notification) => {
    try {
      if (notification.conversation_type === 'dm') {
        router.push({ 
          name: 'Messaging', 
          query: { dm: notification.conversation_id } 
        }).catch(err => {
          // Ignore navigation errors (e.g., already on that route)
          if (err.name !== 'NavigationDuplicated') {
            console.error('[Notifications] Navigation error:', err)
          }
        })
      } else if (notification.conversation_type === 'channel') {
        router.push({ 
          name: 'Messaging', 
          query: { channel: notification.conversation_id } 
        }).catch(err => {
          // Ignore navigation errors
          if (err.name !== 'NavigationDuplicated') {
            console.error('[Notifications] Navigation error:', err)
          }
        })
      }
      
      // Mark as read
      markAsRead(notification.id)
    } catch (error) {
      console.error('[Notifications] Failed to navigate:', error)
    }
  }

  /**
   * Mark notification as read
   */
  const markAsRead = async (notificationId) => {
    const notification = notifications.value.find(n => n.id === notificationId)
    if (!notification || notification.is_read) return

    try {
      // Update locally first (optimistic update)
      notification.is_read = true
      if (unreadCount.value > 0) {
        unreadCount.value--
      }

      // Update on server
      await axios.put(`/notifications/${notificationId}/read`)
    } catch (error) {
      console.error('[Notifications] Failed to mark as read:', error)
      // Revert on error
      notification.is_read = false
      unreadCount.value++
    }
  }

  /**
   * Mark all as read
   */
  const markAllAsRead = async () => {
    try {
      await axios.post('/notifications/mark-all-read')
      notifications.value.forEach(n => {
        n.is_read = true
      })
      unreadCount.value = 0
    } catch (error) {
      console.error('[Notifications] Failed to mark all as read:', error)
    }
  }

  /**
   * Cleanup listeners
   */
  const cleanup = () => {
    if (userChannel && echoInstance) {
      try {
        echoInstance.leave(`user.${authStore.user.id}`)
      } catch (error) {
        console.error('[Notifications] Error cleaning up:', error)
      }
    }
    userChannel = null
  }

  // Initialize on mount
  onMounted(async () => {
    await loadNotifications()
    setupEchoListeners()
  })

  // Cleanup on unmount
  onUnmounted(() => {
    cleanup()
  })

  return {
    notifications: computed(() => notifications.value),
    unreadCount: computed(() => unreadCount.value),
    hasUnread,
    recentNotifications,
    isLoading: computed(() => isLoading.value),
    loadNotifications,
    markAsRead,
    markAllAsRead,
    navigateToNotification
  }
}
