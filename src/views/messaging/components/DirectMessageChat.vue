<template>
  <div class="direct-message-chat flex flex-col h-full bg-white dark:bg-gray-900">
    <!-- Chat Header -->
    <div class="chat-header flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div class="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        <div class="relative">
          <img
            :src="getUserAvatar(otherUser)"
            :alt="otherUser?.name || 'User'"
            class="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          />
          <div
            v-if="otherUser?.status"
            class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800"
            :class="{
              'bg-green-500': otherUser.status === 'online',
              'bg-yellow-500': otherUser.status === 'away',
              'bg-red-500': otherUser.status === 'busy',
              'bg-gray-400': otherUser.status === 'offline'
            }"
          />
        </div>
        <div class="flex-1 min-w-0">
          <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white truncate">
            {{ otherUser?.name || 'Unknown User' }}
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            <span v-if="isTyping" class="text-purple-600 dark:text-purple-400">{{ typingUserName }} is typing...</span>
            <span v-else>{{ otherUser?.status || 'offline' }}</span>
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="initiateCall('audio')"
          class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Start audio call"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
        </button>
        <button
          @click="initiateCall('video')"
          class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Start video call"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Messages Area -->
    <div
      ref="messagesContainer"
      class="messages-area flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4"
      @scroll="handleScroll"
    >
      <div v-if="loading" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>

      <div v-else-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-center py-12">
        <svg class="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
        <p class="text-gray-500 dark:text-gray-400">No messages yet. Start the conversation!</p>
      </div>

      <template v-else>
        <div
          v-for="(message, index) in messages"
          :key="message.id"
          class="message-group flex"
          :class="{
            'justify-end': isOwnMessage(message),
            'justify-start': !isOwnMessage(message)
          }"
        >
          <div
            class="message-bubble max-w-[85%] sm:max-w-[70%] lg:max-w-[60%]"
            :class="{
              'bg-purple-600 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg': isOwnMessage(message),
              'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-tl-lg rounded-tr-lg rounded-br-lg': !isOwnMessage(message)
            }"
          >
            <!-- Message Content -->
            <div v-if="!message.is_deleted" class="px-4 py-2">
              <p v-if="message.content" class="text-sm whitespace-pre-wrap break-words">{{ message.content }}</p>
              
              <!-- Attachments -->
              <div v-if="message.attachments?.length" class="mt-2 space-y-2">
                <div
                  v-for="attachment in message.attachments"
                  :key="attachment.id"
                  class="attachment"
                >
                  <!-- Image -->
                  <img
                    v-if="isImage(attachment.mime_type)"
                    :src="attachment.file_url"
                    :alt="attachment.original_name"
                    class="max-w-full rounded-lg cursor-pointer"
                    @click="openImageViewer(attachment.file_url)"
                  />
                  
                  <!-- Video -->
                  <video
                    v-else-if="isVideo(attachment.mime_type)"
                    :src="attachment.file_url"
                    controls
                    class="max-w-full rounded-lg"
                  />
                  
                  <!-- Audio -->
                  <audio
                    v-else-if="isAudio(attachment.mime_type)"
                    :src="attachment.file_url"
                    controls
                    class="w-full"
                  />
                  
                  <!-- Document -->
                  <a
                    v-else
                    :href="attachment.file_url"
                    target="_blank"
                    class="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span class="text-2xl">{{ getFileIcon(attachment.mime_type) }}</span>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ attachment.original_name }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatFileSize(attachment.file_size) }}</p>
                    </div>
                  </a>
                </div>
              </div>
              
              <!-- Reactions -->
              <div v-if="message.reactions_summary?.length" class="mt-2 flex flex-wrap gap-1">
                <button
                  v-for="reaction in message.reactions_summary"
                  :key="reaction.emoji"
                  @click="toggleReaction(message.id, reaction.emoji)"
                  class="px-2 py-1 bg-white/20 dark:bg-gray-800/50 rounded-full text-xs flex items-center gap-1 hover:bg-white/30 dark:hover:bg-gray-800/70"
                >
                  <span>{{ reaction.emoji }}</span>
                  <span>{{ reaction.count }}</span>
                </button>
              </div>
            </div>
            
            <div v-else class="px-4 py-2 italic text-gray-500 dark:text-gray-400 text-sm">
              This message has been deleted
            </div>
            
            <!-- Message Footer -->
            <div class="px-4 pb-2 flex items-center justify-between text-xs">
              <span class="text-gray-500 dark:text-gray-400">
                {{ formatMessageTime(message.created_at) }}
              </span>
              <span v-if="message.is_edited" class="text-gray-400 dark:text-gray-500 italic ml-2">(edited)</span>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Message Input -->
    <div class="message-input-area border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
      <!-- File Previews -->
      <div v-if="filePreviews.length > 0" class="mb-3 flex flex-wrap gap-2">
        <div
          v-for="(preview, index) in filePreviews"
          :key="index"
          class="relative"
        >
          <img
            v-if="preview.type === 'image'"
            :src="preview.url"
            class="w-20 h-20 object-cover rounded-lg"
          />
          <button
            @click="removeFilePreview(index)"
            class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
          >
            ×
          </button>
        </div>
      </div>

      <div class="flex items-end gap-2">
        <button
          @click="toggleEmojiPicker"
          class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Add emoji"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </button>

        <!-- Voice Recorder -->
        <VoiceRecorder
          @recording-ready="handleVoiceRecordingReady"
          @recording-removed="handleVoiceRecordingRemoved"
        />

        <button
          @click="triggerFileInput"
          class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Attach file"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
          </svg>
        </button>

        <input
          ref="fileInput"
          type="file"
          multiple
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
          class="hidden"
          @change="handleFileSelect"
        />

        <div class="flex-1 relative">
          <textarea
            v-model="messageText"
            ref="messageInput"
            @input="handleTyping"
            @keydown.enter.exact.prevent="sendMessage"
            @keydown.enter.shift.exact="messageText += '\n'"
            :placeholder="`Message ${otherUser?.name || 'user'}...`"
            rows="1"
            class="w-full px-4 py-2 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 resize-none"
          />
          <EmojiPicker
            v-if="showEmojiPicker"
            class="absolute bottom-full mb-2 right-0 z-10"
            :native="true"
            :hide-search="false"
            :hide-group-names="false"
            :hide-skin-tones="false"
            @select="addEmoji"
          />
        </div>

        <button
          @click="sendMessage"
          :disabled="!canSend || sendingMessage"
          class="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Send message"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Call UI -->
    <CallUI
      v-if="callState"
      :call-state="callState"
      :call-type="callType"
      :other-user="otherUser"
      @answer="answerCall"
      @reject="rejectCall"
      @end="endCall"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useToast } from 'vue-toastification'
