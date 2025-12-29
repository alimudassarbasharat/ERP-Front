<template>
  <div class="relative custom-date-picker-wrapper">
    <!-- Input Trigger -->
    <div 
      class="custom-date-input"
      :class="{ 
        'is-open': isOpen,
        'has-value': formattedDate,
        'is-disabled': disabled
      }"
    >
      <div class="flex items-center gap-1.5 flex-1 min-w-0">
        <IconCalendar 
          :size="14" 
          class="text-indigo-600 flex-shrink-0 transition-colors"
          :class="{ 'text-indigo-500': isOpen }"
          stroke-width="2" 
        />
        <input
          :value="formattedDate"
          :placeholder="placeholder"
          class="date-input-field"
          @click.stop="togglePicker"
          @focus="showCustomInput = true"
          @blur="handleInputBlur"
          @input="handleCustomDateInput"
          :disabled="disabled"
        />
      </div>
      <div class="flex items-center gap-1 flex-shrink-0">
        <button
          v-if="formattedDate && clearable && !disabled"
          @click.stop="clearDate"
          class="clear-btn"
          type="button"
        >
          <IconX :size="12" class="text-gray-400 hover:text-gray-600" stroke-width="2" />
        </button>
        <button
          @click.stop="togglePicker"
          class="calendar-btn"
          type="button"
          :disabled="disabled"
        >
          <IconChevronDown 
            :size="12" 
            class="chevron-icon"
            :class="{ 'rotate-180': isOpen }"
            stroke-width="2"
          />
        </button>
      </div>
    </div>
    
    <!-- Date Picker Dropdown -->
    <Teleport to="body">
      <Transition name="datepicker-fade">
        <div 
          v-if="isOpen" 
          v-click-outside="closePicker"
          class="datepicker-dropdown"
          :style="dropdownStyle"
        >
          <!-- Shortcuts Panel -->
          <div v-if="shortcuts && dateShortcuts.length > 0" class="shortcuts-panel">
            <div class="shortcuts-header">
              <IconClock :size="12" class="text-indigo-600" stroke-width="2" />
              <span class="shortcuts-title">Quick Select</span>
            </div>
            <div class="shortcuts-list">
              <button
                v-for="(shortcut, index) in dateShortcuts"
                :key="index"
                @click="selectShortcut(shortcut)"
                class="shortcut-item"
                type="button"
              >
                <span class="shortcut-text">{{ shortcut.text }}</span>
                <IconChevronRight :size="10" class="text-gray-400" stroke-width="2" />
              </button>
            </div>
          </div>
          
          <!-- Custom Date Range Input -->
          <div v-if="showCustomDateRange" class="custom-date-range-section">
            <div class="custom-date-header">
              <button
                @click="showCustomDateRange = false"
                class="back-to-shortcuts-btn"
                type="button"
              >
                <IconChevronRight :size="14" class="rotate-180" stroke-width="2" />
                <span class="custom-date-label">Custom Date Range</span>
              </button>
            </div>
            <div class="custom-date-range-wrapper">
              <div class="custom-date-field">
                <label class="custom-date-field-label">Start Date</label>
                <input
                  v-model="customStartDate"
                  type="date"
                  class="custom-date-text-input"
                  @change="updateCustomDateRange"
                />
              </div>
              <div class="custom-date-field">
                <label class="custom-date-field-label">End Date</label>
                <input
                  v-model="customEndDate"
                  type="date"
                  class="custom-date-text-input"
                  @change="updateCustomDateRange"
                />
              </div>
              <div class="custom-date-actions">
                <button
                  @click="showCustomDateRange = false"
                  class="cancel-custom-btn"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  @click="applyCustomDateRange"
                  class="apply-custom-btn"
                  type="button"
                >
                  <IconCheck :size="12" stroke-width="2" />
                  Apply
                </button>
              </div>
            </div>
          </div>

          <!-- Calendar Panel -->
          <div class="calendar-panel">
            <vue-datepicker-next
              v-model="selectedDate"
              :type="pickerType"
              :range="range"
              :format="dateFormat"
              :placeholder="placeholder"
              :editable="false"
              :clearable="false"
              :confirm="false"
              :first-day-of-week="1"
              :popover-append-to-body="false"
              :min-date="minDateComputed"
              :max-date="maxDateComputed"
              inline
              @update:model-value="handleDateChange"
            />
          </div>

          <!-- Action Buttons -->
          <div class="picker-actions">
            <button
              @click="closePicker"
              class="action-btn cancel-btn"
              type="button"
            >
              Cancel
            </button>
            <button
              @click="confirmSelection"
              class="action-btn confirm-btn"
              type="button"
            >
              <IconCheck :size="12" stroke-width="2" />
              Confirm
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { IconCalendar, IconChevronDown, IconX, IconCheck, IconClock, IconChevronRight } from '@tabler/icons-vue'
import VueDatepickerNext from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'

