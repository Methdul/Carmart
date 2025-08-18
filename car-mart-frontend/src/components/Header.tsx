// car-mart-frontend/src/components/Header.tsx
// ✅ MVP READY HEADER - SERVICES ONLY

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
  BarChart3,
  Wrench
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
  role?: string;
}

interface HeaderProps {
  currentUser?: User | null;
  setCurrentUser?: (user: User | null) => void;
  isSignedIn?: boolean;
  authChecked?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  currentUser, 
  setCurrentUser, 
  isSignedIn = false,
  authChecked = true 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  // State management
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Refs for click outside detection
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  // Get search placeholder based on current page
  const getSearchPlaceholder = () => {
    return "Search for vehicle services...";
  };

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

  // Close search bar when clicking outside
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

  // Handle search submission - MVP focused on services only
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Always navigate to services for MVP
    navigate(`/services?search=${encodeURIComponent(searchQuery)}`);
    
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
    setCurrentUser?.(null);
    navigate('/');
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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

  // Loading state while auth is being checked
  if (!authChecked) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Wrench className="h-6 w-6 text-primary" />
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-primary">Vehicle Services Hub</span>
                <span className="text-xs text-muted-foreground hidden sm:block">Loading...</span>
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
          {/* ✅ UPDATED LOGO FOR MVP */}
          <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
            <Wrench className="h-6 w-6 text-primary group-hover:text-primary/80 transition-colors" />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                Vehicle Services Hub
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">Premium Services</span>
            </div>
          </Link>

          {/* ✅ DESKTOP NAVIGATION - MVP FOCUSED */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* ACTIVE - Services */}
            <Link to="/services">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 font-medium bg-primary/5 border border-primary/20"
              >
                <Wrench className="h-4 w-4 mr-1" />
                Services
              </Button>
            </Link>

            {/* DISABLED - Buy Vehicles */}
            <Button 
              variant="ghost" 
              size="sm"
              disabled
              className="text-muted-foreground cursor-not-allowed opacity-60 relative"
              title="Coming February 2025"
            >
              Buy Vehicles
              <Badge variant="secondary" className="ml-2 text-xs">Soon</Badge>
            </Button>

            {/* DISABLED - Parts */}
            <Button 
              variant="ghost" 
              size="sm"
              disabled
              className="text-muted-foreground cursor-not-allowed opacity-60"
              title="Coming March 2025"
            >
              Parts
              <Badge variant="secondary" className="ml-2 text-xs">Soon</Badge>
            </Button>

            {/* DISABLED - Rentals */}
            <Button 
              variant="ghost" 
              size="sm"
              disabled
              className="text-muted-foreground cursor-not-allowed opacity-60"
              title="Coming Q2 2025"
            >
              Rentals
              <Badge variant="secondary" className="ml-2 text-xs">Phase 2</Badge>
            </Button>

            {/* Search icon button */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleSearchBar}
              className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
              title="Search services"
            >
              <Search className="h-4 w-4" />
            </Button>
          </nav>

          {/* ✅ DESKTOP USER ACTIONS */}
          <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
            {isSignedIn ? (
              <div className="flex items-center space-x-2">
                {/* Quick Actions */}
                <Link to="/list-services">
                  <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                    <Plus className="h-4 w-4 mr-1" />
                    List Service
                  </Button>
                </Link>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={currentUser?.avatar_url} alt={getUserDisplayName()} />
                        <AvatarFallback className="text-xs">{getUserInitials()}</AvatarFallback>
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
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/auth">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?mode=provider">
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-1" />
                    Join as Provider
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* ✅ MOBILE MENU BUTTON */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="h-9 w-9 p-0"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* ✅ DESKTOP SEARCH BAR */}
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

      {/* ✅ MOBILE NAVIGATION MENU - MVP FOCUSED */}
      {mobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="lg:hidden border-t bg-card/95 backdrop-blur"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {/* ✅ MAIN NAVIGATION */}
              <div className="space-y-1">
                {/* ACTIVE - Services */}
                <button
                  onClick={() => handleMobileNavClick('/services')}
                  className="flex items-center space-x-3 w-full text-left p-3 rounded-lg transition-colors text-foreground hover:bg-muted bg-primary/5 border border-primary/20"
                >
                  <Wrench className="h-5 w-5" />
                  <span className="font-medium">Services</span>
                </button>

                {/* DISABLED FEATURES */}
                <div className="flex items-center justify-between w-full text-left p-3 rounded-lg transition-colors text-muted-foreground cursor-not-allowed opacity-60">
                  <div className="flex items-center space-x-3">
                    <Car className="h-5 w-5" />
                    <span className="font-medium">Buy Vehicles</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">Soon</Badge>
                </div>

                <div className="flex items-center justify-between w-full text-left p-3 rounded-lg transition-colors text-muted-foreground cursor-not-allowed opacity-60">
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5" />
                    <span className="font-medium">Auto Parts</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">Soon</Badge>
                </div>

                <div className="flex items-center justify-between w-full text-left p-3 rounded-lg transition-colors text-muted-foreground cursor-not-allowed opacity-60">
                  <div className="flex items-center space-x-3">
                    <Car className="h-5 w-5" />
                    <span className="font-medium">Rentals</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">Phase 2</Badge>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                {isSignedIn ? (
                  <div className="space-y-2">
                    {/* User Info */}
                    <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={currentUser?.avatar_url} />
                        <AvatarFallback>{getUserInitials()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {getUserDisplayName()}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {currentUser?.email}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleMobileNavClick('/list-services')}
                      className="flex items-center space-x-3 w-full text-left p-3 rounded-lg transition-colors bg-primary text-white hover:bg-primary/90"
                    >
                      <Plus className="h-5 w-5" />
                      <span className="font-medium">List Service</span>
                    </button>

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
                      onClick={() => handleMobileNavClick('/auth?mode=provider')}
                      className="flex items-center space-x-3 w-full text-left p-3 rounded-lg transition-colors bg-primary text-white hover:bg-primary/90"
                    >
                      <Plus className="h-5 w-5" />
                      <span className="font-medium">Join as Provider</span>
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