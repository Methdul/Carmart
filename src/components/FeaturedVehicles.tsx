import VehicleCard from "./VehicleCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import vehicleSedan from "@/assets/vehicle-sedan.jpg";
import vehicleSuv from "@/assets/vehicle-suv.jpg";
import vehicleTruck from "@/assets/vehicle-truck.jpg";

interface FeaturedVehiclesProps {
  onSave?: (id: string) => void;
  onCompare?: (id: string) => void;
}

const FeaturedVehicles = ({ onSave, onCompare }: FeaturedVehiclesProps) => {
  // Mock data for featured vehicles
  const featuredVehicles = [
    {
      id: "1",
      title: "BMW 3 Series 320i Sport Line",
      price: 12500000,
      year: 2020,
      mileage: 35000,
      location: "Colombo",
      fuelType: "Petrol",
      transmission: "Automatic",
      image: vehicleSedan,
      healthScore: 92,
      sellerRating: 4.8,
      isVerified: true,
      isFeatured: true
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
      image: vehicleSuv,
      healthScore: 88,
      sellerRating: 4.9,
      isVerified: true,
      isFeatured: true
    },
    {
      id: "3",
      title: "Ford Ranger Wildtrak 4x4",
      price: 18500000,
      year: 2022,
      mileage: 15000,
      location: "Galle", 
      fuelType: "Diesel",
      transmission: "Manual",
      image: vehicleTruck,
      healthScore: 95,
      sellerRating: 4.7,
      isVerified: true,
      isFeatured: true
    },
    {
      id: "4",
      title: "Honda Civic RS Turbo",
      price: 8900000,
      year: 2019,
      mileage: 42000,
      location: "Colombo",
      fuelType: "Petrol",
      transmission: "CVT",
      image: vehicleSedan,
      healthScore: 85,
      sellerRating: 4.6,
      isVerified: true,
      isFeatured: false
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Featured Premium Vehicles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked premium vehicles with excellent AI health scores and verified sellers
          </p>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSave={onSave || ((id) => console.log("Saved vehicle:", id))}
              onCompare={onCompare || ((id) => console.log("Added to comparison:", id))}
              className="animate-fade-in"
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline"
            className="group hover:bg-primary hover:text-primary-foreground"
          >
            View All Vehicles
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;