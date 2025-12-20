<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
    <!-- Top Bar Header -->
    <div class="w-full max-w-7xl mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
      <h2 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        Notification Settings
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200" @click="$router.push('/dashboard')">Dashboard</span>
        <span class="mx-2">|</span>
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200" @click="$router.push('/settings')">Settings</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">Notifications</span>
      </nav>
    </div>

    <!-- Settings Title Section -->
    <div class="w-full">
      <div class="flex flex-col items-center text-center">
        <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.828 7l2.828 2.828M3 10h8m-8 4h8m-4 4h8m-4-8H3m18 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">Notification Preferences</h3>
        <p class="w-full">Customize how and when you receive notifications from the system.</p>
      </div>
    </div>

    <!-- Main Settings Container -->
    <div class="w-full">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <form @submit.prevent="saveSettings" class="p-6 sm:p-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <!-- Left Column - Communication Channels -->
            <div class="space-y-6">
              <!-- Communication Channels Section -->
              <div class="border-b border-gray-200 pb-6">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900">Communication Channels</h4>
                </div>

                <div class="space-y-5">
                  <!-- Email Notifications -->
                  <div class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                    <div class="flex items-center gap-4">
                      <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                      </div>
                      <div>
                        <h5 class="font-semibold text-gray-900">Email Notifications</h5>
                        <p class="text-xs text-gray-500">Receive notifications via email</p>
                      </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="settings.emailNotifications" type="checkbox" class="sr-only peer" />
                      <div class="w-11 h-6 bg-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <!-- SMS Notifications -->
                  <div class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                    <div class="flex items-center gap-4">
                      <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                        </svg>
                      </div>
                      <div>
                        <h5 class="font-semibold text-gray-900">SMS Notifications</h5>
                        <p class="text-xs text-gray-500">Receive text messages on your phone</p>
                      </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="settings.smsNotifications" type="checkbox" class="sr-only peer" />
                      <div class="w-11 h-6 bg-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  <!-- Push Notifications -->
                  <div class="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                    <div class="flex items-center gap-4">
                      <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.828 7l2.828 2.828M3 10h8m-8 4h8m-4 4h8m-4-8H3m18 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <div>
                        <h5 class="font-semibold text-gray-900">Push Notifications</h5>
                        <p class="text-xs text-gray-500">Instant browser notifications</p>
                      </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="settings.pushNotifications" type="checkbox" class="sr-only peer" />
                      <div class="w-11 h-6 bg-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Frequency Settings -->
              <div>
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900">Notification Frequency</h4>
                </div>

                <div class="space-y-4">
                  <div class="flex flex-col w-full">
                    <label class="mb-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">Email Frequency</label>
                    <div class="relative">
                      <select 
                        v-model="settings.emailFrequency"
                        class="h-12 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8"
                      >
                        <option value="instant">Instant</option>
                        <option value="daily">Daily Digest</option>
                        <option value="weekly">Weekly Summary</option>
                        <option value="monthly">Monthly Report</option>
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
                    <label class="mb-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">Quiet Hours</label>
                    <div class="grid grid-cols-2 gap-4">
                      <div class="relative">
                        <input 
                          v-model="settings.quietHoursStart"
                          type="time"
                          class="h-12 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
                        />
                        <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                      </div>
                      <div class="relative">
                        <input 
                          v-model="settings.quietHoursEnd"
                          type="time"
                          class="h-12 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
                        />
                        <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                      </div>
                    </div>
                    <p class="text-xs text-gray-500 mt-2">No notifications will be sent during these hours</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column - Notification Types -->
            <div class="space-y-6">
              <!-- Notification Types Section -->
              <div class="bg-white rounded-lg p-6">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900">Notification Types</h4>
                </div>

                <div class="space-y-4">
                  <!-- Attendance Alerts -->
                  <div class="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-200 transition-colors duration-300">
                    <div class="flex items-center gap-3">
                      <div class="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                        <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                      </div>
                      <div>
                        <h6 class="font-medium text-gray-900">Attendance Alerts</h6>
                        <p class="text-xs text-gray-500">Student absence notifications</p>
                      </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="settings.attendanceAlerts" type="checkbox" class="sr-only peer" />
                      <div class="w-9 h-5 bg-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  <!-- Fee Due Reminders -->
                  <div class="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-200 transition-colors duration-300">
                    <div class="flex items-center gap-3">
                      <div class="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                        <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      </div>
                      <div>
                        <h6 class="font-medium text-gray-900">Fee Due Reminders</h6>
                        <p class="text-xs text-gray-500">Payment deadline notifications</p>
                      </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="settings.feeReminders" type="checkbox" class="sr-only peer" />
                      <div class="w-9 h-5 bg-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  <!-- Exam Results -->
                  <div class="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-200 transition-colors duration-300">
                    <div class="flex items-center gap-3">
                      <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <div>
                        <h6 class="font-medium text-gray-900">Exam Results</h6>
                        <p class="text-xs text-gray-500">Grade and result announcements</p>
                      </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="settings.examResults" type="checkbox" class="sr-only peer" />
                      <div class="w-9 h-5 bg-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  <!-- Events & Holidays -->
                  <div class="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-200 transition-colors duration-300">
                    <div class="flex items-center gap-3">
                      <div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <div>
                        <h6 class="font-medium text-gray-900">Events & Holidays</h6>
                        <p class="text-xs text-gray-500">School events and holiday announcements</p>
                      </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="settings.eventsAndHolidays" type="checkbox" class="sr-only peer" />
                      <div class="w-9 h-5 bg-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  <!-- Academic Updates -->
                  <div class="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-200 transition-colors duration-300">
                    <div class="flex items-center gap-3">
                      <div class="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                      </div>
                      <div>
                        <h6 class="font-medium text-gray-900">Academic Updates</h6>
                        <p class="text-xs text-gray-500">Curriculum and schedule changes</p>
                      </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="settings.academicUpdates" type="checkbox" class="sr-only peer" />
                      <div class="w-9 h-5 bg-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  <!-- System Maintenance -->
                  <div class="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-200 transition-colors duration-300">
                    <div class="flex items-center gap-3">
                      <div class="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                        <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                      </div>
                      <div>
                        <h6 class="font-medium text-gray-900">System Maintenance</h6>
                        <p class="text-xs text-gray-500">System updates and downtime alerts</p>
                      </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="settings.systemMaintenance" type="checkbox" class="sr-only peer" />
                      <div class="w-9 h-5 bg-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex flex-row gap-3 justify-end pt-8 border-t border-gray-200 mt-8">
            <button 
              type="button"
              @click="resetSettings"
              class="h-10 w-24 rounded-full border-2 border-navy-300 text-sm font-bold text-gray-600 bg-white hover:bg-navy-50 hover:border-navy-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Reset
            </button>
            
            <button 
              type="submit"
              :disabled="loading"
              class="h-10 w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="loading" class="flex items-center gap-2">
                <div class="w-4 h-4 border-2 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </span>
              <span v-else class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.828 7l2.828 2.828M3 10h8m-8 4h8m-4 4h8m-4-8H3m18 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Save
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const toast = useToast()
const loading = ref(false)

