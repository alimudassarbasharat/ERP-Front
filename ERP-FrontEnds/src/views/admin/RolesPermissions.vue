<template>
  <div class="roles-permissions-container">
    <!-- Header -->
    <div class="page-header">
      <h1 class="page-title">
        <i class="fas fa-shield-alt"></i>
        Roles & Permissions Management
      </h1>
      <p class="page-subtitle">Manage admin roles and permissions across all modules</p>
    </div>

    <!-- Summary Cards -->
    <div class="summary-cards">
      <div class="card summary-card">
        <div class="card-body">
          <div class="stat-number">{{ summary.total_roles }}</div>
          <div class="stat-label">Total Roles</div>
          <i class="fas fa-users-cog stat-icon"></i>
        </div>
      </div>
      <div class="card summary-card">
        <div class="card-body">
          <div class="stat-number">{{ summary.total_permissions }}</div>
          <div class="stat-label">Total Permissions</div>
          <i class="fas fa-key stat-icon"></i>
        </div>
      </div>
      <div class="card summary-card">
        <div class="card-body">
          <div class="stat-number">{{ summary.total_admins }}</div>
          <div class="stat-label">Total Admins</div>
          <i class="fas fa-user-shield stat-icon"></i>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Sidebar -->
      <div class="sidebar">
        <div class="sidebar-section">
          <h3 class="sidebar-title">Management</h3>
          <ul class="sidebar-menu">
            <li :class="{ active: activeTab === 'roles' }" @click="activeTab = 'roles'">
              <i class="fas fa-users-cog"></i>
              Roles Overview
            </li>
            <li :class="{ active: activeTab === 'permissions' }" @click="activeTab = 'permissions'">
              <i class="fas fa-key"></i>
              Permissions Matrix
            </li>
            <li :class="{ active: activeTab === 'admins' }" @click="activeTab = 'admins'">
              <i class="fas fa-user-shield"></i>
              Admin Assignments
            </li>
            <li :class="{ active: activeTab === 'create-role' }" @click="activeTab = 'create-role'">
              <i class="fas fa-plus"></i>
              Create New Role
            </li>
          </ul>
        </div>

        <!-- Role Stats -->
        <div class="sidebar-section">
          <h3 class="sidebar-title">Role Statistics</h3>
          <div class="role-stats">
            <div v-for="stat in roleStats" :key="stat.role" class="role-stat-item">
              <div class="role-name">{{ stat.display_name }}</div>
              <div class="role-details">
                <span class="permission-count">{{ stat.permissions_count }} permissions</span>
                <span class="admin-count">{{ stat.admins_count }} admins</span>
              </div>
            </div> 
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="content-area">
        <!-- Roles Overview Tab -->
        <div v-if="activeTab === 'roles'" class="tab-content">
          <div class="tab-header">
            <h2>Roles Overview</h2>
            <button class="btn btn-primary" @click="activeTab = 'create-role'">
              <i class="fas fa-plus"></i> Create Role
            </button>
          </div>
          
          <div class="roles-grid">
            <div v-for="role in roles" :key="role.id" class="role-card">
              <div class="role-card-header">
                <h3>{{ role.display_name }}</h3>
                <div class="role-actions">
                  <button class="btn btn-sm btn-outline" @click="editRole(role)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-danger" @click="deleteRole(role.id)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <div class="role-card-body">
                <div class="permission-count-badge">
                  {{ role.permissions_count }} permissions
                </div>
                <div class="permissions-preview">
                  <span v-for="permission in role.permissions.slice(0, 3)" :key="permission" class="permission-tag">
                    {{ permission.replace('-', ' ') }}
                  </span>
                  <span v-if="role.permissions.length > 3" class="more-permissions">
                    +{{ role.permissions.length - 3 }} more
                  </span>
                </div>
                <div class="role-created">
                  Created: {{ formatDate(role.created_at) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Permissions Matrix Tab -->
        <div v-if="activeTab === 'permissions'" class="tab-content">
          <div class="tab-header">
            <h2>Permissions Matrix</h2>
            <div class="search-box">
              <input v-model="permissionSearch" type="text" placeholder="Search permissions..." class="form-control">
            </div>
          </div>

          <div class="permissions-matrix">
            <div v-for="module in filteredPermissions" :key="module.module" class="module-section">
              <h3 class="module-title">{{ module.display_name }}</h3>
              <div class="permissions-grid">
                <div v-for="permission in module.permissions" :key="permission.id" class="permission-item">
                  <div class="permission-name">{{ permission.display_name }}</div>
                  <div class="permission-code">{{ permission.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Admin Assignments Tab -->
        <div v-if="activeTab === 'admins'" class="tab-content">
          <div class="tab-header">
            <h2>Admin Role Assignments</h2>
            <button class="btn btn-primary" @click="showAssignRoleModal = true">
              <i class="fas fa-user-plus"></i> Assign Role
            </button>
          </div>

          <div class="admins-table">
            <table class="table">
              <thead>
                <tr>
                  <th>Admin Name</th>
                  <th>Email</th>
                  <th>Merchant ID</th>
                  <th>Roles</th>
                  <th>Permissions</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="admin in admins" :key="admin.id">
                  <td>{{ admin.name }}</td>
                  <td>{{ admin.email }}</td>
                  <td><span class="merchant-id-badge">{{ admin.merchant_id }}</span></td>
                  <td>
                    <div class="roles-list">
                      <span v-for="role in admin.roles" :key="role.id" class="role-badge">
                        {{ role.display_name }}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span class="permission-count">{{ admin.all_permissions.length }} permissions</span>
                  </td>
                  <td>
                    <span :class="['status-badge', admin.status]">{{ admin.status }}</span>
                  </td>
                  <td>
                    <button class="btn btn-sm btn-outline" @click="editAdminRoles(admin)">
                      <i class="fas fa-edit"></i> Edit Roles
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Create Role Tab -->
        <div v-if="activeTab === 'create-role'" class="tab-content">
          <div class="tab-header">
            <h2>{{ editingRole ? 'Edit Role' : 'Create New Role' }}</h2>
          </div>

          <form @submit.prevent="saveRole" class="role-form">
            <div class="form-group">
              <label>Role Name</label>
              <input v-model="roleForm.name" type="text" class="form-control" placeholder="e.g., department-manager" required>
              <small class="form-text">Use lowercase with hyphens (e.g., finance-manager)</small>
            </div>

            <div class="form-group">
              <label>Permissions</label>
              <div class="permissions-selector">
                <div v-for="module in permissions" :key="module.module" class="module-permissions">
                  <h4 class="module-title">{{ module.display_name }}</h4>
                  <div class="permissions-checkboxes">
                    <label v-for="permission in module.permissions" :key="permission.id" class="permission-checkbox">
                      <input 
                        v-model="roleForm.permissions" 
                        :value="permission.id" 
                        type="checkbox"
                      >
                      <span>{{ permission.display_name }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary">
                {{ editingRole ? 'Update Role' : 'Create Role' }}
              </button>
              <button type="button" class="btn btn-secondary" @click="cancelRoleForm">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Assign Role Modal -->
    <div v-if="showAssignRoleModal" class="modal-overlay" @click="showAssignRoleModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Assign Role to Admin</h3>
          <button class="modal-close" @click="showAssignRoleModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="assignRole">
            <div class="form-group">
              <label>Select Admin</label>
              <select v-model="assignForm.admin_id" class="form-control" required>
                <option value="">Choose an admin...</option>
                <option v-for="admin in admins" :key="admin.id" :value="admin.id">
                  {{ admin.name }} ({{ admin.email }})
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Select Role</label>
              <select v-model="assignForm.role_id" class="form-control" required>
                <option value="">Choose a role...</option>
                <option v-for="role in roles" :key="role.id" :value="role.id">
                  {{ role.display_name }}
                </option>
              </select>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">Assign Role</button>
              <button type="button" class="btn btn-secondary" @click="showAssignRoleModal = false">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/utils/axios'

export default {
  name: 'RolesPermissions',
  data() {
    return {
      activeTab: 'roles',
      roles: [],
      permissions: [],
      admins: [],
      summary: {
        total_roles: 0,
        total_permissions: 0,
        total_admins: 0
      },
      roleStats: [],
      permissionSearch: '',
      showAssignRoleModal: false,
      editingRole: null,
      roleForm: {
        name: '',
        permissions: []
      },
      assignForm: {
        admin_id: '',
        role_id: ''
      }
    }
  },
  computed: {
    filteredPermissions() {
      if (!this.permissionSearch) return this.permissions
      
      return this.permissions.filter(module => 
        module.display_name.toLowerCase().includes(this.permissionSearch.toLowerCase()) ||
        module.permissions.some(permission => 
          permission.display_name.toLowerCase().includes(this.permissionSearch.toLowerCase())
        )
      )
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
          this.loadAdmins(),
          this.loadSummary()
        ])
      } catch (error) {
        console.error('Error loading data:', error)
      }
    },
    
    async loadRoles() {
      const response = await api.get('/admin/roles-permissions/roles')
      this.roles = response.data.data
    },
    
    async loadPermissions() {
      const response = await api.get('/admin/roles-permissions/permissions')
      this.permissions = response.data.data
    },
    
    async loadAdmins() {
      const response = await api.get('/admin/roles-permissions/admins-with-roles')
      this.admins = response.data.data
    },
    
    async loadSummary() {
      const response = await api.get('/admin/roles-permissions/summary')
      this.summary = response.data.data.summary
      this.roleStats = response.data.data.role_stats
    },
    
    async saveRole() {
      try {
        if (this.editingRole) {
          await api.put(`/admin/roles-permissions/roles/${this.editingRole.id}`, this.roleForm)
        } else {
          await api.post('/admin/roles-permissions/roles', this.roleForm)
        }
        
        this.$toast.success(this.editingRole ? 'Role updated successfully' : 'Role created successfully')
        await this.loadData()
        this.cancelRoleForm()
      } catch (error) {
        this.$toast.error('Error saving role')
      }
    },
    
    async deleteRole(roleId) {
      if (confirm('Are you sure you want to delete this role?')) {
        try {
          await api.delete(`/admin/roles-permissions/roles/${roleId}`)
          this.$toast.success('Role deleted successfully')
          await this.loadData()
        } catch (error) {
          this.$toast.error('Error deleting role')
        }
      }
    },
    
    async assignRole() {
      try {
        await api.post('/admin/roles-permissions/assign-role', this.assignForm)
        this.$toast.success('Role assigned successfully')
        await this.loadAdmins()
        this.showAssignRoleModal = false
        this.assignForm = { admin_id: '', role_id: '' }
      } catch (error) {
        this.$toast.error('Error assigning role')
      }
    },
    
    editRole(role) {
      this.editingRole = role
      this.roleForm = {
        name: role.name,
        permissions: role.permissions.map(p => {
          const permission = this.permissions.flatMap(m => m.permissions).find(perm => perm.name === p)
          return permission ? permission.id : null
        }).filter(Boolean)
      }
      this.activeTab = 'create-role'
    },
    
    editAdminRoles(admin) {
      this.assignForm.admin_id = admin.id
      this.showAssignRoleModal = true
    },
    
    cancelRoleForm() {
      this.editingRole = null
      this.roleForm = { name: '', permissions: [] }
      this.activeTab = 'roles'
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString()
    }
  }
}
</script>

<style scoped>
.roles-permissions-container {
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 30px;
}

.page-title {
  color: #2c3e50;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 5px;
}

.page-title i {
  color: #3498db;
  margin-right: 10px;
}

.page-subtitle {
  color: #7f8c8d;
  font-size: 16px;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.summary-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
}

.summary-card .card-body {
  padding: 25px;
  position: relative;
}

.stat-number {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
}

.stat-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
  opacity: 0.3;
}

.main-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
}

