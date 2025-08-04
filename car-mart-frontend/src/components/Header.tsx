// car-mart-frontend/src/components/Header.tsx
// Complete file with Rentals link added

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
  Car
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
  const navigate = useNavigate();
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Check authentication status
  const isSignedIn = !!currentUser;

  // Load user data on component mount
  useEffect(() => {
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
      }
    }
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
    setCurrentUser(null);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileNavClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const getUserInitials = () => {
    if (currentUser?.first_name && currentUser?.last_name) {
      return `${currentUser.first_name[0] || ''}${currentUser.last_name[0] || ''}`;
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

            {/* NEW RENTALS LINK */}
            <Link to="/rentals">
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 font-medium"
              >
                Rentals
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
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search vehicles, parts, services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full bg-muted/50 border-0 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary"
              />
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {isSignedIn ? (
              <>
                {/* Favorites */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/favorites')}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Heart className="h-5 w-5" />
                </Button>

                {/* Messages */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/messages')}
                  className="text-muted-foreground hover:text-primary"
                >
                  <MessageCircle className="h-5 w-5" />
                </Button>

                {/* Add Listing */}
                <Button
                  onClick={() => navigate('/sell')}
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Sell
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      {currentUser?.avatar_url ? (
                        <img
                          className="h-8 w-8 rounded-full object-cover"
                          src={currentUser.avatar_url}
                          alt={`${currentUser.first_name} ${currentUser.last_name}`}
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                          {getUserInitials()}
                        </div>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {currentUser?.first_name} {currentUser?.last_name}
                          {currentUser?.is_verified && (
                            <span className="ml-1 text-xs text-primary">✓</span>
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
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/my-listings')}>
                      <Car className="mr-2 h-4 w-4" />
                      <span>My Listings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/login')}
                  className="text-foreground hover:text-primary"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-foreground"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search vehicles, parts, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full bg-muted/50 border-0 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary"
            />
          </form>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="lg:hidden border-t bg-card/95 backdrop-blur"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => handleMobileNavClick('/search')}
                className={`flex items-center space-x-3 text-left p-3 rounded-lg transition-colors ${
                  isActivePath('/search')
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Car className="h-5 w-5" />
                <span className="font-medium">Buy Vehicles</span>
              </button>

              {/* NEW MOBILE RENTALS LINK */}
              <button
                onClick={() => handleMobileNavClick('/rentals')}
                className={`flex items-center space-x-3 text-left p-3 rounded-lg transition-colors ${
                  isActivePath('/rentals')
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Car className="h-5 w-5" />
                <span className="font-medium">Rentals</span>
              </button>

              <button
                onClick={() => handleMobileNavClick('/parts')}
                className={`flex items-center space-x-3 text-left p-3 rounded-lg transition-colors ${
                  isActivePath('/parts')
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Settings className="h-5 w-5" />
                <span className="font-medium">Parts</span>
              </button>

              <button
                onClick={() => handleMobileNavClick('/services')}
                className={`flex items-center space-x-3 text-left p-3 rounded-lg transition-colors ${
                  isActivePath('/services')
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Search className="h-5 w-5" />
                <span className="font-medium">Services</span>
              </button>

              {/* Mobile Authentication */}
              <div className="pt-4 border-t">
                {isSignedIn ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                        {getUserInitials()}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {currentUser?.first_name} {currentUser?.last_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {currentUser?.email}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleMobileNavClick('/profile')}
                      className="flex items-center space-x-3 w-full text-left p-3 rounded-lg text-foreground hover:bg-muted transition-colors"
                    >
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </button>
                    
                    <button
                      onClick={() => handleMobileNavClick('/favorites')}
                      className="flex items-center space-x-3 w-full text-left p-3 rounded-lg text-foreground hover:bg-muted transition-colors"
                    >
                      <Heart className="h-5 w-5" />
                      <span>Favorites</span>
                    </button>
                    
                    <button
                      onClick={() => handleMobileNavClick('/messages')}
                      className="flex items-center space-x-3 w-full text-left p-3 rounded-lg text-foreground hover:bg-muted transition-colors"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>Messages</span>
                    </button>

                    <button
                      onClick={() => handleMobileNavClick('/sell')}
                      className="flex items-center space-x-3 w-full text-left p-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <Plus className="h-5 w-5" />
                      <span>Sell</span>
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full text-left p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      onClick={() => handleMobileNavClick('/login')}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                    <Button
                      onClick={() => handleMobileNavClick('/register')}
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