import axios from '@/utils/axios'
import { getEcho, getEchoAsync, isConnected } from '@/utils/echo'
import { formatFileSize, getFileIcon, isImage, isVideo, isAudio } from '@/utils/mediaHelper'
import { useWebRTC } from '@/composables/useWebRTC'
import CallUI from './CallUI.vue'
import VoiceRecorder from '@/components/VoiceRecorder.vue'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'

const props = defineProps({
  conversation: {
    type: Object,
    required: true
  },
  currentUser: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'conversation-updated'])

const toast = useToast()
const messagesContainer = ref(null)
const messageInput = ref(null)
const fileInput = ref(null)

const messages = ref([])
const messageText = ref('')
const loading = ref(true) // Start with loading true for initial load
const sendingMessage = ref(false) // Separate state for sending
const showEmojiPicker = ref(false)
const filePreviews = ref([])
const isTyping = ref(false)
const typingUserName = ref('')
const typingTimeout = ref(null)
const typingDebounceTimeout = ref(null)
const voiceRecording = ref(null)
const voiceRecordingURL = ref(null)
const messageIds = ref(new Set()) // Track message IDs to prevent duplicates
const isReconnecting = ref(false)
const channelSubscribed = ref(false) // Track if channel is subscribed for typing events

const callState = ref(null) // 'incoming', 'connecting', 'active', null
const callType = ref(null) // 'audio', 'video'

