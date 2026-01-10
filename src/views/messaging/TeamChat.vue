<template>
  <div class="team-chat-container">
    <!-- Main Layout -->
    <div class="chat-layout">
      <!-- Sidebar -->
      <div class="chat-sidebar" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
        <!-- Workspace Header -->
        <div class="workspace-header">
          <div class="workspace-info">
            <h2 class="workspace-name">{{ workspaceName }}</h2>
            <div class="user-status">
              <div class="status-indicator" :class="`status-${currentUser.status}`"></div>
              <span class="status-text">{{ currentUser.name }}</span>
            </div>
          </div>
          <button class="compose-btn" @click="showNewMessageModal = true">
            <i class="ti-pencil-alt"></i>
          </button>
        </div>

        <!-- Search Box -->
        <div class="sidebar-search">
          <input 
            type="text" 
            placeholder="Search conversations..."
            v-model="searchQuery"
            @input="searchConversations"
          >
          <i class="ti-search"></i>
        </div>

        <!-- Navigation Sections -->
        <div class="sidebar-sections">
          <!-- Threads -->
          <div class="sidebar-section">
            <button class="section-item" @click="showThreads">
              <i class="ti-comments"></i>
              <span>Threads</span>
              <span class="badge" v-if="unreadThreads > 0">{{ unreadThreads }}</span>
            </button>
          </div>

          <!-- Channels -->
          <div class="sidebar-section">
            <div class="section-header" @click="toggleSection('channels')">
              <i class="ti-angle-down" :class="{ 'rotated': !sectionsExpanded.channels }"></i>
              <span>Channels</span>
              <button class="add-btn" @click.stop="showCreateChannelModal = true">
                <i class="ti-plus"></i>
              </button>
            </div>
            <transition name="slide">
              <div v-if="sectionsExpanded.channels" class="section-content">
                <div 
                  v-for="channel in channels" 
                  :key="channel.id"
                  class="channel-item"
                  :class="{ 
                    'active': activeConversation?.type === 'channel' && activeConversation?.id === channel.id,
                    'unread': channel.unread_count > 0 
                  }"
                  @click="selectChannel(channel)"
                >
                  <span class="channel-prefix">#</span>
                  <span class="channel-name">{{ channel.name }}</span>
                  <span class="unread-count" v-if="channel.unread_count > 0">
                    {{ channel.unread_count }}
                  </span>
                </div>
                <button class="browse-channels" @click="showBrowseChannelsModal = true">
                  <i class="ti-plus"></i> Browse channels
                </button>
              </div>
            </transition>
          </div>

          <!-- Direct Messages -->
          <div class="sidebar-section">
            <div class="section-header" @click="toggleSection('directMessages')">
              <i class="ti-angle-down" :class="{ 'rotated': !sectionsExpanded.directMessages }"></i>
              <span>Direct Messages</span>
              <button class="add-btn" @click.stop="showNewDirectMessageModal = true">
                <i class="ti-plus"></i>
              </button>
            </div>
            <transition name="slide">
              <div v-if="sectionsExpanded.directMessages" class="section-content">
                <div 
                  v-for="dm in directMessages" 
                  :key="dm.id"
                  class="dm-item"
                  :class="{ 
                    'active': activeConversation?.type === 'dm' && activeConversation?.id === dm.id,
                    'unread': dm.unread_count > 0 
                  }"
                  @click="selectDirectMessage(dm)"
                >
                  <div class="user-avatar">
                    <img :src="getDmAvatar(dm)" :alt="dm.display_name">
                    <div 
                      class="presence-indicator" 
                      :class="`status-${getDmPresence(dm)}`"
                    ></div>
                  </div>
                  <div class="dm-info">
                    <span class="dm-name">{{ dm.display_name }}</span>
                    <span class="dm-status" v-if="getDmPresence(dm) !== 'offline'">
                      {{ getDmStatusText(dm) }}
                    </span>
                  </div>
                  <span class="unread-count" v-if="dm.unread_count > 0">
                    {{ dm.unread_count }}
                  </span>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <!-- Main Chat Area -->
      <div class="chat-main">
        <!-- Chat Header -->
        <div class="chat-header" v-if="activeConversation">
          <div class="header-left">
            <button class="mobile-menu-toggle" @click="toggleSidebar">
              <i class="ti-menu"></i>
            </button>
            <h3 class="conversation-title">
              <span v-if="activeConversation.type === 'channel'">#</span>
              {{ activeConversation.name || activeConversation.display_name }}
            </h3>
            <div class="header-info" v-if="activeConversation.type === 'channel'">
              <span class="member-count">
                <i class="ti-user"></i> {{ activeConversation.member_count }}
              </span>
              <span class="divider">|</span>
              <span class="channel-description">{{ activeConversation.description }}</span>
            </div>
          </div>
          <div class="header-actions">
            <button class="header-btn" @click="showConversationInfo = true">
              <i class="ti-info-alt"></i>
            </button>
            <button class="header-btn" @click="toggleStarred">
              <i class="ti-star" :class="{ 'starred': activeConversation.is_starred }"></i>
            </button>
            <button class="header-btn" @click="searchInConversation">
              <i class="ti-search"></i>
            </button>
          </div>
        </div>

        <!-- Messages Area -->
        <div class="messages-container" ref="messagesContainer" @scroll="handleScroll" v-if="activeConversation">
          <!-- Loading State -->
          <div v-if="messagesLoading" class="messages-loading">
            <div class="spinner"></div>
            <span>Loading messages...</span>
          </div>

          <!-- Messages List -->
          <div v-else class="messages-list">
            <!-- Date Separators and Messages -->
            <template v-for="(group, date) in groupedMessages" :key="date">
              <div class="date-separator">
                <span>{{ formatDateSeparator(date) }}</span>
              </div>
              
              <div 
                v-for="message in group" 
                :key="message.id"
                class="message-wrapper"
                :class="{ 'own-message': message.user.id === currentUser.id }"
              >
                <!-- User Avatar -->
                <div class="message-avatar">
                  <img :src="message.user.avatar || getDefaultAvatar(message.user)" :alt="message.user.name">
                </div>
                
                <!-- Message Content -->
                <div class="message-content">
                  <div class="message-header">
                    <span class="message-author">{{ message.user.name }}</span>
                    <span class="message-time">{{ formatMessageTime(message.created_at) }}</span>
                    <span class="message-edited" v-if="message.is_edited">(edited)</span>
                  </div>
                  
                  <!-- Message Body -->
                  <div class="message-body" v-if="!message.is_deleted">
                    <div class="message-text" v-html="formatMessageContent(message.content)"></div>
                    
                    <!-- Attachments -->
                    <div v-if="message.attachments?.length" class="message-attachments">
                      <div 
                        v-for="attachment in message.attachments" 
                        :key="attachment.id"
                        class="attachment-item"
                        @click="viewAttachment(attachment)"
                      >
                        <div class="attachment-icon">
                          <i :class="getAttachmentIcon(attachment)"></i>
                        </div>
                        <div class="attachment-info">
                          <span class="attachment-name">{{ attachment.filename }}</span>
                          <span class="attachment-size">{{ formatFileSize(attachment.file_size) }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Deleted Message -->
                  <div v-else class="message-deleted">
                    This message was deleted
                  </div>
                  
                  <!-- Message Reactions -->
                  <div v-if="message.reactions_summary?.length" class="message-reactions">
                    <div 
                      v-for="reaction in message.reactions_summary" 
                      :key="reaction.emoji"
                      class="reaction-item"
                      :class="{ 'user-reacted': hasUserReacted(message, reaction.emoji) }"
                      @click="toggleReaction(message, reaction.emoji)"
                    >
                      <span class="reaction-emoji">{{ reaction.emoji }}</span>
                      <span class="reaction-count">{{ reaction.count }}</span>
                    </div>
                    <button class="add-reaction-btn" @click="showEmojiPicker(message)">
                      <i class="ti-face-smile"></i>
                    </button>
                  </div>
                  
                  <!-- Message Actions -->
                  <div class="message-actions">
                    <button @click="addReaction(message)" title="Add reaction">
                      <i class="ti-face-smile"></i>
                    </button>
                    <button @click="replyToMessage(message)" title="Reply in thread">
                      <i class="ti-comment"></i>
                      <span v-if="message.reply_count > 0">{{ message.reply_count }}</span>
                    </button>
                    <button @click="shareMessage(message)" title="Share message">
                      <i class="ti-share"></i>
                    </button>
                    <button v-if="message.user.id === currentUser.id" @click="editMessage(message)" title="Edit message">
                      <i class="ti-pencil"></i>
                    </button>
                    <button v-if="canDeleteMessage(message)" @click="deleteMessage(message)" title="Delete message">
                      <i class="ti-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </template>
            
            <!-- Typing Indicators -->
            <div v-if="typingUsers.length > 0" class="typing-indicator">
              <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span class="typing-text">
                {{ formatTypingUsers(typingUsers) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="!activeConversation" class="empty-state">
          <div class="empty-icon">
            <i class="ti-comments"></i>
          </div>
          <h3>Welcome to Team Chat</h3>
          <p>Select a channel or start a direct message to begin chatting</p>
          <button class="btn btn-primary" @click="showNewMessageModal = true">
            <i class="ti-pencil-alt"></i> Start a conversation
          </button>
        </div>

        <!-- Message Input -->
        <div class="message-input-container" v-if="activeConversation">
          <!-- Reply Preview -->
          <div v-if="replyingTo" class="reply-preview">
            <div class="reply-info">
              <i class="ti-corner-up-left"></i>
              <span>Replying to {{ replyingTo.user.name }}</span>
            </div>
            <div class="reply-content">{{ replyingTo.content }}</div>
            <button class="reply-close" @click="cancelReply">
              <i class="ti-close"></i>
            </button>
          </div>
          
          <!-- File Upload Preview -->
          <div v-if="uploadedFiles.length > 0" class="upload-preview">
            <div 
              v-for="(file, index) in uploadedFiles" 
              :key="index"
              class="upload-item"
            >
              <div class="upload-icon">
                <i :class="getFileIcon(file.type)"></i>
              </div>
              <div class="upload-info">
                <span class="upload-name">{{ file.name }}</span>
                <span class="upload-size">{{ formatFileSize(file.size) }}</span>
              </div>
              <button class="upload-remove" @click="removeFile(index)">
                <i class="ti-close"></i>
              </button>
            </div>
          </div>
          
          <!-- Input Area -->
          <div class="message-input-wrapper">
            <button class="input-action" @click="$refs.fileInput.click()">
              <i class="ti-paperclip"></i>
              <input 
                ref="fileInput" 
                type="file" 
                multiple 
                @change="handleFileUpload"
                style="display: none"
              >
            </button>
            
            <div class="input-field-wrapper">
              <textarea
                ref="messageInput"
                v-model="messageText"
                @keydown.enter.exact.prevent="sendMessage"
                @keydown.enter.shift.prevent="messageText += '\n'"
                @input="handleMessageInput"
                :placeholder="`Message ${activeConversation.type === 'channel' ? '#' + activeConversation.name : activeConversation.display_name}`"
                rows="1"
                maxlength="5000"
              ></textarea>
              <div v-if="messageText.length > 4900" class="char-counter">
                {{ 5000 - messageText.length }} characters remaining
              </div>
              
              <div class="input-actions">
                <button class="emoji-btn" @click="showMainEmojiPicker = true">
                  <i class="ti-face-smile"></i>
                </button>
                <button class="format-btn" @click="showFormatting = !showFormatting">
                  <i class="ti-text"></i>
                </button>
              </div>
            </div>
            
                          <button 
                class="send-btn" 
                :disabled="!canSendMessage || sending"
                @click="sendMessage"
                aria-label="Send message"
              >
                <i v-if="!sending" class="ti-location-arrow"></i>
                <div v-else class="spinner-small"></div>
              </button>
          </div>
          
          <!-- Formatting Toolbar -->
          <transition name="slide">
            <div v-if="showFormatting" class="formatting-toolbar">
              <button @click="formatText('bold')" title="Bold">
                <i class="ti-bold"></i>
              </button>
              <button @click="formatText('italic')" title="Italic">
                <i class="ti-italic"></i>
              </button>
              <button @click="formatText('strike')" title="Strikethrough">
                <i class="ti-strikethrough"></i>
              </button>
              <div class="toolbar-separator"></div>
              <button @click="formatText('link')" title="Link">
                <i class="ti-link"></i>
              </button>
              <button @click="formatText('code')" title="Code">
                <i class="ti-code"></i>
              </button>
              <button @click="formatText('code-block')" title="Code block">
                <i class="ti-file-code"></i>
              </button>
              <div class="toolbar-separator"></div>
              <button @click="formatText('list-bullet')" title="Bullet list">
                <i class="ti-list"></i>
              </button>
              <button @click="formatText('list-number')" title="Numbered list">
                <i class="ti-list-ol"></i>
              </button>
              <button @click="formatText('quote')" title="Quote">
                <i class="ti-quote-left"></i>
              </button>
            </div>
          </transition>
        </div>
      </div>

      <!-- Right Sidebar (Thread/Info) -->
      <transition name="slide-right">
        <div v-if="showRightSidebar" class="chat-right-sidebar">
          <!-- Thread View -->
          <div v-if="activeThread" class="thread-view">
            <div class="thread-header">
              <h3>Thread</h3>
              <button class="close-btn" @click="closeThread">
                <i class="ti-close"></i>
              </button>
            </div>
            
            <div class="thread-parent">
              <!-- Parent message content -->
            </div>
            
            <div class="thread-messages">
              <!-- Thread replies -->
            </div>
            
            <div class="thread-input">
              <!-- Thread reply input -->
            </div>
          </div>
          
          <!-- Conversation Info -->
          <div v-else-if="showConversationInfo" class="conversation-info">
            <div class="info-header">
              <h3>{{ activeConversation.type === 'channel' ? 'Channel' : 'Conversation' }} Details</h3>
              <button class="close-btn" @click="showConversationInfo = false">
                <i class="ti-close"></i>
              </button>
            </div>
            
            <div class="info-content">
              <!-- Channel/DM information -->
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Modals -->
    <!-- Create Channel Modal -->
    <transition name="modal">
      <div v-if="showCreateChannelModal" class="modal-overlay" @click.self="showCreateChannelModal = false">
        <div class="modal">
          <div class="modal-header">
            <h3>Create a channel</h3>
            <button class="modal-close" @click="showCreateChannelModal = false">
              <i class="ti-close"></i>
            </button>
          </div>
          
          <div class="modal-body">
            <div class="form-group">
              <label>Channel name</label>
              <input 
                v-model="newChannel.name" 
                type="text" 
                placeholder="e.g. marketing"
                @input="newChannel.name = newChannel.name.toLowerCase().replace(/\s+/g, '-')"
              >
            </div>
            
            <div class="form-group">
              <label>Description <span class="optional">(optional)</span></label>
              <textarea 
                v-model="newChannel.description" 
                placeholder="What's this channel about?"
                rows="3"
              ></textarea>
            </div>
            
            <div class="form-group">
              <label class="checkbox-label">
                <input 
                  v-model="newChannel.isPrivate" 
                  type="checkbox"
                >
                <span>Make private</span>
              </label>
              <p class="form-help">
                {{ newChannel.isPrivate 
                  ? 'Only people you invite can see this channel' 
                  : 'Anyone in your workspace can view and join this channel' }}
              </p>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="showCreateChannelModal = false">
              Cancel
            </button>
            <button 
              class="btn btn-primary" 
              @click="createChannel"
              :disabled="!newChannel.name"
            >
              Create Channel
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import { getEcho } from '@/utils/echo'

import { format, isToday, isYesterday, formatDistanceToNow } from 'date-fns'

export default {
  name: 'TeamChat',
  data() {
    return {
      // Layout
      sidebarCollapsed: false,
      showRightSidebar: false,
      showConversationInfo: false,
      
      // Workspace
      workspaceName: 'Techify',
      currentUser: {
        id: null,
        name: '',
        avatar: null,
        status: 'online'
      },
      
      // Navigation
      searchQuery: '',
      sectionsExpanded: {
        channels: true,
        directMessages: true
      },
      
      // Conversations
      channels: [],
      directMessages: [],
      activeConversation: null,
      
      // Messages
      messages: [],
      groupedMessages: {},
      messagesLoading: false,
      messagesPagination: null,
      
      // Message Input
      messageText: '',
      uploadedFiles: [],
      showFormatting: false,
      replyingTo: null,
      sending: false,
      
      // Real-time
      echo: null,
      typingUsers: [],
      typingTimeout: null,
      presenceChannel: null,
      
      // Threads
      activeThread: null,
      unreadThreads: 0,
      
      // Modals
      showCreateChannelModal: false,
      showBrowseChannelsModal: false,
      showNewDirectMessageModal: false,
      showNewMessageModal: false,
      showMainEmojiPicker: false,
      
      // New Channel Form
      newChannel: {
        name: '',
        description: '',
        isPrivate: false
      }
    }
  },
  
  computed: {
    user() {
      // Get user from localStorage
      const userData = localStorage.getItem('user')
      if (userData) {
        try {
          return JSON.parse(userData)
        } catch (e) {
          console.error('Error parsing user data:', e)
          return null
        }
      }
      return null
    },
    
    canSendMessage() {
      return this.messageText.trim() || this.uploadedFiles.length > 0
    }
  },
  
  mounted() {
    this.initializeUser()
    this.setupEcho()
    this.loadConversations()
    this.startPresenceHeartbeat()
  },
  
  beforeUnmount() {
    if (this.echo) {
      this.echo.disconnect()
    }
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
    }
  },
  
  methods: {
    // Initialization
    initializeUser() {
      if (this.user) {
        this.currentUser = {
          id: this.user.id,
          name: this.user.name,
          avatar: this.user.avatar,
          status: 'online'
        }
      } else {
        // If no user data, redirect to login
        console.error('No user data found')
        this.$router.push('/login')
      }
    },
    
    setupEcho() {
      try {
        this.echo = getEcho()
      } catch (error) {
        console.warn('Real-time messaging not configured. Messages will need manual refresh.', error)
        // Continue without real-time - app will still work with manual refresh
      }
    },
    
    // Load conversations
    async loadConversations() {
      try {
        // Load channels
        const channelsResponse = await axios.get('/channels')
        this.channels = channelsResponse.data.data.joined_channels
        
        const dmsResponse = await axios.get('/direct-messages/conversations')
        this.directMessages = dmsResponse.data.data
        
        // Auto-select first channel if none selected
        if (!this.activeConversation && this.channels.length > 0) {
          this.selectChannel(this.channels[0])
        }
      } catch (error) {
        console.error('Error loading conversations:', error)
        this.$toast.error('Failed to load conversations')
      }
    },
    
    // Channel selection
    async selectChannel(channel) {
      this.activeConversation = {
        ...channel,
        type: 'channel'
      }
      this.showRightSidebar = false
      this.activeThread = null
      
      // Leave previous channel and join new one
      if (this.echo) {
        if (this.presenceChannel) {
          this.echo.leave(this.presenceChannel.name)
        }
        
        try {
          this.presenceChannel = this.echo.join(`presence-channel.${channel.id}`)
            .here((users) => {
              console.log('Users in channel:', users)
            })
            .joining((user) => {
              console.log('User joined:', user)
            })
            .leaving((user) => {
              console.log('User left:', user)
            })
            .listenForWhisper('typing', (e) => {
              this.handleTypingIndicator(e.user, true)
            })
            .listen('MessageSent', (e) => {
              this.handleNewMessage(e.message)
            })
        } catch (error) {
          console.warn('Could not join presence channel:', error)
        }
      }
      
      await this.loadMessages()
    },
    
    // Direct message selection
    async selectDirectMessage(dm) {
      this.activeConversation = {
        ...dm,
        type: 'dm'
      }
      this.showRightSidebar = false
      this.activeThread = null
      
      // Leave previous channel and join new one
      if (this.echo) {
        if (this.presenceChannel) {
          this.echo.leave(this.presenceChannel.name)
        }
        
        try {
          this.presenceChannel = this.echo.join(`presence-dm.${dm.id}`)
            .listenForWhisper('typing', (e) => {
              this.handleTypingIndicator(e.user, true)
            })
            .listen('DirectMessageSent', (e) => {
              this.handleNewDirectMessage(e.message)
            })
        } catch (error) {
          console.warn('Could not join DM presence channel:', error)
        }
      }
      
      await this.loadDirectMessages()
    },
    
    // Load messages
    async loadMessages() {
      this.messagesLoading = true
      this.messages = []
      
      try {
        const response = await axios.get(`/channels/${this.activeConversation.id}`)
        this.messages = response.data.data.messages.data
        this.messagesPagination = response.data.data.messages
        this.groupMessagesByDate()
        
        this.$nextTick(() => {
          this.scrollToBottom()
        })
      } catch (error) {
        console.error('Error loading messages:', error)
        this.$toast.error('Failed to load messages')
      } finally {
        this.messagesLoading = false
      }
    },
    
    // Load direct messages
    async loadDirectMessages() {
      this.messagesLoading = true
      this.messages = []
      
      try {
        const response = await axios.get(`/api/direct-messages/conversations/${this.activeConversation.id}`)
        this.messages = response.data.data.messages.data
        this.messagesPagination = response.data.data.messages
        this.groupMessagesByDate()
        
        this.$nextTick(() => {
          this.scrollToBottom()
        })
      } catch (error) {
        console.error('Error loading messages:', error)
        this.$toast.error('Failed to load messages')
      } finally {
        this.messagesLoading = false
      }
    },
    
    // Send message
    async sendMessage() {
      if (!this.canSendMessage || this.sending) return
      
      this.sending = true
      const formData = new FormData()
      formData.append('content', this.messageText)
      
      if (this.replyingTo) {
        formData.append('parent_id', this.replyingTo.id)
      }
      
      this.uploadedFiles.forEach((file, index) => {
        formData.append(`attachments[${index}]`, file)
      })
      
      try {
        let response
        if (this.activeConversation.type === 'channel') {
          response = await axios.post(`/messages/channels/${this.activeConversation.id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
        } else {
          response = await axios.post(`/direct-messages/conversations/${this.activeConversation.id}/messages`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
        }
        
        // Add message to local state immediately
        if (response.data.success && response.data.data) {
          this.messages.push(response.data.data)
          this.groupMessagesByDate()
          this.$nextTick(() => this.scrollToBottom())
        }
        
        // Clear input
        this.messageText = ''
        this.uploadedFiles = []
        this.replyingTo = null
        this.showFormatting = false
        
        if (this.$refs.messageInput) {
          this.$refs.messageInput.focus()
        }
      } catch (error) {
        console.error('Error sending message:', error)
        
        // Show specific error message
        let errorMessage = 'Failed to send message'
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message
        } else if (error.response?.data?.errors) {
          const firstError = Object.values(error.response.data.errors)[0]
          errorMessage = Array.isArray(firstError) ? firstError[0] : firstError
        }
        
        // Show error toast if available
        if (window.$toast) {
          window.$toast.error(errorMessage)
        } else {
          alert(errorMessage)
        }
      } finally {
        this.sending = false
      }
    },
    
    // Handle message input
    handleMessageInput() {
      this.handleTyping()
      
      // Auto-resize textarea
      const textarea = this.$refs.messageInput
      if (textarea) {
        textarea.style.height = 'auto'
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
      }
    },
    
    // Handle typing
    handleTyping() {
      if (this.typingTimeout) {
        clearTimeout(this.typingTimeout)
      }
      
      // Send typing indicator
      axios.post('/api/presence/typing', {
        type: this.activeConversation.type,
        id: this.activeConversation.id
      })
      
      // Stop typing after 3 seconds
      this.typingTimeout = setTimeout(() => {
        axios.post('/api/presence/stop-typing', {
          type: this.activeConversation.type,
          id: this.activeConversation.id
        })
      }, 3000)
    },
    
    // Real-time message handling
    handleNewMessage(message) {
      this.messages.push(message)
      this.groupMessagesByDate()
      
      if (message.user.id !== this.currentUser.id) {
        // Update unread count
        const channel = this.channels.find(c => c.id === message.channel_id)
        if (channel) {
          channel.unread_count = (channel.unread_count || 0) + 1
        }
        
        // Show notification
        this.showNotification(message)
      }
      
      this.$nextTick(() => {
        if (this.isNearBottom()) {
          this.scrollToBottom()
        }
      })
    },
    
    // Create channel
    async createChannel() {
      try {
        const response = await axios.post('/channels', {
          name: this.newChannel.name,
          description: this.newChannel.description,
          type: this.newChannel.isPrivate ? 'private' : 'public'
        })
        
        this.channels.unshift(response.data.data)
        this.showCreateChannelModal = false
        this.newChannel = { name: '', description: '', isPrivate: false }
        
        // Select the new channel
        this.selectChannel(response.data.data)
        
        this.$toast.success('Channel created successfully')
      } catch (error) {
        console.error('Error creating channel:', error)
        this.$toast.error('Failed to create channel')
      }
    },
    
    // Reactions
    async toggleReaction(message, emoji) {
      try {
        if (this.hasUserReacted(message, emoji)) {
          await axios.delete(`/api/messages/${message.id}/reactions`, {
            data: { emoji }
          })
        } else {
          await axios.post(`/api/messages/${message.id}/reactions`, { emoji })
        }
      } catch (error) {
        console.error('Error toggling reaction:', error)
        this.$toast.error('Failed to update reaction')
      }
    },
    
    hasUserReacted(message, emoji) {
      const reaction = message.reactions_summary?.find(r => r.emoji === emoji)
      return reaction?.users?.some(u => u.id === this.currentUser.id)
    },
    
    // Formatting helpers
    formatMessageContent(content) {
      // Convert markdown-like formatting to HTML
      return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/~~(.*?)~~/g, '<del>$1</del>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>')
    },
    
    formatDateSeparator(date) {
      const dateObj = new Date(date)
      if (isToday(dateObj)) return 'Today'
      if (isYesterday(dateObj)) return 'Yesterday'
      return format(dateObj, 'EEEE, MMMM d')
    },
    
    formatMessageTime(timestamp) {
      return format(new Date(timestamp), 'h:mm a')
    },
    
    formatFileSize(bytes) {
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      if (bytes === 0) return '0 Bytes'
      const i = Math.floor(Math.log(bytes) / Math.log(1024))
      return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
    },
    
    // Utility methods
    groupMessagesByDate() {
      this.groupedMessages = this.messages.reduce((groups, message) => {
        const date = format(new Date(message.created_at), 'yyyy-MM-dd')
        if (!groups[date]) {
          groups[date] = []
        }
        groups[date].push(message)
        return groups
      }, {})
    },
    
    scrollToBottom() {
      const container = this.$refs.messagesContainer
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    },
    
    isNearBottom() {
      const container = this.$refs.messagesContainer
      if (!container) return true
      return container.scrollHeight - container.scrollTop - container.clientHeight < 100
    },
    
    getDefaultAvatar(user) {
      const name = user?.name || 'User'
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    },
    
    getDmAvatar(dm) {
      const otherUser = dm.participants?.find(p => p.id !== this.currentUser.id)
      return otherUser?.avatar || this.getDefaultAvatar(otherUser || { name: dm.display_name })
    },
    
    getDmPresence(dm) {
      const otherUser = dm.participants?.find(p => p.id !== this.currentUser.id)
      return otherUser?.presence?.status || 'offline'
    },
    
    getDmStatusText(dm) {
      const otherUser = dm.participants?.find(p => p.id !== this.currentUser.id)
      return otherUser?.presence?.status_text || ''
    },
    
    getAttachmentIcon(attachment) {
      if (attachment.isImage()) return 'ti-image'
      if (attachment.isVideo()) return 'ti-video-camera'
      if (attachment.isAudio()) return 'ti-music-alt'
      if (attachment.isPdf()) return 'ti-file'
      return 'ti-clip'
    },
    
    getFileIcon(mimeType) {
      if (mimeType.startsWith('image/')) return 'ti-image'
      if (mimeType.startsWith('video/')) return 'ti-video-camera'
      if (mimeType.startsWith('audio/')) return 'ti-music-alt'
      if (mimeType === 'application/pdf') return 'ti-file'
      return 'ti-clip'
    },
    
    // File handling
    handleFileUpload(event) {
      const files = Array.from(event.target.files)
      this.uploadedFiles.push(...files)
    },
    
    removeFile(index) {
      this.uploadedFiles.splice(index, 1)
    },
    
    // UI toggles
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },
    
    toggleSection(section) {
      this.sectionsExpanded[section] = !this.sectionsExpanded[section]
    },
    
    // Presence
    startPresenceHeartbeat() {
      // Send heartbeat every 30 seconds
      this.heartbeatInterval = setInterval(() => {
        axios.post('/api/presence/heartbeat')
      }, 30000)
      
      // Set initial status
      axios.post('/api/presence/status', {
        status: 'online'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// Variables
$sidebar-width: 280px;
$header-height: 60px;
$input-height: 120px;
$primary-color: #4a154b;
$hover-color: #f8f8f8;
$border-color: #e0e0e0;
$text-muted: #666;

// Main Container
.team-chat-container {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background: #fff;
}

.chat-layout {
  display: flex;
  height: 100%;
}

// Sidebar
.chat-sidebar {
  width: $sidebar-width;
  height: 100%;
  background: $primary-color;
  color: #fff;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  
  &.sidebar-collapsed {
    width: 70px;
    
    .workspace-name,
    .status-text,
    .sidebar-search,
    .section-header span,
    .channel-name,
    .dm-info,
    .browse-channels {
      display: none;
    }
  }
}

.workspace-header {
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .workspace-info {
    flex: 1;
  }
  
  .workspace-name {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 5px;
  }
  
  .user-status {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    opacity: 0.9;
  }
  
  .status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    
    &.status-online {
      background: #2bac76;
    }
    
    &.status-away {
      background: #ffb800;
    }
    
    &.status-busy {
      background: #e01e5a;
    }
    
    &.status-offline {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.4);
    }
  }
  
  .compose-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}

.sidebar-search {
  padding: 10px 20px;
  position: relative;
  
  input {
    width: 100%;
    padding: 8px 35px 8px 12px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    color: #fff;
    font-size: 14px;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
    
    &:focus {
      outline: none;
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.4);
    }
  }
  
  i {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.6);
  }
}

.sidebar-sections {
  flex: 1;
  overflow-y: auto;
  padding: 10px 0;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }
}

.sidebar-section {
  margin-bottom: 20px;
}

.section-item {
  width: 100%;
  padding: 8px 20px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
  
  .badge {
    margin-left: auto;
    background: #cd2553;
    color: #fff;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 10px;
  }
}

.section-header {
  padding: 8px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  
  &:hover {
    color: #fff;
  }
  
  i {
    font-size: 10px;
    transition: transform 0.2s;
    
    &.rotated {
      transform: rotate(-90deg);
    }
  }
  
  .add-btn {
    margin-left: auto;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    padding: 4px;
    
    &:hover {
      color: #fff;
    }
  }
}

.section-content {
  padding: 0;
}

.channel-item,
.dm-item {
  padding: 6px 20px 6px 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
  
  &.active {
    background: #1164a3;
    color: #fff;
  }
  
  &.unread {
    color: #fff;
    font-weight: 600;
  }
}

.channel-prefix {
  opacity: 0.6;
}

.dm-item {
  padding-left: 20px;
  
  .user-avatar {
    position: relative;
    width: 24px;
    height: 24px;
    
    img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      object-fit: cover;
    }
    
    .presence-indicator {
      position: absolute;
      bottom: -2px;
      right: -2px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px solid $primary-color;
      
      &.status-online {
        background: #2bac76;
      }
      
      &.status-away {
        background: #ffb800;
      }
      
      &.status-busy {
        background: #e01e5a;
      }
      
      &.status-offline {
        background: #666;
      }
    }
  }
  
  .dm-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  
  .dm-status {
    font-size: 12px;
    opacity: 0.7;
  }
}

.unread-count {
  margin-left: auto;
  background: #cd2553;
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
}

.browse-channels {
  width: 100%;
  padding: 8px 40px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    color: #fff;
  }
}

// Main Chat Area
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  min-width: 0;
}

.chat-header {
  height: $header-height;
  padding: 0 20px;
  border-bottom: 1px solid $border-color;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 15px;
    flex: 1;
    min-width: 0;
  }
  
  .mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    
    @media (max-width: 768px) {
      display: block;
    }
  }
  
  .conversation-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .header-info {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: $text-muted;
    
    .divider {
      opacity: 0.3;
    }
    
    .channel-description {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  
  .header-actions {
    display: flex;
    gap: 10px;
  }
  
  .header-btn {
    width: 36px;
    height: 36px;
    border: none;
    background: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $text-muted;
    transition: all 0.2s;
    
    &:hover {
      background: $hover-color;
      color: #333;
    }
    
    .starred {
      color: #ffb800;
    }
  }
}

// Messages Container
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f8f8f8;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 4px;
    
    &:hover {
      background: #ccc;
    }
  }
}

.messages-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 20px;
  color: $text-muted;
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid $primary-color;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

// Messages
.date-separator {
  display: flex;
  align-items: center;
  margin: 20px 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: $border-color;
  }
  
  span {
    padding: 0 15px;
    font-size: 13px;
    color: $text-muted;
    font-weight: 500;
  }
}

.message-wrapper {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  position: relative;
  
  &:hover {
    .message-actions {
      opacity: 1;
    }
  }
  
  &.own-message {
    .message-content {
      background: #f0f7ff;
    }
  }
}

.message-avatar {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    object-fit: cover;
  }
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 4px;
  
  .message-author {
    font-weight: 600;
    font-size: 15px;
  }
  
  .message-time {
    font-size: 12px;
    color: $text-muted;
  }
  
  .message-edited {
    font-size: 12px;
    color: $text-muted;
    font-style: italic;
  }
}

.message-body {
  font-size: 15px;
  line-height: 1.5;
  word-wrap: break-word;
  
  code {
    background: #f8f8f8;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 13px;
  }
}

.message-deleted {
  font-style: italic;
  color: $text-muted;
}

.message-attachments {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.attachment-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  background: #f8f8f8;
  border: 1px solid $border-color;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f0f0f0;
    border-color: #ccc;
  }
  
  .attachment-icon {
    font-size: 20px;
    color: $text-muted;
  }
  
  .attachment-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  
  .attachment-name {
    font-size: 14px;
    font-weight: 500;
  }
  
  .attachment-size {
    font-size: 12px;
    color: $text-muted;
  }
}

// Message Reactions
.message-reactions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.reaction-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: #f8f8f8;
  border: 1px solid $border-color;
  border-radius: 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f0f0f0;
    border-color: #ccc;
  }
  
  &.user-reacted {
    background: #e3f2fd;
    border-color: #1976d2;
  }
  
  .reaction-count {
    font-size: 12px;
    color: $text-muted;
  }
}

.add-reaction-btn {
  width: 28px;
  height: 28px;
  border: 1px solid $border-color;
  background: #fff;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text-muted;
  transition: all 0.2s;
  
  &:hover {
    background: #f8f8f8;
    border-color: #ccc;
  }
}

// Message Actions
.message-actions {
  position: absolute;
  top: -10px;
  right: 20px;
  display: flex;
  gap: 4px;
  background: #fff;
  border: 1px solid $border-color;
  border-radius: 6px;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.2s;
  
  button {
    width: 32px;
    height: 32px;
    border: none;
    background: none;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $text-muted;
    transition: all 0.2s;
    position: relative;
    
    &:hover {
      background: $hover-color;
      color: #333;
    }
    
    span {
      position: absolute;
      top: -2px;
      right: -2px;
      background: $primary-color;
      color: #fff;
      font-size: 10px;
      padding: 2px 4px;
      border-radius: 10px;
    }
  }
}

// Typing Indicator
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  
  .typing-dots {
    display: flex;
    gap: 4px;
    
    span {
      width: 8px;
      height: 8px;
      background: $text-muted;
      border-radius: 50%;
      animation: typing 1.4s infinite;
      
      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }
  
  .typing-text {
    font-size: 14px;
    color: $text-muted;
    font-style: italic;
  }
}

@keyframes typing {
  0%, 60%, 100% {
    opacity: 0.3;
  }
  30% {
    opacity: 1;
  }
}

// Empty State
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
  
  .empty-icon {
    font-size: 80px;
    color: #e0e0e0;
    margin-bottom: 20px;
  }
  
  h3 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 16px;
    color: $text-muted;
    margin-bottom: 30px;
  }
}

// Message Input
.message-input-container {
  border-top: 1px solid $border-color;
  background: #fff;
}

.reply-preview {
  padding: 10px 20px;
  background: #f8f8f8;
  border-bottom: 1px solid $border-color;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  
  .reply-info {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
    color: $text-muted;
    margin-bottom: 4px;
  }
  
  .reply-content {
    flex: 1;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .reply-close {
    width: 24px;
    height: 24px;
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $text-muted;
    
    &:hover {
      color: #333;
    }
  }
}

.upload-preview {
  padding: 10px 20px;
  background: #f8f8f8;
  border-bottom: 1px solid $border-color;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.upload-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: #fff;
  border: 1px solid $border-color;
  border-radius: 6px;
  
  .upload-icon {
    font-size: 20px;
    color: $text-muted;
  }
  
  .upload-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  
  .upload-name {
    font-size: 14px;
    font-weight: 500;
  }
  
  .upload-size {
    font-size: 12px;
    color: $text-muted;
  }
  
  .upload-remove {
    width: 20px;
    height: 20px;
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $text-muted;
    
    &:hover {
      color: #e01e5a;
    }
  }
}

.message-input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding: 15px 20px;
}

.input-action {
  width: 36px;
  height: 36px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text-muted;
  border-radius: 6px;
  transition: all 0.2s;
  
  &:hover {
    background: $hover-color;
    color: #333;
  }
}

.input-field-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: flex-end;
  background: #f8f8f8;
  border: 1px solid $border-color;
  border-radius: 8px;
  padding: 8px 12px;
  transition: all 0.2s;
  
  &:focus-within {
    border-color: $primary-color;
    box-shadow: 0 0 0 3px rgba(74, 21, 75, 0.1);
  }
  
  textarea {
    flex: 1;
    border: none;
    background: none;
    resize: none;
    font-family: inherit;
    font-size: 15px;
    line-height: 1.4;
    min-height: 24px;
    max-height: 120px;
    padding: 0;
    margin-right: 10px;
    
    &:focus {
      outline: none;
    }
  }
  
  .input-actions {
    display: flex;
    gap: 4px;
    
    button {
      width: 28px;
      height: 28px;
      border: none;
      background: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $text-muted;
      border-radius: 4px;
      transition: all 0.2s;
      
      &:hover {
        background: rgba(0, 0, 0, 0.05);
        color: #333;
      }
    }
  }
}

.send-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: $primary-color;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: darken($primary-color, 10%);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.formatting-toolbar {
  padding: 10px 20px;
  background: #f8f8f8;
  border-top: 1px solid $border-color;
  display: flex;
  align-items: center;
  gap: 4px;
  
  button {
    width: 32px;
    height: 32px;
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $text-muted;
    border-radius: 4px;
    transition: all 0.2s;
    
    &:hover {
      background: #e0e0e0;
      color: #333;
    }
  }
  
  .toolbar-separator {
    width: 1px;
    height: 20px;
    background: $border-color;
    margin: 0 4px;
  }
}

// Right Sidebar
.chat-right-sidebar {
  width: 360px;
  height: 100%;
  background: #fff;
  border-left: 1px solid $border-color;
  display: flex;
  flex-direction: column;
}

// Modals
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal {
  background: #fff;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid $border-color;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }
  
  .modal-close {
    width: 32px;
    height: 32px;
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $text-muted;
    border-radius: 4px;
    transition: all 0.2s;
    
    &:hover {
      background: $hover-color;
      color: #333;
    }
  }
}

.modal-body {
  padding: 20px;
  flex: 1;
  overflow-y: auto;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid $border-color;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

// Form Elements
.form-group {
  margin-bottom: 20px;
  
  label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    
    .optional {
      color: $text-muted;
      font-weight: 400;
    }
  }
  
  input[type="text"],
  textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid $border-color;
    border-radius: 6px;
    font-family: inherit;
    font-size: 14px;
    transition: all 0.2s;
    
    &:focus {
      outline: none;
      border-color: $primary-color;
      box-shadow: 0 0 0 3px rgba(74, 21, 75, 0.1);
    }
  }
  
  textarea {
    resize: vertical;
  }
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  
  span {
    font-size: 14px;
    font-weight: 500;
  }
}

.form-help {
  margin-top: 4px;
  font-size: 13px;
  color: $text-muted;
}

// Buttons
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &-primary {
    background: $primary-color;
    color: #fff;
    
    &:hover:not(:disabled) {
      background: darken($primary-color, 10%);
    }
  }
  
  &-secondary {
    background: #f8f8f8;
    color: #333;
    border: 1px solid $border-color;
    
    &:hover:not(:disabled) {
      background: #f0f0f0;
    }
  }
}

// Transitions
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  
  .modal {
    transform: scale(0.9);
  }
}

// Mobile Responsive
@media (max-width: 768px) {
  .chat-sidebar {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    
    &.sidebar-open {
      transform: translateX(0);
    }
  }
  
  .chat-right-sidebar {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 100;
  }
  
  .header-info {
    display: none;
  }
}
// Character counter
.char-counter {
  position: absolute;
  bottom: -20px;
  right: 10px;
  font-size: 11px;
  color: #e74c3c;
  background: #fff;
  padding: 2px 6px;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
</style>