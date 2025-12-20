<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
    <!-- Top Bar Header -->
    <div class="w-full max-w-7xl mx-auto mb-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/20 py-4 px-4 sm:px-6 lg:px-8 transition-all duration-500">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          <h2 class="text-base font-medium text-gray-900 tracking-tight flex items-center gap-2">
            <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            Class Management System
          </h2>
        </div>
        <nav class="flex items-center gap-1 sm:gap-2 text-sm sm:text-base font-medium text-gray-600">
          <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-purple-50">Dashboard</span>
          <span class="hidden sm:inline mx-1 sm:mx-2 text-gray-500">|</span>
          <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-purple-50">Academic</span>
          <span class="hidden sm:inline mx-1 sm:mx-2 text-gray-500">|</span>
          <span class="text-purple-600 font-bold px-2 py-1 rounded-lg bg-purple-50">Class Management</span>
        </nav>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
      <div class="bg-white/90 rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs sm:text-sm font-medium text-gray-500">Total Classes</p>
            <p class="text-2xl sm:text-3xl font-bold text-indigo-600">{{ displayClassesCount }}</p>
          </div>
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white/90 rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs sm:text-sm font-medium text-gray-600">Total Sections</p>
            <p class="text-2xl sm:text-3xl font-bold text-purple-600">{{ displaySectionsCount }}</p>
          </div>
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white/90 rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs sm:text-sm font-medium text-gray-600">Active Subjects</p>
            <p class="text-2xl sm:text-3xl font-bold text-pink-600">{{ displaySubjectsCount }}</p>
          </div>
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-pink-100 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
        </div>
      </div>
  </div>

    <!-- Tab Navigation -->
    <div class="w-full max-w-7xl mx-auto mb-4 sm:mb-6">
      <div class="bg-white/90 rounded-lg shadow-lg p-1 flex flex-col sm:flex-row">
        <button 
          @click="activeTab = 'classes'"
          :class="[
            'flex-1 py-2 sm:py-3 px-3 sm:px-6 rounded-md font-medium text-xs sm:text-sm transition-all duration-300',
            activeTab === 'classes' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
              : 'text-gray-600 hover:text-purple-600'
          ]"
        >
          <span class="hidden sm:inline">Classes</span>
          <span class="sm:hidden">Classes</span>
          <span class="hidden sm:inline">({{ displayClassesCount }})</span>
        </button>
        <button 
          @click="activeTab = 'sections'"
          :class="[
            'flex-1 py-2 sm:py-3 px-3 sm:px-6 rounded-md font-medium text-xs sm:text-sm transition-all duration-300',
            activeTab === 'sections' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
              : 'text-gray-600 hover:text-purple-600'
          ]"
        >
          <span class="hidden sm:inline">Sections</span>
          <span class="sm:hidden">Sections</span>
          <span class="hidden sm:inline">({{ displaySectionsCount }})</span>
        </button>
        <button 
          @click="activeTab = 'subjects'"
          :class="[
            'flex-1 py-2 sm:py-3 px-3 sm:px-6 rounded-md font-medium text-xs sm:text-sm transition-all duration-300',
            activeTab === 'subjects' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
              : 'text-gray-600 hover:text-purple-600'
          ]"
        >
          <span class="hidden sm:inline">Subjects</span>
          <span class="sm:hidden">Subjects</span>
          <span class="hidden sm:inline">({{ displaySubjectsCount }})</span>
        </button>
      </div>
    </div>

    <!-- Classes Tab -->
    <div v-if="activeTab === 'classes'" class="w-full max-w-7xl mx-auto">
      <!-- Filter & Search Section -->
      <div class="mb-6">
        <div class="flex flex-col items-start mb-2">
          <h3 class="text-base font-medium text-gray-900 tracking-tight">Filter Classes</h3>
          <div class="h-[2px] bg-purple-200 w-full transition-all duration-300" style="max-width: 120px"></div>
        </div>
        
        <div class="rounded-lg border border-gray-200 bg-white/90 px-4 sm:px-6 py-3 shadow-lg">
          <form class="w-full" @submit.prevent="handleClassFilter">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div class="flex flex-col w-full">
                <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Search Class</label>
                <div class="relative">
                  <input 
                    v-model="filters.className"
                    type="text" 
                    placeholder="Search by class name (case-insensitive)"
                    class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
                  />
                  <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                </div>
              </div>

              <div class="flex flex-col w-full">
                <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Filter by Section</label>
                <div class="relative">
                  <select v-model="filters.section" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8" :disabled="sectionList.length === 0">
                    <option value="">All Sections</option>
                    <option v-if="sectionList.length === 0" value="" disabled>Loading sections...</option>
                    <option v-for="section in sectionList" :key="section.id" :value="section.id">{{ section.name }}</option>
                  </select>
                  <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg v-if="sectionList.length === 0" class="w-4 h-4 text-purple-500 animate-spin" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                    <svg v-else class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                  </div>
                  <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                </div>
              </div>

              <div class="flex items-end gap-2">
                <button 
                  @click="clearClassFilters" 
                  class="h-9 px-4 rounded-full bg-white hover:bg-white text-gray-900 text-sm font-bold border border-gray-200 transition-all duration-300 transform hover:scale-105 flex items-center gap-1"
                  :disabled="!hasClassFilters"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  Clear
                </button>
                <button 
                  @click="showAddForm = true" 
                  class="h-9 px-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-1"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                  </svg>
                  Add
                </button>
                <button type="submit" class="h-9 px-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"/>
                  </svg>
                  Filter
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Classes List Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex flex-col items-start">
          <h3 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce"></div>
            Classes ({{ displayClassesCount }})
          </h3>
          <div class="h-[2px] bg-purple-200 w-full transition-all duration-500" style="max-width: 120px"></div>
        </div>
      </div>

      

            <!-- Classes Table -->
      <div class="w-full">
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/20 overflow-hidden">
          <!-- Table Loading State -->
          <div v-if="tableLoading" class="p-8">
            <div class="flex flex-col items-center justify-center py-12">
              <div class="relative mb-6">
                <div class="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                <div class="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-pink-500 rounded-full animate-ping opacity-20"></div>
              </div>
              <p class="text-gray-600 font-medium">Loading table data...</p>
            </div>
          </div>
          
          <!-- Table Content -->
          <div v-else-if="!tableLoading && classList.length > 0" class="overflow-x-auto">
            <table class="min-w-full">
                                             <thead class="bg-gradient-to-r from-indigo-50 to-purple-50">
                                 <tr>
                                   <th class="text-left py-2 px-2 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">#</th>
                                   <th @click="handleSort('name')" class="text-left py-2 px-2 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400 cursor-pointer select-none group transition-all duration-150 hover:bg-purple-50 relative">
                                                         <span class="flex items-center gap-1">
                                       Class Name
                                       <span class="flex flex-col ml-1">
                        <svg v-if="sortBy === 'name' && sortDirection === 'asc'" class="w-3 h-3 text-purple-500 transform -rotate-180" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                        <svg v-else-if="sortBy === 'name' && sortDirection === 'desc'" class="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                        <svg v-else class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                      </span>
                    </span>
                    <span class="absolute left-0 bottom-0 w-full h-0.5 bg-purple-100 opacity-0 group-hover:opacity-100 transition"></span>
                  </th>
                  <th @click="handleSort('description')" class="text-left py-2 px-2 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400 cursor-pointer select-none group transition-all duration-150 hover:bg-purple-50 relative">
                    <span class="flex items-center gap-1">
                      Description
                      <span class="flex flex-col ml-1">
                        <svg v-if="sortBy === 'description' && sortDirection === 'asc'" class="w-3 h-3 text-purple-500 transform -rotate-180" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                        <svg v-else-if="sortBy === 'description' && sortDirection === 'desc'" class="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                        <svg v-else class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                      </span>
                    </span>
                    <span class="absolute left-0 bottom-0 w-full h-0.5 bg-purple-100 opacity-0 group-hover:opacity-100 transition"></span>
                  </th>
                  <th @click="handleSort('section_id')" class="text-left py-2 px-2 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400 cursor-pointer select-none group transition-all duration-150 hover:bg-purple-50 relative">
                    <span class="flex items-center gap-1">
                      Section
                      <span class="flex flex-col ml-1">
                        <svg v-if="sortBy === 'section_id' && sortDirection === 'asc'" class="w-3 h-3 text-purple-500 transform -rotate-180" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                        <svg v-else-if="sortBy === 'section_id' && sortDirection === 'desc'" class="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                        <svg v-else class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                      </span>
                    </span>
                    <span class="absolute left-0 bottom-0 w-full h-0.5 bg-purple-100 opacity-0 group-hover:opacity-100 transition"></span>
                  </th>
                  <th class="text-center py-2 px-2 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">
                    <span class="flex items-center justify-center gap-1">
                      Subjects
                    </span>
                  </th>
                  <th class="text-center py-2 px-2 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">
                    <span class="flex items-center justify-center gap-1">
                      Actions
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(classItem, index) in classList" :key="classItem.id" class="hover:bg-indigo-50 transition-colors border-b border-purple-200">
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs">{{ (currentPageClasses - 1) * pageSizeClasses + index + 1 }}</td>
                  <td class="py-2 px-2">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
                        {{ classItem.name.charAt(0).toUpperCase() }}
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-900">{{ classItem.name }}</div>
                        <div class="text-xs text-gray-500">Class ID: {{ classItem.id }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-sm max-w-xs">
                    <div class="truncate" :title="classItem.description">
                      {{ classItem.description || 'No description' }}
                    </div>
                  </td>
                  <td class="py-2 px-2">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {{ classItem.section_name || 'N/A' }}
                    </span>
                  </td>
                  <td class="py-2 px-2 text-center">
                    <div class="flex items-center justify-center gap-2">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {{ classItem.subjects_count || 0 }} Subjects
                      </span>
                    <button 
                      @click="openShowSubjectsModal(classItem)"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors duration-200"
                    >
                        View
                    </button>
                    </div>
                  </td>
                  <td class="py-2 px-2">
                    <div class="flex items-center justify-center gap-2">
                      <button 
                        @click="editClass(classItem)"
                        class="px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:from-indigo-600 hover:to-blue-700"
                        title="Edit Class"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        Edit
                      </button>
                      <button 
                        @click="openAssignSubjectsModal(classItem)"
                        class="px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
                        title="Assign Subjects"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                        </svg>
                        Assign
                      </button>
                      <button 
                        @click="removeClass(classItem)"
                        class="px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700"
                        title="Delete Class"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
      </div>

          <!-- Pagination for Classes -->
          <div v-if="!isLoading && classList.length > 0" class="w-full max-w-7xl mx-auto mt-8">
            <!-- Pagination Summary -->
            <div class="flex flex-row items-center justify-between mb-4">
                            <div class="text-gray-600 text-sm font-medium px-2">
                Showing {{ (currentPageClasses - 1) * pageSizeClasses + 1 }}
                to {{ Math.min(currentPageClasses * pageSizeClasses, totalClasses) }}
                of {{ totalClasses }} entries
              </div>
              <div class="flex items-center gap-4">
                <label class="text-sm text-gray-600 font-medium flex items-center gap-1">
                  Per page:
                  <select v-model="pageSizeClasses" @change="handleClassesCurrentChange(1)" class="rounded-md border border-purple-200 bg-white px-2 py-1 text-xs font-semibold text-purple-700 focus:ring-2 focus:ring-purple-300">
                    <option v-for="size in [10, 20, 50, 100]" :key="size" :value="size">{{ size }}</option>
                  </select>
                </label>
                </div>
            </div>

            <!-- Pagination Controls -->
            <div class="flex justify-center">
              <div class="flex items-center gap-2">
                    <button 
                  class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-50 text-purple-500 text-xl font-bold shadow-sm transition-all duration-200 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  :disabled="currentPageClasses === 1"
                  @click="handleClassesCurrentChange(currentPageClasses - 1)"
                  aria-label="Previous"
                    >
                  <span>&larr;</span>
                    </button>
                <span class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-600 text-white text-base font-bold shadow-md">
                  {{ currentPageClasses }}
                </span>
                    <button 
                  class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-50 text-purple-500 text-xl font-bold shadow-sm transition-all duration-200 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  :disabled="currentPageClasses === totalClassPages"
                  @click="handleClassesCurrentChange(currentPageClasses + 1)"
                  aria-label="Next"
                >
                  <span>&rarr;</span>
                    </button>
                  </div>
            </div>
          </div>
        </div>
      </div>

          <!-- No Classes Found -->
          <div v-if="!tableLoading && classList.length === 0" class="p-8">
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
                <h3 class="text-gray-600 font-medium text-xl mb-2">No Classes Found</h3>
                <p class="text-gray-500 text-sm font-normal leading-relaxed mb-4">
                  {{ totalClasses === 0 ? 'No classes have been created yet. Click "Add Class" to get started.' : 'No classes match your current filters. Try adjusting your search criteria.' }}
                </p>
                <button 
                  @click="showAddForm = true" 
                  class="mt-4 h-10 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                >
                  Add First Class
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    <!-- Sections Tab -->
    <div v-if="activeTab === 'sections'" class="w-full max-w-7xl mx-auto">
          <!-- Loading State -->
          <div v-if="sectionsLoading" class="w-full">
            <div class="border border-gray-200 rounded-xl p-8 bg-white/40 shadow-sm">
              <div class="flex flex-col items-center justify-center py-12">
                <div class="relative mb-6">
                  <div class="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                  <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-500 rounded-full animate-ping opacity-20"></div>
                </div>
                <div class="text-center">
                  <p class="text-gray-600 font-medium text-lg mb-1">Loading Sections</p>
                  <p class="text-gray-500 text-sm font-normal">Please wait while we fetch section data...</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Sections Content -->
          <div v-else>
      <!-- Section Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex flex-col items-start">
          <h3 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce"></div>
              Sections ({{ displaySectionsCount }})
          </h3>
          <div class="h-[2px] bg-purple-200 w-full transition-all duration-500" style="max-width: 120px"></div>
        </div>
        
        <button 
          @click="showAddSectionForm = true" 
          class="h-10 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
          Add Section
        </button>
      </div>

        <!-- Section Search -->
        <div class="mb-6">
          <div class="flex flex-col items-start mb-2">
            <h3 class="text-base font-medium text-gray-900 tracking-tight">Filter Sections</h3>
            <div class="h-[2px] bg-purple-200 w-full transition-all duration-300" style="max-width: 120px"></div>
          </div>
          
          <div class="rounded-lg border border-gray-200 bg-white/90 px-3 sm:px-4 lg:px-6 py-3 shadow-lg">
            <form class="w-full" @submit.prevent="handleSectionFilter">
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div class="flex flex-col w-full">
                  <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Search Section</label>
                  <div class="relative">
                    <input 
                      v-model="sectionFilters.search"
                      type="text" 
                      placeholder="Search by section name"
                      class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full pr-8"
                    />
                    <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                      </svg>
                    </div>
                    <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                  </div>
                </div>
                
                <div class="flex items-end gap-1 sm:gap-2">
                  <button 
                    @click="clearSectionFilters" 
                    type="button"
                    class="h-8 sm:h-9 px-3 sm:px-4 rounded-full bg-white hover:bg-white text-gray-900 text-xs sm:text-sm font-bold border border-gray-200 transition-all duration-300 transform hover:scale-105 flex items-center gap-1"
                    :disabled="!hasSectionFilters"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    <span class="hidden sm:inline">Clear</span>
                  </button>
                  <button 
                    type="submit" 
                    class="h-8 sm:h-9 px-3 sm:px-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-xs sm:text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-1"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"/>
                    </svg>
                    <span class="hidden sm:inline">Filter</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

      <!-- Sections Table -->
      <div class="w-full">
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <!-- Table Loading State -->
          <div v-if="sectionsTableLoading" class="p-8">
            <div class="flex flex-col items-center justify-center py-12">
              <div class="relative mb-6">
                <div class="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              </div>
              <p class="text-gray-600 font-medium">Loading table data...</p>
            </div>
          </div>
          
          <!-- Table Content -->
          <div v-if="!sectionsTableLoading && sectionList.length > 0" class="overflow-x-auto">
            <table class="min-w-full">
              <thead class="bg-gradient-to-r from-purple-50 to-pink-50">
                <tr>
                  <th class="text-left py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">#</th>
                  <th class="text-left py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Section Name</th>
                  <th class="text-left py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Description</th>
                  <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Classes Count</th>
                  <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(section, index) in sectionList" :key="section.id" class="hover:bg-purple-50 transition-colors border-b border-purple-200">
                  <td class="py-3 px-4 text-gray-900 font-normal text-sm">{{ (currentPageSections - 1) * pageSizeSections + index + 1 }}</td>
                  <td class="py-3 px-4">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
                        {{ section.name.charAt(0).toUpperCase() }}
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-900">Section {{ section.name }}</div>
                        <div class="text-xs text-gray-500">ID: {{ section.id }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="py-3 px-4 text-gray-900 font-normal text-sm max-w-xs">
                    <div class="truncate" :title="section.description">
                      {{ section.description || 'No description' }}
                    </div>
                  </td>
                  <td class="py-3 px-4 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {{ getClassCountBySection(section.id) }} classes
                    </span>
                  </td>
                  <td class="py-3 px-4">
                    <div class="flex items-center justify-center gap-2">
                      <button 
                        @click="editSection(section)"
                        class="px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:from-indigo-600 hover:to-blue-700"
                        title="Edit Section"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        Edit
                      </button>
                      <button 
                        @click="removeSection(section)"
                        class="px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700"
                        title="Delete Section"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
                </div>

          <!-- Pagination for Sections -->
          <div v-if="!sectionsLoading && sectionList.length > 0" class="w-full max-w-7xl mx-auto mt-8">
            <!-- Pagination Summary -->
            <div class="flex flex-row items-center justify-between mb-4">
              <div class="text-gray-600 text-sm font-medium px-2">
                Showing {{ (currentPageSections - 1) * pageSizeSections + 1 }}
                to {{ Math.min(currentPageSections * pageSizeSections, totalSections) }}
                of {{ totalSections }} entries
              </div>
              <div class="flex items-center gap-4">
                <label class="text-sm text-gray-600 font-medium flex items-center gap-1">
                  Per page:
                  <select v-model="pageSizeSections" @change="handleSectionsCurrentChange(1)" class="rounded-md border border-purple-200 bg-white px-2 py-1 text-xs font-semibold text-purple-700 focus:ring-2 focus:ring-purple-300">
                    <option v-for="size in [10, 20, 50, 100]" :key="size" :value="size">{{ size }}</option>
                  </select>
                </label>
                </div>
            </div>

            <!-- Pagination Controls -->
            <div class="flex justify-center">
              <div class="flex items-center gap-2">
                    <button 
                  class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-50 text-purple-500 text-xl font-bold shadow-sm transition-all duration-200 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  :disabled="currentPageSections === 1"
                  @click="handleSectionsCurrentChange(currentPageSections - 1)"
                  aria-label="Previous"
                    >
                  <span>&larr;</span>
                    </button>
                <span class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-600 text-white text-base font-bold shadow-md">
                  {{ currentPageSections }}
                </span>
                    <button 
                  class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-50 text-purple-500 text-xl font-bold shadow-sm transition-all duration-200 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  :disabled="currentPageSections === totalSectionPages"
                  @click="handleSectionsCurrentChange(currentPageSections + 1)"
                  aria-label="Next"
                >
                  <span>&rarr;</span>
                    </button>
              </div>
            </div>
          </div>
        </div>
      </div>

          <!-- Empty State for Sections -->
          <div v-if="!sectionsTableLoading && sectionList.length === 0" class="p-8">
            <div class="text-center py-16">
              <svg class="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
              <h3 class="text-lg font-medium text-gray-900 mb-2">No sections found</h3>
              <p class="text-gray-500">Get started by adding your first section.</p>
            </div>
          </div>
        </div>
      </div>

    <!-- Subjects Tab -->
    <div v-if="activeTab === 'subjects'" class="w-full max-w-7xl mx-auto">
      <!-- Loading State -->
      <div v-if="subjectsLoading" class="w-full">
        <div class="border border-gray-200 rounded-xl p-8 bg-white/40 shadow-sm">
          <div class="flex flex-col items-center justify-center py-12">
            <div class="relative mb-6">
              <div class="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-500 rounded-full animate-ping opacity-20"></div>
            </div>
            <div class="text-center">
              <p class="text-gray-600 font-medium text-lg mb-1">Loading Subjects</p>
              <p class="text-gray-500 text-sm font-normal">Please wait while we fetch subject data...</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Subjects Content -->
      <div v-else class="w-full">
      <!-- Subject Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex flex-col items-start">
          <h3 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce"></div>
              Subjects ({{ displaySubjectsCount }})
          </h3>
          <div class="h-[2px] bg-purple-200 w-full transition-all duration-500" style="max-width: 120px"></div>
        </div>
        
        <button 
          @click="showAddSubjectDialog = true" 
          class="h-10 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
          Add Subject
        </button>
      </div>

        <!-- Subject Search -->
        <div class="mb-6">
          <div class="flex flex-col items-start mb-2">
            <h3 class="text-base font-medium text-gray-900 tracking-tight">Filter Subjects</h3>
            <div class="h-[2px] bg-purple-200 w-full transition-all duration-300" style="max-width: 120px"></div>
          </div>
          
          <div class="rounded-lg border border-gray-200 bg-white/90 px-3 sm:px-4 lg:px-6 py-3 shadow-lg">
            <form class="w-full" @submit.prevent="handleSubjectFilter">
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div class="flex flex-col w-full">
                  <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Search Subject</label>
                  <div class="relative">
                    <input 
                      v-model="subjectFilters.search"
                      type="text" 
                      placeholder="Search by subject name (case-insensitive)"
                      class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full pr-8"
                    />
                    <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                      </svg>
                    </div>
                    <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                  </div>
                </div>
                
                <div class="flex items-end gap-1 sm:gap-2">
                  <button 
                    @click="clearSubjectFilters" 
                    type="button"
                    class="h-8 sm:h-9 px-3 sm:px-4 rounded-full bg-white hover:bg-white text-gray-900 text-xs sm:text-sm font-bold border border-gray-200 transition-all duration-300 transform hover:scale-105 flex items-center gap-1"
                    :disabled="!hasSubjectFilters"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    <span class="hidden sm:inline">Clear</span>
                  </button>
                  <button 
                    type="submit" 
                    class="h-8 sm:h-9 px-3 sm:px-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-xs sm:text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-1"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"/>
                    </svg>
                    <span class="hidden sm:inline">Filter</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

      <!-- Subjects Table -->
      <div class="w-full">
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <!-- Table Loading State -->
          <div v-if="subjectsTableLoading" class="p-8">
            <div class="flex flex-col items-center justify-center py-12">
              <div class="relative mb-6">
                <div class="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              </div>
              <p class="text-gray-600 font-medium">Loading table data...</p>
            </div>
          </div>
          
          <!-- Table Content -->
          <div v-else-if="!subjectsTableLoading && allSubjects.length > 0" class="overflow-x-auto">
            <table class="min-w-full">
              <thead class="bg-gradient-to-r from-pink-50 to-purple-50">
                <tr>
                  <th class="text-left py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">#</th>
                  <th class="text-left py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Subject Name</th>
                  <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Assigned Classes</th>
                  <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Created Date</th>
                  <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="(subject, index) in allSubjects" :key="subject.id" class="hover:bg-pink-50 transition-colors border-b border-purple-200">
                    <td class="py-3 px-4 text-gray-900 font-normal text-sm">{{ (currentPageSubjects - 1) * pageSizeSubjects + index + 1 }}</td>
                  <td class="py-3 px-4">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                        {{ subject.name.charAt(0).toUpperCase() }}
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-900">{{ subject.name }}</div>
                        <div class="text-xs text-gray-500">ID: {{ subject.id }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="py-3 px-4 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {{ getSubjectClassCount(subject.id) }} classes
                    </span>
                  </td>
                  <td class="py-3 px-4 text-center text-sm text-gray-500">
                    {{ formatDate(subject.created_at) }}
                  </td>
                  <td class="py-3 px-4">
                    <div class="flex items-center justify-center gap-2">
                      <button 
                        @click="editSubject(subject)"
                        class="px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:from-indigo-600 hover:to-blue-700"
                        title="Edit Subject"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        Edit
                      </button>
                      <button 
                        @click="removeSubject(subject)"
                        class="px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700"
                        title="Delete Subject"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          </div>
        </div>
      </div>
      
      <!-- Pagination for Subjects -->
      <div v-if="!subjectsTableLoading && allSubjects.length > 0" class="w-full max-w-7xl mx-auto mt-8">
        <!-- Pagination Summary -->
        <div class="flex flex-row items-center justify-between mb-4">
                        <div class="text-gray-600 text-sm font-medium px-2">
                Showing {{ (currentPageSubjects - 1) * pageSizeSubjects + 1 }}
                to {{ Math.min(currentPageSubjects * pageSizeSubjects, totalSubjects) }}
                of {{ totalSubjects }} entries
              </div>
          <div class="flex items-center gap-4">
            <label class="text-sm text-gray-600 font-medium flex items-center gap-1">
              Per page:
              <select v-model="pageSizeSubjects" @change="handleSubjectsCurrentChange(1)" class="rounded-md border border-purple-200 bg-white px-2 py-1 text-xs font-semibold text-purple-700 focus:ring-2 focus:ring-purple-300">
                <option v-for="size in [10, 20, 50, 100]" :key="size" :value="size">{{ size }}</option>
              </select>
            </label>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div class="flex justify-center">
          <div class="flex items-center gap-2">
            <button 
              class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-50 text-purple-500 text-xl font-bold shadow-sm transition-all duration-200 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-40 disabled:cursor-not-allowed"
              :disabled="currentPageSubjects === 1"
              @click="handleSubjectsCurrentChange(currentPageSubjects - 1)"
              aria-label="Previous"
            >
              <span>&larr;</span>
            </button>
            <span class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-600 text-white text-base font-bold shadow-md">
              {{ currentPageSubjects }}
            </span>
            <button 
              class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-50 text-purple-500 text-xl font-bold shadow-sm transition-all duration-200 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-40 disabled:cursor-not-allowed"
              :disabled="currentPageSubjects === totalSubjectPages"
              @click="handleSubjectsCurrentChange(currentPageSubjects + 1)"
              aria-label="Next"
            >
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Empty State for Subjects -->
      <div v-else-if="!subjectsTableLoading && allSubjects.length === 0" class="text-center py-16">
        <svg class="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No subjects found</h3>
        <p class="text-gray-500">Get started by adding your first subject.</p>
      </div>
    </div>

    <!-- Add Class Modal -->
    <div v-if="showAddForm" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">{{ isEdit ? 'Edit Class' : 'Add New Class' }}</h3>
        </div>
        
        <form @submit.prevent="submitForm" class="p-6 space-y-4">
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Class Name</label>
            <div class="relative">
              <input 
              v-model="form.name"
                type="text" 
              placeholder="Enter class name"
                required
                class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
              />
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>

          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</label>
            <div class="relative">
              <textarea 
              v-model="form.description"
              placeholder="Enter description"
                rows="3"
                class="border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full resize-none"
              ></textarea>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
          </div>
          </div>

          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Section</label>
            <div class="relative">
              <select v-model="form.section_id" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="">Select Section</option>
                <option v-for="section in sectionList" :key="section.id" :value="section.id">{{ section.name }}</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>

          <div class="flex gap-3 pt-4">
            <button 
              type="button"
              @click="closeAllClassModals"
              class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 text-sm font-bold text-white shadow hover:from-gray-600 hover:to-slate-600 transition-all duration-300"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              {{ isEdit ? 'Update' : 'Add' }} Class
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Add Section Modal -->
    <div v-if="showAddSectionForm" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click="closeAllClassModals">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300" @click.stop>
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">{{ isEditSection ? 'Edit Section' : 'Add New Section' }}</h3>
        </div>
        
        <form @submit.prevent="submitSectionForm" class="p-6 space-y-4">
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Section Name</label>
            <div class="relative">
              <input 
              v-model="sectionForm.name"
                type="text" 
                placeholder="Enter section name (e.g., A, B, C)"
                required
              @input="onSectionNameInput"
                class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
              />
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>

          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</label>
            <div class="relative">
              <textarea 
              v-model="sectionForm.description"
              placeholder="Enter description"
                rows="3"
                required
                class="border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full resize-none"
              ></textarea>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
          </div>
          </div>

          <div class="flex gap-3 pt-4">
            <button 
              type="button"
              @click="closeAllClassModals"
              class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 text-sm font-bold text-white shadow hover:from-gray-600 hover:to-slate-600 transition-all duration-300"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              {{ isEditSection ? 'Update' : 'Add' }} Section
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Add Subject Modal -->
    <div v-if="showAddSubjectDialog" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click="showAddSubjectDialog = false">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300" @click.stop>
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Add New Subjects</h3>
        </div>
        
        <div class="p-6 space-y-4">
          <div v-for="(subject, idx) in newSubjectNames" :key="idx" class="flex items-center gap-2">
            <div class="flex-1 flex flex-col">
              <div class="relative">
                <input 
                  v-model="newSubjectNames[idx]" 
                  type="text" 
                  placeholder="Enter subject name"
                  class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
                />
                <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
              </div>
            </div>
            <button 
              v-if="newSubjectNames.length > 1"
              @click="removeSubjectInput(idx)"
              type="button"
              class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
              </svg>
            </button>
          </div>
          
          <button 
            @click="addSubjectInput"
            type="button"
            class="w-full h-10 px-4 border-2 border-dashed border-purple-300 text-purple-600 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Add Another Subject
          </button>

          <div class="flex gap-3 pt-4">
            <button 
              @click="showAddSubjectDialog = false"
              class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 text-sm font-bold text-white shadow hover:from-gray-600 hover:to-slate-600 transition-all duration-300"
            >
              Cancel
            </button>
            <button 
              @click="addNewSubjects"
              class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Add Subjects
            </button>
        </div>
        </div>
      </div>
    </div>

      <!-- Assign Subjects Modal -->
    <div v-if="showAssignSubjectsModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click="showAssignSubjectsModal = false">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300" @click.stop>
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Assign Subjects to {{ selectedClassForAssign?.name }}</h3>
        </div>
        
        <div class="p-6">
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Select Subjects</label>
            <div class="grid grid-cols-2 gap-2 mt-2 max-h-60 overflow-y-auto">
              <label 
                v-for="subject in allSubjects"
                :key="subject.id"
                class="flex items-center gap-2 p-2 rounded-lg hover:bg-white cursor-pointer"
              >
                <input 
                  type="checkbox" 
                :value="subject.id"
                  v-model="selectedSubjectsForAssign"
                  class="w-4 h-4 text-purple-600 border-gray-200 rounded focus:ring-purple-500"
                />
                <span class="text-sm">{{ subject.name }}</span>
              </label>
            </div>
          </div>

          <div class="flex gap-3 pt-6">
            <button 
              @click="showAssignSubjectsModal = false"
              class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 text-sm font-bold text-white shadow hover:from-gray-600 hover:to-slate-600 transition-all duration-300"
            >
              Cancel
            </button>
            <button 
              @click="assignSubjectsToClass"
              class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Assign Subjects
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Show Subjects Modal -->
    <div v-if="showSubjectsModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click="showSubjectsModal = false">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300" @click.stop>
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Subjects for {{ selectedClassForShow?.name }}</h3>
        </div>
        
        <div class="p-6">
          <div v-if="subjectsForShow.length > 0" class="space-y-2">
            <div 
              v-for="subject in subjectsForShow"
              :key="subject.id"
              class="flex items-center gap-3 p-3 bg-white rounded-lg"
            >
              <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
          </div>
              <span class="text-sm font-medium text-gray-900">{{ subject.name }}</span>
          </div>
        </div>
          <div v-else class="text-center py-8">
            <svg class="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            <p class="text-gray-500">No subjects assigned yet</p>
          </div>

          <div class="pt-6">
            <button 
              @click="showSubjectsModal = false"
              class="w-full h-10 px-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Close
            </button>
        </div>
      </div>
    </div>

    <!-- Edit Subject Modal -->
    <div v-if="showEditSubjectDialog" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click="showEditSubjectDialog = false">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300" @click.stop>
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">{{ isEditSubject ? 'Edit Subject' : 'Add New Subject' }}</h3>
        </div>
        
        <form @submit.prevent="submitSubjectForm" class="p-6 space-y-4">
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject Name</label>
            <div class="relative">
              <input 
                v-model="subjectForm.name"
                type="text" 
                placeholder="Enter subject name"
                required
                class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
              />
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>

          <div class="flex gap-3 pt-4">
            <button 
              type="button"
              @click="showEditSubjectDialog = false"
              class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 text-sm font-bold text-white shadow hover:from-gray-600 hover:to-slate-600 transition-all duration-300"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              {{ isEditSubject ? 'Update' : 'Add' }} Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useToast } from 'vue-toastification'
import api from '@/utils/axios'
import { useAnimatedList } from '@/composables/useAnimatedList'

// Reactive data
const activeTab = ref('classes')
const formRef = ref()
const form = ref({ name: '', description: '', section_id: '' })
const showAddForm = ref(false)
const isEdit = ref(false)
const editId = ref(null)
const { listKey, isLoading, withAnimation } = useAnimatedList()
const sectionsLoading = ref(false)
const sectionsTableLoading = ref(false)
const subjectsLoading = ref(false)
const subjectsTableLoading = ref(false)

// Classes data and pagination
const classList = ref([])
const filters = ref({ className: '', section: '' })
const sortBy = ref('name')
const sortDirection = ref('asc')
const currentPageClasses = ref(1)
const pageSizeClasses = ref(10)
const totalClasses = ref(0)
const tableLoading = ref(false)

// Static counts that don't change with filters - these should NEVER be updated with filtered results
const staticTotalClasses = ref(0)
const staticTotalSections = ref(0)
const staticTotalSubjects = ref(0)

// Sections data and pagination
const sectionList = ref([])
const sectionFilters = ref({ search: '' })
const currentPageSections = ref(1)
const pageSizeSections = ref(10)
const totalSections = ref(0)

// Subjects data and pagination
const allSubjects = ref([])
const subjectFilters = ref({ search: '' })
const currentPageSubjects = ref(1)
const pageSizeSubjects = ref(10)
const totalSubjects = ref(0)

const showAddSectionForm = ref(false)
const isEditSection = ref(false)
const editSectionId = ref(null)
const sectionFormRef = ref()
const sectionForm = ref({ name: '', description: '' })

const selectedSection = ref(null)
const selectedClasses = ref([])

const showAddSubjectDialog = ref(false)
const newSubjectNames = ref([''])

// Subject edit variables
const showEditSubjectDialog = ref(false)
const isEditSubject = ref(false)
const editSubjectId = ref(null)
const subjectForm = ref({ name: '' })

const showAssignSubjectsModal = ref(false)
const selectedClassForAssign = ref(null)
const selectedSubjectsForAssign = ref([])

const showSubjectsModal = ref(false)
const selectedClassForShow = ref(null)
const subjectsForShow = ref([])

const toast = useToast()

// Computed properties
const totalClassPages = computed(() => Math.ceil(totalClasses.value / pageSizeClasses.value))
const totalSectionPages = computed(() => Math.ceil(totalSections.value / pageSizeSections.value))
const totalSubjectPages = computed(() => Math.ceil(totalSubjects.value / pageSizeSubjects.value))

// Computed properties for displaying static counts
const displayClassesCount = computed(() => {
  return staticTotalClasses.value || totalClasses.value || classList.value.length
})

const displaySectionsCount = computed(() => {
  return staticTotalSections.value || totalSections.value || sectionList.value.length
})

const displaySubjectsCount = computed(() => {
  return staticTotalSubjects.value || totalSubjects.value || allSubjects.value.length
})

// Computed properties to check if filters are active
const hasClassFilters = computed(() => {
  return filters.value.className.trim() !== '' || filters.value.section !== ''
})

const hasSectionFilters = computed(() => {
  return sectionFilters.value.search.trim() !== ''
})

const hasSubjectFilters = computed(() => {
  return subjectFilters.value.search.trim() !== ''
})

const getClassPageNumbers = computed(() => {
  const pages = []
  const total = totalClassPages.value
  const current = currentPageClasses.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...', total)
    } else if (current >= total - 3) {
      pages.push(1, '...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1, '...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...', total)
    }
  }
  
  return pages.filter(page => page !== '...')
})

const getSectionPageNumbers = computed(() => {
  const pages = []
  const total = totalSectionPages.value
  const current = currentPageSections.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...', total)
    } else if (current >= total - 3) {
      pages.push(1, '...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1, '...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...', total)
    }
  }
  
  return pages.filter(page => page !== '...')
})

const getSubjectPageNumbers = computed(() => {
  const pages = []
  const total = totalSubjectPages.value
  const current = currentPageSubjects.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...', total)
    } else if (current >= total - 3) {
      pages.push(1, '...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1, '...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...', total)
    }
  }
  
  return pages.filter(page => page !== '...')
})

