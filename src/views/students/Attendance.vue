<template>
  <div class="relative w-full min-h-screen pl-0 pr-0 sm:pl-0 sm:pr-0 lg:pl-1 lg:pr-0 py-2 sm:py-3 lg:py-4">
    
    <!-- Main Attendance Selection Page -->
    <div v-if="!selectedAttendanceType" class="w-full">
      <!-- Top Bar Header -->
      <div class="w-full mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500">
        <h2 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
          <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          Student Attendance Management
        </h2>
        <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
          <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Dashboard</span>
          <span class="mx-2">|</span>
          <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Students</span>
          <span class="mx-2">|</span>
          <span class="text-gray-900 font-bold">Attendance</span>
        </nav>
      </div>

      <!-- Select Attendance Type -->
      <div class="w-full mx-auto mb-6">
        <div class="flex flex-col items-center">
          <h3 class="text-base font-medium text-gray-900 tracking-tight mb-2">Choose Attendance Type</h3>
          <div class="h-[2px] bg-purple-200 w-full transition-all duration-300" style="max-width: 180px"></div>
        </div>
      </div>

      <!-- Attendance Type Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <!-- Subject-wise Attendance Card -->
        <div class="bg-white/90 rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-base font-medium text-white mb-1 tracking-tight">Subject-wise Attendance</h3>
                <p class="text-blue-100 text-sm">Mark attendance for specific subjects</p>
              </div>
              <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="p-8">
            <div class="space-y-4 mb-6">
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span class="text-sm text-gray-600">Mark attendance per subject</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span class="text-sm text-gray-600">Track subject-specific presence</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span class="text-sm text-gray-600">Generate subject reports</span>
              </div>
            </div>
            
            <button 
              @click="selectAttendanceType('subject')"
              class="w-full h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Subject Attendance
            </button>
          </div>
        </div>

        <!-- Class-wise Attendance Card -->
        <div class="bg-white/90 rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div class="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-base font-medium text-white mb-1 tracking-tight">Class-wise Attendance</h3>
                <p class="text-purple-100 text-sm">Mark attendance for entire class</p>
              </div>
              <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.5a8.25 8.25 0 0116.5 0"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="p-8">
            <div class="space-y-4 mb-6">
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span class="text-sm text-gray-600">Mark attendance for whole class</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span class="text-sm text-gray-600">Daily attendance tracking</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span class="text-sm text-gray-600">Generate class reports</span>
              </div>
            </div>
            
            <button 
              @click="selectAttendanceType('class')"
              class="w-full h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Class Attendance
            </button>
          </div>
        </div>

        <!-- Reports & Analytics Card -->
        <div class="bg-white/90 rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div class="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-base font-medium text-white mb-1 tracking-tight">Reports & Analytics</h3>
                <p class="text-green-100 text-sm">View comprehensive attendance reports</p>
              </div>
              <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="p-8">
            <div class="space-y-4 mb-6">
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <span class="text-sm text-gray-600">Daily & Monthly reports</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <span class="text-sm text-gray-600">Subject-wise analytics</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <span class="text-sm text-gray-600">Trends & insights</span>
              </div>
            </div>
            
            <button 
              @click="selectAttendanceType('reports')"
              class="w-full h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View Reports
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div class="bg-white/80 rounded-xl p-6 text-center shadow-lg">
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h4 class="text-lg font-semibold text-gray-900 mb-1">Today's Present</h4>
          <p class="text-2xl font-bold text-green-600">{{ todayStats.present }}</p>
        </div>

        <div class="bg-white/80 rounded-xl p-6 text-center shadow-lg">
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h4 class="text-lg font-semibold text-gray-900 mb-1">Today's Absent</h4>
          <p class="text-2xl font-bold text-red-600">{{ todayStats.absent }}</p>
        </div>

        <div class="bg-white/80 rounded-xl p-6 text-center shadow-lg">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z"/>
            </svg>
          </div>
          <h4 class="text-lg font-semibold text-gray-900 mb-1">Total Students</h4>
          <p class="text-2xl font-bold text-blue-600">{{ todayStats.total }}</p>
        </div>
      </div>
    </div>

    <!-- Reports & Analytics Page -->
    <div v-else-if="selectedAttendanceType === 'reports'" class="w-full">
      <!-- Back Button -->
      <div class="mb-4">
        <button 
          @click="goBack"
          class="flex items-center gap-2 px-4 py-2 bg-white/90 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-gray-900 hover:text-gray-900"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Selection
        </button>
      </div>

      <!-- Reports Header -->
      <div class="w-full mx-auto mt-2 mb-6 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500">
        <h2 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
          <div class="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
          Attendance Reports & Analytics
        </h2>
        <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
          <span class="hover:text-green-600 cursor-pointer transition-colors duration-200">Dashboard</span>
          <span class="mx-2">|</span>
          <span class="hover:text-green-600 cursor-pointer transition-colors duration-200">Students</span>
          <span class="mx-2">|</span>
          <span class="hover:text-green-600 cursor-pointer transition-colors duration-200">Attendance</span>
          <span class="mx-2">|</span>
          <span class="text-gray-900 font-bold">Reports</span>
        </nav>
      </div>

      <!-- Report Type Selection -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- Daily Report Card -->
        <div class="bg-white/90 rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer" @click="selectedReportType = 'daily'">
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-medium text-white tracking-tight">Daily Report</h3>
                <p class="text-blue-100 text-sm">Day-wise attendance sheet</p>
              </div>
            </div>
          </div>
          <div class="p-4">
            <p class="text-sm text-gray-600">Generate detailed daily attendance reports for specific dates</p>
          </div>
        </div>

        <!-- Monthly Report Card -->
        <div class="bg-white/90 rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer" @click="selectedReportType = 'monthly'">
          <div class="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-medium text-white tracking-tight">Monthly Summary</h3>
                <p class="text-purple-100 text-sm">Student-wise percentage</p>
              </div>
            </div>
          </div>
          <div class="p-4">
            <p class="text-sm text-gray-600">Comprehensive monthly attendance summary with statistics</p>
          </div>
        </div>

        <!-- Subject-wise Report Card -->
        <div class="bg-white/90 rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer" @click="selectedReportType = 'subject'">
          <div class="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-medium text-white tracking-tight">Subject-wise</h3>
                <p class="text-indigo-100 text-sm">Subject attendance tracking</p>
              </div>
            </div>
          </div>
          <div class="p-4">
            <p class="text-sm text-gray-600">Analyze attendance patterns for individual subjects</p>
          </div>
        </div>

        <!-- Trends Report Card -->
        <div class="bg-white/90 rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer" @click="selectedReportType = 'trends'">
          <div class="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-medium text-white tracking-tight">Trends & Analytics</h3>
                <p class="text-green-100 text-sm">Attendance patterns</p>
              </div>
            </div>
          </div>
          <div class="p-4">
            <p class="text-sm text-gray-600">Discover trends and patterns in attendance data</p>
          </div>
        </div>

        <!-- Defaulters List Card -->
        <div class="bg-white/90 rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer" @click="selectedReportType = 'defaulters'">
          <div class="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-medium text-white tracking-tight">Defaulters List</h3>
                <p class="text-red-100 text-sm">Students below 75%</p>
              </div>
            </div>
          </div>
          <div class="p-4">
            <p class="text-sm text-gray-600">Identify students with poor attendance records</p>
          </div>
        </div>

        <!-- Class Comparison Card -->
        <div class="bg-white/90 rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer" @click="selectedReportType = 'comparison'">
          <div class="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.5a8.25 8.25 0 0116.5 0"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-medium text-white tracking-tight">Class Comparison</h3>
                <p class="text-orange-100 text-sm">Compare class performance</p>
              </div>
            </div>
          </div>
          <div class="p-4">
            <p class="text-sm text-gray-600">Compare attendance rates across different classes</p>
          </div>
        </div>
      </div>

      <!-- Report Content Area -->
      <div v-if="selectedReportType" class="bg-white/90 rounded-xl shadow-lg p-6">
        <!-- Report Filters -->
        <div class="mb-6 p-4 bg-white rounded-lg">
          <h4 class="text-base font-medium text-gray-900 mb-4">Report Filters</h4>
                      <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
             <div class="w-full">
              <label class="block text-sm font-medium text-gray-900 mb-1">Session</label>
              <select v-model="reportFilters.session_id" @change="onSessionChange" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500">
                <option value="">All Sessions</option>
                <option v-for="session in sessionOptions" :key="session.value" :value="session.value">{{ session.label }}</option>
              </select>
            </div>
            <div class="w-full">
              <label class="block text-sm font-medium text-gray-900 mb-1">Class</label>
              <select v-model="reportFilters.class_id" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500">
                <option value="">All Classes</option>
                <option v-for="cls in classOptions" :key="cls.value" :value="cls.value">{{ cls.label }}</option>
              </select>
            </div>
            <div class="w-full">
              <label class="block text-sm font-medium text-gray-900 mb-1">Section</label>
              <select v-model="reportFilters.section_id" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500">
                <option value="">All Sections</option>
                <option v-for="section in sectionOptions" :key="section.value" :value="section.value">{{ section.label }}</option>
              </select>
            </div>
            <div v-if="selectedReportType === 'subject'" class="w-full">
              <label class="block text-sm font-medium text-gray-900 mb-1">Subject</label>
              <select v-model="reportFilters.subject_id" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500">
                <option value="">All Subjects</option>
                <option v-for="subject in subjectOptions" :key="subject.value" :value="subject.value">{{ subject.label }}</option>
              </select>
            </div>
            <div v-if="selectedReportType === 'daily'" class="w-full">
              <label class="block text-sm font-medium text-gray-900 mb-1">Date</label>
              <CompactDatePicker v-model="reportFilters.date" placeholder="" />
            </div>
            <div v-if="['monthly', 'subject', 'comparison'].includes(selectedReportType)" class="w-full">
              <label class="block text-sm font-medium text-gray-900 mb-1">Month</label>
              <select v-model="reportFilters.month" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500">
                <option v-for="month in months" :key="month.value" :value="month.value">{{ month.label }}</option>
              </select>
            </div>
            <div v-if="['monthly', 'subject', 'comparison'].includes(selectedReportType)" class="w-full">
              <label class="block text-sm font-medium text-gray-900 mb-1">Year</label>
              <select v-model="reportFilters.year" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500">
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
              </select>
            </div>
            <div v-if="selectedReportType === 'trends'" class="w-full">
              <label class="block text-sm font-medium text-gray-900 mb-1">Date From</label>
              <CompactDatePicker v-model="reportFilters.date_from" placeholder="" />
            </div>
            <div v-if="selectedReportType === 'trends'" class="w-full">
              <label class="block text-sm font-medium text-gray-900 mb-1">Date To</label>
              <CompactDatePicker v-model="reportFilters.date_to" placeholder="" />
            </div>
          </div>
          <div class="flex justify-end mt-4 gap-2">
            <button @click="generateReport" class="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 font-medium">
              Generate Report
            </button>
            <button @click="exportReport" class="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 font-medium">
              Export
            </button>
          </div>
        </div>

        <!-- Report Content -->
        <div v-if="reportData" class="space-y-6">
          <!-- Report Header -->
          <div class="text-center border-b pb-4">
            <h3 class="text-xl font-bold text-gray-900">{{ getReportTitle() }}</h3>
            <p class="text-sm text-gray-600 mt-1">{{ getReportSubtitle() }}</p>
          </div>

                     <!-- Report Data Display -->
           <div v-if="selectedReportType === 'daily'" class="space-y-4">
                        <!-- Daily Report Summary -->
           <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
             <div class="bg-green-50 rounded-lg p-4 text-center">
               <div class="text-2xl font-bold text-green-600">{{ reportData.data?.summary?.present || 0 }}</div>
               <div class="text-sm text-green-700">Present</div>
             </div>
             <div class="bg-red-50 rounded-lg p-4 text-center">
               <div class="text-2xl font-bold text-red-600">{{ reportData.data?.summary?.absent || 0 }}</div>
               <div class="text-sm text-red-700">Absent</div>
             </div>
             <div class="bg-yellow-50 rounded-lg p-4 text-center">
               <div class="text-2xl font-bold text-yellow-600">{{ reportData.data?.summary?.late || 0 }}</div>
               <div class="text-sm text-yellow-700">Late</div>
             </div>
             <div class="bg-blue-50 rounded-lg p-4 text-center">
               <div class="text-2xl font-bold text-blue-600">{{ reportData.data?.summary?.total_students || 0 }}</div>
               <div class="text-sm text-blue-700">Total</div>
             </div>
           </div>

           <!-- Daily Report Chart -->
           <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
             <div class="bg-white rounded-lg p-4 shadow-sm">
               <h4 class="text-lg font-medium text-gray-900 mb-4">Attendance Overview</h4>
               <canvas ref="dailyChart" width="400" height="200"></canvas>
             </div>
             <div class="bg-white rounded-lg p-4 shadow-sm">
               <h4 class="text-lg font-medium text-gray-900 mb-4">Status Distribution</h4>
               <canvas ref="statusChart" width="400" height="200"></canvas>
             </div>
           </div>
             
             <!-- Daily Report Table -->
             <div class="overflow-x-auto">
               <table class="min-w-full bg-white border border-gray-200 rounded-lg">
                 <thead class="bg-white">
                   <tr>
                     <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                     <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Roll No</th>
                     <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                     <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time In</th>
                     <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Remarks</th>
                   </tr>
                 </thead>
                 <tbody class="divide-y divide-gray-200">
                   <tr v-for="record in reportData.data.attendance_sheet" :key="record.student.id">
                     <td class="px-4 py-2 text-sm text-gray-900">{{ record.student.name }}</td>
                     <td class="px-4 py-2 text-sm text-gray-900">{{ record.student.roll_number }}</td>
                     <td class="px-4 py-2">
                       <span :class="getStatusClass(record.attendance[0]?.status || 'absent')" class="px-2 py-1 rounded-full text-xs font-medium">
                         {{ record.attendance[0]?.status || 'absent' }}
                       </span>
                     </td>
                     <td class="px-4 py-2 text-sm text-gray-900">{{ record.attendance[0]?.time_in || '-' }}</td>
                     <td class="px-4 py-2 text-sm text-gray-900">{{ record.attendance[0]?.remarks || '-' }}</td>
                   </tr>
                 </tbody>
               </table>
             </div>
           </div>

           <!-- Monthly Report Display -->
           <div v-else-if="selectedReportType === 'monthly'" class="space-y-4">
             <!-- Monthly Summary Stats -->
             <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
               <div class="bg-blue-50 rounded-lg p-4 text-center">
                 <div class="text-2xl font-bold text-blue-600">{{ reportData.data?.overall_stats?.total_students || 0 }}</div>
                 <div class="text-sm text-blue-700">Total Students</div>
               </div>
               <div class="bg-green-50 rounded-lg p-4 text-center">
                 <div class="text-2xl font-bold text-green-600">{{ Math.round(reportData.data.overall_stats?.average_attendance || 0) }}%</div>
                 <div class="text-sm text-green-700">Avg Attendance</div>
               </div>
               <div class="bg-yellow-50 rounded-lg p-4 text-center">
                 <div class="text-2xl font-bold text-yellow-600">{{ reportData.data.overall_stats?.good_attendance || 0 }}</div>
                 <div class="text-sm text-yellow-700">Good (75-89%)</div>
               </div>
               <div class="bg-red-50 rounded-lg p-4 text-center">
                 <div class="text-2xl font-bold text-red-600">{{ reportData.data.overall_stats?.defaulters_count || 0 }}</div>
                 <div class="text-sm text-red-700">Defaulters</div>
               </div>
             </div>

             <!-- Monthly Report Charts -->
             <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
               <div class="bg-white rounded-lg p-4 shadow-sm">
                 <h4 class="text-lg font-medium text-gray-900 mb-4">Monthly Attendance Trend</h4>
                 <canvas ref="monthlyTrendChart" width="400" height="200"></canvas>
               </div>
               <div class="bg-white rounded-lg p-4 shadow-sm">
                 <h4 class="text-lg font-medium text-gray-900 mb-4">Performance Categories</h4>
                 <canvas ref="performanceChart" width="400" height="200"></canvas>
               </div>
             </div>
             
             <!-- Monthly Report Table -->
             <div class="overflow-x-auto">
               <table class="min-w-full bg-white border border-gray-200 rounded-lg">
                 <thead class="bg-white">
                   <tr>
                     <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                     <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Roll No</th>
                     <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                     <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total Days</th>
                     <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Present Days</th>
                     <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
                     <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                   </tr>
                 </thead>
                 <tbody class="divide-y divide-gray-200">
                   <tr v-for="summary in reportData.data.student_summaries" :key="summary.student.id">
                     <td class="px-4 py-2 text-sm text-gray-900">{{ summary.student.name }}</td>
                     <td class="px-4 py-2 text-sm text-gray-900">{{ summary.student.roll_number }}</td>
                     <td class="px-4 py-2 text-sm text-gray-900">{{ summary.student.class }} - {{ summary.student.section }}</td>
                     <td class="px-4 py-2 text-sm text-gray-900">{{ summary.total_days }}</td>
                     <td class="px-4 py-2 text-sm text-gray-900">{{ summary.present_days }}</td>
                     <td class="px-4 py-2">
                       <span :class="getAttendancePercentageClass(summary.attendance_percentage)" class="px-2 py-1 rounded-full text-xs font-medium">
                         {{ summary.attendance_percentage }}%
                       </span>
                     </td>
                     <td class="px-4 py-2">
                       <span :class="summary.is_defaulter ? 'text-red-600 font-medium' : 'text-green-600 font-medium'" class="text-xs">
                         {{ summary.is_defaulter ? 'Defaulter' : 'Good' }}
                       </span>
                     </td>
                   </tr>
                 </tbody>
               </table>
             </div>
           </div>

           <!-- Subject-wise Report Display -->
           <div v-else-if="selectedReportType === 'subject'" class="space-y-6">
             <div v-for="subjectReport in reportData.data.subject_reports" :key="subjectReport.subject.id" class="border border-gray-200 rounded-lg p-4">
               <div class="flex items-center justify-between mb-4">
                 <h4 class="text-lg font-medium text-gray-900">{{ subjectReport.subject.name }} ({{ subjectReport.subject.code }})</h4>
                 <div class="text-sm text-gray-600">
                   Avg: {{ Math.round(subjectReport.subject_stats.average_attendance) }}% | 
                   Classes: {{ subjectReport.subject_stats.total_classes_conducted }}
                 </div>
               </div>
               
               <div class="overflow-x-auto">
                 <table class="min-w-full bg-white border border-gray-200 rounded-lg">
                   <thead class="bg-white">
                     <tr>
                       <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                       <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Roll No</th>
                       <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total Classes</th>
                       <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Present</th>
                       <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
                     </tr>
                   </thead>
                   <tbody class="divide-y divide-gray-200">
                     <tr v-for="student in subjectReport.student_summaries" :key="student.student_id">
                       <td class="px-4 py-2 text-sm text-gray-900">{{ student.student_name }}</td>
                       <td class="px-4 py-2 text-sm text-gray-900">{{ student.roll_number }}</td>
                       <td class="px-4 py-2 text-sm text-gray-900">{{ student.total_classes }}</td>
                       <td class="px-4 py-2 text-sm text-gray-900">{{ student.present_classes }}</td>
                       <td class="px-4 py-2">
                         <span :class="getAttendancePercentageClass(student.attendance_percentage)" class="px-2 py-1 rounded-full text-xs font-medium">
                           {{ student.attendance_percentage }}%
                         </span>
                       </td>
                     </tr>
                   </tbody>
                 </table>
               </div>
             </div>
           </div>

           <!-- Defaulters List Display -->
           <div v-else-if="selectedReportType === 'defaulters'" class="space-y-4">
             <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
               <h4 class="text-lg font-medium text-red-800 mb-2">Students with Attendance Below 75%</h4>
               <p class="text-sm text-red-600">Total Defaulters: {{ reportData.data?.length || 0 }}</p>
             </div>
             
             <div class="overflow-x-auto">
               <table class="min-w-full bg-white border border-gray-200 rounded-lg">
                 <thead class="bg-white">
                   <tr>
                     <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                     <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Roll No</th>
                     <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                     <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total Days</th>
                     <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Present Days</th>
                     <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
                   </tr>
                 </thead>
                 <tbody class="divide-y divide-gray-200">
                   <tr v-for="defaulter in reportData.data" :key="defaulter.student.id" class="bg-red-50">
                     <td class="px-4 py-2 text-sm text-gray-900">{{ defaulter.student.first_name }} {{ defaulter.student.last_name }}</td>
                     <td class="px-4 py-2 text-sm text-gray-900">{{ defaulter.student.roll_number }}</td>
                     <td class="px-4 py-2 text-sm text-gray-900">{{ defaulter.student.class?.name }} - {{ defaulter.student.section?.name }}</td>
                     <td class="px-4 py-2 text-sm text-gray-900">{{ defaulter.total_days }}</td>
                     <td class="px-4 py-2 text-sm text-gray-900">{{ defaulter.present_days }}</td>
                     <td class="px-4 py-2">
                       <span class="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                         {{ defaulter.attendance_percentage }}%
                       </span>
                     </td>
                   </tr>
                 </tbody>
               </table>
             </div>
           </div>

           <!-- Other Report Types -->
           <div v-else class="text-center py-8">
             <svg class="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z"/>
             </svg>
             <h4 class="text-lg font-medium text-gray-900 mb-2">Report Data</h4>
             <p class="text-gray-600">Report generated successfully. Data structure:</p>
             <pre class="mt-4 text-left bg-white p-4 rounded-lg text-xs overflow-auto">{{ JSON.stringify(reportData.data, null, 2) }}</pre>
           </div>
        </div>

        <!-- Loading State -->
        <div v-else-if="reportLoading" class="flex flex-col items-center justify-center py-12">
          <div class="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
          <p class="text-gray-600">Generating report...</p>
        </div>

        <!-- No Report Selected -->
        <div v-else class="text-center py-12">
          <svg class="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z"/>
          </svg>
          <h4 class="text-lg font-medium text-gray-900 mb-2">Select Report Type</h4>
          <p class="text-gray-600">Choose a report type above and fill the required filters to generate report</p>
          <div class="mt-4 flex justify-center">
            <div class="flex items-center gap-2 text-xs text-gray-500">
              <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>Daily Report</span>
              <span class="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span>Monthly Summary</span>
              <span class="w-2 h-2 bg-indigo-400 rounded-full"></span>
              <span>Subject-wise</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Attendance Management Page (Current Code) -->
    <div v-else-if="selectedAttendanceType !== 'reports'" class="w-full">
      <!-- Back Button -->
      <div class="mb-4">
        <button 
          @click="goBack"
          class="flex items-center gap-2 px-4 py-2 bg-white/90 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-gray-900 hover:text-gray-900"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Selection
        </button>
      </div>

    <!-- View Mode Tabs -->
    <div class="relative z-10 w-full mb-6 flex justify-end">
      <div class="flex bg-white rounded-full shadow-lg p-1 border border-gray-200">
        <button
          @click="setViewMode('daily')"
          :class="[
            (viewMode === 'daily' ? 'px-3' : 'px-4'),
            'py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform relative overflow-hidden',
            viewMode === 'daily' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105'
              : 'text-purple-600 hover:text-purple-700 hover:bg-purple-50 hover:scale-102'
          ]"
        >
          <span class="relative z-10 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            Daily Attendance
            <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-white text-purple-700 border border-purple-200 ml-1">{{ todayCount }}</span>
          </span>
          <div v-if="viewMode === 'daily'" class="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-pulse rounded-full"></div>
        </button>
        <div class="h-6 w-px bg-purple-200 mx-1 self-center"></div>
        <button
          @click="setViewMode('monthly')"
          :class="[
            (viewMode === 'monthly' ? 'px-3' : 'px-4'),
            'py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform relative overflow-hidden',
            viewMode === 'monthly' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105'
              : 'text-purple-600 hover:text-purple-700 hover:bg-purple-50 hover:scale-102'
          ]"
        >
          <span class="relative z-10 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z"/>
            </svg>
            Monthly Report
            <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-white text-purple-700 border border-purple-200 ml-1">{{ monthlyCount }}</span>
          </span>
          <div v-if="viewMode === 'monthly'" class="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-pulse rounded-full"></div>
        </button>
      </div>
    </div>

          <!-- Top Bar Header -->
    <div class="relative z-10 w-full mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
        <h2 class="text-base font-medium text-gray-900 tracking-tight flex items-center gap-2">
          <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          {{ selectedAttendanceType === 'subject' ? 'Subject-wise Attendance' : 'Class-wise Attendance' }}
        </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-600">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Dashboard</span>
        <span class="mx-2">|</span>
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Academic</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">Attendance</span>
      </nav>
    </div>

          <!-- Select Criteria Label -->
      <div class="relative z-10 w-full mb-2">
        <div class="flex flex-col items-start">
          <h3 class="text-base font-medium text-gray-900 tracking-tight">Filter Attendance</h3>
          <div class="h-[2px] bg-purple-200 w-full transition-all duration-300" style="max-width: 110px"></div>
        </div>
      </div>

    <!-- Filter Bar in Card -->
    <div class="relative z-10 w-full rounded-lg transition-all duration-500 ease-in-out transform hover:shadow-lg bg-white p-4 mb-6">
      <form class="w-full" @submit.prevent="handleSearch">
        <div class="flex flex-wrap items-end gap-x-4 gap-y-3">
          <!-- Search Field -->
          <div class="flex flex-col w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] lg:flex-1">
            <label class="mb-1 text-base font-normal text-black modern-font">Search</label>
            <div class="relative">
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Search students..." 
                class="h-9 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
              />
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
          
          <!-- Session Field -->
          <div class="flex flex-col w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] lg:flex-1">
            <label class="mb-1 text-base font-normal text-black modern-font">Session</label>
            <div class="relative">
              <select v-model="selectedSession" class="h-9 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="">All Sessions</option>
                <option v-for="session in sessionOptions" :key="session.value" :value="session.value">{{ session.label }}</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                </svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
          
          <!-- Class Field -->
          <div class="flex flex-col w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] lg:flex-1">
            <label class="mb-1 text-base font-normal text-black modern-font">Class</label>
            <div class="relative">
              <select v-model="selectedClass" class="h-9 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="">All Classes</option>
                <option v-for="cls in classOptions" :key="cls.value" :value="cls.value">{{ cls.label }}</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                </svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
          
          <!-- Section Field -->
          <div class="flex flex-col w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] lg:flex-1">
            <label class="mb-1 text-base font-normal text-black modern-font">Section</label>
            <div class="relative">
              <select v-model="selectedSection" class="h-9 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="">All Sections</option>
                <option v-for="section in sectionOptions" :key="section.value" :value="section.value">{{ section.label }}</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                </svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
          
          <!-- Subject Field (only for subject-wise) -->
          <div v-if="selectedAttendanceType === 'subject'" class="flex flex-col w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] lg:flex-1">
            <label class="mb-1 text-base font-normal text-black modern-font">Subject</label>
            <div class="relative">
              <select v-model="selectedSubject" class="h-9 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="">Select Subject</option>
                <option v-for="subject in subjectOptions" :key="subject.value" :value="subject.value">{{ subject.label }}</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                </svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
          
          <!-- Date Field -->
          <div class="flex flex-col w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] lg:flex-1">
            <label class="mb-1 text-base font-normal text-black modern-font">Date</label>
            <div class="relative">
              <CompactDatePicker v-model="selectedDate" placeholder="" />
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex justify-end mt-3">
          <div class="flex items-center gap-2">
            <button 
              type="button"
              @click="clearFilters"
              class="h-9 px-6 bg-white hover:bg-white text-gray-900 text-sm font-medium rounded-full border border-gray-200 transition-all duration-300 shadow-sm hover:shadow-md transform origin-left hover:scale-105 flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              Clear
            </button>
            <button 
              type="submit"
              class="h-9 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md transform origin-left hover:scale-105 flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Search
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Data List Header with Animation -->
    <div class="relative z-10 w-full flex items-center justify-between mb-6 mt-8">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce"></div>
          {{ selectedAttendanceType === 'subject' ? 'Subject Students' : 'Class Students' }} ({{ total }})
        </h3>
        <div class="h-[2px] bg-purple-200 w-full transition-all duration-500" style="max-width: 120px"></div>
      </div>
    </div>
    <div class="relative z-10 w-full">
      <div class="h-[2px] w-full bg-purple-200 mb-4"></div>
    </div>

    <!-- Loader -->
    <div v-if="loading" class="relative z-10 w-full">
      <div class="border border-gray-200 rounded-xl p-8 bg-white shadow-sm">
        <TableLoader />
      </div>
    </div>

    <!-- No Data Found -->
    <div v-else-if="!loading && filteredStudents.length === 0" class="relative z-10 w-full">
      <div class="border border-gray-200 rounded-xl p-8 bg-white shadow-sm overflow-hidden">
        <div class="flex flex-col items-center justify-center py-12">
          <div class="relative mb-6">
            <div class="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <div class="absolute -top-2 -right-2 w-4 h-4 bg-purple-300 rounded-full animate-ping opacity-30"></div>
            <div class="absolute -bottom-2 -left-2 w-3 h-3 bg-indigo-300 rounded-full animate-pulse"></div>
          </div>
          <div class="text-center max-w-sm">
            <h3 class="text-gray-600 font-medium text-xl mb-2">No Attendance Records</h3>
            <p class="text-gray-500 text-sm font-normal leading-relaxed mb-4">
              {{ total === 0 ? 'No students found. Select class and section to view attendance records or start marking attendance for today.' : 'No students match your current filters. Try adjusting your search criteria.' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Attendance Table -->
    <div v-else-if="!loading && filteredStudents.length > 0" class="relative z-10 w-full">
      <div class="border border-gray-200 rounded-xl p-8 bg-white shadow-sm overflow-hidden">
        <!-- Table Container -->
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <!-- Table Header -->
            <thead class="bg-gradient-to-r from-indigo-50 to-purple-50">
              <tr>
                <th class="text-left py-2 px-2 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">#</th>
                <th class="text-left py-2 px-2 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Student</th>
                <th class="text-left py-2 px-2 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Roll No</th>
                <th class="text-left py-2 px-2 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Class</th>
                <th class="text-left py-2 px-2 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Section</th>
                <th class="text-left py-2 px-2 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Status</th>
                <th class="text-left py-2 px-2 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Time In</th>
                <th class="text-left py-2 px-2 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Remarks</th>
                <th v-if="selectedAttendanceType === 'subject'" class="text-left py-2 px-2 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Subject Attendance %</th>
                <th class="text-center py-2 px-2 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Actions</th>
              </tr>
            </thead>
            <!-- Table Body -->
            <tbody>
              <tr v-for="(student, index) in filteredStudents" :key="student.id" class="hover:bg-indigo-50 transition-colors border-b border-purple-200">
                <td class="py-2 px-2 text-gray-900 font-normal text-xs">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                <td class="py-2 px-2">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
                      {{ student.name.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ student.name }}</div>
                    </div>
                  </div>
                </td>
                <td class="py-2 px-2 text-gray-900 font-normal text-sm">{{ student.rollNumber }}</td>
                <td class="py-2 px-2 text-gray-900 font-normal text-sm">{{ student.class }}</td>
                <td class="py-2 px-2">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ student.section || 'N/A' }}
                  </span>
                </td>
                <td class="py-2 px-2">
                  <select v-model="student.status" class="text-xs border border-gray-200 rounded px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                    <option value="excused">Excused</option>
                  </select>
                </td>
                <td class="py-2 px-2 text-gray-900 font-normal text-sm">
                  <input v-model="student.timeIn" type="time" class="text-xs border border-gray-200 rounded px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                </td>
                <td class="py-2 px-2 text-gray-900 font-normal text-sm max-w-xs">
                  <input v-model="student.remarks" type="text" placeholder="Add remarks" class="text-xs border border-gray-200 rounded px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-32" />
                </td>
                <td v-if="selectedAttendanceType === 'subject'" class="py-2 px-2">
                  <span :class="getAttendancePercentageClass(student.attendancePercentage)" class="px-2 py-1 rounded-full text-xs font-medium">
                    {{ student.attendancePercentage || 0 }}%
                  </span>
                </td>
                <td class="py-2 px-2">
                  <div class="flex items-center justify-center gap-2">
                    <button 
                      @click="viewStudentDetails(student)"
                      class="px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:from-indigo-600 hover:to-blue-700"
                      title="View Details"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                      View
                    </button>
                    <button 
                      @click="editStudentAttendance(student)"
                      class="px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
                      title="Edit Attendance"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Bulk Actions and Save -->
        <div class="px-4 py-3 border-t border-gray-200 flex gap-3 flex-shrink-0">
          <button
            class="px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
            @click="markAllPresent"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Mark All Present
          </button>
          <button
            class="px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700"
            @click="markAllAbsent"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            Mark All Absent
          </button>
          <button
            class="ml-auto px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:from-indigo-600 hover:to-blue-700"
            @click="saveAttendance"
            :disabled="loading"
          >
            <svg v-if="loading" class="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
            </svg>
            {{ loading ? 'Saving...' : 'Save Attendance' }}
          </button>
        </div>
      </div>
      
      <!-- Pagination for Attendance -->
      <Pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        :show="!loading && filteredStudents.length > 0"
        @page-change="(page) => { currentPage = page; fetchStudents() }"
        @page-size-change="(size) => { pageSize = size; currentPage = 1; fetchStudents() }"
      />
    </div>

    <!-- Students Data Table -->
    <div v-else class="w-full">
      <div class="border border-gray-200 rounded-xl bg-white/40 shadow-sm overflow-hidden">
        <!-- Table Header -->
        <div class="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
          <h3 class="text-lg font-medium text-white">
            {{ selectedAttendanceType === 'subject' ? 'Subject Students List' : 'Class Students List' }}
          </h3>
          <p class="text-purple-100 text-sm mt-1">
            {{ selectedAttendanceType === 'subject' ? 'Students enrolled in selected subject' : 'Students in selected class and section' }}
          </p>
        </div>

        <!-- Table Content -->
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-white">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                                 <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                 <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance %</th>
                 <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Classes</th>
                 <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="student in filteredStudents" :key="student.id" class="hover:bg-white transition-colors">
                <td class="px-6 py-4 #ffffffspace-nowrap text-sm font-medium text-gray-900">
                  {{ student.rollNumber }}
                </td>
                <td class="px-6 py-4 #ffffffspace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                      {{ student.name.charAt(0) }}
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ student.name }}</div>
                      <div class="text-sm text-gray-500">Student ID: {{ student.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 #ffffffspace-nowrap text-sm text-gray-900">
                  {{ student.class }}
                </td>
                <td class="px-6 py-4 #ffffffspace-nowrap text-sm text-gray-900">
                  {{ student.section }}
                </td>
                                 <td class="px-6 py-4 #ffffffspace-nowrap">
                   <span :class="getStatusClass(student.status)" class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                     {{ student.status.replace('_', ' ').toUpperCase() }}
                   </span>
                 </td>
                 <td class="px-6 py-4 #ffffffspace-nowrap">
                   <div class="flex items-center">
                     <div class="w-full bg-white rounded-full h-2 mr-2">
                       <div :class="getAttendancePercentageClass(student.attendancePercentage)" 
                            class="h-2 rounded-full transition-all duration-300" 
                            :style="`width: ${student.attendancePercentage}%`">
                       </div>
                     </div>
                     <span class="text-sm font-medium text-gray-900">{{ student.attendancePercentage }}%</span>
                   </div>
                 </td>
                 <td class="px-6 py-4 #ffffffspace-nowrap text-sm text-gray-900">
                   <div class="text-center">
                     <div class="text-sm font-medium">{{ student.presentClasses }}/{{ student.totalClasses }}</div>
                     <div class="text-xs text-gray-500">Present/Total</div>
                   </div>
                 </td>
                <td class="px-6 py-4 #ffffffspace-nowrap text-sm font-medium space-x-2">
                  <button @click="viewStudentDetails(student)" class="text-indigo-600 hover:text-indigo-900 transition-colors">
                    View
                  </button>
                  <button @click="editStudentAttendance(student)" class="text-green-600 hover:text-green-900 transition-colors">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Table Footer with Pagination -->
        <div class="bg-white px-6 py-3">
          <!-- Info Row -->
          <div class="flex items-center justify-between mb-3">
            <div class="text-sm text-gray-900">
              Showing {{ paginationInfo.from }} to {{ paginationInfo.to }} of {{ paginationInfo.total }} students
            </div>
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-900">Total Present: {{ todayCount }}</span>
              <span class="text-sm text-gray-500">|</span>
              <span class="text-sm text-gray-900">Total: {{ paginationInfo.total }}</span>
              <span class="text-sm text-gray-500">|</span>
              <select v-model="pageSize" @change="changePageSize(pageSize)" class="text-sm border border-gray-200 rounded px-2 py-1">
                <option :value="5">5 per page</option>
                <option :value="10">10 per page</option>
                <option :value="20">20 per page</option>
                <option :value="50">50 per page</option>
              </select>
            </div>
          </div>
          
          <!-- Pagination Controls -->
          <div class="flex items-center justify-center space-x-2" v-if="totalPages > 1">
            <button @click="prevPage" :disabled="currentPage <= 1" 
                    class="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            
            <!-- Page Numbers -->
            <template v-for="page in getVisiblePages()" :key="page">
              <button v-if="page === '...'" disabled class="px-3 py-1 text-sm text-gray-500">...</button>
              <button v-else @click="goToPage(page)" 
                      :class="[
                        'px-3 py-1 text-sm border rounded-lg',
                        currentPage === page 
                          ? 'bg-purple-500 text-white border-purple-500' 
                          : 'border-gray-200 hover:bg-white'
                      ]">
                {{ page }}
              </button>
            </template>
            
            <button @click="nextPage" :disabled="currentPage >= totalPages" 
                    class="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mark Attendance Modal -->
    <div v-if="showMarkAttendanceModal" class="relative z-10" @click.self="showMarkAttendanceModal = false">
      <div class="w-full">
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-white">
              {{ selectedAttendanceType === 'subject' ? 'Mark Subject Attendance' : 'Mark Class Attendance' }} - {{ formatDate(selectedDate) }}
              <span v-if="selectedAttendanceType === 'subject' && selectedSubject.value" class="text-indigo-200 text-sm block">
                Subject: {{ subjectOptions.find(s => s.value == selectedSubject.value)?.label }}
              </span>
            </h3>
            <button @click="showMarkAttendanceModal = false" class="text-white hover:text-gray-500 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <!-- Subject-wise Attendance Info -->
          <div v-if="selectedAttendanceType === 'subject' && selectedSubject" class="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div class="flex items-center gap-2 text-blue-800">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              <span class="font-medium">Subject: {{ subjectOptions.find(s => s.value == selectedSubject)?.label }}</span>
              <span class="text-blue-600">| Subject-wise Attendance</span>
            </div>
          </div>
          
          <!-- Class-wise Attendance Info -->
          <div v-else-if="selectedAttendanceType === 'class'" class="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div class="flex items-center gap-2 text-green-800">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              <span class="font-medium">Class-wise Daily Attendance</span>
              <span class="text-green-600">| Full Day Marking</span>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead class="bg-white">
                <tr>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time In</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="student in students" :key="student.id" class="hover:bg-white">
                  <td class="px-4 py-2 text-sm text-gray-900">{{ student.rollNumber }}</td>
                  <td class="px-4 py-2">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                        {{ student.name.charAt(0) }}
                      </div>
                      <span class="text-sm text-gray-900">{{ student.name }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-2">
                    <select v-model="student.status" class="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option v-for="status in statusOptions" :key="status.value" :value="status.value">
                        {{ status.label }}
                      </option>
                    </select>
                  </td>
                  <td class="px-4 py-2">
                    <input v-model="student.timeIn" type="time" class="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  </td>
                  <td class="px-4 py-2">
                    <input v-model="student.remarks" type="text" placeholder="Optional remarks" class="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="bg-white px-6 py-4 flex justify-end gap-3">
          <button @click="showMarkAttendanceModal = false" class="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors">
            Cancel
          </button>
          <button @click="saveAttendance" class="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105">
            Save Attendance
          </button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import { ref, computed, onMounted, watch } from 'vue'
import api from '@/utils/axios'
import { Chart, registerables } from 'chart.js'
import CompactDatePicker from '@/components/CompactDatePicker.vue'
import TableLoader from '@/components/TableLoader.vue'
import Pagination from '@/components/Pagination.vue'
import { useAuthStore } from '@/stores/auth'

// Components are auto-registered with <script setup>

// Register Chart.js components safely
if (typeof Chart !== 'undefined' && registerables) {
  try {
    Chart.register(...registerables)
  } catch (error) {
    console.warn('Chart.js registration warning:', error)
  }
}

// State
const toast = useToast()
const authStore = useAuthStore()
const loading = ref(false)

// Get merchant_id from auth store
const getMerchantId = () => {
  const user = authStore.user
  if (!user) return null
  return user.merchant_id || user.admin?.merchant_id || null
}
const sessionOptions = ref([])
const classOptions = ref([])
const sectionOptions = ref([])
const students = ref([])
const selectedSession = ref('')
const selectedClass = ref('')
const selectedSection = ref('')
const selectedDate = ref(new Date().toISOString().split('T')[0])
const selectedStatus = ref('')
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const totalPages = ref(0)
const paginationInfo = ref({
  current_page: 1,
  per_page: 10,
  total: 0,
  last_page: 1,
  from: 0,
  to: 0
})
const showMarkAttendanceModal = ref(false)
const viewMode = ref('daily')
const todayCount = ref(0)
const monthlyCount = ref(0)

// New state for attendance type selection
const selectedAttendanceType = ref('')
const selectedSubject = ref('')
const selectedTeacher = ref('')
const selectedPeriod = ref('')
const subjectOptions = ref([])
const teacherOptions = ref([])
const todayStats = ref({
  present: 0,
  absent: 0,
  total: 0
})
const statusOptions = ref([
  { value: 'present', label: 'Present' },
  { value: 'absent', label: 'Absent' },
  { value: 'late', label: 'Late' },
  { value: 'leave', label: 'Leave' },
  { value: 'medical', label: 'Medical' },
  { value: 'online_present', label: 'Online Present' },
  { value: 'proxy_suspected', label: 'Proxy Suspected' }
])
const attendanceModes = ref([
  { value: 'daily', label: 'Daily Attendance' },
  { value: 'period_wise', label: 'Period-wise Attendance' }
])

// Reports state
const selectedReportType = ref('')
const reportFilters = ref({
  session_id: '',
  class_id: '',
  section_id: '',
  subject_id: '',
  date: new Date().toISOString().split('T')[0],
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  date_from: '',
  date_to: ''
})
const reportData = ref(null)
const reportLoading = ref(false)

// Helper data
const months = ref([
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' }
])

const years = ref([2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030])

// Chart refs
const dailyChart = ref(null)
const statusChart = ref(null)
const monthlyTrendChart = ref(null)
const performanceChart = ref(null)

// Methods
const selectAttendanceType = async (type) => {
  selectedAttendanceType.value = type
  
  // Load required data based on type
  if (type === 'subject') {
    fetchStatusOptions()
    fetchAttendanceModes()
  } else if (type === 'class') {
    fetchStatusOptions()
    fetchAttendanceModes()
  }
  
  // Ensure sessions and classes are loaded for attendance marking
  if (type === 'subject' || type === 'class') {
    // Load sessions if not already loaded
    if (sessionOptions.value.length === 0) {
      await fetchSessions()
    }
    
    // Load classes if not already loaded and we have sessions
    if (classOptions.value.length === 0 && sessionOptions.value.length > 0) {
      if (selectedSession.value) {
        await fetchClasses()
      } else {
        // Load all classes for better UX
        try {
          const allClassesResponse = await api.get('/classes')
          if (allClassesResponse.data.success && Array.isArray(allClassesResponse.data.result)) {
            classOptions.value = allClassesResponse.data.result.map(cls => ({
              value: cls.id,
              label: cls.name,
              session_id: cls.session_id
            }))
          }
        } catch (error) {
          // Silent fail
        }
      }
    }
  } else if (type === 'reports') {
    // Ensure sessions are loaded for reports
    if (sessionOptions.value.length === 0) {
      await fetchSessions()
    }
    
    // Load classes for reports if sessions are available
    if (sessionOptions.value.length > 0) {
      await fetchClassesForReports()
    }
  }
}

const goBack = () => {
  selectedAttendanceType.value = ''
  selectedReportType.value = ''
  reportData.value = null
  // Reset form data
  selectedSession.value = ''
  selectedClass.value = ''
  selectedSection.value = ''
  selectedSubject.value = ''
  selectedTeacher.value = ''
  selectedPeriod.value = ''
  students.value = []
  sessionOptions.value = []
  classOptions.value = []
  sectionOptions.value = []
  subjectOptions.value = []
  teacherOptions.value = []
}

// Fetch status options
const fetchStatusOptions = async () => {
  try {
    const response = await api.get('/attendance/status-options')
    if (response.data.success) {
      statusOptions.value = Object.entries(response.data.data).map(([key, value]) => ({
        value: key,
        label: value
      }))
    }
  } catch (error) {
    // Silent fail
  }
}

// Fetch attendance modes
const fetchAttendanceModes = async () => {
  try {
    const response = await api.get('/attendance/attendance-modes')
    if (response.data.success) {
      attendanceModes.value = Object.entries(response.data.data).map(([key, value]) => ({
        value: key,
        label: value
      }))
    }
  } catch (error) {
    // Silent fail
  }
}

// Fetch subjects for selected class
const fetchSubjectsForClass = async () => {
  const classId = selectedClass.value || reportFilters.value.class_id
  if (!classId) {
    subjectOptions.value = []
    return
  }
  
  try {
    const merchantId = getMerchantId()
    const params = merchantId ? { merchant_id: merchantId } : {}
    
    const response = await api.get(`/attendance/class/${classId}/subjects`, { params })
    if (response.data.success) {
      subjectOptions.value = response.data.data.map(subject => ({
        value: subject.id,
        label: subject.name
      }))
    }
  } catch (error) {
    // Silent fail
  }
}

// Fetch teachers for selected subject
const fetchTeachersForSubject = async () => {
  if (!selectedSubject.value) {
    teacherOptions.value = []
    return
  }
  
  try {
    const merchantId = getMerchantId()
    const params = merchantId ? { merchant_id: merchantId } : {}
    
    const response = await api.get(`/attendance/subject/${selectedSubject.value}/teachers`, { params })
    if (response.data.success) {
      teacherOptions.value = response.data.data.map(teacher => ({
        value: teacher.id,
        label: teacher.full_name || `${teacher.first_name} ${teacher.last_name}`
      }))
    }
  } catch (error) {
    // Silent fail
  }
}

// Reports Methods
const generateReport = async () => {
  if (!selectedReportType.value) {
    alert('Please select a report type')
    return
  }

  reportLoading.value = true
  try {
    let endpoint = ''
    let params = { ...reportFilters.value }

    // Add current date/month/year if not provided
    if (!params.date && ['daily'].includes(selectedReportType.value)) {
      params.date = new Date().toISOString().split('T')[0]
    }
    
    if (!params.month && ['monthly', 'subject', 'comparison'].includes(selectedReportType.value)) {
      params.month = new Date().getMonth() + 1
    }
    
    if (!params.year && ['monthly', 'subject', 'comparison'].includes(selectedReportType.value)) {
      params.year = new Date().getFullYear()
    }

    switch (selectedReportType.value) {
      case 'daily':
        endpoint = '/attendance-reports/daily-sheet'
        if (!params.class_id || !params.section_id) {
          alert('Please select class and section for daily report')
          return
        }
        break
      case 'monthly':
        endpoint = '/attendance-reports/monthly-summary'
        break
      case 'subject':
        endpoint = '/attendance-reports/subject-wise'
        if (!params.class_id || !params.section_id) {
          alert('Please select class and section for subject-wise report')
          return
        }
        break
      case 'trends':
        endpoint = '/attendance-reports/trends'
        // Set default date range if not provided
        if (!params.date_from || !params.date_to) {
          const today = new Date()
          const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
          params.date_from = lastMonth.toISOString().split('T')[0]
          params.date_to = today.toISOString().split('T')[0]
        }
        break
      case 'defaulters':
        const response = await api.get('/attendance/defaulters', { params })
        reportData.value = response.data
        return
      case 'comparison':
        endpoint = '/attendance-reports/class-comparison'
        break
      default:
        alert('Invalid report type')
        return
    }

            const response = await api.post(endpoint, params)
    if (response.data.success) {
      reportData.value = response.data
      
      // Create charts after data is loaded
      setTimeout(() => {
        if (selectedReportType.value === 'daily') {
          createDailyChart()
          createStatusChart()
        } else if (selectedReportType.value === 'monthly') {
          createMonthlyTrendChart()
          createPerformanceChart()
        }
      }, 100)
    } else {
      throw new Error(response.data.message || 'Failed to generate report')
    }
  } catch (error) {
    alert('Failed to generate report: ' + (error.response?.data?.message || error.message))
  } finally {
    reportLoading.value = false
  }
}

const exportReport = async () => {
  if (!reportData.value) {
    alert('Please generate a report first')
    return
  }

  try {
    const params = {
      ...reportFilters.value,
      report_type: selectedReportType.value,
      format: 'pdf'
    }

    const response = await api.post('/attendance-reports/export', params)
    if (response.data.success) {
      alert('Report export prepared successfully!')
    }
  } catch (error) {
    alert('Failed to export report')
  }
}

// Chart creation methods
const createDailyChart = () => {
  if (!dailyChart.value || !reportData.value?.data?.summary) return

  const ctx = dailyChart.value.getContext('2d')
  const summary = reportData.value.data.summary

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Present', 'Absent', 'Late', 'Leave'],
      datasets: [{
        data: [
          summary.present || 0,
          summary.absent || 0,
          summary.late || 0,
          summary.leave || 0
        ],
        backgroundColor: [
          '#10B981',
          '#EF4444',
          '#F59E0B',
          '#6366F1'
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            font: {
              size: 12
            }
          }
        }
      }
    }
  })
}

