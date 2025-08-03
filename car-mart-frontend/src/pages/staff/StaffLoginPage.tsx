// File: car-mart-frontend/src/pages/StaffLoginPage.tsx
import React, { useState } from 'react';
import { Eye, EyeOff, Shield, Lock, Mail, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const StaffLoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      // API call would go here
      const response = await fetch('http://localhost:3001/api/staff/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        // Store staff token and data
        localStorage.setItem('staff_token', result.data.token);
        localStorage.setItem('staff_user', JSON.stringify(result.data.staff));
        
        // Redirect to staff dashboard (in real app)
        alert('Login successful! Redirecting to dashboard...');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Staff login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Car Mart Staff</h1>
          <p className="text-muted-foreground mt-2">Sign in to access the admin dashboard</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Staff Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@carmart.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                className="w-full"
                disabled={loading || !formData.email || !formData.password}
                onClick={handleSubmit}
              >
                {loading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Restricted access for authorized staff only
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Debug Info (Remove in production) */}
        <Card className="mt-4 border-dashed">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground text-center mb-2">
              <strong>Demo Credentials:</strong>
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Email: admin@carmart.com<br />
              Password: CarMart2025!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffLoginPage;

// =============================================================================
// STAFF SERVICES CODE TO ADD TO YOUR PROJECT
// =============================================================================

/*

File: car-mart-frontend/src/services/staffAuthService.js
Staff Authentication Service

const API_BASE_URL = 'http://localhost:3001/api';

class StaffAuthService {
  constructor() {
    this.token = localStorage.getItem('staff_token');
    this.staff = this.getStaffUser();
  }

  // Get auth headers
  getAuthHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Login
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
        this.staff = data.data.staff;
        
        localStorage.setItem('staff_token', this.token);
        localStorage.setItem('staff_user', JSON.stringify(this.staff));
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

  // Logout
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
      this.staff = null;
      localStorage.removeItem('staff_token');
      localStorage.removeItem('staff_user');
    }
  }

  // Check if staff is logged in
  isLoggedIn() {
    return !!this.token && !!this.staff;
  }

  // Get current staff user
  getStaffUser() {
    try {
      const staffData = localStorage.getItem('staff_user');
      return staffData ? JSON.parse(staffData) : null;
    } catch (error) {
      return null;
    }
  }

  // Check if super staff
  isSuperStaff() {
    return this.staff?.is_super_staff || false;
  }

  // API request helper
  async apiRequest(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}/staff${endpoint}`, {
        ...options,
        headers: {
          ...this.getAuthHeaders(),
          ...options.headers,
        },
      });

      const data = await response.json();

      // Handle token expiration
      if (response.status === 401 && data.message?.includes('token')) {
        this.logout();
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
}

export const staffAuthService = new StaffAuthService();

*/