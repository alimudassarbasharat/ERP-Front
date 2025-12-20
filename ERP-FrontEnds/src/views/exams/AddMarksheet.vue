<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
    <!-- Top Bar Header -->
    <div class="w-full max-w-7xl mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
      <h2 class="text-base font-medium text-gray-900 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        Add Marksheet - {{ getSectionName(selectedSection) }}
            </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-600">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Dashboard</span>
        <span class="mx-2">|</span>
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Exams</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">Add Marksheet</span>
      </nav>
          </div>

    <!-- Mode Toggle -->
    <div class="w-full max-w-7xl mx-auto mb-6 flex justify-end">
      <div class="flex bg-white rounded-full shadow-lg p-1 border border-gray-200">
        <button
          @click="subjectWiseMode = false"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform relative overflow-hidden',
            !subjectWiseMode 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105'
              : 'text-purple-600 hover:text-purple-700 hover:bg-gray-50 hover:scale-102'
          ]"
        >
          <span class="relative z-10">Normal View</span>
          <div v-if="!subjectWiseMode" class="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-pulse rounded-full"></div>
        </button>
        <div class="h-6 w-px bg-purple-200 mx-1 self-center"></div>
        <button
          @click="subjectWiseMode = true"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform relative overflow-hidden',
            subjectWiseMode 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105'
              : 'text-purple-600 hover:text-purple-700 hover:bg-gray-50 hover:scale-102'
          ]"
        >
          <span class="relative z-10">Subject Wise</span>
          <div v-if="subjectWiseMode" class="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-pulse rounded-full"></div>
        </button>
            </div>
            </div>

    <!-- Select Criteria Label -->
    <div class="w-full max-w-7xl mx-auto mb-2">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-900 tracking-tight">Filter Students</h3>
        <div class="h-[2px] bg-purple-200 w-full transition-all duration-300" style="max-width: 120px"></div>
            </div>
          </div>

    <!-- Filter Bar -->
    <div class="w-full max-w-7xl mx-auto rounded-lg border border-gray-200 bg-white/90 px-4 sm:px-6 py-3 shadow-lg mb-6">
      <form class="w-full" @submit.prevent="applyFilters">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Class</label>
            <div class="relative">
              <select v-model="selectedClass" @change="onClassChange" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="">All Classes</option>
                <option v-for="cls in classes" :key="cls.id" :value="String(cls.id)">{{ cls.name }}</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
        </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
        </div>
        </div>

          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Section</label>
            <div class="relative">
              <select v-model="selectedSection" @change="onSectionChange" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="">All Sections</option>
                <option v-for="section in sections" :key="section.id" :value="String(section.id)">{{ section.name }}</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
      </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
        </div>
          </div>

          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Exam</label>
            <div class="relative">
              <select v-model="selectedExam" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="">Select Exam</option>
                <option v-for="exam in exams" :key="exam.id" :value="exam.id">{{ exam.name }}</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>

          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Marks</label>
            <div class="relative">
              <input v-model="totalMarks" type="number" placeholder="Enter total marks" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full" @input="applyTotalMarks">
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-2 mt-2">
          <button type="button" @click="clearFilters" class="h-9 px-8 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 text-sm font-bold text-white shadow hover:from-gray-600 hover:to-slate-600 transition-all duration-300 transform hover:scale-105">Clear</button>
          <button 
            type="submit"
            @click="applyFilters"
            class="h-9 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
            </svg>
            Filter
          </button>
          <button 
            @click="showExamModal = true"
            class="h-9 px-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-sm font-bold text-white shadow hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            Create Exam
          </button>
        </div>
      </form>
    </div>

    <!-- Data List Header -->
    <div class="w-full max-w-7xl mx-auto flex items-center justify-between mb-8">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-900 tracking-tight flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce"></div>
          {{ subjectWiseMode ? 'Subject Wise Marks' : 'Student Marksheet' }} ({{ totalStudents }})
        </h3>
        <div class="h-[2px] bg-purple-200 w-full transition-all duration-500" style="max-width: 200px"></div>
      </div>
    </div>

    <div class="w-full max-w-7xl mx-auto">
      <div class="h-[2px] w-full bg-purple-200 mb-4"></div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="w-full max-w-7xl mx-auto">
      <div class="border border-gray-200 rounded-xl p-8 bg-white/40 shadow-sm">
        <div class="flex flex-col items-center justify-center py-12">
          <div class="relative mb-6">
            <div class="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-500 rounded-full animate-ping opacity-20"></div>
          </div>
          <div class="text-center">
            <p class="text-gray-600 font-medium text-lg mb-1">Loading Data</p>
            <p class="text-gray-500 text-sm font-normal">Please wait while we fetch the student information...</p>
            <div class="flex justify-center mt-3 space-x-1">
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Data Found -->
    <div v-else-if="!loading && filteredStudents.length === 0" class="w-full max-w-7xl mx-auto">
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
          <div class="text-center max-w-sm">
            <h3 class="text-gray-600 font-medium text-xl mb-2">No Students Found</h3>
            <p class="text-gray-500 text-sm font-normal leading-relaxed mb-4">
              No students match your current filters. Please adjust your search criteria.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Marksheet Table -->
    <div v-else-if="!loading && filteredStudents.length > 0" class="w-full max-w-7xl mx-auto">
      <!-- Subject Wise Mode -->
      <div v-if="subjectWiseMode" class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
              <tr>
                <th @click="handleSort('first_name')" class="text-left py-3 px-4 font-medium text-gray-900 text-sm tracking-wider cursor-pointer select-none group transition-all duration-150 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-b-2 border-purple-400 relative #ffffffspace-nowrap">
                  <span class="flex items-center gap-1">
                    Student
                    <span class="flex flex-col ml-1">
                      <svg v-if="sortBy === 'first_name' && sortDirection === 'asc'" class="w-3 h-3 text-purple-500 transform -rotate-180" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                      <svg v-else-if="sortBy === 'first_name' && sortDirection === 'desc'" class="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                      <svg v-else class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                    </span>
                  </span>
                </th>
                <th v-for="subject in subjects" :key="subject.id" class="text-center py-3 px-4 font-medium text-gray-900 text-sm tracking-wider border-b-2 border-purple-400 min-w-[120px]">
                  <div class="flex flex-col items-center gap-2">
                    <span>{{ subject.name }}</span>
                    <div class="relative">
                      <input v-model="subjectTotalMarks[subject.id]" type="number" placeholder="Total" class="w-16 h-8 border-0 bg-white px-2 text-xs font-light text-gray-600 focus:ring-0 focus:outline-none text-center rounded-md">
                      <div class="absolute left-0 right-0 bottom-0 h-[1px] bg-purple-200"></div>
                    </div>
                  </div>
                </th>
                <th class="text-center py-3 px-4 font-medium text-gray-900 text-sm tracking-wider border-b-2 border-purple-400">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(student, index) in subjectWiseRows" :key="student.id" class="hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors border-b border-purple-200">
                <td class="py-3 px-4 text-gray-600 font-normal text-sm">{{ student.first_name }} {{ student.last_name }}</td>
                <td v-for="subject in subjects" :key="subject.id" class="py-3 px-4 text-center">
                  <div class="relative">
                    <input 
                      v-if="student.subjectMarks && student.subjectMarks[subject.id]"
                      v-model="student.subjectMarks[subject.id].obtain" 
                type="number"
                      placeholder="Marks"
                      class="w-16 h-8 border-0 bg-transparent px-2 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none text-center"
                    />
                    <div class="absolute left-0 right-0 bottom-0 h-[1px] bg-purple-200"></div>
                  </div>
                </td>
                <td class="py-3 px-4 text-center">
                  <button @click="saveSubjectWiseMarks(student)" class="px-4 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-medium rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105">
                    Save
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Normal Mode -->
      <div v-else class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
              <tr>
                <th class="text-left py-3 px-4 font-medium text-gray-900 text-sm tracking-wider border-b-2 border-purple-400">#</th>
                <th @click="handleSort('first_name')" class="text-left py-3 px-4 font-medium text-gray-900 text-sm tracking-wider cursor-pointer select-none group transition-all duration-150 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-b-2 border-purple-400 relative #ffffffspace-nowrap">
                  <span class="flex items-center gap-1">
                    Student Name
                    <span class="flex flex-col ml-1">
                      <svg v-if="sortBy === 'first_name' && sortDirection === 'asc'" class="w-3 h-3 text-purple-500 transform -rotate-180" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                      <svg v-else-if="sortBy === 'first_name' && sortDirection === 'desc'" class="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                      <svg v-else class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                    </span>
                  </span>
                </th>
                <th @click="handleSort('roll_number')" class="text-left py-3 px-4 font-medium text-gray-900 text-sm tracking-wider cursor-pointer select-none group transition-all duration-150 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-b-2 border-purple-400 relative #ffffffspace-nowrap">
                  <span class="flex items-center gap-1">
                    Roll No
                    <span class="flex flex-col ml-1">
                      <svg v-if="sortBy === 'roll_number' && sortDirection === 'asc'" class="w-3 h-3 text-purple-500 transform -rotate-180" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                      <svg v-else-if="sortBy === 'roll_number' && sortDirection === 'desc'" class="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                      <svg v-else class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                    </span>
                  </span>
                </th>
                <th @click="handleSort('class_name')" class="text-left py-3 px-4 font-medium text-gray-900 text-sm tracking-wider cursor-pointer select-none group transition-all duration-150 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-b-2 border-purple-400 relative #ffffffspace-nowrap">
                  <span class="flex items-center gap-1">
                    Class
                    <span class="flex flex-col ml-1">
                      <svg v-if="sortBy === 'class_name' && sortDirection === 'asc'" class="w-3 h-3 text-purple-500 transform -rotate-180" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                      <svg v-else-if="sortBy === 'class_name' && sortDirection === 'desc'" class="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                      <svg v-else class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                    </span>
                  </span>
                </th>
                <th class="text-left py-3 px-4 font-medium text-gray-900 text-sm tracking-wider border-b-2 border-purple-400">Total Marks</th>
                <th class="text-left py-3 px-4 font-medium text-gray-900 text-sm tracking-wider border-b-2 border-purple-400">Obtain Marks</th>
                <th class="text-center py-3 px-4 font-medium text-gray-900 text-sm tracking-wider border-b-2 border-purple-400">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in marksheetRows" :key="index" class="hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors border-b border-purple-200">
                <td class="py-3 px-4 text-gray-600 font-normal text-sm">{{ index + 1 }}</td>
                <td class="py-3 px-4 text-gray-600 font-normal text-sm">{{ row.first_name }} {{ row.last_name }}</td>
                <td class="py-3 px-4 text-gray-600 font-normal text-sm">{{ row.roll_number }}</td>
                <td class="py-3 px-4 text-gray-600 font-normal text-sm">{{ row.class_name }}</td>
                <td class="py-3 px-4 text-gray-600 font-normal text-sm">{{ row.total_marks }}</td>
                <td class="py-3 px-4">
                  <div class="relative">
                    <input 
                  v-model="row.obtain_marks"
                  type="number"
                      placeholder="Enter marks"
                  :max="row.total_marks"
                      class="w-24 h-8 border-0 bg-transparent px-2 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none"
                    />
                    <div class="absolute left-0 right-0 bottom-0 h-[1px] bg-purple-200"></div>
                  </div>
                </td>
                <td class="py-3 px-4 text-center">
                  <button 
                  @click="saveSingleMarksheet(row)"
                :disabled="!row.total_marks || !row.obtain_marks"
                    class="px-4 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-medium rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Save
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Bulk Save Button -->
        <div v-if="canSaveMarksheet" class="p-6 border-t bg-gray-50 flex justify-end">
          <button 
          @click="saveMarksheet"
            class="px-8 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
          >
            Save All Marksheets
          </button>
        </div>
      </div>

      <!-- Pagination Section -->
      <div v-if="!loading && totalStudents > 0" class="w-full max-w-7xl mx-auto mt-8">
        <!-- Pagination Summary -->
        <div class="flex flex-row items-center justify-between mb-4">
          <div class="text-gray-600 text-sm font-medium px-2">
            Showing {{ (currentPage - 1) * pageSize + 1 }}
            to {{ Math.min(currentPage * pageSize, totalStudents) }}
            of {{ totalStudents }} entries
          </div>
          <div class="flex items-center gap-4">
            <label class="text-sm text-gray-600 font-medium flex items-center gap-1">
              Per page:
              <select v-model="pageSize" @change="handlePerPageChange" class="rounded-md border border-purple-200 bg-white px-2 py-1 text-xs font-semibold text-purple-700 focus:ring-2 focus:ring-purple-300">
                <option v-for="size in [10, 20, 50, 100]" :key="size" :value="size">{{ size }}</option>
              </select>
            </label>
            <label class="text-sm text-gray-600 font-medium flex items-center gap-1 mr-3">
              Go to page:
              <input v-model.number="goToPage" type="number" min="1" :max="totalPages" class="w-16 rounded-md border border-purple-200 px-2 py-1 text-xs font-semibold text-purple-700 focus:ring-2 focus:ring-purple-300" @keyup.enter="handleGoToPage" />
              <button @click="handleGoToPage" class="ml-1 px-2 py-1 rounded-md bg-purple-500 text-white text-xs font-semibold hover:bg-purple-600 transition-all flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
                Go
              </button>
            </label>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div class="flex justify-center">
          <div class="flex items-center gap-2">
            <button
              class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-50 text-purple-500 text-xl font-bold shadow-sm transition-all duration-200 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-40 disabled:cursor-not-allowed"
              :disabled="currentPage === 1"
              @click="handlePageChange(currentPage - 1)"
              aria-label="Previous"
            >
              <span>&larr;</span>
            </button>
            <span class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-600 text-white text-base font-bold shadow-md">
              {{ currentPage }}
            </span>
            <button
              class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-50 text-purple-500 text-xl font-bold shadow-sm transition-all duration-200 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-40 disabled:cursor-not-allowed"
              :disabled="currentPage === totalPages"
              @click="handlePageChange(currentPage + 1)"
              aria-label="Next"
            >
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Exam Modal -->
    <div v-if="showExamModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200">
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-t-xl">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-bold">Create New Exam</h3>
              <p class="text-purple-100 text-sm mt-1">Set up a new exam for marksheet entry</p>
            </div>
            <button 
              @click="showExamModal = false"
              class="p-2 hover:bg-gray-50/20 rounded-lg transition-colors duration-200"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="p-6">
          <form @submit.prevent="createExam" class="space-y-6">
            <div class="grid grid-cols-1 gap-6">
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
                <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Term</label>
                <div class="relative">
                  <input 
                    v-model="examForm.term" 
                    type="text" 
                    required
                    placeholder="e.g., Mid, Final"
                    class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
                  />
                  <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
      </div>
              </div>
              
              <div class="flex flex-col w-full">
                <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Academic Year</label>
                <div class="relative">
                  <input 
                    v-model="examForm.academic_year" 
                    type="text" 
                    required
                    placeholder="e.g., 2024-2025"
                    class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
                  />
                  <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                </div>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="flex gap-3 pt-4 border-t border-gray-200">
              <button 
                type="button"
                @click="showExamModal = false"
                class="flex-1 h-9 px-8 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 text-sm font-bold text-white shadow hover:from-gray-600 hover:to-slate-600 transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
              <button 
                type="submit"
                class="flex-1 h-9 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                Create Exam
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
      </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import api from '@/utils/axios'

