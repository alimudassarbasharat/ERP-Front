<template>
  <div class="exam-breadcrumb mb-6 flex items-center gap-2 text-sm">
    <el-button 
      text 
      type="primary" 
      @click="router.push('/exams/center')"
      class="flex items-center gap-1 px-0"
    >
      <el-icon><House /></el-icon>
      <span>Exam Management</span>
    </el-button>
    <el-icon class="text-gray-400"><ArrowRight /></el-icon>
    <span class="text-gray-600 dark:text-gray-400">{{ currentPage }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { House, ArrowRight } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const currentPage = computed(() => {
  const pageMap = {
    'ExamPapers': 'Exam Papers',
    'MarksEntry': 'Enter Marks',
    'MarksVerification': 'Check Marks',
    'ExamResults': 'Exam Results',
    'Marksheets': 'Marksheets',
    'AddMarksheet': 'Enter Exam Marks',
    'ManageExams': 'Manage Exams',
    'ViewMarksheet': 'View Marksheet',
    'MarkReport': 'Mark Report',
    'AwardList': 'Award List'
  }
  return pageMap[route.name] || route.meta?.title || 'Exam'
})
</script>

<style scoped>
.exam-breadcrumb {
  animation: fadeIn 0.3s ease-in;
}
</style>
