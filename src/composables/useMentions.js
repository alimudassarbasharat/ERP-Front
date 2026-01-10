import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { getEcho } from '@/utils/echo'
import { useToast } from 'vue-toastification'

export function useMentions() {
  const authStore = useAuthStore()
  const toast = useToast()
  const mentions = ref([])
  const unreadMentions = ref(0)

  const setupMentionListener = () => {
    if (!authStore.user?.id) return

    try {
      const echo = getEcho()
      if (!echo) {
        console.warn('[Mentions] Echo not initialized yet')
        return
      }
      const channel = echo.private(`user.${authStore.user.id}`)

      channel.listen('.user.mentioned', (data) => {
        mentions.value.unshift({
          id: Date.now(),
          messageId: data.message_id,
          conversationId: data.conversation_id,
          conversationType: data.conversation_type,
          conversationName: data.conversation_name,
          mentioner: data.mentioner,
          messagePreview: data.message_preview,
          createdAt: data.created_at,
          read: false
        })

        unreadMentions.value++

        toast.info(`You were mentioned by ${data.mentioner.name} in ${data.conversation_name}`, {
          onClick: () => {
            navigateToMention(data)
          }
        })

        if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
          new Notification(`Mentioned by ${data.mentioner.name}`, {
            body: data.message_preview,
            icon: data.mentioner.avatar || '/favicon.ico'
          })
        }
      })

      return () => {
        if (echo) {
          echo.leave(`user.${authStore.user.id}`)
        }
      }
    } catch (error) {
      console.error('[Mentions] Failed to setup listener:', error)
      return () => {}
    }
  }

  const navigateToMention = (mention) => {
    const router = window.$router || useRouter()
    if (mention.conversationType === 'dm') {
      router.push({ name: 'Messaging', query: { dm: mention.conversationId } })
    } else {
      router.push({ name: 'Messaging', query: { channel: mention.conversationId } })
    }
    markAsRead(mention.id)
  }

  const markAsRead = (mentionId) => {
    const mention = mentions.value.find(m => m.id === mentionId)
    if (mention && !mention.read) {
      mention.read = true
      unreadMentions.value = Math.max(0, unreadMentions.value - 1)
    }
  }

  const markAllAsRead = () => {
    mentions.value.forEach(m => {
      if (!m.read) {
        m.read = true
      }
    })
    unreadMentions.value = 0
  }

  const clearMentions = () => {
    mentions.value = []
    unreadMentions.value = 0
  }

  return {
    mentions: computed(() => mentions.value),
    unreadMentions: computed(() => unreadMentions.value),
    setupMentionListener,
    navigateToMention,
    markAsRead,
    markAllAsRead,
    clearMentions
  }
}