// Use centralized axios instance
const toast = useToast()
const axios = api

// Reactive data
const loading = ref(false)
const showExamModal = ref(false)
const subjectWiseMode = ref(false)

// Filter data
const classes = ref([])
const sections = ref([])
const students = ref([])
const subjects = ref([])
const exams = ref([])

const selectedClass = ref('')
const selectedSection = ref('')
const selectedExam = ref('')
const totalMarks = ref('')

// Pagination
const currentPage = ref(1)
const pageSize = ref(20)
const totalStudents = ref(0)
const goToPage = ref(1)
const totalPages = computed(() => Math.ceil(totalStudents.value / pageSize.value))

// Sorting
const sortBy = ref('first_name')
const sortDirection = ref('asc')

// Exam form
const examForm = ref({
  name: '',
  term: '',
  academic_year: '',
  merchant_id: '',
  created_by: ''
})

// Subject total marks for subject-wise mode
const subjectTotalMarks = reactive({})

// Computed properties
const filteredStudents = computed(() => students.value)

const selectedExamName = computed(() => {
  const exam = exams.value.find(e => e.id === selectedExam.value)
  return exam ? exam.name : '-'
})

const subjectWiseRows = computed(() => {
  return students.value.map(student => {
    const subjectMarks = {}
    subjects.value.forEach(subject => {
      subjectMarks[subject.id] = { obtain: '' }
    })
    return {
      ...student,
      subjectMarks
    }
  })
})

