import { useState, useEffect } from "react";
import { Search, Filter, MapPin, DollarSign, Calendar, Fuel, Settings, BarChart3, Grid3x3, List, ArrowUpDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import VehicleCard from "@/components/VehicleCard";
import ComparisonBar from "@/components/ComparisonBar";
import { apiService } from "@/services/api";

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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comparisonList, setComparisonList] = useState<ComparisonVehicle[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  
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

  // Mock vehicle data - Replace with your preferred vehicles
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
      title: "Honda Civic RS Turbo",
      price: 8900000,
      year: 2018,
      mileage: 45000,
      location: "Galle",
      fuelType: "Petrol",
      transmission: "Manual",
      image: "/api/placeholder/400/300",
      healthScore: 85,
      sellerRating: 4.6,
      isVerified: true,
      isFeatured: false,
      make: "Honda",
      model: "Civic",
      bodyType: "Sedan",
      condition: "Good",
      engineCapacity: "1498cc",
      color: "Rallye Red"
    },
    {
      id: "4",
      title: "Toyota Prius Hybrid G",
      price: 6800000,
      year: 2017,
      mileage: 52000,
      location: "Colombo",
      fuelType: "Hybrid",
      transmission: "CVT",
      image: "/api/placeholder/400/300",
      healthScore: 84,
      sellerRating: 4.6,
      isVerified: true,
      isFeatured: false,
      make: "Toyota",
      model: "Prius",
      bodyType: "Sedan",
      condition: "Good",
      engineCapacity: "1797cc",
      color: "Silver"
    },
    {
      id: "5",
      title: "Suzuki Alto K10",
      price: 2850000,
      year: 2016,
      mileage: 48000,
      location: "Kandy",
      fuelType: "Petrol",
      transmission: "Manual",
      image: "/api/placeholder/400/300",
      healthScore: 78,
      sellerRating: 4.3,
      isVerified: false,
      isFeatured: false,
      make: "Suzuki",
      model: "Alto",
      bodyType: "Hatchback",
      condition: "Fair",
      engineCapacity: "998cc",
      color: "White"
    },
    {
      id: "6",
      title: "Mercedes-Benz C-Class C200",
      price: 18500000,
      year: 2019,
      mileage: 40000,
      location: "Colombo",
      fuelType: "Petrol",
      transmission: "Automatic",
      image: "/api/placeholder/400/300",
      healthScore: 90,
      sellerRating: 4.7,
      isVerified: true,
      isFeatured: true,
      make: "Mercedes-Benz",
      model: "C-Class",
      bodyType: "Sedan",
      condition: "Excellent",
      engineCapacity: "1991cc",
      color: "Obsidian Black"
    },
    {
      id: "7",
      title: "Honda Vezel Hybrid Z",
      price: 11800000,
      year: 2018,
      mileage: 42000,
      location: "Negombo",
      fuelType: "Hybrid",
      transmission: "CVT",
      image: "/api/placeholder/400/300",
      healthScore: 87,
      sellerRating: 4.7,
      isVerified: true,
      isFeatured: true,
      make: "Honda",
      model: "Vezel",
      bodyType: "SUV",
      condition: "Excellent",
      engineCapacity: "1496cc",
      color: "Pearl White"
    },
    {
      id: "8",
      title: "Nissan Leaf Electric",
      price: 9500000,
      year: 2017,
      mileage: 35000,
      location: "Kurunegala",
      fuelType: "Electric",
      transmission: "Automatic",
      image: "/api/placeholder/400/300",
      healthScore: 89,
      sellerRating: 4.5,
      isVerified: true,
      isFeatured: false,
      make: "Nissan",
      model: "Leaf",
      bodyType: "Hatchback",
      condition: "Good",
      engineCapacity: "Electric",
      color: "Blue"
    },
    {
      id: "9",
      title: "Toyota Hiace Super GL",
      price: 7800000,
      year: 2016,
      mileage: 89000,
      location: "Matara",
      fuelType: "Diesel",
      transmission: "Manual",
      image: "/api/placeholder/400/300",
      healthScore: 82,
      sellerRating: 4.4,
      isVerified: true,
      isFeatured: false,
      make: "Toyota",
      model: "Hiace",
      bodyType: "Van",
      condition: "Good",
      engineCapacity: "2982cc",
      color: "White"
    },
    {
      id: "10",
      title: "Ford Ranger Wildtrak 4x4",
      price: 16800000,
      year: 2020,
      mileage: 35000,
      location: "Gampaha",
      fuelType: "Diesel",
      transmission: "Manual",
      image: "/api/placeholder/400/300",
      healthScore: 91,
      sellerRating: 4.8,
      isVerified: true,
      isFeatured: true,
      make: "Ford",
      model: "Ranger",
      bodyType: "Pickup",
      condition: "Excellent",
      engineCapacity: "3198cc",
      color: "Lightning Blue"
    },
    {
      id: "11",
      title: "Suzuki Wagon R Stingray",
      price: 3200000,
      year: 2017,
      mileage: 45000,
      location: "Kandy",
      fuelType: "Petrol",
      transmission: "CVT",
      image: "/api/placeholder/400/300",
      healthScore: 80,
      sellerRating: 4.3,
      isVerified: false,
      isFeatured: false,
      make: "Suzuki",
      model: "Wagon R",
      bodyType: "Hatchback",
      condition: "Good",
      engineCapacity: "658cc",
      color: "Silver"
    },
    {
      id: "12",
      title: "BMW X3 xDrive20d",
      price: 24500000,
      year: 2019,
      mileage: 35000,
      location: "Galle",
      fuelType: "Diesel",
      transmission: "Automatic",
      image: "/api/placeholder/400/300",
      healthScore: 93,
      sellerRating: 4.9,
      isVerified: true,
      isFeatured: true,
      make: "BMW",
      model: "X3",
      bodyType: "SUV",
      condition: "Excellent",
      engineCapacity: "1995cc",
      color: "Space Grey"
    }
  ];

  // Load mock data on component mount
  useEffect(() => {
    const loadVehicles = async () => {
      setLoading(true);
      setError(null);
      
      // Simulate API delay for realistic experience
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

  // Filter and sort vehicles when filters or sortBy changes
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

    // Price filter
    filtered = filtered.filter(vehicle => 
      vehicle.price >= filters.minPrice && vehicle.price <= filters.maxPrice
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
        // relevance - featured first, then by health score
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.healthScore - a.healthScore;
        });
    }

    setFilteredVehicles(filtered);
  }, [vehicles, filters, sortBy]);

  const handleFilterChange = (key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleAddToComparison = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle && comparisonList.length < 4 && !comparisonList.find(v => v.id === vehicleId)) {
      const comparisonVehicle: ComparisonVehicle = {
        id: vehicle.id,
        title: vehicle.title,
        price: vehicle.price,
        image: vehicle.image,
        healthScore: vehicle.healthScore
      };
      setComparisonList([...comparisonList, comparisonVehicle]);
    }
  };

  const handleRemoveFromComparison = (vehicleId: string) => {
    setComparisonList(comparisonList.filter(v => v.id !== vehicleId));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('LKR', 'Rs.');
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
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
                      onValueChange={(value) => {
                        handleFilterChange("minPrice", value[0]);
                        handleFilterChange("maxPrice", value[1]);
                      }}
                      max={50000000}
                      step={100000}
                      className="mb-3"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{formatPrice(filters.minPrice)}</span>
                      <span>{formatPrice(filters.maxPrice)}</span>
                    </div>
                  </div>

                  {/* Make */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Make</label>
                    <Select value={filters.make} onValueChange={(value) => handleFilterChange("make", value)} defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Any make" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Make</SelectItem>
                        <SelectItem value="Toyota">Toyota</SelectItem>
                        <SelectItem value="Honda">Honda</SelectItem>
                        <SelectItem value="BMW">BMW</SelectItem>
                        <SelectItem value="Mercedes-Benz">Mercedes-Benz</SelectItem>
                        <SelectItem value="Nissan">Nissan</SelectItem>
                        <SelectItem value="Ford">Ford</SelectItem>
                        <SelectItem value="Suzuki">Suzuki</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Fuel Type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Fuel Type</label>
                    <Select value={filters.fuelType} onValueChange={(value) => handleFilterChange("fuelType", value)} defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Any fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Fuel Type</SelectItem>
                        <SelectItem value="Petrol">Petrol</SelectItem>
                        <SelectItem value="Diesel">Diesel</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        <SelectItem value="Electric">Electric</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="City or district"
                        className="pl-10"
                        value={filters.location}
                        onChange={(e) => handleFilterChange("location", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-primary">Search Results</h1>
                <p className="text-muted-foreground">
                  {loading ? 'Loading...' : `${filteredVehicles.length} vehicles found`}
                </p>
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

                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-16">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                  <p className="text-muted-foreground">Searching vehicles...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-16">
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-destructive mb-4">Failed to load vehicles</p>
                  <p className="text-sm text-muted-foreground mb-4">{error}</p>
                  <Button onClick={() => window.location.reload()}>
                    Try Again
                  </Button>
                </div>
              </div>
            )}

            {/* No Results */}
            {!loading && !error && filteredVehicles.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No vehicles found matching your criteria</p>
                <Button onClick={clearAllFilters}>
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Vehicle Grid */}
            {!loading && !error && filteredVehicles.length > 0 && (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"}>
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onSave={(id) => console.log("Saved vehicle:", id)}
                    onCompare={handleAddToComparison}
                    isInComparison={comparisonList.some(v => v.id === vehicle.id)}
                    className="animate-fade-in"
                  />
                ))}
              </div>
            )}

            {/* Load More */}
            {!loading && !error && filteredVehicles.length > 0 && (
              <div className="text-center mt-12">
                <Button size="lg">
                  Load More Vehicles
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

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