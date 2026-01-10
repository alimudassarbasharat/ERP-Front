<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
    <!-- Grid Header -->
    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
        <div class="flex flex-col">
          <h3 class="text-base font-medium text-gray-900 dark:text-white tracking-tight">
            {{ title || 'Marks Entry Grid' }}
          </h3>
          <div class="h-[2px] bg-purple-200 dark:bg-purple-800 w-32 mt-1"></div>
          <p v-if="subtitle" class="text-sm text-gray-600 dark:text-gray-400 mt-2">{{ subtitle }}</p>
        </div>
        
        <div class="flex items-center gap-4">
          <!-- Autosave Indicator -->
          <div v-if="showAutosave" class="flex items-center gap-2 text-sm">
            <el-icon v-if="isSaving" class="animate-spin text-blue-500"><Loading /></el-icon>
            <el-icon v-else-if="lastSaved" class="text-green-500"><CircleCheck /></el-icon>
            <span :class="isSaving ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'">
              {{ isSaving ? 'Saving...' : lastSaved ? `Saved ${lastSaved}` : 'Not saved' }}
            </span>
          </div>

          <!-- Filter Controls -->
          <div v-if="showFilterControls" class="flex gap-2">
            <el-checkbox v-model="showMissingOnly" @change="filterStudents">
              Missing only
            </el-checkbox>
            <el-checkbox v-model="showOutOfRangeOnly" @change="filterStudents">
              Out of range
            </el-checkbox>
          </div>

          <!-- Subject Selector (if multiple subjects) -->
          <el-select 
            v-if="subjects.length > 1" 
            v-model="activeSubjectId" 
            placeholder="Select Subject" 
            class="w-48"
            @change="$emit('subject-change', activeSubjectId)"
          >
            <el-option 
              v-for="subject in subjects" 
              :key="subject.id" 
              :label="subject.name" 
              :value="subject.id" 
            />
          </el-select>
        </div>
      </div>

      <!-- Progress Bar (if applicable) -->
      <div v-if="showProgress" class="mb-4">
        <div class="flex items-center justify-between text-sm mb-2">
          <span class="text-gray-600 dark:text-gray-400">Entry Progress</span>
          <span class="font-semibold text-gray-900 dark:text-white">
            {{ completedCount }} / {{ filteredStudents.length }} ({{ progressPercentage }}%)
          </span>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            class="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Grid Table -->
    <div class="overflow-x-auto p-6">
      <table class="w-full border-collapse">
        <thead class="sticky top-0 bg-gray-100 dark:bg-gray-900 z-10">
          <tr>
            <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold w-20">
              #
            </th>
            <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold w-24">
              Roll No
            </th>
            <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold">
              Student Name
            </th>
            <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold w-32">
              Total Marks
            </th>
            <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold w-40">
              Obtained Marks
            </th>
            <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold w-32">
              Status
            </th>
            <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold w-48">
              Absent Reason
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(student, index) in filteredStudents" 
            :key="student.id"
            :class="[
              'hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors',
              getRowClass(student)
            ]"
          >
            <!-- Serial Number -->
            <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">
              {{ index + 1 }}
            </td>

            <!-- Roll Number -->
            <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm font-medium">
              {{ student.roll_number || '-' }}
            </td>

            <!-- Student Name -->
            <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm font-medium">
              <div class="flex items-center gap-2">
                <el-avatar v-if="student.avatar" :size="28" :src="student.avatar">
                  {{ student.first_name?.[0] }}
                </el-avatar>
                <span>{{ student.first_name }} {{ student.last_name }}</span>
              </div>
            </td>

            <!-- Total Marks -->
            <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold text-blue-600 dark:text-blue-400">
              {{ totalMarks }}
            </td>

            <!-- Obtained Marks Input -->
            <td class="border border-gray-300 dark:border-gray-600 px-4 py-3">
              <el-input 
                v-model="getMarkEntry(student.id).obtained_marks"
                type="number"
                :min="0"
                :max="totalMarks"
                placeholder="0"
                class="w-full"
                :disabled="getMarkEntry(student.id).status !== 'present'"
                @input="handleMarkInput(student.id)"
                :class="[
                  validateMarks(getMarkEntry(student.id).obtained_marks) ? '' : '!border-red-500'
                ]"
              />
            </td>

            <!-- Status Dropdown -->
            <td class="border border-gray-300 dark:border-gray-600 px-4 py-3">
              <el-select 
                v-model="getMarkEntry(student.id).status" 
                placeholder="Status"
                class="w-full"
                @change="handleStatusChange(student.id)"
              >
                <el-option label="Present" value="present" />
                <el-option label="Absent" value="absent" />
                <el-option label="Exempt" value="exempt" />
              </el-select>
            </td>

            <!-- Absent Reason -->
            <td class="border border-gray-300 dark:border-gray-600 px-4 py-3">
              <div v-if="getMarkEntry(student.id).status === 'absent'" class="space-y-2">
                <el-select 
                  v-model="getMarkEntry(student.id).absent_reason"
                  placeholder="Select Reason"
                  class="w-full"
                  @change="handleAbsentReasonChange(student.id)"
                >
                  <el-option label="Sick" value="sick" />
                  <el-option label="Family Emergency" value="family_emergency" />
                  <el-option label="Leave" value="leave" />
                  <el-option label="Other" value="other" />
                </el-select>
                <el-input 
                  v-if="getMarkEntry(student.id).absent_reason === 'other'"
                  v-model="getMarkEntry(student.id).absent_note"
                  placeholder="Specify reason..."
                  class="w-full"
                  @input="handleAbsentNoteChange(student.id)"
                />
              </div>
              <span v-else class="text-xs text-gray-400">-</span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <EmptyState
        v-if="filteredStudents.length === 0 && !loading"
        title="No students found"
        description="Adjust your filters or check if students exist in the selected class/section"
        :icon="User"
        icon-color="gray"
      />

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <el-icon class="animate-spin text-4xl text-purple-500"><Loading /></el-icon>
      </div>
    </div>

    <!-- Grid Footer -->
    <div class="p-6 border-t border-gray-200 dark:border-gray-700">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Showing <span class="font-semibold">{{ filteredStudents.length }}</span> student(s)
          <span v-if="showMissingOnly || showOutOfRangeOnly" class="ml-2 text-xs">
            ({{ students.length }} total)
          </span>
        </div>
        
        <div class="flex gap-2">
          <slot name="footer-actions">
            <button 
              @click="$emit('back')"
              type="button"
              class="h-9 px-6 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium rounded-full border border-gray-200 dark:border-gray-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Back
            </button>
            <button 
              @click="$emit('submit')"
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
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { CircleCheck, Loading, User } from '@element-plus/icons-vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { useToast } from 'vue-toastification'
import { debounce } from 'lodash'

