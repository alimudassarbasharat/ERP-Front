<template>
  <PageShell 
    title="Student-wise Marksheet Entry"
    :breadcrumbs="[
      { label: 'Exams', to: '/exams/add-marksheet-landing' },
      { label: 'Add Marksheet', to: '/exams/add-marksheet-landing' },
      { label: 'Student-wise' }
    ]"
  >
    <!-- Header -->
    <MarksheetHeader
      title="Student-wise Marksheet Entry"
      subtitle="Search student and view/edit all their exam marks"
      :icon="User"
      icon-class="text-orange-600"
      icon-bg-class="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30"
      :show-reset-button="selectedStudent !== null"
      :show-save-button="selectedStudent !== null && hasChanges"
      :is-saving="isSaving"
      @reset="resetSelection"
      @save="saveDraft"
    />

    <!-- Step 1: Search & Select Student -->
    <div v-if="!selectedStudent">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <div class="max-w-2xl mx-auto">
          <!-- Search Illustration -->
          <div class="text-center mb-6">
            <div class="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center mb-4">
              <svg class="w-10 h-10 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Search for a Student</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Type student name, roll number, or admission number to find their marks
            </p>
          </div>

          <!-- Filters -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="flex flex-col">
              <label class="mb-1 text-base font-normal text-black dark:text-white modern-font">
                Session <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <select 
                  v-model="filters.session_id" 
                  @change="loadExams"
                  class="h-9 border-0 bg-transparent px-0 text-sm font-light text-gray-600 dark:text-gray-300 focus:ring-0 focus:outline-none w-full appearance-none pr-8"
                >
                  <option value="">Select Session</option>
                  <option v-for="session in sessions" :key="session.id" :value="session.id">
                    {{ session.name }}
                  </option>
                </select>
                <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
                <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 dark:bg-purple-800 pointer-events-none"></div>
              </div>
            </div>

            <div class="flex flex-col">
              <label class="mb-1 text-base font-normal text-black dark:text-white modern-font">
                Exam / Term <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <select 
                  v-model="filters.exam_id"
                  :disabled="!filters.session_id"
                  class="h-9 border-0 bg-transparent px-0 text-sm font-light text-gray-600 dark:text-gray-300 focus:ring-0 focus:outline-none w-full appearance-none pr-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Exam</option>
                  <option v-for="exam in exams" :key="exam.id" :value="exam.id">
                    {{ exam.name }}
                  </option>
                </select>
                <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
                <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 dark:bg-purple-800 pointer-events-none"></div>
              </div>
            </div>
          </div>

          <!-- Student Search -->
          <div class="mb-6 flex flex-col">
            <label class="mb-1 text-base font-normal text-black dark:text-white modern-font">
              Search Student <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <el-autocomplete
                v-model="studentSearch"
                :fetch-suggestions="searchStudents"
                placeholder="Type student name, roll number, or admission number..."
                class="w-full custom-autocomplete"
                size="large"
                @select="handleStudentSelect"
                :disabled="!filters.exam_id"
              >
              <template #prefix>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </template>
              <template #default="{ item }">
                <div class="flex items-center gap-3 py-2">
                  <el-avatar :size="40" :src="item.avatar">
                    {{ item.first_name?.[0] }}
                  </el-avatar>
                  <div class="flex-1">
                    <div class="font-semibold text-gray-900">{{ item.first_name }} {{ item.last_name }}</div>
                    <div class="text-xs text-gray-500">
                      Roll: <strong>{{ item.roll_number }}</strong> | Class: <strong>{{ item.class_name }}</strong>
                    </div>
                  </div>
                </div>
              </template>
              </el-autocomplete>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2: Student Detail + Marks Entry -->
    <div v-if="selectedStudent" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Student Profile Card (Left Side - Sticky) -->
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 sticky top-4">
          <div class="text-center mb-6">
            <el-avatar :size="100" :src="selectedStudent.avatar" class="mb-4">
              {{ selectedStudent.first_name?.[0] }}
            </el-avatar>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {{ selectedStudent.first_name }} {{ selectedStudent.last_name }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ selectedStudent.class_name }}
            </p>
          </div>

          <div class="space-y-3">
            <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
              <span class="text-sm text-gray-600 dark:text-gray-400">Roll Number</span>
              <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ selectedStudent.roll_number }}</span>
            </div>
            <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
              <span class="text-sm text-gray-600 dark:text-gray-400">Admission No</span>
              <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ selectedStudent.admission_no || 'N/A' }}</span>
            </div>
            <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
              <span class="text-sm text-gray-600 dark:text-gray-400">Section</span>
              <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ selectedStudent.section_name || 'N/A' }}</span>
            </div>
            <div class="flex items-center justify-between py-2">
              <span class="text-sm text-gray-600 dark:text-gray-400">Session</span>
              <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ selectedSession?.name }}</span>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Stats</h4>
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                <div class="text-xs text-blue-600 dark:text-blue-400 mb-1">Subjects</div>
                <div class="text-lg font-bold text-blue-700 dark:text-blue-300">{{ subjectMarks.length }}</div>
              </div>
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                <div class="text-xs text-green-600 dark:text-green-400 mb-1">Entered</div>
                <div class="text-lg font-bold text-green-700 dark:text-green-300">{{ enteredCount }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Marks Table (Right Side) -->
      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">Exam Marks</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ selectedExam?.name }}</p>
            </div>
            
            <!-- Autosave Indicator -->
            <div v-if="isSaving || lastSaved" class="flex items-center gap-2 text-sm">
              <el-icon v-if="isSaving" class="animate-spin text-blue-500"><Loading /></el-icon>
              <el-icon v-else-if="lastSaved" class="text-green-500"><CircleCheck /></el-icon>
              <span :class="isSaving ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'">
                {{ isSaving ? 'Saving...' : `Saved ${lastSaved}` }}
              </span>
            </div>
          </div>

          <!-- Marks Table -->
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead class="bg-gray-100 dark:bg-gray-900">
                <tr>
                  <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold w-8">#</th>
                  <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold">Subject</th>
                  <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold w-24">Total</th>
                  <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold w-32">Obtained</th>
                  <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold w-32">Status</th>
                  <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold w-48">Absent Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(mark, index) in subjectMarks" 
                  :key="mark.subject_id"
                  :class="[
                    'hover:bg-gray-50 dark:hover:bg-gray-900/50',
                    mark.status === 'absent' ? 'bg-red-50 dark:bg-red-900/10' : '',
                    mark.status === 'exempt' ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''
                  ]"
                >
                  <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-center">{{ index + 1 }}</td>
                  <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm font-medium">
                    {{ mark.subject_name }}
                  </td>
                  <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {{ mark.total_marks }}
                  </td>
                  <td class="border border-gray-300 dark:border-gray-600 px-4 py-3">
                    <el-input 
                      v-model="mark.obtained_marks"
                      type="number"
                      :min="0"
                      :max="mark.total_marks"
                      placeholder="0"
                      class="w-full"
                      :disabled="mark.status !== 'present'"
                      @input="handleMarkChange(mark)"
                    />
                  </td>
                  <td class="border border-gray-300 dark:border-gray-600 px-4 py-3">
                    <el-select v-model="mark.status" class="w-full" @change="handleStatusChange(mark)">
                      <el-option label="Present" value="present" />
                      <el-option label="Absent" value="absent" />
                      <el-option label="Exempt" value="exempt" />
                    </el-select>
                  </td>
                  <td class="border border-gray-300 dark:border-gray-600 px-4 py-3">
                    <div v-if="mark.status === 'absent'" class="space-y-2">
                      <el-select v-model="mark.absent_reason" placeholder="Select Reason" class="w-full" @change="handleMarkChange(mark)">
                        <el-option label="Sick" value="sick" />
                        <el-option label="Family Emergency" value="family_emergency" />
                        <el-option label="Leave" value="leave" />
                        <el-option label="Other" value="other" />
                      </el-select>
                      <el-input 
                        v-if="mark.absent_reason === 'other'"
                        v-model="mark.absent_note"
                        placeholder="Specify reason..."
                        class="w-full"
                        @input="handleMarkChange(mark)"
                      />
                    </div>
                    <span v-else class="text-xs text-gray-400">-</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Actions -->
          <div class="mt-6 flex items-center justify-between">
            <div class="text-sm text-gray-600 dark:text-gray-400">
              <span class="font-semibold">{{ enteredCount }}</span> of <span class="font-semibold">{{ subjectMarks.length }}</span> subjects entered
            </div>
            
            <div class="flex gap-2">
              <button 
                @click="resetSelection"
                type="button"
                class="h-9 px-6 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium rounded-full border border-gray-200 dark:border-gray-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Change Student
              </button>
              <button 
                @click="submitMarks"
                type="button"
                :disabled="isSubmitting"
                class="h-9 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg v-if="!isSubmitting" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <svg v-else class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Submit All Marks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <el-icon class="animate-spin text-4xl text-orange-500"><Loading /></el-icon>
    </div>
  </PageShell>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { User, Loading, CircleCheck } from '@element-plus/icons-vue'
