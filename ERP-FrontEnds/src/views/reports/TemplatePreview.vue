<template>
  <div class="template-preview-page">
    <!-- Modern Header -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/reports" class="breadcrumb-link">
            <ArrowLeftIcon class="w-4 h-4" />
            Reports
          </router-link>
          <ChevronRightIcon class="w-4 h-4 text-gray-500" />
          <span class="breadcrumb-current">{{ sectionConfig.title }}</span>
        </div>
        
        <div class="header-main">
          <div class="section-icon-large" :style="{ background: sectionConfig.gradient }">
            <span class="section-emoji">{{ sectionConfig.emoji }}</span>
          </div>
          <div class="header-text">
            <h1 class="page-title">{{ sectionConfig.title }}</h1>
            <p class="page-subtitle">Choose your preferred template design for generating documents</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Template Grid Section -->
    <div class="templates-section">
      <div class="templates-container">
        <!-- Filter & Search -->
        <div class="filters-bar">
          <div class="search-box">
            <MagnifyingGlassIcon class="search-icon" />
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search templates..." 
              class="search-input"
            />
          </div>
          
          <div class="filter-tabs">
            <button 
              @click="activeFilter = 'all'"
              :class="['filter-tab', activeFilter === 'all' ? 'active' : '']"
            >
              All Templates
            </button>
            <button 
              @click="activeFilter = 'free'"
              :class="['filter-tab', activeFilter === 'free' ? 'active' : '']"
            >
              Free
            </button>
            <button 
              @click="activeFilter = 'premium'"
              :class="['filter-tab', activeFilter === 'premium' ? 'active' : '']"
            >
              <StarIcon class="w-4 h-4" />
              Premium
            </button>
          </div>
        </div>

        <!-- Templates Grid -->
        <div class="templates-grid">
          <div
            v-for="template in filteredTemplates"
            :key="template.id"
            @click="selectTemplate(template)"
            :class="[
              'template-card',
              selectedTemplate?.id === template.id ? 'selected' : '',
              template.premium ? 'premium' : ''
            ]"
          >
            <!-- Template Preview -->
            <div class="template-preview">
              <div class="preview-container">
                <iframe
                  v-if="template.preview_url"
                  :src="template.preview_url"
                  class="preview-iframe"
                  loading="lazy"
                ></iframe>
                <div v-else class="preview-placeholder">
                  <DocumentIcon class="w-12 h-12 text-gray-500" />
                  <span class="placeholder-text">{{ template.name }}</span>
                </div>
              </div>
              
              <!-- Premium Badge -->
              <div v-if="template.premium" class="premium-badge">
                <StarIcon class="w-3 h-3" />
                Premium
              </div>
              
              <!-- Selection Overlay -->
              <div v-if="selectedTemplate?.id === template.id" class="selection-overlay">
                <CheckCircleIcon class="w-8 h-8 text-white" />
              </div>
            </div>

            <!-- Template Info -->
            <div class="template-info">
              <h3 class="template-name">{{ template.name }}</h3>
              <p class="template-description">{{ template.description }}</p>
              
              <div class="template-actions">
                <button 
                  @click.stop="previewTemplate(template)"
                  class="action-btn preview-btn"
                >
                  <EyeIcon class="w-4 h-4" />
                  Preview
                </button>
                <button 
                  @click.stop="selectTemplate(template)"
                  class="action-btn select-btn"
                  :class="{ 'selected': selectedTemplate?.id === template.id }"
                >
                  <CheckIcon class="w-4 h-4" />
                  {{ selectedTemplate?.id === template.id ? 'Selected' : 'Select' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredTemplates.length === 0" class="empty-state">
          <div class="empty-icon">
            <DocumentIcon class="w-16 h-16 text-gray-500" />
          </div>
          <h3 class="empty-title">No templates found</h3>
          <p class="empty-description">Try adjusting your search or filters</p>
        </div>
      </div>
    </div>

    <!-- Fixed Bottom Actions -->
    <div class="bottom-actions">
      <div class="actions-container">
        <div class="selected-info" v-if="selectedTemplate">
          <div class="selected-preview">
            <div class="selected-icon">{{ getTemplateIcon(selectedTemplate.id) }}</div>
            <div class="selected-details">
              <div class="selected-name">{{ selectedTemplate.name }}</div>
              <div class="selected-description">{{ selectedTemplate.description }}</div>
            </div>
          </div>
        </div>
        
        <div class="action-buttons">
          <button @click="$router.back()" class="btn-secondary">
            Cancel
          </button>
          <button 
            @click="generateWithTemplate"
            :disabled="!selectedTemplate"
            class="btn-primary"
          >
            <DocumentArrowDownIcon class="w-5 h-5" />
            Generate Document
          </button>
        </div>
      </div>
    </div>

    <!-- Full Screen Preview Modal -->
    <div v-if="fullscreenPreview" class="fullscreen-modal" @click="closeFullscreen">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ previewingTemplate?.name }} - Full Preview</h3>
          <button @click="closeFullscreen" class="close-btn">
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>
        <div class="modal-body">
          <iframe
            v-if="previewingTemplate?.preview_url"
            :src="previewingTemplate.preview_url"
            class="fullscreen-iframe"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

  ArrowLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  StarIcon,
  DocumentIcon,
  EyeIcon,
  CheckIcon,
  CheckCircleIcon,
  DocumentArrowDownIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
