<template>
  <PageShell 
    title="Class-wise Marksheet Entry"
    :breadcrumbs="[
      { label: 'Exams', to: '/exams/add-marksheet-landing' },
      { label: 'Add Marksheet', to: '/exams/add-marksheet-landing' },
      { label: 'Class-wise' }
    ]"
  >
    <!-- Header -->
    <MarksheetHeader
      title="Class-wise Marksheet Entry"
      subtitle="View and enter marks for all subjects in a class"
      :icon="School"
      icon-class="text-blue-600"
      icon-bg-class="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30"
      :show-reset-button="step === 1"
      @reset="resetFilters"
    />

    <!-- Step 1: Filters -->
    <div v-if="step === 0">
      <MarksheetFilterPanel
        mode="class"
        title="Select Class and Section"
        v-model="filters"
        @apply="loadSubjectsProgress"
      />
    </div>

    <!-- Step 2: Subject Progress List -->
    <div v-if="step === 1">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
        <!-- Summary Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div class="text-xs text-blue-600 dark:text-blue-400 mb-1">Total Students</div>
            <div class="text-2xl font-bold text-blue-700 dark:text-blue-300">{{ totalStudents }}</div>
          </div>
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <div class="text-xs text-green-600 dark:text-green-400 mb-1">Completed Subjects</div>
            <div class="text-2xl font-bold text-green-700 dark:text-green-300">{{ completedSubjects }} / {{ subjects.length }}</div>
          </div>
          <div class="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
            <div class="text-xs text-orange-600 dark:text-orange-400 mb-1">Missing Entries</div>
            <div class="text-2xl font-bold text-orange-700 dark:text-orange-300">{{ missingEntries }}</div>
          </div>
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
            <div class="text-xs text-purple-600 dark:text-purple-400 mb-1">Overall Progress</div>
            <div class="text-2xl font-bold text-purple-700 dark:text-purple-300">{{ overallProgress }}%</div>
          </div>
        </div>

        <!-- Subject List Header -->
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">Subjects Progress</h3>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Click on a subject to enter marks
          </div>
        </div>

        <!-- Subjects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="subject in subjects" 
            :key="subject.id"
            @click="openSubjectGrid(subject)"
            class="bg-white dark:bg-gray-900 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 cursor-pointer transition-all duration-300 group hover:shadow-lg"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center group-hover:from-purple-500 group-hover:to-indigo-500 transition-all">
                  <el-icon class="text-purple-600 group-hover:text-white transition-all">
                    <Document />
                  </el-icon>
                </div>
                <div>
                  <div class="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-all">
                    {{ subject.name }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {{ subject.code || 'N/A' }}
                  </div>
                </div>
              </div>
              <el-icon class="text-gray-400 group-hover:text-purple-500 transition-all">
                <ArrowRight />
              </el-icon>
            </div>

            <!-- Progress Bar -->
            <div class="mb-2">
              <div class="flex items-center justify-between text-xs mb-1">
                <span class="text-gray-600 dark:text-gray-400">Entry Progress</span>
                <span class="font-semibold text-gray-900 dark:text-white">
                  {{ subject.entered_count || 0 }} / {{ totalStudents }}
                </span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  :class="[
                    'h-2 rounded-full transition-all duration-300',
                    getProgressClass(subject.progress_percentage)
                  ]"
                  :style="{ width: `${subject.progress_percentage || 0}%` }"
                ></div>
              </div>
            </div>

            <!-- Status Badge -->
            <div class="flex items-center justify-between">
              <span :class="[
                'text-xs px-2 py-1 rounded-full font-semibold',
                getStatusClass(subject.progress_percentage)
              ]">
                {{ getStatusLabel(subject.progress_percentage) }}
              </span>
              <span class="text-xs text-gray-500 dark:text-gray-400">
                {{ subject.progress_percentage || 0 }}%
              </span>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <EmptyState
          v-if="subjects.length === 0 && !loading"
          title="No subjects found"
          description="No subjects are configured for this class"
          :icon="Document"
          icon-color="gray"
        />
      </div>
    </div>

    <!-- Step 3: Subject Marks Grid -->
    <div v-if="step === 2 && activeSubject">
      <div class="mb-4">
        <button 
          @click="step = 1"
          type="button"
          class="h-9 px-6 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium rounded-full border border-gray-200 dark:border-gray-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to Subject List
        </button>
      </div>

      <MarksheetGrid
        :title="`${activeSubject.name} - Marks Entry`"
        :subtitle="`Enter marks for ${totalStudents} students`"
        :students="students"
        :subjects="[activeSubject]"
        :total-marks="activeSubject.total_marks || 100"
        :marks-data="marksData"
        :is-saving="isSaving"
        :is-submitting="isSubmitting"
        :last-saved="lastSaved"
        @mark-change="handleMarkChange"
        @status-change="handleMarkChange"
        @back="step = 1"
        @submit="submitMarks"
      />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <el-icon class="animate-spin text-4xl text-purple-500"><Loading /></el-icon>
    </div>
  </PageShell>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { School, Document, ArrowRight, ArrowLeft, Loading } from '@element-plus/icons-vue'
