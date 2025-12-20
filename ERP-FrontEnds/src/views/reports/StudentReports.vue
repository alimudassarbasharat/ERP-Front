<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
    <!-- View Mode Tabs (styled like GenerateChallan.vue) -->
    <div class="w-full max-w-7xl mx-auto flex justify-end mb-4">
      <div class="flex bg-white rounded-full shadow-lg p-1 border border-purple-100">
        <button
          @click="setViewMode('student')"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform relative overflow-hidden',
            viewMode === 'student' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105'
              : 'text-purple-600 hover:text-purple-700 hover:bg-purple-50 hover:scale-102'
          ]"
        >
          <span class="relative z-10 flex items-center gap-2">
            Student Wise
            <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-white text-purple-700 border border-purple-200 ml-1">{{paginationData.total}}</span>
          </span>
          <div v-if="viewMode === 'student'" class="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-pulse rounded-full"></div>
        </button>
        <div class="h-6 w-px bg-purple-200 mx-1 self-center"></div>
        <button
          @click="setViewMode('class')"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform relative overflow-hidden',
            viewMode === 'class' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105'
              : 'text-purple-600 hover:text-purple-700 hover:bg-purple-50 hover:scale-102'
          ]"
        >
          <span class="relative z-10 flex items-center gap-2">
            Class Wise
            <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-white text-purple-700 border border-purple-200 ml-1">{{classData.length}}</span>
          </span>
          <div v-if="viewMode === 'class'" class="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-pulse rounded-full"></div>
        </button>
        <div class="h-6 w-px bg-purple-200 mx-1 self-center"></div>
        <button
          @click="setViewMode('family')"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform relative overflow-hidden',
            viewMode === 'family' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105'
              : 'text-purple-600 hover:text-purple-700 hover:bg-purple-50 hover:scale-102'
          ]"
        >
          <span class="relative z-10 flex items-center gap-2">
            Family Wise
            <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-white text-purple-700 border border-purple-200 ml-1">{{familyData.length}}</span>
          </span>
          <div v-if="viewMode === 'family'" class="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-pulse rounded-full"></div>
        </button>
      </div>
    </div>
    <!-- Top Bar Header -->
    <div class="w-full max-w-7xl mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
      <h2 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        Student Reports
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Dashboard</span>
        <span class="mx-2">|</span>
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Reports</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">Student Reports</span>
      </nav>
    </div>

    <!-- Select Criteria Label -->
    <div class="w-full max-w-7xl mx-auto mb-2">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-900 tracking-tight">Select Students</h3>
        <div class="h-[1px] bg-purple-200 w-full transition-all duration-300" style="max-width: 110px"></div>
      </div>
    </div>

    <!-- Filter Bar in Card -->
    <div class="w-full max-w-7xl mx-auto rounded-lg border border-gray-200 bg-white/90 px-4 sm:px-6 py-3 shadow-lg mb-6">
      <form class="w-full" @submit.prevent="fetchStudents">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Class</label>
            <div class="relative">
              <select v-model="selectedClass" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
              <option value="">All Classes</option>
              <option v-for="cls in classes" :key="cls.id" :value="cls.id">{{ cls.name }}</option>
            </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
          </div>
              <div class="absolute left-0 right-0 bottom-0 h-[1px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Section</label>
                        <div class="relative">
              <select v-model="selectedSection" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
              <option value="">All Sections</option>
              <option v-for="section in sections" :key="section.id" :value="section.id">{{ section.name }}</option>
            </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
          </div>
              <div class="absolute left-0 right-0 bottom-0 h-[1px] bg-purple-200 pointer-events-none"></div>
            </div>
            </div>
          <!-- Only show these two filters if not in class view -->
          <template v-if="viewMode !== 'class'">
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Roll Number</label>
            <div class="relative">
              <input v-model="rollNumberQuery" type="text" placeholder="Search by roll number" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full">
              <div class="absolute left-0 right-0 bottom-0 h-[1px] bg-purple-200 pointer-events-none"></div>
          </div>
          </div>
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Search Student</label>
            <div class="relative">
              <input v-model="searchQuery" type="text" placeholder="Search by Name" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full">
              <div class="absolute left-0 right-0 bottom-0 h-[1px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
          </template>
        </div>
        <div class="flex justify-end mt-2">
          <button type="submit" class="h-9 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">Filter</button>
        </div>
      </form>
        </div>

    <!-- Data List Header with Animation -->
    <div class="w-full max-w-7xl mx-auto flex items-center justify-between mb-8">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-900 tracking-tight flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce"></div>
          Student List ({{ paginationData.total }})
        </h3>
        <div class="h-[1px] bg-purple-200 w-full transition-all duration-500" style="max-width: 120px"></div>
      </div>
      <!-- Quick Search (right) -->
      <div class="flex items-center">
        <div class="relative w-64">
          <span class="absolute left-0 top-1/2 -translate-y-1/2 pl-2 text-purple-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="QUICK SEARCH"
            class="w-full border-0 bg-transparent pl-10 pr-0 py-2 text-gray-900 font-medium text-xs tracking-wider uppercase focus:ring-0 focus:outline-none transition placeholder:text-gray-600 placeholder:font-medium placeholder:opacity-100 placeholder:text-xs shadow-none"
            style="letter-spacing:0.08em;"
          />
          <div class="absolute left-0 right-0 bottom-0 h-[1px] bg-purple-200 pointer-events-none"></div>
        </div>
      </div>
    </div>

    <!-- Loader -->
    <div v-if="isLoading" class="w-full">
      <div class="border border-gray-200 rounded-xl p-8 bg-white/40 shadow-sm">
          <div class="flex flex-col items-center justify-center py-12">
            <!-- Modern Loading Animation -->
            <div class="relative mb-6">
              <div class="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-500 rounded-full animate-ping opacity-20"></div>
            </div>
                         <div class="text-center">
               <p class="text-gray-600 font-medium text-lg mb-1">Loading Students</p>
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

        <!-- No Students Found -->
    <div v-else-if="!isLoading && filteredStudents.length === 0" class="w-full">
      <div class="border border-gray-200 rounded-xl p-8 bg-white/40 shadow-sm">
          <div class="flex flex-col items-center justify-center py-12">
            <!-- Modern Empty State Icon -->
            <div class="relative mb-6">
              <div class="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <svg class="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.5a8.25 8.25 0 0116.5 0"></path>
                </svg>
              </div>
              <!-- Floating dots animation -->
              <div class="absolute -top-2 -right-2 w-4 h-4 bg-purple-300 rounded-full animate-ping opacity-30"></div>
              <div class="absolute -bottom-2 -left-2 w-3 h-3 bg-indigo-300 rounded-full animate-pulse"></div>
            </div>
                         <div class="w-full">
               <h3 class="text-gray-600 font-medium text-xl mb-2">No Students Found</h3>
               <p class="text-gray-500 text-sm font-normal leading-relaxed mb-4">
                 We couldn't find any students matching your current filters. Try adjusting your search criteria or clearing some filters.
               </p>
               <div class="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
                 <span class="px-2 py-1 bg-white rounded-full font-normal">• Check class filter</span>
                 <span class="px-2 py-1 bg-white rounded-full font-normal">• Check section filter</span>
                 <span class="px-2 py-1 bg-white rounded-full font-normal">• Clear search</span>
            </div>
               </div>
             </div>
          </div>
        </div>

    <!-- Students List with Action Buttons -->
    <div v-else-if="!isLoading && filteredStudents.length > 0" class="w-full">
      <div class="rounded-2xl bg-white/90 shadow-lg p-6">
        <!-- Selection Controls -->
        <div class="flex justify-between items-center mb-4 p-2 bg-white/50 rounded-lg">
          <div class="flex-1 flex gap-2">
            <!-- Form Selection Buttons (left-aligned) -->
            <button
              @click="handleFormSelection('character')"
              :class="[
                'px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105',
                selectedForms.character 
                  ? 'bg-gradient-to-r from-emerald-600 to-green-700 text-white'
                  : 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700'
              ]"
            >
              <svg v-if="selectedForms.character" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              Character
            </button>
            <button
              @click="handleFormSelection('challan')"
              :class="[
                'px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105',
                selectedForms.challan 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
              ]"
            >
              <svg v-if="selectedForms.challan" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              Challan
            </button>
            <button
              @click="handleFormSelection('idCard')"
              :class="[
                'px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105',
                selectedForms.idCard 
                  ? 'bg-gradient-to-r from-purple-600 to-violet-700 text-white'
                  : 'bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:from-purple-600 hover:to-violet-700'
              ]"
              title="Student ID Card"
            >
              <svg v-if="selectedForms.idCard" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              ID Card
            </button>
            <button
              @click="handleFormSelection('attendance')"
              :class="[
                'px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105',
                selectedForms.attendance 
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
              ]"
              title="Attendance Report"
            >
              <svg v-if="selectedForms.attendance" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              Attendance
            </button>
            <button
              @click="handleFormSelection('progress')"
              :class="[
                'px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105',
                selectedForms.progress 
                  ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white'
                  : 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700'
              ]"
              title="Progress Report"
            >
              <svg v-if="selectedForms.progress" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              Progress
            </button>
            <button
              @click="handleFormSelection('leaving')"
              :class="[
                'px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105',
                selectedForms.leaving 
                  ? 'bg-gradient-to-r from-slate-600 to-zinc-700 text-white'
                  : 'bg-gradient-to-r from-slate-500 to-zinc-600 text-white hover:from-slate-600 hover:to-zinc-700'
              ]"
              title="Leaving Certificate"
            >
              <svg v-if="selectedForms.leaving" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              Leaving
            </button>
          </div>
          <div class="flex gap-2 ml-auto">
            <button
              @click="selectAllForms"
              class="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium rounded-full flex items-center gap-2 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Select All
            </button>
            <button
              v-if="Object.values(selectedForms).some(Boolean)"
              @click="generateSelectedFormsForAllStudents"
              class="px-4 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-medium rounded-full flex items-center gap-2 hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Generate
            </button>
          </div>
        </div>

        <!-- Table Container -->
        <div class="overflow-x-auto">
          <table class="min-w-full rounded-xl border-0">
            <!-- Table Header -->
            <thead class="bg-gradient-to-r from-indigo-50 to-purple-50">
              <tr>
                <!-- Student View -->
                <template v-if="viewMode === 'student'">
                  <th @click="handleSort('rollNumber')" class="text-left py-2 px-4 font-medium text-gray-600 text-sm tracking-wider cursor-pointer select-none group transition-all duration-150 hover:bg-purple-50 border-b-2 border-purple-400 relative #ffffffspace-nowrap">
                    <span class="flex items-center gap-2">
                      GR No
                      <span class="flex flex-col ml-1">
                        <svg v-if="sortBy === 'rollNumber' && sortDirection === 'asc'" class="w-4 h-4 text-purple-500 transform -rotate-180" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                        <svg v-else-if="sortBy === 'rollNumber' && sortDirection === 'desc'" class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                        <svg v-else class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                      </span>
                    </span>
                  </th>
                  <th @click="handleSort('name')" class="text-left py-2 px-4 font-medium text-gray-600 text-sm tracking-wider cursor-pointer select-none group transition-all duration-150 hover:bg-purple-50 border-b-2 border-purple-400 relative #ffffffspace-nowrap">
                    <span class="flex items-center gap-2">
                      Student Name
                      <span class="flex flex-col ml-1">
                        <svg v-if="sortBy === 'name' && sortDirection === 'asc'" class="w-4 h-4 text-purple-500 transform -rotate-180" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                        <svg v-else-if="sortBy === 'name' && sortDirection === 'desc'" class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                        <svg v-else class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                      </span>
                    </span>
                  </th>
                  <th @click="handleSort('class')" class="text-left py-2 px-4 font-medium text-gray-600 text-sm tracking-wider cursor-pointer select-none group transition-all duration-150 hover:bg-purple-50 border-b-2 border-purple-400 relative #ffffffspace-nowrap">
                    <span class="flex items-center gap-2">
                      Class
                      <span class="flex flex-col ml-1">
                        <svg v-if="sortBy === 'class' && sortDirection === 'asc'" class="w-4 h-4 text-purple-500 transform -rotate-180" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                        <svg v-else-if="sortBy === 'class' && sortDirection === 'desc'" class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                        <svg v-else class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                      </span>
                    </span>
                  </th>
                  <th @click="handleSort('section')" class="text-left py-2 px-4 font-medium text-gray-600 text-sm tracking-wider cursor-pointer select-none group transition-all duration-150 hover:bg-purple-50 border-b-2 border-purple-400 relative #ffffffspace-nowrap">
                    <span class="flex items-center gap-2">
                      Section
                      <span class="flex flex-col ml-1">
                        <svg v-if="sortBy === 'section' && sortDirection === 'asc'" class="w-4 h-4 text-purple-500 transform -rotate-180" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                        <svg v-else-if="sortBy === 'section' && sortDirection === 'desc'" class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                        <svg v-else class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                      </span>
                    </span>
                  </th>
                </template>

                <!-- Class View -->
                <template v-else-if="viewMode === 'class'">
                  <th class="text-left py-2 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400 relative #ffffffspace-nowrap">Class Name</th>
                  <th class="text-left py-2 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400 relative #ffffffspace-nowrap">Students</th>
                  <th class="text-left py-2 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400 relative #ffffffspace-nowrap">Section</th>
                </template>

                <!-- Family View -->
                <template v-else-if="viewMode === 'family'">
                  <th class="text-left py-2 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400 relative #ffffffspace-nowrap">Family Code</th>
                  <th class="text-left py-2 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400 relative #ffffffspace-nowrap">Father Name</th>
                  <th class="text-left py-2 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400 relative #ffffffspace-nowrap">Children</th>
                </template>

                <th class="text-left py-2 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400 #ffffffspace-nowrap">Action</th>
              </tr>
            </thead>
            <!-- Table Body -->
            <tbody>
              <!-- Student View -->
              <template v-if="viewMode === 'student'">
                <tr v-for="(student, index) in filteredStudents" :key="student.id" 
                    :class="[
                      'hover:bg-indigo-50 transition-colors',
                      'border-b border-purple-200',
                      index === filteredStudents.length - 1 ? 'border-b-2 border-purple-400' : ''
                    ]">
                  <td class="py-2 px-4 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ student.rollNumber }}</td>
                  <td class="py-2 px-4 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ student.name }}</td>
                  <td class="py-2 px-4 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ student.class }}</td>
                  <td class="py-2 px-4 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ student.section || '-' }}</td>
                  <td class="py-2 px-4">
                    <div class="flex flex-wrap gap-1">
                      <!-- Character Certificate -->
                      <button
                        @click="generateCharacterCertificate([student.id])"
                        :class="[
                          'px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 relative min-w-[80px] justify-center',
                          selectedForms.character 
                            ? 'bg-gradient-to-r from-emerald-600 to-green-700 text-white'
                            : 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700',
                          loadingStates[student.id]?.character ? 'cursor-not-allowed' : ''
                        ]"
                        :disabled="loadingStates[student.id]?.character"
                        title="Character Certificate"
                      >
                        <template v-if="loadingStates[student.id]?.character">
                          <div class="w-3 h-3 border-2 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                        </template>
                        <template v-else>
                          <svg v-if="selectedForms.character" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                          Character
                        </template>
                      </button>
                      <!-- Fee Challan -->
                      <button
                        @click="generateFeeChallan([student.id])"
                        :class="[
                          'px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 relative min-w-[80px] justify-center',
                          selectedForms.challan 
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'
                            : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700',
                          loadingStates[student.id]?.challan ? 'cursor-not-allowed' : ''
                        ]"
                        :disabled="loadingStates[student.id]?.challan"
                        title="Fee Challan"
                      >
                        <template v-if="loadingStates[student.id]?.challan">
                          <div class="w-3 h-3 border-2 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                        </template>
                        <template v-else>
                          <svg v-if="selectedForms.challan" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                          Challan
                        </template>
                      </button>
                      <!-- ID Card -->
                      <button
                        @click="generateIDCard([student.id])"
                        :class="[
                          'px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 relative min-w-[80px] justify-center',
                          selectedForms.idCard 
                            ? 'bg-gradient-to-r from-purple-600 to-violet-700 text-white'
                            : 'bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:from-purple-600 hover:to-violet-700',
                          loadingStates[student.id]?.idCard ? 'cursor-not-allowed' : ''
                        ]"
                        :disabled="loadingStates[student.id]?.idCard"
                        title="Student ID Card"
                      >
                        <template v-if="loadingStates[student.id]?.idCard">
                          <div class="w-3 h-3 border-2 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                        </template>
                        <template v-else>
                          <svg v-if="selectedForms.idCard" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                          ID Card
                        </template>
                      </button>
                      <!-- Attendance -->
                      <button
                        @click="generateAttendanceReport([student.id])"
                        :class="[
                          'px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 relative min-w-[80px] justify-center',
                          selectedForms.attendance 
                            ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white'
                            : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600',
                          loadingStates[student.id]?.attendance ? 'cursor-not-allowed' : ''
                        ]"
                        :disabled="loadingStates[student.id]?.attendance"
                        title="Attendance Report"
                      >
                        <template v-if="loadingStates[student.id]?.attendance">
                          <div class="w-3 h-3 border-2 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                        </template>
                        <template v-else>
                          <svg v-if="selectedForms.attendance" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                          Attendance
                        </template>
                      </button>
                      <!-- Progress -->
                      <button 
                        @click="generateProgressReport([student.id])"
                        :class="[
                          'px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 relative min-w-[80px] justify-center',
                          selectedForms.progress 
                            ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white'
                            : 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700',
                          loadingStates[student.id]?.progress ? 'cursor-not-allowed' : ''
                        ]"
                        :disabled="loadingStates[student.id]?.progress"
                        title="Progress Report"
                      >
                        <template v-if="loadingStates[student.id]?.progress">
                          <div class="w-3 h-3 border-2 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                        </template>
                        <template v-else>
                          <svg v-if="selectedForms.progress" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                          Progress
                        </template>
                      </button>
                      <!-- Leaving Certificate -->
                      <button
                        @click="generateLeavingCertificate([student.id])"
                        :class="[
                          'px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 relative min-w-[80px] justify-center',
                          selectedForms.leaving 
                            ? 'bg-gradient-to-r from-slate-600 to-zinc-700 text-white'
                            : 'bg-gradient-to-r from-slate-500 to-zinc-600 text-white hover:from-slate-600 hover:to-zinc-700',
                          loadingStates[student.id]?.leaving ? 'cursor-not-allowed' : ''
                        ]"
                        :disabled="loadingStates[student.id]?.leaving"
                        title="Leaving Certificate"
                      >
                        <template v-if="loadingStates[student.id]?.leaving">
                          <div class="w-3 h-3 border-2 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                        </template>
                        <template v-else>
                          <svg v-if="selectedForms.leaving" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                          Leaving
                        </template>
                      </button>
                    </div>
                  </td>
                </tr>
              </template>

              <!-- Class View -->
              <template v-else-if="viewMode === 'class'">
                <tr v-for="(classItem, index) in filteredData" :key="classItem.id" 
                    :class="[
                      'hover:bg-indigo-50 transition-colors',
                      'border-b border-purple-200',
                      index === filteredData.length - 1 ? 'border-b-2 border-purple-400' : ''
                    ]">
                  <td class="py-2 px-4 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ classItem.name }}</td>
                  <td class="py-2 px-4 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ classItem.studentCount }}</td>
                  <td class="py-2 px-4 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ classItem.sectionId || '-' }}</td>
                  <td class="py-2 px-4">
                    <div class="flex flex-wrap gap-1">
                      <button
                        @click="generateClassReports(classItem)"
                        :class="[
                          'px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 relative min-w-[80px] justify-center',
                          'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600',
                          loadingStates[classItem.id]?.class ? 'cursor-not-allowed' : ''
                        ]"
                        :disabled="loadingStates[classItem.id]?.class"
                        title="Generate Reports"
                      >
                        <template v-if="loadingStates[classItem.id]?.class">
                          <div class="w-3 h-3 border-2 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                        </template>
                        <template v-else>
                          Generate
                        </template>
                      </button>
                    </div>
                  </td>
                </tr>
              </template>

              <!-- Family View -->
              <template v-else-if="viewMode === 'family'">
                <tr v-for="(family, index) in familyData" :key="family.id" 
                    :class="[
                      'hover:bg-indigo-50 transition-colors',
                      'border-b border-purple-200',
                      index === familyData.length - 1 ? 'border-b-2 border-purple-400' : ''
                    ]">
                  <td class="py-2 px-4 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ family.familyCode }}</td>
                  <td class="py-2 px-4 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ family.fatherName }}</td>
                  <td class="py-2 px-4 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ family.childrenCount }}</td>
                  <td class="py-2 px-4">
                    <div class="flex flex-wrap gap-1">
                      <button
                        @click="generateFamilyReports(family)"
                        :class="[
                          'px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 relative min-w-[80px] justify-center',
                          'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600',
                          loadingStates[family.id]?.family ? 'cursor-not-allowed' : ''
                        ]"
                        :disabled="loadingStates[family.id]?.family"
                        title="Generate Reports"
                      >
                        <template v-if="loadingStates[family.id]?.family">
                          <div class="w-3 h-3 border-2 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                        </template>
                        <template v-else>
                          Generate
                        </template>
                      </button>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <!-- Pagination Summary -->
        <div class="w-full max-w-7xl mx-auto mb-4">
          <div class="flex items-center justify-between bg-white/90 rounded-lg shadow-lg p-4 border border-gray-200">
            <div class="text-gray-600 text-sm font-medium">
              Showing {{ paginationData.from }}
              to {{ paginationData.to }}
              of {{ paginationData.total }} entries
            </div>
            <div class="flex items-center gap-4">
              <label class="text-sm text-gray-600 font-medium flex items-center gap-1">
                Per page:
                <select v-model="pageSize" @change="handleSizeChange(pageSize)" class="rounded-md border border-purple-200 bg-white px-2 py-1 text-xs font-semibold text-purple-700 focus:ring-2 focus:ring-purple-300">
                  <option v-for="size in [10, 20, 50, 100]" :key="size" :value="size">{{ size }}</option>
                </select>
              </label>
              <label class="text-sm text-gray-600 font-medium flex items-center gap-1">
                Go to page:
                <input v-model.number="pageInput" type="number" min="1" :max="computedLastPage" class="w-16 rounded-md border border-purple-200 px-2 py-1 text-xs font-semibold text-purple-700 focus:ring-2 focus:ring-purple-300" @keyup.enter="goToPage(pageInput)" />
                <button @click="goToPage(pageInput)" class="ml-1 px-2 py-1 rounded-md bg-purple-500 text-white text-xs font-semibold hover:bg-purple-600 transition-all">Go</button>
              </label>
            </div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div class="w-full max-w-7xl mx-auto mb-6">
          <div class="flex items-center justify-center gap-2">
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
              :disabled="currentPage === computedLastPage"
              @click="handleCurrentChange(currentPage + 1)"
              aria-label="Next"
            >
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Template Selector Modal -->
    <TemplateSelector
      v-model:visible="templateSelectorVisible"
      :section-type="currentSectionType"
      @template-selected="handleTemplateSelected"
    />
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import { ref, computed, onMounted, watch } from 'vue'
import api from '@/utils/axios'
import { ElMessage, ElLoading, ElNotification, ElMessageBox } from 'element-plus'
import TemplateSelector from '@/components/TemplateSelector.vue'
import axios from 'axios'