const props = defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  students: { type: Array, required: true },
  subjects: { type: Array, default: () => [] },
  totalMarks: { type: Number, required: true },
  marksData: { type: Object, required: true },
  loading: { type: Boolean, default: false },
  isSaving: { type: Boolean, default: false },
  isSubmitting: { type: Boolean, default: false },
  lastSaved: { type: String, default: '' },
  showAutosave: { type: Boolean, default: true },
  showProgress: { type: Boolean, default: true },
  showFilterControls: { type: Boolean, default: true }
})

const emit = defineEmits(['update:marksData', 'mark-change', 'status-change', 'subject-change', 'back', 'submit'])

const toast = useToast()

const activeSubjectId = ref(props.subjects[0]?.id || null)
const showMissingOnly = ref(false)
const showOutOfRangeOnly = ref(false)
const filteredStudents = ref([...props.students])

// Filter students based on checkboxes
const filterStudents = () => {
  let filtered = [...props.students]
  
  if (showMissingOnly.value) {
    filtered = filtered.filter(s => {
      const entry = props.marksData[s.id]
      return !entry || !entry.obtained_marks || entry.obtained_marks === ''
    })
  }
  
  if (showOutOfRangeOnly.value) {
    filtered = filtered.filter(s => {
      const entry = props.marksData[s.id]
      return entry && entry.obtained_marks && !validateMarks(entry.obtained_marks)
    })
  }
  
  filteredStudents.value = filtered
}

