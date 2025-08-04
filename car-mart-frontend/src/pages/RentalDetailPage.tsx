// car-mart-frontend/src/pages/RentalDetailPage.tsx
// ✅ CREATE THIS NEW FILE - Individual Rental Detail View

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Calendar, 
  Users, 
  Fuel, 
  Settings, 
  Shield, 
  Truck,
  Star,
  CheckCircle,
  Phone,
  Mail,
  MessageCircle,
  CalendarDays,
  Clock,
  DollarSign,
  Eye,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
    is_verified: boolean;
  };
}

const RentalDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [rental, setRental] = useState<Rental | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate('/rentals');
      return;
    }

    const loadRental = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiService.getRentalById(id);
        
        if (response.success && response.data) {
          setRental(response.data);
        } else {
          setError("Rental not found");
        }
      } catch (err: any) {
        console.error("Error loading rental:", err);
        setError(err.message || "Failed to load rental details");
      } finally {
        setLoading(false);
      }
    };

    loadRental();
  }, [id, navigate]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleBooking = () => {
    // Implement booking logic
    console.log('Book rental:', id);
  };

  const handleContact = () => {
    // Implement contact logic
    console.log('Contact owner:', id);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Implement favorite logic
  };

  const handleShare = () => {
    // Implement share logic
    if (navigator.share) {
      navigator.share({
        title: rental?.title,
        url: window.location.href,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin mr-3" />
            <span>Loading rental details...</span>
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
        <div className="container mx-auto px-4 py-12">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error || "Rental not found"}
            </AlertDescription>
          </Alert>
          <div className="mt-6">
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

  const mainImage = rental.images && rental.images.length > 0 
    ? rental.images[currentImageIndex] 
    : '/api/placeholder/600/400';

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/rentals')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Rentals
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={mainImage}
                    alt={rental.title}
                    className="w-full h-96 object-cover rounded-t-lg"
                    onError={(e) => {
                      e.currentTarget.src = '/api/placeholder/600/400';
                    }}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {rental.is_featured && (
                      <Badge className="bg-yellow-500 text-white">Featured</Badge>
                    )}
                    {rental.is_verified && (
                      <Badge className="bg-green-500 text-white flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                    {rental.delivery_available && (
                      <Badge className="bg-blue-500 text-white flex items-center gap-1">
                        <Truck className="h-3 w-3" />
                        Delivery
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleFavorite}
                      className="bg-white/90 hover:bg-white"
                    >
                      <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleShare}
                      className="bg-white/90 hover:bg-white"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Thumbnail Navigation */}
                {rental.images && rental.images.length > 1 && (
                  <div className="p-4">
                    <div className="flex space-x-2 overflow-x-auto">
                      {rental.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                            index === currentImageIndex ? 'border-primary' : 'border-transparent'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${rental.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/api/placeholder/80/64';
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Rental Details */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">{rental.title}</CardTitle>
                    <p className="text-lg text-muted-foreground">
                      {rental.year} {rental.make} {rental.model}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">
                        {rental.average_rating > 0 ? rental.average_rating.toFixed(1) : 'New'}
                      </span>
                      {rental.total_reviews > 0 && (
                        <span className="text-sm text-muted-foreground">
                          ({rental.total_reviews} reviews)
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span>{rental.views_count} views</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Key Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{rental.seats} seats</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Fuel className="h-4 w-4 text-muted-foreground" />
                    <span>{rental.fuel_type}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <span>{rental.transmission}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{rental.location}</span>
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{rental.description}</p>
                </div>

                <Separator />

                {/* Vehicle Specifications */}
                <div>
                  <h3 className="font-semibold mb-4">Vehicle Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Body Type:</span>
                      <span>{rental.body_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Color:</span>
                      <span>{rental.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Doors:</span>
                      <span>{rental.doors}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mileage:</span>
                      <span>{rental.mileage?.toLocaleString()} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Condition:</span>
                      <span>{rental.condition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fuel Policy:</span>
                      <span>{rental.fuel_policy}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                {rental.features && rental.features.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-semibold mb-4">Features</h3>
                      <div className="flex flex-wrap gap-2">
                        {rental.features.map((feature, index) => (
                          <Badge key={index} variant="outline">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Included Items */}
                {rental.included_items && rental.included_items.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-semibold mb-4">Included Items</h3>
                      <div className="flex flex-wrap gap-2">
                        {rental.included_items.map((item, index) => (
                          <Badge key={index} variant="secondary">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Pricing</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {formatPrice(rental.daily_rate)}
                  </div>
                  <div className="text-sm text-muted-foreground">per day</div>
                </div>

                {/* Weekly and Monthly Rates */}
                {(rental.weekly_rate || rental.monthly_rate) && (
                  <div className="space-y-2">
                    {rental.weekly_rate && (
                      <div className="flex justify-between text-sm">
                        <span>Weekly:</span>
                        <span className="font-semibold">{formatPrice(rental.weekly_rate)}</span>
                      </div>
                    )}
                    {rental.monthly_rate && (
                      <div className="flex justify-between text-sm">
                        <span>Monthly:</span>
                        <span className="font-semibold">{formatPrice(rental.monthly_rate)}</span>
                      </div>
                    )}
                  </div>
                )}

                <Separator />

                {/* Rental Terms */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Security Deposit:</span>
                    <span className="font-semibold">{formatPrice(rental.security_deposit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Min. Rental:</span>
                    <span>{rental.minimum_rental_days} day{rental.minimum_rental_days !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mileage Limit:</span>
                    <span>{rental.mileage_limit_per_day} km/day</span>
                  </div>
                </div>

                {/* Special Features */}
                <div className="space-y-2">
                  {rental.delivery_available && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Truck className="h-4 w-4 text-green-600" />
                        <span>Delivery Available</span>
                      </div>
                      <span className="font-semibold">
                        {rental.delivery_fee > 0 ? formatPrice(rental.delivery_fee) : 'Free'}
                      </span>
                    </div>
                  )}
                  {rental.insurance_included && (
                    <div className="flex items-center space-x-1 text-sm text-green-600">
                      <Shield className="h-4 w-4" />
                      <span>Insurance Included</span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button onClick={handleBooking} className="w-full">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                  <Button variant="outline" onClick={handleContact} className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Owner
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Owner Information */}
            {rental.users && (
              <Card>
                <CardHeader>
                  <CardTitle>Owner Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-lg font-medium text-primary">
                        {rental.users.first_name?.[0]}{rental.users.last_name?.[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">
                        {rental.users.first_name} {rental.users.last_name}
                        {rental.users.is_verified && (
                          <CheckCircle className="inline h-4 w-4 text-green-500 ml-1" />
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {rental.booking_count} successful rentals
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pickup Locations */}
            {rental.pickup_locations && rental.pickup_locations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Pickup Locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {rental.pickup_locations.map((location, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{location}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RentalDetailPage;