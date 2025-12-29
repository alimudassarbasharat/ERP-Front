<template>
  <div class="relative w-full min-h-screen pl-0 pr-0 sm:pl-0 sm:pr-0 lg:pl-1 lg:pr-0 py-2 sm:py-3 lg:py-4">
    
    <!-- Header Section with Navigation -->
    <div class="relative z-10 mb-6 rounded-xl border border-gray-200/50 bg-white/60 px-6 py-4 shadow-lg backdrop-filter backdrop-blur-xl flex items-center justify-between">
      <h2 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        {{ route.params.id ? 'Edit Teacher' : 'Add New Teacher' }}
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
        <button @click="goToTeacherList" class="hover:text-purple-600 cursor-pointer transition-colors duration-200">
          Faculty
        </button>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">{{ route.params.id ? 'Edit' : 'Add' }}</span>
      </nav>
    </div>

    <!-- Mode Toggle Section -->
    <div class="relative z-10 mb-6" v-if="!route.params.id">
      <div class="bg-white/90 rounded-lg shadow-lg p-6 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-1">Registration Mode</h3>
            <p class="text-sm text-gray-600">Choose how you want to add teachers</p>
          </div>
          <div class="flex bg-white rounded-full p-1">
            <button 
              @click="setMode(false)"
              :class="[
                'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300',
                !isMultipleMode 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                  : 'text-gray-900 hover:text-gray-900'
              ]"
            >
              <svg class="w-4 h-4 mr-2 inline-block" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              Single Teacher
            </button>
            <button 
              @click="setMode(true)"
              :class="[
                'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300',
                isMultipleMode 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                  : 'text-gray-900 hover:text-gray-900'
              ]"
            >
              <svg class="w-4 h-4 mr-2 inline-block" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              Multiple Teachers
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Indicator (Only for Single Mode) -->
    <div v-if="!isMultipleMode" class="relative z-10 mb-6">
      <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 p-4">
        <div class="relative">
          <div class="flex items-center justify-between">
            <div v-for="(step, index) in steps" :key="index" class="flex flex-col items-center relative z-10">
              <div 
                :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 transform',
                  currentStep > index 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md scale-105' 
                    : currentStep === index 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md scale-105' 
                      : 'bg-white text-gray-500 border-2 border-gray-200 shadow-sm'
                ]"
              >
                <svg v-if="currentStep > index" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
                <span v-else class="text-sm font-semibold">{{ index + 1 }}</span>
              </div>
              <span :class="['text-xs font-medium mt-2 transition-colors duration-300', currentStep >= index ? 'text-indigo-600' : 'text-gray-500']">
                {{ step.title }}
              </span>
            </div>
          </div>
          <!-- Progress Line -->
          <div class="absolute top-5 left-5 right-5 h-0.5 bg-gray-300 rounded-full -z-0">
            <div 
              class="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-500 ease-in-out"
              :style="{ width: `${(currentStep / (steps.length - 1)) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Validation Error Message -->
    <div v-if="showValidationError" class="relative z-10 mb-6">
      <div class="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 animate-pulse">
        <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 13.5c-.77.833-.192 2.5 1.732 2.5z"/>
        </svg>
        <div>
          <h4 class="text-red-800 font-semibold">Please fill all required fields</h4>
          <p class="text-red-700 text-sm">Complete the marked fields before proceeding to the next step.</p>
        </div>
      </div>
    </div>

    <!-- Single Teacher Form -->
    <div v-if="!isMultipleMode" class="relative z-10">
      <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <!-- Step Content -->
        <div class="p-8">
            <form @submit.prevent="submitForm">
            
            <!-- Step 1: Personal Information -->
            <div v-show="currentStep === 0" class="space-y-6">
              <!-- Header and Profile Photo Row -->
              <div class="flex flex-col lg:flex-row items-start gap-8 mb-8">
                <!-- Left Side: Heading -->
                <div class="flex-1">
                  <h2 class="text-base font-medium text-gray-900 mb-1 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">Personal Information</h2>
                  <p class="text-gray-600 text-sm">Let's start with basic personal details</p>
                </div>

                <!-- Right Side: Profile Photo Upload with Zoom -->
                <div class="flex-shrink-0 lg:mr-8">
                    <div class="relative">
                    <!-- Profile Photo Container -->
                    <div class="w-32 h-32 rounded-full border-4 border-gray-200 overflow-hidden bg-white flex items-center justify-center relative group cursor-pointer hover:border-indigo-400 transition-all duration-300 hover:shadow-lg hover:scale-105">
                      <img v-if="photoPreview" 
                           :src="photoPreview" 
                           alt="Profile" 
                           class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                           @click="openImageModal"
                           style="cursor: zoom-in;">
                      <div v-else class="text-center animate-pulse">
                        <svg class="w-12 h-12 text-gray-500 mx-auto mb-1 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/>
                        </svg>
                        <p class="text-xs text-gray-500 font-medium">Upload Photo</p>
                    </div>
                      <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/50 to-purple-500/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                        <div class="text-center">
                          <svg class="w-6 h-6 text-white mx-auto mb-1 animate-bounce" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                          </svg>
                          <p class="text-white text-xs font-medium">{{ photoPreview ? 'Change' : 'Upload' }}</p>
                  </div>
                      </div>
                    </div>
                    <input type="file" @change="handlePhotoChange" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                    
                    <!-- Remove Button with Animation -->
                    <button v-if="photoPreview" 
                            @click="removePhoto" 
                            type="button" 
                            class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-200 hover:scale-110 hover:rotate-90 shadow-lg">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>

                    <!-- Zoom Indicator -->
                    <div v-if="photoPreview" class="absolute -bottom-2 -right-2 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg animate-pulse">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                      </svg>
                    </div>
                  </div>
                  <!-- Profile Picture Error Message -->
                  <p v-if="validationErrors.profile_picture" class="text-red-500 text-xs mt-2 text-center animate-shake">{{ validationErrors.profile_picture }}</p>
                    </div>
                  </div>

              <!-- Personal Details Form -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="filter-input-group">
                  <label class="filter-label">First Name *</label>
                  <div class="filter-input-container">
                    <input v-model="formData.first_name" type="text" :class="['filter-input', validationErrors.first_name ? 'border-red-500 text-red-600' : '']" placeholder="Enter first name" required @input="clearValidationError('first_name')">
                    <div :class="['filter-underline', validationErrors.first_name ? 'bg-red-500' : '']"></div>
                    </div>
                  <p v-if="validationErrors.first_name" class="text-red-500 text-xs mt-1">{{ validationErrors.first_name }}</p>
                  </div>

                <div class="filter-input-group">
                  <label class="filter-label">Last Name *</label>
                  <div class="filter-input-container">
                    <input v-model="formData.last_name" type="text" :class="['filter-input', validationErrors.last_name ? 'border-red-500 text-red-600' : '']" placeholder="Enter last name" required>
                    <div :class="['filter-underline', validationErrors.last_name ? 'bg-red-500' : '']"></div>
                  </div>
                  <p v-if="validationErrors.last_name" class="text-red-500 text-xs mt-1">{{ validationErrors.last_name }}</p>
                </div>

                <div class="filter-input-group">
                  <label class="filter-label">Employee Code *</label>
                  <div class="filter-input-container">
                    <input v-model="formData.employee_code" type="text" :class="['filter-input', validationErrors.employee_code ? 'border-red-500 text-red-600' : '']" placeholder="Enter employee code" required>
                    <div :class="['filter-underline', validationErrors.employee_code ? 'bg-red-500' : '']"></div>
                  </div>
                  <p v-if="validationErrors.employee_code" class="text-red-500 text-xs mt-1">{{ validationErrors.employee_code }}</p>
                </div>

                <div class="filter-input-group">
                  <label class="filter-label">Gender *</label>
                  <div class="filter-input-container">
                    <select v-model="formData.gender" :class="['filter-input appearance-none pr-8', validationErrors.gender ? 'border-red-500 text-red-600' : '']" required @change="clearValidationError('gender')">
                      <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                        </svg>
              </div>
                    <div :class="['filter-underline', validationErrors.gender ? 'bg-red-500' : '']"></div>
                    </div>
                  <p v-if="validationErrors.gender" class="text-red-500 text-xs mt-1">{{ validationErrors.gender }}</p>
                  </div>

                <div class="filter-input-group">
                  <label class="filter-label">CNIC Number *</label>
                  <div class="filter-input-container">
                    <input v-model="formData.cnic" type="text" :class="['filter-input', validationErrors.cnic ? 'border-red-500 text-red-600' : '']" placeholder="00000-0000000-0" required @input="clearValidationError('cnic')">
                    <div :class="['filter-underline', validationErrors.cnic ? 'bg-red-500' : '']"></div>
                    </div>
                  <p v-if="validationErrors.cnic" class="text-red-500 text-xs mt-1">{{ validationErrors.cnic }}</p>
                  </div>

                <div class="filter-input-group">
                  <label class="filter-label">Date of Birth</label>
                  <div class="filter-input-container">
                    <CompactDatePicker v-model="formData.date_of_birth" placeholder="" />
                    <div :class="['filter-underline', validationErrors.date_of_birth ? 'bg-red-500' : '']"></div>
                    </div>
                  <p v-if="validationErrors.date_of_birth" class="text-red-500 text-xs mt-1">{{ validationErrors.date_of_birth }}</p>
                </div>

                <div class="filter-input-group">
                  <label class="filter-label">Religion</label>
                  <div class="filter-input-container">
                    <select v-model="formData.religion" class="filter-input appearance-none pr-8">
                      <option value="">Select Religion</option>
                      <option value="Islam">Islam</option>
                      <option value="Christianity">Christianity</option>
                      <option value="Hinduism">Hinduism</option>
                      <option value="Other">Other</option>
                    </select>
                    <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                        </svg>
                    </div>
                    <div class="filter-underline"></div>
                  </div>
                </div>
              </div>
              </div>

            <!-- Step 2: Contact Information -->
            <div v-show="currentStep === 1" class="space-y-6">
              <div class="text-center mb-6">
                <h2 class="text-base font-medium text-gray-900 mb-1 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">Contact Information</h2>
                <p class="text-gray-600 text-sm">How can we reach you?</p>
                  </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="filter-input-group">
                  <label class="filter-label">Email Address *</label>
                  <div class="filter-input-container">
                    <input v-model="formData.email" type="email" :class="['filter-input', validationErrors.email ? 'border-red-500 text-red-600' : '']" placeholder="teacher@example.com" required>
                    <div :class="['filter-underline', validationErrors.email ? 'bg-red-500' : '']"></div>
                    </div>
                  <p v-if="validationErrors.email" class="text-red-500 text-xs mt-1">{{ validationErrors.email }}</p>
                  </div>

                <div class="filter-input-group">
                  <label class="filter-label">Phone Number *</label>
                  <div class="filter-input-container">
                    <input v-model="formData.phone_number" type="tel" :class="['filter-input', validationErrors.phone_number ? 'border-red-500 text-red-600' : '']" placeholder="+92 300 1234567" required>
                    <div :class="['filter-underline', validationErrors.phone_number ? 'bg-red-500' : '']"></div>
                    </div>
                  <p v-if="validationErrors.phone_number" class="text-red-500 text-xs mt-1">{{ validationErrors.phone_number }}</p>
                  </div>

                <div class="filter-input-group">
                  <label class="filter-label">City</label>
                  <div class="filter-input-container">
                    <input v-model="formData.city" type="text" :class="['filter-input', validationErrors.city ? 'border-red-500 text-red-600' : '']" placeholder="Enter city">
                    <div :class="['filter-underline', validationErrors.city ? 'bg-red-500' : '']"></div>
                    </div>
                  <p v-if="validationErrors.city" class="text-red-500 text-xs mt-1">{{ validationErrors.city }}</p>
                  </div>

                <div class="filter-input-group">
                  <label class="filter-label">Province</label>
                  <div class="filter-input-container">
                    <select v-model="formData.province" class="filter-input appearance-none pr-8">
                      <option value="">Select Province</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Sindh">Sindh</option>
                        <option value="KPK">KPK</option>
                        <option value="Balochistan">Balochistan</option>
                        <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                        <option value="AJK">AJK</option>
                        <option value="Islamabad">Islamabad</option>
                      </select>
                      <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                        </svg>
              </div>
                    <div class="filter-underline"></div>
                    </div>
                  </div>
                </div>

              <!-- Address (Full Width) -->
              <div class="filter-input-group">
                <label class="filter-label">Address</label>
                <div class="filter-input-container">
                  <textarea v-model="formData.address" :class="['filter-input', validationErrors.address ? 'border-red-500 text-red-600' : '']" rows="3" placeholder="Enter complete address"></textarea>
                  <div :class="['filter-underline', validationErrors.address ? 'bg-red-500' : '']"></div>
                </div>
                <p v-if="validationErrors.address" class="text-red-500 text-xs mt-1">{{ validationErrors.address }}</p>
                </div>
              </div>

            <!-- Step 3: Professional Information -->
            <div v-show="currentStep === 2" class="space-y-6">
              <div class="text-center mb-6">
                <h2 class="text-base font-medium text-gray-900 mb-1 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">Professional Information</h2>
                <p class="text-gray-600 text-sm">Professional details and qualifications</p>
                </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="filter-input-group">
                  <label class="filter-label">Designation *</label>
                  <div class="filter-input-container">
                    <select v-model="formData.designation" :class="['filter-input appearance-none pr-8', validationErrors.designation ? 'border-red-500 text-red-600' : '']" required>
                      <option value="">Select Designation</option>
                        <option value="teacher">Teacher</option>
                        <option value="principal">Principal</option>
                        <option value="vice_principal">Vice Principal</option>
                        <option value="head_teacher">Head Teacher</option>
                        <option value="assistant_teacher">Assistant Teacher</option>
                      </select>
                      <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                        </svg>
                      </div>
                    <div :class="['filter-underline', validationErrors.designation ? 'bg-red-500' : '']"></div>
                    </div>
                  <p v-if="validationErrors.designation" class="text-red-500 text-xs mt-1">{{ validationErrors.designation }}</p>
                  </div>

                <div class="filter-input-group">
                  <label class="filter-label">Department</label>
                  <div class="filter-input-container">
                    <select v-model="formData.department" :class="['filter-input appearance-none pr-8', validationErrors.department ? 'border-red-500 text-red-600' : '']">
                      <option value="">Select Department</option>
                        <option v-for="dept in departments" :key="dept.id" :value="dept.id">{{ dept.name }}</option>
                      </select>
                      <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                        </svg>
                      </div>
                    <div :class="['filter-underline', validationErrors.department ? 'bg-red-500' : '']"></div>
                    </div>
                  <p v-if="validationErrors.department" class="text-red-500 text-xs mt-1">{{ validationErrors.department }}</p>
                  </div>

                <div class="filter-input-group">
                  <label class="filter-label">Qualification</label>
                  <div class="filter-input-container">
                    <select v-model="formData.qualification" class="filter-input appearance-none pr-8">
                      <option value="">Select Qualification</option>
                        <option value="bachelor">Bachelor's Degree</option>
                        <option value="master">Master's Degree</option>
                        <option value="phd">PhD</option>
                        <option value="diploma">Diploma</option>
                      </select>
                      <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                        </svg>
                      </div>
                    <div class="filter-underline"></div>
                    </div>
                  </div>

                <div class="filter-input-group">
                  <label class="filter-label">Years of Experience</label>
                  <div class="filter-input-container">
                    <input v-model.number="formData.years_of_experience" type="number" :class="['filter-input', validationErrors.years_of_experience ? 'border-red-500 text-red-600' : '']" placeholder="Enter years of experience" min="0" max="50">
                    <div :class="['filter-underline', validationErrors.years_of_experience ? 'bg-red-500' : '']"></div>
                    </div>
                  <p v-if="validationErrors.years_of_experience" class="text-red-500 text-xs mt-1">{{ validationErrors.years_of_experience }}</p>
                  </div>

                <div class="filter-input-group">
                  <label class="filter-label">Joining Date</label>
                  <div class="filter-input-container">
                    <CompactDatePicker v-model="formData.joining_date" placeholder="" />
                    <div :class="['filter-underline', validationErrors.joining_date ? 'bg-red-500' : '']"></div>
                    </div>
                  <p v-if="validationErrors.joining_date" class="text-red-500 text-xs mt-1">{{ validationErrors.joining_date }}</p>
                  </div>

                <div class="filter-input-group">
                  <label class="filter-label">Salary</label>
                  <div class="filter-input-container">
                    <input v-model.number="formData.salary" type="number" :class="['filter-input', validationErrors.salary ? 'border-red-500 text-red-600' : '']" placeholder="Enter salary amount" min="0" step="0.01">
                    <div :class="['filter-underline', validationErrors.salary ? 'bg-red-500' : '']"></div>
                    </div>
                  <p v-if="validationErrors.salary" class="text-red-500 text-xs mt-1">{{ validationErrors.salary }}</p>
                  </div>
                </div>
              </div>

            <!-- Step 4: Additional Information -->
            <div v-show="currentStep === 3" class="space-y-6">
              <div class="text-center mb-6">
                <h2 class="text-base font-medium text-gray-900 mb-1 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">Additional Information</h2>
                <p class="text-gray-600 text-sm">Account information and additional details</p>
          </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="filter-input-group">
                  <label class="filter-label">Username</label>
                  <div class="filter-input-container">
                    <input v-model="formData.username" type="text" :class="['filter-input', validationErrors.username ? 'border-red-500 text-red-600' : '']" placeholder="Enter username">
                    <div :class="['filter-underline', validationErrors.username ? 'bg-red-500' : '']"></div>
              </div>
                  <p v-if="validationErrors.username" class="text-red-500 text-xs mt-1">{{ validationErrors.username }}</p>
                  </div>

                <div class="filter-input-group">
                  <label class="filter-label">Password</label>
                  <div class="filter-input-container">
                    <input v-model="formData.password" :type="showPassword ? 'text' : 'password'" :class="['filter-input pr-10', validationErrors.password ? 'border-red-500 text-red-600' : '']" placeholder="Enter password">
                      <button
                        type="button"
                        @click="showPassword = !showPassword"
                        class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600 focus:outline-none transition-colors duration-200"
                      >
                        <svg v-if="showPassword" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                          <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                        </svg>
                        <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"/>
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                        </svg>
                      </button>
                    <div :class="['filter-underline', validationErrors.password ? 'bg-red-500' : '']"></div>
                    </div>
                  <p v-if="validationErrors.password" class="text-red-500 text-xs mt-1">{{ validationErrors.password }}</p>
              </div>

                <div class="filter-input-group">
                  <label class="filter-label">Status</label>
                  <div class="filter-input-container">
                    <select v-model="formData.status" class="filter-input appearance-none pr-8">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="on_leave">On Leave</option>
                      </select>
                      <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                        </svg>
                      </div>
                    <div class="filter-underline"></div>
                  </div>
                    </div>
                  </div>

              <!-- Remarks (Full Width) -->
              <div class="filter-input-group">
                <label class="filter-label">Remarks</label>
                <div class="filter-input-container">
                  <textarea v-model="formData.remarks" :class="['filter-input', validationErrors.remarks ? 'border-red-500 text-red-600' : '']" rows="3" placeholder="Enter any additional remarks"></textarea>
                  <div :class="['filter-underline', validationErrors.remarks ? 'bg-red-500' : '']"></div>
                      </div>
                <p v-if="validationErrors.remarks" class="text-red-500 text-xs mt-1">{{ validationErrors.remarks }}</p>
                    </div>
                  </div>

          </form>
            </div>

        <!-- Navigation Buttons -->
        <div class="bg-white px-8 py-6 border-t border-gray-200 flex justify-between items-center">
                <button
                  v-if="currentStep > 0"
                  @click="prevStep"
            type="button"
            class="h-9 px-8 rounded-full bg-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 text-gray-900 hover:text-white text-sm font-bold border border-gray-200 hover:border-transparent transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
                  </svg>
                  Previous
                </button>
                <div v-else></div>

          <div class="flex space-x-3">
                <button
                  v-if="currentStep < steps.length - 1"
                  @click="nextStep"
              type="button"
              class="h-9 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-white hover:from-gray-100 hover:to-gray-200 text-white hover:text-gray-900 text-sm font-bold shadow hover:shadow-none border-0 hover:border hover:border-gray-200 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
                  Next
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
                <button
                  v-else
              @click="submitForm"
              type="button"
              class="h-9 px-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-sm font-bold text-white shadow hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  :disabled="loading"
                >
              <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                  {{ route.params.id ? 'Update Teacher' : 'Register Teacher' }}
                </button>
            </div>
          </div>
        </div>
      </div>

    <!-- Multiple Teachers Form -->
    <div v-else class="w-full">
      <div class="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-base font-medium text-white mb-1 tracking-tight">Add Multiple Teachers</h2>
              <p class="text-indigo-100 text-sm">Add teachers quickly with essential information only</p>
            </div>
            <button @click="addNewTeacherForm" class="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
              </svg>
              Add Teacher
            </button>
          </div>
        </div>

        <!-- Teachers Forms -->
        <div class="p-8 space-y-8">
          <div v-for="(teacher, index) in multipleTeachers" :key="index" class="border border-gray-200 rounded-xl p-6 relative">
            <!-- Teacher Form Header -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {{ index + 1 }}
                </div>
                <div>
                  <h3 class="text-base font-medium text-gray-900 tracking-tight">Teacher {{ index + 1 }}</h3>
                  <p class="text-sm text-gray-600">Essential information required</p>
                </div>
              </div>
              <button 
                v-if="multipleTeachers.length > 1"
                @click="removeTeacherForm(index)" 
                class="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                title="Remove Teacher"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>

            <!-- Form Fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Personal Info -->
              <div class="filter-input-group">
                <label class="filter-label">First Name *</label>
                <div class="filter-input-container">
                  <input v-model="teacher.first_name" type="text" :class="['filter-input', validationErrors[index]?.first_name ? 'border-red-500 text-red-600' : '']" placeholder="Enter first name" required>
                  <div :class="['filter-underline', validationErrors[index]?.first_name ? 'bg-red-500' : '']"></div>
                </div>
                <p v-if="validationErrors[index]?.first_name" class="text-red-500 text-xs mt-1">{{ validationErrors[index].first_name }}</p>
              </div>

              <div class="filter-input-group">
                <label class="filter-label">Last Name *</label>
                <div class="filter-input-container">
                  <input v-model="teacher.last_name" type="text" :class="['filter-input', validationErrors[index]?.last_name ? 'border-red-500 text-red-600' : '']" placeholder="Enter last name" required>
                  <div :class="['filter-underline', validationErrors[index]?.last_name ? 'bg-red-500' : '']"></div>
                </div>
                <p v-if="validationErrors[index]?.last_name" class="text-red-500 text-xs mt-1">{{ validationErrors[index].last_name }}</p>
              </div>

              <div class="filter-input-group">
                <label class="filter-label">Employee Code *</label>
                <div class="filter-input-container">
                  <input v-model="teacher.employee_code" type="text" :class="['filter-input', validationErrors[index]?.employee_code ? 'border-red-500 text-red-600' : '']" placeholder="Enter employee code" required>
                  <div :class="['filter-underline', validationErrors[index]?.employee_code ? 'bg-red-500' : '']"></div>
                </div>
                <p v-if="validationErrors[index]?.employee_code" class="text-red-500 text-xs mt-1">{{ validationErrors[index].employee_code }}</p>
              </div>

              <!-- Professional Info -->
              <div class="filter-input-group">
                <label class="filter-label">Designation *</label>
                <div class="filter-input-container">
                  <select v-model="teacher.designation" :class="['filter-input appearance-none pr-8', validationErrors[index]?.designation ? 'border-red-500 text-red-600' : '']" required>
                    <option value="">Select Designation</option>
                    <option value="teacher">Teacher</option>
                    <option value="principal">Principal</option>
                    <option value="vice_principal">Vice Principal</option>
                    <option value="head_teacher">Head Teacher</option>
                    <option value="assistant_teacher">Assistant Teacher</option>
                  </select>
                  <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                    </svg>
                  </div>
                  <div :class="['filter-underline', validationErrors[index]?.designation ? 'bg-red-500' : '']"></div>
                </div>
                <p v-if="validationErrors[index]?.designation" class="text-red-500 text-xs mt-1">{{ validationErrors[index].designation }}</p>
              </div>

              <div class="filter-input-group">
                <label class="filter-label">Phone Number *</label>
                <div class="filter-input-container">
                  <input v-model="teacher.phone_number" type="tel" :class="['filter-input', validationErrors[index]?.phone_number ? 'border-red-500 text-red-600' : '']" placeholder="+92 300 1234567" required>
                  <div :class="['filter-underline', validationErrors[index]?.phone_number ? 'bg-red-500' : '']"></div>
                </div>
                <p v-if="validationErrors[index]?.phone_number" class="text-red-500 text-xs mt-1">{{ validationErrors[index].phone_number }}</p>
              </div>

              <div class="filter-input-group">
                <label class="filter-label">Email *</label>
                <div class="filter-input-container">
                  <input v-model="teacher.email" type="email" :class="['filter-input', validationErrors[index]?.email ? 'border-red-500 text-red-600' : '']" placeholder="teacher@example.com" required>
                  <div :class="['filter-underline', validationErrors[index]?.email ? 'bg-red-500' : '']"></div>
                </div>
                <p v-if="validationErrors[index]?.email" class="text-red-500 text-xs mt-1">{{ validationErrors[index].email }}</p>
              </div>

              <!-- CNIC -->
              <div class="filter-input-group">
                <label class="filter-label">CNIC *</label>
                <div class="filter-input-container">
                  <input v-model="teacher.cnic" type="text" :class="['filter-input', validationErrors[index]?.cnic ? 'border-red-500 text-red-600' : '']" placeholder="00000-0000000-0" required>
                  <div :class="['filter-underline', validationErrors[index]?.cnic ? 'bg-red-500' : '']"></div>
                </div>
                <p v-if="validationErrors[index]?.cnic" class="text-red-500 text-xs mt-1">{{ validationErrors[index].cnic }}</p>
              </div>

              <div class="filter-input-group">
                <label class="filter-label">Gender *</label>
                <div class="filter-input-container">
                  <select v-model="teacher.gender" :class="['filter-input appearance-none pr-8', validationErrors[index]?.gender ? 'border-red-500 text-red-600' : '']" required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                    </svg>
                  </div>
                  <div :class="['filter-underline', validationErrors[index]?.gender ? 'bg-red-500' : '']"></div>
                </div>
                <p v-if="validationErrors[index]?.gender" class="text-red-500 text-xs mt-1">{{ validationErrors[index].gender }}</p>
              </div>
            </div>

            <!-- Address (Full Width) -->
            <div class="mt-6">
              <div class="filter-input-group">
                <label class="filter-label">Address</label>
                <div class="filter-input-container">
                  <textarea v-model="teacher.address" :class="['filter-input', validationErrors[index]?.address ? 'border-red-500 text-red-600' : '']" rows="2" placeholder="Enter complete address"></textarea>
                  <div :class="['filter-underline', validationErrors[index]?.address ? 'bg-red-500' : '']"></div>
                </div>
                <p v-if="validationErrors[index]?.address" class="text-red-500 text-xs mt-1">{{ validationErrors[index].address }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Multiple Teachers Actions -->
        <div class="bg-white px-8 py-6 border-t border-gray-200 flex justify-between items-center">
          <div class="text-sm text-gray-600">
            Total Teachers: <span class="font-semibold text-indigo-600">{{ multipleTeachers.length }}</span>
          </div>
          <div class="flex space-x-3">
            <button @click="addNewTeacherForm" type="button" class="h-9 px-8 rounded-full bg-white hover:bg-white text-gray-900 text-sm font-bold border border-gray-200 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
              </svg>
              Add Another
            </button>
            <button @click="submitMultipleTeachers" type="button" class="h-9 px-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-sm font-bold text-white shadow hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" :disabled="loading">
              <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              Register All Teachers
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="relative z-10" @click.self="showSuccessModal = false">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        <div class="w-full">
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-2">Success!</h3>
            <p class="text-sm text-gray-500 mb-6">
              {{ route.params.id ? 'Teacher information has been updated successfully.' : 
                 isMultipleMode ? `All ${multipleTeachers.length} teachers have been registered successfully!` : 
                 'Teacher has been registered successfully.' }}
            </p>
            <div class="flex justify-center space-x-3">
              <button @click="goToTeacherList" class="h-9 px-8 rounded-full bg-white hover:bg-white text-gray-900 text-sm font-bold border border-gray-200 transition-all duration-300 transform hover:scale-105">Go to Faculty List</button>
              <button v-if="!route.params.id" @click="resetForm" class="h-9 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">Add Another Teacher</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Zoom Modal -->
    <div v-if="showImageModal" class="relative z-10 bg-white rounded-lg shadow-xl border border-gray-200" @click.self="closeImageModal">
      <div class="w-full" @click.stop>
        <!-- Close Button -->
        <button @click="closeImageModal" class="absolute -top-4 -right-4 w-12 h-12 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 hover:scale-110 shadow-lg z-20">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <!-- Zoom Controls -->
        <div class="absolute top-4 left-4 flex flex-col gap-3 z-20">
          <button @click="zoomIn" class="w-12 h-12 bg-white/95 text-gray-900 rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 hover:scale-110 shadow-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
            </svg>
          </button>
          <button @click="zoomOut" class="w-12 h-12 bg-white/95 text-gray-900 rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 hover:scale-110 shadow-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6"/>
            </svg>
          </button>
          <button @click="resetZoom" class="w-12 h-12 bg-white/95 text-gray-900 rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 hover:scale-110 shadow-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
            </svg>
          </button>
        </div>

        <!-- Zoom Level Indicator -->
        <div class="absolute top-4 right-4 bg-white/95 px-4 py-2 rounded-full text-lg font-bold text-gray-900 shadow-lg z-20">
          {{ Math.round(zoomLevel * 100) }}%
        </div>

        <!-- Navigation Instructions -->
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 px-6 py-3 rounded-full text-sm font-medium text-gray-900 shadow-lg z-20">
          <div class="flex items-center gap-4 text-center">
            <span>🖱️ Mouse Wheel: Zoom</span>
            <span>⬅️➡️⬆️⬇️ Arrow Keys: Scroll</span>
            <span>ESC: Close</span>
          </div>
        </div>

        <!-- Image Container -->
        <div ref="imageContainer" 
             class="relative overflow-hidden rounded-lg shadow-2xl bg-white"
             @wheel.prevent="handleWheel"
             @mousedown.prevent="startDrag"
             @mousemove="drag"
             @mouseup="endDrag"
             @mouseleave="endDrag"
             style="width: 80vw; height: 80vh; max-width: 1000px; max-height: 700px;">
          <img ref="zoomImage" 
               :src="photoPreview" 
               alt="Profile Preview" 
               class="absolute top-1/2 left-1/2 select-none transition-transform duration-150 ease-out"
               :style="{ 
                 transform: `translate(-50%, -50%) translate(${panX}px, ${panY}px) scale(${zoomLevel})`,
                 transformOrigin: 'center center',
                 cursor: isDragging ? 'grabbing' : 'grab',
                 maxWidth: 'none',
                 maxHeight: 'none'
               }"
               draggable="false">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import api from '@/utils/axios'

