<template>
  <div class="relative w-full min-h-screen pl-0 pr-0 sm:pl-0 sm:pr-0 lg:pl-1 lg:pr-0 py-2 sm:py-3 lg:py-4" key="school-profile-root">
    <!-- Top Bar Header -->
    <div class="relative z-10 w-full mt-2 mb-4 flex items-center justify-between bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200 dark:border-gray-700">
      <h2 class="text-base font-medium text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
        School Profile Setup
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-600 dark:text-gray-400">
        <span class="hover:text-pink-600 dark:hover:text-pink-400 cursor-pointer transition-colors duration-200" @click="$router.push('/dashboard')">Dashboard</span>
        <span class="mx-2 dark:text-gray-600">|</span>
        <span class="hover:text-pink-600 dark:hover:text-pink-400 cursor-pointer transition-colors duration-200">Settings</span>
        <span class="mx-2 dark:text-gray-600">|</span>
        <span class="text-gray-900 dark:text-white font-bold">School Profile</span>
      </nav>
    </div>

    <!-- Progress Indicator -->
    <div class="relative z-10 w-full mb-4 sm:mb-6">
      <div class="flex items-center justify-between bg-white/90 dark:bg-gray-800/90 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-4">
          <div class="text-sm font-medium text-gray-600 dark:text-gray-400">
            Step {{ currentStep }} of {{ totalSteps }}
          </div>
          <div class="w-40 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              class="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
            ></div>
          </div>
          <div class="text-sm font-medium text-gray-900 dark:text-white">
            {{ Math.round((currentStep / totalSteps) * 100) }}% Complete
          </div>
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          {{ stepTitles[currentStep - 1] }}
        </div>
      </div>
    </div>

    <!-- Main Form Container -->
    <div class="relative z-10 w-full">
      <div class="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        
        <!-- Step Navigation -->
        <div class="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 p-4">
          <div class="flex items-center justify-center gap-2 overflow-x-auto">
            <button
              v-for="(title, index) in stepTitles"
              :key="index"
              @click="goToStep(index + 1)"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap',
                currentStep === index + 1
                  ? 'bg-pink-500 text-white shadow-lg'
                  : currentStep > index + 1
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              ]"
              :disabled="index + 1 > currentStep && !canSkipToStep(index + 1)"
            >
              <div class="flex items-center gap-2">
                <div v-if="currentStep > index + 1" class="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                  <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span>{{ title }}</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Form Content -->
        <form @submit.prevent="handleSubmit" class="p-6 sm:p-8">
          
          <!-- Step 1: Basic Information -->
          <div v-if="currentStep === 1" class="space-y-6">
            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Basic Information</h3>
              <p class="text-gray-600 dark:text-gray-400">Let's start with your school's basic identity</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- School Name -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  School Name <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.name"
                  type="text"
                  :class="[
                    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200',
                    errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  ]"
                  placeholder="Enter your school name"
                  @input="generateCodeFromName"
                />
                <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
              </div>

              <!-- School Code -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  School Code <span class="text-red-500">*</span>
                </label>
                <div class="flex gap-2">
                  <input
                    v-model="formData.code"
                    type="text"
                    :class="[
                      'flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 uppercase',
                      errors.code ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    ]"
                    placeholder="SCHOOL01"
                    maxlength="10"
                  />
                  <button
                    type="button"
                    @click="generateCode"
                    class="px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg transition-all duration-200"
                  >
                    Generate
                  </button>
                </div>
                <p v-if="errors.code" class="text-red-500 text-sm mt-1">{{ errors.code }}</p>
                <p class="text-gray-500 text-sm mt-1">Unique identifier for your school</p>
              </div>

              <!-- School Type -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  School Type
                </label>
                <select
                  v-model="formData.school_type"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                >
                  <option value="">Select type</option>
                  <option value="school">School</option>
                  <option value="college">College</option>
                  <option value="academy">Academy</option>
                </select>
              </div>

              <!-- Tagline -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  School Tagline
                </label>
                <input
                  v-model="formData.tagline"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                  placeholder="e.g., Excellence in Education"
                  maxlength="500"
                />
                <p class="text-gray-500 text-sm mt-1">A short motto or tagline for your school</p>
              </div>

              <!-- Logo Upload -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  School Logo
                </label>
                <div class="flex items-center gap-4">
                  <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      v-if="logoPreview"
                      :src="logoPreview"
                      alt="Logo preview"
                      class="w-full h-full object-cover"
                    />
                    <svg v-else class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <input
                      ref="logoInput"
                      type="file"
                      accept="image/jpeg,image/png,image/jpg,image/gif"
                      @change="handleLogoUpload"
                      class="hidden"
                    />
                    <button
                      type="button"
                      @click="$refs.logoInput.click()"
                      class="px-4 py-2 bg-pink-100 hover:bg-pink-200 dark:bg-pink-900/20 dark:hover:bg-pink-900/30 text-pink-700 dark:text-pink-400 rounded-lg transition-all duration-200"
                    >
                      Upload Logo
                    </button>
                    <p class="text-gray-500 text-sm mt-1">Max size: 2MB. Formats: JPG, PNG, GIF</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Contact Information -->
          <div v-if="currentStep === 2" class="space-y-6">
            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Contact Information</h3>
              <p class="text-gray-600 dark:text-gray-400">How can people reach your school?</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Primary Phone -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Primary Phone <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.phone_primary"
                  type="tel"
                  :class="[
                    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200',
                    errors.phone_primary ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  ]"
                  placeholder="+92 300 1234567"
                />
                <p v-if="errors.phone_primary" class="text-red-500 text-sm mt-1">{{ errors.phone_primary }}</p>
              </div>

              <!-- Secondary Phone -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Secondary Phone
                </label>
                <input
                  v-model="formData.phone_secondary"
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                  placeholder="+92 300 1234567"
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.email"
                  type="email"
                  :class="[
                    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200',
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  ]"
                  placeholder="admin@school.edu.pk"
                />
                <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
              </div>

              <!-- Website -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Website
                </label>
                <input
                  v-model="formData.website"
                  type="url"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                  placeholder="https://www.school.edu.pk"
                />
              </div>
            </div>
          </div>

          <!-- Step 3: Address Information -->
          <div v-if="currentStep === 3" class="space-y-6">
            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Address Information</h3>
              <p class="text-gray-600 dark:text-gray-400">Where is your school located?</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Country -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Country <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.country"
                  type="text"
                  :class="[
                    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200',
                    errors.country ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  ]"
                  placeholder="Pakistan"
                />
                <p v-if="errors.country" class="text-red-500 text-sm mt-1">{{ errors.country }}</p>
              </div>

              <!-- State/Province -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  State/Province
                </label>
                <input
                  v-model="formData.state_province"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                  placeholder="Sindh"
                />
              </div>

              <!-- City -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  City <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.city"
                  type="text"
                  :class="[
                    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200',
                    errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  ]"
                  placeholder="Karachi"
                />
                <p v-if="errors.city" class="text-red-500 text-sm mt-1">{{ errors.city }}</p>
              </div>

              <!-- Postal Code -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Postal Code
                </label>
                <input
                  v-model="formData.postal_code"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                  placeholder="75300"
                />
              </div>

              <!-- Address Line 1 -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address Line 1 <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.address_line_1"
                  type="text"
                  :class="[
                    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200',
                    errors.address_line_1 ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  ]"
                  placeholder="123 Education Street"
                />
                <p v-if="errors.address_line_1" class="text-red-500 text-sm mt-1">{{ errors.address_line_1 }}</p>
              </div>

              <!-- Address Line 2 -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address Line 2
                </label>
                <input
                  v-model="formData.address_line_2"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                  placeholder="Block B, Gulshan-e-Iqbal"
                />
              </div>
            </div>
          </div>

          <!-- Step 4: Branding & Academic Settings -->
          <div v-if="currentStep === 4" class="space-y-6">
            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Branding & Academic Settings</h3>
              <p class="text-gray-600 dark:text-gray-400">Customize your school's branding and academic preferences</p>
            </div>

            <div class="space-y-6">
              <!-- Branding Colors -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Primary Color
                  </label>
                  <div class="flex items-center gap-3">
                    <input
                      v-model="formData.primary_color"
                      type="color"
                      class="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                    />
                    <input
                      v-model="formData.primary_color"
                      type="text"
                      class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      placeholder="#e91e63"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Secondary Color
                  </label>
                  <div class="flex items-center gap-3">
                    <input
                      v-model="formData.secondary_color"
                      type="color"
                      class="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                    />
                    <input
                      v-model="formData.secondary_color"
                      type="text"
                      class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      placeholder="#f8f9fa"
                    />
                  </div>
                </div>
              </div>

              <!-- Academic Settings -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Timezone -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Timezone <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="formData.timezone"
                    :class="[
                      'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200',
                      errors.timezone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    ]"
                  >
                    <option value="Asia/Karachi">Asia/Karachi</option>
                    <option value="Asia/Dubai">Asia/Dubai</option>
                    <option value="UTC">UTC</option>
                  </select>
                  <p v-if="errors.timezone" class="text-red-500 text-sm mt-1">{{ errors.timezone }}</p>
                </div>

                <!-- Currency -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Currency <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="formData.currency"
                    :class="[
                      'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200',
                      errors.currency ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    ]"
                  >
                    <option value="PKR">PKR - Pakistani Rupee</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="AED">AED - UAE Dirham</option>
                  </select>
                  <p v-if="errors.currency" class="text-red-500 text-sm mt-1">{{ errors.currency }}</p>
                </div>

                <!-- Date Format -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date Format <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="formData.date_format"
                    :class="[
                      'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200',
                      errors.date_format ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    ]"
                  >
                    <option value="d/m/Y">DD/MM/YYYY</option>
                    <option value="m/d/Y">MM/DD/YYYY</option>
                    <option value="Y-m-d">YYYY-MM-DD</option>
                    <option value="d-m-Y">DD-MM-YYYY</option>
                  </select>
                  <p v-if="errors.date_format" class="text-red-500 text-sm mt-1">{{ errors.date_format }}</p>
                </div>

                <!-- Week Start Day -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Week Start Day
                  </label>
                  <select
                    v-model="formData.week_start_day"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                  >
                    <option value="monday">Monday</option>
                    <option value="sunday">Sunday</option>
                  </select>
                </div>
              </div>

              <!-- Footer Texts -->
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Invoice Footer Text
                  </label>
                  <textarea
                    v-model="formData.invoice_footer_text"
                    rows="2"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                    placeholder="Thank you for choosing our institution"
                  ></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Report Header Text
                  </label>
                  <textarea
                    v-model="formData.report_header_text"
                    rows="2"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                    placeholder="School Name - Academic Report"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              v-if="currentStep > 1"
              type="button"
              @click="previousStep"
              class="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Previous
            </button>
            <div v-else></div>

            <div class="flex items-center gap-3">
              <!-- Save Draft Button (visible on all steps) -->
              <button
                type="button"
                @click="saveDraft"
                :disabled="loading"
                class="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                <div v-if="loading" class="flex items-center gap-2">
                  <div class="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </div>
                <span v-else>Save Draft</span>
              </button>

              <!-- Next/Complete Button -->
              <button
                v-if="currentStep < totalSteps"
                type="button"
                @click="nextStep"
                class="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                Next
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
              <button
                v-else
                type="submit"
                :disabled="loading"
                class="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                <div v-if="loading" class="flex items-center gap-2">
                  <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </div>
                <span v-else>Complete Setup</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4">
        <div class="text-center">
          <div class="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Profile Complete!</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">Your school profile has been successfully set up. You can now proceed to create academic sessions.</p>
          <button
            @click="proceedToSessions"
            class="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-lg transition-all duration-200"
          >
            Set Up Sessions
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/utils/axios'
import { getCurrentInstance } from 'vue'

