// car-mart-frontend/src/pages/ListPartsPage.tsx
// UPDATED VERSION with Real File Upload Integration
import { useState } from "react";
import { Upload, X, Plus, MapPin, DollarSign, Calendar, Settings, Camera, FileText, Star, ArrowLeft, Check, Loader, Package } from "lucide-react";
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
import { uploadService, UploadedFile } from "@/services/uploadService";

const ListPartsPage = () => {
  const navigate = useNavigate();
  
  // State for uploaded files (URLs from server)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  
  // State for preview images (local URLs before upload)
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  
  // Upload states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
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
    email: "",
    isOEM: false,
    yearFrom: "",
    yearTo: "",
    engineType: ""
  });

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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare submission data with uploaded file URLs
    const submissionData = {
      ...partData,
      images: uploadedFiles.map(file => file.url), // Include uploaded image URLs
      imageCount: uploadedFiles.length
    };
    
    console.log("Part listing data:", submissionData);
    
    // Here you would call your parts creation API
    try {
      // TODO: Call parts creation API with submissionData
      // const response = await partsService.createPart(submissionData);
      
      alert(`Part listing submitted successfully with ${uploadedFiles.length} images!`);
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
              <h1 className="text-3xl font-bold">List Auto Parts</h1>
              <p className="text-muted-foreground">Fill in the details to list your auto parts for sale</p>
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
                      <Package className="h-5 w-5" />
                      Part Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Part Title *</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Front Brake Pads Set"
                          value={partData.title}
                          onChange={(e) => setPartData({...partData, title: e.target.value})}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="brand">Brand *</Label>
                        <Input
                          id="brand"
                          placeholder="e.g., Bosch, Brembo, OEM"
                          value={partData.brand}
                          onChange={(e) => setPartData({...partData, brand: e.target.value})}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="partNumber">Part Number</Label>
                        <Input
                          id="partNumber"
                          placeholder="e.g., BP-001-XZ"
                          value={partData.partNumber}
                          onChange={(e) => setPartData({...partData, partNumber: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select onValueChange={(value) => setPartData({...partData, category: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="engine">Engine Parts</SelectItem>
                            <SelectItem value="brakes">Brakes</SelectItem>
                            <SelectItem value="suspension">Suspension</SelectItem>
                            <SelectItem value="electrical">Electrical</SelectItem>
                            <SelectItem value="exhaust">Exhaust System</SelectItem>
                            <SelectItem value="transmission">Transmission</SelectItem>
                            <SelectItem value="cooling">Cooling System</SelectItem>
                            <SelectItem value="interior">Interior</SelectItem>
                            <SelectItem value="exterior">Exterior</SelectItem>
                            <SelectItem value="wheels">Wheels & Tires</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="condition">Condition *</Label>
                        <Select onValueChange={(value) => setPartData({...partData, condition: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">Brand New</SelectItem>
                            <SelectItem value="like-new">Like New</SelectItem>
                            <SelectItem value="good">Good Condition</SelectItem>
                            <SelectItem value="fair">Fair Condition</SelectItem>
                            <SelectItem value="refurbished">Refurbished</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="price">Price (LKR) *</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="e.g., 15000"
                          value={partData.price}
                          onChange={(e) => setPartData({...partData, price: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the part, its condition, compatibility, and any other relevant details..."
                        className="min-h-[100px]"
                        value={partData.description}
                        onChange={(e) => setPartData({...partData, description: e.target.value})}
                        required
                      />
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
                    <CardTitle>Compatibility & Specifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="compatibility">Compatible Vehicles</Label>
                        <Textarea
                          id="compatibility"
                          placeholder="e.g., Toyota Camry 2015-2020, Honda Accord 2016-2018"
                          value={partData.compatibility}
                          onChange={(e) => setPartData({...partData, compatibility: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="warranty">Warranty Information</Label>
                        <Input
                          id="warranty"
                          placeholder="e.g., 6 months, 1 year, No warranty"
                          value={partData.warranty}
                          onChange={(e) => setPartData({...partData, warranty: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="yearFrom">Fits Year From</Label>
                        <Input
                          id="yearFrom"
                          type="number"
                          placeholder="e.g., 2015"
                          value={partData.yearFrom}
                          onChange={(e) => setPartData({...partData, yearFrom: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="yearTo">Fits Year To</Label>
                        <Input
                          id="yearTo"
                          type="number"
                          placeholder="e.g., 2020"
                          value={partData.yearTo}
                          onChange={(e) => setPartData({...partData, yearTo: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="engineType">Engine Type</Label>
                        <Input
                          id="engineType"
                          placeholder="e.g., 2.0L Turbo, V6 3.5L"
                          value={partData.engineType}
                          onChange={(e) => setPartData({...partData, engineType: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <Select onValueChange={(value) => setPartData({...partData, location: value})}>
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
                      Part Photos
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
                            {isUploading ? 'Uploading...' : 'Upload Part Photos'}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Upload up to 10 clear photos of your part.<br />
                            Include different angles and any damage or wear.
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
                                  alt={`Part ${index + 1}`}
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
                        <Select onValueChange={(value) => setPartData({...partData, contactMethod: value})}>
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
                          value={partData.phone}
                          onChange={(e) => setPartData({...partData, phone: e.target.value})}
                          required
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={partData.email}
                          onChange={(e) => setPartData({...partData, email: e.target.value})}
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
                      List Part
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

export default ListPartsPage;