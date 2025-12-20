<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
    <!-- Top Bar Header -->
    <div class="w-full max-w-7xl mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
      <h2 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        Award & Achievement List
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Dashboard</span>
        <span class="mx-2">|</span>
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Exams</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">Award List</span>
      </nav>
    </div>

    <!-- Select Criteria Label -->
    <div class="w-full max-w-7xl mx-auto mb-2">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-900 tracking-tight">Filter Awards & Achievements</h3>
        <div class="h-[2px] bg-purple-200 w-full transition-all duration-300" style="max-width: 200px"></div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="w-full max-w-7xl mx-auto rounded-lg border border-gray-200 bg-white/90 px-4 sm:px-6 py-3 shadow-lg mb-6">
      <form class="w-full" @submit.prevent="applyFilters">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <option value="">All Exams</option>
                <option v-for="exam in exams" :key="exam.id" :value="exam.id">{{ exam.name }}</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>

          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Award Type</label>
            <div class="relative">
              <select v-model="selectedAwardType" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="">All Awards</option>
                <option value="first_position">First Position</option>
                <option value="second_position">Second Position</option>
                <option value="third_position">Third Position</option>
                <option value="highest_marks">Highest Marks</option>
                <option value="improvement">Most Improved</option>
                <option value="perfect_attendance">Perfect Attendance</option>
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
          <button type="submit" class="h-10 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">Filter Awards</button>
        </div>
      </form>
    </div>

    <!-- Awards Header -->
    <div class="w-full max-w-7xl mx-auto flex items-center justify-between mb-8">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce"></div>
          Awards & Achievements ({{ filteredAwards.length }})
        </h3>
        <div class="h-[2px] bg-purple-200 w-full transition-all duration-500" style="max-width: 180px"></div>
      </div>
      
      <!-- Actions -->
      <div class="flex items-center gap-3">
        <button 
          @click="generateCertificates"
          class="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
          </svg>
          Generate Certificates
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
            <p class="text-gray-600 font-medium text-lg mb-1">Loading Awards</p>
            <p class="text-gray-500 text-sm font-normal">Please wait while we fetch award data...</p>
            <div class="flex justify-center mt-3 space-x-1">
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Awards Found -->
    <div v-else-if="!loading && filteredAwards.length === 0" class="w-full">
      <div class="border border-gray-200 rounded-xl p-8 bg-white/40 shadow-sm">
        <div class="flex flex-col items-center justify-center py-12">
          <div class="relative mb-6">
            <div class="w-24 h-24 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
              </svg>
            </div>
            <div class="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full animate-ping opacity-30"></div>
            <div class="absolute -bottom-2 -left-2 w-3 h-3 bg-orange-300 rounded-full animate-pulse"></div>
          </div>
          <div class="w-full">
            <h3 class="text-gray-600 font-medium text-xl mb-2">No Awards Found</h3>
            <p class="text-gray-500 text-sm font-normal leading-relaxed mb-4">
              No awards or achievements match your current filters. Try adjusting your search criteria or check if awards have been generated for the selected exams.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Awards Grid -->
    <div v-else-if="!loading && filteredAwards.length > 0" class="w-full">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="award in filteredAwards" 
          :key="award.id" 
          class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div class="relative">
            <!-- Award Type Badge -->
            <div class="absolute top-4 right-4 z-10">
              <span :class="[
                'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                getAwardTypeBadgeClass(award.award_type)
              ]">
                {{ getAwardTypeLabel(award.award_type) }}
              </span>
            </div>
            
            <!-- Award Header with Icon -->
            <div :class="[
              'px-6 py-8 text-center relative overflow-hidden',
              getAwardHeaderClass(award.award_type)
            ]">
              <div class="relative z-10">
                <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                  <component :is="getAwardIcon(award.award_type)" class="w-8 h-8 text-white" />
                </div>
                <h3 class="text-xl font-bold text-white mb-1">{{ getAwardTitle(award.award_type) }}</h3>
                <p class="text-white/80 text-sm">{{ award.exam?.name || 'General Achievement' }}</p>
              </div>
              <!-- Background Pattern -->
              <div class="absolute inset-0 opacity-10">
                <div class="absolute top-0 left-0 w-32 h-32 rounded-full bg-white transform -translate-x-16 -translate-y-16"></div>
                <div class="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-white transform translate-x-12 translate-y-12"></div>
              </div>
            </div>
          </div>
          
          <!-- Student Info -->
          <div class="p-6">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
                {{ getStudentInitials(award.student) }}
              </div>
              <div class="flex-1">
                <h4 class="text-lg font-semibold text-gray-900">{{ award.student?.first_name }} {{ award.student?.last_name }}</h4>
                <p class="text-sm text-gray-500">{{ award.student?.roll_number ? `Roll: ${award.student.roll_number}` : 'N/A' }}</p>
              </div>
            </div>
            
            <!-- Award Details -->
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Class:</span>
                <span class="text-sm font-medium text-gray-900">{{ award.class?.name || 'N/A' }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Section:</span>
                <span class="text-sm font-medium text-gray-900">{{ award.section?.name || 'N/A' }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Position:</span>
                <span class="text-sm font-bold text-purple-700">{{ award.position || 'N/A' }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Marks:</span>
                <span class="text-sm font-medium text-green-700">{{ award.total_mark_obtains }}/{{ award.total_marks }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Percentage:</span>
                <span class="text-sm font-bold text-blue-700">{{ award.percentage }}%</span>
              </div>
            </div>
            
            <!-- Action Button -->
            <div class="mt-6">
              <button 
                @click="viewCertificate(award)"
                class="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
              >
                View Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, h, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import api from '@/utils/axios'

// Use centralized axios instance
const toast = useToast()
const axios = api

// Reactive data
const classes = ref([])
const sections = ref([])
const exams = ref([])
const awards = ref([])
const selectedClass = ref('')
const selectedSection = ref('')
const selectedExam = ref('')
const selectedAwardType = ref('')
const loading = ref(false)

// Mock award data - In real implementation, this would come from API
const mockAwards = ref([
  {
    id: 1,
    student: { id: 1, first_name: 'Ahmed', last_name: 'Ali', roll_number: 'A001', email: 'ahmed@example.com' },
    class: { id: 1, name: 'Class 10' },
    section: { id: 1, name: 'A' },
    exam: { id: 1, name: 'Final Exam 2024' },
    award_type: 'first_position',
    position: '1st',
    total_marks: 500,
    total_mark_obtains: 485,
    percentage: 97
  },
  {
    id: 2,
    student: { id: 2, first_name: 'Fatima', last_name: 'Khan', roll_number: 'A002', email: 'fatima@example.com' },
    class: { id: 1, name: 'Class 10' },
    section: { id: 1, name: 'A' },
    exam: { id: 1, name: 'Final Exam 2024' },
    award_type: 'second_position',
    position: '2nd',
    total_marks: 500,
    total_mark_obtains: 470,
    percentage: 94
  },
  {
    id: 3,
    student: { id: 3, first_name: 'Hassan', last_name: 'Sheikh', roll_number: 'A003', email: 'hassan@example.com' },
    class: { id: 1, name: 'Class 10' },
    section: { id: 1, name: 'A' },
    exam: { id: 1, name: 'Final Exam 2024' },
    award_type: 'third_position',
    position: '3rd',
    total_marks: 500,
    total_mark_obtains: 460,
    percentage: 92
  },
  {
    id: 4,
    student: { id: 4, first_name: 'Aisha', last_name: 'Rahman', roll_number: 'B001', email: 'aisha@example.com' },
    class: { id: 2, name: 'Class 9' },
    section: { id: 2, name: 'B' },
    exam: { id: 2, name: 'Mid Term 2024' },
    award_type: 'highest_marks',
    position: '1st',
    total_marks: 400,
    total_mark_obtains: 390,
    percentage: 97.5
  }
])

// Computed properties
const filteredAwards = computed(() => {
  let filtered = [...mockAwards.value]
  
  if (selectedClass.value) {
    filtered = filtered.filter(award => String(award.class.id) === selectedClass.value)
  }
  
  if (selectedSection.value) {
    filtered = filtered.filter(award => String(award.section.id) === selectedSection.value)
  }
  
  if (selectedExam.value) {
    filtered = filtered.filter(award => String(award.exam.id) === selectedExam.value)
  }
  
  if (selectedAwardType.value) {
    filtered = filtered.filter(award => award.award_type === selectedAwardType.value)
  }
  
  return filtered
})

// Methods
const getStudentInitials = (student) => {
  if (!student) return 'N/A'
  const firstName = student.first_name || ''
  const lastName = student.last_name || ''
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

const getAwardTypeLabel = (type) => {
  const labels = {
    first_position: '1st Position',
    second_position: '2nd Position',
    third_position: '3rd Position',
    highest_marks: 'Highest Marks',
    improvement: 'Most Improved',
    perfect_attendance: 'Perfect Attendance'
  }
  return labels[type] || 'Achievement'
}

const getAwardTypeBadgeClass = (type) => {
  const classes = {
    first_position: 'bg-yellow-100 text-yellow-800',
    second_position: 'bg-white text-gray-900',
    third_position: 'bg-orange-100 text-orange-800',
    highest_marks: 'bg-purple-100 text-purple-800',
    improvement: 'bg-green-100 text-green-800',
    perfect_attendance: 'bg-blue-100 text-blue-800'
  }
  return classes[type] || 'bg-white text-gray-900'
}

const getAwardHeaderClass = (type) => {
  const classes = {
    first_position: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    second_position: 'bg-gradient-to-br from-gray-400 to-gray-600',
    third_position: 'bg-gradient-to-br from-orange-400 to-orange-600',
    highest_marks: 'bg-gradient-to-br from-purple-400 to-purple-600',
    improvement: 'bg-gradient-to-br from-green-400 to-green-600',
    perfect_attendance: 'bg-gradient-to-br from-blue-400 to-blue-600'
  }
  return classes[type] || 'bg-gradient-to-br from-gray-400 to-gray-600'
}

const getAwardTitle = (type) => {
  const titles = {
    first_position: 'First Position',
    second_position: 'Second Position',
    third_position: 'Third Position',
    highest_marks: 'Highest Marks',
    improvement: 'Most Improved',
    perfect_attendance: 'Perfect Attendance'
  }
  return titles[type] || 'Achievement'
}

const getAwardIcon = (type) => {
  const icons = {
    first_position: () => h('svg', { class: 'w-8 h-8', fill: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { d: 'M5 16L3 5l5.5 1L12 4l3.5 2L21 5l-2 11H5zm6.5-10.5L9 7.5l-2.5-1.5L5 8.5l1.5 8.5h11L19 8.5l-1.5-2.5-2.5 1.5L12 5.5z' })
    ]),
    second_position: () => h('svg', { class: 'w-8 h-8', fill: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { d: 'M5 16L3 5l5.5 1L12 4l3.5 2L21 5l-2 11H5zm6.5-10.5L9 7.5l-2.5-1.5L5 8.5l1.5 8.5h11L19 8.5l-1.5-2.5-2.5 1.5L12 5.5z' })
    ]),
    third_position: () => h('svg', { class: 'w-8 h-8', fill: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { d: 'M5 16L3 5l5.5 1L12 4l3.5 2L21 5l-2 11H5zm6.5-10.5L9 7.5l-2.5-1.5L5 8.5l1.5 8.5h11L19 8.5l-1.5-2.5-2.5 1.5L12 5.5z' })
    ])
  }
  
  return icons[type] || (() => h('svg', { class: 'w-8 h-8', fill: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' })
  ]))
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
    
    // In real implementation, you would also fetch awards from API
    // const awardsRes = await axios.get(`${import.meta.env.VITE_API_URL}/awards`)
    // if (awardsRes.data.success) awards.value = awardsRes.data.result || []
    
  } catch (error) {
    console.error('Error loading initial data:', error)
    toast.error('Failed to load initial data')
  } finally {
    loading.value = false
  }
}

const onClassChange = () => {
  console.log('Class changed to:', selectedClass.value)
  selectedSection.value = '' // Reset section when class changes
}

const onSectionChange = () => {
  console.log('Section changed to:', selectedSection.value)
}

const onExamChange = () => {
  console.log('Exam changed to:', selectedExam.value)
}

const applyFilters = () => {
  // Filters are automatically applied through computed property
  toast.success(`Filtered to ${filteredAwards.value.length} awards`)
}

const clearFilters = () => {
  console.log('Clearing all filters')
  selectedClass.value = ''
  selectedSection.value = ''
  selectedExam.value = ''
  selectedAwardType.value = ''
}

const generateCertificates = () => {
  if (filteredAwards.value.length === 0) {
    toast.warning('No awards selected for certificate generation')
    return
  }
  toast.info(`Certificate generation for ${filteredAwards.value.length} awards will be implemented soon!`)
}

const exportToExcel = () => {
  if (filteredAwards.value.length === 0) {
    toast.warning('No awards to export')
    return
  }
  toast.info(`Excel export for ${filteredAwards.value.length} awards will be implemented soon!`)
}

const viewCertificate = (award) => {
  toast.info(`Certificate viewer for ${award.student.first_name} ${award.student.last_name} will be implemented soon!`)
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
</style> 