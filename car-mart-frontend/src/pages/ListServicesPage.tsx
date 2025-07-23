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
    navigate("/services");
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
              <p className="text-sm sm:text-base text-muted-foreground">Offer automotive services to customers across Sri Lanka</p>
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
                className="bg-highlight h-2 rounded-full transition-all duration-300"
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
                      <Label htmlFor="title" className="text-sm sm:text-base">Service Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Professional Car Service & Repair - 15 Years Experience"
                        value={serviceData.title}
                        onChange={(e) => setServiceData({...serviceData, title: e.target.value})}
                        className="h-12 text-base"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="businessName" className="text-sm sm:text-base">Business Name *</Label>
                        <Input
                          id="businessName"
                          placeholder="e.g., Silva Auto Care"
                          value={serviceData.businessName}
                          onChange={(e) => setServiceData({...serviceData, businessName: e.target.value})}
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
                            <SelectItem value="maintenance">Maintenance & Service</SelectItem>
                            <SelectItem value="repair">Repair Services</SelectItem>
                            <SelectItem value="bodywork">Body Work & Paint</SelectItem>
                            <SelectItem value="electrical">Electrical Services</SelectItem>
                            <SelectItem value="ac">AC & Cooling</SelectItem>
                            <SelectItem value="tires">Tire Services</SelectItem>
                            <SelectItem value="detailing">Car Detailing</SelectItem>
                            <SelectItem value="inspection">Vehicle Inspection</SelectItem>
                            <SelectItem value="towing">Towing & Recovery</SelectItem>
                            <SelectItem value="other">Other Services</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm sm:text-base font-medium mb-3 block">Services Offered *</Label>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3">Select all services you provide</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {serviceOptions.map((service) => (
                          <div key={service} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                            <Checkbox
                              id={service}
                              checked={selectedServices.includes(service)}
                              onCheckedChange={() => handleServiceToggle(service)}
                              className="data-[state=checked]:bg-highlight data-[state=checked]:border-highlight"
                            />
                            <Label htmlFor={service} className="text-sm sm:text-base flex-1 cursor-pointer">{service}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-sm sm:text-base">Location *</Label>
                        <Select value={serviceData.location} onValueChange={(value) => setServiceData({...serviceData, location: value})}>
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

                      <div className="space-y-2">
                        <Label htmlFor="serviceArea" className="text-sm sm:text-base">Service Area</Label>
                        <Input
                          id="serviceArea"
                          placeholder="e.g., Colombo & surrounding areas within 20km"
                          value={serviceData.serviceArea}
                          onChange={(e) => setServiceData({...serviceData, serviceArea: e.target.value})}
                          className="h-12 text-base"
                        />
                      </div>
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
                      Service Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm sm:text-base">Service Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your services, expertise, equipment, and what makes you different..."
                        rows={4}
                        value={serviceData.description}
                        onChange={(e) => setServiceData({...serviceData, description: e.target.value})}
                        className="text-base resize-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="experience" className="text-sm sm:text-base">Years of Experience *</Label>
                        <Select value={serviceData.experience} onValueChange={(value) => setServiceData({...serviceData, experience: value})}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-2">1-2 Years</SelectItem>
                            <SelectItem value="3-5">3-5 Years</SelectItem>
                            <SelectItem value="6-10">6-10 Years</SelectItem>
                            <SelectItem value="11-15">11-15 Years</SelectItem>
                            <SelectItem value="16-20">16-20 Years</SelectItem>
                            <SelectItem value="20+">20+ Years</SelectItem>
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
                            <SelectItem value="within-1-hour">Within 1 Hour</SelectItem>
                            <SelectItem value="within-4-hours">Within 4 Hours</SelectItem>
                            <SelectItem value="same-day">Same Day</SelectItem>
                            <SelectItem value="next-day">Next Day</SelectItem>
                            <SelectItem value="within-week">Within a Week</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="certifications" className="text-sm sm:text-base">Certifications & Qualifications</Label>
                      <Textarea
                        id="certifications"
                        placeholder="List your certifications, training, or special qualifications..."
                        rows={3}
                        value={serviceData.certifications}
                        onChange={(e) => setServiceData({...serviceData, certifications: e.target.value})}
                        className="text-base resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="availability" className="text-sm sm:text-base">Availability *</Label>
                        <Select value={serviceData.availability} onValueChange={(value) => setServiceData({...serviceData, availability: value})}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select availability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="24-7">24/7 Available</SelectItem>
                            <SelectItem value="weekdays">Weekdays Only</SelectItem>
                            <SelectItem value="weekends">Weekends Only</SelectItem>
                            <SelectItem value="mon-sat">Monday to Saturday</SelectItem>
                            <SelectItem value="by-appointment">By Appointment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactMethod" className="text-sm sm:text-base">Contact Method *</Label>
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
                            Show your workshop, equipment, previous work, and team.
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
                                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity touch-manipulation"
                              >
                                <X className="h-3 w-3" />
                              </button>
                              {index === 0 && (
                                <Badge className="absolute bottom-2 left-2 bg-highlight text-xs">
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
                        <li>• Show your workshop or service location</li>
                        <li>• Include photos of your equipment and tools</li>
                        <li>• Show examples of your previous work</li>
                        <li>• Include team photos for trust building</li>
                        <li>• Display any certifications or awards</li>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="priceType" className="text-sm sm:text-base">Pricing Type *</Label>
                        <Select value={serviceData.priceType} onValueChange={(value) => setServiceData({...serviceData, priceType: value})}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select pricing type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fixed">Fixed Price</SelectItem>
                            <SelectItem value="hourly">Hourly Rate</SelectItem>
                            <SelectItem value="quote">Quote on Request</SelectItem>
                            <SelectItem value="package">Service Packages</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="price" className="text-sm sm:text-base">Starting Price (LKR) *</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="5000"
                          value={serviceData.price}
                          onChange={(e) => setServiceData({...serviceData, price: e.target.value})}
                          className="h-12 text-base"
                          required
                        />
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {serviceData.priceType === 'hourly' ? 'Per hour rate' : 'Starting from price'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="warranty" className="text-sm sm:text-base">Service Warranty</Label>
                      <Select value={serviceData.warranty} onValueChange={(value) => setServiceData({...serviceData, warranty: value})}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select warranty period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No Warranty</SelectItem>
                          <SelectItem value="30-days">30 Days</SelectItem>
                          <SelectItem value="3-months">3 Months</SelectItem>
                          <SelectItem value="6-months">6 Months</SelectItem>
                          <SelectItem value="1-year">1 Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-3 text-sm sm:text-base">Listing Package</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 sm:p-4 bg-background rounded-lg border-2 border-highlight">
                          <div>
                            <div className="font-medium text-sm sm:text-base">Professional Service Listing</div>
                            <div className="text-xs sm:text-sm text-muted-foreground">60 days visibility + featured badge</div>
                          </div>
                          <div className="text-right">
                            <span className="text-lg sm:text-xl font-bold text-highlight">Rs. 2,000</span>
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
                  className="flex-1 h-12 bg-highlight hover:bg-highlight/90"
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

export default ListServicesPage;