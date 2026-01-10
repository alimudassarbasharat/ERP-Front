<template>
  <PageShell 
    title="Academic Reports"
    :breadcrumbs="[
      { label: 'Exams', to: '/exams/add-marksheet-landing' },
      { label: 'Academic', to: '/exams/academic-landing' },
      { label: 'Reports' }
    ]"
  >
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Exam Academic Reports</h3>
      
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        View comprehensive reports: class averages, subject performance, weak students list, and export in Excel/PDF.
      </p>

      <p class="text-sm text-gray-500 dark:text-gray-500">
        Reports interface coming soon. Currently using existing reports in Reports module.
      </p>
    </div>
  </PageShell>
</template>

<script setup>
import PageShell from '@/components/common/PageShell.vue'
</script>
