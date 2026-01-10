<template>
  <PageShell 
    title="Add Marksheet"
    :breadcrumbs="[
      { label: 'Exams', to: '/exams/add-marksheet-landing' },
      { label: 'Add Marksheet' }
    ]"
  >
    <!-- Header Info - Matching Fee Analytics Style -->
    <div class="w-full mb-6">
      <div class="relative overflow-hidden rounded-xl border border-purple-200/80 dark:border-purple-700/80 bg-gradient-to-br from-purple-50/90 to-indigo-50/70 dark:from-purple-900/30 dark:to-indigo-900/20 backdrop-blur-xl p-6 shadow-lg">
        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
        <div class="relative flex items-start gap-4">
          <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-lg">
            <svg class="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div class="flex-1">
            <h2 class="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
              Choose Your Marks Entry Mode
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Select the best way to enter exam marks. Each mode is designed for different workflows—pick what works for you!
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Entry Mode Cards - Perfect Design Matching Fee Analytics -->
    <div class="w-full mb-6">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
        <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
          </svg>
        </div>
        Entry Modes
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <!-- Subject-wise (Recommended) - Matching Fee Analytics Card Style -->
        <div 
          @click="router.push('/exams/marksheet-subject-wise')"
          class="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-green-300 dark:border-green-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group"
        >
          <!-- Recommended Badge -->
          <div class="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg z-10 flex items-center gap-1">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            BEST
          </div>
          
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-xl flex items-center justify-center group-hover:from-green-500 group-hover:to-green-600 transition-all duration-300">
              <svg class="w-7 h-7 text-green-600 group-hover:text-white transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <svg class="w-5 h-5 text-gray-500 group-hover:text-green-500 transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
          
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-all duration-300">
            Subject-wise
          </h3>
          
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Enter marks subject by subject. Great for subject teachers! Grid view with all students visible.
          </p>
          
          <div class="flex flex-wrap gap-2">
            <span class="text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">Quick Entry</span>
            <span class="text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-1 rounded-full">Auto-save</span>
          </div>
        </div>

        <!-- Class-wise -->
        <div 
          @click="router.push('/exams/marksheet-class-wise')"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl flex items-center justify-center group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300">
              <svg class="w-7 h-7 text-blue-600 group-hover:text-white transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <svg class="w-5 h-5 text-gray-500 group-hover:text-blue-500 transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
          
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300">
            Class-wise
          </h3>
          
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Enter marks for entire class. Perfect for class teachers! See all subjects at once.
          </p>
          
          <div class="flex flex-wrap gap-2">
            <span class="text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-full">Class View</span>
            <span class="text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 px-2 py-1 rounded-full">Bulk Entry</span>
          </div>
        </div>

        <!-- Student-wise -->
        <div 
          @click="router.push('/exams/marksheet-student-wise')"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl flex items-center justify-center group-hover:from-orange-500 group-hover:to-orange-600 transition-all duration-300">
              <svg class="w-7 h-7 text-orange-600 group-hover:text-white transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <svg class="w-5 h-5 text-gray-500 group-hover:text-orange-500 transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
          
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-all duration-300">
            Student-wise
          </h3>
          
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Search student and enter all their marks. Great for corrections and individual updates.
          </p>
          
          <div class="flex flex-wrap gap-2">
            <span class="text-[10px] font-bold bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-1 rounded-full">Search</span>
            <span class="text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-1 rounded-full">Quick Fix</span>
          </div>
        </div>

        <!-- Family-wise -->
        <div 
          @click="router.push('/exams/marksheet-family-wise')"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl flex items-center justify-center group-hover:from-purple-500 group-hover:to-purple-600 transition-all duration-300">
              <svg class="w-7 h-7 text-purple-600 group-hover:text-white transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <svg class="w-5 h-5 text-gray-500 group-hover:text-purple-500 transition-all duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
          
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-all duration-300">
            Family-wise
          </h3>
          
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            View siblings together. Perfect for parent meetings and family reports.
          </p>
          
          <div class="flex flex-wrap gap-2">
            <span class="text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-1 rounded-full">Family View</span>
            <span class="text-[10px] font-bold bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 px-2 py-1 rounded-full">Siblings</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Help Section & Comparison - Beautifully Designed -->
    <div class="w-full">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
        <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        When to Use Each Mode?
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Quick Guide -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-start gap-4 mb-4">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Quick Guide</h3>
              <ul class="space-y-2.5 text-sm">
                <li class="flex items-start gap-2.5">
                  <div class="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg class="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <span class="text-gray-600 dark:text-gray-400"><strong class="text-gray-900 dark:text-white">Subject-wise:</strong> Recommended for most teachers—fastest grid entry</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <div class="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg class="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <span class="text-gray-600 dark:text-gray-400"><strong class="text-gray-900 dark:text-white">Class-wise:</strong> See all subjects for a class—great for class teachers</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <div class="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg class="w-3 h-3 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <span class="text-gray-600 dark:text-gray-400"><strong class="text-gray-900 dark:text-white">Student-wise:</strong> Perfect for corrections or fixing individual records</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <div class="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg class="w-3 h-3 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <span class="text-gray-600 dark:text-gray-400"><strong class="text-gray-900 dark:text-white">Family-wise:</strong> View sibling results together for parent meetings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Mode Comparison Table -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-start gap-4 mb-4">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Feature Comparison</h3>
              <div class="space-y-2 text-sm">
                <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                  <span class="text-gray-600 dark:text-gray-400">Fastest Entry</span>
                  <span class="text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">Subject-wise</span>
                </div>
                <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                  <span class="text-gray-600 dark:text-gray-400">Best for Bulk Entry</span>
                  <span class="text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-full">Class-wise</span>
                </div>
                <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                  <span class="text-gray-600 dark:text-gray-400">Quick Corrections</span>
                  <span class="text-xs font-bold bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-1 rounded-full">Student-wise</span>
                </div>
                <div class="flex items-center justify-between py-2">
                  <span class="text-gray-600 dark:text-gray-400">Parent Meetings</span>
                  <span class="text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-1 rounded-full">Family-wise</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageShell>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { EditPen, Document, School, User, House, ArrowRight, QuestionFilled } from '@element-plus/icons-vue'
import PageShell from '@/components/common/PageShell.vue'

const router = useRouter()
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