const toast = useToast({
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
  containerClassName: "custom-toast-container",
  bodyClassName: "custom-toast-body",
  toastClassName: "custom-toast",
  transition: "Vue-Toastification__bounce",
  maxToasts: 3,
  newestOnTop: true,
  filterBeforeCreate: (toast, toasts) => {
    if (toasts.filter(t => t.type === toast.type).length !== 0) {
      return false;
    }
    return toast;
  }
})

// Reactive data
const classes = ref([])
const sections = ref([])
const students = ref([])
const filteredStudents = ref([])
const selectedStudents = ref([])
const selectedSections = ref([])
const isLoading = ref(false)
const userPreferences = ref({})

// Form selection state
const selectedForms = ref({
  character: false,
  challan: false,
  idCard: false,
  attendance: false,
  progress: false,
  leaving: false
})

// Template selector
const templateSelectorVisible = ref(false)
const currentSectionType = ref('')

// Filter options
const selectedClass = ref('')
const selectedSection = ref('')
const searchQuery = ref('')
const rollNumberQuery = ref('')

// Pagination options
const currentPage = ref(1)
const pageSize = ref(10)
const pageInput = ref('')

// Sorting options
const sortBy = ref('name')
const sortDirection = ref('asc')

// Report options with design templates
const characterTemplate = ref('modern-gradient')
const challanTemplate = ref('professional-modern')
const challanType = ref('monthly')
const challanMonth = ref(new Date().toLocaleString('default', { month: 'long' }))
const idCardTemplate = ref('modern-3d')
const attendanceTemplate = ref('chart-analytics')
const leavingTemplate = ref('official-formal')
const sessionYear = ref('2024-25')
const attendancePeriod = ref('monthly')
const startDate = ref('')
const endDate = ref('')
const examTerm = ref('first')
const progressReportType = ref('premium-detailed')
const leavingReason = ref('transfer')
const lastAttendanceDate = ref('')

