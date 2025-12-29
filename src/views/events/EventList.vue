<template>
  <div class="relative w-full min-h-screen pl-0 pr-0 sm:pl-0 sm:pr-0 lg:pl-1 lg:pr-0 py-2 sm:py-3 lg:py-4">
    <!-- Top Bar Header -->
    <div class="w-full max-w-7xl mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
      <h2 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        Event Management - {{ getFilterSummary() }}
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Dashboard</span>
        <span class="mx-2">|</span>
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Events</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">Event Management</span>
      </nav>
    </div>

    <!-- Select Criteria Label -->
    <div class="w-full max-w-7xl mx-auto mb-2">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-900 tracking-tight">Filter & Manage Events</h3>
        <div class="h-[2px] bg-purple-200 w-full transition-all duration-300" style="max-width: 180px"></div>
      </div>
    </div>

    <!-- Advanced Filter Bar -->
    <div class="w-full max-w-7xl mx-auto rounded-lg border border-gray-200 bg-white/90 px-4 sm:px-6 py-3 shadow-lg mb-6">
      <form class="w-full" @submit.prevent="applyFilters">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Search Events</label>
            <div class="relative">
              <input 
                v-model="filters.eventTitle"
                type="text" 
                placeholder="Search by title"
                class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
              />
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>

          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Event Type</label>
            <div class="relative">
              <select 
                v-model="filters.eventType"
                class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8"
              >
                <option value="">All Types</option>
                <option value="birthday">Birthday</option>
                <option value="reminder">Reminder</option>
                <option value="holiday">Holiday</option>
                <option value="meeting">Meeting</option>
                <option value="exam">Exam</option>
                <option value="general">General</option>
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
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</label>
            <div class="relative">
              <select 
                v-model="filters.eventStatus"
                class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8"
              >
                <option value="">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
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
                <option value="date_desc">Newest First</option>
                <option value="date_asc">Oldest First</option>
                <option value="title_asc">Title (A-Z)</option>
                <option value="title_desc">Title (Z-A)</option>
                <option value="type_asc">Type (A-Z)</option>
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

        <!-- Date Range Filter -->
        <div class="mt-4">
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date Range</label>
            <CompactDatePicker
              :model-value="dateRangeValue"
              placeholder=""
              @change="handleDateRangeChange"
            />
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
              @click="openAddEvent" 
              class="h-9 px-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-sm font-bold text-white shadow hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105"
            >
        Add Event
            </button>
            <button 
              type="button"
              @click="openCalendarView"
              class="h-9 px-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-sm font-bold text-white shadow hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
            >
              Calendar View
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
          Event Results ({{ filteredEvents.length }})
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

    <div class="w-full max-w-7xl mx-auto">
      <div class="h-[2px] w-full bg-purple-200 mb-4"></div>
    </div>

    <!-- Advanced Loading State -->
    <div v-if="loading" class="w-full max-w-7xl mx-auto">
      <div class="border border-gray-200 rounded-xl p-8 bg-white/40 shadow-sm">
        <div class="flex flex-col items-center justify-center py-12">
          <div class="relative mb-6">
            <div class="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-500 rounded-full animate-ping opacity-20"></div>
          </div>
          <div class="text-center">
            <p class="text-gray-600 font-medium text-lg mb-1">Loading Events</p>
            <p class="text-gray-500 text-sm font-normal">Please wait while we fetch the event data...</p>
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
    <div v-else-if="!loading && filteredEvents.length === 0" class="w-full max-w-7xl mx-auto">
      <div class="border border-gray-200 rounded-xl p-8 bg-white/40 shadow-sm">
        <div class="flex flex-col items-center justify-center py-12">
          <div class="relative mb-6">
            <div class="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3a4 4 0 118 0v4M7 7h10l1 10H6L7 7z"/>
              </svg>
            </div>
            <div class="absolute -top-2 -right-2 w-4 h-4 bg-purple-300 rounded-full animate-ping opacity-30"></div>
            <div class="absolute -bottom-2 -left-2 w-3 h-3 bg-indigo-300 rounded-full animate-pulse"></div>
          </div>
          <div class="w-full">
            <h3 class="text-gray-600 font-medium text-xl mb-2">No Events Found</h3>
            <p class="text-gray-500 text-sm font-normal leading-relaxed mb-4">
              No events match your current filters. Try adjusting your search criteria or create your first event.
            </p>
            <button 
              @click="openAddEvent"
              class="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
            >
              Add First Event
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Advanced Events Table -->
    <div v-else-if="!loading && filteredEvents.length > 0" class="w-full max-w-7xl mx-auto">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gradient-to-r from-indigo-50 to-purple-50">
              <tr>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">#</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Event Details</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Date & Time</th>
                <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Type</th>
                <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Status</th>
                <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Duration</th>
                <th class="text-center py-3 px-4 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(event, index) in paginatedEvents" :key="event.id" class="hover:bg-indigo-50 transition-colors border-b border-purple-200">
                <td class="py-3 px-4 text-gray-900 font-normal text-sm">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                <td class="py-3 px-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
                      {{ getEventIcon(event.type) }}
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ event.title || event.name }}</div>
                      <div class="text-xs text-gray-500">{{ event.description || 'No description available' }}</div>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <div class="text-sm text-gray-900">
                    <div class="font-medium">{{ formatDate(event.start_date) }}</div>
                    <div class="text-xs text-gray-500">{{ formatTime(event.start_date) }} - {{ formatTime(event.end_date) }}</div>
                  </div>
                </td>
                <td class="py-3 px-4 text-center">
                  <span :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getTypeTagClass(event.type)
                  ]">
                    {{ event.type || 'General' }}
                  </span>
                </td>
                <td class="py-3 px-4 text-center">
                  <span :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getStatusTagClass(event.status || getEventStatus(event))
                  ]">
                    {{ formatStatus(event.status || getEventStatus(event)) }}
                  </span>
                </td>
                <td class="py-3 px-4 text-center">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ getEventDuration(event) }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <div class="flex items-center justify-center gap-2">
                    <button 
                      @click="editEvent(event)"
                      class="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200 hover:scale-110"
                      title="Edit Event"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button 
                      @click="viewEventDetails(event)"
                      class="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200 hover:scale-110"
                      title="View Details"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    </button>
                    <button 
                      @click="duplicateEvent(event)"
                      class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 hover:scale-110"
                      title="Duplicate Event"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                    </button>
                    <button 
                      @click="deleteEvent(event)"
                      class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 hover:scale-110"
                      title="Delete Event"
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
                  <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredEvents.length) }}</span>
                  of
                  <span class="font-medium">{{ filteredEvents.length }}</span>
                  events
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

    <!-- Event Details Modal -->
    <div v-if="showEventDetails" class="relative z-10 bg-white rounded-lg shadow-xl border border-gray-200" @click.self="showEventDetails = false">
      <div class="w-full">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Event Details</h3>
            <button @click="showEventDetails = false" class="text-gray-500 hover:text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="p-6" v-if="selectedEvent">
          <div class="space-y-4">
            <div>
              <label class="text-sm font-medium text-gray-900">Title</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedEvent.title || selectedEvent.name }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-900">Description</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedEvent.description || 'No description available' }}</p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-gray-900">Start Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDateTime(selectedEvent.start_date) }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-900">End Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDateTime(selectedEvent.end_date) }}</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-gray-900">Type</label>
                <p class="mt-1">
                  <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getTypeTagClass(selectedEvent.type)]">
                    {{ selectedEvent.type || 'General' }}
                  </span>
                </p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-900">Status</label>
                <p class="mt-1">
                  <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getStatusTagClass(selectedEvent.status || getEventStatus(selectedEvent))]">
                    {{ formatStatus(selectedEvent.status || getEventStatus(selectedEvent)) }}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div class="flex gap-3 pt-6">
            <button 
              @click="showEventDetails = false"
              class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 text-sm font-bold text-white shadow hover:from-gray-600 hover:to-slate-600 transition-all duration-300"
            >
              Close
            </button>
            <button 
              @click="editEvent(selectedEvent)"
              class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Edit Event
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
import { useRouter } from 'vue-router'
import api from '@/utils/axios'
import CompactDatePicker from '@/components/CompactDatePicker.vue'

