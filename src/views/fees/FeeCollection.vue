<template>
  <div class="fee-collection-ultra">
    <!-- Modern Soft Fee Summary Section -->
    <!-- <div class="modern-fee-summary-grid">
      <div class="modern-fee-summary-card modern-blue">
        <div style="display: flex; align-items: center; gap: 18px;">
          <span style="font-size: 2.2rem; background: rgba(255,255,255,0.13); border-radius: 50%; padding: 12px; display: flex; align-items: center; justify-content: center;">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="32" height="32" rx="16" fill="#2563eb"/><path d="M12 7v10M7 12h10" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>
          </span>
          <div>
            <div class="modern-fee-summary-label">Received Fee</div>
            <div class="modern-fee-summary-value">₹15,20,000</div>
            <div style="color: #10b981; font-weight: 600; font-size: 1rem; margin-top: 2px;">↑ 2% this month</div>
          </div>
        </div>
      </div>
      <div class="modern-fee-summary-card modern-purple">
        <div style="display: flex; align-items: center; gap: 18px;">
          <span style="font-size: 2.2rem; background: rgba(255,255,255,0.13); border-radius: 50%; padding: 12px; display: flex; align-items: center; justify-content: center;">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="32" height="32" rx="16" fill="#a21caf"/><path d="M12 7v10M7 12h10" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>
          </span>
          <div>
            <div class="modern-fee-summary-label">Remaining Fee</div>
            <div class="modern-fee-summary-value">₹3,30,000</div>
            <div style="color: #ef4444; font-weight: 600; font-size: 1rem; margin-top: 2px;">↓ 1% this month</div>
          </div>
        </div>
      </div>
      <div class="modern-fee-summary-card modern-blue" style="background: linear-gradient(135deg, rgba(16,185,129,0.96) 70%, rgba(110,231,183,0.90) 100%);">
        <div style="display: flex; align-items: center; gap: 18px;">
          <span style="font-size: 2.2rem; background: rgba(255,255,255,0.13); border-radius: 50%; padding: 12px; display: flex; align-items: center; justify-content: center;">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="32" height="32" rx="16" fill="#10b981"/><path d="M12 7v10M7 12h10" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>
          </span>
          <div>
            <div class="modern-fee-summary-label">Monthly Fee</div>
            <div class="modern-fee-summary-value">₹1,50,000</div>
            <div style="color: #10b981; font-weight: 600; font-size: 1rem; margin-top: 2px;">↑ 3% this month</div>
          </div>
        </div>
      </div>
      <div class="modern-fee-summary-card modern-yellow">
        <div style="display: flex; align-items: center; gap: 18px;">
          <span style="font-size: 2.2rem; background: rgba(255,255,255,0.13); border-radius: 50%; padding: 12px; display: flex; align-items: center; justify-content: center;">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="32" height="32" rx="16" fill="#fbbf24"/><path d="M12 7v10M7 12h10" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>
          </span>
          <div>
            <div class="modern-fee-summary-label">Yearly Fee</div>
            <div class="modern-fee-summary-value">₹18,00,000</div>
            <div style="color: #10b981; font-weight: 600; font-size: 1rem; margin-top: 2px;">↑ 5% this year</div>
          </div>
        </div>
      </div>
      <div class="modern-fee-summary-card modern-yellow" style="background: linear-gradient(135deg, rgba(251,191,36,0.96) 70%, rgba(253,230,138,0.90) 100%);">
        <div style="display: flex; align-items: center; gap: 18px;">
          <span style="font-size: 2.2rem; background: rgba(255,255,255,0.13); border-radius: 50%; padding: 12px; display: flex; align-items: center; justify-content: center;">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="32" height="32" rx="16" fill="#fbbf24"/><path d="M12 7v10M7 12h10" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>
          </span>
          <div>
            <div class="modern-fee-summary-label">Total Fee (All Time)</div>
            <div class="modern-fee-summary-value">₹25,00,000</div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- Earnings/Expenses Chart -->
    <!-- <div class="chart-card glass-blur">
      <div class="chart-header">
        <div class="chart-title">Earnings</div>
        <div class="chart-dropdown-wrap">
          <select v-model="selectedMonths" class="chart-dropdown">
            <option v-for="opt in monthsOptions" :key="opt" :value="opt">{{ opt }}</option>
          </select>
          <span class="chevron">▼</span>
        </div>
      </div>
      <VueApexCharts width="100%" height="260" type="area" :options="chartOptions" :series="series" />
    </div> -->

    <!-- Main Fee Sections -->
    <div class="fee-sections-container">
      <div class="section-header">
        <h2 class="section-title">Fee Management Modules</h2>
        <p class="section-subtitle">Access the core modules of the fee system</p>
      </div>
      
      <div class="fee-sections-grid">
        <!-- Generate Fee Module -->
        <div class="fee-section-card glass" @click="goToGenerateChallan">
          <div class="section-icon structure-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="24" fill="#E0E7FF"/>
              <g>
                <circle cx="24" cy="24" r="10" fill="#fff"/>
                <path d="M24 19v10M19 24h10" stroke="#6366F1" stroke-width="2.5" stroke-linecap="round"/>
              </g>
            </svg>
          </div>
          <div class="section-content">
            <h3 class="section-card-title">Generate Fee</h3>
            <p class="section-card-description">Create and assign new fees for students or groups.</p>
          </div>
        </div>

        <!-- Pay Fee Module -->
        <div class="fee-section-card glass" @click="goToPayFee">
          <div class="section-icon collection-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="24" fill="#D1F7E6"/>
              <g>
                <rect x="16" y="20" width="16" height="8" rx="2" fill="#fff"/>
                <path d="M20 24h8" stroke="#1DB67D" stroke-width="2" stroke-linecap="round"/>
                <circle cx="24" cy="24" r="8" stroke="#1DB67D" stroke-width="2" fill="none"/>
              </g>
            </svg>
          </div>
          <div class="section-content">
            <h3 class="section-card-title">Pay Fee</h3>
            <p class="section-card-description">Browse, search, and manage all generated fees.</p>
          </div>
        </div>

        <!-- Fee Reports & Analytics Module -->
        <div class="fee-section-card glass" @click="goToSection('reports')">
          <div class="section-icon reports-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="24" fill="#FFE7C2"/>
              <path d="M32 32H16V16H32V32Z" stroke="#FF9800" stroke-width="2"/>
              <path d="M20 24L24 28L32 20" stroke="#FF9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="section-content">
            <h3 class="section-card-title">Fee Reports & Analytics</h3>
            <p class="section-card-description">View comprehensive reports, analytics, and export fee data for insights.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Dynamic Content Area - Removed as not needed -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const activeTab = ref('review')
const searchQuery = ref('')
const selectedFilter = ref('all')
const dateRange = ref([])
const activeSection = ref(null)
const router = useRouter()
const toast = useToast()

// ApexCharts data and options
const chartOptions = ref({
  chart: {
    type: 'area',
    toolbar: { show: false },
    background: 'transparent',
    fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
    foreColor: '#64748b',
    sparkline: { enabled: false },
    dropShadow: { enabled: false },
    animations: { enabled: true, easing: 'easeinout', speed: 700 },
    offsetY: 0,
    offsetX: 0,
    stacked: false,
    zoom: { enabled: false },
  },
  colors: ['#fde68a', '#2563eb'],
  dataLabels: { enabled: false },
  stroke: {
    curve: 'smooth',
    width: [4, 2],
    dashArray: [0, 6]
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.2,
      gradientToColors: ['#fbbf24', '#60a5fa'],
      inverseColors: false,
      opacityFrom: 0.7,
      opacityTo: 0.12,
      stops: [0, 100]
    }
  },
  grid: {
    borderColor: '#e0e7ef',
    strokeDashArray: 5,
    yaxis: { lines: { show: true } },
    xaxis: { lines: { show: false } },
    padding: { left: 0, right: 0, top: 0, bottom: 0 },
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    labels: { style: { colors: '#7b8ca6', fontSize: '15px', fontWeight: 700 } },
    axisBorder: { show: false },
    axisTicks: { show: false },
    offsetX: 0,
  },
  yaxis: {
    labels: { style: { colors: '#7b8ca6', fontSize: '15px', fontWeight: 700 } },
    offsetX: 0,
  },
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'right',
    fontSize: '14px',
    fontWeight: 500,
    markers: {
      width: 9,
      height: 9,
      radius: 9,
      offsetX: -2
    },
    labels: { colors: '#a0aec0' },
    itemMargin: { horizontal: 12, vertical: 0 },
    fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
  },
  tooltip: {
    theme: 'light',
    style: { fontSize: '15px', fontWeight: 600, borderRadius: 10, padding: 12, boxShadow: '0 4px 24px rgba(60,72,100,0.13)' },
    marker: { show: true },
    y: {
      formatter: (val, opts) => `${opts.seriesIndex === 0 ? 'Earnings' : 'Expenses'} ${val}K`
    }
  },
  chartArea: {
    background: 'linear-gradient(135deg, #f8fafc 80%, #e0e7ff 100%)',
    opacity: 0.7
  }
})

const series = ref([
  { name: 'Earnings', data: [30, 40, 35, 50, 49, 60, 70, 91] },
  { name: 'Expenses', data: [20, 29, 37, 36, 44, 45, 50, 58] }
])

// Dropdown for months
const monthsOptions = [
  'Last 8 Months',
  'Last 6 Months',
  'Last 12 Months'
]
const selectedMonths = ref(monthsOptions[0])

// Removed dynamic component loading - not needed

const goToSection = (section) => {
  if (section === 'structure') router.push({ name: 'FeeStructure' })
  else if (section === 'collection') router.push({ name: 'FeeCollectionPage' })
  else if (section === 'reports') router.push({ name: 'FeeAnalytics' })
}

const goToGenerateChallan = () => {
  router.push({ name: 'GenerateChallan' })
}

function goToPayFee() {
  router.push({ name: 'PayFee' })
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInFromTop {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulseIcon {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.fee-collection-ultra {
  max-width: 1280px;
  margin: 0 auto;
  padding: 36px 12px 36px 12px;
  font-family: 'Inter', 'SF Pro', 'Segoe UI', Arial, sans-serif;
  background: #f7faff;
  animation: fadeIn 0.6s ease-out;
}

.glass {
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(8px);
  box-shadow: 0 8px 32px 0 rgba(60, 72, 100, 0.10);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px 0 rgba(60, 72, 100, 0.15);
}

.ultra-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 18px;
  padding: 32px 36px 28px 36px;
  margin-bottom: 36px;
  box-shadow: 0 4px 24px rgba(60, 72, 100, 0.08);
  background: linear-gradient(90deg, #f8fafc 80%, #e0e7ff 100%);
  animation: slideInFromTop 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 22px;
}

.header-icon {
  background: #e6edff;
  border-radius: 16px;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  color: #3a6ff7;
  box-shadow: 0 2px 8px rgba(99,102,241,0.06);
  animation: pulseIcon 2s infinite;
}

.header-titles {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ultra-title {
  font-size: 2.2rem;
  font-weight: 900;
  color: #1e293b;
  margin: 0;
  letter-spacing: 0.5px;
}

.ultra-subtitle {
  font-size: 1.08rem;
  color: #64748b;
  font-weight: 500;
  margin-top: 2px;
}

.header-right {
  display: flex;
  align-items: center;
}

.new-fee-btn {
  font-size: 1.08rem;
  font-weight: 700;
  border-radius: 10px;
  padding: 12px 28px;
  background: linear-gradient(90deg, #6366f1 80%, #a5b4fc 100%);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(99,102,241,0.10);
  border: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.new-fee-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    #ffffff,
    transparent
  );
  transition: 0.5s;
}

.new-fee-btn:hover::before {
  left: 100%;
}

.new-fee-btn:hover {
  background: linear-gradient(90deg, #4338ca 80%, #a5b4fc 100%);
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 8px 24px rgba(99,102,241,0.2);
}

.ultra-stats-row {
  display: flex;
  gap: 32px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  justify-content: space-between;
}

.ultra-stat-card {
  flex: 1 1 0;
  min-width: 260px;
  max-width: 370px;
  display: flex;
  align-items: center;
  gap: 22px;
  border-radius: 18px;
  padding: 32px 32px;
  margin-bottom: 0;
  box-shadow: 0 4px 24px rgba(60, 72, 100, 0.08);
  transition: box-shadow 0.18s, transform 0.18s;
  position: relative;
  background: rgba(255,255,255,0.85);
  border: 1.5px solid #f1f5f9;
}

.ultra-stat-card:hover {
  box-shadow: 0 8px 32px rgba(60, 72, 100, 0.13);
  transform: translateY(-2px) scale(1.02);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  box-shadow: 0 2px 8px rgba(99,102,241,0.06);
}

.stat-blue {
  background: linear-gradient(135deg, #e0e7ff 60%, #f8fafc 100%);
}

.stat-green {
  background: linear-gradient(135deg, #d1f7e6 60%, #f8fafc 100%);
}

.stat-orange {
  background: linear-gradient(135deg, #ffe7c2 60%, #f8fafc 100%);
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stat-label {
  font-size: 1.08rem;
  color: #888;
  font-weight: 600;
}

.stat-value {
  font-size: 2.1rem;
  font-weight: 900;
  color: #181d2f;
  letter-spacing: 1px;
}

.stat-anim {
  /* Placeholder for animated numbers */
}

.stat-growth {
  font-size: 1rem;
  color: #1db67d;
  font-weight: 600;
  margin-top: 2px;
}

.stat-growth.up {
  color: #1db67d;
}

.ultra-tabs-row {
  margin-top: 18px;
  background: transparent;
}

.ultra-tabs {
  --el-tabs-header-height: 52px;
  --el-tabs-item-font-size: 1.08rem;
  --el-tabs-item-font-weight: 700;
  --el-tabs-item-border-radius: 16px 16px 0 0;
  --el-tabs-item-padding: 0 36px;
}

.ultra-tabs .el-tabs__item {
  font-size: 1.08rem;
  font-weight: 700;
  border-radius: 16px 16px 0 0;
  padding: 0 36px;
  color: #64748b;
  transition: color 0.18s, background 0.18s;
  background: transparent;
}

.ultra-tabs .el-tabs__item.is-active {
  color: #8b5cf6;
  background: #f8fafc;
  font-weight: 900;
  border-bottom: 3px solid #6366f1;
}

.ultra-tab-content {
  padding: 56px 0 0 0;
  min-height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ultra-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  color: #94a3b8;
}

.empty-illustration {
  width: 130px;
  opacity: 0.88;
  margin-bottom: 8px;
}

.empty-message {
  font-size: 1.18rem;
  color: #94a3b8;
  font-weight: 600;
}

.cta-btn {
  font-size: 1.08rem;
  font-weight: 700;
  border-radius: 10px;
  padding: 10px 28px;
  background: linear-gradient(90deg, #6366f1 80%, #a5b4fc 100%);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(99,102,241,0.10);
  border: none;
  transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
}

.cta-btn:hover {
  background: linear-gradient(90deg, #4338ca 80%, #a5b4fc 100%);
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 4px 16px rgba(99,102,241,0.13);
}

@media (max-width: 900px) {
  .ultra-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 22px 10px 18px 10px;
    gap: 10px;
  }
  .ultra-stats-row {
    flex-direction: column;
    gap: 18px;
  }
  .ultra-stat-card {
    min-width: 0;
    max-width: 100vw;
    padding: 18px 12px;
    gap: 10px;
    min-height: 100px;
  }
  .stat-value {
    font-size: 1.4rem;
  }
  .ultra-title {
    font-size: 1.3rem;
  }
}

/* New Modern Styles */
.search-filter-section {
  display: flex;
  gap: 20px;
  padding: 24px;
  border-radius: 18px;
  margin-bottom: 32px;
  align-items: center;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 300px;
}

.modern-search :deep(.el-input__wrapper) {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 8px 16px;
  transition: all 0.3s ease;
}

.modern-search :deep(.el-input__wrapper:hover) {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.filter-options {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.modern-select :deep(.el-input__wrapper) {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.modern-datepicker :deep(.el-input__wrapper) {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

/* Animations */
.animate-in {
  animation: slideIn 0.5s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.floating {
  animation: floating 3s ease-in-out infinite;
}

@keyframes floating {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.empty-illustration-container {
  position: relative;
  margin-bottom: 24px;
}

.empty-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0) 70%);
  border-radius: 50%;
  z-index: -1;
}

.empty-description {
  color: #94a3b8;
  font-size: 1rem;
  margin: 8px 0 24px;
  text-align: center;
}

.btn-icon {
  margin-right: 8px;
}

.pulse-btn {
  animation: buttonPulse 2s infinite;
}

@keyframes buttonPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(99,102,241,0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(99,102,241,0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(99,102,241,0);
  }
}

/* Enhanced Responsive Design */
@media (max-width: 900px) {
  .search-filter-section {
    flex-direction: column;
    padding: 16px;
  }
  
  .search-box {
    width: 100%;
  }
  
  .filter-options {
    width: 100%;
  }
  
  .modern-select,
  .modern-datepicker {
    width: 100%;
  }
}

/* Fee Sections Styles */
.fee-sections-container {
  margin: 40px 0;
}

.section-header {
  margin-bottom: 24px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #64748b;
  margin-top: 8px;
}

.fee-sections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.fee-section-card {
  display: flex;
  align-items: center;
  padding: 24px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border: 1.5px solid #ffffff;
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

.fee-section-card:nth-child(1) { animation-delay: 0.2s; }
.fee-section-card:nth-child(2) { animation-delay: 0.3s; }
.fee-section-card:nth-child(3) { animation-delay: 0.4s; }

.fee-section-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 16px 40px rgba(60, 72, 100, 0.15);
}

.section-icon {
  flex-shrink: 0;
  margin-right: 20px;
  animation: float 3s ease-in-out infinite;
}

.section-content {
  flex: 1;
}

.section-card-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.section-card-description {
  font-size: 0.95rem;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

.section-arrow {
  color: #8b5cf6;
  font-size: 1.2rem;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.fee-section-card:hover .section-arrow {
  opacity: 1;
  transform: translateX(0);
}

.dynamic-content-area {
  margin-top: 32px;
  padding: 32px;
  border-radius: 16px;
  min-height: 400px;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .fee-sections-grid {
    grid-template-columns: 1fr;
  }
  
  .fee-section-card {
    padding: 20px;
  }
  
  .section-icon {
    margin-right: 16px;
  }
  
  .section-card-title {
    font-size: 1.1rem;
  }
  
  .section-card-description {
    font-size: 0.9rem;
  }
}

.fee-dashboard-cards {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fee-cards-row {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  width: 100%;
}

.fee-card {
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(60, 72, 100, 0.10);
  background: #fff;
  min-width: 220px;
  max-width: 260px;
  width: 100%;
  padding: 16px 14px 14px 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

.fee-card:nth-child(1) { animation-delay: 0.1s; }
.fee-card:nth-child(2) { animation-delay: 0.2s; }
.fee-card:nth-child(3) { animation-delay: 0.3s; }
.fee-card:nth-child(4) { animation-delay: 0.4s; }

.fee-card:hover {
  box-shadow: 0 12px 40px rgba(60, 72, 100, 0.16);
  transform: translateY(-8px) scale(1.02);
}

.fee-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 18px;
  background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.fee-card:hover::after {
  opacity: 1;
}

.fee-card-value {
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 4px;
  margin-top: 2px;
  letter-spacing: 0.3px;
}

.fee-card-split {
  display: flex;
  flex-direction: row;
  min-width: 600px;
  max-width: 700px;
  padding: 0;
  background: none;
  box-shadow: none;
}

.fee-card-half {
  flex: 1;
  padding: 16px 14px 14px 14px;
  border-radius: 18px;
  margin: 0 4px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 4px 24px rgba(60, 72, 100, 0.10);
  position: relative;
  transition: box-shadow 0.18s, transform 0.18s;
}

.fee-card-half:first-child { margin-left: 0; }
.fee-card-half:last-child { margin-right: 0; }
.fee-card-half:hover {
  box-shadow: 0 8px 32px rgba(60, 72, 100, 0.16);
  transform: translateY(-4px) scale(1.03);
}

.fee-card-blue { background: linear-gradient(135deg, #2563eb 80%, #60a5fa 100%); color: #ffffff; }
.fee-card-blue .fee-card-title, .fee-card-blue .fee-card-value, .fee-card-blue .fee-card-link { color: #ffffff; }
.fee-card-green { background: linear-gradient(135deg, #059669 80%, #34d399 100%); color: #ffffff; }
.fee-card-green .fee-card-title, .fee-card-green .fee-card-value, .fee-card-green .fee-card-link { color: #ffffff; }
.fee-card-purple { background: linear-gradient(135deg, #a21caf 80%, #c084fc 100%); color: #ffffff; }
.fee-card-purple .fee-card-title, .fee-card-purple .fee-card-value, .fee-card-purple .fee-card-link { color: #ffffff; }
.fee-card-orange { background: linear-gradient(135deg, #f59e42 80%, #fbbf24 100%); color: #ffffff; }
.fee-card-orange .fee-card-title, .fee-card-orange .fee-card-value, .fee-card-orange .fee-card-link { color: #ffffff; }
.fee-card-yellow { background: linear-gradient(135deg, #fbbf24 80%, #fde68a 100%); color: #ffffff; }
.fee-card-yellow .fee-card-title, .fee-card-yellow .fee-card-value, .fee-card-yellow .fee-card-link { color: #ffffff; }
.fee-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.fee-card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}
.fee-card-title {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.1px;
}
.fee-card-link {
  font-size: 1rem;
  color: #ffffff;
  text-decoration: underline;
  opacity: 0.9;
  transition: opacity 0.18s;
}
.fee-card-link:hover { opacity: 1; }
@media (max-width: 1200px) {
  .fee-cards-row { flex-direction: column; align-items: center; }
  .fee-card, .fee-card-split { min-width: 320px; max-width: 98vw; }
}
@media (max-width: 700px) {
  .fee-card-split { flex-direction: column; min-width: 0; max-width: 98vw; }
  .fee-card-half { margin: 8px 0; width: 100%; }
}

.chart-card, .chart-card.glass-blur {
  border-radius: 20px;
  padding: 24px 24px 8px 24px;
  margin-bottom: 32px;
  background: linear-gradient(135deg, #f8fafc 80%, #e0e7ff 100%);
  box-shadow: 0 8px 32px 0 rgba(60, 72, 100, 0.13);
  border: none;
  position: relative;
  backdrop-filter: blur(8px) saturate(1.2);
  -webkit-backdrop-filter: blur(8px) saturate(1.2);
  overflow: visible;
}
.chart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.chart-title {
  font-size: 1.18rem;
  font-weight: 800;
  color: #1e293b;
  letter-spacing: 0.1px;
}
.chart-dropdown-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.chart-dropdown {
  border: none;
  background: #f1f5f9;
  color: #8b5cf6;
  font-weight: 700;
  font-size: 1rem;
  border-radius: 16px;
  padding: 7px 32px 7px 18px;
  box-shadow: 0 2px 8px rgba(99,102,241,0.04);
  outline: none;
  cursor: pointer;
  transition: background 0.18s;
  appearance: none;
  -webkit-appearance: none;
}
.chart-dropdown:focus {
  background: #e0e7ff;
}
.chevron {
  position: absolute;
  right: 14px;
  pointer-events: none;
  color: #8b5cf6;
  font-size: 1.1em;
  top: 50%;
  transform: translateY(-50%);
}

.fee-cards-new-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  width: 100%;
}
@media (max-width: 900px) {
  .fee-cards-new-layout {
    grid-template-columns: 1fr;
    gap: 18px;
  }
}
.fee-card-combined {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  min-width: 0;
  min-height: 140px;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(60, 72, 100, 0.10);
  padding: 28px 24px 24px 24px;
  background: #2563eb;
  color: #ffffff;
}
.fee-card-blue {
  background: linear-gradient(135deg, #2563eb 80%, #60a5fa 100%);
  color: #ffffff;
}
.fee-card-purple {
  background: linear-gradient(135deg, #a21caf 80%, #c084fc 100%);
  color: #ffffff;
}
.fee-card-yellow {
  background: linear-gradient(135deg, #fbbf24 80%, #fde68a 100%);
  color: #ffffff;
}
.fee-combined-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}
@media (max-width: 600px) {
  .fee-combined-row {
    flex-direction: column;
    gap: 12px;
  }
}
.fee-combined-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.fee-card-standalone {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-width: 0;
  min-height: 140px;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(60, 72, 100, 0.10);
  padding: 28px 24px 24px 24px;
}

.fee-cards-modern {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 32px;
  width: 100%;
  margin: 0 auto;
}
@media (max-width: 900px) {
  .fee-cards-modern {
    grid-template-columns: 1fr;
    gap: 18px;
  }
}
.modern-fee-card {
  position: relative;
  border-radius: 22px;
  background: rgba(255,255,255,0.18);
  box-shadow: 0 8px 32px 0 rgba(60, 72, 100, 0.13), 0 1.5px 8px 0 rgba(60, 72, 100, 0.08);
  backdrop-filter: blur(14px) saturate(1.2);
  -webkit-backdrop-filter: blur(14px) saturate(1.2);
  padding: 36px 32px 32px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  min-width: 0;
  min-height: 170px;
  overflow: visible;
  transition: box-shadow 0.22s, transform 0.22s, background 0.22s;
  cursor: pointer;
}
.modern-fee-card:hover {
  box-shadow: 0 16px 48px 0 rgba(60, 72, 100, 0.18), 0 2px 12px 0 rgba(60, 72, 100, 0.10);
  transform: translateY(-6px) scale(1.025);
  background: rgba(255,255,255,0.28);
}
.modern-blue {
  background: linear-gradient(135deg, rgba(37,99,235,0.92) 70%, rgba(96,165,250,0.85) 100%);
  color: #ffffff;
}
.modern-purple {
  background: linear-gradient(135deg, rgba(162,28,175,0.92) 70%, rgba(192,132,252,0.85) 100%);
  color: #ffffff;
}
.modern-yellow {
  background: linear-gradient(135deg, rgba(251,191,36,0.92) 70%, rgba(253,230,138,0.85) 100%);
  color: #ffffff;
}
.modern-card-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 32px;
}
.modern-card-content.single {
  justify-content: flex-start;
}
@media (max-width: 600px) {
  .modern-card-content {
    flex-direction: column;
    gap: 18px;
    align-items: flex-start;
  }
}
.modern-card-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.modern-card-label {
  font-size: 0.98rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #f3f4f6;
  margin-bottom: 6px;
  opacity: 0.92;
}
.modern-card-value {
  font-size: 2.1rem;
  font-weight: 900;
  letter-spacing: 0.5px;
  color: #ffffff;
  line-height: 1.1;
  text-shadow: 0 2px 8px rgba(60,72,100,0.10);
}
.modern-card-glow {
  position: absolute;
  right: -40px;
  bottom: -40px;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 80%);
  z-index: 0;
  pointer-events: none;
}

/* Modern Fee Summary Cards Redesign */
.modern-fee-summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto 20px auto;
  padding: 10px 0 0 0;
}
.modern-fee-summary-card {
  position: relative;
  border-radius: 16px;
  background: rgba(255,255,255,0.18);
  box-shadow: 0 8px 32px 0 rgba(60, 72, 100, 0.13), 0 1.5px 8px 0 rgba(60, 72, 100, 0.08);
  backdrop-filter: blur(14px) saturate(1.2);
  -webkit-backdrop-filter: blur(14px) saturate(1.2);
  padding: 18px 14px 14px 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  min-width: 0;
  min-height: 80px;
  overflow: visible;
  transition: box-shadow 0.22s, transform 0.22s, background 0.22s;
  cursor: pointer;
  animation: fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
.modern-fee-summary-card:hover {
  box-shadow: 0 16px 48px 0 rgba(60, 72, 100, 0.18), 0 2px 12px 0 rgba(60, 72, 100, 0.10);
  transform: translateY(-8px) scale(1.03);
  background: rgba(255,255,255,0.28);
}
.modern-blue {
  background: linear-gradient(135deg, rgba(37,99,235,0.96) 70%, rgba(96,165,250,0.90) 100%);
  color: #ffffff;
}
.modern-purple {
  background: linear-gradient(135deg, rgba(162,28,175,0.96) 70%, rgba(192,132,252,0.90) 100%);
  color: #ffffff;
}
.modern-yellow {
  background: linear-gradient(135deg, rgba(251,191,36,0.96) 70%, rgba(253,230,138,0.90) 100%);
  color: #ffffff;
}
.modern-fee-summary-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 36px;
}
.modern-fee-summary-content.single {
  justify-content: flex-start;
}
@media (max-width: 600px) {
  .modern-fee-summary-content {
    flex-direction: column;
    gap: 18px;
    align-items: flex-start;
  }
}
.modern-fee-summary-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.modern-fee-summary-label {
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: #f3f4f6;
  margin-bottom: 8px;
  opacity: 0.93;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
}
.modern-fee-summary-value {
  font-size: 1.4rem;
  font-weight: 900;
  letter-spacing: 0.5px;
  color: #ffffff;
  line-height: 1.1;
  text-shadow: 0 2px 8px rgba(60,72,100,0.10);
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
}
.modern-fee-summary-glow {
  position: absolute;
  right: -40px;
  bottom: -40px;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 80%);
  z-index: 0;
  pointer-events: none;
  filter: blur(2px);
}
@media (max-width: 900px) {
  .modern-fee-summary-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 10px 0 0 0;
  }
  .modern-fee-summary-card {
    padding: 28px 16px 24px 16px;
    min-height: 120px;
  }
  .modern-fee-summary-value {
    font-size: 1.5rem;
  }
}
</style> 