// Template designs (will be fetched from backend)
const templateDesigns = ref({
  idCard: [
    {
      id: 'modern-3d',
      name: 'Modern 3D',
      description: '3D layered design with holographic effects',
      icon: '🎯',
      value: 'modern-3d',
      preview: '3D layered design with holographic effects',
    }
  ]
})

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

// Add new refs for pagination data from API
const paginationData = ref({
  from: 0,
  to: 0,
  total: 0,
  per_page: 15,
  current_page: 1
})

// Add these refs after other refs
const loadingStates = ref({})

// Add new refs for view modes
const viewMode = ref('student')
const classData = ref([])
const familyData = ref([])

// View tabs configuration with icons
const viewTabs = computed(() => [
  {
    id: 'student',
    label: 'Student Wise',
    icon: 'users',
    count: paginationData.value.total
  },
  {
    id: 'class',
    label: 'Class Wise',
    icon: 'academic-cap',
    count: classData.value.length
  },
  {
    id: 'family',
    label: 'Family Wise',
    icon: 'home',
    count: familyData.value.length
  }
])

// Computed properties for dynamic content
const currentViewLabel = computed(() => {
  const tab = viewTabs.value.find(t => t.key === viewMode.value)
  return tab ? tab.label : 'Student Wise'
})

const currentDataLabel = computed(() => {
  switch(viewMode.value) {
    case 'student': return 'Student List'
    case 'class': return 'Class List'
    case 'family': return 'Family List'
    default: return 'Student List'
  }
})

