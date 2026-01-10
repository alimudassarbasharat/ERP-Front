<template>
  <div class="relative w-full min-h-screen pl-0 pr-0 sm:pl-0 sm:pr-0 lg:pl-1 lg:pr-0 py-2 sm:py-3 lg:py-4">
    <!-- Top Bar Header -->
    <div class="relative z-10 w-full mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
      <h2 class="text-base font-medium text-gray-900 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        Exam Terms Management
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-600">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200" @click="$router.push('/exams/center')">Exam Management</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">Terms</span>
      </nav>
    </div>

    <div class="relative z-10 w-full">
    <!-- Action Bar -->
    <div class="mb-4 flex items-center justify-between">
      <button 
        @click="showCreateModal = true"
        class="h-10 px-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2"
      >
        <Plus class="w-4 h-4" />
        Add Term
      </button>
    </div>

    <!-- Terms List -->
    <div class="bg-white/90 rounded-xl shadow-lg border border-gray-200">
      <el-table
        :data="terms"
        v-loading="loading"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="name" label="Term Name" min-width="150">
          <template #default="{ row }">
            <div class="font-semibold text-gray-900 dark:text-gray-100">{{ row.name }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400" v-if="row.code">{{ row.code }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="start_date" label="Start Date" width="120">
          <template #default="{ row }">
            {{ formatDate(row.start_date) }}
          </template>
        </el-table-column>
        <el-table-column prop="end_date" label="End Date" width="120">
          <template #default="{ row }">
            {{ formatDate(row.end_date) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status" width="100">
          <template #default="{ row }">
            <StatusChip 
              :status="row.status"
              :labels="{ active: 'Active', inactive: 'Inactive' }"
            />
          </template>
        </el-table-column>
        <el-table-column prop="exams_count" label="Exams" width="80" align="center">
          <template #default="{ row }">
            <span class="text-gray-600 dark:text-gray-400">{{ row.exams?.length || 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="150" fixed="right">
          <template #default="{ row }">
            <el-button 
              type="primary" 
              link 
              size="small"
              @click="editTerm(row)"
            >
              Edit
            </el-button>
            <el-button 
              type="danger" 
              link 
              size="small"
              @click="deleteTerm(row)"
              :disabled="row.exams?.length > 0"
            >
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <EmptyState 
        v-if="!loading && terms.length === 0"
        title="No Terms Found"
        description="Create your first exam term to get started"
        :icon="Calendar"
      />
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click="showCreateModal = false">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300" @click.stop>
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">{{ editingTerm ? 'Edit Term' : 'Create Term' }}</h3>
        </div>
        
        <form @submit.prevent="saveTerm" class="p-6 space-y-4">
          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Session <span class="text-red-500">*</span></label>
            <div class="relative">
              <select 
                v-model="termForm.session_id" 
                required
                :disabled="editingTerm"
                class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full appearance-none pr-8"
              >
                <option value="">Select Session</option>
                <option v-for="session in sessions" :key="session.id" :value="session.id">
                  {{ session.name }}
                </option>
              </select>
              <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5"/>
                </svg>
              </div>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>

          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Term Name <span class="text-red-500">*</span></label>
            <div class="relative">
              <input 
                v-model="termForm.name"
                type="text" 
                placeholder="e.g., Term-1, Midterm, Final"
                required
                class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
              />
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>

          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Code (Optional)</label>
            <div class="relative">
              <input 
                v-model="termForm.code"
                type="text" 
                placeholder="e.g., T1, MT, F"
                class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
              />
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>

          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Start Date <span class="text-red-500">*</span></label>
            <div class="relative">
              <input 
                v-model="termForm.start_date"
                type="date" 
                required
                class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
              />
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>

          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">End Date <span class="text-red-500">*</span></label>
            <div class="relative">
              <input 
                v-model="termForm.end_date"
                type="date" 
                required
                class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
              />
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>

          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</label>
            <div class="flex gap-4">
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  v-model="termForm.status" 
                  value="active"
                  class="w-4 h-4 text-purple-600 focus:ring-purple-500"
                />
                <span class="text-sm text-gray-600">Active</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  v-model="termForm.status" 
                  value="inactive"
                  class="w-4 h-4 text-purple-600 focus:ring-purple-500"
                />
                <span class="text-sm text-gray-600">Inactive</span>
              </label>
            </div>
          </div>

          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Order</label>
            <div class="relative">
              <input 
                v-model.number="termForm.order"
                type="number" 
                min="0"
                class="h-10 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
              />
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>

          <div class="flex flex-col w-full">
            <label class="mb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</label>
            <div class="relative">
              <textarea 
                v-model="termForm.description"
                placeholder="Optional description"
                rows="3"
                class="border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full resize-none"
              ></textarea>
              <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
            </div>
          </div>

          <div class="flex gap-3 pt-4">
            <button 
              type="button"
              @click="showCreateModal = false"
              class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 text-sm font-bold text-white shadow hover:from-gray-600 hover:to-slate-600 transition-all duration-300"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="saving"
              class="flex-1 h-10 px-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50"
            >
              {{ saving ? 'Saving...' : (editingTerm ? 'Update' : 'Create') }}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { Plus, Calendar } from '@element-plus/icons-vue'
import api from '@/utils/axios'
import StatusChip from '@/components/common/StatusChip.vue'
import EmptyState from '@/components/common/EmptyState.vue'

const toast = useToast()
const loading = ref(false)
const saving = ref(false)
const terms = ref([])
const sessions = ref([])
const showCreateModal = ref(false)
const editingTerm = ref(null)

const termForm = ref({
  session_id: null,
  name: '',
  code: '',
  start_date: null,
  end_date: null,
  status: 'active',
  order: 0,
  description: ''
})

onMounted(() => {
  loadTerms()
  loadSessions()
})

const loadSessions = async () => {
  try {
    const response = await api.get('/sessions/select-options')
    sessions.value = response.data.result || []
  } catch (error) {
    console.error('Failed to load sessions:', error)
  }
}

const loadTerms = async () => {
  loading.value = true
  try {
    const response = await api.get('/exam-terms')
    if (response.data.success) {
      terms.value = response.data.data || []
    }
  } catch (error) {
    toast.error('Failed to load terms')
    console.error(error)
  } finally {
    loading.value = false
  }
}

const saveTerm = async () => {
  if (!termForm.value.session_id || !termForm.value.name || !termForm.value.start_date || !termForm.value.end_date) {
    toast.error('Please fill all required fields')
    return
  }

  if (new Date(termForm.value.end_date) <= new Date(termForm.value.start_date)) {
    toast.error('End date must be after start date')
    return
  }

  saving.value = true
  try {
    if (editingTerm.value) {
      await api.put(`/exam-terms/${editingTerm.value.id}`, termForm.value)
      toast.success('Term updated successfully')
    } else {
      await api.post('/exam-terms', termForm.value)
      toast.success('Term created successfully')
    }
    showCreateModal.value = false
    resetForm()
    loadTerms()
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to save term')
  } finally {
    saving.value = false
  }
}

const editTerm = (term) => {
  editingTerm.value = term
  termForm.value = {
    session_id: term.session_id,
    name: term.name,
    code: term.code || '',
    start_date: term.start_date,
    end_date: term.end_date,
    status: term.status,
    order: term.order || 0,
    description: term.description || ''
  }
  showCreateModal.value = true
}

const deleteTerm = async (term) => {
  if (term.exams?.length > 0) {
    toast.error('Cannot delete term: It has associated exams')
    return
  }

  try {
    await api.delete(`/exam-terms/${term.id}`)
    toast.success('Term deleted successfully')
    loadTerms()
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to delete term')
  }
}

const resetForm = () => {
  editingTerm.value = null
  termForm.value = {
    session_id: null,
    name: '',
    code: '',
    start_date: null,
    end_date: null,
    status: 'active',
    order: 0,
    description: ''
  }
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>