const toast = useToast()

// Reactive data
const templates = ref([])
const selectedTemplate = ref(null)
const searchQuery = ref('')
const activeFilter = ref('all')
const isLoading = ref(false)
const fullscreenPreview = ref(false)
const previewingTemplate = ref(null)

// Section configurations
const sectionConfigs = {
  'character': {
    title: 'Character Certificate Templates',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    emoji: '📜',
    endpoint: '/character-certificate'
  },
  'challan': {
    title: 'Fee Challan Templates',
    gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    emoji: '💳',
    endpoint: '/students/fee-challan-templates'
  },
  'idCard': {
    title: 'ID Card Templates',
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    emoji: '🎯',
    endpoint: '/id-card'
  },
  'attendance': {
    title: 'Attendance Report Templates',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    emoji: '📊',
    endpoint: '/attendance-reports'
  },
  'progress': {
    title: 'Progress Report Templates',
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
    emoji: '🏆',
    endpoint: '/students/report-card-templates'
  },
  'leaving': {
    title: 'Leaving Certificate Templates',
    gradient: 'linear-gradient(135deg, #94a3b8, #4b5563)',
    emoji: '🏛️',
    endpoint: '/leaving-certificates'
  }
}

// Computed
const sectionType = computed(() => route.params.section || 'character')
const sectionConfig = computed(() => sectionConfigs[sectionType.value] || sectionConfigs.character)

const filteredTemplates = computed(() => {
  let filtered = templates.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(template => 
      template.name.toLowerCase().includes(query) ||
      template.description.toLowerCase().includes(query)
    )
  }

  // Filter by type
  if (activeFilter.value === 'free') {
    filtered = filtered.filter(template => !template.premium)
  } else if (activeFilter.value === 'premium') {
    filtered = filtered.filter(template => template.premium)
  }

  return filtered
})

// Template icons
const templateIcons = {
  'modern-gradient': '🎨',
  'classic-formal': '📜',
  'royal-premium': '👑',
  'minimal-clean': '✨',
  'professional-modern': '💼',
  'corporate-elite': '🏢',
  'school-classic': '🏫',
  'digital-receipt': '📱',
  'modern-3d': '🎯',
  'chart-analytics': '📊',
  'premium-detailed': '📋'
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
}

const previewTemplate = (template) => {
  previewingTemplate.value = template
  fullscreenPreview.value = true
}

const closeFullscreen = () => {
  fullscreenPreview.value = false
  previewingTemplate.value = null
}

const generateWithTemplate = () => {
  if (!selectedTemplate.value) return
  
  // Return to reports page with selected template
  router.push({
    name: 'StudentReports',
    query: {
      section: sectionType.value,
      template: selectedTemplate.value.id
    }
  })
}

// Lifecycle
onMounted(() => {
  loadTemplates()
})
</script>

