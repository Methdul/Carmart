import { useState } from "react";
import { Search, Filter, MapPin, DollarSign, Calendar, Fuel, Settings, BarChart3, Grid3x3, List, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import VehicleCard from "@/components/VehicleCard";
import ComparisonBar from "@/components/ComparisonBar";
import vehicleSedan from "@/assets/vehicle-sedan.jpg";
import vehicleSuv from "@/assets/vehicle-suv.jpg";
import vehicleTruck from "@/assets/vehicle-truck.jpg";

interface ComparisonVehicle {
  id: string;
  title: string;
  price: number;
  image: string;
  healthScore: number;
}

const SearchPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [filters, setFilters] = useState({
    make: "",
    bodyType: "",
    fuelType: "",
    transmission: "",
    yearFrom: "",
    yearTo: "",
    location: "",
    condition: "",
    healthScore: [0, 100]
  });
  const [comparisonList, setComparisonList] = useState<ComparisonVehicle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  // Mock vehicle data
  const vehicles = [
    {
      id: "1",
      title: "BMW 3 Series 320i Sport Line",
      price: 12500000,
      year: 2020,
      mileage: 35000,
      location: "Colombo",
      fuelType: "Petrol",
      transmission: "Automatic",
      image: vehicleSedan,
      healthScore: 92,
      sellerRating: 4.8,
      isVerified: true,
      isFeatured: true
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
      image: vehicleSuv,
      healthScore: 88,
      sellerRating: 4.9,
      isVerified: true,
      isFeatured: true
    },
    {
      id: "3",
      title: "Ford Ranger Wildtrak 4x4",
      price: 18500000,
      year: 2022,
      mileage: 15000,
      location: "Galle",
      fuelType: "Diesel",
      transmission: "Manual",
      image: vehicleTruck,
      healthScore: 95,
      sellerRating: 4.7,
      isVerified: true,
      isFeatured: false
    },
    {
      id: "4",
      title: "Honda Civic RS Turbo",
      price: 8900000,
      year: 2019,
      mileage: 42000,
      location: "Colombo",
      fuelType: "Petrol",
      transmission: "CVT",
      image: vehicleSedan,
      healthScore: 85,
      sellerRating: 4.6,
      isVerified: true,
      isFeatured: false
    },
    {
      id: "5",
      title: "Mercedes-Benz C-Class C200",
      price: 16500000,
      year: 2021,
      mileage: 22000,
      location: "Negombo",
      fuelType: "Petrol",
      transmission: "Automatic",
      image: vehicleSedan,
      healthScore: 90,
      sellerRating: 4.8,
      isVerified: true,
      isFeatured: true
    },
    {
      id: "6",
      title: "Nissan X-Trail ST",
      price: 11200000,
      year: 2020,
      mileage: 38000,
      location: "Matara",
      fuelType: "Petrol",
      transmission: "CVT",
      image: vehicleSuv,
      healthScore: 82,
      sellerRating: 4.5,
      isVerified: false,
      isFeatured: false
    }
  ];

  const mockVehicleForComparison: Record<string, ComparisonVehicle> = {
    "1": { id: "1", title: "BMW 3 Series 320i Sport Line", price: 12500000, image: vehicleSedan, healthScore: 92 },
    "2": { id: "2", title: "Toyota RAV4 Hybrid AWD", price: 15800000, image: vehicleSuv, healthScore: 88 },
    "3": { id: "3", title: "Ford Ranger Wildtrak 4x4", price: 18500000, image: vehicleTruck, healthScore: 95 },
    "4": { id: "4", title: "Honda Civic RS Turbo", price: 8900000, image: vehicleSedan, healthScore: 85 },
    "5": { id: "5", title: "Mercedes-Benz C-Class C200", price: 16500000, image: vehicleSedan, healthScore: 90 },
    "6": { id: "6", title: "Nissan X-Trail ST", price: 11200000, image: vehicleSuv, healthScore: 82 }
  };

  const handleAddToComparison = (vehicleId: string) => {
    const vehicle = mockVehicleForComparison[vehicleId];
    if (vehicle && comparisonList.length < 4 && !comparisonList.find(v => v.id === vehicleId)) {
      setComparisonList([...comparisonList, vehicle]);
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
                  <Button variant="outline" size="sm">Clear All</Button>
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Price Range</label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={50000000}
                      step={100000}
                      className="mb-3"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>

                  {/* Make */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Make</label>
                    <Select onValueChange={(value) => setFilters({...filters, make: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any make" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="toyota">Toyota</SelectItem>
                        <SelectItem value="honda">Honda</SelectItem>
                        <SelectItem value="bmw">BMW</SelectItem>
                        <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                        <SelectItem value="nissan">Nissan</SelectItem>
                        <SelectItem value="ford">Ford</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Body Type */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Body Type</label>
                    <div className="space-y-2">
                      {["Sedan", "SUV", "Hatchback", "Coupe", "Truck", "Van"].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox id={type.toLowerCase()} />
                          <label htmlFor={type.toLowerCase()} className="text-sm">{type}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Year Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Year</label>
                    <div className="flex space-x-2">
                      <Select onValueChange={(value) => setFilters({...filters, yearFrom: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="From" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 30 }, (_, i) => 2024 - i).map(year => (
                            <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select onValueChange={(value) => setFilters({...filters, yearTo: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="To" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 30 }, (_, i) => 2024 - i).map(year => (
                            <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Fuel Type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Fuel Type</label>
                    <Select onValueChange={(value) => setFilters({...filters, fuelType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="petrol">Petrol</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                   {/* Transmission */}
                   <div>
                     <label className="text-sm font-medium mb-2 block">Transmission</label>
                     <Select onValueChange={(value) => setFilters({...filters, transmission: value})}>
                       <SelectTrigger>
                         <SelectValue placeholder="Any transmission" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="automatic">Automatic</SelectItem>
                         <SelectItem value="manual">Manual</SelectItem>
                         <SelectItem value="cvt">CVT</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>

                   {/* AI Health Score */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">AI Health Score</label>
                    <Slider
                      value={filters.healthScore}
                      onValueChange={(value) => setFilters({...filters, healthScore: value})}
                      max={100}
                      step={5}
                      className="mb-3"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{filters.healthScore[0]}</span>
                      <span>{filters.healthScore[1]}</span>
                    </div>
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
                        onChange={(e) => setFilters({...filters, location: e.target.value})}
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
                <p className="text-muted-foreground">{vehicles.length} vehicles found</p>
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

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery("")}>×</button>
                </Badge>
              )}
              {filters.make && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Make: {filters.make}
                  <button onClick={() => setFilters({...filters, make: ""})}>×</button>
                </Badge>
              )}
              {priceRange[0] > 0 || priceRange[1] < 50000000 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Price: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  <button onClick={() => setPriceRange([0, 50000000])}>×</button>
                </Badge>
              )}
            </div>

            {/* Vehicle Grid */}
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

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Vehicles
              </Button>
            </div>
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