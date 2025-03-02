import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Calendar,
  Settings,
  Wallet,
  Target,
  TrendingUp
} from "lucide-react";

import { cn } from "@/lib/utils";

export function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { pathname: path } = useLocation();

  return (
    <aside className="md:w-60 border-r flex-none hidden md:block bg-sidebar">
      <div className="p-3 flex flex-col h-full">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-bold text-lg">
            CASHFLOW
          </Link>
          <button
            className="md:hidden rounded-lg p-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            MENU
          </button>
        </div>

        <div className="mt-6">
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  path === "/"
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/expenses"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  path === "/expenses"
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Wallet className="h-5 w-5" />
                <span>Expenses</span>
              </Link>
            </li>
            <li>
              <Link
                to="/budgets"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  path === "/budgets"
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Home className="h-5 w-5" />
                <span>Budgets</span>
              </Link>
            </li>
            <li>
              <Link
                to="/recurring"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  path === "/recurring"
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Calendar className="h-5 w-5" />
                <span>Recurring</span>
              </Link>
            </li>
            {/* After the RecurringExpenses link */}
            <li>
              <Link
                to="/goals"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  path === "/goals"
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Target className="h-5 w-5" />
                <span>Goals</span>
              </Link>
            </li>
            <li>
              <Link
                to="/future-value"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  path === "/future-value"
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <TrendingUp className="h-5 w-5" />
                <span>Future Value</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-auto">
          <Link
            to="/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
              path === "/settings"
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
