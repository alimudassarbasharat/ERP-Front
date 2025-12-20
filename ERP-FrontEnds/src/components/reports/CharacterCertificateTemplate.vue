<template>
  <div id="character-certificate" class="certificate-container bg-white">
    <!-- Certificate Border -->
    <div class="certificate-border">
      <!-- Header -->
      <div class="certificate-header text-center mb-6">
        <div class="school-logo mb-4">
          <img v-if="schoolLogo" :src="schoolLogo" alt="School Logo" class="w-20 h-20 mx-auto">
          <div v-else class="w-20 h-20 mx-auto bg-blue-600 rounded-full flex items-center justify-center">
            <span class="text-white text-2xl font-bold">{{ schoolName.charAt(0) }}</span>
          </div>
        </div>
        <h1 class="school-name text-3xl font-bold text-gray-900 mb-2">{{ schoolName }}</h1>
        <p class="school-address text-lg text-gray-600 mb-4">{{ schoolAddress }}</p>
        <div class="certificate-title">
          <h2 class="text-4xl font-bold text-blue-800 mb-2" style="font-family: 'Georgia', serif;">CHARACTER CERTIFICATE</h2>
          <div class="title-underline mx-auto"></div>
        </div>
      </div>

      <!-- Certificate Content -->
      <div class="certificate-content text-center px-8">
        <div class="certificate-text text-lg leading-relaxed text-gray-900 mb-8">
          <p class="mb-4">This is to certify that</p>
          
          <div class="student-name text-3xl font-bold text-blue-800 mb-4 border-b-2 border-gray-200 pb-2 mx-auto" style="max-width: 400px;">
            {{ studentName }}
          </div>
          
          <div class="w-full">
            <div>
              <strong>Father's Name:</strong> {{ fatherName }}
            </div>
            <div>
              <strong>Roll Number:</strong> {{ rollNumber }}
            </div>
            <div>
              <strong>Class:</strong> {{ studentClass }}
            </div>
            <div>
              <strong>Session:</strong> {{ session }}
            </div>
          </div>

          <div class="w-full">
            <p class="mb-4">
              has been a student of this institution from <strong>{{ admissionDate }}</strong> to <strong>{{ leavingDate || 'present' }}</strong>. 
              During this period, {{ pronounPossessive }} conduct and character have been found to be <strong>{{ characterRating }}</strong>.
            </p>
            
            <p class="mb-4">
              {{ studentName }} has shown {{ characterDescription }} and has maintained {{ academicPerformance }} academic standards. 
              {{ pronounSubjective }} has been regular in attendance and has participated actively in school activities.
            </p>
            
            <p class="mb-4">
              I wish {{ pronounObject }} all success in {{ pronounPossessive }} future endeavors.
            </p>
          </div>
        </div>

        <!-- Signatures -->
        <div class="w-full">
          <div class="signature-section text-center">
            <div class="signature-line h-16 border-b-2 border-gray-400 mb-2"></div>
            <p class="text-sm font-semibold">Class Teacher</p>
            <p class="text-xs text-gray-600">{{ classTeacher }}</p>
          </div>
          <div class="signature-section text-center">
            <div class="signature-line h-16 border-b-2 border-gray-400 mb-2"></div>
            <p class="text-sm font-semibold">Principal</p>
            <p class="text-xs text-gray-600">{{ principalName }}</p>
          </div>
        </div>

        <!-- Certificate Footer -->
        <div class="certificate-footer mt-12 text-center">
          <div class="seal-area mb-4">
            <div class="school-seal w-24 h-24 mx-auto border-4 border-blue-600 rounded-full flex items-center justify-center bg-blue-50">
              <span class="text-blue-600 font-bold text-xs">SCHOOL<br>SEAL</span>
            </div>
          </div>
          <p class="text-sm text-gray-600">Date of Issue: {{ issueDate }}</p>
          <p class="text-sm text-gray-600">Certificate No: {{ certificateNumber }}</p>
        </div>
      </div>

      <!-- Decorative Elements -->
      <div class="decorative-corners">
        <div class="corner corner-top-left"></div>
        <div class="corner corner-top-right"></div>
        <div class="corner corner-bottom-left"></div>
        <div class="corner corner-bottom-right"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

const toast = useToast()
const props = defineProps({
  studentData: {
    type: Object,
    required: true
  },
  schoolData: {
    type: Object,
    default: () => ({
      name: 'Excellence Public School',
      address: 'Sector 15, Education City, Pakistan',
      logo: null,
      principal: 'Dr. Muhammad Ahmed',
      classTeacher: 'Ms. Sarah Khan'
    })
  },
  template: {
    type: String,
    default: 'standard'
  }
})

