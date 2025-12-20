<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
    <!-- Top Bar Header -->
    <div class="w-full max-w-7xl mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
      <h2 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        Teacher Reports
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Dashboard</span>
        <span class="mx-2">|</span>
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Reports</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">Teacher Reports</span>
      </nav>
    </div>

    <!-- Select Criteria Label -->
    <div class="w-full max-w-7xl mx-auto mb-2">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-900 tracking-tight">Teacher Analytics</h3>
        <div class="h-[1px] bg-purple-200 w-full transition-all duration-300" style="max-width: 110px"></div>
      </div>
    </div>

    <!-- Filter Bar in Card -->
    <div class="w-full max-w-7xl mx-auto rounded-lg border border-gray-200 bg-white/90 px-4 sm:px-6 py-3 shadow-lg mb-6">
      <div class="flex flex-wrap lg:flex-nowrap items-end gap-x-4 gap-y-2">
        <div class="flex justify-end mt-2">
          <button 
            @click="exportAllReports"
            class="h-9 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Export All Reports
          </button>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="w-full max-w-7xl mx-auto">
      <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div class="border-b border-gray-200">
          <nav class="flex space-x-8 px-6" aria-label="Tabs">
            <button
              v-for="tab in tabs"
              :key="tab.name"
              @click="activeTab = tab.name"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200',
                activeTab === tab.name
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              {{ tab.label }}
            </button>
          </nav>
        </div>
        
        <div class="p-6">
          <!-- Overview Tab -->
          <div v-if="activeTab === 'overview'" class="space-y-6">
            <TeacherOverviewReport />
          </div>
          
          <!-- Performance Analytics Tab -->
          <div v-if="activeTab === 'performance'" class="space-y-6">
            <TeacherPerformanceAnalytics />
          </div>
          
          <!-- Attendance Reports Tab -->
          <div v-if="activeTab === 'attendance'" class="space-y-6">
            <TeacherAttendanceReports />
          </div>
          
          <!-- Subject-wise Reports Tab -->
          <div v-if="activeTab === 'subjects'" class="space-y-6">
            <TeacherSubjectReports />
          </div>
          
          <!-- Class-wise Reports Tab -->
          <div v-if="activeTab === 'classes'" class="space-y-6">
            <TeacherClassReports />
          </div>
          
          <!-- Salary Reports Tab -->
          <div v-if="activeTab === 'salary'" class="space-y-6">
            <TeacherSalaryReports />
          </div>
          
          <!-- Export & Print Tab -->
          <div v-if="activeTab === 'export'" class="space-y-6">
            <TeacherExportReports />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const route = useRoute()
const toast = useToast()
const activeTab = ref('overview')

// Tab configuration
const tabs = [
  { name: 'overview', label: 'Overview' },
  { name: 'performance', label: 'Performance Analytics' },
  { name: 'attendance', label: 'Attendance Reports' },
  { name: 'subjects', label: 'Subject-wise Reports' },
  { name: 'classes', label: 'Class-wise Reports' },
  { name: 'salary', label: 'Salary Reports' },
  { name: 'export', label: 'Export & Print' }
]

// Export all reports
const exportAllReports = () => {
  toast.success('Exporting all teacher reports...')
  console.log('Exporting all teacher reports...')
}

// Set active tab based on route
onMounted(() => {
  const path = route.path
  if (path.includes('/performance')) {
    activeTab.value = 'performance'
  } else if (path.includes('/attendance')) {
    activeTab.value = 'attendance'
  } else if (path.includes('/subjects')) {
    activeTab.value = 'subjects'
  } else if (path.includes('/classes')) {
    activeTab.value = 'classes'
  } else if (path.includes('/salary')) {
    activeTab.value = 'salary'
  } else if (path.includes('/export')) {
    activeTab.value = 'export'
  } else {
    activeTab.value = 'overview'
  }
})
</script>

<style scoped>
.teacher-reports-container {
  padding: 24px;
  background: #f8fafc;
  min-height: 100vh;
}

.reports-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header-content .page-title {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.header-content .page-description {
  font-size: 16px;
  color: #94a3b8;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.reports-navigation {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.reports-tabs {
  padding: 0;
}

.reports-tabs :deep(.el-tabs__header) {
  margin: 0;
  padding: 0 24px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.reports-tabs :deep(.el-tabs__nav-wrap) {
  padding: 0;
}

.reports-tabs :deep(.el-tabs__item) {
  padding: 16px 20px;
  font-weight: 500;
  color: #94a3b8;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.reports-tabs :deep(.el-tabs__item.is-active) {
  color: #8b5cf6;
  border-bottom-color: #8b5cf6;
}

.reports-tabs :deep(.el-tabs__content) {
  padding: 0;
}

.tab-content {
  padding: 24px;
  min-height: 400px;
}

@media (max-width: 768px) {
  .reports-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .header-actions {
    width: 100%;
  }
  
  .reports-tabs :deep(.el-tabs__header) {
    padding: 0 16px;
  }
  
  .tab-content {
    padding: 16px;
  }
}
</style> 