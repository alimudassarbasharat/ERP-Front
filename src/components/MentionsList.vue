<template>
  <div class="mentions-list" v-if="show && filteredUsers.length > 0" v-click-outside="close">
    <div class="mentions-header">
      <User :size="14" />
      <span>Mention someone</span>
    </div>
    <div class="mentions-items">
      <button 
        v-for="(user, index) in filteredUsers" 
        :key="user.id"
        @click="selectUser(user)"
        :class="{ active: index === activeIndex }"
        class="mention-item"
      >
        <div class="user-avatar">
          {{ user.name.charAt(0).toUpperCase() }}
        </div>
        <div class="user-info">
          <div class="user-name">{{ user.name }}</div>
          <div class="user-email">{{ user.email }}</div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { User } from 'lucide-vue-next'

export default {
  name: 'MentionsList',
  components: {
    User
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    users: {
      type: Array,
      default: () => []
    },
    query: {
      type: String,
      default: ''
    }
  },
  emits: ['select', 'close'],
  setup(props, { emit }) {
    const activeIndex = ref(0)

    const filteredUsers = computed(() => {
      if (!props.query) return props.users.slice(0, 5)
      
      const query = props.query.toLowerCase()
      return props.users
        .filter(user => 
          user.name.toLowerCase().includes(query) || 
          user.email.toLowerCase().includes(query)
        )
        .slice(0, 5)
    })

    watch(() => filteredUsers.value, () => {
      activeIndex.value = 0
    })

    const selectUser = (user) => {
      emit('select', user)
      emit('close')
    }

    const close = () => {
      emit('close')
    }

    const handleKeyDown = (event) => {
      if (!props.show) return

      switch(event.key) {
        case 'ArrowDown':
          event.preventDefault()
          activeIndex.value = Math.min(activeIndex.value + 1, filteredUsers.value.length - 1)
          break
        case 'ArrowUp':
          event.preventDefault()
          activeIndex.value = Math.max(activeIndex.value - 1, 0)
          break
        case 'Enter':
          event.preventDefault()
          if (filteredUsers.value[activeIndex.value]) {
            selectUser(filteredUsers.value[activeIndex.value])
          }
          break
        case 'Escape':
          event.preventDefault()
          close()
          break
      }
    }

    return {
      activeIndex,
      filteredUsers,
      selectUser,
      close,
      handleKeyDown
    }
  },
  directives: {
    'click-outside': {
      mounted(el, binding) {
        el.clickOutsideEvent = (event) => {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value()
          }
        }
        document.addEventListener('click', el.clickOutsideEvent)
      },
      unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  }
}
</script>

<style scoped>
.mentions-list {
  position: absolute;
  bottom: 100%;
  left: 0;
  margin-bottom: 0.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  min-width: 280px;
  max-width: 320px;
  z-index: 100;
  overflow: hidden;
}

.mentions-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #64748b;
}

.mentions-items {
  max-height: 280px;
  overflow-y: auto;
}

.mention-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
}

.mention-item:hover,
.mention-item.active {
  background: #f8fafc;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email {
  font-size: 0.75rem;
  color: #94a3b8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mentions-items::-webkit-scrollbar {
  width: 6px;
}

.mentions-items::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.mentions-items::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.mentions-items::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>

