// src/components/cards/ServiceCard.tsx
// Fixed version with correct variants

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
import { Service, CardAction, BadgeInfo, getBadgeVariant, getButtonVariant } from '@/design-system/types';

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
  showUser = true,
  showStats = false,
  layout = 'grid',
  className
}) => {
  const badges: BadgeInfo[] = [
    {
      label: service.price_type === 'quote' ? 'Quote' : 
             service.price_type === 'hourly' ? 'Hourly' : 'Fixed',
      variant: 'outline'
    }
  ];

  // Add service features badges
  if (service.home_service) {
    badges.push({
      label: 'Home Service',
      variant: getBadgeVariant('success'),
      icon: MapPin
    });
  }

  if (service.emergency_service) {
    badges.push({
      label: '24/7',
      variant: getBadgeVariant('warning'),
      icon: AlertCircle
    });
  }

  if (service.pickup_dropoff) {
    badges.push({
      label: 'Pickup/Drop',
      variant: getBadgeVariant('info'),
      icon: Truck
    });
  }

  if (service.certifications && service.certifications.length > 0) {
    badges.push({
      label: 'Certified',
      variant: getBadgeVariant('success'),
      icon: Award
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
  
  if (service.online_booking && onBook) {
    actions.push({
      label: 'Book Now',
      variant: getButtonVariant('primary'),
      onClick: onBook
    });
  } else if (service.price_type === 'quote' && onGetQuote) {
    actions.push({
      label: 'Get Quote',
      variant: getButtonVariant('primary'),
      onClick: onGetQuote
    });
  } else if (onContact) {
    actions.push({
      label: 'Contact',
      variant: getButtonVariant('primary'),
      onClick: onContact
    });
  }

  const metadata = (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Wrench className="h-3 w-3" />
          <span>{service.service_type}</span>
        </div>
        {service.duration && (
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{service.duration}</span>
          </div>
        )}
        {service.warranty_period && (
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            <span>{service.warranty_period}</span>
          </div>
        )}
        {service.response_time && (
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{service.response_time}</span>
          </div>
        )}
      </div>
      
      {/* Service areas */}
      {service.service_areas && service.service_areas.length > 0 && (
        <div className="text-xs text-muted-foreground pt-1 border-t border-border/50">
          <div className="font-medium">Service Areas:</div>
          <div className="line-clamp-2">
            {service.service_areas.slice(0, 3).join(', ')}
            {service.service_areas.length > 3 && ` +${service.service_areas.length - 3} more`}
          </div>
        </div>
      )}
      
      {/* Price display for hourly services */}
      {service.price_type === 'hourly' && (
        <div className="text-xs font-medium text-primary pt-1 border-t border-border/50">
          ₹{service.price.toLocaleString()}/hour
        </div>
      )}
    </div>
  );

  const priceDisplay = service.price_type === 'quote' ? 'Quote' : 
                      service.price_type === 'hourly' ? `₹${service.price.toLocaleString()}` :
                      `₹${service.price.toLocaleString()}`;

  const priceSuffix = service.price_type === 'hourly' ? '/hr' : '';

  return (
    <BaseCard
      item={{
        ...service,
        price: service.price_type === 'quote' ? 0 : service.price
      }}
      imageAlt={`${service.title} - ${service.service_type}`}
      pricePrefix={service.price_type === 'quote' ? '' : '₹'}
      priceSuffix={priceSuffix}
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