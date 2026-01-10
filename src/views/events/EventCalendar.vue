<template>
  <div class="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden" style="background: var(--bg-primary);">
    <!-- Background Decorative Elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-indigo-400/15 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      </div>

    <!-- Top Bar Header with Enhanced Design -->
    <div class="w-full max-w-6xl mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200 dark:border-gray-700">
      <h2 :class="[textSizes.h3, 'text-gray-600 dark:text-gray-300 tracking-tight flex items-center gap-2']">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        Event Calendar
      </h2>
      <nav :class="[textSizes.nav, 'flex items-center gap-2 text-gray-500 dark:text-gray-400']">
        <span class="hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors duration-200">Dashboard</span>
        <span class="mx-2">|</span>
        <span class="hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors duration-200">Events</span>
        <span class="mx-2">|</span>
        <span :class="[textSizes.navActive, 'text-gray-900 dark:text-white']">Calendar</span>
      </nav>
    </div>

    <!-- Enhanced Calendar Controls -->
    <div class="w-full max-w-6xl mx-auto mb-6">
      <div class="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-200/20 dark:border-gray-700/20 relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-5">
          <div class="w-full h-full" style="background-image: radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.3) 1px, transparent 0); background-size: 20px 20px;"></div>
        </div>
        
        <!-- Left Side - Enhanced Navigation -->
        <div class="flex items-center gap-6 relative z-10">
          <button 
            @click="prevMonth"
            class="group p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95"
          >
            <svg class="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          
          <div class="text-center">
            <h3 :class="[textSizes.h1, 'bg-gradient-to-r from-navy-700 to-purple-700 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent min-w-[200px] sm:min-w-[250px] tracking-tight']">
              {{ monthYearLabel }}
            </h3>
            <p :class="[textSizes.label, 'text-gray-500 dark:text-gray-400 mt-1']">{{ getTotalEventsForMonth() }} events this month</p>
        </div>
          
          <button 
            @click="nextMonth"
            class="group p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95"
          >
            <svg class="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <!-- Right Side - Enhanced Quick Actions -->
        <div class="flex items-center gap-4 relative z-10">
          <div class="flex items-center gap-2 bg-white/80 rounded-full px-4 py-2">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span :class="[textSizes.label, 'text-gray-600 dark:text-gray-400']">Live View</span>
      </div>
          
          <button 
            @click="$router.push('/events')"
            :class="[textSizes.button, 'group px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center gap-2']"
          >
            <svg class="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
            </svg>
            List View
          </button>
          
          <button 
            @click="quickAddEvent"
            :class="[textSizes.button, 'group px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center gap-2']"
          >
            <svg class="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
            </svg>
            Add Event
          </button>
      </div>
              </div>
            </div>

    <!-- Enhanced Main Calendar Content -->
    <div class="w-full max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
      <!-- Enhanced Sidebar -->
        <div class="lg:col-span-1 space-y-4 lg:space-y-6">
        <!-- Mini Calendar with Enhanced Design -->
        <div class="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-200/20 dark:border-gray-700/20">
          <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 p-3 sm:p-4 lg:p-5 border-b border-gray-200 dark:border-gray-700">
            <h4 :class="[textSizes.cardTitle, 'text-gray-900 dark:text-white mb-3 flex items-center gap-2']">
              <div class="p-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4M7 7h10l1 10H6L7 7z"/>
                </svg>
              </div>
              <span class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Quick Navigation</span>
            </h4>
            <CompactDatePicker 
              v-model="selectedDateInput"
              placeholder=""
              @change="onDateSelect"
            />
      </div>
        </div>

        <!-- Enhanced Event Types Legend -->
        <div class="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-200/20 dark:border-gray-700/20">
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-3 sm:p-4 lg:p-5 border-b border-gray-200 dark:border-gray-700">
            <h4 :class="[textSizes.cardTitle, 'text-gray-900 dark:text-white mb-3 flex items-center gap-2']">
              <div class="p-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-lg">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                </svg>
              </div>
              <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Event Types</span>
            </h4>
            <div class="space-y-3 p-3">
              <div v-for="type in eventTypes" :key="type.value" class="group flex items-center gap-4 p-2 rounded-lg hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-300 cursor-pointer">
                <div :class="['w-4 h-4 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300', type.colorClass]"></div>
                <span :class="[textSizes.bodySmall, 'text-gray-900 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300']">{{ type.label }}</span>
                <div class="ml-auto">
                  <span :class="[textSizes.badge, 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full min-w-[24px] text-center']">{{ getEventCountByType(type.value) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Today's Events -->
        <div class="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-200/20 dark:border-gray-700/20">
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-3 sm:p-4 lg:p-5 border-b border-gray-200 dark:border-gray-700">
            <h4 :class="[textSizes.cardTitle, 'text-gray-900 dark:text-white mb-3 flex items-center gap-2']">
              <div class="p-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg shadow-lg">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span class="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Today's Events</span>
            </h4>
            <div class="space-y-3" v-if="todaysEvents.length > 0">
              <div 
                v-for="event in todaysEvents" 
                :key="event.id"
                @click="openEvent(event.id)"
                class="group p-3 rounded-lg bg-white/60 dark:bg-gray-700/60 hover:bg-white/80 dark:hover:bg-gray-700/80 cursor-pointer transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:border-purple-200 dark:hover:border-purple-500 hover:shadow-lg transform hover:scale-105"
              >
                <div class="flex items-center gap-3 mb-2">
                  <div :class="['w-3 h-3 rounded-full shadow-lg', getEventTypeColor(event.type)]"></div>
                  <span :class="[textSizes.bodySmall, 'font-semibold text-gray-900 dark:text-gray-100 truncate group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors duration-300']">{{ event.name }}</span>
                </div>
                <div :class="[textSizes.cardMeta, 'text-gray-500 dark:text-gray-400 pl-6']">{{ formatEventTime(event) }}</div>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <div class="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg class="w-8 h-8 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3a4 4 0 118 0v4M7 7h10l1 10H6L7 7z"/>
                </svg>
              </div>
              <p :class="[textSizes.body, 'text-gray-500 dark:text-gray-400']">No events today</p>
              <p :class="[textSizes.label, 'text-gray-500 dark:text-gray-400 mt-1']">Your calendar is clear!</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Calendar Grid -->
      <div class="lg:col-span-3">
          <div class="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-200/20 dark:border-gray-700/20">
          <!-- Enhanced Calendar Header -->
          <div class="p-3 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-pink-900/30 relative overflow-hidden">
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-10">
              <div class="w-full h-full" style="background-image: radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.4) 1px, transparent 0); background-size: 24px 24px;"></div>
            </div>
            
            <div class="grid grid-cols-7 gap-1 sm:gap-2 relative z-10">
              <div v-for="day in weekDays" :key="day" :class="[textSizes.calendarDay, 'text-center text-gray-600 dark:text-gray-300 py-2 relative']">
                <span class="relative z-10">{{ day }}</span>
                <div class="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-pink-100/50 dark:from-purple-800/30 dark:to-pink-800/30 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          <!-- Enhanced Calendar Body -->
          <div class="p-4 sm:p-6">
            <div class="grid grid-cols-7 gap-2 sm:gap-3 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
              <div
                v-for="date in calendarDates"
                :key="date.dateString"
                @click="onDateClick(date)"
                :class="[
                  'group min-h-[60px] sm:min-h-[80px] lg:min-h-[100px] p-2 sm:p-3 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 hover:border-purple-200 dark:hover:border-purple-500 hover:shadow-lg transform hover:scale-[1.02] sm:hover:scale-105 hover:-translate-y-0.5 sm:hover:-translate-y-1 relative overflow-hidden',
                  {
                    'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200 dark:border-blue-500 shadow-md': date.isToday,
                    'text-gray-500 dark:text-gray-500 opacity-60': !date.isCurrentMonth,
                    'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-200 dark:border-purple-500 shadow-md': date.isSelected && date.isCurrentMonth,
                    'bg-white dark:bg-gray-700/50 hover:bg-gradient-to-br hover:from-purple-25 hover:to-pink-25 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20': date.isCurrentMonth && !date.isToday && !date.isSelected
                  }
                ]"
              >
                <!-- Background Decoration for Dates with Events -->
                <div v-if="date.events.length > 0" class="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"></div>
                
                <div class="flex flex-col h-full relative z-10">
                  <div :class="[
                    textSizes.calendarDate,
                    'mb-1 transition-all duration-300',
                    {
                      'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-md': date.isToday,
                      'text-gray-500 dark:text-gray-500': !date.isCurrentMonth,
                      'text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400': date.isCurrentMonth && !date.isToday
                    }
                  ]">
                    {{ date.day }}
                  </div>
                  
                  <!-- Enhanced Events for this date -->
                  <div class="flex-1 space-y-1 sm:space-y-1.5">
                    <div
                      v-for="event in date.events.slice(0, 2)"
                      :key="event.id"
                      @click.stop="openEvent(event.id)"
                      :class="[
                        textSizes.calendarEvent,
                        'px-2 py-1 rounded-lg truncate cursor-pointer transition-all duration-300 hover:scale-105 transform shadow-sm',
                        getEventBadgeClass(event.type)
                      ]"
                      :title="event.name"
                    >
                      <div class="flex items-center gap-1 sm:gap-1.5">
                        <div class="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-current opacity-60 flex-shrink-0"></div>
                        <span class="truncate">{{ event.name }}</span>
                      </div>
                    </div>
                    
                    <!-- Enhanced More events indicator -->
                    <div v-if="date.events.length > 2" :class="[textSizes.badge, 'text-purple-600 dark:text-purple-400 px-2 py-1 bg-purple-50 dark:bg-purple-900/30 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors duration-300 cursor-pointer']">
                      +{{ date.events.length - 2 }} more
                    </div>
                  </div>
                </div>
                
                <!-- Hover Effect Overlay -->
                <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Event Quick View Modal -->
    <div v-if="showEventModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/70 backdrop-blur-sm" @click.self="showEventModal = false">
      <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <!-- Modal Header with Gradient -->
        <div class="px-6 py-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 relative overflow-hidden">
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-20">
            <div class="w-full h-full" style="background-image: radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.3) 1px, transparent 0); background-size: 16px 16px;"></div>
          </div>
          
          <div class="flex items-center justify-between relative z-10">
            <h3 :class="[textSizes.modalTitle, 'bg-gradient-to-r from-navy-700 to-purple-700 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent']">Event Details</h3>
            <button @click="showEventModal = false" class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700 rounded-full transition-all duration-300 hover:rotate-90 transform">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Modal Body -->
        <div class="p-6 bg-white dark:bg-gray-800" v-if="selectedEvent">
          <div class="space-y-5">
            <div class="group">
              <label :class="[textSizes.modalLabel, 'text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 block']">Title</label>
              <p :class="[textSizes.modalContent, 'font-semibold text-gray-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors duration-300']">{{ selectedEvent.name }}</p>
            </div>
            
            <div class="group">
              <label :class="[textSizes.modalLabel, 'text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 block']">Date & Time</label>
              <div class="flex items-center gap-2">
                <div class="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-lg">
                  <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <p :class="[textSizes.modalContent, 'font-medium text-gray-900 dark:text-gray-100']">{{ formatEventDateTime(selectedEvent) }}</p>
              </div>
            </div>
            
            <div class="group">
              <label :class="[textSizes.modalLabel, 'text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 block']">Type</label>
              <div class="flex items-center gap-2">
                <span :class="[textSizes.badge, 'inline-flex items-center px-3 py-1.5 rounded-full shadow-sm', getEventBadgeClass(selectedEvent.type)]">
                  <div :class="['w-2 h-2 rounded-full mr-2', getEventTypeColor(selectedEvent.type)]"></div>
                  {{ selectedEvent.type || 'General' }}
                </span>
              </div>
            </div>
            
            <div v-if="selectedEvent.description" class="group">
              <label :class="[textSizes.modalLabel, 'text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 block']">Description</label>
              <p :class="[textSizes.modalContent, 'text-gray-900 dark:text-gray-100 leading-relaxed bg-white dark:bg-gray-700/50 p-3 rounded-lg']">{{ selectedEvent.description }}</p>
            </div>
          </div>

                     <!-- Enhanced Modal Actions -->
          <div class="flex flex-row gap-3 justify-end pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
             <button 
               @click="showEventModal = false"
              :class="[textSizes.button, 'h-10 w-24 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2']"
             >
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
               </svg>
               Close
             </button>
             <button 
               @click="editEvent(selectedEvent.id)"
               :class="[textSizes.button, 'h-10 w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2']"
             >
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
               </svg>
               Edit
             </button>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import api from '@/utils/axios'