const createStatusChart = () => {
  if (!statusChart.value || !reportData.value?.data?.summary) return

  const ctx = statusChart.value.getContext('2d')
  const summary = reportData.value.data.summary

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Present', 'Absent', 'Late', 'Leave'],
      datasets: [{
        label: 'Students',
        data: [
          summary.present || 0,
          summary.absent || 0,
          summary.late || 0,
          summary.leave || 0
        ],
        backgroundColor: [
          '#10B981',
          '#EF4444',
          '#F59E0B',
          '#6366F1'
        ],
        borderRadius: 8,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  })
}

const createMonthlyTrendChart = () => {
  if (!monthlyTrendChart.value || !reportData.value?.data?.overall_stats) return

  const ctx = monthlyTrendChart.value.getContext('2d')
  const stats = reportData.value.data.overall_stats

  // Generate dynamic weekly data or use available data
  const weeklyData = reportData.value.data.weekly_trends || [
    { week: 'Week 1', percentage: 85 },
    { week: 'Week 2', percentage: 88 },
    { week: 'Week 3', percentage: 82 },
    { week: 'Week 4', percentage: 90 }
  ]

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: weeklyData.map(w => w.week || w.label),
      datasets: [{
        label: 'Attendance %',
        data: weeklyData.map(w => w.percentage || w.value || 0),
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: function(value) {
              return value + '%'
            }
          }
        }
      }
    }
  })
}

