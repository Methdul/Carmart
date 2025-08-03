const API_BASE_URL = 'http://localhost:3001/api';

class StaffAuthService {
  constructor() {
    this.token = localStorage.getItem('staff_token');
  }

  getAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };
  }

  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/staff/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      await fetch(`${API_BASE_URL}/staff/logout`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });
    } catch (error) {
      console.error('Staff logout error:', error);
    } finally {
      this.token = null;
      localStorage.removeItem('staff_token');
      localStorage.removeItem('staff_user');
    }
  }

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

export const staffAuthService = new StaffAuthService();