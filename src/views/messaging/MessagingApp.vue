<template>
  <div class="messaging-app min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
    <!-- Mobile Sidebar Toggle -->
    <button 
      v-if="isMobile && !sidebarOpen"
      @click="sidebarOpen = true"
      class="fixed top-4 left-4 z-50 lg:hidden p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      aria-label="Open sidebar"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>

    <!-- Mobile Overlay -->
    <div 
      v-if="isMobile && sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden"
      aria-hidden="true"
    ></div>

    <div class="messaging-container flex flex-1 overflow-hidden">
      <!-- Left Sidebar -->
      <aside 
        :class="[
          'sidebar bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-transform duration-300 z-40',
          isMobile ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0',
          isMobile ? 'fixed inset-y-0 left-0 w-64' : 'w-64 lg:w-72'
        ]"
        aria-label="Chat sidebar"
      >
        <!-- Workspace Header -->
        <div class="workspace-header p-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-3">
            <h1 :class="[textSizes.h2, 'text-gray-900 dark:text-white font-bold']">
              {{ workspaceName }}
            </h1>
            <button 
              @click="sidebarOpen = false"
              class="lg:hidden p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              aria-label="Close sidebar"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-label="Online"></div>
            <span :class="[textSizes.bodySmall, 'text-gray-600 dark:text-gray-400']">{{ currentUser?.name || 'User' }}</span>
          </div>
        </div>

        <!-- Search Box -->
        <div class="search-box p-4 border-b border-gray-200 dark:border-gray-700">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              :class="[
                'w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600',
                'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white',
                'placeholder-gray-400 dark:placeholder-gray-500',
                'focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent',
                textSizes.bodySmall
              ]"
              placeholder="Search conversations..."
              aria-label="Search conversations"
            />
            <svg 
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
      </div>
    </div>

        <!-- Navigation Sections -->
        <div class="sidebar-content flex-1 overflow-y-auto">
          <!-- Channels Section -->
          <div class="channels-section px-4 py-3">
            <div class="flex items-center justify-between mb-3">
              <button 
                @click="channelsExpanded = !channelsExpanded"
                class="flex items-center gap-2 flex-1 text-left"
                :aria-expanded="channelsExpanded"
              >
                <svg 
                  :class="['w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform', channelsExpanded ? 'rotate-90' : '']"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
                <h3 :class="[textSizes.h4, 'text-gray-700 dark:text-gray-300 font-semibold uppercase tracking-wider']">
                  Channels
                </h3>
              </button>
              <button 
                @click="showCreateChannel = true"
                class="p-1 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded transition-colors"
                aria-label="Create new channel"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
              </button>
        </div>
        
            <transition name="slide">
              <div v-if="channelsExpanded" class="channel-list space-y-1">
                <button
                  v-for="channel in filteredChannels"
              :key="channel.id"
              @click="selectChannel(channel)"
                  :class="[
                    'w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200',
                    'hover:bg-gray-100 dark:hover:bg-gray-700',
                    selectedChannel?.id === channel.id 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                      : 'text-gray-700 dark:text-gray-300'
                  ]"
                  :aria-current="selectedChannel?.id === channel.id ? 'page' : undefined"
                >
                  <div class="flex items-center gap-2 flex-1 min-w-0">
                    <span :class="[textSizes.body, 'font-medium']"># {{ channel.name }}</span>
                  </div>
                  <span 
                    v-if="channel.unread_count > 0"
                    :class="[
                      'unread-badge flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full',
                      selectedChannel?.id === channel.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
                      textSizes.badgeSmall
                    ]"
                    aria-label="{{ channel.unread_count }} unread messages"
                  >
                    {{ channel.unread_count > 99 ? '99+' : channel.unread_count }}
                  </span>
                </button>
              </div>
            </transition>
          </div>

          <!-- Direct Messages Section -->
          <div class="direct-messages-section px-4 py-3 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between mb-3">
              <button 
                @click="dmsExpanded = !dmsExpanded"
                class="flex items-center gap-2 flex-1 text-left"
                :aria-expanded="dmsExpanded"
              >
                <svg 
                  :class="['w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform', dmsExpanded ? 'rotate-90' : '']"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
                <h3 :class="[textSizes.h4, 'text-gray-700 dark:text-gray-300 font-semibold uppercase tracking-wider']">
                  Direct Messages
                </h3>
              </button>
              <button 
                @click="showDirectMessage = true"
                class="p-1 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded transition-colors"
                aria-label="Start new direct message"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
              </button>
            </div>
            
            <transition name="slide">
              <div v-if="dmsExpanded" class="dm-list space-y-1">
                <button
                  v-for="dm in directMessages"
                  :key="dm.id"
                  @click="selectDirectMessage(dm)"
                  :class="[
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200',
                    'hover:bg-gray-100 dark:hover:bg-gray-700',
                    selectedChannel?.id === dm.id 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                      : 'text-gray-700 dark:text-gray-300'
                  ]"
                >
                  <div class="relative flex-shrink-0">
                    <img 
                      :src="getUserAvatar(dm.user || dm)" 
                      :alt="dm.user?.name || dm.name"
                      class="w-8 h-8 rounded-full object-cover"
                    />
                    <div 
                      class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800"
                      :class="{
                        'bg-green-500': dm.status === 'online',
                        'bg-yellow-500': dm.status === 'away',
                        'bg-red-500': dm.status === 'busy',
                        'bg-gray-400': dm.status === 'offline' || !dm.status
                      }"
                      aria-label="User status: {{ dm.status || 'offline' }}"
                    ></div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div :class="[textSizes.body, 'font-medium truncate']">{{ dm.user?.name || dm.name }}</div>
                  </div>
                  <span 
                    v-if="dm.unread_count > 0"
                    :class="[
                      'unread-badge flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full',
                      selectedChannel?.id === dm.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
                      textSizes.badgeSmall
                    ]"
                  >
                    {{ dm.unread_count > 99 ? '99+' : dm.unread_count }}
                  </span>
                </button>
              </div>
            </transition>
          </div>
        </div>
      </aside>

      <!-- Main Chat Area -->
      <main class="chat-area flex-1 flex flex-col bg-white dark:bg-gray-800">
        <!-- Direct Message Chat Component -->
        <DirectMessageChat
          v-if="selectedChannel?.type === 'dm' && activeDMConversation"
          :conversation="activeDMConversation"
          :current-user="currentUser"
          @conversation-updated="handleDMConversationUpdated"
        />
        
        <!-- Channel Chat (Existing) -->
        <template v-else-if="selectedChannel && selectedChannel.type !== 'dm'">
          <!-- Chat Header -->
          <div 
            class="chat-header flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
          <div class="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <button 
              @click="sidebarOpen = true"
              class="lg:hidden p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              aria-label="Open sidebar"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
            <div class="flex-1 min-w-0">
              <h2 :class="[textSizes.h2, 'text-gray-900 dark:text-white font-semibold flex items-center gap-2']">
                <span v-if="selectedChannel.type !== 'dm'">#</span>
                {{ selectedChannel.name }}
              </h2>
              <p v-if="selectedChannel.description" :class="[textSizes.bodySmall, 'text-gray-500 dark:text-gray-400 mt-0.5']">
                {{ selectedChannel.description }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button 
              @click="initiateCall"
              class="p-2 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
              aria-label="Start call"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </button>
            <button 
              @click="showChannelInfo = true"
              class="p-2 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
              aria-label="Channel information"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Messages Container -->
        <div 
          v-if="selectedChannel"
          ref="messagesContainer"
          class="messages-container flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4"
          @scroll="handleScroll"
        >
          <!-- Loading State -->
          <div v-if="loading" class="flex items-center justify-center h-full">
            <div class="text-center">
              <div class="w-12 h-12 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin mx-auto mb-4"></div>
              <p :class="[textSizes.body, 'text-gray-500 dark:text-gray-400']">Loading messages...</p>
            </div>
          </div>

          <!-- Messages List -->
          <div v-else-if="messages.length > 0" class="messages-list space-y-6">
            <template v-for="(message, index) in messages" :key="message.id">
              <!-- Date Separator -->
              <div 
                v-if="shouldShowDateSeparator(message, index)"
                class="date-separator flex items-center gap-4 my-6"
              >
                <div class="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                <span :class="[textSizes.label, 'text-gray-500 dark:text-gray-400 px-3']">
                  {{ formatDate(message.created_at) }}
                </span>
                <div class="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              </div>

              <!-- Unread Separator -->
              <div 
                v-if="message.is_unread && index > 0 && !messages[index - 1].is_unread"
                class="unread-separator flex items-center gap-4 my-6"
              >
                <div class="flex-1 h-px bg-purple-300 dark:bg-purple-600"></div>
                <span :class="[textSizes.label, 'text-purple-600 dark:text-purple-400 px-3 font-semibold']">
                  New Messages
                </span>
                <div class="flex-1 h-px bg-purple-300 dark:bg-purple-600"></div>
              </div>

              <!-- Message Item -->
              <div 
                :class="[
                  'message-item group flex gap-3 sm:gap-4 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors',
                  message.user?.id === currentUser?.id ? 'flex-row-reverse' : ''
                ]"
              >
                <!-- Avatar -->
                <div class="flex-shrink-0">
                  <img 
                    :src="getUserAvatar(message.user)" 
                    :alt="message.user?.name"
                    class="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                  />
                </div>

                <!-- Message Content -->
                <div :class="['message-content flex-1 min-w-0', message.user?.id === currentUser?.id ? 'items-end' : '']">
                  <div class="flex items-baseline gap-2 mb-1">
                    <span :class="[textSizes.body, 'font-semibold text-gray-900 dark:text-white']">
                      {{ message.user?.name }}
                    </span>
                    <span :class="[textSizes.bodySmall, 'text-gray-500 dark:text-gray-400']">
                      {{ formatTime(message.created_at) }}
                    </span>
                    <span 
                      v-if="message.is_edited"
                      :class="[textSizes.bodySmall, 'text-gray-400 dark:text-gray-500 italic']"
                    >
                      (edited)
              </span>
            </div>

                  <!-- Message Text -->
                  <div 
                    v-if="!message.is_deleted"
                    :class="[textSizes.body, 'text-gray-700 dark:text-gray-300 mb-2 break-words']"
                  >
                    {{ message.content }}
                  </div>

                  <!-- Deleted Message -->
                  <div 
                    v-else
                    :class="[textSizes.bodySmall, 'text-gray-400 dark:text-gray-500 italic mb-2']"
                  >
                    This message was deleted
                  </div>

                  <!-- Attachments -->
                  <div v-if="message.attachments && message.attachments.length > 0" class="attachments-grid mt-2 space-y-2">
                    <!-- Image Attachments -->
                    <div 
                      v-for="attachment in message.attachments.filter(a => a.type === 'image')"
                      :key="attachment.id"
                      class="attachment-image"
                    >
                      <img 
                        :src="attachment.url" 
                        :alt="attachment.name"
                        @click="openImageModal(attachment.url)"
                        class="max-w-xs sm:max-w-md rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      />
                    </div>

                    <!-- Document Attachments -->
                    <div 
                      v-for="attachment in message.attachments.filter(a => a.type === 'document')"
                      :key="attachment.id"
                      class="attachment-document flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                      @click="downloadAttachment(attachment)"
                    >
                      <div class="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                      </div>
                      <div class="flex-1 min-w-0">
                        <div :class="[textSizes.body, 'font-medium text-gray-900 dark:text-white truncate']">
                          {{ attachment.name }}
                        </div>
                        <div :class="[textSizes.bodySmall, 'text-gray-500 dark:text-gray-400']">
                          {{ formatFileSize(attachment.size) }}
          </div>
        </div>
      </div>

                    <!-- Audio Attachments -->
                    <div 
                      v-for="attachment in message.attachments.filter(a => a.type === 'audio')"
                      :key="attachment.id"
                      class="attachment-audio p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                    >
                      <audio controls class="w-full">
                        <source :src="attachment.url" :type="attachment.mime_type">
                        Your browser does not support audio playback.
                      </audio>
                    </div>
                  </div>

                  <!-- Message Reactions -->
                  <div v-if="message.reactions && message.reactions.length > 0" class="reactions flex flex-wrap gap-2 mt-2">
                    <button
                      v-for="reaction in message.reactions"
                      :key="reaction.emoji"
                      :class="[
                        'reaction-item flex items-center gap-1 px-2 py-1 rounded-full border transition-colors',
                        reaction.users?.includes(currentUser?.id)
                          ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700'
                          : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                      ]"
                      @click="toggleReaction(message, reaction.emoji)"
                    >
                      <span>{{ reaction.emoji }}</span>
                      <span :class="[textSizes.bodySmall, 'text-gray-700 dark:text-gray-300']">
                        {{ reaction.count }}
                      </span>
                    </button>
          </div>
          
                  <!-- Message Actions (on hover) -->
                  <div class="message-actions opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 mt-2">
                    <button 
                      @click="replyToMessage(message)"
                      class="p-1.5 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded transition-colors"
                      aria-label="Reply to message"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                      </svg>
                    </button>
                    <button 
                      @click="addReaction(message)"
                      class="p-1.5 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded transition-colors"
                      aria-label="Add reaction"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </button>
                    <button 
                      v-if="message.user?.id === currentUser?.id"
                      @click="deleteMessage(message)"
                      class="p-1.5 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      aria-label="Delete message"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </div>
                </div>
            </template>
                  </div>

          <!-- Empty State -->
          <div v-else class="flex items-center justify-center h-full">
            <div class="text-center">
              <svg class="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              <p :class="[textSizes.body, 'text-gray-500 dark:text-gray-400']">No messages yet. Start the conversation!</p>
                </div>
              </div>
            </div>

        <!-- Empty Chat State -->
        <div 
          v-else
          class="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900"
        >
          <div class="text-center px-4">
            <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
            <h3 :class="[textSizes.h2, 'text-gray-900 dark:text-white mb-2']">Select a conversation</h3>
            <p :class="[textSizes.body, 'text-gray-500 dark:text-gray-400']">
              Choose a channel or start a direct message to begin chatting
            </p>
          </div>
        </div>

        <!-- Message Input (Composer) - Only for Channels -->
        <div 
          v-if="selectedChannel && selectedChannel.type !== 'dm'"
          class="message-input border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4"
        >
          <!-- Typing Indicator -->
          <div 
            v-if="typingUsers.length > 0"
            class="typing-indicator mb-2 px-4"
          >
            <p :class="[textSizes.bodySmall, 'text-gray-500 dark:text-gray-400 italic']">
              {{ typingUsersText }}
            </p>
          </div>

          <!-- Reply Preview -->
          <div 
            v-if="replyingTo"
            class="reply-preview mb-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded flex items-center justify-between"
          >
            <div class="flex-1 min-w-0">
              <div :class="[textSizes.label, 'text-purple-600 dark:text-purple-400 font-semibold mb-1']">
                Replying to {{ replyingTo.user?.name }}
              </div>
              <div :class="[textSizes.bodySmall, 'text-gray-600 dark:text-gray-400 truncate']">
                {{ replyingTo.content }}
              </div>
            </div>
            <button 
              @click="replyingTo = null"
              class="ml-3 p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              aria-label="Cancel reply"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <!-- Input Area -->
          <div class="input-wrapper flex items-end gap-2 sm:gap-3">
            <!-- Action Buttons -->
            <div class="flex items-center gap-1">
              <button 
                @click="showFileUpload = true"
                class="p-2 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                aria-label="Attach file"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
                </svg>
              </button>
              <button 
                @click="showEmojiPicker = true"
                class="p-2 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                aria-label="Add emoji"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </button>
            </div>

            <!-- Text Input -->
            <div class="flex-1 relative">
            <textarea
              v-model="newMessage"
                ref="messageInput"
                :class="[
                  'w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-600',
                  'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white',
                  'placeholder-gray-400 dark:placeholder-gray-500',
                  'focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent',
                  'resize-none min-h-[2.75rem] max-h-32 overflow-y-auto',
                  textSizes.body
                ]"
              placeholder="Type a message..."
                rows="1"
                @keydown.enter.exact.prevent="handleEnterKey"
                @keydown.shift.enter.exact="handleShiftEnter"
                @input="handleTyping"
                aria-label="Message input"
            ></textarea>
            </div>

            <!-- Send Button -->
            <button 
              @click="sendMessage"
              :disabled="!newMessage.trim() && uploadedFiles.length === 0"
              :class="[
                'send-button px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-200',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                newMessage.trim() || uploadedFiles.length > 0
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:shadow-lg hover:scale-105'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500',
                textSizes.button
              ]"
              aria-label="Send message"
            >
              <span class="hidden sm:inline">Send</span>
              <svg class="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </button>
          </div>

          <!-- Uploaded Files Preview -->
          <div v-if="uploadedFiles.length > 0" class="uploaded-files mt-3 px-4">
            <div class="flex flex-wrap gap-2">
              <div 
                v-for="(file, index) in uploadedFiles"
                :key="index"
                class="file-preview flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
              >
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <span :class="[textSizes.bodySmall, 'text-gray-700 dark:text-gray-300']">{{ file.name }}</span>
                <button 
                  @click="removeFile(index)"
                  class="p-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                  aria-label="Remove file"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        </template>
      </main>
    </div>

    <!-- Call UI -->
    <div 
      v-if="callState !== 'idle'"
      class="call-ui fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <div class="call-container bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4">
        <!-- Incoming Call -->
        <div v-if="callState === 'incoming'" class="text-center">
          <div class="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
          </div>
          <h3 :class="[textSizes.h2, 'text-gray-900 dark:text-white mb-2']">Incoming Call</h3>
          <p :class="[textSizes.body, 'text-gray-500 dark:text-gray-400 mb-6']">{{ selectedChannel?.name }}</p>
          <div class="flex items-center justify-center gap-4">
            <button 
              @click="endCall"
              class="p-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              aria-label="Decline call"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <button 
              @click="acceptCall"
              class="p-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
              aria-label="Accept call"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Connecting/Active Call -->
        <div v-else class="text-center">
          <div class="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
          </div>
          <h3 :class="[textSizes.h2, 'text-gray-900 dark:text-white mb-2']">
            {{ callState === 'connecting' ? 'Connecting...' : 'Call Active' }}
          </h3>
          <p :class="[textSizes.body, 'text-gray-500 dark:text-gray-400 mb-6']">{{ selectedChannel?.name }}</p>
          <button 
            @click="endCall"
            class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
            aria-label="End call"
          >
            End Call
          </button>
        </div>
      </div>
    </div>

    <!-- Active Call Bar (minimized) -->
    <div 
      v-if="callState === 'active'"
      class="active-call-bar fixed bottom-4 right-4 z-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4"
    >
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
        </div>
        <div>
          <div :class="[textSizes.body, 'font-semibold text-gray-900 dark:text-white']">{{ selectedChannel?.name }}</div>
          <div :class="[textSizes.bodySmall, 'text-gray-500 dark:text-gray-400']">Call in progress</div>
        </div>
      </div>
      <button 
        @click="endCall"
        class="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        aria-label="End call"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
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
    
    <div v-if="showEmojiPicker" class="fixed bottom-20 right-4 z-50">
      <EmojiPicker
        :native="true"
        :hide-search="false"
        :hide-group-names="false"
        :hide-skin-tones="false"
        @select="addEmojiToMessage"
      />
      <button 
        @click="showEmojiPicker = false"
        class="mt-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm"
      >
        Close
      </button>
    </div>
    
    <FileUploadModal 
      v-if="showFileUpload" 
      @close="showFileUpload = false"
      @uploaded="onFileUploaded"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/utils/axios'
