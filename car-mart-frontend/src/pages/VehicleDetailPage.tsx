import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Heart, Share2, Phone, Mail, MapPin, Calendar, Fuel, Settings,
  Eye, Camera, Shield, Star, ArrowLeft, BarChart3, MessageCircle, Loader2
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import vehicleSedan from "@/assets/vehicle-sedan.jpg";
import FavoriteButton from '@/components/FavoriteButton';
import { apiService } from "@/services/api";

const VehicleDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getVehicleById(id);
        if (response.success) {
          setVehicle(response.data);
        } else {
          setError('Vehicle not found');
        }
      } catch (err) {
        setError('Failed to load vehicle details');
        console.error('Error fetching vehicle:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVehicle();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading vehicle details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Vehicle Not Found</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => navigate('/vehicles')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Vehicles
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Mock fallback data for missing properties
  const vehicleWithDefaults = {
    ...vehicle,
    images: vehicle.images && vehicle.images.length > 0 ? vehicle.images : [vehicleSedan],
    specs: vehicle.specs || {
      make: vehicle.make || 'Unknown',
      model: vehicle.model || 'Unknown', 
      year: vehicle.year,
      mileage: vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : 'Unknown',
      fuel_type: vehicle.fuel_type,
      transmission: vehicle.transmission,
      engine_capacity: vehicle.engine_capacity || 'Unknown',
    },
    features: vehicle.features || [],
    history: {
      accidents: "Information not available",
      owners: "Information not available", 
      serviceHistory: "Information not available",
      lastService: "Information not available"
    }
  };

  const currentVehicle = vehicleWithDefaults;

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
                src={currentVehicle.images[selectedImage]}
                alt={currentVehicle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className="bg-success text-white text-xs">
                  <Shield className="h-3 w-3 mr-1" /> Verified
                </Badge>
                {currentVehicle.is_featured && (
                  <Badge className="bg-accent text-xs">Featured</Badge>
                )}
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                <FavoriteButton
                  itemType="vehicle"
                  itemId={currentVehicle.id}
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-background/80"
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 bg-background/80"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {selectedImage + 1} / {currentVehicle.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex overflow-x-auto gap-2 p-3 sm:p-4 bg-muted/30 rounded-b-md">
              {currentVehicle.images.map((img, i) => (
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
            <h1 className="text-xl sm:text-2xl font-bold text-primary mb-2 leading-tight">{currentVehicle.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground mb-2">
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {currentVehicle.year}</span>
              <span className="flex items-center"><Eye className="w-4 h-4 mr-1" /> {currentVehicle.mileage ? `${currentVehicle.mileage.toLocaleString()} km` : 'Unknown'}</span>
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {currentVehicle.location}</span>
              <span className="flex items-center"><Eye className="w-4 w-4 mr-1" /> {currentVehicle.views_count} views</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-primary mb-1">{formatPrice(currentVehicle.price)}</div>
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
                ["Year", currentVehicle.year?.toString() || 'Unknown'],
                ["Kilometers", currentVehicle.mileage ? `${currentVehicle.mileage.toLocaleString()} km` : 'Unknown'],
                ["Fuel Type", currentVehicle.fuel_type || 'Unknown'],
                ["Transmission", currentVehicle.transmission || 'Unknown']
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
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{currentVehicle.description}</p>
                </TabsContent>
                <TabsContent value="specs" className="mt-0">
                  <h3 className="font-semibold text-primary mb-3">Specifications</h3>
                  <div className="space-y-2">
                    {Object.entries(currentVehicle.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-border/50 py-1 text-sm">
                        <span className="capitalize text-muted-foreground">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="text-right font-medium">{String(value || 'Unknown')}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="features" className="mt-0">
                  <h3 className="font-semibold text-primary mb-3">Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentVehicle.features.map((f, i) => (
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
                    {Object.entries(currentVehicle.history).map(([key, value]) => (
                      <div key={key} className="flex flex-col sm:flex-row justify-between text-sm border-b border-border/50 pb-2">
                        <span className="capitalize text-muted-foreground">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span>{String(value || 'Information not available')}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Seller Information - FIXED to use users object */}
        <Card className="mb-4">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Seller Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-white">
                  {currentVehicle.users?.first_name?.[0]}{currentVehicle.users?.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-sm">{currentVehicle.users?.first_name} {currentVehicle.users?.last_name}</p>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500" /> 4.8 (127 reviews)
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Since 2019</p>
              <p>Location: {currentVehicle.users?.location}</p>
              <p>Response Time: Within 2 hours</p>
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