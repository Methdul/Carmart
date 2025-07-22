import { useState } from "react";
import { useParams } from "react-router-dom";
import { Filter, Grid3X3, List, Star, MapPin, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileFilterPanel from "@/components/MobileFilterPanel";
import MobileListView from "@/components/MobileListView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const ServicesPage = () => {
  const { category } = useParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock services data
  const mockServices = [
    {
      id: "1",
      title: "Complete Vehicle Service & Oil Change",
      description: "Full vehicle inspection, oil change, filter replacement, and basic maintenance check",
      price: 8500,
      location: "Colombo 05",
      image: "/api/placeholder/300/200",
      serviceType: "Maintenance",
      providerName: "Pro Auto Care",
      providerRating: 4.9,
      responseTime: "Within 2 hours",
      certified: true
    },
    {
      id: "2",
      title: "Engine Diagnostic & Repair",
      description: "Advanced computerized engine diagnosis and professional repair services",
      price: 15000,
      location: "Kandy",
      image: "/api/placeholder/300/200",
      serviceType: "Repair",
      providerName: "Engine Experts Lanka",
      providerRating: 4.8,
      responseTime: "Same day",
      certified: true
    },
    {
      id: "3",
      title: "Pre-Purchase Vehicle Inspection",
      description: "Comprehensive 120-point inspection for used vehicles with detailed report",
      price: 12000,
      location: "Galle",
      image: "/api/placeholder/300/200",
      serviceType: "Inspection",
      providerName: "Auto Check Pro",
      providerRating: 4.7,
      responseTime: "Next day",
      certified: false
    }
  ];

  const handleApplyFilters = (filters: any) => {
    console.log("Applied filters:", filters);
  };

  const handleSave = (id: string) => {
    console.log("Saved service:", id);
  };

  const handleContact = (id: string) => {
    console.log("Contact provider for service:", id);
  };

  const categoryTitle = category 
    ? category.charAt(0).toUpperCase() + category.slice(1) + " Services"
    : "All Services";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">{categoryTitle}</h1>
          <p className="text-muted-foreground">
            Professional automotive services from certified experts
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Input
              placeholder="Search services by type, location, or provider..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-12"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              {mockServices.length.toLocaleString()} services found
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Mode Toggle - Desktop */}
            <div className="hidden md:flex border rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="p-2"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="p-2"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-card border rounded-lg p-6 sticky top-24">
              <h3 className="font-semibold text-primary mb-4">Filters</h3>
              <p className="text-sm text-muted-foreground">
                Use the mobile filter for full functionality
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Mobile List View */}
            <MobileListView
              items={mockServices}
              type="services"
              onSave={handleSave}
              onContact={handleContact}
            />

            {/* Desktop Grid/List View */}
            <div className="hidden md:block">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mockServices.map((service) => (
                    <div key={service.id} className="bg-card border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-primary mb-2">{service.title}</h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="secondary">{service.serviceType}</Badge>
                            {service.certified && (
                              <Badge variant="default" className="bg-success text-white">
                                ✓ Certified
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {service.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2" />
                          {service.location}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Star className="w-4 h-4 mr-2 text-yellow-500" />
                          {service.providerName} • {service.providerRating}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-2" />
                          {service.responseTime}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          Rs. {service.price.toLocaleString()}
                        </span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Save
                          </Button>
                          <Button size="sm">
                            Contact
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {mockServices.map((service) => (
                    <div key={service.id} className="bg-card border rounded-lg p-6">
                      <div className="flex space-x-4">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-primary">{service.title}</h3>
                            <span className="text-lg font-bold text-primary">
                              Rs. {service.price.toLocaleString()}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="secondary">{service.serviceType}</Badge>
                            {service.certified && (
                              <Badge variant="default" className="bg-success text-white">
                                ✓ Certified
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {service.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="w-3 h-3 mr-1" />
                                {service.location}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Star className="w-3 h-3 mr-1 text-yellow-500" />
                                {service.providerName} • {service.providerRating}
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                Save
                              </Button>
                              <Button size="sm">
                                Contact
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden fixed bottom-4 left-4 z-40">
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
        resultCount={mockServices.length}
        category="services"
      />

      <Footer />
    </div>
  );
};

export default ServicesPage;