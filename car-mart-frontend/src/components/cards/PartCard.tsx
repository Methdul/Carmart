// src/components/cards/PartCard.tsx
// Fixed version with correct variants

import React from 'react';
import { BaseCard } from '@/components/ui/BaseCard';
import { Package, Shield, Truck, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Part, CardAction, BadgeInfo, getBadgeVariant, getButtonVariant } from '@/design-system/types';

interface PartCardProps {
  part: Part;
  onView?: () => void;
  onContact?: () => void;
  onAddToCart?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  showUser?: boolean;
  showStats?: boolean;
  layout?: 'grid' | 'list';
  className?: string;
}

export const PartCard: React.FC<PartCardProps> = ({
  part,
  onView,
  onContact,
  onAddToCart,
  onSave,
  onShare,
  showUser = true,
  showStats = false,
  layout = 'grid',
  className
}) => {
  const badges: BadgeInfo[] = [
    {
      label: part.condition,
      variant: part.condition === 'New' ? getBadgeVariant('success') : 
              part.condition === 'Used' ? getBadgeVariant('info') : 
              getBadgeVariant('warning')
    }
  ];

  // Add stock status badge
  if (part.stock_quantity !== undefined) {
    if (part.stock_quantity > 10) {
      badges.push({
        label: 'In Stock',
        variant: getBadgeVariant('success'),
        icon: CheckCircle
      });
    } else if (part.stock_quantity > 0) {
      badges.push({
        label: `${part.stock_quantity} left`,
        variant: getBadgeVariant('warning'),
        icon: AlertCircle
      });
    } else {
      badges.push({
        label: 'Out of Stock',
        variant: getBadgeVariant('error'),
        icon: AlertCircle
      });
    }
  }

  // Add OEM badge
  if (part.is_oem) {
    badges.push({
      label: 'OEM',
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
  
  if (onAddToCart && part.stock_quantity && part.stock_quantity > 0) {
    actions.push({
      label: 'Add to Cart',
      variant: getButtonVariant('primary'),
      onClick: onAddToCart
    });
  } else if (onContact) {
    actions.push({
      label: 'Contact Seller',
      variant: getButtonVariant('primary'),
      onClick: onContact
    });
  }

  const metadata = (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Package className="h-3 w-3" />
          <span>{part.brand}</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          <span>{part.category}</span>
        </div>
        {part.warranty_period && (
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            <span>{part.warranty_period}</span>
          </div>
        )}
        {part.part_number && (
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>#{part.part_number}</span>
          </div>
        )}
      </div>
      
      {/* Compatibility */}
      {part.compatibility && part.compatibility.length > 0 && (
        <div className="text-xs text-muted-foreground pt-1 border-t border-border/50">
          <div className="font-medium">Compatible with:</div>
          <div className="line-clamp-2">
            {part.compatibility.slice(0, 3).join(', ')}
            {part.compatibility.length > 3 && ` +${part.compatibility.length - 3} more`}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <BaseCard
      item={part}
      imageAlt={`${part.brand} ${part.title}`}
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