// src/components/ui/BaseCard.tsx
// Fixed version with correct Badge and Button variants

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Heart, 
  Share2, 
  Eye, 
  Star, 
  MapPin, 
  Calendar, 
  Verified,
  Crown,
  Clock,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { designTokens, cardStates } from '@/design-system/tokens';
import { BaseItem } from '@/design-system/types';

// Updated interfaces to match available variants
interface CardAction {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'; // ✅ Fixed variants
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

interface BadgeInfo {
  label: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline'; // ✅ Fixed variants  
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
  pricePrefix = '₹',
  priceSuffix = '',
  badges = [],
  actions = [],
  metadata,
  showUser = true,
  showStats = false,
  layout = 'grid',
  size = 'md',
  onClick,
  onSave,
  onShare,
  className,
  loading = false
}) => {
  // Card styling based on props and state
  const cardClass = cn(
    cardStates.default,
    cardStates.hover,
    item.is_featured && cardStates.featured,
    loading && cardStates.loading,
    'transition-all duration-300 cursor-pointer group',
    layout === 'list' && 'flex-row',
    className
  );

  // Image height based on size
  const imageHeight = {
    sm: '150px',
    md: designTokens.card.imageHeight,
    lg: '250px'
  }[size];

  // Card height based on size
  const cardHeight = {
    sm: '280px',
    md: designTokens.card.minHeight,
    lg: '380px'
  }[size];

  // Format price with proper currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!item.user) return 'U';
    const first = item.user.first_name?.[0] || '';
    const last = item.user.last_name?.[0] || '';
    return (first + last).toUpperCase() || 'U';
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Loading skeleton
  if (loading) {
    return (
      <Card className={cn(cardStates.loading, className)} style={{ height: cardHeight }}>
        <div className="animate-pulse">
          <div className="bg-muted rounded-t-lg" style={{ height: imageHeight }} />
          <CardHeader>
            <div className="h-6 bg-muted rounded mb-2" />
            <div className="h-8 bg-muted rounded w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-3/4" />
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className={cardClass}
      onClick={onClick}
      style={{ minHeight: cardHeight }}
    >
      {/* Image Section */}
      <div className={cn(
        "relative overflow-hidden",
        layout === 'grid' ? 'rounded-t-lg' : 'rounded-l-lg w-1/3'
      )}>
        <img
          src={item.images?.[0] || '/placeholder-image.jpg'}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ height: layout === 'grid' ? imageHeight : '100%' }}
          loading="lazy"
        />
        
        {/* Image Overlay Actions */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onSave && (
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                onSave();
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
          )}
          {onShare && (
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                onShare();
              }}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Image Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {item.is_featured && (
            <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
              <Crown className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
          {item.is_verified && (
            <Badge variant="secondary" className="bg-green-500 text-white border-0">
              <Verified className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          )}
          {badges.map((badge, index) => (
            <Badge key={index} variant={badge.variant} className="border-0">
              {badge.icon && <badge.icon className="h-3 w-3 mr-1" />}
              {badge.label}
            </Badge>
          ))}
        </div>

        {/* View Count Overlay */}
        {showStats && item.views_count && (
          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary" className="bg-black/50 text-white border-0">
              <Eye className="h-3 w-3 mr-1" />
              {item.views_count > 1000 ? `${Math.floor(item.views_count / 1000)}k` : item.views_count}
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={cn("flex flex-col flex-1", layout === 'list' && 'w-2/3')}>
        <CardHeader className="pb-3">
          {/* Title and Price Row */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-primary">
                {pricePrefix}{formatPrice(item.price)}{priceSuffix}
              </div>
              {item.user?.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{item.user.rating.toFixed(1)}</span>
                  {item.user.total_reviews && (
                    <span className="text-xs text-muted-foreground">({item.user.total_reviews})</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0 pb-3 flex-1">
          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 min-h-[2.5rem]">
            {item.description}
          </p>
          
          {/* Location and Date */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{item.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatDate(item.created_at)}</span>
            </div>
          </div>

          {/* Custom Metadata */}
          {metadata && (
            <div className="space-y-2">
              {metadata}
            </div>
          )}

          {/* User Info */}
          {showUser && item.user && (
            <div className="flex items-center gap-2 pt-2 border-t border-border/50">
              <Avatar className="h-8 w-8">
                <AvatarImage src={item.user.avatar} />
                <AvatarFallback className="text-xs">{getUserInitials()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {item.user.first_name} {item.user.last_name}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {item.user.account_type || 'Individual'}
                </p>
              </div>
              {item.favorites_count && item.favorites_count > 0 && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Heart className="h-3 w-3" />
                  <span>{item.favorites_count}</span>
                </div>
              )}
            </div>
          )}
        </CardContent>

        {/* Actions Section */}
        {actions.length > 0 && (
          <CardFooter className="pt-0 gap-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                size="sm"
                className="flex-1"
                disabled={action.disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick();
                }}
              >
                {action.loading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                ) : (
                  action.icon && <action.icon className="h-4 w-4 mr-2" />
                )}
                {action.label}
              </Button>
            ))}
          </CardFooter>
        )}
      </div>
    </Card>
  );
};

export default BaseCard;