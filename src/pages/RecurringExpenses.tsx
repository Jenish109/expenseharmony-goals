
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { RecurringExpenseForm } from "@/components/RecurringExpenseForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, CalendarClock, AlertCircle, DollarSign, RefreshCw } from "lucide-react";
import { ExpenseCategory, categoryInfo } from "@/lib/data";
import { toast } from "sonner";

interface RecurringExpense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  active: boolean;
}

// Sample recurring expenses
const sampleRecurringExpenses: RecurringExpense[] = [
  {
    id: "rec1",
    description: "Netflix Subscription",
    amount: 15.99,
    category: "entertainment",
    frequency: "monthly",
    startDate: new Date("2023-01-01"),
    active: true
  },
  {
    id: "rec2",
    description: "Gym Membership",
    amount: 49.99,
    category: "health",
    frequency: "monthly",
    startDate: new Date("2023-01-15"),
    active: true
  },
  {
    id: "rec3",
    description: "Adobe Creative Cloud",
    amount: 52.99,
    category: "other",
    frequency: "monthly",
    startDate: new Date("2023-02-10"),
    active: false
  }
];

const RecurringExpenses = () => {
  const [recurringExpenses, setRecurringExpenses] = useState<RecurringExpense[]>(sampleRecurringExpenses);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<RecurringExpense | null>(null);
  
  const handleAddExpense = (expense: RecurringExpense) => {
    setRecurringExpenses(prev => [...prev, expense]);
    setIsAddDialogOpen(false);
  };
  
  const handleUpdateExpense = (expense: RecurringExpense) => {
    setRecurringExpenses(prev => 
      prev.map(item => item.id === expense.id ? expense : item)
    );
    setEditingExpense(null);
  };
  
  const toggleExpenseActive = (id: string) => {
    setRecurringExpenses(prev => 
      prev.map(expense => 
        expense.id === id 
          ? { ...expense, active: !expense.active } 
          : expense
      )
    );
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'Daily';
      case 'weekly': return 'Weekly';
      case 'monthly': return 'Monthly';
      case 'yearly': return 'Yearly';
      default: return frequency;
    }
  };
  
  const getNextOccurrence = (expense: RecurringExpense) => {
    const today = new Date();
    const startDate = new Date(expense.startDate);
    let nextDate = new Date(startDate);
    
    // Simple calculation for demonstration purposes
    // In a real app, you'd need more sophisticated date calculations
    while (nextDate < today) {
      switch (expense.frequency) {
        case 'daily':
          nextDate.setDate(nextDate.getDate() + 1);
          break;
        case 'weekly':
          nextDate.setDate(nextDate.getDate() + 7);
          break;
        case 'monthly':
          nextDate.setMonth(nextDate.getMonth() + 1);
          break;
        case 'yearly':
          nextDate.setFullYear(nextDate.getFullYear() + 1);
          break;
      }
    }
    
    return formatDate(nextDate);
  };
  
  return (
    <div className="min-h-screen bg-slate-50 relative">
      <div className="flex flex-col md:flex-row">
        <Navbar />
        
        <main className="flex-1 px-4 pt-6 pb-24 md:pb-6 md:pl-0 md:pr-6">
          <div className="max-w-4xl mx-auto">
            <header className="mb-8 animate-fade-in">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Recurring Expenses</h1>
                  <p className="text-muted-foreground mt-1">Manage your recurring bills and subscriptions</p>
                </div>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Recurring
                </Button>
              </div>
            </header>
            
            {recurringExpenses.length === 0 ? (
              <Card className="border animate-fade-in">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">No recurring expenses yet</p>
                  <p className="text-muted-foreground text-center mb-6">
                    Set up recurring expenses to track your regular bills and subscriptions
                  </p>
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Recurring Expense
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {recurringExpenses.map((expense, index) => (
                  <Card 
                    key={expense.id} 
                    className={`border animate-fade-in animate-delay-[${index * 100}ms] ${!expense.active ? 'opacity-70' : ''}`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{expense.description}</CardTitle>
                          <CardDescription>
                            {categoryInfo[expense.category].label} • {getFrequencyLabel(expense.frequency)}
                          </CardDescription>
                        </div>
                        <Badge variant={expense.active ? "default" : "outline"}>
                          {expense.active ? "Active" : "Paused"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <DollarSign className="h-5 w-5 mr-1 text-primary" />
                          <span className="text-xl font-semibold">${expense.amount.toFixed(2)}</span>
                        </div>
                        <Switch 
                          checked={expense.active} 
                          onCheckedChange={() => toggleExpenseActive(expense.id)}
                        />
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          <span>Started: {formatDate(expense.startDate)}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setEditingExpense(expense)}
                        >
                          Edit
                        </Button>
                      </div>
                      
                      {expense.active && (
                        <div className="mt-3 pt-3 border-t flex items-center text-muted-foreground text-sm">
                          <RefreshCw className="h-4 w-4 mr-1" />
                          <span>Next: {getNextOccurrence(expense)}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            <Card className="border mt-8 bg-primary/5 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg">About Recurring Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Recurring expenses are automatically tracked and added to your monthly expenses. 
                  You can pause them at any time by toggling the switch. This helps you keep track 
                  of all your subscriptions and regular payments.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      
      {/* Add Recurring Expense Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Recurring Expense</DialogTitle>
            <DialogDescription>
              Set up an expense that occurs on a regular basis
            </DialogDescription>
          </DialogHeader>
          <RecurringExpenseForm onSave={handleAddExpense} />
        </DialogContent>
      </Dialog>
      
      {/* Edit Recurring Expense Dialog */}
      <Dialog open={!!editingExpense} onOpenChange={() => setEditingExpense(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Recurring Expense</DialogTitle>
            <DialogDescription>
              Update your recurring expense details
            </DialogDescription>
          </DialogHeader>
          {editingExpense && (
            <RecurringExpenseForm 
              onSave={handleUpdateExpense}
              initialData={editingExpense}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecurringExpenses;
