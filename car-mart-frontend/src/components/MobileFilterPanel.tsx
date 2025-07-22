import { useState } from "react";
import { X, Filter, ChevronDown, ChevronUp } from "lucide-react";
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
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 text-left"
      >
        <span className="font-medium text-primary">{title}</span>
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
  const [filters, setFilters] = useState({
    priceRange: [0, 50000000],
    healthScore: [0, 100],
    make: "",
    model: "",
    year: "",
    transmission: "",
    fuelType: "",
    bodyType: "",
    location: "",
    condition: "",
    brand: "",
    partCategory: "",
    serviceType: "",
    warranty: false,
    certified: false
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 50000000],
      healthScore: [0, 100],
      make: "",
      model: "",
      year: "",
      transmission: "",
      fuelType: "",
      bodyType: "",
      location: "",
      condition: "",
      brand: "",
      partCategory: "",
      serviceType: "",
      warranty: false,
      certified: false
    });
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      {/* Filter Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-primary">Filters</h3>
            <button onClick={onClose} className="p-2">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Price Range */}
            <FilterSection title="Price Range" defaultOpen>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Rs. {filters.priceRange[0].toLocaleString()}</span>
                  <span>Rs. {filters.priceRange[1].toLocaleString()}</span>
                </div>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => handleFilterChange("priceRange", value)}
                  max={50000000}
                  step={100000}
                  className="w-full"
                />
              </div>
            </FilterSection>

            {/* Category-specific filters */}
            {category === "vehicles" && (
              <>
                <FilterSection title="AI Health Score">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{filters.healthScore[0]}</span>
                      <span>{filters.healthScore[1]}</span>
                    </div>
                    <Slider
                      value={filters.healthScore}
                      onValueChange={(value) => handleFilterChange("healthScore", value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </FilterSection>

                <FilterSection title="Vehicle Details">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="make">Make</Label>
                      <Select value={filters.make} onValueChange={(value) => handleFilterChange("make", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any Make" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any Make</SelectItem>
                          <SelectItem value="toyota">Toyota</SelectItem>
                          <SelectItem value="honda">Honda</SelectItem>
                          <SelectItem value="bmw">BMW</SelectItem>
                          <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                          <SelectItem value="nissan">Nissan</SelectItem>
                          <SelectItem value="hyundai">Hyundai</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="transmission">Transmission</Label>
                      <Select value={filters.transmission} onValueChange={(value) => handleFilterChange("transmission", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any Transmission" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any Transmission</SelectItem>
                          <SelectItem value="automatic">Automatic</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                          <SelectItem value="cvt">CVT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="fuelType">Fuel Type</Label>
                      <Select value={filters.fuelType} onValueChange={(value) => handleFilterChange("fuelType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any Fuel Type" />
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

                    <div>
                      <Label htmlFor="bodyType">Body Type</Label>
                      <Select value={filters.bodyType} onValueChange={(value) => handleFilterChange("bodyType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any Body Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any Body Type</SelectItem>
                          <SelectItem value="sedan">Sedan</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="hatchback">Hatchback</SelectItem>
                          <SelectItem value="coupe">Coupe</SelectItem>
                          <SelectItem value="pickup">Pickup Truck</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </FilterSection>
              </>
            )}

            {category === "parts" && (
              <FilterSection title="Parts Details">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="partCategory">Part Category</Label>
                    <Select value={filters.partCategory} onValueChange={(value) => handleFilterChange("partCategory", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Category</SelectItem>
                        <SelectItem value="engine">Engine Parts</SelectItem>
                        <SelectItem value="body">Body Parts</SelectItem>
                        <SelectItem value="interior">Interior</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="tires">Tires & Wheels</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="condition">Condition</Label>
                    <Select value={filters.condition} onValueChange={(value) => handleFilterChange("condition", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Condition</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="used-excellent">Used - Excellent</SelectItem>
                        <SelectItem value="used-good">Used - Good</SelectItem>
                        <SelectItem value="used-fair">Used - Fair</SelectItem>
                        <SelectItem value="refurbished">Refurbished</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="warranty"
                      checked={filters.warranty}
                      onCheckedChange={(checked) => handleFilterChange("warranty", checked)}
                    />
                    <Label htmlFor="warranty" className="text-sm">With Warranty</Label>
                  </div>
                </div>
              </FilterSection>
            )}

            {category === "services" && (
              <FilterSection title="Service Details">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="serviceType">Service Type</Label>
                    <Select value={filters.serviceType} onValueChange={(value) => handleFilterChange("serviceType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Service</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="repair">Repair</SelectItem>
                        <SelectItem value="inspection">Inspection</SelectItem>
                        <SelectItem value="customization">Customization</SelectItem>
                        <SelectItem value="insurance">Insurance</SelectItem>
                        <SelectItem value="financing">Financing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="certified"
                      checked={filters.certified}
                      onCheckedChange={(checked) => handleFilterChange("certified", checked)}
                    />
                    <Label htmlFor="certified" className="text-sm">Certified Providers</Label>
                  </div>
                </div>
              </FilterSection>
            )}

            <FilterSection title="Location">
              <div>
                <Label htmlFor="location">Location</Label>
                <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Location</SelectItem>
                    <SelectItem value="colombo">Colombo</SelectItem>
                    <SelectItem value="kandy">Kandy</SelectItem>
                    <SelectItem value="galle">Galle</SelectItem>
                    <SelectItem value="jaffna">Jaffna</SelectItem>
                    <SelectItem value="kurunegala">Kurunegala</SelectItem>
                    <SelectItem value="matara">Matara</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FilterSection>
          </div>

          {/* Actions */}
          <div className="sticky bottom-0 bg-white border-t p-4 flex space-x-3">
            <Button
              variant="outline"
              onClick={clearAllFilters}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button
              onClick={applyFilters}
              className="flex-1 bg-highlight hover:bg-highlight/90"
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