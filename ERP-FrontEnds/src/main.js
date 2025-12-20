import './assets/main.css'
import './assets/toast-custom.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import VueApexCharts from 'vue3-apexcharts'
import App from './App.vue'
import router from './router'
import api from './utils/axios'

// Create Vue app
const app = createApp(App)

// Make authenticated API globally available
app.config.globalProperties.$api = api
app.config.globalProperties.$http = api

// Set global axios instance for components that still use axios
window.axios = api

// Register Element Plus icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// Register ApexCharts globally
app.component('apexchart', VueApexCharts)

// Toast configuration
const toastOptions = {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  // Use Tailwind CSS classes and a custom class for guaranteed override
  toastClassName: 'my-toast bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl shadow-lg px-6 py-4 flex items-center gap-3',
  bodyClassName: 'text-white text-base font-medium',
  containerClassName: '',
}

// Use plugins
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(Toast, toastOptions)

// Global error handler
app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err)
  console.error('Error info:', info)
  
  // Handle 401 errors globally
  if (err?.response?.status === 401) {
    // Clear auth data
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('user')
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    
    // Redirect to login
    window.location.href = '/login'
  }
}

// Handle unhandled promise rejections (including 401 errors)
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  
  // Handle 401 errors from unhandled promise rejections
  if (event.reason?.response?.status === 401) {
    // Clear auth data
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('user')
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    
    // Redirect to login
    window.location.href = '/login'
  }
})

// Mount app
app.mount('#app')
