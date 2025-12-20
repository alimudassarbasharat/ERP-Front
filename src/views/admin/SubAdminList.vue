<template>
  <div class="sub-admin-list">
    <div class="page-header">
      <h2>Sub-Admin Management</h2>
      <el-button type="primary" @click="showCreateDialog">
        <el-icon><Plus /></el-icon>
        Add Sub-Admin
      </el-button>
    </div>

    <el-card>
      <div class="table-operations">
        <el-input
          v-model="searchQuery"
          placeholder="Search sub-admins..."
          class="search-input"
          :prefix-icon="Search"
        />
        <el-select v-model="departmentFilter" placeholder="Department" clearable>
          <el-option label="Academic" value="academic" />
          <el-option label="Administrative" value="administrative" />
          <el-option label="Finance" value="finance" />
        </el-select>
        <el-select v-model="statusFilter" placeholder="Status" clearable>
          <el-option label="Active" value="active" />
          <el-option label="Inactive" value="inactive" />
        </el-select>
      </div>

      <el-table
        :data="filteredSubAdmins"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="email" label="Email" />
        <el-table-column prop="department" label="Department" width="120">
          <template #default="{ row }">
            <el-tag>{{ row.department }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="Role" width="120">
          <template #default="{ row }">
            <el-tag type="warning">{{ row.role }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="200" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button type="primary" size="small" @click="editSubAdmin(row)">
                <el-icon><Edit /></el-icon>
              </el-button>
              <el-button 
                type="danger" 
                size="small" 
                @click="deleteSubAdmin(row)"
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

    <!-- Create/Edit Sub-Admin Dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? 'Edit Sub-Admin' : 'Create Sub-Admin'"
      width="500px"
    >
      <el-form
        ref="subAdminForm"
        :model="subAdminForm"
        :rules="subAdminRules"
        label-position="top"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="subAdminForm.name" placeholder="Enter name" />
        </el-form-item>
        
        <el-form-item label="Email" prop="email">
          <el-input v-model="subAdminForm.email" placeholder="Enter email" />
        </el-form-item>
        
        <el-form-item label="Department" prop="department">
          <el-select v-model="subAdminForm.department" placeholder="Select department">
            <el-option label="Academic" value="academic" />
            <el-option label="Administrative" value="administrative" />
            <el-option label="Finance" value="finance" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="Role" prop="role">
          <el-select v-model="subAdminForm.role" placeholder="Select role">
            <el-option label="Department Head" value="department_head" />
            <el-option label="Supervisor" value="supervisor" />
            <el-option label="Coordinator" value="coordinator" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="Password" prop="password" v-if="!isEdit">
          <el-input
            v-model="subAdminForm.password"
            type="password"
            placeholder="Enter password"
            show-password
          />
        </el-form-item>
        
        <el-form-item label="Status" prop="status">
          <el-select v-model="subAdminForm.status" placeholder="Select status">
            <el-option label="Active" value="active" />
            <el-option label="Inactive" value="inactive" />
          </el-select>
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
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Edit, Delete, Search } from '@element-plus/icons-vue'
import axios from 'axios'

// State
const toast = useToast()
const loading = ref(false)
const searchQuery = ref('')
const departmentFilter = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(0)
const dialogVisible = ref(false)
const isEdit = ref(false)

// Form data
const subAdminForm = ref({
  name: '',
  email: '',
  department: '',
  role: '',
  password: '',
  status: 'active'
})

// Form validation rules
const subAdminRules = {
  name: [
    { required: true, message: 'Please enter name', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Please enter email', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email', trigger: 'blur' }
  ],
  department: [
    { required: true, message: 'Please select department', trigger: 'change' }
  ],
  role: [
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

// Mock data (replace with API calls)
const subAdmins = ref([
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    department: 'academic',
    role: 'department_head',
    status: 'active'
  },
  {
    id: 2,
    name: 'Bob Wilson',
    email: 'bob@example.com',
    department: 'administrative',
    role: 'supervisor',
    status: 'active'
  }
])

// Computed
const filteredSubAdmins = computed(() => {
  let result = subAdmins.value

  if (searchQuery.value) {
    result = result.filter(admin =>
      admin.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (departmentFilter.value) {
    result = result.filter(admin => admin.department === departmentFilter.value)
  }

  if (statusFilter.value) {
    result = result.filter(admin => admin.status === statusFilter.value)
  }

  return result
})

// Methods
const showCreateDialog = () => {
  isEdit.value = false
  subAdminForm.value = {
    name: '',
    email: '',
    department: '',
    role: '',
    password: '',
    status: 'active'
  }
  dialogVisible.value = true
}

const editSubAdmin = (admin) => {
  isEdit.value = true
  subAdminForm.value = { ...admin }
  dialogVisible.value = true
}

const deleteSubAdmin = async (admin) => {
  try {
    await ElMessageBox.confirm(
      `Are you sure you want to delete sub-admin ${admin.name}?`,
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }
    )
    
    // Add API call here
    const index = subAdmins.value.findIndex(a => a.id === admin.id)
    subAdmins.value.splice(index, 1)
    toast.success('Sub-admin deleted successfully')
  } catch (error) {
    if (error !== 'cancel') {
      toast.error('Failed to delete sub-admin')
    }
  }
}

const submitForm = async () => {
  try {
    // Add API call here
    if (isEdit.value) {
      const index = subAdmins.value.findIndex(a => a.id === subAdminForm.value.id)
      subAdmins.value[index] = { ...subAdminForm.value }
      toast.success('Sub-admin updated successfully')
    } else {
      subAdmins.value.push({
        id: subAdmins.value.length + 1,
        ...subAdminForm.value
      })
      toast.success('Sub-admin created successfully')
    }
    dialogVisible.value = false
  } catch (error) {
    toast.error('Failed to save sub-admin')
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
</script>

<style scoped lang="scss">
.sub-admin-list {
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      margin: 0;
    }
  }

  .table-operations {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;

    .search-input {
      width: 300px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style> 