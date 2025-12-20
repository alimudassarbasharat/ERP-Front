import api from '@/utils/axios'

/**
 * Ticket Service
 * Handles all API calls related to tickets
 */
const ticketService = {
  /**
   * Get a single ticket by ID
   * @param {number|string} ticketId - Ticket ID or ticket number (TKT-001)
   * @returns {Promise}
   */
  async getTicket(ticketId) {
    try {
      const response = await api.get(`/tickets/${ticketId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching ticket:', error)
      throw error
    }
  },

  /**
   * Get all tickets with optional filters
   * @param {Object} filters - Filter parameters
   * @returns {Promise}
   */
  async getTickets(filters = {}) {
    try {
      const response = await api.get('/tickets', { params: filters })
      return response.data
    } catch (error) {
      console.error('Error fetching tickets:', error)
      throw error
    }
  },

  /**
   * Create a new ticket
   * @param {Object} ticketData - Ticket data
   * @returns {Promise}
   */
  async createTicket(ticketData) {
    try {
      const response = await api.post('/tickets', ticketData)
      return response.data
    } catch (error) {
      console.error('Error creating ticket:', error)
      throw error
    }
  },

  /**
   * Update a ticket
   * @param {number} ticketId - Ticket ID
   * @param {Object} updateData - Data to update
   * @returns {Promise}
   */
  async updateTicket(ticketId, updateData) {
    try {
      const response = await api.put(`/tickets/${ticketId}`, updateData)
      return response.data
    } catch (error) {
      console.error('Error updating ticket:', error)
      throw error
    }
  },

  /**
   * Delete a ticket
   * @param {number} ticketId - Ticket ID
   * @returns {Promise}
   */
  async deleteTicket(ticketId) {
    try {
      const response = await api.delete(`/tickets/${ticketId}`)
      return response.data
    } catch (error) {
      console.error('Error deleting ticket:', error)
      throw error
    }
  },

  /**
   * Add a subtask to a ticket
   * @param {number} ticketId - Ticket ID
   * @param {string} title - Subtask title
   * @returns {Promise}
   */
  async addSubtask(ticketId, title) {
    try {
      const response = await api.post(`/tickets/${ticketId}/subtasks`, { title })
      return response.data
    } catch (error) {
      console.error('Error adding subtask:', error)
      throw error
    }
  },

  /**
   * Toggle subtask completion status
   * @param {number} ticketId - Ticket ID
   * @param {number} subtaskId - Subtask ID
   * @returns {Promise}
   */
  async toggleSubtask(ticketId, subtaskId) {
    try {
      const response = await api.put(`/tickets/${ticketId}/subtasks/${subtaskId}/toggle`)
      return response.data
    } catch (error) {
      console.error('Error toggling subtask:', error)
      throw error
    }
  },

  /**
   * Delete a subtask
   * @param {number} ticketId - Ticket ID
   * @param {number} subtaskId - Subtask ID
   * @returns {Promise}
   */
  async deleteSubtask(ticketId, subtaskId) {
    try {
      const response = await api.delete(`/tickets/${ticketId}/subtasks/${subtaskId}`)
      return response.data
    } catch (error) {
      console.error('Error deleting subtask:', error)
      throw error
    }
  },

  /**
   * Add a comment to a ticket
   * @param {number} ticketId - Ticket ID
   * @param {string} comment - Comment text
   * @param {Object} options - Additional options (parent_id, is_internal)
   * @returns {Promise}
   */
  async addComment(ticketId, comment, options = {}) {
    try {
      const response = await api.post(`/tickets/${ticketId}/comments`, {
        comment,
        ...options
      })
      return response.data
    } catch (error) {
      console.error('Error adding comment:', error)
      throw error
    }
  },

  async addCommentWithAttachments(ticketId, formData) {
    try {
      const response = await api.post(`/tickets/${ticketId}/comments`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error adding comment with attachments:', error)
      throw error
    }
  },

  /**
   * Update a comment
   * @param {number} ticketId - Ticket ID
   * @param {number} commentId - Comment ID
   * @param {Object} updateData - Data to update
   * @returns {Promise}
   */
  async updateComment(ticketId, commentId, updateData) {
    try {
      const response = await api.put(`/tickets/${ticketId}/comments/${commentId}`, updateData)
      return response.data
    } catch (error) {
      console.error('Error updating comment:', error)
      throw error
    }
  },

  /**
   * Delete a comment
   * @param {number} ticketId - Ticket ID
   * @param {number} commentId - Comment ID
   * @returns {Promise}
   */
  async deleteComment(ticketId, commentId) {
    try {
      const response = await api.delete(`/tickets/${ticketId}/comments/${commentId}`)
      return response.data
    } catch (error) {
      console.error('Error deleting comment:', error)
      throw error
    }
  },

  /**
   * Delete voice recording
   * @param {number} ticketId - Ticket ID
   * @param {number} voiceRecordingId - Voice Recording ID
   * @returns {Promise}
   */
  async deleteVoiceRecording(ticketId, voiceRecordingId) {
    try {
      const response = await api.delete(`/tickets/${ticketId}/voice-recordings/${voiceRecordingId}`)
      return response.data
    } catch (error) {
      console.error('Error deleting voice recording:', error)
      throw error
    }
  },

  /**
   * Start timer for a ticket
   * @param {number} ticketId - Ticket ID
   * @returns {Promise}
   */
  async startTimer(ticketId) {
    try {
      const response = await api.post(`/tickets/${ticketId}/timer/start`)
      return response.data
    } catch (error) {
      console.error('Error starting timer:', error)
      throw error
    }
  },

  /**
   * Stop timer for a ticket
   * @param {number} ticketId - Ticket ID
   * @returns {Promise}
   */
  async stopTimer(ticketId) {
    try {
      const response = await api.post(`/tickets/${ticketId}/timer/stop`)
      return response.data
    } catch (error) {
      console.error('Error stopping timer:', error)
      throw error
    }
  },

  /**
   * Upload attachment to a ticket
   * @param {number} ticketId - Ticket ID
   * @param {File} file - File to upload
   * @returns {Promise}
   */
  async uploadAttachment(ticketId, file) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await api.post(`/tickets/${ticketId}/attachments`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error uploading attachment:', error)
      throw error
    }
  },

  /**
   * Delete an attachment
   * @param {number} ticketId - Ticket ID
   * @param {number} attachmentId - Attachment ID
   * @returns {Promise}
   */
  async deleteAttachment(ticketId, attachmentId) {
    try {
      const response = await api.delete(`/tickets/${ticketId}/attachments/${attachmentId}`)
      return response.data
    } catch (error) {
      console.error('Error deleting attachment:', error)
      throw error
    }
  },

  /**
   * Upload voice recording to a ticket
   * @param {number} ticketId - Ticket ID
   * @param {FormData} formData - Form data with audio file
   * @returns {Promise}
   */
  async uploadVoiceRecording(ticketId, formData) {
    try {
      const response = await api.post(`/tickets/${ticketId}/voice-recording`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error uploading voice recording:', error)
      throw error
    }
  },

  /**
   * Get assignable users for tickets
   * @returns {Promise}
   */
  async getAssignableUsers() {
    try {
      const response = await api.get('/users/assignable')
      return response.data
    } catch (error) {
      console.error('Error fetching assignable users:', error)
      throw error
    }
  },

  /**
   * Get workspaces
   * @returns {Promise}
   */
  async getWorkspaces() {
    try {
      const response = await api.get('/workspaces')
      return response.data
    } catch (error) {
      console.error('Error fetching workspaces:', error)
      throw error
    }
  },

  /**
   * Create a workspace
   * @param {Object} workspaceData - Workspace data
   * @returns {Promise}
   */
  async createWorkspace(workspaceData) {
    try {
      const response = await api.post('/workspaces', workspaceData)
      return response.data
    } catch (error) {
      console.error('Error creating workspace:', error)
      throw error
    }
  },

  /**
   * Update a workspace
   * @param {number} workspaceId - Workspace ID
   * @param {Object} updateData - Data to update
   * @returns {Promise}
   */
  async updateWorkspace(workspaceId, updateData) {
    try {
      const response = await api.put(`/workspaces/${workspaceId}`, updateData)
      return response.data
    } catch (error) {
      console.error('Error updating workspace:', error)
      throw error
    }
  },

  /**
   * Delete a workspace
   * @param {number} workspaceId - Workspace ID
   * @returns {Promise}
   */
  async deleteWorkspace(workspaceId) {
    try {
      const response = await api.delete(`/workspaces/${workspaceId}`)
      return response.data
    } catch (error) {
      console.error('Error deleting workspace:', error)
      throw error
    }
  },

  /**
   * Get ticket statistics
   * @param {Object} filters - Filter parameters
   * @returns {Promise}
   */
  async getStatistics(filters = {}) {
    try {
      const response = await api.get('/tickets/statistics', { params: filters })
      return response.data
    } catch (error) {
      console.error('Error fetching statistics:', error)
      throw error
    }
  }
}

export default ticketService