const router = useRouter()
const toast = useToast()
const axios = api

// Reactive data
const events = ref([])
const filters = ref({
  eventTitle: '',
  eventType: '',
  eventStatus: '',
  startDate: '',
  endDate: ''
})

// Date range computed property for CompactDatePicker
const dateRangeValue = computed({
  get: () => {
    if (filters.value.startDate && filters.value.endDate) {
      return [filters.value.startDate, filters.value.endDate]
    }
    return null
  },
  set: (value) => {
    if (Array.isArray(value) && value.length === 2) {
      filters.value.startDate = value[0]?.split(' ')[0] || ''
      filters.value.endDate = value[1]?.split(' ')[0] || ''
    } else {
      filters.value.startDate = ''
      filters.value.endDate = ''
    }
  }
})

// Handle date range change from CompactDatePicker
const handleDateRangeChange = (value) => {
  if (Array.isArray(value) && value.length === 2) {
    filters.value.startDate = value[0]?.split(' ')[0] || ''
    filters.value.endDate = value[1]?.split(' ')[0] || ''
  } else {
    filters.value.startDate = ''
    filters.value.endDate = ''
  }
}

const sortOrder = ref('date_desc')
const currentPage = ref(1)
const itemsPerPage = ref(20)
const loading = ref(false)
const showEventDetails = ref(false)
const selectedEvent = ref(null)

