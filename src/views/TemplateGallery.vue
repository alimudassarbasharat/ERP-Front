<template>
  <div class="template-gallery">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <div class="breadcrumb">
          <button @click="$router.go(-1)" class="breadcrumb-link">
            <ArrowLeftIcon class="w-4 h-4" />
            Back to Reports
          </button>
          <ChevronRightIcon class="w-4 h-4 text-gray-500" />
          <span class="breadcrumb-current">Template Gallery</span>
        </div>
        
        <div class="hero-main">
          <div class="hero-badge">
            <SparklesIcon class="w-5 h-5" />
            <span>{{ sectionConfig.title }}</span>
          </div>
          <h1 class="hero-title">Choose Your Perfect Design</h1>
          <p class="hero-subtitle">
            Select from our collection of {{ templates.length }} professionally designed templates to generate beautiful documents
          </p>
        </div>
      </div>
      
      <!-- Floating Stats -->
      <div class="floating-stats">
        <div class="stat-card">
          <div class="stat-icon">
            <UserGroupIcon class="w-5 h-5" />
          </div>
          <div class="stat-content">
            <div class="stat-number">{{ selectedStudents.length }}</div>
            <div class="stat-label">Students Selected</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <DocumentDuplicateIcon class="w-5 h-5" />
          </div>
          <div class="stat-content">
            <div class="stat-number">{{ templates.length }}</div>
            <div class="stat-label">Templates Available</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="filters-section">
      <div class="filters-container">
        <div class="search-filter">
          <div class="search-box">
            <MagnifyingGlassIcon class="search-icon" />
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search templates by name or style..." 
              class="search-input"
            />
          </div>
        </div>
        
        <div class="category-filters">
          <button 
            v-for="filter in filterOptions"
            :key="filter.value"
            @click="activeFilter = filter.value"
            :class="[
              'filter-btn',
              activeFilter === filter.value ? 'active' : ''
            ]"
          >
            <component :is="filter.icon" class="w-4 h-4" />
            <span>{{ filter.label }}</span>
            <span class="filter-count">{{ getFilterCount(filter.value) }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Templates Grid -->
    <div class="templates-section">
      <div class="templates-container">
        <div class="section-title">
          <h2>Available Templates</h2>
          <p>{{ filteredTemplates.length }} templates found</p>
        </div>
        
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
              <div class="preview-wrapper">
                <div class="preview-content">
                  <iframe
                    v-if="template.preview_url"
                    :src="template.preview_url"
                    class="preview-iframe"
                    loading="lazy"
                  ></iframe>
                  <div v-else class="preview-placeholder">
                    <div class="placeholder-icon">
                      <DocumentIcon class="w-8 h-8" />
                    </div>
                    <span class="placeholder-text">{{ template.name }}</span>
                  </div>
                </div>
                
                <!-- Overlay -->
                <div class="preview-overlay">
                  <button 
                    @click.stop="openFullPreview(template)"
                    class="overlay-btn preview-btn"
                  >
                    <EyeIcon class="w-4 h-4" />
                    Preview
                  </button>
                  <button 
                    @click.stop="selectTemplate(template)"
                    class="overlay-btn select-btn"
                    :class="{ 'selected': selectedTemplate?.id === template.id }"
                  >
                    <CheckIcon class="w-4 h-4" />
                    {{ selectedTemplate?.id === template.id ? 'Selected' : 'Select' }}
                  </button>
                </div>
              </div>
              
              <!-- Premium Badge -->
              <div v-if="template.premium" class="premium-badge">
                <StarIcon class="w-3 h-3" />
                Premium
              </div>
              
              <!-- Selection Indicator -->
              <div v-if="selectedTemplate?.id === template.id" class="selection-indicator">
                <CheckCircleIcon class="w-6 h-6" />
              </div>
            </div>

            <!-- Template Info -->
            <div class="template-info">
              <div class="template-header">
                <h3 class="template-name">{{ template.name }}</h3>
                <div class="template-actions">
                  <button 
                    @click.stop="openFullPreview(template)"
                    class="action-icon"
                    title="Full Preview"
                  >
                    <MagnifyingGlassPlusIcon class="w-4 h-4" />
                  </button>
                  <button 
                    @click.stop="favoriteTemplate(template)"
                    :class="['action-icon', template.favorited ? 'favorited' : '']"
                    title="Add to Favorites"
                  >
                    <HeartIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p class="template-description">{{ template.description }}</p>
              
              <div class="template-tags">
                <span v-if="template.premium" class="tag premium">Premium</span>
                <span class="tag category">{{ getCategoryName(template.category) }}</span>
                <span class="tag style">{{ template.style || 'Modern' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More -->
        <div v-if="hasMore" class="load-more-section">
          <button @click="loadMore" class="load-more-btn" :disabled="loading">
            <ArrowPathIcon v-if="loading" class="w-5 h-5 animate-spin" />
            <span>{{ loading ? 'Loading...' : 'Load More Templates' }}</span>
          </button>
        </div>

        <!-- Empty State -->
        <div v-if="filteredTemplates.length === 0" class="empty-state">
          <div class="empty-content">
            <div class="empty-icon">
              <MagnifyingGlassIcon class="w-16 h-16" />
            </div>
            <h3 class="empty-title">No templates found</h3>
            <p class="empty-description">
              Try adjusting your search terms or filters to find the perfect template
            </p>
            <button @click="clearFilters" class="empty-action">
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Action Bar -->
    <transition name="slide-up">
      <div v-if="selectedTemplate" class="floating-action-bar">
        <div class="action-bar-content">
          <div class="selected-preview">
            <div class="selected-thumbnail">
              <div class="thumbnail-icon">{{ getTemplateIcon(selectedTemplate.id) }}</div>
            </div>
            <div class="selected-info">
              <div class="selected-name">{{ selectedTemplate.name }}</div>
              <div class="selected-meta">
                <span class="selected-type">{{ sectionConfig.title }}</span>
                <span class="bullet">•</span>
                <span class="selected-students">{{ selectedStudents.length }} students</span>
              </div>
            </div>
          </div>
          
          <div class="action-buttons">
            <button @click="clearSelection" class="btn-secondary">
              <XMarkIcon class="w-4 h-4" />
              Clear
            </button>
            <button @click="openFullPreview(selectedTemplate)" class="btn-preview">
              <EyeIcon class="w-4 h-4" />
              Preview
            </button>
            <button @click="generateWithTemplate" class="btn-primary">
              <DocumentArrowDownIcon class="w-5 h-5" />
              Generate {{ selectedStudents.length }} Document{{ selectedStudents.length > 1 ? 's' : '' }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Full Preview Modal -->
    <transition name="modal">
      <div v-if="fullPreviewVisible" class="preview-modal" @click="closeFullPreview">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <div class="modal-title">
              <h3>{{ previewingTemplate?.name }}</h3>
              <p>{{ sectionConfig.title }} Preview</p>
            </div>
            <div class="modal-actions">
              <button @click="selectTemplate(previewingTemplate)" class="modal-btn">
                <CheckIcon class="w-4 h-4" />
                Select This Template
              </button>
              <button @click="closeFullPreview" class="modal-close">
                <XMarkIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
          <div class="modal-body">
            <iframe
              v-if="previewingTemplate?.preview_url"
              :src="previewingTemplate.preview_url"
              class="preview-iframe-full"
            ></iframe>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { ElNotification } from 'element-plus'
import axios from '@/utils/axios'
import { 
  ArrowLeftIcon,
  ChevronRightIcon,
  SparklesIcon,
  UserGroupIcon,
  DocumentDuplicateIcon,
  MagnifyingGlassIcon,
  StarIcon,
  DocumentIcon,
  EyeIcon,
  CheckIcon,
  CheckCircleIcon,
  MagnifyingGlassPlusIcon,
  HeartIcon,
  ArrowPathIcon,
  XMarkIcon,
  DocumentArrowDownIcon
} from '@heroicons/vue/24/outline'
import { StarIcon as StarSolid, HeartIcon as HeartSolid } from '@heroicons/vue/24/solid'

const route = useRoute()
const router = useRouter()
const toast = useToast()

// Reactive data
const templates = ref([])
const selectedTemplate = ref(null)
const selectedStudents = ref([])
const searchQuery = ref('')
const activeFilter = ref('all')
const loading = ref(false)
const hasMore = ref(false)
const fullPreviewVisible = ref(false)
const previewingTemplate = ref(null)

// Section configurations
const sectionConfigs = {
  'character': {
    title: 'Character Certificate Templates',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    endpoint: '/character-certificate'
  },
  'challan': {
    title: 'Fee Challan Templates',
    gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    endpoint: '/students/fee-challan-templates'
  },
  'idCard': {
    title: 'ID Card Templates',
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    endpoint: '/id-card'
  },
  'attendance': {
    title: 'Attendance Report Templates',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    endpoint: '/attendance-reports'
  },
  'progress': {
    title: 'Progress Report Templates',
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
    endpoint: '/students/report-card-templates'
  },
  'leaving': {
    title: 'Leaving Certificate Templates',
    gradient: 'linear-gradient(135deg, #94a3b8, #4b5563)',
    endpoint: '/leaving-certificates'
  }
}

// Filter options
const filterOptions = [
  { value: 'all', label: 'All Templates', icon: DocumentDuplicateIcon },
  { value: 'free', label: 'Free', icon: DocumentIcon },
  { value: 'premium', label: 'Premium', icon: StarIcon },
  { value: 'favorites', label: 'Favorites', icon: HeartIcon }
]

// Computed
const sectionType = computed(() => route.params.section || 'character')
const sectionConfig = computed(() => sectionConfigs[sectionType.value] || sectionConfigs.character)

const filteredTemplates = computed(() => {
  let filtered = templates.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(template => 
      template.name.toLowerCase().includes(query) ||
      template.description.toLowerCase().includes(query)
    )
  }

  // Category filter
  switch (activeFilter.value) {
    case 'free':
      filtered = filtered.filter(template => !template.premium)
      break
    case 'premium':
      filtered = filtered.filter(template => template.premium)
      break
    case 'favorites':
      filtered = filtered.filter(template => template.favorited)
      break
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

const getFilterCount = (filterValue) => {
  switch (filterValue) {
    case 'all':
      return templates.value.length
    case 'free':
      return templates.value.filter(t => !t.premium).length
    case 'premium':
      return templates.value.filter(t => t.premium).length
    case 'favorites':
      return templates.value.filter(t => t.favorited).length
    default:
      return 0
  }
}

const getCategoryName = (category) => {
  const categories = {
    'modern': 'Modern',
    'classic': 'Classic',
    'premium': 'Premium',
    'minimal': 'Minimal'
  }
  return categories[category] || 'Standard'
}

const loadTemplates = async () => {
  try {
    loading.value = true
    const response = await axios.get(`${sectionConfig.value.endpoint}/templates`)
    
    if (response.data.success || response.data.result) {
      const templateData = response.data.templates || response.data.result || []
      // Add some mock properties for demo
      templates.value = templateData.map(template => ({
        ...template,
        favorited: false,
        category: template.premium ? 'premium' : 'modern',
        style: 'Modern'
      }))
    }
  } catch (error) {
    console.error('Error loading templates:', error)
    toast.error('Failed to load templates')
  } finally {
    loading.value = false
  }
}

const selectTemplate = (template) => {
  selectedTemplate.value = template
  
  // Haptic feedback on mobile
  if ('vibrate' in navigator) {
    navigator.vibrate(50)
  }
  
  ElNotification({
    title: 'Template Selected',
    message: `${template.name} has been selected for generation`,
    type: 'success',
    duration: 2000,
    position: 'bottom-right'
  })
}

const clearSelection = () => {
  selectedTemplate.value = null
}

const openFullPreview = (template) => {
  previewingTemplate.value = template
  fullPreviewVisible.value = true
  document.body.style.overflow = 'hidden'
}

const closeFullPreview = () => {
  fullPreviewVisible.value = false
  previewingTemplate.value = null
  document.body.style.overflow = ''
}

const favoriteTemplate = (template) => {
  template.favorited = !template.favorited
  toast.success(
    template.favorited ? 'Added to favorites' : 'Removed from favorites'
  )
}

const clearFilters = () => {
  searchQuery.value = ''
  activeFilter.value = 'all'
}

const loadMore = () => {
  // Implementation for loading more templates
  toast.info('Load more functionality coming soon!')
}

const generateWithTemplate = async () => {
  if (!selectedTemplate.value) return
  
  const loading = toast.info('Generating documents...')
  
  try {
    // Simulate generation process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    ElNotification({
      title: 'Documents Generated!',
      message: `Successfully generated ${selectedStudents.value.length} document(s) using ${selectedTemplate.value.name}`,
      type: 'success',
      duration: 4000
    })
    
    // Navigate back to reports
    router.push('/reports')
  } catch (error) {
    toast.error('Failed to generate documents')
  } finally {
    loading.close()
  }
}

// Lifecycle
onMounted(() => {
  // Get selected students from localStorage
  const storedStudents = localStorage.getItem('selectedStudents')
  if (storedStudents) {
    selectedStudents.value = JSON.parse(storedStudents)
  }
  
  loadTemplates()
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

// Keyboard shortcuts
const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    if (fullPreviewVisible.value) {
      closeFullPreview()
    } else {
      router.go(-1)
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.template-gallery {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  padding: 2rem 1.5rem 4rem;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.875rem;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid #ffffff;
  transition: all 0.3s ease;
}

.breadcrumb-link:hover {
  background: #ffffff;
  color: #ffffff;
}

.breadcrumb-current {
  color: #ffffff;
  font-weight: 500;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid #ffffff;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 1rem 0;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: #ffffff;
  margin: 0;
  max-width: 600px;
  line-height: 1.6;
}

.floating-stats {
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid #ffffff;
  min-width: 150px;
}

.stat-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: #ffffff;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
}

.stat-label {
  font-size: 0.75rem;
  color: #ffffff;
}

/* Filters Section */
.filters-section {
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  padding: 1.5rem;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.filters-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: center;
}

.search-box {
  position: relative;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #94a3b8;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  background: #f8fafc;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #8b5cf6;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.category-filters {
  display: flex;
  gap: 0.5rem;
  background: #f1f5f9;
  padding: 0.25rem;
  border-radius: 0.75rem;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn.active {
  background: #ffffff;
  color: #1e293b;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.filter-count {
  background: #e2e8f0;
  color: #64748b;
  padding: 0.125rem 0.375rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.filter-btn.active .filter-count {
  background: #667eea;
  color: #ffffff;
}

/* Templates Section */
.templates-section {
  padding: 2rem 1.5rem;
}

.templates-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  margin-bottom: 2rem;
}

.section-title h2 {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.section-title p {
  color: #94a3b8;
  margin: 0;
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.template-card {
  background: #ffffff;
  border-radius: 1rem;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.template-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  border-color: #e2e8f0;
}

.template-card.selected {
  border-color: #8b5cf6;
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.25);
}

.template-preview {
  position: relative;
  height: 240px;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  overflow: hidden;
}

.preview-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.preview-content {
  width: 100%;
  height: 100%;
}

.preview-iframe {
  width: 100%;
  height: 100%;
  border: none;
  transform: scale(0.7);
  transform-origin: top left;
  width: 142.86%;
  height: 142.86%;
}

.preview-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
}

.placeholder-icon {
  width: 3rem;
  height: 3rem;
  background: #e2e8f0;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
}

.placeholder-text {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  opacity: 0;
  transition: all 0.3s ease;
}

.template-card:hover .preview-overlay {
  opacity: 1;
}

.overlay-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.preview-btn {
  background: #ffffff;
  color: #1e293b;
}

.preview-btn:hover {
  background: #ffffff;
}

.select-btn {
  background: #667eea;
  color: #ffffff;
}

.select-btn:hover {
  background: #5a67d8;
}

.select-btn.selected {
  background: #10b981;
}

.premium-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: #ffffff;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.selection-indicator {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  color: #10b981;
  background: #ffffff;
  border-radius: 50%;
  padding: 0.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.template-info {
  padding: 1.5rem;
}

.template-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.template-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  flex: 1;
}

.template-actions {
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
}

.action-icon {
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 0.375rem;
  background: #f3f4f6;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-icon:hover {
  background: #e5e7eb;
  color: #1e293b;
}

.action-icon.favorited {
  background: #fef3c7;
  color: #f59e0b;
}

.template-description {
  font-size: 0.875rem;
  color: #94a3b8;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.template-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.tag.premium {
  background: #fef3c7;
  color: #f59e0b;
}

.tag.category {
  background: #dbeafe;
  color: #3b82f6;
}

.tag.style {
  background: #f3e8ff;
  color: #8b5cf6;
}

/* Floating Action Bar */
.floating-action-bar {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid #e2e8f0;
  z-index: 20;
  backdrop-filter: blur(10px);
}

.action-bar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  gap: 2rem;
}

.selected-preview {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.selected-thumbnail {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumbnail-icon {
  font-size: 1.25rem;
}

.selected-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
}

.selected-meta {
  font-size: 0.875rem;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bullet {
  color: #94a3b8;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
}

.btn-secondary,
.btn-preview,
.btn-primary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary {
  background: #f3f4f6;
  color: #1e293b;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.btn-preview {
  background: #667eea;
  color: #ffffff;
}

.btn-preview:hover {
  background: #5a67d8;
  transform: translateY(-1px);
}

.btn-primary {
  background: linear-gradient(135deg, #10b981, #059669);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #059669, #047857);
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.5);
}

/* Preview Modal */
.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: #ffffff;
  border-radius: 1rem;
  overflow: hidden;
  width: 90vw;
  height: 90vh;
  max-width: 1200px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
}

.modal-title h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.modal-title p {
  font-size: 0.875rem;
  color: #94a3b8;
  margin: 0;
}

.modal-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.modal-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-btn:hover {
  background: #5a67d8;
}

.modal-close {
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.5rem;
  background: #f3f4f6;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: #e5e7eb;
  color: #1e293b;
}

.modal-body {
  height: calc(100% - 100px);
}

.preview-iframe-full {
  width: 100%;
  height: 100%;
  border: none;
}

/* Empty State */
.empty-state {
  grid-column: 1 / -1;
  padding: 4rem 2rem;
}

.empty-content {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
}

.empty-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1.5rem;
  color: #94a3b8;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.75rem 0;
}

.empty-description {
  font-size: 1rem;
  color: #94a3b8;
  margin: 0 0 2rem 0;
  line-height: 1.5;
}

.empty-action {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.empty-action:hover {
  background: #5a67d8;
}

/* Load More */
.load-more-section {
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem 0;
}

.load-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  background: #ffffff;
  color: #1e293b;
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.load-more-btn:hover:not(:disabled) {
  border-color: #8b5cf6;
  color: #8b5cf6;
}

.load-more-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Animations */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .floating-stats {
    position: static;
    flex-direction: row;
    justify-content: center;
    margin-top: 2rem;
  }
  
  .filters-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .category-filters {
    justify-self: stretch;
  }
  
  .templates-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .action-bar-content {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .action-buttons {
    justify-content: stretch;
  }
  
  .action-buttons > * {
    flex: 1;
  }
  
  .modal-content {
    width: 95vw;
    height: 95vh;
  }
  
  .modal-header {
    padding: 1rem;
  }
  
  .modal-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 1.5rem 1rem 3rem;
  }
  
  .template-card {
    border-radius: 0.75rem;
  }
  
  .template-info {
    padding: 1rem;
  }
  
  .floating-action-bar {
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
  }
  
  .action-bar-content {
    padding: 1rem;
  }
}
</style> 