<template>
  <div class="relative w-full min-h-screen pl-0 pr-0 sm:pl-0 sm:pr-0 lg:pl-1 lg:pr-0 py-2 sm:py-3 lg:py-4">
    <!-- Top Bar Header -->
    <div class="relative z-10 mb-6 rounded-xl border border-gray-200/50 bg-white/60 px-6 py-4 shadow-lg backdrop-filter backdrop-blur-xl flex items-center justify-between">
      <h2 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        Teacher Management
      </h2>
      <div class="flex items-center gap-4">
        <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
          <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Dashboard</span>
          <span class="mx-2">|</span>
          <span class="text-gray-900 font-bold">Faculty</span>
        </nav>
        <button 
          @click="handleAddTeacher"
          class="h-9 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-sm hover:shadow-md transform origin-left hover:scale-105 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
          </svg>
          Add Teacher
        </button>
      </div>
    </div>

    <!-- Select Criteria Label -->
    <div class="relative z-10 mb-6">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-900 tracking-tight">Select Criteria</h3>
        <div class="h-[2px] bg-purple-200 w-full transition-all duration-300" style="max-width: 110px"></div>
        </div>
    </div>

    <!-- Filter Bar in Card -->
    <div class="relative z-10 rounded-lg transition-all duration-500 ease-in-out transform hover:shadow-lg bg-white p-4">
      <form class="w-full" @submit.prevent="handleSearch">
        <div class="flex flex-wrap items-end gap-x-4 gap-y-3">
          <div class="flex flex-col w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] lg:flex-1">
            <label class="mb-1 text-base font-normal text-black modern-font">Search</label>
            <div class="relative">
              <input 
              v-model="searchQuery"
                type="text" 
              placeholder="Search teachers..."
                class="h-9 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
              />
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
          <div class="flex flex-col w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] lg:flex-1">
            <label class="mb-1 text-base font-normal text-black modern-font">Department</label>
            <div class="relative">
              <select v-model="selectedDepartment" class="h-9 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="">All Departments</option>
                <option v-for="dept in departments" :key="dept.id" :value="dept.id">{{ dept.name }}</option>
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
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="on_leave">On Leave</option>
                <option value="inactive">Inactive</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
          <div class="flex flex-col w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] lg:flex-1">
            <label class="mb-1 text-base font-normal text-black modern-font">Designation</label>
            <div class="relative">
              <select v-model="selectedDesignation" class="h-9 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="">All Designations</option>
                <option value="teacher">Teacher</option>
                <option value="principal">Principal</option>
                <option value="vice_principal">Vice Principal</option>
                <option value="head_teacher">Head Teacher</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
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
              @click="handleExport"
              class="h-9 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-sm hover:shadow-md transform origin-left hover:scale-105 flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Export
            </button>
          </div>
        </div>
      </form>
      </div>

    <!-- Data List Header with Animation -->
    <div class="relative z-10 flex items-center justify-between mb-6 mt-8">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce"></div>
          Teachers List ({{ total }})
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
    <div class="relative z-10">
      <div class="h-[2px] w-full bg-purple-200 mb-4"></div>
                    </div>

    <!-- Loader -->
    <div v-if="loading" class="relative z-10">
      <div class="border border-gray-200 rounded-xl p-8 bg-white/40 shadow-sm">
        <div class="flex flex-col items-center justify-center py-12">
          <!-- Modern Loading Animation -->
          <div class="relative mb-6">
            <div class="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-500 rounded-full animate-ping opacity-20"></div>
                    </div>
          <div class="text-center">
            <p class="text-gray-600 font-medium text-lg mb-1">Loading Teachers</p>
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

    <!-- Teachers Table -->
    <div v-else class="relative z-10">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Table Content -->
        <div class="overflow-x-auto">
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
              <template v-for="(teacher, idx) in teachers" :key="teacher.id">
                <tr :class="[ 'hover:bg-indigo-50 transition-colors', 'border-b border-purple-200', idx === teachers.length - 1 ? 'border-b-2 border-purple-400' : '' ]">
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">
                    <div class="flex items-center gap-2">
                      <div class="relative w-7 h-7">
                        <img 
                          v-if="getProfilePicture(teacher)"
                          :src="getProfilePicture(teacher)" 
                          :alt="teacher.first_name"
                          class="w-7 h-7 rounded-full object-cover border border-gray-200"
                          @error="handleImageError"
                        />
                        <div 
                          v-else
                          class="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-medium border border-gray-200"
                        >
                          {{ getTeacherInitials(teacher) }}
                    </div>
                    </div>
                      <button 
                         @click="teacher && toggleTeacherDetails(teacher.id)"
                         class="p-1 rounded-full hover:bg-white transition-colors duration-200"
                         title="Toggle Details"
                       >
                        <svg 
                          class="w-4 h-4 text-gray-600 transition-transform duration-200"
                          :class="{ 'rotate-90': expandedTeachers[teacher.id] }"
                          fill="none" 
                          stroke="currentColor" 
                          stroke-width="2" 
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                        </svg>
                      </button>
                      <div>
                        <div class="text-xs text-gray-900">{{ teacher.first_name }} {{ teacher.last_name }}</div>
                        <div v-if="teacher.employee_code" class="text-xs text-gray-900/50 leading-tight">ID: {{ teacher.employee_code }}</div>
                  </div>
              </div>
                  </td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">
                    <div class="text-xs text-gray-900">
                      {{ teacher.department?.name || '-' }}
                    </div>
                  </td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">
                    <div class="text-xs text-gray-900">
                      {{ teacher.designation || '-' }}
                    </div>
                  </td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">
                    <div class="text-xs text-gray-900">
                      <div>{{ teacher.phone_number || '-' }}</div>
                      <div class="text-gray-900/50">{{ teacher.email || '-' }}</div>
                    </div>
                  </td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">
                    <span :class="[
                      'px-2 inline-flex text-xs leading-5 font-medium rounded-full',
                      getStatusClass(teacher.status)
                    ]">
                      {{ teacher.status || 'active' }}
                    </span>
                  </td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">
                    <div class="flex items-center gap-2 justify-center">
                      <!-- Action Buttons -->
                      <button 
                        @click="handleView(teacher)"
                        class="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-1 rounded-full text-xs font-medium transition-colors duration-200"
                        title="View Profile"
                      >
                        View
                      </button>
                      
                      <button 
                        @click="handleEdit(teacher)"
                        class="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full text-xs font-medium transition-colors duration-200"
                        title="Edit Teacher"
                      >
                        Edit
                      </button>
                      
                      <button 
                        @click="handleDelete(teacher)"
                        class="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-xs font-medium transition-colors duration-200"
                        title="Delete Teacher"
                      >
                        Delete
                      </button>
              </div>
                  </td>
                </tr>
                
                <!-- Expandable Details Row -->
                <tr v-if="teacher && expandedTeachers[teacher.id]" class="bg-white border-b border-gray-200">
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
                              <span class="text-gray-600">Employee Code:</span>
                              <span class="font-medium">{{ teacher.employee_code || 'N/A' }}</span>
                  </div>
                            <div class="flex justify-between pb-2 border-b-2 border-purple-200">
                              <span class="text-gray-600">Gender:</span>
                              <span class="font-medium">{{ teacher.gender || 'N/A' }}</span>
                  </div>
                            <div class="flex justify-between pb-2 border-b-2 border-green-200">
                              <span class="text-gray-600">CNIC:</span>
                              <span class="font-medium">{{ teacher.cnic || 'N/A' }}</span>
                </div>
                            <div class="flex justify-between pb-2 border-b-2 border-orange-200">
                              <span class="text-gray-600">Date of Birth:</span>
                              <span class="font-medium">{{ teacher.date_of_birth || 'N/A' }}</span>
                            </div>
                          </div>
                        </div>

                        <!-- Professional Information -->
                        <div class="bg-green-50 rounded-lg p-3">
                          <h4 class="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                            <svg class="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                            </svg>
                            Professional Information
                          </h4>
                          <div class="space-y-3 text-xs">
                            <div class="flex justify-between pb-2 border-b-2 border-blue-200">
                              <span class="text-gray-600">Department:</span>
                              <span class="font-medium">{{ teacher.department?.name || 'N/A' }}</span>
                            </div>
                            <div class="flex justify-between pb-2 border-b-2 border-purple-200">
                              <span class="text-gray-600">Designation:</span>
                              <span class="font-medium">{{ teacher.designation || 'N/A' }}</span>
                            </div>
                            <div class="flex justify-between pb-2 border-b-2 border-green-200">
                              <span class="text-gray-600">Qualification:</span>
                              <span class="font-medium">{{ teacher.qualification || 'N/A' }}</span>
                            </div>
                            <div class="flex justify-between pb-2 border-b-2 border-orange-200">
                              <span class="text-gray-600">Experience:</span>
                              <span class="font-medium">{{ teacher.years_of_experience || 'N/A' }} years</span>
                            </div>
                          </div>
                        </div>

                        <!-- Contact Information -->
                        <div class="bg-purple-50 rounded-lg p-3">
                          <h4 class="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                            <svg class="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                            Contact Information
                          </h4>
                          <div class="space-y-3 text-xs">
                            <div class="flex justify-between pb-2 border-b-2 border-blue-200">
                              <span class="text-gray-600">Email:</span>
                              <span class="font-medium">{{ teacher.email || 'N/A' }}</span>
                            </div>
                            <div class="flex justify-between pb-2 border-b-2 border-pink-200">
                              <span class="text-gray-600">Phone:</span>
                              <span class="font-medium">{{ teacher.phone_number || 'N/A' }}</span>
                            </div>
                            <div class="flex justify-between pb-2 border-b-2 border-green-200">
                              <span class="text-gray-600">Address:</span>
                              <span class="font-medium">{{ teacher.address || 'N/A' }}</span>
                            </div>
                            <div class="flex justify-between pb-2 border-b-2 border-purple-200">
                              <span class="text-gray-600">Joining Date:</span>
                              <span class="font-medium">{{ teacher.joining_date || 'N/A' }}</span>
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
          <div v-if="teachers.length === 0" class="py-12">
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
                <div class="text-lg font-light text-gray-500 mb-1">No Teachers Found</div>
                <div class="text-gray-500 text-base font-light mb-2">We couldn't find any teachers matching your current filters.</div>
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
    <div v-if="!loading && teachers.length > 0" class="relative z-10 mt-8">
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

    <!-- Profile Photo Popup Dialog -->
    <div v-if="photoDialogVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="photoDialogVisible = false">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" @click.stop>
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Profile Photo</h3>
          <button @click="photoDialogVisible = false" class="text-gray-500 hover:text-gray-900">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="text-center">
          <img :src="selectedPhotoUrl" alt="Profile Photo" class="w-full h-auto rounded-lg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/utils/axios'
