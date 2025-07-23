import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, Filter, MapPin, DollarSign, Clock, Settings, Grid3x3, List, ArrowUpDown, Loader2, Heart, Wrench, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileFilterPanel from "@/components/MobileFilterPanel";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string;
  serviceType: string;
  providerName: string;
  providerRating: number;
  responseTime: string;
  certified: boolean;
  warranty: boolean;
  experience: number; // years
  isVerified: boolean;
}

const ServicesPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
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
    serviceType: "all",
    location: "",
    minPrice: 0,
    maxPrice: 50000,
    certified: false,
    warranty: false,
    minRating: 0
  });

  // Mock services data
  const mockServices: Service[] = [
    {
      id: "1",
      title: "Complete Vehicle Service & Oil Change",
      description: "Full vehicle inspection, oil change, filter replacement, and basic maintenance check with computerized diagnosis.",
      price: 8500,
      location: "Colombo 05",
      image: "/api/placeholder/400/300",
      serviceType: "Maintenance",
      providerName: "Pro Auto Care",
      providerRating: 4.9,
      responseTime: "Within 2 hours",
      certified: true,
      warranty: true,
      experience: 15,
      isVerified: true
    },
    {
      id: "2",
      title: "Engine Diagnostic & Repair",
      description: "Advanced computerized engine diagnosis and professional repair services using latest diagnostic tools.",
      price: 15000,
      location: "Kandy",
      image: "/api/placeholder/400/300",
      serviceType: "Repair",
      providerName: "Engine Experts Lanka",
      providerRating: 4.8,
      responseTime: "Same day",
      certified: true,
      warranty: true,
      experience: 12,
      isVerified: true
    },
    {
      id: "3",
      title: "Pre-Purchase Vehicle Inspection",
      description: "Comprehensive 120-point inspection for used vehicles with detailed digital report and recommendations.",
      price: 12000,
      location: "Galle",
      image: "/api/placeholder/400/300",
      serviceType: "Inspection",
      providerName: "Auto Check Pro",
      providerRating: 4.7,
      responseTime: "Next day",
      certified: false,
      warranty: false,
      experience: 8,
      isVerified: false
    },
    {
      id: "4",
      title: "Brake System Service & Repair",
      description: "Complete brake system inspection, brake pad replacement, and brake fluid service with safety guarantee.",
      price: 6500,
      location: "Negombo",
      image: "/api/placeholder/400/300",
      serviceType: "Maintenance",
      providerName: "Brake Masters",
      providerRating: 4.6,
      responseTime: "Within 4 hours",
      certified: true,
      warranty: true,
      experience: 10,
      isVerified: true
    },
    {
      id: "5",
      title: "AC System Repair & Gas Refill",
      description: "Air conditioning system diagnosis, repair, and gas refill service with performance guarantee.",
      price: 9500,
      location: "Colombo 07",
      image: "/api/placeholder/400/300",
      serviceType: "Repair",
      providerName: "Cool Air Solutions",
      providerRating: 4.5,
      responseTime: "Same day",
      certified: false,
      warranty: true,
      experience: 6,
      isVerified: false
    }
  ];

  // Load mock data
  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      setError(null);
      
      setTimeout(() => {
        try {
          setServices(mockServices);
          setLoading(false);
        } catch (err) {
          setError("Failed to load services");
          setLoading(false);
        }
      }, 800);
    };

    loadServices();
  }, []);

  // Filter and sort services
  useEffect(() => {
    let filtered = [...services];

    // Apply filters
    if (filters.search) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        service.providerName.toLowerCase().includes(filters.search.toLowerCase()) ||
        service.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        service.serviceType.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.serviceType && filters.serviceType !== "all") {
      filtered = filtered.filter(service => 
        service.serviceType.toLowerCase() === filters.serviceType.toLowerCase()
      );
    }

    if (filters.location) {
      filtered = filtered.filter(service => 
        service.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    filtered = filtered.filter(service => 
      service.price >= filters.minPrice && service.price <= filters.maxPrice
    );

    if (filters.certified) {
      filtered = filtered.filter(service => service.certified);
    }

    if (filters.warranty) {
      filtered = filtered.filter(service => service.warranty);
    }

    if (filters.minRating > 0) {
      filtered = filtered.filter(service => service.providerRating >= filters.minRating);
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
        filtered.sort((a, b) => b.providerRating - a.providerRating);
        break;
      case "experience":
        filtered.sort((a, b) => b.experience - a.experience);
        break;
      default:
        // Keep relevance order
        break;
    }

    setFilteredServices(filtered);
  }, [services, filters, sortBy]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: "",
      serviceType: "all",
      location: "",
      minPrice: 0,
      maxPrice: 50000,
      certified: false,
      warranty: false,
      minRating: 0
    });
  };

  const handleSave = (id: string) => {
    console.log("Saved service:", id);
  };

  const handleContact = (id: string) => {
    console.log("Contact provider for service:", id);
  };

  const handleServiceClick = (id: string) => {
    navigate(`/service/${id}`);
  };

  const categoryTitle = category 
    ? category.charAt(0).toUpperCase() + category.slice(1) + " Services"
    : "All Automotive Services";

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
                        placeholder="Service type, provider, or keyword"
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
                      max={50000}
                      step={500}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Rs. {filters.minPrice.toLocaleString()}</span>
                      <span>Rs. {filters.maxPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Service Type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Service Type</label>
                    <Select value={filters.serviceType} onValueChange={(value) => handleFilterChange("serviceType", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Services</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="repair">Repair</SelectItem>
                        <SelectItem value="inspection">Inspection</SelectItem>
                        <SelectItem value="bodywork">Body Work</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="painting">Painting</SelectItem>
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

                  {/* Minimum Rating */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Minimum Rating</label>
                    <Slider
                      value={[filters.minRating]}
                      onValueChange={([rating]) => handleFilterChange("minRating", rating)}
                      max={5}
                      step={0.1}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Any Rating</span>
                      <span>{filters.minRating}+ ★</span>
                    </div>
                  </div>

                  {/* Additional Filters */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="certified"
                        checked={filters.certified}
                        onChange={(e) => handleFilterChange("certified", e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="certified" className="text-sm">Certified Providers</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="warranty"
                        checked={filters.warranty}
                        onChange={(e) => handleFilterChange("warranty", e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="warranty" className="text-sm">Service Warranty</label>
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
                Professional automotive services from certified experts and trusted providers
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
                    {error ? 'Error loading services' : `${filteredServices.length} services found`}
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
                    <SelectItem value="rating">Provider Rating</SelectItem>
                    <SelectItem value="experience">Experience</SelectItem>
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
                <span className="ml-2">Loading services...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="text-center py-12">
                <Wrench className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No services found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters to see more results</p>
                <Button onClick={clearAllFilters}>Clear Filters</Button>
              </div>
            ) : (
              <>
                {(viewMode === "grid" && !isMobile) ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredServices.map((service) => (
                      <Card 
                        key={service.id} 
                        className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => handleServiceClick(service.id)}
                      >
                        <div>
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-48 object-cover"
                          />
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-lg line-clamp-2">{service.title}</h3>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSave(service.id);
                                }}
                              >
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {service.description}
                            </p>
                            
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="secondary">{service.serviceType}</Badge>
                              {service.certified && (
                                <Badge className="bg-green-100 text-green-800">✓ Certified</Badge>
                              )}
                              {service.warranty && (
                                <Badge className="bg-blue-100 text-blue-800">Warranty</Badge>
                              )}
                              {service.isVerified && (
                                <Badge className="bg-purple-100 text-purple-800">✓ Verified</Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center justify-between mb-3">
                              <div className="space-y-1">
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {service.location}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Star className="w-3 h-3 mr-1 text-yellow-500" />
                                  {service.providerName} • {service.providerRating}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {service.responseTime}
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-primary">
                                  Rs. {service.price.toLocaleString()}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {service.experience}+ years exp.
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredServices.map((service) => (
                      <Card 
                        key={service.id} 
                        className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleServiceClick(service.id)}
                      >
                        <div className="flex p-3 gap-3">
                          {/* Image */}
                          <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                            <img
                              src={service.image}
                              alt={service.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0 flex flex-col">
                            {/* Title and Save Button */}
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-semibold text-sm sm:text-base line-clamp-2 pr-1 flex-1">
                                {service.title}
                              </h3>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSave(service.id);
                                }} 
                                className="p-1 ml-1"
                              >
                                <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </div>
                            
                            {/* Price */}
                            <div className="mb-2">
                              <p className="text-lg sm:text-xl font-bold text-primary">
                                Rs. {service.price.toLocaleString()}
                              </p>
                            </div>
                            
                            {/* Service Details - Mobile Optimized */}
                            <div className="flex flex-wrap gap-1 mb-2">
                              <Badge variant="secondary" className="text-xs px-1.5 py-0.5 h-5">{service.serviceType}</Badge>
                              {service.certified && (
                                <Badge className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5 h-5">✓ Cert</Badge>
                              )}
                              {service.warranty && (
                                <Badge className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 h-5">Warranty</Badge>
                              )}
                              {service.isVerified && (
                                <Badge className="bg-purple-100 text-purple-800 text-xs px-1.5 py-0.5 h-5">✓</Badge>
                              )}
                            </div>
                            
                            {/* Bottom Row */}
                            <div className="flex items-center justify-between mt-auto">
                              <div className="flex flex-col space-y-0.5">
                                <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                                  <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                                  <span className="truncate">{service.location}</span>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Star className="w-3 h-3 mr-1 text-yellow-500 flex-shrink-0" />
                                  <span className="truncate">{service.providerName} • {service.providerRating}</span>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                                  <span className="truncate">{service.responseTime}</span>
                                </div>
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
        resultCount={filteredServices.length}
        category="services"
      />

      <Footer />
    </div>
  );
};

export default ServicesPage;