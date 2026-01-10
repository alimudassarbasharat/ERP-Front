<template>
  <div class="relative w-full min-h-screen pl-0 pr-0 sm:pl-0 sm:pr-0 lg:pl-1 lg:pr-0 py-2 sm:py-3 lg:py-4" key="general-settings-root">
    <!-- Top Bar Header -->
    <div class="relative z-10 w-full mt-2 mb-4 flex items-center justify-between bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200 dark:border-gray-700">
      <h2 class="text-base font-medium text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        General Settings
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-600 dark:text-gray-400">
        <span class="hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors duration-200" @click="$router.push('/dashboard')">Dashboard</span>
        <span class="mx-2 dark:text-gray-600">|</span>
        <span class="hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors duration-200">Settings</span>
        <span class="mx-2 dark:text-gray-600">|</span>
        <span class="text-gray-900 dark:text-white font-bold">General</span>
      </nav>
    </div>

    <!-- Settings Title Section -->
    <div class="relative z-10 w-full mb-4 sm:mb-6">
      <div class="flex flex-col items-center text-center">
        <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">School Configuration</h3>
        <p class="text-gray-600 dark:text-gray-400 max-w-md">Configure your institution's basic information and system preferences.</p>
      </div>
    </div>

    <!-- Main Settings Container -->
    <div class="relative z-10 w-full">
      <div class="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <form @submit.prevent="saveSettings" class="p-6 sm:p-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <!-- Left Column - Institution Information -->
            <div class="space-y-6">
              <!-- Institution Section -->
              <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Institution Information</h4>
                </div>

                <div class="space-y-4">
                  <div class="flex flex-col w-full">
                    <label class="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">School Name *</label>
                    <div class="relative">
                      <input 
                        v-model="settings.schoolName"
                        type="text" 
                        placeholder="Enter your school name"
                        required
                        class="h-12 border-0 bg-transparent px-0 text-sm font-light text-gray-600 dark:text-gray-300 dark:placeholder-gray-500 focus:ring-0 focus:outline-none w-full"
                      />
                      <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 dark:bg-purple-700 pointer-events-none"></div>
                    </div>
                  </div>

                  <div class="flex flex-col w-full">
                    <label class="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">School Address</label>
                    <div class="relative">
                      <textarea 
                        v-model="settings.address"
                        placeholder="Enter complete school address"
                        rows="3"
                        class="border-0 bg-transparent px-0 text-sm font-light text-gray-600 dark:text-gray-300 dark:placeholder-gray-500 focus:ring-0 focus:outline-none w-full resize-none"
                      ></textarea>
                      <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 dark:bg-purple-700 pointer-events-none"></div>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="flex flex-col w-full">
                      <label class="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Contact Email *</label>
                      <div class="relative">
                        <input 
                          v-model="settings.email"
                          type="email" 
                          placeholder="admin@school.edu"
                          required
                          class="h-12 border-0 bg-transparent px-0 text-sm font-light text-gray-600 dark:text-gray-300 dark:placeholder-gray-500 focus:ring-0 focus:outline-none w-full"
                        />
                        <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 dark:bg-purple-700 pointer-events-none"></div>
                      </div>
                    </div>

                    <div class="flex flex-col w-full">
                      <label class="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Phone Number</label>
                      <div class="relative">
                        <div class="flex">
                          <!-- Country Selection Dropdown -->
                          <div class="relative">
                            <button 
                              @click="showCountryDropdown = !showCountryDropdown"
                              type="button"
                              class="flex items-center gap-2 h-12 px-3 border-0 bg-transparent text-sm font-light text-gray-600 dark:text-gray-300 focus:ring-0 focus:outline-none"
                            >
                              <img v-if="selectedCountry?.flag_url || selectedCountry?.flag" :src="selectedCountry.flag_url || selectedCountry.flag" :alt="selectedCountry?.country_name || selectedCountry?.name" class="w-6 h-4 rounded object-cover" />
                              <div v-else class="w-6 h-4 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center">
                                <span class="text-xs text-gray-600 dark:text-gray-400">{{ selectedCountry?.country_iso || 'PK' }}</span>
                      </div>
                              <span class="text-sm">{{ selectedCountry?.country_code || selectedCountry?.code || '+92' }}</span>
                              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                    </svg>
                            </button>
                            
                            <!-- Country Dropdown -->
                            <div 
                              v-if="showCountryDropdown" 
                              class="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
                            >
                              <div class="p-2">
                      <input 
                                  v-model="countrySearch"
                        type="text" 
                                  placeholder="Search countries..."
                                  class="w-full p-2 text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600"
                      />
                    </div>
                              <div class="max-h-48 overflow-y-auto">
                                <button
                                  v-for="country in filteredCountries"
                                  :key="country.country_code"
                                  @click="selectCountry(country)"
                                  type="button"
                                  class="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                                  <img v-if="country.flag_url || country.flag" :src="country.flag_url || country.flag" :alt="country.country_name || country.name" class="w-6 h-4 rounded object-cover" />
                                  <div v-else class="w-6 h-4 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center">
                                    <span class="text-xs text-gray-600 dark:text-gray-400">{{ country.country_iso }}</span>
                      </div>
                                  <div class="flex-1">
                                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ country.country_name || country.name }}</div>
                                    <div class="text-xs text-gray-500 dark:text-gray-400">{{ country.country_code || country.code }}</div>
                    </div>
                                </button>
                </div>
              </div>
            </div>

                          <!-- Phone Number Input -->
                          <div class="flex-1 relative">
                            <input 
                              v-model="phoneNumber"
                              @input="handlePhoneInput"
                              type="tel" 
                              :placeholder="selectedCountry?.placeholder || '123 456 789'"
                              :maxlength="selectedCountry ? getMaxLengthForCountry(selectedCountry.country_iso) : 15"
                              class="h-12 border-0 bg-transparent px-3 text-sm font-light text-gray-600 dark:text-gray-300 dark:placeholder-gray-500 focus:ring-0 focus:outline-none w-full"
                            />
                  </div>
                      </div>
                      <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 dark:bg-purple-700 pointer-events-none"></div>
                    </div>
                  </div>
                      </div>
                    </div>
                  </div>


              </div>

            <!-- Right Column - System Preferences -->
            <div class="space-y-6">


              <!-- Security Settings -->
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-100 dark:border-blue-800/50">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Security Settings</h4>
                </div>

                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div class="flex-1">
                      <label class="text-sm font-semibold text-gray-600 dark:text-gray-300">Enable Two-Factor Authentication</label>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Add an extra layer of security to your account</p>
                    </div>
                    <div class="ml-4">
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input v-model="settings.twoFactorAuth" type="checkbox" class="sr-only peer" />
                        <div class="w-11 h-6 bg-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex flex-row gap-3 justify-end pt-8 border-t border-gray-200 dark:border-gray-700 mt-8">
            <button 
              type="button"
              @click="resetSettings"
              class="h-10 w-24 rounded-full border-2 border-gray-300 dark:border-gray-600 text-sm font-bold text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Reset
            </button>
            
            <button 
              type="submit"
              :disabled="loading"
              class="h-10 w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="loading" class="flex items-center gap-2">
                <div class="w-4 h-4 border-2 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </span>
              <span v-else class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Save
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import api from '@/utils/axios'

