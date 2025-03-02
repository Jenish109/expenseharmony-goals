import { useState } from 'react';
import { sampleExpenses, sampleBudgets } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { SpendingChart } from "@/components/SpendingChart";
import { TransactionList } from "@/components/TransactionList";
import { BudgetGoal } from "@/components/BudgetGoal";
import { AppInfoSlider } from "@/components/AppInfoSlider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 dark:text-white relative"> {/* Dark mode background and text */}
      <div className="flex flex-col md:flex-row">
        <Navbar />

        <main className="ml-3 md:ml-6 flex-1 px-4 pt-6 pb-24 md:pb-6 md:pl-0 md:pr-6 h-screen overflow-scroll">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold tracking-tight dark:text-gray-100">Dashboard</h1>
              <p className="dark:text-gray-400 mt-1">Your financial overview for {monthName} {year}</p>
            </header>


            <div className="grid gap-6 md:grid-cols-3 mb-6">
              {[
                { title: "Monthly Income", value: monthlyIncome, icon: <ArrowUp className="text-green-500 h-4 w-4 mr-1" /> },
                { title: "Monthly Expenses", value: totalExpenses, icon: <ArrowDown className="text-red-500 h-4 w-4 mr-1" /> },
                { title: "Monthly Savings", value: savings, icon: <ArrowUp className="text-green-500 h-4 w-4 mr-1" /> },
              ].map(({ title, value, icon }, index) => (
                <Card key={title} className={`border dark:border-slate-800 dark:bg-slate-950 animate-fade-in animate-delay-[${(index + 1) * 100}ms]`}>
                  <CardHeader className="pb-2">
                    <CardDescription className="dark:text-gray-400">{title}</CardDescription>
                    <CardTitle className="text-2xl dark:text-gray-100">{formatCurrency(value)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm dark:text-gray-400 flex items-center">
                      {icon}
                      <span>0% from last month</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>


            {/* Spending Chart */}
            <div className="mb-6 animate-fade-in-left animate-delay-[400ms]">
              <SpendingChart />
            </div>

            {/* Budget Goals and Transactions */}
            <div className="grid gap-6 md:grid-cols-5">
              <div className="md:col-span-2 animate-fade-in-left animate-delay-[500ms]">
                <Card className="border dark:border-slate-800 dark:bg-slate-950 h-full">
                  <CardHeader className='grid grid-cols-2 gap-32 items-center'>
                    <CardTitle className="text-lg font-semibold dark:text-gray-100">Budget Goals</CardTitle>
                    <Button variant="link" asChild size="sm">
                      <Link to="/budgets" className="text-sm dark:text-blue-400 dark:hover:text-blue-300">
                        View All
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
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

      {/* App Info Slider */}
      <AppInfoSlider />
    </div>
  );
};

export default Dashboard;