// Service Worker for Web Push Notifications
// This enables notifications even when the site is closed

const CACHE_NAME = 'erp-messaging-v1'
const NOTIFICATION_TITLE = 'New Message'

// Install event - cache resources
self.addEventListener('install', (event) => {
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  return self.clients.claim()
})

// Push event - handle incoming push notifications
self.addEventListener('push', (event) => {
  let notificationData = {
    title: 'New Message',
    body: 'You have a new message',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'message-notification',
    requireInteraction: false,
    data: {}
  }

  if (event.data) {
    try {
      const data = event.data.json()
      notificationData = {
        title: data.title || notificationData.title,
        body: data.body || data.message || notificationData.body,
        icon: data.icon || notificationData.icon,
        badge: data.badge || notificationData.badge,
        tag: data.tag || `message-${data.conversation_id || Date.now()}`,
        requireInteraction: data.requireInteraction || false,
        data: {
          conversation_id: data.conversation_id,
          conversation_type: data.conversation_type,
          url: data.url || '/messaging'
        }
      }
    } catch (e) {
      // If data is text, use it as body
      notificationData.body = event.data.text() || notificationData.body
    }
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, {
      body: notificationData.body,
      icon: notificationData.icon,
      badge: notificationData.badge,
      tag: notificationData.tag,
      requireInteraction: notificationData.requireInteraction,
      data: notificationData.data,
      actions: [
        {
          action: 'open',
          title: 'Open Chat'
        },
        {
          action: 'close',
          title: 'Close'
        }
      ]
    })
  )
})

// Notification click event - handle user clicking on notification
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'close') {
    return
  }

  // Default action or 'open' action - navigate to conversation
  const data = event.notification.data || {}
  const url = data.url || '/messaging'
  
  // Add query params if conversation info is available
  let targetUrl = url
  if (data.conversation_id) {
    if (data.conversation_type === 'dm') {
      targetUrl = `${url}?dm=${data.conversation_id}`
    } else if (data.conversation_type === 'channel') {
      targetUrl = `${url}?channel=${data.conversation_id}`
    }
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Check if there's already a window open
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i]
        if (client.url.includes('/messaging') && 'focus' in client) {
          return client.focus().then(() => {
            // Navigate to the specific conversation
            return client.navigate(targetUrl)
          })
        }
      }
      // If no window is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(targetUrl)
      }
    })
  )
})

// Message event - handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
