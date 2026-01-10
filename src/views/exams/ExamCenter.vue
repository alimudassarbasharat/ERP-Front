<template>
  <PageShell 
    title="Exam Management Dashboard"
    :breadcrumbs="[]"
  >
    <!-- KPI Cards (Matching Fee Analytics Style) -->
    <div class="w-full mb-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <KPICard
          label="Papers Pending Approval"
          :value="dashboardStats.papers_pending_approval || 0"
          :icon="Document"
          icon-bg-class="bg-gradient-to-br from-orange-100 to-amber-100"
          icon-class="text-orange-600"
          :badge="dashboardStats.papers_pending_approval > 0 ? 'Needs review' : 'All clear'"
          :badge-class="dashboardStats.papers_pending_approval > 0 ? 'text-orange-600 bg-orange-100' : 'text-green-600 bg-green-100'"
        />
        <KPICard
          label="Marks Pending Entry"
          :value="dashboardStats.marks_pending_entry || 0"
          :icon="EditPen"
          icon-bg-class="bg-gradient-to-br from-blue-100 to-indigo-100"
          icon-class="text-blue-600"
          :badge="dashboardStats.marks_pending_entry > 0 ? 'In progress' : 'Complete'"
          :badge-class="dashboardStats.marks_pending_entry > 0 ? 'text-blue-600 bg-blue-100' : 'text-green-600 bg-green-100'"
        />
        <KPICard
          label="Marks Pending Verification"
          :value="dashboardStats.marks_pending_verification || 0"
          :icon="CircleCheck"
          icon-bg-class="bg-gradient-to-br from-purple-100 to-pink-100"
          icon-class="text-purple-600"
          :badge="dashboardStats.marks_pending_verification > 0 ? 'Needs check' : 'All verified'"
          :badge-class="dashboardStats.marks_pending_verification > 0 ? 'text-purple-600 bg-purple-100' : 'text-green-600 bg-green-100'"
        />
        <KPICard
          label="Results Ready"
          :value="dashboardStats.results_ready_to_publish || 0"
          :icon="Trophy"
          icon-bg-class="bg-gradient-to-br from-green-100 to-emerald-100"
          icon-class="text-green-600"
          :badge="dashboardStats.results_ready_to_publish > 0 ? 'Ready to show' : 'None ready'"
          :badge-class="dashboardStats.results_ready_to_publish > 0 ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'"
        />
        <KPICard
          label="Published Exams"
          :value="dashboardStats.published_exams || 0"
          :icon="Printer"
          icon-bg-class="bg-gradient-to-br from-indigo-100 to-blue-100"
          icon-class="text-indigo-600"
          :trend="{ type: 'positive', value: '+8.3%' }"
        />
      </div>
    </div>

    <!-- Action Bar (Matching Analytics Style) -->
    <ActionBar>
      <ActionButton 
        label="Manage Terms"
        :icon="Calendar"
        variant="secondary"
        @click="router.push('/exams/terms')"
      />
      <ActionButton 
        label="Create Exam"
        :icon="Plus"
        variant="primary"
        @click="router.push('/exams/manage')"
      />
      <ActionButton 
        label="Manage Datesheet"
        :icon="Calendar"
        variant="info"
        @click="router.push('/exams/datesheet')"
      />
      <ActionButton 
        label="Publish Results"
        :icon="CircleCheck"
        variant="success"
        :disabled="dashboardStats.results_ready_to_publish === 0"
        @click="router.push('/exams/results')"
      />
      <ActionButton 
        label="Download Marksheets"
        :icon="Printer"
        variant="info"
        @click="router.push('/exams/marksheets')"
      />
      <ActionButton 
        label="View Reports"
        :icon="DataAnalysis"
        variant="secondary"
        @click="showReportsModal = true"
      />
    </ActionBar>

    <!-- Exam Command Center Sections (Matching Analytics Style) -->
    <div class="w-full mb-4">
      <SectionHeader title="Exam Command Center" :icon="Document" />
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Papers Section -->
        <SectionCard
          v-if="canAccessPapers"
          title="Exam Papers"
          description="Create, submit, and approve exam papers"
          :icon="Document"
          icon-bg-class="bg-gradient-to-r from-purple-100 to-purple-200"
          hover-icon-bg-class="group-hover:from-purple-500 group-hover:to-purple-600"
          icon-class="text-purple-600"
          hover-icon-class="group-hover:text-white"
          hover-text-class="group-hover:text-purple-600"
          :tags="[
            { label: 'Create', class: 'bg-purple-100 text-purple-700' },
            { label: 'Approve', class: 'bg-blue-100 text-blue-700' },
            { label: 'Review', class: 'bg-indigo-100 text-indigo-700' }
          ]"
          @click="router.push('/exams/papers')"
        />

        <!-- Marks Entry Section -->
        <SectionCard
          v-if="canAccessMarksEntry"
          title="Enter Marks"
          description="Enter exam marks for students"
          :icon="EditPen"
          icon-bg-class="bg-gradient-to-r from-green-100 to-green-200"
          hover-icon-bg-class="group-hover:from-green-500 group-hover:to-green-600"
          icon-class="text-green-600"
          hover-icon-class="group-hover:text-white"
          hover-text-class="group-hover:text-green-600"
          :tags="[
            { label: 'Quick Entry', class: 'bg-green-100 text-green-700' },
            { label: 'Bulk Upload', class: 'bg-emerald-100 text-emerald-700' }
          ]"
          @click="router.push('/exams/marks-entry')"
        />

        <!-- Verification Section -->
        <SectionCard
          v-if="canAccessVerification"
          title="Check Marks"
          description="Verify marks entered by teachers"
          :icon="CircleCheck"
          icon-bg-class="bg-gradient-to-r from-orange-100 to-orange-200"
          hover-icon-bg-class="group-hover:from-orange-500 group-hover:to-orange-600"
          icon-class="text-orange-600"
          hover-icon-class="group-hover:text-white"
          hover-text-class="group-hover:text-orange-600"
          :tags="[
            { label: 'Verify', class: 'bg-orange-100 text-orange-700' },
            { label: 'Approve', class: 'bg-amber-100 text-amber-700' }
          ]"
          @click="router.push('/exams/marks-verification')"
        />

        <!-- Results Section -->
        <SectionCard
          v-if="canAccessResults"
          title="Exam Results"
          description="Generate and publish exam results"
          :icon="Trophy"
          icon-bg-class="bg-gradient-to-r from-emerald-100 to-emerald-200"
          hover-icon-bg-class="group-hover:from-emerald-500 group-hover:to-emerald-600"
          icon-class="text-emerald-600"
          hover-icon-class="group-hover:text-white"
          hover-text-class="group-hover:text-emerald-600"
          :tags="[
            { label: 'Generate', class: 'bg-emerald-100 text-emerald-700' },
            { label: 'Publish', class: 'bg-green-100 text-green-700' }
          ]"
          @click="router.push('/exams/results')"
        />

        <!-- Marksheets Section -->
        <SectionCard
          v-if="canAccessMarksheets"
          title="Marksheets"
          description="Download and print student marksheets"
          :icon="Printer"
          icon-bg-class="bg-gradient-to-r from-indigo-100 to-indigo-200"
          hover-icon-bg-class="group-hover:from-indigo-500 group-hover:to-indigo-600"
          icon-class="text-indigo-600"
          hover-icon-class="group-hover:text-white"
          hover-text-class="group-hover:text-indigo-600"
          :tags="[
            { label: 'Download', class: 'bg-indigo-100 text-indigo-700' },
            { label: 'Print', class: 'bg-blue-100 text-blue-700' }
          ]"
          @click="router.push('/exams/marksheets')"
        />

        <!-- Reports Section -->
        <SectionCard
          v-if="canAccessReports"
          title="Reports"
          description="View exam and marks reports"
          :icon="DataAnalysis"
          icon-bg-class="bg-gradient-to-r from-rose-100 to-rose-200"
          hover-icon-bg-class="group-hover:from-rose-500 group-hover:to-rose-600"
          icon-class="text-rose-600"
          hover-icon-class="group-hover:text-white"
          hover-text-class="group-hover:text-rose-600"
          :tags="[
            { label: 'Student Reports', class: 'bg-rose-100 text-rose-700' },
            { label: 'Class Reports', class: 'bg-pink-100 text-pink-700' }
          ]"
          @click="showReportsModal = true"
        />
      </div>
    </div>

    <!-- Recent Activity Section (Matching Fee Analytics) -->
    <div class="w-full mb-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-6">
          <SectionHeader title="Recent Activity" :icon="Clock" :show-icon="true" />
          <ActionButton 
            label="View All"
            variant="primary"
            @click="router.push('/exams/manage')"
          />
        </div>
        
        <div class="space-y-4">
          <ActivityItem
            v-for="(activity, index) in recentActivities"
            :key="index"
            :title="activity.title"
            :description="activity.description"
            :time="activity.time"
            :type="activity.type"
            :icon="activity.icon"
          />
          <EmptyState
            v-if="recentActivities.length === 0"
            title="No recent activity"
            description="Exam activities will appear here"
            :icon="Document"
            icon-color="gray"
          />
        </div>
      </div>
    </div>

    <!-- Reports Modal (Grouped Reports) -->
    <el-dialog
      v-model="showReportsModal"
      title="Exam Reports"
      width="600px"
      class="reports-dialog"
    >
      <div class="space-y-4">
        <div class="report-category">
          <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Student Reports</h4>
          <div class="grid grid-cols-2 gap-3">
            <el-button @click="router.push('/exams/mark-report')" class="report-button">Mark Report</el-button>
            <el-button @click="router.push('/exams/view-marksheet')" class="report-button">View Marksheet</el-button>
          </div>
        </div>
        <div class="report-category">
          <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Subject Reports</h4>
          <div class="grid grid-cols-2 gap-3">
            <el-button @click="router.push('/reports/students')" class="report-button">Subject Performance</el-button>
            <el-button @click="router.push('/exams/award-list')" class="report-button">Award List</el-button>
          </div>
        </div>
        <div class="report-category">
          <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Class Reports</h4>
          <div class="grid grid-cols-2 gap-3">
            <el-button @click="router.push('/reports/students/class-wise')" class="report-button">Class-wise Report</el-button>
            <el-button @click="router.push('/reports/students/family-wise')" class="report-button">Family-wise Report</el-button>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button @click="showReportsModal = false">Close</el-button>
      </template>
    </el-dialog>
  </PageShell>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Document, EditPen, CircleCheck, Printer, Plus, Trophy, 
  DataAnalysis, Clock, Calendar
} from '@element-plus/icons-vue'
import api from '@/utils/axios'
import KPICard from '@/components/common/KPICard.vue'
import SectionCard from '@/components/common/SectionCard.vue'
import PageShell from '@/components/common/PageShell.vue'
import ActionBar from '@/components/common/ActionBar.vue'
import ActionButton from '@/components/common/ActionButton.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import ActivityItem from '@/components/common/ActivityItem.vue'
import EmptyState from '@/components/common/EmptyState.vue'

