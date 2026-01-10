<template>
  <div class="message-group" :class="{ 'is-current-user': isCurrentUser }">
    <!-- Date Separator -->
    <div v-if="showDateSeparator" class="date-separator">
      <div class="date-line"></div>
      <span class="date-text">{{ formattedDate }}</span>
      <div class="date-line"></div>
    </div>

    <!-- Unread Separator -->
    <div v-if="showUnreadSeparator" class="unread-separator">
      <div class="unread-line"></div>
      <span class="unread-text">New Messages</span>
      <div class="unread-line"></div>
    </div>

    <!-- Message Group Container -->
    <div class="message-group-container">
      <!-- Avatar (only on first message) -->
      <div v-if="showAvatar" class="message-avatar">
        <img
          :src="getUserAvatar(message.user)"
          :alt="message.user?.name || 'User'"
          class="avatar-image"
        />
      </div>
      <div v-else class="message-avatar-spacer"></div>

      <!-- Messages -->
      <div class="messages-content">
        <!-- Username and Timestamp (only on first message) -->
        <div v-if="showAvatar" class="message-header">
          <span class="message-username">{{ message.user?.name || 'Unknown' }}</span>
          <span class="message-timestamp">{{ formattedTime(message.created_at) }}</span>
        </div>

        <!-- Message Items -->
        <div
          v-for="(msg, index) in groupedMessages"
          :key="msg.id"
          class="message-item"
          :class="{ 'has-reactions': msg.reactions?.length > 0 }"
          @mouseenter="hoveredMessageId = msg.id"
          @mouseleave="hoveredMessageId = null"
        >
          <!-- Message Content -->
          <div class="message-content">
            <div
              v-if="msg.is_deleted"
              class="message-text deleted"
            >
              This message has been deleted
            </div>
            <div
              v-else
              class="message-text"
              v-html="formatMessageContent(msg.content, msg.mentions)"
            ></div>

            <!-- Attachments -->
            <MessageAttachments
              v-if="msg.attachments?.length"
              :attachments="msg.attachments"
            />

            <!-- Reactions -->
            <MessageReactions
              v-if="msg.reactions?.length"
              :reactions="msg.reactions"
              :message-id="msg.id"
              @add-reaction="handleAddReaction"
              @remove-reaction="handleRemoveReaction"
            />

            <!-- Edited Indicator -->
            <span v-if="msg.is_edited" class="edited-indicator">(edited)</span>
          </div>

          <!-- Hover Actions -->
          <div
            v-if="hoveredMessageId === msg.id"
            class="message-actions"
          >
            <button
              @click="$emit('react', msg.id)"
              class="action-btn"
              aria-label="Add reaction"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </button>
            <button
              v-if="msg.user_id === currentUser.id"
              @click="$emit('edit', msg.id)"
              class="action-btn"
              aria-label="Edit message"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            <button
              v-if="msg.user_id === currentUser.id"
              @click="$emit('delete', msg.id)"
              class="action-btn"
              aria-label="Delete message"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
            <button
              @click="$emit('reply', msg.id)"
              class="action-btn"
              aria-label="Reply to message"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatMessageTime, formatDate, shouldShowDateSeparator } from '@/utils/dateHelper'
import { formatMentionText } from '@/utils/mentionHelper'
import MessageAttachments from './MessageAttachments.vue'
import MessageReactions from './MessageReactions.vue'

const props = defineProps({
  messages: {
    type: Array,
    required: true
  },
  currentUser: {
    type: Object,
    required: true
  },
  previousGroup: {
    type: Object,
    default: null
  },
  nextGroup: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['react', 'edit', 'delete', 'reply'])

const hoveredMessageId = ref(null)

const message = computed(() => props.messages[0])
const groupedMessages = computed(() => props.messages)

const isCurrentUser = computed(() => message.value.user_id === props.currentUser.id)

const showAvatar = computed(() => {
  if (!props.previousGroup) return true
  const prevMessage = props.previousGroup.messages[props.previousGroup.messages.length - 1]
  const timeDiff = new Date(message.value.created_at) - new Date(prevMessage.created_at)
  return (
    prevMessage.user_id !== message.value.user_id ||
    timeDiff > 5 * 60 * 1000 // 5 minutes
  )
})

const showDateSeparator = computed(() => {
  if (!props.previousGroup) return true
  return shouldShowDateSeparator(message.value.created_at, props.previousGroup.messages[0].created_at)
})

const showUnreadSeparator = computed(() => {
  return message.value.is_unread && 
         (!props.previousGroup || !props.previousGroup.messages[0].is_unread)
})

const formattedDate = computed(() => formatDate(message.value.created_at))
const formattedTime = (timestamp) => formatMessageTime(timestamp)

const formatMessageContent = (content, mentions = []) => {
  if (!content) return ''
  return formatMentionText(content, mentions)
}

const getUserAvatar = (user) => {
  return user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=6366f1&color=fff`
}

const handleAddReaction = (messageId, emoji) => {
  emit('react', messageId, emoji)
}

const handleRemoveReaction = (messageId, emoji) => {
  emit('remove-reaction', messageId, emoji)
}
</script>

<style scoped>
.message-group {
  @apply mb-4;
}

.message-group.is-current-user .message-group-container {
  @apply flex-row-reverse;
}

.date-separator,
.unread-separator {
  @apply flex items-center gap-4 my-6;
}

.date-line,
.unread-line {
  @apply flex-1 h-px;
}

.date-line {
  @apply bg-gray-200 dark:bg-gray-700;
}

.unread-line {
  @apply bg-purple-300 dark:bg-purple-600;
}

.date-text {
  @apply text-xs text-gray-500 dark:text-gray-400 px-3 font-medium;
}

.unread-text {
  @apply text-xs text-purple-600 dark:text-purple-400 px-3 font-semibold;
}

.message-group-container {
  @apply flex gap-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-lg;
}

.message-avatar {
  @apply flex-shrink-0 w-10 h-10;
}

.avatar-image {
  @apply w-10 h-10 rounded-full object-cover;
}

.message-avatar-spacer {
  @apply w-10 flex-shrink-0;
}

.messages-content {
  @apply flex-1 min-w-0;
}

.message-header {
  @apply flex items-baseline gap-2 mb-1;
}

.message-username {
  @apply text-sm font-semibold text-gray-900 dark:text-white;
}

.message-timestamp {
  @apply text-xs text-gray-500 dark:text-gray-400;
}

.message-item {
  @apply relative mb-1 group;
}

.message-content {
  @apply inline-block max-w-[85%] sm:max-w-[70%] lg:max-w-[60%];
}

.message-text {
  @apply text-sm text-gray-900 dark:text-white break-words whitespace-pre-wrap;
}

.message-text.deleted {
  @apply italic text-gray-500 dark:text-gray-400;
}

.edited-indicator {
  @apply text-xs text-gray-400 dark:text-gray-500 italic ml-2;
}

.message-actions {
  @apply absolute -top-8 left-0 flex items-center gap-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-1;
}

.action-btn {
  @apply p-1.5 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors;
}

@media (max-width: 640px) {
  .message-content {
    @apply max-w-[90%];
  }
}
</style>
