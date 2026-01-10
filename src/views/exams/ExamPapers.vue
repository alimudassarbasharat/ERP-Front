<template>
  <div class="relative w-full min-h-screen pl-0 pr-0 sm:pl-0 sm:pr-0 lg:pl-1 lg:pr-0 py-2 sm:py-3 lg:py-4">
    <!-- Top Bar Header -->
    <div class="relative z-10 w-full mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
      <h2 class="text-base font-medium text-gray-900 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        Exam Papers Management
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-600">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200" @click="$router.push('/exams/center')">Exam Management</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">Papers</span>
      </nav>
    </div>

    <div class="relative z-10 w-full">
      <!-- Action Bar -->
      <div class="mb-4 flex items-center justify-between flex-wrap gap-3">
        <button 
          @click="showCreateModal = true"
          class="h-10 px-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2"
        >
          <Plus class="w-4 h-4" />
          Create Paper
        </button>
        <div class="flex items-center gap-3">
          <select
            v-model="filters.status"
            @change="loadPapers"
            class="h-10 px-4 border-0 bg-transparent text-sm font-light text-gray-600 focus:ring-0 focus:outline-none appearance-none pr-8 border-b-2 border-purple-200"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="submitted">Submitted</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="locked">Locked</option>
          </select>
          <select
            v-model="filters.exam_id"
            @change="loadPapers"
            class="h-10 px-4 border-0 bg-transparent text-sm font-light text-gray-600 focus:ring-0 focus:outline-none appearance-none pr-8 border-b-2 border-purple-200"
          >
            <option value="">All Exams</option>
            <option v-for="exam in exams" :key="exam.id" :value="exam.id">
              {{ exam.name || exam.term }}
            </option>
          </select>
        </div>
      </div>

      <!-- Papers List -->
      <div class="bg-white/90 rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <el-table
          :data="papers"
          stripe
          v-loading="loading"
          style="width: 100%"
        >
          <el-table-column prop="title" label="Paper Title" min-width="200" />
          <el-table-column label="Exam" min-width="150">
            <template #default="{ row }">
              {{ row.exam?.name || row.exam?.term || 'N/A' }}
            </template>
          </el-table-column>
          <el-table-column label="Class" min-width="120">
            <template #default="{ row }">
              {{ row.class?.name || 'N/A' }}
            </template>
          </el-table-column>
          <el-table-column label="Subject" min-width="120">
            <template #default="{ row }">
              {{ row.subject?.name || 'N/A' }}
            </template>
          </el-table-column>
          <el-table-column prop="total_marks" label="Total Marks" width="120" />
          <el-table-column label="Status" width="130">
            <template #default="{ row }">
              <StatusChip
                :label="row.status"
                :status="getStatusType(row.status)"
              />
            </template>
          </el-table-column>
          <el-table-column label="Version" width="100">
            <template #default="{ row }">
              v{{ row.paper_version }}
            </template>
          </el-table-column>
          <el-table-column label="Actions" width="200" fixed="right">
            <template #default="{ row }">
              <div class="flex items-center gap-2">
                <button 
                  @click="viewPaper(row)"
                  class="text-purple-600 hover:text-purple-800 text-sm font-medium"
                >
                  View
                </button>
                <button
                  v-if="row.status === 'draft'"
                  @click="submitPaper(row)"
                  class="text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  Submit
                </button>
                <button
                  v-if="row.status === 'submitted' && canApprove"
                  @click="showApproveModal(row)"
                  class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Approve
                </button>
                <button
                  v-if="row.status === 'submitted' && canApprove"
                  @click="showRejectModal(row)"
                  class="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Reject
                </button>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div v-if="!loading && papers.length === 0" class="p-12 text-center">
          <EmptyState
            title="No papers found"
            description="Create your first exam paper to get started"
            :icon="Document"
            icon-color="blue"
            action-label="Create Paper"
            @action="showCreateModal = true"
          />
        </div>
      </div>

      <!-- Create Paper Modal -->
      <div v-if="showCreateModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click="showCreateModal = false">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 max-h-[90vh] overflow-y-auto" @click.stop>
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Create Exam Paper</h3>
          </div>
          
          <form @submit.prevent="createPaper" class="p-6 space-y-4">
            <div class="flex flex-col w-full">
              <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Exam <span class="text-red-500">*</span></label>
              <div class="relative">
                <select 
                  v-model="newPaper.exam_id" 
                  required
                  class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8"
                >
                  <option value="">Select Exam</option>
                  <option v-for="exam in exams" :key="exam.id" :value="exam.id">
                    {{ exam.name || exam.term }}
                  </option>
                </select>
                <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                  </svg>
                </div>
                <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
              </div>
            </div>

            <div class="flex flex-col w-full">
              <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Class <span class="text-red-500">*</span></label>
              <div class="relative">
                <select 
                  v-model="newPaper.class_id" 
                  required
                  class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8"
                >
                  <option value="">Select Class</option>
                  <option v-for="cls in classes" :key="cls.id" :value="cls.id">
                    {{ cls.name }}
                  </option>
                </select>
                <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                  </svg>
                </div>
                <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
              </div>
            </div>

            <div class="flex flex-col w-full">
              <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject <span class="text-red-500">*</span></label>
              <div class="relative">
                <select 
                  v-model="newPaper.subject_id" 
                  required
                  class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8"
                >
                  <option value="">Select Subject</option>
                  <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
                    {{ subject.name }}
                  </option>
                </select>
                <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                  </svg>
                </div>
                <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
              </div>
            </div>

            <div class="flex flex-col w-full">
              <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Title <span class="text-red-500">*</span></label>
              <div class="relative">
                <input 
                  v-model="newPaper.title"
                  type="text" 
                  placeholder="Paper title"
                  required
                  class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
                />
                <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col w-full">
                <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Marks</label>
                <div class="relative">
                  <input 
                    v-model.number="newPaper.total_marks"
                    type="number" 
                    min="0"
                    class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
                  />
                  <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                </div>
              </div>

              <div class="flex flex-col w-full">
                <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Duration (minutes)</label>
                <div class="relative">
                  <input 
                    v-model.number="newPaper.duration_minutes"
                    type="number" 
                    min="0"
                    class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
                  />
                  <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                </div>
              </div>
            </div>

            <div class="flex flex-col w-full">
              <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Instructions</label>
              <div class="relative">
                <textarea 
                  v-model="newPaper.instructions"
                  placeholder="Paper instructions"
                  rows="3"
                  class="border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full resize-none"
                ></textarea>
                <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
              </div>
            </div>

            <div class="flex gap-3 pt-4">
              <button 
                type="button"
                @click="showCreateModal = false"
                class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 text-sm font-bold text-white shadow hover:from-gray-600 hover:to-slate-600 transition-all duration-300"
              >
                Cancel
              </button>
              <button 
                type="submit"
                :disabled="creating"
                class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50"
              >
                {{ creating ? 'Creating...' : 'Create' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Approve Modal -->
      <div v-if="showApproveDialog" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click="showApproveDialog = false">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300" @click.stop>
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Approve Paper</h3>
          </div>
          <form @submit.prevent="approvePaper" class="p-6 space-y-4">
            <div class="flex flex-col w-full">
              <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Comment</label>
              <div class="relative">
                <textarea 
                  v-model="reviewData.comment"
                  placeholder="Optional approval comment"
                  rows="3"
                  class="border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full resize-none"
                ></textarea>
                <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
              </div>
            </div>
            <div class="flex gap-3 pt-4">
              <button 
                type="button"
                @click="showApproveDialog = false"
                class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 text-sm font-bold text-white shadow hover:from-gray-600 hover:to-slate-600 transition-all duration-300"
              >
                Cancel
              </button>
              <button 
                type="submit"
                :disabled="processing"
                class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-sm font-bold text-white shadow hover:from-green-600 hover:to-emerald-600 transition-all duration-300 disabled:opacity-50"
              >
                {{ processing ? 'Processing...' : 'Approve' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Reject Modal -->
      <div v-if="showRejectDialog" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click="showRejectDialog = false">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300" @click.stop>
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Reject Paper</h3>
          </div>
          <form @submit.prevent="rejectPaper" class="p-6 space-y-4">
            <div class="flex flex-col w-full">
              <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Reason <span class="text-red-500">*</span></label>
              <div class="relative">
                <textarea 
                  v-model="reviewData.comment"
                  placeholder="Please provide reason for rejection"
                  rows="3"
                  required
                  class="border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full resize-none"
                ></textarea>
                <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
              </div>
            </div>
            <div class="flex gap-3 pt-4">
              <button 
                type="button"
                @click="showRejectDialog = false"
                class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 text-sm font-bold text-white shadow hover:from-gray-600 hover:to-slate-600 transition-all duration-300"
              >
                Cancel
              </button>
              <button 
                type="submit"
                :disabled="processing"
                class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-sm font-bold text-white shadow hover:from-red-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50"
              >
                {{ processing ? 'Processing...' : 'Reject' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { Document, Plus } from '@element-plus/icons-vue'
import api from '@/utils/axios'
import StatusChip from '@/components/common/StatusChip.vue'
import EmptyState from '@/components/common/EmptyState.vue'

const router = useRouter()
const toast = useToast()

const loading = ref(false)
const creating = ref(false)
const processing = ref(false)
const papers = ref([])
const exams = ref([])
const classes = ref([])
const subjects = ref([])

const filters = ref({
  status: null,
  exam_id: null
})

const showCreateModal = ref(false)
const showApproveDialog = ref(false)
const showRejectDialog = ref(false)
const selectedPaper = ref(null)

const newPaper = ref({
  exam_id: null,
  class_id: null,
  subject_id: null,
  title: '',
  total_marks: 100,
  duration_minutes: 120,
  instructions: ''
})

const reviewData = ref({
  comment: ''
})

const userRole = computed(() => {
  try {
    const userData = JSON.parse(localStorage.getItem('user') || '{}')
    return userData.role || userData.user_type || userData.type || 'guest'
  } catch {
    return 'guest'
  }
})

const canApprove = computed(() => ['supervisor', 'admin', 'super-admin'].includes(userRole.value))

const getStatusType = (status) => {
  const map = {
    draft: 'info',
    submitted: 'warning',
    approved: 'success',
    rejected: 'danger',
    locked: 'default'
  }
  return map[status] || 'default'
}

const loadPapers = async () => {
  loading.value = true
  try {
    const params = {}
    if (filters.value.status) params.status = filters.value.status
    if (filters.value.exam_id) params.exam_id = filters.value.exam_id
    
    const response = await api.get('/exam-papers', { params })
    if (response.data.success) {
      papers.value = response.data.data.data || response.data.data || []
    }
  } catch (error) {
    toast.error('Failed to load papers')
    console.error(error)
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

const loadSubjects = async () => {
  try {
    const response = await api.get('/subjects')
    if (response.data.success || response.data.status) {
      subjects.value = response.data.result || response.data.data || []
    }
  } catch (error) {
    console.error('Failed to load subjects:', error)
  }
}

const createPaper = async () => {
  if (!newPaper.value.exam_id || !newPaper.value.class_id || !newPaper.value.subject_id || !newPaper.value.title) {
    toast.warning('Please fill all required fields')
    return
  }
  
  creating.value = true
  try {
    const response = await api.post('/exam-papers', newPaper.value)
    if (response.data.success) {
      toast.success('Paper created successfully')
      showCreateModal.value = false
      newPaper.value = {
        exam_id: null,
        class_id: null,
        subject_id: null,
        title: '',
        total_marks: 100,
        duration_minutes: 120,
        instructions: ''
      }
      loadPapers()
      router.push(`/exams/papers/${response.data.data.id}`)
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to create paper')
  } finally {
    creating.value = false
  }
}

const viewPaper = (paper) => {
  router.push(`/exams/papers/${paper.id}`)
}

const submitPaper = async (paper) => {
  processing.value = true
  try {
    const response = await api.post(`/exam-papers/${paper.id}/submit`)
    if (response.data.success) {
      toast.success('Paper submitted for review')
      loadPapers()
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to submit paper')
  } finally {
    processing.value = false
  }
}

const showApproveModal = (paper) => {
  selectedPaper.value = paper
  reviewData.value.comment = ''
  showApproveDialog.value = true
}

const approvePaper = async () => {
  processing.value = true
  try {
    const response = await api.post(`/exam-papers/${selectedPaper.value.id}/approve`, {
      comment: reviewData.value.comment
    })
    if (response.data.success) {
      toast.success('Paper approved successfully')
      showApproveDialog.value = false
      loadPapers()
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to approve paper')
  } finally {
    processing.value = false
  }
}

const showRejectModal = (paper) => {
  selectedPaper.value = paper
  reviewData.value.comment = ''
  showRejectDialog.value = true
}

const rejectPaper = async () => {
  if (!reviewData.value.comment) {
    toast.warning('Please provide a reason for rejection')
    return
  }
  
  processing.value = true
  try {
    const response = await api.post(`/exam-papers/${selectedPaper.value.id}/reject`, {
      comment: reviewData.value.comment
    })
    if (response.data.success) {
      toast.success('Paper rejected')
      showRejectDialog.value = false
      loadPapers()
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to reject paper')
  } finally {
    processing.value = false
  }
}

onMounted(() => {
  loadPapers()
  loadExams()
  loadClasses()
  loadSubjects()
})
</script>
