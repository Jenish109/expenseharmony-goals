import { useEffect, useState } from "react";
import { sampleExpenses, ExpenseCategory, categoryInfo } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { TransactionList } from "@/components/TransactionList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, ArrowUpDown, Filter, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { FutureValueSimulator } from "@/components/FutureValueSimulator";
import { useDispatch, useSelector } from "react-redux";
import { add_expense, fetch_category_data, fetch_expense_data } from "@/redux/expenses/expenseThunk";
import { capitalizeFirstLetter } from "@/helper/helper";
// import {
//   fetch_category_data,
//   fetch_expense_data,
// } from "@/redux/expenses/expenseThunk";

// Define a custom type that can be either an ExpenseCategory or 'all'
type CategoryFilter = ExpenseCategory | "all";

const Expenses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("all");
  const [showAddExpenseDialog, setShowAddExpenseDialog] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<string | null>(null);
  const [showFutureValueDialog, setShowFutureValueDialog] = useState(false);
  const [newExpense, setNewExpense] = useState({
      expense_id: null,
      category_data: {
          category_id: "",
          category_color: "",
          category_name: ""
      },
      expense_name: "",
      amount: null,
      date: new Date().toISOString().split("T")[0],
  });

  const expensesData = useSelector((state: any) => state.expenses.data);
  const category_data = useSelector(
    (state: any) => state.expenses.catagory_list.data
  );
  const dispatch = useDispatch();

  console.log("category_data", category_data);

  useEffect(() => {
    dispatch(fetch_expense_data());
    dispatch(fetch_category_data());
  }, [dispatch]);

  // Filter and sort expenses
  const filteredExpenses:any = category_data?
    .filter((expense) => {
      const matchesSearch = expense?.expense_name?
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        expense?.category_data?.category_id === selectedCategory?.category_id;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });


  const handleAddExpense = () => {
    
    dispatch(add_expense(newExpense));
    

    // Show future value impact notification
    const amount = parseFloat(newExpense.amount);
    const futureAmount = amount * 1.5; // Simple approximation for notification

    // setTimeout(() => {
    //   toast("See the future impact?", {
    //     expense_name: `This $${amount.toFixed(
    //       2
    //     )} could be $${futureAmount.toFixed(2)} in 5 years if invested!`,
    //     action: {
    //       label: "See more",
    //       onClick: () => setShowFutureValueDialog(true),
    //     },
    //   });
    // }, 1000);

    // Close the dialog and reset form
    setShowAddExpenseDialog(false);
    setNewExpense({
      expense_id: null,
      expense_name: "",
      amount: null,
      category_data: {
        category_id: "",
        category_color: "",
        category_name: ""
      },
      date: new Date().toISOString().split("T")[0],
    });
  };

  // Function to handle clicking on an expense
  const handleExpenseClick = (expenseId: string) => {
    setSelectedExpense(expenseId);
    // Find the expense
    const expense = sampleExpenses.find((e) => e.id === expenseId);
    if (expense) {
      // Show future value dialog
      setShowFutureValueDialog(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 dark:text-white relative">
      <div className="flex flex-col md:flex-row">
        <Navbar />

        <main className="ml-3 md:ml-6 flex-1 px-4 pt-6 pb-24 md:pb-6 md:pl-0 md:pr-6 h-screen overflow-scroll">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
              <p className="text-muted-foreground mt-1">
                Track and manage your spending
              </p>
            </header>

            {/* Future Value Insights Card */}
            <div className="mb-6 animate-fade-in">
              <Card className="border bg-gradient-to-r from-primary/10 to-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <TrendingUp className="text-primary h-5 w-5" />
                        Future Value Insight
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your expenses this month could be worth $1,657.76 in 10
                        years if invested at 8%!
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setShowFutureValueDialog(true)}
                      className="bg-white hover:bg-white/80 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      Simulate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 animate-fade-in">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search expenses..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                  }
                  className="w-10 h-10"
                  title={
                    sortOrder === "asc"
                      ? "Sort Newest First"
                      : "Sort Oldest First"
                  }
                >
                  <ArrowUpDown className="h-4 w-4 " />
                </Button>

                <div className="relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-10 h-10"
                      >
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => setSelectedCategory("all")}
                        >
                          All Categories
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {category_data
                          ?.filter((cat) => cat !== "all")
                          .map((category) => (
                            <DropdownMenuItem
                              key={category?.category_id}
                              onClick={() => setSelectedCategory(category)}
                            >
                              {capitalizeFirstLetter(category?.category_name)}
                            </DropdownMenuItem>
                          ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <Button
                className="gap-1"
                onClick={() => setShowAddExpenseDialog(true)}
              >
                <Plus className="h-4 w-4" />
                Add Expense
              </Button>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2 mb-6 animate-fade-in">
              {category_data?.map((category) => (
                <button
                  key={category?.category_id}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm transition-colors",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setSelectedCategory(category)}
                >
                  {capitalizeFirstLetter(category?.category_name)}
                </button>
              ))}
            </div>

            {/* Expenses List */}
            <div className="animate-fade-in">
              <Card className=" overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold">
                      All Expenses
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {filteredExpenses?.length}{" "}
                      {filteredExpenses?.length === 1 ? "expense" : "expenses"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <TransactionList
                    expenses={expensesData?.data}
                    title=""
                    onExpenseClick={handleExpenseClick}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Add Expense Dialog */}
      <Dialog
        open={showAddExpenseDialog}
        onOpenChange={setShowAddExpenseDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Expense</DialogTitle>
            <DialogDescription>
              Enter the details of your new expense
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Input
                id="description"
                placeholder="What did you spend on?"
                value={newExpense.expense_name}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, expense_name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Amount
              </label>
              <Input
                id="amount"
                placeholder="0.00"
                value={newExpense.amount}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, amount: e.target.value })
                }
                type="number"
                min="0"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <select
                id="category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newExpense.category_data.category_id}
                onChange={(e) =>{
                  console.log(e.target)
                  setNewExpense({
                    ...newExpense,
                    category_data:{...newExpense.category_data, category_id: e.target.value as ExpenseCategory},
                  })}
                }
              >
                {category_data
                  ?.filter((cat) => cat !== "all")
                  .map((category) => (
                    <option
                      key={category?.category_id}
                      value={category?.category_id}
                    >
                      {capitalizeFirstLetter(category?.category_name)}
                    </option>
                  ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">
                Date
              </label>
              <Input
                id="date"
                type="date"
                value={newExpense.date}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, date: e.target.value })
                }
                className="dark:[&::-webkit-calendar-picker-indicator]:invert dark:[&::-webkit-calendar-picker-indicator]:opacity-100"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowAddExpenseDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddExpense}
              disabled={!newExpense.expense_name || !newExpense.amount}
            >
              Add Expense
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Future Value Simulator Dialog */}
      <Dialog
        open={showFutureValueDialog}
        onOpenChange={setShowFutureValueDialog}
      >
        <DialogContent className="max-w-md md:max-w-2xl  max-h-[80vh] md:max-h-[90vh] overflow-y-auto ">
          <DialogHeader>
            <DialogTitle>Future Value Simulator</DialogTitle>
            <DialogDescription>
              See how your expense could grow if invested instead
            </DialogDescription>
          </DialogHeader>
          <div className="p-2">
            {" "}
            {/* Added padding here */}
            <FutureValueSimulator
              expense={
                selectedExpense
                  ? sampleExpenses.find((e) => e.id === selectedExpense)
                  : undefined
              }
              amount={10}
              onClose={() => setShowFutureValueDialog(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Expenses;
