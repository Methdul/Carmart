import { useState } from "react";
import { User, Settings, Heart, Eye, MessageSquare, PlusCircle, Edit, Trash2, BarChart3, Star, Car, Wrench, ArrowLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  
  // Mock user data (keeping original)
  const user = {
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
    bio: "Car enthusiast and collector. Specializing in premium German and Japanese vehicles."
  };

  // Mock user's listings (keeping original)
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

  // ONLY CHANGE: Fixed messages to match Conversation interface
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
    },
    {
      id: "3",
      from: "Priya Jayawardene",
      subject: "Price Negotiation",
      preview: "Is there any room for price negotiation on the RAV4?",
      time: "2 days ago",
      unread: false,
      avatar: "",
      messages: [
        {
          id: "1",
          text: "Is there any room for price negotiation on the RAV4?",
          sender: "other" as const,
          timestamp: "2 days ago",
          status: "read" as const,
          type: "text" as const
        }
      ]
    }
  ];

  // Listing options for the modal - FIXED SERVICES ROUTE
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
    // Navigate to the respective listing page
    window.location.href = option.route;
  };

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
                        {userListings.reduce((total, vehicle) => total + vehicle.views, 0).toLocaleString()}
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
                        {savedVehicles.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Saved Items</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">This Week's Views</span>
                        <span className="font-medium">+234 views</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">New Inquiries</span>
                        <span className="font-medium">+12 inquiries</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Profile Views</span>
                        <span className="font-medium">+56 views</span>
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
                  <Button 
                    className="bg-highlight hover:bg-highlight/90"
                    onClick={() => setShowListingModal(true)}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add New Listing
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userListings.map((vehicle) => (
                    <div key={vehicle.id} className="relative">
                      <VehicleCard
                        vehicle={vehicle}
                        onSave={() => {}}
                        onCompare={() => {}}
                      />
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <Button size="icon" variant="secondary" className="w-8 h-8">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="icon" variant="destructive" className="w-8 h-8">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="font-bold text-primary">{vehicle.views}</div>
                            <div className="text-xs text-muted-foreground">Views</div>
                          </div>
                          <div>
                            <div className="font-bold text-primary">{vehicle.inquiries}</div>
                            <div className="text-xs text-muted-foreground">Inquiries</div>
                          </div>
                          <div>
                            <Badge className={vehicle.status === 'active' ? 'bg-success' : 'bg-muted'}>
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

                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="text-lg">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{user.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm font-medium">{user.rating}</span>
                            <span className="ml-1 text-sm text-muted-foreground">({user.reviewCount} reviews)</span>
                          </div>
                          {user.verified && (
                            <Badge className="bg-success">Verified</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Member since {user.memberSince}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={user.name}
                          disabled={!editingProfile}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={user.email}
                          disabled={!editingProfile}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={user.phone}
                          disabled={!editingProfile}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={user.location}
                          disabled={!editingProfile}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={user.bio}
                        disabled={!editingProfile}
                        rows={3}
                      />
                    </div>

                    {editingProfile && (
                      <div className="flex space-x-2">
                        <Button className="bg-highlight hover:bg-highlight/90">
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setEditingProfile(false)}>
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
    </div>
  );
};

export default DashboardPage;