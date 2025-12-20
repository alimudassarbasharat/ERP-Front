<template>
  <div class="relative w-full min-h-screen pl-0 pr-0 sm:pl-0 sm:pr-0 lg:pl-1 lg:pr-0 py-2 sm:py-3 lg:py-4">
    <!-- Loading Overlay -->
    <div v-if="crudLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6">
        <LoadingStudents title="Processing Fee" message="Please wait while we process your request..." />
      </div>
    </div>

    <!-- View Mode Tabs -->
    <div class="w-full max-w-7xl mx-auto mb-6 flex justify-end">
      <div class="flex bg-white rounded-full shadow-lg p-1 border border-purple-100">
        <button
          @click="setViewMode('overview')"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform relative overflow-hidden',
            viewMode === 'overview' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105'
              : 'text-purple-600 hover:text-purple-700 hover:bg-purple-50 hover:scale-102'
          ]"
        >
          <span class="relative z-10 flex items-center gap-2">
            Overview
          </span>
          <div v-if="viewMode === 'overview'" class="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-pulse rounded-full"></div>
        </button>
        <div class="h-6 w-px bg-purple-200 mx-1 self-center"></div>
        <button
          @click="setViewMode('setup')"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform relative overflow-hidden',
            viewMode === 'setup' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105'
              : 'text-purple-600 hover:text-purple-700 hover:bg-purple-50 hover:scale-102'
          ]"
        >
          <span class="relative z-10 flex items-center gap-2">
            Fee Setup
          </span>
          <div v-if="viewMode === 'setup'" class="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-pulse rounded-full"></div>
        </button>
        <div class="h-6 w-px bg-purple-200 mx-1 self-center"></div>
        <button
          @click="setViewMode('reports')"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform relative overflow-hidden',
            viewMode === 'reports' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105'
              : 'text-purple-600 hover:text-purple-700 hover:bg-purple-50 hover:scale-102'
          ]"
        >
          <span class="relative z-10 flex items-center gap-2">
            Reports
          </span>
          <div v-if="viewMode === 'reports'" class="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-pulse rounded-full"></div>
        </button>
      </div>
    </div>

    <!-- Top Bar Header -->
    <div class="w-full max-w-7xl mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500">
      <h2 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        Fee Management
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Dashboard</span>
        <span class="mx-2">|</span>
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Fees</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">Manage Fee</span>
      </nav>
    </div>

    <!-- Select Criteria Label -->
    <div class="w-full max-w-7xl mx-auto mb-2">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-900 tracking-tight">Select Filters</h3>
        <div class="h-[2px] bg-purple-200 w-full transition-all duration-300" style="max-width: 110px"></div>
      </div>
    </div>

    <!-- Filter Bar in Card -->
    <div class="w-full max-w-7xl mx-auto rounded-lg border border-gray-200 bg-white/90 px-4 sm:px-6 py-3 shadow-lg mb-6">
      <form class="w-full" @submit.prevent="fetchData">
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
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</label>
            <div class="relative">
              <select v-model="selectedStatus" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Search</label>
            <div class="relative">
              <input v-model="searchQuery" type="text" placeholder="Search by name" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full">
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-2">
          <button type="submit" class="h-8 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">Filter</button>
        </div>
      </form>
    </div>

    <!-- Content area placeholder -->
    <div class="w-full max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <div class="flex flex-col items-start">
          <h3 class="text-base font-medium text-gray-900 tracking-tight">Fee Management</h3>
          <div class="h-[2px] bg-purple-200 w-full transition-all duration-300" style="max-width: 140px"></div>
        </div>
        <div class="flex items-center gap-2">
          <label class="flex items-center gap-2 cursor-pointer group relative">
            <input 
              type="checkbox" 
              v-model="allSelected"
              @change="toggleAllSelection"
              class="w-5 h-5 border-2 border-purple-200 rounded-md transition-all duration-200 group-hover:border-purple-400 checked:border-purple-500 checked:bg-purple-500 focus:ring-purple-500 appearance-none flex items-center justify-center"
            />
            <span v-if="allSelected" class="absolute left-1 top-1">
              <svg class="w-3.5 h-3.5 text-white animate-pulse" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </span>
            <div class="relative">
              <template v-if="!allSelected">
                <span 
                  class="text-sm font-medium text-gray-600 group-hover:text-purple-600 transition-all duration-300 block"
                >
                  Late Fee
                </span>
                <div 
                  class="absolute left-0 right-0 bottom-0 h-[1.5px] bg-purple-200 transition-all duration-300"
                ></div>
              </template>
            </div>
          </label>
          <transition name="fade-slide">
            <button
              v-if="selectedFees.length > 0"
              @click="applyLateFeeBulk"
              :disabled="crudLoading"
              class="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style="animation: slideIn 0.3s ease-out forwards;"
            >
              <svg v-if="crudLoading" class="animate-spin w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              Late Fee
            </button>
          </transition>
          <button 
            @click="addFee"
            :disabled="crudLoading"
            class="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="crudLoading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            {{ crudLoading ? 'Adding...' : 'Add Fee' }}
          </button>
        </div>
      </div>

      <!-- Loader -->
      <LoadingStudents v-if="loading" title="Loading Fee Defaults" message="Please wait while we fetch the fee data..." />

      <!-- Fee Table -->
      <UiTable v-else>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gradient-to-r from-indigo-50 to-purple-50">
              <tr>
                <th class="py-2 px-2 font-medium text-gray-600 text-sm tracking-wider cursor-pointer hover:text-purple-600 transition-colors">
                  <div class="flex items-center justify-between">
                    Class
                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                    </svg>
                  </div>
                </th>
                <th class="py-2 px-2 font-medium text-gray-600 text-sm tracking-wider cursor-pointer hover:text-purple-600 transition-colors">
                  <div class="flex items-center justify-between">
                    Monthly Fee
                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                    </svg>
                  </div>
                </th>
                <th class="py-2 px-2 font-medium text-gray-600 text-sm tracking-wider cursor-pointer hover:text-purple-600 transition-colors">
                  <div class="flex items-center justify-between">
                    Status
                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                    </svg>
                  </div>
                </th>
                <th class="py-2 px-2 font-medium text-gray-600 text-sm tracking-wider w-72">Action</th>
              </tr>
            </thead>
            
            <tbody class="bg-white divide-y divide-gray-200">
              <!-- No Data State -->
              <tr v-if="feeDefaults.length === 0 && !loading">
                <td colspan="6" class="py-16 text-center">
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
                      <div class="text-lg font-light text-gray-500 mb-1">No Fees Found</div>
                      <div class="text-gray-500 text-base font-light mb-2">We couldn't find any fees matching your current filters.</div>
                      <div class="flex flex-wrap justify-center gap-2 text-xs text-gray-500 font-light">
                        <span class="px-2 py-1 bg-white rounded-full">• Check filters</span>
                        <span class="px-2 py-1 bg-white rounded-full">• Clear search</span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              
              <!-- Fee Data Rows -->
              <tr v-for="(fee, idx) in feeDefaults" :key="fee.id" :class="[ 'hover:bg-indigo-50 transition-colors', 'border-b border-purple-200', idx === feeDefaults.length - 1 ? 'border-b-2 border-purple-400' : '' ]">
                <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                      {{ fee.class ? fee.class.charAt(0) : '' }}
                    </div>
                    <span class="font-medium">{{ fee.class }}</span>
                  </div>
                </td>
                <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">
                  <span class="font-semibold text-green-600">PKR {{ Number(fee.monthly_fee).toLocaleString() }}</span>
                </td>
                <td class="py-2 px-2">
                  <span :class="[
                    'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium',
                    fee.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  ]">
                    {{ fee.status || 'Active' }}
                  </span>
                </td>
                <td class="py-2 px-2 text-left w-72">
                  <div class="flex items-center gap-2">
                    <input type="checkbox" v-model="selectedFees" :value="fee.id" />
                    <button 
                      @click="applyLateFee(fee)"
                      :disabled="crudLoading"
                      class="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      style="min-width: 70px;"
                      title="Apply Late Fee"
                    >
                      <span v-if="crudLoading" class="inline-flex items-center">
                        <svg class="animate-spin -ml-1 mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </span>
                      <span v-else>Late Fee</span>
                    </button>
                    <button 
                      @click="editFeeDefault(fee)"
                      :disabled="crudLoading"
                      class="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xs font-medium rounded-full hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      style="min-width: 70px;"
                      title="Edit"
                    >
                      <span v-if="crudLoading" class="inline-flex items-center">
                        <svg class="animate-spin -ml-1 mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </span>
                      <span v-else>Edit</span>
                    </button>
                    <button 
                      @click="deleteFeeDefault(fee.id)"
                      :disabled="crudLoading"
                      class="px-3 py-1 bg-gradient-to-r from-red-400 to-red-500 text-white text-xs font-medium rounded-full hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                      style="min-width: 70px;"
                      title="Delete"
                    >
                      <span v-if="crudLoading" class="inline-flex items-center">
                        <svg class="animate-spin -ml-1 mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </span>
                      <span v-else>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Correct, two-part pagination -->
        <div v-if="pagination.total > 0" class="px-4 py-2 bg-white/50 border-t border-purple-100 flex flex-col md:flex-row justify-between items-center gap-2">
          <div class="text-gray-600 text-sm font-medium px-2">
            Showing {{ (pagination.current_page - 1) * pagination.per_page + 1 }} to {{ Math.min(pagination.current_page * pagination.per_page, pagination.total) }} of {{ pagination.total }} entries
          </div>
          <div class="flex items-center gap-4">
            <label class="text-sm text-gray-600 font-medium flex items-center gap-1">
              Per page:
              <select v-model="pagination.per_page" @change="handlePerPageChange" class="rounded-md border border-purple-200 bg-white px-2 py-1 text-xs font-semibold text-purple-700 focus:ring-2 focus:ring-purple-300">
                <option :value="10">10</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
                <option :value="100">100</option>
              </select>
            </label>
            <label class="text-sm text-gray-600 font-medium flex items-center gap-1 mr-3">
              Go to page:
              <input v-model.number="goToPage" type="number" min="1" :max="pagination.last_page" class="w-16 rounded-md border border-purple-200 px-2 py-1 text-xs font-semibold text-purple-700 focus:ring-2 focus:ring-purple-300" @keyup.enter="handleGoToPage" />
              <button @click="handleGoToPage" class="ml-1 px-2 py-1 rounded-md bg-purple-500 text-white text-xs font-semibold hover:bg-purple-600 transition-all">Go</button>
            </label>
          </div>
        </div>
        <div v-if="pagination.total > 0" class="w-full max-w-7xl mx-auto flex justify-center pb-2">
          <div class="flex items-center gap-2">
            <button
              class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-50 text-purple-500 text-xl font-bold shadow-sm transition-all duration-200 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-40 disabled:cursor-not-allowed"
              :disabled="pagination.current_page === 1"
              @click="fetchFeeDefaults(pagination.current_page - 1)"
              aria-label="Previous"
            >
              <span>&larr;</span>
            </button>
            <span class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-600 text-white text-base font-bold shadow-md">
              {{ pagination.current_page }}
            </span>
            <button
              class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-50 text-purple-500 text-xl font-bold shadow-sm transition-all duration-200 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-40 disabled:cursor-not-allowed"
              :disabled="!pagination.next_page_url"
              @click="fetchFeeDefaults(pagination.current_page + 1)"
              aria-label="Next"
            >
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </UiTable>
    </div>

    <!-- Add/Edit Fee Modal -->
    <transition name="modal-overlay-fade">
      <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @mousedown.self="closeModal">
        <transition name="modal-pop-advance">
          <div v-if="showAddModal || showEditModal" class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-sm font-medium text-gray-900 tracking-tight">
                {{ showEditModal ? 'Edit Fee' : 'Add New Fee' }}
              </h3>
            </div>
            <form @submit.prevent="showEditModal ? updateFeeDefault() : addFeeDefault()" class="px-6 py-4">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-900 mb-1">Class</label>
                  <div class="relative">
                    <select v-model="feeForm.class_id" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                      <option value="">Select Class</option>
                      <option v-for="cls in classes" :key="cls.id" :value="cls.id">{{ cls.name }}</option>
                    </select>
                    <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                    </div>
                    <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-900 mb-1">Monthly Fee (PKR)</label>
                  <div class="relative">
                    <input 
                      v-model="feeForm.monthly_fee" 
                      type="number" 
                      class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
                      placeholder="Enter monthly fee"
                    >
                    <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-900 mb-1">Status</label>
                  <div class="relative">
                    <select v-model="feeForm.status" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                    </div>
                    <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                  </div>
                </div>
              </div>
              <div class="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  @click="closeModal"
                  class="h-8 px-8 rounded-full bg-white text-sm font-bold text-gray-600 border border-gray-200 hover:bg-white transition-all duration-200"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  :disabled="crudLoading"
                  class="h-8 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="crudLoading" class="inline-flex items-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ showEditModal ? 'Updating...' : 'Adding...' }}
                  </span>
                  <span v-else>{{ showEditModal ? 'Update' : 'Add' }}</span>
                </button>
              </div>
            </form>
          </div>
        </transition>
      </div>
    </transition>

    <!-- Late Fee Modal -->
    <transition name="modal-overlay-fade">
      <div v-if="showLateFeeModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @mousedown.self="closeLateFeeModal">
        <transition name="modal-pop-advance">
          <div v-if="showLateFeeModal" class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-sm font-medium text-gray-900 tracking-tight">
                Assign Late Fee to All Classes
              </h3>
            </div>
            <form @submit.prevent="submitLateFeeModal" class="px-6 py-4">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-900 mb-1">Late Fee Amount (PKR)</label>
                  <input v-model="lateFeeForm.late_fee_amount" type="number" min="0" step="0.01" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full" placeholder="Enter late fee amount" required />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-900 mb-1">Apply After Days</label>
                  <input v-model="lateFeeForm.apply_after_days" type="number" min="1" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full" placeholder="e.g. 5" required />
                </div>
                <div class="flex items-center gap-2">
                  <input id="is_auto_apply" v-model="lateFeeForm.is_auto_apply" type="checkbox" class="w-5 h-5 rounded border-purple-300 text-purple-600 focus:ring-purple-500" />
                  <label for="is_auto_apply" class="text-sm font-medium text-gray-900">Auto Apply Late Fee</label>
                </div>
              </div>
              <div class="flex justify-end gap-3 mt-6">
                <button type="button" @click="closeLateFeeModal" class="h-8 px-8 rounded-full bg-white text-sm font-bold text-gray-600 border border-gray-200 hover:bg-white transition-all duration-200">Cancel</button>
                <button type="submit" class="h-8 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">Assign</button>
              </div>
            </form>
          </div>
        </transition>
      </div>
    </transition>

    <!-- Latest Late Fee Notification -->
    <div v-if="latestLateFee" class="w-full max-w-7xl mx-auto mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow px-4 py-3 border border-purple-100 relative">
      <div class="flex flex-col gap-1">
        <span class="text-sm font-semibold text-gray-900">Current Late Fee Settings:</span>
        <span class="text-xs text-gray-600">Amount: <b>PKR {{ latestLateFee.late_fee_amount }}</b> | Apply After: <b>{{ latestLateFee.apply_after_days }} days</b> | Auto Apply: <b>{{ latestLateFee.is_auto_apply ? 'Yes' : 'No' }}</b></span>
      </div>
      <div class="mt-2 sm:mt-0 flex gap-2 items-center">
        <span class="text-xs text-gray-500">Last updated: {{ latestLateFee.updated_at ? latestLateFee.updated_at.split('T')[0] : '' }}</span>
        <div class="relative ml-4">
          <button @click="showLateFeeMenu = !showLateFeeMenu" class="p-2 rounded-full hover:bg-purple-100 transition flex items-center justify-center focus:outline-none">
            <IconEye class="w-5 h-5 text-purple-500" />
          </button>
          <transition name="fade-slide">
            <div v-if="showLateFeeMenu" class="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-purple-100 z-50">
              <button @click="editLateFee" class="w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-purple-50 transition">Edit</button>
              <button @click="confirmDeleteLateFee" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">Delete</button>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import api from '@/utils/axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import UiTable from '@/components/UiTable.vue'
