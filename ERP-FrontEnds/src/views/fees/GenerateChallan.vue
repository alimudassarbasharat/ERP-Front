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
              <component :is="tab.icon" class="w-4 h-4" />
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
        Generate Challan - {{ currentViewLabel }}
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-500">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Fee Management</span>
        <span class="mx-2">|</span>
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Fee Collection</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">Generate Challan</span>
      </nav>
    </div>

    <!-- Select Criteria Label -->
    <div class="w-full max-w-7xl mx-auto mb-2">
      <div class="flex flex-col items-start">
        <h3 class="text-base font-medium text-gray-900 tracking-tight">Select Criteria</h3>
        <div class="h-[1px] bg-purple-200 w-full transition-all duration-300" style="max-width: 110px"></div>
      </div>
    </div>

    <!-- Filter Bar in Card -->
    <UiCard class="w-full max-w-7xl mx-auto rounded-lg transition-all duration-500 ease-in-out transform hover:shadow-lg">
      <form class="w-full" @submit.prevent="onFilter">
        <div class="flex flex-wrap lg:flex-nowrap items-end gap-x-4 gap-y-2">
          <div class="flex flex-col w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] lg:flex-1">
            <label class="mb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">Session</label>
            <div class="relative">
              <select v-model="session" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option v-for="item in sessions" :key="item" :value="item">{{ item }}</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[1px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>
          <div class="flex flex-col w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] lg:flex-1">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Class</label>
            <div class="relative">
              <select v-model="classId" class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8">
                <option value="">All</option>
                <option v-for="item in classes" :key="item.id" :value="item.id">{{ item.name }}</option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[1px] bg-purple-200 pointer-events-none"></div>
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
              <div class="absolute left-0 right-0 bottom-0 h-[1px] bg-purple-200 pointer-events-none"></div>
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
              <div class="absolute left-0 right-0 bottom-0 h-[1px] bg-purple-200 pointer-events-none"></div>
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
              <div class="absolute left-0 right-0 bottom-0 h-[1px] bg-purple-200 pointer-events-none"></div>
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
        <div class="h-[1px] bg-purple-200 w-full transition-all duration-500" style="max-width: 120px"></div>
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
          <div class="absolute left-0 right-0 bottom-0 h-[1px] bg-purple-200 pointer-events-none"></div>
        </div>
      </div>
      <!-- Generate Options (right) -->
      <div class="flex items-center gap-2 ml-4">
        <label class="flex items-center gap-2 cursor-pointer group relative">
          <input 
            type="checkbox" 
            v-model="allSelected"
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
                Generate Challan
              </span>
                              <div 
                class="absolute left-0 right-0 bottom-0 h-[1px] bg-purple-200 transition-all duration-300"
              ></div>
            </template>
          </div>
        </label>
        <button 
          v-if="allSelected"
          @click="generateChallanForSelected"
          :disabled="bulkGeneratingChallan"
          class="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md transform origin-left hover:scale-105"
          style="animation: slideIn 0.3s ease-out forwards;"
        >
          <span v-if="bulkGeneratingChallan" class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-transparent mr-2"></span>
          Generate Challan
        </button>
      </div>
    </div>
    <div class="w-full max-w-7xl mx-auto">
      <div class="h-[1px] w-full bg-purple-200 mb-4"></div>
    </div>

    <!-- Loader -->
    <div v-if="isLoading" class="w-full max-w-7xl mx-auto">
      <LoadingStudents title="Loading Data" :message="`Please wait while we fetch ${currentDataLabel.toLowerCase()}...`" />
    </div>

    <!-- Dynamic Content with Smooth Transitions -->
    <div v-else class="w-full max-w-7xl mx-auto rounded-lg">
      <Transition name="fade-slide" mode="out-in">
        <div :key="viewMode" class="w-full">
          <UiTable>
                          <template #head>
                <tr>
                  <th v-for="col in currentTableColumns" :key="col.key" 
                      @click="handleSort(col.key)" 
                      class="py-2 px-2 font-medium text-gray-600 text-sm tracking-wider cursor-pointer select-none group transition-all duration-150 hover:bg-purple-50 border-b-2 border-purple-400 relative whitespace-nowrap">
                    <span class="flex items-center justify-between group-hover:text-purple-600 transition-colors duration-150">
                      <span>{{ col.label }}</span>
                      <span class="ml-2 flex-shrink-0">
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
              <td :colspan="currentTableColumns.length" class="py-16 align-middle text-center">
                <div class="min-h-[40vh] flex flex-col items-center justify-center">
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
            <template v-else-if="viewMode === 'student'">
              <tr v-for="(student, idx) in filteredData" :key="student.grNo" :class="[ 'hover:bg-indigo-50 transition-colors', 'border-b border-purple-200', idx === filteredData.length - 1 ? 'border-b-2 border-purple-400' : '' ]">
                <td class="py-2 px-2 text-gray-900 font-normal text-xs whitespace-nowrap">{{ student.grNo }}</td>
                <td class="py-2 px-2 text-gray-900 font-normal text-xs whitespace-nowrap">{{ student.name }}</td>
                <td class="py-2 px-2 text-gray-900 font-normal text-xs whitespace-nowrap">{{ student.classSection }}</td>
                <td class="py-2 px-2 text-gray-900 font-normal text-xs whitespace-nowrap">{{ Math.ceil(Number(student.carry_forward || 0)) }}</td>
                <td class="py-2 px-2 text-gray-900 font-normal text-xs whitespace-nowrap">{{ Math.ceil(Number(student.base_fee || 0)) }}</td>
                <td class="py-2 px-2 text-gray-900 font-normal text-xs whitespace-nowrap">{{ Math.ceil(Number(student.total_fee || 0)) }}</td>
                <td class="py-2 px-2">
                  <span :class="[
                    'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium',
                    student.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  ]">
                    {{ student.status }}
                  </span>
                </td>
                <td class="py-2 px-2 text-right">
                  <div class="flex items-center justify-end">
                    <template v-if="allSelected">
                      <label class="relative flex items-center mr-2">
                        <input 
                          type="checkbox" 
                          v-model="student.isSelected" 
                          class="w-5 h-5 border-2 border-purple-200 rounded-md transition-all duration-200 group-hover:border-purple-400 checked:border-purple-500 checked:bg-purple-500 focus:ring-purple-500 appearance-none flex items-center justify-center" 
                        />
                        <span v-if="student.isSelected" class="absolute left-1 top-1 pointer-events-none">
                          <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                        </span>
                      </label>
                    </template>
                    <button 
                      @click="generateChallan(student)"
                      :disabled="generatingChallan === student.grNo"
                      class="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
                      style="min-width: 70px;"
                    >
                      <span v-if="generatingChallan === student.grNo" class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-transparent"></span>
                      <span v-else>Generate</span>
                    </button>
                  </div>
                </td>
              </tr>
            </template>
            
            <!-- Class View -->
            <template v-else-if="viewMode === 'class'">
              <tr v-for="(classItem, idx) in filteredData" :key="classItem.id" :class="[ 'hover:bg-indigo-50 transition-colors', 'border-b border-purple-200', idx === filteredData.length - 1 ? 'border-b-2 border-purple-400' : '' ]">
                <td class="py-2 px-2 text-gray-900 font-normal text-xs whitespace-nowrap">{{ classItem.name }}</td>
                <td class="py-2 px-2 text-gray-900 font-normal text-xs whitespace-nowrap">{{ classItem.section_name || '-' }}</td>
                <td class="py-2 px-2 text-gray-900 font-normal text-xs whitespace-nowrap">
                  <span :class="[
                    'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium',
                    (classItem.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700')
                  ]">
                    {{ classItem.status || 'Active' }}
                  </span>
                </td>
                <td class="py-2 px-2 text-right">
                  <div class="flex items-center justify-start">
                    <template v-if="allSelected">
                      <label class="relative flex items-center mr-2">
                        <input 
                          type="checkbox" 
                          v-model="classItem.isSelected" 
                          class="w-5 h-5 border-2 border-purple-200 rounded-md transition-all duration-200 group-hover:border-purple-400 checked:border-purple-500 checked:bg-purple-500 focus:ring-purple-500 appearance-none flex items-center justify-center" 
                        />
                        <span v-if="classItem.isSelected" class="absolute left-1 top-1 pointer-events-none">
                          <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                        </span>
                      </label>
                    </template>
                    <button 
                      @click="generateClassChallan(classItem)"
                      :disabled="generatingChallan === classItem.id"
                      class="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
                      style="min-width: 70px;"
                    >
                      <span v-if="generatingChallan === classItem.id" class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-transparent"></span>
                      <span v-else>Generate</span>
                    </button>
                  </div>
                </td>
              </tr>
            </template>
            
            <!-- Family View -->
            <template v-else-if="viewMode === 'family'">
              <tr v-for="(family, idx) in filteredData" :key="family.id" :class="[ 'hover:bg-indigo-50 transition-colors', 'border-b border-purple-200', idx === filteredData.length - 1 ? 'border-b-2 border-purple-400' : '' ]">
                <td class="py-2 px-2 text-gray-900 font-normal text-xs whitespace-nowrap">{{ family.familyCode }}</td>
                <td class="py-2 px-2 text-gray-900 font-normal text-xs whitespace-nowrap">{{ family.fatherName }}</td>
                <td class="py-2 px-2 text-gray-900 font-normal text-xs whitespace-nowrap">{{ family.childrenCount }}</td>
                <td class="py-2 px-2 text-gray-900 font-normal text-xs whitespace-nowrap">{{ family.totalBalance }}</td>
                <td class="py-2 px-2 text-gray-900 font-normal text-xs whitespace-nowrap">{{ family.monthlyFees }}</td>
                <td class="py-2 px-2 text-gray-900 font-normal text-xs whitespace-nowrap">{{ family.totalDiscount }}</td>
                <td class="py-2 px-2 text-gray-900 font-normal text-xs whitespace-nowrap">{{ family.totalLateFee }}</td>
                <td class="py-2 px-2 text-gray-900 font-normal text-xs whitespace-nowrap">{{ family.totalAmount }}</td>
                <td class="py-2 px-2 text-gray-900 font-normal text-xs whitespace-nowrap">{{ family.totalPaid }}</td>
                <td class="py-2 px-2 text-gray-900 font-normal text-xs whitespace-nowrap">{{ family.remainingAmount }}</td>
                <td class="py-2 px-2">
                  <span :class="[
                      'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium',
                    family.status === 'Paid' ? 'bg-green-100 text-green-700' : 
                    family.status === 'Partial' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  ]">
                    {{ family.status }}
                  </span>
                </td>
                <td class="py-2 px-2 text-right">
                  <div class="flex items-center justify-end">
                    <template v-if="allSelected">
                      <label class="relative flex items-center mr-2">
                        <input 
                          type="checkbox" 
                          v-model="family.isSelected" 
                          class="w-5 h-5 border-2 border-purple-200 rounded-md transition-all duration-200 group-hover:border-purple-400 checked:border-purple-500 checked:bg-purple-500 focus:ring-purple-500 appearance-none flex items-center justify-center"
                        />
                        <span v-if="family.isSelected" class="absolute left-1 top-1">
                          <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                        </span>
                      </label>
                    </template>
                    <button 
                      @click="generateFamilyChallan(family)"
                      :disabled="generatingChallan === family.id"
                      class="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
                      style="min-width: 70px;"
                    >
                      <span v-if="generatingChallan === family.id" class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-transparent"></span>
                      <span v-else>Generate</span>
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
    <el-dialog v-model="showPartialModal" width="420px" :close-on-click-modal="false" class="custom-partial-modal">
      <template #header>
        <div class="w-full flex items-center gap-2 px-4 py-3 rounded-t-lg bg-gradient-to-r from-purple-500 to-pink-400">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span class="text-white text-base font-semibold tracking-wide">Partial Fee Payment</span>
        </div>
      </template>
      <div v-if="selectedStudent" class="bg-white rounded-b-lg p-5 flex flex-col gap-3 shadow-md">
        <div class="text-sm text-gray-600 font-medium flex items-center gap-2">
          <span class="text-purple-500 font-bold">Student:</span>
          <span>{{ selectedStudent.name }}</span>
        </div>
        <div class="flex gap-4">
          <div class="flex-1">
            <div class="text-xs text-gray-500 mb-1">Total Due</div>
            <div class="text-lg font-bold text-purple-600 bg-purple-50 rounded px-3 py-1">PKR {{ Math.ceil(Number(selectedStudent.total_fee || 0)) }}</div>
          </div>
          <div class="flex-1">
            <div class="text-xs text-gray-500 mb-1">Carry Forward</div>
            <div class="text-lg font-bold text-pink-600 bg-pink-50 rounded px-3 py-1">PKR {{ Math.ceil(Number(selectedStudent.carry_forward || 0)) }}</div>
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-600 mb-1">Partial Amount</label>
          <el-input-number
            v-model="partialAmount"
            :min="1"
            :max="Math.ceil(Number(selectedStudent.total_fee || 0))"
            class="w-full custom-input-number"
            placeholder="Enter partial amount"
          />
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-600 mb-1">Remarks (optional)</label>
          <el-input
            v-model="partialRemarks"
            type="textarea"
            rows="2"
            placeholder="Remarks (optional)"
            class="w-full custom-input"
          />
        </div>
        <div v-if="partialError" class="text-red-500 text-xs mb-2">{{ partialError }}</div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2 px-4 pb-3">
          <button @click="showPartialModal = false" class="h-9 px-6 rounded-full bg-white text-sm font-bold text-gray-600 border border-gray-200 hover:bg-white transition-all duration-200">Cancel</button>
          <button @click="handlePartialPaymentSubmit" class="h-9 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">Submit</button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useToast } from 'vue-toastification'
