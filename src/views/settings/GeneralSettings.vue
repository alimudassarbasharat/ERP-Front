<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
    <!-- Top Bar Header -->
    <div class="w-full max-w-7xl mx-auto mt-2 mb-4 flex items-center justify-between bg-white/90 rounded-lg shadow-lg py-2 px-5 transition-all duration-500 border border-gray-200">
      <h2 class="text-base font-medium text-gray-900 tracking-tight flex items-center gap-2">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        General Settings
      </h2>
      <nav class="flex items-center gap-2 text-base font-medium text-gray-600">
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200" @click="$router.push('/dashboard')">Dashboard</span>
        <span class="mx-2">|</span>
        <span class="hover:text-purple-600 cursor-pointer transition-colors duration-200" @click="$router.push('/settings')">Settings</span>
        <span class="mx-2">|</span>
        <span class="text-gray-900 font-bold">General</span>
      </nav>
    </div>

    <!-- Settings Title Section -->
    <div class="w-full max-w-6xl mx-auto mb-6">
      <div class="flex flex-col items-center text-center">
        <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">School Configuration</h3>
        <p class="text-gray-600 max-w-md">Configure your institution's basic information and system preferences.</p>
      </div>
    </div>

    <!-- Main Settings Container -->
    <div class="w-full max-w-6xl mx-auto">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <form @submit.prevent="saveSettings" class="p-6 sm:p-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <!-- Left Column - Institution Information -->
            <div class="space-y-6">
              <!-- Institution Section -->
              <div class="border-b border-gray-200 pb-6">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900">Institution Information</h4>
                </div>

                <div class="space-y-4">
                  <div class="flex flex-col w-full">
                    <label class="mb-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">School Name *</label>
                    <div class="relative">
                      <input 
                        v-model="settings.schoolName"
                        type="text" 
                        placeholder="Enter your school name"
                        required
                        class="h-12 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
                      />
                      <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                    </div>
                  </div>

                  <div class="flex flex-col w-full">
                    <label class="mb-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">School Address</label>
                    <div class="relative">
                      <textarea 
                        v-model="settings.address"
                        placeholder="Enter complete school address"
                        rows="3"
                        class="border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full resize-none"
                      ></textarea>
                      <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="flex flex-col w-full">
                      <label class="mb-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">Contact Email *</label>
                      <div class="relative">
                        <input 
                          v-model="settings.email"
                          type="email" 
                          placeholder="admin@school.edu"
                          required
                          class="h-12 border-0 bg-transparent px-0 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
                        />
                        <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                      </div>
                    </div>

                    <div class="flex flex-col w-full">
                      <label class="mb-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">Phone Number</label>
                      <div class="relative">
                        <div class="flex">
                          <!-- Country Selection Dropdown -->
                          <div class="relative">
                            <button 
                              @click="showCountryDropdown = !showCountryDropdown"
                              type="button"
                              class="flex items-center gap-2 h-12 px-3 border-0 bg-transparent text-sm font-light text-gray-600 focus:ring-0 focus:outline-none"
                            >
                              <img v-if="selectedCountry?.flag_url || selectedCountry?.flag" :src="selectedCountry.flag_url || selectedCountry.flag" :alt="selectedCountry?.country_name || selectedCountry?.name" class="w-6 h-4 rounded object-cover" />
                              <div v-else class="w-6 h-4 bg-gray-300 rounded flex items-center justify-center">
                                <span class="text-xs text-gray-600">{{ selectedCountry?.country_iso || 'PK' }}</span>
                      </div>
                              <span class="text-sm">{{ selectedCountry?.country_code || selectedCountry?.code || '+92' }}</span>
                              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                    </svg>
                            </button>
                            
                            <!-- Country Dropdown -->
                            <div 
                              v-if="showCountryDropdown" 
                              class="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
                            >
                              <div class="p-2">
                      <input 
                                  v-model="countrySearch"
                        type="text" 
                                  placeholder="Search countries..."
                                  class="w-full p-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                              <div class="max-h-48 overflow-y-auto">
                                <button
                                  v-for="country in filteredCountries"
                                  :key="country.country_code"
                                  @click="selectCountry(country)"
                                  type="button"
                                  class="w-full flex items-center gap-3 p-3 text-left hover:bg-white transition-colors"
                      >
                                  <img v-if="country.flag_url || country.flag" :src="country.flag_url || country.flag" :alt="country.country_name || country.name" class="w-6 h-4 rounded object-cover" />
                                  <div v-else class="w-6 h-4 bg-gray-300 rounded flex items-center justify-center">
                                    <span class="text-xs text-gray-600">{{ country.country_iso }}</span>
                      </div>
                                  <div class="flex-1">
                                    <div class="text-sm font-medium text-gray-900">{{ country.country_name || country.name }}</div>
                                    <div class="text-xs text-gray-500">{{ country.country_code || country.code }}</div>
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
                              class="h-12 border-0 bg-transparent px-3 text-sm font-light text-gray-600 focus:ring-0 focus:outline-none w-full"
                            />
                  </div>
                      </div>
                      <div class="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-200 pointer-events-none"></div>
                    </div>
                  </div>
                      </div>
                    </div>
                  </div>


              </div>

            <!-- Right Column - System Preferences -->
            <div class="space-y-6">


              <!-- Security Settings -->
              <div class="bg-blue-50 rounded-lg p-6">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900">Security Settings</h4>
                </div>

                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div class="flex-1">
                      <label class="text-sm font-semibold text-gray-600">Enable Two-Factor Authentication</label>
                      <p class="text-xs text-gray-500 mt-1">Add an extra layer of security to your account</p>
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
          <div class="flex flex-row gap-3 justify-end pt-8 border-t border-gray-200 mt-8">
            <button 
              type="button"
              @click="resetSettings"
              class="h-10 w-24 rounded-full border-2 border-navy-300 text-sm font-bold text-gray-600 bg-white hover:bg-navy-50 hover:border-navy-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Reset
            </button>
            
            <button 
              type="submit"
              :disabled="loading"
              class="h-10 w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
    toast.error('School name is required')
    return false
  }
  
  if (!settings.value.email.trim()) {
    toast.error('Contact email is required')
    return false
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(settings.value.email)) {
    toast.error('Please enter a valid email address')
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
        toast.success('Settings saved successfully!')
      }
      
      // Dispatch custom event to refresh school name in MainLayout
      window.dispatchEvent(new CustomEvent('schoolSettingsUpdated'))
    } else {
      toast.error(response.data.message || 'Failed to save settings')
    }
  } catch (error) {
    console.error('Error saving settings:', error)
    toast.error(error.response?.data?.message || 'An error occurred while saving settings')
  } finally {
    loading.value = false
  }
}

