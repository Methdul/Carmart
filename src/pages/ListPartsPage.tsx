import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Plus, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ListPartsPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    partName: "",
    partNumber: "",
    brand: "",
    category: "",
    condition: "",
    price: "",
    description: "",
    warranty: "",
    negotiable: false,
    location: "",
    contactMethod: "phone"
  });

  const [compatibility, setCompatibility] = useState<string[]>([""]);
  const [images, setImages] = useState<File[]>([]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addCompatibility = () => {
    setCompatibility([...compatibility, ""]);
  };

  const updateCompatibility = (index: number, value: string) => {
    const updated = [...compatibility];
    updated[index] = value;
    setCompatibility(updated);
  };

  const removeCompatibility = (index: number) => {
    if (compatibility.length > 1) {
      setCompatibility(compatibility.filter((_, i) => i !== index));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Part listing submitted:", {
      ...formData,
      compatibility: compatibility.filter(c => c.trim()),
      images
    });
    // Submit logic would go here
    alert("Part listed successfully!");
    navigate("/parts");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">List Your Part</h1>
          <p className="text-muted-foreground">
            Sell your automotive parts to thousands of buyers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Part Details */}
          <Card>
            <CardHeader>
              <CardTitle>Part Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="partName">Part Name *</Label>
                  <Input
                    id="partName"
                    placeholder="e.g., Front Brake Pads Set"
                    value={formData.partName}
                    onChange={(e) => handleInputChange("partName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="partNumber">Part Number/OEM</Label>
                  <Input
                    id="partNumber"
                    placeholder="e.g., 45022-S9A-000"
                    value={formData.partNumber}
                    onChange={(e) => handleInputChange("partNumber", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brand">Brand *</Label>
                  <Input
                    id="brand"
                    placeholder="e.g., Honda, Toyota, Bosch"
                    value={formData.brand}
                    onChange={(e) => handleInputChange("brand", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engine">Engine Components</SelectItem>
                      <SelectItem value="transmission">Transmission</SelectItem>
                      <SelectItem value="brakes">Brake System</SelectItem>
                      <SelectItem value="suspension">Suspension</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="body">Body Parts</SelectItem>
                      <SelectItem value="interior">Interior</SelectItem>
                      <SelectItem value="exterior">Exterior</SelectItem>
                      <SelectItem value="tires">Tires & Wheels</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="condition">Condition *</Label>
                <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="used-excellent">Used - Excellent</SelectItem>
                    <SelectItem value="used-good">Used - Good</SelectItem>
                    <SelectItem value="used-fair">Used - Fair</SelectItem>
                    <SelectItem value="refurbished">Refurbished</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the part condition, installation notes, etc."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Compatibility */}
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Compatibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {compatibility.map((vehicle, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    placeholder="e.g., Honda Civic 2015-2020"
                    value={vehicle}
                    onChange={(e) => updateCompatibility(index, e.target.value)}
                    className="flex-1"
                  />
                  {compatibility.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeCompatibility(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addCompatibility}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Compatible Vehicle
              </Button>
            </CardContent>
          </Card>

          {/* Pricing & Warranty */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Warranty</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (Rs.) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="e.g., 15000"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="warranty">Warranty Period</Label>
                  <Input
                    id="warranty"
                    placeholder="e.g., 6 months, 1 year"
                    value={formData.warranty}
                    onChange={(e) => handleInputChange("warranty", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="negotiable"
                  checked={formData.negotiable}
                  onCheckedChange={(checked) => handleInputChange("negotiable", checked)}
                />
                <Label htmlFor="negotiable">Price Negotiable</Label>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-4 text-gray-400" />
                <p className="text-sm text-gray-600 mb-4">
                  Upload clear photos of the part from different angles
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("image-upload")?.click()}
                >
                  Choose Files
                </Button>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Part image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 w-6 h-6"
                        onClick={() => removeImage(index)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact & Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location">Location *</Label>
                <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="colombo">Colombo</SelectItem>
                    <SelectItem value="kandy">Kandy</SelectItem>
                    <SelectItem value="galle">Galle</SelectItem>
                    <SelectItem value="jaffna">Jaffna</SelectItem>
                    <SelectItem value="kurunegala">Kurunegala</SelectItem>
                    <SelectItem value="matara">Matara</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="contactMethod">Preferred Contact Method</Label>
                <Select value={formData.contactMethod} onValueChange={(value) => handleInputChange("contactMethod", value)}>
                  <SelectTrigger>
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
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/parts")}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90">
              List Part
            </Button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default ListPartsPage;