<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <button
              @click="$router.go(-1)"
              class="mr-4 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <svg class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div class="flex-shrink-0">
              <svg class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div> 
            <div class="ml-4">
              <h1 class="text-2xl font-bold text-gray-900">View Role Permissions</h1>
              <p class="text-sm text-gray-500">{{ role?.display_name || $route.query.roleName }} - Read Only</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {{ role?.permissions?.length || 0 }} Permissions
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <!-- Role Information -->
      <div v-else-if="role" class="space-y-6">
        <!-- Role Summary Card -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Role Information</h3>
          </div>
          <div class="p-6">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt class="text-sm font-medium text-gray-500">Role Name</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ role.display_name }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">System Name</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ role.name }}</dd>
              </div>
              <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-gray-500">Description</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ role.description || 'No description available' }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Total Permissions</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ role.permissions?.length || 0 }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Created Date</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDate(role.created_at) }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Permissions by Module -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Assigned Permissions</h3>
            <p class="text-sm text-gray-500">All permissions assigned to this role, organized by module</p>
          </div>
          <div class="p-6">
            <div v-if="permissionsByModule.length === 0" class="text-center py-8">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No permissions assigned</h3>
              <p class="mt-1 text-sm text-gray-500">This role currently has no permissions assigned.</p>
            </div>
            
            <div v-else class="space-y-6">
              <div v-for="module in permissionsByModule" :key="module.name" class="border border-gray-200 rounded-lg">
                <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h4 class="text-sm font-medium text-gray-900 capitalize">{{ module.name }} Module</h4>
                  <p class="text-xs text-gray-500">{{ module.permissions.length }} permissions</p>
                </div>
                <div class="p-4">
                  <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div 
                      v-for="permission in module.permissions" 
                      :key="permission.id"
                      class="flex items-center p-2 border border-gray-200 rounded-md bg-green-50"
                    >
                      <svg class="h-4 w-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span class="text-sm text-gray-900">{{ permission.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-3">
          <button
            @click="$router.go(-1)"
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Roles
          </button>
          <button
            @click="editRole"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            Edit Permissions
          </button>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Role not found</h3>
        <p class="mt-1 text-sm text-gray-500">The requested role could not be loaded.</p>
        <div class="mt-6">
          <button
            @click="$router.go(-1)"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Back to Roles
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/utils/axios'

export default {
  name: 'ViewRolePermissions',
  data() {
    return {
      role: null,
      loading: true
    }
  },
  computed: {
    permissionsByModule() {
      if (!this.role?.permissions) return []
      
      const modules = {}
      this.role.permissions.forEach(permission => {
        // Extract module name from permission (e.g., 'view-students' -> 'students')
        const parts = permission.split('-')
        let moduleName = 'general'
        
        if (parts.length > 1) {
          const actionWords = ['view', 'create', 'edit', 'delete', 'manage', 'access', 'generate', 'add']
          if (actionWords.includes(parts[0])) {
            moduleName = parts.slice(1).join('-')
          } else {
            moduleName = parts[0]
          }
        }
        
        if (!modules[moduleName]) {
          modules[moduleName] = {
            name: moduleName,
            permissions: []
          }
        }
        modules[moduleName].permissions.push({
          id: permission,
          name: permission
        })
      })
      
      return Object.values(modules)
    }
  },
  async mounted() {
    await this.loadRolePermissions()
  },
  methods: {
    async loadRolePermissions() {
      try {
        this.loading = true
        const roleId = this.$route.params.roleId
        const response = await api.get(`/admin/roles-permissions/roles/${roleId}`)
        
        if (response.data.success) {
          this.role = response.data.data
        } else {
          throw new Error('Failed to load role permissions')
        }
      } catch (error) {
        console.error('Error loading role permissions:', error)
        this.$toast.error('Failed to load role permissions')
      } finally {
        this.loading = false
      }
    },
    
    editRole() {
      this.$router.push({
        name: 'EditRolePermissions',
        params: { roleId: this.role.id },
        query: { roleName: this.role.display_name }
      })
    },
    
    formatDate(dateString) {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>
