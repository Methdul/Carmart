import { useState } from "react";
import { Upload, X, Plus, MapPin, DollarSign, Calendar, Fuel, Settings, Camera, FileText, Star, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const ListVehiclePage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState("basic");
  const [vehicleData, setVehicleData] = useState({
    title: "",
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    bodyType: "",
    condition: "",
    location: "",
    description: "",
    vin: "",
    engineCapacity: "",
    color: "",
    phone: "",
    email: "",
    contactMethod: ""
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImages(prev => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Vehicle listing data:", vehicleData);
    console.log("Images:", images);
    alert("Vehicle listing submitted! This would be processed in a real application.");
    navigate("/dashboard");
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Mobile-friendly tab progression
  const tabs = [
    { id: "basic", label: "Basic Info", icon: FileText },
    { id: "details", label: "Details", icon: Settings },
    { id: "photos", label: "Photos", icon: Camera },
    { id: "pricing", label: "Pricing", icon: DollarSign }
  ];

  const currentTabIndex = tabs.findIndex(tab => tab.id === currentTab);

  const nextTab = () => {
    const nextIndex = currentTabIndex + 1;
    if (nextIndex < tabs.length) {
      setCurrentTab(tabs[nextIndex].id);
    }
  };

  const prevTab = () => {
    const prevIndex = currentTabIndex - 1;
    if (prevIndex >= 0) {
      setCurrentTab(tabs[prevIndex].id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Mobile-optimized container */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Mobile-friendly header */}
          <div className="flex items-center mb-6 sm:mb-8">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBack}
              className="mr-3 sm:mr-4 h-10 w-10 sm:h-10 sm:w-10"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-1 sm:mb-2">List Your Vehicle</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Create a premium listing and reach thousands of buyers</p>
            </div>
          </div>

          {/* Mobile progress indicator */}
          <div className="mb-6 sm:hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Step {currentTabIndex + 1} of {tabs.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(((currentTabIndex + 1) / tabs.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentTabIndex + 1) / tabs.length) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              {/* Desktop tabs - hidden on mobile */}
              <TabsList className="hidden sm:grid w-full grid-cols-4 mb-6">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4" />
                      <span className="hidden md:inline">{tab.label}</span>
                      <span className="md:hidden">{tab.label.split(' ')[0]}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {/* Basic Information */}
              <TabsContent value="basic">
                <Card>
                  <CardHeader className="pb-4 sm:pb-6">
                    <CardTitle className="flex items-center text-lg sm:text-xl">
                      <FileText className="h-5 w-5 mr-2" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm sm:text-base">Listing Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., BMW 3 Series 320i Sport Line - Excellent Condition"
                        value={vehicleData.title}
                        onChange={(e) => setVehicleData({...vehicleData, title: e.target.value})}
                        className="h-12 text-base"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="make" className="text-sm sm:text-base">Make *</Label>
                        <Select onValueChange={(value) => setVehicleData({...vehicleData, make: value})}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select make" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="toyota">Toyota</SelectItem>
                            <SelectItem value="honda">Honda</SelectItem>
                            <SelectItem value="nissan">Nissan</SelectItem>
                            <SelectItem value="bmw">BMW</SelectItem>
                            <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                            <SelectItem value="audi">Audi</SelectItem>
                            <SelectItem value="volkswagen">Volkswagen</SelectItem>
                            <SelectItem value="hyundai">Hyundai</SelectItem>
                            <SelectItem value="suzuki">Suzuki</SelectItem>
                            <SelectItem value="mazda">Mazda</SelectItem>
                            <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="model" className="text-sm sm:text-base">Model *</Label>
                        <Input
                          id="model"
                          placeholder="e.g., Corolla, Civic, 3 Series"
                          value={vehicleData.model}
                          onChange={(e) => setVehicleData({...vehicleData, model: e.target.value})}
                          className="h-12 text-base"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="year" className="text-sm sm:text-base">Year *</Label>
                        <Select onValueChange={(value) => setVehicleData({...vehicleData, year: value})}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 30 }, (_, i) => 2024 - i).map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bodyType" className="text-sm sm:text-base">Body Type *</Label>
                        <Select onValueChange={(value) => setVehicleData({...vehicleData, bodyType: value})}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select body type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sedan">Sedan</SelectItem>
                            <SelectItem value="hatchback">Hatchback</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                            <SelectItem value="wagon">Station Wagon</SelectItem>
                            <SelectItem value="convertible">Convertible</SelectItem>
                            <SelectItem value="coupe">Coupe</SelectItem>
                            <SelectItem value="van">Van</SelectItem>
                            <SelectItem value="pickup">Pickup Truck</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm sm:text-base">Location *</Label>
                      <Select onValueChange={(value) => setVehicleData({...vehicleData, location: value})}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="colombo">Colombo</SelectItem>
                          <SelectItem value="kandy">Kandy</SelectItem>
                          <SelectItem value="galle">Galle</SelectItem>
                          <SelectItem value="jaffna">Jaffna</SelectItem>
                          <SelectItem value="kurunegala">Kurunegala</SelectItem>
                          <SelectItem value="matara">Matara</SelectItem>
                          <SelectItem value="negombo">Negombo</SelectItem>
                          <SelectItem value="anuradhapura">Anuradhapura</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Details */}
              <TabsContent value="details">
                <Card>
                  <CardHeader className="pb-4 sm:pb-6">
                    <CardTitle className="flex items-center text-lg sm:text-xl">
                      <Settings className="h-5 w-5 mr-2" />
                      Vehicle Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="mileage" className="text-sm sm:text-base">Mileage (km) *</Label>
                        <Input
                          id="mileage"
                          type="number"
                          placeholder="e.g., 50000"
                          value={vehicleData.mileage}
                          onChange={(e) => setVehicleData({...vehicleData, mileage: e.target.value})}
                          className="h-12 text-base"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="engineCapacity" className="text-sm sm:text-base">Engine Capacity (cc)</Label>
                        <Input
                          id="engineCapacity"
                          type="number"
                          placeholder="e.g., 1800"
                          value={vehicleData.engineCapacity}
                          onChange={(e) => setVehicleData({...vehicleData, engineCapacity: e.target.value})}
                          className="h-12 text-base"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fuelType" className="text-sm sm:text-base">Fuel Type *</Label>
                        <Select onValueChange={(value) => setVehicleData({...vehicleData, fuelType: value})}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Fuel type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="petrol">Petrol</SelectItem>
                            <SelectItem value="diesel">Diesel</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                            <SelectItem value="electric">Electric</SelectItem>
                            <SelectItem value="lpg">LPG</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="transmission" className="text-sm sm:text-base">Transmission *</Label>
                        <Select onValueChange={(value) => setVehicleData({...vehicleData, transmission: value})}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Transmission" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="manual">Manual</SelectItem>
                            <SelectItem value="automatic">Automatic</SelectItem>
                            <SelectItem value="cvt">CVT</SelectItem>
                            <SelectItem value="semi-auto">Semi-Automatic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="condition" className="text-sm sm:text-base">Condition *</Label>
                        <Select onValueChange={(value) => setVehicleData({...vehicleData, condition: value})}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Vehicle condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="brand-new">Brand New</SelectItem>
                            <SelectItem value="excellent">Excellent</SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="fair">Fair</SelectItem>
                            <SelectItem value="needs-work">Needs Work</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="color" className="text-sm sm:text-base">Color</Label>
                        <Input
                          id="color"
                          placeholder="e.g., Pearl White, Metallic Black"
                          value={vehicleData.color}
                          onChange={(e) => setVehicleData({...vehicleData, color: e.target.value})}
                          className="h-12 text-base"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm sm:text-base">Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your vehicle's condition, features, service history, and any additional details..."
                        rows={4}
                        value={vehicleData.description}
                        onChange={(e) => setVehicleData({...vehicleData, description: e.target.value})}
                        className="text-base resize-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="contactMethod" className="text-sm sm:text-base">Preferred Contact Method *</Label>
                        <Select value={vehicleData.contactMethod} onValueChange={(value) => setVehicleData({...vehicleData, contactMethod: value})}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select contact method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="phone">Phone</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            <SelectItem value="message">Car Mart Messages</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm sm:text-base">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="+94 77 123 4567"
                          value={vehicleData.phone}
                          onChange={(e) => setVehicleData({...vehicleData, phone: e.target.value})}
                          className="h-12 text-base"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Photos */}
              <TabsContent value="photos">
                <Card>
                  <CardHeader className="pb-4 sm:pb-6">
                    <CardTitle className="flex items-center text-lg sm:text-xl">
                      <Camera className="h-5 w-5 mr-2" />
                      Vehicle Photos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6">
                    <div className="text-center">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 sm:p-8">
                        <Camera className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-3 sm:mb-4" />
                        <div className="space-y-2">
                          <h3 className="text-base sm:text-lg font-medium">Upload Vehicle Photos</h3>
                          <p className="text-sm sm:text-base text-muted-foreground px-2">
                            Add high-quality photos. First photo will be the main image.
                          </p>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="photo-upload"
                        />
                        <Label htmlFor="photo-upload">
                          <Button variant="outline" className="mt-4 h-12 px-6" asChild>
                            <span>
                              <Upload className="h-4 w-4 mr-2" />
                              Choose Photos
                            </span>
                          </Button>
                        </Label>
                      </div>
                    </div>

                    {images.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-4 text-sm sm:text-base">Uploaded Photos ({images.length}/15)</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                          {images.map((image, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square rounded-lg overflow-hidden border">
                                <img
                                  src={image}
                                  alt={`Vehicle ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity touch-manipulation"
                              >
                                <X className="h-3 w-3" />
                              </button>
                              {index === 0 && (
                                <Badge className="absolute bottom-2 left-2 bg-primary text-xs">
                                  Main Photo
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2 text-sm sm:text-base">Photo Tips</h4>
                      <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                        <li>• Take photos in good lighting (daylight preferred)</li>
                        <li>• Show exterior from all angles (front, back, sides)</li>
                        <li>• Include interior shots (dashboard, seats, gear)</li>
                        <li>• Show engine bay and any modifications</li>
                        <li>• Highlight any damage or wear honestly</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Pricing */}
              <TabsContent value="pricing">
                <Card>
                  <CardHeader className="pb-4 sm:pb-6">
                    <CardTitle className="flex items-center text-lg sm:text-xl">
                      <DollarSign className="h-5 w-5 mr-2" />
                      Pricing & Publishing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-sm sm:text-base">Price (LKR) *</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="3500000"
                        value={vehicleData.price}
                        onChange={(e) => setVehicleData({...vehicleData, price: e.target.value})}
                        className="h-12 text-base"
                        required
                      />
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Set a competitive price for your vehicle
                      </p>
                    </div>

                    <Separator />

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-3 text-sm sm:text-base">Listing Package</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 sm:p-4 bg-background rounded-lg border-2 border-highlight">
                          <div>
                            <div className="font-medium text-sm sm:text-base">Premium Vehicle Listing</div>
                            <div className="text-xs sm:text-sm text-muted-foreground">60 days visibility + AI health check</div>
                          </div>
                          <div className="text-right">
                            <span className="text-lg sm:text-xl font-bold text-highlight">Rs. 2,500</span>
                            <p className="text-xs text-muted-foreground">One-time fee</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id="terms" required className="mt-0.5" />
                      <Label htmlFor="terms" className="text-xs sm:text-sm leading-relaxed">
                        I agree to the{" "}
                        <a href="/terms" className="text-highlight hover:underline">Terms of Service</a> and{" "}
                        <a href="/privacy" className="text-highlight hover:underline">Privacy Policy</a>
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Mobile navigation buttons */}
            <div className="mt-6 space-y-3">
              {/* Mobile step navigation */}
              <div className="flex sm:hidden space-x-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevTab}
                  disabled={currentTabIndex === 0}
                  className="flex-1 h-12"
                >
                  Previous
                </Button>
                <Button 
                  type="button" 
                  onClick={nextTab}
                  disabled={currentTabIndex === tabs.length - 1}
                  className="flex-1 h-12 bg-primary hover:bg-primary/90"
                >
                  Next
                </Button>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 h-12 sm:h-10" 
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 h-12 sm:h-10"
                >
                  Save as Draft
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 h-12 sm:h-10 bg-highlight hover:bg-highlight/90"
                >
                  <Check className="h-4 w-4 mr-2 sm:hidden" />
                  Publish Listing
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListVehiclePage;