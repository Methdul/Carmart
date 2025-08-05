// src/components/cards/VehicleCard.tsx
// Fixed version with correct variants

import React from 'react';
import { BaseCard } from '@/components/ui/BaseCard';
import { Car, Fuel, Settings, Calendar, Gauge, Users, Shield } from 'lucide-react';
import { Vehicle, CardAction, BadgeInfo, getBadgeVariant, getButtonVariant } from '@/design-system/types';

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
  showUser = true,
  showStats = false,
  layout = 'grid',
  className
}) => {
  const badges: BadgeInfo[] = [
    {
      label: vehicle.year.toString(),
      variant: 'outline',
      icon: Calendar
    }
  ];

  // Add condition badge with correct variant mapping
  if (vehicle.condition) {
    badges.push({
      label: vehicle.condition,
      variant: vehicle.condition === 'Excellent' ? getBadgeVariant('success') : 
              vehicle.condition === 'Good' ? getBadgeVariant('info') : 
              getBadgeVariant('warning')
    });
  }

  // Add negotiable badge
  if (vehicle.negotiable) {
    badges.push({
      label: 'Negotiable',
      variant: getBadgeVariant('info')
    });
  }

  const actions: CardAction[] = [];
  
  if (onView) {
    actions.push({
      label: 'View Details',
      variant: getButtonVariant('secondary'),
      onClick: onView
    });
  }
  
  if (onContact) {
    actions.push({
      label: 'Contact Seller',
      variant: getButtonVariant('primary'),
      onClick: onContact
    });
  }

  const metadata = (
    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
      <div className="flex items-center gap-1">
        <Fuel className="h-3 w-3" />
        <span>{vehicle.fuel_type}</span>
      </div>
      <div className="flex items-center gap-1">
        <Settings className="h-3 w-3" />
        <span>{vehicle.transmission}</span>
      </div>
      {vehicle.mileage && (
        <div className="flex items-center gap-1">
          <Gauge className="h-3 w-3" />
          <span>{vehicle.mileage.toLocaleString()} km</span>
        </div>
      )}
      {vehicle.seats && (
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>{vehicle.seats} seats</span>
        </div>
      )}
    </div>
  );

  return (
    <BaseCard
      item={vehicle}
      imageAlt={`${vehicle.make} ${vehicle.model} ${vehicle.year}`}
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