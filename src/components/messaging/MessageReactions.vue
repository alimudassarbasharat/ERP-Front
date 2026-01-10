<template>
  <div class="message-reactions mt-2 flex flex-wrap gap-1">
    <button
      v-for="reaction in reactionGroups"
      :key="reaction.emoji"
      @click="toggleReaction(reaction.emoji)"
      class="reaction-button"
      :class="{ 'has-user-reaction': reaction.hasUserReaction }"
      :aria-label="`${reaction.emoji} ${reaction.count}`"
    >
      <span class="reaction-emoji">{{ reaction.emoji }}</span>
      <span class="reaction-count">{{ reaction.count }}</span>
    </button>
    <button
      @click="$emit('add-reaction')"
      class="reaction-add-button"
      aria-label="Add reaction"
    >
      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  reactions: {
    type: Array,
    default: () => []
  },
  messageId: {
    type: [Number, String],
    required: true
  }
})

const emit = defineEmits(['add-reaction', 'remove-reaction'])

const authStore = useAuthStore()

const reactionGroups = computed(() => {
  const groups = {}
  
  props.reactions.forEach(reaction => {
    if (!groups[reaction.emoji]) {
      groups[reaction.emoji] = {
        emoji: reaction.emoji,
        count: 0,
        hasUserReaction: false
      }
    }
    groups[reaction.emoji].count++
    if (reaction.user_id === authStore.user?.id) {
      groups[reaction.emoji].hasUserReaction = true
    }
  })
  
  return Object.values(groups)
})

const toggleReaction = (emoji) => {
  const reaction = reactionGroups.value.find(r => r.emoji === emoji)
  if (reaction?.hasUserReaction) {
    emit('remove-reaction', props.messageId, emoji)
  } else {
    emit('add-reaction', props.messageId, emoji)
  }
}
</script>

<style scoped>
.message-reactions {
  @apply flex flex-wrap gap-1;
}

.reaction-button {
  @apply flex items-center gap-1 px-2 py-1 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors;
}

.reaction-button.has-user-reaction {
  @apply bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600;
}

.reaction-emoji {
  @apply text-sm;
}

.reaction-count {
  @apply text-xs font-medium text-gray-700 dark:text-gray-300;
}

.reaction-add-button {
  @apply flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors;
}
</style>
