<template>
  <div class="relative w-full min-h-screen pl-0 pr-0 sm:pl-0 sm:pr-0 lg:pl-1 lg:pr-0 py-2 sm:py-3 lg:py-4">
    <!-- Enhanced Background Effects -->
    <div class="absolute left-0 bottom-0 w-[700px] h-[500px] bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-3xl rounded-full z-0 pointer-events-none animate-pulse"></div>
    <div class="absolute right-0 top-0 w-[600px] h-[400px] bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-3xl rounded-full z-0 pointer-events-none animate-pulse" style="animation-delay: 2s;"></div>
    <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-gradient-to-r from-green-400/10 to-emerald-400/10 blur-2xl rounded-full z-0 pointer-events-none animate-pulse" style="animation-delay: 4s;"></div>
    
    <!-- Enhanced Header Section -->
    <div class="relative z-10 mb-6 rounded-xl border border-gray-200/50 bg-white/60 px-6 py-8 shadow-lg backdrop-filter backdrop-blur-xl">
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div class="header-content">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-sm text-green-600 font-medium">System Online</span>
          </div>
          <h1 class="text-base font-bold text-gray-900 tracking-tight">
            Good {{ timeOfDay }}, <span class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{{ userName }}</span>
          </h1>
          <p class="text-gray-600 mt-3 font-medium text-sm">{{ greetingMessage }}</p>
          <div class="flex items-center gap-4 mt-4">
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <Clock :size="16" class="animate-icon-bounce" />
              <span>{{ currentTime }}</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <Calendar :size="16" class="animate-icon-bounce" style="animation-delay: 0.5s;" />
              <span>{{ currentDate }}</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <button @click="refreshData" :disabled="refreshing" class="flex items-center gap-2 h-12 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
            <RefreshCw :size="18" :class="refreshing ? 'animate-spin' : ''" />
            {{ refreshing ? 'Refreshing...' : 'Refresh Data' }}
          </button>
          <button @click="exportReport" class="flex items-center gap-2 h-12 px-6 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
            <Download :size="18" class="animate-bounce-slow" />
            Export Report
          </button>
        </div>
      </div>
    </div>

    <!-- Main Date Filter -->
    <div class="relative z-10 mb-6 rounded-xl border border-gray-200/50 bg-white/60 px-6 py-4 shadow-lg backdrop-filter backdrop-blur-xl">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div class="flex items-center gap-3">
          <CalendarDays :size="20" class="text-indigo-600 animate-icon-bounce" />
          <span class="text-sm font-medium text-gray-900">Main Date Filter</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <label class="text-xs font-medium text-gray-600">From:</label>
            <input 
              v-model="mainDateFilter.startDate" 
              type="date" 
              class="h-8 px-3 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
              @change="applyMainDateFilter"
            />
          </div>
          <div class="flex items-center gap-2">
            <label class="text-xs font-medium text-gray-600">To:</label>
            <input 
              v-model="mainDateFilter.endDate" 
              type="date" 
              class="h-8 px-3 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
              @change="applyMainDateFilter"
            />
          </div>
          <button 
            @click="clearMainDateFilter" 
            class="h-8 px-3 rounded-lg bg-white text-gray-600 text-xs font-medium hover:bg-white transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>

    <!-- Enhanced Statistics Cards with Lucide Animated Icons -->
    <div class="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="(stat, index) in statisticsCards" :key="index" 
           class="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white/60 p-7 shadow-lg backdrop-filter backdrop-blur-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
           @click="showStatDetails(stat)">
        <div class="absolute top-0 left-0 right-0 h-1.5" :class="stat.gradient"></div>
        
        <!-- Animated Background Particles -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute w-20 h-20 rounded-full opacity-20 blur-2xl animate-float" :class="stat.particleBg" style="top: -10px; right: -10px;"></div>
          <div class="absolute w-16 h-16 rounded-full opacity-15 blur-xl animate-float-delayed" :class="stat.particleBg" style="bottom: -8px; left: -8px;"></div>
        </div>
        
        <div class="flex items-center relative z-10">
          <div class="flex-shrink-0">
            <div class="relative w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6" :class="stat.iconBg">
              <!-- Lucide Animated Icons -->
              <component :is="stat.icon" :size="32" :stroke-width="2.5" class="animate-icon-bounce" />
              
              <!-- Pulse Ring Effect -->
              <div class="absolute inset-0 rounded-2xl animate-ping opacity-20" :class="stat.iconBg"></div>
            </div>
          </div>
          <div class="ml-5 flex-1">
            <p class="text-xs font-medium text-gray-500 tracking-wide uppercase">{{ stat.label }}</p>
            <p class="text-base font-extrabold text-gray-900 tracking-tight mt-1 transition-all duration-300 group-hover:scale-105">
              {{ stat.prefix }}{{ formatNumber(stat.value) }}{{ stat.suffix }}
            </p>
            <div class="flex items-center text-sm mt-2">
              <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-full" :class="stat.trend === 'up' ? 'bg-green-50' : 'bg-red-50'">
                <TrendingUp v-if="stat.trend === 'up'" :size="14" class="text-green-500 animate-bounce-slow" />
                <TrendingDown v-else :size="14" class="text-red-500 animate-bounce-slow" />
                <span :class="stat.trend === 'up' ? 'text-green-600' : 'text-red-600'" class="font-semibold text-xs">{{ stat.change }}</span>
            </div>
          </div>
        </div>
        </div>
        
        <!-- Enhanced Hover Gradient Overlay -->
        <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" :class="stat.hoverGradient"></div>
      </div>
    </div>

    <!-- Enhanced Charts Section -->
    <div class="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Charts -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Enhanced Bar Chart -->
        <div class="rounded-2xl border border-gray-200/50 bg-white/60 p-8 shadow-lg backdrop-filter backdrop-blur-xl">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-8">
            <div>
                          <h3 class="text-base font-extrabold text-gray-900 tracking-tight">Monthly Income Overview</h3>
            <p class="text-gray-600 mt-2 font-normal text-xs">Fee collection trends over time</p>
            </div>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <label class="text-xs font-medium text-gray-600">Chart Date Range:</label>
                <input 
                  v-model="chartDateFilter.startDate" 
                  type="date" 
                  class="h-8 px-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
                  @change="updateChartData"
                />
                <span class="text-xs text-gray-500">to</span>
                <input 
                  v-model="chartDateFilter.endDate" 
                  type="date" 
                  class="h-8 px-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
                  @change="updateChartData"
                />
              </div>
              <select v-model="selectedPeriod" @change="updateChartData" class="h-8 rounded-lg border border-indigo-100 bg-white px-3 pr-8 text-xs font-medium text-gray-900 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all duration-200 appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%233b3b4f\' d=\'M6 8.825L1.175 4 2.05 3.125 6 7.075 9.95 3.125 10.825 4z\'/%3E%3C/svg%3E')] bg-no-repeat bg-[length:12px] bg-[position:calc(100%-0.75rem)_center]">
                <option value="6">Last 6 Months</option>
                <option value="12">Last Year</option>
                <option value="24">Last 2 Years</option>
              </select>
              <button @click="toggleChartView" class="h-8 w-8 rounded-lg border border-indigo-100 bg-white flex items-center justify-center text-gray-500 hover:bg-indigo-50 transition-all duration-200 hover:scale-105">
                <i :class="chartView === 'bar' ? 'fas fa-chart-line' : 'fas fa-chart-bar'"></i>
              </button>
            </div>
          </div>
          <div class="h-80 relative">
            <div v-if="chartLoading" class="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-lg">
              <div class="flex items-center gap-3">
                <i class="fas fa-spinner fa-spin text-indigo-600"></i>
                <span class="text-indigo-600 font-medium">Loading chart...</span>
              </div>
            </div>
            <canvas ref="incomeChart"></canvas>
          </div>
        </div>

        <!-- Enhanced Doughnut Chart -->
        <div class="rounded-2xl border border-gray-200/50 bg-white/60 p-8 shadow-lg backdrop-filter backdrop-blur-xl">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-8">
            <div>
                          <h3 class="text-base font-extrabold text-gray-900 tracking-tight">Fee Collection Distribution</h3>
            <p class="text-gray-600 mt-2 font-normal text-xs">Breakdown by fee categories</p>
            </div>
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div class="flex items-center gap-2">
                <label class="text-xs font-medium text-gray-600">Pie Chart Date Range:</label>
                <input 
                  v-model="pieChartDateFilter.startDate" 
                  type="date" 
                  class="h-8 px-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
                  @change="updatePieChartData"
                />
                <span class="text-xs text-gray-500">to</span>
                <input 
                  v-model="pieChartDateFilter.endDate" 
                  type="date" 
                  class="h-8 px-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
                  @change="updatePieChartData"
                />
              </div>
              <div class="flex items-center bg-indigo-50 rounded-xl p-1.5">
                <button v-for="period in ['Daily', 'Weekly', 'Monthly']" :key="period"
                        :class="['px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200', feeDistributionPeriod === period ? 'bg-white text-indigo-700 shadow-sm' : 'text-indigo-600 hover:text-indigo-700']" 
                        @click="feeDistributionPeriod = period; updatePieChart()">
                  {{ period }}
                </button>
              </div>
            </div>
          </div>
          <div class="h-80 relative">
            <div v-if="pieChartLoading" class="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-lg">
              <div class="flex items-center gap-3">
                <i class="fas fa-spinner fa-spin text-indigo-600"></i>
                <span class="text-indigo-600 font-medium">Loading chart...</span>
              </div>
            </div>
            <canvas ref="pieChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Enhanced Sidebar -->
      <div class="space-y-8">
        <!-- Enhanced Recent Activities -->
        <div class="rounded-2xl border border-gray-200/50 bg-white/60 p-7 shadow-lg backdrop-filter backdrop-blur-xl">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 class="text-base font-extrabold text-gray-900 tracking-tight">Recent Activities</h3>
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider #ffffffspace-nowrap">Activities Date Range:</label>
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                  <div class="relative">
                    <input 
                      v-model="activitiesDateFilter.startDate" 
                      type="date" 
                      class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none"
                      @change="updateActivitiesData"
                    />
                    <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                  </div>
                  <span class="text-xs text-gray-500 hidden sm:inline">to</span>
                  <div class="relative">
                    <input 
                      v-model="activitiesDateFilter.endDate" 
                      type="date" 
                      class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none"
                      @change="updateActivitiesData"
                    />
                    <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                  </div>
                </div>
              </div>
              <button @click="viewAllActivities" class="h-9 px-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 #ffffffspace-nowrap">
                View All
              </button>
            </div>
          </div>
          <div class="space-y-4 max-h-96 overflow-y-auto">
            <div v-for="(activity, index) in filteredActivities" :key="index" 
                 class="group relative flex items-start gap-4 p-4 rounded-xl hover:bg-white/60 transition-all duration-300 cursor-pointer overflow-hidden"
                 @click="showActivityDetails(activity)">
              <!-- Animated Background Glow -->
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                   :style="{ background: `radial-gradient(circle at 0% 50%, ${activity.color}15 0%, transparent 70%)` }"></div>
              
              <div :style="{ background: `linear-gradient(135deg, ${activity.color}, ${activity.colorDark || activity.color})` }" 
                   class="relative w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <!-- Lucide Icon Component -->
                <component :is="activity.iconComponent" :size="20" :stroke-width="2.5" class="animate-icon-bounce" />
                <!-- Pulse Ring -->
                <div class="absolute inset-0 rounded-xl animate-ping opacity-20" :style="{ backgroundColor: activity.color }"></div>
              </div>
              
              <div class="flex-1 min-w-0 relative z-10">
                <p class="text-sm text-gray-900 font-semibold leading-relaxed">{{ activity.content }}</p>
                <p class="text-xs text-gray-500 mt-1.5 font-medium flex items-center gap-1.5">
                  <Clock :size="12" class="inline" />
                  {{ activity.time }}
                </p>
                <div class="flex items-center gap-2 mt-2">
                  <span :class="getStatusClass(activity.type)" class="px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm">
                    {{ activity.type }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Quick Stats -->
        <div class="rounded-2xl border border-gray-200/50 bg-white/60 p-7 shadow-lg backdrop-filter backdrop-blur-xl">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 class="text-base font-extrabold text-gray-900 tracking-tight">Quick Stats</h3>
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
              <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider #ffffffspace-nowrap">Stats Date Range:</label>
              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                <div class="relative">
                  <input 
                    v-model="quickStatsDateFilter.startDate" 
                    type="date" 
                    class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none"
                    @change="updateQuickStatsData"
                  />
                  <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                </div>
                <span class="text-xs text-gray-500 hidden sm:inline">to</span>
                <div class="relative">
                  <input 
                    v-model="quickStatsDateFilter.endDate" 
                    type="date" 
                    class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none"
                    @change="updateQuickStatsData"
                  />
                  <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="(stat, index) in filteredQuickStats" :key="index"
                 class="relative bg-gradient-to-br p-5 rounded-xl border hover:shadow-md transition-all duration-300 cursor-pointer group overflow-hidden"
                 :class="stat.bgClass"
                 @click="showQuickStatDetails(stat)">
              <!-- Icon in top right corner -->
              <div class="absolute top-3 right-3 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                <component :is="stat.iconComponent" :size="32" :stroke-width="1.5" />
              </div>
              
              <p class="text-xs font-bold mb-2 tracking-wide uppercase relative z-10" :class="stat.textClass">{{ stat.label }}</p>
              <p class="text-base font-black tracking-tight relative z-10" :class="stat.valueClass">{{ stat.value }}</p>
              <p class="text-xs font-semibold mt-1 relative z-10" :class="stat.changeClass">{{ stat.change }}</p>
              <div class="mt-2 w-full bg-white/20 rounded-full h-1 relative z-10">
                <div class="h-1 rounded-full transition-all duration-300" :class="stat.progressClass" :style="{ width: stat.percentage + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- New: Upcoming Events -->
        <div class="rounded-2xl border border-gray-200/50 bg-white/60 p-7 shadow-lg backdrop-filter backdrop-blur-xl">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 class="text-base font-extrabold text-gray-900 tracking-tight">Upcoming Events</h3>
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
              <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider #ffffffspace-nowrap">Events Date Range:</label>
              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                <div class="relative">
                  <input 
                    v-model="eventsDateFilter.startDate" 
                    type="date" 
                    class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none"
                    @change="updateEventsData"
                  />
                  <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                </div>
                <span class="text-xs text-gray-500 hidden sm:inline">to</span>
                <div class="relative">
                  <input 
                    v-model="eventsDateFilter.endDate" 
                    type="date" 
                    class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none"
                    @change="updateEventsData"
                  />
                  <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="space-y-4">
            <div v-for="(event, index) in filteredEvents" :key="index" 
                 class="group relative p-4 rounded-xl border border-gray-200 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
              <!-- Animated Background Glow -->
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-indigo-50/50 to-purple-50/50"></div>
              
              <div class="flex items-start gap-3 relative z-10">
                <div class="relative w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" :class="event.colorClass">
                  <!-- Lucide Icon Component -->
                  <component :is="event.iconComponent" :size="20" :stroke-width="2.5" class="animate-icon-bounce" />
                  <!-- Pulse Ring -->
                  <div class="absolute inset-0 rounded-xl animate-ping opacity-20" :class="event.colorClass"></div>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">{{ event.title }}</h4>
                  <p class="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                    <Calendar :size="12" class="inline" />
                    {{ event.date }}
                  </p>
                  <p class="text-xs text-gray-600 mt-1.5">{{ event.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Notification Toast -->
    <div v-if="showNotification" 
         class="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl transform transition-all duration-300 border border-green-200"
         :class="showNotification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'">
      <div class="flex items-center gap-3">
        <i class="fas fa-check-circle text-lg"></i>
        <span class="font-medium">{{ notificationMessage }}</span>
        <button @click="showNotification = false" class="ml-4 text-white/80 hover:text-white transition-colors">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>

    <!-- Quick Actions Floating Button -->
    <div class="fixed bottom-6 right-6 z-40">
      <div class="relative group">
        <button @click="toggleQuickActions" class="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
          <i :class="showQuickActions ? 'fas fa-times' : 'fas fa-plus'" class="text-xl transition-transform duration-300"></i>
        </button>
        
        <!-- Quick Actions Menu -->
        <div v-if="showQuickActions" class="absolute bottom-16 right-0 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 min-w-[200px]">
          <div class="space-y-1">
            <button @click="quickAction('addStudent')" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white transition-colors text-left">
              <i class="fas fa-user-plus text-blue-600"></i>
              <span class="text-gray-900 font-medium">Add Student</span>
            </button>
            <button @click="quickAction('addTeacher')" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white transition-colors text-left">
              <i class="fas fa-chalkboard-teacher text-green-600"></i>
              <span class="text-gray-900 font-medium">Add Teacher</span>
            </button>
            <button @click="quickAction('generateReport')" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white transition-colors text-left">
              <i class="fas fa-file-alt text-purple-600"></i>
              <span class="text-gray-900 font-medium">Generate Report</span>
            </button>
            <button @click="quickAction('scheduleEvent')" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white transition-colors text-left">
              <i class="fas fa-calendar-plus text-orange-600"></i>
              <span class="text-gray-900 font-medium">Schedule Event</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue'
import dayjs from 'dayjs'
import axios from 'axios'
import { useStatistics } from '@/composables/useStatistics'
import { 
  Wallet, 
  CheckCircle2, 
  Users, 
  UserX,
  TrendingUp,
  TrendingDown,
  Clock,
  Calendar,
  RefreshCw,
  Download,
  CalendarDays,
  UserPlus,
  DollarSign,
  GraduationCap,
  Award,
  AlertCircle,
  UserCheck,
  CreditCard,
  BookOpen,
  School,
  Trophy,
  Music,
  PartyPopper
} from 'lucide-vue-next'

Chart.register(...registerables)

export default {
  name: 'Dashboard',
  components: {
    Wallet,
    CheckCircle2,
    Users,
    UserX,
    TrendingUp,
    TrendingDown,
    Clock,
    Calendar,
    RefreshCw,
    Download,
    CalendarDays,
    UserPlus,
    DollarSign,
    GraduationCap,
    Award,
    AlertCircle,
    UserCheck,
    CreditCard,
    BookOpen,
    School,
    Trophy,
    Music,
    PartyPopper
  },
  setup() {
    const selectedPeriod = ref('6')
    const feeDistributionPeriod = ref('Monthly')
    const chartView = ref('bar')
    const chartLoading = ref(false)
    const pieChartLoading = ref(false)
    const refreshing = ref(false)
    const showNotification = ref(false)
    const notificationMessage = ref('')
    const currentTime = ref('')
    const userName = ref('Admin')
    const showQuickActions = ref(false)
    
    // Date filters
    const mainDateFilter = ref({
      startDate: '',
      endDate: ''
    })
    
    const chartDateFilter = ref({
      startDate: '',
      endDate: ''
    })
    
    const pieChartDateFilter = ref({
      startDate: '',
      endDate: ''
    })
    
    const activitiesDateFilter = ref({
      startDate: '',
      endDate: ''
    })
    
    const quickStatsDateFilter = ref({
      startDate: '',
      endDate: ''
    })
    
    const eventsDateFilter = ref({
      startDate: '',
      endDate: ''
    })
    
    // Use statistics composable
    const { statistics, loading: statsLoading, error: statsError } = useStatistics()
    
    const currentDate = dayjs().format('MMMM D, YYYY')
    const currentHour = dayjs().hour()
    
    const timeOfDay = computed(() => {
      if (currentHour < 12) return 'morning'
      if (currentHour < 17) return 'afternoon'
      return 'evening'
    })
    
    const greetingMessage = computed(() => {
      const messages = [
        "Here's what's happening with your school today",
        "Stay updated with real-time insights",
        "Monitor your school's performance at a glance",
        "Track important metrics and trends"
      ]
      return messages[Math.floor(Math.random() * messages.length)]
    })
    
    // Update time every second
    const updateTime = () => {
      currentTime.value = dayjs().format('HH:mm:ss')
    }
    
    // Real-time data updates
    const startRealTimeUpdates = () => {
      setInterval(() => {
        // Simulate real-time data updates
        if (Math.random() > 0.7) {
          // Randomly update some statistics
          const randomStat = Math.floor(Math.random() * 4)
          if (randomStat === 0) {
            statisticsCards.value[0].value += Math.floor(Math.random() * 1000)
          } else if (randomStat === 1) {
            statisticsCards.value[1].value += Math.floor(Math.random() * 500)
          }
        }
      }, 30000) // Update every 30 seconds
    }
    
    // Enhanced activities with Lucide icon components
    const recentActivities = ref([
      {
        content: 'New student registration completed for Riya Sharma',
        time: '10 minutes ago',
        type: 'success',
        color: '#10B981',
        colorDark: '#059669',
        iconComponent: UserPlus,
        details: 'Student ID: STU001, Class: 10th A, Registration Fee: ₹5000'
      },
      {
        content: 'Fee payment received from John Doe (₹12,500)',
        time: '30 minutes ago',
        type: 'primary',
        color: '#3B82F6',
        colorDark: '#2563EB',
        iconComponent: DollarSign,
        details: 'Payment Method: Online, Transaction ID: TXN123456'
      },
      {
        content: 'New teacher joined the faculty - Mathematics',
        time: '2 hours ago',
        type: 'warning',
        color: '#F59E0B',
        colorDark: '#D97706',
        iconComponent: GraduationCap,
        details: 'Teacher ID: TCH001, Experience: 5 years, Qualification: M.Sc'
      },
      {
        content: 'Maintenance scheduled for Block A tomorrow',
        time: '3 hours ago',
        type: 'info',
        color: '#6366F1',
        colorDark: '#4F46E5',
        iconComponent: AlertCircle,
        details: 'Maintenance Type: Electrical, Duration: 4 hours, Affected Area: Block A'
      }
    ])

    // Enhanced statistics cards with Lucide animated icons
    const statisticsCards = ref([
      {
        label: 'Total Fee',
        value: 1850000,
        prefix: '₹',
        suffix: '',
        trend: 'up',
        change: '12% from last month',
        icon: Wallet,
        iconBg: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600',
        gradient: 'bg-gradient-to-r from-blue-500 to-indigo-600',
        particleBg: 'bg-blue-400',
        hoverGradient: 'bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10',
        details: 'Total fee collection target for this month'
      },
      {
        label: 'Received Fee',
        value: 1520000,
        prefix: '₹',
        suffix: '',
        trend: 'up',
        change: '8% from last month',
        icon: CheckCircle2,
        iconBg: 'bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600',
        gradient: 'bg-gradient-to-r from-green-500 to-emerald-600',
        particleBg: 'bg-green-400',
        hoverGradient: 'bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10',
        details: 'Successfully collected fees this month'
      },
      {
        label: 'Present Students',
        value: 487,
        prefix: '',
        suffix: '',
        trend: 'up',
        change: '5% from last month',
        icon: Users,
        iconBg: 'bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600',
        gradient: 'bg-gradient-to-r from-amber-500 to-orange-600',
        particleBg: 'bg-amber-400',
        hoverGradient: 'bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10',
        details: 'Students present in school today'
      },
      {
        label: 'Absent Students',
        value: 42,
        prefix: '',
        suffix: '',
        trend: 'down',
        change: '3% from last month',
        icon: UserX,
        iconBg: 'bg-gradient-to-br from-pink-500 via-rose-500 to-red-600',
        gradient: 'bg-gradient-to-r from-pink-500 to-rose-600',
        particleBg: 'bg-pink-400',
        hoverGradient: 'bg-gradient-to-br from-pink-500/10 via-transparent to-rose-500/10',
        details: 'Students absent today'
      }
    ])

    // Filtered data refs for date filtering
    const filteredActivities = ref([])
    const filteredQuickStats = ref([])
    const filteredEvents = ref([])

    // Quick stats with progress bars and Lucide icons
    const quickStats = ref([
      {
        label: 'New Students',
        value: 24,
        originalValue: 24,
        change: '+12%',
        percentage: 85,
        originalPercentage: 85,
        bgClass: 'from-blue-50 to-indigo-50 border-blue-100',
        textClass: 'text-blue-600',
        valueClass: 'text-blue-800',
        changeClass: 'text-green-600',
        progressClass: 'bg-blue-500',
        iconComponent: UserCheck
      },
      {
        label: 'Pending Fees',
        value: 18,
        originalValue: 18,
        change: '-5%',
        percentage: 30,
        originalPercentage: 30,
        bgClass: 'from-rose-50 to-pink-50 border-rose-100',
        textClass: 'text-rose-600',
        valueClass: 'text-rose-800',
        changeClass: 'text-red-600',
        progressClass: 'bg-rose-500',
        iconComponent: CreditCard
      },
      {
        label: 'Subjects',
        value: 12,
        originalValue: 12,
        change: '±0%',
        percentage: 100,
        originalPercentage: 100,
        bgClass: 'from-purple-50 to-violet-50 border-purple-100',
        textClass: 'text-purple-600',
        valueClass: 'text-purple-800',
        changeClass: 'text-purple-600',
        progressClass: 'bg-purple-500',
        iconComponent: BookOpen
      },
      {
        label: 'Classes',
        value: 8,
        originalValue: 8,
        change: '±0%',
        percentage: 100,
        originalPercentage: 100,
        bgClass: 'from-gray-50 to-slate-50 border-gray-200',
        textClass: 'text-gray-600',
        valueClass: 'text-gray-900',
        changeClass: 'text-gray-600',
        progressClass: 'bg-gray-500',
        iconComponent: School
      }
    ])

    // Upcoming events with Lucide icons
    const upcomingEvents = ref([
      {
        title: 'Annual Sports Day',
        date: 'Dec 15, 2024',
        description: 'Annual sports competition for all classes',
        iconComponent: Trophy,
        colorClass: 'bg-gradient-to-br from-yellow-500 to-orange-500'
      },
      {
        title: 'Parent-Teacher Meeting',
        date: 'Dec 20, 2024',
        description: 'Quarterly parent-teacher meeting',
        iconComponent: Users,
        colorClass: 'bg-gradient-to-br from-blue-500 to-indigo-500'
      },
      {
        title: 'Annual Function',
        date: 'Dec 25, 2024',
        description: 'Annual cultural function and prize distribution',
        iconComponent: Music,
        colorClass: 'bg-gradient-to-br from-purple-500 to-pink-500'
      }
    ])

    return {
      selectedPeriod,
      feeDistributionPeriod,
      chartView,
      chartLoading,
      pieChartLoading,
      refreshing,
      showNotification,
      notificationMessage,
      currentDate,
      currentTime,
      timeOfDay,
      greetingMessage,
      recentActivities,
      filteredActivities,
      statisticsCards,
      quickStats,
      filteredQuickStats,
      upcomingEvents,
      filteredEvents,
      userName,
      statistics,
      statsLoading,
      statsError,
      updateTime,
      showQuickActions,
      mainDateFilter,
      chartDateFilter,
      pieChartDateFilter,
      activitiesDateFilter,
      quickStatsDateFilter,
      eventsDateFilter
    }
  },
  data() {
    return {
      totalFee: 0,
      receivedFee: 0,
      presentStudents: 0,
      absentStudents: 0,
      incomeData: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Current Month',
            data: [320000, 380000, 410000, 390000],
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: '#3B82F6',
            borderWidth: 2,
            borderRadius: 4,
            borderSkipped: false,
            tension: 0.4
          },
          {
            label: 'Previous Month',
            data: [280000, 350000, 380000, 360000],
            backgroundColor: 'rgba(156, 163, 175, 0.8)',
            borderColor: '#9CA3AF',
            borderWidth: 2,
            borderRadius: 4,
            borderSkipped: false,
            tension: 0.4
          }
        ]
      },
      pieData: {
        labels: ['Tuition Fee', 'Examination Fee', 'Library Fee', 'Transport Fee', 'Other Fees'],
        datasets: [{
          data: [55, 20, 10, 10, 5],
          backgroundColor: [
            '#3B82F6',
            '#10B981',
            '#F59E0B',
            '#6366F1',
            '#EC4899'
          ],
          borderWidth: 0
        }]
      },
      incomeChart: null,
      pieChart: null,
      chartRendered: false,
      loading: false
    }
  },
  async mounted() {
    // Start time update
    this.updateTime()
    setInterval(this.updateTime, 1000)
    
    // Start real-time data updates
    this.startRealTimeUpdates()
    
    // Initialize with sample data first
    this.setSampleData()
    
    // Initialize filtered data
    this.filteredActivities = [...this.recentActivities]
    this.filteredQuickStats = [...this.quickStats]
    this.filteredEvents = [...this.upcomingEvents]
    
    await this.$nextTick()
    this.initCharts()
    window.addEventListener('resize', this.handleResize)
    
    // Then try to fetch real data
    try {
      await this.fetchDashboardData()
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  },
  beforeUnmount() {
    this.destroyCharts()
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    formatNumber(number) {
      return new Intl.NumberFormat('en-IN').format(number)
    },
    
    showNotification(message, duration = 3000) {
      this.notificationMessage = message
      this.showNotification = true
      setTimeout(() => {
        this.showNotification = false
      }, duration)
    },
    
    async refreshData() {
      this.refreshing = true
      try {
        await this.fetchDashboardData()
        this.showNotification('Data refreshed successfully!')
      } catch (error) {
        this.showNotification('Failed to refresh data. Please try again.', 5000)
      } finally {
        this.refreshing = false
      }
    },
    
    exportReport() {
      this.showNotification('Exporting report...')
      // Implement export functionality
    },
    
    showStatDetails(stat) {
      this.showNotification(`Viewing details for ${stat.label}`)
      // Implement modal or navigation to detailed view
    },
    
    showActivityDetails(activity) {
      this.showNotification(`Viewing activity: ${activity.content}`)
      // Implement modal with activity details
    },
    
    showQuickStatDetails(stat) {
      this.showNotification(`Viewing details for ${stat.label}`)
      // Implement detailed view
    },
    
    viewAllActivities() {
      this.showNotification('Opening all activities...')
      // Navigate to activities page
    },
    
    viewAllStats() {
      this.showNotification('Opening all stats...')
      // Navigate to stats page
    },
    
    toggleChartView() {
      this.chartView = this.chartView === 'bar' ? 'line' : 'bar'
      this.updateChartData()
    },
    
    updateChartData() {
      this.chartLoading = true
      setTimeout(() => {
        this.chartLoading = false
        if (this.incomeChart) {
          this.incomeChart.update()
        }
      }, 1000)
    },
    
    updatePieChart() {
      this.pieChartLoading = true
      setTimeout(() => {
        this.pieChartLoading = false
        if (this.pieChart) {
          this.pieChart.update()
        }
      }, 1000)
    },
    
    getStatusClass(type) {
      const classes = {
        success: 'bg-green-100 text-green-800',
        primary: 'bg-blue-100 text-blue-800',
        warning: 'bg-yellow-100 text-yellow-800',
        info: 'bg-indigo-100 text-indigo-800'
      }
      return classes[type] || classes.info
    },
    
    toggleQuickActions() {
      this.showQuickActions = !this.showQuickActions
    },
    
    quickAction(action) {
      this.showQuickActions = false
      
      switch(action) {
        case 'addStudent':
          this.showNotification('Opening student registration form...')
          // Navigate to student registration
          this.$router.push('/students/registration')
          break
        case 'addTeacher':
          this.showNotification('Opening teacher registration form...')
          // Navigate to teacher registration
          this.$router.push('/faculty/add-teacher')
          break
        case 'generateReport':
          this.showNotification('Generating comprehensive report...')
          // Implement report generation
          break
        case 'scheduleEvent':
          this.showNotification('Opening event scheduler...')
          // Navigate to event management
          this.$router.push('/events/create')
          break
        default:
          this.showNotification('Action not implemented yet')
      }
    },
    
    startRealTimeUpdates() {
      setInterval(() => {
        // Simulate real-time data updates
        if (Math.random() > 0.7) {
          // Randomly update some statistics
          const randomStat = Math.floor(Math.random() * 4)
          if (randomStat === 0) {
            this.statisticsCards[0].value += Math.floor(Math.random() * 1000)
          } else if (randomStat === 1) {
            this.statisticsCards[1].value += Math.floor(Math.random() * 500)
          }
        }
      }, 30000) // Update every 30 seconds
    },
    
    // Date filter methods
    applyMainDateFilter() {
      // Apply main date filter to all sections
      this.chartDateFilter.startDate = this.mainDateFilter.startDate
      this.chartDateFilter.endDate = this.mainDateFilter.endDate
      this.pieChartDateFilter.startDate = this.mainDateFilter.startDate
      this.pieChartDateFilter.endDate = this.mainDateFilter.endDate
      this.activitiesDateFilter.startDate = this.mainDateFilter.startDate
      this.activitiesDateFilter.endDate = this.mainDateFilter.endDate
      this.quickStatsDateFilter.startDate = this.mainDateFilter.startDate
      this.quickStatsDateFilter.endDate = this.mainDateFilter.endDate
      this.eventsDateFilter.startDate = this.mainDateFilter.startDate
      this.eventsDateFilter.endDate = this.mainDateFilter.endDate
      
      // Update all data
      this.updateChartData()
      this.updatePieChartData()
      this.updateActivitiesData()
      this.updateQuickStatsData()
      this.updateEventsData()
      
      this.showNotification('Main date filter applied to all sections')
    },
    
    clearMainDateFilter() {
      this.mainDateFilter.startDate = ''
      this.mainDateFilter.endDate = ''
      this.chartDateFilter.startDate = ''
      this.chartDateFilter.endDate = ''
      this.pieChartDateFilter.startDate = ''
      this.pieChartDateFilter.endDate = ''
      this.activitiesDateFilter.startDate = ''
      this.activitiesDateFilter.endDate = ''
      this.quickStatsDateFilter.startDate = ''
      this.quickStatsDateFilter.endDate = ''
      this.eventsDateFilter.startDate = ''
      this.eventsDateFilter.endDate = ''
      
      // Update all data
      this.updateChartData()
      this.updatePieChartData()
      this.updateActivitiesData()
      this.updateQuickStatsData()
      this.updateEventsData()
      
      this.showNotification('All date filters cleared')
    },
    
    updateChartData() {
      // Update chart data based on date filter
      this.chartLoading = true
      setTimeout(() => {
        this.chartLoading = false
        if (this.chart) {
          this.chart.update()
        }
      }, 1000)
    },
    
    updatePieChartData() {
      // Update pie chart data based on date filter
      this.pieChartLoading = true
      setTimeout(() => {
        this.pieChartLoading = false
        if (this.pieChart) {
          this.pieChart.update()
        }
      }, 1000)
    },
    
    updateActivitiesData() {
      // Filter activities based on date range
      if (this.activitiesDateFilter.startDate && this.activitiesDateFilter.endDate) {
        const startDate = new Date(this.activitiesDateFilter.startDate)
        const endDate = new Date(this.activitiesDateFilter.endDate)
        
        // Filter activities based on their time (simulating date-based filtering)
        this.filteredActivities = this.recentActivities.filter((activity, index) => {
          // Simulate date-based filtering by using index as days ago
          const activityDate = new Date()
          activityDate.setDate(activityDate.getDate() - (index + 1))
          return activityDate >= startDate && activityDate <= endDate
        })
        
        this.showNotification('Activities filtered for selected date range')
      } else {
        this.filteredActivities = this.recentActivities
      }
    },
    
    updateQuickStatsData() {
      // Filter quick stats based on date range
      if (this.quickStatsDateFilter.startDate && this.quickStatsDateFilter.endDate) {
        const startDate = new Date(this.quickStatsDateFilter.startDate)
        const endDate = new Date(this.quickStatsDateFilter.endDate)
        
        // Simulate filtering by adjusting values based on date range
        this.filteredQuickStats = this.quickStats.map(stat => {
          const daysDiff = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24))
          const multiplier = Math.max(0.5, Math.min(1.5, daysDiff / 30)) // Adjust based on date range
          
          return {
            ...stat,
            value: Math.floor(stat.originalValue * multiplier),
            percentage: Math.min(100, Math.floor(stat.originalPercentage * multiplier))
          }
        })
        
        this.showNotification('Quick stats filtered for selected date range')
      } else {
        this.filteredQuickStats = this.quickStats
      }
    },
    
    updateEventsData() {
      // Filter events based on date range
      if (this.eventsDateFilter.startDate && this.eventsDateFilter.endDate) {
        const startDate = new Date(this.eventsDateFilter.startDate)
        const endDate = new Date(this.eventsDateFilter.endDate)
        
        // Filter events based on their date
        this.filteredEvents = this.upcomingEvents.filter(event => {
          const eventDate = new Date(event.date)
          return eventDate >= startDate && eventDate <= endDate
        })
        
        this.showNotification('Events filtered for selected date range')
      } else {
        this.filteredEvents = this.upcomingEvents
      }
    },
    
    setSampleData() {
      // Sample data for income chart
      this.incomeData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Current Month',
            data: [320000, 380000, 410000, 390000],
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: '#3B82F6',
            borderWidth: 2,
            borderRadius: 4,
            borderSkipped: false,
            tension: 0.4
          },
          {
            label: 'Previous Month',
            data: [280000, 350000, 380000, 360000],
            backgroundColor: 'rgba(156, 163, 175, 0.8)',
            borderColor: '#9CA3AF',
            borderWidth: 2,
            borderRadius: 4,
            borderSkipped: false,
            tension: 0.4
          }
        ]
      }
      
      // Sample data for pie chart
      this.pieData = {
        labels: ['Tuition Fee', 'Examination Fee', 'Library Fee', 'Transport Fee', 'Other Fees'],
        datasets: [{
          data: [55, 20, 10, 10, 5],
          backgroundColor: [
            '#3B82F6',
            '#10B981',
            '#F59E0B',
            '#6366F1',
            '#EC4899'
          ],
          borderWidth: 0
        }]
      }
      
      // Sample statistics
      this.totalFee = 1850000
      this.receivedFee = 1520000
      this.presentStudents = 487
      this.absentStudents = 42
    },
    
    async initCharts() {
      try {
        // Initialize Bar Chart for Monthly Income Overview
        const incomeCtx = this.$refs.incomeChart?.getContext('2d')
        if (incomeCtx && !this.incomeChart) {
          this.incomeChart = new Chart(incomeCtx, {
            type: this.chartView,
            data: this.incomeData,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                  align: 'end',
                  labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                      size: 12
                    }
                  }
                },
                tooltip: {
                  backgroundColor: '#1F2937',
                  padding: 12,
                  titleFont: { size: 14, weight: 'bold' },
                  bodyFont: { size: 13 },
                  titleColor: '#F9FAFB',
                  bodyColor: '#F9FAFB',
                  cornerRadius: 8,
                  displayColors: true,
                  callbacks: {
                    label: (context) => `${context.dataset.label}: ₹${this.formatNumber(context.raw)}`,
                    title: (context) => `${context[0].label}`
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: { color: 'rgba(229, 231, 235, 0.5)', drawTicks: false },
                  ticks: {
                    padding: 10,
                    color: '#6B7280',
                    callback: value => '₹' + this.formatNumber(value)
                  },
                  border: { display: false }
                },
                x: {
                  grid: { display: false },
                  ticks: { color: '#6B7280' },
                  border: { display: false }
                }
              },
              animation: { duration: 1500, easing: 'easeOutQuart' },
              layout: { padding: { top: 10, right: 10 } }
            }
          })
        }

        // Initialize Pie Chart for Fee Collection Distribution
        const pieCtx = this.$refs.pieChart?.getContext('2d')
        if (pieCtx && !this.pieChart) {
          this.pieChart = new Chart(pieCtx, {
            type: 'pie',
            data: this.pieData,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle',
                    color: '#374151',
                    font: { size: 12 }
                  }
                },
                tooltip: {
                  backgroundColor: '#1F2937',
                  padding: 12,
                  bodyFont: { size: 13 },
                  titleColor: '#F9FAFB',
                  bodyColor: '#F9FAFB',
                  cornerRadius: 8,
                  callbacks: {
                    label: (context) => {
                      const label = context.label || ''
                      const value = context.raw || 0
                      const total = context.dataset.data.reduce((a, b) => a + b, 0)
                      const percentage = Math.round((value / total) * 100)
                      return `${label}: ${percentage}% (₹${this.formatNumber((value/100)*this.receivedFee)})`
                    }
                  }
                }
              },
              animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1500,
                easing: 'easeOutQuart'
              }
            }
          })
        }
        
        this.chartRendered = true
      } catch (error) {
        console.error('Error initializing charts:', error)
      }
    },
    
    async fetchDashboardData() {
      try {
        this.loading = true
        
        // Fetch monthly income data
        const incomeResponse = await axios.get('/api/admin/dashboard/monthly-income', {
          params: {
            period: this.selectedPeriod
          }
        })
        
        // Fetch fee distribution data
        const distributionResponse = await axios.get('/api/admin/dashboard/fee-distribution', {
          params: {
            period: this.feeDistributionPeriod
          }
        })
        
        // Update income chart data
        this.incomeData.labels = incomeResponse.data.data.labels
        this.incomeData.datasets[0].data = incomeResponse.data.data.currentMonth
        this.incomeData.datasets[1].data = incomeResponse.data.data.previousMonth
        
        // Update pie chart data
        this.pieData.labels = distributionResponse.data.data.labels
        this.pieData.datasets[0].data = distributionResponse.data.data.values
        
        // Update statistics
        this.totalFee = incomeResponse.data.data.totalFee
        this.receivedFee = incomeResponse.data.data.receivedFee
        this.presentStudents = incomeResponse.data.data.presentStudents
        this.absentStudents = incomeResponse.data.data.absentStudents
        
        // Update charts with new data
        if (this.incomeChart) {
          this.incomeChart.data = this.incomeData
          this.incomeChart.update()
        }
        if (this.pieChart) {
          this.pieChart.data = this.pieData
          this.pieChart.update()
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        // Fallback to sample data if API fails
        this.setSampleData()
      } finally {
        this.loading = false
      }
    },
    
    destroyCharts() {
      if (this.incomeChart) {
        this.incomeChart.destroy()
        this.incomeChart = null
      }
      if (this.pieChart) {
        this.pieChart.destroy()
        this.pieChart = null
      }
      this.chartRendered = false
    },
    
    handleResize() {
      this.destroyCharts()
      this.initCharts()
    }
  },
  watch: {
    selectedPeriod() {
      this.fetchDashboardData()
    },
    feeDistributionPeriod() {
      this.fetchDashboardData()
    }
  }
}
</script>