const resetSettings = () => {
  if (confirm('Are you sure you want to reset all settings to default values?')) {
  settings.value = {
    schoolName: '',
    address: '',
    email: '',
    phone: '',
      timezone: 'Asia/Karachi',
      language: 'en',
      currency: 'PKR'
    }
    toast.info('Settings reset to default values')
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
/* Professional ERP styling - exact match to other pages */
.bg-white\/90 {
  background-color: #ffffff;
}

/* Navy color scheme */
.text-gray-600 {
  color: #64748b;
}

.text-gray-600 {
  color: #64748b;
}

.text-gray-900 {
  color: #1e293b;
}

.text-gray-900 {
  color: #1e293b;
}

.text-gray-600 {
  color: #64748b;
}

.text-gray-900 {
  color: #1e293b;
}

.text-navy-300 {
  color: #94a3b8;
}

.border-navy-300 {
  border-color: #94a3b8;
}

.border-navy-400 {
  border-color: #94a3b8;
}

.bg-navy-50 {
  background-color: #f8fafc;
}

.hover\:bg-navy-50:hover {
  background-color: #f8fafc;
}

.hover\:border-navy-400:hover {
  border-color: #94a3b8;
}

.hover\:text-gray-900:hover {
  color: #1e293b;
}

/* Gradient backgrounds */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.from-indigo-100 {
  --tw-gradient-from: #e0e7ff;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(224, 231, 255, 0));
}

.via-purple-100 {
  --tw-gradient-stops: var(--tw-gradient-from), #f3e8ff, var(--tw-gradient-to, rgba(243, 232, 255, 0));
}

.to-pink-100 {
  --tw-gradient-to: #fce7f3;
}

/* Button hover effects */
button:hover {
  transform: scale(1.02);
  transition: all 0.2s ease-in-out;
}

button:active {
  transform: scale(0.98);
}

/* Focus styles for accessibility */
input:focus,
select:focus,
textarea:focus {
  outline: 2px solid #a855f7;
  outline-offset: 2px;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Transition effects */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.duration-200 {
  transition-duration: 200ms;
}

.duration-300 {
  transition-duration: 300ms;
}

.duration-500 {
  transition-duration: 500ms;
}

/* Card shadows */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Rounded corners */
.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-xl {
  border-radius: 0.75rem;
}

.rounded-full {
  border-radius: 9999px;
}

/* Gradient button styling */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

/* Color scheme for gradient buttons */
.from-purple-500 {
  --tw-gradient-from: #8b5cf6;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(139, 92, 246, 0));
}

.to-pink-500 {
  --tw-gradient-to: #ec4899;
}

.from-gray-500 {
  --tw-gradient-from: #94a3b8;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(107, 114, 128, 0));
}

.to-slate-500 {
  --tw-gradient-to: #64748b;
}

/* Form input styling */
input[type="text"],
input[type="email"],
input[type="tel"],
select,
textarea {
  border: none;
  border-bottom: 2px solid #e9d5ff;
  background: transparent;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus,
select:focus,
textarea:focus {
  border-bottom-color: #8b5cf6;
  outline: none;
}

/* Section backgrounds */
.bg-white {
  background-color: #f8fafc;
}

.bg-blue-50 {
  background-color: #f1f5f9;
}

/* Icon container colors */
.bg-purple-100 {
  background-color: #f1f5f9;
}

.text-purple-600 {
  color: #8b5cf6;
}

.bg-blue-100 {
  background-color: #f1f5f9;
}

.text-blue-600 {
  color: #3b82f6;
}

.bg-green-100 {
  background-color: #f1f5f9;
}

.text-green-600 {
  color: #10b981;
}

.bg-indigo-100 {
  background-color: #f1f5f9;
}

.text-indigo-600 {
  color: #8b5cf6;
}

/* Toggle switch styling */
.peer:checked ~ .peer-checked\:bg-purple-600 {
  background-color: #8b5cf6;
}

.peer:checked ~ .peer-checked\:after\:translate-x-full:after {
  transform: translateX(100%);
}

.peer:checked ~ .peer-checked\:after\:border-gray-200:after {
  border-color: #ffffff;
}

.peer-focus\:ring-purple-300:focus {
  box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.3);
}

/* Disabled state styling */
.disabled\:opacity-50:disabled {
  opacity: 0.5;
}

.disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

/* Professional form spacing */
.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.gap-3 {
  gap: 0.75rem;
}

.gap-4 {
  gap: 1rem;
}

.gap-8 {
  gap: 2rem;
}

/* Border styles */
.border-gray-200 {
  border-color: #e2e8f0;
}

.border-b {
  border-bottom-width: 1px;
}

.border-t {
  border-top-width: 1px;
}

/* Grid layouts */
.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Typography */
.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.font-light {
  font-weight: 300;
}

.font-medium {
  font-weight: 500;
}

.font-semibold {
  font-weight: 600;
}

.font-bold {
  font-weight: 700;
}

/* Colors */
.text-gray-500 {
  color: #64748b;
}

.text-gray-600 {
  color: #64748b;
}

.text-gray-500 {
  color: #94a3b8;
}

.text-gray-500 {
  color: #94a3b8;
}

.text-white {
  color: #ffffff;
}

/* Spacing utilities */
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }

.px-0 { padding-left: 0; padding-right: 0; }
.px-8 { padding-left: 2rem; padding-right: 2rem; }

.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }

.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }

.mt-1 { margin-top: 0.25rem; }
.mt-8 { margin-top: 2rem; }

.ml-4 { margin-left: 1rem; }

/* Height and width utilities */
.h-2 { height: 0.5rem; }
.h-5 { height: 1.25rem; }
.h-6 { height: 1.5rem; }
.h-8 { height: 2rem; }
.h-12 { height: 3rem; }
.h-16 { height: 4rem; }

.w-2 { width: 0.5rem; }
.w-4 { width: 1rem; }
.w-5 { width: 1.25rem; }
.w-8 { width: 2rem; }
.w-11 { width: 2.75rem; }
.w-16 { width: 4rem; }

.w-full { width: 100%; }

/* Max width utilities */
.max-w-6xl {
  max-width: 72rem;
}

.max-w-md {
  max-width: 28rem;
}

/* Flexbox utilities */
.flex {
  display: flex;
}

.flex-1 {
  flex: 1 1 0%;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-end {
  justify-content: flex-end;
}

/* Positioning */
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.top-1\/2 {
  top: 50%;
}

.right-2 {
  right: 0.5rem;
}

.left-0 {
  left: 0;
}

.right-0 {
  right: 0;
}

.bottom-0 {
  bottom: 0;
}

/* Transform utilities */
.transform {
  transform: var(--tw-transform);
}

.-translate-y-1\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.hover\:scale-105:hover {
  --tw-scale-x: 1.05;
  --tw-scale-y: 1.05;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

/* Display utilities */
.hidden {
  display: none;
}

.block {
  display: block;
}

.inline-flex {
  display: inline-flex;
}

/* Other utilities */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.appearance-none {
  appearance: none;
}

.pointer-events-none {
  pointer-events: none;
}

.cursor-pointer {
  cursor: pointer;
}

.resize-none {
  resize: none;
}

.uppercase {
  text-transform: uppercase;
}

.tracking-tight {
  letter-spacing: -0.025em;
}

.tracking-wider {
  letter-spacing: 0.05em;
}

.text-center {
  text-align: center;
}

.overflow-hidden {
  overflow: hidden;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

/* Animations */
@keyframes pulse {
  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Responsive design helpers */
@media (max-width: 640px) {
  .sm\:p-6 {
    padding: 1.5rem;
  }
  
  .sm\:p-8 {
    padding: 2rem;
  }
  
  .sm\:flex-row {
    flex-direction: row;
  }
}

@media (max-width: 1024px) {
  .lg\:p-8 {
    padding: 2rem;
  }
}

/* Button width utilities */
.w-24 {
  width: 6rem;
}

.w-32 {
  width: 8rem;
}

.justify-center {
  justify-content: center;
}
</style> 