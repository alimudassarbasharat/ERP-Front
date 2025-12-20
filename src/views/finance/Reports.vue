<template>
  <div class="reports">
    <div class="page-header">
      <h2>Financial Reports</h2>
      <div class="header-actions">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          :shortcuts="dateShortcuts"
          @change="generateReport"
        />
        <el-button type="primary" @click="exportReport">
          <el-icon><Download /></el-icon>
          Export Report
        </el-button>
      </div>
    </div>

    <el-row :gutter="20" class="summary-cards">
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>Total Revenue</span>
              <el-tag type="success">+${{ formatCurrency(totalRevenue) }}</el-tag>
            </div>
          </template>
          <div class="card-content">
            <el-statistic :value="formatCurrency(totalRevenue)">
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
              <span>Net Profit</span>
              <el-tag :type="netProfit >= 0 ? 'success' : 'danger'">
                {{ netProfit >= 0 ? '+' : '-' }}${{ formatCurrency(Math.abs(netProfit)) }}
              </el-tag>
            </div>
          </template>
          <div class="card-content">
            <el-statistic :value="formatCurrency(netProfit)">
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
              <span>Profit Margin</span>
              <el-tag :type="profitMargin >= 0 ? 'success' : 'danger'">
                {{ profitMargin.toFixed(2) }}%
              </el-tag>
            </div>
          </template>
          <div class="card-content">
            <el-statistic :value="profitMargin.toFixed(2)" suffix="%">
              <template #prefix>
                <el-icon><TrendCharts /></el-icon>
              </template>
            </el-statistic>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="charts">
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>Revenue vs Expenses</span>
              <el-radio-group v-model="chartType" size="small">
                <el-radio-button label="monthly">Monthly</el-radio-button>
                <el-radio-button label="quarterly">Quarterly</el-radio-button>
                <el-radio-button label="yearly">Yearly</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-container">
            <!-- Add your chart component here -->
            <div class="placeholder-chart">Revenue vs Expenses Chart</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>Expense Categories</span>
            </div>
          </template>
          <div class="chart-container">
            <!-- Add your chart component here -->
            <div class="placeholder-chart">Expense Categories Chart</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="report-table">
      <template #header>
        <div class="card-header">
          <span>Detailed Report</span>
          <el-select v-model="reportType" placeholder="Select Report Type">
            <el-option label="Income Statement" value="income" />
            <el-option label="Balance Sheet" value="balance" />
            <el-option label="Cash Flow" value="cash" />
          </el-select>
        </div>
      </template>

      <el-table
        :data="reportData"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column prop="date" label="Date" width="120">
          <template #default="{ row }">
            {{ formatDate(row.date) }}
          </template>
        </el-table-column>
        <el-table-column prop="category" label="Category" width="150">
          <template #default="{ row }">
            <el-tag>{{ row.category }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="Description" />
        <el-table-column prop="amount" label="Amount" width="150">
          <template #default="{ row }">
            <span :class="row.type === 'income' ? 'income' : 'expense'">
              {{ row.type === 'income' ? '+' : '-' }}${{ formatCurrency(row.amount) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="balance" label="Balance" width="150">
          <template #default="{ row }">
            <span :class="row.balance >= 0 ? 'income' : 'expense'">
              {{ row.balance >= 0 ? '+' : '-' }}${{ formatCurrency(Math.abs(row.balance)) }}
            </span>
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
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

// State
const toast = useToast()
const loading = ref(false)
const dateRange = ref([])
const chartType = ref('monthly')
const reportType = ref('income')
const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(0)

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
  },
  {
    text: 'Last year',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
      return [start, end]
    }
  }
]

// Mock data (replace with API calls)
const reportData = ref([
  {
    date: '2024-03-15',
    category: 'Tuition',
    description: 'Tuition Payment',
    type: 'income',
    amount: 5000,
    balance: 5000
  },
  {
    date: '2024-03-14',
    category: 'Utilities',
    description: 'Utility Bill',
    type: 'expense',
    amount: 500,
    balance: 4500
  }
])

// Computed
const totalRevenue = computed(() => {
  return reportData.value
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0)
})

const totalExpenses = computed(() => {
  return reportData.value
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0)
})

const netProfit = computed(() => {
  return totalRevenue.value - totalExpenses.value
})

const profitMargin = computed(() => {
  if (totalRevenue.value === 0) return 0
  return (netProfit.value / totalRevenue.value) * 100
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

const generateReport = async () => {
  try {
    loading.value = true
    // Add API call here to fetch report data based on date range
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    toast.success('Report generated successfully')
  } catch (error) {
    toast.error('Failed to generate report')
  } finally {
    loading.value = false
  }
}

const exportReport = async () => {
  try {
    loading.value = true
    // Add API call here to export report
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    toast.success('Report exported successfully')
  } catch (error) {
    toast.error('Failed to export report')
  } finally {
    loading.value = false
  }
}

const handleSizeChange = (val) => {
  pageSize.value = val
  generateReport()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  generateReport()
}
</script>

<style scoped lang="scss">
.reports {
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      margin: 0;
    }

    .header-actions {
      display: flex;
      gap: 16px;
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

  .charts {
    margin-bottom: 20px;

    .chart-card {
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .chart-container {
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .placeholder-chart {
        color: #94a3b8;
        font-size: 14px;
      }
    }
  }

  .report-table {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
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
}
</style> 