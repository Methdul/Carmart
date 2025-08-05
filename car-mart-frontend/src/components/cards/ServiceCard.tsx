// src/components/cards/ServiceCard.tsx
// Fixed version with proper data mapping for BaseCard

import React from 'react';
import { BaseCard } from '@/components/ui/BaseCard';
import { 
  Wrench, 
  Clock, 
  MapPin, 
  Shield, 
  Phone, 
  Calendar,
  CheckCircle,
  Truck,
  AlertCircle,
  Award
} from 'lucide-react';
import { Service, CardAction, BadgeInfo } from '@/design-system/types';

interface ServiceCardProps {
  service: Service;
  onView?: () => void;
  onBook?: () => void;
  onContact?: () => void;
  onGetQuote?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  showUser?: boolean;
  showStats?: boolean;
  layout?: 'grid' | 'list';
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onView,
  onBook,
  onContact,
  onGetQuote,
  onSave,
  onShare,
  showUser = false,
  showStats = false,
  layout = 'list',
  className
}) => {
  // ✅ Map service data to BaseCard item format
  const baseItem = {
    ...service,
    price: service.price || 0, // ✅ Ensure price is safe
    images: service.images || [],
    is_featured: service.is_featured || false,
    is_verified: false,
  };

  const badges: BadgeInfo[] = [];

  // Add price type badge
  badges.push({
    label: service.price_type === 'quote' ? 'Quote' : 
           service.price_type === 'hourly' ? 'Hourly' : 'Fixed',
    variant: 'outline' as const
  });

  // Add service features badges
  if (service.home_service) {
    badges.push({
      label: 'Home Service',
      variant: 'secondary' as const
    });
  }

  if (service.emergency_service) {
    badges.push({
      label: '24/7',
      variant: 'default' as const
    });
  }

  if (service.pickup_dropoff) {
    badges.push({
      label: 'Pickup/Drop',
      variant: 'secondary' as const
    });
  }

  if (service.certifications && service.certifications.length > 0) {
    badges.push({
      label: 'Certified',
      variant: 'default' as const
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
  
  if (service.online_booking && onBook) {
    actions.push({
      label: 'Book Now',
      variant: 'default',
      onClick: onBook
    });
  } else if (service.price_type === 'quote' && onGetQuote) {
    actions.push({
      label: 'Get Quote',
      variant: 'default',
      onClick: onGetQuote
    });
  }

  // ✅ Create metadata for ikman style
  const metadata = (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <span>{service.service_type}</span>
      <span>•</span>
      <span>{service.price_type === 'quote' ? 'Quote required' : 
             service.price_type === 'hourly' ? 'Hourly rate' : 'Fixed price'}</span>
      {service.home_service && (
        <>
          <span>•</span>
          <span>Home Service</span>
        </>
      )}
      {service.emergency_service && (
        <>
          <span>•</span>
          <span>24/7 Available</span>
        </>
      )}
    </div>
  );

  return (
    <BaseCard
      item={baseItem}
      imageAlt={`${service.service_type} service`}
      pricePrefix="Rs "
      priceSuffix={service.price_type === 'hourly' ? '/hr' : ''}
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

export default ServiceCard;