<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
    <!-- Top Bar Header -->
    <div class="w-full max-w-7xl mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
      <h2 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        View Marksheet - {{ getSectionName(selectedSection) }}
            </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Dashboard</span>
        <span class="mx-2">|</span>
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Exams</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">View Marksheet</span>
      </nav>
    </div>

    <!-- Select Criteria Label -->
    <div class="w-full max-w-7xl mx-auto mb-2">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-900 tracking-tight">Filter Marksheets</h3>
        <div class="h-[2px] bg-purple-200 w-full transition-all duration-300" style="max-width: 140px"></div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="w-full max-w-7xl mx-auto rounded-lg border border-gray-200 bg-white/90 px-4 sm:px-6 py-3 shadow-lg mb-6">
      <form class="w-full" @submit.prevent="applyFilters">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Class</label>
            <div class="relative">
              <select v-model="selectedClass" @change="onClassChange" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="">All Classes</option>
                <option v-for="cls in classes" :key="cls.id" :value="String(cls.id)">{{ cls.name }}</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
          </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>

          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Section</label>
            <div class="relative">
              <select v-model="selectedSection" @change="onSectionChange" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="">All Sections</option>
                <option v-for="section in sections" :key="section.id" :value="String(section.id)">{{ section.name }}</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>

          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Exam</label>
            <div class="relative">
              <select v-model="selectedExam" @change="onExamChange" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="">Select Exam</option>
                <option v-for="exam in exams" :key="exam.id" :value="exam.id">{{ exam.name }}</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-2 mt-2">
          <button type="button" @click="clearFilters" class="h-9 px-8 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 text-sm font-bold text-white shadow hover:from-gray-600 hover:to-slate-600 transition-all duration-300 transform hover:scale-105">Clear</button>
          <button type="submit" class="h-9 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">Filter</button>
        </div>
      </form>
    </div>

    <!-- Data List Header -->
    <div class="w-full max-w-7xl mx-auto flex items-center justify-between mb-8">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-900 tracking-tight flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce"></div>
          Marksheet Results ({{ marksheets.length }})
        </h3>
        <div class="h-[2px] bg-purple-200 w-full transition-all duration-500" style="max-width: 160px"></div>
      </div>
      
      <!-- Quick Export -->
      <div class="flex items-center gap-3">
        <button 
          @click="exportToPDF"
          class="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-medium rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Export PDF
        </button>
      </div>
    </div>

    <div class="w-full">
      <div class="h-[2px] w-full bg-purple-200 mb-4"></div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="w-full">
      <div class="border border-gray-200 rounded-xl p-8 bg-white/40 shadow-sm">
        <div class="flex flex-col items-center justify-center py-12">
          <div class="relative mb-6">
            <div class="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-500 rounded-full animate-ping opacity-20"></div>
          </div>
          <div class="text-center">
            <p class="text-gray-600 font-medium text-lg mb-1">Loading Marksheets</p>
            <p class="text-gray-500 text-sm font-normal">Please wait while we fetch the marksheet data...</p>
            <div class="flex justify-center mt-3 space-x-1">
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Data Found -->
    <div v-else-if="!loading && marksheets.length === 0" class="w-full">
      <div class="border border-gray-200 rounded-xl p-8 bg-white/40 shadow-sm">
        <div class="flex flex-col items-center justify-center py-12">
          <div class="relative mb-6">
            <div class="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
              </svg>
            </div>
            <div class="absolute -top-2 -right-2 w-4 h-4 bg-purple-300 rounded-full animate-ping opacity-30"></div>
            <div class="absolute -bottom-2 -left-2 w-3 h-3 bg-indigo-300 rounded-full animate-pulse"></div>
          </div>
          <div class="w-full">
            <h3 class="text-gray-600 font-medium text-xl mb-2">No Marksheets Found</h3>
            <p class="text-gray-500 text-sm font-normal leading-relaxed mb-4">
              No marksheets match your current filters. Try adjusting your search criteria or check if marksheets have been created for the selected exam.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Marksheet Table -->
    <div v-else-if="!loading && marksheets.length > 0" class="w-full">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gradient-to-r from-indigo-50 to-purple-50">
              <tr>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">#</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Student</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Exam</th>
                <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Total Marks</th>
                <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Obtained</th>
                <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Percentage</th>
                <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Grade</th>
                <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Status</th>
                <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Position</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(marksheet, index) in marksheets" :key="marksheet.id" class="hover:bg-indigo-50 transition-colors border-b border-purple-200">
                <td class="py-3 px-4 text-gray-900 font-normal text-sm">{{ index + 1 }}</td>
                <td class="py-3 px-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
                      {{ getStudentInitials(marksheet.student) }}
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ marksheet.student?.first_name }} {{ marksheet.student?.last_name }}</div>
                      <div class="text-xs text-gray-500">Roll: {{ marksheet.student?.roll_number || 'N/A' }}</div>
                </div>
              </div>
                </td>
                <td class="py-3 px-4 text-gray-900 font-normal text-sm">{{ marksheet.exam?.name || 'N/A' }}</td>
                <td class="py-3 px-4 text-center">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ marksheet.total_marks }}
                  </span>
                </td>
                <td class="py-3 px-4 text-center">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {{ marksheet.total_mark_obtains }}
                  </span>
                </td>
                <td class="py-3 px-4 text-center">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {{ marksheet.percentage }}{{ marksheet.percentage && !marksheet.percentage.includes('%') ? '%' : '' }}
                  </span>
                </td>
                <td class="py-3 px-4 text-center">
                  <span :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getGradeBadgeClass(marksheet.grade)
                  ]">
                    {{ marksheet.grade || 'N/A' }}
                  </span>
                </td>
                <td class="py-3 px-4 text-center">
                  <span :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    marksheet.status === 'Pass' ? 'bg-green-100 text-green-800' : 
                    marksheet.status === 'Fail' ? 'bg-red-100 text-red-800' : 
                    'bg-white text-gray-900'
                  ]">
                    {{ marksheet.status || 'N/A' }}
                  </span>
                </td>
                <td class="py-3 px-4 text-center">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {{ marksheet.position || 'N/A' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Pagination Section -->
      <div v-if="!loading && totalMarksheets > 0" class="w-full">
        <!-- Pagination Summary -->
        <div class="flex flex-row items-center justify-between mb-4">
          <div class="text-gray-600 text-sm font-medium px-2">
            Showing {{ (currentPage - 1) * pageSize + 1 }}
            to {{ Math.min(currentPage * pageSize, totalMarksheets) }}
            of {{ totalMarksheets }} entries
          </div>
          <div class="flex items-center gap-4">
            <label class="text-sm text-gray-600 font-medium flex items-center gap-1">
              Per page:
              <select v-model="pageSize" @change="handlePerPageChange" class="rounded-md border border-purple-200 bg-white px-2 py-1 text-xs font-semibold text-purple-700 focus:ring-2 focus:ring-purple-300">
                <option v-for="size in [10, 20, 50, 100]" :key="size" :value="size">{{ size }}</option>
              </select>
            </label>
            <label class="text-sm text-gray-600 font-medium flex items-center gap-1 mr-3">
              Go to page:
              <input v-model.number="goToPage" type="number" min="1" :max="totalPages" class="w-16 rounded-md border border-purple-200 px-2 py-1 text-xs font-semibold text-purple-700 focus:ring-2 focus:ring-purple-300" @keyup.enter="handleGoToPage" />
              <button @click="handleGoToPage" class="ml-1 px-2 py-1 rounded-md bg-purple-500 text-white text-xs font-semibold hover:bg-purple-600 transition-all flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
                Go
              </button>
            </label>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div class="flex justify-center">
          <div class="flex items-center gap-2">
            <button
              class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-50 text-purple-500 text-xl font-bold shadow-sm transition-all duration-200 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-40 disabled:cursor-not-allowed"
              :disabled="currentPage === 1"
              @click="handlePageChange(currentPage - 1)"
              aria-label="Previous"
            >
              <span>&larr;</span>
            </button>
            <span class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-600 text-white text-base font-bold shadow-md">
              {{ currentPage }}
            </span>
            <button
              class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-50 text-purple-500 text-xl font-bold shadow-sm transition-all duration-200 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-40 disabled:cursor-not-allowed"
              :disabled="currentPage === totalPages"
              @click="handlePageChange(currentPage + 1)"
              aria-label="Next"
            >
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeMount, onActivated } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import api from '@/utils/axios'

// Use centralized axios instance
const toast = useToast()
const axios = api

const route = useRoute()
const marksheets = ref([])
const classes = ref([])
const sections = ref([])
const exams = ref([])
const selectedClass = ref('')
const selectedSection = ref('')
const selectedExam = ref('')
const loading = ref(false)
const isInitialized = ref(false)

// Pagination
const currentPage = ref(1)
const pageSize = ref(20)
const totalMarksheets = ref(0)
const goToPage = ref(1)
const totalPages = computed(() => Math.ceil(totalMarksheets.value / pageSize.value))

// Methods
const getSectionName = (id) => {
  if (!id) return 'All'
  const section = sections.value.find(s => String(s.id) === String(id))
  return section ? section.name : 'All'
}

const getStudentInitials = (student) => {
  if (!student) return 'N/A'
  const firstName = student.first_name || ''
  const lastName = student.last_name || ''
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

const getGradeBadgeClass = (grade) => {
  if (!grade) return 'bg-white text-gray-900'
  const gradeUpper = grade.toUpperCase()
  if (gradeUpper === 'A+' || gradeUpper === 'A') return 'bg-green-100 text-green-800'
  if (gradeUpper === 'B+' || gradeUpper === 'B') return 'bg-blue-100 text-blue-800'
  if (gradeUpper === 'C+' || gradeUpper === 'C') return 'bg-yellow-100 text-yellow-800'
  if (gradeUpper === 'D' || gradeUpper === 'F') return 'bg-red-100 text-red-800'
  return 'bg-purple-100 text-purple-800'
}

const initializeData = async () => {
  loading.value = true
  try {
    // Fetch classes, sections, exams
    const [classRes, sectionRes, examRes] = await Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/classes`),
      axios.get(`${import.meta.env.VITE_API_URL}/sections`),
      axios.get(`${import.meta.env.VITE_API_URL}/exams`)
    ])
    
    if (classRes.data.success) classes.value = classRes.data.result || []
    if (sectionRes.data.success) sections.value = sectionRes.data.result || []
    if (examRes.data.success) exams.value = examRes.data.result || []
    
    // If we have exams, select the first one and fetch marksheets
    if (exams.value.length > 0) {
      selectedExam.value = exams.value[0].id
      await fetchMarksheets()
    }
    
    isInitialized.value = true
  } catch (error) {
    console.error('Error loading initial data:', error)
    toast.error('Failed to load initial data')
  } finally {
    loading.value = false
  }
}

const fetchMarksheets = async () => {
  if (!selectedExam.value) return
  
  loading.value = true
  try {
    const params = {
      page: currentPage.value,
      per_page: pageSize.value
    }
    if (selectedClass.value) params.class_id = selectedClass.value
    if (selectedSection.value) params.section_id = selectedSection.value
    if (selectedExam.value) params.exam_id = selectedExam.value
    
    const marksheetRes = await axios.get(`${import.meta.env.VITE_API_URL}/result-sheet`, { params })
    if (marksheetRes.data.success) {
      marksheets.value = marksheetRes.data.result.data || []
      totalMarksheets.value = marksheetRes.data.result.total || 0
      currentPage.value = marksheetRes.data.result.current_page || 1
    } else {
      marksheets.value = []
      totalMarksheets.value = 0
    }
  } catch (error) {
    console.error('Error fetching marksheets:', error)
    marksheets.value = []
    totalMarksheets.value = 0
    toast.error('Failed to fetch marksheets')
  } finally {
    loading.value = false
  }
}

const onClassChange = async () => {
  console.log('Class changed to:', selectedClass.value)
  await fetchMarksheets()
}

const onSectionChange = async () => {
  console.log('Section changed to:', selectedSection.value)
  await fetchMarksheets()
}

const onExamChange = async () => {
  console.log('Exam changed to:', selectedExam.value)
  currentPage.value = 1
  await fetchMarksheets()
}

const handlePageChange = (page) => {
  currentPage.value = page
  fetchMarksheets()
}

const handlePerPageChange = () => {
  currentPage.value = 1
  fetchMarksheets()
}

const handleGoToPage = () => {
  if (goToPage.value >= 1 && goToPage.value <= totalPages.value) {
    currentPage.value = goToPage.value
    fetchMarksheets()
  }
}

const applyFilters = async () => {
  currentPage.value = 1
  await fetchMarksheets()
}

const clearFilters = async () => {
  console.log('Clearing all filters')
  selectedClass.value = ''
  selectedSection.value = ''
  selectedExam.value = ''
  marksheets.value = []
  totalMarksheets.value = 0
  currentPage.value = 1
  // If we have exams, select the first one
  if (exams.value.length > 0) {
    selectedExam.value = exams.value[0].id
    await fetchMarksheets()
  }
}

const exportToPDF = () => {
  toast.info('Export functionality will be implemented soon!')
}

// Watch for route changes
watch(
  () => route.path,
  async (newPath) => {
    if (newPath.includes('/exams/')) {
      isInitialized.value = false
      await initializeData()
    }
  },
  { immediate: true }
)

// Watch for component activation (when using keep-alive)
onActivated(async () => {
  if (!isInitialized.value) {
    await initializeData()
  }
})

onBeforeMount(async () => {
  isInitialized.value = false
})

onMounted(async () => {
  if (!isInitialized.value) {
    await initializeData()
  }
})
</script>

<style scoped>
/* Professional ERP styling */
.bg-white\/90 {
  background-color: #ffffff;
}

.text-gray-600 {
  color: #64748b;
}

.text-gray-600 {
  color: #64748b;
}

.text-gray-900 {
  color: #1e293b;
}

.text-gray-900 {
  color: #1e293b;
}

.text-gray-900 {
  color: #1e293b;
}

/* Animations */
.tab-content-3d {
  perspective: 1000px;
  transform-style: preserve-3d;
}

.tab-3d-enter-active, .tab-3d-leave-active {
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.tab-3d-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.tab-3d-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.tab-3d-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.tab-3d-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

/* Select element styling for better visibility */
select {
  color: #1e293b !important; /* text-gray-900 */
}

select option {
  color: #1e293b !important; /* text-gray-900 */
  background-color: #ffffff;
  padding: 8px 12px;
}

select option[value=""] {
  color: #94a3b8 !important; /* text-gray-600 for placeholder */
}

/* Focus state for better visibility */
select:focus {
  color: #1e293b !important;
}

/* Hover state */
select:hover {
  color: #1e293b !important;
}

/* Dropdown styling for better contrast */
select option:hover,
select option:focus,
select option:active,
select option:checked {
  background-color: #3b82f6 !important; /* blue-500 */
  color: #ffffff !important;
  font-weight: 500;
}

/* Ensure selected option is visible */
select option:checked {
  background-color: #3b82f6 !important;
  color: #ffffff !important;
  font-weight: 500;
}

/* Dropdown list styling */
select {
  background-color: #ffffff;
}

/* Custom dropdown arrow */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style> 