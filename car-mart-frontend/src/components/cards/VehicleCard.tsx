// src/components/cards/VehicleCard.tsx
// Fixed version with proper data mapping for BaseCard

import React from 'react';
import { BaseCard } from '@/components/ui/BaseCard';
import { Car, Fuel, Settings, Calendar, Gauge, Users, Shield } from 'lucide-react';
import { Vehicle, CardAction, BadgeInfo } from '@/design-system/types';

interface VehicleCardProps {
  vehicle: Vehicle;
  onView?: () => void;
  onContact?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  onCompare?: () => void;
  showUser?: boolean;
  showStats?: boolean;
  layout?: 'grid' | 'list';
  className?: string;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onView,
  onContact,
  onSave,
  onShare,
  onCompare,
  showUser = false,
  showStats = false,
  layout = 'list',
  className
}) => {
  // ✅ Map vehicle data to BaseCard item format
  const baseItem = {
    ...vehicle,
    price: vehicle.price || 0, // ✅ Ensure price is safe
    images: vehicle.images || [],
    is_featured: vehicle.is_featured || false,
    is_verified: vehicle.is_verified || false,
  };

  const badges: BadgeInfo[] = [];

  // Add condition badge
  if (vehicle.condition) {
    badges.push({
      label: vehicle.condition,
      variant: vehicle.condition === 'Excellent' ? 'default' : 
              vehicle.condition === 'Good' ? 'secondary' : 'outline'
    });
  }

  // Add year badge
  if (vehicle.year) {
    badges.push({
      label: vehicle.year.toString(),
      variant: 'outline' as const
    });
  }

  // Add negotiable badge
  if (vehicle.negotiable) {
    badges.push({
      label: 'Negotiable',
      variant: 'secondary' as const
    });
  }

  const actions: CardAction[] = [];
  
  if (onView) {
    actions.push({
      label: 'View Details',
      variant: 'secondary',
      onClick: onView
    });
  }
  
  if (onContact) {
    actions.push({
      label: 'Contact Seller',
      variant: 'default',
      onClick: onContact
    });
  }

  // ✅ Create metadata for ikman style
  const metadata = (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <span>{vehicle.year}</span>
      <span>•</span>
      <span>{vehicle.fuel_type}</span>
      <span>•</span>
      <span>{vehicle.transmission}</span>
      {vehicle.mileage && vehicle.mileage > 0 && (
        <>
          <span>•</span>
          <span>{vehicle.mileage.toLocaleString()} km</span>
        </>
      )}
    </div>
  );

  return (
    <BaseCard
      item={baseItem}
      imageAlt={`${vehicle.make} ${vehicle.model} ${vehicle.year}`}
      pricePrefix="Rs "
      priceSuffix=""
      badges={badges}
      actions={actions}
      metadata={metadata}
      showUser={showUser}
      showStats={showStats}
      layout={layout}
      onClick={onView}
      onSave={onSave}
      onShare={onShare}
      className={className}
    />
  );
};

export default VehicleCard;