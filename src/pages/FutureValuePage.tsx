
import { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FutureValueSimulator } from "@/components/FutureValueSimulator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { sampleExpenses } from '@/lib/data';
import { calculateFutureValue, calculateWorkHours } from '@/lib/futureValue';
import { DollarSign, Clock, TrendingUp, Calculator, BarChart4 } from "lucide-react";
import { toast } from "sonner";

const FutureValuePage = () => {
  const [hourlyRate, setHourlyRate] = useState(25); // Default hourly rate
  const [activeTab, setActiveTab] = useState('simulator');
  
  // Total monthly spending
  const totalSpent = sampleExpenses.reduce((total, expense) => total + expense.amount, 0);
  
  // Total future value (simple calculation)
  const totalFutureValue = calculateFutureValue(totalSpent, 0.08, 10, 12);
  
  // Hours worked calculation
  const hoursWorked = calculateWorkHours(totalSpent, hourlyRate);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50 relative">
      <div className="flex flex-col md:flex-row">
        <Navbar />
        
        <main className="flex-1 px-4 pt-6 pb-24 md:pb-6 md:pl-0 md:pr-6">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold tracking-tight">Future Value Tools</h1>
              <p className="text-muted-foreground mt-1">Understand the future impact of your spending decisions</p>
            </header>
            
            {/* Spending Impact Summary */}
            <div className="grid gap-6 md:grid-cols-3 mb-8 animate-fade-in">
              <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Monthly Spending</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
                      <p className="text-sm text-muted-foreground">Current month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Future Value (10yrs)</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <p className="text-2xl font-bold text-primary">{formatCurrency(totalFutureValue)}</p>
                      <p className="text-sm text-muted-foreground">If invested at 8%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Work Hours Equivalent</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-2xl font-bold">{hoursWorked.toFixed(1)} hours</p>
                      <p className="text-sm text-muted-foreground">At ${hourlyRate}/hour</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Tools Tabs */}
            <Tabs defaultValue="simulator" className="animate-fade-in" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="simulator" className="flex items-center">
                  <Calculator className="h-4 w-4 mr-2" />
                  Future Value Simulator
                </TabsTrigger>
                <TabsTrigger value="timeline" className="flex items-center">
                  <BarChart4 className="h-4 w-4 mr-2" />
                  Expense Growth Timeline
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="simulator">
                <div className="grid gap-6 md:grid-cols-5">
                  <div className="md:col-span-3">
                    <FutureValueSimulator />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Card className="border h-full shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold">Understanding Future Value</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          The future value calculator helps you understand the real cost of spending now versus investing for the future.
                        </p>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Try these scenarios:</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
                            <li>What if you invested your daily coffee money for 10 years?</li>
                            <li>How much would your monthly subscription services be worth in 20 years?</li>
                            <li>What if you cut your dining budget by half and invested the difference?</li>
                          </ul>
                        </div>
                        
                        <div className="pt-2">
                          <Button 
                            variant="outline" 
                            className="w-full" 
                            onClick={() => toast.info("Try our Smart Skip Challenges to start saving!", {
                              description: "Coming soon!"
                            })}
                          >
                            Start a Saving Challenge
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="timeline">
                <Card className="border">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Expense Growth Timeline</CardTitle>
                  </CardHeader>
                  <CardContent className="py-8">
                    <div className="flex flex-col items-center justify-center text-center space-y-3">
                      <BarChart4 className="h-16 w-16 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Growth Timeline Coming Soon</h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Soon you'll be able to see how your past expenses could have grown if invested, helping you make better spending decisions.
                      </p>
                      <Button 
                        className="mt-4"
                        onClick={() => setActiveTab('simulator')}
                      >
                        Try the Simulator Instead
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FutureValuePage;
