<template>
  <PageShell 
    title="Check Marks"
    :breadcrumbs="[
      { label: 'Exam Management', route: '/exams/center' },
      { label: 'Marks Verification' }
    ]"
  >
    <!-- Filters -->
    <ActionBar>
      <el-select
        v-model="filters.exam_id"
        placeholder="Filter by Exam"
        clearable
        filterable
        class="w-[200px]"
        @change="loadMarks"
      >
        <el-option
          v-for="exam in exams"
          :key="exam.id"
          :label="exam.name || exam.term"
          :value="exam.id"
        />
      </el-select>
      <el-select
        v-model="filters.class_id"
        placeholder="Filter by Class"
        clearable
        filterable
        class="w-[200px]"
        @change="loadMarks"
      >
        <el-option
          v-for="cls in classes"
          :key="cls.id"
          :label="cls.name"
          :value="cls.id"
        />
      </el-select>
    </ActionBar>

    <!-- Submitted Marks Queue -->
    <div class="w-full mb-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <SectionHeader title="Marks Pending Verification" :icon="CircleCheck" />
        
        <div v-if="loading" class="flex justify-center py-12">
          <el-icon class="is-loading text-4xl"><Loading /></el-icon>
        </div>

        <div v-else-if="marks.length > 0" class="space-y-4">
          <div
            v-for="mark in marks"
            :key="mark.id"
            class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <p class="font-semibold text-gray-900 dark:text-white">
                    {{ mark.student_name || `Student ID: ${mark.student_id}` }}
                  </p>
                  <StatusChip label="Submitted" status="warning" />
                </div>
                <div class="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p class="text-gray-500 dark:text-gray-400">Exam</p>
                    <p class="font-semibold text-gray-900 dark:text-white">{{ mark.exam_name }}</p>
                  </div>
                  <div>
                    <p class="text-gray-500 dark:text-gray-400">Class</p>
                    <p class="font-semibold text-gray-900 dark:text-white">{{ mark.class_name }}</p>
                  </div>
                  <div>
                    <p class="text-gray-500 dark:text-gray-400">Subject</p>
                    <p class="font-semibold text-gray-900 dark:text-white">{{ mark.subject_name }}</p>
                  </div>
                  <div>
                    <p class="text-gray-500 dark:text-gray-400">Marks</p>
                    <p class="font-semibold text-gray-900 dark:text-white">
                      {{ mark.obtained_marks }} / {{ mark.total_marks }}
                    </p>
                  </div>
                </div>
                <div v-if="mark.submitted_at" class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Submitted: {{ formatDate(mark.submitted_at) }}
                </div>
              </div>
              <div class="flex gap-2">
                <ActionButton
                  label="Verify"
                  :icon="CircleCheck"
                  variant="success"
                  @click="showVerifyModal(mark)"
                />
                <el-button text type="danger" size="small" @click="showRejectModal(mark)">
                  Reject
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <EmptyState
            title="No marks pending verification"
            description="All submitted marks have been verified"
            :icon="CircleCheck"
            icon-color="green"
          />
        </div>
      </div>
    </div>

    <!-- Verify Modal -->
    <el-dialog
      v-model="showVerifyDialog"
      title="Verify Marks"
      width="500px"
    >
      <div v-if="selectedMark" class="space-y-4">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Student</p>
          <p class="font-semibold">{{ selectedMark.student_name }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Marks</p>
          <p class="font-semibold">{{ selectedMark.obtained_marks }} / {{ selectedMark.total_marks }}</p>
        </div>
        <el-form-item label="Comment">
          <el-input
            v-model="verifyComment"
            type="textarea"
            :rows="3"
            placeholder="Optional verification comment"
          />
        </el-form-item>
      </div>
      <template #footer>
        <el-button @click="showVerifyDialog = false">Cancel</el-button>
        <el-button type="success" @click="verifyMark" :loading="processing">Verify</el-button>
      </template>
    </el-dialog>

    <!-- Reject Modal -->
    <el-dialog
      v-model="showRejectDialog"
      title="Reject Marks"
      width="500px"
    >
      <div v-if="selectedMark" class="space-y-4">
        <el-form-item label="Reason" required>
          <el-input
            v-model="rejectComment"
            type="textarea"
            :rows="3"
            placeholder="Please provide reason for rejection"
          />
        </el-form-item>
      </div>
      <template #footer>
        <el-button @click="showRejectDialog = false">Cancel</el-button>
        <el-button type="danger" @click="rejectMark" :loading="processing">Reject</el-button>
      </template>
    </el-dialog>
  </PageShell>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { CircleCheck, Loading } from '@element-plus/icons-vue'
import api from '@/utils/axios'
import PageShell from '@/components/common/PageShell.vue'
import ActionBar from '@/components/common/ActionBar.vue'
import ActionButton from '@/components/common/ActionButton.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import StatusChip from '@/components/common/StatusChip.vue'
import EmptyState from '@/components/common/EmptyState.vue'

const toast = useToast()

const loading = ref(false)
const processing = ref(false)
const marks = ref([])
const exams = ref([])
const classes = ref([])

const filters = ref({
  exam_id: null,
  class_id: null
})

const showVerifyDialog = ref(false)
const showRejectDialog = ref(false)
const selectedMark = ref(null)
const verifyComment = ref('')
const rejectComment = ref('')

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const loadMarks = async () => {
  loading.value = true
  try {
    const params = { status: 'submitted' }
    if (filters.value.exam_id) params.exam_id = filters.value.exam_id
    if (filters.value.class_id) params.class_id = filters.value.class_id

    // Use exam-marks endpoint or create a dedicated verification endpoint
    const response = await api.get('/exam-marks', { params })
    if (response.data.success) {
      marks.value = response.data.data.data || response.data.data || []
    }
  } catch (error) {
    // If endpoint doesn't exist, create a mock response structure
    toast.warning('Verification endpoint not yet implemented. Using mock data.')
    marks.value = []
  } finally {
    loading.value = false
  }
}

const loadExams = async () => {
  try {
    const response = await api.get('/exams')
    if (response.data.success || response.data.status) {
      exams.value = response.data.result || response.data.data || []
    }
  } catch (error) {
    console.error('Failed to load exams:', error)
  }
}

const loadClasses = async () => {
  try {
    const response = await api.get('/classes')
    if (response.data.success || response.data.status) {
      classes.value = response.data.result || response.data.data || []
    }
  } catch (error) {
    console.error('Failed to load classes:', error)
  }
}

const showVerifyModal = (mark) => {
  selectedMark.value = mark
  verifyComment.value = ''
  showVerifyDialog.value = true
}

const verifyMark = async () => {
  processing.value = true
  try {
    const response = await api.post('/exam-marks/verify', {
      exam_id: selectedMark.value.exam_id,
      class_ids: [selectedMark.value.class_id],
      subject_ids: [selectedMark.value.subject_id],
      verified_by: null, // Will be set by backend from auth
      comment: verifyComment.value
    })

    if (response.data.success) {
      toast.success('Marks verified successfully')
      showVerifyDialog.value = false
      loadMarks()
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to verify marks')
  } finally {
    processing.value = false
  }
}

const showRejectModal = (mark) => {
  selectedMark.value = mark
  rejectComment.value = ''
  showRejectDialog.value = true
}

const rejectMark = async () => {
  if (!rejectComment.value) {
    toast.warning('Please provide a reason for rejection')
    return
  }

  processing.value = true
  try {
    // Rejection would change status back to draft or submitted
    toast.info('Rejection functionality to be implemented')
    showRejectDialog.value = false
  } catch (error) {
    toast.error('Failed to reject marks')
  } finally {
    processing.value = false
  }
}

onMounted(() => {
  loadMarks()
  loadExams()
  loadClasses()
})
</script>
