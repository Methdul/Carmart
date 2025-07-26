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

const ServiceDetailPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const service = {
    id: "s1",
    title: "Premium Full Car Service",
    price: 25000,
    location: "Colombo",
    duration: "2 hours",
    warranty: "6 months",
    images: [
      "https://via.placeholder.com/400x300?text=Service+1",
      "https://via.placeholder.com/400x300?text=Service+2",
      "https://via.placeholder.com/400x300?text=Service+3"
    ],
    features: [
      "Engine Oil Change", "Brake Inspection", "Interior Vacuum", "AC Service",
      "Tire Rotation", "Exterior Wash", "Battery Test", "Diagnostic Scan"
    ],
    description: `Our Premium Full Car Service covers everything your car needs for optimal performance.
    Backed by our certified technicians, we ensure a complete inspection and upgrade of critical systems.`,
    provider: {
      name: "AutoPro Services",
      rating: 4.9,
      reviewCount: 89,
      verified: true,
      memberSince: "2020",
      location: "Colombo",
      responseTime: "Within 1 hour",
      avatar: ""
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
                {service.provider.verified && (
                  <Badge className="bg-success text-white text-xs"><Shield className="h-3 w-3 mr-1" /> Verified</Badge>
                )}
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                <Button size="icon" variant="secondary" className="h-8 w-8 bg-background/80" onClick={() => setIsSaved(!isSaved)}>
                  <Heart className={`h-4 w-4 ${isSaved ? 'fill-destructive text-destructive' : ''}`} />
                </Button>
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
            </div>
            <div className="text-xl sm:text-2xl font-bold text-primary mb-1">{formatPrice(service.price)}</div>
            <div className="text-sm text-muted-foreground mb-4">Warranty: {service.warranty}</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none"><BarChart3 className="h-4 w-4 mr-2" /> Compare</Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none"><MessageCircle className="h-4 w-4 mr-2" /> Message</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-4 sm:p-6">
            <Tabs defaultValue="overview">
              <div className="overflow-x-auto">
                <TabsList className="grid w-full grid-cols-2 min-w-max">
                  <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
                  <TabsTrigger value="features" className="text-xs sm:text-sm">Features</TabsTrigger>
                </TabsList>
              </div>
              <div className="p-4 sm:p-6">
                <TabsContent value="overview" className="mt-0">
                  <h3 className="font-semibold text-primary mb-2">Description</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{service.description}</p>
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
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Provider Section - Moved from Tab */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">Service Provider</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <Card className="shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={service.provider.avatar} />
                    <AvatarFallback className="bg-primary text-white">
                      {service.provider.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{service.provider.name}</p>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      {service.provider.rating} ({service.provider.reviewCount} reviews)
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Since {service.provider.memberSince}</p>
                  <p>Location: {service.provider.location}</p>
                  <p>Response Time: {service.provider.responseTime}</p>
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