const { localStream, remoteStream, startLocalStream, endCall: endWebRTCCall } = useWebRTC()

const otherUser = computed(() => {
  if (!props.conversation?.participants) return null
  return props.conversation.participants.find(p => p.id !== props.currentUser.id) || props.conversation.participants[0]
})

const canSend = computed(() => {
  return (messageText.value.trim().length > 0 || filePreviews.value.length > 0 || voiceRecording.value) && !sendingMessage.value
})

// Check if message belongs to current user
const isOwnMessage = (message) => {
  return message.user_id === props.currentUser.id || message.user?.id === props.currentUser.id
}

onMounted(async () => {
  await loadMessages()
  setupEchoListeners()
  scrollToBottom()
})

onUnmounted(() => {
  cleanupEchoListeners()
  if (typingTimeout.value) {
    clearTimeout(typingTimeout.value)
  }
})

const loadMessages = async () => {
  loading.value = true
  try {
    const response = await axios.get(`/direct-messages/conversations/${props.conversation.id}`)
    if (response.data?.success) {
      // CRITICAL FIX: Handle correct response format
      // Backend returns: { success: true, data: { conversation: {...}, messages: { data: [...] } } }
      const messagesData = response.data.data?.messages?.data || 
                          response.data.data?.messages || 
                          (Array.isArray(response.data.data) ? response.data.data : [])
      
      // Ensure it's an array
      const loadedMessages = Array.isArray(messagesData) ? messagesData : []
      
      // Sort messages by created_at ascending (oldest first)
      loadedMessages.sort((a, b) => {
        const dateA = new Date(a.created_at || a.createdAt || 0)
        const dateB = new Date(b.created_at || b.createdAt || 0)
        return dateA - dateB
      })
      
      // Reset message tracking
      messageIds.value.clear()
      loadedMessages.forEach(msg => {
        if (msg.id) {
          messageIds.value.add(msg.id)
        }
      })
      
      messages.value = loadedMessages
      await nextTick()
      scrollToBottom()
    }
  } catch (error) {
    console.error('Failed to load messages:', error)
    toast.error('Failed to load messages')
  } finally {
    loading.value = false
  }
}

const setupEchoListeners = async () => {
  try {
    // CRITICAL FIX: Use static import, not dynamic import
    const echo = await getEchoAsync()
    
    if (!echo) {
      if (import.meta.env.DEV) {
        console.warn('[DirectMessageChat] Echo not initialized yet, retrying...')
      }
      // Retry after a short delay
      setTimeout(() => {
        if (!isReconnecting.value) {
          setupEchoListeners()
        }
      }, 1000)
      return
    }

    // Function to setup channel listeners after subscription is authorized
    const setupChannel = () => {
      try {
        const channelName = `dm.${props.conversation.id}`
        
        // CRITICAL: Log channel subscription attempt
        if (import.meta.env.DEV) {
          console.log('[DirectMessageChat] Attempting to subscribe to channel:', channelName)
        }
        
        const channel = echo.private(channelName)
        // Store channel reference for typing events
        dmChannel = channel
        channelSubscribed.value = false // Reset subscription status
        
        // CRITICAL FIX: Wait for subscription to be authorized before setting up listeners
        channel.subscribed(() => {
          if (import.meta.env.DEV) {
            console.log('[DirectMessageChat] ✅ DM channel subscribed successfully:', channelName)
            console.log('[DirectMessageChat] Channel state:', channel.subscribed)
          }
          channelSubscribed.value = true // CRITICAL FIX: Use .value for ref
          setupChannelListeners(channel)
          isReconnecting.value = false
        })
        
        channel.error((error) => {
          console.error('[DirectMessageChat] ❌ Channel subscription error:', {
            channel: channelName,
            error: error,
            errorType: error?.type,
            errorStatus: error?.status
          })
          channelSubscribed.value = false // CRITICAL FIX: Use .value for ref
          isReconnecting.value = false
          // Retry after delay
          setTimeout(() => {
            if (!isReconnecting.value) {
              setupEchoListeners()
            }
          }, 3000)
        })
        
        // CRITICAL: Also listen for subscription state changes
        if (channel.subscribed) {
          // Already subscribed, setup listeners immediately
          if (import.meta.env.DEV) {
            console.log('[DirectMessageChat] Channel already subscribed, setting up listeners immediately')
          }
          channelSubscribed.value = true // Mark as subscribed
          setupChannelListeners(channel)
          isReconnecting.value = false
        }
      } catch (err) {
        console.error('[DirectMessageChat] Error creating private channel:', {
          conversationId: props.conversation.id,
          error: err,
          errorMessage: err?.message
        })
        isReconnecting.value = false
      }
    }

    // CRITICAL FIX: Echo is connected, setup channel immediately
    setupChannel()
  } catch (error) {
    console.error('[DirectMessageChat] Failed to setup Echo listeners:', error)
    isReconnecting.value = false
  }
}

