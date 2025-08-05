// src/components/cards/PartCard.tsx
// Professional part card with clean metadata

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
    price: part.price || 0,
    images: part.images || [],
    is_featured: part.is_featured || false,
    is_verified: false,
  };

  // Single most important badge - condition
  const badges: BadgeInfo[] = [];
  if (part.condition) {
    badges.push({
      label: part.condition,
      variant: part.condition === 'New' ? 'default' : 'secondary'
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

  // Professional metadata - just brand
  const metadata = (
    <span>{part.brand}</span>
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