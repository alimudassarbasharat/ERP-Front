<template>
  <div class="student-fee-dashboard">
    <!-- Header Section -->
    <div class="dashboard-header">
      <div class="header-content">
        <h1 class="dashboard-title">Student Fee Dashboard</h1>
        <p class="dashboard-subtitle">Comprehensive overview of individual student fee status and performance</p>
      </div>
      <div class="header-actions">
        <button class="refresh-btn" @click="refreshData">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Refresh
        </button>
      </div>
    </div>

    <!-- Quick Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon bg-green-100">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3 class="stat-value">{{ formatCurrency(totalPaidAmount) }}</h3>
          <p class="stat-label">Total Paid Amount</p>
          <div class="stat-change positive">+{{ paidPercentage }}% this month</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon bg-red-100">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3 class="stat-value">{{ formatCurrency(totalDueAmount) }}</h3>
          <p class="stat-label">Total Due Amount</p>
          <div class="stat-change negative">-{{ duePercentage }}% this month</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon bg-blue-100">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3 class="stat-value">{{ totalStudents }}</h3>
          <p class="stat-label">Active Students</p>
          <div class="stat-change positive">+{{ studentGrowth }}% this month</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon bg-purple-100">
          <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3 class="stat-value">{{ collectionRate }}%</h3>
          <p class="stat-label">Collection Rate</p>
          <div class="stat-change positive">+{{ rateGrowth }}% this month</div>
        </div>
      </div>
    </div>

    <!-- Student Performance Chart -->
    <div class="chart-section">
      <div class="chart-header">
        <h2 class="chart-title">Student Fee Performance Trend</h2>
        <div class="chart-controls">
          <select v-model="selectedPeriod" class="period-select">
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 3 Months</option>
            <option value="365">Last Year</option>
          </select>
        </div>
      </div>
      <div class="chart-container">
        <VueApexCharts 
          :options="chartOptions" 
          :series="chartSeries" 
          height="350"
          type="area"
        />
      </div>
    </div>

    <!-- Top Performers & Alerts -->
    <div class="dashboard-grid">
      <!-- Top Performing Students -->
      <div class="dashboard-card">
        <div class="card-header">
          <h3 class="card-title">Top Performing Students</h3>
          <button class="view-all-btn">View All</button>
        </div>
        <div class="student-list">
          <div v-for="(student, index) in topPerformers" :key="student.id" class="student-item">
            <div class="student-rank">{{ index + 1 }}</div>
            <div class="student-avatar">
              <div class="avatar-placeholder">{{ student.name.charAt(0) }}</div>
            </div>
            <div class="student-info">
              <h4 class="student-name">{{ student.name }}</h4>
              <p class="student-class">{{ student.class }}</p>
            </div>
            <div class="student-stats">
              <div class="payment-status paid">Paid</div>
              <div class="payment-amount">{{ formatCurrency(student.amount) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Fee Alerts -->
      <div class="dashboard-card">
        <div class="card-header">
          <h3 class="card-title">Fee Alerts</h3>
          <button class="view-all-btn">View All</button>
        </div>
        <div class="alerts-list">
          <div v-for="alert in feeAlerts" :key="alert.id" class="alert-item" :class="alert.type">
            <div class="alert-icon">
              <svg v-if="alert.type === 'due'" class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <svg v-else-if="alert.type === 'overdue'" class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
              <svg v-else class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="alert-content">
              <h4 class="alert-title">{{ alert.title }}</h4>
              <p class="alert-description">{{ alert.description }}</p>
              <div class="alert-time">{{ alert.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Fee Transactions -->
    <div class="transactions-section">
      <div class="section-header">
        <h2 class="section-title">Recent Fee Transactions</h2>
        <div class="section-actions">
          <button class="export-btn">Export</button>
          <button class="filter-btn">Filter</button>
        </div>
      </div>
      <div class="transactions-table">
        <table class="table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Class</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in recentTransactions" :key="transaction.id">
              <td>
                <div class="student-cell">
                  <div class="student-avatar-small">{{ transaction.student.charAt(0) }}</div>
                  <span>{{ transaction.student }}</span>
                </div>
              </td>
              <td>{{ transaction.class }}</td>
              <td class="amount-cell">{{ formatCurrency(transaction.amount) }}</td>
              <td>{{ transaction.paymentMethod }}</td>
              <td>
                <span class="status-badge" :class="transaction.status">
                  {{ transaction.status }}
                </span>
              </td>
              <td>{{ formatDate(transaction.date) }}</td>
              <td>
                <button class="action-btn">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import { ref, onMounted } from 'vue'

// Reactive data
const toast = useToast()
const totalPaidAmount = ref(1850000)
const totalDueAmount = ref(450000)
const totalStudents = ref(1250)
const collectionRate = ref(85)
const selectedPeriod = ref('30')

// Sample data
const topPerformers = ref([
  { id: 1, name: 'Ahmad Ali', class: 'Class 10-A', amount: 50000 },
  { id: 2, name: 'Sara Khan', class: 'Class 9-B', amount: 48000 },
  { id: 3, name: 'Hassan Ahmed', class: 'Class 8-C', amount: 45000 },
  { id: 4, name: 'Fatima Sheikh', class: 'Class 11-A', amount: 42000 },
  { id: 5, name: 'Usman Khan', class: 'Class 12-B', amount: 40000 }
])

const feeAlerts = ref([
  { id: 1, type: 'due', title: 'Payment Due Tomorrow', description: '15 students have fees due tomorrow', time: '2 hours ago' },
  { id: 2, type: 'overdue', title: 'Overdue Payments', description: '8 students have overdue payments', time: '4 hours ago' },
  { id: 3, type: 'success', title: 'Bulk Payment Received', description: '25 students paid their fees today', time: '6 hours ago' }
])

const recentTransactions = ref([
  { id: 1, student: 'Ahmad Ali', class: 'Class 10-A', amount: 5000, paymentMethod: 'Cash', status: 'completed', date: '2024-01-15' },
  { id: 2, student: 'Sara Khan', class: 'Class 9-B', amount: 4500, paymentMethod: 'Online', status: 'completed', date: '2024-01-15' },
  { id: 3, student: 'Hassan Ahmed', class: 'Class 8-C', amount: 4000, paymentMethod: 'Cheque', status: 'pending', date: '2024-01-14' },
  { id: 4, student: 'Fatima Sheikh', class: 'Class 11-A', amount: 5500, paymentMethod: 'Bank Transfer', status: 'completed', date: '2024-01-14' },
  { id: 5, student: 'Usman Khan', class: 'Class 12-B', amount: 6000, paymentMethod: 'Cash', status: 'completed', date: '2024-01-13' }
])

// Computed properties
const paidPercentage = computed(() => 12.5)
const duePercentage = computed(() => 5.2)
const studentGrowth = computed(() => 3.7)
const rateGrowth = computed(() => 8.3)

// Chart configuration
const chartOptions = ref({
  chart: {
    type: 'area',
    toolbar: { show: false },
    background: 'transparent',
    fontFamily: 'Inter, sans-serif',
    foreColor: '#64748b'
  },
  colors: ['#10b981', '#3b82f6', '#f59e0b'],
  dataLabels: { enabled: false },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.2,
      gradientToColors: ['#10b981', '#3b82f6', '#f59e0b'],
      inverseColors: false,
      opacityFrom: 0.7,
      opacityTo: 0.1,
      stops: [0, 100]
    }
  },
  grid: {
    borderColor: '#e2e8f0',
    strokeDashArray: 5,
    yaxis: { lines: { show: true } },
    xaxis: { lines: { show: false } }
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    labels: { style: { colors: '#64748b', fontSize: '12px' } }
  },
  yaxis: {
    labels: { 
      style: { colors: '#64748b', fontSize: '12px' },
      formatter: (value) => `${value}K`
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    fontSize: '14px',
    markers: { width: 8, height: 8, radius: 8 }
  },
  tooltip: {
    theme: 'light',
    y: { formatter: (value) => `${value}K` }
  }
})

const chartSeries = ref([
  { name: 'Paid Amount', data: [150, 180, 220, 280, 320, 350, 380, 420, 450, 480, 520, 550] },
  { name: 'Due Amount', data: [50, 60, 80, 100, 120, 90, 70, 50, 40, 30, 20, 15] },
  { name: 'Collection Rate', data: [75, 78, 82, 85, 87, 89, 91, 93, 94, 95, 96, 97] }
])

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

const formatDate = (date) => {
  return dayjs(date).format('DD MMM YYYY')
}

const refreshData = () => {
  // Implement data refresh logic
  console.log('Refreshing student fee dashboard data...')
}

onMounted(() => {
  // Load initial data
  console.log('Student Fee Dashboard mounted')
})
</script>

<style scoped>
.student-fee-dashboard {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.dashboard-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.dashboard-subtitle {
  color: #64748b;
  margin: 0.5rem 0 0 0;
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #ffffff;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.refresh-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.stat-label {
  color: #64748b;
  margin: 0.25rem 0;
  font-size: 0.875rem;
}

.stat-change {
  font-size: 0.75rem;
  font-weight: 600;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.negative {
  color: #ef4444;
}

.chart-section {
  background: #ffffff;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.chart-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.period-select {
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background: #ffffff;
  color: #1e293b;
  font-size: 0.875rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.dashboard-card {
  background: #ffffff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.view-all-btn {
  color: #8b5cf6;
  background: none;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
}

.student-list, .alerts-list {
  space-y: 0.75rem;
}

.student-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
}

.student-item:hover {
  background: #f8fafc;
}

.student-rank {
  width: 2rem;
  height: 2rem;
  background: #6366f1;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.student-avatar {
  width: 2.5rem;
  height: 2.5rem;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.student-info {
  flex: 1;
}

.student-name {
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  font-size: 0.875rem;
}

.student-class {
  color: #64748b;
  margin: 0;
  font-size: 0.75rem;
}

.student-stats {
  text-align: right;
}

.payment-status {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-bottom: 0.25rem;
}

.payment-status.paid {
  background: #dcfce7;
  color: #10b981;
}

.payment-amount {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.875rem;
}

.alert-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  transition: background-color 0.2s ease;
}

.alert-item:hover {
  background: #f8fafc;
}

.alert-item.due {
  border-left: 4px solid #ef4444;
}

.alert-item.overdue {
  border-left: 4px solid #f97316;
}

.alert-item.success {
  border-left: 4px solid #10b981;
}

.alert-content {
  flex: 1;
}

.alert-title {
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;
}

.alert-description {
  color: #64748b;
  margin: 0 0 0.25rem 0;
  font-size: 0.75rem;
}

.alert-time {
  color: #94a3b8;
  font-size: 0.75rem;
}

.transactions-section {
  background: #ffffff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.section-actions {
  display: flex;
  gap: 0.75rem;
}

.export-btn, .filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background: #ffffff;
  color: #1e293b;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.export-btn:hover, .filter-btn:hover {
  background: #f8fafc;
  border-color: #94a3b8;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  text-align: left;
  padding: 0.75rem;
  background: #f8fafc;
  color: #1e293b;
  font-weight: 600;
  font-size: 0.875rem;
  border-bottom: 1px solid #e2e8f0;
}

.table td {
  padding: 0.75rem;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.875rem;
}

.student-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.student-avatar-small {
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.75rem;
}

.amount-cell {
  font-weight: 600;
  color: #1e293b;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge.completed {
  background: #dcfce7;
  color: #10b981;
}

.status-badge.pending {
  background: #fef3c7;
  color: #f59e0b;
}

.action-btn {
  padding: 0.25rem 0.75rem;
  background: #6366f1;
  color: #ffffff;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.action-btn:hover {
  background: #5855eb;
}

@media (max-width: 768px) {
  .student-fee-dashboard {
    padding: 1rem;
  }
  
  .dashboard-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
  }
}
</style> 