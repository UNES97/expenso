import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import AddTransaction from '../components/AddTransaction.vue'
import TransactionsList from '../components/TransactionsList.vue'
import Settings from '../components/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/add',
    name: 'AddTransaction',
    component: AddTransaction
  },
  {
    path: '/transactions',
    name: 'TransactionsList',
    component: TransactionsList
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
