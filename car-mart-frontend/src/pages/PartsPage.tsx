import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Search, Filter, MapPin, DollarSign, Calendar, Settings, Grid3x3, List, ArrowUpDown, Loader2, Heart, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileFilterPanel from "@/components/MobileFilterPanel";

interface Part {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string;
  brand: string;
  partCategory: string;
  condition: string;
  warranty: boolean;
  compatibility: string[];
  sellerRating: number;
  isVerified: boolean;
  inStock: boolean;
}

const PartsPage = () => {
  const { category } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [parts, setParts] = useState<Part[]>([]);
  const [filteredParts, setFilteredParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
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
  
  const [filters, setFilters] = useState({
    search: "",
    brand: "all",
    partCategory: "all",
    condition: "all",
    location: "",
    minPrice: 0,
    maxPrice: 100000,
    warranty: false,
    inStock: false
  });

  // Mock parts data - same structure as vehicles
  const mockParts: Part[] = [
    {
      id: "1",
      title: "Original Toyota Prius Hybrid Battery Pack",
      description: "Genuine Toyota hybrid battery with 2 year warranty. Fully tested and certified.",
      price: 85000,
      location: "Colombo 05",
      image: "/api/placeholder/400/300",
      brand: "Toyota",
      partCategory: "Battery",
      condition: "New",
      warranty: true,
      compatibility: ["Toyota Prius", "Toyota Aqua"],
      sellerRating: 4.9,
      isVerified: true,
      inStock: true
    },
    {
      id: "2",
      title: "BMW E90 Complete Headlight Assembly",
      description: "Angel eyes LED headlight set for BMW 3 Series E90. Perfect condition.",
      price: 45000,
      location: "Kandy",
      image: "/api/placeholder/400/300",
      brand: "BMW",
      partCategory: "Lighting",
      condition: "Used",
      warranty: false,
      compatibility: ["BMW E90", "BMW E91"],
      sellerRating: 4.7,
      isVerified: false,
      inStock: true
    },
    {
      id: "3",
      title: "Mercedes-Benz W205 Brake Pad Set",
      description: "High performance brake pads for Mercedes C-Class. Includes front and rear sets.",
      price: 25000,
      location: "Galle",
      image: "/api/placeholder/400/300",
      brand: "Mercedes-Benz",
      partCategory: "Brakes",
      condition: "New",
      warranty: true,
      compatibility: ["Mercedes W205"],
      sellerRating: 4.8,
      isVerified: true,
      inStock: false
    }
  ];

  // Load mock data
  useEffect(() => {
    const loadParts = async () => {
      setLoading(true);
      setError(null);
      
      setTimeout(() => {
        try {
          setParts(mockParts);
          setLoading(false);
        } catch (err) {
          setError("Failed to load parts");
          setLoading(false);
        }
      }, 800);
    };

    loadParts();
  }, []);

  // Filter and sort parts
  useEffect(() => {
    let filtered = [...parts];

    // Apply filters
    if (filters.search) {
      filtered = filtered.filter(part =>
        part.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        part.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
        part.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.brand && filters.brand !== "all") {
      filtered = filtered.filter(part => 
        part.brand.toLowerCase() === filters.brand.toLowerCase()
      );
    }

    if (filters.partCategory && filters.partCategory !== "all") {
      filtered = filtered.filter(part => 
        part.partCategory.toLowerCase() === filters.partCategory.toLowerCase()
      );
    }

    if (filters.condition && filters.condition !== "all") {
      filtered = filtered.filter(part => 
        part.condition.toLowerCase() === filters.condition.toLowerCase()
      );
    }

    if (filters.location) {
      filtered = filtered.filter(part => 
        part.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    filtered = filtered.filter(part => 
      part.price >= filters.minPrice && part.price <= filters.maxPrice
    );

    if (filters.warranty) {
      filtered = filtered.filter(part => part.warranty);
    }

    if (filters.inStock) {
      filtered = filtered.filter(part => part.inStock);
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.sellerRating - a.sellerRating);
        break;
      default:
        // Keep relevance order
        break;
    }

    setFilteredParts(filtered);
  }, [parts, filters, sortBy]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: "",
      brand: "all",
      partCategory: "all",
      condition: "all",
      location: "",
      minPrice: 0,
      maxPrice: 100000,
      warranty: false,
      inStock: false
    });
  };

  const handleSave = (id: string) => {
    console.log("Saved part:", id);
  };

  const handleContact = (id: string) => {
    console.log("Contact seller for part:", id);
  };

  const categoryTitle = category 
    ? category.charAt(0).toUpperCase() + category.slice(1) + " Parts"
    : "All Auto Parts";

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
                        placeholder="Part name, brand, or number"
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
                      max={100000}
                      step={1000}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Rs. {filters.minPrice.toLocaleString()}</span>
                      <span>Rs. {filters.maxPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Brand */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Brand</label>
                    <Select value={filters.brand} onValueChange={(value) => handleFilterChange("brand", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Brands</SelectItem>
                        <SelectItem value="toyota">Toyota</SelectItem>
                        <SelectItem value="honda">Honda</SelectItem>
                        <SelectItem value="nissan">Nissan</SelectItem>
                        <SelectItem value="bmw">BMW</SelectItem>
                        <SelectItem value="mercedes-benz">Mercedes-Benz</SelectItem>
                        <SelectItem value="audi">Audi</SelectItem>
                        <SelectItem value="bosch">Bosch</SelectItem>
                        <SelectItem value="denso">Denso</SelectItem>
                        <SelectItem value="ngk">NGK</SelectItem>
                        <SelectItem value="continental">Continental</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Part Category */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <Select value={filters.partCategory} onValueChange={(value) => handleFilterChange("partCategory", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="engine">Engine Parts</SelectItem>
                        <SelectItem value="brakes">Brake System</SelectItem>
                        <SelectItem value="suspension">Suspension</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="lighting">Lighting</SelectItem>
                        <SelectItem value="body">Body Parts</SelectItem>
                        <SelectItem value="interior">Interior</SelectItem>
                        <SelectItem value="tires">Tires & Wheels</SelectItem>
                        <SelectItem value="battery">Battery</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Condition */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Condition</label>
                    <Select value={filters.condition} onValueChange={(value) => handleFilterChange("condition", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Condition</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="used">Used - Good</SelectItem>
                        <SelectItem value="refurbished">Refurbished</SelectItem>
                        <SelectItem value="oem">OEM</SelectItem>
                        <SelectItem value="aftermarket">Aftermarket</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Vehicle Compatibility */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Vehicle Compatibility</label>
                    <Input
                      placeholder="e.g., Toyota Prius 2015-2020"
                      value={filters.location}
                      onChange={(e) => handleFilterChange("location", e.target.value)}
                    />
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

                  {/* Additional Filters */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="warranty"
                        checked={filters.warranty}
                        onChange={(e) => handleFilterChange("warranty", e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="warranty" className="text-sm">With Warranty</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="inStock"
                        checked={filters.inStock}
                        onChange={(e) => handleFilterChange("inStock", e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="inStock" className="text-sm">In Stock Only</label>
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
              <h1 className="text-3xl font-bold text-primary mb-2">{categoryTitle}</h1>
              <p className="text-muted-foreground">
                Find genuine and aftermarket automotive parts from verified sellers
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
                    {error ? 'Error loading parts' : `${filteredParts.length} parts found`}
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
                    <SelectItem value="rating">Seller Rating</SelectItem>
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
                <span className="ml-2">Loading parts...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
              </div>
            ) : filteredParts.length === 0 ? (
              <div className="text-center py-12">
                <Wrench className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No parts found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters to see more results</p>
                <Button onClick={clearAllFilters}>Clear Filters</Button>
              </div>
            ) : (
              <>
                {(viewMode === "grid" && !isMobile) ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredParts.map((part) => (
                      <Card key={part.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div>
                          <img
                            src={part.image}
                            alt={part.title}
                            className="w-full h-48 object-cover"
                          />
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-lg line-clamp-2">{part.title}</h3>
                              <Button variant="ghost" size="sm" onClick={() => handleSave(part.id)}>
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {part.description}
                            </p>
                            
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="secondary">{part.brand}</Badge>
                              <Badge variant="outline">{part.partCategory}</Badge>
                              <Badge variant={part.condition === "New" ? "default" : "secondary"}>
                                {part.condition}
                              </Badge>
                              {part.warranty && <Badge className="bg-green-100 text-green-800">Warranty</Badge>}
                              {part.isVerified && <Badge className="bg-blue-100 text-blue-800">✓ Verified</Badge>}
                            </div>
                            
                            <div className="flex items-center justify-between mb-3">
                              <div className="space-y-1">
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {part.location}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <span className="text-yellow-500">★</span>
                                  <span className="ml-1">{part.sellerRating} seller rating</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-primary">
                                  Rs. {part.price.toLocaleString()}
                                </p>
                                <p className={`text-sm ${part.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                  {part.inStock ? 'In Stock' : 'Out of Stock'}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button className="flex-1" onClick={() => handleContact(part.id)}>
                                Contact Seller
                              </Button>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredParts.map((part) => (
                      <Card key={part.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="flex p-3 gap-3">
                          {/* Image */}
                          <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                            <img
                              src={part.image}
                              alt={part.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0 flex flex-col">
                            {/* Title and Save Button */}
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-semibold text-sm sm:text-base line-clamp-2 pr-1 flex-1">
                                {part.title}
                              </h3>
                              <Button variant="ghost" size="sm" onClick={() => handleSave(part.id)} className="p-1 ml-1">
                                <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </div>
                            
                            {/* Price */}
                            <div className="mb-2">
                              <p className="text-lg sm:text-xl font-bold text-primary">
                                Rs. {part.price.toLocaleString()}
                              </p>
                            </div>
                            
                            {/* Part Details - Mobile Optimized */}
                            <div className="flex flex-wrap gap-1 mb-2">
                              <Badge variant="secondary" className="text-xs px-1.5 py-0.5 h-5">{part.brand}</Badge>
                              <Badge variant="outline" className="text-xs px-1.5 py-0.5 h-5">{part.condition}</Badge>
                              {part.warranty && <Badge className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5 h-5">Warranty</Badge>}
                              {part.isVerified && <Badge className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 h-5">✓</Badge>}
                            </div>
                            
                            {/* Bottom Row */}
                            <div className="flex items-center justify-between mt-auto">
                              <div className="flex flex-col space-y-0.5">
                                <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                                  <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                                  <span className="truncate">{part.location}</span>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <span className="text-yellow-500">★</span>
                                  <span className="ml-1">{part.sellerRating}</span>
                                  <span className={`ml-2 ${part.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                    {part.inStock ? 'In Stock' : 'Out of Stock'}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-2">
                                <Button size="sm" onClick={() => handleContact(part.id)} className="px-3 py-1 h-7 text-xs">
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
        resultCount={filteredParts.length}
        category="parts"
      />

      <Footer />
    </div>
  );
};

export default PartsPage;