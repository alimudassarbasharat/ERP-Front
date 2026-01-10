<template>
  <div class="relative w-full min-h-screen px-2 sm:px-4 lg:px-6 py-3 sm:py-4">
    <!-- Subtle Background Effects -->
    <div class="absolute left-0 bottom-0 w-[500px] h-[400px] bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-3xl rounded-full z-0 pointer-events-none"></div>
    <div class="absolute right-0 top-0 w-[400px] h-[300px] bg-gradient-to-r from-blue-400/10 to-cyan-400/10 blur-3xl rounded-full z-0 pointer-events-none"></div>
    
    <!-- Compact Header Section -->
    <div class="group relative z-10 mb-4 rounded-t-2xl border border-gray-200/60 dark:border-gray-700/60 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl px-4 sm:px-6 py-4 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <!-- Animated gradient overlay on hover -->
      <div class="absolute inset-0 bg-gradient-to-br from-purple-50/0 via-pink-50/0 to-indigo-50/0 dark:from-purple-900/0 dark:via-pink-900/0 dark:to-indigo-900/0 group-hover:from-purple-50/20 group-hover:via-pink-50/15 group-hover:to-indigo-50/20 dark:group-hover:from-purple-900/20 dark:group-hover:via-pink-900/15 dark:group-hover:to-indigo-900/20 transition-all duration-500 pointer-events-none"></div>
      <div class="relative z-10">
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div class="header-content flex-1">
          <div class="flex items-center gap-2 mb-2">
            <div class="relative">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span class="text-[10px] sm:text-xs text-green-600 dark:text-green-400 font-medium">System Online</span>
          </div>
          <h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight mb-1">
            Good {{ timeOfDay }}, 
            <span class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{{ userName }}</span>
          </h1>
          <p class="text-gray-500 dark:text-gray-300 text-xs mb-3">{{ greetingMessage }}</p>
          <div class="flex flex-wrap items-center gap-2 sm:gap-3">
            <div class="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-md">
              <IconClock :size="12" class="text-indigo-600 dark:text-indigo-400" stroke-width="2" />
              <span class="font-medium">{{ currentTime }}</span>
            </div>
            <div class="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-md">
              <IconCalendar :size="12" class="text-indigo-600 dark:text-indigo-400" stroke-width="2" />
              <span class="font-medium">{{ currentDate }}</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2 w-full sm:w-auto">
          <button 
            @click="refreshData" 
            :disabled="refreshing" 
            class="flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconRefresh :size="14" :class="refreshing ? 'animate-spin' : ''" stroke-width="2" />
            <span>{{ refreshing ? 'Refreshing...' : 'Refresh' }}</span>
          </button>
          <button 
            @click="exportReport" 
            class="flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <IconDownload :size="14" stroke-width="2" />
            <span>Export</span>
          </button>
        </div>
      </div>
      </div>
    </div>

    <!-- Compact Date Filter -->
    <div class="group relative z-10 mb-4 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl px-4 sm:px-5 py-3 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <!-- Animated gradient overlay on hover -->
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-blue-50/0 to-purple-50/0 dark:from-indigo-900/0 dark:via-blue-900/0 dark:to-purple-900/0 group-hover:from-indigo-50/20 group-hover:via-blue-50/15 group-hover:to-purple-50/20 dark:group-hover:from-indigo-900/20 dark:group-hover:via-blue-900/15 dark:group-hover:to-purple-900/20 transition-all duration-500 pointer-events-none"></div>
      <div class="relative z-10">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div class="flex items-center gap-2 flex-shrink-0">
          <div class="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
            <IconCalendarEvent :size="16" class="text-indigo-600 dark:text-indigo-400" stroke-width="2" />
          </div>
          <div>
            <h3 class="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Date Range Filter</h3>
            <p class="text-[10px] text-gray-500 dark:text-gray-300 hidden sm:block">Filter all dashboard data</p>
          </div>
        </div>
        <div class="flex flex-nowrap items-center gap-2 ml-auto sm:ml-0">
          <div class="w-[180px] sm:w-[220px] flex-shrink-0">
            <CompactDatePicker
              v-model="mainDateFilter.startDate"
              placeholder=""
              @change="handleMainDateChange"
            />
          </div>
          <button 
            @click="clearMainDateFilter" 
            class="h-7 px-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-[10px] font-medium transition-all duration-200 hover:scale-105 active:scale-95 border border-gray-200 dark:border-gray-600 whitespace-nowrap flex-shrink-0"
          >
            Clear
          </button>
        </div>
      </div>
      </div>
    </div>

    <!-- Compact Statistics Cards -->
    <div class="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
      <StatCard
        v-for="(stat, index) in statisticsCards"
        :key="index"
        :stat="stat"
        @click="showStatDetails"
      />
    </div>

    <!-- Compact Charts Section -->
    <div class="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Charts -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Compact Bar Chart -->
        <div class="group relative overflow-hidden rounded-xl border border-gray-200/80 dark:border-gray-700/80 bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-800/70 backdrop-blur-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300">
          <!-- Animated gradient overlay on hover -->
          <div class="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-indigo-50/0 to-purple-50/0 dark:from-blue-900/0 dark:via-indigo-900/0 dark:to-purple-900/0 group-hover:from-blue-50/20 group-hover:via-indigo-50/15 group-hover:to-purple-50/20 dark:group-hover:from-blue-900/20 dark:group-hover:via-indigo-900/15 dark:group-hover:to-purple-900/20 transition-all duration-500 pointer-events-none"></div>
          <div class="relative z-10">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <div>
              <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-0.5">Monthly Income Overview</h3>
              <p class="text-[10px] text-gray-500 dark:text-gray-300">Fee collection trends</p>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <div class="flex items-center gap-1.5">
                <label class="text-[10px] font-medium text-gray-600 dark:text-gray-300">Date:</label>
                <CompactDatePicker
                  v-model="chartDateFilter.startDate"
                  placeholder=""
                  @change="handleChartDateChange"
                />
              </div>
              <!-- Chart Type Dropdown -->
              <div class="relative">
                <select 
                  v-model="selectedChartType" 
                  @change="handleChartTypeChange" 
                  class="h-7 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 pr-8 text-[10px] font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all duration-200 appearance-none cursor-pointer hover:border-indigo-300 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%236366f1\' d=\'M6 9L2 5h8z\'/%3E%3C/svg%3E')] bg-no-repeat bg-[length:12px] bg-[position:calc(100%-0.5rem)_center] shadow-sm hover:shadow"
                >
                  <option value="bar">Bar Chart</option>
                  <option value="line">Line Chart</option>
                  <option value="area">Area Chart</option>
                  <option value="doughnut">Doughnut Chart</option>
                  <option value="radar">Radar Chart</option>
                </select>
              </div>
              <button @click="toggleChartView" class="h-7 w-7 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-600 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 transition-all duration-200 shadow-sm hover:shadow">
                <component :is="chartToggleIcon" :size="14" :stroke-width="2" />
              </button>
            </div>
          </div>
          <div class="h-64 relative">
            <ChartJsWrapper
              ref="incomeChart"
              :type="chartView"
              :data="incomeData"
              :options="incomeChartOptions"
              :loading="chartLoading"
              height="256px"
            />
          </div>
          </div>
        </div>

        <!-- Compact Pie Chart -->
        <div class="group relative rounded-xl border border-gray-200/60 dark:border-gray-700/60 bg-white/90 dark:bg-gray-800/90 p-4 sm:p-5 shadow-sm backdrop-blur-xl hover:shadow-md transition-all duration-300 overflow-hidden">
          <!-- Animated gradient overlay on hover -->
          <div class="absolute inset-0 bg-gradient-to-br from-pink-50/0 via-purple-50/0 to-indigo-50/0 dark:from-pink-900/0 dark:via-purple-900/0 dark:to-indigo-900/0 group-hover:from-pink-50/30 group-hover:via-purple-50/20 group-hover:to-indigo-50/30 dark:group-hover:from-pink-900/20 dark:group-hover:via-purple-900/15 dark:group-hover:to-indigo-900/20 transition-all duration-500 pointer-events-none"></div>
          
          <div class="relative z-10">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <div>
                <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-0.5">Fee Distribution</h3>
                <p class="text-[10px] text-gray-500 dark:text-gray-300">By categories</p>
              </div>
              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div class="flex items-center gap-1.5">
                  <label class="text-[10px] font-medium text-gray-600 dark:text-gray-300">Date:</label>
                  <CompactDatePicker
                    v-model="pieChartDateFilter.startDate"
                    placeholder=""
                    @change="handlePieChartDateChange"
                  />
                </div>
                <!-- Chart Type Dropdown -->
                <div class="relative">
                  <select 
                    v-model="selectedPieChartType" 
                    @change="handlePieChartTypeChange" 
                    class="h-7 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 pr-8 text-[10px] font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all duration-200 appearance-none cursor-pointer hover:border-purple-300 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23a855f7\' d=\'M6 9L2 5h8z\'/%3E%3C/svg%3E')] bg-no-repeat bg-[length:12px] bg-[position:calc(100%-0.5rem)_center] shadow-sm hover:shadow"
                  >
                    <option value="pie">Pie Chart</option>
                    <option value="doughnut">Doughnut Chart</option>
                    <option value="bar">Bar Chart</option>
                    <option value="column">Column Chart</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="h-64 relative">
              <HighchartsWrapper
                ref="pieChart"
                :options="pieChartOptions"
                :loading="pieChartLoading"
                height="256px"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Compact Sidebar -->
      <div class="space-y-4 animate-fade-in-up" style="animation-delay: 500ms">
        <!-- Compact Recent Activities -->
        <div class="group relative rounded-xl border border-gray-200/60 dark:border-gray-700/60 bg-white/90 dark:bg-gray-800/90 p-4 sm:p-5 shadow-sm backdrop-blur-xl hover:shadow-md transition-all duration-300 overflow-hidden">
          <!-- Animated gradient overlay on hover -->
          <div class="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-indigo-50/0 to-purple-50/0 dark:from-blue-900/0 dark:via-indigo-900/0 dark:to-purple-900/0 group-hover:from-blue-50/20 group-hover:via-indigo-50/15 group-hover:to-purple-50/20 dark:group-hover:from-blue-900/20 dark:group-hover:via-indigo-900/15 dark:group-hover:to-purple-900/20 transition-all duration-500 pointer-events-none"></div>
          <div class="relative z-10">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <h3 class="text-sm font-bold text-gray-900 dark:text-white">Recent Activities</h3>
              <div class="flex items-center gap-2">
                <CompactDatePicker
                  v-model="mainDateFilter.startDate"
                  placeholder=""
                  @change="handleMainDateChange"
                />
                <button @click="viewAllActivities" class="h-7 px-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-[10px] font-semibold text-white shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95">
                  View All
                </button>
              </div>
            </div>
            <div class="space-y-2 max-h-80 overflow-y-auto">
              <div
                v-for="(activity, index) in filteredActivities"
                :key="index"
                class="animate-slide-in-right"
                :style="{ animationDelay: `${index * 50}ms` }"
              >
                <ActivityItem
                  :activity="activity"
                  size="sm"
                  variant="minimal"
                  :glow-color="activity.color"
                  @click="handleActivityClick"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Compact Quick Stats -->
        <div class="group relative rounded-xl border border-gray-200/60 dark:border-gray-700/60 bg-white/90 dark:bg-gray-800/90 p-4 sm:p-5 shadow-sm backdrop-blur-xl hover:shadow-md transition-all duration-300 overflow-hidden">
          <!-- Animated gradient overlay on hover -->
          <div class="absolute inset-0 bg-gradient-to-br from-green-50/0 via-emerald-50/0 to-teal-50/0 dark:from-green-900/0 dark:via-emerald-900/0 dark:to-teal-900/0 group-hover:from-green-50/20 group-hover:via-emerald-50/15 group-hover:to-teal-50/20 dark:group-hover:from-green-900/20 dark:group-hover:via-emerald-900/15 dark:group-hover:to-teal-900/20 transition-all duration-500 pointer-events-none"></div>
          <div class="relative z-10">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <h3 class="text-sm font-bold text-gray-900 dark:text-white">Quick Stats</h3>
              <div class="flex items-center gap-2">
                <CompactDatePicker
                  v-model="quickStatsDateFilter.startDate"
                  placeholder=""
                  @change="handleQuickStatsDateChange"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div
                v-for="(stat, index) in filteredQuickStats"
                :key="index"
                class="relative bg-gradient-to-br p-3 rounded-lg border hover:shadow-md transition-all duration-300 cursor-pointer group overflow-hidden animate-scale-in"
                :class="stat.bgClass"
                :style="{ animationDelay: `${index * 100}ms` }"
                @click="showQuickStatDetails(stat)"
              >
                <!-- Icon in top right corner -->
                <div class="absolute top-2 right-2 opacity-20 group-hover:opacity-30 transition-opacity duration-200">
                  <component :is="stat.iconComponent" :size="20" :stroke-width="1.5" />
                </div>
                
                <p class="text-[10px] font-bold mb-1 tracking-wide uppercase relative z-10" :class="stat.textClass">{{ stat.label }}</p>
                <p class="text-sm font-black tracking-tight relative z-10" :class="stat.valueClass">{{ stat.value }}</p>
                <p class="text-[10px] font-semibold mt-0.5 relative z-10" :class="stat.changeClass">{{ stat.change }}</p>
                <div class="mt-1.5 w-full bg-white/20 dark:bg-white/10 rounded-full h-0.5 relative z-10">
                  <div class="h-0.5 rounded-full transition-all duration-300" :class="stat.progressClass" :style="{ width: stat.percentage + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Compact Upcoming Events -->
        <div class="group relative rounded-xl border border-gray-200/60 dark:border-gray-700/60 bg-white/90 dark:bg-gray-800/90 p-4 sm:p-5 shadow-sm backdrop-blur-xl hover:shadow-md transition-all duration-300 overflow-hidden">
          <!-- Animated gradient overlay on hover -->
          <div class="absolute inset-0 bg-gradient-to-br from-orange-50/0 via-amber-50/0 to-yellow-50/0 dark:from-orange-900/0 dark:via-amber-900/0 dark:to-yellow-900/0 group-hover:from-orange-50/20 group-hover:via-amber-50/15 group-hover:to-yellow-50/20 dark:group-hover:from-orange-900/20 dark:group-hover:via-amber-900/15 dark:group-hover:to-yellow-900/20 transition-all duration-500 pointer-events-none"></div>
          <div class="relative z-10">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <h3 class="text-sm font-bold text-gray-900 dark:text-white">Upcoming Events</h3>
              <div class="flex items-center gap-2">
                <CompactDatePicker
                  v-model="mainDateFilter.startDate"
                  placeholder=""
                  @change="handleMainDateChange"
                />
              </div>
            </div>
            <div class="space-y-2">
              <div
                v-for="(event, index) in filteredEvents"
                :key="index"
                class="animate-slide-in-right"
                :style="{ animationDelay: `${index * 50}ms` }"
              >
                <EventItem
                  :event="event"
                  size="sm"
                  variant="default"
                  @click="handleEventClick"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Compact Quick Actions Floating Button -->
    <div class="fixed bottom-4 right-4 z-40">
      <div class="relative group">
        <button 
          @click="toggleQuickActions" 
          class="w-12 h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center backdrop-blur-sm border border-white/20"
        >
          <component 
            :is="showQuickActions ? IconX : IconSparkles" 
            :size="20" 
            :stroke-width="2"
            class="transition-transform duration-200"
            :class="showQuickActions ? 'rotate-90' : ''"
          />
        </button>
        
        <Transition name="slide-up">
          <div v-if="showQuickActions" class="absolute bottom-16 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-2 min-w-[180px] space-y-1.5">
            <button @click="quickAction('addStudent')" class="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 text-left group">
              <div class="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                <IconUserPlus :size="14" class="text-blue-600 dark:text-blue-400" stroke-width="2" />
              </div>
              <span class="text-gray-900 dark:text-white font-semibold text-xs">Add Student</span>
            </button>
            <button @click="quickAction('addTeacher')" class="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-50 dark:hover:bg-gray-700 transition-all duration-200 text-left group">
              <div class="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                <IconSchool :size="14" class="text-green-600 dark:text-green-400" stroke-width="2" />
              </div>
              <span class="text-gray-900 dark:text-white font-semibold text-xs">Add Teacher</span>
            </button>
            <button @click="quickAction('generateReport')" class="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700 transition-all duration-200 text-left group">
              <div class="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                <IconFileText :size="14" class="text-purple-600 dark:text-purple-400" stroke-width="2" />
              </div>
              <span class="text-gray-900 dark:text-white font-semibold text-xs">Generate Report</span>
            </button>
            <button @click="quickAction('scheduleEvent')" class="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-700 transition-all duration-200 text-left group">
              <div class="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center group-hover:bg-orange-200 dark:group-hover:bg-orange-800 transition-colors">
                <IconCalendarPlus :size="14" class="text-orange-600 dark:text-orange-400" stroke-width="2" />
              </div>
              <span class="text-gray-900 dark:text-white font-semibold text-xs">Schedule Event</span>
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Modern Transitions */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-up-leave-active {
  transition: all 0.2s ease-in;
}

