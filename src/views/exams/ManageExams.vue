<template>
  <div class="relative w-full min-h-screen pl-0 pr-0 sm:pl-0 sm:pr-0 lg:pl-1 lg:pr-0 py-2 sm:py-3 lg:py-4">
    <!-- Top Bar Header -->
    <div class="w-full max-w-7xl mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
      <h2 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        Exam Management System
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Dashboard</span>
        <span class="mx-2">|</span>
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Exams</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">Manage Exams</span>
      </nav>
    </div>

    <!-- Select Criteria Label -->
    <div class="w-full max-w-7xl mx-auto mb-2">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-900 tracking-tight">Filter Exams</h3>
        <div class="h-[2px] bg-purple-200 w-full transition-all duration-300" style="max-width: 100px"></div>
      </div>
    </div>

    <!-- Filter Bar in Card -->
    <div class="w-full max-w-7xl mx-auto rounded-lg border border-gray-200 bg-white/90 px-4 sm:px-6 py-3 shadow-lg mb-6">
      <form class="w-full" @submit.prevent="filterExams">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Class</label>
            <div class="relative">
              <select v-model="filters.class" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="">All Classes</option>
                <option v-for="cls in classes" :key="cls.id" :value="cls.id">{{ cls.name }}</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
          
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</label>
            <div class="relative">
              <select v-model="filters.subject" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="">All Subjects</option>
                <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
          
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Exam Type</label>
            <div class="relative">
              <select v-model="filters.examType" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="">All Types</option>
                <option value="midterm">Midterm</option>
                <option value="final">Final</option>
                <option value="quiz">Quiz</option>
                <option value="assignment">Assignment</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
          
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Search Exam</label>
            <div class="relative">
              <input v-model="filters.search" type="text" placeholder="Search by exam name" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full">
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-2">
          <button type="submit" class="h-9 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">Filter</button>
        </div>
      </form>
    </div>

    <!-- Data List Header with Animation -->
    <div class="w-full max-w-7xl mx-auto flex items-center justify-between mb-8">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-900 tracking-tight flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce"></div>
          Exams List ({{ filteredExams.length }})
        </h3>
        <div class="h-[2px] bg-purple-200 w-full transition-all duration-500" style="max-width: 120px"></div>
      </div>
      
      <!-- Quick Search (centered) & Add Button -->
      <div class="flex-1 flex justify-center">
        <div class="w-full">
          <span class="absolute left-0 top-1/2 -translate-y-1/2 pl-2 text-purple-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            v-model="quickSearch"
            type="text"
            placeholder="QUICK SEARCH"
            class="w-full border-0 bg-transparent pl-10 pr-0 py-2 text-gray-900 font-medium text-xs tracking-wider uppercase focus:ring-0 focus:outline-none transition placeholder:text-gray-600 placeholder:font-medium placeholder:opacity-100 placeholder:text-xs shadow-none"
            style="letter-spacing:0.08em;"
          />
          <div class="absolute left-0 right-0 bottom-0 h-[1.5px] bg-purple-200 pointer-events-none"></div>
        </div>
      </div>
      
      <button 
        @click="showAddExamModal = true"
        class="px-8 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2 min-w-[140px]"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
        </svg>
        Add Exam
      </button>
    </div>
    
    <div class="w-full">
      <div class="h-[2px] w-full bg-purple-200 mb-4"></div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="w-full">
      <div class="border border-gray-200 rounded-xl p-8 bg-white/40 shadow-sm">
        <div class="flex flex-col items-center justify-center py-12">
          <div class="relative mb-6">
            <div class="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-500 rounded-full animate-ping opacity-20"></div>
          </div>
          <div class="text-center">
            <p class="text-gray-600 font-medium text-lg mb-1">Loading Exams</p>
            <p class="text-gray-500 text-sm font-normal">Please wait while we fetch the exam data...</p>
            <div class="flex justify-center mt-3 space-x-1">
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Exams Found -->
    <div v-else-if="!loading && filteredExams.length === 0" class="w-full">
      <div class="border border-gray-200 rounded-xl p-8 bg-white/40 shadow-sm">
        <div class="flex flex-col items-center justify-center py-12">
          <div class="relative mb-6">
            <div class="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
              </svg>
            </div>
            <div class="absolute -top-2 -right-2 w-4 h-4 bg-purple-300 rounded-full animate-ping opacity-30"></div>
            <div class="absolute -bottom-2 -left-2 w-3 h-3 bg-indigo-300 rounded-full animate-pulse"></div>
          </div>
          <div class="w-full">
            <h3 class="text-gray-600 font-medium text-xl mb-2">No Exams Found</h3>
            <p class="text-gray-500 text-sm font-normal leading-relaxed mb-4">
              No exams match your current filters. Try adjusting your search criteria or add a new exam.
            </p>
            <button 
              @click="showAddExamModal = true"
              class="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
            >
              Add First Exam
            </button>
          </div>
        </div>
      </div>
      </div>

    <!-- Exams Grid -->
    <div v-else-if="!loading && filteredExams.length > 0" class="w-full">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="exam in filteredExams" 
          :key="exam.id"
          class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-purple-100"
        >
          <!-- Exam Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-base font-medium text-gray-900 mb-1">{{ exam.name }}</h3>
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
                  {{ exam.type }}
                </span>
                <span class="text-xs text-gray-500">{{ exam.subject }}</span>
              </div>
            </div>
            <div class="flex gap-2">
              <button 
                @click="editExam(exam)"
                class="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                title="Edit Exam"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
              <button 
                @click="deleteExam(exam.id)"
                class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                title="Delete Exam"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Exam Details -->
          <div class="space-y-3">
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-xs font-semibold text-blue-700 uppercase tracking-wider">Class</label>
                  <div class="text-sm font-normal text-gray-900">{{ exam.class }}</div>
                </div>
                <div>
                  <label class="text-xs font-semibold text-blue-700 uppercase tracking-wider">Duration</label>
                  <div class="text-sm font-normal text-gray-900">{{ exam.duration }} mins</div>
                </div>
              </div>
            </div>
            
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-xs font-semibold text-green-700 uppercase tracking-wider">Date</label>
                  <div class="text-sm font-normal text-gray-900">{{ formatDate(exam.date) }}</div>
                </div>
                <div>
                  <label class="text-xs font-semibold text-green-700 uppercase tracking-wider">Total Marks</label>
                  <div class="text-sm font-normal text-gray-900">{{ exam.totalMarks }}</div>
                </div>
              </div>
            </div>
            
            <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
              <label class="text-xs font-semibold text-purple-700 uppercase tracking-wider">Status</label>
              <div class="flex items-center gap-2 mt-1">
                <span 
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    exam.status === 'completed' ? 'bg-green-100 text-green-800' :
                    exam.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  ]"
                >
                  {{ exam.status }}
                </span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-2 mt-6">
            <button 
              @click="viewExamDetails(exam)"
              class="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
            >
              View Details
            </button>
            <button 
              @click="manageResults(exam)"
              class="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-medium rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
            >
              Results
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Exam Modal -->
    <div v-if="showAddExamModal" class="relative z-10" @click.self="showAddExamModal = false">
      <div class="w-full">
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-t-xl">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-bold">{{ editingExam ? 'Edit Exam' : 'Add New Exam' }}</h3>
              <p class="text-purple-100 text-sm mt-1">{{ editingExam ? 'Update exam details' : 'Create a new exam for your students' }}</p>
            </div>
            <button 
              @click="closeModal"
              class="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="p-6">
          <form @submit.prevent="saveExam" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col w-full">
                <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Exam Name</label>
                <div class="relative">
                  <input 
                    v-model="examForm.name" 
                    type="text" 
                    required
                    placeholder="Enter exam name"
                    class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
                  />
                  <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                </div>
              </div>
              
              <div class="flex flex-col w-full">
                <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Exam Type</label>
                <div class="relative">
                  <select 
                    v-model="examForm.type" 
                    required
                    class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8"
                  >
                    <option value="">Select Type</option>
                    <option value="midterm">Midterm</option>
                    <option value="final">Final</option>
                    <option value="quiz">Quiz</option>
                    <option value="assignment">Assignment</option>
                  </select>
                  <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                  </div>
                  <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                </div>
              </div>
              
              <div class="flex flex-col w-full">
                <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Class</label>
                <div class="relative">
                  <select 
                    v-model="examForm.classId" 
                    required
                    class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8"
                  >
                    <option value="">Select Class</option>
                    <option v-for="cls in classes" :key="cls.id" :value="cls.id">{{ cls.name }}</option>
                  </select>
                  <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                  </div>
                  <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                </div>
              </div>
              
              <div class="flex flex-col w-full">
                <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</label>
                <div class="relative">
                  <select 
                    v-model="examForm.subjectId" 
                    required
                    class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8"
                  >
                    <option value="">Select Subject</option>
                    <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
                  </select>
                  <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                  </div>
                  <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                </div>
              </div>
              
              <div class="flex flex-col w-full">
                <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</label>
                <div class="relative">
                  <input 
                    v-model="examForm.date" 
            type="date"
                    required
                    class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
                  />
                  <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                </div>
              </div>
              
              <div class="flex flex-col w-full">
                <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Duration (minutes)</label>
                <div class="relative">
                  <input 
                    v-model="examForm.duration" 
                    type="number" 
                    required
                    placeholder="e.g., 120"
                    class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
                  />
                  <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                </div>
              </div>
              
              <div class="flex flex-col w-full">
                <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Marks</label>
                <div class="relative">
                  <input 
                    v-model="examForm.totalMarks" 
                    type="number" 
                    required
                    placeholder="e.g., 100"
                    class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
                  />
                  <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                </div>
              </div>
              
              <div class="flex flex-col w-full">
                <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</label>
                <div class="relative">
                  <select 
                    v-model="examForm.status" 
                    required
                    class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                  <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                  </div>
                  <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                </div>
              </div>
            </div>
            
            <div class="flex flex-col w-full">
              <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</label>
              <div class="relative">
                <textarea 
                  v-model="examForm.description" 
                  rows="3"
                  placeholder="Enter exam description (optional)"
                  class="border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full resize-none"
                ></textarea>
                <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="flex gap-3 pt-4 border-t">
              <button 
                type="button"
                @click="closeModal"
                class="flex-1 h-9 px-8 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 text-sm font-bold text-white shadow hover:from-gray-600 hover:to-slate-600 transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
              <button 
                type="submit"
                :disabled="saving"
                class="flex-1 h-9 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span v-if="saving" class="flex items-center justify-center gap-2">
                  <div class="w-4 h-4 border-2 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </span>
                <span v-else>{{ editingExam ? 'Update Exam' : 'Create Exam' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import { ref, onMounted, computed } from 'vue'

// Reactive data
const toast = useToast()
const loading = ref(false)
const saving = ref(false)
const showAddExamModal = ref(false)
const editingExam = ref(null)
const quickSearch = ref('')

// Filters
const filters = ref({
  class: '',
  subject: '',
  examType: '',
  search: ''
})

// Form data
const examForm = ref({
  name: '',
  type: '',
  classId: '',
  subjectId: '',
  date: '',
  duration: '',
  totalMarks: '',
  status: 'upcoming',
  description: ''
})

// Sample data
const exams = ref([
  {
    id: 1,
    name: 'Mathematics Midterm Exam',
    type: 'midterm',
    subject: 'Mathematics',
    class: 'Grade 9',
    date: '2024-03-15',
    duration: 120,
    totalMarks: 100,
    status: 'upcoming',
    description: 'Comprehensive mathematics exam covering algebra and geometry'
  },
  {
    id: 2,
    name: 'English Literature Quiz',
    type: 'quiz',
    subject: 'English',
    class: 'Grade 10',
    date: '2024-03-10',
    duration: 60,
    totalMarks: 50,
    status: 'completed',
    description: 'Quick assessment on Shakespeare and poetry'
  },
  {
    id: 3,
    name: 'Science Final Exam',
    type: 'final',
    subject: 'Science',
    class: 'Grade 8',
    date: '2024-04-20',
    duration: 180,
    totalMarks: 150,
    status: 'upcoming',
    description: 'Comprehensive science exam covering all units'
  }
])

const classes = ref([
  { id: 1, name: 'Grade 8' },
  { id: 2, name: 'Grade 9' },
  { id: 3, name: 'Grade 10' }
])

const subjects = ref([
  { id: 1, name: 'Mathematics' },
  { id: 2, name: 'English' },
  { id: 3, name: 'Science' },
  { id: 4, name: 'History' },
  { id: 5, name: 'Geography' }
])

// Computed properties
const filteredExams = computed(() => {
  let filtered = exams.value

  // Apply filters
  if (filters.value.class) {
    const className = classes.value.find(c => c.id == filters.value.class)?.name
    filtered = filtered.filter(exam => exam.class === className)
  }

  if (filters.value.subject) {
    const subjectName = subjects.value.find(s => s.id == filters.value.subject)?.name
    filtered = filtered.filter(exam => exam.subject === subjectName)
  }

  if (filters.value.examType) {
    filtered = filtered.filter(exam => exam.type === filters.value.examType)
  }

  if (filters.value.search || quickSearch.value) {
    const searchTerm = (filters.value.search || quickSearch.value).toLowerCase()
    filtered = filtered.filter(exam => 
      exam.name.toLowerCase().includes(searchTerm) ||
      exam.subject.toLowerCase().includes(searchTerm) ||
      exam.class.toLowerCase().includes(searchTerm)
    )
  }

  return filtered
})

// Methods
const filterExams = () => {
  // Filter functionality is handled by computed property
}

const editExam = (exam) => {
  editingExam.value = exam
  examForm.value = { ...exam }
  showAddExamModal.value = true
}

const deleteExam = (examId) => {
  if (confirm('Are you sure you want to delete this exam?')) {
    const index = exams.value.findIndex(exam => exam.id === examId)
    if (index !== -1) {
      exams.value.splice(index, 1)
    }
  }
}

const saveExam = async () => {
  saving.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (editingExam.value) {
      // Update existing exam
      const index = exams.value.findIndex(exam => exam.id === editingExam.value.id)
      if (index !== -1) {
        exams.value[index] = { ...examForm.value }
      }
    } else {
      // Add new exam
      const newExam = {
        ...examForm.value,
        id: Date.now(),
        class: classes.value.find(c => c.id == examForm.value.classId)?.name || '',
        subject: subjects.value.find(s => s.id == examForm.value.subjectId)?.name || ''
      }
      exams.value.push(newExam)
    }
    
    closeModal()
  } catch (error) {
    console.error('Error saving exam:', error)
  } finally {
    saving.value = false
  }
}

const closeModal = () => {
  showAddExamModal.value = false
  editingExam.value = null
  examForm.value = {
    name: '',
    type: '',
    classId: '',
    subjectId: '',
    date: '',
    duration: '',
    totalMarks: '',
    status: 'upcoming',
    description: ''
  }
}

const viewExamDetails = (exam) => {
  // Navigate to exam details page
  console.log('Viewing exam details:', exam)
}

const manageResults = (exam) => {
  // Navigate to results management
  console.log('Managing results for:', exam)
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

// Lifecycle
onMounted(() => {
  // Initialize component
})
</script>

<style scoped>
/* Professional ERP Animations */
.tab-content-3d {
  perspective: 1000px;
  transform-style: preserve-3d;
}

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

/* Custom styling for professional look */
.bg-white\/90 {
  background-color: #ffffff;
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

.text-gray-900 {
  color: #1e293b;
}
</style> 