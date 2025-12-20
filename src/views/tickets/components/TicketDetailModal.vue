<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container-clickup">
      <!-- Modal Header - ClickUp Style -->
      <div class="modal-header-clickup">
        <div class="header-left-section">
          <button @click="$emit('close')" class="btn-back">
            <ArrowLeft :size="20" />
          </button>
          <div class="ticket-badges">
            <div class="ticket-id-badge">
              <Hash :size="14" />
              {{ ticket.id }}
            </div>
            <div class="status-dropdown" :class="`status-${ticket.status}`">
              <component :is="getStatusIcon(ticket.status)" :size="14" />
              <span>{{ formatStatus(ticket.status) }}</span>
              <ChevronDown :size="14" />
            </div>
          </div>
        </div>
        <div class="header-actions">
          <button class="header-btn">
            <Share2 :size="18" />
          </button>
          <button class="header-btn">
            <MoreHorizontal :size="18" />
          </button>
          <button @click="$emit('close')" class="header-btn close">
            <X :size="18" />
          </button>
        </div>
      </div>

      <!-- Modal Body - ClickUp 3 Column Layout -->
      <div class="modal-body-clickup">
        <!-- Left Sidebar - Properties -->
        <div class="left-sidebar">
          <div class="sidebar-section">
            <div class="section-label">ASSIGNEE</div>
            <div class="assignee-selector">
              <div class="assignee-avatar">
                <User :size="16" />
              </div>
              <select v-model="localTicket.assignee.name" @change="updateTicket" class="assignee-select">
                <option value="John Doe">John Doe</option>
                <option value="Sarah Smith">Sarah Smith</option>
                <option value="Mike Johnson">Mike Johnson</option>
                <option value="Emily Davis">Emily Davis</option>
              </select>
            </div>
          </div>

          <div class="sidebar-section">
            <div class="section-label">PRIORITY</div>
            <div class="priority-selector" :class="`priority-${localTicket.priority}`">
              <component :is="getPriorityIcon(localTicket.priority)" :size="14" />
              <select v-model="localTicket.priority" @change="updateTicket" class="priority-select">
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div class="sidebar-section">
            <div class="section-label">CATEGORY</div>
            <div class="category-tag">
              <Tag :size="14" />
              <span>{{ ticket.category }}</span>
            </div>
          </div>

          <div class="sidebar-section">
            <div class="section-label">REPORTER</div>
            <div class="reporter-info">
              <div class="reporter-avatar">
                <User :size="14" />
              </div>
              <span>{{ ticket.reporter.name }}</span>
            </div>
          </div>

          <div class="sidebar-section">
            <div class="section-label">DATES</div>
            <div class="date-info">
              <div class="date-item">
                <Calendar :size="14" />
                <div>
                  <div class="date-label">Created</div>
                  <div class="date-value">{{ formatDate(ticket.createdAt) }}</div>
                </div>
              </div>
              <div class="date-item">
                <Clock :size="14" />
                <div>
                  <div class="date-label">Updated</div>
                  <div class="date-value">{{ formatDate(ticket.updatedAt) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="main-content-area">
          <!-- Ticket Title -->
          <div class="title-section">
            <input 
              v-model="localTicket.title" 
              @blur="updateTicket"
              class="ticket-title-input" 
              placeholder="Ticket title..."
            />
          </div>

          <!-- Tabs Navigation -->
          <div class="tabs-navigation">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              class="tab-button"
              :class="{ active: activeTab === tab.id }"
            >
              <component :is="tab.icon" :size="16" />
              {{ tab.label }}
              <span v-if="tab.count" class="tab-count">{{ tab.count }}</span>
            </button>
          </div>

          <!-- Tab Content -->
          <div class="tab-content">
            <!-- Description Tab -->
            <div v-show="activeTab === 'description'" class="tab-pane">
              <div class="description-editor">
                <div class="editor-toolbar">
                  <button class="toolbar-btn"><Bold :size="16" /></button>
                  <button class="toolbar-btn"><Italic :size="16" /></button>
                  <button class="toolbar-btn"><List :size="16" /></button>
                  <button class="toolbar-btn"><Link2 :size="16" /></button>
                  <button class="toolbar-btn"><Image :size="16" /></button>
                </div>
                <textarea 
                  v-model="localTicket.description"
                  @blur="updateTicket"
                  class="description-textarea"
                  placeholder="Add description..."
                  rows="8"
                ></textarea>
              </div>
            </div>

            <!-- Comments Tab -->
            <div v-show="activeTab === 'comments'" class="tab-pane">
              <div class="comments-section">
                <div class="comment-composer">
                  <div class="composer-avatar">
                    <User :size="18" />
                  </div>
                  <div class="composer-input-wrapper">
                    <textarea 
                      v-model="newComment"
                      class="composer-textarea"
                      placeholder="Write a comment..."
                      rows="3"
                    ></textarea>
                    <div class="composer-actions">
                      <div class="composer-tools">
                        <button class="tool-btn"><Paperclip :size="16" /></button>
                        <button class="tool-btn"><Smile :size="16" /></button>
                        <button class="tool-btn"><AtSign :size="16" /></button>
                      </div>
                      <button @click="addComment" :disabled="!newComment.trim()" class="btn-send-comment">
                        <Send :size="16" />
                        Comment
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Comments List -->
                <div class="comments-list">
                  <div v-for="comment in comments" :key="comment.id" class="comment-item-clickup">
                    <div class="comment-avatar">
                      <User :size="18" />
                    </div>
                    <div class="comment-content-wrapper">
                      <div class="comment-header">
                        <span class="comment-author">{{ comment.author }}</span>
                        <span class="comment-time">{{ formatTime(comment.createdAt) }}</span>
                      </div>
                      <div class="comment-text">{{ comment.text }}</div>
                      <div class="comment-actions">
                        <button class="comment-action-btn">
                          <ThumbsUp :size="14" />
                          Like
                        </button>
                        <button class="comment-action-btn">
                          <MessageCircle :size="14" />
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Activity Tab -->
            <div v-show="activeTab === 'activity'" class="tab-pane">
              <div class="activity-timeline">
                <div v-for="activity in activities" :key="activity.id" class="activity-item">
                  <div class="activity-icon" :class="activity.type">
                    <component :is="activity.icon" :size="14" />
                  </div>
                  <div class="activity-content">
                    <div class="activity-text">
                      <strong>{{ activity.user }}</strong> {{ activity.action }}
                    </div>
                    <div class="activity-time">{{ formatTime(activity.timestamp) }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Attachments Tab -->
            <div v-show="activeTab === 'attachments'" class="tab-pane">
              <div class="attachments-section">
                <div class="upload-area" @click="triggerFileUpload">
                  <Upload :size="32" class="upload-icon" />
                  <div class="upload-text">Drop files here or click to upload</div>
                  <div class="upload-hint">Supports: Images, PDFs, Documents</div>
                  <input type="file" ref="fileInput" multiple class="file-input-hidden" />
                </div>
                
                <div v-if="attachments.length > 0" class="attachments-grid">
                  <div v-for="(file, index) in attachments" :key="index" class="attachment-card">
                    <div class="attachment-preview">
                      <FileText :size="32" />
                    </div>
                    <div class="attachment-info">
                      <div class="attachment-name">{{ file.name }}</div>
                      <div class="attachment-size">{{ file.size }}</div>
                    </div>
                    <button class="attachment-remove">
                      <Trash2 :size="14" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Sidebar - Quick Actions -->
        <div class="right-sidebar">
          <div class="quick-actions-section">
            <button @click="updateStatus('in-progress')" class="quick-action-btn progress">
              <PlayCircle :size="16" />
              Start Progress
            </button>
            <button @click="updateStatus('resolved')" class="quick-action-btn success">
              <CheckCircle2 :size="16" />
              Mark Resolved
            </button>
            <button @click="updateStatus('closed')" class="quick-action-btn danger">
              <XCircle :size="16" />
              Close Ticket
            </button>
          </div>

          <div class="watchers-section">
            <div class="section-label">WATCHERS</div>
            <div class="watchers-list">
              <div class="watcher-item">
                <div class="watcher-avatar">
                  <User :size="14" />
                </div>
                <span>You</span>
              </div>
              <button class="add-watcher-btn">
                <Plus :size="14" />
                Add watcher
              </button>
            </div>
          </div>

          <div class="time-tracking-section">
            <div class="section-label">TIME TRACKING</div>
            <div class="time-display">
              <Clock :size="16" />
              <span>No time tracked</span>
            </div>
            <button class="btn-start-timer">
              <Play :size="14" />
              Start Timer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import {
  ArrowLeft,
  Hash,
  ChevronDown,
  Share2,
  MoreHorizontal,
  X,
  User,
  Tag,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  Activity,
  Paperclip,
  Bold,
  Italic,
  List,
  Link2,
  Image,
  Send,
  Smile,
  AtSign,
  ThumbsUp,
  MessageCircle,
  Upload,
  Trash2,
  PlayCircle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  Play,
  Flag,
  AlertTriangle,
  Zap
} from 'lucide-vue-next'
import { formatDistanceToNow, format } from 'date-fns'

export default {
  name: 'TicketDetailModal',
  components: {
    ArrowLeft, Hash, ChevronDown, Share2, MoreHorizontal, X,
    User, Tag, Calendar, Clock, FileText, MessageSquare,
    Activity, Paperclip, Bold, Italic, List, Link2, Image,
    Send, Smile, AtSign, ThumbsUp, MessageCircle, Upload,
    Trash2, PlayCircle, CheckCircle2, XCircle, AlertCircle,
    Plus, Play, Flag, AlertTriangle, Zap
  },
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'update'],
  setup(props, { emit }) {
    const localTicket = reactive({ ...props.ticket })
    const activeTab = ref('description')
    const newComment = ref('')
    const fileInput = ref(null)

    const tabs = computed(() => [
      { id: 'description', label: 'Description', icon: FileText },
      { id: 'comments', label: 'Comments', icon: MessageSquare, count: comments.value.length },
      { id: 'activity', label: 'Activity', icon: Activity, count: activities.value.length },
      { id: 'attachments', label: 'Attachments', icon: Paperclip, count: attachments.value.length }
    ])

    const comments = ref([
      {
        id: 1,
        author: 'John Doe',
        text: 'I\'m looking into this issue now. Will update shortly with findings.',
        createdAt: '2024-11-10T11:00:00'
      },
      {
        id: 2,
        author: 'Admin User',
        text: 'Thanks for the quick response! Let me know if you need any additional information.',
        createdAt: '2024-11-10T11:30:00'
      }
    ])

    const activities = ref([
      { id: 1, user: 'John Doe', action: 'changed status to In Progress', timestamp: '2024-11-10T14:20:00', type: 'status', icon: Activity },
      { id: 2, user: 'Sarah Smith', action: 'added a comment', timestamp: '2024-11-10T13:15:00', type: 'comment', icon: MessageCircle },
      { id: 3, user: 'Admin User', action: 'created this ticket', timestamp: '2024-11-10T10:30:00', type: 'created', icon: Plus }
    ])

    const attachments = ref([
      { name: 'screenshot-error.png', size: '2.4 MB' },
      { name: 'error-log.txt', size: '156 KB' }
    ])

    const getStatusIcon = (status) => {
      const icons = {
        'open': AlertCircle,
        'in-progress': Clock,
        'resolved': CheckCircle2,
        'closed': XCircle
      }
      return icons[status] || AlertCircle
    }

    const getPriorityIcon = (priority) => {
      const icons = {
        'low': Flag,
        'medium': AlertCircle,
        'high': AlertTriangle,
        'urgent': Zap
      }
      return icons[priority] || Flag
    }

    const formatStatus = (status) => {
      return status.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    }

    const formatTime = (date) => {
      return formatDistanceToNow(new Date(date), { addSuffix: true })
    }

    const formatDate = (date) => {
      return format(new Date(date), 'MMM dd, yyyy HH:mm')
    }

    const updateStatus = (newStatus) => {
      localTicket.status = newStatus
      localTicket.updatedAt = new Date().toISOString()
      activities.value.unshift({
        id: activities.value.length + 1,
        user: 'Current User',
        action: `changed status to ${formatStatus(newStatus)}`,
        timestamp: new Date().toISOString(),
        type: 'status',
        icon: Activity
      })
      emit('update', { ...localTicket })
    }

    const updateTicket = () => {
      localTicket.updatedAt = new Date().toISOString()
      emit('update', { ...localTicket })
    }

    const addComment = () => {
      if (!newComment.value.trim()) return

      comments.value.push({
        id: comments.value.length + 1,
        author: 'Current User',
        text: newComment.value,
        createdAt: new Date().toISOString()
      })

      activities.value.unshift({
        id: activities.value.length + 1,
        user: 'Current User',
        action: 'added a comment',
        timestamp: new Date().toISOString(),
        type: 'comment',
        icon: MessageCircle
      })

      newComment.value = ''
      localTicket.comments = comments.value.length
      updateTicket()
    }

    const triggerFileUpload = () => {
      fileInput.value?.click()
    }

    return {
      localTicket,
      activeTab,
      newComment,
      fileInput,
      tabs,
      comments,
      activities,
      attachments,
      getStatusIcon,
      getPriorityIcon,
      formatStatus,
      formatTime,
      formatDate,
      updateStatus,
      updateTicket,
      addComment,
      triggerFileUpload
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 0;
  animation: fadeIn 0.2s ease;
}

.modal-container-clickup {
  background: #ffffff;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Header - ClickUp Style */
.modal-header-clickup {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: #ffffff;
  min-height: 60px;
}

.header-left-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-back {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  background: #f1f5f9;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-back:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.ticket-badges {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ticket-id-badge {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: #f3e8ff;
  color: #8b5cf6;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.8125rem;
}

.status-dropdown {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.status-dropdown:hover {
  opacity: 0.8;
}

.status-open { background: #dbeafe; color: #2563eb; }
.status-in-progress { background: #fef3c7; color: #d97706; }
.status-resolved { background: #d1fae5; color: #059669; }
.status-closed { background: #f1f5f9; color: #64748b; }

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header-btn {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.header-btn:hover {
  background: #f1f5f9;
  color: #1e293b;
}

.header-btn.close:hover {
  background: #fee2e2;
  color: #ef4444;
}

/* Body - 3 Column Layout */
.modal-body-clickup {
  display: grid;
  grid-template-columns: 260px 1fr 280px;
  flex: 1;
  overflow: hidden;
  background: #f8fafc;
}

/* Left Sidebar */
.left-sidebar {
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
  padding: 1.5rem;
  overflow-y: auto;
}

.sidebar-section {
  margin-bottom: 1.75rem;
}

.section-label {
  font-size: 0.6875rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.assignee-selector {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.assignee-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.assignee-select,
.priority-select {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e293b;
  cursor: pointer;
  outline: none;
}

.priority-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
}

.priority-selector.priority-urgent {
  background: #fee2e2;
  color: #dc2626;
}

.priority-selector.priority-high {
  background: #fef3c7;
  color: #d97706;
}

.priority-selector.priority-medium {
  background: #dbeafe;
  color: #2563eb;
}

.priority-selector.priority-low {
  background: #d1fae5;
  color: #059669;
}

.category-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 0.875rem;
  color: #475569;
}

.reporter-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 0.875rem;
  color: #475569;
}

.reporter-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.date-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.date-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.625rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  color: #64748b;
}

.date-label {
  font-size: 0.75rem;
  color: #94a3b8;
}

.date-value {
  font-size: 0.8125rem;
  font-weight: 500;
  color: #475569;
}

/* Main Content Area */
.main-content-area {
  background: #ffffff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.title-section {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.ticket-title-input {
  width: 100%;
  border: none;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  outline: none;
  padding: 0;
}

.ticket-title-input::placeholder {
  color: #cbd5e1;
}

/* Tabs */
.tabs-navigation {
  display: flex;
  gap: 0.25rem;
  padding: 0 2rem;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.25rem;
  border: none;
  background: transparent;
  color: #64748b;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  position: relative;
}

.tab-button:hover {
  color: #1e293b;
  background: #f1f5f9;
}

.tab-button.active {
  color: #8b5cf6;
  border-bottom-color: #8b5cf6;
  background: #ffffff;
}

.tab-count {
  padding: 0.125rem 0.5rem;
  background: #e2e8f0;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 700;
}

.tab-button.active .tab-count {
  background: #f3e8ff;
  color: #8b5cf6;
}

/* Tab Content */
.tab-content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
}

.tab-pane {
  animation: fadeIn 0.3s ease;
}

/* Description Editor */
.description-editor {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}

.editor-toolbar {
  display: flex;
  gap: 0.25rem;
  padding: 0.75rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.toolbar-btn {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.toolbar-btn:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.description-textarea {
  width: 100%;
  border: none;
  padding: 1rem;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #475569;
  font-family: inherit;
  resize: vertical;
  outline: none;
}

/* Comments */
.comments-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.comment-composer {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.composer-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.composer-input-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.composer-textarea {
  width: 100%;
  border: none;
  background: #ffffff;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-family: inherit;
  resize: none;
  outline: none;
}

.composer-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.composer-tools {
  display: flex;
  gap: 0.25rem;
}

.tool-btn {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.tool-btn:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.btn-send-comment {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-send-comment:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.btn-send-comment:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.comment-item-clickup {
  display: flex;
  gap: 1rem;
}

.comment-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.comment-content-wrapper {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.comment-author {
  font-weight: 700;
  color: #1e293b;
  font-size: 0.875rem;
}

.comment-time {
  font-size: 0.75rem;
  color: #94a3b8;
}

.comment-text {
  font-size: 0.9375rem;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.comment-actions {
  display: flex;
  gap: 1rem;
}

.comment-action-btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.5rem;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.comment-action-btn:hover {
  background: #f1f5f9;
  color: #1e293b;
}

/* Activity Timeline */
.activity-timeline {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.activity-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.activity-icon.status {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.activity-icon.comment {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.activity-icon.created {
  background: linear-gradient(135deg, #10b981, #059669);
}

.activity-content {
  flex: 1;
  padding-top: 0.25rem;
}

.activity-text {
  font-size: 0.875rem;
  color: #475569;
  margin-bottom: 0.25rem;
}

.activity-text strong {
  color: #1e293b;
  font-weight: 600;
}

.activity-time {
  font-size: 0.75rem;
  color: #94a3b8;
}

/* Attachments */
.attachments-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.upload-area {
  padding: 3rem 2rem;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f8fafc;
}

.upload-area:hover {
  border-color: #8b5cf6;
  background: #f3e8ff;
}

.upload-icon {
  color: #94a3b8;
  margin-bottom: 1rem;
}

.upload-text {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.5rem;
}

.upload-hint {
  font-size: 0.8125rem;
  color: #94a3b8;
}

.file-input-hidden {
  display: none;
}

.attachments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.attachment-card {
  position: relative;
  padding: 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.attachment-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.attachment-preview {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  color: #8b5cf6;
}

.attachment-info {
  text-align: center;
}

.attachment-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.attachment-size {
  font-size: 0.75rem;
  color: #94a3b8;
}

.attachment-remove {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: none;
  background: #fee2e2;
  color: #ef4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.2s ease;
}

.attachment-card:hover .attachment-remove {
  opacity: 1;
}

/* Right Sidebar */
.right-sidebar {
  background: #ffffff;
  border-left: 1px solid #e2e8f0;
  padding: 1.5rem;
  overflow-y: auto;
}

.quick-actions-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.quick-action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #ffffff;
  color: #475569;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-action-btn:hover {
  transform: translateX(4px);
}

.quick-action-btn.progress:hover {
  border-color: #f59e0b;
  color: #f59e0b;
  background: #fef3c7;
}

.quick-action-btn.success:hover {
  border-color: #10b981;
  color: #10b981;
  background: #d1fae5;
}

.quick-action-btn.danger:hover {
  border-color: #ef4444;
  color: #ef4444;
  background: #fee2e2;
}

.watchers-section,
.time-tracking-section {
  margin-bottom: 2rem;
}

.watchers-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.watcher-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 0.875rem;
  color: #475569;
}

.watcher-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.add-watcher-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
  background: transparent;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-watcher-btn:hover {
  border-color: #8b5cf6;
  color: #8b5cf6;
  background: #f3e8ff;
}

.time-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.75rem;
}

.btn-start-timer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #ffffff;
  color: #475569;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-start-timer:hover {
  border-color: #8b5cf6;
  color: #8b5cf6;
  background: #f3e8ff;
}

/* Responsive */
@media (max-width: 1200px) {
  .modal-body-clickup {
    grid-template-columns: 240px 1fr 240px;
  }
}

@media (max-width: 1024px) {
  .modal-body-clickup {
    grid-template-columns: 1fr;
  }

  .left-sidebar,
  .right-sidebar {
    display: none;
  }

  .tab-content {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .modal-header-clickup {
    padding: 1rem;
  }

  .ticket-badges {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .tabs-navigation {
    overflow-x: auto;
    padding: 0 1rem;
  }

  .tab-content {
    padding: 1rem;
  }
}
</style>
