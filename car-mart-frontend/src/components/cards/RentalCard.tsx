// src/components/cards/RentalCard.tsx
// Fixed version with correct variants

import React from 'react';
import { BaseCard } from '@/components/ui/BaseCard';
import { Calendar, MapPin, Shield, Users, Truck, Clock, CheckCircle } from 'lucide-react';
import { Rental, CardAction, BadgeInfo, getBadgeVariant, getButtonVariant } from '@/design-system/types';

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
  showUser = true,
  showStats = false,
  layout = 'grid',
  className
}) => {
  const badges: BadgeInfo[] = [];
  
  if (rental.delivery_available) {
    badges.push({
      label: 'Delivery',
      variant: getBadgeVariant('info'),
      icon: Truck
    });
  }
  
  if (rental.insurance_included) {
    badges.push({
      label: 'Insured',
      variant: getBadgeVariant('success'),
      icon: Shield
    });
  }

  // Add availability badge
  const isAvailable = new Date(rental.available_from) <= new Date();
  badges.push({
    label: isAvailable ? 'Available' : 'Coming Soon',
    variant: isAvailable ? getBadgeVariant('success') : getBadgeVariant('warning'),
    icon: CheckCircle
  });

  const actions: CardAction[] = [];
  
  if (onView) {
    actions.push({
      label: 'View Details',
      variant: getButtonVariant('secondary'),
      onClick: onView
    });
  }
  
  if (onBook) {
    actions.push({
      label: 'Book Now',
      variant: getButtonVariant('primary'),
      onClick: onBook
    });
  }

  const metadata = (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>{rental.seats} seats</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>Min {rental.minimum_rental_days}d</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{rental.fuel_policy}</span>
        </div>
        {rental.mileage_limit_per_day && (
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{rental.mileage_limit_per_day}km/day</span>
          </div>
        )}
      </div>
      
      {/* Rental rates */}
      {(rental.weekly_rate || rental.monthly_rate) && (
        <div className="text-xs text-muted-foreground pt-1 border-t border-border/50">
          {rental.weekly_rate && (
            <div>Weekly: ₹{rental.weekly_rate.toLocaleString()}</div>
          )}
          {rental.monthly_rate && (
            <div>Monthly: ₹{rental.monthly_rate.toLocaleString()}</div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <BaseCard
      item={rental}
      imageAlt={`${rental.make} ${rental.model} ${rental.year} for rent`}
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