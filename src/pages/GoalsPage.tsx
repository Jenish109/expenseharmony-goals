
import { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DreamGoalForecaster } from "@/components/DreamGoalForecaster";
import { Button } from "@/components/ui/button";
import { PlusCircle, Target, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface Goal {
  id: string;
  name: string;
  amount: number;
  years: number;
  savedSoFar: number;
}

const GoalsPage = () => {
  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', name: 'New Car', amount: 25000, years: 5, savedSoFar: 5000 },
    { id: '2', name: 'Down Payment', amount: 50000, years: 10, savedSoFar: 10000 },
  ]);
  
  const [showAddGoalDialog, setShowAddGoalDialog] = useState(false);
  const [newGoal, setNewGoal] = useState<Omit<Goal, 'id'>>({
    name: '',
    amount: 10000,
    years: 5,
    savedSoFar: 0
  });

  const handleAddGoal = () => {
    const goal: Goal = {
      ...newGoal,
      id: Date.now().toString()
    };
    
    setGoals([...goals, goal]);
    setShowAddGoalDialog(false);
    
    toast.success("Goal added", {
      description: `Added ${goal.name} goal for $${goal.amount.toLocaleString()}`
    });
    
    // Reset form
    setNewGoal({
      name: '',
      amount: 10000,
      years: 5,
      savedSoFar: 0
    });
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate progress percentage
  const calculateProgress = (savedSoFar: number, targetAmount: number) => {
    return Math.min(100, Math.round((savedSoFar / targetAmount) * 100));
  };

  return (
    <div className="min-h-screen bg-slate-50 relative">
      <div className="flex flex-col md:flex-row">
        <Navbar />
        
        <main className="flex-1 px-4 pt-6 pb-24 md:pb-6 md:pl-0 md:pr-6 h-screen overflow-scroll">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold tracking-tight">Dream Goals</h1>
              <p className="text-muted-foreground mt-1">Plan and track progress toward your financial dreams</p>
            </header>
            
            {/* Dream Goal Forecaster */}
            <div className="mb-8 animate-fade-in">
              <DreamGoalForecaster />
            </div>
            
            {/* Goals List */}
            <div className="mb-8 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Goals</h2>
                <Button onClick={() => setShowAddGoalDialog(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Goal
                </Button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {goals.map((goal) => (
                  <Card key={goal.id} className="border">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center">
                            <Target className="h-5 w-5 mr-2 text-primary" />
                            {goal.name}
                          </CardTitle>
                          <CardDescription>
                            Target: {formatCurrency(goal.amount)} in {goal.years} years
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-xl text-primary">
                            {calculateProgress(goal.savedSoFar, goal.amount)}%
                          </span>
                          <CardDescription>
                            {formatCurrency(goal.savedSoFar)} saved
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Progress bar */}
                      <div className="w-full bg-muted rounded-full h-2.5 mb-2">
                        <div 
                          className="bg-primary h-2.5 rounded-full animate-progress-fill" 
                          style={{ 
                            width: `${calculateProgress(goal.savedSoFar, goal.amount)}%`,
                            '--progress-value': `${calculateProgress(goal.savedSoFar, goal.amount)}%`
                          } as React.CSSProperties}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <Button variant="outline" className="text-xs h-8" onClick={() => toast.info("Coming soon!")}>
                          Update Progress
                        </Button>
                        <Button variant="outline" className="text-xs h-8" onClick={() => toast.info("Coming soon!")}>
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Simulate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Add Goal Dialog */}
      <Dialog open={showAddGoalDialog} onOpenChange={setShowAddGoalDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Goal</DialogTitle>
            <DialogDescription>
              Create a new financial goal to track your progress
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="goalName" className="text-sm font-medium">
                Goal Name
              </label>
              <Input
                id="goalName"
                value={newGoal.name}
                onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                placeholder="e.g., New Car, Vacation, Home Down Payment"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="goalAmount" className="text-sm font-medium">
                Target Amount
              </label>
              <div className="flex items-center gap-2">
                <Input
                  id="goalAmount"
                  type="number"
                  value={newGoal.amount}
                  onChange={(e) => setNewGoal({...newGoal, amount: parseFloat(e.target.value) || 0})}
                  min={0}
                  step={1000}
                />
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {formatCurrency(newGoal.amount)}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="goalYears" className="text-sm font-medium">
                  Years to Reach
                </label>
                <span className="text-sm">{newGoal.years} years</span>
              </div>
              <Slider
                value={[newGoal.years]}
                min={1}
                max={20}
                step={1}
                onValueChange={(value) => setNewGoal({...newGoal, years: value[0]})}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="savedSoFar" className="text-sm font-medium">
                Amount Saved So Far
              </label>
              <div className="flex items-center gap-2">
                <Input
                  id="savedSoFar"
                  type="number"
                  value={newGoal.savedSoFar}
                  onChange={(e) => setNewGoal({...newGoal, savedSoFar: parseFloat(e.target.value) || 0})}
                  min={0}
                  step={100}
                />
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {calculateProgress(newGoal.savedSoFar, newGoal.amount)}% complete
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowAddGoalDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddGoal}
              disabled={!newGoal.name || newGoal.amount <= 0}
            >
              Add Goal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GoalsPage;
