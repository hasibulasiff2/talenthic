import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { useAuth } from "@/components/auth/AuthProvider";

const Header = () => {
  const { session } = useAuth();

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <img 
              src="/lovable-uploads/b9e32f10-62ca-49be-b5df-c05c1e950747.png" 
              alt="TalenThic Logo" 
              className="h-8"
            />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/internships" className="text-muted-foreground hover:text-secondary transition-colors">
              Internships
            </Link>
            <Link to="/gigs" className="text-muted-foreground hover:text-secondary transition-colors">
              Gigs
            </Link>
            <Link to="/collaboration" className="text-muted-foreground hover:text-secondary transition-colors">
              Collaboration
            </Link>
          </nav>
        </div>
        <div className="flex-1" />
        <div className="flex items-center space-x-2">
          {session ? (
            <>
              <NotificationBell />
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-secondary">
                Profile
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button size="sm" className="bg-primary hover:bg-primary/90">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;