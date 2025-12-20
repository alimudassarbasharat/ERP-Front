<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Student Selection Instruction -->
    <div v-if="selectedStudents.length === 0" class="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
      <div class="flex items-center">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div>
          <h4 class="text-lg font-medium text-blue-800">Select Students First</h4>
          <p class="text-sm text-blue-600">Select students from the list above to enable bulk section selection options</p>
        </div>
      </div>
    </div>

    <!-- Section Selection Notice -->
    <div v-if="selectedStudents.length > 0" class="mb-6 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
      <div class="flex items-center">
        <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div>
          <h4 class="text-lg font-medium text-green-800">Section Selection Available</h4>
          <p class="text-sm text-green-600">You can now select multiple sections using the checkboxes next to each section title to generate bulk reports</p>
        </div>
      </div>
    </div>

    <!-- Reports Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Character Certificate -->
      <div class="rounded-xl border border-gray-200 bg-white/40 p-6 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 group">
        <div class="flex items-center mb-4">
          <input v-if="selectedStudents.length > 0" type="checkbox" v-model="selectedSections" value="character-certificate" class="w-4 h-4 text-blue-600 border-gray-200 rounded focus:ring-blue-500 mr-3">
          <div class="w-12 h-12 bg-gradient-to-br from-emerald-400 via-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-light text-gray-900 tracking-tight">Character Certificate</h3>
            <p class="text-sm text-gray-500 font-normal leading-relaxed">Generate character certificates for students</p>
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-normal text-gray-600 mb-3">Choose Design Template</label>
            <div class="grid grid-cols-1 gap-3">
              <div v-for="template in (templateDesigns.character || [])" :key="template.value" 
                   @click="selectTemplate('character', template.value)"
                   :class="['p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md',
                            characterTemplate === template.value ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300']">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <span class="text-2xl mr-3">{{ template.icon }}</span>
                    <div>
                      <div class="flex items-center gap-2">
                        <h4 class="font-medium text-gray-900 text-sm">{{ template.name }}</h4>
                        <span v-if="template.premium" class="px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs rounded-full font-medium">Pro</span>
                      </div>
                      <p class="text-xs text-gray-500 mt-1">{{ template.preview }}</p>
                    </div>
                  </div>
                  <div v-if="characterTemplate === template.value" class="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button @click="openTemplateSelector('character')" :disabled="selectedStudents.length === 0" class="w-full h-10 px-4 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:from-emerald-600 hover:to-green-700 hover:shadow-xl hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            Choose Template & Generate
          </button>
        </div>
      </div>

      <!-- Fee Challan -->
      <div class="rounded-xl border border-gray-200 bg-white/40 p-6 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 group">
        <div class="flex items-center mb-4">
          <input v-if="selectedStudents.length > 0" type="checkbox" v-model="selectedSections" value="fee-challan" class="w-4 h-4 text-blue-600 border-gray-200 rounded focus:ring-blue-500 mr-3">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-light text-gray-900 tracking-tight">Fee Challan</h3>
            <p class="text-sm text-gray-500 font-normal leading-relaxed">Generate fee challans and receipts</p>
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-normal text-gray-600 mb-3">Challan Design Template</label>
            <div class="grid grid-cols-1 gap-3">
              <div v-for="template in (templateDesigns.challan || [])" :key="template.value" 
                   @click="selectTemplate('challan', template.value)"
                   :class="['p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md',
                            challanTemplate === template.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300']">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <span class="text-2xl mr-3">{{ template.icon }}</span>
                    <div>
                      <div class="flex items-center gap-2">
                        <h4 class="font-medium text-gray-900 text-sm">{{ template.name }}</h4>
                        <span v-if="template.premium" class="px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs rounded-full font-medium">Pro</span>
                      </div>
                      <p class="text-xs text-gray-500 mt-1">{{ template.preview }}</p>
                    </div>
                  </div>
                  <div v-if="challanTemplate === template.value" class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button @click="openTemplateSelector('challan')" :disabled="selectedStudents.length === 0" class="w-full h-10 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            Choose Template & Generate
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

// Reactive data
const selectedStudents = ref([])
const selectedSections = ref([])
const userPreferences = ref({})

// Template selector
const templateSelectorVisible = ref(false)
const currentSectionType = ref('')

// Report options with design templates
const characterTemplate = ref('modern-gradient')
const challanTemplate = ref('professional-modern')
const challanType = ref('monthly')
const challanMonth = ref(new Date().toLocaleString('default', { month: 'long' }))
const idCardTemplate = ref('modern-3d')
const attendanceTemplate = ref('chart-analytics')
const leavingTemplate = ref('official-formal')
const sessionYear = ref('2024-25')
const attendancePeriod = ref('monthly')
const startDate = ref('')
const endDate = ref('')
const examTerm = ref('first')
const progressReportType = ref('premium-detailed')
const leavingReason = ref('transfer')
const lastAttendanceDate = ref('')

// Template designs (will be fetched from backend)
const templateDesigns = ref({})

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const router = useRouter()
const toast = useToast()

// Methods for template selection and report generation
const generateCharacterCertificate = async () => {
  if (selectedStudents.value.length === 0) {
    toast.warning('Please select at least one student')
    return
  }
  const loading = ElLoading.service({ lock: true, text: 'Generating Character Certificates...' })
  try {
    for (const studentId of selectedStudents.value) {
      const response = await api.get(`/students/${studentId}/character-certificate`, {
        params: { template: characterTemplate.value },
        responseType: 'blob'
      })
      if (response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
        window.open(url, '_blank')
      }
    }
    toast.success('Character certificates generated successfully!')
  } catch (error) {
    toast.error('Failed to generate character certificates')
  } finally {
    loading.close()
  }
}

const generateFeeChallan = async () => {
  if (selectedStudents.value.length === 0) {
    toast.warning('Please select at least one student')
    return
  }
  const loading = ElLoading.service({ lock: true, text: 'Generating Fee Challans...' })
  try {
    for (const studentId of selectedStudents.value) {
      const response = await api.get(`/students/${studentId}/generate-fee-challan`, {
        params: { template: challanTemplate.value, type: challanType.value, month: challanMonth.value },
        responseType: 'blob'
      })
      if (response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
        window.open(url, '_blank')
      }
    }
    toast.success('Fee challans generated successfully!')
  } catch (error) {
    toast.error('Failed to generate fee challans')
  } finally {
    loading.close()
  }
}

const generateIDCard = async () => {
  if (selectedStudents.value.length === 0) {
    toast.warning('Please select at least one student')
    return
  }
  const loading = ElLoading.service({ lock: true, text: 'Generating ID Cards...' })
  try {
    for (const studentId of selectedStudents.value) {
      const response = await api.get(`/students/${studentId}/card`, {
        params: { template: idCardTemplate.value, session: sessionYear.value },
        responseType: 'blob'
      })
      if (response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
        window.open(url, '_blank')
      }
    }
    toast.success('ID cards generated successfully!')
  } catch (error) {
    toast.error('Failed to generate ID cards')
  } finally {
    loading.close()
  }
}

const generateAttendanceReport = async () => {
  if (selectedStudents.value.length === 0) {
    toast.warning('Please select at least one student')
    return
  }
  const loading = ElLoading.service({ lock: true, text: 'Generating Attendance Reports...' })
  try {
    const params = { period: attendancePeriod.value, students: selectedStudents.value }
    if (attendancePeriod.value === 'custom') {
      params.start_date = startDate.value
      params.end_date = endDate.value
    }
    const response = await api.get('/reports/attendance', { params, responseType: 'blob' })
    if (response.data) {
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
      window.open(url, '_blank')
    }
    toast.success('Attendance reports generated successfully!')
  } catch (error) {
    toast.error('Failed to generate attendance reports')
  } finally {
    loading.close()
  }
}

const generateProgressReport = async () => {
  if (selectedStudents.value.length === 0) {
    toast.warning('Please select at least one student')
    return
  }
  const loading = ElLoading.service({ lock: true, text: 'Generating Progress Reports...' })
  try {
    for (const studentId of selectedStudents.value) {
      const response = await api.post('/students/generate-report-card', {
        student_id: studentId,
        template: progressReportType.value,
        term: examTerm.value
      }, { responseType: 'blob' })
      if (response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
        window.open(url, '_blank')
      }
    }
    toast.success('Progress reports generated successfully!')
  } catch (error) {
    toast.error('Failed to generate progress reports')
  } finally {
    loading.close()
  }
}

const generateLeavingCertificate = async () => {
  if (selectedStudents.value.length === 0) {
    toast.warning('Please select at least one student')
    return
  }
  const loading = ElLoading.service({ lock: true, text: 'Generating Leaving Certificates...' })
  try {
    for (const studentId of selectedStudents.value) {
      const response = await api.get(`/students/${studentId}/leaving-certificate`, {
        params: { reason: leavingReason.value, last_attendance: lastAttendanceDate.value },
        responseType: 'blob'
      })
      if (response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
        window.open(url, '_blank')
      }
    }
    toast.success('Leaving certificates generated successfully!')
  } catch (error) {
    toast.error('Failed to generate leaving certificates')
  } finally {
    loading.close()
  }
}

// Bulk actions
const generateBulkCharacterCertificates = () => generateCharacterCertificate()
const generateBulkIDCards = () => generateIDCard()
const generateBulkFeeChallans = () => generateFeeChallan()
const generateBulkProgressReports = () => generateProgressReport()

