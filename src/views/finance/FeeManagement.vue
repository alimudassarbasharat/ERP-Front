<template>
  <div class="fee-management-container">
    <el-card class="fee-management-card">
      <template #header>
        <div class="card-header">
          <h2 class="title">Fee Management</h2>
          <div class="header-actions">
            <el-button type="primary" @click="showAddFeeDialog">
              <el-icon><Plus /></el-icon>
              Add New Fee
            </el-button>
            <el-button type="success" @click="exportFees">
              <el-icon><Download /></el-icon>
              Export Fees
            </el-button>
          </div>
        </div>
      </template>

      <!-- Search and Filter Section -->
      <div class="search-section">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input
              v-model="searchQuery"
              placeholder="Search by student name or ID"
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
              v-model="selectedClass"
              placeholder="Select Class"
              clearable
              @change="handleFilter"
            >
              <el-option
                v-for="classItem in classes"
                :key="classItem.id"
                :label="classItem.name"
                :value="classItem.id"
              />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select
              v-model="selectedStatus"
              placeholder="Payment Status"
              clearable
              @change="handleFilter"
            >
              <el-option label="Paid" value="paid" />
              <el-option label="Pending" value="pending" />
              <el-option label="Overdue" value="overdue" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <CompactDatePicker
              v-model="dateRange"
              placeholder=""
              @change="handleDateRangeChange"
            />
          </el-col>
        </el-row>
      </div>

      <!-- Fee Table -->
      <el-table
        :data="filteredFees"
        style="width: 100%"
        border
        stripe
        v-loading="loading"
      >
        <el-table-column prop="student_id" label="Student ID" width="120" />
        <el-table-column prop="student_name" label="Student Name" min-width="180" />
        <el-table-column prop="class" label="Class" width="120" />
        <el-table-column prop="fee_type" label="Fee Type" width="150" />
        <el-table-column prop="amount" label="Amount" width="120">
          <template #default="{ row }">
            {{ formatCurrency(row.amount) }}
          </template>
        </el-table-column>
        <el-table-column prop="due_date" label="Due Date" width="120">
          <template #default="{ row }">
            {{ formatDate(row.due_date) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status" width="120">
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
                @click="handlePayment(row)"
                :disabled="row.status === 'paid'"
              >
                <el-icon><Money /></el-icon>
                Pay
              </el-button>
              <el-button
                type="info"
                size="small"
                @click="viewDetails(row)"
              >
                <el-icon><View /></el-icon>
                View
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="deleteFee(row)"
              >
                <el-icon><Delete /></el-icon>
                Delete
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
          :total="totalFees"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- Add Fee Dialog -->
    <el-dialog
      v-model="addFeeDialogVisible"
      title="Add New Fee"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-form
        ref="feeFormRef"
        :model="feeForm"
        :rules="feeRules"
        label-width="120px"
      >
        <el-form-item label="Student" prop="student_id">
          <el-select
            v-model="feeForm.student_id"
            placeholder="Select Student"
            filterable
            style="width: 100%"
          >
            <el-option
              v-for="student in students"
              :key="student.id"
              :label="`${student.name} (${student.id})`"
              :value="student.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Fee Type" prop="fee_type">
          <el-select
            v-model="feeForm.fee_type"
            placeholder="Select Fee Type"
            style="width: 100%"
          >
            <el-option label="Tuition Fee" value="tuition" />
            <el-option label="Registration Fee" value="registration" />
            <el-option label="Exam Fee" value="exam" />
            <el-option label="Library Fee" value="library" />
            <el-option label="Transport Fee" value="transport" />
            <el-option label="Other" value="other" />
          </el-select>
        </el-form-item>

        <el-form-item label="Amount" prop="amount">
          <el-input-number
            v-model="feeForm.amount"
            :min="0"
            :precision="2"
            :step="1000"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="Due Date" prop="due_date">
          <CompactDatePicker
            v-model="feeForm.due_date"
            placeholder=""
          />
        </el-form-item>

        <el-form-item label="Description" prop="description">
          <el-input
            v-model="feeForm.description"
            type="textarea"
            :rows="3"
            placeholder="Enter fee description"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addFeeDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitFee">Submit</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- Payment Dialog -->
    <el-dialog
      v-model="paymentDialogVisible"
      title="Process Payment"
      width="40%"
      :close-on-click-modal="false"
    >
      <el-form
        ref="paymentFormRef"
        :model="paymentForm"
        :rules="paymentRules"
        label-width="120px"
      >
        <el-form-item label="Amount Due">
          <span class="amount-due">{{ formatCurrency(selectedFee?.amount) }}</span>
        </el-form-item>

        <el-form-item label="Payment Amount" prop="amount">
          <el-input-number
            v-model="paymentForm.amount"
            :min="0"
            :max="selectedFee?.amount"
            :precision="2"
            :step="1000"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="Payment Date" prop="payment_date">
          <CompactDatePicker
            v-model="paymentForm.payment_date"
            placeholder=""
          />
        </el-form-item>

        <el-form-item label="Payment Method" prop="payment_method">
          <el-select
            v-model="paymentForm.payment_method"
            placeholder="Select payment method"
            style="width: 100%"
          >
            <el-option label="Cash" value="cash" />
            <el-option label="Bank Transfer" value="bank_transfer" />
            <el-option label="Credit Card" value="credit_card" />
            <el-option label="Check" value="check" />
          </el-select>
        </el-form-item>

        <el-form-item label="Transaction ID" prop="transaction_id">
          <el-input
            v-model="paymentForm.transaction_id"
            placeholder="Enter transaction ID"
          />
        </el-form-item>

        <el-form-item label="Notes" prop="notes">
          <el-input
            v-model="paymentForm.notes"
            type="textarea"
            :rows="3"
            placeholder="Enter payment notes"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="paymentDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitPayment">Process Payment</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import CompactDatePicker from '@/components/CompactDatePicker.vue'
import { 
  Plus, 
  Download, 
  Search, 
  Money, 
  View, 
  Delete 
} from '@element-plus/icons-vue'

// Debug logs
console.log('FeeManagement component is loading')

onMounted(() => {
  console.log('FeeManagement component mounted')
})

// State
const toast = useToast()
const loading = ref(false)
const searchQuery = ref('')
const selectedClass = ref('')
const selectedStatus = ref('')
const dateRange = ref(null)
const currentPage = ref(1)

// Handle date range change from CompactDatePicker
const handleDateRangeChange = (value) => {
  dateRange.value = value
  handleFilter()
}
const pageSize = ref(10)
const totalFees = ref(0)
const addFeeDialogVisible = ref(false)
const paymentDialogVisible = ref(false)
const selectedFee = ref(null)

// Mock data - Replace with actual API calls
const classes = ref([
  { id: 1, name: 'Class 1' },
  { id: 2, name: 'Class 2' },
  { id: 3, name: 'Class 3' }
])

const students = ref([
  { id: 'S001', name: 'John Doe' },
  { id: 'S002', name: 'Jane Smith' },
  { id: 'S003', name: 'Mike Johnson' }
])

const fees = ref([
  {
    id: 1,
    student_id: 'S001',
    student_name: 'John Doe',
    class: 'Class 1',
    fee_type: 'tuition',
    amount: 50000,
    due_date: '2024-03-15',
    status: 'pending'
  },
  {
    id: 2,
    student_id: 'S002',
    student_name: 'Jane Smith',
    class: 'Class 2',
    fee_type: 'registration',
    amount: 10000,
    due_date: '2024-03-20',
    status: 'paid'
  }
])

// Forms
const feeForm = reactive({
  student_id: '',
  fee_type: '',
  amount: 0,
  due_date: '',
  description: ''
})

const paymentForm = reactive({
  amount: 0,
  payment_date: '',
  payment_method: '',
  transaction_id: '',
  notes: ''
})

// Form Rules
const feeRules = {
  student_id: [
    { required: true, message: 'Please select a student', trigger: 'change' }
  ],
  fee_type: [
    { required: true, message: 'Please select fee type', trigger: 'change' }
  ],
  amount: [
    { required: true, message: 'Please enter amount', trigger: 'blur' }
  ],
  due_date: [
    { required: true, message: 'Please select due date', trigger: 'change' }
  ]
}

const paymentRules = {
  amount: [
    { required: true, message: 'Please enter payment amount', trigger: 'blur' }
  ],
  payment_date: [
    { required: true, message: 'Please select payment date', trigger: 'change' }
  ],
  payment_method: [
    { required: true, message: 'Please select payment method', trigger: 'change' }
  ]
}

// Computed
const filteredFees = computed(() => {
  let result = [...fees.value]

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(fee => 
      fee.student_name.toLowerCase().includes(query) ||
      fee.student_id.toLowerCase().includes(query)
    )
  }

  if (selectedClass.value) {
    result = result.filter(fee => fee.class === selectedClass.value)
  }

  if (selectedStatus.value) {
    result = result.filter(fee => fee.status === selectedStatus.value)
  }

  if (dateRange.value && dateRange.value.length === 2) {
    const [start, end] = dateRange.value
    result = result.filter(fee => {
      const dueDate = new Date(fee.due_date)
      return dueDate >= start && dueDate <= end
    })
  }

  return result
})

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR'
  }).format(amount)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusType = (status) => {
  switch (status) {
    case 'paid':
      return 'success'
    case 'pending':
      return 'warning'
    case 'overdue':
      return 'danger'
    default:
      return 'info'
  }
}

