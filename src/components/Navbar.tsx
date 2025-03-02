
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronUp, LayoutDashboard, DollarSign, PieChart, Settings, CalendarClock, Cog } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [expanded, setExpanded] = useState(false);

  const routes = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      href: '/',
    },
    {
      title: 'Expenses',
      icon: DollarSign,
      href: '/expenses',
    },
    {
      title: 'Budgets',
      icon: PieChart,
      href: '/budgets',
    },
    {
      title: 'Recurring',
      icon: CalendarClock,
      href: '/recurring',
    },
    {
      title: 'Settings',
      icon: Cog,
      href: '/settings',
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 p-4 md:relative md:p-0">
      {/* Mobile Bottom Navigation Bar */}
      <Card className="md:hidden glass-card shadow-lg border-0 animate-fade-in">
        <CardContent className="p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 w-full justify-around">
              {routes.map((route) => (
                <NavLink
                  key={route.href}
                  to={route.href}
                  className={({ isActive }) =>
                    cn(
                      "flex flex-col items-center p-2 rounded-lg transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    )
                  }
                >
                  <route.icon size={20} />
                  <span className="text-xs mt-1">{route.title}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Desktop Sidebar */}
      <div className="hidden md:block h-screen sticky top-0">
        <Card className={cn(
          "h-full w-[240px] rounded-r-2xl border-r border-t-0 border-l-0 border-b-0 transition-all duration-300 bg-white/90 backdrop-blur-md",
          expanded ? "w-[240px]" : "w-[80px]"
        )}>
          <CardContent className="p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8 mt-2">
              <div className={cn(
                "font-semibold text-lg transition-opacity",
                expanded ? "opacity-100" : "opacity-0"
              )}>
                BudgetTracker
              </div>
              <button 
                onClick={() => setExpanded(!expanded)}
                className="p-2 rounded-full hover:bg-accent transition-colors"
              >
                {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            </div>
            
            <div className="space-y-2">
              {routes.map((route) => (
                <NavLink
                  key={route.href}
                  to={route.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center p-3 rounded-lg transition-all",
                      isActive ? "bg-accent text-accent-foreground" : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                    )
                  }
                >
                  <route.icon size={20} className="shrink-0" />
                  <span className={cn(
                    "ml-3 transition-opacity duration-200",
                    expanded ? "opacity-100" : "opacity-0"
                  )}>
                    {route.title}
                  </span>
                </NavLink>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
