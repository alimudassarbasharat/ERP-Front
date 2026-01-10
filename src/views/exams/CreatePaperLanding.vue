<template>
  <PageShell 
    title="Create Paper"
    :breadcrumbs="[
      { label: 'Exams', to: '/exams/add-marksheet-landing' },
      { label: 'Create Paper' }
    ]"
  >
    <!-- Header Info -->
    <div class="w-full mb-6">
      <div class="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center flex-shrink-0">
            <el-icon class="text-white text-2xl"><Document /></el-icon>
          </div>
          <div class="flex-1">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Exam & Paper Creation Center</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Create exam papers, build datesheets, configure settings, and generate marksheets—everything you need to set up exams!
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION A: Create Paper / Exam -->
    <div class="w-full mb-6">
      <SectionHeader title="Create Paper / Exam" subtitle="Set up new exams and papers" :icon="Plus" />
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        <!-- Create New Exam -->
        <div 
          @click="showCreateExamModal = true"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center group-hover:from-blue-500 group-hover:to-indigo-500 transition-all duration-300">
              <el-icon class="text-blue-600 group-hover:text-white text-2xl transition-all duration-300">
                <Plus />
              </el-icon>
            </div>
            <el-icon class="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-all duration-300">
              <ArrowRight />
            </el-icon>
          </div>
          
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300">
            Create New Exam
          </h3>
          
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Create exam/term/paper: select session, enter name/type (Mid/Final/Monthly/Unit), and save
          </p>
          
          <div class="flex flex-wrap gap-2">
            <span class="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Quick Setup</span>
            <span class="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">Session Based</span>
          </div>
        </div>

        <!-- Copy from Template -->
        <div 
          @click="showTemplateModal = true"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
              <el-icon class="text-purple-600 group-hover:text-white text-2xl transition-all duration-300">
                <CopyDocument />
              </el-icon>
            </div>
            <el-icon class="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-all duration-300">
              <ArrowRight />
            </el-icon>
          </div>
          
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-all duration-300">
            Copy from Template
          </h3>
          
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Duplicate settings from last term. Saves time by copying subjects, totals, and configurations
          </p>
          
          <div class="flex flex-wrap gap-2">
            <span class="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">Time Saver</span>
            <span class="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400">Copy Settings</span>
          </div>
        </div>

        <!-- Manage Existing Exams -->
        <div 
          @click="router.push('/exams/manage')"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center group-hover:from-green-500 group-hover:to-emerald-500 transition-all duration-300">
              <el-icon class="text-green-600 group-hover:text-white text-2xl transition-all duration-300">
                <Setting />
              </el-icon>
            </div>
            <el-icon class="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-all duration-300">
              <ArrowRight />
            </el-icon>
          </div>
          
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-all duration-300">
            Manage Existing Exams
          </h3>
          
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            View, edit, or delete existing exams. Update exam details, dates, and configurations
          </p>
          
          <div class="flex flex-wrap gap-2">
            <span class="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Edit</span>
            <span class="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Delete</span>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION B: Make Datesheet (MANDATORY) -->
    <div class="w-full mb-6">
      <SectionHeader 
        title="Make Datesheet" 
        subtitle="Build exam schedule with date, time, and room assignments (MANDATORY)" 
        :icon="Calendar" 
      />
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <!-- Create Datesheet -->
        <div 
          @click="router.push('/exams/datesheet')"
          class="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-orange-300 dark:border-orange-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group overflow-hidden"
        >
          <!-- MANDATORY Badge -->
          <div class="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            🔥 REQUIRED
          </div>
          
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center group-hover:from-orange-500 group-hover:to-amber-500 transition-all duration-300">
              <el-icon class="text-orange-600 group-hover:text-white text-2xl transition-all duration-300">
                <Calendar />
              </el-icon>
            </div>
            <el-icon class="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-all duration-300">
              <ArrowRight />
            </el-icon>
          </div>
          
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-all duration-300">
            Build Datesheet
          </h3>
          
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Select session/exam/class, assign exam date, start/end time, and room/notes for each subject. Auto-detects time conflicts!
          </p>
          
          <div class="flex flex-wrap gap-2">
            <span class="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">Date & Time</span>
            <span class="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Conflict Check</span>
            <span class="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">Mandatory</span>
          </div>
        </div>

        <!-- View/Print Datesheet -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-start gap-4 mb-4">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center flex-shrink-0">
              <el-icon class="text-blue-600 text-2xl"><View /></el-icon>
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-gray-900 dark:text-white mb-2">Datesheet Features</h4>
              <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li class="flex items-start gap-2">
                  <span class="text-orange-600 dark:text-orange-400 mt-0.5">✓</span>
                  <span><strong>Assign Dates:</strong> Set exam date for each subject</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-600 dark:text-blue-400 mt-0.5">✓</span>
                  <span><strong>Time Slots:</strong> Define start/end time (optional)</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-purple-600 dark:text-purple-400 mt-0.5">✓</span>
                  <span><strong>Room Assignment:</strong> Add room number/notes</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                  <span><strong>Conflict Detection:</strong> Auto-detect duplicate time slots per class</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-indigo-600 dark:text-indigo-400 mt-0.5">✓</span>
                  <span><strong>Export/Print:</strong> Download or print formatted datesheet</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="flex gap-3 mt-4">
            <button 
              @click="router.push('/exams/datesheet')"
              class="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 font-semibold text-sm"
            >
              View Datesheets
            </button>
            <button 
              class="flex-1 px-4 py-2 bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 border-2 border-blue-500 dark:border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 font-semibold text-sm"
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION C: Paper Settings -->
    <div class="w-full mb-6">
      <SectionHeader title="Paper Settings" subtitle="Configure default settings for papers" :icon="Setting" />
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <!-- Default Totals -->
        <div 
          @click="router.push('/exams/paper-settings')"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 flex items-center justify-center group-hover:from-teal-500 group-hover:to-cyan-500 transition-all duration-300">
              <el-icon class="text-teal-600 group-hover:text-white text-2xl transition-all duration-300">
                <Rank />
              </el-icon>
            </div>
            <el-icon class="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-all duration-300">
              <ArrowRight />
            </el-icon>
          </div>
          
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-all duration-300">
            Total Marks Default
          </h3>
          
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Set default total marks for all subjects
          </p>
        </div>

        <!-- Components Setup -->
        <div 
          @click="router.push('/exams/paper-settings')"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 flex items-center justify-center group-hover:from-pink-500 group-hover:to-rose-500 transition-all duration-300">
              <el-icon class="text-pink-600 group-hover:text-white text-2xl transition-all duration-300">
                <Grid />
              </el-icon>
            </div>
            <el-icon class="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-all duration-300">
              <ArrowRight />
            </el-icon>
          </div>
          
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-all duration-300">
            Theory / Practical
          </h3>
          
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Configure mark components (if supported)
          </p>
        </div>

        <!-- Passing Rules -->
        <div 
          @click="router.push('/exams/paper-settings')"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 flex items-center justify-center group-hover:from-emerald-500 group-hover:to-green-500 transition-all duration-300">
              <el-icon class="text-emerald-600 group-hover:text-white text-2xl transition-all duration-300">
                <SuccessFilled />
              </el-icon>
            </div>
            <el-icon class="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-all duration-300">
              <ArrowRight />
            </el-icon>
          </div>
          
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-all duration-300">
            Passing Marks Rules
          </h3>
          
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Define passing marks criteria (if supported)
          </p>
        </div>
      </div>
    </div>

    <!-- SECTION D: Quick Actions -->
    <div class="w-full">
      <SectionHeader title="Quick Actions" subtitle="Shortcuts to frequently used features" :icon="Pointer" />
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <button 
          @click="router.push('/exams/marksheet-subject-wise')"
          class="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-2 border-purple-300 dark:border-purple-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300 group"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
              <el-icon class="text-white text-2xl"><EditPen /></el-icon>
            </div>
            <div class="text-left">
              <div class="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-all duration-300">
                Generate Marksheet
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Jump to marks entry for this exam
              </div>
            </div>
          </div>
          <el-icon class="text-gray-400 group-hover:text-purple-500 transition-all duration-300 text-xl">
            <ArrowRight />
          </el-icon>
        </button>

        <button 
          @click="router.push('/exams/terms')"
          class="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-300 dark:border-blue-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 group"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <el-icon class="text-white text-2xl"><Calendar /></el-icon>
            </div>
            <div class="text-left">
              <div class="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300">
                Manage Terms
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                View and manage exam terms
              </div>
            </div>
          </div>
          <el-icon class="text-gray-400 group-hover:text-blue-500 transition-all duration-300 text-xl">
            <ArrowRight />
          </el-icon>
        </button>
      </div>
    </div>

    <!-- Create Exam Modal -->
    <el-dialog
      v-model="showCreateExamModal"
      title="Create New Exam"
      width="500px"
    >
      <el-form :model="examForm" label-width="120px">
        <el-form-item label="Session">
          <el-select v-model="examForm.session_id" placeholder="Select Session" class="w-full">
            <el-option label="2024-2025" value="1" />
            <el-option label="2025-2026" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="Exam Name">
          <el-input v-model="examForm.name" placeholder="e.g., Mid Term" />
        </el-form-item>
        <el-form-item label="Exam Type">
          <el-select v-model="examForm.type" placeholder="Select Type" class="w-full">
            <el-option label="Mid Term" value="mid" />
            <el-option label="Final Term" value="final" />
            <el-option label="Monthly Test" value="monthly" />
            <el-option label="Unit Test" value="unit" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showCreateExamModal = false">Cancel</el-button>
        <el-button type="primary" @click="createExam">Create Exam</el-button>
      </template>
    </el-dialog>

    <!-- Template Modal -->
    <el-dialog
      v-model="showTemplateModal"
      title="Copy from Template"
      width="500px"
    >
      <p class="mb-4 text-gray-600 dark:text-gray-400">Select a previous exam to copy its settings:</p>
      <el-select v-model="selectedTemplate" placeholder="Select Template Exam" class="w-full">
        <el-option label="Mid Term 2024" value="1" />
        <el-option label="Final Term 2024" value="2" />
      </el-select>
      <template #footer>
        <el-button @click="showTemplateModal = false">Cancel</el-button>
        <el-button type="primary" @click="copyTemplate">Copy Template</el-button>
      </template>
    </el-dialog>
  </PageShell>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { 
  Document, Plus, ArrowRight, Calendar, Setting, EditPen, CopyDocument,
  View, Rank, Grid, SuccessFilled, Pointer
} from '@element-plus/icons-vue'
import PageShell from '@/components/common/PageShell.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import api from '@/utils/axios'

const router = useRouter()
const toast = useToast()

const showCreateExamModal = ref(false)
const showTemplateModal = ref(false)
const selectedTemplate = ref('')

const examForm = ref({
  session_id: '',
  name: '',
  type: ''
})

const createExam = async () => {
  try {
    const response = await api.post('/exams/store', examForm.value)
    if (response.data.success) {
      toast.success('Exam created successfully!')
      showCreateExamModal.value = false
      examForm.value = { session_id: '', name: '', type: '' }
      router.push('/exams/manage')
    }
  } catch (error) {
    toast.error('Failed to create exam')
    console.error('Create exam error:', error)
  }
}

const copyTemplate = () => {
  toast.info('Template copy feature coming soon!')
  showTemplateModal.value = false
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
