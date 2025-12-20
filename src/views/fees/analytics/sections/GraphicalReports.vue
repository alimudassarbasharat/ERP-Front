<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
    <!-- Header Section -->
    <div class="w-full">
      <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Graphical Reports</h1>
              <p class="text-gray-600">Advanced visual analytics and data insights</p>
            </div>
          </div>
          <div class="flex gap-3">
            <button 
              @click="exportAllCharts"
              class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Export All
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
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
            <span class="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">+18.5%</span>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">{{ formatCurrency(totalRevenue) }}</h3>
          <p class="text-sm text-gray-600">Total Revenue</p>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-green-100 to-green-200 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">+12.3%</span>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">{{ formatCurrency(collectionRate) }}%</h3>
          <p class="text-sm text-gray-600">Collection Rate</p>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <span class="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">+8.7%</span>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">{{ activeStudents }}</h3>
          <p class="text-sm text-gray-600">Active Students</p>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">-2.1%</span>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">{{ formatCurrency(pendingAmount) }}</h3>
          <p class="text-sm text-gray-600">Pending Amount</p>
        </div>
      </div>
    </div>

    <!-- Charts Grid -->
    <div class="w-full">
      <!-- Row 1: Area Chart and Donut Chart -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Revenue Trend Area Chart -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold text-gray-900">Revenue Trend (Last 12 Months)</h3>
            <div class="flex gap-2">
              <button 
                @click="updateAreaChartData('revenue')"
                :class="[
                  'px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300',
                  selectedAreaChart === 'revenue' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-white'
                ]"
              >
                Revenue
              </button>
              <button 
                @click="updateAreaChartData('collections')"
                :class="[
                  'px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300',
                  selectedAreaChart === 'collections' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-white'
                ]"
              >
                Collections
              </button>
            </div>
          </div>
          <div class="h-80">
            <apexchart
              type="area"
              :options="areaChartOptions"
              :series="areaChartSeries"
              height="320"
            />
          </div>
        </div>

        <!-- Payment Methods Donut Chart -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold text-gray-900">Payment Methods Distribution</h3>
            <div class="flex gap-2">
              <button 
                @click="updateDonutChartData('methods')"
                :class="[
                  'px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300',
                  selectedDonutChart === 'methods' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-white'
                ]"
              >
                Methods
              </button>
              <button 
                @click="updateDonutChartData('status')"
                :class="[
                  'px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300',
                  selectedDonutChart === 'status' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-white'
                ]"
              >
                Status
              </button>
            </div>
          </div>
          <div class="h-80">
            <apexchart
              type="donut"
              :options="donutChartOptions"
              :series="donutChartSeries"
              height="320"
            />
          </div>
        </div>
      </div>

      <!-- Row 2: Radar Chart and Bar Chart -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Performance Radar Chart -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold text-gray-900">Performance Metrics</h3>
            <div class="flex gap-2">
              <button 
                @click="updateRadarChartData('performance')"
                :class="[
                  'px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300',
                  selectedRadarChart === 'performance' 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-white'
                ]"
              >
                Performance
              </button>
              <button 
                @click="updateRadarChartData('efficiency')"
                :class="[
                  'px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300',
                  selectedRadarChart === 'efficiency' 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-white'
                ]"
              >
                Efficiency
              </button>
            </div>
          </div>
          <div class="h-80">
            <apexchart
              type="radar"
              :options="radarChartOptions"
              :series="radarChartSeries"
              height="320"
            />
          </div>
        </div>

        <!-- Monthly Comparison Bar Chart -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold text-gray-900">Monthly Fee Comparison</h3>
            <div class="flex gap-2">
              <select 
                v-model="selectedComparison"
                @change="updateComparisonChart"
                class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="current">Current Year</option>
                <option value="previous">Previous Year</option>
                <option value="both">Both Years</option>
              </select>
            </div>
          </div>
          <div class="h-80">
            <apexchart
              type="bar"
              :options="comparisonChartOptions"
              :series="comparisonChartSeries"
              height="320"
            />
          </div>
        </div>
      </div>

      <!-- Row 3: Heatmap and Scatter Plot -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Fee Collection Heatmap -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold text-gray-900">Collection Heatmap</h3>
            <div class="flex gap-2">
              <button 
                @click="updateHeatmapData('daily')"
                :class="[
                  'px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300',
                  selectedHeatmap === 'daily' 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-white'
                ]"
              >
                Daily
              </button>
              <button 
                @click="updateHeatmapData('weekly')"
                :class="[
                  'px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300',
                  selectedHeatmap === 'weekly' 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-white'
                ]"
              >
                Weekly
              </button>
            </div>
          </div>
          <div class="h-80">
            <apexchart
              type="heatmap"
              :options="heatmapChartOptions"
              :series="heatmapChartSeries"
              height="320"
            />
          </div>
        </div>

        <!-- Fee vs Time Scatter Plot -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold text-gray-900">Payment Patterns</h3>
            <div class="flex gap-2">
              <button 
                @click="updateScatterData('amount')"
                :class="[
                  'px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300',
                  selectedScatter === 'amount' 
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-white'
                ]"
              >
                Amount
              </button>
              <button 
                @click="updateScatterData('frequency')"
                :class="[
                  'px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300',
                  selectedScatter === 'frequency' 
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-white'
                ]"
              >
                Frequency
              </button>
            </div>
          </div>
          <div class="h-80">
            <apexchart
              type="scatter"
              :options="scatterChartOptions"
              :series="scatterChartSeries"
              height="320"
            />
          </div>
        </div>
      </div>

      <!-- Row 4: Multi-Axis Chart -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold text-gray-900">Comprehensive Fee Analysis</h3>
          <div class="flex gap-2">
            <button 
              @click="updateMultiAxisData('trends')"
              :class="[
                'px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300',
                selectedMultiAxis === 'trends' 
                  ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-white'
              ]"
            >
              Trends
            </button>
            <button 
              @click="updateMultiAxisData('projections')"
              :class="[
                'px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300',
                selectedMultiAxis === 'projections' 
                  ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-white'
              ]"
            >
              Projections
            </button>
          </div>
        </div>
        <div class="h-96">
          <apexchart
            type="line"
            :options="multiAxisChartOptions"
            :series="multiAxisChartSeries"
            height="380"
          />
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
const totalRevenue = ref(2850000)
const collectionRate = ref(92.5)
const activeStudents = ref(1250) 
const pendingAmount = ref(185000)

