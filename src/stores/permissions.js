import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/utils/axios'

export const usePermissionsStore = defineStore('permissions', () => {
  const permissions = ref([])
  const userRole = ref(null)
  const loading = ref(false)

  // Computed properties
  const hasPermission = computed(() => (permission) => {
    if (!permission) return true
    return permissions.value.includes(permission)
  })

  const hasAnyPermission = computed(() => (permissionArray) => {
    if (!permissionArray || permissionArray.length === 0) return true
    return permissionArray.some(permission => permissions.value.includes(permission))
  })

  const hasAllPermissions = computed(() => (permissionArray) => {
    if (!permissionArray || permissionArray.length === 0) return true
    return permissionArray.every(permission => permissions.value.includes(permission))
  })

  const hasRole = computed(() => (role) => {
    if (!role) return true
    if (Array.isArray(role)) {
      return role.includes(userRole.value)
    }
    return userRole.value === role
  })

  const isSuperAdmin = computed(() => userRole.value === 'super-admin')
  const isAdmin = computed(() => userRole.value === 'admin' || userRole.value === 'super-admin')
  const isPrincipal = computed(() => userRole.value === 'principal')
  const isTeacher = computed(() => userRole.value === 'teacher')
  const isStudent = computed(() => userRole.value === 'student')
  const isParent = computed(() => userRole.value === 'parent')

  // Actions
  const loadUserPermissions = async () => {
    if (loading.value) return
    
    try {
      loading.value = true
      const userStr = sessionStorage.getItem('user') || localStorage.getItem('user') || '{}'
      const user = JSON.parse(userStr)
      
      if (!user.id) {
        console.warn('No user found in sessionStorage or localStorage')
        return
      }
 
      const response = await api.get('/admin/user-permissions')
      
      if (response.data.success) {
        permissions.value = response.data.permissions || []
        userRole.value = response.data.role || null
      }
    } catch (error) {
      console.error('Failed to load user permissions:', error)
      // Fallback to basic permissions if API fails
      permissions.value = ['view-dashboard']
      userRole.value = 'guest'
    } finally {
      loading.value = false
    }
  }

  const clearPermissions = () => {
    permissions.value = []
    userRole.value = null
  }

  // Check specific module permissions
  const canViewModule = (module) => {
    const viewPermission = `view-${module}`
    const accessPermission = `access-${module}`
    return hasPermission.value(viewPermission) || hasPermission.value(accessPermission)
  }

  const canCreateInModule = (module) => {
    const createPermission = `create-${module}`
    return hasPermission.value(createPermission)
  }

  const canEditInModule = (module) => {
    const editPermission = `edit-${module}`
    return hasPermission.value(editPermission)
  }

  const canDeleteInModule = (module) => {
    const deletePermission = `delete-${module}`
    return hasPermission.value(deletePermission)
  }

  // Navigation visibility checks
  const canViewNavigation = (navItem) => {
    const moduleChecks = {
      dashboard: () => hasPermission.value('view-dashboard'),
      admin: () => hasAnyPermission.value(['view-admins', 'view-sub-admins', 'view-admin-management', 'access-role-permission-management']),
      faculty: () => hasAnyPermission.value(['view-teachers', 'view-faculty-management']),
      students: () => hasAnyPermission.value(['view-students', 'view-student-management']),
      classes: () => hasAnyPermission.value(['view-classes', 'view-class-management']),
      exams: () => hasAnyPermission.value(['view-exams', 'view-exam-management']),
      fees: () => hasAnyPermission.value(['view-fees', 'view-fee-management', 'access-fee-collection']),
      finance: () => hasAnyPermission.value(['view-transactions', 'view-finance-management']),
      reports: () => hasAnyPermission.value(['view-student-reports', 'view-teacher-reports', 'access-reports']),
      events: () => hasAnyPermission.value(['view-events', 'view-event-management']),
      facility: () => hasAnyPermission.value(['view-facilities', 'view-facility-management']),
      settings: () => hasAnyPermission.value(['view-general-settings', 'access-settings']),
      messaging: () => hasAnyPermission.value(['access-messaging', 'view-team-chat']),
      profile: () => hasAnyPermission.value(['view-profile', 'access-profile'])
    }

    const check = moduleChecks[navItem]
    return check ? check() : true
  }

  return {
    permissions,
    userRole,
    loading,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    isSuperAdmin,
    isAdmin,
    isPrincipal,
    isTeacher,
    isStudent,
    isParent,
    loadUserPermissions,
    clearPermissions,
    canViewModule,
    canCreateInModule,
    canEditInModule,
    canDeleteInModule,
    canViewNavigation
  }
})
