<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
    <!-- Top Bar Header -->
    <div class="w-full max-w-7xl mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
      <h2 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        Family Wise Report
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Dashboard</span>
        <span class="mx-2">|</span>
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Reports</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">Family Reports</span>
      </nav>
    </div>

    <!-- Select Criteria Label -->
    <div class="w-full max-w-7xl mx-auto mb-2">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-900 tracking-tight">Family Information</h3>
        <div class="h-[1px] bg-purple-200 w-full transition-all duration-300" style="max-width: 110px"></div>
      </div>
    </div>

    <!-- Filter Bar in Card -->
    <div class="w-full max-w-7xl mx-auto rounded-lg border border-gray-200 bg-white/90 px-4 sm:px-6 py-3 shadow-lg mb-6">
      <form class="w-full" @submit.prevent="generateReport">
        <div class="flex flex-wrap lg:flex-nowrap items-end gap-x-4 gap-y-2">
          <div class="flex flex-col w-full sm:w-auto sm:min-w-[200px] lg:flex-1">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Search Families</label>
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search families..."
                class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full pr-8"
              />
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[1px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
          <div class="flex justify-end mt-2">
            <button type="submit" class="h-9 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
              Generate Report
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Statistics Cards -->
    <div class="w-full max-w-7xl mx-auto mb-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold text-gray-900">{{ totalClasses }}</div>
              <div class="text-sm text-gray-600">Classes Represented</div>
            </div>
          </div>
        </div>
        <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-4">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold text-gray-900">{{ totalLocations }}</div>
              <div class="text-sm text-gray-600">Locations</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Family List -->
    <div class="w-full max-w-7xl mx-auto">
      <!-- Data List Header -->
      <div class="w-full max-w-7xl mx-auto flex items-center justify-between mb-8">
        <div class="flex flex-col items-start">
          <h3 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce"></div>
            Family Details ({{ filteredFamilies.length }})
          </h3>
          <div class="h-[1px] bg-purple-200 w-full transition-all duration-500" style="max-width: 120px"></div>
        </div>
        <!-- Export Options (right) -->
        <div class="flex items-center gap-2">
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

      <!-- Family Table -->
      <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Family Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classes</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="family in filteredFamilies" :key="family.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
                        {{ family.name.charAt(0) }}
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ family.name }}</div>
                      <div class="text-sm text-gray-500">{{ family.father_name }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ family.students_count }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ family.classes.join(', ') }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ family.location }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ family.contact }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button class="text-purple-600 hover:text-purple-900 mr-3">View Details</button>
                  <button class="text-green-600 hover:text-green-900">View Students</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
const families = ref([])
const searchQuery = ref('')

// Ensure all reactive variables are properly initialized
const ensureReactivity = () => {
  if (!families.value) families.value = []
  if (!searchQuery.value) searchQuery.value = ''
}

const totalFamilies = computed(() => families.value.length)
const totalStudents = computed(() => families.value.reduce((sum, family) => sum + family.students.length, 0))
const totalClasses = computed(() => {
  const classes = new Set()
  families.value.forEach(family => {
    family.students.forEach(student => classes.add(student.class))
  })
  return classes.size
})
const totalLocations = computed(() => new Set(families.value.map(f => f.address)).size)

const filteredFamilies = computed(() => {
  if (!searchQuery.value) return families.value
  const query = searchQuery.value.toLowerCase()
  return families.value.filter(family => 
    family.name.toLowerCase().includes(query) ||
    family.head_name.toLowerCase().includes(query) ||
    family.address.toLowerCase().includes(query)
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

const generateReport = async () => {
  try {
    console.log('Generating family report...')
    const response = await axios.get('/reports/families')
    console.log('Family report data:', response.data)
    if (response.data.success) {
      families.value = response.data.result || []
      console.log('Families loaded:', families.value.length)
      console.log('Total students:', totalStudents.value)
    }
  } catch (error) {
    console.error('Failed to generate report:', error)
  }
}

const viewDetails = (family) => {
  // Implement family details view
}

const viewStudents = (family) => {
  // Implement students view
}

const exportToExcel = () => {
  // Implement Excel export
}

onMounted(() => {
  ensureReactivity()
  generateReport()
})
</script>

<style scoped>
.family-report-container {
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

.search-input {
  width: 300px;
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

.family-list {
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

.family-table {
  margin-top: 16px;
}

.family-details {
  padding: 20px;
  background: #f8fafc;
  border-radius: 8px;
}

.family-details h4 {
  margin: 0 0 16px 0;
  color: #1e293b;
  font-size: 16px;
}

.student-name {
  display: flex;
  align-items: center;
  gap: 12px;
}

@media (max-width: 768px) {
  .family-report-container {
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

  .search-input {
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
}
</style> 