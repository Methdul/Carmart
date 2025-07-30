// UPDATE: car-mart-frontend/src/components/VehicleCard.tsx
// Add proper navigation to vehicle detail page

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ADD THIS IMPORT
import { Heart, MapPin, Calendar, Fuel, Settings, BarChart3, Star, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface VehicleCardProps {
  vehicle: {
    id: string; // This will be the UUID from database
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
  };
  onSave?: (id: string) => void;
  onCompare?: (id: string) => void;
  className?: string;
}

const VehicleCard = ({ vehicle, onSave, onCompare, className }: VehicleCardProps) => {
  const navigate = useNavigate(); // ADD THIS
  const [imageLoading, setImageLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isInComparison, setIsInComparison] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return `${mileage.toLocaleString()} km`;
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  // ADD THIS HANDLER - Navigate to vehicle detail page
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    
    console.log('Navigating to vehicle detail:', vehicle.id);
    navigate(`/vehicles/${vehicle.id}`); // Use the real UUID
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Contact seller for vehicle:', vehicle.id);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    if (onSave) {
      onSave(vehicle.id);
    }
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsInComparison(!isInComparison);
    if (onCompare) {
      onCompare(vehicle.id);
    }
  };

  return (
    <Card 
      className={cn(
        "group cursor-pointer hover:shadow-lg transition-all duration-200 overflow-hidden",
        className
      )}
      onClick={handleCardClick} // ADD THIS - Make entire card clickable
    >
      <div className="relative">
        {/* Image */}
        <div className="relative overflow-hidden">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}
          <img
            src={vehicle.image}
            alt={vehicle.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
            onLoad={() => setImageLoading(false)}
            onError={(e) => {
              setImageLoading(false);
              (e.target as HTMLImageElement).src = '/placeholder-car.jpg'; // Fallback image
            }}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {vehicle.isFeatured && (
              <Badge className="bg-primary text-white text-xs">Featured</Badge>
            )}
            {vehicle.isVerified && (
              <Badge className="bg-green-600 text-white text-xs">✓ Verified</Badge>
            )}
          </div>
          
          {/* Health Score */}
          <div className="absolute top-3 right-3">
            <Badge className={cn("text-white text-xs", getHealthScoreColor(vehicle.healthScore))}>
              {vehicle.healthScore}
            </Badge>
          </div>

          {/* Action Buttons - Desktop Only */}
          <div className="absolute bottom-3 right-3 hidden sm:flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleSaveClick}
              className={cn(
                "h-8 w-8 p-0 bg-white/90 hover:bg-white",
                isSaved && "text-destructive"
              )}
            >
              <Heart className={cn("h-4 w-4", isSaved && "fill-destructive")} />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCompareClick}
              className={cn(
                "h-8 w-8 p-0 bg-white/90 hover:bg-white",
                isInComparison && "bg-accent text-accent-foreground"
              )}
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Title & Price */}
          <div className="mb-3">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {vehicle.title}
            </h3>
            <p className="text-2xl font-bold text-primary">{formatPrice(vehicle.price)}</p>
          </div>

          {/* Vehicle Details */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mb-3">
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

          {/* Location & Rating */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{vehicle.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{vehicle.sellerRating}</span>
            </div>
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