const marksheetRows = ref([])

const canSaveMarksheet = computed(() => {
  return marksheetRows.value.some(
    row => row.total_marks !== '' && row.obtain_marks !== ''
  )
})

// Methods
const getSectionName = (id) => {
  if (!id) return 'All'
  const section = sections.value.find(s => String(s.id) === String(id))
  return section ? section.name : 'All'
}

const clearFilters = async () => {
  console.log('Clearing all filters')
  selectedClass.value = ''
  selectedSection.value = ''
  selectedExam.value = ''
  totalMarks.value = ''
  sections.value = []
  subjects.value = []
  students.value = []
  totalStudents.value = 0
  currentPage.value = 1
  await fetchStudents(null, null, 1)
}

const applyFilters = async () => {
  currentPage.value = 1
  await fetchStudents(selectedClass.value, selectedSection.value, 1)
  toast.success('Filters applied successfully!')
}

const applyTotalMarks = () => {
  marksheetRows.value.forEach(row => {
    row.total_marks = totalMarks.value
  })
}

const fetchStudents = async (classId, sectionId, page = 1) => {
  loading.value = true
  try {
    const params = {
      page: page,
      per_page: pageSize.value
    }
    if (classId) params.class_id = String(classId)
    if (sectionId) params.section_id = String(sectionId)
    
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/students`, { params })
    if (res.data.status && res.data.result && Array.isArray(res.data.result.data)) {
      students.value = res.data.result.data.map(s => ({
        ...s,
        class_name: s.class?.name || '',
      }))
      totalStudents.value = res.data.result.total || 0
      currentPage.value = res.data.result.current_page || 1
    } else {
      students.value = []
      totalStudents.value = 0
    }
  } catch (error) {
    console.error('Error fetching students:', error)
    students.value = []
    totalStudents.value = 0
  } finally {
    loading.value = false
  }
}

const fetchSubjects = async (classId) => {
  if (!classId) {
    subjects.value = []
    return
  }
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/classes/${classId}`)
    if (res.data.success && res.data.result && Array.isArray(res.data.result.subjects)) {
      subjects.value = res.data.result.subjects
    } else {
      subjects.value = []
    }
  } catch (error) {
    console.error('Error fetching subjects:', error)
    subjects.value = []
  }
}

