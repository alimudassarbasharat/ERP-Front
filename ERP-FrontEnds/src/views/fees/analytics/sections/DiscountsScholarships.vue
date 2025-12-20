<template>
  <div class="space-y-8">
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div v-for="summary in summaryCards" :key="summary.name" 
           class="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
        <div class="flex items-center justify-between mb-4">
          <div :class="[
            'w-12 h-12 rounded-full flex items-center justify-center',
            summary.bgColor
          ]">
            <svg class="w-6 h-6" :class="summary.textColor" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" :d="summary.icon"/>
            </svg>
          </div>
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-1">{{ summary.count }}</h3>
        <p class="text-sm text-gray-600 mb-2">{{ summary.name }}</p>
        <div class="text-xs text-gray-500">{{ formatCurrency(summary.amount) }}</div>
      </div>
    </div>

    <!-- Scholarship Programs -->
    <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 class="text-lg font-bold text-gray-900 mb-6">Active Scholarship Programs</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="program in scholarshipPrograms" :key="program.id" 
             class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
          <h4 class="font-semibold text-purple-800 mb-2">{{ program.name }}</h4>
          <p class="text-sm text-purple-600 mb-3">{{ program.description }}</p>
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs text-purple-500">Beneficiaries</span>
            <span class="text-sm font-bold text-purple-700">{{ program.beneficiaries }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-xs text-purple-500">Total Discount</span>
            <span class="text-sm font-bold text-purple-700">{{ formatCurrency(program.totalDiscount) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Discount Analysis Table -->
    <div class="bg-white rounded-xl shadow-lg border border-gray-200">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-bold text-gray-900">Discount Analysis by Class</h3>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-white">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Students</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Scholarship Students</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Discount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Average Discount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="classData in discountAnalysis" :key="classData.class" class="hover:bg-white">
              <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ classData.class }}</td>
              <td class="px-6 py-4 text-sm text-gray-900">{{ classData.totalStudents }}</td>
              <td class="px-6 py-4 text-sm text-blue-600 font-medium">{{ classData.scholarshipStudents }}</td>
              <td class="px-6 py-4 text-sm text-green-600 font-medium">{{ formatCurrency(classData.totalDiscount) }}</td>
              <td class="px-6 py-4 text-sm text-gray-900">{{ formatCurrency(classData.averageDiscount) }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <span class="text-sm font-medium text-gray-900 mr-2">{{ classData.percentage }}%</span>
                  <div class="w-16 bg-white rounded-full h-2">
                    <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
                         :style="`width: ${classData.percentage}%`"></div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Student Scholarship Details -->
    <div class="bg-white rounded-xl shadow-lg border border-gray-200">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900">Individual Scholarship Details</h3>
          <button class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
            Export List
          </button>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-white">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Scholarship Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount %</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valid Until</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="student in scholarshipStudents" :key="student.id" class="hover:bg-white">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mr-3">
                    <span class="text-xs font-medium text-purple-700">{{ student.name.charAt(0) }}</span>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ student.name }}</div>
                    <div class="text-xs text-gray-500">{{ student.rollNumber }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">{{ student.class }}</td>
              <td class="px-6 py-4 text-sm text-blue-600 font-medium">{{ student.scholarshipType }}</td>
              <td class="px-6 py-4 text-sm text-green-600 font-bold">{{ formatCurrency(student.discountAmount) }}</td>
              <td class="px-6 py-4 text-sm text-purple-600 font-medium">{{ student.discountPercentage }}%</td>
              <td class="px-6 py-4 text-sm text-gray-900">{{ student.validUntil }}</td>
              <td class="px-6 py-4">
                <span :class="[
                  'px-2 py-1 text-xs font-semibold rounded-full',
                  student.status === 'Active' ? 'bg-green-100 text-green-700' :
                  student.status === 'Expired' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                ]">
                  {{ student.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const summaryCards = ref([
  {
    name: 'Merit Scholarships',
    count: 45,
    amount: 225000,
    bgColor: 'bg-gradient-to-r from-purple-100 to-purple-200',
    textColor: 'text-purple-600',
    icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7'
  },
  {
    name: 'Need-Based Aid',
    count: 32,
    amount: 192000,
    bgColor: 'bg-gradient-to-r from-blue-100 to-blue-200',
    textColor: 'text-blue-600',
    icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
  },
  {
    name: 'Sports Scholarships',
    count: 18,
    amount: 90000,
    bgColor: 'bg-gradient-to-r from-green-100 to-green-200',
    textColor: 'text-green-600',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
  },
  {
    name: 'Special Discounts',
    count: 25,
    amount: 125000,
    bgColor: 'bg-gradient-to-r from-orange-100 to-orange-200',
    textColor: 'text-orange-600',
    icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
  }
])

const scholarshipPrograms = ref([
  {
    id: 1,
    name: 'Academic Excellence',
    description: '50% discount for top performers',
    beneficiaries: 25,
    totalDiscount: 125000
  },
  {
    id: 2,
    name: 'Financial Need',
    description: 'Up to 75% discount for needy students',
    beneficiaries: 32,
    totalDiscount: 192000
  },
  {
    id: 3,
    name: 'Sports Achievement',
    description: '30% discount for sports champions',
    beneficiaries: 18,
    totalDiscount: 90000
  }
])

const discountAnalysis = ref([
  {
    class: 'Class 10',
    totalStudents: 45,
    scholarshipStudents: 12,
    totalDiscount: 60000,
    averageDiscount: 5000,
    percentage: 27
  },
  {
    class: 'Class 9',
    totalStudents: 42,
    scholarshipStudents: 10,
    totalDiscount: 50000,
    averageDiscount: 5000,
    percentage: 24
  },
  {
    class: 'Class 8',
    totalStudents: 38,
    scholarshipStudents: 8,
    totalDiscount: 40000,
    averageDiscount: 5000,
    percentage: 21
  }
])

const scholarshipStudents = ref([
  {
    id: 1,
    name: 'Ahmad Ali',
    rollNumber: 'STD001',
    class: 'Class 10-A',
    scholarshipType: 'Merit Scholarship',
    discountAmount: 2500,
    discountPercentage: 50,
    validUntil: '2024-12-31',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Sara Khan',
    rollNumber: 'STD002',
    class: 'Class 9-B',
    scholarshipType: 'Need-Based Aid',
    discountAmount: 3000,
    discountPercentage: 75,
    validUntil: '2024-12-31',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Hassan Ahmed',
    rollNumber: 'STD003',
    class: 'Class 8-C',
    scholarshipType: 'Sports Scholarship',
    discountAmount: 1500,
    discountPercentage: 30,
    validUntil: '2024-06-30',
    status: 'Pending'
  }
])

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0
  }).format(amount)
}
</script> 