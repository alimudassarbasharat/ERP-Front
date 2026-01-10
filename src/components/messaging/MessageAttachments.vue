<template>
  <div class="message-attachments mt-2 space-y-2">
    <!-- Image Grid -->
    <div v-if="imageAttachments.length > 0" class="image-grid" :class="gridClass">
      <div
        v-for="attachment in imageAttachments"
        :key="attachment.id"
        class="image-attachment"
        @click="openImageViewer(attachment.file_url)"
      >
        <img
          :src="attachment.file_url"
          :alt="attachment.original_name"
          class="attachment-image"
          loading="lazy"
        />
      </div>
    </div>

    <!-- Video -->
    <div v-for="attachment in videoAttachments" :key="attachment.id" class="video-attachment">
      <video
        :src="attachment.file_url"
        controls
        class="attachment-video"
        preload="metadata"
      />
      <p class="attachment-name">{{ attachment.original_name }}</p>
    </div>

    <!-- Audio -->
    <div v-for="attachment in audioAttachments" :key="attachment.id" class="audio-attachment">
      <div class="audio-card">
        <div class="audio-icon">🎵</div>
        <div class="audio-info">
          <p class="audio-name">{{ attachment.original_name }}</p>
          <audio
            :src="attachment.file_url"
            controls
            class="audio-player"
          />
        </div>
      </div>
    </div>

    <!-- Documents -->
    <div v-for="attachment in documentAttachments" :key="attachment.id" class="document-attachment">
      <a
        :href="attachment.file_url"
        target="_blank"
        rel="noopener noreferrer"
        class="document-card"
      >
        <div class="document-icon">
          {{ getFileIcon(attachment.mime_type) }}
        </div>
        <div class="document-info">
          <p class="document-name">{{ attachment.original_name }}</p>
          <p class="document-size">{{ formatFileSize(attachment.file_size) }}</p>
        </div>
        <svg class="document-download-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatFileSize, getFileIcon } from '@/utils/mediaHelper'

const props = defineProps({
  attachments: {
    type: Array,
    required: true
  }
})

const imageAttachments = computed(() => 
  props.attachments.filter(a => a.mime_type?.startsWith('image/'))
)

const videoAttachments = computed(() => 
  props.attachments.filter(a => a.mime_type?.startsWith('video/'))
)

const audioAttachments = computed(() => 
  props.attachments.filter(a => a.mime_type?.startsWith('audio/'))
)

const documentAttachments = computed(() => 
  props.attachments.filter(a => 
    !a.mime_type?.startsWith('image/') &&
    !a.mime_type?.startsWith('video/') &&
    !a.mime_type?.startsWith('audio/')
  )
)

const gridClass = computed(() => {
  const count = imageAttachments.value.length
  if (count === 1) return 'grid-cols-1'
  if (count === 2) return 'grid-cols-2'
  return 'grid-cols-2 sm:grid-cols-3'
})

const openImageViewer = (url) => {
  window.open(url, '_blank')
}
</script>

<style scoped>
.image-grid {
  @apply grid gap-2;
}

.image-attachment {
  @apply relative cursor-pointer rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800;
}

.attachment-image {
  @apply w-full h-auto max-h-96 object-cover;
}

.video-attachment {
  @apply rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800;
}

.attachment-video {
  @apply w-full max-h-96;
}

.attachment-name {
  @apply text-xs text-gray-600 dark:text-gray-400 px-2 py-1;
}

.audio-card {
  @apply flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg;
}

.audio-icon {
  @apply text-2xl;
}

.audio-info {
  @apply flex-1 min-w-0;
}

.audio-name {
  @apply text-sm font-medium text-gray-900 dark:text-white mb-1 truncate;
}

.audio-player {
  @apply w-full;
}

.document-card {
  @apply flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors;
}

.document-icon {
  @apply text-2xl flex-shrink-0;
}

.document-info {
  @apply flex-1 min-w-0;
}

.document-name {
  @apply text-sm font-medium text-gray-900 dark:text-white truncate;
}

.document-size {
  @apply text-xs text-gray-500 dark:text-gray-400;
}

.document-download-icon {
  @apply w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0;
}
</style>
