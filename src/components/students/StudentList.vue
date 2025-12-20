<template>
  <div class="student-list">
    <div class="header">
      <h2>Students</h2>
      <el-button type="primary" @click="showAddDialog">
        <el-icon><Plus /></el-icon> Add Student
      </el-button>
    </div>

    <!-- Search and Filter Section -->
    <div class="search-filter-section">
      <el-input
        v-model="searchQuery"
        placeholder="Search students..."
        clearable
        @clear="handleSearch"
        @input="handleSearch"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <el-select
        v-model="selectedClass"
        placeholder="Filter by class"
        clearable
        @change="handleSearch"
      >
        <el-option
          v-for="classItem in classes"
          :key="classItem.id"
          :label="classItem.name"
          :value="classItem.id"
        />
      </el-select>
    </div>

    <!-- Students Table -->
    <el-card class="table-card">
      <el-table
        :data="students"
        style="width: 100%"
        v-loading="loading"
        :empty-text="'No students found'"
      >
        <el-table-column prop="roll_number" label="Roll No" width="100" />
        <el-table-column label="Student" min-width="200">
          <template #default="{ row }">
            <div class="student-info">
              <el-avatar
                :size="40"
                :src="row.photo_url"
                :alt="row.first_name"
              />
              <div>
                <div>{{ row.first_name }} {{ row.last_name }}</div>
                <small class="text-muted">{{ row.email }}</small>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="class.name" label="Class" width="120" />
        <el-table-column prop="gender" label="Gender" width="100" />
        <el-table-column prop="date_of_birth" label="DOB" width="120" />
        <el-table-column label="Actions" width="150" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button
                type="primary"
                size="small"
                @click="viewStudent(row)"
                :icon="View"
              />
              <el-button
                type="warning"
                size="small"
                @click="editStudent(row)"
                :icon="Edit"
              />
              <el-button
                type="danger"
                size="small"
                @click="confirmDelete(row)"
                :icon="Delete"
              />
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <!-- Pagination -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- Add/Edit Student Dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEditing ? 'Edit Student' : 'Add Student'"
      width="80%"
      :close-on-click-modal="false"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        @submit.prevent
      >
        <!-- Basic Information -->
        <el-form-item label="First Name" prop="first_name">
          <el-input v-model="form.first_name" />
        </el-form-item>
        <el-form-item label="Last Name" prop="last_name">
          <el-input v-model="form.last_name" />
        </el-form-item>
        <el-form-item label="Roll Number" prop="roll_number">
          <el-input v-model="form.roll_number" />
        </el-form-item>
        <el-form-item label="Class" prop="class_id">
          <el-select v-model="form.class_id">
            <el-option
              v-for="classItem in classes"
              :key="classItem.id"
              :label="classItem.name"
              :value="classItem.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Gender" prop="gender">
          <el-select v-model="form.gender">
            <el-option label="Male" value="male" />
            <el-option label="Female" value="female" />
            <el-option label="Other" value="other" />
          </el-select>
        </el-form-item>
        <el-form-item label="Date of Birth" prop="date_of_birth">
          <el-date-picker
            v-model="form.date_of_birth"
            type="date"
          />
        </el-form-item>
        <el-form-item label="Photo" prop="photo">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handlePhotoChange"
          >
            <img v-if="form.photo_url" :src="form.photo_url" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <!-- Family Information -->
        <h3>Family Information</h3>
        <el-form-item label="Father's Name" prop="family_info.father_name">
          <el-input v-model="form.family_info.father_name" />
        </el-form-item>
        <el-form-item label="Father's CNIC" prop="family_info.father_cnic">
          <el-input v-model="form.family_info.father_cnic" />
        </el-form-item>
        <el-form-item label="Father's Occupation" prop="family_info.father_occupation">
          <el-input v-model="form.family_info.father_occupation" />
        </el-form-item>
        <el-form-item label="Mother's Name" prop="family_info.mother_name">
          <el-input v-model="form.family_info.mother_name" />
        </el-form-item>
        <el-form-item label="Mother's CNIC" prop="family_info.mother_cnic">
          <el-input v-model="form.family_info.mother_cnic" />
        </el-form-item>
        <el-form-item label="Mother's Occupation" prop="family_info.mother_occupation">
          <el-input v-model="form.family_info.mother_occupation" />
        </el-form-item>

        <!-- Contact Information -->
        <h3>Contact Information</h3>
        <el-form-item label="Phone Number" prop="contact_info.phone">
          <el-input v-model="form.contact_info.phone" />
        </el-form-item>
        <el-form-item label="WhatsApp Number" prop="contact_info.whatsapp_number">
          <el-input v-model="form.contact_info.whatsapp_number" />
        </el-form-item>
        <el-form-item label="Email" prop="contact_info.email">
          <el-input v-model="form.contact_info.email" type="email" />
        </el-form-item>
        <el-form-item label="Address" prop="contact_info.address">
          <el-input
            v-model="form.contact_info.address"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitForm">Submit</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- View Student Dialog -->
    <el-dialog
      v-model="viewDialogVisible"
      title="Student Details"
      width="80%"
    >
      <el-descriptions :column="3" border>
        <el-descriptions-item label="Name">
          {{ selectedStudent.first_name }} {{ selectedStudent.last_name }}
        </el-descriptions-item>
        <el-descriptions-item label="Roll Number">
          {{ selectedStudent.roll_number }}
        </el-descriptions-item>
        <el-descriptions-item label="Class">
          {{ selectedStudent.class?.name }}
        </el-descriptions-item>
        <el-descriptions-item label="Gender">
          {{ selectedStudent.gender }}
        </el-descriptions-item>
        <el-descriptions-item label="Date of Birth">
          {{ selectedStudent.date_of_birth }}
        </el-descriptions-item>
        <el-descriptions-item label="Email">
          {{ selectedStudent.contact_info?.email }}
        </el-descriptions-item>
      </el-descriptions>

      <h3>Family Information</h3>
      <el-descriptions :column="3" border>
        <el-descriptions-item label="Father's Name">
          {{ selectedStudent.family_info?.father_name }}
        </el-descriptions-item>
        <el-descriptions-item label="Father's Occupation">
          {{ selectedStudent.family_info?.father_occupation }}
        </el-descriptions-item>
        <el-descriptions-item label="Mother's Name">
          {{ selectedStudent.family_info?.mother_name }}
        </el-descriptions-item>
        <el-descriptions-item label="Mother's Occupation">
          {{ selectedStudent.family_info?.mother_occupation }}
        </el-descriptions-item>
      </el-descriptions>

      <h3>Contact Information</h3>
      <el-descriptions :column="3" border>
        <el-descriptions-item label="Phone">
          {{ selectedStudent.contact_info?.phone }}
        </el-descriptions-item>
        <el-descriptions-item label="WhatsApp">
          {{ selectedStudent.contact_info?.whatsapp_number }}
        </el-descriptions-item>
        <el-descriptions-item label="Address">
          {{ selectedStudent.contact_info?.address }}
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Search, View, Edit, Delete } from '@element-plus/icons-vue'
import { useStudentStore } from '@/stores/student'
import { useClassStore } from '@/stores/class'

const toast = useToast()
const studentStore = useStudentStore()
const classStore = useClassStore()

// State
const loading = ref(false)
const students = ref([])
const classes = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const searchQuery = ref('')
const selectedClass = ref(null)
const dialogVisible = ref(false)
const viewDialogVisible = ref(false)
const isEditing = ref(false)
const selectedStudent = ref({})
const formRef = ref(null)

const form = ref({
  first_name: '',
  last_name: '',
  roll_number: '',
  class_id: '',
  gender: '',
  date_of_birth: '',
  photo: null,
  photo_url: '',
  family_info: {
    father_name: '',
    father_cnic: '',
    father_occupation: '',
    mother_name: '',
    mother_cnic: '',
    mother_occupation: ''
  },
  contact_info: {
    phone: '',
    whatsapp_number: '',
    email: '',
    address: ''
  }
})

const rules = {
  first_name: [{ required: true, message: 'Please input first name', trigger: 'blur' }],
  last_name: [{ required: true, message: 'Please input last name', trigger: 'blur' }],
  roll_number: [{ required: true, message: 'Please input roll number', trigger: 'blur' }],
  class_id: [{ required: true, message: 'Please select class', trigger: 'change' }],
  gender: [{ required: true, message: 'Please select gender', trigger: 'change' }],
  date_of_birth: [{ required: true, message: 'Please select date of birth', trigger: 'change' }]
}

// Methods
const fetchStudents = async () => {
  loading.value = true
  try {
    const response = await studentStore.getStudents({
      page: currentPage.value,
      per_page: pageSize.value,
      search: searchQuery.value,
      class_id: selectedClass.value
    })
    students.value = response.data
    total.value = response.total
  } catch (error) {
    toast.error('Failed to fetch students')
  } finally {
    loading.value = false
  }
}

const fetchClasses = async () => {
  try {
    classes.value = await classStore.getClasses()
  } catch (error) {
    toast.error('Failed to fetch classes')
  }
}

const handleSearch = () => {
  currentPage.value = 1
  fetchStudents()
}

const handleSizeChange = (val) => {
  pageSize.value = val
  fetchStudents()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchStudents()
}

const showAddDialog = () => {
  isEditing.value = false
  form.value = {
    first_name: '',
    last_name: '',
    roll_number: '',
    class_id: '',
    gender: '',
    date_of_birth: '',
    photo: null,
    photo_url: '',
    family_info: {
      father_name: '',
      father_cnic: '',
      father_occupation: '',
      mother_name: '',
      mother_cnic: '',
      mother_occupation: ''
    },
    contact_info: {
      phone: '',
      whatsapp_number: '',
      email: '',
      address: ''
    }
  }
  dialogVisible.value = true
}

const editStudent = (student) => {
  isEditing.value = true
  form.value = { ...student }
  dialogVisible.value = true
}

const viewStudent = (student) => {
  selectedStudent.value = student
  viewDialogVisible.value = true
}

const handlePhotoChange = (file) => {
  form.value.photo = file.raw
  form.value.photo_url = URL.createObjectURL(file.raw)
}

const submitForm = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        if (isEditing.value) {
          await studentStore.updateStudent(form.value.id, form.value)
          toast.success('Student updated successfully')
        } else {
          await studentStore.createStudent(form.value)
          toast.success('Student created successfully')
        }
        dialogVisible.value = false
        fetchStudents()
      } catch (error) {
        toast.error(error.message || 'Failed to save student')
      }
    }
  })
}

const confirmDelete = (student) => {
  ElMessageBox.confirm(
    'Are you sure you want to delete this student?',
    'Warning',
    {
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  ).then(async () => {
    try {
      await studentStore.deleteStudent(student.id)
      toast.success('Student deleted successfully')
      fetchStudents()
    } catch (error) {
      toast.error('Failed to delete student')
    }
  })
}

// Lifecycle hooks
onMounted(() => {
  fetchStudents()
  fetchClasses()
})
</script>

<style scoped>
.student-list {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-filter-section {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.table-card {
  margin-bottom: 20px;
}

.student-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #94a3b8;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
  object-fit: cover;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style> 