// Helper function to check if user is near bottom of messages
const isNearBottom = () => {
  if (!messagesContainer.value) return true
  const container = messagesContainer.value
  const threshold = 200 // pixels from bottom
  return container.scrollHeight - container.scrollTop - container.clientHeight < threshold
}

const setupChannelListeners = (channel) => {
  try {
    // CRITICAL: Log that listeners are being set up
    if (import.meta.env.DEV) {
      console.log('[DirectMessageChat] Setting up channel listeners for dm.' + props.conversation.id)
    }
    
    // Message sent event - CRITICAL FIX: Ensure message is added immediately
    channel.listen('.dm.message.sent', (data) => {
      // CRITICAL: Log received event for debugging
      if (import.meta.env.DEV) {
        console.log('[DirectMessageChat] Received .dm.message.sent event', {
          hasMessage: !!data.message,
          messageId: data.message?.id,
          conversationId: props.conversation.id
        })
      }
      
      if (data.message && data.message.id) {
        // Prevent duplicate messages
        if (!messageIds.value.has(data.message.id)) {
          messageIds.value.add(data.message.id)
          
          // Ensure message has all required fields
          const newMessage = {
            ...data.message,
            user_id: data.message.user_id || data.message.user?.id,
            created_at: data.message.created_at || data.message.createdAt || new Date().toISOString()
          }
          
          // CRITICAL: Log message addition
          if (import.meta.env.DEV) {
            console.log('[DirectMessageChat] Adding new message to list', {
              messageId: newMessage.id,
              userId: newMessage.user_id,
              content: newMessage.content?.substring(0, 50)
            })
          }
          
          // Insert message in correct position (sorted by created_at)
          const messageDate = new Date(newMessage.created_at)
          let insertIndex = messages.value.length
          
          for (let i = 0; i < messages.value.length; i++) {
            const existingDate = new Date(messages.value[i].created_at || messages.value[i].createdAt || 0)
            if (messageDate < existingDate) {
              insertIndex = i
              break
            }
          }
          
          messages.value.splice(insertIndex, 0, newMessage)
          
          // Always scroll to bottom for new messages (unless user scrolled up)
          nextTick(() => {
            if (isNearBottom()) {
              scrollToBottom()
            }
          })
          
          // Emit event to update parent component (for unread count updates)
          emit('conversation-updated')
        } else {
          if (import.meta.env.DEV) {
            console.warn('[DirectMessageChat] Duplicate message ignored', { messageId: data.message.id })
          }
        }
      } else {
        if (import.meta.env.DEV) {
          console.warn('[DirectMessageChat] Received event without valid message data', data)
        }
      }
    })
    
    // Message edited event
    channel.listen('.dm.message.edited', (data) => {
      if (data.message && data.message.id) {
        const index = messages.value.findIndex(m => m.id === data.message.id)
        if (index !== -1) {
          messages.value[index] = { ...messages.value[index], ...data.message }
        }
      }
    })
    
    // Message deleted event
    channel.listen('.dm.message.deleted', (data) => {
      if (data.message_id) {
        const index = messages.value.findIndex(m => m.id === data.message_id)
        if (index !== -1) {
          messages.value.splice(index, 1)
          messageIds.value.delete(data.message_id)
        }
      }
    })
    
    // Reaction added event
    channel.listen('.dm.reaction.added', (data) => {
      if (data.message_id && data.reaction) {
        const message = messages.value.find(m => m.id === data.message_id)
        if (message) {
          if (!message.reactions) {
            message.reactions = []
          }
          message.reactions.push(data.reaction)
        }
      }
    })
    
    // Reaction removed event
    channel.listen('.dm.reaction.removed', (data) => {
      if (data.message_id && data.emoji && data.user) {
        const message = messages.value.find(m => m.id === data.message_id)
        if (message && message.reactions) {
          message.reactions = message.reactions.filter(
            r => !(r.emoji === data.emoji && r.user_id === data.user.id)
          )
        }
      }
    })

    // Listen for typing events (using client events/whispers)
    // CRITICAL: These are client-to-client events, no API calls required
    channel.listenForWhisper('typing', (data) => {
      if (data.user?.id && data.user.id !== props.currentUser.id) {
        isTyping.value = true
        typingUserName.value = data.user?.name || 'Someone'
        // Clear existing timeout
        if (typingTimeout.value) {
          clearTimeout(typingTimeout.value)
        }
        // Auto-hide after 3 seconds if no new typing event
        typingTimeout.value = setTimeout(() => {
          isTyping.value = false
        }, 3000)
      }
    })

    channel.listenForWhisper('stopped-typing', (data) => {
      if (data.user?.id && data.user.id !== props.currentUser.id) {
        isTyping.value = false
        if (typingTimeout.value) {
          clearTimeout(typingTimeout.value)
          typingTimeout.value = null
        }
      }
    })
    
    // Fallback: Also listen for server-side typing events (if whispers don't work)
    channel.listen('.user.typing', (data) => {
      if (data.user?.id && data.user.id !== props.currentUser.id) {
        isTyping.value = true
        typingUserName.value = data.user?.name || 'Someone'
        if (typingTimeout.value) {
          clearTimeout(typingTimeout.value)
        }
        typingTimeout.value = setTimeout(() => {
          isTyping.value = false
        }, 3000)
      }
    })

    channel.listen('.user.stopped-typing', (data) => {
      if (data.user?.id && data.user.id !== props.currentUser.id) {
        isTyping.value = false
        if (typingTimeout.value) {
          clearTimeout(typingTimeout.value)
          typingTimeout.value = null
        }
      }
    })

    channel.listen('.call.initiated', (data) => {
      if (data.caller?.id !== props.currentUser.id) {
        callState.value = 'incoming'
        callType.value = data.type
      }
    })

    channel.listen('.call.answered', (data) => {
      if (data.answered) {
        callState.value = 'active'
      } else {
        callState.value = null
      }
    })

    channel.listen('.call.ended', () => {
      callState.value = null
      endWebRTCCall()
    })
  } catch (error) {
    console.error('[DirectMessageChat] Failed to setup Echo listeners:', error)
  }
}

