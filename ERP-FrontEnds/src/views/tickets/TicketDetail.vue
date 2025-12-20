<template>
  <!-- Loading State -->
  <div v-if="loading" class="loading-container">
    <div class="loader">
      <div class="spinner"></div>
      <p>Loading ticket...</p>
    </div>
  </div>

  <!-- ClickUp Style Detail Page -->
  <div v-else class="clickup-detail">
    <!-- Top Bar -->
    <div class="top-bar">
      <div class="top-left">
        <button @click="$router.back()" class="btn-back">
          <ArrowLeft :size="18" />
        </button>
        <div class="breadcrumb">
          <span>{{ workspaceName || 'Workspace' }}</span>
          <ChevronRight :size="14" />
          <span>{{ ticket.ticket_number }}</span>
        </div>
      </div>
      <div class="top-right">
        <button class="top-btn"><Share2 :size="18" /></button>
        <button class="top-btn"><MoreHorizontal :size="18" /></button>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="main-area">
      <!-- Left Sidebar Collapse Button -->
      <!-- <button class="sidebar-toggle">
        <ChevronsLeft :size="18" />
      </button> -->

      <!-- Content Section -->
      <div class="content-section">
        <!-- Task Header -->
        <div class="task-type-badge">
          <CheckSquare :size="14" />
          Task
        </div>

        <!-- Title (Editable) -->
        <h1 v-if="ticket.title" class="task-title" contenteditable="true">{{ ticket.title }}</h1>
        <h1 v-else class="task-title empty">Untitled Ticket</h1>

        <!-- Properties Grid (2 Columns - Horizontal Layout) -->
        <div class="properties-horizontal">
          <!-- Row 1: Status & Assignees -->
          <div class="property-row">
            <div class="property-field">
              <div class="field-label">
                <Circle :size="14" />
                <span>Status</span>
              </div>
              <el-select v-model="ticket.status" @change="changeStatus(ticket.status)" size="small" class="field-select">
                <el-option value="backlog" label="Backlog">
                  <div class="select-option"><Inbox :size="14" /> Backlog</div>
                </el-option>
                <el-option value="todo" label="To Do">
                  <div class="select-option"><Circle :size="14" /> To Do</div>
                </el-option>
                <el-option value="in-progress" label="In Progress">
                  <div class="select-option"><Clock :size="14" /> In Progress</div>
                </el-option>
                <el-option value="review" label="Review">
                  <div class="select-option"><Eye :size="14" /> Review</div>
                </el-option>
                <el-option value="complete" label="Complete">
                  <div class="select-option"><CheckCircle2 :size="14" /> Complete</div>
                </el-option>
              </el-select>
              <CheckCircle2 :size="16" class="field-icon-action" />
            </div>

            <div class="property-field">
              <div class="field-label">
                <User :size="14" />
                <span>Assignees</span>
              </div>
              <el-select v-model="ticket.assignee_id" @change="handleAssigneeChange" size="small" placeholder="Select" class="field-select">
                <el-option :value="null" label="Unassigned" />
                <el-option v-for="user in assignableUsers" :key="user.id" :value="user.user_id" :label="user.name">
                  <div class="user-option">
                    <div class="avatar-tiny"><User :size="10" /></div>
                    {{ user.name }}
                  </div>
                </el-option>
              </el-select>
            </div>
          </div>

          <!-- Row 2: Dates (Merged) & Priority -->
          <div class="property-row">
            <div class="property-field">
              <div class="field-label">
                <Calendar :size="14" />
                <span>Dates</span>
              </div>
              <div class="dates-merged">
                <CustomDatePicker v-model="ticket.started_at" placeholder="Start" @change="handleStartDateChange">
                  <template #trigger="{ formattedDate }">
                    <div class="date-btn">
                      <Clock :size="12" />
                      <span>{{ formattedDate || 'Start' }}</span>
                    </div>
                  </template>
                </CustomDatePicker>
                <span class="arrow">→</span>
                <CustomDatePicker v-model="ticket.due_date" placeholder="Due" @change="handleDueDateChange">
                  <template #trigger="{ formattedDate }">
                    <div class="date-btn">
                      <Calendar :size="12" />
                      <span>{{ formattedDate || 'Due' }}</span>
                    </div>
                  </template>
                </CustomDatePicker>
              </div>
            </div>

            <div class="property-field">
              <div class="field-label">
                <Flag :size="14" />
                <span>Priority</span>
              </div>
              <el-select v-model="ticket.priority" @change="handlePriorityChange" size="small" class="field-select">
                <el-option value="low" label="Low">
                  <div class="select-option"><Flag :size="14" /> Low</div>
                </el-option>
                <el-option value="medium" label="Medium">
                  <div class="select-option"><AlertCircle :size="14" /> Medium</div>
                </el-option>
                <el-option value="high" label="High">
                  <div class="select-option"><AlertTriangle :size="14" /> High</div>
                </el-option>
                <el-option value="urgent" label="Urgent">
                  <div class="select-option"><Zap :size="14" /> Urgent</div>
                </el-option>
              </el-select>
            </div>
          </div>

          <!-- Row 3: Time Estimate & Track Time -->
          <div class="property-row">
            <div class="property-field">
              <div class="field-label">
                <Clock :size="14" />
                <span>Time estimate</span>
              </div>
              <el-input 
                v-model="ticket.time_estimate" 
                @blur="handleTimeEstimateChange" 
                placeholder="e.g., 2h 30m" 
                size="small" 
                class="field-input"
              />
            </div>

            <div class="property-field">
              <div class="field-label">
                <Clock :size="14" />
                <span>Track time</span>
              </div>
              <div class="track-time-display">
                <button @click="toggleTimer" class="timer-btn" :class="{ active: timerRunning }">
                  <div v-if="timerRunning" class="timer-dot pulsing"></div>
                  <component :is="timerRunning ? Square : Play" :size="14" />
                </button>
                <span class="timer-value" :class="{ running: timerRunning }">{{ timeTracked }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="description-section" @click="focusDescription">
          <div class="description-header">
            <FileText :size="16" />
            <span>Description</span>
          </div>
          <div 
            ref="descriptionEditor"
            class="description-content" 
            contenteditable="true"
            @blur="updateDescription"
            @keydown.enter.exact.prevent="handleDescriptionEnter"
            :data-placeholder="ticket.description ? '' : 'Click to add description...'"
          >{{ ticket.description }}</div>
        </div>

        <!-- Subtasks Section -->
        <div class="expandable-section">
          <div class="section-header" @click="expandedSections.subtasks = !expandedSections.subtasks">
            <div class="section-header-left">
              <component :is="expandedSections.subtasks ? ChevronDown : ChevronRight" :size="16" class="toggle-icon" />
              <ListChecks :size="16" class="section-icon" />
              <span class="section-title">Subtasks</span>
            </div>
            <div class="section-header-right">
              <div v-if="subtasks.length > 0" class="subtasks-count-badge">
                {{ completedSubtasksCount }}/{{ subtasks.length }}
              </div>
              <button v-if="subtasks.length === 0" class="btn-add-icon" @click.stop>
                <Plus :size="14" />
              </button>
            </div>
          </div>
          <div v-if="expandedSections.subtasks" class="section-content">
            <div class="add-subtask-inline">
              <Plus :size="14" class="input-icon" />
              <input 
                v-model="newSubtask"
                @keyup.enter="addSubtask"
                placeholder="Add a subtask..."
                class="subtask-input-inline"
              />
              <button @click="addSubtask" class="btn-save-inline">
                <Check :size="14" />
              </button>
            </div>
            <div v-for="(subtask, index) in subtasks" :key="subtask.id" class="subtask-item-inline">
              <div 
                @click="toggleSubtask(index)" 
                class="subtask-checkbox" 
                :class="{ checked: subtask.completed }"
              >
                <Check v-if="subtask.completed" :size="12" />
              </div>
              <span :class="{ completed: subtask.completed }">{{ subtask.title }}</span>
              <button class="subtask-delete-btn">
                <X :size="12" />
              </button>
            </div>
          </div>
        </div>

        <!-- Checklists -->
        <div class="expandable-section">
          <div class="section-header" @click="expandedSections.checklists = !expandedSections.checklists">
            <component :is="expandedSections.checklists ? ChevronDown : ChevronRight" :size="16" />
            <span>Checklists</span>
            <button class="btn-add-small"><Plus :size="14" /></button>
          </div>
          <div v-if="expandedSections.checklists" class="section-content">
            <div class="checklist-container">
              <div class="checklist-header">
                <span class="checklist-title">Checklist</span>
                <MoreHorizontal :size="16" />
              </div>
              <div class="checklist-item">
                <Plus :size="14" />
                <input placeholder="New checklist item" class="checklist-input" />
                <User :size="14" />
              </div>
              <div class="checklist-footer">
                <button class="btn-checklist-action">
                  <Plus :size="14" />
                  Add checklist
                </button>
                <button class="btn-checklist-action">
                  <Layout :size="14" />
                  Use Template
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Attach File -->
        <div class="expandable-section">
          <div class="section-header" @click="expandedSections.attachments = !expandedSections.attachments">
            <div class="section-header-left">
              <component :is="expandedSections.attachments ? ChevronDown : ChevronRight" :size="16" class="toggle-icon" />
              <Paperclip :size="16" class="section-icon" />
              <span class="section-title">Attachments</span>
            </div>
            <div class="section-header-right">
              <div v-if="attachments.length > 0" class="subtasks-count-badge">
                {{ attachments.length }}
              </div>
            </div>
          </div>

          <div v-if="expandedSections.attachments" class="section-content">
            <!-- Upload Area -->
            <div class="attachment-upload-area" @click="triggerFileInput" @drop.prevent="handleFileDrop" @dragover.prevent>
              <input 
                ref="fileInput" 
                type="file" 
                multiple
                @change="handleFileSelect" 
                style="display: none"
              />
              <Upload :size="20" class="upload-icon" />
              <p class="upload-text">Click or drag files here to upload</p>
            </div>

            <!-- Attachments List -->
            <div v-if="attachments.length > 0" class="attachments-list">
              <div v-for="attachment in attachments" :key="attachment.id" class="attachment-item">
                <File :size="16" class="file-icon" />
                <a 
                  v-if="attachment.url" 
                  :href="attachment.url" 
                  target="_blank"
                  class="file-name file-link"
                >
                  {{ attachment.name }}
                </a>
                <span v-else class="file-name">{{ attachment.name }}</span>
                <span v-if="attachment.uploading" class="file-status">Uploading...</span>
                <span v-else class="file-size">{{ formatFileSize(attachment.size) }}</span>
                <button 
                  v-if="!attachment.uploading"
                  @click="deleteAttachment(attachment.id)" 
                  class="btn-delete-attachment"
                  title="Delete attachment"
                >
                  <X :size="14" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar - Activity -->
      <div class="activity-sidebar">
        <div class="activity-header-bar">
          <Activity :size="16" />
          <span>Activity</span>
          <button class="btn-icon-sm"><Bell :size="14" /></button>
          <button class="btn-icon-sm"><Search :size="14" /></button>
          <button class="btn-icon-sm"><SlidersHorizontal :size="14" /></button>
        </div>

        <div class="activity-list">
          <div v-for="activity in filteredActivities" :key="activity.id" class="activity-item-sm">
            <!-- Voice Message Display (ClickUp Style) -->
            <div v-if="activity.activity_type === 'voice_message_sent' && activity.voice_recording_data" class="voice-activity-item">
              <div class="voice-activity-header">
                <div class="voice-user-avatar">
                  {{ activity.user ? activity.user.name.charAt(0).toUpperCase() : 'U' }}
                </div>
                <div class="voice-user-info">
                  <span class="voice-user-name">{{ activity.user ? activity.user.name : 'User' }}</span>
                  <span class="voice-timestamp">{{ formatTime(activity.created_at) }}</span>
                </div>
              </div>
              
              <div class="voice-player-card">
                <button class="voice-play-btn" @click="toggleVoicePlay($event)">
                  <Play :size="16" />
                </button>
                <div class="voice-waveform">
                  <audio :src="activity.voice_recording_data.file_url" class="voice-audio-hidden"></audio>
                  <div class="waveform-bars">
                    <span v-for="i in 40" :key="i" class="bar" :style="{ height: Math.random() * 100 + '%' }"></span>
                  </div>
                </div>
                <span class="voice-time">{{ formatVoiceDuration(activity.metadata.duration) }}</span>
              </div>
              
              <!-- Caption Text (if any) -->
              <div v-if="activity.comment_text" class="voice-caption">
                {{ activity.comment_text }}
              </div>
              
              <!-- Voice Message Actions -->
              <div class="voice-actions">
                <button @click="replyToVoiceMessage(activity)" class="btn-voice-action" title="Reply">
                  <MessageSquare :size="12" />
                  <span>Reply</span>
                </button>
                <button @click="deleteVoiceMessage(activity)" class="btn-voice-action btn-voice-delete" title="Delete">
                  <Trash2 :size="12" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
            
            <!-- Comment Display (Enhanced with Threaded Replies) -->
            <div v-else-if="activity.type === 'comment' && activity.comment_text" class="comment-thread-container">
              <!-- Main Comment Card -->
              <div class="comment-card" :class="{ 'editing': editingCommentId === activity.id }">
                <!-- Comment Header -->
                <div class="comment-card-header">
                  <div class="comment-user-avatar">
                    {{ activity.user ? activity.user.name.charAt(0).toUpperCase() : 'U' }}
                  </div>
                  <div class="comment-meta">
                    <span class="comment-user-name">{{ activity.user ? activity.user.name : 'User' }}</span>
                    <span class="comment-timestamp">
                      {{ formatTime(activity.created_at) }}
                      <span v-if="activity.updated_at && activity.updated_at !== activity.created_at" class="edited-indicator">(edited)</span>
                    </span>
                  </div>
                </div>
                
                <!-- Comment Content -->
                <div class="comment-card-body">
                  <!-- Edit Mode -->
                  <div v-if="editingCommentId === activity.id" class="comment-edit-mode">
                    <textarea
                      v-model="editCommentText"
                      class="edit-textarea"
                      rows="3"
                      @keydown.esc="cancelEdit"
                    ></textarea>
                    <div class="edit-actions">
                      <button @click="cancelEdit" class="btn-cancel-edit">Cancel</button>
                      <button @click="saveEdit(activity)" class="btn-save-edit" :disabled="savingComment">
                        <span v-if="savingComment">Saving...</span>
                        <span v-else>Save</span>
                      </button>
                    </div>
                  </div>
                  
                  <!-- View Mode -->
                  <div v-else>
                    <div class="comment-text-full">
                      {{ activity.comment_text }}
                    </div>
                    
                    <!-- Comment Attachments -->
                    <div v-if="activity.attachments && activity.attachments.length > 0" class="comment-attachments-grid">
                      <div v-for="attachment in activity.attachments" :key="attachment.id" class="attachment-card">
                        <a :href="attachment.file_url" target="_blank" class="attachment-link">
                          <div v-if="attachment.file_type && attachment.file_type.startsWith('image/')" class="attachment-preview">
                            <img :src="attachment.file_url" :alt="attachment.file_name" />
                          </div>
                          <div v-else class="attachment-file-preview">
                            <File :size="20" />
                          </div>
                          <div class="attachment-details">
                            <span class="attachment-name">{{ attachment.file_name }}</span>
                            <span class="attachment-size">{{ formatFileSize(attachment.file_size) }}</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Comment Actions (Bottom Right) -->
                <div class="comment-card-footer">
                  <div class="comment-actions-right">
                    <button 
                      v-if="activity.replies && activity.replies.length > 0"
                      @click="toggleReplies(activity.id)" 
                      class="btn-action-icon"
                      :title="collapsedReplies[activity.id] ? 'Show replies' : 'Hide replies'"
                    >
                      <ChevronDown v-if="collapsedReplies[activity.id]" :size="14" />
                      <ChevronRight v-else :size="14" />
                      <span class="reply-count-text">{{ activity.replies.length }}</span>
                    </button>
                    
                    <button @click="startInlineReply(activity)" class="btn-action-icon" title="Reply">
                      <MessageSquare :size="14" />
                    </button>
                    
                    <button 
                      v-if="canEditComment(activity)" 
                      @click="startEdit(activity)" 
                      class="btn-action-icon" 
                      title="Edit"
                    >
                      <Edit2 :size="14" />
                    </button>
                    
                    <button @click="confirmDelete(activity)" class="btn-action-icon btn-delete" title="Delete">
                      <Trash2 :size="14" />
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Inline Reply Input -->
              <transition name="slide-down">
                <div v-if="replyingToCommentId === activity.id" class="inline-reply-container">
                  <div class="inline-reply-input">
                    <textarea
                      v-model="inlineReplyText"
                      placeholder="Write a reply..."
                      class="reply-textarea"
                      rows="2"
                      @keydown.enter.exact="submitInlineReply(activity)"
                      @keydown.esc="cancelInlineReply"
                    ></textarea>
                    
                    <!-- File attachments for reply -->
                    <div v-if="inlineReplyFiles.length > 0" class="inline-reply-files">
                      <div v-for="(file, index) in inlineReplyFiles" :key="index" class="reply-file-item">
                        <File :size="12" />
                        <span>{{ file.name }}</span>
                        <button @click="removeInlineReplyFile(index)" class="btn-remove-inline-file">
                          <X :size="12" />
                        </button>
                      </div>
                    </div>
                    
                    <div class="inline-reply-actions">
                      <div class="reply-action-icons">
                        <button @click="triggerInlineFileInput" class="btn-reply-icon" title="Attach file">
                          <Paperclip :size="14" />
                        </button>
                      </div>
                      <div class="reply-submit-actions">
                        <button @click="cancelInlineReply" class="btn-reply-cancel">Cancel</button>
                        <button 
                          @click="submitInlineReply(activity)" 
                          class="btn-reply-submit"
                          :disabled="!inlineReplyText.trim() && inlineReplyFiles.length === 0 || submittingReply"
                        >
                          <span v-if="submittingReply">Posting...</span>
                          <span v-else>Reply</span>
                        </button>
                      </div>
                    </div>
                    
                    <input
                      type="file"
                      ref="inlineFileInput"
                      @change="handleInlineFileSelect"
                      multiple
                      style="display: none"
                    />
                  </div>
                </div>
              </transition>
              
              <!-- Nested Replies (Threaded) -->
              <transition name="fade">
                <div v-if="activity.replies && activity.replies.length > 0 && !collapsedReplies[activity.id]" class="replies-thread">
                  <div 
                    v-for="reply in activity.replies" 
                    :key="reply.id" 
                    class="reply-card"
                    :class="{ 'editing': editingCommentId === reply.id }"
                  >
                    <!-- Reply Header -->
                    <div class="comment-card-header">
                      <div class="comment-user-avatar reply-avatar">
                        {{ reply.user ? reply.user.name.charAt(0).toUpperCase() : 'U' }}
                      </div>
                      <div class="comment-meta">
                        <span class="comment-user-name">{{ reply.user ? reply.user.name : 'User' }}</span>
                        <span class="comment-timestamp">
                          {{ formatTime(reply.created_at) }}
                          <span v-if="reply.updated_at && reply.updated_at !== reply.created_at" class="edited-indicator">(edited)</span>
                        </span>
                      </div>
                    </div>
                    
                    <!-- Reply Content -->
                    <div class="comment-card-body">
                      <!-- Edit Mode for Reply -->
                      <div v-if="editingCommentId === reply.id" class="comment-edit-mode">
                        <textarea
                          v-model="editCommentText"
                          class="edit-textarea"
                          rows="2"
                          @keydown.esc="cancelEdit"
                        ></textarea>
                        <div class="edit-actions">
                          <button @click="cancelEdit" class="btn-cancel-edit">Cancel</button>
                          <button @click="saveEdit(reply)" class="btn-save-edit" :disabled="savingComment">
                            <span v-if="savingComment">Saving...</span>
                            <span v-else>Save</span>
                          </button>
                        </div>
                      </div>
                      
                      <!-- View Mode for Reply -->
                      <div v-else>
                        <div class="comment-text-full reply-text">
                          {{ reply.comment_text }}
                        </div>
                        
                        <!-- Reply Attachments -->
                        <div v-if="reply.attachments && reply.attachments.length > 0" class="comment-attachments-grid">
                          <div v-for="attachment in reply.attachments" :key="attachment.id" class="attachment-card">
                            <a :href="attachment.file_url" target="_blank" class="attachment-link">
                              <div v-if="attachment.file_type && attachment.file_type.startsWith('image/')" class="attachment-preview">
                                <img :src="attachment.file_url" :alt="attachment.file_name" />
                              </div>
                              <div v-else class="attachment-file-preview">
                                <File :size="16" />
                              </div>
                              <div class="attachment-details">
                                <span class="attachment-name">{{ attachment.file_name }}</span>
                                <span class="attachment-size">{{ formatFileSize(attachment.file_size) }}</span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Reply Actions (Bottom Right) -->
                    <div class="comment-card-footer">
                      <div class="comment-actions-right">
                        <button 
                          v-if="canEditComment(reply)" 
                          @click="startEdit(reply)" 
                          class="btn-action-icon" 
                          title="Edit"
                        >
                          <Edit2 :size="14" />
                        </button>
                        
                        <button @click="confirmDelete(reply)" class="btn-action-icon btn-delete" title="Delete">
                          <Trash2 :size="14" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
            
            <!-- Regular Activity Display -->
            <div v-else class="regular-activity-item">
              <div class="activity-bullet" :class="getActivityDotColor(activity.activity_type)"></div>
              <div class="activity-content-sm">
                <div class="activity-text" v-html="activity.description"></div>
              
                <!-- Show metadata details -->
                <div v-if="activity.metadata" class="activity-details">
                  <!-- Time logged duration -->
                  <span v-if="activity.metadata.time_logged || activity.metadata.duration" class="detail-badge time">
                    ⏱️ {{ formatDuration(activity.metadata.time_logged || activity.metadata.duration) }}
                  </span>
                  
                  <!-- Priority changes -->
                  <span v-if="activity.metadata.old_priority || activity.metadata.new_priority" class="detail-badge">
                    🚩 {{ activity.metadata.old_priority }} → {{ activity.metadata.new_priority }}
                  </span>
                  
                  <!-- Status changes -->
                  <span v-if="activity.metadata.old_status || activity.metadata.new_status" class="detail-badge">
                    📊 {{ activity.metadata.old_status }} → {{ activity.metadata.new_status }}
                  </span>
                  
                  <!-- Internal note indicator -->
                  <span v-if="activity.metadata.is_internal" class="detail-badge internal">
                    🔒 Internal
                  </span>
                </div>
                
                <div class="activity-footer">
                  <span class="activity-user" v-if="activity.user">{{ activity.user.name }}</span>
                  <span class="activity-timestamp-right">{{ formatTime(activity.created_at) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Comment Input at Bottom - ClickUp Style -->
        <div class="comment-input-bottom">
          <!-- Reply Indicator -->
          <div v-if="replyingTo" class="reply-indicator-bar">
            <div class="reply-indicator-content">
              <MessageSquare :size="14" />
              <span>Replying to <strong>{{ replyingTo.user ? replyingTo.user.name : 'User' }}</strong></span>
            </div>
            <button @click="cancelReply" class="btn-cancel-reply">
              <X :size="14" />
            </button>
          </div>
          
          <!-- Voice Recording Preview (above input) -->
          <div v-if="voiceRecording" class="voice-preview-card">
            <div class="voice-preview-header">
              <Mic :size="16" class="voice-icon-active" />
              <span class="voice-label">Voice Message</span>
              <button @click="handleVoiceRecordingRemoved" class="btn-remove-voice" title="Remove">
                <X :size="16" />
              </button>
            </div>
            <div class="voice-preview-player">
              <audio 
                v-if="voiceRecordingURL" 
                :src="voiceRecordingURL" 
                controls 
                class="voice-audio-player"
              ></audio>
              <span class="voice-duration-display">{{ formatVoiceDuration(voiceRecording?.duration) }}</span>
            </div>
          </div>

          <!-- Input Container (Textarea on Top, Icons Below) -->
          <div class="input-container-stacked">
            <!-- Textarea (Full Width on Top) -->
            <textarea 
              ref="commentInput"
              v-model="newComment"
              @keydown="handleCommentKeyDown"
              @input="handleMentionInput"
              :placeholder="voiceRecording ? 'Add a caption (optional)...' : (replyingTo ? 'Write a reply...' : 'Comment')"
              class="comment-textarea-stacked"
              rows="2"
            ></textarea>
            
            <!-- Icons Row Below -->
            <div class="input-actions-bottom">
              <!-- File Attachment Button -->
              <input 
                ref="commentFileInput"
                type="file"
                multiple
                @change="handleCommentFileSelect"
                style="display: none"
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip"
              />
              <button @click="$refs.commentFileInput.click()" class="btn-action-bottom" title="Attach files">
                <Paperclip :size="16" />
              </button>

              <VoiceRecorder 
                ref="voiceRecorderRef"
                @recording-ready="handleVoiceRecordingReady" 
                @recording-removed="handleVoiceRecordingRemoved"
              />
              
              <button @click="showEmojiPicker = !showEmojiPicker" class="btn-action-bottom" title="Add emoji">
                <Smile :size="16" />
              </button>
              
              <button @click="triggerMention" class="btn-action-bottom" title="Mention user">
                <AtSign :size="16" />
              </button>
              
              <button @click="addComment" class="btn-send-bottom" :disabled="!canSendComment">
                <Send :size="16" />
              </button>
            </div>

            <!-- Selected Files Preview with Thumbnails -->
            <div v-if="selectedCommentFiles.length > 0" class="selected-files-preview">
              <div v-for="(file, index) in selectedCommentFiles" :key="index" class="file-preview-item-card">
                <!-- Image Thumbnail -->
                <div v-if="file.type.startsWith('image/')" class="file-thumbnail">
                  <img :src="getFilePreviewUrl(file)" :alt="file.name" />
                </div>
                <!-- File Icon -->
                <div v-else class="file-icon-box">
                  <File :size="20" />
                </div>
                
                <div class="file-info">
                  <span class="file-preview-name">{{ file.name }}</span>
                  <span class="file-preview-size">{{ formatFileSize(file.size) }}</span>
                </div>
                
                <button @click="removeCommentFile(index)" class="btn-remove-file-card">
                  <X :size="14" />
                </button>
              </div>
            </div>
            
            <!-- Mentions List -->
            <MentionsList 
              :show="showMentions"
              :users="assignableUsers"
              :query="mentionQuery"
              @select="insertMention"
              @close="showMentions = false"
            />
            
            <!-- Emoji Picker -->
            <EmojiPicker 
              :show="showEmojiPicker"
              @select="insertEmoji"
              @close="showEmojiPicker = false"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Date Modal -->
    <el-dialog v-model="showDateModal" title="Dates" width="600px">
      <div class="date-modal-content">
        <div class="date-section">
          <label>Start Date</label>
          <el-date-picker
            v-model="ticket.started_at"
            type="date"
            placeholder="Select start date"
            size="large"
            format="MMM DD, YYYY"
            value-format="YYYY-MM-DD"
            @change="handleStartDateChange"
          />
        </div>
        <div class="date-section">
          <label>Due Date</label>
          <el-date-picker
            v-model="ticket.due_date"
            type="date"
            placeholder="Select due date"
            size="large"
            format="MMM DD, YYYY"
            value-format="YYYY-MM-DD"
            @change="handleDueDateChange"
          />
        </div>
      </div>
      <template #footer>
        <el-button @click="showDateModal = false">Close</el-button>
      </template>
    </el-dialog>

    <!-- Time Estimate Modal -->
    <el-dialog v-model="showTimeEstimateModal" title="Time Estimate" width="400px">
      <div class="time-estimate-modal">
        <el-input
          v-model="ticket.time_estimate"
          placeholder="Type in time (e.g., 2h 30m)"
          size="large"
        />
        <p class="help-text">Changes are automatically saved</p>
      </div>
      <template #footer>
        <el-button @click="showTimeEstimateModal = false">Close</el-button>
        <el-button type="primary" @click="saveTimeEstimate">Save</el-button>
      </template>
    </el-dialog>
    
    <!-- Thread View Modal (ClickUp Style) -->
    <el-dialog 
      v-model="threadViewOpen" 
      :show-close="false"
      width="600px"
      class="thread-dialog"
    >
      <template #header>
        <div class="thread-header">
          <button @click="closeThread" class="btn-back">
            <ArrowLeft :size="16" />
            <span>Back</span>
          </button>
          <div class="thread-title">
            <MessageCircle :size="16" />
            <span>Thread by <strong>{{ currentThread?.user?.name || 'User' }}</strong></span>
          </div>
          <span class="thread-follower">1 follower</span>
        </div>
      </template>
      
      <div v-if="currentThread" class="thread-content">
        <!-- Original Comment -->
        <div class="thread-main-comment">
          <div class="comment-activity-header">
            <div class="comment-user-avatar">
              {{ currentThread.user ? currentThread.user.name.charAt(0).toUpperCase() : 'U' }}
            </div>
            <div class="comment-user-info">
              <span class="comment-user-name">{{ currentThread.user ? currentThread.user.name : 'User' }}</span>
              <span class="comment-timestamp">{{ formatTime(currentThread.created_at) }}</span>
            </div>
          </div>
          
          <div class="thread-main-text">
            {{ currentThread.comment_text }}
          </div>
          
          <!-- Main Comment Attachments -->
          <div v-if="currentThread.attachments && currentThread.attachments.length > 0" class="comment-attachments">
            <div v-for="attachment in currentThread.attachments" :key="attachment.id" class="attachment-item-small">
              <a :href="attachment.file_url" target="_blank" class="attachment-link-small">
                <div v-if="attachment.file_type && attachment.file_type.startsWith('image/')" class="attachment-thumb">
                  <img :src="attachment.file_url" :alt="attachment.file_name" />
                </div>
                <div v-else class="attachment-file-icon">
                  <File :size="16" />
                </div>
                <div class="attachment-file-info">
                  <span class="attachment-file-name">{{ attachment.file_name }}</span>
                  <span class="attachment-file-size">{{ formatFileSize(attachment.file_size) }}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Replies Section -->
        <div v-if="currentThread.replies && currentThread.replies.length > 0" class="thread-replies-section">
          <div class="thread-replies-header">{{ currentThread.replies.length }} {{ currentThread.replies.length === 1 ? 'reply' : 'replies' }}</div>
          
          <div v-for="reply in currentThread.replies" :key="reply.id" class="thread-reply-item">
            <div class="reply-header">
              <div class="reply-user-avatar">
                {{ reply.user ? reply.user.name.charAt(0).toUpperCase() : 'U' }}
              </div>
              <div class="reply-user-info">
                <span class="reply-user-name">{{ reply.user ? reply.user.name : 'User' }}</span>
                <span class="reply-timestamp">{{ formatTime(reply.created_at) }}</span>
              </div>
            </div>
            
            <div class="reply-content-thread">
              <div class="reply-text">
                {{ reply.comment_text }}
              </div>
              
              <!-- Reply Attachments -->
              <div v-if="reply.attachments && reply.attachments.length > 0" class="comment-attachments">
                <div v-for="attachment in reply.attachments" :key="attachment.id" class="attachment-item-small">
                  <a :href="attachment.file_url" target="_blank" class="attachment-link-small">
                    <div v-if="attachment.file_type && attachment.file_type.startsWith('image/')" class="attachment-thumb">
                      <img :src="attachment.file_url" :alt="attachment.file_name" />
                    </div>
                    <div v-else class="attachment-file-icon">
                      <File :size="16" />
                    </div>
                    <div class="attachment-file-info">
                      <span class="attachment-file-name">{{ attachment.file_name }}</span>
                      <span class="attachment-file-size">{{ formatFileSize(attachment.file_size) }}</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Reply Input in Thread -->
        <div class="thread-reply-input-section">
          <div class="thread-reply-input-wrapper">
            <!-- File Preview -->
            <div v-if="threadReplyFiles.length > 0" class="selected-files-preview">
              <div v-for="(file, index) in threadReplyFiles" :key="index" class="file-preview-item-card">
                <div v-if="file.type.startsWith('image/')" class="file-thumbnail">
                  <img :src="getFilePreviewUrl(file)" :alt="file.name" />
                </div>
                <div v-else class="file-icon-box">
                  <File :size="20" />
                </div>
                <div class="file-info">
                  <span class="file-preview-name">{{ file.name }}</span>
                  <span class="file-preview-size">{{ formatFileSize(file.size) }}</span>
                </div>
                <button @click="removeThreadReplyFile(index)" class="btn-remove-file-card">
                  <X :size="14" />
                </button>
              </div>
            </div>
            
            <!-- Input Container -->
            <div class="input-container-inline">
              <textarea
                v-model="threadReplyText"
                @keydown="handleThreadReplyKeyDown"
                placeholder="Reply in thread..."
                class="mention-input-inline"
                rows="2"
              ></textarea>
              
              <div class="input-actions-inline">
                <button @click="triggerThreadFileInput" class="btn-inline-icon" title="Attach file">
                  <Paperclip :size="16" />
                </button>
                
                <button @click="sendThreadReply" class="btn-send-inline" :disabled="!threadReplyText.trim() && threadReplyFiles.length === 0">
                  <Send :size="16" />
                </button>
              </div>
            </div>
            
            <input
              type="file"
              ref="threadFileInput"
              @change="handleThreadFileSelect"
              multiple
              style="display: none"
            />
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import Swal from 'sweetalert2'
import ticketService from '@/services/ticketService'
import CustomDatePicker from '@/components/CustomDatePicker.vue'
import VoiceRecorder from '@/components/VoiceRecorder.vue'
import EmojiPicker from '@/components/EmojiPicker.vue'
import MentionsList from '@/components/MentionsList.vue'
import {
  ArrowLeft, Share2, MoreHorizontal, User, Tag, Calendar, Clock, Activity,
  Plus, X, Upload, CheckCircle2, Circle, Eye, Play, Pause, Briefcase,
  AlertCircle, Flag, AlertTriangle, Zap, Inbox, ChevronRight, ChevronDown,
  ChevronsLeft, CheckSquare, Paperclip, Bell, Search, SlidersHorizontal,
  MessageCircle, Smile, AtSign, Mic, Send, Maximize2, Layout, Square, FileText,
  ListChecks, Check, Link, File, MessageSquare, Edit2, Trash2
} from 'lucide-vue-next'

export default {
  name: 'TicketDetail',
  components: {
    CustomDatePicker,
    VoiceRecorder,
    EmojiPicker,
    MentionsList,
    ArrowLeft, Share2, MoreHorizontal, User, Tag, Calendar, Clock, Activity,
    Plus, X, Upload, CheckCircle2, Circle, Eye, Play, Pause, Briefcase,
    AlertCircle, Flag, AlertTriangle, Zap, Inbox, ChevronRight, ChevronDown,
    ChevronsLeft, CheckSquare, Paperclip, Bell, Search, SlidersHorizontal,
    MessageCircle, Smile, AtSign, Mic, Send, Maximize2, Layout, Square, FileText,
    ListChecks, Check, Link, File
  },
  setup() {
    const route = useRoute()
    const toast = useToast()
    const loading = ref(true)
    const newComment = ref('')
    const newSubtask = ref('')
    const showDateModal = ref(false)
    const showTimeEstimateModal = ref(false)
    const timerRunning = ref(false)
    const timeTracked = ref('0:00:00')
    const timerInterval = ref(null)
    const totalSeconds = ref(0)
    const voiceRecording = ref(null)
    const voiceRecordingURL = ref(null)
    const voiceRecorderRef = ref(null)
    const descriptionEditor = ref(null)
    const fileInput = ref(null)
    const attachments = ref([])
    
    // Reply and attachment state
    const replyingTo = ref(null)
    const commentFileInput = ref(null)
    const selectedCommentFiles = ref([])
    
    // Enhanced comment features
    const replyingToCommentId = ref(null)
    const inlineReplyText = ref('')
    const inlineReplyFiles = ref([])
    const inlineFileInput = ref(null)
    const collapsedReplies = reactive({})
    const editingCommentId = ref(null)
    const editCommentText = ref('')
    const savingComment = ref(false)
    const submittingReply = ref(false)
    const deletingComment = ref(false)

    const expandedSections = reactive({
      subtasks: false,
      checklists: false,
      attachments: false
    })

    const ticket = ref({
      id: null,
      ticket_number: '#1',
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      category: 'Technical',
      assignee_id: null,
      assignee: { name: 'Empty' },
      reporter: { name: 'Unknown' },
      started_at: null,
      due_date: null,
      time_estimate: '',
      tags: [],
      created_at: '',
      updated_at: ''
    })

    const subtasks = ref([])
    const comments = ref([])
    const activities = ref([])
    const assignableUsers = ref([])
    const workspaceName = ref('')
    
    // Filter activities - hide those with comment_id in metadata (they're shown as comments)
    const filteredActivities = computed(() => {
      return activities.value.filter(activity => {
        // Hide activities that have comment_id in metadata (except voice messages)
        if (activity.metadata?.comment_id && activity.activity_type !== 'voice_message_sent') {
          return false
        }
        return true
      })
    })
    
    // Comment input features
    const showEmojiPicker = ref(false)
    const showMentions = ref(false)
    const mentionQuery = ref('')
    const commentInput = ref(null)
    const activityPollingInterval = ref(null)

    const completedSubtasksCount = computed(() => {
      return subtasks.value.filter(s => s.completed).length
    })
    
    const canSendComment = computed(() => {
      return newComment.value.trim().length > 0 || 
             voiceRecording.value !== null || 
             selectedCommentFiles.value.length > 0
    })

    // Helper function to validate ticket ID
    const isValidTicketId = () => {
      const id = ticket.value.id || route.params.id
      if (!id || id === 'null' || id === 'undefined' || id === null || id === undefined) {
        console.error('Invalid ticket ID:', id)
        toast.error('Invalid ticket. Please refresh the page.')
        return false
      }
      return true
    }

    const loadTicketData = async () => {
      try {
        loading.value = true
        const ticketId = route.params.id
        
        // Validate ticket ID
        if (!ticketId || ticketId === 'null' || ticketId === 'undefined') {
          console.error('Invalid ticket ID:', ticketId)
          toast.error('Invalid ticket ID. Please select a ticket from the list.')
          loading.value = false
          return
        }

        console.log('Loading ticket with ID:', ticketId)
        const response = await ticketService.getTicket(ticketId)
        
        if (response && response.success && response.data) {
          const data = response.data
          ticket.value = {
            id: data.id,
            ticket_number: data.ticket_number || '#1',
            title: data.title || '',
            description: data.description || '',
            status: data.status,
            priority: data.priority,
            category: data.category,
            assignee_id: data.assignee ? data.assignee.id : null,
            assignee: data.assignee || { name: 'Empty' },
            reporter: data.reporter,
            started_at: data.started_at || null,
            due_date: data.due_date || null,
            time_estimate: data.time_estimate || '',
            tags: data.tags || [],
            created_at: data.created_at,
            updated_at: data.updated_at
          }
          
          console.log('✅ Ticket loaded:')
          console.log('- Started at:', ticket.value.started_at)
          console.log('- Due date:', ticket.value.due_date)
          console.log('- Time estimate:', ticket.value.time_estimate)
          console.log('- Activities count:', (data.activities || []).length)
          
          subtasks.value = data.subtasks || []
          comments.value = data.comments || []
          
          // Load attachments
          if (data.attachments && data.attachments.length > 0) {
            attachments.value = data.attachments.map(att => ({
              id: att.id,
              name: att.file_name,
              size: att.file_size,
              url: att.file_url, // Use file_url accessor from backend
              uploading: false
            }))
          }
          
          // Combine activities and comments into unified timeline
          const commentActivities = (data.comments || [])
            .filter(comment => !comment.parent_id) // Only top-level comments
            .map(comment => ({
              id: `comment-${comment.id}`,
              type: 'comment',
              activity_type: 'comment_added',
              user: comment.user,
              comment_text: comment.comment,
              created_at: comment.created_at,
              description: `<strong>${comment.user?.name || 'Unknown'}</strong> commented`,
              attachments: comment.attachments || [],
              replies: (data.comments || [])
                .filter(reply => reply.parent_id === comment.id)
                .map(reply => ({
                  id: reply.id,
                  user: reply.user,
                  comment_text: reply.comment,
                  created_at: reply.created_at,
                  attachments: reply.attachments || []
                })),
              metadata: {
                comment_id: comment.id,
                is_internal: comment.is_internal
              }
            }))
          
          const allActivities = [...(data.activities || []), ...commentActivities]
          
          // Sort in ascending order (oldest first)
          activities.value = allActivities.sort((a, b) => 
            new Date(a.created_at) - new Date(b.created_at)
          )
          
          // Get workspace name
          if (data.workspace) {
            workspaceName.value = data.workspace.name
          }
          
          // Check if timer is running
          if (data.time_logs && data.time_logs.length > 0) {
            const activeTimer = data.time_logs.find(log => !log.stopped_at)
            if (activeTimer) {
              timerRunning.value = true
              const startTime = new Date(activeTimer.started_at)
              const now = new Date()
              totalSeconds.value = Math.floor((now - startTime) / 1000)
              
              // Start real-time counter
              timerInterval.value = setInterval(() => {
                totalSeconds.value++
                const h = Math.floor(totalSeconds.value / 3600)
                const m = Math.floor((totalSeconds.value % 3600) / 60)
                const s = totalSeconds.value % 60
                timeTracked.value = `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
              }, 1000)
              
              const h = Math.floor(totalSeconds.value / 3600)
              const m = Math.floor((totalSeconds.value % 3600) / 60)
              const s = totalSeconds.value % 60
              timeTracked.value = `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
            }
          }
          
          // Set total time tracked
          if (data.total_time_tracked && !timerRunning.value) {
            const h = Math.floor(data.total_time_tracked / 3600)
            const m = Math.floor((data.total_time_tracked % 3600) / 60)
            const s = data.total_time_tracked % 60
            timeTracked.value = `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
          }
        }
      } catch (error) {
        console.error('Error:', error)
        toast.error('Failed to load ticket')
      } finally {
        loading.value = false
      }
    }

    const formatPriority = (p) => p.charAt(0).toUpperCase() + p.slice(1)

    const formatDateShort = (date) => {
      if (!date) return ''
      try {
        const d = new Date(date)
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      } catch { return '' }
    }

    const formatTime = (date) => {
      if (!date) return ''
      const now = new Date()
      const then = new Date(date)
      const diff = Math.floor((now - then) / 1000)
      if (diff < 60) return 'just now'
      if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
      if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
      const days = Math.floor(diff / 86400)
      return `Jul 28 at ${then.getHours()}:${String(then.getMinutes()).padStart(2, '0')} ${then.getHours() >= 12 ? 'pm' : 'am'}`
    }

    const formatDuration = (value) => {
      if (!value) return '0s'
      
      // If it's already a string (like "8h 35m"), return as is
      if (typeof value === 'string') return value
      
      // If it's a number (seconds), format it
      const seconds = parseInt(value)
      const h = Math.floor(seconds / 3600)
      const m = Math.floor((seconds % 3600) / 60)
      const s = seconds % 60
      if (h > 0) return `${h}h ${m}m`
      if (m > 0) return `${m}m ${s}s`
      return `${s}s`
    }

    const getActivityDotColor = (type) => {
      const colors = {
        'created': 'green',
        'status_changed': 'orange',
        'priority_changed': 'pink',
        'assignee_changed': 'purple',
        'comment_added': 'blue',
        'timer_started': 'green',
        'timer_stopped': 'red',
        'subtask_added': 'purple',
        'subtask_completed': 'green',
        'attachment_added': 'cyan',
        'description_updated': 'gray',
        'title_updated': 'gray',
        'voice_message_sent': 'green'
      }
      return colors[type] || 'gray'
    }

    const toggleTimer = async () => {
      if (!isValidTicketId()) return
      
      try {
        if (timerRunning.value) {
          // Stop timer
          await ticketService.stopTimer(ticket.value.id)
          clearInterval(timerInterval.value)
          timerRunning.value = false
          toast.success('Timer stopped')
        } else {
          // Start timer
          try {
            await ticketService.startTimer(ticket.value.id)
            timerRunning.value = true
            totalSeconds.value = 0
            
            timerInterval.value = setInterval(() => {
              totalSeconds.value++
              const h = Math.floor(totalSeconds.value / 3600)
              const m = Math.floor((totalSeconds.value % 3600) / 60)
              const s = totalSeconds.value % 60
              timeTracked.value = `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
            }, 1000)
            
            toast.success('Timer started')
          } catch (error) {
            if (error.response && error.response.data && error.response.data.message === 'Timer is already running') {
              toast.info('Timer is already running')
            } else {
              throw error
            }
          }
        }
      } catch (error) {
        console.error('Timer error:', error)
        toast.error('Failed to toggle timer')
      }
    }

    const addSubtask = async () => {
      if (!newSubtask.value.trim()) return
      if (!isValidTicketId()) return
      
      try {
        const response = await ticketService.addSubtask(ticket.value.id, newSubtask.value)
        if (response.success) {
          subtasks.value.push(response.data)
          newSubtask.value = ''
          toast.success('Subtask added')
        }
      } catch (error) {
        toast.error('Failed to add subtask')
      }
    }

    const toggleSubtask = async (index) => {
      if (!isValidTicketId()) return
      
      try {
        const subtask = subtasks.value[index]
        await ticketService.toggleSubtask(ticket.value.id, subtask.id)
        subtasks.value[index].completed = !subtasks.value[index].completed
        toast.success('Subtask updated')
      } catch (error) {
        toast.error('Failed to update subtask')
      }
    }

    const addComment = async () => {
      // Check if there's content to send
      if (!newComment.value.trim() && !voiceRecording.value && selectedCommentFiles.value.length === 0) return
      if (!isValidTicketId()) return
      
      try {
        const formData = new FormData()
        
        // Add comment text
        if (newComment.value.trim()) {
          formData.append('comment', newComment.value)
        }
        
        // Add parent_id if replying
        if (replyingTo.value) {
          formData.append('parent_id', replyingTo.value.id)
        }
        
        // Add file attachments
        if (selectedCommentFiles.value.length > 0) {
          selectedCommentFiles.value.forEach((file, index) => {
            formData.append(`attachments[${index}]`, file)
          })
        }

        // Send comment with attachments
        const response = await ticketService.addCommentWithAttachments(ticket.value.id, formData)
        
        if (response.success) {
          const comment = response.data
          
          // If there's a voice recording, link it to this comment
          if (voiceRecording.value && voiceRecorderRef.value) {
            const recordingData = voiceRecorderRef.value.getRecordingData()
            if (recordingData) {
              const voiceFormData = new FormData()
              voiceFormData.append('audio', recordingData.file)
              voiceFormData.append('duration', recordingData.duration)
              voiceFormData.append('comment_id', comment.id)
              
              await ticketService.uploadVoiceRecording(ticket.value.id, voiceFormData)
            }
          }
          
          // Save reply status before clearing
          const wasReply = !!replyingTo.value
          
          // Clear inputs
          newComment.value = ''
          selectedCommentFiles.value = []
          if (voiceRecorderRef.value) {
            voiceRecorderRef.value.deleteRecording()
          }
          voiceRecording.value = null
          if (voiceRecordingURL.value) {
            URL.revokeObjectURL(voiceRecordingURL.value)
            voiceRecordingURL.value = null
          }
          replyingTo.value = null
          
          toast.success(wasReply ? 'Reply added' : 'Comment added')
          
          // Reload activities
          await loadActivities()
          await loadTicketData()
        }
      } catch (error) {
        console.error('Add comment error:', error)
        toast.error('Failed to send message')
      }
    }

    // Emoji picker functions
    const insertEmoji = (emoji) => {
      newComment.value += emoji
      showEmojiPicker.value = false
      if (commentInput.value) {
        commentInput.value.focus()
      }
    }
    
    // Mention functions
    const handleMentionInput = (e) => {
      const text = e.target.value
      const cursorPos = e.target.selectionStart
      const textBeforeCursor = text.substring(0, cursorPos)
      const lastAtSymbol = textBeforeCursor.lastIndexOf('@')
      
      if (lastAtSymbol !== -1 && lastAtSymbol === cursorPos - 1) {
        showMentions.value = true
        mentionQuery.value = ''
      } else if (lastAtSymbol !== -1) {
        const query = textBeforeCursor.substring(lastAtSymbol + 1)
        if (!query.includes(' ')) {
          showMentions.value = true
          mentionQuery.value = query
        } else {
          showMentions.value = false
        }
      } else {
        showMentions.value = false
      }
    }
    
    const triggerMention = () => {
      newComment.value += '@'
      showMentions.value = true
      mentionQuery.value = ''
      if (commentInput.value) {
        commentInput.value.focus()
      }
    }
    
    const insertMention = (user) => {
      const text = newComment.value
      const lastAtSymbol = text.lastIndexOf('@')
      if (lastAtSymbol !== -1) {
        newComment.value = text.substring(0, lastAtSymbol) + `@${user.name} `
      } else {
        newComment.value += `@${user.name} `
      }
      showMentions.value = false
      if (commentInput.value) {
        commentInput.value.focus()
      }
    }
    
    const handleCommentKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        if (canSendComment.value) {
          addComment()
        }
      }
    }
    
    // Voice recording function
    const handleVoiceRecordingReady = (recording) => {
      voiceRecording.value = recording
      
      // Create URL for audio preview
      if (recording && recording.file) {
        voiceRecordingURL.value = URL.createObjectURL(recording.file)
      }
    }

    const handleVoiceRecordingRemoved = () => {
      // Clean up object URL
      if (voiceRecordingURL.value) {
        URL.revokeObjectURL(voiceRecordingURL.value)
        voiceRecordingURL.value = null
      }
      voiceRecording.value = null
    }

    const formatVoiceDuration = (seconds) => {
      if (!seconds) return '0:00'
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins}:${String(secs).padStart(2, '0')}`
    }

    const toggleVoicePlay = (event) => {
      const button = event.currentTarget
      const card = button.closest('.voice-player-card')
      const audio = card.querySelector('.voice-audio-hidden')
      
      if (audio) {
        if (audio.paused) {
          // Pause all other audio
          document.querySelectorAll('.voice-audio-hidden').forEach(a => {
            if (a !== audio) a.pause()
          })
          audio.play()
          button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>'
        } else {
          audio.pause()
          button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>'
        }
      }
    }

    // Description editing functions
    const focusDescription = () => {
      if (descriptionEditor.value) {
        descriptionEditor.value.focus()
      }
    }

    const handleDescriptionEnter = (event) => {
      // Allow Shift+Enter for new line
      if (!event.shiftKey) {
        document.execCommand('insertLineBreak')
      }
    }

    const updateDescription = async () => {
      if (!descriptionEditor.value) return
      if (!isValidTicketId()) return
      
      const newDescription = descriptionEditor.value.innerText.trim()
      
      // Only update if changed
      if (newDescription !== ticket.value.description) {
        try {
          // Save to database
          const response = await ticketService.updateTicket(ticket.value.id, { 
            description: newDescription 
          })
          
          if (response.success) {
            ticket.value.description = newDescription
            toast.success('Description updated')
          }
        } catch (error) {
          console.error('Update description error:', error)
          toast.error('Failed to update description')
          // Revert content to original
          if (descriptionEditor.value) {
            descriptionEditor.value.innerText = ticket.value.description
          }
        }
      }
    }

    // Attachment functions
    const triggerFileInput = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }

    const handleFileSelect = (event) => {
      const files = Array.from(event.target.files)
      uploadFiles(files)
    }

    const handleFileDrop = (event) => {
      const files = Array.from(event.dataTransfer.files)
      uploadFiles(files)
    }

    const uploadFiles = async (files) => {
      if (!isValidTicketId()) return

      for (const file of files) {
        // Create temporary attachment entry
        const tempId = Date.now() + Math.random()
        attachments.value.push({
          id: tempId,
          name: file.name,
          size: file.size,
          uploading: true
        })

        try {
          // Upload file to server
          const response = await ticketService.uploadAttachment(ticket.value.id, file)
          
          if (response.success) {
            // Update with real attachment data from server
            const index = attachments.value.findIndex(a => a.id === tempId)
            if (index !== -1) {
              attachments.value[index] = {
                id: response.data.id,
                name: response.data.file_name,
                size: response.data.file_size,
                url: response.data.file_url, // Use file_url from backend
                uploading: false
              }
            }
            toast.success(`${file.name} uploaded successfully`)
          }
        } catch (error) {
          console.error('Upload error:', error)
          // Remove failed upload from list
          attachments.value = attachments.value.filter(a => a.id !== tempId)
          toast.error(`Failed to upload ${file.name}`)
        }
      }
    }

    const deleteAttachment = async (attachmentId) => {
      if (!isValidTicketId()) return

      try {
        const response = await ticketService.deleteAttachment(ticket.value.id, attachmentId)
        
        if (response.success) {
          attachments.value = attachments.value.filter(a => a.id !== attachmentId)
          toast.success('Attachment removed')
        }
      } catch (error) {
        console.error('Delete attachment error:', error)
        toast.error('Failed to delete attachment')
      }
    }

    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
    }

    // Comment file attachment functions
    const handleCommentFileSelect = (event) => {
      const files = Array.from(event.target.files || [])
      selectedCommentFiles.value = [...selectedCommentFiles.value, ...files]
    }

    const removeCommentFile = (index) => {
      const file = selectedCommentFiles.value[index]
      // Revoke object URL if it exists
      if (file._previewUrl) {
        URL.revokeObjectURL(file._previewUrl)
      }
      selectedCommentFiles.value.splice(index, 1)
    }

    const getFilePreviewUrl = (file) => {
      // Create object URL for image preview
      if (!file._previewUrl && file.type.startsWith('image/')) {
        file._previewUrl = URL.createObjectURL(file)
      }
      return file._previewUrl
    }

    // Reply functions
    const startReply = (comment) => {
      // Extract numeric ID from comment object
      const commentId = comment.metadata?.comment_id || (typeof comment.id === 'string' ? parseInt(comment.id.replace('comment-', '')) : comment.id)
      replyingTo.value = {
        id: commentId,
        user: comment.user,
        comment_text: comment.comment_text
      }
      if (commentInput.value) {
        commentInput.value.focus()
      }
    }

    const cancelReply = () => {
      replyingTo.value = null
    }
    
    // Thread view
    const threadViewOpen = ref(false)
    const currentThread = ref(null)
    const threadReplyText = ref('')
    const threadReplyFiles = ref([])
    const threadFileInput = ref(null)
    
    const openThread = (comment) => {
      currentThread.value = comment
      threadViewOpen.value = true
      // Clear any previous reply input
      threadReplyText.value = ''
      threadReplyFiles.value = []
    }
    
    const closeThread = () => {
      threadViewOpen.value = false
      currentThread.value = null
      threadReplyText.value = ''
      threadReplyFiles.value = []
    }
    
    const triggerThreadFileInput = () => {
      if (threadFileInput.value) {
        threadFileInput.value.click()
      }
    }
    
    const handleThreadFileSelect = (event) => {
      const files = Array.from(event.target.files || [])
      threadReplyFiles.value = [...threadReplyFiles.value, ...files]
    }
    
    const removeThreadReplyFile = (index) => {
      const file = threadReplyFiles.value[index]
      if (file._previewUrl) {
        URL.revokeObjectURL(file._previewUrl)
      }
      threadReplyFiles.value.splice(index, 1)
    }
    
    const handleThreadReplyKeyDown = (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        sendThreadReply()
      }
    }
    
    const sendThreadReply = async () => {
      if (!threadReplyText.value.trim() && threadReplyFiles.value.length === 0) return
      if (!isValidTicketId()) return
      if (!currentThread.value) return
      
      try {
        const formData = new FormData()
        
        // Add comment text
        if (threadReplyText.value.trim()) {
          formData.append('comment', threadReplyText.value)
        }
        
        // Add parent_id
        const parentId = currentThread.value.metadata?.comment_id || 
          (typeof currentThread.value.id === 'string' ? 
            parseInt(currentThread.value.id.replace('comment-', '')) : 
            currentThread.value.id)
        
        formData.append('parent_id', parentId)
        
        // Add file attachments
        if (threadReplyFiles.value.length > 0) {
          threadReplyFiles.value.forEach((file, index) => {
            formData.append(`attachments[${index}]`, file)
          })
        }
        
        // Send reply
        const response = await ticketService.addCommentWithAttachments(ticket.value.id, formData)
        
        if (response.success) {
          toast.success('Reply added')
          
          // Clear inputs
          threadReplyText.value = ''
          threadReplyFiles.value = []
          
          // Reload activities and ticket data
          await loadActivities()
          await loadTicketData()
          
          // Refresh thread to show new reply
          const updatedTicket = await ticketService.getTicket(ticket.value.id)
          if (updatedTicket && updatedTicket.success && updatedTicket.data) {
            const updatedComment = (updatedTicket.data.comments || [])
              .filter(c => !c.parent_id)
              .find(c => c.id === parentId)
            
            if (updatedComment) {
              currentThread.value = {
                ...currentThread.value,
                replies: (updatedTicket.data.comments || [])
                  .filter(reply => reply.parent_id === parentId)
                  .map(reply => ({
                    id: reply.id,
                    user: reply.user,
                    comment_text: reply.comment,
                    created_at: reply.created_at,
                    attachments: reply.attachments || []
                  }))
              }
            }
          }
        }
      } catch (error) {
        console.error('Error sending thread reply:', error)
        toast.error('Failed to send reply')
      }
    }
    
    // Enhanced Comment Functions
    
    // Toggle reply visibility
    const toggleReplies = (commentId) => {
      collapsedReplies[commentId] = !collapsedReplies[commentId]
    }
    
    // Inline reply functions
    const startInlineReply = (comment) => {
      replyingToCommentId.value = comment.metadata?.comment_id || 
        (typeof comment.id === 'string' ? parseInt(comment.id.replace('comment-', '')) : comment.id)
      inlineReplyText.value = ''
      inlineReplyFiles.value = []
    }
    
    const cancelInlineReply = () => {
      replyingToCommentId.value = null
      inlineReplyText.value = ''
      inlineReplyFiles.value = []
    }
    
    const triggerInlineFileInput = () => {
      if (inlineFileInput.value) {
        inlineFileInput.value.click()
      }
    }
    
    const handleInlineFileSelect = (event) => {
      const files = Array.from(event.target.files || [])
      inlineReplyFiles.value = [...inlineReplyFiles.value, ...files]
    }
    
    const removeInlineReplyFile = (index) => {
      inlineReplyFiles.value.splice(index, 1)
    }
    
    const submitInlineReply = async (comment) => {
      if (!inlineReplyText.value.trim() && inlineReplyFiles.value.length === 0) return
      if (!isValidTicketId()) return
      
      submittingReply.value = true
      
      try {
        const formData = new FormData()
        
        if (inlineReplyText.value.trim()) {
          formData.append('comment', inlineReplyText.value)
        }
        
        const parentId = comment.metadata?.comment_id || 
          (typeof comment.id === 'string' ? parseInt(comment.id.replace('comment-', '')) : comment.id)
        
        formData.append('parent_id', parentId)
        
        if (inlineReplyFiles.value.length > 0) {
          inlineReplyFiles.value.forEach((file, index) => {
            formData.append(`attachments[${index}]`, file)
          })
        }
        
        const response = await ticketService.addCommentWithAttachments(ticket.value.id, formData)
        
        if (response.success) {
          toast.success('Reply posted')
          cancelInlineReply()
          await loadActivities()
          await loadTicketData()
        }
      } catch (error) {
        console.error('Error submitting inline reply:', error)
        toast.error('Failed to post reply')
      } finally {
        submittingReply.value = false
      }
    }
    
    // Edit comment functions
    const startEdit = (comment) => {
      editingCommentId.value = comment.id
      editCommentText.value = comment.comment_text
    }
    
    const cancelEdit = () => {
      editingCommentId.value = null
      editCommentText.value = ''
    }
    
    const saveEdit = async (comment) => {
      if (!editCommentText.value.trim()) return
      if (!isValidTicketId()) return
      
      savingComment.value = true
      
      try {
        const response = await ticketService.updateComment(ticket.value.id, comment.id, {
          comment: editCommentText.value
        })
        
        if (response.success) {
          toast.success('Comment updated')
          cancelEdit()
          await loadActivities()
          await loadTicketData()
        }
      } catch (error) {
        console.error('Error updating comment:', error)
        toast.error('Failed to update comment')
      } finally {
        savingComment.value = false
      }
    }
    
    // Delete comment function
    const confirmDelete = async (comment) => {
      if (!isValidTicketId()) return
      
      const result = await Swal.fire({
        title: 'Delete Comment?',
        text: 'This action cannot be undone',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'Cancel'
      })
      
      if (!result.isConfirmed) return
      
      deletingComment.value = true
      
      try {
        const response = await ticketService.deleteComment(ticket.value.id, comment.id)
        
        if (response.success) {
          toast.success('Comment deleted')
          await loadActivities()
          await loadTicketData()
        }
      } catch (error) {
        console.error('Error deleting comment:', error)
        toast.error('Failed to delete comment')
      } finally {
        deletingComment.value = false
      }
    }
    
    // Check if comment can be edited (within 15 minutes)
    const canEditComment = (comment) => {
      const commentTime = new Date(comment.created_at)
      const now = new Date()
      const diffInMinutes = (now - commentTime) / (1000 * 60)
      return diffInMinutes <= 15
    }
    
    // Reply to voice message
    const replyToVoiceMessage = (activity) => {
      // Scroll to comment input
      const commentInput = document.querySelector('.comment-textarea-stacked')
      if (commentInput) {
        commentInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
        commentInput.focus()
        
        // Add reference text
        const voiceUser = activity.user ? activity.user.name : 'User'
        newComment.value = `@${voiceUser} `
        
        toast.info(`Replying to ${voiceUser}'s voice message`)
      }
    }
    
    // Delete voice message
    const deleteVoiceMessage = async (activity) => {
      if (!isValidTicketId()) return
      
      const result = await Swal.fire({
        title: 'Delete Voice Message?',
        text: 'This action cannot be undone. The audio file will be permanently deleted.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'Cancel'
      })
      
      if (!result.isConfirmed) return
      
      try {
        const voiceRecordingId = activity.metadata?.voice_recording_id
        if (!voiceRecordingId) {
          toast.error('Voice recording ID not found')
          return
        }
        
        const response = await ticketService.deleteVoiceRecording(ticket.value.id, voiceRecordingId)
        
        if (response.success) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Voice message has been deleted',
            timer: 2000,
            showConfirmButton: false
          })
          await loadActivities()
        }
      } catch (error) {
        console.error('Error deleting voice message:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete voice message'
        })
      }
    }
    
    // Real-time activity polling
    const loadActivities = async () => {
      if (!isValidTicketId()) return
      
      try {
        const response = await ticketService.getTicket(ticket.value.id)
        if (response && response.success && response.data) {
          const data = response.data
          
          // Update activities without full page reload
          const commentActivities = (data.comments || [])
            .filter(comment => !comment.parent_id) // Only top-level comments
            .map(comment => ({
              id: `comment-${comment.id}`,
              type: 'comment',
              activity_type: 'comment_added',
              user: comment.user,
              comment_text: comment.comment,
              created_at: comment.created_at,
              description: `<strong>${comment.user?.name || 'Unknown'}</strong> commented`,
              attachments: comment.attachments || [],
              replies: (data.comments || [])
                .filter(reply => reply.parent_id === comment.id)
                .map(reply => ({
                  id: reply.id,
                  user: reply.user,
                  comment_text: reply.comment,
                  created_at: reply.created_at,
                  attachments: reply.attachments || []
                })),
              metadata: {
                comment_id: comment.id,
                is_internal: comment.is_internal
              }
            }))
          
          const allActivities = [...(data.activities || []), ...commentActivities]
          activities.value = allActivities.sort((a, b) => 
            new Date(a.created_at) - new Date(b.created_at)
          )
        }
      } catch (error) {
        console.error('Error loading activities:', error)
      }
    }
    
    // Activity polling - removed automatic polling
    // Now only calls loadActivities after user actions
    const startActivityPolling = () => {
      // Removed automatic polling - activities refresh after user actions
    }
    
    const stopActivityPolling = () => {
      // No polling to stop
    }

    const loadAssignableUsers = async () => {
      try {
        const response = await ticketService.getAssignableUsers()
        if (response.success) {
          assignableUsers.value = response.data
        }
      } catch (error) {
        console.error('Error loading users:', error)
      }
    }

    const handlePriorityChange = async () => {
      if (!isValidTicketId()) return
      
      try {
        await ticketService.updateTicket(ticket.value.id, { priority: ticket.value.priority })
        toast.success('Priority updated')
      } catch (error) {
        toast.error('Failed to update priority')
      }
    }

    const handleAssigneeChange = async () => {
      if (!isValidTicketId()) return
      
      try {
        await ticketService.updateTicket(ticket.value.id, { assignee_id: ticket.value.assignee_id })
        toast.success('Assignee updated')
      } catch (error) {
        toast.error('Failed to update assignee')
      }
    }

    const handleDueDateChange = async () => {
      if (!isValidTicketId()) return
      
      try {
        await ticketService.updateTicket(ticket.value.id, { due_date: ticket.value.due_date })
        toast.success('Due date updated')
        showDateModal.value = false
      } catch (error) {
        toast.error('Failed to update due date')
      }
    }

    const changeStatus = async (newStatus) => {
      if (!isValidTicketId()) return
      
      try {
        await ticketService.updateTicket(ticket.value.id, { status: newStatus })
        toast.success('Status updated')
      } catch (error) {
        toast.error('Failed to update status')
      }
    }

    const handleStartDateChange = async () => {
      if (!isValidTicketId()) return
      
      try {
        await ticketService.updateTicket(ticket.value.id, { started_at: ticket.value.started_at })
        toast.success('Start date updated')
        showDateModal.value = false
      } catch (error) {
        toast.error('Failed to update start date')
      }
    }

    const handleTimeEstimateChange = async () => {
      if (!isValidTicketId()) return
      
      try {
        await ticketService.updateTicket(ticket.value.id, { time_estimate: ticket.value.time_estimate })
        toast.success('Time estimate updated')
      } catch (error) {
        toast.error('Failed to update time estimate')
      }
    }

    const saveTimeEstimate = async () => {
      await handleTimeEstimateChange()
      showTimeEstimateModal.value = false
    }

    onMounted(() => {
      loadTicketData()
      loadAssignableUsers()
      startActivityPolling()
    })

    onBeforeUnmount(() => {
      if (timerInterval.value) clearInterval(timerInterval.value)
      stopActivityPolling()
    })

    return {
      loading, ticket, newComment, newSubtask, subtasks, comments, activities, filteredActivities,
      assignableUsers, workspaceName, expandedSections, showDateModal, showTimeEstimateModal,
      timerRunning, timeTracked, completedSubtasksCount, canSendComment,
      showEmojiPicker, showMentions, mentionQuery, commentInput,
      formatPriority, formatDateShort,
      formatTime, formatDuration, getActivityDotColor, toggleTimer, addSubtask, toggleSubtask, addComment,
      changeStatus, handleAssigneeChange, handlePriorityChange, handleDueDateChange,
      handleStartDateChange, handleTimeEstimateChange, saveTimeEstimate,
      insertEmoji, triggerMention, insertMention, handleMentionInput, handleCommentKeyDown,
      handleVoiceRecordingReady,
      handleVoiceRecordingRemoved,
      formatVoiceDuration,
      toggleVoicePlay,
      voiceRecording,
      voiceRecordingURL,
      voiceRecorderRef,
      descriptionEditor,
      focusDescription,
      handleDescriptionEnter,
      updateDescription,
      fileInput,
      attachments,
      triggerFileInput,
      handleFileSelect,
      handleFileDrop,
      deleteAttachment,
      formatFileSize,
      // Reply and file attachment
      replyingTo,
      startReply,
      cancelReply,
      commentFileInput,
      selectedCommentFiles,
      handleCommentFileSelect,
      removeCommentFile,
      getFilePreviewUrl,
      // Thread view
      threadViewOpen,
      currentThread,
      openThread,
      closeThread,
      threadReplyText,
      threadReplyFiles,
      threadFileInput,
      triggerThreadFileInput,
      handleThreadFileSelect,
      removeThreadReplyFile,
      handleThreadReplyKeyDown,
      sendThreadReply,
      // Enhanced comment features
      replyingToCommentId,
      inlineReplyText,
      inlineReplyFiles,
      inlineFileInput,
      collapsedReplies,
      editingCommentId,
      editCommentText,
      savingComment,
      submittingReply,
      deletingComment,
      toggleReplies,
      startInlineReply,
      cancelInlineReply,
      triggerInlineFileInput,
      handleInlineFileSelect,
      removeInlineReplyFile,
      submitInlineReply,
      startEdit,
      cancelEdit,
      saveEdit,
      confirmDelete,
      canEditComment,
      replyToVoiceMessage,
      deleteVoiceMessage
    }
  }
}
</script>

