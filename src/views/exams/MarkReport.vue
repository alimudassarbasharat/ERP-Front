<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
    <!-- Top Bar Header -->
    <div class="w-full max-w-7xl mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
      <h2 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        Mark Report System
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Dashboard</span>
        <span class="mx-2">|</span>
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Exams</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">Mark Report</span>
      </nav>
    </div>

    <!-- Select Criteria Label -->
    <div class="w-full max-w-7xl mx-auto mb-2">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-900 tracking-tight">Generate Mark Report</h3>
        <div class="h-[2px] bg-purple-200 w-full transition-all duration-300" style="max-width: 160px"></div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="w-full max-w-7xl mx-auto rounded-lg border border-gray-200 bg-white/90 px-4 sm:px-6 py-3 shadow-lg mb-6">
      <form class="w-full" @submit.prevent="generateReport">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Class</label>
            <div class="relative">
              <select v-model="selectedClass" @change="onClassChange" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-900 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="" class="text-gray-600">Select Class</option>
                <option v-for="cls in classes" :key="cls.id" :value="String(cls.id)" class="text-gray-900">{{ cls.name }}</option>
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
              <select v-model="selectedSection" @change="onSectionChange" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-900 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="" class="text-gray-600">All Sections</option>
                <option v-for="section in sections" :key="section.id" :value="String(section.id)" class="text-gray-900">{{ section.name }}</option>
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
              <select v-model="selectedExam" @change="onExamChange" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-900 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="" class="text-gray-600">Select Exam</option>
                <option v-for="exam in exams" :key="exam.id" :value="exam.id" class="text-gray-900">{{ exam.name }}</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>

          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Report Type</label>
            <div class="relative">
              <select v-model="reportType" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-900 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="detailed" class="text-gray-900">Detailed Report</option>
                <option value="summary" class="text-gray-900">Summary Report</option>
                <option value="class_wise" class="text-gray-900">Class-wise Report</option>
                <option value="subject_wise" class="text-gray-900">Subject-wise Report</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-2 mt-2">
          <button type="button" @click="clearFilters" class="h-10 px-8 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 text-sm font-bold text-white shadow hover:from-gray-600 hover:to-slate-600 transition-all duration-300 transform hover:scale-105">Clear</button>
          <button type="submit" class="h-10 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105" :disabled="!canGenerate">Generate Report</button>
        </div>
      </form>
    </div>

    <!-- Report Actions Header -->
    <div class="w-full max-w-7xl mx-auto flex items-center justify-between mb-8" v-if="reportData.length > 0">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-900 tracking-tight flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce"></div>
          Mark Report ({{ reportData.length }} records)
        </h3>
        <div class="h-[2px] bg-purple-200 w-full transition-all duration-500" style="max-width: 160px"></div>
      </div>
      
      <!-- Export Actions -->
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
        <button 
          @click="exportToExcel"
          class="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Export Excel
        </button>
      </div>
    </div>

    <div class="w-full" v-if="reportData.length > 0">
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
            <p class="text-gray-600 font-medium text-lg mb-1">Generating Report</p>
            <p class="text-gray-500 text-sm font-normal">Please wait while we generate your mark report...</p>
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
    <div v-else-if="!loading && reportData.length === 0 && hasSearched" class="w-full">
      <div class="border border-gray-200 rounded-xl p-8 bg-white/40 shadow-sm">
        <div class="flex flex-col items-center justify-center py-12">
          <div class="relative mb-6">
            <div class="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div class="absolute -top-2 -right-2 w-4 h-4 bg-purple-300 rounded-full animate-ping opacity-30"></div>
            <div class="absolute -bottom-2 -left-2 w-3 h-3 bg-indigo-300 rounded-full animate-pulse"></div>
          </div>
          <div class="w-full">
            <h3 class="text-gray-600 font-medium text-xl mb-2">No Data Found</h3>
            <p class="text-gray-500 text-sm font-normal leading-relaxed mb-4">
              No mark data found for the selected criteria. Please check if marks have been entered for the selected exam and class.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Initial State -->
    <div v-else-if="!loading && !hasSearched" class="w-full">
      <div class="border border-gray-200 rounded-xl p-8 bg-white/40 shadow-sm">
        <div class="flex flex-col items-center justify-center py-12">
          <div class="relative mb-6">
            <div class="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <div class="absolute -top-2 -right-2 w-4 h-4 bg-purple-300 rounded-full animate-ping opacity-30"></div>
          </div>
          <div class="w-full">
            <h3 class="text-gray-600 font-medium text-xl mb-2">Generate Mark Report</h3>
            <p class="text-gray-500 text-sm font-normal leading-relaxed mb-4">
              Select class, section, exam, and report type to generate comprehensive mark reports with detailed analytics and performance insights.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Report Table -->
    <div v-else-if="!loading && reportData.length > 0" class="w-full">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gradient-to-r from-indigo-50 to-purple-50">
              <tr>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">#</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Student</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Roll No</th>
                <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Total Marks</th>
                <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Obtained</th>
                <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Percentage</th>
                <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Grade</th>
                <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Status</th>
                <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Position</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(record, index) in reportData" :key="record.id" class="hover:bg-indigo-50 transition-colors border-b border-purple-200">
                <td class="py-3 px-4 text-gray-900 font-normal text-sm">{{ index + 1 }}</td>
                <td class="py-3 px-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
                      {{ getStudentInitials(record.student) }}
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ record.student?.first_name }} {{ record.student?.last_name }}</div>
                      <div class="text-xs text-gray-500">{{ record.student?.email || 'N/A' }}</div>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4 text-gray-900 font-normal text-sm">{{ record.student?.roll_number || 'N/A' }}</td>
                <td class="py-3 px-4 text-center">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ record.total_marks }}
                  </span>
                </td>
                <td class="py-3 px-4 text-center">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {{ record.total_mark_obtains }}
                  </span>
                </td>
                <td class="py-3 px-4 text-center">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {{ record.percentage }}{{ record.percentage && !record.percentage.includes('%') ? '%' : '' }}
                  </span>
                </td>
                <td class="py-3 px-4 text-center">
                  <span :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getGradeBadgeClass(record.grade)
                  ]">
                    {{ record.grade || 'N/A' }}
                  </span>
                </td>
                <td class="py-3 px-4 text-center">
                  <span :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    record.status === 'Pass' ? 'bg-green-100 text-green-800' : 
                    record.status === 'Fail' ? 'bg-red-100 text-red-800' : 
                    'bg-white text-gray-900'
                  ]">
                    {{ record.status || 'N/A' }}
                  </span>
                </td>
                <td class="py-3 px-4 text-center">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {{ record.position || 'N/A' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Statistics Summary -->
        <div v-if="reportData.length > 0" class="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-t border-purple-200">
          <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div class="text-lg font-bold text-gray-900">{{ reportData.length }}</div>
              <div class="text-sm text-gray-600">Total Students</div>
            </div>
            <div>
              <div class="text-lg font-bold text-green-700">{{ passCount }}</div>
              <div class="text-sm text-gray-600">Passed</div>
            </div>
            <div>
              <div class="text-lg font-bold text-red-700">{{ failCount }}</div>
              <div class="text-sm text-gray-600">Failed</div>
            </div>
            <div>
              <div class="text-lg font-bold text-purple-700">{{ averagePercentage }}%</div>
              <div class="text-sm text-gray-600">Average</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Pagination Section -->
      <div v-if="!loading && totalRecords > 0" class="w-full">
        <!-- Pagination Summary -->
        <div class="flex flex-row items-center justify-between mb-4">
          <div class="text-gray-600 text-sm font-medium px-2">
            Showing {{ (currentPage - 1) * pageSize + 1 }}
            to {{ Math.min(currentPage * pageSize, totalRecords) }}
            of {{ totalRecords }} entries
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
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import api from '@/utils/axios'

// Use centralized axios instance
const toast = useToast()
const axios = api

// Reactive data
const classes = ref([])
const sections = ref([])
const exams = ref([])
const reportData = ref([])
const selectedClass = ref('')
const selectedSection = ref('')
const selectedExam = ref('')
const reportType = ref('detailed')
const loading = ref(false)
const hasSearched = ref(false)

// Pagination
const currentPage = ref(1)
const pageSize = ref(20)
const totalRecords = ref(0)
const goToPage = ref(1)
const totalPages = computed(() => Math.ceil(totalRecords.value / pageSize.value))

// Computed properties
const canGenerate = computed(() => {
  return selectedClass.value && selectedExam.value
})

const passCount = computed(() => {
  return reportData.value.filter(record => record.status === 'Pass').length
})

const failCount = computed(() => {
  return reportData.value.filter(record => record.status === 'Fail').length
})

const averagePercentage = computed(() => {
  if (reportData.value.length === 0) return 0
  const total = reportData.value.reduce((sum, record) => {
    const percentage = parseFloat(record.percentage) || 0
    return sum + percentage
  }, 0)
  return Math.round(total / reportData.value.length)
})

// Methods
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
  } catch (error) {
    console.error('Error loading initial data:', error)
    toast.error('Failed to load initial data')
  }
}