const createPerformanceChart = () => {
  if (!performanceChart.value || !reportData.value?.data?.overall_stats) return

  const ctx = performanceChart.value.getContext('2d')
  const stats = reportData.value.data.overall_stats

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Excellent (90-100%)', 'Good (75-89%)', 'Average (60-74%)', 'Poor (<60%)'],
      datasets: [{
        data: [
          stats.excellent_attendance || 0,
          stats.good_attendance || 0,
          stats.average_attendance || 0,
          stats.poor_attendance || 0
        ],
        backgroundColor: [
          '#059669',
          '#10B981',
          '#F59E0B',
          '#EF4444'
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: {
              size: 11
            }
          }
        }
      }
    }
  })
}

const getReportTitle = () => {
  const titles = {
    daily: 'Daily Attendance Sheet',
    monthly: 'Monthly Attendance Summary',
    subject: 'Subject-wise Attendance Report',
    trends: 'Attendance Trends & Analytics',
    defaulters: 'Defaulters List',
    comparison: 'Class Comparison Report'
  }
  return titles[selectedReportType.value] || 'Attendance Report'
}

const getReportSubtitle = () => {
  const filters = reportFilters.value
  let subtitle = ''
  
  if (filters.class_id && classOptions.value.length > 0) {
    const className = classOptions.value.find(c => c.value == filters.class_id)?.label
    subtitle += className ? `Class: ${className}` : ''
  }
  
  if (filters.section_id && sectionOptions.value.length > 0) {
    const sectionName = sectionOptions.value.find(s => s.value == filters.section_id)?.label
    subtitle += sectionName ? ` | Section: ${sectionName}` : ''
  }
  
  if (selectedReportType.value === 'daily' && filters.date) {
    subtitle += ` | Date: ${formatDate(filters.date)}`
  }
  
  if (['monthly', 'subject', 'comparison'].includes(selectedReportType.value)) {
    const monthName = months.value.find(m => m.value == filters.month)?.label
    subtitle += ` | ${monthName} ${filters.year}`
  }
  
  return subtitle || 'Generated on ' + new Date().toLocaleDateString()
}

