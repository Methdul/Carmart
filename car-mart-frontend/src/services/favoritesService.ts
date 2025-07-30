const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:3001/api';

interface FavoriteItem {
  id: string;
  item_type: 'vehicle' | 'part' | 'service';
  item_id: string;
  created_at: string;
  item_details: {
    id: string;
    title: string;
    price: number;
    location: string;
    images: string[];
    is_active: boolean;
    // Vehicle specific
    make?: string;
    model?: string;
    year?: number;
    // Part specific
    brand?: string;
    category?: string;
    // Service specific
    service_type?: string;
  } | null;
}

interface FavoritesStats {
  total: number;
  vehicles: number;
  parts: number;
  services: number;
}

interface FavoritesResponse {
  success: boolean;
  data: FavoriteItem[];
  stats: FavoritesStats;
  total: number;
}

class FavoritesService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  // Get user's favorites
  async getFavorites(): Promise<FavoritesResponse> {
    const response = await fetch(`${API_BASE_URL}/favorites`, {
      headers: this.getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch favorites');
    }

    return response.json();
  }

  // Add item to favorites
  async addFavorite(itemType: 'vehicle' | 'part' | 'service', itemId: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/favorites`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ itemType, itemId })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add favorite');
    }

    return data;
  }

  // Remove item from favorites
  async removeFavorite(itemType: 'vehicle' | 'part' | 'service', itemId: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/favorites/${itemType}/${itemId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to remove favorite');
    }

    return data;
  }
}

export const favoritesService = new FavoritesService();
export type { FavoriteItem, FavoritesStats };