const route = useRoute()
const router = useRouter()
const toast = useToast()

// Use centralized axios instance
const axios = api

// Reactive data
const loading = ref(false)
const showValidationError = ref(false)
const showSuccessModal = ref(false)
const currentStep = ref(0)
const photoPreview = ref('')
const showPassword = ref(false)
const departments = ref([])
const validationErrors = ref({})

// Multiple Teachers Mode
const isMultipleMode = ref(false)
const multipleTeachers = ref([])

// Image zoom modal state
const showImageModal = ref(false)
const zoomLevel = ref(1)
const panX = ref(0)
const panY = ref(0)
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const imageContainer = ref(null)
const zoomImage = ref(null)

// Steps configuration
const steps = [
  { title: 'Personal', icon: 'user' },
  { title: 'Contact', icon: 'phone' },
  { title: 'Professional', icon: 'book' },
  { title: 'Additional', icon: 'users' }
]

// Form data
const formData = reactive({
  // Personal Information
  first_name: '',
  last_name: '',
  employee_code: '',
  gender: '',
  cnic: '',
  date_of_birth: '',
  profile_picture: '',
  religion: '',

  // Contact Information
  email: '',
  phone_number: '',
  address: '',
  city: '',
  province: '',

  // Professional Information
  designation: '',
  department: '',
  qualification: '',
  years_of_experience: 0,
  joining_date: '',
  salary: 0,

  // Additional Information
  username: '',
  password: '',
  status: 'active',
  remarks: ''
})

