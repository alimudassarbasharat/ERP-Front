<template>
  <div class="workspace-sidebar">
    <!-- Sidebar Header -->
    <div class="sidebar-header">
      <h3 class="sidebar-title">
        <Briefcase :size="18" />
        Workspaces
      </h3>
      <button @click="showCreateModal = true" class="btn-add-workspace">
        <Plus :size="16" />
      </button>
    </div>

    <!-- Workspaces List -->
    <div class="workspaces-list">
      <!-- All Workspaces Option -->
      <div 
        class="workspace-item all" 
        :class="{ active: selectedWorkspace === 'all' }"
        @click="selectWorkspace('all')"
      >
        <div class="workspace-icon-wrapper">
          <div class="workspace-icon" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed);">
            <Layers :size="16" />
          </div>
        </div>
        <div class="workspace-info">
          <span class="workspace-name">All Departments</span>
          <span class="workspace-count">{{ totalTickets }}</span>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Dynamic Workspaces -->
      <div 
        v-for="workspace in workspaces" 
        :key="workspace.id"
        class="workspace-item"
        :class="{ active: selectedWorkspace === workspace.id }"
        @click="selectWorkspace(workspace.id)"
      >
        <div class="workspace-icon-wrapper">
          <div class="workspace-icon" :style="{ background: workspace.color }">
            <component :is="workspace.icon" :size="16" />
          </div>
        </div>
        <div class="workspace-info">
          <span class="workspace-name">{{ workspace.name }}</span>
          <span class="workspace-count">{{ getWorkspaceTicketCount(workspace.id) }}</span>
        </div>
        <div class="workspace-actions">
          <button @click.stop="editWorkspace(workspace)" class="action-btn">
            <Edit2 :size="14" />
          </button>
          <button @click.stop="deleteWorkspace(workspace)" class="action-btn delete">
            <Trash2 :size="14" />
          </button>
        </div>
      </div>

      <!-- Create New Workspace Button -->
      <button @click="showCreateModal = true" class="create-workspace-btn">
        <Plus :size="16" />
        <span>Create Workspace</span>
      </button>
    </div>

    <!-- Create/Edit Workspace Modal -->
    <el-dialog
      v-model="showCreateModal"
      :title="editingWorkspace ? 'Edit Workspace' : 'Create New Workspace'"
      width="500px"
      class="workspace-dialog"
    >
      <div class="workspace-form">
        <div class="form-group">
          <label>Workspace Name *</label>
          <el-input
            v-model="formData.name"
            placeholder="e.g., Marketing Team"
            size="large"
          />
        </div>
        
        <div class="form-group">
          <label>Parent Workspace (Optional)</label>
          <el-select v-model="formData.parent_id" placeholder="Select parent workspace" clearable size="large" class="w-full">
            <el-option
              v-for="ws in workspaces"
              :key="ws.id"
              :label="ws.name"
              :value="ws.id"
            >
              <div class="workspace-option">
                <div class="workspace-icon-mini" :style="{ background: ws.color }">
                  <component :is="ws.icon" :size="10" />
                </div>
                <span>{{ ws.name }}</span>
              </div>
            </el-option>
          </el-select>
        </div>
        
        <div class="form-group">
          <label>Choose Icon</label>
          <div class="icon-grid">
            <div 
              v-for="icon in availableIcons" 
              :key="icon.name"
              @click="formData.icon = icon.component"
              class="icon-option"
              :class="{ selected: formData.icon === icon.component }"
            >
              <component :is="icon.component" :size="20" />
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label>Choose Color</label>
          <div class="color-grid">
            <div 
              v-for="color in availableColors" 
              :key="color"
              @click="formData.color = color"
              class="color-option"
              :class="{ selected: formData.color === color }"
              :style="{ background: color }"
            >
              <Check v-if="formData.color === color" :size="16" class="check-icon" />
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>Description (Optional)</label>
          <el-input
            v-model="formData.description"
            type="textarea"
            :rows="3"
            placeholder="Describe this workspace..."
          />
        </div>
      </div>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeModal">Cancel</el-button>
          <el-button type="primary" @click="saveWorkspace" :disabled="!formData.name.trim()">
            {{ editingWorkspace ? 'Update' : 'Create' }} Workspace
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import ticketService from '@/services/ticketService'
import { ElMessageBox } from 'element-plus'
import {
  Briefcase,
  Plus,
  Layers,
  Edit2,
  Trash2,
  Code,
  DollarSign,
  GraduationCap,
  Users,
  Settings,
  Zap,
  Target,
  Rocket,
  Heart,
  Star,
  Check
} from 'lucide-vue-next'

