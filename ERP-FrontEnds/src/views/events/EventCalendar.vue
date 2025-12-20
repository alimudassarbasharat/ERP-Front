<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
    <!-- Background Decorative Elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-indigo-400/15 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      </div>

    <!-- Top Bar Header with Enhanced Design -->
    <div class="w-full max-w-7xl mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
      <h2 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        Event Calendar
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Dashboard</span>
        <span class="mx-2">|</span>
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Events</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">Calendar</span>
      </nav>
    </div>

    <!-- Enhanced Calendar Controls -->
    <div class="w-full">
      <div class="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-5 flex items-center justify-between border border-gray-200/20 relative overflow-hidden">
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
            <h3 class="text-2xl font-bold bg-gradient-to-r from-navy-700 to-purple-700 bg-clip-text text-transparent min-w-[250px] tracking-tight">
              {{ monthYearLabel }}
            </h3>
            <p class="text-xs text-gray-500 mt-1 font-medium">{{ getTotalEventsForMonth() }} events this month</p>
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
            <span class="text-xs font-medium text-gray-600">Live View</span>
      </div>
          
          <button 
            @click="$router.push('/events')"
            class="group px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <svg class="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
            </svg>
            List View
          </button>
          
          <button 
            @click="quickAddEvent"
            class="group px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center gap-2"
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
    <div class="w-full">
      
      <!-- Enhanced Sidebar -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Mini Calendar with Enhanced Design -->
        <div class="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-200/20">
          <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-5 border-b border-gray-200">
            <h4 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-3">
              <div class="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4M7 7h10l1 10H6L7 7z"/>
                </svg>
      </div>
              <span class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Quick Navigation</span>
            </h4>
            <input 
              v-model="selectedDateInput"
              type="date"
              @change="onDateSelect"
              class="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
            />
      </div>
        </div>

        <!-- Enhanced Event Types Legend -->
        <div class="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-200/20">
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 border-b border-gray-200">
            <h4 class="text-sm font-bold text-gray-900 mb-4 flex items-center gap-3">
              <div class="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-lg">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                </svg>
              </div>
              <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Event Types</span>
            </h4>
            <div class="space-y-3">
              <div v-for="type in eventTypes" :key="type.value" class="group flex items-center gap-4 p-2 rounded-lg hover:bg-white/60 transition-all duration-300 cursor-pointer">
                <div :class="['w-4 h-4 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300', type.colorClass]"></div>
                <span class="text-sm font-medium text-gray-900 group-hover:text-gray-900 transition-colors duration-300">{{ type.label }}</span>
                <div class="ml-auto">
                  <span class="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded-full min-w-[24px] text-center">{{ getEventCountByType(type.value) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Today's Events -->
        <div class="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-200/20">
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-5 border-b border-gray-200">
            <h4 class="text-sm font-bold text-gray-900 mb-4 flex items-center gap-3">
              <div class="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg shadow-lg">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                class="group p-3 rounded-lg bg-white/60 hover:bg-white/80 cursor-pointer transition-all duration-300 border border-gray-200 hover:border-purple-200 hover:shadow-lg transform hover:scale-105"
              >
                <div class="flex items-center gap-3 mb-2">
                  <div :class="['w-3 h-3 rounded-full shadow-lg', getEventTypeColor(event.type)]"></div>
                  <span class="text-sm font-semibold text-gray-900 truncate group-hover:text-purple-700 transition-colors duration-300">{{ event.name }}</span>
                </div>
                <div class="text-xs text-gray-500 font-medium pl-6">{{ formatEventTime(event) }}</div>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <div class="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3a4 4 0 118 0v4M7 7h10l1 10H6L7 7z"/>
                </svg>
              </div>
              <p class="text-sm text-gray-500 font-medium">No events today</p>
              <p class="text-xs text-gray-500 mt-1">Your calendar is clear!</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Calendar Grid -->
      <div class="lg:col-span-3">
        <div class="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-200/20">
          <!-- Enhanced Calendar Header -->
          <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-10">
              <div class="w-full h-full" style="background-image: radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.4) 1px, transparent 0); background-size: 24px 24px;"></div>
            </div>
            
            <div class="grid grid-cols-7 gap-2 relative z-10">
              <div v-for="day in weekDays" :key="day" class="text-center text-sm font-bold text-gray-600 py-3 relative">
                <span class="relative z-10">{{ day }}</span>
                <div class="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-pink-100/50 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          <!-- Enhanced Calendar Body -->
          <div class="p-6">
            <div class="grid grid-cols-7 gap-3 min-h-[600px]">
              <div
                v-for="date in calendarDates"
                :key="date.dateString"
                @click="onDateClick(date)"
                :class="[
                  'group min-h-[100px] p-3 border border-gray-200 rounded-xl cursor-pointer transition-all duration-300 hover:border-purple-200 hover:shadow-lg transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden',
                  {
                    'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-md': date.isToday,
                    'text-gray-500 opacity-60': !date.isCurrentMonth,
                    'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-md': date.isSelected && date.isCurrentMonth,
                    'bg-white hover:bg-gradient-to-br hover:from-purple-25 hover:to-pink-25': date.isCurrentMonth && !date.isToday && !date.isSelected
                  }
                ]"
              >
                <!-- Background Decoration for Dates with Events -->
                <div v-if="date.events.length > 0" class="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"></div>
                
                <div class="flex flex-col h-full relative z-10">
                  <div :class="[
                    'text-sm font-bold mb-2 transition-all duration-300',
                    {
                      'text-blue-600 bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center shadow-md': date.isToday,
                      'text-gray-500': !date.isCurrentMonth,
                      'text-gray-900 group-hover:text-purple-600': date.isCurrentMonth && !date.isToday
                    }
                  ]">
                    {{ date.day }}
                  </div>
                  
                  <!-- Enhanced Events for this date -->
                  <div class="flex-1 space-y-1.5">
                    <div
                      v-for="event in date.events.slice(0, 2)"
                      :key="event.id"
                      @click.stop="openEvent(event.id)"
                      :class="[
                        'text-xs px-2.5 py-1.5 rounded-lg truncate cursor-pointer transition-all duration-300 hover:scale-105 transform shadow-sm font-medium',
                        getEventBadgeClass(event.type)
                      ]"
                      :title="event.name"
                    >
                      <div class="flex items-center gap-1.5">
                        <div class="w-1.5 h-1.5 rounded-full bg-current opacity-60"></div>
                        <span>{{ event.name }}</span>
                      </div>
                    </div>
                    
                    <!-- Enhanced More events indicator -->
                    <div v-if="date.events.length > 2" class="text-xs text-purple-600 px-2.5 py-1 bg-purple-50 rounded-lg font-semibold hover:bg-purple-100 transition-colors duration-300 cursor-pointer">
                      +{{ date.events.length - 2 }} more events
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

    <!-- Enhanced Event Quick View Modal -->
    <div v-if="showEventModal" class="relative z-10" @click.self="showEventModal = false">
      <div class="w-full">
        <!-- Modal Header with Gradient -->
        <div class="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50 relative overflow-hidden">
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-20">
            <div class="w-full h-full" style="background-image: radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.3) 1px, transparent 0); background-size: 16px 16px;"></div>
          </div>
          
          <div class="flex items-center justify-between relative z-10">
            <h3 class="text-lg font-bold bg-gradient-to-r from-navy-700 to-purple-700 bg-clip-text text-transparent">Event Details</h3>
            <button @click="showEventModal = false" class="p-2 text-gray-500 hover:text-gray-600 hover:bg-white rounded-full transition-all duration-300 hover:rotate-90 transform">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Modal Body -->
        <div class="p-6" v-if="selectedEvent">
          <div class="space-y-5">
            <div class="group">
              <label class="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2 block">Title</label>
              <p class="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">{{ selectedEvent.name }}</p>
            </div>
            
            <div class="group">
              <label class="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2 block">Date & Time</label>
              <div class="flex items-center gap-2">
                <div class="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <p class="text-sm font-medium text-gray-900">{{ formatEventDateTime(selectedEvent) }}</p>
              </div>
            </div>
            
            <div class="group">
              <label class="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2 block">Type</label>
              <div class="flex items-center gap-2">
                <span :class="['inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-sm', getEventBadgeClass(selectedEvent.type)]">
                  <div :class="['w-2 h-2 rounded-full mr-2', getEventTypeColor(selectedEvent.type)]"></div>
                  {{ selectedEvent.type || 'General' }}
                </span>
              </div>
            </div>
            
            <div v-if="selectedEvent.description" class="group">
              <label class="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2 block">Description</label>
              <p class="text-sm text-gray-900 leading-relaxed bg-white p-3 rounded-lg">{{ selectedEvent.description }}</p>
            </div>
          </div>

                     <!-- Enhanced Modal Actions -->
           <div class="flex flex-row gap-3 justify-end pt-6 border-t border-gray-200 mt-6">
             <button 
               @click="showEventModal = false"
               class="h-10 w-24 rounded-full border-2 border-navy-300 text-sm font-bold text-gray-600 bg-white hover:bg-navy-50 hover:border-navy-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
             >
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
               </svg>
               Close
             </button>
             <button 
               @click="editEvent(selectedEvent.id)"
               class="h-10 w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
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
import axios from 'axios'

