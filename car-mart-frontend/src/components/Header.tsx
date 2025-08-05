// car-mart-frontend/src/components/Header.tsx
// ✅ IMPROVED STYLING VERSION - REPLACE ENTIRE FILE

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  Heart, 
  MessageCircle, 
  Plus,
  Car,
  ChevronDown,
  Bell,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string;
  account_type: 'personal' | 'business';
  is_verified: boolean;
}

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Check authentication status
  const isSignedIn = !!currentUser;

  // Load user data
  useEffect(() => {
    const loadUserData = () => {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user_data');
      
      if (token && userData) {
        try {
          const user = JSON.parse(userData);
          setCurrentUser(user);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      
      setAuthChecked(true);
    };

    loadUserData();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_token' || e.key === 'user_data') {
        loadUserData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('refresh_token');
    setCurrentUser(null);
    navigate('/');
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileNavClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const getUserInitials = () => {
    if (currentUser?.first_name && currentUser?.last_name) {
      return `${currentUser.first_name[0]}${currentUser.last_name[0]}`.toUpperCase();
    }
    return "U";
  };

  const getUserDisplayName = () => {
    if (currentUser?.first_name && currentUser?.last_name) {
      return `${currentUser.first_name} ${currentUser.last_name}`;
    }
    return currentUser?.email || "User";
  };

  // Don't render until auth is checked
  if (!authChecked) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-primary">Car Mart</span>
                <span className="text-xs text-muted-foreground hidden sm:block">Premium Vehicles</span>
              </div>
            </Link>
            <div className="animate-pulse bg-muted h-8 w-24 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* ✅ LOGO */}
          <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                Car Mart
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">Premium Vehicles</span>
            </div>
          </Link>

          {/* ✅ DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link to="/search">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                Buy Vehicles
              </Button>
            </Link>

            <Link to="/rentals">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                Rentals
              </Button>
            </Link>
            
            <Link to="/parts">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                Parts
              </Button>
            </Link>
            
            <Link to="/services">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                Services
              </Button>
            </Link>
          </nav>

          {/* ✅ DESKTOP SEARCH BAR */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search vehicles, parts, services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full bg-muted/30 border-0 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary"
              />
            </form>
          </div>

          {/* ✅ DESKTOP ACTIONS - IMPROVED STYLING */}
          <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
            {isSignedIn ? (
              <>

                {/* ✅ SELL DROPDOWN - COMPACT */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white px-3">
                      <Plus className="h-4 w-4 mr-1" />
                      Listing
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => navigate('/list-vehicle')} className="cursor-pointer">
                      <Car className="mr-2 h-4 w-4" />
                      <span>Sell Vehicle</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/list-rental')} className="cursor-pointer">
                      <Car className="mr-2 h-4 w-4" />
                      <span>Rent Out Car</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/list-parts')} className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Sell Parts</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/list-services')} className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>List Service</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* ✅ USER MENU - IMPROVED STYLING */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-9 w-9 rounded-full p-0 ml-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={currentUser?.avatar_url} alt={getUserDisplayName()} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64" align="end" forceMount>
                    {/* ✅ USER INFO HEADER */}
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium leading-none">
                            {getUserDisplayName()}
                          </p>
                          {currentUser?.is_verified && (
                            <Badge variant="secondary" className="h-4 px-1 text-xs">
                              ✓
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs leading-none text-muted-foreground">
                          {currentUser?.email}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground capitalize">
                          {currentUser?.account_type} Account
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    {/* ✅ MAIN MENU ITEMS */}
                    <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/auth')}
                  className="text-foreground hover:text-primary"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate('/auth')}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* ✅ MOBILE MENU BUTTON */}
          <div className="lg:hidden flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-foreground h-9 w-9 p-0"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* ✅ MOBILE SEARCH BAR */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search vehicles, parts, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full bg-muted/30 border-0 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary"
            />
          </form>
        </div>
      </div>

      {/* ✅ MOBILE NAVIGATION MENU - IMPROVED */}
      {mobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="lg:hidden border-t bg-card/95 backdrop-blur"
        >
          <div className="container mx-auto px-2 sm:px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {/* ✅ MAIN NAVIGATION */}
              <div className="space-y-1">
                <button
                  onClick={() => handleMobileNavClick('/search')}
                  className="flex items-center space-x-3 w-full text-left p-4 rounded-lg transition-colors text-foreground hover:bg-muted min-h-[48px]"
                >
                  <Car className="h-5 w-5" />
                  <span className="font-medium">Buy Vehicles</span>
                </button>

                <button
                  onClick={() => handleMobileNavClick('/rentals')}
                  className="flex items-center space-x-3 w-full text-left p-4 rounded-lg transition-colors text-foreground hover:bg-muted min-h-[48px]"
                >
                  <Car className="h-5 w-5" />
                  <span className="font-medium">Rentals</span>
                </button>

                <button
                  onClick={() => handleMobileNavClick('/parts')}
                  className="flex items-center space-x-3 w-full text-left p-4 rounded-lg transition-colors text-foreground hover:bg-muted min-h-[48px]"
                >
                  <Settings className="h-5 w-5" />
                  <span className="font-medium">Parts</span>
                </button>

                <button
                  onClick={() => handleMobileNavClick('/services')}
                  className="flex items-center space-x-3 w-full text-left p-3 rounded-lg transition-colors text-foreground hover:bg-muted"
                >
                  <Settings className="h-5 w-5" />
                  <span className="font-medium">Services</span>
                </button>
              </div>

              {/* ✅ MOBILE AUTHENTICATION */}
              <div className="pt-4 border-t">
                {isSignedIn ? (
                  <div className="space-y-2">
                    {/* ✅ USER INFO CARD - CLEANER */}
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={currentUser?.avatar_url} alt={getUserDisplayName()} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1">
                          <p className="text-sm font-medium truncate">
                            {getUserDisplayName()}
                          </p>
                          {currentUser?.is_verified && (
                            <Badge variant="secondary" className="h-4 px-1 text-xs flex-shrink-0">
                              ✓
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {currentUser?.email}
                        </p>
                      </div>
                    </div>
                    
                    {/* ✅ USER MENU ITEMS */}
                    <div className="space-y-1">
                      <button
                        onClick={() => handleMobileNavClick('/profile')}
                        className="flex items-center space-x-3 w-full text-left p-3 rounded-lg text-foreground hover:bg-muted transition-colors"
                      >
                        <User className="h-5 w-5" />
                        <span>Profile</span>
                      </button>
                      
                      <button
                        onClick={() => handleMobileNavClick('/dashboard')}
                        className="flex items-center space-x-3 w-full text-left p-3 rounded-lg text-foreground hover:bg-muted transition-colors"
                      >
                        <BarChart3 className="h-5 w-5" />
                        <span>Dashboard</span>
                      </button>
                      
                      <button
                        onClick={() => handleMobileNavClick('/favorites')}
                        className="flex items-center space-x-3 w-full text-left p-3 rounded-lg text-foreground hover:bg-muted transition-colors"
                      >
                        <Heart className="h-5 w-5" />
                        <span>Saved Items</span>
                      </button>
                      
                      <button
                        onClick={() => handleMobileNavClick('/messages')}
                        className="flex items-center space-x-3 w-full text-left p-3 rounded-lg text-foreground hover:bg-muted transition-colors"
                      >
                        <MessageCircle className="h-5 w-5" />
                        <span>Messages</span>
                      </button>
                    </div>

                    {/* ✅ LISTING OPTIONS */}
                    <div className="pt-3 border-t">
                      <p className="text-xs font-medium text-muted-foreground mb-2 px-3">CREATE LISTING</p>
                      
                      <div className="space-y-1">
                        <button
                          onClick={() => handleMobileNavClick('/list-vehicle')}
                          className="flex items-center space-x-3 w-full text-left p-3 rounded-lg text-foreground hover:bg-muted transition-colors"
                        >
                          <Car className="h-5 w-5" />
                          <span>Sell Vehicle</span>
                        </button>

                        <button
                          onClick={() => handleMobileNavClick('/list-rental')}
                          className="flex items-center space-x-3 w-full text-left p-3 rounded-lg text-foreground hover:bg-muted transition-colors"
                        >
                          <Car className="h-5 w-5" />
                          <span>Rent Out Car</span>
                        </button>

                        <button
                          onClick={() => handleMobileNavClick('/list-parts')}
                          className="flex items-center space-x-3 w-full text-left p-3 rounded-lg text-foreground hover:bg-muted transition-colors"
                        >
                          <Settings className="h-5 w-5" />
                          <span>Sell Parts</span>
                        </button>

                        <button
                          onClick={() => handleMobileNavClick('/list-services')}
                          className="flex items-center space-x-3 w-full text-left p-3 rounded-lg text-foreground hover:bg-muted transition-colors"
                        >
                          <Settings className="h-5 w-5" />
                          <span>List Service</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* ✅ LOGOUT */}
                    <div className="pt-3 border-t">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full text-left p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      onClick={() => handleMobileNavClick('/auth')}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                    <Button
                      onClick={() => handleMobileNavClick('/auth')}
                      className="w-full justify-start bg-primary hover:bg-primary/90"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;