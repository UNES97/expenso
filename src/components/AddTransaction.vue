<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Add Transaction</h2>
      <p class="text-gray-600 dark:text-gray-400 mt-1">Record a new income or expense</p>
    </div>

    <!-- Form Card -->
    <div class="card">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Transaction Type -->
        <div>
          <label class="label">Transaction Type</label>
          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              @click="formData.type = 'expense'"
              class="px-6 py-3 rounded-md font-medium transition-colors border flex items-center justify-center space-x-2"
              :class="formData.type === 'expense'
                ? 'bg-gray-900 dark:bg-white border-gray-900 dark:border-white text-white dark:text-gray-900'
                : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'"
            >
              <ArrowDownCircleIcon class="w-5 h-5" />
              <span>Expense</span>
            </button>
            <button
              type="button"
              @click="formData.type = 'income'"
              class="px-6 py-3 rounded-md font-medium transition-colors border flex items-center justify-center space-x-2"
              :class="formData.type === 'income'
                ? 'bg-gray-900 dark:bg-white border-gray-900 dark:border-white text-white dark:text-gray-900'
                : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'"
            >
              <BanknotesIcon class="w-5 h-5" />
              <span>Income</span>
            </button>
          </div>
        </div>

        <!-- Amount -->
        <div>
          <label for="amount" class="label">
            Amount <span class="text-danger">*</span>
          </label>
          <div class="relative">
            <CurrencyDollarIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
            <input
              id="amount"
              v-model.number="formData.amount"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="0.00"
              class="input-field pl-12 text-lg"
            />
          </div>
        </div>

        <!-- Category -->
        <div>
          <label for="category" class="label">
            Category <span class="text-danger">*</span>
          </label>
          <div class="relative">
            <component :is="getCategoryIcon(formData.category)" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
            <select
              id="category"
              v-model="formData.category"
              required
              class="input-field pl-12 appearance-none cursor-pointer"
            >
              <option value="" disabled>Select a category</option>
              <optgroup v-if="formData.type === 'expense'" label="Expense Categories">
                <option value="Food">Food & Dining</option>
                <option value="Transport">Transport</option>
                <option value="Bills">Bills & Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Health">Health & Fitness</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </optgroup>
              <optgroup v-if="formData.type === 'income'" label="Income Categories">
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Investment">Investment</option>
                <option value="Gift">Gift</option>
                <option value="Other">Other</option>
              </optgroup>
            </select>
            <ChevronDownIcon class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-gray-500" />
          </div>
        </div>

        <!-- Date -->
        <div>
          <label for="date" class="label">
            Date <span class="text-danger">*</span>
          </label>
          <div class="relative">
            <CalendarIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400 z-10 pointer-events-none" />
            <flat-pickr
              v-model="formData.date"
              :config="dateConfig"
              class="input-field pl-12"
              placeholder="Select date"
            />
          </div>
        </div>

        <!-- Notes -->
        <div>
          <label for="notes" class="label">
            Notes (Optional)
          </label>
          <div class="relative">
            <DocumentTextIcon class="absolute left-4 top-4 w-5 h-5 text-gray-500 dark:text-gray-400" />
            <textarea
              id="notes"
              v-model="formData.notes"
              rows="3"
              placeholder="Add any additional details..."
              class="input-field pl-12 resize-none"
            ></textarea>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            class="btn-primary flex-1 flex items-center justify-center space-x-2"
          >
            <CheckIcon class="w-5 h-5" />
            <span>Add Transaction</span>
          </button>
          <button
            type="button"
            @click="resetForm"
            class="btn-secondary flex-1 flex items-center justify-center space-x-2"
          >
            <ArrowPathIcon class="w-5 h-5" />
            <span>Reset</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Success Message -->
    <transition name="slide-up">
      <div
        v-if="showSuccess"
        class="card border-l-2 border-gray-900 dark:border-white"
      >
        <div class="flex items-center space-x-3">
          <CheckCircleIcon class="w-5 h-5 text-gray-900 dark:text-white" />
          <p class="text-sm font-medium text-gray-900 dark:text-white">Transaction added successfully</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import {
  BanknotesIcon,
  ArrowDownCircleIcon,
  CurrencyDollarIcon,
  ChevronDownIcon,
  CalendarIcon,
  DocumentTextIcon,
  CheckIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ShoppingBagIcon,
  TruckIcon,
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
import { useRouter } from 'vue-router'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

const router = useRouter()
const { addTransaction, totalIncome, totalExpenses } = useTransactions()

// Register flatpickr component
const FlatPickr = flatPickr

const showSuccess = ref(false)

const formData = reactive({
  type: 'expense',
  amount: null,
  category: '',
  date: new Date().toISOString().split('T')[0],
  notes: ''
})

const dateConfig = {
  dateFormat: 'Y-m-d',
  defaultDate: new Date(),
  maxDate: new Date(),
  allowInput: true
}

// Reset category when type changes
watch(() => formData.type, () => {
  formData.category = ''
})

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
  }).format(amount || 0)
}

const handleSubmit = () => {
  if (!formData.amount || !formData.category) {
    return
  }

  addTransaction({
    type: formData.type,
    amount: parseFloat(formData.amount),
    category: formData.category,
    date: formData.date,
    notes: formData.notes
  })

  showSuccess.value = true
  setTimeout(() => {
    showSuccess.value = false
  }, 3000)

  resetForm()
}

const resetForm = () => {
  formData.amount = null
  formData.category = ''
  formData.date = new Date().toISOString().split('T')[0]
  formData.notes = ''
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
