<template>
  <div class="pay-challan-container">
    <el-card class="page-card">
      <template #header>
        <div class="card-header">
          <el-icon><Money /></el-icon>
          <span class="title">Pay Challan</span>
        </div>
      </template>
      <div class="content">
        <!-- Challan payment form or dashboard will go here -->
        <el-empty description="Challan payment processing coming soon." />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

</script>

<style scoped>
.pay-challan-container {
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