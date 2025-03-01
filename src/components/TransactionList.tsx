
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseCard } from "@/components/ExpenseCard";
import { Expense } from "@/lib/data";

interface TransactionListProps {
  expenses: Expense[];
  title?: string;
  limit?: number;
}

export function TransactionList({ expenses, title = "Recent Transactions", limit }: TransactionListProps) {
  const displayExpenses = limit ? expenses.slice(0, limit) : expenses;
  
  return (
    <Card className="w-full border animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-3 max-h-[400px] overflow-auto fade-mask pr-1">
          {displayExpenses.length > 0 ? (
            displayExpenses.map((expense) => (
              <ExpenseCard key={expense.id} expense={expense} />
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No transactions to display
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
