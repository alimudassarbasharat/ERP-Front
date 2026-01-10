<template>
  <PageShell 
    title="Family-wise Marksheet View"
    :breadcrumbs="[
      { label: 'Exams', to: '/exams/add-marksheet-landing' },
      { label: 'Add Marksheet', to: '/exams/add-marksheet-landing' },
      { label: 'Family-wise' }
    ]"
  >
    <!-- Header -->
    <MarksheetHeader
      title="Family-wise Marksheet View"
      subtitle="Search family and view/compare sibling exam results"
      :icon="House"
      icon-class="text-purple-600"
      icon-bg-class="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30"
      :show-reset-button="selectedFamily !== null"
      @reset="resetSelection"
    />

    <!-- Step 1: Search Family -->
    <div v-if="!selectedFamily">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <div class="max-w-2xl mx-auto">
          <!-- Search Illustration -->
          <div class="text-center mb-6">
            <div class="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center mb-4">
              <svg class="w-10 h-10 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Search for a Family</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Type guardian name, phone number, or any child's admission number
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

          <!-- Family Search -->
          <div class="flex flex-col">
            <label class="mb-1 text-base font-normal text-black dark:text-white modern-font">
              Search Family / Guardian <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <el-autocomplete
                v-model="familySearch"
                :fetch-suggestions="searchFamilies"
                placeholder="Type guardian name, phone, or admission number..."
                class="w-full custom-autocomplete"
                size="large"
                @select="handleFamilySelect"
                :disabled="!filters.exam_id"
              >
              <template #prefix>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </template>
              <template #default="{ item }">
                <div class="flex items-center gap-3 py-2">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="font-semibold text-gray-900">{{ item.guardian_name }}</div>
                    <div class="text-xs text-gray-500">
                      Phone: <strong>{{ item.phone }}</strong> | <strong>{{ item.child_count }}</strong> child(ren)
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

    <!-- Step 2: Family View - Siblings + Selected Child Marks -->
    <div v-if="selectedFamily && siblings.length > 0" class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Siblings List (Left Panel) -->
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 sticky top-4">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Family Members</h3>
          
          <!-- Guardian Info -->
          <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 mb-4 border border-purple-200 dark:border-purple-800">
            <div class="flex items-center gap-3">
              <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              <div>
                <div class="text-xs text-purple-600 dark:text-purple-400 font-semibold">Guardian</div>
                <div class="text-sm font-bold text-gray-900 dark:text-white">{{ selectedFamily.guardian_name }}</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">{{ selectedFamily.phone }}</div>
              </div>
            </div>
          </div>

          <!-- Siblings Cards -->
          <div class="space-y-3">
            <div 
              v-for="(sibling, index) in siblings" 
              :key="sibling.id"
              @click="selectChild(sibling)"
              :class="[
                'p-4 rounded-lg border-2 cursor-pointer transition-all duration-300',
                selectedChild?.id === sibling.id 
                  ? 'border-purple-400 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
              ]"
            >
              <div class="flex items-center gap-3">
                <el-avatar :size="45" :src="sibling.avatar">
                  {{ sibling.first_name?.[0] }}
                </el-avatar>
                <div class="flex-1">
                  <div class="font-semibold text-gray-900 dark:text-white text-sm">
                    {{ sibling.first_name }} {{ sibling.last_name }}
                  </div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">
                    {{ sibling.class_name }} | Roll: {{ sibling.roll_number }}
                  </div>
                </div>
                <svg v-if="selectedChild?.id === sibling.id" class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Selected Child Marks (Right Panel) -->
      <div class="lg:col-span-3">
        <div v-if="selectedChild" class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <!-- Child Header -->
          <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-4">
              <el-avatar :size="60" :src="selectedChild.avatar">
                {{ selectedChild.first_name?.[0] }}
              </el-avatar>
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {{ selectedChild.first_name }} {{ selectedChild.last_name }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ selectedChild.class_name }} - Roll: {{ selectedChild.roll_number }}
                </p>
              </div>
            </div>

            <!-- Actions -->
            <div v-if="canEdit" class="flex gap-2">
              <button 
                @click="saveDraft"
                type="button"
                :disabled="isSaving"
                class="h-9 px-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg v-if="!isSaving" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
                </svg>
                <svg v-else class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Save
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
                Submit
              </button>
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
                  <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold w-24">Percentage</th>
                  <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold w-24">Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(mark, index) in childMarks" 
                  :key="mark.subject_id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                >
                  <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-center">{{ index + 1 }}</td>
                  <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm font-medium">
                    {{ mark.subject_name }}
                  </td>
                  <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {{ mark.total_marks }}
                  </td>
                  <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center">
                    <span v-if="!canEdit" class="text-sm font-semibold text-gray-900 dark:text-white">
                      {{ mark.obtained_marks || '-' }}
                    </span>
                    <el-input 
                      v-else
                      v-model="mark.obtained_marks"
                      type="number"
                      :min="0"
                      :max="mark.total_marks"
                      placeholder="0"
                      class="w-full"
                      :disabled="mark.status !== 'present'"
                      @input="handleMarkChange"
                    />
                  </td>
                  <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold">
                    <span :class="getPercentageClass(mark.percentage)">
                      {{ mark.percentage ? mark.percentage + '%' : '-' }}
                    </span>
                  </td>
                  <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center">
                    <span :class="[
                      'text-xs font-bold px-3 py-1 rounded-full',
                      getGradeClass(mark.grade)
                    ]">
                      {{ mark.grade || '-' }}
                    </span>
                  </td>
                </tr>
              </tbody>
              <tfoot class="bg-gray-100 dark:bg-gray-900">
                <tr>
                  <td colspan="2" class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm font-bold text-gray-900 dark:text-white">
                    TOTAL
                  </td>
                  <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-bold text-blue-600 dark:text-blue-400">
                    {{ totalMarksSum }}
                  </td>
                  <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-bold text-gray-900 dark:text-white">
                    {{ obtainedMarksSum }}
                  </td>
                  <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-bold text-purple-600 dark:text-purple-400">
                    {{ overallPercentage }}%
                  </td>
                  <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center">
                    <span :class="[
                      'text-xs font-bold px-3 py-1 rounded-full',
                      getGradeClass(overallGrade)
                    ]">
                      {{ overallGrade }}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <!-- Download Combined PDF (Optional) -->
          <div class="mt-6 flex items-center justify-between">
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Viewing marks for <strong class="text-gray-900 dark:text-white">{{ selectedChild.first_name }}</strong>
            </div>
            <button 
              @click="downloadFamilyReport"
              type="button"
              class="h-9 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Download Family Report
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
          <p class="text-gray-600 dark:text-gray-400">Select a family member to view their marks</p>
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
import { House, Loading } from '@element-plus/icons-vue'
import PageShell from '@/components/common/PageShell.vue'
import MarksheetHeader from '@/components/exams/MarksheetHeader.vue'
import api from '@/utils/axios'
import { debounce } from 'lodash'

