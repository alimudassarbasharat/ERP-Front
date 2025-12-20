<template>
  <div class="admin-list">
    <div class="page-header">
      <h2>Admin Management</h2>
      <div class="header-actions">
        <el-button type="primary" @click="showPermissionDialog">
          <el-icon><Setting /></el-icon>
          <span class="button-text">Manage Permissions</span>
        </el-button>
        <el-button type="primary" @click="showRoleDialog">
          <el-icon><Setting /></el-icon>
          <span class="button-text">Manage Roles</span>
        </el-button>
        <el-button type="primary" @click="showRolePermissionDialog">
          <el-icon><Setting /></el-icon>
          <span class="button-text">Role Permissions</span>
        </el-button>
        <el-button type="primary" @click="showCreateDialog">
          <el-icon><Plus /></el-icon>
          <span class="button-text">Add Admin</span>
        </el-button>
      </div>
    </div>

    <el-card>
      <div class="table-operations">
        <el-input
          v-model="searchQuery"
          placeholder="Search admins..."
          class="search-input"
          :prefix-icon="Search"
        />
        <el-input
          v-model="emailFilter"
          placeholder="Filter by email..."
          class="search-input"
        />
        <el-select v-model="statusFilter" placeholder="Filter by Status" clearable class="search-input">
          <el-option label="Active" value="active" />
          <el-option label="Inactive" value="inactive" />
        </el-select>
      </div>

      <el-table
        :data="admins"
        style="width: 100%"
        v-loading="loading"
        @sort-change="handleSortChange"
        :default-sort="{ prop: 'id', order: 'descending' }"
      >
        <el-table-column prop="id" label="ID" width="80" sortable="custom" />
        <el-table-column prop="name" label="Name" sortable="custom" />
        <el-table-column prop="email" label="Email" sortable="custom" />
        <el-table-column prop="status" label="Status" width="100" sortable="custom">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="200" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button type="primary" size="small" @click="showAssignRoleDialog(row)">
                <el-icon><UserFilled /></el-icon>
                <span class="role-count">({{ row.roles?.length || 0 }})</span>
              </el-button>
              <el-button type="primary" size="small" @click="viewAdmin(row)">
                <el-icon><View /></el-icon>
              </el-button>
              <el-button type="primary" size="small" @click="editAdmin(row)">
                <el-icon><Edit /></el-icon>
              </el-button>
              <el-button 
                type="danger" 
                size="small" 
                @click="deleteAdmin(row)"
              >
                <el-icon><Delete /></el-icon>
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="totalItems"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- Create/Edit Admin Dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? 'Edit Admin' : 'Create Admin'"
      width="600px"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      class="admin-form-dialog"
      @click="handleDialogClick"
    >
      <div class="form-container" @click.stop>
        <div class="form-header">
          <el-avatar :size="64" class="form-avatar">
            {{ adminForm.name?.charAt(0)?.toUpperCase() || 'A' }}
          </el-avatar>
          <h3>{{ isEdit ? 'Edit Admin Profile' : 'Create New Admin' }}</h3>
          <p class="form-subtitle">
            {{ isEdit ? 'Update the admin information below' : 'Fill in the information to create a new admin' }}
          </p>
        </div>

        <el-form
          ref="adminFormRef"
          :model="adminForm"
          :rules="adminRules"
          label-position="top"
          :key="dialogVisible"
          class="admin-form"
        >
          <div class="form-section">
            <h4 class="section-title">
              <el-icon><User /></el-icon>
              Personal Information
            </h4>
            <div class="form-grid">
              <el-form-item label="Name" prop="name">
                <el-input 
                  v-model="adminForm.name" 
                  placeholder="Enter name"
                >
                  <template #prefix>
                    <el-icon><User /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
              
              <el-form-item label="Email" prop="email">
                <el-input 
                  v-model="adminForm.email" 
                  placeholder="Enter email"
                >
                  <template #prefix>
                    <el-icon><Message /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
              
              <el-form-item label="Phone Number" prop="phone_number">
                <el-input 
                  v-model="adminForm.phone_number" 
                  placeholder="Enter phone number"
                >
                  <template #prefix>
                    <el-icon><Phone /></el-icon>
                  </template>
                </el-input>
              </el-form-item>

              <el-form-item label="Location" prop="location">
                <el-input 
                  v-model="adminForm.location" 
                  placeholder="Enter location"
                >
                  <template #prefix>
                    <el-icon><Location /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
            </div>
          </div>

          <div class="form-section">
            <h4 class="section-title">
              <el-icon><Setting /></el-icon>
              Account Settings
            </h4>
            <div class="form-grid">
              <el-form-item label="Role" prop="role_name">
                <el-select 
                  v-model="adminForm.role_name" 
                  placeholder="Select role" 
                  class="full-width"
                >
                  <el-option label="Super Admin" value="Super Admin" />
                  <el-option label="Admin" value="Admin" />
                  <el-option label="Manager" value="Manager" />
                </el-select>
              </el-form-item>
              
              <el-form-item label="Status" prop="status">
                <el-select 
                  v-model="adminForm.status" 
                  placeholder="Select status" 
                  class="full-width"
                >
                  <el-option label="Active" value="active" />
                  <el-option label="Inactive" value="inactive" />
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitForm" :loading="loading">
            {{ isEdit ? 'Update' : 'Create' }}
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- View Admin Details Dialog -->
    <el-dialog
      v-model="viewDialogVisible"
      title="Admin Details"
      width="700px"
      class="admin-view-dialog"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      @click="handleViewDialogClick"
    >
      <div class="admin-profile" @click.stop>
        <template v-if="!showRoles">
          <div class="profile-header">
            <div class="profile-avatar-container">
              <el-avatar :size="80" class="profile-avatar">
                <el-icon><User /></el-icon>
              </el-avatar>
              <div class="status-indicator" :class="viewAdminData.status">
                <el-icon><CircleCheck v-if="viewAdminData.status === 'active'" /><CircleClose v-else /></el-icon>
              </div>
            </div>
            <div class="profile-title">
              <div class="profile-meta">
                <el-tag :type="viewAdminData.role_name === 'Super Admin' ? 'danger' : 'primary'" class="role-tag">
                  {{ viewAdminData.role_name === 'Super Admin' ? 'Super Admin' : viewAdminData.role_name }}
                </el-tag>
                <span class="member-since">Member since {{ formatDate(viewAdminData.created_at) }}</span>
              </div>
            </div>
          </div>

          <el-divider />

          <div class="profile-details">
            <div class="details-section">
              <h4 class="section-title">
                <el-icon><User /></el-icon>
                Personal Information
              </h4>
              <div class="detail-grid">
                <div class="detail-item">
                  <el-icon><Message /></el-icon>
                  <div class="detail-content">
                    <span class="label">Email Address</span>
                    <span class="value">{{ viewAdminData.email }}</span>
                  </div>
                </div>

                <div class="detail-item">
                  <el-icon><Phone /></el-icon>
                  <div class="detail-content">
                    <span class="label">Phone Number</span>
                    <span class="value">{{ viewAdminData.phone_number }}</span>
                  </div>
                </div>

                <div class="detail-item">
                  <el-icon><Location /></el-icon>
                  <div class="detail-content">
                    <span class="label">Location</span>
                    <span class="value">{{ viewAdminData.location || 'Not specified' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="details-section">
              <h4 class="section-title">
                <el-icon><Setting /></el-icon>
                Account Information
              </h4>
              <div class="detail-grid">
                <div class="detail-item">
                  <el-icon><CircleCheck /></el-icon>
                  <div class="detail-content">
                    <span class="label">Account Status</span>
                    <el-tag :type="viewAdminData.status === 'active' ? 'success' : 'danger'" class="status-tag">
                      {{ viewAdminData.status }}
                    </el-tag>
                  </div>
                </div>

                <div class="detail-item">
                  <el-icon><Timer /></el-icon>
                  <div class="detail-content">
                    <span class="label">Last Login</span>
                    <span class="value">{{ formatDate(viewAdminData.last_login_at) || 'Never' }}</span>
                  </div>
                </div>

                <div class="detail-item">
                  <el-icon><Lock /></el-icon>
                  <div class="detail-content">
                    <span class="label">Two-Factor Auth</span>
                    <el-tag :type="viewAdminData.two_factor_enabled ? 'success' : 'info'" size="small">
                      {{ viewAdminData.two_factor_enabled ? 'Enabled' : 'Disabled' }}
                    </el-tag>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="roles-section">
            <h3>Assigned Roles</h3>
            <div v-if="loading" class="roles-loading">
              <el-skeleton :rows="3" animated />
            </div>
            <el-table
              v-else
              :data="assignedRoles"
              style="width: 100%"
            >
              <el-table-column prop="name" label="Role Name" />
              <el-table-column prop="description" label="Description" />
              <el-table-column prop="created_at" label="Assigned Date" width="180">
                <template #default="{ row }">
                  {{ formatDate(row.created_at) }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="viewDialogVisible = false">Close</el-button>
          <el-button type="primary" @click="editAdmin(viewAdminData)">Edit Profile</el-button>
          <el-button 
            type="warning" 
            @click="toggleRolesView"
          >
            <el-icon><UserFilled /></el-icon>
            {{ showRoles ? 'View Profile' : 'Assigned Roles' }}
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- Assigned Roles Dialog -->
    <el-dialog
      v-model="assignedRolesDialogVisible"
      title="Assigned Roles"
      width="600px"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
    >
      <div v-if="loading" class="roles-loading">
        <el-skeleton :rows="3" animated />
      </div>
      <el-table
        v-else
        :data="assignedRoles"
        style="width: 100%"
      >
        <el-table-column prop="name" label="Role Name" />
        <el-table-column prop="description" label="Description" />
        <el-table-column prop="created_at" label="Assigned Date" width="180">
          <template #default="{ row }">
            {{ formatDate(row.created_at) }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- Role Management Dialog -->
    <el-dialog
      v-model="roleDialogVisible"
      title="Role Management"
      width="800px"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      class="role-dialog"
      @click="handleRoleDialogClick"
    >
      <div class="role-container" @click.stop>
        <div class="role-header">
          <h3>System Roles</h3>
          <div class="header-actions">
            <el-button type="primary" @click="showCreateRoleDialog">
              <el-icon><Plus /></el-icon>
              Add Role
            </el-button>
          </div>
        </div>

        <el-table
          :data="roles"
          style="width: 100%"
          v-loading="roleLoading"
        >
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="Role Name" />
          <el-table-column prop="description" label="Description" />
          <el-table-column prop="permission_count" label="Permissions" width="120">
            <template #default="{ row }">
              <el-tag type="info" size="small">
                {{ row.permission_count || 0 }} Permissions
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Actions" width="120" fixed="right">
            <template #default="{ row }">
              <el-button-group>
                <el-button 
                  type="primary" 
                  size="small" 
                  @click="editRole(row)"
                >
                  <el-icon><Edit /></el-icon>
                </el-button>
                <el-button 
                  type="danger" 
                  size="small" 
                  @click="deleteRole(row)"
                  :disabled="row.name === 'super-admin'"
                >
                  <el-icon><Delete /></el-icon>
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-container">
          <el-pagination
            v-model:current-page="roleCurrentPage"
            v-model:page-size="rolePageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="roleTotalItems"
            layout="total, sizes, prev, pager, next"
            @size-change="handleRoleSizeChange"
            @current-change="handleRoleCurrentChange"
          />
        </div>
      </div>
    </el-dialog>

    <!-- Create/Edit Role Dialog -->
    <el-dialog
      v-model="roleFormDialogVisible"
      :title="isEditRole ? 'Edit Role' : 'Create Role'"
      width="500px"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      class="role-form-dialog"
      @click="handleRoleFormDialogClick"
    >
      <div class="role-form-container" @click.stop>
        <el-form
          ref="roleFormRef"
          :model="roleForm"
          :rules="roleRules"
          label-position="top"
        >
          <el-form-item label="Role Name" prop="name">
            <el-input 
              v-model="roleForm.name" 
              placeholder="Enter role name"
              :disabled="isEditRole && roleForm.name === 'Super Admin'"
            />
          </el-form-item>
          
          <el-form-item label="Description" prop="description">
            <el-input 
              v-model="roleForm.description" 
              type="textarea" 
              :rows="3"
              placeholder="Enter role description"
              :disabled="isEditRole && roleForm.name === 'Super Admin'"
            />
            <div class="word-count" :class="{ 'exceeded': descriptionWordCount > 200 }">
              {{ descriptionWordCount }}/200 words
            </div>
          </el-form-item>
        </el-form>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="roleFormDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitRoleForm" :loading="roleLoading">
            {{ isEditRole ? 'Update' : 'Create' }}
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- Permission Management Dialog -->
    <el-dialog
      v-model="permissionDialogVisible"
      title="Permission Management"
      width="800px"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      class="permission-dialog"
      @click="handlePermissionDialogClick"
    >
      <div class="permission-container" @click.stop>
        <div class="permission-header">
          <h3>System Permissions</h3>
          <el-button type="primary" @click="showCreatePermissionDialog">
            <el-icon><Plus /></el-icon>
            Add Permission
          </el-button>
        </div>

        <el-table
          :data="permissions"
          style="width: 100%"
          v-loading="permissionLoading"
        >
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="Permission Name" />
          <el-table-column prop="guard_name" label="Guard Name" />
          <el-table-column prop="created_at" label="Created At" width="180">
            <template #default="{ row }">
              {{ formatDate(row.created_at) }}
            </template>
          </el-table-column>
          <el-table-column label="Actions" width="150" fixed="right">
            <template #default="{ row }">
              <el-button-group>
                <el-button type="primary" size="small" @click="editPermission(row)">
                  <el-icon><Edit /></el-icon>
                </el-button>
                <el-button 
                  type="danger" 
                  size="small" 
                  @click="deletePermission(row)"
                >
                  <el-icon><Delete /></el-icon>
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-container">
          <el-pagination
            v-model:current-page="permissionCurrentPage"
            v-model:page-size="permissionPageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="permissionTotalItems"
            layout="total, sizes, prev, pager, next"
            @size-change="handlePermissionSizeChange"
            @current-change="handlePermissionCurrentChange"
          />
        </div>
      </div>
    </el-dialog>

    <!-- Create/Edit Permission Dialog -->
    <el-dialog
      v-model="permissionFormDialogVisible"
      :title="isEditPermission ? 'Edit Permission' : 'Create Permission'"
      width="500px"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      class="permission-form-dialog"
      @click="handlePermissionFormDialogClick"
    >
      <div class="permission-form-container" @click.stop>
        <el-form
          ref="permissionFormRef"
          :model="permissionForm"
          :rules="permissionRules"
          label-position="top"
        >
          <el-form-item label="Permission Name" prop="name">
            <el-input 
              v-model="permissionForm.name" 
              placeholder="Enter permission name"
            />
          </el-form-item>
          
          <el-form-item label="Guard Name" prop="guard_name">
            <el-input 
              v-model="permissionForm.guard_name" 
              placeholder="Enter guard name (default: web)"
              :disabled="isEditPermission"
            />
          </el-form-item>
        </el-form>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="permissionFormDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitPermissionForm" :loading="permissionLoading">
            {{ isEditPermission ? 'Update' : 'Create' }}
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- Role Permission Assignment Dialog -->
    <el-dialog
      v-model="rolePermissionDialogVisible"
      title="Role Permissions"
      width="800px"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      class="role-permission-dialog"
      @click="handleRolePermissionDialogClick"
    >
      <div class="role-permission-container" @click.stop>
        <div class="role-permission-header">
          <h3>Assign Permissions to Roles</h3>
        </div>

        <el-table
          :data="roles"
          style="width: 100%"
          v-loading="roleLoading"
        >
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="Role Name" />
          <el-table-column prop="description" label="Description" />
          <el-table-column prop="permission_count" label="Permissions" width="120">
            <template #default="{ row }">
              <el-tag type="info" size="small">
                {{ row.permission_count || 0 }} Permissions
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Actions" width="120" fixed="right">
            <template #default="{ row }">
              <el-button 
                type="primary" 
                size="small" 
                @click="showAssignPermissionsDialog(row)"
              >
                <el-icon><Setting /></el-icon>
                <span class="button-text">Assign</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-container">
          <el-pagination
            v-model:current-page="roleCurrentPage"
            v-model:page-size="rolePageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="roleTotalItems"
            layout="total, sizes, prev, pager, next"
            @size-change="handleRoleSizeChange"
            @current-change="handleRoleCurrentChange"
          />
        </div>
      </div>
    </el-dialog>

    <!-- Assign Permissions Dialog -->
    <el-dialog
      v-model="assignPermissionsDialogVisible"
      :title="`Assign Permissions - ${selectedRole?.name || ''}`"
      width="600px"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      class="assign-permissions-dialog"
      @click="handleAssignPermissionsDialogClick"
    >
      <div class="assign-permissions-container" @click.stop>
        <div v-if="permissionLoading" class="permissions-loading">
          <el-skeleton :rows="6" animated />
        </div>
        <el-form
          v-else
          ref="assignPermissionsFormRef"
          :model="assignPermissionsForm"
          label-position="top"
        >
          <el-form-item label="Permissions" prop="permissions">
            <div class="permissions-header">
              <el-checkbox
                v-model="selectAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
              >
                Select All
              </el-checkbox>
            </div>
            <div class="permissions-grid">
              <el-checkbox-group 
                v-model="assignPermissionsForm.permissions"
                @change="handleCheckedPermissionsChange"
              >
                <el-checkbox
                  v-for="permission in allPermissions"
                  :key="permission.id"
                  :label="permission.id"
                  @change="(val) => handlePermissionChange(permission.id, val)"
                >
                  {{ permission.name }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="assignPermissionsDialogVisible = false">Cancel</el-button>
          <el-button 
            type="primary" 
            @click="submitAssignPermissions" 
            :loading="permissionLoading"
            :disabled="permissionLoading"
          >
            Assign Permissions
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- Assign Role Dialog -->
    <el-dialog
      v-model="assignRoleDialogVisible"
      :title="`Assign Roles - ${selectedAdmin?.name || ''}`"
      width="600px"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      class="assign-role-dialog"
      @click="handleAssignRoleDialogClick"
    >
      <div class="assign-role-container" @click.stop>
        <div v-if="roleLoading" class="role-loading">
          <el-skeleton :rows="3" animated />
        </div>
        <el-form
          v-else
          ref="assignRoleFormRef"
          :model="assignRoleForm"
          label-position="top"
        >
          <el-form-item label="Roles" prop="roles">
            <div class="roles-header">
              <el-checkbox
                v-model="selectAllRoles"
                :indeterminate="isRolesIndeterminate"
                @change="handleCheckAllRolesChange"
              >
                Select All
              </el-checkbox>
            </div>
            <div class="roles-grid">
              <el-checkbox-group 
                v-model="assignRoleForm.roles"
                @change="handleCheckedRolesChange"
              >
                <el-checkbox
                  v-for="role in roles"
                  :key="role.id"
                  :label="role.name"
                  :disabled="role.name === 'super-admin'"
                  @change="(val) => handleRoleChange(role.name, val)"
                >
                  {{ role.name }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="assignRoleDialogVisible = false">Cancel</el-button>
          <el-button 
            type="primary" 
            @click="submitAssignRole" 
            :loading="roleLoading"
          >
            Assign Roles
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import { ref, watch, onMounted, nextTick, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  Plus, 
  Edit, 
  Delete, 
  Search, 
  View, 
  Message, 
  Phone, 
  CircleCheck, 
  CircleClose,
  User,
  Setting,
  Timer,
  Lock,
  Location,
  UserFilled
} from '@element-plus/icons-vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

// State
const route = useRoute()
const router = useRouter()
const toast = useToast()
const loading = ref(false)
const searchQuery = ref('')
const emailFilter = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(0)
const dialogVisible = ref(false)
const isEdit = ref(false)
const admins = ref([])
const orderBy = ref('')
const viewDialogVisible = ref(false)
const selectedAdmin = ref(null)
const viewAdminData = ref({
  name: '',
  email: '',
  phone_number: '',
  role_name: '',
  status: '',
  created_at: '',
  last_login_at: '',
  location: '',
  two_factor_enabled: false
})

// Local form state
const localForm = ref({
  id: null,
  merchant_id: '',
  name: '',
  email: '',
  phone_number: '',
  location: '',
  role_name: '',
  password: '',
  status: 'active'
})

// Computed property for form data
const adminForm = computed({
  get: () => {
    if (isEdit.value && selectedAdmin.value) {
      return {
        id: selectedAdmin.value.id,
        merchant_id: selectedAdmin.value.merchant_id || '',
        name: selectedAdmin.value.name || '',
        email: selectedAdmin.value.email || '',
        phone_number: selectedAdmin.value.phone_number || '',
        location: selectedAdmin.value.location || '',
        role_name: selectedAdmin.value.role_name || '',
        status: selectedAdmin.value.status || 'active',
        password: ''
      }
    }
    return localForm.value
  },
  set: (val) => {
    localForm.value = val
  }
})

// Form validation rules
const adminRules = {
  name: [
    { required: true, message: 'Please enter name', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Please enter email', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email', trigger: 'blur' }
  ],
  phone_number: [
    { required: true, message: 'Please enter phone number', trigger: 'blur' },
    { pattern: /^[0-9+\-\s()]*$/, message: 'Please enter a valid phone number', trigger: 'blur' }
  ],
  location: [
    { required: true, message: 'Please enter location', trigger: 'blur' }
  ],
  role_name: [
    { required: true, message: 'Please select role', trigger: 'change' }
  ],
  password: [
    { required: true, message: 'Please enter password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
  ],
  status: [
    { required: true, message: 'Please select status', trigger: 'change' }
  ]
}

// Add form ref
const adminFormRef = ref(null)

// API calls
const fetchAdmins = async () => {
  try {
    loading.value = true
    const response = await axios.get('/admins', {
      params: {
        page: currentPage.value,
        per_page: pageSize.value,
        search: searchQuery.value,
        email: emailFilter.value,
        status: statusFilter.value,
        orderBy: orderBy.value
      }
    })
    
    if (response.data && response.data.result) {
      admins.value = response.data.result.data
      totalItems.value = response.data.result.total || 0
    }
  } catch (error) {
    toast.error('Failed to fetch admins')
    console.error('Error fetching admins:', error)
  } finally {
    loading.value = false
  }
}

const submitForm = async () => {
  if (!adminFormRef.value) return

  try {
    // Validate form before submission
    await adminFormRef.value.validate()
    
    loading.value = true
    if (isEdit.value) {
      // For update, we need to send role_id instead of role
      const updateData = {
        ...adminForm.value,
        role_id: adminForm.value.role_name === 'Super Admin' ? 1 : 2
      }
      delete updateData.role_name
      
      await axios.post(`/admins/update/${adminForm.value.id}`, updateData)
      toast.success('Admin updated successfully')
    } else {
      // For create, we need to send role_id instead of role
      const createData = {
        ...adminForm.value,
        role_id: adminForm.value.role_name === 'Super Admin' ? 1 : 2
      }
      delete createData.role_name
      
      await axios.post('/admins/store', createData)
      toast.success('Admin created successfully')
    }
    dialogVisible.value = false
    fetchAdmins()
  } catch (error) {
    if (error.response?.data?.errors) {
      const errorMessages = Object.values(error.response.data.errors).flat()
      toast.error(errorMessages.join('\n'))
    } else if (error.name === 'ValidationError') {
      // Form validation error
      toast.error('Please fill in all required fields correctly')
    } else {
      toast.error(isEdit.value ? 'Failed to update admin' : 'Failed to create admin')
    }
    console.error('Error submitting form:', error)
  } finally {
    loading.value = false
  }
}

const deleteAdmin = async (admin) => {
  try {
    await ElMessageBox.confirm(
      `Are you sure you want to delete admin ${admin.name}?`,
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }
    )
    
    loading.value = true
    await axios.get(`/admins/delete/${admin.id}`)
    toast.success('Admin deleted successfully')
    fetchAdmins()
  } catch (error) {
    if (error !== 'cancel') {
      toast.error('Failed to delete admin')
      console.error('Error deleting admin:', error)
    }
  } finally {
    loading.value = false
  }
}

// Watch for route changes
watch(() => route.path, (newPath) => {
  if (newPath === '/admin/list') {
    fetchAdmins()
  }
}, { immediate: true })

// Watch for changes in filters and pagination
watch([searchQuery, emailFilter, statusFilter], () => {
  currentPage.value = 1
  fetchAdmins()
})

watch([currentPage, pageSize], () => {
  fetchAdmins()
})

// Initial fetch
onMounted(() => {
  fetchAdmins()
})

// Methods
const resetForm = () => {
  adminForm.value = {
    id: null,
    merchant_id: '',
    name: '',
    email: '',
    phone_number: '',
    location: '',
    role_name: '',
    password: '',
    status: 'active'
  }
}

const showCreateDialog = () => {
  isEdit.value = false
  dialogVisible.value = true
  
  // Reset form with default values for new admin
  adminForm.value = {
    id: null,
    merchant_id: '',
    name: '',
    email: '',
    phone_number: '',
    location: '',
    role_name: '',
    password: '',
    status: 'active'
  }
}

const editAdmin = (admin) => {
  isEdit.value = true
  dialogVisible.value = true
  
  // Reset form first to clear any previous state
  adminForm.value = {
    id: null,
    merchant_id: '',
    name: '',
    email: '',
    phone_number: '',
    location: '',
    role_name: '',
    password: '',
    status: 'active'
  }
  
  // Force a re-render by using setTimeout
  setTimeout(() => {
    adminForm.value = {
      id: admin.id,
      merchant_id: admin.merchant_id || '',
      name: admin.name || '',
      email: admin.email || '',
      phone_number: admin.phone_number || '',
      location: admin.location || '',
      role_name: admin.role_name || '',
      status: admin.status || 'active',
      password: ''
    }
    console.log('Form data set:', adminForm.value)
  }, 0)
}

const handleSizeChange = (val) => {
  pageSize.value = val
  fetchAdmins()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchAdmins()
}

const handleSortChange = ({ prop, order }) => {
  if (!order) {
    orderBy.value = 'id' // Default sort by ID when no order is selected
  } else {
    orderBy.value = order === 'ascending' ? prop : `-${prop}`
  }
  fetchAdmins()
}

const viewAdmin = async (admin) => {
  viewAdminData.value = {
    id: admin.id,
    name: admin.name || '',
    email: admin.email || '',
    phone_number: admin.phone_number || '',
    role_name: admin.role_name || '',
    status: admin.status || '',
    created_at: admin.created_at || '',
    last_login_at: admin.last_login_at || '',
    location: admin.location || '',
    two_factor_enabled: admin.two_factor_enabled || false
  }
  viewDialogVisible.value = true
  showRoles.value = false
}

// Add date formatting function
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Add click handlers for dialogs
const handleDialogClick = (event) => {
  // If the click is on the dialog backdrop, close the dialog
  if (event.target.classList.contains('el-overlay')) {
    dialogVisible.value = false
  }
}

const handleViewDialogClick = (event) => {
  // If the click is on the dialog backdrop, close the dialog
  if (event.target.classList.contains('el-overlay')) {
    viewDialogVisible.value = false
  }
}

// Add data-label attributes to table columns for mobile view
const tableColumns = [
  { prop: 'id', label: 'ID' },
  { prop: 'name', label: 'Name' },
  { prop: 'email', label: 'Email' },
  { prop: 'role_name', label: 'Role' },
  { prop: 'status', label: 'Status' }
]

// Role Management State
const roleDialogVisible = ref(false)
const roleFormDialogVisible = ref(false)
const isEditRole = ref(false)
const roles = ref([])
const roleLoading = ref(false)
const roleFormRef = ref(null)
const roleCurrentPage = ref(1)
const rolePageSize = ref(10)
const roleTotalItems = ref(0)

const roleForm = ref({
  id: null,
  name: '',
  description: ''
})

const roleRules = {
  name: [
    { required: true, message: 'Please enter role name', trigger: 'blur' },
    { min: 3, message: 'Role name must be at least 3 characters', trigger: 'blur' }
  ],
  description: [
    { required: true, message: 'Please enter role description', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (value) {
          const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 200) {
            callback(new Error('Description cannot exceed 200 words'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
}

// Add a computed property for word count
const descriptionWordCount = computed(() => {
  if (!roleForm.value.description) return 0;
  return roleForm.value.description.trim().split(/\s+/).length;
});

// Role Management Methods
const showRoleDialog = async () => {
  roleDialogVisible.value = true
  await fetchRoles()
}

const fetchRoles = async () => {
  try {
    roleLoading.value = true
    const response = await axios.get('/roles', {
      params: {
        page: roleCurrentPage.value,
        per_page: rolePageSize.value
      }
    })
    
    if (response.data && response.data.data) {
      roles.value = response.data.data.data
      roleTotalItems.value = response.data.data.total || 0
    }
  } catch (error) {
    toast.error('Failed to fetch roles')
    console.error('Error fetching roles:', error)
  } finally {
    roleLoading.value = false
  }
}

const showCreateRoleDialog = () => {
  isEditRole.value = false
  roleForm.value = {
    id: null,
    name: '',
    description: ''
  }
  roleFormDialogVisible.value = true
}

const editRole = async (role) => {
  try {
    roleLoading.value = true
    selectedRole.value = role
    roleForm.value = {
      id: role.id,
      name: role.name,
      description: role.description
    }
    isEditRole.value = true
    roleFormDialogVisible.value = true
  } catch (error) {
    toast.error('Failed to load role data')
    console.error('Error loading role:', error)
  } finally {
    roleLoading.value = false
  }
}

const deleteRole = async (role) => {
  try {
    await ElMessageBox.confirm(
      `Are you sure you want to delete role ${role.name}?`,
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }
    )
    
    roleLoading.value = true
    await axios.get(`/roles/delete/${role.id}`, {
      params: {
        id: role.id
      }
    })
    toast.success('Role deleted successfully')
    fetchRoles()
  } catch (error) {
    if (error !== 'cancel') {
      toast.error('Failed to delete role')
      console.error('Error deleting role:', error)
    }
  } finally {
    roleLoading.value = false
  }
}

const submitRoleForm = async () => {
  if (!roleFormRef.value) return

  try {
    await roleFormRef.value.validate()
    roleLoading.value = true

    if (isEditRole.value) {
      const updateData = {
        name: roleForm.value.name,
        description: roleForm.value.description
      }
      
      await axios.post(`/roles/update/${roleForm.value.id}`, updateData)
      toast.success('Role updated successfully')
    } else {
      const createData = {
        name: roleForm.value.name,
        description: roleForm.value.description
      }
      
      await axios.post('/roles/store', createData)
      toast.success('Role created successfully')
    }

    roleFormDialogVisible.value = false
    await fetchRoles()
  } catch (error) {
    if (error.response?.data?.message) {
      toast.error(error.response.data.message)
    } else if (error.name === 'ValidationError') {
      toast.error('Please fill in all required fields correctly')
    } else {
      toast.error(isEditRole.value ? 'Failed to update role' : 'Failed to create role')
    }
    console.error('Error submitting role form:', error)
  } finally {
    roleLoading.value = false
  }
}

const handleRoleDialogClick = (event) => {
  if (event.target.classList.contains('el-overlay')) {
    roleDialogVisible.value = false
  }
}

const handleRoleFormDialogClick = (event) => {
  if (event.target.classList.contains('el-overlay')) {
    roleFormDialogVisible.value = false
  }
}

const handleRoleSizeChange = (val) => {
  rolePageSize.value = val
  fetchRoles()
}

const handleRoleCurrentChange = (val) => {
  roleCurrentPage.value = val
  fetchRoles()
}

// Permission Management State
const permissionDialogVisible = ref(false)
const permissionFormDialogVisible = ref(false)
const isEditPermission = ref(false)
const permissions = ref([])
const permissionLoading = ref(false)
const permissionFormRef = ref(null)
const permissionCurrentPage = ref(1)
const permissionPageSize = ref(10)
const permissionTotalItems = ref(0)

const permissionForm = ref({
  id: null,
  name: '',
  guard_name: 'web'
})

const permissionRules = {
  name: [
    { required: true, message: 'Please enter permission name', trigger: 'blur' },
    { min: 3, message: 'Permission name must be at least 3 characters', trigger: 'blur' }
  ],
  guard_name: [
    { required: true, message: 'Please enter guard name', trigger: 'blur' }
  ]
}

// Permission Management Methods
const showPermissionDialog = async () => {
  permissionDialogVisible.value = true
  await fetchPermissions()
}

const fetchPermissions = async () => {
  try {
    permissionLoading.value = true
    const response = await axios.get('/permissions', {
      params: {
        page: permissionCurrentPage.value,
        per_page: permissionPageSize.value
      }
    })
    
    if (response.data && response.data.data) {
      permissions.value = response.data.data.data
      permissionTotalItems.value = response.data.data.total || 0
    }
  } catch (error) {
    toast.error('Failed to fetch permissions')
    console.error('Error fetching permissions:', error)
  } finally {
    permissionLoading.value = false
  }
}

const showCreatePermissionDialog = () => {
  isEditPermission.value = false
  permissionForm.value = {
    id: null,
    name: '',
    guard_name: 'web'
  }
  permissionFormDialogVisible.value = true
}

const editPermission = (permission) => {
  isEditPermission.value = true
  permissionForm.value = {
    id: permission.id,
    name: permission.name,
    guard_name: permission.guard_name
  }
  permissionFormDialogVisible.value = true
}

const deletePermission = async (permission) => {
  try {
    await ElMessageBox.confirm(
      `Are you sure you want to delete permission ${permission.name}?`,
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }
    )
    
    permissionLoading.value = true
    await axios.get(`/permissions/delete/${permission.id}`)
    toast.success('Permission deleted successfully')
    fetchPermissions()
  } catch (error) {
    if (error !== 'cancel') {
      toast.error('Failed to delete permission')
      console.error('Error deleting permission:', error)
    }
  } finally {
    permissionLoading.value = false
  }
}

const submitPermissionForm = async () => {
  if (!permissionFormRef.value) return

  try {
    await permissionFormRef.value.validate()
    permissionLoading.value = true

    if (isEditPermission.value) {
      await axios.post(`/permissions/update/${permissionForm.value.id}`, permissionForm.value)
      toast.success('Permission updated successfully')
    } else {
      await axios.post('/permissions/store', permissionForm.value)
      toast.success('Permission created successfully')
    }

    permissionFormDialogVisible.value = false
    await fetchPermissions()
  } catch (error) {
    if (error.response?.data?.message) {
      toast.error(error.response.data.message)
    } else if (error.name === 'ValidationError') {
      toast.error('Please fill in all required fields correctly')
    } else {
      toast.error(isEditPermission.value ? 'Failed to update permission' : 'Failed to create permission')
    }
    console.error('Error submitting permission form:', error)
  } finally {
    permissionLoading.value = false
  }
}

const handlePermissionSizeChange = (val) => {
  permissionPageSize.value = val
  fetchPermissions()
}

const handlePermissionCurrentChange = (val) => {
  permissionCurrentPage.value = val
  fetchPermissions()
}

const handlePermissionDialogClick = (event) => {
  if (event.target.classList.contains('el-overlay')) {
    permissionDialogVisible.value = false
  }
}

const handlePermissionFormDialogClick = (event) => {
  if (event.target.classList.contains('el-overlay')) {
    permissionFormDialogVisible.value = false
  }
}

// Role Permission Assignment State
const rolePermissionDialogVisible = ref(false)
const selectedRole = ref(null)
const assignPermissionsDialogVisible = ref(false)
const assignPermissionsFormRef = ref(null)
const allPermissions = ref([])
const assignPermissionsForm = ref({
  role_id: null,
  permissions: []
})

// Add these new refs for select all functionality
const selectAll = ref(false)
const isIndeterminate = ref(false)

// Role Permission Assignment Methods
const showRolePermissionDialog = async () => {
  try {
    rolePermissionDialogVisible.value = true
    await fetchRoles()
  } catch (error) {
    console.error('Error showing role permission dialog:', error)
    toast.error('Failed to open role permissions dialog')
  }
}

const showAssignPermissionsDialog = async (role) => {
  try {
    selectedRole.value = role
    assignPermissionsForm.value = {
      role_id: role.id,
      permissions: []
    }
    assignPermissionsDialogVisible.value = true
    permissionLoading.value = true
    
    // Reset select all state
    selectAll.value = false
    isIndeterminate.value = false
    
    // First get all permissions
    const allPermissionsResponse = await axios.get('/roles/permissions/all')
    
    if (allPermissionsResponse.data && allPermissionsResponse.data.data) {
      // Set all available permissions
      allPermissions.value = allPermissionsResponse.data.data
      
      // Get current role permissions
      const rolePermissionsResponse = await axios.get(`/roles/${role.id}/roles`, {
        permissions: allPermissions.value.map(p => p.id)
      })
      
      if (rolePermissionsResponse.data && rolePermissionsResponse.data.data) {
        // Only set the currently assigned permissions as selected
        assignPermissionsForm.value.permissions = rolePermissionsResponse.data.data.map(p => p.id)
        
        // Update select all and indeterminate states
        const checkedCount = assignPermissionsForm.value.permissions.length
        const totalCount = allPermissions.value.length
        
        selectAll.value = checkedCount === totalCount
        isIndeterminate.value = checkedCount > 0 && checkedCount < totalCount
      }
    }
  } catch (error) {
    console.error('Error showing assign permissions dialog:', error)
    toast.error('Failed to load permissions')
  } finally {
    permissionLoading.value = false
  }
}

const submitAssignPermissions = async () => {
  if (!assignPermissionsForm.value.role_id) return

  try {
    permissionLoading.value = true
    
    // Initialize permissions array if it's null or undefined
    if (!assignPermissionsForm.value.permissions) {
      assignPermissionsForm.value.permissions = []
    }

    // Ensure permissions is an array
    if (!Array.isArray(assignPermissionsForm.value.permissions)) {
      assignPermissionsForm.value.permissions = []
    }

    // Create the payload with only the selected permissions
    const payload = {
      permissions: assignPermissionsForm.value.permissions  // This will contain only the selected permission IDs
    }

    console.log('Submitting permissions payload:', payload) // Debug log

    // Validate that we have a role_id before making the request
    if (!assignPermissionsForm.value.role_id) {
      throw new Error('Role ID is required')
    }

    await axios.post(`/roles/${assignPermissionsForm.value.role_id}/permissions`, payload)
    
    toast.success('Permissions assigned successfully')
    assignPermissionsDialogVisible.value = false
    // Refresh the roles list to show updated permissions
    await fetchRoles()
  } catch (error) {
    console.error('Error response:', error.response) // Debug log
    if (error.response?.data?.errors) {
      const errorMessages = Object.values(error.response.data.errors).flat()
      toast.error(errorMessages.join('\n'))
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message)
    } else {
      toast.error('Failed to assign permissions')
    }
  } finally {
    permissionLoading.value = false
  }
}

const handleCheckAllChange = (val) => {
  // If select all is checked, add all permission IDs
  // If unchecked, clear all permissions
  assignPermissionsForm.value.permissions = val ? allPermissions.value.map(p => p.id) : []
  isIndeterminate.value = false
}

const handleCheckedPermissionsChange = (value) => {
  // Update the permissions array with the selected values
  assignPermissionsForm.value.permissions = value
  
  // Update select all and indeterminate states
  const checkedCount = value.length
  const totalCount = allPermissions.value.length
  
  selectAll.value = checkedCount === totalCount
  isIndeterminate.value = checkedCount > 0 && checkedCount < totalCount
}

// Add this new function to handle individual checkbox changes
const handlePermissionChange = (permissionId, checked) => {
  if (checked) {
    // Add permission if not already in the array
    if (!assignPermissionsForm.value.permissions.includes(permissionId)) {
      assignPermissionsForm.value.permissions.push(permissionId)
    }
  } else {
    // Remove permission from array
    assignPermissionsForm.value.permissions = assignPermissionsForm.value.permissions.filter(id => id !== permissionId)
  }
  
  // Update select all and indeterminate states
  const checkedCount = assignPermissionsForm.value.permissions.length
  const totalCount = allPermissions.value.length
  
  selectAll.value = checkedCount === totalCount
  isIndeterminate.value = checkedCount > 0 && checkedCount < totalCount
}

const handleRolePermissionDialogClick = (event) => {
  if (event.target.classList.contains('el-overlay')) {
    rolePermissionDialogVisible.value = false
  }
}

const handleAssignPermissionsDialogClick = (event) => {
  if (event.target.classList.contains('el-overlay')) {
    assignPermissionsDialogVisible.value = false
  }
}

// Add new state for role assignment
const assignRoleDialogVisible = ref(false)
const assignRoleFormRef = ref(null)
const assignRoleForm = ref({
  roles: []
})

// Add these new refs for role selection
const selectAllRoles = ref(false)
const isRolesIndeterminate = ref(false)

// Role Permission Assignment Methods
const showAssignRoleDialog = async (admin) => {
  try {
    selectedAdmin.value = admin
    assignRoleDialogVisible.value = true
    roleLoading.value = true
    
    // Fetch roles if not already loaded
    if (roles.value.length === 0) {
      await fetchRoles()
    }

    // Get the current roles for the admin
    const response = await axios.get(`/admins/${admin.id}/roles`)
    if (response.data && response.data.data) {
      // Set the selected roles
      assignRoleForm.value.roles = response.data.data.map(role => role.name)
    } else {
      assignRoleForm.value.roles = []
    }

    // Reset select all state
    selectAllRoles.value = false
    isRolesIndeterminate.value = false
    
    // Update select all and indeterminate states
    const checkedCount = assignRoleForm.value.roles.length
    const totalCount = roles.value.length
    
    selectAllRoles.value = checkedCount === totalCount
    isRolesIndeterminate.value = checkedCount > 0 && checkedCount < totalCount
  } catch (error) {
    console.error('Error showing assign role dialog:', error)
    toast.error('Failed to load roles')
  } finally {
    roleLoading.value = false
  }
}

const handleCheckAllRolesChange = (val) => {
  assignRoleForm.value.roles = val ? roles.value.map(r => r.name) : []
  isRolesIndeterminate.value = false
}

const handleCheckedRolesChange = (value) => {
  const checkedCount = value.length
  const totalCount = roles.value.length
  
  selectAllRoles.value = checkedCount === totalCount
  isRolesIndeterminate.value = checkedCount > 0 && checkedCount < totalCount
}

const handleRoleChange = (roleName, checked) => {
  if (checked) {
    if (!assignRoleForm.value.roles.includes(roleName)) {
      assignRoleForm.value.roles.push(roleName)
    }
  } else {
    assignRoleForm.value.roles = assignRoleForm.value.roles.filter(name => name !== roleName)
  }
  
  const checkedCount = assignRoleForm.value.roles.length
  const totalCount = roles.value.length
  
  selectAllRoles.value = checkedCount === totalCount
  isRolesIndeterminate.value = checkedCount > 0 && checkedCount < totalCount
}

const submitAssignRole = async () => {
  if (!assignRoleFormRef.value) return

  try {
    await assignRoleFormRef.value.validate()
    roleLoading.value = true

    // Get role IDs from role names
    const selectedRoleIds = roles.value
      .filter(role => assignRoleForm.value.roles.includes(role.name))
      .map(role => role.id)

    await axios.post(`/roles/assign`, {
      id: selectedAdmin.value.id,
      roles: selectedRoleIds
    })
    
    toast.success('Roles assigned successfully')
    assignRoleDialogVisible.value = false
    await fetchAdmins()
  } catch (error) {
    if (error.response?.data?.message) {
      toast.error(error.response.data.message)
    } else {
      toast.error('Failed to assign roles')
    }
    console.error('Error assigning roles:', error)
  } finally {
    roleLoading.value = false
  }
}

const handleAssignRoleDialogClick = (event) => {
  if (event.target.classList.contains('el-overlay')) {
    assignRoleDialogVisible.value = false
  }
}

// Add this computed property for role count
const roleCount = computed(() => {
  return roles.value.length
})

// Add these new refs
const assignedRolesDialogVisible = ref(false)
const assignedRoles = ref([])

// Add this new method
const showAssignedRoles = async (admin) => {
  try {
    if (!admin.id) {
      toast.error('Admin ID is missing')
      return
    }
    assignedRolesDialogVisible.value = true
    loading.value = true
    const response = await axios.get(`/admins/${admin.id}/roles`)
    if (response.data && response.data.data) {
      assignedRoles.value = response.data.data
    } else {
      assignedRoles.value = []
    }
  } catch (error) {
    console.error('Error fetching assigned roles:', error)
    toast.error('Failed to load assigned roles')
  } finally {
    loading.value = false
  }
}

// Add these new refs
const showRoles = ref(false)

// Update the viewAdmin method
const toggleRolesView = async () => {
  if (!showRoles.value) {
    try {
      loading.value = true
      const response = await axios.get(`/admins/${viewAdminData.value.id}/roles`)
      if (response.data && response.data.data) {
        assignedRoles.value = response.data.data
      } else {
        assignedRoles.value = []
      }
    } catch (error) {
      console.error('Error fetching assigned roles:', error)
      toast.error('Failed to load assigned roles')
    } finally {
      loading.value = false
    }
  }
  showRoles.value = !showRoles.value
}
</script>

<style scoped lang="scss">
.admin-list {
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 16px;

    h2 {
      margin: 0;
    }

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: stretch;
      
      .el-button {
        width: 100%;
      }
    }
  }

  .table-operations {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
    flex-wrap: wrap;

    .search-input {
      width: 300px;
      flex: 1;
      min-width: 200px;
    }

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 12px;

      .search-input {
        width: 100%;
      }
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;

    @media (max-width: 768px) {
      justify-content: center;
    }
  }

  // Table responsive styles
  :deep(.el-table) {
    @media (max-width: 768px) {
      .el-table__header-wrapper {
        display: none;
      }

      .el-table__body-wrapper {
        .el-table__row {
          display: flex;
          flex-direction: column;
          padding: 12px;
          border-bottom: 1px solid var(--el-border-color-lighter);
          position: relative;

          .el-table__cell {
            display: flex;
            padding: 8px 0;
            border: none;
            justify-content: space-between;
            align-items: center;

            &::before {
              content: attr(data-label);
              font-weight: bold;
              margin-right: 16px;
            }

            &.el-table__cell--selection {
              display: none;
            }
          }

          .el-button-group {
            margin-top: 8px;
            display: flex;
            justify-content: flex-end;
            width: 100%;
          }
        }
      }
    }
  }

  // Dialog responsive styles
  .admin-form-dialog,
  .admin-view-dialog {
    :deep(.el-dialog) {
      @media (max-width: 768px) {
        width: 95% !important;
        margin: 10px auto;
      }
    }

    :deep(.el-dialog__body) {
      padding: 0;
    }
  }

  .form-container {
    .form-header {
      background-color: var(--el-color-primary-light-9);
      padding: 24px;
      text-align: center;
      border-bottom: 1px solid var(--el-border-color-lighter);

      @media (max-width: 768px) {
        padding: 16px;
      }

      .form-avatar {
        background-color: var(--el-color-primary);
        color: #ffffff;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 16px;
      }

      h3 {
        margin: 0 0 8px 0;
        font-size: 20px;
        color: var(--el-text-color-primary);

        @media (max-width: 768px) {
          font-size: 18px;
        }
      }

      .form-subtitle {
        margin: 0;
        font-size: 14px;
        color: var(--el-text-color-secondary);
      }
    }

    .admin-form {
      padding: 24px;

      @media (max-width: 768px) {
        padding: 16px;
      }

      .form-section {
        margin-bottom: 24px;

        &:last-child {
          margin-bottom: 0;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 16px 0;
          font-size: 16px;
          color: var(--el-text-color-primary);

          @media (max-width: 768px) {
            font-size: 14px;
          }

          .el-icon {
            color: var(--el-color-primary);
          }
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;

          @media (max-width: 768px) {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .full-width {
            grid-column: 1 / -1;
          }
        }
      }

      :deep(.el-form-item) {
        margin-bottom: 0;

        .el-form-item__label {
          font-weight: 500;
        }

        .el-input__wrapper {
          box-shadow: 0 0 0 1px var(--el-border-color) inset;

          &:hover {
            box-shadow: 0 0 0 1px var(--el-color-primary) inset;
          }

          &.is-focus {
            box-shadow: 0 0 0 1px var(--el-color-primary) inset;
          }
        }

        .el-input__prefix {
          color: var(--el-text-color-secondary);
        }
      }
    }
  }

  .admin-profile {
    .profile-header {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 24px;

      @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
        gap: 16px;
      }

      .profile-avatar-container {
        position: relative;

        .profile-avatar {
          background-color: var(--el-color-primary);
          color: #ffffff;
          font-size: 32px;
          font-weight: bold;
          border: 3px solid var(--el-border-color-lighter);
        }

        .status-indicator {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;

          &.active {
            background-color: var(--el-color-success);
            color: #ffffff;
          }

          &:not(.active) {
            background-color: var(--el-color-info);
            color: #ffffff;
          }
        }
      }

      .profile-title {
        h3 {
          margin: 0 0 8px 0;
          font-size: 24px;
          color: var(--el-text-color-primary);

          @media (max-width: 768px) {
            font-size: 20px;
          }
        }

        .profile-meta {
          display: flex;
          align-items: center;
          gap: 12px;

          @media (max-width: 768px) {
            flex-direction: column;
            gap: 8px;
          }

          .role-tag {
            font-size: 12px;
          }

          .member-since {
            font-size: 12px;
            color: var(--el-text-color-secondary);
          }
        }
      }
    }

    .profile-details {
      .details-section {
        margin-bottom: 24px;

        &:last-child {
          margin-bottom: 0;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 16px 0;
          font-size: 16px;
          color: var(--el-text-color-primary);

          @media (max-width: 768px) {
            font-size: 14px;
          }

          .el-icon {
            color: var(--el-color-primary);
          }
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;

          @media (max-width: 768px) {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px;
          background-color: var(--el-fill-color-light);
          border-radius: 8px;
          transition: all 0.3s ease;

          &:hover {
            background-color: var(--el-fill-color);
          }

          .el-icon {
            font-size: 20px;
            color: var(--el-color-primary);
            margin-top: 2px;
          }

          .detail-content {
            display: flex;
            flex-direction: column;
            gap: 4px;

            .label {
              font-size: 12px;
              color: var(--el-text-color-secondary);
            }

            .value {
              font-size: 14px;
              color: var(--el-text-color-primary);
            }

            .status-tag {
              width: fit-content;
            }
          }
        }
      }
    }
  }

  .dialog-footer {
    padding: 16px 24px;
    border-top: 1px solid var(--el-border-color-lighter);
    display: flex;
    justify-content: flex-end;
    gap: 12px;

    @media (max-width: 768px) {
      flex-direction: column;
      padding: 16px;

      .el-button {
        width: 100%;
      }
    }
  }

  .header-actions {
    display: flex;
    gap: 12px;

    @media (max-width: 768px) {
      flex-direction: column;
      width: 100%;
    }

    .el-button {
      .el-icon {
        margin-right: 8px;
      }

      .button-text {
        margin-left: 4px;
      }
    }
  }

  .role-dialog {
    :deep(.el-dialog__body) {
      padding: 0;
    }
  }

  .role-container {
    .role-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      border-bottom: 1px solid var(--el-border-color-lighter);

      h3 {
        margin: 0;
        font-size: 18px;
        color: var(--el-text-color-primary);
      }

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;

        .el-button {
          width: 100%;
        }
      }
    }

    :deep(.el-table) {
      margin: 0;
    }
  }

  .role-form-dialog {
    :deep(.el-dialog__body) {
      padding: 24px;
    }
  }

  .role-form-container {
    :deep(.el-form-item) {
      margin-bottom: 24px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .word-count {
    font-size: 12px;
    color: var(--el-text-color-secondary);
    margin-top: 4px;
    text-align: right;

    &.exceeded {
      color: var(--el-color-danger);
    }
  }

  .permission-dialog {
    :deep(.el-dialog__body) {
      padding: 0;
    }
  }

  .permission-container {
    .permission-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      border-bottom: 1px solid var(--el-border-color-lighter);

      h3 {
        margin: 0;
        font-size: 18px;
        color: var(--el-text-color-primary);
      }

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;

        .el-button {
          width: 100%;
        }
      }
    }

    :deep(.el-table) {
      margin: 0;
    }
  }

  .permission-form-dialog {
    :deep(.el-dialog__body) {
      padding: 24px;
    }
  }

  .permission-form-container {
    :deep(.el-form-item) {
      margin-bottom: 24px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .permissions-header {
    padding: 0 12px 12px;
    border-bottom: 1px solid var(--el-border-color-lighter);
    margin-bottom: 12px;
  }

  .permissions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
    max-height: 400px;
    overflow-y: auto;
    padding: 12px;
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 4px;

    :deep(.el-checkbox) {
      margin-right: 0;
      margin-bottom: 8px;
      width: 100%;
    }
  }

  .assign-permissions-dialog {
    :deep(.el-dialog__body) {
      padding: 24px;
    }
  }

  .assign-permissions-container {
    :deep(.el-form-item) {
      margin-bottom: 24px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .full-width {
    width: 100%;
  }

  .role-permission-dialog {
    :deep(.el-dialog__body) {
      padding: 0;
    }
  }

  .role-permission-container {
    .role-permission-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      border-bottom: 1px solid var(--el-border-color-lighter);

      h3 {
        margin: 0;
        font-size: 18px;
        color: var(--el-text-color-primary);
      }

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;
      }
    }

    :deep(.el-table) {
      margin: 0;
    }
  }

  .role-loading {
    padding: 20px;
    
    :deep(.el-skeleton) {
      padding: 20px;
    }
  }

  .assign-role-dialog {
    :deep(.el-dialog__body) {
      padding: 24px;
    }
  }

  .assign-role-container {
    :deep(.el-form-item) {
      margin-bottom: 24px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .roles-header {
    padding: 0 12px 12px;
    border-bottom: 1px solid var(--el-border-color-lighter);
    margin-bottom: 12px;
  }

  .roles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
    max-height: 400px;
    overflow-y: auto;
    padding: 12px;
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 4px;

    :deep(.el-checkbox) {
      margin-right: 0;
      margin-bottom: 8px;
      width: 100%;
    }
  }

  .role-count {
    margin-left: 4px;
    font-size: 12px;
  }

  .roles-loading {
    padding: 20px;
    
    :deep(.el-skeleton) {
      padding: 20px;
    }
  }

  .roles-section {
    padding: 20px;

    h3 {
      margin: 0 0 20px 0;
      font-size: 18px;
      color: var(--el-text-color-primary);
    }
  }
}

.el-tag {
  &.el-tag--info {
    background-color: var(--el-color-info-light-9);
    border-color: var(--el-color-info-light-8);
    color: var(--el-color-info);
  }
}
</style> 