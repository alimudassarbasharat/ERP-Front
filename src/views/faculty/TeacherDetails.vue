<template>
  <div class="teacher-detail-container">
    <div class="teacher-detail-card">
      <!-- Header Section -->
      <div class="card-header">
        <div class="header-left">
          <el-button @click="router.back()" icon="ArrowLeft">Back</el-button>
          <h2 class="title">Teacher Details</h2>
        </div>
        <div class="header-actions">
          <el-button type="primary" @click="editTeacher" v-if="teacher">
            <el-icon><Edit /></el-icon>Edit
          </el-button>
      </div>
        </div>

      <!-- Main Content -->
      <div class="teacher-content" v-loading="loading">
        <template v-if="teacher">
          <!-- Profile Section -->
          <div class="profile-section">
            <div class="profile-photo enhanced-profile-photo">
              <img :src="getProfilePictureUrl(teacher)" alt="Profile Photo" />
      </div>
            <div class="profile-info enhanced-profile-info">
              <h1 class="teacher-name">{{ teacher.first_name }} {{ teacher.last_name }}</h1>
              <div class="teacher-designation">{{ teacher.designation }}</div>
              <div class="teacher-department" v-if="teacher.department?.name">
                {{ teacher.department.name }}
    </div>
              <div class="teacher-status">
                <el-tag :type="getStatusType(teacher.status)">{{ teacher.status }}</el-tag>
          </div>
              <div class="profile-stats-row enhanced-profile-stats-row">
                <div class="profile-stat-pill">
                  <span class="profile-stat-label">Years Exp.:</span>
                  <span class="profile-stat-value">{{ teacher.professional_details?.years_of_experience || 'N/A' }}</span>
            </div>
                <div class="profile-stat-pill">
                  <span class="profile-stat-label">Status:</span>
                  <span class="profile-stat-value">{{ teacher.status || 'N/A' }}</span>
        </div>
                <div class="profile-stat-pill">
                  <span class="profile-stat-label">Department:</span>
                  <span class="profile-stat-value">{{ teacher.department?.name || 'N/A' }}</span>
        </div>
                <div class="profile-stat-pill">
                  <span class="profile-stat-label">Salary:</span>
                  <span class="profile-stat-value">{{ teacher.salary || 'N/A' }}</span>
          </div>
                  </div>
                </div>
              </div>

          <!-- Info Tabs -->
          <div class="info-tabs enhanced-info-tabs">
            <div class="custom-tab-bar">
              <button
                v-for="tab in infoTabs"
                :key="tab.key"
                :class="['custom-tab-btn', { active: activeTab === tab.key }]"
                @click="activeTab = tab.key"
                type="button"
              >
                {{ tab.label }}
              </button>
                  </div>
            <div :class="['tab-content', 'enhanced-tab-content', 'linen-bg']">
              <div v-if="activeTab === 'personal' && infoSections[0]?.rows" class="collapsible-section">
                <div class="preview-bar" @click="toggleSection('personal')">
                  <span class="preview-text">Personal Information</span>
                  <el-icon class="toggle-icon" :class="{ 'is-active': openSection === 'personal' }">
                    <ArrowDown />
                  </el-icon>
                </div>
                <div class="collapsible-content" :class="{ 'is-open': openSection === 'personal' }">
                  <div class="info-grid enhanced-info-grid">
                    <div v-for="row in infoSections[0].rows" :key="row.label" class="info-row enhanced-info-row">
                      <span class="info-label enhanced-info-label">{{ row.label }}</span>
                      <span class="info-value enhanced-info-value">
                        <template v-if="row.label.toLowerCase().includes('date') && row.value && row.value !== 'N/A'">
                          {{ formatDate(row.value) }}
                        </template>
                        <template v-else>
                          {{ row.value }}
                        </template>
                      </span>
              </div>
                  </div>
        </div>
              </div>
              <div v-else-if="activeTab === 'contact' && infoSections[2]?.rows" class="collapsible-section">
                <div class="preview-bar" @click="toggleSection('contact')">
                  <span class="preview-text">Contact Information</span>
                  <el-icon class="toggle-icon" :class="{ 'is-active': openSection === 'contact' }">
                    <ArrowDown />
                  </el-icon>
                  </div>
                <div class="collapsible-content" :class="{ 'is-open': openSection === 'contact' }">
                  <div class="info-grid enhanced-info-grid">
                    <div v-for="row in infoSections[2].rows" :key="row.label" class="info-row enhanced-info-row">
                      <span class="info-label enhanced-info-label">{{ row.label }}</span>
                      <span class="info-value enhanced-info-value">{{ row.value }}</span>
              </div>
              </div>
          </div>
        </div>
              <div v-else-if="activeTab === 'professional' && infoSections[3]?.rows" class="collapsible-section">
                <div class="preview-bar" @click="toggleSection('professional')">
                  <span class="preview-text">Professional Information</span>
                  <el-icon class="toggle-icon" :class="{ 'is-active': openSection === 'professional' }">
                    <ArrowDown />
                  </el-icon>
            </div>
                <div class="collapsible-content" :class="{ 'is-open': openSection === 'professional' }">
                  <div class="info-grid enhanced-info-grid">
                    <div v-for="row in infoSections[3].rows" :key="row.label" class="info-row enhanced-info-row">
                      <span class="info-label enhanced-info-label">{{ row.label }}</span>
                      <span class="info-value enhanced-info-value">
                        <template v-if="row.label.toLowerCase().includes('date') && row.value && row.value !== 'N/A'">
                          {{ formatDate(row.value) }}
                        </template>
              <template v-else>
                          {{ row.value }}
              </template>
                      </span>
            </div>
            </div>
        </div>
              </div>
              <div v-else-if="activeTab === 'forms'" class="forms-section">
                <div v-if="formStylesLoading" class="empty-state">Loading form styles...</div>
                <div v-else-if="formStylesError" class="empty-state">{{ formStylesError }}</div>
                <div v-else class="forms-grid">
                  <div v-for="style in formStyles" :key="style.id" class="form-card" @click="selectFormStyle(style)">
                    <div class="form-preview">
                      <img v-if="previewUrls[style.id]" :src="previewUrls[style.id]" :alt="style.name" />
                      <span v-else>Loading...</span>
                    </div>
                    <div class="form-info">
                      <h3>{{ style.name }}</h3>
                      <p>{{ style.description }}</p>
                    </div>
                    <div class="form-actions">
                      <el-button type="primary" @click.stop="downloadForm(style)">Download</el-button>
                      <el-button @click.stop="printForm(style)">Print</el-button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="empty-state">No data available</div>
          </div>
              </div>

          <!-- Additional Sections -->
          <div class="additional-sections">
          <!-- Achievements -->
            <div class="section-card linen-bg">
              <div class="section-header section-toggle-header" @click="openAchievements = !openAchievements">
                <el-icon><Trophy /></el-icon>
                <span>Achievements</span>
                <el-icon class="toggle-icon" :class="{ 'is-active': openAchievements }" style="margin-left:auto;"><ArrowDown /></el-icon>
                    </div>
              <transition name="accordion-slide">
                <div v-show="openAchievements" class="section-content">
                  <div class="achievements-list">
                    <el-tag v-for="(achievement, index) in teacher.achievements" 
                            :key="index" 
                            class="achievement-tag" 
                            type="success">
                      {{ achievement }}
                    </el-tag>
                  </div>
                    </div>
              </transition>
                  </div>

          <!-- Assigned Classes -->
            <div class="section-card linen-bg">
              <div class="section-header section-toggle-header" @click="openClasses = !openClasses">
                <el-icon><Reading /></el-icon>
                <span>Assigned Classes</span>
                <el-icon class="toggle-icon" :class="{ 'is-active': openClasses }" style="margin-left:auto;"><ArrowDown /></el-icon>
            </div>
              <transition name="accordion-slide">
                <div v-show="openClasses" class="section-content">
                  <div class="classes-list">
                    <div v-for="cls in teacher.assigned_classes" 
                         :key="cls.id" 
                         class="class-card">
                      <div class="class-name">{{ cls.name }}</div>
                      <div class="class-meta">
                        <span>{{ cls.subject }}</span>
                        <span class="separator">•</span>
                        <span>{{ cls.section }}</span>
                        <span class="separator">•</span>
                        <span class="schedule">{{ cls.schedule }}</span>
            </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>

          <!-- Documents -->
            <div class="section-card linen-bg">
              <div class="section-header section-toggle-header" @click="openDocuments = !openDocuments">
                <el-icon><Document /></el-icon>
              <span>Documents</span>
                <el-icon class="toggle-icon" :class="{ 'is-active': openDocuments }" style="margin-left:auto;"><ArrowDown /></el-icon>
            </div>
              <transition name="accordion-slide">
                <div v-show="openDocuments" class="section-content">
                  <div v-if="teacher?.documents?.length" class="documents-list">
                    <div v-for="doc in teacher.documents" :key="doc.id" class="document-card">
                      <el-link :href="doc.url" target="_blank" type="primary">
                        <el-icon><Document /></el-icon>
                        <span class="document-name">{{ doc.name }}</span>
                      </el-link>
              </div>
      </div>
                  <div v-else class="empty-state">No documents uploaded</div>
            </div>
              </transition>
            </div>

            <!-- Notes -->
            <div class="section-card linen-bg">
              <div class="section-header section-toggle-header" @click="openRemarks = !openRemarks">
                <el-icon><Notebook /></el-icon>
                <span>Notes & Comments</span>
                <el-icon class="toggle-icon" :class="{ 'is-active': openRemarks }" style="margin-left:auto;"><ArrowDown /></el-icon>
            </div>
              <transition name="accordion-slide">
                <div v-show="openRemarks" class="section-content">
                  <div v-if="infoSections[1]?.value" class="notes-content">
                    <div class="note-text">{{ infoSections[1].value }}</div>
        </div>
                  <div v-else class="empty-state">No notes available</div>
        </div>
              </transition>
            </div>
            </div>
              </template>
              <template v-else>
          <div class="not-found">Teacher details not found</div>
              </template>
            </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import api from '@/utils/axios'

