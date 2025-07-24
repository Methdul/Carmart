import { useState } from "react";
import { User, Settings, Heart, Eye, MessageSquare, PlusCircle, Edit, Trash2, BarChart3, Star, Car, Wrench, ArrowLeft, ChevronRight, X, Building2, Crown, Shield, Zap, CheckCircle, Upload, CreditCard } from "lucide-react";
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
import Header from "@/components/Header";
import VehicleCard from "@/components/VehicleCard";
import MessagingSystem from "@/components/MessagingSystem";
import vehicleSedan from "@/assets/vehicle-sedan.jpg";
import vehicleSuv from "@/assets/vehicle-suv.jpg";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [editingProfile, setEditingProfile] = useState(false);
  
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
  
  // Mock user data with account type
  const [user, setUser] = useState({
    id: "user1",
    name: "John Perera",
    email: "john@example.com",
    phone: "+94 77 123 4567",
    location: "Colombo",
    memberSince: "January 2022",
    rating: 4.8,
    reviewCount: 23,
    verified: true,
    avatar: "",
    bio: "Car enthusiast and collector. Specializing in premium German and Japanese vehicles.",
    accountType: "personal" // "personal" or "business"
  });

  // Mock user's listings
  const userListings = [
    {
      id: "1",
      title: "BMW 3 Series 320i Sport Line",
      price: 12500000,
      year: 2020,
      mileage: 35000,
      location: "Colombo",
      fuelType: "Petrol",
      transmission: "Automatic",
      image: vehicleSedan,
      healthScore: 92,
      sellerRating: 4.8,
      isVerified: true,
      isFeatured: true,
      views: 1234,
      inquiries: 45,
      status: "active"
    },
    {
      id: "2",
      title: "Toyota RAV4 Hybrid AWD",
      price: 15800000,
      year: 2021,
      mileage: 28000,
      location: "Colombo",
      fuelType: "Hybrid",
      transmission: "CVT",
      image: vehicleSuv,
      healthScore: 88,
      sellerRating: 4.8,
      isVerified: true,
      isFeatured: false,
      views: 856,
      inquiries: 23,
      status: "active"
    }
  ];

  const savedVehicles = [
    {
      id: "3",
      title: "Mercedes-Benz C-Class C200",
      price: 16500000,
      year: 2021,
      mileage: 22000,
      location: "Negombo",
      fuelType: "Petrol",
      transmission: "Automatic",
      image: vehicleSedan,
      healthScore: 90,
      sellerRating: 4.9,
      isVerified: true,
      isFeatured: true
    }
  ];

  const messages = [
    {
      id: "1",
      from: "Sarah Fernando",
      subject: "Inquiry about BMW 3 Series",
      preview: "Hi, I'm interested in your BMW. Is it still available?",
      time: "2 hours ago",
      unread: true,
      avatar: "",
      messages: [
        {
          id: "1",
          text: "Hi, I'm interested in your BMW. Is it still available?",
          sender: "other" as const,
          timestamp: "2 hours ago",
          status: "read" as const,
          type: "text" as const
        }
      ]
    },
    {
      id: "2",
      from: "Kamal Silva",
      subject: "RAV4 Test Drive",
      preview: "Can we arrange a test drive for this weekend?",
      time: "1 day ago",
      unread: false,
      avatar: "",
      messages: [
        {
          id: "1",
          text: "Can we arrange a test drive for this weekend?",
          sender: "other" as const,
          timestamp: "1 day ago",
          status: "read" as const,
          type: "text" as const
        }
      ]
    }
  ];

  // Business plans
  const businessPlans = [
    {
      id: "basic",
      name: "Business Basic",
      price: "Free",
      features: [
        "Unlimited listings",
        "Dealer verification badge",
        "Basic analytics",
        "Business contact display",
        "Standard support"
      ]
    },
    {
      id: "pro",
      name: "Business Pro", 
      price: "Rs. 2,500/month",
      features: [
        "Everything in Basic",
        "Featured listing discounts",
        "Priority customer support", 
        "Bulk listing tools",
        "Advanced business profile",
        "Premium placement"
      ],
      popular: true
    }
  ];

  // Listing options for the modal
  const listingOptions = [
    {
      type: "vehicle",
      title: "Vehicle",
      description: "List cars, bikes, trucks, and other vehicles",
      icon: Car,
      color: "bg-blue-500",
      route: "/list-vehicle"
    },
    {
      type: "parts",
      title: "Parts",
      description: "Sell automotive parts and accessories", 
      icon: Wrench,
      color: "bg-green-500",
      route: "/list-parts"
    },
    {
      type: "services",
      title: "Services",
      description: "Offer automotive services and repairs",
      icon: Settings,
      color: "bg-purple-500",
      route: "/list-services"
    }
  ];

  const handleListingOptionClick = (option: any) => {
    setShowListingModal(false);
    window.location.href = option.route;
  };

  // Business conversion handlers
  const handleBusinessConversion = () => {
    setShowBusinessModal(true);
    setBusinessConversionStep(1);
  };

  const handleNextStep = () => {
    if (businessConversionStep < 3) {
      setBusinessConversionStep(businessConversionStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (businessConversionStep > 1) {
      setBusinessConversionStep(businessConversionStep - 1);
    }
  };

  const handleCompleteConversion = () => {
    // Convert account to business
    setUser(prev => ({ ...prev, accountType: "business" }));
    setShowBusinessModal(false);
    setBusinessConversionStep(1);
    // Reset form data
    setBusinessFormData({
      companyName: "",
      businessType: "",
      registrationNumber: "",
      taxId: "",
      businessPhone: "",
      businessEmail: "",
      businessAddress: "",
      selectedPlan: ""
    });
  };

  const getBusinessBenefits = () => [
    { icon: Crown, text: "Dealer verification badge" },
    { icon: Zap, text: "Unlimited listings" },
    { icon: BarChart3, text: "Basic analytics dashboard" },
    { icon: Shield, text: "Priority customer support" },
    { icon: Star, text: "Featured listing discounts" },
    { icon: Building2, text: "Business contact display" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
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
                    <PlusCircle className="h-4 w-4 mr-2" />
                    My Listings
                  </Button>
                  <Button
                    variant={activeTab === "saved" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("saved")}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Saved Vehicles
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
                        {userListings.reduce((total, vehicle) => total + vehicle.views, 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Views</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-primary mb-2">
                        {userListings.reduce((total, vehicle) => total + vehicle.inquiries, 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Inquiries</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-primary mb-2">
                        {user.rating}
                      </div>
                      <div className="text-sm text-muted-foreground">Seller Rating</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      <Button 
                        className="h-12 sm:h-16 bg-primary hover:bg-primary/90 text-sm sm:text-base"
                        onClick={() => setShowListingModal(true)}
                      >
                        <PlusCircle className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                        Add New Listing
                      </Button>
                      <Button variant="outline" className="h-12 sm:h-16 text-sm sm:text-base">
                        <Eye className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                        View Analytics
                      </Button>
                      <Button variant="outline" className="h-12 sm:h-16 text-sm sm:text-base">
                        <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                        Check Messages
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">BMW 3 Series received 5 new inquiries</span>
                        <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">RAV4 Hybrid was viewed 23 times today</span>
                        <span className="text-xs text-muted-foreground ml-auto">5 hours ago</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Profile updated successfully</span>
                        <span className="text-xs text-muted-foreground ml-auto">1 day ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Listings Tab */}
            {activeTab === "listings" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">My Listings</h1>
                    <p className="text-muted-foreground">Manage and monitor your vehicle listings</p>
                  </div>
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => setShowListingModal(true)}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add New Listing
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {userListings.map((vehicle) => (
                    <div key={vehicle.id} className="bg-card border rounded-lg overflow-hidden">
                      <div className="flex">
                        <img
                          src={vehicle.image}
                          alt={vehicle.title}
                          className="w-48 h-32 object-cover"
                        />
                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">{vehicle.title}</h3>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-xl font-bold text-primary mb-2">
                            Rs. {vehicle.price.toLocaleString()}
                          </p>
                          <div className="flex justify-between text-sm text-muted-foreground mb-2">
                            <span>{vehicle.views} views</span>
                            <span>{vehicle.inquiries} inquiries</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <Badge className={vehicle.status === "active" ? 'bg-success' : 'bg-muted'}>
                              {vehicle.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Vehicles Tab */}
            {activeTab === "saved" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-primary mb-2">Saved Vehicles</h1>
                  <p className="text-muted-foreground">Keep track of vehicles you're interested in</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedVehicles.map((vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      onSave={() => {}}
                      onCompare={() => {}}
                      isSaved={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === "messages" && (
              <div className="space-y-6">
                <MessagingSystem 
                  conversations={messages} 
                  onBack={() => setActiveTab("overview")}
                />
              </div>
            )}

            {/* Profile Settings Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">Profile Settings</h1>
                    <p className="text-muted-foreground">Manage your account information</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setEditingProfile(!editingProfile)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {editingProfile ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>

                {/* Account Type Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      {user.accountType === "business" ? (
                        <Building2 className="h-5 w-5 mr-2" />
                      ) : (
                        <User className="h-5 w-5 mr-2" />
                      )}
                      Account Type
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {user.accountType === "personal" ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold">Personal Account</h4>
                              <p className="text-sm text-muted-foreground">Current plan - Individual seller</p>
                            </div>
                          </div>
                          <Badge variant="outline">Active</Badge>
                        </div>

                        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-xl font-bold text-primary mb-2">Upgrade to Business Account</h4>
                              <p className="text-muted-foreground mb-4">
                                Unlock professional features and grow your automotive business
                              </p>
                            </div>
                            <Crown className="h-8 w-8 text-yellow-500" />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                            {getBusinessBenefits().map((benefit, index) => {
                              const IconComponent = benefit.icon;
                              return (
                                <div key={index} className="flex items-center space-x-2">
                                  <IconComponent className="h-4 w-4 text-primary flex-shrink-0" />
                                  <span className="text-xs sm:text-sm">{benefit.text}</span>
                                </div>
                              );
                            })}
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                            <div className="text-xs sm:text-sm text-muted-foreground">
                              Join 500+ verified dealers on Car Mart
                            </div>
                            <Button 
                              onClick={handleBusinessConversion}
                              className="bg-primary hover:bg-primary/90 w-full sm:w-auto h-10 sm:h-12"
                            >
                              <Crown className="h-4 w-4 mr-2" />
                              Upgrade Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-green-50 to-blue-50">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold flex items-center">
                              Business Account
                              <Crown className="h-4 w-4 ml-2 text-yellow-500" />
                            </h4>
                            <p className="text-sm text-muted-foreground">Professional dealer account</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Verified Dealer</Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Profile Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                      <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="text-sm sm:text-lg">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-1 sm:space-y-0 sm:space-x-2 mb-2 sm:mb-1">
                          <h3 className="text-lg sm:text-xl font-semibold">{user.name}</h3>
                          {user.accountType === "business" && (
                            <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm font-medium">{user.rating}</span>
                            <span className="ml-1 text-sm text-muted-foreground">({user.reviewCount} reviews)</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {user.verified && (
                              <Badge className="bg-success text-xs">Verified</Badge>
                            )}
                            {user.accountType === "business" && (
                              <Badge className="bg-blue-100 text-blue-800 text-xs">Dealer</Badge>
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
                        rows={3}
                        className="text-sm sm:text-base"
                      />
                    </div>

                    {editingProfile && (
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <Button className="bg-highlight hover:bg-highlight/90 h-10 sm:h-12 text-sm sm:text-base">
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setEditingProfile(false)} className="h-10 sm:h-12 text-sm sm:text-base">
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add New Listing Modal */}
      <Dialog open={showListingModal} onOpenChange={setShowListingModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Choose Listing Type</DialogTitle>
          </DialogHeader>

          <div className="py-6">
            <p className="text-muted-foreground mb-8 text-center">
              What would you like to list? Choose the type of listing to get started.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {listingOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <Card 
                    key={option.type}
                    className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 hover:border-primary/20"
                    onClick={() => handleListingOptionClick(option)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-2">{option.title}</h3>
                      <p className="text-muted-foreground mb-4 text-sm">{option.description}</p>
                      <div className="flex items-center justify-center text-primary">
                        <span className="text-sm font-medium">Get Started</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Business Account Conversion Modal */}
      <Dialog open={showBusinessModal} onOpenChange={setShowBusinessModal}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-lg sm:text-xl">
              <Crown className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-yellow-500" />
              Upgrade to Business Account
            </DialogTitle>
          </DialogHeader>

          <div className="py-4 sm:py-6">
            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <div className="flex items-center space-x-2 sm:space-x-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm ${
                      step <= businessConversionStep ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                    }`}>
                      {step < businessConversionStep ? (
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        step
                      )}
                    </div>
                    {step < 3 && (
                      <div className={`w-6 sm:w-12 h-0.5 mx-1 sm:mx-2 ${
                        step < businessConversionStep ? 'bg-primary' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Business Information */}
            {businessConversionStep === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Business Information</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">Tell us about your business</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-sm sm:text-base">Company Name *</Label>
                    <Input
                      id="companyName"
                      placeholder="Your Company Name"
                      value={businessFormData.companyName}
                      onChange={(e) => setBusinessFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      className="h-10 sm:h-12 text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType" className="text-sm sm:text-base">Business Type *</Label>
                    <Select 
                      value={businessFormData.businessType} 
                      onValueChange={(value) => setBusinessFormData(prev => ({ ...prev, businessType: value }))}
                    >
                      <SelectTrigger className="h-10 sm:h-12">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dealer">Car Dealer</SelectItem>
                        <SelectItem value="showroom">Showroom</SelectItem>
                        <SelectItem value="parts">Parts Dealer</SelectItem>
                        <SelectItem value="service">Service Center</SelectItem>
                        <SelectItem value="rental">Car Rental</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber" className="text-sm sm:text-base">Business Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      placeholder="BR/12345678"
                      value={businessFormData.registrationNumber}
                      onChange={(e) => setBusinessFormData(prev => ({ ...prev, registrationNumber: e.target.value }))}
                      className="h-10 sm:h-12 text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="taxId" className="text-sm sm:text-base">Tax ID (Optional)</Label>
                    <Input
                      id="taxId"
                      placeholder="123456789V"
                      value={businessFormData.taxId}
                      onChange={(e) => setBusinessFormData(prev => ({ ...prev, taxId: e.target.value }))}
                      className="h-10 sm:h-12 text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessPhone" className="text-sm sm:text-base">Business Phone *</Label>
                    <Input
                      id="businessPhone"
                      placeholder="+94 11 234 5678"
                      value={businessFormData.businessPhone}
                      onChange={(e) => setBusinessFormData(prev => ({ ...prev, businessPhone: e.target.value }))}
                      className="h-10 sm:h-12 text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessEmail" className="text-sm sm:text-base">Business Email *</Label>
                    <Input
                      id="businessEmail"
                      type="email"
                      placeholder="business@company.com"
                      value={businessFormData.businessEmail}
                      onChange={(e) => setBusinessFormData(prev => ({ ...prev, businessEmail: e.target.value }))}
                      className="h-10 sm:h-12 text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessAddress" className="text-sm sm:text-base">Business Address *</Label>
                  <Textarea
                    id="businessAddress"
                    placeholder="Full business address including street, city, and postal code"
                    value={businessFormData.businessAddress}
                    onChange={(e) => setBusinessFormData(prev => ({ ...prev, businessAddress: e.target.value }))}
                    rows={3}
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Plan Selection */}
            {businessConversionStep === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Choose Your Plan</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">Select the plan that best fits your business needs</p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  {businessPlans.map((plan) => (
                    <Card 
                      key={plan.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                        businessFormData.selectedPlan === plan.id 
                          ? 'border-primary shadow-lg ring-2 ring-primary/20' 
                          : 'border hover:border-primary/50'
                      } ${plan.popular ? 'relative' : ''}`}
                      onClick={() => setBusinessFormData(prev => ({ ...prev, selectedPlan: plan.id }))}
                    >
                      {plan.popular && (
                        <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-yellow-500 text-white text-xs sm:text-sm">Most Popular</Badge>
                        </div>
                      )}
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div className="mb-4 sm:mb-0">
                            <h4 className="text-lg sm:text-xl font-bold mb-2">{plan.name}</h4>
                            <div className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-0">{plan.price}</div>
                          </div>
                          <div className="flex-1 sm:ml-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                              {plan.features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                                  <span className="text-xs sm:text-sm">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Verification & Payment */}
            {businessConversionStep === 3 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Verification & Payment</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">Complete your business verification</p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  {/* Document Upload */}
                  <Card>
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="flex items-center text-base sm:text-lg">
                        <Upload className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                        Document Upload
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 sm:p-6 text-center">
                        <Upload className="mx-auto h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground mb-2 sm:mb-3" />
                        <div className="space-y-2">
                          <h4 className="text-sm sm:text-base font-medium">Upload Business Documents</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground px-2">
                            Business registration certificate, tax documents (optional)
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Choose Files
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Supported formats: PDF, JPG, PNG (Max 5MB per file)
                      </p>
                    </CardContent>
                  </Card>

                  {/* Payment Information */}
                  <Card>
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="flex items-center text-base sm:text-lg">
                        <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                        Payment Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4">
                      {businessFormData.selectedPlan === "basic" ? (
                        <div className="text-center py-3 sm:py-4">
                          <CheckCircle className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-green-500 mb-2 sm:mb-3" />
                          <h4 className="text-sm sm:text-base font-semibold text-green-700 mb-1 sm:mb-2">Free Plan Selected</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            No payment required for the Basic plan
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3 sm:space-y-4">
                          <div className="p-3 sm:p-4 bg-muted/30 rounded-lg">
                            <div className="flex justify-between items-center mb-1 sm:mb-2">
                              <span className="text-sm sm:text-base">Business Pro Plan</span>
                              <span className="text-sm sm:text-base font-semibold">Rs. 2,500/month</span>
                            </div>
                            <div className="flex justify-between items-center text-xs sm:text-sm text-muted-foreground">
                              <span>First month</span>
                              <span>Free trial</span>
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            You'll be charged Rs. 2,500 per month after your free trial ends. Cancel anytime.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Terms & Conditions */}
                <Card>
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start space-x-3">
                      <input type="checkbox" className="mt-1 h-4 w-4" />
                      <div className="text-xs sm:text-sm">
                        <p>
                          I agree to the{" "}
                          <a href="#" className="text-primary hover:underline">Business Terms of Service</a>{" "}
                          and{" "}
                          <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 sm:pt-6 border-t">
              <Button 
                variant="outline" 
                onClick={businessConversionStep === 1 ? () => setShowBusinessModal(false) : handlePrevStep}
                className="w-full sm:w-auto h-10 sm:h-12 text-sm sm:text-base"
              >
                {businessConversionStep === 1 ? "Cancel" : "Previous"}
              </Button>
              
              <Button 
                className="bg-primary hover:bg-primary/90 w-full sm:w-auto h-10 sm:h-12 text-sm sm:text-base"
                onClick={businessConversionStep === 3 ? handleCompleteConversion : handleNextStep}
                disabled={
                  (businessConversionStep === 1 && (!businessFormData.companyName || !businessFormData.businessType || !businessFormData.businessPhone || !businessFormData.businessEmail || !businessFormData.businessAddress)) ||
                  (businessConversionStep === 2 && !businessFormData.selectedPlan)
                }
              >
                {businessConversionStep === 3 ? "Complete Upgrade" : "Next"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardPage;