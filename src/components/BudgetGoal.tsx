import { Card, CardContent } from "@/components/ui/card";
import { Budget, categoryInfo } from "@/lib/data";
import { DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/helper/helper";

interface BudgetGoalProps {
  budget: Budget;
}

export function BudgetGoal({ budget }: BudgetGoalProps) {
  const { amount, budget_id, category_data, created_at, current_amount } =
    budget;
  // const { category_name, budget_id, category_data, current_amount , amount } =
  //   budgetList;

  // Calculate percentage spent
  const percentSpent = Math.min(
    100,
    Math.round((current_amount / amount) * 100)
  );

  // Determine status color based on percentage spent
  const getStatusColor = () => {
    if (percentSpent < 50) return "bg-green-500";
    if (percentSpent < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="overflow-hidden card-hover border animate-scale-in">
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: `${category_data.category_color}20` }}
            >
              <DollarSign
                size={18}
                className="text-foreground"
                style={{ color: category_data.category_color }}
              />
            </div>
            <h3 className="font-medium text-base">
              {capitalizeFirstLetter(category_data?.category_name)}
            </h3>
          </div>
          <div
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              percentSpent < 50
                ? "bg-green-100 text-green-700"
                : percentSpent < 80
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            )}
          >
            {percentSpent}%
          </div>
        </div>

        <div className="mb-4">
          <div className="text-lg font-semibold">
            {formatCurrency(current_amount)}{" "}
            <span className="text-muted-foreground text-sm font-normal">
              / {formatCurrency(amount)}
            </span>
          </div>
        </div>

        <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ${getStatusColor()}`}
            style={
              {
                width: `${percentSpent}%`,
                "--progress-value": `${percentSpent}%`,
              } as React.CSSProperties
            }
          ></div>
        </div>

        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted-foreground">
            {formatCurrency(current_amount)} spent
          </span>
          <span className="text-xs text-muted-foreground">
            {formatCurrency(amount - current_amount)} remaining
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
