import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, MapPin, DollarSign, Calendar, Fuel, Settings, BarChart3, Grid3x3, List, ArrowUpDown, Loader2, Heart, Car, Star, ChevronDown, ChevronUp, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import VehicleCard from "@/components/VehicleCard";
import ComparisonBar from "@/components/ComparisonBar";
import MobileFilterPanel from "@/components/MobileFilterPanel";
import HealthScoreBadge from "@/components/HealthScoreBadge";

interface ComparisonVehicle {
  id: string;
  title: string;
  price: number;
  image: string;
  healthScore: number;
}

interface Vehicle {
  id: string;
  title: string;
  price: number;
  year: number;
  mileage: number;
  location: string;
  fuelType: string;
  transmission: string;
  image: string;
  healthScore: number;
  sellerRating: number;
  isVerified: boolean;
  isFeatured: boolean;
  make?: string;
  model?: string;
  bodyType?: string;
  condition?: string;
  engineCapacity?: string;
  color?: string;
  doors?: number;
  drivetrain?: string;
  seatingCapacity?: number;
  // Enhanced properties for comprehensive filtering
  engineType?: string;
  turboCharged?: boolean;
  interiorColor?: string;
  previousOwners?: number;
  priceNegotiable?: boolean;
  financingAvailable?: boolean;
  leasingAvailable?: boolean;
  tradeInAccepted?: boolean;
  inspectionCertificate?: boolean;
  serviceHistory?: boolean;
  accidentHistory?: string;
  registrationYear?: string;
  registrationProvince?: string;
  importStatus?: string;
  dutyPaid?: boolean;
  insuranceType?: string;
  registrationStatus?: string;
  documentsComplete?: boolean;
  climateControl?: boolean;
  heatedSeats?: boolean;
  moonroof?: boolean;
  powerWindows?: boolean;
  centralLocking?: boolean;
  androidAuto?: boolean;
  appleCarPlay?: boolean;
  navigationSystem?: boolean;
  touchScreen?: boolean;
  premiumSound?: boolean;
  wirelessCharging?: boolean;
  parkingSensors?: boolean;
  blindSpotMonitoring?: boolean;
  airbagCount?: number;
  stabilityControl?: boolean;
  tractionControl?: boolean;
  fabricSeats?: boolean;
  runningBoards?: boolean;
  spoiler?: boolean;
  tintedWindows?: boolean;
  cruiseControl?: boolean;
  paddleShifters?: boolean;
  sportMode?: boolean;
  ecoMode?: boolean;
  sellerType?: string;
  quickResponse?: boolean;
  homeInspection?: boolean;
  testDriveAvailable?: boolean;
  virtualTour?: boolean;
  sameDayViewing?: boolean;
  deliveryAvailable?: boolean;
  warranty?: boolean;
  extendedWarranty?: boolean;
  roadside?: boolean;
  pickupService?: boolean;
  // Features
  airConditioning?: boolean;
  bluetooth?: boolean;
  reverseCamera?: boolean;
  sunroof?: boolean;
  leatherSeats?: boolean;
  alloyWheels?: boolean;
  abs?: boolean;
  airbags?: boolean;
  powerSteering?: boolean;
}

interface Filters {
  search: string;
  make: string;
  model: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
  yearFrom: string;
  yearTo: string;
  location: string;
  condition: string;
  minPrice: number;
  maxPrice: number;
  mileageFrom: string;
  mileageTo: string;
  doors: string;
  drivetrain: string;
  color: string;
  engineSize: string;
  seatingCapacity: string;
  // Enhanced filter properties
  engineType: string;
  turboCharged: boolean;
  interiorColor: string;
  previousOwners: string;
  priceNegotiable: boolean;
  financingAvailable: boolean;
  leasingAvailable: boolean;
  tradeInAccepted: boolean;
  emiRange: string;
  inspectionCertificate: boolean;
  serviceHistory: boolean;
  accidentHistory: string;
  registrationYear: string;
  registrationProvince: string;
  importStatus: string;
  dutyPaid: boolean;
  insuranceType: string;
  registrationStatus: string;
  documentsComplete: boolean;
  climateControl: boolean;
  heatedSeats: boolean;
  moonroof: boolean;
  powerWindows: boolean;
  centralLocking: boolean;
  androidAuto: boolean;
  appleCarPlay: boolean;
  navigationSystem: boolean;
  touchScreen: boolean;
  premiumSound: boolean;
  wirelessCharging: boolean;
  parkingSensors: boolean;
  blindSpotMonitoring: boolean;
  airbagCount: string;
  stabilityControl: boolean;
  tractionControl: boolean;
  fabricSeats: boolean;
  runningBoards: boolean;
  spoiler: boolean;
  tintedWindows: boolean;
  cruiseControl: boolean;
  paddleShifters: boolean;
  sportMode: boolean;
  ecoMode: boolean;
  sellerType: string;
  verifiedSeller: boolean;
  quickResponse: boolean;
  homeInspection: boolean;
  testDriveAvailable: boolean;
  virtualTour: boolean;
  sameDayViewing: boolean;
  deliveryAvailable: boolean;
  warranty: boolean;
  extendedWarranty: boolean;
  roadside: boolean;
  pickupService: boolean;
  // Feature filters
  airConditioning: boolean;
  bluetooth: boolean;
  reverseCamera: boolean;
  sunroof: boolean;
  leatherSeats: boolean;
  alloyWheels: boolean;
  abs: boolean;
  airbags: boolean;
  powerSteering: boolean;
}

// Desktop Filter Section Component
interface DesktopFilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
}

const DesktopFilterSection = ({ title, children, defaultOpen = false, icon }: DesktopFilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-3 text-left"
      >
        <div className="flex items-center space-x-2">
          {icon && <span className="text-primary">{icon}</span>}
          <span className="font-medium text-primary text-sm">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
};