<style scoped>
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #0d1117;
}

.loader {
  text-align: center;
  color: #8b949e;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 1rem;
  border: 3px solid #21262d;
  border-top: 3px solid #8b5cf6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.clickup-detail {
  background: linear-gradient(135deg, #f6f8fc 0%, #f0f4f8 100%);
  color: #1e293b;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.clickup-detail::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 300px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%);
  pointer-events: none;
  z-index: 0;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  position: relative;
  z-index: 10;
}

.top-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-back {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
}

.btn-back:hover {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.25), 0 2px 6px rgba(0, 0, 0, 0.08);
}

.btn-back:active {
  transform: translateY(0);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #475569;
  font-weight: 500;
}

.breadcrumb span:last-child {
  color: #8b5cf6;
  font-weight: 600;
}

.top-right {
  display: flex;
  gap: 0.625rem;
}

.top-btn {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.top-btn:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.main-area {
  display: flex;
  flex: 1;
  overflow: hidden;
  height: calc(100vh - 60px);
}

/* .sidebar-toggle {
  width: 40px;
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
  border: none;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
} */

.sidebar-toggle:hover {
  background: #f8fafc;
}

.content-section {
  background: #ffffff;
  padding: 2.5rem 4rem;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  height: 100%;
  max-height: calc(100vh - 60px);
}

@media (max-width: 1400px) {
  .content-section {
    padding: 2rem 3rem;
  }
}

.content-section::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.content-section::-webkit-scrollbar-track {
  background: transparent;
}

.content-section::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.content-section::-webkit-scrollbar-thumb:hover {
  background: #8b5cf6;
}

.task-type-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 1rem;
}

