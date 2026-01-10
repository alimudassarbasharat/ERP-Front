<template>
  <!-- Modern Profile Page with Beautiful Design -->
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden" style="background: var(--bg-primary);">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-30">
      <div class="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div class="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>

    <div class="relative z-10 container mx-auto px-4 py-8">
      <!-- Page Header -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 dark:from-purple-400 dark:via-pink-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4">
          Profile Settings
        </h1>
        <p class="w-full text-gray-600 dark:text-gray-300">
          Manage your account settings and personal information
        </p>
        </div>

      <!-- Main Content Card -->
      <div class="w-full">
        <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          
          <!-- Tab Navigation -->
          <div class="border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
            <nav class="flex space-x-8 px-8 pt-6">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'pb-4 px-1 text-sm font-semibold border-b-2 transition-all duration-300 cursor-pointer',
                  activeTab === tab.id
                    ? 'border-purple-500 dark:border-purple-400 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-200 dark:hover:border-gray-600'
                ]"
              >
                <div class="flex items-center gap-2">
                  <!-- User Icon -->
                  <svg v-if="tab.icon === 'user'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  <!-- Bell Icon -->
                  <svg v-if="tab.icon === 'bell'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.828 7l2.828 2.828M3 10h8m-8 4h8m-4 4h8m-4-8H3m18 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <!-- Users Icon -->
                  <svg v-if="tab.icon === 'users'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                  </svg>
                  {{ tab.label }}
                </div>
              </button>
            </nav>
          </div>

          <!-- Tab Content -->
          <div class="p-8">
            <!-- Profile Tab -->
            <div v-if="activeTab === 'profile'" class="space-y-8">
              <!-- Header -->
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Profile & Security Settings</h3>
                  <p class="text-gray-600 dark:text-gray-300 mt-1">Manage your personal information and account security</p>
                </div>
              </div>

              <form @submit.prevent="saveProfile" class="space-y-8">
                <!-- Photo Section -->
                <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                  <div class="flex items-center gap-3 mb-6">
                    <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
                      <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Profile Photo</h4>
                  </div>

                  <div class="flex items-center gap-6">
                    <!-- Enhanced Avatar Preview -->
                    <div class="flex-shrink-0">
                      <div class="relative group">
                        <!-- Animated Ring -->
                        <div class="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full opacity-75 group-hover:opacity-100 animate-pulse"></div>
                        
                        <!-- Avatar Container -->
                        <div class="relative bg-white dark:bg-gray-700 rounded-full p-1 group-hover:scale-105 transition-all duration-500">
                          <img 
                            :src="photoPreview || form.avatar || defaultAvatar" 
                            alt="Profile Photo"
                            class="w-18 h-18 rounded-full object-cover shadow-lg transition-all duration-500 group-hover:shadow-xl filter group-hover:brightness-110"
                          />
                          
                          <!-- Floating Camera Badge -->
                          <div class="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-3 border-gray-200 dark:border-gray-600 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 animate-bounce-slow">
                            <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                          </div>
                          
                          <!-- Shimmer Effect -->
                          <div class="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-#ffffff to-transparent opacity-0 group-hover:opacity-30 group-hover:animate-shimmer"></div>
                        </div>
                      </div>
                    </div>

                    <!-- Premium Upload Button -->
                    <div class="flex-1 relative">
                      <input 
                        ref="fileInput"
                        type="file" 
                        accept="image/*" 
                        @change="handlePhotoChange" 
                        class="hidden"
                      />
                      
                      <div class="relative group">
                        <!-- Floating Background -->
                        <div class="absolute -inset-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 rounded-xl opacity-20 group-hover:opacity-40 blur-sm transition-all duration-500"></div>
                        
                        <button
                          type="button"
                          @click="triggerFileInput"
                          class="w-full"
                        >
                          <!-- Animated Icon Container -->
                          <div class="flex-shrink-0 relative">
                            <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                              <svg class="w-5 h-5 text-white group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                              </svg>
                            </div>
                            <!-- Pulse Ring -->
                            <div class="absolute inset-0 rounded-xl bg-purple-400 opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>
                          </div>
                          
                          <!-- Enhanced Text Content -->
                          <div class="text-left flex-1">
                            <p class="text-sm font-bold text-transparent bg-gradient-to-r from-purple-700 to-pink-700 dark:from-purple-400 dark:to-pink-400 bg-clip-text group-hover:from-purple-800 group-hover:to-pink-800 dark:group-hover:from-purple-300 dark:group-hover:to-pink-300 transition-all duration-300">
                              Upload new photo
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
                              ✨ PNG, JPG up to 2MB
                            </p>
                          </div>
                          
                          <!-- Floating Arrow -->
                          <div class="ml-auto">
                            <div class="w-8 h-8 bg-white/50 dark:bg-gray-700/50 rounded-lg flex items-center justify-center group-hover:bg-white/80 dark:group-hover:bg-gray-600/80 group-hover:scale-110 transition-all duration-300 shadow-sm">
                              <svg class="w-4 h-4 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 group-hover:translate-x-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                              </svg>
                            </div>
                          </div>
                          
                          <!-- Sparkle Effects -->
                          <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div class="w-1 h-1 bg-yellow-400 rounded-full animate-twinkle"></div>
                          </div>
                          <div class="absolute bottom-3 left-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <div class="w-1.5 h-1.5 bg-pink-400 rounded-full animate-twinkle-delay"></div>
                          </div>
                        </button>
                      </div>
                      
                      <!-- Enhanced Drag and Drop Zone -->
                      <div 
                        @drop="handleDrop"
                        @dragover.prevent="handleDragOver"
                        @dragleave="handleDragLeave"
                        @dragenter.prevent="handleDragEnter"
                        :class="[
                          'absolute inset-0 rounded-xl border-2 border-dashed transition-all duration-500 z-10',
                          isDragOver 
                            ? 'border-purple-400 dark:border-purple-500 bg-purple-100 dark:bg-purple-900/50 bg-opacity-80 scale-105 pointer-events-auto' 
                            : 'border-transparent bg-transparent pointer-events-none'
                        ]"
                      >
                        <div v-if="isDragOver" class="absolute inset-0 flex items-center justify-center rounded-xl">
                          <div class="text-center bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                            <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                              </svg>
                            </div>
                            <p class="text-sm font-semibold text-purple-700 dark:text-purple-300">Drop your photo here!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Personal Info Section -->
                <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <div class="flex items-center gap-3 mb-6">
                    <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                      <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h4>
                  </div>

                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- First Name -->
                    <div class="flex flex-col w-full">
                      <label class="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">First Name *</label>
                      <div class="relative">
                        <input 
                          v-model="form.first_name"
                          type="text" 
                          required
                          class="h-12 border-0 bg-transparent px-0 text-sm font-light text-gray-600 dark:text-gray-300 focus:ring-0 focus:outline-none w-full placeholder-gray-400 dark:placeholder-gray-500"
                          placeholder="Enter your first name"
                        />
                        <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 dark:bg-purple-700 pointer-events-none"></div>
                      </div>
                    </div>

                    <!-- Last Name -->
                    <div class="flex flex-col w-full">
                      <label class="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Last Name</label>
                      <div class="relative">
                        <input 
                          v-model="form.last_name"
                          type="text" 
                          class="h-12 border-0 bg-transparent px-0 text-sm font-light text-gray-600 dark:text-gray-300 focus:ring-0 focus:outline-none w-full placeholder-gray-400 dark:placeholder-gray-500"
                          placeholder="Enter your last name"
                        />
                        <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 dark:bg-purple-700 pointer-events-none"></div>
                      </div>
                    </div>

                    <!-- Email -->
                    <div class="flex flex-col w-full">
                      <label class="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Email Address *</label>
                      <div class="relative">
                        <input 
                          v-model="form.email"
                          type="email" 
                          required
                          class="h-12 border-0 bg-transparent px-0 text-sm font-light text-gray-600 dark:text-gray-300 focus:ring-0 focus:outline-none w-full placeholder-gray-400 dark:placeholder-gray-500"
                          placeholder="Enter your email address"
                        />
                        <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 dark:bg-purple-700 pointer-events-none"></div>
                      </div>
                    </div>

                    <!-- Role -->
                    <div class="flex flex-col w-full">
                      <label class="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Role</label>
                      <div class="relative">
                        <select 
                          v-model="form.role"
                          class="h-12 border-0 bg-transparent dark:bg-transparent px-0 text-sm font-light text-gray-600 dark:text-gray-300 focus:ring-0 focus:outline-none w-full appearance-none pr-8"
                        >
                          <option value="Admin" class="dark:bg-gray-800 dark:text-gray-300">Administrator</option>
                          <option value="Teacher" class="dark:bg-gray-800 dark:text-gray-300">Teacher</option>
                          <option value="Student" class="dark:bg-gray-800 dark:text-gray-300">Student</option>
                          <option value="Staff" class="dark:bg-gray-800 dark:text-gray-300">Staff Member</option>
                        </select>
                        <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                          </svg>
                        </div>
                        <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 dark:bg-purple-700 pointer-events-none"></div>
                      </div>
                    </div>

                    <!-- Phone -->
                    <div class="flex flex-col w-full">
                      <label class="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Phone Number</label>
                      <div class="relative">
                        <input 
                          v-model="form.phone"
                          type="tel" 
                          class="h-12 border-0 bg-transparent px-0 text-sm font-light text-gray-600 dark:text-gray-300 focus:ring-0 focus:outline-none w-full placeholder-gray-400 dark:placeholder-gray-500"
                          placeholder="Enter your phone number"
                        />
                        <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 dark:bg-purple-700 pointer-events-none"></div>
                      </div>
                    </div>

                    <!-- Country -->
                    <div class="flex flex-col w-full">
                      <label class="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Country</label>
                      <div class="relative">
                        <select 
                          v-model="form.country"
                          class="h-12 border-0 bg-transparent dark:bg-transparent px-0 text-sm font-light text-gray-600 dark:text-gray-300 focus:ring-0 focus:outline-none w-full appearance-none pr-8"
                        >
                          <option value="Pakistan" class="dark:bg-gray-800 dark:text-gray-300">Pakistan</option>
                          <option value="United States" class="dark:bg-gray-800 dark:text-gray-300">United States</option>
                          <option value="United Kingdom" class="dark:bg-gray-800 dark:text-gray-300">United Kingdom</option>
                          <option value="India" class="dark:bg-gray-800 dark:text-gray-300">India</option>
                          <option value="Canada" class="dark:bg-gray-800 dark:text-gray-300">Canada</option>
                          <option value="Australia" class="dark:bg-gray-800 dark:text-gray-300">Australia</option>
                        </select>
                        <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                          </svg>
                        </div>
                        <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 dark:bg-purple-700 pointer-events-none"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Password Security Section -->
                <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                  <div class="flex items-center gap-3 mb-6">
                    <div class="w-8 h-8 bg-red-100 dark:bg-red-900/50 rounded-lg flex items-center justify-center">
                      <svg class="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                    </div>
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Password & Security</h4>
                  </div>

                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Current Password -->
                    <div class="flex flex-col w-full">
                      <label class="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Current Password *</label>
                      <div class="relative">
                        <input 
                          v-model="passwordForm.currentPassword"
                          :type="showCurrentPassword ? 'text' : 'password'" 
                          autocomplete="current-password"
                          class="h-12 border-0 bg-transparent px-0 pr-10 text-sm font-light text-gray-600 dark:text-gray-300 focus:ring-0 focus:outline-none w-full placeholder-gray-400 dark:placeholder-gray-500"
                          placeholder="Enter your current password"
                        />
                        <button
                          type="button"
                          @click="toggleCurrentPassword"
                          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 focus:outline-none transition-colors duration-200 p-1"
                        >
                          <!-- Eye Open Icon -->
                          <svg v-if="showCurrentPassword" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                          </svg>
                          <!-- Eye Closed Icon -->
                          <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"/>
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                          </svg>
                        </button>
                        <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 dark:bg-purple-700 pointer-events-none"></div>
                      </div>
                    </div>

                    <!-- New Password -->
                    <div class="flex flex-col w-full">
                      <label class="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">New Password *</label>
                      <div class="relative">
                        <input 
                          v-model="passwordForm.newPassword"
                          :type="showNewPassword ? 'text' : 'password'" 
                          autocomplete="new-password"
                          class="h-12 border-0 bg-transparent px-0 pr-10 text-sm font-light text-gray-600 dark:text-gray-300 focus:ring-0 focus:outline-none w-full placeholder-gray-400 dark:placeholder-gray-500"
                          placeholder="Enter your new password"
                        />
                        <button
                          type="button"
                          @click="toggleNewPassword"
                          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 focus:outline-none transition-colors duration-200 p-1"
                        >
                          <!-- Eye Open Icon -->
                          <svg v-if="showNewPassword" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                          </svg>
                          <!-- Eye Closed Icon -->
                          <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"/>
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                          </svg>
                        </button>
                        <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 dark:bg-purple-700 pointer-events-none"></div>
                      </div>
                    </div>

                    <!-- Confirm Password -->
                    <div class="flex flex-col w-full lg:col-span-2">
                      <label class="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Confirm Password *</label>
                      <div class="relative">
                        <input 
                          v-model="passwordForm.confirmPassword"
                          :type="showConfirmPassword ? 'text' : 'password'" 
                          autocomplete="new-password"
                          class="h-12 border-0 bg-transparent px-0 pr-10 text-sm font-light text-gray-600 dark:text-gray-300 focus:ring-0 focus:outline-none w-full placeholder-gray-400 dark:placeholder-gray-500"
                          placeholder="Confirm your new password"
                        />
                        <button
                          type="button"
                          @click="toggleConfirmPassword"
                          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 focus:outline-none transition-colors duration-200 p-1"
                        >
                          <!-- Eye Open Icon -->
                          <svg v-if="showConfirmPassword" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
          </svg>
                          <!-- Eye Closed Icon -->
                          <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"/>
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                          </svg>
                        </button>
                        <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 dark:bg-purple-700 pointer-events-none"></div>
                      </div>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">💡 Minimum 8 characters with numbers and special characters</p>
                    </div>

                    <!-- Password Change Button -->
                    <div class="lg:col-span-2 flex justify-end">
                      <button 
                        type="button"
                        @click="handleChangePassword"
                        :disabled="loading || !isPasswordValid"
                        class="h-10 w-40 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-sm font-bold text-white shadow hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <span v-if="loading" class="flex items-center gap-2">
                          <div class="w-4 h-4 border-2 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                          Changing...
                      </span>
                        <span v-else class="flex items-center gap-2">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                          </svg>
                          Change Password
                        </span>
                      </button>
                    </div>
                </div>
      </div>

                <!-- Profile Form Actions -->
                <div class="flex flex-row gap-3 justify-end pt-8 border-t border-gray-200 dark:border-gray-700">
                  <button 
                    type="button"
                    @click="resetForm"
                    class="h-10 w-24 rounded-full border-2 border-navy-300 dark:border-gray-600 text-sm font-bold text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-navy-50 dark:hover:bg-gray-700 hover:border-navy-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    Reset
                  </button>
                  
                  <button 
                    type="submit"
                    :disabled="loading"
                    class="h-10 w-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <span v-if="loading" class="flex items-center gap-2">
                      <div class="w-4 h-4 border-2 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </span>
                    <span v-else class="flex items-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      Save Profile
                    </span>
                  </button>
        </div>
              </form>
      </div>



            <!-- Notifications Tab -->
            <div v-if="activeTab === 'notifications'" class="space-y-8">
              <!-- Header -->
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Notification Preferences</h3>
                  <p class="text-gray-600 dark:text-gray-300 mt-1">Manage how you receive notifications</p>
                </div>
              </div>

              <!-- Notification Settings -->
              <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.828 7l2.828 2.828M3 10h8m-8 4h8m-4 4h8m-4-8H3m18 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Communication Preferences</h4>
                </div>

                <div class="space-y-4">
                  <div v-for="setting in notificationSettings" :key="setting.key" class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-600 transition-colors duration-300">
                    <div class="flex items-center gap-3">
                      <div :class="['w-6 h-6 rounded-full flex items-center justify-center', setting.colorClass]">
                        <div :class="['w-2 h-2 rounded-full', setting.dotClass]"></div>
                      </div>
                      <div>
                        <h6 class="font-medium text-gray-900 dark:text-white">{{ setting.title }}</h6>
                        <p class="text-xs text-gray-500 dark:text-gray-400">{{ setting.description }}</p>
                      </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="notificationForm[setting.key]" type="checkbox" class="sr-only peer" />
                      <div class="w-9 h-5 bg-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="flex flex-row gap-3 justify-end pt-8 border-t border-gray-200 dark:border-gray-700">
                <button 
                  type="button"
                  @click="resetNotificationForm"
                  class="h-10 w-24 rounded-full border-2 border-navy-300 text-sm font-bold text-gray-600 bg-white hover:bg-navy-50 hover:border-navy-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Reset
                </button>
                
                <button 
                  type="button"
                  @click="saveNotificationSettings"
                  :disabled="loading"
                  class="h-10 w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span v-if="loading" class="flex items-center gap-2">
                    <div class="w-4 h-4 border-2 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </span>
                  <span v-else class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Save
                  </span>
                </button>
              </div>
            </div>

            <!-- Team Tab -->
            <div v-if="activeTab === 'team'" class="space-y-8">
              <!-- Header -->
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Team Management</h3>
                  <p class="text-gray-600 dark:text-gray-300 mt-1">Manage your team members and permissions</p>
                </div>
              </div>

              <!-- Coming Soon Card -->
              <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-12 text-center">
                <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                  </svg>
                </div>
                <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Team Management Coming Soon</h4>
                <p class="w-full text-gray-600 dark:text-gray-300">
                  Advanced team management features are under development. You'll be able to manage team members, roles, and permissions here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useToast } from 'vue-toastification'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()
const defaultAvatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
const user = reactive(JSON.parse(localStorage.getItem('user') || '{}'))
const activeTab = ref('profile')
const loading = ref(false)
const fileInput = ref(null)
const photoPreview = ref('')
const isDragOver = ref(false)

// Tab configuration with proper icons
const tabs = [
  {
    id: 'profile',
    label: 'Profile & Security',
    icon: 'user'
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: 'bell'
  },
  {
    id: 'team',
    label: 'Team Management',
    icon: 'users'
  }
]

// Profile form
const form = reactive({
  first_name: user.first_name || user.name || '',
  last_name: user.last_name || '',
  email: user.email || '',
  role: user.role || 'Admin',
  phone: user.phone || '',
  country: user.country || 'Pakistan',
  avatar: user.avatar || ''
})

// Log user data for debugging
console.log('User data loaded:', user)

// Password form
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Password visibility toggles
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// Toggle password visibility methods
const toggleCurrentPassword = () => {
  showCurrentPassword.value = !showCurrentPassword.value
}

const toggleNewPassword = () => {
  showNewPassword.value = !showNewPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

// Notification form
const notificationForm = reactive({
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  systemUpdates: true,
  marketingEmails: false
})

// Notification settings
const notificationSettings = [
  {
    key: 'emailNotifications',
    title: 'Email Notifications',
    description: 'Receive notifications via email',
    colorClass: 'bg-blue-100',
    dotClass: 'bg-blue-500'
  },
  {
    key: 'pushNotifications',
    title: 'Push Notifications',
    description: 'Receive push notifications in browser',
    colorClass: 'bg-green-100',
    dotClass: 'bg-green-500'
  },
  {
    key: 'smsNotifications',
    title: 'SMS Notifications',
    description: 'Receive notifications via SMS',
    colorClass: 'bg-yellow-100',
    dotClass: 'bg-yellow-500'
  },
  {
    key: 'systemUpdates',
    title: 'System Updates',
    description: 'Get notified about system updates',
    colorClass: 'bg-purple-100',
    dotClass: 'bg-purple-500'
  },
  {
    key: 'marketingEmails',
    title: 'Marketing Emails',
    description: 'Receive promotional emails',
    colorClass: 'bg-pink-100',
    dotClass: 'bg-pink-500'
  }
]

// Computed properties
const isPasswordValid = computed(() => {
  return passwordForm.currentPassword && 
         passwordForm.newPassword && 
         passwordForm.confirmPassword &&
         passwordForm.newPassword === passwordForm.confirmPassword &&
         passwordForm.newPassword.length >= 8
})

// File handling methods
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handlePhotoChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (beforePhotoUpload(file)) {
  const reader = new FileReader()
  reader.onload = (e) => {
    photoPreview.value = e.target.result
        form.avatar = e.target.result
        toast.success('Photo uploaded successfully!')
      }
      reader.readAsDataURL(file)
    }
  }
  // Reset input so same file can be selected again
  event.target.value = ''
}

