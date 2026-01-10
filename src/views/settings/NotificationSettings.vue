<template>
  <div class="relative w-full min-h-screen pl-0 pr-0 sm:pl-0 sm:pr-0 lg:pl-1 lg:pr-0 py-2 sm:py-3 lg:py-4" key="notification-settings-root">
    <!-- Top Bar Header -->
    <div class="relative z-10 w-full mt-2 mb-4 flex items-center justify-between bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200 dark:border-gray-700">
      <h2 class="text-base font-medium text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        Notification Settings
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-600 dark:text-gray-400">
        <span class="hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors duration-200" @click="$router.push('/dashboard')">Dashboard</span>
        <span class="mx-2 dark:text-gray-600">|</span>
        <span class="hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors duration-200">Settings</span>
        <span class="mx-2 dark:text-gray-600">|</span>
        <span class="text-gray-900 dark:text-white font-bold">Notifications</span>
      </nav>
    </div>

    <!-- Settings Title Section -->
    <div class="relative z-10 w-full mb-4 sm:mb-6">
      <div class="flex flex-col items-center text-center">
        <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.828 7l2.828 2.828M3 10h8m-8 4h8m-4 4h8m-4-8H3m18 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Notification Preferences</h3>
        <p class="text-gray-600 dark:text-gray-400 max-w-md">Customize how and when you receive notifications from the system.</p>
      </div>
    </div>

    <!-- Main Settings Container -->
    <div class="relative z-10 w-full">
      <div class="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <form @submit.prevent="saveSettings" class="p-6 sm:p-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <!-- Left Column - Communication Channels -->
            <div class="space-y-6">
              <!-- Communication Channels Section -->
              <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Communication Channels</h4>
                </div>

                <div class="space-y-5">
                  <!-- Email Notifications -->
                  <div class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50">
                    <div class="flex items-center gap-4">
                      <div class="w-10 h-10 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                      </div>
                      <div>
                        <h5 class="font-semibold text-gray-900 dark:text-white">Email Notifications</h5>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                      </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="settings.emailNotifications" type="checkbox" class="sr-only peer" />
                      <div class="w-11 h-6 bg-white dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-200 dark:peer-checked:after:border-gray-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-300 after:border-gray-200 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
                    </label>
                  </div>

                  <!-- SMS Notifications -->
                  <div class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-100 dark:border-green-800/50">
                    <div class="flex items-center gap-4">
                      <div class="w-10 h-10 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                        </svg>
                      </div>
                      <div>
                        <h5 class="font-semibold text-gray-900 dark:text-white">SMS Notifications</h5>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Receive text messages on your phone</p>
                      </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="settings.smsNotifications" type="checkbox" class="sr-only peer" />
                      <div class="w-11 h-6 bg-white dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-200 dark:peer-checked:after:border-gray-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-300 after:border-gray-200 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 dark:peer-checked:bg-green-500"></div>
                    </label>
                  </div>

                  <!-- Push Notifications -->
                  <div class="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-100 dark:border-purple-800/50">
                    <div class="flex items-center gap-4">
                      <div class="w-10 h-10 bg-purple-500 dark:bg-purple-600 rounded-full flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.828 7l2.828 2.828M3 10h8m-8 4h8m-4 4h8m-4-8H3m18 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <div>
                        <h5 class="font-semibold text-gray-900 dark:text-white">Push Notifications</h5>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Instant browser notifications</p>
                      </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="settings.pushNotifications" type="checkbox" class="sr-only peer" />
                      <div class="w-11 h-6 bg-white dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-200 dark:peer-checked:after:border-gray-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-300 after:border-gray-200 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 dark:peer-checked:bg-purple-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Frequency Settings -->
              <div>
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Notification Frequency</h4>
                </div>

                <div class="space-y-4">
                  <div class="flex flex-col w-full">
                    <label class="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Email Frequency</label>
                    <div class="relative">
                      <select 
                        v-model="settings.emailFrequency"
                        class="h-12 border-0 bg-transparent px-0 text-sm font-light text-gray-600 dark:text-gray-300 dark:bg-transparent focus:ring-0 focus:outline-none w-full appearance-none pr-8"
                      >
                        <option value="instant" class="dark:bg-gray-800 dark:text-gray-300">Instant</option>
                        <option value="daily" class="dark:bg-gray-800 dark:text-gray-300">Daily Digest</option>
                        <option value="weekly" class="dark:bg-gray-800 dark:text-gray-300">Weekly Summary</option>
                        <option value="monthly" class="dark:bg-gray-800 dark:text-gray-300">Monthly Report</option>
                      </select>
                      <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                        </svg>
                      </div>
                      <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 dark:bg-purple-700 pointer-events-none"></div>
                    </div>
                  </div>

                  <div class="flex flex-col w-full">
                    <label class="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Quiet Hours</label>
                    <div class="grid grid-cols-2 gap-4">
                      <div class="relative">
                        <input 
                          v-model="settings.quietHoursStart"
                          type="time"
                          class="h-12 border-0 bg-transparent px-0 text-sm font-light text-gray-600 dark:text-gray-300 dark:placeholder-gray-500 focus:ring-0 focus:outline-none w-full"
                        />
                        <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 dark:bg-purple-700 pointer-events-none"></div>
                      </div>
                      <div class="relative">
                        <input 
                          v-model="settings.quietHoursEnd"
                          type="time"
                          class="h-12 border-0 bg-transparent px-0 text-sm font-light text-gray-600 dark:text-gray-300 dark:placeholder-gray-500 focus:ring-0 focus:outline-none w-full"
                        />
                        <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 dark:bg-purple-700 pointer-events-none"></div>
                      </div>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">No notifications will be sent during these hours</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column - Notification Types -->
            <div class="space-y-6">
              <!-- Notification Types Section -->
              <div class="bg-white dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Notification Types</h4>
                </div>

                <div class="space-y-4">
                  <!-- Attendance Alerts -->
                  <div class="flex items-center justify-between p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-600 transition-colors duration-300">
                    <div class="flex items-center gap-3">
                      <div class="w-6 h-6 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                        <div class="w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full"></div>
                      </div>
                      <div>
                        <h6 class="font-medium text-gray-900 dark:text-white">Attendance Alerts</h6>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Student absence notifications</p>
                      </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="settings.attendanceAlerts" type="checkbox" class="sr-only peer" />
                      <div class="w-9 h-5 bg-white dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-200 dark:peer-checked:after:border-gray-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-300 after:border-gray-200 dark:after:border-gray-600 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600 dark:peer-checked:bg-purple-500"></div>
                    </label>
                  </div>

                  <!-- Fee Due Reminders -->
                  <div class="flex items-center justify-between p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-600 transition-colors duration-300">
                    <div class="flex items-center gap-3">
                      <div class="w-6 h-6 bg-yellow-100 dark:bg-yellow-900/50 rounded-full flex items-center justify-center">
                        <div class="w-2 h-2 bg-yellow-500 dark:bg-yellow-400 rounded-full"></div>
                      </div>
                      <div>
                        <h6 class="font-medium text-gray-900 dark:text-white">Fee Due Reminders</h6>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Payment deadline notifications</p>
                      </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="settings.feeReminders" type="checkbox" class="sr-only peer" />
                      <div class="w-9 h-5 bg-white dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-200 dark:peer-checked:after:border-gray-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-300 after:border-gray-200 dark:after:border-gray-600 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600 dark:peer-checked:bg-purple-500"></div>
                    </label>
                  </div>

                  <!-- Exam Results -->
                  <div class="flex items-center justify-between p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-600 transition-colors duration-300">
                    <div class="flex items-center gap-3">
                      <div class="w-6 h-6 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                        <div class="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full"></div>
                      </div>
                      <div>
                        <h6 class="font-medium text-gray-900 dark:text-white">Exam Results</h6>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Grade and result announcements</p>
                      </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="settings.examResults" type="checkbox" class="sr-only peer" />
                      <div class="w-9 h-5 bg-white dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-200 dark:peer-checked:after:border-gray-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-300 after:border-gray-200 dark:after:border-gray-600 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600 dark:peer-checked:bg-purple-500"></div>
                    </label>
                  </div>

                  <!-- Events & Holidays -->
                  <div class="flex items-center justify-between p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-600 transition-colors duration-300">
                    <div class="flex items-center gap-3">
                      <div class="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                        <div class="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                      </div>
                      <div>
                        <h6 class="font-medium text-gray-900 dark:text-white">Events & Holidays</h6>
                        <p class="text-xs text-gray-500 dark:text-gray-400">School events and holiday announcements</p>
                      </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="settings.eventsAndHolidays" type="checkbox" class="sr-only peer" />
                      <div class="w-9 h-5 bg-white dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-200 dark:peer-checked:after:border-gray-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-300 after:border-gray-200 dark:after:border-gray-600 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600 dark:peer-checked:bg-purple-500"></div>
                    </label>
                  </div>

                  <!-- Academic Updates -->
                  <div class="flex items-center justify-between p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-600 transition-colors duration-300">
                    <div class="flex items-center gap-3">
                      <div class="w-6 h-6 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                        <div class="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full"></div>
                      </div>
                      <div>
                        <h6 class="font-medium text-gray-900 dark:text-white">Academic Updates</h6>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Curriculum and schedule changes</p>
                      </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="settings.academicUpdates" type="checkbox" class="sr-only peer" />
                      <div class="w-9 h-5 bg-white dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-200 dark:peer-checked:after:border-gray-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-300 after:border-gray-200 dark:after:border-gray-600 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600 dark:peer-checked:bg-purple-500"></div>
                    </label>
                  </div>

                  <!-- System Maintenance -->
                  <div class="flex items-center justify-between p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-600 transition-colors duration-300">
                    <div class="flex items-center gap-3">
                      <div class="w-6 h-6 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center">
                        <div class="w-2 h-2 bg-orange-500 dark:bg-orange-400 rounded-full"></div>
                      </div>
                      <div>
                        <h6 class="font-medium text-gray-900 dark:text-white">System Maintenance</h6>
                        <p class="text-xs text-gray-500 dark:text-gray-400">System updates and downtime alerts</p>
                      </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="settings.systemMaintenance" type="checkbox" class="sr-only peer" />
                      <div class="w-9 h-5 bg-white dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-200 dark:peer-checked:after:border-gray-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-300 after:border-gray-200 dark:after:border-gray-600 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600 dark:peer-checked:bg-purple-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex flex-row gap-3 justify-end pt-8 border-t border-gray-200 dark:border-gray-700 mt-8">
            <button 
              type="button"
              @click="resetSettings"
              class="h-10 w-24 rounded-full border-2 border-gray-300 dark:border-gray-600 text-sm font-bold text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Reset
            </button>
            
            <button 
              type="submit"
              :disabled="loading"
              class="h-10 w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
import api from '@/utils/axios'

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
    const response = await api.post('/settings/notifications', settings.value)
    
    if (response.data.success || response.data.status) {
      toast.success('✅ Notification preferences saved successfully!')
    } else {
      toast.error('❌ ' + (response.data.message || 'Failed to save preferences'))
    }
  } catch (error) {
    console.error('Error saving notification settings:', error)
    const errorMsg = error.response?.data?.message || 'An error occurred while saving preferences'
    toast.error('❌ ' + errorMsg)
  } finally {
    loading.value = false
  }
}

const resetSettings = () => {
  if (confirm('🔄 Reset all notification preferences to default values?\n\nThis will restore all notification settings to their defaults.')) {
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
    toast.info('ℹ️ Notification preferences reset to default values')
  }
}

const loadSettings = async () => {
  try {
    const response = await api.get('/settings/notifications')
    
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
/* Custom scrollbar with dark mode support */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.dark ::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style> 