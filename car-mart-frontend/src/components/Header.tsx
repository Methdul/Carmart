import { Menu, User, Heart, BarChart3, UserCheck, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const handleListVehicleClick = (e: React.MouseEvent) => {
    if (!isSignedIn) {
      e.preventDefault();
      navigate('/auth');
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                Car Mart
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">Premium Vehicles</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/search">
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 font-medium"
              >
                Buy Vehicles
              </Button>
            </Link>
            <Link to="/parts">
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 font-medium"
              >
                Auto Parts
              </Button>
            </Link>
            <Link to="/services">
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 font-medium"
              >
                Services
              </Button>
            </Link>
            <Link to="/compare">
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 font-medium flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Compare
              </Button>
            </Link>
          </nav>

          {/* Desktop User Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Favorites */}
            <Link to="/dashboard">
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </Link>

            {isSignedIn ? (
              <div className="flex items-center space-x-2">
                <Link to="/list-vehicle" onClick={handleListVehicleClick}>
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  >
                    List Vehicle
                  </Button>
                </Link>
                <Link to="/dashboard?tab=profile">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  >
                    <UserCheck className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/list-vehicle" onClick={handleListVehicleClick}>
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  >
                    List Vehicle
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button 
                    variant="default"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Mobile Search Toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Mobile List Vehicle Button */}
            <Link to="/list-vehicle" onClick={handleListVehicleClick}>
              <Button 
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs px-3"
              >
                List
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="lg:hidden py-3 border-t">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vehicles..."
                className="pl-10 pr-4"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-card/95 backdrop-blur">
            <nav className="py-4 space-y-2">
              {/* Navigation Links */}
              <Link to="/search" onClick={closeMobileMenu}>
                <Button variant="ghost" className="w-full justify-start text-left">
                  Buy Vehicles
                </Button>
              </Link>
              <Link to="/parts" onClick={closeMobileMenu}>
                <Button variant="ghost" className="w-full justify-start text-left">
                  Auto Parts
                </Button>
              </Link>
              <Link to="/services" onClick={closeMobileMenu}>
                <Button variant="ghost" className="w-full justify-start text-left">
                  Services
                </Button>
              </Link>
              <Link to="/compare" onClick={closeMobileMenu}>
                <Button variant="ghost" className="w-full justify-start text-left flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Compare
                </Button>
              </Link>
              <Link to="/dashboard" onClick={closeMobileMenu}>
                <Button variant="ghost" className="w-full justify-start text-left flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Saved Vehicles
                </Button>
              </Link>

              {/* Divider */}
              <div className="border-t my-3"></div>

              {/* User Actions */}
              {isSignedIn ? (
                <div className="space-y-2">
                  <Link to="/dashboard?tab=profile" onClick={closeMobileMenu}>
                    <Button variant="ghost" className="w-full justify-start text-left flex items-center gap-2">
                      <UserCheck className="h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setIsSignedIn(false);
                      closeMobileMenu();
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/auth" onClick={closeMobileMenu}>
                  <Button 
                    variant="default"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;