const handleDragEnter = (event) => {
  event.preventDefault()
  event.stopPropagation()
  isDragOver.value = true
}

const handleDragOver = (event) => {
  event.preventDefault()
  event.stopPropagation()
  isDragOver.value = true
}

const handleDragLeave = (event) => {
  event.preventDefault()
  event.stopPropagation()
  // Only set to false if we're leaving the drop zone entirely
  const rect = event.currentTarget.getBoundingClientRect()
  const x = event.clientX
  const y = event.clientY
  
  if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
    isDragOver.value = false
  }
}

const handleDrop = (event) => {
  event.preventDefault()
  event.stopPropagation()
  isDragOver.value = false
  
  const files = event.dataTransfer.files
  if (files.length > 0) {
    const file = files[0]
    if (beforePhotoUpload(file)) {
      const reader = new FileReader()
      reader.onload = (e) => {
        photoPreview.value = e.target.result
        form.avatar = e.target.result
        toast.success('Photo uploaded successfully!')
      }
      reader.readAsDataURL(file)
    }
  }
}

const beforePhotoUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2
  
  if (!isImage) {
    toast.error('Avatar picture must be an image!')
    return false
  }
  if (!isLt2M) {
    toast.error('Avatar picture size cannot exceed 2MB!')
    return false
  }
  return true
}