import CompactDatePicker from '@/components/CompactDatePicker.vue'
import { textSizes } from '@/utils/textSizes'

const router = useRouter()
const toast = useToast()

// Helper functions for date operations
const isValidDate = (date) => date instanceof Date && !isNaN(date.getTime())
const getSafeDate = (date) => isValidDate(date) ? date : new Date()
const formatDateString = (date) => {
  const safeDate = getSafeDate(date)
  try {
    return safeDate.toISOString().slice(0, 10)
  } catch {
    return new Date().toISOString().slice(0, 10)
  }
}

// Reactive data
const events = ref([])
const currentDate = ref(new Date())
const selectedDate = ref(new Date())
const selectedDateInput = ref('')
const loading = ref(false)
const showEventModal = ref(false)
const selectedEvent = ref(null)

// Week days for calendar header
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Event types configuration
const eventTypes = ref([
  { value: 'birthday', label: 'Birthday', colorClass: 'bg-pink-500' },
  { value: 'reminder', label: 'Reminder', colorClass: 'bg-yellow-500' },
  { value: 'holiday', label: 'Holiday', colorClass: 'bg-green-500' },
  { value: 'meeting', label: 'Meeting', colorClass: 'bg-blue-500' },
  { value: 'exam', label: 'Exam', colorClass: 'bg-red-500' },
  { value: 'general', label: 'General', colorClass: 'bg-purple-500' }
])

