<template>
  <div class="emoji-picker">
    <div class="emoji-grid">
      <button
        v-for="emoji in emojis"
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
export default {
  name: 'EmojiPicker',
  emits: ['close', 'select'],
  setup(props, { emit }) {
    const emojis = [
      '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
      '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
      '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
      '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
      '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
      '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
      '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😯', '😦', '😧',
      '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢',
      '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '💩', '👻', '💀',
      '☠️', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽',
      '🙀', '😿', '😾', '🙈', '🙉', '🙊', '💌', '💘', '💝', '💖',
      '💗', '💓', '💞', '💕', '💟', '❣️', '💔', '❤️', '🧡', '💛',
      '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞',
      '💓', '💗', '💖', '💘', '💝', '💟', '👍', '👎', '👌', '✌️',
      '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️',
      '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞',
      '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👋'
    ]

    const selectEmoji = (emoji) => {
      emit('select', emoji)
      emit('close')
    }

    return {
      emojis,
      selectEmoji
    }
  }
}
</script>

<style scoped>
.emoji-picker {
  position: absolute;
  bottom: 100%;
  left: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 0.5rem;
  max-width: 300px;
  max-height: 200px;
  overflow-y: auto;
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0.25rem;
}

.emoji-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.emoji-btn:hover {
  background-color: #f3f4f6;
}
</style> 