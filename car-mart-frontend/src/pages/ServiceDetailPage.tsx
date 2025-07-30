import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Heart, Share2, Phone, Mail, MapPin, Calendar, Shield, Star, ArrowLeft, BarChart3, MessageCircle, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FavoriteButton from '@/components/FavoriteButton';
import { apiService } from "@/services/api";

const ServiceDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getServiceById(id);
        if (response.success) {
          setService(response.data);
        } else {
          setError('Service not found');
        }
      } catch (err) {
        setError('Failed to load service details');
        console.error('Error fetching service:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading service details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => navigate('/services')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Transform real data to match component expectations
  const serviceWithDefaults = {
    ...service,
    images: service.images && service.images.length > 0 ? service.images : [
      "https://via.placeholder.com/400x300?text=Service+1",
      "https://via.placeholder.com/400x300?text=Service+2", 
      "https://via.placeholder.com/400x300?text=Service+3"
    ],
    features: service.features || [
      "Professional Service", "Quality Guarantee", "Expert Technicians", "Modern Equipment"
    ],
    service_areas: service.service_areas || [service.location],
    requirements: service.requirements || [
      "Vehicle must be accessible",
      "Customer must be present during service"
    ],
    availability: service.availability || {
      monday: "9:00 AM - 6:00 PM",
      tuesday: "9:00 AM - 6:00 PM",
      wednesday: "9:00 AM - 6:00 PM",
      thursday: "9:00 AM - 6:00 PM",
      friday: "9:00 AM - 6:00 PM",
      saturday: "9:00 AM - 2:00 PM",
      sunday: "closed"
    },
    languages: service.languages || ['English'],
    certifications: service.certifications || ['Professional Certified'],
    payment_options: service.payment_options || ['Cash', 'Card'],
    home_service: service.home_service || false,
    pickup_dropoff: service.pickup_dropoff || false,
    emergency_service: service.emergency_service || false,
    online_booking: service.online_booking || false,
    equipment_type: service.equipment_type || 'Professional',
    is_featured: service.is_featured || false,
    is_active: service.is_active !== false,
    views_count: service.views_count || 0,
    favorites_count: service.favorites_count || 0,
    price_type: service.price_type || 'fixed'
  };

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;
  const handleContact = () => alert("Contact service provider");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <Button variant="ghost" className="mb-4 -ml-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Services
        </Button>

        <Card className="mb-4 overflow-hidden">
          <div className="relative">
            <div className="aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
              <img src={serviceWithDefaults.images[selectedImage]} alt={serviceWithDefaults.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className="bg-success text-white text-xs">
                  <Shield className="h-3 w-3 mr-1" /> Verified
                </Badge>
                {serviceWithDefaults.is_featured && (
                  <Badge className="bg-accent text-xs">Featured</Badge>
                )}
                {serviceWithDefaults.emergency_service && (
                  <Badge className="bg-destructive text-white text-xs">24/7 Emergency</Badge>
                )}
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                <FavoriteButton
                  itemType="service"
                  itemId={serviceWithDefaults.id}
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-background/80"
                />
                <Button size="icon" variant="secondary" className="h-8 w-8 bg-background/80">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {selectedImage + 1} / {serviceWithDefaults.images.length}
              </div>
            </div>
            <div className="flex overflow-x-auto gap-2 p-3 bg-muted">
              {serviceWithDefaults.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-12 sm:w-20 sm:h-16 rounded-lg overflow-hidden border-2 ${
                    selectedImage === idx ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold text-primary mb-2 leading-tight">{serviceWithDefaults.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground mb-2">
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {serviceWithDefaults.location}</span>
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {serviceWithDefaults.duration || 'Contact for duration'}</span>
              <Badge variant="outline" className="text-xs">{serviceWithDefaults.service_type}</Badge>
              {serviceWithDefaults.home_service && (
                <Badge variant="outline" className="text-xs">Home Service</Badge>
              )}
              {serviceWithDefaults.online_booking && (
                <Badge variant="outline" className="text-xs">Online Booking</Badge>
              )}
            </div>
            <div className="text-xl sm:text-2xl font-bold text-primary mb-1">
              {formatPrice(serviceWithDefaults.price)}
              <span className="text-sm text-muted-foreground ml-2">
                ({serviceWithDefaults.price_type === "fixed" ? "Fixed Price" : serviceWithDefaults.price_type})
              </span>
            </div>
            <div className="text-sm text-muted-foreground mb-4">Warranty: {serviceWithDefaults.warranty_period || 'Contact for warranty details'}</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none"><BarChart3 className="h-4 w-4 mr-2" /> Compare</Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none"><MessageCircle className="h-4 w-4 mr-2" /> Message</Button>
            </div>
          </CardContent>
        </Card>

        {/* Service Areas Card */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <h3 className="font-semibold text-primary mb-2">Service Areas</h3>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(serviceWithDefaults.service_areas) ? 
                serviceWithDefaults.service_areas.map((area, i) => (
                  <Badge key={i} variant="secondary">{String(area)}</Badge>
                )) :
                <Badge variant="secondary">{String(serviceWithDefaults.service_areas)}</Badge>
              }
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-4 sm:p-6">
            <Tabs defaultValue="overview">
              <div className="overflow-x-auto">
                <TabsList className="grid w-full grid-cols-4 min-w-max">
                  <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
                  <TabsTrigger value="features" className="text-xs sm:text-sm">Features</TabsTrigger>
                  <TabsTrigger value="requirements" className="text-xs sm:text-sm">Requirements</TabsTrigger>
                  <TabsTrigger value="availability" className="text-xs sm:text-sm">Availability</TabsTrigger>
                </TabsList>
              </div>
              <div className="p-4 sm:p-6">
                <TabsContent value="overview" className="mt-0">
                  <h3 className="font-semibold text-primary mb-2">Description</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {serviceWithDefaults.description || 'Professional service with experienced technicians.'}
                  </p>
                  
                  <div className="mt-4">
                    <h4 className="font-semibold text-primary mb-2">Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(serviceWithDefaults.certifications) ? 
                        serviceWithDefaults.certifications.map((cert, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{String(cert)}</Badge>
                        )) :
                        <Badge variant="outline" className="text-xs">{String(serviceWithDefaults.certifications)}</Badge>
                      }
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold text-primary mb-2">Payment Options</h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(serviceWithDefaults.payment_options) ? 
                        serviceWithDefaults.payment_options.map((option, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{String(option)}</Badge>
                        )) :
                        <Badge variant="secondary" className="text-xs">{String(serviceWithDefaults.payment_options)}</Badge>
                      }
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="features" className="mt-0">
                  <h3 className="font-semibold text-primary mb-3">Included Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Array.isArray(serviceWithDefaults.features) ? 
                      serviceWithDefaults.features.map((f, i) => (
                        <div key={i} className="flex items-center space-x-2 text-sm p-2 bg-muted/40 rounded">
                          <div className="w-2 h-2 bg-success rounded-full" />
                          <span>{String(f)}</span>
                        </div>
                      )) :
                      <div className="flex items-center space-x-2 text-sm p-2 bg-muted/40 rounded">
                        <div className="w-2 h-2 bg-success rounded-full" />
                        <span>{String(serviceWithDefaults.features)}</span>
                      </div>
                    }
                  </div>
                </TabsContent>

                <TabsContent value="requirements" className="mt-0">
                  <h3 className="font-semibold text-primary mb-3">Requirements</h3>
                  <div className="space-y-2">
                    {Array.isArray(serviceWithDefaults.requirements) ? 
                      serviceWithDefaults.requirements.map((req, i) => (
                        <div key={i} className="flex items-center space-x-2 text-sm p-2 bg-muted/40 rounded">
                          <div className="w-2 h-2 bg-warning rounded-full" />
                          <span>{String(req)}</span>
                        </div>
                      )) :
                      <div className="flex items-center space-x-2 text-sm p-2 bg-muted/40 rounded">
                        <div className="w-2 h-2 bg-warning rounded-full" />
                        <span>{String(serviceWithDefaults.requirements)}</span>
                      </div>
                    }
                  </div>
                </TabsContent>

                <TabsContent value="availability" className="mt-0">
                  <h3 className="font-semibold text-primary mb-3">Service Hours</h3>
                  <div className="space-y-2">
                    {Object.entries(serviceWithDefaults.availability).map(([day, hours]) => (
                      <div key={day} className="flex justify-between items-center text-sm border-b border-border/50 py-2">
                        <span className="capitalize font-medium">{String(day)}</span>
                        <span className={String(hours) === "closed" ? "text-muted-foreground" : "text-success"}>
                          {String(hours) === "closed" ? "Closed" : String(hours)}
                        </span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Service Provider Section */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">Service Provider</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <Card className="shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-white">
                      {(serviceWithDefaults.users?.first_name?.[0] || 'S')}{(serviceWithDefaults.users?.last_name?.[0] || 'P')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      {serviceWithDefaults.users ? 
                        `${serviceWithDefaults.users.first_name || ''} ${serviceWithDefaults.users.last_name || ''}`.trim() || 'Service Provider' : 
                        'Service Provider'
                      }
                    </p>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      4.9 (89 reviews)
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Since 2020</p>
                  <p>Location: {serviceWithDefaults.users?.location || serviceWithDefaults.location}</p>
                  <p>Response Time: Within 1 hour</p>
                  <p>Languages: {Array.isArray(serviceWithDefaults.languages) ? serviceWithDefaults.languages.join(", ") : String(serviceWithDefaults.languages)}</p>
                </div>
                <Button className="w-full" onClick={handleContact}>
                  <Phone className="h-4 w-4 mr-2" /> Call Provider
                </Button>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <Button size="lg" className="w-full" onClick={handleContact}>
          <Phone className="h-4 w-4 mr-2" /> Call Now
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default ServiceDetailPage;