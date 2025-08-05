// src/components/ui/BaseCard.tsx
// Mobile-first design that actually works on small screens

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

  // Loading skeleton
  if (loading) {
    return (
      <Card className="mb-3 border border-gray-200 hover:border-gray-300 transition-colors">
        <CardContent className="p-0">
          <div className="flex animate-pulse">
            <div className="w-28 h-20 sm:w-40 sm:h-32 bg-gray-200 flex-shrink-0"></div>
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

  // MOBILE-FIRST CARD - No fixed heights, natural flow
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
          {/* IMAGE - Mobile optimized sizes */}
          <div className="relative w-28 h-20 sm:w-40 sm:h-32 flex-shrink-0 bg-gray-100 rounded-l overflow-hidden">
            <img
              src={item.images?.[0] || '/placeholder-image.jpg'}
              alt={imageAlt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            
            {/* Featured badge */}
            {item.is_featured && (
              <div className="absolute top-1 left-1">
                <span className="text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded font-medium">
                  Featured
                </span>
              </div>
            )}

            {/* Save button */}
            {onSave && (
              <button
                className="absolute top-1 right-1 w-6 h-6 bg-white/90 rounded-full shadow-sm flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  onSave();
                }}
              >
                <Heart className="h-3 w-3 text-gray-600" />
              </button>
            )}
          </div>

          {/* CONTENT - Mobile-first layout */}
          <div className="flex-1 min-w-0 p-3 sm:p-4">
            {/* Title - Mobile readable */}
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 leading-5 mb-1">
              {item.title}
            </h3>
            
            {/* Specs - One line only */}
            {metadata && (
              <div className="text-xs sm:text-sm text-gray-600 mb-1 truncate">
                {metadata}
              </div>
            )}
            
            {/* Location */}
            <div className="text-xs sm:text-sm text-gray-500 mb-1">
              {item.location}
            </div>
            
            {/* Price and date row */}
            <div className="flex items-end justify-between mt-2">
              <div>
                {/* Price - Large and readable */}
                <div className="text-base sm:text-lg font-bold text-green-600">
                  {pricePrefix}{formatPrice(safePrice)}{priceSuffix}
                </div>
                {/* Date below price */}
                <div className="text-xs text-gray-400">
                  {formatDate(item.created_at)}
                </div>
              </div>
              
              {/* Badge */}
              {badges.length > 0 && (
                <div className="ml-2 flex-shrink-0">
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200">
                    {badges[0].label}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BaseCard;