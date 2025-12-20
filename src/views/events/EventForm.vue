<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
    <!-- Top Bar Header -->
    <div class="w-full max-w-7xl mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
      <h2 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        {{ isEdit ? 'Edit Event' : 'Create New Event' }}
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200" @click="$router.push('/dashboard')">Dashboard</span>
        <span class="mx-2">|</span>
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200" @click="$router.push('/events')">Events</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">{{ isEdit ? 'Edit Event' : 'Create Event' }}</span>
      </nav>
      </div>

    <!-- Form Title Section -->
    <div class="w-full">
      <div class="flex flex-col items-center text-center">
        <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4M7 7h10l1 10H6L7 7z"/>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ isEdit ? 'Update Event Details' : 'Create New Event' }}</h3>
        <p class="w-full">{{ isEdit ? 'Modify your event information and settings below.' : 'Fill in the details below to create a new event for your calendar.' }}</p>
            </div>
    </div>

    <!-- Main Form Container -->
    <div class="w-full">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <form @submit.prevent="handleSubmit" class="p-6 sm:p-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <!-- Left Column - Main Event Details -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Event Information Section -->
              <div class="border-b border-gray-200 pb-6">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V11a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900">Event Information</h4>
                </div>

                <div class="space-y-4">
                  <div class="flex flex-col w-full">
                    <label class="mb-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">Event Title *</label>
                    <div class="relative">
                      <input 
                v-model="form.title" 
                        type="text" 
                placeholder="Enter event title"
                        required
                        class="h-12 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
                      />
                      <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                    </div>
                  </div>

                  <div class="flex flex-col w-full">
                    <label class="mb-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">Description</label>
                    <div class="relative">
                      <textarea 
            v-model="form.description"
            placeholder="Enter event description"
                        rows="4"
                        class="border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full resize-none"
                      ></textarea>
                      <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
                  </div>
                </div>
              </div>

              <!-- Date & Time Section -->
              <div class="border-b border-gray-200 pb-6">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4M7 7h10l1 10H6L7 7z"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900">Date & Time</h4>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="flex flex-col w-full">
                    <label class="mb-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">Start Date & Time *</label>
                    <div class="relative">
                      <input 
                v-model="form.start_date"
                        type="datetime-local"
                        required
                        class="h-12 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
                      />
                      <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                    </div>
                  </div>

                  <div class="flex flex-col w-full">
                    <label class="mb-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">End Date & Time *</label>
                    <div class="relative">
                      <input 
                v-model="form.end_date"
                        type="datetime-local"
                        required
                        class="h-12 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
                      />
                      <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
            </div>
              </div>

              <!-- Location Section -->
              <div>
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900">Location & Additional Info</h4>
                </div>

                <div class="space-y-4">
                  <div class="flex flex-col w-full">
                    <label class="mb-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">Location</label>
                    <div class="relative">
                      <input 
                        v-model="form.location"
                        type="text" 
                        placeholder="Enter event location"
                        class="h-12 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
                      />
                      <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column - Event Settings -->
            <div class="space-y-6">
              <!-- Event Type Section -->
              <div class="bg-white rounded-lg p-6">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900">Event Type</h4>
                </div>

                <div class="space-y-4">
                  <div class="flex flex-col w-full">
                    <label class="mb-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">Category *</label>
                    <div class="relative">
                      <select 
                v-model="form.type" 
                        required
                        class="h-12 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8"
                      >
                        <option value="">Select event type</option>
                        <option value="birthday">🎂 Birthday</option>
                        <option value="reminder">⏰ Reminder</option>
                        <option value="holiday">🎉 Holiday</option>
                        <option value="meeting">🤝 Meeting</option>
                        <option value="exam">📝 Exam</option>
                        <option value="general">📅 General</option>
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
                    <label class="mb-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">Priority</label>
                    <div class="relative">
                      <select 
                        v-model="form.priority"
                        class="h-12 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8"
                      >
                        <option value="low">🟢 Low Priority</option>
                        <option value="medium">🟡 Medium Priority</option>
                        <option value="high">🔴 High Priority</option>
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
              </div>

              <!-- Reminder Settings -->
              <div class="bg-blue-50 rounded-lg p-6">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.828 7l2.828 2.828M3 10h8m-8 4h8m-4 4h8m-4-8H3m18 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900">Reminder</h4>
                </div>

                <div class="flex flex-col w-full">
                  <label class="mb-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">Notification</label>
                  <div class="relative">
                    <select 
                v-model="form.reminder" 
                      class="h-12 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8"
                    >
                      <option value="none">No Reminder</option>
                      <option value="5m">5 minutes before</option>
                      <option value="15m">15 minutes before</option>
                      <option value="30m">30 minutes before</option>
                      <option value="1h">1 hour before</option>
                      <option value="1d">1 day before</option>
                      <option value="1w">1 week before</option>
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

              <!-- Color Selection -->
              <div class="bg-purple-50 rounded-lg p-6">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V9a4 4 0 00-4-4z"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900">Event Color</h4>
                </div>

                <div class="grid grid-cols-5 gap-3">
                  <button
                    v-for="color in colorOptions"
                    :key="color"
                    type="button"
                    @click="form.color = color"
                    :class="[
                      'w-10 h-10 rounded-full border-2 transition-all duration-200',
                      form.color === color ? 'border-gray-800 scale-110' : 'border-gray-200 hover:scale-105'
                    ]"
                    :style="{ backgroundColor: color }"
                  ></button>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex flex-row gap-3 justify-end pt-8 border-t border-gray-200 mt-8">
            <button 
              type="button"
              @click="$router.push('/events')"
              class="h-10 w-24 rounded-full border-2 border-navy-300 text-sm font-bold text-gray-600 bg-white hover:bg-navy-50 hover:border-navy-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              Cancel
            </button>
            
            <button 
              v-if="isEdit"
              type="button"
              @click="deleteEvent"
              :disabled="loading"
              class="h-10 w-24 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-sm font-bold text-white shadow hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="loading" class="flex items-center gap-2">
                <div class="w-4 h-4 border-2 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                Deleting...
              </span>
              <span v-else class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Delete
              </span>
            </button>
            
            <button 
              type="submit"
              :disabled="loading"
              class="h-10 w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="loading" class="flex items-center gap-2">
                <div class="w-4 h-4 border-2 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                {{ isEdit ? 'Updating...' : 'Creating...' }}
              </span>
              <span v-else class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                {{ isEdit ? 'Update' : 'Create' }}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const loading = ref(false)
