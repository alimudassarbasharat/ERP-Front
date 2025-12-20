<template>
  <div class="voice-recorder">
    <!-- Recording Button -->
    <button 
      v-if="!isRecording && !hasRecording" 
      @click="startRecording" 
      class="voice-btn-bottom"
      title="Record voice message"
    >
      <Mic :size="16" />
    </button>

    <!-- Recording In Progress -->
    <div v-if="isRecording" class="recording-active">
      <div class="pulse-dot"></div>
      <span class="recording-time">{{ formattedTime }}</span>
      <button @click="stopRecording" class="btn-stop-mini">
        <Square :size="12" />
      </button>
      <button @click="cancelRecording" class="btn-cancel-mini">
        <X :size="12" />
      </button>
    </div>

    <!-- Recording Complete Indicator (hidden, preview shown in parent) -->
    <button 
      v-if="hasRecording && !isRecording" 
      class="voice-hidden-btn"
      style="display: none;"
    >
      <Mic :size="14" />
    </button>
  </div>
</template>

<script>
import { ref, computed, onUnmounted } from 'vue'
import { Mic, Square, X, Send, Trash2 } from 'lucide-vue-next'

export default {
  name: 'VoiceRecorder',
  components: {
    Mic, Square, X, Send, Trash2
  },
  emits: ['recording-complete', 'recording-ready', 'recording-removed'],
  setup(props, { emit }) {
    const isRecording = ref(false)
    const audioBlob = ref(null)
    const mediaRecorder = ref(null)
    const audioChunks = ref([])
    const recordingStartTime = ref(null)
    const recordingDuration = ref(0)
    const timerInterval = ref(null)
    const finalDuration = ref(0)

    const hasRecording = computed(() => audioBlob.value !== null)

    const formattedTime = computed(() => {
      const minutes = Math.floor(recordingDuration.value / 60)
      const seconds = recordingDuration.value % 60
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    })

    const formattedDuration = computed(() => {
      const minutes = Math.floor(finalDuration.value / 60)
      const seconds = finalDuration.value % 60
      return `${minutes}:${String(seconds).padStart(2, '0')}`
    })

    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        
        // Use best available codec
        const options = { mimeType: 'audio/webm;codecs=opus' }
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          options.mimeType = 'audio/webm'
        }
        
        mediaRecorder.value = new MediaRecorder(stream, options)
        audioChunks.value = []

        mediaRecorder.value.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.value.push(event.data)
          }
        }

        mediaRecorder.value.onstop = () => {
          const blob = new Blob(audioChunks.value, { type: 'audio/webm' })
          audioBlob.value = blob
          finalDuration.value = recordingDuration.value
          
          // Stop all tracks
          stream.getTracks().forEach(track => track.stop())
          
          if (timerInterval.value) {
            clearInterval(timerInterval.value)
          }

          // Emit recording data to parent
          const file = new File([blob], `voice-${Date.now()}.webm`, {
            type: 'audio/webm'
          })
          emit('recording-ready', {
            file,
            duration: finalDuration.value
          })
        }

        mediaRecorder.value.start()
        isRecording.value = true
        recordingStartTime.value = Date.now()
        recordingDuration.value = 0

        // Update timer every second
        timerInterval.value = setInterval(() => {
          recordingDuration.value = Math.floor((Date.now() - recordingStartTime.value) / 1000)
        }, 1000)

      } catch (error) {
        console.error('Error accessing microphone:', error)
        alert('Could not access microphone. Please ensure microphone permissions are granted.')
      }
    }

    const stopRecording = () => {
      if (mediaRecorder.value && isRecording.value) {
        mediaRecorder.value.stop()
        isRecording.value = false
      }
    }

    const cancelRecording = () => {
      if (mediaRecorder.value && isRecording.value) {
        // Stop recording without saving
        isRecording.value = false
        audioBlob.value = null
        audioChunks.value = []
        
        // Stop the media stream tracks
        if (mediaRecorder.value.stream) {
          mediaRecorder.value.stream.getTracks().forEach(track => track.stop())
        }
      }
      
      if (timerInterval.value) {
        clearInterval(timerInterval.value)
        timerInterval.value = null
      }
      
      // Reset duration
      recordingDuration.value = 0
      finalDuration.value = 0
    }

    const deleteRecording = () => {
      audioBlob.value = null
      finalDuration.value = 0
      recordingDuration.value = 0
      emit('recording-removed')
    }

    const getRecordingData = () => {
      if (audioBlob.value) {
        return {
          file: new File([audioBlob.value], `voice-${Date.now()}.webm`, {
            type: 'audio/webm'
          }),
          duration: finalDuration.value
        }
      }
      return null
    }

    onUnmounted(() => {
      if (timerInterval.value) {
        clearInterval(timerInterval.value)
      }
    })

    return {
      isRecording,
      hasRecording,
      formattedTime,
      formattedDuration,
      startRecording,
      stopRecording,
      cancelRecording,
      deleteRecording,
      getRecordingData
    }
  }
}
</script>

<style scoped>
.voice-recorder {
  display: inline-flex;
  align-items: center;
}

.voice-btn-inline {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background: transparent;
  color: #64748b;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.voice-btn-inline:hover {
  background: #f1f5f9;
  color: #8b5cf6;
}

.voice-btn-inline:active {
  transform: scale(0.95);
}

.voice-btn-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  background: transparent;
  color: #64748b;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.voice-btn-bottom:hover {
  background: #e2e8f0;
  color: #8b5cf6;
  transform: scale(1.05);
}

.voice-btn-bottom:active {
  transform: scale(0.95);
}

.voice-btn-modern {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: transparent;
  color: #64748b;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.voice-btn-modern:hover {
  background: #ffffff;
  color: #8b5cf6;
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.voice-btn-modern:active {
  transform: scale(0.95);
}

/* Legacy support */
.voice-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background: transparent;
  color: #64748b;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.voice-btn:hover {
  background: #f8fafc;
  border-color: #8b5cf6;
  color: #8b5cf6;
  transform: scale(1.05);
}

.recording-active {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border-radius: 10px;
  border: 2px solid #fca5a5;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.15);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
  animation: pulseRing 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.3);
  }
}

@keyframes pulseRing {
  0% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
  }
}

.recording-time {
  font-size: 0.8125rem;
  font-weight: 700;
  color: #dc2626;
  font-family: monospace;
  min-width: 48px;
  text-align: center;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
}

.btn-stop-mini,
.btn-cancel-mini {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  cursor: pointer;
  border-radius: 7px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-stop-mini {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
}

.btn-stop-mini:hover {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(220, 38, 38, 0.3);
}

.btn-stop-mini:active {
  transform: translateY(0);
}

.btn-cancel-mini {
  background: white;
  color: #6b7280;
}

.btn-cancel-mini:hover {
  background: #f3f4f6;
  color: #374151;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}

.btn-cancel-mini:active {
  transform: translateY(0);
}

.voice-ready-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(139, 92, 246, 0.25);
}

.voice-ready-btn:hover {
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.35);
}

.voice-ready-btn:active {
  transform: translateY(0);
}

.mic-icon-filled {
  color: white;
}

.recording-duration {
  color: white;
}

.remove-icon {
  color: rgba(255, 255, 255, 0.8);
  margin-left: 0.25rem;
}

.voice-ready-btn:hover .remove-icon {
  color: white;
}
</style>