// Methods
const setMode = (multiple) => {
  isMultipleMode.value = multiple
  if (multiple) {
    // Initialize with one teacher form
    multipleTeachers.value = [createEmptyTeacher()]
  }
}

// Create empty teacher object with only required fields
const createEmptyTeacher = () => ({
  first_name: '',
  last_name: '',
  employee_code: '',
  designation: '',
  phone_number: '',
  email: '',
  cnic: '',
  gender: '',
  address: ''
})

const addNewTeacherForm = () => {
  multipleTeachers.value.push(createEmptyTeacher())
}

const removeTeacherForm = (index) => {
  if (multipleTeachers.value.length > 1) {
    multipleTeachers.value.splice(index, 1)
  }
}

const validateMultipleTeachers = () => {
  const errors = {}
  let isValid = true
  
  for (let i = 0; i < multipleTeachers.value.length; i++) {
    const teacher = multipleTeachers.value[i]
    const teacherErrors = {}
    
    // Required field validations
    if (!teacher.first_name) {
      teacherErrors.first_name = 'First Name is required'
      isValid = false
    } else if (!validateName(teacher.first_name)) {
      teacherErrors.first_name = 'First Name should contain only letters (2-50 characters)'
      isValid = false
    }
    
    if (!teacher.last_name) {
      teacherErrors.last_name = 'Last Name is required'
      isValid = false
    } else if (!validateName(teacher.last_name)) {
      teacherErrors.last_name = 'Last Name should contain only letters (2-50 characters)'
      isValid = false
    }
    
    if (!teacher.employee_code) {
      teacherErrors.employee_code = 'Employee Code is required'
      isValid = false
    }
    
    if (!teacher.designation) {
      teacherErrors.designation = 'Designation is required'
      isValid = false
    }
    
    if (!teacher.phone_number) {
      teacherErrors.phone_number = 'Phone Number is required'
      isValid = false
    } else if (!validatePhone(teacher.phone_number)) {
      teacherErrors.phone_number = 'Phone format: +92 300 1234567 or 03001234567'
      isValid = false
    }
    
    if (!teacher.email) {
      teacherErrors.email = 'Email is required'
      isValid = false
    } else if (!validateEmail(teacher.email)) {
      teacherErrors.email = 'Please enter a valid email address'
      isValid = false
    }
    
    if (!teacher.cnic) {
      teacherErrors.cnic = 'CNIC is required'
      isValid = false
    } else if (!validateCNIC(teacher.cnic)) {
      teacherErrors.cnic = 'CNIC format should be 00000-0000000-0'
      isValid = false
    }
    
    if (!teacher.gender) {
      teacherErrors.gender = 'Gender is required'
      isValid = false
    }
    
    if (Object.keys(teacherErrors).length > 0) {
      errors[i] = teacherErrors
    }
  }
  
  validationErrors.value = errors
  return isValid
}

