import { Search, Menu, User, Heart, BarChart3, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false); // This would come from auth context in real app
  
  const handleListVehicleClick = (e: React.MouseEvent) => {
    if (!isSignedIn) {
      e.preventDefault();
      navigate('/auth');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary">Car Mart</span>
              <span className="text-xs text-muted-foreground">Premium Vehicles</span>
            </div>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vehicles by make, model, or location..."
                className="pl-10 pr-4 bg-background/50"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/search">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Buy
              </Button>
            </Link>
            <Link to="/parts">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Parts
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Services
              </Button>
            </Link>
            <Link to="/compare">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                <BarChart3 className="h-4 w-4 mr-2" />
                Compare
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {isSignedIn ? (
              <Link to="/dashboard">
                <Button variant="outline" className="hidden sm:flex">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button variant="outline" className="hidden sm:flex">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
            <Link to="/list-vehicle" onClick={handleListVehicleClick}>
              <Button className="bg-highlight hover:bg-highlight/90 text-highlight-foreground">
                List Vehicle
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;