<template>
  <div class="facility-container">
    <el-card class="facility-card">
      <template #header>
        <div class="card-header">
          <h2 class="title">Facility List</h2>
          <div class="header-actions">
            <el-button type="primary" @click="handleAddFacility">
              <el-icon><Plus /></el-icon>
              Add New Facility
            </el-button>
            <el-button type="success" @click="handleExport">
              <el-icon><Download /></el-icon>
              Export
            </el-button>
          </div>
        </div>
      </template>

      <!-- Filters Section -->
      <div class="filters-section">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input
              v-model="searchQuery"
              placeholder="Search facilities..."
              clearable
              @clear="handleSearch"
              @input="handleSearch"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-select
              v-model="selectedType"
              placeholder="Facility Type"
              clearable
              @change="handleFilter"
            >
              <el-option label="Classroom" value="classroom" />
              <el-option label="Laboratory" value="laboratory" />
              <el-option label="Library" value="library" />
              <el-option label="Sports" value="sports" />
              <el-option label="Other" value="other" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select
              v-model="selectedStatus"
              placeholder="Status"
              clearable
              @change="handleFilter"
            >
              <el-option label="Available" value="available" />
              <el-option label="In Use" value="in_use" />
              <el-option label="Under Maintenance" value="maintenance" />
              <el-option label="Closed" value="closed" />
            </el-select>
          </el-col>
        </el-row>
      </div>

      <!-- Facility Table -->
      <el-table
        v-loading="loading"
        :data="filteredFacilities"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column type="expand">
          <template #default="props">
            <div class="expanded-row">
              <el-descriptions :column="2" border>
                <el-descriptions-item label="Capacity">
                  {{ props.row.capacity }}
                </el-descriptions-item>
                <el-descriptions-item label="Location">
                  {{ props.row.location }}
                </el-descriptions-item>
                <el-descriptions-item label="Last Maintenance">
                  {{ props.row.lastMaintenance }}
                </el-descriptions-item>
                <el-descriptions-item label="Next Maintenance">
                  {{ props.row.nextMaintenance }}
                </el-descriptions-item>
                <el-descriptions-item label="Notes">
                  {{ props.row.notes }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Facility" min-width="200">
          <template #default="{ row }">
            <div class="facility-info">
              <el-avatar :size="32" :src="row.image" />
              <div class="facility-details">
                <div class="facility-name">{{ row.name }}</div>
                <div class="facility-type">{{ row.type }}</div>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="capacity" label="Capacity" width="120" />
        <el-table-column prop="location" label="Location" width="150" />
        <el-table-column label="Status" width="120">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="Actions" width="200" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button
                type="primary"
                size="small"
                @click="handleEdit(row)"
              >
                <el-icon><Edit /></el-icon>
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="handleDelete(row)"
              >
                <el-icon><Delete /></el-icon>
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <!-- Pagination -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Download, Edit, Delete, Search } from '@element-plus/icons-vue'

// Mock data - Replace with actual API calls
const toast = useToast()
const facilityData = ref([
  {
    id: 1,
    name: 'Computer Lab 1',
    type: 'Laboratory',
    image: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    capacity: '30',
    location: 'Block A, Room 101',
    status: 'Available',
    lastMaintenance: '2024-04-01',
    nextMaintenance: '2024-07-01',
    notes: 'Fully equipped with latest computers'
  },
  // Add more mock data as needed
])

const loading = ref(false)
const searchQuery = ref('')
const selectedType = ref('')
const selectedStatus = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const filteredFacilities = computed(() => {
  return facilityData.value.filter(item => {
    const searchMatch = !searchQuery.value || 
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    const typeMatch = !selectedType.value || item.type.toLowerCase() === selectedType.value
    const statusMatch = !selectedStatus.value || item.status.toLowerCase() === selectedStatus.value
    return searchMatch && typeMatch && statusMatch
  })
})

const getStatusType = (status) => {
  switch (status.toLowerCase()) {
    case 'available':
      return 'success'
    case 'in_use':
      return 'warning'
    case 'maintenance':
      return 'danger'
    case 'closed':
      return 'info'
    default:
      return 'info'
  }
}