import { textSizes } from '@/utils/textSizes'
import { getEcho, getEchoAsync, disconnectEcho, isConnected } from '@/utils/echo'
import CreateChannelModal from './components/CreateChannelModal.vue'
import DirectMessageModal from './components/DirectMessageModal.vue'
import DirectMessageChat from './components/DirectMessageChat.vue'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import FileUploadModal from './components/FileUploadModal.vue'

// Use global axios instance (same as Dashboard) - it's already configured with interceptors
const axios = window.axios || api

// Reactive state
const workspaceName = ref('Techify')
const currentUser = ref(null)
    const channels = ref([])
const directMessages = ref([])
    const selectedChannel = ref(null)
    const activeDMConversation = ref(null)
    const messages = ref([])
    const newMessage = ref('')
    const searchQuery = ref('')
    const loading = ref(false)
const sidebarOpen = ref(false)
const channelsExpanded = ref(true)
const dmsExpanded = ref(true)
const replyingTo = ref(null)
const uploadedFiles = ref([])
const typingUsers = ref([])
const callState = ref('idle') // 'idle', 'incoming', 'connecting', 'active'
const showChannelInfo = ref(false)

// Statistics (like Dashboard)
const totalUnreadCount = ref(0)
const channelsCount = ref(0)
const directMessagesCount = ref(0)

