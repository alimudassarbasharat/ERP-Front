<template>
  <PageShell 
    title="Verify Marks"
    :breadcrumbs="[
      { label: 'Exams', to: '/exams/add-marksheet-landing' },
      { label: 'Academic', to: '/exams/academic-landing' },
      { label: 'Verify Marks' }
    ]"
  >
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Marks Verification Dashboard</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KPICard label="Total Classes" :value="12" :icon="School" icon-bg-class="bg-gradient-to-br from-blue-100 to-indigo-100" icon-class="text-blue-600" />
        <KPICard label="Pending Verification" :value="5" :icon="Warning" icon-bg-class="bg-gradient-to-br from-orange-100 to-amber-100" icon-class="text-orange-600" badge="Needs Review" badge-class="text-orange-600 bg-orange-100" />
        <KPICard label="Verified" :value="7" :icon="CircleCheck" icon-bg-class="bg-gradient-to-br from-green-100 to-emerald-100" icon-class="text-green-600" badge="Complete" badge-class="text-green-600 bg-green-100" />
      </div>

      <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4 border border-blue-200 dark:border-blue-800">
        <p class="text-sm text-blue-800 dark:text-blue-300">
          <strong>Coordinator/Verifier Role:</strong> Check marks for missing entries, out-of-range values, absent students without reason, and optional subject mapping issues.
        </p>
      </div>

      <p class="text-gray-600 dark:text-gray-400 mb-4">
        This verification page shows classes with progress percentage. Click to review marks in read-only or limited edit mode based on your role.
      </p>

      <p class="text-sm text-gray-500 dark:text-gray-500">
        Full verification interface coming soon. Currently integrated with existing verification workflow.
      </p>
    </div>
  </PageShell>
</template>

<script setup>
import { School, Warning, CircleCheck } from '@element-plus/icons-vue'
import PageShell from '@/components/common/PageShell.vue'
import KPICard from '@/components/common/KPICard.vue'
</script>