// Form methods
const resetForm = () => {
  form.first_name = user.first_name || user.name || ''
  form.last_name = user.last_name || ''
  form.email = user.email || ''
  form.role = user.role || 'Admin'
  form.phone = user.phone || ''
  form.country = user.country || 'Pakistan'
  form.avatar = user.avatar || ''
  photoPreview.value = ''
  toast.info('Form reset to original values')
}

const resetPasswordForm = () => {
  passwordForm.currentPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
  toast.info('Password form cleared')
}

const resetNotificationForm = () => {
  notificationForm.emailNotifications = true
  notificationForm.pushNotifications = true
  notificationForm.smsNotifications = false
  notificationForm.systemUpdates = true
  notificationForm.marketingEmails = false
  toast.info('Notification preferences reset to default')
}

const saveProfile = async () => {
  if (!form.first_name.trim() || !form.email.trim()) {
    toast.error('Please fill in all required fields')
    return
  }

  loading.value = true
  
  try {
  // Here you would send the updated profile to your API
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/profile/update`, {
      ...form,
      avatar: photoPreview.value || form.avatar
    })
    
    if (response.data.success || response.data.status) {
      // Update localStorage
      const updatedUser = { ...user, ...form }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      Object.assign(user, updatedUser)
      
      toast.success('Profile updated successfully!')
    } else {
      toast.error(response.data.message || 'Failed to update profile')
    }
  } catch (error) {
    console.error('Error updating profile:', error)
    toast.error(error.response?.data?.message || 'Failed to update profile')
  } finally {
    loading.value = false
  }
}

const handleChangePassword = async () => {
  if (!isPasswordValid.value) {
    toast.error('Please check your password requirements')
    return
  }

  loading.value = true
  
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/profile/change-password`, {
      current_password: passwordForm.currentPassword,
      new_password: passwordForm.newPassword,
      confirm_password: passwordForm.confirmPassword
    })
    
    if (response.data.success || response.data.status) {
      toast.success('Password changed successfully!')
      resetPasswordForm()
    } else {
      toast.error(response.data.message || 'Failed to change password')
    }
  } catch (error) {
    console.error('Error changing password:', error)
    toast.error(error.response?.data?.message || 'Failed to change password')
  } finally {
    loading.value = false
  }
}