// Get marks entry for a student
const getMarkEntry = (studentId) => {
  if (!props.marksData[studentId]) {
    const newEntry = {
      obtained_marks: '',
      status: 'present',
      absent_reason: '',
      absent_note: ''
    }
    props.marksData[studentId] = newEntry
    emit('update:marksData', props.marksData)
  }
  return props.marksData[studentId]
}

// Validate marks
const validateMarks = (marks) => {
  if (!marks && marks !== 0) return true
  return marks >= 0 && marks <= props.totalMarks
}

// Get row class based on status
const getRowClass = (student) => {
  const entry = props.marksData[student.id]
  if (!entry) return ''
  
  if (entry.status === 'absent') return 'bg-red-50 dark:bg-red-900/10'
  if (entry.status === 'exempt') return 'bg-yellow-50 dark:bg-yellow-900/10'
  if (entry.obtained_marks && !validateMarks(entry.obtained_marks)) {
    return 'bg-orange-50 dark:bg-orange-900/10'
  }
  return ''
}

// Handle mark input
const handleMarkInput = (studentId) => {
  const entry = getMarkEntry(studentId)
  if (!validateMarks(entry.obtained_marks)) {
    toast.warning(`Marks must be between 0 and ${props.totalMarks}`)
  }
  emit('mark-change', { studentId, entry })
}

// Handle status change
const handleStatusChange = (studentId) => {
  const entry = getMarkEntry(studentId)
  if (entry.status === 'absent') {
    entry.obtained_marks = 0
    entry.absent_reason = ''
    entry.absent_note = ''
  } else if (entry.status === 'exempt') {
    entry.obtained_marks = ''
    entry.absent_reason = ''
    entry.absent_note = ''
  } else {
    entry.absent_reason = ''
    entry.absent_note = ''
  }
  emit('status-change', { studentId, entry })
}

// Handle absent reason change
const handleAbsentReasonChange = (studentId) => {
  const entry = getMarkEntry(studentId)
  if (entry.absent_reason !== 'other') {
    entry.absent_note = ''
  }
  emit('mark-change', { studentId, entry })
}

// Handle absent note change
const handleAbsentNoteChange = debounce((studentId) => {
  const entry = getMarkEntry(studentId)
  emit('mark-change', { studentId, entry })
}, 500)

// Computed: Completed count
const completedCount = computed(() => {
  return props.students.filter(s => {
    const entry = props.marksData[s.id]
    return entry && (entry.obtained_marks || entry.obtained_marks === 0 || entry.status !== 'present')
  }).length
})

// Computed: Progress percentage
const progressPercentage = computed(() => {
  if (props.students.length === 0) return 0
  return Math.round((completedCount.value / props.students.length) * 100)
})

// Watch students prop
watch(() => props.students, (newStudents) => {
  filteredStudents.value = [...newStudents]
}, { immediate: true })

// Watch filters
watch([showMissingOnly, showOutOfRangeOnly], () => {
  filterStudents()
})
</script>

<style scoped>
/* Sticky header for table */
thead {
  position: sticky;
  top: 0;
  z-index: 10;
}

/* Input error styling */
:deep(.el-input.border-red-500 .el-input__wrapper) {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 1px #ef4444 !important;
}

/* Compact table cells on mobile */
@media (max-width: 768px) {
  table {
    font-size: 0.75rem;
  }
  
  th, td {
    padding: 0.5rem !important;
  }
}
</style>
