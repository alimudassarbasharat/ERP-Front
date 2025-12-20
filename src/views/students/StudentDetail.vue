<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
    <!-- Loading State -->
    <div v-if="loading" class="w-full max-w-7xl mx-auto">
      <div class="border border-gray-200 rounded-xl p-8 bg-white/40 shadow-sm">
        <div class="flex flex-col items-center justify-center py-12">
          <div class="relative mb-6">
            <div class="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-500 rounded-full animate-ping opacity-20"></div>
          </div>
          <div class="text-center">
            <p class="text-gray-600 font-medium text-lg mb-1">Loading Student Details</p>
            <p class="text-gray-500 text-sm font-normal">Please wait while we fetch the student information...</p>
            <div class="flex justify-center mt-3 space-x-1">
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="w-full max-w-7xl mx-auto">
      <!-- Top Bar Header -->
      <div class="w-full max-w-7xl mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
        <div class="flex items-center gap-4">
          <button 
            @click="goBack"
            class="p-2 rounded-full hover:bg-white transition-colors duration-200"
            title="Go Back"
          >
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
          </button>
          <h2 class="text-base font-medium text-gray-900 tracking-tight flex items-center gap-2">
            <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            Student Report - {{ student?.first_name }} {{ student?.last_name }}
          </h2>
        </div>
        <nav class="flex items-center gap-2 text-base font-medium text-gray-600">
          <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Dashboard</span>
          <span class="mx-2">|</span>
          <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Students</span>
          <span class="mx-2">|</span>
          <span class="text-gray-900 font-bold">Student Detail</span>
        </nav>
      </div>

      <!-- Student Basic Card (Always Visible) -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-6">
            <!-- Photo -->
            <div class="relative">
              <img 
                v-if="getProfilePicture()"
                :src="getProfilePicture()" 
                :alt="student?.first_name"
                class="w-20 h-20 rounded-full object-cover border-4 border-purple-100 shadow-lg"
                @error="handleImageError"
              />
              <div 
                v-else
                class="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-medium border-4 border-purple-100 shadow-lg initials-fallback"
                :style="{ display: getProfilePicture() ? 'none' : 'flex' }"
              >
                {{ getStudentInitials() }}
              </div>
              <div class="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-200"></div>
            </div>
            
            <!-- Basic Info -->
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ student?.first_name }} {{ student?.last_name }}</h1>
              <div class="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span>Roll: {{ student?.roll_number || 'N/A' }}</span>
                <span>•</span>
                <span>Class: {{ student?.class?.name || classes.find(c => c.id === student?.class_id)?.name || 'N/A' }}</span>
                <span>•</span>
                <span>Section: {{ student?.section?.name || sections.find(s => s.id === student?.section_id)?.name || 'N/A' }}</span>
              </div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button 
              @click="exportToPDF"
              class="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-medium rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Export PDF
            </button>
            <button 
              @click="editStudent"
              class="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="w-full mb-6">
        <div class="bg-white rounded-lg shadow p-1">
          <div class="flex flex-wrap gap-1">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              @click="activeTab = tab.key"
              :class="[
                'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out transform relative overflow-hidden',
                activeTab === tab.key 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105' 
                  : 'text-purple-600 hover:text-purple-700 hover:bg-purple-50 hover:scale-102'
              ]"
            >
              <span>{{ tab.label }}</span>
              <div 
                v-if="activeTab === tab.key" 
                class="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-pulse rounded-lg"
              ></div>
            </button>
          </div>
        </div>
      </div>

      <!-- Tab Content -->
      <transition name="tab-3d" mode="out-in" appear>
        <div :key="activeTab" class="tab-content-3d transition-all duration-300 ease-in-out">
          <div v-if="tabLoading" class="flex flex-col items-center justify-center py-16">
            <div class="relative mb-6">
              <div class="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-500 rounded-full animate-ping opacity-20"></div>
            </div>
            <div class="text-center">
              <p class="text-gray-600 font-medium text-lg mb-1">Loading Tab Data</p>
              <p class="text-gray-500 text-sm font-normal">Please wait while we load the information...</p>
              <div class="flex justify-center mt-3 space-x-1">
                <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              </div>
            </div>
          </div>
          <template v-else>
            <!-- Basic Tab -->
            <div v-if="activeTab === 'basic'" class="space-y-6"></div>
          <!-- Header -->
          <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
            <div class="flex items-center gap-3">
              <div class="p-3 bg-white/20 rounded-full">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-medium">🧑‍🎓 Basic Student Information</h3>
                <p class="text-indigo-100 text-sm">Complete personal and family details</p>
              </div>
            </div>
          </div>

          <!-- Main Content Grid -->
          <div class="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <!-- Left Column - Photo & QR -->
            <div class="xl:col-span-1">
              <!-- Profile Photo Card -->
              <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div class="text-center">
                  <div class="relative mx-auto w-40 h-40 mb-4">
                    <img 
                          v-if="getProfilePicture()"
                      :src="getProfilePicture()" 
                      :alt="student?.first_name"
                      class="w-full h-full rounded-full object-cover border-4 border-purple-100 shadow-xl"
                      @error="handleImageError"
                    />
                        <div 
                          v-else
                          class="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-medium border-4 border-purple-100 shadow-xl initials-fallback"
                          :style="{ display: getProfilePicture() ? 'none' : 'flex' }"
                        >
                          {{ getStudentInitials() }}
                        </div>
                    <div class="absolute bottom-3 right-3 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-200 flex items-center justify-center">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                  </div>
                                     <h4 class="text-base font-medium text-gray-900 mb-1 pb-1 border-b border-purple-200">{{ student?.first_name }} {{ student?.last_name }}</h4>
                   <p class="text-purple-600 font-normal text-sm">Student ID: {{ student?.roll_number || student?.id }}</p>
                </div>
              </div>

              <!-- Quick Access QR Card -->
              <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="text-center">
                  <div class="flex items-center justify-center gap-2 mb-3">
                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
                    </svg>
                    <span class="text-sm font-medium text-gray-900">Quick Access</span>
                  </div>
                  <div class="w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-200 mx-auto flex items-center justify-center">
                    <svg class="w-20 h-20 text-gray-500" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <rect x="7" y="7" width="3" height="3"/>
                      <rect x="14" y="7" width="3" height="3"/>
                      <rect x="7" y="14" width="3" height="3"/>
                    </svg>
                  </div>
                  <p class="text-xs text-gray-500 mt-2">Scan for quick profile access</p>
                </div>
              </div>
            </div>
            
            <!-- Right Column - Details -->
            <div class="xl:col-span-3 space-y-6">
              
                             <!-- Personal Information Cards -->
               <div class="bg-white rounded-lg shadow-lg p-6">
                 <div class="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-100">
                   <div class="p-2 bg-blue-100 rounded-lg">
                     <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/>
                     </svg>
                   </div>
                   <div class="flex-1">
                     <h4 class="text-base font-medium text-gray-900 relative">
                       Personal Information
                       <div class="absolute bottom-0 left-0 w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                     </h4>
                     <p class="text-sm text-gray-600 mt-1">Basic details and identification</p>
                   </div>
                 </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <!-- Basic Details -->
                  <div class="space-y-4">
                                         <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                       <div class="flex items-center gap-2 mb-1">
                         <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                         </svg>
                         <label class="text-xs font-semibold text-blue-700 uppercase tracking-wider">Full Name</label>
                       </div>
                                        <div class="text-sm font-normal text-gray-900 pb-2 border-b-2 border-blue-300">{{ student?.first_name }} {{ student?.last_name }}</div>
                     </div>
                     
                     <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                       <div class="flex items-center gap-2 mb-1">
                         <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                         </svg>
                         <label class="text-xs font-semibold text-purple-700 uppercase tracking-wider">Roll Number</label>
                       </div>
                       <div class="text-sm font-normal text-gray-900 pb-2 border-b-2 border-purple-300">{{ student?.roll_number || 'N/A' }}</div>
                     </div>
                     
                     <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                       <div class="flex items-center gap-2 mb-1">
                         <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                         </svg>
                         <label class="text-xs font-semibold text-green-700 uppercase tracking-wider">Registration ID</label>
                       </div>
                       <div class="text-sm font-normal text-gray-900 pb-2 border-b-2 border-green-300">{{ student?.registration_id || student?.id }}</div>
                     </div>
                  </div>
                  
                  <!-- Personal Info -->
                  <div class="space-y-4">
                                         <div class="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-100">
                       <div class="flex items-center gap-2 mb-1">
                         <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                         </svg>
                         <label class="text-xs font-semibold text-orange-700 uppercase tracking-wider">Gender</label>
                       </div>
                         <div class="text-sm font-normal text-gray-900 pb-2 border-b-2 border-orange-300">{{ student?.gender || 'N/A' }}</div>
                     </div>
                     
                     <div class="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-lg border border-pink-100">
                       <div class="flex items-center gap-2 mb-1">
                         <svg class="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                         </svg>
                         <label class="text-xs font-semibold text-pink-700 uppercase tracking-wider">Date of Birth</label>
                       </div>
                         <div class="text-sm font-normal text-gray-900 pb-2 border-b-2 border-pink-300">{{ formatDate(student?.date_of_birth) || 'N/A' }}</div>
                     </div>
                     
                     <div class="bg-gradient-to-r from-red-50 to-red-50 p-4 rounded-lg border border-red-100">
                       <div class="flex items-center gap-2 mb-1">
                         <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                         </svg>
                         <label class="text-xs font-semibold text-red-700 uppercase tracking-wider">Blood Group</label>
                       </div>
                         <div class="text-sm font-normal text-gray-900 pb-2 border-b-2 border-red-300">{{ student?.blood_group || 'N/A' }}</div>
                     </div>
                  </div>
                  
                  <!-- Contact & Identity -->
                  <div class="space-y-4">
                                         <div class="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-100">
                       <div class="flex items-center gap-2 mb-2">
                         <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                         </svg>
                                                  <label class="text-xs font-semibold text-indigo-700 uppercase tracking-wider">Contact Info</label>
                       </div>
                       <div class="space-y-2">
                           <div class="flex items-center gap-2 text-xs pb-2 border-b-2 border-indigo-200">
                           <span class="text-gray-500">📞</span>
                           <span class="font-normal text-gray-900">{{ student?.contact_info?.phone || 'N/A' }}</span>
                         </div>
                           <div class="flex items-center gap-2 text-xs pb-2 border-b-2 border-indigo-200">
                           <span class="text-gray-500">✉️</span>
                           <span class="font-normal text-gray-900">{{ student?.email || 'N/A' }}</span>
                         </div>
                       </div>
                     </div>
                     
                     <div class="bg-gradient-to-r from-gray-50 to-slate-50 p-4 rounded-lg border border-gray-200">
                       <div class="flex items-center gap-2 mb-1">
                         <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/>
                         </svg>
                         <label class="text-xs font-semibold text-gray-900 uppercase tracking-wider">CNIC/B-Form</label>
                       </div>
                         <div class="text-sm font-normal text-gray-900 pb-2 border-b-2 border-gray-200">{{ student?.cnic || student?.b_form || 'N/A' }}</div>
                     </div>
                     
                     <div class="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg border border-teal-100">
                       <div class="space-y-2">
                         <div>
                           <label class="text-xs font-semibold text-teal-700 uppercase tracking-wider flex items-center gap-1">
                             <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                               <path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                             </svg>
                             Nationality
                           </label>
                             <div class="text-xs font-normal text-gray-900 pb-2 border-b-2 border-teal-200">{{ student?.nationality || 'Pakistani' }}</div>
                         </div>
                         <div>
                           <label class="text-xs font-semibold text-teal-700 uppercase tracking-wider">Religion</label>
                             <div class="text-xs font-normal text-gray-900 pb-2 border-b-2 border-teal-200">{{ student?.religion || 'N/A' }}</div>
                         </div>
                       </div>
                     </div>
                  </div>
                </div>
              </div>
              
                             <!-- Family Information Card -->
               <div class="bg-white rounded-lg shadow-lg p-6">
                 <div class="flex items-center gap-3 mb-6 pb-4 border-b-2 border-purple-100">
                   <div class="p-2 bg-purple-100 rounded-lg">
                     <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                     </svg>
                   </div>
                   <div class="flex-1">
                     <h4 class="text-base font-medium text-gray-900 relative">
                       Family Information
                       <div class="absolute bottom-0 left-0 w-20 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                     </h4>
                     <p class="text-sm text-gray-600 mt-1">Parent and guardian details</p>
                   </div>
                 </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     <!-- Father Info -->
                   <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-100">
                     <div class="flex items-center gap-2 mb-4 pb-2 border-b border-blue-200">
                       <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                       </svg>
                       <h5 class="text-xs font-semibold text-blue-700 uppercase tracking-wider relative">
                         Father/Guardian
                         <div class="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-600 rounded-full"></div>
                       </h5>
                     </div>
                                         <div class="space-y-3">
                       <div>
                         <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</label>
                           <div class="text-sm font-normal text-gray-900 pb-2 border-b-2 border-blue-200">{{ student?.family_info?.father_name || 'N/A' }}</div>
                       </div>
                       <div>
                         <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider">CNIC</label>
                           <div class="text-xs font-normal text-gray-900 pb-2 border-b-2 border-blue-200">{{ student?.family_info?.father_cnic || 'N/A' }}</div>
                       </div>
                       <div>
                         <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Occupation</label>
                           <div class="text-xs font-normal text-gray-900 pb-2 border-b-2 border-blue-200">{{ student?.family_info?.father_occupation || 'N/A' }}</div>
                       </div>
                       <div>
                         <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</label>
                           <div class="text-xs font-normal text-gray-900 flex items-center gap-1 pb-2 border-b-2 border-blue-200">
                           <svg class="w-3 h-3 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                             <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                           </svg>
                           {{ student?.family_info?.father_phone || 'N/A' }}
                         </div>
                       </div>
                     </div>
                  </div>
                  
                                     <!-- Mother Info -->
                   <div class="bg-gradient-to-r from-pink-50 to-rose-50 p-5 rounded-lg border border-pink-100">
                     <div class="flex items-center gap-2 mb-4 pb-2 border-b border-pink-200">
                       <svg class="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                       </svg>
                       <h5 class="text-xs font-semibold text-pink-700 uppercase tracking-wider relative">
                         Mother
                         <div class="absolute bottom-0 left-0 w-8 h-0.5 bg-pink-600 rounded-full"></div>
                       </h5>
                     </div>
                                         <div class="space-y-3">
                       <div>
                         <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</label>
                           <div class="text-sm font-normal text-gray-900 pb-2 border-b-2 border-pink-200">{{ student?.family_info?.mother_name || 'N/A' }}</div>
                       </div>
                       <div>
                         <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</label>
                           <div class="text-xs font-normal text-gray-900 pb-2 border-b-2 border-pink-200">{{ student?.family_info?.mother_phone || 'N/A' }}</div>
                       </div>
                       <div>
                         <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Emergency Contact</label>
                           <div class="text-xs font-normal text-gray-900 flex items-center gap-1 pb-2 border-b-2 border-pink-200">
                           <svg class="w-3 h-3 text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                             <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                           </svg>
                           {{ student?.family_info?.emergency_contact || student?.family_info?.father_phone || 'N/A' }}
                         </div>
                       </div>
                     </div>
                  </div>
                </div>
              </div>
              
                             <!-- Address Information Card -->
               <div class="bg-white rounded-lg shadow-lg p-6">
                 <div class="flex items-center gap-3 mb-6 pb-4 border-b-2 border-green-100">
                   <div class="p-2 bg-green-100 rounded-lg">
                     <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                       <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                     </svg>
                   </div>
                   <div class="flex-1">
                     <h4 class="text-base font-medium text-gray-900 relative">
                       Address Information
                       <div class="absolute bottom-0 left-0 w-20 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                     </h4>
                     <p class="text-sm text-gray-600 mt-1">Residential address details</p>
                   </div>
                 </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-lg border border-green-100">
                     <div class="flex items-center gap-2 mb-3 pb-2 border-b border-green-200">
                       <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                       </svg>
                       <h5 class="text-xs font-semibold text-green-700 uppercase tracking-wider relative">
                         Current Address
                         <div class="absolute bottom-0 left-0 w-14 h-0.5 bg-green-600 rounded-full"></div>
                       </h5>
                     </div>
                                         <p class="text-sm font-normal text-gray-900 leading-relaxed pb-3 border-b-2 border-green-300">{{ student?.contact_info?.address || 'N/A' }}</p>
                   </div>
                   
                   <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-100">
                     <div class="flex items-center gap-2 mb-3 pb-2 border-b border-blue-200">
                       <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                       </svg>
                       <h5 class="text-xs font-semibold text-blue-700 uppercase tracking-wider relative">
                         Permanent Address
                         <div class="absolute bottom-0 left-0 w-16 h-0.5 bg-blue-600 rounded-full"></div>
                       </h5>
                     </div>
                     <p class="text-sm font-normal text-gray-900 leading-relaxed pb-3 border-b-2 border-blue-300">{{ student?.contact_info?.permanent_address || student?.contact_info?.address || 'N/A' }}</p>
                  </div>
                </div>
              </div>

            </div>
            </div>
          </template>
          </div>
      </transition>

        <!-- Academic Tab -->
        <div v-if="activeTab === 'academic'" class="space-y-6">
          <!-- Header -->
          <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
            <div class="flex items-center gap-3">
              <div class="p-3 bg-white/20 rounded-full">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-medium">🏫 Academic Details</h3>
                <p class="text-indigo-100 text-sm">Educational information and performance records</p>
              </div>
            </div>
          </div>
          
          <!-- Academic Details Section -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-100">
              <div class="p-2 bg-blue-100 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="text-base font-medium text-gray-900 relative">
                  Current Academic Information
                  <div class="absolute bottom-0 left-0 w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </h4>
                <p class="text-sm text-gray-600 mt-1">Class, section and academic details</p>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                  <label class="text-xs font-semibold text-blue-700 uppercase tracking-wider">Current Class</label>
                </div>
                <div class="text-sm font-normal text-gray-900 pb-1 border-b border-blue-300">{{ student?.class?.name || classes.find(c => c.id === student?.class_id)?.name || 'N/A' }}</div>
              </div>
              <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                  <label class="text-xs font-semibold text-purple-700 uppercase tracking-wider">Section</label>
                </div>
                <div class="text-sm font-normal text-gray-900 pb-1 border-b border-purple-300">{{ student?.section?.name || sections.find(s => s.id === student?.section_id)?.name || 'N/A' }}</div>
              </div>
              <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <label class="text-xs font-semibold text-green-700 uppercase tracking-wider">Group</label>
                </div>
                <div class="text-sm font-normal text-gray-900 pb-1 border-b border-green-300">{{ student?.group || 'Science' }}</div>
              </div>
              <div class="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-100">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                  <label class="text-xs font-semibold text-orange-700 uppercase tracking-wider">Campus/Branch</label>
                </div>
                <div class="text-sm font-normal text-gray-900 pb-1 border-b border-orange-300">{{ student?.campus || 'Main Campus' }}</div>
              </div>
            </div>
            
            <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Admission Date</label>
                  <div class="text-sm font-normal text-gray-900 pb-1 border-b border-gray-200">{{ formatDate(student?.admission_date) || 'N/A' }}</div>
                </div>
                <div>
                  <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Previous School</label>
                  <div class="text-sm font-normal text-gray-900 pb-1 border-b border-gray-200">{{ student?.previous_school || 'N/A' }}</div>
                </div>
                <div>
                  <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Academic Year</label>
                  <div class="text-sm font-normal text-gray-900 pb-1 border-b border-gray-200">{{ student?.academic_year || '2024-2025' }}</div>
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Admission Number</label>
                  <div class="text-sm font-normal text-gray-900 pb-1 border-b border-gray-200">{{ student?.admission_number || student?.id }}</div>
                </div>
                <div>
                  <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider">House/Club Assignment</label>
                  <div class="text-sm font-normal text-gray-900 pb-1 border-b border-gray-200">{{ student?.house || 'Red House' }}</div>
                </div>
                <div>
                  <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Class Teacher</label>
                  <div class="text-sm font-normal text-gray-900 pb-1 border-b border-gray-200">{{ student?.class_teacher || 'N/A' }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Academic Performance Section -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b-2 border-purple-100">
              <div class="p-2 bg-purple-100 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="text-base font-medium text-gray-900 relative">
                  Academic Performance
                  <div class="absolute bottom-0 left-0 w-20 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </h4>
                <p class="text-sm text-gray-600 mt-1">Grades, marks and performance analysis</p>
              </div>
            </div>
            
            <!-- Performance Summary Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div class="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-lg border border-green-100">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <label class="text-xs font-semibold text-green-700 uppercase tracking-wider">Current GPA</label>
                </div>
                <div class="text-sm font-normal text-gray-900 pb-1 border-b border-green-300">{{ academicPerformance.currentGPA || '3.8' }}</div>
              </div>
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <label class="text-xs font-semibold text-blue-700 uppercase tracking-wider">Overall Percentage</label>
                </div>
                <div class="text-sm font-normal text-gray-900 pb-1 border-b border-blue-300">{{ academicPerformance.percentage || '85%' }}</div>
              </div>
              <div class="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-100">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                  <label class="text-xs font-semibold text-yellow-700 uppercase tracking-wider">Class Rank</label>
                </div>
                <div class="text-sm font-normal text-gray-900 pb-1 border-b border-yellow-300">{{ academicPerformance.classRank || '5th' }}</div>
              </div>
            </div>
            
            <!-- Subject-wise Performance -->
            <div class="mb-6">
              <h4 class="text-base font-medium text-gray-900 mb-4">Subject-wise Marks/Grades</h4>
              <div class="overflow-x-auto">
                <table class="min-w-full">
                  <thead class="bg-gradient-to-r from-indigo-50 to-purple-50">
                    <tr>
                      <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                      <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Marks</th>
                      <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Grade</th>
                      <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Remarks</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr v-for="subject in subjectPerformance" :key="subject.id" class="hover:bg-white">
                      <td class="px-4 py-2 text-sm font-normal text-gray-900">{{ subject.name }}</td>
                      <td class="px-4 py-2 text-sm font-normal text-gray-900">{{ subject.marks }}/{{ subject.total }}</td>
                      <td class="px-4 py-2">
                        <span :class="[
                          'px-2 py-1 text-xs font-medium rounded-full',
                          subject.grade === 'A+' ? 'bg-green-100 text-green-800' :
                          subject.grade === 'A' ? 'bg-blue-100 text-blue-800' :
                          subject.grade === 'B' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        ]">
                          {{ subject.grade }}
                        </span>
                      </td>
                      <td class="px-4 py-2 text-sm font-normal text-gray-600">{{ subject.remarks }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <!-- Progress Chart -->
            <div class="bg-white rounded-lg p-4">
              <h4 class="text-base font-medium text-gray-900 mb-4">Progress Graph</h4>
              <div class="bg-white rounded p-4 h-64 flex items-center justify-center">
                <svg class="w-full h-full text-gray-500" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 400 200">
                  <polyline points="20,180 40,160 60,140 80,120 100,100 120,80 140,60 160,40 180,50 200,60 220,70 240,65 260,55 280,45 300,35 320,25 340,20 360,15 380,10" stroke="currentColor" stroke-width="2" fill="none"/>
                  <text x="200" y="190" text-anchor="middle" class="text-xs">Academic Progress Over Time</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Attendance Tab -->
        <div v-if="activeTab === 'attendance'" class="space-y-6">
          <!-- Header -->
          <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
            <div class="flex items-center gap-3">
              <div class="p-3 bg-white/20 rounded-full">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-medium">🕓 Attendance Records</h3>
                <p class="text-indigo-100 text-sm">Daily attendance and presence tracking</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b-2 border-green-100">
              <div class="p-2 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="text-base font-medium text-gray-900 relative">
                  Attendance Summary
                  <div class="absolute bottom-0 left-0 w-20 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                </h4>
                <p class="text-sm text-gray-600 mt-1">Monthly and yearly attendance statistics</p>
              </div>
            </div>
          
            <!-- Attendance Summary -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <label class="text-xs font-semibold text-green-700 uppercase tracking-wider">Total Present</label>
                </div>
                <div class="text-sm font-normal text-gray-900 pb-1 border-b border-green-300">{{ attendanceData.present || 180 }}</div>
              </div>
              <div class="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border border-red-100">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <label class="text-xs font-semibold text-red-700 uppercase tracking-wider">Total Absent</label>
                </div>
                <div class="text-sm font-normal text-gray-900 pb-1 border-b border-red-300">{{ attendanceData.absent || 12 }}</div>
              </div>
              <div class="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-100">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <label class="text-xs font-semibold text-yellow-700 uppercase tracking-wider">Leaves Taken</label>
                </div>
                <div class="text-sm font-normal text-gray-900 pb-1 border-b border-yellow-300">{{ attendanceData.leaves || 5 }}</div>
              </div>
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <label class="text-xs font-semibold text-blue-700 uppercase tracking-wider">Attendance %</label>
                </div>
                <div class="text-sm font-normal text-gray-900 pb-1 border-b border-blue-300">{{ attendanceData.percentage || '93.8%' }}</div>
              </div>
            </div>
          
            <!-- Current Status -->
            <div class="mb-6">
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                  <div :class="[
                    'w-3 h-3 rounded-full',
                    attendanceData.todayStatus === 'present' ? 'bg-green-500' : 'bg-red-500'
                  ]"></div>
                  <span class="text-sm font-normal text-gray-900">
                    Today's Status: {{ attendanceData.todayStatus === 'present' ? 'Present' : 'Absent' }}
                  </span>
                </div>
                <div class="text-xs font-normal text-gray-600">
                  Last attendance: {{ attendanceData.lastAttendance || 'Today' }}
                </div>
              </div>
            </div>
          
            <!-- Attendance Chart -->
            <div class="bg-white rounded-lg p-4">
              <h4 class="text-base font-medium text-gray-900 mb-4">Monthly Attendance Trend</h4>
              <div class="bg-white rounded p-4 h-48 flex items-center justify-center">
                <div class="w-full h-full flex items-end justify-center space-x-2">
                  <div v-for="month in attendanceChart" :key="month.name" class="flex flex-col items-center">
                    <div 
                      :style="{ height: `${month.percentage}%` }" 
                      class="w-8 bg-gradient-to-t from-purple-400 to-indigo-500 rounded-t"
                    ></div>
                    <div class="text-xs text-gray-600 mt-2">{{ month.name }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Finance Tab -->
        <div v-if="activeTab === 'finance'" class="space-y-6">
          <!-- Header -->
          <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
            <div class="flex items-center gap-3">
              <div class="p-3 bg-white/20 rounded-full">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-medium">💸 Fee and Finance Info</h3>
                <p class="text-indigo-100 text-sm">Payment history and financial records</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b-2 border-green-100">
              <div class="p-2 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="text-base font-medium text-gray-900 relative">
                  Fee Summary
                  <div class="absolute bottom-0 left-0 w-20 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                </h4>
                <p class="text-sm text-gray-600 mt-1">Payment status and financial overview</p>
              </div>
            </div>
          
            <!-- Fee Summary Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <label class="text-xs font-semibold text-green-700 uppercase tracking-wider">Total Paid</label>
                </div>
                <div class="text-sm font-normal text-gray-900 pb-1 border-b border-green-300">Rs. 45,000</div>
              </div>
              <div class="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-100">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <label class="text-xs font-semibold text-yellow-700 uppercase tracking-wider">Amount Due</label>
                </div>
                <div class="text-sm font-normal text-gray-900 pb-1 border-b border-yellow-300">Rs. 15,000</div>
              </div>
              <div class="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border border-red-100">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                  </svg>
                  <label class="text-xs font-semibold text-red-700 uppercase tracking-wider">Overdue</label>
                </div>
                <div class="text-sm font-normal text-gray-900 pb-1 border-b border-red-300">Rs. 5,000</div>
              </div>
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                  <label class="text-xs font-semibold text-blue-700 uppercase tracking-wider">Scholarship</label>
                </div>
                <div class="text-sm font-normal text-gray-900 pb-1 border-b border-blue-300">10%</div>
              </div>
            </div>
          
            <!-- Payment History Table -->
            <div class="overflow-x-auto">
              <h4 class="text-base font-medium text-gray-900 mb-4">Payment History</h4>
              <table class="min-w-full">
                <thead class="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <tr>
                    <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Month</th>
                    <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fee Amount</th>
                    <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Paid Amount</th>
                    <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr class="hover:bg-white">
                    <td class="px-4 py-2 text-sm font-normal text-gray-900">January 2024</td>
                    <td class="px-4 py-2 text-sm font-normal text-gray-900">Rs. 5,000</td>
                    <td class="px-4 py-2 text-sm font-normal text-gray-900">Rs. 5,000</td>
                    <td class="px-4 py-2"><span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Paid</span></td>
                    <td class="px-4 py-2"><button class="text-green-600 hover:text-green-800 text-xs font-medium">Download Receipt</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Assignments Tab -->
        <div v-if="activeTab === 'assignments'" class="space-y-6">
          <!-- Header -->
          <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
            <div class="flex items-center gap-3">
              <div class="p-3 bg-white/20 rounded-full">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-medium">📝 Assignments & Exams</h3>
                <p class="text-indigo-100 text-sm">Homework tracking and exam schedules</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-100">
              <div class="p-2 bg-blue-100 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 8h6m-6 4h6"/>
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="text-base font-medium text-gray-900 relative">
                  Assignment Summary
                  <div class="absolute bottom-0 left-0 w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </h4>
                <p class="text-sm text-gray-600 mt-1">Homework and exam tracking overview</p>
              </div>
            </div>
          
            <!-- Summary Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <label class="text-xs font-semibold text-blue-700 uppercase tracking-wider">Pending Assignments</label>
                </div>
                <div class="text-sm font-normal text-gray-900 pb-1 border-b border-blue-300">3</div>
              </div>
              <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <label class="text-xs font-semibold text-green-700 uppercase tracking-wider">Submitted</label>
                </div>
                <div class="text-sm font-normal text-gray-900 pb-1 border-b border-green-300">12</div>
              </div>
              <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <label class="text-xs font-semibold text-purple-700 uppercase tracking-wider">Upcoming Exams</label>
                </div>
                <div class="text-sm font-normal text-gray-900 pb-1 border-b border-purple-300">2</div>
              </div>
              <div class="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-100">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <label class="text-xs font-semibold text-orange-700 uppercase tracking-wider">Average Score</label>
                </div>
                <div class="text-sm font-normal text-gray-900 pb-1 border-b border-orange-300">88%</div>
              </div>
            </div>
          
            <!-- Assignments Table -->
            <div class="overflow-x-auto">
              <h4 class="text-base font-medium text-gray-900 mb-4">Recent Assignments</h4>
              <table class="min-w-full">
                <thead class="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <tr>
                    <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                    <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Assignment</th>
                    <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Due Date</th>
                    <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Score</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr class="hover:bg-white">
                    <td class="px-4 py-2 text-sm font-normal text-gray-900">Mathematics</td>
                    <td class="px-4 py-2 text-sm font-normal text-gray-900">Algebra Problems Set 5</td>
                    <td class="px-4 py-2 text-sm font-normal text-gray-600">2024-03-25</td>
                    <td class="px-4 py-2"><span class="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pending</span></td>
                    <td class="px-4 py-2 text-sm font-normal text-gray-900">N/A</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Schedule Tab -->
        <div v-if="activeTab === 'schedule'" class="space-y-6">
          <!-- Header -->
          <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
            <div class="flex items-center gap-3">
              <div class="p-3 bg-white/20 rounded-full">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-medium">📅 Timetable & Scheduling</h3>
                <p class="text-indigo-100 text-sm">Daily schedule and class timetables</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b-2 border-purple-100">
              <div class="p-2 bg-purple-100 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="text-base font-medium text-gray-900 relative">
                  Today's Schedule
                  <div class="absolute bottom-0 left-0 w-20 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </h4>
                <p class="text-sm text-gray-600 mt-1">Current day class timetable</p>
              </div>
            </div>
          
            <!-- Today's Schedule -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                <div class="flex justify-between items-start mb-2">
                  <h5 class="text-sm font-semibold text-indigo-800">Mathematics</h5>
                  <span class="text-xs text-gray-600 bg-white px-2 py-1 rounded">8:00 AM - 8:40 AM</span>
                </div>
                <p class="text-sm text-gray-900 pb-1 border-b border-indigo-200">Teacher: Mr. Ahmed Khan</p>
                <p class="text-xs text-gray-600">Room: Room 101</p>
              </div>
              <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                <div class="flex justify-between items-start mb-2">
                  <h5 class="text-sm font-semibold text-green-800">English</h5>
                  <span class="text-xs text-gray-600 bg-white px-2 py-1 rounded">8:45 AM - 9:25 AM</span>
                </div>
                <p class="text-sm text-gray-900 pb-1 border-b border-green-200">Teacher: Ms. Sarah Ali</p>
                <p class="text-xs text-gray-600">Room: Room 102</p>
                <a href="#" class="text-xs text-blue-600 hover:text-blue-800 underline">Join Online Class</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Documents Tab -->
        <div v-if="activeTab === 'documents'" class="space-y-6">
          <!-- Header -->
          <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
            <div class="flex items-center gap-3">
              <div class="p-3 bg-white/20 rounded-full">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-medium">📎 Documents</h3>
                <p class="text-indigo-100 text-sm">Uploaded documents and downloadable forms</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Uploaded Documents -->
              <div>
                <div class="flex items-center gap-3 mb-4 pb-2 border-b-2 border-blue-100">
                  <div class="p-2 bg-blue-100 rounded-lg">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <h4 class="text-base font-medium text-gray-900 relative">
                    Uploaded Documents
                    <div class="absolute bottom-0 left-0 w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  </h4>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div class="flex items-center gap-3">
                      <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                      </svg>
                      <div>
                        <div class="text-sm font-normal text-gray-900 pb-1 border-b border-gray-200">Birth Certificate</div>
                        <div class="text-xs text-gray-600">2024-01-15</div>
                      </div>
                    </div>
                    <button class="text-blue-600 hover:text-blue-800 text-xs font-medium">Download</button>
                  </div>
                </div>
              </div>
            
              <!-- Downloadable Forms -->
              <div>
                <div class="flex items-center gap-3 mb-4 pb-2 border-b-2 border-green-100">
                  <div class="p-2 bg-green-100 rounded-lg">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <h4 class="text-base font-medium text-gray-900 relative">
                    Downloadable Forms
                    <div class="absolute bottom-0 left-0 w-16 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                  </h4>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div class="flex items-center gap-3">
                      <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                      <div>
                        <div class="text-sm font-normal text-gray-900 pb-1 border-b border-gray-200">Leave Application Form</div>
                        <div class="text-xs text-gray-600">For requesting student leave</div>
                      </div>
                    </div>
                    <button class="text-green-600 hover:text-green-800 text-xs font-medium">Download</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Activities Tab -->
        <div v-if="activeTab === 'activities'" class="space-y-6">
          <!-- Header -->
          <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
            <div class="flex items-center gap-3">
              <div class="p-3 bg-white/20 rounded-full">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-medium">🏅 Extra-Curricular & Achievements</h3>
                <p class="text-indigo-100 text-sm">Awards, activities and special achievements</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Achievements -->
              <div>
                <div class="flex items-center gap-3 mb-4 pb-2 border-b-2 border-yellow-100">
                  <div class="p-2 bg-yellow-100 rounded-lg">
                    <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                    </svg>
                  </div>
                  <h4 class="text-base font-medium text-gray-900 relative">
                    Achievements & Awards
                    <div class="absolute bottom-0 left-0 w-16 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
                  </h4>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                    <svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                    </svg>
                    <div>
                      <div class="text-sm font-normal text-gray-900 pb-1 border-b border-yellow-200">First Position in Math Olympiad</div>
                      <div class="text-xs text-gray-600">2024-02-20 - Academic</div>
                    </div>
                  </div>
                </div>
              </div>
            
              <!-- Activities -->
              <div>
                <div class="flex items-center gap-3 mb-4 pb-2 border-b-2 border-blue-100">
                  <div class="p-2 bg-blue-100 rounded-lg">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </div>
                  <h4 class="text-base font-medium text-gray-900 relative">
                    Sports & Club Memberships
                    <div class="absolute bottom-0 left-0 w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  </h4>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    <div>
                      <div class="text-sm font-normal text-gray-900 pb-1 border-b border-blue-200">Basketball Team</div>
                      <div class="text-xs text-gray-600">Team Captain - Since 2023-09-01</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Health Tab -->
        <div v-if="activeTab === 'health'" class="space-y-6">
          <!-- Header -->
          <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
            <div class="flex items-center gap-3">
              <div class="p-3 bg-white/20 rounded-full">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-medium">🏥 Health Information</h3>
                <p class="text-indigo-100 text-sm">Medical records and health details</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Medical Information -->
              <div>
                <div class="flex items-center gap-3 mb-4 pb-2 border-b-2 border-red-100">
                  <div class="p-2 bg-red-100 rounded-lg">
                    <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  </div>
                  <h4 class="text-base font-medium text-gray-900 relative">
                    Medical History
                    <div class="absolute bottom-0 left-0 w-14 h-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></div>
                  </h4>
                </div>
                <div class="space-y-4">
                  <div>
                    <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Blood Group</label>
                    <div class="text-sm font-normal text-gray-900 pb-1 border-b border-gray-200">{{ student?.blood_group || 'O+' }}</div>
                  </div>
                  <div>
                    <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Allergies</label>
                    <div class="text-sm font-normal text-gray-900 pb-1 border-b border-gray-200">Peanuts, Dust</div>
                  </div>
                  <div>
                    <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Medical Conditions</label>
                    <div class="text-sm font-normal text-gray-900 pb-1 border-b border-gray-200">Mild Asthma</div>
                  </div>
                </div>
              </div>
            
              <!-- Emergency Contact -->
              <div>
                <div class="flex items-center gap-3 mb-4 pb-2 border-b-2 border-orange-100">
                  <div class="p-2 bg-orange-100 rounded-lg">
                    <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                    </svg>
                  </div>
                  <h4 class="text-base font-medium text-gray-900 relative">
                    Emergency Contact
                    <div class="absolute bottom-0 left-0 w-16 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                  </h4>
                </div>
                <div class="space-y-4">
                  <div>
                    <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Emergency Contact Person</label>
                    <div class="text-sm font-normal text-gray-900 pb-1 border-b border-gray-200">{{ student?.family_info?.father_name || 'N/A' }}</div>
                  </div>
                  <div>
                    <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Emergency Phone</label>
                    <div class="text-sm font-normal text-gray-900 pb-1 border-b border-gray-200">{{ student?.family_info?.father_phone || 'N/A' }}</div>
                  </div>
                </div>
              </div>
            </div>
          
            <!-- Vaccination Records -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <div class="flex items-center gap-3 mb-4 pb-2 border-b-2 border-green-100">
                <div class="p-2 bg-green-100 rounded-lg">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h4 class="text-base font-medium text-gray-900 relative">
                  Vaccination Records
                  <div class="absolute bottom-0 left-0 w-18 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                </h4>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-green-50 p-3 rounded-lg border border-green-100">
                  <div class="text-sm font-normal text-green-800 pb-1 border-b border-green-200">COVID-19</div>
                  <div class="text-xs text-gray-600">2023-08-15</div>
                  <div class="text-xs text-green-600">✓ Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Communication Tab -->
        <div v-if="activeTab === 'communication'" class="space-y-6">
          <!-- Header -->
          <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
            <div class="flex items-center gap-3">
              <div class="p-3 bg-white/20 rounded-full">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-medium">💬 Communication & Notes</h3>
                <p class="text-indigo-100 text-sm">Messages, notes and communication logs</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Messages -->
              <div>
                <div class="flex items-center gap-3 mb-4 pb-2 border-b-2 border-blue-100">
                  <div class="p-2 bg-blue-100 rounded-lg">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                  </div>
                  <h4 class="text-base font-medium text-gray-900 relative">
                    Recent Messages
                    <div class="absolute bottom-0 left-0 w-14 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  </h4>
                </div>
                <div class="space-y-3">
                  <div class="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="text-sm font-normal text-gray-900">Class Teacher</span>
                      <span class="text-xs text-gray-600">2024-03-20</span>
                    </div>
                    <p class="text-sm font-normal text-gray-900 pb-1 border-b border-blue-200">Parent-teacher meeting scheduled for next week.</p>
                  </div>
                </div>
              </div>

              <!-- Teacher Comments -->
              <div>
                <div class="flex items-center gap-3 mb-4 pb-2 border-b-2 border-purple-100">
                  <div class="p-2 bg-purple-100 rounded-lg">
                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                    </svg>
                  </div>
                  <h4 class="text-base font-medium text-gray-900 relative">
                    Teacher Comments
                    <div class="absolute bottom-0 left-0 w-15 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  </h4>
                </div>
                <div class="space-y-3">
                  <div class="p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="text-sm font-normal text-gray-900">Mr. Ahmed Khan</span>
                      <span class="text-xs text-gray-600">Math Teacher</span>
                    </div>
                    <p class="text-sm font-normal text-gray-900 pb-1 border-b border-purple-200">Excellent performance in mathematics. Keep up the good work!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    </div>
      
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

// Use centralized axios instance
const axios = api

const router = useRouter()
const toast = useToast()
const route = useRoute()

// Reactive data
const loading = ref(true)
const student = ref(null)
const classes = ref([])
const sections = ref([])
const activeTab = ref('basic')
const tabLoading = ref(false)

// Tab Configuration
const tabs = ref([
  {
    key: 'basic',
    label: 'Basic Info'
  },
  {
    key: 'academic',
    label: 'Academic'
  },
  {
    key: 'attendance',
    label: 'Attendance'
  },
  {
    key: 'finance',
    label: 'Finance'
  },
  {
    key: 'assignments',
    label: 'Assignments'
  },
  {
    key: 'schedule',
    label: 'Schedule'
  },
  {
    key: 'documents',
    label: 'Documents'
  },
  {
    key: 'activities',
    label: 'Activities'
  },
  {
    key: 'health',
    label: 'Health'
  },
  {
    key: 'communication',
    label: 'Communication'
  }
])

// Academic Performance Data
const academicPerformance = ref({
  currentGPA: '3.8',
  percentage: '85%',
  classRank: '5th'
})

const subjectPerformance = ref([
  { id: 1, name: 'Mathematics', marks: 85, total: 100, grade: 'A', remarks: 'Excellent' },
  { id: 2, name: 'English', marks: 78, total: 100, grade: 'B+', remarks: 'Good' },
  { id: 3, name: 'Science', marks: 92, total: 100, grade: 'A+', remarks: 'Outstanding' },
  { id: 4, name: 'Urdu', marks: 80, total: 100, grade: 'A-', remarks: 'Very Good' },
  { id: 5, name: 'Islamiat', marks: 88, total: 100, grade: 'A', remarks: 'Excellent' }
])

// Attendance Data
const attendanceData = ref({
  present: 180,
  absent: 12,
  leaves: 5,
  percentage: '93.8%',
  todayStatus: 'present',
  lastAttendance: 'Today'
})

const attendanceChart = ref([
  { name: 'Jan', percentage: 95 },
  { name: 'Feb', percentage: 88 },
  { name: 'Mar', percentage: 92 },
  { name: 'Apr', percentage: 85 },
  { name: 'May', percentage: 98 },
  { name: 'Jun', percentage: 90 }
])

// Fee and Finance Data
const feeData = ref({
  totalPaid: 'Rs. 45,000',
  totalDue: 'Rs. 15,000',
  overdue: 'Rs. 5,000',
  scholarship: '10%'
})

const feeHistory = ref([
  { id: 1, month: 'January 2024', feeAmount: '5,000', paidAmount: '5,000', dueDate: '2024-01-15', status: 'Paid' },
  { id: 2, month: 'February 2024', feeAmount: '5,000', paidAmount: '5,000', dueDate: '2024-02-15', status: 'Paid' },
  { id: 3, month: 'March 2024', feeAmount: '5,000', paidAmount: '3,000', dueDate: '2024-03-15', status: 'Partial' },
  { id: 4, month: 'April 2024', feeAmount: '5,000', paidAmount: '0', dueDate: '2024-04-15', status: 'Overdue' }
])

// Assignment & Exam Data
const assignmentData = ref({
  pending: 3,
  submitted: 12,
  upcomingExams: 2,
  averageScore: '88%'
})

const assignments = ref([
  { id: 1, subject: 'Mathematics', title: 'Algebra Problems Set 5', dueDate: '2024-03-25', status: 'Pending', score: null },
  { id: 2, subject: 'English', title: 'Essay on Climate Change', dueDate: '2024-03-20', status: 'Submitted', score: '85/100' },
  { id: 3, subject: 'Science', title: 'Physics Lab Report', dueDate: '2024-03-18', status: 'Overdue', score: null },
  { id: 4, subject: 'Urdu', title: 'Poetry Analysis', dueDate: '2024-03-22', status: 'Submitted', score: '90/100' }
])

// Timetable Data
const todaySchedule = ref([
  { id: 1, subject: 'Mathematics', teacher: 'Mr. Ahmed Khan', room: 'Room 101', time: '8:00 AM - 8:40 AM', onlineLink: null },
  { id: 2, subject: 'English', teacher: 'Ms. Sarah Ali', room: 'Room 102', time: '8:45 AM - 9:25 AM', onlineLink: 'https://meet.google.com/abc-defg-hij' },
  { id: 3, subject: 'Science', teacher: 'Dr. Hassan Sheikh', room: 'Lab 1', time: '9:30 AM - 10:10 AM', onlineLink: null },
  { id: 4, subject: 'Break', teacher: '', room: '', time: '10:10 AM - 10:25 AM', onlineLink: null },
  { id: 5, subject: 'Urdu', teacher: 'Mrs. Fatima Malik', room: 'Room 105', time: '10:25 AM - 11:05 AM', onlineLink: null },
  { id: 6, subject: 'Islamiat', teacher: 'Maulana Tariq', room: 'Room 108', time: '11:10 AM - 11:50 AM', onlineLink: null }
])

// Documents Data
const documents = ref([
  { id: 1, name: 'Birth Certificate', uploadDate: '2024-01-15', type: 'pdf' },
  { id: 2, name: 'Previous School Certificate', uploadDate: '2024-01-20', type: 'pdf' },
  { id: 3, name: 'Medical Report', uploadDate: '2024-02-05', type: 'pdf' },
  { id: 4, name: 'Passport Photo', uploadDate: '2024-01-10', type: 'jpg' }
])

const downloadableForms = ref([
  { id: 1, name: 'Leave Application Form', description: 'For requesting student leave' },
  { id: 2, name: 'Transfer Certificate Request', description: 'For school transfer requests' },
  { id: 3, name: 'Fee Concession Form', description: 'For fee discount applications' },
  { id: 4, name: 'Transport Form', description: 'For school transport registration' }
])

// Communication Data
const recentMessages = ref([
  { id: 1, from: 'Class Teacher', content: 'Parent-teacher meeting scheduled for next week.', date: '2024-03-15' },
  { id: 2, from: 'Principal Office', content: 'Annual day preparations underway. Please submit consent form.', date: '2024-03-12' },
  { id: 3, from: 'Math Teacher', content: 'Extra classes available for weak students in algebra.', date: '2024-03-10' }
])

const teacherComments = ref([
  { id: 1, teacher: 'Mr. Ahmed Khan', comment: 'Excellent performance in mathematics. Keep up the good work!', subject: 'Mathematics', date: '2024-03-14' },
  { id: 2, teacher: 'Ms. Sarah Ali', comment: 'Good improvement in English writing skills. Needs more practice in grammar.', subject: 'English', date: '2024-03-12' },
  { id: 3, teacher: 'Dr. Hassan Sheikh', comment: 'Very good understanding of scientific concepts. Participate more in class discussions.', subject: 'Science', date: '2024-03-10' }
])

// Achievements and Activities Data
const achievements = ref([
  { id: 1, title: 'First Position in Math Olympiad', date: '2024-02-20', category: 'Academic' },
  { id: 2, title: 'Best Speaker Award', date: '2024-01-15', category: 'Debate Competition' },
  { id: 3, title: 'Science Fair Winner', date: '2023-12-10', category: 'Science' }
])

const activities = ref([
  { id: 1, name: 'Basketball Team', role: 'Team Captain', joinDate: '2023-09-01' },
  { id: 2, name: 'Debate Club', role: 'Member', joinDate: '2023-10-15' },
  { id: 3, name: 'Science Club', role: 'Vice President', joinDate: '2023-09-20' }
])

// Health Information Data
const healthInfo = ref({
  allergies: 'Peanuts, Dust',
  conditions: 'Mild Asthma',
  medications: 'Inhaler (as needed)',
  emergencyRelation: 'Father',
  familyDoctor: 'Dr. Muhammad Iqbal'
})

const vaccinations = ref([
  { id: 1, name: 'COVID-19', date: '2023-08-15' },
  { id: 2, name: 'Hepatitis B', date: '2023-07-20' },
  { id: 3, name: 'BCG', date: '2023-06-10' },
  { id: 4, name: 'DPT', date: '2023-05-25' }
])

// Methods
const fetchStudentDetails = async () => {
  loading.value = true
  try {
    const studentId = route.params.id
    const response = await axios.get(`/students/${studentId}`)
    if (response.data.status || response.data.success) {
      student.value = response.data.result || response.data.data
      // Fetch additional data based on student
      await Promise.all([
        fetchAcademicPerformance(studentId),
        fetchAttendanceData(studentId),
        fetchFeeData(studentId),
        fetchAssignments(studentId)
      ])
    } else {
      toast.error(response.data.message || 'Failed to fetch student details')
    }
  } catch (error) {
    console.error('Error fetching student details:', error)
    toast.error(error.response?.data?.message || 'Failed to fetch student details')
  } finally {
    loading.value = false
  }
}

const fetchAcademicPerformance = async (studentId) => {
  try {
    // This would fetch real academic performance data
    // For now using dummy data
    console.log('Fetching academic performance for student:', studentId)
  } catch (error) {
    console.error('Error fetching academic performance:', error)
  }
}

const fetchAttendanceData = async (studentId) => {
  try {
    // This would fetch real attendance data
    // For now using dummy data
    console.log('Fetching attendance data for student:', studentId)
  } catch (error) {
    console.error('Error fetching attendance data:', error)
  }
}

const fetchFeeData = async (studentId) => {
  try {
    // This would fetch real fee data
    // For now using dummy data
    console.log('Fetching fee data for student:', studentId)
  } catch (error) {
    console.error('Error fetching fee data:', error)
  }
}

const fetchAssignments = async (studentId) => {
  try {
    // This would fetch real assignment data
    // For now using dummy data
    console.log('Fetching assignments for student:', studentId)
  } catch (error) {
    console.error('Error fetching assignments:', error)
  }
}

const fetchClasses = async () => {
  try {
    const response = await axios.get('/classes')
    if (response.data.success) {
      classes.value = response.data.result || []
    }
  } catch (error) {
    console.error('Error fetching classes:', error)
  }
}

const fetchSections = async () => {
  try {
    const response = await axios.get('/sections')
    if (response.data.success) {
      sections.value = response.data.result || []
    }
  } catch (error) {
    console.error('Error fetching sections:', error)
  }
}

const getStudentInitials = () => {
  if (!student.value) return 'ST'
  const firstName = student.value.first_name || ''
  const lastName = student.value.last_name || ''
  
  const firstInitial = firstName.charAt(0).toUpperCase()
  const lastInitial = lastName.charAt(0).toUpperCase()
  
  return `${firstInitial}${lastInitial}` || 'ST'
}

const getProfilePicture = () => {
  if (student.value?.photo_path) {
    return student.value.photo_path
  }
  return null // Return null to indicate no image, show initials instead
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
  // Show initials instead when image fails to load
  const parent = event.target.parentElement
  if (parent) {
    const initialsDiv = parent.querySelector('.initials-fallback')
    if (initialsDiv) {
      initialsDiv.style.display = 'flex'
    }
  }
}

const formatDate = (date) => {
  if (!date) return null
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  })
}