const submitMultipleTeachers = async () => {
  if (!validateMultipleTeachers()) {
    showValidationError.value = true
    setTimeout(() => {
      showValidationError.value = false
    }, 5000)
    return
  }
  
  loading.value = true
  try {
    // Submit all teachers
    const promises = multipleTeachers.value.map(teacher => {
      const payload = {
        first_name: teacher.first_name,
        last_name: teacher.last_name,
        employee_code: teacher.employee_code,
        gender: teacher.gender,
        cnic: teacher.cnic,
        status: 'active',
        phone_number: teacher.phone_number,
        email: teacher.email,
        address: teacher.address,
        designation: teacher.designation
      }
      return axios.post(`${import.meta.env.VITE_API_URL}/teachers/store`, payload)
    })

    const responses = await Promise.all(promises)
    
    if (responses.every(response => response.data.success || response.data.status)) {
      showSuccessModal.value = true
    }
  } catch (error) {
    console.error('Error submitting multiple teachers:', error)
    // Handle error - could show error message
  } finally {
    loading.value = false
  }
}

const nextStep = () => {
  if (validateStep(currentStep.value)) {
    showValidationError.value = false
    if (currentStep.value < steps.length - 1) {
      currentStep.value++
    }
  } else {
    showValidationError.value = true
    setTimeout(() => {
      showValidationError.value = false
    }, 5000)
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const validateStep = (step) => {
  validationErrors.value = {}
  let isValid = true

  switch (step) {
    case 0: // Personal Information
      // First Name validation
      if (!formData.first_name) {
        validationErrors.value.first_name = 'First Name is required'
        isValid = false
      } else if (!validateName(formData.first_name)) {
        validationErrors.value.first_name = 'First Name should contain only letters (2-50 characters)'
        isValid = false
      }

      // Last Name validation
      if (!formData.last_name) {
        validationErrors.value.last_name = 'Last Name is required'
        isValid = false
      } else if (!validateName(formData.last_name)) {
        validationErrors.value.last_name = 'Last Name should contain only letters (2-50 characters)'
        isValid = false
      }

      // Employee Code validation
      if (!formData.employee_code) {
        validationErrors.value.employee_code = 'Employee Code is required'
        isValid = false
      }

      // Gender validation
      if (!formData.gender) {
        validationErrors.value.gender = 'Gender is required'
        isValid = false
      }

      // CNIC validation
      if (!formData.cnic) {
        validationErrors.value.cnic = 'CNIC is required'
        isValid = false
      } else if (!validateCNIC(formData.cnic)) {
        validationErrors.value.cnic = 'CNIC format should be 00000-0000000-0'
        isValid = false
      }

      break

    case 1: // Contact Information
      // Email validation
      if (!formData.email) {
        validationErrors.value.email = 'Email is required'
        isValid = false
      } else if (!validateEmail(formData.email)) {
        validationErrors.value.email = 'Please enter a valid email address'
        isValid = false
      }

      // Phone validation
      if (!formData.phone_number) {
        validationErrors.value.phone_number = 'Phone Number is required'
        isValid = false
      } else if (!validatePhone(formData.phone_number)) {
        validationErrors.value.phone_number = 'Phone format: +92 300 1234567 or 03001234567'
        isValid = false
      }

      break

    case 2: // Professional Information
      // Designation validation
      if (!formData.designation) {
        validationErrors.value.designation = 'Designation is required'
        isValid = false
      }

      break

    case 3: // Additional Information
      // All fields are optional in this step
      break

    default:
      return true
  }

  return isValid
}

// Validation utilities
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePhone = (phone) => {
  const phoneRegex = /^(\+92|0)?[0-9]{10}$/
  return phoneRegex.test(phone.replace(/\s|-/g, ''))
}

const validateCNIC = (cnic) => {
  const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/
  return cnicRegex.test(cnic)
}

const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s]{2,50}$/
  return nameRegex.test(name.trim())
}

