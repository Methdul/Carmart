const API_BASE_URL = 'http://localhost:3001/api';

class StaffApiService {
  constructor() {
    this.token = localStorage.getItem('staff_token');
  }

  getAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };
  }

  updateToken() {
    this.token = localStorage.getItem('staff_token');
  }

  async apiRequest(endpoint, options = {}) {
    this.updateToken(); // Ensure we have the latest token
    
    try {
      const response = await fetch(`${API_BASE_URL}/staff${endpoint}`, {
        ...options,
        headers: {
          ...this.getAuthHeaders(),
          ...options.headers,
        },
      });

      const data = await response.json();

      // Handle authentication errors
      if (response.status === 401) {
        localStorage.removeItem('staff_token');
        localStorage.removeItem('staff_user');
        window.location.href = '/staff/login';
        return { success: false, message: 'Session expired' };
      }

      return data;
    } catch (error) {
      console.error('Staff API request error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  }

  // Authentication
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/staff/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.data) {
        this.token = data.data.token;
        localStorage.setItem('staff_token', this.token);
        localStorage.setItem('staff_user', JSON.stringify(data.data.staff));
      }

      return data;
    } catch (error) {
      console.error('Staff login error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  }

  async logout() {
    try {
      await this.apiRequest('/logout', { method: 'POST' });
    } catch (error) {
      console.error('Staff logout error:', error);
    } finally {
      this.token = null;
      localStorage.removeItem('staff_token');
      localStorage.removeItem('staff_user');
    }
  }

  // Dashboard
  async getDashboardStats() {
    return await this.apiRequest('/dashboard');
  }

  // Support Tickets
  async getTickets(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return await this.apiRequest(`/tickets?${params}`);
  }

  async getTicketDetails(ticketId) {
    return await this.apiRequest(`/tickets/${ticketId}`);
  }

  async assignTicket(ticketId, staffId) {
    return await this.apiRequest(`/tickets/${ticketId}/assign`, {
      method: 'POST',
      body: JSON.stringify({ staffId }),
    });
  }

  async respondToTicket(ticketId, message, changeStatus = null) {
    return await this.apiRequest(`/tickets/${ticketId}/respond`, {
      method: 'POST',
      body: JSON.stringify({ message, changeStatus }),
    });
  }

  // Content Moderation
  async getModerationQueue(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return await this.apiRequest(`/moderation?${params}`);
  }

  async reviewModerationItem(itemId, action, notes = '') {
    return await this.apiRequest(`/moderation/${itemId}/review`, {
      method: 'POST',
      body: JSON.stringify({ action, notes }),
    });
  }

  // User Management
  async searchUsers(query, filters = {}) {
    const params = new URLSearchParams({ q: query, ...filters }).toString();
    return await this.apiRequest(`/users/search?${params}`);
  }

  async performUserAction(userId, action, reason = '') {
    return await this.apiRequest(`/users/${userId}/action`, {
      method: 'POST',
      body: JSON.stringify({ action, reason }),
    });
  }

  // Business Applications
  async getBusinessApplications(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return await this.apiRequest(`/business-applications?${params}`);
  }

  async reviewBusinessApplication(applicationId, action, notes = '') {
    return await this.apiRequest(`/business-applications/${applicationId}/review`, {
      method: 'POST',
      body: JSON.stringify({ action, notes }),
    });
  }

  // Staff Management (Super Staff Only)
  async getStaffUsers() {
    return await this.apiRequest('/staff-users');
  }

  async createStaffUser(staffData) {
    return await this.apiRequest('/staff-users', {
      method: 'POST',
      body: JSON.stringify(staffData),
    });
  }

  // Utility Methods
  isLoggedIn() {
    return !!this.token && !!localStorage.getItem('staff_user');
  }

  getStaffUser() {
    try {
      const staffData = localStorage.getItem('staff_user');
      return staffData ? JSON.parse(staffData) : null;
    } catch (error) {
      return null;
    }
  }

  isSuperStaff() {
    const staff = this.getStaffUser();
    return staff?.is_super_staff || false;
  }
}

export const staffApiService = new StaffApiService();