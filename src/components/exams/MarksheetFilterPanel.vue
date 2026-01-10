<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <div class="flex items-center justify-between mb-6">
      <div class="flex flex-col">
        <h3 class="text-base font-medium text-gray-900 dark:text-white tracking-tight">
          {{ title || 'Select Filters' }}
        </h3>
        <div class="h-[2px] bg-purple-200 dark:bg-purple-800 w-24 mt-1"></div>
      </div>
      <div class="flex gap-2">
        <slot name="header-actions"></slot>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Session (Always shown) -->
      <div v-if="!hideSession" class="flex flex-col">
        <label class="mb-1 text-base font-normal text-black dark:text-white modern-font">
          Session <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <select 
            v-model="localFilters.session_id" 
            @change="handleSessionChange"
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

      <!-- Exam/Term (Always shown) -->
      <div v-if="!hideExam" class="flex flex-col">
        <label class="mb-1 text-base font-normal text-black dark:text-white modern-font">
          Exam / Term <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <select 
            v-model="localFilters.exam_id" 
            @change="handleExamChange"
            :disabled="!localFilters.session_id"
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

      <!-- Class (Shown for class/subject modes) -->
      <div v-if="mode === 'class' || mode === 'subject'" class="flex flex-col">
        <label class="mb-1 text-base font-normal text-black dark:text-white modern-font">
          Class <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <select 
            v-model="localFilters.class_id" 
            @change="handleClassChange"
            :disabled="!localFilters.exam_id"
            class="h-9 border-0 bg-transparent px-0 text-sm font-light text-gray-600 dark:text-gray-300 focus:ring-0 focus:outline-none w-full appearance-none pr-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Select Class</option>
            <option v-for="cls in classes" :key="cls.id" :value="cls.id">
              {{ cls.name }}
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

      <!-- Section (Single select for class mode) -->
      <div v-if="mode === 'class'" class="flex flex-col">
        <label class="mb-1 text-base font-normal text-black dark:text-white modern-font">
          Section <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <select 
            v-model="localFilters.section_id" 
            @change="handleSectionChange"
            :disabled="!localFilters.class_id"
            class="h-9 border-0 bg-transparent px-0 text-sm font-light text-gray-600 dark:text-gray-300 focus:ring-0 focus:outline-none w-full appearance-none pr-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Select Section</option>
            <option v-for="section in sections" :key="section.id" :value="section.id">
              {{ section.name }}
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

      <!-- Sections (Multi-select for subject mode) -->
      <div v-if="mode === 'subject'" class="flex flex-col md:col-span-2">
        <label class="mb-1 text-base font-normal text-black dark:text-white modern-font">
          Sections <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <el-select 
            v-model="localFilters.section_ids" 
            multiple 
            collapse-tags
            collapse-tags-tooltip
            placeholder="Select Sections" 
            :disabled="!localFilters.class_id"
            @change="handleSectionChange"
            class="w-full custom-multi-select"
          >
            <el-option 
              v-for="section in sections" 
              :key="section.id" 
              :label="section.name" 
              :value="section.id" 
            />
          </el-select>
        </div>
      </div>

      <!-- Student Search (For student mode) -->
      <div v-if="mode === 'student'" class="md:col-span-2 lg:col-span-3 flex flex-col">
        <label class="mb-1 text-base font-normal text-black dark:text-white modern-font">
          Search Student <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <el-autocomplete
            v-model="studentSearch"
            :fetch-suggestions="searchStudents"
            placeholder="Type student name, roll number, or admission number..."
            @select="handleStudentSelect"
            :disabled="!localFilters.exam_id"
            class="w-full custom-autocomplete"
          >
            <template #prefix>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </template>
            <template #default="{ item }">
              <div class="flex items-center gap-3 py-2">
                <el-avatar :size="32" :src="item.avatar">{{ item.first_name?.[0] }}</el-avatar>
                <div>
                  <div class="font-semibold">{{ item.first_name }} {{ item.last_name }}</div>
                  <div class="text-xs text-gray-500">Roll: {{ item.roll_number }} | Class: {{ item.class_name }}</div>
                </div>
              </div>
            </template>
          </el-autocomplete>
        </div>
      </div>

      <!-- Family/Guardian Search (For family mode) -->
      <div v-if="mode === 'family'" class="md:col-span-2 lg:col-span-3 flex flex-col">
        <label class="mb-1 text-base font-normal text-black dark:text-white modern-font">
          Search Family / Guardian <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <el-autocomplete
            v-model="familySearch"
            :fetch-suggestions="searchFamilies"
            placeholder="Type guardian name, phone, or admission number..."
            @select="handleFamilySelect"
            :disabled="!localFilters.exam_id"
            class="w-full custom-autocomplete"
          >
            <template #prefix>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </template>
            <template #default="{ item }">
              <div class="flex items-center gap-3 py-2">
                <svg class="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
                <div>
                  <div class="font-semibold">{{ item.guardian_name }}</div>
                  <div class="text-xs text-gray-500">Phone: {{ item.phone }} | {{ item.child_count }} child(ren)</div>
                </div>
              </div>
            </template>
          </el-autocomplete>
        </div>
      </div>

      <!-- Subjects (Multi-select for subject mode) -->
      <div v-if="mode === 'subject' && showSubjects" class="md:col-span-2 lg:col-span-3 flex flex-col">
        <label class="mb-1 text-base font-normal text-black dark:text-white modern-font">
          Subjects <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <el-select 
            v-model="localFilters.subject_ids" 
            multiple 
            collapse-tags
            collapse-tags-tooltip
            placeholder="Select Subjects" 
            :disabled="!localFilters.section_ids || localFilters.section_ids.length === 0"
            class="w-full custom-multi-select"
          >
            <el-option 
              v-for="subject in subjects" 
              :key="subject.id" 
              :label="subject.name" 
              :value="subject.id" 
            />
          </el-select>
        </div>
        <div class="mt-3 flex items-center">
          <label class="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              v-model="localFilters.include_optional"
              class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span class="text-sm font-normal text-gray-700 dark:text-gray-300">Include Optional Subjects</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Action Buttons - Matching ClassList Style -->
    <div class="mt-6 flex justify-end gap-2">
      <slot name="actions">
        <button 
          @click="handleClear"
          type="button"
          class="h-9 px-6 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium rounded-full border border-gray-200 dark:border-gray-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
          Clear
        </button>
        <button 
          @click="handleApply"
          type="button"
          :disabled="loading"
          class="h-9 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="!loading" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <svg v-else class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Apply Filters
        </button>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { Close, House } from '@element-plus/icons-vue'
