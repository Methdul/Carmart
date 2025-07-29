import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, Filter, MapPin, DollarSign, Calendar, Settings, Grid3x3, List, ArrowUpDown, Loader2, Heart, Wrench, Star, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileFilterPanel from "@/components/MobileFilterPanel";
import { apiService } from "@/services/api";

interface Part {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  brand: string;
  category: string;                    // ← Changed from partCategory
  condition: string;
  warranty_period: string | null;      // ← Changed from warranty: boolean
  compatibility: string[];
  rating_average?: number;             // ← Changed from sellerRating
  reviews_count?: number;              // ← Added from API
  is_oem: boolean;                     // ← Added from API
  is_featured: boolean;                // ← Added from API
  stock_quantity?: number;   
  users?: {                           // ← Added from API
    first_name: string;
    last_name: string;
    is_verified: boolean;
  };
}

const PartsPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [parts, setParts] = useState<Part[]>([]);
  const [filteredParts, setFilteredParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
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



  // Load mock data
  useEffect(() => {
    const loadParts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await apiService.getParts();
        if (response.success) {
          setParts(response.data);
        } else {
          setError('Failed to load parts');
        }
      } catch (err) {
        setError("Failed to load parts");
      } finally {
        setLoading(false);
      }
    };

    loadParts();
  }, []);

  // Enhanced filter logic
  useEffect(() => {
    let filtered = [...parts];

    // Apply filters
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(part =>
        part.title.toLowerCase().includes(searchTerm) ||
        part.description.toLowerCase().includes(searchTerm) ||
        part.brand.toLowerCase().includes(searchTerm) ||
        part.category.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.brand && filters.brand !== "all") {
      filtered = filtered.filter(part => 
        part.brand.toLowerCase() === filters.brand.toLowerCase()
      );
    }

    if (filters.partCategory && filters.partCategory !== "all") {
      filtered = filtered.filter(part => 
        part.category.toLowerCase() === filters.partCategory.toLowerCase()
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
      filtered = filtered.filter(part => part.warranty_period !== null);
    }

    if (filters.inStock) {
      filtered = filtered.filter(part => true); // Simplified - API doesn't have stock data
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
        filtered.sort((a, b) => (b.rating_average || 0) - (a.rating_average || 0));
        break;
      case "brand":
        filtered.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      default:
        // Keep relevance order, prioritize verified sellers
        filtered.sort((a, b) => {
          if (a.users?.is_verified && !b.users?.is_verified) return -1;
          if (!a.users?.is_verified && b.users?.is_verified) return 1;
          return 0;
        });
        break;
    }

    setFilteredParts(filtered);
  }, [parts, filters, sortBy]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // FIXED handleApplyFilters function
  const handleApplyFilters = (newFilters: any) => {
    console.log("Applying parts filters:", newFilters);
    
    // Create updated filters object matching PartsPage structure
    const updatedFilters = { ...filters };
    
    // Map MobileFilterPanel filters to PartsPage structure
    if (newFilters.search !== undefined) updatedFilters.search = newFilters.search;
    if (newFilters.brand !== undefined) updatedFilters.brand = newFilters.brand === "" ? "all" : newFilters.brand;
    if (newFilters.partCategory !== undefined) updatedFilters.partCategory = newFilters.partCategory === "" ? "all" : newFilters.partCategory;
    if (newFilters.condition !== undefined) updatedFilters.condition = newFilters.condition === "" ? "all" : newFilters.condition;
    if (newFilters.location !== undefined) updatedFilters.location = newFilters.location;
    if (newFilters.minPrice !== undefined) updatedFilters.minPrice = typeof newFilters.minPrice === 'number' ? newFilters.minPrice : parseInt(newFilters.minPrice) || 0;
    if (newFilters.maxPrice !== undefined) updatedFilters.maxPrice = typeof newFilters.maxPrice === 'number' ? newFilters.maxPrice : parseInt(newFilters.maxPrice) || 100000;
    if (newFilters.warranty !== undefined) updatedFilters.warranty = newFilters.warranty;
    if (newFilters.inStock !== undefined) updatedFilters.inStock = newFilters.inStock;
    
    setFilters(updatedFilters);
    console.log("Updated parts filters:", updatedFilters);
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

  const handlePartClick = (id: string) => {
    navigate(`/part/${id}`);
  };

  const categoryTitle = category 
    ? category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ') + " Parts"
    : "All Parts";

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Parts</h2>
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
                        placeholder="Part name, brand, or number"
                        className="pl-10"
                        value={filters.search}
                        onChange={(e) => handleFilterChange("search", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Brand */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Brand</label>
                    <Select value={filters.brand} onValueChange={(value) => handleFilterChange("brand", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Brands" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Brands</SelectItem>
                        <SelectItem value="toyota">Toyota</SelectItem>
                        <SelectItem value="bmw">BMW</SelectItem>
                        <SelectItem value="honda">Honda</SelectItem>
                        <SelectItem value="mercedes-benz">Mercedes-Benz</SelectItem>
                        <SelectItem value="brembo">Brembo</SelectItem>
                        <SelectItem value="mann filter">Mann Filter</SelectItem>
                        <SelectItem value="bosch">Bosch</SelectItem>
                        <SelectItem value="denso">Denso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select value={filters.partCategory} onValueChange={(value) => handleFilterChange("partCategory", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="engine">Engine Parts</SelectItem>
                        <SelectItem value="brakes">Brakes</SelectItem>
                        <SelectItem value="lights">Lights</SelectItem>
                        <SelectItem value="filters">Filters</SelectItem>
                        <SelectItem value="battery">Battery</SelectItem>
                        <SelectItem value="transmission">Transmission</SelectItem>
                        <SelectItem value="suspension">Suspension</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
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
                        onChange={(e) => handleFilterChange("maxPrice", parseInt(e.target.value) || 100000)}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Rs. {filters.minPrice.toLocaleString()} - Rs. {filters.maxPrice.toLocaleString()}
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
                <h1 className="text-2xl sm:text-3xl font-bold text-primary">{categoryTitle}</h1>
                <p className="text-muted-foreground">
                  {loading ? "Loading..." : `${filteredParts.length} parts found`}
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
                    <SelectItem value="rating">Seller Rating</SelectItem>
                    <SelectItem value="brand">Brand A-Z</SelectItem>
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
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Loading parts...</span>
              </div>
            )}

            {/* Results */}
            {!loading && (
              <>
                {filteredParts.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No parts found</h3>
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
                  {filteredParts.map((part) => {
                    const badges = [
                      part.brand,
                      part.condition,
                      ...(part.warranty_period ? ["Warranty"] : []),
                      ...(part.is_oem ? ["OEM"] : [])
                    ];

                    return (
                      <Card
                        key={part.id}
                        className="overflow-hidden hover:shadow-md transition-all duration-150 cursor-pointer"
                        onClick={() => handlePartClick(part.id)}
                      >
                        <div className="flex flex-row">
                          <div className="relative w-28 h-20 sm:w-48 sm:h-32 flex-shrink-0">
                            <img
                              src={"/api/placeholder/400/300"}
                              alt={part.title}
                              className="w-full h-full object-cover"
                            />
                            {part.users?.is_verified && (
                              <div className="absolute top-1 right-1">
                                <Badge className="bg-success text-white text-[10px] px-1 py-0.5">✓ Verified</Badge>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 p-2 sm:p-4 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between mb-1">
                                <h3 className="text-sm sm:text-base font-semibold text-primary">
                                  {part.title.length > 40 ? part.title.slice(0, 40) + '…' : part.title}
                                </h3>
                                <p className="text-sm sm:text-lg font-bold text-primary whitespace-nowrap">
                                  Rs. {part.price.toLocaleString()}
                                </p>
                              </div>
                              <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
                                {part.description}
                              </p>
                              <div className="flex flex-wrap gap-1 text-[10px] sm:text-xs text-muted-foreground max-h-[40px] overflow-hidden">
                                {badges.map((badge) => (
                                  <Badge variant="outline" key={badge}>{badge}</Badge>
                                ))}
                              </div>
                            </div>

                            <div className="flex justify-between items-center mt-2">
                              <div className="text-[11px] sm:text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{part.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-500" />
                                  <span>{part.rating_average || 'N/A'}</span>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSave(part.id);
                                  }}
                                >
                                  <Heart className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleContact(part.id);
                                  }}
                                >
                                  <Settings className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
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