import PageShell from '@/components/common/PageShell.vue'
import MarksheetHeader from '@/components/exams/MarksheetHeader.vue'
import api from '@/utils/axios'
import { debounce } from 'lodash'

const router = useRouter()
const toast = useToast()

const loading = ref(false)
const isSaving = ref(false)
const isSubmitting = ref(false)
const lastSaved = ref('')

const filters = ref({
  session_id: '',
  exam_id: ''
})

const sessions = ref([])
const exams = ref([])
const studentSearch = ref('')
const selectedStudent = ref(null)
const subjectMarks = ref([])
const originalMarks = ref([])

const selectedSession = computed(() => sessions.value.find(s => s.id === filters.value.session_id))
const selectedExam = computed(() => exams.value.find(e => e.id === filters.value.exam_id))

const enteredCount = computed(() => {
  return subjectMarks.value.filter(m => m.obtained_marks || m.obtained_marks === 0 || m.status !== 'present').length
})

const hasChanges = computed(() => {
  return JSON.stringify(subjectMarks.value) !== JSON.stringify(originalMarks.value)
})

// Tenant isolation
const getTenantFilter = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return { merchant_id: user.merchant_id || user.school_id }
}

const loadSessions = async () => {
  try {
    const response = await api.get('/sessions', { params: getTenantFilter() })
    if (response.data.success) {
      let sessionsData = response.data.data || response.data.result || []
      
      // Handle if result is an object with data property
      if (sessionsData && typeof sessionsData === 'object' && sessionsData.data) {
        sessionsData = sessionsData.data
      }
      
      // Ensure it's an array
      if (!Array.isArray(sessionsData)) {
        sessionsData = []
      }
      
      sessions.value = sessionsData.filter(s => s && !s.deleted_at)
    }
  } catch (error) {
    console.error('Failed to load sessions:', error)
    sessions.value = []
  }
}

