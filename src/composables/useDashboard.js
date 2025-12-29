import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import dayjs from 'dayjs'
import api from '@/utils/axios'

export function useDashboard() {
  const loading = ref(false)
  const refreshing = ref(false)
  const currentTime = ref('')
  const userName = ref('Admin')
  
  // Date filters
  const mainDateFilter = ref({
    startDate: '',
    endDate: ''
  })
  
  const chartDateFilter = ref({
    startDate: '',
    endDate: ''
  })
  
  const pieChartDateFilter = ref({
    startDate: '',
    endDate: ''
  })
  
  const activitiesDateFilter = ref({
    startDate: '',
    endDate: ''
  })
  
  const quickStatsDateFilter = ref({
    startDate: '',
    endDate: ''
  })
  
  const eventsDateFilter = ref({
    startDate: '',
    endDate: ''
  })
  
  const currentDate = computed(() => dayjs().format('MMMM D, YYYY'))
  const currentHour = computed(() => dayjs().hour())
  
  const timeOfDay = computed(() => {
    if (currentHour.value < 12) return 'morning'
    if (currentHour.value < 17) return 'afternoon'
    return 'evening'
  })
  
  const greetingMessage = computed(() => {
    const messages = [
      "Here's what's happening with your school today",
      "Stay updated with real-time insights",
      "Monitor your school's performance at a glance",
      "Track important metrics and trends"
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  })
  
  const updateTime = () => {
    currentTime.value = dayjs().format('HH:mm:ss')
  }
  
  let timeInterval = null
  
  onMounted(() => {
    updateTime()
    timeInterval = setInterval(updateTime, 1000)
  })
  
  onBeforeUnmount(() => {
    if (timeInterval) {
      clearInterval(timeInterval)
    }
  })
  
  const refreshData = async () => {
    refreshing.value = true
    try {
      // Refresh logic here
      await new Promise(resolve => setTimeout(resolve, 1000))
    } finally {
      refreshing.value = false
    }
  }
  
  return {
    loading,
    refreshing,
    currentTime,
    currentDate,
    userName,
    timeOfDay,
    greetingMessage,
    mainDateFilter,
    chartDateFilter,
    pieChartDateFilter,
    activitiesDateFilter,
    quickStatsDateFilter,
    eventsDateFilter,
    refreshData
  }
}