// Methods
const fetchClasses = async (resetPagination = false) => {
  if (resetPagination) {
    currentPageClasses.value = 1
  }
  try {
    tableLoading.value = true
    const response = await api.get('/classes', {
      params: {
        page: currentPageClasses.value,
        per_page: pageSizeClasses.value,
        search: filters.value.className?.trim(), // Send as-is to backend for case-insensitive search
        section_id: filters.value.section,
        sort_by: sortBy.value,
        sort_direction: sortDirection.value
      }
    })
    if (response.data.success) {
      const result = response.data.result
      classList.value = result.data || []
      totalClasses.value = result.total || 0
      
      // Set static count only on first load (when static count is 0) - NEVER update with filtered results
      if (staticTotalClasses.value === 0) {
        staticTotalClasses.value = result.total || result.data?.length || 0
      }
      
      // Sections are already included in the API response as section_name
    } else {
      toast.error(response.data.message || 'Failed to fetch classes')
    }
  } catch (error) {
    console.error('Error fetching classes:', error)
    toast.error(error.response?.data?.message || 'Failed to fetch classes')
  } finally {
    tableLoading.value = false
  }
}

const fetchSections = async (showLoading = true, isTableLoad = false, resetPagination = false) => {
  if (resetPagination) {
    currentPageSections.value = 1
  }
  if (showLoading && !isTableLoad) sectionsLoading.value = true
  if (isTableLoad) sectionsTableLoading.value = true
  try {
    const response = await api.get('/sections', {
      params: {
        page: currentPageSections.value,
        per_page: pageSizeSections.value,
        search: sectionFilters.value.search?.trim(), // Send as-is to backend for case-insensitive search
        sort_by: 'name',
        sort_direction: 'asc'
      }
    })
    if (response.data.success) {
      const result = response.data.result
      sectionList.value = result.data || []
      totalSections.value = result.total || 0
      
      // Set static count only on first load (when static count is 0)
      if (staticTotalSections.value === 0) {
        staticTotalSections.value = result.total || result.data?.length || 0
      }
    } else {
      toast.error(response.data.message || 'Failed to fetch sections')
    }
  } catch (error) {
    console.error('Error fetching sections:', error)
    toast.error(error.response?.data?.message || 'Failed to fetch sections')
  } finally {
    if (showLoading && !isTableLoad) sectionsLoading.value = false
    if (isTableLoad) sectionsTableLoading.value = false
  }
}

