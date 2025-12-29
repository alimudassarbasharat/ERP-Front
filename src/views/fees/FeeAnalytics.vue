<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
    <!-- Header Section -->
    <div class="w-full max-w-7xl mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
      <h2 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        Fee Analytics Dashboard
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Fee Management</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">Analytics</span>
      </nav>
    </div>

    <!-- Quick Stats Cards - Compact Design -->
    <div class="w-full max-w-7xl mx-auto mb-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <!-- Total Revenue Card -->
        <div class="relative overflow-hidden rounded-xl border border-gray-200/80 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-[10px] sm:text-xs font-semibold text-gray-500 tracking-wide uppercase mb-1">Total Revenue</p>
              <p class="text-base sm:text-lg font-black text-gray-900 tracking-tight mb-1.5">{{ formatCurrency(totalRevenue) }}</p>
              <div class="flex items-center gap-1.5">
                <span class="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">+12.5%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Pending Amount Card -->
        <div class="relative overflow-hidden rounded-xl border border-gray-200/80 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-[10px] sm:text-xs font-semibold text-gray-500 tracking-wide uppercase mb-1">Pending Amount</p>
              <p class="text-base sm:text-lg font-black text-gray-900 tracking-tight mb-1.5">{{ formatCurrency(pendingAmount) }}</p>
              <div class="flex items-center gap-1.5">
                <span class="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">-5.2%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Collection Rate Card -->
        <div class="relative overflow-hidden rounded-xl border border-gray-200/80 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-[10px] sm:text-xs font-semibold text-gray-500 tracking-wide uppercase mb-1">Collection Rate</p>
              <p class="text-base sm:text-lg font-black text-gray-900 tracking-tight mb-1.5">{{ collectionRate }}%</p>
              <div class="flex items-center gap-1.5">
                <span class="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">+8.3%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Total Classes Card -->
        <div class="relative overflow-hidden rounded-xl border border-gray-200/80 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-[10px] sm:text-xs font-semibold text-gray-500 tracking-wide uppercase mb-1">Total Classes</p>
              <p class="text-base sm:text-lg font-black text-gray-900 tracking-tight mb-1.5">{{ statsLoading ? '...' : statistics.classes }}</p>
              <div class="flex items-center gap-1.5">
                <span class="text-[10px] font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">+3.7%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Analytics Menu Cards -->
    <div class="w-full">
      <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
        Analytics Categories
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Fee Breakdown Analysis -->
        <div 
          @click="navigateToSection('breakdown')" 
          class="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 bg-gradient-to-r from-green-100 to-green-200 rounded-xl flex items-center justify-center group-hover:from-green-500 group-hover:to-green-600 transition-all duration-300">
              <svg class="w-7 h-7 text-green-600 group-hover:text-white transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
            </div>
            <svg class="w-5 h-5 text-gray-500 group-hover:text-green-500 transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-all duration-300">Detailed Fee Breakdown</h3>
          <p class="text-sm text-gray-600 mb-4">Comprehensive analysis of tuition, library, lab, hostel and transport fees</p>
          <div class="flex flex-wrap gap-2">
            <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Tuition Fees</span>
            <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Lab Charges</span>
            <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Hostel Fees</span>
          </div>
        </div>

        <!-- Payment Analysis -->
        <div 
          @click="navigateToSection('payment-analysis')" 
          class="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover:from-purple-500 group-hover:to-purple-600 transition-all duration-300">
              <svg class="w-7 h-7 text-purple-600 group-hover:text-white transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
            <svg class="w-5 h-5 text-gray-500 group-hover:text-purple-500 transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-all duration-300">Payment Analysis</h3>
          <p class="text-sm text-gray-600 mb-4">Payment trends, comparison analysis, and payment method distribution</p>
          <div class="flex flex-wrap gap-2">
            <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Trends</span>
            <span class="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">Comparisons</span>
            <span class="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">Late Payments</span>
          </div>
        </div>

        <!-- Graphical Reports -->
        <div 
          @click="navigateToSection('charts')" 
          class="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center group-hover:from-indigo-500 group-hover:to-indigo-600 transition-all duration-300">
              <svg class="w-7 h-7 text-indigo-600 group-hover:text-white transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
            <svg class="w-5 h-5 text-gray-500 group-hover:text-indigo-500 transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-all duration-300">Graphical Reports</h3>
          <p class="text-sm text-gray-600 mb-4">Interactive charts, pie graphs, bar charts and visual analytics</p>
          <div class="flex flex-wrap gap-2">
            <span class="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">Pie Charts</span>
            <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Bar Graphs</span>
            <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Line Charts</span>
          </div>
        </div>

        <!-- Export & Reports -->
        <div 
          @click="navigateToSection('exports')" 
          class="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:from-orange-500 group-hover:to-orange-600 transition-all duration-300">
              <svg class="w-7 h-7 text-orange-600 group-hover:text-white transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <svg class="w-5 h-5 text-gray-500 group-hover:text-orange-500 transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-all duration-300">Export & Reports</h3>
          <p class="text-sm text-gray-600 mb-4">Generate receipts, export to Excel/PDF and print summary reports</p>
          <div class="flex flex-wrap gap-2">
            <span class="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Excel Export</span>
            <span class="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">PDF Reports</span>
            <span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Receipts</span>
          </div>
        </div>

        <!-- Notifications & Alerts -->
        <div 
          @click="navigateToSection('notifications')" 
          class="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center group-hover:from-yellow-500 group-hover:to-yellow-600 transition-all duration-300">
              <svg class="w-7 h-7 text-yellow-600 group-hover:text-white transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-5 5v-5zM12 17H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <svg class="w-5 h-5 text-gray-500 group-hover:text-yellow-500 transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-all duration-300">Notifications & Alerts</h3>
          <p class="text-sm text-gray-600 mb-4">Due date alerts, payment reminders and confirmation notifications</p>
          <div class="flex flex-wrap gap-2">
            <span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Due Alerts</span>
            <span class="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Reminders</span>
            <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Confirmations</span>
          </div>
        </div>

        <!-- Discounts & Scholarships -->
        <div 
          @click="navigateToSection('discounts')" 
          class="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 bg-gradient-to-r from-rose-100 to-rose-200 rounded-xl flex items-center justify-center group-hover:from-rose-500 group-hover:to-rose-600 transition-all duration-300">
              <svg class="w-7 h-7 text-rose-600 group-hover:text-white transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
              </svg>
            </div>
            <svg class="w-5 h-5 text-gray-500 group-hover:text-rose-500 transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-all duration-300">Discounts & Scholarships</h3>
          <p class="text-sm text-gray-600 mb-4">Fee concessions, scholarship details and special discount analysis</p>
          <div class="flex flex-wrap gap-2">
            <span class="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full">Scholarships</span>
            <span class="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">Concessions</span>
            <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Discounts</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity Section -->
    <div class="w-full">
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-900 flex items-center gap-3">
            <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            Recent Activity
          </h2>
          <button class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105">
            View All
          </button>
        </div>
        
        <div class="space-y-4">
          <div v-for="(activity, index) in recentActivities" :key="index" class="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:bg-white transition-all duration-200">
            <div :class="[
              'w-10 h-10 rounded-full flex items-center justify-center',
              activity.type === 'payment' ? 'bg-green-100' : 
              activity.type === 'due' ? 'bg-red-100' : 'bg-blue-100'
            ]">
              <svg class="w-5 h-5" :class="[
                activity.type === 'payment' ? 'text-green-600' : 
                activity.type === 'due' ? 'text-red-600' : 'text-blue-600'
              ]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path v-if="activity.type === 'payment'" stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                <path v-else-if="activity.type === 'due'" stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                <path v-else stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="flex-1">
              <h4 class="font-semibold text-gray-900 text-sm">{{ activity.title }}</h4>
              <p class="text-gray-600 text-xs">{{ activity.description }}</p>
            </div>
            <div class="text-right">
              <div class="text-xs text-gray-500">{{ activity.time }}</div>
              <div v-if="activity.amount" class="text-sm font-semibold" :class="[
                activity.type === 'payment' ? 'text-green-600' : 'text-red-600'
              ]">{{ formatCurrency(activity.amount) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useStatistics } from '@/composables/useStatistics'

