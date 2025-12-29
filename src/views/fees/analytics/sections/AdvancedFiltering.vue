<template>
  <div class="advanced-filtering">
    <!-- Header Section -->
    <div class="filtering-header">
      <div class="header-content">
        <h1 class="header-title">Advanced Filtering & Search</h1>
        <p class="header-subtitle">Refine your fee analytics with powerful filtering options and custom search criteria</p>
      </div>
      <div class="header-actions">
        <button class="save-filters-btn" @click="saveFilters">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
          Save Filters
        </button>
        <button class="reset-btn" @click="resetFilters">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Reset
        </button>
      </div>
    </div>

    <!-- Filter Categories -->
    <div class="filter-categories">
      <div class="category-tabs">
        <button 
          v-for="category in filterCategories" 
          :key="category.id"
          @click="activeCategory = category.id"
          :class="['category-tab', { active: activeCategory === category.id }]"
        >
          <component :is="category.icon" class="w-5 h-5" />
          {{ category.name }}
        </button>
      </div>
    </div>

    <!-- Filter Content -->
    <div class="filter-content">
      <!-- Basic Filters -->
      <div v-if="activeCategory === 'basic'" class="filter-section">
        <div class="filter-grid">
          <div class="filter-group">
            <label class="filter-label">Academic Session</label>
            <select v-model="filters.session" class="filter-select">
              <option value="">All Sessions</option>
              <option v-for="session in sessions" :key="session" :value="session">{{ session }}</option>
            </select>
          </div>

          <div class="filter-group">
            <label class="filter-label">Class</label>
            <select v-model="filters.class" class="filter-select">
              <option value="">All Classes</option>
              <option v-for="cls in classes" :key="cls.id" :value="cls.id">{{ cls.name }}</option>
            </select>
          </div>

          <div class="filter-group">
            <label class="filter-label">Section</label>
            <select v-model="filters.section" class="filter-select">
              <option value="">All Sections</option>
              <option v-for="section in sections" :key="section.id" :value="section.id">{{ section.name }}</option>
            </select>
          </div>

          <div class="filter-group">
            <label class="filter-label">Payment Status</label>
            <div class="checkbox-group">
              <label v-for="status in paymentStatuses" :key="status.value" class="checkbox-item">
                <input 
                  type="checkbox" 
                  :value="status.value" 
                  v-model="filters.paymentStatus"
                  class="checkbox-input"
                />
                <span class="checkbox-label">{{ status.label }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Date & Time Filters -->
      <div v-if="activeCategory === 'date'" class="filter-section">
        <div class="filter-grid">
          <div class="filter-group">
            <label class="filter-label">Date Range</label>
            <CompactDatePicker
              :model-value="dateRangeValue"
              placeholder=""
              @change="handleDateRangeChange"
            />
          </div>

          <div class="filter-group">
            <label class="filter-label">Quick Date Presets</label>
            <div class="preset-buttons">
              <button 
                v-for="preset in datePresets" 
                :key="preset.value"
                @click="applyDatePreset(preset.value)"
                class="preset-btn"
              >
                {{ preset.label }}
              </button>
            </div>
          </div>

          <div class="filter-group">
            <label class="filter-label">Month/Year</label>
            <div class="month-year-selector">
              <select v-model="filters.month" class="month-select">
                <option value="">All Months</option>
                <option v-for="month in months" :key="month.value" :value="month.value">{{ month.label }}</option>
              </select>
              <select v-model="filters.year" class="year-select">
                <option value="">All Years</option>
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Amount Filters -->
      <div v-if="activeCategory === 'amount'" class="filter-section">
        <div class="filter-grid">
          <div class="filter-group">
            <label class="filter-label">Amount Range</label>
            <div class="amount-range">
              <input 
                type="number" 
                v-model="filters.minAmount" 
                class="amount-input"
                placeholder="Min Amount"
              />
              <span class="amount-separator">to</span>
              <input 
                type="number" 
                v-model="filters.maxAmount" 
                class="amount-input"
                placeholder="Max Amount"
              />
            </div>
          </div>

          <div class="filter-group">
            <label class="filter-label">Payment Method</label>
            <div class="checkbox-group">
              <label v-for="method in paymentMethods" :key="method.value" class="checkbox-item">
                <input 
                  type="checkbox" 
                  :value="method.value" 
                  v-model="filters.paymentMethods"
                  class="checkbox-input"
                />
                <span class="checkbox-label">{{ method.label }}</span>
              </label>
            </div>
          </div>

          <div class="filter-group">
            <label class="filter-label">Fee Type</label>
            <div class="checkbox-group">
              <label v-for="type in feeTypes" :key="type.value" class="checkbox-item">
                <input 
                  type="checkbox" 
                  :value="type.value" 
                  v-model="filters.feeTypes"
                  class="checkbox-input"
                />
                <span class="checkbox-label">{{ type.label }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Student Filters -->
      <div v-if="activeCategory === 'student'" class="filter-section">
        <div class="filter-grid">
          <div class="filter-group">
            <label class="filter-label">Student Search</label>
            <input 
              type="text" 
              v-model="filters.studentSearch" 
              class="search-input"
              placeholder="Search by name, GR number, or father's name"
            />
          </div>

          <div class="filter-group">
            <label class="filter-label">Family Code</label>
            <input 
              type="text" 
              v-model="filters.familyCode" 
              class="search-input"
              placeholder="Enter family code"
            />
          </div>

          <div class="filter-group">
            <label class="filter-label">Student Status</label>
            <div class="checkbox-group">
              <label v-for="status in studentStatuses" :key="status.value" class="checkbox-item">
                <input 
                  type="checkbox" 
                  :value="status.value" 
                  v-model="filters.studentStatus"
                  class="checkbox-input"
                />
                <span class="checkbox-label">{{ status.label }}</span>
              </label>
            </div>
          </div>

          <div class="filter-group">
            <label class="filter-label">Admission Year</label>
            <select v-model="filters.admissionYear" class="filter-select">
              <option value="">All Years</option>
              <option v-for="year in admissionYears" :key="year" :value="year">{{ year }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Advanced Filters -->
      <div v-if="activeCategory === 'advanced'" class="filter-section">
        <div class="filter-grid">
          <div class="filter-group">
            <label class="filter-label">Late Fee Applied</label>
            <div class="radio-group">
              <label v-for="option in lateFeeOptions" :key="option.value" class="radio-item">
                <input 
                  type="radio" 
                  :value="option.value" 
                  v-model="filters.lateFeeApplied"
                  class="radio-input"
                />
                <span class="radio-label">{{ option.label }}</span>
              </label>
            </div>
          </div>

          <div class="filter-group">
            <label class="filter-label">Discount Applied</label>
            <div class="radio-group">
              <label v-for="option in discountOptions" :key="option.value" class="radio-item">
                <input 
                  type="radio" 
                  :value="option.value" 
                  v-model="filters.discountApplied"
                  class="radio-input"
                />
                <span class="radio-label">{{ option.label }}</span>
              </label>
            </div>
          </div>

          <div class="filter-group">
            <label class="filter-label">Payment Frequency</label>
            <select v-model="filters.paymentFrequency" class="filter-select">
              <option value="">All Frequencies</option>
              <option v-for="freq in paymentFrequencies" :key="freq.value" :value="freq.value">{{ freq.label }}</option>
            </select>
          </div>

          <div class="filter-group">
            <label class="filter-label">Receipt Number</label>
            <input 
              type="text" 
              v-model="filters.receiptNumber" 
              class="search-input"
              placeholder="Enter receipt number"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Applied Filters Summary -->
    <div class="applied-filters">
      <h3 class="summary-title">Applied Filters</h3>
      <div class="filter-tags">
        <div v-for="(filter, key) in appliedFilters" :key="key" class="filter-tag">
          <span class="tag-label">{{ filter.label }}:</span>
          <span class="tag-value">{{ filter.value }}</span>
          <button @click="removeFilter(key)" class="remove-tag">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div v-if="Object.keys(appliedFilters).length === 0" class="no-filters">
          No filters applied
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <button @click="applyFilters" class="apply-btn">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"/>
        </svg>
        Apply Filters
      </button>
      <button @click="exportFilteredData" class="export-btn">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        Export Results
      </button>
    </div>

    <!-- Results Summary -->
    <div class="results-summary">
      <div class="summary-card">
        <div class="summary-icon bg-blue-100">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <div class="summary-content">
          <h4 class="summary-value">{{ filteredResults.totalRecords }}</h4>
          <p class="summary-label">Total Records</p>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon bg-green-100">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
          </svg>
        </div>
        <div class="summary-content">
          <h4 class="summary-value">{{ formatCurrency(filteredResults.totalAmount) }}</h4>
          <p class="summary-label">Total Amount</p>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon bg-purple-100">
          <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </div>
        <div class="summary-content">
          <h4 class="summary-value">{{ filteredResults.uniqueStudents }}</h4>
          <p class="summary-label">Unique Students</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import CompactDatePicker from '@/components/CompactDatePicker.vue'

// Reactive data
const toast = useToast()
const activeCategory = ref('basic')

const filters = ref({
  session: '',
  class: '',
  section: '',
  paymentStatus: [],
  startDate: '',
  endDate: '',
  month: '',
  year: '',
  minAmount: '',
  maxAmount: '',
  paymentMethods: [],
  feeTypes: [],
  studentSearch: '',
  familyCode: '',
  studentStatus: [],
  admissionYear: '',
  lateFeeApplied: '',
  discountApplied: '',
  paymentFrequency: '',
  receiptNumber: ''
})

// Sample data
const sessions = ['2022-2023', '2023-2024', '2024-2025']
const classes = [
  { id: 1, name: 'Class 1' },
  { id: 2, name: 'Class 2' },
  { id: 3, name: 'Class 3' },
  { id: 4, name: 'Class 4' },
  { id: 5, name: 'Class 5' }
]
const sections = [
  { id: 1, name: 'Section A' },
  { id: 2, name: 'Section B' },
  { id: 3, name: 'Section C' }
]

const paymentStatuses = [
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'partial', label: 'Partial' },
  { value: 'overdue', label: 'Overdue' }
]

const datePresets = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last7days', label: 'Last 7 Days' },
  { value: 'last30days', label: 'Last 30 Days' },
  { value: 'thisMonth', label: 'This Month' },
  { value: 'lastMonth', label: 'Last Month' },
  { value: 'thisYear', label: 'This Year' }
]

const months = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' }
]