const fetchAllSubjects = async (showLoading = true, isTableLoad = false, resetPagination = false) => {
  if (resetPagination) {
    currentPageSubjects.value = 1
  }
  if (showLoading && !isTableLoad) subjectsLoading.value = true
  if (isTableLoad) subjectsTableLoading.value = true
  try {
    const res = await api.get('/subjects', {
      params: {
        page: currentPageSubjects.value,
        per_page: pageSizeSubjects.value,
        search: subjectFilters.value.search?.trim(), // Send as-is to backend for case-insensitive search
        sort_by: 'name',
        sort_direction: 'asc'
      }
    })
    
    if (res.data.status && res.data.result) {
      const result = res.data.result
      allSubjects.value = result.data || []
      totalSubjects.value = result.total || 0
      
      // Set static count only on first load (when static count is 0)
      if (staticTotalSubjects.value === 0) {
        staticTotalSubjects.value = result.total || result.data?.length || 0
      }
    } else {
      allSubjects.value = []
      totalSubjects.value = 0
    }
  } catch (error) {
    console.error('Error fetching subjects:', error)
    allSubjects.value = []
    totalSubjects.value = 0
  } finally {
    if (showLoading && !isTableLoad) subjectsLoading.value = false
    if (isTableLoad) subjectsTableLoading.value = false
  }
}

