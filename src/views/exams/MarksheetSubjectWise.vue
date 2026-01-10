<template>
  <PageShell 
    title="Subject-wise Marksheet Entry"
    :breadcrumbs="[
      { label: 'Exams', to: '/exams/add-marksheet-landing' },
      { label: 'Add Marksheet', to: '/exams/add-marksheet-landing' },
      { label: 'Subject-wise' }
    ]"
  >
    <!-- Step Wizard -->
    <div class="w-full mb-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div v-for="(step, index) in steps" :key="index" class="flex items-center" :class="{ 'flex-1': index < steps.length - 1 }">
            <div class="flex items-center gap-3">
              <div :class="[
                'w-10 h-10 rounded-full flex items-center justify-center font-bold',
                currentStep > index ? 'bg-green-500 text-white' :
                currentStep === index ? 'bg-purple-500 text-white' :
                'bg-gray-200 dark:bg-gray-700 text-gray-500'
              ]">
                <el-icon v-if="currentStep > index"><CircleCheck /></el-icon>
                <span v-else>{{ index + 1 }}</span>
              </div>
              <div>
                <div :class="[
                  'font-semibold text-sm',
                  currentStep >= index ? 'text-gray-900 dark:text-white' : 'text-gray-500'
                ]">{{ step.title }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ step.subtitle }}</div>
              </div>
            </div>
            <div v-if="index < steps.length - 1" class="flex-1 h-0.5 bg-gray-200 dark:bg-gray-700 mx-4">
              <div :class="[
                'h-full transition-all duration-300',
                currentStep > index ? 'bg-green-500 w-full' : 'bg-transparent w-0'
              ]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 1: Selection -->
    <div v-show="currentStep === 0" class="w-full mb-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Select Filters</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Session -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Session <span class="text-red-500">*</span>
            </label>
            <el-select v-model="filters.session_id" placeholder="Select Session" class="w-full" @change="loadExams">
              <el-option 
                v-for="session in sessions" 
                :key="session.id" 
                :label="session.name" 
                :value="session.id" 
              />
            </el-select>
          </div>

          <!-- Exam/Term -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Exam / Term <span class="text-red-500">*</span>
            </label>
            <el-select v-model="filters.exam_id" placeholder="Select Exam" class="w-full" :disabled="!filters.session_id" @change="loadClasses">
              <el-option 
                v-for="exam in exams" 
                :key="exam.id" 
                :label="exam.name" 
                :value="exam.id" 
              />
            </el-select>
          </div>

          <!-- Class -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Class <span class="text-red-500">*</span>
            </label>
            <el-select v-model="filters.class_id" placeholder="Select Class" class="w-full" :disabled="!filters.exam_id" @change="loadSections">
              <el-option 
                v-for="cls in classes" 
                :key="cls.id" 
                :label="cls.name" 
                :value="cls.id" 
              />
            </el-select>
          </div>

          <!-- Sections (Multi-select) -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Sections <span class="text-red-500">*</span>
            </label>
            <el-select 
              v-model="filters.section_ids" 
              multiple 
              collapse-tags
              placeholder="Select Sections" 
              class="w-full" 
              :disabled="!filters.class_id"
              @change="loadSubjects"
            >
              <el-option 
                v-for="section in sections" 
                :key="section.id" 
                :label="section.name" 
                :value="section.id" 
              />
            </el-select>
          </div>

          <!-- Subjects (Multi-select) -->
          <div class="md:col-span-2">
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Subjects <span class="text-red-500">*</span>
            </label>
            <el-select 
              v-model="filters.subject_ids" 
              multiple 
              collapse-tags
              placeholder="Select Subjects" 
              class="w-full" 
              :disabled="!filters.section_ids.length"
            >
              <el-option 
                v-for="subject in subjects" 
                :key="subject.id" 
                :label="subject.name" 
                :value="subject.id" 
              />
            </el-select>
            <div class="mt-2">
              <el-checkbox v-model="filters.include_optional">Include Optional Subjects</el-checkbox>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <el-button 
            type="primary" 
            @click="proceedToTotalMarks"
            :disabled="!filters.session_id || !filters.exam_id || !filters.class_id || !filters.section_ids.length || !filters.subject_ids.length"
          >
            Next: Set Total Marks
          </el-button>
        </div>
      </div>
    </div>

    <!-- Step 2: Total Marks -->
    <div v-show="currentStep === 1" class="w-full mb-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Set Total Marks (One Time)</h3>
        
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4 border border-blue-200 dark:border-blue-800">
          <div class="flex items-start gap-3">
            <el-icon class="text-blue-600 dark:text-blue-400 text-xl mt-0.5"><InfoFilled /></el-icon>
            <div class="text-sm text-blue-800 dark:text-blue-300">
              <strong>Note:</strong> Total marks will apply to ALL selected subjects by default. You can customize per-subject totals if needed.
            </div>
          </div>
        </div>

        <div class="max-w-md">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Total Marks (Default for all subjects) <span class="text-red-500">*</span>
          </label>
          <el-input 
            v-model="totalMarks" 
            type="number" 
            placeholder="e.g., 100"
            class="mb-4"
          />
          
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            This will be applied to: <strong>{{ filters.subject_ids.length }} selected subject(s)</strong>
          </div>
        </div>

        <div class="mt-6 flex justify-between">
          <el-button @click="currentStep = 0">Back</el-button>
          <el-button 
            type="primary" 
            @click="loadMarksheetGrid"
            :disabled="!totalMarks || totalMarks <= 0"
          >
            Generate Grid
          </el-button>
        </div>
      </div>
    </div>

    <!-- Step 3: Marks Entry Grid -->
    <div v-show="currentStep === 2" class="w-full mb-6">
      <!-- Grid Controls -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">Marks Entry Grid</h3>
          
          <div class="flex items-center gap-3">
            <!-- Autosave Indicator -->
            <div class="flex items-center gap-2 text-sm">
              <el-icon v-if="isSaving" class="animate-spin text-blue-500"><Loading /></el-icon>
              <el-icon v-else-if="lastSaved" class="text-green-500"><CircleCheck /></el-icon>
              <span :class="isSaving ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'">
                {{ isSaving ? 'Saving...' : lastSaved ? `Saved ${lastSaved}` : 'Not saved' }}
              </span>
            </div>

            <!-- Subject Tabs (if many subjects) -->
            <el-select v-if="filters.subject_ids.length > 1" v-model="activeSubjectId" placeholder="Select Subject" class="w-48">
              <el-option 
                v-for="subject in selectedSubjects" 
                :key="subject.id" 
                :label="subject.name" 
                :value="subject.id" 
              />
            </el-select>
          </div>
        </div>

        <!-- Grid Table -->
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-900">
                <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold">Roll No</th>
                <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold">Student Name</th>
                <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold">Total Marks</th>
                <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold">Obtained Marks</th>
                <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold">Status</th>
                <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold">Absent Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="student in students" 
                :key="student.id"
                :class="[
                  'hover:bg-gray-50 dark:hover:bg-gray-900/50',
                  getMarkEntry(student.id)?.status === 'absent' ? 'bg-red-50 dark:bg-red-900/10' : '',
                  getMarkEntry(student.id)?.status === 'exempt' ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''
                ]"
              >
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm">
                  {{ student.roll_number || '-' }}
                </td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm font-medium">
                  {{ student.first_name }} {{ student.last_name }}
                </td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {{ totalMarks }}
                </td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-3">
                  <el-input 
                    v-model="getMarkEntry(student.id).obtained_marks"
                    type="number"
                    :min="0"
                    :max="totalMarks"
                    placeholder="0"
                    class="w-24"
                    :disabled="getMarkEntry(student.id)?.status !== 'present'"
                    @input="handleMarkInput(student.id)"
                    :class="[
                      validateMarks(getMarkEntry(student.id)?.obtained_marks) ? '' : 'border-red-500'
                    ]"
                  />
                </td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-3">
                  <el-select 
                    v-model="getMarkEntry(student.id).status" 
                    placeholder="Status"
                    class="w-32"
                    @change="handleStatusChange(student.id)"
                  >
                    <el-option label="Present" value="present" />
                    <el-option label="Absent" value="absent" />
                    <el-option label="Exempt" value="exempt" />
                  </el-select>
                </td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-3">
                  <div v-if="getMarkEntry(student.id)?.status === 'absent'">
                    <el-select 
                      v-model="getMarkEntry(student.id).absent_reason"
                      placeholder="Select Reason"
                      class="w-40 mb-2"
                      @change="debouncedSave"
                    >
                      <el-option label="Sick" value="sick" />
                      <el-option label="Family Emergency" value="family_emergency" />
                      <el-option label="Other" value="other" />
                    </el-select>
                    <el-input 
                      v-if="getMarkEntry(student.id).absent_reason === 'other'"
                      v-model="getMarkEntry(student.id).absent_note"
                      placeholder="Specify reason..."
                      class="w-40"
                      @input="debouncedSave"
                    />
                  </div>
                  <span v-else class="text-xs text-gray-400">-</span>
                </td>
              </tr>
            </tbody>
          </table>

          <EmptyState
            v-if="students.length === 0 && !loading"
            title="No students found"
            description="Please check your filters or add students to the selected class/section"
            :icon="User"
            icon-color="gray"
          />
        </div>

        <!-- Pagination -->
        <div v-if="students.length > 0" class="mt-4 flex items-center justify-between">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Showing {{ students.length }} student(s)
          </div>
          <div class="flex items-center gap-2">
            <el-button size="small" @click="currentStep = 1">Back to Total Marks</el-button>
            <el-button type="success" size="small" @click="submitMarks" :loading="isSubmitting">
              Submit All Marks
            </el-button>
          </div>
        </div>
      </div>
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
import { 
  CircleCheck, InfoFilled, Loading, User
} from '@element-plus/icons-vue'
import PageShell from '@/components/common/PageShell.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import api from '@/utils/axios'
import { debounce } from 'lodash'

