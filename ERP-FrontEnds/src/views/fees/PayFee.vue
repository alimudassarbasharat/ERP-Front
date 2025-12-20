<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <!-- View Mode Tabs -->
      <div class="w-full max-w-7xl mx-auto mb-6 flex justify-end">
        <div class="flex bg-white rounded-full shadow-lg p-1 border border-purple-100">
          <template v-for="(tab, idx) in viewTabs" :key="tab.key">
            <button 
              @click="setViewMode(tab.key)"
              :class="[
                (viewMode === tab.key ? 'px-3' : 'px-4'),
                'py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform relative overflow-hidden',
                viewMode === tab.key 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105' 
                  : 'text-purple-600 hover:text-purple-700 hover:bg-purple-50 hover:scale-102'
              ]"
            >
              <span class="relative z-10 flex items-center gap-2">
                <svg v-if="tab.icon === 'User'" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <svg v-else-if="tab.icon === 'AcademicCap'" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                </svg>
                <svg v-else-if="tab.icon === 'Users'" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                </svg>
                {{ tab.label }}
                <span v-if="tab.count !== null" class="px-2 py-0.5 rounded-full text-xs font-bold bg-white text-purple-700 border border-purple-200 ml-1">
                  {{ tab.count }}
                </span>
              </span>
              <div 
                v-if="viewMode === tab.key" 
                class="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-pulse rounded-full"
              ></div>
            </button>
            <div
              v-if="idx < viewTabs.length - 1"
              class="h-6 w-px bg-purple-200 mx-1 self-center"
            ></div>
          </template>
        </div>
      </div>
  
      <!-- Top Bar Header -->
      <div class="w-full max-w-7xl mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
        <h2 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
          <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          Pay Fee - {{ currentViewLabel }}
        </h2>
        <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
          <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Fee Management</span>
          <span class="mx-2">|</span>
          <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Fee Collection</span>
          <span class="mx-2">|</span>
          <span class="text-gray-900 font-bold">Pay Fee</span>
        </nav>
      </div>
  
      <!-- Select Criteria Label -->
      <div class="w-full max-w-7xl mx-auto mb-2">
        <div class="flex flex-col items-start">
          <h3 class="text-base font-medium text-gray-900 tracking-tight">Select Criteria</h3>
          <div class="h-[2px] bg-purple-200 w-full transition-all duration-300" style="max-width: 110px"></div>
        </div>
      </div>
  
      <!-- Filter Bar in Card -->
      <UiCard class="w-full max-w-7xl mx-auto rounded-lg transition-all duration-500 ease-in-out transform hover:shadow-lg">
        <form class="w-full" @submit.prevent="onFilter">
          <div class="flex flex-wrap lg:flex-nowrap items-end gap-x-4 gap-y-2">
            <div class="flex flex-col w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] lg:flex-1">
              <label class="mb-1 text-xs font-semibold text-gnavyray-500 uppercase tracking-wider">Session</label>
              <div class="relative">
                <select v-model="session" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                  <option v-for="item in sessions" :key="item" :value="item">{{ item }}</option>
                </select>
                <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                </div>
                <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
              </div>
            </div>
            <div class="flex flex-col w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] lg:flex-1">
              <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Class</label>
              <div class="relative">
                <select v-model="classId" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                  <option v-for="item in classes" :key="item.id" :value="item.id">{{ item.name }}</option>
                </select>
                <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                </div>
                <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
              </div>
            </div>
            <div class="flex flex-col w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] lg:flex-1">
              <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Section</label>
              <div class="relative">
                <select v-model="section" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                  <option value="">All</option>
                  <option v-for="item in sections" :key="item.id" :value="item.id">{{ item.name }}</option>
                </select>
                <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                </div>
                <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
              </div>
            </div>
            <div class="flex flex-col w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] lg:flex-1">
              <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Challan Month</label>
              <div class="relative">
                <select v-model="challanMonth" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                  <option v-for="item in months" :key="item" :value="item">{{ item }}</option>
                </select>
                <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                </div>
                <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
              </div>
            </div>
            <div class="flex flex-col w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] lg:flex-1">
              <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Fee Status</label>
              <div class="relative">
                <select v-model="selectedStatuses" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                  <option v-for="option in statusOptions" :key="option" :value="option">{{ option }}</option>
                </select>
                <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                </div>
                <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-2">
            <button type="submit" class="h-9 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">Filter</button>
          </div>
        </form>
      </UiCard>
  
      <!-- Data List Header with Animation -->
      <div class="w-full max-w-7xl mx-auto flex items-center justify-between mb-8">
        <div class="flex flex-col items-start">
          <h3 class="text-base font-medium text-gray-600 tracking-tight flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce"></div>
            {{ currentDataLabel }} ({{ totalRecords }})
          </h3>
          <div class="h-[2px] bg-purple-200 w-full transition-all duration-500" style="max-width: 120px"></div>
        </div>
        <!-- Quick Search (center) -->
        <div class="flex-1 flex justify-center">
          <div class="relative w-full max-w-xs flex items-center">
            <span class="absolute left-0 top-1/2 -translate-y-1/2 pl-2 text-purple-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              v-model="searchQuery"
              @keyup.enter="onQuickSearch"
              type="text"
              placeholder="QUICK SEARCH"
              class="w-full border-0 bg-transparent pl-10 pr-0 py-2 text-gray-900 font-medium text-xs tracking-wider uppercase focus:ring-0 focus:outline-none transition placeholder:text-gray-600 placeholder:font-medium placeholder:opacity-100 placeholder:text-xs shadow-none"
              style="letter-spacing:0.08em;"
            />
            <div class="absolute left-0 right-0 bottom-0 h-[1.5px] bg-purple-200 pointer-events-none"></div>
          </div>
        </div>
        <!-- Generate Options (right) -->
        <div class="flex items-center gap-2 ml-4">
          <label v-if="viewMode !== 'class'" class="flex items-center gap-2 cursor-pointer group relative">
            <input 
              type="checkbox" 
              :checked="allSelected"
              @change="handleMainCheckboxChange($event.target.checked)"
              class="w-5 h-5 border-2 border-purple-200 rounded-md transition-all duration-200 group-hover:border-purple-400 checked:border-purple-500 checked:bg-purple-500 focus:ring-purple-500 appearance-none flex items-center justify-center"
            />
            <span v-if="allSelected" class="absolute left-1 top-1">
              <svg class="w-3.5 h-3.5 text-white animate-pulse" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </span>
            <div class="relative">
              <template v-if="!allSelected">
                <span 
                  class="text-sm font-medium text-gray-600 group-hover:text-purple-600 transition-all duration-300 block"
                >
                  Show Modal
                </span>
                <div 
                  class="absolute left-0 right-0 bottom-0 h-[1.5px] bg-purple-200 transition-all duration-300"
                ></div>
              </template>
            </div>
          </label>
          <button 
            v-if="viewMode === 'student' || viewMode === 'family'"
            @click="showChallanModal = true"
            class="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md transform origin-left hover:scale-105"
            style="animation: slideIn 0.3s ease-out forwards;"
          >
            Show Modal
          </button>
        </div>
      </div>
      <div class="w-full max-w-7xl mx-auto">
        <div class="h-[2px] w-full bg-purple-200 mb-4"></div>
      </div>
  
      <!-- Loader -->
      <div v-if="isLoading" class="w-full max-w-7xl mx-auto">
        <LoadingStudents title="Loading Data" :message="`Please wait while we fetch ${currentDataLabel.toLowerCase()}...`" />
      </div>
  
      <!-- Dynamic Content with Smooth Transitions -->
      <div v-else class="w-full max-w-7xl mx-auto rounded-lg">
        <Transition name="fade-slide" mode="out-in">
          <div :key="viewMode" class="w-full">
            <UiTable class="min-w-full table-fixed">
              <template #head>
                <tr>
                  <th v-for="col in currentTableColumns" :key="col.key" 
                      @click="col.key !== 'action' ? handleSort(col.key) : null" 
                      :style="{ width: col.width || 'auto', minWidth: col.width || 'auto' }"
                      :class="[
                        'py-2 px-2 font-medium text-gray-600 text-sm tracking-wider border-b-2 border-purple-400 relative #ffffffspace-nowrap',
                        col.key !== 'action' ? 'cursor-pointer select-none group transition-all duration-150 hover:bg-purple-50' : ''
                      ]">
                    <span class="flex items-center justify-between" :class="col.key !== 'action' ? 'group-hover:text-purple-600 transition-colors duration-150' : ''">
                      <span>{{ col.label }}</span>
                      <span v-if="col.key !== 'action'" class="ml-2 flex-shrink-0">
                        <svg v-if="sortBy === col.key && sortDirection === 'asc'" class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7"/></svg>
                        <svg v-else-if="sortBy === col.key && sortDirection === 'desc'" class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                        <svg v-else class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                      </span>
                    </span>
                  </th>
                </tr>
              </template>
              
              <!-- No Data State -->
              <tr v-if="currentData.length === 0">
                <td :colspan="currentTableColumns.length" class="py-16">
                  <div class="flex flex-col items-center justify-center">
                    <div class="relative mb-4">
                      <div class="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div class="absolute -top-2 -right-2 w-4 h-4 bg-purple-100 rounded-full animate-ping opacity-20"></div>
                      <div class="absolute -bottom-2 -left-2 w-3 h-3 bg-indigo-100 rounded-full animate-pulse"></div>
                    </div>
                    <div class="text-center max-w-xs mx-auto">
                      <div class="text-lg font-light text-gray-500 mb-1">No {{ currentDataLabel }} Found</div>
                      <div class="text-gray-500 text-base font-light mb-2">We couldn't find any {{ currentDataLabel.toLowerCase() }} matching your current filters.</div>
                      <div class="flex flex-wrap justify-center gap-2 text-xs text-gray-500 font-light">
                        <span class="px-2 py-1 bg-white rounded-full">• Check filters</span>
                        <span class="px-2 py-1 bg-white rounded-full">• Clear search</span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              
              <!-- Student View -->
              <template v-if="viewMode === 'student'">
                <tr v-for="(student, idx) in filteredData" :key="student.grNo" :class="[ 'hover:bg-indigo-50 transition-colors', 'border-b border-purple-200', idx === filteredData.length - 1 ? 'border-b-2 border-purple-400' : '' ]">
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ student.grNo }}</td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ student.name }}</td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ student.classSection }}</td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ Math.ceil(Number(student.carry_forward || 0)) }}</td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ Math.ceil(Number(student.base_fee || 0)) }}</td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ Math.ceil(Number(student.partial_fee || 0)) }}</td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">
                    <div class="flex flex-col gap-1">
                      <div v-if="student.discount_fee && student.discount_fee > 0" class="flex items-center gap-1">
                        <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span class="text-green-600 text-xs">-{{ Math.ceil(Number(student.discount_fee)) }}</span>
                      </div>
                      <div v-if="student.late_fee && student.late_fee > 0" class="flex items-center gap-1">
                        <span class="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span class="text-red-600 text-xs">+{{ Math.ceil(Number(student.late_fee)) }}</span>
                      </div>
                      <div v-if="(!student.discount_fee || student.discount_fee <= 0) && (!student.late_fee || student.late_fee <= 0)" class="text-gray-500 text-xs">-</div>
                    </div>
                  </td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ Math.ceil(Number(student.total_fee || 0)) }}</td>
                  <td class="py-2 px-2">
                    <span :class="[
                      'text-xs font-medium',
                      (student.status || '').toLowerCase() === 'paid' ? 'text-green-700' : 
                      (student.status || '').toLowerCase() === 'partial' ? 'text-yellow-700' : 
                      (student.status || '').toLowerCase() === 'pending' ? 'text-red-700' : 'text-red-700'
                    ]">
                      {{ student.status }}
                    </span>
                  </td>
                  <td class="py-2 px-2 text-right">
                    <div class="flex items-center justify-end">
                      <label class="relative flex items-center mr-2">
                        <input 
                          type="checkbox" 
                          :checked="student.isSelected"
                          @change="student.isSelected = $event.target.checked"
                          class="w-5 h-5 border-2 border-purple-200 rounded-md transition-all duration-200 group-hover:border-purple-400 checked:border-purple-500 checked:bg-purple-500 focus:ring-purple-500 appearance-none flex items-center justify-center" 
                        />
                        <span v-if="student.isSelected" class="absolute left-1 top-1 pointer-events-none">
                          <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                        </span>
                      </label>
                      <button 
                        @click="handlePayNow(student)"
                        :disabled="(student.status || '').toLowerCase() === 'paid'"
                        :class="[
                          'px-3 py-1 text-white text-xs font-medium rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 mr-2',
                          (student.status || '').toLowerCase() === 'paid' 
                            ? 'bg-gradient-to-r from-blue-300 to-blue-500 cursor-not-allowed opacity-60' 
                            : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'
                        ]"
                        style="min-width: 70px;"
                      >
                        {{ (student.status || '').toLowerCase() === 'paid' ? 'Paid' : 'Pay' }}
                      </button>
                      <button 
                        @click="handlePayPartial(student)"
                        :disabled="(student.status || '').toLowerCase() === 'paid'"
                        :class="[
                          'px-3 py-1 text-white text-xs font-medium rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 mr-2',
                          (student.status || '').toLowerCase() === 'paid' 
                            ? 'bg-gradient-to-r from-teal-300 to-teal-500 cursor-not-allowed opacity-60' 
                            : 'bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800'
                        ]"
                        style="min-width: 70px;"
                      >
                        {{ (student.status || '').toLowerCase() === 'paid' ? 'Paid' : 'Partial' }}
                      </button>
                      <button 
                        @click="handleViewHistory(student)"
                        class="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-medium rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
                        style="min-width: 70px;"
                      >
                        History
                      </button>
                    </div>
                  </td>
                </tr>
              </template>
              
              <!-- Class View -->
              <template v-else-if="viewMode === 'class'">
                <tr v-for="(classItem, idx) in filteredData" :key="classItem.id" :class="[ 'hover:bg-indigo-50 transition-colors', 'border-b border-purple-200', idx === filteredData.length - 1 ? 'border-b-2 border-purple-400' : '' ]">
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ classItem.name }}</td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ classItem.studentCount }}</td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">PKR {{ Math.ceil(Number(classItem.totalFee || 0)) }}</td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ classItem.paidStudents }}</td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ classItem.remainingStudents }}</td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">PKR {{ Math.ceil(Number(classItem.totalPaidFees || 0)) }}</td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">PKR {{ Math.ceil(Number(classItem.totalRemainingFees || 0)) }}</td>
                  <td class="py-2 px-2">
                    <span :class="[
                        'text-xs font-medium',
                      classItem.status === 'Complete' ? 'text-green-700' : 'text-yellow-700'
                    ]">
                      {{ classItem.status }}
                    </span>
                  </td>
                  <td class="py-2 px-2 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <button 
                        @click="handlePayClassFees(classItem)"
                        :disabled="payingClassId === classItem.id || classItem.status === 'Complete'"
                        :class="[
                          'px-3 py-1 text-white text-xs font-medium rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105',
                          classItem.status === 'Complete' 
                            ? 'bg-gradient-to-r from-green-400 to-green-600 cursor-not-allowed opacity-70' 
                            : payingClassId === classItem.id
                            ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                        ]"
                        style="min-width: 80px;"
                      >
                        <span v-if="payingClassId === classItem.id" class="inline-block h-3 w-3 animate-spin rounded-full border-2 border-gray-200 border-t-transparent mr-1"></span>
                        {{ payingClassId === classItem.id ? 'Paying...' : classItem.status === 'Complete' ? 'Paid' : 'Pay All' }}
                      </button>
                    </div>
                  </td>
                </tr>
              </template>
              
              <!-- Family View -->
              <template v-else-if="viewMode === 'family'">
                <tr v-for="(family, idx) in filteredData" :key="family.id" :class="[ 'hover:bg-indigo-50 transition-colors', 'border-b border-purple-200', idx === filteredData.length - 1 ? 'border-b-2 border-purple-400' : '' ]">
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ family.familyCode || 'N/A' }}</td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ family.fatherName || 'N/A' }}</td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ family.childrenCount || 0 }}</td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ formatCurrency(family.totalBalance || 0) }}</td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ formatCurrency(family.monthlyFees || 0) }}</td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">
                    <div class="flex flex-col gap-1">
                      <div v-if="family.totalDiscount && family.totalDiscount > 0" class="flex items-center gap-1">
                        <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span class="text-green-600 text-xs">-{{ formatCurrency(family.totalDiscount) }}</span>
                      </div>
                      <div v-if="family.totalLateFee && family.totalLateFee > 0" class="flex items-center gap-1">
                        <span class="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span class="text-red-600 text-xs">+{{ formatCurrency(family.totalLateFee) }}</span>
                      </div>
                      <div v-if="(!family.totalDiscount || family.totalDiscount <= 0) && (!family.totalLateFee || family.totalLateFee <= 0)" class="text-gray-500 text-xs">-</div>
                    </div>
                  </td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ formatCurrency(family.totalAmount || 0) }}</td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ formatCurrency(family.totalPaid || 0) }}</td>
                  <td class="py-2 px-2 text-gray-900 font-normal text-xs #ffffffspace-nowrap">{{ formatCurrency(family.remainingAmount || 0) }}</td>
                  <td class="py-2 px-2">
                    <span :class="[
                        'text-xs font-medium px-2 py-1 rounded-full',
                      (family.status || '').toLowerCase() === 'paid' ? 'bg-green-100 text-green-700' : 
                      (family.status || '').toLowerCase() === 'partial' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'
                    ]">
                      {{ family.status || 'Unpaid' }}
                    </span>
                  </td>
                  <td class="py-2 px-2 text-right">
                    <div class="flex items-center justify-end">
                      <label class="relative flex items-center mr-2">
                        <input 
                          type="checkbox" 
                          :checked="family.isSelected"
                          @change="family.isSelected = $event.target.checked"
                          class="w-5 h-5 border-2 border-purple-200 rounded-md transition-all duration-200 group-hover:border-purple-400 checked:border-purple-500 checked:bg-purple-500 focus:ring-purple-500 appearance-none flex items-center justify-center" 
                        />
                        <span v-if="family.isSelected" class="absolute left-1 top-1 pointer-events-none">
                          <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                        </span>
                      </label>
                      <button 
                        @click="handlePayFamilyFull(family)"
                        :disabled="(family.status || '').toLowerCase() === 'paid'"
                        :class="[
                          'px-2 py-1 text-white text-xs font-medium rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 mr-1',
                          (family.status || '').toLowerCase() === 'paid' 
                            ? 'bg-gradient-to-r from-blue-300 to-blue-500 cursor-not-allowed opacity-60' 
                            : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'
                        ]"
                        style="min-width: 60px;"
                      >
                        {{ (family.status || '').toLowerCase() === 'paid' ? 'Paid' : 'Pay' }}
                      </button>
                      <button 
                        @click="handlePayFamilyPartial(family)"
                        :disabled="(family.status || '').toLowerCase() === 'paid'"
                        :class="[
                          'px-2 py-1 text-white text-xs font-medium rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 mr-1',
                          (family.status || '').toLowerCase() === 'paid' 
                            ? 'bg-gradient-to-r from-teal-300 to-teal-500 cursor-not-allowed opacity-60' 
                            : 'bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800'
                        ]"
                        style="min-width: 60px;"
                      >
                        {{ (family.status || '').toLowerCase() === 'paid' ? 'Paid' : 'Partial' }}
                      </button>
                      <button 
                        @click="handleViewFamilyStudents(family)"
                        class="px-2 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-medium rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
                        style="min-width: 60px;"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              </template>
            </UiTable>
            
            <!-- Pagination Summary -->
            <div class="w-full max-w-7xl mx-auto mt-8 flex flex-row items-center justify-between">
              <div class="text-gray-600 text-sm font-medium px-2">
                Showing {{ (currentPage - 1) * pageSize + 1 }}
                to {{ Math.min(currentPage * pageSize, totalRecords) }}
                of {{ totalRecords }} entries
              </div>
              <div class="flex items-center gap-4">
                <label class="text-sm text-gray-600 font-medium flex items-center gap-1">
                  Per page:
                  <select v-model="pageSize" @change="onFilter(1)" class="rounded-md border border-purple-200 bg-white px-2 py-1 text-xs font-semibold text-purple-700 focus:ring-2 focus:ring-purple-300">
                    <option v-for="size in [10, 20, 50, 100]" :key="size" :value="size">{{ size }}</option>
                  </select>
                </label>
                <label class="text-sm text-gray-600 font-medium flex items-center gap-1">
                  Go to page:
                  <input v-model.number="pageInput" type="number" min="1" :max="computedLastPage" class="w-16 rounded-md border border-purple-200 px-2 py-1 text-xs font-semibold text-purple-700 focus:ring-2 focus:ring-purple-300" @keyup.enter="goToPage(pageInput)" />
                  <button @click="goToPage(pageInput)" class="ml-1 px-2 py-1 rounded-md bg-purple-500 text-white text-xs font-semibold hover:bg-purple-600 transition-all">Go</button>
                </label>
              </div>
            </div>
            <!-- Pagination Controls -->
            <div class="w-full max-w-7xl mx-auto mt-2 flex justify-center">
              <div class="flex items-center gap-2">
                <button
                  class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-50 text-purple-500 text-xl font-bold shadow-sm transition-all duration-200 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  :disabled="currentPage === 1"
                  @click="onFilter(currentPage - 1)"
                  aria-label="Previous"
                >
                  <span>&larr;</span>
                </button>
                <span class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-600 text-white text-base font-bold shadow-md">
                  {{ currentPage }}
                </span>
                <button
                  class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-50 text-purple-500 text-xl font-bold shadow-sm transition-all duration-200 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  :disabled="currentPage === computedLastPage"
                  @click="onFilter(currentPage + 1)"
                  aria-label="Next"
                >
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
  
      <!-- Partial Payment Modal -->
      <el-dialog v-model="showPartialModal" width="800px" :close-on-click-modal="true" class="enhanced-fee-modal" @close="closePartialModal">
        <template #header>
          <div class="w-full flex items-center justify-between px-6 py-4 rounded-t-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-bold text-white">Partial Payment</h3>
                <p class="text-xs text-white/80">Enter partial payment details</p>
              </div>
            </div>
            <button @click="showPartialModal = false" class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </template>
        
        <div v-if="selectedStudent" class="bg-gradient-to-br from-gray-50 to-#ffffff rounded-b-2xl p-6">
          <!-- Student Info Card -->
          <div class="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-200">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
          </div>
              <div class="flex-1">
                <h4 class="text-base font-bold text-gray-900">{{ selectedStudent.name }}</h4>
                <p class="text-xs text-gray-600">{{ selectedStudent.classSection }}</p>
                <p class="text-xs text-gray-500">GR No: {{ selectedStudent.grNo }}</p>
            </div>
              <div class="text-right">
                <div class="text-xs text-gray-500">Current Status</div>
                <div :class="[
                  'text-xs font-bold px-3 py-1 rounded-full inline-block w-fit',
                  (selectedStudent.status || '').toLowerCase() === 'paid' ? 'text-green-700 bg-green-100' : 
                  (selectedStudent.status || '').toLowerCase() === 'partial' ? 'text-yellow-700 bg-yellow-100' : 
                  (selectedStudent.status || '').toLowerCase() === 'pending' ? 'text-red-700 bg-red-100' : 'text-red-700 bg-red-100'
                ]">
                  {{ selectedStudent.status }}
            </div>
            </div>
            </div>
          </div>

          <!-- Fee Breakdown -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
                <span class="text-xs font-semibold text-blue-700">Monthly Fee</span>
            </div>
              <div class="text-sm font-bold text-blue-800">PKR {{ Math.ceil(Number(selectedStudent.base_fee || 0)) }}</div>
            </div>
            
            <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-xs font-semibold text-yellow-700">Previous Month Remaining</span>
              </div>
              <div class="text-sm font-bold text-yellow-800">PKR {{ Math.ceil(Number(selectedStudent.carry_forward || 0)) }}</div>
            </div>
            
            <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-xs font-semibold text-green-700">Discount</span>
              </div>
              <div class="text-sm font-bold text-green-800">PKR {{ editableDiscount }}</div>
            </div>
            
            <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-xs font-semibold text-red-700">Late Fee</span>
              </div>
              <div class="text-sm font-bold text-red-800">PKR {{ editableLateFee }}</div>
            </div>
          </div>

          <!-- Payment Form -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h5 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Payment Details
            </h5>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Left Column -->
              <div class="space-y-4">
            <div>
                  <label class="block text-xs font-semibold text-gray-900 mb-2">Discount Amount</label>
                  <el-input-number 
                    v-model="editableDiscount" 
                    :min="0" 
                    :max="computedRemainingAmount"
                    class="w-full enhanced-input-number" 
                    size="large"
                    placeholder="Enter discount amount"
                  />
                </div>
                
                <div>
                  <label class="block text-xs font-semibold text-gray-900 mb-2">Late Fee Amount</label>
                  <el-input-number 
                    v-model="editableLateFee" 
                    :min="0" 
                    class="w-full enhanced-input-number" 
                    size="large"
                    placeholder="Enter late fee amount"
                  />
                </div>
                
                <div>
                  <label class="block text-xs font-semibold text-gray-900 mb-2">Partial Amount</label>
              <el-input-number
                v-model="partialAmount"
                :min="computedRemainingAmount > 0 ? Math.min(Math.max(100, computedRemainingAmount * 0.1), computedRemainingAmount) : 0"
                :max="computedRemainingAmount > 0 ? computedRemainingAmount : 0"
                class="w-full enhanced-input-number"
                size="large"
                placeholder="Enter partial amount"
              />
            </div>
          </div>
              
              <!-- Right Column -->
              <div class="space-y-4">
                <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-xs font-semibold text-gray-900">Remaining Amount</span>
                    <span class="text-sm font-bold text-purple-700">PKR {{ computedRemainingAmount }}</span>
                  </div>
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-xs text-gray-600">Partial Amount</span>
                    <span class="text-sm font-semibold text-blue-600">PKR {{ partialAmount }}</span>
                  </div>
                  <div class="border-t border-purple-200 pt-2">
                    <div class="flex justify-between items-center">
                      <span class="text-xs font-semibold text-gray-900">After Payment</span>
                      <span class="text-sm font-bold text-red-600">PKR {{ computedRemainingAmount - partialAmount }}</span>
                    </div>
                  </div>
                </div>
                
          <div>
                  <label class="block text-xs font-semibold text-gray-900 mb-2">Payment Method</label>
                  <div class="relative">
                    <select v-model="partialPaymentMode" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                      <option value="Cash">💵 Cash</option>
                      <option value="Cheque">🏦 Cheque</option>
                      <option value="Online">💳 Online</option>
                      <option value="Bank Transfer">🏛️ Bank Transfer</option>
                    </select>
                    <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                    </div>
                    <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                  </div>
                </div>
                
                <div>
                  <label class="block text-xs font-semibold text-gray-900 mb-2">Remarks (Optional)</label>
            <el-input
              v-model="partialRemarks"
              type="textarea"
                    rows="3"
                    placeholder="Add any additional notes or remarks..."
                    class="w-full enhanced-input"
                    size="large"
            />
          </div>
        </div>
            </div>
            
            <div v-if="partialError" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
                <span class="text-sm text-red-700">{{ partialError }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <template #footer>
          <div v-if="selectedStudent" class="flex gap-3 px-6 pb-6 justify-end">
            <button 
              @click="showPartialModal = false" 
              class="px-6 py-2 rounded-full bg-white text-xs font-bold text-gray-900 border border-gray-200 hover:bg-white transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              Cancel
            </button>
            <button 
              @click="handlePartialPaymentSubmit" 
              :disabled="isSubmitting"
              class="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-bold text-white shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="isSubmitting" class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-transparent"></span>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              {{ isSubmitting ? 'Processing...' : 'Submit' }}
            </button>
          </div>
        </template>
      </el-dialog>
  
      <!-- Full Payment Modal -->
      <el-dialog v-model="showPayModal" width="800px" :close-on-click-modal="true" class="enhanced-fee-modal" @close="closeFullModal">
        <template #header>
          <div class="w-full flex items-center justify-between px-6 py-4 rounded-t-2xl bg-gradient-to-r from-blue-600 via-purple-500 to-blue-700">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-bold text-white">Full Payment</h3>
                <p class="text-xs text-white/80">Complete payment for all dues</p>
              </div>
            </div>
            <button @click="showPayModal = false" class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </template>
        
        <div v-if="selectedStudent" class="bg-gradient-to-br from-gray-50 to-#ffffff rounded-b-2xl p-6">
          <!-- Student Info Card -->
          <div class="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-200">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
          </div>
              <div class="flex-1">
                <h4 class="text-base font-bold text-gray-900">{{ selectedStudent.name }}</h4>
                <p class="text-xs text-gray-600">{{ selectedStudent.classSection }}</p>
                <p class="text-xs text-gray-500">GR No: {{ selectedStudent.grNo }}</p>
            </div>
              <div class="text-right">
                <div class="text-xs text-gray-500">Current Status</div>
                <div :class="[
                  'text-xs font-bold px-3 py-1 rounded-full inline-block w-fit',
                  (selectedStudent.status || '').toLowerCase() === 'paid' ? 'text-green-700 bg-green-100' : 
                  (selectedStudent.status || '').toLowerCase() === 'partial' ? 'text-yellow-700 bg-yellow-100' : 
                  (selectedStudent.status || '').toLowerCase() === 'pending' ? 'text-red-700 bg-red-100' : 'text-red-700 bg-red-100'
                ]">
                  {{ selectedStudent.status }}
            </div>
            </div>
            </div>
          </div>

          <!-- Fee Summary Cards -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
                <span class="text-xs font-semibold text-blue-700">Monthly Fee</span>
            </div>
              <div class="text-sm font-bold text-blue-800">PKR {{ Math.ceil(Number(selectedStudent.base_fee || 0)) }}</div>
            </div>
            
            <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-xs font-semibold text-yellow-700">Previous Month Remaining</span>
              </div>
              <div class="text-sm font-bold text-yellow-800">PKR {{ Math.ceil(Number(selectedStudent.carry_forward || 0)) }}</div>
            </div>
            
            <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-xs font-semibold text-green-700">Discount</span>
              </div>
              <div class="text-sm font-bold text-green-800">PKR {{ editableDiscount }}</div>
            </div>
            
            <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-xs font-semibold text-red-700">Late Fee</span>
              </div>
              <div class="text-sm font-bold text-red-800">PKR {{ editableLateFee }}</div>
            </div>
          </div>

          <!-- Payment Form -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h5 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Complete Payment Details
            </h5>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Left Column -->
              <div class="space-y-4">
            <div>
                  <label class="block text-xs font-semibold text-gray-900 mb-2">Discount Amount</label>
                  <el-input-number 
                    v-model="editableDiscount" 
                    :min="0" 
                    :max="computedRemainingAmount"
                    class="w-full enhanced-input-number" 
                    size="large"
                    placeholder="Enter discount amount"
                  />
                </div>
                
                <div>
                  <label class="block text-xs font-semibold text-gray-900 mb-2">Late Fee Amount</label>
                  <el-input-number 
                    v-model="editableLateFee" 
                    :min="0" 
                    class="w-full enhanced-input-number" 
                    size="large"
                    placeholder="Enter late fee amount"
                  />
                </div>
                
                <div>
                  <label class="block text-xs font-semibold text-gray-900 mb-2">Payment Method</label>
              <div class="relative">
                    <select v-model="payPaymentMode" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                      <option value="Cash">💵 Cash</option>
                      <option value="Cheque">🏦 Cheque</option>
                      <option value="Online">💳 Online</option>
                      <option value="Bank Transfer">🏛️ Bank Transfer</option>
                </select>
                <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                </div>
                <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
              </div>
            </div>
              </div>
              
              <!-- Right Column -->
              <div class="space-y-4">
                <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-xs font-semibold text-gray-900">Total Fee</span>
                    <span class="text-sm font-bold text-blue-700">PKR {{ computedTotalFee }}</span>
                  </div>
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-xs text-gray-600">Remaining Amount</span>
                    <span class="text-sm font-semibold text-orange-600">PKR {{ computedRemainingAmount }}</span>
                  </div>
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-xs text-gray-600">Payment Amount</span>
                    <span class="text-sm font-semibold text-green-600">PKR {{ computedRemainingAmount }}</span>
                  </div>
                  <div class="border-t border-blue-200 pt-2">
                    <div class="flex justify-between items-center">
                      <span class="text-xs font-semibold text-gray-900">After Payment</span>
                      <span class="text-sm font-bold text-green-600">PKR 0</span>
                    </div>
                  </div>
                </div>
                
            <div>
                  <label class="block text-xs font-semibold text-gray-900 mb-2">Receipt Number (Optional)</label>
                  <el-input
                    v-model="receiptNumber"
                    placeholder="Enter receipt number if available"
                    class="w-full enhanced-input"
                    size="large"
                  />
                </div>
                
                <div>
                  <label class="block text-xs font-semibold text-gray-900 mb-2">Remarks (Optional)</label>
              <el-input
                v-model="payRemarks"
                type="textarea"
                    rows="3"
                    placeholder="Add any additional notes or remarks..."
                    class="w-full enhanced-input"
                    size="large"
              />
            </div>
          </div>
        </div>
            
            <div v-if="payError" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
                <span class="text-xs text-red-700">{{ payError }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <template #footer>
          <div v-if="selectedStudent" class="flex gap-3 px-6 pb-6 justify-end">
            <button 
              @click="showPayModal = false" 
              class="px-6 py-2 rounded-full bg-white text-xs font-bold text-gray-900 border border-gray-200 hover:bg-white transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              Cancel
            </button>
            <button 
              @click="handleFullPaymentSubmit" 
              :disabled="isSubmitting"
              class="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-bold text-white shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="isSubmitting" class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-transparent"></span>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              {{ isSubmitting ? 'Processing...' : 'Submit' }}
            </button>
          </div>
        </template>
      </el-dialog>
  
      <!-- Payment History Modal -->
      <el-dialog v-model="showHistoryModal" width="900px" :close-on-click-modal="true" class="enhanced-history-modal" @close="closeHistoryModal">
        <template #header>
          <div class="w-full flex items-center justify-between px-6 py-4 rounded-t-2xl bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-700">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
              </div>
              <div>
                <h3 class="text-base font-bold text-white">Payment History</h3>
                <p class="text-xs text-white/80">Complete payment records</p>
              </div>
            </div>
            <button @click="showHistoryModal = false" class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </template>
        
        <div v-if="selectedStudent" class="bg-gradient-to-br from-gray-50 to-#ffffff rounded-b-2xl p-6">
          <!-- Student Info Header -->
          <div class="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
              <div class="flex-1">
            <h3 class="text-base font-bold text-gray-900">{{ selectedStudent.name }}</h3>
                <p class="text-xs text-gray-600">{{ selectedStudent.classSection }}</p>
                <p class="text-xs text-gray-500">GR No: {{ selectedStudent.grNo }}</p>
              </div>
              <div class="text-right">
                <div class="text-xs text-gray-500 mb-1">Current Status</div>
                <div :class="[
                  'text-xs font-bold px-4 py-2 rounded-full inline-block w-fit',
                  (selectedStudent.status || '').toLowerCase() === 'paid' ? 'text-green-700 bg-green-100' : 
                  (selectedStudent.status || '').toLowerCase() === 'partial' ? 'text-yellow-700 bg-yellow-100' : 
                  (selectedStudent.status || '').toLowerCase() === 'pending' ? 'text-red-700 bg-red-100' : 'text-red-700 bg-red-100'
                ]">
                  {{ selectedStudent.status }}
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Summary Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 shadow-sm">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                  </svg>
                </div>
                <div>
                  <div class="text-xs text-green-600 font-medium">Total Paid</div>
              <div class="text-sm font-bold text-green-700">PKR {{ totalPaidAmount }}</div>
            </div>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 shadow-sm">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <div class="text-xs text-blue-600 font-medium">Total Due</div>
              <div class="text-sm font-bold text-blue-700">PKR {{ totalDueAmount }}</div>
            </div>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200 shadow-sm">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                <div>
                  <div class="text-xs text-purple-600 font-medium">Total Payments</div>
                  <div class="text-sm font-bold text-purple-700">{{ paymentHistory.length }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment History List -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h5 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Payment Records
            </h5>
            
            <!-- Loading State -->
            <div v-if="isLoadingHistory" class="py-12">
              <LoadingStudents title="Loading Payment History" message="Please wait while we fetch payment records..." />
            </div>
            
            <!-- Payment History Content -->
            <div v-else>
              <div class="space-y-3 max-h-80 overflow-y-auto">
              <div v-for="(payment, index) in paymentHistory" :key="index" 
                     class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-4">
                      <div class="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                      </svg>
                    </div>
                    <div>
                        <div class="font-bold text-gray-900 text-sm">PKR {{ payment.amount_paid }}</div>
                      <div class="text-xs text-gray-500">{{ formatDate(payment.payment_date) }}</div>
                    </div>
                  </div>
                  <div class="text-right">
                      <div class="text-xs font-semibold text-gray-900 mb-1">{{ payment.payment_mode }}</div>
                    <div class="text-xs text-gray-500">Receipt: {{ payment.receipt_no }}</div>
                  </div>
                </div>
                  
                  <div v-if="payment.remarks" class="bg-white rounded-lg p-3 border border-gray-200 mb-3">
                    <div class="text-xs text-gray-500 mb-1 font-medium">Remarks</div>
                    <div class="text-xs text-gray-900">{{ payment.remarks }}</div>
                </div>
                  
                  <div class="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div class="text-xs text-gray-500">
                      Received by: <span class="font-semibold text-gray-900">{{ payment.received_by_name || 'Admin' }}</span>
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ formatDate(payment.payment_date) }} at {{ formatTime(payment.created_at) }}
                  </div>
                </div>
                </div>
            </div>

            <!-- Empty State -->
              <div v-if="!isLoadingHistory && paymentHistory.length === 0" class="text-center py-12">
                <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
                <h3 class="text-base font-bold text-gray-900 mb-2">No Payment History</h3>
                <p class="text-xs text-gray-500 mb-4">No payment records found for this student.</p>
                <div class="flex justify-center">
                  <button 
                    @click="handlePayNow(selectedStudent)"
                    class="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                  >
                    Make First Payment
                  </button>
            </div>
          </div>
            </div>
          </div>
        </div>
        
        <template #footer>
          <div v-if="selectedStudent" class="flex justify-end gap-3 px-6 pb-6">
            <button 
              @click="showHistoryModal = false" 
              class="h-9 px-8 rounded-full bg-white text-xs font-bold text-gray-900 border border-gray-200 hover:bg-white transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              Close
            </button>
          </div>
        </template>
      </el-dialog>
  
      <!-- Challan Modal -->
      <el-dialog v-model="showChallanModal" width="700px" :close-on-click-modal="true" :title="viewMode === 'family' ? 'Selected Families' : 'Selected Students'">
        <div class="p-4">
          <div class="text-base font-semibold mb-4 text-purple-700">
            {{ viewMode === 'family' ? 'Selected Families for Payment' : 'Selected Students for Payment' }}
          </div>
          
          <!-- Auto Payment Notice -->
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
              <div class="text-sm text-yellow-800">
                <strong>Note:</strong> Uncheck {{ viewMode === 'family' ? 'families' : 'students' }} ki full payment automatically submit ho jayegi.
              </div>
            </div>
          </div>
          
          <!-- Selected Items List -->
          <div class="space-y-3 max-h-96 overflow-y-auto">
            <!-- Student View -->
            <template v-if="viewMode === 'student'">
              <div v-for="student in selectedStudentsList" :key="student.grNo" 
                   class="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:bg-white transition-all">
                <div class="flex-1">
                  <div class="font-medium text-gray-900">{{ student.name }}</div>
                  <div class="text-sm text-gray-600">{{ student.classSection }}</div>
                  <div class="text-xs text-gray-500">Total Fee: PKR {{ Math.ceil(Number(student.total_fees || 0)) }}</div>
                </div>
                <div class="flex gap-2">
                  <button 
                    @click="handlePayNow(student)"
                    class="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm font-medium rounded-full hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
                  >
                    Pay
                  </button>
                  <button 
                    @click="handlePayPartial(student)"
                    class="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white text-sm font-medium rounded-full hover:from-teal-600 hover:to-teal-800 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
                  >
                    Partial
                  </button>
                </div>
              </div>
            </template>
            
            <!-- Family View -->
            <template v-else-if="viewMode === 'family'">
              <div v-for="family in selectedFamiliesList" :key="family.id" 
                   class="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:bg-white transition-all">
                <div class="flex-1">
                  <div class="font-medium text-gray-900">{{ family.fatherName }}</div>
                  <div class="text-sm text-gray-600">Family Code: {{ family.familyCode }}</div>
                  <div class="text-xs text-gray-500">Children: {{ family.childrenCount }} | Total Fee: PKR {{ Math.ceil(Number(family.totalAmount || 0)) }}</div>
                </div>
                <div class="flex gap-2">
                  <button 
                    @click="handlePayFamilyFull(family)"
                    class="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm font-medium rounded-full hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
                  >
                    Pay
                  </button>
                  <button 
                    @click="handlePayFamilyPartial(family)"
                    class="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white text-sm font-medium rounded-full hover:from-teal-600 hover:to-teal-800 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
                  >
                    Partial
                  </button>
                </div>
              </div>
            </template>
          </div>
          
          <!-- Paid Items Notice -->
          <div v-if="filteredData.filter(item => item.status === 'paid').length > 0" class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div class="text-sm text-green-800">
                <strong>{{ filteredData.filter(item => item.status === 'paid').length }} {{ viewMode === 'family' ? 'families' : 'students' }}</strong> ki fee already paid hai. Unhe payment list se exclude kiya gaya hai.
              </div>
            </div>
          </div>
          
          <!-- Uncheck Items Summary -->
          <div v-if="(viewMode === 'student' && uncheckStudentsList.length > 0) || (viewMode === 'family' && uncheckFamiliesList.length > 0)" class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-green-800">Auto Payment Summary</div>
                <div class="text-sm text-green-600">
                  {{ viewMode === 'student' ? uncheckStudentsList.length : uncheckFamiliesList.length }} {{ viewMode === 'family' ? 'families' : 'students' }} ki full payment automatically submit hogi
                </div>
              </div>
              <button 
                @click="viewMode === 'student' ? submitAutoPayments() : submitAutoFamilyPayments()"
                :disabled="isSubmittingAutoPayments"
                class="px-4 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white text-sm font-medium rounded-full hover:from-green-600 hover:to-green-800 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 disabled:opacity-50"
              >
                <span v-if="isSubmittingAutoPayments" class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-transparent mr-2"></span>
                Submit Auto Payments
              </button>
            </div>
          </div>
          
          <!-- Empty State -->
          <div v-if="(viewMode === 'student' && selectedStudentsList.length === 0 && uncheckStudentsList.length === 0) || (viewMode === 'family' && selectedFamiliesList.length === 0 && uncheckFamiliesList.length === 0)" class="text-center py-8">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No {{ viewMode === 'family' ? 'Families' : 'Students' }} Selected</h3>
            <p class="text-gray-500">Please select {{ viewMode === 'family' ? 'families' : 'students' }} from the table to proceed with payment.</p>
          </div>
          
          <div class="flex gap-2 justify-end mt-4 pt-4 border-t border-gray-200">
            <el-button @click="showChallanModal = false">Close</el-button>
          </div>
        </div>
      </el-dialog>
      
      <!-- Family Students Modal -->
      <el-dialog v-model="showFamilyModal" width="900px" :close-on-click-modal="true" class="enhanced-fee-modal" @close="closeFamilyModal">
        <template #header>
          <div class="w-full flex items-center justify-between px-6 py-4 rounded-t-2xl bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-700">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-bold text-white">Family Students</h3>
                <p class="text-xs text-white/80">View all students in this family</p>
              </div>
            </div>
            <button @click="showFamilyModal = false" class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </template>
        
        <div v-if="selectedFamily" class="bg-gradient-to-br from-gray-50 to-#ffffff rounded-b-2xl p-6">
          <!-- Family Info Card -->
          <div class="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Family Details -->
              <div>
                <h4 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/>
                  </svg>
                  Family Information
                </h4>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Family Code:</span>
                    <span class="text-sm font-semibold text-gray-900">{{ selectedFamily.family_code }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Father Name:</span>
                    <span class="text-sm font-semibold text-gray-900">{{ selectedFamily.father_name }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Mother Name:</span>
                    <span class="text-sm font-semibold text-gray-900">{{ selectedFamily.mother_name || 'N/A' }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Contact:</span>
                    <span class="text-sm font-semibold text-gray-900">{{ selectedFamily.contact_number || 'N/A' }}</span>
                  </div>
                  <div class="flex justify-between items-start">
                    <span class="text-sm text-gray-600">Address:</span>
                    <span class="text-sm font-semibold text-gray-900 text-right max-w-xs">{{ selectedFamily.address || 'N/A' }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Fee Summary -->
              <div>
                <h4 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                  </svg>
                  Fee Summary
                </h4>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Students Count:</span>
                    <span class="text-sm font-semibold text-gray-900">{{ selectedFamily.students_count || 0 }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Total Amount:</span>
                    <span class="text-sm font-semibold text-blue-600">PKR {{ selectedFamily.total_amount || 0 }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Paid Amount:</span>
                    <span class="text-sm font-semibold text-green-600">PKR {{ selectedFamily.total_paid || 0 }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Remaining:</span>
                    <span class="text-sm font-semibold text-red-600">PKR {{ selectedFamily.total_remaining || 0 }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Students List -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h4 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
              Students ({{ familyStudents.length }})
            </h4>
            
            <div v-if="loadingFamilyStudents" class="flex items-center justify-center py-8">
              <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <span class="ml-3 text-gray-600">Loading students...</span>
            </div>
            
            <div v-else-if="familyStudents.length === 0" class="text-center py-8">
              <svg class="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
              </svg>
              <p class="text-gray-500 text-sm">No students found in this family</p>
            </div>
            
            <div v-else class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-200">
                    <th class="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Student</th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Class</th>
                    <th class="text-right py-3 px-4 font-semibold text-gray-900 text-sm">Fee</th>
                    <th class="text-right py-3 px-4 font-semibold text-gray-900 text-sm">Paid</th>
                    <th class="text-right py-3 px-4 font-semibold text-gray-900 text-sm">Remaining</th>
                    <th class="text-center py-3 px-4 font-semibold text-gray-900 text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="student in familyStudents" :key="student.id" class="border-b border-gray-200 hover:bg-white transition-colors">
                    <td class="py-4 px-4">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                          <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                          </svg>
                        </div>
                        <div>
                          <div class="font-semibold text-gray-900 text-sm">{{ student.name }}</div>
                          <div class="text-xs text-gray-500">Roll: {{ student.roll_number || 'N/A' }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="py-4 px-4">
                      <span class="text-sm text-gray-900">{{ student.class_section }}</span>
                    </td>
                    <td class="py-4 px-4 text-right">
                      <span class="text-sm font-semibold text-blue-600">PKR {{ student.final_amount || 0 }}</span>
                    </td>
                    <td class="py-4 px-4 text-right">
                      <span class="text-sm font-semibold text-green-600">PKR {{ student.paid_amount || 0 }}</span>
                    </td>
                    <td class="py-4 px-4 text-right">
                      <span class="text-sm font-semibold text-red-600">PKR {{ student.remaining_amount || 0 }}</span>
                    </td>
                    <td class="py-4 px-4 text-center">
                      <span :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        student.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                        student.payment_status === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      ]">
                        {{ student.payment_status === 'paid' ? 'Paid' : student.payment_status === 'partial' ? 'Partial' : 'Unpaid' }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <template #footer>
          <div class="flex gap-3 px-6 pb-6 justify-end">
            <button 
              @click="closeFamilyModal" 
              class="px-6 py-2 rounded-full bg-white text-xs font-bold text-gray-900 border border-gray-200 hover:bg-white transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              Close
            </button>
          </div>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script setup>
  import { useToast } from 'vue-toastification'

  const toast = useToast()
const selectedStudent = ref(null)
  const editableDiscount = ref(0)
  const editableLateFee = ref(0)
  const partialAmount = ref(0)
  const partialRemarks = ref("")
  const partialError = ref("")
  const receiptNumber = ref("")
  const showPartialModal = ref(false)
  const showChallanModal = ref(false)
  const isSubmitting = ref(false)
  
  // Watch selectedStudent to update editable fields
  watch(selectedStudent, (student) => {
    if (student && typeof student === 'object') {
      try {
        editableDiscount.value = Number(student.discount_fee || 0)
        editableLateFee.value = Number(student.late_fee || 0)
      } catch (error) {
        console.error('Error updating editable fields:', error)
        editableDiscount.value = 0
        editableLateFee.value = 0
      }
    }
  })
  
  const computedTotalFee = computed(() => {
    if (!selectedStudent.value) return 0 // Return 0 instead of 1000 when no student selected
    
    const baseFee = Number(selectedStudent.value.base_fee || 0)
    const carryForward = Number(selectedStudent.value.carry_forward || 0)
    const discount = Number(editableDiscount.value || 0)
    const late = Number(editableLateFee.value || 0)
    
    // Calculate total fee: base fee + carry forward - discount + late fee
    const total = Math.ceil(baseFee + carryForward - discount + late)
    
    // Return the actual calculated total, no minimum enforced
    return Math.max(total, 0)
  })
  
  // New computed property for remaining amount that user can pay
  const computedRemainingAmount = computed(() => {
    if (!selectedStudent.value) return 0
    
    try {
      // Use the remaining amount from backend (partial_fee field)
      const remainingAmount = Number(selectedStudent.value.partial_fee || 0)
      
      // Apply discount and late fee adjustments
      const discount = Number(editableDiscount.value || 0)
      const late = Number(editableLateFee.value || 0)
      
      // Calculate final remaining amount after adjustments
      const finalRemaining = Math.ceil(remainingAmount - discount + late)
      
      return Math.max(finalRemaining, 0)
    } catch (error) {
      console.error('Error in computedRemainingAmount:', error)
      return 0
    }
  })
  
  // Use centralized axios instance
  const axios = api
  
  const sessions = [
    '2022-2023', '2023-2024', '2024-2025'
  ]
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ]
  
  const session = ref('2024-2025')
  const classId = ref('')
  const section = ref('')
  const challanMonth = ref('January')
  const feeStatus = ref('All')
  
  const classes = ref([])
  const sections = ref([])
  const students = ref([])
  const openMenuId = ref(null)
  
  const statusOptions = ['Paid', 'Unpaid', 'All']
  const selectedStatuses = ref('All')
  const showStatusDropdown = ref(false)
  const paidProcessingIds = ref([])
  const paidSuccessIds = ref([])
  const currentPage = ref(1)
  const totalRecords = ref(0)
  const pageInput = ref('')
  const isLoading = ref(false)
  const sortBy = ref('name')
  const sortDirection = ref('asc')
  
  const pageSize = ref(10)
  
  const computedLastPage = computed(() => {
    return totalRecords.value > 0 ? Math.ceil(totalRecords.value / pageSize.value) : 1
  })
  
  const paginationItems = computed(() => {
    const items = []
    const total = computedLastPage.value
    const current = currentPage.value
    if (total <= 4) {
      for (let i = 1; i <= total; i++) {
        items.push({ type: 'page', page: i, key: `page-${i}` })
      }
      return items
    }
    // Always show first page
    items.push({ type: 'page', page: 1, key: 'page-1' })
  
    // If current page is 1
    if (current === 1) {
      items.push({ type: 'page', page: 2, key: 'page-2' })
      if (total > 3) items.push({ type: 'ellipsis', key: 'ellipsis-1' })
    }
    // If current page is 2
    else if (current === 2) {
      items.push({ type: 'page', page: 2, key: 'page-2' })
      items.push({ type: 'page', page: 3, key: 'page-3' })
      if (total > 4) items.push({ type: 'ellipsis', key: 'ellipsis-2' })
    }
    // If current page is near the end
    else if (current >= total - 1) {
      if (total > 4) items.push({ type: 'ellipsis', key: 'ellipsis-3' })
      items.push({ type: 'page', page: total - 2, key: `page-${total - 2}` })
      items.push({ type: 'page', page: total - 1, key: `page-${total - 1}` })
    }
    // Middle pages
    else {
      items.push({ type: 'ellipsis', key: 'ellipsis-4' })
      items.push({ type: 'page', page: current, key: `page-${current}` })
      items.push({ type: 'page', page: current + 1, key: `page-${current + 1}` })
      items.push({ type: 'ellipsis', key: 'ellipsis-5' })
    }
    // Always show last page
    items.push({ type: 'page', page: total, key: `page-${total}` })
    return items
  })
  
  // Add new ref for challan loading state
  const generatingChallan = ref(false)
  const generatingIdCard = ref(false)
  const bulkGeneratingChallan = ref(false)
  
  // Add quick search logic
  const searchQuery = ref('')
  
  const isGenerateEnabled = ref(false)
  
  // Class payment and Family modal variables
  const payingClassId = ref(null)
  const showFamilyModal = ref(false)
  const selectedFamily = ref(null)
  const familyStudents = ref([])
  const loadingFamilyStudents = ref(false)
  
  watch(isGenerateEnabled, (val) => {
    if (!val) {
      students.value.forEach(student => {
        student.isSelected = false;
      });
    } else {
      students.value.forEach(student => {
        student.isSelected = true;
      });
    }
  });
  
  onMounted(async () => {
    try {
      const classRes = await axios.get(`${import.meta.env.VITE_API_URL}/classes`)
      if (classRes.data.success && Array.isArray(classRes.data.result)) {
        classes.value = classRes.data.result
        if (classes.value.length > 0) classId.value = classes.value[0].id
      } else {
        classes.value = []
      }
    } catch (e) {
      classes.value = []
      toast.error('Failed to fetch classes')
    }
    try {
      const sectionRes = await axios.get(`${import.meta.env.VITE_API_URL}/sections`)
      if (sectionRes.data.success && Array.isArray(sectionRes.data.result)) {
        sections.value = sectionRes.data.result
      } else {
        sections.value = []
      }
    } catch (e) {
      sections.value = []
      toast.error('Failed to fetch sections')
    }
    window.addEventListener('click', handleClickOutside)
    window.addEventListener('click', closeStatusDropdown)
  
    // Fetch students with default filters on page load
    await onFilter();
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('click', handleClickOutside)
    window.removeEventListener('click', closeStatusDropdown)
  })
  
  async function onFilter(page = 1) {
    isLoading.value = true
    try {
      if (viewMode.value === 'student') {
        // Student view - call students endpoint
        const params = {
          class_id: classId.value || '',
          section_id: section.value || '',
          fee_status: selectedStatuses.value === 'All' ? '' : selectedStatuses.value,
          page: page,
          per_page: pageSize.value,
          sort_by: sortBy.value,
          sort_direction: sortDirection.value,
          session: session.value,
          month: challanMonth.value
        };

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/students`, { params });
        
        if (response.data.status) {
          students.value = (response.data.result.data || []).map(student => {
            // Debug: Log the actual status from backend
            console.log('Student status from backend:', student.status, 'Type:', typeof student.status);
            
            return {
              grNo: student.id || student.gr_no,
              name: `${student.first_name} ${student.last_name || ''} / ${student.family_father_name || ''}`,
              familyCode: student.merchant_id || '',
              classSection: [student.class_name, student.section_name].filter(Boolean).join(' / ') || '—',
              carry_forward: student.prev_amount || 0, // Show carry forward amount in Previous Month Remaining
              partial_fee: student.remaining_amount || 0, // Show remaining amount (total - accumulated paid) in Remaining Amount
              base_fee: student.monthly_fee || 0,
              discount_fee: student.discount_amount || 0,
              late_fee: student.late_fee || 0,
              total_fee: student.total_amount || 0,
              accumulated_paid: student.accumulated_paid || 0, // Total paid so far
              status: student.status || 'unpaid', // Use 'unpaid' as default instead of 'All'
              contactEmail: student.contact_email || '',
              fatherName: student.family_father_name || '',
              motherName: student.family_mother_name || '',
              isSelected: false,
              class_id: student.class_id,
              section_id: student.section_id
            };
          });
          totalRecords.value = response.data.result.total || 0;
          currentPage.value = response.data.result.current_page || 1;
        } else {
          students.value = [];
          currentPage.value = 1;
          toast.error(response.data.message || 'Failed to fetch students');
        }
      } else if (viewMode.value === 'class') {
        // Class view - call class-fee-summaries endpoint
        await loadClassData();
      } else if (viewMode.value === 'family') {
        // Family view - call family-fee-summaries endpoint
        await loadFamilyData();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      if (viewMode.value === 'student') {
        students.value = [];
        currentPage.value = 1;
        toast.error('Failed to fetch students');
      } else if (viewMode.value === 'class') {
        classData.value = [];
        totalRecords.value = 0;
        toast.error('Failed to fetch class-wise data');
      } else if (viewMode.value === 'family') {
        familyData.value = [];
        totalRecords.value = 0;
        toast.error('Failed to fetch family-wise data');
      }
    } finally {
      isLoading.value = false;
    }
  }
  
  function openMenu(id) {
    openMenuId.value = openMenuId.value === id ? null : id
  }
  
  function closeMenu() {
    openMenuId.value = null
  }
  
  async function generateChallan(student) {
    return new Promise(async (resolve, reject) => {
      const template = 'default';
      const month = challanMonth.value;
      const year = session.value.split('-')[0];
      generatingChallan.value = student.grNo;
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/students/${student.grNo}/generate-fee-challan`, {
          params: { 
            template, 
            month,
            year,
            session: session.value
          },
          responseType: 'blob',
          withCredentials: true
        });
        if (response.data && response.data.type === 'application/pdf') {
          const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
          window.open(url, '_blank');
          toast.success('Fee challan generated successfully!');
          resolve()
        } else {
          toast.error('Failed to generate fee challan');
          reject()
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to generate fee challan');
        reject()
      } finally {
        generatingChallan.value = null;
      }
      closeMenu();
    })
  }
  
  async function generateIdCard(student) {
    const template = 'default';
    generatingIdCard.value = student.grNo;
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/students/${student.grNo}/id-card`, {
        params: { 
          template,
          session: session.value
        },
        responseType: 'blob',
        withCredentials: true
      });
  
      if (response.data && response.data.type === 'application/pdf') {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        window.open(url, '_blank');
        toast.success('Student ID card generated successfully!');
      } else {
        toast.error('Failed to generate student ID card');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate student ID card');
    } finally {
      generatingIdCard.value = null;
    }
    closeMenu();
  }
  
  function handleClickOutside(event) {
    if (!event.target.closest('.action-menu-wrap')) {
      closeMenu()
    }
  }
  
  function toggleStatusDropdown() {
    showStatusDropdown.value = !showStatusDropdown.value
  }
  
  function closeStatusDropdown(e) {
    if (!e.target.closest('.modern-multiselect')) {
      showStatusDropdown.value = false
    }
  }
  
  function generateChallanForAll() {
    if (!students.value.length) {
      toast.warning('No students to generate challan for.');
      return;
    }
    const template = 'default';
    const month = challanMonth.value;
    const year = session.value.split('-')[0];
    
    students.value.forEach(student => {
      // Generate Challan
      axios.get(`${import.meta.env.VITE_API_URL}/students/${student.grNo}/generate-fee-challan`, {
        params: { 
          template, 
          month,
          year,
          session: session.value
        },
        responseType: 'blob',
        withCredentials: true
      })
        .then(response => {
          if (response.data && response.data.type === 'application/pdf') {
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            window.open(url, '_blank');
            toast.success(`Challan generated for ${student.name}`);
          } else {
            toast.error(`Failed to generate challan for ${student.name}`);
          }
        })
        .catch((error) => {
          toast.error(error.response?.data?.message || `Failed to generate challan for ${student.name}`);
        });
        
      // Generate ID Card
      axios.get(`${import.meta.env.VITE_API_URL}/students/${student.grNo}/id-card`, {
        params: { 
          template,
          session: session.value
        },
        responseType: 'blob',
        withCredentials: true
      })
        .then(response => {
          if (response.data && response.data.type === 'application/pdf') {
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            window.open(url, '_blank');
            toast.success(`ID Card generated for ${student.name}`);
          } else {
            toast.error(`Failed to generate ID Card for ${student.name}`);
          }
        })
        .catch((error) => {
          toast.error(error.response?.data?.message || `Failed to generate ID Card for ${student.name}`);
        });
    });
  }
  
  function markAsPaid(student) {
    if (paidProcessingIds.value.includes(student.grNo) || paidSuccessIds.value.includes(student.grNo)) return;
    paidProcessingIds.value.push(student.grNo);
    // TODO: Replace with your real endpoint
    setTimeout(() => {
      // Simulate success
      paidProcessingIds.value = paidProcessingIds.value.filter(id => id !== student.grNo);
      paidSuccessIds.value.push(student.grNo);
      toast.success(`Marked as paid for ${student.name}`);
    }, 1000);
    // Example for real API:
    // axios.post(`/students/${student.grNo}/mark-paid`).then(() => { ... })
  }
  
  function goToPage(page) {
    if (page < 1 || page > computedLastPage.value || page === currentPage.value) return;
    onFilter(page);
  }
  
  function handlePageInput(e) {
    let val = parseInt(pageInput.value)
    if (!val || val < 1 || val > computedLastPage.value) {
      pageInput.value = ''
      return
    }
    goToPage(val)
    pageInput.value = ''
  }
  
  async function confirmGenerateAll() {
    try {
      await ElMessageBox.confirm(
        'Are you sure you want to generate challan for all students on this page?',
        'Generate Challan',
        {
          confirmButtonText: 'Yes, Generate',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      );
      generateChallanForAll();
    } catch {
      // User cancelled, do nothing
    }
  }
  
  function handleSort(key) {
    if (key === 'action') return // Don't sort by action column
    
    if (sortBy.value === key) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortBy.value = key;
      sortDirection.value = 'asc';
    }
    onFilter();
  }
  
  function onQuickSearch() {
    // No-op, v-model + computed handles it
  }
  
  function generateChallanForSelected() {
    const selected = filteredData.value.filter(item => item.isSelected)
    if (!selected.length) {
      toast.warning('No items selected!')
      return
    }
    bulkGeneratingChallan.value = true
    let successCount = 0
    let failCount = 0
    let completed = 0
    const total = selected.length
  
    const finish = () => {
      bulkGeneratingChallan.value = false
      toast.success(`Challan generated for ${successCount} items. Failed for ${failCount}.`)
    }
  
    if (viewMode.value === 'student') {
      selected.forEach(student => {
        generateChallan(student)
          .then(() => { successCount++ })
          .catch(() => { failCount++ })
          .finally(() => { if (++completed === total) finish() })
      })
    } else if (viewMode.value === 'class') {
      selected.forEach(classItem => {
        generateClassChallan(classItem)
          .then(() => { successCount++ })
          .catch(() => { failCount++ })
          .finally(() => { if (++completed === total) finish() })
      })
    } else if (viewMode.value === 'family') {
      selected.forEach(family => {
        generateFamilyChallan(family)
          .then(() => { successCount++ })
          .catch(() => { failCount++ })
          .finally(() => { if (++completed === total) finish() })
      })
    }
  }
  
  // Table columns for header
  const tableColumns = [
    { key: 'grNo', label: 'GR. No' },
    { key: 'name', label: 'Student / Father Name' },
    { key: 'classSection', label: 'Class/Section' },
    { key: 'carry_forward', label: 'Previous Month Remaining' },
    { key: 'partial_fee', label: 'Remaining Amount' },
    { key: 'base_fee', label: 'Monthly Fee' },
    { key: 'discount_fee', label: 'Discount Fee' },
    { key: 'late_fee', label: 'Late Fee' },
    { key: 'total_fee', label: 'Total' },
    { key: 'status', label: 'Status' },
    { key: 'action', label: 'Action' },
  ]
  
  // Add new reactive data for view modes
  const viewMode = ref('student')
  const classData = ref([])
  const familyData = ref([])
  
  // View tabs configuration with icons
  const viewTabs = computed(() => [
    {
      key: 'student',
      label: 'Student Wise',
      icon: 'User',
      count: totalStudentCount()
    },
    {
      key: 'class', 
      label: 'Class Wise',
      icon: 'AcademicCap',
      count: totalClassCount()
    },
    {
      key: 'family',
      label: 'Family Wise', 
      icon: 'Users',
      count: totalFamilyCount()
    }
  ])
  
  function totalStudentCount() {
    return Array.isArray(students.value) ? students.value.length : 0
  }
  function totalClassCount() {
    return Array.isArray(classData.value) ? classData.value.length : 0
  }
  function totalFamilyCount() {
    return Array.isArray(familyData.value) ? familyData.value.length : 0
  }
  
  // Computed properties for dynamic content
  const currentViewLabel = computed(() => {
    const tab = viewTabs.value.find(t => t.key === viewMode.value)
    return tab ? tab.label : 'Student Wise'
  })
  
  const currentDataLabel = computed(() => {
    switch(viewMode.value) {
      case 'student': return 'Student List'
      case 'class': return 'Class List'
      case 'family': return 'Family List'
      default: return 'Student List'
    }
  })
  
  const currentData = computed(() => {
    switch(viewMode.value) {
      case 'student': return students.value
      case 'class': return classData.value
      case 'family': return familyData.value
      default: return students.value
    }
  })
  
  const filteredData = computed(() => {
    if (!searchQuery.value) {
      // Filter out paid students from the table
      switch(viewMode.value) {
        case 'student':
          return students.value.filter(student => student.status !== 'paid')
        case 'class':
          return classData.value.filter(classItem => {
            const matchesClass = !classFilter.value || classItem.id == classFilter.value
            const matchesSection = !classSectionFilter.value || (classItem.sectionId && classItem.sectionId == classSectionFilter.value)
            return matchesClass && matchesSection
          })
        case 'family':
          return familyData.value.filter(family => family.status !== 'paid')
        default:
          return currentData.value
      }
    }
    
    const query = searchQuery.value.toLowerCase()
    
    switch(viewMode.value) {
      case 'student':
        return students.value.filter(student =>
          student.status !== 'paid' && (
          student.name.toLowerCase().includes(query) ||
          student.familyCode.toLowerCase().includes(query) ||
          student.classSection.toLowerCase().includes(query)
          )
        )
      case 'class':
        return classData.value.filter(classItem => {
          const matchesName = classItem.name.toLowerCase().includes(query)
          const matchesClass = !classFilter.value || classItem.id == classFilter.value
          const matchesSection = !classSectionFilter.value || (classItem.sectionId && classItem.sectionId == classSectionFilter.value)
          return matchesName && matchesClass && matchesSection
        })
      case 'family':
        return familyData.value.filter(family =>
          family.status !== 'paid' && (
          family.fatherName.toLowerCase().includes(query) ||
          family.familyCode.toLowerCase().includes(query)
          )
        )
      default:
        return currentData.value
    }
  })
  
  const currentTableColumns = computed(() => {
    switch(viewMode.value) {
      case 'student':
        return [
          { key: 'grNo', label: 'GR. No', width: '80px' },
          { key: 'name', label: 'Student / Father', width: '180px' },
          { key: 'classSection', label: 'Class', width: '80px' },
          { key: 'carry_forward', label: 'Prev Dues', width: '80px' },
          { key: 'base_fee', label: 'Monthly', width: '80px' },
          { key: 'partial_fee', label: 'Remaining', width: '80px' },
          { key: 'discount_late', label: 'D/L Fee', width: '80px' },
          { key: 'total_fee', label: 'Total', width: '80px' },
          { key: 'status', label: 'Status', width: '80px' },
          { key: 'action', label: 'Action', width: '250px' },
        ]
      case 'class':
        return [
          { key: 'name', label: 'Class Name' },
          { key: 'studentCount', label: 'Total Students' },
          { key: 'totalFee', label: 'Total Fee' },
          { key: 'paidStudents', label: 'Paid Students' },
          { key: 'remainingStudents', label: 'Remaining Students' },
          { key: 'totalPaidFees', label: 'Paid Fee' },
          { key: 'totalRemainingFees', label: 'Remaining Fee' },
          { key: 'status', label: 'Status' },
          { key: 'action', label: 'Action' },
        ]
      case 'family':
        return [
          { key: 'familyCode', label: 'Family Code', width: '100px' },
          { key: 'fatherName', label: 'Father Name', width: '150px' },
          { key: 'childrenCount', label: 'Children', width: '80px' },
          { key: 'totalBalance', label: 'Prev Dues', width: '80px' },
          { key: 'monthlyFees', label: 'Monthly', width: '80px' },
          { key: 'discount_late', label: 'D/L Fee', width: '80px' },
          { key: 'totalAmount', label: 'Total', width: '80px' },
          { key: 'totalPaid', label: 'Paid', width: '80px' },
          { key: 'remainingAmount', label: 'Remaining', width: '80px' },
          { key: 'status', label: 'Status', width: '80px' },
          { key: 'action', label: 'Action', width: '120px' },
        ]
      default:
        return []
    }
  })
  
  // Method to set view mode with animation
  function setViewMode(mode) {
    if (viewMode.value === mode) return
    
    // Add loading state for smooth transition
    isLoading.value = true
    
    setTimeout(() => {
      viewMode.value = mode
      
      // Load data based on view mode
      if (mode === 'class') {
        loadClassData()
      } else if (mode === 'family') {
        loadFamilyData()
      } else {
        onFilter() // Reload student data
      }
      
      isLoading.value = false
    }, 300)
  }
  
  // Load class data from API
  async function loadClassData() {
    isLoading.value = true
    try {
      const params = {}
      if (session.value) params.session = session.value
      if (challanMonth.value) params.month = challanMonth.value
      if (sortBy.value) params.sort_by = sortBy.value
      if (sortDirection.value) params.sort_direction = sortDirection.value
      
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/class-fee-summaries`, { params })
      if (response.data.status && Array.isArray(response.data.result)) {
        classData.value = response.data.result.map(classItem => ({
          id: classItem.class_id,
          class_id: classItem.class_id,
          section_id: classItem.section_id,
          name: classItem.class_name + (classItem.section_name ? ` - ${classItem.section_name}` : ''),
          studentCount: classItem.total_students,
          totalFee: classItem.total_fees || 0,
          paidStudents: classItem.paid_students,
          remainingStudents: classItem.remaining_students,
          totalPaidFees: classItem.total_paid_fees,
          totalRemainingFees: classItem.total_remaining_fees,
          status: classItem.status,
          isSelected: false
        }))
        totalRecords.value = classData.value.length
      } else {
        classData.value = []
        totalRecords.value = 0
        // Only show error if response status is false, not for empty data
        if (response.data.status === false) {
          toast.error(response.data.message || 'Failed to fetch class-wise data')
        }
      }
    } catch (e) {
      console.error('Class data fetch error:', e)
      classData.value = []
      totalRecords.value = 0
      toast.error(e.response?.data?.message || 'Failed to fetch class-wise data')
    } finally {
      isLoading.value = false
    }
  }
  
  // Load family data from API
  async function loadFamilyData() {
    isLoading.value = true
    try {
      const params = {
        page: currentPage.value,
        per_page: pageSize.value
      }
      if (session.value) params.session = session.value
      if (challanMonth.value) params.month = challanMonth.value
      if (sortBy.value) params.sort_by = sortBy.value
      if (sortDirection.value) params.sort_direction = sortDirection.value
      if (searchQuery.value) params.search = searchQuery.value
      if (selectedStatuses.value && selectedStatuses.value !== 'All') params.fee_status = selectedStatuses.value
      
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/family-fee-summaries`, { params })
      if (response.data.status && response.data.result) {
        const result = response.data.result
        
        // Handle both old format (array) and new format (object with data)
        const familiesArray = Array.isArray(result) ? result : result.data || []
        
        familyData.value = familiesArray.map(family => ({
          id: family.family_id,
          familyCode: family.family_code,
          fatherName: family.father_name,
          motherName: family.mother_name,
          contactNumber: family.contact_number,
          address: family.address,
          childrenCount: family.children_count,
          totalBalance: family.total_balance,
          monthlyFees: family.monthly_fees,
          totalAmount: family.total_amount,
          totalPaid: family.total_paid,
          remainingAmount: family.remaining_amount,
          totalDiscount: family.total_discount,
          totalLateFee: family.total_late_fee,
          paidStudents: family.paid_students,
          unpaidStudents: family.unpaid_students,
          status: family.status,
          isSelected: false
        }))
        
        // Set pagination info
        if (!Array.isArray(result)) {
          totalRecords.value = result.total || 0
          currentPage.value = result.current_page || 1
        } else {
          totalRecords.value = familyData.value.length
        }
      } else {
        familyData.value = []
        totalRecords.value = 0
        // Only show error if response status is false, not for empty data
        if (response.data.status === false) {
          toast.error(response.data.message || 'Failed to fetch family-wise data')
        }
      }
    } catch (e) {
      console.error('Family data fetch error:', e)
      familyData.value = []
      totalRecords.value = 0
      toast.error(e.response?.data?.message || 'Failed to fetch family-wise data')
    } finally {
      isLoading.value = false
    }
  }
  
  // Generate challan for class
  async function generateClassChallan(classItem) {
    generatingChallan.value = classItem.id
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success(`Challan generated for ${classItem.name} successfully!`)
    } catch (error) {
      toast.error(`Failed to generate challan for ${classItem.name}`)
    } finally {
      generatingChallan.value = null
    }
  }
  
  // Generate challan for family
  async function generateFamilyChallan(family) {
    generatingChallan.value = family.id
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success(`Challan generated for ${family.fatherName} family successfully!`)
    } catch (error) {
      toast.error(`Failed to generate challan for ${family.fatherName} family`)
    } finally {
      generatingChallan.value = null
    }
  }
  
  // Add new refs for classFilter and classSectionFilter
  const classFilter = ref('')
  const classSectionFilter = ref('')
  
  // Computed for all selected (read-only)
  const allSelected = computed(() => {
    if (viewMode.value === 'student') {
      return filteredData.value.length > 0 && filteredData.value.every(s => s.isSelected)
    } else if (viewMode.value === 'class') {
      return filteredData.value.length > 0 && filteredData.value.every(c => c.isSelected)
    } else if (viewMode.value === 'family') {
      return filteredData.value.length > 0 && filteredData.value.every(f => f.isSelected)
    }
    return false
  })
  
  // Function to handle main checkbox click
  const handleMainCheckboxChange = (checked) => {
    if (viewMode.value === 'student') {
      filteredData.value.forEach(s => s.isSelected = checked)
    } else if (viewMode.value === 'class') {
      filteredData.value.forEach(c => c.isSelected = checked)
    } else if (viewMode.value === 'family') {
      filteredData.value.forEach(f => f.isSelected = checked)
    }
  }
  
  // Computed for selected students list
  const selectedStudentsList = computed(() => {
    if (viewMode.value === 'student') {
      return filteredData.value.filter(student => student.isSelected && student.status !== 'paid')
    }
    return []
  })
  
  // Computed for uncheck students list (for auto payment)
  const uncheckStudentsList = computed(() => {
    if (viewMode.value === 'student') {
      return filteredData.value.filter(student => !student.isSelected && student.status !== 'paid')
    }
    return []
  })
  
  // Computed for selected families list
  const selectedFamiliesList = computed(() => {
    if (viewMode.value === 'family') {
      return filteredData.value.filter(family => family.isSelected && family.status !== 'paid')
    }
    return []
  })
  
  // Computed for uncheck families list (for auto payment)
  const uncheckFamiliesList = computed(() => {
    if (viewMode.value === 'family') {
      return filteredData.value.filter(family => !family.isSelected && family.status !== 'paid')
    }
    return []
  })
  
  const feeSummaries = ref([]) // fetched from API
  const feePayments = ref([])  // fetched from API
  const feeRefunds = ref([])   // fetched from API
  
  function getPaidAmount(feeSummaryId) {
    return feePayments.value
      .filter(p => p.fee_summary_id === feeSummaryId)
      .reduce((sum, p) => sum + Number(p.amount_paid), 0)
  }
  
  function getRefundedAmount(feeSummaryId) {
    const paymentIds = feePayments.value.filter(p => p.fee_summary_id === feeSummaryId).map(p => p.id)
    return feeRefunds.value
      .filter(r => paymentIds.includes(r.fee_payment_id))
      .reduce((sum, r) => sum + Number(r.amount_refunded), 0)
  }
  
  function getDueAmount(summary) {
    return summary.final_amount - getPaidAmount(summary.id) + getRefundedAmount(summary.id)
  }
  
  function statusClass(status) {
    const statusLower = (status || '').toLowerCase();
    if (statusLower === 'paid') return 'bg-green-100 text-green-700'
    if (statusLower === 'partial') return 'bg-yellow-100 text-yellow-700'
    if (statusLower === 'pending') return 'bg-red-100 text-red-700'
    return 'bg-red-100 text-red-700'
  }
  
  const showPayModal = ref(false)
  const payRemarks = ref('')
  const payError = ref('')
  const payPaymentMode = ref('Cash')
  const partialPaymentMode = ref('Cash')
  
  function handlePayNow(student) {
    // Check if student's fee is already paid
    if (student.status === 'paid') {
      toast.warning(`${student.name} ki fee already paid hai.`)
      return
    }
    
    // Check if student is unchecked (isSelected = false)
    if (!student.isSelected) {
      // Auto submit full payment for unchecked student
      handleAutoFullPayment(student)
    } else {
      // Show payment modal for checked student
      selectedStudent.value = student
      payRemarks.value = ''
      payError.value = ''
      showPayModal.value = true
      
      // Fetch current fee summary to show accurate remaining balance
      fetchCurrentFeeSummary(student.grNo).then(summary => {
        if (summary) {
          // Update the computed total fee based on actual remaining amount
          const remainingAmount = summary.total_due || 0;
          if (remainingAmount > 0) {
            // Update the student's partial_fee to reflect actual remaining amount
            const studentIndex = students.value.findIndex(s => s.grNo === student.grNo);
            if (studentIndex !== -1) {
              students.value[studentIndex].partial_fee = remainingAmount;
            }
          }
        }
      });
    }
  }

  // New function for auto full payment
  const handleAutoFullPayment = async (student) => {
    isSubmitting.value = true
    try {
      const monthForPayload = dayjs().format('YYYY-MM-01')
      const studentData = students.value.find(s => s.grNo === student.grNo)
      if (!studentData) {
        toast.error('Could not find student data to process payment.')
        isSubmitting.value = false
        return
      }
      
      const remainingAmount = Math.ceil(Number(studentData.partial_fee || 0))
      
      // Check if there's actually a fee to pay
      if (remainingAmount <= 0) {
        toast.warning(`No fee due for ${student.name}. Remaining amount is ${remainingAmount}.`)
        isSubmitting.value = false
        return
      }
      
      const payload = {
        student_id: studentData.grNo,
        class_id: studentData.class_id,
        month_for: monthForPayload,
        base_fee: Math.ceil(Number(studentData.base_fee || 0)),
        discount_amount: 0, // No discount for auto payment
        late_fee: 0, // No late fee for auto payment
        carry_forward: Math.ceil(Number(studentData.carry_forward || 0)),
        final_amount: remainingAmount,
        amount_paid: remainingAmount,
        payment_date: dayjs().format('YYYY-MM-DD'),
        payment_mode: 'Auto Payment',
        remarks: `Auto full payment of ${remainingAmount} submitted.`,
        received_by: 1,
      }
      
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/fee-full-payment`, payload)
      if (response.data.status) {
        toast.success(`Full payment submitted for ${student.name}!`)
        
        // Refresh all data from backend instead of frontend processing
        await fetchCurrentFeeSummary(studentData.grNo);
        
        // Refresh the student list to show updated data from backend
        await onFilter(currentPage.value);
        
      } else {
        toast.error(response.data.message || 'Failed to submit payment.')
      }
    } catch (error) {
      console.error('Error submitting auto full payment:', error)
      toast.error(error.response?.data?.message || 'An unexpected error occurred.')
    } finally {
      isSubmitting.value = false
    }
  }
  
  // Function to fetch current fee summary for a student
  const fetchCurrentFeeSummary = async (studentId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/fee-payment-history/${studentId}`);
      if (response.data.status) {
        const backendData = response.data.result;
        
        // Update student data with backend values
        const studentIndex = students.value.findIndex(s => s.grNo === studentId);
        if (studentIndex !== -1 && backendData.fee_summary) {
          students.value[studentIndex] = {
            ...students.value[studentIndex],
            ...backendData.fee_summary
          };
        }
        
        return backendData;
      }
      return null;
    } catch (error) {
      console.error('Error fetching fee summary:', error);
      return null;
    }
  }
  
  function handlePayPartial(student) {
    // Check if student's fee is already paid
    if (student.status === 'paid') {
      toast.warning(`${student.name} ki fee already paid hai.`)
      return
    }
    
    // Check if student is unchecked (isSelected = false)
    if (!student.isSelected) {
      // Auto submit partial payment for unchecked student (50% of total fee)
      handleAutoPartialPayment(student)
    } else {
      // Show partial payment modal for checked student
      selectedStudent.value = student
      partialAmount.value = 0
      partialRemarks.value = ''
      partialError.value = ''
      showPartialModal.value = true
      
      // Fetch current fee summary to show accurate remaining balance
      fetchCurrentFeeSummary(student.grNo).then(summary => {
        if (summary) {
          // Update the computed total fee based on actual remaining amount
          const remainingAmount = summary.total_due || 0;
          if (remainingAmount > 0) {
            // Update the student's partial_fee to reflect actual remaining amount
            const studentIndex = students.value.findIndex(s => s.grNo === student.grNo);
            if (studentIndex !== -1) {
              students.value[studentIndex].partial_fee = remainingAmount;
            }
          }
        }
      });
    }
  }

  // New function for auto partial payment
  const handleAutoPartialPayment = async (student) => {
    isSubmitting.value = true
    try {
      const monthForPayload = dayjs().format('YYYY-MM-01')
      const studentData = students.value.find(s => s.grNo === student.grNo)
      if (!studentData) {
        toast.error('Could not find student data to process payment.')
        isSubmitting.value = false
        return
      }
      
      const remainingAmount = Math.ceil(Number(studentData.partial_fee || 0))
      
      // Check if there's actually a fee to pay
      if (remainingAmount <= 0) {
        toast.warning(`No fee due for ${student.name}. Remaining amount is ${remainingAmount}.`)
        isSubmitting.value = false
        return
      }
      
      const partialAmount = Math.ceil(remainingAmount * 0.5) // 50% of remaining amount
      
      const payload = {
        student_id: studentData.grNo,
        class_id: studentData.class_id,
        month_for: monthForPayload,
        base_fee: Math.ceil(Number(studentData.base_fee || 0)),
        discount_amount: 0, // No discount for auto payment
        late_fee: 0, // No late fee for auto payment
        carry_forward: Math.ceil(Number(studentData.carry_forward || 0)),
        final_amount: remainingAmount,
        amount_paid: partialAmount,
        payment_date: dayjs().format('YYYY-MM-DD'),
        payment_mode: 'Auto Payment',
        remarks: `Auto partial payment of ${partialAmount} (50% of ${remainingAmount}) submitted.`,
        received_by: 1,
      }
      
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/fee-partial-payment`, payload)
      if (response.data.status) {
        toast.success(`Partial payment submitted for ${student.name}!`)
        
        // Refresh all data from backend instead of frontend processing
        await fetchCurrentFeeSummary(studentData.grNo);
        
        // Refresh the student list to show updated data from backend
        await onFilter(currentPage.value);
        
      } else {
        toast.error(response.data.message || 'Failed to submit payment.')
      }
    } catch (error) {
      console.error('Error submitting auto partial payment:', error)
      toast.error(error.response?.data?.message || 'An unexpected error occurred.')
    } finally {
      isSubmitting.value = false
    }
  }
  
  const handlePartialPaymentSubmit = async () => {
    const remainingAmount = computedRemainingAmount.value;
    
    // Check if there's actually a fee to pay
    if (remainingAmount <= 0) {
      toast.warning('No fee due for this student. Remaining amount is 0.');
      return;
    }
    
    const minAmount = Math.max(100, remainingAmount * 0.1); // Minimum 100 or 10% of remaining amount, whichever is higher
    
    if (partialAmount.value < minAmount || partialAmount.value > remainingAmount) {
      toast.error(`Invalid amount. Please enter a value between ${minAmount} and ${remainingAmount}`);
      return;
    }
    isSubmitting.value = true;
    try {
      const monthForPayload = dayjs().format('YYYY-MM-01');
      const studentData = students.value.find(s => s.grNo === selectedStudent.value.grNo);
      if (!studentData) {
        toast.error('Could not find student data to process payment.');
        isSubmitting.value = false;
        return;
      }
      
      const payload = {
        student_id: studentData.grNo,
        class_id: studentData.class_id,
        month_for: monthForPayload,
        base_fee: Math.ceil(Number(studentData.base_fee || 0)),
        discount_amount: Math.ceil(Number(editableDiscount.value || 0)),
        late_fee: Math.ceil(Number(editableLateFee.value || 0)),
        carry_forward: Math.ceil(Number(studentData.carry_forward || 0)),
        final_amount: Math.ceil(Number(remainingAmount || 0)),
        amount_paid: Math.ceil(Number(partialAmount.value || 0)),
        payment_date: dayjs().format('YYYY-MM-DD'),
        payment_mode: partialPaymentMode.value,
        remarks: partialRemarks.value || `Partial payment of ${partialAmount.value} received.`,
        received_by: 1,
      };
      
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/fee-partial-payment`, payload);
      if (response.data.status) {
        toast.success(`Partial payment of PKR ${partialAmount.value} saved successfully!`);
        
        // Refresh all data from backend instead of frontend processing
        await fetchCurrentFeeSummary(studentData.grNo);
        
        // Close modal and reset form
        showPartialModal.value = false;
        partialAmount.value = 0;
        partialRemarks.value = '';
        editableDiscount.value = 0;
        editableLateFee.value = 0;
        
        // Refresh the student list to show updated data from backend
        await onFilter(currentPage.value);
        
      } else {
        toast.error(response.data.message || 'Failed to save payment.');
      }
    } catch (error) {
      console.error('Error submitting partial payment:', error);
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      toast.error(errorMessage);
    } finally {
      isSubmitting.value = false;
    }
  }
  
  const handleFullPaymentSubmit = async () => {
    isSubmitting.value = true;
    try {
      const monthForPayload = dayjs().format('YYYY-MM-01');
      const studentData = students.value.find(s => s.grNo === selectedStudent.value.grNo);
      if (!studentData) {
        toast.error('Could not find student data to process payment.');
        isSubmitting.value = false;
        return;
      }
      
      const payload = {
        student_id: studentData.grNo,
        class_id: studentData.class_id,
        month_for: monthForPayload,
        base_fee: Math.ceil(Number(studentData.base_fee || 0)),
        discount_amount: Math.ceil(Number(editableDiscount.value || 0)),
        late_fee: Math.ceil(Number(editableLateFee.value || 0)),
        carry_forward: Math.ceil(Number(studentData.carry_forward || 0)),
        final_amount: Math.ceil(Number(computedTotalFee.value || 0)),
        amount_paid: Math.ceil(Number(computedRemainingAmount.value || 0)),
        payment_date: dayjs().format('YYYY-MM-DD'),
        payment_mode: payPaymentMode.value,
        remarks: payRemarks.value || `Full payment of ${computedRemainingAmount.value} received.`,
        received_by: 1,
      };
      
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/fee-full-payment`, payload);
      if (response.data.status) {
        toast.success(`Full payment of PKR ${computedRemainingAmount.value} saved successfully!`);
        
        // Refresh all data from backend instead of frontend processing
        await fetchCurrentFeeSummary(studentData.grNo);
        
        // Close modal and reset form
        showPayModal.value = false;
        payRemarks.value = '';
        editableDiscount.value = 0;
        editableLateFee.value = 0;
        
        // Refresh the student list to show updated data from backend
        await onFilter(currentPage.value);
        
      } else {
        toast.error(response.data.message || 'Failed to save payment.');
      }
    } catch (error) {
      console.error('Error submitting full payment:', error);
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      toast.error(errorMessage);
    } finally {
      isSubmitting.value = false;
    }
  }
  
  const showHistoryModal = ref(false)
  const paymentHistory = ref([])
  const totalPaidAmount = ref(0)
  const totalDueAmount = ref(0)
  const isLoadingHistory = ref(false)
  
  function handleViewHistory(student) {
    selectedStudent.value = student
    showHistoryModal.value = true
    isLoadingHistory.value = true
    // Fetch payment history for the selected student
    fetchPaymentHistory()
  }
  
  async function fetchPaymentHistory() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/fee-payment-history/${selectedStudent.value.grNo}`);
      if (response.data.status) {
        // Get all data directly from backend without any frontend processing
        const backendData = response.data.result;
        
        // Display exactly what comes from backend
        paymentHistory.value = backendData.payments || [];
        totalPaidAmount.value = backendData.total_paid || 0;
        totalDueAmount.value = backendData.total_due || 0;
        
        // Update student data with backend values
        if (backendData.student_info) {
          selectedStudent.value = {
            ...selectedStudent.value,
            ...backendData.student_info
          };
        }
        
        // Update fee summary data from backend
        if (backendData.fee_summary) {
          const studentIndex = students.value.findIndex(s => s.grNo === selectedStudent.value.grNo);
          if (studentIndex !== -1) {
            students.value[studentIndex] = {
              ...students.value[studentIndex],
              ...backendData.fee_summary
            };
          }
        }
      } else {
        paymentHistory.value = [];
        totalPaidAmount.value = 0;
        totalDueAmount.value = 0;
        toast.error(response.data.message || 'Failed to fetch payment history');
      }
    } catch (error) {
      console.error('Error fetching payment history:', error);
      paymentHistory.value = [];
      totalPaidAmount.value = 0;
      totalDueAmount.value = 0;
      toast.error('Failed to fetch payment history');
    } finally {
      isLoadingHistory.value = false;
    }
  }
  
  function formatDate(date) {
    return dayjs(date).format('DD MMM YYYY HH:mm')
  }
  
  function formatTime(date) {
    return dayjs(date).format('HH:mm')
  }
  
  function formatCurrency(amount) {
    return Math.ceil(Number(amount || 0))
  }
  
  function closePartialModal() {
    showPartialModal.value = false;
    setTimeout(() => { selectedStudent.value = null }, 300);
  }
  function closeFullModal() {
    showPayModal.value = false;
    setTimeout(() => { selectedStudent.value = null }, 300);
  }
  function closeHistoryModal() {
    showHistoryModal.value = false;
    setTimeout(() => { selectedStudent.value = null }, 300);
  }
  
  // Auto payment submission
  const isSubmittingAutoPayments = ref(false)

  const submitAutoPayments = async () => {
    if (uncheckStudentsList.value.length === 0) {
      toast.warning('No uncheck students found for auto payment.')
      return
    }

    isSubmittingAutoPayments.value = true
    let successCount = 0
    let failCount = 0

    try {
      for (const student of uncheckStudentsList.value) {
        try {
          const monthForPayload = dayjs().format('YYYY-MM-01')
          const payload = {
            student_id: student.grNo,
            class_id: student.class_id,
            month_for: monthForPayload,
            base_fee: Math.ceil(Number(student.base_fee || 0)),
            discount_amount: 0, // No discount for auto payment
            late_fee: 0, // No late fee for auto payment
            carry_forward: Math.ceil(Number(student.carry_forward || 0)),
            final_amount: Math.ceil(Number(student.total_fee || 0)),
            amount_paid: Math.ceil(Number(student.total_fee || 0)),
            payment_date: dayjs().format('YYYY-MM-DD'),
            payment_mode: 'Auto Payment',
            remarks: `Auto payment of ${Math.ceil(Number(student.total_fee || 0))} submitted.`,
            received_by: 1,
          }

          const response = await axios.post(`${import.meta.env.VITE_API_URL}/fee-full-payment`, payload)
          if (response.data.status) {
            successCount++
            // Update student status in the list
            const studentIndex = students.value.findIndex(s => s.grNo === student.grNo)
            if (studentIndex !== -1) {
              students.value[studentIndex].status = 'Paid'
              students.value[studentIndex].carry_forward = 0
            }
          } else {
            failCount++
          }
        } catch (error) {
          console.error(`Error processing auto payment for ${student.name}:`, error)
          failCount++
        }
      }

      if (successCount > 0) {
        toast.success(`Auto payment completed! ${successCount} successful, ${failCount} failed.`)
        showChallanModal.value = false
        // Refresh data
        await onFilter(currentPage.value)
      } else {
        toast.error('All auto payments failed. Please try again.')
      }
    } catch (error) {
      console.error('Error in auto payment process:', error)
      toast.error('Auto payment process failed. Please try again.')
    } finally {
      isSubmittingAutoPayments.value = false
    }
  }
  
  const submitAutoFamilyPayments = async () => {
    if (uncheckFamiliesList.value.length === 0) {
      toast.warning('No uncheck families found for auto payment.')
      return
    }

    isSubmittingAutoPayments.value = true
    let successCount = 0
    let failCount = 0

    try {
      for (const family of uncheckFamiliesList.value) {
        try {
          // Get family students first
          const familyResponse = await axios.get(`${import.meta.env.VITE_API_URL}/family/${family.id}/students`)
          
          if (familyResponse.data.status) {
            const students = familyResponse.data.result.students || []
            let familySuccessCount = 0
            let familyFailCount = 0
            
            for (const student of students) {
              if (student.payment_status !== 'paid' && student.remaining_amount > 0) {
                try {
                  const payload = {
                    student_id: student.id,
                    class_id: student.class_id,
                    month_for: dayjs().format('YYYY-MM-01'),
                    base_fee: Math.ceil(Number(student.base_fee || 0)),
                    discount_amount: 0,
                    late_fee: 0,
                    carry_forward: Math.ceil(Number(student.carry_forward || 0)),
                    final_amount: Math.ceil(Number(student.remaining_amount || 0)),
                    amount_paid: Math.ceil(Number(student.remaining_amount || 0)),
                    payment_date: dayjs().format('YYYY-MM-DD'),
                    payment_mode: 'Auto Family Payment',
                    remarks: `Auto family payment for ${family.fatherName}`,
                    received_by: 1,
                  }
                  
                  const paymentResponse = await axios.post(`${import.meta.env.VITE_API_URL}/fee-full-payment`, payload)
                  if (paymentResponse.data.status) {
                    familySuccessCount++
                  } else {
                    familyFailCount++
                  }
                } catch (error) {
                  console.error(`Error processing auto payment for student ${student.name}:`, error)
                  familyFailCount++
                }
              }
            }
            
            if (familySuccessCount > 0) {
              successCount++
              // Update family status in the list
              const familyIndex = familyData.value.findIndex(f => f.id === family.id)
              if (familyIndex !== -1) {
                familyData.value[familyIndex].status = 'Paid'
              }
            } else {
              failCount++
            }
          } else {
            failCount++
          }
        } catch (error) {
          console.error(`Error processing auto payment for family ${family.fatherName}:`, error)
          failCount++
        }
      }

      if (successCount > 0) {
        toast.success(`Auto family payment completed! ${successCount} families successful, ${failCount} failed.`)
        showChallanModal.value = false
        // Refresh data
        if (viewMode.value === 'family') {
          await loadFamilyData()
        }
      } else {
        toast.error('All auto family payments failed. Please try again.')
      }
    } catch (error) {
      console.error('Error in auto family payment process:', error)
      toast.error('Auto family payment process failed. Please try again.')
    } finally {
      isSubmittingAutoPayments.value = false
    }
  }
  
  // Class fee payment function
  async function handlePayClassFees(classItem) {
    try {
      await ElMessageBox.confirm(
        `Are you sure you want to pay fees for all ${classItem.studentCount} students in ${classItem.name}?`,
        'Pay Class Fees',
        {
          confirmButtonText: 'Yes, Pay All',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      );
      
      payingClassId.value = classItem.id
      
      const payload = {
        class_id: classItem.class_id || classItem.id,
        section_id: classItem.section_id,
        payment_mode: 'cash',
        payment_date: dayjs().format('YYYY-MM-DD'),
        received_by: 1,
        remarks: `Bulk payment for class ${classItem.name}`
      }
      
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/class/${classItem.id}/pay-fees`, payload)
      
      if (response.data.status) {
        toast.success(`${response.data.result.success_count} students paid successfully!`)
        // Refresh class data
        if (viewMode.value === 'class') {
          loadClassData()
        }
      } else {
        toast.error(response.data.message || 'Failed to pay class fees')
      }
    } catch (error) {
      if (error !== 'cancel') {
        console.error('Error paying class fees:', error)
        toast.error('Failed to pay class fees')
      }
    } finally {
      payingClassId.value = null
    }
  }
  
  // Family students modal function
  async function handleViewFamilyStudents(family) {
    selectedFamily.value = family
    showFamilyModal.value = true
    loadingFamilyStudents.value = true
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/family/${family.id}/students`)
      
      if (response.data.status) {
        familyStudents.value = response.data.result.students || []
        // Update family info with complete data
        selectedFamily.value = {
          ...selectedFamily.value,
          ...response.data.result.family,
          total_amount: response.data.result.total_amount,
          total_paid: response.data.result.total_paid,
          total_remaining: response.data.result.total_remaining,
          students_count: response.data.result.students_count
        }
      } else {
        toast.error('Failed to fetch family students')
        familyStudents.value = []
      }
    } catch (error) {
      console.error('Error fetching family students:', error)
      toast.error('Failed to fetch family students')
      familyStudents.value = []
    } finally {
      loadingFamilyStudents.value = false
    }
  }
  
  function closeFamilyModal() {
    showFamilyModal.value = false
    setTimeout(() => {
      selectedFamily.value = null
      familyStudents.value = []
    }, 300)
  }
  
  // Family payment functions
  async function handlePayFamilyFull(family) {
    try {
      await ElMessageBox.confirm(
        `Are you sure you want to pay full fees (PKR ${formatCurrency(family.remainingAmount)}) for ${family.fatherName}'s family?`,
        'Pay Family Full Fees',
        {
          confirmButtonText: 'Yes, Pay Full',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      );
      
      // Get family students and pay for each one
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/family/${family.id}/students`)
      
      if (response.data.status) {
        const students = response.data.result.students || []
        let successCount = 0
        let failCount = 0
        
        for (const student of students) {
          if (student.payment_status !== 'paid' && student.remaining_amount > 0) {
            try {
              const payload = {
                student_id: student.id,
                class_id: student.class_id,
                month_for: dayjs().format('YYYY-MM-01'),
                base_fee: Math.ceil(Number(student.base_fee || 0)),
                discount_amount: 0,
                late_fee: 0,
                carry_forward: Math.ceil(Number(student.carry_forward || 0)),
                final_amount: Math.ceil(Number(student.remaining_amount || 0)),
                amount_paid: Math.ceil(Number(student.remaining_amount || 0)),
                payment_date: dayjs().format('YYYY-MM-DD'),
                payment_mode: 'Family Payment',
                remarks: `Family full payment for ${family.fatherName}`,
                received_by: 1,
              }
              
              const paymentResponse = await axios.post(`${import.meta.env.VITE_API_URL}/fee-full-payment`, payload)
              if (paymentResponse.data.status) {
                successCount++
              } else {
                failCount++
              }
            } catch (error) {
              console.error(`Error paying for student ${student.name}:`, error)
              failCount++
            }
          }
        }
        
        if (successCount > 0) {
          toast.success(`Family payment completed! ${successCount} students paid successfully, ${failCount} failed.`)
          // Refresh family data
          await onFilter(currentPage.value)
        } else {
          toast.error('All family payments failed. Please try again.')
        }
      } else {
        toast.error('Failed to fetch family students for payment')
      }
    } catch (error) {
      if (error !== 'cancel') {
        console.error('Error paying family fees:', error)
        toast.error('Failed to pay family fees')
      }
    }
  }
  
  async function handlePayFamilyPartial(family) {
    try {
      const partialAmount = Math.ceil(Number(family.remainingAmount || 0) * 0.5) // 50% of remaining amount
      
      await ElMessageBox.confirm(
        `Are you sure you want to pay partial fees (PKR ${formatCurrency(partialAmount)}) for ${family.fatherName}'s family?`,
        'Pay Family Partial Fees',
        {
          confirmButtonText: 'Yes, Pay Partial',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      );
      
      // Get family students and pay partial for each one
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/family/${family.id}/students`)
      
      if (response.data.status) {
        const students = response.data.result.students || []
        let successCount = 0
        let failCount = 0
        
        for (const student of students) {
          if (student.payment_status !== 'paid' && student.remaining_amount > 0) {
            try {
              const studentPartialAmount = Math.ceil(Number(student.remaining_amount || 0) * 0.5)
              
              const payload = {
                student_id: student.id,
                class_id: student.class_id,
                month_for: dayjs().format('YYYY-MM-01'),
                base_fee: Math.ceil(Number(student.base_fee || 0)),
                discount_amount: 0,
                late_fee: 0,
                carry_forward: Math.ceil(Number(student.carry_forward || 0)),
                final_amount: Math.ceil(Number(student.remaining_amount || 0)),
                amount_paid: studentPartialAmount,
                payment_date: dayjs().format('YYYY-MM-DD'),
                payment_mode: 'Family Partial Payment',
                remarks: `Family partial payment for ${family.fatherName}`,
                received_by: 1,
              }
              
              const paymentResponse = await axios.post(`${import.meta.env.VITE_API_URL}/fee-partial-payment`, payload)
              if (paymentResponse.data.status) {
                successCount++
              } else {
                failCount++
              }
            } catch (error) {
              console.error(`Error paying partial for student ${student.name}:`, error)
              failCount++
            }
          }
        }
        
        if (successCount > 0) {
          toast.success(`Family partial payment completed! ${successCount} students paid successfully, ${failCount} failed.`)
          // Refresh family data
          await onFilter(currentPage.value)
        } else {
          toast.error('All family partial payments failed. Please try again.')
        }
      } else {
        toast.error('Failed to fetch family students for payment')
      }
    } catch (error) {
      if (error !== 'cancel') {
        console.error('Error paying family partial fees:', error)
        toast.error('Failed to pay family partial fees')
      }
    }
  }


  </script>
  <style scoped>
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  /* Fade-slide transition for view switching */
  .fade-slide-enter-active {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .fade-slide-leave-active {
    transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  
  .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px) scale(1.02);
  }
  
  /* Hover scale utility classes */
  .hover\:scale-102:hover {
    transform: scale(1.02);
  }
  
  .hover\:scale-105:hover {
    transform: scale(1.05);
  }
  
  /* Tab button animations */
  .tab-button {
    position: relative;
    overflow: hidden;
  }
  
  .tab-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  .tab-button:hover::before {
    left: 100%;
  }
  
  /* Loading animation enhancements */
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
  
  /* Custom scrollbar for better UX */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #a855f7, #ec4899);
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #9333ea, #db2777);
  }
  
  .custom-partial-modal .el-dialog__body {
    padding: 0 !important;
    background: transparent;
  }
  .custom-input-number .el-input__wrapper,
  .custom-input .el-input__wrapper {
    border-radius: 0.75rem !important;
    box-shadow: 0 1px 4px 0 rgba(168,139,250,0.08);
    background: #fafaff;
    border: 1px solid #e9d5ff;
  }
  .modern-fee-modal .el-dialog {
    border-radius: 1.25rem;
    box-shadow: 0 8px 32px 0 rgba(80,0,120,0.12), 0 1.5px 8px 0 rgba(80,0,120,0.10);
    background: #fff;
    max-width: 700px;
  }
  .modern-fee-modal .el-dialog__header {
    padding: 0;
    border-radius: 1.25rem 1.25rem 0 0;
  }
  .modern-fee-modal .el-dialog__body {
    padding: 0 !important;
    background: transparent;
  }
  .modern-fee-modal .el-dialog__footer {
    padding: 0 0 1rem 0;
    background: transparent;
  }
  .modern-input-number .el-input__wrapper,
  .modern-input .el-input__wrapper {
    border-radius: 1rem !important;
    box-shadow: 0 2px 8px 0 rgba(168,139,250,0.10);
    background: #f6f7fb;
    border: 1.5px solid #e9d5ff;
    font-size: 15px;
    min-height: 36px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .modern-input-number .el-input__wrapper:focus-within {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 2px #e9d5ff;
  }
  
  .modern-history-modal .el-dialog {
    border-radius: 1.5rem;
    box-shadow: 0 20px 60px 0 rgba(80,0,120,0.15), 0 8px 32px 0 rgba(80,0,120,0.12);
    background: #fff;
    max-width: 900px;
  }
  .modern-history-modal .el-dialog__header {
    padding: 0;
    border-radius: 1.5rem 1.5rem 0 0;
  }
  .modern-history-modal .el-dialog__body {
    padding: 0 !important;
    background: transparent;
  }
  .modern-history-modal .el-dialog__footer {
    padding: 0 0 1rem 0;
    background: transparent;
  }
  
  /* Enhanced Modal Styles */
  .enhanced-fee-modal .el-dialog {
    border-radius: 1.5rem;
    box-shadow: 0 25px 80px 0 rgba(80,0,120,0.15), 0 12px 40px 0 rgba(80,0,120,0.12);
    background: #fff;
    max-width: 800px;
    overflow: hidden;
  }
  
  .enhanced-fee-modal .el-dialog__header {
    padding: 0;
    border-radius: 1.5rem 1.5rem 0 0;
  }
  
  .enhanced-fee-modal .el-dialog__body {
    padding: 0 !important;
    background: transparent;
  }
  
  .enhanced-fee-modal .el-dialog__footer {
    padding: 0 0 1rem 0;
    background: transparent;
  }
  
  .enhanced-history-modal .el-dialog {
    border-radius: 1.5rem;
    box-shadow: 0 30px 100px 0 rgba(80,0,120,0.18), 0 15px 50px 0 rgba(80,0,120,0.15);
    background: #fff;
    max-width: 900px;
    overflow: hidden;
  }
  
  .enhanced-history-modal .el-dialog__header {
    padding: 0;
    border-radius: 1.5rem 1.5rem 0 0;
  }
  
  .enhanced-history-modal .el-dialog__body {
    padding: 0 !important;
    background: transparent;
  }
  
  .enhanced-history-modal .el-dialog__footer {
    padding: 0 0 1rem 0;
    background: transparent;
  }
  
  .enhanced-input-number .el-input__wrapper,
  .enhanced-input .el-input__wrapper {
    border-radius: 1rem !important;
    box-shadow: 0 2px 8px 0 rgba(168,139,250,0.08);
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    font-size: 14px;
    min-height: 40px;
    transition: all 0.3s ease;
  }
  
  .enhanced-input-number .el-input__wrapper:focus-within,
  .enhanced-input .el-input__wrapper:focus-within {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(168,85,247,0.1);
    background: #fff;
  }
  
  .enhanced-input-number .el-input__inner,
  .enhanced-input .el-input__inner {
    font-size: 14px;
    font-weight: 500;
    color: #1e293b;
  }
  
  .enhanced-input-number .el-input__inner::placeholder,
  .enhanced-input .el-input__inner::placeholder {
    color: #94a3b8;
    font-weight: 400;
    font-size: 12px;
  }
  
  /* Animation for modal entrance */
  .enhanced-fee-modal .el-dialog,
  .enhanced-history-modal .el-dialog {
    animation: modalSlideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  /* Enhanced button hover effects */
  .enhanced-fee-modal button,
  .enhanced-history-modal button {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .enhanced-fee-modal button:hover,
  .enhanced-history-modal button:hover {
    transform: translateY(-1px);
  }
  
  /* Card hover animations */
  .enhanced-fee-modal .bg-gradient-to-br,
  .enhanced-history-modal .bg-gradient-to-br {
    transition: all 0.3s ease;
  }
  
  .enhanced-fee-modal .bg-gradient-to-br:hover,
  .enhanced-history-modal .bg-gradient-to-br:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  }
  </style> 
  