<style scoped>
/* Import modern fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

/* Modern Icon Animations */
@keyframes icon-bounce {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-3px) scale(1.05);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  33% {
    transform: translateY(-10px) translateX(5px);
  }
  66% {
    transform: translateY(-5px) translateX(-5px);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  33% {
    transform: translateY(-8px) translateX(-4px);
  }
  66% {
    transform: translateY(-4px) translateX(6px);
  }
}

@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.95);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.3;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.5;
  }
}

.animate-icon-bounce {
  animation: icon-bounce 2s ease-in-out infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 7s ease-in-out infinite;
  animation-delay: 1s;
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

/* Chart container adjustments for better responsive behavior */
.h-80 canvas {
  width: 100% !important;
  height: 100% !important;
}

/* Custom scrollbar for activities */
.max-h-96::-webkit-scrollbar {
  width: 6px;
}

.max-h-96::-webkit-scrollbar-track {
  background: transparent;
}

.max-h-96::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #c084fc, #a855f7);
  border-radius: 8px;
  min-height: 40px;
}

.max-h-96::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #a855f7, #9333ea);
}

/* Enhanced hover effects */
.group:hover .w-14 {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}

/* Animation for containers */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.rounded-2xl {
  animation: fadeInUp 0.6s ease-out;
}

