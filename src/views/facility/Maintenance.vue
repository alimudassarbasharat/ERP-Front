<template>
  <div class="maintenance-container">
    <el-card class="maintenance-card">
      <template #header>
        <div class="card-header">
          <h2 class="title">Maintenance Management</h2>
          <div class="header-actions">
            <el-button type="primary" @click="handleAddMaintenance">
              <el-icon><Plus /></el-icon>
              Schedule Maintenance
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
            <el-select
              v-model="selectedFacility"
              placeholder="Select Facility"
              clearable
              @change="handleFilter"
            >
              <el-option
                v-for="item in facilityOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select
              v-model="selectedStatus"
              placeholder="Maintenance Status"
              clearable
              @change="handleFilter"
            >
              <el-option label="Scheduled" value="scheduled" />
              <el-option label="In Progress" value="in_progress" />
              <el-option label="Completed" value="completed" />
              <el-option label="Cancelled" value="cancelled" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <CompactDatePicker
              v-model="selectedDate"
              placeholder=""
            />
              @change="handleDateChange"
            />
          </el-col>
        </el-row>
      </div>

      <!-- Maintenance Table -->
      <el-table
        v-loading="loading"
        :data="filteredMaintenance"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column type="expand">
          <template #default="props">
            <div class="expanded-row">
              <el-descriptions :column="2" border>
                <el-descriptions-item label="Facility Type">
                  {{ props.row.facilityType }}
                </el-descriptions-item>
                <el-descriptions-item label="Location">
                  {{ props.row.location }}
                </el-descriptions-item>
                <el-descriptions-item label="Maintenance Type">
                  {{ props.row.maintenanceType }}
                </el-descriptions-item>
                <el-descriptions-item label="Priority">
                  {{ props.row.priority }}
                </el-descriptions-item>
                <el-descriptions-item label="Assigned To">
                  {{ props.row.assignedTo }}
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
                <div class="facility-name">{{ row.facilityName }}</div>
                <div class="facility-type">{{ row.facilityType }}</div>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="scheduledDate" label="Scheduled Date" width="150" />
        <el-table-column prop="completionDate" label="Completion Date" width="150" />
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
import { Plus, Download, Edit, Delete } from '@element-plus/icons-vue'
import CompactDatePicker from '@/components/CompactDatePicker.vue'

// Mock data - Replace with actual API calls
const toast = useToast()
const maintenanceData = ref([
  {
    id: 1,
    facilityName: 'Computer Lab 1',
    facilityType: 'Laboratory',
    image: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    location: 'Block A, Room 101',
    scheduledDate: '2024-05-10',
    completionDate: '2024-05-12',
    status: 'Scheduled',
    maintenanceType: 'Routine',
    priority: 'High',
    assignedTo: 'John Smith',
    notes: 'Regular maintenance check'
  },
  // Add more mock data as needed
])

const loading = ref(false)
const selectedFacility = ref('')
const selectedStatus = ref('')
const selectedDate = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const facilityOptions = [
  { value: 'lab1', label: 'Computer Lab 1' },
  { value: 'lab2', label: 'Computer Lab 2' },
  { value: 'class1', label: 'Classroom 1' },
  { value: 'class2', label: 'Classroom 2' },
  // Add more facilities as needed
]

const filteredMaintenance = computed(() => {
  return maintenanceData.value.filter(item => {
    const facilityMatch = !selectedFacility.value || item.facilityName === selectedFacility.value
    const statusMatch = !selectedStatus.value || item.status.toLowerCase() === selectedStatus.value
    const dateMatch = !selectedDate.value || item.scheduledDate === selectedDate.value
    return facilityMatch && statusMatch && dateMatch
  })
})

const getStatusType = (status) => {
  switch (status.toLowerCase()) {
    case 'scheduled':
      return 'warning'
    case 'in_progress':
      return 'primary'
    case 'completed':
      return 'success'
    case 'cancelled':
      return 'danger'
    default:
      return 'info'
  }
}

const handleAddMaintenance = () => {
  // Implement add maintenance functionality
  toast.info('Add maintenance functionality to be implemented')
}

const handleExport = () => {
  // Implement export functionality
  toast.info('Export functionality to be implemented')
}

const handleFilter = () => {
  currentPage.value = 1
}

const handleDateChange = () => {
  handleFilter()
}

const handleEdit = (row) => {
  // Implement edit functionality
  toast.info(`Edit maintenance for ${row.facilityName}`)
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    `Are you sure you want to delete maintenance record for ${row.facilityName}?`,
    'Warning',
    {
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      type: 'warning'
    }
  ).then(() => {
    // Implement delete functionality
    toast.success('Maintenance record deleted')
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
.maintenance-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7ed 100%);
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

.maintenance-card {
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
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
  .maintenance-container {
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
  .maintenance-container {
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
  .maintenance-container {
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