const router = useRouter()
const toast = useToast()

const loading = ref(false)
const isSaving = ref(false)
const isSubmitting = ref(false)

const filters = ref({
  session_id: '',
  exam_id: ''
})

const sessions = ref([])
const exams = ref([])
const familySearch = ref('')
const selectedFamily = ref(null)
const siblings = ref([])
const selectedChild = ref(null)
const childMarks = ref([])

// Check if user can edit
const canEdit = computed(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const role = user.role || user.user_type || 'guest'
  return ['admin', 'super-admin', 'principal', 'coordinator'].includes(role)
})

// Computed totals
const totalMarksSum = computed(() => {
  return childMarks.value.reduce((sum, m) => sum + (m.total_marks || 0), 0)
})

const obtainedMarksSum = computed(() => {
  return childMarks.value.reduce((sum, m) => sum + (parseFloat(m.obtained_marks) || 0), 0)
})

const overallPercentage = computed(() => {
  if (totalMarksSum.value === 0) return 0
  return Math.round((obtainedMarksSum.value / totalMarksSum.value) * 100)
})

const overallGrade = computed(() => {
  return calculateGrade(overallPercentage.value)
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

const searchFamilies = async (queryString, cb) => {
  if (!queryString || !filters.value.exam_id) {
    cb([])
    return
  }
  try {
    const response = await api.get('/students', {
      params: {
        search: queryString,
        session_id: filters.value.session_id,
        with_family: true,
        ...getTenantFilter()
      }
    })
    
    const families = []
    const familyMap = new Map()
    
    (response.data.result?.data || response.data.data || [])
      .filter(s => !s.deleted_at && s.guardian_name)
      .forEach(student => {
        const familyKey = student.guardian_name + student.guardian_phone
        if (!familyMap.has(familyKey)) {
          familyMap.set(familyKey, {
            guardian_name: student.guardian_name,
            phone: student.guardian_phone || 'N/A',
            child_count: 1,
            value: student.guardian_name,
            students: [student]
          })
        } else {
          const family = familyMap.get(familyKey)
          family.child_count++
          family.students.push(student)
        }
      })
    
    cb(Array.from(familyMap.values()))
  } catch (error) {
    console.error('Failed to search families:', error)
    cb([])
  }
}

const handleFamilySelect = (family) => {
  selectedFamily.value = family
  siblings.value = family.students.map(s => ({
    ...s,
    class_name: s.class?.name || 'N/A',
    section_name: s.section?.name || 'N/A'
  }))
  
  if (siblings.value.length > 0) {
    selectChild(siblings.value[0])
  }
}

const selectChild = async (child) => {
  selectedChild.value = child
  loading.value = true
  
  try {
    const response = await api.get('/exam-marks/student-marks', {
      params: {
        exam_id: filters.value.exam_id,
        student_id: child.id,
        ...getTenantFilter()
      }
    })
    
    if (response.data.success) {
      childMarks.value = response.data.data.map(mark => ({
        ...mark,
        percentage: mark.total_marks > 0 ? Math.round((mark.obtained_marks / mark.total_marks) * 100) : 0,
        grade: calculateGrade(mark.total_marks > 0 ? Math.round((mark.obtained_marks / mark.total_marks) * 100) : 0)
      }))
    }
  } catch (error) {
    toast.error('Failed to load marks')
    console.error('Load marks error:', error)
  } finally {
    loading.value = false
  }
}

const handleMarkChange = debounce(async () => {
  if (canEdit.value) {
    await saveDraft()
  }
}, 2000)

const saveDraft = async () => {
  if (!canEdit.value) return
  
  isSaving.value = true
  try {
    await api.post('/exam-marks/save-student-draft', {
      exam_id: filters.value.exam_id,
      student_id: selectedChild.value.id,
      marks: childMarks.value,
      ...getTenantFilter()
    })
    toast.success('Saved!')
  } catch (error) {
    toast.error('Save failed')
    console.error('Save error:', error)
  } finally {
    isSaving.value = false
  }
}

const submitMarks = async () => {
  if (!canEdit.value) return
  
  isSubmitting.value = true
  try {
    const response = await api.post('/exam-marks/submit-student-marks', {
      exam_id: filters.value.exam_id,
      student_id: selectedChild.value.id,
      marks: childMarks.value,
      ...getTenantFilter()
    })
    
    if (response.data.success) {
      toast.success('Marks submitted successfully!')
    }
  } catch (error) {
    toast.error('Failed to submit marks')
    console.error('Submit error:', error)
  } finally {
    isSubmitting.value = false
  }
}

const downloadFamilyReport = async () => {
  try {
    toast.info('Preparing family report...')
    const response = await api.get('/exam-marks/family-report', {
      params: {
        exam_id: filters.value.exam_id,
        guardian_name: selectedFamily.value.guardian_name,
        ...getTenantFilter()
      },
      responseType: 'blob'
    })
    
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `Family_Report_${selectedFamily.value.guardian_name}.pdf`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    
    toast.success('Family report downloaded!')
  } catch (error) {
    toast.error('Failed to download family report')
    console.error('Download error:', error)
  }
}

const resetSelection = () => {
  selectedFamily.value = null
  selectedChild.value = null
  siblings.value = []
  childMarks.value = []
  familySearch.value = ''
}

const calculateGrade = (percentage) => {
  if (percentage >= 90) return 'A+'
  if (percentage >= 80) return 'A'
  if (percentage >= 70) return 'B'
  if (percentage >= 60) return 'C'
  if (percentage >= 50) return 'D'
  if (percentage >= 40) return 'E'
  return 'F'
}

const getPercentageClass = (percentage) => {
  if (percentage >= 80) return 'text-green-600 dark:text-green-400'
  if (percentage >= 60) return 'text-blue-600 dark:text-blue-400'
  if (percentage >= 40) return 'text-orange-600 dark:text-orange-400'
  return 'text-red-600 dark:text-red-400'
}

const getGradeClass = (grade) => {
  if (['A+', 'A'].includes(grade)) return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
  if (['B', 'C'].includes(grade)) return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
  if (['D', 'E'].includes(grade)) return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
  return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
}

onMounted(() => {
  loadSessions()
})
</script>

<style scoped>
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
