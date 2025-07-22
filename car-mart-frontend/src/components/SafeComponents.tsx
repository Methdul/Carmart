import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, BarChart3, MapPin, Calendar, Fuel, Settings, Star, AlertTriangle } from 'lucide-react';
import { SafeImage, safeGet, safeString, safeNumber, EmptyState, ApiErrorDisplay } from '@/components/ErrorBoundary';

// Safe Vehicle Card Component
interface SafeVehicleCardProps {
  vehicle?: any;
  onSave?: (id: string) => void;
  onCompare?: (id: string) => void;
  className?: string;
}

export const SafeVehicleCard: React.FC<SafeVehicleCardProps> = ({
  vehicle,
  onSave,
  onCompare,
  className = ""
}) => {
  // If no vehicle data, show empty state
  if (!vehicle) {
    return (
      <Card className={`h-[400px] ${className}`}>
        <CardContent className="h-full flex items-center justify-center">
          <EmptyState
            title="No Vehicle Data"
            description="Vehicle information is not available"
            icon={<AlertTriangle />}
          />
        </CardContent>
      </Card>
    );
  }

  // Extract data safely with defaults
  const id = safeString(vehicle.id, 'unknown');
  const title = safeString(vehicle.title, 'Vehicle Title Not Available');
  const price = safeNumber(vehicle.price, 0);
  const image = safeString(vehicle.image, '');
  const healthScore = safeNumber(vehicle.healthScore, 0);
  const year = safeNumber(vehicle.year, new Date().getFullYear());
  const mileage = safeNumber(vehicle.mileage, 0);
  const location = safeString(vehicle.location, 'Location Not Specified');
  const fuelType = safeString(vehicle.fuelType, 'Not Specified');
  const transmission = safeString(vehicle.transmission, 'Not Specified');
  const sellerRating = safeNumber(vehicle.sellerRating, 0);
  const isVerified = Boolean(vehicle.isVerified);

  const handleSave = () => {
    try {
      onSave?.(id);
    } catch (error) {
      console.error('Error saving vehicle:', error);
    }
  };

  const handleCompare = () => {
    try {
      onCompare?.(id);
    } catch (error) {
      console.error('Error adding to comparison:', error);
    }
  };

  const formatPrice = (price: number) => {
    try {
      return new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 0,
      }).format(price);
    } catch {
      return `Rs. ${price.toLocaleString()}`;
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}>
      <div className="relative">
        <SafeImage
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        
        {/* Health Score Badge */}
        {healthScore > 0 && (
          <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getHealthScoreColor(healthScore)}`}>
            AI Score: {healthScore}
          </div>
        )}
        
        {/* Verified Badge */}
        {isVerified && (
          <Badge className="absolute top-3 right-3 bg-green-600 text-white">
            Verified
          </Badge>
        )}
        
        {/* Action Buttons */}
        <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="secondary"
            onClick={handleSave}
            className="h-8 w-8 bg-white/90 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            onClick={handleCompare}
            className="h-8 w-8 bg-white/90 hover:bg-white"
          >
            <BarChart3 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Title and Price */}
        <div className="mb-3">
          <h3 className="font-semibold text-primary text-lg mb-1 line-clamp-2">
            {title}
          </h3>
          <div className="text-2xl font-bold text-primary">
            {price > 0 ? formatPrice(price) : 'Price on Request'}
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{year}</span>
            </div>
            <div className="flex items-center">
              <Settings className="h-4 w-4 mr-1" />
              <span>{mileage.toLocaleString()} km</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Fuel className="h-4 w-4 mr-1" />
              <span>{fuelType}</span>
            </div>
            <span>{transmission}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{location}</span>
            </div>
            {sellerRating > 0 && (
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                <span>{sellerRating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Safe Parts Card Component
interface SafePartsCardProps {
  part?: any;
  onSave?: (id: string) => void;
  onContact?: (id: string) => void;
  className?: string;
}

export const SafePartsCard: React.FC<SafePartsCardProps> = ({
  part,
  onSave,
  onContact,
  className = ""
}) => {
  if (!part) {
    return (
      <Card className={`h-[350px] ${className}`}>
        <CardContent className="h-full flex items-center justify-center">
          <EmptyState
            title="No Part Data"
            description="Part information is not available"
            icon={<AlertTriangle />}
          />
        </CardContent>
      </Card>
    );
  }

  const id = safeString(part.id, 'unknown');
  const title = safeString(part.title, 'Part Title Not Available');
  const price = safeNumber(part.price, 0);
  const image = safeString(part.image, '');
  const brand = safeString(part.brand, 'Unknown Brand');
  const condition = safeString(part.condition, 'Not Specified');
  const location = safeString(part.location, 'Location Not Specified');
  const compatibility = safeGet(part, 'compatibility', []);

  const handleSave = () => {
    try {
      onSave?.(id);
    } catch (error) {
      console.error('Error saving part:', error);
    }
  };

  const handleContact = () => {
    try {
      onContact?.(id);
    } catch (error) {
      console.error('Error contacting seller:', error);
    }
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${className}`}>
      <div className="relative">
        <SafeImage
          src={image}
          alt={title}
          className="w-full h-40 object-cover"
        />
        
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="secondary"
            onClick={handleSave}
            className="h-8 w-8 bg-white/90 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-primary mb-1 line-clamp-2">
            {title}
          </h3>
          <div className="text-xl font-bold text-primary">
            {price > 0 ? `Rs. ${price.toLocaleString()}` : 'Price on Request'}
          </div>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div>Brand: {brand}</div>
          <div>Condition: {condition}</div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
          {Array.isArray(compatibility) && compatibility.length > 0 && (
            <div>Compatible: {compatibility.slice(0, 2).join(', ')}</div>
          )}
        </div>

        <Button 
          className="w-full" 
          variant="outline"
          onClick={handleContact}
        >
          Contact Seller
        </Button>
      </CardContent>
    </Card>
  );
};

// Safe List Component for handling arrays
interface SafeListProps<T> {
  items?: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  emptyMessage?: string;
  loadingMessage?: string;
  error?: string;
  isLoading?: boolean;
  onRetry?: () => void;
  className?: string;
}

export function SafeList<T>({
  items,
  renderItem,
  emptyMessage = "No items found",
  loadingMessage = "Loading items...",
  error,
  isLoading = false,
  onRetry,
  className = ""
}: SafeListProps<T>) {
  if (isLoading) {
    return (
      <div className={className}>
        <div className="text-center py-8">
          <div className="w-8 h-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <ApiErrorDisplay error={error} onRetry={onRetry} />
      </div>
    );
  }

  const safeItems = Array.isArray(items) ? items : [];

  if (safeItems.length === 0) {
    return (
      <div className={className}>
        <EmptyState
          title={emptyMessage}
          description="Try adjusting your search or filters"
          icon={<AlertTriangle />}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      {safeItems.map((item, index) => {
        try {
          return renderItem(item, index);
        } catch (error) {
          console.error('Error rendering item:', error);
          return (
            <Card key={index} className="p-4">
              <p className="text-destructive text-sm">Error displaying item</p>
            </Card>
          );
        }
      })}
    </div>
  );
}

export default {
  SafeVehicleCard,
  SafePartsCard,
  SafeList
};