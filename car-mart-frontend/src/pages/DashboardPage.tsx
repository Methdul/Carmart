import { useState, useEffect } from "react";
import { User, Settings, Heart, Eye, MessageSquare, PlusCircle, Edit, Trash2, BarChart3, Star, Car, Wrench, ArrowLeft, ChevronRight, X, Building2, Crown, Shield, Zap, CheckCircle, Upload, CreditCard, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";
import VehicleCard from "@/components/VehicleCard";
import MessagingSystem from "@/components/MessagingSystem";
import { authService } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import vehicleSedan from "@/assets/vehicle-sedan.jpg";
import vehicleSuv from "@/assets/vehicle-suv.jpg";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [editingProfile, setEditingProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // New state for listing modal
  const [showListingModal, setShowListingModal] = useState(false);
  const [selectedListingType, setSelectedListingType] = useState<string | null>(null);
  
  // Business account conversion states
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
  
  // Real user state (replacing mock data)
  const [user, setUser] = useState<any>(null);
  
  // Load real user data
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        setError("");

        // Check if user is logged in
        if (!authService.isLoggedIn()) {
          navigate('/auth');
          return;
        }

        // Get user from localStorage
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser({
            id: currentUser.id,
            name: `${currentUser.first_name} ${currentUser.last_name}`,
            email: currentUser.email,
            phone: currentUser.phone || "+94 77 123 4567",
            location: currentUser.location || "Colombo",
            memberSince: currentUser.created_at ? 
              new Date(currentUser.created_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
              }) : "January 2024",
            rating: 4.8, // Default values until we implement reviews
            reviewCount: 0,
            verified: currentUser.is_verified || false,
            avatar: "",
            bio: "Car enthusiast and marketplace member",
            accountType: currentUser.account_type || "personal",
            totalListings: 0,
            totalViews: 0,
            totalInquiries: 0
          });
        } else {
          throw new Error("User data not found");
        }

      } catch (error) {
        console.error("Failed to load user data:", error);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  // Mock listings data (will be replaced with real API calls later)
  const userListings = [
    {
      id: "1",
      title: "BMW 3 Series 320i",
      price: 4500000,
      year: 2020,
      image: vehicleSedan,
      status: "active",
      views: 245,
      inquiries: 12,
      type: "vehicle"
    },
    {
      id: "2", 
      title: "Toyota RAV4 Hybrid",
      price: 8500000,
      year: 2022,
      image: vehicleSuv,
      status: "active",
      views: 189,
      inquiries: 8,
      type: "vehicle"
    }
  ];

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Loading your dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <p className="text-destructive mb-4">{error || "User not found"}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
      setUser({ ...user, accountType: "business" });
      setShowBusinessModal(false);
      setBusinessConversionStep(1);
    }
  };

  const handleListingTypeSelect = (type: string) => {
    setSelectedListingType(type);
    setShowListingModal(false);
    
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-primary text-white text-lg">
                      {user.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-primary">{user.name}</h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{user.rating}</span>
                        <span className="text-sm text-muted-foreground">({user.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      {user.verified && (
                        <Badge className="bg-success text-xs">Verified</Badge>
                      )}
                      {user.accountType === "business" && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">Business</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <Button
                    variant={activeTab === "overview" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("overview")}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Overview
                  </Button>
                  <Button
                    variant={activeTab === "listings" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("listings")}
                  >
                    <Car className="h-4 w-4 mr-2" />
                    My Listings
                  </Button>
                  <Button
                    variant={activeTab === "favorites" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("favorites")}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Favorites
                  </Button>
                  <Button
                    variant={activeTab === "messages" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("messages")}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Messages
                  </Button>
                  <Button
                    variant={activeTab === "profile" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("profile")}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Profile Settings
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-primary mb-2">Dashboard Overview</h1>
                  <p className="text-muted-foreground">Manage your listings and track your performance</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-primary mb-2">
                        {userListings.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Active Listings</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-primary mb-2">
                        {userListings.reduce((total, item) => total + item.views, 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Views</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-primary mb-2">
                        {userListings.reduce((total, item) => total + item.inquiries, 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Inquiries</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-primary mb-2">
                        {user.rating}
                      </div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Button 
                        className="h-20 flex flex-col items-center justify-center space-y-2"
                        onClick={() => setShowListingModal(true)}
                      >
                        <PlusCircle className="h-6 w-6" />
                        <span>Create Listing</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex flex-col items-center justify-center space-y-2"
                        onClick={() => setActiveTab("messages")}
                      >
                        <MessageSquare className="h-6 w-6" />
                        <span>Messages</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex flex-col items-center justify-center space-y-2"
                        onClick={() => setActiveTab("profile")}
                      >
                        <Settings className="h-6 w-6" />
                        <span>Settings</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Listings */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
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
                    {userListings.length > 0 ? (
                      <div className="space-y-4">
                        {userListings.slice(0, 3).map((listing) => (
                          <div key={listing.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                            <img 
                              src={listing.image} 
                              alt={listing.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold">{listing.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                Rs. {listing.price.toLocaleString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">{listing.views} views</div>
                              <div className="text-sm text-muted-foreground">{listing.inquiries} inquiries</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">No listings yet</p>
                        <Button onClick={() => setShowListingModal(true)}>
                          Create Your First Listing
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Business Account Upgrade */}
                {user.accountType === "personal" && (
                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-5 w-5 text-primary" />
                        <CardTitle className="text-primary">Upgrade to Business Account</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Unlock premium features for your automotive business
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline">Priority Support</Badge>
                        <Badge variant="outline">Advanced Analytics</Badge>
                        <Badge variant="outline">Bulk Listings</Badge>
                        <Badge variant="outline">Featured Placement</Badge>
                      </div>
                      <Button onClick={handleBusinessConversion}>
                        <Crown className="h-4 w-4 mr-2" />
                        Upgrade Now
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* My Listings Tab */}
            {activeTab === "listings" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">My Listings</h1>
                    <p className="text-muted-foreground">Manage your vehicles, parts, and services</p>
                  </div>
                  <Button onClick={() => setShowListingModal(true)}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Listing
                  </Button>
                </div>

                {userListings.length > 0 ? (
                  <div className="space-y-4">
                    {userListings.map((listing) => (
                      <Card key={listing.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={listing.image} 
                              alt={listing.title}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
                              <p className="text-xl font-bold text-primary mb-2">
                                Rs. {listing.price.toLocaleString()}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span className="flex items-center">
                                  <Eye className="h-4 w-4 mr-1" />
                                  {listing.views} views
                                </span>
                                <span className="flex items-center">
                                  <MessageSquare className="h-4 w-4 mr-1" />
                                  {listing.inquiries} inquiries
                                </span>
                                <Badge 
                                  variant={listing.status === "active" ? "default" : "secondary"}
                                  className="capitalize"
                                >
                                  {listing.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No listings yet</h3>
                      <p className="text-muted-foreground mb-6">Start selling by creating your first listing</p>
                      <Button onClick={() => setShowListingModal(true)}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create Your First Listing
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Profile Settings Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">Profile Settings</h1>
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

                {/* Profile Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                      <div className="relative">
                        <Avatar className="w-20 h-20 sm:w-24 sm:h-24">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="text-lg">
                            {user.name.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {editingProfile && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                          >
                            <Upload className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-2">
                          <h3 className="text-lg sm:text-xl font-semibold">{user.name}</h3>
                          <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                            {user.verified && (
                              <Badge className="bg-success text-xs">Verified</Badge>
                            )}
                            {user.accountType === "business" && (
                              <Badge className="bg-blue-100 text-blue-800 text-xs">Business</Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-1">Member since {user.memberSince}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm sm:text-base">Full Name</Label>
                        <Input
                          id="name"
                          value={user.name}
                          disabled={!editingProfile}
                          className="h-10 sm:h-12 text-sm sm:text-base"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={user.email}
                          disabled={!editingProfile}
                          className="h-10 sm:h-12 text-sm sm:text-base"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm sm:text-base">Phone</Label>
                        <Input
                          id="phone"
                          value={user.phone}
                          disabled={!editingProfile}
                          className="h-10 sm:h-12 text-sm sm:text-base"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-sm sm:text-base">Location</Label>
                        <Input
                          id="location"
                          value={user.location}
                          disabled={!editingProfile}
                          className="h-10 sm:h-12 text-sm sm:text-base"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-sm sm:text-base">Bio</Label>
                      <Textarea
                        id="bio"
                        value={user.bio}
                        disabled={!editingProfile}
                        className="min-h-[100px] text-sm sm:text-base"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === "messages" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-primary mb-2">Messages</h1>
                  <p className="text-muted-foreground">Communicate with buyers and sellers</p>
                </div>
                  <Card>
                    <CardContent className="text-center py-12">
                      <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Messages Coming Soon</h3>
                      <p className="text-muted-foreground mb-6">Real-time messaging will be available in the next update</p>
                      <Button variant="outline" disabled>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Messaging System
                      </Button>
                    </CardContent>
                  </Card>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === "favorites" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-primary mb-2">Favorites</h1>
                  <p className="text-muted-foreground">Your saved vehicles, parts, and services</p>
                </div>
                <Card>
                  <CardContent className="text-center py-12">
                    <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
                    <p className="text-muted-foreground mb-6">Save items you're interested in to view them here</p>
                    <Button onClick={() => navigate('/search')}>
                      Browse Listings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Listing Type Selection Modal */}
      <Dialog open={showListingModal} onOpenChange={setShowListingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>What would you like to list?</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 py-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleListingTypeSelect('vehicle')}
            >
              <Car className="h-8 w-8" />
              <span>Vehicle</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleListingTypeSelect('part')}
            >
              <Settings className="h-8 w-8" />
              <span>Auto Part</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleListingTypeSelect('service')}
            >
              <Wrench className="h-8 w-8" />
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