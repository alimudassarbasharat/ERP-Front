<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical"
        :router="true"
      >
        <el-menu-item index="/student/registration">
          <el-icon><Document /></el-icon>
          <span>Student Registration</span>
        </el-menu-item>
        <!-- Add more menu items here -->
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header height="60px">
        <div class="header-content">
          <h2>Student Management System</h2>
        </div>
      </el-header>
      
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { useToast } from 'vue-toastification'

const toast = useToast()
const route = useRoute()
const activeMenu = computed(() => route.path)
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.el-aside {
  background-color: #ffffff;
  color: #ffffff;
}

.el-menu-vertical {
  border-right: none;
}

.el-header {
  background-color: #ffffff;
  border-bottom: 1px solid #dcdfe6;
}

.header-content {
  height: 100%;
  display: flex;
  align-items: center;
}

.header-content h2 {
  margin: 0;
  color: #1e293b;
}
</style> 