<template>
  <div class="layout-container">
    <!-- Mobile Menu Toggle -->
    <div class="mobile-menu-toggle" @click="toggleMobileMenu">
      <el-icon><Menu /></el-icon>
    </div>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-overlay" v-if="isMobileMenuOpen" @click="closeMobileMenu"></div>

    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'collapsed': isCollapse, 'mobile-open': isMobileMenuOpen }">
      <div class="logo-container">
        <!-- School Logo -->
        <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-400 rounded-xl flex items-center justify-center shadow-lg">
          <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
          </svg>
        </div>
        <div v-if="!isCollapse" class="ml-3">
          <div class="text-xs font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-1 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200" @click="refreshSchoolName" title="Click to refresh school name">
            <span v-if="isLoadingSchoolName" class="animate-pulse">Loading...</span>
            <span v-else>{{ schoolName || 'Green Valley Academy' }}</span>
            <svg v-if="isLoadingSchoolName" class="w-3 h-3 animate-spin" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </div>
          <div class="text-xs text-purple-600 dark:text-purple-400 font-medium">Techify</div>
        </div>
      </div>

      <el-menu
        :default-active="activeMenu"
        :default-openeds="openSubmenus"
        class="el-menu-vertical"
        :collapse="isCollapse"
        @select="handleSelect"
        @open="handleSubmenuOpen"
        @close="handleSubmenuClose"
        background-color="transparent"
        :text-color="isDark ? '#cbd5e1' : '#374151'"
        :active-text-color="isDark ? '#a78bfa' : '#7c3aed'"
      >
        <el-menu-item index="/dashboard">
          <el-icon><House /></el-icon>
          <template #title>Dashboard</template>
        </el-menu-item>

        <el-menu-item index="/messaging">
          <el-icon><ChatDotRound /></el-icon>
          <template #title>Messaging</template>
        </el-menu-item>

        <el-sub-menu index="1">
          <template #title>
            <el-icon><User /></el-icon>
            <span>Admin Management</span>
          </template>
          <el-menu-item index="/admin/list">
            Admin List
          </el-menu-item>
          <el-menu-item index="/admin/sub-admin">
            Manage Employee Access
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon><House /></el-icon>
            <span>Facility Management</span>
          </template>
          <el-menu-item index="/facility/list">
            Facility List
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <el-icon><User /></el-icon>
            <span>Faculty Management</span>
          </template>
          <el-menu-item index="/faculty/list">
            Teacher List
          </el-menu-item>
          <el-menu-item index="/faculty/add">
            Add Teacher
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/classes/list">
          <el-icon><School /></el-icon>
          <template #title>Class Management</template>
        </el-menu-item>

        <el-sub-menu index="4">
          <template #title>
            <el-icon><User /></el-icon>
            <span>Student Management</span>
          </template>
          <el-menu-item index="/students/list">
            Student List
          </el-menu-item>
          <el-menu-item index="/students/attendance">
            Attendance
          </el-menu-item>
          <el-menu-item index="/students/registration">
            Registration
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="5">
          <template #title>
            <el-icon><Document /></el-icon>
            <span>Exams</span>
          </template>
          <!-- ONLY 3 MAIN ITEMS -->
          <el-menu-item index="/exams/add-marksheet-landing">
            <el-icon><EditPen /></el-icon>
            <span>Add Marksheet</span>
          </el-menu-item>
          <el-menu-item index="/exams/academic-landing">
            <el-icon><Trophy /></el-icon>
            <span>Academic</span>
          </el-menu-item>
          <el-menu-item index="/exams/create-paper-landing">
            <el-icon><Document /></el-icon>
            <span>Create Paper</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="reports">
          <template #title>
            <el-icon><Document /></el-icon>
            <span>Reports</span>
          </template>
          <el-menu-item index="/reports/students">
            <el-icon><User /></el-icon>
            Student Reports
          </el-menu-item>
          <el-menu-item index="/reports/students/class-wise">
            <el-icon><School /></el-icon>
            Class-wise Reports
          </el-menu-item>
          <el-menu-item index="/reports/students/family-wise">
            <el-icon><House /></el-icon>
            Family-wise Reports
          </el-menu-item>
          <el-menu-item index="/reports/teachers">
            <el-icon><User /></el-icon>
            Teacher Reports
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="6">
          <template #title>
            <el-icon><Calendar /></el-icon>
            <span>Event Management</span>
          </template>
          <el-menu-item index="/events/list">
            Event List
          </el-menu-item>
          <el-menu-item index="/events/calendar">
            Calendar
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="7">
          <template #title>
            <el-icon><Money /></el-icon>
            <span>Finance Management</span>
          </template>
          <el-menu-item index="/finance/transactions">
            Transactions
          </el-menu-item>
          <el-menu-item index="/finance/reports">
            Reports
          </el-menu-item>
          <el-menu-item index="/finance/fees">
            Fee Management
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="fees">
          <template #title>
            <el-icon><Money /></el-icon>
            <span>Fee Management</span>
          </template>
          <el-menu-item index="/fees/collection">
            <el-icon><Money /></el-icon>
            <span>Fee Collection</span>
          </el-menu-item>
          <el-menu-item index="/fees/manage">
            <el-icon><Setting /></el-icon>
            <span>Manage Fee</span>
          </el-menu-item>
          <el-menu-item index="/fees/pay">
            <el-icon><Money /></el-icon>
            <span>Pay Fee</span>
          </el-menu-item>
          <el-menu-item index="/fees/analytics">
            <el-icon><Document /></el-icon>
            <span>Fee Analytics</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/tickets">
          <el-icon><Document /></el-icon>
          <template #title>Ticket System</template>
        </el-menu-item>

        <el-sub-menu index="8">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>Settings</span>
          </template>
          <el-menu-item index="/settings/school-profile">
            <el-icon><School /></el-icon>
            School Profile
          </el-menu-item>
          <el-menu-item index="/settings/sessions">
            <el-icon><Calendar /></el-icon>
            Session Management
          </el-menu-item>
          <el-menu-item index="/settings/general">
            <el-icon><Setting /></el-icon>
            General
          </el-menu-item>
          <el-menu-item index="/settings/notifications">
            <el-icon><Bell /></el-icon>
            Notifications
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>

    <!-- Main Content -->
    <div class="main-container" :class="{ 'sidebar-collapsed': isCollapse }">
      <!-- Header -->
      <div class="header">
        <div class="header-left">
          <div class="w-full">
            <span class="absolute left-0 top-1/2 -translate-y-1/2 pl-2 text-theme-accent dark:text-purple-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              v-model="searchQuery"
              @input="() => handleSearch && handleSearch()"
              @keyup.enter="() => handleSearch && handleSearch()"
              type="text"
              placeholder="QUICK SEARCH"
              class="search-input dark:text-gray-200 dark:placeholder-gray-500"
            />
            <div class="search-underline"></div>
            <div
              v-show="searchQuery && (isLoading || searchResults.length > 0)"
              class="search-results global-header-search-results"
            >
              <div v-show="isLoading" class="loading-spinner">
                <el-icon class="is-loading"><Loading /></el-icon>
              </div>
              <div v-show="!isLoading && searchResults.length > 0">
                <div
                  v-for="result in searchResults"
                  :key="result.type + '-' + result.id"
                  class="search-result-item"
                  @click="openDetail(result)"
                >
                  <img v-if="result.avatar" :src="result.avatar" alt="avatar" class="result-avatar" />
                  <div class="result-info">
                    <div class="result-name">{{ result.name }}</div>
                    <div class="result-details">
                      <span v-if="result.rollNumber">ID: {{ result.rollNumber }}</span>
                      <span class="result-type">({{ result.type }})</span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="!isLoading && searchResults.length === 0" class="global-header-search-no-results">
                No results found.
              </div>
            </div>
          </div>
        </div>
        <div class="header-right">
          <!-- Theme Toggle -->
          <ThemeToggle class="mr-4" />
          
          <!-- Notification Bell with Badge -->
          <el-dropdown trigger="click" placement="bottom-end" class="notification-container" @visible-change="handleNotificationDropdown">
            <div class="notification-wrapper">
              <el-badge :value="notificationUnreadCount" :hidden="notificationUnreadCount === 0" class="notification-badge">
                <div class="notification-icon" :class="{ 'has-notifications': notificationUnreadCount > 0 }">
                  <el-icon class="w-5 h-5"><Bell /></el-icon>
                </div>
              </el-badge>
            </div>
            <template #dropdown>
              <div class="notification-dropdown">
                <div class="notification-header">
                  <h3 class="notification-title">Notifications</h3>
                  <button 
                    v-if="notificationUnreadCount > 0" 
                    @click="markAllNotificationsRead"
                    class="mark-all-read-btn"
                  >
                    Mark all as read
                  </button>
                </div>
                <div class="notification-list">
                  <div v-if="isLoadingNotifications" class="notification-loading">
                    <el-icon class="is-loading"><Loading /></el-icon>
                    <span>Loading notifications...</span>
                  </div>
                  <div v-else-if="recentNotifications.length === 0" class="notification-empty">
                    <el-icon><Bell /></el-icon>
                    <p>No new notifications</p>
                  </div>
                  <div 
                    v-else
                    v-for="notification in recentNotifications" 
                    :key="notification.id"
                    class="notification-item"
                    :class="{ 'unread': !notification.is_read }"
                    @click="handleNotificationClick(notification)"
                  >
                    <div class="notification-avatar">
                      <el-avatar :size="40" :src="notification.sender?.avatar">
                        {{ notification.sender?.name?.charAt(0) || 'U' }}
                      </el-avatar>
                    </div>
                    <div class="notification-content">
                      <div class="notification-meta">
                        <span class="notification-sender">{{ notification.sender?.name || 'Someone' }}</span>
                        <span class="notification-time">{{ formatNotificationTime(notification.created_at) }}</span>
                      </div>
                      <p class="notification-preview">{{ notification.message_preview || 'New message' }}</p>
                      <span class="notification-conversation">{{ notification.conversation_name }}</span>
                    </div>
                    <div v-if="!notification.is_read" class="notification-dot"></div>
                  </div>
                </div>
                <div v-if="recentNotifications.length > 0" class="notification-footer">
                  <button @click="viewAllNotifications" class="view-all-btn">View all notifications</button>
                </div>
              </div>
            </template>
          </el-dropdown>
          
          <!-- Full Screen Toggle -->
          <div class="fullscreen-container">
            <div class="fullscreen-icon" @click="toggleFullScreen">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
              </svg>
            </div>
          </div>
          
          <!-- User Profile -->
          <el-dropdown trigger="click" class="user-dropdown">
            <span class="user-profile">
              <el-avatar :size="36" :src="user.value?.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" class="user-avatar" />
              <div class="user-info">
                <span :class="[textSizes.bodySmall, 'username text-gray-900 dark:text-white']">{{ username }}</span>
                <span :class="[textSizes.label, 'user-role text-gray-500 dark:text-gray-400']">Administrator</span>
              </div>
              <svg class="dropdown-arrow text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </span>
            <template #dropdown>
              <el-dropdown-menu class="user-dropdown-menu dark:bg-gray-800 dark:border-gray-700">
                <el-dropdown-item @click="openProfile" class="dark:hover:bg-gray-700">
                  <svg class="dropdown-icon text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  <span :class="[textSizes.bodySmall, 'text-gray-900 dark:text-white']">Profile</span>
                </el-dropdown-item>
                <el-dropdown-item @click="handleLogout" class="dark:hover:bg-gray-700">
                  <svg class="dropdown-icon text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                  </svg>
                  <span :class="[textSizes.bodySmall, 'text-gray-900 dark:text-white']">Logout</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <!-- Content -->
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <div v-if="Component" :key="componentKey">
              <component :is="Component" />
            </div>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import {
  Menu,
  Fold,
  Expand,
  House,
  User,
  Calendar,
  Money,
  Setting,
  Loading,
  Document,
  School,
  Search,
  ArrowDown,
  Bell,
  EditPen,
  CircleCheck,
  Trophy,
  Printer
} from '@element-plus/icons-vue'
import api from '@/utils/axios'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { textSizes } from '@/utils/textSizes'
import { useNotifications } from '@/composables/useNotifications'
import { formatDistanceToNow } from 'date-fns'

