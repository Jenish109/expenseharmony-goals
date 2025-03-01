
import { Card, CardContent } from "@/components/ui/card";
import { Budget, categoryInfo } from "@/lib/data";
import { DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface BudgetGoalProps {
  budget: Budget;
}

export function BudgetGoal({ budget }: BudgetGoalProps) {
  const { category, amount, spent } = budget;
  const categoryData = categoryInfo[category];
  
  // Calculate percentage spent
  const percentSpent = Math.min(100, Math.round((spent / amount) * 100));
  
  // Determine status color based on percentage spent
  const getStatusColor = () => {
    if (percentSpent < 50) return "bg-green-500";
    if (percentSpent < 80) return "bg-yellow-500";
    return "bg-red-500";
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

  return (
    <Card className="overflow-hidden card-hover border-0 shadow-md bg-white/90 backdrop-blur animate-scale-in">
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div 
              className="h-10 w-10 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: `${categoryData.color}20` }}
            >
              <DollarSign 
                size={18} 
                className="text-foreground"
                style={{ color: categoryData.color }} 
              />
            </div>
            <h3 className="font-medium text-base">{categoryData.label}</h3>
          </div>
          <div className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            percentSpent < 50 ? "bg-green-100 text-green-700" :
            percentSpent < 80 ? "bg-yellow-100 text-yellow-700" :
            "bg-red-100 text-red-700"
          )}>
            {percentSpent}%
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-lg font-semibold">
            {formatCurrency(spent)} <span className="text-muted-foreground text-sm font-normal">/ {formatCurrency(amount)}</span>
          </div>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${getStatusColor()}`}
            style={{ 
              width: `${percentSpent}%`,
              '--progress-value': `${percentSpent}%`
            } as React.CSSProperties}
          ></div>
        </div>
        
        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted-foreground">
            {formatCurrency(spent)} spent
          </span>
          <span className="text-xs text-muted-foreground">
            {formatCurrency(amount - spent)} remaining
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
