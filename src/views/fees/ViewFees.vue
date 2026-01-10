<template>
  <PageShell 
    title="View Fees"
    :breadcrumbs="[
      { label: 'Fee Management', route: '/fees' },
      { label: 'View Fees' }
    ]"
  >
    <!-- Filters Section -->
    <div class="w-full mb-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div class="flex flex-wrap items-center gap-4">
          <el-input
            v-model="searchQuery"
            placeholder="Search fees..."
            class="flex-1 min-w-[300px]"
            clearable
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-select
            v-model="selectedClass"
            placeholder="All Classes"
            clearable
            class="w-[200px]"
          >
            <el-option
              v-for="cls in classes"
              :key="cls"
              :label="cls"
              :value="cls"
            />
          </el-select>
          <el-select
            v-model="selectedType"
            placeholder="All Types"
            clearable
            class="w-[200px]"
          >
            <el-option label="Tuition Fee" value="tuition" />
            <el-option label="Examination Fee" value="examination" />
            <el-option label="Library Fee" value="library" />
            <el-option label="Transport Fee" value="transport" />
            <el-option label="Other" value="other" />
          </el-select>
        </div>
      </div>
    </div>

    <!-- Fees Table -->
    <div class="w-full mb-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <el-table
          :data="filteredFees"
          stripe
          style="width: 100%"
          :empty-text="'No fees found'"
        >
          <el-table-column prop="name" label="Fee Name" />
          <el-table-column prop="type" label="Type" />
          <el-table-column prop="class" label="Class" />
          <el-table-column prop="amount" label="Amount">
            <template #default="{ row }">
              {{ formatCurrency(row.amount) }}
            </template>
          </el-table-column>
          <el-table-column prop="dueDate" label="Due Date">
            <template #default="{ row }">
              {{ formatDate(row.dueDate) }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="Status">
            <template #default="{ row }">
              <StatusChip
                :label="row.status"
                :status="row.status.toLowerCase() === 'active' ? 'success' : 'warning'"
              />
            </template>
          </el-table-column>
          <el-table-column label="Actions" width="120">
            <template #default="{ row }">
              <div class="flex items-center gap-2">
                <el-button text type="primary" size="small" @click="editFee(row)">
                  <el-icon><Edit /></el-icon>
                </el-button>
                <el-button text type="danger" size="small" @click="deleteFee(row)">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </PageShell>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { Search, Edit, Delete } from '@element-plus/icons-vue'
import PageShell from '@/components/common/PageShell.vue'
import StatusChip from '@/components/common/StatusChip.vue'

const toast = useToast()

const searchQuery = ref('')
const selectedClass = ref('')
const selectedType = ref('')
const classes = ref([
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  'Class 11', 'Class 12'
])

const fees = ref([
  {
    id: 1,
    name: 'Monthly Tuition Fee',
    type: 'tuition',
    class: 'Class 10',
    amount: 5000,
    dueDate: '2024-04-15',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Annual Examination Fee',
    type: 'examination',
    class: 'Class 12',
    amount: 2000,
    dueDate: '2024-05-01',
    status: 'Pending'
  }
])

const filteredFees = computed(() => {
  return fees.value.filter(fee => {
    const matchesSearch = fee.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesClass = !selectedClass.value || fee.class === selectedClass.value
    const matchesType = !selectedType.value || fee.type === selectedType.value
    return matchesSearch && matchesClass && matchesType
  })
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN')
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount || 0)
}

const editFee = (fee) => {
  toast.info('Edit functionality coming soon')
  console.log('Edit fee:', fee)
}

const deleteFee = (fee) => {
  // TODO: Implement delete with confirmation
  toast.info('Delete functionality coming soon')
  console.log('Delete fee:', fee)
}
</script>
