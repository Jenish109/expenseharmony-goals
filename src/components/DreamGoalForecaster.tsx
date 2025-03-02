
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { calculateMonthlyPayment } from "@/lib/futureValue";
import { Trophy, DollarSign, Calendar, TrendingUp } from "lucide-react";

interface DreamGoalProps {
  goalName?: string;
  goalAmount?: number;
  yearsToReach?: number;
}

export function DreamGoalForecaster({ goalName = "Dream Goal", goalAmount = 10000, yearsToReach = 5 }: DreamGoalProps) {
  const [name, setName] = useState(goalName);
  const [amount, setAmount] = useState(goalAmount);
  const [years, setYears] = useState(yearsToReach);
  const [interestRate, setInterestRate] = useState(0.06); // Default to 6%
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [reducedMonthlySavings, setReducedMonthlySavings] = useState(0);
  const [reducedExpenses, setReducedExpenses] = useState(100); // Default $100 reduction

  // Calculate monthly payment needed to reach goal
  useEffect(() => {
    const calculatedMonthlyPayment = calculateMonthlyPayment(amount, years, interestRate);
    setMonthlySavings(calculatedMonthlyPayment);
    
    // Calculate reduced time with expense reduction
    const newMonthlySavings = calculatedMonthlyPayment + reducedExpenses;
    const reducedTimeCalculation = calculateMonthlyPayment(amount, years * 0.75, interestRate);
    setReducedMonthlySavings(newMonthlySavings);
  }, [amount, years, interestRate, reducedExpenses]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Format months as years and months
  const formatTimeframe = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = Math.floor(months % 12);
    
    if (years === 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} and ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  };

  // Calculate months saved if reducing expenses
  const calculateMonthsSaved = () => {
    // Original months needed
    const originalMonths = years * 12;
    
    // New months needed with increased savings
    const reducedMonths = (amount / reducedMonthlySavings) * (1 - Math.pow(1 + interestRate/12, -originalMonths));
    
    // Months saved
    const monthsSaved = originalMonths - reducedMonths;
    return Math.max(0, monthsSaved);
  };

  return (
    <Card className="border shadow-lg animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-primary" />
          Dream Goal Forecaster
        </CardTitle>
        <CardDescription>
          Plan and track your progress toward your financial goals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <label htmlFor="goalName" className="text-sm font-medium">
              Goal Name
            </label>
            <Input
              id="goalName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name your goal"
              className="mt-1"
            />
          </div>
          
          <div>
            <label htmlFor="goalAmount" className="text-sm font-medium">
              Goal Amount
            </label>
            <div className="relative mt-1">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="goalAmount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="pl-8"
                placeholder="10000"
                min={0}
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Time Horizon</label>
              <span className="text-sm">{years} years</span>
            </div>
            <Slider
              value={[years]}
              min={1}
              max={20}
              step={1}
              onValueChange={(value) => setYears(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1yr</span>
              <span>10yrs</span>
              <span>20yrs</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Interest Rate</label>
              <span className="text-sm">{(interestRate * 100).toFixed(1)}%</span>
            </div>
            <Slider
              value={[interestRate * 100]}
              min={0}
              max={12}
              step={0.1}
              onValueChange={(value) => setInterestRate(value[0] / 100)}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>6%</span>
              <span>12%</span>
            </div>
          </div>
        </div>
        
        <div className="pt-2 space-y-3">
          <div className="bg-muted dark:bg-primary/10 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Required monthly savings:</div>
            <div className="text-2xl font-bold">{formatCurrency(monthlySavings)}</div>
            <div className="text-sm text-muted-foreground">
              To reach {formatCurrency(amount)} in {formatTimeframe(years * 12)}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center text-sm font-medium mb-1">
              <label>Reduce expenses per week:</label>
              <span>{formatCurrency(reducedExpenses)}</span>
            </div>
            <Slider
              value={[reducedExpenses]}
              min={20}
              max={200}
              step={10}
              onValueChange={(value) => setReducedExpenses(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$20</span>
              <span>$100</span>
              <span>$200</span>
            </div>
          </div>
          
          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">With expense reduction:</div>
            <div className="text-2xl font-bold text-primary">
              {formatTimeframe(calculateMonthsSaved())} sooner!
            </div>
            <div className="text-sm text-muted-foreground">
              By saving an extra {formatCurrency(reducedExpenses)} per week
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