const router = useRouter()
const toast = useToast()
const route = useRoute()
const loading = ref(false)
const teacher = ref({
  id: 1,
  first_name: 'Sarah',
  last_name: 'Johnson',
  designation: 'Senior Mathematics Teacher',
  department: { name: 'Mathematics Department' },
  status: 'active',
  achievements: [
    'Best Teacher Award 2022',
    'Completed Google Certified Educator Program',
    'Led Annual Science Fair – 2023',
    'Excellence in Teaching Mathematics Award',
    'Innovative Teaching Methods Recognition',
    'Outstanding Academic Leadership Award',
    'Student Achievement Award 2023',
    'Professional Development Certification',
    'Educational Technology Integration Award'
  ],
  assigned_classes: [
    {
      id: 1,
      name: 'Advanced Calculus',
      subject: 'Mathematics',
      section: 'Section A',
      schedule: 'Mon, Wed, Fri 10:00 AM'
    },
    {
      id: 2,
      name: 'Linear Algebra',
      subject: 'Mathematics',
      section: 'Section B',
      schedule: 'Tue, Thu 2:00 PM'
    },
    {
      id: 3,
      name: 'Statistics & Probability',
      subject: 'Mathematics',
      section: 'Section C',
      schedule: 'Mon, Wed 3:30 PM'
    }
  ],
  documents: [
    { id: 1, name: 'Resume.pdf', url: 'https://example.com/documents/resume.pdf' },
    { id: 2, name: 'Teaching Certificate.jpg', url: 'https://example.com/documents/certificate.jpg' },
    { id: 3, name: 'Award Letter.pdf', url: 'https://example.com/documents/award-letter.pdf' }
  ],
  personal_details: {
    gender: 'Female',
    date_of_birth: '1985-04-12',
    cnic: '35202-1234567-8',
    blood_group: 'A+',
    religion: 'Islam',
    profile_picture: ''
  },
  contact_details: {
    phone_number: '+92-300-1234567',
    address: '123 Main Street, Lahore',
    province: 'Punjab',
    city: 'Lahore',
    emergency_contact: '+92-333-7654321'
  },
  professional_details: {
    qualification: 'M.Phil. Mathematics',
    specialization: 'Applied Mathematics',
    years_of_experience: 12,
    joining_date: '2012-08-15'
  },
  additional_details: {
    bank_account_details: 'Meezan Bank, 0123-4567890',
    remarks: 'Sarah is a dedicated educator known for her innovative teaching methods and commitment to student success. She regularly participates in professional development and has received multiple awards for excellence in teaching.'
  },
  email: 'sarah.johnson@school.edu.pk',
  salary: '120,000 PKR'
})