const years = [2020, 2021, 2022, 2023, 2024, 2025]

const paymentMethods = [
  { value: 'cash', label: 'Cash' },
  { value: 'cheque', label: 'Cheque' },
  { value: 'online', label: 'Online' },
  { value: 'bank_transfer', label: 'Bank Transfer' }
]

const feeTypes = [
  { value: 'tuition', label: 'Tuition Fee' },
  { value: 'library', label: 'Library Fee' },
  { value: 'lab', label: 'Lab Fee' },
  { value: 'hostel', label: 'Hostel Fee' },
  { value: 'transport', label: 'Transport Fee' }
]

const studentStatuses = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'graduated', label: 'Graduated' },
  { value: 'transferred', label: 'Transferred' }
]

const admissionYears = [2020, 2021, 2022, 2023, 2024]

const lateFeeOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'all', label: 'All' }
]

const discountOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'all', label: 'All' }
]

const paymentFrequencies = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annually', label: 'Annually' },
  { value: 'one_time', label: 'One Time' }
]

const filterCategories = [
  { id: 'basic', name: 'Basic Filters', icon: 'FilterIcon' },
  { id: 'date', name: 'Date & Time', icon: 'CalendarIcon' },
  { id: 'amount', name: 'Amount & Payment', icon: 'CurrencyIcon' },
  { id: 'student', name: 'Student Info', icon: 'UserIcon' },
  { id: 'advanced', name: 'Advanced', icon: 'CogIcon' }
]

