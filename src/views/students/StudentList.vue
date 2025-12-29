<template>
  <div class="relative w-full min-h-screen pl-0 pr-0 sm:pl-0 sm:pr-0 lg:pl-1 lg:pr-0 py-2 sm:py-3 lg:py-4">
    <!-- View Mode Tabs -->
    <div class="relative z-10 w-full mb-6 flex justify-end">
      <div class="flex bg-white rounded-full shadow-lg p-1 border border-gray-200">
        <template v-for="(tab, idx) in viewTabs" :key="tab.key">
          <button 
            @click="setViewMode(tab.key)"
            :class="[
              (viewMode === tab.key ? 'px-3' : 'px-4'),
              'py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform relative overflow-hidden',
              viewMode === tab.key 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105' 
                : 'text-purple-600 hover:text-purple-700 hover:bg-purple-50 hover:scale-102'
            ]"
          >
            <span class="relative z-10 flex items-center gap-2">
              <svg v-if="tab.key === 'student'" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              <svg v-else-if="tab.key === 'class'" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/>
              </svg>
              <svg v-else-if="tab.key === 'family'" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
              </svg>
              {{ tab.label }}
              <span v-if="tab.count !== null" class="px-2 py-0.5 rounded-full text-xs font-bold bg-white text-purple-700 border border-purple-200 ml-1">
                {{ tab.count }}
              </span>
            </span>
            <div 
              v-if="viewMode === tab.key" 
              class="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-pulse rounded-full"
            ></div>
          </button>
          <div
            v-if="idx < viewTabs.length - 1"
            class="h-6 w-px bg-purple-200 mx-1 self-center"
          ></div>
        </template>
      </div>
    </div>

    <!-- Top Bar Header -->
    <div class="relative z-10 w-full mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
      <h2 class="text-base font-medium text-gray-900 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        Student List - {{ currentViewLabel }}
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-600">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Dashboard</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">Students</span>
      </nav>
    </div>

    <!-- Select Criteria Label -->
    <div class="relative z-10 w-full mb-2">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-900 tracking-tight">Select Criteria</h3>
        <div class="h-[2px] bg-purple-200 w-full transition-all duration-300" style="max-width: 110px"></div>
      </div>
    </div>

    <!-- Filter Bar in Card -->
    <div class="relative z-10 w-full rounded-lg transition-all duration-500 ease-in-out transform hover:shadow-lg bg-white p-4">
      <form class="w-full" @submit.prevent="handleSearch">
        <div class="flex flex-wrap items-end gap-x-4 gap-y-3">
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

          <div class="flex flex-col w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] lg:flex-1">
            <label class="mb-1 text-base font-normal text-black modern-font">Section</label>
            <div class="relative">
              <select v-model="selectedSection" class="h-9 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="">All</option>
                <option v-for="section in sections" :key="section.id" :value="section.id">{{ section.name }}</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
          <div class="flex flex-col w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] lg:flex-1">
            <label class="mb-1 text-base font-normal text-black modern-font">Status</label>
            <div class="relative">
              <select v-model="selectedStatus" class="h-9 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="graduated">Graduated</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
          <div class="flex flex-col w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] lg:flex-1">
            <label class="mb-1 text-base font-normal text-black modern-font">Date</label>
            <div class="relative">
              <CompactDatePicker
                v-model="selectedDate"
                placeholder=""
              />
              <div class="absolute left-0 right-0 bottom-0 h-[1.5px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-3">
          <div class="flex items-center gap-2">
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
            <button 
              type="button"
              @click="handleAddStudent"
              class="h-9 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-sm hover:shadow-md transform origin-left hover:scale-105 flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
              </svg>
              Add Student
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
          Students List ({{ total }})
        </h3>
        <div class="h-[2px] bg-purple-200 w-full transition-all duration-500" style="max-width: 120px"></div>
      </div>
      <!-- Quick Search (center) -->
      <div class="flex-1 flex justify-center">
        <div class="relative w-full max-w-xs flex items-center">
          <span class="absolute left-0 top-1/2 -translate-y-1/2 pl-2 text-purple-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            type="text"
            placeholder="QUICK SEARCH"
            class="w-full border-0 bg-transparent pl-10 pr-0 py-2 text-gray-900 font-medium text-xs tracking-wider uppercase focus:ring-0 focus:outline-none transition placeholder:text-gray-600 placeholder:font-medium placeholder:opacity-100 placeholder:text-xs shadow-none"
            style="letter-spacing:0.08em;"
          />
          <div class="absolute left-0 right-0 bottom-0 h-[1.5px] bg-purple-200 pointer-events-none"></div>
        </div>
      </div>
    </div>
    <div class="relative z-10 w-full">
      <div class="h-[2px] w-full bg-purple-200 mb-4"></div>
    </div>

    <!-- Loader -->
    <div v-if="loading || filtersLoading" class="relative z-10 w-full">
      <div class="border border-gray-200 rounded-xl p-8 bg-white/40 shadow-sm">
        <div class="flex flex-col items-center justify-center py-12">
          <!-- Modern Loading Animation -->
          <div class="relative mb-6">
            <div class="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-500 rounded-full animate-ping opacity-20"></div>
          </div>
          <div class="text-center">
            <p class="text-gray-600 font-medium text-lg mb-1">{{ filtersLoading ? 'Loading Filters' : 'Loading Students' }}</p>
            <p class="text-gray-500 text-sm font-normal">Please wait while we fetch the data...</p>
            <div class="flex justify-center mt-3 space-x-1">
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Students Table -->
    <div v-else class="relative z-10 w-full">
                  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Table Loading State -->
        <div v-if="loading" class="p-8">
          <div class="flex flex-col items-center justify-center py-12">
            <div class="relative mb-6">
              <div class="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            </div>
            <p class="text-gray-600 font-medium">Loading table data...</p>
          </div>
        </div>
        
        <!-- Table Content -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gradient-to-r from-indigo-50 to-purple-50">
              <tr>
                <th v-for="col in tableColumns" :key="col.key" @click="handleSort(col.key)" class="py-2 px-2 font-medium text-gray-600 text-sm tracking-wider cursor-pointer select-none group transition-all duration-150 hover:bg-purple-50 border-b-2 border-purple-400 relative #ffffffspace-nowrap">
                  <span class="flex items-center gap-1">
                    {{ col.label }}
                    <span class="flex flex-col ml-1">
                      <svg v-if="sortBy === col.key && sortDirection === 'asc'" class="w-3 h-3 text-purple-500 transform -rotate-180" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                      <svg v-else-if="sortBy === col.key && sortDirection === 'desc'" class="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                      <svg v-else class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                    </span>
                  </span>
                  <span class="absolute left-0 bottom-0 w-full h-0.5 bg-purple-100 opacity-0 group-hover:opacity-100 transition"></span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <template v-for="(student, idx) in students" :key="student.id">
                <tr :class="[ 'hover:bg-indigo-50 transition-colors', 'border-b border-purple-200', idx === students.length - 1 ? 'border-b-2 border-purple-400' : '' ]">
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">
                    <div class="flex items-center gap-2">
                      <div class="relative w-7 h-7">
                        <img 
                          v-if="getProfilePicture(student)"
                          :src="getProfilePicture(student)" 
                          :alt="student.first_name"
                          class="w-7 h-7 rounded-full object-cover border border-gray-200"
                          @error="handleImageError"
                        />
                        <div 
                          v-else
                          class="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-medium border border-gray-200 initials-fallback"
                          :style="{ display: getProfilePicture(student) ? 'none' : 'flex' }"
                        >
                          {{ getStudentInitials(student) }}
                        </div>
                      </div>
                      <button 
                         @click="student && toggleStudentDetails(student.id)"
                         class="p-1 rounded-full hover:bg-white transition-colors duration-200"
                         title="Toggle Details"
                       >
                        <svg 
                          class="w-4 h-4 text-gray-600 transition-transform duration-200"
                          :class="{ 'rotate-90': expandedStudents[student.id] }"
                          fill="none" 
                          stroke="currentColor" 
                          stroke-width="2" 
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                        </svg>
                      </button>
                      <div>
                        <div class="text-xs text-gray-900">{{ student.first_name }} {{ student.last_name }}</div>
                        <div v-if="student.email" class="text-xs text-gray-900/50 leading-tight">{{ student.email }}</div>
                      </div>
                    </div>
                  </td>

                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">
                    <div class="text-xs text-gray-900">
                      {{ sections.find(s => s.id === student.section_id)?.name || '-' }}
                    </div>
                  </td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">
                    <div class="text-xs text-gray-900">
                      {{ student.roll_number || '-' }}
                    </div>
                  </td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">
                    <span :class="[
                      'px-2 inline-flex text-xs leading-5 font-medium rounded-full',
                      getStudentStatus(student) === 'active' ? 'bg-green-100 text-green-700' : 
                      getStudentStatus(student) === 'inactive' ? 'bg-red-100 text-red-700' : 
                      'bg-yellow-100 text-yellow-700'
                    ]">
                      {{ getStudentStatus(student) }}
                    </span>
                  </td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">
                    <div class="flex items-center gap-2 justify-center">
                      <!-- Action Buttons - Same as screenshot design -->
                      <button 
                        @click="handleView(student)"
                        class="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-1 rounded-full text-xs font-medium transition-colors duration-200"
                        title="View Profile"
                      >
                        View
                      </button>
                      
                      <button 
                        @click="handleEdit(student)"
                        class="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full text-xs font-medium transition-colors duration-200"
                        title="Edit Student"
                      >
                        Edit
                      </button>
                      
                      <button 
                        @click="handleDelete(student)"
                        class="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-xs font-medium transition-colors duration-200"
                        title="Delete Student"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                
                                 <!-- Expandable Details Row -->
                 <tr v-if="student && expandedStudents[student.id]" class="bg-white border-b border-gray-200">
                <td colspan="6" class="px-6 py-4">
                  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      
                      <!-- Personal Information -->
                      <div class="bg-blue-50 rounded-lg p-3">
                        <h4 class="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                          <svg class="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                          </svg>
                          Personal Information
                        </h4>
                        <div class="space-y-3 text-xs">
                          <div class="flex justify-between pb-2 border-b-2 border-blue-200">
                            <span class="text-gray-600">Date of Birth:</span>
                            <span class="font-medium">{{ student.date_of_birth || 'N/A' }}</span>
                          </div>
                          <div class="flex justify-between pb-2 border-b-2 border-purple-200">
                            <span class="text-gray-600">Gender:</span>
                            <span class="font-medium">{{ student.gender || 'N/A' }}</span>
                          </div>
                          <div class="flex justify-between pb-2 border-b-2 border-green-200">
                            <span class="text-gray-600">Phone:</span>
                            <span class="font-medium">{{ student.contact_info?.phone || 'N/A' }}</span>
                          </div>
                          <div class="flex justify-between pb-2 border-b-2 border-orange-200">
                            <span class="text-gray-600">Address:</span>
                            <span class="font-medium text-right">{{ student.contact_info?.address || 'N/A' }}</span>
                          </div>
                        </div>
                      </div>

                      <!-- Academic Information -->
                      <div class="bg-green-50 rounded-lg p-3">
                        <h4 class="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                          <svg class="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                          </svg>
                          Academic Information
                        </h4>
                        <div class="space-y-3 text-xs">
                          <div class="flex justify-between pb-2 border-b-2 border-purple-200">
                            <span class="text-gray-600">Section:</span>
                            <span class="font-medium">{{ sections.find(s => s.id === student.section_id)?.name || 'N/A' }}</span>
                          </div>
                          <div class="flex justify-between pb-2 border-b-2 border-green-200">
                            <span class="text-gray-600">Roll Number:</span>
                            <span class="font-medium">{{ student.roll_number || 'N/A' }}</span>
                          </div>
                          <div class="flex justify-between pb-2 border-b-2 border-orange-200">
                            <span class="text-gray-600">Admission Date:</span>
                            <span class="font-medium">{{ student.admission_date || 'N/A' }}</span>
                          </div>
                        </div>
                      </div>

                      <!-- Family Information -->
                      <div class="bg-purple-50 rounded-lg p-3">
                        <h4 class="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                          <svg class="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                          </svg>
                          Family Information
                        </h4>
                        <div class="space-y-3 text-xs">
                          <div class="flex justify-between pb-2 border-b-2 border-blue-200">
                            <span class="text-gray-600">Father's Name:</span>
                            <span class="font-medium">{{ student.family_info?.father_name || 'N/A' }}</span>
                          </div>
                          <div class="flex justify-between pb-2 border-b-2 border-pink-200">
                            <span class="text-gray-600">Mother's Name:</span>
                            <span class="font-medium">{{ student.family_info?.mother_name || 'N/A' }}</span>
                          </div>
                          <div class="flex justify-between pb-2 border-b-2 border-green-200">
                            <span class="text-gray-600">Guardian Phone:</span>
                            <span class="font-medium">{{ student.family_info?.guardian_phone || student.family_info?.father_phone || 'N/A' }}</span>
                          </div>
                          <div class="flex justify-between pb-2 border-b-2 border-purple-200">
                            <span class="text-gray-600">CNIC:</span>
                            <span class="font-medium">{{ student.family_info?.father_cnic || 'N/A' }}</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </td>
              </tr>
              </template>
            </tbody>
          </table>

          <!-- No Data State -->
          <div v-if="students.length === 0" class="py-12">
            <div class="flex flex-col items-center justify-center">
              <div class="relative mb-4">
                <div class="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <svg class="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="absolute -top-2 -right-2 w-4 h-4 bg-purple-100 rounded-full animate-ping opacity-20"></div>
                <div class="absolute -bottom-2 -left-2 w-3 h-3 bg-indigo-100 rounded-full animate-pulse"></div>
              </div>
              <div class="text-center max-w-xs mx-auto">
                <div class="text-lg font-light text-gray-500 mb-1">No Students Found</div>
                <div class="text-gray-500 text-base font-light mb-2">We couldn't find any students matching your current filters.</div>
                <div class="flex flex-wrap justify-center gap-2 text-xs text-gray-500 font-light">
                  <span class="px-2 py-1 bg-white rounded-full">• Check filters</span>
                  <span class="px-2 py-1 bg-white rounded-full">• Clear search</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

    <!-- Pagination Section (separate from table) -->
    <div v-if="!loading && !filtersLoading && students.length > 0" class="relative z-10 w-full mt-8">
      <!-- Pagination Summary -->
      <div class="flex flex-row items-center justify-between mb-4">
        <div class="text-gray-600 text-sm font-medium px-2">
          Showing {{ (currentPage - 1) * pageSize + 1 }}
          to {{ Math.min(currentPage * pageSize, total) }}
          of {{ total }} entries
        </div>
        <div class="flex items-center gap-4">
          <label class="text-sm text-gray-600 font-medium flex items-center gap-1">
            Per page:
            <select v-model="pageSize" @change="handleCurrentChange(1)" class="rounded-md border border-purple-200 bg-white px-2 py-1 text-xs font-semibold text-purple-700 focus:ring-2 focus:ring-purple-300">
              <option v-for="size in [10, 20, 50, 100]" :key="size" :value="size">{{ size }}</option>
            </select>
          </label>
          <label class="text-sm text-gray-600 font-medium flex items-center gap-1 mr-3">
            Go to page:
            <input v-model.number="pageInput" type="number" min="1" :max="totalPages" class="w-16 rounded-md border border-purple-200 px-2 py-1 text-xs font-semibold text-purple-700 focus:ring-2 focus:ring-purple-300" @keyup.enter="goToPage(pageInput)" />
            <button @click="goToPage(pageInput)" class="ml-1 px-2 py-1 rounded-md bg-purple-500 text-white text-xs font-semibold hover:bg-purple-600 transition-all flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
              Go
            </button>
          </label>
        </div>
      </div>

      <!-- Pagination Controls -->
      <div class="flex justify-center">
        <div class="flex items-center gap-2">
          <button
            class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-50 text-purple-500 text-xl font-bold shadow-sm transition-all duration-200 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-40 disabled:cursor-not-allowed"
            :disabled="currentPage === 1"
            @click="handleCurrentChange(currentPage - 1)"
            aria-label="Previous"
          >
            <span>&larr;</span>
          </button>
          <span class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-600 text-white text-base font-bold shadow-md">
            {{ currentPage }}
          </span>
          <button
            class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-50 text-purple-500 text-xl font-bold shadow-sm transition-all duration-200 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-40 disabled:cursor-not-allowed"
            :disabled="currentPage === totalPages"
            @click="handleCurrentChange(currentPage + 1)"
            aria-label="Next"
          >
            <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Student Details Sliding Panel -->
    <div 
      v-if="showDetailsPanel" 
      class="fixed inset-0 z-50 overflow-hidden"
      @click="closeDetailsPanel"
    >
      <div class="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"></div>
      <div class="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
        <div class="flex flex-col h-full">
          <!-- Header -->
          <div class="bg-gradient-to-r from-indigo-600 to-purple-700 px-6 py-4 text-white">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">Student Details</h3>
              <button 
                @click="closeDetailsPanel"
                class="rounded-full bg-white/20 p-2 hover:bg-white/30 transition-colors duration-200"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loadingDetails" class="flex-1 flex items-center justify-center">
            <div class="text-center">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p class="text-gray-600">Loading student details...</p>
            </div>
          </div>

          <!-- Content -->
          <div v-else-if="selectedStudentDetails" class="flex-1 overflow-y-auto p-6 space-y-6">
            <!-- Profile Section -->
            <div class="text-center">
              <div class="relative mx-auto w-24 h-24 mb-4">
                <img 
                  v-if="getProfilePicture(selectedStudentDetails)"
                  :src="getProfilePicture(selectedStudentDetails)" 
                  :alt="selectedStudentDetails.first_name"
                  class="w-full h-full rounded-full object-cover border-4 border-indigo-100"
                  @error="handleImageError"
                />
                <div 
                  v-else
                  class="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-medium border-4 border-indigo-100 initials-fallback"
                  :style="{ display: getProfilePicture(selectedStudentDetails) ? 'none' : 'flex' }"
                >
                  {{ getStudentInitials(selectedStudentDetails) }}
                </div>
                <div class="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-200"></div>
              </div>
              <h4 class="text-xl font-bold text-gray-900">
                {{ selectedStudentDetails.first_name }} {{ selectedStudentDetails.last_name }}
              </h4>
              <p class="text-gray-600">{{ selectedStudentDetails.email }}</p>
            </div>

            <!-- Quick Stats -->
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                <div class="text-2xl font-bold text-purple-600">{{ selectedStudentDetails.roll_number || 'N/A' }}</div>
                <div class="text-sm text-gray-600">Roll Number</div>
              </div>
              <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                <div class="text-2xl font-bold text-green-600">{{ selectedStudentDetails.section?.name || sections.find(s => s.id === selectedStudentDetails.section_id)?.name || 'N/A' }}</div>
                <div class="text-sm text-gray-600">Section</div>
              </div>
            </div>

            <!-- Personal Information -->
            <div class="bg-white rounded-lg p-4">
              <h5 class="font-semibold text-gray-900 mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Personal Information
              </h5>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Date of Birth:</span>
                  <span class="font-medium">{{ selectedStudentDetails.date_of_birth || 'N/A' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Gender:</span>
                  <span class="font-medium">{{ selectedStudentDetails.gender || 'N/A' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Phone:</span>
                  <span class="font-medium">{{ selectedStudentDetails.contact_info?.phone || 'N/A' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Address:</span>
                  <span class="font-medium text-right">{{ selectedStudentDetails.contact_info?.address || 'N/A' }}</span>
                </div>
              </div>
            </div>

            <!-- Academic Information -->
            <div class="bg-white rounded-lg p-4">
              <h5 class="font-semibold text-gray-900 mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
                Academic Information
              </h5>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Section:</span>
                  <span class="font-medium">{{ selectedStudentDetails.section?.name || sections.find(s => s.id === selectedStudentDetails.section_id)?.name || 'N/A' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Admission Date:</span>
                  <span class="font-medium">{{ selectedStudentDetails.admission_date || 'N/A' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Status:</span>
                  <span :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    selectedStudentDetails.status === 'active' ? 'bg-green-100 text-green-700' : 
                    selectedStudentDetails.status === 'inactive' ? 'bg-red-100 text-red-700' : 
                    'bg-yellow-100 text-yellow-700'
                  ]">
                    {{ selectedStudentDetails.status }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Family Information -->
            <div v-if="selectedStudentDetails.family_info" class="bg-white rounded-lg p-4">
              <h5 class="font-semibold text-gray-900 mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                Family Information
              </h5>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Father's Name:</span>
                  <span class="font-medium">{{ selectedStudentDetails.family_info.father_name || 'N/A' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Mother's Name:</span>
                  <span class="font-medium">{{ selectedStudentDetails.family_info.mother_name || 'N/A' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Guardian Phone:</span>
                  <span class="font-medium">{{ selectedStudentDetails.family_info.guardian_phone || selectedStudentDetails.family_info.father_phone || 'N/A' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">CNIC:</span>
                  <span class="font-medium">{{ selectedStudentDetails.family_info.father_cnic || 'N/A' }}</span>
                </div>
              </div>
            </div>

            <!-- Recent Activity -->
            <div class="bg-white rounded-lg p-4">
              <h5 class="font-semibold text-gray-900 mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Recent Activity
              </h5>
              <div class="space-y-2">
                <div class="flex items-center text-sm text-gray-600">
                  <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Last attendance: {{ selectedStudentDetails.last_attendance || 'N/A' }}
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <div class="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Last fee payment: {{ selectedStudentDetails.last_fee_payment || 'N/A' }}
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <div class="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Profile updated: {{ selectedStudentDetails.updated_at || 'N/A' }}
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="p-6 bg-white border-t">
            <div class="flex gap-3">
              <button 
                @click="handleEdit(selectedStudentDetails)"
                class="flex-1 bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-2 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-800 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                Edit Profile
              </button>
              <button 
                @click="handleView(selectedStudentDetails)"
                class="flex-1 bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-2 px-4 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-800 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                Full View
              </button>
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
import { ElMessage, ElMessageBox } from 'element-plus'
import { useToast } from 'vue-toastification'
import { View, Edit, Delete, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import api from '@/utils/axios'
import LoadingStudents from '@/components/LoadingStudents.vue'
import CompactDatePicker from '@/components/CompactDatePicker.vue'

// Use centralized axios instance
const axios = api

const router = useRouter()
const toast = useToast()
const loading = ref(false)
const filtersLoading = ref(false)
const searchQuery = ref('')
const selectedSection = ref('')
const selectedStatus = ref('active')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const students = ref([])
const sections = ref([])
const viewMode = ref('student')
const sortBy = ref('')
const sortDirection = ref('asc')
const selectedDate = ref('')
const showDetailsPanel = ref(false)
const selectedStudentDetails = ref(null)
const loadingDetails = ref(false)
const pageInput = ref(1)
const expandedStudents = ref({})

// Table columns configuration
const tableColumns = [
  { key: 'student', label: 'Student Name' },
  { key: 'section', label: 'Section' },
  { key: 'roll', label: 'Roll No' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' }
]

// View tabs configuration
const viewTabs = computed(() => [
  {
    key: 'student',
    label: 'Student Wise',
    count: students.value.length
  },
  {
    key: 'family',
    label: 'Family Wise',
    count: 0
  }
])

// Computed properties
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

const paginationItems = computed(() => {
  const items = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 4) {
    for (let i = 1; i <= total; i++) {
      items.push({ type: 'page', page: i, key: `page-${i}` })
    }
    return items
  }
  
  items.push({ type: 'page', page: 1, key: 'page-1' })
  
  if (current === 1) {
    items.push({ type: 'page', page: 2, key: 'page-2' })
    if (total > 3) items.push({ type: 'ellipsis', key: 'ellipsis-1' })
  } else if (current === 2) {
    items.push({ type: 'page', page: 2, key: 'page-2' })
    items.push({ type: 'page', page: 3, key: 'page-3' })
    if (total > 4) items.push({ type: 'ellipsis', key: 'ellipsis-2' })
  } else if (current >= total - 1) {
    if (total > 4) items.push({ type: 'ellipsis', key: 'ellipsis-3' })
    items.push({ type: 'page', page: total - 2, key: `page-${total - 2}` })
    items.push({ type: 'page', page: total - 1, key: `page-${total - 1}` })
  } else {
    items.push({ type: 'ellipsis', key: 'ellipsis-4' })
    items.push({ type: 'page', page: current, key: `page-${current}` })
    items.push({ type: 'page', page: current + 1, key: `page-${current + 1}` })
    items.push({ type: 'ellipsis', key: 'ellipsis-5' })
  }
  
  items.push({ type: 'page', page: total, key: `page-${total}` })
  return items
})

const currentViewLabel = computed(() => {
  const tab = viewTabs.value.find(t => t.key === viewMode.value)
  return tab ? tab.label : 'Student Wise'
})

// Methods
const fetchStudents = async () => {
  loading.value = true
  try {
    const params = {
      page: currentPage.value,
      per_page: pageSize.value,
      search: searchQuery.value,
      section_id: selectedSection.value || null,
      status: selectedStatus.value,
      sort_by: sortBy.value,
      sort_direction: sortDirection.value
    }
    if (selectedDate.value) {
      params.date = selectedDate.value
    }
    const response = await axios.get('/students', { params })
    if (response.data.status) {
      students.value = response.data.result.data || []
      total.value = response.data.result.total || 0
    } else {
      toast.error(response.data.message || 'Failed to fetch students')
    }
  } catch (error) {
    console.error('Error fetching students:', error)
    toast.error(error.response?.data?.message || 'Failed to fetch students')
  } finally {
    loading.value = false
  }
}



const fetchSections = async () => {
  filtersLoading.value = true
  try {
    const sectionRes = await axios.get(`${import.meta.env.VITE_API_URL}/sections`)
    if (sectionRes.data.success && Array.isArray(sectionRes.data.result)) {
      sections.value = sectionRes.data.result.map(section => ({
        id: section.id,
        name: section.name
      }))
    } else {
      sections.value = []
    }
  } catch (e) {
    sections.value = []
    toast.error('Failed to fetch sections')
  } finally {
    filtersLoading.value = false
  }
}

const handleSearch = () => {
  currentPage.value = 1
  fetchStudents()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchStudents()
}

const handleAddStudent = () => {
  try {
    console.log('Navigating to add student page...')
    router.push('/students/add')
  } catch (error) {
    console.error('Error navigating to add student:', error)
    toast.error('Failed to navigate to add student page')
  }
}

const handleEdit = (student) => {
  try {
    if (!student || !student.id) {
      toast.error('Invalid student data')
      return
    }
    console.log('Navigating to edit student:', student.id)
    router.push(`/students/edit/${student.id}`)
  } catch (error) {
    console.error('Error navigating to edit student:', error)
    toast.error('Failed to navigate to edit student page')
  }
}

const handleView = (student) => {
  router.push(`/students/${student.id}`)
}

const handleDelete = async (student) => {
  try {
    await ElMessageBox.confirm(
      `Are you sure you want to delete student ${student.first_name} ${student.last_name}?`,
      'Delete Student?',
      {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }
    )
    
    const response = await axios.delete(`/students/${student.id}`, {
      withCredentials: true
    })
    if (response.data.success) {
      toast.success('Student deleted successfully')
      fetchStudents()
    } else {
      throw new Error(response.data.message || 'Failed to delete student')
    }
  } catch (error) {
    if (error !== 'cancel') {
      toast.error(error.response?.data?.message || 'Failed to delete student')
    }
  }
}

const getStudentInitials = (student) => {
  if (!student) return 'ST'
  const firstName = student.first_name || ''
  const lastName = student.last_name || ''
  
  const firstInitial = firstName.charAt(0).toUpperCase()
  const lastInitial = lastName.charAt(0).toUpperCase()
  
  return `${firstInitial}${lastInitial}` || 'ST'
}

const getProfilePicture = (student) => {
  if (student.profile_picture) {
    // If it's a full URL, return as is
    if (student.profile_picture.startsWith('http')) {
      return student.profile_picture
    }
    // If it's a relative path, construct the full URL
    return `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/storage/${student.profile_picture}`
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

const getStudentStatus = (student) => {
  // Return student's active status, not fee status
  return student.is_active || student.status === 'active' || student.status === 1 ? 'active' : 'inactive'
}

const handleSort = (key) => {
  if (sortBy.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = key
    sortDirection.value = 'asc'
  }
  fetchStudents()
}

const setViewMode = (mode) => {
  if (viewMode.value === mode) return
  viewMode.value = mode
  // Add logic to handle different view modes
}

const showStudentDetails = async (student) => {
  selectedStudentDetails.value = student
  showDetailsPanel.value = true
  loadingDetails.value = true
  
  try {
    // Fetch detailed student information
    const response = await axios.get(`/students/${student.id}`)
    if (response.data.status) {
      selectedStudentDetails.value = response.data.result
    } else {
      toast.error('Failed to load student details')
    }
  } catch (error) {
    console.error('Error fetching student details:', error)
    toast.error('Failed to load student details')
  } finally {
    loadingDetails.value = false
  }
}

const closeDetailsPanel = () => {
  showDetailsPanel.value = false
  selectedStudentDetails.value = null
  loadingDetails.value = false
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    handleCurrentChange(page)
  }
}

const toggleStudentDetails = (studentId) => {
  if (studentId) {
    expandedStudents.value[studentId] = !expandedStudents.value[studentId]
  }
}

// Lifecycle hooks
onMounted(async () => {
  // Load filters first, then students
  await fetchSections()
  fetchStudents()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Poppins', sans-serif !important;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.min-h-screen {
  min-height: 100vh;
}

.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.from-indigo-100 {
  --tw-gradient-from: #e0e7ff;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(224, 231, 255, 0));
}

.via-purple-100 {
  --tw-gradient-stops: var(--tw-gradient-from), #f3e8ff, var(--tw-gradient-to, rgba(243, 232, 255, 0));
}

.to-pink-100 {
  --tw-gradient-to: #fce7f3;
}

.max-w-7xl {
  max-width: 80rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.p-4 {
  padding: 1rem;
}

@media (min-width: 640px) {
  .sm\:p-6 {
    padding: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .lg\:p-8 {
    padding: 2rem;
  }
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-4 {
  gap: 1rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.ml-4 {
  margin-left: 1rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}

.font-medium {
  font-weight: 500;
}

.text-gray-600 {
  color: #2c5282;
}

.tracking-tight {
  letter-spacing: -0.025em;
}

.text-gray-500 {
  color: #64748b;
}

.hover\:text-purple-600:hover {
  color: #8b5cf6;
}

.cursor-pointer {
  cursor: pointer;
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.duration-200 {
  transition-duration: 200ms;
}

.text-gray-900 {
  color: #3b82f6;
}

.font-bold {
  font-weight: 700;
}

.mt-6 {
  margin-top: 1.5rem;
}

.bg-white {
  background-color: #ffffff;
}

.overflow-hidden {
  overflow: hidden;
}

.overflow-x-auto {
  overflow-x: auto;
}

.min-w-full {
  min-width: 100%;
}

.divide-y > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-y-reverse: 0;
  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
}

.divide-gray-200 > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-opacity: 1;
  border-color: rgba(229, 231, 235, var(--tw-divide-opacity));
}

.bg-white {
  background-color: #f8fafc;
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.text-left {
  text-align: left;
}

.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

.uppercase {
  text-transform: uppercase;
}

.tracking-wider {
  letter-spacing: 0.05em;
}

.text-gray-500 {
  color: #94a3b8;
}

.hover\:bg-white:hover {
  background-color: #f8fafc;
}

.space-nowrap {
  white-space: nowrap;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.h-10 {
  height: 2.5rem;
}

.w-10 {
  width: 2.5rem;
}

.ml-4 {
  margin-left: 1rem;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.text-gray-900 {
  color: #1e293b;
}

.text-gray-500 {
  color: #94a3b8;
}

.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.inline-flex {
  display: inline-flex;
}

.leading-5 {
  line-height: 1.25rem;
}

.rounded-full {
  border-radius: 9999px;
}

.bg-green-100 {
  background-color: #f1f5f9;
}

.text-green-800 {
  color: #10b981;
}

.bg-red-100 {
  background-color: #f1f5f9;
}

.text-red-800 {
  color: #ef4444;
}

.bg-yellow-100 {
  background-color: #f1f5f9;
}

.text-yellow-800 {
  color: #f59e0b;
}

.space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  margin-left: calc(0.5rem * var(--tw-space-x-reverse));
}

.text-indigo-600 {
  color: #8b5cf6;
}

.hover\:text-indigo-900:hover {
  color: #8b5cf6;
}

.text-yellow-600 {
  color: #f59e0b;
}

.hover\:text-yellow-900:hover {
  color: #f59e0b;
}

.text-red-600 {
  color: #ef4444;
}

.hover\:text-red-900:hover {
  color: #ef4444;
}

.border-t {
  border-top-width: 1px;
}

.border-gray-200 {
  border-color: #e2e8f0;
}

.sm\:px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.sm\:hidden {
  display: none;
}

.sm\:flex-1 {
  flex: 1 1 0%;
}

.sm\:flex {
  display: flex;
}

.sm\:items-center {
  align-items: center;
}

.sm\:justify-between {
  justify-content: space-between;
}

.relative {
  position: relative;
}

.inline-flex {
  display: inline-flex;
}

.items-center {
  align-items: center;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.border {
  border-width: 1px;
}

.border-gray-200 {
  border-color: #94a3b8;
}

.rounded-md {
  border-radius: 0.375rem;
}

.text-gray-900 {
  color: #1e293b;
}

.hover\:bg-white:hover {
  background-color: #f8fafc;
}

.hidden {
  display: none;
}

.z-0 {
  z-index: 0;
}

.rounded-md {
  border-radius: 0.375rem;
}

.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.-space-x-px > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(-1px * calc(1 - var(--tw-space-x-reverse)));
  margin-left: calc(-1px * var(--tw-space-x-reverse));
}

.rounded-l-md {
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
}

.rounded-r-md {
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.z-10 {
  z-index: 10;
}

.bg-indigo-50 {
  background-color: #f1f5f9;
}

.border-indigo-500 {
  border-color: #8b5cf6;
}

.text-indigo-600 {
  color: #8b5cf6;
}

.text-gray-900 {
  color: #1e293b;
}

@keyframes dot-bounce {
  0%, 80%, 100% { transform: scale(1); opacity: 0.7; }
  40% { transform: scale(1.3); opacity: 1; }
}
.dot-loader {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #a78bfa;
  border-radius: 50%;
  margin: 0 2px;
  animation: dot-bounce 1.4s infinite both;
}
.dot-loader:nth-child(2) { animation-delay: 0.2s; }
.dot-loader:nth-child(3) { animation-delay: 0.4s; }
.animate-spin-slow {
  animation: spin 1.2s linear infinite;
}
@keyframes spin {
  100% { transform: rotate(360deg); }
}
:deep(.custom-date-input .el-input__wrapper) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  min-height: 2.25rem !important;
}
:deep(.custom-date-input .el-input__inner) {
  padding: 0 !important;
  height: 2.25rem !important;
  font-size: 0.875rem !important;
  font-weight: 300 !important;
  color: #64748b !important;
  background: transparent !important;
  font-family: 'Poppins', 'Segoe UI', Arial, sans-serif !important;
  letter-spacing: normal !important;
}
:deep(.custom-date-input .el-input__inner::placeholder) {
  color: #64748b !important;
  font-weight: 300 !important;
  font-size: 0.875rem !important;
}
:deep(.modern-datepicker.el-picker-panel) {
  min-width: 220px !important;
  width: 220px !important;
  font-size: 13px !important;
  border-radius: 8px !important;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
  border: 1px solid #e5e7eb !important;
}
:deep(.modern-datepicker .el-date-table td) {
  height: 28px !important;
  line-height: 28px !important;
  font-size: 13px !important;
}
:deep(.modern-datepicker .el-picker-panel__body) {
  padding: 8px 8px 0 8px !important;
}
:deep(.modern-datepicker .el-picker-panel__content) {
  padding: 0 !important;
}
:deep(.modern-datepicker .el-date-table th) {
  font-size: 12px !important;
  font-weight: 500 !important;
  color: #94a3b8 !important;
}
:deep(.modern-datepicker .el-date-table td.available:hover) {
  background-color: #f1f5f9 !important;
  color: #8b5cf6 !important;
}
:deep(.modern-datepicker .el-date-table td.current) {
  background-color: #8b5cf6 !important;
  color: #ffffff !important;
}
:deep(.modern-datepicker .el-date-table td.today) {
  color: #8b5cf6 !important;
  font-weight: 600 !important;
}
.modern-font {
  font-family: 'Poppins', 'Segoe UI', Arial, sans-serif !important;
  font-weight: 400 !important;
  letter-spacing: normal !important;
}
</style> 