import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import ManageExams from '@/views/exams/ManageExams.vue'
import AddMarksheetSubjectWise from '@/views/exams/AddMarksheetSubjectWise.vue'

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
        name: 'Admin',
        children: [
          {
            path: '',
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
        name: 'Faculty',
        children: [
          {
            path: '',
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
        path: 'slack',
        name: 'SlackIntegration',
        component: () => import('../views/slack/SlackIntegration.vue'),
      },
      {
        path: 'finance',
        name: 'Finance',
        children: [
          {
            path: '',
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
        name: 'Students',
        children: [
          {
            path: '',
            redirect: '/students/list'
          },
          {
            path: 'list',
            name: 'StudentList',
            component: () => import('../views/students/StudentList.vue')
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
            component: () => import('../views/students/Attendance.vue')
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
        name: 'Facility',
        children: [
          {
            path: '',
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
        name: 'Events',
        children: [
          {
            path: '',
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
        name: 'Settings',
        children: [
          {
            path: '',
            redirect: '/settings/general'
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
          },
          {
            path: 'subjects',
            name: 'ClassSubjects',
            component: () => import('../views/classes/ClassSubjects.vue')
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
        children: [
          {
            path: 'add-marksheet',
            name: 'AddMarksheet',
            component: () => import('../views/exams/AddMarksheet.vue')
          },
          {
            path: 'view-marksheet',
            name: 'ViewMarksheet',
            component: () => import('../views/exams/ViewMarksheet.vue')
          },
          {
            path: 'mark-report',
            name: 'MarkReport',
            component: () => import('../views/exams/MarkReport.vue')
          },
          {
            path: 'award-list',
            name: 'AwardList',
            component: () => import('../views/exams/AwardList.vue')
          },
          {
            path: 'manage',
            name: 'ManageExams',
            component: ManageExams
          },
          {
            path: 'add-marksheet-subjectwise',
            name: 'AddMarksheetSubjectWise',
            component: AddMarksheetSubjectWise
          }
        ]
      },
      {
        path: 'messaging',
        name: 'Messaging',
        component: () => import('../views/messaging/TeamChat.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'slack',
        name: 'SlackIntegration',
        component: () => import('../views/slack/SlackIntegration.vue'),
        meta: { requiresAuth: true }
      }
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

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user')
  
  // If route requires auth and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Store the attempted URL to redirect back after login
    next({ 
      name: 'Login',
      query: { redirect: to.fullPath }
    })
  }
  // If route requires guest (login page) and user is authenticated
  else if (to.meta.requiresGuest && isAuthenticated) {
    // Only redirect to dashboard if explicitly trying to access login page
    if (to.name === 'Login') {
      next({ name: 'Dashboard' })
    } else {
      next()
    }
  }
  // Otherwise proceed normally
  else {
    next()
  }
})

export default router 