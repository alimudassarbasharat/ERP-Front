<template>
  <div class="space-y-6">
    <!-- Performance Metrics -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">Performance Metrics</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-4">
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-sm font-medium text-gray-900">Student Satisfaction</h4>
            <span class="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">Excellent</span>
          </div>
          <div class="text-2xl font-bold text-gray-900 mb-2">4.6/5.0</div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style="width: 92%"></div>
          </div>
        </div>
        
        <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-4">
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-sm font-medium text-gray-900">Class Performance</h4>
            <span class="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">Good</span>
          </div>
          <div class="text-2xl font-bold text-gray-900 mb-2">78.5%</div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full" style="width: 78.5%"></div>
          </div>
        </div>
        
        <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-4">
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-sm font-medium text-gray-900">Attendance Rate</h4>
            <span class="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">Excellent</span>
          </div>
          <div class="text-2xl font-bold text-gray-900 mb-2">96.2%</div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style="width: 96.2%"></div>
          </div>
        </div>
        
        <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-4">
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-sm font-medium text-gray-900">Professional Development</h4>
            <span class="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">In Progress</span>
          </div>
          <div class="text-2xl font-bold text-gray-900 mb-2">85%</div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style="width: 85%"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Performance Charts -->
    <div class="space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Performance Trend (Last 6 Months)</h3>
          <div class="chart-container h-64">
            <canvas ref="performanceTrendChart"></canvas>
          </div>
        </div>
        
        <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Subject-wise Performance</h3>
          <div class="chart-container h-64">
            <canvas ref="subjectPerformanceChart"></canvas>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Student Feedback Distribution</h3>
          <div class="chart-container h-64">
            <canvas ref="feedbackChart"></canvas>
          </div>
        </div>
        
        <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Professional Development Progress</h3>
          <div class="chart-container h-64">
            <canvas ref="developmentChart"></canvas>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Performers -->
    <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Performing Teachers</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="teacher in topPerformers" :key="teacher.id" class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
          <div class="flex items-center space-x-3">
            <div class="relative">
              <div class="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
                {{ teacher.name.charAt(0) }}
              </div>
              <div class="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {{ teacher.rank }}
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-medium text-gray-900 truncate">{{ teacher.name }}</h4>
              <p class="text-xs text-gray-500">{{ teacher.subject }}</p>
              <div class="flex items-center mt-1">
                <div class="flex items-center">
                  <div class="flex text-yellow-400">
                    <svg v-for="i in 5" :key="i" class="w-3 h-3" :class="i <= teacher.rating ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <span class="text-xs text-gray-600 ml-1">{{ teacher.rating }}/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useToast } from 'vue-toastification'

// Custom progress colors
const toast = useToast()
const customColors = [
  { color: '#ef4444', percentage: 20 },
  { color: '#f59e0b', percentage: 40 },
  { color: '#10b981', percentage: 60 },
  { color: '#3b82f6', percentage: 80 },
  { color: '#7c3aed', percentage: 100 }
]

// Ensure all reactive variables are properly initialized
const ensureReactivity = () => {
  if (!topPerformers.value) topPerformers.value = []
  if (!departmentComparison.value) departmentComparison.value = []
}

// Top performers data
const topPerformers = ref([
  {
    id: 1,
    name: 'Ms. Sarah Johnson',
    subject: 'Mathematics',
    rating: 4.8,
    attendance: 98,
    score: 95,
    rank: 1,
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  },
  {
    id: 2,
    name: 'Mr. David Wilson',
    subject: 'Physics',
    rating: 4.7,
    attendance: 97,
    score: 93,
    rank: 2,
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  },
  {
    id: 3,
    name: 'Ms. Emily Brown',
    subject: 'English',
    rating: 4.6,
    attendance: 96,
    score: 91,
    rank: 3,
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  }
])