// Use centralized axios instance
const axios = api

const router = useRouter()
const toast = useToast()
const loading = ref(false)

const settings = ref({
  schoolName: '',
  address: '',
  email: '',
  phone: '',
  academicYear: '',
  timezone: 'UTC',
  language: 'en',
  currency: 'USD',
  dateFormat: 'MM/DD/YYYY',
  twoFactorAuth: false
})

// Phone number functionality
const showCountryDropdown = ref(false)
const countrySearch = ref('')
const phoneNumber = ref('')

const countries = ref([])
const selectedCountry = ref(null)

const filteredCountries = computed(() => {
  if (!countrySearch.value) return countries.value
  return countries.value.filter(country => 
    country.country_name.toLowerCase().includes(countrySearch.value.toLowerCase()) ||
    country.country_code.includes(countrySearch.value)
  )
})

const selectCountry = (country) => {
  selectedCountry.value = country
  showCountryDropdown.value = false
  countrySearch.value = ''
  
  // Validate existing phone number against new country limits
  if (phoneNumber.value) {
    const maxLength = getMaxLengthForCountry(country.country_iso)
    let cleanNumber = phoneNumber.value.replace(/\D/g, '')
    if (cleanNumber.length > maxLength) {
      phoneNumber.value = cleanNumber.substring(0, maxLength)
    }
  }
  
  updateFullPhoneNumber()
}

