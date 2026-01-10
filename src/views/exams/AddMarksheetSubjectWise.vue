<template>
  <PageShell 
    title="Enter Exam Marks"
    :breadcrumbs="[
      { label: 'Exam Management', route: '/exams/center' },
      { label: 'Enter Marks' }
    ]"
  >
    <!-- Step-by-Step Flow -->
    <div class="w-full mb-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <SectionHeader title="Select Details" :icon="EditPen" />
        
        <!-- Step 1: Select Session -->
        <div class="mb-6">
          <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Step 1: Select Session
          </label>
          <el-select
            v-model="selectedSession"
            placeholder="Choose session (e.g., 2024-2025)"
            size="large"
            class="w-full"
            @change="onSessionChange"
          >
            <el-option
              v-for="session in sessions"
              :key="session.id"
              :label="session.name"
              :value="session.id"
            />
          </el-select>
        </div>

        <!-- Step 2: Select Exam -->
        <div class="mb-6" v-if="selectedSession">
          <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Step 2: Select Exam
          </label>
          <el-select
            v-model="selectedExam"
            placeholder="Choose exam (e.g., Mid Term, Final)"
            size="large"
            class="w-full"
            @change="onExamChange"
          >
            <el-option
              v-for="exam in exams"
              :key="exam.id"
              :label="exam.name || exam.term"
              :value="exam.id"
            />
          </el-select>
        </div>

        <!-- Step 3: Select Class -->
        <div class="mb-6" v-if="selectedExam">
          <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Step 3: Select Class
          </label>
          <el-select
            v-model="selectedClass"
            placeholder="Choose class"
            size="large"
            class="w-full"
            @change="onClassChange"
          >
            <el-option
              v-for="cls in classes"
              :key="cls.id"
              :label="cls.name"
              :value="cls.id"
            />
          </el-select>
        </div>

        <!-- Step 4: Select Section (Optional) -->
        <div class="mb-6" v-if="selectedClass">
          <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Step 4: Select Section (Optional)
          </label>
          <el-select
            v-model="selectedSection"
            placeholder="Choose section (or leave blank for all sections)"
            size="large"
            class="w-full"
            clearable
            @change="onSectionChange"
          >
            <el-option
              v-for="section in sections"
              :key="section.id"
              :label="section.name"
              :value="section.id"
            />
          </el-select>
        </div>

        <!-- Load Students Button -->
        <div v-if="selectedClass">
          <ActionButton
            label="Load Students"
            :icon="User"
            variant="primary"
            :loading="loadingStudents"
            @click="loadStudents"
          />
        </div>
      </div>
    </div>

    <!-- Marks Entry Table -->
    <div v-if="studentRows.length > 0" class="w-full mb-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div class="mb-6">
          <SectionHeader 
            :title="`Enter Marks for ${studentRows.length} Student${studentRows.length > 1 ? 's' : ''}`" 
            :icon="EditPen" 
          />
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Enter total marks and obtained marks for each subject
          </p>
        </div>

        <div class="overflow-x-auto">
          <el-table
            :data="studentRows"
            class="marks-table"
            style="width: 100%"
            :border="true"
            v-loading="loading"
            stripe
          >
            <el-table-column label="Student" min-width="180" fixed>
              <template #default="{ row }">
                <div class="student-cell">
                  <div class="font-semibold text-gray-900 dark:text-white">{{ row.student_name }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">ID: {{ row.student_id }}</div>
                </div>
              </template>
            </el-table-column>
            
            <template v-for="(subject, index) in subjects" :key="`subject-${subject.id}-${index}`">
              <el-table-column
                :label="subject.name + ' Total'"
                min-width="120"
              >
                <template #default="{ row }">
                  <el-input
                    v-if="row.subject_marks && row.subject_marks[subject.id]"
                    v-model="row.subject_marks[subject.id].total"
                    type="number"
                    min="0"
                    placeholder="Total"
                    size="small"
                  />
                </template>
              </el-table-column>
              <el-table-column
                :label="subject.name + ' Obtained'"
                min-width="120"
              >
                <template #default="{ row }">
                  <el-input
                    v-if="row.subject_marks && row.subject_marks[subject.id]"
                    v-model="row.subject_marks[subject.id].obtained"
                    type="number"
                    min="0"
                    :max="row.subject_marks[subject.id].total || null"
                    placeholder="Obtained"
                    size="small"
                  />
                </template>
              </el-table-column>
            </template>
          </el-table>
        </div>

        <div class="mt-6 flex justify-end">
          <ActionButton
            label="Save All Marks"
            :icon="CircleCheck"
            variant="success"
            :loading="saving"
            @click="saveAllMarks"
          />
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="selectedClass && !loadingStudents" class="w-full mb-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <EmptyState
          title="Ready to Enter Marks"
          description="Click 'Load Students' above to start entering marks"
          :icon="User"
          icon-color="blue"
        />
      </div>
    </div>
  </PageShell>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { User, CircleCheck, EditPen } from '@element-plus/icons-vue'
import api from '@/utils/axios'
import PageShell from '@/components/common/PageShell.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import ActionButton from '@/components/common/ActionButton.vue'
import EmptyState from '@/components/common/EmptyState.vue'

const toast = useToast()

const loading = ref(false)
const loadingStudents = ref(false)
const saving = ref(false)
const selectedSession = ref(null)
const selectedExam = ref(null)
const selectedClass = ref(null)
const selectedSection = ref(null)

const sessions = ref([])
const exams = ref([])
const classes = ref([])
const sections = ref([])
const subjects = ref([])
const students = ref([])
const studentRows = ref([])

const onSessionChange = async () => {
  selectedExam.value = null
  selectedClass.value = null
  selectedSection.value = null
  studentRows.value = []
  if (selectedSession.value) {
    await loadExams()
  }
}

const onExamChange = async () => {
  selectedClass.value = null
  selectedSection.value = null
  studentRows.value = []
}

const onClassChange = async () => {
  selectedSection.value = null
  studentRows.value = []
  if (selectedClass.value) {
    await loadSections()
    await loadSubjects()
  }
}

const onSectionChange = () => {
  studentRows.value = []
}

const loadSessions = async () => {
  try {
    const response = await api.get('/sessions')
    if (response.data.success || response.data.status) {
      sessions.value = response.data.result || response.data.data || []
      const currentSession = sessions.value.find(s => s.is_current) || sessions.value[0]
      if (currentSession) {
        selectedSession.value = currentSession.id
        await onSessionChange()
      }
    }
  } catch (error) {
    console.error('Failed to load sessions:', error)
  }
}

const loadExams = async () => {
  try {
    const response = await api.get('/exams', {
      params: { session_id: selectedSession.value }
    })
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

const loadSections = async () => {
  try {
    const response = await api.get('/sections', {
      params: { class_id: selectedClass.value }
    })
    if (response.data.success || response.data.status) {
      sections.value = response.data.result || response.data.data || []
    }
  } catch (error) {
    console.error('Failed to load sections:', error)
  }
}

const loadSubjects = async () => {
  try {
    const response = await api.get('/subjects', {
      params: { class_id: selectedClass.value }
    })
    if (response.data.success || response.data.status) {
      subjects.value = response.data.result || response.data.data || []
    }
  } catch (error) {
    console.error('Failed to load subjects:', error)
  }
}

const loadStudents = async () => {
  loadingStudents.value = true
  try {
    const params = {
      class_id: selectedClass.value
    }
    if (selectedSection.value) {
      params.section_id = selectedSection.value
    }
    
    const response = await api.get('/students', { params })
    if (response.data.success || response.data.status) {
      const studentsData = response.data.result?.data || response.data.data || []
      students.value = studentsData.map(s => ({
        student_id: s.id,
        student_name: [s.first_name, s.middle_name, s.last_name].filter(Boolean).join(' ')
      }))
      
      studentRows.value = students.value.map(stu => ({
        ...stu,
        subject_marks: Object.fromEntries(
          subjects.value.map(sub => [
            sub.id,
            { total: sub.total_marks || '', obtained: '' }
          ])
        )
      }))
    }
  } catch (error) {
    toast.error('Failed to load students')
    console.error(error)
  } finally {
    loadingStudents.value = false
  }
}

const saveAllMarks = async () => {
  saving.value = true
  try {
    const payload = []
    studentRows.value.forEach(row => {
      Object.entries(row.subject_marks).forEach(([subjectId, marksObj]) => {
        if (marksObj.obtained !== '' && marksObj.total !== '') {
          payload.push({
            student_id: row.student_id,
            subject_id: subjectId,
            exam_id: selectedExam.value,
            total_marks: marksObj.total,
            obtain_marks: marksObj.obtained
          })
        }
      })
    })
    
    if (payload.length === 0) {
      toast.warning('Please enter at least one mark before saving')
      return
    }
    
    await api.post('/result-sheet/store-subjectwise', { marks: payload })
    toast.success(`Successfully saved marks for ${payload.length} entry${payload.length > 1 ? 'ies' : 'y'}!`)
  } catch (error) {
    toast.error('Failed to save marks')
    console.error(error)
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  await loadSessions()
  await loadClasses()
})
</script>

<style scoped>
.student-cell {
  padding: 4px 0;
}

.marks-table :deep(.el-table__cell) {
  padding: 8px;
}
</style>
