
import { Card, CardContent } from "@/components/ui/card";
import { Expense, categoryInfo } from "@/lib/data";
import { DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpenseCardProps {
  expense: Expense;
}

export function ExpenseCard({ expense }: ExpenseCardProps) {
  const { category, amount, description, date } = expense;
  const categoryData = categoryInfo[category];

  // Format date from ISO string to readable format
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <Card className="overflow-hidden card-hover border animate-scale-in">
      <CardContent className="p-0">
        <div className="flex items-start p-4">
          <div 
            className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4"
            style={{ backgroundColor: `${categoryData.color}20` }}
          >
            <DollarSign 
              size={18} 
              className="text-foreground"
              style={{ color: categoryData.color }} 
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-sm truncate">{description}</p>
                <p className="text-xs text-muted-foreground">{categoryData.label}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${amount.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{formattedDate}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
