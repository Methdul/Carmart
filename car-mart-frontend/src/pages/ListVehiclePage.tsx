import { useState } from "react";
import { Upload, X, Plus, MapPin, DollarSign, Calendar, Fuel, Settings, Camera, FileText, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";

const ListVehiclePage = () => {
  const [images, setImages] = useState<string[]>([]);
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
    color: ""
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
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">List Your Vehicle</h1>
            <p className="text-muted-foreground">Create a premium listing and reach thousands of potential buyers</p>
          </div>

          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
              </TabsList>

              {/* Basic Information */}
              <TabsContent value="basic">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Listing Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., BMW 3 Series 320i Sport Line - Excellent Condition"
                        value={vehicleData.title}
                        onChange={(e) => setVehicleData({...vehicleData, title: e.target.value})}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="make">Make *</Label>
                        <Select onValueChange={(value) => setVehicleData({...vehicleData, make: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select make" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="toyota">Toyota</SelectItem>
                            <SelectItem value="honda">Honda</SelectItem>
                            <SelectItem value="bmw">BMW</SelectItem>
                            <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                            <SelectItem value="audi">Audi</SelectItem>
                            <SelectItem value="nissan">Nissan</SelectItem>
                            <SelectItem value="hyundai">Hyundai</SelectItem>
                            <SelectItem value="ford">Ford</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="model">Model *</Label>
                        <Input
                          id="model"
                          placeholder="e.g., Civic, Camry, X5"
                          value={vehicleData.model}
                          onChange={(e) => setVehicleData({...vehicleData, model: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="year">Year *</Label>
                        <Select onValueChange={(value) => setVehicleData({...vehicleData, year: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 30 }, (_, i) => 2024 - i).map(year => (
                              <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bodyType">Body Type *</Label>
                        <Select onValueChange={(value) => setVehicleData({...vehicleData, bodyType: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Body type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sedan">Sedan</SelectItem>
                            <SelectItem value="hatchback">Hatchback</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                            <SelectItem value="coupe">Coupe</SelectItem>
                            <SelectItem value="convertible">Convertible</SelectItem>
                            <SelectItem value="wagon">Wagon</SelectItem>
                            <SelectItem value="truck">Truck</SelectItem>
                            <SelectItem value="van">Van</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="color">Color</Label>
                        <Input
                          id="color"
                          placeholder="e.g., Black, White, Silver"
                          value={vehicleData.color}
                          onChange={(e) => setVehicleData({...vehicleData, color: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          placeholder="City, District"
                          className="pl-10"
                          value={vehicleData.location}
                          onChange={(e) => setVehicleData({...vehicleData, location: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Vehicle Details */}
              <TabsContent value="details">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      Vehicle Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="mileage">Mileage (km) *</Label>
                        <Input
                          id="mileage"
                          type="number"
                          placeholder="e.g., 50000"
                          value={vehicleData.mileage}
                          onChange={(e) => setVehicleData({...vehicleData, mileage: e.target.value})}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="engineCapacity">Engine Capacity (cc)</Label>
                        <Input
                          id="engineCapacity"
                          type="number"
                          placeholder="e.g., 1800"
                          value={vehicleData.engineCapacity}
                          onChange={(e) => setVehicleData({...vehicleData, engineCapacity: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fuelType">Fuel Type *</Label>
                        <Select onValueChange={(value) => setVehicleData({...vehicleData, fuelType: value})}>
                          <SelectTrigger>
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
                        <Label htmlFor="transmission">Transmission *</Label>
                        <Select onValueChange={(value) => setVehicleData({...vehicleData, transmission: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Transmission" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="manual">Manual</SelectItem>
                            <SelectItem value="automatic">Automatic</SelectItem>
                            <SelectItem value="cvt">CVT</SelectItem>
                            <SelectItem value="semi-automatic">Semi-Automatic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition *</Label>
                      <Select onValueChange={(value) => setVehicleData({...vehicleData, condition: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Vehicle condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="very-good">Very Good</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vin">VIN Number (Optional)</Label>
                      <Input
                        id="vin"
                        placeholder="Vehicle Identification Number"
                        value={vehicleData.vin}
                        onChange={(e) => setVehicleData({...vehicleData, vin: e.target.value})}
                      />
                      <p className="text-xs text-muted-foreground">
                        VIN helps verify vehicle details and increases buyer trust
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your vehicle's features, maintenance history, and any additional information..."
                        rows={6}
                        value={vehicleData.description}
                        onChange={(e) => setVehicleData({...vehicleData, description: e.target.value})}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Photos */}
              <TabsContent value="photos">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Camera className="h-5 w-5 mr-2" />
                      Photos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="photo-upload"
                        />
                        <label htmlFor="photo-upload" className="cursor-pointer">
                          <div className="flex flex-col items-center">
                            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-lg font-medium text-primary">Upload Photos</p>
                            <p className="text-sm text-muted-foreground">
                              Drag and drop or click to browse
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Vehicle photo ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            {index === 0 && (
                              <Badge className="absolute bottom-2 left-2 bg-primary">
                                Main Photo
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="text-sm text-muted-foreground">
                      <p><strong>Photo Tips:</strong></p>
                      <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>Upload at least 5 high-quality photos</li>
                        <li>Include exterior angles (front, back, sides)</li>
                        <li>Show interior (dashboard, seats, controls)</li>
                        <li>Capture engine bay and any special features</li>
                        <li>Ensure good lighting and clean vehicle</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Pricing */}
              <TabsContent value="pricing">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2" />
                      Pricing & Publication
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="price">Asking Price (LKR) *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="price"
                          type="number"
                          placeholder="e.g., 5500000"
                          className="pl-10"
                          value={vehicleData.price}
                          onChange={(e) => setVehicleData({...vehicleData, price: e.target.value})}
                          required
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Set a competitive price based on vehicle condition and market value
                      </p>
                    </div>

                    <Separator />

                    <div className="bg-muted/50 p-6 rounded-lg">
                      <h3 className="font-semibold mb-4">Listing Package</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                          <div>
                            <h4 className="font-medium">Standard Listing</h4>
                            <p className="text-sm text-muted-foreground">30 days visibility, basic features</p>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-primary">Free</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-background rounded-lg border-2 border-highlight">
                          <div>
                            <h4 className="font-medium flex items-center">
                              Premium Listing 
                              <Badge className="ml-2 bg-highlight">Featured</Badge>
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              60 days, priority placement, AI health score, premium support
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-primary">Rs. 2,500</span>
                            <p className="text-xs text-muted-foreground">One-time fee</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="terms" required />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <a href="/terms" className="text-highlight hover:underline">Terms of Service</a> and{" "}
                        <a href="/privacy" className="text-highlight hover:underline">Privacy Policy</a>
                      </Label>
                    </div>

                    <div className="flex space-x-4">
                      <Button type="button" variant="outline" className="flex-1">
                        Save as Draft
                      </Button>
                      <Button type="submit" className="flex-1 bg-highlight hover:bg-highlight/90">
                        Publish Listing
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListVehiclePage;