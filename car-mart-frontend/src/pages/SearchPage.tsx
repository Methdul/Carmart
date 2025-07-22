import { useState, useEffect } from "react";
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
}

interface Filters {
  search: string;
  make: string;
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
}

const SearchPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
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
      const mobile = window.innerWidth < 768; // md breakpoint
      setIsMobile(mobile);
      if (mobile) {
        setViewMode("list"); // Force list view on mobile
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const [filters, setFilters] = useState<Filters>({
    search: "",
    make: "all",
    bodyType: "",
    fuelType: "all",
    transmission: "",
    yearFrom: "",
    yearTo: "",
    location: "",
    condition: "",
    minPrice: 0,
    maxPrice: 50000000,
    healthScore: [0, 100]
  });

  // Mock vehicle data
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
      engineCapacity: "1998cc",
      color: "Alpine White"
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
      sellerRating: 4.9,
      isVerified: true,
      isFeatured: true,
      make: "Toyota",
      model: "RAV4",
      bodyType: "SUV",
      condition: "Excellent",
      engineCapacity: "2487cc",
      color: "Silver Metallic"
    },
    {
      id: "3",
      title: "Honda Civic Type R",
      price: 18500000,
      year: 2022,
      mileage: 15000,
      location: "Galle",
      fuelType: "Petrol",
      transmission: "Manual",
      image: "/api/placeholder/400/300",
      healthScore: 95,
      sellerRating: 4.7,
      isVerified: false,
      isFeatured: false,
      make: "Honda",
      model: "Civic",
      bodyType: "Hatchback",
      condition: "Excellent",
      engineCapacity: "1996cc",
      color: "Championship White"
    },
    {
      id: "4",
      title: "Mercedes-Benz C-Class C200",
      price: 22000000,
      year: 2019,
      mileage: 45000,
      location: "Colombo",
      fuelType: "Petrol",
      transmission: "Automatic",
      image: "/api/placeholder/400/300",
      healthScore: 85,
      sellerRating: 4.6,
      isVerified: true,
      isFeatured: false,
      make: "Mercedes-Benz",
      model: "C-Class",
      bodyType: "Sedan",
      condition: "Good",
      engineCapacity: "1991cc",
      color: "Obsidian Black"
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

  // Filter and sort vehicles
  useEffect(() => {
    let filtered = [...vehicles];

    // Apply filters
    if (filters.search) {
      filtered = filtered.filter(vehicle =>
        vehicle.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        (vehicle.make && vehicle.make.toLowerCase().includes(filters.search.toLowerCase())) ||
        (vehicle.model && vehicle.model.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    if (filters.make && filters.make !== "all") {
      filtered = filtered.filter(vehicle => 
        vehicle.make && vehicle.make.toLowerCase() === filters.make.toLowerCase()
      );
    }

    if (filters.fuelType && filters.fuelType !== "all") {
      filtered = filtered.filter(vehicle => 
        vehicle.fuelType.toLowerCase() === filters.fuelType.toLowerCase()
      );
    }

    if (filters.location) {
      filtered = filtered.filter(vehicle => 
        vehicle.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    filtered = filtered.filter(vehicle => 
      vehicle.price >= filters.minPrice && vehicle.price <= filters.maxPrice
    );

    filtered = filtered.filter(vehicle => 
      vehicle.healthScore >= filters.healthScore[0] && vehicle.healthScore <= filters.healthScore[1]
    );

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
      default:
        // Keep relevance order
        break;
    }

    setFilteredVehicles(filtered);
  }, [vehicles, filters, sortBy]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: "",
      make: "all",
      bodyType: "",
      fuelType: "all",
      transmission: "",
      yearFrom: "",
      yearTo: "",
      location: "",
      condition: "",
      minPrice: 0,
      maxPrice: 50000000,
      healthScore: [0, 100]
    });
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

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  const formatMileage = (mileage: number) => {
    return `${mileage.toLocaleString()} km`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-primary">Filters</h2>
                  <Button variant="outline" size="sm" onClick={clearAllFilters}>
                    Clear All
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Search</label>
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

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Price Range</label>
                    <Slider
                      value={[filters.minPrice, filters.maxPrice]}
                      onValueChange={([min, max]) => {
                        handleFilterChange("minPrice", min);
                        handleFilterChange("maxPrice", max);
                      }}
                      max={50000000}
                      step={100000}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Rs. {filters.minPrice.toLocaleString()}</span>
                      <span>Rs. {filters.maxPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Make */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Make</label>
                    <Select value={filters.make} onValueChange={(value) => handleFilterChange("make", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Makes</SelectItem>
                        <SelectItem value="toyota">Toyota</SelectItem>
                        <SelectItem value="honda">Honda</SelectItem>
                        <SelectItem value="nissan">Nissan</SelectItem>
                        <SelectItem value="bmw">BMW</SelectItem>
                        <SelectItem value="mercedes-benz">Mercedes-Benz</SelectItem>
                        <SelectItem value="audi">Audi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Fuel Type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Fuel Type</label>
                    <Select value={filters.fuelType} onValueChange={(value) => handleFilterChange("fuelType", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Fuel Types</SelectItem>
                        <SelectItem value="petrol">Petrol</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="City or area"
                        className="pl-10"
                        value={filters.location}
                        onChange={(e) => handleFilterChange("location", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Health Score */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">AI Health Score</label>
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
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Page Header - Hidden on Mobile */}
            <div className="mb-8 hidden md:block">
              <h1 className="text-3xl font-bold text-primary mb-2">Buy Premium Vehicles</h1>
              <p className="text-muted-foreground">
                Discover verified premium vehicles with AI health scoring and trusted sellers
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center space-x-4">
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Loading...</span>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {error ? 'Error loading vehicles' : `${filteredVehicles.length} vehicles found`}
                  </p>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="year-new">Year: Newest First</SelectItem>
                    <SelectItem value="mileage-low">Mileage: Low to High</SelectItem>
                    <SelectItem value="health-score">AI Health Score</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden lg:flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => !isMobile && setViewMode("grid")}
                    disabled={isMobile}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => !isMobile && setViewMode("list")}
                    disabled={isMobile}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading vehicles...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
              </div>
            ) : filteredVehicles.length === 0 ? (
              <div className="text-center py-12">
                <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No vehicles found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters to see more results</p>
                <Button onClick={clearAllFilters}>Clear Filters</Button>
              </div>
            ) : (
              <>
                {(viewMode === "grid" && !isMobile) ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredVehicles.map((vehicle) => (
                      <VehicleCard
                        key={vehicle.id}
                        vehicle={vehicle}
                        onSave={() => handleSave(vehicle.id)}
                        onCompare={() => handleAddToComparison(vehicle)}
                        isInComparison={comparisonList.some(v => v.id === vehicle.id)}
                        className="animate-fade-in"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredVehicles.map((vehicle) => (
                      <Card key={vehicle.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="flex p-3 gap-3">
                          {/* Image */}
                          <div className="w-24 h-20 sm:w-32 sm:h-24 flex-shrink-0 relative">
                            <img
                              src={vehicle.image}
                              alt={vehicle.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            {/* Health Score Badge */}
                            <div className="absolute -bottom-1 -right-1">
                              <HealthScoreBadge 
                                score={vehicle.healthScore} 
                                size="sm"
                                className="bg-background text-xs scale-75 sm:scale-100"
                              />
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0 flex flex-col">
                            {/* Title and Save Button */}
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-semibold text-sm sm:text-base line-clamp-2 pr-1 flex-1">
                                {vehicle.title}
                              </h3>
                              <Button variant="ghost" size="sm" onClick={() => handleSave(vehicle.id)} className="p-1 ml-1">
                                <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </div>
                            
                            {/* Price */}
                            <div className="mb-2">
                              <p className="text-lg sm:text-xl font-bold text-primary">
                                {formatPrice(vehicle.price)}
                              </p>
                            </div>
                            
                            {/* Vehicle Details - Mobile Optimized */}
                            <div className="flex flex-wrap gap-1 mb-2">
                              <Badge variant="secondary" className="text-xs px-1.5 py-0.5 h-5">{vehicle.year}</Badge>
                              <Badge variant="outline" className="text-xs px-1.5 py-0.5 h-5">{formatMileage(vehicle.mileage)}</Badge>
                              <Badge variant="outline" className="text-xs px-1.5 py-0.5 h-5">{vehicle.fuelType}</Badge>
                              {vehicle.isVerified && <Badge className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 h-5">✓</Badge>}
                            </div>
                            
                            {/* Bottom Row */}
                            <div className="flex items-center justify-between mt-auto">
                              <div className="flex flex-col space-y-0.5">
                                <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                                  <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                                  <span className="truncate">{vehicle.location}</span>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Star className="w-3 h-3 mr-1 text-yellow-500 flex-shrink-0" />
                                  <span>{vehicle.sellerRating}</span>
                                </div>
                              </div>
                              <div className="flex space-x-1 ml-2">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => handleAddToComparison(vehicle)}
                                  disabled={comparisonList.some(v => v.id === vehicle.id)}
                                  className="px-2 py-1 h-7 text-xs"
                                >
                                  <BarChart3 className="w-3 h-3" />
                                </Button>
                                <Button size="sm" onClick={() => handleContact(vehicle.id)} className="px-3 py-1 h-7 text-xs">
                                  Call
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
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
        onCompare={() => alert("Opening comparison view...")}
        onClear={() => setComparisonList([])}
      />
    </div>
  );
};

export default SearchPage;