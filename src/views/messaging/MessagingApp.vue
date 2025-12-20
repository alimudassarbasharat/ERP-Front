<template>
  <div class="messaging-app">
    <div class="messaging-header">
      <h1>Messaging</h1>
      <div class="header-actions">
        <button @click="showCreateChannel = true" class="btn-primary">New Channel</button>
        <button @click="showDirectMessage = true" class="btn-secondary">Direct Message</button>
      </div>
    </div>

    <div class="messaging-container">
      <!-- Sidebar -->
      <div class="sidebar">
        <div class="search-box">
          <input v-model="searchQuery" placeholder="Search..." />
        </div>
        
        <div class="channels-section">
          <h3>Channels</h3>
          <div class="channel-list">
            <div 
              v-for="channel in channels" 
              :key="channel.id"
              @click="selectChannel(channel)"
              :class="['channel-item', { active: selectedChannel?.id === channel.id }]"
            >
              # {{ channel.name }}
              <span v-if="channel.unread_count" class="unread-badge">
                {{ channel.unread_count }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Area -->
      <div class="chat-area">
        <div v-if="selectedChannel" class="chat-container">
          <div class="chat-header">
            <h2># {{ selectedChannel.name }}</h2>
          </div>
          
          <div class="messages-container" ref="messagesContainer">
            <div v-if="loading" class="loading">Loading...</div>
            <div v-else class="messages-list">
              <div 
                v-for="message in messages" 
                :key="message.id"
                class="message-item"
              >
                <div class="message-avatar">
                  <img :src="getUserAvatar(message.user)" :alt="message.user?.name" />
                </div>
                <div class="message-content">
                  <div class="message-header">
                    <span class="message-author">{{ message.user?.name }}</span>
                    <span class="message-time">{{ formatTime(message.created_at) }}</span>
                  </div>
                  <div class="message-text">{{ message.content }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="message-input">
            <div class="input-actions">
              <button @click="showEmojiPicker = true" class="action-btn">
                <i class="fas fa-smile"></i>
              </button>
              <button @click="showFileUpload = true" class="action-btn">
                <i class="fas fa-paperclip"></i>
              </button>
            </div>
            <textarea
              v-model="newMessage"
              @keydown.enter.prevent="sendMessage"
              placeholder="Type a message..."
              ref="messageInput"
            ></textarea>
            <button @click="sendMessage" :disabled="!newMessage.trim()">Send</button>
          </div>
        </div>
        
        <div v-else class="no-channel">
          <p>Select a channel to start messaging</p>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <CreateChannelModal 
      v-if="showCreateChannel" 
      @close="showCreateChannel = false"
      @created="onChannelCreated"
    />
    
    <DirectMessageModal 
      v-if="showDirectMessage" 
      @close="showDirectMessage = false"
      @created="onChannelCreated"
    />
    
    <EmojiPicker 
      v-if="showEmojiPicker" 
      @close="showEmojiPicker = false"
      @select="addEmojiToMessage"
    />
    
    <FileUploadModal 
      v-if="showFileUpload" 
      @close="showFileUpload = false"
      @uploaded="onFileUploaded"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from '@/utils/axios'
import CreateChannelModal from './components/CreateChannelModal.vue'
import DirectMessageModal from './components/DirectMessageModal.vue'
import EmojiPicker from './components/EmojiPicker.vue'
import FileUploadModal from './components/FileUploadModal.vue'

export default {
  name: 'MessagingApp',
  components: {
    CreateChannelModal,
    DirectMessageModal,
    EmojiPicker,
    FileUploadModal
  },
  setup() {
    const channels = ref([])
    const selectedChannel = ref(null)
    const messages = ref([])
    const newMessage = ref('')
    const searchQuery = ref('')
    const loading = ref(false)
    const showCreateChannel = ref(false)
    const showDirectMessage = ref(false)
    const showEmojiPicker = ref(false)
    const showFileUpload = ref(false)
    
    const messagesContainer = ref(null)
    const messageInput = ref(null)

    const loadChannels = async () => {
      try {
        const response = await axios.get('/api/channels')
        channels.value = response.data.data
      } catch (error) {
        console.error('Failed to load channels:', error)
      }
    }

    const selectChannel = async (channel) => {
      selectedChannel.value = channel
      messages.value = []
      await loadMessages()
    }

    const loadMessages = async () => {
      if (!selectedChannel.value) return
      
      loading.value = true
      try {
        const response = await axios.get(`/api/channels/${selectedChannel.value.id}/messages`)
        messages.value = response.data.data.data.reverse()
        scrollToBottom()
      } catch (error) {
        console.error('Failed to load messages:', error)
      } finally {
        loading.value = false
      }
    }

    const sendMessage = async () => {
      if (!newMessage.value.trim() || !selectedChannel.value) return
      
      try {
        const response = await axios.post(`/api/channels/${selectedChannel.value.id}/messages`, {
          content: newMessage.value,
          type: 'text'
        })
        messages.value.push(response.data.data)
        newMessage.value = ''
        scrollToBottom()
      } catch (error) {
        console.error('Failed to send message:', error)
      }
    }

    const scrollToBottom = () => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    }

    const getUserAvatar = (user) => {
      return user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=random`
    }

    const formatTime = (timestamp) => {
      return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const addEmojiToMessage = (emoji) => {
      newMessage.value += emoji
      showEmojiPicker.value = false
      messageInput.value?.focus()
    }

    const onFileUploaded = (files) => {
      // Handle file upload - add to message
      showFileUpload.value = false
    }

    const onChannelCreated = (channel) => {
      channels.value.unshift(channel)
      selectChannel(channel)
    }

    onMounted(() => {
      loadChannels()
    })

          return {
        channels,
        selectedChannel,
        messages,
        newMessage,
        searchQuery,
        loading,
        showCreateChannel,
        showDirectMessage,
        showEmojiPicker,
        showFileUpload,
        messagesContainer,
        messageInput,
        selectChannel,
        sendMessage,
        addEmojiToMessage,
        onFileUploaded,
        onChannelCreated,
        getUserAvatar,
        formatTime
      }
  }
}
</script>

<style scoped>
.messaging-app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.messaging-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.messaging-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 280px;
  background: white;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
}

.search-box {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.search-box input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

.channels-section {
  flex: 1;
  padding: 1rem;
}

.channels-section h3 {
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.channel-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.channel-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

.channel-item:hover {
  background-color: #f3f4f6;
}

.channel-item.active {
  background-color: #e0e7ff;
  color: #3730a3;
}

.unread-badge {
  background: #ef4444;
  color: white;
  font-size: 0.75rem;
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  min-width: 1.25rem;
  text-align: center;
}

.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: white;
}

.chat-header h2 {
  font-size: 1.125rem;
  font-weight: 600;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #6b7280;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.message-item:hover {
  background-color: #f9fafb;
}

.message-avatar {
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
}

.message-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.message-content {
  flex: 1;
}

.message-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.message-author {
  font-weight: 600;
  color: #111827;
  font-size: 0.875rem;
}

.message-time {
  font-size: 0.75rem;
  color: #6b7280;
}

.message-text {
  color: #374151;
  line-height: 1.5;
}

.message-input {
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  background: white;
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
}

.input-actions {
  display: flex;
  gap: 0.25rem;
}

.action-btn {
  padding: 0.5rem;
  background: none;
  border: none;
  color: #6b7280;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.message-input textarea {
  flex: 1;
  min-height: 2.5rem;
  max-height: 120px;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  resize: none;
  font-family: inherit;
  font-size: 0.875rem;
  line-height: 1.5;
}

.message-input button {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
}

.message-input button:hover:not(:disabled) {
  background: #2563eb;
}

.message-input button:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.no-channel {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #6b7280;
}

.btn-primary {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
  font-weight: 500;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-secondary {
  padding: 0.5rem 1rem;
  background: white;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
  font-weight: 500;
}

.btn-secondary:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}
</style> 