const filteredResults = ref({
  totalRecords: 1250,
  totalAmount: 2500000,
  uniqueStudents: 850
})

// Computed properties
const appliedFilters = computed(() => {
  const applied = {}
  
  if (filters.value.session) {
    applied.session = { label: 'Session', value: filters.value.session }
  }
  if (filters.value.class) {
    const classObj = classes.find(c => c.id == filters.value.class)
    applied.class = { label: 'Class', value: classObj?.name || filters.value.class }
  }
  if (filters.value.section) {
    const sectionObj = sections.find(s => s.id == filters.value.section)
    applied.section = { label: 'Section', value: sectionObj?.name || filters.value.section }
  }
  if (filters.value.paymentStatus.length > 0) {
    applied.paymentStatus = { label: 'Payment Status', value: filters.value.paymentStatus.join(', ') }
  }
  if (filters.value.startDate && filters.value.endDate) {
    applied.dateRange = { label: 'Date Range', value: `${filters.value.startDate} to ${filters.value.endDate}` }
  }
  if (filters.value.minAmount || filters.value.maxAmount) {
    applied.amountRange = { label: 'Amount Range', value: `${filters.value.minAmount || 0} - ${filters.value.maxAmount || '∞'}` }
  }
  if (filters.value.studentSearch) {
    applied.studentSearch = { label: 'Student Search', value: filters.value.studentSearch }
  }
  
  return applied
})

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