const fetchSections = async (classId) => {
  if (!classId) {
    sections.value = []
    return
  }
  try {
    const sectionRes = await axios.get(`${import.meta.env.VITE_API_URL}/sections`, {
      params: { class_id: String(classId) }
    })
    if (sectionRes.data.success) {
      sections.value = sectionRes.data.result || []
    } else {
      sections.value = []
    }
  } catch (error) {
    console.error('Error fetching sections:', error)
    sections.value = []
  }
}

const fetchExams = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/exams`)
    if (res.data.success && res.data.result) {
      exams.value = res.data.result || []
    if (exams.value.length && !selectedExam.value) {
      selectedExam.value = exams.value[0].id
    }
    } else {
      exams.value = []
    }
  } catch (error) {
    console.error('Error fetching exams:', error)
    exams.value = []
  }
}

const createExam = async () => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/exams/store`, examForm.value)
    if (res.data.success) {
      toast.success('Exam created successfully!')
    showExamModal.value = false
    await fetchExams()
    selectedExam.value = res.data.result.id
      
      // Reset form
      examForm.value = {
        name: '',
        term: '',
        academic_year: '',
        merchant_id: '',
        created_by: ''
      }
  } else {
      toast.error(res.data.message || 'Failed to create exam')
    }
  } catch (error) {
    console.error('Error creating exam:', error)
    toast.error('Failed to create exam')
  }
}

