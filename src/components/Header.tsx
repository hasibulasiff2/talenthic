import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { useAuth } from "@/components/auth/AuthProvider";

const Header = () => {
  const { session } = useAuth();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Talenthic</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/internships" className="transition-colors hover:text-foreground/80">
              Internships
            </Link>
            <Link to="/gigs" className="transition-colors hover:text-foreground/80">
              Gigs
            </Link>
            <Link to="/collaboration" className="transition-colors hover:text-foreground/80">
              Collaboration
            </Link>
          </nav>
        </div>
        <div className="flex-1" />
        <div className="flex items-center space-x-2">
          {session ? (
            <>
              <NotificationBell />
              <Button variant="ghost" size="sm">
                Profile
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button size="sm">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;