const SearchPage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comparisonList, setComparisonList] = useState<ComparisonVehicle[]>([]);
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
  
  const [filters, setFilters] = useState<Filters>({
    search: "",
    make: "all",
    model: "",
    bodyType: "any",
    fuelType: "all",
    transmission: "any",
    yearFrom: "",
    yearTo: "",
    location: "",
    condition: "any",
    minPrice: 0,
    maxPrice: 50000000,
    mileageFrom: "",
    mileageTo: "",
    doors: "any",
    drivetrain: "any",
    color: "any",
    engineSize: "any",
    seatingCapacity: "any",
    // Enhanced filter initial state
    engineType: "any",
    turboCharged: false,
    interiorColor: "any",
    previousOwners: "any",
    priceNegotiable: false,
    financingAvailable: false,
    leasingAvailable: false,
    tradeInAccepted: false,
    emiRange: "any",
    inspectionCertificate: false,
    serviceHistory: false,
    accidentHistory: "any",
    registrationYear: "any",
    registrationProvince: "any",
    importStatus: "any",
    dutyPaid: false,
    insuranceType: "any",
    registrationStatus: "any",
    documentsComplete: false,
    climateControl: false,
    heatedSeats: false,
    moonroof: false,
    powerWindows: false,
    centralLocking: false,
    androidAuto: false,
    appleCarPlay: false,
    navigationSystem: false,
    touchScreen: false,
    premiumSound: false,
    wirelessCharging: false,
    parkingSensors: false,
    blindSpotMonitoring: false,
    airbagCount: "any",
    stabilityControl: false,
    tractionControl: false,
    fabricSeats: false,
    runningBoards: false,
    spoiler: false,
    tintedWindows: false,
    cruiseControl: false,
    paddleShifters: false,
    sportMode: false,
    ecoMode: false,
    sellerType: "any",
    verifiedSeller: false,
    quickResponse: false,
    homeInspection: false,
    testDriveAvailable: false,
    virtualTour: false,
    sameDayViewing: false,
    deliveryAvailable: false,
    warranty: false,
    extendedWarranty: false,
    roadside: false,
    pickupService: false,
    airConditioning: false,
    bluetooth: false,
    reverseCamera: false,
    sunroof: false,
    leatherSeats: false,
    alloyWheels: false,
    abs: false,
    airbags: false,
    powerSteering: false
  });

  // Enhanced mock vehicle data with more properties (keeping your exact vehicles)
  const mockVehicles: Vehicle[] = [
    {
      id: "1",
      title: "BMW 3 Series 320i Sport Line",
      price: 12500000,
      year: 2020,
      mileage: 35000,
      location: "Colombo",
      fuelType: "Petrol",
      transmission: "Automatic",
      image: "/api/placeholder/400/300",
      healthScore: 92,
      sellerRating: 4.8,
      isVerified: true,
      isFeatured: true,
      make: "BMW",
      model: "3 Series",
      bodyType: "Sedan",
      condition: "Excellent",
      color: "White",
      doors: 4,
      drivetrain: "RWD",
      seatingCapacity: 5,
      // Enhanced properties
      engineCapacity: "2000",
      engineType: "4 Cylinder Turbo",
      turboCharged: true,
      interiorColor: "Black",
      previousOwners: 1,
      priceNegotiable: true,
      financingAvailable: true,
      leasingAvailable: true,
      tradeInAccepted: true,
      inspectionCertificate: true,
      serviceHistory: true,
      accidentHistory: "none",
      registrationYear: "2020",
      registrationProvince: "Western",
      importStatus: "reconditioned",
      dutyPaid: true,
      insuranceType: "comprehensive",
      registrationStatus: "registered",
      documentsComplete: true,
      climateControl: true,
      heatedSeats: true,
      powerWindows: true,
      centralLocking: true,
      androidAuto: true,
      appleCarPlay: true,
      navigationSystem: true,
      touchScreen: true,
      premiumSound: true,
      wirelessCharging: true,
      parkingSensors: true,
      blindSpotMonitoring: true,
      airbagCount: 6,
      stabilityControl: true,
      tractionControl: true,
      cruiseControl: true,
      paddleShifters: true,
      sportMode: true,
      ecoMode: true,
      sellerType: "dealer",
      quickResponse: true,
      homeInspection: true,
      testDriveAvailable: true,
      virtualTour: true,
      sameDayViewing: true,
      deliveryAvailable: true,
      warranty: true,
      extendedWarranty: true,
      roadside: true,
      pickupService: true,
      airConditioning: true,
      bluetooth: true,
      reverseCamera: true,
      sunroof: true,
      leatherSeats: true,
      alloyWheels: true,
      abs: true,
      airbags: true,
      powerSteering: true
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
      image: "/api/placeholder/400/300",
      healthScore: 88,
      sellerRating: 4.7,
      isVerified: true,
      isFeatured: false,
      make: "Toyota",
      model: "RAV4",
      bodyType: "SUV",
      condition: "Very Good",
      color: "Silver",
      doors: 5,
      drivetrain: "AWD",
      seatingCapacity: 5,
      // Enhanced properties
      engineCapacity: "2500",
      engineType: "4 Cylinder Hybrid",
      turboCharged: false,
      interiorColor: "Gray",
      previousOwners: 1,
      priceNegotiable: true,
      financingAvailable: true,
      leasingAvailable: false,
      tradeInAccepted: true,
      inspectionCertificate: true,
      serviceHistory: true,
      accidentHistory: "none",
      registrationYear: "2021",
      registrationProvince: "Central",
      importStatus: "imported",
      dutyPaid: true,
      insuranceType: "comprehensive",
      registrationStatus: "registered",
      documentsComplete: true,
      climateControl: true,
      heatedSeats: false,
      powerWindows: true,
      centralLocking: true,
      androidAuto: true,
      appleCarPlay: true,
      navigationSystem: true,
      touchScreen: true,
      premiumSound: false,
      wirelessCharging: false,
      parkingSensors: true,
      blindSpotMonitoring: true,
      airbagCount: 8,
      stabilityControl: true,
      tractionControl: true,
      fabricSeats: true,
      cruiseControl: true,
      paddleShifters: false,
      sportMode: false,
      ecoMode: true,
      sellerType: "showroom",
      quickResponse: true,
      homeInspection: false,
      testDriveAvailable: true,
      virtualTour: false,
      sameDayViewing: false,
      deliveryAvailable: true,
      warranty: true,
      extendedWarranty: false,
      roadside: false,
      pickupService: false,
      airConditioning: true,
      bluetooth: true,
      reverseCamera: true,
      sunroof: false,
      leatherSeats: false,
      alloyWheels: true,
      abs: true,
      airbags: true,
      powerSteering: true
    },
    {
      id: "3",
      title: "Honda Civic RS Turbo",
      price: 8900000,
      year: 2019,
      mileage: 58000,
      location: "Galle",
      fuelType: "Petrol",
      transmission: "CVT",
      image: "/api/placeholder/400/300",
      healthScore: 85,
      sellerRating: 4.6,
      isVerified: false,
      isFeatured: false,
      make: "Honda",
      model: "Civic",
      bodyType: "Sedan",
      condition: "Good",
      color: "Black",
      doors: 4,
      drivetrain: "FWD",
      seatingCapacity: 5,
      // Enhanced properties
      engineCapacity: "1500",
      engineType: "4 Cylinder Turbo",
      turboCharged: true,
      interiorColor: "Black",
      previousOwners: 2,
      priceNegotiable: true,
      financingAvailable: false,
      leasingAvailable: false,
      tradeInAccepted: false,
      inspectionCertificate: false,
      serviceHistory: true,
      accidentHistory: "minor",
      registrationYear: "2019",
      registrationProvince: "Southern",
      importStatus: "reconditioned",
      dutyPaid: true,
      insuranceType: "third-party",
      registrationStatus: "registered",
      documentsComplete: true,
      climateControl: false,
      heatedSeats: false,
      powerWindows: true,
      centralLocking: true,
      androidAuto: false,
      appleCarPlay: false,
      navigationSystem: false,
      touchScreen: true,
      premiumSound: false,
      wirelessCharging: false,
      parkingSensors: false,
      blindSpotMonitoring: false,
      airbagCount: 4,
      stabilityControl: true,
      tractionControl: true,
      fabricSeats: true,
      cruiseControl: false,
      paddleShifters: true,
      sportMode: true,
      ecoMode: true,
      sellerType: "private",
      quickResponse: false,
      homeInspection: false,
      testDriveAvailable: true,
      virtualTour: false,
      sameDayViewing: false,
      deliveryAvailable: false,
      warranty: false,
      extendedWarranty: false,
      roadside: false,
      pickupService: false,
      airConditioning: true,
      bluetooth: true,
      reverseCamera: false,
      sunroof: false,
      leatherSeats: false,
      alloyWheels: true,
      abs: true,
      airbags: true,
      powerSteering: true
    },
    {
      id: "4",
      title: "Mercedes-Benz C200 AMG Line",
      price: 18500000,
      year: 2022,
      mileage: 15000,
      location: "Colombo",
      fuelType: "Petrol",
      transmission: "Automatic",
      image: "/api/placeholder/400/300",
      healthScore: 96,
      sellerRating: 4.9,
      isVerified: true,
      isFeatured: true,
      make: "Mercedes-Benz",
      model: "C-Class",
      bodyType: "Sedan",
      condition: "Excellent",
      color: "Blue",
      doors: 4,
      drivetrain: "RWD",
      seatingCapacity: 5,
      // Enhanced properties
      engineCapacity: "2000",
      engineType: "4 Cylinder Turbo",
      turboCharged: true,
      interiorColor: "Red",
      previousOwners: 1,
      priceNegotiable: false,
      financingAvailable: true,
      leasingAvailable: true,
      tradeInAccepted: true,
      inspectionCertificate: true,
      serviceHistory: true,
      accidentHistory: "none",
      registrationYear: "2022",
      registrationProvince: "Western",
      importStatus: "imported",
      dutyPaid: true,
      insuranceType: "comprehensive",
      registrationStatus: "registered",
      documentsComplete: true,
      climateControl: true,
      heatedSeats: true,
      moonroof: false,
      powerWindows: true,
      centralLocking: true,
      androidAuto: true,
      appleCarPlay: true,
      navigationSystem: true,
      touchScreen: true,
      premiumSound: true,
      wirelessCharging: true,
      parkingSensors: true,
      blindSpotMonitoring: true,
      airbagCount: 10,
      stabilityControl: true,
      tractionControl: true,
      spoiler: true,
      tintedWindows: true,
      cruiseControl: true,
      paddleShifters: true,
      sportMode: true,
      ecoMode: true,
      sellerType: "dealer",
      quickResponse: true,
      homeInspection: true,
      testDriveAvailable: true,
      virtualTour: true,
      sameDayViewing: true,
      deliveryAvailable: true,
      warranty: true,
      extendedWarranty: true,
      roadside: true,
      pickupService: true,
      airConditioning: true,
      bluetooth: true,
      reverseCamera: true,
      sunroof: true,
      leatherSeats: true,
      alloyWheels: true,
      abs: true,
      airbags: true,
      powerSteering: true
    },
    {
      id: "5",
      title: "Nissan X-Trail 4WD",
      price: 9800000,
      year: 2018,
      mileage: 72000,
      location: "Negombo",
      fuelType: "Petrol",
      transmission: "Automatic",
      image: "/api/placeholder/400/300",
      healthScore: 78,
      sellerRating: 4.4,
      isVerified: false,
      isFeatured: false,
      make: "Nissan",
      model: "X-Trail",
      bodyType: "SUV",
      condition: "Good",
      color: "Gray",
      doors: 5,
      drivetrain: "4WD",
      seatingCapacity: 7,
      // Enhanced properties
      engineCapacity: "2500",
      engineType: "4 Cylinder",
      turboCharged: false,
      interiorColor: "Beige",
      previousOwners: 2,
      priceNegotiable: true,
      financingAvailable: true,
      leasingAvailable: false,
      tradeInAccepted: true,
      inspectionCertificate: true,
      serviceHistory: true,
      accidentHistory: "none",
      registrationYear: "2018",
      registrationProvince: "Western",
      importStatus: "reconditioned",
      dutyPaid: true,
      insuranceType: "comprehensive",
      registrationStatus: "registered",
      documentsComplete: true,
      climateControl: true,
      heatedSeats: false,
      powerWindows: true,
      centralLocking: true,
      androidAuto: false,
      appleCarPlay: false,
      navigationSystem: true,
      touchScreen: true,
      premiumSound: true,
      wirelessCharging: false,
      parkingSensors: true,
      blindSpotMonitoring: false,
      airbagCount: 6,
      stabilityControl: true,
      tractionControl: true,
      fabricSeats: true,
      runningBoards: true,
      cruiseControl: true,
      paddleShifters: false,
      sportMode: false,
      ecoMode: true,
      sellerType: "agent",
      quickResponse: true,
      homeInspection: true,
      testDriveAvailable: true,
      virtualTour: false,
      sameDayViewing: true,
      deliveryAvailable: true,
      warranty: false,
      extendedWarranty: true,
      roadside: false,
      pickupService: true,
      airConditioning: true,
      bluetooth: false,
      reverseCamera: false,
      sunroof: false,
      leatherSeats: false,
      alloyWheels: true,
      abs: true,
      airbags: true,
      powerSteering: true
    },
    {
      id: "6",
      title: "Audi A4 TFSI Quattro",
      price: 16200000,
      year: 2021,
      mileage: 22000,
      location: "Kandy",
      fuelType: "Petrol",
      transmission: "Automatic",
      image: "/api/placeholder/400/300",
      healthScore: 91,
      sellerRating: 4.7,
      isVerified: true,
      isFeatured: true,
      make: "Audi",
      model: "A4",
      bodyType: "Sedan",
      condition: "Excellent",
      color: "White",
      doors: 4,
      drivetrain: "AWD",
      seatingCapacity: 5,
      // Enhanced properties
      engineCapacity: "2000",
      engineType: "4 Cylinder Turbo",
      turboCharged: true,
      interiorColor: "Black",
      previousOwners: 1,
      priceNegotiable: true,
      financingAvailable: true,
      leasingAvailable: true,
      tradeInAccepted: true,
      inspectionCertificate: true,
      serviceHistory: true,
      accidentHistory: "none",
      registrationYear: "2021",
      registrationProvince: "Central",
      importStatus: "imported",
      dutyPaid: true,
      insuranceType: "comprehensive",
      registrationStatus: "registered",
      documentsComplete: true,
      climateControl: true,
      heatedSeats: true,
      powerWindows: true,
      centralLocking: true,
      androidAuto: true,
      appleCarPlay: true,
      navigationSystem: true,
      touchScreen: true,
      premiumSound: true,
      wirelessCharging: true,
      parkingSensors: true,
      blindSpotMonitoring: true,
      airbagCount: 8,
      stabilityControl: true,
      tractionControl: true,
      cruiseControl: true,
      paddleShifters: true,
      sportMode: true,
      ecoMode: true,
      sellerType: "dealer",
      quickResponse: true,
      homeInspection: true,
      testDriveAvailable: true,
      virtualTour: true,
      sameDayViewing: true,
      deliveryAvailable: true,
      warranty: true,
      extendedWarranty: true,
      roadside: true,
      pickupService: true,
      airConditioning: true,
      bluetooth: true,
      reverseCamera: true,
      sunroof: true,
      leatherSeats: true,
      alloyWheels: true,
      abs: true,
      airbags: true,
      powerSteering: true
    }
  ];

  // Load mock data
  useEffect(() => {
    const loadVehicles = async () => {
      setLoading(true);
      setError(null);
      
      setTimeout(() => {
        try {
          setVehicles(mockVehicles);
          setLoading(false);
        } catch (err) {
          setError("Failed to load vehicles");
          setLoading(false);
        }
      }, 800);
    };

    loadVehicles();
  }, []);

  // Enhanced filter and sort vehicles
  useEffect(() => {
    let filtered = [...vehicles];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(vehicle =>
        vehicle.title.toLowerCase().includes(searchTerm) ||
        (vehicle.make && vehicle.make.toLowerCase().includes(searchTerm)) ||
        (vehicle.model && vehicle.model.toLowerCase().includes(searchTerm)) ||
        vehicle.location.toLowerCase().includes(searchTerm)
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(vehicle => 
        vehicle.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Make filter
    if (filters.make && filters.make !== "all") {
      filtered = filtered.filter(vehicle => 
        vehicle.make && vehicle.make.toLowerCase() === filters.make.toLowerCase()
      );
    }

    // Model filter
    if (filters.model) {
      filtered = filtered.filter(vehicle => 
        vehicle.model && vehicle.model.toLowerCase().includes(filters.model.toLowerCase())
      );
    }

    // Body type filter
    if (filters.bodyType && filters.bodyType !== "any") {
      filtered = filtered.filter(vehicle => 
        vehicle.bodyType && vehicle.bodyType.toLowerCase() === filters.bodyType.toLowerCase()
      );
    }

    // Fuel type filter
    if (filters.fuelType && filters.fuelType !== "all") {
      filtered = filtered.filter(vehicle => 
        vehicle.fuelType.toLowerCase() === filters.fuelType.toLowerCase()
      );
    }

    // Transmission filter
    if (filters.transmission && filters.transmission !== "any") {
      filtered = filtered.filter(vehicle => 
        vehicle.transmission.toLowerCase() === filters.transmission.toLowerCase()
      );
    }

    // Engine size filter
    if (filters.engineSize && filters.engineSize !== "any") {
      filtered = filtered.filter(vehicle => {
        const engineCC = parseInt(vehicle.engineCapacity || "0");
        switch (filters.engineSize) {
          case "under-1000cc":
            return engineCC < 1000;
          case "1000-1500cc":
            return engineCC >= 1000 && engineCC <= 1500;
          case "1500-2000cc":
            return engineCC >= 1500 && engineCC <= 2000;
          case "2000-2500cc":
            return engineCC >= 2000 && engineCC <= 2500;
          case "over-2500cc":
            return engineCC > 2500;
          default:
            return true;
        }
      });
    }

    // Drivetrain filter
    if (filters.drivetrain && filters.drivetrain !== "any") {
      filtered = filtered.filter(vehicle => 
        vehicle.drivetrain && vehicle.drivetrain.toLowerCase() === filters.drivetrain.toLowerCase()
      );
    }

    // Year range filter
    if (filters.yearFrom) {
      filtered = filtered.filter(vehicle => 
        vehicle.year >= parseInt(filters.yearFrom)
      );
    }
    if (filters.yearTo) {
      filtered = filtered.filter(vehicle => 
        vehicle.year <= parseInt(filters.yearTo)
      );
    }

    // Mileage range filter
    if (filters.mileageFrom) {
      filtered = filtered.filter(vehicle => 
        vehicle.mileage >= parseInt(filters.mileageFrom)
      );
    }
    if (filters.mileageTo) {
      filtered = filtered.filter(vehicle => 
        vehicle.mileage <= parseInt(filters.mileageTo)
      );
    }

    // Condition filter
    if (filters.condition && filters.condition !== "any") {
      filtered = filtered.filter(vehicle => 
        vehicle.condition && vehicle.condition.toLowerCase() === filters.condition.toLowerCase()
      );
    }

    // Price range filter
    filtered = filtered.filter(vehicle => 
      vehicle.price >= filters.minPrice && vehicle.price <= filters.maxPrice
    );

    // Color filter
    if (filters.color && filters.color !== "any") {
      filtered = filtered.filter(vehicle => 
        vehicle.color && vehicle.color.toLowerCase() === filters.color.toLowerCase()
      );
    }

    // Doors filter
    if (filters.doors && filters.doors !== "any") {
      filtered = filtered.filter(vehicle => 
        vehicle.doors && vehicle.doors.toString() === filters.doors
      );
    }

    // Seating capacity filter
    if (filters.seatingCapacity && filters.seatingCapacity !== "any") {
      filtered = filtered.filter(vehicle => 
        vehicle.seatingCapacity && vehicle.seatingCapacity.toString() === filters.seatingCapacity
      );
    }

    // Financial filters
    if (filters.priceNegotiable) {
      filtered = filtered.filter(vehicle => vehicle.priceNegotiable);
    }
    if (filters.financingAvailable) {
      filtered = filtered.filter(vehicle => vehicle.financingAvailable);
    }
    if (filters.leasingAvailable) {
      filtered = filtered.filter(vehicle => vehicle.leasingAvailable);
    }

    // Feature filters
    if (filters.airConditioning) {
      filtered = filtered.filter(vehicle => vehicle.airConditioning);
    }
    if (filters.bluetooth) {
      filtered = filtered.filter(vehicle => vehicle.bluetooth);
    }
    if (filters.reverseCamera) {
      filtered = filtered.filter(vehicle => vehicle.reverseCamera);
    }
    if (filters.sunroof) {
      filtered = filtered.filter(vehicle => vehicle.sunroof);
    }
    if (filters.leatherSeats) {
      filtered = filtered.filter(vehicle => vehicle.leatherSeats);
    }
    if (filters.alloyWheels) {
      filtered = filtered.filter(vehicle => vehicle.alloyWheels);
    }
    if (filters.abs) {
      filtered = filtered.filter(vehicle => vehicle.abs);
    }
    if (filters.airbags) {
      filtered = filtered.filter(vehicle => vehicle.airbags);
    }
    if (filters.powerSteering) {
      filtered = filtered.filter(vehicle => vehicle.powerSteering);
    }

    // Additional enhanced filters
    if (filters.turboCharged) {
      filtered = filtered.filter(vehicle => vehicle.turboCharged);
    }
    if (filters.androidAuto) {
      filtered = filtered.filter(vehicle => vehicle.androidAuto);
    }
    if (filters.appleCarPlay) {
      filtered = filtered.filter(vehicle => vehicle.appleCarPlay);
    }
    if (filters.parkingSensors) {
      filtered = filtered.filter(vehicle => vehicle.parkingSensors);
    }
    if (filters.cruiseControl) {
      filtered = filtered.filter(vehicle => vehicle.cruiseControl);
    }
    if (filters.verifiedSeller) {
      filtered = filtered.filter(vehicle => vehicle.isVerified);
    }
    if (filters.warranty) {
      filtered = filtered.filter(vehicle => vehicle.warranty);
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "year-new":
        filtered.sort((a, b) => b.year - a.year);
        break;
      case "mileage-low":
        filtered.sort((a, b) => a.mileage - b.mileage);
        break;
      case "health-score":
        filtered.sort((a, b) => b.healthScore - a.healthScore);
        break;
      case "rating":
        filtered.sort((a, b) => b.sellerRating - a.sellerRating);
        break;
      default:
        // Keep relevance order, but prioritize featured vehicles
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return 0;
        });
        break;
    }

    setFilteredVehicles(filtered);
  }, [vehicles, filters, sortBy]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Enhanced handleApplyFilters to handle all filter types
  const handleApplyFilters = (newFilters: any) => {
    console.log("Applying filters:", newFilters);
    
    try {
      // Create updated filters object, preserving existing structure
      const updatedFilters = { ...filters };
      
      // Basic filters
      if (newFilters.search !== undefined) {
        updatedFilters.search = newFilters.search;
      }
      
      if (newFilters.location !== undefined) {
        updatedFilters.location = newFilters.location;
      }
      
      // Vehicle identification
      if (newFilters.make !== undefined) {
        updatedFilters.make = newFilters.make === "" ? "all" : newFilters.make;
      }
      
      if (newFilters.model !== undefined) {
        updatedFilters.model = newFilters.model;
      }
      
      if (newFilters.bodyType !== undefined) {
        updatedFilters.bodyType = newFilters.bodyType === "" ? "any" : newFilters.bodyType;
      }
      
      // Engine and drivetrain
      if (newFilters.fuelType !== undefined) {
        updatedFilters.fuelType = newFilters.fuelType === "" ? "all" : newFilters.fuelType;
      }
      
      if (newFilters.transmission !== undefined) {
        updatedFilters.transmission = newFilters.transmission === "" ? "any" : newFilters.transmission;
      }
      
      if (newFilters.drivetrain !== undefined) {
        updatedFilters.drivetrain = newFilters.drivetrain === "" ? "any" : newFilters.drivetrain;
      }
      
      if (newFilters.engineSize !== undefined) {
        updatedFilters.engineSize = newFilters.engineSize === "" ? "any" : newFilters.engineSize;
      }
      
      // Vehicle details
      if (newFilters.condition !== undefined) {
        updatedFilters.condition = newFilters.condition === "" ? "any" : newFilters.condition;
      }
      
      if (newFilters.color !== undefined) {
        updatedFilters.color = newFilters.color === "" ? "any" : newFilters.color;
      }
      
      if (newFilters.doors !== undefined) {
        updatedFilters.doors = newFilters.doors === "" ? "any" : newFilters.doors;
      }
      
      if (newFilters.seatingCapacity !== undefined) {
        updatedFilters.seatingCapacity = newFilters.seatingCapacity === "" ? "any" : newFilters.seatingCapacity;
      }
      
      // Year range
      if (newFilters.yearFrom !== undefined) {
        updatedFilters.yearFrom = newFilters.yearFrom;
      }
      
      if (newFilters.yearTo !== undefined) {
        updatedFilters.yearTo = newFilters.yearTo;
      }
      
      // Mileage range
      if (newFilters.mileageFrom !== undefined) {
        updatedFilters.mileageFrom = newFilters.mileageFrom;
      }
      
      if (newFilters.mileageTo !== undefined) {
        updatedFilters.mileageTo = newFilters.mileageTo;
      }
      
      // Price range
      if (newFilters.minPrice !== undefined) {
        updatedFilters.minPrice = newFilters.minPrice;
      }
      
      if (newFilters.maxPrice !== undefined) {
        updatedFilters.maxPrice = newFilters.maxPrice;
      }

      // Financial filters
      if (newFilters.priceNegotiable !== undefined) {
        updatedFilters.priceNegotiable = Boolean(newFilters.priceNegotiable);
      }
      if (newFilters.financingAvailable !== undefined) {
        updatedFilters.financingAvailable = Boolean(newFilters.financingAvailable);
      }
      if (newFilters.leasingAvailable !== undefined) {
        updatedFilters.leasingAvailable = Boolean(newFilters.leasingAvailable);
      }
      
      // Feature filters - handle boolean values properly
      const featureFilters = [
        'airConditioning', 'bluetooth', 'reverseCamera', 'sunroof', 
        'leatherSeats', 'alloyWheels', 'abs', 'airbags', 'powerSteering',
        'turboCharged', 'androidAuto', 'appleCarPlay', 'parkingSensors',
        'cruiseControl', 'verifiedSeller', 'warranty'
      ];
      
      featureFilters.forEach(feature => {
        if (newFilters[feature] !== undefined) {
          updatedFilters[feature] = Boolean(newFilters[feature]);
        }
      });
      
      // Apply the updated filters
      setFilters(updatedFilters);
      console.log("Updated filters successfully:", updatedFilters);
      
    } catch (error) {
      console.error("Error applying filters:", error);
      // Don't crash the app, just log the error
    }
  };

  const clearAllFilters = () => {
    const clearedFilters: Filters = {
      search: "",
      make: "all",
      model: "",
      bodyType: "any",
      fuelType: "all",
      transmission: "any",
      yearFrom: "",
      yearTo: "",
      location: "",
      condition: "any",
      minPrice: 0,
      maxPrice: 50000000,
      mileageFrom: "",
      mileageTo: "",
      doors: "any",
      drivetrain: "any",
      color: "any",
      engineSize: "any",
      seatingCapacity: "any",
      engineType: "any",
      turboCharged: false,
      interiorColor: "any",
      previousOwners: "any",
      priceNegotiable: false,
      financingAvailable: false,
      leasingAvailable: false,
      tradeInAccepted: false,
      emiRange: "any",
      inspectionCertificate: false,
      serviceHistory: false,
      accidentHistory: "any",
      registrationYear: "any",
      registrationProvince: "any",
      importStatus: "any",
      dutyPaid: false,
      insuranceType: "any",
      registrationStatus: "any",
      documentsComplete: false,
      climateControl: false,
      heatedSeats: false,
      moonroof: false,
      powerWindows: false,
      centralLocking: false,
      androidAuto: false,
      appleCarPlay: false,
      navigationSystem: false,
      touchScreen: false,
      premiumSound: false,
      wirelessCharging: false,
      parkingSensors: false,
      blindSpotMonitoring: false,
      airbagCount: "any",
      stabilityControl: false,
      tractionControl: false,
      fabricSeats: false,
      runningBoards: false,
      spoiler: false,
      tintedWindows: false,
      cruiseControl: false,
      paddleShifters: false,
      sportMode: false,
      ecoMode: false,
      sellerType: "any",
      verifiedSeller: false,
      quickResponse: false,
      homeInspection: false,
      testDriveAvailable: false,
      virtualTour: false,
      sameDayViewing: false,
      deliveryAvailable: false,
      warranty: false,
      extendedWarranty: false,
      roadside: false,
      pickupService: false,
      airConditioning: false,
      bluetooth: false,
      reverseCamera: false,
      sunroof: false,
      leatherSeats: false,
      alloyWheels: false,
      abs: false,
      airbags: false,
      powerSteering: false
    };
    setFilters(clearedFilters);
  };

  const handleAddToComparison = (vehicle: Vehicle) => {
    if (comparisonList.length >= 3) {
      alert("You can compare up to 3 vehicles only");
      return;
    }
    
    const comparisonVehicle: ComparisonVehicle = {
      id: vehicle.id,
      title: vehicle.title,
      price: vehicle.price,
      image: vehicle.image,
      healthScore: vehicle.healthScore
    };
    
    setComparisonList([...comparisonList, comparisonVehicle]);
  };

  const handleRemoveFromComparison = (id: string) => {
    setComparisonList(comparisonList.filter(v => v.id !== id));
  };

  const handleSave = (id: string) => {
    console.log("Saved vehicle:", id);
  };

  const handleContact = (id: string) => {
    console.log("Contact seller for vehicle:", id);
  };

  const handleVehicleClick = (id: string) => {
    navigate(`/vehicle/${id}`);
  };

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Vehicles</h2>
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
          {/* Desktop Sidebar Filters - Enhanced with comprehensive filters */}
          <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-4">
              <Card className="shadow-sm">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-primary">Search Filters</h3>
                </div>
                <div className="p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                  
                  {/* Search */}
                  <DesktopFilterSection title="Search" defaultOpen icon={<Search className="w-4 h-4" />}>
                    <div className="space-y-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Make, model, or keyword"
                          className="pl-10"
                          value={filters.search}
                          onChange={(e) => handleFilterChange("search", e.target.value)}
                        />
                      </div>
                    </div>
                  </DesktopFilterSection>

                  {/* Make & Model */}
                  <DesktopFilterSection title="Make & Model" icon={<Car className="w-4 h-4" />}>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Make</label>
                        <Select value={filters.make} onValueChange={(value) => handleFilterChange("make", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="All Makes" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Makes</SelectItem>
                            <SelectItem value="bmw">BMW</SelectItem>
                            <SelectItem value="toyota">Toyota</SelectItem>
                            <SelectItem value="honda">Honda</SelectItem>
                            <SelectItem value="mercedes-benz">Mercedes-Benz</SelectItem>
                            <SelectItem value="audi">Audi</SelectItem>
                            <SelectItem value="nissan">Nissan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Model</label>
                        <Input
                          placeholder="Enter model"
                          value={filters.model}
                          onChange={(e) => handleFilterChange("model", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Body Type</label>
                        <Select value={filters.bodyType} onValueChange={(value) => handleFilterChange("bodyType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any Body Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any Body Type</SelectItem>
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
                  </DesktopFilterSection>

                  {/* Price Range */}
                  <DesktopFilterSection title="Price Range" icon={<DollarSign className="w-4 h-4" />}>
                    <div className="space-y-3">
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
                          onChange={(e) => handleFilterChange("maxPrice", parseInt(e.target.value) || 50000000)}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Rs. {filters.minPrice.toLocaleString()} - Rs. {filters.maxPrice.toLocaleString()}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="priceNegotiable"
                            checked={filters.priceNegotiable}
                            onCheckedChange={(checked) => handleFilterChange("priceNegotiable", checked)}
                          />
                          <Label htmlFor="priceNegotiable" className="text-sm">Price Negotiable</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="financingAvailable"
                            checked={filters.financingAvailable}
                            onCheckedChange={(checked) => handleFilterChange("financingAvailable", checked)}
                          />
                          <Label htmlFor="financingAvailable" className="text-sm">Financing Available</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="leasingAvailable"
                            checked={filters.leasingAvailable}
                            onCheckedChange={(checked) => handleFilterChange("leasingAvailable", checked)}
                          />
                          <Label htmlFor="leasingAvailable" className="text-sm">Leasing Available</Label>
                        </div>
                      </div>
                    </div>
                  </DesktopFilterSection>

                  {/* Engine & Performance */}
                  <DesktopFilterSection title="Engine & Performance" icon={<Cog className="w-4 h-4" />}>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Fuel Type</label>
                        <Select value={filters.fuelType} onValueChange={(value) => handleFilterChange("fuelType", value)}>
                          <SelectTrigger>
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
                        <label className="text-sm font-medium">Transmission</label>
                        <Select value={filters.transmission} onValueChange={(value) => handleFilterChange("transmission", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any Transmission" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any Transmission</SelectItem>
                            <SelectItem value="automatic">Automatic</SelectItem>
                            <SelectItem value="manual">Manual</SelectItem>
                            <SelectItem value="cvt">CVT</SelectItem>
                            <SelectItem value="semi-automatic">Semi-Automatic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Engine Size</label>
                        <Select value={filters.engineSize} onValueChange={(value) => handleFilterChange("engineSize", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any Engine Size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any Engine Size</SelectItem>
                            <SelectItem value="under-1000cc">Under 1000cc</SelectItem>
                            <SelectItem value="1000-1500cc">1000-1500cc</SelectItem>
                            <SelectItem value="1500-2000cc">1500-2000cc</SelectItem>
                            <SelectItem value="2000-2500cc">2000-2500cc</SelectItem>
                            <SelectItem value="over-2500cc">Over 2500cc</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Drivetrain</label>
                        <Select value={filters.drivetrain} onValueChange={(value) => handleFilterChange("drivetrain", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any Drivetrain" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any Drivetrain</SelectItem>
                            <SelectItem value="fwd">Front Wheel Drive (FWD)</SelectItem>
                            <SelectItem value="rwd">Rear Wheel Drive (RWD)</SelectItem>
                            <SelectItem value="awd">All Wheel Drive (AWD)</SelectItem>
                            <SelectItem value="4wd">4 Wheel Drive (4WD)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="turboCharged"
                          checked={filters.turboCharged}
                          onCheckedChange={(checked) => handleFilterChange("turboCharged", checked)}
                        />
                        <Label htmlFor="turboCharged" className="text-sm">Turbo Charged</Label>
                      </div>
                    </div>
                  </DesktopFilterSection>

                  {/* Year & Mileage */}
                  <DesktopFilterSection title="Year & Mileage" icon={<Calendar className="w-4 h-4" />}>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Year</label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            type="number"
                            placeholder="From"
                            value={filters.yearFrom}
                            onChange={(e) => handleFilterChange("yearFrom", e.target.value)}
                          />
                          <Input
                            type="number"
                            placeholder="To"
                            value={filters.yearTo}
                            onChange={(e) => handleFilterChange("yearTo", e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Mileage (km)</label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            type="number"
                            placeholder="From"
                            value={filters.mileageFrom}
                            onChange={(e) => handleFilterChange("mileageFrom", e.target.value)}
                          />
                          <Input
                            type="number"
                            placeholder="To"
                            value={filters.mileageTo}
                            onChange={(e) => handleFilterChange("mileageTo", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </DesktopFilterSection>

                  {/* Vehicle Details */}
                  <DesktopFilterSection title="Vehicle Details">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Condition</label>
                        <Select value={filters.condition} onValueChange={(value) => handleFilterChange("condition", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any Condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any Condition</SelectItem>
                            <SelectItem value="excellent">Excellent</SelectItem>
                            <SelectItem value="very good">Very Good</SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="fair">Fair</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-sm font-medium">Doors</label>
                          <Select value={filters.doors} onValueChange={(value) => handleFilterChange("doors", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Any" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="any">Any</SelectItem>
                              <SelectItem value="2">2 Doors</SelectItem>
                              <SelectItem value="4">4 Doors</SelectItem>
                              <SelectItem value="5">5 Doors</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Seats</label>
                          <Select value={filters.seatingCapacity} onValueChange={(value) => handleFilterChange("seatingCapacity", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Any" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="any">Any</SelectItem>
                              <SelectItem value="2">2 Seats</SelectItem>
                              <SelectItem value="5">5 Seats</SelectItem>
                              <SelectItem value="7">7 Seats</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Color</label>
                        <Select value={filters.color} onValueChange={(value) => handleFilterChange("color", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any Color" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any Color</SelectItem>
                            <SelectItem value="white">White</SelectItem>
                            <SelectItem value="black">Black</SelectItem>
                            <SelectItem value="silver">Silver</SelectItem>
                            <SelectItem value="gray">Gray</SelectItem>
                            <SelectItem value="blue">Blue</SelectItem>
                            <SelectItem value="red">Red</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </DesktopFilterSection>

                  {/* Location */}
                  <DesktopFilterSection title="Location" icon={<MapPin className="w-4 h-4" />}>
                    <div className="space-y-2">
                      <Input
                        placeholder="City or area"
                        value={filters.location}
                        onChange={(e) => handleFilterChange("location", e.target.value)}
                      />
                    </div>
                  </DesktopFilterSection>

                  {/* Features */}
                  <DesktopFilterSection title="Key Features">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="airConditioning"
                          checked={filters.airConditioning}
                          onCheckedChange={(checked) => handleFilterChange("airConditioning", checked)}
                        />
                        <Label htmlFor="airConditioning" className="text-sm">Air Conditioning</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="bluetooth"
                          checked={filters.bluetooth}
                          onCheckedChange={(checked) => handleFilterChange("bluetooth", checked)}
                        />
                        <Label htmlFor="bluetooth" className="text-sm">Bluetooth</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="reverseCamera"
                          checked={filters.reverseCamera}
                          onCheckedChange={(checked) => handleFilterChange("reverseCamera", checked)}
                        />
                        <Label htmlFor="reverseCamera" className="text-sm">Reverse Camera</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sunroof"
                          checked={filters.sunroof}
                          onCheckedChange={(checked) => handleFilterChange("sunroof", checked)}
                        />
                        <Label htmlFor="sunroof" className="text-sm">Sunroof</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="leatherSeats"
                          checked={filters.leatherSeats}
                          onCheckedChange={(checked) => handleFilterChange("leatherSeats", checked)}
                        />
                        <Label htmlFor="leatherSeats" className="text-sm">Leather Seats</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="alloyWheels"
                          checked={filters.alloyWheels}
                          onCheckedChange={(checked) => handleFilterChange("alloyWheels", checked)}
                        />
                        <Label htmlFor="alloyWheels" className="text-sm">Alloy Wheels</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="androidAuto"
                          checked={filters.androidAuto}
                          onCheckedChange={(checked) => handleFilterChange("androidAuto", checked)}
                        />
                        <Label htmlFor="androidAuto" className="text-sm">Android Auto</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="appleCarPlay"
                          checked={filters.appleCarPlay}
                          onCheckedChange={(checked) => handleFilterChange("appleCarPlay", checked)}
                        />
                        <Label htmlFor="appleCarPlay" className="text-sm">Apple CarPlay</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="parkingSensors"
                          checked={filters.parkingSensors}
                          onCheckedChange={(checked) => handleFilterChange("parkingSensors", checked)}
                        />
                        <Label htmlFor="parkingSensors" className="text-sm">Parking Sensors</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="cruiseControl"
                          checked={filters.cruiseControl}
                          onCheckedChange={(checked) => handleFilterChange("cruiseControl", checked)}
                        />
                        <Label htmlFor="cruiseControl" className="text-sm">Cruise Control</Label>
                      </div>
                    </div>
                  </DesktopFilterSection>

                  {/* Seller & Services */}
                  <DesktopFilterSection title="Seller & Services">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="verifiedSeller"
                          checked={filters.verifiedSeller}
                          onCheckedChange={(checked) => handleFilterChange("verifiedSeller", checked)}
                        />
                        <Label htmlFor="verifiedSeller" className="text-sm">Verified Seller</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="warranty"
                          checked={filters.warranty}
                          onCheckedChange={(checked) => handleFilterChange("warranty", checked)}
                        />
                        <Label htmlFor="warranty" className="text-sm">Warranty Included</Label>
                      </div>
                    </div>
                  </DesktopFilterSection>

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

          {/* Main Content - Keeping exactly the same */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-primary">Search Vehicles</h1>
                <p className="text-muted-foreground">
                  {loading ? "Loading..." : `${filteredVehicles.length} vehicles found`}
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
                    <SelectItem value="year-new">Year: Newest First</SelectItem>
                    <SelectItem value="mileage-low">Mileage: Low to High</SelectItem>
                    <SelectItem value="health-score">Health Score</SelectItem>
                    <SelectItem value="rating">Seller Rating</SelectItem>
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
                    <SelectItem value="year-new">Year ↓</SelectItem>
                    <SelectItem value="health-score">Health Score</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Loading vehicles...</span>
              </div>
            )}

            {/* Results */}
            {!loading && (
              <>
                {filteredVehicles.length === 0 ? (
                  <div className="text-center py-12">
                    <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No vehicles found</h3>
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
                    {filteredVehicles.map((vehicle) => (
                      viewMode === "grid" && !isMobile ? (
                        <VehicleCard
                          key={vehicle.id}
                          vehicle={vehicle}
                          onSave={() => handleSave(vehicle.id)}
                          onCompare={() => handleAddToComparison(vehicle)}
                          isSaved={false}
                        />
                      ) : (
                        <Card
                          key={vehicle.id}
                          className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
                          onClick={() => handleVehicleClick(vehicle.id)}
                        >
                          <div className="flex flex-col sm:flex-row">
                            <div className="relative w-full sm:w-48 h-48 sm:h-32 flex-shrink-0">
                              <img
                                src={vehicle.image}
                                alt={vehicle.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 left-2">
                                <HealthScoreBadge score={vehicle.healthScore} />
                              </div>
                              {vehicle.isFeatured && (
                                <div className="absolute top-2 right-2">
                                  <Badge className="bg-highlight text-white">Featured</Badge>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1 p-4 flex flex-col justify-between">
                              <div>
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                                  <h3 className="text-lg font-semibold text-primary mb-1 sm:mb-0">
                                    {vehicle.title}
                                  </h3>
                                  <p className="text-xl font-bold text-primary">
                                    {formatPrice(vehicle.price)}
                                  </p>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 mb-3">
                                  <Badge variant="secondary" className="text-xs">{vehicle.year}</Badge>
                                  <Badge variant="outline" className="text-xs">{vehicle.fuelType}</Badge>
                                  <Badge variant="outline" className="text-xs">{vehicle.transmission}</Badge>
                                  {vehicle.isVerified && <Badge className="bg-success text-xs">✓ Verified</Badge>}
                                </div>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex flex-col space-y-1 mb-3 sm:mb-0">
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span>{vehicle.location}</span>
                                    <span className="mx-2">•</span>
                                    <span>{vehicle.mileage.toLocaleString()} km</span>
                                  </div>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                                    <span>{vehicle.sellerRating}</span>
                                  </div>
                                </div>
                                
                                <div className="flex space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSave(vehicle.id);
                                    }}
                                  >
                                    <Heart className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAddToComparison(vehicle);
                                    }}
                                    disabled={comparisonList.some(v => v.id === vehicle.id)}
                                  >
                                    <BarChart3 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      )
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
        resultCount={filteredVehicles.length}
        category="vehicles"
      />

      {/* Comparison Bar */}
      <ComparisonBar
        selectedVehicles={comparisonList}
        onRemove={handleRemoveFromComparison}
        onCompare={() => navigate("/compare")}
        onClear={() => setComparisonList([])}
      />
    </div>
  );
};

export default SearchPage;