const settings = ref({
  emailNotifications: true,
  smsNotifications: false, 
  pushNotifications: true,
  emailFrequency: 'instant',
  quietHoursStart: '22:00',
  quietHoursEnd: '08:00',
  attendanceAlerts: true,
  feeReminders: true,
  examResults: true,
  eventsAndHolidays: true,
  academicUpdates: true,
  systemMaintenance: false
})

const saveSettings = async () => {
  loading.value = true
  
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/settings/notifications`, settings.value)
    
    if (response.data.success || response.data.status) {
      toast.success('Notification preferences saved successfully!')
    } else {
      toast.error(response.data.message || 'Failed to save preferences')
    }
  } catch (error) {
    console.error('Error saving notification settings:', error)
    toast.error(error.response?.data?.message || 'An error occurred while saving preferences')
  } finally {
    loading.value = false
  }
}

const resetSettings = () => {
  if (confirm('Are you sure you want to reset all notification preferences to default values?')) {
  settings.value = {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
      emailFrequency: 'instant',
      quietHoursStart: '22:00',
      quietHoursEnd: '08:00',
    attendanceAlerts: true,
    feeReminders: true,
    examResults: true,
      eventsAndHolidays: true,
      academicUpdates: true,
      systemMaintenance: false
    }
    toast.info('Notification preferences reset to default values')
  }
}

const loadSettings = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/settings/notifications`)
    
    if (response.data.success || response.data.status) {
      const data = response.data.data || response.data.result
      
      if (data) {
        settings.value = {
          emailNotifications: data.emailNotifications !== undefined ? data.emailNotifications : true,
          smsNotifications: data.smsNotifications || false,
          pushNotifications: data.pushNotifications !== undefined ? data.pushNotifications : true,
          emailFrequency: data.emailFrequency || 'instant',
          quietHoursStart: data.quietHoursStart || '22:00',
          quietHoursEnd: data.quietHoursEnd || '08:00',
          attendanceAlerts: data.attendanceAlerts !== undefined ? data.attendanceAlerts : true,
          feeReminders: data.feeReminders !== undefined ? data.feeReminders : true,
          examResults: data.examResults !== undefined ? data.examResults : true,
          eventsAndHolidays: data.eventsAndHolidays !== undefined ? data.eventsAndHolidays : true,
          academicUpdates: data.academicUpdates !== undefined ? data.academicUpdates : true,
          systemMaintenance: data.systemMaintenance || false
        }
      }
    }
  } catch (error) {
    console.error('Error loading notification settings:', error)
    // Don't show error toast for loading settings as they might not exist yet
  }
}