// Move all computed properties and other reactive declarations here
const activeTab = ref('personal')

// Move icon definitions to the top so they are available for infoTabs and other uses
const UserIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25v-1.5A2.25 2.25 0 016.75 16.5h10.5a2.25 2.25 0 012.25 2.25v1.5" /></svg>`
}
const CheckCircleIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4" /></svg>`
}
const BriefcaseIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 7.5V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v1.5M3.375 9h17.25m-16.5 0v7.125A2.625 2.625 0 006.75 18.75h10.5a2.625 2.625 0 002.625-2.625V9m-16.5 0V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75V9" /></svg>`
}
const CurrencyDollarIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" /></svg>`
}
const DocumentIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 7.5V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v1.5M3.375 9h17.25m-16.5 0v7.125A2.625 2.625 0 006.75 18.75h10.5a2.625 2.625 0 002.625-2.625V9m-16.5 0V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75V9" /></svg>`
}
const MailIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 17.25V6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25z" /><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75l-9.75 7.5-9.75-7.5" /></svg>`
}
const AcademicCapIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" /></svg>`
}
const InformationCircleIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
}
const TrophyIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21h7.5M12 17v4m-6.75-9A3.75 3.75 0 012.25 8.25V6a2.25 2.25 0 012.25-2.25h15A2.25 2.25 0 0122.5 6v2.25a3.75 3.75 0 01-3.75 3.75m-13.5 0v.75a6.75 6.75 0 006.75 6.75 6.75 6.75 0 006.75-6.75v-.75" /></svg>`
}
const BookOpenIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" /></svg>`
}
const ClockIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" /></svg>`
}
const PaperClipIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25V6.75a3.75 3.75 0 00-7.5 0v10.5a3.75 3.75 0 007.5 0z" /></svg>`
}

const quickStats = computed(() => {
  if (!teacher.value) return []
  return [
    {
      label: 'Years Exp.',
      value: teacher.value.professional_details?.years_of_experience || 0,
      icon: 'UserIcon',
      iconBg: 'bg-blue-100 text-blue-500',
    },
    {
      label: 'Status',
      value: teacher.value.status || 'N/A',
      icon: 'CheckCircleIcon',
      iconBg: 'bg-green-100 text-green-500',
    },
    {
      label: 'Department',
      value: teacher.value.department?.name || 'N/A',
      icon: 'BriefcaseIcon',
      iconBg: 'bg-yellow-100 text-yellow-500',
    },
    {
      label: 'Salary',
      value: teacher.value.salary || 'N/A',
      icon: 'CurrencyDollarIcon',
      iconBg: 'bg-purple-100 text-purple-500',
    },
  ]
})

