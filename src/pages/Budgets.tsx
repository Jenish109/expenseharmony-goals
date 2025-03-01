
import { useState } from 'react';
import { sampleBudgets } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { BudgetGoal } from "@/components/BudgetGoal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";

const Budgets = () => {
  // Calculate total budget and total spent
  const totalBudget = sampleBudgets.reduce((sum, budget) => sum + budget.amount, 0);
  const totalSpent = sampleBudgets.reduce((sum, budget) => sum + budget.spent, 0);
  const percentUsed = Math.round((totalSpent / totalBudget) * 100);

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
    <div className="min-h-screen bg-slate-50 relative">
      <div className="flex flex-col md:flex-row">
        <Navbar />
        
        <main className="flex-1 px-4 pt-6 pb-24 md:pb-6 md:pl-0 md:pr-6">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
              <p className="text-muted-foreground mt-1">Set and track your spending limits</p>
            </header>

            {/* Overall Budget Summary */}
            <Card className="mb-8 border animate-fade-in">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold">Monthly Budget Overview</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Budget
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Budget</p>
                    <p className="text-2xl font-semibold">{formatCurrency(totalBudget)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Spent So Far</p>
                    <p className="text-2xl font-semibold">{formatCurrency(totalSpent)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Remaining</p>
                    <p className="text-2xl font-semibold">{formatCurrency(totalBudget - totalSpent)}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{percentUsed}% used</span>
                    <span>
                      {formatCurrency(totalSpent)} of {formatCurrency(totalBudget)}
                    </span>
                  </div>
                  <Progress value={percentUsed} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Budget Goals Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
              {sampleBudgets.map((budget, index) => (
                <div key={budget.id} className={`animate-fade-in animate-delay-[${index * 100}ms]`}>
                  <BudgetGoal budget={budget} />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Budgets;
