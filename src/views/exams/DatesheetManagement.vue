<template>
  <PageShell 
    title="Make Datesheet"
    :breadcrumbs="[
      { label: 'Exams', to: '/exams/add-marksheet-landing' },
      { label: 'Create Paper', to: '/exams/create-paper-landing' },
      { label: 'Datesheet' }
    ]"
  >
    <!-- Header Info -->
    <div class="w-full mb-6">
      <div class="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-6 border-2 border-orange-300 dark:border-orange-700">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
            <el-icon class="text-white text-2xl"><Calendar /></el-icon>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h2 class="text-xl font-bold text-gray-900 dark:text-white">Build Exam Datesheet</h2>
              <span class="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                MANDATORY
              </span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Assign exam dates, time slots, and rooms for each subject. Auto-detects time conflicts to prevent scheduling issues.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 1: Selection Filters -->
    <div class="w-full mb-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Step 1: Select Session, Exam & Class</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          <!-- Exam -->
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
            <el-select v-model="filters.class_id" placeholder="Select Class" class="w-full" :disabled="!filters.exam_id" @change="loadDatesheet">
              <el-option 
                v-for="cls in classes" 
                :key="cls.id" 
                :label="cls.name" 
                :value="cls.id" 
              />
            </el-select>
          </div>
        </div>

        <div class="mt-4 flex justify-end">
          <el-button 
            type="primary" 
            @click="loadDatesheet"
            :loading="loading"
            :disabled="!filters.session_id || !filters.exam_id || !filters.class_id"
          >
            Load Datesheet
          </el-button>
        </div>
      </div>
    </div>

    <!-- Step 2: Datesheet Builder -->
    <div v-if="datesheetEntries.length > 0" class="w-full mb-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">Step 2: Assign Dates & Times</h3>
          
          <!-- Conflict Indicator -->
          <div v-if="conflicts.length > 0" class="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg border border-red-300 dark:border-red-700">
            <el-icon class="text-red-500 text-xl"><Warning /></el-icon>
            <span class="text-sm font-semibold text-red-700 dark:text-red-400">
              {{ conflicts.length }} Time Conflict(s) Detected
            </span>
          </div>
          <div v-else-if="datesheetEntries.some(e => e.exam_date)" class="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg border border-green-300 dark:border-green-700">
            <el-icon class="text-green-500 text-xl"><CircleCheck /></el-icon>
            <span class="text-sm font-semibold text-green-700 dark:text-green-400">
              No Conflicts
            </span>
          </div>
        </div>

        <!-- Conflict List -->
        <div v-if="conflicts.length > 0" class="mb-4 space-y-2">
          <div v-for="(conflict, index) in conflicts" :key="index" class="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <div class="flex items-start gap-3">
              <el-icon class="text-red-500 mt-0.5"><Warning /></el-icon>
              <div class="flex-1 text-sm text-red-800 dark:text-red-300">
                <strong>Time Conflict:</strong> {{ conflict.message }}
              </div>
            </div>
          </div>
        </div>

        <!-- Datesheet Table -->
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-900">
                <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold w-1/4">Subject</th>
                <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold w-1/4">Exam Date <span class="text-red-500">*</span></th>
                <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold w-1/6">Start Time</th>
                <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold w-1/6">End Time</th>
                <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold w-1/6">Room / Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(entry, index) in datesheetEntries" 
                :key="index"
                :class="[
                  'hover:bg-gray-50 dark:hover:bg-gray-900/50',
                  hasConflict(entry) ? 'bg-red-50 dark:bg-red-900/10' : ''
                ]"
              >
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm font-medium">
                  {{ entry.subject_name }}
                </td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-3">
                  <el-date-picker
                    v-model="entry.exam_date"
                    type="date"
                    placeholder="Select Date"
                    class="w-full"
                    @change="detectConflicts"
                  />
                </td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-3">
                  <el-time-picker
                    v-model="entry.start_time"
                    placeholder="Start Time"
                    class="w-full"
                    format="hh:mm A"
                    @change="detectConflicts"
                  />
                </td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-3">
                  <el-time-picker
                    v-model="entry.end_time"
                    placeholder="End Time"
                    class="w-full"
                    format="hh:mm A"
                    @change="detectConflicts"
                  />
                </td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-3">
                  <el-input
                    v-model="entry.room_notes"
                    placeholder="Room 101"
                    class="w-full"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Actions -->
        <div class="mt-6 flex items-center justify-between">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            <span class="font-semibold">{{ datesheetEntries.filter(e => e.exam_date).length }}</span> of {{ datesheetEntries.length }} subjects scheduled
          </div>
          
          <div class="flex gap-3">
            <el-button @click="saveDraft" :loading="isSaving">
              <el-icon><Document /></el-icon>
              Save Draft
            </el-button>
            <el-button type="primary" @click="publishDatesheet" :loading="isPublishing" :disabled="conflicts.length > 0 || !allDatesSet">
              <el-icon><CircleCheck /></el-icon>
              Publish Datesheet
            </el-button>
            <el-button @click="printDatesheet">
              <el-icon><Printer /></el-icon>
              Print
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Info -->
    <div class="w-full">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Datesheet Features</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-start gap-3">
            <el-icon class="text-orange-500 text-xl mt-0.5"><Calendar /></el-icon>
            <div>
              <div class="font-semibold text-gray-900 dark:text-white">Date Assignment</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Set exam date for each subject (mandatory)</div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <el-icon class="text-blue-500 text-xl mt-0.5"><Clock /></el-icon>
            <div>
              <div class="font-semibold text-gray-900 dark:text-white">Time Slots</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Optional start/end time for detailed scheduling</div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <el-icon class="text-red-500 text-xl mt-0.5"><Warning /></el-icon>
            <div>
              <div class="font-semibold text-gray-900 dark:text-white">Conflict Detection</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Auto-detect duplicate time slots per class</div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <el-icon class="text-green-500 text-xl mt-0.5"><Printer /></el-icon>
            <div>
              <div class="font-semibold text-gray-900 dark:text-white">Export & Print</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Download or print formatted datesheet</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageShell>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { 
  Calendar, Warning, CircleCheck, Clock, Printer, Document
} from '@element-plus/icons-vue'
import PageShell from '@/components/common/PageShell.vue'
import api from '@/utils/axios'