const getReportComponent = () => {
  return 'div'
}

const getAttendancePercentageClass = (percentage) => {
  if (percentage >= 90) return 'bg-green-500'
  if (percentage >= 75) return 'bg-yellow-500'
  if (percentage >= 60) return 'bg-orange-500'
  return 'bg-red-500'
}

const setViewMode = (mode) => {
  viewMode.value = mode
}

const fetchSessions = async () => {
  try {
    const response = await api.get('/sessions/select-options')
    
    if (response.data.success && Array.isArray(response.data.result)) {
      sessionOptions.value = response.data.result.map(session => ({
        value: session.id,
        label: session.name
      }))
    }
  } catch (error) {
    // Fallback to main sessions endpoint
    try {
      const fallbackResponse = await api.get('/sessions')
      
      if (fallbackResponse.data.success && Array.isArray(fallbackResponse.data.result)) {
        sessionOptions.value = fallbackResponse.data.result.map(session => ({
          value: session.id,
          label: session.name
        }))
      }
    } catch (fallbackError) {
      // Silent fail - sessions will remain empty
    }
  }
}

const fetchClasses = async () => {
  if (!selectedSession.value) {
    classOptions.value = []
    return
  }
  
  try {
    const merchantId = getMerchantId()
    const params = { session_id: selectedSession.value }
    if (merchantId) {
      params.merchant_id = merchantId
    }
    
    const response = await api.get('/classes', { params })
    
    if (response.data.success && Array.isArray(response.data.result)) {
      classOptions.value = response.data.result.map(cls => ({
        value: cls.id,
        label: cls.name
      }))
    } else {
      classOptions.value = []
    }
  } catch (error) {
    classOptions.value = []
  }
}

