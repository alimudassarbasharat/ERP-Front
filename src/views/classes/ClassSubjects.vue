<template>
  <div class="relative w-full min-h-screen pl-0 pr-0 sm:pl-0 sm:pr-0 lg:pl-1 lg:pr-0 py-2 sm:py-3 lg:py-4">
    <!-- Top Bar Header -->
    <div class="w-full max-w-7xl mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
      <h2 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        Subject Management - {{ getFilterSummary() }}
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Dashboard</span>
        <span class="mx-2">|</span>
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Classes</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">Subject Management</span>
      </nav>
        </div>

    <!-- Select Criteria Label -->
    <div class="w-full">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-900 tracking-tight">Filter & Manage Subjects</h3>
        <div class="h-[2px] bg-purple-200 w-full transition-all duration-300" style="max-width: 180px"></div>
              </div>
                </div>

    <!-- Advanced Filter Bar -->
    <div class="w-full">
      <form class="w-full" @submit.prevent="applyFilters">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Search Subject</label>
            <div class="relative">
              <input 
                v-model="filters.subjectName"
                type="text" 
                placeholder="Search by name"
                class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
              />
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
              </div>
            </div>

          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Filter by Class</label>
            <div class="relative">
              <select 
                v-model="filters.class"
                @change="onClassChange"
                class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8"
              >
                <option value="">All Classes</option>
                <option v-for="cls in classList" :key="cls.id" :value="cls.id">{{ cls.name }}</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                </svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                </div>
              </div>

          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Assignment Status</label>
            <div class="relative">
              <select 
                v-model="filters.assignmentStatus"
                class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8"
              >
                <option value="">All Subjects</option>
                <option value="assigned">Assigned to Classes</option>
                <option value="unassigned">Not Assigned</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                </svg>
            </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
      </div>

          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Sort Order</label>
            <div class="relative">
              <select 
                v-model="sortOrder"
                @change="applySorting"
                class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8"
              >
                <option value="name_asc">Name (A-Z)</option>
                <option value="name_desc">Name (Z-A)</option>
                <option value="classes_desc">Most Classes</option>
                <option value="classes_asc">Least Classes</option>
                <option value="created_desc">Newest First</option>
                <option value="created_asc">Oldest First</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                </svg>
          </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-2 mt-2">
          <button 
            type="button" 
            @click="clearFilters" 
            class="h-9 px-8 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 text-sm font-bold text-white shadow hover:from-gray-600 hover:to-slate-600 transition-all duration-300 transform hover:scale-105"
          >
            Clear
          </button>
          <div class="flex gap-2">
            <button 
              type="button"
              @click="showAddForm = true" 
              class="h-9 px-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-sm font-bold text-white shadow hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105"
            >
              Add Subject
            </button>
            <button 
              type="button"
              @click="openAssignForm"
              class="h-9 px-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-sm font-bold text-white shadow hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
            >
              Assign to Class
            </button>
            <button 
              type="submit" 
              class="h-9 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              Filter
            </button>
          </div>
        </div>
      </form>
      </div>

    <!-- Data List Header -->
    <div class="w-full max-w-7xl mx-auto flex items-center justify-between mb-8">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-900 tracking-tight flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce"></div>
          Subject Results ({{ filteredSubjects.length }})
        </h3>
        <div class="h-[2px] bg-purple-200 w-full transition-all duration-500" style="max-width: 160px"></div>
            </div>
      
      <!-- Quick Export & Actions -->
      <div class="flex items-center gap-3">
        <button 
          @click="exportToExcel"
          class="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Export Excel
        </button>
        <button 
          @click="exportToPDF"
          class="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-medium rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Export PDF
        </button>
            </div>
      </div>

    <div class="w-full">
      <div class="h-[2px] w-full bg-purple-200 mb-4"></div>
    </div>

    <!-- Advanced Loading State -->
    <div v-if="isLoading" class="w-full">
      <div class="border border-gray-200 rounded-xl p-8 bg-white/40 shadow-sm">
        <div class="flex flex-col items-center justify-center py-12">
          <div class="relative mb-6">
            <div class="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-500 rounded-full animate-ping opacity-20"></div>
          </div>
          <div class="text-center">
            <p class="text-gray-600 font-medium text-lg mb-1">Loading Subjects</p>
            <p class="text-gray-500 text-sm font-normal">Please wait while we fetch the subject data...</p>
            <div class="flex justify-center mt-3 space-x-1">
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced No Data Found -->
    <div v-else-if="!isLoading && filteredSubjects.length === 0" class="w-full">
      <div class="border border-gray-200 rounded-xl p-8 bg-white/40 shadow-sm">
        <div class="flex flex-col items-center justify-center py-12">
          <div class="relative mb-6">
            <div class="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <div class="absolute -top-2 -right-2 w-4 h-4 bg-purple-300 rounded-full animate-ping opacity-30"></div>
            <div class="absolute -bottom-2 -left-2 w-3 h-3 bg-indigo-300 rounded-full animate-pulse"></div>
          </div>
          <div class="w-full">
            <h3 class="text-gray-600 font-medium text-xl mb-2">No Subjects Found</h3>
            <p class="text-gray-500 text-sm font-normal leading-relaxed mb-4">
              No subjects match your current filters. Try adjusting your search criteria or add new subjects to get started.
            </p>
            <button 
              @click="showAddForm = true"
              class="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
            >
              Add First Subject
            </button>
              </div>
                </div>
                </div>
              </div>

    <!-- Advanced Subjects Table -->
    <div v-else-if="!isLoading && filteredSubjects.length > 0" class="w-full">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gradient-to-r from-indigo-50 to-purple-50">
              <tr>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">#</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Subject Details</th>
                <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Assigned Classes</th>
                <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Assignment Status</th>
                <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Created Date</th>
                <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(subject, index) in paginatedSubjects" :key="subject.id" class="hover:bg-indigo-50 transition-colors border-b border-purple-200">
                <td class="py-3 px-4 text-gray-900 font-normal text-sm">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                <td class="py-3 px-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
                      {{ subject.name.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ subject.name }}</div>
                      <div class="text-xs text-gray-500">{{ subject.description || 'No description available' }}</div>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4 text-center">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ getClassCountForSubject(subject.id) }} classes
                  </span>
                </td>
                <td class="py-3 px-4 text-center">
                  <span :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getClassCountForSubject(subject.id) > 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  ]">
                    {{ getClassCountForSubject(subject.id) > 0 ? 'Assigned' : 'Not Assigned' }}
                  </span>
                </td>
                <td class="py-3 px-4 text-center text-xs text-gray-500">
                  {{ formatDate(subject.created_at) }}
                </td>
                <td class="py-3 px-4">
                  <div class="flex items-center justify-center gap-2">
                    <button 
                      @click="editSubject(subject)"
                      class="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200 hover:scale-110"
                      title="Edit Subject"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button 
                      @click="openShowClassesModal(subject)"
                      class="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200 hover:scale-110"
                      title="View Assigned Classes"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    </button>
                    <button 
                      @click="quickAssign(subject)"
                      class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 hover:scale-110"
                      title="Quick Assign to Class"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                    </button>
                    <button 
                      @click="removeSubject(subject)"
                      class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 hover:scale-110"
                      title="Delete Subject"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
              </div>
                </td>
              </tr>
            </tbody>
          </table>
      </div>

        <!-- Enhanced Pagination -->
        <div v-if="totalPages > 1" class="bg-white px-4 py-3 border-t border-purple-200">
          <div class="flex items-center justify-between">
            <div class="flex-1 flex justify-between sm:hidden">
              <button 
                @click="currentPage > 1 && (currentPage--)"
                :disabled="currentPage <= 1"
                class="relative inline-flex items-center px-4 py-2 border border-gray-200 text-sm font-medium rounded-md text-gray-900 bg-white hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button 
                @click="currentPage < totalPages && (currentPage++)"
                :disabled="currentPage >= totalPages"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-200 text-sm font-medium rounded-md text-gray-900 bg-white hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-900">
                  Showing
                  <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
                  to
                  <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredSubjects.length) }}</span>
                  of
                  <span class="font-medium">{{ filteredSubjects.length }}</span>
                  subjects
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button 
                    @click="currentPage > 1 && (currentPage--)"
                    :disabled="currentPage <= 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                  
                  <button 
                    v-for="page in getPageNumbers" 
                    :key="page"
                    @click="currentPage = page"
                    :class="[
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors duration-200',
                      page === currentPage 
                        ? 'z-10 bg-purple-50 border-purple-500 text-purple-600' 
                        : 'bg-white border-gray-200 text-gray-500 hover:bg-white'
                    ]"
                  >
                    {{ page }}
                  </button>
                  
                  <button 
                    @click="currentPage < totalPages && (currentPage++)"
                    :disabled="currentPage >= totalPages"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Add Subject Modal -->
    <div v-if="showAddForm" class="relative z-10 bg-white rounded-lg shadow-xl border border-gray-200" @click.self="showAddForm = false">
      <div class="w-full">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">{{ isEdit ? 'Edit Subject' : 'Add New Subject' }}</h3>
            <button @click="closeAllModals" class="text-gray-500 hover:text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        
        <form @submit.prevent="submitForm" class="p-6 space-y-4">
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject Name</label>
            <div class="relative">
              <input 
              v-model="form.name"
                type="text" 
              placeholder="Enter subject name"
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
                placeholder="Enter subject description"
                rows="3"
                class="border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full resize-none"
              ></textarea>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
          </div>
          </div>

          <div class="flex gap-3 pt-4">
            <button 
              type="button"
              @click="closeAllModals"
              class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 text-sm font-bold text-white shadow hover:from-gray-600 hover:to-slate-600 transition-all duration-300"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              {{ isEdit ? 'Update' : 'Add' }} Subject
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Enhanced Assign Subjects Modal -->
    <div v-if="showAssignForm" class="relative z-10 bg-white rounded-lg shadow-xl border border-gray-200" @click.self="showAssignForm = false">
      <div class="w-full">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Assign Subjects to Class</h3>
            <button @click="closeAllModals" class="text-gray-500 hover:text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="p-6 space-y-6">
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Select Class</label>
            <div class="relative">
              <select 
              v-model="selectedClass"
                class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8"
                required
              >
                <option value="">Choose a class</option>
                <option v-for="cls in classList" :key="cls.id" :value="cls.id">{{ cls.name }}</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                </svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>

          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Select Subjects</label>
            <div class="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
              <label 
                v-for="subject in subjectList"
                :key="subject.id"
                class="flex items-center gap-2 p-2 rounded-lg hover:bg-white cursor-pointer transition-colors"
              >
                <input 
                  type="checkbox" 
                :value="subject.id"
                  v-model="selectedSubjects"
                  class="w-4 h-4 text-purple-600 border-gray-200 rounded focus:ring-purple-500"
                />
                <span class="text-sm">{{ subject.name }}</span>
              </label>
          </div>
          </div>

          <div class="flex gap-3 pt-4">
            <button 
              @click="closeAllModals"
              class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 text-sm font-bold text-white shadow hover:from-gray-600 hover:to-slate-600 transition-all duration-300"
            >
              Cancel
            </button>
            <button 
              @click="assignSubjects"
              class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Assign Subjects
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Show Classes Modal -->
    <div v-if="showClassesModal" class="relative z-10 bg-white rounded-lg shadow-xl border border-gray-200" @click.self="showClassesModal = false">
      <div class="w-full">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Classes for {{ selectedSubjectForShow?.name }}</h3>
            <button @click="showClassesModal = false" class="text-gray-500 hover:text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="p-6">
          <div v-if="classesForShow.length > 0" class="space-y-3">
            <div 
              v-for="cls in classesForShow"
              :key="cls.id"
              class="flex items-center gap-3 p-3 bg-white rounded-lg"
            >
              <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
          </div>
              <span class="text-sm font-medium text-gray-900">{{ cls.name }}</span>
          </div>
        </div>
          <div v-else class="text-center py-8">
            <svg class="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            <p class="text-gray-500">No classes assigned yet</p>
          </div>

          <div class="pt-6">
            <button 
              @click="showClassesModal = false"
              class="w-full h-10 px-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useToast } from 'vue-toastification'
