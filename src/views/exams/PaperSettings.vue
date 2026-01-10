<template>
  <PageShell 
    title="Paper Settings"
    :breadcrumbs="[
      { label: 'Exams', to: '/exams/add-marksheet-landing' },
      { label: 'Create Paper', to: '/exams/create-paper-landing' },
      { label: 'Paper Settings' }
    ]"
  >
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Configure Paper Settings</h3>
      
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        Configure default total marks, mark components (theory/practical), and passing marks rules.
      </p>

      <p class="text-sm text-gray-500 dark:text-gray-500">
        Settings interface coming soon. Currently configured per-subject during marks entry.
      </p>
    </div>
  </PageShell>
</template>

<script setup>
import PageShell from '@/components/common/PageShell.vue'
</script>
