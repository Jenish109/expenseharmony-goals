
import Navigation from "@/components/auth/Navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-4 md:py-32">
          <div className="container mx-auto text-center max-w-4xl">
            <div className="inline-block mb-6">
              <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Introducing YourBrand
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 slide-in-from-bottom">
              A beautiful, minimal design system
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto slide-in-from-bottom">
              Experience our seamless authentication system with elegant animations and pixel-perfect design that delights users.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center slide-in-from-bottom">
              {isAuthenticated ? (
                <Link to="/profile">
                  <Button size="lg" className="w-full sm:w-auto">
                    View Profile
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Key Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our authentication system provides everything you need with beautiful design and seamless user experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-xl border shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
                <p className="text-muted-foreground">
                  Industry-standard security practices to keep your users' data safe.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-xl border shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                    <path d="M5 3v4"/>
                    <path d="M19 17v4"/>
                    <path d="M3 5h4"/>
                    <path d="M17 19h4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Beautiful UI</h3>
                <p className="text-muted-foreground">
                  Elegant design with smooth animations for a delightful user experience.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-xl border shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Blazing Fast</h3>
                <p className="text-muted-foreground">
                  Optimized performance ensures quick loading times and smooth interactions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl bg-card border rounded-2xl p-8 md:p-12 shadow-sm text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the elegant authentication system today. Sign up in seconds and explore all features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <div className="text-center">
                  <p className="mb-4">Logged in as <strong>{user?.name}</strong></p>
                  <Link to="/profile">
                    <Button size="lg">Go to Profile</Button>
                  </Link>
                </div>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg">
                      Sign Up Now
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} YourBrand. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
