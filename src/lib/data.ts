
// Sample data for the budgeting app
export type ExpenseCategory = 
  | 'food' 
  | 'transport' 
  | 'housing' 
  | 'entertainment' 
  | 'utilities' 
  | 'shopping' 
  | 'health'
  | 'other';

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: string;
}

export interface Budget {
  id: string;
  category: ExpenseCategory;
  amount: number;
  spent: number;
}

export interface MonthlySpending {
  month: string;
  amount: number;
}

// Category display information
export const categoryInfo = {
  food: {
    label: 'Food & Dining',
    color: '#4CAF50',
    icon: 'dollar-sign'
  },
  transport: {
    label: 'Transportation',
    color: '#2196F3',
    icon: 'dollar-sign'
  },
  housing: {
    label: 'Housing',
    color: '#9C27B0',
    icon: 'dollar-sign'
  },
  entertainment: {
    label: 'Entertainment',
    color: '#FF9800',
    icon: 'dollar-sign'
  },
  utilities: {
    label: 'Utilities',
    color: '#607D8B',
    icon: 'dollar-sign'
  },
  shopping: {
    label: 'Shopping',
    color: '#E91E63',
    icon: 'dollar-sign'
  },
  health: {
    label: 'Health & Medical',
    color: '#00BCD4',
    icon: 'dollar-sign'
  },
  other: {
    label: 'Other',
    color: '#9E9E9E',
    icon: 'dollar-sign'
  }
};

// Sample expenses
export const sampleExpenses: Expense[] = [
  {
    id: 'exp1',
    amount: 45.67,
    category: 'food',
    description: 'Grocery shopping',
    date: '2023-05-01'
  },
  {
    id: 'exp2',
    amount: 25.00,
    category: 'transport',
    description: 'Uber ride',
    date: '2023-05-02'
  },
  {
    id: 'exp3',
    amount: 1200.00,
    category: 'housing',
    description: 'Monthly rent',
    date: '2023-05-03'
  },
  {
    id: 'exp4',
    amount: 15.99,
    category: 'entertainment',
    description: 'Movie tickets',
    date: '2023-05-04'
  },
  {
    id: 'exp5',
    amount: 89.50,
    category: 'utilities',
    description: 'Electricity bill',
    date: '2023-05-05'
  },
  {
    id: 'exp6',
    amount: 120.45,
    category: 'shopping',
    description: 'New clothes',
    date: '2023-05-06'
  },
  {
    id: 'exp7',
    amount: 65.00,
    category: 'health',
    description: 'Medication',
    date: '2023-05-07'
  },
  {
    id: 'exp8',
    amount: 32.40,
    category: 'other',
    description: 'Office supplies',
    date: '2023-05-08'
  },
  {
    id: 'exp9',
    amount: 28.75,
    category: 'food',
    description: 'Restaurant dinner',
    date: '2023-05-09'
  },
  {
    id: 'exp10',
    amount: 35.00,
    category: 'transport',
    description: 'Gas',
    date: '2023-05-10'
  }
];

// Sample budgets
export const sampleBudgets: Budget[] = [
  {
    id: 'budget1',
    category: 'food',
    amount: 500,
    spent: 74.42
  },
  {
    id: 'budget2',
    category: 'transport',
    amount: 200,
    spent: 60.00
  },
  {
    id: 'budget3',
    category: 'housing',
    amount: 1500,
    spent: 1200.00
  },
  {
    id: 'budget4',
    category: 'entertainment',
    amount: 100,
    spent: 15.99
  },
  {
    id: 'budget5',
    category: 'utilities',
    amount: 300,
    spent: 89.50
  },
  {
    id: 'budget6',
    category: 'shopping',
    amount: 200,
    spent: 120.45
  },
  {
    id: 'budget7',
    category: 'health',
    amount: 150,
    spent: 65.00
  },
  {
    id: 'budget8',
    category: 'other',
    amount: 100,
    spent: 32.40
  }
];

// Monthly spending
export const monthlySpending: MonthlySpending[] = [
  { month: 'Jan', amount: 1850 },
  { month: 'Feb', amount: 1750 },
  { month: 'Mar', amount: 2100 },
  { month: 'Apr', amount: 1950 },
  { month: 'May', amount: 1657.76 },
  { month: 'Jun', amount: 0 },
  { month: 'Jul', amount: 0 },
  { month: 'Aug', amount: 0 },
  { month: 'Sep', amount: 0 },
  { month: 'Oct', amount: 0 },
  { month: 'Nov', amount: 0 },
  { month: 'Dec', amount: 0 },
];

// Category spending
export const categorySpending = [
  { name: 'Food & Dining', value: 74.42 },
  { name: 'Transportation', value: 60.00 },
  { name: 'Housing', value: 1200.00 },
  { name: 'Entertainment', value: 15.99 },
  { name: 'Utilities', value: 89.50 },
  { name: 'Shopping', value: 120.45 },
  { name: 'Health & Medical', value: 65.00 },
  { name: 'Other', value: 32.40 }
];
