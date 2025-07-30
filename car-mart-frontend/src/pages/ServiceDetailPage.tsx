import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart, Share2, Phone, Mail, MapPin, Calendar, Shield, Star, ArrowLeft, BarChart3, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FavoriteButton from '@/components/FavoriteButton';

const ServiceDetailPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  // FIXED: Updated to match backend database schema
  const service = {
    id: "test-service-1",
    title: "Premium Full Car Service",
    description: `Our Premium Full Car Service covers everything your car needs for optimal performance.
    Backed by our certified technicians, we ensure a complete inspection and upgrade of critical systems.`,
    service_type: "Maintenance",        // ← FIXED: Added from backend schema
    price: 25000,
    price_type: "fixed",               // ← FIXED: Added from backend schema
    location: "Colombo",
    service_areas: ["Colombo", "Gampaha", "Kalutara"], // ← FIXED: Added from backend schema
    duration: "2-3 hours",             // ← FIXED: Match backend field
    warranty_period: "6 months",       // ← FIXED: was warranty
    features: [                        // ← FIXED: Match backend field name
      "Engine Oil Change", "Brake Inspection", "Interior Vacuum", "AC Service",
      "Tire Rotation", "Exterior Wash", "Battery Test", "Diagnostic Scan"
    ],
    requirements: [                    // ← FIXED: Added from backend schema
      "Vehicle must be accessible",
      "Customer must be present during service"
    ],
    images: [
      "https://via.placeholder.com/400x300?text=Service+1",
      "https://via.placeholder.com/400x300?text=Service+2", 
      "https://via.placeholder.com/400x300?text=Service+3"
    ],
    availability: {                    // ← FIXED: Added from backend schema
      monday: "9:00-17:00",
      tuesday: "9:00-17:00",
      wednesday: "9:00-17:00",
      thursday: "9:00-17:00",
      friday: "9:00-17:00",
      saturday: "9:00-15:00",
      sunday: "closed"
    },
    home_service: true,                // ← FIXED: Added from backend schema
    pickup_dropoff: false,             // ← FIXED: Added from backend schema
    emergency_service: true,           // ← FIXED: Added from backend schema
    online_booking: true,              // ← FIXED: Added from backend schema
    equipment_type: "Professional",   // ← FIXED: Added from backend schema
    certifications: ["ASE Certified", "Toyota Certified"], // ← FIXED: Added from backend schema
    languages: ["English", "Sinhala"], // ← FIXED: Added from backend schema
    payment_options: ["Cash", "Card", "Bank Transfer"], // ← FIXED: Added from backend schema
    is_featured: false,                // ← FIXED: Added from backend schema
    is_active: true,                   // ← FIXED: Added from backend schema
    views_count: 342,                  // ← FIXED: Added from backend schema
    favorites_count: 23,               // ← FIXED: Added from backend schema
    created_at: "2024-01-15T08:30:00Z",
    updated_at: "2024-01-20T14:22:00Z",
    // FIXED: Replace provider object with users object to match backend schema
    users: {
      first_name: "AutoPro",
      last_name: "Services",
      phone: "+94112345678",
      location: "Colombo",
      email: "info@autopro.lk"
    }
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
              <img src={service.images[selectedImage]} alt={service.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className="bg-success text-white text-xs">
                  <Shield className="h-3 w-3 mr-1" /> Verified
                </Badge>
                {service.is_featured && (
                  <Badge className="bg-accent text-xs">Featured</Badge>
                )}
                {service.emergency_service && (
                  <Badge className="bg-destructive text-white text-xs">24/7 Emergency</Badge>
                )}
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                <FavoriteButton
                  itemType="service"
                  itemId={service.id}
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-background/80"
                />
                <Button size="icon" variant="secondary" className="h-8 w-8 bg-background/80">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {selectedImage + 1} / {service.images.length}
              </div>
            </div>
            <div className="flex overflow-x-auto gap-2 p-3 bg-muted">
              {service.images.map((img, idx) => (
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
            <h1 className="text-xl sm:text-2xl font-bold text-primary mb-2 leading-tight">{service.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground mb-2">
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {service.location}</span>
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {service.duration}</span>
              <Badge variant="outline" className="text-xs">{service.service_type}</Badge>
              {service.home_service && (
                <Badge variant="outline" className="text-xs">Home Service</Badge>
              )}
              {service.online_booking && (
                <Badge variant="outline" className="text-xs">Online Booking</Badge>
              )}
            </div>
            <div className="text-xl sm:text-2xl font-bold text-primary mb-1">
              {formatPrice(service.price)}
              <span className="text-sm text-muted-foreground ml-2">
                ({service.price_type === "fixed" ? "Fixed Price" : service.price_type})
              </span>
            </div>
            {/* FIXED: Use warranty_period */}
            <div className="text-sm text-muted-foreground mb-4">Warranty: {service.warranty_period}</div>
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
              {service.service_areas.map((area, i) => (
                <Badge key={i} variant="secondary">{area}</Badge>
              ))}
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
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{service.description}</p>
                  
                  <div className="mt-4">
                    <h4 className="font-semibold text-primary mb-2">Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.certifications.map((cert, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{cert}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold text-primary mb-2">Payment Options</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.payment_options.map((option, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{option}</Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="features" className="mt-0">
                  <h3 className="font-semibold text-primary mb-3">Included Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.features.map((f, i) => (
                      <div key={i} className="flex items-center space-x-2 text-sm p-2 bg-muted/40 rounded">
                        <div className="w-2 h-2 bg-success rounded-full" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="requirements" className="mt-0">
                  <h3 className="font-semibold text-primary mb-3">Requirements</h3>
                  <div className="space-y-2">
                    {service.requirements.map((req, i) => (
                      <div key={i} className="flex items-center space-x-2 text-sm p-2 bg-muted/40 rounded">
                        <div className="w-2 h-2 bg-warning rounded-full" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="availability" className="mt-0">
                  <h3 className="font-semibold text-primary mb-3">Service Hours</h3>
                  <div className="space-y-2">
                    {Object.entries(service.availability).map(([day, hours]) => (
                      <div key={day} className="flex justify-between items-center text-sm border-b border-border/50 py-2">
                        <span className="capitalize font-medium">{day}</span>
                        <span className={hours === "closed" ? "text-muted-foreground" : "text-success"}>
                          {hours === "closed" ? "Closed" : hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Service Provider Section - FIXED to use users object */}
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
                      {/* FIXED: Use users object instead of provider */}
                      {service.users?.first_name?.[0]}{service.users?.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    {/* FIXED: Use users object instead of provider */}
                    <p className="font-medium text-sm">{service.users?.first_name} {service.users?.last_name}</p>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      4.9 (89 reviews)
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Since 2020</p>
                  {/* FIXED: Use users object location */}
                  <p>Location: {service.users?.location}</p>
                  <p>Response Time: Within 1 hour</p>
                  <p>Languages: {service.languages.join(", ")}</p>
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