import { useToast } from 'vue-toastification'

// Use centralized axios instance
const axios = api

const router = useRouter()
const toast = useToast()
const loading = ref(false)
const searchQuery = ref('')
const selectedDepartment = ref('')
const selectedStatus = ref('')
const selectedDesignation = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const teachers = ref([])
const departments = ref([])
const expandedTeachers = ref({})
const pageInput = ref(1)
const sortBy = ref('')
const sortDirection = ref('asc')

// Table columns configuration
const tableColumns = [
  { key: 'teacher', label: 'Teacher' },
  { key: 'department', label: 'Department' },
  { key: 'designation', label: 'Designation' },
  { key: 'contact', label: 'Contact' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' }
]

const API_BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000'

// Photo dialog
const photoDialogVisible = ref(false)
const selectedPhotoUrl = ref('')

// Computed properties
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

// Methods
const fetchTeachers = async () => {
  try {
    loading.value = true
    const response = await axios.get('/teachers', {
      params: {
        page: currentPage.value,
        perPage: pageSize.value,
        search: searchQuery.value,
        department: selectedDepartment.value,
        status: selectedStatus.value,
        designation: selectedDesignation.value,
        sort_by: sortBy.value,
        sort_direction: sortDirection.value
      }
    })

    if (response.data.status) {
      teachers.value = response.data.result.data
      total.value = response.data.result.total
    } else {
      console.error('API Error:', response.data.message)
      throw new Error(response.data.message || 'Failed to fetch teachers')
    }
  } catch (error) {
    console.error('Fetch Error:', error)
    // toast.error(error.response?.data?.message || 'Failed to fetch teachers')
  } finally {
    loading.value = false
  }
}

const fetchDepartments = async () => {
  try {
    const response = await axios.get('/departments')
    if (response.data.status) {
      departments.value = response.data.result || []
    }
  } catch (error) {
    console.error('Failed to fetch departments:', error)
  }
}

const handleSearch = () => {
  currentPage.value = 1
  fetchTeachers()
}

const handleSizeChange = (val) => {
  pageSize.value = val
  fetchTeachers()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchTeachers()
}

const goToPage = (page) => {
  if (page && page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    fetchTeachers()
  }
}

const handleSort = (key) => {
  if (sortBy.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = key
    sortDirection.value = 'asc'
  }
  fetchTeachers()
}

const handleAddTeacher = () => {
  router.push('/faculty/add')
}

const handleEdit = (teacher) => {
  router.push(`/faculty/edit/${teacher.id}`)
}

const handleView = (teacher) => {
  router.push(`/faculty/teacher-details/${teacher.id}`)
}

const handleDelete = async (teacher) => {
  if (confirm(`Are you sure you want to delete teacher ${teacher.first_name} ${teacher.last_name}?`)) {
    try {
      const response = await axios.get(`/teachers/delete/${teacher.id}`)
      if (response.data.success) {
        // Success message would go here
        fetchTeachers()
      } else {
        throw new Error(response.data.message || 'Failed to delete teacher')
      }
    } catch (error) {
      console.error('Delete Error:', error)
      // Error message would go here
    }
  }
}

const handleExport = async () => {
  try {
    const response = await axios.get('/teachers/export', {
      responseType: 'blob'
    })
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'teachers.xlsx')
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    console.error('Export Error:', error)
  }
}