const fetchSections = async () => {
  if (!selectedClass.value) {
    sectionOptions.value = []
    return
  }
  
  try {
    const merchantId = getMerchantId()
    const params = { class_id: selectedClass.value }
    if (merchantId) {
      params.merchant_id = merchantId
    }
    
    const response = await api.get('/sections/select-options', { params })
    
    if (response.data.success && Array.isArray(response.data.result)) {
      sectionOptions.value = response.data.result.map(sec => ({
        value: sec.id,
        label: sec.name
      }))
    } else {
      sectionOptions.value = []
    }
  } catch (error) {
    // Fallback to main sections endpoint
    try {
      const merchantId = getMerchantId()
      const params = { class_id: selectedClass.value }
      if (merchantId) {
        params.merchant_id = merchantId
      }
      
      const fallbackResponse = await api.get('/sections', { params })
      
      if (fallbackResponse.data.success && Array.isArray(fallbackResponse.data.result)) {
        sectionOptions.value = fallbackResponse.data.result.map(sec => ({
          value: sec.id,
          label: sec.name
        }))
      } else {
        sectionOptions.value = []
      }
    } catch (fallbackError) {
      sectionOptions.value = []
    }
  }
}

const fetchStudents = async (page = 1) => {
  // Load dependent dropdowns if needed (only when Search is clicked)
  if (selectedSession.value && classOptions.value.length === 0) {
    await fetchClasses()
  }
  
  if (selectedClass.value && sectionOptions.value.length === 0) {
    await fetchSections()
  }
  
  if (selectedAttendanceType.value === 'subject' && selectedSubject.value && teacherOptions.value.length === 0) {
    await fetchTeachersForSubject()
  }
  
  // Basic validation - at least class and section required
  if (!selectedClass.value || !selectedSection.value) {
    students.value = []
    paginationInfo.value = {
      current_page: 1,
      per_page: 10,
      total: 0,
      last_page: 1,
      from: 0,
      to: 0
    }
    return
  }
  
  // Additional validation for subject-wise attendance
  if (selectedAttendanceType.value === 'subject') {
    if (!selectedSubject.value) {
      students.value = []
      return
    }
  }
  
  loading.value = true
  
  try {
    // Get merchant_id for scoping
    const merchantId = getMerchantId()
    
    // Use new comprehensive attendance API with pagination
    const params = {
      class_id: selectedClass.value,
      section_id: selectedSection.value,
      date: selectedDate.value,
      attendance_mode: selectedAttendanceType.value === 'subject' ? 'period_wise' : 'daily',
      page: page,
      per_page: pageSize.value,
      search: searchQuery.value || ''
    }
    
    // Always include merchant_id for proper scoping
    if (merchantId) {
      params.merchant_id = merchantId
    }
    
    // Add optional session filter
    if (selectedSession.value) {
      params.session_id = selectedSession.value
    }
    
    // Add subject-specific params
    if (selectedAttendanceType.value === 'subject' && selectedSubject.value) {
      params.subject_id = selectedSubject.value
    }
    
    const response = await api.get('/attendance/students-paginated', { params })
    
    if (response.data.success) {
      const result = response.data.result
      
      // Handle Laravel pagination response
      if (result.data && Array.isArray(result.data)) {
        students.value = result.data.map(s => ({
          id: s.id,
          name: `${s.first_name} ${s.last_name}`,
          rollNumber: s.roll_number,
          class: s.class?.name || '',
          section: s.section?.name || '',
          date: selectedDate.value,
          status: s.attendance_status || 'not_marked',
          timeIn: s.time_in || '',
          timeOut: s.time_out || '',
          remarks: s.remarks || '',
          isMarked: s.is_marked || false,
          attendancePercentage: s.attendance_percentage || 0,
          totalClasses: s.total_classes || 0,
          presentClasses: s.present_classes || 0
        }))
        
        // Update pagination info from Laravel response
        paginationInfo.value = {
          current_page: result.current_page,
          per_page: result.per_page,
          total: result.total,
          last_page: result.last_page,
          from: result.from,
          to: result.to
        }
        
        currentPage.value = result.current_page
        total.value = result.total
        totalPages.value = result.last_page
        
      } else if (Array.isArray(result)) {
        // Handle non-paginated array response
        students.value = result.map(s => ({
          id: s.id,
          name: `${s.first_name} ${s.last_name}`,
          rollNumber: s.roll_number,
          class: s.class?.name || '',
          section: s.section?.name || '',
          date: selectedDate.value,
          status: s.attendance_status || 'not_marked',
          timeIn: s.time_in || '',
          timeOut: s.time_out || '',
          remarks: s.remarks || '',
          isMarked: s.is_marked || false,
          attendancePercentage: s.attendance_percentage || 0,
          totalClasses: s.total_classes || 0,
          presentClasses: s.present_classes || 0
        }))
        
        total.value = students.value.length
        totalPages.value = 1
      }
      
      todayCount.value = students.value.filter(s => s.status === 'present').length
      monthlyCount.value = total.value
      
    } else {
      students.value = []
    }
  } catch (error) {
    students.value = []
    
    // Fallback to simple student listing
    try {
      const fallbackParams = {
        class_id: selectedClass.value,
        section_id: selectedSection.value,
        page: page,
        per_page: pageSize.value,
        search: searchQuery.value
      }
      
      if (selectedSession.value) {
        fallbackParams.session_id = selectedSession.value
      }
      
      const response = await api.get('/students', { params: fallbackParams })
      
      const result = response.data.result || response.data
      const studentData = result?.data || result || []
      
      if (Array.isArray(studentData)) {
        students.value = studentData.map(s => ({
          id: s.id,
          name: `${s.first_name} ${s.last_name}`,
          rollNumber: s.roll_number,
          class: s.class?.name || '',
          section: s.section?.name || '',
          date: selectedDate.value,
          status: 'not_marked', // Default status for fallback
          timeIn: '',
          timeOut: '',
          remarks: '',
          isMarked: false,
          attendancePercentage: 0,
          totalClasses: 0,
          presentClasses: 0
        }))
        
        // Handle pagination from fallback API
        if (result?.current_page) {
          paginationInfo.value = {
            current_page: result.current_page,
            per_page: result.per_page,
            total: result.total,
            last_page: result.last_page,
            from: result.from,
            to: result.to
          }
          currentPage.value = result.current_page
          total.value = result.total
          totalPages.value = result.last_page
        } else {
          total.value = students.value.length
          totalPages.value = 1
        }
      }
      
      todayCount.value = students.value.length
      monthlyCount.value = total.value
    } catch (fallbackError) {
      // Silent fail
    }
  } finally {
    loading.value = false
  }
}

