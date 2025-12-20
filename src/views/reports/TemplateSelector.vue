<template>
  <div class="template-selector">
    <!-- Template Selection Modal -->
    <el-dialog
      v-model="isVisible"
      :title="sectionConfig.title"
      width="90%"
      :before-close="handleClose"
      class="template-dialog"
      destroy-on-close
    >
      <div class="template-grid">
        <!-- Templates List -->
        <div class="templates-sidebar">
          <div class="section-header">
            <div class="section-icon" :style="{ background: sectionConfig.gradient }">
              <component :is="sectionConfig.icon" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 class="text-xl font-light text-gray-900">{{ sectionConfig.title }}</h3>
              <p class="text-sm text-gray-500">Choose your preferred design</p>
            </div>
          </div>

          <div class="templates-list">
            <div
              v-for="template in templates"
              :key="template.id"
              @click="selectTemplate(template)"
              :class="[
                'template-card',
                selectedTemplate?.id === template.id ? 'selected' : ''
              ]"
            >
              <div class="template-preview-thumb">
                <div class="template-icon">{{ getTemplateIcon(template.id) }}</div>
                <div v-if="template.premium" class="premium-badge">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  Pro
                </div>
              </div>
              
              <div class="template-info">
                <h4 class="template-name">{{ template.name }}</h4>
                <p class="template-description">{{ template.description }}</p>
              </div>
              
              <div class="template-actions">
                <button 
                  @click.stop="previewTemplate(template)"
                  class="preview-btn"
                  :disabled="isLoading"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  Preview
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Preview Panel -->
        <div class="preview-panel">
          <div v-if="!selectedTemplate" class="no-preview">
            <div class="no-preview-icon">
              <svg class="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-600">Select a template to preview</h3>
            <p class="text-gray-500">Choose from the templates on the left to see a live preview</p>
          </div>

          <div v-else-if="isLoading" class="loading-preview">
            <div class="loading-spinner">
              <div class="spinner"></div>
            </div>
            <p class="text-gray-500">Loading preview...</p>
          </div>

          <div v-else class="pdf-preview">
            <div class="preview-header">
              <h4 class="preview-title">{{ selectedTemplate.name }} Preview</h4>
              <div class="preview-actions">
                <button @click="refreshPreview" class="refresh-btn">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                </button>
                <button @click="fullscreenPreview" class="fullscreen-btn">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="pdf-container">
              <iframe
                v-if="previewUrl"
                :src="previewUrl"
                class="pdf-iframe"
                @load="handlePreviewLoad"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <template #footer>
        <div class="dialog-footer">
          <div class="selected-info" v-if="selectedTemplate">
            <div class="selected-template">
              <span class="selected-icon">{{ getTemplateIcon(selectedTemplate.id) }}</span>
              <div>
                <div class="selected-name">{{ selectedTemplate.name }}</div>
                <div class="selected-desc">{{ selectedTemplate.description }}</div>
              </div>
            </div>
          </div>
          
          <div class="footer-actions">
            <el-button @click="handleClose" size="large">Cancel</el-button>
            <el-button 
              type="primary" 
              @click="confirmSelection" 
              size="large"
              :disabled="!selectedTemplate"
              class="confirm-btn"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Use This Template
            </el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

// Props
const toast = useToast()
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  sectionType: {
    type: String,
    required: true
  }
})

// Emits
const emit = defineEmits(['update:visible', 'template-selected'])

// Reactive data
const isVisible = ref(props.visible)
const templates = ref([])
const selectedTemplate = ref(null)
const previewUrl = ref('')
const isLoading = ref(false)

// Section configurations
const sectionConfigs = {
  'character': {
    title: 'Character Certificate Templates',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    icon: 'DocumentCheckIcon',
    endpoint: '/character-certificate'
  },
  'challan': {
    title: 'Fee Challan Templates', 
    gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    icon: 'CreditCardIcon',
    endpoint: '/students/fee-challan-templates'
  },
  'idCard': {
    title: 'ID Card Templates',
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    icon: 'IdentificationIcon',
    endpoint: '/id-card'
  },
  'attendance': {
    title: 'Attendance Report Templates',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    icon: 'CalendarIcon',
    endpoint: '/attendance-reports'
  },
  'progress': {
    title: 'Progress Report Templates',
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
    icon: 'ChartBarIcon',
    endpoint: '/students/report-card-templates'
  },
  'leaving': {
    title: 'Leaving Certificate Templates',
    gradient: 'linear-gradient(135deg, #94a3b8, #4b5563)',
    icon: 'DocumentIcon',
    endpoint: '/leaving-certificates'
  }
}

