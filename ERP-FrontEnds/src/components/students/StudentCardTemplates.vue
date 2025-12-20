<template>
  <div class="student-card-templates">
    <h2 class="text-2xl font-bold mb-6">Select Student Card Template</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="template in templates" :key="template.id" 
           class="template-card cursor-pointer hover:shadow-lg transition-shadow duration-300"
           @click="selectTemplate(template)">
        <div class="relative">
          <img :src="template.preview" :alt="template.name" class="w-full h-48 object-cover rounded-t-lg">
          <div class="absolute top-2 right-2" v-if="selectedTemplate?.id === template.id">
            <el-tag type="success">Selected</el-tag>
          </div>
        </div>
        <div class="p-4 bg-white rounded-b-lg">
          <h3 class="text-lg font-semibold mb-2">{{ template.name }}</h3>
          <p class="text-gray-600 text-sm">{{ template.description }}</p>
        </div>
      </div>
    </div>

    <div class="mt-8 flex justify-end">
      <el-button type="primary" 
                 :disabled="!selectedTemplate"
                 @click="generateCard">
        Generate Student Card
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStudentStore } from '@/stores/student'
import { useToast } from 'vue-toastification'

const studentStore = useStudentStore()
const selectedTemplate = ref(null)
const toast = useToast()

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional design with clean layout',
    preview: '/templates/classic-preview.png'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with bold colors',
    preview: '/templates/modern-preview.png'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Business-like appearance',
    preview: '/templates/professional-preview.png'
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Corporate style with dark accents',
    preview: '/templates/corporate-preview.png'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Simple and clean design',
    preview: '/templates/minimalist-preview.png'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Artistic and unique layout',
    preview: '/templates/creative-preview.png'
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Technology-inspired design',
    preview: '/templates/tech-preview.png'
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated and refined look',
    preview: '/templates/elegant-preview.png'
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'Premium and exclusive design',
    preview: '/templates/luxury-preview.png'
  },
  {
    id: 'futuristic',
    name: 'Futuristic',
    description: 'Modern and forward-looking style',
    preview: '/templates/futuristic-preview.png'
  }
]

const selectTemplate = (template) => {
  selectedTemplate.value = template
}

const generateCard = async () => {
  if (!selectedTemplate.value) {
    toast.warning('Please select a template first')
    return
  }

  try {
    const response = await studentStore.generateStudentCard({
      templateId: selectedTemplate.value.id,
      studentId: studentStore.currentStudent?.id
    })

    // Create a blob from the PDF data
    const blob = new Blob([response.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    
    // Open PDF in new tab
    window.open(url, '_blank')
    
    toast.success('Student card generated successfully')
  } catch (error) {
    toast.error('Failed to generate student card')
    console.error('Error generating student card:', error)
  }
}
</script>

<style scoped>
.student-card-templates {
  padding: 2rem;
}

.template-card {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.template-card:hover {
  transform: translateY(-2px);
}

.template-card img {
  transition: transform 0.3s ease;
}

.template-card:hover img {
  transform: scale(1.05);
}
</style> 