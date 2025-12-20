<template>
  <div class="custom-date-picker" @click.stop>
    <div class="date-trigger" @click="isOpen = !isOpen">
      <slot name="trigger" :formatted-date="formattedDate">
        <span>{{ formattedDate || placeholder }}</span>
      </slot>
    </div>

    <div v-if="isOpen" class="date-dropdown">
      <div class="quick-options">
        <div @click="selectQuickDate('today')" class="quick-option">
          <span>Today</span>
          <span class="quick-date">{{ getQuickDateLabel('today') }}</span>
        </div>







        
        <div @click="selectQuickDate('tomorrow')" class="quick-option">
          <span>Tomorrow</span>
          <span class="quick-date">{{ getQuickDateLabel('tomorrow') }}</span>
        </div>
        <div @click="selectQuickDate('this-weekend')" class="quick-option">
          <span>This weekend</span>
          <span class="quick-date">{{ getQuickDateLabel('this-weekend') }}</span>
        </div>
        <div @click="selectQuickDate('next-week')" class="quick-option">
          <span>Next week</span>
          <span class="quick-date">{{ getQuickDateLabel('next-week') }}</span>
        </div>
      </div>

      <div class="calendar-container">
        <div class="calendar-header">
          <button @click="previousMonth" class="nav-btn">
            <ChevronLeft :size="16" />
          </button>
          <span class="month-year">{{ currentMonthYear }}</span>
          <button @click="nextMonth" class="nav-btn">
            <ChevronRight :size="16" />
          </button>
        </div>

        <div class="calendar-grid">
          <div v-for="day in weekDays" :key="day" class="day-header">{{ day }}</div>
          <div
            v-for="date in calendarDates"
            :key="date.key"
            @click="selectDate(date)"
            class="calendar-day"
            :class="{
              'other-month': !date.isCurrentMonth,
              'selected': isSelected(date),
              'today': isToday(date)
            }"
          >
            {{ date.day }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

export default {
  name: 'CustomDatePicker',
  components: { ChevronLeft, ChevronRight },
  props: {
    modelValue: {
      type: [String, Date],
      default: null
    },
    placeholder: {
      type: String,
      default: 'Select date'
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const isOpen = ref(false)
    const currentMonth = ref(new Date().getMonth())
    const currentYear = ref(new Date().getFullYear())

    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

    const formattedDate = computed(() => {
      if (!props.modelValue) return ''
      try {
        const date = new Date(props.modelValue)
        if (isNaN(date.getTime())) return ''
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      } catch (e) {
        return ''
      }
    })

    const currentMonthYear = computed(() => {
      const date = new Date(currentYear.value, currentMonth.value)
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    })

    const calendarDates = computed(() => {
      const dates = []
      const firstDay = new Date(currentYear.value, currentMonth.value, 1)
      const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
      const prevMonthLastDay = new Date(currentYear.value, currentMonth.value, 0)

      // Previous month days
      const startDayOfWeek = firstDay.getDay()
      for (let i = startDayOfWeek - 1; i >= 0; i--) {
        const day = prevMonthLastDay.getDate() - i
        dates.push({
          day,
          month: currentMonth.value - 1,
          year: currentYear.value,
          isCurrentMonth: false,
          key: `prev-${day}`
        })
      }

      // Current month days
      for (let day = 1; day <= lastDay.getDate(); day++) {
        dates.push({
          day,
          month: currentMonth.value,
          year: currentYear.value,
          isCurrentMonth: true,
          key: `curr-${day}`
        })
      }

      // Next month days
      const remainingDays = 42 - dates.length
      for (let day = 1; day <= remainingDays; day++) {
        dates.push({
          day,
          month: currentMonth.value + 1,
          year: currentYear.value,
          isCurrentMonth: false,
          key: `next-${day}`
        })
      }

      return dates
    })

    const selectQuickDate = (option) => {
      const today = new Date()
      let selectedDate = new Date()

      switch (option) {
        case 'today':
          selectedDate = today
          break
        case 'tomorrow':
          selectedDate.setDate(today.getDate() + 1)
          break
        case 'this-weekend':
          const daysUntilSaturday = 6 - today.getDay()
          selectedDate.setDate(today.getDate() + daysUntilSaturday)
          break
        case 'next-week':
          selectedDate.setDate(today.getDate() + 7)
          break
      }

      const formattedDate = selectedDate.toISOString().split('T')[0]
      emit('update:modelValue', formattedDate)
      emit('change', formattedDate)
      isOpen.value = false
    }

    const getQuickDateLabel = (option) => {
      const today = new Date()
      let date = new Date()

      switch (option) {
        case 'today':
          return 'Today'
        case 'tomorrow':
          date.setDate(today.getDate() + 1)
          return date.toLocaleDateString('en-US', { weekday: 'short' })
        case 'this-weekend':
          return 'Sat'
        case 'next-week':
          return 'Mon'
      }
    }

    const selectDate = (dateObj) => {
      if (!dateObj.isCurrentMonth) return
      const date = new Date(dateObj.year, dateObj.month, dateObj.day)
      const formattedDate = date.toISOString().split('T')[0]
      emit('update:modelValue', formattedDate)
      emit('change', formattedDate)
      isOpen.value = false
    }

    const isSelected = (dateObj) => {
      if (!props.modelValue) return false
      const selected = new Date(props.modelValue)
      return (
        dateObj.day === selected.getDate() &&
        dateObj.month === selected.getMonth() &&
        dateObj.year === selected.getFullYear()
      )
    }

    const isToday = (dateObj) => {
      const today = new Date()
      return (
        dateObj.day === today.getDate() &&
        dateObj.month === today.getMonth() &&
        dateObj.year === today.getFullYear()
      )
    }

    const previousMonth = () => {
      if (currentMonth.value === 0) {
        currentMonth.value = 11
        currentYear.value--
      } else {
        currentMonth.value--
      }
    }

    const nextMonth = () => {
      if (currentMonth.value === 11) {
        currentMonth.value = 0
        currentYear.value++
      } else {
        currentMonth.value++
      }
    }

    const closePicker = () => {
      isOpen.value = false
    }

    return {
      isOpen,
      formattedDate,
      currentMonthYear,
      weekDays,
      calendarDates,
      selectQuickDate,
      getQuickDateLabel,
      selectDate,
      isSelected,
      isToday,
      previousMonth,
      nextMonth,
      closePicker
    }
  }
}
</script>

<style scoped>
.custom-date-picker {
  position: relative;
}

.date-trigger {
  cursor: pointer;
}

.date-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 320px;
  padding: 0.75rem;
}

.quick-options {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}

.quick-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.quick-option:hover {
  background: #f8fafc;
}

.quick-date {
  color: #94a3b8;
  font-size: 0.8125rem;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.month-year {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
}

.nav-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.nav-btn:hover {
  background: #f8fafc;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
}

.day-header {
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: #94a3b8;
  padding: 0.375rem;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  color: #1e293b;
}

.calendar-day:hover {
  background: #f8fafc;
}

.calendar-day.other-month {
  color: #cbd5e1;
}

.calendar-day.selected {
  background: #8b5cf6;
  color: white;
  font-weight: 700;
}

.calendar-day.today {
  background: #fee2e2;
  color: #dc2626;
  font-weight: 700;
}

.calendar-day.today.selected {
  background: #8b5cf6;
  color: white;
}
</style>

