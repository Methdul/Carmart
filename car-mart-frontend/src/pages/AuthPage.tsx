// car-mart-frontend/src/pages/AuthPage.tsx
// ✅ FIXED VERSION - REPLACE ENTIRE FILE

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link, useNavigate } from "react-router-dom";
import { apiService } from "@/services/api"; // ✅ Use apiService instead of authService

const AuthPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [loginData, setLoginData] = useState({ 
    email: "", 
    password: "" 
  });
  
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  // ✅ HELPER FUNCTION TO STORE AUTH DATA
  const storeAuthData = (response: any) => {
    console.log('🔐 Storing auth data:', response);
    
    if (response.data?.token && response.data?.user) {
      // Store token and user data
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user_data', JSON.stringify(response.data.user));
      
      // Also store refresh token if available
      if (response.data.refresh_token) {
        localStorage.setItem('refresh_token', response.data.refresh_token);
      }
      
      console.log('✅ Auth data stored successfully');
      
      // ✅ TRIGGER STORAGE EVENT TO UPDATE HEADER
      window.dispatchEvent(new Event('storage'));
      
      return true;
    } else {
      console.error('❌ Invalid response format:', response);
      return false;
    }
  };

  // ✅ FIXED LOGIN HANDLER
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // Validate form
      if (!loginData.email || !loginData.password) {
        setError("Please fill in all fields");
        return;
      }

      console.log("🔐 Attempting login with:", loginData.email);
      
      // ✅ Call API service directly
      const response = await apiService.login({
        email: loginData.email,
        password: loginData.password
      });

      console.log('📥 Login response:', response);

      if (response.success && response.data) {
        // ✅ Store authentication data properly
        const stored = storeAuthData(response);
        
        if (stored) {
          setSuccess("Login successful! Redirecting...");
          
          // Short delay to show success message and let header update
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        } else {
          setError("Login successful but failed to store user data");
        }
      } else {
        setError(response.message || "Login failed - invalid credentials");
      }
    } catch (error: any) {
      console.error("❌ Login error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ FIXED REGISTRATION HANDLER
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // Validate form
      if (!registerData.firstName || !registerData.lastName || !registerData.email || !registerData.password) {
        setError("Please fill in all required fields");
        return;
      }

      if (registerData.password !== registerData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (registerData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      console.log("📝 Attempting registration for:", registerData.email);

      // ✅ Call API service directly
      const response = await apiService.register({
        email: registerData.email,
        password: registerData.password,
        first_name: registerData.firstName, // ✅ Use correct field names
        last_name: registerData.lastName,
        phone: registerData.phone || null,
      });

      console.log('📥 Registration response:', response);

      if (response.success && response.data) {
        // ✅ Store authentication data properly
        const stored = storeAuthData(response);
        
        if (stored) {
          setSuccess("Registration successful! Welcome to Car Mart!");
          
          // Short delay to show success message and let header update
          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        } else {
          setError("Registration successful but failed to store user data");
        }
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (error: any) {
      console.error("❌ Registration error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ IMPROVED TEST LOGIN
  const handleTestLogin = async () => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      console.log("🧪 Starting test login...");
      
      // Try with known test credentials first
      const testCredentials = [
        { email: "test@example.com", password: "password123" },
        { email: "john@example.com", password: "password123" },
        { email: "dealer1@example.com", password: "password123" },
        { email: "user1@example.com", password: "password123" }
      ];

      let loginSuccessful = false;

      for (const creds of testCredentials) {
        try {
          console.log(`🔍 Trying login with: ${creds.email}`);
          
          const response = await apiService.login(creds);
          
          if (response.success && response.data) {
            console.log(`✅ Test login successful with: ${creds.email}`);
            
            const stored = storeAuthData(response);
            
            if (stored) {
              setSuccess(`Test login successful with ${creds.email}!`);
              setTimeout(() => {
                navigate("/dashboard");
              }, 1000);
              loginSuccessful = true;
              break;
            }
          }
        } catch (error) {
          console.log(`❌ ${creds.email} failed:`, error);
        }
      }

      if (!loginSuccessful) {
        // Create a new test user
        const uniqueEmail = `test${Date.now()}@example.com`;
        console.log(`📝 Creating new test user: ${uniqueEmail}`);
        
        const response = await apiService.register({
          email: uniqueEmail,
          password: "test123",
          first_name: "Test",
          last_name: "User",
          phone: "+94771234567"
        });

        if (response.success && response.data) {
          const stored = storeAuthData(response);
          
          if (stored) {
            setSuccess("New test account created and logged in!");
            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
          } else {
            setError("Account created but failed to store user data");
          }
        } else {
          setError("Failed to create test account: " + (response.message || "Unknown error"));
        }
      }
    } catch (error: any) {
      console.error("❌ Test login error:", error);
      setError("Test login failed: " + (error.message || "Network error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">CM</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary">Car Mart</span>
              <span className="text-sm text-muted-foreground">Premium Vehicles</span>
            </div>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">Welcome</CardTitle>
            <CardDescription>
              Join Sri Lanka's premier vehicle marketplace
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* ✅ TEST LOGIN BUTTON */}
            <Button 
              onClick={handleTestLogin} 
              variant="outline" 
              className="w-full mb-4 border-2 border-dashed border-green-300 text-green-600 hover:bg-green-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing Login...
                </>
              ) : (
                "🧪 Quick Test Login"
              )}
            </Button>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Success Alert */}
            {success && (
              <Alert className="mb-4 border-green-200 bg-green-50">
                <AlertCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">{success}</AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>

              {/* ✅ LOGIN TAB */}
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90" 
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* ✅ REGISTER TAB */}
              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        id="first-name"
                        placeholder="John"
                        value={registerData.firstName}
                        onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input
                        id="last-name"
                        placeholder="Doe"
                        value={registerData.lastName}
                        onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+94 77 123 4567"
                        className="pl-10"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className="pl-10 pr-10"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        className="pl-10"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90" 
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By creating an account, you agree to our{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* ✅ BACK TO HOME LINK */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;