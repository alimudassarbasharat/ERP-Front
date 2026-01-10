<template>
  <PageShell 
    title="Exam Results"
    :breadcrumbs="[
      { label: 'Exam Management', route: '/exams/center' },
      { label: 'Results' }
    ]"
  >
    <!-- Ready to Publish Section -->
    <div class="w-full mb-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <SectionHeader title="Ready to Show" :icon="CircleCheck" />
        
        <div v-if="loadingChecklist" class="flex justify-center py-8">
          <el-icon class="is-loading text-4xl"><Loading /></el-icon>
        </div>

        <div v-else-if="readyExams.length > 0" class="space-y-4">
          <div
            v-for="exam in readyExams"
            :key="exam.id"
            class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900 dark:text-white mb-1">{{ exam.name || exam.term }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">All checks are complete. Ready to show to parents.</p>
              </div>
              <ActionButton 
                label="Show Checklist"
                :icon="Document"
                variant="info"
                @click="loadChecklist(exam)"
              />
            </div>

            <!-- Checklist (shown when loaded) -->
            <div v-if="checklistData[exam.id]" class="mt-4 p-4 bg-white dark:bg-gray-700 rounded-lg">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Publish Checklist</h4>
              <div class="space-y-2">
                <div
                  v-for="(item, idx) in checklistData[exam.id]"
                  :key="idx"
                  class="flex items-center gap-2"
                >
                  <el-icon :class="item.passed ? 'text-green-600' : 'text-red-600'">
                    <component :is="item.passed ? CircleCheck : Close" />
                  </el-icon>
                  <span :class="item.passed ? 'text-gray-700 dark:text-gray-300' : 'text-red-600 dark:text-red-400'">
                    {{ item.message }}
                  </span>
                </div>
              </div>
              <div class="mt-4 flex justify-end">
                <ActionButton
                  label="Publish Results"
                  :icon="CircleCheck"
                  variant="success"
                  :disabled="!canPublish(exam.id)"
                  :loading="publishing[exam.id]"
                  @click="publishExam(exam)"
                />
              </div>
            </div>
          </div>
        </div>
        <EmptyState
          v-else
          title="No exams ready"
          description="Complete all checks to publish results"
          :icon="CircleCheck"
          icon-color="green"
        />
      </div>
    </div>

    <!-- Published Exams Section -->
    <div class="w-full mb-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <SectionHeader title="Published Results" :icon="Printer" />
        
        <div v-if="publishedExams.length > 0" class="space-y-4">
          <ActivityItem
            v-for="exam in publishedExams"
            :key="exam.id"
            :title="exam.name || exam.term"
            :description="`Published on ${formatDate(exam.published_at)}`"
            :time="formatDate(exam.published_at)"
            type="payment"
            :icon="CircleCheck"
            @click="viewResults(exam)"
          />
        </div>
        <EmptyState
          v-else
          title="No published results"
          description="Published results will appear here"
          :icon="Document"
          icon-color="gray"
        />
      </div>
    </div>
  </PageShell>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { CircleCheck, Printer, Document, Loading, Close } from '@element-plus/icons-vue'
import api from '@/utils/axios'
import PageShell from '@/components/common/PageShell.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import ActionButton from '@/components/common/ActionButton.vue'
import ActivityItem from '@/components/common/ActivityItem.vue'
import EmptyState from '@/components/common/EmptyState.vue'

const router = useRouter()
const toast = useToast()

const readyExams = ref([])
const publishedExams = ref([])
const publishing = ref({})
const loadingChecklist = ref(false)
const checklistData = ref({})

const formatDate = (dateString) => {
  if (!dateString) return 'Not set'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const loadExams = async () => {
  try {
    const response = await api.get('/exams')
    if (response.data.success || response.data.status) {
      const exams = response.data.result || response.data.data || []
      readyExams.value = exams.filter(e => e.status === 'locked')
      publishedExams.value = exams.filter(e => e.status === 'published')
      
      // Load checklist for all ready exams
      for (const exam of readyExams.value) {
        await loadChecklist(exam)
      }
    }
  } catch (error) {
    toast.error('Failed to load exams')
    console.error(error)
  }
}

const loadChecklist = async (exam) => {
  if (checklistData.value[exam.id]) return // Already loaded
  
  loadingChecklist.value = true
  try {
    const response = await api.get(`/exam-management/exams/${exam.id}/publish-checklist`)
    if (response.data.success) {
      checklistData.value[exam.id] = response.data.data.checklist || []
    }
  } catch (error) {
    toast.error('Failed to load checklist')
    console.error(error)
  } finally {
    loadingChecklist.value = false
  }
}

const canPublish = (examId) => {
  const checklist = checklistData.value[examId]
  if (!checklist) return false
  return checklist.every(item => item.passed)
}

const publishExam = async (exam) => {
  if (!canPublish(exam.id)) {
    toast.warning('Cannot publish: Some checklist items are not passed')
    return
  }

  publishing.value[exam.id] = true
  try {
    const response = await api.post(`/exam-management/exams/${exam.id}/publish-results`, {
      confirm: true
    })
    if (response.data.success) {
      if (response.data.job_batch_id) {
        toast.success('Results are being published. This may take a few minutes.')
        // TODO: Poll job status
      } else {
        toast.success('Results published successfully. Parents will be notified.')
      }
      loadExams()
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to publish results')
  } finally {
    publishing.value[exam.id] = false
  }
}

const viewResults = (exam) => {
  router.push(`/exams/view-marksheet?exam=${exam.id}`)
}

onMounted(() => {
  loadExams()
})
</script>