const submitForm = async () => {
  if (!form.value.name.trim()) {
    toast.error('Class name is required')
    return
  }

    try {
      if (isEdit.value && editId.value) {
        // Update class
      const response = await api.post(`/classes/${editId.value}/update`, form.value)
        if (response.data.success) {
          toast.success('Class updated successfully!')
          showAddForm.value = false
          await withAnimation(fetchClasses)
        } else {
          toast.error(response.data.message || 'Failed to update class')
        }
      } else {
        // Add class
      const response = await api.post('/classes/store', form.value)
        if (response.data.success) {
          toast.success('Class added successfully!')
          showAddForm.value = false
          await withAnimation(fetchClasses)
        } else {
          toast.error(response.data.message || 'Failed to add class')
        }
      }
      form.value = { name: '', description: '', section_id: '' }
      isEdit.value = false
      editId.value = null
    } catch (error) {
    console.error('Error submitting form:', error)
      toast.error(error.response?.data?.message || 'Failed to submit form')
    }
}

const handleSort = (column) => {
  if (sortBy.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column
    sortDirection.value = 'asc'
  }
  fetchClasses()
}

const editClass = (row) => {
  form.value = { name: row.name, description: row.description, section_id: row.section_id }
  isEdit.value = true
  editId.value = row.id
  showAddForm.value = true
}

const removeClass = async (row) => {
  const result = await ElMessageBox.confirm('Delete Class?', `Are you sure you want to delete "${row.name}"?`, row.name, {
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })

  if (result) {
    try {
      const response = await api.post(`/classes/${row.id}/delete`)
      if (response.data.success) {
        toast.success('Success!', 'Class deleted successfully.')
        await withAnimation(fetchClasses)
      } else {
        toast.error('Error!', response.data.message || 'Failed to delete class')
      }
    } catch (error) {
      console.error('Error deleting class:', error)
      toast.error('Error!', error.response?.data?.message || 'Failed to delete class')
    }
  }
}

const submitSectionForm = async () => {
  if (!sectionForm.value.name.trim() || !sectionForm.value.description.trim()) {
    toast.error('Section name and description are required')
    return
  }

    try {
      let response
      if (isEditSection.value && editSectionId.value) {
      response = await api.post(`/sections/${editSectionId.value}/update`, sectionForm.value)
      } else {
              response = await api.post('/sections/store', sectionForm.value)
      }
      if (response.data.success) {
        toast.success(isEditSection.value ? 'Section updated successfully!' : 'Section added successfully!')
        showAddSectionForm.value = false
        sectionForm.value = { name: '', description: '' }
        isEditSection.value = false
        editSectionId.value = null
        await fetchSections()
      } else {
        toast.error(response.data.message || 'Failed to save section')
      }
    } catch (error) {
    console.error('Error submitting section form:', error)
      if (error.response?.data?.errors) {
        const firstError = Object.values(error.response.data.errors)[0][0]
      toast.error(firstError)
      } else {
      toast.error(error.response?.data?.message || 'Failed to add section')
    }
  }
}