.sidebar {
  background: white;
  border-radius: 12px;
  padding: 20px;
  height: fit-content;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.sidebar-section {
  margin-bottom: 30px;
}

.sidebar-section:last-child {
  margin-bottom: 0;
}

.sidebar-title {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid #ecf0f1;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  padding: 12px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

.sidebar-menu li:hover {
  background-color: #f1f2f6;
}

.sidebar-menu li.active {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
}

.sidebar-menu li i {
  margin-right: 10px;
  width: 16px;
}

.role-stats {
  max-height: 300px;
  overflow-y: auto;
}

.role-stat-item {
  padding: 10px;
  border: 1px solid #ecf0f1;
  border-radius: 6px;
  margin-bottom: 8px;
}

.role-name {
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
}

.role-details {
  font-size: 12px;
  color: #7f8c8d;
  margin-top: 4px;
}

.permission-count, .admin-count {
  margin-right: 10px;
}

.content-area {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.tab-header {
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #ecf0f1;
}

.tab-header h2 {
  color: #2c3e50;
  font-size: 24px;
  font-weight: 600;
}

.search-box input {
  width: 300px;
}

.roles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.role-card {
  border: 1px solid #e1e8ed;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.role-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.role-card-header {
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.role-card-header h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.role-actions {
  display: flex;
  gap: 5px;
}

.role-card-body {
  padding: 20px;
}

.permission-count-badge {
  display: inline-block;
  background: #3498db;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
}

.permissions-preview {
  margin-bottom: 15px;
}

.permission-tag {
  display: inline-block;
  background: #ecf0f1;
  color: #2c3e50;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.more-permissions {
  color: #7f8c8d;
  font-size: 12px;
  font-style: italic;
}

.role-created {
  color: #7f8c8d;
  font-size: 12px;
}

.permissions-matrix {
  space-y: 30px;
}

.module-section {
  margin-bottom: 30px;
}

.module-title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #bdc3c7;
}

.permissions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.permission-item {
  padding: 12px;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  background: #f8f9fa;
}

.permission-name {
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
}

.permission-code {
  color: #7f8c8d;
  font-size: 12px;
  font-family: monospace;
  margin-top: 4px;
}

.admins-table {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e1e8ed;
}

.table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
}

.merchant-id-badge {
  background: #f39c12;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-family: monospace;
}

.roles-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.role-badge {
  background: #3498db;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
}

.permission-count {
  color: #7f8c8d;
  font-size: 12px;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.active {
  background: #2ecc71;
  color: white;
}

.status-badge.inactive {
  background: #e74c3c;
  color: white;
}

.role-form {
  max-width: 800px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.form-control {
  width: 100%;
  padding: 12px;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  font-size: 14px;
}

.form-text {
  color: #7f8c8d;
  font-size: 12px;
  margin-top: 4px;
}

.permissions-selector {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  padding: 15px;
}

.module-permissions {
  margin-bottom: 25px;
}

.module-permissions .module-title {
  font-size: 16px;
  margin-bottom: 10px;
}

.permissions-checkboxes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.permission-checkbox {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.permission-checkbox:hover {
  background: #f8f9fa;
}

.permission-checkbox input {
  margin-right: 8px;
}

.form-actions {
  display: flex;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid #e1e8ed;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover {
  background: #2980b9;
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-outline {
  background: transparent;
  border: 1px solid #bdc3c7;
  color: #7f8c8d;
}

.btn-outline:hover {
  background: #f8f9fa;
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background: #c0392b;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 500px;
  max-width: 90vw;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #e1e8ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #7f8c8d;
}

.modal-body {
  padding: 20px;
}
</style>