export default {
  name: 'WorkspaceSidebar',
  components: {
    Briefcase, Plus, Layers, Edit2, Trash2,
    Code, DollarSign, GraduationCap, Users, Settings,
    Zap, Target, Rocket, Heart, Star, Check
  },
  props: {
    selectedWorkspace: {
      type: [String, Number],
      default: 'all'
    }
  },
  emits: ['update:selectedWorkspace', 'workspace-created', 'workspace-updated', 'workspace-deleted'],
  setup(props, { emit }) {
    const toast = useToast()
    const loading = ref(true)
    const showCreateModal = ref(false)
    const editingWorkspace = ref(null)
    const workspaces = ref([])

    const formData = ref({
      name: '',
      parent_id: null,
      icon: Code,
      color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      description: ''
    })

    const availableIcons = [
      { name: 'Code', component: Code },
      { name: 'DollarSign', component: DollarSign },
      { name: 'GraduationCap', component: GraduationCap },
      { name: 'Users', component: Users },
      { name: 'Settings', component: Settings },
      { name: 'Zap', component: Zap },
      { name: 'Target', component: Target },
      { name: 'Rocket', component: Rocket },
      { name: 'Heart', component: Heart },
      { name: 'Star', component: Star }
    ]

    const availableColors = [
      'linear-gradient(135deg, #3b82f6, #2563eb)',
      'linear-gradient(135deg, #10b981, #059669)',
      'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      'linear-gradient(135deg, #f59e0b, #d97706)',
      'linear-gradient(135deg, #ef4444, #dc2626)',
      'linear-gradient(135deg, #ec4899, #db2777)',
      'linear-gradient(135deg, #06b6d4, #0891b2)',
      'linear-gradient(135deg, #64748b, #475569)'
    ]

    const workspaceStats = ref({})

    const totalTickets = computed(() => {
      return Object.values(workspaceStats.value).reduce((sum, count) => sum + count, 0)
    })

    const getWorkspaceTicketCount = (workspaceId) => {
      return workspaceStats.value[workspaceId] || 0
    }

    const selectWorkspace = (workspaceId) => {
      emit('update:selectedWorkspace', workspaceId)
    }

    const loadWorkspaces = async () => {
      try {
        loading.value = true
        const response = await ticketService.getWorkspaces()
        
        if (response.success) {
          workspaces.value = response.data.map(ws => ({
            id: ws.id,
            name: ws.name,
            icon: getIconComponent(ws.icon),
            color: ws.color,
            description: ws.description
          }))
          
          // Load ticket counts for each workspace
          await loadWorkspaceStats()
        }
      } catch (error) {
        console.error('Error loading workspaces:', error)
        toast.error('Failed to load workspaces')
      } finally {
        loading.value = false
      }
    }

    const loadWorkspaceStats = async () => {
      try {
        // Get statistics for all workspaces
        const statsResponse = await ticketService.getStatistics()
        
        if (statsResponse.success) {
          // Fetch individual workspace counts
          for (const workspace of workspaces.value) {
            try {
              const wsResponse = await ticketService.getWorkspaceStats(workspace.id)
              if (wsResponse.success) {
                workspaceStats.value[workspace.id] = wsResponse.data.total_tickets || 0
              }
            } catch (error) {
              console.error(`Error loading stats for workspace ${workspace.id}:`, error)
              workspaceStats.value[workspace.id] = 0
            }
          }
        }
      } catch (error) {
        console.error('Error loading workspace stats:', error)
      }
    }

    const getIconComponent = (iconName) => {
      const iconMap = {
        'Code': Code,
        'DollarSign': DollarSign,
        'GraduationCap': GraduationCap,
        'Users': Users,
        'Settings': Settings,
        'Zap': Zap,
        'Target': Target,
        'Rocket': Rocket,
        'Heart': Heart,
        'Star': Star
      }
      return iconMap[iconName] || Code
    }

    const editWorkspace = (workspace) => {
      editingWorkspace.value = workspace
      formData.value = {
        name: workspace.name,
        parent_id: null,
        icon: workspace.icon,
        color: workspace.color,
        description: workspace.description || ''
      }
      showCreateModal.value = true
    }

    const deleteWorkspace = async (workspace) => {
      try {
        await ElMessageBox.confirm(
          `Are you sure you want to delete "${workspace.name}"?`,
          'Delete Workspace',
          {
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        )

        // Call API to delete
        await ticketService.deleteWorkspace(workspace.id)
        await loadWorkspaces()
        emit('workspace-deleted', workspace)
        toast.success('Workspace deleted successfully')
      } catch (error) {
        if (error !== 'cancel') {
          console.error('Error deleting workspace:', error)
          toast.error('Failed to delete workspace')
        }
      }
    }

    const saveWorkspace = async () => {
      if (!formData.value.name.trim()) return

      try {
        const iconName = availableIcons.find(i => i.component === formData.value.icon)?.name || 'Code'
        
        const workspaceData = {
          name: formData.value.name,
          icon: iconName,
          color: formData.value.color,
          description: formData.value.description,
          parent_id: formData.value.parent_id
        }

        if (editingWorkspace.value) {
          // Update existing workspace
          await ticketService.updateWorkspace(editingWorkspace.value.id, workspaceData)
          toast.success('Workspace updated successfully!')
          emit('workspace-updated', workspaceData)
        } else {
          // Create new workspace
          const response = await ticketService.createWorkspace(workspaceData)
          if (response.success) {
            toast.success('Workspace created successfully!')
            emit('workspace-created', response.data)
          }
        }

        await loadWorkspaces()
        closeModal()
      } catch (error) {
        console.error('Error saving workspace:', error)
        toast.error('Failed to save workspace')
      }
    }

    const closeModal = () => {
      showCreateModal.value = false
      editingWorkspace.value = null
      formData.value = {
        name: '',
        parent_id: null,
        icon: Code,
        color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
        description: ''
      }
    }

    onMounted(() => {
      loadWorkspaces()
    })

    return {
      loading,
      workspaces,
      workspaceStats,
      showCreateModal,
      editingWorkspace,
      formData,
      availableIcons,
      availableColors,
      totalTickets,
      getWorkspaceTicketCount,
      selectWorkspace,
      editWorkspace,
      deleteWorkspace,
      saveWorkspace,
      closeModal,
      loadWorkspaces,
      loadWorkspaceStats
    }
  }
}
</script>

<style scoped>
.workspace-sidebar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e2e8f0;
  background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);
}

