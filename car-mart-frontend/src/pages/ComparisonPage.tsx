import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Share2, Download, BarChart3, User, Bot, Send, Plus, X, Crown, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Header from "@/components/Header";

  // Enhanced Vehicle interface for comparison
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
  healthScore: number;
  sellerRating: number;
  isVerified: boolean;
  isFeatured: boolean;
  make: string;
  model: string;
  bodyType: string;
  condition: string;
  engine: string;
  engineCapacity: string;
  color: string;
  doors: number;
  drivetrain: string;
  seatingCapacity: number;
  // Performance & Economy data
  fuelConsumption: string;
  marketValue: number;
  insuranceGroup: string;
  resaleValue: number;
  maintenanceCost: string;
  safetyRating: number;
  acceleration: string;
  topSpeed: string;
  co2Emissions: string;
}

// AI Chat Message interface
interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

const ComparisonPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedVehicles, setSelectedVehicles] = useState<Vehicle[]>([]);
  const [showCarSelector, setShowCarSelector] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // AI Chat states
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced mock vehicle data
  const mockVehicles: Vehicle[] = [
    {
      id: "1",
      title: "BMW 3 Series 320i Sport Line",
      price: 12500000,
      year: 2022,
      mileage: 25000,
      location: "Colombo",
      fuelType: "Petrol",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      healthScore: 92,
      sellerRating: 4.8,
      isVerified: true,
      isFeatured: true,
      make: "BMW",
      model: "3 Series",
      bodyType: "Sedan",
      condition: "Excellent",
      engine: "2.0L TFSI Turbo",
      engineCapacity: "2000cc",
      color: "Alpine White",
      doors: 4,
      drivetrain: "RWD",
      seatingCapacity: 5,
      // Performance & Economy data
      fuelConsumption: "7.2L/100km",
      marketValue: 11800000,
      insuranceGroup: "Group 25",
      resaleValue: 85,
      maintenanceCost: "Medium",
      safetyRating: 5,
      acceleration: "6.8s (0-100km/h)",
      topSpeed: "250 km/h",
      co2Emissions: "168 g/km"
    },
    {
      id: "2",
      title: "Toyota RAV4 Hybrid AWD",
      price: 15800000,
      year: 2023,
      mileage: 15000,
      location: "Kandy",
      fuelType: "Hybrid",
      transmission: "CVT",
      image: "https://images.unsplash.com/photo-1570611178717-4c68f8ffe4b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      healthScore: 88,
      sellerRating: 4.6,
      isVerified: true,
      isFeatured: false,
      make: "Toyota",
      model: "RAV4",
      bodyType: "SUV",
      condition: "Excellent",
      engine: "2.5L Hybrid",
      engineCapacity: "2500cc",
      color: "Magnetic Gray",
      doors: 5,
      drivetrain: "AWD",
      seatingCapacity: 5,
      // Performance & Economy data
      fuelConsumption: "4.8L/100km",
      marketValue: 15200000,
      insuranceGroup: "Group 18",
      resaleValue: 92,
      maintenanceCost: "Low",
      safetyRating: 5,
      acceleration: "8.1s (0-100km/h)",
      topSpeed: "180 km/h",
      co2Emissions: "118 g/km"
    },
    {
      id: "3",
      title: "Ford Ranger Wildtrak 4x4",
      price: 18500000,
      year: 2023,
      mileage: 8000,
      location: "Galle",
      fuelType: "Diesel",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      healthScore: 95,
      sellerRating: 4.9,
      isVerified: true,
      isFeatured: true,
      make: "Ford",
      model: "Ranger",
      bodyType: "Pickup Truck",
      condition: "Like New",
      engine: "3.2L Duratorq TDCi",
      engineCapacity: "3200cc",
      color: "Lightning Blue",
      doors: 4,
      drivetrain: "4WD",
      seatingCapacity: 5,
      // Performance & Economy data
      fuelConsumption: "8.5L/100km",
      marketValue: 17800000,
      insuranceGroup: "Group 35",
      resaleValue: 88,
      maintenanceCost: "Medium",
      safetyRating: 5,
      acceleration: "9.2s (0-100km/h)",
      topSpeed: "180 km/h",
      co2Emissions: "225 g/km"
    },
    {
      id: "4",
      title: "Honda Civic RS Turbo",
      price: 8900000,
      year: 2021,
      mileage: 35000,
      location: "Negombo",
      fuelType: "Petrol",
      transmission: "Manual",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      healthScore: 85,
      sellerRating: 4.5,
      isVerified: false,
      isFeatured: false,
      make: "Honda",
      model: "Civic",
      bodyType: "Sedan",
      condition: "Good",
      engine: "1.5L VTEC Turbo",
      engineCapacity: "1500cc",
      color: "Rallye Red",
      doors: 4,
      drivetrain: "FWD",
      seatingCapacity: 5,
      // Performance & Economy data
      fuelConsumption: "6.5L/100km",
      marketValue: 8200000,
      insuranceGroup: "Group 22",
      resaleValue: 75,
      maintenanceCost: "Low",
      safetyRating: 4,
      acceleration: "8.2s (0-100km/h)",
      topSpeed: "200 km/h",
      co2Emissions: "152 g/km"
    },
    {
      id: "5",
      title: "Nissan X-Trail Premium",
      price: 14200000,
      year: 2022,
      mileage: 22000,
      location: "Colombo",
      fuelType: "Petrol",
      transmission: "CVT",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      healthScore: 89,
      sellerRating: 4.7,
      isVerified: true,
      isFeatured: false,
      make: "Nissan",
      model: "X-Trail",
      bodyType: "SUV",
      condition: "Excellent",
      engine: "2.5L DOHC",
      engineCapacity: "2500cc",
      color: "Gun Metallic",
      doors: 5,
      drivetrain: "AWD",
      seatingCapacity: 7,
      // Performance & Economy data
      fuelConsumption: "7.8L/100km",
      marketValue: 13500000,
      insuranceGroup: "Group 28",
      resaleValue: 80,
      maintenanceCost: "Low",
      safetyRating: 5,
      acceleration: "9.5s (0-100km/h)",
      topSpeed: "200 km/h",
      co2Emissions: "182 g/km"
    },
    {
      id: "6",
      title: "Mercedes-Benz C200 AMG",
      price: 22500000,
      year: 2023,
      mileage: 12000,
      location: "Mount Lavinia",
      fuelType: "Petrol",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      healthScore: 94,
      sellerRating: 5.0,
      isVerified: true,
      isFeatured: true,
      make: "Mercedes-Benz",
      model: "C200",
      bodyType: "Sedan",
      condition: "Like New",
      engine: "2.0L Turbo",
      engineCapacity: "2000cc",
      color: "Obsidian Black",
      doors: 4,
      drivetrain: "RWD",
      seatingCapacity: 5,
      // Performance & Economy data
      fuelConsumption: "7.5L/100km",
      marketValue: 21800000,
      insuranceGroup: "Group 40",
      resaleValue: 88,
      maintenanceCost: "High",
      safetyRating: 5,
      acceleration: "7.3s (0-100km/h)",
      topSpeed: "250 km/h",
      co2Emissions: "174 g/km"
    }
  ];

  // Load vehicles from URL parameters or show selector
  useEffect(() => {
    const vehicleIds = searchParams.get('vehicles');
    if (vehicleIds) {
      const ids = vehicleIds.split(',');
      const vehicles = mockVehicles.filter(v => ids.includes(v.id));
      if (vehicles.length >= 2) {
        setSelectedVehicles(vehicles);
        setShowCarSelector(false);
      }
    }
  }, [searchParams]);

  // Initialize AI chat with welcome message
  useEffect(() => {
    if (selectedVehicles.length >= 2 && chatMessages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: '1',
        message: generateWelcomeMessage(),
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages([welcomeMessage]);
    }
  }, [selectedVehicles]);

  // Add vehicle to comparison
  const addVehicleToComparison = (vehicle: Vehicle) => {
    if (selectedVehicles.length < 4 && !selectedVehicles.find(v => v.id === vehicle.id)) {
      const newSelection = [...selectedVehicles, vehicle];
      setSelectedVehicles(newSelection);
      
      if (newSelection.length >= 2) {
        setShowCarSelector(false);
      }
    }
  };

  // Remove vehicle from comparison
  const removeVehicleFromComparison = (vehicleId: string) => {
    const updated = selectedVehicles.filter(v => v.id !== vehicleId);
    setSelectedVehicles(updated);
    
    if (updated.length < 2) {
      setShowCarSelector(true);
    }
  };

  // Format price helper with error handling
  const formatPrice = (price: number | undefined | null) => {
    if (!price || typeof price !== 'number' || isNaN(price)) {
      return 'Price N/A';
    }
    
    if (price >= 1000000) {
      return `Rs. ${(price / 1000000).toFixed(1)}M`;
    }
    return `Rs. ${price.toLocaleString()}`;
  };

  // Get health score styling
  const getHealthScoreStyle = (score: number) => {
    if (score >= 90) return "bg-green-500 text-white";
    if (score >= 70) return "bg-blue-500 text-white";
    if (score >= 50) return "bg-yellow-500 text-white";
    return "bg-red-500 text-white";
  };

  // Get health score text
  const getHealthScoreText = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Fair";
    return "Poor";
  };

  // Comparison data structure
  const comparisonSections = [
    {
      title: "Basic Information",
      rows: [
        { label: "Price", key: "price", type: "price" },
        { label: "Market Value", key: "marketValue", type: "price" },
        { label: "Year", key: "year" },
        { label: "Mileage", key: "mileage", type: "mileage" },
        { label: "Location", key: "location" },
        { label: "Condition", key: "condition" },
        { label: "Health Score", key: "healthScore", type: "health" }
      ]
    },
    {
      title: "Technical Specifications",
      rows: [
        { label: "Make & Model", key: "makeModel", type: "makeModel" },
        { label: "Body Type", key: "bodyType" },
        { label: "Engine", key: "engine" },
        { label: "Engine Capacity", key: "engineCapacity" },
        { label: "Fuel Type", key: "fuelType" },
        { label: "Transmission", key: "transmission" },
        { label: "Drivetrain", key: "drivetrain" }
      ]
    },
    {
      title: "Performance & Economy",
      rows: [
        { label: "Fuel Consumption", key: "fuelConsumption" },
        { label: "Acceleration (0-100km/h)", key: "acceleration" },
        { label: "Top Speed", key: "topSpeed" },
        { label: "CO2 Emissions", key: "co2Emissions" },
        { label: "Safety Rating", key: "safetyRating", type: "safety" }
      ]
    },
    {
      title: "Ownership Costs",
      rows: [
        { label: "Insurance Group", key: "insuranceGroup" },
        { label: "Maintenance Cost", key: "maintenanceCost" },
        { label: "Resale Value", key: "resaleValue", type: "percentage" },
        { label: "Depreciation", key: "depreciation", type: "depreciation" }
      ]
    }
  ];

  // Get formatted value for comparison table with error handling
  const getFormattedValue = (vehicle: Vehicle, row: any) => {
    try {
      const value = vehicle[row.key as keyof Vehicle];
      
      switch (row.type) {
        case "price":
          return formatPrice(value as number);
        case "mileage":
          if (!value || typeof value !== 'number') return "N/A";
          return `${(value as number).toLocaleString()} km`;
        case "health":
          if (!value || typeof value !== 'number') return "N/A";
          return (
            <Badge className={getHealthScoreStyle(value as number)}>
              {value} - {getHealthScoreText(value as number)}
            </Badge>
          );
        case "safety":
          if (!value || typeof value !== 'number') return "N/A";
          return `${value}/5 ⭐`;
        case "percentage":
          if (!value || typeof value !== 'number') return "N/A";
          return `${value}%`;
        case "depreciation":
          try {
            const currentPrice = vehicle.price || 0;
            const marketValue = vehicle.marketValue || currentPrice;
            if (currentPrice === 0) return "N/A";
            const depreciation = ((currentPrice - marketValue) / currentPrice * 100).toFixed(1);
            return `${depreciation}%`;
          } catch {
            return "N/A";
          }
        case "boolean":
          return value ? "✅ Yes" : "❌ No";
        case "makeModel":
          const make = vehicle.make || "Unknown";
          const model = vehicle.model || "Model";
          return `${make} ${model}`;
        default:
          return String(value || "N/A");
      }
    } catch (error) {
      console.error('Error formatting value:', error);
      return "N/A";
    }
  };

  // Determine winner for each row with error handling
  const getWinner = (row: any): Vehicle | null => {
    if (selectedVehicles.length < 2) return null;
    
    try {
      switch (row.key) {
        case "price":
        case "marketValue":
          return selectedVehicles.reduce((min, vehicle) => {
            const minValue = min[row.key] || Number.MAX_VALUE;
            const vehicleValue = vehicle[row.key] || Number.MAX_VALUE;
            return vehicleValue < minValue ? vehicle : min;
          });
        case "year":
          return selectedVehicles.reduce((max, vehicle) => 
            (vehicle.year || 0) > (max.year || 0) ? vehicle : max
          );
        case "mileage":
          return selectedVehicles.reduce((min, vehicle) => 
            (vehicle.mileage || Number.MAX_VALUE) < (min.mileage || Number.MAX_VALUE) ? vehicle : min
          );
        case "healthScore":
        case "safetyRating":
        case "resaleValue":
          return selectedVehicles.reduce((max, vehicle) => {
            const maxValue = max[row.key] || 0;
            const vehicleValue = vehicle[row.key] || 0;
            return vehicleValue > maxValue ? vehicle : max;
          });
        case "fuelConsumption":
          // Lower fuel consumption is better
          return selectedVehicles.reduce((min, vehicle) => {
            try {
              const minConsumption = parseFloat((min.fuelConsumption || "999L").split('L')[0]);
              const vehicleConsumption = parseFloat((vehicle.fuelConsumption || "999L").split('L')[0]);
              return vehicleConsumption < minConsumption ? vehicle : min;
            } catch {
              return min;
            }
          });
        case "co2Emissions":
          // Lower emissions are better
          return selectedVehicles.reduce((min, vehicle) => {
            try {
              const minEmissions = parseFloat((min.co2Emissions || "999 g").split(' ')[0]);
              const vehicleEmissions = parseFloat((vehicle.co2Emissions || "999 g").split(' ')[0]);
              return vehicleEmissions < minEmissions ? vehicle : min;
            } catch {
              return min;
            }
          });
        case "acceleration":
          // Faster acceleration (lower time) is better
          return selectedVehicles.reduce((min, vehicle) => {
            try {
              const minTime = parseFloat((min.acceleration || "999s").split('s')[0]);
              const vehicleTime = parseFloat((vehicle.acceleration || "999s").split('s')[0]);
              return vehicleTime < minTime ? vehicle : min;
            } catch {
              return min;
            }
          });
        case "topSpeed":
          // Higher top speed is better
          return selectedVehicles.reduce((max, vehicle) => {
            try {
              const maxSpeed = parseFloat((max.topSpeed || "0 km").split(' ')[0]);
              const vehicleSpeed = parseFloat((vehicle.topSpeed || "0 km").split(' ')[0]);
              return vehicleSpeed > maxSpeed ? vehicle : max;
            } catch {
              return max;
            }
          });
        default:
          return null;
      }
    } catch (error) {
      console.error('Error determining winner:', error);
      return null;
    }
  };

  // Generate AI welcome message
  const generateWelcomeMessage = () => {
    const vehicleNames = selectedVehicles.map(v => v.make + " " + v.model).join(", ");
    return `Hello! I'm here to help you compare these vehicles: ${vehicleNames}. I can provide insights about performance, value for money, maintenance costs, and help you make the best decision based on your needs. What would you like to know?`;
  };

  // Handle AI chat
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: generateAIResponse(newMessage),
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  // Generate AI response based on user message with error handling
  const generateAIResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    try {
      if (message.includes('price') || message.includes('cost') || message.includes('budget') || message.includes('value')) {
        const cheapest = selectedVehicles.reduce((min, v) => (v.price || Number.MAX_VALUE) < (min.price || Number.MAX_VALUE) ? v : min);
        const bestValue = selectedVehicles.reduce((max, v) => (v.resaleValue || 0) > (max.resaleValue || 0) ? v : max);
        return `Looking at value for money, the ${cheapest.make} ${cheapest.model} at ${formatPrice(cheapest.price)} is the most affordable option. However, the ${bestValue.make} ${bestValue.model} offers the best resale value at ${bestValue.resaleValue || 'N/A'}%, which could save you more money long-term.`;
      }
      
      if (message.includes('fuel') || message.includes('efficiency') || message.includes('economy') || message.includes('consumption')) {
        const mostEfficient = selectedVehicles.reduce((min, v) => {
          const minConsumption = parseFloat((min.fuelConsumption || "999L").split('L')[0]);
          const vConsumption = parseFloat((v.fuelConsumption || "999L").split('L')[0]);
          return vConsumption < minConsumption ? v : min;
        });
        return `For fuel efficiency, the ${mostEfficient.make} ${mostEfficient.model} is your best choice with ${mostEfficient.fuelConsumption || 'N/A'} consumption and ${mostEfficient.co2Emissions || 'N/A'} CO2 emissions. This will save you significantly on fuel costs over time.`;
      }
      
      if (message.includes('performance') || message.includes('speed') || message.includes('acceleration') || message.includes('power')) {
        const fastest = selectedVehicles.reduce((min, v) => {
          const minTime = parseFloat((min.acceleration || "999s").split('s')[0]);
          const vTime = parseFloat((v.acceleration || "999s").split('s')[0]);
          return vTime < minTime ? v : min;
        });
        return `For performance, the ${fastest.make} ${fastest.model} leads with ${fastest.acceleration || 'N/A'} acceleration and a top speed of ${fastest.topSpeed || 'N/A'}. It offers the most thrilling driving experience among your selections.`;
      }
      
      if (message.includes('reliable') || message.includes('maintenance') || message.includes('service') || message.includes('repair')) {
        const lowMaintenance = selectedVehicles.filter(v => v.maintenanceCost === 'Low');
        const bestHealth = selectedVehicles.reduce((max, v) => (v.healthScore || 0) > (max.healthScore || 0) ? v : max);
        if (lowMaintenance.length > 0) {
          return `For reliability and low maintenance costs, consider the ${lowMaintenance[0].make} ${lowMaintenance[0].model} with low maintenance costs and ${lowMaintenance[0].healthScore || 'N/A'} health score. It's designed for minimal ownership hassles.`;
        }
        return `The ${bestHealth.make} ${bestHealth.model} has the highest health score of ${bestHealth.healthScore || 'N/A'}, indicating excellent condition and likely lower immediate maintenance needs.`;
      }
      
      if (message.includes('safe') || message.includes('safety') || message.includes('family')) {
        const safest = selectedVehicles.reduce((max, v) => (v.safetyRating || 0) > (max.safetyRating || 0) ? v : max);
        return `For safety, the ${safest.make} ${safest.model} leads with a ${safest.safetyRating || 'N/A'}/5 safety rating. This makes it an excellent choice for family use with advanced safety features and crash protection.`;
      }
      
      if (message.includes('recommend') || message.includes('suggest') || message.includes('best') || message.includes('choose')) {
        const bestOverall = selectedVehicles.reduce((best, v) => {
          const bestScore = ((best.healthScore || 0) + (best.safetyRating || 0) * 20 + (best.resaleValue || 0)) / 3;
          const vScore = ((v.healthScore || 0) + (v.safetyRating || 0) * 20 + (v.resaleValue || 0)) / 3;
          return vScore > bestScore ? v : best;
        });
        return `Based on overall value, safety, condition, and resale value, I'd recommend the ${bestOverall.make} ${bestOverall.model}. It offers the best balance of performance (${bestOverall.acceleration || 'N/A'}), economy (${bestOverall.fuelConsumption || 'N/A'}), safety (${bestOverall.safetyRating || 'N/A'}/5), and maintains ${bestOverall.resaleValue || 'N/A'}% of its value.`;
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
    }
    
    return `I can help you compare these vehicles across various aspects like price, fuel efficiency, performance, safety ratings, and ownership costs. What specific aspect would you like me to focus on? You can ask about fuel economy, performance, reliability, safety, or overall value for money.`;
  };

  // Handle share functionality
  const handleShare = async () => {
    const vehicleIds = selectedVehicles.map(v => v.id).join(',');
    const shareUrl = `${window.location.origin}/comparison?vehicles=${vehicleIds}`;
    
    try {
      await navigator.share({
        title: 'Vehicle Comparison - Car Mart',
        text: `Compare ${selectedVehicles.map(v => v.make + ' ' + v.model).join(', ')}`,
        url: shareUrl
      });
    } catch (error) {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(shareUrl);
      alert('Comparison link copied to clipboard!');
    }
  };

  // Handle export functionality
  const handleExport = () => {
    const comparisonData = {
      vehicles: selectedVehicles,
      comparison: comparisonSections,
      generatedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(comparisonData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `vehicle-comparison-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        {showCarSelector ? (
          /* Vehicle Selection Mode */
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl lg:text-4xl font-bold text-primary">Vehicle Comparison</h1>
              <p className="text-muted-foreground">
                Select 2-4 vehicles to compare side by side
              </p>
            </div>

            {/* Selected Vehicles Preview */}
            {selectedVehicles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Selected for Comparison ({selectedVehicles.length}/4)</span>
                    {selectedVehicles.length >= 2 && (
                      <Button onClick={() => setShowCarSelector(false)}>
                        Compare Now
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {selectedVehicles.map((vehicle) => (
                      <div key={vehicle.id} className="relative bg-muted/30 rounded-lg p-4">
                        <button
                          onClick={() => removeVehicleFromComparison(vehicle.id)}
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold hover:bg-destructive/90"
                        >
                          ×
                        </button>
                        <img src={vehicle.image} alt={vehicle.title} className="w-full h-32 object-cover rounded mb-2" />
                        <h3 className="font-medium text-sm line-clamp-2 mb-1">{vehicle.title}</h3>
                        <p className="text-primary font-bold text-sm">{formatPrice(vehicle.price)}</p>
                        <Badge className={`mt-1 ${getHealthScoreStyle(vehicle.healthScore)} text-xs`}>
                          Health: {vehicle.healthScore}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Available Vehicles */}
            <Card>
              <CardHeader>
                <CardTitle>Available Vehicles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        {vehicle.isVerified && (
                          <Badge className="absolute top-2 right-2 bg-green-600 text-white text-xs">
                            ✓ Verified
                          </Badge>
                        )}
                        {vehicle.isFeatured && (
                          <Badge className="absolute top-2 left-2 bg-highlight text-white text-xs">
                            <Crown className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {vehicle.title}
                        </h3>
                        <div className="space-y-2 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-primary text-lg">
                              {formatPrice(vehicle.price)}
                            </span>
                            <Badge className={getHealthScoreStyle(vehicle.healthScore)}>
                              {vehicle.healthScore}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span>{vehicle.year}</span>
                            <span>•</span>
                            <span>{vehicle.mileage.toLocaleString()} km</span>
                          </div>
                          <div className="text-muted-foreground">📍 {vehicle.location}</div>
                        </div>
                        <Button 
                          className="w-full" 
                          variant="outline"
                          disabled={selectedVehicles.length >= 4}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          {selectedVehicles.length >= 4 ? 'Max 4 vehicles' : 'Add to Compare'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Comparison Results Mode */
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-4 mb-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCarSelector(true)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Selection
                  </Button>
                  <h1 className="text-2xl lg:text-3xl font-bold text-primary">Vehicle Comparison</h1>
                </div>
                <p className="text-muted-foreground">
                  Comparing {selectedVehicles.length} vehicles side by side
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowAIChat(!showAIChat)}
                  className={showAIChat ? "bg-primary text-primary-foreground" : ""}
                >
                  <Bot className="h-4 w-4 mr-2" />
                  AI Assistant
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Comparison Area */}
              <div className={`${showAIChat ? 'lg:col-span-3' : 'lg:col-span-4'} space-y-6`}>
                {/* Vehicle Overview Cards */}
                <div className={`grid grid-cols-1 ${
                  selectedVehicles.length === 2 ? 'sm:grid-cols-2' : 
                  selectedVehicles.length === 3 ? 'sm:grid-cols-3' : 
                  'sm:grid-cols-2 lg:grid-cols-4'
                } gap-4`}>
                  {selectedVehicles.map((vehicle, index) => (
                    <Card key={vehicle.id} className="relative">
                      <button
                        onClick={() => removeVehicleFromComparison(vehicle.id)}
                        className="absolute top-2 right-2 z-10 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold hover:bg-destructive/90"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <CardContent className="p-4">
                        <div className="text-center space-y-3">
                          <img
                            src={vehicle.image}
                            alt={vehicle.title}
                            className="w-full h-32 object-cover rounded"
                          />
                          <div>
                            <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                              {vehicle.title}
                            </h3>
                            <div className="space-y-2">
                              <div className="text-lg font-bold text-primary">
                                {formatPrice(vehicle.price)}
                              </div>
                              <Badge className={getHealthScoreStyle(vehicle.healthScore)}>
                                Health: {vehicle.healthScore}
                              </Badge>
                              <div className="text-xs text-muted-foreground">
                                {vehicle.year} • {vehicle.mileage.toLocaleString()} km
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Detailed Comparison Tables */}
                {comparisonSections.map((section, sectionIndex) => (
                  <Card key={sectionIndex}>
                    <CardHeader>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-muted/30">
                              <th className="text-left p-4 font-medium text-muted-foreground text-sm">
                                Specification
                              </th>
                              {selectedVehicles.map((vehicle) => (
                                <th key={vehicle.id} className="text-center p-4 font-medium text-sm min-w-[150px]">
                                  <div className="flex flex-col items-center space-y-1">
                                    <img 
                                      src={vehicle.image} 
                                      alt={vehicle.title}
                                      className="w-12 h-8 object-cover rounded"
                                    />
                                    <span className="text-xs">{vehicle.make} {vehicle.model}</span>
                                  </div>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.rows.map((row, rowIndex) => {
                              const winner = getWinner(row);
                              return (
                                <tr key={rowIndex} className="border-b hover:bg-muted/30">
                                  <td className="p-4 font-medium text-sm">
                                    {row.label}
                                  </td>
                                  {selectedVehicles.map((vehicle) => (
                                    <td key={vehicle.id} className={`p-4 text-center text-sm ${
                                      winner?.id === vehicle.id ? 'bg-green-50 font-semibold' : ''
                                    }`}>
                                      <div className="flex items-center justify-center space-x-1">
                                        {winner?.id === vehicle.id && (
                                          <CheckCircle className="w-4 h-4 text-green-600" />
                                        )}
                                        <span>{getFormattedValue(vehicle, row)}</span>
                                      </div>
                                    </td>
                                  ))}
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

              {/* AI Chat Panel */}
              {showAIChat && (
                <div className="lg:col-span-1">
                  <Card className="h-[600px] flex flex-col">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Bot className="w-5 h-5 mr-2" />
                        AI Assistant
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col p-0">
                      <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                          {chatMessages.map((message) => (
                            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`flex items-start space-x-2 max-w-[85%] ${
                                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                              }`}>
                                <Avatar className="w-6 h-6 flex-shrink-0">
                                  <AvatarFallback className="text-xs">
                                    {message.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                                  </AvatarFallback>
                                </Avatar>
                                <div className={`p-3 rounded-lg text-sm ${
                                  message.sender === 'user' 
                                    ? 'bg-primary text-primary-foreground' 
                                    : 'bg-muted'
                                }`}>
                                  <p className="leading-relaxed">{message.message}</p>
                                  <span className="text-xs opacity-70 mt-1 block">{message.timestamp}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          {isLoading && (
                            <div className="flex justify-start">
                              <div className="flex items-start space-x-2 max-w-[85%]">
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
                      
                      <div className="p-4 border-t">
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
        )}
      </div>
    </div>
  );
};

export default ComparisonPage;