import api from '@/utils/axios'
import { ElMessageBox } from 'element-plus'
import dayjs from 'dayjs'

  // Use centralized axios instance
  const toast = useToast()
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
const filteredStudents = computed(() => {
  if (!searchQuery.value) return students.value
  const query = searchQuery.value.toLowerCase()
  return students.value.filter(student =>
    student.name.toLowerCase().includes(query) ||
    student.classSection.toLowerCase().includes(query)
  )
})

const isGenerateEnabled = ref(false)

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
      // Student list endpoint
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
        students.value = (response.data.result.data || []).map(student => ({
          grNo: student.id || student.gr_no,
          name: `${student.first_name} ${student.last_name || ''} / ${student.family_father_name || ''}`,
          classSection: [student.class_name, student.section_name].filter(Boolean).join(' / ') || '—',
          carry_forward: student.prev_amount || 0,
          base_fee: student.monthly_fee || 0,
          total_fee: student.total_amount || 0,
          status: student.status || 'All',
          contactEmail: student.contact_email || '',
          fatherName: student.family_father_name || '',
          motherName: student.family_mother_name || '',
          isSelected: true,
          class_id: student.class_id,
          section_id: student.section_id
        }));
        totalRecords.value = response.data.result.total || 0;
        currentPage.value = response.data.result.current_page || 1;
      } else {
        students.value = [];
        currentPage.value = 1;
        toast.error(response.data.message || 'Failed to fetch students');
      }
    } else if (viewMode.value === 'class') {
      // Class summary endpoint
      const params = {
        session: session.value,
        month: challanMonth.value
      };
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/class-fee-summaries`, { params });
      if (response.data.status && Array.isArray(response.data.result)) {
        classData.value = response.data.result.map(item => ({
          id: item.class_id,
          name: item.class_name,
          section_id: item.section_id,
          section_name: item.section_name || '-',
          studentCount: item.total_students,
          totalFees: item.total_fees,
          paidCount: item.paid_count,
          unpaidCount: item.unpaid_count,
          status: item.status,
          isSelected: false
        }));
        totalRecords.value = classData.value.length;
        currentPage.value = 1;
      } else {
        classData.value = [];
        totalRecords.value = 0;
        currentPage.value = 1;
        toast.error('Failed to fetch class-wise data');
      }
    }
    // ...handle other view modes if needed
  } catch (error) {
    students.value = [];
    classData.value = [];
    currentPage.value = 1;
    toast.error('Failed to fetch data');
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
      const challanRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/students/${student.grNo}/generate-fee-challan`,
        {
          params: {
            template: 'default',
            month: challanMonth.value,
            year: session.value.split('-')[0],
            session: session.value,
            class_id: student.class_id,
            section_id: student.section_id
          },
          responseType: 'blob',
          withCredentials: true
        }
      );
      if (challanRes.data && challanRes.data.type === 'application/pdf') {
        const url = window.URL.createObjectURL(new Blob([challanRes.data], { type: 'application/pdf' }));
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

function handleSort(key) {
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
  { key: 'carry_forward', label: 'Prev Amount' },
  { key: 'base_fee', label: 'Monthly Fee' },
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
    icon: 'UserIcon',
    count: totalStudentCount()
  },
  {
    key: 'class', 
    label: 'Class Wise',
    icon: 'AcademicCapIcon',
    count: totalClassCount()
  },
  {
    key: 'family',
    label: 'Family Wise', 
    icon: 'UsersIcon',
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
  if (!searchQuery.value) return currentData.value
  const query = searchQuery.value.toLowerCase()
  
  switch(viewMode.value) {
    case 'student':
      return students.value.filter(student =>
        student.name.toLowerCase().includes(query) ||
        student.classSection.toLowerCase().includes(query)
      )
    case 'class':
      return classData.value.filter(classItem => {
        const matchesName = classItem.name.toLowerCase().includes(query)
        const matchesClass = !classFilter.value || classItem.id == classFilter.value
        const matchesSection = !classSectionFilter.value || (classItem.section_id && classItem.section_id == classSectionFilter.value)
        return matchesName && matchesClass && matchesSection
      })
    case 'family':
      return familyData.value.filter(family =>
        family.fatherName.toLowerCase().includes(query)
      )
    default:
      return currentData.value
  }
})

