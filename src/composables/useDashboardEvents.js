import { ref } from 'vue'
import {
  Trophy,
  Users,
  Music
} from 'lucide-vue-next'

export function useDashboardEvents() {
  const upcomingEvents = ref([
    {
      title: 'Annual Sports Day',
      date: 'Dec 15, 2024',
      description: 'Annual sports competition for all classes',
      iconComponent: Trophy,
      colorClass: 'bg-gradient-to-br from-yellow-500 to-orange-500'
    },
    {
      title: 'Parent-Teacher Meeting',
      date: 'Dec 20, 2024',
      description: 'Quarterly parent-teacher meeting',
      iconComponent: Users,
      colorClass: 'bg-gradient-to-br from-blue-500 to-indigo-500'
    },
    {
      title: 'Annual Function',
      date: 'Dec 25, 2024',
      description: 'Annual cultural function and prize distribution',
      iconComponent: Music,
      colorClass: 'bg-gradient-to-br from-purple-500 to-pink-500'
    }
  ])
  
  const filteredEvents = ref([...upcomingEvents.value])
  
  const updateEventsData = (startDate, endDate) => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      
      filteredEvents.value = upcomingEvents.value.filter(event => {
        const eventDate = new Date(event.date)
        return eventDate >= start && eventDate <= end
      })
    } else {
      filteredEvents.value = [...upcomingEvents.value]
    }
  }
  
  return {
    upcomingEvents,
    filteredEvents,
    updateEventsData
  }
}