.task-title {
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 2rem 0;
  outline: none;
  line-height: 1.3;
  letter-spacing: -0.02em;
  transition: color 0.2s;
}

.task-title:hover {
  color: #1e293b;
}

.task-title:focus {
  color: #0f172a;
}

/* Properties - 2 Column Horizontal Layout */
.properties-horizontal {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
}

.property-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.property-field {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 1rem 1.25rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.property-field:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.field-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.field-label svg {
  color: #8b5cf6;
}

.field-select,
.field-input {
  width: 100%;
  border: none !important;
  background: transparent !important;
  padding: 0 !important;
  font-weight: 600;
  color: #1e293b;
}

.select-option {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem;
}

.field-icon-action {
  color: #10b981;
  cursor: pointer;
  transition: all 0.2s;
}

.field-icon-action:hover {
  color: #059669;
  transform: scale(1.1);
}

.dates-merged {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.date-btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.date-btn:hover {
  border-color: #8b5cf6;
  background: #faf5ff;
}

.arrow {
  color: #94a3b8;
}

.avatar-tiny {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #8b5cf6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.track-time-display {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}

.timer-btn {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s;
}

.timer-btn.active {
  background: #fef3c7;
  border-color: #f59e0b;
  color: #d97706;
}

.timer-dot {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
}

.timer-dot.pulsing {
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.2); }
}

.timer-value {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
}

.timer-value.running {
  color: #ef4444;
}

.property-inline {
  display: grid;
  grid-template-columns: 24px 140px 1fr 24px;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.625rem;
  border-radius: 6px;
  transition: background 0.2s;
}

.property-inline:hover {
  background: #f8fafc;
}

.prop-icon {
  color: #94a3b8;
  display: flex;
}

.prop-label {
  font-size: 0.875rem;
  color: #64748b;
}

.prop-value {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #1e293b;
  font-weight: 500;
}

.status-value {
  padding: 0.25rem 0.625rem;
  background: #dbeafe;
  color: #2563eb;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.assignees-value {
  cursor: pointer;
}

.avatar-mini {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #8b5cf6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.time-tracking {
  position: relative;
}

.time-tracking.running {
  color: #f85149;
}

.red-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f85149;
}