const infoSections = computed(() => {
  if (!teacher.value) return []
  return [
    {
      title: 'Personal Info',
      icon: 'UserIcon',
      type: 'list',
      rows: [
        { label: 'Gender', value: teacher.value.personal_details?.gender || 'N/A' },
        { label: 'Date of Birth', value: teacher.value.personal_details?.date_of_birth || 'N/A' },
        { label: 'CNIC', value: teacher.value.personal_details?.cnic || 'N/A' },
        { label: 'Blood Group', value: teacher.value.personal_details?.blood_group || 'N/A' },
        { label: 'Religion', value: teacher.value.personal_details?.religion || 'N/A' },
      ],
    },
    {
      title: 'Notes / Remarks',
      icon: 'DocumentIcon',
      type: 'note',
      value: teacher.value.additional_details?.remarks || 'No remarks available.',
    },
    {
      title: 'Contact Info',
      icon: 'MailIcon',
      type: 'list',
      rows: [
        { label: 'Email', value: teacher.value.email || 'N/A' },
        { label: 'Phone', value: teacher.value.contact_details?.phone_number || 'N/A' },
        { label: 'Address', value: teacher.value.contact_details?.address || 'N/A' },
        { label: 'Province', value: teacher.value.contact_details?.province || 'N/A' },
        { label: 'City', value: teacher.value.contact_details?.city || 'N/A' },
        { label: 'Emergency Contact', value: teacher.value.contact_details?.emergency_contact || 'N/A' },
      ],
    },
    {
      title: 'Professional Info',
      icon: 'AcademicCapIcon',
      type: 'list',
      rows: [
        { label: 'Department', value: teacher.value.department?.name || 'N/A' },
        { label: 'Designation', value: teacher.value.designation || 'N/A' },
        { label: 'Qualification', value: teacher.value.professional_details?.qualification || 'N/A' },
        { label: 'Specialization', value: teacher.value.professional_details?.specialization || 'N/A' },
        { label: 'Years of Experience', value: teacher.value.professional_details?.years_of_experience || 'N/A' },
        { label: 'Joining Date', value: teacher.value.professional_details?.joining_date || 'N/A' },
      ],
    },
    {
      title: 'Additional Info',
      icon: 'InformationCircleIcon',
      type: 'list',
      rows: [
        { label: 'Salary', value: teacher.value.salary || 'N/A' },
        { label: 'Bank Account Details', value: teacher.value.additional_details?.bank_account_details || 'N/A' },
        { label: 'Remarks', value: teacher.value.additional_details?.remarks || 'N/A' },
      ],
    },
  ]
})

const infoTabs = [
  { key: 'personal', label: 'Personal', icon: UserIcon },
  { key: 'contact', label: 'Contact', icon: MailIcon },
  { key: 'professional', label: 'Professional', icon: AcademicCapIcon },
  { key: 'forms', label: 'Forms', icon: DocumentIcon },
]

function mailto(email) {
  if (email) window.open(`mailto:${email}`)
}
function call(phone) {
  if (phone) window.open(`tel:${phone}`)
}

const getStatusType = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'success'
    case 'on_leave':
      return 'warning'
    case 'inactive':
      return 'danger'
    default:
      return 'info'
  }
}

const editTeacher = () => {
  if (teacher.value?.id) {
    router.push(`/faculty/edit/${teacher.value.id}`)
  }
}

const fetchTeacherDetails = async () => {
  try {
    loading.value = true
    const response = await api.get(`/teachers/${route.params.id}`)
    if (response.data.success) {
      teacher.value = response.data.result
      // Overwrite demo sections with dummy data
      teacher.value.achievements = DUMMY_ACHIEVEMENTS
      teacher.value.assigned_classes = DUMMY_CLASSES
      teacher.value.documents = DUMMY_DOCUMENTS
      if (!teacher.value.additional_details) teacher.value.additional_details = {}
      teacher.value.additional_details.remarks = DUMMY_REMARKS
    } else {
      throw new Error(response.data.message || 'Failed to fetch teacher details')
    }
  } catch (error) {
    router.push('/faculty/list')
  } finally {
    loading.value = false
  }
}

const API_BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://erp-back-f0xb.onrender.com';

const getProfilePictureUrl = (teacher) => {
  if (!teacher || !teacher.personal_details) {
    return '/default-avatar.png';
  }
  const pic = teacher.personal_details.profile_picture;
  if (pic) {
    return `${API_BASE_URL}/storage/${pic}`;
  }
  return '/default-avatar.png';
}

// Dummy values for demo sections
const DUMMY_ACHIEVEMENTS = [
  'Best Teacher Award 2022',
  'Completed Google Certified Educator Program',
  'Led Annual Science Fair – 2023',
  'Excellence in Teaching Mathematics Award',
  'Innovative Teaching Methods Recognition',
  'Outstanding Academic Leadership Award',
  'Student Achievement Award 2023',
  'Professional Development Certification',
  'Educational Technology Integration Award'
]
const DUMMY_CLASSES = [
  {
    id: 1,
    name: 'Advanced Calculus',
    subject: 'Mathematics',
    section: 'Section A',
    schedule: 'Mon, Wed, Fri 10:00 AM'
  },
  {
    id: 2,
    name: 'Linear Algebra',
    subject: 'Mathematics',
    section: 'Section B',
    schedule: 'Tue, Thu 2:00 PM'
  },
  {
    id: 3,
    name: 'Statistics & Probability',
    subject: 'Mathematics',
    section: 'Section C',
    schedule: 'Mon, Wed 3:30 PM'
  }
]
const DUMMY_DOCUMENTS = [
  { id: 1, name: 'Resume.pdf', url: 'https://example.com/documents/resume.pdf' },
  { id: 2, name: 'Teaching Certificate.jpg', url: 'https://example.com/documents/certificate.jpg' },
  { id: 3, name: 'Award Letter.pdf', url: 'https://example.com/documents/award-letter.pdf' }
]
const DUMMY_REMARKS = 'Sarah is a dedicated educator known for her innovative teaching methods and commitment to student success. She regularly participates in professional development and has received multiple awards for excellence in teaching.'

