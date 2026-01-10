<template>
  <PageShell 
    title="Fee Management Dashboard"
    :breadcrumbs="[
      { label: 'Fee Management', route: null },
      { label: 'Analytics', route: '/fees/analytics' }
    ]"
  >
    <!-- KPI Cards (Matching Fee Analytics Style) -->
    <div class="w-full mb-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <KPICard
          label="Expected This Month"
          :value="formatCurrency(stats.expectedThisMonth)"
          :icon="Money"
          icon-bg-class="bg-gradient-to-br from-blue-100 to-indigo-100"
          icon-class="text-blue-600"
        />
        <KPICard
          label="Collected"
          :value="formatCurrency(stats.collected)"
          :icon="CircleCheck"
          icon-bg-class="bg-gradient-to-br from-green-100 to-emerald-100"
          icon-class="text-green-600"
          :trend="stats.collectedTrend"
        />
        <KPICard
          label="Pending"
          :value="formatCurrency(stats.pending)"
          :icon="Clock"
          icon-bg-class="bg-gradient-to-br from-orange-100 to-amber-100"
          icon-class="text-orange-600"
          :trend="stats.pendingTrend"
        />
        <KPICard
          label="Overdue"
          :value="formatCurrency(stats.overdue)"
          :icon="WarningFilled"
          icon-bg-class="bg-gradient-to-br from-red-100 to-pink-100"
          icon-class="text-red-600"
          :badge="`${stats.overdueCount} invoices`"
          badge-class="text-red-600 bg-red-100"
        />
        <KPICard
          label="Disputes"
          :value="stats.disputes"
          :icon="QuestionFilled"
          icon-bg-class="bg-gradient-to-br from-yellow-100 to-orange-100"
          icon-class="text-yellow-600"
          :badge="stats.disputes > 0 ? 'Needs attention' : 'All clear'"
          :badge-class="stats.disputes > 0 ? 'text-yellow-600 bg-yellow-100' : 'text-green-600 bg-green-100'"
        />
      </div>
    </div>

    <!-- Action Bar (Matching Analytics Style) -->
    <ActionBar>
      <ActionButton 
        label="Create Monthly Fees"
        :icon="DocumentAdd"
        variant="primary"
        @click="showGenerateInvoicesModal = true"
      />
      <ActionButton 
        label="Generate Fee Vouchers"
        :icon="Printer"
        variant="info"
        @click="showGenerateChallansModal = true"
      />
      <ActionButton 
        label="Send Reminders"
        :icon="Message"
        variant="warning"
        @click="sendBulkReminders"
      />
      <ActionButton 
        label="View All Payments"
        :icon="View"
        variant="secondary"
        @click="router.push('/fees/collection')"
      />
    </ActionBar>

    <!-- Insights Section (Matching Analytics Style) -->
    <div class="w-full mb-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <SectionHeader title="Quick Insights" :icon="DataAnalysis" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InsightCard
            label="Overdue Trend"
            :value="`${insights.overdueChange > 0 ? '+' : ''}${insights.overdueChange}% vs last month`"
            :description="`${insights.overdueChange > 0 ? 'Increased' : 'Decreased'} compared to previous month`"
            color="orange"
          />
          <InsightCard
            label="Top Classes with Pending"
            value=""
            color="blue"
          >
            <template #default>
              <div class="space-y-1">
                <div v-for="(cls, idx) in insights.topPendingClasses" :key="idx" class="flex justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-400">{{ cls.name }}</span>
                  <span class="font-semibold text-blue-600 dark:text-blue-400">{{ formatCurrency(cls.amount) }}</span>
                </div>
              </div>
            </template>
          </InsightCard>
        </div>
      </div>
    </div>

    <!-- Clean Lists Section (Matching Analytics Style) -->
    <div class="w-full mb-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Defaulters List -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">Top Defaulters</h3>
            <button 
              @click="router.push('/fees/collection?filter=overdue')"
              class="text-xs text-purple-600 dark:text-purple-400 hover:underline"
            >
              View All
            </button>
          </div>
          <div class="space-y-3">
            <div 
              v-for="defaulter in defaulters.slice(0, 5)" 
              :key="defaulter.id"
              class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div class="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <el-icon class="text-red-600 dark:text-red-400"><User /></el-icon>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ defaulter.student_name }}</p>
                <p class="text-xs text-gray-600 dark:text-gray-400">{{ defaulter.className }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-bold text-red-600 dark:text-red-400">{{ formatCurrency(defaulter.amount) }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-500">{{ defaulter.daysOverdue }} days</p>
              </div>
            </div>
            <EmptyState
              v-if="defaulters.length === 0"
              title="No defaulters"
              description="All fees are up to date"
              :icon="CircleCheck"
              icon-color="green"
            />
          </div>
        </div>

        <!-- Recent Payments -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">Recent Payments</h3>
            <button 
              @click="router.push('/fees/collection')"
              class="text-xs text-purple-600 dark:text-purple-400 hover:underline"
            >
              View All
            </button>
          </div>
          <div class="space-y-3">
            <ActivityItem
              v-for="payment in recentPayments.slice(0, 5)"
              :key="payment.id"
              :title="payment.studentName"
              :description="payment.time"
              :time="payment.time"
              :amount="payment.amount"
              type="payment"
              :icon="CircleCheck"
              :format-currency="formatCurrency"
            />
            <EmptyState
              v-if="recentPayments.length === 0"
              title="No recent payments"
              description="Payment history will appear here"
              :icon="Document"
              icon-color="gray"
            />
          </div>
        </div>

        <!-- Recent Disputes -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">Recent Disputes</h3>
            <button 
              @click="router.push('/fees/collection?filter=disputes')"
              class="text-xs text-purple-600 dark:text-purple-400 hover:underline"
            >
              View All
            </button>
          </div>
          <div class="space-y-3">
            <ActivityItem
              v-for="dispute in recentDisputes.slice(0, 5)"
              :key="dispute.id"
              :title="dispute.studentName"
              :description="dispute.reason"
              :time="dispute.time"
              type="notification"
              :icon="QuestionFilled"
            />
            <EmptyState
              v-if="recentDisputes.length === 0"
              title="No disputes"
              description="All fee matters are resolved"
              :icon="CircleCheck"
              icon-color="green"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <el-dialog
      v-model="showGenerateInvoicesModal"
      title="Create Monthly Fees"
      width="500px"
      class="rounded-2xl"
    >
      <div class="space-y-4">
        <p class="text-gray-600 dark:text-gray-400">This will create fee invoices for all students for the selected month.</p>
        <el-date-picker
          v-model="selectedMonth"
          type="month"
          placeholder="Select month"
          format="MMMM YYYY"
          value-format="YYYY-MM"
          class="w-full"
        />
      </div>
      <template #footer>
        <el-button @click="showGenerateInvoicesModal = false">Cancel</el-button>
        <el-button type="primary" @click="generateMonthlyInvoices" :loading="generating">Create Fees</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="showGenerateChallansModal"
      title="Generate Fee Vouchers"
      width="500px"
      class="rounded-2xl"
    >
      <div class="space-y-4">
        <p class="text-gray-600 dark:text-gray-400">This will generate fee vouchers (challans) for all pending invoices for the selected month.</p>
        <el-date-picker
          v-model="selectedMonthForChallans"
          type="month"
          placeholder="Select month"
          format="MMMM YYYY"
          value-format="YYYY-MM"
          class="w-full"
        />
      </div>
      <template #footer>
        <el-button @click="showGenerateChallansModal = false">Cancel</el-button>
        <el-button type="primary" @click="generateChallans" :loading="generatingChallans">Generate Vouchers</el-button>
      </template>
    </el-dialog>
  </PageShell>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { 
  CircleCheck, Clock, User, DocumentAdd, Printer, Money, 
  Message, WarningFilled, QuestionFilled, View, DataAnalysis, Document
} from '@element-plus/icons-vue'
import api from '@/utils/axios'
import KPICard from '@/components/common/KPICard.vue'
import PageShell from '@/components/common/PageShell.vue'
import ActionBar from '@/components/common/ActionBar.vue'
import ActionButton from '@/components/common/ActionButton.vue'
import InsightCard from '@/components/common/InsightCard.vue'
import ActivityItem from '@/components/common/ActivityItem.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'

const router = useRouter()
const toast = useToast()

const loading = ref(false)
const generating = ref(false)
const generatingChallans = ref(false)
const showGenerateInvoicesModal = ref(false)
const showGenerateChallansModal = ref(false)
const selectedMonth = ref(null)
const selectedMonthForChallans = ref(null)

const stats = ref({
  expectedThisMonth: 0,
  collected: 0,
  pending: 0,
  overdue: 0,
  overdueCount: 0,
  disputes: 0,
  collectedTrend: null,
  pendingTrend: null
})

const insights = ref({
  overdueChange: 0,
  topPendingClasses: []
})

const defaulters = ref([])
const recentPayments = ref([])
const recentDisputes = ref([])

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount || 0)
}