const router = useRouter()
const toast = useToast()
const route = useRoute()
const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)
const isCollapse = ref(false)
const isMobileMenuOpen = ref(false)
const isMobile = ref(false)
const componentKey = ref(0)
const searchQuery = ref('')
const searchResults = ref([])
const isLoading = ref(false)
const openSubmenus = ref([])

// Ensure all reactive variables are properly initialized
const ensureReactivity = () => {
  if (!searchQuery.value) searchQuery.value = ''
  if (!searchResults.value) searchResults.value = []
  if (isLoading.value === undefined) isLoading.value = false
  if (!user.value) user.value = {}
  if (!schoolName.value) schoolName.value = ''
  if (isLoadingSchoolName.value === undefined) isLoadingSchoolName.value = false
  if (lastSchoolNameLoad.value === undefined) lastSchoolNameLoad.value = 0
}
const user = ref({})
const username = computed(() => user.value?.first_name || user.value?.name || 'User')
const userRole = computed(() => {
  try {
    const userData = user.value || JSON.parse(localStorage.getItem('user') || '{}')
    return userData.role || userData.user_type || userData.type || 'guest'
  } catch {
    return 'guest'
  }
})
const schoolName = ref('')
const isLoadingSchoolName = ref(false)
const lastSchoolNameLoad = ref(0)

