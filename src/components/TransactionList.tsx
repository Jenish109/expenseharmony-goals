
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseCard } from "@/components/ExpenseCard";
import { Expense } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TransactionListProps {
  expenses: Expense[];
  limit?: number;
  title?: string;
  onExpenseClick?: (expenseId: string) => void;
}

export function TransactionList({ expenses, limit, title = "Recent Transactions", onExpenseClick }: TransactionListProps) {
  // Get the most recent transactions, limited by the limit prop
  const recentExpenses = limit ? expenses.slice(0, limit) : expenses;

  return (
    <Card className="border animate-fade-in">
      <CardHeader className={title ? 'pb-2' : 'sr-only'}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {limit && expenses.length > limit && (
            <Button variant="link" asChild size="sm">
              <Link to="/expenses" className="text-sm">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className={title ? 'pt-0' : 'pt-4'}>
        <div className="space-y-3">
          {recentExpenses.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No expenses found</p>
          ) : (
            recentExpenses.map((expense) => (
              <div 
                key={expense.id} 
                className={onExpenseClick ? "cursor-pointer hover:opacity-90 transition-opacity" : ""}
                onClick={() => onExpenseClick && onExpenseClick(expense.id)}
              >
                <ExpenseCard expense={expense} />
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
