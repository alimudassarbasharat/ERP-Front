import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // Theme state
  const isDark = ref(false)
  const theme = ref('light')

  // Initialize theme from localStorage or system preference
  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme) {
      theme.value = savedTheme
      isDark.value = savedTheme === 'dark'
    } else if (systemPrefersDark) {
      theme.value = 'dark'
      isDark.value = true
    } else {
      theme.value = 'light'
      isDark.value = false
    }
    
    applyTheme()
  }

  // Apply theme to document
  const applyTheme = () => {
    const root = document.documentElement
    
    if (isDark.value) {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
    } else {
      root.classList.remove('dark')
      root.setAttribute('data-theme', 'light')
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme.value)
  }

  // Toggle theme
  const toggleTheme = () => {
    isDark.value = !isDark.value
    theme.value = isDark.value ? 'dark' : 'light'
    applyTheme()
  }

  // Set specific theme
  const setTheme = (newTheme) => {
    if (newTheme === 'dark' || newTheme === 'light') {
      theme.value = newTheme
      isDark.value = newTheme === 'dark'
      applyTheme()
    }
  }

  // Watch for system theme changes
  const watchSystemTheme = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        isDark.value = e.matches
        theme.value = e.matches ? 'dark' : 'light'
        applyTheme()
      }
    })
  }

  // Don't initialize automatically - let main.js call initializeTheme() after Pinia is installed
  // This prevents "getActivePinia()" error

  return {
    isDark,
    theme,
    toggleTheme,
    setTheme,
    initializeTheme,
    watchSystemTheme
  }
}) 