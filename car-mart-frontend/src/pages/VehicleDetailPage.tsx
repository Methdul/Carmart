import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart, Share2, Phone, Mail, MapPin, Calendar, Fuel, Settings,
  Eye, Camera, Shield, Star, ArrowLeft, BarChart3, MessageCircle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import vehicleSedan from "@/assets/vehicle-sedan.jpg";

const VehicleDetailPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

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
    advanced infotainment system, and exceptional fuel efficiency.`,
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

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;
  const handleContactSeller = () => alert("Contact seller functionality would be implemented here");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <Button variant="ghost" className="mb-4 -ml-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Search
        </Button>

        {/* Image Gallery */}
        <Card className="mb-4 overflow-hidden">
          <div className="relative">
            <div className="aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
              <img
                src={vehicle.images[selectedImage]}
                alt={vehicle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                {vehicle.seller.verified && (
                  <Badge className="bg-success text-white text-xs">
                    <Shield className="h-3 w-3 mr-1" /> Verified
                  </Badge>
                )}
                <Badge className="bg-accent text-xs">Featured</Badge>
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 bg-background/80"
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Heart className={`h-4 w-4 ${isSaved ? "fill-destructive text-destructive" : ""}`} />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 bg-background/80"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {selectedImage + 1} / {vehicle.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex overflow-x-auto gap-2 p-3 sm:p-4 bg-muted/30 rounded-b-md">
              {vehicle.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-12 sm:w-20 sm:h-16 rounded-lg overflow-hidden border-2 ${selectedImage === i ? "border-primary" : "border-transparent"}`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Title & Price */}
        <Card className="mb-4">
          <CardContent className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold text-primary mb-2 leading-tight">{vehicle.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground mb-2">
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {vehicle.year}</span>
              <span className="flex items-center"><Eye className="w-4 h-4 mr-1" /> {vehicle.mileage.toLocaleString()} km</span>
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {vehicle.location}</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-primary mb-1">{formatPrice(vehicle.price)}</div>
            <div className="text-sm text-muted-foreground mb-4">Negotiable</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none"><BarChart3 className="h-4 w-4 mr-2" /> Compare</Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none"><MessageCircle className="h-4 w-4 mr-2" /> Message</Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                ["Year", vehicle.year],
                ["Kilometers", vehicle.mileage.toLocaleString()],
                ["Fuel Type", vehicle.fuelType],
                ["Transmission", vehicle.transmission]
              ].map(([label, value], i) => (
                <div key={i} className="text-center p-2 sm:p-3 bg-muted/50 rounded-lg">
                  <div className="text-sm sm:text-lg font-bold text-primary">{value}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Details Tabs */}
        <Card className="mb-4">
          <CardContent className="p-0">
            <Tabs defaultValue="overview">
              <div className="overflow-x-auto">
                <TabsList className="grid w-full grid-cols-4 min-w-max">
                  <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
                  <TabsTrigger value="specs" className="text-xs sm:text-sm">Specs</TabsTrigger>
                  <TabsTrigger value="features" className="text-xs sm:text-sm">Features</TabsTrigger>
                  <TabsTrigger value="history" className="text-xs sm:text-sm">History</TabsTrigger>
                </TabsList>
              </div>
              <div className="p-4 sm:p-6">
                <TabsContent value="overview" className="mt-0">
                  <h3 className="font-semibold text-primary mb-2">Description</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{vehicle.description}</p>
                </TabsContent>
                <TabsContent value="specs" className="mt-0">
                  <h3 className="font-semibold text-primary mb-3">Specifications</h3>
                  <div className="space-y-2">
                    {Object.entries(vehicle.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-border/50 py-1 text-sm">
                        <span className="capitalize text-muted-foreground">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="text-right font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="features" className="mt-0">
                  <h3 className="font-semibold text-primary mb-3">Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {vehicle.features.map((f, i) => (
                      <div key={i} className="flex items-center space-x-2 text-sm p-2 bg-muted/40 rounded">
                        <div className="w-2 h-2 bg-success rounded-full" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="history" className="mt-0">
                  <h3 className="font-semibold text-primary mb-3">Vehicle History</h3>
                  <div className="space-y-2">
                    {Object.entries(vehicle.history).map(([key, value]) => (
                      <div key={key} className="flex flex-col sm:flex-row justify-between text-sm border-b border-border/50 pb-2">
                        <span className="capitalize text-muted-foreground">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Seller Information - Moved from sidebar */}
        <Card className="mb-4">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Seller Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={vehicle.seller.avatar} />
                <AvatarFallback className="bg-primary text-white">
                  {vehicle.seller.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-sm">{vehicle.seller.name}</p>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500" /> {vehicle.seller.rating} ({vehicle.seller.reviewCount} reviews)
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Since {vehicle.seller.memberSince}</p>
              <p>Location: {vehicle.seller.location}</p>
              <p>Response Time: {vehicle.seller.responseTime}</p>
            </div>
            <div className="pt-2">
              <Button className="w-full" onClick={handleContactSeller}>
                <Phone className="h-4 w-4 mr-2" /> Call Seller
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sticky Footer CTA for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-50">
        <Button size="lg" className="w-full" onClick={handleContactSeller}>
          <Phone className="h-4 w-4 mr-2" /> Call Now
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default VehicleDetailPage;