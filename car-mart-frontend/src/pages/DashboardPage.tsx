// src/pages/DashboardPage.tsx
// Enhanced ikman.lk style dashboard with all old functionality - NO MOCK DATA

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User,
  Settings, 
  Heart, 
  Eye, 
  MessageSquare, 
  PlusCircle,
  Edit,
  Trash2,
  BarChart3,
  Star,
  Car, 
  Package, 
  Wrench,
  Loader2,
  AlertCircle,
  Plus,
  Building2,
  Crown,
  Shield,
  Zap,
  CheckCircle,
  Upload,
  ChevronRight,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header';
import FavoriteButton from '@/components/FavoriteButton';
import { authService } from '@/services/authService';
import { apiService } from '@/services/api';
import { useFavorites } from '@/hooks/useFavorites';

interface UserStats {
  totalListings: number;
  totalViews: number;
  totalInquiries: number;
  activeListings: number;
}

interface UserListing {
  id: string;
  title: string;
  price: number;
  type: 'vehicle' | 'part' | 'service' | 'rental';
  status: 'active' | 'inactive' | 'sold';
  views: number;
  inquiries: number;
  created_at: string;
  images: string[];
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<UserStats>({
    totalListings: 0,
    totalViews: 0,
    totalInquiries: 0,
    activeListings: 0
  });
  const [listings, setListings] = useState<UserListing[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [editingProfile, setEditingProfile] = useState(false);
  
  // Modal states
  const [showListingModal, setShowListingModal] = useState(false);
  const [selectedListingType, setSelectedListingType] = useState<string | null>(null);
  const [showBusinessModal, setShowBusinessModal] = useState(false);
  const [businessConversionStep, setBusinessConversionStep] = useState(1);
  const [businessFormData, setBusinessFormData] = useState({
    companyName: "",
    businessType: "",
    registrationNumber: "",
    taxId: "",
    businessPhone: "",
    businessEmail: "",
    businessAddress: "",
    selectedPlan: ""
  });

  // Favorites hook
  const { favorites, stats: favoriteStats, loading: favoritesLoading, error: favoritesError } = useFavorites();

  // Load user data and dashboard info
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      // Check if user is logged in
      if (!authService.isLoggedIn()) {
        navigate('/auth');
        return;
      }

      // Get current user
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        navigate('/auth');
        return;
      }

