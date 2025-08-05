// src/components/cards/VehicleCard.tsx
// Professional vehicle card with clean metadata

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
    price: vehicle.price || 0,
    images: vehicle.images || [],
    is_featured: vehicle.is_featured || false,
    is_verified: vehicle.is_verified || false,
  };

  // Single most important badge - condition
  const badges: BadgeInfo[] = [];
  if (vehicle.condition) {
    badges.push({
      label: vehicle.condition,
      variant: vehicle.condition === 'Excellent' ? 'default' : 'secondary'
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

  // Professional metadata - clean and essential
  const metadata = (
    <span>
      {vehicle.year} • {vehicle.fuel_type}
    </span>
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