const clearValidationError = (field) => {
  if (validationErrors.value[field]) {
    delete validationErrors.value[field]
  }
}

const handlePhotoChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (beforePhotoUpload(file)) {
      const reader = new FileReader()
      reader.onload = (e) => {
        photoPreview.value = e.target.result
        formData.profile_picture = file
      }
      reader.readAsDataURL(file)
    }
  }
}

const beforePhotoUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2
  
  if (!isImage) {
    validationErrors.value.profile_picture = 'Profile picture must be an image!'
    return false
  }
  if (!isLt2M) {
    validationErrors.value.profile_picture = 'Profile picture size cannot exceed 2MB!'
    return false
  }
  return true
}

const removePhoto = () => {
  photoPreview.value = ''
  formData.profile_picture = ''
}

const getInitials = () => {
  const firstInitial = formData.first_name?.charAt(0)?.toUpperCase() || ''
  const lastInitial = formData.last_name?.charAt(0)?.toUpperCase() || ''
  return firstInitial + lastInitial || '?'
}

// Image zoom modal functions
const openImageModal = () => {
  if (!photoPreview.value) return
  showImageModal.value = true
  resetZoom()
  // Add event listeners
  document.addEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'hidden' // Prevent background scroll
}

const closeImageModal = () => {
  showImageModal.value = false
  // Remove event listeners
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'auto' // Restore background scroll
}

