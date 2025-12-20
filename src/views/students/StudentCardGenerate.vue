<template>
  <div class="student-card-generate">
    <el-card class="page-card">
      <template #header>
        <div class="card-header">
          <div class="header-left">
            <el-button @click="goBack" icon="ArrowLeft">Back</el-button>
            <h2 class="title">Generate Student Card</h2>
          </div>
        </div>
      </template>

      <div class="content">
        <!-- Student Info Summary -->
        <div class="student-summary mb-8">
          <el-descriptions :column="3" border>
            <el-descriptions-item label="Student Name">
              John Doe
            </el-descriptions-item>
            <el-descriptions-item label="Roll Number">
              STU2024001
            </el-descriptions-item>
            <el-descriptions-item label="Class">
              Class 10-A
            </el-descriptions-item>
          </el-descriptions>
        </div>

        <!-- Template Selection -->
        <div class="templates-section">
          <h3 class="section-title">Select Template</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="template in templates" :key="template.id" 
                 class="template-card cursor-pointer hover:shadow-lg transition-shadow duration-300"
                 :class="{ 'selected': selectedTemplate?.id === template.id }"
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
        </div>

        <!-- Action Buttons -->
        <div class="mt-8 flex justify-end gap-4">
          <el-button @click="goBack">Cancel</el-button>
          <el-button type="primary" 
                     :disabled="!selectedTemplate"
                     :loading="generating"
                     @click="generateCard">
            Generate Card
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()
const generating = ref(false)
const selectedTemplate = ref(null)

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional design with clean layout',
    preview: 'https://placehold.co/300x200/409EFF/fff?text=Classic'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with bold colors',
    preview: 'https://placehold.co/300x200/36a3f7/fff?text=Modern'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Business-like appearance',
    preview: 'https://placehold.co/300x200/222/fff?text=Professional'
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Corporate style with dark accents',
    preview: 'https://placehold.co/300x200/333/fff?text=Corporate'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Simple and clean design',
    preview: 'https://placehold.co/300x200/eee/222?text=Minimalist'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Artistic and unique layout',
    preview: 'https://placehold.co/300x200/f39c12/fff?text=Creative'
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Technology-inspired design',
    preview: 'https://placehold.co/300x200/2ecc71/fff?text=Tech'
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated and refined look',
    preview: 'https://placehold.co/300x200/8e44ad/fff?text=Elegant'
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'Premium and exclusive design',
    preview: 'https://placehold.co/300x200/d4af37/222?text=Luxury'
  },
  {
    id: 'futuristic',
    name: 'Futuristic',
    description: 'Modern and forward-looking style',
    preview: 'https://placehold.co/300x200/00bcd4/fff?text=Futuristic'
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
    generating.value = true
    // For testing, just show a success message
    toast.success('Student card generated successfully')
    // In real implementation, this would call the API
    // const response = await studentStore.generateStudentCard({
    //   templateId: selectedTemplate.value.id,
    //   studentId: route.params.id
    // })
  } catch (error) {
    toast.error('Failed to generate student card')
    console.error('Error generating student card:', error)
  } finally {
    generating.value = false
  }
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.student-card-generate {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7ed 100%);
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

.page-card {
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  border: none;
  width: 100%;
  box-sizing: border-box;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #409EFF, #36a3f7);
  padding: 20px;
  border-radius: 8px 8px 0 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
}

.content {
  padding: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 20px;
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

.template-card.selected {
  border: 2px solid #409EFF;
}

.template-card img {
  transition: transform 0.3s ease;
}

.template-card:hover img {
  transform: scale(1.05);
}
</style> 