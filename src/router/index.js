import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import ManageExams from '@/views/exams/ManageExams.vue'
import AddMarksheetSubjectWise from '@/views/exams/AddMarksheetSubjectWise.vue'
// useSessionGuard loaded dynamically in beforeEach to avoid circular dep: router -> session -> axios -> auth

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/Dashboard.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'redirect',
        name: 'Redirect',
        component: () => import('../views/Redirect.vue')
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'tickets',
        name: 'TicketSystem',
        component: () => import('../views/tickets/TicketSystem.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'tickets/:id',
        name: 'TicketDetail',
        component: () => import('../views/tickets/TicketDetail.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'admin',
        children: [
          {
            path: '',
            name: 'Admin',
            redirect: '/admin/list'
          },
          {
            path: 'list',
            name: 'AdminList',
            component: () => import('../views/admin/AdminList.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'edit/:id',
            name: 'EditAdmin',
            component: () => import('../views/admin/EditAdmin.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'subadmin',
            name: 'SubAdminList',
            component: () => import('../views/admin/SubAdminList.vue'),
            meta: { requiresAuth: true }
          }
        ]
      },
      {
        path: 'faculty',
        children: [
          {
            path: '',
            name: 'Faculty',
            redirect: '/faculty/list'
          },
          {
            path: 'list',
            name: 'TeacherList',
            component: () => import('../views/faculty/TeacherList.vue')
          },
          {
            path: 'add',
            name: 'AddTeacher',
            component: () => import('../views/faculty/AddTeacher.vue')
          },
          {
            path: 'edit/:id',
            name: 'EditTeacher',
            component: () => import('../views/faculty/AddTeacher.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'teacher-details/:id',
            name: 'TeacherDetails',
            component: () => import('../views/faculty/TeacherDetails.vue'),
            meta: {
              requiresAuth: true,
              title: 'Teacher Details'
            }
          }
        ]
      },
      {
        path: 'messaging',
        name: 'Messaging',
        component: () => import('../views/messaging/MessagingApp.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'finance',
        children: [
          {
            path: '',
            name: 'Finance',
            redirect: '/finance/fees'
          },
          {
            path: 'transactions',
            name: 'Transactions',
            component: () => import('../views/finance/Transactions.vue')
          },
          {
            path: 'reports',
            name: 'Reports',
            component: () => import('../views/finance/Reports.vue')
          },
          {
            path: 'fees',
            name: 'FeeManagement',
            component: () => import('../views/finance/FeeManagement.vue')
          }
        ]
      },
      {
        path: 'fees',
        name: 'Fees',
        redirect: '/fees/collection'
      },
      {
        path: 'fees/collection',
        name: 'FeeCollection',
        component: () => import('../views/fees/FeeCollection.vue'),
        meta: { title: 'Fee Collection', icon: 'Money' }
      },
      {
        path: 'fees/manage',
        name: 'ManageFee',
        component: () => import('../views/fees/FeeManagement.vue'),
        meta: { title: 'Manage Fee' }
      },
      {
        path: '/fees/generate-challan',
        name: 'GenerateChallan',
        component: () => import('../views/fees/GenerateChallan.vue'),
        meta: { title: 'Generate Fee Challan' }
      },
      {
        path: '/fees/pay',
        name: 'PayFee',
        component: () => import('../views/fees/PayFee.vue'),
        meta: { title: 'Pay Fee' }
      },
      {
        path: '/fees/analytics',
        name: 'FeeAnalytics',
        component: () => import('../views/fees/FeeAnalytics.vue'),
        meta: { title: 'Fee Analytics' }
      },
      {
        path: '/fee-analytics/:section',
        name: 'FeeAnalyticsSection',
        component: () => import('../views/fees/analytics/AnalyticsSection.vue'),
        meta: { title: 'Fee Analytics Section' }
      },
      {
        path: 'students',
        children: [
          {
            path: '',
            name: 'Students',
            redirect: '/students/list'
          },
          {
            path: 'list',
            name: 'StudentList',
            component: () => import('../views/students/StudentList.vue'),
            meta: { requiresSession: true }
          },
          {
            path: 'add',
            name: 'AddStudent',
            component: () => import('../views/students/StudentRegistration.vue'),
            meta: {
              title: 'Add Student',
              requiresAuth: true
            }
          },
          {
            path: 'edit/:id',
            name: 'EditStudent',
            component: () => import('../views/students/StudentRegistration.vue'),
            meta: {
              title: 'Edit Student',
              requiresAuth: true
            }
          },
          {
            path: ':id',
            name: 'StudentDetail',
            component: () => import('../views/students/StudentDetail.vue'),
            meta: {
              title: 'Student Details',
              requiresAuth: true
            }
          },
          {
            path: 'attendance',
            name: 'Attendance',
            component: () => import('../views/students/Attendance.vue'),
            meta: {
              title: 'Student Attendance',
              requiresAuth: true
            }
          },
          {
            path: 'registration',
            name: 'Registration',
            component: () => import('../views/students/StudentRegistration.vue'),
            meta: {
              title: 'Student Registration',
              requiresAuth: true
            }
          },
          {
            path: ':id/generate-card',
            name: 'student-card-generate',
            component: () => import('@/views/students/StudentCardGenerate.vue'),
            meta: { 
              title: 'Generate Student Card',
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'reports',
        name: 'Reports',
        children: [
          {
            path: 'students',
            name: 'StudentReports',
            component: () => import('../views/reports/StudentReports.vue')
          },
          {
            path: 'students/class-wise',
            name: 'ClassWiseReport',
            component: () => import('../views/reports/ClassWiseReport.vue')
          },
          {
            path: 'students/family-wise',
            name: 'FamilyWiseReport',
            component: () => import('../views/reports/FamilyWiseReport.vue')
          },
          {
            path: 'teachers',
            name: 'TeacherReports',
            component: () => import('../views/reports/TeacherReports.vue')
          },
          {
            path: 'teachers/:section',
            name: 'TeacherReportsSection',
            component: () => import('../views/reports/TeacherReports.vue')
          }
        ]
      },
      {
        path: 'templates',
        name: 'Templates',
        children: [
          {
            path: ':section',
            name: 'TemplateGallery',
            component: () => import('../views/TemplateGallery.vue'),
            meta: { requiresAuth: true }
          }
        ]
      },
      {
        path: 'facility',
        children: [
          {
            path: '',
            name: 'Facility',
            redirect: '/facility/list'
          },
          {
            path: 'list',
            name: 'FacilityList',
            component: () => import('../views/facility/FacilityList.vue')
          },
          {
            path: 'maintenance',
            name: 'Maintenance',
            component: () => import('../views/facility/Maintenance.vue')
          }
        ]
      },
      {
        path: 'events',
        children: [
          {
            path: '',
            name: 'Events',
            redirect: '/events/calendar'
          },
          {
            path: 'list',
            name: 'EventList',
            component: () => import('../views/events/EventList.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'calendar',
            name: 'EventCalendar',
            component: () => import('../views/events/EventCalendar.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'create',
            name: 'CreateEvent',
            component: () => import('../views/events/EventForm.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'edit/:id',
            name: 'EditEvent',
            component: () => import('../views/events/EventForm.vue'),
            meta: { requiresAuth: true }
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            name: 'Settings',
            redirect: '/settings/school-profile'
          },
          {
            path: 'school-profile',
            name: 'SchoolProfile',
            component: () => import('../views/settings/SchoolProfile.vue'),
            meta: {
              title: 'School Profile',
              requiresAuth: true
            }
          },
          {
            path: 'sessions',
            name: 'SessionManagement',
            component: () => import('../views/settings/SessionManagement.vue'),
            meta: {
              title: 'Session Management',
              requiresAuth: true
            }
          },
          {
            path: 'general',
            name: 'GeneralSettings',
            component: () => import('../views/settings/GeneralSettings.vue')
          },
          {
            path: 'notifications',
            name: 'NotificationSettings',
            component: () => import('../views/settings/NotificationSettings.vue')
          }
        ]
      },
      {
        path: 'classes',
        name: 'Classes',
        children: [
          {
            path: 'list',
            name: 'ClassList',
            component: () => import('../views/classes/ClassList.vue')
          },
          {
            path: 'sections',
            name: 'ClassSections',
            component: () => import('../views/classes/ClassSections.vue')
          }
        ]
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'exams',
        name: 'Exams',
        redirect: '/exams/add-marksheet-landing',
        children: [
          // ============================================
          // LEVEL-1 LANDING PAGES (ONLY 3 MAIN SECTIONS)
          // ============================================
          {
            path: 'add-marksheet-landing',
            name: 'AddMarksheetLanding',
            component: () => import('../views/exams/AddMarksheetLanding.vue'),
            meta: { title: 'Add Marksheet', requiresAuth: true }
          },
          {
            path: 'academic-landing',
            name: 'AcademicLanding',
            component: () => import('../views/exams/AcademicLanding.vue'),
            meta: { title: 'Academic', requiresAuth: true }
          },
          {
            path: 'create-paper-landing',
            name: 'CreatePaperLanding',
            component: () => import('../views/exams/CreatePaperLanding.vue'),
            meta: { title: 'Create Paper', requiresAuth: true }
          },
          
          // ============================================
          // ADD MARKSHEET SECTION (Level-2 Pages)
          // ============================================
          {
            path: 'marksheet-subject-wise',
            name: 'MarksheetSubjectWise',
            component: () => import('../views/exams/MarksheetSubjectWise.vue'),
            meta: { title: 'Subject-wise Marksheet', requiresAuth: true }
          },
          {
            path: 'marksheet-class-wise',
            name: 'MarksheetClassWise',
            component: () => import('../views/exams/MarksheetClassWise.vue'),
            meta: { title: 'Class-wise Marksheet', requiresAuth: true }
          },
          {
            path: 'marksheet-student-wise',
            name: 'MarksheetStudentWise',
            component: () => import('../views/exams/MarksheetStudentWise.vue'),
            meta: { title: 'Student-wise Marksheet', requiresAuth: true }
          },
          {
            path: 'marksheet-family-wise',
            name: 'MarksheetFamilyWise',
            component: () => import('../views/exams/MarksheetFamilyWise.vue'),
            meta: { title: 'Family-wise Marksheet', requiresAuth: true }
          },
          
          // ============================================
          // ACADEMIC SECTION (Level-2 Pages)
          // ============================================
          {
            path: 'verify-marks',
            name: 'VerifyMarks',
            component: () => import('../views/exams/VerifyMarks.vue'),
            meta: { title: 'Verify Marks', requiresAuth: true }
          },
          {
            path: 'approve-marks',
            name: 'ApproveMarks',
            component: () => import('../views/exams/ApproveMarks.vue'),
            meta: { title: 'Approve Marks', requiresAuth: true }
          },
          {
            path: 'generate-results',
            name: 'GenerateResults',
            component: () => import('../views/exams/GenerateResults.vue'),
            meta: { title: 'Generate Results', requiresAuth: true }
          },
          {
            path: 'publish-results',
            name: 'PublishResults',
            component: () => import('../views/exams/PublishResults.vue'),
            meta: { title: 'Publish Results', requiresAuth: true }
          },
          {
            path: 'download-marksheets',
            name: 'DownloadMarksheets',
            component: () => import('../views/exams/DownloadMarksheets.vue'),
            meta: { title: 'Download Marksheets', requiresAuth: true }
          },
          {
            path: 'print-marksheets',
            name: 'PrintMarksheets',
            component: () => import('../views/exams/PrintMarksheets.vue'),
            meta: { title: 'Print Marksheets', requiresAuth: true }
          },
          {
            path: 'academic-reports',
            name: 'AcademicReports',
            component: () => import('../views/exams/AcademicReports.vue'),
            meta: { title: 'Academic Reports', requiresAuth: true }
          },
          
          // ============================================
          // CREATE PAPER SECTION (Level-2 Pages)
          // ============================================
          {
            path: 'create-exam-paper',
            name: 'CreateExamPaper',
            component: () => import('../views/exams/CreateExamPaper.vue'),
            meta: { title: 'Create Exam Paper', requiresAuth: true }
          },
          {
            path: 'datesheet',
            name: 'DatesheetManagement',
            component: () => import('../views/exams/DatesheetManagement.vue'),
            meta: { title: 'Make Datesheet', requiresAuth: true }
          },
          {
            path: 'paper-settings',
            name: 'PaperSettings',
            component: () => import('../views/exams/PaperSettings.vue'),
            meta: { title: 'Paper Settings', requiresAuth: true }
          },
          
          // ============================================
          // LEGACY ROUTES (Keep for backward compatibility - hidden from sidebar)
          // ============================================
          {
            path: 'center',
            name: 'ExamCenter',
            component: () => import('../views/exams/ExamCenter.vue'),
            meta: { title: 'Exam Center', requiresAuth: true, hidden: true }
          },
          {
            path: 'papers',
            name: 'ExamPapers',
            component: () => import('../views/exams/ExamPapers.vue'),
            meta: { title: 'Papers', requiresAuth: true, hidden: true }
          },
          {
            path: 'papers/:id',
            name: 'PaperDetail',
            component: () => import('../views/exams/PaperDetail.vue'),
            meta: { title: 'Paper Details', requiresAuth: true, hidden: true }
          },
          {
            path: 'marks-entry',
            name: 'MarksEntry',
            component: () => import('../views/exams/MarksEntry.vue'),
            meta: { title: 'Marks Entry', requiresAuth: true, hidden: true }
          },
          {
            path: 'marks-verification',
            name: 'MarksVerification',
            component: () => import('../views/exams/MarksVerification.vue'),
            meta: { title: 'Marks Verification', requiresAuth: true, hidden: true }
          },
          {
            path: 'results',
            name: 'ExamResults',
            component: () => import('../views/exams/ExamResults.vue'),
            meta: { title: 'Results', requiresAuth: true, hidden: true }
          },
          {
            path: 'marksheets',
            name: 'Marksheets',
            component: () => import('../views/exams/Marksheets.vue'),
            meta: { title: 'Marksheets', requiresAuth: true, hidden: true }
          },
          {
            path: 'terms',
            name: 'ExamTerms',
            component: () => import('../views/exams/ExamTerms.vue'),
            meta: { title: 'Exam Terms', requiresAuth: true, hidden: true }
          },
          {
            path: 'view-marksheet',
            name: 'ViewMarksheet',
            component: () => import('../views/exams/ViewMarksheet.vue'),
            meta: { hidden: true }
          },
          {
            path: 'mark-report',
            name: 'MarkReport',
            component: () => import('../views/exams/MarkReport.vue'),
            meta: { hidden: true }
          },
          {
            path: 'award-list',
            name: 'AwardList',
            component: () => import('../views/exams/AwardList.vue'),
            meta: { hidden: true }
          },
          {
            path: 'manage',
            name: 'ManageExams',
            component: ManageExams,
            meta: { hidden: true }
          }
        ]
      },
      {
        path: 'messaging',
        name: 'Messaging',
        component: () => import('../views/messaging/MessagingApp.vue'),
        meta: { requiresAuth: true }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/reports/students',
    component: () => import('@/views/reports/StudentReports.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/reports/students/class-wise',
    component: () => import('@/views/reports/ClassWiseReport.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/reports/students/family-wise',
    component: () => import('@/views/reports/FamilyWiseReport.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Router guard - Check authentication, onboarding, and session requirement
router.beforeEach(async (to, from, next) => {
  // Import stores dynamically to avoid circular dependencies
  try {
    const { useAuthStore } = await import('@/stores/auth')
    const { useSessionStore } = await import('@/stores/session')
    const authStore = useAuthStore()
    const sessionStore = useSessionStore()
    const isAuthenticated = localStorage.getItem('user') || authStore.isAuthenticated
    
    // If route requires auth and user is not authenticated
    if (to.meta.requiresAuth && !isAuthenticated) {
      // Store the attempted URL to redirect back after login
      next({ 
        name: 'Login',
        query: { redirect: to.fullPath }
      })
      return
    }
    
    // If route requires guest (login page) and user is authenticated
    if (to.meta.requiresGuest && isAuthenticated) {
      // Only redirect to dashboard if explicitly trying to access login page
      if (to.name === 'Login') {
        next({ name: 'Dashboard' })
        return
      }
    }
    
    // Check if route requires authentication
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    
    if (requiresAuth && !authStore.isAuthenticated) {
      // Redirect to login with return URL
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
      return
    }
    
    // Onboarding checks for authenticated users
    if (isAuthenticated) {
      // Routes that don't require onboarding completion
      // CRITICAL FIX: Include ALL Settings routes to prevent forced redirects
      const onboardingRoutes = [
        'SchoolProfile', 
        'SessionManagement', 
        'GeneralSettings',      // ✅ ALLOW General Settings
        'NotificationSettings', // ✅ ALLOW Notification Settings
        'Login', 
        'Logout',
        'Profile',              // ✅ ALLOW User Profile
        'Messaging'             // ✅ ALLOW Messaging (school admins need access)
      ]
      
      // Skip onboarding checks for onboarding routes and public routes
      if (!onboardingRoutes.includes(to.name)) {
        try {
          // Check onboarding status
          const api = (await import('@/utils/axios')).default
          const response = await api.get('/settings/school/onboarding-status')
          
          if (response.data.success) {
            const { profile_complete, has_active_session, next_step } = response.data.data
            
            // Redirect to school profile if not complete
            // ONLY for dashboard/main routes, NOT for settings
            if (!profile_complete && to.name !== 'SchoolProfile' && !to.path.startsWith('/settings/')) {
              next({ name: 'SchoolProfile' })
              return
            }
            
            // Redirect to session management if profile complete but no session
            // ONLY for dashboard/main routes, NOT for settings
            // CRITICAL FIX: Don't block settings pages!
            if (profile_complete && !has_active_session && 
                to.name !== 'SessionManagement' && 
                !to.path.startsWith('/settings/')) {
              // Only redirect if trying to access main app routes (dashboard, classes, etc.)
              const mainAppRoutes = ['Dashboard', 'ClassList', 'StudentList', 'TeacherList', 'ExamCenter']
              if (mainAppRoutes.includes(to.name) || to.name === 'Home') {
                next({ name: 'SessionManagement' })
                return
              }
            }
          }
        } catch (error) {
          // If onboarding check fails, allow navigation (don't block user)
          console.warn('Onboarding check failed:', error)
        }
      }
    }
    
    // =====================================================
    // SESSION REQUIREMENT CHECK (Centralized)
    // =====================================================
    // Check if route requires session (via meta or path matching)
    const requiresSession = to.meta.requiresSession || isSessionRequiredRoute(to.path)
    
    if (requiresSession && isAuthenticated) {
      // Initialize session store if needed
      if (!sessionStore.currentSession && !sessionStore.isLoading) {
        await sessionStore.loadCurrentSession()
      }
      
      // Check if session exists
      if (!sessionStore.hasActiveSession) {
        const { useSessionGuard } = await import('@/composables/useSessionGuard')
        const { showSessionRequiredAlert } = useSessionGuard()
        await showSessionRequiredAlert()
        next(false) // Abort navigation
        return
      }
    }
    
    next()
  } catch (error) {
    // If store fails to load, allow navigation (fallback)
    console.error('Router guard error:', error)
    next()
  }
})

/**
 * Helper: Check if path requires session
 * Matches common module paths
 */
function isSessionRequiredRoute(path) {
  const sessionRequiredPaths = [
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
  
  return sessionRequiredPaths.some(module => path.startsWith(module))
}

export default router