.red-dot.pulsing {
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.time-btn {
  padding: 0.25rem 0.5rem;
  background: #21262d;
  border: 1px solid #30363d;
  border-radius: 4px;
  color: #c9d1d9;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
}

.time-value {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  flex: 1;
}

.time-btn-icon {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.time-btn-icon:hover {
  background: #f8fafc;
  border-color: #8b5cf6;
  color: #8b5cf6;
}

.collapse-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.625rem;
  background: transparent;
  border: none;
  color: #6e7681;
  font-size: 0.8125rem;
  cursor: pointer;
}

.description-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.description-section:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.description-header {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 1rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.description-header svg {
  color: #8b5cf6;
}

.description-content {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #1e293b;
  outline: none;
  min-height: 80px;
  cursor: text;
}

.description-content:empty:before {
  content: attr(data-placeholder);
  color: #94a3b8;
  font-style: italic;
}

.description-content:focus {
  outline: 2px solid #8b5cf6;
  outline-offset: 2px;
  border-radius: 6px;
}

.empty-text {
  color: #94a3b8;
  font-style: italic;
  cursor: pointer;
  transition: color 0.2s;
}

.empty-text:hover {
  color: #64748b;
}

.expandable-section {
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
  transition: all 0.2s ease;
}

.expandable-section:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  font-size: 0.8125rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.2s;
}

.section-header:hover {
  background: #f8fafc;
}

.section-header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-header-left svg {
  color: #8b5cf6;
}

.section-header-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
}

