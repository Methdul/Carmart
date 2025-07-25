import React from "react";
import { Heart, BarChart3, MapPin, Calendar, Fuel, Settings, Star, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
  sellerRating?: number;
  isVerified?: boolean;
  isFeatured?: boolean;
  make?: string;
  model?: string;
  bodyType?: string;
  condition?: string;
  engineCapacity?: string;
  color?: string;
  doors?: number;
  drivetrain?: string;
  seatingCapacity?: number;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onSave?: (id: string) => void;
  onCompare?: (vehicle: Vehicle) => void;
  onContact?: (id: string) => void;
  isSaved?: boolean;
  isInComparison?: boolean;
  className?: string;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onSave,
  onCompare,
  onContact,
  isSaved = false,
  isInComparison = false,
  className = ""
}) => {
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `Rs. ${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `Rs. ${(price / 1000).toFixed(0)}K`;
    }
    return `Rs. ${price.toLocaleString()}`;
  };

  const formatMileage = (mileage: number) => {
    if (mileage >= 1000) {
      return `${(mileage / 1000).toFixed(0)}K km`;
    }
    return `${mileage.toLocaleString()} km`;
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSave?.(vehicle.id);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCompare?.(vehicle);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onContact?.(vehicle.id);
  };

  return (
    <Card className={cn("group hover:shadow-lg transition-all duration-300 overflow-hidden", className)}>
      <div className="relative">
        {/* Main Image */}
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={vehicle.image}
            alt={vehicle.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Featured Badge */}
          {vehicle.isFeatured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-highlight text-white font-medium">
                Featured
              </Badge>
            </div>
          )}

          {/* Verified Badge */}
          {vehicle.isVerified && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-success text-white font-medium">
                ✓ Verified
              </Badge>
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              variant="secondary"
              className={cn(
                "w-8 h-8 rounded-full bg-background/80 hover:bg-background",
                isSaved && "bg-destructive/10 text-destructive"
              )}
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
          <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
            <MapPin className="w-4 h-4" />
            <span>{vehicle.location}</span>
          </div>

          {/* Action Buttons for Mobile */}
          <div className="flex space-x-2 sm:hidden">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleContactClick}
            >
              Contact
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveClick}
              className={cn(isSaved && "text-destructive border-destructive")}
            >
              <Heart className={cn("w-4 h-4", isSaved && "fill-destructive")} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCompareClick}
              className={cn(isInComparison && "bg-accent text-accent-foreground")}
            >
              <BarChart3 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default VehicleCard;