function formatDate(dateStr) {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

const infoSectionsAccordion = [
  { key: 'personal', label: 'Personal', rowsIndex: 0 },
  { key: 'contact', label: 'Contact', rowsIndex: 2 },
  { key: 'professional', label: 'Professional', rowsIndex: 3 },
]
const openSection = ref('personal') // Personal open by default

function toggleSection(sectionKey) {
  openSection.value = openSection.value === sectionKey ? null : sectionKey;
}

// Toggle states for additional sections
const openAchievements = ref(false)
const openClasses = ref(false)
const openDocuments = ref(false)
const openRemarks = ref(false)

const formStyles = ref([])
const formStylesLoading = ref(false)
const formStylesError = ref(null)

const previewUrls = ref({})

const fetchPreviewUrl = async (styleId) => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await api.get(`/teachers/form-style-preview/${styleId}`, {
      responseType: 'blob',
      headers: { Authorization: `Bearer ${token}` }
    });
    previewUrls.value[styleId] = URL.createObjectURL(response.data);
  } catch (error) {
    previewUrls.value[styleId] = null;
  }
}

watch(formStyles, (styles) => {
  styles.forEach(style => {
    fetchPreviewUrl(style.id)
  })
})

const fetchFormStyles = async () => {
  formStylesLoading.value = true
  formStylesError.value = null
  try {
    const response = await api.get('/teachers/form-styles')
    if (response.data.success) {
      formStyles.value = response.data.result
    } else {
      formStylesError.value = 'Failed to load form styles.'
    }
  } catch (error) {
    formStylesError.value = 'Failed to load form styles.'
  } finally {
    formStylesLoading.value = false
  }
}

const selectFormStyle = async (style) => {
  try {
    const response = await api.post(`/teachers/${teacher.value.id}/form-style`, {
      style_id: style.id
    })
    if (response.data.success) {
      toast.success('Form style selected successfully')
    }
  } catch (error) {
    toast.error('Failed to select form style')
  }
}

const downloadForm = async (style) => {
  try {
    const response = await api.get(`/teachers/form-style-preview/${style.id}`, {
      responseType: 'blob'
    })
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `teacher-form-style${style.id}.png`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    toast.error('Failed to download form')
  }
}

const printForm = async (style) => {
  try {
    const response = await api.get(`/teachers/form-style-preview/${style.id}`, {
      responseType: 'blob'
    })
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const printWindow = window.open(url, '_blank')
    printWindow.onload = () => {
      printWindow.print()
    }
  } catch (error) {
    toast.error('Failed to print form')
  }
}

onMounted(() => {
  fetchTeacherDetails()
  fetchFormStyles()
})
</script>

