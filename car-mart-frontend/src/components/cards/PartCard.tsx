// src/components/cards/PartCard.tsx
// Fixed version with proper data mapping for BaseCard

import React from 'react';
import { BaseCard } from '@/components/ui/BaseCard';
import { Package, Settings, Shield, Wrench } from 'lucide-react';
import { Part, CardAction, BadgeInfo } from '@/design-system/types';

interface PartCardProps {
  part: Part;
  onView?: () => void;
  onAddToCart?: () => void;
  onContact?: () => void;
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
  onAddToCart,
  onContact,
  onSave,
  onShare,
  showUser = false,
  showStats = false,
  layout = 'list',
  className
}) => {
  // ✅ Map part data to BaseCard item format
  const baseItem = {
    ...part,
    price: part.price || 0, // ✅ Ensure price is safe
    images: part.images || [],
    is_featured: part.is_featured || false,
    is_verified: false,
  };

  const badges: BadgeInfo[] = [];

  // Add condition badge
  if (part.condition) {
    badges.push({
      label: part.condition,
      variant: part.condition === 'New' ? 'default' : 'secondary'
    });
  }

  // Add OEM badge
  if (part.is_oem) {
    badges.push({
      label: 'OEM',
      variant: 'default' as const
    });
  }

  // Add stock status
  if (part.stock_quantity !== undefined) {
    badges.push({
      label: part.stock_quantity > 0 ? 'In Stock' : 'Out of Stock',
      variant: part.stock_quantity > 0 ? 'secondary' : 'destructive'
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
  
  if (onAddToCart && part.stock_quantity && part.stock_quantity > 0) {
    actions.push({
      label: 'Add to Cart',
      variant: 'default',
      onClick: onAddToCart
    });
  }

  // ✅ Create metadata for ikman style
  const metadata = (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <span>{part.brand}</span>
      <span>•</span>
      <span>{part.condition}</span>
      <span>•</span>
      <span>Part #{part.part_number}</span>
      {part.warranty_period && (
        <>
          <span>•</span>
          <span>{part.warranty_period} warranty</span>
        </>
      )}
    </div>
  );

  return (
    <BaseCard
      item={baseItem}
      imageAlt={`${part.brand} ${part.title}`}
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

export default PartCard;