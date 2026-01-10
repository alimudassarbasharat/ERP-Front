<template>
  <div class="owner-landing min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Subtle Background Pattern -->
    <div class="absolute inset-0 opacity-5 pointer-events-none">
      <div class="absolute top-0 left-0 w-96 h-96 bg-pink-300 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-rose-300 rounded-full blur-3xl"></div>
    </div>

    <div class="relative z-10 p-6 sm:p-8 lg:p-12">
      <!-- Welcome Header -->
      <div class="mb-8">
        <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
          Welcome back,
          <span class="text-pink-500 dark:text-pink-400">{{ userName }}</span>
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Here's what needs your attention today
        </p>
      </div>

      <!-- Money Status - Big Numbers -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span class="w-1 h-6 bg-pink-400 rounded-full"></span>
          Where is my money?
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <PremiumStatCard
            label="Expected This Month"
            :value="stats.fee?.expected || 0"
            format="currency"
            icon="Money"
            :highlight="true"
            color="pink"
          />
          <PremiumStatCard
            label="Collected"
            :value="stats.fee?.collected || 0"
            format="currency"
            icon="CircleCheck"
            color="green"
          />
          <PremiumStatCard
            label="Pending"
            :value="stats.fee?.pending || 0"
            format="currency"
            icon="Clock"
            color="orange"
          />
          <PremiumStatCard
            label="Overdue"
            :value="stats.fee?.overdue || 0"
            format="currency"
            icon="Warning"
            color="red"
            :subtext="`${stats.fee?.overdue_count || 0} students`"
          />
          <PremiumStatCard
            label="Disputes"
            :value="stats.fee?.disputes || 0"
            icon="QuestionFilled"
            color="purple"
          />
        </div>
      </div>

      <!-- Attention Items -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span class="w-1 h-6 bg-pink-400 rounded-full"></span>
          What needs my attention?
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <PremiumStatCard
            label="Papers Waiting Approval"
            :value="stats.exam?.papers_pending || 0"
            icon="Document"
            color="blue"
          />
          <PremiumStatCard
            label="Marks Waiting Verification"
            :value="stats.exam?.marks_pending || 0"
            icon="Edit"
            color="yellow"
          />
          <PremiumStatCard
            label="Results Ready to Publish"
            :value="stats.exam?.results_ready || 0"
            icon="Check"
            color="green"
            :highlight="stats.exam?.results_ready > 0"
          />
          <PremiumStatCard
            label="Published Exams"
            :value="stats.exam?.published || 0"
            icon="DocumentChecked"
            color="gray"
          />
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span class="w-1 h-6 bg-pink-400 rounded-full"></span>
          What can I do right now?
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <PremiumActionCard
            title="Create Monthly Fees"
            description="Generate fees for all students"
            icon="Plus"
            color="pink"
            @click="$router.push('/fees/create-monthly')"
          />
          <PremiumActionCard
            title="Fee Vouchers"
            description="View and manage fee vouchers"
            icon="Document"
            color="blue"
            @click="$router.push('/fees/vouchers')"
          />
          <PremiumActionCard
            title="Show Results to Parents"
            description="Publish exam results"
            icon="Check"
            color="green"
            :disabled="stats.exam?.results_ready === 0"
            @click="$router.push('/exam-center')"
          />
          <PremiumActionCard
            title="Send Reminders"
            description="Remind parents about fees"
            icon="Message"
            color="orange"
            @click="$router.push('/fees/reminders')"
          />
        </div>
      </div>

      <!-- Alerts (Only if needed) -->
      <div v-if="alerts.length > 0" class="space-y-3">
        <div
          v-for="(alert, index) in alerts"
          :key="index"
          class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-pink-100 dark:border-gray-700"
        >
          <div class="flex items-start gap-4">
            <div :class="['w-10 h-10 rounded-xl flex items-center justify-center', alert.bgColor]">
              <el-icon :class="['text-xl', alert.iconColor]">
                <component :is="alert.icon" />
              </el-icon>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-1">{{ alert.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-3">{{ alert.message }}</p>
              <el-button
                v-if="alert.action"
                :type="alert.buttonType"
                size="small"
                @click="handleAlertAction(alert)"
                class="rounded-lg"
              >
                {{ alert.actionText }}
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/auth'
import api from '@/utils/axios'
import PremiumStatCard from '@/components/premium/PremiumStatCard.vue'
import PremiumActionCard from '@/components/premium/PremiumActionCard.vue'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const userName = computed(() => {
  const user = authStore.user
  if (!user) return 'Owner'
  return user.first_name || user.name || 'Owner'
})

const stats = ref({
  fee: {
    expected: 0,
    collected: 0,
    pending: 0,
    overdue: 0,
    overdue_count: 0,
    disputes: 0
  },
  exam: {
    papers_pending: 0,
    marks_pending: 0,
    results_ready: 0,
    published: 0
  }
})

const alerts = ref([])

const loadDashboardData = async () => {
  try {
    const response = await api.get('/api/owner/dashboard-stats')
    if (response.data.success) {
      const data = response.data.data
      
      stats.value = {
        fee: {
          expected: data.fee?.forecast?.expected || 0,
          collected: data.fee?.forecast?.collected || data.fee?.collected_today || 0,
          pending: data.fee?.forecast?.pending || data.fee?.pending_total || 0,
          overdue: data.fee?.forecast?.overdue || data.fee?.overdue_amount || 0,
          overdue_count: data.fee?.overdue_count || 0,
          disputes: data.fee?.dispute_count || 0
        },
        exam: {
          papers_pending: data.exam?.papers_pending_approval || 0,
          marks_pending: data.exam?.marks_pending_verification || 0,
          results_ready: data.exam?.results_ready_to_publish || 0,
          published: data.exam?.results_published || 0
        }
      }

      // Generate alerts only if action needed
      alerts.value = []
      if (stats.value.fee.overdue_count > 0) {
        alerts.value.push({
          title: 'Overdue Fees',
          message: `${stats.value.fee.overdue_count} students have overdue fees. They need your attention.`,
          icon: 'Warning',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          iconColor: 'text-red-500',
          buttonType: 'danger',
          action: 'view_defaulters',
          actionText: 'View Defaulters'
        })
      }
      if (stats.value.fee.disputes > 0) {
        alerts.value.push({
          title: 'Fee Disputes',
          message: `${stats.value.fee.disputes} fee disputes need your review.`,
          icon: 'QuestionFilled',
          bgColor: 'bg-purple-50 dark:bg-purple-900/20',
          iconColor: 'text-purple-500',
          buttonType: 'warning',
          action: 'view_disputes',
          actionText: 'View Disputes'
        })
      }
      if (stats.value.exam.results_ready > 0) {
        alerts.value.push({
          title: 'Results Ready',
          message: `${stats.value.exam.results_ready} exam results are ready to show to parents.`,
          icon: 'Check',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          iconColor: 'text-green-500',
          buttonType: 'success',
          action: 'publish_results',
          actionText: 'Publish Results'
        })
      }
    }
  } catch (error) {
    console.error('Failed to load dashboard:', error)
    toast.error('Failed to load dashboard data')
  }
}

const handleAlertAction = (alert) => {
  if (alert.action === 'view_defaulters') {
    router.push('/fees/defaulters')
  } else if (alert.action === 'view_disputes') {
    router.push('/fees/disputes')
  } else if (alert.action === 'publish_results') {
    router.push('/exam-center')
  }
}

onMounted(() => {
  loadDashboardData()
  // Refresh every 5 minutes
  setInterval(loadDashboardData, 5 * 60 * 1000)
})
</script>

<style scoped>
.owner-landing {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