const saveNotificationSettings = async () => {
  loading.value = true
  
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/profile/notifications`, notificationForm)
    
    if (response.data.success || response.data.status) {
      toast.success('Notification preferences saved successfully!')
    } else {
      toast.error(response.data.message || 'Failed to save preferences')
    }
  } catch (error) {
    console.error('Error saving notification settings:', error)
    toast.error(error.response?.data?.message || 'Failed to save notification preferences')
  } finally {
    loading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
/* Professional ERP styling - exact match to other pages */
.bg-white\/90 {
  background-color: #ffffff;
}

/* Dark mode support for bg-white/90 */
.dark .bg-white\/90 {
  background-color: rgba(31, 41, 55, 0.9);
}

/* Navy color scheme - Removed hardcoded colors to allow Tailwind dark mode classes to work properly */
/* These classes are now handled by Tailwind utilities with dark mode support */

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

/* Dark mode focus styles */
.dark input:focus,
.dark select:focus,
.dark textarea:focus {
  outline-color: #a78bfa;
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

.from-red-500 {
  --tw-gradient-from: #ef4444;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(239, 68, 68, 0));
}

.to-pink-500 {
  --tw-gradient-to: #ec4899;
}

/* Form input styling */
input[type="text"],
input[type="email"],
input[type="tel"],
input[type="password"],
select {
  border: none;
  border-bottom: 2px solid #e9d5ff;
  background: transparent;
  transition: border-color 0.3s ease;
}

/* Dark mode input styling */
.dark input[type="text"],
.dark input[type="email"],
.dark input[type="tel"],
.dark input[type="password"],
.dark select {
  border-bottom-color: rgba(139, 92, 246, 0.5);
  color: #e2e8f0;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus,
input[type="password"]:focus,
select:focus {
  border-bottom-color: #8b5cf6;
  outline: none;
}

/* Dark mode focus styling */
.dark input[type="text"]:focus,
.dark input[type="email"]:focus,
.dark input[type="tel"]:focus,
.dark input[type="password"]:focus,
.dark select:focus {
  border-bottom-color: #a78bfa;
}

/* Section backgrounds - Removed to allow Tailwind dark mode classes to work */

.bg-yellow-50 {
  background-color: #fefce8;
}

/* Animation classes */
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes bounce-slow {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-3px);
  }
  60% {
    transform: translateY(-1px);
  }
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes twinkle-delay {
  0%, 100% {
    opacity: 0;
    transform: scale(0.3) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1) rotate(180deg);
  }
}

@keyframes floating {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 3s infinite;
}

.animate-twinkle {
  animation: twinkle 2s infinite;
}

.animate-twinkle-delay {
  animation: twinkle-delay 2.5s infinite 0.5s;
}

.animate-floating {
  animation: floating 3s ease-in-out infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Toggle switch styling */
.peer:checked ~ .peer-checked\:bg-purple-600 {
  background-color: #8b5cf6;
}

.peer:checked ~ .peer-checked\:after\:translate-x-full:after {
  transform: translateX(100%);
}

.peer:checked ~ .peer-checked\:after\:border-gray-200:after {
  border-color: #ffffff;
}

.peer-focus\:ring-purple-300:focus {
  box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.3);
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  
  .lg\:flex-row {
    flex-direction: row;
  }
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

/* Hide scrollbar for webkit browsers */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Custom file input styling */
input[type="file"] {
  display: none;
}

/* Enhanced avatar and upload styling */
.w-18 {
  width: 4.5rem;
}

.h-18 {
  height: 4.5rem;
}

.border-3 {
  border-width: 3px;
}

/* Glass morphism effects */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Hover scale effects */
.hover\:scale-\[1\.02\]:hover {
  transform: scale(1.02);
}

/* Filter effects */
.filter {
  filter: var(--tw-filter);
}

.group-hover\:brightness-110:hover {
  filter: brightness(1.1);
}

/* Custom gradient text */
.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
}

.text-transparent {
  color: transparent;
}

/* Enhanced button effects */
.group-hover\:animate-bounce:hover {
  animation: bounce 1s infinite;
}

.group-hover\:translate-x-0\.5:hover {
  transform: translateX(0.125rem);
}

/* Backdrop blur support */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Background clip text support */
.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
}

/* Text transparent for gradient text */
.text-transparent {
  color: transparent;
}
</style> 