<style scoped>
.teacher-detail-container {
  padding: 20px;
  width: 100%;
  background: #faf6f2;
  min-height: 100vh;
  box-sizing: border-box;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (min-width: 1400px) {
  .teacher-detail-container {
    max-width: 1200px;
    margin: 0 auto;
  }
}

.teacher-detail-card {
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  border: none;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.teacher-detail-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #8b8991;
  padding: 28px 32px;
  border-radius: 22px 22px 0 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 18px 0 rgba(64,158,255,0.07), 0 1.5px 6px 0 rgba(31,38,135,0.04);
  border-bottom: 1.5px solid #e3eaf5;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-left .el-button,
.header-left .el-button[type='default'] {
  background: #fff;
  color: #3b82f6;
  border: 1.5px solid #d0e6fa;
  border-radius: 22px;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 28px;
  box-shadow: 0 1px 4px rgba(64,158,255,0.04);
  transition: background 0.18s, color 0.18s, box-shadow 0.18s, border-color 0.18s;
  outline: none;
  display: flex;
  align-items: center;
  gap: 8px;
}
.header-left .el-button:hover,
.header-left .el-button:focus {
  background: #f3f0fa;
  color: #3b82f6;
  border-color: var(--border-accent);
  box-shadow: 0 2px 8px rgba(64,158,255,0.10);
}
.header-left .el-button:active {
  background: #e7eafc;
  color: #3b82f6;
}

.title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.header-actions .el-button[type='primary'],
.header-actions .el-button {
  background: #fff;
  color: #3b82f6;
  border: 1.5px solid #d0e6fa;
  border-radius: 22px;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 32px;
  box-shadow: 0 1.5px 6px 0 rgba(64,158,255,0.10);
  transition: background 0.18s, color 0.18s, box-shadow 0.18s, border-color 0.18s;
  outline: none;
  display: flex;
  align-items: center;
  gap: 8px;
}
.header-actions .el-button[type='primary']:hover,
.header-actions .el-button[type='primary']:focus,
.header-actions .el-button:hover,
.header-actions .el-button:focus {
  background: #f3f0fa;
  color: #3b82f6;
  border-color: var(--border-accent);
  box-shadow: 0 2px 8px rgba(64,158,255,0.10);
}
.header-actions .el-button[type='primary']:active,
.header-actions .el-button:active {
  background: #e7eafc;
  color: #3b82f6;
}

.header-actions .el-button .el-icon {
  margin-right: 8px;
}

.teacher-content {
  padding: 24px;
}

/* Profile Section */
.profile-section {
  display: flex;
  gap: 36px;
  margin-bottom: 36px;
  padding: 36px 40px;
  background: linear-gradient(120deg, #f7f3ef 60%, #f3f0eb 100%);
  border-radius: 22px;
  box-shadow: 0 10px 36px 0 rgba(31, 38, 135, 0.13), 0 2px 8px 0 rgba(64,158,255,0.10);
  border: 2px solid #d0e6fa;
  position: relative;
  overflow: hidden;
  align-items: center;
}
.profile-photo.enhanced-profile-photo {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #fff;
  box-shadow: 0 6px 24px rgba(64,158,255,0.13), 0 0 0 6px #eaf3fa;
  background: #f4f8fb;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.profile-photo.enhanced-profile-photo::after {
  content: '';
  position: absolute;
  top: -8px; left: -8px; right: -8px; bottom: -8px;
  border-radius: 50%;
  box-shadow: 0 0 0 3px #409eff33;
  pointer-events: none;
}
.profile-photo.enhanced-profile-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.profile-info.enhanced-profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}
.profile-stats-row.enhanced-profile-stats-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 18px;
}
.profile-stat-pill {
  display: flex;
  align-items: center;
  background: #f4f6fa;
  border-radius: 18px;
  padding: 8px 20px;
  box-shadow: 0 1px 4px rgba(64,158,255,0.06);
  border: 1px solid #e3eaf5;
  font-size: 15px;
  transition: background 0.2s;
}
.profile-stat-pill:hover {
  background: #e9eef5;
}
.profile-stat-label {
  font-weight: 700;
  color: #3b82f6 !important;
  margin-right: 6px;
  letter-spacing: 0.01em;
  font-size: 14px;
}
.profile-stat-value {
  font-weight: 400;
  color: #1e293b;
  font-size: 14px;
}
@media (max-width: 900px) {
  .profile-section {
    flex-direction: column;
    align-items: center;
    padding: 24px 10px;
    gap: 18px;
  }
  .profile-info.enhanced-profile-info {
    align-items: center;
  text-align: center;
  }
  .profile-stats-row.enhanced-profile-stats-row {
    justify-content: center;
  }
}

/* Info Tabs */
.info-tabs.enhanced-info-tabs {
  margin-bottom: 0;
}
.custom-tab-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 0.5rem;
  margin-top: 8px;
  flex-wrap: wrap;
}
.custom-tab-btn {
  border: 1.5px solid #409eff;
  background: #fff;
  color: #3b82f6;
  border-radius: 22px;
  padding: 8px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  outline: none;
  box-shadow: 0 1px 4px rgba(64,158,255,0.04);
  min-width: 120px;
  flex: 0 0 auto;
}
.custom-tab-btn.active,
.custom-tab-btn:focus {
  background: #409eff;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(64,158,255,0.13);
}
.custom-tab-btn:hover:not(.active) {
  background: #eaf3fa;
  color: #3b82f6;
}
@media (max-width: 600px) {
  .custom-tab-bar {
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 8px;
    overflow-x: unset;
  }
  .custom-tab-btn {
    min-width: 0;
    width: 100%;
    flex: 1 1 100%;
    margin-bottom: 0;
  }
}
.tab-content.enhanced-tab-content {
  background: #fff;
  border-radius: 16px;
  border: 1.5px solid #e3eaf5;
  box-shadow: 0 4px 24px 0 rgba(64,158,255,0.07), 0 1.5px 6px 0 rgba(31,38,135,0.04);
  padding: 24px;
  margin-top: 18px;
  margin-bottom: 18px;
  min-height: auto;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.tab-content.enhanced-tab-content:hover {
  box-shadow: 0 8px 32px 0 rgba(64,158,255,0.13), 0 2px 8px 0 rgba(31,38,135,0.08);
  border-color: var(--border-accent);
}
.info-grid.enhanced-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 18px;
  margin-top: 0;
  padding: 16px 24px;
}
.info-row.enhanced-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f7fafd;
  border-radius: 12px;
  box-shadow: 0 1px 6px rgba(64,158,255,0.06);
  padding: 18px 24px;
  margin-bottom: 0;
  border: 1px solid #e3eaf5;
  transition: box-shadow 0.18s, background 0.18s;
  gap: 18px;
}
.info-row.enhanced-info-row:hover {
  background: #eaf3fa;
  box-shadow: 0 4px 16px rgba(64,158,255,0.10);
}
.info-label,
.enhanced-info-label {
  color: #3b82f6 !important;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.01em;
  margin-right: 16px;
  min-width: 120px;
  flex: 1;
}
.info-value,
.enhanced-info-value {
  color: #1e293b;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.01em;
  margin-left: 8px;
  word-break: break-word;
  text-align: right;
  flex: 1;
}
@media (max-width: 768px) {
  .profile-section {
  flex-direction: column;
  align-items: center;
    padding: 24px 10px;
    gap: 18px;
  }
  .profile-info.enhanced-profile-info {
  align-items: center;
    text-align: center;
  }
  .profile-stats-row.enhanced-profile-stats-row {
  justify-content: center;
  }
  .info-grid.enhanced-info-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .info-row.enhanced-info-row {
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 12px;
    gap: 6px;
  }
  .info-label.enhanced-info-label {
    margin-right: 0;
  margin-bottom: 2px;
}
  .info-value.enhanced-info-value {
    margin-left: 0;
  }
}

