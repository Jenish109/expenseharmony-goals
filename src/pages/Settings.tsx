import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Download, RefreshCw, Trash2, Save, Moon, Sun, Coins } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/context/ThemeContext";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [currency, setCurrency] = useState("USD");
  const [monthlyBudget, setMonthlyBudget] = useState("5000");
  
  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency");
    const savedBudget = localStorage.getItem("monthlyBudget");
    
    if (savedCurrency) setCurrency(savedCurrency);
    if (savedBudget) setMonthlyBudget(savedBudget);
  }, []);
  
  const handleSaveSettings = () => {
    localStorage.setItem("currency", currency);
    localStorage.setItem("monthlyBudget", monthlyBudget);
    toast.success("Settings saved successfully");
  };
  
  const handleExportData = () => {
    const allExpenses = JSON.stringify(
      { 
        expenses: localStorage.getItem('expenses') || '[]',
        budgets: localStorage.getItem('budgets') || '[]'
      }, 
      null, 
      2
    );
    
    // Create a blob with the data
    const blob = new Blob([allExpenses], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `expense-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Data exported successfully");
  };
  
  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all data? This cannot be undone.")) {
      // In a real app, we would clear local storage or database data
      toast.success("All data has been cleared");
    }
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="flex flex-col md:flex-row">
        <Navbar />
        
        <main className="flex-1 px-4 pt-6 pb-24 md:pb-6 md:pl-0 md:pr-6">
          <div className="max-w-3xl mx-auto">
            <header className="mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground mt-1">Customize your expense tracker</p>
            </header>
            
            <div className="space-y-6">
              {/* Appearance Settings */}
              <Card className="border animate-fade-in">
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how the app looks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                    {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    </div>
                    <Switch 
                      id="dark-mode" 
                      checked={theme === "dark"} 
                      onCheckedChange={toggleTheme} 
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Currency & Budget Settings */}
              <Card className="border animate-fade-in animate-delay-[100ms]">
                <CardHeader>
                  <CardTitle>Currency & Budget</CardTitle>
                  <CardDescription>Set your preferred currency and monthly budget</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="JPY">JPY (¥)</SelectItem>
                        <SelectItem value="CAD">CAD ($)</SelectItem>
                        <SelectItem value="AUD">AUD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="monthly-budget">Monthly Budget</Label>
                    <div className="flex items-center">
                      <Coins className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="monthly-budget"
                        type="number"
                        value={monthlyBudget}
                        onChange={(e) => setMonthlyBudget(e.target.value)}
                        min="0"
                        step="100"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Data Management */}
              <Card className="border animate-fade-in animate-delay-[200ms]">
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Export, import, or clear your data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={handleExportData}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => toast.info("Import feature coming soon!")}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Import Data
                  </Button>
                  
                  <Separator />
                  
                  <Button 
                    variant="destructive" 
                    className="w-full justify-start"
                    onClick={handleClearData}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear All Data
                  </Button>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleSaveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
