<template>
  <div class="relative w-full min-h-screen pl-0 pr-0 sm:pl-0 sm:pr-0 lg:pl-1 lg:pr-0 py-2 sm:py-3 lg:py-4">
    <!-- Top Bar Header -->
    <div class="relative z-10 w-full mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
      <h2 class="text-base font-medium text-gray-900 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        Enter Exam Marks
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-600">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200" @click="$router.push('/exams/center')">Exam Management</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">Enter Marks</span>
      </nav>
    </div>

    <div class="relative z-10 w-full">
      <!-- Selection Steps -->
      <div class="w-full mb-4">
        <div class="bg-white/90 rounded-xl p-6 shadow-lg border border-gray-200">
        <SectionHeader title="Select Details" :icon="EditPen" />
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2">Exam</label>
            <el-select
              v-model="selectedExam"
              placeholder="Select exam"
              filterable
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

          <div>
            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Classes (Multi-select)</label>
            <el-select
              v-model="selectedClasses"
              placeholder="Select classes"
              multiple
              filterable
              size="large"
              class="w-full"
              @change="onClassesChange"
            >
              <el-option
                v-for="cls in classes"
                :key="cls.id"
                :label="cls.name"
                :value="cls.id"
              />
            </el-select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Subjects (Multi-select)</label>
            <el-select
              v-model="selectedSubjects"
              placeholder="Select subjects"
              multiple
              filterable
              size="large"
              class="w-full"
              @change="onSubjectsChange"
            >
              <el-option
                v-for="subject in availableSubjects"
                :key="subject.id"
                :label="subject.name"
                :value="subject.id"
              />
            </el-select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Sections (Optional)</label>
            <el-select
              v-model="selectedSections"
              placeholder="Select sections (leave blank for all)"
              multiple
              filterable
              size="large"
              class="w-full"
              clearable
            >
              <el-option
                v-for="section in sections"
                :key="section.id"
                :label="section.name"
                :value="section.id"
              />
            </el-select>
          </div>
        </div>

          <button
            v-if="selectedExam && selectedClasses.length > 0 && selectedSubjects.length > 0"
            @click="loadStudents"
            :disabled="loadingStudents"
            class="h-10 px-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
          >
            <User class="w-4 h-4" />
            {{ loadingStudents ? 'Loading...' : 'Load Students' }}
          </button>
      </div>
    </div>

      <!-- Marks Entry Table -->
      <div v-if="students.length > 0" class="w-full mb-4">
        <div class="bg-white/90 rounded-xl p-6 shadow-lg border border-gray-200">
        <div class="mb-6">
          <SectionHeader 
            :title="`Enter Marks for ${students.length} Student${students.length > 1 ? 's' : ''}`" 
            :icon="EditPen" 
          />
          <p class="text-sm text-gray-600 mt-2">
            Enter marks for each student and subject
          </p>
        </div>

        <div class="overflow-x-auto">
          <el-table
            :data="students"
            stripe
            border
            v-loading="loading"
            style="width: 100%"
          >
            <el-table-column label="Student" min-width="200" fixed>
              <template #default="{ row }">
                <div>
                  <p class="font-semibold text-gray-900">{{ row.student_name }}</p>
                  <p class="text-xs text-gray-500">{{ row.class_name }} - {{ row.section_name || 'All' }}</p>
                </div>
              </template>
            </el-table-column>

            <template v-for="subject in selectedSubjectsData" :key="subject.id">
              <el-table-column :label="`${subject.name} (Total)`" min-width="120">
                <template #default="{ row }">
                  <el-input-number
                    v-model="row.marks[subject.id].total_marks"
                    :min="0"
                    size="small"
                    class="w-full"
                    placeholder="Total"
                  />
                </template>
              </el-table-column>
              <el-table-column :label="`${subject.name} (Obtained)`" min-width="120">
                <template #default="{ row }">
                  <el-input-number
                    v-model="row.marks[subject.id].obtained_marks"
                    :min="0"
                    :max="row.marks[subject.id].total_marks || null"
                    size="small"
                    class="w-full"
                    placeholder="Obtained"
                  />
                </template>
              </el-table-column>
            </template>

            <el-table-column label="Absent" width="100">
              <template #default="{ row }">
                <el-checkbox v-model="row.is_absent" />
              </template>
            </el-table-column>
          </el-table>
        </div>

          <div class="mt-6 flex justify-end gap-3">
            <button
              @click="saveDraft"
              :disabled="saving"
              class="h-10 px-6 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 text-sm font-bold text-white shadow hover:from-gray-600 hover:to-slate-600 transition-all duration-300 disabled:opacity-50"
            >
              {{ saving ? 'Saving...' : 'Save Draft' }}
            </button>
            <button
              @click="submitMarks"
              :disabled="submitting"
              class="h-10 px-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-sm font-bold text-white shadow hover:from-green-600 hover:to-emerald-600 transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
            >
              <CircleCheck class="w-4 h-4" />
              {{ submitting ? 'Submitting...' : 'Submit for Verification' }}
            </button>
          </div>
      </div>
    </div>

      <!-- Empty State -->
      <div v-else-if="selectedExam && selectedClasses.length > 0 && selectedSubjects.length > 0 && !loadingStudents" class="w-full mb-4">
        <div class="bg-white/90 rounded-xl p-6 shadow-lg border border-gray-200">
        <EmptyState
          title="No students found"
          description="Click 'Load Students' to load students for marks entry"
          :icon="User"
          icon-color="blue"
        />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { EditPen, User, CircleCheck } from '@element-plus/icons-vue'
import api from '@/utils/axios'
import SectionHeader from '@/components/common/SectionHeader.vue'
import EmptyState from '@/components/common/EmptyState.vue'

const toast = useToast()

const loading = ref(false)
const loadingStudents = ref(false)
const saving = ref(false)
const submitting = ref(false)

const selectedExam = ref(null)
const selectedClasses = ref([])
const selectedSubjects = ref([])
const selectedSections = ref([])

const exams = ref([])
const classes = ref([])
const sections = ref([])
const availableSubjects = ref([])
const selectedSubjectsData = ref([])
const students = ref([])

const onExamChange = () => {
  selectedClasses.value = []
  selectedSubjects.value = []
  selectedSections.value = []
  students.value = []
  availableSubjects.value = []
}

const onClassesChange = async () => {
  selectedSubjects.value = []
  students.value = []
  if (selectedClasses.value.length > 0) {
    await loadSubjects()
  }
}

const onSubjectsChange = () => {
  selectedSubjectsData.value = availableSubjects.value.filter(s => selectedSubjects.value.includes(s.id))
  // Update marks structure for existing students
  students.value.forEach(student => {
    selectedSubjectsData.value.forEach(subject => {
      if (!student.marks[subject.id]) {
        student.marks[subject.id] = {
          total_marks: null,
          obtained_marks: null
        }
      }
    })
  })
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

const loadSections = async () => {
  try {
    if (selectedClasses.value.length === 1) {
      const response = await api.get('/sections', {
        params: { class_id: selectedClasses.value[0] }
      })
      if (response.data.success || response.data.status) {
        sections.value = response.data.result || response.data.data || []
      }
    } else {
      sections.value = []
    }
  } catch (error) {
    console.error('Failed to load sections:', error)
  }
}

const loadSubjects = async () => {
  try {
    const response = await api.post('/exam-marks/fetch-subjects', {
      exam_id: selectedExam.value,
      class_ids: selectedClasses.value
    })
    if (response.data.success) {
      availableSubjects.value = response.data.data || []
    }
  } catch (error) {
    toast.error('Failed to load subjects')
    console.error(error)
  }
}

const loadStudents = async () => {
  if (!selectedExam.value || selectedClasses.value.length === 0 || selectedSubjects.value.length === 0) {
    toast.warning('Please select exam, classes, and subjects')
    return
  }

  loadingStudents.value = true
  try {
    const response = await api.post('/exam-marks/fetch-students', {
      exam_id: selectedExam.value,
      class_ids: selectedClasses.value,
      section_ids: selectedSections.value.length > 0 ? selectedSections.value : null,
      subject_ids: selectedSubjects.value
    })
    
    if (response.data.success) {
      const studentsData = response.data.data || []
      students.value = studentsData.map(student => ({
        ...student,
        marks: Object.fromEntries(
          selectedSubjectsData.value.map(subject => [
            subject.id,
            {
              total_marks: subject.total_marks || null,
              obtained_marks: null
            }
          ])
        ),
        is_absent: false
      }))
    }
  } catch (error) {
    toast.error('Failed to load students')
    console.error(error)
  } finally {
    loadingStudents.value = false
  }
}

const saveDraft = async () => {
  saving.value = true
  try {
    const marksData = students.value.map(student => ({
      student_id: student.student_id,
      class_id: student.class_id,
      section_id: student.section_id,
      marks: Object.entries(student.marks).map(([subjectId, markData]) => ({
        subject_id: subjectId,
        total_marks: markData.total_marks,
        obtained_marks: markData.obtained_marks,
        is_absent: student.is_absent
      }))
    }))

    const response = await api.post('/exam-marks/save-draft', {
      exam_id: selectedExam.value,
      marks_data: marksData
    })

    if (response.data.success) {
      toast.success('Draft saved successfully')
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to save draft')
  } finally {
    saving.value = false
  }
}

const submitMarks = async () => {
  // Validate marks
  let hasErrors = false
  students.value.forEach(student => {
    selectedSubjectsData.value.forEach(subject => {
      const mark = student.marks[subject.id]
      if (!student.is_absent) {
        if (!mark.total_marks || mark.total_marks <= 0) {
          hasErrors = true
          toast.warning(`Please enter total marks for ${student.student_name} - ${subject.name}`)
        }
        if (mark.obtained_marks === null || mark.obtained_marks < 0) {
          hasErrors = true
          toast.warning(`Please enter obtained marks for ${student.student_name} - ${subject.name}`)
        }
        if (mark.obtained_marks > mark.total_marks) {
          hasErrors = true
          toast.warning(`Obtained marks cannot exceed total marks for ${student.student_name} - ${subject.name}`)
        }
      }
    })
  })

  if (hasErrors) return

  submitting.value = true
  try {
    const marksData = students.value.map(student => ({
      student_id: student.student_id,
      class_id: student.class_id,
      section_id: student.section_id,
      marks: Object.entries(student.marks).map(([subjectId, markData]) => ({
        subject_id: subjectId,
        total_marks: markData.total_marks,
        obtained_marks: student.is_absent ? 0 : markData.obtained_marks,
        is_absent: student.is_absent
      }))
    }))

    const response = await api.post('/exam-marks/submit', {
      exam_id: selectedExam.value,
      class_ids: selectedClasses.value,
      subject_ids: selectedSubjects.value,
      section_ids: selectedSections.value.length > 0 ? selectedSections.value : null,
      marks_data: marksData
    })

    if (response.data.success) {
      toast.success('Marks submitted for verification')
      students.value = []
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to submit marks')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  loadExams()
  loadClasses()
})
</script>
