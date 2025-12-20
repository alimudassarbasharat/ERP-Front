import axios from 'axios'
import { ElMessage } from 'element-plus'

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// Request interceptor - Add auth token to every request
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage or sessionStorage
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
    const user = localStorage.getItem('user')
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    if (user) {
      try {
        const userData = JSON.parse(user)
        if (userData.api_token) {
          config.headers.Authorization = `Bearer ${userData.api_token}`
        }
      } catch (e) {
        console.warn('Error parsing user data:', e)
      }
    }
    
    // Add CSRF token if available
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
    if (csrfToken) {
      config.headers['X-CSRF-TOKEN'] = csrfToken
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle auth errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log('API Error:', error.response?.status, error.response?.data)
    
    // Handle 401 Unauthorized (token expired)
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      // Clear all auth data
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      sessionStorage.removeItem('authToken')
      sessionStorage.removeItem('user')
      
      // Clear any other auth-related data
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
      
      // Show error message
      ElMessage.error('Session expired. Please login again.')
      
      // Redirect to login page
      window.location.href = '/login'
      return Promise.reject(error)
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      ElMessage.error('Access denied. You do not have permission to perform this action.')
    }
    
    // Handle 500+ Server errors
    if (error.response?.status >= 500) {
      ElMessage.error('Server error. Please try again later.')
    }
    
    // Handle network errors
    if (!error.response) {
      ElMessage.error('Network error. Please check your connection.')
    }
    
    return Promise.reject(error)
  }
)

export default api 