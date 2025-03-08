
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseCard } from "@/components/ExpenseCard";
import { Expense } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TransactionListProps {
  expenses: Expense[];
  title: string;
  limit?: number;
  onExpenseClick?: (expenseId: string) => void;
}

export function TransactionList({
  expenses = [],
  title,
  limit,
  onExpenseClick
}: TransactionListProps) {
  const displayExpenses = limit ? expenses.slice(0, limit) : expenses;

  if (!displayExpenses.length) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg font-medium">No expenses found</p>
        <p className="text-sm mt-1">Add some expenses to see them here</p>
      </div>
    );
  }

  return (
    <Card className="border-0 animate-fade-in gradient-card">
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
        <div className="space-y-4">
          {displayExpenses.map((expense) => (
            <div
              key={expense.expense_id}
              className="mb-4 cursor-pointer transition-transform hover:scale-[1.01]"
              onClick={() => onExpenseClick?.(expense.expense_id)}
            >
              <ExpenseCard expense={expense} />
            </div>
          ))}
          {limit && expenses.length > limit && (
            <button className="w-full text-center py-2 text-sm text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80 transition-colors">
              View all expenses
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