const getProfilePicture = (teacher) => {
  const pic = teacher.personal_details?.profile_picture
  if (pic) {
    return `${API_BASE_URL}/storage/${pic}`
  }
  return null
}

const getTeacherInitials = (teacher) => {
  const firstInitial = teacher.first_name?.charAt(0)?.toUpperCase() || ''
  const lastInitial = teacher.last_name?.charAt(0)?.toUpperCase() || ''
  return firstInitial + lastInitial
}

const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-700'
    case 'on_leave':
      return 'bg-yellow-100 text-yellow-700'
    case 'inactive':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-green-100 text-green-700'
  }
}

const toggleTeacherDetails = (teacherId) => {
  expandedTeachers.value[teacherId] = !expandedTeachers.value[teacherId]
}

const openPhotoDialog = (teacher) => {
  selectedPhotoUrl.value = getProfilePicture(teacher)
  photoDialogVisible.value = true
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
  event.target.nextElementSibling.style.display = 'flex'
}

// Lifecycle
onMounted(() => {
  fetchTeachers()
  fetchDepartments()
})
</script>

<style scoped>
/* Professional ERP styling - exact match to other pages */
.text-gray-600 {
  color: #64748b;
}

.text-gray-600 {
  color: #64748b;
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

.modern-font {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Gradient backgrounds */
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

/* Button hover effects */
button:hover {
  transform: scale(1.02);
  transition: all 0.2s ease-in-out;
}

button:active {
  transform: scale(0.98);
}

/* Focus styles for accessibility */
input:focus,
select:focus {
  outline: 2px solid #a855f7;
  outline-offset: 2px;
}

/* Form input styling */
input[type="text"],
select {
  border: none;
  border-bottom: 2px solid #e9d5ff;
  background: transparent;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
select:focus {
  border-bottom-color: #8b5cf6;
  outline: none;
}

/* Transition effects */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Animation classes */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-6px);
  }
  60% {
    transform: translateY(-3px);
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

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style> 