const filteredStudents = computed(() => {
  // Since we're using server-side pagination, just return students
  return students.value
})

const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'present':
      return 'bg-green-100 text-green-800'
    case 'absent':
      return 'bg-red-100 text-red-800'
    case 'late':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-white text-gray-900'
  }
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('en-GB')
}

const handleFilter = () => {
  currentPage.value = 1
  fetchStudents(1)
}

// Handle Search button click - reset to page 1 and apply filters
const handleSearch = () => {
  currentPage.value = 1
  fetchStudents(1)
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    fetchStudents(page)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    goToPage(currentPage.value + 1)
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1)
  }
}

const changePageSize = (newSize) => {
  pageSize.value = newSize
  currentPage.value = 1
  fetchStudents(1)
}

const getVisiblePages = () => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    // Show all pages if total is small
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Show first page
    pages.push(1)
    
    if (current > 4) {
      pages.push('...')
    }
    
    // Show pages around current
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (current < total - 3) {
      pages.push('...')
    }
    
    // Show last page
    if (total > 1) {
      pages.push(total)
    }
  }
  
  return pages
}

const handleEdit = (student) => {
  // Implement edit functionality
}

const handleDelete = (student) => {
  if (confirm(`Are you sure you want to delete attendance record for ${student.name}?`)) {
    // Implement delete functionality
  }
}



