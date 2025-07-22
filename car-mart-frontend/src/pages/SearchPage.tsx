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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comparisonList, setComparisonList] = useState<ComparisonVehicle[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  
  const [filters, setFilters] = useState<Filters>({
    search: "",
    make: "",
    bodyType: "",
    fuelType: "",
    transmission: "",
    yearFrom: "",
    yearTo: "",
    location: "",
    condition: "",
    minPrice: 0,
    maxPrice: 50000000,
    healthScore: [0, 100]
  });

  // Fetch vehicles when filters change
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Build filter object for API
        const apiFilters: any = {};
        
        if (filters.search) apiFilters.search = filters.search;
        if (filters.make) apiFilters.make = filters.make;
        if (filters.location) apiFilters.location = filters.location;
        if (filters.fuelType) apiFilters.fuelType = filters.fuelType;
        if (filters.minPrice > 0) apiFilters.minPrice = filters.minPrice;
        if (filters.maxPrice < 50000000) apiFilters.maxPrice = filters.maxPrice;
        
        const response = await apiService.getVehicles(apiFilters);
        
        if (response.success) {
          setVehicles(response.data);
        } else {
          throw new Error(response.message || 'Failed to fetch vehicles');
        }
      } catch (err) {
        console.error('Error fetching vehicles:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch vehicles');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [filters]);

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
      make: "",
      bodyType: "",
      fuelType: "",
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
                    <Select value={filters.make} onValueChange={(value) => handleFilterChange("make", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any make" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Make</SelectItem>
                        <SelectItem value="toyota">Toyota</SelectItem>
                        <SelectItem value="honda">Honda</SelectItem>
                        <SelectItem value="bmw">BMW</SelectItem>
                        <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                        <SelectItem value="nissan">Nissan</SelectItem>
                        <SelectItem value="ford">Ford</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Fuel Type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Fuel Type</label>
                    <Select value={filters.fuelType} onValueChange={(value) => handleFilterChange("fuelType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Fuel Type</SelectItem>
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
                  {loading ? 'Loading...' : `${vehicles.length} vehicles found`}
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
            {!loading && !error && vehicles.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No vehicles found matching your criteria</p>
                <Button onClick={clearAllFilters}>
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Vehicle Grid */}
            {!loading && !error && vehicles.length > 0 && (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"}>
                {vehicles.map((vehicle) => (
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
            {!loading && !error && vehicles.length > 0 && (
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