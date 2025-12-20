<template>
  <div class="ticket-card" :class="`priority-${ticket.priority}`">
    <!-- Priority Indicator -->
    <div class="priority-bar" :class="`priority-${ticket.priority}`"></div>

    <!-- Card Header -->
    <div class="card-header">
      <div class="ticket-id">
        <Hash :size="14" />
        {{ ticket.id }}
      </div>
      <div class="ticket-status" :class="`status-${ticket.status}`">
        <component :is="getStatusIcon(ticket.status)" :size="14" />
        {{ formatStatus(ticket.status) }}
      </div>
    </div>

    <!-- Ticket Title -->
    <h3 class="ticket-title">{{ ticket.title }}</h3>

    <!-- Ticket Description -->
    <p class="ticket-description">{{ truncateText(ticket.description, 100) }}</p>

    <!-- Ticket Meta -->
    <div class="ticket-meta">
      <div class="meta-item">
        <component :is="getPriorityIcon(ticket.priority)" :size="14" :class="`priority-${ticket.priority}`" />
        <span>{{ formatPriority(ticket.priority) }}</span>
      </div>
      <div class="meta-item">
        <Tag :size="14" />
        <span>{{ ticket.category }}</span>
      </div>
    </div>

    <!-- Subtasks Progress -->
    <div v-if="ticket.subtasks && ticket.subtasks.length > 0" class="subtasks-progress">
      <div class="subtasks-header">
        <ListChecks :size="14" />
        <span>Subtasks</span>
        <span class="subtasks-count">{{ completedSubtasks }}/{{ ticket.subtasks.length }}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: subtaskProgress + '%' }"></div>
      </div>
    </div>

    <!-- Card Footer -->
    <div class="card-footer">
      <div class="assignee-info">
        <div class="avatar">
          <User :size="16" />
        </div>
        <span class="assignee-name">{{ ticket.assignee ? ticket.assignee.name : 'Unassigned' }}</span>
      </div>

      <div class="ticket-stats">
        <div class="stat-item" v-if="ticket.comments_count > 0">
          <MessageSquare :size="14" />
          <span>{{ ticket.comments_count }}</span>
        </div>
        <div class="stat-item" v-if="ticket.attachments_count > 0">
          <Paperclip :size="14" />
          <span>{{ ticket.attachments_count }}</span>
        </div>
        <div class="stat-item time" v-if="ticket.updated_at">
          <Clock :size="14" />
          <span>{{ formatTime(ticket.updated_at) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Hash,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Flag,
  AlertTriangle,
  Zap,
  Tag,
  User,
  MessageSquare,
  Paperclip,
  Inbox,
  Circle,
  Eye,
  ListChecks
} from 'lucide-vue-next'
import { formatDistanceToNow } from 'date-fns'

export default {
  name: 'TicketCard',
  components: {
    Hash,
    AlertCircle,
    Clock,
    CheckCircle2,
    XCircle,
    Flag,
    AlertTriangle,
    Zap,
    Tag,
    User,
    MessageSquare,
    Paperclip,
    Inbox,
    Circle,
    Eye,
    ListChecks
  },
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  computed: {
    completedSubtasks() {
      if (!this.ticket.subtasks) return 0
      return this.ticket.subtasks.filter(s => s.completed).length
    },
    subtaskProgress() {
      if (!this.ticket.subtasks || this.ticket.subtasks.length === 0) return 0
      return Math.round((this.completedSubtasks / this.ticket.subtasks.length) * 100)
    }
  },
  methods: {
    getStatusIcon(status) {
      const icons = {
        'backlog': Inbox,
        'todo': Circle,
        'in-progress': Clock,
        'review': Eye,
        'complete': CheckCircle2
      }
      return icons[status] || Circle
    },
    getPriorityIcon(priority) {
      const icons = {
        'low': Flag,
        'medium': AlertCircle,
        'high': AlertTriangle,
        'urgent': Zap
      }
      return icons[priority] || Flag
    },
    formatStatus(status) {
      return status.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    },
    formatPriority(priority) {
      return priority.charAt(0).toUpperCase() + priority.slice(1)
    },
    truncateText(text, length) {
      return text.length > length ? text.substring(0, length) + '...' : text
    },
    formatTime(date) {
      if (!date) return ''
      try {
        return formatDistanceToNow(new Date(date), { addSuffix: true })
      } catch (e) {
        return ''
      }
    }
  }
}
</script>

<style scoped>
.ticket-card {
  position: relative;
  background: white;
  border-radius: 12px;
  padding: 1.125rem;
  border: 2px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.ticket-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e1;
}

/* Priority Bar */
.priority-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #94a3b8, #cbd5e1);
}

.priority-bar.priority-low {
  background: linear-gradient(90deg, #10b981, #059669);
}

.priority-bar.priority-medium {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.priority-bar.priority-high {
  background: linear-gradient(90deg, #ef4444, #dc2626);
}

.priority-bar.priority-urgent {
  background: linear-gradient(90deg, #dc2626, #991b1b);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Card Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.ticket-id {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #8b5cf6;
  background: #f3e8ff;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
}

.ticket-status {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-backlog {
  background: #f1f5f9;
  color: #64748b;
}

.status-todo {
  background: #dbeafe;
  color: #2563eb;
}

.status-in-progress {
  background: #fef3c7;
  color: #d97706;
}

.status-review {
  background: #fef3c7;
  color: #f59e0b;
}

.status-complete {
  background: #d1fae5;
  color: #059669;
}

/* Ticket Content */
.ticket-title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.ticket-description {
  font-size: 0.8125rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0 0 0.75rem 0;
}

/* Ticket Meta */
.ticket-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

/* Subtasks Progress */
.subtasks-progress {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.subtasks-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.subtasks-count {
  margin-left: auto;
  background: #f1f5f9;
  padding: 0.125rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #475569;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #8b5cf6, #7c3aed);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: #64748b;
  font-weight: 500;
}

.meta-item .priority-low {
  color: #10b981;
}

.meta-item .priority-medium {
  color: #f59e0b;
}

.meta-item .priority-high {
  color: #ef4444;
}

.meta-item .priority-urgent {
  color: #dc2626;
}

/* Card Footer */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.assignee-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.assignee-name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #475569;
}

.ticket-stats {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
}

.stat-item.time {
  color: #64748b;
}

/* Responsive */
@media (max-width: 480px) {
  .ticket-card {
    padding: 1.25rem;
  }

  .ticket-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .card-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
}
</style>