const router = useRouter()
const toast = useToast()

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
  const today = new Date().toISOString().slice(0, 10)
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
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    const dateString = date.toISOString().slice(0, 10)
    const isCurrentMonth = date.getMonth() === month
    const isToday = dateString === new Date().toISOString().slice(0, 10)
    const isSelected = dateString === selectedDate.value.toISOString().slice(0, 10)
    
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
    
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/events`)
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
  return {
    id: event.id,
    name: event.title || event.name,
    type: event.type || 'general',
    date: event.start_date ? event.start_date.split('T')[0] : '',
    startDate: event.start_date,
    endDate: event.end_date,
    description: event.description,
    color: event.color,
    location: event.location
  }
}

const getEventsForDate = (dateString) => {
  return events.value.filter(event => event.date === dateString)
}

const getEventCountByType = (type) => {
  return events.value.filter(event => event.type === type).length
}

const getTotalEventsForMonth = () => {
  const currentYear = currentDate.value.getFullYear()
  const currentMonth = currentDate.value.getMonth()
  
  return events.value.filter(event => {
    if (!event.date) return false
    const eventDate = new Date(event.date)
    return eventDate.getFullYear() === currentYear && eventDate.getMonth() === currentMonth
  }).length
}

const getEventTypeColor = (type) => {
  const eventType = eventTypes.value.find(t => t.value === type)
  return eventType ? eventType.colorClass : 'bg-purple-500'
}

const getEventBadgeClass = (type) => {
  const classes = {
    birthday: 'bg-pink-100 text-pink-800',
    reminder: 'bg-yellow-100 text-yellow-800',
    holiday: 'bg-green-100 text-green-800',
    meeting: 'bg-blue-100 text-blue-800',
    exam: 'bg-red-100 text-red-800',
    general: 'bg-purple-100 text-purple-800'
  }
  return classes[type] || 'bg-purple-100 text-purple-800'
}

const formatEventTime = (event) => {
  if (!event.startDate) return 'All day'
  
  const start = new Date(event.startDate)
  const end = event.endDate ? new Date(event.endDate) : null
  
  const startTime = start.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
  
  if (end && end.toDateString() === start.toDateString()) {
    const endTime = end.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
    return `${startTime} - ${endTime}`
  }
  
  return startTime
}

const formatEventDateTime = (event) => {
  if (!event.startDate) return 'No date specified'
  
  const start = new Date(event.startDate)
  const end = event.endDate ? new Date(event.endDate) : null
  
  const startStr = start.toLocaleString('en-US', { 
    month: 'short',
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit' 
  })
  
  if (end) {
    const endStr = end.toLocaleString('en-US', { 
      month: 'short',
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    })
    return `${startStr} - ${endStr}`
  }
  
  return startStr
}

const prevMonth = () => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() - 1)
  currentDate.value = newDate
}

const nextMonth = () => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  currentDate.value = newDate
}

const onDateClick = (dateObj) => {
  selectedDate.value = dateObj.date
  selectedDateInput.value = dateObj.dateString
  
  // If there are events on this date, could show them or navigate to create
  if (dateObj.events.length === 0) {
    // Navigate to create event for this date
    router.push({ 
      path: '/events/create', 
      query: { date: dateObj.dateString } 
    })
  }
}

const onDateSelect = () => {
  if (selectedDateInput.value) {
    const date = new Date(selectedDateInput.value)
    selectedDate.value = date
    currentDate.value = new Date(date.getFullYear(), date.getMonth(), 1)
  }
}

const quickAddEvent = () => {
  const dateStr = selectedDate.value.toISOString().slice(0, 10)
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
  selectedDateInput.value = selectedDate.value.toISOString().slice(0, 10)
  
  // Fetch events
  await fetchEvents()
})

// Watch for current date changes
watch(currentDate, () => {
  // Could refetch events for the new month if needed
}, { deep: true })
</script>

<style scoped>
/* Professional ERP styling - exact match to other event pages */
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

.text-gray-600 {
  color: #64748b;
}

.text-gray-900 {
  color: #1e293b;
}

.text-gray-900 {
  color: #1e293b;
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

.text-navy-300 {
  color: #94a3b8;
}

.border-navy-300 {
  border-color: #94a3b8;
}

.border-navy-400 {
  border-color: #94a3b8;
}

.bg-navy-50 {
  background-color: #f8fafc;
}

.hover\:bg-navy-50:hover {
  background-color: #f8fafc;
}

.hover\:border-navy-400:hover {
  border-color: #94a3b8;
}

.hover\:text-gray-900:hover {
  color: #1e293b;
}

/* Gradient backgrounds */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
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

.from-indigo-50 {
  --tw-gradient-from: #eef2ff;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(238, 242, 255, 0));
}

.to-purple-50 {
  --tw-gradient-to: #faf5ff;
}

/* Color variants for gradient buttons */
.from-purple-500 {
  --tw-gradient-from: #8b5cf6;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(139, 92, 246, 0));
}

.to-pink-500 {
  --tw-gradient-to: #ec4899;
}

.from-blue-500 {
  --tw-gradient-from: #3b82f6;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(59, 130, 246, 0));
}

.to-indigo-500 {
  --tw-gradient-to: #6366f1;
}

.from-green-500 {
  --tw-gradient-from: #10b981;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(16, 185, 129, 0));
}

.to-emerald-500 {
  --tw-gradient-to: #10b981;
}

.from-gray-500 {
  --tw-gradient-from: #94a3b8;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(107, 114, 128, 0));
}

.to-slate-500 {
  --tw-gradient-to: #64748b;
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
  outline: 2px solid #8b5cf6;
  outline-offset: 2px;
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

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
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

.rounded-md {
  border-radius: 0.375rem;
}

/* Calendar specific styling */
.min-h-\[80px\] {
  min-height: 80px;
}

.min-h-\[500px\] {
  min-height: 500px;
}

.min-w-\[200px\] {
  min-width: 200px;
}

/* Grid layouts */
.grid-cols-7 {
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 1024px) {
  .lg\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  
  .lg\:col-span-1 {
    grid-column: span 1 / span 1;
  }
  
  .lg\:col-span-3 {
    grid-column: span 3 / span 3;
  }
}

/* Gaps */
.gap-1 {
  gap: 0.25rem;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-3 {
  gap: 0.75rem;
}

.gap-4 {
  gap: 1rem;
}

.gap-6 {
  gap: 1.5rem;
}

/* Spacing */
.space-y-1 > * + * {
  margin-top: 0.25rem;
}

.space-y-2 > * + * {
  margin-top: 0.5rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

/* Background colors */
.bg-white {
  background-color: #f8fafc;
}

.bg-white {
  background-color: #94a3b8;
}

.bg-blue-50 {
  background-color: #f1f5f9;
}

.bg-purple-50 {
  background-color: #f1f5f9;
}

.bg-white {
  background-color: #ffffff;
}

/* Text colors */
.text-gray-500 {
  color: #94a3b8;
}

.text-gray-500 {
  color: #94a3b8;
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

.text-blue-600 {
  color: #3b82f6;
}

.text-purple-600 {
  color: #8b5cf6;
}

.text-green-600 {
  color: #10b981;
}

.text-white {
  color: #ffffff;
}

/* Border colors */
.border-gray-200 {
  border-color: #94a3b8;
}

.border-gray-200 {
  border-color: #e2e8f0;
}

.border-gray-200 {
  border-color: #94a3b8;
}

.border-blue-200 {
  border-color: var(--border-accent);
}

.border-purple-200 {
  border-color: var(--border-accent);
}

/* Border styles */
.border {
  border-width: 1px;
}

.border-b {
  border-bottom-width: 1px;
}

/* Event badge styling */
.bg-pink-100 { background-color: #f1f5f9; }
.text-pink-800 { color: var(--accent-secondary); }
.bg-yellow-100 { background-color: #f1f5f9; }
.text-yellow-800 { color: #f59e0b; }
.bg-green-100 { background-color: #f1f5f9; }
.text-green-800 { color: #10b981; }
.bg-blue-100 { background-color: #f1f5f9; }
.text-blue-800 { color: #3b82f6; }
.bg-red-100 { background-color: #f1f5f9; }
.text-red-800 { color: #ef4444; }
.bg-purple-100 { background-color: #f1f5f9; }
.text-purple-800 { color: #8b5cf6; }

/* Event type colors */
.bg-pink-500 { background-color: var(--accent-secondary); }
.bg-yellow-500 { background-color: #f59e0b; }
.bg-green-500 { background-color: #10b981; }
.bg-blue-500 { background-color: #3b82f6; }
.bg-red-500 { background-color: #ef4444; }
.bg-purple-500 { background-color: #8b5cf6; }

/* Calendar date cell styling */
.hover\:bg-white:hover {
  background-color: #f8fafc;
}

.hover\:bg-white:hover {
  background-color: #94a3b8;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Text sizing */
.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

/* Font weights */
.font-medium {
  font-weight: 500;
}

.font-semibold {
  font-weight: 600;
}

.font-bold {
  font-weight: 700;
}

/* Flex utilities */
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-center {
  justify-content: center;
}

.flex-col {
  flex-direction: column;
}

.flex-1 {
  flex: 1 1 0%;
}

/* Positioning */
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.fixed {
  position: fixed;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

/* Z-index */
.z-50 {
  z-index: 50;
}

/* Overflow */
.overflow-hidden {
  overflow: hidden;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  #ffffff-space: nowrap;
}

/* Cursor */
.cursor-pointer {
  cursor: pointer;
}

/* Animations */
@keyframes pulse {
  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Focus ring utilities */
.focus\:ring-2:focus {
  box-shadow: 0 0 0 2px #8b5cf6;
}

.focus\:ring-purple-500:focus {
  box-shadow: 0 0 0 2px #8b5cf6;
}

.focus\:border-transparent:focus {
  border-color: transparent;
}

/* Responsive padding/margin */
.p-2 { padding: 0.5rem; }
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }

.px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }

.py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }

.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }

.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }

.ml-auto { margin-left: auto; }

/* Height utilities */
.h-10 { height: 2.5rem; }
.w-2 { width: 0.5rem; }
.h-2 { width: 0.5rem; }
.w-3 { width: 0.75rem; }
.h-3 { height: 0.75rem; }
.w-4 { width: 1rem; }
.h-4 { height: 1rem; }
.w-5 { width: 1.25rem; }
.h-5 { height: 1.25rem; }

/* Text alignment */
.text-center {
  text-align: center;
}

/* Transform utilities */
.transform {
  transform: var(--tw-transform);
}

.scale-105 {
  --tw-scale-x: 1.05;
  --tw-scale-y: 1.05;
  transform: scale(var(--tw-scale-x), var(--tw-scale-y));
}

/* Display utilities */
.hidden {
  display: none;
}

.block {
  display: block;
}

/* Width utilities */
.w-full {
  width: 100%;
}

.max-w-7xl {
  max-width: 80rem;
}

.max-w-md {
  max-width: 28rem;
}

/* Margin utilities */
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

/* Additional responsive utilities for mobile */
@media (max-width: 640px) {
  .sm\:p-6 {
    padding: 1.5rem;
  }
  
  .sm\:p-8 {
    padding: 2rem;
  }
}

@media (max-width: 1024px) {
  .lg\:p-8 {
    padding: 2rem;
  }
}

/* Additional sophisticated animations and effects */

/* Floating animation for background elements */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(1deg); }
  66% { transform: translateY(5px) rotate(-1deg); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Gradient text animation */
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient-text {
  background: linear-gradient(-45deg, #8b5cf6, #ec4899, #3b82f6, #10b981);
  background-size: 400% 400%;
  animation: gradient-shift 3s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Shimmer effect for cards */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.shimmer-effect::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  transform: translateX(-100%);
  animation: shimmer 2s infinite;
}

/* Enhanced hover glow effect */
.glow-on-hover {
  position: relative;
  overflow: hidden;
}

.glow-on-hover::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.glow-on-hover:hover::after {
  opacity: 1;
}

/* Ripple effect for buttons */
.ripple-effect {
  position: relative;
  overflow: hidden;
}

.ripple-effect::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: #ffffff;
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.ripple-effect:active::before {
  width: 300px;
  height: 300px;
}

/* Enhanced backdrop blur */
.backdrop-blur-enhanced {
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}

/* Gradient border animation */
@keyframes border-gradient {
  0%, 100% { border-image: linear-gradient(45deg, #8b5cf6, #ec4899) 1; }
  50% { border-image: linear-gradient(45deg, #ec4899, #3b82f6) 1; }
}

.animated-border {
  border: 2px solid;
  animation: border-gradient 3s ease infinite;
}

/* Staggered fade-in animation for calendar dates */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease forwards;
}

/* Calendar date hover lift effect */
.calendar-date {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.calendar-date:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Event badge hover animation */
.event-badge {
  position: relative;
  transition: all 0.3s ease;
}

.event-badge:hover {
  transform: scale(1.1) rotate(2deg);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
}

.event-badge::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255,255,255,0.3), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: inherit;
}

.event-badge:hover::after {
  opacity: 1;
}

/* Modal entrance animation */
@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-enter {
  animation: modalSlideIn 0.3s ease forwards;
}

/* Sidebar card stagger animation */
.sidebar-card {
  animation: fadeInUp 0.6s ease forwards;
}

.sidebar-card:nth-child(1) { animation-delay: 0.1s; }
.sidebar-card:nth-child(2) { animation-delay: 0.2s; }
.sidebar-card:nth-child(3) { animation-delay: 0.3s; }

/* Enhanced focus states */
input:focus, button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  transform: scale(1.02);
}

/* Loading skeleton animation */
@keyframes skeleton-loading {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: skeleton-loading 1.5s infinite;
}

/* Improved scrollbar styling */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: linear-gradient(90deg, #f1f5f9, #e2e8f0);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(90deg, #8b5cf6, #ec4899);
  border-radius: 10px;
  border: 2px solid transparent;
  background-clip: content-box;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(90deg, #7c3aed, #db2777);
  background-clip: content-box;
}

/* Enhanced text effects */
.text-shadow-sm {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.text-shadow-lg {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Advanced glassmorphism effect */
.glass-morphism {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid #ffffff;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Breathing animation for live indicators */
@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

.animate-breathe {
  animation: breathe 2s ease-in-out infinite;
}

/* Enhanced button states */
.btn-enhanced {
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.btn-enhanced:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn-enhanced:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

/* Responsive animations */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Additional utility classes for enhanced styling */
.text-gradient-purple {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.shadow-inner-soft {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
}

.border-gradient {
  border: 1px solid;
  border-image: linear-gradient(45deg, #8b5cf6, #ec4899) 1;
}
</style> 