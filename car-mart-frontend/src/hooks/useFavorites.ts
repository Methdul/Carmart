import { useState, useEffect } from 'react';
import { favoritesService, FavoriteItem, FavoritesStats } from '@/services/favoritesService';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [stats, setStats] = useState<FavoritesStats>({ total: 0, vehicles: 0, parts: 0, services: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await favoritesService.getFavorites();
      setFavorites(response.data);
      setStats(response.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch favorites');
      console.error('Error fetching favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const addFavorite = async (itemType: 'vehicle' | 'part' | 'service', itemId: string) => {
    try {
      await favoritesService.addFavorite(itemType, itemId);
      await fetchFavorites(); // Refresh the list
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add favorite');
      return false;
    }
  };

  const removeFavorite = async (itemType: 'vehicle' | 'part' | 'service', itemId: string) => {
    try {
      await favoritesService.removeFavorite(itemType, itemId);
      await fetchFavorites(); // Refresh the list
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove favorite');
      return false;
    }
  };

  const toggleFavorite = async (itemType: 'vehicle' | 'part' | 'service', itemId: string) => {
    const isCurrentlyFavorited = favorites.some(
      fav => fav.item_type === itemType && fav.item_id === itemId
    );

    if (isCurrentlyFavorited) {
      return await removeFavorite(itemType, itemId);
    } else {
      return await addFavorite(itemType, itemId);
    }
  };

  const isFavorited = (itemType: 'vehicle' | 'part' | 'service', itemId: string) => {
    return favorites.some(fav => fav.item_type === itemType && fav.item_id === itemId);
  };

  return {
    favorites,
    stats,
    loading,
    error,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorited,
    refreshFavorites: fetchFavorites
  };
};