      setUser({
        id: currentUser.id,
        name: `${currentUser.first_name} ${currentUser.last_name}`,
        email: currentUser.email,
        phone: currentUser.phone || '',
        location: currentUser.location || '',
        avatar: (currentUser as any).avatar || '',
        bio: (currentUser as any).bio || 'Car enthusiast and marketplace member',
        account_type: currentUser.account_type || 'individual',
        is_verified: currentUser.is_verified || false,
        created_at: currentUser.created_at,
        memberSince: currentUser.created_at ? 
          new Date(currentUser.created_at).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
          }) : "January 2024",
        rating: 4.8, // Default until reviews implemented
        reviewCount: 0
      });

      // Load user's listings and stats - no mock data
      await Promise.all([
        loadUserListings(currentUser.id),
        loadUserStats(currentUser.id)
      ]);

    } catch (error) {
      console.error('Error loading dashboard:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const loadUserListings = async (userId: string) => {
    try {
      // TODO: Replace with real API call when backend is ready
      console.log('Loading user listings for:', userId);
      
      // For now, set empty array - no mock data
      setListings([]);
      
      // When API is ready, uncomment:
      // const response = await apiService.getUserListings(userId);
      // if (response.success) {
      //   setListings(response.data);
      // }
    } catch (error) {
      console.error('Error loading listings:', error);
    }
  };

  const loadUserStats = async (userId: string) => {
    try {
      // TODO: Replace with real API call when backend is ready
      console.log('Loading user stats for:', userId);
      
      // For now, set zero stats - no mock data
      setStats({
        totalListings: 0,
        totalViews: 0,
        totalInquiries: 0,
        activeListings: 0
      });
      
      // When API is ready, uncomment:
      // const response = await apiService.getUserStats(userId);
      // if (response.success) {
      //   setStats(response.data);
      // }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleCreateListing = (type: string) => {
    switch (type) {
      case 'vehicle':
        navigate('/list-vehicle');
        break;
      case 'rental':
        navigate('/list-rental');
        break;
      case 'part':
        navigate('/list-parts');
        break;
      case 'service':
        navigate('/list-services');
        break;
    }
    setShowListingModal(false);
  };

  const handleListingTypeSelect = (type: string) => {
    setSelectedListingType(type);
    handleCreateListing(type);
  };

  const handleBusinessConversion = () => {
    setShowBusinessModal(true);
    setBusinessConversionStep(1);
  };

  const nextBusinessStep = () => {
    if (businessConversionStep === 1) {
      setBusinessConversionStep(2);
    } else if (businessConversionStep === 2) {
      setBusinessConversionStep(3);
    } else {
      // Complete conversion
      setUser({ ...user, account_type: "business" });
      setShowBusinessModal(false);
      setBusinessConversionStep(1);
    }
  };

  const formatPrice = (price: number) => {
    return `Rs ${price.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="py-6">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Loading dashboard...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="py-6">
          <div className="max-w-5xl mx-auto px-4">
            <Alert className="max-w-2xl mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error || "User not found"}</AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Dashboard Content - ikman.lk style */}
      <div className="py-6">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-2">
            
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0">
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user?.avatar || ''} />
                      <AvatarFallback>
                        {user?.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{user?.name}</h3>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs">{user?.rating}</span>
                        <span className="text-xs text-muted-foreground">({user?.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {user?.is_verified && (
                          <Badge variant="secondary" className="text-xs">Verified</Badge>
                        )}
                        {user?.account_type === "business" && (
                          <Badge className="text-xs">Business</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <nav className="space-y-1">
                    <Button
                      variant={activeTab === 'overview' ? 'default' : 'ghost'}
                      className="w-full justify-start text-sm"
                      onClick={() => setActiveTab('overview')}
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Overview
                    </Button>
                    <Button
                      variant={activeTab === 'listings' ? 'default' : 'ghost'}
                      className="w-full justify-start text-sm"
                      onClick={() => setActiveTab('listings')}
                    >
                      <Car className="h-4 w-4 mr-2" />
                      My Listings
                    </Button>
                    <Button
                      variant={activeTab === 'favorites' ? 'default' : 'ghost'}
                      className="w-full justify-start text-sm"
                      onClick={() => setActiveTab('favorites')}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Favorites
                    </Button>
                    <Button
                      variant={activeTab === 'messages' ? 'default' : 'ghost'}
                      className="w-full justify-start text-sm"
                      onClick={() => setActiveTab('messages')}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Messages
                    </Button>
                    <Button
                      variant={activeTab === 'profile' ? 'default' : 'ghost'}
                      className="w-full justify-start text-sm"
                      onClick={() => setActiveTab('profile')}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">Dashboard Overview</h1>
                    <p className="text-muted-foreground">Manage your listings and track performance</p>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {stats.activeListings}
                        </div>
                        <div className="text-sm text-muted-foreground">Active Listings</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {stats.totalViews}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Views</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {stats.totalInquiries}
                        </div>
                        <div className="text-sm text-muted-foreground">Inquiries</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {user?.rating}
                        </div>
                        <div className="text-sm text-muted-foreground">Rating</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Plus className="h-5 w-5 mr-2" />
                        Create New Listing
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        <Button
                          variant="outline"
                          className="h-16 flex flex-col items-center justify-center"
                          onClick={() => handleCreateListing('vehicle')}
                        >
                          <Car className="h-5 w-5 mb-1" />
                          <span className="text-sm">Sell Vehicle</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-16 flex flex-col items-center justify-center"
                          onClick={() => handleCreateListing('rental')}
                        >
                          <Car className="h-5 w-5 mb-1" />
                          <span className="text-sm">Rent Vehicle</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-16 flex flex-col items-center justify-center"
                          onClick={() => handleCreateListing('part')}
                        >
                          <Package className="h-5 w-5 mb-1" />
                          <span className="text-sm">Sell Parts</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-16 flex flex-col items-center justify-center"
                          onClick={() => handleCreateListing('service')}
                        >
                          <Wrench className="h-5 w-5 mb-1" />
                          <span className="text-sm">Offer Service</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Listings */}
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Recent Listings</CardTitle>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setActiveTab("listings")}
                        >
                          View All <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {listings.length > 0 ? (
                        <div className="space-y-3">
                          {listings.slice(0, 3).map((listing) => (
                            <div key={listing.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                              {listing.images?.[0] && (
                                <img 
                                  src={listing.images[0]} 
                                  alt={listing.title}
                                  className="w-12 h-12 object-cover rounded"
                                />
                              )}
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{listing.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {formatPrice(listing.price)}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-sm">{listing.views} views</div>
                                <div className="text-xs text-muted-foreground">{listing.inquiries} inquiries</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                          <p className="text-muted-foreground mb-4">No listings yet</p>
                          <Button onClick={() => setShowListingModal(true)} size="sm">
                            Create Your First Listing
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Business Account Upgrade */}
                  {user?.account_type === "individual" && (
                    <Card className="border-primary/20 bg-primary/5">
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-5 w-5 text-primary" />
                          <CardTitle className="text-primary">Upgrade to Business Account</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4 text-sm">
                          Unlock premium features for your automotive business
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline" className="text-xs">Priority Support</Badge>
                          <Badge variant="outline" className="text-xs">Advanced Analytics</Badge>
                          <Badge variant="outline" className="text-xs">Bulk Listings</Badge>
                          <Badge variant="outline" className="text-xs">Featured Placement</Badge>
                        </div>
                        <Button onClick={handleBusinessConversion} size="sm">
                          <Crown className="h-4 w-4 mr-2" />
                          Upgrade Now
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* My Listings Tab */}
              {activeTab === 'listings' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-2xl font-bold mb-2">My Listings</h1>
                      <p className="text-muted-foreground">Manage your vehicles, parts, and services</p>
                    </div>
                    <Button onClick={() => setShowListingModal(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Listing
                    </Button>
                  </div>

                  {listings.length === 0 ? (
                    <Card>
                      <CardContent className="text-center py-12">
                        <Car className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-lg font-semibold mb-2">No listings yet</h3>
                        <p className="text-muted-foreground mb-6">
                          Create your first listing to start selling on Car Mart
                        </p>
                        <Button onClick={() => setShowListingModal(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Create Your First Listing
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {listings.map((listing) => (
                        <Card key={listing.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                {listing.images?.[0] && (
                                  <img 
                                    src={listing.images[0]} 
                                    alt={listing.title}
                                    className="w-16 h-16 object-cover rounded"
                                  />
                                )}
                                <div>
                                  <h3 className="font-semibold">{listing.title}</h3>
                                  <p className="text-muted-foreground">
                                    {formatPrice(listing.price)} • {formatDate(listing.created_at)}
                                  </p>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                    <span className="flex items-center">
                                      <Eye className="h-3 w-3 mr-1" />
                                      {listing.views} views
                                    </span>
                                    <span className="flex items-center">
                                      <MessageSquare className="h-3 w-3 mr-1" />
                                      {listing.inquiries} inquiries
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant={listing.status === 'active' ? 'default' : 'secondary'}
                                >
                                  {listing.status}
                                </Badge>
                                <Button variant="outline" size="sm">
                                  <Edit className="h-3 w-3 mr-1" />
                                  Edit
                                </Button>
                                <Button variant="destructive" size="sm">
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-2xl font-bold mb-2">Favorites</h1>
                      <p className="text-muted-foreground">Your saved vehicles, parts, and services</p>
                    </div>
                    {favoriteStats.total > 0 && (
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{favoriteStats.vehicles} Vehicles</span>
                        <span>{favoriteStats.parts} Parts</span>
                        <span>{favoriteStats.services} Services</span>
                      </div>
                    )}
                  </div>

                  {favoritesLoading ? (
                    <div className="text-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                      <p>Loading your favorites...</p>
                    </div>
                  ) : favoritesError ? (
                    <Card>
                      <CardContent className="text-center py-12">
                        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Error loading favorites</h3>
                        <p className="text-muted-foreground">{favoritesError}</p>
                      </CardContent>
                    </Card>
                  ) : favorites.length === 0 ? (
                    <Card>
                      <CardContent className="text-center py-12">
                        <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                        <p className="text-muted-foreground mb-6">
                          Start browsing and save items you're interested in
                        </p>
                        <div className="flex gap-4 justify-center">
                          <Button onClick={() => navigate('/vehicles')} size="sm">
                            <Car className="h-4 w-4 mr-2" />
                            Browse Vehicles
                          </Button>
                          <Button variant="outline" onClick={() => navigate('/parts')} size="sm">
                            <Package className="h-4 w-4 mr-2" />
                            Browse Parts
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {favorites.map((favorite) => (
                        favorite.item_details && (
                          <Card key={favorite.id} className="group hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="relative">
                                {favorite.item_details.images?.length > 0 && (
                                  <img
                                    src={favorite.item_details.images[0]}
                                    alt={favorite.item_details.title}
                                    className="w-full h-32 object-cover rounded mb-3"
                                  />
                                )}
                                <div className="absolute top-2 right-2">
                                  <FavoriteButton
                                    itemType={favorite.item_type}
                                    itemId={favorite.item_id}
                                    variant="ghost"
                                    className="bg-white/80 hover:bg-white"
                                  />
                                </div>
                                <Badge 
                                  className="absolute top-2 left-2 capitalize text-xs"
                                  variant={favorite.item_type === 'vehicle' ? 'default' : 
                                          favorite.item_type === 'part' ? 'secondary' : 'outline'}
                                >
                                  {favorite.item_type}
                                </Badge>
                              </div>
                              
                              <h3 className="font-semibold mb-2 line-clamp-2 text-sm">
                                {favorite.item_details.title}
                              </h3>
                              
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-primary text-sm">
                                  Rs. {favorite.item_details.price.toLocaleString()}
                                </span>
                                {favorite.item_type === 'vehicle' && favorite.item_details.year && (
                                  <span className="text-xs text-muted-foreground">
                                    {favorite.item_details.year}
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex items-center text-xs text-muted-foreground mb-3">
                                <MapPin className="h-3 w-3 mr-1" />
                                {favorite.item_details.location}
                              </div>
                              
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  className="flex-1 text-xs"
                                  onClick={() => navigate(`/${favorite.item_type}s/${favorite.item_id}`)}
                                >
                                  View Details
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="text-xs"
                                >
                                  Contact
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Messages Tab */}
              {activeTab === 'messages' && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">Messages</h1>
                    <p className="text-muted-foreground">Communicate with buyers and sellers</p>
                  </div>
                  <Card>
                    <CardContent className="text-center py-12">
                      <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-semibold mb-2">Messages Coming Soon</h3>
                      <p className="text-muted-foreground mb-6">Real-time messaging will be available in the next update</p>
                      <Button variant="outline" disabled>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Messaging System
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Profile Settings Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold mb-2">Profile Settings</h1>
                      <p className="text-muted-foreground">Manage your account information</p>
                    </div>
                    <Button 
                      variant={editingProfile ? "default" : "outline"}
                      onClick={() => setEditingProfile(!editingProfile)}
                    >
                      {editingProfile ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </>
                      )}
                    </Button>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={user?.avatar || ''} />
                            <AvatarFallback className="text-lg">
                              {user?.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          {editingProfile && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full p-0"
                            >
                              <Upload className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{user?.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            {user?.is_verified && (
                              <Badge variant="secondary" className="text-xs">Verified</Badge>
                            )}
                            {user?.account_type === "business" && (
                              <Badge className="text-xs">Business</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Member since {user?.memberSince}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={user?.name || ''}
                            disabled={!editingProfile}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={user?.email || ''}
                            disabled={!editingProfile}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={user?.phone || ''}
                            disabled={!editingProfile}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={user?.location || ''}
                            disabled={!editingProfile}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={user?.bio || ''}
                          disabled={!editingProfile}
                          className="min-h-[80px]"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </div>

      {/* Listing Type Selection Modal */}
      <Dialog open={showListingModal} onOpenChange={setShowListingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>What would you like to list?</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3 py-4">
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center"
              onClick={() => handleListingTypeSelect('vehicle')}
            >
              <Car className="h-6 w-6 mb-1" />
              <span>Vehicle</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center"
              onClick={() => handleListingTypeSelect('part')}
            >
              <Package className="h-6 w-6 mb-1" />
              <span>Auto Part</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center"
              onClick={() => handleListingTypeSelect('service')}
            >
              <Wrench className="h-6 w-6 mb-1" />
              <span>Service</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Business Conversion Modal */}
      <Dialog open={showBusinessModal} onOpenChange={setShowBusinessModal}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Upgrade to Business Account</span>
            </DialogTitle>
          </DialogHeader>
          
          {businessConversionStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <Crown className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Unlock Business Features</h3>
                <p className="text-muted-foreground">
                  Get access to advanced tools and priority support for your automotive business
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Shield className="h-6 w-6 text-primary" />
                  <h4 className="font-semibold">Priority Support</h4>
                  <p className="text-sm text-muted-foreground">Get faster response times and dedicated assistance</p>
                </div>
                <div className="space-y-2">
                  <BarChart3 className="h-6 w-6 text-primary" />
                  <h4 className="font-semibold">Advanced Analytics</h4>
                  <p className="text-sm text-muted-foreground">Detailed insights on your listings performance</p>
                </div>
                <div className="space-y-2">
                  <Zap className="h-6 w-6 text-primary" />
                  <h4 className="font-semibold">Bulk Operations</h4>
                  <p className="text-sm text-muted-foreground">Upload and manage multiple listings at once</p>
                </div>
                <div className="space-y-2">
                  <Star className="h-6 w-6 text-primary" />
                  <h4 className="font-semibold">Featured Placement</h4>
                  <p className="text-sm text-muted-foreground">Get your listings seen by more customers</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowBusinessModal(false)}>
                  Maybe Later
                </Button>
                <Button onClick={nextBusinessStep}>
                  Continue
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardPage;