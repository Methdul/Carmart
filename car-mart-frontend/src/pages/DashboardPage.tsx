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

  // NEW Mock user's listings with updated data
  const userListings = [
    {
      id: "1",
      title: "Lexus ES 350 F Sport",
      price: 18500000,
      year: 2022,
      mileage: 15000,
      location: "Colombo",
      fuelType: "Petrol",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      healthScore: 94,
      sellerRating: 4.9,
      isVerified: true,
      isFeatured: true,
      views: 2156,
      inquiries: 67,
      status: "active"
    },
    {
      id: "2",
      title: "Infiniti QX60 Premium",
      price: 21800000,
      year: 2023,
      mileage: 8000,
      location: "Kandy",
      fuelType: "Petrol",
      transmission: "CVT",
      image: "https://images.unsplash.com/photo-1570611178717-4c68f8ffe4b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      healthScore: 91,
      sellerRating: 4.7,
      isVerified: true,
      isFeatured: false,
      views: 1384,
      inquiries: 34,
      status: "active"
    }
  ];

  // NEW Saved vehicles with updated data
  const savedVehicles = [
    {
      id: "3",
      title: "Ford Mustang GT Premium",
      price: 24500000,
      year: 2022,
      mileage: 12000,
      location: "Galle",
      fuelType: "Petrol",
      transmission: "Manual",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      healthScore: 89,
      sellerRating: 4.8,
      isVerified: true,
      isFeatured: true
    }
  ];

  // NEW Messages with updated data
  const messages = [
    {
      id: "1",
      from: "Ravi Perera",
      subject: "Inquiry about Lexus ES 350",
      preview: "Hi, I'm very interested in your Lexus. Is the F Sport package included?",
      time: "3 hours ago",
      unread: true,
      avatar: "",
      messages: [
        {
          id: "1",
          text: "Hi, I'm very interested in your Lexus. Is the F Sport package included?",
          sender: "other" as const,
          timestamp: "3 hours ago",
          status: "read" as const,
          type: "text" as const
        }
      ]
    },
    {
      id: "2", 
      from: "Priya Silva",
      subject: "QX60 Test Drive Request",
      preview: "Can we schedule a test drive for the Infiniti QX60 this weekend?",
      time: "1 day ago",
      unread: false,
      avatar: "",
      messages: [
        {
          id: "1",
          text: "Can we schedule a test drive for the Infiniti QX60 this weekend?",
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
                      <div className="text-sm text-muted-foreground">Total Inquiries</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-primary mb-2">
                        {savedVehicles.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Saved Vehicles</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button
                        onClick={() => setShowListingModal(true)}
                        className="h-20 flex flex-col items-center justify-center space-y-2"
                      >
                        <PlusCircle className="h-6 w-6" />
                        <span>New Listing</span>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("messages")}
                        className="h-20 flex flex-col items-center justify-center space-y-2"
                      >
                        <MessageSquare className="h-6 w-6" />
                        <span>View Messages</span>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("profile")}
                        className="h-20 flex flex-col items-center justify-center space-y-2"
                      >
                        <Settings className="h-6 w-6" />
                        <span>Settings</span>
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
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">New inquiry received for Lexus ES 350</span>
                        <span className="text-xs text-muted-foreground ml-auto">3 hours ago</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Your Infiniti QX60 listing received 15 new views</span>
                        <span className="text-xs text-muted-foreground ml-auto">1 day ago</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Profile updated successfully</span>
                        <span className="text-xs text-muted-foreground ml-auto">2 days ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* My Listings Tab */}
            {activeTab === "listings" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">My Listings</h1>
                    <p className="text-muted-foreground">Manage your vehicle listings</p>
                  </div>
                  <Button onClick={() => setShowListingModal(true)}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Listing
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {userListings.map((vehicle) => (
                    <div key={vehicle.id} className="flex flex-col md:flex-row bg-card rounded-lg border p-6 space-y-4 md:space-y-0 md:space-x-6">
                      <div className="md:w-48 h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={vehicle.image} 
                          alt={vehicle.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{vehicle.title}</h3>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                          <span>{vehicle.year}</span>
                          <span>{vehicle.mileage.toLocaleString()} km</span>
                          <span>{vehicle.location}</span>
                          <span>{vehicle.fuelType}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-xl font-bold text-primary">
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
                      {user.accountType === "business" ? <Building2 className="h-5 w-5 mr-2" /> : <User className="h-5 w-5 mr-2" />}
                      Account Type: {user.accountType === "business" ? "Business" : "Personal"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {user.accountType === "personal" ? (
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                          <div className="flex items-start space-x-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                              <Building2 className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-2">Upgrade to Business Account</h3>
                              <p className="text-muted-foreground mb-4">
                                Get verified dealer status, unlimited listings, and premium features to boost your sales.
                              </p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                {getBusinessBenefits().map((benefit, index) => {
                                  const IconComponent = benefit.icon;
                                  return (
                                    <div key={index} className="flex items-center space-x-2">
                                      <IconComponent className="h-4 w-4 text-primary" />
                                      <span className="text-sm">{benefit.text}</span>
                                    </div>
                                  );
                                })}
                              </div>
                              
                              <Button onClick={handleBusinessConversion} className="w-full sm:w-auto">
                                <Crown className="h-4 w-4 mr-2" />
                                Upgrade to Business
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Business Account Active</p>
                          <p className="text-sm text-muted-foreground">Enjoy all premium business features</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

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
                            {user.name.split(' ').map(n => n[0]).join('')}
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
                        className="min-h-[100px] text-sm sm:text-base"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    {editingProfile && (
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                        <Button className="w-full sm:w-auto">Save Changes</Button>
                        <Button variant="outline" onClick={() => setEditingProfile(false)} className="w-full sm:w-auto">
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

      {/* Listing Type Selection Modal */}
      <Dialog open={showListingModal} onOpenChange={setShowListingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>What would you like to list?</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {listingOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.type}
                  onClick={() => handleListingOptionClick(option)}
                  className="flex items-center p-4 border rounded-lg hover:bg-accent transition-colors text-left"
                >
                  <div className={`${option.color} p-3 rounded-lg mr-4`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* Business Account Conversion Modal */}
      <Dialog open={showBusinessModal} onOpenChange={() => setShowBusinessModal(false)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl sm:text-2xl">
              <Crown className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary" />
              Upgrade to Business Account
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4 sm:py-6">
            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-medium ${
                    step <= businessConversionStep ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    {step < businessConversionStep ? <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-8 sm:w-12 h-1 mx-2 ${
                      step < businessConversionStep ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Business Information */}
            {businessConversionStep === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Business Information</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">Tell us about your business</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-sm sm:text-base">Company Name *</Label>
                    <Input
                      id="companyName"
                      value={businessFormData.companyName}
                      onChange={(e) => setBusinessFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      placeholder="Your Business Name"
                      className="h-10 sm:h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessType" className="text-sm sm:text-base">Business Type *</Label>
                    <Select value={businessFormData.businessType} onValueChange={(value) => setBusinessFormData(prev => ({ ...prev, businessType: value }))}>
                      <SelectTrigger className="h-10 sm:h-12">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dealer">Car Dealer</SelectItem>
                        <SelectItem value="garage">Auto Garage</SelectItem>
                        <SelectItem value="parts">Parts Supplier</SelectItem>
                        <SelectItem value="rental">Car Rental</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber" className="text-sm sm:text-base">Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      value={businessFormData.registrationNumber}
                      onChange={(e) => setBusinessFormData(prev => ({ ...prev, registrationNumber: e.target.value }))}
                      placeholder="BR/PV/12345"
                      className="h-10 sm:h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="taxId" className="text-sm sm:text-base">Tax ID</Label>
                    <Input
                      id="taxId"
                      value={businessFormData.taxId}
                      onChange={(e) => setBusinessFormData(prev => ({ ...prev, taxId: e.target.value }))}
                      placeholder="123456789V"
                      className="h-10 sm:h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessPhone" className="text-sm sm:text-base">Business Phone *</Label>
                    <Input
                      id="businessPhone"
                      value={businessFormData.businessPhone}
                      onChange={(e) => setBusinessFormData(prev => ({ ...prev, businessPhone: e.target.value }))}
                      placeholder="+94 11 123 4567"
                      className="h-10 sm:h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessEmail" className="text-sm sm:text-base">Business Email *</Label>
                    <Input
                      id="businessEmail"
                      type="email"
                      value={businessFormData.businessEmail}
                      onChange={(e) => setBusinessFormData(prev => ({ ...prev, businessEmail: e.target.value }))}
                      placeholder="info@yourbusiness.com"
                      className="h-10 sm:h-12"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="businessAddress" className="text-sm sm:text-base">Business Address *</Label>
                  <Textarea
                    id="businessAddress"
                    value={businessFormData.businessAddress}
                    onChange={(e) => setBusinessFormData(prev => ({ ...prev, businessAddress: e.target.value }))}
                    placeholder="Full business address"
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Choose Plan */}
            {businessConversionStep === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Choose Your Plan</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">Select the plan that best fits your needs</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {businessPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`relative border rounded-lg p-4 sm:p-6 cursor-pointer transition-all ${
                        businessFormData.selectedPlan === plan.id ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'
                      } ${plan.popular ? 'border-primary' : ''}`}
                      onClick={() => setBusinessFormData(prev => ({ ...prev, selectedPlan: plan.id }))}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-primary text-white px-3 py-1 text-xs">Popular</Badge>
                        </div>
                      )}
                      
                      <div className="text-center mb-4">
                        <h4 className="text-lg sm:text-xl font-semibold">{plan.name}</h4>
                        <div className="text-2xl sm:text-3xl font-bold text-primary mt-2">
                          {plan.price}
                        </div>
                      </div>
                      
                      <ul className="space-y-2 sm:space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm sm:text-base">
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary mr-2 sm:mr-3 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {businessFormData.selectedPlan === plan.id && (
                        <div className="absolute top-4 right-4">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-primary rounded-full flex items-center justify-center">
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {businessConversionStep === 3 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Confirm Your Upgrade</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">Review your information before completing the upgrade</p>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4 sm:p-6 space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">Business Information</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <p><span className="text-muted-foreground">Company:</span> {businessFormData.companyName}</p>
                      <p><span className="text-muted-foreground">Type:</span> {businessFormData.businessType}</p>
                      <p><span className="text-muted-foreground">Phone:</span> {businessFormData.businessPhone}</p>
                      <p><span className="text-muted-foreground">Email:</span> {businessFormData.businessEmail}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">Selected Plan</h4>
                    <div className="mt-2">
                      {businessPlans.find(plan => plan.id === businessFormData.selectedPlan) && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{businessPlans.find(plan => plan.id === businessFormData.selectedPlan)?.name}</span>
                          <span className="font-semibold text-primary text-sm">{businessPlans.find(plan => plan.id === businessFormData.selectedPlan)?.price}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 text-sm sm:text-base">You're almost there!</h4>
                      <p className="text-blue-700 text-xs sm:text-sm mt-1">
                        After upgrading, you'll get immediate access to all business features including dealer verification badge, unlimited listings, and priority support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t">
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