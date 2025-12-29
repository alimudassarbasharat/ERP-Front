import { ref } from 'vue'
import {
  Wallet,
  CheckCircle2,
  Users,
  UserX,
  UserCheck,
  CreditCard,
  BookOpen,
  School
} from 'lucide-vue-next'

export function useDashboardStats() {
  const statisticsCards = ref([
    {
      label: 'Total Fee',
      value: 1850000,
      prefix: '₹',
      suffix: '',
      trend: 'up',
      change: '12% from last month',
      icon: Wallet,
      iconBg: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600',
      gradient: 'bg-gradient-to-r from-blue-500 to-indigo-600',
      particleBg: 'bg-blue-400',
      hoverGradient: 'bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10',
      details: 'Total fee collection target for this month'
    },
    {
      label: 'Received Fee',
      value: 1520000,
      prefix: '₹',
      suffix: '',
      trend: 'up',
      change: '8% from last month',
      icon: CheckCircle2,
      iconBg: 'bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600',
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-600',
      particleBg: 'bg-green-400',
      hoverGradient: 'bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10',
      details: 'Successfully collected fees this month'
    },
    {
      label: 'Present Students',
      value: 487,
      prefix: '',
      suffix: '',
      trend: 'up',
      change: '5% from last month',
      icon: Users,
      iconBg: 'bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600',
      gradient: 'bg-gradient-to-r from-amber-500 to-orange-600',
      particleBg: 'bg-amber-400',
      hoverGradient: 'bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10',
      details: 'Students present in school today'
    },
    {
      label: 'Absent Students',
      value: 42,
      prefix: '',
      suffix: '',
      trend: 'down',
      change: '3% from last month',
      icon: UserX,
      iconBg: 'bg-gradient-to-br from-pink-500 via-rose-500 to-red-600',
      gradient: 'bg-gradient-to-r from-pink-500 to-rose-600',
      particleBg: 'bg-pink-400',
      hoverGradient: 'bg-gradient-to-br from-pink-500/10 via-transparent to-rose-500/10',
      details: 'Students absent today'
    }
  ])
  
  const quickStats = ref([
    {
      label: 'New Students',
      value: 24,
      originalValue: 24,
      change: '+12%',
      percentage: 85,
      originalPercentage: 85,
      bgClass: 'from-blue-50 to-indigo-50 border-blue-100',
      textClass: 'text-blue-600',
      valueClass: 'text-blue-800',
      changeClass: 'text-green-600',
      progressClass: 'bg-blue-500',
      iconComponent: UserCheck
    },
    {
      label: 'Pending Fees',
      value: 18,
      originalValue: 18,
      change: '-5%',
      percentage: 30,
      originalPercentage: 30,
      bgClass: 'from-rose-50 to-pink-50 border-rose-100',
      textClass: 'text-rose-600',
      valueClass: 'text-rose-800',
      changeClass: 'text-red-600',
      progressClass: 'bg-rose-500',
      iconComponent: CreditCard
    },
    {
      label: 'Subjects',
      value: 12,
      originalValue: 12,
      change: '±0%',
      percentage: 100,
      originalPercentage: 100,
      bgClass: 'from-purple-50 to-violet-50 border-purple-100',
      textClass: 'text-purple-600',
      valueClass: 'text-purple-800',
      changeClass: 'text-purple-600',
      progressClass: 'bg-purple-500',
      iconComponent: BookOpen
    },
    {
      label: 'Classes',
      value: 8,
      originalValue: 8,
      change: '±0%',
      percentage: 100,
      originalPercentage: 100,
      bgClass: 'from-gray-50 to-slate-50 border-gray-200',
      textClass: 'text-gray-600',
      valueClass: 'text-gray-900',
      changeClass: 'text-gray-600',
      progressClass: 'bg-gray-500',
      iconComponent: School
    }
  ])
  
  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-IN').format(number)
  }
  
  return {
    statisticsCards,
    quickStats,
    formatNumber
  }
}

