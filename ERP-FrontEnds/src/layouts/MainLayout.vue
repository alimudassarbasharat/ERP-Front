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
          <div class="text-xs font-bold text-gray-900 tracking-tight flex items-center gap-1 cursor-pointer hover:text-purple-600 transition-colors duration-200" @click="refreshSchoolName" title="Click to refresh school name">
            <span v-if="isLoadingSchoolName" class="animate-pulse">Loading...</span>
            <span v-else>{{ schoolName || 'Green Valley Academy' }}</span>
            <svg v-if="isLoadingSchoolName" class="w-3 h-3 animate-spin" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </div>
          <div class="text-xs text-purple-600 font-medium">Student ERP</div>
        </div>
      </div>

      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical"
        :collapse="isCollapse"
        @select="handleSelect"
        :router="true"
        background-color="transparent"
        text-color="#374151"
        active-text-color="#7c3aed"
      >
        <el-menu-item index="/dashboard">
          <el-icon><House /></el-icon>
          <template #title>Dashboard</template>
        </el-menu-item>

        <el-menu-item index="/messaging">
          <el-icon><ChatDotRound /></el-icon>
          <template #title>Messaging</template>
        </el-menu-item>
        <el-menu-item index="/slack">
          <el-icon><Connection /></el-icon>
          <template #title>Slack Integration</template>
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

        <el-sub-menu index="classes">
          <template #title>
            <el-icon><School /></el-icon>
            <span>Classes</span>
          </template>
          <el-menu-item index="/classes/list">
            Class List
          </el-menu-item>
          <el-menu-item index="/classes/subjects">
            Subjects
          </el-menu-item>
        </el-sub-menu>

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
          <el-menu-item index="/exams/manage">Manage Exams</el-menu-item>
          <el-menu-item index="/exams/add-marksheet">Add Marksheet</el-menu-item>
          <el-menu-item index="/exams/view-marksheet">View Marksheet</el-menu-item>
          <el-menu-item index="/exams/mark-report">Mark Report</el-menu-item>
          <el-menu-item index="/exams/award-list">Award List</el-menu-item>
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
          <el-menu-item index="/settings/general">
            General
          </el-menu-item>
          <el-menu-item index="/settings/notifications">
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
            <span class="absolute left-0 top-1/2 -translate-y-1/2 pl-2 text-theme-accent">
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
              class="search-input"
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
          <div class="notification-container">
            <el-badge :value="3" class="notification-badge">
              <div class="notification-icon">
                <el-icon class="w-5 h-5"><Bell /></el-icon>
              </div>
            </el-badge>
          </div>
          
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
                <span class="username">{{ username }}</span>
                <span class="user-role">Administrator</span>
              </div>
              <svg class="dropdown-arrow" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </span>
            <template #dropdown>
              <el-dropdown-menu class="user-dropdown-menu">
                <el-dropdown-item @click="openProfile">
                  <svg class="dropdown-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  Profile
                </el-dropdown-item>
                <el-dropdown-item @click="handleLogout">
                  <svg class="dropdown-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                  </svg>
                  Logout
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
            <component :is="Component" :key="componentKey" />
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
  Connection
} from '@element-plus/icons-vue'
import api from '@/utils/axios'
import ThemeToggle from '@/components/ThemeToggle.vue'

const router = useRouter()
const toast = useToast()
const route = useRoute()
const isCollapse = ref(false)
const isMobileMenuOpen = ref(false)
const isMobile = ref(false)
const componentKey = ref(0)
const searchQuery = ref('')
const searchResults = ref([])
const isLoading = ref(false)

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
const schoolName = ref('')
const isLoadingSchoolName = ref(false)
const lastSchoolNameLoad = ref(0)



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

// Watch for route changes to update active menu
watch(() => route.path, (newPath) => {
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
    router.push(index)
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

onMounted(() => {
  ensureReactivity()
  checkMobile()
  window.addEventListener('resize', checkMobile)
  
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
  background: #ffffff;
  backdrop-filter: blur(16px);
  border-right: 1px solid #e2e8f0;
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
  border-bottom: 1px solid #e2e8f0;
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
  background: #ffffff;
  position: relative;
}

.main-container.sidebar-collapsed {
  margin-left: 64px;
}

.header {
  height: 55px;
  background: #ffffff;
  backdrop-filter: blur(8px);
  border: 1px solid #e2e8f0;
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

.username {
  margin-left: 8px;
  color: #1e293b;
  font-size: 14px;
}

/* New Header Styles */
.search-input {
  width: 100%;
  border: 0;
  background: transparent;
  padding: 0.5rem 0 0.5rem 2.5rem;
  color: #1e293b;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-input::placeholder {
  color: #94a3b8;
  font-size: 0.75rem;
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

.loading-spinner {
  padding: 1rem;
  text-align: center;
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
}

.search-result-item:hover {
  background: #f8fafc;
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

.result-details {
  font-size: 0.75rem;
  color: #94a3b8;
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

/* Dropdown Menu Styles */
.user-dropdown-menu {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  padding: 0.5rem;
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

.user-dropdown-menu .el-dropdown-menu__item:hover {
  background: #f8fafc;
  color: #8b5cf6;
}

.dropdown-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #94a3b8;
}

.user-dropdown-menu .el-dropdown-menu__item:hover .dropdown-icon {
  color: #8b5cf6;
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
  z-index: 1001;
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
  z-index: 999;
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
  }

  .sidebar.mobile-open {
    transform: translateX(0);
    box-shadow: 0 16px 40px 0 rgba(44, 18, 98, 0.08);
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
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .mobile-menu-toggle {
    display: block;
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

:deep(.el-menu-item.is-active) {
  background: rgba(124, 58, 237, 0.15) !important;
  color: #8b5cf6 !important;
  border-radius: 8px !important;
  font-weight: 700;
  position: relative;
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

:deep(.el-sub-menu .el-menu-item:hover) {
  background-color: rgba(168, 85, 247, 0.1) !important;
  color: #8b5cf6 !important;
  border-radius: 6px !important;
}

:deep(.el-sub-menu .el-menu-item.is-active) {
  background: rgba(124, 58, 237, 0.15) !important;
  color: #8b5cf6 !important;
  border-radius: 6px !important;
}

.sidebar,
.sidebar * {
  color: #1e293b !important;
}

:deep(.el-menu-vertical) {
  background: transparent !important;
  border-right: none !important;
}

:deep(.el-sub-menu__title) {
  background: transparent !important;
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
.search-result-item:hover {
  background: linear-gradient(90deg, #f1f5ff 60%, #e0e7ff 100%);
  box-shadow: 0 2px 8px rgba(99,102,241,0.10);
  color: #8b5cf6;
  transform: translateY(-1px) scale(1.03);
}
.search-type {
  font-size: 11px;
  color: #8b5cf6;
  margin-left: 6px;
  font-weight: 600;
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
  background: transparent !important;
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
</style>