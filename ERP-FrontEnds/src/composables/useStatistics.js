import { ref, onMounted } from 'vue'
import api from '@/utils/axios'

export function useStatistics() {
  const statistics = ref({
    classes: 0,
    sections: 0,
    subjects: 0
  })
  
  const loading = ref(false)
  const error = ref(null)

  const fetchStatistics = async () => {
    try {
      loading.value = true
      error.value = null
      
      const response = await api.get('/statistics/counts')
      if (response.data.success) {
        statistics.value = response.data.result
      } else {
        error.value = response.data.message || 'Failed to fetch statistics'
      }
    } catch (err) {
      console.error('Error fetching statistics:', err)
      error.value = 'Failed to fetch statistics'
      
      // Fallback to individual API calls if statistics endpoint fails
      try {
        const [classesResponse, sectionsResponse, subjectsResponse] = await Promise.all([
          api.get('/classes', { params: { per_page: 1 } }),
          api.get('/sections', { params: { per_page: 1 } }),
          api.get('/subjects', { params: { per_page: 1 } })
        ])
        
        if (classesResponse.data.success) {
          statistics.value.classes = classesResponse.data.result.total || 0
        }
        if (sectionsResponse.data.success) {
          statistics.value.sections = sectionsResponse.data.result.total || 0
        }
        if (subjectsResponse.data.status) {
          statistics.value.subjects = subjectsResponse.data.result.total || 0
        }
      } catch (fallbackError) {
        console.error('Fallback statistics fetching also failed:', fallbackError)
      }
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchStatistics()
  })

  return {
    statistics,
    loading,
    error,
    fetchStatistics
  }
} 