onMounted(async () => {
  await loadSettings()
})
</script>

<style scoped>
/* Same professional styling as GeneralSettings.vue */
.bg-white\/90 {
  background-color: #ffffff;
}

.text-gray-600 { color: #64748b; }
.text-gray-600 { color: #64748b; }
.text-gray-900 { color: #1e293b; }
.text-gray-900 { color: #1e293b; }

.text-gray-600 { color: #64748b; }
.text-gray-900 { color: #1e293b; }
.text-navy-300 { color: #94a3b8; }
.border-navy-300 { border-color: #94a3b8; }
.border-navy-400 { border-color: #94a3b8; }
.bg-navy-50 { background-color: #f8fafc; }
.hover\:bg-navy-50:hover { background-color: #f8fafc; }
.hover\:border-navy-400:hover { border-color: #94a3b8; }
.hover\:text-gray-900:hover { color: #1e293b; }

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

/* Toggle switch styling */
.peer:checked ~ .peer-checked\:bg-blue-600 { background-color: #3b82f6; }
.peer:checked ~ .peer-checked\:bg-green-600 { background-color: #10b981; }
.peer:checked ~ .peer-checked\:bg-purple-600 { background-color: #8b5cf6; }

.peer:checked ~ .peer-checked\:after\:translate-x-full:after {
  transform: translateX(100%);
}

.peer-focus\:ring-blue-300:focus { box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.3); }
.peer-focus\:ring-green-300:focus { box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.3); }
.peer-focus\:ring-purple-300:focus { box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.3); }

/* Background colors */
.bg-white { background-color: #f8fafc; }
.bg-white { background-color: #ffffff; }

/* Icon backgrounds */
.bg-blue-100 { background-color: #f1f5f9; }
.bg-green-100 { background-color: #f1f5f9; }
.bg-purple-100 { background-color: #f1f5f9; }
.bg-orange-100 { background-color: #f1f5f9; }
.bg-indigo-100 { background-color: #f1f5f9; }
.bg-red-100 { background-color: #f1f5f9; }
.bg-yellow-100 { background-color: #f1f5f9; }

/* Icon colors */
.text-blue-600 { color: #3b82f6; }
.text-green-600 { color: #10b981; }
.text-purple-600 { color: #8b5cf6; }
.text-orange-600 { color: #f59e0b; }
.text-indigo-600 { color: #8b5cf6; }

/* Other utilities maintained from previous styling */
.transition-all { transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1); }
.transition-colors { transition: color, background-color, border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1); }
.duration-200 { transition-duration: 200ms; }
.duration-300 { transition-duration: 300ms; }
.duration-500 { transition-duration: 500ms; }

.shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
.rounded-lg { border-radius: 0.5rem; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-full { border-radius: 9999px; }

/* Focus styles */
input:focus, select:focus {
  outline: 2px solid #a855f7;
  outline-offset: 2px;
}

/* Animation classes */
@keyframes pulse {
  50% { opacity: .5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Hover effects */
button:hover {
  transform: scale(1.02);
  transition: all 0.2s ease-in-out;
}

button:active {
  transform: scale(0.98);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:border-purple-200:hover {
  border-color: var(--border-accent);
}

/* Grid and layout utilities */
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }

@media (min-width: 1024px) {
  .lg\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Typography and spacing utilities */
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-base { font-size: 1rem; line-height: 1.5rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }

.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }

.space-y-4 > * + * { margin-top: 1rem; }
.space-y-5 > * + * { margin-top: 1.25rem; }
.space-y-6 > * + * { margin-top: 1.5rem; }

.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }
.gap-8 { gap: 2rem; }

.p-3 { padding: 0.75rem; }
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }

.px-8 { padding-left: 2rem; padding-right: 2rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }

.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-8 { margin-top: 2rem; }

/* Border and other utilities */
.border { border-width: 1px; }
.border-b { border-bottom-width: 1px; }
.border-t { border-top-width: 1px; }
.border-gray-200 { border-color: #94a3b8; }
.border-gray-200 { border-color: #e2e8f0; }
.border-blue-100 { border-color: var(--border-accent); }
.border-green-100 { border-color: var(--border-accent); }
.border-purple-100 { border-color: var(--border-accent); }

.w-2 { width: 0.5rem; }
.w-4 { width: 1rem; }
.w-5 { width: 1.25rem; }
.w-6 { width: 1.5rem; }
.w-8 { width: 2rem; }
.w-9 { width: 2.25rem; }
.w-10 { width: 2.5rem; }
.w-11 { width: 2.75rem; }
.w-16 { width: 4rem; }

.h-2 { height: 0.5rem; }
.h-4 { height: 1rem; }
.h-5 { height: 1.25rem; }
.h-6 { height: 1.5rem; }
.h-8 { height: 2rem; }
.h-10 { height: 2.5rem; }
.h-12 { height: 3rem; }
.h-16 { height: 4rem; }

.w-full { width: 100%; }
.max-w-6xl { max-width: 72rem; }
.max-w-md { max-width: 28rem; }

.flex { display: flex; }
.inline-flex { display: inline-flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.justify-end { justify-content: flex-end; }

.relative { position: relative; }
.absolute { position: absolute; }
.top-1\/2 { top: 50%; }
.right-2 { right: 0.5rem; }
.left-0 { left: 0; }
.right-0 { right: 0; }
.bottom-0 { bottom: 0; }

.transform { transform: var(--tw-transform); }
.-translate-y-1\/2 { transform: translateY(-50%); }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  #ffffff-space: nowrap;
  border-width: 0;
}

.appearance-none { appearance: none; }
.pointer-events-none { pointer-events: none; }
.cursor-pointer { cursor: pointer; }
.uppercase { text-transform: uppercase; }
.tracking-tight { letter-spacing: -0.025em; }
.tracking-wider { letter-spacing: 0.05em; }
.text-center { text-align: center; }
.overflow-hidden { overflow: hidden; }
.mx-auto { margin-left: auto; margin-right: auto; }

.disabled\:opacity-50:disabled { opacity: 0.5; }
.disabled\:cursor-not-allowed:disabled { cursor: not-allowed; }

/* Responsive utilities */
@media (max-width: 640px) {
  .sm\:p-6 { padding: 1.5rem; }
  .sm\:p-8 { padding: 2rem; }
  .sm\:flex-row { flex-direction: row; }
}

@media (max-width: 1024px) {
  .lg\:p-8 { padding: 2rem; }
}

/* Button width utilities */
.w-24 {
  width: 6rem;
}

.w-32 {
  width: 8rem;
}

.justify-center {
  justify-content: center;
}
</style> 