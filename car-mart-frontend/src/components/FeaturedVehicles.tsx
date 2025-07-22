import { useState, useEffect } from "react";
import VehicleCard from "./VehicleCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { apiService } from "@/services/api";

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

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getVehicles();
        
        if (response.success) {
          setVehicles(response.data.slice(0, 4));
        } else {
          throw new Error(response.message || 'Failed to fetch vehicles');
        }
      } catch (err) {
        console.error('Error fetching vehicles:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch vehicles');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
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
              onSave={handleSave}
              onCompare={handleCompare}
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