// Computed properties for advanced filtering and sorting
const filteredEvents = computed(() => {
  let filtered = events.value.filter(event => {
    const titleMatch = !filters.value.eventTitle || 
      (event.title && event.title.toLowerCase().includes(filters.value.eventTitle.toLowerCase())) ||
      (event.name && event.name.toLowerCase().includes(filters.value.eventTitle.toLowerCase()))
    
    const typeMatch = !filters.value.eventType || event.type === filters.value.eventType
    
    const statusMatch = !filters.value.eventStatus || 
      (event.status === filters.value.eventStatus) ||
      (getEventStatus(event) === filters.value.eventStatus)
    
    let dateMatch = true
    if (filters.value.startDate && filters.value.endDate) {
      const eventDate = new Date(event.start_date)
      const startDate = new Date(filters.value.startDate)
      const endDate = new Date(filters.value.endDate)
      dateMatch = eventDate >= startDate && eventDate <= endDate
    } else if (filters.value.startDate) {
      const eventDate = new Date(event.start_date)
      const startDate = new Date(filters.value.startDate)
      dateMatch = eventDate >= startDate
    } else if (filters.value.endDate) {
      const eventDate = new Date(event.start_date)
      const endDate = new Date(filters.value.endDate)
      dateMatch = eventDate <= endDate
    }
    
    return titleMatch && typeMatch && statusMatch && dateMatch
  })

  // Apply sorting
  const [sortField, sortDirection] = sortOrder.value.split('_')
  
  return filtered.sort((a, b) => {
    let aValue, bValue
    
    switch (sortField) {
      case 'title':
        aValue = (a.title || a.name || '').toLowerCase()
        bValue = (b.title || b.name || '').toLowerCase()
        break
      case 'date':
        aValue = new Date(a.start_date || 0)
        bValue = new Date(b.start_date || 0)
        break
      case 'type':
        aValue = (a.type || '').toLowerCase()
        bValue = (b.type || '').toLowerCase()
        break
      default:
        aValue = new Date(a.start_date || 0)
        bValue = new Date(b.start_date || 0)
    }
    
    if (sortDirection === 'desc') {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
    } else {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
    }
  })
})