const saveMarksheet = () => {
  toast.success('All marksheets saved successfully!')
}

const saveSingleMarksheet = async (row) => {
  try {
    let percentage = ''
    if (row.total_marks && row.obtain_marks) {
      percentage = ((parseFloat(row.obtain_marks) / parseFloat(row.total_marks)) * 100).toFixed(2)
    }
    
    const payload = {
      student_id: row.id,
      exam_id: selectedExam.value,
      total_mark_obtains: row.obtain_marks,
      total_marks: row.total_marks,
      percentage: percentage
    }
    
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/result-sheet/store`, payload)
    if (res.data.success) {
      toast.success('Marksheet saved successfully!')
    } else {
      toast.error(res.data.message || 'Failed to save marksheet!')
    }
  } catch (error) {
    console.error('Error saving marksheet:', error)
    toast.error('Failed to save marksheet!')
  }
}

const saveSubjectWiseMarks = async (row) => {
  try {
    const marks = []
    for (const subject of subjects.value) {
      const mark_obtained = row.subjectMarks[subject.id].obtain
      const max_marks = subjectTotalMarks[subject.id]
      if (mark_obtained === '' || max_marks === '') continue
      marks.push({
        subject_id: subject.id,
        mark_obtained,
        max_marks
      })
    }
    if (marks.length === 0) {
      toast.warning('No marks to save!')
      return
    }
    
    const payload = {
      student_id: row.id,
      exam_id: selectedExam.value,
      marks
    }
    
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/subject-mark-sheets/bulk-store`, payload)
    if (res.data.success) {
      toast.success('Subject marks saved successfully!')
    } else {
      toast.error(res.data.message || 'Failed to save subject marks!')
    }
  } catch (error) {
    console.error('Error saving subject marks:', error)
    toast.error('Failed to save subject marks!')
  }
}

