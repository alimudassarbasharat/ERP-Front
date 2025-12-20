<template>
  <div class="space-y-6">
    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-4">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold text-gray-900">{{ statsLoading ? '...' : statistics.classes }}</div>
            <div class="text-sm text-gray-600">Total Classes</div>
          </div>
        </div>
      </div>
      
      <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-4">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold text-gray-900">{{ statsLoading ? '...' : statistics.sections }}</div>
            <div class="text-sm text-gray-600">Total Sections</div>
          </div>
        </div>
      </div>
      
      <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-4">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold text-gray-900">{{ statsLoading ? '...' : statistics.subjects }}</div>
            <div class="text-sm text-gray-600">Total Subjects</div>
          </div>
        </div>
      </div>
      
      <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-4">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold text-gray-900">{{ totalTeachers }}</div>
            <div class="text-sm text-gray-600">Total Teachers</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Teacher Distribution by Subject</h3>
          <div class="chart-container h-64">
            <canvas ref="subjectChart"></canvas>
          </div>
        </div>
        
        <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Monthly Attendance Trend</h3>
          <div class="chart-container h-64">
            <canvas ref="attendanceChart"></canvas>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Performance Rating Distribution</h3>
          <div class="chart-container h-64">
            <canvas ref="ratingChart"></canvas>
          </div>
        </div>
        
        <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Experience Level Distribution</h3>
          <div class="chart-container h-64">
            <canvas ref="experienceChart"></canvas>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activities -->
    <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Teacher Activities</h3>
      <div class="space-y-4">
        <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-gray-900">{{ activity.text }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useToast } from 'vue-toastification'

// Use statistics composable
const toast = useToast()
const { statistics, loading: statsLoading, error: statsError } = useStatistics()

// Ensure all reactive variables are properly initialized
const ensureReactivity = () => {
  if (!statistics.value) statistics.value = { classes: 0, sections: 0, subjects: 0 }
  if (statsLoading.value === undefined) statsLoading.value = true
  if (!recentActivities.value) recentActivities.value = []
  if (totalTeachers.value === undefined) totalTeachers.value = 45
  if (activeTeachers.value === undefined) activeTeachers.value = 42
  if (averageAttendance.value === undefined) averageAttendance.value = 94.5
  if (averageRating.value === undefined) averageRating.value = 4.2
}

// Reactive data
const totalTeachers = ref(45)
const activeTeachers = ref(42)
const averageAttendance = ref(94.5)
const averageRating = ref(4.2)

const recentActivities = ref([
  {
    id: 1,
    icon: 'Document',
    text: 'Ms. Sarah Johnson submitted monthly report',
    time: '2 hours ago'
  },
  {
    id: 2,
    icon: 'Calendar',
    text: 'Mr. David Wilson marked attendance for Class 10A',
    time: '4 hours ago'
  },
  {
    id: 3,
    icon: 'Star',
    text: 'Ms. Emily Brown received 5-star rating from students',
    time: '6 hours ago'
  },
  {
    id: 4,
    icon: 'User',
    text: 'New teacher Mr. Michael Chen joined Mathematics department',
    time: '1 day ago'
  }
])

// Chart references
const subjectChart = ref(null)
const attendanceChart = ref(null)
const ratingChart = ref(null)
const experienceChart = ref(null)

onMounted(() => {
  ensureReactivity()
  initializeCharts()
})

const initializeCharts = () => {
  // Subject Distribution Chart
  new Chart(subjectChart.value, {
    type: 'doughnut',
    data: {
      labels: ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Computer Science'],
      datasets: [{
        data: [8, 7, 6, 5, 4, 3],
        backgroundColor: [
          '#7c3aed', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  })

  // Attendance Trend Chart
  new Chart(attendanceChart.value, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Average Attendance %',
        data: [92, 94, 93, 95, 94, 94.5],
        borderColor: '#7c3aed',
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  })

  // Rating Distribution Chart
  new Chart(ratingChart.value, {
    type: 'bar',
    data: {
      labels: ['1★', '2★', '3★', '4★', '5★'],
      datasets: [{
        label: 'Number of Teachers',
        data: [2, 3, 8, 15, 17],
        backgroundColor: '#7c3aed'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })

  // Experience Distribution Chart
  new Chart(experienceChart.value, {
    type: 'pie',
    data: {
      labels: ['0-2 years', '3-5 years', '6-10 years', '10+ years'],
      datasets: [{
        data: [8, 12, 15, 10],
        backgroundColor: [
          '#3b82f6', '#10b981', '#f59e0b', '#ef4444'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  })
}
</script>

<style scoped>
.teacher-overview-report {
  padding: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #94a3b8;
}

.stat-icon.active {
  background: #dbeafe;
  color: #3b82f6;
}

.stat-icon.warning {
  background: #fef3c7;
  color: #f59e0b;
}

.stat-icon.success {
  background: #d1fae5;
  color: #10b981;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.stat-label {
  font-size: 14px;
  color: #94a3b8;
  margin: 0;
}

.charts-section {
  margin-bottom: 32px;
}

.chart-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.chart-card {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chart-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 20px 0;
}

.chart-container {
  height: 300px;
  position: relative;
}

.recent-activities {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 20px 0;
}

.activities-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: #f9fafb;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #7c3aed;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.activity-content {
  flex: 1;
}

.activity-text {
  font-size: 14px;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.activity-time {
  font-size: 12px;
  color: #94a3b8;
}

@media (max-width: 768px) {
  .chart-row {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style> 