const router = useRouter()
const toast = useToast()

const loading = ref(false)
const isSaving = ref(false)
const isPublishing = ref(false)

const filters = ref({
  session_id: '',
  exam_id: '',
  class_id: ''
})

const sessions = ref([])
const exams = ref([])
const classes = ref([])
const datesheetEntries = ref([])
const conflicts = ref([])

const allDatesSet = computed(() => {
  return datesheetEntries.value.length > 0 && datesheetEntries.value.every(e => e.exam_date)
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

const loadDatesheet = async () => {
  if (!filters.value.session_id || !filters.value.exam_id || !filters.value.class_id) return
  
  loading.value = true
  try {
    const response = await api.get(`/datesheets/exams/${filters.value.exam_id}`, {
      params: {
        class_id: filters.value.class_id,
        ...getTenantFilter()
      }
    })
    
    if (response.data.success) {
      datesheetEntries.value = response.data.data || []
      detectConflicts()
    }
  } catch (error) {
    console.error('Failed to load datesheet:', error)
    toast.error('Failed to load datesheet')
  } finally {
    loading.value = false
  }
}

const detectConflicts = () => {
  conflicts.value = []
  const dateTimeMap = new Map()

  datesheetEntries.value.forEach((entry, index) => {
    if (!entry.exam_date || !entry.start_time || !entry.end_time) return

    const dateKey = new Date(entry.exam_date).toDateString()
    const startTime = new Date(entry.start_time).getTime()
    const endTime = new Date(entry.end_time).getTime()

    if (!dateTimeMap.has(dateKey)) {
      dateTimeMap.set(dateKey, [])
    }

    const slotsOnDate = dateTimeMap.get(dateKey)
    
    // Check for overlaps
    for (const slot of slotsOnDate) {
      const slotStart = slot.start
      const slotEnd = slot.end

      // Check if time ranges overlap
      if ((startTime >= slotStart && startTime < slotEnd) || 
          (endTime > slotStart && endTime <= slotEnd) ||
          (startTime <= slotStart && endTime >= slotEnd)) {
        conflicts.value.push({
          message: `"${entry.subject_name}" and "${slot.subject}" have overlapping time slots on ${dateKey}`,
          entries: [index, slot.index]
        })
      }
    }

    slotsOnDate.push({
      start: startTime,
      end: endTime,
      subject: entry.subject_name,
      index
    })
  })
}

const hasConflict = (entry) => {
  const index = datesheetEntries.value.indexOf(entry)
  return conflicts.value.some(c => c.entries.includes(index))
}

const saveDraft = async () => {
  isSaving.value = true
  try {
    const response = await api.post('/datesheets', {
      exam_id: filters.value.exam_id,
      class_id: filters.value.class_id,
      entries: datesheetEntries.value,
      ...getTenantFilter()
    })
    
    if (response.data.success) {
      toast.success('Datesheet saved as draft!')
    }
  } catch (error) {
    toast.error('Failed to save datesheet')
    console.error('Save datesheet error:', error)
  } finally {
    isSaving.value = false
  }
}

const publishDatesheet = async () => {
  if (conflicts.value.length > 0) {
    toast.warning('Please resolve all conflicts before publishing')
    return
  }

  if (!allDatesSet.value) {
    toast.warning('Please set dates for all subjects')
    return
  }

  isPublishing.value = true
  try {
    const response = await api.post(`/datesheets/${filters.value.exam_id}/publish`, {
      class_id: filters.value.class_id,
      entries: datesheetEntries.value,
      ...getTenantFilter()
    })
    
    if (response.data.success) {
      toast.success('Datesheet published successfully!')
      router.push('/exams/create-paper-landing')
    }
  } catch (error) {
    toast.error('Failed to publish datesheet')
    console.error('Publish datesheet error:', error)
  } finally {
    isPublishing.value = false
  }
}

const printDatesheet = () => {
  window.print()
}

onMounted(() => {
  loadSessions()
})
</script>

<style scoped>
/* Print styles */
@media print {
  .bg-white, .bg-gray-800 {
    border: 1px solid #ddd !important;
  }
}
</style>