const handlePhoneInput = () => {
  if (!selectedCountry.value) return
  
  // Get max length for current country
  const maxLength = getMaxLengthForCountry(selectedCountry.value.country_iso)
  
  // Remove non-digits and limit to max length
  let cleanNumber = phoneNumber.value.replace(/\D/g, '')
  if (cleanNumber.length > maxLength) {
    cleanNumber = cleanNumber.substring(0, maxLength)
    phoneNumber.value = cleanNumber
  }
  
  updateFullPhoneNumber()
}

const updateFullPhoneNumber = () => {
  if (!selectedCountry.value) return
  const cleanNumber = phoneNumber.value.replace(/\D/g, '')
  const countryCode = selectedCountry.value.country_code || selectedCountry.value.code || '+92'
  settings.value.phone = cleanNumber ? `${countryCode} ${cleanNumber}` : ''
}

const parsePhoneNumber = (fullPhone) => {
  if (!fullPhone || !countries.value.length) return
  
  // Find matching country code
  const matchedCountry = countries.value.find(country => {
    const code = country.country_code || country.code
    return code && fullPhone.startsWith(code)
  })
  
  if (matchedCountry) {
    selectedCountry.value = matchedCountry
    // Extract phone number without country code
    const code = matchedCountry.country_code || matchedCountry.code
    phoneNumber.value = fullPhone.replace(code, '').trim()
  } else {
    // Fallback to first country (Pakistan) if no match
    const defaultCountry = countries.value.find(c => c.country_iso === 'PK') || countries.value[0]
    if (defaultCountry) {
      selectedCountry.value = defaultCountry
    }
    phoneNumber.value = fullPhone
  }
}

const fetchCountries = async () => {
  try {
    const response = await axios.get('/country-codes')
    
    if (response.data.success) {
      countries.value = response.data.data.map(country => ({
        ...country,
        name: country.country_name || country.name,
        code: country.country_code || country.code,
        flag: country.flag_url || country.flag,
        placeholder: getPlaceholderForCountry(country.country_iso)
      }))
      
      // Set default to Pakistan
      const defaultCountry = countries.value.find(c => c.country_iso === 'PK') || countries.value[0]
      if (defaultCountry && !selectedCountry.value) {
        selectedCountry.value = defaultCountry
      }
    }
  } catch (error) {
    console.error('Error fetching countries:', error)
    // Fallback to a basic Pakistan entry
    countries.value = [{
      country_name: 'Pakistan',
      country_code: '+92',
      country_iso: 'PK',
      flag_url: 'https://flagcdn.com/w40/pk.png',
      name: 'Pakistan',
      code: '+92',
      flag: 'https://flagcdn.com/w40/pk.png',
      placeholder: '300 1234567'
    }]
    selectedCountry.value = countries.value[0]
  }
}

const getPlaceholderForCountry = (iso) => {
  const placeholders = {
    'PK': '300 1234567',
    'US': '(555) 123-4567',
    'CA': '(555) 123-4567',
    'GB': '20 7123 4567',
    'IN': '98765 43210',
    'SA': '50 123 4567',
    'AE': '50 123 4567',
    'AU': '400 123 456',
    'DE': '030 12345678',
    'BD': '1712 345678',
    'NP': '984 1234567',
    'CN': '138 0013 8000',
    'AF': '70 123 4567',
    'ID': '812 3456 789',
    'PH': '917 123 4567'
  }
  return placeholders[iso] || '123 456 789'
}

