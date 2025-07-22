import { useState } from "react";
import { X, ChevronDown, ChevronUp, Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface MobileFilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
  resultCount: number;
  category: "vehicles" | "parts" | "services";
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection = ({ title, children, defaultOpen = false }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 text-left touch-manipulation"
      >
        <span className="font-medium text-primary text-base">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
};

const MobileFilterPanel = ({ 
  isOpen, 
  onClose, 
  onApplyFilters, 
  resultCount, 
  category 
}: MobileFilterPanelProps) => {
  // Comprehensive filter state
  const [filters, setFilters] = useState({
    // Common filters
    search: "",
    priceRange: [0, category === "vehicles" ? 50000000 : category === "services" ? 50000 : 100000],
    location: "",
    
    // Vehicle specific
    make: "",
    model: "",
    yearFrom: "",
    yearTo: "",
    fuelType: "",
    transmission: "",
    bodyType: "",
    condition: "",
    healthScore: [0, 100],
    mileageRange: [0, 300000],
    
    // Parts specific
    brand: "",
    partCategory: "",
    partCondition: "",
    warranty: false,
    inStock: false,
    compatibility: "",
    
    // Services specific
    serviceType: "",
    providerRating: [0, 5],
    responseTime: "",
    certified: false,
    serviceWarranty: false,
    experience: [0, 20]
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: "",
      priceRange: [0, category === "vehicles" ? 50000000 : category === "services" ? 50000 : 100000],
      location: "",
      make: "",
      model: "",
      yearFrom: "",
      yearTo: "",
      fuelType: "",
      transmission: "",
      bodyType: "",
      condition: "",
      healthScore: [0, 100],
      mileageRange: [0, 300000],
      brand: "",
      partCategory: "",
      partCondition: "",
      warranty: false,
      inStock: false,
      compatibility: "",
      serviceType: "",
      providerRating: [0, 5],
      responseTime: "",
      certified: false,
      serviceWarranty: false,
      experience: [0, 20]
    });
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      {/* Filter Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
            <h3 className="text-lg font-semibold text-primary">Filters</h3>
            <button onClick={onClose} className="p-2 touch-manipulation">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto">
            
            {/* Search */}
            <FilterSection title="Search" defaultOpen>
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={
                      category === "vehicles" ? "Make, model, or keyword" :
                      category === "parts" ? "Part name, brand, or number" :
                      "Service type, provider, or keyword"
                    }
                    className="pl-10 h-12 text-base"
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                  />
                </div>
              </div>
            </FilterSection>

            {/* Price Range */}
            <FilterSection title="Price Range" defaultOpen>
              <div className="space-y-4">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => handleFilterChange("priceRange", value)}
                  max={category === "vehicles" ? 50000000 : category === "services" ? 50000 : 100000}
                  step={category === "vehicles" ? 100000 : category === "services" ? 500 : 1000}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Rs. {filters.priceRange[0].toLocaleString()}</span>
                  <span>Rs. {filters.priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </FilterSection>

            {/* Vehicle Specific Filters */}
            {category === "vehicles" && (
              <>
                <FilterSection title="Make & Model">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Make</Label>
                      <Select value={filters.make} onValueChange={(value) => handleFilterChange("make", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="All Makes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Makes</SelectItem>
                          <SelectItem value="toyota">Toyota</SelectItem>
                          <SelectItem value="honda">Honda</SelectItem>
                          <SelectItem value="nissan">Nissan</SelectItem>
                          <SelectItem value="bmw">BMW</SelectItem>
                          <SelectItem value="mercedes-benz">Mercedes-Benz</SelectItem>
                          <SelectItem value="audi">Audi</SelectItem>
                          <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
                          <SelectItem value="mazda">Mazda</SelectItem>
                          <SelectItem value="suzuki">Suzuki</SelectItem>
                          <SelectItem value="hyundai">Hyundai</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Model</Label>
                      <Input
                        placeholder="Enter model"
                        className="h-12"
                        value={filters.model}
                        onChange={(e) => handleFilterChange("model", e.target.value)}
                      />
                    </div>
                  </div>
                </FilterSection>

                <FilterSection title="Year & Mileage">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm font-medium">Year From</Label>
                        <Select value={filters.yearFrom} onValueChange={(value) => handleFilterChange("yearFrom", value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Any</SelectItem>
                            {Array.from({length: 25}, (_, i) => 2024 - i).map(year => (
                              <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Year To</Label>
                        <Select value={filters.yearTo} onValueChange={(value) => handleFilterChange("yearTo", value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Any</SelectItem>
                            {Array.from({length: 25}, (_, i) => 2024 - i).map(year => (
                              <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-3 block">Mileage Range</Label>
                      <Slider
                        value={filters.mileageRange}
                        onValueChange={(value) => handleFilterChange("mileageRange", value)}
                        max={300000}
                        step={5000}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{filters.mileageRange[0].toLocaleString()} km</span>
                        <span>{filters.mileageRange[1].toLocaleString()} km</span>
                      </div>
                    </div>
                  </div>
                </FilterSection>

                <FilterSection title="Engine & Transmission">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Fuel Type</Label>
                      <Select value={filters.fuelType} onValueChange={(value) => handleFilterChange("fuelType", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="All Fuel Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Fuel Types</SelectItem>
                          <SelectItem value="petrol">Petrol</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Transmission</Label>
                      <Select value={filters.transmission} onValueChange={(value) => handleFilterChange("transmission", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="All Transmissions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Transmissions</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                          <SelectItem value="automatic">Automatic</SelectItem>
                          <SelectItem value="cvt">CVT</SelectItem>
                          <SelectItem value="semi-automatic">Semi-Automatic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Body Type</Label>
                      <Select value={filters.bodyType} onValueChange={(value) => handleFilterChange("bodyType", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="All Body Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Body Types</SelectItem>
                          <SelectItem value="sedan">Sedan</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="hatchback">Hatchback</SelectItem>
                          <SelectItem value="coupe">Coupe</SelectItem>
                          <SelectItem value="pickup">Pickup Truck</SelectItem>
                          <SelectItem value="van">Van</SelectItem>
                          <SelectItem value="convertible">Convertible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </FilterSection>

                <FilterSection title="Condition & Health">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Condition</Label>
                      <Select value={filters.condition} onValueChange={(value) => handleFilterChange("condition", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Any Condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any Condition</SelectItem>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="needs-work">Needs Work</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-3 block">AI Health Score</Label>
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
                </FilterSection>
              </>
            )}

            {/* Parts Specific Filters */}
            {category === "parts" && (
              <>
                <FilterSection title="Brand & Category">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Brand</Label>
                      <Select value={filters.brand} onValueChange={(value) => handleFilterChange("brand", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="All Brands" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Brands</SelectItem>
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

                    <div>
                      <Label className="text-sm font-medium">Part Category</Label>
                      <Select value={filters.partCategory} onValueChange={(value) => handleFilterChange("partCategory", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Categories</SelectItem>
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
                  </div>
                </FilterSection>

                <FilterSection title="Condition & Compatibility">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Condition</Label>
                      <Select value={filters.partCondition} onValueChange={(value) => handleFilterChange("partCondition", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Any Condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any Condition</SelectItem>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="used">Used - Good</SelectItem>
                          <SelectItem value="refurbished">Refurbished</SelectItem>
                          <SelectItem value="oem">OEM</SelectItem>
                          <SelectItem value="aftermarket">Aftermarket</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Vehicle Compatibility</Label>
                      <Input
                        placeholder="e.g., Toyota Prius 2015-2020"
                        className="h-12"
                        value={filters.compatibility}
                        onChange={(e) => handleFilterChange("compatibility", e.target.value)}
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="warranty"
                          checked={filters.warranty}
                          onCheckedChange={(checked) => handleFilterChange("warranty", checked)}
                          className="h-5 w-5"
                        />
                        <Label htmlFor="warranty" className="text-sm font-medium">With Warranty</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="inStock"
                          checked={filters.inStock}
                          onCheckedChange={(checked) => handleFilterChange("inStock", checked)}
                          className="h-5 w-5"
                        />
                        <Label htmlFor="inStock" className="text-sm font-medium">In Stock Only</Label>
                      </div>
                    </div>
                  </div>
                </FilterSection>
              </>
            )}

            {/* Services Specific Filters */}
            {category === "services" && (
              <>
                <FilterSection title="Service Type">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Service Type</Label>
                      <Select value={filters.serviceType} onValueChange={(value) => handleFilterChange("serviceType", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="All Services" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Services</SelectItem>
                          <SelectItem value="maintenance">General Maintenance</SelectItem>
                          <SelectItem value="repair">Repair Services</SelectItem>
                          <SelectItem value="inspection">Vehicle Inspection</SelectItem>
                          <SelectItem value="bodywork">Body Work & Paint</SelectItem>
                          <SelectItem value="electrical">Electrical Services</SelectItem>
                          <SelectItem value="ac">AC Services</SelectItem>
                          <SelectItem value="towing">Towing Services</SelectItem>
                          <SelectItem value="detailing">Car Detailing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Response Time</Label>
                      <Select value={filters.responseTime} onValueChange={(value) => handleFilterChange("responseTime", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Any Time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any Time</SelectItem>
                          <SelectItem value="immediate">Within 1 hour</SelectItem>
                          <SelectItem value="same-day">Same day</SelectItem>
                          <SelectItem value="next-day">Next day</SelectItem>
                          <SelectItem value="within-week">Within a week</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </FilterSection>

                <FilterSection title="Provider Rating & Experience">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Minimum Provider Rating</Label>
                      <Slider
                        value={filters.providerRating}
                        onValueChange={(value) => handleFilterChange("providerRating", value)}
                        max={5}
                        step={0.1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Any Rating</span>
                        <span>{filters.providerRating[1]}+ ★</span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-3 block">Years of Experience</Label>
                      <Slider
                        value={filters.experience}
                        onValueChange={(value) => handleFilterChange("experience", value)}
                        max={20}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{filters.experience[0]}+ years</span>
                        <span>{filters.experience[1]}+ years</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="certified"
                          checked={filters.certified}
                          onCheckedChange={(checked) => handleFilterChange("certified", checked)}
                          className="h-5 w-5"
                        />
                        <Label htmlFor="certified" className="text-sm font-medium">Certified Providers</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="serviceWarranty"
                          checked={filters.serviceWarranty}
                          onCheckedChange={(checked) => handleFilterChange("serviceWarranty", checked)}
                          className="h-5 w-5"
                        />
                        <Label htmlFor="serviceWarranty" className="text-sm font-medium">Service Warranty</Label>
                      </div>
                    </div>
                  </div>
                </FilterSection>
              </>
            )}

            {/* Common Location Filter */}
            <FilterSection title="Location">
              <div className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="City or area"
                    className="pl-10 h-12"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                  />
                </div>
                
                <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Locations</SelectItem>
                    <SelectItem value="colombo">Colombo</SelectItem>
                    <SelectItem value="kandy">Kandy</SelectItem>
                    <SelectItem value="galle">Galle</SelectItem>
                    <SelectItem value="jaffna">Jaffna</SelectItem>
                    <SelectItem value="kurunegala">Kurunegala</SelectItem>
                    <SelectItem value="matara">Matara</SelectItem>
                    <SelectItem value="negombo">Negombo</SelectItem>
                    <SelectItem value="anuradhapura">Anuradhapura</SelectItem>
                    <SelectItem value="ratnapura">Ratnapura</SelectItem>
                    <SelectItem value="batticaloa">Batticaloa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FilterSection>

          </div>

          {/* Actions - Sticky Bottom */}
          <div className="sticky bottom-0 bg-white border-t p-4 flex space-x-3">
            <Button
              variant="outline"
              onClick={clearAllFilters}
              className="flex-1 h-12 text-base"
            >
              Clear All
            </Button>
            <Button
              onClick={applyFilters}
              className="flex-1 h-12 text-base bg-primary hover:bg-primary/90"
            >
              Show {resultCount} Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterPanel;