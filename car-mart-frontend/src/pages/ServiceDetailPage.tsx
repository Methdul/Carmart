import { useState } from "react";
import { Heart, Share2, Phone, Mail, MapPin, Calendar, Clock, Settings, Eye, Shield, Star, ArrowLeft, MessageCircle, CheckCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ServiceDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  
  // Mock service data
  const service = {
    id: "1",
    title: "Complete Vehicle Service & Oil Change",
    price: 8500,
    serviceType: "Maintenance",
    location: "Colombo 05",
    responseTime: "Within 2 hours",
    certified: true,
    warranty: true,
    experience: 15,
    images: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
    description: `Professional vehicle servicing with comprehensive inspection, oil change, filter replacement, and diagnostic check. Our certified technicians use genuine parts and latest equipment to ensure your vehicle runs smoothly and safely.`,
    services: [
      "Engine Oil Change",
      "Oil Filter Replacement", 
      "Air Filter Check",
      "Battery Inspection",
      "Brake System Check",
      "Suspension Inspection",
      "Tire Pressure Check",
      "Fluid Level Check"
    ],
    provider: {
      id: "provider1",
      name: "Pro Auto Care",
      rating: 4.9,
      reviewCount: 247,
      verified: true,
      memberSince: "2018",
      location: "Colombo 05",
      responseTime: "Within 2 hours",
      avatar: "",
      completedJobs: 1250
    },
    details: {
      duration: "2-3 hours",
      warranty: "6 months",
      price: "Rs. 8,500",
      serviceType: "Maintenance",
      availability: "Mon-Sat 8AM-6PM",
      experience: "15+ years"
    },
    reviews: [
      {
        id: "1",
        customer: "Kasun Silva",
        rating: 5,
        comment: "Excellent service! Very professional and completed on time.",
        date: "2 weeks ago"
      },
      {
        id: "2", 
        customer: "Nimali Fernando",
        rating: 4,
        comment: "Good quality work and fair pricing. Recommended!",
        date: "1 month ago"
      }
    ]
  };

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  const handleContactProvider = () => {
    alert("Contact provider functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Mobile-First Layout */}
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        {/* Back Button */}
        <Button variant="ghost" className="mb-4 -ml-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Services
        </Button>

        {/* Mobile-Optimized Image Gallery */}
        <Card className="mb-4 overflow-hidden">
          <div className="relative">
            <div className="aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
              <img
                src={service.images[selectedImage]}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              
              {/* Service Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {service.certified && (
                  <Badge className="bg-green-600/90 text-white text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Certified
                  </Badge>
                )}
                {service.warranty && (
                  <Badge className="bg-blue-600/90 text-white text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    Warranty
                  </Badge>
                )}
              </div>
              
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 rounded-full bg-background/80"
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Heart className={`h-4 w-4 ${isSaved ? 'fill-destructive text-destructive' : ''}`} />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 rounded-full bg-background/80"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                {selectedImage + 1} / {service.images.length}
              </div>
            </div>
            
            {/* Thumbnail Strip */}
            <div className="flex overflow-x-auto gap-2 p-4 bg-muted/30">
              {service.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-16 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Service ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Service Title & Price */}
        <Card className="mb-4">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-primary mb-2 leading-tight">
                  {service.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-1" />
                    {service.serviceType}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {service.responseTime}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {service.location}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    {formatPrice(service.price)}
                  </div>
                  <div className="text-sm text-muted-foreground">Fixed Price</div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-lg sm:text-xl font-bold text-primary">{service.details.duration}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Duration</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-lg sm:text-xl font-bold text-primary">{service.details.warranty}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Warranty</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-lg sm:text-xl font-bold text-primary">{service.provider.rating}★</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Rating</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-lg sm:text-xl font-bold text-primary">{service.experience}+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Years Exp</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Service Details Tabs */}
            <Card>
              <CardContent className="p-0">
                <Tabs defaultValue="overview" className="w-full">
                  <div className="overflow-x-auto">
                    <TabsList className="grid w-full grid-cols-3 min-w-max sm:min-w-0">
                      <TabsTrigger value="overview" className="text-xs sm:text-sm px-2 sm:px-4">
                        Overview
                      </TabsTrigger>
                      <TabsTrigger value="included" className="text-xs sm:text-sm px-2 sm:px-4">
                        What's Included
                      </TabsTrigger>
                      <TabsTrigger value="reviews" className="text-xs sm:text-sm px-2 sm:px-4">
                        Reviews
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <div className="p-4 sm:p-6">
                    <TabsContent value="overview" className="mt-0">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-primary mb-2">Service Description</h3>
                          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="included" className="mt-0">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-primary">What's Included</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.services.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg">
                              <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="reviews" className="mt-0">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-primary">Customer Reviews</h3>
                        <div className="space-y-4">
                          {service.reviews.map((review) => (
                            <div key={review.id} className="border-b border-border/50 pb-4 last:border-0">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="font-medium text-sm">{review.customer}</span>
                                <div className="flex">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                                <span className="text-xs text-muted-foreground">{review.date}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Provider Info Sidebar */}
          <div className="space-y-4">
            {/* Provider Card */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Service Provider</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={service.provider.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {service.provider.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm truncate">{service.provider.name}</span>
                      {service.provider.verified && (
                        <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{service.provider.rating}</span>
                      <span>({service.provider.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member Since</span>
                    <span>{service.provider.memberSince}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completed Jobs</span>
                    <span>{service.provider.completedJobs.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Time</span>
                    <span>{service.provider.responseTime}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button 
                    className="w-full" 
                    onClick={handleContactProvider}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Provider
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Service
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom */}
      <div className="sticky bottom-0 left-0 right-0 bg-background border-t border-border p-4 lg:hidden">
        <Button 
          size="lg" 
          className="w-full"
          onClick={handleContactProvider}
        >
          <Phone className="h-4 w-4 mr-2" />
          Call Now - {formatPrice(service.price)}
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default ServiceDetailPage;