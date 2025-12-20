<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Create New Channel</h3>
        <button @click="$emit('close')" class="close-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <form @submit.prevent="createChannel" class="modal-body">
        <div class="form-group">
          <label for="channelName">Channel Name</label>
          <input
            id="channelName"
            v-model="form.name"
            type="text"
            placeholder="e.g., general, announcements"
            required
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="channelDescription">Description (Optional)</label>
          <textarea
            id="channelDescription"
            v-model="form.description"
            placeholder="What is this channel about?"
            rows="3"
            class="form-textarea"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="channelType">Channel Type</label>
          <select v-model="form.type" id="channelType" class="form-select" required>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div class="form-group">
          <label for="channelIcon">Icon (Optional)</label>
          <input
            id="channelIcon"
            v-model="form.icon"
            type="text"
            placeholder="e.g., 📢, 🎉, 💬"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="channelColor">Color (Optional)</label>
          <input
            id="channelColor"
            v-model="form.color"
            type="color"
            class="form-color"
          />
        </div>

        <div class="form-group">
          <label>Add Members</label>
          <div class="member-search">
            <input
              v-model="memberSearch"
              type="text"
              placeholder="Search users..."
              class="form-input"
              @input="searchUsers"
            />
          </div>
          
          <div class="member-list">
            <div
              v-for="user in filteredUsers"
              :key="user.id"
              @click="toggleMember(user)"
              :class="['member-item', { selected: selectedMembers.includes(user.id) }]"
            >
              <img :src="getUserAvatar(user)" :alt="user.name" class="member-avatar" />
              <span class="member-name">{{ user.name }}</span>
              <span class="member-email">{{ user.email }}</span>
            </div>
          </div>
        </div>

        <div class="selected-members" v-if="selectedMembers.length > 0">
          <h4>Selected Members ({{ selectedMembers.length }})</h4>
          <div class="selected-members-list">
            <div
              v-for="memberId in selectedMembers"
              :key="memberId"
              class="selected-member"
            >
              <img 
                :src="getUserAvatar(getUserById(memberId))" 
                :alt="getUserById(memberId)?.name" 
                class="member-avatar" 
              />
              <span>{{ getUserById(memberId)?.name }}</span>
              <button @click="removeMember(memberId)" class="remove-member-btn">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" @click="$emit('close')" class="btn-secondary">
            Cancel
          </button>
          <button type="submit" :disabled="!form.name || selectedMembers.length === 0" class="btn-primary">
            Create Channel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import axios from '@/utils/axios'

export default {
  name: 'CreateChannelModal',
  emits: ['close', 'created'],
  setup(props, { emit }) {
    const toast = useToast()
    
    const form = reactive({
      name: '',
      description: '',
      type: 'public',
      icon: '',
      color: '#4A154B'
    })
    
    const memberSearch = ref('')
    const users = ref([])
    const selectedMembers = ref([])
    const loading = ref(false)

    const filteredUsers = computed(() => {
      if (!memberSearch.value) return users.value
      return users.value.filter(user => 
        user.name.toLowerCase().includes(memberSearch.value.toLowerCase()) ||
        user.email.toLowerCase().includes(memberSearch.value.toLowerCase())
      )
    })

    const loadUsers = async () => {
      try {
        const response = await axios.get('/users')
        users.value = response.data.data
      } catch (error) {
        console.error('Failed to load users:', error)
        toast.error('Failed to load users')
      }
    }

    const searchUsers = () => {
      // Debounced search could be implemented here
    }

    const toggleMember = (user) => {
      const index = selectedMembers.value.indexOf(user.id)
      if (index > -1) {
        selectedMembers.value.splice(index, 1)
      } else {
        selectedMembers.value.push(user.id)
      }
    }

    const removeMember = (memberId) => {
      const index = selectedMembers.value.indexOf(memberId)
      if (index > -1) {
        selectedMembers.value.splice(index, 1)
      }
    }

    const getUserById = (id) => {
      return users.value.find(user => user.id === id)
    }

    const getUserAvatar = (user) => {
      return user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=random`
    }

    const createChannel = async () => {
      if (!form.name || selectedMembers.value.length === 0) return
      
      loading.value = true
      try {
        const response = await axios.post('/api/channels', {
          ...form,
          member_ids: selectedMembers.value
        })
        
        toast.success('Channel created successfully')
        emit('created', response.data.data)
        emit('close')
      } catch (error) {
        console.error('Failed to create channel:', error)
        toast.error(error.response?.data?.message || 'Failed to create channel')
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadUsers()
    })

    return {
      form,
      memberSearch,
      users,
      selectedMembers,
      loading,
      filteredUsers,
      searchUsers,
      toggleMember,
      removeMember,
      getUserById,
      getUserAvatar,
      createChannel
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
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.close-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.close-btn:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.form-input, .form-textarea, .form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.2s;
}

.form-input:focus, .form-textarea:focus, .form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-color {
  width: 60px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.member-search {
  margin-bottom: 1rem;
}

.member-list {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
}

.member-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f3f4f6;
}

.member-item:last-child {
  border-bottom: none;
}

.member-item:hover {
  background-color: #f9fafb;
}

.member-item.selected {
  background-color: #e0e7ff;
  color: #3730a3;
}

.member-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
}

.member-name {
  font-weight: 500;
  flex: 1;
}

.member-email {
  font-size: 0.75rem;
  color: #6b7280;
}

.selected-members {
  margin-top: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.375rem;
}

.selected-members h4 {
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.selected-members-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.selected-member {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.remove-member-btn {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s;
}

.remove-member-btn:hover {
  background-color: #fef2f2;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-primary:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.btn-secondary {
  padding: 0.75rem 1.5rem;
  background: white;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}
</style> 