const onClassChange = () => {
  console.log('Class changed to:', selectedClass.value)
  // Reset section if class changes
  selectedSection.value = ''
}

const onSectionChange = () => {
  console.log('Section changed to:', selectedSection.value)
}

const onExamChange = () => {
  console.log('Exam changed to:', selectedExam.value)
}

const generateReport = async () => {
  if (!canGenerate.value) {
    toast.warning('Please select class and exam to generate report')
    return
  }

  loading.value = true
  hasSearched.value = true
  
  try {
    const params = {
      class_id: selectedClass.value,
      exam_id: selectedExam.value,
      report_type: reportType.value,
      page: currentPage.value,
      per_page: pageSize.value
    }
    
    if (selectedSection.value) {
      params.section_id = selectedSection.value
    }
    
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/result-sheet`, { params })
    
    if (response.data.success) {
      reportData.value = response.data.result.data || []
      totalRecords.value = response.data.result.total || 0
      currentPage.value = response.data.result.current_page || 1
      if (reportData.value.length === 0) {
        toast.info('No mark data found for the selected criteria')
      } else {
        toast.success(`Report generated successfully with ${totalRecords.value} records`)
      }
    } else {
      reportData.value = []
      totalRecords.value = 0
      toast.error('Failed to generate report')
    }
  } catch (error) {
    console.error('Error generating report:', error)
    reportData.value = []
    totalRecords.value = 0
    toast.error('Failed to generate report')
  } finally {
    loading.value = false
  }
}

const clearFilters = () => {
  console.log('Clearing all filters')
  selectedClass.value = ''
  selectedSection.value = ''
  selectedExam.value = ''
  reportType.value = 'detailed'
  reportData.value = []
  totalRecords.value = 0
  currentPage.value = 1
  hasSearched.value = false
}

const handlePageChange = (page) => {
  currentPage.value = page
  generateReport()
}

const handlePerPageChange = () => {
  currentPage.value = 1
  generateReport()
}

const handleGoToPage = () => {
  if (goToPage.value >= 1 && goToPage.value <= totalPages.value) {
    currentPage.value = goToPage.value
    generateReport()
  }
}

const exportToPDF = () => {
  toast.info('PDF export functionality will be implemented soon!')
}

const exportToExcel = () => {
  toast.info('Excel export functionality will be implemented soon!')
}

// Lifecycle
onMounted(() => {
  initializeData()
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
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style> 