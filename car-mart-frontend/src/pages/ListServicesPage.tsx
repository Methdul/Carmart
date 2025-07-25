import { useState } from "react";
import { Upload, X, Plus, MapPin, DollarSign, Calendar, Settings, Camera, FileText, Star, ArrowLeft, Check, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const ListServicesPage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState("basic");
  const [serviceData, setServiceData] = useState({
    title: "",
    category: "",
    serviceType: "",
    description: "",
    experience: "",
    certifications: "",
    location: "",
    serviceArea: "",
    availability: "",
    responseTime: "",
    price: "",
    priceType: "",
    warranty: "",
    contactMethod: "",
    phone: "",
    email: "",
    businessName: "",
    businessAddress: ""
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const serviceOptions = [
    "Oil Change", "Brake Service", "Tire Installation", "Engine Repair",
    "Transmission Service", "AC Repair", "Electrical Work", "Body Work",
    "Paint Service", "Detailing", "Inspection", "Towing"
  ];

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

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Service listing data:", serviceData);
    console.log("Selected services:", selectedServices);
    console.log("Images:", images);
    alert("Service listing submitted! This would be processed in a real application.");
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
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-1 sm:mb-2">List Your Service</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Offer automotive services to car owners</p>
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

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <Card className="shadow-lg border-2">
              <CardContent className="p-0">
                <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                  {/* Desktop Tab List */}
                  <div className="hidden sm:block">
                    <TabsList className="grid w-full grid-cols-4 h-14 rounded-none border-b">
                      {tabs.map((tab) => {
                        const IconComponent = tab.icon;
                        return (
                          <TabsTrigger 
                            key={tab.id} 
                            value={tab.id} 
                            className="flex items-center space-x-2 h-12 text-sm font-medium data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
                          >
                            <IconComponent className="h-4 w-4" />
                            <span>{tab.label}</span>
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>
                  </div>

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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                          <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="title" className="text-sm sm:text-base">Service Title *</Label>
                            <Input
                              id="title"
                              placeholder="e.g., Professional Engine Diagnostic & Repair"
                              value={serviceData.title}
                              onChange={(e) => setServiceData({...serviceData, title: e.target.value})}
                              className="h-12 text-base"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="category" className="text-sm sm:text-base">Service Category *</Label>
                            <Select value={serviceData.category} onValueChange={(value) => setServiceData({...serviceData, category: value})}>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="maintenance">Maintenance</SelectItem>
                                <SelectItem value="repair">Repair</SelectItem>
                                <SelectItem value="detailing">Detailing</SelectItem>
                                <SelectItem value="performance">Performance</SelectItem>
                                <SelectItem value="bodywork">Body Work</SelectItem>
                                <SelectItem value="electrical">Electrical</SelectItem>
                                <SelectItem value="towing">Towing</SelectItem>
                                <SelectItem value="inspection">Inspection</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="serviceType" className="text-sm sm:text-base">Service Type *</Label>
                            <Select value={serviceData.serviceType} onValueChange={(value) => setServiceData({...serviceData, serviceType: value})}>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select service type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="mobile">Mobile Service</SelectItem>
                                <SelectItem value="shop">Workshop Service</SelectItem>
                                <SelectItem value="both">Both Mobile & Workshop</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="experience" className="text-sm sm:text-base">Years of Experience</Label>
                            <Select value={serviceData.experience} onValueChange={(value) => setServiceData({...serviceData, experience: value})}>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select experience" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1-2">1-2 years</SelectItem>
                                <SelectItem value="3-5">3-5 years</SelectItem>
                                <SelectItem value="6-10">6-10 years</SelectItem>
                                <SelectItem value="11-15">11-15 years</SelectItem>
                                <SelectItem value="15+">15+ years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="responseTime" className="text-sm sm:text-base">Response Time</Label>
                            <Select value={serviceData.responseTime} onValueChange={(value) => setServiceData({...serviceData, responseTime: value})}>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select response time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="30min">Within 30 minutes</SelectItem>
                                <SelectItem value="1hour">Within 1 hour</SelectItem>
                                <SelectItem value="2hours">Within 2 hours</SelectItem>
                                <SelectItem value="sameday">Same day</SelectItem>
                                <SelectItem value="nextday">Next day</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm sm:text-base">Services Offered</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {serviceOptions.map((service) => (
                              <div key={service} className="flex items-center space-x-2">
                                <Checkbox
                                  id={service}
                                  checked={selectedServices.includes(service)}
                                  onCheckedChange={() => handleServiceToggle(service)}
                                />
                                <Label htmlFor={service} className="text-sm cursor-pointer">
                                  {service}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-sm sm:text-base">Primary Location *</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                              id="location"
                              placeholder="e.g., Colombo, Kandy, Galle"
                              value={serviceData.location}
                              onChange={(e) => setServiceData({...serviceData, location: e.target.value})}
                              className="h-12 text-base pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="serviceArea" className="text-sm sm:text-base">Service Area Coverage</Label>
                          <Input
                            id="serviceArea"
                            placeholder="e.g., Colombo District, Within 25km radius"
                            value={serviceData.serviceArea}
                            onChange={(e) => setServiceData({...serviceData, serviceArea: e.target.value})}
                            className="h-12 text-base"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Detailed Information */}
                  <TabsContent value="details">
                    <Card>
                      <CardHeader className="pb-4 sm:pb-6">
                        <CardTitle className="flex items-center text-lg sm:text-xl">
                          <Settings className="h-5 w-5 mr-2" />
                          Detailed Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 sm:space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="description" className="text-sm sm:text-base">Service Description *</Label>
                          <Textarea
                            id="description"
                            placeholder="Describe your services, expertise, equipment used, and what makes you unique..."
                            value={serviceData.description}
                            onChange={(e) => setServiceData({...serviceData, description: e.target.value})}
                            className="min-h-24 sm:min-h-32 text-base resize-none"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="certifications" className="text-sm sm:text-base">Certifications & Qualifications</Label>
                          <Textarea
                            id="certifications"
                            placeholder="e.g., ASE Certified, Toyota Certified Technician, Specialized Training..."
                            value={serviceData.certifications}
                            onChange={(e) => setServiceData({...serviceData, certifications: e.target.value})}
                            className="min-h-16 sm:min-h-20 text-base resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="availability" className="text-sm sm:text-base">Availability</Label>
                            <Select value={serviceData.availability} onValueChange={(value) => setServiceData({...serviceData, availability: value})}>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select availability" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="24/7">24/7</SelectItem>
                                <SelectItem value="business-hours">Business Hours</SelectItem>
                                <SelectItem value="weekdays">Weekdays Only</SelectItem>
                                <SelectItem value="weekends">Weekends Only</SelectItem>
                                <SelectItem value="appointment">By Appointment</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="warranty" className="text-sm sm:text-base">Warranty Offered</Label>
                            <Select value={serviceData.warranty} onValueChange={(value) => setServiceData({...serviceData, warranty: value})}>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select warranty" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="no-warranty">No Warranty</SelectItem>
                                <SelectItem value="30-days">30 Days</SelectItem>
                                <SelectItem value="90-days">90 Days</SelectItem>
                                <SelectItem value="6-months">6 Months</SelectItem>
                                <SelectItem value="1-year">1 Year</SelectItem>
                                <SelectItem value="custom">Custom Terms</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-base sm:text-lg font-medium">Business Information (Optional)</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="businessName" className="text-sm sm:text-base">Business Name</Label>
                              <Input
                                id="businessName"
                                placeholder="e.g., Sri Lanka Auto Care"
                                value={serviceData.businessName}
                                onChange={(e) => setServiceData({...serviceData, businessName: e.target.value})}
                                className="h-12 text-base"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="businessAddress" className="text-sm sm:text-base">Business Address</Label>
                              <Input
                                id="businessAddress"
                                placeholder="Workshop address"
                                value={serviceData.businessAddress}
                                onChange={(e) => setServiceData({...serviceData, businessAddress: e.target.value})}
                                className="h-12 text-base"
                              />
                            </div>
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
                          Service Photos
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 sm:space-y-6">
                        <div className="text-center">
                          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 sm:p-8">
                            <Camera className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-3 sm:mb-4" />
                            <div className="space-y-2">
                              <h3 className="text-base sm:text-lg font-medium">Upload Service Photos</h3>
                              <p className="text-sm sm:text-base text-muted-foreground px-2">
                                Add photos of your workshop, equipment, previous work, certifications, etc.
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
                              <Button 
                                variant="outline" 
                                className="mt-4 h-12 px-6 cursor-pointer"
                                type="button"
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Choose Photos
                              </Button>
                            </Label>
                          </div>
                        </div>

                        {images.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-4 text-sm sm:text-base">Uploaded Photos ({images.length}/10)</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                              {images.map((image, index) => (
                                <div key={index} className="relative group">
                                  <div className="aspect-square rounded-lg overflow-hidden border">
                                    <img
                                      src={image}
                                      alt={`Service ${index + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                  {index === 0 && (
                                    <Badge className="absolute bottom-2 left-2 bg-primary/80 text-primary-foreground text-xs">
                                      Main Photo
                                    </Badge>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Pricing & Contact */}
                  <TabsContent value="pricing">
                    <Card>
                      <CardHeader className="pb-4 sm:pb-6">
                        <CardTitle className="flex items-center text-lg sm:text-xl">
                          <DollarSign className="h-5 w-5 mr-2" />
                          Pricing & Contact
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="priceType" className="text-sm sm:text-base">Pricing Type *</Label>
                            <Select value={serviceData.priceType} onValueChange={(value) => setServiceData({...serviceData, priceType: value})}>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select pricing type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="fixed">Fixed Price</SelectItem>
                                <SelectItem value="hourly">Hourly Rate</SelectItem>
                                <SelectItem value="quote">Quote Based</SelectItem>
                                <SelectItem value="package">Package Deal</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="price" className="text-sm sm:text-base">Price/Rate (LKR) *</Label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground font-medium">Rs.</span>
                              <Input
                                id="price"
                                type="number"
                                placeholder="e.g., 5000"
                                value={serviceData.price}
                                onChange={(e) => setServiceData({...serviceData, price: e.target.value})}
                                className="h-12 text-base pl-12"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-base sm:text-lg font-medium">Contact Information</h3>
                          
                          <div className="space-y-2">
                            <Label htmlFor="contactMethod" className="text-sm sm:text-base">Preferred Contact Method</Label>
                            <Select value={serviceData.contactMethod} onValueChange={(value) => setServiceData({...serviceData, contactMethod: value})}>
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
                              value={serviceData.phone}
                              onChange={(e) => setServiceData({...serviceData, phone: e.target.value})}
                              className="h-12 text-base"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Mobile navigation buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex gap-3 sm:hidden">
                {currentTabIndex > 0 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={prevTab}
                    className="flex-1 h-12"
                  >
                    Previous
                  </Button>
                )}
                {currentTabIndex < tabs.length - 1 && (
                  <Button 
                    type="button" 
                    onClick={nextTab}
                    className="flex-1 h-12"
                  >
                    Next
                  </Button>
                )}
              </div>

              {/* Submit buttons */}
              <div className="flex gap-3 sm:gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleCancel}
                  className="flex-1 sm:flex-none h-12 px-6"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 sm:flex-none h-12 px-6"
                  disabled={currentTab !== "pricing"}
                >
                  <Check className="h-4 w-4 mr-2" />
                  List Service
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListServicesPage;