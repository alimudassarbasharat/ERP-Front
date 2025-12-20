<template>
  <div class="fee-sidebar-modern">
    <div class="sidebar-header-modern">
      <h3>Fee Management</h3>
    </div>
    <div class="sidebar-menu-modern">
      <router-link to="/fees/create" class="menu-item-modern" active-class="active-menu-item">
        <i class="fas fa-plus-circle"></i>
        <span>Create Fee</span>
      </router-link>
      <router-link to="/fees/view" class="menu-item-modern" active-class="active-menu-item">
        <i class="fas fa-eye"></i>
        <span>View Fees</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeeSidebar'
}
</script>

<style scoped>
.fee-sidebar-modern {
  width: 260px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%);
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(60, 72, 100, 0.10);
  padding: 28px 0 18px 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
}

.sidebar-header-modern {
  padding: 0 32px 24px 32px;
  border-bottom: 1.5px solid #e5e7eb;
  margin-bottom: 8px;
}
.sidebar-header-modern h3 {
  margin: 0;
  color: #1e293b;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.sidebar-menu-modern {
  padding: 18px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.menu-item-modern {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 32px;
  color: #1e293b;
  text-decoration: none;
  font-size: 1.08rem;
  font-weight: 500;
  border-radius: 10px;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  position: relative;
}
.menu-item-modern i {
  color: #8b5cf6;
  font-size: 1.25rem;
  transition: color 0.18s;
}
.menu-item-modern:hover {
  background: linear-gradient(90deg, #e0e7ff 60%, #f1f5f9 100%);
  color: #8b5cf6;
  box-shadow: 0 2px 8px rgba(99,102,241,0.08);
}
.menu-item-modern:hover i {
  color: #8b5cf6;
}
.active-menu-item {
  background: linear-gradient(90deg, #6366f1 80%, #a5b4fc 100%);
  color: #ffffff !important;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(99,102,241,0.10);
}
.active-menu-item i {
  color: #ffffff !important;
}
@media (max-width: 700px) {
  .fee-sidebar-modern {
    width: 100vw;
    min-width: 0;
    border-radius: 0 0 18px 18px;
    padding: 18px 0 8px 0;
  }
  .sidebar-header-modern {
    padding: 0 18px 16px 18px;
  }
  .menu-item-modern {
    padding: 11px 18px;
    font-size: 1rem;
  }
}
</style> 