const goBack = () => {
  router.back()
}

const editStudent = () => {
  router.push(`/students/edit/${route.params.id}`)
}

const exportToPDF = () => {
  toast.info('PDF export functionality will be implemented')
}

const changeTab = async (tabKey) => {
  if (activeTab.value === tabKey) return
  
  tabLoading.value = true
  
  // Enhanced 3D animation with better timing
  setTimeout(() => {
    activeTab.value = tabKey
    
    // Simulate data loading based on tab with better UX
    setTimeout(() => {
      tabLoading.value = false
    }, 400)
  }, 200)
}

// Lifecycle
onMounted(async () => {
  await Promise.all([
    fetchStudentDetails(),
    fetchClasses(),
    fetchSections()
  ])
})
</script>

<style scoped>
.student-detail-container {
  padding: 20px;
  width: 100%;
  background: #faf6f2;
  min-height: 100vh;
  box-sizing: border-box;
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (min-width: 1400px) {
  .student-detail-container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
.student-detail-card {
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  border: none;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.student-detail-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #8b8991;
  padding: 28px 32px;
  border-radius: 22px 22px 0 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 18px 0 rgba(64,158,255,0.07), 0 1.5px 6px 0 rgba(31,38,135,0.04);
  border-bottom: 1.5px solid #e3eaf5;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.header-left .el-button,
.header-left .el-button[type='default'] {
  background: #fff;
  color: #3b82f6;
  border: 1.5px solid #d0e6fa;
  border-radius: 22px;
  font-size: 15px;
  font-weight: 600;
  padding: 10px 28px;
  box-shadow: 0 1px 4px rgba(64,158,255,0.04);
  transition: background 0.18s, color 0.18s, box-shadow 0.18s, border-color 0.18s;
  outline: none;
  display: flex;
  align-items: center;
  gap: 8px;
}
.header-left .el-button:hover,
.header-left .el-button:focus {
  background: #f3f0fa;
  color: #3b82f6;
  border-color: var(--border-accent);
  box-shadow: 0 2px 8px rgba(64,158,255,0.10);
}
.header-left .el-button:active {
  background: #e7eafc;
  color: #3b82f6;
}
.title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
.header-actions .el-button[type='primary'],
.header-actions .el-button {
  background: #fff;
  color: #3b82f6;
  border: 1.5px solid #d0e6fa;
  border-radius: 22px;
  font-size: 15px;
  font-weight: 700;
  padding: 10px 32px;
  box-shadow: 0 1.5px 6px 0 rgba(64,158,255,0.10);
  transition: background 0.18s, color 0.18s, box-shadow 0.18s, border-color 0.18s;
  outline: none;
  display: flex;
  align-items: center;
  gap: 8px;
}
.header-actions .el-button[type='primary']:hover,
.header-actions .el-button[type='primary']:focus,
.header-actions .el-button:hover,
.header-actions .el-button:focus {
  background: #f3f0fa;
  color: #3b82f6;
  border-color: var(--border-accent);
  box-shadow: 0 2px 8px rgba(64,158,255,0.10);
}
.header-actions .el-button[type='primary']:active,
.header-actions .el-button:active {
  background: #e7eafc;
  color: #3b82f6;
}
.header-actions .el-button .el-icon {
  margin-right: 8px;
}
.student-content {
  padding: 24px;
}
.profile-section {
  display: flex;
  gap: 36px;
  margin-bottom: 36px;
  padding: 36px 40px;
  background: linear-gradient(120deg, #f7f3ef 60%, #f3f0eb 100%);
  border-radius: 22px;
  box-shadow: 0 10px 36px 0 rgba(31, 38, 135, 0.13), 0 2px 8px 0 rgba(64,158,255,0.10);
  border: 2px solid #d0e6fa;
  position: relative;
  overflow: hidden;
  align-items: center;
}
.profile-photo.enhanced-profile-photo {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #fff;
  box-shadow: 0 6px 24px rgba(64,158,255,0.13), 0 0 0 6px #eaf3fa;
  background: #f4f8fb;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.profile-photo.enhanced-profile-photo::after {
  content: '';
  position: absolute;
  top: -8px; left: -8px; right: -8px; bottom: -8px;
  border-radius: 50%;
  box-shadow: 0 0 0 3px #409eff33;
  pointer-events: none;
}
.profile-photo.enhanced-profile-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.profile-info.enhanced-profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}
.profile-stats-row.enhanced-profile-stats-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 18px;
}
.profile-stat-pill {
  display: flex;
  align-items: center;
  background: #f4f6fa;
  border-radius: 18px;
  padding: 8px 20px;
  box-shadow: 0 1px 4px rgba(64,158,255,0.06);
  border: 1px solid #e3eaf5;
  font-size: 13px;
  transition: background 0.2s;
}
.profile-stat-pill:hover {
  background: #e9eef5;
}
.profile-stat-label {
  font-weight: 700;
  color: #3b82f6 !important;
  margin-right: 6px;
  letter-spacing: 0.01em;
  font-size: 13px;
}
.profile-stat-value {
  font-weight: 400;
  color: #1e293b;
  font-size: 13px;
}
@media (max-width: 900px) {
  .profile-section {
    flex-direction: column;
    align-items: center;
    padding: 24px 10px;
    gap: 18px;
  }
  .profile-info.enhanced-profile-info {
    align-items: center;
    text-align: center;
  }
  .profile-stats-row.enhanced-profile-stats-row {
    justify-content: center;
  }
}
.enhanced-info-tabs {
  margin-bottom: 24px;
}
.custom-tab-bar {
  display: flex;
  gap: 24px;
  margin-bottom: 0.5rem;
  margin-top: 8px;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.custom-tab-btn {
  border: 2px solid #40a9ff;
  background: #fff;
  color: #3b82f6;
  border-radius: 999px;
  padding: 12px 36px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  outline: none;
  box-shadow: 0 1px 4px rgba(64,158,255,0.04);
  min-width: 140px;
  flex: 0 0 auto;
  letter-spacing: 0.01em;
}
.custom-tab-btn.active,
.custom-tab-btn:focus {
  background: #40a9ff;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(64,158,255,0.13);
  border-color: #3b82f6;
}
.custom-tab-btn:hover:not(.active) {
  background: #eaf3fa;
  color: #3b82f6;
}
@media (max-width: 600px) {
  .custom-tab-bar {
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 8px;
    overflow-x: unset;
  }
  .custom-tab-btn {
    min-width: 0;
    width: 100%;
    flex: 1 1 100%;
    margin-bottom: 0;
  }
}
.enhanced-tab-content {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  overflow: hidden;
}
.linen-bg {
  background: #fafafa;
}
.collapsible-section {
  background: #fdf7f1;
  border-radius: 20px;
  border: 1.5px solid #b3d8fd;
  box-shadow: 0 2px 12px rgba(64,158,255,0.04);
  margin-bottom: 24px;
  padding: 8px 8px 20px 8px;
}
.preview-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 16px;
  padding: 18px 28px;
  margin: 16px 0 0 0;
  font-weight: 700;
  color: #3b82f6;
  font-size: 15px;
  box-shadow: none;
  border: 1.5px solid #b3d8fd;
  transition: background 0.2s, border-color 0.2s;
}
.preview-bar:hover {
  background: #f0f4ff;
  border-color: #3b82f6;
}
.preview-text {
  color: #3b82f6;
  font-weight: 700;
  font-size: 15px;
}
.toggle-icon {
  color: #3b82f6;
  font-size: 20px;
  transition: transform 0.3s;
}
.toggle-icon.is-active {
  transform: rotate(180deg);
}
.collapsible-content {
  background: transparent;
  border-radius: 0 0 16px 16px;
  padding: 0 0 24px 0;
  border: none;
}
.info-grid, .enhanced-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 18px;
  margin-top: 0;
  padding: 16px 24px;
}
.info-row, .enhanced-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f5f8fd;
  border-radius: 16px;
  box-shadow: 0 1px 6px rgba(64,158,255,0.06);
  padding: 18px 24px;
  margin-bottom: 0;
  border: 1px solid #e3eaf5;
  transition: box-shadow 0.18s, background 0.18s;
  gap: 18px;
}
.info-row:hover, .enhanced-info-row:hover {
  background: #eaf3fa;
  box-shadow: 0 4px 16px rgba(64,158,255,0.10);
}
.info-label, .enhanced-info-label {
  color: #3b82f6 !important;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.01em;
  margin-right: 16px;
  min-width: 120px;
  flex: 1;
  text-align: left;
}
.info-value, .enhanced-info-value {
  color: #1e293b;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.01em;
  margin-left: 8px;
  word-break: break-word;
  text-align: right;
  flex: 1;
}
@media (max-width: 768px) {
  .info-grid, .enhanced-info-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .info-row, .enhanced-info-row {
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 12px;
    gap: 6px;
  }
  .info-label, .enhanced-info-label {
    margin-right: 0;
    margin-bottom: 2px;
  }
  .info-value, .enhanced-info-value {
    margin-left: 0;
  }
}
.additional-sections {
  display: grid;
  gap: 16px;
}
.section-card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}
.section-header {
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;
}
.section-header:hover {
  background-color: #f8fafc;
}
.section-content {
  padding: 24px;
}
.achievements-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.achievement-tag {
  margin-right: 8px;
  margin-bottom: 8px;
}
.classes-list {
  display: grid;
  gap: 16px;
}
.class-card {
  background: #f5f7fa;
  padding: 16px;
  border-radius: 8px;
}
.class-name {
  font-size: 16px;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 8px;
}
.class-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 14px;
}
.separator {
  color: #e2e8f0;
}
.documents-list {
  display: grid;
  gap: 12px;
}
.document-card {
  background: #f5f7fa;
  padding: 12px 16px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.document-name {
  color: #409EFF;
}
.notes-content {
  background: #f5f7fa;
  padding: 16px;
  border-radius: 8px;
}
.note-text {
  color: #64748b;
  line-height: 1.6;
}
.empty-state {
  text-align: center;
  padding: 32px;
  color: #94a3b8;
}
.not-found {
  text-align: center;
  padding: 48px;
  color: #94a3b8;
  font-size: 16px;
}
.accordion-slide-enter-active,
.accordion-slide-leave-active {
  transition: all 0.3s ease-out;
}
.accordion-slide-enter-from,
.accordion-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.forms-section {
  padding: 24px;
}
.forms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
.form-card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.form-card:hover {
  transform: translateY(-4px);
}
.form-preview {
  height: 200px;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.form-info {
  padding: 16px;
}
.form-info h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #1e293b;
}
.form-info p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}
.form-actions {
  padding: 16px;
  display: flex;
  gap: 8px;
  border-top: 1px solid #ebeef5;
}
.student-name {
  font-size: 1.25rem;
}
/* Professional ERP Tab Animation System */
.tab-content-3d {
  position: relative;
  overflow: hidden;
}