/**
 * CompactDatePicker Component
 * Perfect, modern date picker for entire project
 */
const props = defineProps({
  modelValue: {
    type: [String, Date, Array],
    default: null
  },
  placeholder: {
    type: String,
    default: ''
  },
  shortcuts: {
    type: Boolean,
    default: true
  },
  range: {
    type: Boolean,
    default: false // Single date picker by default - no end date field
  },
  pickerType: {
    type: String,
    default: 'date',
    validator: (value) => ['date', 'month', 'year', 'datetime', 'time'].includes(value)
  },
  changeMonth: {
    type: Boolean,
    default: false
  },
  changeYear: {
    type: Boolean,
    default: false
  },
  yearRange: {
    type: String,
    default: null
  },
  minDate: {
    type: [String, Date],
    default: null
  },
  maxDate: {
    type: [String, Date],
    default: null
  },
  dateFormat: {
    type: String,
    default: 'YYYY-MM-DD'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const selectedDate = ref(props.modelValue)
const tempSelectedDate = ref(props.modelValue)
const dropdownStyle = ref({})
const customDateInput = ref('')
const showCustomInput = ref(false)
const showCustomDateRange = ref(false)
const customStartDate = ref('')
const customEndDate = ref('')
let clickOutsideHandler = null
let inputElement = null

// Size classes
const sizeClasses = computed(() => {
  const sizes = {
    sm: 'h-8 px-2.5 text-xs',
    md: 'h-10 px-3 text-sm',
    lg: 'h-12 px-4 text-base'
  }
  return sizes[props.size]
})

// Compute min/max dates
const minDateComputed = computed(() => {
  if (props.minDate) {
    return typeof props.minDate === 'string' ? new Date(props.minDate) : props.minDate
  }
  if (props.yearRange) {
    const match = props.yearRange.match(/(-?\d+):(-?\d+)/)
    if (match) {
      const currentYear = new Date().getFullYear()
      const yearsBack = parseInt(match[1])
      const minYear = currentYear + yearsBack
      return new Date(minYear, 0, 1)
    }
  }
  return null
})

const maxDateComputed = computed(() => {
  if (props.maxDate) {
    return typeof props.maxDate === 'string' ? new Date(props.maxDate) : props.maxDate
  }
  if (props.yearRange) {
    const match = props.yearRange.match(/(-?\d+):(-?\d+)/)
    if (match) {
      const currentYear = new Date().getFullYear()
      const yearsForward = parseInt(match[2])
      const maxYear = currentYear + yearsForward
      return new Date(maxYear, 11, 31)
    }
  }
  return null
})

// Date shortcuts
const dateShortcuts = computed(() => {
  if (!props.shortcuts) return []
  
  const today = new Date()
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  
  // Helper function to format date with time
  const formatDate = (date, includeTime = false, isStart = true) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    
    if (includeTime) {
      if (isStart) {
        // Start date: 00:00:00
        return `${year}-${month}-${day} 00:00:00`
      } else {
        // End date: 23:59:59
        return `${year}-${month}-${day} 23:59:59`
      }
    }
    return `${year}-${month}-${day}`
  }
  
  // Helper function to format date only (for single date)
  const formatDateOnly = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  
  const getStartOfWeek = (date) => {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(d.setDate(diff))
  }
  
  const getEndOfWeek = (date) => {
    const start = getStartOfWeek(date)
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    return end
  }
  
  const getStartOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1)
  const getEndOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0)
  
  const lastWeekStart = new Date(getStartOfWeek(today))
  lastWeekStart.setDate(lastWeekStart.getDate() - 7)
  const lastWeekEnd = new Date(lastWeekStart)
  lastWeekEnd.setDate(lastWeekStart.getDate() + 6)
  
  const currentWeekStart = getStartOfWeek(today)
  const currentWeekEnd = getEndOfWeek(today)
  
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
  const lastMonthStart = getStartOfMonth(lastMonth)
  const lastMonthEnd = getEndOfMonth(lastMonth)
  
  const thisMonthStart = getStartOfMonth(today)
  const thisMonthEnd = getEndOfMonth(today)
  
  const last7Days = new Date(today)
  last7Days.setDate(today.getDate() - 6)
  
  const last30Days = new Date(today)
  last30Days.setDate(today.getDate() - 29)
  
  return [
    { 
      text: 'Today', 
      value: () => {
        // Always return range: Start with 00:00:00, End with 23:59:59
        return [formatDate(startOfToday, true, true), formatDate(startOfToday, true, false)]
      },
      isRange: true
    },
    { 
      text: 'Yesterday', 
      value: () => {
        const yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)
        // Always return range: Start with 00:00:00, End with 23:59:59
        return [formatDate(yesterday, true, true), formatDate(yesterday, true, false)]
      },
      isRange: true
    },
    { 
      text: 'Last 7 Days', 
      value: () => {
        // Always return range: Start with 00:00:00, End with 23:59:59
        return [formatDate(last7Days, true, true), formatDate(today, true, false)]
      },
      isRange: true
    },
    { 
      text: 'Last 30 Days', 
      value: () => {
        // Always return range: Start with 00:00:00, End with 23:59:59
        return [formatDate(last30Days, true, true), formatDate(today, true, false)]
      },
      isRange: true
    },
    { 
      text: 'This Week', 
      value: () => {
        // Always return range: Start with 00:00:00, End with 23:59:59
        return [formatDate(currentWeekStart, true, true), formatDate(currentWeekEnd, true, false)]
      },
      isRange: true
    },
    { 
      text: 'Last Week', 
      value: () => {
        // Always return range: Start with 00:00:00, End with 23:59:59
        return [formatDate(lastWeekStart, true, true), formatDate(lastWeekEnd, true, false)]
      },
      isRange: true
    },
    { 
      text: 'This Month', 
      value: () => {
        // Always return range: Start with 00:00:00, End with 23:59:59
        return [formatDate(thisMonthStart, true, true), formatDate(thisMonthEnd, true, false)]
      },
      isRange: true
    },
    { 
      text: 'Last Month', 
      value: () => {
        // Always return range: Start with 00:00:00, End with 23:59:59
        return [formatDate(lastMonthStart, true, true), formatDate(lastMonthEnd, true, false)]
      },
      isRange: true
    },
    { 
      text: 'Custom Date', 
      value: () => {
        // Return null to trigger custom date input
        return null
      },
      isCustom: true // Flag to indicate this is custom date option
    }
  ]
})

