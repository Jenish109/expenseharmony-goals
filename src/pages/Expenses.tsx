
import { useState } from 'react';
import { sampleExpenses, ExpenseCategory, categoryInfo } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { TransactionList } from "@/components/TransactionList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, ArrowUpDown, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Define a custom type that can be either an ExpenseCategory or 'all'
type CategoryFilter = ExpenseCategory | 'all';

const Expenses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [showAddExpenseDialog, setShowAddExpenseDialog] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'food' as ExpenseCategory,
    date: new Date().toISOString().split('T')[0]
  });
  
  // Filter and sort expenses
  const filteredExpenses = sampleExpenses
    .filter(expense => {
      const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  // Get all categories including 'all'
  const categories: CategoryFilter[] = ['all', 'food', 'transport', 'housing', 'entertainment', 'utilities', 'shopping', 'health', 'other'];

  const handleAddExpense = () => {
    // In a real app we would add to the database
    // For this demo, we'll just show a toast notification
    toast.success("Expense added successfully", {
      description: `Added ${newExpense.description} for $${newExpense.amount}`
    });
    
    // Close the dialog and reset form
    setShowAddExpenseDialog(false);
    setNewExpense({
      description: '',
      amount: '',
      category: 'food',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 relative">
      <div className="flex flex-col md:flex-row">
        <Navbar />
        
        <main className="flex-1 px-4 pt-6 pb-24 md:pb-6 md:pl-0 md:pr-6">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
              <p className="text-muted-foreground mt-1">Track and manage your spending</p>
            </header>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 animate-fade-in">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search expenses..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="w-10 h-10"
                  title={sortOrder === 'asc' ? "Sort Newest First" : "Sort Oldest First"}
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
                
                <div className="relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="w-10 h-10"
                      >
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => setSelectedCategory('all')}>
                          All Categories
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {categories.filter(cat => cat !== 'all').map(category => (
                          <DropdownMenuItem 
                            key={category} 
                            onClick={() => setSelectedCategory(category)}
                          >
                            {categoryInfo[category as ExpenseCategory].label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <Button className="gap-1" onClick={() => setShowAddExpenseDialog(true)}>
                <Plus className="h-4 w-4" />
                Add Expense
              </Button>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2 mb-6 animate-fade-in">
              {categories.map((category) => (
                <button
                  key={category}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm transition-colors",
                    selectedCategory === category 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'All' : categoryInfo[category as ExpenseCategory].label}
                </button>
              ))}
            </div>

            {/* Expenses List */}
            <div className="animate-fade-in">
              <Card className="border overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold">All Expenses</CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {filteredExpenses.length} {filteredExpenses.length === 1 ? 'expense' : 'expenses'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <TransactionList expenses={filteredExpenses} title="" />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Add Expense Dialog */}
      <Dialog open={showAddExpenseDialog} onOpenChange={setShowAddExpenseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Expense</DialogTitle>
            <DialogDescription>
              Enter the details of your new expense
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Input
                id="description"
                placeholder="What did you spend on?"
                value={newExpense.description}
                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">Amount</label>
              <Input
                id="amount"
                placeholder="0.00"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                type="number"
                min="0"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">Category</label>
              <select
                id="category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newExpense.category}
                onChange={(e) => setNewExpense({...newExpense, category: e.target.value as ExpenseCategory})}
              >
                {categories.filter(cat => cat !== 'all').map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All' : categoryInfo[category as ExpenseCategory].label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">Date</label>
              <Input
                id="date"
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowAddExpenseDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddExpense}
              disabled={!newExpense.description || !newExpense.amount}
            >
              Add Expense
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Expenses;