const currentData = computed(() => {
  switch(viewMode.value) {
    case 'student': return students.value
    case 'class': return classData.value
    case 'family': return familyData.value
    default: return students.value
  }
})

const filteredData = computed(() => {
  if (viewMode.value === 'class') {
    return classData.value.filter(classItem =>
      (classItem.students && classItem.students.length > 0) && (classItem.sectionId || classItem.section)
    )
  }
  if (!searchQuery.value) return currentData.value
  const query = searchQuery.value.toLowerCase()
  switch(viewMode.value) {
    case 'student':
      return students.value.filter(student =>
        student.name.toLowerCase().includes(query) ||
        student.rollNumber.toLowerCase().includes(query)
      )
    case 'family':
      return familyData.value.filter(family =>
        family.fatherName.toLowerCase().includes(query) ||
        family.familyCode.toLowerCase().includes(query)
      )
    default:
      return currentData.value
  }
})

// Method to set view mode with animation
const setViewMode = async (mode) => {
  viewMode.value = mode
  if (mode === 'class') {
    await loadClassData()
  } else if (mode === 'family') {
    await loadFamilyData()
  }
}

// Load class data
const loadClassData = async () => {
  try {
    const response = await axios.get('/api/classes/with-students-and-section')
    classData.value = response.data.result.map(classItem => ({
      ...classItem,
      studentCount: classItem.students?.length || 0
    }))
  } catch (error) {
    console.error('Error loading class data:', error)
    toast.error('Failed to load class data')
  }
}

