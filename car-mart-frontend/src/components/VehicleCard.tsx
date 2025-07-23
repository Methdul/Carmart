import { Heart, Eye, BarChart3, MapPin, Calendar, Fuel, Settings, Star, Badge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge as UIBadge } from "@/components/ui/badge";
import HealthScoreBadge from "./HealthScoreBadge";
import { cn } from "@/lib/utils";

interface VehicleCardProps {
  vehicle: {
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
    sellerRating?: number;
    isVerified?: boolean;
    isFeatured?: boolean;
  };
  onSave?: (id: string) => void;
  onCompare?: (id: string) => void;
  onClick?: (id: string) => void;
  isInComparison?: boolean;
  isSaved?: boolean;
  className?: string;
}

const VehicleCard = ({
  vehicle,
  onSave,
  onCompare,
  onClick,
  isInComparison = false,
  isSaved = false,
  className
}: VehicleCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('LKR', 'Rs.');
  };

  const formatMileage = (mileage: number) => {
    return `${mileage.toLocaleString()} km`;
  };

  const handleCardClick = () => {
    onClick?.(vehicle.id);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSave?.(vehicle.id);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCompare?.(vehicle.id);
  };

  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300 hover:shadow-premium hover:-translate-y-1 cursor-pointer",
      vehicle.isFeatured && "ring-2 ring-accent/20",
      className
    )}
    onClick={handleCardClick}
    >
      <div className="relative">
        {/* Vehicle Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={vehicle.image}
            alt={vehicle.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Overlay Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {vehicle.isFeatured && (
              <UIBadge className="bg-accent text-accent-foreground">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </UIBadge>
            )}
            {vehicle.isVerified && (
              <UIBadge className="bg-success text-success-foreground">
                <Badge className="w-3 h-3 mr-1" />
                Verified
              </UIBadge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex space-x-2">
            <Button
              size="icon"
              variant="secondary"
              className="w-8 h-8 rounded-full bg-background/80 hover:bg-background"
              onClick={handleSaveClick}
            >
              <Heart className={cn(
                "w-4 h-4",
                isSaved && "fill-destructive text-destructive"
              )} />
            </Button>
            <Button
              size="icon"
              variant="secondary" 
              className={cn(
                "w-8 h-8 rounded-full bg-background/80 hover:bg-background",
                isInComparison && "bg-accent text-accent-foreground"
              )}
              onClick={handleCompareClick}
            >
              <BarChart3 className="w-4 h-4" />
            </Button>
          </div>

          {/* Health Score Badge - Positioned over image */}
          <div className="absolute bottom-3 left-3">
            <HealthScoreBadge 
              score={vehicle.healthScore} 
              size="sm"
              className="bg-background/90 rounded-lg px-2 py-1"
            />
          </div>
        </div>

        {/* Card Content */}
        <CardContent className="p-4">
          {/* Title and Price */}
          <div className="space-y-2 mb-3">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {vehicle.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">
                {formatPrice(vehicle.price)}
              </span>
              {vehicle.sellerRating && (
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-sm font-medium">{vehicle.sellerRating}</span>
                </div>
              )}
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{vehicle.year}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{formatMileage(vehicle.mileage)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Fuel className="w-4 h-4" />
              <span>{vehicle.fuelType}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Settings className="w-4 h-4" />
              <span>{vehicle.transmission}</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{vehicle.location}</span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default VehicleCard;