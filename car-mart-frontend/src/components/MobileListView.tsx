import { Heart, BarChart3, MessageCircle, Phone, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import HealthScoreBadge from "@/components/HealthScoreBadge";

interface VehicleListItem {
  id: string;
  title: string;
  year: number;
  make: string;
  model: string;
  price: number;
  mileage: number;
  location: string;
  image: string;
  healthScore?: number;
  sellerName: string;
  sellerRating: number;
  postedDate: string;
  transmission?: string;
  fuelType?: string;
}

interface PartsListItem {
  id: string;
  title: string;
  price: number;
  condition: string;
  location: string;
  image: string;
  brand: string;
  partNumber?: string;
  compatibility: string[];
  warranty?: string;
  sellerName: string;
  sellerRating: number;
  postedDate: string;
}

interface ServiceListItem {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string;
  serviceType: string;
  providerName: string;
  providerRating: number;
  responseTime: string;
  certified: boolean;
}

interface MobileListViewProps {
  items: (VehicleListItem | PartsListItem | ServiceListItem)[];
  type: "vehicles" | "parts" | "services";
  onSave: (id: string) => void;
  onCompare?: (id: string) => void;
  onContact: (id: string) => void;
  className?: string;
}

const isVehicle = (item: any): item is VehicleListItem => {
  return 'healthScore' in item || 'mileage' in item;
};

const isPart = (item: any): item is PartsListItem => {
  return 'condition' in item && 'brand' in item;
};

const isService = (item: any): item is ServiceListItem => {
  return 'serviceType' in item && 'certified' in item;
};

const VehicleListCard = ({ 
  vehicle, 
  onSave, 
  onCompare, 
  onContact 
}: { 
  vehicle: VehicleListItem;
  onSave: (id: string) => void;
  onCompare?: (id: string) => void;
  onContact: (id: string) => void;
}) => (
  <div className="border-b border-gray-200 p-4 bg-white">
    <div className="flex space-x-3">
      {/* Image */}
      <div className="w-24 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
        <img 
          src={vehicle.image} 
          alt={vehicle.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-sm font-semibold text-primary truncate pr-2">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          {vehicle.healthScore && (
            <HealthScoreBadge score={vehicle.healthScore} size="sm" />
          )}
        </div>
        
        <div className="space-y-1 mb-2">
          <p className="text-xs text-muted-foreground">
            {vehicle.mileage.toLocaleString()} km • {vehicle.transmission} • {vehicle.fuelType}
          </p>
          <p className="text-xs text-muted-foreground flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {vehicle.location}
          </p>
          <p className="text-xs text-muted-foreground">
            {vehicle.sellerName} • ⭐ {vehicle.sellerRating}
          </p>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-primary">
            Rs. {vehicle.price.toLocaleString()}
          </span>
          
          <div className="flex space-x-1">
            <Button 
              size="sm"
              variant="ghost"
              onClick={() => onSave(vehicle.id)}
              className="p-2 h-8 w-8"
            >
              <Heart className="w-4 h-4" />
            </Button>
            {onCompare && (
              <Button 
                size="sm"
                variant="ghost"
                onClick={() => onCompare(vehicle.id)}
                className="p-2 h-8 w-8"
              >
                <BarChart3 className="w-4 h-4" />
              </Button>
            )}
            <Button 
              size="sm"
              variant="ghost"
              onClick={() => onContact(vehicle.id)}
              className="p-2 h-8 w-8"
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PartsListCard = ({ 
  part, 
  onSave, 
  onContact 
}: { 
  part: PartsListItem;
  onSave: (id: string) => void;
  onContact: (id: string) => void;
}) => (
  <div className="border-b border-gray-200 p-4 bg-white">
    <div className="flex space-x-3">
      {/* Image */}
      <div className="w-20 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
        <img 
          src={part.image} 
          alt={part.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-sm font-semibold text-primary truncate pr-2">
            {part.title}
          </h3>
          <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded">
            {part.condition}
          </span>
        </div>
        
        <div className="space-y-1 mb-2">
          <p className="text-xs text-muted-foreground">
            {part.brand} {part.partNumber && `• ${part.partNumber}`}
          </p>
          <p className="text-xs text-muted-foreground flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {part.location}
          </p>
          <p className="text-xs text-muted-foreground">
            Fits: {part.compatibility.slice(0, 2).join(", ")}
            {part.compatibility.length > 2 && ` +${part.compatibility.length - 2} more`}
          </p>
          {part.warranty && (
            <p className="text-xs text-success">
              ✓ {part.warranty} warranty
            </p>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-primary">
            Rs. {part.price.toLocaleString()}
          </span>
          
          <div className="flex space-x-1">
            <Button 
              size="sm"
              variant="ghost"
              onClick={() => onSave(part.id)}
              className="p-2 h-8 w-8"
            >
              <Heart className="w-4 h-4" />
            </Button>
            <Button 
              size="sm"
              variant="ghost"
              onClick={() => onContact(part.id)}
              className="p-2 h-8 w-8"
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ServiceListCard = ({ 
  service, 
  onSave, 
  onContact 
}: { 
  service: ServiceListItem;
  onSave: (id: string) => void;
  onContact: (id: string) => void;
}) => (
  <div className="border-b border-gray-200 p-4 bg-white">
    <div className="flex space-x-3">
      {/* Image */}
      <div className="w-20 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
        <img 
          src={service.image} 
          alt={service.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-sm font-semibold text-primary truncate pr-2">
            {service.title}
          </h3>
          {service.certified && (
            <span className="text-xs px-2 py-1 bg-success/10 text-success rounded flex items-center">
              ✓ Certified
            </span>
          )}
        </div>
        
        <div className="space-y-1 mb-2">
          <p className="text-xs text-muted-foreground">
            {service.serviceType}
          </p>
          <p className="text-xs text-muted-foreground flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {service.location}
          </p>
          <p className="text-xs text-muted-foreground">
            {service.providerName} • ⭐ {service.providerRating} • ⚡ {service.responseTime}
          </p>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {service.description}
          </p>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-primary">
            Rs. {service.price.toLocaleString()}
          </span>
          
          <div className="flex space-x-1">
            <Button 
              size="sm"
              variant="ghost"
              onClick={() => onSave(service.id)}
              className="p-2 h-8 w-8"
            >
              <Heart className="w-4 h-4" />
            </Button>
            <Button 
              size="sm"
              variant="ghost"
              onClick={() => onContact(service.id)}
              className="p-2 h-8 w-8"
            >
              <Phone className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MobileListView = ({ 
  items, 
  type, 
  onSave, 
  onCompare, 
  onContact, 
  className = "" 
}: MobileListViewProps) => {
  return (
    <div className={`md:hidden ${className}`}>
      {items.map((item) => {
        if (type === "vehicles" && isVehicle(item)) {
          return (
            <VehicleListCard
              key={item.id}
              vehicle={item}
              onSave={onSave}
              onCompare={onCompare}
              onContact={onContact}
            />
          );
        } else if (type === "parts" && isPart(item)) {
          return (
            <PartsListCard
              key={item.id}
              part={item}
              onSave={onSave}
              onContact={onContact}
            />
          );
        } else if (type === "services" && isService(item)) {
          return (
            <ServiceListCard
              key={item.id}
              service={item}
              onSave={onSave}
              onContact={onContact}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default MobileListView;