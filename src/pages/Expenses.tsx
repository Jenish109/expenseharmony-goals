
import { useState } from 'react';
import { sampleExpenses, ExpenseCategory, categoryInfo } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { TransactionList } from "@/components/TransactionList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, ArrowUpDown, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const Expenses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | 'all'>('all');
  
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
  const categories: (ExpenseCategory | 'all')[] = ['all', 'food', 'transport', 'housing', 'entertainment', 'utilities', 'shopping', 'health', 'other'];

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
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
                
                <div className="relative">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="w-10 h-10"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button className="gap-1">
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
                  {category === 'all' ? 'All' : categoryInfo[category].label}
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
    </div>
  );
};

export default Expenses;