/* Additional Sections */
.additional-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.section-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #ebeef5;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.section-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: #f8fafc;
  border-bottom: 1px solid #ebeef5;
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
}

.section-content {
  padding: 20px;
}

.achievements-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.achievement-tag {
  margin: 0;
  padding: 7px 14px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 20px;
  transition: all 0.3s ease;
  color: #1e293b !important;
  background-color: #f1f5f9 !important;
  border-color: #e2e8f0 !important;
}

.achievement-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #f1f5f9 !important;
}

.classes-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #7b8aa18a;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e3eaf5;
}

.class-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e3eaf5;
  transition: all 0.3s ease;
}

.class-card:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-color: #3b82f6;
  background: #ffffff;
}

.class-name {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.class-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #64748b;
}

.separator {
  color: #e2e8f0;
}

.schedule {
  color: #3b82f6;
  font-weight: 500;
}

.documents-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #7b8aa18a;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e3eaf5;
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.document-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 16px 20px;
  border: 1px solid #e3eaf5;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(8px);
}

.document-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background: linear-gradient(to bottom, #3577c6, #409EFF);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.document-card:hover {
  transform: translateX(4px);
  box-shadow: 0 8px 24px rgba(64, 158, 255, 0.15);
  border-color: #3b82f6;
  background: linear-gradient(to right, #f8fafd, #ffffff);
}

.document-card:hover::before {
  opacity: 1;
}

.document-card .el-link {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 15px;
  font-weight: 500;
  color: #3b82f6;
  text-decoration: none;
  width: 100%;
  position: relative;
  letter-spacing: 0.01em;
}

.document-card .el-icon {
  font-size: 20px;
  color: #3b82f6;
  background: linear-gradient(135deg, #f0f5ff 0%, #e6f0ff 100%);
  padding: 10px;
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  position: relative;
  overflow: hidden;
}

.document-card .el-icon::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.document-card:hover .el-icon::after {
  opacity: 1;
}

.document-card .el-link:hover {
  color: #3b82f6;
}

.document-card .el-link:hover .el-icon {
  color: #3b82f6;
  background: linear-gradient(135deg, #e6f0ff 0%, #d9e9ff 100%);
  transform: scale(1.05) translateY(-1px);
  box-shadow: 0 4px 16px rgba(64, 158, 255, 0.2);
}

.document-card .el-link::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%233577c6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5l7 7-7 7'/%3E%3C/svg%3E") no-repeat center;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 2px 4px rgba(64, 158, 255, 0.1));
}

.document-card:hover .el-link::after {
  opacity: 1;
  transform: translateY(-50%) translateX(2px);
}

.notes-content {
  color: #64748b;
  font-size: 13px;
  line-height: 1.8;
  padding: 20px;
  background: #7b8aa18a;
  border-radius: 12px;
  border: 1px solid #e3eaf5;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.notes-content .note-text {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e3eaf5;
  transition: all 0.3s ease;
  color: #1e293b;
  font-size: 13px;
  line-height: 1.8;
  font-weight: 400;
}

.notes-content .note-text:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-color: #3b82f6;
  background: #f8fafd;
}

.empty-state {
  color: #94a3b8;
  text-align: center;
  padding: 32px;
  font-size: 14px;
  background: #7b8aa18a;
  border-radius: 12px;
  border: 1px dashed #dcdfe6;
}

.not-found {
  text-align: center;
  padding: 64px;
  color: #94a3b8;
  font-size: 16px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px dashed #dcdfe6;
}

/* Responsive Styles */
@media (max-width: 1200px) {
  .teacher-detail-container {
    max-width: 100%;
    padding: 16px;
  }
  
  .profile-section {
    flex-direction: column;
  align-items: center;
  text-align: center;
    padding: 24px;
  }
  
  .quick-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .teacher-detail-container {
    max-width: 100%;
    padding: 8px;
  }
  
  .card-header {
    flex-direction: column;
    gap: 16px;
  text-align: center;
    padding: 20px;
  }
  
  .header-left {
    flex-direction: column;
  }
  
  .quick-stats {
    grid-template-columns: 1fr;
  }
  
  .info-grid {
  grid-template-columns: 1fr;
  }
  
  .additional-sections {
    grid-template-columns: 1fr;
  }
  
  .tab-content {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .teacher-detail-container {
    max-width: 100%;
    padding: 4px;
  }
  
  .profile-photo {
    width: 140px;
    height: 140px;
  }
  
  .teacher-name {
    font-size: 24px;
  }
  
  .teacher-designation {
    font-size: 16px;
  }
  
  .stat-card {
    padding: 20px;
  }
  
  .stat-icon {
    width: 48px;
    height: 48px;
    font-size: 24px;
  }
  
  .section-header {
    padding: 16px;
  }
  
  .section-content {
    padding: 16px;
  }
}

/* Add new styles for profile-stats-row and pills */
.profile-stats-row {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 18px;
}
.profile-stat-pill {
  display: flex;
  align-items: center;
  background: #f4f6fa;
  border-radius: 18px;
  padding: 8px 20px;
  box-shadow: 0 1px 4px rgba(64,158,255,0.06);
  border: 1px solid #e3eaf5;
  font-size: 15px;
  transition: background 0.2s;
}
.profile-stat-pill:hover {
  background: #e9eef5;
}
.profile-stat-label {
  font-weight: 700;
  color: #1e293b;
  margin-right: 6px;
}
.profile-stat-value {
  font-weight: 400;
  color: #64748b;
}
@media (max-width: 768px) {
  .profile-stats-row {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  .profile-stat-pill {
  width: 100%;
    justify-content: flex-start;
  }
}

/* Linen background for active tab content and additional sections */
.linen-bg {
  background: #faf6f2 !important;
}
.section-card.linen-bg {
  border-radius: 16px;
  border: 1.5px solid #e3eaf5;
  box-shadow: 0 4px 24px 0 rgba(64,158,255,0.07), 0 1.5px 6px 0 rgba(31,38,135,0.04);
  margin-bottom: 24px;
}
.section-header {
  background: transparent;
  border-bottom: 1px solid #e3eaf5;
  border-radius: 16px 16px 0 0;
  color: #3b82f6;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.02em;
  padding-top: 8px;
  padding-bottom: 8px;
}
.section-content {
  background: transparent;
}

/* Teacher name and designation accent (optional, subtle) */
.teacher-name {
  color: #3b82f6;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.01em;
  margin: 0 0 8px 0;
}
.teacher-designation {
  color: #3b82f6;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 0.01em;
}

/* Tab headings (if any custom headings are used inside tab content) */
.tab-content .tab-heading {
  color: #3b82f6;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.01em;
  margin-bottom: 18px;
}

.info-accordion {
  width: 100%;
  margin-bottom: 32px;
}
.accordion-section {
  margin-bottom: 0;
}
.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  background: #faf6f2;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  color: #3b82f6;
  border-radius: 12px 12px 0 0;
  border-bottom: none;
  position: relative;
  z-index: 2;
}
.accordion-header:hover {
  background: #f3f0fa;
}
.accordion-title {
  font-size: 18px;
  font-weight: 700;
  color: #3b82f6;
}
.chevron {
  margin-left: 10px;
  transition: transform 0.25s cubic-bezier(.4,0,.2,1);
  color: #3b82f6;
}
.chevron.open {
  transform: rotate(180deg);
}
.accordion-strip {
  border-bottom: 2.5px solid #e3eaf5;
  min-height: 8px;
  background: transparent;
  position: relative;
  z-index: 1;
  transition: border-color 0.3s;
}
.accordion-strip.open {
  border-bottom: none;
}
.accordion-content {
  padding: 0 32px 24px 32px;
  background: #faf6f2;
  border-radius: 0 0 12px 12px;
  overflow: hidden;
}
.accordion-grid {
  margin-top: 0;
}
.accordion-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(64,158,255,0.04);
  padding: 16px 24px;
  margin-bottom: 12px;
  border: 1px solid #e3eaf5;
  transition: box-shadow 0.18s, background 0.18s;
  gap: 18px;
}
.accordion-row:last-child {
  margin-bottom: 0;
}
.accordion-row .info-label {
  flex: 1;
    text-align: left;
  color: #3b82f6;
  font-weight: 700;
}
.accordion-row .info-value {
  flex: 1;
  text-align: right;
  color: #1e293b;
  font-weight: 400;
}
.right-align {
  text-align: right !important;
}
/* Accordion slide animation */
.accordion-slide-enter-active, .accordion-slide-leave-active {
  transition: max-height 1s cubic-bezier(.4,0,.2,1), opacity 1s cubic-bezier(.4,0,.2,1);
  overflow: hidden;
}
.accordion-slide-enter-from, .accordion-slide-leave-to {
  max-height: 0;
  opacity: 0;
}
.accordion-slide-enter-to, .accordion-slide-leave-from {
  max-height: 800px;
  opacity: 1;
}

/* Collapsible Section Styles */
.collapsible-section {
  margin-bottom: 16px;
  border-radius: 12px;
  overflow: hidden;
}

.preview-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #fff;
  border: 1px solid #e3eaf5;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.preview-bar:hover {
  background: #f3f0fa;
  border-color: var(--border-accent);
}

