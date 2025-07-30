import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import { toast } from 'sonner';

interface FavoriteButtonProps {
  itemType: 'vehicle' | 'part' | 'service';
  itemId: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showText?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  itemType,
  itemId,
  variant = 'ghost',
  size = 'icon',
  className = '',
  showText = false
}) => {
  const { isFavorited, toggleFavorite } = useFavorites();
  const [isLoading, setIsLoading] = useState(false);

  const favorited = isFavorited(itemType, itemId);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click events
    
    setIsLoading(true);
    
    try {
      const success = await toggleFavorite(itemType, itemId);
      if (success) {
        toast.success(favorited ? 'Removed from favorites' : 'Added to favorites');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
      disabled={isLoading}
    >
      <Heart 
        className={`h-4 w-4 ${favorited ? 'fill-red-500 text-red-500' : 'text-gray-400'} ${showText ? 'mr-2' : ''}`}
      />
      {showText && (favorited ? 'Saved' : 'Save')}
    </Button>
  );
};

export default FavoriteButton;