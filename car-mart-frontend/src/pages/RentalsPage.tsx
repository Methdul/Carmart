// car-mart-frontend/src/pages/RentalsPage.tsx
// ✅ FINAL VERSION - Using VehicleCard & Real Database Data

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, Filter, Grid3x3, List, ArrowUpDown, Loader2, Car, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileFilterPanel from "@/components/MobileFilterPanel";
import VehicleCard from "@/components/VehicleCard"; // ✅ USING VEHICLECARD FOR CONSISTENCY
import { apiService } from "@/services/api";

interface Rental {
  id: string;
  title: string;
  description: string;
  make: string;
  model: string;
  year: number;
  daily_rate: number;
  weekly_rate?: number;
  monthly_rate?: number;
  location: string;
  fuel_type: string;
  transmission: string;
  body_type: string;
  seats: number;
  doors: number;
  color: string;
  mileage: number;
  condition: string;
  rental_type: string;
  minimum_rental_days: number;
  maximum_rental_days: number;
  security_deposit: number;
  features: string[];
  included_items: string[];
  pickup_locations: string[];
  delivery_available: boolean;
  delivery_fee: number;
  insurance_included: boolean;
  images?: string[];
  is_featured: boolean;
  is_verified: boolean;
  views_count: number;
  favorites_count: number;
  booking_count: number;
  average_rating: number;
  total_reviews: number;
  available_from: string;
  available_until?: string;
  created_at: string;
  users?: {
    first_name: string;
    last_name: string;
    phone: string;
    is_verified: boolean;
  };
}

// ✅ TRANSFORM RENTAL TO VEHICLECARD FORMAT
const transformRentalToVehicleCard = (rental: Rental) => {
  // Calculate health score based on condition, booking count, and rating
  const getHealthScore = () => {
    let score = 75; // Base score
    
    // Condition bonus
    if (rental.condition === 'Excellent') score += 20;
    else if (rental.condition === 'Good') score += 10;
    else if (rental.condition === 'Fair') score += 0;
    else score -= 10;
    
    // Booking history bonus (popular rentals)
    if (rental.booking_count > 20) score += 10;
    else if (rental.booking_count > 10) score += 5;
    
    // Rating bonus
    if (rental.average_rating >= 4.5) score += 10;
    else if (rental.average_rating >= 4.0) score += 5;
    
    return Math.min(Math.max(score, 0), 100); // Keep between 0-100
  };

  return {
    id: rental.id,
    title: `${rental.year} ${rental.make} ${rental.model} - Rental`,
    price: rental.daily_rate, // Use daily rate as main price
    year: rental.year,
    mileage: rental.mileage,
    location: rental.location,
    fuelType: rental.fuel_type,
    transmission: rental.transmission,
    image: rental.images && rental.images.length > 0 
      ? rental.images[0] 
      : '/api/placeholder/400/300',
    healthScore: getHealthScore(),
    sellerRating: rental.average_rating || 0,
    isVerified: rental.is_verified,
    isFeatured: rental.is_featured,
  };
};

const RentalsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [filteredRentals, setFilteredRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Check if mobile and set default view mode
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const [filters, setFilters] = useState({
    search: "",
    make: "all",
    bodyType: "any",
    fuelType: "any",
    transmission: "any",
    location: "",
    minPrice: 0,
    maxPrice: 20000,
    seats: 0,
    rentalType: "any",
    deliveryAvailable: false,
    insuranceIncluded: false,
  });

  // ✅ LOAD REAL DATA FROM API (NO MOCK DATA)
  useEffect(() => {
    const loadRentals = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🚗 Loading rentals from database via API...');
        
        const response = await apiService.getRentals();
        
        if (response.success && response.data) {
          console.log(`✅ Loaded ${response.data.length} rentals from database`);
          setRentals(response.data);
          setFilteredRentals(response.data);
        } else {
          throw new Error(response.message || 'Failed to load rentals from database');
        }
        
      } catch (err: any) {
        console.error("❌ Error loading rentals from database:", err);
        setError(err.message || 'Failed to connect to database');setRentals([]);
        setFilteredRentals([]);
      } finally {
        setLoading(false);
      }
    };

    loadRentals();
  }, []);

  // ✅ FILTER AND SORT RENTALS
  useEffect(() => {
    let filtered = [...rentals];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(rental =>
        rental.title.toLowerCase().includes(searchTerm) ||
        rental.make.toLowerCase().includes(searchTerm) ||
        rental.model.toLowerCase().includes(searchTerm) ||
        rental.location.toLowerCase().includes(searchTerm) ||
        rental.description.toLowerCase().includes(searchTerm)
      );
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(rental =>
        rental.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply make filter
    if (filters.make && filters.make !== "all") {
      filtered = filtered.filter(rental =>
        rental.make.toLowerCase() === filters.make.toLowerCase()
      );
    }

    // Apply body type filter
    if (filters.bodyType && filters.bodyType !== "any") {
      filtered = filtered.filter(rental =>
        rental.body_type.toLowerCase() === filters.bodyType.toLowerCase()
      );
    }

    // Apply fuel type filter
    if (filters.fuelType && filters.fuelType !== "any") {
      filtered = filtered.filter(rental =>
        rental.fuel_type.toLowerCase() === filters.fuelType.toLowerCase()
      );
    }

    // Apply transmission filter
    if (filters.transmission && filters.transmission !== "any") {
      filtered = filtered.filter(rental =>
        rental.transmission.toLowerCase() === filters.transmission.toLowerCase()
      );
    }

    // Apply seats filter
    if (filters.seats > 0) {
      filtered = filtered.filter(rental => rental.seats >= filters.seats);
    }

    // Apply rental type filter
    if (filters.rentalType && filters.rentalType !== "any") {
      filtered = filtered.filter(rental =>
        rental.rental_type === filters.rentalType
      );
    }

    // Apply delivery filter
    if (filters.deliveryAvailable) {
      filtered = filtered.filter(rental => rental.delivery_available);
    }

    // Apply insurance filter
    if (filters.insuranceIncluded) {
      filtered = filtered.filter(rental => rental.insurance_included);
    }

    // Apply price filter (daily rate)
    filtered = filtered.filter(rental =>
      rental.daily_rate >= filters.minPrice && rental.daily_rate <= filters.maxPrice
    );

    // ✅ APPLY SORTING
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.daily_rate - b.daily_rate);
        break;
      case "price-high":
        filtered.sort((a, b) => b.daily_rate - a.daily_rate);
        break;
      case "rating":
        filtered.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
        break;
      case "make":
        filtered.sort((a, b) => a.make.localeCompare(b.make));
        break;
      case "bookings":
        filtered.sort((a, b) => b.booking_count - a.booking_count);
        break;
      default:
        // Relevance: Featured first, then verified, then by rating
        filtered.sort((a, b) => {
          if (a.is_featured && !b.is_featured) return -1;
          if (!a.is_featured && b.is_featured) return 1;
          if (a.is_verified && !b.is_verified) return -1;
          if (!a.is_verified && b.is_verified) return 1;
          return (b.average_rating || 0) - (a.average_rating || 0);
        });
        break;
    }

    setFilteredRentals(filtered);
  }, [rentals, filters, sortBy]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // ✅ HANDLE FILTER APPLICATION WITH API INTEGRATION
  const handleApplyFilters = async (newFilters: any) => {
    console.log("🔧 Applying rental filters:", newFilters);
    
    try {
      setLoading(true);
      
      // Create API-compatible filter object
      const apiFilters: any = {};
      
      if (newFilters.search) apiFilters.search = newFilters.search;
      if (newFilters.location) apiFilters.location = newFilters.location;
      if (newFilters.make && newFilters.make !== "all") apiFilters.make = newFilters.make;
      if (newFilters.bodyType && newFilters.bodyType !== "any") apiFilters.bodyType = newFilters.bodyType;
      if (newFilters.fuelType && newFilters.fuelType !== "any") apiFilters.fuelType = newFilters.fuelType;
      if (newFilters.transmission && newFilters.transmission !== "any") apiFilters.transmission = newFilters.transmission;
      if (newFilters.rentalType && newFilters.rentalType !== "any") apiFilters.rentalType = newFilters.rentalType;
      if (newFilters.minPrice !== undefined) apiFilters.minPrice = newFilters.minPrice;
      if (newFilters.maxPrice !== undefined) apiFilters.maxPrice = newFilters.maxPrice;
      if (newFilters.seats > 0) apiFilters.seats = newFilters.seats;
      if (newFilters.deliveryAvailable) apiFilters.deliveryAvailable = true;
      if (newFilters.insuranceIncluded) apiFilters.insuranceIncluded = true;

      // Try to fetch filtered results from API
      try {
        const response = await apiService.getRentals(apiFilters);
        if (response.success && response.data) {
          console.log(`✅ API filter returned ${response.data.length} rentals`);
          setRentals(response.data);
          setFilteredRentals(response.data);
        }
      } catch (apiError) {
        console.log('🔄 API filter failed, using client-side filtering');
      }
      
      // Update local filter state
      const updatedFilters = { ...filters };
      
      if (newFilters.search !== undefined) updatedFilters.search = newFilters.search;
      if (newFilters.make !== undefined) updatedFilters.make = newFilters.make === "" ? "all" : newFilters.make;
      if (newFilters.bodyType !== undefined) updatedFilters.bodyType = newFilters.bodyType === "" ? "any" : newFilters.bodyType;
      if (newFilters.fuelType !== undefined) updatedFilters.fuelType = newFilters.fuelType === "" ? "any" : newFilters.fuelType;
      if (newFilters.transmission !== undefined) updatedFilters.transmission = newFilters.transmission === "" ? "any" : newFilters.transmission;
      if (newFilters.location !== undefined) updatedFilters.location = newFilters.location;
      if (newFilters.minPrice !== undefined) updatedFilters.minPrice = typeof newFilters.minPrice === 'number' ? newFilters.minPrice : parseInt(newFilters.minPrice) || 0;
      if (newFilters.maxPrice !== undefined) updatedFilters.maxPrice = typeof newFilters.maxPrice === 'number' ? newFilters.maxPrice : parseInt(newFilters.maxPrice) || 20000;
      if (newFilters.seats !== undefined) updatedFilters.seats = typeof newFilters.seats === 'number' ? newFilters.seats : parseInt(newFilters.seats) || 0;
      if (newFilters.rentalType !== undefined) updatedFilters.rentalType = newFilters.rentalType === "" ? "any" : newFilters.rentalType;
      if (newFilters.deliveryAvailable !== undefined) updatedFilters.deliveryAvailable = Boolean(newFilters.deliveryAvailable);
      if (newFilters.insuranceIncluded !== undefined) updatedFilters.insuranceIncluded = Boolean(newFilters.insuranceIncluded);

      console.log("✅ Updated rental filters:", updatedFilters);
      setFilters(updatedFilters);
      
    } catch (error) {
      console.error("❌ Filter application error:", error);
      setError("Failed to apply filters");
    } finally {
      setLoading(false);
      setFiltersOpen(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const uniqueMakes = [...new Set(rentals.map(r => r.make))].sort();
  const uniqueBodyTypes = [...new Set(rentals.map(r => r.body_type))].sort();
  const uniqueFuelTypes = [...new Set(rentals.map(r => r.fuel_type))].sort();

  // Handle save/compare actions
  const handleSaveRental = (rentalId: string) => {
    console.log('Save rental:', rentalId);
    // Implement save functionality
  };

  const handleCompareRental = (rentalId: string) => {
    console.log('Compare rental:', rentalId);
    // Implement compare functionality
  };

  // Individual rental detail view
  if (id) {
    useEffect(() => {
      navigate('/rentals');
    }, [id, navigate]);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* ✅ DESKTOP SIDEBAR FILTERS (Same pattern as other pages) */}
          <div className="hidden lg:block w-80">
            <div className="sticky top-24">
              <Card>
                <div className="p-6 space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-primary">Rental Filters</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setFilters({
                        search: "",
                        make: "all",
                        bodyType: "any",
                        fuelType: "any",
                        transmission: "any",
                        location: "",
                        minPrice: 0,
                        maxPrice: 20000,
                        seats: 0,
                        rentalType: "any",
                        deliveryAvailable: false,
                        insuranceIncluded: false,
                      })}
                    >
                      Clear All
                    </Button>
                  </div>

                  {/* Search */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-primary">Search</h4>
                    <Input
                      placeholder="Search rentals..."
                      value={filters.search}
                      onChange={(e) => handleFilterChange("search", e.target.value)}
                    />
                    <Input
                      placeholder="Location..."
                      value={filters.location}
                      onChange={(e) => handleFilterChange("location", e.target.value)}
                    />
                  </div>

                  {/* Price Range */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-primary">Daily Rate (LKR)</h4>
                    <Slider
                      min={0}
                      max={20000}
                      step={500}
                      value={[filters.minPrice, filters.maxPrice]}
                      onValueChange={(values) => {
                        setFilters(prev => ({ 
                          ...prev, 
                          minPrice: values[0], 
                          maxPrice: values[1] 
                        }));
                      }}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{formatPrice(filters.minPrice)}</span>
                      <span>{formatPrice(filters.maxPrice)}</span>
                    </div>
                  </div>

                  {/* Make */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-primary">Make</h4>
                    <Select value={filters.make} onValueChange={(value) => handleFilterChange("make", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select make" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Makes</SelectItem>
                        {uniqueMakes.map(make => (
                          <SelectItem key={make} value={make}>{make}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Body Type */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-primary">Body Type</h4>
                    <Select value={filters.bodyType} onValueChange={(value) => handleFilterChange("bodyType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select body type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Body Type</SelectItem>
                        {uniqueBodyTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Fuel Type */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-primary">Fuel Type</h4>
                    <Select value={filters.fuelType} onValueChange={(value) => handleFilterChange("fuelType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Fuel Type</SelectItem>
                        {uniqueFuelTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-primary">Features</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="deliveryAvailable"
                          checked={filters.deliveryAvailable}
                          onChange={(e) => handleFilterChange("deliveryAvailable", e.target.checked)}
                          className="rounded"
                        />
                        <label htmlFor="deliveryAvailable" className="text-sm">Delivery Available</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="insuranceIncluded"
                          checked={filters.insuranceIncluded}
                          onChange={(e) => handleFilterChange("insuranceIncluded", e.target.checked)}
                          className="rounded"
                        />
                        <label htmlFor="insuranceIncluded" className="text-sm">Insurance Included</label>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* ✅ MAIN CONTENT */}
          <div className="flex-1">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-primary">Car Rentals</h1>
                <p className="text-muted-foreground">
                  {loading ? 'Loading...' : `${filteredRentals.length} rental${filteredRentals.length !== 1 ? 's' : ''} available`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* View Mode Toggle */}
                {!isMobile && (
                  <div className="flex bg-muted rounded-lg p-1">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="px-3"
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="px-3"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="bookings">Most Popular</SelectItem>
                    <SelectItem value="make">Make (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error}. Please check your connection and try again.
                </AlertDescription>
              </Alert>
            )}

            {/* ✅ RESULTS USING VEHICLECARD */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mr-3" />
                <span>Loading rentals from database...</span>
              </div>
            ) : (
              <>
                {filteredRentals.length === 0 ? (
                  <div className="text-center py-12">
                    <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No rentals found</h3>
                    <p className="text-muted-foreground mb-4">
                      {rentals.length === 0 
                        ? "No rental data available in database"
                        : "Try adjusting your filters or search terms"
                      }
                    </p>
                    <Button onClick={() => window.location.reload()}>
                      Refresh Page
                    </Button>
                  </div>
                ) : (
                  <div className={
                    viewMode === "grid" 
                      ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "grid grid-cols-1 lg:grid-cols-2 gap-6"
                  }>
                    {filteredRentals.map((rental) => (
                      <VehicleCard
                        key={rental.id}
                        vehicle={transformRentalToVehicleCard(rental)}
                        onSave={handleSaveRental}
                        onCompare={handleCompareRental}
                        className="h-full" // Ensure consistent height
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ✅ MOBILE FILTER BUTTON */}
      <div className="lg:hidden fixed bottom-4 left-4 z-40">
        <Button
          onClick={() => setFiltersOpen(true)}
          className="bg-primary text-white p-3 rounded-full shadow-lg flex items-center space-x-2"
        >
          <Filter className="w-5 h-5" />
          <span className="text-sm font-medium">Filters</span>
        </Button>
      </div>

      {/* ✅ MOBILE FILTER PANEL */}
      <MobileFilterPanel
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onApplyFilters={handleApplyFilters}
        resultCount={filteredRentals.length}
        category="rentals"
      />

      <Footer />
    </div>
  );
};

export default RentalsPage;