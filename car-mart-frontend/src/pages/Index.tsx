import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VehicleCategories from "@/components/VehicleCategories";
import PartsServicesCategories from "@/components/PartsServicesCategories";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import TrustIndicators from "@/components/TrustIndicators";
import Footer from "@/components/Footer";
import ComparisonBar from "@/components/ComparisonBar";
import vehicleSedan from "@/assets/vehicle-sedan.jpg";
import vehicleSuv from "@/assets/vehicle-suv.jpg";
import vehicleTruck from "@/assets/vehicle-truck.jpg";

// Mock comparison data
interface ComparisonVehicle {
  id: string;
  title: string;
  price: number;
  image: string;
  healthScore: number;
}

const Index = () => {
  const [comparisonList, setComparisonList] = useState<ComparisonVehicle[]>([]);

  // Mock vehicle data for comparison
  const mockVehicles: Record<string, ComparisonVehicle> = {
    "1": {
      id: "1",
      title: "BMW 3 Series 320i Sport Line",
      price: 12500000,
      image: vehicleSedan,
      healthScore: 92
    },
    "2": {
      id: "2", 
      title: "Toyota RAV4 Hybrid AWD",
      price: 15800000,
      image: vehicleSuv,
      healthScore: 88
    },
    "3": {
      id: "3",
      title: "Ford Ranger Wildtrak 4x4",
      price: 18500000,
      image: vehicleTruck,
      healthScore: 95
    },
    "4": {
      id: "4",
      title: "Honda Civic RS Turbo",
      price: 8900000,
      image: vehicleSedan,
      healthScore: 85
    }
  };

  const handleAddToComparison = (vehicleId: string) => {
    const vehicle = mockVehicles[vehicleId];
    
    if (vehicle && comparisonList.length < 4 && !comparisonList.find(v => v.id === vehicleId)) {
      setComparisonList([...comparisonList, vehicle]);
    }
  };

  const handleRemoveFromComparison = (vehicleId: string) => {
    setComparisonList(comparisonList.filter(v => v.id !== vehicleId));
  };

  const handleCompare = () => {
    console.log("Navigating to comparison page with:", comparisonList);
    // In real app, navigate to comparison page
    alert("Comparison feature activated! This would open the detailed comparison view.");
  };

  const handleClearComparison = () => {
    setComparisonList([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Vehicle Categories */}
      <VehicleCategories />

      {/* Parts & Services Categories */}
      <PartsServicesCategories />

      {/* Featured Vehicles */}
      <FeaturedVehicles 
        onCompare={handleAddToComparison}
        onSave={(id) => console.log("Saved vehicle:", id)}
      />

      {/* Trust Indicators */}
      <TrustIndicators />

      {/* Footer */}
      <Footer />

      {/* Comparison Bar - Sticky at bottom */}
      <ComparisonBar
        selectedVehicles={comparisonList}
        onRemove={handleRemoveFromComparison}
        onCompare={handleCompare}
        onClear={handleClearComparison}
      />
    </div>
  );
};

export default Index;