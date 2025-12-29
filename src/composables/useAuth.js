import api from '@/utils/axios'

/**
 * Reusable authentication composable
 * Handles login, logout, and auth state management
 */
export function useAuth(router, route, toast) {
  const login = async (credentials) => {
    const response = await api.post('/login', credentials)
    return response
  }

  const handleAuthSuccess = async (response) => {
    if (!response.data.success) {
      throw new Error(response.data.message || 'Invalid credentials')
    }

    const userData = {
      ...response.data.admin,
      token: response.data.access_token,
      api_token: response.data.access_token
    }

    // Store auth data
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('authToken', response.data.access_token)

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

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('authToken')
    router.push('/login')
  }

  return {
    login,
    handleAuthSuccess,
    logout
  }
}