const cleanupEchoListeners = async () => {
  try {
    // Clear typing timeouts (using refs)
    if (typingTimeout.value) {
      clearTimeout(typingTimeout.value)
      typingTimeout.value = null
    }
    if (typingDebounceTimeout.value) {
      clearTimeout(typingDebounceTimeout.value)
      typingDebounceTimeout.value = null
    }
    
    // Clean up channel reference
    channelSubscribed.value = false
    dmChannel = null
    
    const echo = await getEchoAsync()
    if (echo && props.conversation?.id) {
      echo.leave(`dm.${props.conversation.id}`)
    }
  } catch (error) {
    console.error('Error cleaning up Echo listeners:', error)
  }
}

const sendMessage = async () => {
  if (!canSend.value || sendingMessage.value) return

  sendingMessage.value = true
  const formData = new FormData()
  if (messageText.value.trim()) {
    formData.append('content', messageText.value.trim())
  }

  // Add voice recording if available
  if (voiceRecording.value && voiceRecording.value.file) {
    formData.append('attachments[]', voiceRecording.value.file, `voice-${Date.now()}.webm`)
  }

  filePreviews.value.forEach(preview => {
    if (preview.file) {
      formData.append('attachments[]', preview.file)
    }
  })

  try {
    const response = await axios.post(
      `/direct-messages/conversations/${props.conversation.id}/messages`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    if (response.data?.success) {
      // Clear form
      messageText.value = ''
      filePreviews.value = []
      showEmojiPicker.value = false
      removeVoiceRecording()
      stopTyping()
      
      // Message will be added via Echo event, but we can optimistically add it
      // to prevent delay (Echo will handle deduplication)
      if (response.data.data && response.data.data.id) {
        const newMessage = response.data.data
        if (!messageIds.value.has(newMessage.id)) {
          messageIds.value.add(newMessage.id)
          messages.value.push(newMessage)
          nextTick(() => scrollToBottom())
        }
      }
      
      emit('conversation-updated')
    }
  } catch (error) {
    console.error('Failed to send message:', error)
    toast.error(error.response?.data?.message || 'Failed to send message. Please try again.')
  } finally {
    sendingMessage.value = false
  }
}

// Typing indicator constants
const TYPING_DEBOUNCE_MS = 1000 // Send typing event after 1 second of inactivity
const TYPING_STOP_MS = 3000 // Stop typing after 3 seconds of no input

const handleTyping = async () => {
  if (messageText.value.length > 0) {
    // Clear existing debounce
    if (typingDebounceTimeout.value) {
      clearTimeout(typingDebounceTimeout.value)
    }
    
    // Debounce typing start event
    typingDebounceTimeout.value = setTimeout(async () => {
      await broadcastTypingStart()
    }, 300) // Wait 300ms before sending typing start
    
    // Clear existing stop timeout (using existing ref)
    if (typingTimeout.value) {
      clearTimeout(typingTimeout.value)
    }
    
    // Set timeout to stop typing
    typingTimeout.value = setTimeout(() => {
      broadcastTypingStop()
    }, TYPING_STOP_MS)
  } else {
    stopTyping()
  }
}

// Store channel reference for typing events
let dmChannel = null

const broadcastTypingStart = async () => {
  try {
    // CRITICAL FIX: Only broadcast if channel is subscribed
    if (!dmChannel || !channelSubscribed.value) {
      if (import.meta.env.DEV) {
        console.warn('[DirectMessageChat] Channel not subscribed yet, skipping typing broadcast')
      }
      return
    }
    
    // Use client events (whispers) - pure realtime, no API calls
    // These are client-to-client events that work if client events are enabled
    try {
      // CRITICAL FIX: Check if whisper method exists and channel is ready
      if (dmChannel && typeof dmChannel.whisper === 'function' && channelSubscribed.value) {
        dmChannel.whisper('typing', {
          user: {
            id: props.currentUser.id,
            name: props.currentUser.name
          }
        })
      } else {
        // Fallback: Use API endpoint for typing indicator if whispers don't work
        // This is optional - typing indicator is a nice-to-have feature
        if (import.meta.env.DEV) {
          console.log('[DirectMessageChat] Whisper not available, using API for typing indicator')
        }
        // Uncomment if you want API fallback:
        // await axios.post(`/direct-messages/conversations/${props.conversation.id}/typing`)
      }
    } catch (whisperError) {
      // If whispers don't work (client events not enabled), silently fail
      // The typing indicator is a nice-to-have feature
      if (import.meta.env.DEV) {
        console.warn('[DirectMessageChat] Client events may not be enabled:', whisperError)
      }
    }
  } catch (error) {
    // Silently fail - typing indicator is not critical
    if (import.meta.env.DEV) {
      console.warn('[DirectMessageChat] Failed to broadcast typing:', error)
    }
  }
}

const broadcastTypingStop = async () => {
  try {
    // CRITICAL FIX: Only broadcast if channel is subscribed
    if (!dmChannel || !channelSubscribed.value) {
      return
    }
    
    try {
      // CRITICAL FIX: Check if whisper method exists and channel is ready
      if (dmChannel && typeof dmChannel.whisper === 'function' && channelSubscribed.value) {
        dmChannel.whisper('stopped-typing', {
          user: {
            id: props.currentUser.id,
            name: props.currentUser.name
          }
        })
      }
    } catch (whisperError) {
      // Silently fail if client events not enabled
      if (import.meta.env.DEV) {
        console.warn('[DirectMessageChat] Client events may not be enabled:', whisperError)
      }
    }
  } catch (error) {
    // Silently fail
    if (import.meta.env.DEV) {
      console.warn('[DirectMessageChat] Failed to broadcast stop typing:', error)
    }
  }
}

const stopTyping = async () => {
  // Clear all timeouts (using refs)
  if (typingTimeout.value) {
    clearTimeout(typingTimeout.value)
    typingTimeout.value = null
  }
  if (typingDebounceTimeout.value) {
    clearTimeout(typingDebounceTimeout.value)
    typingDebounceTimeout.value = null
  }
  
  // Broadcast stop typing
  await broadcastTypingStop()
}

const handleFileSelect = async (event) => {
  const files = Array.from(event.target.files)
  
  for (const file of files) {
    try {
      const preview = await createFilePreview(file)
      filePreviews.value.push(preview)
    } catch (error) {
      toast.error(`Failed to process ${file.name}: ${error.message}`)
    }
  }
  
  event.target.value = ''
}

const createFilePreview = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    if (isImage(file.type)) {
      reader.onload = (e) => resolve({
        type: 'image',
        url: e.target.result,
        file
      })
      reader.onerror = reject
      reader.readAsDataURL(file)
    } else {
      resolve({
        type: 'file',
        url: null,
        file
      })
    }
  })
}