/* Clean Professional Tab Transitions */
.tab-3d-enter-active, .tab-3d-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
}

.tab-3d-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.tab-3d-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.tab-3d-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.tab-3d-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

/* Professional ERP Tab Buttons */
.custom-tab-btn {
  border: 2px solid #40a9ff;
  background: #fff;
  color: #3b82f6;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  min-width: 120px;
  flex: 0 0 auto;
  letter-spacing: 0.01em;
}

.custom-tab-btn.active,
.custom-tab-btn:focus {
  background: #40a9ff;
  color: #ffffff;
  box-shadow: 0 2px 4px rgba(64,158,255,0.2);
  border-color: #3b82f6;
}

.custom-tab-btn:hover:not(.active) {
  background: #f0f9ff;
  border-color: #3b82f6;
  box-shadow: 0 2px 4px rgba(64,158,255,0.1);
}

/* Professional Card Hover Effects */
.info-row, .enhanced-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f5f8fd;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 18px 24px;
  margin-bottom: 0;
  border: 1px solid #e3eaf5;
  transition: all 0.2s ease;
  gap: 18px;
}

.info-row:hover, .enhanced-info-row:hover {
  background: #f0f9ff;
  box-shadow: 0 2px 8px rgba(64,158,255,0.15);
  border-color: #3b82f6;
}

/* Professional Section Cards */
.bg-white {
  transition: box-shadow 0.2s ease;
}

.bg-white:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* Subtle Gradient Card Effects */
[class*="bg-gradient-to-r"] {
  transition: box-shadow 0.2s ease;
}

[class*="bg-gradient-to-r"]:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

/* Professional Loading Animations */
.animate-spin {
  animation: professional-spin 1s linear infinite;
}

@keyframes professional-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Subtle Button Feedback */
button:active {
  transform: scale(0.98);
  transition: transform 0.1s ease;
}

/* Professional Focus States */
button:focus,
input:focus,
select:focus {
  outline: 2px solid #40a9ff;
  outline-offset: 2px;
}
</style> 