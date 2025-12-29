<template>
  <div class="relative w-full min-h-screen pl-0 pr-0 sm:pl-0 sm:pr-0 lg:pl-1 lg:pr-0 py-2 sm:py-3 lg:py-4">
    
    <!-- Header Section with Navigation -->
    <div class="relative z-10 w-full mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
      <h2 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        {{ isEditMode ? 'Edit Student' : (isMultipleMode ? 'Add Multiple Students' : 'Add New Student') }}
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
        <button @click="goToStudentList" class="hover:text-purple-600 cursor-pointer transition-colors duration-200">
          Students
        </button>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">{{ isEditMode ? 'Edit' : 'Add' }}</span>
      </nav>
    </div>

    <!-- Mode Toggle Section -->
    <div class="relative z-10 w-full mb-6" v-if="!isEditMode">
      <div class="bg-white/90 rounded-lg shadow-lg p-6 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-1">Registration Mode</h3>
            <p class="text-sm text-gray-600">Choose how you want to add students</p>
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
              Single Student
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
              Multiple Students
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Indicator (Only for Single Mode) -->
    <div v-if="!isMultipleMode" class="relative z-10 w-full mb-6">
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
    <div v-if="showValidationError" class="relative z-10 w-full mb-6">
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

    <!-- Single Student Form -->
    <div v-if="!isMultipleMode" class="relative z-10 w-full">
      <div class="bg-white/90 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <!-- Step Content -->
        <div class="p-8">
          <form @submit.prevent="handleSubmit">
            
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
                      <img v-if="formData.profilePicture" 
                           :src="formData.profilePicture" 
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
                          <p class="text-white text-xs font-medium">{{ formData.profilePicture ? 'Change' : 'Upload' }}</p>
                        </div>
                      </div>
                    </div>
                    <input type="file" @change="handleFileUpload" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                    
                    <!-- Remove Button with Animation -->
                    <button v-if="formData.profilePicture" 
                            @click="removePhoto" 
                            type="button" 
                            class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-200 hover:scale-110 hover:rotate-90 shadow-lg">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>

                    <!-- Zoom Indicator -->
                    <div v-if="formData.profilePicture" class="absolute -bottom-2 -right-2 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg animate-pulse">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                      </svg>
                    </div>
                  </div>
                  <!-- Profile Picture Error Message -->
                  <p v-if="validationErrors.profilePicture" class="text-red-500 text-xs mt-2 text-center animate-shake">{{ validationErrors.profilePicture }}</p>
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
                  <label class="filter-label">Date of Birth *</label>
                  <div class="filter-input-container">
                    <CompactDatePicker v-model="formData.date_of_birth" placeholder="" />
                    <div :class="['filter-underline', validationErrors.date_of_birth ? 'bg-red-500' : '']"></div>
                  </div>
                  <p v-if="validationErrors.date_of_birth" class="text-red-500 text-xs mt-1">{{ validationErrors.date_of_birth }}</p>
                </div>

                <div class="filter-input-group">
                  <label class="filter-label">Gender *</label>
                  <div class="filter-input-container">
                    <select v-model="formData.gender" :class="['filter-input appearance-none pr-8', validationErrors.gender ? 'border-red-500 text-red-600' : '']" required @change="clearValidationError('gender')">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
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
                  <label class="filter-label">CNIC Number</label>
                  <div class="filter-input-container">
                    <input v-model="formData.cnic" type="text" :class="['filter-input', validationErrors.cnic ? 'border-red-500 text-red-600' : '']" placeholder="00000-0000000-0" @input="clearValidationError('cnic')">
                    <div :class="['filter-underline', validationErrors.cnic ? 'bg-red-500' : '']"></div>
                  </div>
                  <p v-if="validationErrors.cnic" class="text-red-500 text-xs mt-1">{{ validationErrors.cnic }}</p>
                </div>

                <div class="filter-input-group">
                  <label class="filter-label">Blood Group</label>
                  <div class="filter-input-container">
                    <select v-model="formData.bloodGroup" class="filter-input appearance-none pr-8">
                      <option value="">Select Blood Group</option>
                      <option v-for="group in bloodGroups" :key="group" :value="group">{{ group }}</option>
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
                  <label class="filter-label">Religion</label>
                  <div class="filter-input-container">
                    <select v-model="formData.religion" class="filter-input appearance-none pr-8">
                      <option value="">Select Religion</option>
                      <option value="islam">Islam</option>
                      <option value="christianity">Christianity</option>
                      <option value="hinduism">Hinduism</option>
                      <option value="other">Other</option>
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
                    <input v-model="formData.email" type="email" :class="['filter-input', validationErrors.email ? 'border-red-500 text-red-600' : '']" placeholder="student@example.com" required>
                    <div :class="['filter-underline', validationErrors.email ? 'bg-red-500' : '']"></div>
                  </div>
                  <p v-if="validationErrors.email" class="text-red-500 text-xs mt-1">{{ validationErrors.email }}</p>
                </div>
                
                <div class="filter-input-group">
                  <label class="filter-label">Phone Number *</label>
                  <div class="filter-input-container">
                    <input v-model="formData.phone" type="tel" :class="['filter-input', validationErrors.phone ? 'border-red-500 text-red-600' : '']" placeholder="+92 300 1234567" required>
                    <div :class="['filter-underline', validationErrors.phone ? 'bg-red-500' : '']"></div>
                  </div>
                  <p v-if="validationErrors.phone" class="text-red-500 text-xs mt-1">{{ validationErrors.phone }}</p>
                </div>

                <div class="filter-input-group">
                  <label class="filter-label">City *</label>
                  <div class="filter-input-container">
                    <input v-model="formData.city" type="text" :class="['filter-input', validationErrors.city ? 'border-red-500 text-red-600' : '']" placeholder="Enter city" required>
                    <div :class="['filter-underline', validationErrors.city ? 'bg-red-500' : '']"></div>
                  </div>
                  <p v-if="validationErrors.city" class="text-red-500 text-xs mt-1">{{ validationErrors.city }}</p>
                </div>

                <div class="filter-input-group">
                  <label class="filter-label">Province</label>
                  <div class="filter-input-container">
                    <select v-model="formData.province" class="filter-input appearance-none pr-8">
                      <option value="">Select Province</option>
                      <option v-for="province in provinces" :key="province" :value="province">{{ province }}</option>
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
                  <label class="filter-label">Postal Code</label>
                  <div class="filter-input-container">
                    <input v-model="formData.postalCode" type="text" :class="['filter-input', validationErrors.postalCode ? 'border-red-500 text-red-600' : '']" placeholder="12345" @input="clearValidationError('postalCode')">
                    <div :class="['filter-underline', validationErrors.postalCode ? 'bg-red-500' : '']"></div>
                  </div>
                  <p v-if="validationErrors.postalCode" class="text-red-500 text-xs mt-1">{{ validationErrors.postalCode }}</p>
                </div>
              </div>

              <!-- Address (Full Width) -->
              <div class="filter-input-group">
                <label class="filter-label">Address *</label>
                <div class="filter-input-container">
                  <textarea v-model="formData.address" :class="['filter-input', validationErrors.address ? 'border-red-500 text-red-600' : '']" rows="3" placeholder="Enter complete address" required></textarea>
                  <div :class="['filter-underline', validationErrors.address ? 'bg-red-500' : '']"></div>
                </div>
                <p v-if="validationErrors.address" class="text-red-500 text-xs mt-1">{{ validationErrors.address }}</p>
              </div>
            </div>

            <!-- Step 3: Academic Information -->
            <div v-show="currentStep === 2" class="space-y-6">
              <div class="text-center mb-6">
                <h2 class="text-base font-medium text-gray-900 mb-1 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">Academic Information</h2>
                <p class="text-gray-600 text-sm">Educational details and enrollment</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="filter-input-group">
                  <label class="filter-label">Student ID *</label>
                  <div class="filter-input-container">
                    <input v-model="formData.studentId" type="text" class="filter-input" placeholder="Auto-generated" readonly>
                    <div class="filter-underline"></div>
                  </div>
                </div>
                
                <div class="filter-input-group">
                  <label class="filter-label">Roll Number *</label>
                  <div class="filter-input-container">
                    <input v-model="formData.roll_number" type="text" :class="['filter-input', validationErrors.roll_number ? 'border-red-500 text-red-600' : '']" placeholder="Enter roll number" required>
                    <div :class="['filter-underline', validationErrors.roll_number ? 'bg-red-500' : '']"></div>
                  </div>
                  <p v-if="validationErrors.roll_number" class="text-red-500 text-xs mt-1">{{ validationErrors.roll_number }}</p>
                </div>

                <div class="filter-input-group">
                  <label class="filter-label">Class *</label>
                  <div class="filter-input-container">
                    <select v-model="formData.classId" @change="loadSections" :class="['filter-input appearance-none pr-8', validationErrors.classId ? 'border-red-500 text-red-600' : '']" required>
                      <option value="">Select Class</option>
                      <option v-for="classItem in classes" :key="classItem.id" :value="classItem.id">{{ classItem.name }}</option>
                    </select>
                    <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                      </svg>
                    </div>
                    <div :class="['filter-underline', validationErrors.classId ? 'bg-red-500' : '']"></div>
                  </div>
                  <p v-if="validationErrors.classId" class="text-red-500 text-xs mt-1">{{ validationErrors.classId }}</p>
                </div>

                <div class="filter-input-group">
                  <label class="filter-label">Section *</label>
                  <div class="filter-input-container">
                    <select v-model="formData.sectionId" :class="['filter-input appearance-none pr-8', validationErrors.sectionId ? 'border-red-500 text-red-600' : '']" required>
                      <option value="">Select Section</option>
                      <option v-for="section in sections" :key="section.id" :value="section.id">{{ section.name }}</option>
                    </select>
                    <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                      </svg>
                    </div>
                    <div :class="['filter-underline', validationErrors.sectionId ? 'bg-red-500' : '']"></div>
                  </div>
                  <p v-if="validationErrors.sectionId" class="text-red-500 text-xs mt-1">{{ validationErrors.sectionId }}</p>
                </div>

                <div class="filter-input-group">
                  <label class="filter-label">Admission Date *</label>
                  <div class="filter-input-container">
                    <CompactDatePicker v-model="formData.admission_date" placeholder="" />
                    <div :class="['filter-underline', validationErrors.admission_date ? 'bg-red-500' : '']"></div>
                  </div>
                  <p v-if="validationErrors.admission_date" class="text-red-500 text-xs mt-1">{{ validationErrors.admission_date }}</p>
                </div>

                <div class="filter-input-group">
                  <label class="filter-label">Academic Session *</label>
                  <div class="filter-input-container">
                    <select v-model="formData.academicSession" :class="['filter-input appearance-none pr-8', validationErrors.academicSession ? 'border-red-500 text-red-600' : '']" required>
                      <option value="">Select Session</option>
                      <option v-for="session in sessions" :key="session.id" :value="session.name">{{ session.name }}</option>
                    </select>
                    <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                      </svg>
                    </div>
                    <div :class="['filter-underline', validationErrors.academicSession ? 'bg-red-500' : '']"></div>
                  </div>
                  <p v-if="validationErrors.academicSession" class="text-red-500 text-xs mt-1">{{ validationErrors.academicSession }}</p>
                </div>

                <div class="filter-input-group">
                  <label class="filter-label">Previous School</label>
                  <div class="filter-input-container">
                    <input v-model="formData.previousSchool" type="text" :class="['filter-input', validationErrors.previousSchool ? 'border-red-500 text-red-600' : '']" placeholder="Enter previous school name" @input="clearValidationError('previousSchool')">
                    <div :class="['filter-underline', validationErrors.previousSchool ? 'bg-red-500' : '']"></div>
                  </div>
                  <p v-if="validationErrors.previousSchool" class="text-red-500 text-xs mt-1">{{ validationErrors.previousSchool }}</p>
                </div>
              </div>
            </div>

            <!-- Step 4: Family Information -->
            <div v-show="currentStep === 3" class="space-y-6">
              <div class="text-center mb-6">
                <h2 class="text-base font-medium text-gray-900 mb-1 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">Family Information</h2>
                <p class="text-gray-600 text-sm">Parent and guardian details</p>
              </div>

              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  Father's Information
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="filter-input-group">
                    <label class="filter-label">Father's Name *</label>
                    <div class="filter-input-container">
                      <input v-model="formData.fatherName" type="text" :class="['filter-input', validationErrors.fatherName ? 'border-red-500 text-red-600' : '']" placeholder="Enter father's name" required>
                      <div :class="['filter-underline', validationErrors.fatherName ? 'bg-red-500' : '']"></div>
                    </div>
                    <p v-if="validationErrors.fatherName" class="text-red-500 text-xs mt-1">{{ validationErrors.fatherName }}</p>
                  </div>
                  <div class="filter-input-group">
                    <label class="filter-label">Father'scnic_number *</label>
                    <div class="filter-input-container">
                      <input v-model="formData.fatherCnic" type="text" :class="['filter-input', validationErrors.fatherCnic ? 'border-red-500 text-red-600' : '']" placeholder="00000-0000000-0" required>
                      <div :class="['filter-underline', validationErrors.fatherCnic ? 'bg-red-500' : '']"></div>
                    </div>
                    <p v-if="validationErrors.fatherCnic" class="text-red-500 text-xs mt-1">{{ validationErrors.fatherCnic }}</p>
                  </div>
                  <div class="filter-input-group">
                    <label class="filter-label">Father's Occupation</label>
                    <div class="filter-input-container">
                      <input v-model="formData.fatherOccupation" type="text" :class="['filter-input', validationErrors.fatherOccupation ? 'border-red-500 text-red-600' : '']" placeholder="Enter occupation" @input="clearValidationError('fatherOccupation')">
                      <div :class="['filter-underline', validationErrors.fatherOccupation ? 'bg-red-500' : '']"></div>
                    </div>
                    <p v-if="validationErrors.fatherOccupation" class="text-red-500 text-xs mt-1">{{ validationErrors.fatherOccupation }}</p>
                  </div>
                  <div class="filter-input-group">
                    <label class="filter-label">Father's Phone</label>
                    <div class="filter-input-container">
                      <input v-model="formData.fatherPhone" type="tel" :class="['filter-input', validationErrors.fatherPhone ? 'border-red-500 text-red-600' : '']" placeholder="+92 300 1234567" @input="clearValidationError('fatherPhone')">
                      <div :class="['filter-underline', validationErrors.fatherPhone ? 'bg-red-500' : '']"></div>
                    </div>
                    <p v-if="validationErrors.fatherPhone" class="text-red-500 text-xs mt-1">{{ validationErrors.fatherPhone }}</p>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100">
                <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-pink-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  Mother's Information
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="filter-input-group">
                    <label class="filter-label">Mother's Name *</label>
                    <div class="filter-input-container">
                      <input v-model="formData.motherName" type="text" :class="['filter-input', validationErrors.motherName ? 'border-red-500 text-red-600' : '']" placeholder="Enter mother's name" required>
                      <div :class="['filter-underline', validationErrors.motherName ? 'bg-red-500' : '']"></div>
                    </div>
                    <p v-if="validationErrors.motherName" class="text-red-500 text-xs mt-1">{{ validationErrors.motherName }}</p>
                  </div>
                  <div class="filter-input-group">
                    <label class="filter-label">Mother'scnic_number</label>
                    <div class="filter-input-container">
                      <input v-model="formData.motherCnic" type="text" :class="['filter-input', validationErrors.motherCnic ? 'border-red-500 text-red-600' : '']" placeholder="00000-0000000-0" @input="clearValidationError('motherCnic')">
                      <div :class="['filter-underline', validationErrors.motherCnic ? 'bg-red-500' : '']"></div>
                    </div>
                    <p v-if="validationErrors.motherCnic" class="text-red-500 text-xs mt-1">{{ validationErrors.motherCnic }}</p>
                  </div>
                  <div class="filter-input-group">
                    <label class="filter-label">Mother's Occupation</label>
                    <div class="filter-input-container">
                      <input v-model="formData.motherOccupation" type="text" :class="['filter-input', validationErrors.motherOccupation ? 'border-red-500 text-red-600' : '']" placeholder="Enter occupation" @input="clearValidationError('motherOccupation')">
                      <div :class="['filter-underline', validationErrors.motherOccupation ? 'bg-red-500' : '']"></div>
                    </div>
                    <p v-if="validationErrors.motherOccupation" class="text-red-500 text-xs mt-1">{{ validationErrors.motherOccupation }}</p>
                  </div>
                  <div class="filter-input-group">
                    <label class="filter-label">Mother's Phone</label>
                    <div class="filter-input-container">
                      <input v-model="formData.motherPhone" type="tel" :class="['filter-input', validationErrors.motherPhone ? 'border-red-500 text-red-600' : '']" placeholder="+92 300 1234567" @input="clearValidationError('motherPhone')">
                      <div :class="['filter-underline', validationErrors.motherPhone ? 'bg-red-500' : '']"></div>
                    </div>
                    <p v-if="validationErrors.motherPhone" class="text-red-500 text-xs mt-1">{{ validationErrors.motherPhone }}</p>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                  </svg>
                  Emergency Contact
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="filter-input-group">
                    <label class="filter-label">Emergency Contact Name</label>
                    <div class="filter-input-container">
                      <input v-model="formData.emergencyContactName" type="text" :class="['filter-input', validationErrors.emergencyContactName ? 'border-red-500 text-red-600' : '']" placeholder="Enter emergency contact name" @input="clearValidationError('emergencyContactName')">
                      <div :class="['filter-underline', validationErrors.emergencyContactName ? 'bg-red-500' : '']"></div>
                    </div>
                    <p v-if="validationErrors.emergencyContactName" class="text-red-500 text-xs mt-1">{{ validationErrors.emergencyContactName }}</p>
                  </div>
                  <div class="filter-input-group">
                    <label class="filter-label">Emergency Contact Phone</label>
                    <div class="filter-input-container">
                      <input v-model="formData.emergencyContactPhone" type="tel" :class="['filter-input', validationErrors.emergencyContactPhone ? 'border-red-500 text-red-600' : '']" placeholder="+92 300 1234567" @input="clearValidationError('emergencyContactPhone')">
                      <div :class="['filter-underline', validationErrors.emergencyContactPhone ? 'bg-red-500' : '']"></div>
                    </div>
                    <p v-if="validationErrors.emergencyContactPhone" class="text-red-500 text-xs mt-1">{{ validationErrors.emergencyContactPhone }}</p>
                  </div>
                  <div class="filter-input-group">
                    <label class="filter-label">Relationship</label>
                    <div class="filter-input-container">
                      <select v-model="formData.emergencyContactRelation" class="filter-input appearance-none pr-8">
                        <option value="">Select Relationship</option>
                        <option value="father">Father</option>
                        <option value="mother">Mother</option>
                        <option value="guardian">Guardian</option>
                        <option value="uncle">Uncle</option>
                        <option value="aunt">Aunt</option>
                        <option value="grandparent">Grandparent</option>
                        <option value="other">Other</option>
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
              @click="handleSubmit"
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
              {{ isEditMode ? 'Update Student' : 'Create Student' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Multiple Students Form -->
    <div v-else class="w-full">
      <div class="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-base font-medium text-white mb-1 tracking-tight">Add Multiple Students</h2>
              <p class="text-indigo-100 text-sm">Add students quickly with essential information only</p>
            </div>
            <button @click="addNewStudentForm" class="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
              </svg>
              Add Student
            </button>
          </div>
        </div>

        <!-- Students Forms -->
        <div class="p-8 space-y-8">
          <div v-for="(student, index) in multipleStudents" :key="index" class="border border-gray-200 rounded-xl p-6 relative">
            <!-- Student Form Header -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {{ index + 1 }}
                </div>
                <div>
                  <h3 class="text-base font-medium text-gray-900 tracking-tight">Student {{ index + 1 }}</h3>
                  <p class="text-sm text-gray-600">Essential information required</p>
                </div>
              </div>
              <button 
                v-if="multipleStudents.length > 1"
                @click="removeStudentForm(index)" 
                class="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                title="Remove Student"
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
                  <input v-model="student.first_name" type="text" :class="['filter-input', validationErrors[index]?.first_name ? 'border-red-500 text-red-600' : '']" placeholder="Enter first name" required>
                  <div :class="['filter-underline', validationErrors[index]?.first_name ? 'bg-red-500' : '']"></div>
                </div>
                <p v-if="validationErrors[index]?.first_name" class="text-red-500 text-xs mt-1">{{ validationErrors[index].first_name }}</p>
              </div>

              <div class="filter-input-group">
                <label class="filter-label">Last Name *</label>
                <div class="filter-input-container">
                  <input v-model="student.last_name" type="text" :class="['filter-input', validationErrors[index]?.last_name ? 'border-red-500 text-red-600' : '']" placeholder="Enter last name" required>
                  <div :class="['filter-underline', validationErrors[index]?.last_name ? 'bg-red-500' : '']"></div>
                </div>
                <p v-if="validationErrors[index]?.last_name" class="text-red-500 text-xs mt-1">{{ validationErrors[index].last_name }}</p>
              </div>

              <div class="filter-input-group">
                <label class="filter-label">Roll Number *</label>
                <div class="filter-input-container">
                  <input v-model="student.roll_number" type="text" :class="['filter-input', validationErrors[index]?.roll_number ? 'border-red-500 text-red-600' : '']" placeholder="Enter roll number" required>
                  <div :class="['filter-underline', validationErrors[index]?.roll_number ? 'bg-red-500' : '']"></div>
                </div>
                <p v-if="validationErrors[index]?.roll_number" class="text-red-500 text-xs mt-1">{{ validationErrors[index].roll_number }}</p>
              </div>

              <!-- Academic Info -->
              <div class="filter-input-group">
                <label class="filter-label">Class *</label>
                <div class="filter-input-container">
                  <select v-model="student.classId" @change="loadSectionsForStudent(index)" :class="['filter-input appearance-none pr-8', validationErrors[index]?.classId ? 'border-red-500 text-red-600' : '']" required>
                    <option value="">Select Class</option>
                    <option v-for="classItem in classes" :key="classItem.id" :value="classItem.id">{{ classItem.name }}</option>
                  </select>
                  <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                    </svg>
                  </div>
                  <div :class="['filter-underline', validationErrors[index]?.classId ? 'bg-red-500' : '']"></div>
                </div>
                <p v-if="validationErrors[index]?.classId" class="text-red-500 text-xs mt-1">{{ validationErrors[index].classId }}</p>
              </div>

              <div class="filter-input-group">
                <label class="filter-label">Section *</label>
                <div class="filter-input-container">
                  <select v-model="student.sectionId" :class="['filter-input appearance-none pr-8', validationErrors[index]?.sectionId ? 'border-red-500 text-red-600' : '']" required>
                    <option value="">Select Section</option>
                    <option v-for="section in sections" :key="section.id" :value="section.id">{{ section.name }}</option>
                  </select>
                  <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                    </svg>
                  </div>
                  <div :class="['filter-underline', validationErrors[index]?.sectionId ? 'bg-red-500' : '']"></div>
                </div>
                <p v-if="validationErrors[index]?.sectionId" class="text-red-500 text-xs mt-1">{{ validationErrors[index].sectionId }}</p>
              </div>

              <div class="filter-input-group">
                <label class="filter-label">Phone *</label>
                <div class="filter-input-container">
                  <input v-model="student.phone" type="tel" :class="['filter-input', validationErrors[index]?.phone ? 'border-red-500 text-red-600' : '']" placeholder="+92 300 1234567" required>
                  <div :class="['filter-underline', validationErrors[index]?.phone ? 'bg-red-500' : '']"></div>
                </div>
                <p v-if="validationErrors[index]?.phone" class="text-red-500 text-xs mt-1">{{ validationErrors[index].phone }}</p>
              </div>

              <!-- Family Info -->
              <div class="filter-input-group">
                <label class="filter-label">Father's Name *</label>
                <div class="filter-input-container">
                  <input v-model="student.fatherName" type="text" :class="['filter-input', validationErrors[index]?.fatherName ? 'border-red-500 text-red-600' : '']" placeholder="Enter father's name" required>
                  <div :class="['filter-underline', validationErrors[index]?.fatherName ? 'bg-red-500' : '']"></div>
                </div>
                <p v-if="validationErrors[index]?.fatherName" class="text-red-500 text-xs mt-1">{{ validationErrors[index].fatherName }}</p>
              </div>

              <div class="filter-input-group">
                <label class="filter-label">Father'scnic_number *</label>
                <div class="filter-input-container">
                  <input v-model="student.fatherCnic" type="text" :class="['filter-input', validationErrors[index]?.fatherCnic ? 'border-red-500 text-red-600' : '']" placeholder="00000-0000000-0" required>
                  <div :class="['filter-underline', validationErrors[index]?.fatherCnic ? 'bg-red-500' : '']"></div>
                </div>
                <p v-if="validationErrors[index]?.fatherCnic" class="text-red-500 text-xs mt-1">{{ validationErrors[index].fatherCnic }}</p>
              </div>

              <div class="filter-input-group">
                <label class="filter-label">Mother's Name *</label>
                <div class="filter-input-container">
                  <input v-model="student.motherName" type="text" :class="['filter-input', validationErrors[index]?.motherName ? 'border-red-500 text-red-600' : '']" placeholder="Enter mother's name" required>
                  <div :class="['filter-underline', validationErrors[index]?.motherName ? 'bg-red-500' : '']"></div>
                </div>
                <p v-if="validationErrors[index]?.motherName" class="text-red-500 text-xs mt-1">{{ validationErrors[index].motherName }}</p>
              </div>
            </div>

            <!-- Address (Full Width) -->
            <div class="mt-6">
              <div class="filter-input-group">
                <label class="filter-label">Address *</label>
                <div class="filter-input-container">
                  <textarea v-model="student.address" :class="['filter-input', validationErrors[index]?.address ? 'border-red-500 text-red-600' : '']" rows="2" placeholder="Enter complete address" required></textarea>
                  <div :class="['filter-underline', validationErrors[index]?.address ? 'bg-red-500' : '']"></div>
                </div>
                <p v-if="validationErrors[index]?.address" class="text-red-500 text-xs mt-1">{{ validationErrors[index].address }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Multiple Students Actions -->
        <div class="bg-white px-8 py-6 border-t border-gray-200 flex justify-between items-center">
          <div class="text-sm text-gray-600">
            Total Students: <span class="font-semibold text-indigo-600">{{ multipleStudents.length }}</span>
          </div>
          <div class="flex space-x-3">
            <button @click="addNewStudentForm" type="button" class="h-9 px-8 rounded-full bg-white hover:bg-white text-gray-900 text-sm font-bold border border-gray-200 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
              </svg>
              Add Another
            </button>
            <button @click="submitMultipleStudents" type="button" class="h-9 px-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-sm font-bold text-white shadow hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" :disabled="loading">
              <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              Register All Students
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
              {{ isEditMode ? 'Student information has been updated successfully.' : 
                 isMultipleMode ? `All ${multipleStudents.length} students have been registered successfully!` : 
                 'Student has been registered successfully.' }}
            </p>
            <div class="flex justify-center space-x-3">
              <button @click="goToStudentList" class="h-9 px-8 rounded-full bg-white hover:bg-white text-gray-900 text-sm font-bold border border-gray-200 transition-all duration-300 transform hover:scale-105">Go to Student List</button>
              <button v-if="!isEditMode" @click="resetForm" class="h-9 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">Add Another Student</button>
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
               :src="formData.profilePicture" 
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
</style>

<script setup>
import { useToast } from 'vue-toastification'
import CompactDatePicker from '@/components/CompactDatePicker.vue'

// Use centralized axios instance
const axios = api

const router = useRouter()
const toast = useToast()
const route = useRoute()

// State
const currentStep = ref(0)
const loading = ref(false)
const showSuccessModal = ref(false)
const classes = ref([])
const sections = ref([])
const sessions = ref([])
const isMultipleMode = ref(false)
const multipleStudents = ref([])
const validationErrors = ref({})
const showValidationError = ref(false)

// Image zoom modal state
const showImageModal = ref(false)
const zoomLevel = ref(1)
const panX = ref(0)
const panY = ref(0)
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const imageContainer = ref(null)
const zoomImage = ref(null)

// Check if this is edit mode
const isEditMode = computed(() => route.params.id && route.params.id !== 'add')

// Set mode function
const setMode = (multiple) => {
  isMultipleMode.value = multiple
  if (multiple) {
    // Initialize with one student form
    multipleStudents.value = [createEmptyStudent()]
  }
}

// Create empty student object with only required fields
const createEmptyStudent = () => ({
  first_name: '',
  last_name: '',
  roll_number: '',
  classId: '',
  sectionId: '',
  fatherName: '',
  fatherCnic: '',
  motherName: '',
  phone: '',
  address: ''
})

// Steps configuration
const steps = [
  { title: 'Personal', icon: 'user' },
  { title: 'Contact', icon: 'phone' },
  { title: 'Academic', icon: 'book' },
  { title: 'Family', icon: 'users' }
]

// Form data
const formData = reactive({
  // Personal Information
  first_name: '',
  last_name: '',
  date_of_birth: '',
  gender: '',
 cnic_number: '',
  bloodGroup: '',
  religion: '',
  profilePicture: '',

  // Contact Information
  email: '',
  phone: '',
  address: '',
  city: '',
  province: '',
  postalCode: '',

  // Academic Information
  studentId: '',
  roll_number: '',
  classId: '',
  sectionId: '',
  admission_date: '',
  academicSession: '',
  previousSchool: '',

  // Family Information
  fatherName: '',
  fatherCnic: '',
  fatherOccupation: '',
  fatherPhone: '',
  motherName: '',
  motherCnic: '',
  motherOccupation: '',
  motherPhone: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  emergencyContactRelation: ''
})

// Options
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const provinces = ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Gilgit-Baltistan', 'AJK', 'Islamabad']

// Methods
const nextStep = () => {
  if (validateStep(currentStep.value)) {
    showValidationError.value = false
    if (currentStep.value < steps.length - 1) {
      currentStep.value++
    }
  } else {
    showValidationError.value = true
    // Auto-hide error message after 5 seconds
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

const validateFileUpload = (file) => {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
  
  if (file.size > maxSize) {
    return 'File size should not exceed 5MB'
  }
  
  if (!allowedTypes.includes(file.type)) {
    return 'Only JPEG, PNG and GIF files are allowed'
  }
  
  return null
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const validationError = validateFileUpload(file)
    if (validationError) {
      validationErrors.value.profilePicture = validationError
      return
    }
    
    // Clear any existing error
    clearValidationError('profilePicture')
    
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.profilePicture = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removePhoto = () => {
  formData.profilePicture = ''
}

// Image zoom modal functions
const openImageModal = () => {
  if (!formData.profilePicture) return
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
  console.log('Zoom In:', newZoom)
}

const zoomOut = () => {
  const newZoom = Math.max(zoomLevel.value / 1.25, 0.2)
  zoomLevel.value = newZoom
  console.log('Zoom Out:', newZoom)
}

const resetZoom = () => {
  zoomLevel.value = 1
  panX.value = 0
  panY.value = 0
  console.log('Reset Zoom')
}

// Mouse wheel zoom with better handling
const handleWheel = (event) => {
  if (!showImageModal.value) return
  
  event.preventDefault()
  event.stopPropagation()
  
  const delta = event.deltaY > 0 ? 0.9 : 1.1
  const newZoom = Math.max(0.2, Math.min(5, zoomLevel.value * delta))
  zoomLevel.value = newZoom
  
  console.log('Mouse Wheel Zoom:', newZoom)
}

// Enhanced drag functionality
const startDrag = (event) => {
  if (!showImageModal.value) return
  
  isDragging.value = true
  dragStart.value = { 
    x: event.clientX - panX.value, 
    y: event.clientY - panY.value 
  }
  
  console.log('Start Drag')
}

const drag = (event) => {
  if (!isDragging.value || !showImageModal.value) return
  
  event.preventDefault()
  panX.value = event.clientX - dragStart.value.x
  panY.value = event.clientY - dragStart.value.y
}

const endDrag = () => {
  if (isDragging.value) {
    console.log('End Drag')
  }
  isDragging.value = false
}

// Enhanced keyboard controls
const handleKeydown = (event) => {
  if (!showImageModal.value) return
  
  console.log('Key pressed:', event.key)
  
  switch (event.key) {
    case 'Escape':
      event.preventDefault()
      closeImageModal()
      break
    case 'ArrowUp':
      event.preventDefault()
      panY.value += 30
      console.log('Scroll Up')
      break
    case 'ArrowDown':
      event.preventDefault()
      panY.value -= 30
      console.log('Scroll Down')
      break
    case 'ArrowLeft':
      event.preventDefault()
      panX.value += 30
      console.log('Scroll Left')
      break
    case 'ArrowRight':
      event.preventDefault()
      panX.value -= 30
      console.log('Scroll Right')
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

const loadClasses = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/classes`)
    if (response.data.success && Array.isArray(response.data.result)) {
      classes.value = response.data.result
    } else {
      classes.value = []
      console.error('Failed to load classes:', response.data.message)
    }
  } catch (error) {
    classes.value = []
    console.error('Error loading classes:', error)
  }
}

const loadSections = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/sections`)
    if (response.data.success && Array.isArray(response.data.result)) {
      sections.value = response.data.result
    } else {
      sections.value = []
      console.error('Failed to load sections:', response.data.message)
    }
  } catch (error) {
    sections.value = []
    console.error('Error loading sections:', error)
  }
}

const generateStudentId = () => {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  formData.studentId = `STD${year}${random}`
}

// Multiple students methods
const addNewStudentForm = () => {
  multipleStudents.value.push(createEmptyStudent())
}

const removeStudentForm = (index) => {
  if (multipleStudents.value.length > 1) {
    multipleStudents.value.splice(index, 1)
  }
}

const loadSectionsForStudent = async (studentIndex) => {
  const student = multipleStudents.value[studentIndex]
  if (!student.classId) return
  // For now, load all sections since we don't have class-specific sections endpoint
  await loadSections()
}

const validateMultipleStudents = () => {
  const errors = {}
  let isValid = true
  
  for (let i = 0; i < multipleStudents.value.length; i++) {
    const student = multipleStudents.value[i]
    const studentErrors = {}
    
    // Required field validations
    if (!student.first_name) {
      studentErrors.first_name = 'First Name is required'
      isValid = false
    } else if (!validateName(student.first_name)) {
      studentErrors.first_name = 'First Name should contain only letters (2-50 characters)'
      isValid = false
    }
    
    if (!student.last_name) {
      studentErrors.last_name = 'Last Name is required'
      isValid = false
    } else if (!validateName(student.last_name)) {
      studentErrors.last_name = 'Last Name should contain only letters (2-50 characters)'
      isValid = false
    }
    
    if (!student.roll_number) {
      studentErrors.roll_number = 'Roll Number is required'
      isValid = false
    } else if (!validateroll_number(student.roll_number)) {
      studentErrors.roll_number = 'Roll Number should be 3-20 characters (letters and numbers only)'
      isValid = false
    }
    
    if (!student.classId) {
      studentErrors.classId = 'Class is required'
      isValid = false
    }
    
    if (!student.sectionId) {
      studentErrors.sectionId = 'Section is required'
      isValid = false
    }
    
    if (!student.phone) {
      studentErrors.phone = 'Phone is required'
      isValid = false
    } else if (!validatePhone(student.phone)) {
      studentErrors.phone = 'Phone format: +92 300 1234567 or 03001234567'
      isValid = false
    }
    
    if (!student.fatherName) {
      studentErrors.fatherName = 'Father\'s Name is required'
      isValid = false
    } else if (!validateName(student.fatherName)) {
      studentErrors.fatherName = 'Father\'s Name should contain only letters (2-50 characters)'
      isValid = false
    }
    
    if (!student.fatherCnic) {
      studentErrors.fatherCnic = 'Father\'scnic_number is required'
      isValid = false
    } else if (!validateCNIC(student.fatherCnic)) {
      studentErrors.fatherCnic = 'Father\'scnic_number format should be 00000-0000000-0'
      isValid = false
    }
    
    if (!student.motherName) {
      studentErrors.motherName = 'Mother\'s Name is required'
      isValid = false
    } else if (!validateName(student.motherName)) {
      studentErrors.motherName = 'Mother\'s Name should contain only letters (2-50 characters)'
      isValid = false
    }
    
    if (!student.address) {
      studentErrors.address = 'Address is required'
      isValid = false
    } else if (student.address.trim().length < 10) {
      studentErrors.address = 'Address should be at least 10 characters long'
      isValid = false
    }
    
    if (Object.keys(studentErrors).length > 0) {
      errors[i] = studentErrors
    }
  }
  
  validationErrors.value = errors
  return isValid
}

const submitMultipleStudents = async () => {
  if (!validateMultipleStudents()) {
    showValidationError.value = true
    setTimeout(() => {
      showValidationError.value = false
    }, 5000)
    return
  }
  
  loading.value = true
  try {
    // Submit all students
    const promises = multipleStudents.value.map(student => {
      const payload = {
        first_name: student.first_name,
        last_name: student.last_name,
        roll_number: student.roll_number,
        gender: 'Male', // Default gender for multiple students
        date_of_birth: '2010-01-01', // Default date_of_birth for multiple students
        status: 'active',
        phone: student.phone,
        address: student.address,
        student_id: generateRandomStudentId(),
        class_id: student.classId,
        section_id: student.sectionId,
        admission_date: new Date().toISOString().split('T')[0],
        academic_session: '2024-2025',
        father_name: student.fatherName,
        father_cnic: student.fatherCnic,
        mother_name: student.motherName
      }
      return axios.post(`${import.meta.env.VITE_API_URL}/students/store`, payload)
    })

    const responses = await Promise.all(promises)
    
    if (responses.every(response => response.data.success)) {
      showSuccessModal.value = true
    }
  } catch (error) {
    console.error('Error submitting multiple students:', error)
    // Handle error - could show error message
  } finally {
    loading.value = false
  }
}

const generateRandomStudentId = () => {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `STD${year}${random}`
}

const handleSubmit = async () => {
  loading.value = true
  try {
    // Convert form data to backend expected format
    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      roll_number: formData.roll_number,
      gender: formData.gender,
      date_of_birth: formData.date_of_birth,
      status: 'active', // Default status
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      province: formData.province,
      postal_code: formData.postalCode,
      student_id: formData.studentId,
      class_id: formData.classId,
      section_id: formData.sectionId,
      admission_date: formData.admission_date,
      academic_session: formData.academicSession,
      previous_school: formData.previousSchool,
      father_name: formData.fatherName,
      father_cnic: formData.fatherCnic,
      father_occupation: formData.fatherOccupation,
      father_phone: formData.fatherPhone,
      mother_name: formData.motherName,
      mother_cnic: formData.motherCnic,
      mother_occupation: formData.motherOccupation,
      mother_phone: formData.motherPhone,
      emergency_contact_name: formData.emergencyContactName,
      emergency_contact_phone: formData.emergencyContactPhone,
      emergency_contact_relation: formData.emergencyContactRelation,
     cnic_number: formData.cnic,
      blood_group: formData.bloodGroup,
      religion: formData.religion,
      profile_picture: formData.profilePicture
    }

    let response
    if (isEditMode.value) {
      response = await axios.post(`${import.meta.env.VITE_API_URL}/students/update/${route.params.id}`, payload)
    } else {
      response = await axios.post(`${import.meta.env.VITE_API_URL}/students/store`, payload)
    }
    
    if (response.data.success) {
      showSuccessModal.value = true
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    // Handle error
  } finally {
    loading.value = false
  }
}

const goToStudentList = () => {
  router.push('/students/list')
}

const resetForm = () => {
  if (isMultipleMode.value) {
    multipleStudents.value = [createEmptyStudent()]
  } else {
    Object.keys(formData).forEach(key => {
      formData[key] = ''
    })
    currentStep.value = 0
    generateStudentId()
  }
  showSuccessModal.value = false
}

const loadStudentData = async () => {
  if (!isEditMode.value) return
  
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/students/${route.params.id}`)
    if (response.data.success) {
      Object.assign(formData, response.data.data)
    }
  } catch (error) {
    console.error('Error loading student data:', error)
  }
}

// Comprehensive validation utilities
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePhone = (phone) => {
  const phoneRegex = /^(\+92|0)?[0-9]{10}$/
  return phoneRegex.test(phone.replace(/\s|-/g, ''))
}

const validateCNIC = (cnic) => {
  constcnic_numberRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/
  returncnic_numberRegex.test(cnic)
}

const validateAge = (date_of_birth) => {
  const today = new Date()
  const birthDate = new Date(date_of_birth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age >= 3 && age <= 25 // Reasonable age range for students
}

const validateadmission_date = (admission_date, date_of_birth) => {
  const admission = new Date(admission_date)
  const birth = new Date(date_of_birth)
  const today = new Date()
  
  // Admission date should be after birth date and not in future
  return admission > birth && admission <= today
}

const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s]{2,50}$/
  return nameRegex.test(name.trim())
}

const validateroll_number = (roll_number) => {
  const rollRegex = /^[A-Z0-9]{3,20}$/
  return rollRegex.test(roll_number.trim())
}

// Add form validation methods after the existing methods
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
      
      // Date of Birth validation
      if (!formData.date_of_birth) {
        validationErrors.value.date_of_birth = 'Date of Birth is required'
        isValid = false
      } else if (!validateAge(formData.date_of_birth)) {
        validationErrors.value.date_of_birth = 'Invalid age. Student must be between 3-25 years old'
        isValid = false
      }
      
      // Gender validation
      if (!formData.gender) {
        validationErrors.value.gender = 'Gender is required'
        isValid = false
      }
      
      //cnic_number validation (optional but if provided, should be valid)
      if (formData.cnic && !validateCNIC(formData.cnic)) {
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
      if (!formData.phone) {
        validationErrors.value.phone = 'Phone is required'
        isValid = false
      } else if (!validatePhone(formData.phone)) {
        validationErrors.value.phone = 'Phone format: +92 300 1234567 or 03001234567'
        isValid = false
      }
      
      // Address validation
      if (!formData.address) {
        validationErrors.value.address = 'Address is required'
        isValid = false
      } else if (formData.address.trim().length < 10) {
        validationErrors.value.address = 'Address should be at least 10 characters long'
        isValid = false
      }
      
      // City validation
      if (!formData.city) {
        validationErrors.value.city = 'City is required'
        isValid = false
      } else if (!validateName(formData.city)) {
        validationErrors.value.city = 'City name should contain only letters'
        isValid = false
      }
      
      // Postal code validation (optional but if provided, should be valid)
      if (formData.postalCode && !/^[0-9]{5}$/.test(formData.postalCode)) {
        validationErrors.value.postalCode = 'Postal code should be 5 digits'
        isValid = false
      }
      
      break
      
    case 2: // Academic Information
      // Roll Number validation
      if (!formData.roll_number) {
        validationErrors.value.roll_number = 'Roll Number is required'
        isValid = false
      } else if (!validateroll_number(formData.roll_number)) {
        validationErrors.value.roll_number = 'Roll Number should be 3-20 characters (letters and numbers only)'
        isValid = false
      }
      
      // Class validation
      if (!formData.classId) {
        validationErrors.value.classId = 'Class is required'
        isValid = false
      }
      
      // Section validation
      if (!formData.sectionId) {
        validationErrors.value.sectionId = 'Section is required'
        isValid = false
      }
      
      // Admission Date validation
      if (!formData.admission_date) {
        validationErrors.value.admission_date = 'Admission Date is required'
        isValid = false
      } else if (formData.date_of_birth && !validateadmission_date(formData.admission_date, formData.date_of_birth)) {
        validationErrors.value.admission_date = 'Admission date must be after birth date and not in future'
        isValid = false
      }
      
      // Academic Session validation
      if (!formData.academicSession) {
        validationErrors.value.academicSession = 'Academic Session is required'
        isValid = false
      }
      
      // Previous school validation (optional but if provided, should be valid)
      if (formData.previousSchool && formData.previousSchool.trim().length < 3) {
        validationErrors.value.previousSchool = 'Previous school name should be at least 3 characters'
        isValid = false
      }
      
      break
      
    case 3: // Family Information
      // Father's Name validation
      if (!formData.fatherName) {
        validationErrors.value.fatherName = 'Father\'s Name is required'
        isValid = false
      } else if (!validateName(formData.fatherName)) {
        validationErrors.value.fatherName = 'Father\'s Name should contain only letters (2-50 characters)'
        isValid = false
      }
      
      // Father'scnic_number validation
      if (!formData.fatherCnic) {
        validationErrors.value.fatherCnic = 'Father\'scnic_number is required'
        isValid = false
      } else if (!validateCNIC(formData.fatherCnic)) {
        validationErrors.value.fatherCnic = 'Father\'scnic_number format should be 00000-0000000-0'
        isValid = false
      }
      
      // Mother's Name validation
      if (!formData.motherName) {
        validationErrors.value.motherName = 'Mother\'s Name is required'
        isValid = false
      } else if (!validateName(formData.motherName)) {
        validationErrors.value.motherName = 'Mother\'s Name should contain only letters (2-50 characters)'
        isValid = false
      }
      
      // Father's phone validation (optional)
      if (formData.fatherPhone && !validatePhone(formData.fatherPhone)) {
        validationErrors.value.fatherPhone = 'Father\'s phone format: +92 300 1234567'
        isValid = false
      }
      
      // Mother's phone validation (optional)
      if (formData.motherPhone && !validatePhone(formData.motherPhone)) {
        validationErrors.value.motherPhone = 'Mother\'s phone format: +92 300 1234567'
        isValid = false
      }
      
      // Mother'scnic_number validation (optional)
      if (formData.motherCnic && !validateCNIC(formData.motherCnic)) {
        validationErrors.value.motherCnic = 'Mother\'scnic_number format should be 00000-0000000-0'
        isValid = false
      }
      
      // Emergency contact validation (optional)
      if (formData.emergencyContactPhone && !validatePhone(formData.emergencyContactPhone)) {
        validationErrors.value.emergencyContactPhone = 'Emergency contact phone format: +92 300 1234567'
        isValid = false
      }
      
      if (formData.emergencyContactName && !validateName(formData.emergencyContactName)) {
        validationErrors.value.emergencyContactName = 'Emergency contact name should contain only letters'
        isValid = false
      }
      
      break
      
    default:
      return true
  }
  
  return isValid
}

const clearValidationError = (field) => {
  if (validationErrors.value[field]) {
    delete validationErrors.value[field]
  }
}

// Lifecycle
onMounted(() => {
  loadClasses()
  loadSections()
  fetchSessions()
  if (isEditMode.value) {
    loadStudentData()
  } else {
    generateStudentId()
  }
  })
  
  // Lifecycle hooks
  onMounted(() => {
    // Initialize data
    loadClasses()
    loadSections()
    generateStudentId()
    
    // Test zoom functionality
    console.log('Component mounted - zoom functionality ready')
    console.log('Zoom level:', zoomLevel.value)
    console.log('Pan X:', panX.value)
    console.log('Pan Y:', panY.value)
  })

  onUnmounted(() => {
    // Cleanup event listeners
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'auto'
  })
  
  //cnic_number auto-formatting utility
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

// Watchers forcnic_number fields
watch(() => formData.cnic, (val) => {
  if (val) formData.cnic = formatCnic(val)
})
watch(() => formData.fatherCnic, (val) => {
  if (val) formData.fatherCnic = formatCnic(val)
})
watch(() => formData.motherCnic, (val) => {
  if (val) formData.motherCnic = formatCnic(val)
})

// Add watcher for date_of_birth to auto-validate and clear error in real-time
watch(() => formData.date_of_birth, (val) => {
  if (val) {
    validateStep(currentStep.value)
  }
})
// You can add similar watchers for other fields if needed

// Fetch functions are defined above as loadClasses, loadSections, and fetchSessions

const fetchSessions = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/sessions`)
    if (response.data.success && Array.isArray(response.data.result)) {
      sessions.value = response.data.result
    } else {
      console.error('Failed to fetch sessions:', response.data.message)
      // Fallback to default sessions if API fails
      const currentYear = new Date().getFullYear()
      sessions.value = [
        { id: 1, name: `${currentYear}-${currentYear + 1}` },
        { id: 2, name: `${currentYear - 1}-${currentYear}` },
        { id: 3, name: `${currentYear - 2}-${currentYear - 1}` }
      ]
    }
  } catch (error) {
    console.error('Error fetching sessions:', error)
    // Fallback to default sessions if API fails
    const currentYear = new Date().getFullYear()
    sessions.value = [
      { id: 1, name: `${currentYear}-${currentYear + 1}` },
      { id: 2, name: `${currentYear - 1}-${currentYear}` },
      { id: 3, name: `${currentYear - 2}-${currentYear - 1}` }
    ]
  }
}
</script>

<style scoped>
.form-group {
  @apply space-y-2;
}

.form-label {
  @apply block text-sm font-semibold text-gray-900 mb-2;
}

.form-input {
  @apply w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-gray-400;
}

.form-input:focus {
  @apply outline-none ring-2 ring-indigo-500 border-indigo-500 shadow-lg;
}

.btn-primary {
  @apply bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl;
}

.btn-secondary {
  @apply bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold flex items-center justify-center hover:bg-white transform hover:scale-105 transition-all duration-200 border border-gray-200;
}

.btn-success {
  @apply bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none;
}

/* Custom animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.form-section {
  animation: slideIn 0.3s ease-out;
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