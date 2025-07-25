import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, BarChart3, MapPin, Calendar, Fuel, Settings, Star, AlertTriangle, Package } from 'lucide-react';
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

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}>
      <div className="relative">
        <SafeImage
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        
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
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {year}
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
          <div className="flex items-center">
            <Fuel className="h-4 w-4 mr-1" />
            {fuelType}
          </div>
          <div className="flex items-center">
            <Settings className="h-4 w-4 mr-1" />
            {transmission}
          </div>
        </div>

        {/* Mileage and Rating */}
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>{mileage.toLocaleString()} km</span>
          {sellerRating > 0 && (
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-500" />
              {sellerRating}
            </div>
          )}
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

  // Extract data safely with defaults
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
          title="No Items Found"
          description={emptyMessage}
          icon={<Package />}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      {safeItems.map((item, index) => (
        <React.Fragment key={index}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}
    </div>
  );
}

// Safe Wrapper Component for error boundaries
interface SafeWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export const SafeWrapper: React.FC<SafeWrapperProps> = ({
  children,
  fallback,
  className = ""
}) => {
  try {
    return <div className={className}>{children}</div>;
  } catch (error) {
    console.error('SafeWrapper caught error:', error);
    
    if (fallback) {
      return <div className={className}>{fallback}</div>;
    }
    
    return (
      <div className={className}>
        <ApiErrorDisplay
          error="An unexpected error occurred while rendering this component"
          showRetry={false}
        />
      </div>
    );
  }
};