<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">
          <Plus :size="24" />
          Create New Ticket
        </h2>
        <button @click="$emit('close')" class="btn-close">
          <X :size="20" />
        </button>
      </div>

      <!-- Modal Body -->
      <div class="modal-body">
        <form @submit.prevent="handleSubmit">
          <!-- Title -->
          <div class="form-group">
            <label class="form-label">
              <FileText :size="16" />
              Title *
            </label>
            <input
              v-model="form.title"
              type="text"
              class="form-input"
              placeholder="Enter ticket title..."
              required
            />
          </div>

          <!-- Description -->
          <div class="form-group">
            <label class="form-label">
              <AlignLeft :size="16" />
              Description *
            </label>
            <textarea
              v-model="form.description"
              class="form-textarea"
              rows="5"
              placeholder="Describe the issue in detail..."
              required
            ></textarea>
          </div>

          <!-- Priority & Category Row -->
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">
                <Flag :size="16" />
                Priority *
              </label>
              <select v-model="form.priority" class="form-select" required>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">
                <Tag :size="16" />
                Category *
              </label>
              <select v-model="form.category" class="form-select" required>
                <option value="Technical">Technical</option>
                <option value="Payment">Payment</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Bug">Bug</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <!-- Assignee -->
          <div class="form-group">
            <label class="form-label">
              <User :size="16" />
              Assign To
            </label>
            <select v-model="form.assignee" class="form-select">
              <option value="">Select assignee...</option>
              <option value="John Doe">John Doe</option>
              <option value="Sarah Smith">Sarah Smith</option>
              <option value="Mike Johnson">Mike Johnson</option>
              <option value="Emily Davis">Emily Davis</option>
            </select>
          </div>

          <!-- Attachments -->
          <div class="form-group">
            <label class="form-label">
              <Paperclip :size="16" />
              Attachments
            </label>
            <div class="file-upload-area">
              <input
                type="file"
                id="file-upload"
                class="file-input"
                multiple
                @change="handleFileUpload"
              />
              <label for="file-upload" class="file-upload-label">
                <Upload :size="24" />
                <span>Click to upload or drag and drop</span>
                <span class="file-hint">PNG, JPG, PDF up to 10MB</span>
              </label>
            </div>
            <div v-if="form.files.length > 0" class="uploaded-files">
              <div v-for="(file, index) in form.files" :key="index" class="file-item">
                <File :size="16" />
                <span>{{ file.name }}</span>
                <button type="button" @click="removeFile(index)" class="btn-remove-file">
                  <X :size="14" />
                </button>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" @click="$emit('close')" class="btn-cancel">
              Cancel
            </button>
            <button type="submit" class="btn-submit" :disabled="!isFormValid || submitting">
              <Send :size="18" v-if="!submitting" />
              <Clock :size="18" class="animate-spin" v-else />
              {{ submitting ? 'Creating...' : 'Create Ticket' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import ticketService from '@/services/ticketService'
import {
  Plus,
  X,
  FileText,
  AlignLeft,
  Flag,
  Tag,
  User,
  Paperclip,
  Upload,
  File,
  Send
} from 'lucide-vue-next'

export default {
  name: 'CreateTicketModal',
  components: {
    Plus,
    X,
    FileText,
    AlignLeft,
    Flag,
    Tag,
    User,
    Paperclip,
    Upload,
    File,
    Send
  },
  emits: ['close', 'created'],
  setup(props, { emit }) {
    const toast = useToast()
    const submitting = ref(false)
    
    const form = ref({
      workspace_id: 1, // Default workspace
      title: '',
      description: '',
      priority: 'medium',
      category: 'Technical',
      assignee_id: null,
      files: []
    })

    const isFormValid = computed(() => {
      return form.value.title.trim() !== '' && 
             form.value.description.trim() !== ''
    })

    const handleFileUpload = (event) => {
      const files = Array.from(event.target.files)
      form.value.files.push(...files)
    }

    const removeFile = (index) => {
      form.value.files.splice(index, 1)
    }

    const handleSubmit = async () => {
      if (!isFormValid.value || submitting.value) return

      try {
        submitting.value = true

        const ticketData = {
          workspace_id: form.value.workspace_id,
          title: form.value.title,
          description: form.value.description,
          priority: form.value.priority,
          category: form.value.category,
          assignee_id: form.value.assignee_id
        }

        const response = await ticketService.createTicket(ticketData)

        if (response.success) {
          // Upload attachments if any
          if (form.value.files.length > 0) {
            for (const file of form.value.files) {
              try {
                await ticketService.uploadAttachment(response.data.id, file)
              } catch (error) {
                console.error('Error uploading file:', error)
              }
            }
          }

          emit('created', response.data)
          toast.success('Ticket created successfully!')
        }
      } catch (error) {
        console.error('Error creating ticket:', error)
        toast.error('Failed to create ticket')
      } finally {
        submitting.value = false
      }
    }

    return {
      form,
      submitting,
      isFormValid,
      handleFileUpload,
      removeFile,
      handleSubmit
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
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-container {
  background: white;
  border-radius: 20px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.modal-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0;
}

.btn-close {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: none;
  background: white;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-close:hover {
  background: #fee2e2;
  color: #ef4444;
}

.modal-body {
  padding: 2rem;
  overflow-y: auto;
  max-height: calc(90vh - 140px);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.5rem;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  font-family: inherit;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.file-upload-area {
  position: relative;
}

.file-input {
  display: none;
}

.file-upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f8fafc;
}

.file-upload-label:hover {
  border-color: #8b5cf6;
  background: #f3e8ff;
}

.file-upload-label span {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.file-hint {
  font-size: 0.75rem !important;
  color: #94a3b8 !important;
}

.uploaded-files {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.file-item span {
  flex: 1;
  font-size: 0.875rem;
  color: #475569;
}

.btn-remove-file {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: none;
  background: #fee2e2;
  color: #ef4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-remove-file:hover {
  background: #fecaca;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.btn-cancel,
.btn-submit {
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-cancel {
  background: #f1f5f9;
  color: #64748b;
}

.btn-cancel:hover {
  background: #e2e8f0;
}

.btn-submit {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 1rem;
  }

  .modal-header,
  .modal-body {
    padding: 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>

