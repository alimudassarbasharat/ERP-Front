<template>
  <div class="space-y-8">
    <!-- Payment Method Distribution -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="method in paymentMethods" :key="method.name" 
           class="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <div class="flex items-center justify-between mb-4">
          <div :class="[
            'w-12 h-12 rounded-full flex items-center justify-center',
            method.bgColor
          ]">
            <svg class="w-6 h-6" :class="method.textColor" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" :d="method.icon"/>
            </svg>
          </div>
          <span :class="[
            'text-xs font-semibold px-2 py-1 rounded-full',
            method.changeColor
          ]">{{ method.change }}</span>
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-1">{{ method.count }}</h3>
        <p class="text-sm text-gray-600 mb-2">{{ method.name }}</p>
        <div class="text-xs text-gray-500">{{ formatCurrency(method.amount) }}</div>
        <div class="mt-3 w-full bg-white rounded-full h-2">
          <div :class="[
            'h-2 rounded-full',
            method.progressColor
          ]" :style="`width: ${method.percentage}%`"></div>
        </div>
      </div>
    </div>

    <!-- Payment Trends Chart -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Monthly Payment Trends -->
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
          </div>
          Monthly Payment Trends
        </h3>
        
        <!-- Chart Placeholder -->
        <div class="flex items-center justify-center h-64 bg-white rounded-lg">
          <div class="text-center">
            <svg class="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
            <p class="text-gray-500">Monthly Trends Chart</p>
            <p class="text-xs text-gray-500">Chart will be implemented</p>
          </div>
        </div>
      </div>

      <!-- Payment Status Distribution -->
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div class="w-8 h-8 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          Payment Status Distribution
        </h3>
        
        <div class="space-y-4">
          <div v-for="status in paymentStatus" :key="status.name" class="flex items-center justify-between p-4 bg-white rounded-lg">
            <div class="flex items-center gap-3">
              <div :class="[
                'w-4 h-4 rounded-full',
                status.color
              ]"></div>
              <span class="font-medium text-gray-900">{{ status.name }}</span>
            </div>
            <div class="text-right">
              <div class="font-semibold text-gray-900">{{ status.count }}</div>
              <div class="text-sm text-gray-500">{{ status.percentage }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Late Payment Analysis -->
    <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
        <div class="w-8 h-8 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        Late Payment Analysis
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-red-50 rounded-lg p-4 border border-red-200">
          <h4 class="font-semibold text-red-800 mb-2">Overdue Payments</h4>
          <div class="text-2xl font-bold text-red-600">{{ latePayments.overdue }}</div>
          <div class="text-sm text-red-500">{{ formatCurrency(latePayments.overdueAmount) }}</div>
        </div>
        
        <div class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <h4 class="font-semibold text-yellow-800 mb-2">Due This Week</h4>
          <div class="text-2xl font-bold text-yellow-600">{{ latePayments.dueThisWeek }}</div>
          <div class="text-sm text-yellow-500">{{ formatCurrency(latePayments.dueThisWeekAmount) }}</div>
        </div>
        
        <div class="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <h4 class="font-semibold text-orange-800 mb-2">Late Fee Collected</h4>
          <div class="text-2xl font-bold text-orange-600">{{ formatCurrency(latePayments.lateFeeCollected) }}</div>
          <div class="text-sm text-orange-500">This month</div>
        </div>
      </div>
    </div>

    <!-- Payment Comparison Table -->
    <div class="bg-white rounded-xl shadow-lg border border-gray-200">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-bold text-gray-900 flex items-center gap-3">
          <div class="w-8 h-8 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          Monthly Payment Comparison
        </h3>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-white">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Collections</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Achievement</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Online Payments</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cash Payments</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late Payments</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="month in monthlyComparison" :key="month.month" class="hover:bg-white transition-colors duration-200">
              <td class="px-6 py-4 #ffffffspace-nowrap text-sm font-medium text-gray-900">{{ month.month }}</td>
              <td class="px-6 py-4 #ffffffspace-nowrap text-sm text-gray-900">{{ formatCurrency(month.collections) }}</td>
              <td class="px-6 py-4 #ffffffspace-nowrap text-sm text-gray-900">{{ formatCurrency(month.target) }}</td>
              <td class="px-6 py-4 #ffffffspace-nowrap">
                <span :class="[
                  'px-2 py-1 text-xs font-semibold rounded-full',
                  month.achievement >= 100 ? 'bg-green-100 text-green-700' :
                  month.achievement >= 80 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                ]">
                  {{ month.achievement }}%
                </span>
              </td>
              <td class="px-6 py-4 #ffffffspace-nowrap text-sm text-blue-600">{{ formatCurrency(month.online) }}</td>
              <td class="px-6 py-4 #ffffffspace-nowrap text-sm text-green-600">{{ formatCurrency(month.cash) }}</td>
              <td class="px-6 py-4 #ffffffspace-nowrap text-sm text-red-600">{{ month.lateCount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'

// Payment methods data
const toast = useToast()
const paymentMethods = ref([
  {
    name: 'Online Payments',
    count: 1250, 
    amount: 2500000,
    percentage: 75,
    change: '+12%',
    bgColor: 'bg-gradient-to-r from-blue-100 to-blue-200',
    textColor: 'text-blue-600',
    progressColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
    changeColor: 'bg-green-100 text-green-700',
    icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
  },
  {
    name: 'Cash Payments',
    count: 850,
    amount: 1700000,
    percentage: 65,
    change: '-5%',
    bgColor: 'bg-gradient-to-r from-green-100 to-green-200',
    textColor: 'text-green-600',
    progressColor: 'bg-gradient-to-r from-green-500 to-green-600',
    changeColor: 'bg-red-100 text-red-700',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
  },
  {
    name: 'Bank Transfer',
    count: 420,
    amount: 840000,
    percentage: 45,
    change: '+8%',
    bgColor: 'bg-gradient-to-r from-purple-100 to-purple-200',
    textColor: 'text-purple-600',
    progressColor: 'bg-gradient-to-r from-purple-500 to-purple-600',
    changeColor: 'bg-green-100 text-green-700',
    icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
  },
  {
    name: 'Cheque',
    count: 180,
    amount: 360000,
    percentage: 25,
    change: '-15%',
    bgColor: 'bg-gradient-to-r from-orange-100 to-orange-200',
    textColor: 'text-orange-600',
    progressColor: 'bg-gradient-to-r from-orange-500 to-orange-600',
    changeColor: 'bg-red-100 text-red-700',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  }
])

// Payment status data
const paymentStatus = ref([
  { name: 'Fully Paid', count: 1850, percentage: 75, color: 'bg-green-500' },
  { name: 'Partially Paid', count: 350, percentage: 15, color: 'bg-yellow-500' },
  { name: 'Pending', count: 250, percentage: 10, color: 'bg-red-500' }
])

// Late payments data
const latePayments = ref({
  overdue: 125,
  overdueAmount: 625000,
  dueThisWeek: 87,
  dueThisWeekAmount: 435000,
  lateFeeCollected: 45000
})

// Monthly comparison data
const monthlyComparison = ref([
  {
    month: 'January 2024',
    collections: 2500000,
    target: 2400000,
    achievement: 104,
    online: 1500000,
    cash: 800000,
    lateCount: 25
  },
  {
    month: 'December 2023',
    collections: 2200000,
    target: 2400000,
    achievement: 92,
    online: 1300000,
    cash: 750000,
    lateCount: 35
  },
  {
    month: 'November 2023',
    collections: 2350000,
    target: 2400000,
    achievement: 98,
    online: 1400000,
    cash: 780000,
    lateCount: 28
  },
  // Add more months
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

onMounted(() => {
  console.log('Loading payment analysis data...')
})
</script>

<style scoped>
/* Animation for cards */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.payment-card {
  animation: slideInUp 0.6s ease-out forwards;
}

.payment-card:nth-child(1) { animation-delay: 0.1s; }
.payment-card:nth-child(2) { animation-delay: 0.2s; }
.payment-card:nth-child(3) { animation-delay: 0.3s; }
.payment-card:nth-child(4) { animation-delay: 0.4s; }
</style> 