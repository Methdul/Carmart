import { useState, useEffect } from "react";
import { ArrowLeft, Share2, Download, X, Plus, Search, MessageCircle, Send, Bot, User, Phone, Mail, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HealthScoreBadge from "@/components/HealthScoreBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

interface Vehicle {
  id: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  fuelType: string;
  transmission: string;
  engine: string;
  healthScore: number;
  image: string;
  sellerName: string;
  sellerPhone: string;
  sellerEmail: string;
  sellerRating: number;
  isVerified: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: string;
}

const ComparisonPage = () => {
  const [selectedVehicles, setSelectedVehicles] = useState<Vehicle[]>([]);
  const [showCarSelector, setShowCarSelector] = useState(true);
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Car selection state
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Responsive: max 2 on mobile, 3 on desktop
  const [maxVehicles, setMaxVehicles] = useState(2);

  useEffect(() => {
    const updateMaxVehicles = () => {
      setMaxVehicles(window.innerWidth >= 768 ? 3 : 2);
    };
    
    updateMaxVehicles();
    window.addEventListener('resize', updateMaxVehicles);
    return () => window.removeEventListener('resize', updateMaxVehicles);
  }, []);

  // Mock data
  const carBrands = [
    "BMW", "Toyota", "Honda", "Mercedes-Benz", "Audi", "Nissan", "Hyundai", "Suzuki", "Mitsubishi", "Mazda"
  ];

  const carModels: Record<string, string[]> = {
    "BMW": ["3 Series", "5 Series", "X3", "X5", "i4"],
    "Toyota": ["Camry", "RAV4", "Prius", "Corolla", "Land Cruiser"],
    "Honda": ["Civic", "Accord", "CR-V", "HR-V", "City"],
    "Mercedes-Benz": ["C-Class", "E-Class", "GLA", "GLC", "A-Class"],
    "Audi": ["A3", "A4", "Q3", "Q5", "e-tron"]
  };

  const carVariants: Record<string, string[]> = {
    "3 Series": ["320i Sport Line", "330i M Sport", "320d"],
    "RAV4": ["Hybrid AWD", "2.0L CVT", "Adventure"],
    "Civic": ["RS Turbo", "VTi-LX", "Type R"],
    "C-Class": ["C200", "C300", "AMG C43"],
    "A4": ["35 TFSI", "40 TFSI", "S4"]
  };

  const mockVehicles: Vehicle[] = [
    {
      id: "1",
      make: "BMW",
      model: "3 Series",
      variant: "320i Sport Line",
      year: 2020,
      price: 12500000,
      mileage: 35000,
      location: "Colombo",
      fuelType: "Petrol",
      transmission: "Automatic",
      engine: "2.0L Turbo",
      healthScore: 92,
      image: "/api/placeholder/400/300",
      sellerName: "BMW Authorized Dealer",
      sellerPhone: "+94 11 234 5678",
      sellerEmail: "sales@bmwlanka.com",
      sellerRating: 4.9,
      isVerified: true
    },
    {
      id: "2",
      make: "Toyota",
      model: "RAV4",
      variant: "Hybrid AWD",
      year: 2021,
      price: 15800000,
      mileage: 28000,
      location: "Kandy",
      fuelType: "Hybrid",
      transmission: "CVT",
      engine: "2.5L Hybrid",
      healthScore: 88,
      image: "/api/placeholder/400/300",
      sellerName: "Toyota Lanka",
      sellerPhone: "+94 81 222 3333",
      sellerEmail: "info@toyotalanka.com",
      sellerRating: 4.8,
      isVerified: true
    },
    {
      id: "3",
      make: "Honda",
      model: "Civic",
      variant: "RS Turbo",
      year: 2019,
      price: 8900000,
      mileage: 58000,
      location: "Galle",
      fuelType: "Petrol",
      transmission: "CVT",
      engine: "1.5L Turbo",
      healthScore: 85,
      image: "/api/placeholder/400/300",
      sellerName: "Honda Center",
      sellerPhone: "+94 91 234 5678",
      sellerEmail: "sales@hondacenter.lk",
      sellerRating: 4.7,
      isVerified: true
    }
  ];

  const comparisonCategories = [
    {
      title: "Overview",
      rows: [
        { label: "Price", showWinner: true },
        { label: "AI Health Score", showWinner: true },
        { label: "Year", showWinner: true },
        { label: "Mileage", showWinner: true },
        { label: "Location", showWinner: false },
        { label: "Seller Rating", showWinner: true }
      ]
    },
    {
      title: "Specifications",
      rows: [
        { label: "Engine", showWinner: false },
        { label: "Transmission", showWinner: false },
        { label: "Fuel Type", showWinner: false },
        { label: "Make & Model", showWinner: false }
      ]
    }
  ];

  const handleAddVehicle = () => {
    if (!selectedMake || !selectedModel || !selectedVariant) {
      alert("Please select make, model, and variant");
      return;
    }

    if (selectedVehicles.length >= maxVehicles) {
      alert(`You can compare up to ${maxVehicles} vehicles only`);
      return;
    }

    // Find matching vehicle from mock data
    const vehicle = mockVehicles.find(v => 
      v.make === selectedMake && 
      v.model === selectedModel && 
      v.variant === selectedVariant
    );

    if (vehicle && !selectedVehicles.find(v => v.id === vehicle.id)) {
      setSelectedVehicles([...selectedVehicles, vehicle]);
      // Reset selection
      setSelectedMake("");
      setSelectedModel("");
      setSelectedVariant("");
    }
  };

  const handleRemoveVehicle = (id: string) => {
    setSelectedVehicles(selectedVehicles.filter(v => v.id !== id));
  };

  const handleStartComparison = () => {
    if (selectedVehicles.length < 2) {
      alert("Please select at least 2 vehicles to compare");
      return;
    }
    setShowCarSelector(false);
  };

  const getWinner = (row: string) => {
    switch (row) {
      case "Price":
        return selectedVehicles.reduce((min, vehicle) => 
          vehicle.price < min.price ? vehicle : min
        );
      case "AI Health Score":
        return selectedVehicles.reduce((max, vehicle) => 
          vehicle.healthScore > max.healthScore ? vehicle : max
        );
      case "Year":
        return selectedVehicles.reduce((max, vehicle) => 
          vehicle.year > max.year ? vehicle : max
        );
      case "Mileage":
        return selectedVehicles.reduce((min, vehicle) => 
          vehicle.mileage < min.mileage ? vehicle : min
        );
      case "Seller Rating":
        return selectedVehicles.reduce((max, vehicle) => 
          vehicle.sellerRating > max.sellerRating ? vehicle : max
        );
      default:
        return null;
    }
  };

  const getValue = (vehicle: Vehicle, label: string) => {
    switch (label) {
      case "Price":
        return `Rs. ${vehicle.price.toLocaleString()}`;
      case "AI Health Score":
        return vehicle.healthScore;
      case "Year":
        return vehicle.year;
      case "Mileage":
        return `${vehicle.mileage.toLocaleString()} km`;
      case "Location":
        return vehicle.location;
      case "Seller Rating":
        return `⭐ ${vehicle.sellerRating}`;
      case "Engine":
        return vehicle.engine;
      case "Transmission":
        return vehicle.transmission;
      case "Fuel Type":
        return vehicle.fuelType;
      case "Make & Model":
        return `${vehicle.make} ${vehicle.model}`;
      default:
        return "-";
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        message: getAIResponse(newMessage),
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const getAIResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "Based on the comparison, the Honda Civic offers the best value for money at Rs. 8,900,000, while the Toyota RAV4 is the most expensive but offers hybrid technology. Consider your budget and fuel efficiency needs.";
    } else if (lowerMessage.includes('fuel') || lowerMessage.includes('economy')) {
      return "The Toyota RAV4 Hybrid will give you the best fuel economy, especially for city driving. The BMW 3 Series and Honda Civic are both petrol engines - the Civic will be more economical for daily commuting.";
    } else if (lowerMessage.includes('maintenance') || lowerMessage.includes('service')) {
      return "Honda typically has lower maintenance costs and widely available parts. BMW will have higher service costs but excellent dealer network. Toyota offers reliable service with good resale value.";
    } else if (lowerMessage.includes('family') || lowerMessage.includes('space')) {
      return "For family use, the Toyota RAV4 offers the most space and practicality with its SUV design. The BMW 3 Series provides luxury and comfort, while the Honda Civic is best for smaller families or couples.";
    } else {
      return "I can help you understand more about these vehicles' performance, costs, maintenance, fuel economy, or suitability for your needs. What specific aspect would you like to know more about?";
    }
  };

  const filteredVehicles = mockVehicles.filter(vehicle => {
    const matchesSearch = searchQuery === "" || 
      vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.variant.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesMake = selectedMake === "" || vehicle.make === selectedMake;
    const matchesModel = selectedModel === "" || vehicle.model === selectedModel;
    
    return matchesSearch && matchesMake && matchesModel;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Car Selection Phase */}
        {showCarSelector ? (
          <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="text-center space-y-2 sm:space-y-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-primary">Vehicle Comparison</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Select {maxVehicles === 2 ? "2 vehicles" : "2-3 vehicles"} to compare their features, prices, and performance
              </p>
            </div>

            {/* Selected Vehicles */}
            {selectedVehicles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Selected Vehicles ({selectedVehicles.length}/{maxVehicles})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`grid grid-cols-1 ${maxVehicles === 3 ? 'lg:grid-cols-3' : ''} sm:grid-cols-2 gap-3 sm:gap-4`}>
                    {selectedVehicles.map((vehicle) => (
                      <div key={vehicle.id} className="relative border rounded-lg p-3 sm:p-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute top-2 right-2 h-6 w-6 p-0"
                          onClick={() => handleRemoveVehicle(vehicle.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <img
                          src={vehicle.image}
                          alt={`${vehicle.make} ${vehicle.model}`}
                          className="w-full h-20 sm:h-24 object-cover rounded mb-2"
                        />
                        <h4 className="font-semibold text-sm sm:text-base">{vehicle.make} {vehicle.model}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">{vehicle.variant}</p>
                        <p className="text-sm sm:text-base font-bold text-primary mt-1">
                          Rs. {(vehicle.price / 1000000).toFixed(1)}M
                        </p>
                      </div>
                    ))}
                    
                    {selectedVehicles.length < maxVehicles && (
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-3 sm:p-4 flex items-center justify-center">
                        <div className="text-center">
                          <Plus className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-xs sm:text-sm text-muted-foreground">Add Vehicle</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {selectedVehicles.length >= 2 && (
                    <div className="mt-4 sm:mt-6 text-center">
                      <Button 
                        onClick={handleStartComparison}
                        className="w-full sm:w-auto h-10 sm:h-12 bg-primary hover:bg-primary/90 text-sm sm:text-base"
                      >
                        Start Comparison
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Car Selection Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Add Vehicle to Compare</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {/* Search Bar */}
                <div className="space-y-2">
                  <Label htmlFor="search" className="text-sm sm:text-base">Quick Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by make, model, or variant..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-10 sm:h-12 text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Selection Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Make *</Label>
                    <Select value={selectedMake} onValueChange={setSelectedMake}>
                      <SelectTrigger className="h-10 sm:h-12">
                        <SelectValue placeholder="Select make" />
                      </SelectTrigger>
                      <SelectContent>
                        {carBrands.map((brand) => (
                          <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Model *</Label>
                    <Select 
                      value={selectedModel} 
                      onValueChange={setSelectedModel}
                      disabled={!selectedMake}
                    >
                      <SelectTrigger className="h-10 sm:h-12">
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedMake && carModels[selectedMake]?.map((model) => (
                          <SelectItem key={model} value={model}>{model}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Variant *</Label>
                    <Select 
                      value={selectedVariant} 
                      onValueChange={setSelectedVariant}
                      disabled={!selectedModel}
                    >
                      <SelectTrigger className="h-10 sm:h-12">
                        <SelectValue placeholder="Select variant" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedModel && carVariants[selectedModel]?.map((variant) => (
                          <SelectItem key={variant} value={variant}>{variant}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={handleAddVehicle}
                  disabled={!selectedMake || !selectedModel || !selectedVariant || selectedVehicles.length >= maxVehicles}
                  className="w-full h-10 sm:h-12 text-sm sm:text-base"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Comparison
                </Button>

                {/* Available Vehicles Preview */}
                {searchQuery && (
                  <div className="space-y-3">
                    <h4 className="text-sm sm:text-base font-medium">Available Vehicles</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {filteredVehicles.slice(0, 6).map((vehicle) => (
                        <div key={vehicle.id} className="border rounded-lg p-3 cursor-pointer hover:border-primary/50"
                             onClick={() => {
                               setSelectedMake(vehicle.make);
                               setSelectedModel(vehicle.model);
                               setSelectedVariant(vehicle.variant);
                             }}>
                          <img
                            src={vehicle.image}
                            alt={`${vehicle.make} ${vehicle.model}`}
                            className="w-full h-16 sm:h-20 object-cover rounded mb-2"
                          />
                          <h4 className="font-semibold text-xs sm:text-sm">{vehicle.make} {vehicle.model}</h4>
                          <p className="text-xs text-muted-foreground">{vehicle.variant}</p>
                          <p className="text-sm font-bold text-primary">Rs. {(vehicle.price / 1000000).toFixed(1)}M</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Comparison Results */
          <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 sm:space-x-4 mb-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowCarSelector(true)}
                    className="h-8 sm:h-10"
                  >
                    <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Back</span>
                  </Button>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">Vehicle Comparison</h1>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Comparing {selectedVehicles.length} vehicles side by side
                </p>
              </div>
              
              <div className="flex space-x-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none h-8 sm:h-10 text-xs sm:text-sm">
                  <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none h-8 sm:h-10 text-xs sm:text-sm">
                  <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Vehicle Overview Cards */}
            <div className={`grid grid-cols-1 ${selectedVehicles.length === 2 ? 'sm:grid-cols-2' : selectedVehicles.length === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : ''} gap-3 sm:gap-4`}>
              {selectedVehicles.map((vehicle) => (
                <Card key={vehicle.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={vehicle.image}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      className="w-full h-32 sm:h-40 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <HealthScoreBadge score={vehicle.healthScore} />
                    </div>
                  </div>
                  <CardContent className="p-3 sm:p-4">
                    <h3 className="text-sm sm:text-lg font-bold text-primary mb-1">
                      {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2">{vehicle.variant}</p>
                    <p className="text-lg sm:text-xl font-bold text-primary mb-2">
                      Rs. {vehicle.price.toLocaleString()}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {vehicle.year} • {vehicle.mileage.toLocaleString()} km • {vehicle.location}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Comparison Table */}
            <div className="space-y-4 sm:space-y-6">
              {comparisonCategories.map((category) => (
                <Card key={category.title}>
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="text-lg sm:text-xl">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[600px]">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2 sm:p-4 font-medium text-muted-foreground w-32 sm:w-48">
                              Specification
                            </th>
                            {selectedVehicles.map((vehicle) => (
                              <th key={vehicle.id} className="text-center p-2 sm:p-4 min-w-32 sm:min-w-48">
                                <div className="font-medium text-primary text-xs sm:text-sm">{vehicle.make} {vehicle.model}</div>
                                <div className="text-xs text-muted-foreground">{vehicle.year}</div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {category.rows.map((row) => {
                            const winner = row.showWinner ? getWinner(row.label) : null;
                            
                            return (
                              <tr key={row.label} className="border-b">
                                <td className="p-2 sm:p-4 font-medium text-muted-foreground text-xs sm:text-sm">
                                  {row.label}
                                </td>
                                {selectedVehicles.map((vehicle) => {
                                  const isWinner = winner?.id === vehicle.id;
                                  const value = getValue(vehicle, row.label);
                                  
                                  return (
                                    <td key={vehicle.id} className="p-2 sm:p-4 text-center">
                                      <div className={`flex items-center justify-center space-x-1 sm:space-x-2 ${
                                        isWinner ? 'text-success font-semibold' : ''
                                      }`}>
                                        {row.label === "AI Health Score" ? (
                                          <HealthScoreBadge score={vehicle.healthScore} />
                                        ) : (
                                          <span className="text-xs sm:text-sm">{value}</span>
                                        )}
                                        {isWinner && (
                                          <Badge className="bg-success text-xs">Best</Badge>
                                        )}
                                      </div>
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Seller Buttons */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Contact Sellers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`grid grid-cols-1 ${selectedVehicles.length === 2 ? 'sm:grid-cols-2' : selectedVehicles.length === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : ''} gap-3 sm:gap-4`}>
                  {selectedVehicles.map((vehicle) => (
                    <div key={vehicle.id} className="border rounded-lg p-3 sm:p-4 space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm sm:text-base font-bold text-primary">
                            {vehicle.make.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm sm:text-base">{vehicle.sellerName}</h4>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs sm:text-sm">⭐ {vehicle.sellerRating}</span>
                            {vehicle.isVerified && (
                              <Badge className="bg-success text-xs">Verified</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Button 
                          className="w-full h-8 sm:h-10 bg-primary hover:bg-primary/90 text-xs sm:text-sm"
                          onClick={() => window.open(`tel:${vehicle.sellerPhone}`)}
                        >
                          <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Contact Seller - {vehicle.make}
                        </Button>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 h-8 text-xs"
                            onClick={() => window.open(`mailto:${vehicle.sellerEmail}`)}
                          >
                            <Mail className="h-3 w-3 mr-1" />
                            Email
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 h-8 text-xs"
                            asChild
                          >
                            <Link to={`/vehicle/${vehicle.id}`}>
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendation */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Bot className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary" />
                  AI Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm sm:prose text-xs sm:text-sm">
                  <p className="mb-3 sm:mb-4">
                    Based on your comparison, here's our AI analysis:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
                    <div className="p-3 sm:p-4 bg-white rounded-lg border">
                      <h5 className="font-medium text-primary mb-1 text-xs sm:text-sm">Best Value</h5>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {selectedVehicles.reduce((min, vehicle) => 
                          vehicle.price < min.price ? vehicle : min
                        ).make} {selectedVehicles.reduce((min, vehicle) => 
                          vehicle.price < min.price ? vehicle : min
                        ).model}
                      </p>
                    </div>
                    <div className="p-3 sm:p-4 bg-white rounded-lg border">
                      <h5 className="font-medium text-primary mb-1 text-xs sm:text-sm">Best Condition</h5>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {selectedVehicles.reduce((max, vehicle) => 
                          vehicle.healthScore > max.healthScore ? vehicle : max
                        ).make} {selectedVehicles.reduce((max, vehicle) => 
                          vehicle.healthScore > max.healthScore ? vehicle : max
                        ).model}
                      </p>
                    </div>
                    <div className="p-3 sm:p-4 bg-white rounded-lg border">
                      <h5 className="font-medium text-primary mb-1 text-xs sm:text-sm">Newest</h5>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {selectedVehicles.reduce((max, vehicle) => 
                          vehicle.year > max.year ? vehicle : max
                        ).make} {selectedVehicles.reduce((max, vehicle) => 
                          vehicle.year > max.year ? vehicle : max
                        ).model}
                      </p>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setShowAIChat(true)}
                    className="w-full sm:w-auto h-10 sm:h-12 bg-primary hover:bg-primary/90 text-sm sm:text-base"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Ask AI More Questions
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI Chat Interface */}
            {showAIChat && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-lg sm:text-xl">
                      <Bot className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary" />
                      Chat with AI Assistant
                    </CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowAIChat(false)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Chat Messages */}
                  <div className="h-48 sm:h-64 overflow-y-auto border rounded-lg p-3 sm:p-4 mb-4 space-y-3 sm:space-y-4">
                    {chatMessages.length === 0 && (
                      <div className="text-center text-muted-foreground">
                        <Bot className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 text-primary" />
                        <p className="text-xs sm:text-sm">Ask me anything about these vehicles!</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Try: "Which is best for families?" or "What about fuel economy?"
                        </p>
                      </div>
                    )}
                    
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-2 sm:p-3 rounded-lg ${
                          msg.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}>
                          <div className="flex items-start space-x-2">
                            {msg.sender === 'ai' && (
                              <Bot className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                            )}
                            {msg.sender === 'user' && (
                              <User className="h-4 w-4 mt-0.5 text-primary-foreground flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className="text-xs sm:text-sm">{msg.message}</p>
                              <span className="text-xs opacity-70">{msg.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-muted p-2 sm:p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Bot className="h-4 w-4 text-primary" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask about fuel economy, maintenance costs, performance..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 h-10 sm:h-12 text-sm sm:text-base"
                      disabled={isLoading}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || isLoading}
                      className="h-10 sm:h-12 px-3 sm:px-4"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ComparisonPage;