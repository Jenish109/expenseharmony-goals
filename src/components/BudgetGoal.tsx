
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

  return (
    <Card className="overflow-hidden card-hover border animate-scale-in">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <div 
              className="h-8 w-8 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: `${categoryData.color}20` }}
            >
              <DollarSign 
                size={16} 
                className="text-foreground"
                style={{ color: categoryData.color }} 
              />
            </div>
            <h3 className="font-medium">{categoryData.label}</h3>
          </div>
          <div className="text-sm font-semibold">
            ${spent.toFixed(2)} <span className="text-muted-foreground font-normal">/ ${amount}</span>
          </div>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${getStatusColor()}`}
            style={{ 
              width: `${percentSpent}%`,
              '--progress-value': `${percentSpent}%`
            } as React.CSSProperties}
          ></div>
        </div>
        
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">{percentSpent}% spent</span>
          <span className="text-xs text-muted-foreground">
            ${(amount - spent).toFixed(2)} remaining
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
