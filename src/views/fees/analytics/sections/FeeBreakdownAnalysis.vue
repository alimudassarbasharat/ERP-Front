<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
    <!-- Header Section -->
    <div class="w-full">
      <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Detailed Fee Breakdown</h1>
              <p class="text-gray-600">Comprehensive analysis of all fee categories and their distribution</p>
            </div>
          </div>
          <div class="flex gap-3">
            <button 
              @click="exportData"
              class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Export
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Stats Cards -->
    <div class="w-full">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
              </svg>
            </div>
            <span class="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">+15.2%</span>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">{{ formatCurrency(totalTuitionFees) }}</h3>
          <p class="text-sm text-gray-600">Tuition Fees</p>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-green-100 to-green-200 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
              </svg>
            </div>
            <span class="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">+8.7%</span>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">{{ formatCurrency(totalLabFees) }}</h3>
          <p class="text-sm text-gray-600">Lab Charges</p>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2v0"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 5a2 2 0 012-2h2a2 2 0 012 2v0"/>
              </svg>
            </div>
            <span class="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">+12.3%</span>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">{{ formatCurrency(totalHostelFees) }}</h3>
          <p class="text-sm text-gray-600">Hostel Fees</p>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
              </svg>
            </div>
            <span class="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">+5.9%</span>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">{{ formatCurrency(totalTransportFees) }}</h3>
          <p class="text-sm text-gray-600">Transport Fees</p>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Fee Distribution Pie Chart -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold text-gray-900">Fee Distribution</h3>
            <div class="flex gap-2">
              <button 
                @click="updateChartData('monthly')"
                :class="[
                  'px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300',
                  selectedPeriod === 'monthly' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-white'
                ]"
              >
                Monthly
              </button>
              <button 
                @click="updateChartData('quarterly')"
                :class="[
                  'px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300',
                  selectedPeriod === 'quarterly' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-white'
                ]"
              >
                Quarterly
              </button>
            </div>
          </div>
          <div class="h-80">
            <apexchart
              type="pie"
              :options="pieChartOptions"
              :series="pieChartSeries"
              height="320"
            />
          </div>
        </div>

        <!-- Fee Trends Line Chart -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold text-gray-900">Fee Trends (Last 6 Months)</h3>
            <div class="flex gap-2">
              <button 
                @click="updateTrendData('collected')"
                :class="[
                  'px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300',
                  selectedTrend === 'collected' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-white'
                ]"
              >
                Collected
              </button>
              <button 
                @click="updateTrendData('pending')"
                :class="[
                  'px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300',
                  selectedTrend === 'pending' 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-white'
                ]"
              >
                Pending
              </button>
            </div>
          </div>
          <div class="h-80">
            <apexchart
              type="line"
              :options="lineChartOptions"
              :series="lineChartSeries"
              height="320"
            />
          </div>
        </div>
      </div>

      <!-- Fee Breakdown by Class -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold text-gray-900">Fee Breakdown by Class</h3>
          <div class="flex gap-2">
            <select 
              v-model="selectedFeeType"
              @change="updateBarChartData"
              class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="tuition">Tuition Fees</option>
              <option value="lab">Lab Charges</option>
              <option value="hostel">Hostel Fees</option>
              <option value="transport">Transport Fees</option>
            </select>
          </div>
        </div>
        <div class="h-96">
          <apexchart
            type="bar"
            :options="barChartOptions"
            :series="barChartSeries"
            height="380"
          />
        </div>
      </div>

      <!-- Detailed Fee Table -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold text-gray-900">Detailed Fee Breakdown</h3>
          <div class="flex gap-3">
            <button 
              @click="exportTableData"
              class="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Export Table
            </button>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-3 px-4 font-semibold text-gray-900">Fee Category</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-900">Total Amount</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-900">Collected</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-900">Pending</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-900">Collection Rate</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-900">Trend</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="fee in feeBreakdown" :key="fee.category" class="border-b border-gray-200 hover:bg-white transition-colors">
                <td class="py-3 px-4">
                  <div class="flex items-center gap-3">
                    <div :class="`w-3 h-3 rounded-full ${fee.color}`"></div>
                    <span class="font-medium text-gray-900">{{ fee.category }}</span>
                  </div>
                </td>
                <td class="py-3 px-4 font-semibold text-gray-900">{{ formatCurrency(fee.total) }}</td>
                <td class="py-3 px-4 text-green-600 font-semibold">{{ formatCurrency(fee.collected) }}</td>
                <td class="py-3 px-4 text-red-600 font-semibold">{{ formatCurrency(fee.pending) }}</td>
                <td class="py-3 px-4">
                  <div class="flex items-center gap-2">
                    <div class="w-16 bg-white rounded-full h-2">
                      <div 
                        class="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                        :style="`width: ${fee.collectionRate}%`"
                      ></div>
                    </div>
                    <span class="text-sm font-medium text-gray-600">{{ fee.collectionRate }}%</span>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <div class="flex items-center gap-1">
                    <svg v-if="fee.trend === 'up'" class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                    </svg>
                    <svg v-else class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"/>
                    </svg>
                    <span :class="`text-sm font-medium ${fee.trend === 'up' ? 'text-green-600' : 'text-red-600'}`">
                      {{ fee.trendValue }}%
                    </span>
                  </div>
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
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'

