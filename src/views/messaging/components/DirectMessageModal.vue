<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Start a Direct Message</h3>
        <button @click="$emit('close')" class="close-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="modal-body">
        <div class="search-section">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search users..."
            class="search-input"
          />
        </div>

        <div class="users-section">
          <h4>Users</h4>
          <div class="users-list">
            <div
              v-for="user in filteredUsers"
              :key="user.id"
              @click="startDirectMessage(user)"
              class="user-item"
            >
              <img :src="getUserAvatar(user)" :alt="user.name" class="user-avatar" />
              <div class="user-info">
                <span class="user-name">{{ user.name }}</span>
                <span class="user-email">{{ user.email }}</span>
              </div>
              <div class="user-status" :class="getUserStatus(user)">
                <div class="status-indicator"></div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="loading" class="loading">
          <i class="fas fa-spinner fa-spin"></i>
          Loading users...
        </div>

        <div v-else-if="filteredUsers.length === 0" class="no-users">
          <i class="fas fa-users"></i>
          <p>No users found</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import axios from '@/utils/axios'

export default {
  name: 'DirectMessageModal',
  emits: ['close', 'created'],
  setup(props, { emit }) {
    const toast = useToast()
    
    const users = ref([])
    const searchQuery = ref('')
    const loading = ref(false)

    const filteredUsers = computed(() => {
      if (!searchQuery.value) return users.value
      return users.value.filter(user => 
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })

    const loadUsers = async () => {
      loading.value = true
      try {
        const response = await axios.get('/users')
        users.value = response.data.data
      } catch (error) {
        console.error('Failed to load users:', error)
        toast.error('Failed to load users')
      } finally {
        loading.value = false
      }
    }

    const startDirectMessage = async (user) => {
      try {
        const response = await axios.post('/api/channels', {
          name: `DM with ${user.name}`,
          type: 'direct',
          member_ids: [user.id]
        })
        
        toast.success('Direct message started')
        emit('created', response.data.data)
        emit('close')
      } catch (error) {
        console.error('Failed to start direct message:', error)
        toast.error(error.response?.data?.message || 'Failed to start direct message')
      }
    }

    const getUserAvatar = (user) => {
      return user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=random`
    }

    const getUserStatus = (user) => {
      return user?.status || 'offline'
    }

    onMounted(() => {
      loadUsers()
    })

    return {
      users,
      searchQuery,
      loading,
      filteredUsers,
      startDirectMessage,
      getUserAvatar,
      getUserStatus
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
  max-width: 400px;
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

.search-section {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.users-section h4 {
  margin-bottom: 1rem;
  font-weight: 600;
  color: #374151;
}

.users-list {
  max-height: 400px;
  overflow-y: auto;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f3f4f6;
}

.user-item:last-child {
  border-bottom: none;
}

.user-item:hover {
  background-color: #f9fafb;
}

.user-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.user-name {
  font-weight: 500;
  color: #111827;
}

.user-email {
  font-size: 0.75rem;
  color: #6b7280;
}

.user-status {
  display: flex;
  align-items: center;
}

.status-indicator {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  border: 2px solid white;
}

.status-indicator.online {
  background-color: #10b981;
}

.status-indicator.away {
  background-color: #f59e0b;
}

.status-indicator.offline {
  background-color: #6b7280;
}

.loading, .no-users {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #6b7280;
  gap: 1rem;
}

.loading i {
  font-size: 1.5rem;
  color: #3b82f6;
}

.no-users i {
  font-size: 2rem;
  color: #d1d5db;
}
</style> 