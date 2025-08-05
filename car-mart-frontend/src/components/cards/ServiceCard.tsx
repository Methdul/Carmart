// src/components/cards/ServiceCard.tsx
// Professional service card with clean metadata

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
    price: service.price || 0,
    images: service.images || [],
    is_featured: service.is_featured || false,
    is_verified: false,
  };

  // Single most important badge - price type
  const badges: BadgeInfo[] = [];
  badges.push({
    label: service.price_type === 'quote' ? 'Quote' : 
           service.price_type === 'hourly' ? 'Hourly' : 'Fixed',
    variant: 'outline' as const
  });

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

  // Professional metadata - service type
  const metadata = (
    <span className="capitalize">{service.service_type}</span>
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