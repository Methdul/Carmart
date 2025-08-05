// src/components/cards/RentalCard.tsx
// Professional rental card with clean metadata

import React from 'react';
import { BaseCard } from '@/components/ui/BaseCard';
import { Calendar, Car, Clock, MapPin, Star, Users } from 'lucide-react';
import { Rental, CardAction, BadgeInfo } from '@/design-system/types';

interface RentalCardProps {
  rental: Rental;
  onView?: () => void;
  onBook?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  showUser?: boolean;
  showStats?: boolean;
  layout?: 'grid' | 'list';
  className?: string;
}

export const RentalCard: React.FC<RentalCardProps> = ({
  rental,
  onView,
  onBook,
  onSave,
  onShare,
  showUser = false,
  showStats = false,
  layout = 'list',
  className
}) => {
  // ✅ Map rental data to BaseCard item format
  const baseItem = {
    ...rental,
    price: rental.daily_rate || 0, // Use daily rate as main price
    images: rental.images || [],
    is_featured: rental.is_featured || false,
    is_verified: false,
  };

  // Single most important badge - rental type
  const badges: BadgeInfo[] = [];
  if (rental.rental_type) {
    badges.push({
      label: rental.rental_type === 'daily' ? 'Daily' : 
             rental.rental_type === 'weekly' ? 'Weekly' : 'Monthly',
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
  if (onBook) {
    actions.push({
      label: 'Book Now',
      variant: 'default',
      onClick: onBook
    });
  }

  // Professional metadata - year and fuel
  const metadata = (
    <span>
      {rental.year} • {rental.fuel_type}
    </span>
  );

  return (
    <BaseCard
      item={baseItem}
      imageAlt={`${rental.make} ${rental.model} ${rental.year} rental`}
      pricePrefix="Rs "
      priceSuffix="/day"
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

export default RentalCard;