const zoomIn = () => {
  const newZoom = Math.min(zoomLevel.value * 1.25, 5)
  zoomLevel.value = newZoom
}

const zoomOut = () => {
  const newZoom = Math.max(zoomLevel.value / 1.25, 0.2)
  zoomLevel.value = newZoom
}

const resetZoom = () => {
  zoomLevel.value = 1
  panX.value = 0
  panY.value = 0
}

// Mouse wheel zoom with better handling
const handleWheel = (event) => {
  if (!showImageModal.value) return
  
  event.preventDefault()
  event.stopPropagation()
  
  const delta = event.deltaY > 0 ? 0.9 : 1.1
  const newZoom = Math.max(0.2, Math.min(5, zoomLevel.value * delta))
  zoomLevel.value = newZoom
}

// Enhanced drag functionality
const startDrag = (event) => {
  if (!showImageModal.value) return
  
  isDragging.value = true
  dragStart.value = { 
    x: event.clientX - panX.value, 
    y: event.clientY - panY.value 
  }
}

const drag = (event) => {
  if (!isDragging.value || !showImageModal.value) return
  
  event.preventDefault()
  panX.value = event.clientX - dragStart.value.x
  panY.value = event.clientY - dragStart.value.y
}

const endDrag = () => {
  isDragging.value = false
}