const handleSearch = () => {
  currentPage.value = 1
}

const handleFilter = () => {
  currentPage.value = 1
}

const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
}

const handleCurrentChange = (val) => {
  currentPage.value = val
}

const showAddFeeDialog = () => {
  addFeeDialogVisible.value = true
}

const submitFee = async () => {
  // Add API call here
  console.log('Submitting fee:', feeForm)
  toast.success('Fee added successfully')
  addFeeDialogVisible.value = false
}

const handlePayment = (fee) => {
  selectedFee.value = fee
  paymentForm.amount = fee.amount
  paymentDialogVisible.value = true
}

const submitPayment = async () => {
  // Add API call here
  console.log('Processing payment:', paymentForm)
  toast.success('Payment processed successfully')
  paymentDialogVisible.value = false
}

const viewDetails = (fee) => {
  // Implement view details functionality
  console.log('Viewing details for fee:', fee)
}

const deleteFee = (fee) => {
  ElMessageBox.confirm(
    'Are you sure you want to delete this fee record?',
    'Warning',
    {
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      type: 'warning'
    }
  ).then(() => {
    // Add API call here
    console.log('Deleting fee:', fee)
    toast.success('Fee deleted successfully')
  }).catch(() => {})
}

const exportFees = () => {
  // Implement export functionality
  console.log('Exporting fees')
  toast.success('Fees exported successfully')
}
</script>

<style scoped>
.fee-management-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7ed 100%);
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

.fee-management-card {
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  border: none;
  width: 100%;
  box-sizing: border-box;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  gap: 10px;
}

.search-section {
  padding: 20px;
  background: #f5f7fa;
  border-bottom: 1px solid #ebeef5;
}

.pagination-container {
  padding: 20px;
  display: flex;
  justify-content: flex-end;
}

.amount-due {
  font-size: 18px;
  font-weight: 600;
  color: #3b82f6;
}

/* Responsive styles */
@media (max-width: 1200px) {
  .fee-management-container {
    padding: 15px;
  }
  
  .card-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .header-actions {
    width: 100%;
    justify-content: flex-end;
  }
}

@media (max-width: 768px) {
  .search-section {
    padding: 15px;
  }
  
  .el-col {
    width: 100%;
    margin-bottom: 15px;
  }
  
  .pagination-container {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .fee-management-container {
    padding: 10px;
  }
  
  .title {
    font-size: 20px;
  }
  
  .header-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .header-actions .el-button {
    width: 100%;
    margin-bottom: 10px;
  }
  
  .search-section {
    padding: 10px;
  }
  
  .pagination-container {
    padding: 10px;
  }
}
</style> 