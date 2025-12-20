<template>
  <div class="fee-challan-generator">
    <el-dialog
      v-model="dialogVisible"
      title="Generate Fee Challan"
      width="800px"
      :close-on-click-modal="false"
    >
      <div v-if="loading" class="loading-section">
        <el-skeleton :rows="2" animated />
      </div>
      <div v-else>
        <div class="template-selection">
          <h3>Select Challan Template</h3>
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

        <div class="month-selection" v-if="selectedTemplate">
          <h3>Select Month</h3>
          <el-date-picker
            v-model="selectedMonth"
            type="month"
            placeholder="Select month"
            format="MMMM YYYY"
            value-format="MMMM YYYY"
          />
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

const toast = useToast()
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

const emit = defineEmits(['update:visible', 'challan-generated'])

const dialogVisible = ref(false)
const selectedTemplate = ref(null)
const selectedMonth = ref(new Date().toLocaleString('default', { month: 'long', year: 'numeric' }))
const generating = ref(false)
const templates = ref([])
const loading = ref(false)
const error = ref('')
const pdfUrl = ref(null)
let lastBlob = null

// Watch for visible prop changes
watch(() => props.visible, (newVal) => {
  dialogVisible.value = newVal
  if (newVal) {
    fetchTemplates()
  }
  if (!newVal) {
    // Reset state when dialog is closed
    selectedTemplate.value = null
    selectedMonth.value = new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
    error.value = ''
    pdfUrl.value = null
    if (lastBlob) {
      URL.revokeObjectURL(lastBlob)
      lastBlob = null
    }
  }
})

// Watch for dialog visibility changes
watch(dialogVisible, (newVal) => {
  emit('update:visible', newVal)
})

const fetchTemplates = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await axios.get('/students/fee-challan-templates', {
      withCredentials: true
    })
    if (response.data && Array.isArray(response.data.result)) {
      // Instead of using the preview URL directly, we'll fetch the PDF and create a blob URL
      const templatesWithPreviews = await Promise.all(
        response.data.result.map(async (template) => {
          try {
            const previewResponse = await axios.get('/students/fee-challan-template-preview', {
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
              preview: '/templates/fee-challans/default-preview.png'
            }
          } catch (e) {
            console.error(`Error fetching preview for template ${template.id}:`, e)
            return {
              ...template,
              preview: '/templates/fee-challans/default-preview.png'
            }
          }
        })
      )
      templates.value = templatesWithPreviews
    } else {
      error.value = 'No templates found from server.'
    }
  } catch (err) {
    error.value = 'Failed to fetch challan templates.'
    console.error('Error fetching templates:', err)
  } finally {
    loading.value = false
  }
}

const selectTemplate = (templateId) => {
  selectedTemplate.value = templateId
}

const onImgError = (event) => {
  event.target.onerror = null;
  event.target.src = '/templates/fee-challans/default-preview.png';
}

const previewPdf = async () => {
  pdfUrl.value = null
  if (!selectedTemplate.value || !selectedMonth.value) {
    return
  }
  try {
    const response = await axios.get(`/students/fee-challan-template-preview`, {
      params: {
        template: selectedTemplate.value
      },
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
    console.error('Error previewing PDF:', e)
    pdfUrl.value = null
  }
}

watch([selectedTemplate, selectedMonth], () => {
  previewPdf()
})

const generatePdf = async () => {
  if (!selectedTemplate.value || !selectedMonth.value) {
    toast.warning('Please select a template and month first')
    return null
  }

  try {
    const response = await axios.get(`/api/students/${props.studentId}/generate-fee-challan`, {
      params: {
        template: selectedTemplate.value,
        month: selectedMonth.value
      },
      responseType: 'blob',
      withCredentials: true
    })

    // Check if the response is actually a PDF
    const blob = response.data;
    if (blob.type !== 'application/pdf') {
      // Try to read error message from blob
      const text = await blob.text();
      console.error('Server error:', text);
      toast.error('Failed to generate fee challan. Server error.');
      return null;
    }

    return blob;
  } catch (error) {
    console.error('Error generating fee challan:', error)
    toast.error('Failed to generate fee challan. Please try again.')
    return null
  }
}

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
  if (!pdfUrl.value) return
  const link = document.createElement('a')
  link.href = pdfUrl.value
  link.download = `fee-challan-${selectedTemplate.value}-${selectedMonth.value}.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Clean up blob URLs when component is unmounted
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
.fee-challan-generator {
  width: 100%;
}

.loading-section {
  padding: 40px 0;
  text-align: center;
}

.error-message {
  color: #ef4444;
  margin-bottom: 16px;
  font-weight: bold;
}

.empty-message {
  color: #94a3b8;
  margin-bottom: 16px;
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
  overflow: hidden;
}

.template-preview iframe {
  width: 100%;
  height: 100%;
  border: none;
  background: #ffffff;
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

.month-selection {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e0e0e0;
}

.month-selection h3 {
  margin-bottom: 16px;
  color: #1e293b;
  font-size: 18px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.pdf-preview iframe {
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
}

@media (max-width: 768px) {
  .template-grid {
    grid-template-columns: 1fr;
  }
}
</style> 