// Format date
const formatDateByFormat = (date, format) => {
  if (!date || isNaN(date.getTime())) return ''
  
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  const shortYear = String(year).slice(-2)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthName = monthNames[d.getMonth()]
  
  let formatted = format
    .replace(/mm/g, month)
    .replace(/dd/g, day)
    .replace(/yy/g, shortYear)
    .replace(/yyyy/g, year)
    .replace(/MM/g, monthName)
    .replace(/DD/g, ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()])
  
  if (format === 'YYYY-MM-DD') {
    return `${year}-${month}-${day}`
  }
  
  return formatted
}

const formattedDate = computed(() => {
  if (!props.modelValue) return ''
  try {
    // Handle array (range) - show both start date and end date
    if (Array.isArray(props.modelValue) && props.modelValue.length === 2) {
      // Extract date part from string (remove time if present)
      let startDateStr = props.modelValue[0]
      let endDateStr = props.modelValue[1]
      
      // Remove time from strings if present
      if (typeof startDateStr === 'string' && startDateStr.includes(' ')) {
        startDateStr = startDateStr.split(' ')[0]
      }
      if (typeof endDateStr === 'string' && endDateStr.includes(' ')) {
        endDateStr = endDateStr.split(' ')[0]
      }
      
      // Parse dates
      const start = new Date(startDateStr)
      const end = new Date(endDateStr)
      if (isNaN(start.getTime()) || isNaN(end.getTime())) return ''
      
      // Format dates
      const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate())
      const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate())
      
      let startFormatted, endFormatted
      
      if (props.pickerType === 'month') {
        startFormatted = formatDateByFormat(startDate, 'mm/yy')
        endFormatted = formatDateByFormat(endDate, 'mm/yy')
      } else if (props.pickerType === 'year') {
        startFormatted = formatDateByFormat(startDate, 'yy')
        endFormatted = formatDateByFormat(endDate, 'yy')
      } else {
        const format = props.dateFormat === 'YYYY-MM-DD' ? 'mm/dd/yy' : props.dateFormat
        startFormatted = formatDateByFormat(startDate, format)
        endFormatted = formatDateByFormat(endDate, format)
      }
      
      // Return both dates with separator
      return `${startFormatted} - ${endFormatted}`
    }
    
    const date = new Date(props.modelValue)
    if (isNaN(date.getTime())) return ''
    
    if (props.pickerType === 'month') {
      return formatDateByFormat(date, 'mm/yy')
    } else if (props.pickerType === 'year') {
      return formatDateByFormat(date, 'yy')
    } else {
      return formatDateByFormat(date, props.dateFormat === 'YYYY-MM-DD' ? 'mm/dd/yy' : props.dateFormat)
    }
  } catch (e) {
    return ''
  }
})

const togglePicker = async () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  
  if (isOpen.value) {
    await nextTick()
    updateDropdownPosition()
    tempSelectedDate.value = props.modelValue
  }
}

const updateDropdownPosition = () => {
  if (!inputElement) {
    inputElement = document.querySelector('.custom-date-input')
  }
  if (inputElement) {
    const rect = inputElement.getBoundingClientRect()
    dropdownStyle.value = {
      top: `${rect.bottom + 8}px`,
      left: `${rect.left}px`,
      width: `${Math.max(rect.width, 280)}px`
    }
  }
}

const closePicker = () => {
  isOpen.value = false
  selectedDate.value = props.modelValue
  tempSelectedDate.value = props.modelValue
  // Reset custom date range when closing
  showCustomDateRange.value = false
  customStartDate.value = ''
  customEndDate.value = ''
}

const clearDate = (e) => {
  e.stopPropagation()
  emit('update:modelValue', null)
  emit('change', null)
  selectedDate.value = null
  tempSelectedDate.value = null
}

const selectShortcut = (shortcut) => {
  // If custom date option, show custom date range fields
  if (shortcut.isCustom) {
    showCustomDateRange.value = true
    // Set default dates to today
    const today = new Date().toISOString().split('T')[0]
    customStartDate.value = today
    customEndDate.value = today
    // Scroll to custom date range section
    nextTick(() => {
      const customSection = document.querySelector('.custom-date-range-section')
      if (customSection) {
        customSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    })
    return
  }
  
  let value = shortcut.value()
  
  // If shortcut has isRange flag (like Today), always treat as range
  if (shortcut.isRange && Array.isArray(value)) {
    // Emit as range even if range prop is false
    const formatted = value.map((d, index) => {
      if (typeof d === 'string') {
        if (d.includes(' ') && d.includes(':')) return d
        if (index === 0) {
          return `${d} 00:00:00`
        } else {
          return `${d} 23:59:59`
        }
      }
      const dateStr = d.toISOString().split('T')[0]
      if (index === 0) {
        return `${dateStr} 00:00:00`
      } else {
        return `${dateStr} 23:59:59`
      }
    })
    emit('update:modelValue', formatted)
    emit('change', formatted)
    closePicker()
    return
  }
  
  // If range is false and shortcut returns array, use only the end date (or start date)
  if (!props.range && Array.isArray(value)) {
    // For single date picker, use the end date (most recent date)
    value = value[1] || value[0]
  }
  
  tempSelectedDate.value = value
  selectedDate.value = value
  handleDateChange(value)
}

const confirmSelection = () => {
  handleDateChange(tempSelectedDate.value || selectedDate.value)
}

const handleCustomDateInput = (event) => {
  customDateInput.value = event.target.value
}

const handleInputBlur = () => {
  // Don't close if clicking inside dropdown
  setTimeout(() => {
    if (!isOpen.value) {
      showCustomInput.value = false
    }
  }, 200)
}

const updateCustomDateRange = () => {
  // Auto-update when dates change (optional - can remove if not needed)
  // Currently just validates, doesn't auto-apply
}

const applyCustomDateRange = () => {
  if (!customStartDate.value || !customEndDate.value) {
    alert('Please select both start and end dates')
    return
  }
  
  // Validate that end date is after start date
  const start = new Date(customStartDate.value)
  const end = new Date(customEndDate.value)
  
  if (end < start) {
    alert('End date must be after start date')
    return
  }
  
  // Format dates with time stamps
  const startDateStr = `${customStartDate.value} 00:00:00`
  const endDateStr = `${customEndDate.value} 23:59:59`
  
  // Emit as range
  emit('update:modelValue', [startDateStr, endDateStr])
  emit('change', [startDateStr, endDateStr])
  
  // Close picker (will reset custom date range in closePicker)
  closePicker()
}

const handleDateChange = (date) => {
  if (date) {
    if (Array.isArray(date)) {
      // Date range selected
      if (date.length === 2 && date[0] && date[1]) {
        const formatted = date.map((d, index) => {
          if (typeof d === 'string') {
            // If already has time (00:00:00 or 23:59:59), return as is
            if (d.includes(' ') && d.includes(':')) return d
            // Add time based on position
            if (index === 0) {
              // Start date: 00:00:00
              return `${d} 00:00:00`
            } else {
              // End date: 23:59:59
              return `${d} 23:59:59`
            }
          }
          // If Date object, format with time
          const dateStr = d.toISOString().split('T')[0]
          if (index === 0) {
            return `${dateStr} 00:00:00`
          } else {
            return `${dateStr} 23:59:59`
          }
        })
        emit('update:modelValue', formatted)
        emit('change', formatted)
        closePicker()
      }
    } else {
      // Single date selected - always set start date and end date to same date with times
      let dateStr = typeof date === 'string' ? date : date.toISOString().split('T')[0]
      // Remove time if present, get only date part
      if (dateStr.includes(' ')) {
        dateStr = dateStr.split(' ')[0]
      } else if (dateStr.includes('T')) {
        dateStr = dateStr.split('T')[0]
      }
      
      // Set start date with 00:00:00 and end date with 23:59:59
      const startDateStr = `${dateStr} 00:00:00`
      const endDateStr = `${dateStr} 23:59:59`
      
      // Emit as array to match range format
      emit('update:modelValue', [startDateStr, endDateStr])
      emit('change', [startDateStr, endDateStr])
      closePicker()
    }
  } else {
    emit('update:modelValue', null)
    emit('change', null)
    closePicker()
  }
}

watch(() => props.modelValue, (newVal) => {
  selectedDate.value = newVal
  tempSelectedDate.value = newVal
})

// Click outside directive
const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}

