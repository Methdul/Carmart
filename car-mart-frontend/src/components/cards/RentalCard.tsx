// src/components/cards/RentalCard.tsx
// Fixed version with proper data mapping for BaseCard

import React from 'react';
import { BaseCard } from '@/components/ui/BaseCard';
import { Calendar, MapPin, Shield, Users, Truck, Clock, CheckCircle, Fuel, Settings } from 'lucide-react';
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
    price: rental.daily_rate || rental.price || 0, // ✅ Use daily_rate as price
    images: rental.images || [],
    is_featured: rental.is_featured || false,
    is_verified: false,
  };

  const badges: BadgeInfo[] = [];
  
  // Add delivery badge
  if (rental.delivery_available) {
    badges.push({
      label: 'Delivery',
      variant: 'secondary' as const
    });
  }
  
  // Add insurance badge
  if (rental.insurance_included) {
    badges.push({
      label: 'Insured',
      variant: 'default' as const
    });
  }

  // Add rental type badge
  if (rental.rental_type) {
    badges.push({
      label: rental.rental_type === 'daily' ? 'Daily' : 
             rental.rental_type === 'weekly' ? 'Weekly' : 'Monthly',
      variant: 'outline' as const
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

  // ✅ Create metadata for ikman style
  const metadata = (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <span>{rental.year}</span>
      <span>•</span>
      <span>{rental.fuel_type}</span>
      <span>•</span>
      <span>{rental.transmission}</span>
      {rental.seats && (
        <>
          <span>•</span>
          <span>{rental.seats} seats</span>
        </>
      )}
    </div>
  );

  return (
    <BaseCard
      item={baseItem}
      imageAlt={`${rental.make} ${rental.model} ${rental.year} for rent`}
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