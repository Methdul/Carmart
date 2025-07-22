import { useState } from "react";
import { Heart, Share2, Phone, Mail, MapPin, Calendar, Fuel, Settings, Eye, Camera, Shield, Star, ArrowLeft, BarChart3, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/Header";
import HealthScoreBadge from "@/components/HealthScoreBadge";
import vehicleSedan from "@/assets/vehicle-sedan.jpg";

const VehicleDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  
  // Mock vehicle data
  const vehicle = {
    id: "1",
    title: "BMW 3 Series 320i Sport Line",
    price: 12500000,
    year: 2020,
    mileage: 35000,
    location: "Colombo",
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "Alpine White",
    engineCapacity: "1998cc",
    condition: "Excellent",
    healthScore: 92,
    images: [vehicleSedan, vehicleSedan, vehicleSedan, vehicleSedan, vehicleSedan],
    features: [
      "Leather Seats", "Sunroof", "Navigation System", "Bluetooth", 
      "Reverse Camera", "Parking Sensors", "Alloy Wheels", "LED Headlights"
    ],
    description: `This pristine BMW 3 Series 320i Sport Line is a perfect combination of luxury and performance. 
    The vehicle has been meticulously maintained with full service history available. Features include premium leather interior, 
    advanced infotainment system, and exceptional fuel efficiency. This is an ideal choice for those seeking German engineering 
    excellence with style and reliability.`,
    seller: {
      id: "seller1",
      name: "John Perera",
      rating: 4.8,
      reviewCount: 127,
      verified: true,
      memberSince: "2019",
      location: "Colombo",
      responseTime: "Within 2 hours",
      avatar: ""
    },
    specs: {
      make: "BMW",
      model: "3 Series",
      variant: "320i Sport Line",
      year: 2020,
      mileage: "35,000 km",
      fuelType: "Petrol",
      transmission: "8-Speed Automatic",
      drivetrain: "RWD",
      engine: "2.0L Twin Turbo",
      power: "184 HP",
      torque: "300 Nm",
      fuelConsumption: "6.8L/100km"
    },
    history: {
      accidents: "No reported accidents",
      owners: "2 previous owners",
      serviceHistory: "Full service history available",
      lastService: "March 2024"
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('LKR', 'Rs.');
  };

  const handleContactSeller = () => {
    alert("Contact seller functionality would be implemented here");
  };

  const handleScheduleViewing = () => {
    alert("Schedule viewing functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-[16/10] overflow-hidden rounded-t-lg">
                  <img
                    src={vehicle.images[selectedImage]}
                    alt={vehicle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 flex space-x-2">
                    {vehicle.seller.verified && (
                      <Badge className="bg-success text-success-foreground">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified Seller
                      </Badge>
                    )}
                    <Badge className="bg-highlight text-highlight-foreground">
                      Featured
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full bg-background/80"
                      onClick={() => setIsSaved(!isSaved)}
                    >
                      <Heart className={`h-4 w-4 ${isSaved ? 'fill-destructive text-destructive' : ''}`} />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full bg-background/80"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <HealthScoreBadge score={vehicle.healthScore} size="md" />
                  </div>
                </div>
                
                {/* Thumbnail Strip */}
                <div className="flex space-x-2 p-4 overflow-x-auto">
                  {vehicle.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-highlight' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`View ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Info */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-primary mb-2">{vehicle.title}</h1>
                    <div className="flex items-center space-x-4 text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {vehicle.year}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {vehicle.mileage.toLocaleString()} km
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {vehicle.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">{formatPrice(vehicle.price)}</div>
                    <div className="text-sm text-muted-foreground">Negotiable</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="specs">Specifications</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {vehicle.description}
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">{vehicle.year}</div>
                          <div className="text-sm text-muted-foreground">Year</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">{vehicle.mileage.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Kilometers</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">{vehicle.fuelType}</div>
                          <div className="text-sm text-muted-foreground">Fuel Type</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">{vehicle.transmission}</div>
                          <div className="text-sm text-muted-foreground">Transmission</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="specs" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-primary">Basic Information</h3>
                        {Object.entries(vehicle.specs).slice(0, 6).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-primary">Performance</h3>
                        {Object.entries(vehicle.specs).slice(6).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="features" className="mt-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {vehicle.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="history" className="mt-6">
                    <div className="space-y-4">
                      {Object.entries(vehicle.history).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                          <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-medium text-right max-w-xs">{value}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle>Seller Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={vehicle.seller.avatar} />
                    <AvatarFallback>{vehicle.seller.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{vehicle.seller.name}</span>
                      {vehicle.seller.verified && (
                        <Badge variant="secondary" className="text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{vehicle.seller.rating}</span>
                      <span>({vehicle.seller.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member Since</span>
                    <span>{vehicle.seller.memberSince}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span>{vehicle.seller.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Time</span>
                    <span>{vehicle.seller.responseTime}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button 
                    onClick={handleContactSeller} 
                    className="w-full bg-highlight hover:bg-highlight/90"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Seller
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleScheduleViewing}
                    className="w-full"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Viewing
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Add to Compare
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Camera className="h-4 w-4 mr-2" />
                  Request More Photos
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Listing
                </Button>
              </CardContent>
            </Card>

            {/* Financing Calculator */}
            <Card>
              <CardHeader>
                <CardTitle>Financing Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Rs. 52,083</div>
                  <div className="text-sm text-muted-foreground">Estimated monthly payment</div>
                </div>
                <div className="text-xs text-muted-foreground text-center">
                  Based on 20% down payment, 7% APR, 60 months
                </div>
                <Button variant="outline" className="w-full">
                  Get Pre-Approved
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailPage;