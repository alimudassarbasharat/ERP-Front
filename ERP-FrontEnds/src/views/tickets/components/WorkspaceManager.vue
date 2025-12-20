<template>
  <div class="workspace-manager">
    <el-dropdown trigger="click" @command="handleWorkspaceSelect">
      <div class="workspace-dropdown-trigger">
        <Briefcase :size="18" />
        <span class="workspace-name">{{ currentWorkspaceName }}</span>
        <ChevronDown :size="16" class="chevron" />
      </div>
      <template #dropdown>
        <el-dropdown-menu class="workspace-menu">
          <div class="menu-header">
            <span class="menu-title">Workspaces</span>
            <button @click="showCreateWorkspace = true" class="btn-add-workspace">
              <Plus :size="14" />
            </button>
          </div>
          
          <el-dropdown-item command="all" :class="{ active: selectedWorkspace === 'all' }">
            <Layers :size="16" />
            <span>All Departments</span>
            <span class="workspace-count">{{ getTotalTickets() }}</span>
          </el-dropdown-item>
          
          <div class="menu-divider"></div>
          
          <el-dropdown-item 
            v-for="workspace in workspaces" 
            :key="workspace.id"
            :command="workspace.id"
            :class="{ active: selectedWorkspace === workspace.id }"
          >
            <div class="workspace-icon" :style="{ background: workspace.color }">
              <component :is="workspace.icon" :size="14" />
            </div>
            <span>{{ workspace.name }}</span>
            <span class="workspace-count">{{ getWorkspaceTicketCount(workspace.id) }}</span>
          </el-dropdown-item>
          
          <div class="menu-divider"></div>
          
          <el-dropdown-item command="create" class="create-workspace-item">
            <Plus :size="16" />
            <span>Create Workspace</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <!-- Create Workspace Modal -->
    <el-dialog
      v-model="showCreateWorkspace"
      title="Create New Workspace"
      width="500px"
      :show-close="true"
      class="workspace-dialog"
    >
      <div class="create-workspace-form">
        <div class="form-group">
          <label>Workspace Name</label>
          <el-input
            v-model="newWorkspace.name"
            placeholder="e.g., Marketing Team"
            size="large"
          />
        </div>
        
        <div class="form-group">
          <label>Choose Icon</label>
          <div class="icon-grid">
            <div 
              v-for="icon in availableIcons" 
              :key="icon.name"
              @click="newWorkspace.icon = icon.component"
              class="icon-option"
              :class="{ selected: newWorkspace.icon === icon.component }"
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
              @click="newWorkspace.color = color"
              class="color-option"
              :class="{ selected: newWorkspace.color === color }"
              :style="{ background: color }"
            >
              <Check v-if="newWorkspace.color === color" :size="16" class="check-icon" />
            </div>
          </div>
        </div>
      </div>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showCreateWorkspace = false">Cancel</el-button>
          <el-button type="primary" @click="createWorkspace" :disabled="!newWorkspace.name.trim()">
            Create Workspace
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
import {
  Briefcase,
  ChevronDown,
  Plus,
  Layers,
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
  name: 'WorkspaceManager',
  components: {
    Briefcase,
    ChevronDown,
    Plus,
    Layers,
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
  },
  props: {
    selectedWorkspace: {
      type: String,
      default: 'all'
    },
    tickets: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:selectedWorkspace', 'workspace-created'],
  setup(props, { emit }) {
    const toast = useToast()
    const showCreateWorkspace = ref(false)
    const loading = ref(true)
    
    const workspaces = ref([])

    const newWorkspace = ref({
      name: '',
      icon: Code,
      color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
    })

    const availableIcons = [
      { name: 'Code', component: Code },
      { name: 'Dollar', component: DollarSign },
      { name: 'Graduation', component: GraduationCap },
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

    const currentWorkspaceName = computed(() => {
      if (props.selectedWorkspace === 'all') return 'All Departments'
      const workspace = workspaces.value.find(w => w.id === props.selectedWorkspace)
      return workspace ? workspace.name : 'All Departments'
    })

    const getTotalTickets = () => {
      return props.tickets.length
    }

    const getWorkspaceTicketCount = (workspaceId) => {
      return props.tickets.filter(t => t.workspace === workspaceId).length
    }

    const handleWorkspaceSelect = (command) => {
      if (command === 'create') {
        showCreateWorkspace.value = true
      } else {
        emit('update:selectedWorkspace', command)
      }
    }

    /**
     * Load workspaces from backend
     */
    const loadWorkspaces = async () => {
      try {
        loading.value = true
        const response = await ticketService.getWorkspaces()
        
        if (response.success) {
          workspaces.value = response.data.map(ws => ({
            id: ws.id,
            name: ws.name,
            icon: getIconComponent(ws.icon),
            color: ws.color
          }))
        }
      } catch (error) {
        console.error('Error loading workspaces:', error)
        toast.error('Failed to load workspaces')
      } finally {
        loading.value = false
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

    const createWorkspace = async () => {
      if (!newWorkspace.value.name.trim()) return

      try {
        const iconName = availableIcons.find(i => i.component === newWorkspace.value.icon)?.name || 'Code'
        
        const workspaceData = {
          name: newWorkspace.value.name,
          icon: iconName,
          color: newWorkspace.value.color
        }

        const response = await ticketService.createWorkspace(workspaceData)
        
        if (response.success) {
          await loadWorkspaces() // Reload workspaces
          emit('workspace-created', response.data)
          toast.success('Workspace created successfully!')
          
          showCreateWorkspace.value = false
          newWorkspace.value = {
            name: '',
            icon: Code,
            color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
          }
        }
      } catch (error) {
        console.error('Error creating workspace:', error)
        toast.error('Failed to create workspace')
      }
    }

    // Load workspaces on mount and expose reload method
    onMounted(() => {
      loadWorkspaces()
    })

    // Expose loadWorkspaces for parent component
    defineExpose({
      loadWorkspaces
    })

    return {
      showCreateWorkspace,
      loading,
      workspaces,
      newWorkspace,
      availableIcons,
      availableColors,
      currentWorkspaceName,
      getTotalTickets,
      getWorkspaceTicketCount,
      handleWorkspaceSelect,
      createWorkspace,
      loadWorkspaces
    }
  }
}
</script>

<style scoped>
.workspace-dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 1.25rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 240px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
}

.workspace-dropdown-trigger::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(180deg, #8b5cf6, #7c3aed);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.workspace-dropdown-trigger:hover {
  border-color: #8b5cf6;
  background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
}

.workspace-dropdown-trigger:hover::before {
  opacity: 1;
}

.workspace-name {
  flex: 1;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.01em;
}

.workspace-dropdown-trigger:hover .workspace-name {
  color: #8b5cf6;
}

.chevron {
  color: #94a3b8;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.workspace-dropdown-trigger:hover .chevron {
  color: #8b5cf6;
  transform: rotate(180deg);
}

:deep(.el-dropdown-menu) {
  padding: 0.5rem !important;
  border-radius: 12px !important;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15) !important;
  border: 1px solid #e2e8f0 !important;
  min-width: 280px !important;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
}

.menu-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.btn-add-workspace {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: none;
  background: #f3e8ff;
  color: #8b5cf6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-add-workspace:hover {
  background: #8b5cf6;
  color: white;
}

:deep(.el-dropdown-menu__item) {
  display: flex !important;
  align-items: center !important;
  gap: 0.75rem !important;
  padding: 0.75rem 1rem !important;
  border-radius: 8px !important;
  margin: 0.25rem 0 !important;
  font-size: 0.95rem !important;
  font-weight: 500 !important;
  color: #475569 !important;
  transition: all 0.2s ease !important;
}

:deep(.el-dropdown-menu__item:hover) {
  background: #f8fafc !important;
  color: #1e293b !important;
}

:deep(.el-dropdown-menu__item.active) {
  background: #f3e8ff !important;
  color: #8b5cf6 !important;
  font-weight: 600 !important;
}

.workspace-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.workspace-count {
  margin-left: auto;
  background: #f1f5f9;
  padding: 0.125rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
}

:deep(.el-dropdown-menu__item.active) .workspace-count {
  background: #e9d5ff;
  color: #8b5cf6;
}

.menu-divider {
  height: 1px;
  background: #e2e8f0;
  margin: 0.5rem 0;
}

.create-workspace-item {
  color: #8b5cf6 !important;
  font-weight: 600 !important;
}

/* Create Workspace Form */
.create-workspace-form {
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
  width: 48px;
  height: 48px;
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
  width: 100%;
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

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

:deep(.el-dialog) {
  border-radius: 16px !important;
}

:deep(.el-dialog__header) {
  padding: 1.5rem 2rem !important;
  border-bottom: 1px solid #e2e8f0 !important;
}

:deep(.el-dialog__title) {
  font-size: 1.25rem !important;
  font-weight: 700 !important;
  color: #1e293b !important;
}

:deep(.el-dialog__body) {
  padding: 2rem !important;
}

:deep(.el-button) {
  border-radius: 8px !important;
  font-weight: 600 !important;
}
</style>

