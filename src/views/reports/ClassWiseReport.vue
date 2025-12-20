<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
    <!-- Top Bar Header -->
    <div class="w-full max-w-7xl mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
      <h2 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        Class Wise Report
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Dashboard</span>
        <span class="mx-2">|</span>
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Reports</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">Class Reports</span>
      </nav>
    </div>

    <!-- Select Criteria Label -->
    <div class="w-full max-w-7xl mx-auto mb-2">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-900 tracking-tight">Select Class</h3>
        <div class="h-[1px] bg-purple-200 w-full transition-all duration-300" style="max-width: 110px"></div>
      </div>
    </div>

    <!-- Filter Bar in Card -->
    <div class="w-full max-w-7xl mx-auto rounded-lg border border-gray-200 bg-white/90 px-4 sm:px-6 py-3 shadow-lg mb-6">
      <form class="w-full" @submit.prevent="generateReport">
        <div class="flex flex-wrap lg:flex-nowrap items-end gap-x-4 gap-y-2">
          <div class="flex flex-col w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] lg:flex-1">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Class</label>
            <div class="relative">
              <select v-model="selectedClass" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="">Select Class</option>
                <option v-for="cls in classes" :key="cls.id" :value="cls.id">{{ cls.name }}</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[1px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
          <div class="flex justify-end mt-2">
            <button type="submit" class="h-9 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105" :disabled="!selectedClass || loading">
              <span v-if="loading" class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-transparent mr-2"></span>
              Generate Report
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Statistics Cards -->
    <div class="w-full max-w-7xl mx-auto mb-6" v-if="selectedClass && !loading">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-4">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold text-gray-900">{{ totalStudents }}</div>
              <div class="text-sm text-gray-600">Total Students</div>
            </div>
          </div>
        </div>
        <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-4">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold text-gray-900">{{ totalMale }}</div>
              <div class="text-sm text-gray-600">Male Students</div>
            </div>
          </div>
        </div>
        <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-4">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold text-gray-900">{{ totalFemale }}</div>
              <div class="text-sm text-gray-600">Female Students</div>
            </div>
          </div>
        </div>
        <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-4">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold text-gray-900">{{ totalFamilies }}</div>
              <div class="text-sm text-gray-600">Total Families</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Student List -->
    <div class="w-full max-w-7xl mx-auto" v-if="selectedClass && !loading">
      <!-- Data List Header -->
      <div class="w-full max-w-7xl mx-auto flex items-center justify-between mb-8">
        <div class="flex flex-col items-start">
          <h3 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce"></div>
            Student Details ({{ filteredStudents.length }})
          </h3>
          <div class="h-[1px] bg-purple-200 w-full transition-all duration-500" style="max-width: 120px"></div>
        </div>
        <!-- Quick Search (center) -->
        <div class="flex-1 flex justify-center">
          <div class="relative w-full max-w-xs flex items-center">
            <span class="absolute left-0 top-1/2 -translate-y-1/2 pl-2 text-purple-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="QUICK SEARCH"
              class="w-full border-0 bg-transparent pl-10 pr-0 py-2 text-gray-900 font-medium text-xs tracking-wider uppercase focus:ring-0 focus:outline-none transition placeholder:text-gray-600 placeholder:font-medium placeholder:opacity-100 placeholder:text-xs shadow-none"
              style="letter-spacing:0.08em;"
            />
            <div class="absolute left-0 right-0 bottom-0 h-[1px] bg-purple-200 pointer-events-none"></div>
          </div>
        </div>
        <!-- Export Options (right) -->
        <div class="flex items-center gap-2 ml-4">
          <button 
            @click="exportToExcel"
            class="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-sm hover:shadow-md transform origin-left hover:scale-105"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Export
          </button>
        </div>
      </div>

      <!-- Student Table -->
      <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="student in filteredStudents" :key="student.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ student.roll_number }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img v-if="student.avatar" :src="student.avatar" :alt="student.name" class="h-10 w-10 rounded-full">
                      <div v-else class="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
                        {{ student.name.charAt(0) }}
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ student.name }}</div>
                      <div class="text-sm text-gray-500">{{ student.class_name }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ student.gender }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ student.contact }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                    {{ student.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button class="text-purple-600 hover:text-purple-900">View Details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="w-full max-w-7xl mx-auto flex items-center justify-center py-12">
      <div class="text-center">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
        <p class="mt-2 text-gray-600">Generating report...</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!selectedClass && !loading" class="w-full max-w-7xl mx-auto flex items-center justify-center py-12">
      <div class="text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No class selected</h3>
        <p class="mt-1 text-sm text-gray-500">Please select a class to generate the report.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useToast } from 'vue-toastification'
import axios from '@/utils/axios'

const toast = useToast()

// Initialize reactive variables with proper defaults
const selectedClass = ref(null)
const classes = ref([])
const students = ref([])
const searchQuery = ref('')
const loading = ref(false)

// Ensure all reactive variables are properly initialized
const ensureReactivity = () => {
  if (!selectedClass.value) selectedClass.value = null
  if (!classes.value) classes.value = []
  if (!students.value) students.value = []
  if (!searchQuery.value) searchQuery.value = ''
  if (loading.value === undefined) loading.value = false
}

// Pagination
const currentPage = ref(1)
const pageSize = 15 // or your backend's default
const totalStudents = ref(0)
const totalMale = ref(0)
const totalFemale = ref(0)

const totalFamilies = computed(() => new Set(students.value.map(s => s.family_id).filter(Boolean)).size)

const filteredStudents = computed(() => {
  if (!searchQuery.value) return students.value
  const query = searchQuery.value.toLowerCase()
  return students.value.filter(student => 
    student.name?.toLowerCase().includes(query) ||
    student.roll_number?.toLowerCase().includes(query) ||
    student.family_name?.toLowerCase().includes(query) ||
    student.contact?.toLowerCase().includes(query)
  )
})

const tableHeaderStyle = {
  backgroundColor: '#f8fafc',
  color: '#1e293b',
  fontWeight: '600',
  fontSize: '14px',
  padding: '16px',
  borderBottom: '2px solid #e2e8f0'
}

const isMobile = ref(window.innerWidth <= 768)
const handleResize = () => {
  isMobile.value = window.innerWidth <= 768
}

const fetchClasses = async () => {
  try {
    const response = await axios.get('/classes')
    if (response.data.success) {
      classes.value = response.data.result || []
    }
  } catch (error) {
    console.error('Failed to fetch classes:', error)
  }
}

const generateReport = async () => {
  if (!selectedClass.value) return
  loading.value = true
  try {
    const response = await axios.get('/students', {
      params: {
        class_id: selectedClass.value,
        page: currentPage.value
      }
    })
    if (response.data.status && response.data.result && response.data.result.data) {
      const allStudents = response.data.result.data
      students.value = allStudents.map(student => ({
        id: student.id,
        name: `${student.first_name || ''} ${student.last_name || ''}`.trim(),
        roll_number: student.roll_number,
        gender: student.gender,
        profile_image: student.photo_path,
        father_name: student.family_info?.father_name || '',
        contact: student.contact_info?.reporting_number || '',
        status: student.status || 'active',
      }))
      // Pagination
      totalStudents.value = response.data.result.total
      // Use backend totals if available, otherwise fallback to frontend count for current page
      totalMale.value = response.data.total_male
      totalFemale.value = response.data.total_female
    } else {
      students.value = []
      totalStudents.value = 0
      totalMale.value = 0
      totalFemale.value = 0
    }
  } catch (error) {
    students.value = []
    totalStudents.value = 0
    totalMale.value = 0
    totalFemale.value = 0
  } finally {
    loading.value = false
  }
}

const viewDetails = (student) => {
  // Implement student details view
}

const viewFamily = (student) => {
  // Implement family view
}

const exportToExcel = () => {
  // Implement Excel export
}

const clearClassFilter = () => {
  selectedClass.value = null
  currentPage.value = 1
  students.value = []
  totalStudents.value = 0
  totalMale.value = 0
  totalFemale.value = 0
}

// Watch for class or page change
watch([selectedClass, currentPage], ([cls, page]) => {
  if (cls) generateReport()
})

onMounted(() => {
  ensureReactivity()
  fetchClasses()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.class-report-container {
  padding: 24px;
  background: #f8fafc;
  min-height: 100vh;
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.report-title {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.class-select {
  width: 200px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #8b5cf6;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: #64748b;
}

.student-list {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.list-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.list-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.search-input {
  width: 300px;
}

.student-table {
  margin-top: 16px;
}

.student-name {
  display: flex;
  align-items: center;
  gap: 12px;
}

@media (max-width: 768px) {
  .class-report-container {
    padding: 16px;
  }

  .report-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .header-actions {
    flex-direction: column;
  }

  .class-select {
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .list-header {
    flex-direction: column;
    gap: 16px;
  }

  .list-actions {
    flex-direction: column;
    width: 100%;
  }

  .search-input {
    width: 100%;
  }

  .student-table {
    display: none !important;
  }

  .student-card-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 16px;
  }

  .student-card {
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.08);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .student-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: space-between;
  }

  .student-card-main {
    flex: 1;
    margin-left: 12px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .student-card-name {
    font-weight: 700;
    font-size: 16px;
    color: #1e293b;
  }

  .student-card-roll {
    font-size: 13px;
    color: #64748b;
  }

  .student-card-status {
    margin-left: auto;
    min-width: 54px;
    text-align: center;
  }

  .student-card-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 13px;
    color: #1e293b;
    margin-top: 4px;
    margin-bottom: 4px;
  }

  .student-card-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 4px;
  }
}

.loading-state {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  margin-top: 24px;
}

.clear-filter-btn { margin-left: 8px; }
</style> 