const router = useRouter()
const toast = useToast()

// Use statistics composable
const { statistics, loading: statsLoading, error: statsError } = useStatistics()

// Sample data - replace with real API calls
const totalRevenue = ref(2500000)
const collectedAmount = ref(2100000)
const pendingAmount = ref(400000)

const recentActivities = ref([
  {
    type: 'payment',
    title: 'Fee Payment Received',
    description: 'Ahmad Ali - Class 10-A - Monthly Fee',
    time: '2 hours ago',
    amount: 5000
  },
  {
    type: 'due',
    title: 'Payment Due Alert',
    description: 'Sara Khan - Class 9-B - Monthly Fee Due Tomorrow',
    time: '4 hours ago',
    amount: 4500
  },
  {
    type: 'notification',
    title: 'Late Fee Applied',
    description: 'Hassan Ahmed - Class 8-C - Late fee of Rs. 200 applied',
    time: '6 hours ago',
    amount: 200
  },
  {
    type: 'payment',
    title: 'Partial Payment Received',
    description: 'Fatima Sheikh - Class 11-A - Partial Payment',
    time: '1 day ago',
    amount: 2500
  }
])

const collectionRate = computed(() => {
  return Math.round((collectedAmount.value / totalRevenue.value) * 100)
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

const navigateToSection = (section) => {
  // Navigate to specific analytics section
  router.push(`/fee-analytics/${section}`)
}

onMounted(() => {
  // Load dashboard data
  loadDashboardData()
})

const loadDashboardData = async () => {
  // Implement API calls to load analytics data
  console.log('Loading analytics dashboard data...')
}
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

.analytics-card {
  animation: slideInUp 0.6s ease-out forwards;
}

/* Stagger animation for cards */
.analytics-card:nth-child(1) { animation-delay: 0.1s; }
.analytics-card:nth-child(2) { animation-delay: 0.2s; }
.analytics-card:nth-child(3) { animation-delay: 0.3s; }
.analytics-card:nth-child(4) { animation-delay: 0.4s; }
.analytics-card:nth-child(5) { animation-delay: 0.5s; }
.analytics-card:nth-child(6) { animation-delay: 0.6s; }

/* Hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
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

/* Progress bar animation */
.progress-bar {
  animation: progressAnimation 1.5s ease-out forwards;
}

@keyframes progressAnimation {
  from {
    width: 0%;
  }
  to {
    width: var(--progress-width, 0%);
  }
}
</style> 