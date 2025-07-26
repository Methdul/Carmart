const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:3001/api';
//                                                                    ^^^^ CHANGED FROM 5000 TO 3001

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

  // Vehicle API methods
  async getVehicles(filters?: any) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });
    }
    const endpoint = `/vehicles${params.toString() ? `?${params.toString()}` : ''}`;
    return this.request(endpoint);
  }

  async getVehicleById(id: string) {
    return this.request(`/vehicles/${id}`);
  }

  // Parts API methods
  async getParts(filters?: any) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });
    }
    const endpoint = `/parts${params.toString() ? `?${params.toString()}` : ''}`;
    return this.request(endpoint);
  }

  async getPartById(id: string) {
    return this.request(`/parts/${id}`);
  }

  // Auth API methods
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

  // Services API methods (for future use)
  async getServices(filters?: any) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });
    }
    const endpoint = `/services${params.toString() ? `?${params.toString()}` : ''}`;
    return this.request(endpoint);
  }
}

export const apiService = new ApiService();