.toggle-icon {
  color: #94a3b8;
  transition: all 0.2s;
}

.section-icon {
  color: #8b5cf6;
}

.section-title {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.875rem;
}

.btn-expand-small,
.subtasks-count-badge {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: #ffffff;
  padding: 0.25rem 0.625rem;
  border-radius: 20px;
  font-size: 0.6875rem;
  font-weight: 700;
  border: none;
  box-shadow: 0 2px 4px rgba(139, 92, 246, 0.2);
}

.btn-add-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1.5px dashed #cbd5e1;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
}

.btn-add-icon:hover {
  background: #f8fafc;
  border-color: #8b5cf6;
  color: #8b5cf6;
}

.btn-add-small,
.btn-toggle-small {
  margin-left: auto;
  padding: 0.25rem;
  background: transparent;
  border: none;
  color: #8b5cf6;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.btn-add-small:hover,
.btn-toggle-small:hover {
  background: #f3e8ff;
}

.section-content {
  padding: 1.25rem;
  background: #ffffff;
}

.add-subtask-inline {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.875rem 1rem;
  background: #f8fafc;
  border-radius: 10px;
  border: 1.5px solid #e2e8f0;
  transition: all 0.2s ease;
}

.add-subtask-inline:focus-within {
  background: #ffffff;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.input-icon {
  color: #8b5cf6;
  flex-shrink: 0;
}

.subtask-input-inline {
  flex: 1;
  padding: 0;
  background: transparent;
  border: none;
  color: #1e293b;
  font-size: 0.875rem;
  font-weight: 500;
  outline: none;
}

.subtask-input-inline::placeholder {
  color: #94a3b8;
  font-weight: 400;
}

.btn-save-inline {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(139, 92, 246, 0.25);
}

.btn-save-inline:hover {
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.35);
}

