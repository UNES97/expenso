<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
      <p class="text-gray-600 dark:text-gray-400 mt-1">Overview of your financial activity</p>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Total Income -->
      <div class="card">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <p class="text-sm text-gray-500 dark:text-gray-400">Total Income</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white mt-2">
              {{ formatCurrency(totalIncome) }}
            </p>
          </div>
          <BanknotesIcon class="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </div>
      </div>

      <!-- Total Expenses -->
      <div class="card">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <p class="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white mt-2">
              {{ formatCurrency(totalExpenses) }}
            </p>
          </div>
          <ArrowDownCircleIcon class="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </div>
      </div>

      <!-- Balance -->
      <div class="card">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <p class="text-sm text-gray-500 dark:text-gray-400">Balance</p>
            <p class="text-2xl font-semibold mt-2"
               :class="balance >= 0 ? 'text-gray-900 dark:text-white' : 'text-danger'">
              {{ formatCurrency(balance) }}
            </p>
          </div>
          <WalletIcon class="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Spending Trend Chart -->
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Spending Trend</h3>
        <div class="h-64">
          <Line :data="chartData" :options="chartOptions" v-if="chartData" />
        </div>
      </div>

      <!-- Category Breakdown -->
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Category Breakdown</h3>
        <div class="h-64">
          <Doughnut :data="doughnutData" :options="doughnutOptions" v-if="doughnutData" />
        </div>
      </div>
    </div>

    <!-- Category Summary Cards -->
    <div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Expenses by Category</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(amount, category) in categoryTotals"
          :key="category"
          class="card"
        >
          <div class="flex items-center justify-between mb-2">
            <component :is="getCategoryIcon(category)" class="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <span class="text-xs text-gray-500 dark:text-gray-400">
              {{ getPercentage(amount) }}%
            </span>
          </div>
          <h4 class="text-sm text-gray-600 dark:text-gray-400">{{ category }}</h4>
          <p class="text-lg font-semibold text-gray-900 dark:text-white mt-1">
            {{ formatCurrency(amount) }}
          </p>
          <div class="mt-3 w-full bg-gray-100 dark:bg-gray-800 h-1.5">
            <div
              class="bg-gray-900 dark:bg-gray-100 h-1.5"
              :style="{ width: getPercentage(amount) + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Transactions -->
    <div class="card">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
        <router-link
          to="/transactions"
          class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium flex items-center space-x-1"
        >
          <span>View All</span>
          <ArrowRightIcon class="w-4 h-4" />
        </router-link>
      </div>
      <div class="space-y-1">
        <div
          v-for="transaction in recentTransactions"
          :key="transaction.id"
          class="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
        >
          <div class="flex items-center space-x-3">
            <component :is="getCategoryIcon(transaction.category)"
                       class="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ transaction.category }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(transaction.date) }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">
              {{ transaction.type === 'income' ? '+' : '-' }}{{ formatCurrency(transaction.amount) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Line, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import {
  BanknotesIcon,
  ArrowDownCircleIcon,
  WalletIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowRightIcon,
  ShoppingBagIcon,
  TruckIcon,
  DocumentTextIcon,
  FilmIcon,
  ShoppingCartIcon,
  HeartIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  EllipsisHorizontalCircleIcon
} from '@heroicons/vue/24/outline'
import { useTransactions } from '../composables/useTransactions'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const { transactions, totalIncome, totalExpenses, balance, categoryTotals } = useTransactions()

const recentTransactions = computed(() => {
  return transactions.value.slice(0, 5)
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const getCategoryIcon = (category) => {
  const icons = {
    'Food': ShoppingBagIcon,
    'Transport': TruckIcon,
    'Bills': DocumentTextIcon,
    'Entertainment': FilmIcon,
    'Shopping': ShoppingCartIcon,
    'Health': HeartIcon,
    'Education': AcademicCapIcon,
    'Salary': BriefcaseIcon,
    'Other': EllipsisHorizontalCircleIcon
  }
  return icons[category] || EllipsisHorizontalCircleIcon
}

const getPercentage = (amount) => {
  if (totalExpenses.value === 0) return 0
  return Math.round((amount / totalExpenses.value) * 100)
}

// Chart data
const chartData = computed(() => ({
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Expenses',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      tension: 0.4,
      fill: true
    },
    {
      label: 'Income',
      data: [28, 48, 40, 19, 86, 27, 90],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
      fill: true
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        font: {
          family: 'Plus Jakarta Sans, system-ui, sans-serif'
        }
      }
    },
    tooltip: {
      bodyFont: {
        family: 'Plus Jakarta Sans, system-ui, sans-serif'
      },
      titleFont: {
        family: 'Plus Jakarta Sans, system-ui, sans-serif'
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      },
      ticks: {
        font: {
          family: 'Plus Jakarta Sans, system-ui, sans-serif'
        }
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          family: 'Plus Jakarta Sans, system-ui, sans-serif'
        }
      }
    }
  }
}

const doughnutData = computed(() => {
  const labels = Object.keys(categoryTotals.value)
  const data = Object.values(categoryTotals.value)
  const colors = [
    '#0ea5e9',
    '#8b5cf6',
    '#ec4899',
    '#f59e0b',
    '#10b981',
    '#6366f1',
    '#f43f5e'
  ]

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors.slice(0, labels.length),
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  }
})

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        font: {
          family: 'Plus Jakarta Sans, system-ui, sans-serif'
        }
      }
    },
    tooltip: {
      bodyFont: {
        family: 'Plus Jakarta Sans, system-ui, sans-serif'
      },
      titleFont: {
        family: 'Plus Jakarta Sans, system-ui, sans-serif'
      }
    }
  }
}
</script>
