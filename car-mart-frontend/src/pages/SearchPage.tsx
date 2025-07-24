import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, MapPin, DollarSign, Calendar, Fuel, Settings, BarChart3, Grid3x3, List, ArrowUpDown, Loader2, Heart, Car, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import VehicleCard from "@/components/VehicleCard";
import ComparisonBar from "@/components/ComparisonBar";
import MobileFilterPanel from "@/components/MobileFilterPanel";
import HealthScoreBadge from "@/components/HealthScoreBadge";

interface ComparisonVehicle {
  id: string;
  title: string;
  price: number;
  image: string;
  healthScore: number;
}

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
  make?: string;
  model?: string;
  bodyType?: string;
  condition?: string;
  engineCapacity?: string;
  color?: string;
  doors?: number;
  drivetrain?: string;
  seatingCapacity?: number;
  // Features
  airConditioning?: boolean;
  bluetooth?: boolean;
  reverseCamera?: boolean;
  sunroof?: boolean;
  leatherSeats?: boolean;
  alloyWheels?: boolean;
  abs?: boolean;
  airbags?: boolean;
  powerSteering?: boolean;
}

interface Filters {
  search: string;
  make: string;
  model: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
  yearFrom: string;
  yearTo: string;
  location: string;
  condition: string;
  minPrice: number;
  maxPrice: number;
  healthScore: number[];
  mileageFrom: string;
  mileageTo: string;
  doors: string;
  drivetrain: string;
  color: string;
  engineSize: string;
  seatingCapacity: string;
  // Feature filters
  airConditioning: boolean;
  bluetooth: boolean;
  reverseCamera: boolean;
  sunroof: boolean;
  leatherSeats: boolean;
  alloyWheels: boolean;
  abs: boolean;
  airbags: boolean;
  powerSteering: boolean;
}

