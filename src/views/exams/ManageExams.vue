<template>
  <div class="manage-exams min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 sm:p-8 lg:p-12">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Exams</h1>
      <p class="text-gray-600 dark:text-gray-400">Manage exams and show results to parents</p>
    </div>

    <!-- Owner-First Dashboard Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-pink-100 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Papers Waiting</p>
            <p class="text-3xl font-bold text-orange-600 dark:text-orange-400">{{ dashboardStats.papers_pending_approval || 0 }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">Need your approval</p>
          </div>
          <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
            <el-icon class="text-2xl text-orange-600 dark:text-orange-400"><Document /></el-icon>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-pink-100 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Marks Waiting</p>
            <p class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ dashboardStats.marks_pending_verification || 0 }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">Need verification</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
            <el-icon class="text-2xl text-blue-600 dark:text-blue-400"><EditPen /></el-icon>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-pink-100 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Ready to Show</p>
            <p class="text-3xl font-bold text-green-600 dark:text-green-400">{{ dashboardStats.results_ready_to_publish || 0 }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">Can show to parents</p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
            <el-icon class="text-2xl text-green-600 dark:text-green-400"><CircleCheck /></el-icon>
          </div>
        </div>
      </div>
    </div>

    <!-- Exams List -->
    <div v-if="filteredExams.length > 0" class="space-y-4">
      <div
        v-for="exam in filteredExams"
        :key="exam.id"
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-pink-100 dark:border-gray-700 hover:shadow-md transition-all"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-4">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ exam.name || exam.term || 'Untitled Exam' }}
              </h3>
              <span 
                :class="[
                  'px-3 py-1 rounded-full text-xs font-medium',
                  getStatusClass(exam.status)
                ]"
              >
                {{ getStatusLabel(exam.status) }}
              </span>
            </div>
            
            <!-- Readiness Info (Owner-First) -->
            <div v-if="exam.status === 'locked' && isReadyToPublish(exam)" 
                 class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-4 border border-green-200 dark:border-green-800">
              <div class="flex items-center gap-2 mb-2">
                <el-icon class="text-green-600 dark:text-green-400"><CircleCheck /></el-icon>
                <span class="font-semibold text-green-800 dark:text-green-300">Ready to Show Results</span>
              </div>
              <p class="text-sm text-green-700 dark:text-green-400">
                All checks are done. You can show results to parents now with one click.
              </p>
            </div>

            <div v-else-if="exam.status === 'running' || exam.status === 'draft'" 
                 class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 mb-4 border border-orange-200 dark:border-orange-800">
              <div class="flex items-center gap-2 mb-2">
                <el-icon class="text-orange-600 dark:text-orange-400"><Clock /></el-icon>
                <span class="font-semibold text-orange-800 dark:text-orange-300">Teachers Are Working</span>
              </div>
              <p class="text-sm text-orange-700 dark:text-orange-400">
                Teachers are checking papers and entering marks. Results will be ready soon.
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-2 ml-4">
            <el-button
              v-if="exam.status === 'locked' && isReadyToPublish(exam)"
              type="success"
              @click="viewAndPublish(exam)"
              class="rounded-lg"
            >
              <el-icon><View /></el-icon>
              Show to Parents
            </el-button>
            <el-button
              v-if="exam.status === 'draft' || exam.status === 'running'"
              type="primary"
              @click="lockExam(exam)"
              class="rounded-lg"
            >
              <el-icon><Lock /></el-icon>
              Lock Exam
            </el-button>
            <el-button
              type="default"
              @click="viewExam(exam)"
              class="rounded-lg"
            >
              <el-icon><View /></el-icon>
              View Details
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <el-icon class="text-6xl text-gray-300 dark:text-gray-600 mb-4"><Document /></el-icon>
      <p class="text-gray-500 dark:text-gray-400">No exams found</p>
    </div>

    <!-- Publish Confirmation Dialog -->
    <el-dialog
      v-model="showPublishDialog"
      title="Show Results to Parents"
      width="500px"
      v-if="selectedExam"
    >
      <div class="space-y-4">
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Exam Name</p>
          <p class="font-semibold text-gray-900 dark:text-white">{{ selectedExam?.name || selectedExam?.term }}</p>
        </div>
        <el-alert
          type="success"
          :closable="false"
          show-icon
        >
          <template #title>
            <span class="font-semibold">All checks are complete!</span>
          </template>
          <p class="mt-2">Parents will be able to see results after you confirm. This cannot be undone.</p>
        </el-alert>
      </div>
      <template #footer>
        <el-button @click="showPublishDialog = false">Cancel</el-button>
        <el-button
          type="success"
          @click="confirmPublish"
          :loading="publishing"
        >
          Yes, Show to Parents
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { Document, EditPen, CircleCheck, Clock, View, Lock } from '@element-plus/icons-vue'
import api from '@/utils/axios'

const router = useRouter()
const toast = useToast()

const loading = ref(false)
const exams = ref([])
const dashboardStats = ref({
  papers_pending_approval: 0,
  marks_pending_verification: 0,
  results_ready_to_publish: 0
})
const showPublishDialog = ref(false)
const selectedExam = ref(null)
const publishing = ref(false)

const filteredExams = computed(() => {
  return exams.value
})

const getStatusLabel = (status) => {
  const labels = {
    'published': 'Published',
    'locked': 'Locked',
    'running': 'In Progress',
    'draft': 'Draft'
  }
  return labels[status] || 'Unknown'
}

const getStatusClass = (status) => {
  const classes = {
    'published': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    'locked': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'running': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    'draft': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const isReadyToPublish = (exam) => {
  // Check if exam is locked and ready (backend will tell us)
  return exam.status === 'locked' && exam.is_ready_to_publish !== false
}

const loadDashboardStats = async () => {
  try {
    const response = await api.get('/exam-management/dashboard-stats')
    if (response.data.success) {
      dashboardStats.value = response.data.data || {}
    }
  } catch (error) {
    console.error('Failed to load dashboard stats:', error)
  }
}

const loadExams = async () => {
  loading.value = true
  try {
    const response = await api.get('/exams')
    if (response.data.success || response.data.status) {
      exams.value = response.data.result || response.data.data || []
    }
  } catch (error) {
    toast.error('Failed to load exams')
    console.error(error)
  } finally {
    loading.value = false
  }
}

const lockExam = async (exam) => {
  try {
    const response = await api.post(`/exam-management/exams/${exam.id}/lock`)
    if (response.data.success) {
      toast.success('Exam locked successfully')
      loadExams()
      loadDashboardStats()
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to lock exam')
  }
}

const viewAndPublish = async (exam) => {
  selectedExam.value = exam
  showPublishDialog.value = true
}

const confirmPublish = async () => {
  if (!selectedExam.value) return
  
  publishing.value = true
  try {
    const response = await api.post(`/exam-management/exams/${selectedExam.value.id}/publish-results`, {
      confirm: true
    })
    if (response.data.success) {
      toast.success('Results are being shown to parents. They will be notified.')
      showPublishDialog.value = false
      loadExams()
      loadDashboardStats()
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to publish results')
    console.error(error)
  } finally {
    publishing.value = false
  }
}

const viewExam = (exam) => {
  router.push(`/exams/view/${exam.id}`)
}

onMounted(() => {
  loadExams()
  loadDashboardStats()
})
</script>

<style scoped>
.manage-exams {
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