import PageShell from '@/components/common/PageShell.vue'
import MarksheetHeader from '@/components/exams/MarksheetHeader.vue'
import MarksheetFilterPanel from '@/components/exams/MarksheetFilterPanel.vue'
import MarksheetGrid from '@/components/exams/MarksheetGrid.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import api from '@/utils/axios'
import { debounce } from 'lodash'

const router = useRouter()
const toast = useToast()

const step = ref(0) // 0 = filters, 1 = subject list, 2 = marks grid
const loading = ref(false)
const isSaving = ref(false)
const isSubmitting = ref(false)
const lastSaved = ref('')

const filters = ref({})
const subjects = ref([])
const students = ref([])
const activeSubject = ref(null)
const marksData = ref({})

// Computed
const totalStudents = computed(() => students.value.length)

const completedSubjects = computed(() => {
  return subjects.value.filter(s => (s.progress_percentage || 0) === 100).length
})

const missingEntries = computed(() => {
  return subjects.value.reduce((sum, s) => {
    return sum + (totalStudents.value - (s.entered_count || 0))
  }, 0)
})

const overallProgress = computed(() => {
  if (subjects.value.length === 0) return 0
  const total = subjects.value.reduce((sum, s) => sum + (s.progress_percentage || 0), 0)
  return Math.round(total / subjects.value.length)
})

// Tenant isolation
const getTenantFilter = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return { merchant_id: user.merchant_id || user.school_id }
}

// Load subjects with progress
const loadSubjectsProgress = async (appliedFilters) => {
  filters.value = appliedFilters
  loading.value = true
  
  try {
    // Load subjects for the class
    const subjectsResponse = await api.post('/exam-marks/fetch-subjects', {
      exam_id: filters.value.exam_id,
      class_id: filters.value.class_id,
      section_ids: [filters.value.section_id],
      ...getTenantFilter()
    })
    
    if (subjectsResponse.data.success) {
      subjects.value = subjectsResponse.data.data.filter(s => !s.deleted_at)
      
      // Load progress for each subject
      for (const subject of subjects.value) {
        await loadSubjectProgress(subject)
      }
      
      // Load students
      await loadStudents()
      
      step.value = 1
    }
  } catch (error) {
    toast.error('Failed to load subjects')
    console.error('Load subjects error:', error)
  } finally {
    loading.value = false
  }
}

// Load progress for a subject
const loadSubjectProgress = async (subject) => {
  try {
    const response = await api.get('/exam-marks/progress', {
      params: {
        exam_id: filters.value.exam_id,
        subject_id: subject.id,
        class_id: filters.value.class_id,
        section_id: filters.value.section_id,
        ...getTenantFilter()
      }
    })
    
    if (response.data.success) {
      subject.entered_count = response.data.data.entered_count || 0
      subject.total_count = response.data.data.total_count || 0
      subject.progress_percentage = response.data.data.total_count > 0 
        ? Math.round((response.data.data.entered_count / response.data.data.total_count) * 100)
        : 0
    }
  } catch (error) {
    console.error('Failed to load subject progress:', error)
    subject.entered_count = 0
    subject.progress_percentage = 0
  }
}

