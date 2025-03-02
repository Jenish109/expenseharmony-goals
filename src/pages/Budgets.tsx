
import { useState } from 'react';
import { sampleBudgets } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { BudgetGoal } from "@/components/BudgetGoal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, ArrowUp, ArrowDown, DollarSign } from "lucide-react";
import { TransactionList } from "@/components/TransactionList";
import { Input } from "@/components/ui/input";

const Budgets = () => {
  const [filterQuery, setFilterQuery] = useState('');

  // Calculate total budget and total spent
  const totalBudget = sampleBudgets.reduce((sum, budget) => sum + budget.amount, 0);
  const totalSpent = sampleBudgets.reduce((sum, budget) => sum + budget.spent, 0);
  const percentUsed = Math.round((totalSpent / totalBudget) * 100);
  
  // Filter budgets based on search query
  const filteredBudgets = sampleBudgets.filter(
    budget => budget.category.toLowerCase().includes(filterQuery.toLowerCase())
  );

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 dark:text-white relative">
      <div className="flex flex-col md:flex-row">
        <Navbar />
        
        <main className="ml-3 md:ml-6 flex-1 px-4 pt-6 pb-24 md:pb-6 md:pl-0 md:pr-8 h-screen overflow-scroll">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
              <p className="text-muted-foreground mt-1">Set and track your spending limits</p>
            </header>

            {/* Budget Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
              <Card className="border shadow-md  backdrop-blur animate-scale-in bg-white/90 dark:border-slate-800 dark:bg-slate-950">
                <CardContent className="p-6 ">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Budget</h3>
                    <div className="p-2 bg-primary/10 rounded-full">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{formatCurrency(totalBudget)}</div>
                  <div className="text-xs text-muted-foreground mt-1">Monthly allocation</div>
                </CardContent>
              </Card>

              <Card className="border shadow-md bg-white/90 backdrop-blur animate-scale-in dark:border-slate-800 dark:bg-slate-950">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Spent So Far</h3>
                    <div className="p-2 bg-red-500/10 rounded-full">
                      <ArrowUp className="h-5 w-5 text-red-500" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
                  <div className="text-xs text-muted-foreground mt-1">{percentUsed}% of total budget</div>
                </CardContent>
              </Card>

              <Card className="border shadow-md bg-white/90 backdrop-blur animate-scale-in dark:border-slate-800 dark:bg-slate-950">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Remaining</h3>
                    <div className="p-2 bg-green-500/10 rounded-full">
                      <ArrowDown className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{formatCurrency(totalBudget - totalSpent)}</div>
                  <div className="text-xs text-muted-foreground mt-1">Available to spend</div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Budget Overview */}
            <Card className="mb-8 border shadow-lg bg-white/95 backdrop-blur-md animate-fade-in dark:border-slate-800 dark:bg-slate-950">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold">Monthly Budget Overview</CardTitle>
                  <Button size="sm" className="shadow-sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Budget
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row justify-between mb-2">
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-primary"></div>
                      <span>Used: {formatCurrency(totalSpent)}</span>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-slate-200"></div>
                      <span>Remaining: {formatCurrency(totalBudget - totalSpent)}</span>
                    </div>
                  </div>
                  
                  <Progress value={percentUsed} className="h-3 bg-slate-200" />
                  
                  <div className="flex justify-between text-sm mt-1">
                    <span className={percentUsed > 80 ? "text-red-500 font-medium" : percentUsed > 50 ? "text-amber-500 font-medium" : "text-green-500 font-medium"}>
                      {percentUsed}% used
                    </span>
                    <span className="text-muted-foreground">
                      {formatCurrency(totalSpent)} of {formatCurrency(totalBudget)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search and Budget Goals Grid */}
            <div className="mb-6 animate-fade-in">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-xl font-semibold">Budget Categories</h2>
                <div className="relative w-full md:w-64">
                  <Input
                    type="text"
                    placeholder="Search categories..."
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    className="w-full shadow-sm border dark:border-slate-800 dark:bg-slate-950 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredBudgets.map((budget, index) => (
                  <div key={budget.id} className={`animate-fade-in`} style={{ animationDelay: `${index * 50}ms` }}>
                    <BudgetGoal budget={budget} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Budgets;
