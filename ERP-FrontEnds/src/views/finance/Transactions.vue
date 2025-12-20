<template>
  <div class="transactions">
    <div class="page-header">
      <h2>Financial Transactions</h2>
      <el-button type="primary" @click="showCreateDialog">
        <el-icon><Plus /></el-icon>
        Add Transaction
      </el-button>
    </div>

    <el-row :gutter="20" class="summary-cards">
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>Total Income</span>
              <el-tag type="success">+${{ formatCurrency(totalIncome) }}</el-tag>
            </div>
          </template>
          <div class="card-content">
            <el-statistic :value="formatCurrency(totalIncome)">
              <template #prefix>
                <el-icon><Money /></el-icon>
              </template>
            </el-statistic>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>Total Expenses</span>
              <el-tag type="danger">-${{ formatCurrency(totalExpenses) }}</el-tag>
            </div>
          </template>
          <div class="card-content">
            <el-statistic :value="formatCurrency(totalExpenses)">
              <template #prefix>
                <el-icon><Money /></el-icon>
              </template>
            </el-statistic>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>Net Balance</span>
              <el-tag :type="netBalance >= 0 ? 'success' : 'danger'">
                {{ netBalance >= 0 ? '+' : '-' }}${{ formatCurrency(Math.abs(netBalance)) }}
              </el-tag>
            </div>
          </template>
          <div class="card-content">
            <el-statistic :value="formatCurrency(netBalance)">
              <template #prefix>
                <el-icon><Money /></el-icon>
              </template>
            </el-statistic>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>Pending Transactions</span>
              <el-tag type="warning">{{ pendingTransactions }}</el-tag>
            </div>
          </template>
          <div class="card-content">
            <el-statistic :value="pendingTransactions">
              <template #prefix>
                <el-icon><Timer /></el-icon>
              </template>
            </el-statistic>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="transaction-list">
      <div class="table-operations">
        <el-input
          v-model="searchQuery"
          placeholder="Search transactions..."
          class="search-input"
          :prefix-icon="Search"
        />
        <el-select v-model="typeFilter" placeholder="Type" clearable>
          <el-option label="Income" value="income" />
          <el-option label="Expense" value="expense" />
        </el-select>
        <el-select v-model="statusFilter" placeholder="Status" clearable>
          <el-option label="Completed" value="completed" />
          <el-option label="Pending" value="pending" />
          <el-option label="Cancelled" value="cancelled" />
        </el-select>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          :shortcuts="dateShortcuts"
        />
      </div>

      <el-table
        :data="filteredTransactions"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="date" label="Date" width="120">
          <template #default="{ row }">
            {{ formatDate(row.date) }}
          </template>
        </el-table-column>
        <el-table-column prop="description" label="Description" />
        <el-table-column prop="type" label="Type" width="100">
          <template #default="{ row }">
            <el-tag :type="row.type === 'income' ? 'success' : 'danger'">
              {{ row.type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="Amount" width="120">
          <template #default="{ row }">
            <span :class="row.type === 'income' ? 'income' : 'expense'">
              {{ row.type === 'income' ? '+' : '-' }}${{ formatCurrency(row.amount) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="Category" width="120">
          <template #default="{ row }">
            <el-tag>{{ row.category }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="200" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button type="primary" size="small" @click="viewTransaction(row)">
                <el-icon><View /></el-icon>
              </el-button>
              <el-button 
                type="danger" 
                size="small" 
                @click="deleteTransaction(row)"
                :disabled="row.status === 'completed'"
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

    <!-- Create Transaction Dialog -->
    <el-dialog
      v-model="dialogVisible"
      title="Add Transaction"
      width="500px"
    >
      <el-form
        ref="transactionForm"
        :model="transactionForm"
        :rules="transactionRules"
        label-position="top"
      >
        <el-form-item label="Type" prop="type">
          <el-select v-model="transactionForm.type" placeholder="Select type">
            <el-option label="Income" value="income" />
            <el-option label="Expense" value="expense" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="Description" prop="description">
          <el-input v-model="transactionForm.description" placeholder="Enter description" />
        </el-form-item>
        
        <el-form-item label="Amount" prop="amount">
          <el-input-number 
            v-model="transactionForm.amount" 
            :min="0" 
            :precision="2"
            :step="100"
            style="width: 100%"
          />
        </el-form-item>
        
        <el-form-item label="Category" prop="category">
          <el-select v-model="transactionForm.category" placeholder="Select category">
            <el-option label="Tuition" value="tuition" />
            <el-option label="Books" value="books" />
            <el-option label="Salaries" value="salaries" />
            <el-option label="Utilities" value="utilities" />
            <el-option label="Maintenance" value="maintenance" />
            <el-option label="Other" value="other" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="Date" prop="date">
          <el-date-picker
            v-model="transactionForm.date"
            type="date"
            placeholder="Select date"
            style="width: 100%"
          />
        </el-form-item>
        
        <el-form-item label="Status" prop="status">
          <el-select v-model="transactionForm.status" placeholder="Select status">
            <el-option label="Completed" value="completed" />
            <el-option label="Pending" value="pending" />
            <el-option label="Cancelled" value="cancelled" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitForm">Create</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- View Transaction Dialog -->
    <el-dialog
      v-model="viewDialogVisible"
      title="Transaction Details"
      width="500px"
    >
      <div v-if="selectedTransaction" class="transaction-details">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="ID">{{ selectedTransaction.id }}</el-descriptions-item>
          <el-descriptions-item label="Date">{{ formatDate(selectedTransaction.date) }}</el-descriptions-item>
          <el-descriptions-item label="Type">
            <el-tag :type="selectedTransaction.type === 'income' ? 'success' : 'danger'">
              {{ selectedTransaction.type }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Description">{{ selectedTransaction.description }}</el-descriptions-item>
          <el-descriptions-item label="Amount">
            <span :class="selectedTransaction.type === 'income' ? 'income' : 'expense'">
              {{ selectedTransaction.type === 'income' ? '+' : '-' }}${{ formatCurrency(selectedTransaction.amount) }}
            </span>
          </el-descriptions-item>
          <el-descriptions-item label="Category">
            <el-tag>{{ selectedTransaction.category }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Status">
            <el-tag :type="getStatusType(selectedTransaction.status)">
              {{ selectedTransaction.status }}
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Edit, Delete, Search, View, Money, Timer } from '@element-plus/icons-vue'
import axios from 'axios'

// State
const toast = useToast()
const loading = ref(false)
const searchQuery = ref('')
const typeFilter = ref('')
const statusFilter = ref('')
const dateRange = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(0)
const dialogVisible = ref(false)
const viewDialogVisible = ref(false)
const selectedTransaction = ref(null)

// Date shortcuts
const dateShortcuts = [
  {
    text: 'Last week',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    }
  }
]

// Form data
const transactionForm = ref({
  type: '',
  description: '',
  amount: 0,
  category: '',
  date: new Date(),
  status: 'pending'
})

// Form validation rules
const transactionRules = {
  type: [
    { required: true, message: 'Please select type', trigger: 'change' }
  ],
  description: [
    { required: true, message: 'Please enter description', trigger: 'blur' }
  ],
  amount: [
    { required: true, message: 'Please enter amount', trigger: 'blur' }
  ],
  category: [
    { required: true, message: 'Please select category', trigger: 'change' }
  ],
  date: [
    { required: true, message: 'Please select date', trigger: 'change' }
  ],
  status: [
    { required: true, message: 'Please select status', trigger: 'change' }
  ]
}

// Mock data (replace with API calls)
const transactions = ref([
  {
    id: 1,
    date: '2024-03-15',
    description: 'Tuition Payment',
    type: 'income',
    amount: 5000,
    category: 'tuition',
    status: 'completed'
  },
  {
    id: 2,
    date: '2024-03-14',
    description: 'Utility Bill',
    type: 'expense',
    amount: 500,
    category: 'utilities',
    status: 'pending'
  }
])

// Computed
const filteredTransactions = computed(() => {
  let result = transactions.value

  if (searchQuery.value) {
    result = result.filter(transaction =>
      transaction.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (typeFilter.value) {
    result = result.filter(transaction => transaction.type === typeFilter.value)
  }

  if (statusFilter.value) {
    result = result.filter(transaction => transaction.status === statusFilter.value)
  }

  if (dateRange.value && dateRange.value.length === 2) {
    const start = dateRange.value[0]
    const end = dateRange.value[1]
    result = result.filter(transaction => {
      const date = new Date(transaction.date)
      return date >= start && date <= end
    })
  }

  return result
})

const totalIncome = computed(() => {
  return transactions.value
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)
})

const totalExpenses = computed(() => {
  return transactions.value
    .filter(t => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)
})

const netBalance = computed(() => {
  return totalIncome.value - totalExpenses.value
})

const pendingTransactions = computed(() => {
  return transactions.value.filter(t => t.status === 'pending').length
})

// Methods
const formatCurrency = (value) => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
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
    case 'completed':
      return 'success'
    case 'pending':
      return 'warning'
    case 'cancelled':
      return 'danger'
    default:
      return 'info'
  }
}

const showCreateDialog = () => {
  transactionForm.value = {
    type: '',
    description: '',
    amount: 0,
    category: '',
    date: new Date(),
    status: 'pending'
  }
  dialogVisible.value = true
}

const viewTransaction = (transaction) => {
  selectedTransaction.value = transaction
  viewDialogVisible.value = true
}

const deleteTransaction = async (transaction) => {
  try {
    await ElMessageBox.confirm(
      `Are you sure you want to delete this transaction?`,
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }
    )
    
    // Add API call here
    const index = transactions.value.findIndex(t => t.id === transaction.id)
    transactions.value.splice(index, 1)
    toast.success('Transaction deleted successfully')
  } catch (error) {
    if (error !== 'cancel') {
      toast.error('Failed to delete transaction')
    }
  }
}

const submitForm = async () => {
  try {
    // Add API call here
    transactions.value.push({
      id: transactions.value.length + 1,
      ...transactionForm.value,
      date: transactionForm.value.date.toISOString().split('T')[0]
    })
    toast.success('Transaction created successfully')
    dialogVisible.value = false
  } catch (error) {
    toast.error('Failed to create transaction')
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
.transactions {
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      margin: 0;
    }
  }

  .summary-cards {
    margin-bottom: 20px;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-content {
      text-align: center;
      padding: 20px 0;
    }
  }

  .transaction-list {
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

  .income {
    color: #10b981;
  }

  .expense {
    color: #ef4444;
  }

  .transaction-details {
    padding: 20px;
  }
}
</style> 