// Computed properties
const monthYearLabel = computed(() => {
  return currentDate.value.toLocaleString('default', { 
    month: 'long', 
    year: 'numeric' 
  })
})

const todaysEvents = computed(() => {
  const today = formatDateString(new Date())
  return events.value.filter(event => event.date === today)
})

const calendarDates = computed(() => {
  const dates = []
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  // Get first day of month and calculate starting date
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  // Generate 42 days (6 weeks)
  const todayStr = formatDateString(new Date())
  const selectedStr = formatDateString(selectedDate.value)
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    if (!isValidDate(date)) continue
    
    const dateString = formatDateString(date)
    const isCurrentMonth = date.getMonth() === month
    const isToday = dateString === todayStr
    const isSelected = dateString === selectedStr
    
    dates.push({
      date,
      dateString,
      day: date.getDate(),
      isCurrentMonth,
      isToday,
      isSelected,
      events: getEventsForDate(dateString)
    })
  }
  
  return dates
})

// Methods
const fetchEvents = async () => {
  try {
    loading.value = true
    console.log('Fetching events for calendar...')
    
    const response = await api.get('/events')
    console.log('Events API Response:', response.data)
    
    if (Array.isArray(response.data)) {
      events.value = response.data.map(formatEventData)
    } else if (Array.isArray(response.data.data)) {
      events.value = response.data.data.map(formatEventData)
    } else if (Array.isArray(response.data.events)) {
      events.value = response.data.events.map(formatEventData)
    } else if (response.data.success && Array.isArray(response.data.result)) {
      events.value = response.data.result.map(formatEventData)
    } else if (response.data.status && Array.isArray(response.data.result)) {
      events.value = response.data.result.map(formatEventData)
    } else {
      events.value = []
    }
    
    console.log('Calendar events loaded:', events.value.length)
  } catch (error) {
    console.error('Error fetching events:', error)
    toast.error('Failed to fetch events')
    events.value = []
  } finally {
    loading.value = false
  }
}

