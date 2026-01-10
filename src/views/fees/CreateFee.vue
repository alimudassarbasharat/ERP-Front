<template>
  <PageShell 
    title="Create New Fee"
    :breadcrumbs="[
      { label: 'Fee Management', route: '/fees' },
      { label: 'Create Fee' }
    ]"
  >
    <div class="w-full mb-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
        <el-form
          :model="feeData"
          label-width="120px"
          label-position="top"
          @submit.prevent="submitFee"
        >
          <el-form-item label="Fee Name" required>
            <el-input
              v-model="feeData.name"
              placeholder="Enter fee name"
              size="large"
            />
          </el-form-item>

          <el-form-item label="Fee Type" required>
            <el-select
              v-model="feeData.type"
              placeholder="Select fee type"
              size="large"
              class="w-full"
            >
              <el-option label="Tuition Fee" value="tuition" />
              <el-option label="Examination Fee" value="examination" />
              <el-option label="Library Fee" value="library" />
              <el-option label="Transport Fee" value="transport" />
              <el-option label="Other" value="other" />
            </el-select>
          </el-form-item>

          <el-form-item label="Amount" required>
            <el-input-number
              v-model="feeData.amount"
              placeholder="Enter amount"
              :min="0"
              :precision="2"
              size="large"
              class="w-full"
            />
          </el-form-item>

          <el-form-item label="Due Date" required>
            <el-date-picker
              v-model="feeData.dueDate"
              type="date"
              placeholder="Select due date"
              size="large"
              class="w-full"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>

          <el-form-item label="Description">
            <el-input
              v-model="feeData.description"
              type="textarea"
              :rows="3"
              placeholder="Enter fee description"
            />
          </el-form-item>

          <el-form-item label="Class" required>
            <el-select
              v-model="feeData.class"
              placeholder="Select class"
              size="large"
              class="w-full"
            >
              <el-option
                v-for="cls in classes"
                :key="cls"
                :label="cls"
                :value="cls"
              />
            </el-select>
          </el-form-item>

          <el-form-item>
            <div class="flex gap-3">
              <ActionButton
                label="Create Fee"
                :icon="CircleCheck"
                variant="primary"
                @click="submitFee"
              />
              <ActionButton
                label="Reset"
                variant="secondary"
                @click="resetForm"
              />
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </PageShell>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { CircleCheck } from '@element-plus/icons-vue'
import PageShell from '@/components/common/PageShell.vue'
import ActionButton from '@/components/common/ActionButton.vue'

const toast = useToast()

const feeData = ref({
  name: '',
  type: '',
  amount: null,
  dueDate: '',
  description: '',
  class: ''
})

const classes = ref([
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  'Class 11', 'Class 12'
])

const submitFee = () => {
  // TODO: Implement API call to create fee
  toast.success('Fee created successfully')
  console.log('Fee data:', feeData.value)
  resetForm()
}

const resetForm = () => {
  feeData.value = {
    name: '',
    type: '',
    amount: null,
    dueDate: '',
    description: '',
    class: ''
  }
}
</script>
