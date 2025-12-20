<template>
  <div class="subjectwise-marksheet-container">
    <el-card class="subjectwise-marksheet-card">
      <template #header>
        <div class="card-header">
          <div class="header-title-wrap">
            <h2 class="title">Add Marks (Subject Wise)</h2>
          </div>
        </div>
      </template>
      <div class="subjectwise-table-wrap responsive-table-wrap">
        <el-table
          :data="studentRows"
          class="subjectwise-table"
          style="width: 100%"
          :border="true"
          :fit="true"
          v-loading="loading"
        >
          <el-table-column label="Student" min-width="180">
            <template #default="{ row }">
              <div class="student-cell">
                <div class="student-name">{{ row.student_name }}</div>
                <div class="student-id">ID: {{ row.student_id }}</div>
              </div>
            </template>
          </el-table-column>
          
          <template v-for="(subject, index) in subjects" :key="`total-${subject.id}-${index}`">
          <el-table-column
            :label="subject.name + ' Total'"
            min-width="90"
          >
            <template #default="{ row }">
              <el-input
                v-if="row.subject_marks && row.subject_marks[subject.id]"
                v-model="row.subject_marks[subject.id].total"
                type="number"
                min="0"
                placeholder="Total"
                style="width: 90px;"
              />
            </template>
          </el-table-column>
          </template>
          
          <template v-for="(subject, index) in subjects" :key="`obtained-${subject.id}-${index}`">
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
                style="width: 90px;"
              />
            </template>
          </el-table-column>
          </template>
        </el-table>
        <el-button
          type="success"
          class="save-all-btn"
          @click="saveAllMarks"
          style="margin-top: 24px; float: right;"
        >
          Save All
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

const toast = useToast()
const students = ref([])
const subjects = ref([])
const studentRows = ref([])
const loading = ref(false)

const fetchStudentsAndSubjects = async () => {
  loading.value = true
  try {
    const [studentRes, subjectRes] = await Promise.all([
      axios.get('/students'),
      axios.get('/subjects')
    ])
    students.value = (studentRes.data.result?.data || []).map(s => ({
      student_id: s.id,
      student_name: s.first_name + ' ' + s.last_name
    }))
    subjects.value = subjectRes.data.result || []
    // Build rows: each row is a student, with subject_marks as an object
    studentRows.value = students.value.map(stu => ({
      ...stu,
      subject_marks: Object.fromEntries(subjects.value.map(sub => [sub.id, { total: sub.total_marks || '', obtained: '' }]))
    }))
  } catch (e) {
    students.value = []
    subjects.value = []
    studentRows.value = []
    toast.error('Failed to load students or subjects')
  } finally {
    loading.value = false
  }
}

const saveAllMarks = async () => {
  try {
    // Prepare payload: array of {student_id, subject_id, total_marks, obtain_marks}
    const payload = []
    studentRows.value.forEach(row => {
      Object.entries(row.subject_marks).forEach(([subjectId, marksObj]) => {
        if (marksObj.obtained !== '' && marksObj.total !== '') {
          payload.push({
            student_id: row.student_id,
            subject_id: subjectId,
            total_marks: marksObj.total,
            obtain_marks: marksObj.obtained
          })
        }
      })
    })
    await axios.post('/result-sheet/store-subjectwise', { marks: payload })
    toast.success('All marks saved!')
  } catch (e) {
    toast.error('Failed to save marks!')
  }
}

onMounted(() => {
  fetchStudentsAndSubjects()
})
</script>

<style scoped>
.subjectwise-marksheet-container {
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px 48px 16px;
}
.subjectwise-marksheet-card {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(64, 158, 255, 0.12), 0 1.5px 8px rgba(60,72,100,0.08);
  backdrop-filter: blur(8px);
  border: 1.5px solid #e3eaf5;
  overflow: hidden;
  padding-bottom: 24px;
  margin-top: 24px;
  width: 100%;
  transition: box-shadow 0.3s;
}
.card-header {
  background: rgba(247, 248, 250, 0.85);
  border-radius: 20px 20px 0 0;
  border-bottom: 1.5px solid #e3eaf5;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.04);
  padding: 28px 36px 18px 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.subjectwise-table-wrap {
  width: 100%;
  overflow-x: auto;
  padding: 0;
  -webkit-overflow-scrolling: touch;
}
.subjectwise-table {
  margin-top: 24px;
  background: rgba(255,255,255,0.95);
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(60,72,100,0.08);
  overflow: hidden;
  min-width: 900px;
}
.save-all-btn {
  margin-top: 24px;
  float: right;
}
.student-cell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.student-name {
  font-weight: 600;
  color: #1e293b;
}
.student-id {
  font-size: 0.85em;
  color: #94a3b8;
  margin-top: 2px;
}
</style> 