// Sample data - replace with real API calls
const toast = useToast()
const totalTuitionFees = ref(850000)
const totalLabFees = ref(125000)
const totalHostelFees = ref(320000)
const totalTransportFees = ref(95000)

const selectedPeriod = ref('monthly')
const selectedTrend = ref('collected')
const selectedFeeType = ref('tuition')

const feeBreakdown = ref([
  {
    category: 'Tuition Fees',
    total: 850000,
    collected: 765000,
    pending: 85000,
    collectionRate: 90,
    trend: 'up', 
    trendValue: 12.5,
    color: 'bg-blue-500'
  },
  {
    category: 'Lab Charges',
    total: 125000,
    collected: 112500,
    pending: 12500,
    collectionRate: 90,
    trend: 'up',
    trendValue: 8.7,
    color: 'bg-green-500'
  },
  {
    category: 'Hostel Fees',
    total: 320000,
    collected: 288000,
    pending: 32000,
    collectionRate: 90,
    trend: 'up',
    trendValue: 15.2,
    color: 'bg-purple-500'
  },
  {
    category: 'Transport Fees',
    total: 95000,
    collected: 85500,
    pending: 9500,
    collectionRate: 90,
    trend: 'down',
    trendValue: 3.2,
    color: 'bg-orange-500'
  }
])

// Pie Chart Configuration
const pieChartOptions = ref({
  chart: {
    type: 'pie',
    fontFamily: 'Inter, sans-serif',
    toolbar: {
      show: false
    }
  },
  colors: ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'],
  labels: ['Tuition Fees', 'Lab Charges', 'Hostel Fees', 'Transport Fees'],
  legend: {
    position: 'bottom',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    markers: {
      width: 12,
      height: 12,
      radius: 6
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function (val, opts) {
      return opts.w.globals.seriesTotals.reduce((a, b) => a + b, 0) > 0 
        ? Math.round(val) + '%' 
        : ''
    },
    style: {
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      fontWeight: 600
    }
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '16px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            color: '#374151'
          },
          value: {
            show: true,
            fontSize: '20px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            color: '#1F2937',
            formatter: function (val) {
              return new Intl.NumberFormat('en-PK', {
                style: 'currency',
                currency: 'PKR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val)
            }
          }
        }
      }
    }
  },
  stroke: {
    width: 0
  },
  states: {
    hover: {
      filter: {
        type: 'darken',
        value: 0.1
      }
    }
  }
})

const pieChartSeries = ref([850000, 125000, 320000, 95000])

