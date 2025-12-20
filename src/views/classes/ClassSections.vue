<template>
  <div class="class-sections-container">
    <el-card class="page-card">
      <template #header>
        <div class="card-header">
          <el-icon><User /></el-icon>
          <span class="title">Sections</span>
        </div>
      </template>
      <div class="content">
        <!-- Sections table will go here -->
        <el-empty description="Sections coming soon." />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

</script>

<style scoped>
.class-sections-container {
  padding: 24px;
}
.page-card {
  max-width: 1100px;
  margin: 0 auto;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 22px;
  font-weight: 600;
  color: #3b82f6;
}
.title {
  font-size: 22px;
  font-weight: 600;
}
</style> 