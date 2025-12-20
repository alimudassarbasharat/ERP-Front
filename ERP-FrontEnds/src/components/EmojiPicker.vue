<template>
  <div class="emoji-picker-wrapper" v-if="show" v-click-outside="close">
    <div class="emoji-tabs">
      <button 
        v-for="(category, index) in categories" 
        :key="index"
        @click="activeCategory = category.name"
        :class="{ active: activeCategory === category.name }"
        class="emoji-tab"
      >
        {{ category.icon }}
      </button>
    </div>
    <div class="emoji-grid">
      <button 
        v-for="emoji in filteredEmojis" 
        :key="emoji"
        @click="selectEmoji(emoji)"
        class="emoji-btn"
      >
        {{ emoji }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'EmojiPicker',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['select', 'close'],
  setup(props, { emit }) {
    const activeCategory = ref('smileys')

    const categories = [
      { name: 'smileys', icon: '😊', emojis: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳'] },
      { name: 'gestures', icon: '👍', emojis: ['👍', '👎', '👊', '✊', '🤛', '🤜', '🤞', '✌️', '🤟', '🤘', '👌', '🤌', '🤏', '👈', '👉', '👆', '👇', '☝️', '👋', '🤚', '🖐️', '✋', '🖖', '👏', '🙌', '🤲', '🤝', '🙏'] },
      { name: 'hearts', icon: '❤️', emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝'] },
      { name: 'objects', icon: '⚡', emojis: ['⚡', '🔥', '✨', '⭐', '🌟', '💫', '🎉', '🎊', '🎈', '🎁', '🏆', '🥇', '🥈', '🥉', '📌', '📍', '🚀', '💡', '🔔', '📢'] }
    ]

    const filteredEmojis = computed(() => {
      const category = categories.find(c => c.name === activeCategory.value)
      return category ? category.emojis : []
    })

    const selectEmoji = (emoji) => {
      emit('select', emoji)
      emit('close')
    }

    const close = () => {
      emit('close')
    }

    return {
      categories,
      activeCategory,
      filteredEmojis,
      selectEmoji,
      close
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
.emoji-picker-wrapper {
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 0.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  width: 320px;
  z-index: 100;
}

.emoji-tabs {
  display: flex;
  padding: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
  gap: 0.25rem;
}

.emoji-tab {
  padding: 0.5rem;
  background: transparent;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
  opacity: 0.5;
}

.emoji-tab:hover {
  background: #f8fafc;
  opacity: 1;
}

.emoji-tab.active {
  background: #ede9fe;
  opacity: 1;
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0.25rem;
  padding: 0.75rem;
  max-height: 240px;
  overflow-y: auto;
}

.emoji-btn {
  padding: 0.5rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s;
}

.emoji-btn:hover {
  background: #f8fafc;
  transform: scale(1.2);
}

.emoji-grid::-webkit-scrollbar {
  width: 6px;
}

.emoji-grid::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.emoji-grid::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.emoji-grid::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>