.btn-save-inline:active {
  transform: translateY(0);
}

.btn-save-small {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-save-small:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.subtask-item-inline {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.2s;
  position: relative;
}

.subtask-item-inline:hover {
  border-color: #c4b5fd;
  background: #faf8ff;
  box-shadow: 0 2px 4px rgba(139, 92, 246, 0.08);
}

.subtask-item-inline:hover .subtask-delete-btn {
  opacity: 1;
}

.subtask-checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid #cbd5e1;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}

.subtask-checkbox:hover {
  border-color: #8b5cf6;
}

.subtask-checkbox.checked {
  background: linear-gradient(135deg, #10b981, #059669);
  border-color: #10b981;
  color: white;
}

.subtask-item-inline span {
  flex: 1;
  font-size: 0.875rem;
  color: #1e293b;
  line-height: 1.5;
}

.subtask-item-inline span.completed {
  text-decoration: line-through;
  color: #94a3b8;
}

.subtask-delete-btn {
  opacity: 0;
  padding: 0.25rem;
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.subtask-delete-btn:hover {
  background: #fee2e2;
  color: #ef4444;
}

.checklist-container {
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
}

.checklist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: 700;
  font-size: 0.875rem;
  color: #1e293b;
}

.checklist-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 0.625rem;
  transition: all 0.2s ease;
}

.checklist-item:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.checklist-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #1e293b;
  font-size: 0.875rem;
  outline: none;
  font-weight: 500;
}

