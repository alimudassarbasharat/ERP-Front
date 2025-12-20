<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <button
              @click="handleBack"
              class="mr-4 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <svg class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div class="flex-shrink-0">
              <svg class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div class="ml-4">
              <h1 class="text-2xl font-bold text-gray-900">Edit Role Permissions</h1>
              <p class="text-sm text-gray-500">{{ role?.display_name || $route.query.roleName }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {{ selectedPermissions.length }} Selected
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {{ allPermissions.length }} Available
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

      <!-- Edit Form -->
      <div v-else class="space-y-6">
        <!-- Role Information -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Role Information</h3>
          </div>
          <div class="p-6">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
              <div>
                <dt class="text-sm font-medium text-gray-500">Role Name</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ role?.display_name }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">System Name</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ role?.name }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Description</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ role?.description || 'No description' }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Permissions Selection -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Manage Permissions</h3>
              <p class="text-sm text-gray-500">Select permissions to assign to this role</p>
            </div>
            <div class="flex space-x-2">
              <button
                @click="selectAllPermissions"
                class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Select All
              </button>
              <button
                @click="clearAllPermissions"
                class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Clear All
              </button>
            </div>
          </div>
          
          <div class="p-6">
            <!-- Search Box -->
            <div class="mb-6">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  v-model="searchQuery"
                  type="text"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search permissions..."
                />
              </div>
            </div>

            <!-- Permissions by Module -->
            <div class="space-y-6">
              <div v-for="module in filteredModules" :key="module.name" class="border border-gray-200 rounded-lg">
                <div class="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900 capitalize">{{ module.name }} Module</h4>
                    <p class="text-xs text-gray-500">
                      {{ getSelectedCount(module) }} of {{ module.permissions.length }} selected
                    </p>
                  </div>
                  <div class="flex space-x-2">
                    <button
                      @click="selectModulePermissions(module)"
                      class="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 focus:outline-none"
                    >
                      Select All
                    </button>
                    <button
                      @click="clearModulePermissions(module)"
                      class="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 focus:outline-none"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <div class="p-4">
                  <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <label 
                      v-for="permission in module.permissions" 
                      :key="permission.name"
                      class="flex items-center p-2 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                      :class="{ 'bg-indigo-50 border-indigo-300': isPermissionSelected(permission.name) }"
                    >
                      <input
                        v-model="selectedPermissions"
                        :value="permission.name"
                        type="checkbox"
                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span class="ml-2 text-sm text-gray-900">{{ permission.name }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-between">
          <button
            @click="handleBack"
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <div class="flex space-x-3">
            <button
              @click="previewChanges"
              class="inline-flex items-center px-4 py-2 border border-indigo-300 shadow-sm text-sm font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Preview Changes
            </button>
            <button
              @click="savePermissions"
              :disabled="saving"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <div v-if="saving" class="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              {{ saving ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/utils/axios'

export default {
  name: 'EditRolePermissions',
  data() {
    return {
      role: null,
      allPermissions: [],
      selectedPermissions: [],
      originalPermissions: [],
      loading: true,
      saving: false,
      searchQuery: ''
    }
  },
  computed: {
    permissionsByModule() {
      const modules = {}
      this.allPermissions.forEach(permission => {
        // Extract module name from permission
        const parts = permission.name.split('-')
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
        modules[moduleName].permissions.push(permission)
      })
      
      return Object.values(modules)
    },
    
    filteredModules() {
      if (!this.searchQuery) return this.permissionsByModule
      
      const query = this.searchQuery.toLowerCase()
      return this.permissionsByModule.map(module => ({
        ...module,
        permissions: module.permissions.filter(permission =>
          permission.name.toLowerCase().includes(query)
        )
      })).filter(module => module.permissions.length > 0)
    }
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      try {
        this.loading = true
        const roleId = this.$route.params.roleId
        
        // Load role details and all permissions
        const [roleResponse, permissionsResponse] = await Promise.all([
          api.get(`/admin/roles-permissions/roles/${roleId}`),
          api.get('/admin/roles-permissions/permissions')
        ])
        
        if (roleResponse.data.success) {
          this.role = roleResponse.data.data
          this.originalPermissions = [...(this.role.permissions || [])]
          this.selectedPermissions = [...(this.role.permissions || [])]
        }
        
        if (permissionsResponse.data.success) {
          this.allPermissions = permissionsResponse.data.data
        }
      } catch (error) {
        console.error('Error loading data:', error)
        this.$toast.error('Failed to load role data')
      } finally {
        this.loading = false
      }
    },
    
    isPermissionSelected(permissionName) {
      return this.selectedPermissions.includes(permissionName)
    },
    
    getSelectedCount(module) {
      return module.permissions.filter(p => this.isPermissionSelected(p.name)).length
    },
    
    selectAllPermissions() {
      this.selectedPermissions = this.allPermissions.map(p => p.name)
    },
    
    clearAllPermissions() {
      this.selectedPermissions = []
    },
    
    selectModulePermissions(module) {
      const modulePermissions = module.permissions.map(p => p.name)
      const newPermissions = [...new Set([...this.selectedPermissions, ...modulePermissions])]
      this.selectedPermissions = newPermissions
    },
    
    clearModulePermissions(module) {
      const modulePermissions = module.permissions.map(p => p.name)
      this.selectedPermissions = this.selectedPermissions.filter(p => !modulePermissions.includes(p))
    },
    
    previewChanges() {
      const added = this.selectedPermissions.filter(p => !this.originalPermissions.includes(p))
      const removed = this.originalPermissions.filter(p => !this.selectedPermissions.includes(p))
      
      let message = `Changes for ${this.role.display_name}:\n\n`
      if (added.length > 0) {
        message += `Added (${added.length}):\n${added.join('\n')}\n\n`
      }
      if (removed.length > 0) {
        message += `Removed (${removed.length}):\n${removed.join('\n')}`
      }
      if (added.length === 0 && removed.length === 0) {
        message += 'No changes made.'
      }
      
      alert(message)
    },
    
    async savePermissions() {
      try {
        this.saving = true
        
        const response = await api.put(`/admin/roles-permissions/roles/${this.role.id}`, {
          permissions: this.selectedPermissions
        })
        
        if (response.data.success) {
          this.$toast.success('Role permissions updated successfully')
          this.originalPermissions = [...this.selectedPermissions]
          
          // Navigate back after short delay
          setTimeout(() => {
            this.$router.push({ name: 'RolePermissionManagement' })
          }, 1000)
        } else {
          throw new Error('Failed to update permissions')
        }
      } catch (error) {
        console.error('Error saving permissions:', error)
        this.$toast.error('Failed to save permissions')
      } finally {
        this.saving = false
      }
    },
    
    handleBack() {
      const hasChanges = JSON.stringify(this.selectedPermissions.sort()) !== JSON.stringify(this.originalPermissions.sort())
      
      if (hasChanges) {
        if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
          this.$router.go(-1)
        }
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>
