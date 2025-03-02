
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  footer?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, footer }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="absolute top-6 left-6">
        <Link 
          to="/" 
          className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
          <span>Back to home</span>
        </Link>
      </div>
      
      <div className="w-full max-w-md slide-in-from-bottom">
        <div className="flex items-center mb-8 justify-center">
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
            <span className="text-xl font-semibold">YourBrand</span>
          </Link>
        </div>

        <div className="bg-card border rounded-xl shadow-sm p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold tracking-tight mb-2">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>

          {children}
        </div>

        {footer && (
          <div className="mt-6 text-center text-sm">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
