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
  <el-menu-item index="/classes/list">
    <el-icon><School /></el-icon>
    <span>Class Management</span>
  </el-menu-item>
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
  
  <!-- Settings section -->
  <el-sub-menu index="settings">
    <template #title>
      <el-icon><Setting /></el-icon>
      <span>Settings</span>
    </template>
    <el-menu-item index="/settings/school-profile">
      <el-icon><School /></el-icon>
      <span>School Profile</span>
    </el-menu-item>
    <el-menu-item index="/settings/sessions">
      <el-icon><Calendar /></el-icon>
      <span>Session Management</span>
    </el-menu-item>
    <el-menu-item index="/settings/general">
      <el-icon><Setting /></el-icon>
      <span>General Settings</span>
    </el-menu-item>
    <el-menu-item index="/settings/notifications">
      <el-icon><Bell /></el-icon>
      <span>Notifications</span>
    </el-menu-item>
  </el-sub-menu>
</el-menu>