// Computed
const sectionConfig = computed(() => sectionConfigs[props.sectionType] || sectionConfigs.character)

// Template icons mapping
const templateIcons = {
  'modern-gradient': '🎨',
  'classic-formal': '📜', 
  'royal-premium': '👑',
  'minimal-clean': '✨',
  'default': '💳',
  'modern': '🌈',
  'classic': '📋',
  'corporate': '📄',
  'elegant': '⭐',
  'minimal': '📝',
  'traditional': '🏛️',
  'professional': '💼',
  'school': '🏫',
  'university': '🎓',
  'modern-3d': '🎯',
  'corporate-sleek': '💼',
  'student-vibrant': '🌟',
  'classic-photo': '📸'
}

// Methods
const getTemplateIcon = (templateId) => {
  return templateIcons[templateId] || '📄'
}

const loadTemplates = async () => {
  try {
    isLoading.value = true
    const response = await axios.get(`${sectionConfig.value.endpoint}/templates`)
    
    if (response.data.success || response.data.result) {
      templates.value = response.data.templates || response.data.result || []
    }
  } catch (error) {
    console.error('Error loading templates:', error)
    toast.error('Failed to load templates')
  } finally {
    isLoading.value = false
  }
}

const selectTemplate = (template) => {
  selectedTemplate.value = template
  previewTemplate(template)
}

const previewTemplate = async (template) => {
  try {
    isLoading.value = true
    previewUrl.value = `${axios.defaults.baseURL}${sectionConfig.value.endpoint}/preview?template=${template.id}`
  } catch (error) {
    console.error('Error loading preview:', error)
    toast.error('Failed to load preview')
  } finally {
    isLoading.value = false
  }
}

const refreshPreview = () => {
  if (selectedTemplate.value) {
    previewTemplate(selectedTemplate.value)
  }
}

const fullscreenPreview = () => {
  if (previewUrl.value) {
    window.open(previewUrl.value, '_blank')
  }
}

const handlePreviewLoad = () => {
  isLoading.value = false
}

const confirmSelection = () => {
  if (selectedTemplate.value) {
    emit('template-selected', selectedTemplate.value)
    handleClose()
  }
}

const handleClose = () => {
  isVisible.value = false
  emit('update:visible', false)
  selectedTemplate.value = null
  previewUrl.value = ''
}

// Watchers
watch(() => props.visible, (newVal) => {
  isVisible.value = newVal
  if (newVal) {
    loadTemplates()
  }
})

watch(() => props.sectionType, () => {
  if (isVisible.value) {
    loadTemplates()
  }
})
</script>

<style scoped>
.template-dialog {
  border-radius: 20px;
  overflow: hidden;
}

.template-grid {
  display: grid;
  grid-template-columns: 400px 1fr;
  height: 70vh;
  gap: 0;
}

.templates-sidebar {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
}

.section-header {
  padding: 24px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 16px;
}

.section-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.templates-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.template-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.template-card:hover {
  border-color: #e2e8f0;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.template-card.selected {
  border-color: #3b82f6;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
}

.template-preview-thumb {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.template-icon {
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
  border-radius: 8px;
}

.premium-badge {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: #ffffff;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

.template-info {
  margin-bottom: 12px;
}

.template-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
}

.template-description {
  font-size: 12px;
  color: #94a3b8;
  line-height: 1.4;
}

.template-actions {
  display: flex;
  justify-content: end;
}

.preview-btn {
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  color: #1e293b;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.preview-btn:hover {
  background: #e5e7eb;
  border-color: #94a3b8;
}

.preview-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.preview-panel {
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

.no-preview {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
}

.no-preview-icon {
  margin-bottom: 16px;
}

.loading-preview {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.loading-spinner {
  width: 48px;
  height: 48px;
}

.spinner {
  width: 100%;
  height: 100%;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.pdf-preview {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.preview-header {
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.preview-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.preview-actions {
  display: flex;
  gap: 8px;
}

.refresh-btn, .fullscreen-btn {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.refresh-btn:hover, .fullscreen-btn:hover {
  background: #f3f4f6;
  border-color: #94a3b8;
  color: #1e293b;
}

.pdf-container {
  flex: 1;
  padding: 16px;
}

.pdf-iframe {
  width: 100%;
  height: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
}

.selected-info {
  flex: 1;
}

.selected-template {
  display: flex;
  align-items: center;
  gap: 12px;
}

.selected-icon {
  font-size: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-radius: 8px;
}

.selected-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.selected-desc {
  font-size: 12px;
  color: #94a3b8;
}

.footer-actions {
  display: flex;
  gap: 12px;
}

.confirm-btn {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
  border: none !important;
}
</style> 