import LoadingStudents from '@/components/LoadingStudents.vue'
import { IconEye } from '@tabler/icons-vue'
import { useToast } from 'vue-toastification'

// View mode state
const toast = useToast()
const viewMode = ref('overview')

// Filter states
const selectedClass = ref('')
const selectedStatus = ref('')
const searchQuery = ref('')

// Fee Default CRUD state
const feeDefaults = ref([])
const showAddModal = ref(false)
const showEditModal = ref(false)
const editId = ref(null)
const loading = ref(false)
const crudLoading = ref(false)

const feeForm = ref({
  class_id: '',
  monthly_fee: '',
  effective_from: '',
  status: 'Active'
})

// API data
const classes = ref([])
const sections = ref([])

const pagination = ref({ current_page: 1, last_page: 1, per_page: 10, total: 0 })

const goToPage = ref(null)

// Computed property for the "Showing..." text
const paginationText = computed(() => {
  if (!pagination.value.total) return ''
  const { from, to, total } = pagination.value
  return `Showing ${from} to ${to} of ${total} entries`
})

const handlePerPageChange = () => {
  fetchFeeDefaults(1)
}

const handleGoToPage = () => {
  const page = Number(goToPage.value)
  if (page && page > 0 && page <= pagination.value.last_page) {
    fetchFeeDefaults(page)
  }
  goToPage.value = null
}

