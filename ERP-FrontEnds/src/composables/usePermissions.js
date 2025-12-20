import { usePermissionsStore } from '@/stores/permissions'

export function usePermissions() {
  const permissionsStore = usePermissionsStore()

  // Quick helper functions for common permission checks
  const canView = (module) => permissionsStore.canViewModule(module)
  const canCreate = (module) => permissionsStore.canCreateInModule(module)
  const canEdit = (module) => permissionsStore.canEditInModule(module)
  const canDelete = (module) => permissionsStore.canDeleteInModule(module)

  // Role checks
  const isSuperAdmin = permissionsStore.isSuperAdmin
  const isAdmin = permissionsStore.isAdmin
  const isPrincipal = permissionsStore.isPrincipal
  const isTeacher = permissionsStore.isTeacher
  const isStudent = permissionsStore.isStudent
  const isParent = permissionsStore.isParent

  // Permission checks
  const hasPermission = permissionsStore.hasPermission
  const hasAnyPermission = permissionsStore.hasAnyPermission
  const hasAllPermissions = permissionsStore.hasAllPermissions
  const hasRole = permissionsStore.hasRole

  return {
    canView,
    canCreate,
    canEdit,
    canDelete,
    isSuperAdmin,
    isAdmin,
    isPrincipal,
    isTeacher,
    isStudent,
    isParent,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    permissionsStore
  }
}
  