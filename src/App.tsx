import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/auth/index";
import Expenses from "./pages/Expenses";
import Budgets from "./pages/Budgets";
import Settings from "./pages/Settings";
import RecurringExpenses from "./pages/RecurringExpenses";
import NotFound from "./pages/NotFound";
import { SplashScreen } from "./components/SplashScreen";
import GoalsPage from "./pages/GoalsPage";
import FutureValuePage from "./pages/FutureValuePage";
import { ThemeProvider } from "./context/ThemeContext";
import PrivateRoute from "./components/auth/PrivateRoute";
import Signup from "./pages/auth/SignUp";
import Profile from "./pages/auth/Profile";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Index";
import Login from "./pages/auth/Login";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  // Check if the user has seen the splash screen before
  useEffect(() => {
    const hasSeenSplash = localStorage.getItem("hasSeenSplash");
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    localStorage.setItem("hasSeenSplash", "true");
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected routes */}
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/expenses"
                  element={
                    <PrivateRoute>
                      <Expenses />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/budgets"
                  element={
                    <PrivateRoute>
                      <Budgets />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/recurring"
                  element={
                    <PrivateRoute>
                      <RecurringExpenses />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/goals"
                  element={
                    <PrivateRoute>
                      <GoalsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/future-value"
                  element={
                    <PrivateRoute>
                      <FutureValuePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <PrivateRoute>
                      <Settings />
                    </PrivateRoute>
                  }
                />

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
