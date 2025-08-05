// src/components/ui/BaseCard.tsx
// Fixed version with proper error handling and ikman.lk style

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Share2, 
  Eye, 
  Star, 
  MapPin, 
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BaseItem } from '@/design-system/types';

interface CardAction {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

interface BadgeInfo {
  label: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  icon?: React.ComponentType<{ className?: string }>;
}

interface BaseCardProps {
  item: BaseItem;
  imageAlt: string;
  pricePrefix?: string;
  priceSuffix?: string;
  badges?: BadgeInfo[];
  actions?: CardAction[];
  metadata?: React.ReactNode;
  showUser?: boolean;
  showStats?: boolean;
  layout?: 'grid' | 'list';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  className?: string;
  loading?: boolean;
}

export const BaseCard: React.FC<BaseCardProps> = ({
  item,
  imageAlt,
  pricePrefix = 'Rs ',
  priceSuffix = '',
  badges = [],
  actions = [],
  metadata,
  showUser = false,
  showStats = false,
  layout = 'list',
  size = 'md',
  onClick,
  onSave,
  onShare,
  className,
  loading = false
}) => {
  // ✅ Safe format price with proper null checking
  const formatPrice = (price: number | undefined | null) => {
    if (price === null || price === undefined || isNaN(price)) {
      return '0';
    }
    return price.toLocaleString();
  };

  // Format date - simple
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  };

  // ✅ Safe price value
  const safePrice = item.price || 0;

  // Loading skeleton - ikman style
  if (loading) {
    return (
      <Card className="mb-3 border border-gray-200 hover:border-gray-300 transition-colors">
        <CardContent className="p-0">
          <div className="flex animate-pulse">
            <div className="w-36 h-28 bg-gray-200 flex-shrink-0 rounded-l-md"></div>
            <div className="flex-1 p-3 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ikman.lk style - simple list layout (always list layout)
  return (
    <Card 
      className={cn(
        "mb-3 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 cursor-pointer bg-white",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="flex">
          {/* Image - ikman style */}
          <div className="relative w-36 h-28 flex-shrink-0 overflow-hidden rounded-l-md">
            <img
              src={item.images?.[0] || '/placeholder-image.jpg'}
              alt={imageAlt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            
            {/* Simple save button - top right */}
            {onSave && (
              <button
                className="absolute top-1 right-1 p-1 bg-white/80 hover:bg-white rounded-full shadow-sm opacity-0 hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onSave();
                }}
              >
                <Heart className="h-3 w-3 text-gray-600" />
              </button>
            )}

            {/* Featured badge */}
            {item.is_featured && (
              <div className="absolute top-1 left-1">
                <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded">
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Content - ikman style */}
          <div className="flex-1 p-3 min-h-28 flex flex-col justify-between">
            <div>
              {/* Title */}
              <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1 leading-tight">
                {item.title}
              </h3>
              
              {/* Meta info - year, location etc */}
              <div className="text-xs text-gray-500 mb-2">
                {metadata}
              </div>
              
              {/* Location and date */}
              <div className="text-xs text-gray-500 mb-2">
                <span>{item.location}</span>
                <span className="mx-1">•</span>
                <span>{formatDate(item.created_at)}</span>
              </div>
            </div>

            {/* Price and badges row */}
            <div className="flex items-center justify-between">
              {/* Price - ikman green style */}
              <div className="text-lg font-semibold text-green-600">
                {pricePrefix}{formatPrice(safePrice)}{priceSuffix}
              </div>
              
              {/* Simple badges */}
              <div className="flex gap-1">
                {badges.slice(0, 2).map((badge, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BaseCard;