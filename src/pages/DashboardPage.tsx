import { useState } from "react";
import { User, Settings, Heart, Eye, MessageSquare, PlusCircle, Edit, Trash2, BarChart3, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import VehicleCard from "@/components/VehicleCard";
import vehicleSedan from "@/assets/vehicle-sedan.jpg";
import vehicleSuv from "@/assets/vehicle-suv.jpg";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [editingProfile, setEditingProfile] = useState(false);
  
  // Mock user data
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
      avatar: ""
    },
    {
      id: "2",
      from: "Mike Silva",
      subject: "RAV4 Viewing Request",
      preview: "Would like to schedule a viewing for this weekend",
      time: "1 day ago",
      unread: false,
      avatar: ""
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('LKR', 'Rs.');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                {/* Profile Section */}
                <div className="text-center mb-6">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-lg">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <h2 className="text-xl font-bold text-primary">{user.name}</h2>
                    {user.verified && (
                      <Badge className="bg-success text-success-foreground">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{user.rating}</span>
                    <span>({user.reviewCount} reviews)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Member since {user.memberSince}</p>
                </div>

                {/* Navigation */}
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
                      <div className="text-sm text-muted-foreground">Saved Vehicles</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Messages */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                          <Avatar>
                            <AvatarImage src={message.avatar} />
                            <AvatarFallback>{message.from.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{message.from}</span>
                              <span className="text-sm text-muted-foreground">{message.time}</span>
                              {message.unread && (
                                <Badge className="bg-highlight text-highlight-foreground">New</Badge>
                              )}
                            </div>
                            <div className="font-medium text-sm">{message.subject}</div>
                            <div className="text-sm text-muted-foreground">{message.preview}</div>
                          </div>
                        </div>
                      ))}
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
                  <Button className="bg-highlight hover:bg-highlight/90">
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
                <div>
                  <h1 className="text-3xl font-bold text-primary mb-2">Messages</h1>
                  <p className="text-muted-foreground">Communicate with buyers and sellers</p>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer">
                          <Avatar>
                            <AvatarImage src={message.avatar} />
                            <AvatarFallback>{message.from.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{message.from}</span>
                              <span className="text-sm text-muted-foreground">{message.time}</span>
                            </div>
                            <div className="font-medium text-sm">{message.subject}</div>
                            <div className="text-sm text-muted-foreground">{message.preview}</div>
                          </div>
                          {message.unread && (
                            <div className="w-3 h-3 bg-highlight rounded-full"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
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
                    {editingProfile ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="text-xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {editingProfile && (
                        <Button variant="outline">
                          Change Photo
                        </Button>
                      )}
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
    </div>
  );
};

export default DashboardPage;