const loadDashboardData = async () => {
  loading.value = true
  try {
    const currentMonth = new Date().toISOString().slice(0, 7)
    
    // Load all dashboard data in parallel
    const [summaryRes, defaultersRes, paymentsRes, disputesRes, insightsRes] = await Promise.all([
      api.get('/fee-management/summary', { params: { month: currentMonth } }),
      api.get('/fee-management/defaulters', { params: { limit: 10 } }),
      api.get('/fee-management/recent-payments', { params: { limit: 10 } }),
      api.get('/fee-management/recent-disputes', { params: { limit: 10 } }),
      api.get('/fee-management/insights', { params: { month: currentMonth } })
    ])

    if (summaryRes.data.success) {
      const data = summaryRes.data.data
      stats.value = {
        expectedThisMonth: data.expected_this_month || 0,
        collected: data.collected || 0,
        pending: data.pending || 0,
        overdue: data.overdue || 0,
        overdueCount: data.overdue_count || 0,
        disputes: data.disputes || 0,
        collectedTrend: data.collected_trend || null,
        pendingTrend: data.pending_trend || null
      }
    }

    if (defaultersRes.data.success) {
      defaulters.value = defaultersRes.data.data || []
    }

    if (paymentsRes.data.success) {
      recentPayments.value = paymentsRes.data.data || []
    }

    if (disputesRes.data.success) {
      recentDisputes.value = disputesRes.data.data || []
    }

    if (insightsRes.data.success) {
      insights.value = {
        overdueChange: insightsRes.data.data.overdue_change || 0,
        topPendingClasses: insightsRes.data.data.top_pending_classes || []
      }
    }
  } catch (error) {
    console.error('Failed to load dashboard data:', error)
    toast.error('Failed to load fee dashboard data')
  } finally {
    loading.value = false
  }
}

