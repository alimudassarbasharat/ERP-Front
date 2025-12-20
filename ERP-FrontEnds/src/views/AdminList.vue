<script setup>
import { useToast } from 'vue-toastification'

const toast = useToast()
const loading = ref(false)
const adminList = ref([])

const fetchAdminList = async () => {
  try {
    loading.value = true
    const response = await axios.get('/admins/list')
    console.log('Admin list response:', response.data) // Debug log
    adminList.value = response.data.admins || []
  } catch (error) {
    console.error('Error fetching admin list:', error)
    toast.error(error.response?.data?.message || 'Failed to fetch admin list')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchAdminList()
})
</script>

<template>
  <div class="admin-list-container">
    <el-card class="admin-list-card">
      <template #header>
        <div class="card-header">
          <h2>Admin List</h2>
        </div>
      </template>

      <el-table
        v-loading="loading"
        :data="adminList"
        style="width: 100%"
      >
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="email" label="Email" />
        <el-table-column prop="phone_number" label="Phone Number" />
        <el-table-column prop="role" label="Role" />
        <el-table-column prop="status" label="Status">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="200">
          <template #default="{ row }">
            <el-button-group>
              <el-button type="primary" size="small" @click="handleEdit(row)">
                Edit
              </el-button>
              <el-button type="danger" size="small" @click="handleDelete(row)">
                Delete
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.admin-list-container {
  padding: 20px;
}

.admin-list-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #1e293b;
}
</style> 