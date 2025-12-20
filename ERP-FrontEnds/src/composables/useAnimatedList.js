import { ref } from 'vue'

export function useAnimatedList() {
  const listKey = ref(0)
  const isLoading = ref(false)

  const triggerAnimation = () => {
    listKey.value++
  }

  const withAnimation = async (operation) => {
    isLoading.value = true
    try {
      await operation()
      triggerAnimation()
    } finally {
      isLoading.value = false
    }
  }

  return {
    listKey,
    isLoading,
    withAnimation
  }
} 