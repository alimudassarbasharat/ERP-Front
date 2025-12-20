<template>
  <!-- Loading State -->
  <div v-if="initialLoading" class="loading-container">
    <div class="custom-loader">
      <div class="loader-spinner"></div>
      <div class="loader-text">Loading Ticket System...</div>
      <div class="loader-subtext">Please wait while we fetch your workspaces and tickets</div>
    </div>
  </div>

  <!-- Main Content -->
  <div v-else class="ticket-system-layout">
    <!-- Left Sidebar - Workspaces -->
    <div class="workspace-sidebar-container">
      <WorkspaceSidebar
        ref="workspaceSidebarRef"
        v-model:selectedWorkspace="selectedWorkspace"
        @workspace-created="handleWorkspaceCreated"
        @workspace-updated="handleWorkspaceUpdated"
        @workspace-deleted="handleWorkspaceDeleted"
      />
    </div>

    <!-- Main Content -->
    <div class="ticket-main-content">
      <!-- Header Section -->
      <div class="ticket-header">
        <div class="header-left">
          <h1 class="page-title">
            <TicketIcon :size="28" class="title-icon" />
            Ticket System
          </h1>
          <p class="page-subtitle">Manage and track all support tickets</p>
        </div>
        <div class="header-right">
          <button @click="showCreateModal = true" class="btn-create-ticket">
            <Plus :size="20" />
            Create Ticket
          </button>
        </div>
      </div>

    <!-- Filters and Stats Bar -->
    <div class="filters-bar">
      <div class="stats-chips">
        <div class="stat-chip" :class="{ active: activeFilter === 'all' }" @click="filterTickets('all')">
          <Layers :size="16" />
          <span>All</span>
          <span class="count">{{ tickets.length }}</span>
        </div>
        <div class="stat-chip backlog" :class="{ active: activeFilter === 'backlog' }" @click="filterTickets('backlog')">
          <Inbox :size="16" />
          <span>Backlog</span>
          <span class="count">{{ getStatusCount('backlog') }}</span>
        </div>
        <div class="stat-chip todo" :class="{ active: activeFilter === 'todo' }" @click="filterTickets('todo')">
          <Circle :size="16" />
          <span>To Do</span>
          <span class="count">{{ getStatusCount('todo') }}</span>
        </div>
        <div class="stat-chip progress" :class="{ active: activeFilter === 'in-progress' }" @click="filterTickets('in-progress')">
          <Clock :size="16" />
          <span>In Progress</span>
          <span class="count">{{ getStatusCount('in-progress') }}</span>
        </div>
        <div class="stat-chip review" :class="{ active: activeFilter === 'review' }" @click="filterTickets('review')">
          <Eye :size="16" />
          <span>Review</span>
          <span class="count">{{ getStatusCount('review') }}</span>
        </div>
        <div class="stat-chip complete" :class="{ active: activeFilter === 'complete' }" @click="filterTickets('complete')">
          <CheckCircle2 :size="16" />
          <span>Complete</span>
          <span class="count">{{ getStatusCount('complete') }}</span>
        </div>
      </div>

      <div class="filter-actions">
        <div class="search-box">
          <Search :size="18" class="search-icon" />
          <input v-model="searchQuery" type="text" placeholder="Search tickets..." class="search-input" />
        </div>
        <select v-model="priorityFilter" class="filter-select">
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
        <select v-model="sortBy" class="filter-select">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="priority">Priority</option>
          <option value="updated">Recently Updated</option>
        </select>
      </div>
    </div>

    <!-- Tickets Grid -->
    <div v-if="loading" class="tickets-loading">
      <div class="tickets-loader">
        <div class="loader-spinner-small"></div>
        <div class="loader-text-small">Loading tickets...</div>
      </div>
    </div>
    <div v-else class="tickets-grid">
      <TicketCard
        v-for="ticket in filteredTickets"
        :key="ticket.id"
        :ticket="ticket"
        @click="openTicketDetail(ticket)"
        @update="handleTicketUpdate"
      />
      
      <div v-if="filteredTickets.length === 0" class="empty-state">
        <Inbox :size="64" class="empty-icon" />
        <h3>No tickets found</h3>
        <p>Try adjusting your filters or create a new ticket</p>
      </div>
    </div>

    <!-- Create Ticket Modal -->
    <CreateTicketModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @created="handleTicketCreated"
    />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import ticketService from '@/services/ticketService'
import {
  Plus,
  Search,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Layers,
  Inbox,
  TicketIcon,
  Circle,
  Eye,
  Briefcase
} from 'lucide-vue-next'
import TicketCard from './components/TicketCard.vue'
import CreateTicketModal from './components/CreateTicketModal.vue'
import WorkspaceSidebar from './components/WorkspaceSidebar.vue'

export default {
  name: 'TicketSystem',
  components: {
    Plus,
    Search,
    AlertCircle,
    Clock,
    CheckCircle2,
    XCircle,
    Layers,
    Inbox,
    TicketIcon,
    Circle,
    Eye,
    Briefcase,
    TicketCard,
    CreateTicketModal,
    WorkspaceSidebar
  },
  setup() {
    const router = useRouter()
    const toast = useToast()
    const initialLoading = ref(true)
    const loading = ref(false)
    const workspaceSidebarRef = ref(null)
    const tickets = ref([])

    const showCreateModal = ref(false)
    const activeFilter = ref('all')
    const selectedWorkspace = ref('all')
    const searchQuery = ref('')
    const priorityFilter = ref('all')
    const sortBy = ref('newest')

    const getStatusCount = (status) => {
      return tickets.value.filter(t => t.status === status).length
    }

    const filterTickets = (filter) => {
      activeFilter.value = filter
      loadTickets() // Reload tickets when filter changes
    }

    const filterByWorkspace = () => {
      loadTickets() // Reload tickets when workspace changes
    }

    const handleWorkspaceCreated = (workspace) => {
      loadTickets() // Reload tickets
      toast.success('Workspace created successfully!')
    }

    const handleWorkspaceUpdated = (workspace) => {
      loadTickets() // Reload tickets
      toast.success('Workspace updated successfully!')
    }

    const handleWorkspaceDeleted = (workspace) => {
      if (selectedWorkspace.value === workspace.id) {
        selectedWorkspace.value = 'all'
      }
      loadTickets() // Reload tickets
    }

    /**
     * Load tickets from backend
     */
    const loadTickets = async () => {
      try {
        loading.value = true
        
        const params = {
          workspace_id: selectedWorkspace.value,
          status: activeFilter.value !== 'all' ? activeFilter.value : undefined,
          priority: priorityFilter.value !== 'all' ? priorityFilter.value : undefined,
          search: searchQuery.value || undefined,
          sort_by: sortBy.value === 'newest' ? 'created_at' : 
                   sortBy.value === 'oldest' ? 'created_at' :
                   sortBy.value === 'updated' ? 'updated_at' : 'priority',
          sort_order: sortBy.value === 'oldest' ? 'asc' : 'desc'
        }

        const response = await ticketService.getTickets(params)
        
        if (response.success) {
          tickets.value = response.data.data || response.data
        }
      } catch (error) {
        console.error('Error loading tickets:', error)
        toast.error('Failed to load tickets')
      } finally {
        loading.value = false
      }
    }

    const filteredTickets = computed(() => {
      // Backend already filters data, just return it
      return tickets.value
    })

    const openTicketDetail = (ticket) => {
      // Use numeric ID, not ticket_number
      const ticketId = ticket.id || ticket.ticket_number
      router.push(`/tickets/${ticketId}`)
    }

    const handleTicketCreated = (newTicket) => {
      showCreateModal.value = false
      loadTickets() // Reload tickets from backend
      toast.success('Ticket created successfully')
    }

    const handleTicketUpdate = (updatedTicket) => {
      loadTickets() // Reload tickets from backend
    }

    // Load tickets and workspaces on mount
    onMounted(async () => {
      try {
        initialLoading.value = true
        
        // Small delay to ensure ref is mounted
        await new Promise(resolve => setTimeout(resolve, 100))
        
        // Call workspace endpoint first
        if (workspaceSidebarRef.value && workspaceSidebarRef.value.loadWorkspaces) {
          await workspaceSidebarRef.value.loadWorkspaces()
        }
        
        // Then load tickets
        await loadTickets()
      } catch (error) {
        console.error('Error during initial load:', error)
        toast.error('Failed to load ticket system')
      } finally {
        // Hide initial loader after everything loads
        initialLoading.value = false
      }
    })

    // Watch for workspace changes
    watch(selectedWorkspace, () => {
      loadTickets()
    })

    // Watch for priority filter changes
    watch(priorityFilter, () => {
      loadTickets()
    })

    // Watch for sort changes
    watch(sortBy, () => {
      loadTickets()
    })

    // Debounced search
    let searchTimeout = null
    watch(searchQuery, () => {
      clearTimeout(searchTimeout)
      searchTimeout = setTimeout(() => {
        loadTickets()
      }, 500)
    })

    return {
      tickets,
      initialLoading,
      loading,
      showCreateModal,
      activeFilter,
      selectedWorkspace,
      searchQuery,
      priorityFilter,
      sortBy,
      workspaceSidebarRef,
      filteredTickets,
      getStatusCount,
      filterTickets,
      filterByWorkspace,
      handleWorkspaceCreated,
      handleWorkspaceUpdated,
      handleWorkspaceDeleted,
      openTicketDetail,
      handleTicketCreated,
      handleTicketUpdate,
      loadTickets
    }
  }
}
</script>

