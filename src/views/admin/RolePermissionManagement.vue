<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 2.676-1.04 5.162-2.75 7.378-5.048 2.217-2.298 3.622-5.114 3.622-8.074a12.015 12.015 0 00-.382-3.532z" />
              </svg>
            </div>
            <div class="ml-4">
              <h1 class="text-2xl font-bold text-gray-900">Role & Permission Management</h1>
              <p class="text-sm text-gray-500">Manage school roles and user permissions</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {{ totalRoles }} Roles
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {{ totalPermissions }} Permissions
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Navigation Tabs -->
      <div class="border-b border-gray-200 mb-8">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === tab.id
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            <svg :class="[
              'w-5 h-5 mr-2 inline',
              activeTab === tab.id ? 'text-indigo-500' : 'text-gray-400'
            ]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tab.icon" />
            </svg>
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Roles Overview Tab -->
      <div v-if="activeTab === 'roles'" class="space-y-6">
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Roles & Permissions Management</h3>
            <p class="text-sm text-gray-500">Manage roles and their assigned permissions</p>
          </div>
          
          <!-- DataTable -->
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Permissions
                  </th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="role in roles" :key="role.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div :class="[
                        'h-8 w-8 rounded-full flex items-center justify-center mr-3',
                        getRoleColor(role.name)
                      ]">
                        <svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getRoleIcon(role.name)" />
                        </svg>
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-900">{{ role.display_name }}</div>
                        <div class="text-sm text-gray-500">{{ role.name }}</div>
                      </div>
                    </div> 
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900">{{ role.description || 'No description available' }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {{ role.permissions?.length || 0 }} permissions
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex justify-end space-x-2">
                      <button
                        @click="viewRolePermissions(role)"
                        class="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                        View
                      </button>
                      <button
                        @click="editRolePermissions(role)"
                        class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- User Management Tab -->
      <div v-if="activeTab === 'users'" class="space-y-6">
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h3 class="text-lg font-medium text-gray-900">User Role Assignments</h3>
              <p class="text-sm text-gray-500">Assign roles to users (Admin can only assign, not create roles)</p>
            </div>
            <button
              @click="showAssignRoleModal = true"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Assign Role
            </button>
          </div>
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Role</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in usersWithRoles" :key="user.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span class="text-sm font-medium text-gray-700">{{ getInitials(user.name) }}</span>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                        <div class="text-sm text-gray-500">{{ user.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex flex-wrap gap-1">
                      <span
                        v-for="role in user.roles"
                        :key="role.id"
                        :class="[
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          getRoleBadgeColor(role.name)
                        ]"
                      >
                        {{ role.display_name }}
                      </span>
                      <span v-if="!user.roles?.length" class="text-sm text-gray-400">No role assigned</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ user.all_permissions?.length || 0 }} permissions
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    ]">
                      {{ user.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      @click="editUserRole(user)"
                      class="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit Role
                    </button>
                    <button
                      @click="viewUserPermissions(user)"
                      class="text-gray-600 hover:text-gray-900"
                    >
                      View Permissions
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Permissions Matrix Tab (Super Admin Only) -->
      <div v-if="activeTab === 'permissions' && canManagePermissions" class="space-y-6">
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Permissions Matrix</h3>
            <p class="text-sm text-gray-500">Detailed view of all permissions by module</p>
          </div>
          <div class="p-6">
            <div class="space-y-8">
              <div v-for="module in permissionsByModule" :key="module.name" class="border border-gray-200 rounded-lg overflow-hidden">
                <div class="bg-gray-50 px-6 py-3 border-b border-gray-200">
                  <h4 class="text-lg font-medium text-gray-900 capitalize">{{ module.name.replace('-', ' ') }}</h4>
                  <p class="text-sm text-gray-600">{{ module.description }}</p>
                </div>
                <div class="p-6">
                  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <div
                      v-for="permission in module.permissions"
                      :key="permission.id"
                      class="bg-gray-50 rounded-lg p-3 text-center"
                    >
                      <div class="text-sm font-medium text-gray-900 capitalize">{{ permission.action }}</div>
                      <div class="text-xs text-gray-500 mt-1">{{ permission.name }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Access Denied for non-super-admin -->
      <div v-if="activeTab === 'permissions' && !canManagePermissions" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Access Restricted</h3>
        <p class="mt-1 text-sm text-gray-500">Only Super Administrators can view and manage permissions.</p>
      </div>
    </div>

    <!-- Assign Role Modal -->
    <div v-if="showAssignRoleModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Assign Role to User</h3>
            <button @click="showAssignRoleModal = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form @submit.prevent="assignRole" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Select User</label>
              <select v-model="assignForm.user_id" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
                <option value="">Choose a user...</option>
                <option v-for="user in allUsers" :key="user.id" :value="user.id">
                  {{ user.name }} ({{ user.email }})
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Select Role</label>
              <select v-model="assignForm.role_id" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
                <option value="">Choose a role...</option>
                <option v-for="role in roles" :key="role.id" :value="role.id">
                  {{ role.display_name }}
                </option>
              </select>
            </div>
            <div class="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                @click="showAssignRoleModal = false"
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Assign Role
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Role Details Modal -->
    <div v-if="showRoleModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-10 mx-auto p-5 border w-4/5 max-w-4xl shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900">{{ selectedRole?.display_name }}</h3>
              <p class="text-sm text-gray-500">{{ selectedRole?.description }}</p>
            </div>
            <button @click="showRoleModal = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="space-y-6">
            <div v-for="module in getRolePermissionsByModule(selectedRole)" :key="module.name" class="border border-gray-200 rounded-lg overflow-hidden">
              <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h4 class="text-sm font-medium text-gray-900 capitalize">{{ module.name.replace('-', ' ') }}</h4>
              </div>
              <div class="p-4">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="permission in module.permissions"
                    :key="permission"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {{ permission.replace(module.name, '').replace('-', '').trim() }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/utils/axios'

export default {
  name: 'RolePermissionManagement',
  data() {
    return {
      activeTab: 'roles',
      roles: [],
      permissions: [],
      usersWithRoles: [],
      allUsers: [],
      showAssignRoleModal: false,
      showRoleModal: false,
      selectedRole: null,
      currentUser: null,
      assignForm: {
        user_id: '',
        role_id: ''
      },
      tabs: [
        {
          id: 'roles',
          name: 'Roles Overview',
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        },
        {
          id: 'users',
          name: 'User Management',
          icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
        },
        {
          id: 'permissions',
          name: 'Permissions Matrix',
          icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 2.676-1.04 5.162-2.75 7.378-5.048 2.217-2.298 3.622-5.114 3.622-8.074a12.015 12.015 0 00-.382-3.532z'
        }
      ]
    }
  },
  computed: {
    totalRoles() {
      return this.roles.length
    },
    totalPermissions() {
      return this.permissions.length
    },
    permissionsByModule() {
      const modules = {}
      this.permissions.forEach(permission => {
        if (!modules[permission.module]) {
          modules[permission.module] = {
            name: permission.module,
            description: permission.description,
            permissions: []
          }
        }
        modules[permission.module].permissions.push(permission)
      })
      return Object.values(modules)
    },
    canManagePermissions() {
      return this.currentUser && this.currentUser.roles?.some(role => role.name === 'super-admin')
    }
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      try {
        await Promise.all([
          this.loadRoles(),
          this.loadPermissions(),
          this.loadUsersWithRoles(),
          this.loadAllUsers(),
          this.loadCurrentUser()
        ])
      } catch (error) {
        console.error('Error loading data:', error)
        this.$toast.error('Failed to load data')
      }
    },
    
    async loadRoles() {
      const response = await api.get('/admin/roles-permissions/roles')
      this.roles = response.data.data
    },
    
    async loadPermissions() {
      const response = await api.get('/admin/roles-permissions/permissions')
      this.permissions = response.data.data.flat()
    },
    
    async loadUsersWithRoles() {
      const response = await api.get('/admin/roles-permissions/admins-with-roles')
      this.usersWithRoles = response.data.data
    },
    
    async loadAllUsers() {
      const response = await api.get('/users')
      this.allUsers = response.data.data || response.data
    },
    
    async loadCurrentUser() {
      const response = await api.get('/user')
      this.currentUser = response.data
    },
    
    async assignRole() {
      try {
        await api.post('/admin/roles-permissions/assign-role', this.assignForm)
        this.$toast.success('Role assigned successfully')
        this.showAssignRoleModal = false
        this.assignForm = { user_id: '', role_id: '' }
        await this.loadUsersWithRoles()
      } catch (error) {
        this.$toast.error('Error assigning role')
      }
    },
    
    viewRoleDetails(role) {
      this.selectedRole = role
      this.showRoleModal = true
    },

    viewRolePermissions(role) {
      // Navigate to view permissions page
      this.$router.push({
        name: 'ViewRolePermissions',
        params: { roleId: role.id },
        query: { roleName: role.display_name }
      })
    },

    editRolePermissions(role) {
      // Navigate to edit permissions page
      this.$router.push({
        name: 'EditRolePermissions',
        params: { roleId: role.id },
        query: { roleName: role.display_name }
      })
    },
    
    editUserRole(user) {
      this.assignForm.user_id = user.id
      this.showAssignRoleModal = true
    },
    
    viewUserPermissions(user) {
      // Implementation for viewing user permissions
      this.$toast.info(`${user.name} has ${user.all_permissions?.length || 0} permissions`)
    },
    
    getInitials(name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase()
    },
    
    getRoleColor(roleName) {
      const colors = {
        'super-admin': 'bg-red-500',
        'principal': 'bg-purple-500',
        'vice-principal': 'bg-blue-500',
        'academic-coordinator': 'bg-green-500',
        'accountant': 'bg-yellow-500',
        'librarian': 'bg-indigo-500',
        'teacher': 'bg-teal-500',
        'class-teacher': 'bg-cyan-500',
        'transport-manager': 'bg-orange-500',
        'hostel-warden': 'bg-pink-500',
        'receptionist': 'bg-gray-500'
      }
      return colors[roleName] || 'bg-gray-500'
    },
    
    getRoleBadgeColor(roleName) {
      const colors = {
        'super-admin': 'bg-red-100 text-red-800',
        'principal': 'bg-purple-100 text-purple-800',
        'vice-principal': 'bg-blue-100 text-blue-800',
        'academic-coordinator': 'bg-green-100 text-green-800',
        'accountant': 'bg-yellow-100 text-yellow-800',
        'librarian': 'bg-indigo-100 text-indigo-800',
        'teacher': 'bg-teal-100 text-teal-800',
        'class-teacher': 'bg-cyan-100 text-cyan-800',
        'transport-manager': 'bg-orange-100 text-orange-800',
        'hostel-warden': 'bg-pink-100 text-pink-800',
        'receptionist': 'bg-gray-100 text-gray-800'
      }
      return colors[roleName] || 'bg-gray-100 text-gray-800'
    },
    
    getRoleIcon(roleName) {
      const icons = {
        'super-admin': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 2.676-1.04 5.162-2.75 7.378-5.048 2.217-2.298 3.622-5.114 3.622-8.074a12.015 12.015 0 00-.382-3.532z',
        'principal': 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
        'teacher': 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
        'default': 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
      }
      return icons[roleName] || icons.default
    },
    
    getRolePermissionsByModule(role) {
      if (!role?.permissions) return []
      
      const modules = {}
      role.permissions.forEach(permissionName => {
        const permission = this.permissions.find(p => p.name === permissionName)
        if (permission) {
          if (!modules[permission.module]) {
            modules[permission.module] = {
              name: permission.module,
              permissions: []
            }
          }
          modules[permission.module].permissions.push(permissionName)
        }
      })
      return Object.values(modules)
    }
  }
}
</script>
