<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Settings</h2>
      <p class="text-gray-600 dark:text-gray-400 mt-1">Manage your profile and preferences</p>
    </div>

    <!-- Profile Section -->
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Profile Information</h3>
        <button
          @click="editMode = !editMode"
          class="text-primary-600 dark:text-primary-400 hover:underline font-medium text-sm flex items-center space-x-1"
        >
          <PencilSquareIcon v-if="!editMode" class="w-4 h-4" />
          <XMarkIcon v-else class="w-4 h-4" />
          <span>{{ editMode ? 'Cancel' : 'Edit' }}</span>
        </button>
      </div>

      <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
        <div class="relative">
          <div class="w-24 h-24 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center border-2 border-gray-900 dark:border-white">
            <span class="text-4xl font-bold text-white dark:text-gray-900">{{ userInitials }}</span>
          </div>
          <button
            v-if="editMode"
            class="absolute bottom-0 right-0 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            title="Change avatar"
          >
            <CameraIcon class="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div class="flex-1 w-full">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="label">Full Name</label>
              <input
                v-model="profile.name"
                :disabled="!editMode"
                type="text"
                class="input-field"
                :class="{ 'opacity-60': !editMode }"
              />
            </div>
            <div>
              <label class="label">Email</label>
              <input
                v-model="profile.email"
                :disabled="!editMode"
                type="email"
                class="input-field"
                :class="{ 'opacity-60': !editMode }"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="editMode" class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button @click="editMode = false" class="btn-secondary">Cancel</button>
        <button @click="saveProfile" class="btn-primary flex items-center space-x-2">
          <CheckIcon class="w-5 h-5" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>

    <!-- Preferences Section -->
    <div class="card">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Preferences</h3>

      <div class="space-y-4">
        <!-- Theme Toggle -->
        <div class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-md">
          <div class="flex items-center space-x-4">
            <SunIcon v-if="!isDarkMode" class="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <MoonIcon v-else class="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <div>
              <p class="font-semibold text-gray-900 dark:text-white">Theme</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ isDarkMode ? 'Dark mode' : 'Light mode' }}
              </p>
            </div>
          </div>
          <button
            @click="toggleTheme"
            class="relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none"
            :class="isDarkMode ? 'bg-gray-900 dark:bg-white' : 'bg-gray-200 dark:bg-gray-800'"
          >
            <span
              class="inline-block h-6 w-6 transform rounded-full border-2 transition-transform"
              :class="isDarkMode ? 'translate-x-7 bg-white dark:bg-gray-900 border-white dark:border-gray-900' : 'translate-x-1 bg-gray-900 dark:bg-white border-gray-900 dark:border-white'"
            />
          </button>
        </div>

        <!-- Currency Selection -->
        <div class="p-4 border border-gray-200 dark:border-gray-800 rounded-md">
          <div class="flex items-center space-x-4 mb-3">
            <CurrencyDollarIcon class="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <label for="currency" class="font-semibold text-gray-900 dark:text-white">Currency</label>
          </div>
          <select
            id="currency"
            v-model="settings.currency"
            class="input-field"
          >
            <option value="USD">USD - US Dollar ($)</option>
            <option value="EUR">EUR - Euro (€)</option>
            <option value="GBP">GBP - British Pound (£)</option>
            <option value="JPY">JPY - Japanese Yen (¥)</option>
            <option value="CAD">CAD - Canadian Dollar (C$)</option>
            <option value="AUD">AUD - Australian Dollar (A$)</option>
            <option value="INR">INR - Indian Rupee (₹)</option>
          </select>
        </div>

        <!-- Notifications -->
        <div class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-md">
          <div class="flex items-center space-x-4">
            <BellIcon class="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <div>
              <p class="font-semibold text-gray-900 dark:text-white">Notifications</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Get notified about your expenses
              </p>
            </div>
          </div>
          <button
            @click="settings.notifications = !settings.notifications"
            class="relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none"
            :class="settings.notifications ? 'bg-gray-900 dark:bg-white' : 'bg-gray-200 dark:bg-gray-800'"
          >
            <span
              class="inline-block h-6 w-6 transform rounded-full border-2 transition-transform"
              :class="settings.notifications ? 'translate-x-7 bg-white dark:bg-gray-900 border-white dark:border-gray-900' : 'translate-x-1 bg-gray-900 dark:bg-white border-gray-900 dark:border-white'"
            />
          </button>
        </div>

        <!-- Budget Alert -->
        <div class="p-4 border border-gray-200 dark:border-gray-800 rounded-md">
          <div class="flex items-center space-x-4 mb-3">
            <ChartPieIcon class="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <div class="flex-1">
              <label for="budget" class="font-semibold text-gray-900 dark:text-white block">
                Monthly Budget Limit
              </label>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Get alerts when you approach this limit
              </p>
            </div>
          </div>
          <div class="relative">
            <CurrencyDollarIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
            <input
              id="budget"
              v-model.number="settings.budgetLimit"
              type="number"
              min="0"
              step="100"
              class="input-field pl-12"
              placeholder="e.g., 2000"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-end mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button @click="saveSettings" class="btn-primary flex items-center space-x-2">
          <CheckIcon class="w-5 h-5" />
          <span>Save Preferences</span>
        </button>
      </div>
    </div>

    <!-- Data Management -->
    <div class="card">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Data Management</h3>

      <div class="space-y-3">
        <button
          class="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
        >
          <div class="flex items-center space-x-4">
            <ArrowDownTrayIcon class="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <div class="text-left">
              <p class="font-semibold text-gray-900 dark:text-white">Export Data</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Download your transactions as CSV</p>
            </div>
          </div>
          <ChevronRightIcon class="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </button>

        <button
          class="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
        >
          <div class="flex items-center space-x-4">
            <ArrowPathIcon class="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <div class="text-left">
              <p class="font-semibold text-gray-900 dark:text-white">Backup Data</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Create a backup of all your data</p>
            </div>
          </div>
          <ChevronRightIcon class="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </button>

        <button
          @click="showDeleteConfirm = true"
          class="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
        >
          <div class="flex items-center space-x-4">
            <TrashIcon class="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <div class="text-left">
              <p class="font-semibold text-gray-900 dark:text-white">Delete All Data</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Permanently remove all transactions</p>
            </div>
          </div>
          <ChevronRightIcon class="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </button>
      </div>
    </div>

    <!-- App Info -->
    <div class="card text-center">
      <div class="w-16 h-16 bg-gray-900 dark:bg-white rounded-md flex items-center justify-center mx-auto mb-4">
        <span class="text-white dark:text-gray-900 font-bold text-3xl">E</span>
      </div>
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Expenso
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mb-2">Version 1.0.0</p>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Track your expenses, manage your budget, and achieve your financial goals.
      </p>
    </div>

    <!-- Delete Confirmation Modal -->
    <transition name="modal">
      <div
        v-if="showDeleteConfirm"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="showDeleteConfirm = false"
      >
        <div class="card max-w-md w-full">
          <div class="text-center mb-6">
            <ExclamationTriangleIcon class="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete All Data?</h3>
            <p class="text-gray-600 dark:text-gray-400">
              This will permanently delete all your transactions and cannot be undone. Are you absolutely sure?
            </p>
          </div>
          <div class="flex space-x-3">
            <button
              @click="handleDeleteAllData"
              class="flex-1 px-6 py-2.5 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-md transition-colors"
            >
              Yes, Delete Everything
            </button>
            <button
              @click="showDeleteConfirm = false"
              class="flex-1 btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Success Toast -->
    <transition name="toast">
      <div
        v-if="showToast"
        class="fixed bottom-4 right-4 card border-l-2 border-gray-900 dark:border-white"
      >
        <div class="flex items-center space-x-3">
          <CheckCircleIcon class="w-5 h-5 text-gray-900 dark:text-white" />
          <p class="font-medium text-gray-900 dark:text-white">{{ toastMessage }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import {
  PencilSquareIcon,
  XMarkIcon,
  CameraIcon,
  CheckIcon,
  SunIcon,
  MoonIcon,
  CurrencyDollarIcon,
  BellIcon,
  ChartPieIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  TrashIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'

const editMode = ref(false)
const showDeleteConfirm = ref(false)
const showToast = ref(false)
const toastMessage = ref('')

const profile = reactive({
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: null
})

const settings = reactive({
  currency: 'USD',
  notifications: true,
  budgetLimit: 2000,
  theme: 'light'
})

const isDarkMode = ref(false)

const userInitials = computed(() => {
  return profile.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  const html = document.documentElement
  if (isDarkMode.value) {
    html.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    html.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
  showToastMessage(`Switched to ${isDarkMode.value ? 'dark' : 'light'} mode`)
}

const saveProfile = () => {
  editMode.value = false
  showToastMessage('Profile updated successfully')
}

const saveSettings = () => {
  showToastMessage('Settings saved successfully')
}

const handleDeleteAllData = () => {
  showDeleteConfirm.value = false
  showToastMessage('All data has been deleted')
}

const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Initialize theme on mount
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
}

initTheme()
</script>

<style scoped>
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

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