const isEdit = ref(false)

const form = reactive({
  title: '',
  description: '',
  start_date: '',
  end_date: '',
  location: '',
  type: 'general',
  priority: 'medium',
  color: '#8b5cf6',
  reminder: 'none'
})

const colorOptions = [
  '#8b5cf6', // Purple
  '#3b82f6', // Blue
  '#10b981', // Green
  '#f59e0b', // Yellow
  '#ef4444', // Red
  '#ec4899', // Pink
  '#6366f1', // Indigo
  '#84cc16', // Lime
  '#f97316', // Orange
  '#64748b'  // Slate
]

const formatDateForInput = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

const validateForm = () => {
  if (!form.title.trim()) {
    toast.error('Event title is required')
    return false
  }
  
  if (!form.start_date) {
    toast.error('Start date is required')
    return false
  }
  
  if (!form.end_date) {
    toast.error('End date is required')
    return false
  }
  
  if (new Date(form.start_date) >= new Date(form.end_date)) {
    toast.error('End date must be after start date')
    return false
  }
  
  if (!form.type) {
    toast.error('Event type is required')
    return false
  }
  
  return true
}

const handleSubmit = async () => {
  if (!validateForm()) return

      loading.value = true
  
  try {
    const eventData = {
      title: form.title,
      description: form.description,
      start_date: form.start_date,
      end_date: form.end_date,
      location: form.location,
      type: form.type,
      priority: form.priority,
      color: form.color,
      reminder: form.reminder
    }
    
    let response
        if (isEdit.value) {
      response = await axios.post(`${import.meta.env.VITE_API_URL}/events/update/${route.params.id}`, eventData)
        } else {
      response = await axios.post(`${import.meta.env.VITE_API_URL}/events/store`, eventData)
        }
    
    if (response.data.success || response.data.status) {
      toast.success(isEdit.value ? 'Event updated successfully!' : 'Event created successfully!')
        router.push('/events')
    } else {
      toast.error(response.data.message || 'Operation failed')
    }
      } catch (error) {
    console.error('Error submitting form:', error)
    toast.error(error.response?.data?.message || 'An error occurred while saving the event')
      } finally {
        loading.value = false
      }
    }

