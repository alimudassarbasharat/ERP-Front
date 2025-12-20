<template>
  <div class="report-card-generator">
    <el-dialog
      v-model="dialogVisible"
      title="Generate Report Card"
      width="900px"
      :close-on-click-modal="false"
    >
      <div v-if="loading" class="loading-section">
        <el-skeleton :rows="2" animated />
      </div>
      <div v-else>
        <div class="template-selection">
          <h3>Select Report Card Template</h3>
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
          <div v-else-if="templates.length === 0" class="empty-message">
            No templates available.
          </div>
          <div v-else class="template-grid">
            <div
              v-for="template in templates"
              :key="template.id"
              class="template-card"
              :class="{ 'selected': selectedTemplate === template.id }"
              @click="selectTemplate(template.id)"
            >
              <div class="template-preview">
                <iframe 
                  v-if="template.preview && template.preview.startsWith('blob:')"
                  :src="template.preview"
                  width="100%"
                  height="100%"
                  style="border: none;"
                ></iframe>
                <img 
                  v-else
                  :src="template.preview" 
                  :alt="template.name" 
                  @error="onImgError($event)" 
                />
              </div>
              <div class="template-info">
                <h4>{{ template.name }}</h4>
                <p>{{ template.description }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="pdfUrl" class="pdf-preview" style="margin-top: 24px;">
          <iframe :src="pdfUrl" width="100%" height="500px" style="border:1px solid #ccc;"></iframe>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="printPdf" :disabled="!pdfUrl">
            <i class="el-icon-printer"></i> Print
          </el-button>
          <el-button type="success" @click="downloadPdf" :disabled="!pdfUrl">
            <i class="el-icon-download"></i> Download
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { useToast } from 'vue-toastification'

// Use centralized axios instance
const toast = useToast()
const axios = api

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

const emit = defineEmits(['update:visible', 'report-card-generated'])

const dialogVisible = ref(false)
const selectedTemplate = ref(null)
const generating = ref(false)
const templates = ref([])
const loading = ref(false)
const error = ref('')
const pdfUrl = ref(null)
let lastBlob = null

watch(() => props.visible, (newVal) => {
  dialogVisible.value = newVal
  if (newVal) {
    fetchTemplates()
  }
  if (!newVal) {
    selectedTemplate.value = null
    error.value = ''
    pdfUrl.value = null
    if (lastBlob) {
      URL.revokeObjectURL(lastBlob)
      lastBlob = null
    }
  }
})

watch(dialogVisible, (newVal) => {
  emit('update:visible', newVal)
})

const fetchTemplates = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await axios.get('/students/report-card-templates', {
      withCredentials: true
    })
    if (response.data && Array.isArray(response.data.result)) {
      const templatesWithPreviews = await Promise.all(
        response.data.result.map(async (template) => {
          try {
            const previewResponse = await axios.get('/students/report-card-template-preview', {
              params: { template: template.id },
              responseType: 'blob',
              withCredentials: true
            })
            const blob = previewResponse.data
            if (blob.type === 'application/pdf') {
              const previewUrl = URL.createObjectURL(blob)
              return {
                ...template,
                preview: previewUrl
              }
            }
            return {
              ...template,
              preview: '/templates/report-cards/default-preview.png'
            }
          } catch (e) {
            return {
              ...template,
              preview: '/templates/report-cards/default-preview.png'
            }
          }
        })
      )
      templates.value = templatesWithPreviews
    } else {
      error.value = 'No templates found from server.'
    }
  } catch (err) {
    error.value = 'Failed to fetch report card templates.'
  } finally {
    loading.value = false
  }
}

const selectTemplate = (templateId) => {
  selectedTemplate.value = templateId
}

const onImgError = (event) => {
  event.target.onerror = null;
  event.target.src = '/templates/report-cards/default-preview.png';
}

const previewPdf = async () => {
  pdfUrl.value = null
  if (!selectedTemplate.value) {
    return
  }
  try {
    const response = await axios.post(`/students/report-card-template-preview`, {
      template: selectedTemplate.value,
      student_id: props.studentId
    }, {
      responseType: 'blob',
      withCredentials: true
    })
    const blob = response.data
    if (blob.type !== 'application/pdf') {
      pdfUrl.value = null
      return
    }
    if (lastBlob) {
      URL.revokeObjectURL(lastBlob)
    }
    lastBlob = URL.createObjectURL(blob)
    pdfUrl.value = lastBlob
  } catch (e) {
    pdfUrl.value = null
    toast.error('Failed to generate report card preview')
  }
}

watch([selectedTemplate], () => {
  previewPdf()
})

const printPdf = async () => {
  if (!pdfUrl.value) return
  const printWindow = window.open(pdfUrl.value, '_blank')
  if (printWindow) {
    printWindow.onload = function() {
      printWindow.print()
      setTimeout(() => {
        printWindow.close()
      }, 1000)
    }
  } else {
    toast.error('Please allow popups to print the PDF')
  }
}

const downloadPdf = async () => {
  if (!selectedTemplate.value) {
    toast.warning('Please select a template first')
    return
  }
  try {
    const response = await axios.post(`/students/generate-report-card`, {
      template: selectedTemplate.value,
      student_id: props.studentId
    }, {
      responseType: 'blob',
      withCredentials: true
    })
    const blob = response.data
    if (blob.type !== 'application/pdf') {
      toast.error('Failed to generate report card')
      return
    }
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `report-card-${props.studentId}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    toast.success('Report card downloaded successfully')
    emit('report-card-generated')
    dialogVisible.value = false
  } catch (e) {
    toast.error('Failed to generate report card')
  }
}

onUnmounted(() => {
  templates.value.forEach(template => {
    if (template.preview && template.preview.startsWith('blob:')) {
      URL.revokeObjectURL(template.preview)
    }
  })
  if (lastBlob) {
    URL.revokeObjectURL(lastBlob)
  }
})
</script>
<style scoped>
.report-card-generator {
  width: 100%;
}

.template-selection {
  margin-bottom: 24px;
}

.template-selection h3 {
  margin-bottom: 16px;
  color: #1e293b;
  font-size: 18px;
  font-weight: 600;
}

.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 16px;
}

.template-card {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  background: #fff;
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
  overflow: hidden;
}

.template-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.template-info {
  padding: 12px;
}

.template-info h4 {
  margin: 0 0 4px;
  font-size: 16px;
  color: #1e293b;
}

.template-info p {
  margin: 0;
  font-size: 13px;
  color: #94a3b8;
}

.error-message {
  color: #ef4444;
  margin-bottom: 16px;
}

.empty-message {
  color: #94a3b8;
  text-align: center;
  padding: 24px;
  background: #f5f7fa;
  border-radius: 8px;
}

.loading-section {
  padding: 24px;
}

.pdf-preview {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f7fa;
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
  
  .template-preview {
    height: 160px;
  }
}
</style> 