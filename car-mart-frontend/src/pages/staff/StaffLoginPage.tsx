// File: car-mart-frontend/src/pages/staff/StaffLoginPage.tsx
// FIXED VERSION - Now redirects properly after login
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
      // API call to your working backend
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
        
        // 🔥 FIXED: Actually redirect to dashboard instead of just showing alert
        console.log('Login successful, redirecting to dashboard...');
        
        // Option 1: Direct redirect (simple)
        window.location.href = '/staff/dashboard';
        
        // Option 2: If using React Router, use navigate instead:
        // navigate('/staff/dashboard');
        
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
                    placeholder="admin@example.com"
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

        {/* Working Credentials */}
        <Card className="mt-4 border-dashed">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground text-center mb-2">
              <strong>Working Credentials:</strong>
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Email: admin@example.com<br />
              Password: admin123
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffLoginPage;