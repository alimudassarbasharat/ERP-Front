<template>
  <PageShell 
    title="Fee Collection"
    :breadcrumbs="[
      { label: 'Fee Management', route: '/fees' },
      { label: 'Collection' }
    ]"
  >
    <!-- Fee Sections Grid (Matching Analytics Style) -->
    <div class="w-full mb-4">
      <SectionHeader title="Fee Management Modules" :icon="Document" />
      <p class="text-gray-600 dark:text-gray-400 mb-6">Access the core modules of the fee system</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Generate Fee Module -->
        <SectionCard
          title="Generate Fee"
          description="Create and assign new fees for students or groups"
          :icon="DocumentAdd"
          icon-bg-class="bg-gradient-to-r from-blue-100 to-indigo-200"
          hover-icon-bg-class="group-hover:from-blue-500 group-hover:to-indigo-600"
          icon-class="text-blue-600"
          hover-icon-class="group-hover:text-white"
          hover-text-class="group-hover:text-blue-600"
          @click="goToGenerateChallan"
        />

        <!-- Pay Fee Module -->
        <SectionCard
          title="Pay Fee"
          description="Browse, search, and manage all generated fees"
          :icon="CircleCheck"
          icon-bg-class="bg-gradient-to-r from-green-100 to-emerald-200"
          hover-icon-bg-class="group-hover:from-green-500 group-hover:to-emerald-600"
          icon-class="text-green-600"
          hover-icon-class="group-hover:text-white"
          hover-text-class="group-hover:text-green-600"
          @click="goToPayFee"
        />

        <!-- Fee Reports & Analytics Module -->
        <SectionCard
          title="Fee Reports & Analytics"
          description="View comprehensive reports, analytics, and export fee data for insights"
          :icon="DataAnalysis"
          icon-bg-class="bg-gradient-to-r from-orange-100 to-yellow-200"
          hover-icon-bg-class="group-hover:from-orange-500 group-hover:to-yellow-600"
          icon-class="text-orange-600"
          hover-icon-class="group-hover:text-white"
          hover-text-class="group-hover:text-orange-600"
          @click="goToSection('reports')"
        />
      </div>
    </div>
  </PageShell>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Document, DocumentAdd, CircleCheck, DataAnalysis } from '@element-plus/icons-vue'
import PageShell from '@/components/common/PageShell.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import SectionCard from '@/components/common/SectionCard.vue'

const router = useRouter()

const goToSection = (section) => {
  if (section === 'reports') router.push({ name: 'FeeAnalytics' })
}

const goToGenerateChallan = () => {
  router.push({ name: 'GenerateChallan' })
}

const goToPayFee = () => {
  router.push({ name: 'PayFee' })
}
</script>