const handlePageChange = (page) => {
  currentPage.value = page
  fetchStudents(selectedClass.value, selectedSection.value, page)
}

const handlePerPageChange = () => {
  currentPage.value = 1
  fetchStudents(selectedClass.value, selectedSection.value, 1)
}

const handleGoToPage = () => {
  if (goToPage.value >= 1 && goToPage.value <= totalPages.value) {
    currentPage.value = goToPage.value
    fetchStudents(selectedClass.value, selectedSection.value, goToPage.value)
  }
}

// Sorting handler
const handleSort = (column) => {
  if (sortBy.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column
    sortDirection.value = 'asc'
  }
  
  // Apply sorting to students list
  const sorted = [...students.value].sort((a, b) => {
    let aVal = a[column]
    let bVal = b[column]
    
    if (aVal === null || aVal === undefined) aVal = ''
    if (bVal === null || bVal === undefined) bVal = ''
    
    if (sortDirection.value === 'asc') {
      return aVal > bVal ? 1 : aVal < bVal ? -1 : 0
    } else {
      return aVal < bVal ? 1 : aVal > bVal ? -1 : 0
    }
  })
  
  students.value = sorted
}

const onClassChange = async () => {
  console.log('Class changed to:', selectedClass.value)
  if (selectedClass.value) {
    // Fetch sections for selected class
    await fetchSections(selectedClass.value)
    // Fetch subjects for selected class
    await fetchSubjects(selectedClass.value)
    // Reset section selection
    selectedSection.value = ''
  } else {
    // Clear sections and subjects if no class selected
    sections.value = []
    subjects.value = []
    selectedSection.value = ''
  }
  // Fetch students with new filter
  currentPage.value = 1
  await fetchStudents(selectedClass.value, selectedSection.value, 1)
}