function getPageFromUrl(url) {
  if (!url) return null
  try {
    const urlObject = new URL(url)
    const page = urlObject.searchParams.get('page')
    return page ? Number(page) : null
  } catch (e) {
    return null
  }
}

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
    const params = {}
    if (selectedClass.value) params.class_id = selectedClass.value
    const response = await api.get('/sections', { params })
    if (response.data.success) {
      sections.value = response.data.result.map(s => ({ id: s.id, name: s.name }))
    }
  } catch (error) {
    console.error('Error fetching sections:', error)
    toast.error('Failed to fetch sections')
  }
}

// Watch for class change to update sections
watch(selectedClass, () => {
  fetchSections()
})

const fetchFeeDefaults = async (page = 1) => {
  try {
    loading.value = true
    const params = {
      page: page,
      per_page: pagination.value.per_page,
      class_id: selectedClass.value,
      status: selectedStatus.value,
      search: searchQuery.value,
    }
    const { data } = await api.get('/fee-defaults/', { params })
    if (data.status) {
      feeDefaults.value = data.result.data
      pagination.value.current_page = data.result.current_page
      pagination.value.last_page = data.result.last_page
      pagination.value.per_page = data.result.per_page
      pagination.value.total = data.result.total
    }
  } catch (e) {
    toast.error('Failed to fetch fee defaults')
  } finally {
    loading.value = false
  }
}