import api from '@/utils/axios'

const toast = useToast()

// Reactive data
const subjectList = ref([])
const classList = ref([])
const classSubjects = ref([])
const filters = ref({ subjectName: '', class: '', assignmentStatus: '' })
const sortOrder = ref('name_asc')
const currentPage = ref(1)
const itemsPerPage = ref(20)
const isLoading = ref(false)
const showAddForm = ref(false)
const showAssignForm = ref(false)
const showClassesModal = ref(false)
const isEdit = ref(false)
const form = ref({ id: null, name: '', description: '' })
const selectedClass = ref('')
const selectedSubjects = ref([])
const selectedSubjectForShow = ref(null)
const classesForShow = ref([])

// Computed properties for advanced filtering and sorting
const filteredSubjects = computed(() => {
  let filtered = subjectList.value.filter(s => {
    const nameMatch = !filters.value.subjectName || 
      (s.name && s.name.toLowerCase().includes(filters.value.subjectName.toLowerCase()))
    
    const classMatch = !filters.value.class || 
      (s.classes && s.classes.some(c => c.id === parseInt(filters.value.class)))
    
    const assignmentStatusMatch = filters.value.assignmentStatus === '' || (
      filters.value.assignmentStatus === 'assigned' && getClassCountForSubject(s.id) > 0
    ) || (
      filters.value.assignmentStatus === 'unassigned' && getClassCountForSubject(s.id) === 0
    )
    
    return nameMatch && classMatch && assignmentStatusMatch
  })

  // Apply sorting
  const [sortField, sortDirection] = sortOrder.value.split('_')
  
  return filtered.sort((a, b) => {
    let aValue, bValue
    
    switch (sortField) {
      case 'name':
        aValue = a.name?.toLowerCase() || ''
        bValue = b.name?.toLowerCase() || ''
        break
      case 'classes':
        aValue = getClassCountForSubject(a.id)
        bValue = getClassCountForSubject(b.id)
        break
      case 'created':
        aValue = new Date(a.created_at || 0)
        bValue = new Date(b.created_at || 0)
        break
      default:
        aValue = a.name?.toLowerCase() || ''
        bValue = b.name?.toLowerCase() || ''
    }
    
    if (sortDirection === 'desc') {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
    } else {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
    }
  })
})

const paginatedSubjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredSubjects.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredSubjects.value.length / itemsPerPage.value)
})

const getPageNumbers = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    }
  }

  return pages.filter(page => page !== '...' || pages.indexOf(page) !== pages.lastIndexOf(page))
})

// Methods
const fetchSubjects = async () => {
  try {
    isLoading.value = true
    console.log('Fetching subjects from API with authentication')
    
    const response = await api.get('/subjects')
    console.log('Subjects API Response:', response.data)
    
    if (Array.isArray(response.data)) {
      subjectList.value = response.data
    } else if (Array.isArray(response.data.subjects)) {
      subjectList.value = response.data.subjects
    } else if (Array.isArray(response.data.result?.data)) {
      subjectList.value = response.data.result.data
    } else if (response.data.success && Array.isArray(response.data.result)) {
      subjectList.value = response.data.result
    } else if (response.data.status && Array.isArray(response.data.result)) {
      subjectList.value = response.data.result
    } else {
      subjectList.value = []
    }
    console.log('Subjects loaded:', subjectList.value.length)
  } catch (error) {
    console.error('Error fetching subjects:', error)
    toast.error(error.response?.data?.message || 'Failed to fetch subjects')
    subjectList.value = []
  } finally {
    isLoading.value = false
  }
}

const fetchClasses = async () => {
  try {
    console.log('Fetching classes from API with authentication')
    const response = await api.get('/classes')
    console.log('Classes API Response:', response.data)
    if (response.data.success) {
      classList.value = response.data.result || []
      console.log('Classes loaded:', classList.value.length)
    } else {
      console.error('Classes API Error:', response.data.message)
      toast.error(response.data.message || 'Failed to fetch classes')
    }
  } catch (error) {
    console.error('Error fetching classes:', error)
    toast.error(error.response?.data?.message || 'Failed to fetch classes')
  }
}