<style scoped>
/* Custom Loader */
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #fafafa 0%, #f8fafc 100%);
}

.custom-loader {
  text-align: center;
  padding: 3rem;
}

.loader-spinner {
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #8b5cf6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loader-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.loader-subtext {
  font-size: 0.875rem;
  color: #64748b;
}

/* Tickets Loading State */
.tickets-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
}

.tickets-loader {
  text-align: center;
}

.loader-spinner-small {
  width: 40px;
  height: 40px;
  margin: 0 auto 1rem;
  border: 3px solid #e2e8f0;
  border-top: 3px solid #8b5cf6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loader-text-small {
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
}

.ticket-system-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  width: 100%;
  min-height: calc(100vh - 80px);
  gap: 0;
}

.workspace-sidebar-container {
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
  height: calc(100vh - 80px);
  position: sticky;
  top: 80px;
  overflow-y: auto;
}

.ticket-main-content {
  padding: 2rem;
  overflow-y: auto;
}

/* Header */
.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  width: 100%;
}

.header-left {
  flex: 1;
}

.page-title {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 1.5rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0;
}

.title-icon {
  color: #8b5cf6;
}

.page-subtitle {
  color: #64748b;
  margin: 0.375rem 0 0 0;
  font-size: 0.875rem;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-create-ticket {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.btn-create-ticket:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
}

/* Filters Bar */
.filters-bar {
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  width: 100%;
}

.stats-chips {
  display: flex;
  gap: 0.625rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.stat-chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 0.8125rem;
  color: #64748b;
}

.stat-chip:hover {
  border-color: #cbd5e1;
  transform: translateY(-2px);
}

.stat-chip.active {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  border-color: #8b5cf6;
  color: white;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.stat-chip .count {
  background: rgba(0, 0, 0, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
}

.stat-chip.active .count {
  background: rgba(255, 255, 255, 0.2);
}

.stat-chip.backlog {
  color: #64748b;
}

.stat-chip.backlog.active {
  background: linear-gradient(135deg, #64748b 0%, #475569 100%);
  border-color: #64748b;
  box-shadow: 0 4px 12px rgba(100, 116, 139, 0.3);
}

.stat-chip.todo {
  color: #3b82f6;
}

.stat-chip.todo.active {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.stat-chip.progress {
  color: #f59e0b;
}

.stat-chip.progress.active {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border-color: #f59e0b;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.stat-chip.review {
  color: #f59e0b;
}

.stat-chip.review.active {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border-color: #f59e0b;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.stat-chip.complete {
  color: #10b981;
}

.stat-chip.complete.active {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-color: #10b981;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.filter-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 300px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.filter-select {
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.filter-select:focus {
  outline: none;
  border-color: #8b5cf6;
}

/* Tickets Grid */
.tickets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.5rem;
  width: 100%;
}

/* Empty State */
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 2rem;
  color: #94a3b8;
}

.empty-icon {
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.empty-state p {
  font-size: 0.95rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .ticket-system-layout {
    grid-template-columns: 240px 1fr;
  }
}

@media (max-width: 768px) {
  .ticket-system-layout {
    grid-template-columns: 1fr;
  }

  .workspace-sidebar-container {
    display: none;
  }

  .ticket-main-content {
    padding: 1rem;
  }

  .ticket-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .tickets-grid {
    grid-template-columns: 1fr;
  }

  .filter-actions {
    flex-direction: column;
  }

  .search-box {
    min-width: 100%;
  }
}
</style>