// Notifications
const {
  notifications,
  unreadCount: notificationUnreadCount,
  recentNotifications,
  isLoading: isLoadingNotifications,
  markAsRead,
  markAllAsRead: markAllNotificationsRead,
  navigateToNotification
} = useNotifications()



// Function to load school name
const loadSchoolName = async () => {
  if (isLoadingSchoolName.value) return // Prevent multiple simultaneous requests
  
  // Debounce: don't load more than once every 30 seconds
  const now = Date.now()
  if (now - lastSchoolNameLoad.value < 30000) {
    return
  }
  
  try {
    isLoadingSchoolName.value = true
    lastSchoolNameLoad.value = now
    
    // First check if school exists
    const checkResponse = await api.get('/settings/check-school')
    if (checkResponse.data.success && checkResponse.data.exists) {
      // If school exists, fetch the general settings
      const settingsResponse = await api.get('/settings/general')
      if (settingsResponse.data.success && settingsResponse.data.data) {
        schoolName.value = settingsResponse.data.data.schoolName || 'Green Valley Academy'
      } else {
        schoolName.value = 'Green Valley Academy'
      }
    } else {
      // If no school settings found, use default name
      schoolName.value = 'Green Valley Academy'
    }
  } catch (error) {
    console.error('Error loading school name:', error)
    // Only set default name if we don't have a cached value
    if (!schoolName.value) {
      schoolName.value = 'Green Valley Academy'
    }
  } finally {
    isLoadingSchoolName.value = false
  }
}

// Function to manually refresh school name (can be called from other components)
const refreshSchoolName = () => {
  // Reset the last load time to force immediate refresh
  lastSchoolNameLoad.value = 0
  loadSchoolName()
}

// Compute active menu based on current route
const activeMenu = computed(() => {
  const path = route.path
  // For nested routes, return the exact path for proper highlighting
  if (path.startsWith('/exams/')) {
    return path
  }
  if (path.startsWith('/faculty/')) {
    return path  // Return exact path instead of always returning '/faculty/list'
  }
  if (path.startsWith('/students/')) {
    return path
  }
  if (path.startsWith('/classes/')) {
    return path
  }
  if (path.startsWith('/fees/')) {
    return path
  }
  if (path.startsWith('/reports/')) {
    return path
  }
  return path
})

// Determine which submenus should be open based on current route
const updateOpenSubmenus = () => {
  const path = route.path
  const newOpenSubmenus = []
  
  // Admin Management
  if (path.startsWith('/admin/')) {
    newOpenSubmenus.push('1')
  }
  // Facility Management
  else if (path.startsWith('/facility/')) {
    newOpenSubmenus.push('2')
  }
  // Faculty Management
  else if (path.startsWith('/faculty/')) {
    newOpenSubmenus.push('3')
  }
  // Student Management
  else if (path.startsWith('/students/')) {
    newOpenSubmenus.push('4')
  }
  // Exams
  else if (path.startsWith('/exams/')) {
    newOpenSubmenus.push('5')
  }
  // Reports
  else if (path.startsWith('/reports/')) {
    newOpenSubmenus.push('reports')
  }
  // Event Management
  else if (path.startsWith('/events/')) {
    newOpenSubmenus.push('6')
  }
  // Finance Management
  else if (path.startsWith('/finance/')) {
    newOpenSubmenus.push('7')
  }
  // Fee Management
  else if (path.startsWith('/fees/')) {
    newOpenSubmenus.push('fees')
  }
  // Settings - THIS IS THE CRITICAL FIX
  else if (path.startsWith('/settings/')) {
    newOpenSubmenus.push('8')
  }
  
  openSubmenus.value = newOpenSubmenus
}

