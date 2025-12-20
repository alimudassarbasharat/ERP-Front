<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Upload File</h3>
        <button @click="$emit('close')" class="close-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="modal-body">
        <div class="upload-area" @drop="handleDrop" @dragover.prevent @dragenter.prevent>
          <div class="upload-content">
            <i class="fas fa-cloud-upload-alt"></i>
            <h4>Drop files here or click to browse</h4>
            <p>Maximum file size: 10MB</p>
            <input
              ref="fileInput"
              type="file"
              multiple
              @change="handleFileSelect"
              class="file-input"
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.zip,.rar"
            />
            <button @click="$refs.fileInput.click()" class="browse-btn">
              Browse Files
            </button>
          </div>
        </div>

        <div v-if="selectedFiles.length > 0" class="selected-files">
          <h4>Selected Files ({{ selectedFiles.length }})</h4>
          <div class="file-list">
            <div
              v-for="(file, index) in selectedFiles"
              :key="index"
              class="file-item"
            >
              <div class="file-info">
                <i :class="getFileIcon(file.type)"></i>
                <div class="file-details">
                  <span class="file-name">{{ file.name }}</span>
                  <span class="file-size">{{ formatFileSize(file.size) }}</span>
                </div>
              </div>
              <button @click="removeFile(index)" class="remove-file-btn">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" @click="$emit('close')" class="btn-secondary">
            Cancel
          </button>
          <button 
            @click="uploadFiles" 
            :disabled="selectedFiles.length === 0 || uploading"
            class="btn-primary"
          >
            <i v-if="uploading" class="fas fa-spinner fa-spin"></i>
            {{ uploading ? 'Uploading...' : 'Upload Files' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

export default {
  name: 'FileUploadModal',
  emits: ['close', 'uploaded'],
  setup(props, { emit }) {
    const toast = useToast()
    
    const selectedFiles = ref([])
    const uploading = ref(false)

    const handleFileSelect = (event) => {
      const files = Array.from(event.target.files)
      addFiles(files)
    }

    const handleDrop = (event) => {
      const files = Array.from(event.dataTransfer.files)
      addFiles(files)
    }

    const addFiles = (files) => {
      const validFiles = files.filter(file => {
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
          toast.error(`${file.name} is too large. Maximum size is 10MB.`)
          return false
        }
        return true
      })
      
      selectedFiles.value.push(...validFiles)
    }

    const removeFile = (index) => {
      selectedFiles.value.splice(index, 1)
    }

    const getFileIcon = (mimeType) => {
      if (mimeType.startsWith('image/')) return 'fas fa-image'
      if (mimeType.startsWith('video/')) return 'fas fa-video'
      if (mimeType.startsWith('audio/')) return 'fas fa-music'
      if (mimeType.includes('pdf')) return 'fas fa-file-pdf'
      if (mimeType.includes('word')) return 'fas fa-file-word'
      if (mimeType.includes('text')) return 'fas fa-file-alt'
      if (mimeType.includes('zip') || mimeType.includes('rar')) return 'fas fa-file-archive'
      return 'fas fa-file'
    }

    const formatFileSize = (bytes) => {
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      if (bytes === 0) return '0 Bytes'
      const i = Math.floor(Math.log(bytes) / Math.log(1024))
      return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
    }

    const uploadFiles = async () => {
      if (selectedFiles.value.length === 0) return
      
      uploading.value = true
      try {
        // Simulate file upload - in real implementation, you would upload to server
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        const uploadedFiles = selectedFiles.value.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file) // In real app, this would be server URL
        }))
        
        toast.success('Files uploaded successfully')
        emit('uploaded', uploadedFiles)
        emit('close')
      } catch (error) {
        console.error('Failed to upload files:', error)
        toast.error('Failed to upload files')
      } finally {
        uploading.value = false
      }
    }

    return {
      selectedFiles,
      uploading,
      handleFileSelect,
      handleDrop,
      removeFile,
      getFileIcon,
      formatFileSize,
      uploadFiles
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.close-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.close-btn:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.modal-body {
  padding: 1.5rem;
}

.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  transition: border-color 0.2s;
  cursor: pointer;
}

.upload-area:hover {
  border-color: #3b82f6;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.upload-content i {
  font-size: 3rem;
  color: #6b7280;
}

.upload-content h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.upload-content p {
  color: #6b7280;
  margin: 0;
}

.file-input {
  display: none;
}

.browse-btn {
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.browse-btn:hover {
  background: #2563eb;
}

.selected-files {
  margin-top: 1.5rem;
}

.selected-files h4 {
  margin-bottom: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.file-info i {
  font-size: 1.25rem;
  color: #6b7280;
}

.file-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.file-name {
  font-weight: 500;
  color: #111827;
  font-size: 0.875rem;
}

.file-size {
  font-size: 0.75rem;
  color: #6b7280;
}

.remove-file-btn {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s;
}

.remove-file-btn:hover {
  background-color: #fef2f2;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-primary:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.btn-secondary {
  padding: 0.75rem 1.5rem;
  background: white;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}
</style> 