const fetchClassSubjects = async () => {
  try {
    console.log('Fetching class-subjects...')
    
    const response = await api.get('/class-subjects')
    console.log('Class-Subjects API Response:', response.data)
    
    if (response.data.success) {
      classSubjects.value = response.data.result || []
    } else {
      classSubjects.value = []
    }
  } catch (error) {
    console.error('Error fetching class-subjects:', error)
    classSubjects.value = []
  }
}

const getClassCountForSubject = (subjectId) => {
  return classSubjects.value.filter(cs => cs.subject_id === subjectId).length
}

const getFilterSummary = () => {
  const parts = []
  if (filters.value.subjectName) parts.push(`Search: "${filters.value.subjectName}"`)
  if (filters.value.class) {
    const className = classList.value.find(c => c.id === parseInt(filters.value.class))?.name
    if (className) parts.push(`Class: ${className}`)
  }
  if (filters.value.assignmentStatus) {
    parts.push(`Status: ${filters.value.assignmentStatus === 'assigned' ? 'Assigned' : 'Not Assigned'}`)
  }
  return parts.length > 0 ? parts.join(' | ') : 'All Subjects'
}

const submitForm = async () => {
  if (!form.value.name.trim()) {
    toast.error('Subject name is required')
    return
  }

  try {
    let response
    if (isEdit.value && form.value.id) {
        // Update subject
      response = await api.post(`/subjects/${form.value.id}/update`, form.value)
      } else {
        // Add subject
      response = await api.post('/subjects/store', form.value)
    }
    
    if (response.data.status || response.data.success) {
      toast.success(isEdit.value ? 'Subject updated successfully!' : 'Subject added successfully!')
      closeAllModals()
          await fetchSubjects()
        } else {
      toast.error(response.data.message || 'Failed to save subject')
        }
    } catch (error) {
    console.error('Error submitting form:', error)
      toast.error(error.response?.data?.message || 'Failed to submit form')
  }
}

