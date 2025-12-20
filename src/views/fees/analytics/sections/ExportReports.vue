<template>
  <div class="space-y-8">
    <!-- Export Options -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900">Excel Export</h3>
        </div>
        <p class="text-sm text-gray-600 mb-4">Export fee data to Excel spreadsheet format</p>
        <button @click="exportToExcel" class="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg hover:from-green-600 hover:to-green-800 transition-all duration-300">
          Export to Excel
        </button>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900">PDF Reports</h3>
        </div>
        <p class="text-sm text-gray-600 mb-4">Generate comprehensive PDF reports</p>
        <button @click="exportToPDF" class="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg hover:from-red-600 hover:to-red-800 transition-all duration-300">
          Generate PDF
        </button>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"/>
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900">Fee Receipts</h3>
        </div>
        <p class="text-sm text-gray-600 mb-4">Generate individual fee receipts</p>
        <button @click="generateReceipts" class="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300">
          Generate Receipts
        </button>
      </div>
    </div>

    <!-- Recent Exports -->
    <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 class="text-lg font-bold text-gray-900 mb-6">Recent Exports</h3>
      <div class="space-y-4">
        <div v-for="export_ in recentExports" :key="export_.id" class="flex items-center justify-between p-4 bg-white rounded-lg">
          <div class="flex items-center gap-3">
            <div :class="[
              'w-10 h-10 rounded-full flex items-center justify-center',
              export_.type === 'excel' ? 'bg-green-100' :
              export_.type === 'pdf' ? 'bg-red-100' : 'bg-blue-100'
            ]">
              <svg class="w-5 h-5" :class="[
                export_.type === 'excel' ? 'text-green-600' :
                export_.type === 'pdf' ? 'text-red-600' : 'text-blue-600'
              ]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div>
              <h4 class="font-medium text-gray-900">{{ export_.name }}</h4>
              <p class="text-sm text-gray-500">{{ export_.date }}</p>
            </div>
          </div>
          <button class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
            Download
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import { ref, onMounted } from 'vue'

const toast = useToast()
const recentExports = ref([
  { id: 1, name: 'Fee Report January 2024.xlsx', type: 'excel', date: '2024-01-15' },
  { id: 2, name: 'Student Payment Report.pdf', type: 'pdf', date: '2024-01-14' },
  { id: 3, name: 'Fee Receipts Batch.pdf', type: 'receipt', date: '2024-01-13' }
])

const exportToExcel = () => {
  console.log('Exporting to Excel...')
}

const exportToPDF = () => {
  console.log('Generating PDF report...')
}

const generateReceipts = () => {
  console.log('Generating receipts...')
}
</script> 