onMounted(() => {
  inputElement = document.querySelector('.custom-date-input')
  window.addEventListener('resize', updateDropdownPosition)
  window.addEventListener('scroll', updateDropdownPosition, true)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDropdownPosition)
  window.removeEventListener('scroll', updateDropdownPosition, true)
})
</script>

<style scoped>
.custom-date-picker-wrapper {
  width: 100%;
}

.custom-date-input {
  @apply flex items-center justify-between gap-1.5 w-full bg-white border border-gray-300 rounded-md shadow-sm transition-all duration-200;
  @apply hover:border-indigo-400 hover:shadow-md;
  height: 32px;
  padding: 0 8px;
}

.custom-date-input.is-open {
  @apply border-indigo-500 ring-2 ring-indigo-200 shadow-md;
}

.custom-date-input.has-value {
  @apply border-indigo-300;
}

.custom-date-input.is-disabled {
  @apply bg-gray-50 cursor-not-allowed opacity-60;
  @apply hover:border-gray-300 hover:shadow-sm;
}

.date-input-field {
  @apply flex-1 min-w-0 bg-transparent border-0 outline-none;
  @apply text-gray-900 placeholder:text-gray-400 text-xs;
  @apply disabled:cursor-not-allowed;
  font-size: 12px;
  line-height: 1.5;
}

.date-input-field::placeholder {
  @apply text-gray-400;
}

.clear-btn {
  @apply p-0.5 rounded hover:bg-gray-100 transition-colors flex items-center justify-center;
}

