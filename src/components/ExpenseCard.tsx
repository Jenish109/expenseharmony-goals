
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { Expense } from "@/lib/data";

interface ExpenseCardProps {
  expense: Expense;
}

export function ExpenseCard({ expense }: ExpenseCardProps) {
  const { expense_name, amount, category_data, date } = expense;
  const formattedAmount = amount;

  return (
    <Card className="expense-card overflow-hidden card-hover">
      <CardContent className="p-4">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center mr-3 transition-colors duration-200"
              style={{ 
                backgroundColor: `${category_data.category_color}20`,
                boxShadow: `0 2px 8px ${category_data.category_color}30`
              }}
            >
              <DollarSign
                size={18}
                className="text-foreground"
                style={{ color: category_data.category_color }}
              />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">{expense_name}</p>
              <p className="text-sm text-muted-foreground">
                {category_data.category_name}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm font-medium">
              ${formattedAmount}
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date(date).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
