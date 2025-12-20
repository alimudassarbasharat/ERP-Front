<template>
  <div class="space-y-8">
    <!-- Alert Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-red-600">{{ overdueCounts.count }}</h3>
            <p class="text-sm text-gray-600">Overdue Payments</p>
          </div>
        </div>
        <div class="text-xs text-red-500">{{ formatCurrency(overdueCounts.amount) }} pending</div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-5 5v-5zM12 17H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-yellow-600">{{ dueSoonCounts.count }}</h3>
            <p class="text-sm text-gray-600">Due This Week</p>
          </div>
        </div>
        <div class="text-xs text-yellow-500">{{ formatCurrency(dueSoonCounts.amount) }} due</div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-green-600">{{ todayPayments.count }}</h3>
            <p class="text-sm text-gray-600">Payments Today</p>
          </div>
        </div>
        <div class="text-xs text-green-500">{{ formatCurrency(todayPayments.amount) }} received</div>
      </div>
    </div>

    <!-- Notification Settings -->
    <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 class="text-lg font-bold text-gray-900 mb-6">Notification Settings</h3>
      <div class="space-y-4">
        <div v-for="setting in notificationSettings" :key="setting.id" class="flex items-center justify-between p-4 bg-white rounded-lg">
          <div>
            <h4 class="font-medium text-gray-900">{{ setting.name }}</h4>
            <p class="text-sm text-gray-500">{{ setting.description }}</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input v-model="setting.enabled" type="checkbox" class="sr-only peer">
            <div class="w-11 h-6 bg-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      </div>
    </div>

    <!-- Recent Notifications -->
    <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 class="text-lg font-bold text-gray-900 mb-6">Recent Notifications</h3>
      <div class="space-y-4">
        <div v-for="notification in recentNotifications" :key="notification.id" class="flex items-center gap-4 p-4 bg-white rounded-lg">
          <div :class="[
            'w-10 h-10 rounded-full flex items-center justify-center',
            notification.type === 'overdue' ? 'bg-red-100' :
            notification.type === 'due' ? 'bg-yellow-100' :
            notification.type === 'paid' ? 'bg-green-100' : 'bg-blue-100'
          ]">
            <svg class="w-5 h-5" :class="[
              notification.type === 'overdue' ? 'text-red-600' :
              notification.type === 'due' ? 'text-yellow-600' :
              notification.type === 'paid' ? 'text-green-600' : 'text-blue-600'
            ]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-5 5v-5zM12 17H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div class="flex-1">
            <h4 class="font-medium text-gray-900">{{ notification.title }}</h4>
            <p class="text-sm text-gray-500">{{ notification.message }}</p>
          </div>
          <div class="text-xs text-gray-500">{{ notification.time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import { ref, onMounted } from 'vue'

const toast = useToast()
const overdueCounts = ref({ count: 25, amount: 125000 })
const dueSoonCounts = ref({ count: 87, amount: 435000 })
const todayPayments = ref({ count: 12, amount: 60000 })

const notificationSettings = ref([
  { id: 1, name: 'Due Date Reminders', description: 'Send reminders 3 days before due date', enabled: true },
  { id: 2, name: 'Overdue Alerts', description: 'Alert for overdue payments', enabled: true },
  { id: 3, name: 'Payment Confirmations', description: 'Confirm successful payments', enabled: true },
  { id: 4, name: 'Monthly Reports', description: 'Send monthly fee reports', enabled: false }
])

const recentNotifications = ref([
  { id: 1, type: 'due', title: 'Payment Due Tomorrow', message: 'Sara Khan - Class 9-B fee due tomorrow', time: '2 hours ago' },
  { id: 2, type: 'paid', title: 'Payment Received', message: 'Ahmad Ali paid Class 10-A fee', time: '4 hours ago' },
  { id: 3, type: 'overdue', title: 'Overdue Payment', message: 'Hassan Ahmed - Class 8-C fee overdue', time: '1 day ago' }
])

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0
  }).format(amount)
}
</script> 