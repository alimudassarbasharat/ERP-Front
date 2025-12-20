<template>
  <div class="user-picture-wrapper">
    <el-popover
      placement="right"
      :width="300"
      trigger="click"
      popper-class="user-picture-popover"
    >
      <template #reference>
        <div class="user-picture" @click="handleClick">
          <el-avatar
            :size="size"
            :src="imageUrl"
            :alt="name"
            @error="handleImageError"
          >
            {{ getInitials }}
          </el-avatar>
        </div>
      </template>

      <div class="user-info-popover">
        <div class="user-info-header">
          <el-avatar
            :size="64"
            :src="imageUrl"
            :alt="name"
            @error="handleImageError"
          >
            {{ getInitials }}
          </el-avatar>
          <div class="user-info-details">
            <h3 class="user-name">{{ name }}</h3>
            <p class="user-role">{{ role }}</p>
          </div>
        </div>
        <div class="user-info-body">
          <div class="info-item" v-if="email">
            <el-icon><Message /></el-icon>
            <span>{{ email }}</span>
          </div>
          <div class="info-item" v-if="phone">
            <el-icon><Phone /></el-icon>
            <span>{{ phone }}</span>
          </div>
          <div class="info-item" v-if="department">
            <el-icon><User /></el-icon>
            <span>{{ department }}</span>
          </div>
        </div>
        <div class="user-info-footer">
          <el-button type="primary" size="small" @click="handleViewProfile">
            View Profile
          </el-button>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

const props = defineProps({
  userId: {
    type: [Number, String],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  department: {
    type: String,
    default: ''
  },
  size: {
    type: [Number, String],
    default: 40
  },
  type: {
    type: String,
    default: 'student' // or 'teacher', 'admin', etc.
  }
})

const router = useRouter()
const toast = useToast()

const getInitials = computed(() => {
  if (!props.name) return ''
  return props.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
})

const handleImageError = () => {
  // You can emit an event here if you want to handle the error in the parent component
  console.log('Image failed to load')
}

const handleClick = () => {
  // You can emit an event here if you want to handle the click in the parent component
  console.log('User picture clicked')
}

const handleViewProfile = () => {
  let route = ''
  switch (props.type) {
    case 'student':
      route = `/students/${props.userId}`
      break
    case 'teacher':
      route = `/faculty/teacher-details/${props.userId}`
      break
    case 'admin':
      route = `/admin/edit/${props.userId}`
      break
    default:
      route = `/profile/${props.userId}`
  }
  router.push(route)
}
</script>

<style scoped>
.user-picture-wrapper {
  display: inline-block;
}

.user-picture {
  cursor: pointer;
  transition: transform 0.2s;
}

.user-picture:hover {
  transform: scale(1.05);
}

.user-info-popover {
  padding: 16px;
}

.user-info-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.user-info-details {
  flex: 1;
}

.user-name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
}

.user-role {
  margin: 4px 0 0;
  font-size: 0.875rem;
  color: #64748b;
}

.user-info-body {
  margin: 16px 0;
  padding: 16px 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 0.875rem;
  color: #64748b;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-item .el-icon {
  color: #64748b;
}

.user-info-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

:deep(.user-picture-popover) {
  padding: 0;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style> 