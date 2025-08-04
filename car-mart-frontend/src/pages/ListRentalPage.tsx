// car-mart-frontend/src/pages/ListRentalPage.tsx
// ✅ CREATE THIS NEW FILE - Following ListVehiclePage Pattern

import { useState, useEffect } from "react";  
import { useNavigate } from "react-router-dom";
import { 
  Car, 
  Upload, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Users, 
  Fuel, 
  Settings, 
  Shield, 
  Truck,
  Clock,
  AlertCircle,
  CheckCircle,
  X,
  Plus,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { apiService } from "@/services/api";

interface RentalFormData {
  // Basic Information
  title: string;
  description: string;
  make: string;
  model: string;
  year: number | string;
  
  // Pricing
  daily_rate: number | string;
  weekly_rate: number | string;
  monthly_rate: number | string;
  security_deposit: number | string;
  
  // Vehicle Details
  fuel_type: string;
  transmission: string;
  body_type: string;
  engine_capacity: number | string;
  seats: number | string;
  doors: number | string;
  color: string;
  mileage: number | string;
  condition: string;
  
  // Rental Terms
  rental_type: string;
  minimum_rental_days: number | string;
  maximum_rental_days: number | string;
  fuel_policy: string;
  mileage_limit_per_day: number | string;
  extra_mileage_charge: number | string;
  
  // Location & Availability
  location: string;
  available_from: string;
  available_until: string;
  
  // Features & Services
  features: string[];
  included_items: string[];
  pickup_locations: string[];
  delivery_available: boolean;
  delivery_fee: number | string;
  insurance_included: boolean;
  
  // Marketing
  is_featured: boolean;
}

const ListRentalPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const [formData, setFormData] = useState<RentalFormData>({
    // Basic Information
    title: "",
    description: "",
    make: "",
    model: "",
    year: "",
    
    // Pricing
    daily_rate: "",
    weekly_rate: "",
    monthly_rate: "",
    security_deposit: "",
    
    // Vehicle Details
    fuel_type: "",
    transmission: "",
    body_type: "",
    engine_capacity: "",
    seats: "",
    doors: "",
    color: "",
    mileage: "",
    condition: "",
    
    // Rental Terms
    rental_type: "daily",
    minimum_rental_days: 1,
    maximum_rental_days: 30,
    fuel_policy: "full-to-full",
    mileage_limit_per_day: 200,
    extra_mileage_charge: "",
    
    // Location & Availability
    location: "",
    available_from: new Date().toISOString().split('T')[0],
    available_until: "",
    
    // Features & Services
    features: [],
    included_items: [],
    pickup_locations: [],
    delivery_available: false,
    delivery_fee: "",
    insurance_included: false,
    
    // Marketing
    is_featured: false,
  });

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/auth');
      return;
    }
  }, [navigate]);

  // Handle form input changes
  const handleInputChange = (field: keyof RentalFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle array field changes (features, included_items, pickup_locations)
  const handleArrayChange = (field: 'features' | 'included_items' | 'pickup_locations', value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
    }
  };

  const removeArrayItem = (field: 'features' | 'included_items' | 'pickup_locations', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // Handle image uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 10) {
      setError("Maximum 10 images allowed");
      return;
    }

    setImages(prev => [...prev, ...files]);
    
    // Create preview URLs
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreview(prev => prev.filter((_, i) => i !== index));
  };

  // Form validation
  const validateForm = (): string | null => {
    if (!formData.title.trim()) return "Title is required";
    if (!formData.description.trim()) return "Description is required";
    if (!formData.make.trim()) return "Make is required";
    if (!formData.model.trim()) return "Model is required";
    if (!formData.year) return "Year is required";
    if (!formData.daily_rate) return "Daily rate is required";
    if (!formData.location.trim()) return "Location is required";
    if (!formData.fuel_type) return "Fuel type is required";
    if (!formData.transmission) return "Transmission is required";
    if (!formData.body_type) return "Body type is required";
    if (!formData.seats) return "Number of seats is required";
    if (!formData.condition) return "Condition is required";
    if (!formData.security_deposit) return "Security deposit is required";
    
    return null;
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Upload images first if any
      let imageUrls: string[] = [];
      if (images.length > 0) {
        const uploadResponse = await apiService.uploadImages(images);
        if (uploadResponse.success) {
          imageUrls = uploadResponse.data.urls;
        }
      }

      // Prepare rental data
      const rentalData = {
        ...formData,
        // Convert string numbers to actual numbers
        year: parseInt(formData.year as string),
        daily_rate: parseFloat(formData.daily_rate as string),
        weekly_rate: formData.weekly_rate ? parseFloat(formData.weekly_rate as string) : null,
        monthly_rate: formData.monthly_rate ? parseFloat(formData.monthly_rate as string) : null,
        security_deposit: parseFloat(formData.security_deposit as string),
        engine_capacity: formData.engine_capacity ? parseFloat(formData.engine_capacity as string) : null,
        seats: parseInt(formData.seats as string),
        doors: formData.doors ? parseInt(formData.doors as string) : null,
        mileage: formData.mileage ? parseInt(formData.mileage as string) : null,
        minimum_rental_days: parseInt(formData.minimum_rental_days as string),
        maximum_rental_days: parseInt(formData.maximum_rental_days as string),
        mileage_limit_per_day: parseInt(formData.mileage_limit_per_day as string),
        extra_mileage_charge: formData.extra_mileage_charge ? parseFloat(formData.extra_mileage_charge as string) : null,
        delivery_fee: formData.delivery_fee ? parseFloat(formData.delivery_fee as string) : 0,
        images: imageUrls,
        // Set default values
        is_active: true,
        is_available: true,
        is_verified: false,
        average_rating: 0,
        total_reviews: 0,
        views_count: 0,
        favorites_count: 0,
        booking_count: 0
      };

      const response = await apiService.createRental(rentalData);
      
      if (response.success) {
        setSubmitSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError(response.message || "Failed to create rental listing");
      }
    } catch (err: any) {
      setError(err.message || "Failed to create rental listing");
    } finally {
      setLoading(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-primary mb-2">Rental Listed Successfully!</h1>
            <p className="text-muted-foreground mb-4">
              Your rental listing has been submitted and is pending verification.
            </p>
            <Button onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">List Your Rental Car</h1>
            <p className="text-muted-foreground">
              Create a rental listing to earn money from your vehicle
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Car className="h-5 w-5" />
                  <span>Basic Information</span>
                </CardTitle>
                <CardDescription>
                  Provide basic details about your rental vehicle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="title">Listing Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., 2023 Honda Civic - Perfect City Car"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="make">Make *</Label>
                    <Select value={formData.make} onValueChange={(value) => handleInputChange('make', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select make" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Toyota">Toyota</SelectItem>
                        <SelectItem value="Honda">Honda</SelectItem>
                        <SelectItem value="Nissan">Nissan</SelectItem>
                        <SelectItem value="BMW">BMW</SelectItem>
                        <SelectItem value="Mercedes-Benz">Mercedes-Benz</SelectItem>
                        <SelectItem value="Audi">Audi</SelectItem>
                        <SelectItem value="Suzuki">Suzuki</SelectItem>
                        <SelectItem value="Mitsubishi">Mitsubishi</SelectItem>
                        <SelectItem value="Mazda">Mazda</SelectItem>
                        <SelectItem value="Hyundai">Hyundai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="model">Model *</Label>
                    <Input
                      id="model"
                      placeholder="e.g., Civic"
                      value={formData.model}
                      onChange={(e) => handleInputChange('model', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="year">Year *</Label>
                    <Select value={formData.year.toString()} onValueChange={(value) => handleInputChange('year', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 25 }, (_, i) => {
                          const year = 2024 - i;
                          return (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      placeholder="e.g., White"
                      value={formData.color}
                      onChange={(e) => handleInputChange('color', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your vehicle, its condition, and what makes it special..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Pricing & Terms</span>
                </CardTitle>
                <CardDescription>
                  Set your rental rates and terms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="daily_rate">Daily Rate (LKR) *</Label>
                    <Input
                      id="daily_rate"
                      type="number"
                      placeholder="5000"
                      value={formData.daily_rate}
                      onChange={(e) => handleInputChange('daily_rate', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="weekly_rate">Weekly Rate (LKR)</Label>
                    <Input
                      id="weekly_rate"
                      type="number"
                      placeholder="30000"
                      value={formData.weekly_rate}
                      onChange={(e) => handleInputChange('weekly_rate', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="monthly_rate">Monthly Rate (LKR)</Label>
                    <Input
                      id="monthly_rate"
                      type="number"
                      placeholder="120000"
                      value={formData.monthly_rate}
                      onChange={(e) => handleInputChange('monthly_rate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="security_deposit">Security Deposit (LKR) *</Label>
                    <Input
                      id="security_deposit"
                      type="number"
                      placeholder="25000"
                      value={formData.security_deposit}
                      onChange={(e) => handleInputChange('security_deposit', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="minimum_rental_days">Minimum Rental Days</Label>
                    <Input
                      id="minimum_rental_days"
                      type="number"
                      placeholder="1"
                      value={formData.minimum_rental_days}
                      onChange={(e) => handleInputChange('minimum_rental_days', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Specifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Vehicle Specifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fuel_type">Fuel Type *</Label>
                    <Select value={formData.fuel_type} onValueChange={(value) => handleInputChange('fuel_type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Petrol">Petrol</SelectItem>
                        <SelectItem value="Diesel">Diesel</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        <SelectItem value="Electric">Electric</SelectItem>
                        <SelectItem value="CNG">CNG</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="transmission">Transmission *</Label>
                    <Select value={formData.transmission} onValueChange={(value) => handleInputChange('transmission', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Automatic">Automatic</SelectItem>
                        <SelectItem value="Manual">Manual</SelectItem>
                        <SelectItem value="CVT">CVT</SelectItem>
                        <SelectItem value="Semi-Automatic">Semi-Automatic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="body_type">Body Type *</Label>
                    <Select value={formData.body_type} onValueChange={(value) => handleInputChange('body_type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select body type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sedan">Sedan</SelectItem>
                        <SelectItem value="SUV">SUV</SelectItem>
                        <SelectItem value="Hatchback">Hatchback</SelectItem>
                        <SelectItem value="Coupe">Coupe</SelectItem>
                        <SelectItem value="Wagon">Wagon</SelectItem>
                        <SelectItem value="Van">Van</SelectItem>
                        <SelectItem value="Pickup">Pickup Truck</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="condition">Condition *</Label>
                    <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Needs Work">Needs Work</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="seats">Number of Seats *</Label>
                    <Select value={formData.seats.toString()} onValueChange={(value) => handleInputChange('seats', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select seats" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 Seats</SelectItem>
                        <SelectItem value="4">4 Seats</SelectItem>
                        <SelectItem value="5">5 Seats</SelectItem>
                        <SelectItem value="7">7 Seats</SelectItem>
                        <SelectItem value="8">8+ Seats</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="mileage">Mileage (km)</Label>
                    <Input
                      id="mileage"
                      type="number"
                      placeholder="50000"
                      value={formData.mileage}
                      onChange={(e) => handleInputChange('mileage', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location & Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Location & Availability</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Primary Location *</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Colombo 03"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="available_from">Available From</Label>
                    <Input
                      id="available_from"
                      type="date"
                      value={formData.available_from}
                      onChange={(e) => handleInputChange('available_from', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="delivery_available"
                      checked={formData.delivery_available}
                      onCheckedChange={(checked) => handleInputChange('delivery_available', checked)}
                    />
                    <Label htmlFor="delivery_available">Delivery Available</Label>
                  </div>

                  {formData.delivery_available && (
                    <div>
                      <Label htmlFor="delivery_fee">Delivery Fee (LKR)</Label>
                      <Input
                        id="delivery_fee"
                        type="number"
                        placeholder="1500"
                        value={formData.delivery_fee}
                        onChange={(e) => handleInputChange('delivery_fee', e.target.value)}
                      />
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="insurance_included"
                      checked={formData.insurance_included}
                      onCheckedChange={(checked) => handleInputChange('insurance_included', checked)}
                    />
                    <Label htmlFor="insurance_included">Insurance Included</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Photos</span>
                </CardTitle>
                <CardDescription>
                  Add up to 10 high-quality photos of your vehicle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <div className="space-y-2">
                      <Label htmlFor="images" className="cursor-pointer">
                        <span className="text-primary hover:underline">Click to upload photos</span>
                        <span className="text-muted-foreground"> or drag and drop</span>
                      </Label>
                      <Input
                        id="images"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <p className="text-sm text-muted-foreground">
                        PNG, JPG up to 5MB each (max 10 photos)
                      </p>
                    </div>
                  </div>

                  {imagePreview.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {imagePreview.map((src, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={src}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="min-w-32">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Rental Listing'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ListRentalPage;