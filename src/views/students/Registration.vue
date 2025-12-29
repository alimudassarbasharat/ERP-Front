<template>
  <div class="registration-container">
    <el-card class="registration-card">
      <template #header>
        <div class="card-header">
          <h2>Student Registration</h2>
        </div>
      </template>
      
      <el-form :model="registrationForm" :rules="rules" ref="registrationFormRef" label-width="120px">
        <el-form-item label="First Name" prop="firstName">
          <el-input v-model="registrationForm.firstName" placeholder="Enter first name"></el-input>
        </el-form-item>
        
        <el-form-item label="Last Name" prop="lastName">
          <el-input v-model="registrationForm.lastName" placeholder="Enter last name"></el-input>
        </el-form-item>
        
        <el-form-item label="Date of Birth" prop="dateOfBirth">
          <CompactDatePicker
            v-model="registrationForm.dateOfBirth"
            placeholder=""
          />
        </el-form-item>
        
        <el-form-item label="Gender" prop="gender">
          <el-select v-model="registrationForm.gender" placeholder="Select gender">
            <el-option label="Male" value="male"></el-option>
            <el-option label="Female" value="female"></el-option>
            <el-option label="Other" value="other"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="Email" prop="email">
          <el-input v-model="registrationForm.email" placeholder="Enter email"></el-input>
        </el-form-item>
        
        <el-form-item label="Phone" prop="phone">
          <el-input v-model="registrationForm.phone" placeholder="Enter phone number"></el-input>
        </el-form-item>
        
        <el-form-item label="Address" prop="address">
          <el-input type="textarea" v-model="registrationForm.address" placeholder="Enter address"></el-input>
        </el-form-item>
        
        <el-form-item label="Parent/Guardian Name" prop="parentName">
          <el-input v-model="registrationForm.parentName" placeholder="Enter parent/guardian name"></el-input>
        </el-form-item>
        
        <el-form-item label="Parent/Guardian Phone" prop="parentPhone">
          <el-input v-model="registrationForm.parentPhone" placeholder="Enter parent/guardian phone"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="submitForm">Register</el-button>
          <el-button @click="resetForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import CompactDatePicker from '@/components/CompactDatePicker.vue'

const toast = useToast()
const registrationFormRef = ref(null)

const registrationForm = reactive({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  email: '',
  phone: '',
  address: '',
  parentName: '',
  parentPhone: ''
})

const rules = {
  firstName: [
    { required: true, message: 'Please enter first name', trigger: 'blur' },
    { min: 2, max: 50, message: 'Length should be 2 to 50 characters', trigger: 'blur' }
  ],
  lastName: [
    { required: true, message: 'Please enter last name', trigger: 'blur' },
    { min: 2, max: 50, message: 'Length should be 2 to 50 characters', trigger: 'blur' }
  ],
  dateOfBirth: [
    { required: true, message: 'Please select date of birth', trigger: 'change' }
  ],
  gender: [
    { required: true, message: 'Please select gender', trigger: 'change' }
  ],
  email: [
    { required: true, message: 'Please enter email', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: 'Please enter phone number', trigger: 'blur' },
    { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number', trigger: 'blur' }
  ],
  address: [
    { required: true, message: 'Please enter address', trigger: 'blur' }
  ],
  parentName: [
    { required: true, message: 'Please enter parent/guardian name', trigger: 'blur' }
  ],
  parentPhone: [
    { required: true, message: 'Please enter parent/guardian phone', trigger: 'blur' },
    { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number', trigger: 'blur' }
  ]
}

const submitForm = async () => {
  if (!registrationFormRef.value) return
  
  try {
    await registrationFormRef.value.validate()
    // Here you would typically make an API call to register the student
    // For now, we'll just show a success message
    toast.success('Student registered successfully!')
    resetForm()
  } catch (error) {
    console.error('Form validation failed:', error)
  }
}

const resetForm = () => {
  if (registrationFormRef.value) {
    registrationFormRef.value.resetFields()
  }
}
</script>

<style scoped>
.registration-container {
  padding: 20px;
}

.registration-card {
  max-width: 800px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #1e293b;
}

.el-form {
  margin-top: 20px;
}

.el-form-item {
  margin-bottom: 22px;
}

.el-button {
  margin-right: 10px;
}
</style> 