// Load family data
const loadFamilyData = async () => {
  try {
    const response = await axios.get('/api/families/with-students')
    familyData.value = response.data.map(family => ({
      ...family,
      childrenCount: family.students?.length || 0
    }))
  } catch (error) {
    console.error('Error loading family data:', error)
    toast.error('Failed to load family data')
  }
}

// Generate reports for class
const generateClassReports = async (classItem) => {
  if (!selectedForms.value.character && !selectedForms.value.challan && 
      !selectedForms.value.idCard && !selectedForms.value.attendance && 
      !selectedForms.value.progress && !selectedForms.value.leaving) {
    toast.warning('Please select at least one form type')
    return
  }

  try {
    loadingStates.value[classItem.id] = { class: true }
    const studentIds = classItem.students.map(student => student.id)
    const response = await axios.post('/api/reports/generate-bulk', {
      studentIds,
      forms: selectedForms.value
    }, {
      responseType: 'blob'
    })

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `reports_${classItem.name}_${new Date().toISOString().split('T')[0]}.pdf`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)

    toast.success('Reports generated successfully')
  } catch (error) {
    console.error('Error generating class reports:', error)
    toast.error('Failed to generate reports')
  } finally {
    loadingStates.value[classItem.id] = { class: false }
  }
}

// Generate reports for family
const generateFamilyReports = async (family) => {
  if (!selectedForms.value.character && !selectedForms.value.challan && 
      !selectedForms.value.idCard && !selectedForms.value.attendance && 
      !selectedForms.value.progress && !selectedForms.value.leaving) {
    toast.warning('Please select at least one form type')
    return
  }

  try {
    loadingStates.value[family.id] = { family: true }
    const studentIds = family.students.map(student => student.id)
    const response = await axios.post('/api/reports/generate-bulk', {
      studentIds,
      forms: selectedForms.value
    }, {
      responseType: 'blob'
    })

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `reports_${family.familyCode}_${new Date().toISOString().split('T')[0]}.pdf`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)

    toast.success('Reports generated successfully')
  } catch (error) {
    console.error('Error generating family reports:', error)
    toast.error('Failed to generate reports')
  } finally {
    loadingStates.value[family.id] = { family: false }
  }
}

// Methods
const fetchClasses = async () => {
  try {
    const response = await api.get('/classes')
    if (response.data.success) {
      classes.value = response.data.result
    }
  } catch (error) {
    console.error('Error fetching classes:', error)
    toast.error('Failed to fetch classes')
  }
}

const fetchSections = async () => {
  try {
    const response = await api.get('/sections')
    if (response.data.success) {
      sections.value = response.data.result.map(s => ({ id: s.id, name: s.name }))
    }
  } catch (error) {
    console.error('Error fetching sections:', error)
    toast.error('Failed to fetch sections')
  }
}

