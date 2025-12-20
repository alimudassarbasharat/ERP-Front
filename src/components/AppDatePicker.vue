<template>
  <div class="app-date-picker">
    <vue-datepicker-next
      ref="pickerRef"
      v-model="modelValueProxy"
      :type="type"
      :format="format"
      :placeholder="placeholder"
      :editable="false"
      :clearable="clearable"
      :input-attr="{ readonly: true }"
      :popup-style="{ minWidth: '320px' }"
      :confirm="true"
      :confirm-text="okText"
      :cancel-text="cancelText"
      :first-day-of-week="1"
      :shortcuts="shortcuts"
      :disabled-date="disabledDate"
      :lang="lang"
      :popover-append-to-body="true"
      :class="['material-datepicker', { 'full-width': fullWidth }]"
      @open="onOpen"
      @close="onClose"
    >
      <template #input="{ inputValue, onInput, onFocus, onBlur }">
        <div
          class="date-input-wrapper"
          @click="openPicker"
          tabindex="0"
          @keydown.enter="openPicker"
        >
          <input
            :value="inputValue"
            :placeholder="placeholder"
            readonly
            class="date-input"
            @focus="onFocus"
            @blur="onBlur"
            style="cursor:pointer; background:transparent; border:none; outline:none; width:100%; font-size:1rem; padding:0.75rem 1rem;"
          />
          <span class="calendar-icon">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <rect x="3" y="7" width="18" height="14" rx="2"/>
              <path d="M16 3v4M8 3v4M3 11h18"/>
            </svg>
          </span>
        </div>
      </template>
    </vue-datepicker-next>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

const toast = useToast()
const props = defineProps({
  modelValue: [String, Date, Number],
  type: { type: String, default: 'date' },
  format: { type: String, default: 'YYYY-MM-DD' },
  placeholder: { type: String, default: 'Select date' },
  clearable: { type: Boolean, default: true },
  okText: { type: String, default: 'Ok' },
  cancelText: { type: String, default: 'Cancel' },
  fullWidth: { type: Boolean, default: true },
  shortcuts: { type: Array, default: () => [] },
  disabledDate: { type: Function, default: null },
  lang: { type: String, default: 'en' },
})

const emit = defineEmits(['update:modelValue'])
const modelValueProxy = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})

const pickerRef = ref(null)
function openPicker() {
  if (pickerRef.value && pickerRef.value.open) {
    pickerRef.value.open()
  }
}

function onOpen() {}
function onClose() {}
</script>

<style scoped>
.app-date-picker {
  width: 100%;
}
.material-datepicker {
  --dp-primary-color: #8b5cf6;
  --dp-accent-color: var(--accent-secondary);
  --dp-header-bg: #3f51b5;
  --dp-header-color: #ffffff;
  --dp-selected-bg: #e91e63;
  --dp-selected-color: #ffffff;
  --dp-today-bg: #f5f5f5;
  --dp-today-color: #8b5cf6;
  --dp-hover-bg: #ede7f6;
  --dp-border-radius: 12px;
  --dp-shadow: 0 4px 24px rgba(63,81,181,0.08);
}
.date-input-wrapper {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 1px 2px rgba(60,60,60,0.03);
  transition: border 0.2s;
  cursor: pointer;
  width: 100%;
}
.date-input-wrapper:focus-within {
  border-color: #8b5cf6;
}
.date-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  color: #1e293b;
  padding: 0.75rem 1rem;
}
.calendar-icon {
  margin-right: 1rem;
  color: #8b5cf6;
  display: flex;
  align-items: center;
}
</style> 