<template>
  <PageShell 
    title="Create Exam Paper"
    :breadcrumbs="[
      { label: 'Exams', to: '/exams/add-marksheet-landing' },
      { label: 'Create Paper', to: '/exams/create-paper-landing' },
      { label: 'Create Exam' }
    ]"
  >
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Create New Exam/Paper</h3>
      
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        Create exam/term/paper: select session, enter name/type (Mid/Final/Monthly/Unit), and save.
      </p>

      <p class="text-sm text-gray-500 dark:text-gray-500">
        Using existing exam creation workflow. Access via "Create Paper Landing" → "Create New Exam" button.
      </p>
    </div>
  </PageShell>
</template>

<script setup>
import PageShell from '@/components/common/PageShell.vue'
</script>
