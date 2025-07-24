import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, Filter, MapPin, DollarSign, Clock, Settings, Grid3x3, List, ArrowUpDown, Loader2, Heart, Wrench, Star, Shield, CheckCircle, Phone } from "lucide-react";
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
  experience: number;
  isVerified: boolean;
  // Enhanced properties
  providerType?: string;
  availability?: string;
  homeService?: boolean;
  pickupDropoff?: boolean;
  emergencyService?: boolean;
  onlineBooking?: boolean;
  paymentOptions?: string;
  languages?: string;
  specialization?: string;
  equipmentType?: string;
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
    serviceType: "all",
    location: "",
    minPrice: 0,
    maxPrice: 50000,
    certified: false,
    warranty: false,
    minRating: 0
  });

  // Enhanced mock services data
  const mockServices: Service[] = [
    {
      id: "1",
      title: "Complete Vehicle Service & Oil Change",
      description: "Full vehicle inspection, oil change, filter replacement, and basic maintenance check with computerized diagnosis.",
      price: 8500,
      location: "Colombo 05",
      image: "/api/placeholder/400/300",
      serviceType: "Maintenance",
      providerName: "AutoCare Center",
      providerRating: 4.8,
      responseTime: "Same day",
      certified: true,
      warranty: true,
      experience: 15,
      isVerified: true,
      providerType: "garage",
      availability: "weekdays",
      homeService: false,
      pickupDropoff: true,
      emergencyService: false,
      onlineBooking: true,
      paymentOptions: "card",
      languages: "English, Sinhala",
      specialization: "general",
      equipmentType: "computerized"
    },
    {
      id: "2",
      title: "BMW Specialized Engine Repair",
      description: "Expert BMW engine repair and maintenance by certified BMW technicians with genuine parts.",
      price: 25000,
      location: "Colombo 03",
      image: "/api/placeholder/400/300",
      serviceType: "Repair",
      providerName: "BMW Service Center",
      providerRating: 4.9,
      responseTime: "Within 2 hours",
      certified: true,
      warranty: true,
      experience: 20,
      isVerified: true,
      providerType: "dealership",
      availability: "24-7",
      homeService: false,
      pickupDropoff: true,
      emergencyService: true,
      onlineBooking: true,
      paymentOptions: "card",
      languages: "English",
      specialization: "bmw",
      equipmentType: "computerized"
    },
    {
      id: "3",
      title: "Mobile Car Wash & Detailing",
      description: "Professional car wash and detailing service at your location. Interior and exterior cleaning.",
      price: 3500,
      location: "Kandy",
      image: "/api/placeholder/400/300",
      serviceType: "Detailing",
      providerName: "Mobile Wash Pro",
      providerRating: 4.6,
      responseTime: "Within 3 hours",
      certified: false,
      warranty: false,
      experience: 5,
      isVerified: false,
      providerType: "mobile",
      availability: "weekends",
      homeService: true,
      pickupDropoff: false,
      emergencyService: false,
      onlineBooking: true,
      paymentOptions: "cash",
      languages: "Sinhala, Tamil",
      specialization: "detailing",
      equipmentType: "manual"
    },
    {
      id: "4",
      title: "Brake System Repair & Replacement",
      description: "Complete brake system inspection, pad replacement, disc machining, and brake fluid change.",
      price: 6500,
      location: "Negombo",
      image: "/api/placeholder/400/300",
      serviceType: "Repair",
      providerName: "Brake Masters",
      providerRating: 4.6,
      responseTime: "Within 4 hours",
      certified: true,
      warranty: true,
      experience: 10,
      isVerified: true,
      providerType: "specialist",
      availability: "weekdays",
      homeService: false,
      pickupDropoff: false,
      emergencyService: false,
      onlineBooking: false,
      paymentOptions: "cash",
      languages: "English, Sinhala",
      specialization: "brakes",
      equipmentType: "hydraulic"
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
      isVerified: false,
      providerType: "garage",
      availability: "weekdays",
      homeService: false,
      pickupDropoff: false,
      emergencyService: false,
      onlineBooking: true,
      paymentOptions: "card",
      languages: "English, Tamil",
      specialization: "ac-service",
      equipmentType: "computerized"
    },
    {
      id: "6",
      title: "Emergency Towing Service 24/7",
      description: "24/7 emergency towing service for breakdowns, accidents, and vehicle recovery anywhere in Colombo.",
      price: 2500,
      location: "Colombo (Island-wide)",
      image: "/api/placeholder/400/300",
      serviceType: "Emergency",
      providerName: "FastTow Emergency",
      providerRating: 4.7,
      responseTime: "Within 30 minutes",
      certified: true,
      warranty: false,
      experience: 12,
      isVerified: true,
      providerType: "chain",
      availability: "24-7",
      homeService: true,
      pickupDropoff: true,
      emergencyService: true,
      onlineBooking: true,
      paymentOptions: "card",
      languages: "English, Sinhala, Tamil",
      specialization: "towing",
      equipmentType: "hydraulic"
    },
    {
      id: "7",
      title: "Toyota Hybrid Specialist Service",
      description: "Specialized service for Toyota hybrid vehicles including battery diagnostics and maintenance.",
      price: 12000,
      location: "Galle",
      image: "/api/placeholder/400/300",
      serviceType: "Maintenance",
      providerName: "HybridTech Solutions",
      providerRating: 4.8,
      responseTime: "Next day",
      certified: true,
      warranty: true,
      experience: 8,
      isVerified: true,
      providerType: "specialist",
      availability: "weekdays",
      homeService: false,
      pickupDropoff: true,
      emergencyService: false,
      onlineBooking: false,
      paymentOptions: "installments",
      languages: "English, Sinhala",
      specialization: "hybrid",
      equipmentType: "computerized"
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

  // Enhanced filter logic
  useEffect(() => {
    let filtered = [...services];

    // Apply filters
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchTerm) ||
        service.providerName.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm) ||
        service.serviceType.toLowerCase().includes(searchTerm) ||
        (service.specialization && service.specialization.toLowerCase().includes(searchTerm))
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
      case "response-time":
        // Simple response time sorting (could be more sophisticated)
        filtered.sort((a, b) => {
          const aTime = a.responseTime.toLowerCase();
          const bTime = b.responseTime.toLowerCase();
          if (aTime.includes('30 minutes')) return -1;
          if (bTime.includes('30 minutes')) return 1;
          if (aTime.includes('same day')) return -1;
          if (bTime.includes('same day')) return 1;
          return 0;
        });
        break;
      default:
        // Keep relevance order, prioritize verified and certified providers
        filtered.sort((a, b) => {
          if (a.isVerified && !b.isVerified) return -1;
          if (!a.isVerified && b.isVerified) return 1;
          if (a.certified && !b.certified) return -1;
          if (!a.certified && b.certified) return 1;
          return 0;
        });
        break;
    }

    setFilteredServices(filtered);
  }, [services, filters, sortBy]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // FIXED handleApplyFilters function
  const handleApplyFilters = (newFilters: any) => {
    console.log("Applying service filters:", newFilters);
    
    // Create updated filters object matching ServicesPage structure  
    const updatedFilters = { ...filters };
    
    // Map MobileFilterPanel filters to ServicesPage structure
    if (newFilters.search !== undefined) updatedFilters.search = newFilters.search;
    if (newFilters.serviceType !== undefined) updatedFilters.serviceType = newFilters.serviceType === "" ? "all" : newFilters.serviceType;
    if (newFilters.location !== undefined) updatedFilters.location = newFilters.location;
    if (newFilters.minPrice !== undefined) updatedFilters.minPrice = typeof newFilters.minPrice === 'number' ? newFilters.minPrice : parseInt(newFilters.minPrice) || 0;
    if (newFilters.maxPrice !== undefined) updatedFilters.maxPrice = typeof newFilters.maxPrice === 'number' ? newFilters.maxPrice : parseInt(newFilters.maxPrice) || 50000;
    if (newFilters.certified !== undefined) updatedFilters.certified = newFilters.certified;
    if (newFilters.warranty !== undefined) updatedFilters.warranty = newFilters.warranty;
    if (newFilters.minRating !== undefined) updatedFilters.minRating = typeof newFilters.minRating === 'number' ? newFilters.minRating : parseFloat(newFilters.minRating) || 0;
    
    setFilters(updatedFilters);
    console.log("Updated service filters:", updatedFilters);
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
    ? category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ') + " Services"
    : "All Services";

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Services</h2>
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
                        placeholder="Service type, provider, or keyword"
                        className="pl-10"
                        value={filters.search}
                        onChange={(e) => handleFilterChange("search", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Service Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Service Type</label>
                    <Select value={filters.serviceType} onValueChange={(value) => handleFilterChange("serviceType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Services" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Services</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="repair">Repair</SelectItem>
                        <SelectItem value="detailing">Car Detailing</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="inspection">Inspection</SelectItem>
                        <SelectItem value="bodywork">Body Work</SelectItem>
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
                        onChange={(e) => handleFilterChange("maxPrice", parseInt(e.target.value) || 50000)}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Rs. {filters.minPrice.toLocaleString()} - Rs. {filters.maxPrice.toLocaleString()}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Minimum Rating</label>
                    <Select value={filters.minRating.toString()} onValueChange={(value) => handleFilterChange("minRating", parseFloat(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Any Rating</SelectItem>
                        <SelectItem value="3">3+ Stars</SelectItem>
                        <SelectItem value="4">4+ Stars</SelectItem>
                        <SelectItem value="4.5">4.5+ Stars</SelectItem>
                      </SelectContent>
                    </Select>
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
                  {loading ? "Loading..." : `${filteredServices.length} services found`}
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
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="experience">Experience</SelectItem>
                    <SelectItem value="response-time">Response Time</SelectItem>
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
                <span className="ml-3 text-muted-foreground">Loading services...</span>
              </div>
            )}

            {/* Results */}
            {!loading && (
              <>
                {filteredServices.length === 0 ? (
                  <div className="text-center py-12">
                    <Wrench className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No services found</h3>
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
                    {filteredServices.map((service) => (
                      <Card
                        key={service.id}
                        className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
                        onClick={() => handleServiceClick(service.id)}
                      >
                        <div className="flex flex-col sm:flex-row">
                          <div className="relative w-full sm:w-48 h-48 sm:h-32 flex-shrink-0">
                            <img
                              src={service.image}
                              alt={service.title}
                              className="w-full h-full object-cover"
                            />
                            {service.isVerified && (
                              <div className="absolute top-2 right-2">
                                <Badge className="bg-success text-white text-xs">✓ Verified</Badge>
                              </div>
                            )}
                            {service.emergencyService && (
                              <div className="absolute top-2 left-2">
                                <Badge className="bg-red-100 text-red-800 text-xs">Emergency</Badge>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 p-4 flex flex-col justify-between">
                            <div>
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                                <h3 className="text-lg font-semibold text-primary mb-1 sm:mb-0">
                                  {service.title}
                                </h3>
                                <p className="text-xl font-bold text-primary">
                                  Rs. {service.price.toLocaleString()}
                                </p>
                              </div>
                              
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                {service.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-1 mb-2">
                                <Badge variant="secondary" className="text-xs px-1.5 py-0.5 h-5">{service.serviceType}</Badge>
                                {service.certified && <Badge className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 h-5">Certified</Badge>}
                                {service.warranty && <Badge className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5 h-5">Warranty</Badge>}
                                {service.homeService && <Badge className="bg-purple-100 text-purple-800 text-xs px-1.5 py-0.5 h-5">Home Service</Badge>}
                                {service.onlineBooking && <Badge className="bg-orange-100 text-orange-800 text-xs px-1.5 py-0.5 h-5">Online Booking</Badge>}
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mt-auto">
                              <div className="flex flex-col space-y-0.5">
                                <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                                  <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                                  <span className="truncate">{service.location}</span>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Star className="w-3 h-3 mr-1 text-yellow-500" />
                                  <span>{service.providerRating}</span>
                                  <span className="mx-1">•</span>
                                  <Clock className="w-3 h-3 mr-1" />
                                  <span>{service.responseTime}</span>
                                </div>
                              </div>
                              
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSave(service.id);
                                  }}
                                >
                                  <Heart className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleContact(service.id);
                                  }}
                                >
                                  <Phone className="w-4 h-4" />
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
        resultCount={filteredServices.length}
        category="services"
      />

      <Footer />
    </div>
  );
};

export default ServicesPage;