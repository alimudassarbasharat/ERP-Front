import api from '@/utils/axios'
import { useAuthStore } from '@/stores/auth'

/**
 * Reusable authentication composable
 * Uses the centralized auth store for consistent token management
 */
export function useAuth(router, route, toast) {
  const authStore = useAuthStore()

  const login = async (credentials) => {
    try {
      const response = await api.post('/login', credentials)
      return response
    } catch (error) {
      // Re-throw with user-friendly message
      const message = error.response?.data?.message || 'Login failed. Please try again.'
      throw new Error(message)
    }
  }

  const handleAuthSuccess = async (response) => {
    if (!response.data.success) {
      throw new Error(response.data.message || 'Invalid credentials')
    }

    // CRITICAL FIX: Store data directly from response, DO NOT call authStore.login() again
    // authStore.login() makes another API call, which causes duplicate login requests
    // We already have the response data, just store it directly
    const { access_token, token_type, expires_in, admin, user: userData } = response.data

    if (!access_token) {
      throw new Error('Access token is required')
    }

    // Store token and user data directly (no API call)
    authStore.token = access_token
    localStorage.setItem('authToken', access_token)

    const userToStore = userData || admin
    if (userToStore) {
      authStore.user = userToStore
      localStorage.setItem('user', JSON.stringify(userToStore))
    }

    if (expires_in) {
      const expiryDate = new Date(Date.now() + expires_in * 1000)
      authStore.tokenExpiry = expiryDate.toISOString()
      localStorage.setItem('tokenExpiry', expiryDate.toISOString())
    } else {
      const expiryDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
      authStore.tokenExpiry = expiryDate.toISOString()
      localStorage.setItem('tokenExpiry', expiryDate.toISOString())
    }

    // Show success message
    toast.success('🎉 Welcome Back!', {
      position: 'top-right',
      duration: 4000
    })

    // Redirect after delay
    setTimeout(() => {
      const redirectPath = route.query.redirect || '/dashboard'
      router.push(redirectPath)
    }, 2000)
  }

  const logout = async () => {
    await authStore.logout()
  }

  return {
    login,
    handleAuthSuccess,
    logout
  }
}