const formatEventData = (event) => {
  const dateStr = event.start_date ? event.start_date.split('T')[0] : ''
  return {
    id: event.id,
    name: event.title || event.name || 'Untitled Event',
    type: event.type || 'general',
    date: dateStr,
    startDate: event.start_date || null,
    endDate: event.end_date || null,
    description: event.description || '',
    color: event.color || null,
    location: event.location || ''
  }
}

const getEventsForDate = (dateString) => {
  return events.value.filter(event => event.date === dateString)
}

const getEventCountByType = (type) => {
  return events.value.filter(event => event.type === type).length
}

const getTotalEventsForMonth = () => {
  const date = getSafeDate(currentDate.value)
  const currentYear = date.getFullYear()
  const currentMonth = date.getMonth()
  
  return events.value.filter(event => {
    if (!event.date) return false
    const eventDate = new Date(event.date)
    return isValidDate(eventDate) && eventDate.getFullYear() === currentYear && eventDate.getMonth() === currentMonth
  }).length
}

const getEventTypeColor = (type) => {
  const eventType = eventTypes.value.find(t => t.value === type)
  return eventType ? eventType.colorClass : 'bg-purple-500'
}

const getEventBadgeClass = (type) => {
  const classes = {
    birthday: 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300',
    reminder: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
    holiday: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    meeting: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
    exam: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
    general: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
  }
  return classes[type] || classes.general
}