.checklist-footer {
  display: flex;
  gap: 0.625rem;
  margin-top: 1rem;
}

.btn-checklist-action {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #475569;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-checklist-action:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.activity-sidebar {
  background: #f8fafc;
  border-left: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  width: 420px;
  flex-shrink: 0;
}

.activity-header-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.8125rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: #ffffff;
}

.activity-header-bar svg {
  color: #8b5cf6;
}

.btn-icon-sm {
  padding: 0.375rem;
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
}

.btn-icon-sm:hover {
  background: #f1f5f9;
  color: #64748b;
}

.btn-icon-sm:hover {
  background: #f8fafc;
  color: #64748b;
}

.activity-list {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  max-height: calc(100vh - 300px);
}

.activity-list::-webkit-scrollbar {
  width: 6px;
}

.activity-list::-webkit-scrollbar-track {
  background: transparent;
}

.activity-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.activity-list::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.activity-item-sm {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
  padding: 0.75rem 1rem;
  font-size: 0.75rem;
  align-items: flex-start;
  border-radius: 0;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.activity-item-sm:hover {
  background: #ffffff;
  border-left-color: #8b5cf6;
}

.activity-bullet {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #8b5cf6;
  margin-top: 0.5rem;
  flex-shrink: 0;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
}

.activity-bullet.green { 
  background: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
}
.activity-bullet.orange { 
  background: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.15);
}
.activity-bullet.pink { 
  background: #ec4899;
  box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.15);
}
.activity-bullet.purple { 
  background: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
}
.activity-bullet.blue { 
  background: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}
.activity-bullet.red { 
  background: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}
.activity-bullet.cyan { 
  background: #06b6d4;
  box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.15);
}
.activity-bullet.gray { 
  background: #94a3b8;
  box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.15);
}

.activity-content-sm {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.activity-content-sm > div {
  color: #475569;
  line-height: 1.5;
  font-size: 0.875rem;
}

.activity-text {
  color: #1e293b;
  font-weight: 500;
  font-size: 0.6875rem;
  line-height: 1.5;
}

/* Voice Message Styles - ClickUp Design */
.voice-activity-item {
  padding: 0.75rem 0;
  margin: 0.5rem 0;
}

.voice-activity-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.625rem;
}

.voice-user-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  flex-shrink: 0;
}

.voice-user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.voice-user-name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #1e293b;
}

.voice-timestamp {
  font-size: 0.6875rem;
  color: #94a3b8;
  font-weight: 400;
}

.voice-player-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #18181b;
  border-radius: 16px;
  margin-left: 2.5rem;
  max-width: 320px;
  transition: all 0.2s ease;
}

.voice-player-card:hover {
  background: #27272a;
}

.voice-play-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  min-width: 28px;
  background: white;
  border: none;
  border-radius: 50%;
  color: #18181b;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}

.voice-play-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.voice-play-btn:active {
  transform: scale(0.98);
}

.voice-waveform {
  flex: 1;
  height: 20px;
  position: relative;
  overflow: hidden;
}

.voice-audio-hidden {
  display: none;
}

.waveform-bars {
  display: flex;
  align-items: center;
  gap: 2px;
  height: 100%;
}

.waveform-bars .bar {
  flex: 1;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 2px;
  min-width: 2px;
  transition: all 0.3s ease;
}

.voice-player-card:hover .waveform-bars .bar {
  background: rgba(255, 255, 255, 0.7);
}

.voice-time {
  font-size: 0.6875rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  font-family: monospace;
  white-space: nowrap;
  padding-left: 0.25rem;
}

.voice-caption {
  margin-left: 2.5rem;
  margin-top: 0.5rem;
  font-size: 0.8125rem;
  color: #475569;
  line-height: 1.5;
  padding: 0.5rem 0.875rem;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  max-width: 380px;
}

/* Comment Activity Styles (ClickUp-Inspired) */
.comment-activity-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.comment-activity-header {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.comment-user-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(139, 92, 246, 0.2);
}

.comment-user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.comment-user-name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #1e293b;
}

.comment-timestamp {
  font-size: 0.6875rem;
  color: #94a3b8;
  font-weight: 500;
}

.comment-content-card {
  margin-left: 2.375rem;
  background: #fafbfc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.comment-text {
  font-size: 0.8125rem;
  color: #475569;
  line-height: 1.6;
  overflow: visible;
  max-height: none;
  white-space: pre-wrap;
  word-break: break-word;
}

.comment-attachments {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.attachment-item-small {
  width: 100%;
  max-width: 220px;
}

.attachment-link-small {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.attachment-link-small:hover {
  border-color: #8b5cf6;
  background: #faf5ff;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.12);
}

.attachment-thumb {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
  background: #f1f5f9;
}

.attachment-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.attachment-file-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 4px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
}

.attachment-file-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
}

.attachment-file-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: #475569;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.attachment-file-size {
  font-size: 0.6875rem;
  color: #94a3b8;
  font-weight: 500;
}

.comment-actions-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-top: 0.625rem;
  margin-top: 0.625rem;
  border-top: 1px solid #e2e8f0;
}

.btn-comment-action {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.625rem;
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.btn-comment-action:hover {
  background: #f1f5f9;
  color: #8b5cf6;
}

.btn-comment-action svg {
  flex-shrink: 0;
}

/* Reply Count Badge (ClickUp Style) */
.btn-reply-count {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.625rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s ease;
  margin-left: auto;
}

.btn-reply-count:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #475569;
}

.reply-avatars {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.reply-avatar-tiny {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.625rem;
  font-weight: 600;
  border: 2px solid white;
  margin-left: -8px;
}

.reply-avatar-tiny:first-child {
  margin-left: 0;
}

/* Thread View Modal (ClickUp Style) */
.thread-dialog :deep(.el-dialog__header) {
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #e2e8f0;
}

.thread-dialog :deep(.el-dialog__body) {
  padding: 0;
  max-height: 70vh;
  overflow-y: auto;
}

.thread-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: #ffffff;
}

.btn-back {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s ease;
}

.btn-back:hover {
  background: #f1f5f9;
  color: #475569;
}

.thread-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9375rem;
  color: #1e293b;
  font-weight: 500;
  flex: 1;
  justify-content: center;
}

.thread-title svg {
  color: #8b5cf6;
}

.thread-title strong {
  color: #8b5cf6;
  font-weight: 600;
}

.thread-follower {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
}

.thread-content {
  padding: 1.5rem;
}

.thread-main-comment {
  background: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;
}

.thread-main-text {
  margin-top: 0.75rem;
  margin-left: 2.375rem;
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
}

.thread-replies-section {
  margin-top: 1.5rem;
}

.thread-replies-header {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.thread-reply-item {
  background: #fafbfc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.75rem;
}

.thread-reply-item:last-child {
  margin-bottom: 0;
}

.reply-content-thread {
  margin-top: 0.75rem;
}

/* Thread Reply Input Section */
.thread-reply-input-section {
  position: sticky;
  bottom: 0;
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
  padding: 1rem 1.5rem;
  margin: 0 -1.5rem -1.5rem;
}

.thread-reply-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.thread-reply-input-wrapper .input-container-inline {
  background: #f8fafc;
}

.thread-reply-input-wrapper .mention-input-inline {
  min-height: 60px;
  max-height: 120px;
}

/* Nested Replies */
.nested-replies {
  margin-left: 2.375rem;
  padding-left: 1rem;
  border-left: 2px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.reply-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.reply-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reply-user-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 600;
  flex-shrink: 0;
}

.reply-user-info {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.reply-user-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: #1e293b;
}

.reply-timestamp {
  font-size: 0.625rem;
  color: #94a3b8;
  font-weight: 500;
}

.reply-content {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.625rem 0.75rem;
}

.reply-text {
  font-size: 0.75rem;
  color: #475569;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}

.comment-activity-item,
.regular-activity-item {
  display: contents;
}

.activity-details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 0.25rem;
}

.detail-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.6875rem;
  font-weight: 700;
  color: #64748b;
  transition: all 0.2s;
}

.detail-badge:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.detail-badge.time {
  background: #fef3c7;
  border-color: #fbbf24;
  color: #d97706;
}

.detail-badge.time:hover {
  background: #fef08a;
}

.detail-badge.comment {
  background: #dbeafe;
  border-color: #60a5fa;
  color: #2563eb;
}

.comment-text {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 3px solid #3b82f6;
  padding: 0.625rem 0.875rem;
  margin: 0.375rem 0;
  border-radius: 6px;
  color: #1e293b;
  font-size: 0.8125rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  overflow: visible;
  max-height: none;
}

/* Old voice player styles removed - using new ClickUp design */

.activity-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.activity-user {
  font-size: 0.6875rem;
  color: #64748b;
  font-weight: 600;
}

.activity-timestamp {
  font-size: 0.6875rem;
  color: #94a3b8;
  font-weight: 500;
}

.activity-timestamp-right {
  font-size: 0.6875rem;
  color: #94a3b8;
  font-weight: 500;
  margin-left: auto;
  white-space: nowrap;
  padding: 0.125rem 0.5rem;
  background: #f8fafc;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
}

.detail-badge.internal {
  background: #fee2e2;
  border-color: #f87171;
  color: #dc2626;
}

/* Reply Indicator Bar */
.reply-indicator-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 0.875rem;
  background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
  border: 1px solid #e9d5ff;
  border-radius: 6px;
  margin-bottom: 0.75rem;
}

.reply-indicator-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #6b21a8;
  font-weight: 500;
}

.reply-indicator-content svg {
  color: #8b5cf6;
}

.reply-indicator-content strong {
  color: #7c3aed;
  font-weight: 600;
}

.btn-cancel-reply {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: white;
  border: 1px solid #e9d5ff;
  color: #a855f7;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.btn-cancel-reply:hover {
  background: #fae8ff;
  border-color: #d8b4fe;
  color: #7c3aed;
  transform: scale(1.05);
}

.comment-input-bottom {
  padding: 0.75rem 1.25rem 1.25rem;
  border-top: 1px solid #e2e8f0;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Input Container with Icons Inside - ClickUp Style */
/* Stacked Input Layout (Textarea on Top, Icons Below) */
.input-container-stacked {
  position: relative;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  padding: 0;
  transition: all 0.2s ease;
  overflow: hidden;
}

.input-container-stacked:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.input-container-stacked:focus-within {
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1), 0 4px 12px rgba(139, 92, 246, 0.08);
}

.comment-textarea-stacked {
  width: 100%;
  min-height: 60px;
  max-height: 150px;
  padding: 0.75rem 1rem;
  border: none;
  outline: none;
  background: transparent;
  color: #1e293b;
  font-size: 0.8125rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  resize: vertical;
  line-height: 1.5;
}

.comment-textarea-stacked::placeholder {
  color: #94a3b8;
  font-weight: 400;
}

.input-actions-bottom {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.625rem 1rem;
  background: #fafbfc;
  border-top: 1px solid #e2e8f0;
}

.btn-action-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  background: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s ease;
}

.btn-action-bottom:hover {
  background: #e2e8f0;
  color: #8b5cf6;
  transform: scale(1.05);
}

.btn-send-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s ease;
  margin-left: auto;
}

