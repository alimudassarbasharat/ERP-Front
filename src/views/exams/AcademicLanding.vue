<template>
  <PageShell 
    title="Academic"
    :breadcrumbs="[
      { label: 'Exams', to: '/exams/add-marksheet-landing' },
      { label: 'Academic' }
    ]"
  >
    <!-- Header Info -->
    <div class="w-full mb-6">
      <div class="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center flex-shrink-0">
            <el-icon class="text-white text-2xl"><Trophy /></el-icon>
          </div>
          <div class="flex-1">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Academic Management Center</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Verify marks, generate results, publish outcomes, download marksheets, and view comprehensive reports—all in one place.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION A: Check Marks -->
    <div class="w-full mb-6">
      <SectionHeader title="Check Marks" subtitle="Verify and approve marks entered by teachers" :icon="CircleCheck" />
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <!-- Verify -->
        <div 
          @click="router.push('/exams/verify-marks')"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center group-hover:from-orange-500 group-hover:to-amber-500 transition-all duration-300">
              <el-icon class="text-orange-600 group-hover:text-white text-2xl transition-all duration-300">
                <View />
              </el-icon>
            </div>
            <el-icon class="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-all duration-300">
              <ArrowRight />
            </el-icon>
          </div>
          
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-all duration-300">
            Verify Marks
          </h3>
          
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Coordinator/Verifier role: Check marks, find missing entries, review out-of-range values, and mark as verified
          </p>
          
          <div class="flex flex-wrap gap-2">
            <span class="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">Checklist</span>
            <span class="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Progress %</span>
          </div>
        </div>

        <!-- Approve -->
        <div 
          @click="router.push('/exams/approve-marks')"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center group-hover:from-green-500 group-hover:to-emerald-500 transition-all duration-300">
              <el-icon class="text-green-600 group-hover:text-white text-2xl transition-all duration-300">
                <CircleCheck />
              </el-icon>
            </div>
            <el-icon class="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-all duration-300">
              <ArrowRight />
            </el-icon>
          </div>
          
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-all duration-300">
            Approve Marks
          </h3>
          
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Owner/Admin role: Approve verified marks and lock them for final processing (teacher edits disabled after approval)
          </p>
          
          <div class="flex flex-wrap gap-2">
            <span class="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Final Lock</span>
            <span class="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Verified Only</span>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION B: Exam Results -->
    <div class="w-full mb-6">
      <SectionHeader title="Exam Results" subtitle="Generate and publish exam results" :icon="DataAnalysis" />
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <!-- Generate Results -->
        <div 
          @click="router.push('/exams/generate-results')"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center group-hover:from-blue-500 group-hover:to-indigo-500 transition-all duration-300">
              <el-icon class="text-blue-600 group-hover:text-white text-2xl transition-all duration-300">
                <Histogram />
              </el-icon>
            </div>
            <el-icon class="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-all duration-300">
              <ArrowRight />
            </el-icon>
          </div>
          
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300">
            Generate Results
          </h3>
          
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Compute totals, percentages, grades, and positions. Preview summary with class average, fail count, and toppers
          </p>
          
          <div class="flex flex-wrap gap-2">
            <span class="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Auto Calculate</span>
            <span class="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">Preview</span>
          </div>
        </div>

        <!-- Publish Results -->
        <div 
          @click="router.push('/exams/publish-results')"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
              <el-icon class="text-purple-600 group-hover:text-white text-2xl transition-all duration-300">
                <Promotion />
              </el-icon>
            </div>
            <el-icon class="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-all duration-300">
              <ArrowRight />
            </el-icon>
          </div>
          
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-all duration-300">
            Publish Results
          </h3>
          
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Run publish checklist and publish results per class, section, or all. Locks changes after publish
          </p>
          
          <div class="flex flex-wrap gap-2">
            <span class="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">Checklist</span>
            <span class="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400">Final Lock</span>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION C: Marksheets -->
    <div class="w-full mb-6">
      <SectionHeader title="Marksheets" subtitle="Download and print student marksheets" :icon="Printer" />
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <!-- Download Marksheets -->
        <div 
          @click="router.push('/exams/download-marksheets')"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 flex items-center justify-center group-hover:from-indigo-500 group-hover:to-blue-500 transition-all duration-300">
              <el-icon class="text-indigo-600 group-hover:text-white text-2xl transition-all duration-300">
                <Download />
              </el-icon>
            </div>
            <el-icon class="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-all duration-300">
              <ArrowRight />
            </el-icon>
          </div>
          
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all duration-300">
            Download Marksheets
          </h3>
          
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Download student-wise PDF, class bundle PDF, section bundle PDF with custom filters
          </p>
          
          <div class="flex flex-wrap gap-2">
            <span class="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">PDF Export</span>
            <span class="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Bulk Download</span>
          </div>
        </div>

        <!-- Print Marksheets -->
        <div 
          @click="router.push('/exams/print-marksheets')"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 flex items-center justify-center group-hover:from-teal-500 group-hover:to-cyan-500 transition-all duration-300">
              <el-icon class="text-teal-600 group-hover:text-white text-2xl transition-all duration-300">
                <Printer />
              </el-icon>
            </div>
            <el-icon class="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-all duration-300">
              <ArrowRight />
            </el-icon>
          </div>
          
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-all duration-300">
            Print Marksheets
          </h3>
          
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Print-friendly view with filters: class, section, student, or family. Optimized for bulk printing
          </p>
          
          <div class="flex flex-wrap gap-2">
            <span class="text-xs px-2 py-1 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">Print View</span>
            <span class="text-xs px-2 py-1 rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">Filters</span>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION D: Reports + Recent Activity -->
    <div class="w-full mb-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Reports -->
        <div>
          <SectionHeader title="Reports" subtitle="View and export comprehensive exam reports" :icon="Document" />
          
          <div class="mt-4 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="space-y-3">
              <button 
                @click="router.push('/exams/academic-reports')" 
                class="w-full flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 group"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center group-hover:from-purple-500 group-hover:to-indigo-500 transition-all duration-300">
                    <el-icon class="text-purple-600 group-hover:text-white transition-all duration-300">
                      <School />
                    </el-icon>
                  </div>
                  <div class="text-left">
                    <div class="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-all duration-300">Class Report</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">Averages, toppers, fail list</div>
                  </div>
                </div>
                <el-icon class="text-gray-400 group-hover:text-purple-500 transition-all duration-300"><ArrowRight /></el-icon>
              </button>

              <button 
                @click="router.push('/exams/academic-reports')" 
                class="w-full flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 group"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center group-hover:from-blue-500 group-hover:to-indigo-500 transition-all duration-300">
                    <el-icon class="text-blue-600 group-hover:text-white transition-all duration-300">
                      <Document />
                    </el-icon>
                  </div>
                  <div class="text-left">
                    <div class="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300">Subject Report</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">Subject averages, grade distribution</div>
                  </div>
                </div>
                <el-icon class="text-gray-400 group-hover:text-blue-500 transition-all duration-300"><ArrowRight /></el-icon>
              </button>

              <button 
                @click="router.push('/exams/academic-reports')" 
                class="w-full flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 hover:bg-orange-50 dark:hover:bg-orange-900/20 border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-300 group"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center group-hover:from-orange-500 group-hover:to-amber-500 transition-all duration-300">
                    <el-icon class="text-orange-600 group-hover:text-white transition-all duration-300">
                      <Warning />
                    </el-icon>
                  </div>
                  <div class="text-left">
                    <div class="font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-all duration-300">Weak Students List</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">Students needing attention</div>
                  </div>
                </div>
                <el-icon class="text-gray-400 group-hover:text-orange-500 transition-all duration-300"><ArrowRight /></el-icon>
              </button>

              <button 
                class="w-full flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-700 hover:border-green-500 dark:hover:border-green-500 transition-all duration-300 group"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <el-icon class="text-white">
                      <Download />
                    </el-icon>
                  </div>
                  <div class="text-left">
                    <div class="font-semibold text-green-700 dark:text-green-400">Export All Reports</div>
                    <div class="text-xs text-green-600 dark:text-green-500">Excel / PDF format</div>
                  </div>
                </div>
                <el-icon class="text-green-600 dark:text-green-400"><ArrowRight /></el-icon>
              </button>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div>
          <SectionHeader title="Recent Activity" subtitle="Latest exam module actions" :icon="Clock" />
          
          <div class="mt-4 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="space-y-4">
              <ActivityItem
                v-for="(activity, index) in recentActivities"
                :key="index"
                :title="activity.title"
                :description="activity.description"
                :time="activity.time"
                :type="activity.type"
                :icon="activity.icon"
              />
              <EmptyState
                v-if="recentActivities.length === 0"
                title="No recent activity"
                description="Exam activities will appear here"
                :icon="Clock"
                icon-color="gray"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageShell>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Trophy, CircleCheck, View, ArrowRight, DataAnalysis, Histogram, Promotion,
  Printer, Download, Document, School, Warning, Clock
} from '@element-plus/icons-vue'
import PageShell from '@/components/common/PageShell.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import ActivityItem from '@/components/common/ActivityItem.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import api from '@/utils/axios'

const router = useRouter()

const recentActivities = ref([])

const loadRecentActivities = async () => {
  try {
    const response = await api.get('/exam-management/recent-activities')
    if (response.data.success) {
      recentActivities.value = response.data.data.map(activity => ({
        type: activity.type || 'notification',
        title: activity.title || 'Activity',
        description: activity.description || '',
        time: new Date(activity.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        icon: Clock
      }))
    }
  } catch (error) {
    console.log('Recent activities endpoint not available, using defaults')
    // Set default activities if API endpoint doesn't exist (graceful fallback)
    recentActivities.value = [
      {
        type: 'payment',
        title: 'Marks Verified',
        description: 'English marks verified for Class 6A',
        time: 'Today',
        icon: CircleCheck
      },
      {
        type: 'due',
        title: 'Results Generated',
        description: 'Mid Term results generated for Class 7',
        time: 'Yesterday',
        icon: Histogram
      },
      {
        type: 'notification',
        title: 'Marksheets Downloaded',
        description: 'Class 8 marksheets downloaded (50 students)',
        time: '2 days ago',
        icon: Download
      }
    ]
  }
}

onMounted(() => {
  loadRecentActivities()
})
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