.preview-text {
  font-size: 16px;
  font-weight: 600;
  color: #3b82f6;
}

.toggle-icon {
  font-size: 20px;
  color: #3b82f6;
  transition: transform 0.3s ease;
}

.toggle-icon.is-active {
  transform: rotate(180deg);
}

.collapsible-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  background: #fff;
  border: 1px solid #e3eaf5;
  border-top: none;
  border-radius: 0 0 12px 12px;
}

.collapsible-content.is-open {
  max-height: 1000px;
  transition: max-height 0.5s ease-in;
}

/* Add to <style scoped> */
.section-toggle-header {
  cursor: pointer;
  user-select: none;
  transition: background 0.18s;
}
.section-toggle-header:hover {
  background: #f3f0fa;
}
.toggle-icon {
  margin-left: 8px;
  transition: transform 0.3s cubic-bezier(.4,0,.2,1);
}
.toggle-icon.is-active {
  transform: rotate(180deg);
}

.forms-section {
  padding: 24px;
}

.forms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 16px;
}

.form-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.form-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.form-preview {
  width: 100%;
  height: 200px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.form-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-info {
  padding: 16px;
}

.form-info h3 {
  margin: 0 0 8px 0;
  color: #3b82f6;
  font-size: 18px;
}

.form-info p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

.form-actions {
  padding: 16px;
  display: flex;
  gap: 12px;
  border-top: 1px solid #eee;
}

@media (max-width: 768px) {
  .forms-grid {
    grid-template-columns: 1fr;
  }
}
</style> 