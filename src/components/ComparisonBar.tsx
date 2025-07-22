import { X, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ComparisonVehicle {
  id: string;
  title: string;
  price: number;
  image: string;
  healthScore: number;
}

interface ComparisonBarProps {
  selectedVehicles: ComparisonVehicle[];
  maxItems?: number;
  onRemove: (id: string) => void;
  onCompare: () => void;
  onClear: () => void;
  className?: string;
}

const ComparisonBar = ({
  selectedVehicles,
  maxItems = 4,
  onRemove,
  onCompare,
  onClear,
  className
}: ComparisonBarProps) => {
  if (selectedVehicles.length === 0) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency', 
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('LKR', 'Rs.');
  };

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-40 bg-background border-t shadow-lg animate-slide-up",
      className
    )}>
      <div className="container mx-auto px-4 py-4">
        <Card className="bg-card">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span className="font-semibold text-primary">
                  Compare Vehicles ({selectedVehicles.length}/{maxItems})
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onClear}
                >
                  Clear All
                </Button>
                <Button 
                  size="sm"
                  onClick={onCompare}
                  disabled={selectedVehicles.length < 2}
                  className="bg-accent hover:bg-accent/90"
                >
                  Compare Now
                </Button>
              </div>
            </div>

            {/* Selected Vehicles */}
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {selectedVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex-shrink-0 w-48 relative group"
                >
                  <Card className="overflow-hidden border-accent/20">
                    <div className="relative">
                      {/* Remove Button */}
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => onRemove(vehicle.id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>

                      {/* Vehicle Image */}
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={vehicle.image}
                          alt={vehicle.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Vehicle Info */}
                      <div className="p-3">
                        <h4 className="font-medium text-sm line-clamp-2 mb-1">
                          {vehicle.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-primary">
                            {formatPrice(vehicle.price)}
                          </span>
                          <span className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            vehicle.healthScore >= 90 && "bg-health-excellent/10 text-health-excellent",
                            vehicle.healthScore >= 70 && vehicle.healthScore < 90 && "bg-health-good/10 text-health-good",
                            vehicle.healthScore >= 50 && vehicle.healthScore < 70 && "bg-health-fair/10 text-health-fair",
                            vehicle.healthScore < 50 && "bg-health-poor/10 text-health-poor"
                          )}>
                            {vehicle.healthScore}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}

              {/* Empty Slots */}
              {Array.from({ length: maxItems - selectedVehicles.length }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="flex-shrink-0 w-48"
                >
                  <Card className="border-dashed border-muted-foreground/30 bg-muted/20">
                    <div className="aspect-[4/3] flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <span className="text-xs">Add Vehicle</span>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ComparisonBar;