const removeFilePreview = (index) => {
  filePreviews.value.splice(index, 1)
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value
}

const addEmoji = (emoji) => {
  // vue3-emoji-picker returns emoji object with i property (unicode)
  messageText.value += emoji.i || emoji.emoji || emoji
  showEmojiPicker.value = false
}

const handleVoiceRecordingReady = (recording) => {
  voiceRecording.value = recording
  if (recording && recording.file) {
    voiceRecordingURL.value = URL.createObjectURL(recording.file)
  }
}

const handleVoiceRecordingRemoved = () => {
  removeVoiceRecording()
}

const removeVoiceRecording = () => {
  if (voiceRecordingURL.value) {
    URL.revokeObjectURL(voiceRecordingURL.value)
    voiceRecordingURL.value = null
  }
  voiceRecording.value = null
}

const formatVoiceDuration = (seconds) => {
  if (!seconds) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${String(secs).padStart(2, '0')}`
}

const toggleReaction = async (messageId, emoji) => {
  try {
    await axios.post(`/direct-messages/messages/${messageId}/reactions`, { emoji })
    await loadMessages()
  } catch (error) {
    console.error('Failed to toggle reaction:', error)
  }
}

const initiateCall = async (type) => {
  try {
    await axios.post('/calls/initiate', {
      conversation_id: props.conversation.id,
      type
    })
    callState.value = 'connecting'
    callType.value = type
    await startLocalStream(type)
  } catch (error) {
    console.error('Failed to initiate call:', error)
    toast.error('Failed to initiate call')
  }
}

const answerCall = async () => {
  callState.value = 'active'
  await axios.post('/calls/answer', {
    conversation_id: props.conversation.id,
    answer: true
  })
  await startLocalStream(callType.value)
}

const rejectCall = async () => {
  await axios.post('/calls/answer', {
    conversation_id: props.conversation.id,
    answer: false
  })
  callState.value = null
}

const endCall = async () => {
  await axios.post('/calls/end', {
    conversation_id: props.conversation.id
  })
  callState.value = null
  endWebRTCCall()
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const handleScroll = () => {
  // Implement pagination if needed
}

const formatMessageTime = (date) => {
  const d = new Date(date)
  const now = new Date()
  const diff = now - d
  
  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const getUserAvatar = (user) => {
  return user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=6366f1&color=fff`
}

const openImageViewer = (url) => {
  // Implement image viewer modal
  window.open(url, '_blank')
}
</script>

<style scoped>
.messages-area {
  scroll-behavior: smooth;
}

.message-bubble {
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>