const loadExams = async () => {
  if (!filters.value.session_id) return
  try {
    const response = await api.get('/exams', { 
      params: { 
        session_id: filters.value.session_id,
        ...getTenantFilter()
      } 
    })
    if (response.data.success || response.data.status) {
      exams.value = (response.data.result || response.data.data || []).filter(e => !e.deleted_at)
    }
  } catch (error) {
    console.error('Failed to load exams:', error)
  }
}

const searchStudents = async (queryString, cb) => {
  if (!queryString || !filters.value.exam_id) {
    cb([])
    return
  }
  try {
    const response = await api.get('/students', {
      params: {
        search: queryString,
        session_id: filters.value.session_id,
        ...getTenantFilter()
      }
    })
    const students = (response.data.result?.data || response.data.data || [])
      .filter(s => !s.deleted_at)
      .map(s => ({
        ...s,
        value: `${s.first_name} ${s.last_name}`,
        class_name: s.class?.name || 'N/A',
        section_name: s.section?.name || 'N/A'
      }))
    cb(students)
  } catch (error) {
    console.error('Failed to search students:', error)
    cb([])
  }
}

const handleStudentSelect = async (student) => {
  selectedStudent.value = student
  loading.value = true
  
  try {
    // Load student's marks for all subjects
    const response = await api.get('/exam-marks/student-marks', {
      params: {
        exam_id: filters.value.exam_id,
        student_id: student.id,
        ...getTenantFilter()
      }
    })
    
    if (response.data.success) {
      subjectMarks.value = response.data.data.map(mark => ({
        ...mark,
        status: mark.status || 'present',
        absent_reason: mark.absent_reason || '',
        absent_note: mark.absent_note || ''
      }))
      originalMarks.value = JSON.parse(JSON.stringify(subjectMarks.value))
    }
  } catch (error) {
    toast.error('Failed to load student marks')
    console.error('Load marks error:', error)
  } finally {
    loading.value = false
  }
}