import api from '@/utils/axios'
import { useToast } from 'vue-toastification'

const props = defineProps({
  mode: { 
    type: String, 
    required: true,
    validator: (value) => ['subject', 'class', 'student', 'family'].includes(value)
  },
  title: { type: String, default: '' },
  showSubjects: { type: Boolean, default: false },
  hideSession: { type: Boolean, default: false },
  hideExam: { type: Boolean, default: false },
  showClearButton: { type: Boolean, default: true },
  modelValue: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:modelValue', 'apply', 'clear', 'student-selected', 'family-selected'])

const toast = useToast()
const loading = ref(false)

const localFilters = ref({
  session_id: '',
  exam_id: '',
  class_id: '',
  section_id: '', // For class mode (single)
  section_ids: [], // For subject mode (multiple)
  subject_ids: [],
  student_id: '',
  family_id: '',
  include_optional: false
})

const sessions = ref([])
const exams = ref([])
const classes = ref([])
const sections = ref([])
const subjects = ref([])

const studentSearch = ref('')
const familySearch = ref('')

// Tenant isolation helper
const getTenantFilter = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return { merchant_id: user.merchant_id || user.school_id }
}

// Load sessions
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

// Load exams based on session
const loadExams = async () => {
  if (!localFilters.value.session_id) return
  try {
    const response = await api.get('/exams', { 
      params: { 
        session_id: localFilters.value.session_id,
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

// Load classes based on exam
const loadClasses = async () => {
  if (!localFilters.value.exam_id) return
  try {
    const response = await api.get('/classes', { 
      params: { 
        session_id: localFilters.value.session_id,
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

// Load sections based on class
const loadSections = async () => {
  if (!localFilters.value.class_id) return
  try {
    const response = await api.get('/sections', { 
      params: { 
        class_id: localFilters.value.class_id,
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

// Load subjects (for subject mode)
const loadSubjects = async () => {
  if (props.mode !== 'subject' || !localFilters.value.section_ids.length) return
  try {
    const response = await api.post('/exam-marks/fetch-subjects', {
      exam_id: localFilters.value.exam_id,
      class_id: localFilters.value.class_id,
      section_ids: localFilters.value.section_ids,
      include_optional: localFilters.value.include_optional,
      ...getTenantFilter()
    })
    if (response.data.success) {
      subjects.value = response.data.data.filter(s => !s.deleted_at)
    }
  } catch (error) {
    console.error('Failed to load subjects:', error)
  }
}

// Search students (for student mode)
const searchStudents = async (queryString, cb) => {
  if (!queryString || !localFilters.value.exam_id) {
    cb([])
    return
  }
  try {
    const response = await api.get('/students', {
      params: {
        search: queryString,
        session_id: localFilters.value.session_id,
        ...getTenantFilter()
      }
    })
    const students = (response.data.result?.data || response.data.data || [])
      .filter(s => !s.deleted_at)
      .map(s => ({
        ...s,
        value: `${s.first_name} ${s.last_name}`,
        class_name: s.class?.name || 'N/A'
      }))
    cb(students)
  } catch (error) {
    console.error('Failed to search students:', error)
    cb([])
  }
}

// Search families (for family mode)
const searchFamilies = async (queryString, cb) => {
  if (!queryString || !localFilters.value.exam_id) {
    cb([])
    return
  }
  try {
    const response = await api.get('/families', {
      params: {
        search: queryString,
        session_id: localFilters.value.session_id,
        ...getTenantFilter()
      }
    })
    const families = (response.data.data || [])
      .filter(f => !f.deleted_at)
      .map(f => ({
        ...f,
        value: f.guardian_name
      }))
    cb(families)
  } catch (error) {
    console.error('Failed to search families:', error)
    cb([])
  }
}

// Event handlers
const handleSessionChange = () => {
  localFilters.value.exam_id = ''
  localFilters.value.class_id = ''
  localFilters.value.section_id = ''
  localFilters.value.section_ids = []
  localFilters.value.subject_ids = []
  exams.value = []
  classes.value = []
  sections.value = []
  subjects.value = []
  loadExams()
}

const handleExamChange = () => {
  localFilters.value.class_id = ''
  localFilters.value.section_id = ''
  localFilters.value.section_ids = []
  localFilters.value.subject_ids = []
  classes.value = []
  sections.value = []
  subjects.value = []
  loadClasses()
}

const handleClassChange = () => {
  localFilters.value.section_id = ''
  localFilters.value.section_ids = []
  localFilters.value.subject_ids = []
  sections.value = []
  subjects.value = []
  loadSections()
}

const handleSectionChange = () => {
  localFilters.value.subject_ids = []
  subjects.value = []
  if (props.mode === 'subject') {
    loadSubjects()
  }
}

const handleStudentSelect = (student) => {
  localFilters.value.student_id = student.id
  emit('student-selected', student)
}

const handleFamilySelect = (family) => {
  localFilters.value.family_id = family.id
  emit('family-selected', family)
}

const handleApply = () => {
  emit('update:modelValue', { ...localFilters.value })
  emit('apply', { ...localFilters.value })
}

const handleClear = () => {
  localFilters.value = {
    session_id: '',
    exam_id: '',
    class_id: '',
    section_id: '',
    section_ids: [],
    subject_ids: [],
    student_id: '',
    family_id: '',
    include_optional: false
  }
  studentSearch.value = ''
  familySearch.value = ''
  exams.value = []
  classes.value = []
  sections.value = []
  subjects.value = []
  emit('clear')
}

// Initialize
onMounted(() => {
  loadSessions()
  if (props.modelValue) {
    localFilters.value = { ...localFilters.value, ...props.modelValue }
  }
})

// Watch for prop changes
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    localFilters.value = { ...localFilters.value, ...newVal }
  }
}, { deep: true })

// Watch include_optional to reload subjects
watch(() => localFilters.value.include_optional, () => {
  if (props.mode === 'subject' && localFilters.value.section_ids.length) {
    loadSubjects()
  }
})
</script>

<style scoped>
/* Custom styling for multi-select to match project style */
:deep(.custom-multi-select .el-select__wrapper) {
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  height: 36px !important;
  border-bottom: 2px solid rgb(221 214 254) !important; /* purple-200 */
}

:deep(.dark .custom-multi-select .el-select__wrapper) {
  border-bottom-color: rgb(107 33 168) !important; /* purple-800 */
}

:deep(.custom-multi-select .el-select__wrapper:hover) {
  box-shadow: none !important;
}

:deep(.custom-multi-select .el-select__wrapper.is-focused) {
  box-shadow: none !important;
  border-bottom-color: rgb(168 85 247) !important; /* purple-500 */
}

:deep(.custom-multi-select .el-select__input) {
  font-size: 0.875rem !important;
  font-weight: 300 !important;
  color: rgb(75 85 99) !important; /* gray-600 */
}

:deep(.dark .custom-multi-select .el-select__input) {
  color: rgb(209 213 219) !important; /* gray-300 */
}

:deep(.custom-multi-select .el-select__placeholder) {
  font-size: 0.875rem !important;
  font-weight: 300 !important;
}

/* Custom styling for autocomplete */
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
  height: 36px !important;
}

:deep(.dark .custom-autocomplete .el-input__inner) {
  color: rgb(209 213 219) !important;
}

/* Modern font for labels */
.modern-font {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  letter-spacing: -0.01em;
}
</style>