const fetchStudents = async () => {
  try {
    isLoading.value = true
    const params = {
      page: currentPage.value,
      per_page: pageSize.value
    }
    if (selectedClass.value) params.class_id = selectedClass.value
    if (selectedSection.value) params.section_id = selectedSection.value
    if (searchQuery.value) params.search = searchQuery.value
    if (rollNumberQuery.value) params.roll_number = rollNumberQuery.value
    const response = await api.get('/students', { params })
    if (response.data.status) {
      students.value = (response.data.result.data || []).map(student => ({
        id: student.id,
        name: `${student.first_name} ${student.last_name}`,
        rollNumber: student.roll_number || student.id,
        class: student.class_name,
        section: student.section_name || '-', // Updated to use section_name
        section_id: student.section_id,
        class_id: student.class_id
      }))
      paginationData.value = {
        from: response.data.result.from || 0,
        to: response.data.result.to || 0,
        total: response.data.result.total || 0,
        per_page: response.data.result.per_page || 15,
        current_page: response.data.result.current_page || 1
      }
      filteredStudents.value = students.value
    }
  } catch (error) {
    console.error('Error fetching students:', error)
    toast.error('Failed to fetch students', {
      position: "top-right",
      timeout: 3000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: false,
      closeButton: "button",
      icon: true,
      rtl: false,
      containerClassName: "custom-toast-container",
      bodyClassName: "custom-toast-body",
      toastClassName: "custom-toast",
      transition: "Vue-Toastification__bounce",
      maxToasts: 3,
      newestOnTop: true
    })
  } finally {
    isLoading.value = false
  }
}

const selectAll = () => {
  // Select all students on current page
  const currentPageStudentIds = paginatedStudents.value.map(student => student.id)
  const newSelections = [...new Set([...selectedStudents.value, ...currentPageStudentIds])]
  selectedStudents.value = newSelections
}

const selectAllPages = () => {
  // Select all filtered students across all pages
  selectedStudents.value = filteredStudents.value.map(student => student.id)
}

const clearSelection = () => {
  selectedStudents.value = []
}

// Pagination handlers
const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1 // Reset to first page when changing page size
  fetchStudents() // Fetch new data with updated page size
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchStudents() // Fetch new data for the selected page
}

const goToPage = (page) => {
  if (page && page >= 1 && page <= computedLastPage.value) {
    handleCurrentChange(page)
  }
}

// Sorting handler
const handleSort = (column) => {
  if (column === 'checkbox') return // Don't sort by checkbox
  
  if (sortBy.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column
    sortDirection.value = 'asc'
  }
  
  // Apply sorting to filteredStudents
  const sorted = [...filteredStudents.value].sort((a, b) => {
    let aVal = a[column]
    let bVal = b[column]
    
    if (aVal === null || aVal === undefined) aVal = ''
    if (bVal === null || bVal === undefined) bVal = ''
    
    if (sortDirection.value === 'asc') {
      return aVal > bVal ? 1 : aVal < bVal ? -1 : 0
    } else {
      return aVal < bVal ? 1 : aVal > bVal ? -1 : 0
    }
  })
  
  filteredStudents.value = sorted
}

// Report generation methods
const setLoadingState = (studentId, formType, isLoading) => {
  if (!loadingStates.value[studentId]) {
    loadingStates.value[studentId] = {}
  }
  loadingStates.value[studentId][formType] = isLoading
}

const generateCharacterCertificate = async (ids = null) => {
  const studentIds = ids || selectedStudents.value
  if (!studentIds || studentIds.length === 0) {
    toast.warning('Please select at least one student')
    return
  }
  try {
    for (const studentId of studentIds) {
      setLoadingState(studentId, 'character', true)
      const response = await api.get(`/character-certificate/${studentId}/generate`, {
        responseType: 'blob'
      })
      if (response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
        window.open(url, '_blank')
      }
    }
  } catch (error) {
    toast.error('Failed to generate character certificates')
  } finally {
    for (const studentId of studentIds) {
      setLoadingState(studentId, 'character', false)
    }
  }
}

const generateFeeChallan = async (ids = null) => {
  const studentIds = ids || selectedStudents.value;
  if (!studentIds || studentIds.length === 0) {
    toast.warning('Please select at least one student')
    return
  }
  try {
    for (const studentId of studentIds) {
      setLoadingState(studentId, 'challan', true)
      const response = await api.get(`/students/${studentId}/generate-fee-challan`, {
        params: { 
          template: challanTemplate.value,
          type: challanType.value,
          month: challanMonth.value
        },
        responseType: 'blob'
      })
      if (response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
        window.open(url, '_blank')
      }
    }
  } catch (error) {
    toast.error('Failed to generate fee challans')
  } finally {
    for (const studentId of studentIds) {
      setLoadingState(studentId, 'challan', false)
    }
  }
}

const generateIDCard = async (ids = null) => {
  const studentIds = ids || selectedStudents.value;
  if (!studentIds || studentIds.length === 0) {
    toast.warning('Please select at least one student')
    return
  }
  try {
    for (const studentId of studentIds) {
      setLoadingState(studentId, 'idCard', true)
      const response = await api.get(`/id-card/${studentId}/generate`, {
        params: { 
          template: 'modern-3d',
          session: sessionYear.value
        },
        responseType: 'blob'
      })
      if (response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
        window.open(url, '_blank')
      }
    }
  } catch (error) {
    toast.error('Failed to generate ID cards')
  } finally {
    for (const studentId of studentIds) {
      setLoadingState(studentId, 'idCard', false)
    }
  }
}

const generateAttendanceReport = async (ids = null) => {
  const studentIds = ids || selectedStudents.value;
  if (!studentIds || studentIds.length === 0) {
    toast.warning('Please select at least one student')
    return
  }
  try {
    for (const studentId of studentIds) {
      setLoadingState(studentId, 'attendance', true)
      const params = {
        period: attendancePeriod.value,
        students: [studentId]
      }
      if (attendancePeriod.value === 'custom') {
        params.start_date = startDate.value
        params.end_date = endDate.value
      }
      const response = await api.get('/reports/attendance', {
        params,
        responseType: 'blob'
      })
      if (response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
        window.open(url, '_blank')
      }
    }
  } catch (error) {
    toast.error('Failed to generate attendance reports')
  } finally {
    for (const studentId of studentIds) {
      setLoadingState(studentId, 'attendance', false)
    }
  }
}

const generateProgressReport = async (ids = null) => {
  const studentIds = ids || selectedStudents.value;
  if (!studentIds || studentIds.length === 0) {
    toast.warning('Please select at least one student')
    return
  }
  try {
    for (const studentId of studentIds) {
      setLoadingState(studentId, 'progress', true)
      const response = await api.post('/students/generate-report-card', {
        student_id: studentId,
        template: progressReportType.value,
        term: examTerm.value
      }, {
        responseType: 'blob'
      })
      if (response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
        window.open(url, '_blank')
      }
    }
  } catch (error) {
    toast.error('Failed to generate progress reports')
  } finally {
    for (const studentId of studentIds) {
      setLoadingState(studentId, 'progress', false)
    }
  }
}