const editSubject = (subject) => {
  form.value = {
    id: subject.id,
    name: subject.name,
    description: subject.description || ''
  }
  isEdit.value = true
  showAddForm.value = true
}

const removeSubject = (subject) => {
  if (!confirm(`Are you sure you want to delete subject "${subject.name}"?`)) return
  
  try {
    api.post(`/subjects/${subject.id}/delete`).then(async (response) => {
      if (response.data.status || response.data.success) {
        toast.success('Subject deleted successfully!')
        await fetchSubjects()
      } else {
        toast.error(response.data.message || 'Failed to delete subject')
      }
    })
    } catch (error) {
    console.error('Error deleting subject:', error)
      toast.error(error.response?.data?.message || 'Failed to delete subject')
  }
}

const openAssignForm = () => {
  selectedClass.value = ''
  selectedSubjects.value = []
  showAssignForm.value = true
}

const assignSubjects = async () => {
  if (!selectedClass.value || selectedSubjects.value.length === 0) {
    toast.warning('Please select a class and at least one subject')
    return
  }
  
  try {
    console.log('Assigning subjects to class:', { 
      class_id: selectedClass.value, 
      subject_ids: selectedSubjects.value
    })
    
    const promises = selectedSubjects.value.map(subjectId => 
      api.post('/class-subjects', {
        class_id: parseInt(selectedClass.value),
        subject_id: subjectId
      })
    )
    
    const responses = await Promise.all(promises)
    console.log('Assign Subjects Responses:', responses.map(r => r.data))
    
    const successCount = responses.filter(r => r.data.success).length
    
    if (successCount > 0) {
      toast.success(`${successCount} subject(s) assigned successfully!`)
      closeAllModals()
      await fetchClassSubjects()
    } else {
      toast.error('Assignment failed')
    }
  } catch (error) {
    console.error('Error assigning subjects:', error)
    toast.error('Error: ' + (error.response?.data?.message || error.message))
  }
}

