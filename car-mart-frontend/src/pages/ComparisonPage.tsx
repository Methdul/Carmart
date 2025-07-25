import { useState, useEffect } from "react";
import { ArrowLeft, Share2, Download, MessageCircle, Send, Bot, User, Car, Star, MapPin, Calendar, Fuel, Settings, Eye, Phone, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Header from "@/components/Header";

interface Vehicle {
  id: string;
  title: string;
  price: number;
  year: number;
  mileage: number;
  location: string;
  fuelType: string;
  transmission: string;
  image: string;
  sellerRating: number;
  isVerified: boolean;
  make: string;
  model: string;
  bodyType: string;
  condition: string;
  color: string;
  doors: number;
  drivetrain: string;
  seatingCapacity: number;
  engineCapacity: string;
  engine: string;
  sellerPhone?: string;
  sellerEmail?: string;
  sellerName?: string;
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
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data with real demo images
  const mockVehicles: Vehicle[] = [
    {
      id: "1",
      title: "BMW 3 Series 320i Sport Line",
      price: 12500000,
      year: 2020,
      mileage: 35000,
      location: "Colombo",
      fuelType: "Petrol",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      sellerRating: 4.8,
      isVerified: true,
      make: "BMW",
      model: "3 Series",
      bodyType: "Sedan",
      condition: "Excellent",
      color: "White",
      doors: 4,
      drivetrain: "RWD",
      seatingCapacity: 5,
      engineCapacity: "2000cc",
      engine: "2.0L Turbo",
      sellerName: "Premium Motors",
      sellerPhone: "+94 77 123 4567",
      sellerEmail: "sales@premiummotors.lk"
    },
    {
      id: "2",
      title: "Toyota RAV4 Hybrid AWD",
      price: 15800000,
      year: 2021,
      mileage: 28000,
      location: "Kandy",
      fuelType: "Hybrid",
      transmission: "CVT",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      sellerRating: 4.7,
      isVerified: true,
      make: "Toyota",
      model: "RAV4",
      bodyType: "SUV",
      condition: "Very Good",
      color: "Silver",
      doors: 5,
      drivetrain: "AWD",
      seatingCapacity: 5,
      engineCapacity: "2500cc",
      engine: "2.5L Hybrid",
      sellerName: "Lanka Auto",
      sellerPhone: "+94 71 987 6543",
      sellerEmail: "info@lankaauto.lk"
    },
    {
      id: "3",
      title: "Honda Civic RS Turbo",
      price: 8900000,
      year: 2019,
      mileage: 58000,
      location: "Galle",
      fuelType: "Petrol",
      transmission: "CVT",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      sellerRating: 4.6,
      isVerified: false,
      make: "Honda",
      model: "Civic",
      bodyType: "Sedan",
      condition: "Good",
      color: "Black",
      doors: 4,
      drivetrain: "FWD",
      seatingCapacity: 5,
      engineCapacity: "1500cc",
      engine: "1.5L Turbo",
      sellerName: "John Perera",
      sellerPhone: "+94 76 555 1234",
      sellerEmail: "john.perera@email.com"
    },
    {
      id: "4",
      title: "Mercedes-Benz C200 AMG Line",
      price: 18500000,
      year: 2022,
      mileage: 15000,
      location: "Colombo",
      fuelType: "Petrol",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      sellerRating: 4.9,
      isVerified: true,
      make: "Mercedes-Benz",
      model: "C-Class",
      bodyType: "Sedan",
      condition: "Excellent",
      color: "Blue",
      doors: 4,
      drivetrain: "RWD",
      seatingCapacity: 5,
      engineCapacity: "2000cc",
      engine: "2.0L AMG Turbo",
      sellerName: "Elite Motors",
      sellerPhone: "+94 77 999 8888",
      sellerEmail: "sales@elitemotors.lk"
    },
    {
      id: "5",
      title: "Nissan X-Trail 4WD",
      price: 9800000,
      year: 2018,
      mileage: 72000,
      location: "Negombo",
      fuelType: "Petrol",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1570611178717-4c68f8ffe4b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      sellerRating: 4.4,
      isVerified: false,
      make: "Nissan",
      model: "X-Trail",
      bodyType: "SUV",
      condition: "Good",
      color: "Gray",
      doors: 5,
      drivetrain: "4WD",
      seatingCapacity: 7,
      engineCapacity: "2500cc",
      engine: "2.5L",
      sellerName: "Auto Traders",
      sellerPhone: "+94 75 444 3333",
      sellerEmail: "contact@autotraders.lk"
    },
    {
      id: "6",
      title: "Audi A4 TFSI Quattro",
      price: 16200000,
      year: 2021,
      mileage: 22000,
      location: "Kandy",
      fuelType: "Petrol",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      sellerRating: 4.7,
      isVerified: true,
      make: "Audi",
      model: "A4",
      bodyType: "Sedan",
      condition: "Excellent",
      color: "White",
      doors: 4,
      drivetrain: "AWD",
      seatingCapacity: 5,
      engineCapacity: "2000cc",
      engine: "2.0L TFSI",
      sellerName: "Luxury Cars",
      sellerPhone: "+94 77 777 6666",
      sellerEmail: "info@luxurycars.lk"
    }
  ];

  const addVehicleToComparison = (vehicle: Vehicle) => {
    if (selectedVehicles.length < 3 && !selectedVehicles.find(v => v.id === vehicle.id)) {
      setSelectedVehicles([...selectedVehicles, vehicle]);
      
      if (selectedVehicles.length >= 1) {
        setShowCarSelector(false);
      }
    }
  };

  const removeVehicleFromComparison = (vehicleId: string) => {
    const updated = selectedVehicles.filter(v => v.id !== vehicleId);
    setSelectedVehicles(updated);
    
    if (updated.length === 0) {
      setShowCarSelector(true);
    }
  };

  // Comparison rows (removed AI Health Score)
  const comparisonRows = [
    { label: "Price", key: "price" },
    { label: "Year", key: "year" },
    { label: "Mileage", key: "mileage" },
    { label: "Location", key: "location" },
    { label: "Seller Rating", key: "sellerRating" },
    { label: "Engine", key: "engine" },
    { label: "Transmission", key: "transmission" },
    { label: "Fuel Type", key: "fuelType" },
    { label: "Make & Model", key: "makeModel" },
    { label: "Body Type", key: "bodyType" },
    { label: "Condition", key: "condition" },
    { label: "Color", key: "color" },
    { label: "Doors", key: "doors" },
    { label: "Drivetrain", key: "drivetrain" },
    { label: "Seating", key: "seatingCapacity" }
  ];

  const getWinner = (label: string) => {
    if (selectedVehicles.length < 2) return null;
    
    switch (label) {
      case "Price":
        return selectedVehicles.reduce((min, vehicle) => 
          vehicle.price < min.price ? vehicle : min
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
      case "Body Type":
        return vehicle.bodyType;
      case "Condition":
        return vehicle.condition;
      case "Color":
        return vehicle.color;
      case "Doors":
        return vehicle.doors;
      case "Drivetrain":
        return vehicle.drivetrain;
      case "Seating":
        return `${vehicle.seatingCapacity} seats`;
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
      return "Based on the comparison, the Honda Civic offers the best value for money at Rs. 8,900,000, while the Mercedes-Benz C200 is the most expensive but offers luxury features. Consider your budget and desired features.";
    } else if (lowerMessage.includes('fuel') || lowerMessage.includes('economy')) {
      return "The Toyota RAV4 Hybrid will give you the best fuel economy, especially for city driving. The BMW 3 Series and Honda Civic are both petrol engines - the Civic will be more economical for daily commuting.";
    } else if (lowerMessage.includes('maintenance') || lowerMessage.includes('service')) {
      return "Honda typically has lower maintenance costs and widely available parts. BMW will have higher service costs but excellent dealer network. Toyota offers reliable service with good resale value.";
    } else if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
      return "For daily commuting: Honda Civic. For family use: Toyota RAV4 Hybrid. For luxury: BMW 3 Series or Mercedes C200. For off-road capability: Nissan X-Trail. What's your primary use case?";
    } else {
      return "I can help you compare these vehicles across various aspects like price, fuel efficiency, maintenance costs, and features. What specific comparison would you like me to focus on?";
    }
  };

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {showCarSelector ? (
          /* Car Selection */
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">Vehicle Comparison</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Select up to 3 vehicles to compare side by side
              </p>
            </div>

            {selectedVehicles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Selected for Comparison ({selectedVehicles.length}/3)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {selectedVehicles.map((vehicle) => (
                      <div key={vehicle.id} className="relative bg-muted/30 rounded-lg p-4">
                        <button
                          onClick={() => removeVehicleFromComparison(vehicle.id)}
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium"
                        >
                          ×
                        </button>
                        <img src={vehicle.image} alt={vehicle.title} className="w-full h-24 sm:h-32 object-cover rounded mb-2" />
                        <h3 className="font-medium text-sm sm:text-base line-clamp-2 mb-1">{vehicle.title}</h3>
                        <p className="text-xs sm:text-sm text-primary font-semibold">Rs. {(vehicle.price / 1000000).toFixed(1)}M</p>
                      </div>
                    ))}
                  </div>
                  
                  {selectedVehicles.length >= 2 && (
                    <Button
                      onClick={() => setShowCarSelector(false)}
                      className="w-full sm:w-auto"
                    >
                      Compare Selected Vehicles
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Available Vehicles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {mockVehicles
                    .filter(vehicle => !selectedVehicles.find(v => v.id === vehicle.id))
                    .map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className="group cursor-pointer bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-200"
                      onClick={() => addVehicleToComparison(vehicle)}
                    >
                      <div className="relative">
                        <img
                          src={vehicle.image}
                          alt={vehicle.title}
                          className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        {vehicle.isVerified && (
                          <Badge className="absolute top-2 right-2 bg-success text-white text-xs">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      <div className="p-3 sm:p-4">
                        <h3 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {vehicle.title}
                        </h3>
                        <div className="space-y-1 text-xs sm:text-sm text-muted-foreground mb-3">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-primary text-sm sm:text-lg">
                              Rs. {(vehicle.price / 1000000).toFixed(1)}M
                            </span>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 mr-1" />
                              <span>{vehicle.sellerRating}</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            <span>{vehicle.year}</span>
                            <span className="mx-2">•</span>
                            <span>{vehicle.mileage.toLocaleString()} km</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            <span>{vehicle.location}</span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          disabled={selectedVehicles.length >= 3}
                        >
                          {selectedVehicles.length >= 3 ? 'Max 3 vehicles' : 'Add to Compare'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
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
            <div className={`grid grid-cols-1 ${selectedVehicles.length === 2 ? 'sm:grid-cols-2' : selectedVehicles.length === 3 ? 'sm:grid-cols-3' : ''} gap-4 sm:gap-6`}>
              {selectedVehicles.map((vehicle) => (
                <Card key={vehicle.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={vehicle.image}
                      alt={vehicle.title}
                      className="w-full h-32 sm:h-40 object-cover"
                    />
                    {vehicle.isVerified && (
                      <Badge className="absolute top-2 right-2 bg-success text-white text-xs">
                        ✓ Verified
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-3 sm:p-4">
                    <h3 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2">
                      {vehicle.title}
                    </h3>
                    <div className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-primary text-sm sm:text-lg">
                          {formatPrice(vehicle.price)}
                        </span>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 mr-1" />
                          <span>{vehicle.sellerRating}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span>{vehicle.year}</span>
                        <span className="mx-2">•</span>
                        <span>{vehicle.mileage.toLocaleString()} km</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detailed Comparison Table */}
            {selectedVehicles.length >= 2 && comparisonRows.map((section, sectionIndex) => (
              <Card key={sectionIndex}>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg">Detailed Comparison</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <div className="min-w-full">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/30">
                            <th className="text-left p-2 sm:p-4 font-medium text-muted-foreground text-xs sm:text-sm w-1/4">
                              Specification
                            </th>
                            {selectedVehicles.map((vehicle) => (
                              <th key={vehicle.id} className="text-center p-2 sm:p-4 font-medium text-xs sm:text-sm">
                                <div className="flex flex-col items-center space-y-1">
                                  <img 
                                    src={vehicle.image} 
                                    alt={vehicle.title}
                                    className="w-12 h-8 sm:w-16 sm:h-10 object-cover rounded"
                                  />
                                  <span className="text-xs leading-tight text-center line-clamp-2">
                                    {vehicle.make} {vehicle.model}
                                  </span>
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {comparisonRows.map((row) => {
                            const winner = getWinner(row.label);
                            
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
                                        <span className="text-xs sm:text-sm">{value}</span>
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
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Contact Seller Buttons */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Contact Sellers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`grid grid-cols-1 ${selectedVehicles.length === 2 ? 'sm:grid-cols-2' : selectedVehicles.length === 3 ? 'sm:grid-cols-3' : ''} gap-4`}>
                  {selectedVehicles.map((vehicle) => (
                    <div key={vehicle.id} className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <img src={vehicle.image} alt={vehicle.title} className="w-12 h-8 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm line-clamp-1">{vehicle.make} {vehicle.model}</h4>
                          <p className="text-xs text-muted-foreground">{vehicle.sellerName}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          <Phone className="w-3 h-3 mr-2" />
                          {vehicle.sellerPhone}
                        </Button>
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          <MessageSquare className="w-3 h-3 mr-2" />
                          Message
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Chat Assistant */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl flex items-center">
                  <Bot className="w-5 h-5 mr-2" />
                  Comparison Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ScrollArea className="h-64 border rounded-lg p-3">
                    <div className="space-y-3">
                      {chatMessages.length === 0 && (
                        <div className="text-center text-muted-foreground text-sm py-8">
                          Ask me anything about these vehicles! I can help you compare prices, features, fuel efficiency, and more.
                        </div>
                      )}
                      
                      {chatMessages.map((message) => (
                        <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">
                                {message.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`p-3 rounded-lg text-sm ${
                              message.sender === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                            }`}>
                              <p>{message.message}</p>
                              <span className="text-xs opacity-70 mt-1 block">{message.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="flex items-start space-x-2 max-w-[80%]">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">
                                <Bot className="w-3 h-3" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="bg-muted p-3 rounded-lg">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask about these vehicles..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="sm" disabled={!newMessage.trim() || isLoading}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonPage;