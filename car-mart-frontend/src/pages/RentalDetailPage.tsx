import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Heart, Share2, Phone, Mail, MapPin, Calendar, Fuel, Settings,
  Eye, Camera, Shield, Star, ArrowLeft, BarChart3, MessageCircle, Loader2,
  Users, Truck, CheckCircle, DollarSign, Clock
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

interface Rental {
  id: string;
  title: string;
  description: string;
  make: string;
  model: string;
  year: number;
  daily_rate: number;
  weekly_rate?: number;
  monthly_rate?: number;
  location: string;
  fuel_type: string;
  transmission: string;
  body_type: string;
  seats: number;
  doors: number;
  color: string;
  mileage: number;
  condition: string;
  rental_type: string;
  minimum_rental_days: number;
  maximum_rental_days: number;
  security_deposit: number;
  fuel_policy: string;
  mileage_limit_per_day: number;
  features: string[];
  included_items: string[];
  pickup_locations: string[];
  delivery_available: boolean;
  delivery_fee: number;
  insurance_included: boolean;
  images: string[];
  is_featured: boolean;
  is_verified: boolean;
  views_count: number;
  favorites_count: number;
  booking_count: number;
  average_rating: number;
  total_reviews: number;
  available_from: string;
  available_until?: string;
  created_at: string;
  users?: {
    first_name: string;
    last_name: string;
    phone: string;
    location: string;
    is_verified: boolean;
  };
}

const RentalDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [rental, setRental] = useState<Rental | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRental = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getRentalById(id);
        if (response.success) {
          setRental(response.data);
        } else {
          setError('Rental not found');
        }
      } catch (err) {
        setError('Failed to load rental details');
        console.error('Error fetching rental:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRental();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading rental details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !rental) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Rental Not Found</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => navigate('/rentals')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Rentals
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Mock fallback data for missing properties
  const rentalWithDefaults = {
    ...rental,
    images: rental.images && rental.images.length > 0 ? rental.images : [vehicleSedan],
    specs: {
      make: rental.make || 'Unknown',
      model: rental.model || 'Unknown', 
      year: rental.year,
      mileage: rental.mileage ? `${rental.mileage.toLocaleString()} km` : 'Unknown',
      fuel_type: rental.fuel_type,
      transmission: rental.transmission,
      body_type: rental.body_type || 'Unknown',
      seats: rental.seats,
      doors: rental.doors,
      color: rental.color || 'Unknown',
      condition: rental.condition || 'Unknown',
    },
    features: rental.features || [],
    rental_terms: {
      minimum_rental_days: rental.minimum_rental_days || 'Information not available',
      maximum_rental_days: rental.maximum_rental_days || 'Information not available', 
      security_deposit: rental.security_deposit ? `Rs. ${rental.security_deposit.toLocaleString()}` : 'Information not available',
      fuel_policy: rental.fuel_policy || 'Information not available',
      mileage_limit_per_day: rental.mileage_limit_per_day ? `${rental.mileage_limit_per_day} km/day` : 'Information not available',
      delivery_available: rental.delivery_available ? 'Yes' : 'No',
      delivery_fee: rental.delivery_fee ? `Rs. ${rental.delivery_fee.toLocaleString()}` : 'Free',
      insurance_included: rental.insurance_included ? 'Yes' : 'No'
    }
  };

  const currentRental = rentalWithDefaults;

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;
  const handleContactOwner = () => alert("Contact owner functionality would be implemented here");

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
                src={currentRental.images[selectedImage]}
                alt={currentRental.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className="bg-success text-white text-xs">
                  <Shield className="h-3 w-3 mr-1" /> Verified
                </Badge>
                {currentRental.is_featured && (
                  <Badge className="bg-accent text-xs">Featured</Badge>
                )}
                {currentRental.delivery_available && (
                  <Badge className="bg-blue-500 text-white text-xs">
                    <Truck className="h-3 w-3 mr-1" /> Delivery
                  </Badge>
                )}
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                <FavoriteButton
                  itemType="vehicle"
                  itemId={currentRental.id}
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
                {selectedImage + 1} / {currentRental.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex overflow-x-auto gap-2 p-3 sm:p-4 bg-muted/30 rounded-b-md">
              {currentRental.images.map((img, i) => (
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
            <h1 className="text-xl sm:text-2xl font-bold text-primary mb-2 leading-tight">{currentRental.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground mb-2">
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {currentRental.year}</span>
              <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> {currentRental.seats} seats</span>
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {currentRental.location}</span>
              <span className="flex items-center"><Eye className="w-4 w-4 mr-1" /> {currentRental.views_count} views</span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <div className="text-xl sm:text-2xl font-bold text-primary">{formatPrice(currentRental.daily_rate)}</div>
              <div className="text-sm text-muted-foreground">per day</div>
            </div>
            {(currentRental.weekly_rate || currentRental.monthly_rate) && (
              <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                {currentRental.weekly_rate && (
                  <span>Weekly: {formatPrice(currentRental.weekly_rate)}</span>
                )}
                {currentRental.monthly_rate && (
                  <span>Monthly: {formatPrice(currentRental.monthly_rate)}</span>
                )}
              </div>
            )}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <BarChart3 className="h-4 w-4 mr-2" /> Compare
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <MessageCircle className="h-4 w-4 mr-2" /> Message
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                ["Year", currentRental.year?.toString() || 'Unknown'],
                ["Seats", currentRental.seats ? `${currentRental.seats} seats` : 'Unknown'],
                ["Fuel Type", currentRental.fuel_type || 'Unknown'],
                ["Transmission", currentRental.transmission || 'Unknown']
              ].map(([label, value], i) => (
                <div key={i} className="text-center p-2 sm:p-3 bg-muted/50 rounded-lg">
                  <div className="text-sm sm:text-lg font-bold text-primary">{value}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rental Details Tabs */}
        <Card className="mb-4">
          <CardContent className="p-0">
            <Tabs defaultValue="overview">
              <div className="overflow-x-auto">
                <TabsList className="grid w-full grid-cols-4 min-w-max">
                  <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
                  <TabsTrigger value="specs" className="text-xs sm:text-sm">Specs</TabsTrigger>
                  <TabsTrigger value="features" className="text-xs sm:text-sm">Features</TabsTrigger>
                  <TabsTrigger value="terms" className="text-xs sm:text-sm">Rental Terms</TabsTrigger>
                </TabsList>
              </div>
              <div className="p-4 sm:p-6">
                <TabsContent value="overview" className="mt-0">
                  <h3 className="font-semibold text-primary mb-2">Description</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{currentRental.description}</p>
                  
                  {/* Rating & Reviews */}
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">
                        {currentRental.average_rating > 0 ? currentRental.average_rating.toFixed(1) : 'New Listing'}
                      </span>
                      {currentRental.total_reviews > 0 && (
                        <span className="text-sm text-muted-foreground">
                          ({currentRental.total_reviews} reviews)
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {currentRental.booking_count} successful rentals
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="specs" className="mt-0">
                  <h3 className="font-semibold text-primary mb-3">Specifications</h3>
                  <div className="space-y-2">
                    {Object.entries(currentRental.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-border/50 py-1 text-sm">
                        <span className="capitalize text-muted-foreground">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="text-right font-medium">{String(value || 'Unknown')}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="features" className="mt-0">
                  <h3 className="font-semibold text-primary mb-3">Features & Included Items</h3>
                  
                  {/* Vehicle Features */}
                  {currentRental.features.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Vehicle Features</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentRental.features.map((f, i) => (
                          <div key={i} className="flex items-center space-x-2 text-sm p-2 bg-muted/40 rounded">
                            <div className="w-2 h-2 bg-success rounded-full" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Included Items */}
                  {rental.included_items && rental.included_items.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Included Items</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {rental.included_items.map((item, i) => (
                          <div key={i} className="flex items-center space-x-2 text-sm p-2 bg-muted/40 rounded">
                            <CheckCircle className="w-4 h-4 text-success" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="terms" className="mt-0">
                  <h3 className="font-semibold text-primary mb-3">Rental Terms & Conditions</h3>
                  <div className="space-y-2">
                    {Object.entries(currentRental.rental_terms).map(([key, value]) => (
                      <div key={key} className="flex flex-col sm:flex-row justify-between text-sm border-b border-border/50 pb-2">
                        <span className="capitalize text-muted-foreground">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span>{String(value || 'Information not available')}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pickup Locations */}
                  {rental.pickup_locations && rental.pickup_locations.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Pickup Locations</h4>
                      <div className="space-y-1">
                        {rental.pickup_locations.map((location, i) => (
                          <div key={i} className="flex items-center space-x-2 text-sm p-2 bg-muted/40 rounded">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{location}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Owner Information */}
        <Card className="mb-4">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Owner Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-white">
                  {currentRental.users?.first_name?.[0]}{currentRental.users?.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-sm">
                  {currentRental.users?.first_name} {currentRental.users?.last_name}
                  {currentRental.users?.is_verified && (
                    <CheckCircle className="inline h-4 w-4 text-green-500 ml-1" />
                  )}
                </p>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500" /> 4.8 (127 reviews)
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Since 2019</p>
              <p>Location: {currentRental.users?.location}</p>
              <p>Response Time: Within 2 hours</p>
              <p>{currentRental.booking_count} successful rentals</p>
            </div>
            <div className="pt-2">
              <Button className="w-full" onClick={handleContactOwner}>
                <Phone className="h-4 w-4 mr-2" /> Call Owner
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sticky Footer CTA for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-50">
        <Button size="lg" className="w-full" onClick={handleContactOwner}>
          <Phone className="h-4 w-4 mr-2" /> Call Now
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default RentalDetailPage;