const router = useRouter()

const loading = ref(false)
const showReportsModal = ref(false)
const dashboardStats = ref({
  papers_pending_approval: 0,
  marks_pending_entry: 0,
  marks_pending_verification: 0,
  results_ready_to_publish: 0,
  published_exams: 0
})
const recentActivities = ref([])

// Get user role
const userRole = computed(() => {
  try {
    const userData = JSON.parse(localStorage.getItem('user') || '{}')
    return userData.role || userData.user_type || userData.type || 'guest'
  } catch {
    return 'guest'
  }
})

// Role-based access
const canAccessPapers = computed(() => ['teacher', 'supervisor', 'admin', 'super-admin'].includes(userRole.value))
const canAccessMarksEntry = computed(() => ['teacher', 'admin', 'super-admin'].includes(userRole.value))
const canAccessVerification = computed(() => ['supervisor', 'admin', 'super-admin'].includes(userRole.value))
const canAccessResults = computed(() => ['principal', 'admin', 'super-admin'].includes(userRole.value))
const canAccessMarksheets = computed(() => ['principal', 'admin', 'super-admin'].includes(userRole.value))
const canAccessReports = computed(() => ['principal', 'admin', 'super-admin', 'teacher', 'supervisor'].includes(userRole.value))

const loadDashboardStats = async () => {
  try {
    const response = await api.get('/exam-management/dashboard-stats')
    if (response.data.success) {
      dashboardStats.value = {
        papers_pending_approval: response.data.data?.papers_pending_approval || 0,
        marks_pending_entry: response.data.data?.marks_pending_entry || 0,
        marks_pending_verification: response.data.data?.marks_pending_verification || 0,
        results_ready_to_publish: response.data.data?.results_ready_to_publish || 0,
        published_exams: response.data.data?.published_exams || 0
      }
    }
  } catch (error) {
    console.error('Failed to load dashboard stats:', error)
    // Ensure defaults are set even on error
    dashboardStats.value = {
      papers_pending_approval: 0,
      marks_pending_entry: 0,
      marks_pending_verification: 0,
      results_ready_to_publish: 0,
      published_exams: 0
    }
  }
}

const loadExamsData = async () => {
  try {
    const response = await api.get('/exams')
    if (response.data.success || response.data.status) {
      const exams = response.data.result || response.data.data || []
      
      // Build recent activities
      recentActivities.value = exams
        .slice(0, 5)
        .map(exam => ({
          type: exam.status === 'published' ? 'payment' : exam.status === 'locked' ? 'due' : 'notification',
          title: exam.status === 'published' ? 'Results Published' : exam.status === 'locked' ? 'Exam Locked' : 'Exam Created',
          description: `${exam.name || exam.term || 'Untitled Exam'}`,
          time: new Date(exam.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          icon: exam.status === 'published' ? CircleCheck : exam.status === 'locked' ? Clock : Document
        }))
    }
  } catch (error) {
    console.error('Failed to load exams:', error)
  }
}

onMounted(() => {
  loadDashboardStats()
  loadExamsData()
})
</script>

<style scoped>
.report-category {
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
}

.dark .report-category {
  background: #1f2937;
}

.report-button {
  width: 100%;
  justify-content: flex-start;
}

:deep(.reports-dialog) {
  border-radius: 16px;
}
</style>
