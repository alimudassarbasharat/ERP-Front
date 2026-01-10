<template>
  <PageShell 
    title="Marksheets"
    :breadcrumbs="[
      { label: 'Exam Management', route: '/exams/center' },
      { label: 'Marksheets' }
    ]"
  >
    <!-- Exam Selector -->
    <div class="w-full mb-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <SectionHeader title="Select Exam" :icon="Document" />
        <el-select
          v-model="selectedExamId"
          placeholder="Choose an exam..."
          clearable
          filterable
          size="large"
          class="w-full"
          @change="loadMarksheets"
        >
          <el-option
            v-for="exam in exams"
            :key="exam.id"
            :label="exam.name || exam.term"
            :value="exam.id"
          />
        </el-select>
      </div>
    </div>

    <!-- Marksheets List -->
    <div v-if="marksheets.length > 0" class="w-full mb-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-6">
          <SectionHeader title="Available Marksheets" :icon="Printer" />
          <ActionButton
            label="Download All"
            :icon="Download"
            variant="primary"
            :loading="downloading"
            @click="downloadAll"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="marksheet in marksheets"
            :key="marksheet.student_id"
            class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="font-semibold text-gray-900 dark:text-white">{{ marksheet.student_name }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Student ID: {{ marksheet.student_id }}</p>
              </div>
              <el-button text type="primary" @click="downloadMarksheet(marksheet)">
                <el-icon><Download /></el-icon>
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty States -->
    <div v-else-if="selectedExamId" class="w-full mb-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <EmptyState
          title="No marksheets available"
          description="No marksheets are available for this exam yet"
          :icon="Document"
          icon-color="gray"
        />
      </div>
    </div>

    <div v-else class="w-full mb-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <EmptyState
          title="Select an exam"
          description="Choose an exam from the dropdown above to view marksheets"
          :icon="Document"
          icon-color="blue"
        />
      </div>
    </div>
  </PageShell>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { Document, Download, Printer } from '@element-plus/icons-vue'
import api from '@/utils/axios'
import PageShell from '@/components/common/PageShell.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import ActionButton from '@/components/common/ActionButton.vue'
import EmptyState from '@/components/common/EmptyState.vue'

const toast = useToast()

const exams = ref([])
const selectedExamId = ref(null)
const marksheets = ref([])
const downloading = ref(false)

const loadExams = async () => {
  try {
    const response = await api.get('/exams')
    if (response.data.success || response.data.status) {
      exams.value = (response.data.result || response.data.data || []).filter(e => e.status === 'published')
    }
  } catch (error) {
    toast.error('Failed to load exams')
    console.error(error)
  }
}

const loadMarksheets = async () => {
  if (!selectedExamId.value) {
    marksheets.value = []
    return
  }

  try {
    const response = await api.get(`/exam-management/exams/${selectedExamId.value}/marksheets`)
    if (response.data.success) {
      marksheets.value = response.data.data || []
    }
  } catch (error) {
    toast.error('Failed to load marksheets')
    console.error(error)
  }
}

const downloadMarksheet = (marksheet) => {
  if (marksheet.pdf_path) {
    window.open(`/storage/${marksheet.pdf_path}`, '_blank')
  } else {
    toast.warning('Marksheet PDF is still being generated')
  }
}

const downloadAll = async () => {
  downloading.value = true
  try {
    for (const marksheet of marksheets.value) {
      if (marksheet.pdf_path) {
        window.open(`/storage/${marksheet.pdf_path}`, '_blank')
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }
    toast.success('All marksheets are opening')
  } catch (error) {
    toast.error('Failed to download marksheets')
  } finally {
    downloading.value = false
  }
}

onMounted(() => {
  loadExams()
})
</script>
