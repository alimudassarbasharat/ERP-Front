<template>
  <div v-if="show && total > 0" class="relative z-10 w-full mt-8">
    <!-- Pagination Summary -->
    <div class="flex flex-row items-center justify-between mb-4">
      <div class="text-gray-600 text-sm font-medium px-2">
        Showing {{ (currentPage - 1) * pageSize + 1 }}
        to {{ Math.min(currentPage * pageSize, total) }}
        of {{ total }} entries
      </div>
      <div class="flex items-center gap-4">
        <label class="text-sm text-gray-600 font-medium flex items-center gap-1">
          Per page:
          <select 
            :value="pageSize" 
            @change="handlePageSizeChange"
            class="rounded-md border border-purple-200 bg-white px-2 py-1 text-xs font-semibold text-purple-700 focus:ring-2 focus:ring-purple-300"
          >
            <option v-for="size in pageSizeOptions" :key="size" :value="size">{{ size }}</option>
          </select>
        </label>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="flex justify-center">
      <div class="flex items-center gap-2">
        <button 
          class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-50 text-purple-500 text-xl font-bold shadow-sm transition-all duration-200 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="currentPage === 1"
          @click="handlePageChange(currentPage - 1)"
          aria-label="Previous"
        >
          <span>&larr;</span>
        </button>
        <span class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-600 text-white text-base font-bold shadow-md">
          {{ currentPage }}
        </span>
        <button 
          class="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-50 text-purple-500 text-xl font-bold shadow-sm transition-all duration-200 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="currentPage === totalPages"
          @click="handlePageChange(currentPage + 1)"
          aria-label="Next"
        >
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  show: {
    type: Boolean,
    default: true
  },
  pageSizeOptions: {
    type: Array,
    default: () => [10, 20, 50, 100]
  }
})

const emit = defineEmits(['page-change', 'page-size-change'])

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

const handlePageChange = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('page-change', page)
  }
}

const handlePageSizeChange = (event) => {
  const newPageSize = parseInt(event.target.value)
  emit('page-size-change', newPageSize)
}
</script>

<style scoped>
/* Component styles are handled by Tailwind classes */
</style>