const viewStudentDetails = (student) => {
  // Implement view student details functionality
}

const editStudentAttendance = (student) => {
  // Implement edit attendance functionality
}

const onSessionChange = () => {
  // Reset dependent dropdowns when session changes
  reportFilters.value.class_id = ''
  reportFilters.value.section_id = ''
  classOptions.value = []
  sectionOptions.value = []
  
  // Load classes for selected session
  if (reportFilters.value.session_id) {
    fetchClassesForReports()
  }
}

const fetchClassesForReports = async () => {
  if (!reportFilters.value.session_id) return
  
  try {
    const merchantId = getMerchantId()
    const params = { session_id: reportFilters.value.session_id }
    if (merchantId) {
      params.merchant_id = merchantId
    }
    
    const response = await api.get('/classes', { params })
    if (response.data.success && Array.isArray(response.data.result)) {
      classOptions.value = response.data.result.map(cls => ({
        value: cls.id,
        label: cls.name
      }))
    }
  } catch (error) {
    // Silent fail
  }
}

const onSectionChange = () => {
  // Load section-specific data when section changes
  if (reportFilters.value.section_id) {
    // Fetch section-specific stats or filters
    loadSectionStats()
  }
}

const loadSectionStats = async () => {
  if (!reportFilters.value.section_id) return
  
  try {
    const response = await api.get(`/attendance/section/${reportFilters.value.section_id}/stats`)
    if (response.data.success) {
      // Update UI with section-specific data
    }
  } catch (error) {
    // Silent fail
  }
}

