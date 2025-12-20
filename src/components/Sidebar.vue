<script setup>
import { useToast } from 'vue-toastification'

// ...other imports
</script>

<el-menu router>
  <el-menu-item index="/dashboard">
    <el-icon><HomeFilled /></el-icon>
    <span>Dashboard</span>
  </el-menu-item>
  <el-sub-menu index="fees">
    <template #title>
      <el-icon><Money /></el-icon>
      <span>Fee Management</span>
    </template>
    <el-menu-item index="/fees/collection">
      <el-icon><Money /></el-icon>
      <span>Fee Collection</span>
    </el-menu-item>
    <el-menu-item index="/fees/manage">
      <el-icon><Setting /></el-icon>
      <span>Manage Fee</span>
    </el-menu-item>
  </el-sub-menu>
  <el-sub-menu index="classes">
    <template #title>
      <el-icon><School /></el-icon>
      <span>Classes</span>
    </template>
    <el-menu-item index="/classes/list">Class List</el-menu-item>
    <el-menu-item index="/classes/sections">Sections</el-menu-item>
  </el-sub-menu>
  <!-- Exams section -->
  <el-sub-menu index="exams">
    <template #title>
      <el-icon><Document /></el-icon>
      <span>Exams</span>
    </template>
    <el-menu-item index="/exams/add-marksheet">Add Marksheet</el-menu-item>
    <el-menu-item index="/exams/view-marksheet">View Marksheet</el-menu-item>
    <el-menu-item index="/exams/mark-report">Mark Report</el-menu-item>
    <el-menu-item index="/exams/award-list">Award List</el-menu-item>
  </el-sub-menu>
  <!-- ...other menu items... -->
</el-menu>