const onSectionNameInput = (e) => {
  let value = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase()
  sectionForm.value.name = value
}

const closeAllClassModals = () => {
  showAddForm.value = false
  showAddSectionForm.value = false
  showEditSubjectDialog.value = false
  isEdit.value = false
  editId.value = null
  isEditSection.value = false
  editSectionId.value = null
  isEditSubject.value = false
  editSubjectId.value = null
  sectionForm.value = { name: '', description: '' }
  subjectForm.value = { name: '' }
  form.value = { name: '', description: '', section_id: '' }
}

const editSection = (row) => {
  sectionForm.value = { name: row.name, description: row.description }
  isEditSection.value = true
  editSectionId.value = row.id
  showAddSectionForm.value = true
}

const removeSection = async (row) => {
  const result = await ElMessageBox.confirm('Delete Section?', `Are you sure you want to delete "${row.name}"?`, row.name, {
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })

  if (result) {
    try {
      const response = await api.post(`/sections/${row.id}/delete`)
      if (response.data.success) {
        toast.success('Success!', 'Section deleted successfully.')
        await fetchSections()
      } else {
        toast.error('Error!', response.data.message || 'Failed to delete section')
      }
    } catch (error) {
      console.error('Error deleting section:', error)
      toast.error('Error!', error.response?.data?.message || 'Failed to delete section')
    }
  }
}