const router = useRouter()
const toast = useToast()

const currentStep = ref(0)
const loading = ref(false)
const isSaving = ref(false)
const isSubmitting = ref(false)
const lastSaved = ref('')

const steps = [
  { title: 'Select Filters', subtitle: 'Session, Exam, Class, Sections, Subjects' },
  { title: 'Set Total Marks', subtitle: 'One-time entry for all subjects' },
  { title: 'Enter Marks', subtitle: 'Grid entry with autosave' }
]

const filters = ref({
  session_id: '',
  exam_id: '',
  class_id: '',
  section_ids: [],
  subject_ids: [],
  include_optional: false
})

const totalMarks = ref(100)
const activeSubjectId = ref(null)

const sessions = ref([])
const exams = ref([])
const classes = ref([])
const sections = ref([])
const subjects = ref([])
const students = ref([])
const marksData = ref({}) // { student_id: { obtained_marks, status, absent_reason, absent_note } }

const selectedSubjects = computed(() => {
  return subjects.value.filter(s => filters.value.subject_ids.includes(s.id))
})

// Tenant isolation - automatically filter by current merchant_id
const getTenantFilter = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return { merchant_id: user.merchant_id || user.school_id }
}

const loadSessions = async () => {
  try {
    const response = await api.get('/sessions', { 
      params: getTenantFilter() 
    })
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
      
      sessions.value = sessionsData.filter(s => s && !s.deleted_at) // Soft delete check
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

const loadClasses = async () => {
  if (!filters.value.exam_id) return
  try {
    const response = await api.get('/classes', { 
      params: { 
        session_id: filters.value.session_id,
        ...getTenantFilter()
      } 
    })
    if (response.data.success) {
      classes.value = response.data.data.filter(c => !c.deleted_at)
    }
  } catch (error) {
    console.error('Failed to load classes:', error)
  }
}

const loadSections = async () => {
  if (!filters.value.class_id) return
  try {
    const response = await api.get('/sections', { 
      params: { 
        class_id: filters.value.class_id,
        ...getTenantFilter()
      } 
    })
    if (response.data.success) {
      sections.value = response.data.data.filter(s => !s.deleted_at)
    }
  } catch (error) {
    console.error('Failed to load sections:', error)
  }
}

const loadSubjects = async () => {
  if (!filters.value.section_ids.length) return
  try {
    const response = await api.post('/exam-marks/fetch-subjects', {
      exam_id: filters.value.exam_id,
      class_id: filters.value.class_id,
      section_ids: filters.value.section_ids,
      include_optional: filters.value.include_optional,
      ...getTenantFilter()
    })
    if (response.data.success) {
      subjects.value = response.data.data.filter(s => !s.deleted_at)
    }
  } catch (error) {
    console.error('Failed to load subjects:', error)
  }
}

const proceedToTotalMarks = () => {
  currentStep.value = 1
}

const loadMarksheetGrid = async () => {
  loading.value = true
  try {
    const response = await api.post('/exam-marks/fetch-students', {
      exam_id: filters.value.exam_id,
      class_id: filters.value.class_id,
      section_ids: filters.value.section_ids,
      ...getTenantFilter()
    })
    if (response.data.success) {
      students.value = response.data.data.filter(s => !s.deleted_at)
      
      // Initialize marks data
      students.value.forEach(student => {
        if (!marksData.value[student.id]) {
          marksData.value[student.id] = {
            obtained_marks: '',
            status: 'present',
            absent_reason: '',
            absent_note: ''
          }
        }
      })
      
      activeSubjectId.value = filters.value.subject_ids[0]
      currentStep.value = 2
    }
  } catch (error) {
    toast.error('Failed to load students')
    console.error('Load students error:', error)
  } finally {
    loading.value = false
  }
}

const getMarkEntry = (studentId) => {
  if (!marksData.value[studentId]) {
    marksData.value[studentId] = {
      obtained_marks: '',
      status: 'present',
      absent_reason: '',
      absent_note: ''
    }
  }
  return marksData.value[studentId]
}

const validateMarks = (marks) => {
  if (!marks && marks !== 0) return true
  return marks >= 0 && marks <= totalMarks.value
}

const handleMarkInput = (studentId) => {
  const entry = getMarkEntry(studentId)
  if (!validateMarks(entry.obtained_marks)) {
    toast.warning(`Marks must be between 0 and ${totalMarks.value}`)
  }
  debouncedSave()
}

const handleStatusChange = (studentId) => {
  const entry = getMarkEntry(studentId)
  if (entry.status === 'absent') {
    entry.obtained_marks = 0
  } else if (entry.status === 'exempt') {
    entry.obtained_marks = ''
  }
  debouncedSave()
}

const saveMarks = async () => {
  isSaving.value = true
  try {
    await api.post('/exam-marks/save-draft', {
      exam_id: filters.value.exam_id,
      subject_id: activeSubjectId.value,
      total_marks: totalMarks.value,
      marks: Object.entries(marksData.value).map(([student_id, data]) => ({
        student_id,
        ...data
      })),
      ...getTenantFilter()
    })
    lastSaved.value = new Date().toLocaleTimeString()
  } catch (error) {
    console.error('Autosave failed:', error)
  } finally {
    isSaving.value = false
  }
}

const debouncedSave = debounce(saveMarks, 2000)

const submitMarks = async () => {
  isSubmitting.value = true
  try {
    const response = await api.post('/exam-marks/submit', {
      exam_id: filters.value.exam_id,
      subject_id: activeSubjectId.value,
      total_marks: totalMarks.value,
      marks: Object.entries(marksData.value).map(([student_id, data]) => ({
        student_id,
        ...data
      })),
      ...getTenantFilter()
    })
    
    if (response.data.success) {
      toast.success('Marks submitted successfully!')
      router.push('/exams/add-marksheet-landing')
    }
  } catch (error) {
    toast.error('Failed to submit marks')
    console.error('Submit marks error:', error)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  loadSessions()
})
</script>

<style scoped>
/* Grid table styling */
table {
  font-size: 0.875rem;
}

/* Input styling for better UX */
:deep(.el-input.border-red-500 .el-input__wrapper) {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 1px #ef4444 !important;
}
</style>