// Handle submenu open event
const handleSubmenuOpen = (index) => {
  if (!openSubmenus.value.includes(index)) {
    openSubmenus.value.push(index)
  }
}

// Handle submenu close event
const handleSubmenuClose = (index) => {
  const indexPos = openSubmenus.value.indexOf(index)
  if (indexPos > -1) {
    openSubmenus.value.splice(indexPos, 1)
  }
}

// Watch for route changes to update active menu and open submenus
watch(() => route.path, (newPath) => {
  // Update which submenu should be open based on current route
  updateOpenSubmenus()
  
  if (isMobile.value) {
    closeMobileMenu()
  }
  
  // Check authentication on route change
  const userData = localStorage.getItem('user')
  if (!userData && route.path !== '/login') {
    router.push('/login')
  }
})

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
  if (isMobile.value) {
    isCollapse.value = true
    isMobileMenuOpen.value = false
  } else {
    isCollapse.value = false
    isMobileMenuOpen.value = false
  }
}

const toggleCollapse = () => {
  if (!isMobile.value) {
    isCollapse.value = !isCollapse.value
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleSelect = (index) => {
  if (index.startsWith('/')) {
    componentKey.value++
    router.push(index).catch(err => {
      // Ignore navigation errors (e.g., navigating to same route)
      if (err.name !== 'NavigationDuplicated') {
        console.error('Navigation error:', err)
      }
    })
    if (isMobile.value) {
      closeMobileMenu()
    }
  }
}


const handleLogout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

const handleSearch = async () => {
  if (!searchQuery.value) {
    searchResults.value = [];
    return;
  }
  
  try {
    const q = searchQuery.value.trim();
    if (!q) {
      searchResults.value = [];
      return;
    }
    isLoading.value = true;
    
    // Call both APIs in parallel
    const [studentsRes, employeesRes] = await Promise.all([
      api.get('/students', { params: { search: q } }),
      api.get('/teachers', { params: { search: q } })
    ]);
    
    // Combine results and map to show pic, name, roll/emp id, and type
    searchResults.value = [
      ...(studentsRes?.data?.result?.data || []).map(item => ({
        id: item.id,
        name: [item.first_name, item.middle_name, item.last_name].filter(Boolean).join(' '),
        rollNumber: item.roll_number || item.gr_no || '',
        avatar: item.avatar || '',
        type: 'Student'
      })),
      ...(employeesRes?.data?.result?.data || []).map(item => ({
        id: item.id,
        name: [item.first_name, item.middle_name, item.last_name].filter(Boolean).join(' '),
        rollNumber: item.employee_id || item.emp_no || '',
        avatar: item.avatar || '',
        type: 'Employee'
      }))
    ];
  } catch (e) {
    console.error('Search error:', e);
    searchResults.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Highlight function for search results
const highlight = (text, query) => {
  if (!query) return text;
  // Use a very light color for the matched text, no background
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<span style="color: #94a3b8; font-weight: 500;">$1</span>');
};

const openDetail = (result) => {
  let url = '';
  if (result.type === 'Student') {
    url = `/students/${result.id}`;
  } else if (result.type === 'Employee') {
    url = `/faculty/teacher-details/${result.id}`;
  }
  if (url) {
    window.open(url, '_blank');
    // Clear the search filter and results
    searchQuery.value = '';
    searchResults.value = [];
  }
};

const openProfile = () => {
  router.push('/profile')
}

// Notification handlers
const handleNotificationClick = (notification) => {
  navigateToNotification(notification)
}

const handleNotificationDropdown = (visible) => {
  // When dropdown opens, we could refresh notifications
  if (visible) {
    // Optional: refresh notifications when dropdown opens
  }
}

const formatNotificationTime = (dateString) => {
  if (!dateString) return 'Just now'
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true })
  } catch (error) {
    return 'Just now'
  }
}

const viewAllNotifications = () => {
  router.push('/notifications')
}

onMounted(() => {
  ensureReactivity()
  checkMobile()
  window.addEventListener('resize', checkMobile)
  
  // Initialize submenu open state based on current route
  updateOpenSubmenus()
  
  // Check authentication
  const userData = localStorage.getItem('user')
  if (!userData) {
    router.push('/login')
  } else {
    try {
      user.value = JSON.parse(userData)
    } catch (e) {
      user.value = null
    }
  }
  
  // Watch for user changes
  watch(() => localStorage.getItem('user'), (newUserData) => {
    if (newUserData) {
      try {
        user.value = JSON.parse(newUserData)
      } catch (e) {
        user.value = null
      }
    }
  })
  
  // Load school name
  loadSchoolName()
  
  // Add event listener for page visibility change (only when user comes back to tab)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      // Only reload school name if it's not already loaded
      if (!schoolName.value || schoolName.value === 'Green Valley Academy') {
        loadSchoolName()
      }
    }
  })
  
  // Listen for custom events to refresh school name (e.g., when settings are updated)
  window.addEventListener('schoolSettingsUpdated', loadSchoolName)
  
  // Set up periodic authentication check (every 10 minutes)
  setInterval(() => {
    const userData = localStorage.getItem('user')
    if (!userData && route.path !== '/login') {
      router.push('/login')
    }
  }, 10 * 60 * 1000)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  document.removeEventListener('visibilitychange', loadSchoolName)
  
  // Remove custom event listener
  window.removeEventListener('schoolSettingsUpdated', loadSchoolName)
})
</script>