const openShowClassesModal = async (subject) => {
  selectedSubjectForShow.value = subject
  
  // Get classes for this subject
  const subjectClasses = classSubjects.value
    .filter(cs => cs.subject_id === subject.id)
    .map(cs => classList.value.find(c => c.id === cs.class_id))
    .filter(Boolean)
  
  classesForShow.value = subjectClasses
  showClassesModal.value = true
  }

const quickAssign = (subject) => {
  selectedSubjects.value = [subject.id]
  selectedClass.value = ''
  showAssignForm.value = true
}

const closeAllModals = () => {
  showAddForm.value = false
  showAssignForm.value = false
  showClassesModal.value = false
  isEdit.value = false
  form.value = { id: null, name: '', description: '' }
  selectedClass.value = ''
  selectedSubjects.value = []
  selectedSubjectForShow.value = null
  classesForShow.value = []
}

const applyFilters = () => {
  currentPage.value = 1
}

const clearFilters = () => {
  filters.value = { subjectName: '', class: '', assignmentStatus: '' }
  sortOrder.value = 'name_asc'
  currentPage.value = 1
}

const onClassChange = () => {
  currentPage.value = 1
}

const applySorting = () => {
  currentPage.value = 1
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const exportToExcel = () => {
  toast.info('Excel export functionality will be implemented soon!')
}

const exportToPDF = () => {
  toast.info('PDF export functionality will be implemented soon!')
}

// Watch for filter and sort changes
watch([() => filters.value.subjectName, () => filters.value.class, () => filters.value.assignmentStatus], () => {
  currentPage.value = 1
}, { deep: true })

watch(sortOrder, () => {
  currentPage.value = 1
})

// Initialize data
onMounted(async () => {
  console.log('Component mounted, fetching data...')
  await Promise.all([
    fetchSubjects(),
    fetchClasses(),
    fetchClassSubjects()
  ])
})
</script>

<style scoped>
/* Custom styles with Tailwind @apply directives */

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

/* Table hover effect */
tbody tr:hover {
  background-color: rgba(165, 180, 252, 0.1);
  transition: background-color 0.15s ease-in-out;
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

/* Button hover scale effect */
button:hover {
  transform: scale(1.02);
  transition: all 0.2s ease-in-out;
}

button:active {
  transform: scale(0.98);
}

/* Custom focus styles */
input:focus,
select:focus,
textarea:focus,
button:focus {
  @apply focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Form input styling */
input[type="text"],
input[type="email"],
select,
textarea {
  border: none;
  border-bottom: 2px solid #e9d5ff;
  background: transparent;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="email"]:focus,
select:focus,
textarea:focus {
  border-bottom-color: #8b5cf6;
  outline: none;
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
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

/* Tab transition animations */
.tab-3d-enter-active, .tab-3d-leave-active {
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.tab-3d-enter-from {
  transform: translateX(30px);
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
  transform: translateX(-30px);
  opacity: 0;
}

/* Animation utility classes */
.animate-fadeInUp {
  animation: fadeInUp 0.5s ease-out;
}

.animate-slideInRight {
  animation: slideInRight 0.3s ease-out;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Button ripple effect */
.ripple {
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}

.ripple:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.ripple:active:before {
  width: 300px;
  height: 300px;
}

/* Utility classes for quick animations */
.transition-all {
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-scale {
  @apply hover:scale-105 transition-transform duration-200;
}

.hover-shadow {
  @apply hover:shadow-xl transition-shadow duration-300;
}
</style> 