// Section selection methods
const generateSelectedSections = async () => {
  if (selectedSections.value.length === 0) {
    toast.warning('Please select at least one section')
    return
  }
  if (selectedStudents.value.length === 0) {
    toast.warning('Please select at least one student')
    return
  }
  const loading = ElLoading.service({ lock: true, text: 'Generating Selected Reports...' })
  try {
    for (const section of selectedSections.value) {
      switch (section) {
        case 'character-certificate':
          await generateCharacterCertificate()
          break
        case 'fee-challan':
          await generateFeeChallan()
          break
        case 'id-card':
          await generateIDCard()
          break
        case 'attendance-report':
          await generateAttendanceReport()
          break
        case 'progress-report':
          await generateProgressReport()
          break
        case 'leaving-certificate':
          await generateLeavingCertificate()
          break
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    toast.success(`Successfully generated ${selectedSections.value.length} types of reports for ${selectedStudents.value.length} students!`)
  } catch (error) {
    toast.error('Failed to generate some reports')
  } finally {
    loading.close()
  }
}

const clearSectionSelection = () => {
  selectedSections.value = []
}

const openTemplateSelector = (sectionType) => {
  if (selectedStudents.value.length === 0) {
    toast.warning('Please select at least one student')
    return
  }
  currentSectionType.value = sectionType
  templateSelectorVisible.value = true
}

const selectAllSections = () => {
  selectedSections.value = [
    'character-certificate',
    'fee-challan',
    'id-card',
    'attendance-report',
    'progress-report',
    'leaving-certificate'
  ]
}

const loadAvailableTemplates = async () => {
  try {
    const response = await api.get('/user/preferences/available-templates')
    if (response.data.success) {
      const iconMap = {
        character: { '🎨': 'modern-gradient', '📜': 'classic-formal', '👑': 'royal-premium', '✨': 'minimal-clean' },
        challan: { '💳': 'default', '🌈': 'modern', '📋': 'classic', '📄': 'corporate', '⭐': 'elegant', '📝': 'minimal', '🏛️': 'traditional', '💼': 'professional', '🏫': 'school', '🎓': 'university' },
        idCard: { '🎯': 'modern-3d', '💼': 'corporate-sleek', '🌟': 'student-vibrant', '📸': 'classic-photo' },
        attendance: { '📊': 'chart-analytics', '📅': 'calendar-grid', '📈': 'dashboard-style', '📝': 'simple-table' },
        progress: { '🏆': 'default', '👨‍👩‍👧‍👦': 'modern', '🎓': 'detailed' },
        leaving: { '🏛️': 'official-formal', '🏫': 'school-branded', '🌟': 'certificate-premium', '📜': 'standard-format' }
      }
      const templatesWithIcons = {}
      Object.keys(response.data.templates).forEach(key => {
        templatesWithIcons[key] = response.data.templates[key].map(template => ({
          ...template,
          value: template.id,
          preview: template.description,
          icon: Object.keys(iconMap[key] || {}).find(icon => iconMap[key][icon] === template.id) || '📄'
        }))
      })
      templateDesigns.value = templatesWithIcons
    }
  } catch (error) {
    console.error('Error loading templates:', error)
    toast.error('Failed to load templates')
  }
}

const selectTemplate = async (type, template) => {
  switch(type) {
    case 'character':
      characterTemplate.value = template
      break
    case 'challan':
      challanTemplate.value = template
      break
    case 'idCard':
      idCardTemplate.value = template
      break
    case 'attendance':
      attendanceTemplate.value = template
      break
    case 'progress':
      progressReportType.value = template
      break
    case 'leaving':
      leavingTemplate.value = template
      break
  }
  await saveUserPreference(type, template)
}

const saveUserPreference = async (type, template) => {
  try {
    await api.post('/user/preferences/report-templates', { type, template })
    userPreferences.value[type] = template
    toast.success('Design preference saved!')
  } catch (error) {
    console.error('Error saving preference:', error)
  }
}

const loadUserPreferences = async () => {
  try {
    const response = await api.get('/user/preferences/report-templates')
    if (response.data.success) {
      userPreferences.value = response.data.preferences || {}
      if (userPreferences.value.character) characterTemplate.value = userPreferences.value.character
      if (userPreferences.value.challan) challanTemplate.value = userPreferences.value.challan
      if (userPreferences.value.idCard) idCardTemplate.value = userPreferences.value.idCard
      if (userPreferences.value.attendance) attendanceTemplate.value = userPreferences.value.attendance
      if (userPreferences.value.progress) progressReportType.value = userPreferences.value.progress
      if (userPreferences.value.leaving) leavingTemplate.value = userPreferences.value.leaving
    }
  } catch (error) {
    console.error('Error loading preferences:', error)
  }
}

onMounted(async () => {
  await loadAvailableTemplates()
  await loadUserPreferences()
  // Optionally, load selected students from localStorage if needed
  const stored = localStorage.getItem('selectedStudents')
  if (stored) {
    try {
      selectedStudents.value = JSON.parse(stored)
    } catch {}
  }
})
</script>
