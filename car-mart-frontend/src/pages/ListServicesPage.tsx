// car-mart-frontend/src/pages/ListServicesPage.tsx
// UPDATED VERSION with Real File Upload Integration
import { useState } from "react";
import { Upload, X, Plus, MapPin, DollarSign, Calendar, Settings, Camera, FileText, Star, ArrowLeft, Check, Clock, Shield, Loader, Wrench } from "lucide-react";
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
import { uploadService, UploadedFile } from "@/services/uploadService";

const ListServicesPage = () => {
  const navigate = useNavigate();
  
  // State for uploaded files (URLs from server)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  
  // State for preview images (local URLs before upload)
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  
  // Upload states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
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
    businessAddress: "",
    isEmergency: false,
    isMobile: false,
    hasInsurance: false
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const serviceOptions = [
    "Oil Change", "Brake Service", "Tire Installation", "Engine Repair",
    "Transmission Service", "AC Repair", "Electrical Work", "Body Work",
    "Paint Service", "Detailing", "Inspection", "Towing"
  ];

  // Handle file selection and upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadError(null);

    // Validate files before upload
    const validation = uploadService.validateFiles(files);
    if (!validation.isValid) {
      setUploadError(validation.error || 'Invalid files');
      return;
    }

    // Create preview URLs immediately for user feedback
    const newPreviewUrls = uploadService.createPreviewUrls(files);
    setPreviewImages(prev => [...prev, ...newPreviewUrls]);

    try {
      setIsUploading(true);
      
      // Upload files to server
      const response = await uploadService.uploadImages(files);
      
      if (response.success) {
        // Add uploaded files to state
        setUploadedFiles(prev => [...prev, ...response.data.files]);
        
        // Clear the file input
        e.target.value = '';
        
        console.log('✅ Upload successful:', response.data.files);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
      
      // Remove preview images on error
      uploadService.cleanupPreviewUrls(newPreviewUrls);
      setPreviewImages(prev => prev.filter((_, index) => 
        index < prev.length - newPreviewUrls.length
      ));
    } finally {
      setIsUploading(false);
    }
  };

  // Remove uploaded image
  const removeImage = async (index: number) => {
    const fileToRemove = uploadedFiles[index];
    
    if (fileToRemove) {
      try {
        // Delete from server
        await uploadService.deleteFile(fileToRemove.filename);
        
        // Remove from state
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
        
        console.log('✅ File deleted:', fileToRemove.filename);
      } catch (error) {
        console.error('Delete failed:', error);
        setUploadError('Failed to delete file');
      }
    }

    // Also remove preview image if exists
    if (previewImages[index]) {
      URL.revokeObjectURL(previewImages[index]);
      setPreviewImages(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare submission data with uploaded file URLs
    const submissionData = {
      ...serviceData,
      services: selectedServices,
      images: uploadedFiles.map(file => file.url), // Include uploaded image URLs
      imageCount: uploadedFiles.length
    };
    
    console.log("Service listing data:", submissionData);
    
    // Here you would call your services creation API
    try {
      // TODO: Call services creation API with submissionData
      // const response = await servicesService.createService(submissionData);
      
      alert(`Service listing submitted successfully with ${uploadedFiles.length} images!`);
      // navigate('/dashboard');
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit listing. Please try again.');
    }
  };

  // Combine uploaded files and preview images for display
  const allImages = [
    ...uploadedFiles.map(file => file.url), // Uploaded images
    ...previewImages // Preview images (during upload)
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">List Your Service</h1>
              <p className="text-muted-foreground">Register your automotive service to reach more customers</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>

              {/* Basic Info Tab */}
              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wrench className="h-5 w-5" />
                      Service Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Service Title *</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Professional Auto Repair Services"
                          value={serviceData.title}
                          onChange={(e) => setServiceData({...serviceData, title: e.target.value})}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                          id="businessName"
                          placeholder="e.g., AutoFix Garage"
                          value={serviceData.businessName}
                          onChange={(e) => setServiceData({...serviceData, businessName: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Service Category *</Label>
                        <Select onValueChange={(value) => setServiceData({...serviceData, category: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="repair">General Repair</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="bodywork">Body Work & Paint</SelectItem>
                            <SelectItem value="electrical">Electrical Services</SelectItem>
                            <SelectItem value="towing">Towing Services</SelectItem>
                            <SelectItem value="detailing">Car Detailing</SelectItem>
                            <SelectItem value="inspection">Vehicle Inspection</SelectItem>
                            <SelectItem value="specialty">Specialty Services</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Select onValueChange={(value) => setServiceData({...serviceData, experience: value})}>
                          <SelectTrigger>
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
                        <Label htmlFor="priceType">Pricing Type *</Label>
                        <Select onValueChange={(value) => setServiceData({...serviceData, priceType: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select pricing type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly Rate</SelectItem>
                            <SelectItem value="fixed">Fixed Price</SelectItem>
                            <SelectItem value="quote">Quote on Request</SelectItem>
                            <SelectItem value="package">Service Packages</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="price">Starting Price (LKR)</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="e.g., 2500"
                          value={serviceData.price}
                          onChange={(e) => setServiceData({...serviceData, price: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Service Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your services, specializations, equipment, and what makes your service unique..."
                        className="min-h-[100px]"
                        value={serviceData.description}
                        onChange={(e) => setServiceData({...serviceData, description: e.target.value})}
                        required
                      />
                    </div>

                    {/* Service Checkboxes */}
                    <div className="space-y-4">
                      <Label>Services Offered *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {serviceOptions.map((service) => (
                          <div key={service} className="flex items-center space-x-2">
                            <Checkbox
                              id={service}
                              checked={selectedServices.includes(service)}
                              onCheckedChange={() => handleServiceToggle(service)}
                            />
                            <Label htmlFor={service} className="text-sm">
                              {service}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={() => setCurrentTab("details")}
                      >
                        Next: Details
                        <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Details Tab */}
              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Service Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <Select onValueChange={(value) => setServiceData({...serviceData, location: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="colombo">Colombo</SelectItem>
                            <SelectItem value="kandy">Kandy</SelectItem>
                            <SelectItem value="galle">Galle</SelectItem>
                            <SelectItem value="negombo">Negombo</SelectItem>
                            <SelectItem value="kurunegala">Kurunegala</SelectItem>
                            <SelectItem value="anuradhapura">Anuradhapura</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="serviceArea">Service Area</Label>
                        <Input
                          id="serviceArea"
                          placeholder="e.g., Within 20km of Colombo"
                          value={serviceData.serviceArea}
                          onChange={(e) => setServiceData({...serviceData, serviceArea: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="availability">Availability</Label>
                        <Select onValueChange={(value) => setServiceData({...serviceData, availability: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select availability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekdays">Weekdays Only</SelectItem>
                            <SelectItem value="weekends">Weekends Only</SelectItem>
                            <SelectItem value="everyday">7 Days a Week</SelectItem>
                            <SelectItem value="flexible">Flexible Hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="responseTime">Response Time</Label>
                        <Select onValueChange={(value) => setServiceData({...serviceData, responseTime: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select response time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Within 1 hour</SelectItem>
                            <SelectItem value="same-day">Same day</SelectItem>
                            <SelectItem value="next-day">Next day</SelectItem>
                            <SelectItem value="2-3-days">2-3 days</SelectItem>
                            <SelectItem value="scheduled">Scheduled appointments</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="warranty">Warranty Offered</Label>
                        <Input
                          id="warranty"
                          placeholder="e.g., 6 months on parts, 90 days on labor"
                          value={serviceData.warranty}
                          onChange={(e) => setServiceData({...serviceData, warranty: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="certifications">Certifications</Label>
                        <Input
                          id="certifications"
                          placeholder="e.g., ASE Certified, Toyota Specialist"
                          value={serviceData.certifications}
                          onChange={(e) => setServiceData({...serviceData, certifications: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessAddress">Business Address</Label>
                      <Textarea
                        id="businessAddress"
                        placeholder="Enter your complete business address..."
                        value={serviceData.businessAddress}
                        onChange={(e) => setServiceData({...serviceData, businessAddress: e.target.value})}
                      />
                    </div>

                    {/* Service Features */}
                    <div className="space-y-4">
                      <Label>Service Features</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="mobile"
                            checked={serviceData.isMobile}
                            onCheckedChange={(checked) => 
                              setServiceData({...serviceData, isMobile: checked as boolean})
                            }
                          />
                          <Label htmlFor="mobile" className="text-sm flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            Mobile Service
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="emergency"
                            checked={serviceData.isEmergency}
                            onCheckedChange={(checked) => 
                              setServiceData({...serviceData, isEmergency: checked as boolean})
                            }
                          />
                          <Label htmlFor="emergency" className="text-sm flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            24/7 Emergency
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="insurance"
                            checked={serviceData.hasInsurance}
                            onCheckedChange={(checked) => 
                              setServiceData({...serviceData, hasInsurance: checked as boolean})
                            }
                          />
                          <Label htmlFor="insurance" className="text-sm flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Insured Service
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentTab("basic")}
                      >
                        Previous
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setCurrentTab("photos")}
                      >
                        Next: Photos
                        <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Photos Tab - Updated with Real Upload */}
              <TabsContent value="photos" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="h-5 w-5" />
                      Service Photos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          {isUploading ? (
                            <Loader className="h-6 w-6 text-primary animate-spin" />
                          ) : (
                            <Upload className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        <div className="text-center">
                          <h3 className="font-semibold text-lg mb-2">
                            {isUploading ? 'Uploading...' : 'Upload Service Photos'}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Upload up to 10 photos of your workspace, equipment, or completed work.<br />
                            Show potential customers what makes your service professional.
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Supported: JPEG, PNG, WebP (max 5MB each)
                          </p>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="photo-upload"
                          disabled={isUploading}
                        />
                        <Label htmlFor="photo-upload">
                          <Button 
                            variant="outline" 
                            className="mt-4 h-12 px-6 cursor-pointer"
                            type="button"
                            disabled={isUploading}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            {isUploading ? 'Uploading...' : 'Choose Photos'}
                          </Button>
                        </Label>
                      </div>
                    </div>

                    {/* Upload Error */}
                    {uploadError && (
                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                        <p className="text-destructive text-sm">{uploadError}</p>
                      </div>
                    )}

                    {/* Uploaded Images */}
                    {allImages.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-sm sm:text-base">
                            Photos ({allImages.length}/10)
                          </h4>
                          <Badge variant="outline">
                            {uploadedFiles.length} uploaded, {previewImages.length} uploading
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                          {allImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square rounded-lg overflow-hidden border">
                                <img
                                  src={image}
                                  alt={`Service ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                {/* Loading overlay for preview images */}
                                {index >= uploadedFiles.length && (
                                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <Loader className="h-6 w-6 text-white animate-spin" />
                                  </div>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                disabled={isUploading}
                              >
                                <X className="h-4 w-4" />
                              </button>
                              {/* Main image indicator */}
                              {index === 0 && (
                                <Badge className="absolute bottom-2 left-2 text-xs">
                                  Main
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentTab("details")}
                      >
                        Previous
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setCurrentTab("contact")}
                        disabled={uploadedFiles.length === 0}
                      >
                        Next: Contact
                        <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contact Tab */}
              <TabsContent value="contact" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="contactMethod">Preferred Contact Method *</Label>
                        <Select onValueChange={(value) => setServiceData({...serviceData, contactMethod: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select contact method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="phone">Phone Call</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="both">Phone & Email</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          placeholder="e.g., +94 77 123 4567"
                          value={serviceData.phone}
                          onChange={(e) => setServiceData({...serviceData, phone: e.target.value})}
                          required
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={serviceData.email}
                          onChange={(e) => setServiceData({...serviceData, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between pt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentTab("photos")}
                      >
                        Previous
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Submit Button */}
              <div className="mt-8 flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isUploading || uploadedFiles.length === 0}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isUploading ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      List Service
                    </>
                  )}
                </Button>
              </div>
            </Tabs>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListServicesPage;