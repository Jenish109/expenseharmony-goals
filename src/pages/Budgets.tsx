import { useCallback, useEffect, useState } from "react";
import { ExpenseCategory, sampleBudgets } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { BudgetGoal } from "@/components/BudgetGoal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, ArrowUp, ArrowDown, DollarSign } from "lucide-react";
import { TransactionList } from "@/components/TransactionList";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { add_budget, fetch_budget_data } from "@/redux/budget/budgetThunk";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { capitalizeFirstLetter } from "@/helper/helper";
import { fetch_category_data } from "@/redux/expenses/expenseThunk";
import _ from "lodash";
import { addBudgetInLocal, setbudgetSearch } from "@/redux/budget/budgetSlice";
const Budgets = () => {
  const budgetData = useSelector((state: any) => state.budget.data);
  const search = useSelector((state: any) => state.budget.search);
  const budget_list = useSelector(
    (state: any) => state.budget.budget_list
  );
  const category_data = useSelector(
    (state: any) => state.expenses.catagory_list.data
  );

  const [showAddBudgetDialog, setShowAddBudgetDialog] = useState(false);
  const [newBudget, setNewBudget] = useState({
    amount: null,
    budget_id: null,
    category_data: {
      category_id: null,
      category_name: "",
      category_color: "",
    },
    current_amount: null,
    date: new Date().toISOString().split("T")[0],
  });

  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(fetch_category_data());
  },[])

  useEffect(() => {
    dispatch(fetch_budget_data({search:search}));
  }, [search]);

  const [filterQuery, setFilterQuery] = useState("");

  const percentUsed = Math.round(
    (budgetData?.spent_amount / budgetData?.total_budget) * 100
  );

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddBudget = () => {
    dispatch(add_budget(newBudget));
    dispatch(addBudgetInLocal(newBudget));

    // Show future value impact notification
      // const amount = parseFloat(newBudget.amount);
      // const futureAmount = amount * 1.5; // Simple approximation for notification

    setNewBudget({
      amount: null,
      budget_id: null,
      category_data: {
        category_id: null,
        category_name: "",
        category_color: "",
      },
      current_amount: null,
      date: new Date().toISOString().split("T")[0],
    });
    setShowAddBudgetDialog(false);
  };


  const debouncedSearch = useCallback(
    _.debounce((term) => {
      // Your search logic here
      dispatch(setbudgetSearch(term));
      // fetchSearchResults(term) or other logic
    }, 500),
    [] // Empty dependency array means this function is created only once
  );

  const handlebudgetSearch = (text) =>{
    debouncedSearch(text);
    setFilterQuery(text);
  }



  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 dark:text-white relative">
      <div className="flex flex-col md:flex-row">
        <Navbar />

        <main className="ml-3 md:ml-6 flex-1 px-4 pt-6 pb-24 md:pb-6 md:pl-0 md:pr-8 h-screen overflow-scroll">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
              <p className="text-muted-foreground mt-1">
                Set and track your spending limits
              </p>
            </header>

            {/* Budget Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
              <Card className="border shadow-md  backdrop-blur animate-scale-in bg-white/90 dark:border-slate-800 dark:bg-slate-950">
                <CardContent className="p-6 ">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Total Budget
                    </h3>
                    <div className="p-2 bg-primary/10 rounded-full">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">
                    {formatCurrency(budgetData?.total_budget || 0)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Monthly allocation
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-md bg-white/90 backdrop-blur animate-scale-in dark:border-slate-800 dark:bg-slate-950">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Spent So Far
                    </h3>
                    <div className="p-2 bg-red-500/10 rounded-full">
                      <ArrowUp className="h-5 w-5 text-red-500" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">
                    {formatCurrency(budgetData?.spent_amount || 0)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {percentUsed}% of total budget
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-md bg-white/90 backdrop-blur animate-scale-in dark:border-slate-800 dark:bg-slate-950">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Remaining
                    </h3>
                    <div className="p-2 bg-green-500/10 rounded-full">
                      <ArrowDown className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">
                    {formatCurrency(budgetData?.remaining_amount || 0)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Available to spend
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Budget Overview */}
            <Card className="mb-8 border shadow-lg bg-white/95 backdrop-blur-md animate-fade-in dark:border-slate-800 dark:bg-slate-950">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold">
                    Monthly Budget Overview
                  </CardTitle>
                  <Button
                    size="sm"
                    className="shadow-sm"
                    onClick={() => setShowAddBudgetDialog(true)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Budget
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row justify-between mb-2">
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-primary"></div>
                      <span>
                        Used: {formatCurrency(budgetData?.spent_amount)}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-slate-200"></div>
                      <span>
                        Remaining:{" "}
                        {formatCurrency(budgetData?.remaining_amount)}
                      </span>
                    </div>
                  </div>

                  <Progress value={percentUsed} className="h-3 bg-slate-200" />

                  <div className="flex justify-between text-sm mt-1">
                    <span
                      className={
                        percentUsed > 80
                          ? "text-red-500 font-medium"
                          : percentUsed > 50
                          ? "text-amber-500 font-medium"
                          : "text-green-500 font-medium"
                      }
                    >
                      {percentUsed}% used
                    </span>
                    <span className="text-muted-foreground">
                      {formatCurrency(budgetData?.spent_amount)} of{" "}
                      {formatCurrency(budgetData?.total_budget)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search and Budget Goals Grid */}
            <div className="mb-6 animate-fade-in">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-xl font-semibold">Budget Categories</h2>
                <div className="relative w-full md:w-64">
                  <Input
                    type="text"
                    placeholder="Search categories..."
                    value={filterQuery}
                    onChange={(e) => handlebudgetSearch(e.target.value)}
                    className="w-full shadow-sm border dark:border-slate-800 dark:bg-slate-950 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {budget_list?.map((budget, index) => (
                  <div
                    key={budget.budget_id}
                    className={`animate-fade-in`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <BudgetGoal budget={budget} />
                  </div>
                ))}
              </div>
            </div>

            {/* Add Expense Dialog */}
            <Dialog
              open={showAddBudgetDialog}
              onOpenChange={setShowAddBudgetDialog}
            >
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Budget</DialogTitle>
                  <DialogDescription>
                    Add your budget for the month
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="amount" className="text-sm font-medium">
                      Amount
                    </label>
                    <Input
                      id="amount"
                      placeholder="0.00"
                      value={newBudget.amount}
                      onChange={(e) =>
                        setNewBudget({ ...newBudget, amount: e.target.value })
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
                      value={newBudget.category_data.category_id}
                      onChange={(e) => {
                        console.log(e.target);

                        const selectedCategory = category_data.find(
                          (cat) => cat.category_id == e.target.value
                        );

                        setNewBudget({
                          ...newBudget,
                          category_data: selectedCategory,
                        });
                      }}
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
                  {/* <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium">
                      Date
                    </label>
                    <Input
                      id="date"
                      type="date"
                      value={newBudget.date}
                      onChange={(e) =>
                        setNewBudget({ ...newBudget, date: e.target.value })
                      }
                      className="dark:[&::-webkit-calendar-picker-indicator]:invert dark:[&::-webkit-calendar-picker-indicator]:opacity-100"
                    />
                  </div> */}
                </div>
                <DialogFooter className="sm:justify-end">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowAddBudgetDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleAddBudget}
                    disabled={!newBudget.amount || !newBudget.category_data}
                  >
                    Add Budget
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Budgets;