const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredEvents.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredEvents.value.length / itemsPerPage.value)
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
const fetchEvents = async () => {
  try {
    loading.value = true
    console.log('Fetching events from API')
    
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/events`)
    console.log('Events API Response:', response.data)
    
    if (Array.isArray(response.data)) {
      events.value = response.data
    } else if (Array.isArray(response.data.data)) {
      events.value = response.data.data
    } else if (Array.isArray(response.data.events)) {
      events.value = response.data.events
    } else if (response.data.success && Array.isArray(response.data.result)) {
      events.value = response.data.result
    } else if (response.data.status && Array.isArray(response.data.result)) {
      events.value = response.data.result
    } else {
      events.value = []
    }
    console.log('Events loaded:', events.value.length)
  } catch (error) {
    console.error('Error fetching events:', error)
    toast.error('Failed to fetch events')
    events.value = []
  } finally {
    loading.value = false
  }
}

const getFilterSummary = () => {
  const parts = []
  if (filters.value.eventTitle) parts.push(`Search: "${filters.value.eventTitle}"`)
  if (filters.value.eventType) parts.push(`Type: ${filters.value.eventType}`)
  if (filters.value.eventStatus) parts.push(`Status: ${filters.value.eventStatus}`)
  if (filters.value.startDate || filters.value.endDate) {
    const dateRange = []
    if (filters.value.startDate) dateRange.push(`From: ${filters.value.startDate}`)
    if (filters.value.endDate) dateRange.push(`To: ${filters.value.endDate}`)
    parts.push(dateRange.join(' '))
  }
  return parts.length > 0 ? parts.join(' | ') : 'All Events'
}

const getEventIcon = (type) => {
  const icons = {
    birthday: '🎂',
    reminder: '⏰',
    holiday: '🎉',
    meeting: '🤝',
    exam: '📝',
    general: '📅'
  }
  return icons[type] || '📅'
}

const getEventStatus = (event) => {
  if (!event.start_date) return 'upcoming'
  
  const now = new Date()
  const startDate = new Date(event.start_date)
  const endDate = new Date(event.end_date || event.start_date)
  
  if (now < startDate) return 'upcoming'
  if (now > endDate) return 'completed'
  return 'active'
}

const getEventDuration = (event) => {
  if (!event.start_date || !event.end_date) return 'N/A'
  
  const start = new Date(event.start_date)
  const end = new Date(event.end_date)
  const diffMs = end - start
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)
  
  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''}`
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''}`
  return '< 1 hour'
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

const formatTime = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const formatStatus = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const getTypeTagClass = (type) => {
  const classes = {
    birthday: 'bg-pink-100 text-pink-800',
    reminder: 'bg-yellow-100 text-yellow-800',
    holiday: 'bg-green-100 text-green-800',
    meeting: 'bg-blue-100 text-blue-800',
    exam: 'bg-red-100 text-red-800',
    general: 'bg-white text-gray-900'
  }
  return classes[type] || 'bg-purple-100 text-purple-800'
}

const getStatusTagClass = (status) => {
  const classes = {
    upcoming: 'bg-blue-100 text-blue-800',
    active: 'bg-green-100 text-green-800',
    completed: 'bg-white text-gray-900',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-blue-100 text-blue-800'
}

const openAddEvent = () => {
  router.push('/events/create')
}

const openCalendarView = () => {
  router.push('/events/calendar')
}

const editEvent = (event) => {
  router.push(`/events/edit/${event.id}`)
}

const viewEventDetails = (event) => {
  selectedEvent.value = event
  showEventDetails.value = true
}

const duplicateEvent = async (event) => {
  try {
    const duplicatedEvent = {
      ...event,
      title: `${event.title || event.name} (Copy)`,
      name: `${event.title || event.name} (Copy)`
    }
    delete duplicatedEvent.id
    
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/events/store`, duplicatedEvent)
    if (response.data.success || response.data.status) {
      toast.success('Event duplicated successfully!')
    await fetchEvents()
    } else {
      toast.error('Failed to duplicate event')
    }
  } catch (error) {
    console.error('Error duplicating event:', error)
    toast.error('Failed to duplicate event')
  }
}