// Enhanced keyboard controls
const handleKeydown = (event) => {
  if (!showImageModal.value) return
  
  switch (event.key) {
    case 'Escape':
      event.preventDefault()
      closeImageModal()
      break
    case 'ArrowUp':
      event.preventDefault()
      panY.value += 30
      break
    case 'ArrowDown':
      event.preventDefault()
      panY.value -= 30
      break
    case 'ArrowLeft':
      event.preventDefault()
      panX.value += 30
      break
    case 'ArrowRight':
      event.preventDefault()
      panX.value -= 30
      break
    case '+':
    case '=':
      event.preventDefault()
      zoomIn()
      break
    case '-':
    case '_':
      event.preventDefault()
      zoomOut()
      break
    case '0':
      event.preventDefault()
      resetZoom()
      break
  }
}

const fetchDepartments = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/departments`)
    if (response.data.status || response.data.success) {
      departments.value = response.data.result || response.data.data || []
    }
  } catch (error) {
    console.error('Failed to fetch departments:', error)
    departments.value = []
  }
}

const submitForm = async () => {
  if (!validateStep(currentStep.value)) {
    showValidationError.value = true
    setTimeout(() => {
      showValidationError.value = false
    }, 5000)
    return
  }

  loading.value = true
  
  try {
    const formDataToSend = new FormData()
    
    // Append all form data
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== '' && formData[key] !== undefined) {
        formDataToSend.append(key, formData[key])
      }
    })

    const url = route.params.id 
      ? `${import.meta.env.VITE_API_URL}/teachers/update/${route.params.id}` 
      : `${import.meta.env.VITE_API_URL}/teachers/store`
    
    const response = await axios.post(url, formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.data.status || response.data.success) {
      showSuccessModal.value = true
    } else {
      throw new Error(response.data.message || 'Failed to save teacher')
    }
  } catch (error) {
    console.error('Submit Error:', error)
    // You could add error handling here (e.g., show error message)
  } finally {
    loading.value = false
  }
}

const goToTeacherList = () => {
  router.push('/faculty')
}

const resetForm = () => {
  if (isMultipleMode.value) {
    multipleTeachers.value = [createEmptyTeacher()]
  } else {
    Object.keys(formData).forEach(key => {
      if (typeof formData[key] === 'string') {
        formData[key] = ''
      } else if (typeof formData[key] === 'number') {
        formData[key] = 0
      }
    })
    formData.status = 'active' // Reset to default
    currentStep.value = 0
  }
  photoPreview.value = ''
  validationErrors.value = {}
  showSuccessModal.value = false
}



const loadTeacherData = async () => {
  if (!route.params.id) return
  
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/teachers/${route.params.id}`)
    if (response.data.success || response.data.status) {
      const teacherData = response.data.data || response.data.result
      Object.assign(formData, teacherData)
      if (teacherData.profile_picture) {
        photoPreview.value = teacherData.profile_picture
      }
    }
  } catch (error) {
    console.error('Error loading teacher data:', error)
  }
}

