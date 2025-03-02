
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Plus, Save } from "lucide-react";
import { ExpenseCategory, categoryInfo } from "@/lib/data";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";

interface RecurringExpense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  active: boolean;
}

interface RecurringExpenseFormProps {
  onSave: (expense: RecurringExpense) => void;
  initialData?: RecurringExpense;
}

export function RecurringExpenseForm({ onSave, initialData }: RecurringExpenseFormProps) {
  const [expense, setExpense] = useState<RecurringExpense>(
    initialData || {
      id: crypto.randomUUID(),
      description: '',
      amount: 0,
      category: 'other',
      frequency: 'monthly',
      startDate: new Date(),
      active: true
    }
  );
  
  const [date, setDate] = useState<Date | undefined>(expense.startDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!expense.description) {
      toast.error("Please enter a description");
      return;
    }
    
    if (expense.amount <= 0) {
      toast.error("Amount must be greater than zero");
      return;
    }
    
    onSave({
      ...expense,
      startDate: date || new Date()
    });
    
    toast.success("Recurring expense saved");
  };
  
  const handleChange = (key: keyof RecurringExpense, value: any) => {
    setExpense(prev => ({ ...prev, [key]: value }));
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          placeholder="Monthly subscription"
          value={expense.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          placeholder="0.00"
          min="0"
          step="0.01"
          value={expense.amount || ''}
          onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select 
          value={expense.category} 
          onValueChange={(value: ExpenseCategory) => handleChange('category', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(categoryInfo).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="frequency">Frequency</Label>
        <Select 
          value={expense.frequency} 
          onValueChange={(value: 'daily' | 'weekly' | 'monthly' | 'yearly') => 
            handleChange('frequency', value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Start Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <Button type="submit" className="w-full">
        <Save className="mr-2 h-4 w-4" />
        Save Recurring Expense
      </Button>
    </form>
  );
}
