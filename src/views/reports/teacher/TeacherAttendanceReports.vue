<template>
  <div class="space-y-6">
    <!-- Attendance Statistics -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-4">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold text-gray-900">{{ attendanceStats.present }}</div>
            <div class="text-sm text-gray-600">Present Today</div>
          </div>
        </div>
      </div>
      
      <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-4">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold text-gray-900">{{ attendanceStats.absent }}</div>
            <div class="text-sm text-gray-600">Absent Today</div>
          </div>
        </div>
      </div>
      
      <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-4">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold text-gray-900">{{ attendanceStats.late }}</div>
            <div class="text-sm text-gray-600">Late Today</div>
          </div>
        </div>
      </div>
      
      <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-4">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold text-gray-900">{{ attendanceStats.rate }}%</div>
            <div class="text-sm text-gray-600">Attendance Rate</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Attendance Charts -->
    <div class="space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Monthly Attendance Trend</h3>
          <div class="chart-container h-64">
            <canvas ref="monthlyTrendChart"></canvas>
          </div>
        </div>
        
        <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Department-wise Attendance</h3>
          <div class="chart-container h-64">
            <canvas ref="departmentChart"></canvas>
          </div>
        </div>
      </div>
    </div>

    <!-- Attendance Table -->
    <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Today's Attendance</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in Time</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out Time</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="teacher in todayAttendance" :key="teacher.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
                      {{ teacher.name.charAt(0) }}
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ teacher.name }}</div>
                    <div class="text-sm text-gray-500">{{ teacher.subject }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ teacher.department }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ teacher.checkInTime || 'Not checked in' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ teacher.checkOutTime || 'Not checked out' }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                      :class="getStatusClass(teacher.status)">
                  {{ teacher.status }}
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
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

// Reactive data
const attendanceStats = ref({
  present: 0,
  absent: 0,
  late: 0,
  rate: 0
})

const todayAttendance = ref([])

// Methods
const getStatusClass = (status) => {
  switch (status) {
    case 'Present':
      return 'bg-green-100 text-green-800'
    case 'Absent':
      return 'bg-red-100 text-red-800'
    case 'Late':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Chart references
const monthlyTrendChart = ref(null)
const departmentChart = ref(null)

onMounted(() => {
  // Initialize with sample data
  attendanceStats.value = {
    present: 45,
    absent: 3,
    late: 2,
    rate: 94
  }
  
  todayAttendance.value = [
    {
      id: 1,
      name: 'John Doe',
      subject: 'Mathematics',
      department: 'Science',
      checkInTime: '08:30 AM',
      checkOutTime: '04:30 PM',
      status: 'Present'
    },
    {
      id: 2,
      name: 'Jane Smith',
      subject: 'English',
      department: 'Arts',
      checkInTime: '08:45 AM',
      checkOutTime: null,
      status: 'Present'
    }
  ]
})
</script>

<style scoped>
.teacher-attendance-reports {
  padding: 0;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 24px 0;
}

.attendance-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.summary-card {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.summary-card h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 16px 0;
}

.summary-value {
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
}

.attendance-chart {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
}

.attendance-chart h4 {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 20px 0;
}

.attendance-chart canvas {
  height: 300px;
}

.attendance-table {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.attendance-table h4 {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 20px 0;
}

@media (max-width: 768px) {
  .attendance-summary {
    grid-template-columns: 1fr;
  }
}
</style> 