// CNIC auto-formatting utility
function formatCnic(value) {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '').slice(0, 13)
  let formatted = ''
  if (digits.length > 5) {
    formatted = digits.slice(0, 5) + '-' + digits.slice(5)
  } else {
    formatted = digits
  }
  if (digits.length > 12) {
    formatted = formatted.slice(0, 13) + '-' + formatted.slice(13)
  }
  return formatted
}

// Watchers for CNIC field
watch(() => formData.cnic, (val) => {
  if (val) formData.cnic = formatCnic(val)
})

// Lifecycle
onMounted(() => {
  fetchDepartments()
  
  // If editing, fetch teacher data
  if (route.params.id) {
    loadTeacherData()
  }
})

onUnmounted(() => {
  // Cleanup event listeners
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
/* Custom animations */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
  20%, 40%, 60%, 80% { transform: translateX(2px); }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-slideInUp {
  animation: slideInUp 0.3s ease-out;
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

.animate-bounceIn {
  animation: bounceIn 0.6s ease-out;
}

/* Smooth transitions for all interactive elements */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:scale-110:hover {
  transform: scale(1.1);
}

.hover\:rotate-90:hover {
  transform: rotate(90deg);
}

/* Custom scrollbar for modal */
.overflow-hidden::-webkit-scrollbar {
  width: 8px;
}

.overflow-hidden::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.overflow-hidden::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.7);
  border-radius: 4px;
}

.overflow-hidden::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.9);
}

/* Image zoom cursor */
.cursor-zoom-in {
  cursor: zoom-in;
}

.cursor-move {
  cursor: move;
}

/* Backdrop blur effect */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Gradient text effect */
.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
}

/* Enhanced shadow effects */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Pulse animation for indicators */
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

/* Bounce animation for interactive elements */
.animate-bounce {
  animation: bounce 1s infinite;
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

/* Form input focus effects */
.filter-input:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}

/* Button hover effects */
button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

/* Modal entrance animation */
.modal-enter-active {
  animation: fadeIn 0.3s ease-out;
}

.modal-leave-active {
  animation: fadeIn 0.3s ease-out reverse;
}

/* Image container hover effect */
.image-container:hover .image-overlay {
  opacity: 1;
  transform: scale(1);
}

/* Smooth zoom transition */
.zoom-transition {
  transition: transform 0.2s ease-out;
}

/* Loading spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Filter-style inputs */
.filter-input-group {
  @apply flex flex-col w-full;
}

.filter-label {
  @apply mb-1 text-base font-normal text-black;
}

.filter-input-container {
  @apply relative;
}

.filter-input {
  @apply h-9 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none;
}

.filter-input:focus ~ .filter-underline {
  @apply bg-purple-500 scale-x-100;
}

.filter-underline {
  @apply absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none scale-x-100 transition-all duration-300;
}

.filter-input:focus {
  @apply text-gray-900;
}

/* Additional modern styling */
.navy-400 {
  color: #64748b;
}

.navy-800 {
  color: #1e293b;
}

/* Professional ERP styling */
.text-gray-600 {
  color: #64748b;
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

/* Form input styling */
input[type="text"],
input[type="email"],
input[type="tel"],
input[type="password"],
input[type="number"],
input[type="date"],
select,
textarea {
  border: none;
  border-bottom: 2px solid #e9d5ff;
  background: transparent;
  transition: border-color 0.3s ease;
}

input:focus,
select:focus,
textarea:focus {
  border-bottom-color: #8b5cf6;
  outline: none;
}

/* Button hover effects */
button:hover {
  transform: scale(1.02);
  transition: all 0.2s ease-in-out;
}

button:active {
  transform: scale(0.98);
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

.text-transparent {
  color: transparent;
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

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Form section animation */
.form-section {
  animation: slideInUp 0.3s ease-out;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #6366f1, #8b5cf6);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #4f46e5, #7c3aed);
}

/* Responsive improvements */
@media (max-width: 640px) {
  .grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1rem;
  }
}

@media (min-width: 768px) {
  .grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style> 