const formatEventTime = (event) => {
  if (!event.startDate) return 'All day'
  
  const start = new Date(event.startDate)
  if (!isValidDate(start)) return 'Invalid time'
  
  const startTime = start.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
  
  if (event.endDate) {
    const end = new Date(event.endDate)
    if (isValidDate(end) && end.toDateString() === start.toDateString()) {
    const endTime = end.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
    return `${startTime} - ${endTime}`
    }
  }
  
  return startTime
}

const formatEventDateTime = (event) => {
  if (!event.startDate) return 'No date specified'
  
  const start = new Date(event.startDate)
  if (!isValidDate(start)) return 'Invalid date'
  
  const startStr = start.toLocaleString('en-US', { 
    month: 'short',
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit' 
  })
  
  if (event.endDate) {
    const end = new Date(event.endDate)
    if (isValidDate(end)) {
    const endStr = end.toLocaleString('en-US', { 
      month: 'short',
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    })
    return `${startStr} - ${endStr}`
    }
  }
  
  return startStr
}

const changeMonth = (direction) => {
  const date = getSafeDate(currentDate.value)
  const newDate = new Date(date)
  newDate.setMonth(date.getMonth() + direction)
  if (isValidDate(newDate)) {
  currentDate.value = newDate
}
}

const prevMonth = () => changeMonth(-1)
const nextMonth = () => changeMonth(1)

const onDateClick = (dateObj) => {
  if (!isValidDate(dateObj.date)) return
  
  selectedDate.value = dateObj.date
  selectedDateInput.value = dateObj.dateString
  
  // If there are events on this date, could show them or navigate to create
  if (dateObj.events.length === 0) {
    router.push({ 
      path: '/events/create', 
      query: { date: dateObj.dateString } 
    })
  }
}

const onDateSelect = () => {
  if (selectedDateInput.value) {
    const date = new Date(selectedDateInput.value)
    if (isValidDate(date)) {
    selectedDate.value = date
    currentDate.value = new Date(date.getFullYear(), date.getMonth(), 1)
    }
  }
}

const quickAddEvent = () => {
  const dateStr = formatDateString(selectedDate.value)
  router.push({ 
    path: '/events/create', 
    query: { date: dateStr } 
  })
}

const openEvent = async (eventId) => {
  const event = events.value.find(e => e.id === eventId)
  if (event) {
    selectedEvent.value = event
    showEventModal.value = true
  } else {
    // If event not found in current list, try to fetch it
    editEvent(eventId)
  }
}

const editEvent = (eventId) => {
  router.push(`/events/edit/${eventId}`)
}

// Initialize
onMounted(async () => {
  // Set initial selected date input
  selectedDateInput.value = formatDateString(selectedDate.value)
  
  // Fetch events
  await fetchEvents()
})

// Watch for current date changes
watch(currentDate, () => {
  // Could refetch events for the new month if needed
}, { deep: true })
</script>

<style scoped>
/* Dark mode support for event badges */
.dark .bg-pink-100 {
  background-color: rgba(251, 113, 133, 0.2);
}
.dark .text-pink-800 {
  color: #f472b6;
}
.dark .bg-yellow-100 {
  background-color: rgba(234, 179, 8, 0.2);
}
.dark .text-yellow-800 {
  color: #fbbf24;
}
.dark .bg-green-100 {
  background-color: rgba(34, 197, 94, 0.2);
}
.dark .text-green-800 {
  color: #4ade80;
}
.dark .bg-blue-100 {
  background-color: rgba(59, 130, 246, 0.2);
}
.dark .text-blue-800 {
  color: #60a5fa;
}
.dark .bg-red-100 {
  background-color: rgba(239, 68, 68, 0.2);
}
.dark .text-red-800 {
  color: #f87171;
}
.dark .bg-purple-100 {
  background-color: rgba(168, 85, 247, 0.2);
}
.dark .text-purple-800 {
  color: #a78bfa;
}
</style> 