.sidebar-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #1e293b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.btn-add-workspace {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.2);
}

.btn-add-workspace:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.workspaces-list {
  flex: 1;
  overflow-y: auto;
  padding: 0.75rem;
}

.workspace-item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 0.75rem;
  margin-bottom: 0.375rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  border: 2px solid transparent;
}

.workspace-item:hover {
  background: #f8fafc;
  border-color: #e2e8f0;
}

.workspace-item.active {
  background: linear-gradient(135deg, #f3e8ff 0%, #faf5ff 100%);
  border-color: #8b5cf6;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.15);
}

.workspace-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 60%;
  background: linear-gradient(180deg, #8b5cf6, #7c3aed);
  border-radius: 0 2px 2px 0;
}

.workspace-icon-wrapper {
  flex-shrink: 0;
}

.workspace-icon {
  width: 32px;
  height: 32px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.workspace-item:hover .workspace-icon {
  transform: scale(1.1);
}

.workspace-item.active .workspace-icon {
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.workspace-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 0;
}

.workspace-name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #475569;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.workspace-item.active .workspace-name {
  color: #8b5cf6;
  font-weight: 700;
}

.workspace-count {
  background: #e2e8f0;
  color: #64748b;
  padding: 0.125rem 0.5rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.workspace-item.active .workspace-count {
  background: #e9d5ff;
  color: #8b5cf6;
}

.workspace-actions {
  display: none;
  gap: 0.25rem;
}

.workspace-item:hover .workspace-actions {
  display: flex;
}

.action-btn {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: none;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #f1f5f9;
  color: #1e293b;
}

.action-btn.delete:hover {
  background: #fee2e2;
  color: #ef4444;
}

.divider {
  height: 1px;
  background: #e2e8f0;
  margin: 0.75rem 0;
}

.create-workspace-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  margin-top: 0.5rem;
  border: 2px dashed #cbd5e1;
  border-radius: 10px;
  background: transparent;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.create-workspace-btn:hover {
  border-color: #8b5cf6;
  background: #f3e8ff;
  color: #8b5cf6;
}

/* Form Styles */
.workspace-form {
  padding: 1rem 0;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.5rem;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.75rem;
}

.icon-option {
  aspect-ratio: 1;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #64748b;
}

.icon-option:hover {
  border-color: #8b5cf6;
  background: #f3e8ff;
  color: #8b5cf6;
}

.icon-option.selected {
  border-color: #8b5cf6;
  background: #8b5cf6;
  color: white;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

.color-option {
  aspect-ratio: 1;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-option:hover {
  transform: scale(1.05);
  border-color: #1e293b;
}

.color-option.selected {
  border-color: #1e293b;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.check-icon {
  color: white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.workspace-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.workspace-icon-mini {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

/* Scrollbar */
.workspaces-list::-webkit-scrollbar {
  width: 6px;
}

.workspaces-list::-webkit-scrollbar-track {
  background: transparent;
}

.workspaces-list::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #c084fc, #a855f7);
  border-radius: 3px;
}

.workspaces-list::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #a855f7, #9333ea);
}
</style>