.slide-up-enter-from {
  transform: translateY(20px) scale(0.9);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(20px) scale(0.9);
  opacity: 0;
}

/* Icon Bounce Animation */
@keyframes icon-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.animate-icon-bounce {
  animation: icon-bounce 2s ease-in-out infinite;
}

/* Float Animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 6s ease-in-out infinite;
  animation-delay: 2s;
}
</style>

<script>
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue'
import dayjs from 'dayjs'
import axios from 'axios'
import { useStatistics } from '@/composables/useStatistics'
import ActivityItem from '@/components/dashboard/ActivityItem.vue'
import EventItem from '@/components/dashboard/EventItem.vue'
import StatCard from '@/components/dashboard/StatCard.vue'
import ChartJsWrapper from '@/components/charts/ChartJsWrapper.vue'
import HighchartsWrapper from '@/components/charts/HighchartsWrapper.vue'
import CompactDatePicker from '@/components/CompactDatePicker.vue'
import {
  IconWallet,
  IconCircleCheck,
  IconUsers,
  IconUserX,
  IconTrendingUp,
  IconTrendingDown,
  IconClock,
  IconCalendar,
  IconRefresh,
  IconDownload,
  IconCalendarEvent,
  IconUserPlus,
  IconCurrencyDollar,
  IconSchool,
  IconAward,
  IconAlertCircle,
  IconUserCheck,
  IconCreditCard,
  IconBook,
  IconTrophy,
  IconMusic,
  IconSparkles,
  IconChartBar,
  IconChartLine,
  IconLoader2,
  IconX,
  IconFileText,
  IconCalendarPlus,
  IconStars
} from '@tabler/icons-vue'

export default {
  name: 'Dashboard',
  components: {
    StatCard,
    ChartJsWrapper,
    HighchartsWrapper,
    CompactDatePicker,
    ActivityItem,
    EventItem,
    IconWallet,
    IconCircleCheck,
    IconUsers,
    IconUserX,
    IconTrendingUp,
    IconTrendingDown,
    IconClock,
    IconCalendar,
    IconRefresh,
    IconDownload,
    IconCalendarEvent,
    IconUserPlus,
    IconCurrencyDollar,
    IconSchool,
    IconAward,
    IconAlertCircle,
    IconUserCheck,
    IconCreditCard,
    IconBook,
    IconTrophy,
    IconMusic,
    IconSparkles,
    IconChartBar,
    IconChartLine,
    IconLoader2,
    IconX,
    IconFileText,
    IconCalendarPlus,
    IconStars
  },
  setup() {
    const selectedPeriod = ref('12')
    const feeDistributionPeriod = ref('Monthly')
    const chartView = ref('bar')
    const selectedChartType = ref('bar')
    const selectedPieChartType = ref('pie')
    const chartLoading = ref(false)
    const pieChartLoading = ref(false)
    const refreshing = ref(false)
    const currentTime = ref('')
    const userName = ref('Admin')
    const showQuickActions = ref(false)
    
    // Date filters
    const mainDateFilter = ref({
      startDate: '',
      endDate: '' // For shortcuts (Today, Yesterday, Week, Month)
    })
    
    const chartDateFilter = ref({
      startDate: ''
    })
    
    const pieChartDateFilter = ref({
      startDate: ''
    })
    
    const activitiesDateFilter = ref({
      startDate: ''
    })
    
    const quickStatsDateFilter = ref({
      startDate: ''
    })
    
    const eventsDateFilter = ref({
      startDate: ''
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
    
    // Computed property for chart toggle icon
    const chartToggleIcon = computed(() => {
      return chartView.value === 'bar' ? IconChartLine : IconChartBar
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
    
    // Enhanced activities with Tabler SVG icon components
    const recentActivities = ref([
      {
        content: 'New student registration completed for Riya Sharma',
        time: '10 minutes ago',
        type: 'success',
        color: '#10B981',
        colorDark: '#059669',
        iconComponent: IconUserPlus,
        details: 'Student ID: STU001, Class: 10th A, Registration Fee: PKR 5,000'
      },
      {
        content: 'Fee payment received from John Doe (PKR 12,500)',
        time: '30 minutes ago',
        type: 'primary',
        color: '#3B82F6',
        colorDark: '#2563EB',
        iconComponent: IconCurrencyDollar,
        details: 'Payment Method: Online, Transaction ID: TXN123456'
      },
      {
        content: 'New teacher joined the faculty - Mathematics',
        time: '2 hours ago',
        type: 'warning',
        color: '#F59E0B',
        colorDark: '#D97706',
        iconComponent: IconSchool,
        details: 'Teacher ID: TCH001, Experience: 5 years, Qualification: M.Sc'
      },
      {
        content: 'Maintenance scheduled for Block A tomorrow',
        time: '3 hours ago',
        type: 'info',
        color: '#6366F1',
        colorDark: '#4F46E5',
        iconComponent: IconAlertCircle,
        details: 'Maintenance Type: Electrical, Duration: 4 hours, Affected Area: Block A'
      }
    ])

    // Enhanced statistics cards with Tabler SVG icons
    const statisticsCards = ref([
      {
        label: 'Total Fee',
        value: 1850000,
        prefix: 'PKR ',
        suffix: '',
        trend: 'up',
        change: '12% from last month',
        icon: IconWallet,
        iconBg: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600',
        gradient: 'bg-gradient-to-r from-blue-500 to-indigo-600',
        particleBg: 'bg-blue-400',
        hoverGradient: 'bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10',
        details: 'Total fee collection target for this month'
      },
      {
        label: 'Received Fee',
        value: 1520000,
        prefix: 'PKR ',
        suffix: '',
        trend: 'up',
        change: '8% from last month',
        icon: IconCircleCheck,
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
        icon: IconUsers,
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
        icon: IconUserX,
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
        bgClass: 'from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-100 dark:border-blue-800',
        textClass: 'text-blue-600 dark:text-blue-400',
        valueClass: 'text-blue-800 dark:text-blue-300',
        changeClass: 'text-green-600 dark:text-green-400',
        progressClass: 'bg-blue-500 dark:bg-blue-600',
        iconComponent: IconUserCheck
      },
      {
        label: 'Pending Fees',
        value: 18,
        originalValue: 18,
        change: '-5%',
        percentage: 30,
        originalPercentage: 30,
        bgClass: 'from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 border-rose-100 dark:border-rose-800',
        textClass: 'text-rose-600 dark:text-rose-400',
        valueClass: 'text-rose-800 dark:text-rose-300',
        changeClass: 'text-red-600 dark:text-red-400',
        progressClass: 'bg-rose-500 dark:bg-rose-600',
        iconComponent: IconCreditCard
      },
      {
        label: 'Subjects',
        value: 12,
        originalValue: 12,
        change: '±0%',
        percentage: 100,
        originalPercentage: 100,
        bgClass: 'from-purple-50 to-violet-50 dark:from-purple-900/30 dark:to-violet-900/30 border-purple-100 dark:border-purple-800',
        textClass: 'text-purple-600 dark:text-purple-400',
        valueClass: 'text-purple-800 dark:text-purple-300',
        changeClass: 'text-purple-600 dark:text-purple-400',
        progressClass: 'bg-purple-500 dark:bg-purple-600',
        iconComponent: IconBook
      },
      {
        label: 'Classes',
        value: 8,
        originalValue: 8,
        change: '±0%',
        percentage: 100,
        originalPercentage: 100,
        bgClass: 'from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 border-gray-200 dark:border-gray-700',
        textClass: 'text-gray-600 dark:text-gray-300',
        valueClass: 'text-gray-900 dark:text-white',
        changeClass: 'text-gray-600 dark:text-gray-300',
        progressClass: 'bg-gray-500 dark:bg-gray-600',
        iconComponent: IconSchool
      }
    ])

    // Upcoming events with Lucide icons
    const upcomingEvents = ref([
      {
        title: 'Annual Sports Day',
        date: 'Dec 15, 2024',
        description: 'Annual sports competition for all classes',
        iconComponent: IconTrophy,
        colorClass: 'bg-gradient-to-br from-yellow-500 to-orange-500'
      },
      {
        title: 'Parent-Teacher Meeting',
        date: 'Dec 20, 2024',
        description: 'Quarterly parent-teacher meeting',
        iconComponent: IconUsers,
        colorClass: 'bg-gradient-to-br from-blue-500 to-indigo-500'
      },
      {
        title: 'Annual Function',
        date: 'Dec 25, 2024',
        description: 'Annual cultural function and prize distribution',
        iconComponent: IconMusic,
        colorClass: 'bg-gradient-to-br from-purple-500 to-pink-500'
      }
    ])

    return {
      selectedPeriod,
      feeDistributionPeriod,
      chartView,
      selectedChartType,
      selectedPieChartType,
      chartLoading,
      pieChartLoading,
      refreshing,
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
      eventsDateFilter,
      IconX,
      IconSparkles,
      IconChartLine,
      IconChartBar,
      chartToggleIcon
    }
  },
  computed: {
    incomeChartOptions() {
      return {
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
              label: (context) => `${context.dataset.label}: PKR ${this.formatNumber(context.raw)}`,
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
              callback: value => 'PKR ' + this.formatNumber(value)
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
    },
    pieChartOptions() {
      const pieData = [
        { name: 'Tuition Fee', y: 55, color: '#3B82F6' },
        { name: 'Examination Fee', y: 20, color: '#10B981' },
        { name: 'Library Fee', y: 10, color: '#F59E0B' },
        { name: 'Transport Fee', y: 10, color: '#6366F1' },
        { name: 'Other Fees', y: 5, color: '#EC4899' }
      ]
      
      // Determine chart type based on selection
      const chartType = this.selectedPieChartType === 'doughnut' ? 'pie' : 
                       this.selectedPieChartType === 'column' ? 'column' :
                       this.selectedPieChartType === 'bar' ? 'bar' : 'pie'
      
      return {
        chart: {
          type: chartType,
          backgroundColor: 'transparent',
          animation: {
            duration: 1000,
            easing: 'easeOutQuart'
          }
        },
        title: {
          text: null
        },
        tooltip: {
          pointFormat: '<b>{point.percentage:.1f}%</b><br/>Amount: PKR {point.customAmount}',
          backgroundColor: 'rgba(31, 41, 55, 0.95)',
          style: {
            color: '#F9FAFB'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            innerSize: this.selectedPieChartType === 'doughnut' ? '50%' : '0%',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                fontSize: '12px',
                fontWeight: '500'
              }
            },
            showInLegend: true,
            animation: {
              duration: 1000
            }
          },
          bar: {
            animation: {
              duration: 1000
            }
          },
          column: {
            animation: {
              duration: 1000
            }
          }
        },
        series: [{
          name: 'Fee Distribution',
          colorByPoint: true,
          data: pieData.map(item => ({
            ...item,
            customAmount: this.formatNumber((item.y / 100) * this.receivedFee)
          }))
        }],
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          layout: 'horizontal',
          itemStyle: {
            fontSize: '12px',
            fontWeight: '500'
          }
        }
      }
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
      // Pakistan number format with commas
      return new Intl.NumberFormat('en-PK', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(number)
    },
    
    async refreshData() {
      this.refreshing = true
      try {
        // Refresh all dashboard data
        await this.fetchDashboardData()
        
        // Re-initialize filtered data
        this.filteredActivities = [...this.recentActivities]
        this.filteredQuickStats = [...this.quickStats]
        this.filteredEvents = [...this.upcomingEvents]
        
        // Update all sections with current filters
        this.updateChartData()
        this.updatePieChartData()
        this.updateActivitiesData()
        this.updateQuickStatsData()
        this.updateEventsData()
        
        // Update charts
        await this.$nextTick()
        if (this.$refs.incomeChart) {
          this.$refs.incomeChart.update()
        }
        if (this.$refs.pieChart) {
          this.$refs.pieChart.update()
        }
      } catch (error) {
        console.error('Failed to refresh data:', error)
      } finally {
        this.refreshing = false
      }
    },
    
    exportReport() {
      // Implement export functionality
    },
    
    showStatDetails(payload) {
      const stat = payload?.data || payload || payload?.stat
      if (stat) {
        // Implement modal or navigation to detailed view
      }
    },
    
    showActivityDetails(activity) {
      // Implement modal with activity details
    },
    
    handleActivityClick(payload) {
      const activity = payload.data || payload
      this.showActivityDetails(activity)
    },
    
    handleEventClick(payload) {
      const event = payload.data || payload
      // Implement modal with event details
    },
    
    showQuickStatDetails(stat) {
      // Implement detailed view
    },
    
    viewAllActivities() {
      // Navigate to activities page
    },
    
    viewAllStats() {
      // Navigate to stats page
    },
    
    toggleChartView() {
      this.chartView = this.chartView === 'bar' ? 'line' : 'bar'
      this.updateChartData()
    },
    
    handleChartTypeChange() {
      // Update chart view based on selected chart type
      this.chartView = this.selectedChartType
      this.updateChartData()
    },
    
    handlePieChartTypeChange() {
      // Update pie chart type (this will be handled by HighchartsWrapper)
      this.updatePieChartData()
    },
    
    updateChartData() {
      // Update chart data based on main date filter
      this.chartLoading = true
      
      // Use mainDateFilter for chart data
      if (this.mainDateFilter.startDate) {
        // Date filter is applied, update chart accordingly
      }
      
      setTimeout(() => {
        this.chartLoading = false
        if (this.$refs.incomeChart) {
          this.$refs.incomeChart.update()
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
          // Navigate to student registration
          this.$router.push('/students/registration')
          break
        case 'addTeacher':
          // Navigate to teacher registration
          this.$router.push('/faculty/add-teacher')
          break
        case 'generateReport':
          // Implement report generation
          break
        case 'scheduleEvent':
          // Navigate to event management
          this.$router.push('/events/create')
          break
        default:
          console.log('Action not implemented yet')
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
    // Date filter methods - Each section has independent date filter
    handleMainDateChange(value) {
      this.setDateFilter(this.mainDateFilter, value)
      // Apply main date filter to activities and events
      this.updateActivitiesData()
      this.updateEventsData()
    },
    
    handleQuickStatsDateChange(value) {
      this.setDateFilter(this.quickStatsDateFilter, value)
      this.updateQuickStatsData()
    },
    
    handleChartDateChange(value) {
      this.setDateFilter(this.chartDateFilter, value)
      this.updateChartData()
    },
    
    handlePieChartDateChange(value) {
      this.setDateFilter(this.pieChartDateFilter, value)
      this.updatePieChartData()
    },
    
    
    setDateFilter(filter, value) {
      // If value is array (range from shortcuts like Today, Yesterday, Week, Month)
      if (Array.isArray(value) && value.length === 2) {
        // Store as array so CompactDatePicker can show both dates
        filter.startDate = value // Store array [startDate, endDate]
        filter.endDate = value[1]   // Keep endDate for backward compatibility
      } else {
        // Single date selected - always set start date and end date to same date with times
        if (value) {
          // Remove time if present, get only date part
          let dateStr = value
          if (value.includes(' ')) {
            dateStr = value.split(' ')[0]
          } else if (value.includes('T')) {
            dateStr = value.split('T')[0]
          }
          
          // Set as array format so CompactDatePicker shows both dates
          const startDateStr = `${dateStr} 00:00:00`
          const endDateStr = `${dateStr} 23:59:59`
          filter.startDate = [startDateStr, endDateStr] // Store as array
          filter.endDate = endDateStr // Keep for backward compatibility
        } else {
          filter.startDate = null
          filter.endDate = ''
        }
      }
    },
    
    applyMainDateFilter() {
      // Apply main date filter to all sections (optional - can be removed if not needed)
      this.updateChartData()
      this.updatePieChartData()
      this.updateActivitiesData()
      this.updateQuickStatsData()
      this.updateEventsData()
    },
    
    clearMainDateFilter() {
      this.mainDateFilter.startDate = ''
      this.mainDateFilter.endDate = ''
      
      // Update all data (all sections use mainDateFilter now)
      this.updateChartData()
      this.updatePieChartData()
      this.updateActivitiesData()
      this.updateQuickStatsData()
      this.updateEventsData()
    },
    
    updateChartData() {
      // Update chart data based on chart date filter
      this.chartLoading = true
      
      if (this.chartDateFilter.startDate) {
        // Date filter is applied, update chart accordingly
      }
      
      setTimeout(() => {
        this.chartLoading = false
        if (this.$refs.incomeChart) {
          this.$refs.incomeChart.update()
        }
      }, 1000)
    },
    
    updatePieChartData() {
      // Update pie chart data based on pie chart date filter
      if (this.pieChartDateFilter.startDate) {
        let startDate, endDate
        
        // Handle array format (from shortcuts or single date)
        if (Array.isArray(this.pieChartDateFilter.startDate)) {
          startDate = new Date(this.pieChartDateFilter.startDate[0]?.split(' ')[0] || this.pieChartDateFilter.startDate[0])
          endDate = new Date(this.pieChartDateFilter.startDate[1]?.split(' ')[0] || this.pieChartDateFilter.startDate[1] || this.pieChartDateFilter.endDate?.split(' ')[0])
        } else {
          startDate = new Date(this.pieChartDateFilter.startDate?.split(' ')[0] || this.pieChartDateFilter.startDate)
          endDate = new Date(this.pieChartDateFilter.endDate?.split(' ')[0] || this.pieChartDateFilter.endDate || this.pieChartDateFilter.startDate)
        }
        
        // Use dates for filtering if needed
      }
      
      this.pieChartLoading = true
      setTimeout(() => {
        this.pieChartLoading = false
        if (this.$refs.pieChart) {
          this.$refs.pieChart.update()
        }
      }, 1000)
    },
    
    updateActivitiesData() {
      // Filter activities based on main date filter (activities use main filter)
      if (this.mainDateFilter.startDate) {
        let startDate, endDate
        
        // Handle array format (from shortcuts or single date)
        if (Array.isArray(this.mainDateFilter.startDate)) {
          startDate = new Date(this.mainDateFilter.startDate[0]?.split(' ')[0] || this.mainDateFilter.startDate[0])
          endDate = new Date(this.mainDateFilter.startDate[1]?.split(' ')[0] || this.mainDateFilter.startDate[1] || this.mainDateFilter.endDate?.split(' ')[0])
        } else {
          startDate = new Date(this.mainDateFilter.startDate?.split(' ')[0] || this.mainDateFilter.startDate)
          endDate = new Date(this.mainDateFilter.endDate?.split(' ')[0] || this.mainDateFilter.endDate || this.mainDateFilter.startDate)
        }
        
        // Filter activities based on their time (simulating date-based filtering)
        this.filteredActivities = this.recentActivities.filter((activity, index) => {
          // Simulate date-based filtering by using index as days ago
          const activityDate = new Date()
          activityDate.setDate(activityDate.getDate() - (index + 1))
          return activityDate >= startDate && activityDate <= endDate
        })
        
      } else {
        this.filteredActivities = this.recentActivities
      }
    },
    
    updateQuickStatsData() {
      // Filter quick stats based on quick stats date filter
      if (this.quickStatsDateFilter.startDate) {
        let startDate, endDate
        
        // Handle array format (from shortcuts or single date)
        if (Array.isArray(this.quickStatsDateFilter.startDate)) {
          startDate = new Date(this.quickStatsDateFilter.startDate[0]?.split(' ')[0] || this.quickStatsDateFilter.startDate[0])
          endDate = new Date(this.quickStatsDateFilter.startDate[1]?.split(' ')[0] || this.quickStatsDateFilter.startDate[1] || this.quickStatsDateFilter.endDate?.split(' ')[0])
        } else {
          startDate = new Date(this.quickStatsDateFilter.startDate?.split(' ')[0] || this.quickStatsDateFilter.startDate)
          endDate = new Date(this.quickStatsDateFilter.endDate?.split(' ')[0] || this.quickStatsDateFilter.endDate || this.quickStatsDateFilter.startDate)
        }
        
        // Simulate filtering by adjusting values based on date
        this.filteredQuickStats = this.quickStats.map(stat => {
          const daysDiff = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24))
          const multiplier = Math.max(0.5, Math.min(1.5, daysDiff / 30)) // Adjust based on date range
          
          return {
            ...stat,
            value: Math.floor(stat.originalValue * multiplier),
            percentage: Math.min(100, Math.floor(stat.originalPercentage * multiplier))
          }
        })
        
      } else {
        this.filteredQuickStats = this.quickStats
      }
    },
    
    updateEventsData() {
      // Filter events based on main date filter (events use main filter)
      if (this.mainDateFilter.startDate) {
        let startDate, endDate
        
        // Handle array format (from shortcuts or single date)
        if (Array.isArray(this.mainDateFilter.startDate)) {
          startDate = new Date(this.mainDateFilter.startDate[0]?.split(' ')[0] || this.mainDateFilter.startDate[0])
          endDate = new Date(this.mainDateFilter.startDate[1]?.split(' ')[0] || this.mainDateFilter.startDate[1] || this.mainDateFilter.endDate?.split(' ')[0])
        } else {
          startDate = new Date(this.mainDateFilter.startDate?.split(' ')[0] || this.mainDateFilter.startDate)
          endDate = new Date(this.mainDateFilter.endDate?.split(' ')[0] || this.mainDateFilter.endDate || this.mainDateFilter.startDate)
        }
        
        // Filter events based on their date
        this.filteredEvents = this.upcomingEvents.filter(event => {
          const eventDate = new Date(event.date)
          return eventDate >= startDate && eventDate <= endDate
        })
        
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
    
    initCharts() {
      // Charts are now handled by ChartJsWrapper and HighchartsWrapper components
      // No manual initialization needed
    },
    
    async fetchDashboardData() {
      try {
        this.loading = true
        
        // Ensure incomeData is initialized
        if (!this.incomeData) {
          this.incomeData = {
            labels: [],
            datasets: [
              { label: 'Current Month', data: [] },
              { label: 'Previous Month', data: [] }
            ]
          }
        }
        
        // Ensure pieData is initialized
        if (!this.pieData) {
          this.pieData = {
            labels: [],
            datasets: [{ data: [] }]
          }
        }
        
        // Fetch monthly income data - use chart date filter
        const incomeParams = {
          period: this.selectedPeriod
        }
        if (this.chartDateFilter.startDate) {
          if (Array.isArray(this.chartDateFilter.startDate)) {
            incomeParams.startDate = this.chartDateFilter.startDate[0]?.split(' ')[0]
            incomeParams.endDate = this.chartDateFilter.startDate[1]?.split(' ')[0]
          } else {
            incomeParams.startDate = this.chartDateFilter.startDate?.split(' ')[0]
            incomeParams.endDate = this.chartDateFilter.endDate?.split(' ')[0] || this.chartDateFilter.startDate?.split(' ')[0]
          }
        }
        const incomeResponse = await axios.get('/api/admin/dashboard/monthly-income', {
          params: incomeParams
        })
        
        // Fetch fee distribution data - use pie chart date filter
        const distributionParams = {
          period: this.feeDistributionPeriod
        }
        if (this.pieChartDateFilter.startDate) {
          if (Array.isArray(this.pieChartDateFilter.startDate)) {
            distributionParams.startDate = this.pieChartDateFilter.startDate[0]?.split(' ')[0]
            distributionParams.endDate = this.pieChartDateFilter.startDate[1]?.split(' ')[0]
          } else {
            distributionParams.startDate = this.pieChartDateFilter.startDate?.split(' ')[0]
            distributionParams.endDate = this.pieChartDateFilter.endDate?.split(' ')[0] || this.pieChartDateFilter.startDate?.split(' ')[0]
          }
        }
        const distributionResponse = await axios.get('/api/admin/dashboard/fee-distribution', {
          params: distributionParams
        })
        
        // Update income chart data - with null checks
        if (incomeResponse?.data?.data) {
          if (incomeResponse.data.data.labels && Array.isArray(incomeResponse.data.data.labels)) {
            this.incomeData.labels = incomeResponse.data.data.labels
          }
          if (incomeResponse.data.data.currentMonth && Array.isArray(incomeResponse.data.data.currentMonth) && this.incomeData.datasets?.[0]) {
            this.incomeData.datasets[0].data = incomeResponse.data.data.currentMonth
          }
          if (incomeResponse.data.data.previousMonth && Array.isArray(incomeResponse.data.data.previousMonth) && this.incomeData.datasets?.[1]) {
            this.incomeData.datasets[1].data = incomeResponse.data.data.previousMonth
          }
        }
        
        // Update pie chart data - with null checks
        if (distributionResponse?.data?.data) {
          if (distributionResponse.data.data.labels && Array.isArray(distributionResponse.data.data.labels)) {
            this.pieData.labels = distributionResponse.data.data.labels
          }
          if (distributionResponse.data.data.values && Array.isArray(distributionResponse.data.data.values) && this.pieData.datasets?.[0]) {
            this.pieData.datasets[0].data = distributionResponse.data.data.values
          }
        }
        
        // Update statistics - with null checks
        if (incomeResponse?.data?.data) {
          if (incomeResponse.data.data.totalFee !== undefined) {
            this.totalFee = incomeResponse.data.data.totalFee
          }
          if (incomeResponse.data.data.receivedFee !== undefined) {
            this.receivedFee = incomeResponse.data.data.receivedFee
          }
          if (incomeResponse.data.data.presentStudents !== undefined) {
            this.presentStudents = incomeResponse.data.data.presentStudents
          }
          if (incomeResponse.data.data.absentStudents !== undefined) {
            this.absentStudents = incomeResponse.data.data.absentStudents
          }
        }
        
        // Update charts with new data
        if (this.$refs.incomeChart) {
          this.$refs.incomeChart.update()
        }
        if (this.$refs.pieChart) {
          this.$refs.pieChart.update()
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
      // Charts are now handled by ChartJsWrapper and HighchartsWrapper components
      // They will auto-destroy on component unmount
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

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
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

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
  opacity: 0;
}

.animate-slide-in-right {
  animation: slide-in-right 0.5s ease-out forwards;
  opacity: 0;
}

.animate-scale-in {
  animation: scale-in 0.4s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
  opacity: 0;
}

.animate-slide-in-right {
  animation: slide-in-right 0.5s ease-out forwards;
  opacity: 0;
}

.animate-scale-in {
  animation: scale-in 0.4s ease-out forwards;
  opacity: 0;
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