<style scoped>
.template-preview-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding-bottom: 120px;
}

.page-header {
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  sticky: top;
  top: 0;
  z-index: 10;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  font-size: 14px;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: #1e293b;
}

.breadcrumb-current {
  color: #1e293b;
  font-weight: 500;
}

.header-main {
  display: flex;
  align-items: center;
  gap: 20px;
}

.section-icon-large {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.section-emoji {
  font-size: 28px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.page-subtitle {
  font-size: 16px;
  color: #94a3b8;
  margin: 4px 0 0 0;
}

.templates-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 24px;
}

.filters-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  gap: 20px;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #94a3b8;
}

.search-input {
  width: 100%;
  padding: 12px 12px 12px 44px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 14px;
  background: #ffffff;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.filter-tabs {
  display: flex;
  gap: 4px;
  background: #f1f5f9;
  padding: 4px;
  border-radius: 12px;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-tab.active {
  background: #ffffff;
  color: #1e293b;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.template-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.template-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.15);
  border-color: #e2e8f0;
}

.template-card.selected {
  border-color: #3b82f6;
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.25);
}

.template-card.premium {
  position: relative;
}

.template-preview {
  position: relative;
  height: 200px;
  background: #f8fafc;
  overflow: hidden;
}

.preview-container {
  width: 100%;
  height: 100%;
}

.preview-iframe {
  width: 100%;
  height: 100%;
  border: none;
  transform: scale(0.6);
  transform-origin: top left;
  width: 166.67%;
  height: 166.67%;
}

.preview-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 12px;
}

.placeholder-text {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.premium-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: #ffffff;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.selection-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(59, 130, 246, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
}

.template-info {
  padding: 20px;
}

.template-name {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.template-description {
  font-size: 14px;
  color: #94a3b8;
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.template-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.preview-btn {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  color: #64748b;
}

.preview-btn:hover {
  background: #e2e8f0;
  border-color: #94a3b8;
}

.select-btn {
  background: #3b82f6;
  border: 1px solid #3b82f6;
  color: #ffffff;
}

.select-btn:hover {
  background: #2563eb;
  border-color: #3b82f6;
}

.select-btn.selected {
  background: #10b981;
  border-color: #10b981;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  grid-column: 1 / -1;
}

.empty-icon {
  margin-bottom: 16px;
}

.empty-title {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.empty-description {
  font-size: 14px;
  color: #94a3b8;
  margin: 0;
}

.bottom-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
  padding: 20px;
  z-index: 20;
  box-shadow: 0 -4px 12px rgba(0,0,0,0.05);
}

.actions-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.selected-info {
  flex: 1;
}

.selected-preview {
  display: flex;
  align-items: center;
  gap: 12px;
}

.selected-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.selected-name {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.selected-description {
  font-size: 14px;
  color: #94a3b8;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.btn-secondary {
  padding: 12px 24px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background: #ffffff;
  color: #1e293b;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #f9fafb;
  border-color: #94a3b8;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: #ffffff;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #2563eb, #1e40af);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.fullscreen-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  width: 90vw;
  height: 90vh;
  max-width: 1200px;
  box-shadow: 0 25px 50px rgba(0,0,0,0.3);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.close-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: #f1f5f9;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.modal-body {
  height: calc(100% - 81px);
}

.fullscreen-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    padding: 16px;
  }
  
  .header-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .page-title {
    font-size: 24px;
  }
  
  .templates-section {
    padding: 20px 16px;
  }
  
  .filters-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
  
  .search-box {
    max-width: none;
  }
  
  .templates-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .actions-container {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
  
  .action-buttons {
    width: 100%;
  }
  
  .btn-secondary,
  .btn-primary {
    flex: 1;
  }
  
  .modal-content {
    width: 95vw;
    height: 95vh;
  }
}

@media (max-width: 480px) {
  .template-card {
    border-radius: 12px;
  }
  
  .template-info {
    padding: 16px;
  }
  
  .template-actions {
    flex-direction: column;
  }
  
  .bottom-actions {
    padding: 16px;
  }
}
</style> 