const getSectionNameById = (id) => {
  if (!id) return 'N/A'
  const section = sectionList.value.find(s => s.id === id)
  return section ? section.name : 'Loading...'
}

const getClassCountBySection = (sectionId) => {
  // Since we're using server-side pagination, we can't filter client-side
  // This would need to be implemented in the backend or cached
  return Math.floor(Math.random() * 5) + 1 // Placeholder for now
}

const getSubjectClassCount = (subjectId) => {
  // This would need to be implemented based on your backend API
  // For now, returning a placeholder
  return Math.floor(Math.random() * 5) + 1
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch (e) {
    return 'N/A'
  }
}

const editSubject = (subject) => {
  subjectForm.value = { name: subject.name }
  isEditSubject.value = true
  editSubjectId.value = subject.id
  showEditSubjectDialog.value = true
}

const submitSubjectForm = async () => {
  if (!subjectForm.value.name.trim()) {
    toast.error('Subject name is required')
    return
  }

  try {
    let response
    if (isEditSubject.value && editSubjectId.value) {
      response = await api.post(`/subjects/${editSubjectId.value}/update`, subjectForm.value)
    } else {
      response = await api.post('/subjects/store', subjectForm.value)
    }
    
    if (response.data.success || response.data.status) {
      toast.success(isEditSubject.value ? 'Subject updated successfully!' : 'Subject added successfully!')
      showEditSubjectDialog.value = false
      subjectForm.value = { name: '' }
      isEditSubject.value = false
      editSubjectId.value = null
      await fetchAllSubjects()
    } else {
      toast.error(response.data.message || 'Failed to save subject')
    }
  } catch (error) {
    console.error('Error submitting subject form:', error)
    if (error.response?.data?.errors) {
      const firstError = Object.values(error.response.data.errors)[0][0]
      toast.error(firstError)
    } else {
      toast.error(error.response?.data?.message || 'Failed to save subject')
    }
  }
}

const removeSubject = async (subject) => {
  const result = await ElMessageBox.confirm('Delete Subject?', `Are you sure you want to delete "${subject.name}"?`, subject.name, {
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })

  if (result) {
    try {
      const response = await api.post(`/subjects/${subject.id}/delete`)
      if (response.data.success) {
        toast.success('Success!', 'Subject deleted successfully.')
        await fetchAllSubjects()
      } else {
        toast.error('Error!', response.data.message || 'Failed to delete subject')
      }
    } catch (error) {
      console.error('Error deleting subject:', error)
      toast.error('Error!', error.response?.data?.message || 'Failed to delete subject')
    }
  }
}

const addSubjectInput = () => {
  newSubjectNames.value.push('')
}

const removeSubjectInput = (idx) => {
  newSubjectNames.value.splice(idx, 1)
}

const addNewSubjects = async () => {
  const names = newSubjectNames.value.map(s => s.trim()).filter(Boolean)
  if (!names.length) {
    toast.error('Please enter at least one subject name')
    return
  }
  
  try {
    const res = await api.post('/subjects/bulk-store', { names })
    if (res.data.status || res.data.success) {
      toast.success('Subjects added successfully!')
      showAddSubjectDialog.value = false
      newSubjectNames.value = ['']
      await fetchAllSubjects()
    } else {
      toast.error(res.data.message || 'Failed to add subjects')
    }
  } catch (error) {
    console.error('Error adding subjects:', error)
    toast.error('Failed to add subjects')
  }
}

const openAssignSubjectsModal = async (classRow) => {
  selectedClassForAssign.value = classRow
  showAssignSubjectsModal.value = true
  await fetchAllSubjects()
  
  // Fetch already assigned subjects for this class
  try {
    const res = await api.get(`/classes/${classRow.id}`)
    if (res.data && res.data.result && res.data.result.subjects) {
      selectedSubjectsForAssign.value = res.data.result.subjects.map(s => s.id)
    } else {
      selectedSubjectsForAssign.value = []
    }
  } catch (error) {
    console.error('Error fetching class subjects:', error)
    selectedSubjectsForAssign.value = []
  }
}

const assignSubjectsToClass = async () => {
  try {
    const res = await api.post(`/classes/${selectedClassForAssign.value.id}/assign-subjects`, {
      subject_ids: selectedSubjectsForAssign.value
    })
    if (res.data.status || res.data.success) {
      toast.success('Subjects assigned successfully!')
      showAssignSubjectsModal.value = false
    } else {
      toast.error(res.data.message || 'Failed to assign subjects')
    }
  } catch (error) {
    console.error('Error assigning subjects:', error)
    toast.error('Failed to assign subjects')
  }
}

const openShowSubjectsModal = async (classRow) => {
  selectedClassForShow.value = classRow
  showSubjectsModal.value = true
  
  // Fetch subjects for this class
  try {
    const res = await api.get(`/classes/${classRow.id}`)
    if (res.data && res.data.result && res.data.result.subjects) {
      subjectsForShow.value = res.data.result.subjects
    } else {
      subjectsForShow.value = []
    }
  } catch (error) {
    console.error('Error fetching class subjects:', error)
    subjectsForShow.value = []
  }
}

// Pagination handlers (same as student list)
const handleClassesCurrentChange = (val) => {
  currentPageClasses.value = val
  fetchClasses()
}

const handleSectionsCurrentChange = (val) => {
  currentPageSections.value = val
  fetchSections()
}

const handleSubjectsCurrentChange = (val) => {
  currentPageSubjects.value = val
  fetchAllSubjects()
}

// Watch for filter changes - REMOVED automatic API calls
// Now API calls only happen when Filter button is clicked
// watch([() => filters.value.className, () => filters.value.section], () => {
//   currentPageClasses.value = 1
//   fetchClasses()
// })

// Watch for section filter changes - REMOVED automatic API calls
// watch(() => sectionFilters.value.search, () => {
//   currentPageSections.value = 1
//   fetchSections(false, true)
// })

// Watch for subject filter changes - REMOVED automatic API calls
// watch(() => subjectFilters.value.search, () => {
//   currentPageSubjects.value = 1
//   fetchAllSubjects(false, true)
// })

// Watch for tab changes to refresh data
watch(activeTab, (newTab) => {
  if (newTab === 'classes') {
    currentPageClasses.value = 1
    // Load sections silently for the filter dropdown
    if (sectionList.value.length === 0) {
      fetchSections(false)
    }
    withAnimation(fetchClasses)
  } else if (newTab === 'sections') {
    currentPageSections.value = 1
    fetchSections(true)
  } else if (newTab === 'subjects') {
    currentPageSubjects.value = 1
    fetchAllSubjects()
  }
})

