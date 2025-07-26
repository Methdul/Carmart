import { useState } from "react";
import { Heart, Share2, Phone, Mail, MapPin, Calendar, Settings, Eye, Shield, Star, ArrowLeft, MessageCircle, CheckCircle, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PartDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  
  // Mock part data
  const part = {
    id: "1",
    title: "Original Toyota Prius Hybrid Battery Pack",
    price: 85000,
    brand: "Toyota",
    partCategory: "Battery",
    condition: "New",
    warranty: true,
    partNumber: "G9280-47030",
    location: "Colombo 05",
    inStock: true,
    images: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
    description: `Genuine Toyota hybrid battery pack for Prius models. This high-quality battery has been fully tested and certified to meet Toyota's strict quality standards. Comes with 2-year warranty and professional installation available.`,
    compatibility: [
      "Toyota Prius 2010-2015",
      "Toyota Prius V 2012-2017", 
      "Toyota Prius C 2012-2019",
      "Toyota Aqua 2011-2017"
    ],
    specifications: {
      brand: "Toyota",
      partNumber: "G9280-47030",
      condition: "New",
      warranty: "2 years",
      weight: "45 kg",
      voltage: "201.6V",
      capacity: "6.5Ah",
      origin: "Japan"
    },
    seller: {
      id: "seller1",
      name: "Auto Parts Pro",
      rating: 4.9,
      reviewCount: 156,
      verified: true,
      memberSince: "2019",
      location: "Colombo 05",
      responseTime: "Within 1 hour",
      avatar: "",
      totalSales: 890
    },
    shipping: {
      available: true,
      cost: 1500,
      time: "2-3 days",
      locations: ["Colombo", "Kandy", "Galle", "Matara"]
    },
    reviews: [
      {
        id: "1",
        customer: "Chamara Perera",
        rating: 5,
        comment: "Excellent quality battery. Works perfectly and came with proper documentation.",
        date: "1 week ago"
      },
      {
        id: "2", 
        customer: "Sanduni Rajapaksa",
        rating: 5,
        comment: "Genuine Toyota part as described. Fast delivery and good packaging.",
        date: "2 weeks ago"
      }
    ]
  };

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  const handleContactSeller = () => {
    alert("Contact seller functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Mobile-First Layout */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Back Button */}
        <Button variant="ghost" className="mb-4 -ml-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Parts
        </Button>

        {/* Mobile-Optimized Image Gallery */}
        <Card className="mb-4 overflow-hidden">
          <div className="relative">
            <div className="aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
              <img
                src={part.images[selectedImage]}
                alt={part.title}
                className="w-full h-full object-cover"
              />
              
              {/* Part Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <Badge className={`text-xs ${part.condition === 'New' ? 'bg-green-600/90' : 'bg-blue-600/90'} text-white`}>
                  {part.condition}
                </Badge>
                {part.warranty && (
                  <Badge className="bg-purple-600/90 text-white text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    Warranty
                  </Badge>
                )}
                {part.inStock && (
                  <Badge className="bg-success/90 text-success-foreground text-xs">
                    <Package className="h-3 w-3 mr-1" />
                    In Stock
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
                {selectedImage + 1} / {part.images.length}
              </div>
            </div>
            
            {/* Thumbnail Strip */}
            <div className="flex overflow-x-auto gap-2 p-4 bg-muted/30">
              {part.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-16 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Part ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Part Title & Price */}
        <Card className="mb-4">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-primary mb-2 leading-tight">
                  {part.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-1" />
                    {part.brand}
                  </div>
                  <div className="flex items-center">
                    <Package className="h-4 w-4 mr-1" />
                    {part.partNumber}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {part.location}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    {formatPrice(part.price)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {part.inStock ? "✅ In Stock" : "❌ Out of Stock"}
                  </div>
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
                <div className="text-lg sm:text-xl font-bold text-primary">{part.condition}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Condition</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-lg sm:text-xl font-bold text-primary">{part.specifications.warranty}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Warranty</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-lg sm:text-xl font-bold text-primary">{part.seller.rating}★</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Rating</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-lg sm:text-xl font-bold text-primary">{part.shipping.time}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Delivery</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Part Details Tabs */}
            <Card>
              <CardContent className="p-0">
                <Tabs defaultValue="overview" className="w-full">
                  <div className="overflow-x-auto">
                    <TabsList className="grid w-full grid-cols-4 min-w-max sm:min-w-0">
                      <TabsTrigger value="overview" className="text-xs sm:text-sm px-2 sm:px-4">
                        Overview
                      </TabsTrigger>
                      <TabsTrigger value="specs" className="text-xs sm:text-sm px-2 sm:px-4">
                        Specs
                      </TabsTrigger>
                      <TabsTrigger value="compatibility" className="text-xs sm:text-sm px-2 sm:px-4">
                        Compatibility
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
                          <h3 className="font-semibold text-primary mb-2">Part Description</h3>
                          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                            {part.description}
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="specs" className="mt-0">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-primary">Specifications</h3>
                        <div className="space-y-3">
                          {Object.entries(part.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                              <span className="text-muted-foreground capitalize text-sm">
                                {key.replace(/([A-Z])/g, ' $1')}
                              </span>
                              <span className="font-medium text-sm text-right">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="compatibility" className="mt-0">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-primary">Compatible Vehicles</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {part.compatibility.map((vehicle, index) => (
                            <div key={index} className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                              <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                              <span className="text-sm font-medium">{vehicle}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="reviews" className="mt-0">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-primary">Customer Reviews</h3>
                        <div className="space-y-4">
                          {part.reviews.map((review) => (
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

          {/* Seller Info Sidebar */}
          <div className="space-y-4">
            {/* Seller Card */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Seller Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={part.seller.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {part.seller.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm truncate">{part.seller.name}</span>
                      {part.seller.verified && (
                        <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{part.seller.rating}</span>
                      <span>({part.seller.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member Since</span>
                    <span>{part.seller.memberSince}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Sales</span>
                    <span>{part.seller.totalSales.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Time</span>
                    <span>{part.seller.responseTime}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button 
                    className="w-full" 
                    onClick={handleContactSeller}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Seller
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <Truck className="h-4 w-4 mr-2" />
                  Shipping & Delivery
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping Cost</span>
                  <span className="font-medium">{formatPrice(part.shipping.cost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Time</span>
                  <span className="font-medium">{part.shipping.time}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Available in:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {part.shipping.locations.map((location, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {location}
                      </Badge>
                    ))}
                  </div>
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
                  Share Part
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Request Quote
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
          onClick={handleContactSeller}
          disabled={!part.inStock}
        >
          <Phone className="h-4 w-4 mr-2" />
          Buy Now - {formatPrice(part.price)}
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default PartDetailPage;