// Department comparison data
const departmentComparison = ref([
  {
    department: 'Mathematics',
    avgRating: 4.5,
    avgAttendance: 95.2,
    avgPerformance: 88.5,
    status: 'Excellent'
  },
  {
    department: 'Science',
    avgRating: 4.3,
    avgAttendance: 93.8,
    avgPerformance: 85.2,
    status: 'Good'
  },
  {
    department: 'English',
    avgRating: 4.4,
    avgAttendance: 94.1,
    avgPerformance: 86.7,
    status: 'Good'
  },
  {
    department: 'History',
    avgRating: 4.2,
    avgAttendance: 92.5,
    avgPerformance: 83.1,
    status: 'Average'
  }
])

// Chart references
const performanceTrendChart = ref(null)
const subjectPerformanceChart = ref(null)
const feedbackChart = ref(null)
const developmentChart = ref(null)

const getStatusType = (status) => {
  switch (status) {
    case 'Excellent': return 'success'
    case 'Good': return 'warning'
    case 'Average': return 'info'
    default: return 'info'
  }
}

onMounted(() => {
  ensureReactivity()
  initializeCharts()
})

const initializeCharts = () => {
  // Performance Trend Chart
  new Chart(performanceTrendChart.value, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Student Satisfaction',
          data: [4.2, 4.3, 4.4, 4.5, 4.6, 4.6],
          borderColor: '#7c3aed',
          backgroundColor: 'rgba(124, 58, 237, 0.1)',
          tension: 0.4
        },
        {
          label: 'Class Performance',
          data: [72, 74, 76, 77, 78, 78.5],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 5
        }
      }
    }
  })

  // Subject Performance Chart
  new Chart(subjectPerformanceChart.value, {
    type: 'radar',
    data: {
      labels: ['Student Satisfaction', 'Class Performance', 'Attendance', 'Professional Development', 'Innovation'],
      datasets: [{
        label: 'Mathematics',
        data: [4.6, 88, 96, 85, 90],
        borderColor: '#7c3aed',
        backgroundColor: 'rgba(124, 58, 237, 0.2)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  })

  // Feedback Distribution Chart
  new Chart(feedbackChart.value, {
    type: 'doughnut',
    data: {
      labels: ['Excellent', 'Good', 'Average', 'Below Average'],
      datasets: [{
        data: [45, 35, 15, 5],
        backgroundColor: [
          '#10b981', '#3b82f6', '#f59e0b', '#ef4444'
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

  // Development Progress Chart
  new Chart(developmentChart.value, {
    type: 'bar',
    data: {
      labels: ['Training Completed', 'Certifications', 'Workshops', 'Research Papers', 'Innovation Projects'],
      datasets: [{
        label: 'Progress %',
        data: [85, 70, 90, 60, 75],
        backgroundColor: '#7c3aed'
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
}
</script>

<style scoped>
.teacher-performance-analytics {
  padding: 0;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 24px 0;
}

.metrics-section {
  margin-bottom: 32px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.metric-card {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.metric-header h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.metric-value {
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
}

.metric-progress {
  margin-top: 12px;
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

.top-performers {
  margin-bottom: 32px;
}

.performers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.performer-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 16px;
}

.performer-avatar {
  position: relative;
}

.rank-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 24px;
  height: 24px;
  background: #7c3aed;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.performer-info {
  flex: 1;
}

.performer-name {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.performer-subject {
  font-size: 14px;
  color: #94a3b8;
  margin: 0 0 8px 0;
}

.performer-stats {
  display: flex;
  gap: 16px;
}

.stat {
  font-size: 12px;
  color: #94a3b8;
}

.performer-score {
  text-align: center;
}

.score {
  font-size: 24px;
  font-weight: 700;
  color: #8b5cf6;
}

.score-label {
  font-size: 12px;
  color: #94a3b8;
}

.comparison-section {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .chart-row {
    grid-template-columns: 1fr;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .performers-grid {
    grid-template-columns: 1fr;
  }
  
  .performer-card {
    flex-direction: column;
    text-align: center;
  }
}
</style> 