const getMaxLengthForCountry = (iso) => {
  const maxLengths = {
    'PK': 10,  // Pakistan: 3001234567 (10 digits)
    'US': 10,  // USA: 5551234567 (10 digits)
    'CA': 10,  // Canada: 5551234567 (10 digits)
    'GB': 11,  // UK: 207123456789 (11 digits)
    'IN': 10,  // India: 9876543210 (10 digits)
    'SA': 9,   // Saudi: 501234567 (9 digits)
    'AE': 9,   // UAE: 501234567 (9 digits)
    'AU': 9,   // Australia: 400123456 (9 digits)
    'DE': 11,  // Germany: 03012345678 (11 digits)
    'BD': 11,  // Bangladesh: 17123456789 (11 digits)
    'NP': 10,  // Nepal: 9841234567 (10 digits)
    'CN': 11,  // China: 13800138000 (11 digits)
    'AF': 9,   // Afghanistan: 701234567 (9 digits)
    'ID': 10,  // Indonesia: 8123456789 (10 digits)
    'PH': 10   // Philippines: 9171234567 (10 digits)
  }
  return maxLengths[iso] || 15
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showCountryDropdown.value = false
  }
}

const validateForm = () => {
  if (!settings.value.schoolName.trim()) {
    toast.error('⚠️ School name is required')
    return false
  }
  
  if (!settings.value.email.trim()) {
    toast.error('⚠️ Contact email is required')
    return false
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(settings.value.email)) {
    toast.error('⚠️ Please enter a valid email address')
    return false
  }
  
  return true
}

const saveSettings = async () => {
  if (!validateForm()) return
  
  loading.value = true
  
  try {
    const response = await axios.post('/settings/general', settings.value)
    
    if (response.data.success || response.data.status) {
      const action = response.data.action || 'saved'
      
      // Show only one success message based on action
      if (action === 'created') {
        toast.success('🎉 School profile created successfully!')
      } else if (action === 'updated') {
        toast.success('✅ School settings updated successfully!')
      } else {
        toast.success('✅ Settings saved successfully!')
      }
      
      // Dispatch custom event to refresh school name in MainLayout
      window.dispatchEvent(new CustomEvent('schoolSettingsUpdated'))
    } else {
      toast.error('❌ ' + (response.data.message || 'Failed to save settings'))
    }
  } catch (error) {
    console.error('Error saving settings:', error)
    const errorMsg = error.response?.data?.message || 'An error occurred while saving settings'
    toast.error('❌ ' + errorMsg)
  } finally {
    loading.value = false
  }
}

const resetSettings = () => {
  if (confirm('🔄 Reset all settings to default values?\n\nThis will clear all your current settings.')) {
  settings.value = {
    schoolName: '',
    address: '',
    email: '',
    phone: '',
      timezone: 'Asia/Karachi',
      language: 'en',
      currency: 'PKR'
    }
    toast.info('ℹ️ Settings reset to default values')
  }
}

const checkSchoolExists = async () => {
  try {
    const response = await axios.get('/settings/check-school')
    
    if (response.data.success) {
      return response.data.exists
    }
    return false
  } catch (error) {
    console.error('Error checking school exists:', error)
    return false
  }
}

const loadSettings = async () => {
  try {
    // First check if school exists
    const schoolExists = await checkSchoolExists()
    
    if (schoolExists) {
      // Load existing school data
      const response = await axios.get('/settings/general')
    
    if (response.data.success || response.data.status) {
      const data = response.data.data || response.data.result
      
      if (data) {
        settings.value = {
          schoolName: data.schoolName || '',
          address: data.address || '',
          email: data.email || '',
          phone: data.phone || '',
            timezone: data.timezone || 'Asia/Karachi',
          language: data.language || 'en',
            currency: data.currency || 'PKR'
          }
          
          // Parse phone number if exists
          if (data.phone) {
            parsePhoneNumber(data.phone)
          }
        }
      }
    } else {
      // School doesn't exist, set default values
      settings.value = {
        schoolName: '',
        address: '',
        email: '',
        phone: '',
        timezone: 'Asia/Karachi',
        language: 'en',
        currency: 'PKR'
      }
    }
  } catch (error) {
    console.error('Error loading settings:', error)
    // Don't show error toast for loading settings as they might not exist yet
  }
}

onMounted(async () => {
  await fetchCountries()
  await loadSettings()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Custom scrollbar with dark mode support */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.dark ::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style> 