const applyDatePreset = (preset) => {
  const today = new Date()
  
  switch (preset) {
    case 'today':
      filters.value.startDate = today.toISOString().split('T')[0]
      filters.value.endDate = today.toISOString().split('T')[0]
      break
    case 'yesterday':
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      filters.value.startDate = yesterday.toISOString().split('T')[0]
      filters.value.endDate = yesterday.toISOString().split('T')[0]
      break
    case 'last7days':
      const last7Days = new Date(today)
      last7Days.setDate(last7Days.getDate() - 7)
      filters.value.startDate = last7Days.toISOString().split('T')[0]
      filters.value.endDate = today.toISOString().split('T')[0]
      break
    case 'last30days':
      const last30Days = new Date(today)
      last30Days.setDate(last30Days.getDate() - 30)
      filters.value.startDate = last30Days.toISOString().split('T')[0]
      filters.value.endDate = today.toISOString().split('T')[0]
      break
    case 'thisMonth':
      filters.value.startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0]
      filters.value.endDate = today.toISOString().split('T')[0]
      break
    case 'lastMonth':
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      filters.value.startDate = lastMonth.toISOString().split('T')[0]
      filters.value.endDate = new Date(today.getFullYear(), today.getMonth(), 0).toISOString().split('T')[0]
      break
    case 'thisYear':
      filters.value.startDate = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0]
      filters.value.endDate = today.toISOString().split('T')[0]
      break
  }
}

const applyFilters = () => {
  // Implement filter application logic
  console.log('Applying filters:', filters.value)
  
  // Simulate API call and update results
  setTimeout(() => {
    filteredResults.value = {
      totalRecords: Math.floor(Math.random() * 2000) + 500,
      totalAmount: Math.floor(Math.random() * 5000000) + 1000000,
      uniqueStudents: Math.floor(Math.random() * 1000) + 500
    }
  }, 1000)
}

const resetFilters = () => {
  filters.value = {
    session: '',
    class: '',
    section: '',
    paymentStatus: [],
    startDate: '',
    endDate: '',
    month: '',
    year: '',
    minAmount: '',
    maxAmount: '',
    paymentMethods: [],
    feeTypes: [],
    studentSearch: '',
    familyCode: '',
    studentStatus: [],
    admissionYear: '',
    lateFeeApplied: '',
    discountApplied: '',
    paymentFrequency: '',
    receiptNumber: ''
  }
}