// Computed properties
const studentName = computed(() => props.studentData.name || 'Student Name')
const fatherName = computed(() => props.studentData.fatherName || 'Father Name')
const rollNumber = computed(() => props.studentData.rollNumber || '001')
const studentClass = computed(() => props.studentData.class || 'Class X')
const session = computed(() => props.studentData.session || '2023-24')
const admissionDate = computed(() => props.studentData.admissionDate || '01-April-2020')
const leavingDate = computed(() => props.studentData.leavingDate)

const schoolName = computed(() => props.schoolData.name)
const schoolAddress = computed(() => props.schoolData.address) 
const schoolLogo = computed(() => props.schoolData.logo)
const principalName = computed(() => props.schoolData.principal)
const classTeacher = computed(() => props.schoolData.classTeacher)

const issueDate = computed(() => new Date().toLocaleDateString('en-GB'))
const certificateNumber = computed(() => `CC-${new Date().getFullYear()}-${props.studentData.id || '001'}`)

// Gender-based pronouns
const pronounSubjective = computed(() => {
  const gender = props.studentData.gender?.toLowerCase()
  return gender === 'female' ? 'She' : 'He'
})

const pronounObject = computed(() => {
  const gender = props.studentData.gender?.toLowerCase()
  return gender === 'female' ? 'her' : 'him'
})

const pronounPossessive = computed(() => {
  const gender = props.studentData.gender?.toLowerCase()
  return gender === 'female' ? 'her' : 'his'
})

// Character assessment
const characterRating = computed(() => {
  const rating = props.studentData.characterRating || 'excellent'
  return rating.toLowerCase()
})

const characterDescription = computed(() => {
  const descriptions = {
    excellent: 'exemplary behavior, leadership qualities, and strong moral values',
    good: 'good behavior, cooperative nature, and positive attitude',
    satisfactory: 'satisfactory conduct and respectful behavior'
  }
  return descriptions[characterRating.value] || descriptions.good
})

const academicPerformance = computed(() => {
  const performance = props.studentData.academicPerformance || 'good'
  const performances = {
    excellent: 'outstanding',
    good: 'good',
    average: 'satisfactory'
  }
  return performances[performance] || 'good'
})

// Print function
const printCertificate = () => {
  window.print()
}

defineExpose({
  printCertificate
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Georgia:wght@400;700&display=swap');

.certificate-container {
  width: 210mm;
  min-height: 297mm;
  margin: 0 auto;
  padding: 20mm;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.certificate-border {
  position: relative;
  background: #ffffff;
  border: 8px solid #1e40af;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  min-height: calc(297mm - 80mm);
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 25%),
    radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 0%, transparent 25%);
}

.title-underline {
  width: 200px;
  height: 4px;
  background: linear-gradient(90deg, #1e40af, #3b82f6, #1e40af);
  border-radius: 2px;
}

.decorative-corners {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.corner {
  position: absolute;
  width: 60px;
  height: 60px;
  border: 3px solid #3b82f6;
}

.corner-top-left {
  top: 20px;
  left: 20px;
  border-right: none;
  border-bottom: none;
  border-radius: 15px 0 0 0;
}

.corner-top-right {
  top: 20px;
  right: 20px;
  border-left: none;
  border-bottom: none;
  border-radius: 0 15px 0 0;
}

.corner-bottom-left {
  bottom: 20px;
  left: 20px;
  border-right: none;
  border-top: none;
  border-radius: 0 0 0 15px;
}

.corner-bottom-right {
  bottom: 20px;
  right: 20px;
  border-left: none;
  border-top: none;
  border-radius: 0 0 15px 0;
}

.school-seal {
  position: relative;
}

.school-seal::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border: 2px dashed #3b82f6;
  border-radius: 50%;
}

/* Print styles */
@media print {
  .certificate-container {
    width: 100%;
    margin: 0;
    padding: 0;
    background: #ffffff;
    box-shadow: none;
  }
  
  .certificate-border {
    box-shadow: none;
    page-break-inside: avoid;
  }
  
  body {
    -webkit-print-color-adjust: exact;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .certificate-container {
    width: 100%;
    padding: 10px;
  }
  
  .certificate-border {
    padding: 20px;
  }
  
  .school-name {
    font-size: 1.5rem;
  }
  
  .certificate-title h2 {
    font-size: 1.8rem;
  }
  
  .student-name {
    font-size: 1.5rem;
  }
  
  .student-details {
    grid-cols: 1;
    gap: 2;
  }
}
</style> 