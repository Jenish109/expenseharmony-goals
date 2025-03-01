
import { useState } from 'react';
import { sampleExpenses, sampleBudgets } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { SpendingChart } from "@/components/SpendingChart";
import { TransactionList } from "@/components/TransactionList";
import { BudgetGoal } from "@/components/BudgetGoal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

const Dashboard = () => {
  // Get current month and year
  const currentDate = new Date();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  // Calculate total income, expenses and savings for the month
  const monthlyIncome = 5000; // Placeholder value
  const totalExpenses = sampleExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const savings = monthlyIncome - totalExpenses;

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50 relative">
      <div className="flex flex-col md:flex-row">
        <Navbar />
        
        <main className="flex-1 px-4 pt-6 pb-24 md:pb-6 md:pl-0 md:pr-6">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Your financial overview for {monthName} {year}</p>
            </header>

            {/* Summary Cards */}
            <div className="grid gap-6 md:grid-cols-3 mb-6">
              <Card className="border animate-fade-in animate-delay-[100ms]">
                <CardHeader className="pb-2">
                  <CardDescription>Monthly Income</CardDescription>
                  <CardTitle className="text-2xl">{formatCurrency(monthlyIncome)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <ArrowUp className="text-green-500 h-4 w-4 mr-1" />
                    <span>0% from last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border animate-fade-in animate-delay-[200ms]">
                <CardHeader className="pb-2">
                  <CardDescription>Monthly Expenses</CardDescription>
                  <CardTitle className="text-2xl">{formatCurrency(totalExpenses)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <ArrowDown className="text-red-500 h-4 w-4 mr-1" />
                    <span>0% from last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border animate-fade-in animate-delay-[300ms]">
                <CardHeader className="pb-2">
                  <CardDescription>Monthly Savings</CardDescription>
                  <CardTitle className="text-2xl">{formatCurrency(savings)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <ArrowUp className="text-green-500 h-4 w-4 mr-1" />
                    <span>0% from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Spending Chart */}
            <div className="mb-6 animate-fade-in-left animate-delay-[400ms]">
              <SpendingChart />
            </div>

            {/* Budget Goals and Transactions */}
            <div className="grid gap-6 md:grid-cols-5">
              <div className="md:col-span-2 animate-fade-in-left animate-delay-[500ms]">
                <Card className="border h-full">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Budget Goals</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-4 max-h-[400px] overflow-auto fade-mask pr-1">
                      {sampleBudgets.slice(0, 3).map((budget) => (
                        <BudgetGoal key={budget.id} budget={budget} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-3 animate-fade-in-right animate-delay-[600ms]">
                <TransactionList expenses={sampleExpenses} limit={5} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
