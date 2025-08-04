// STEP 8: Replace the ENTIRE content of src/components/MobileFilterPanel.tsx with this

import { useState } from "react";
import { X, ChevronDown, ChevronUp, Search, MapPin, Calendar, Gauge, Fuel, Cog, Car, Shield, DollarSign } from "lucide-react";
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
  category: "vehicles" | "parts" | "services" | "rentals"; 
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
}

const FilterSection = ({ title, children, defaultOpen = false, icon }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 text-left touch-manipulation"
      >
        <div className="flex items-center space-x-2">
          {icon && <span className="text-primary">{icon}</span>}
          <span className="font-medium text-primary text-base">{title}</span>
        </div>
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
  
  // Comprehensive filter state for vehicles
  const [filters, setFilters] = useState({
    // Basic Search & Location
    search: "",
    location: "",
    
    // Price & Financial
    minPrice: 0,
    maxPrice: category === "vehicles" ? 50000000 : category === "services" ? 50000 : 100000,
    priceNegotiable: false,
    leasingAvailable: false,
    financingAvailable: false,
    tradeInAccepted: false,
    emiRange: "",
    
    // Vehicle Identification
    make: "all",
    model: "",
    bodyType: "",
    condition: "",
    
    // Engine & Performance
    fuelType: "all",
    transmission: "",
    engineSize: "",
    engineType: "",
    drivetrain: "",
    turboCharged: false,
    
    // Age & Usage
    yearFrom: "",
    yearTo: "",
    mileageFrom: "",
    mileageTo: "",
    previousOwners: "",
    
    // Vehicle Specifications
    doors: "",
    seatingCapacity: "",
    color: "",
    interiorColor: "",
    
    // Health & Inspection
    healthScore: [0, 100] as number[],
    inspectionCertificate: false,
    serviceHistory: false,
    accidentHistory: "",
    
    // Import & Registration
    registrationYear: "",
    registrationProvince: "",
    importStatus: "",
    dutyPaid: false,
    
    // Insurance & Legal
    insuranceType: "",
    registrationStatus: "",
    documentsComplete: false,
    
    // Comfort Features
    airConditioning: false,
    climateControl: false,
    heatedSeats: false,
    sunroof: false,
    moonroof: false,
    powerWindows: false,
    centralLocking: false,
    
    // Technology Features
    bluetooth: false,
    androidAuto: false,
    appleCarPlay: false,
    navigationSystem: false,
    touchScreen: false,
    premiumSound: false,
    wirelessCharging: false,
    
    // Safety Features
    reverseCamera: false,
    parkingSensors: false,
    blindSpotMonitoring: false,
    abs: false,
    airbags: false,
    airbagCount: "",
    stabilityControl: false,
    tractionControl: false,
    
    // Exterior Features
    leatherSeats: false,
    fabricSeats: false,
    alloyWheels: false,
    runningBoards: false,
    spoiler: false,
    tintedWindows: false,
    
    // Performance Features
    powerSteering: false,
    cruiseControl: false,
    paddleShifters: false,
    sportMode: false,
    ecoMode: false,
    
    // Seller & Listing
    sellerType: "",
    verifiedSeller: false,
    quickResponse: false,
    homeInspection: false,
    testDriveAvailable: false,
    virtualTour: false,
    sameDayViewing: false,
    
    // Additional Services
    warranty: false,
    extendedWarranty: false,
    roadside: false,
    deliveryAvailable: false,
    pickupService: false,
    
    // Parts specific
    brand: "all",
    partCategory: "all",
    partCondition: "",
    inStock: false,
    
    // Services specific
    serviceType: "",
    certified: false,
    serviceWarranty: false,
    minRating: 0
  });

  const handleFilterChange = (key: string, value: any) => {
    try {
      setFilters(prev => ({ ...prev, [key]: value }));
    } catch (error) {
      console.error("Filter change error:", error);
    }
  };

  const clearAllFilters = () => {
    try {
      setFilters({
        search: "",
        location: "",
        minPrice: 0,
        maxPrice: category === "vehicles" ? 50000000 : category === "services" ? 50000 : 100000,
        priceNegotiable: false,
        leasingAvailable: false,
        financingAvailable: false,
        tradeInAccepted: false,
        emiRange: "",
        make: "all",
        model: "",
        bodyType: "",
        condition: "",
        fuelType: "all",
        transmission: "",
        engineSize: "",
        engineType: "",
        drivetrain: "",
        turboCharged: false,
        yearFrom: "",
        yearTo: "",
        mileageFrom: "",
        mileageTo: "",
        previousOwners: "",
        doors: "",
        seatingCapacity: "",
        color: "",
        interiorColor: "",
        healthScore: [0, 100],
        inspectionCertificate: false,
        serviceHistory: false,
        accidentHistory: "",
        registrationYear: "",
        registrationProvince: "",
        importStatus: "",
        dutyPaid: false,
        insuranceType: "",
        registrationStatus: "",
        documentsComplete: false,
        airConditioning: false,
        climateControl: false,
        heatedSeats: false,
        sunroof: false,
        moonroof: false,
        powerWindows: false,
        centralLocking: false,
        bluetooth: false,
        androidAuto: false,
        appleCarPlay: false,
        navigationSystem: false,
        touchScreen: false,
        premiumSound: false,
        wirelessCharging: false,
        reverseCamera: false,
        parkingSensors: false,
        blindSpotMonitoring: false,
        abs: false,
        airbags: false,
        airbagCount: "",
        stabilityControl: false,
        tractionControl: false,
        leatherSeats: false,
        fabricSeats: false,
        alloyWheels: false,
        runningBoards: false,
        spoiler: false,
        tintedWindows: false,
        powerSteering: false,
        cruiseControl: false,
        paddleShifters: false,
        sportMode: false,
        ecoMode: false,
        sellerType: "",
        verifiedSeller: false,
        quickResponse: false,
        homeInspection: false,
        testDriveAvailable: false,
        virtualTour: false,
        sameDayViewing: false,
        warranty: false,
        extendedWarranty: false,
        roadside: false,
        deliveryAvailable: false,
        pickupService: false,
        brand: "all",
        partCategory: "all",
        partCondition: "",
        inStock: false,
        serviceType: "",
        certified: false,
        serviceWarranty: false,
        minRating: 0
      });
    } catch (error) {
      console.error("Clear filters error:", error);
    }
  };

  const applyFilters = () => {
    try {
      console.log("Applying comprehensive filters:", filters);
      onApplyFilters(filters);
      onClose();
    } catch (error) {
      console.error("Apply filters error:", error);
    }
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
            <h3 className="text-lg font-semibold text-primary">
              {category === "vehicles" ? "Vehicle Filters" : 
               category === "parts" ? "Parts Filters" : "Service Filters"}
            </h3>
            <button onClick={onClose} className="p-2 touch-manipulation">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto">
            
            {/* Search */}
            <FilterSection title="Search" defaultOpen icon={<Search className="w-4 h-4" />}>
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={
                      category === "vehicles" ? "Make, model, or keyword" :
                      category === "parts" ? "Part name or description" : "Service type or provider"
                    }
                    className="pl-10 h-12"
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                  />
                </div>
              </div>
            </FilterSection>

            {/* Price Range */}
            <FilterSection title="Price Range" icon={<DollarSign className="w-4 h-4" />}>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Price Range</Label>
                  <div className="mt-2">
                    <Slider
                      value={[filters.minPrice, filters.maxPrice]}
                      onValueChange={(value) => {
                        handleFilterChange("minPrice", value[0]);
                        handleFilterChange("maxPrice", value[1]);
                      }}
                      max={category === "vehicles" ? 50000000 : category === "services" ? 50000 : 100000}
                      step={category === "vehicles" ? 100000 : category === "services" ? 500 : 1000}
                      className="h-12"
                    />
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Rs. {filters.minPrice.toLocaleString()} - Rs. {filters.maxPrice.toLocaleString()}
                  </div>
                </div>

                {category === "vehicles" && (
                  <>
                    <div>
                      <Label className="text-sm font-medium">EMI Range (Monthly)</Label>
                      <Select value={filters.emiRange} onValueChange={(value) => handleFilterChange("emiRange", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Any EMI" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any EMI</SelectItem>
                          <SelectItem value="under-25k">Under Rs. 25,000</SelectItem>
                          <SelectItem value="25k-50k">Rs. 25,000 - 50,000</SelectItem>
                          <SelectItem value="50k-75k">Rs. 50,000 - 75,000</SelectItem>
                          <SelectItem value="75k-100k">Rs. 75,000 - 100,000</SelectItem>
                          <SelectItem value="over-100k">Over Rs. 100,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="priceNegotiable"
                          checked={filters.priceNegotiable}
                          onCheckedChange={(checked) => handleFilterChange("priceNegotiable", checked)}
                        />
                        <label htmlFor="priceNegotiable" className="text-sm">Price Negotiable</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="financingAvailable"
                          checked={filters.financingAvailable}
                          onCheckedChange={(checked) => handleFilterChange("financingAvailable", checked)}
                        />
                        <label htmlFor="financingAvailable" className="text-sm">Financing Available</label>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </FilterSection>

            {/* Location */}
            <FilterSection title="Location" icon={<MapPin className="w-4 h-4" />}>
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
                    <SelectItem value="matara">Matara</SelectItem>
                    <SelectItem value="kurunegala">Kurunegala</SelectItem>
                    <SelectItem value="negombo">Negombo</SelectItem>
                    <SelectItem value="anuradhapura">Anuradhapura</SelectItem>
                    <SelectItem value="ratnapura">Ratnapura</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FilterSection>

            {/* Vehicle Specific Filters */}
            {category === "vehicles" && (
              <>
                <FilterSection title="Make & Model" icon={<Car className="w-4 h-4" />}>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Make</Label>
                      <Select value={filters.make} onValueChange={(value) => handleFilterChange("make", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="All Makes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Makes</SelectItem>
                          <SelectItem value="toyota">Toyota</SelectItem>
                          <SelectItem value="honda">Honda</SelectItem>
                          <SelectItem value="nissan">Nissan</SelectItem>
                          <SelectItem value="bmw">BMW</SelectItem>
                          <SelectItem value="mercedes-benz">Mercedes-Benz</SelectItem>
                          <SelectItem value="audi">Audi</SelectItem>
                          <SelectItem value="suzuki">Suzuki</SelectItem>
                          <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
                          <SelectItem value="mazda">Mazda</SelectItem>
                          <SelectItem value="hyundai">Hyundai</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Model</Label>
                      <Input
                        placeholder="Enter specific model"
                        className="h-12"
                        value={filters.model}
                        onChange={(e) => handleFilterChange("model", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Body Type</Label>
                      <Select value={filters.bodyType} onValueChange={(value) => handleFilterChange("bodyType", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Any Body Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any Body Type</SelectItem>
                          <SelectItem value="sedan">Sedan</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="hatchback">Hatchback</SelectItem>
                          <SelectItem value="coupe">Coupe</SelectItem>
                          <SelectItem value="wagon">Wagon</SelectItem>
                          <SelectItem value="pickup">Pickup Truck</SelectItem>
                          <SelectItem value="van">Van</SelectItem>
                          <SelectItem value="convertible">Convertible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </FilterSection>

                <FilterSection title="Engine & Performance" icon={<Cog className="w-4 h-4" />}>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Fuel Type</Label>
                      <Select value={filters.fuelType} onValueChange={(value) => handleFilterChange("fuelType", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="All Fuel Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Fuel Types</SelectItem>
                          <SelectItem value="petrol">Petrol</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                          <SelectItem value="cng">CNG</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Transmission</Label>
                      <Select value={filters.transmission} onValueChange={(value) => handleFilterChange("transmission", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Any Transmission" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any Transmission</SelectItem>
                          <SelectItem value="automatic">Automatic</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                          <SelectItem value="cvt">CVT</SelectItem>
                          <SelectItem value="semi-automatic">Semi-Automatic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Engine Size</Label>
                      <Select value={filters.engineSize} onValueChange={(value) => handleFilterChange("engineSize", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Any Engine Size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any Engine Size</SelectItem>
                          <SelectItem value="under-1000cc">Under 1000cc</SelectItem>
                          <SelectItem value="1000-1500cc">1000-1500cc</SelectItem>
                          <SelectItem value="1500-2000cc">1500-2000cc</SelectItem>
                          <SelectItem value="2000-2500cc">2000-2500cc</SelectItem>
                          <SelectItem value="over-2500cc">Over 2500cc</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Drivetrain</Label>
                      <Select value={filters.drivetrain} onValueChange={(value) => handleFilterChange("drivetrain", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Any Drivetrain" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any Drivetrain</SelectItem>
                          <SelectItem value="fwd">Front Wheel Drive (FWD)</SelectItem>
                          <SelectItem value="rwd">Rear Wheel Drive (RWD)</SelectItem>
                          <SelectItem value="awd">All Wheel Drive (AWD)</SelectItem>
                          <SelectItem value="4wd">4 Wheel Drive (4WD)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </FilterSection>

                <FilterSection title="Year & Mileage" icon={<Calendar className="w-4 h-4" />}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm font-medium">Year From</Label>
                        <Select value={filters.yearFrom} onValueChange={(value) => handleFilterChange("yearFrom", value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Any Year</SelectItem>
                            {Array.from({ length: 25 }, (_, i) => {
                              const year = 2024 - i;
                              return (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              );
                            })}
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
                            <SelectItem value="">Any Year</SelectItem>
                            {Array.from({ length: 25 }, (_, i) => {
                              const year = 2024 - i;
                              return (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm font-medium">Mileage From (km)</Label>
                        <Input
                          placeholder="e.g. 10000"
                          className="h-12"
                          value={filters.mileageFrom}
                          onChange={(e) => handleFilterChange("mileageFrom", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Mileage To (km)</Label>
                        <Input
                          placeholder="e.g. 100000"
                          className="h-12"
                          value={filters.mileageTo}
                          onChange={(e) => handleFilterChange("mileageTo", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </FilterSection>

                <FilterSection title="Health Score" icon={<Shield className="w-4 h-4" />}>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Health Score Range</Label>
                      <div className="mt-2">
                        <Slider
                          value={filters.healthScore}
                          onValueChange={(value) => handleFilterChange("healthScore", value)}
                          max={100}
                          step={5}
                          className="h-12"
                        />
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {filters.healthScore[0]}% - {filters.healthScore[1]}%
                      </div>
                    </div>
                  </div>
                </FilterSection>

                <FilterSection title="Safety Features">
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="abs"
                          checked={filters.abs}
                          onCheckedChange={(checked) => handleFilterChange("abs", checked)}
                        />
                        <label htmlFor="abs" className="text-sm">ABS</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="airbags"
                          checked={filters.airbags}
                          onCheckedChange={(checked) => handleFilterChange("airbags", checked)}
                        />
                        <label htmlFor="airbags" className="text-sm">Airbags</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="reverseCamera"
                          checked={filters.reverseCamera}
                          onCheckedChange={(checked) => handleFilterChange("reverseCamera", checked)}
                        />
                        <label htmlFor="reverseCamera" className="text-sm">Reverse Camera</label>
                      </div>
                    </div>
                  </div>
                </FilterSection>

                <FilterSection title="Comfort Features">
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="airConditioning"
                          checked={filters.airConditioning}
                          onCheckedChange={(checked) => handleFilterChange("airConditioning", checked)}
                        />
                        <label htmlFor="airConditioning" className="text-sm">Air Conditioning</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="bluetooth"
                          checked={filters.bluetooth}
                          onCheckedChange={(checked) => handleFilterChange("bluetooth", checked)}
                        />
                        <label htmlFor="bluetooth" className="text-sm">Bluetooth</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sunroof"
                          checked={filters.sunroof}
                          onCheckedChange={(checked) => handleFilterChange("sunroof", checked)}
                        />
                        <label htmlFor="sunroof" className="text-sm">Sunroof</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="leatherSeats"
                          checked={filters.leatherSeats}
                          onCheckedChange={(checked) => handleFilterChange("leatherSeats", checked)}
                        />
                        <label htmlFor="leatherSeats" className="text-sm">Leather Seats</label>
                      </div>
                    </div>
                  </div>
                </FilterSection>
              </>
            )}

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