const SearchPage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comparisonList, setComparisonList] = useState<ComparisonVehicle[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Check if mobile and set default view mode
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setViewMode("list");
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const [filters, setFilters] = useState<Filters>({
    search: "",
    make: "all",
    model: "",
    bodyType: "",
    fuelType: "all",
    transmission: "",
    yearFrom: "",
    yearTo: "",
    location: "",
    condition: "",
    minPrice: 0,
    maxPrice: 50000000,
    healthScore: [0, 100],
    mileageFrom: "",
    mileageTo: "",
    doors: "",
    drivetrain: "",
    color: "",
    engineSize: "",
    seatingCapacity: "",
    airConditioning: false,
    bluetooth: false,
    reverseCamera: false,
    sunroof: false,
    leatherSeats: false,
    alloyWheels: false,
    abs: false,
    airbags: false,
    powerSteering: false
  });

  // Enhanced mock vehicle data with more properties
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
      image: "/api/placeholder/400/300",
      healthScore: 92,
      sellerRating: 4.8,
      isVerified: true,
      isFeatured: true,
      make: "BMW",
      model: "3 Series",
      bodyType: "Sedan",
      condition: "Excellent",
      color: "White",
      doors: 4,
      drivetrain: "RWD",
      seatingCapacity: 5,
      airConditioning: true,
      bluetooth: true,
      reverseCamera: true,
      sunroof: true,
      leatherSeats: true,
      alloyWheels: true,
      abs: true,
      airbags: true,
      powerSteering: true
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
      image: "/api/placeholder/400/300",
      healthScore: 88,
      sellerRating: 4.7,
      isVerified: true,
      isFeatured: false,
      make: "Toyota",
      model: "RAV4",
      bodyType: "SUV",
      condition: "Very Good",
      color: "Silver",
      doors: 5,
      drivetrain: "AWD",
      seatingCapacity: 5,
      airConditioning: true,
      bluetooth: true,
      reverseCamera: true,
      sunroof: false,
      leatherSeats: false,
      alloyWheels: true,
      abs: true,
      airbags: true,
      powerSteering: true
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
      image: "/api/placeholder/400/300",
      healthScore: 85,
      sellerRating: 4.6,
      isVerified: false,
      isFeatured: false,
      make: "Honda",
      model: "Civic",
      bodyType: "Sedan",
      condition: "Good",
      color: "Black",
      doors: 4,
      drivetrain: "FWD",
      seatingCapacity: 5,
      airConditioning: true,
      bluetooth: true,
      reverseCamera: false,
      sunroof: false,
      leatherSeats: false,
      alloyWheels: true,
      abs: true,
      airbags: true,
      powerSteering: true
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
      image: "/api/placeholder/400/300",
      healthScore: 96,
      sellerRating: 4.9,
      isVerified: true,
      isFeatured: true,
      make: "Mercedes-Benz",
      model: "C-Class",
      bodyType: "Sedan",
      condition: "Excellent",
      color: "Blue",
      doors: 4,
      drivetrain: "RWD",
      seatingCapacity: 5,
      airConditioning: true,
      bluetooth: true,
      reverseCamera: true,
      sunroof: true,
      leatherSeats: true,
      alloyWheels: true,
      abs: true,
      airbags: true,
      powerSteering: true
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
      image: "/api/placeholder/400/300",
      healthScore: 78,
      sellerRating: 4.4,
      isVerified: false,
      isFeatured: false,
      make: "Nissan",
      model: "X-Trail",
      bodyType: "SUV",
      condition: "Good",
      color: "Gray",
      doors: 5,
      drivetrain: "4WD",
      seatingCapacity: 7,
      airConditioning: true,
      bluetooth: false,
      reverseCamera: false,
      sunroof: false,
      leatherSeats: false,
      alloyWheels: true,
      abs: true,
      airbags: true,
      powerSteering: true
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
      image: "/api/placeholder/400/300",
      healthScore: 91,
      sellerRating: 4.7,
      isVerified: true,
      isFeatured: true,
      make: "Audi",
      model: "A4",
      bodyType: "Sedan",
      condition: "Excellent",
      color: "White",
      doors: 4,
      drivetrain: "AWD",
      seatingCapacity: 5,
      airConditioning: true,
      bluetooth: true,
      reverseCamera: true,
      sunroof: true,
      leatherSeats: true,
      alloyWheels: true,
      abs: true,
      airbags: true,
      powerSteering: true
    }
  ];

  // Load mock data
  useEffect(() => {
    const loadVehicles = async () => {
      setLoading(true);
      setError(null);
      
      setTimeout(() => {
        try {
          setVehicles(mockVehicles);
          setLoading(false);
        } catch (err) {
          setError("Failed to load vehicles");
          setLoading(false);
        }
      }, 800);
    };

    loadVehicles();
  }, []);

  // Enhanced filter and sort vehicles
  useEffect(() => {
    let filtered = [...vehicles];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(vehicle =>
        vehicle.title.toLowerCase().includes(searchTerm) ||
        (vehicle.make && vehicle.make.toLowerCase().includes(searchTerm)) ||
        (vehicle.model && vehicle.model.toLowerCase().includes(searchTerm)) ||
        vehicle.location.toLowerCase().includes(searchTerm)
      );
    }

    // Make filter
    if (filters.make && filters.make !== "all") {
      filtered = filtered.filter(vehicle => 
        vehicle.make && vehicle.make.toLowerCase() === filters.make.toLowerCase()
      );
    }

    // Model filter
    if (filters.model) {
      filtered = filtered.filter(vehicle => 
        vehicle.model && vehicle.model.toLowerCase().includes(filters.model.toLowerCase())
      );
    }

    // Body type filter
    if (filters.bodyType) {
      filtered = filtered.filter(vehicle => 
        vehicle.bodyType && vehicle.bodyType.toLowerCase() === filters.bodyType.toLowerCase()
      );
    }

    // Fuel type filter
    if (filters.fuelType && filters.fuelType !== "all") {
      filtered = filtered.filter(vehicle => 
        vehicle.fuelType.toLowerCase() === filters.fuelType.toLowerCase()
      );
    }

    // Transmission filter
    if (filters.transmission) {
      filtered = filtered.filter(vehicle => 
        vehicle.transmission.toLowerCase() === filters.transmission.toLowerCase()
      );
    }

    // Year range filter
    if (filters.yearFrom) {
      filtered = filtered.filter(vehicle => 
        vehicle.year >= parseInt(filters.yearFrom)
      );
    }
    if (filters.yearTo) {
      filtered = filtered.filter(vehicle => 
        vehicle.year <= parseInt(filters.yearTo)
      );
    }

    // Mileage range filter
    if (filters.mileageFrom) {
      filtered = filtered.filter(vehicle => 
        vehicle.mileage >= parseInt(filters.mileageFrom)
      );
    }
    if (filters.mileageTo) {
      filtered = filtered.filter(vehicle => 
        vehicle.mileage <= parseInt(filters.mileageTo)
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(vehicle => 
        vehicle.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Condition filter
    if (filters.condition) {
      filtered = filtered.filter(vehicle => 
        vehicle.condition && vehicle.condition.toLowerCase() === filters.condition.toLowerCase()
      );
    }

    // Price range filter
    filtered = filtered.filter(vehicle => 
      vehicle.price >= filters.minPrice && vehicle.price <= filters.maxPrice
    );

    // Health score filter
    filtered = filtered.filter(vehicle => 
      vehicle.healthScore >= filters.healthScore[0] && vehicle.healthScore <= filters.healthScore[1]
    );

    // Doors filter
    if (filters.doors) {
      filtered = filtered.filter(vehicle => 
        vehicle.doors && vehicle.doors.toString() === filters.doors
      );
    }

    // Drivetrain filter
    if (filters.drivetrain) {
      filtered = filtered.filter(vehicle => 
        vehicle.drivetrain && vehicle.drivetrain.toLowerCase() === filters.drivetrain.toLowerCase()
      );
    }

    // Color filter
    if (filters.color) {
      filtered = filtered.filter(vehicle => 
        vehicle.color && vehicle.color.toLowerCase() === filters.color.toLowerCase()
      );
    }

    // Seating capacity filter
    if (filters.seatingCapacity) {
      filtered = filtered.filter(vehicle => 
        vehicle.seatingCapacity && vehicle.seatingCapacity.toString() === filters.seatingCapacity
      );
    }

    // Feature filters
    if (filters.airConditioning) {
      filtered = filtered.filter(vehicle => vehicle.airConditioning);
    }
    if (filters.bluetooth) {
      filtered = filtered.filter(vehicle => vehicle.bluetooth);
    }
    if (filters.reverseCamera) {
      filtered = filtered.filter(vehicle => vehicle.reverseCamera);
    }
    if (filters.sunroof) {
      filtered = filtered.filter(vehicle => vehicle.sunroof);
    }
    if (filters.leatherSeats) {
      filtered = filtered.filter(vehicle => vehicle.leatherSeats);
    }
    if (filters.alloyWheels) {
      filtered = filtered.filter(vehicle => vehicle.alloyWheels);
    }
    if (filters.abs) {
      filtered = filtered.filter(vehicle => vehicle.abs);
    }
    if (filters.airbags) {
      filtered = filtered.filter(vehicle => vehicle.airbags);
    }
    if (filters.powerSteering) {
      filtered = filtered.filter(vehicle => vehicle.powerSteering);
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "year-new":
        filtered.sort((a, b) => b.year - a.year);
        break;
      case "mileage-low":
        filtered.sort((a, b) => a.mileage - b.mileage);
        break;
      case "health-score":
        filtered.sort((a, b) => b.healthScore - a.healthScore);
        break;
      case "rating":
        filtered.sort((a, b) => b.sellerRating - a.sellerRating);
        break;
      default:
        // Keep relevance order, but prioritize featured vehicles
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return 0;
        });
        break;
    }

    setFilteredVehicles(filtered);
  }, [vehicles, filters, sortBy]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Enhanced handleApplyFilters to handle all filter types
  // REPLACE ONLY the handleApplyFilters function in SearchPage.tsx with this MINIMAL version:

  const handleApplyFilters = (newFilters: any) => {
    console.log("Applying filters:", newFilters);
    
    // Create updated filters object, preserving existing structure
    const updatedFilters = { ...filters };
    
    // Only handle properties that exist in SearchPage filters interface
    if (newFilters.search !== undefined) {
      updatedFilters.search = newFilters.search;
    }
    
    if (newFilters.location !== undefined) {
      updatedFilters.location = newFilters.location;
    }
    
    if (newFilters.make !== undefined) {
      updatedFilters.make = newFilters.make === "" ? "all" : newFilters.make;
    }
    
    if (newFilters.fuelType !== undefined) {
      updatedFilters.fuelType = newFilters.fuelType === "" ? "all" : newFilters.fuelType;
    }
    
    if (newFilters.transmission !== undefined) {
      updatedFilters.transmission = newFilters.transmission;
    }
    
    if (newFilters.bodyType !== undefined) {
      updatedFilters.bodyType = newFilters.bodyType;
    }
    
    if (newFilters.condition !== undefined) {
      updatedFilters.condition = newFilters.condition;
    }
    
    if (newFilters.yearFrom !== undefined) {
      updatedFilters.yearFrom = newFilters.yearFrom;
    }
    
    if (newFilters.yearTo !== undefined) {
      updatedFilters.yearTo = newFilters.yearTo;
    }
    
    if (newFilters.minPrice !== undefined) {
      updatedFilters.minPrice = newFilters.minPrice;
    }
    
    if (newFilters.maxPrice !== undefined) {
      updatedFilters.maxPrice = newFilters.maxPrice;
    }
    
    if (newFilters.healthScore !== undefined && Array.isArray(newFilters.healthScore)) {
      updatedFilters.healthScore = newFilters.healthScore;
    }
    
    setFilters(updatedFilters);
    console.log("Updated filters:", updatedFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters: Filters = {
      search: "",
      make: "all",
      model: "",
      bodyType: "",
      fuelType: "all",
      transmission: "",
      yearFrom: "",
      yearTo: "",
      location: "",
      condition: "",
      minPrice: 0,
      maxPrice: 50000000,
      healthScore: [0, 100],
      mileageFrom: "",
      mileageTo: "",
      doors: "",
      drivetrain: "",
      color: "",
      engineSize: "",
      seatingCapacity: "",
      airConditioning: false,
      bluetooth: false,
      reverseCamera: false,
      sunroof: false,
      leatherSeats: false,
      alloyWheels: false,
      abs: false,
      airbags: false,
      powerSteering: false
    };
    setFilters(clearedFilters);
  };

  const handleAddToComparison = (vehicle: Vehicle) => {
    if (comparisonList.length >= 3) {
      alert("You can compare up to 3 vehicles only");
      return;
    }
    
    const comparisonVehicle: ComparisonVehicle = {
      id: vehicle.id,
      title: vehicle.title,
      price: vehicle.price,
      image: vehicle.image,
      healthScore: vehicle.healthScore
    };
    
    setComparisonList([...comparisonList, comparisonVehicle]);
  };

  const handleRemoveFromComparison = (id: string) => {
    setComparisonList(comparisonList.filter(v => v.id !== id));
  };

  const handleSave = (id: string) => {
    console.log("Saved vehicle:", id);
  };

  const handleContact = (id: string) => {
    console.log("Contact seller for vehicle:", id);
  };

  const handleVehicleClick = (id: string) => {
    navigate(`/vehicle/${id}`);
  };

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Vehicles</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-4">
              <Card className="shadow-sm">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-primary">Search Filters</h3>
                </div>
                <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {/* Search */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Make, model, or keyword"
                        className="pl-10"
                        value={filters.search}
                        onChange={(e) => handleFilterChange("search", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Make */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Make</label>
                    <Select value={filters.make} onValueChange={(value) => handleFilterChange("make", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Makes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Makes</SelectItem>
                        <SelectItem value="bmw">BMW</SelectItem>
                        <SelectItem value="toyota">Toyota</SelectItem>
                        <SelectItem value="honda">Honda</SelectItem>
                        <SelectItem value="mercedes-benz">Mercedes-Benz</SelectItem>
                        <SelectItem value="audi">Audi</SelectItem>
                        <SelectItem value="nissan">Nissan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Price Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice || ""}
                        onChange={(e) => handleFilterChange("minPrice", parseInt(e.target.value) || 0)}
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice || ""}
                        onChange={(e) => handleFilterChange("maxPrice", parseInt(e.target.value) || 50000000)}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Rs. {filters.minPrice.toLocaleString()} - Rs. {filters.maxPrice.toLocaleString()}
                    </div>
                  </div>

                  {/* Year Range */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Year</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        placeholder="From"
                        value={filters.yearFrom}
                        onChange={(e) => handleFilterChange("yearFrom", e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="To"
                        value={filters.yearTo}
                        onChange={(e) => handleFilterChange("yearTo", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Health Score */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">AI Health Score</label>
                    <Slider
                      value={filters.healthScore}
                      onValueChange={(value) => handleFilterChange("healthScore", value)}
                      max={100}
                      step={5}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{filters.healthScore[0]}%</span>
                      <span>{filters.healthScore[1]}%</span>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    onClick={clearAllFilters}
                    className="w-full"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-primary">Search Vehicles</h1>
                <p className="text-muted-foreground">
                  {loading ? "Loading..." : `${filteredVehicles.length} vehicles found`}
                </p>
              </div>

              {/* Desktop Controls */}
              <div className="hidden sm:flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="year-new">Year: Newest First</SelectItem>
                    <SelectItem value="mileage-low">Mileage: Low to High</SelectItem>
                    <SelectItem value="health-score">Health Score</SelectItem>
                    <SelectItem value="rating">Seller Rating</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-r-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-l-none"
                    disabled={isMobile}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Mobile Sort */}
              <div className="flex sm:hidden w-full">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price ↑</SelectItem>
                    <SelectItem value="price-high">Price ↓</SelectItem>
                    <SelectItem value="year-new">Year ↓</SelectItem>
                    <SelectItem value="health-score">Health Score</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Loading vehicles...</span>
              </div>
            )}

            {/* Results */}
            {!loading && (
              <>
                {filteredVehicles.length === 0 ? (
                  <div className="text-center py-12">
                    <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No vehicles found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or search terms
                    </p>
                    <Button onClick={clearAllFilters} variant="outline">
                      Clear All Filters
                    </Button>
                  </div>
                ) : (
                  <div className={
                    viewMode === "grid" && !isMobile
                      ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "space-y-4"
                  }>
                    {filteredVehicles.map((vehicle) => (
                      viewMode === "grid" && !isMobile ? (
                        <VehicleCard
                          key={vehicle.id}
                          vehicle={vehicle}
                          onSave={() => handleSave(vehicle.id)}
                          onCompare={() => handleAddToComparison(vehicle)}
                          isSaved={false}
                        />
                      ) : (
                        <Card
                          key={vehicle.id}
                          className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
                          onClick={() => handleVehicleClick(vehicle.id)}
                        >
                          <div className="flex flex-col sm:flex-row">
                            <div className="relative w-full sm:w-48 h-48 sm:h-32 flex-shrink-0">
                              <img
                                src={vehicle.image}
                                alt={vehicle.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 left-2">
                                <HealthScoreBadge score={vehicle.healthScore} />
                              </div>
                              {vehicle.isFeatured && (
                                <div className="absolute top-2 right-2">
                                  <Badge className="bg-highlight text-white">Featured</Badge>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1 p-4 flex flex-col justify-between">
                              <div>
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                                  <h3 className="text-lg font-semibold text-primary mb-1 sm:mb-0">
                                    {vehicle.title}
                                  </h3>
                                  <p className="text-xl font-bold text-primary">
                                    {formatPrice(vehicle.price)}
                                  </p>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 mb-3">
                                  <Badge variant="secondary" className="text-xs">{vehicle.year}</Badge>
                                  <Badge variant="outline" className="text-xs">{vehicle.fuelType}</Badge>
                                  <Badge variant="outline" className="text-xs">{vehicle.transmission}</Badge>
                                  {vehicle.isVerified && <Badge className="bg-success text-xs">✓ Verified</Badge>}
                                </div>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex flex-col space-y-1 mb-3 sm:mb-0">
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span>{vehicle.location}</span>
                                    <span className="mx-2">•</span>
                                    <span>{vehicle.mileage.toLocaleString()} km</span>
                                  </div>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                                    <span>{vehicle.sellerRating}</span>
                                  </div>
                                </div>
                                
                                <div className="flex space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSave(vehicle.id);
                                    }}
                                  >
                                    <Heart className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAddToComparison(vehicle);
                                    }}
                                    disabled={comparisonList.some(v => v.id === vehicle.id)}
                                  >
                                    <BarChart3 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      )
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 left-4 z-40">
        <Button
          onClick={() => setFiltersOpen(true)}
          className="bg-primary text-white p-3 rounded-full shadow-lg flex items-center space-x-2"
        >
          <Filter className="w-5 h-5" />
          <span className="text-sm font-medium">Filters</span>
        </Button>
      </div>

      {/* Mobile Filter Panel */}
      <MobileFilterPanel
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onApplyFilters={handleApplyFilters}
        resultCount={filteredVehicles.length}
        category="vehicles"
      />

      {/* Comparison Bar */}
      <ComparisonBar
        selectedVehicles={comparisonList}
        onRemove={handleRemoveFromComparison}
        onCompare={() => navigate("/compare")}
        onClear={() => setComparisonList([])}
      />
    </div>
  );
};

export default SearchPage;