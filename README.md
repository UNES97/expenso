# Expenso - Modern Expense Tracker

A beautiful, modern expense tracking application built with Vue 3, Vite, and Tailwind CSS.

Expenso is a simple and intuitive expense tracker that helps you record, organize, and understand your spending so you can manage your money with confidence.

## Features

- **Dashboard**: Overview of total expenses, income, and balance with interactive charts
- **Add Transactions**: Clean form interface to add expenses and income with Flatpickr date picker
- **Month Navigation**: Navigate through your transactions month by month with an intuitive interface
- **Transactions List**: View, search, filter, and manage all transactions
- **Settings**: Customize your profile, currency, theme (light/dark), and preferences
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Dark Mode**: Toggle between light and dark themes with full Flatpickr support
- **Modern UI**: Clean design with smooth animations, transitions, and Heroicons
- **Plus Jakarta Sans**: Modern Google font for a professional look

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Vue Router** - Official router for Vue.js
- **Chart.js** - Simple yet flexible JavaScript charting
- **Vue ChartJS** - Vue wrapper for Chart.js
- **Flatpickr** - Lightweight and powerful date picker
- **Heroicons** - Beautiful hand-crafted SVG icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
expenso/
├── src/
│   ├── assets/
│   │   └── style.css          # Global styles and Tailwind imports
│   ├── components/
│   │   ├── Dashboard.vue      # Main dashboard with charts and stats
│   │   ├── AddTransaction.vue # Form to add new transactions
│   │   ├── TransactionsList.vue # List view with filters
│   │   └── Settings.vue       # User settings and preferences
│   ├── composables/
│   │   └── useTransactions.js # Transaction state management
│   ├── router/
│   │   └── index.js          # Vue Router configuration
│   ├── App.vue               # Main app component
│   └── main.js              # Application entry point
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Features Overview

### Dashboard
- Total income, expenses, and balance cards
- Spending trend line chart
- Category breakdown doughnut chart
- Category summary with progress bars
- Recent transactions preview

### Add Transaction
- Toggle between income and expense
- Amount input with currency symbol
- Category selection with icons
- Flatpickr date picker with dark mode support
- Optional notes field
- Success notifications

### Transactions List
- Month-by-month navigation (defaults to current month)
- Navigate forward and backward through months
- Search functionality
- Filter by type (income/expense)
- Filter by category
- Pagination
- Delete transactions with confirmation
- Summary statistics per month

### Settings
- User profile management
- Dark/light theme toggle
- Currency selection (USD, EUR, GBP, JPY, CAD, AUD, INR)
- Notification preferences
- Monthly budget limit
- Data export/backup options

## Customization

### Colors

The app uses a custom color palette defined in `tailwind.config.js`. You can customize the primary colors by editing the theme configuration.

### Adding Categories

Edit the category options in the components and update the icon mappings in the `getCategoryIcon` functions.

## License

MIT License - feel free to use this project for personal or commercial purposes.