const onSectionChange = async () => {
  console.log('Section changed to:', selectedSection.value)
  // Fetch students with new filter
  currentPage.value = 1
  await fetchStudents(selectedClass.value, selectedSection.value, 1)
}

// Watchers

watch(subjects, (subs) => {
  subs.forEach(subject => {
    if (!(subject.id in subjectTotalMarks)) {
      subjectTotalMarks[subject.id] = ''
    }
  })
})

watch([students, subjects, totalMarks], ([stu, sub, total]) => {
  const newRows = []
  if (sub.length > 0) {
    stu.forEach(student => {
      sub.forEach(subject => {
        const existing = marksheetRows.value.find(
          r => r.student_id === student.id && r.subject_id === subject.id
        )
        newRows.push({
          ...student,
          subject_id: subject.id,
          subject_name: subject.name,
          obtain_marks: existing ? existing.obtain_marks : '',
          total_marks: total || '',
        })
      })
    })
  } else {
    stu.forEach(student => {
      const existing = marksheetRows.value.find(
        r => r.student_id === student.id
      )
      newRows.push({
        ...student,
        subject_id: '',
        subject_name: '',
        obtain_marks: existing ? existing.obtain_marks : '',
        total_marks: total || '',
      })
    })
  }
  marksheetRows.value = newRows
}, { immediate: true })

// Lifecycle
onMounted(async () => {
  loading.value = true
  try {
    const classRes = await axios.get(`${import.meta.env.VITE_API_URL}/classes`)
    if (classRes.data.success) {
      classes.value = classRes.data.result || []
    }
    await fetchStudents(null, null, 1)
    await fetchExams()
  } catch (error) {
    console.error('Error loading initial data:', error)
  } finally {
  loading.value = false
  }
})
</script>

<style scoped>
/* Professional ERP styling */
.bg-white {
  background-color: #f1f5f9; /* Light blue background */
}

.bg-white {
  background-color: #ffffff; /* White card background */
}

.text-gray-900 {
  color: #3b82f6; /* Dark blue text */
}

.text-gray-600 {
  color: #4b5563; /* Gray text */
}

.text-gray-500 {
  color: #94a3b8; /* Muted gray text */
}

.text-theme-tertiary {
  color: #94a3b8; /* Very light gray text */
}

/* Animations */
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

/* Select element styling for better visibility */
select {
  color: #1e293b !important;
}

select option {
  color: #1e293b !important;
  background-color: #ffffff;
  padding: 8px 12px;
}

select option[value=""] {
  color: #94a3b8 !important;
}

/* Focus state for better visibility */
select:focus {
  color: #1e293b !important;
}

/* Hover state */
select:hover {
  color: #1e293b !important;
}

/* Dropdown styling for better contrast */
select option:hover,
select option:focus,
select option:active,
select option:checked {
  background-color: #8b5cf6 !important;
  color: #ffffff !important;
  font-weight: 500;
}

/* Ensure selected option is visible */
select option:checked {
  background-color: #8b5cf6 !important;
  color: #ffffff !important;
  font-weight: 500;
}

/* Dropdown list styling */
select {
  background-color: #ffffff;
}

/* Custom dropdown arrow */
select {
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style> 