.btn-send-bottom:hover:not(:disabled) {
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(139, 92, 246, 0.4);
}

.btn-send-bottom:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

.input-container-inline {
  position: relative;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  transition: all 0.2s ease;
}

.input-container-inline:hover {
  border-color: #cbd5e1;
  background: #fafafa;
}

.input-container-inline:focus-within {
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  background: #ffffff;
}

/* Reply Indicator */
.reply-indicator {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  margin: -0.5rem -0.75rem 0.5rem;
  background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
  border-radius: 6px 6px 0 0;
  border-bottom: 1px solid #c4b5fd;
}

.reply-to-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #7c3aed;
  font-size: 0.75rem;
  font-weight: 500;
}

.reply-to-info strong {
  font-weight: 700;
  color: #6d28d9;
}

.btn-cancel-reply {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 4px;
  color: #7c3aed;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-cancel-reply:hover {
  background: white;
  transform: scale(1.1);
}

/* Input Row */
.input-row {
  display: flex;
  align-items: center;
}

.mention-input-inline {
  flex: 1;
  min-height: 36px;
  max-height: 120px;
  padding: 0.375rem 0.5rem;
  background: transparent;
  border: none;
  outline: none;
  color: #1e293b;
  font-size: 0.8125rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  resize: none;
  line-height: 1.5;
}

.mention-input-inline::placeholder {
  color: #94a3b8;
  font-weight: 400;
}

.input-actions-inline {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding-left: 0.5rem;
  border-left: 1px solid #e2e8f0;
  margin-left: 0.5rem;
}

.btn-inline-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s ease;
}

.btn-inline-icon:hover {
  background: #f1f5f9;
  color: #8b5cf6;
}

.btn-inline-icon:active {
  transform: scale(0.95);
}

.btn-send-inline {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(139, 92, 246, 0.2);
}

.btn-send-inline:hover:not(:disabled) {
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(139, 92, 246, 0.3);
}

.btn-send-inline:active:not(:disabled) {
  transform: translateY(0);
}

.btn-send-inline:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Selected Files Preview with Thumbnails */
.selected-files-preview {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #e2e8f0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.625rem;
}

.file-preview-item-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.file-preview-item-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.file-thumbnail {
  width: 100%;
  height: 80px;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.file-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-icon-box {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  color: #64748b;
}

.file-info {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.file-preview-name {
  font-size: 0.6875rem;
  font-weight: 600;
  color: #475569;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.2;
}

.file-preview-size {
  font-size: 0.625rem;
  color: #94a3b8;
  font-weight: 500;
}

.btn-remove-file-card {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  color: #ef4444;
  cursor: pointer;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.15s ease;
  opacity: 0;
}

.file-preview-item-card:hover .btn-remove-file-card {
  opacity: 1;
}

.btn-remove-file-card:hover {
  background: #fee2e2;
  transform: scale(1.1);
}

/* Emoji Picker Positioning Fix */
.input-container-inline .emoji-picker-wrapper {
  position: absolute;
  bottom: calc(100% + 0.5rem);
  right: 0;
  z-index: 200;
}

.input-container-inline .mentions-list {
  position: absolute;
  bottom: calc(100% + 0.5rem);
  left: 0;
  z-index: 200;
}

/* Voice Preview Card */
.voice-preview-card {
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
  border: 2px solid #8b5cf6;
  border-radius: 12px;
  padding: 1rem;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.voice-preview-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.voice-icon-active {
  color: #8b5cf6;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.voice-label {
  font-size: 0.875rem;
  font-weight: 700;
  color: #7c3aed;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  flex: 1;
}

.btn-remove-voice {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 6px;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-remove-voice:hover {
  background: #fee2e2;
  transform: scale(1.1);
}

.voice-preview-player {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.75rem 1rem;
  border-radius: 8px;
}

.voice-audio-player {
  flex: 1;
  height: 32px;
  outline: none;
}

.voice-audio-player::-webkit-media-controls-panel {
  background: transparent;
}

.voice-duration-display {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #7c3aed;
  background: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.input-wrapper {
  position: relative;
}

/* Plain Textarea - ClickUp Style */
.mention-input {
  width: 100%;
  min-height: 40px;
  max-height: 120px;
  padding: 0.625rem 0.875rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  color: #1e293b;
  font-size: 0.8125rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  outline: none;
  transition: all 0.15s ease;
  resize: none;
  line-height: 1.5;
  box-shadow: none;
}

.mention-input.with-voice {
  min-height: 36px;
}

.mention-input::placeholder {
  color: #94a3b8;
  font-weight: 400;
  font-size: 0.8125rem;
}

.mention-input:hover {
  background: rgba(0, 0, 0, 0.02);
  border-color: rgba(0, 0, 0, 0.06);
}

.mention-input:focus {
  background: #ffffff;
  border-color: #e2e8f0;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.08);
}

.comment-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: #f8fafc;
  border-radius: 10px;
}

.action-divider {
  width: 1px;
  height: 24px;
  background: #e2e8f0;
  margin: 0 0.25rem;
}

.btn-action-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.btn-action-icon:hover {
  background: #ffffff;
  color: #8b5cf6;
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.btn-action-icon:active {
  transform: scale(0.95);
}

.btn-send-modern {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 0.9375rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  margin-left: auto;
}

.btn-send-modern:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.5);
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
}

.btn-send-modern:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
}

.btn-send-modern:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 2px 6px rgba(139, 92, 246, 0.2);
}

.send-icon {
  transition: transform 0.2s ease;
}

.btn-send-modern:hover:not(:disabled) .send-icon {
  transform: translateX(2px);
}

.send-text {
  font-weight: 700;
  letter-spacing: 0.02em;
}

/* Legacy support */
.btn-comment-send {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 0.8125rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.25);
}

.btn-comment-send:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.4);
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
}

.btn-comment-send:active:not(:disabled) {
  transform: translateY(0);
}

.btn-comment-send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.mx-1 {
  margin: 0 0.25rem;
}

/* Element Plus Overrides */
:deep(.status-select .el-input__wrapper),
:deep(.assignee-select .el-input__wrapper),
:deep(.priority-select .el-input__wrapper) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
}

:deep(.date-picker-inline .el-input__wrapper) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0.25rem 0.5rem !important;
}

.status-option,
.priority-option,
.user-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.status-option.backlog { color: #64748b; }
.status-option.todo { color: #2563eb; }
.status-option.progress { color: #d97706; }
.status-option.review { color: #f59e0b; }
.status-option.complete { color: #059669; }

.priority-option.low { color: #10b981; }
.priority-option.medium { color: #3b82f6; }
.priority-option.high { color: #f59e0b; }
.priority-option.urgent { color: #ef4444; }

.user-type {
  margin-left: auto;
  font-size: 0.75rem;
  color: #94a3b8;
  background: #f1f5f9;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
}

.tags-value {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  align-items: center;
}

.tag-chip {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: #f3e8ff;
  color: #8b5cf6;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.tag-remove {
  cursor: pointer;
  opacity: 0.6;
}

.tag-remove:hover {
  opacity: 1;
}

.tag-input {
  flex: 1;
  min-width: 100px;
  border: none;
  background: transparent;
  font-size: 0.875rem;
  color: #1e293b;
  outline: none;
}

.tag-input::placeholder {
  color: #94a3b8;
}

.dates-value-split {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.date-trigger-inline {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.5rem;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.date-trigger-inline:hover {
  background: #f1f5f9;
}

.date-arrow {
  color: #94a3b8;
  font-size: 0.875rem;
}

/* Modal Styles */
.date-modal-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.date-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.date-section label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
}

.time-estimate-modal {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.help-text {
  font-size: 0.8125rem;
  color: #94a3b8;
  margin: 0;
}

/* Attachments */
.attachment-upload-area {
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f8fafc;
  margin-bottom: 1rem;
}

.attachment-upload-area:hover {
  border-color: #8b5cf6;
  background: #f5f3ff;
}

.upload-icon {
  color: #8b5cf6;
  margin-bottom: 0.75rem;
}

.upload-text {
  margin: 0;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
}

.attachments-list {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.attachment-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.attachment-item:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.file-icon {
  color: #8b5cf6;
  flex-shrink: 0;
}

.file-name {
  flex: 1;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e293b;
}

.file-link {
  color: #8b5cf6;
  text-decoration: none;
  transition: all 0.2s;
}

.file-link:hover {
  color: #7c3aed;
  text-decoration: underline;
}

.file-size {
  font-size: 0.75rem;
  color: #94a3b8;
}

.file-status {
  font-size: 0.75rem;
  color: #8b5cf6;
  font-weight: 600;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.btn-delete-attachment {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-delete-attachment:hover {
  background: #fee2e2;
  color: #ef4444;
}

/* Enhanced Comment System - Compact Design */
.comment-thread-container {
  margin-bottom: 1rem;
}

.comment-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  transition: all 0.2s ease;
}

.comment-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.comment-card-header {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 0.625rem;
}

.comment-user-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.reply-avatar {
  width: 24px;
  height: 24px;
  font-size: 0.6875rem;
}

.comment-meta {
  display: flex;
  flex-direction: column;
  gap: 0.0625rem;
}

.comment-user-name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #1e293b;
}

.comment-timestamp {
  font-size: 0.6875rem;
  color: #94a3b8;
}

.comment-card-body {
  margin-bottom: 0.625rem;
}

.comment-text-full {
  font-size: 0.8125rem;
  color: #475569;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}

.reply-text {
  font-size: 0.75rem;
  color: #64748b;
}

.comment-edit-mode {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.edit-textarea {
  width: 100%;
  padding: 0.625rem;
  border: 2px solid #8b5cf6;
  border-radius: 6px;
  font-size: 0.8125rem;
  resize: vertical;
  min-height: 60px;
}

.edit-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.btn-cancel-edit,
.btn-save-edit {
  padding: 0.375rem 0.875rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.btn-cancel-edit {
  background: #f1f5f9;
  color: #64748b;
}

.btn-save-edit {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
}

.comment-attachments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.5rem;
  margin-top: 0.625rem;
}

.attachment-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
}

.attachment-preview {
  width: 100%;
  height: 80px;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.attachment-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.attachment-file-preview {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  color: #64748b;
}

.attachment-details {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.attachment-name {
  font-size: 0.6875rem;
  font-weight: 600;
  color: #475569;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.attachment-size {
  font-size: 0.625rem;
  color: #94a3b8;
}

.comment-card-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 0.5rem;
  border-top: 1px solid #e2e8f0;
}

.comment-actions-right {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.btn-action-icon {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.375rem;
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 0.6875rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.btn-action-icon:hover {
  background: #f1f5f9;
  color: #8b5cf6;
}

.btn-action-icon.btn-delete:hover {
  background: #fee2e2;
  color: #ef4444;
}

.reply-count-text {
  font-size: 0.6875rem;
  font-weight: 600;
}

.inline-reply-container {
  margin-top: 0.625rem;
  margin-left: 2rem;
}

.inline-reply-input {
  background: #fafbfc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.625rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.reply-textarea {
  width: 100%;
  padding: 0.5rem 0.625rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.75rem;
  resize: none;
  min-height: 50px;
}

.inline-reply-files {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.reply-file-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 0.6875rem;
}

.btn-remove-inline-file {
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
  border-radius: 4px;
}

.inline-reply-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reply-action-icons {
  display: flex;
  gap: 0.25rem;
}

.btn-reply-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  background: white;
  border: 1px solid #e2e8f0;
  color: #64748b;
  cursor: pointer;
  border-radius: 6px;
}

.reply-submit-actions {
  display: flex;
  gap: 0.375rem;
}

.btn-reply-cancel,
.btn-reply-submit {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.btn-reply-cancel {
  background: white;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.btn-reply-submit {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  min-width: 70px;
}

.replies-thread {
  margin-top: 0.625rem;
  margin-left: 2rem;
  padding-left: 0.875rem;
  border-left: 2px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.reply-card {
  background: #fafbfc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.625rem 0.875rem;
}

.reply-card:hover {
  border-color: #cbd5e1;
  background: #f8fafc;
}

.slide-down-enter-active,
.fade-enter-active {
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Voice Message Actions */
.voice-actions {
  display: flex;
  gap: 0.375rem;
  margin-top: 0.5rem;
  margin-left: 2.5rem;
}

.btn-voice-action {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: transparent;
  border: 1px solid #e2e8f0;
  color: #64748b;
  font-size: 0.6875rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.btn-voice-action:hover {
  background: #f1f5f9;
  border-color: #8b5cf6;
  color: #8b5cf6;
}

.btn-voice-delete:hover {
  background: #fee2e2;
  border-color: #ef4444;
  color: #ef4444;
}

/* Edited Indicator */
.edited-indicator {
  font-style: italic;
  color: #94a3b8;
  font-size: 0.625rem;
  margin-left: 0.25rem;
}
</style>