// Load students
const loadStudents = async () => {
  try {
    const response = await api.post('/exam-marks/fetch-students', {
      exam_id: filters.value.exam_id,
      class_id: filters.value.class_id,
      section_ids: [filters.value.section_id],
      ...getTenantFilter()
    })
    
    if (response.data.success) {
      students.value = response.data.data.filter(s => !s.deleted_at)
    }
  } catch (error) {
    console.error('Failed to load students:', error)
  }
}

// Open subject grid
const openSubjectGrid = async (subject) => {
  activeSubject.value = subject
  
  // Load existing marks for this subject
  try {
    const response = await api.get('/exam-marks/subject-marks', {
      params: {
        exam_id: filters.value.exam_id,
        subject_id: subject.id,
        class_id: filters.value.class_id,
        section_id: filters.value.section_id,
        ...getTenantFilter()
      }
    })
    
    if (response.data.success && response.data.data) {
      // Populate marksData from existing records
      marksData.value = {}
      response.data.data.forEach(mark => {
        marksData.value[mark.student_id] = {
          obtained_marks: mark.obtained_marks,
          status: mark.status || 'present',
          absent_reason: mark.absent_reason || '',
          absent_note: mark.absent_note || ''
        }
      })
    } else {
      // Initialize empty marksData
      marksData.value = {}
    }
  } catch (error) {
    console.error('Failed to load existing marks:', error)
    marksData.value = {}
  }
  
  step.value = 2
}

// Handle mark change (autosave)
const handleMarkChange = debounce(async () => {
  await saveMarks(true) // true = draft mode
}, 2000)

// Save marks
const saveMarks = async (isDraft = true) => {
  isSaving.value = true
  
  try {
    const endpoint = isDraft ? '/exam-marks/save-draft' : '/exam-marks/submit'
    
    const response = await api.post(endpoint, {
      exam_id: filters.value.exam_id,
      subject_id: activeSubject.value.id,
      total_marks: activeSubject.value.total_marks || 100,
      marks: Object.entries(marksData.value).map(([student_id, data]) => ({
        student_id,
        ...data
      })),
      ...getTenantFilter()
    })
    
    if (response.data.success) {
      lastSaved.value = new Date().toLocaleTimeString()
      if (!isDraft) {
        toast.success('Marks submitted successfully!')
        // Update progress and go back to subject list
        await loadSubjectProgress(activeSubject.value)
        step.value = 1
      }
    }
  } catch (error) {
    toast.error(isDraft ? 'Autosave failed' : 'Failed to submit marks')
    console.error('Save marks error:', error)
  } finally {
    isSaving.value = false
  }
}

// Submit marks
const submitMarks = async () => {
  isSubmitting.value = true
  await saveMarks(false) // false = final submit
  isSubmitting.value = false
}

// Reset filters
const resetFilters = () => {
  step.value = 0
  filters.value = {}
  subjects.value = []
  students.value = []
  activeSubject.value = null
  marksData.value = {}
}

// Helper functions for UI
const getProgressClass = (percentage) => {
  if (percentage >= 100) return 'bg-gradient-to-r from-green-500 to-emerald-500'
  if (percentage >= 70) return 'bg-gradient-to-r from-blue-500 to-indigo-500'
  if (percentage >= 30) return 'bg-gradient-to-r from-orange-500 to-amber-500'
  return 'bg-gradient-to-r from-red-500 to-pink-500'
}

const getStatusClass = (percentage) => {
  if (percentage >= 100) return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
  if (percentage >= 70) return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
  if (percentage >= 30) return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
  return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
}

const getStatusLabel = (percentage) => {
  if (percentage >= 100) return 'Complete'
  if (percentage >= 70) return 'Almost Done'
  if (percentage >= 30) return 'In Progress'
  if (percentage > 0) return 'Started'
  return 'Not Started'
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