/* Staggered animation for stats cards */
.grid > div:nth-child(1) { animation-delay: 0.1s; }
.grid > div:nth-child(2) { animation-delay: 0.2s; }
.grid > div:nth-child(3) { animation-delay: 0.3s; }
.grid > div:nth-child(4) { animation-delay: 0.4s; }

/* Gradient text effect */
.text-purple-600 {
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Enhanced backdrop blur for glass morphism */
.backdrop-filter {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* Better button hover effects */
button:hover {
  transform: translateY(-1px);
  transition: all 0.2s ease;
}

/* Enhanced typography */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
}

.font-black {
  font-weight: 900;
  letter-spacing: -0.025em;
}

.font-extrabold {
  font-weight: 800;
  letter-spacing: -0.025em;
}

.tracking-tight {
  letter-spacing: -0.025em;
}

.tracking-wide {
  letter-spacing: 0.025em;
}

/* Chart responsiveness */
@media (max-width: 640px) {
  .h-80 {
    height: 240px;
  }
  
  .text-4xl {
    font-size: 2.5rem;
  }
  
  .text-3xl {
    font-size: 2rem;
  }
  
  .text-2xl {
    font-size: 1.75rem;
  }
}

@media (max-width: 1024px) {
  .lg\:col-span-2 {
    grid-column: span 1 !important;
  }
}

/* Enhanced accessibility and focus states */
button:focus-visible {
  outline: 2px solid #7c3aed;
  outline-offset: 2px;
}

select:focus-visible {
  outline: 2px solid #7c3aed;
  outline-offset: 2px;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Notification animation */
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Pulse animation for online indicator */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Enhanced glass morphism */
.glass-effect {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

/* Loading spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fa-spin {
  animation: spin 1s linear infinite;
}

/* Floating button animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.floating-button {
  animation: float 3s ease-in-out infinite;
}

/* Enhanced shadow for floating button */
.shadow-3xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Quick actions menu animation */
.quick-actions-enter-active,
.quick-actions-leave-active {
  transition: all 0.3s ease;
}

.quick-actions-enter-from,
.quick-actions-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}

/* Enhanced notification animation */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.notification-enter-active {
  animation: slideInRight 0.3s ease-out;
}

.notification-leave-active {
  animation: slideInRight 0.3s ease-out reverse;
}
</style>

<style>
.custom-select-dropdown {
  border-radius: 8px !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
  border: none !important;
}

.custom-select-dropdown .el-select-dropdown__item {
  padding: 8px 16px !important;
  font-size: 13px !important;
}

.custom-select-dropdown .el-select-dropdown__item.hover {
  background-color: #EFF6FF !important;
}

.custom-timeline .el-timeline-item__tail {
  border-left: 2px dashed #E5E7EB !important;
}

.custom-timeline .el-timeline-item__node {
  width: 12px !important;
  height: 12px !important;
  left: -5px !important;
}

.custom-timeline .el-timeline-item__timestamp {
  color: #9CA3AF !important;
  font-size: 12px !important;
  margin-top: 4px !important;
}
</style>