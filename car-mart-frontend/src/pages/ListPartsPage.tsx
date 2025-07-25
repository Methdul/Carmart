import { useState } from "react";
import { Upload, X, Plus, MapPin, DollarSign, Calendar, Settings, Camera, FileText, Star, ArrowLeft, Check } from "lucide-react";
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

const ListPartsPage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState("basic");
  const [partData, setPartData] = useState({
    title: "",
    brand: "",
    partNumber: "",
    category: "",
    condition: "",
    price: "",
    description: "",
    compatibility: "",
    warranty: "",
    location: "",
    contactMethod: "",
    phone: "",
    email: ""
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
    console.log("Part listing data:", partData);
    console.log("Images:", images);
    alert("Part listing submitted! This would be processed in a real application.");
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
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-1 sm:mb-2">List Your Part</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Sell automotive parts to thousands of buyers</p>
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
                            <Label htmlFor="title" className="text-sm sm:text-base">Part Title *</Label>
                            <Input
                              id="title"
                              placeholder="e.g., BMW E46 Brake Pads - Front Set"
                              value={partData.title}
                              onChange={(e) => setPartData({...partData, title: e.target.value})}
                              className="h-12 text-base"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="brand" className="text-sm sm:text-base">Brand *</Label>
                            <Select value={partData.brand} onValueChange={(value) => setPartData({...partData, brand: value})}>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select brand" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="oem">OEM</SelectItem>
                                <SelectItem value="toyota">Toyota</SelectItem>
                                <SelectItem value="honda">Honda</SelectItem>
                                <SelectItem value="nissan">Nissan</SelectItem>
                                <SelectItem value="bmw">BMW</SelectItem>
                                <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                                <SelectItem value="audi">Audi</SelectItem>
                                <SelectItem value="bosch">Bosch</SelectItem>
                                <SelectItem value="brembo">Brembo</SelectItem>
                                <SelectItem value="denso">Denso</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="partNumber" className="text-sm sm:text-base">Part Number</Label>
                            <Input
                              id="partNumber"
                              placeholder="e.g., 34116794300"
                              value={partData.partNumber}
                              onChange={(e) => setPartData({...partData, partNumber: e.target.value})}
                              className="h-12 text-base"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="category" className="text-sm sm:text-base">Category *</Label>
                            <Select value={partData.category} onValueChange={(value) => setPartData({...partData, category: value})}>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="engine">Engine Parts</SelectItem>
                                <SelectItem value="brakes">Brake System</SelectItem>
                                <SelectItem value="suspension">Suspension</SelectItem>
                                <SelectItem value="electrical">Electrical</SelectItem>
                                <SelectItem value="body">Body Parts</SelectItem>
                                <SelectItem value="interior">Interior</SelectItem>
                                <SelectItem value="exhaust">Exhaust System</SelectItem>
                                <SelectItem value="transmission">Transmission</SelectItem>
                                <SelectItem value="cooling">Cooling System</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="condition" className="text-sm sm:text-base">Condition *</Label>
                            <Select value={partData.condition} onValueChange={(value) => setPartData({...partData, condition: value})}>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select condition" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="like-new">Like New</SelectItem>
                                <SelectItem value="excellent">Excellent</SelectItem>
                                <SelectItem value="good">Good</SelectItem>
                                <SelectItem value="fair">Fair</SelectItem>
                                <SelectItem value="for-parts">For Parts Only</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-sm sm:text-base">Location *</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                              id="location"
                              placeholder="e.g., Colombo, Kandy, Galle"
                              value={partData.location}
                              onChange={(e) => setPartData({...partData, location: e.target.value})}
                              className="h-12 text-base pl-10"
                              required
                            />
                          </div>
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
                          <Label htmlFor="description" className="text-sm sm:text-base">Description *</Label>
                          <Textarea
                            id="description"
                            placeholder="Describe the part condition, compatibility, installation notes, etc."
                            value={partData.description}
                            onChange={(e) => setPartData({...partData, description: e.target.value})}
                            className="min-h-24 sm:min-h-32 text-base resize-none"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="compatibility" className="text-sm sm:text-base">Vehicle Compatibility</Label>
                          <Textarea
                            id="compatibility"
                            placeholder="e.g., BMW E46 (1998-2006), 320i, 325i, 330i models"
                            value={partData.compatibility}
                            onChange={(e) => setPartData({...partData, compatibility: e.target.value})}
                            className="min-h-16 sm:min-h-20 text-base resize-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="warranty" className="text-sm sm:text-base">Warranty Information</Label>
                          <Input
                            id="warranty"
                            placeholder="e.g., 6 months, 1 year, No warranty"
                            value={partData.warranty}
                            onChange={(e) => setPartData({...partData, warranty: e.target.value})}
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
                          Part Photos
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 sm:space-y-6">
                        <div className="text-center">
                          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 sm:p-8">
                            <Camera className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-3 sm:mb-4" />
                            <div className="space-y-2">
                              <h3 className="text-base sm:text-lg font-medium">Upload Part Photos</h3>
                              <p className="text-sm sm:text-base text-muted-foreground px-2">
                                Add high-quality photos of your part. First photo will be the main image.
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
                                      alt={`Part ${index + 1}`}
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
                        <div className="space-y-2">
                          <Label htmlFor="price" className="text-sm sm:text-base">Price (LKR) *</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground font-medium">Rs.</span>
                            <Input
                              id="price"
                              type="number"
                              placeholder="e.g., 15000"
                              value={partData.price}
                              onChange={(e) => setPartData({...partData, price: e.target.value})}
                              className="h-12 text-base pl-12"
                              required
                            />
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-base sm:text-lg font-medium">Contact Information</h3>
                          
                          <div className="space-y-2">
                            <Label htmlFor="contactMethod" className="text-sm sm:text-base">Preferred Contact Method</Label>
                            <Select value={partData.contactMethod} onValueChange={(value) => setPartData({...partData, contactMethod: value})}>
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
                              value={partData.phone}
                              onChange={(e) => setPartData({...partData, phone: e.target.value})}
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
                  List Part
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListPartsPage;