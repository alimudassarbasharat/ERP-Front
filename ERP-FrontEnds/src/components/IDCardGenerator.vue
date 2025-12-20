<template>
  <div class="id-card-generator">
    <el-dialog
      v-model="dialogVisible"
      title="Generate Student ID Card"
      width="800px"
      :close-on-click-modal="false"
    >
      <div class="template-selection">
        <h3>Select Template Style</h3>
        <div class="template-grid">
          <div
            v-for="template in templates"
            :key="template.id"
            class="template-card"
            :class="{ 'selected': selectedTemplate === template.id }"
            @click="selectTemplate(template.id)"
          >
            <div class="template-preview">
              <img :src="template.preview" :alt="template.name" />
            </div>
            <div class="template-info">
              <h4>{{ template.name }}</h4>
              <p>{{ template.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="preview-section" v-if="selectedTemplate">
        <h3>Preview</h3>
        <div class="preview-container">
          <div class="preview-card">
            <img :src="getPreviewImage(selectedTemplate)" alt="Selected Template Preview" />
          </div>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="generateCard" :loading="generating">
            Generate Card
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
import { useToast } from 'vue-toastification'
import axios from 'axios'

const props = defineProps({
  studentId: {
    type: [String, Number],
    required: true
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:visible', 'card-generated'])

const dialogVisible = ref(false)
const selectedTemplate = ref(null)
const generating = ref(false)
const toast = useToast()

// Template definitions
const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and minimalist design with subtle shadows',
    preview: '/templates/modern-preview.svg'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional design with elegant typography',
    preview: '/templates/classic-preview.svg'
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professional design with strong contrast',
    preview: '/templates/corporate-preview.svg'
  }
]

// Watch for visible prop changes
watch(() => props.visible, (newVal) => {
  dialogVisible.value = newVal
})

// Watch for dialog visibility changes
watch(dialogVisible, (newVal) => {
  emit('update:visible', newVal)
})

const selectTemplate = (templateId) => {
  selectedTemplate.value = templateId
}

const getPreviewImage = (templateId) => {
  const template = templates.find(t => t.id === templateId)
  return template ? template.preview : ''
}

const generateCard = async () => {
  if (!selectedTemplate.value) {
    toast.warning('Please select a template first')
    return
  }

  try {
    generating.value = true
    const response = await axios.get(`/api/students/${props.studentId}/generate-id-card`, {
      params: {
        style: selectedTemplate.value
      },
      responseType: 'blob'
    })

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `student-id-card-${selectedTemplate.value}.pdf`)
    document.body.appendChild(link)
    link.click()
    link.remove()

    toast.success('ID Card generated successfully')
    emit('card-generated')
    dialogVisible.value = false
  } catch (error) {
    console.error('Error generating ID card:', error)
    toast.error('Failed to generate ID card')
  } finally {
    generating.value = false
  }
}
</script>

<style scoped>
.id-card-generator {
  width: 100%;
}

.template-selection {
  margin-bottom: 24px;
}

.template-selection h3 {
  margin-bottom: 16px;
  color: #1e293b;
  font-size: 18px;
}

.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.template-card {
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #ffffff;
}

.template-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.template-card.selected {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.template-preview {
  height: 200px;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e0e0e0;
}

.template-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.template-info {
  padding: 16px;
}

.template-info h4 {
  margin: 0 0 8px 0;
  color: #1e293b;
  font-size: 16px;
}

.template-info p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.4;
}

.preview-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e0e0e0;
}

.preview-section h3 {
  margin-bottom: 16px;
  color: #1e293b;
  font-size: 18px;
}

.preview-container {
  display: flex;
  justify-content: center;
  background: #f5f7fa;
  padding: 24px;
  border-radius: 8px;
}

.preview-card {
  width: 300px;
  height: 189px; /* Maintains 1.586 aspect ratio (standard ID card) */
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.preview-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

@media (max-width: 768px) {
  .template-grid {
    grid-template-columns: 1fr;
  }

  .preview-card {
    width: 100%;
    max-width: 300px;
  }
}
</style> 