// Fetch static counts using single endpoint - these will NEVER change with filters
const fetchStaticCounts = async () => {
  try {
    const response = await api.get('/statistics/counts')
    if (response.data.success) {
      const counts = response.data.result
      staticTotalClasses.value = counts.classes || 0
      staticTotalSections.value = counts.sections || 0
      staticTotalSubjects.value = counts.subjects || 0
    } else {
      console.error('Failed to fetch counts:', response.data.message)
    }
  } catch (error) {
    console.error('Error fetching static counts:', error)
    // Fallback to individual API calls if statistics endpoint fails
    try {
      const classesResponse = await api.get('/classes', { params: { per_page: 1 } })
      if (classesResponse.data.success) {
        staticTotalClasses.value = classesResponse.data.result.total || 0
      }
      
      const sectionsResponse = await api.get('/sections', { params: { per_page: 1 } })
      if (sectionsResponse.data.success) {
        staticTotalSections.value = sectionsResponse.data.result.total || 0
      }
      
      const subjectsResponse = await api.get('/subjects', { params: { per_page: 1 } })
      if (subjectsResponse.data.status) {
        staticTotalSubjects.value = subjectsResponse.data.result.total || 0
      }
    } catch (fallbackError) {
      console.error('Fallback count fetching also failed:', fallbackError)
    }
  }
}

// Clear filter functions
const clearClassFilters = () => {
  filters.value.className = ''
  filters.value.section = ''
  // Removed automatic API call - user needs to click Filter button
}

const clearSectionFilters = () => {
  sectionFilters.value.search = ''
  // Removed automatic API call - user needs to click Filter button
}

const clearSubjectFilters = () => {
  subjectFilters.value.search = ''
  // Removed automatic API call - user needs to click Filter button
}

// Filter submission functions that reset pagination
const handleClassFilter = () => {
  fetchClasses(true) // Reset pagination to page 1
}

const handleSectionFilter = () => {
  fetchSections(true, false, true) // Reset pagination to page 1
}

const handleSubjectFilter = () => {
  fetchAllSubjects(true, false, true) // Reset pagination to page 1
}

// Lifecycle
onMounted(async () => {
  try {
    // Fetch static counts first
    await fetchStaticCounts()
    
    // Then fetch the actual data
    await Promise.all([
      withAnimation(fetchClasses),
      fetchSections(false), // Don't show loading for sections when loading classes
      fetchAllSubjects()
    ])
    
    // Ensure static counts are set even if initial fetch failed
    if (staticTotalClasses.value === 0) {
      await fetchStaticCounts()
    }
  } catch (error) {
    console.error('Error loading initial data:', error)
  }
})
</script>

<style scoped>
/* Professional ERP styling */
.bg-white\/90 {
  background-color: #ffffff;
}

.bg-white\/95 {
  background-color: #ffffff;
}

.text-gray-600 {
  color: #64748b;
}

.text-gray-600 {
  color: #64748b;
}

.text-gray-600 {
  color: #1e293b;
}

.text-gray-900 {
  color: #1e293b;
}

.text-gray-900 {
  color: #1e293b;
}

.text-gray-900 {
  color: #1e293b;
}

/* Enhanced responsive design */
@media (max-width: 640px) {
  .statistics-card {
    @apply p-4;
  }
  
  .table-responsive {
    @apply text-xs;
  }
  
  .action-buttons {
    @apply flex-col gap-1;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .statistics-card {
    @apply p-5;
  }
  
  .table-responsive {
    @apply text-sm;
  }
}

@media (min-width: 1025px) {
  .statistics-card {
    @apply p-6;
  }
  
  .table-responsive {
    @apply text-base;
  }
}

/* Enhanced animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Enhanced hover effects */
.hover-lift {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Glass morphism effects */
.glass {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

/* Enhanced gradients */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Tab animations */
.tab-content {
  animation: fadeInUp 0.3s ease-out;
}

/* Modal animations */
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Enhanced table styles */
.table-hover-effect {
  transition: all 0.3s ease;
}

.table-hover-effect:hover {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
  transform: scale(1.01);
}

/* Responsive typography */
.text-responsive {
  font-size: clamp(0.875rem, 2vw, 1rem);
}

/* Enhanced button styles */
.btn-modern {
  @apply relative overflow-hidden;
}

.btn-modern::before {
  content: '';
  @apply absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 transition-opacity duration-300;
}

.btn-modern:hover::before {
  @apply opacity-100;
}

/* Loading animations */
.loading-dots {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.loading-dots div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #8b5cf6;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.loading-dots div:nth-child(1) {
  left: 8px;
  animation: loading-dots1 0.6s infinite;
}

.loading-dots div:nth-child(2) {
  left: 8px;
  animation: loading-dots2 0.6s infinite;
}

.loading-dots div:nth-child(3) {
  left: 32px;
  animation: loading-dots2 0.6s infinite;
}

.loading-dots div:nth-child(4) {
  left: 56px;
  animation: loading-dots3 0.6s infinite;
}

@keyframes loading-dots1 {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}

@keyframes loading-dots3 {
  0% { transform: scale(1); }
  100% { transform: scale(0); }
}

@keyframes loading-dots2 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(24px, 0); }
}

/* Enhanced scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/* SweetAlert Modern Styles */
.swal-modern {
  border-radius: 16px !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px) !important;
}

.swal-modern .swal2-title {
  font-size: 24px !important;
  font-weight: 700 !important;
  margin-bottom: 1rem !important;
  color: #1e293b !important;
}

.swal-modern .swal2-content {
  font-size: 16px !important;
  line-height: 1.6 !important;
  color: #94a3b8 !important;
  margin: 1rem 0 !important;
}

.swal-modern .swal2-actions {
  margin-top: 1.5rem !important;
  gap: 12px !important;
}

/* Modern Delete Button */
.swal-delete-btn {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%) !important;
  color: #ffffff !important;
  border: none !important;
  padding: 12px 24px !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 14px 0 rgba(220, 38, 38, 0.3) !important;
  transition: all 0.3s ease !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
}

.swal-delete-btn:hover {
  background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 25px 0 rgba(220, 38, 38, 0.4) !important;
}

.swal-delete-btn:active {
  transform: translateY(0) !important;
}

/* Modern Cancel Button */
.swal-cancel-btn {
  background: linear-gradient(135deg, #94a3b8 0%, #4b5563 100%) !important;
  color: #ffffff !important;
  border: none !important;
  padding: 12px 24px !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 14px 0 rgba(107, 114, 128, 0.3) !important;
  transition: all 0.3s ease !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
}

.swal-cancel-btn:hover {
  background: linear-gradient(135deg, #4b5563 0%, #374151 100%) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 25px 0 rgba(107, 114, 128, 0.4) !important;
}

.swal-cancel-btn:active {
  transform: translateY(0) !important;
}

/* Success/Error Message Styling */
.swal-modern .swal2-icon {
  margin: 1rem auto !important;
}

.swal-modern .swal2-timer-progress-bar {
  background: linear-gradient(90deg, #10b981 0%, #059669 100%) !important;
  height: 4px !important;
  border-radius: 2px !important;
}

::-webkit-scrollbar-track {
  background: rgba(139, 92, 246, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #7c3aed, #db2777);
}

/* Mobile-first responsive utilities */
@media (max-width: 640px) {
  .mobile-hidden {
    display: none;
  }
  
  .mobile-full {
    width: 100%;
  }
  
  .mobile-text-center {
    text-align: center;
  }
}

@media (min-width: 641px) {
  .desktop-hidden {
    display: none;
  }
}

/* Enhanced focus states */
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2;
}

/* Smooth transitions for all interactive elements */
* {
  transition: all 0.2s ease-in-out;
}

/* Enhanced accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style> 