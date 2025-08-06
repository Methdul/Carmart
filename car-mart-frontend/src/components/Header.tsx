// car-mart-frontend/src/components/Header.tsx
// ✅ ORIGINAL FILE WITH ONLY SEARCH MODIFICATIONS

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
  const [searchBarOpen, setSearchBarOpen] = useState(false); // ✅ NEW: Search bar toggle state
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname; 
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null); // ✅ NEW: Search bar ref

  // Check authentication status
  const isSignedIn = currentUser !== null;

  // ✅ NEW: Context-aware search placeholder
  const getSearchPlaceholder = () => {
    const path = location.pathname;
    
    if (path.includes('/vehicles') || path.includes('/search') || path === '/') {
      return "Search vehicles...";
    } else if (path.includes('/rentals')) {
      return "Search rental vehicles...";
    } else if (path.includes('/parts')) {
      return "Search parts...";
    } else if (path.includes('/services')) {
      return "Search services...";
    } else {
      return "Search vehicles, parts, services...";
    }
  };

  // ✅ NEW: Context-aware search redirect
  const getSearchRedirectPath = () => {
    const path = location.pathname;
    
    if (path.includes('/vehicles') || path.includes('/search') || path === '/') {
      return '/vehicles';
    } else if (path.includes('/rentals')) {
      return '/rentals';
    } else if (path.includes('/parts')) {
      return '/parts';
    } else if (path.includes('/services')) {
      return '/services';
    } else {
      return '/vehicles';
    }
  };

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        
        if (token && userData) {
          const user = JSON.parse(userData);
          setCurrentUser(user);
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [mobileMenuOpen]);

  // ✅ NEW: Close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setSearchBarOpen(false);
      }
    };

    if (searchBarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [searchBarOpen]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Navigate to appropriate page based on current location
    if (pathname.includes('/parts')) {
      navigate(`/parts?search=${encodeURIComponent(searchQuery)}`);
    } else if (pathname.includes('/services')) {
      navigate(`/services?search=${encodeURIComponent(searchQuery)}`);
    } else {
      // Default to vehicles page
      navigate(`/vehicles?search=${encodeURIComponent(searchQuery)}`);
    }
    
    // Close mobile menu and search bar
    setMobileMenuOpen(false);
    setSearchBarOpen(false);
    
    // Clear search input
    setSearchQuery('');
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

  // ✅ NEW: Toggle search bar function
  const toggleSearchBar = () => {
    setSearchBarOpen(!searchBarOpen);
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

            {/* ✅ NEW: Search icon button */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleSearchBar}
              className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
            >
              <Search className="h-4 w-4" />
            </Button>
          </nav>

          {/* ✅ DESKTOP ACTIONS - IMPROVED STYLING */}
          <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
            {isSignedIn ? (
              <>

                {/* ✅ LIST ITEM DROPDOWN - COMPACT */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white px-3">
                      <Plus className="h-4 w-4 mr-1" />
                      List Item
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => navigate('/list-vehicle')} className="cursor-pointer">
                      <Car className="mr-2 h-4 w-4" />
                      <span>List Vehicle</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/list-rental')} className="cursor-pointer">
                      <Car className="mr-2 h-4 w-4" />
                      <span>List Rental</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/list-parts')} className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>List Parts</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/list-services')} className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>List Services</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* ✅ FAVORITES */}
                <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                  <Heart className="h-4 w-4" />
                </Button>

                {/* ✅ USER MENU - IMPROVED STYLING */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={currentUser?.avatar_url} alt={getUserDisplayName()} />
                        <AvatarFallback className="text-xs">{getUserInitials()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none flex items-center gap-2">
                          {getUserDisplayName()}
                          {currentUser?.is_verified && (
                            <Badge variant="secondary" className="text-xs px-1 py-0">
                              ✓
                            </Badge>
                          )}
                        </p>
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

        {/* ✅ NEW: Professional search bar in separate row - toggleable */}
        {searchBarOpen && (
          <div ref={searchBarRef} className="pb-4 pt-2 border-t border-border/40 animate-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="search"
                  placeholder={getSearchPlaceholder()}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 w-full h-12 text-base bg-background border-2 border-border/50 focus-visible:border-primary focus-visible:ring-0 shadow-sm rounded-lg"
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}

        {/* ✅ MOBILE SEARCH BAR */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder={getSearchPlaceholder()}
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
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {/* ✅ MAIN NAVIGATION */}
              <div className="space-y-1">
                <button
                  onClick={() => handleMobileNavClick('/search')}
                  className="flex items-center space-x-3 w-full text-left p-3 rounded-lg transition-colors text-foreground hover:bg-muted"
                >
                  <Car className="h-5 w-5" />
                  <span className="font-medium">Buy Vehicles</span>
                </button>

                <button
                  onClick={() => handleMobileNavClick('/rentals')}
                  className="flex items-center space-x-3 w-full text-left p-3 rounded-lg transition-colors text-foreground hover:bg-muted"
                >
                  <Car className="h-5 w-5" />
                  <span className="font-medium">Rentals</span>
                </button>

                <button
                  onClick={() => handleMobileNavClick('/parts')}
                  className="flex items-center space-x-3 w-full text-left p-3 rounded-lg transition-colors text-foreground hover:bg-muted"
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
                    <div className="flex items-center space-x-3 p-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={currentUser?.avatar_url} alt={getUserDisplayName()} />
                        <AvatarFallback className="text-xs">{getUserInitials()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate flex items-center gap-2">
                          {getUserDisplayName()}
                          {currentUser?.is_verified && (
                            <Badge variant="secondary" className="text-xs px-1 py-0">
                              ✓
                            </Badge>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground truncate capitalize">
                          {currentUser?.account_type} Account
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleMobileNavClick('/dashboard')}
                      className="flex items-center space-x-3 w-full text-left p-3 rounded-lg transition-colors text-foreground hover:bg-muted"
                    >
                      <BarChart3 className="h-5 w-5" />
                      <span className="font-medium">Dashboard</span>
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full text-left p-3 rounded-lg transition-colors text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => handleMobileNavClick('/auth')}
                      className="flex items-center space-x-3 w-full text-left p-3 rounded-lg transition-colors text-foreground hover:bg-muted"
                    >
                      <User className="h-5 w-5" />
                      <span className="font-medium">Sign In</span>
                    </button>
                    <button
                      onClick={() => handleMobileNavClick('/auth')}
                      className="flex items-center space-x-3 w-full text-left p-3 rounded-lg transition-colors bg-primary text-white hover:bg-primary/90"
                    >
                      <Plus className="h-5 w-5" />
                      <span className="font-medium">Sign Up</span>
                    </button>
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