const generateLeavingCertificate = async (ids = null) => {
  const studentIds = ids || selectedStudents.value
  if (!studentIds || studentIds.length === 0) {
    toast.warning('Please select at least one student')
    return
  }
  try {
    for (const studentId of studentIds) {
      setLoadingState(studentId, 'leaving', true)
      const response = await api.get(`/leaving-certificates/${studentId}/generate`, {
        params: { 
          reason: leavingReason.value,
          last_attendance: lastAttendanceDate.value
        },
        responseType: 'blob'
      })
      if (response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
        window.open(url, '_blank')
      }
    }
  } catch (error) {
    toast.error('Failed to generate leaving certificates')
  } finally {
    for (const studentId of studentIds) {
      setLoadingState(studentId, 'leaving', false)
    }
  }
}

// Bulk actions
const generateBulkCharacterCertificates = () => generateCharacterCertificate()
const generateBulkIDCards = () => generateIDCard()
const generateBulkFeeChallans = () => generateFeeChallan()
const generateBulkProgressReports = () => generateProgressReport()

// Section selection methods
const generateSelectedSections = async () => {
  if (selectedSections.value.length === 0) {
    toast.warning('Please select at least one section')
    return
  }

  if (selectedStudents.value.length === 0) {
    toast.warning('Please select at least one student')
    return
  }

  const loading = ElLoading.service({
    lock: true,
    text: 'Generating Selected Reports...',
  })

  try {
    for (const section of selectedSections.value) {
      switch (section) {
        case 'character-certificate':
          await generateCharacterCertificate()
          break
        case 'fee-challan':
          await generateFeeChallan()
          break
        case 'id-card':
          await generateIDCard()
          break
        case 'attendance-report':
          await generateAttendanceReport()
          break
        case 'progress-report':
          await generateProgressReport()
          break
        case 'leaving-certificate':
          await generateLeavingCertificate()
          break
      }
      // Add small delay between generations
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    toast.success(`Successfully generated ${selectedSections.value.length} types of reports for ${selectedStudents.value.length} students!`)
  } catch (error) {
    toast.error('Failed to generate some reports')
  } finally {
    loading.close()
  }
}

const clearSectionSelection = () => {
  selectedSections.value = []
}

// Template selector methods
const openTemplateSelector = (sectionType) => {
  if (selectedStudents.value.length === 0) {
    toast.warning('Please select at least one student')
    return
  }
  
  currentSectionType.value = sectionType
  templateSelectorVisible.value = true
}

// Navigate to templates page
const navigateToTemplates = (sectionType) => {
  if (selectedStudents.value.length === 0) {
    toast.warning('Please select at least one student first')
    return
  }
  
  // Haptic feedback
  if ('vibrate' in navigator) {
    navigator.vibrate(50)
  }
  
  // Store selected students in localStorage for template page
  localStorage.setItem('selectedStudents', JSON.stringify(selectedStudents.value))
  
  ElNotification({
    title: 'Redirecting to Template Gallery',
    message: `Choose from beautiful ${sectionType} templates for ${selectedStudents.value.length} students`,
    type: 'info',
    position: 'top-right',
    duration: 2000,
    customClass: 'navigation-notification'
  })
  
  // Navigate to template selection page in same window
  window.location.href = `#/templates/${sectionType}`
}

const handleTemplateSelected = async (template) => {
  const loading = ElLoading.service({
    lock: true,
    text: `Generating ${currentSectionType.value} reports with ${template.name} template...`,
  })

  try {
    switch (currentSectionType.value) {
      case 'character':
        await generateWithTemplate('character-certificate', template.id)
        break
      case 'challan':
        await generateWithTemplate('fee-challan', template.id)
        break
      case 'idCard':
        await generateWithTemplate('id-card', template.id)
        break
      case 'attendance':
        await generateWithTemplate('attendance-report', template.id)
        break
      case 'progress':
        await generateWithTemplate('progress-report', template.id)
        break
      case 'leaving':
        await generateWithTemplate('leaving-certificate', template.id)
        break
    }
    toast.success(`Successfully generated reports with ${template.name} template!`)
  } catch (error) {
    console.error('Error generating reports:', error)
    toast.error('Failed to generate reports')
  } finally {
    loading.close()
  }
}

const generateWithTemplate = async (reportType, templateId) => {
  for (const studentId of selectedStudents.value) {
    let endpoint = ''
    let params = { template: templateId }
    
    switch (reportType) {
      case 'character-certificate':
        endpoint = `/character-certificate/${studentId}/generate`
        break
      case 'fee-challan':
        endpoint = `/students/${studentId}/generate-fee-challan`
        params.type = challanType.value
        params.month = challanMonth.value
        break
      case 'id-card':
        endpoint = `/id-card/${studentId}/generate`
        params.session = sessionYear.value
        break
      case 'attendance-report':
        endpoint = `/reports/attendance`
        params.students = [studentId]
        params.period = attendancePeriod.value
        if (attendancePeriod.value === 'custom') {
          params.start_date = startDate.value
          params.end_date = endDate.value
        }
        break
      case 'progress-report':
        endpoint = `/students/generate-report-card`
        params.student_id = studentId
        params.term = examTerm.value
        break
      case 'leaving-certificate':
        endpoint = `/leaving-certificates/${studentId}/generate`
        params.reason = leavingReason.value
        params.last_attendance = lastAttendanceDate.value
        break
    }

    const response = await api.get(endpoint, {
      params,
      responseType: 'blob'
    })
    
    if (response.data) {
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
      window.open(url, '_blank')
    }
    
    // Add small delay between generations
    await new Promise(resolve => setTimeout(resolve, 500))
  }
}

const selectAllSections = () => {
  selectedSections.value = [
    'character-certificate',
    'fee-challan', 
    'id-card',
    'attendance-report',
    'progress-report',
    'leaving-certificate'
  ]
}

// Template loading and management
const loadAvailableTemplates = async () => {
  try {
    const response = await api.get('/user/preferences/available-templates')
    if (response.data.success) {
      // Add icons to templates
      const iconMap = {
        character: { '🎨': 'modern-gradient', '📜': 'classic-formal', '👑': 'royal-premium', '✨': 'minimal-clean' },
        challan: { '💳': 'default', '🌈': 'modern', '📋': 'classic', '📄': 'corporate', '⭐': 'elegant', '📝': 'minimal', '🏛️': 'traditional', '💼': 'professional', '🏫': 'school', '🎓': 'university' },
        idCard: { '🎯': 'modern-3d', '💼': 'corporate-sleek', '🌟': 'student-vibrant', '📸': 'classic-photo' },
        attendance: { '📊': 'chart-analytics', '📅': 'calendar-grid', '📈': 'dashboard-style', '📝': 'simple-table' },
        progress: { '🏆': 'default', '👨‍👩‍👧‍👦': 'modern', '🎓': 'detailed' },
        leaving: { '🏛️': 'official-formal', '🏫': 'school-branded', '🌟': 'certificate-premium', '📜': 'standard-format' }
      }
      
      const templatesWithIcons = {}
      Object.keys(response.data.templates).forEach(key => {
        templatesWithIcons[key] = response.data.templates[key].map(template => ({
          ...template,
          value: template.id,
          preview: template.description,
          icon: Object.keys(iconMap[key] || {}).find(icon => iconMap[key][icon] === template.id) || '📄'
        }))
      })
      
      templateDesigns.value = templatesWithIcons
    }
  } catch (error) {
    console.error('Error loading templates:', error)
    toast.error('Failed to load templates')
  }
}

// Template selection and preference methods
const selectTemplate = async (type, template) => {
  switch(type) {
    case 'character':
      characterTemplate.value = template
      break
    case 'challan':
      challanTemplate.value = template
      break
    case 'idCard':
      idCardTemplate.value = 'modern-3d'
      break
    case 'attendance':
      attendanceTemplate.value = template
      break
    case 'progress':
      progressReportType.value = template
      break
    case 'leaving':
      leavingTemplate.value = template
      break
  }
  
  // Save user preference to database
  await saveUserPreference(type, template)
}

const saveUserPreference = async (type, template) => {
  try {
    await api.post('/user/preferences/report-templates', {
      type: type,
      template: template
    })
    
    // Update local preferences
    userPreferences.value[type] = template
    
    toast.success('Design preference saved!')
  } catch (error) {
    console.error('Error saving preference:', error)
    // Don't show error to user as this is not critical
  }
}

const loadUserPreferences = async () => {
  try {
    const response = await api.get('/user/preferences/report-templates')
    if (response.data.success) {
      userPreferences.value = response.data.preferences || {}
      
      // Apply saved preferences to default values
      if (userPreferences.value.character) {
        characterTemplate.value = userPreferences.value.character
      }
      if (userPreferences.value.challan) {
        challanTemplate.value = userPreferences.value.challan
      }
      if (userPreferences.value.idCard) {
        idCardTemplate.value = 'modern-3d'
      }
      if (userPreferences.value.attendance) {
        attendanceTemplate.value = userPreferences.value.attendance
      }
      if (userPreferences.value.progress) {
        progressReportType.value = userPreferences.value.progress
      }
      if (userPreferences.value.leaving) {
        leavingTemplate.value = userPreferences.value.leaving
      }
    }
  } catch (error) {
    console.error('Error loading preferences:', error)
    // Don't show error to user as defaults will be used
  }
}

// Form selection methods
const handleFormSelection = (formType) => {
  selectedForms.value[formType] = !selectedForms.value[formType];
}

const selectAllForms = () => {
  const allSelected = Object.values(selectedForms.value).every(Boolean);
  if (allSelected) {
    // Deselect all forms
    Object.keys(selectedForms.value).forEach(key => {
      selectedForms.value[key] = false;
    });
  } else {
    // Select all forms
    Object.keys(selectedForms.value).forEach(key => {
      selectedForms.value[key] = true;
    });
  }
}

const generateSelectedFormsForAllStudents = async () => {
  const selectedFormKeys = Object.keys(selectedForms.value).filter(key => selectedForms.value[key]);
  if (selectedFormKeys.length === 0) {
    toast.warning('Please select at least one form to generate.');
    return;
  }
  try {
    await ElMessageBox.confirm(
      'Are you sure you want to generate all these selected forms for all students?',
      'Generate Reports',
      {
        confirmButtonText: 'Yes, Generate',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    );
    for (const student of filteredStudents.value) {
      for (const form of selectedFormKeys) {
        if (form === 'character') await generateCharacterCertificate([student.id]);
        if (form === 'challan') await generateFeeChallan([student.id]);
        if (form === 'idCard') await generateIDCard([student.id]);
        if (form === 'attendance') await generateAttendanceReport([student.id]);
        if (form === 'progress') await generateProgressReport([student.id]);
        if (form === 'leaving') await generateLeavingCertificate([student.id]);
      }
    }
  } catch (e) {
    // User cancelled
  }
}

// Add totalStudents ref
const totalStudents = ref(0)

onMounted(async () => {
  await loadAvailableTemplates()
  await loadUserPreferences()
  fetchClasses()
  fetchSections()
  fetchStudents()
})

// Add this computed property after other computed properties
const isAnyLoading = computed(() => {
  return {
    character: Object.values(loadingStates.value).some(state => state.character),
    challan: Object.values(loadingStates.value).some(state => state.challan),
    idCard: Object.values(loadingStates.value).some(state => state.idCard),
    attendance: Object.values(loadingStates.value).some(state => state.attendance),
    progress: Object.values(loadingStates.value).some(state => state.progress),
    leaving: Object.values(loadingStates.value).some(state => state.leaving)
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

:deep(.custom-toast-container) {
  padding: 1rem;
}

:deep(.custom-toast) {
  background: #ffffff;
  backdrop-filter: blur(8px);
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(226, 232, 240, 0.8);
  padding: 1rem;
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;
}

:deep(.custom-toast:hover) {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.06);
}

:deep(.custom-toast-body) {
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  color: #1e293b;
  line-height: 1.5;
}

:deep(.Vue-Toastification__toast--success) {
  background: linear-gradient(135deg, #10b981, #059669);
  color: #ffffff;
}

:deep(.Vue-Toastification__toast--error) {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: #ffffff;
}

:deep(.Vue-Toastification__toast--warning) {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #ffffff;
}

:deep(.Vue-Toastification__toast--info) {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff;
}

:deep(.Vue-Toastification__close-button) {
  color: #ffffff;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

:deep(.Vue-Toastification__close-button:hover) {
  opacity: 1;
}

:deep(.Vue-Toastification__progress-bar) {
  background: rgba(255, 255, 255, 0.3);
  height: 3px;
}

:deep(.Vue-Toastification__bounce-enter-active) {
  animation: toast-in-right 0.4s ease;
}

:deep(.Vue-Toastification__bounce-leave-active) {
  animation: toast-out-right 0.4s ease;
}

@keyframes toast-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes toast-out-right {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>