// Line Chart Configuration
const lineChartOptions = ref({
  chart: {
    type: 'line',
    fontFamily: 'Inter, sans-serif',
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  colors: ['#10B981'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2,
    lineCap: 'round'
  },
  grid: {
    borderColor: '#E5E7EB',
    strokeDashArray: 4,
    xaxis: {
      lines: {
        show: true
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    labels: {
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
        colors: '#6B7280'
      }
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        return new Intl.NumberFormat('en-PK', {
          style: 'currency',
          currency: 'PKR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value)
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
        colors: '#6B7280'
      }
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  tooltip: {
    theme: 'light',
    style: {
      fontSize: '12px',
      fontFamily: 'Inter, sans-serif'
    },
    y: {
      formatter: function (value) {
        return new Intl.NumberFormat('en-PK', {
          style: 'currency',
          currency: 'PKR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value)
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.2,
      gradientToColors: ['#10B981'],
      inverseColors: false,
      opacityFrom: 0.4,
      opacityTo: 0.05,
      stops: [0, 100]
    }
  },
  markers: {
    size: 4,
    colors: ['#10B981'],
    strokeColors: '#ffffff',
    strokeWidth: 2,
    hover: {
      size: 6
    }
  },
  states: {
    hover: {
      filter: {
        type: 'darken',
        value: 0.1
      }
    }
  }
})

const lineChartSeries = ref([
  {
    name: 'Collected Fees',
    data: [650000, 720000, 680000, 750000, 820000, 890000]
  }
])

// Bar Chart Configuration
const barChartOptions = ref({
  chart: {
    type: 'bar',
    fontFamily: 'Inter, sans-serif',
    toolbar: {
      show: false
    }
  },
  colors: ['#8B5CF6'],
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: '60%',
      distributed: false
    }
  },
  dataLabels: {
    enabled: false
  },
  grid: {
    borderColor: '#E5E7EB',
    strokeDashArray: 4
  },
  xaxis: {
    categories: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    labels: {
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
        colors: '#6B7280'
      }
    }
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        return new Intl.NumberFormat('en-PK', {
          style: 'currency',
          currency: 'PKR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value)
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
        colors: '#6B7280'
      }
    }
  },
  tooltip: {
    theme: 'light',
    y: {
      formatter: function (value) {
        return new Intl.NumberFormat('en-PK', {
          style: 'currency',
          currency: 'PKR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value)
      }
    }
  }
})

const barChartSeries = ref([
  {
    name: 'Tuition Fees',
    data: [45000, 52000, 48000, 55000, 62000, 58000, 65000, 72000, 68000, 75000]
  }
])

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

const updateChartData = (period) => {
  selectedPeriod.value = period
  // Update chart data based on period
  if (period === 'monthly') {
    pieChartSeries.value = [850000, 125000, 320000, 95000]
  } else {
    pieChartSeries.value = [2550000, 375000, 960000, 285000]
  }
}

const updateTrendData = (trend) => {
  selectedTrend.value = trend
  if (trend === 'collected') {
    lineChartSeries.value = [{
      name: 'Collected Fees',
      data: [650000, 720000, 680000, 750000, 820000, 890000]
    }]
    lineChartOptions.value.colors = ['#10B981']
  } else {
    lineChartSeries.value = [{
      name: 'Pending Fees',
      data: [85000, 72000, 68000, 75000, 82000, 89000]
    }]
    lineChartOptions.value.colors = ['#EF4444']
  }
}

const updateBarChartData = () => {
  const dataMap = {
    tuition: [45000, 52000, 48000, 55000, 62000, 58000, 65000, 72000, 68000, 75000],
    lab: [8000, 9200, 8500, 9800, 11000, 10200, 11500, 12800, 12000, 13500],
    hostel: [22000, 25000, 23000, 27000, 30000, 28000, 32000, 35000, 33000, 38000],
    transport: [6500, 7500, 7000, 8000, 9000, 8500, 9500, 10500, 10000, 11500]
  }
  
  barChartSeries.value = [{
    name: selectedFeeType.value.charAt(0).toUpperCase() + selectedFeeType.value.slice(1) + ' Fees',
    data: dataMap[selectedFeeType.value]
  }]
}

const exportData = () => {
  // Implement export functionality
  console.log('Exporting fee breakdown data...')
}

const exportTableData = () => {
  // Implement table export functionality
  console.log('Exporting table data...')
}

onMounted(() => {
  // Load initial data
  console.log('Loading fee breakdown data...')
})
</script>

<style scoped>
/* Custom animations */
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

.bg-white {
  animation: slideInUp 0.6s ease-out forwards;
}

/* Stagger animation for cards */
.bg-white:nth-child(1) { animation-delay: 0.1s; }
.bg-white:nth-child(2) { animation-delay: 0.2s; }
.bg-white:nth-child(3) { animation-delay: 0.3s; }
.bg-white:nth-child(4) { animation-delay: 0.4s; }

/* Hover effects */
.hover\:shadow-xl:hover {
  transform: translateY(-2px);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #a855f7, #ec4899);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #9333ea, #db2777);
}
</style> 