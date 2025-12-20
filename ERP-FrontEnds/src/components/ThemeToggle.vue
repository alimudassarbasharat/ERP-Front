<template>
  <button
    @click="toggleTheme"
    class="theme-toggle-btn"
    :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
  >
    <!-- Sun Icon (Light Mode) -->
    <svg
      v-if="isDark"
      class="theme-icon sun-icon"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m6.5-6.5l-.707-.707M17.5 17.5l-.707-.707M17.5 6.5l-.707.707M6.5 17.5l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
    
    <!-- Moon Icon (Dark Mode) -->
    <svg
      v-else
      class="theme-icon moon-icon"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import { useToast } from 'vue-toastification'

const toast = useToast()
const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore) 

const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<style scoped>
.theme-toggle-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #1e293b;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.theme-toggle-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #f1f5f9;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
}

.theme-toggle-btn:hover::before {
  opacity: 1;
}

.theme-toggle-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
  border-color: var(--border-accent);
}

.theme-toggle-btn:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.theme-icon {
  width: 22px;
  height: 22px;
  position: relative;
  z-index: 1;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sun-icon {
  animation: rotate-in 0.3s ease-out;
}

.moon-icon {
  animation: rotate-in 0.3s ease-out;
}

@keyframes rotate-in {
  from {
    opacity: 0;
    transform: rotate(-90deg) scale(0.8);
  }
  to {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
}

/* Dark mode specific styles */
.dark .theme-toggle-btn {
  background: #f8fafc;
  border-color: #e2e8f0;
  color: #1e293b;
}

.dark .theme-toggle-btn:hover {
  background: #f1f5f9;
  border-color: var(--border-accent);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .theme-toggle-btn {
    width: 40px;
    height: 40px;
  }
  
  .theme-icon {
    width: 20px;
    height: 20px;
  }
}
</style> 