const handleMarkChange = debounce(async () => {
  await saveDraft()
}, 2000)

const handleStatusChange = (mark) => {
  if (mark.status === 'absent') {
    mark.obtained_marks = 0
  } else if (mark.status === 'exempt') {
    mark.obtained_marks = ''
  }
  handleMarkChange()
}

const saveDraft = async () => {
  isSaving.value = true
  try {
    await api.post('/exam-marks/save-student-draft', {
      exam_id: filters.value.exam_id,
      student_id: selectedStudent.value.id,
      marks: subjectMarks.value,
      ...getTenantFilter()
    })
    lastSaved.value = new Date().toLocaleTimeString()
  } catch (error) {
    console.error('Autosave failed:', error)
  } finally {
    isSaving.value = false
  }
}

const submitMarks = async () => {
  isSubmitting.value = true
  try {
    const response = await api.post('/exam-marks/submit-student-marks', {
      exam_id: filters.value.exam_id,
      student_id: selectedStudent.value.id,
      marks: subjectMarks.value,
      ...getTenantFilter()
    })
    
    if (response.data.success) {
      toast.success('Marks submitted successfully!')
      originalMarks.value = JSON.parse(JSON.stringify(subjectMarks.value))
    }
  } catch (error) {
    toast.error('Failed to submit marks')
    console.error('Submit error:', error)
  } finally {
    isSubmitting.value = false
  }
}

const resetSelection = () => {
  selectedStudent.value = null
  studentSearch.value = ''
  subjectMarks.value = []
  originalMarks.value = []
  lastSaved.value = ''
}

onMounted(() => {
  loadSessions()
})
</script>

<style scoped>
/* Sticky sidebar on desktop */
@media (min-width: 1024px) {
  .sticky {
    position: sticky;
    top: 1rem;
  }
}

/* Modern font for labels */
.modern-font {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  letter-spacing: -0.01em;
}

/* Custom autocomplete styling */
:deep(.custom-autocomplete .el-input__wrapper) {
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  height: 36px !important;
  border-bottom: 2px solid rgb(221 214 254) !important;
}

:deep(.dark .custom-autocomplete .el-input__wrapper) {
  border-bottom-color: rgb(107 33 168) !important;
}

:deep(.custom-autocomplete .el-input__wrapper.is-focus) {
  box-shadow: none !important;
  border-bottom-color: rgb(168 85 247) !important;
}

:deep(.custom-autocomplete .el-input__inner) {
  font-size: 0.875rem !important;
  font-weight: 300 !important;
  color: rgb(75 85 99) !important;
}

:deep(.dark .custom-autocomplete .el-input__inner) {
  color: rgb(209 213 219) !important;
}
</style>