export default {
  name: 'SchoolProfile',
  data() {
    return {
      currentStep: 1,
      totalSteps: 4,
      loading: false,
      showSuccessModal: false,
      stepTitles: [
        'Basic Info',
        'Contact',
        'Address', 
        'Branding & Settings'
      ],
      formData: {
        name: '',
        code: '',
        school_type: '',
        tagline: '',
        phone_primary: '',
        phone_secondary: '',
        email: '',
        website: '',
        country: 'Pakistan',
        state_province: '',
        city: '',
        address_line_1: '',
        address_line_2: '',
        postal_code: '',
        primary_color: '#e91e63',
        secondary_color: '#f8f9fa',
        invoice_footer_text: '',
        report_header_text: '',
        timezone: 'Asia/Karachi',
        currency: 'PKR',
        date_format: 'd/m/Y',
        week_start_day: 'monday',
        default_whatsapp_sender: '',
        default_sms_sender: '',
        default_email_sender_name: '',
        notification_channels_enabled: ['email']
      },
      logoFile: null,
      logoPreview: null,
      errors: {},
      originalData: null
    }
  },
  async mounted() {
    await this.loadExistingProfile()
  },
  methods: {
    getToast() {
      // Try multiple ways to get toast
      try {
        if (this.$toast) return this.$toast
        const instance = getCurrentInstance()
        if (instance && instance.appContext && instance.appContext.config && instance.appContext.config.globalProperties && instance.appContext.config.globalProperties.$toast) {
          return instance.appContext.config.globalProperties.$toast
        }
        // Try to import useToast dynamically
        const { useToast } = require('vue-toastification')
        return useToast()
      } catch (e) {
        console.warn('Toast not available:', e)
        return null
      }
    },
    async loadExistingProfile() {
      try {
        const response = await api.get('/settings/school')
        if (response.data.success && response.data.data.school) {
          const school = response.data.data.school
          this.formData = { ...this.formData, ...school }
          this.originalData = { ...this.formData }
          
          if (school.logo) {
            this.logoPreview = `/storage/${school.logo}`
          }
        }
      } catch (error) {
        console.error('Failed to load existing profile:', error)
      }
    },
    
    generateCodeFromName() {
      if (this.formData.name && !this.formData.code) {
        const code = this.formData.name
          .replace(/[^a-zA-Z0-9\s]/g, '')
          .split(' ')
          .map(word => word.substring(0, 3))
          .join('')
          .toUpperCase()
          .substring(0, 6)
        
        if (code.length >= 3) {
          this.formData.code = code + '01'
        }
      }
    },

    async generateCode() {
      if (!this.formData.name) {
        const toast = this.getToast()
        if (toast) {
          toast.error('Please enter school name first')
        } else {
          alert('Please enter school name first')
        }
        return
      }

      try {
        const response = await api.post('/settings/school/generate-code', {
          school_name: this.formData.name
        })
        
        if (response.data.success) {
          this.formData.code = response.data.data.code
        }
      } catch (error) {
        console.error('Failed to generate code:', error)
        const toast = this.getToast()
        if (toast) {
          toast.error('Failed to generate school code')
        } else {
          alert('Failed to generate school code')
        }
      }
    },

    handleLogoUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      // Validate file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        const toast = this.getToast()
        if (toast) {
          toast.error('File size must be less than 2MB')
        } else {
          alert('File size must be less than 2MB')
        }
        return
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        const toast = this.getToast()
        if (toast) {
          toast.error('Only JPEG, PNG, JPG and GIF files are allowed')
        } else {
          alert('Only JPEG, PNG, JPG and GIF files are allowed')
        }
        return
      }

      this.logoFile = file

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        this.logoPreview = e.target.result
      }
      reader.readAsDataURL(file)
    },

    validateStep(step) {
      const errors = {}

      if (step === 1) {
        if (!this.formData.name) errors.name = 'School name is required'
        if (!this.formData.code) errors.code = 'School code is required'
      }

      if (step === 2) {
        if (!this.formData.phone_primary) errors.phone_primary = 'Primary phone is required'
        if (!this.formData.email) errors.email = 'Email is required'
        if (this.formData.email && !this.isValidEmail(this.formData.email)) {
          errors.email = 'Please enter a valid email address'
        }
      }

      if (step === 3) {
        if (!this.formData.country) errors.country = 'Country is required'
        if (!this.formData.city) errors.city = 'City is required'
        if (!this.formData.address_line_1) errors.address_line_1 = 'Address is required'
      }

      if (step === 4) {
        if (!this.formData.timezone) errors.timezone = 'Timezone is required'
        if (!this.formData.currency) errors.currency = 'Currency is required'
        if (!this.formData.date_format) errors.date_format = 'Date format is required'
      }

      this.errors = errors
      return Object.keys(errors).length === 0
    },

    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },

    canSkipToStep(step) {
      // Allow skipping if we have saved data
      return this.originalData !== null
    },

    goToStep(step) {
      if (step <= this.currentStep || this.canSkipToStep(step)) {
        this.currentStep = step
        this.errors = {}
      }
    },

    nextStep() {
      if (this.validateStep(this.currentStep)) {
        this.currentStep++
        this.errors = {}
      }
    },

    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--
        this.errors = {}
      }
    },

    async saveDraft() {
      await this.saveProfile(false)
    },

    async handleSubmit() {
      if (this.validateStep(this.currentStep)) {
        await this.saveProfile(true)
      }
    },

    async saveProfile(isComplete = false) {
      this.loading = true
      this.errors = {}

      try {
        const formData = new FormData()
        
        // Add all form fields
        Object.keys(this.formData).forEach(key => {
          if (this.formData[key] !== null && this.formData[key] !== '') {
            if (key === 'notification_channels_enabled') {
              // Send array items individually for FormData
              if (Array.isArray(this.formData[key])) {
                this.formData[key].forEach((item, index) => {
                  formData.append(`${key}[${index}]`, item)
                })
              } else {
                formData.append(key, JSON.stringify(this.formData[key]))
              }
            } else {
              formData.append(key, this.formData[key])
            }
          }
        })

        // Add logo file if selected
        if (this.logoFile) {
          formData.append('logo', this.logoFile)
        }

        const response = await api.post('/settings/school', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        if (response.data && response.data.success) {
          const message = response.data.message || (isComplete ? 'School profile completed successfully!' : 'Profile saved as draft')
          
          // Use toast
          const toast = this.getToast()
          if (toast) {
            toast.success(message)
          } else {
            console.log('Success:', message)
            alert(message)
          }
          
          if (isComplete) {
            this.showSuccessModal = true
          }
          
          // Update original data
          this.originalData = { ...this.formData }
        } else {
          const errorMsg = response.data?.message || 'Failed to save profile'
          const toast = this.getToast()
          if (toast) {
            toast.error(errorMsg)
          } else {
            console.error('Error:', errorMsg)
            alert(errorMsg)
          }
        }
      } catch (error) {
        console.error('Save error:', error)
        
        if (error.response && error.response.data) {
          const responseData = error.response.data
          
          // Handle validation errors
          if (responseData.errors) {
            this.errors = responseData.errors
            
            // Show first validation error in toast
            const firstError = Object.values(responseData.errors)[0]
            let errorMessage = 'Validation failed'
            
            if (firstError && Array.isArray(firstError) && firstError.length > 0) {
              errorMessage = firstError[0]
            } else if (firstError) {
              errorMessage = firstError
            } else if (responseData.message) {
              errorMessage = responseData.message
            }
            
            // Use toast
            const toast = this.getToast()
            if (toast) {
              toast.error(errorMessage)
            } else {
              console.error('Validation Error:', errorMessage)
              alert(errorMessage)
            }
          } else {
            // Show general error message
            const errorMessage = responseData.message || 'Failed to save profile'
            const toast = this.getToast()
            if (toast) {
              toast.error(errorMessage)
            } else {
              console.error('Error:', errorMessage)
              alert(errorMessage)
            }
          }
        } else {
          const errorMessage = 'Failed to save profile. Please try again.'
          const toast = this.getToast()
          if (toast) {
            toast.error(errorMessage)
          } else {
            console.error('Error:', errorMessage)
            alert(errorMessage)
          }
        }
      } finally {
        this.loading = false
      }
    },

    proceedToSessions() {
      this.showSuccessModal = false
      this.$router.push('/settings/sessions')
    }
  }
}
</script>

<style scoped>
/* Add any custom styles if needed */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>