.calendar-btn {
  @apply p-0.5 rounded hover:bg-gray-100 transition-colors flex items-center justify-center;
  @apply disabled:cursor-not-allowed disabled:opacity-50;
}

.chevron-icon {
  @apply text-gray-400 transition-transform duration-200 flex-shrink-0;
}

.custom-date-input.is-open .chevron-icon {
  @apply text-indigo-600;
}

.datepicker-dropdown {
  @apply absolute bg-white rounded-lg shadow-xl border border-gray-200 z-[9999] overflow-hidden;
  @apply flex flex-col max-h-[380px];
  min-width: 280px;
}

.shortcuts-panel {
  @apply border-b border-gray-200 bg-gradient-to-br from-indigo-50 to-purple-50;
}

.shortcuts-header {
  @apply flex items-center gap-1 px-2 py-1.5 border-b border-indigo-100;
}

.shortcuts-title {
  @apply text-[10px] font-semibold text-gray-700;
}

.shortcuts-list {
  @apply p-1 max-h-[120px] overflow-y-auto;
}

.shortcut-item {
  @apply w-full flex items-center justify-between gap-1 px-2 py-1 rounded-md;
  @apply text-[10px] text-gray-700 hover:bg-white hover:shadow-sm transition-all duration-150;
  @apply hover:text-indigo-600;
}

.shortcut-text {
  @apply font-medium;
}

.calendar-panel {
  @apply p-1.5 overflow-auto;
}

.custom-date-range-section {
  @apply border-t border-gray-200 bg-gray-50 px-2 py-2;
}

.custom-date-header {
  @apply mb-1.5;
}

.back-to-shortcuts-btn {
  @apply flex items-center gap-1 text-[10px] font-medium text-gray-600 hover:text-indigo-600;
  @apply transition-colors duration-200 cursor-pointer;
}

.custom-date-label {
  @apply text-[10px] font-medium text-gray-600;
}

.custom-date-range-wrapper {
  @apply flex flex-col gap-1.5;
}

.custom-date-field {
  @apply flex flex-col gap-0.5;
}

.custom-date-field-label {
  @apply text-[10px] font-medium text-gray-600;
}

.custom-date-text-input {
  @apply w-full px-1.5 py-1 text-[10px] border border-gray-300 rounded-md;
  @apply focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500;
  @apply placeholder:text-gray-400;
}

.custom-date-actions {
  @apply flex items-center gap-1.5 mt-1.5;
}

.cancel-custom-btn {
  @apply px-2 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200;
  @apply transition-colors duration-200 text-[10px] font-medium;
}

.apply-custom-btn {
  @apply px-2 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700;
  @apply transition-colors duration-200 flex items-center justify-center gap-1;
  @apply text-[10px] font-medium flex-1;
}

.picker-actions {
  @apply flex items-center justify-end gap-1 px-2 py-1.5 border-t border-gray-200 bg-gray-50;
}

.action-btn {
  @apply px-2 py-1 rounded-md font-medium text-[10px] transition-all duration-200;
  @apply flex items-center gap-1;
}

.cancel-btn {
  @apply text-gray-700 bg-white border border-gray-300;
  @apply hover:bg-gray-50 hover:border-gray-400;
}

.confirm-btn {
  @apply text-white bg-gradient-to-r from-indigo-600 to-purple-600;
  @apply hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg;
}

/* Transitions */
.datepicker-fade-enter-active,
.datepicker-fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.datepicker-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.datepicker-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

/* Custom vue-datepicker-next styles */
:deep(.dp__calendar) {
  @apply border-0;
}

:deep(.dp__calendar_header_item) {
  @apply text-gray-600 font-semibold;
}

:deep(.dp__cell_inner) {
  @apply rounded-lg transition-all duration-150;
}

:deep(.dp__active_date) {
  @apply bg-gradient-to-r from-indigo-600 to-purple-600 text-white;
}

:deep(.dp__today) {
  @apply border-2 border-indigo-400 font-semibold;
}

:deep(.dp__range_start),
:deep(.dp__range_end) {
  @apply bg-gradient-to-r from-indigo-600 to-purple-600 text-white;
}

/* Hide mx-input-wrapper div */
:deep(.mx-input-wrapper) {
  display: none !important;
}
</style>
