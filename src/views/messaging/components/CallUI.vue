<template>
  <div
    v-if="callState"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    @click.self="handleBackdropClick"
  >
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 overflow-hidden">
      <!-- Incoming Call -->
      <div v-if="callState === 'incoming'" class="p-8 text-center">
        <div class="mb-6">
          <img
            :src="getUserAvatar(otherUser)"
            :alt="otherUser?.name || 'User'"
            class="w-32 h-32 rounded-full object-cover mx-auto border-4 border-purple-500"
          />
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {{ otherUser?.name || 'Unknown User' }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-8">
          {{ callType === 'video' ? 'Incoming video call' : 'Incoming audio call' }}
        </p>
        <div class="flex items-center justify-center gap-4">
          <button
            @click="$emit('reject')"
            class="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
            aria-label="Reject call"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <button
            @click="$emit('answer')"
            class="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
            aria-label="Answer call"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Connecting -->
      <div v-else-if="callState === 'connecting'" class="p-8 text-center">
        <div class="mb-6">
          <div class="w-32 h-32 rounded-full bg-purple-100 dark:bg-purple-900 mx-auto flex items-center justify-center">
            <div class="animate-pulse">
              <svg class="w-16 h-16 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </div>
          </div>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Connecting...
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-8">
          Waiting for {{ otherUser?.name || 'user' }} to answer
        </p>
        <button
          @click="$emit('end')"
          class="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors mx-auto"
          aria-label="End call"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Active Call -->
      <div v-else-if="callState === 'active'" class="relative">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 bg-gray-900">
          <!-- Remote Video -->
          <div class="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
            <video
              v-if="remoteStream"
              ref="remoteVideo"
              autoplay
              playsinline
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <div class="text-center">
                <img
                  :src="getUserAvatar(otherUser)"
                  :alt="otherUser?.name || 'User'"
                  class="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
                <p class="text-white">{{ otherUser?.name || 'User' }}</p>
              </div>
            </div>
          </div>

          <!-- Local Video -->
          <div
            v-if="callType === 'video'"
            class="relative aspect-video bg-gray-800 rounded-lg overflow-hidden"
          >
            <video
              v-if="localStream"
              ref="localVideo"
              autoplay
              playsinline
              muted
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Call Controls -->
        <div class="bg-white dark:bg-gray-800 p-6">
          <div class="flex items-center justify-center gap-4">
            <button
              @click="toggleMute"
              class="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              :class="isMuted ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'"
              aria-label="Toggle mute"
            >
              <svg v-if="isMuted" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M17 10l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
              </svg>
              <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
              </svg>
            </button>

            <button
              v-if="callType === 'video'"
              @click="toggleVideo"
              class="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              :class="isVideoOff ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'"
              aria-label="Toggle video"
            >
              <svg v-if="isVideoOff" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
              </svg>
              <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
            </button>

            <button
              @click="$emit('end')"
              class="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
              aria-label="End call"
            >
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  callState: {
    type: String,
    default: null
  },
  callType: {
    type: String,
    default: null
  },
  otherUser: {
    type: Object,
    default: null
  },
  localStream: {
    type: Object,
    default: null
  },
  remoteStream: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['answer', 'reject', 'end'])

const localVideo = ref(null)
const remoteVideo = ref(null)
const isMuted = ref(false)
const isVideoOff = ref(false)

watch(() => props.localStream, (stream) => {
  if (stream && localVideo.value) {
    localVideo.value.srcObject = stream
  }
}, { immediate: true })

watch(() => props.remoteStream, (stream) => {
  if (stream && remoteVideo.value) {
    remoteVideo.value.srcObject = stream
  }
}, { immediate: true })

const toggleMute = () => {
  if (props.localStream) {
    props.localStream.getAudioTracks().forEach(track => {
      track.enabled = isMuted.value
    })
    isMuted.value = !isMuted.value
  }
}

const toggleVideo = () => {
  if (props.localStream) {
    props.localStream.getVideoTracks().forEach(track => {
      track.enabled = isVideoOff.value
    })
    isVideoOff.value = !isVideoOff.value
  }
}

const handleBackdropClick = () => {
  if (props.callState === 'incoming' || props.callState === 'connecting') {
    emit('reject')
  }
}

const getUserAvatar = (user) => {
  return user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=6366f1&color=fff`
}

onMounted(() => {
  if (props.localStream && localVideo.value) {
    localVideo.value.srcObject = props.localStream
  }
  if (props.remoteStream && remoteVideo.value) {
    remoteVideo.value.srcObject = props.remoteStream
  }
})
</script>