const handleAddFacility = () => {
  // Implement add facility functionality
  toast.info('Add facility functionality to be implemented')
}

const handleExport = () => {
  // Implement export functionality
  toast.info('Export functionality to be implemented')
}

const handleSearch = () => {
  currentPage.value = 1
}

const handleFilter = () => {
  currentPage.value = 1
}

const handleEdit = (row) => {
  // Implement edit functionality
  toast.info(`Edit facility ${row.name}`)
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    `Are you sure you want to delete facility ${row.name}?`,
    'Warning',
    {
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      type: 'warning'
    }
  ).then(() => {
    // Implement delete functionality
    toast.success('Facility deleted')
  }).catch(() => {
    // Cancel delete
  })
}

const handleSizeChange = (val) => {
  pageSize.value = val
}

const handleCurrentChange = (val) => {
  currentPage.value = val
}
</script>

<style scoped>
.facility-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7ed 100%);
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

.facility-card {
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  border: none;
  width: 100%;
  box-sizing: border-box;
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(to right, #409EFF, #36a3f7);
  padding: 20px;
  border-radius: 8px 8px 0 0;
}

.title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.header-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.filters-section {
  margin: 20px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #ebeef5;
  padding: 20px;
}

.facility-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.facility-details {
  display: flex;
  flex-direction: column;
}

.facility-name {
  font-weight: 500;
  color: #1e293b;
}

.facility-type {
  font-size: 12px;
  color: #94a3b8;
}

.expanded-row {
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
  margin: 10px;
}

.pagination-container {
  margin: 20px;
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}

/* Form element styles */
:deep(.el-input__inner) {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  border-radius: 4px;
  color: #1e293b;
  font-size: 14px;
  transition: all 0.3s ease;
}

:deep(.el-input__inner:focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

:deep(.el-select),
:deep(.el-date-editor) {
  width: 100%;
}

:deep(.el-table) {
  margin: 20px;
  border-radius: 8px;
  overflow: hidden;
}

:deep(.el-table__header) {
  background: #f5f7fa;
}

:deep(.el-table__row) {
  transition: all 0.3s ease;
}

:deep(.el-table__row:hover) {
  background-color: #f1f5f9;
}

:deep(.el-button) {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  transition: all 0.3s ease;
}

:deep(.el-button:hover) {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Responsive styles */
@media (max-width: 1200px) {
  .facility-container {
    padding: 15px;
  }
  
  .card-header {
    padding: 15px;
  }
  
  .filters-section {
    margin: 15px;
    padding: 15px;
  }
  
  :deep(.el-table) {
    margin: 15px;
  }
}

@media (max-width: 992px) {
  .filters-section .el-col {
    width: 100%;
    margin-bottom: 15px;
  }
  
  .title {
    font-size: 20px;
  }
  
  .header-actions {
    flex-direction: column;
  }
  
  .header-actions .el-button {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .facility-container {
    padding: 10px;
  }
  
  .card-header {
    padding: 12px;
  }
  
  .filters-section {
    margin: 10px;
    padding: 12px;
  }
  
  .expanded-row {
    padding: 15px;
    margin: 8px;
  }
  
  :deep(.el-table) {
    margin: 10px;
  }
  
  .pagination-container {
    margin: 10px;
    padding: 15px 0;
  }
}

@media (max-width: 480px) {
  .facility-container {
    padding: 8px;
  }
  
  .card-header {
    padding: 10px;
  }
  
  .title {
    font-size: 18px;
  }
  
  .filters-section {
    margin: 8px;
    padding: 10px;
  }
  
  .expanded-row {
    padding: 12px;
    margin: 6px;
  }
  
  :deep(.el-table) {
    margin: 8px;
    font-size: 12px;
  }
  
  :deep(.el-button) {
    padding: 6px 8px;
  }
  
  .pagination-container {
    margin: 8px;
    padding: 12px 0;
  }
}
</style> 