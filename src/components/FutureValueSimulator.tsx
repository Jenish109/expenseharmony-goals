
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { calculateFutureValue } from "@/lib/futureValue";
import { Expense } from "@/lib/data";
import { DollarSign, Clock, TrendingUp, Percent } from "lucide-react";

interface FutureValueSimulatorProps {
  expense?: Expense;
  amount?: number;
  onClose?: () => void;
}

export function FutureValueSimulator({ expense, amount, onClose }: FutureValueSimulatorProps) {
  const expenseAmount = expense ? expense.amount : amount || 10;
  const [principal, setPrincipal] = useState(expenseAmount);
  const [rate, setRate] = useState(0.08); // Default to 8%
  const [years, setYears] = useState(5); // Default to 5 years
  const [compoundingFrequency, setCompoundingFrequency] = useState(12); // Default to monthly
  const [skipPercentage, setSkipPercentage] = useState(100); // Default to skipping the whole expense
  const [futureValue, setFutureValue] = useState(0);
  const [skipFutureValue, setSkipFutureValue] = useState(0);

  // Recalculate future values when inputs change
  useEffect(() => {
    // Calculate future value if expense was invested
    const calculatedFutureValue = calculateFutureValue(
      principal,
      rate,
      years,
      compoundingFrequency
    );
    setFutureValue(calculatedFutureValue);

    // Calculate future value if expense was reduced by skipPercentage
    const skipAmount = (principal * skipPercentage) / 100;
    const skipCalculatedFutureValue = calculateFutureValue(
      skipAmount,
      rate,
      years,
      compoundingFrequency
    );
    setSkipFutureValue(skipCalculatedFutureValue);
  }, [principal, rate, years, compoundingFrequency, skipPercentage]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  return (
    <Card className="border shadow-lg animate-fade-in ">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-primary" />
          Future Value Simulator
        </CardTitle>
        <CardDescription>
          {expense 
            ? `See how much your ${expense.description} expense could be worth in the future`
            : "See how your expenses could grow if invested instead"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Amount</label>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
              <Input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
                className="w-24 h-8 text-right"
                min={0}
              />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Investment Rate</label>
            <div className="flex items-center">
              <Percent className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="w-16 text-right">{formatPercentage(rate)}</span>
            </div>
          </div>
          <Slider
            value={[rate * 100]}
            min={0}
            max={15}
            step={0.1}
            onValueChange={(value) => setRate(value[0] / 100)}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>5%</span>
            <span>10%</span>
            <span>15%</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Time Horizon</label>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="w-16 text-right">{years} years</span>
            </div>
          </div>
          <Slider
            value={[years]}
            min={1}
            max={30}
            step={1}
            onValueChange={(value) => setYears(value[0])}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1yr</span>
            <span>10yrs</span>
            <span>20yrs</span>
            <span>30yrs</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Compounding</label>
            <select
              value={compoundingFrequency}
              onChange={(e) => setCompoundingFrequency(parseInt(e.target.value))}
              className="text-sm rounded-md px-2 py-1 border dark:bg-slate-800"
            >
              <option value={1}>Annually</option>
              <option value={4}>Quarterly</option>
              <option value={12}>Monthly</option>
              <option value={365}>Daily</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">"What If" - Skip or Reduce</label>
            <span className="text-sm">{skipPercentage}%</span>
          </div>
          <Slider
            value={[skipPercentage]}
            min={0}
            max={100}
            step={5}
            onValueChange={(value) => setSkipPercentage(value[0])}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>Reduce half (50%)</span>
            <span>Skip all (100%)</span>
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <div className="bg-muted dark:bg-primary/10 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">If you saved/invested this amount:</div>
            <div className="text-2xl font-bold">{formatCurrency(futureValue)}</div>
            <div className="text-sm text-muted-foreground">Future value in {years} years</div>
          </div>

          {skipPercentage > 0 && (
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">
                If you skip/reduce by {skipPercentage}%:
              </div>
              <div className="text-2xl font-bold text-primary">{formatCurrency(skipFutureValue)}</div>
              <div className="text-sm text-muted-foreground">
                Potential savings in {years} years
              </div>
            </div>
          )}
        </div>

        {onClose && (
          <div className="pt-2">
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