const addFeeDefault = async () => {
  try {
    crudLoading.value = true
    const { data } = await api.post('/fee-defaults/store', feeForm.value)
    if (data.success) {
      toast.success('Fee default added')
      showAddModal.value = false
      fetchFeeDefaults()
    }
  } catch (e) {
    toast.error('Failed to add fee default')
  } finally {
    crudLoading.value = false
  }
}

const editFeeDefault = (fee) => {
  editId.value = fee.id
  feeForm.value = { ...fee }
  showEditModal.value = true
}

const updateFeeDefault = async () => {
  try {
    crudLoading.value = true
    const { data } = await api.post(`/fee-defaults/update/${editId.value}`, feeForm.value)
    if (data.success) {
      toast.success('Fee default updated')
      showEditModal.value = false
      fetchFeeDefaults()
    }
  } catch (e) {
    toast.error('Failed to update fee default')
  } finally {
    crudLoading.value = false
  }
}

const deleteFeeDefault = async (id) => {
  try {
    crudLoading.value = true
    const { data } = await api.get(`/fee-defaults/delete/${id}`)
    if (data.success) {
      toast.success('Fee default deleted')
      fetchFeeDefaults()
    }
  } catch (e) {
    toast.error('Failed to delete fee default')
  } finally {
    crudLoading.value = false
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  feeForm.value = { class_id: '', monthly_fee: '', effective_from: '', status: 'Active' }
  editId.value = null
}

onMounted(() => {
  fetchClasses()
  fetchFeeDefaults()
})

const fetchData = () => {
  fetchFeeDefaults()
}

// Methods
const setViewMode = (mode) => {
  viewMode.value = mode
}

const resetForm = () => {
  feeForm.value = {
    id: null,
    class_id: '',
    monthly_fee: '',
    effective_from: '',
    status: 'Active'
  }
}

const addFee = () => {
  showAddModal.value = true
  resetForm()
}

const editFee = (fee) => {
  feeForm.value = { ...fee }
  showEditModal.value = true
}

const saveFee = () => {
  if (showEditModal.value) {
    // Update existing fee
    const index = feeDefaults.value.findIndex(f => f.id === feeForm.value.id)
    if (index !== -1) {
      feeDefaults.value[index] = { ...feeForm.value }
    }
  } else {
    // Add new fee
    const newFee = {
      ...feeForm.value,
      id: Date.now() // Simple ID generation
    }
    feeDefaults.value.push(newFee)
  }
  
  closeModal()
}

const deleteFee = (id) => {
  if (confirm('Are you sure you want to delete this fee?')) {
    feeDefaults.value = feeDefaults.value.filter(fee => fee.id !== id)
  }
}

const selectedFees = ref([])
const allSelected = ref(false)
function toggleAllSelection() {
  if (allSelected.value) {
    selectedFees.value = feeDefaults.value.map(fee => fee.id)
  } else {
    selectedFees.value = []
  }
}
function applyLateFee(fee) {
  // TODO: Implement late fee logic for a single class
  toast.success(`Late fee applied for class: ${fee.class}`)
}

const showLateFeeModal = ref(false)
const lateFeeForm = ref({
  late_fee_amount: '',
  apply_after_days: 5,
  is_auto_apply: true
})
function openLateFeeModal() {
  showLateFeeModal.value = true
}
function closeLateFeeModal() {
  showLateFeeModal.value = false
}

const latestLateFee = ref(null)
const showLateFeeMenu = ref(false)

async function fetchLatestLateFee() {
  try {
    const { data } = await api.get('/late-fees?per_page=1')
    if (data.success && data.data.data.length > 0) {
      latestLateFee.value = data.data.data[0]
    } else {
      latestLateFee.value = null
    }
  } catch (e) {
    latestLateFee.value = null
  }
}

async function submitLateFeeModal() {
  try {
    const payload = {
      ...lateFeeForm.value,
      merchant_id: 1, // TODO: Replace with actual merchant_id
      added_by: 1     // TODO: Replace with actual user id
    }
    await api.post('/late-fees/store', payload)
    closeLateFeeModal()
    toast.success('Late fee assigned to all classes!')
    fetchLatestLateFee()
  } catch (e) {
    toast.error('Failed to assign late fee.')
  }
}

function editLateFee() {
  showLateFeeMenu.value = false
  lateFeeForm.value = {
    late_fee_amount: latestLateFee.value.late_fee_amount,
    apply_after_days: latestLateFee.value.apply_after_days,
    is_auto_apply: latestLateFee.value.is_auto_apply
  }
  showLateFeeModal.value = true
}

async function confirmDeleteLateFee() {
  showLateFeeMenu.value = false
  const result = await ElMessageBox.confirm(
    'Delete Late Fee?',
    'Are you sure you want to delete the current late fee settings?',
    'Late Fee Settings'
  , {
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })

  if (result) {
    try {
      await api.post(`/late-fees/delete/${latestLateFee.value.id}`)
      toast.success('Success!', 'Late fee deleted!')
      fetchLatestLateFee()
    } catch (error) {
      toast.error('Error!', 'Failed to delete late fee settings')
    }
  }
}

onMounted(() => {
  fetchLatestLateFee()
})

// Replace applyLateFeeBulk handler to open modal
function applyLateFeeBulk() {
  if (selectedFees.value.length === 0) {
    toast.warning('Please select at least one class to apply late fee.')
    return
  }
  openLateFeeModal()
}
</script>

<style scoped>
/* Overlay fade */
.modal-overlay-fade-enter-active, .modal-overlay-fade-leave-active {
  transition: opacity 0.35s cubic-bezier(0.4,0,0.2,1);
}
.modal-overlay-fade-enter-from, .modal-overlay-fade-leave-to {
  opacity: 0;
}
.modal-overlay-fade-enter-to, .modal-overlay-fade-leave-from {
  opacity: 1;
}

/* Modal pop, spring, 3D, shadow, overshoot */
.modal-pop-advance-enter-active {
  animation: modal-pop-in-advance 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.modal-pop-advance-leave-active {
  animation: modal-pop-out-advance 0.4s cubic-bezier(0.55, 0, 0.55, 0.2) both;
}

@keyframes modal-pop-in-advance {
  0% {
    opacity: 0;
    transform: translateY(80px) scale(0.85) rotateX(18deg);
    box-shadow: 0 0 0 rgba(80,0,120,0.05);
  }
  60% {
    opacity: 1;
    transform: translateY(-12px) scale(1.04) rotateX(-6deg);
    box-shadow: 0 16px 48px rgba(80,0,120,0.14);
  }
  80% {
    transform: translateY(4px) scale(0.98) rotateX(2deg);
    box-shadow: 0 4px 24px rgba(80,0,120,0.10);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1) rotateX(0deg);
    box-shadow: 0 12px 40px 0 rgba(80,0,120,0.18), 0 1.5px 8px 0 rgba(80,0,120,0.10);
  }
}

@keyframes modal-pop-out-advance {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1) rotateX(0deg);
    box-shadow: 0 12px 40px 0 rgba(80,0,120,0.18), 0 1.5px 8px 0 rgba(80,0,120,0.10);
  }
  100% {
    opacity: 0;
    transform: translateY(60px) scale(0.85) rotateX(16deg);
    box-shadow: 0 0 0 rgba(80,0,120,0.05);
  }
}
</style> 