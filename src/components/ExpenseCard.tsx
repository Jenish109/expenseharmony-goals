
import { Card, CardContent } from "@/components/ui/card";
import { capitalizeFirstLetter } from "@/helper/helper";
import { Expense, categoryInfo } from "@/lib/data";
import { DollarSign } from "lucide-react";

interface ExpenseCardProps {
  expense: Expense;
}


export function ExpenseCard({ expense }: ExpenseCardProps) {
  const { expense_id, category_data, expense_name, amount , created_at } = expense;
  // const categoryData = categoryInfo[category];

  // Format date from ISO string to readable format
  const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
  console.log('color --- ',category_data)
  return (
    <Card key={expense_id} className="overflow-hidden card-hover border animate-scale-in">
      <CardContent className="p-0">
        <div className="flex items-start p-4">
          <div 
            className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4"
            style={{ backgroundColor: `${category_data?.category_color}20` }}
          >
            <DollarSign 
              size={18} 
              className="text-foreground"
              style={{ color: category_data?.category_color }} 
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-sm truncate">{capitalizeFirstLetter(expense_name)}</p>
                <p className="text-xs text-muted-foreground">{capitalizeFirstLetter(category_data?.category_name)}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${amount}</p>
                <p className="text-xs text-muted-foreground">{formattedDate}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