const generateMonthlyInvoices = async () => {
  if (!selectedMonth.value) {
    toast.warning('Please select a month')
    return
  }
  generating.value = true
  try {
    const response = await api.post('/fee-management/generate-monthly-fees', { 
      month: selectedMonth.value,
      confirm: true
    })
    if (response.data.success) {
      if (response.data.job_batch_id) {
        toast.success('Monthly fees are being created. This may take a few minutes.')
        // TODO: Poll job status
      } else {
        toast.success('Monthly fees created successfully')
      }
      showGenerateInvoicesModal.value = false
      selectedMonth.value = null
      setTimeout(() => loadDashboardData(), 2000)
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to create monthly fees')
  } finally {
    generating.value = false
  }
}

const generateChallans = async () => {
  if (!selectedMonthForChallans.value) {
    toast.warning('Please select a month')
    return
  }
  generatingChallans.value = true
  try {
    const response = await api.post('/generate-challans', { month: selectedMonthForChallans.value })
    if (response.data.success) {
      toast.success('Fee vouchers are being generated')
      showGenerateChallansModal.value = false
      selectedMonthForChallans.value = null
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to generate vouchers')
  } finally {
    generatingChallans.value = false
  }
}

const sendBulkReminders = async () => {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7)
    const response = await api.post('/fee-management/send-reminders', { month: currentMonth })
    if (response.data.success) {
      if (response.data.job_batch_id) {
        toast.success('Reminders are being sent. This may take a few minutes.')
        // TODO: Poll job status
      } else {
        toast.success('Reminders sent successfully')
      }
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to send reminders')
  }
}

onMounted(() => {
  loadDashboardData()
})
</script>
