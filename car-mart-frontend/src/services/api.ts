// src/services/api.ts
// Updated API service to support unified design system

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
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
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Helper method to build query parameters
  private buildQueryParams(filters: any): string {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            // Handle array filters (e.g., multiple selections)
            if (key === 'priceRange') {
              params.append('minPrice', String(value[0]));
              params.append('maxPrice', String(value[1]));
            } else {
              value.forEach(v => params.append(key, String(v)));
            }
          } else if (typeof value === 'boolean') {
            if (value) params.append(key, 'true');
          } else {
            params.append(key, String(value));
          }
        }
      });
    }
    
    return params.toString();
  }

  // ==================== AUTHENTICATION ====================
  
  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    location: string;
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: { email: string; password: string }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
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
    const refreshToken = localStorage.getItem('refresh_token');
    return this.request('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  // ==================== VEHICLES ====================

  async getVehicles(filters?: any) {
    const queryParams = this.buildQueryParams(filters);
    const endpoint = `/vehicles${queryParams ? `?${queryParams}` : ''}`;
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

  // ==================== RENTALS ====================

  async getRentals(filters?: any) {
    const queryParams = this.buildQueryParams(filters);
    const endpoint = `/rentals${queryParams ? `?${queryParams}` : ''}`;
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

  // Rental booking methods
  async checkRentalAvailability(id: string, startDate: string, endDate: string) {
    const params = new URLSearchParams({
      startDate,
      endDate
    });
    return this.request(`/rentals/${id}/availability?${params.toString()}`);
  }

  async bookRental(id: string, bookingData: {
    startDate: string;
    endDate: string;
    totalDays: number;
    totalAmount: number;
    notes?: string;
  }) {
    const token = localStorage.getItem('auth_token');
    return this.request(`/rentals/${id}/book`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(bookingData),
    });
  }

  // ==================== PARTS ====================

  async getParts(filters?: any) {
    const queryParams = this.buildQueryParams(filters);
    const endpoint = `/parts${queryParams ? `?${queryParams}` : ''}`;
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

  // ==================== SERVICES ====================

  async getServices(filters?: any) {
    const queryParams = this.buildQueryParams(filters);
    const endpoint = `/services${queryParams ? `?${queryParams}` : ''}`;
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

  // Service booking methods
  async getServiceAvailability(id: string, date: string) {
    return this.request(`/services/${id}/availability?date=${date}`);
  }

  async bookService(id: string, bookingData: {
    date: string;
    time: string;
    notes?: string;
    requirements?: string[];
  }) {
    const token = localStorage.getItem('auth_token');
    return this.request(`/services/${id}/book`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(bookingData),
    });
  }

  async requestServiceQuote(id: string, quoteData: {
    description: string;
    vehicleInfo?: any;
    requirements?: string[];
    preferredDate?: string;
  }) {
    const token = localStorage.getItem('auth_token');
    return this.request(`/services/${id}/quote`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(quoteData),
    });
  }

  // ==================== USER MANAGEMENT ====================

  async getUserProfile() {
    const token = localStorage.getItem('auth_token');
    return this.request('/users/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  }

  async updateUserProfile(profileData: any) {
    const token = localStorage.getItem('auth_token');
    return this.request('/users/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData),
    });
  }

  async convertToBusinessAccount(businessData: any) {
    const token = localStorage.getItem('auth_token');
    return this.request('/users/convert-to-business', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(businessData),
    });
  }

  async deleteAccount() {
    const token = localStorage.getItem('auth_token');
    return this.request('/users/account', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  }

  // ==================== FAVORITES ====================

  async getFavorites() {
    const token = localStorage.getItem('auth_token');
    return this.request('/favorites', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  }

  async addToFavorites(itemType: 'vehicle' | 'part' | 'service', itemId: string) {
    const token = localStorage.getItem('auth_token');
    return this.request('/favorites', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ itemType, itemId }),
    });
  }

  async removeFromFavorites(itemType: 'vehicle' | 'part' | 'service', itemId: string) {
    const token = localStorage.getItem('auth_token');
    return this.request(`/favorites/${itemType}/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  }

  // ==================== REVIEWS ====================

  async getReviews(userId: string) {
    return this.request(`/reviews/${userId}`);
  }

  async getItemReviews(itemType: 'vehicle' | 'part' | 'service', itemId: string) {
    return this.request(`/reviews/${itemType}/${itemId}`);
  }

  async createReview(reviewData: {
    reviewedUserId: string;
    listingType: 'vehicle' | 'part' | 'service';
    listingId: string;
    rating: number;
    title?: string;
    comment?: string;
  }) {
    const token = localStorage.getItem('auth_token');
    return this.request('/reviews', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(reviewData),
    });
  }

  // ==================== MESSAGING ====================

  async getConversations() {
    const token = localStorage.getItem('auth_token');
    return this.request('/messages', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  }

  async getMessages(conversationId: string) {
    const token = localStorage.getItem('auth_token');
    return this.request(`/messages/${conversationId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  }

  async sendMessage(messageData: {
    recipientId: string;
    conversationId?: string;
    content: string;
    messageType?: 'text' | 'image' | 'file';
  }) {
    const token = localStorage.getItem('auth_token');
    return this.request('/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(messageData),
    });
  }

  // ==================== FILE UPLOAD ====================

  async uploadImages(files: File[]) {
    const token = localStorage.getItem('auth_token');
    const formData = new FormData();
    
    files.forEach((file, index) => {
      formData.append(`images`, file);
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

  async uploadSingleImage(file: File) {
    const token = localStorage.getItem('auth_token');
    const formData = new FormData();
    formData.append('image', file);

    return this.request('/upload/image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    });
  }

  // ==================== GLOBAL SEARCH ====================

  async globalSearch(query: string, filters?: {
    types?: ('vehicle' | 'part' | 'service')[];
    location?: string;
    maxResults?: number;
  }) {
    const params = new URLSearchParams({ query });
    
    if (filters) {
      if (filters.types) {
        filters.types.forEach(type => params.append('types', type));
      }
      if (filters.location) params.append('location', filters.location);
      if (filters.maxResults) params.append('maxResults', filters.maxResults.toString());
    }

    return this.request(`/search?${params.toString()}`);
  }

  // ==================== ANALYTICS ====================

  async trackView(itemType: 'vehicle' | 'part' | 'service', itemId: string) {
    return this.request('/analytics/view', {
      method: 'POST',
      body: JSON.stringify({ itemType, itemId }),
    });
  }

  async trackSearch(searchData: {
    searchType: 'vehicle' | 'part' | 'service';
    query?: string;
    filters?: any;
    resultsCount: number;
  }) {
    return this.request('/analytics/search', {
      method: 'POST',
      body: JSON.stringify(searchData),
    });
  }

  // ==================== COMPARISON ====================

  async compareVehicles(vehicleIds: string[]) {
    const params = new URLSearchParams();
    vehicleIds.forEach(id => params.append('ids', id));
    return this.request(`/vehicles/compare?${params.toString()}`);
  }

  async compareParts(partIds: string[]) {
    const params = new URLSearchParams();
    partIds.forEach(id => params.append('ids', id));
    return this.request(`/parts/compare?${params.toString()}`);
  }

  async compareServices(serviceIds: string[]) {
    const params = new URLSearchParams();
    serviceIds.forEach(id => params.append('ids', id));
    return this.request(`/services/compare?${params.toString()}`);
  }

  // ==================== NOTIFICATIONS ====================

  async getNotifications() {
    const token = localStorage.getItem('auth_token');
    return this.request('/notifications', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  }

  async markNotificationAsRead(notificationId: string) {
    const token = localStorage.getItem('auth_token');
    return this.request(`/notifications/${notificationId}/read`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  }

  async markAllNotificationsAsRead() {
    const token = localStorage.getItem('auth_token');
    return this.request('/notifications/read-all', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  }

  // ==================== HELPER METHODS ====================

  // Method to get current user from token
  getCurrentUser() {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch {
      return null;
    }
  }

  // Method to check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('auth_token');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  // Method to logout and clear tokens
  clearAuth() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
  }
}

// Create and export singleton instance
export const apiService = new ApiService();
export default apiService;