const deleteEvent = async (event) => {
  if (!confirm(`Are you sure you want to delete "${event.title || event.name}"?`)) return
  
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/events/delete/${event.id}`)
    if (response.data.success || response.data.status) {
      toast.success('Event deleted successfully!')
      await fetchEvents()
    } else {
      toast.error('Failed to delete event')
    }
  } catch (error) {
    console.error('Error deleting event:', error)
    toast.error('Failed to delete event')
  }
}

const applyFilters = () => {
  currentPage.value = 1
}

const clearFilters = () => {
  filters.value = {
    eventTitle: '',
    eventType: '',
    eventStatus: '',
    startDate: '',
    endDate: ''
  }
  sortOrder.value = 'date_desc'
  currentPage.value = 1
}

const applySorting = () => {
  currentPage.value = 1
}

const exportToExcel = () => {
  toast.info('Excel export functionality will be implemented soon!')
}

const exportToPDF = () => {
  toast.info('PDF export functionality will be implemented soon!')
}

// Watch for filter and sort changes
watch([() => filters.value.eventTitle, () => filters.value.eventType, () => filters.value.eventStatus, () => filters.value.startDate, () => filters.value.endDate], () => {
  currentPage.value = 1
}, { deep: true })

watch(sortOrder, () => {
  currentPage.value = 1
})

// Initialize data
onMounted(async () => {
  console.log('EventList component mounted, fetching data...')
  await fetchEvents()
})
</script>

<style scoped>
/* Professional ERP styling - exact match to ClassSubjects and ViewMarksheet */
.bg-white\/90 {
  background-color: #ffffff;
}

/* Navy color scheme */
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

/* Table styling */
table {
  border-collapse: separate;
  border-spacing: 0;
}

tbody tr:hover {
  background-color: rgba(165, 180, 252, 0.1);
  transition: background-color 0.15s ease-in-out;
}

/* Loading animations */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
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

@keyframes pulse {
  50% {
    opacity: .5;
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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
select:focus,
textarea:focus {
  outline: 2px solid #a855f7;
  outline-offset: 2px;
}

/* Modal backdrop blur */
.backdrop-blur {
  backdrop-filter: blur(8px);
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

/* Transition effects */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.duration-200 {
  transition-duration: 200ms;
}

.duration-300 {
  transition-duration: 300ms;
}

.duration-500 {
  transition-duration: 500ms;
}

/* Card shadows */
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Rounded corners */
.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-xl {
  border-radius: 0.75rem;
}

.rounded-full {
  border-radius: 9999px;
}

/* Gradient button styling */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

/* Color scheme for gradient buttons */
.from-purple-500 {
  --tw-gradient-from: #8b5cf6;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(139, 92, 246, 0));
}

.to-pink-500 {
  --tw-gradient-to: #ec4899;
}

.from-green-500 {
  --tw-gradient-from: #10b981;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(16, 185, 129, 0));
}

.to-emerald-500 {
  --tw-gradient-to: #10b981;
}

.from-blue-500 {
  --tw-gradient-from: #3b82f6;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(59, 130, 246, 0));
}

.to-indigo-500 {
  --tw-gradient-to: #6366f1;
}

.from-red-500 {
  --tw-gradient-from: #ef4444;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(239, 68, 68, 0));
}

.from-gray-500 {
  --tw-gradient-from: #94a3b8;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(107, 114, 128, 0));
}

.to-slate-500 {
  --tw-gradient-to: #64748b;
}

/* Status badge colors */
.bg-blue-100 { background-color: #f1f5f9; }
.text-blue-800 { color: #3b82f6; }
.bg-green-100 { background-color: #f1f5f9; }
.text-green-800 { color: #10b981; }
.bg-yellow-100 { background-color: #f1f5f9; }
.text-yellow-800 { color: #f59e0b; }
.bg-purple-100 { background-color: #f1f5f9; }
.text-purple-800 { color: #8b5cf6; }
.bg-white { background-color: #94a3b8; }
.text-gray-900 { color: #1e293b; }
.bg-pink-100 { background-color: #f1f5f9; }
.text-pink-800 { color: var(--accent-secondary); }
.bg-red-100 { background-color: #f1f5f9; }
.text-red-800 { color: #ef4444; }

/* Border styles */
.border-purple-200 {
  border-color: var(--border-accent);
}

.border-purple-400 {
  border-color: #8b5cf6;
}

/* Enhanced table header */
.bg-gradient-to-r.from-indigo-50.to-purple-50 {
  background-image: linear-gradient(to right, #eef2ff, #faf5ff);
}

/* Form input styling */
input[type="text"],
input[type="date"],
select {
  border: none;
  border-bottom: 2px solid #e9d5ff;
  background: transparent;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="date"]:focus,
select:focus {
  border-bottom-color: #8b5cf6;
  outline: none;
}

/* Responsive design helpers */
@media (max-width: 640px) {
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

@media (min-width: 640px) {
  .sm\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

/* Advanced animations for professional feel */
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

/* Event type specific icons and styling */
.event-icon {
  font-size: 1.2em;
  line-height: 1;
}

/* Modal animation */
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style> 