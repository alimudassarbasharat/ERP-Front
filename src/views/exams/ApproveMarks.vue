<template>
  <PageShell 
    title="Approve Marks"
    :breadcrumbs="[
      { label: 'Exams', to: '/exams/add-marksheet-landing' },
      { label: 'Academic', to: '/exams/academic-landing' },
      { label: 'Approve Marks' }
    ]"
  >
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Marks Approval Dashboard</h3>
      
      <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-4 border border-green-200 dark:border-green-800">
        <p class="text-sm text-green-800 dark:text-green-300">
          <strong>Owner/Admin Role:</strong> Approve verified marks to lock them for final processing. Teacher edits will be disabled after approval.
        </p>
      </div>

      <p class="text-gray-600 dark:text-gray-400 mb-4">
        Only verified items will appear here. After approval, marks are locked for result generation.
      </p>

      <p class="text-sm text-gray-500 dark:text-gray-500">
        Full approval interface coming soon. Currently integrated with existing approval workflow.
      </p>
    </div>
  </PageShell>
</template>

<script setup>
import PageShell from '@/components/common/PageShell.vue'
</script>