const currentTableColumns = computed(() => {
  switch(viewMode.value) {
    case 'student':
      return [
        { key: 'grNo', label: 'GR. No' },
        { key: 'name', label: 'Student / Father Name' },
        { key: 'classSection', label: 'Class/Section' },
        { key: 'carry_forward', label: 'Prev Amount' },
        { key: 'base_fee', label: 'Monthly Fee' },
        { key: 'total_fee', label: 'Total' },
        { key: 'status', label: 'Status' },
        { key: 'action', label: 'Action' },
      ]
    case 'class':
      return [
        { key: 'name', label: 'Class Name' },
        { key: 'section_name', label: 'Section' },
        { key: 'status', label: 'Status' },
        { key: 'action', label: 'Action' },
      ]
    case 'family':
      return [
        { key: 'familyCode', label: 'Family Code' },
        { key: 'fatherName', label: 'Father Name' },
        { key: 'childrenCount', label: 'Children' },
        { key: 'totalBalance', label: 'Previous Balance' },
        { key: 'monthlyFees', label: 'Monthly Fees' },
        { key: 'totalDiscount', label: 'Discount' },
        { key: 'totalLateFee', label: 'Late Fee' },
        { key: 'totalAmount', label: 'Total Amount' },
        { key: 'totalPaid', label: 'Paid Amount' },
        { key: 'remainingAmount', label: 'Remaining' },
        { key: 'status', label: 'Status' },
        { key: 'action', label: 'Action' },
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

// Load class data (now dynamic from API)
async function loadClassData() {
  isLoading.value = true
  try {
    const response = await api.get('/class-fee-summaries')
    if (response.data.status && Array.isArray(response.data.result)) {
      classData.value = response.data.result.map(item => ({
        id: item.class_id,
        name: item.class_name,
        section_id: item.section_id,
        section_name: item.section_name || '-',
        studentCount: item.total_students,
        totalFees: item.total_fees,
        paidCount: item.paid_count,
        unpaidCount: item.unpaid_count,
        status: item.status,
        isSelected: false
      }))
      totalRecords.value = classData.value.length
    } else {
      classData.value = []
      totalRecords.value = 0
      toast.error('Failed to fetch class-wise data')
    }
  } catch (e) {
    classData.value = []
    totalRecords.value = 0
    toast.error('Failed to fetch class-wise data')
  } finally {
    isLoading.value = false
  }
}

// Load family data from API
async function loadFamilyData() {
  isLoading.value = true
  try {
    const params = {}
    if (session.value) params.session = session.value
    if (challanMonth.value) params.month = challanMonth.value
    
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/family-fee-summaries`, { params })
    if (response.data.status && Array.isArray(response.data.result)) {
      familyData.value = response.data.result.map(family => ({
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
      totalRecords.value = familyData.value.length
    } else {
      familyData.value = []
      totalRecords.value = 0
      toast.error('Failed to fetch family-wise data')
    }
  } catch (e) {
    familyData.value = []
    totalRecords.value = 0
    toast.error('Failed to fetch family-wise data')
  } finally {
    isLoading.value = false
  }
}

// Generate challan for class
async function generateClassChallan(classItem) {
  generatingChallan.value = classItem.id;
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/students/classes/${classItem.id}/sections/${classItem.section_id}/generate-fee-challans`,
      {
        template: 'default',
        month: challanMonth.value,
        year: session.value.split('-')[0],
        session: session.value
      }
    );
    if (response.data.status) {
      toast.success('Challans generated for all students in this class/section!');
    } else {
      toast.error('Failed to generate challans for class/section.');
    }
  } catch (error) {
    toast.error('Failed to generate challans for class/section.');
  } finally {
    generatingChallan.value = null;
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

// Computed for all selected
const allSelected = computed({
  get() {
    if (viewMode.value === 'student') {
      return filteredData.value.length > 0 && filteredData.value.every(s => s.isSelected)
    } else if (viewMode.value === 'class') {
      return filteredData.value.length > 0 && filteredData.value.every(c => c.isSelected)
    } else if (viewMode.value === 'family') {
      return filteredData.value.length > 0 && filteredData.value.every(f => f.isSelected)
    }
    return false
  },
  set(val) {
    if (viewMode.value === 'student') {
      filteredData.value.forEach(s => s.isSelected = val)
    } else if (viewMode.value === 'class') {
      filteredData.value.forEach(c => c.isSelected = val)
    } else if (viewMode.value === 'family') {
      filteredData.value.forEach(f => f.isSelected = val)
    }
  }
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
  if (status === 'paid') return 'bg-green-100 text-green-700'
  if (status === 'partial') return 'bg-yellow-100 text-yellow-700'
  return 'bg-red-100 text-red-700'
}

function openPayNow(summary) {
  // Open modal logic here
}

const showPartialModal = ref(false)
const selectedStudent = ref(null)
const partialAmount = ref(0)
const partialRemarks = ref('')
const partialError = ref('')
const isSubmitting = ref(false)

function handlePayPartial(student) {
  selectedStudent.value = student
  partialAmount.value = 0
  partialRemarks.value = ''
  partialError.value = ''
  showPartialModal.value = true
}

const handlePartialPaymentSubmit = async () => {
  if (partialAmount.value <= 0 || partialAmount.value > selectedStudent.value.total_amount) {
    toast.error('Invalid amount. Please enter a value between 1 and ' + selectedStudent.value.total_amount);
    return;
  }

  isSubmitting.value = true;

  try {
    // Per user request, always send the current month for `month_for`.
    const monthForPayload = dayjs().format('YYYY-MM-01');

    // Find the original student object from the students list to get all required fields
    const studentData = students.value.find(s => s.grNo === selectedStudent.value.grNo);
    if (!studentData) {
      toast.error('Could not find student data to process payment.');
      isSubmitting.value = false;
      return;
    }

    const payload = {
      // FeeSummary identifiers
      student_id: studentData.grNo,
      class_id: studentData.class_id,
      month_for: monthForPayload,
      
      // Amounts
      base_fee: studentData.monthly_fee,
      final_amount: studentData.total_amount,
      amount_paid: partialAmount.value,

      // Payment transaction details
      payment_date: dayjs().format('YYYY-MM-DD'),
      payment_mode: 'cash',
      remarks: `Partial payment of ${partialAmount.value} received.`,
      received_by: 1,
    };

    const response = await axios.post('/fee-partial-payment', payload);

    if (response.data.status) {
      toast.success('Partial payment saved successfully!');
      
      // Update the student's data in the local list
      const updatedSummary = response.data.result.fee_summary;
      const studentIndex = students.value.findIndex(s => s.grNo === updatedSummary.student_id);
      if (studentIndex !== -1) {
        students.value[studentIndex].status = updatedSummary.payment_status;
        students.value[studentIndex].carry_forward = updatedSummary.carry_forward;
        // Recalculate total for UI
        students.value[studentIndex].total_fee = updatedSummary.final_amount;
      }
      
      showPartialModal.value = false;
      partialAmount.value = 0;
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
};

function handlePayNow(student) {
  // Implement the logic to handle paying the full amount
  console.log('Pay now logic not implemented yet');
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
</style> 
