
import { Link } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";

const Navigation = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-castle">
            <path d="M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z"/>
            <path d="M18 11V4H6v7"/>
            <path d="M15 22v-4a3 3 0 0 0-3-3v0a3 3 0 0 0-3 3v4"/>
            <path d="M22 11V9"/>
            <path d="M2 11V9"/>
            <path d="M6 4V2"/>
            <path d="M18 4V2"/>
            <path d="M10 4V2"/>
            <path d="M14 4V2"/>
          </svg>
          <span className="font-semibold">YourBrand</span>
        </Link>

        <nav className="flex gap-6">
          <Link 
            to="/" 
            className="text-sm font-medium hover:text-primary transition-colors py-2"
          >
            Home
          </Link>
          <Link 
            to="/features" 
            className="text-sm font-medium hover:text-primary transition-colors py-2"
          >
            Features
          </Link>
          <Link 
            to="/pricing" 
            className="text-sm font-medium hover:text-primary transition-colors py-2"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="relative h-8 w-8 rounded-full"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-primary">
                    {'Jenish'}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-primary">
                    {'Jenish'}
                  </div>
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={logout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
