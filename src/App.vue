<template>
  <div class="min-h-screen bg-white dark:bg-gray-950">
    <!-- Navigation -->
    <nav class="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <h1 class="text-xl font-bold text-gray-900 dark:text-white">
            Expenso
          </h1>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-8">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="flex items-center gap-2 text-sm font-medium transition-colors"
              :class="isActive(item.path)
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'"
            >
              <component :is="item.icon" class="w-5 h-5" />
              <span>{{ item.name }}</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div class="md:hidden border-t border-gray-200 dark:border-gray-800">
        <div class="grid grid-cols-4">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="flex flex-col items-center justify-center py-3 text-xs font-medium transition-colors"
            :class="isActive(item.path)
              ? 'text-gray-900 dark:text-white'
              : 'text-gray-500 dark:text-gray-400'"
          >
            <component :is="item.icon" class="w-6 h-6 mb-1" />
            <span>{{ item.name }}</span>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  ChartBarIcon,
  PlusCircleIcon,
  DocumentTextIcon,
  Cog6ToothIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()

const navItems = [
  { name: 'Dashboard', path: '/', icon: ChartBarIcon },
  { name: 'Add', path: '/add', icon: PlusCircleIcon },
  { name: 'Transactions', path: '/transactions', icon: DocumentTextIcon },
  { name: 'Settings', path: '/settings', icon: Cog6ToothIcon }
]

const isActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
