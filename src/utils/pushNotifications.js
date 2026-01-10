/**
 * Web Push Notifications Utility
 * Handles service worker registration and push notification subscription
 * Enables notifications even when the site is closed
 */

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || ''

/**
 * Register service worker for push notifications
 */
export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      })
      
      if (import.meta.env.DEV) {
        console.log('[Push] Service Worker registered:', registration.scope)
      }
      
      return registration
    } catch (error) {
      console.error('[Push] Service Worker registration failed:', error)
      return null
    }
  }
  return null
}

/**
 * Request notification permission from user
 */
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.warn('[Push] This browser does not support notifications')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission === 'denied') {
    console.warn('[Push] Notification permission denied')
    return false
  }

  // Request permission
  const permission = await Notification.requestPermission()
  return permission === 'granted'
}

/**
 * Convert VAPID public key from base64 to Uint8Array
 */
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

/**
 * Subscribe to push notifications
 */
export async function subscribeToPushNotifications(userId) {
  if (!VAPID_PUBLIC_KEY) {
    console.warn('[Push] VAPID_PUBLIC_KEY not configured')
    return null
  }

  try {
    // Register service worker
    const registration = await registerServiceWorker()
    if (!registration) {
      return null
    }

    // Request permission
    const hasPermission = await requestNotificationPermission()
    if (!hasPermission) {
      return null
    }

    // Subscribe to push service
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    })

    // Send subscription to backend
    const response = await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({
        user_id: userId,
        subscription: subscription.toJSON()
      })
    })

    if (response.ok) {
      if (import.meta.env.DEV) {
        console.log('[Push] Successfully subscribed to push notifications')
      }
      return subscription
    } else {
      console.error('[Push] Failed to save subscription to backend')
      return null
    }
  } catch (error) {
    console.error('[Push] Failed to subscribe to push notifications:', error)
    return null
  }
}

/**
 * Unsubscribe from push notifications
 */
export async function unsubscribeFromPushNotifications() {
  try {
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.getSubscription()
    
    if (subscription) {
      await subscription.unsubscribe()
      
      // Notify backend
      await fetch('/api/push/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      
      if (import.meta.env.DEV) {
        console.log('[Push] Unsubscribed from push notifications')
      }
    }
  } catch (error) {
    console.error('[Push] Failed to unsubscribe:', error)
  }
}

/**
 * Check if push notifications are supported
 */
export function isPushNotificationSupported() {
  return 'serviceWorker' in navigator && 'PushManager' in window
}

/**
 * Check if user has granted notification permission
 */
export function hasNotificationPermission() {
  return 'Notification' in window && Notification.permission === 'granted'
}