const markAllPresent = () => {
  const currentTime = new Date().toTimeString().slice(0, 5)
  students.value.forEach(student => {
    student.status = 'present'
    if (!student.timeIn) {
      student.timeIn = currentTime
    }
  })
  // Show success message
  alert(`Marked all ${students.value.length} students as present with time ${currentTime}`)
}

const markAllAbsent = () => {
  students.value.forEach(student => {
    student.status = 'absent'
    student.timeIn = ''
    student.remarks = ''
  })
  // Show success message  
  alert(`Marked all ${students.value.length} students as absent`)
}

const clearFilters = () => {
  // Reset all filter values
  searchQuery.value = ''
  selectedSession.value = ''
  selectedClass.value = ''
  selectedSection.value = ''
  selectedSubject.value = ''
  selectedTeacher.value = ''
  selectedPeriod.value = ''
  selectedDate.value = new Date().toISOString().split('T')[0]
  selectedStatus.value = ''
  
  // Clear dependent data
  classOptions.value = []
  sectionOptions.value = []
  subjectOptions.value = []
  teacherOptions.value = []
  students.value = []
  filteredStudents.value = []
  
  // Reset pagination
  currentPage.value = 1
  total.value = 0
  totalPages.value = 0
  paginationInfo.value = {
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 1,
    from: 0,
    to: 0
  }
  
  // Note: We don't auto-fetch after clear - user must select filters and click Search
  // This ensures clear truly resets everything without unexpected data loads
}

const saveAttendance = async () => {
  try {
    loading.value = true
    
    // Validation for subject-wise attendance
    if (selectedAttendanceType.value === 'subject') {
      if (!selectedSubject.value) {
        alert('Please select subject for subject-wise attendance')
        return
      }
    }
    
    const attendanceData = {
      class_id: selectedClass.value,
      section_id: selectedSection.value,
      date: selectedDate.value,
      attendance_mode: selectedAttendanceType.value === 'subject' ? 'period_wise' : 'daily',
      attendances: students.value.map(s => ({
        student_id: s.id,
        status: s.status,
        time_in: s.timeIn,
        time_out: s.timeOut,
        remarks: s.remarks
      }))
    }
    
    let endpoint = '/attendance/mark-daily'
    
    // Use period-wise endpoint for subject attendance
    if (selectedAttendanceType.value === 'subject') {
      endpoint = '/attendance/mark-period'
      attendanceData.subject_id = selectedSubject.value
      attendanceData.teacher_id = selectedTeacher.value
      attendanceData.period_number = selectedPeriod.value || 1
    }
    
    const response = await api.post(endpoint, attendanceData)
    
    if (response.data.success) {
      alert('Attendance saved successfully!')
      // Refresh students data to show updated attendance
      await fetchStudents()
    } else {
      throw new Error(response.data.message || 'Failed to save attendance')
    }
  } catch (error) {
    alert('Failed to save attendance: ' + (error.response?.data?.message || error.message))
  } finally {
    loading.value = false
  }
}

// Watchers
// Watchers for populating dependent dropdowns (but NOT auto-fetching students)
// Students are only fetched when Search button is clicked
watch(selectedSession, (newSessionId) => {
  // Clear dependent filters when session changes
  selectedClass.value = ''
  selectedSection.value = ''
  classOptions.value = []
  sectionOptions.value = []
  // Don't clear students - let user click Search to fetch
  if (newSessionId) {
    fetchClasses() // Populate classes dropdown
  }
})

watch(selectedClass, (newClassId) => {
  // Clear dependent filters when class changes
  selectedSection.value = ''
  sectionOptions.value = []
  // Don't clear students - let user click Search to fetch
  if (newClassId) {
    fetchSections() // Populate sections dropdown
    if (selectedAttendanceType.value === 'subject') {
      fetchSubjectsForClass() // Populate subjects dropdown
    }
  }
})

watch(selectedSubject, () => {
  // Populate teachers when subject changes
  if (selectedSubject.value) {
    fetchTeachersForSubject()
  }
})

// Removed auto-fetch watchers - students only fetched on Search button click
// watch([selectedSession, selectedClass, selectedSection], ...) - removed
// watch([selectedDate, selectedSubject], ...) - removed

// Watch for reports filters
watch(() => reportFilters.value.session_id, (newSessionId, oldSessionId) => {
  if (newSessionId !== oldSessionId) {
    // Reset dependent dropdowns
    reportFilters.value.class_id = ''
    reportFilters.value.section_id = ''
    classOptions.value = []
    sectionOptions.value = []
    
    // Load classes for selected session
    if (newSessionId) {
      fetchClassesForReports()
    }
  }
})

watch(() => reportFilters.value.class_id, (newClassId, oldClassId) => {
  if (newClassId !== oldClassId) {
    // Reset dependent dropdowns
    reportFilters.value.section_id = ''
    sectionOptions.value = []
    
    // Load sections for selected class
    if (newClassId) {
      fetchSectionsForReports()
      if (selectedAttendanceType.value === 'reports') {
        fetchSubjectsForClass()
      }
    }
  }
})

watch(() => reportFilters.value.section_id, (newSectionId) => {
  if (newSectionId && selectedAttendanceType.value === 'reports') {
    loadSectionStats()
  }
})

const fetchSectionsForReports = async () => {
  if (!reportFilters.value.class_id) {
    sectionOptions.value = []
    return
  }
  
  try {
    const merchantId = getMerchantId()
    const params = { class_id: reportFilters.value.class_id }
    if (merchantId) {
      params.merchant_id = merchantId
    }
    
    const response = await api.get('/sections/select-options', { params })
    
    if (response.data.success && Array.isArray(response.data.result)) {
      sectionOptions.value = response.data.result.map(sec => ({
        value: sec.id,
        label: sec.name
      }))
    } else {
      sectionOptions.value = []
    }
  } catch (error) {
    sectionOptions.value = []
  }
}

// Watch for search query changes
watch(searchQuery, (newQuery) => {
  // Debounce search to avoid too many API calls
  clearTimeout(searchTimeout.value)
  searchTimeout.value = setTimeout(() => {
    currentPage.value = 1
    fetchStudents(1)
  }, 500)
})

const searchTimeout = ref(null)
const pageInput = ref(1)

// Load today's stats
const loadTodayStats = async () => {
  try {
    const response = await api.get('/attendance/stats')
    if (response.data.success) {
      todayStats.value = {
        present: response.data.data.today_present || 0,
        absent: response.data.data.today_absent || 0,
        total: response.data.data.today_total || 0
      }
    }
  } catch (error) {
    // Fallback to zero values if API call fails
    todayStats.value = {
      present: 0,
      absent: 0,
      total: 0
    }
  }
}

// Lifecycle
onMounted(async () => {
  await fetchSessions()
  loadTodayStats()
  
  // Load initial data for reports
  if (selectedAttendanceType.value === 'reports') {
    fetchClassesForReports()
  }
  
  // Load all available data for better UX
  try {
    const allClassesResponse = await api.get('/classes')
    
    if (allClassesResponse.data.success && Array.isArray(allClassesResponse.data.result)) {
      // Store all classes as backup
      const allClasses = allClassesResponse.data.result.map(cls => ({
        value: cls.id,
        label: cls.name,
        session_id: cls.session_id
      }))
      
      // If no session selected but we have classes, populate classOptions
      if (!selectedSession.value && allClasses.length > 0) {
        classOptions.value = allClasses
      }
    }
  } catch (error) {
    // Silent fail
  }
  
  // Load all sections for better UX
  try {
    const allSectionsResponse = await api.get('/sections')
    
    if (allSectionsResponse.data.success && Array.isArray(allSectionsResponse.data.result)) {
      // Store all sections as backup
      const allSections = allSectionsResponse.data.result.map(sec => ({
        value: sec.id,
        label: sec.name,
        class_id: sec.class_id
      }))
      
      // If no class selected but we have sections, populate sectionOptions
      if (!selectedClass.value && allSections.length > 0) {
        sectionOptions.value = allSections
      }
    }
  } catch (error) {
    // Silent fail
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

* {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3 {
  letter-spacing: -0.025em;
  font-weight: 600;
}

p {
  line-height: 1.6;
}

input, select, button, textarea {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  transition: all 0.15s ease-in-out;
}

input:focus, select:focus {
  outline: none;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}

button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(241, 245, 249, 0.5);
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #c084fc, #a855f7);
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #a855f7, #9333ea);
}

.hover\:shadow-lg:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Custom animations */
@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style> 