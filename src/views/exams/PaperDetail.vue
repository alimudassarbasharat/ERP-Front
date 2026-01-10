<template>
  <PageShell 
    title="Paper Details"
    :breadcrumbs="[
      { label: 'Exam Management', route: '/exams/center' },
      { label: 'Papers', route: '/exams/papers' },
      { label: 'Paper Detail' }
    ]"
  >
    <div v-if="loading" class="flex justify-center py-12">
      <el-icon class="is-loading text-4xl"><Loading /></el-icon>
    </div>

    <div v-else-if="paper" class="space-y-4">
      <!-- Paper Info -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ paper.title }}</h2>
            <p class="text-gray-600 dark:text-gray-400 mt-1">
              {{ paper.exam?.name || paper.exam?.term }} - {{ paper.class?.name }} - {{ paper.subject?.name }}
            </p>
          </div>
          <StatusChip :label="paper.status" :status="getStatusType(paper.status)" />
        </div>

        <div class="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Total Marks</p>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ paper.total_marks }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Duration</p>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ paper.duration_minutes }} minutes</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Version</p>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">v{{ paper.paper_version }}</p>
          </div>
        </div>

        <div v-if="paper.instructions" class="mb-4">
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Instructions</p>
          <p class="text-gray-700 dark:text-gray-300">{{ paper.instructions }}</p>
        </div>

        <ActionBar v-if="paper.status === 'draft'">
          <ActionButton
            label="Add Question"
            :icon="Plus"
            variant="primary"
            @click="showAddQuestionModal = true"
          />
          <ActionButton
            label="Submit for Review"
            :icon="CircleCheck"
            variant="success"
            @click="submitPaper"
          />
        </ActionBar>
      </div>

      <!-- Questions List -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <SectionHeader title="Questions" :icon="Document" />
        
        <div v-if="paper.questions && paper.questions.length > 0" class="space-y-4">
          <div
            v-for="(question, index) in sortedQuestions"
            :key="question.id"
            class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
          >
            <div class="flex items-start justify-between mb-2">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-sm font-semibold text-gray-500">Q{{ index + 1 }}</span>
                  <StatusChip :label="question.section_name" status="info" />
                  <StatusChip :label="question.question_type.toUpperCase()" status="default" />
                  <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ question.marks }} marks</span>
                </div>
                <p class="text-gray-900 dark:text-white mb-2">{{ question.question_text }}</p>
                <div v-if="question.options_json" class="text-sm text-gray-600 dark:text-gray-400">
                  <p class="font-semibold mb-1">Options:</p>
                  <ul class="list-disc list-inside">
                    <li v-for="(option, idx) in JSON.parse(question.options_json)" :key="idx">
                      {{ option }}
                    </li>
                  </ul>
                </div>
                <div v-if="question.answer_key" class="mt-2">
                  <p class="text-sm font-semibold text-green-600 dark:text-green-400">
                    Answer: {{ question.answer_key }}
                  </p>
                </div>
              </div>
              <div v-if="paper.status === 'draft'" class="flex gap-2">
                <el-button text type="primary" size="small" @click="editQuestion(question)">
                  Edit
                </el-button>
                <el-button text type="danger" size="small" @click="deleteQuestion(question)">
                  Delete
                </el-button>
              </div>
            </div>
          </div>
        </div>
        <EmptyState
          v-else
          title="No questions yet"
          description="Add questions to build this paper"
          :icon="Document"
          icon-color="gray"
          action-label="Add Question"
          @action="showAddQuestionModal = true"
        />
      </div>
    </div>

    <!-- Add Question Modal -->
    <el-dialog
      v-model="showAddQuestionModal"
      :title="editingQuestion ? 'Edit Question' : 'Add Question'"
      width="700px"
    >
      <el-form :model="questionForm" label-width="120px">
        <el-form-item label="Section" required>
          <el-input v-model="questionForm.section_name" placeholder="e.g., Section A, MCQ, etc." />
        </el-form-item>
        <el-form-item label="Type" required>
          <el-select v-model="questionForm.question_type" class="w-full">
            <el-option label="MCQ" value="mcq" />
            <el-option label="Short Answer" value="short" />
            <el-option label="Long Answer" value="long" />
          </el-select>
        </el-form-item>
        <el-form-item label="Question Text" required>
          <el-input
            v-model="questionForm.question_text"
            type="textarea"
            :rows="3"
            placeholder="Enter question text"
          />
        </el-form-item>
        <el-form-item label="Marks" required>
          <el-input-number v-model="questionForm.marks" :min="1" class="w-full" />
        </el-form-item>
        <el-form-item v-if="questionForm.question_type === 'mcq'" label="Options (JSON)">
          <el-input
            v-model="questionForm.options_json"
            type="textarea"
            :rows="4"
            placeholder='["Option A", "Option B", "Option C", "Option D"]'
          />
        </el-form-item>
        <el-form-item label="Answer Key">
          <el-input v-model="questionForm.answer_key" placeholder="Correct answer" />
        </el-form-item>
        <el-form-item label="Order">
          <el-input-number v-model="questionForm.order_no" :min="0" class="w-full" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancelQuestion">Cancel</el-button>
        <el-button type="primary" @click="saveQuestion" :loading="savingQuestion">Save</el-button>
      </template>
    </el-dialog>
  </PageShell>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { Document, Plus, CircleCheck, Loading } from '@element-plus/icons-vue'
