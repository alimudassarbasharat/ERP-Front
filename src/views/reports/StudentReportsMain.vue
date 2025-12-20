<template>
  <div class="student-reports-container">
    <!-- Header Section -->
    <div class="reports-header">
      <div class="header-content">
        <h1 class="page-title">Student Reports</h1>
        <p class="page-description">Comprehensive reports and analytics for student management</p>
      </div>
      <div class="header-actions">
        <el-button type="primary" @click="exportAllReports">
          <el-icon><Download /></el-icon>
          Export All Reports
        </el-button>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="reports-navigation">
      <el-tabs v-model="activeTab" @tab-click="handleTabClick" class="reports-tabs">
        <el-tab-pane label="Overview" name="overview">
          <div class="tab-content">
            <StudentOverviewReport />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Academic Performance" name="academic">
          <div class="tab-content">
            <StudentAcademicReport />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Attendance Reports" name="attendance">
          <div class="tab-content">
            <StudentAttendanceReports />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Fee Reports" name="fees">
          <div class="tab-content">
            <StudentFeeReports />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Class-wise Reports" name="classwise">
          <div class="tab-content">
            <StudentClassWiseReports />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Family-wise Reports" name="familywise">
          <div class="tab-content">
            <StudentFamilyWiseReports />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Export & Print" name="export">
          <div class="tab-content">
            <StudentExportReports />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()
const route = useRoute()
const activeTab = ref('overview')

// Handle tab clicks and update URL
const handleTabClick = (tab) => {
  const section = tab.props.name
  router.push(`/reports/students/${section}`)
}

// Export all reports
const exportAllReports = () => {
  // Implementation for exporting all student reports
  console.log('Exporting all student reports...')
}

// Set active tab based on route
onMounted(() => {
  const path = route.path
  if (path.includes('/academic')) {
    activeTab.value = 'academic'
  } else if (path.includes('/attendance')) {
    activeTab.value = 'attendance'
  } else if (path.includes('/fees')) {
    activeTab.value = 'fees'
  } else if (path.includes('/classwise')) {
    activeTab.value = 'classwise'
  } else if (path.includes('/familywise')) {
    activeTab.value = 'familywise'
  } else if (path.includes('/export')) {
    activeTab.value = 'export'
  } else {
    activeTab.value = 'overview'
  }
})
</script>

<style scoped>
.student-reports-container {
  padding: 24px;
  background: #f8fafc;
  min-height: 100vh;
}

.reports-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header-content .page-title {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.header-content .page-description {
  font-size: 16px;
  color: #94a3b8;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.reports-navigation {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.reports-tabs {
  padding: 0;
}

.reports-tabs :deep(.el-tabs__header) {
  margin: 0;
  padding: 0 24px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.reports-tabs :deep(.el-tabs__nav-wrap) {
  padding: 0;
}

.reports-tabs :deep(.el-tabs__item) {
  padding: 16px 20px;
  font-weight: 500;
  color: #94a3b8;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.reports-tabs :deep(.el-tabs__item.is-active) {
  color: #8b5cf6;
  border-bottom-color: #8b5cf6;
}

.reports-tabs :deep(.el-tabs__content) {
  padding: 0;
}

.tab-content {
  padding: 24px;
  min-height: 400px;
}

@media (max-width: 768px) {
  .reports-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .header-actions {
    width: 100%;
  }
  
  .reports-tabs :deep(.el-tabs__header) {
    padding: 0 16px;
  }
  
  .tab-content {
    padding: 16px;
  }
}
</style> 