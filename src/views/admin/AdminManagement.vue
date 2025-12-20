<template>
  <div class="admin-management">
    <div class="page-header">
      <h2>Admin Management</h2>
      <el-button type="primary" @click="showCreateDialog">
        <el-icon><Plus /></el-icon>
        Add Admin
      </el-button>
    </div>

    <el-row :gutter="20" class="admin-summary">
      <el-col :span="6">
        <el-card class="summary-card">
          <template #header>
            <div class="card-header">
              <span>Total Admins</span>
            </div>
          </template>
          <div class="summary-value">{{ totalAdmins }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="summary-card">
          <template #header>
            <div class="card-header">
              <span>Super Admins</span>
            </div>
          </template>
          <div class="summary-value primary">{{ superAdmins }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="summary-card">
          <template #header>
            <div class="card-header">
              <span>Sub Admins</span>
            </div>
          </template>
          <div class="summary-value info">{{ subAdmins }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="summary-card">
          <template #header>
            <div class="card-header">
              <span>Department Heads</span>
            </div>
          </template>
          <div class="summary-value success">{{ departmentHeads }}</div>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="admin-table-card">
      <div class="table-operations">
        <el-input
          v-model="searchQuery"
          placeholder="Search admins..."
          class="search-input"
          :prefix-icon="Search"
        />
        <el-select v-model="levelFilter" placeholder="Admin Level" clearable>
          <el-option label="Super Admin" :value="1" />
          <el-option label="Sub Admin" :value="2" />
          <el-option label="Department Head" :value="3" />
        </el-select>
        <el-select v-model="departmentFilter" placeholder="Department" clearable>
          <el-option
            v-for="dept in departments"
            :key="dept.id"
            :label="dept.name"
            :value="dept.id"
          />
        </el-select>
      </div>

      <el-table
        :data="filteredAdmins"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column prop="user.name" label="Name" />
        <el-table-column prop="user.email" label="Email" />
        <el-table-column prop="department.name" label="Department" />
        <el-table-column prop="level" label="Level" width="120">
          <template #default="{ row }">
            <el-tag :type="getLevelType(row.level)">
              {{ getLevelLabel(row.level) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status ? 'success' : 'danger'">
              {{ row.status ? 'Active' : 'Inactive' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="250" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button type="primary" size="small" @click="viewAdmin(row)">
                <el-icon><View /></el-icon>
              </el-button>
              <el-button type="success" size="small" @click="editAdmin(row)">
                <el-icon><Edit /></el-icon>
              </el-button>
              <el-button type="danger" size="small" @click="deleteAdmin(row)">
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
    >
      <el-form
        ref="adminForm"
        :model="adminForm"
        :rules="adminRules"
        label-position="top"
      >
        <el-form-item label="User" prop="user_id" v-if="!isEdit">
          <el-select
            v-model="adminForm.user_id"
            placeholder="Select user"
            filterable
          >
            <el-option
              v-for="user in availableUsers"
              :key="user.id"
              :label="user.name"
              :value="user.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Admin Level" prop="level">
          <el-select v-model="adminForm.level" placeholder="Select level">
            <el-option label="Super Admin" :value="1" />
            <el-option label="Sub Admin" :value="2" />
            <el-option label="Department Head" :value="3" />
          </el-select>
        </el-form-item>

        <el-form-item label="Department" prop="department_id">
          <el-select v-model="adminForm.department_id" placeholder="Select department">
            <el-option
              v-for="dept in departments"
              :key="dept.id"
              :label="dept.name"
              :value="dept.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Parent Admin" prop="parent_id" v-if="adminForm.level > 1">
          <el-select v-model="adminForm.parent_id" placeholder="Select parent admin">
            <el-option
              v-for="admin in availableParents"
              :key="admin.id"
              :label="admin.user.name"
              :value="admin.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Permissions" prop="permissions">
          <el-checkbox-group v-model="adminForm.permissions">
            <el-checkbox label="manage_users">Manage Users</el-checkbox>
            <el-checkbox label="manage_roles">Manage Roles</el-checkbox>
            <el-checkbox label="manage_permissions">Manage Permissions</el-checkbox>
            <el-checkbox label="manage_departments">Manage Departments</el-checkbox>
            <el-checkbox label="manage_finance">Manage Finance</el-checkbox>
            <el-checkbox label="view_reports">View Reports</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="Status" prop="status">
          <el-switch v-model="adminForm.status" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitForm">
            {{ isEdit ? 'Update' : 'Create' }}
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- View Admin Dialog -->
    <el-dialog
      v-model="viewDialogVisible"
      title="Admin Details"
      width="800px"
    >
      <template v-if="selectedAdmin">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="Name">
            {{ selectedAdmin.user.name }}
          </el-descriptions-item>
          <el-descriptions-item label="Email">
            {{ selectedAdmin.user.email }}
          </el-descriptions-item>
          <el-descriptions-item label="Department">
            {{ selectedAdmin.department.name }}
          </el-descriptions-item>
          <el-descriptions-item label="Level">
            <el-tag :type="getLevelType(selectedAdmin.level)">
              {{ getLevelLabel(selectedAdmin.level) }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Status">
            <el-tag :type="selectedAdmin.status ? 'success' : 'danger'">
              {{ selectedAdmin.status ? 'Active' : 'Inactive' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Parent Admin" v-if="selectedAdmin.parent">
            {{ selectedAdmin.parent.user.name }}
          </el-descriptions-item>
        </el-descriptions>

        <el-divider>Permissions</el-divider>

        <el-row :gutter="20">
          <el-col :span="8" v-for="permission in selectedAdmin.permissions" :key="permission">
            <el-card class="permission-card">
              {{ formatPermission(permission) }}
            </el-card>
          </el-col>
        </el-row>

        <el-divider>Subordinates</el-divider>

        <el-table :data="selectedAdmin.children" border>
          <el-table-column prop="user.name" label="Name" />
          <el-table-column prop="user.email" label="Email" />
          <el-table-column prop="level" label="Level" width="120">
            <template #default="{ row }">
              <el-tag :type="getLevelType(row.level)">
                {{ getLevelLabel(row.level) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="Status" width="100">
            <template #default="{ row }">
              <el-tag :type="row.status ? 'success' : 'danger'">
                {{ row.status ? 'Active' : 'Inactive' }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, View, Edit, Delete, Search } from '@element-plus/icons-vue'
import axios from 'axios'

// State
const toast = useToast()
const loading = ref(false)
const searchQuery = ref('')
const levelFilter = ref('')
const departmentFilter = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(0)
const dialogVisible = ref(false)
const viewDialogVisible = ref(false)
const isEdit = ref(false)
const selectedAdmin = ref(null)

// Form data
const adminForm = ref({
  user_id: '',
  level: '',
  department_id: '',
  parent_id: '',
  permissions: [],
  status: true
})

// Mock data (replace with API calls)
const admins = ref([
  {
    id: 1,
    user: { name: 'John Doe', email: 'john@example.com' },
    department: { name: 'IT' },
    level: 1,
    status: true,
    permissions: ['manage_users', 'manage_roles'],
    parent: null,
    children: []
  }
])

const departments = ref([
  { id: 1, name: 'IT' },
  { id: 2, name: 'HR' },
  { id: 3, name: 'Finance' }
])

const availableUsers = ref([
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' }
])

// Form validation rules
const adminRules = {
  user_id: [
    { required: true, message: 'Please select a user', trigger: 'change' }
  ],
  level: [
    { required: true, message: 'Please select admin level', trigger: 'change' }
  ],
  department_id: [
    { required: true, message: 'Please select department', trigger: 'change' }
  ],
  parent_id: [
    { required: true, message: 'Please select parent admin', trigger: 'change' }
  ],
  permissions: [
    { required: true, message: 'Please select permissions', trigger: 'change' }
  ]
}

// Computed
const totalAdmins = computed(() => admins.value.length)
const superAdmins = computed(() => 
  admins.value.filter(admin => admin.level === 1).length
)
const subAdmins = computed(() => 
  admins.value.filter(admin => admin.level === 2).length
)
const departmentHeads = computed(() => 
  admins.value.filter(admin => admin.level === 3).length
)

const availableParents = computed(() => {
  if (!adminForm.value.level) return []
  return admins.value.filter(admin => admin.level < adminForm.value.level)
})

const filteredAdmins = computed(() => {
  let result = admins.value

  if (searchQuery.value) {
    result = result.filter(admin =>
      admin.user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      admin.user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (levelFilter.value) {
    result = result.filter(admin => admin.level === levelFilter.value)
  }

  if (departmentFilter.value) {
    result = result.filter(admin => admin.department_id === departmentFilter.value)
  }

  return result
})

// Add this computed property for role count
const roleCount = computed(() => {
  return selectedAdmin.value?.roles?.length || 0
})

// Methods
const getLevelType = (level) => {
  const types = {
    1: 'primary',
    2: 'info',
    3: 'success'
  }
  return types[level] || 'info'
}

const getLevelLabel = (level) => {
  const labels = {
    1: 'Super Admin',
    2: 'Sub Admin',
    3: 'Department Head'
  }
  return labels[level] || 'Unknown'
}

const formatPermission = (permission) => {
  return permission.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

const showCreateDialog = () => {
  isEdit.value = false
  adminForm.value = {
    user_id: '',
    level: '',
    department_id: '',
    parent_id: '',
    permissions: [],
    status: true
  }
  dialogVisible.value = true
}

const viewAdmin = (admin) => {
  selectedAdmin.value = admin
  viewDialogVisible.value = true
}

const editAdmin = (admin) => {
  isEdit.value = true
  adminForm.value = { ...admin }
  dialogVisible.value = true
}

const deleteAdmin = async (admin) => {
  try {
    await ElMessageBox.confirm(
      `Are you sure you want to delete admin ${admin.user.name}?`,
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }
    )
    
    // Add API call here
    const index = admins.value.findIndex(a => a.id === admin.id)
    admins.value.splice(index, 1)
    toast.success('Admin deleted successfully')
  } catch (error) {
    if (error !== 'cancel') {
      toast.error('Failed to delete admin')
    }
  }
}

const submitForm = async () => {
  try {
    // Add API call here
    if (isEdit.value) {
      const index = admins.value.findIndex(a => a.id === adminForm.value.id)
      admins.value[index] = { ...adminForm.value }
      toast.success('Admin updated successfully')
    } else {
      admins.value.push({
        id: admins.value.length + 1,
        ...adminForm.value
      })
      toast.success('Admin created successfully')
    }
    dialogVisible.value = false
  } catch (error) {
    toast.error('Failed to save admin')
  }
}

const handleSizeChange = (val) => {
  pageSize.value = val
  // Add API call here
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  // Add API call here
}

// Lifecycle hooks
onMounted(() => {
  // Add API call to fetch admins
})
</script>

<style scoped lang="scss">
.admin-management {
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      margin: 0;
    }
  }
  
  .admin-summary {
    margin-bottom: 20px;
    
    .summary-card {
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .summary-value {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        
        &.primary {
          color: #3b82f6;
        }
        
        &.info {
          color: #94a3b8;
        }
        
        &.success {
          color: #10b981;
        }
      }
    }
  }

  .admin-table-card {
    .table-operations {
      display: flex;
      gap: 16px;
      margin-bottom: 20px;

      .search-input {
        width: 300px;
      }
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }

  .permission-card {
    margin-bottom: 10px;
    text-align: center;
  }
}
</style> 