const deleteEvent = async () => {
  if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) return
  
  loading.value = true
  
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/events/delete/${route.params.id}`)
    
    if (response.data.success || response.data.status) {
      toast.success('Event deleted successfully!')
      router.push('/events')
    } else {
      toast.error(response.data.message || 'Failed to delete event')
    }
  } catch (error) {
    console.error('Error deleting event:', error)
    toast.error(error.response?.data?.message || 'Failed to delete event')
  } finally {
    loading.value = false
  }
}

const loadEventData = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/events/${route.params.id}`)
    
    if (response.data.success || response.data.status) {
      const eventData = response.data.data || response.data.result
      
      form.title = eventData.title || ''
      form.description = eventData.description || ''
      form.start_date = formatDateForInput(eventData.start_date)
      form.end_date = formatDateForInput(eventData.end_date)
      form.location = eventData.location || ''
      form.type = eventData.type || 'general'
      form.priority = eventData.priority || 'medium'
      form.color = eventData.color || '#8b5cf6'
      form.reminder = eventData.reminder || 'none'
    } else {
      toast.error('Failed to load event details')
      router.push('/events')
    }
  } catch (error) {
    console.error('Error loading event:', error)
    toast.error('Failed to load event details')
    router.push('/events')
  }
}

onMounted(async () => {
  if (route.params.id) {
    isEdit.value = true
    await loadEventData()
  } else if (route.query.date) {
    // Pre-fill date if coming from calendar
    const queryDate = new Date(route.query.date)
    form.start_date = formatDateForInput(queryDate)
    
    // Set end date to 1 hour later
    const endDate = new Date(queryDate)
    endDate.setHours(endDate.getHours() + 1)
    form.end_date = formatDateForInput(endDate)
  } else {
    // Set default times for new events
    const now = new Date()
    form.start_date = formatDateForInput(now)
    
    const oneHourLater = new Date(now)
    oneHourLater.setHours(oneHourLater.getHours() + 1)
    form.end_date = formatDateForInput(oneHourLater)
  }
})
</script>

<style scoped>
/* Professional ERP styling - exact match to ClassSubjects and EventList */
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
select:focus,
textarea:focus {
  outline: 2px solid #a855f7;
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

/* Form input styling */
input[type="text"],
input[type="datetime-local"],
select,
textarea {
  border: none;
  border-bottom: 2px solid #e9d5ff;
  background: transparent;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="datetime-local"]:focus,
select:focus,
textarea:focus {
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
  .lg\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* Loading spinner animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes pulse {
  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Color picker grid styling */
button[type="button"] {
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button[type="button"]:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Section backgrounds */
.bg-white {
  background-color: #f8fafc;
}

.bg-blue-50 {
  background-color: #f1f5f9;
}

.bg-purple-50 {
  background-color: #f1f5f9;
}

/* Icon container colors */
.bg-purple-100 {
  background-color: #f1f5f9;
}

.text-purple-600 {
  color: #8b5cf6;
}

.bg-blue-100 {
  background-color: #f1f5f9;
}

.text-blue-600 {
  color: #3b82f6;
}

.bg-green-100 {
  background-color: #f1f5f9;
}

.text-green-600 {
  color: #10b981;
}

.bg-indigo-100 {
  background-color: #f1f5f9;
}

.text-indigo-600 {
  color: #8b5cf6;
}

.bg-yellow-100 {
  background-color: #f1f5f9;
}

.text-yellow-600 {
  color: #f59e0b;
}

.bg-pink-100 {
  background-color: #f1f5f9;
}

.text-pink-600 {
  color: var(--accent-secondary);
}

/* Form validation styling */
.border-red-300 {
  border-color: #ef4444;
}

.text-red-500 {
  color: #ef4444;
}

/* Disabled state styling */
.disabled\:opacity-50:disabled {
  opacity: 0.5;
}

.disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

/* Professional form spacing */
.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-6 > * + * {
  margin-top: 1.5rem;
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

.gap-8 {
  gap: 2rem;
}

/* Border styles */
.border-gray-200 {
  border-color: #e2e8f0;
}

.border-b {
  border-bottom-width: 1px;
}

.border-t {
  border-top-width: 1px;
}
</style> 