// Modals
    const showCreateChannel = ref(false)
    const showDirectMessage = ref(false)
    const showEmojiPicker = ref(false)
    const showFileUpload = ref(false)
    
// Refs
    const messagesContainer = ref(null)
    const messageInput = ref(null)

// Responsive
const isMobile = ref(window.innerWidth < 768)
const handleResize = () => {
  isMobile.value = window.innerWidth < 768
  if (!isMobile.value) {
    sidebarOpen.value = false
  }
}

// Computed
const filteredChannels = computed(() => {
  if (!searchQuery.value) return channels.value
  return channels.value.filter(channel => 
    channel.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const typingUsersText = computed(() => {
  if (typingUsers.value.length === 0) return ''
  if (typingUsers.value.length === 1) {
    return `${typingUsers.value[0]} is typing...`
  }
  return `${typingUsers.value.length} people are typing...`
})

// Computed statistics (like Dashboard)
const updateStatistics = () => {
  // Calculate total unread count
  const channelsUnread = channels.value.reduce((sum, ch) => sum + (ch.unread_count || 0), 0)
  const dmsUnread = directMessages.value.reduce((sum, dm) => sum + (dm.unread_count || 0), 0)
  totalUnreadCount.value = channelsUnread + dmsUnread
  
  // Update counts
  channelsCount.value = channels.value.length
  directMessagesCount.value = directMessages.value.length
}

// Methods
const loadCurrentUser = async () => {
  try {
    // Use same pattern as Dashboard - get user from localStorage
    const user = localStorage.getItem('user')
    if (user) {
      try {
        const userData = JSON.parse(user)
        currentUser.value = userData
      } catch (e) {
        console.warn('Error parsing user data:', e)
      }
    }
    
    // Try to fetch from API
    const response = await axios.get('/user')
    if (response.data.data || response.data) {
      currentUser.value = response.data.data || response.data
    }
  } catch (error) {
    console.error('Failed to load current user:', error)
    // Use cached user if API fails
    if (!currentUser.value) {
      const user = localStorage.getItem('user')
      if (user) {
        try {
          currentUser.value = JSON.parse(user)
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
  }
}

const loadChannels = async () => {
  try {
    const response = await axios.get('/channels')
    // Handle both response formats (joined_channels array or direct array)
    if (response.data.data?.joined_channels) {
      channels.value = response.data.data.joined_channels || []
    } else if (Array.isArray(response.data.data)) {
      channels.value = response.data.data
    } else {
      channels.value = []
    }
    
    // Ensure unread_count is set for each channel
    channels.value = channels.value.map(channel => ({
      ...channel,
      unread_count: channel.unread_count || 0
    }))
    
    // Update statistics after loading
    updateStatistics()
  } catch (error) {
    // Error handling is done by axios interceptor
    // Only log if it's not a 401 (which is handled by interceptor)
    if (error?.response?.status !== 401) {
      console.error('Failed to load channels:', error)
    }
  }
}

const loadDirectMessages = async () => {
  try {
    // Use correct endpoint: /direct-messages/conversations
    const response = await axios.get('/direct-messages/conversations')
    
    // Handle response format
    if (response.data.success && response.data.data) {
      // Response format: { success: true, data: [...] }
      let loadedDMs = Array.isArray(response.data.data) ? response.data.data : []
      
      // CRITICAL FIX: Ensure unread_count is properly set from pivot table
      // Backend should return unread_count in the response, but ensure it's there
      directMessages.value = loadedDMs.map(dm => {
        // Get unread_count from pivot if available
        const unreadCount = dm.unread_count ?? 
                           dm.pivot?.unread_count ?? 
                           (dm.participants?.find(p => p.id === currentUser.value?.id)?.pivot?.unread_count) ?? 
                           0
        
        return {
          ...dm,
          unread_count: unreadCount,
          // Ensure user field exists for 1-on-1 DMs (the other participant)
          user: dm.user || (dm.participants?.find(p => p.id !== currentUser.value?.id) || dm.participants?.[0])
        }
      })
      
      // Sort by updated_at descending (most recent first)
      directMessages.value.sort((a, b) => {
        const dateA = new Date(a.updated_at || a.latest_message?.created_at || 0)
        const dateB = new Date(b.updated_at || b.latest_message?.created_at || 0)
        return dateB - dateA
      })
    } else {
      directMessages.value = []
    }
    
    // Update statistics after loading
    updateStatistics()
  } catch (error) {
    // Error handling is done by axios interceptor
    // Only log if it's not a 401 (which is handled by interceptor)
    if (error?.response?.status !== 401) {
      console.error('Failed to load direct messages:', error)
    }
  }
}

    const selectChannel = async (channel) => {
  selectedChannel.value = { ...channel, type: 'channel' }
  messages.value = []
  if (isMobile.value) {
    sidebarOpen.value = false
  }
  await loadMessages()
}

const selectDirectMessage = async (dm) => {
  try {
    let conversation = dm
    
    if (!dm.id || !dm.participants) {
      const otherUserId = dm.user_id || dm.id
      const response = await axios.post('/direct-messages/conversations', {
        user_ids: [otherUserId]
      })
      
      if (response.data?.success) {
        conversation = response.data.data
      } else {
        throw new Error('Failed to create conversation')
      }
    }
    
    selectedChannel.value = { ...conversation, type: 'dm' }
    activeDMConversation.value = conversation
    
    if (isMobile.value) {
      sidebarOpen.value = false
    }
  } catch (error) {
    console.error('Failed to select direct message:', error)
    toast.error('Failed to open conversation')
  }
}

const loadMessages = async () => {
  if (!selectedChannel.value) return
  
  loading.value = true
  try {
    let endpoint
    let response
    
    if (selectedChannel.value.type === 'dm') {
      // For DMs, use: GET /direct-messages/conversations/{id}
      endpoint = `/direct-messages/conversations/${selectedChannel.value.id}`
      response = await axios.get(endpoint)
      // Response format: { success: true, data: { conversation: {...}, messages: {...} } }
      const messagesData = response.data.data?.messages?.data || response.data.data?.messages || []
      messages.value = Array.isArray(messagesData) ? messagesData.reverse() : []
    } else {
      // For channels, use: GET /channels/{channelId}/messages
      endpoint = `/channels/${selectedChannel.value.id}/messages`
      response = await axios.get(endpoint)
      // Response format depends on MessageController index method
      const messagesData = response.data.data?.data || response.data.data || []
      messages.value = Array.isArray(messagesData) ? messagesData.reverse() : []
    }
    
    await nextTick()
    scrollToBottom()
  } catch (error) {
    console.error('Failed to load messages:', error)
    // Don't redirect - let axios interceptor handle it
  } finally {
    loading.value = false
  }
}

const sendMessage = async () => {
  if ((!newMessage.value.trim() && uploadedFiles.value.length === 0) || !selectedChannel.value) return
  
  try {
    let endpoint
    
    if (selectedChannel.value.type === 'dm') {
      // For DMs, use: /direct-messages/conversations/{id}/messages
      endpoint = `/direct-messages/conversations/${selectedChannel.value.id}/messages`
    } else {
      // For channels, use: POST /messages/channels/{channelId}
      endpoint = `/messages/channels/${selectedChannel.value.id}`
    }
    
    const formData = new FormData()
    formData.append('content', newMessage.value)
    formData.append('type', 'text')
    if (replyingTo.value) {
      formData.append('reply_to', replyingTo.value.id)
    }
    
    uploadedFiles.value.forEach((file, index) => {
      formData.append(`attachments[${index}]`, file)
    })
    
    const response = await axios.post(endpoint, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    
    // Handle response format
    const messageData = response.data.data || response.data
    if (messageData) {
      messages.value.push(messageData)
    }
    
    newMessage.value = ''
    replyingTo.value = null
    uploadedFiles.value = []
    
    await nextTick()
    scrollToBottom()
    
    if (messageInput.value) {
      messageInput.value.style.height = 'auto'
    }
  } catch (error) {
    console.error('Failed to send message:', error)
    // Don't redirect - let axios interceptor handle it
  }
}

    const scrollToBottom = () => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    }

const handleScroll = () => {
  // Implement infinite scroll if needed
}

const handleEnterKey = (event) => {
  if (!event.shiftKey) {
    sendMessage()
  }
}

const handleShiftEnter = () => {
  // Allow new line
}

const handleTyping = () => {
  // Implement typing indicator
}

    const getUserAvatar = (user) => {
  if (!user) return 'https://ui-avatars.com/api/?name=User&background=8b5cf6&color=fff'
  return user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=8b5cf6&color=fff`
    }

    const formatTime = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday'
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined })
  }
}

const shouldShowDateSeparator = (message, index) => {
  if (index === 0) return true
  const currentDate = new Date(message.created_at).toDateString()
  const prevDate = new Date(messages.value[index - 1].created_at).toDateString()
  return currentDate !== prevDate
}

const formatFileSize = (bytes) => {
  if (!bytes) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
    }

    const addEmojiToMessage = (emoji) => {
      // vue3-emoji-picker returns emoji object with i property (unicode)
      newMessage.value += emoji.i || emoji.emoji || emoji
      showEmojiPicker.value = false
      messageInput.value?.focus()
    }

    const onFileUploaded = (files) => {
  uploadedFiles.value = [...uploadedFiles.value, ...files]
      showFileUpload.value = false
    }

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1)
}

    const onChannelCreated = (channel) => {
  if (channel.type === 'channel') {
      channels.value.unshift(channel)
      selectChannel(channel)
  } else {
    directMessages.value.unshift(channel)
    selectDirectMessage(channel)
  }
}

const replyToMessage = (message) => {
  replyingTo.value = message
  messageInput.value?.focus()
}

const addReaction = (message) => {
  showEmojiPicker.value = true
  // Store message for reaction
}

const toggleReaction = async (message, emoji) => {
  // Implement reaction toggle
}

const deleteMessage = async (message) => {
  if (!confirm('Are you sure you want to delete this message?')) return
  // Implement delete
}

const initiateCall = () => {
  callState.value = 'connecting'
  // Implement call logic
}

const acceptCall = () => {
  callState.value = 'active'
}

const endCall = () => {
  callState.value = 'idle'
}

const openImageModal = (url) => {
  // Implement image modal
}

const downloadAttachment = (attachment) => {
  window.open(attachment.url, '_blank')
}

// Setup Echo listeners for realtime updates
let retryCount = 0
const MAX_RETRIES = 3 // Reduced from 10 - if connection fails, stop retrying
let connectionFailed = false // Track if connection has permanently failed

const setupRealtimeListeners = async () => {
  if (!currentUser.value?.id) {
    setTimeout(() => setupRealtimeListeners(), 1000)
    return
  }
  
  // CRITICAL FIX: Stop retrying if connection has permanently failed
  if (connectionFailed) {
    if (import.meta.env.DEV) {
      console.warn('[MessagingApp] Connection failed permanently. Reverb server may not be running.')
    }
    return
  }
  
  // CRITICAL FIX: Prevent infinite retry loops
  if (retryCount >= MAX_RETRIES) {
    console.error('[MessagingApp] Max retries reached. Echo connection failed.')
    console.error('[MessagingApp] Make sure Reverb server is running: php artisan reverb:start')
    connectionFailed = true
    return
  }
  
  try {
    // CRITICAL FIX: Use static import, not dynamic import
    const echo = await getEchoAsync()
    
    if (!echo) {
      retryCount++
      if (import.meta.env.DEV) {
        console.warn(`[MessagingApp] Echo not initialized, retrying... (${retryCount}/${MAX_RETRIES})`)
      }
      setTimeout(() => setupRealtimeListeners(), 2000)
      return
    }
    
    // CRITICAL FIX: Use Echo's connection state API, not Pusher internals
    if (!isConnected()) {
      retryCount++
      if (import.meta.env.DEV) {
        console.warn(`[MessagingApp] Echo not connected, retrying... (${retryCount}/${MAX_RETRIES})`)
      }
      setTimeout(() => setupRealtimeListeners(), 2000)
      return
    }

    // Connection is ready, setup subscriptions
    connectionFailed = false
    retryCount = 0
    setupChannelSubscriptions(echo)
  } catch (error) {
    console.error('[MessagingApp] Failed to setup realtime listeners:', error)
    
    // Check if it's a connection timeout error
    if (error?.message?.includes('timeout') || error?.message?.includes('Reverb server')) {
      connectionFailed = true
      console.error('[MessagingApp] Connection timeout. Reverb server is not running.')
      console.error('[MessagingApp] Start Reverb server: php artisan reverb:start')
      return
    }
    
    retryCount++
    if (retryCount < MAX_RETRIES) {
      setTimeout(() => setupRealtimeListeners(), 3000)
    } else {
      connectionFailed = true
      console.error('[MessagingApp] Max retries reached. Connection failed.')
    }
  }
}

// Separate function to setup channel subscriptions after connection is ready
const setupChannelSubscriptions = (echo) => {
  try {
    // CRITICAL FIX: Use Echo's connection state API, not Pusher internals
    if (!isConnected()) {
      if (import.meta.env.DEV) {
        console.warn('[MessagingApp] Connection not ready for subscriptions, retrying...')
      }
      setTimeout(() => setupRealtimeListeners(), 2000)
      return
    }

    // Listen to user's private channel for channel updates
    const userChannel = echo.private(`user.${currentUser.value.id}`)
    
    // CRITICAL FIX: Wait for subscription to be authorized before setting up listeners
    userChannel.subscribed(() => {
      if (import.meta.env.DEV) {
        console.log('[MessagingApp] User channel subscribed successfully')
      }
      
      // Setup listeners only after subscription is confirmed
      // Channel created - add to sidebar immediately
      userChannel.listen('.channel.created', (data) => {
        if (data.channel && !channels.value.find(c => c.id === data.channel.id)) {
          channels.value.unshift(data.channel)
          updateStatistics()
        }
      })
      
      // Channel updated - refresh sidebar
      userChannel.listen('.channel.updated', (data) => {
        if (data.channel) {
          const index = channels.value.findIndex(c => c.id === data.channel.id)
          if (index !== -1) {
            channels.value[index] = { ...channels.value[index], ...data.channel }
          } else {
            channels.value.unshift(data.channel)
          }
          updateStatistics()
        }
      })
      
      // User joined channel - add channel to sidebar immediately if it's the current user
      userChannel.listen('.user.joined', (data) => {
        // If current user joined, add channel to sidebar immediately
        if (data.channel && data.user?.id === currentUser.value.id) {
          if (!channels.value.find(c => c.id === data.channel.id)) {
            channels.value.unshift(data.channel)
            updateStatistics()
          }
        } else {
          // For other users joining, just reload to ensure consistency
          loadChannels()
        }
      })
      
      // DM conversation created - add to sidebar immediately
      userChannel.listen('.dm.conversation.created', (data) => {
        if (data.conversation && !directMessages.value.find(d => d.id === data.conversation.id)) {
          directMessages.value.unshift(data.conversation)
          updateStatistics()
        }
      })
      
      // Unread count updated - CRITICAL FIX: Update DM sidebar immediately
      userChannel.listen('.unread.updated', (data) => {
        if (data.conversation_type === 'channel') {
          const channel = channels.value.find(c => c.id === data.conversation_id)
          if (channel) {
            channel.unread_count = data.unread_count || 0
            updateStatistics()
          }
        } else if (data.conversation_type === 'dm') {
          const dm = directMessages.value.find(d => d.id === data.conversation_id)
          if (dm) {
            // Update unread count
            dm.unread_count = data.unread_count || 0
            // Move to top of list if has unread messages
            if (dm.unread_count > 0) {
              const index = directMessages.value.findIndex(d => d.id === data.conversation_id)
              if (index > 0) {
                directMessages.value.splice(index, 1)
                directMessages.value.unshift(dm)
              }
            }
            updateStatistics()
          } else {
            // If DM not in list, reload to get it
            loadDirectMessages()
          }
        }
      })
      
      // DM notification received - CRITICAL FIX: Add conversation to sidebar if not present
      userChannel.listen('.dm.notification', (data) => {
        if (data.conversation && data.unread_count !== undefined) {
          // Check if conversation already exists
          const existingDM = directMessages.value.find(d => d.id === data.conversation.id)
          if (existingDM) {
            // Update unread count and latest message
            existingDM.unread_count = data.unread_count || 0
            if (data.conversation.latest_message) {
              existingDM.latest_message = data.conversation.latest_message
            }
            // Move to top if has unread messages
            if (existingDM.unread_count > 0) {
              const index = directMessages.value.findIndex(d => d.id === data.conversation.id)
              if (index > 0) {
                directMessages.value.splice(index, 1)
                directMessages.value.unshift(existingDM)
              }
            }
          } else {
            // Add new conversation to sidebar
            // Format it to match the structure expected by the sidebar
            const newDM = {
              id: data.conversation.id,
              name: data.conversation.name,
              is_group: data.conversation.is_group || false,
              display_name: data.conversation.display_name,
              participants: data.conversation.participants || [],
              latest_message: data.conversation.latest_message,
              unread_count: data.unread_count || 0,
              updated_at: data.conversation.updated_at,
              // For 1-on-1 DMs, get the other user for display
              user: data.conversation.participants?.find(p => p.id !== currentUser.value?.id) || data.conversation.participants?.[0]
            }
            directMessages.value.unshift(newDM)
          }
          updateStatistics()
        }
      })
      
      if (import.meta.env.DEV) {
        console.log('[MessagingApp] Realtime listeners setup complete')
      }
    })
    
    userChannel.error((error) => {
      console.error('[MessagingApp] Channel subscription error:', error)
      retryCount++
      if (retryCount < MAX_RETRIES) {
        setTimeout(() => setupRealtimeListeners(), 3000)
      }
    })
    
    // Listen for DM conversation updates from notifications (when receiving first message)
    // This is a window event, not Echo event, so it can be outside subscribed()
    window.addEventListener('dm-conversation-updated', (event) => {
      const { conversation } = event.detail
      if (conversation && !directMessages.value.find(d => d.id === conversation.id)) {
        directMessages.value.unshift(conversation)
        updateStatistics()
      }
    })
  } catch (error) {
    console.error('[MessagingApp] Failed to setup channel subscriptions:', error)
    retryCount++
    if (retryCount < MAX_RETRIES) {
      setTimeout(() => setupRealtimeListeners(), 3000)
    }
  }
}

// Lifecycle
onMounted(async () => {
  window.addEventListener('resize', handleResize)
  await loadCurrentUser()
  await loadChannels()
  await loadDirectMessages()
  
  // Update statistics after initial load
  updateStatistics()
  
  // Setup realtime listeners after user is loaded
  if (currentUser.value?.id) {
    setupRealtimeListeners()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  // Cleanup Echo listeners
  try {
    const echo = getEcho()
    if (echo && currentUser.value?.id) {
      echo.leave(`user.${currentUser.value.id}`)
    }
  } catch (error) {
    console.error('[MessagingApp] Error cleaning up Echo listeners:', error)
  }
})

// Watch for new messages to auto-scroll
watch(messages, () => {
  nextTick(() => {
    scrollToBottom()
  })
}, { deep: true })

// Watch channels and DMs to update statistics (like Dashboard)
watch([channels, directMessages], () => {
  updateStatistics()
}, { deep: true })

// Handle DM conversation updates
const handleDMConversationUpdated = () => {
  // Reload direct messages list to update unread counts
  loadDirectMessages()
  // Update statistics
  updateStatistics()
}
</script>

<style scoped>
/* Slide transition for expandable sections */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 1000px;
  opacity: 1;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

/* Custom scrollbar */
.messages-container::-webkit-scrollbar,
.sidebar-content::-webkit-scrollbar {
  width: 6px;
}

.messages-container::-webkit-scrollbar-track,
.sidebar-content::-webkit-scrollbar-track {
  background: transparent;
}

.messages-container::-webkit-scrollbar-thumb,
.sidebar-content::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.3);
  border-radius: 3px;
}

.messages-container::-webkit-scrollbar-thumb:hover,
.sidebar-content::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 92, 246, 0.5);
}

.dark .messages-container::-webkit-scrollbar-thumb,
.dark .sidebar-content::-webkit-scrollbar-thumb {
  background: rgba(168, 85, 247, 0.3);
}

.dark .messages-container::-webkit-scrollbar-thumb:hover,
.dark .sidebar-content::-webkit-scrollbar-thumb:hover {
  background: rgba(168, 85, 247, 0.5);
}

/* Smooth transitions */
* {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Focus styles for accessibility */
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid rgba(139, 92, 246, 0.5);
  outline-offset: 2px;
}

.dark button:focus-visible,
.dark input:focus-visible,
.dark textarea:focus-visible {
  outline-color: rgba(168, 85, 247, 0.5);
}
</style> 