<style scoped>
.layout-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, #fef2f2 0%, #fdf2f8 25%, #fce7f3 50%, #fdf2f8 75%, #fef2f2 100%);
  transition: background 0.3s ease;
}

.dark .layout-container {
  background: linear-gradient(135deg, #1e1b2e 0%, #1a1625 25%, #181422 50%, #1a1625 75%, #1e1b2e 100%);
}

.layout-container::before {
  content: '';
  position: fixed;
  left: 120px;
  bottom: 0;
  width: 600px;
  height: 400px;
  background: radial-gradient(ellipse at 120px 100%, rgba(168, 85, 247, 0.25) 0%, rgba(168, 85, 247, 0.15) 25%, rgba(168, 85, 247, 0.08) 50%, rgba(168, 85, 247, 0.03) 70%, transparent 90%);
  filter: blur(60px);
  z-index: 1500;
  pointer-events: none;
}

.layout-container::after {
  content: '';
  position: fixed;
  right: 0;
  top: 0;
  width: 500px;
  height: 400px;
  background: radial-gradient(ellipse at 85% 15%, rgba(99, 102, 241, 0.22) 0%, rgba(99, 102, 241, 0.14) 25%, rgba(99, 102, 241, 0.08) 45%, rgba(99, 102, 241, 0.04) 65%, transparent 85%);
  filter: blur(50px);
  z-index: 1500;
  pointer-events: none;
}

.sidebar {
  width: 240px;
  height: 100%;
  background: var(--bg-card, #ffffff);
  backdrop-filter: blur(16px);
  border-right: 1px solid var(--border-primary, #e2e8f0);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.sidebar.collapsed {
  width: 64px;
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: transparent;
  border-bottom: 1px solid var(--border-primary, #e2e8f0);
  flex-shrink: 0;
  overflow: hidden;
}



.el-menu-vertical {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: none;
}

.el-menu-vertical::-webkit-scrollbar {
  width: 8px;
  background: transparent;
}

.el-menu-vertical::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #c084fc, #a855f7);
  border-radius: 8px;
  min-height: 40px;
}

.el-menu-vertical::-webkit-scrollbar-track {
  background: transparent;
}

.main-container {
  flex: 1;
  margin-left: 240px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 100vh;
  background: linear-gradient(135deg, #fef2f2 0%, #fdf2f8 25%, #fce7f3 50%, #fdf2f8 75%, #fef2f2 100%);
  position: relative;
}

.dark .main-container {
  background: linear-gradient(135deg, #1e1b2e 0%, #1a1625 25%, #181422 50%, #1a1625 75%, #1e1b2e 100%);
}

.main-container.sidebar-collapsed {
  margin-left: 64px;
}

.header {
  height: 55px;
  background: var(--bg-card, #ffffff);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-primary, #e2e8f0);
  border-radius: 12px 12px 12px 12px;
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px 0 8px;
  position: fixed;
  top: 0;
  right: 0;
  left: 240px;
  z-index: 1001;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top:5px;
  margin-left:17px;
  margin-right:42px;
}

.sidebar-collapsed .header {
  left: 64px;
  padding: 0 4px 0 8px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.user-profile {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.user-profile:hover {
  background-color: rgba(168, 85, 247, 0.1);
  border-radius: 8px;
}

.dark .user-profile:hover {
  background-color: rgba(139, 92, 246, 0.15);
}

.username {
  margin-left: 8px;
  color: var(--text-primary, #1e293b);
}

.dark .username {
  color: var(--text-primary, #f8fafc);
}

.user-role {
  margin-left: 8px;
  color: var(--text-secondary, #64748b);
}

.dark .user-role {
  color: var(--text-secondary, #94a3b8);
}

/* New Header Styles */
.search-input {
  width: 100%;
  border: 0;
  background: transparent;
  padding: 0.5rem 0 0.5rem 2.5rem;
  color: var(--text-primary, #1e293b);
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark .search-input {
  color: var(--text-primary, #f8fafc);
}

.search-input::placeholder {
  color: var(--text-muted, #94a3b8);
  font-size: 0.75rem;
}

.dark .search-input::placeholder {
  color: var(--text-muted, #64748b);
}

.search-underline {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--gradient-primary);
  border-radius: 1px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 50;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  border: 1px solid #e2e8f0;
  margin-top: 0.5rem;
  overflow: hidden;
  max-height: 300px;
  overflow-y: auto;
}

.dark .search-results {
  background: var(--bg-card, #1f2937);
  border-color: var(--border-primary, #374151);
}

.loading-spinner {
  padding: 1rem;
  text-align: center;
  color: #94a3b8;
}

.dark .loading-spinner {
  color: #94a3b8;
}

.search-result-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid var(--border-secondary);
  color: var(--text-primary, #1e293b);
}

.dark .search-result-item {
  color: var(--text-primary, #f8fafc);
  border-bottom-color: var(--border-primary, #374151);
}

.search-result-item:hover {
  background: #f8fafc;
}

.dark .search-result-item:hover {
  background: rgba(55, 48, 163, 0.1);
}

.search-result-item:last-child {
  border-bottom: none;
}

.result-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
}

.result-info {
  flex: 1;
}

.result-name {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.dark .result-name {
  color: #f8fafc;
}

.result-details {
  font-size: 0.75rem;
  color: #94a3b8;
}

.dark .result-details {
  color: #cbd5e1;
}

.result-type {
  margin-left: 0.5rem;
  color: #8b5cf6;
  font-weight: 500;
}

.global-header-search-no-results {
  padding: 1rem;
  text-align: center;
  color: #94a3b8;
  font-size: 0.875rem;
}

/* Notification Styles */
.notification-container {
  position: relative;
  margin-right: 1rem;
}

.notification-wrapper {
  position: relative;
}

.notification-badge {
  --el-badge-bg-color: #ef4444;
  --el-badge-text-color: #ffffff;
}

.notification-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #ffffff;
  color: #1e293b;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e2e8f0;
  box-shadow: var(--shadow-sm);
}

.notification-icon:hover {
  background: #f1f5f9;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
  border-color: var(--border-accent);
}

.notification-icon.has-notifications {
  animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-ring {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.dark .notification-icon {
  background: #1e293b;
  color: #cbd5e1;
  border-color: #334155;
}

.dark .notification-icon:hover {
  background: #334155;
}

/* Notification Dropdown */
.notification-dropdown {
  width: 380px;
  max-height: 500px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.dark .notification-dropdown {
  background: #1e293b;
  border: 1px solid #334155;
}

.notification-header {
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dark .notification-header {
  border-bottom-color: #334155;
}

.notification-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.dark .notification-title {
  color: #f8fafc;
}

.mark-all-read-btn {
  font-size: 0.875rem;
  color: #7c3aed;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.2s;
}

.mark-all-read-btn:hover {
  background: #f3f4f6;
}

.dark .mark-all-read-btn {
  color: #a78bfa;
}

.dark .mark-all-read-btn:hover {
  background: #334155;
}

.notification-list {
  flex: 1;
  overflow-y: auto;
  max-height: 400px;
}

.notification-loading,
.notification-empty {
  padding: 32px;
  text-align: center;
  color: #94a3b8;
}

.notification-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.notification-empty .el-icon {
  font-size: 2rem;
  color: #cbd5e1;
}

.notification-item {
  padding: 12px 16px;
  display: flex;
  gap: 12px;
  cursor: pointer;
  transition: background 0.2s;
  border-bottom: 1px solid #f1f5f9;
  position: relative;
}

.notification-item:hover {
  background: #f8fafc;
}

.notification-item.unread {
  background: #f0f9ff;
}

.dark .notification-item {
  border-bottom-color: #334155;
}

.dark .notification-item:hover {
  background: #334155;
}

.dark .notification-item.unread {
  background: #1e3a5f;
}

.notification-avatar {
  flex-shrink: 0;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.notification-sender {
  font-weight: 600;
  font-size: 0.875rem;
  color: #1e293b;
}

.dark .notification-sender {
  color: #f8fafc;
}

.notification-time {
  font-size: 0.75rem;
  color: #94a3b8;
}

.notification-preview {
  font-size: 0.875rem;
  color: #64748b;
  margin: 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.dark .notification-preview {
  color: #cbd5e1;
}

.notification-conversation {
  font-size: 0.75rem;
  color: #7c3aed;
  font-weight: 500;
}

.dark .notification-conversation {
  color: #a78bfa;
}

.notification-dot {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  flex-shrink: 0;
}

.notification-footer {
  padding: 12px 16px;
  border-top: 1px solid #e2e8f0;
  text-align: center;
}

.dark .notification-footer {
  border-top-color: #334155;
}

.view-all-btn {
  font-size: 0.875rem;
  color: #7c3aed;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 6px;
  transition: background 0.2s;
  width: 100%;
}

.view-all-btn:hover {
  background: #f3f4f6;
}

.dark .view-all-btn {
  color: #a78bfa;
}

.dark .view-all-btn:hover {
  background: #334155;
}

/* User Profile Styles */
.user-dropdown {
  margin-left: 0.5rem;
}

.user-profile {
  display: flex;
  align-items: center;
  /* gap: 0.75rem; */
  padding: 0.5rem;
  /* border-radius: 12px; */
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  /* background: #f8fafc; */
  /* border: 1px solid #e2e8f0; */
}

.user-profile:hover {
  background: #f1f5f9;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.user-avatar {
  border: 2px solid #e2e8f0;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.username {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.875rem;
  margin: 0;
}

.user-role {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
}

.dark .user-role {
  color: #cbd5e1;
}

.dropdown-arrow {
  width: 1rem;
  height: 1rem;
  color: #94a3b8;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.user-profile:hover .dropdown-arrow {
  color: #1e293b;
  transform: rotate(180deg);
}

.dark .user-profile:hover .dropdown-arrow {
  color: #f8fafc;
}

/* Dropdown Menu Styles */
.user-dropdown-menu {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  padding: 0.5rem;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.dark .user-dropdown-menu {
  background: var(--bg-card);
  border-color: var(--border-primary);
}

.user-dropdown-menu .el-dropdown-menu__item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: #1e293b;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark .user-dropdown-menu .el-dropdown-menu__item {
  color: var(--text-primary);
}

.user-dropdown-menu .el-dropdown-menu__item:hover {
  background: #f8fafc;
  color: #8b5cf6;
}

.dark .user-dropdown-menu .el-dropdown-menu__item:hover {
  background: rgba(55, 48, 163, 0.1);
  color: #a78bfa;
}

.dropdown-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #94a3b8;
  transition: color 0.3s ease;
}

.dark .dropdown-icon {
  color: #94a3b8;
}

.user-dropdown-menu .el-dropdown-menu__item:hover .dropdown-icon {
  color: #8b5cf6;
}

.dark .user-dropdown-menu .el-dropdown-menu__item:hover .dropdown-icon {
  color: #a78bfa;
}

/* Header Right Layout */
.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Theme-aware text colors */
.text-theme-accent {
  color: #8b5cf6;
}

/* Full Screen Styles */
.fullscreen-container {
  position: relative;
  margin-right: 1rem;
}

.fullscreen-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #ffffff;
  color: #1e293b;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e2e8f0;
  box-shadow: var(--shadow-sm);
}

.fullscreen-icon:hover {
  background: #f1f5f9;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
  border-color: var(--border-accent);
}

.dark .fullscreen-icon {
  background: var(--bg-card, #1f2937);
  color: #e2e8f0;
  border-color: var(--border-primary, #374151);
}

.dark .fullscreen-icon:hover {
  background: rgba(55, 48, 163, 0.1);
  border-color: #6366f1;
  color: #a78bfa;
}

.content {
  flex: 1;
  padding: 80px 20px 20px;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
  min-height: 100vh;
  position: relative;
  z-index: 10;
}

.mobile-menu-toggle {
  display: none;
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 9999;
  padding: 10px;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: #ffffff;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(139, 92, 246, 0.4);
}

.mobile-menu-toggle:active {
  transform: translateY(0);
}

.mobile-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  transition: opacity 0.3s ease;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive Styles */
@media (max-width: 1200px) {
  .content {
    padding: 80px 15px 15px;
  }
}

@media (max-width: 992px) {
  .content {
    padding: 80px 15px 15px;
  }
  
  .header {
    padding: 0 12px;
    margin-left: 12px;
    margin-right: 12px;
  }
  
  .header-left {
    gap: 12px;
  }
}

@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: block;
  }
  
  .mobile-overlay {
    display: block;
  }

  .sidebar {
    transform: translateX(-100%);
    box-shadow: none;
    z-index: 1000;
  }

  .sidebar.mobile-open {
    transform: translateX(0);
    box-shadow: 0 16px 40px 0 rgba(44, 18, 98, 0.08);
    z-index: 10000;
    pointer-events: auto;
    visibility: visible;
  }

  .main-container {
    margin-left: 0;
  }

  .main-container::before {
    width: 400px;
    height: 300px;
  }

  .main-container::after {
    width: 350px;
    height: 250px;
  }

  .header {
    left: 0;
  }

  .content {
    padding: 70px 10px 10px;
    max-width: 100vw;
  }

  .el-menu-vertical {
    width: 240px !important;
  }
  
  .header {
    margin-left: 10px;
    margin-right: 10px;
  }
}

@media (max-width: 576px) {
  .header {
    padding: 0 8px;
    margin-left: 5px;
    margin-right: 5px;
  }

  .content {
    padding: 70px 8px 8px;
  }

  .user-info {
    display: none;
  }
  
  .dropdown-arrow {
    display: none;
  }

  .user-profile {
    padding: 5px;
  }

  .el-dropdown-menu {
    min-width: 120px !important;
  }
  
  .header-left {
    gap: 8px;
  }
  
  .notification-container,
  .fullscreen-container {
    margin-right: 0;
  }
  
  .notification-icon,
  .fullscreen-icon {
    width: 36px;
    height: 36px;
  }
}

/* Print Styles */
@media print {
  .sidebar,
  .header,
  .mobile-menu-toggle {
    display: none !important;
  }

  .main-container {
    margin-left: 0 !important;
  }

  .content {
    padding: 0 !important;
    max-width: 100% !important;
  }
}

/* Add these new styles */
.sidebar.mobile-open {
  transform: translateX(0);
  z-index: 10000;
  pointer-events: auto;
  visibility: visible;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 1000;
  }

  .sidebar.mobile-open {
    z-index: 10000;
    pointer-events: auto;
    visibility: visible;
  }

  .mobile-menu-toggle {
    display: block;
    pointer-events: auto;
  }

  .mobile-overlay {
    display: block;
  }

  .main-container {
    margin-left: 0;
  }

  .header {
    left: 0;
  }
}

:deep(.el-menu-item:hover),
:deep(.el-sub-menu__title:hover) {
  background-color: rgba(168, 85, 247, 0.1) !important;
  color: #8b5cf6 !important;
  border-radius: 8px;
}

.dark :deep(.el-menu-item:hover),
.dark :deep(.el-sub-menu__title:hover) {
  background-color: rgba(168, 85, 247, 0.2) !important;
  color: #a78bfa !important;
}

:deep(.el-menu-item.is-active) {
  background: rgba(124, 58, 237, 0.15) !important;
  color: #8b5cf6 !important;
  border-radius: 8px !important;
  font-weight: 700;
  position: relative;
}

.dark :deep(.el-menu-item.is-active) {
  background: rgba(124, 58, 237, 0.25) !important;
  color: #a78bfa !important;
}

:deep(.el-menu-item.is-active::before) {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  background: #7c3aed;
  border-radius: 2px;
  box-shadow: none;
}

:deep(.el-menu-item) {
  background: transparent !important;
}

:deep(.el-sub-menu .el-menu-item) {
  background: transparent !important;
  color: #94a3b8 !important;
}

.dark :deep(.el-sub-menu .el-menu-item) {
  color: #cbd5e1 !important;
}

:deep(.el-sub-menu .el-menu-item:hover) {
  background-color: rgba(168, 85, 247, 0.1) !important;
  color: #8b5cf6 !important;
  border-radius: 6px !important;
}

.dark :deep(.el-sub-menu .el-menu-item:hover) {
  background-color: rgba(168, 85, 247, 0.2) !important;
  color: #a78bfa !important;
}

:deep(.el-sub-menu .el-menu-item.is-active) {
  background: rgba(124, 58, 237, 0.15) !important;
  color: #8b5cf6 !important;
  border-radius: 6px !important;
}

.dark :deep(.el-sub-menu .el-menu-item.is-active) {
  background: rgba(124, 58, 237, 0.25) !important;
  color: #a78bfa !important;
}

.sidebar,
.sidebar * {
  color: #1e293b !important;
}

.dark .sidebar,
.dark .sidebar * {
  color: #f8fafc !important;
}

:deep(.el-menu-vertical) {
  background: transparent !important;
  border-right: none !important;
}

:deep(.el-sub-menu__title) {
  background: transparent !important;
}

.dark :deep(.el-sub-menu__title) {
  color: #cbd5e1 !important;
}

.dark :deep(.el-menu-item) {
  color: #cbd5e1 !important;
}

.dark :deep(.el-menu-item span),
.dark :deep(.el-sub-menu__title span) {
  color: #cbd5e1 !important;
}

/* Sidebar Menu Text Sizes - Using common text sizes */
:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  font-size: 0.875rem; /* text-sm - matches textSizes.nav */
  line-height: 1.5;
}

:deep(.el-sub-menu .el-menu-item) {
  font-size: 0.8125rem; /* text-xs - matches textSizes.bodySmall */
  line-height: 1.5;
}

/* Dark mode for all sidebar sections */
.dark .sidebar {
  background: var(--bg-card) !important;
  border-right-color: var(--border-primary) !important;
}

.dark .logo-container {
  border-bottom-color: var(--border-primary) !important;
  background: transparent !important;
}

.dark .mobile-menu-toggle {
  color: var(--text-primary) !important;
  background: var(--bg-card) !important;
}

.dark .mobile-overlay {
  background: rgba(0, 0, 0, 0.5) !important;
}

.search-input-wrapper {
  position: relative;
  width: 340px;
  display: flex;
  flex-direction: column;
}
.global-header-search-input {
  width: 100%;
}
.global-header-search-results {
  position: absolute;
  left: 0;
  top: 48px;
  width: 100%;
  background: rgba(255,255,255,0.98);
  border-radius: 18px;
  box-shadow: 0 12px 40px rgba(60,72,100,0.22);
  z-index: 1001;
  padding: 0;
  margin-top: 6px;
  backdrop-filter: blur(12px);
  border: 1.5px solid #e0e7ff;
  animation: fadeIn 0.18s;
  overflow: hidden;
  max-height: 132px; /* 3 results */
  min-height: 44px;  /* always visible */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.dark .global-header-search-results {
  background: rgba(30, 41, 59, 0.98);
  border-color: #475569;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}
.global-header-search-results::-webkit-scrollbar {
  width: 7px;
  background: transparent;
}
.global-header-search-results::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #e0e7ff 0%, #a5b4fc 100%);
  border-radius: 8px;
}
.global-header-search-results::-webkit-scrollbar-track {
  background: transparent;
}
.search-result-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 18px 8px 14px;
  font-size: 13px;
  color: #1e293b;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.16s, box-shadow 0.16s, transform 0.16s;
  position: relative;
}

.dark .search-result-item {
  color: #f8fafc;
}

.search-result-item:hover {
  background: linear-gradient(90deg, #f1f5ff 60%, #e0e7ff 100%);
  box-shadow: 0 2px 8px rgba(99,102,241,0.10);
  color: #8b5cf6;
  transform: translateY(-1px) scale(1.03);
}

.dark .search-result-item:hover {
  background: linear-gradient(90deg, rgba(99, 102, 241, 0.2) 60%, rgba(139, 92, 246, 0.15) 100%);
  color: #a78bfa;
}
.search-type {
  font-size: 11px;
  color: #8b5cf6;
  margin-left: 6px;
  font-weight: 600;
}

.dark .search-type {
  color: #a78bfa;
}
.global-header-search-no-results {
  font-size: 13px;
  color: #94a3b8;
  padding: 0;
  height: 100%;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modern-search-input :deep(.el-input__wrapper) {
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(99,102,241,0.08);
  border: none !important;
  padding: 0 5px !important;
  min-height: 44px;
  display: flex;
  align-items: center;
}
.modern-search-input :deep(.el-input__inner) {
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #1e293b;
  padding: 0 !important;
}

.dark .modern-search-input :deep(.el-input__inner) {
  color: #f8fafc;
}
.modern-search-input :deep(.el-input__prefix) {
  margin-right: 10px;
  display: flex;
  align-items: center;
}
.modern-search-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px #6366f1, 0 2px 12px rgba(99,102,241,0.12);
  border: none !important;
}
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 44px;
}
.global-header-search-results.loading {
  filter: blur(2px);
}
.avatar {
  width: 28px;
  height: 28px;
  min-width: 28px;
  min-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #eee;
  border-radius: 50%;
  font-size: 13px;
}
.avatar img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

/* Dark Mode Styles */
.dark .sidebar {
  background: var(--bg-card);
  border-right-color: var(--border-primary);
}

.dark .logo-container {
  border-bottom-color: var(--border-primary);
}

.dark .main-container {
  background: var(--bg-primary);
}

.dark .header {
  background: var(--bg-card);
  border-color: var(--border-primary);
}

.dark .username {
  color: var(--text-primary);
}

.dark .search-input {
  color: var(--text-primary);
}

.dark .search-input::placeholder {
  color: var(--text-muted);
}

.dark .search-result-item {
  color: var(--text-primary);
}

.dark .search-result-item:hover {
  background: var(--bg-tertiary);
  color: var(--accent-primary);
}

.dark .global-header-search-no-results {
  color: var(--text-muted);
}

.dark .modern-search-input :deep(.el-input__wrapper) {
  background: var(--bg-secondary);
}

.dark .modern-search-input :deep(.el-input__inner) {
  color: var(--text-primary);
}
</style>