import { ref } from 'vue'
import {
  UserPlus,
  DollarSign,
  GraduationCap,
  AlertCircle
} from 'lucide-vue-next'

export function useDashboardActivities() {
  const recentActivities = ref([
    {
      content: 'New student registration completed for Riya Sharma',
      time: '10 minutes ago',
      type: 'success',
      color: '#10B981',
      colorDark: '#059669',
      iconComponent: UserPlus,
      details: 'Student ID: STU001, Class: 10th A, Registration Fee: ₹5000'
    },
    {
      content: 'Fee payment received from John Doe (₹12,500)',
      time: '30 minutes ago',
      type: 'primary',
      color: '#3B82F6',
      colorDark: '#2563EB',
      iconComponent: DollarSign,
      details: 'Payment Method: Online, Transaction ID: TXN123456'
    },
    {
      content: 'New teacher joined the faculty - Mathematics',
      time: '2 hours ago',
      type: 'warning',
      color: '#F59E0B',
      colorDark: '#D97706',
      iconComponent: GraduationCap,
      details: 'Teacher ID: TCH001, Experience: 5 years, Qualification: M.Sc'
    },
    {
      content: 'Maintenance scheduled for Block A tomorrow',
      time: '3 hours ago',
      type: 'info',
      color: '#6366F1',
      colorDark: '#4F46E5',
      iconComponent: AlertCircle,
      details: 'Maintenance Type: Electrical, Duration: 4 hours, Affected Area: Block A'
    }
  ])
  
  const filteredActivities = ref([...recentActivities.value])
  
  const getStatusClass = (type) => {
    const classes = {
      success: 'bg-green-100 text-green-800',
      primary: 'bg-blue-100 text-blue-800',
      warning: 'bg-yellow-100 text-yellow-800',
      info: 'bg-indigo-100 text-indigo-800'
    }
    return classes[type] || classes.info
  }
  
  const updateActivitiesData = (startDate, endDate) => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      
      filteredActivities.value = recentActivities.value.filter((activity, index) => {
        const activityDate = new Date()
        activityDate.setDate(activityDate.getDate() - (index + 1))
        return activityDate >= start && activityDate <= end
      })
    } else {
      filteredActivities.value = [...recentActivities.value]
    }
  }
  
  return {
    recentActivities,
    filteredActivities,
    getStatusClass,
    updateActivitiesData
  }
}

