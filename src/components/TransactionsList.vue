<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Transactions</h2>
        <p class="text-gray-600 dark:text-gray-400 mt-1">View and manage all your transactions</p>
      </div>
      <router-link
        to="/add"
        class="btn-primary inline-flex items-center justify-center space-x-2"
      >
        <PlusCircleIcon class="w-5 h-5" />
        <span>Add New</span>
      </router-link>
    </div>

    <!-- Month Navigation -->
    <div class="card">
      <div class="flex items-center justify-between">
        <button
          @click="previousMonth"
          class="p-2 hover:text-gray-900 dark:hover:text-white transition-colors"
          title="Previous month"
        >
          <ChevronLeftIcon class="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        <div class="text-center">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ currentMonthDisplay }} {{ currentYearDisplay }}</h3>
        </div>

        <button
          @click="nextMonth"
          :disabled="isCurrentMonth"
          class="p-2 transition-colors"
          :class="isCurrentMonth
            ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'"
          title="Next month"
        >
          <ChevronRightIcon class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="card">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Search -->
        <div class="md:col-span-2">
          <div class="relative">
            <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search transactions..."
              class="input-field pl-10"
            />
          </div>
        </div>

        <!-- Type Filter -->
        <div>
          <select v-model="filterType" class="input-field appearance-none cursor-pointer">
            <option value="all">All Types</option>
            <option value="income">Income Only</option>
            <option value="expense">Expense Only</option>
          </select>
        </div>

        <!-- Category Filter -->
        <div>
          <select v-model="filterCategory" class="input-field appearance-none cursor-pointer">
            <option value="all">All Categories</option>
            <option v-for="category in uniqueCategories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
      </div>

      <!-- Active Filters -->
      <div v-if="hasActiveFilters" class="mt-4 flex flex-wrap gap-2">
        <span class="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
        <button
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-medium hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors flex items-center space-x-1"
        >
          <span>Search: "{{ searchQuery }}"</span>
          <XMarkIcon class="w-4 h-4" />
        </button>
        <button
          v-if="filterType !== 'all'"
          @click="filterType = 'all'"
          class="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-medium hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors flex items-center space-x-1"
        >
          <span>Type: {{ filterType }}</span>
          <XMarkIcon class="w-4 h-4" />
        </button>
        <button
          v-if="filterCategory !== 'all'"
          @click="filterCategory = 'all'"
          class="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-medium hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors flex items-center space-x-1"
        >
          <span>Category: {{ filterCategory }}</span>
          <XMarkIcon class="w-4 h-4" />
        </button>
        <button
          @click="clearFilters"
          class="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>

    <!-- Summary Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="card">
        <p class="text-sm text-gray-500 dark:text-gray-400">Transactions</p>
        <p class="text-2xl font-semibold text-gray-900 dark:text-white mt-2">{{ filteredTransactions.length }}</p>
      </div>
      <div class="card">
        <p class="text-sm text-gray-500 dark:text-gray-400">Income</p>
        <p class="text-2xl font-semibold text-gray-900 dark:text-white mt-2">{{ formatCurrency(filteredIncome) }}</p>
      </div>
      <div class="card">
        <p class="text-sm text-gray-500 dark:text-gray-400">Expenses</p>
        <p class="text-2xl font-semibold text-gray-900 dark:text-white mt-2">{{ formatCurrency(filteredExpenses) }}</p>
      </div>
    </div>

    <!-- Transactions List -->
    <div class="card">
      <div v-if="filteredTransactions.length === 0" class="text-center py-12">
        <InboxIcon class="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <p class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No transactions found</p>
        <p class="text-gray-600 dark:text-gray-400">
          {{ hasActiveFilters ? 'Try adjusting your filters' : 'Start by adding your first transaction' }}
        </p>
        <router-link
          v-if="!hasActiveFilters"
          to="/add"
          class="btn-primary inline-flex items-center space-x-2 mt-6"
        >
          <PlusCircleIcon class="w-5 h-5" />
          <span>Add Transaction</span>
        </router-link>
      </div>

      <div v-else class="space-y-0">
        <transition-group name="list">
          <div
            v-for="transaction in paginatedTransactions"
            :key="transaction.id"
            class="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0 group"
          >
            <div class="flex items-center space-x-3 flex-1">
              <component :is="getCategoryIcon(transaction.category)"
                         class="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ transaction.category }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(transaction.date) }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <p class="text-sm font-semibold text-gray-900 dark:text-white">
                {{ transaction.type === 'income' ? '+' : '-' }}{{ formatCurrency(transaction.amount) }}
              </p>
              <button
                @click="confirmDelete(transaction)"
                class="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-danger"
                title="Delete transaction"
              >
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-6 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredTransactions.length) }} of {{ filteredTransactions.length }} transactions
        </p>
        <div class="flex space-x-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-1"
            :class="currentPage === 1
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-900/50'"
          >
            <ChevronLeftIcon class="w-4 h-4" />
            <span>Previous</span>
          </button>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-1"
            :class="currentPage === totalPages
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-900/50'"
          >
            <span>Next</span>
            <ChevronRightIcon class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <transition name="modal">
      <div
        v-if="transactionToDelete"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="transactionToDelete = null"
      >
        <div class="card max-w-md w-full">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Delete Transaction?</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Are you sure you want to delete this {{ transactionToDelete.type }} of
            <span class="font-semibold">{{ formatCurrency(transactionToDelete.amount) }}</span>?
            This action cannot be undone.
          </p>
          <div class="flex space-x-3">
            <button
              @click="handleDelete"
              class="flex-1 px-6 py-2.5 bg-danger hover:bg-danger/90 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <TrashIcon class="w-5 h-5" />
              <span>Delete</span>
            </button>
            <button
              @click="transactionToDelete = null"
              class="flex-1 btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  PlusCircleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  InboxIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShoppingBagIcon,
  TruckIcon,
  DocumentTextIcon,
  FilmIcon,
  ShoppingCartIcon,
  HeartIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  ComputerDesktopIcon,
  ChartBarIcon,
  GiftIcon,
  EllipsisHorizontalCircleIcon
} from '@heroicons/vue/24/outline'
import { useTransactions } from '../composables/useTransactions'

const { transactions, deleteTransaction } = useTransactions()

const searchQuery = ref('')
const filterType = ref('all')
const filterCategory = ref('all')
const currentPage = ref(1)
const itemsPerPage = 10
const transactionToDelete = ref(null)

// Month navigation
const now = new Date()
const selectedMonth = ref(now.getMonth())
const selectedYear = ref(now.getFullYear())

const currentMonthDisplay = computed(() => {
  const date = new Date(selectedYear.value, selectedMonth.value)
  return date.toLocaleDateString('en-US', { month: 'long' })
})

const currentYearDisplay = computed(() => {
  return selectedYear.value
})

const isCurrentMonth = computed(() => {
  return selectedMonth.value === now.getMonth() && selectedYear.value === now.getFullYear()
})

const previousMonth = () => {
  if (selectedMonth.value === 0) {
    selectedMonth.value = 11
    selectedYear.value--
  } else {
    selectedMonth.value--
  }
  currentPage.value = 1
}

const nextMonth = () => {
  if (isCurrentMonth.value) return

  if (selectedMonth.value === 11) {
    selectedMonth.value = 0
    selectedYear.value++
  } else {
    selectedMonth.value++
  }
  currentPage.value = 1
}

const uniqueCategories = computed(() => {
  const categories = new Set(transactions.value.map(t => t.category))
  return Array.from(categories).sort()
})

const hasActiveFilters = computed(() => {
  return searchQuery.value || filterType.value !== 'all' || filterCategory.value !== 'all'
})

const filteredTransactions = computed(() => {
  let result = [...transactions.value]

  // Filter by selected month and year
  result = result.filter(t => {
    const transactionDate = new Date(t.date)
    return transactionDate.getMonth() === selectedMonth.value &&
           transactionDate.getFullYear() === selectedYear.value
  })

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(t =>
      t.category.toLowerCase().includes(query) ||
      t.notes.toLowerCase().includes(query) ||
      t.amount.toString().includes(query)
    )
  }

  if (filterType.value !== 'all') {
    result = result.filter(t => t.type === filterType.value)
  }

  if (filterCategory.value !== 'all') {
    result = result.filter(t => t.category === filterCategory.value)
  }

  return result
})

const filteredIncome = computed(() => {
  return filteredTransactions.value
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
})

const filteredExpenses = computed(() => {
  return filteredTransactions.value
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
})

const totalPages = computed(() => {
  return Math.ceil(filteredTransactions.value.length / itemsPerPage)
})

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredTransactions.value.slice(start, end)
})

const clearFilters = () => {
  searchQuery.value = ''
  filterType.value = 'all'
  filterCategory.value = 'all'
  currentPage.value = 1
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
    'Freelance': ComputerDesktopIcon,
    'Investment': ChartBarIcon,
    'Gift': GiftIcon,
    'Other': EllipsisHorizontalCircleIcon
  }
  return icons[category] || EllipsisHorizontalCircleIcon
}

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

const confirmDelete = (transaction) => {
  transactionToDelete.value = transaction
}

const handleDelete = () => {
  if (transactionToDelete.value) {
    deleteTransaction(transactionToDelete.value.id)
    transactionToDelete.value = null
  }
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .card,
.modal-leave-to .card {
  transform: scale(0.9);
}
</style>
