import { useState, useEffect } from "react";
import VehicleCard from "./VehicleCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

interface FeaturedVehiclesProps {
  onSave?: (id: string) => void;
  onCompare?: (id: string) => void;
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
}

const FeaturedVehicles = ({ onSave, onCompare }: FeaturedVehiclesProps) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // NEW Mock data instead of API calls
  const mockFeaturedVehicles: Vehicle[] = [
    {
      id: "1",
      title: "Lexus ES 350 F Sport",
      price: 18500000,
      year: 2022,
      mileage: 15000,
      location: "Colombo",
      fuelType: "Petrol",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      healthScore: 94,
      sellerRating: 4.9,
      isVerified: true,
      isFeatured: true
    },
    {
      id: "2",
      title: "Infiniti QX60 Premium",
      price: 21800000,
      year: 2023,
      mileage: 8000,
      location: "Kandy",
      fuelType: "Petrol",
      transmission: "CVT",
      image: "https://images.unsplash.com/photo-1570611178717-4c68f8ffe4b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      healthScore: 91,
      sellerRating: 4.7,
      isVerified: true,
      isFeatured: true
    },
    {
      id: "3",
      title: "Ford Mustang GT Premium",
      price: 24500000,
      year: 2022,
      mileage: 12000,
      location: "Galle",
      fuelType: "Petrol",
      transmission: "Manual",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      healthScore: 89,
      sellerRating: 4.8,
      isVerified: true,
      isFeatured: true
    },
    {
      id: "4",
      title: "Volkswagen ID.4 Pro",
      price: 19800000,
      year: 2023,
      mileage: 5000,
      location: "Negombo",
      fuelType: "Electric",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      healthScore: 96,
      sellerRating: 4.9,
      isVerified: true,
      isFeatured: true
    }
  ];

  useEffect(() => {
    // Simulate loading with mock data
    const loadVehicles = () => {
      setLoading(true);
      setError(null);
      
      // Simulate API delay
      setTimeout(() => {
        try {
          setVehicles(mockFeaturedVehicles);
          setLoading(false);
        } catch (err) {
          setError("Failed to load featured vehicles");
          setLoading(false);
        }
      }, 800);
    };

    loadVehicles();
  }, []);

  const handleSave = (id: string) => {
    if (onSave) {
      onSave(id);
    } else {
      console.log("Saved vehicle:", id);
    }
  };

  const handleCompare = (id: string) => {
    if (onCompare) {
      onCompare(id);
    } else {
      console.log("Added to comparison:", id);
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Featured Premium Vehicles
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked premium vehicles with excellent AI health scores and verified sellers
            </p>
          </div>
          
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading featured vehicles...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Featured Premium Vehicles
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked premium vehicles with excellent AI health scores and verified sellers
            </p>
          </div>
          
          <div className="text-center py-16">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-destructive mb-4">Failed to load vehicles</p>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (vehicles.length === 0) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Featured Premium Vehicles
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked premium vehicles with excellent AI health scores and verified sellers
            </p>
          </div>
          
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No featured vehicles available at the moment</p>
            <Button>
              View All Vehicles
            </Button>
          </div>
        </div>
      </section>
    );
  }

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
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSave={() => handleSave(vehicle.id)}
              onCompare={() => handleCompare(vehicle.id)}
              className="animate-fade-in"
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            className="group hover:bg-primary hover:text-primary-foreground"
            onClick={() => window.location.href = '/search'}
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