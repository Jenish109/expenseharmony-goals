import { useCallback, useEffect, useState } from "react";
import { sampleExpenses, ExpenseCategory, categoryInfo, Expense } from "@/lib/data";
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
import { addExpenseIntoLocal, increasePage, setExpenses, setFilterCatagoryId, setSearchQuery } from "@/redux/expenses/expenseSlice";
import _ from 'lodash';


interface CategoryData {
  category_id: string;
  category_name: string;
  category_color: string;
}

interface ExpenseData {
  expense_id: string | null;
  category_data: CategoryData;
  expense_name: string;
  amount: number | null;
  date: string;
  created_at?: string;
}

interface RootState {
  expenses: {
    data: ExpenseData[];
    catagory_list: {
      data: CategoryData[];
    };
    page: number;
    search: string;
    filter: string | null;
    loading: boolean;
  };
}

const Expenses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);
  const [showAddExpenseDialog, setShowAddExpenseDialog] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<string | null>(null);
  const [showFutureValueDialog, setShowFutureValueDialog] = useState(false);
  const [newExpense, setNewExpense] = useState<Expense>({
    expense_id: "",
    category_data: {
      category_id: "",
      category_color: "",
      category_name: ""
    },
    expense_name: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString()
  });

  const expensesData = useSelector((state: RootState) => state.expenses.data);
  const category_data = useSelector((state: RootState) => state.expenses.catagory_list.data);
  const page = useSelector((state: RootState) => state.expenses.page);
  const search = useSelector((state: RootState) => state.expenses.search);
  const filter = useSelector((state: RootState) => state.expenses.filter);
  const loading = useSelector((state: RootState) => state.expenses.loading);
  const expense_list_fetched = useSelector((state: any) => state.expenses.expense_list_fetched);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(fetch_category_data());
  },[])

  useEffect(() => {
    dispatch(fetch_expense_data({ page: page, search: search, filter: filter }));
  }, [page, filter, search]);

  useEffect(() => {
    dispatch(setFilterCatagoryId(selectedCategory?.category_id || null));
  }, [selectedCategory, dispatch]);

  const handleAddExpense = () => {

    //remove filter tab if ny selected 
    console.log('new expense --- ',newExpense)
    //add expense into the server
    dispatch(add_expense(newExpense));
    //add expense into the local
    
    dispatch(addExpenseIntoLocal(newExpense));
    setShowAddExpenseDialog(false);
    setNewExpense({
      expense_id: "",
      expense_name: "",
      amount: 0,
      category_data: {
        category_id: "",
        category_color: "",
        category_name: ""
      },
      date: new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString()
    });
    setSelectedCategory(null)

  };

  const handleExpenseClick = (expenseId: string) => {
    setSelectedExpense(expenseId);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);

  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    
    // Check if user has scrolled to the bottom (with a small threshold)
    if (scrollHeight - scrollTop <= clientHeight + 200) {
      // Only trigger loading if not already loading
      if (!isLoadingMore && !expense_list_fetched) {
        loadMoreData();
      }
    }
  };
  
  const loadMoreData = () => {
    setIsLoadingMore(true);
    
    // Call your function to load more expenses
    // For example: fetchMoreExpenses()
    
    // Simulate loading delay
    // setTimeout(() => {
      dispatch(increasePage())
      // Add your logic to fetch and append more data
      setIsLoadingMore(false);
    // }, 400);
  };

  const debouncedSearch = useCallback(
    _.debounce((term) => {
      // Your search logic here
      dispatch(setSearchQuery(term));
      // fetchSearchResults(term) or other logic
    }, 500),
    [] // Empty dependency array means this function is created only once
  );
  


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 dark:text-white relative">
      <div className="flex flex-col md:flex-row overflow-hidden">
        <Navbar />

        <main className="ml-3 md:ml-6 flex-1 px-4 pt-6 pb-24 md:pb-6 md:pl-0 md:pr-6 h-screen overflow-scroll">
          <div className="max-w-7xl mx-auto ">
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
                      {/* <p className="text-sm text-muted-foreground mt-1">
                        Your expenses this month could be worth $1,657.76 in 10
                        years if invested at 8%!
                      </p> */}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setShowFutureValueDialog(true)}
                      className="bg-white hover:bg-white/80 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      Coming soon
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
                  onChange={(e) => handleSearch(e)}
                />
              </div>

              <div className="flex gap-2">
                {/* <Button
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
                </Button> */}

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
                          onClick={() => setSelectedCategory(null)}
                        >
                          All Categories
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {category_data?.map((category) => (
                          <DropdownMenuItem
                            key={category.category_id}
                            onClick={() => setSelectedCategory(category)}
                          >
                            {capitalizeFirstLetter(category.category_name)}
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
              <button
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm transition-colors",
                  selectedCategory === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setSelectedCategory(null)}
              >
                All Categories
              </button>
              {category_data?.map((category) => (
                <button
                  key={category.category_id}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm transition-colors",
                    selectedCategory?.category_id === category.category_id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setSelectedCategory(category)}
                >
                  {capitalizeFirstLetter(category.category_name)}
                </button>
              ))}
            </div>

            {/* Expenses List */}
            <div className="animate-fade-in">
              <Card className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold">
                      All Expenses
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {expensesData.length} {expensesData.length === 1 ? "expense" : "expenses"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent 
                  className=" p-0 pt-0 h-[550px] overflow-scroll"
                  onScroll={handleScroll}
                >
                  <TransactionList
                    expenses={expensesData}
                    title=""
                    onExpenseClick={handleExpenseClick}
                  />
                  {isLoadingMore && (
                    <div className="flex justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Future Value Simulator Dialog
      <Dialog open={showFutureValueDialog} onOpenChange={setShowFutureValueDialog}>
        <DialogContent className="max-w-md md:max-w-2xl max-h-[80vh] md:max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Future Value Simulator</DialogTitle>
            <DialogDescription>
              See how your expense could grow if invested instead
            </DialogDescription>
          </DialogHeader>
          <div className="p-2">
            <FutureValueSimulator
              expense={expensesData?.find(e => e.expense_id === selectedExpense)}
              amount={10}
              onClose={() => setShowFutureValueDialog(false)}
            />
          </div>
        </DialogContent>
      </Dialog> */}

      {/* Add Expense Dialog */}
      <Dialog open={showAddExpenseDialog} onOpenChange={setShowAddExpenseDialog}>
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
                value={newExpense.amount || ''}
                onChange={(e) =>
                  setNewExpense({
                    ...newExpense,
                    amount: e.target.value ? parseFloat(e.target.value) : null
                  })
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
                onChange={(e) => {
                  const selectedCategory = category_data?.find(
                      (cat) => cat.category_id == e.target.value
                  );

                  console.log('category data --- ',selectedCategory)

                  if (selectedCategory) {
                    setNewExpense({
                      ...newExpense,
                      category_data: selectedCategory
                    });
                  }
                }}
              >
                <option value="">Select a category</option>
                {category_data?.map((category) => (
                  <option key={category.category_id} value={category.category_id}>
                    {capitalizeFirstLetter(category.category_name)}
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
    </div>
  );
};

export default Expenses;
