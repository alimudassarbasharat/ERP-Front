<template>
  <div class="student-overview-report">
    <!-- Statistics Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <el-icon><User /></el-icon>
        </div>
        <div class="stat-content">
          <h3 class="stat-number">{{ statsLoading ? '...' : statistics.classes }}</h3>
          <p class="stat-label">Total Classes</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon active">
          <el-icon><User /></el-icon>
        </div>
        <div class="stat-content">
          <h3 class="stat-number">{{ statsLoading ? '...' : statistics.sections }}</h3>
          <p class="stat-label">Total Sections</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon warning">
          <el-icon><Clock /></el-icon>
        </div>
        <div class="stat-content">
          <h3 class="stat-number">{{ statsLoading ? '...' : statistics.subjects }}</h3>
          <p class="stat-label">Total Subjects</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon success">
          <el-icon><Star /></el-icon>
        </div>
        <div class="stat-content">
          <h3 class="stat-number">{{ totalStudents }}</h3>
          <p class="stat-label">Total Students</p>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="charts-section">
      <div class="chart-row">
        <div class="chart-card">
          <h3 class="chart-title">Student Distribution by Class</h3>
          <div class="chart-container">
            <canvas ref="classChart"></canvas>
          </div>
        </div>
        
        <div class="chart-card">
          <h3 class="chart-title">Monthly Attendance Trend</h3>
          <div class="chart-container">
            <canvas ref="attendanceChart"></canvas>
          </div>
        </div>
      </div>
      
      <div class="chart-row">
        <div class="chart-card">
          <h3 class="chart-title">Grade Distribution</h3>
          <div class="chart-container">
            <canvas ref="gradeChart"></canvas>
          </div>
        </div>
        
        <div class="chart-card">
          <h3 class="chart-title">Gender Distribution</h3>
          <div class="chart-container">
            <canvas ref="genderChart"></canvas>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activities -->
    <div class="recent-activities">
      <h3 class="section-title">Recent Student Activities</h3>
      <div class="activities-list">
        <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
          <div class="activity-icon">
            <el-icon><component :is="activity.icon" /></el-icon>
          </div>
          <div class="activity-content">
            <p class="activity-text">{{ activity.text }}</p>
            <span class="activity-time">{{ activity.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

// Use statistics composable
const toast = useToast()
const { statistics, loading: statsLoading, error: statsError } = useStatistics()

// Reactive data
const totalStudents = ref(1250)
const activeStudents = ref(1180)
const averageAttendance = ref(92.5)
const averageGrade = ref(78.3)

const recentActivities = ref([
  {
    id: 1,
    icon: 'Document',
    text: 'John Smith submitted assignment for Mathematics',
    time: '2 hours ago'
  },
  {
    id: 2,
    icon: 'Calendar',
    text: 'Sarah Johnson marked present for Class 10A',
    time: '4 hours ago'
  },
  {
    id: 3,
    icon: 'Star',
    text: 'Michael Brown received A+ grade in Physics',
    time: '6 hours ago'
  },
  {
    id: 4,
    icon: 'User',
    text: 'New student Emma Wilson enrolled in Class 9B',
    time: '1 day ago'
  }
])

// Chart references
const classChart = ref(null)
const attendanceChart = ref(null)
const gradeChart = ref(null)
const genderChart = ref(null)

onMounted(() => {
  initializeCharts()
})

const initializeCharts = () => {
  // Class Distribution Chart
  new Chart(classChart.value, {
    type: 'doughnut',
    data: {
      labels: ['Class 9', 'Class 10', 'Class 11', 'Class 12'],
      datasets: [{
        data: [320, 280, 350, 300],
        backgroundColor: [
          '#7c3aed', '#3b82f6', '#10b981', '#f59e0b'
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
        data: [90, 91, 92, 93, 92.5, 92.5],
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

  // Grade Distribution Chart
  new Chart(gradeChart.value, {
    type: 'bar',
    data: {
      labels: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D'],
      datasets: [{
        label: 'Number of Students',
        data: [150, 200, 250, 300, 200, 100, 50],
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

  // Gender Distribution Chart
  new Chart(genderChart.value, {
    type: 'pie',
    data: {
      labels: ['Male', 'Female'],
      datasets: [{
        data: [650, 600],
        backgroundColor: [
          '#3b82f6', '#ec4899'
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
.student-overview-report {
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