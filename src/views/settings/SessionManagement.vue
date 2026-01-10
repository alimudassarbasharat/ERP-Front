<template>
  <div class="relative w-full min-h-screen pl-0 pr-0 sm:pl-0 sm:pr-0 lg:pl-1 lg:pr-0 py-2 sm:py-3 lg:py-4" key="session-management-root">
    <!-- Top Bar Header -->
    <div class="relative z-10 w-full mt-2 mb-4 flex items-center justify-between bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200 dark:border-gray-700">
      <h2 class="text-base font-medium text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
        Session Management
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-600 dark:text-gray-400">
        <span class="hover:text-pink-600 dark:hover:text-pink-400 cursor-pointer transition-colors duration-200" @click="$router.push('/dashboard')">Dashboard</span>
        <span class="mx-2 dark:text-gray-600">|</span>
        <span class="hover:text-pink-600 dark:hover:text-pink-400 cursor-pointer transition-colors duration-200">Settings</span>
        <span class="mx-2 dark:text-gray-600">|</span>
        <span class="text-gray-900 dark:text-white font-bold">Sessions</span>
      </nav>
    </div>

    <!-- Stats Cards -->
    <div class="relative z-10 w-full grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
      <div class="bg-white dark:bg-gray-800/90 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Sessions</div>
        <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ statistics.total_sessions }}</div>
      </div>
      <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
        <div class="text-sm text-green-600 dark:text-green-400 mb-1">Active Sessions</div>
        <div class="text-2xl font-bold text-green-700 dark:text-green-400">{{ statistics.active_sessions }}</div>
      </div>
      <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-700">
        <div class="text-sm text-yellow-600 dark:text-yellow-400 mb-1">Draft Sessions</div>
        <div class="text-2xl font-bold text-yellow-700 dark:text-yellow-400">{{ statistics.draft_sessions }}</div>
      </div>
      <div class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Archived Sessions</div>
        <div class="text-2xl font-bold text-gray-700 dark:text-gray-400">{{ statistics.archived_sessions }}</div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 w-full">
      <div class="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        
        <!-- Header with Add Button -->
        <div class="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Academic Sessions</h3>
          
          <!-- Show Add New Session button ONLY if sessions already exist -->
          <!-- This follows real school usage: creating additional sessions is deliberate action -->
          <button
            v-if="!loading && sessions.length > 0"
            @click="confirmAddNewSession"
            class="px-4 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border-2 border-purple-500 dark:border-purple-400 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium hover:shadow-md"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Add New Session
          </button>
        </div>

        <!-- Sessions Table -->
        <!-- Table Loading State -->
        <TableLoader v-if="loading" message="Loading sessions..." />
        
        <!-- Empty State -->
        <div v-else-if="!loading && sessions.length === 0" class="p-12 text-center">
          <div class="flex flex-col items-center justify-center">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Academic Sessions Yet</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1 max-w-md">Sessions define your school's academic year periods (e.g., 2025-2026)</p>
            <p class="text-xs text-gray-500 dark:text-gray-500 mb-4 max-w-md italic">Note: Complete your School Profile in General Settings before creating sessions</p>
            <button
              @click="openCreateModal"
              class="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <svg class="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Create First Session
            </button>
          </div>
        </div>
        
        <!-- Table Content -->
        <div v-else-if="!loading && sessions.length > 0" class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Session Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dates</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
              <tr v-for="session in sessions" :key="session.id" class="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors duration-200">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <div v-if="session.is_active" class="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <div class="font-medium text-gray-900 dark:text-white">{{ session.name }}</div>
                      <div v-if="session.description" class="text-sm text-gray-500 dark:text-gray-400">{{ session.description }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  <div v-if="session.start_date && session.end_date">
                    {{ formatDate(session.start_date) }} - {{ formatDate(session.end_date) }}
                  </div>
                  <div v-else class="text-gray-400">Not set</div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {{ getDuration(session) }}
                </td>
                <td class="px-6 py-4">
                  <span :class="[
                    'px-3 py-1 rounded-full text-xs font-medium',
                    session.is_active ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                    session.status === 'draft' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                  ]">
                    {{ session.is_active ? 'Active' : session.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      v-if="!session.is_active && session.status !== 'archived'"
                      @click="activateSession(session)"
                      class="px-3 py-1 bg-green-100 hover:bg-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg transition-all duration-200 text-sm"
                    >
                      Activate
                    </button>
                    <button
                      v-if="session.is_active"
                      @click="archiveSession(session)"
                      class="px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200 text-sm"
                    >
                      Archive
                    </button>
                    <button
                      @click="editSession(session)"
                      class="px-3 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg transition-all duration-200 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      v-if="!session.is_active"
                      @click="deleteSession(session)"
                      class="px-3 py-1 bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg transition-all duration-200 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ editingSession ? 'Edit Session' : 'Create New Session' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <form @submit.prevent="saveSession" class="p-6 space-y-6">
          <!-- Session Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Session Name <span class="text-red-500">*</span>
            </label>
            <input
              v-model="formData.name"
              type="text"
              :class="[
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200',
                errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              ]"
              placeholder="e.g., 2025-2026"
            />
            <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              v-model="formData.description"
              rows="3"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
              placeholder="Academic session 2025-2026"
            ></textarea>
          </div>

          <!-- Start and End Dates -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start Date <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.start_date"
                type="date"
                :class="[
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200',
                  errors.start_date ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                ]"
              />
              <p v-if="errors.start_date" class="text-red-500 text-sm mt-1">{{ errors.start_date }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                End Date <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.end_date"
                type="date"
                :class="[
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200',
                  errors.end_date ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                ]"
              />
              <p v-if="errors.end_date" class="text-red-500 text-sm mt-1">{{ errors.end_date }}</p>
            </div>
          </div>

          <!-- Notes -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Notes
            </label>
            <textarea
              v-model="formData.notes"
              rows="3"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
              placeholder="Additional notes or information"
            ></textarea>
          </div>

          <!-- Submit Buttons -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              @click="closeModal"
              class="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              <div v-if="saving" class="flex items-center gap-2">
                <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </div>
              <span v-else>{{ editingSession ? 'Update Session' : 'Create Session' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'
import TableLoader from '@/components/TableLoader.vue'
import { Swal } from '@/utils/sweetalert'

export default {
  name: 'SessionManagement',
  components: {
    TableLoader
  },
  data() {
    return {
      sessions: [],
      statistics: {
        total_sessions: 0,
        active_sessions: 0,
        draft_sessions: 0,
        archived_sessions: 0
      },
      showModal: false,
      editingSession: null,
      loading: false,
      saving: false,
      formData: {
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        notes: ''
      },
      errors: {}
    }
  },
  setup() {
    // Use toast composable - same pattern as existing project (ExamTerms.vue, CreateFee.vue)
    const toast = useToast()
    return { toast }
  },
  async mounted() {
    // Ensure API client is available before loading
    try {
      this.getApiClient()
      await this.loadSessions()
    } catch (error) {
      console.error('Component initialization error:', error)
      if (this.toast) {
        this.toast.error('Failed to initialize. Please refresh the page.')
      }
    }
  },
  methods: {
    getApiClient() {
      // Command loader pattern - try multiple sources
      // Priority: $api (global) > $http (global) > window.axios
      if (this.$api && typeof this.$api.get === 'function') {
        return this.$api
      }
      if (this.$http && typeof this.$http.get === 'function') {
        return this.$http
      }
      if (window.axios && typeof window.axios.get === 'function') {
        return window.axios
      }
      // If none available, throw clear error
      const error = new Error('API client not available. Please refresh the page.')
      console.error('API Client Error:', error)
      throw error
    },

    showToast(type, message) {
      // Use toast from setup() - same pattern as existing project (ExamTerms.vue, CreateFee.vue)
      if (this.toast && typeof this.toast[type] === 'function') {
        this.toast[type](message)
      } else {
        // Fallback to console only (no alert in production)
        const method = type === 'error' ? 'error' : type === 'success' ? 'log' : 'log'
        console[method](`${type.toUpperCase()}: ${message}`)
      }
    },

    async loadSessions() {
      this.loading = true
      try {
        const apiClient = this.getApiClient()
        
        console.log('🔍 Loading sessions...')
        
        // Fetch sessions list using dedicated listing endpoint
        const listResponse = await apiClient.get('/sessions/list')
        
        // Fetch statistics from main endpoint
        const statsResponse = await apiClient.get('/sessions')
        
        console.log('📊 Sessions List API Response:', listResponse?.data)
        console.log('📈 Sessions Stats API Response:', statsResponse?.data)
        
        // Handle sessions list response with better error checking
        if (listResponse && listResponse.data) {
          if (listResponse.data.success === true) {
            // Check if data is array
            if (Array.isArray(listResponse.data.data)) {
              this.sessions = listResponse.data.data
              console.log(`✅ Loaded ${this.sessions.length} session(s)`)
            } else {
              console.warn('⚠️ API returned success but data is not an array:', listResponse.data.data)
              this.sessions = []
            }
          } else {
            console.warn('⚠️ API returned success=false:', listResponse.data.message)
            this.sessions = []
            
            // Show helpful message if no sessions found
            if (listResponse.data.message && !listResponse.data.message.includes('Failed')) {
              this.showToast('info', 'ℹ️ ' + listResponse.data.message)
            }
          }
        } else {
          console.error('❌ Invalid API response structure')
          this.sessions = []
        }
        
        // Handle statistics response
        if (statsResponse && statsResponse.data && statsResponse.data.success) {
          if (statsResponse.data.data && statsResponse.data.data.statistics) {
            this.statistics = statsResponse.data.data.statistics
            console.log('📊 Statistics loaded:', this.statistics)
          }
        }
        
        // Final debug log
        if (this.sessions.length === 0) {
          console.log('⚠️ No sessions loaded - Check:')
          console.log('  1. Does merchant have any sessions in database?')
          console.log('  2. Are sessions filtered by correct merchant_id?')
          console.log('  3. Check backend logs for query details')
        }
      } catch (error) {
        console.error('❌ Failed to load sessions:', error)
        console.error('Error details:', {
          status: error?.response?.status,
          message: error?.response?.data?.message,
          data: error?.response?.data
        })
        
        const errorMessage = error?.response?.data?.message || error?.message || 'Failed to load sessions'
        this.showToast('error', '❌ ' + errorMessage)
        this.sessions = []
      } finally {
        this.loading = false
      }
    },

    openCreateModal() {
      this.editingSession = null
      this.formData = {
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        notes: ''
      }
      this.errors = {}
      this.showModal = true
    },

    async confirmAddNewSession() {
      // Real school usage: Creating additional sessions is a deliberate action
      // Show SweetAlert confirmation (perfect on all devices)
      const result = await Swal.fire({
        title: '📅 Create New Academic Session?',
        html: `
          <div style="text-align: left; padding: 0.5rem; font-size: 14px; color: #64748b;">
            <p style="margin-bottom: 0.75rem;">You already have <strong>${this.sessions.length}</strong> session(s).</p>
            <div style="background: #f8fafc; padding: 0.75rem; border-radius: 8px; margin-bottom: 0.5rem; border-left: 3px solid #8b5cf6;">
              <p style="margin: 0.25rem 0; font-size: 13px;">✓ This will create an ADDITIONAL session</p>
              <p style="margin: 0.25rem 0; font-size: 13px;">✓ Existing sessions will remain unchanged</p>
              <p style="margin: 0.25rem 0; font-size: 13px;">✓ Only ONE session can be active at a time</p>
            </div>
            <p style="margin-top: 0.75rem; font-weight: 500; color: #475569;">Proceed with creating a new session?</p>
          </div>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#8b5cf6',
        cancelButtonColor: '#6b7280',
        confirmButtonText: '✓ Yes, Create Session',
        cancelButtonText: '✕ Cancel',
        width: '420px',
        customClass: {
          popup: 'swal-modern-popup',
          title: 'swal-modern-title',
          confirmButton: 'swal-confirm-btn',
          cancelButton: 'swal-cancel-btn'
        },
        buttonsStyling: false,
        backdrop: 'rgba(0, 0, 0, 0.4)'
      })
      
      if (result.isConfirmed) {
        this.openCreateModal()
      }
    },

    editSession(session) {
      this.editingSession = session
      this.formData = {
        name: session.name || '',
        description: session.description || '',
        start_date: session.start_date || '',
        end_date: session.end_date || '',
        notes: session.notes || ''
      }
      this.errors = {}
      this.showModal = true
    },

    closeModal() {
      this.showModal = false
      this.editingSession = null
      this.errors = {}
    },

    async saveSession() {
      // Validate required fields
      if (!this.formData.name || !this.formData.name.trim()) {
        this.errors.name = 'Session name is required'
        this.showToast('error', '⚠️ Please enter a session name')
        return
      }
      
      if (!this.formData.start_date) {
        this.errors.start_date = 'Start date is required'
        this.showToast('error', '⚠️ Please select a start date')
        return
      }
      
      if (!this.formData.end_date) {
        this.errors.end_date = 'End date is required'
        this.showToast('error', '⚠️ Please select an end date')
        return
      }
      
      if (new Date(this.formData.start_date) >= new Date(this.formData.end_date)) {
        this.errors.end_date = 'End date must be after start date'
        this.showToast('error', '⚠️ End date must be after start date')
        return
      }

      this.saving = true
      this.errors = {}

      try {
        const apiClient = this.getApiClient()
        
        let response
        if (this.editingSession && this.editingSession.id) {
          response = await apiClient.post(`/sessions/${this.editingSession.id}/update`, this.formData)
        } else {
          response = await apiClient.post('/sessions/store', this.formData)
        }

        if (response && response.data && response.data.success) {
          this.showToast('success', this.editingSession ? '✅ Session updated successfully!' : '🎉 Session created successfully!')
          this.closeModal()
          await this.loadSessions()
        } else {
          this.showToast('error', '❌ ' + (response?.data?.message || 'Failed to save session'))
        }
      } catch (error) {
        console.error('Save error:', error)
        
        // Handle validation errors (422)
        if (error.response && error.response.status === 422) {
          const errorData = error.response.data || {}
          
          // Extract user-friendly error message
          let errorMessage = 'Validation failed. Please check the form.'
          
          if (errorData.errors && typeof errorData.errors === 'object') {
            this.errors = errorData.errors
            const firstError = Object.values(errorData.errors)[0]
            if (Array.isArray(firstError) && firstError.length > 0) {
              errorMessage = firstError[0]
            } else if (typeof firstError === 'string') {
              errorMessage = firstError
            }
          } else if (errorData.message) {
            errorMessage = errorData.message
            
            // Check for school profile missing error
            if (errorMessage.includes('School profile must be completed')) {
              errorMessage = '⚠️ Please complete your School Profile in General Settings before creating sessions.'
              // Optionally, show additional guidance
              setTimeout(() => {
                this.showToast('info', '💡 Tip: Navigate to Settings > General to set up your school profile first.')
              }, 2000)
            }
          }
          
          this.showToast('error', errorMessage)
        } 
        // Handle database/unique constraint errors (500 or other)
        else if (error.response && error.response.data) {
          const errorData = error.response.data
          let errorMessage = 'Failed to save session. Please try again.'
          
          // Extract user-friendly message from error response
          if (errorData.message) {
            errorMessage = errorData.message
            
            // Check for school profile missing error
            if (errorMessage.includes('School profile must be completed')) {
              errorMessage = '⚠️ Please complete your School Profile in General Settings before creating sessions.'
              setTimeout(() => {
                this.showToast('info', '💡 Tip: Navigate to Settings > General to set up your school profile first.')
              }, 2000)
            }
            // Clean up database error messages for user
            else if (errorMessage.includes('duplicate key') || errorMessage.includes('Unique violation')) {
              if (errorMessage.includes('sessions_name_unique')) {
                errorMessage = '⚠️ A session with this name already exists. Please choose a different name.'
              } else {
                errorMessage = '⚠️ This session name is already taken. Please choose a different name.'
              }
            }
          } else if (errorData.error) {
            // Check error field for database errors
            const dbError = errorData.error
            if (dbError.includes('duplicate key') || dbError.includes('Unique violation')) {
              if (dbError.includes('sessions_name_unique')) {
                errorMessage = '⚠️ A session with this name already exists. Please choose a different name.'
              } else {
                errorMessage = '⚠️ This session name is already taken. Please choose a different name.'
              }
            } else {
              errorMessage = dbError
            }
          }
          
          this.showToast('error', errorMessage)
        } 
        // Handle network/other errors
        else if (error.message) {
          this.showToast('error', '❌ ' + error.message)
        } else {
          this.showToast('error', '❌ Failed to save session. Please try again.')
        }
      } finally {
        this.saving = false
      }
    },

    async activateSession(session) {
      if (!session || !session.id) {
        this.showToast('error', '❌ Invalid session data')
        return
      }

      const result = await Swal.fire({
        title: '✓ Activate Session?',
        html: `
          <div style="text-align: left; padding: 0.5rem; font-size: 14px;">
            <p style="margin-bottom: 0.75rem; font-weight: 600; color: #1e293b;">Session: <span style="color: #8b5cf6;">${session.name || 'this session'}</span></p>
            <div style="background: #fef3c7; padding: 0.75rem; border-radius: 8px; border-left: 3px solid #f59e0b; margin-bottom: 0.75rem;">
              <p style="margin: 0; font-size: 13px; color: #92400e;">⚠️ This will deactivate ALL other sessions</p>
            </div>
            <div style="background: #f0fdf4; padding: 0.75rem; border-radius: 8px; border-left: 3px solid #10b981;">
              <p style="margin: 0.25rem 0; font-size: 13px; color: #065f46;">✓ This will become the active academic year</p>
              <p style="margin: 0.25rem 0; font-size: 13px; color: #065f46;">✓ All system operations will use this session</p>
            </div>
          </div>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#6b7280',
        confirmButtonText: '✓ Yes, Activate',
        cancelButtonText: '✕ Cancel',
        width: '440px',
        customClass: {
          popup: 'swal-modern-popup',
          confirmButton: 'swal-confirm-btn',
          cancelButton: 'swal-cancel-btn'
        },
        buttonsStyling: false,
        backdrop: 'rgba(0, 0, 0, 0.4)'
      })

      if (!result.isConfirmed) return

      try {
        const apiClient = this.getApiClient()
        const response = await apiClient.post(`/sessions/${session.id}/activate`)
        if (response && response.data && response.data.success) {
          this.showToast('success', '✅ Session activated successfully!')
          await this.loadSessions()
        } else {
          this.showToast('error', '❌ ' + (response?.data?.message || 'Failed to activate session'))
        }
      } catch (error) {
        console.error('Activation error:', error)
        const errorMsg = error?.response?.data?.message || error?.message || 'Failed to activate session'
        this.showToast('error', '❌ ' + errorMsg)
      }
    },

    async archiveSession(session) {
      if (!session || !session.id) {
        this.showToast('error', '❌ Invalid session data')
        return
      }

      const result = await Swal.fire({
        title: '📦 Archive Session?',
        html: `
          <div style="text-align: left; padding: 0.5rem; font-size: 14px;">
            <p style="margin-bottom: 0.75rem; font-weight: 600; color: #1e293b;">Session: <span style="color: #8b5cf6;">${session.name || 'this session'}</span></p>
            <div style="background: #fef3c7; padding: 0.75rem; border-radius: 8px; border-left: 3px solid #f59e0b;">
              <p style="margin: 0.25rem 0; font-size: 13px; color: #92400e;">✓ Session will be marked as archived</p>
              <p style="margin: 0.25rem 0; font-size: 13px; color: #92400e;">✓ It will no longer be active</p>
              <p style="margin: 0.25rem 0; font-size: 13px; color: #92400e;">✓ You can still view archived data</p>
            </div>
          </div>
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#f59e0b',
        cancelButtonColor: '#6b7280',
        confirmButtonText: '✓ Yes, Archive',
        cancelButtonText: '✕ Cancel',
        width: '420px',
        customClass: {
          popup: 'swal-modern-popup',
          confirmButton: 'swal-confirm-btn',
          cancelButton: 'swal-cancel-btn'
        },
        buttonsStyling: false,
        backdrop: 'rgba(0, 0, 0, 0.4)'
      })

      if (!result.isConfirmed) return

      try {
        const apiClient = this.getApiClient()
        const response = await apiClient.post(`/sessions/${session.id}/archive`)
        if (response && response.data && response.data.success) {
          this.showToast('success', '✅ Session archived successfully!')
          await this.loadSessions()
        } else {
          this.showToast('error', '❌ ' + (response?.data?.message || 'Failed to archive session'))
        }
      } catch (error) {
        console.error('Archive error:', error)
        const errorMsg = error?.response?.data?.message || error?.message || 'Failed to archive session'
        this.showToast('error', '❌ ' + errorMsg)
      }
    },

    async deleteSession(session) {
      if (!session || !session.id) {
        this.showToast('error', '❌ Invalid session data')
        return
      }

      const result = await Swal.fire({
        title: '🗑️ Delete Session?',
        html: `
          <div style="text-align: left; padding: 0.5rem; font-size: 14px;">
            <p style="margin-bottom: 0.75rem; font-weight: 600; color: #1e293b;">Session: <span style="color: #8b5cf6;">${session.name || 'this session'}</span></p>
            <div style="background: #fee2e2; padding: 0.75rem; border-radius: 8px; border-left: 3px solid #ef4444; margin-bottom: 0.75rem;">
              <p style="margin: 0; font-weight: 700; font-size: 14px; color: #991b1b;">⚠️ WARNING: This action CANNOT be undone!</p>
            </div>
            <div style="background: #fef2f2; padding: 0.75rem; border-radius: 8px;">
              <p style="margin: 0.25rem 0; font-size: 13px; color: #7f1d1d;">✕ Session will be permanently removed</p>
              <p style="margin: 0.25rem 0; font-size: 13px; color: #7f1d1d;">✕ All associated data will be lost</p>
              <p style="margin: 0.25rem 0; font-size: 13px; color: #7f1d1d;">✕ This operation is irreversible</p>
            </div>
          </div>
        `,
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: '✓ Yes, Delete Permanently',
        cancelButtonText: '✕ Cancel',
        width: '440px',
        customClass: {
          popup: 'swal-modern-popup',
          confirmButton: 'swal-delete-btn-danger',
          cancelButton: 'swal-cancel-btn'
        },
        buttonsStyling: false,
        backdrop: 'rgba(0, 0, 0, 0.5)'
      })

      if (!result.isConfirmed) return

      try {
        const apiClient = this.getApiClient()
        const response = await apiClient.delete(`/sessions/${session.id}`)
        if (response && response.data && response.data.success) {
          this.showToast('success', '✅ Session deleted successfully!')
          await this.loadSessions()
        } else {
          this.showToast('error', '❌ ' + (response?.data?.message || 'Failed to delete session'))
        }
      } catch (error) {
        console.error('Delete error:', error)
        const errorMsg = error?.response?.data?.message || error?.message || 'Failed to delete session'
        this.showToast('error', '❌ ' + errorMsg)
      }
    },

    formatDate(date) {
      if (!date) return ''
      try {
        const d = new Date(date)
        if (isNaN(d.getTime())) return ''
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      } catch (e) {
        return ''
      }
    },

    getDuration(session) {
      if (!session || !session.start_date || !session.end_date) return 'N/A'
      try {
        const start = new Date(session.start_date)
        const end = new Date(session.end_date)
        if (isNaN(start.getTime()) || isNaN(end.getTime())) return 'N/A'
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
        return `${days} days`
      } catch (e) {
        return 'N/A'
      }
    }
  }
}
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

/* SweetAlert2 Custom Styles - Perfect on all devices */
:deep(.swal-modern-popup) {
  border-radius: 16px !important;
  padding: 1.5rem !important;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
}

:deep(.swal-modern-title) {
  font-size: 1.25rem !important;
  font-weight: 700 !important;
  color: #1e293b !important;
  margin-bottom: 1rem !important;
}

:deep(.swal-confirm-btn) {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%) !important;
  color: white !important;
  padding: 0.625rem 1.5rem !important;
  border-radius: 8px !important;
  font-weight: 600 !important;
  font-size: 14px !important;
  transition: all 0.2s !important;
  border: none !important;
  box-shadow: 0 4px 6px -1px rgba(139, 92, 246, 0.3) !important;
}

:deep(.swal-confirm-btn:hover) {
  transform: translateY(-1px) !important;
  box-shadow: 0 6px 8px -1px rgba(139, 92, 246, 0.4) !important;
}

:deep(.swal-delete-btn-danger) {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
  color: white !important;
  padding: 0.625rem 1.5rem !important;
  border-radius: 8px !important;
  font-weight: 600 !important;
  font-size: 14px !important;
  transition: all 0.2s !important;
  border: none !important;
  box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.3) !important;
}

:deep(.swal-delete-btn-danger:hover) {
  transform: translateY(-1px) !important;
  box-shadow: 0 6px 8px -1px rgba(239, 68, 68, 0.4) !important;
}

:deep(.swal-cancel-btn) {
  background: white !important;
  color: #64748b !important;
  padding: 0.625rem 1.5rem !important;
  border-radius: 8px !important;
  font-weight: 600 !important;
  font-size: 14px !important;
  border: 2px solid #e2e8f0 !important;
  transition: all 0.2s !important;
}

:deep(.swal-cancel-btn:hover) {
  background: #f8fafc !important;
  border-color: #cbd5e1 !important;
  transform: translateY(-1px) !important;
}

/* Dark mode support for SweetAlert */
.dark :deep(.swal-modern-popup) {
  background: #1e293b !important;
  color: #f8fafc !important;
}

.dark :deep(.swal-modern-title) {
  color: #f8fafc !important;
}

.dark :deep(.swal-cancel-btn) {
  background: #334155 !important;
  color: #cbd5e1 !important;
  border-color: #475569 !important;
}

.dark :deep(.swal-cancel-btn:hover) {
  background: #475569 !important;
  border-color: #64748b !important;
}

/* Responsive adjustments for mobile */
@media (max-width: 640px) {
  :deep(.swal-modern-popup) {
    width: 90vw !important;
    max-width: 380px !important;
    padding: 1.25rem !important;
  }
  
  :deep(.swal-modern-title) {
    font-size: 1.125rem !important;
  }
  
  :deep(.swal-confirm-btn),
  :deep(.swal-delete-btn-danger),
  :deep(.swal-cancel-btn) {
    padding: 0.5rem 1.25rem !important;
    font-size: 13px !important;
  }
}
</style>