const saveFilters = () => {
  // Implement save filters logic
  console.log('Saving filters:', filters.value)
}

const removeFilter = (key) => {
  // Remove specific filter
  if (key === 'session') filters.value.session = ''
  else if (key === 'class') filters.value.class = ''
  else if (key === 'section') filters.value.section = ''
  else if (key === 'paymentStatus') filters.value.paymentStatus = []
  else if (key === 'dateRange') {
    filters.value.startDate = ''
    filters.value.endDate = ''
  }
  else if (key === 'amountRange') {
    filters.value.minAmount = ''
    filters.value.maxAmount = ''
  }
  else if (key === 'studentSearch') filters.value.studentSearch = ''
}

const exportFilteredData = () => {
  // Implement export logic
  console.log('Exporting filtered data')
}

// Watch for filter changes
watch(filters, () => {
  // Auto-apply filters or show preview
  console.log('Filters changed:', filters.value)
}, { deep: true })
</script>

<style scoped>
.advanced-filtering {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.filtering-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.header-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.header-subtitle {
  color: #64748b;
  margin: 0.5rem 0 0 0;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.save-filters-btn, .reset-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.save-filters-btn {
  background: linear-gradient(135deg, #10b981, #059669);
  color: #ffffff;
}

.save-filters-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
}

.reset-btn {
  background: #f1f5f9;
  color: #64748b;
}

.reset-btn:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.filter-categories {
  margin-bottom: 2rem;
}

.category-tabs {
  display: flex;
  gap: 0.5rem;
  background: #ffffff;
  padding: 0.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.category-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  background: transparent;
  color: #64748b;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-tab.active {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #ffffff;
}

.category-tab:hover:not(.active) {
  background: #f1f5f9;
  color: #1e293b;
}

.filter-content {
  background: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.filter-section {
  animation: fadeIn 0.3s ease-in-out;
}

.filter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-label {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.875rem;
}

.filter-select, .search-input, .date-input, .amount-input {
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background: #ffffff;
  color: #1e293b;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
}

.filter-select:focus, .search-input:focus, .date-input:focus, .amount-input:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.date-range, .amount-range {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.date-separator, .amount-separator {
  color: #64748b;
  font-size: 0.875rem;
}

.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.preset-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background: #ffffff;
  color: #1e293b;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.preset-btn:hover {
  background: #f8fafc;
  border-color: #8b5cf6;
  color: #8b5cf6;
}

.month-year-selector {
  display: flex;
  gap: 0.5rem;
}

.month-select, .year-select {
  flex: 1;
}

.checkbox-group, .radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.checkbox-item, .radio-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-input, .radio-input {
  width: 1rem;
  height: 1rem;
  accent-color: #8b5cf6;
}

.checkbox-label, .radio-label {
  font-size: 0.875rem;
  color: #1e293b;
}

.applied-filters {
  background: #ffffff;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.summary-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 1rem 0;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.filter-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #f1f5f9;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.tag-label {
  font-weight: 600;
  color: #1e293b;
}

.tag-value {
  color: #8b5cf6;
}

.remove-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border: none;
  background: #e2e8f0;
  border-radius: 50%;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.remove-tag:hover {
  background: #ef4444;
  color: #ffffff;
}

.no-filters {
  color: #94a3b8;
  font-style: italic;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.apply-btn, .export-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.apply-btn {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #ffffff;
}

.apply-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
}

.export-btn {
  background: #f1f5f9;
  color: #1e293b;
}

.export-btn:hover {
  background: #e2e8f0;
  transform: translateY(-2px);
}

.results-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
}

.summary-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.summary-content {
  flex: 1;
}

.summary-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.summary-label {
  color: #64748b;
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .advanced-filtering {
    padding: 1rem;
  }
  
  .filtering-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .header-actions {
    width: 100%;
    justify-content: center;
  }
  
  .category-tabs {
    flex-wrap: wrap;
  }
  
  .filter-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .results-summary {
    grid-template-columns: 1fr;
  }
}
</style> 