import api from '@/utils/axios'
import PageShell from '@/components/common/PageShell.vue'
import ActionBar from '@/components/common/ActionBar.vue'
import ActionButton from '@/components/common/ActionButton.vue'
import StatusChip from '@/components/common/StatusChip.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import EmptyState from '@/components/common/EmptyState.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const loading = ref(false)
const savingQuestion = ref(false)
const paper = ref(null)
const showAddQuestionModal = ref(false)
const editingQuestion = ref(null)

const questionForm = ref({
  section_name: '',
  question_text: '',
  question_type: 'short',
  marks: 1,
  options_json: '',
  answer_key: '',
  order_no: 0
})

const sortedQuestions = computed(() => {
  if (!paper.value?.questions) return []
  return [...paper.value.questions].sort((a, b) => (a.order_no || 0) - (b.order_no || 0))
})

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

const loadPaper = async () => {
  loading.value = true
  try {
    const response = await api.get(`/exam-papers/${route.params.id}`)
    if (response.data.success) {
      paper.value = response.data.data
    }
  } catch (error) {
    toast.error('Failed to load paper')
    router.push('/exams/papers')
  } finally {
    loading.value = false
  }
}

const submitPaper = async () => {
  try {
    const response = await api.post(`/exam-papers/${paper.value.id}/submit`)
    if (response.data.success) {
      toast.success('Paper submitted for review')
      loadPaper()
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to submit paper')
  }
}

const saveQuestion = async () => {
  if (!questionForm.value.section_name || !questionForm.value.question_text || !questionForm.value.marks) {
    toast.warning('Please fill all required fields')
    return
  }

  savingQuestion.value = true
  try {
    const payload = { ...questionForm.value }
    if (payload.options_json) {
      try {
        JSON.parse(payload.options_json)
      } catch {
        toast.error('Invalid JSON format for options')
        savingQuestion.value = false
        return
      }
    }

    if (editingQuestion.value) {
      await api.put(`/exam-papers/${paper.value.id}/questions/${editingQuestion.value.id}`, payload)
      toast.success('Question updated')
    } else {
      await api.post(`/exam-papers/${paper.value.id}/questions`, payload)
      toast.success('Question added')
    }
    
    showAddQuestionModal.value = false
    cancelQuestion()
    loadPaper()
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to save question')
  } finally {
    savingQuestion.value = false
  }
}

const editQuestion = (question) => {
  editingQuestion.value = question
  questionForm.value = {
    section_name: question.section_name,
    question_text: question.question_text,
    question_type: question.question_type,
    marks: question.marks,
    options_json: question.options_json ? JSON.stringify(JSON.parse(question.options_json), null, 2) : '',
    answer_key: question.answer_key || '',
    order_no: question.order_no || 0
  }
  showAddQuestionModal.value = true
}

const deleteQuestion = async (question) => {
  try {
    await api.delete(`/exam-papers/${paper.value.id}/questions/${question.id}`)
    toast.success('Question deleted')
    loadPaper()
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to delete question')
  }
}

const cancelQuestion = () => {
  editingQuestion.value = null
  questionForm.value = {
    section_name: '',
    question_text: '',
    question_type: 'short',
    marks: 1,
    options_json: '',
    answer_key: '',
    order_no: 0
  }
}

onMounted(() => {
  loadPaper()
})
</script>
