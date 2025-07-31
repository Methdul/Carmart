// car-mart-frontend/src/components/Header.tsx
// Updated with User Avatar Dropdown Menu

import { Menu, User, X, Search, LogOut, BarChart3, Plus, Car, Settings, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { authService } from "@/services/authService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  // Check authentication state on component mount and when location changes
  useEffect(() => {
    const checkAuthState = () => {
      const isLoggedIn = authService.isLoggedIn();
      const user = authService.getCurrentUser();
      
      setIsSignedIn(isLoggedIn);
      setCurrentUser(user);
      
      console.log('🔐 Auth state check:', { isLoggedIn, user: user?.email });
    };

    checkAuthState();
  }, [location.pathname]); // Re-check when navigating
  
  const handleListingTypeSelect = (type: string) => {
    // Navigate to appropriate listing page
    switch (type) {
      case 'vehicle':
        navigate('/list-vehicle');
        break;
      case 'part':
        navigate('/list-parts');
        break;
      case 'service':
        navigate('/list-services');
        break;
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsSignedIn(false);
    setCurrentUser(null);
    setIsMobileMenuOpen(false);
    navigate('/');
    console.log('🚪 User logged out');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const getUserDisplayName = () => {
    if (currentUser) {
      return `${currentUser.first_name} ${currentUser.last_name}`;
    }
    return "User";
  };

  const getUserInitials = () => {
    if (currentUser) {
      return `${currentUser.first_name?.[0] || ''}${currentUser.last_name?.[0] || ''}`;
    }
    return "U";
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
            <Link to="/search" className="relative">
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
                Parts
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
          </nav>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-sm mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search vehicles, parts, services..."
                className="pl-10 w-full bg-muted/50 border-0 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {isSignedIn ? (
              <div className="flex items-center space-x-2">
                {/* Post Listing Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Post Listing
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48" align="end">
                    <DropdownMenuLabel>What would you like to list?</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => handleListingTypeSelect('vehicle')}
                    >
                      <Car className="mr-2 h-4 w-4" />
                      <span>Vehicle</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => handleListingTypeSelect('part')}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Auto Part</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => handleListingTypeSelect('service')}
                    >
                      <Wrench className="mr-2 h-4 w-4" />
                      <span>Service</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* User Avatar Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={currentUser?.avatar} alt={getUserDisplayName()} />
                        <AvatarFallback className="bg-primary text-white font-medium">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{getUserDisplayName()}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {currentUser?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="w-full cursor-pointer">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  onClick={() => navigate('/auth')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Post Listing
                </Button>
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
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="py-4 md:hidden border-t">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search vehicles, parts, services..."
                className="pl-10 w-full"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-card">
            <div className="container mx-auto space-y-2 py-4">
              {/* Navigation Links */}
              <div className="space-y-1">
                <Link to="/search" onClick={closeMobileMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    Buy Vehicles
                  </Button>
                </Link>
                <Link to="/parts" onClick={closeMobileMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    Parts
                  </Button>
                </Link>
                <Link to="/services" onClick={closeMobileMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    Services
                  </Button>
                </Link>
                
                {/* Mobile Post Listing - Show dropdown options directly */}
                {isSignedIn ? (
                  <>
                    <div className="text-sm font-medium text-muted-foreground px-3 py-2">Post Listing</div>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-primary"
                      onClick={() => {
                        handleListingTypeSelect('vehicle');
                        closeMobileMenu();
                      }}
                    >
                      <Car className="h-4 w-4 mr-2" />
                      Vehicle
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-primary"
                      onClick={() => {
                        handleListingTypeSelect('part');
                        closeMobileMenu();
                      }}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Auto Part
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-primary"
                      onClick={() => {
                        handleListingTypeSelect('service');
                        closeMobileMenu();
                      }}
                    >
                      <Wrench className="h-4 w-4 mr-2" />
                      Service
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => navigate('/auth')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Post Listing
                  </Button>
                )}
              </div>

              {/* Authentication Section */}
              {isSignedIn ? (
                <div className="space-y-2 pt-2 border-t">
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={currentUser?.avatar} />
                      <AvatarFallback className="bg-primary text-white font-medium">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{getUserDisplayName()}</p>
                      <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
                    </div>
                  </div>
                  <Link to="/dashboard" onClick={closeMobileMenu}>
                    <Button variant="ghost" className="w-full justify-start text-left flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/auth" onClick={closeMobileMenu}>
                  <Button 
                    variant="default"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2 mt-2"
                  >
                    <User className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;