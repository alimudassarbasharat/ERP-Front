import { useSessionStore } from '@/stores/session'
import { useRouter } from 'vue-router'
import { Swal } from '@/utils/sweetalert'

/**
 * Session Guard Composable
 * =========================
 * 
 * Provides centralized session validation for module access.
 * 
 * Usage in components:
 * ```js
 * import { useSessionGuard } from '@/composables/useSessionGuard'
 * 
 * const { requireSession } = useSessionGuard()
 * 
 * // Before navigating to session-required module
 * await requireSession()
 * ```
 * 
 * Usage in router:
 * ```js
 * beforeEnter: async (to, from, next) => {
 *   const { checkSessionRequired } = useSessionGuard()
 *   await checkSessionRequired(to, from, next)
 * }
 * ```
 */
export function useSessionGuard() {
  const sessionStore = useSessionStore()
  const router = useRouter()

  /**
   * Modules that require session to be selected
   * Add/remove modules as needed
   */
  const sessionRequiredModules = [
    '/students',
    '/classes',
    '/exams',
    '/fees',
    '/attendance',
    '/reports',
    '/faculty',
    '/facility',
    '/events'
  ]

  /**
   * Modules that DON'T require session
   * These can be accessed even without active session
   */
  const sessionOptionalModules = [
    '/dashboard',
    '/settings',
    '/messaging',
    '/tickets',
    '/profile',
    '/admin'
  ]

  /**
   * Check if route requires session
   */
  const routeRequiresSession = (path) => {
    // Check if path starts with any session-required module
    return sessionRequiredModules.some(module => path.startsWith(module))
  }

  /**
   * Check if route is session-optional
   */
  const routeIsSessionOptional = (path) => {
    return sessionOptionalModules.some(module => path.startsWith(module))
  }

  /**
   * Show session required alert
   * Beautiful SweetAlert with action buttons
   */
  const showSessionRequiredAlert = async () => {
    const result = await Swal.fire({
      title: '📅 Session Required',
      html: `
        <div style="text-align: left; padding: 0.5rem; font-size: 14px; color: #64748b;">
          <p style="margin-bottom: 0.75rem; font-weight: 500; color: #1e293b;">
            You need to add or select an academic session first to access this module.
          </p>
          <div style="background: #fef3c7; padding: 0.75rem; border-radius: 8px; border-left: 3px solid #f59e0b; margin-bottom: 0.75rem;">
            <p style="margin: 0.25rem 0; font-size: 13px; color: #92400e;">
              ℹ️ Academic sessions define your school year periods (e.g., 2024-2025)
            </p>
          </div>
          <p style="margin-top: 0.75rem; font-size: 13px; color: #475569;">
            Would you like to set up a session now?
          </p>
        </div>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#8b5cf6',
      cancelButtonColor: '#6b7280',
      confirmButtonText: '✓ Go to Session Setup',
      cancelButtonText: '✕ Cancel',
      width: '440px',
      customClass: {
        popup: 'swal-modern-popup',
        title: 'swal-modern-title',
        confirmButton: 'swal-confirm-btn',
        cancelButton: 'swal-cancel-btn'
      },
      buttonsStyling: false,
      backdrop: 'rgba(0, 0, 0, 0.4)',
      allowOutsideClick: false
    })

    if (result.isConfirmed) {
      // Navigate to session management page
      router.push('/settings/sessions')
    }

    return result.isConfirmed
  }

  /**
   * Require session before proceeding
   * Use this in component methods before executing session-dependent logic
   */
  const requireSession = async () => {
    // Load session if not already loaded
    if (!sessionStore.currentSession) {
      await sessionStore.loadCurrentSession()
    }

    // Check if session exists
    if (!sessionStore.hasActiveSession) {
      await showSessionRequiredAlert()
      return false
    }

    // Validate session is still valid
    const isValid = await sessionStore.validateSession()
    if (!isValid) {
      await showSessionRequiredAlert()
      return false
    }

    return true
  }

  /**
   * Check session requirement for router navigation
   * Use in beforeEnter guards
   */
  const checkSessionRequired = async (to, from, next) => {
    const path = to.path

    // Skip check for session-optional routes
    if (routeIsSessionOptional(path)) {
      next()
      return
    }

    // Skip check if route doesn't require session
    if (!routeRequiresSession(path)) {
      next()
      return
    }

    // Load session if not already loaded
    if (!sessionStore.currentSession) {
      await sessionStore.loadCurrentSession()
    }

    // Check if session exists
    if (!sessionStore.hasActiveSession) {
      // Show alert and stay on current page
      await showSessionRequiredAlert()
      next(false) // Abort navigation
      return
    }

    // Validate session is still valid
    const isValid = await sessionStore.validateSession()
    if (!isValid) {
      await showSessionRequiredAlert()
      next(false) // Abort navigation
      return
    }

    // Session valid, allow navigation
    next()
  }

  return {
    // Exported for use in components
    requireSession,
    checkSessionRequired,
    routeRequiresSession,
    showSessionRequiredAlert
  }
}
