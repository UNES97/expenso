import { ref, computed } from 'vue'

const transactions = ref([
  // January 2026
  {
    id: 1,
    type: 'expense',
    amount: 45.50,
    category: 'Food',
    date: '2026-01-15',
    notes: 'Grocery shopping'
  },
  {
    id: 2,
    type: 'income',
    amount: 2500.00,
    category: 'Salary',
    date: '2026-01-01',
    notes: 'Monthly salary'
  },
  {
    id: 3,
    type: 'expense',
    amount: 120.00,
    category: 'Transport',
    date: '2026-01-10',
    notes: 'Gas and maintenance'
  },
  {
    id: 4,
    type: 'expense',
    amount: 85.00,
    category: 'Bills',
    date: '2026-01-05',
    notes: 'Electricity bill'
  },
  {
    id: 5,
    type: 'expense',
    amount: 32.99,
    category: 'Entertainment',
    date: '2026-01-12',
    notes: 'Movie tickets'
  },
  // December 2025
  {
    id: 6,
    type: 'expense',
    amount: 89.99,
    category: 'Food',
    date: '2025-12-20',
    notes: 'Christmas dinner'
  },
  {
    id: 7,
    type: 'income',
    amount: 2500.00,
    category: 'Salary',
    date: '2025-12-01',
    notes: 'Monthly salary'
  },
  {
    id: 8,
    type: 'expense',
    amount: 200.00,
    category: 'Shopping',
    date: '2025-12-15',
    notes: 'Christmas gifts'
  },
  {
    id: 9,
    type: 'expense',
    amount: 150.00,
    category: 'Entertainment',
    date: '2025-12-25',
    notes: 'Holiday celebration'
  },
  // November 2025
  {
    id: 10,
    type: 'expense',
    amount: 65.00,
    category: 'Food',
    date: '2025-11-18',
    notes: 'Thanksgiving groceries'
  },
  {
    id: 11,
    type: 'income',
    amount: 2500.00,
    category: 'Salary',
    date: '2025-11-01',
    notes: 'Monthly salary'
  },
  {
    id: 12,
    type: 'expense',
    amount: 95.00,
    category: 'Bills',
    date: '2025-11-05',
    notes: 'Internet bill'
  }
])

export function useTransactions() {
  const totalIncome = computed(() => {
    return transactions.value
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
  })

  const totalExpenses = computed(() => {
    return transactions.value
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  })

  const balance = computed(() => {
    return totalIncome.value - totalExpenses.value
  })

  const categoryTotals = computed(() => {
    const totals = {}
    transactions.value
      .filter(t => t.type === 'expense')
      .forEach(t => {
        totals[t.category] = (totals[t.category] || 0) + t.amount
      })
    return totals
  })

  const addTransaction = (transaction) => {
    const newTransaction = {
      id: Date.now(),
      ...transaction
    }
    transactions.value.unshift(newTransaction)
  }

  const deleteTransaction = (id) => {
    const index = transactions.value.findIndex(t => t.id === id)
    if (index !== -1) {
      transactions.value.splice(index, 1)
    }
  }

  return {
    transactions,
    totalIncome,
    totalExpenses,
    balance,
    categoryTotals,
    addTransaction,
    deleteTransaction
  }
}
