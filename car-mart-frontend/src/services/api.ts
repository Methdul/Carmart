// car-mart-frontend/src/services/api.ts
// ✅ COMPLETE API SERVICE - REPLACE ENTIRE FILE

const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // ✅ VEHICLE API METHODS
  async getVehicles(filters?: any) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            // Handle array filters like healthScore
            if (key === 'healthScore') {
              params.append('minHealthScore', String(value[0]));
              params.append('maxHealthScore', String(value[1]));
            }
          } else if (typeof value === 'boolean') {
            if (value) params.append(key, 'true');
          } else {
            params.append(key, String(value));
          }
        }
      });
    }
    const endpoint = `/vehicles${params.toString() ? `?${params.toString()}` : ''}`;
    return this.request(endpoint);
  }

  async getVehicleById(id: string) {
    return this.request(`/vehicles/${id}`);
  }

  async createVehicle(vehicleData: any) {
    const token = localStorage.getItem('auth_token');
    return this.request('/vehicles', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(vehicleData),
    });
  }

  async updateVehicle(id: string, vehicleData: any) {
    const token = localStorage.getItem('auth_token');
    return this.request(`/vehicles/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(vehicleData),
    });
  }

  async deleteVehicle(id: string) {
    const token = localStorage.getItem('auth_token');
    return this.request(`/vehicles/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  }

  // ✅ PARTS API METHODS
  async getParts(filters?: any) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            // Handle array filters
            if (key === 'priceRange') {
              params.append('minPrice', String(value[0]));
              params.append('maxPrice', String(value[1]));
            }
          } else if (typeof value === 'boolean') {
            if (value) params.append(key, 'true');
          } else {
            params.append(key, String(value));
          }
        }
      });
    }
    const endpoint = `/parts${params.toString() ? `?${params.toString()}` : ''}`;
    return this.request(endpoint);
  }

  async getPartById(id: string) {
    return this.request(`/parts/${id}`);
  }

  async createPart(partData: any) {
    const token = localStorage.getItem('auth_token');
    return this.request('/parts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(partData),
    });
  }

  async updatePart(id: string, partData: any) {
    const token = localStorage.getItem('auth_token');
    return this.request(`/parts/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(partData),
    });
  }

  async deletePart(id: string) {
    const token = localStorage.getItem('auth_token');
    return this.request(`/parts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  }

  // ✅ SERVICES API METHODS
  async getServices(filters?: any) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            // Handle array filters
            if (key === 'priceRange') {
              params.append('minPrice', String(value[0]));
              params.append('maxPrice', String(value[1]));
            }
          } else if (typeof value === 'boolean') {
            if (value) params.append(key, 'true');
          } else {
            params.append(key, String(value));
          }
        }
      });
    }
    const endpoint = `/services${params.toString() ? `?${params.toString()}` : ''}`;
    return this.request(endpoint);
  }

  async getServiceById(id: string) {
    return this.request(`/services/${id}`);
  }

  async createService(serviceData: any) {
    const token = localStorage.getItem('auth_token');
    return this.request('/services', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(serviceData),
    });
  }

  async updateService(id: string, serviceData: any) {
    const token = localStorage.getItem('auth_token');
    return this.request(`/services/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(serviceData),
    });
  }

  async deleteService(id: string) {
    const token = localStorage.getItem('auth_token');
    return this.request(`/services/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  }

  // ✅ RENTALS API METHODS
  async getRentals(filters?: any) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            // Handle array filters
            if (key === 'priceRange') {
              params.append('minPrice', String(value[0]));
              params.append('maxPrice', String(value[1]));
            }
          } else if (typeof value === 'boolean') {
            if (value) params.append(key, 'true');
          } else {
            params.append(key, String(value));
          }
        }
      });
    }
    const endpoint = `/rentals${params.toString() ? `?${params.toString()}` : ''}`;
    return this.request(endpoint);
  }

  async getRentalById(id: string) {
    return this.request(`/rentals/${id}`);
  }

  async createRental(rentalData: any) {
    const token = localStorage.getItem('auth_token');
    return this.request('/rentals', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(rentalData),
    });
  }

  async updateRental(id: string, rentalData: any) {
    const token = localStorage.getItem('auth_token');
    return this.request(`/rentals/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(rentalData),
    });
  }

  async deleteRental(id: string) {
    const token = localStorage.getItem('auth_token');
    return this.request(`/rentals/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  }

  async getRentalStats() {
    return this.request('/rentals/stats/overview');
  }

  // ✅ AUTH API METHODS
  async login(credentials: { email: string; password: string }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    const token = localStorage.getItem('auth_token');
    return this.request('/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  }

  async refreshToken() {
    const token = localStorage.getItem('refresh_token');
    return this.request('/auth/refresh', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  }

  // ✅ USER API METHODS
  async getProfile() {
    const token = localStorage.getItem('auth_token');
    return this.request('/users/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async updateProfile(userData: any) {
    const token = localStorage.getItem('auth_token');
    return this.request('/users/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData),
    });
  }

  async getUserListings(userId: string, type: string = 'all') {
    const token = localStorage.getItem('auth_token');
    return this.request(`/users/${userId}/listings?type=${type}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async convertToBusiness(businessData: any) {
    const token = localStorage.getItem('auth_token');
    return this.request('/users/convert-to-business', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(businessData),
    });
  }

  // ✅ FAVORITES API METHODS
  async getFavorites() {
    const token = localStorage.getItem('auth_token');
    return this.request('/favorites', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async addFavorite(itemType: string, itemId: string) {
    const token = localStorage.getItem('auth_token');
    return this.request('/favorites', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ itemType, itemId }),
    });
  }

  async removeFavorite(itemType: string, itemId: string) {
    const token = localStorage.getItem('auth_token');
    return this.request(`/favorites/${itemType}/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  }

  // ✅ SEARCH API METHODS
  async globalSearch(query: string, filters?: any) {
    const params = new URLSearchParams();
    params.append('q', query);
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });
    }
    
    return this.request(`/search?${params.toString()}`);
  }

  async getSearchSuggestions(query: string) {
    return this.request(`/search/suggestions?q=${encodeURIComponent(query)}`);
  }

  // ✅ UPLOAD API METHODS
  async uploadImages(files: File[]) {
    const token = localStorage.getItem('auth_token');
    const formData = new FormData();
    
    files.forEach((file, index) => {
      formData.append('images', file);
    });

    return this.request('/upload/images', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
        // Don't set Content-Type for FormData, let browser set it
      },
      body: formData,
    });
  }

  async deleteImage(imageUrl: string) {
    const token = localStorage.getItem('auth_token');
    return this.request('/upload/delete', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ imageUrl }),
    });
  }

  // ✅ STAFF API METHODS
  async staffLogin(credentials: { email: string; password: string }) {
    return this.request('/staff/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getStaffDashboard() {
    const token = localStorage.getItem('staff_token');
    return this.request('/staff/dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // ✅ COMPARISON API METHODS
  async addToComparison(itemType: string, itemId: string) {
    const token = localStorage.getItem('auth_token');
    return this.request('/comparison/add', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ itemType, itemId }),
    });
  }

  async removeFromComparison(itemType: string, itemId: string) {
    const token = localStorage.getItem('auth_token');
    return this.request('/comparison/remove', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ itemType, itemId }),
    });
  }

  async getComparison(itemType: string) {
    const token = localStorage.getItem('auth_token');
    return this.request(`/comparison/${itemType}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // ✅ HEALTH CHECK METHODS
  async healthCheck() {
    return this.request('/health');
  }

  async getApiInfo() {
    return this.request('/upload-info');
  }
}

export const apiService = new ApiService();