const selectedAreaChart = ref('revenue')
const selectedDonutChart = ref('methods')
const selectedRadarChart = ref('performance')
const selectedHeatmap = ref('daily')
const selectedScatter = ref('amount')
const selectedMultiAxis = ref('trends')
const selectedComparison = ref('current')

// Area Chart Configuration
const areaChartOptions = ref({
  chart: {
    type: 'area',
    fontFamily: 'Inter, sans-serif',
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  colors: ['#8B5CF6'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2,
    lineCap: 'round'
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.3,
      gradientToColors: ['#EC4899'],
      inverseColors: false,
      opacityFrom: 0.6,
      opacityTo: 0.1,
      stops: [0, 100]
    }
  },
  grid: {
    borderColor: '#E5E7EB',
    strokeDashArray: 4
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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

const areaChartSeries = ref([
  {
    name: 'Revenue',
    data: [180000, 220000, 195000, 240000, 280000, 320000, 295000, 350000, 380000, 420000, 395000, 450000]
  }
])

// Donut Chart Configuration
const donutChartOptions = ref({
  chart: {
    type: 'donut',
    fontFamily: 'Inter, sans-serif'
  },
  colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
  labels: ['Cash', 'Online', 'Cheque', 'Bank Transfer', 'Other'],
  legend: {
    position: 'bottom',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif'
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
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 0
  }
})

const donutChartSeries = ref([450000, 380000, 220000, 180000, 120000])

// Radar Chart Configuration
const radarChartOptions = ref({
  chart: {
    type: 'radar',
    fontFamily: 'Inter, sans-serif',
    toolbar: {
      show: false
    }
  },
  colors: ['#8B5CF6'],
  xaxis: {
    categories: ['Collection Rate', 'Payment Speed', 'Student Satisfaction', 'Revenue Growth', 'Efficiency', 'Compliance'],
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
        return value + '%'
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
        colors: '#6B7280'
      }
    }
  },
  plotOptions: {
    radar: {
      polygons: {
        strokeColors: '#E5E7EB',
        fill: {
          colors: ['#F9FAFB', '#F3F4F6']
        }
      }
    }
  },
  fill: {
    opacity: 0.6
  },
  stroke: {
    width: 2
  },
  markers: {
    size: 4,
    colors: ['#8B5CF6'],
    strokeColors: '#ffffff',
    strokeWidth: 2
  }
})

const radarChartSeries = ref([
  {
    name: 'Performance',
    data: [92, 85, 88, 95, 78, 90]
  }
])

// Comparison Bar Chart Configuration
const comparisonChartOptions = ref({
  chart: {
    type: 'bar',
    fontFamily: 'Inter, sans-serif',
    toolbar: {
      show: false
    }
  },
  colors: ['#3B82F6', '#10B981'],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      borderRadius: 6
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
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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

const comparisonChartSeries = ref([
  {
    name: 'Current Year',
    data: [180000, 220000, 195000, 240000, 280000, 320000, 295000, 350000, 380000, 420000, 395000, 450000]
  },
  {
    name: 'Previous Year',
    data: [150000, 180000, 165000, 200000, 230000, 260000, 240000, 280000, 300000, 330000, 310000, 350000]
  }
])

// Heatmap Chart Configuration
const heatmapChartOptions = ref({
  chart: {
    type: 'heatmap',
    fontFamily: 'Inter, sans-serif',
    toolbar: {
      show: false
    }
  },
  colors: ['#FEF3C7', '#FDE68A', '#F59E0B', '#D97706', '#92400E'],
  dataLabels: {
    enabled: false
  },
  xaxis: {
    type: 'category',
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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

const heatmapChartSeries = ref([
  {
    name: 'Week 1',
    data: [
      { x: 'Mon', y: 25000 },
      { x: 'Tue', y: 35000 },
      { x: 'Wed', y: 45000 },
      { x: 'Thu', y: 30000 },
      { x: 'Fri', y: 40000 },
      { x: 'Sat', y: 20000 },
      { x: 'Sun', y: 15000 }
    ]
  }
])

// Scatter Chart Configuration
const scatterChartOptions = ref({
  chart: {
    type: 'scatter',
    fontFamily: 'Inter, sans-serif',
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  colors: ['#10B981'],
  grid: {
    borderColor: '#E5E7EB',
    strokeDashArray: 4
  },
  xaxis: {
    type: 'datetime',
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
    x: {
      format: 'dd MMM yyyy'
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
  }
})

const scatterChartSeries = ref([
  {
    name: 'Payments',
    data: [
      [new Date('2024-01-01').getTime(), 25000],
      [new Date('2024-01-15').getTime(), 35000],
      [new Date('2024-02-01').getTime(), 45000],
      [new Date('2024-02-15').getTime(), 30000],
      [new Date('2024-03-01').getTime(), 40000],
      [new Date('2024-03-15').getTime(), 55000],
      [new Date('2024-04-01').getTime(), 38000],
      [new Date('2024-04-15').getTime(), 42000]
    ]
  }
])

// Multi-Axis Chart Configuration
const multiAxisChartOptions = ref({
  chart: {
    type: 'line',
    fontFamily: 'Inter, sans-serif',
    toolbar: {
      show: false
    }
  },
  colors: ['#8B5CF6', '#10B981', '#F59E0B'],
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    borderColor: '#E5E7EB',
    strokeDashArray: 4
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    labels: {
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
        colors: '#6B7280'
      }
    }
  },
  yaxis: [
    {
      title: {
        text: 'Revenue (PKR)',
        style: {
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
          color: '#8B5CF6'
        }
      },
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
          colors: '#8B5CF6'
        }
      }
    },
    {
      opposite: true,
      title: {
        text: 'Collection Rate (%)',
        style: {
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
          color: '#10B981'
        }
      },
      labels: {
        formatter: function (value) {
          return value + '%'
        },
        style: {
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
          colors: '#10B981'
        }
      }
    }
  ],
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

const multiAxisChartSeries = ref([
  {
    name: 'Revenue',
    type: 'line',
    data: [180000, 220000, 195000, 240000, 280000, 320000, 295000, 350000, 380000, 420000, 395000, 450000]
  },
  {
    name: 'Collection Rate',
    type: 'line',
    data: [85, 88, 87, 90, 92, 94, 91, 93, 95, 96, 94, 97]
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

// Chart update functions
const updateAreaChartData = (type) => {
  selectedAreaChart.value = type
  if (type === 'revenue') {
    areaChartSeries.value = [{
      name: 'Revenue',
      data: [180000, 220000, 195000, 240000, 280000, 320000, 295000, 350000, 380000, 420000, 395000, 450000]
    }]
  } else {
    areaChartSeries.value = [{
      name: 'Collections',
      data: [165000, 200000, 180000, 220000, 260000, 300000, 275000, 325000, 350000, 390000, 365000, 420000]
    }]
  }
}

const updateDonutChartData = (type) => {
  selectedDonutChart.value = type
  if (type === 'methods') {
    donutChartOptions.value.labels = ['Cash', 'Online', 'Cheque', 'Bank Transfer', 'Other']
    donutChartSeries.value = [450000, 380000, 220000, 180000, 120000]
  } else {
    donutChartOptions.value.labels = ['Paid', 'Partial', 'Pending', 'Overdue', 'Waived']
    donutChartSeries.value = [850000, 120000, 85000, 45000, 25000]
  }
}

const updateRadarChartData = (type) => {
  selectedRadarChart.value = type
  if (type === 'performance') {
    radarChartSeries.value = [{
      name: 'Performance',
      data: [92, 85, 88, 95, 78, 90]
    }]
  } else {
    radarChartSeries.value = [{
      name: 'Efficiency',
      data: [88, 92, 85, 90, 95, 87]
    }]
  }
}

const updateComparisonChart = () => {
  if (selectedComparison.value === 'current') {
    comparisonChartSeries.value = [{
      name: 'Current Year',
      data: [180000, 220000, 195000, 240000, 280000, 320000, 295000, 350000, 380000, 420000, 395000, 450000]
    }]
  } else if (selectedComparison.value === 'previous') {
    comparisonChartSeries.value = [{
      name: 'Previous Year',
      data: [150000, 180000, 165000, 200000, 230000, 260000, 240000, 280000, 300000, 330000, 310000, 350000]
    }]
  } else {
    comparisonChartSeries.value = [
      {
        name: 'Current Year',
        data: [180000, 220000, 195000, 240000, 280000, 320000, 295000, 350000, 380000, 420000, 395000, 450000]
      },
      {
        name: 'Previous Year',
        data: [150000, 180000, 165000, 200000, 230000, 260000, 240000, 280000, 300000, 330000, 310000, 350000]
      }
    ]
  }
}

const updateHeatmapData = (type) => {
  selectedHeatmap.value = type
  // Update heatmap data based on type
}

const updateScatterData = (type) => {
  selectedScatter.value = type
  // Update scatter data based on type
}

const updateMultiAxisData = (type) => {
  selectedMultiAxis.value = type
  // Update multi-axis data based on type
}

const exportAllCharts = () => {
  console.log('Exporting all charts...')
}

onMounted(() => {
  console.log('Loading graphical reports...')
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