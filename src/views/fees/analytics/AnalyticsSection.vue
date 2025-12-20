<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
    <!-- Header with Back Button -->
    <div class="w-full">
      <div class="flex items-center justify-between bg-white rounded-lg shadow py-4 px-6 transform transition-all duration-500 ease-in-out">
        <div class="flex items-center gap-4">
          <button 
            @click="goBack"
            class="w-10 h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <component :is="sectionIcon" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900 tracking-tight">{{ sectionTitle }}</h1>
            <p class="text-sm text-gray-600">{{ sectionDescription }}</p>
          </div>
        </div>
        <nav class="flex items-center gap-2 text-sm font-medium text-gray-500">
          <router-link to="/fees/analytics" class="hover:text-purple-600 cursor-pointer transition-colors duration-200">Analytics</router-link>
          <span class="mx-2">|</span>
          <span class="text-gray-900 font-bold">{{ sectionTitle }}</span>
        </nav>
      </div>
    </div>

    <!-- Dynamic Content Based on Section -->
    <div class="w-full">
      <!-- Fee Breakdown Analysis -->
      <FeeBreakdownAnalysis v-if="section === 'breakdown'" />
      
      <!-- Payment Analysis -->
      <PaymentAnalysis v-else-if="section === 'payment-analysis'" />
      
      <!-- Graphical Reports -->
      <GraphicalReports v-else-if="section === 'charts'" />
      
      <!-- Export & Reports -->
      <ExportReports v-else-if="section === 'exports'" />
      
      <!-- Notifications & Alerts -->
      <NotificationsAlerts v-else-if="section === 'notifications'" />
      
      <!-- Discounts & Scholarships -->
      <DiscountsScholarships v-else-if="section === 'discounts'" />
      
      <!-- Student Fee Dashboard -->
      <StudentFeeDashboard v-else-if="section === 'student-dashboard'" />
      
      <!-- Advanced Filtering -->
      <AdvancedFiltering v-else-if="section === 'advanced-filtering'" />
      
      <!-- 404 Section -->
      <div v-else class="bg-white rounded-xl p-12 shadow-lg border border-gray-200 text-center">
        <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m6 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Section Not Found</h2>
        <p class="text-gray-600 mb-6">The analytics section you're looking for doesn't exist.</p>
        <button 
          @click="goBack"
          class="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
        >
          Go Back to Analytics
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Import individual section components
import FeeBreakdownAnalysis from './sections/FeeBreakdownAnalysis.vue'
import PaymentAnalysis from './sections/PaymentAnalysis.vue'
import GraphicalReports from './sections/GraphicalReports.vue'
import ExportReports from './sections/ExportReports.vue'
import NotificationsAlerts from './sections/NotificationsAlerts.vue'
import DiscountsScholarships from './sections/DiscountsScholarships.vue'
import StudentFeeDashboard from './sections/StudentFeeDashboard.vue'
import AdvancedFiltering from './sections/AdvancedFiltering.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const section = computed(() => route.params.section)

const sectionConfig = {
  breakdown: {
    title: 'Detailed Fee Breakdown',
    description: 'Comprehensive analysis of tuition, library, lab, hostel and transport fees',
    icon: 'calculator'
  },
  'payment-analysis': {
    title: 'Payment Analysis',
    description: 'Payment trends, comparison analysis, and payment method distribution',
    icon: 'chart'
  },
  charts: {
    title: 'Graphical Reports',
    description: 'Interactive charts, pie graphs, bar charts and visual analytics',
    icon: 'chart-bar'
  },
  exports: {
    title: 'Export & Reports',
    description: 'Generate receipts, export to Excel/PDF and print summary reports',
    icon: 'download'
  },
  notifications: {
    title: 'Notifications & Alerts',
    description: 'Due date alerts, payment reminders and confirmation notifications',
    icon: 'bell'
  },
  discounts: {
    title: 'Discounts & Scholarships',
    description: 'Fee concessions, scholarship details and special discount analysis',
    icon: 'gift'
  },
  'student-dashboard': {
    title: 'Student Fee Dashboard',
    description: 'View and manage student fees',
    icon: 'clipboard'
  },
  'advanced-filtering': {
    title: 'Advanced Filtering',
    description: 'Advanced filtering options for fee analysis',
    icon: 'filter'
  }
}

const sectionTitle = computed(() => {
  return sectionConfig[section.value]?.title || 'Unknown Section'
})

const sectionDescription = computed(() => {
  return sectionConfig[section.value]?.description || 'Section description not available'
})

const sectionIcon = computed(() => {
  const iconName = sectionConfig[section.value]?.icon || 'chart'
  
  // Return appropriate icon component based on name
  const icons = {
    clipboard: () => 'svg',
    calculator: () => 'svg', 
    chart: () => 'svg',
    'chart-bar': () => 'svg',
    filter: () => 'svg',
    download: () => 'svg',
    bell: () => 'svg',
    gift: () => 'svg'
  }
  
  // For now, return a generic SVG element
  return 'svg'
})

const goBack = () => {
  router.push('/fees/analytics')
}

onMounted(() => {
  // Load section-specific data
  console.log(`Loading data for section: ${section.value}`)
})
</script>

<style scoped>
/* Custom animations */
@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.section-content {
  animation: slideInFromLeft 0.6s ease-out forwards;
}

/* Responsive design */
@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .section-nav {
    justify-content: center;
  }
}
</style>  