import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Ticket, 
  Users, 
  Building2, 
  AlertTriangle, 
  Settings,
  LogOut,
  Bell,
  Eye,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  Shield,
  UserCheck,
  AlertOctagon,
  FileText,
  Loader,
  RefreshCw,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';

// TypeScript Interfaces for Real Data
interface StaffUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  is_super_staff: boolean;
  avatar_url?: string;
  is_active: boolean;
  last_login?: string;
  created_at: string;
}

interface DashboardStats {
  totalUsers: number;
  totalListings: number;
  openTickets: number;
  pendingModerations: number;
  businessApplications: number;
  activeReports: number;
}

interface RecentActivity {
  id: string;
  staff_id: string;
  action: string;
  target_type?: string;
  target_id?: string;
  details?: any;
  created_at: string;
  staff_users?: {
    first_name: string;
    last_name: string;
  };
}

interface SupportTicket {
  id: string;
  ticket_number: string;
  user_id?: string;
  user_email: string;
  user_name: string;
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
  resolution_notes?: string;
  staff_users?: {
    first_name: string;
    last_name: string;
  };
  users?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

interface ModerationItem {
  id: string;
  item_type: string;
  item_id: string;
  item_title?: string;
  item_data?: any;
  submitted_by?: string;
  reason: string;
  priority: string;
  status: string;
  reviewed_by?: string;
  reviewed_at?: string;
  review_notes?: string;
  created_at: string;
  staff_users?: {
    first_name: string;
    last_name: string;
  };
  users?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

interface BusinessApplication {
  id: string;
  user_id: string;
  application_data: any;
  documents?: any;
  status: string;
  reviewed_by?: string;
  reviewed_at?: string;
  review_notes?: string;
  created_at: string;
  updated_at: string;
  users?: {
    first_name: string;
    last_name: string;
    email: string;
  };
  staff_users?: {
    first_name: string;
    last_name: string;
  };
}

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

// Complete Staff API Service
class RealStaffApiService {
  private token: string | null;
  private baseUrl: string = 'http://localhost:3001/api/staff';

  constructor() {
    this.token = localStorage.getItem('staff_token');
  }

  private getAuthHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };
  }

  private updateToken(): void {
    this.token = localStorage.getItem('staff_token');
  }

  async apiRequest<T = any>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    this.updateToken();
    
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
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

  // Authentication Methods
  async login(email: string, password: string): Promise<ApiResponse<{ staff: StaffUser; token: string }>> {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
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

  async logout(): Promise<void> {
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

  // Dashboard Methods
  async getDashboardStats(): Promise<ApiResponse<{
    stats: DashboardStats;
    recentActivity: RecentActivity[];
    myUrgentTickets: SupportTicket[];
  }>> {
    return await this.apiRequest('/dashboard');
  }

  // Support Ticket Methods
  async getTickets(filters: Record<string, string> = {}): Promise<ApiResponse<SupportTicket[]>> {
    const params = new URLSearchParams(filters).toString();
    return await this.apiRequest(`/tickets?${params}`);
  }

  async getTicketDetails(ticketId: string): Promise<ApiResponse<{
    ticket: SupportTicket;
    messages: any[];
  }>> {
    return await this.apiRequest(`/tickets/${ticketId}`);
  }

  async assignTicket(ticketId: string, staffId: string): Promise<ApiResponse> {
    return await this.apiRequest(`/tickets/${ticketId}/assign`, {
      method: 'POST',
      body: JSON.stringify({ staffId }),
    });
  }

  async respondToTicket(ticketId: string, message: string, changeStatus?: string, isInternal: boolean = false): Promise<ApiResponse> {
    return await this.apiRequest(`/tickets/${ticketId}/respond`, {
      method: 'POST',
      body: JSON.stringify({ message, changeStatus, isInternal }),
    });
  }

  // Content Moderation Methods
  async getModerationQueue(filters: Record<string, string> = {}): Promise<ApiResponse<ModerationItem[]>> {
    const params = new URLSearchParams(filters).toString();
    return await this.apiRequest(`/moderation?${params}`);
  }

  async reviewModerationItem(itemId: string, action: string, notes: string = ''): Promise<ApiResponse> {
    return await this.apiRequest(`/moderation/${itemId}/review`, {
      method: 'POST',
      body: JSON.stringify({ action, notes }),
    });
  }

  // User Management Methods
  async searchUsers(query: string, filters: Record<string, string> = {}): Promise<ApiResponse<any[]>> {
    const params = new URLSearchParams({ q: query, ...filters }).toString();
    return await this.apiRequest(`/users/search?${params}`);
  }

  async performUserAction(userId: string, action: string, reason: string = ''): Promise<ApiResponse> {
    return await this.apiRequest(`/users/${userId}/action`, {
      method: 'POST',
      body: JSON.stringify({ action, reason }),
    });
  }

  // Business Application Methods
  async getBusinessApplications(filters: Record<string, string> = {}): Promise<ApiResponse<BusinessApplication[]>> {
    const params = new URLSearchParams(filters).toString();
    return await this.apiRequest(`/business-applications?${params}`);
  }

  async reviewBusinessApplication(applicationId: string, action: string, notes: string = ''): Promise<ApiResponse> {
    return await this.apiRequest(`/business-applications/${applicationId}/review`, {
      method: 'POST',
      body: JSON.stringify({ action, notes }),
    });
  }

  // Staff Management Methods (Super Staff Only)
  async getStaffUsers(): Promise<ApiResponse<StaffUser[]>> {
    return await this.apiRequest('/staff-users');
  }

  async createStaffUser(staffData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    isSuperStaff?: boolean;
  }): Promise<ApiResponse<StaffUser>> {
    return await this.apiRequest('/staff-users', {
      method: 'POST',
      body: JSON.stringify(staffData),
    });
  }

  // Utility Methods
  isLoggedIn(): boolean {
    return !!this.token && !!localStorage.getItem('staff_user');
  }

  getStaffUser(): StaffUser | null {
    try {
      const staffData = localStorage.getItem('staff_user');
      return staffData ? JSON.parse(staffData) : null;
    } catch (error) {
      return null;
    }
  }

  isSuperStaff(): boolean {
    const staff = this.getStaffUser();
    return staff?.is_super_staff || false;
  }
}

const staffApi = new RealStaffApiService();

const StaffDashboard = () => {
  // State Management
  const [currentStaff, setCurrentStaff] = useState<StaffUser | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalListings: 0,
    openTickets: 0,
    pendingModerations: 0,
    businessApplications: 0,
    activeReports: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [moderationItems, setModerationItems] = useState<ModerationItem[]>([]);
  const [businessApplications, setBusinessApplications] = useState<BusinessApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Form States
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [ticketFilters, setTicketFilters] = useState<Record<string, string>>({
    status: 'all',
    priority: 'all',
    assigned: 'all'
  });
  const [moderationFilters, setModerationFilters] = useState<Record<string, string>>({
    type: 'all',
    status: 'pending'
  });

  // Initialize current staff user
  useEffect(() => {
    const staffData = localStorage.getItem('staff_user');
    if (staffData) {
      try {
        const staff = JSON.parse(staffData);
        setCurrentStaff(staff);
      } catch (error) {
        console.error('Error parsing staff data:', error);
        window.location.href = '/staff/login';
      }
    } else {
      window.location.href = '/staff/login';
    }
  }, []);

  // Load initial data
  useEffect(() => {
    if (currentStaff) {
      loadInitialData();
    }
  }, [currentStaff]);

  // Load data based on active tab
  useEffect(() => {
    if (currentStaff && activeTab !== 'dashboard') {
      loadTabData();
    }
  }, [activeTab, ticketFilters, moderationFilters]);

  // Data Loading Functions
  const loadInitialData = async (): Promise<void> => {
    setLoading(true);
    setError('');
    try {
      const response = await staffApi.getDashboardStats();
      if (response.success && response.data) {
        setDashboardStats(response.data.stats);
        setRecentActivity(response.data.recentActivity || []);
      } else {
        setError(response.message || 'Failed to load dashboard data');
      }
    } catch (error) {
      setError('Failed to load dashboard data');
      console.error('Dashboard data error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTabData = async (): Promise<void> => {
    setLoading(true);
    setError('');
    try {
      switch (activeTab) {
        case 'tickets':
          await loadTickets();
          break;
        case 'moderation':
          await loadModerationQueue();
          break;
        case 'business':
          await loadBusinessApplications();
          break;
        default:
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  const loadTickets = async (): Promise<void> => {
    try {
      const response = await staffApi.getTickets(ticketFilters);
      if (response.success && response.data) {
        setTickets(response.data);
      } else {
        setError(response.message || 'Failed to load tickets');
      }
    } catch (error) {
      setError('Failed to load tickets');
      console.error('Tickets load error:', error);
    }
  };

  const loadModerationQueue = async (): Promise<void> => {
    try {
      const response = await staffApi.getModerationQueue(moderationFilters);
      if (response.success && response.data) {
        setModerationItems(response.data);
      } else {
        setError(response.message || 'Failed to load moderation queue');
      }
    } catch (error) {
      setError('Failed to load moderation queue');
      console.error('Moderation queue error:', error);
    }
  };

  const loadBusinessApplications = async (): Promise<void> => {
    try {
      const response = await staffApi.getBusinessApplications({ status: 'pending' });
      if (response.success && response.data) {
        setBusinessApplications(response.data);
      } else {
        setError(response.message || 'Failed to load business applications');
      }
    } catch (error) {
      setError('Failed to load business applications');
      console.error('Business applications error:', error);
    }
  };

  const refreshData = async (): Promise<void> => {
    setRefreshing(true);
    if (activeTab === 'dashboard') {
      await loadInitialData();
    } else {
      await loadTabData();
    }
    setRefreshing(false);
    toast.success('Data refreshed successfully');
  };

  // Utility Functions
  const getPriorityColor = (priority: string): "destructive" | "secondary" | "outline" | "default" => {
    switch (priority?.toLowerCase()) {
      case 'urgent': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string): "destructive" | "secondary" | "outline" | "default" => {
    switch (status?.toLowerCase()) {
      case 'open': return 'destructive';
      case 'pending': return 'destructive';
      case 'in_progress': return 'secondary';
      case 'resolved': return 'outline';
      case 'approved': return 'outline';
      case 'closed': return 'outline';
      default: return 'secondary';
    }
  };

  const timeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    return date.toLocaleDateString();
  };

  // Action Handlers
  const handleAssignTicket = async (ticketId: string, staffId: string): Promise<void> => {
    try {
      const response = await staffApi.assignTicket(ticketId, staffId);
      if (response.success) {
        toast.success('Ticket assigned successfully');
        await loadTickets();
        await loadInitialData(); // Refresh dashboard stats
      } else {
        toast.error(response.message || 'Failed to assign ticket');
      }
    } catch (error) {
      toast.error('Failed to assign ticket');
      console.error('Assign ticket error:', error);
    }
  };

  const handleTicketResponse = async (ticketId: string, message: string, changeStatus?: string): Promise<void> => {
    try {
      const response = await staffApi.respondToTicket(ticketId, message, changeStatus);
      if (response.success) {
        toast.success('Response sent successfully');
        setResponseMessage('');
        setSelectedTicket(null);
        await loadTickets();
        await loadInitialData(); // Refresh dashboard stats
      } else {
        toast.error(response.message || 'Failed to send response');
      }
    } catch (error) {
      toast.error('Failed to send response');
      console.error('Ticket response error:', error);
    }
  };

  const handleModerationReview = async (itemId: string, action: string, notes: string = ''): Promise<void> => {
    try {
      const response = await staffApi.reviewModerationItem(itemId, action, notes);
      if (response.success) {
        toast.success(`Item ${action}d successfully`);
        await loadModerationQueue();
        await loadInitialData(); // Refresh dashboard stats
      } else {
        toast.error(response.message || `Failed to ${action} item`);
      }
    } catch (error) {
      toast.error(`Failed to ${action} item`);
      console.error('Moderation review error:', error);
    }
  };

  const handleBusinessApplicationReview = async (applicationId: string, action: string, notes: string = ''): Promise<void> => {
    try {
      const response = await staffApi.reviewBusinessApplication(applicationId, action, notes);
      if (response.success) {
        toast.success(`Application ${action}d successfully`);
        await loadBusinessApplications();
        await loadInitialData(); // Refresh dashboard stats
      } else {
        toast.error(response.message || `Failed to ${action} application`);
      }
    } catch (error) {
      toast.error(`Failed to ${action} application`);
      console.error('Business application review error:', error);
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await staffApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      window.location.href = '/staff/login';
    }
  };

  // Component: Dashboard Overview
  const DashboardOverview = () => (
    <div className="space-y-6">
      {/* Header with Refresh */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Dashboard Overview</h2>
        <Button
          onClick={refreshData}
          disabled={refreshing}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading dashboard...</span>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Registered platform users</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.totalListings.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Vehicles, parts & services</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
                <AlertOctagon className={`h-4 w-4 ${dashboardStats.openTickets > 0 ? 'text-orange-500' : 'text-muted-foreground'}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${dashboardStats.openTickets > 0 ? 'text-orange-500' : ''}`}>
                  {dashboardStats.openTickets}
                </div>
                <p className="text-xs text-muted-foreground">
                  {dashboardStats.openTickets > 0 ? 'Requires attention' : 'All caught up!'}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <Clock className={`h-4 w-4 ${dashboardStats.pendingModerations > 0 ? 'text-blue-500' : 'text-muted-foreground'}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${dashboardStats.pendingModerations > 0 ? 'text-blue-500' : ''}`}>
                  {dashboardStats.pendingModerations}
                </div>
                <p className="text-xs text-muted-foreground">Content moderation</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Business Apps</CardTitle>
                <Building2 className={`h-4 w-4 ${dashboardStats.businessApplications > 0 ? 'text-green-500' : 'text-muted-foreground'}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${dashboardStats.businessApplications > 0 ? 'text-green-500' : ''}`}>
                  {dashboardStats.businessApplications}
                </div>
                <p className="text-xs text-muted-foreground">Pending approval</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Reports</CardTitle>
                <AlertTriangle className={`h-4 w-4 ${dashboardStats.activeReports > 0 ? 'text-red-500' : 'text-muted-foreground'}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${dashboardStats.activeReports > 0 ? 'text-red-500' : ''}`}>
                  {dashboardStats.activeReports}
                </div>
                <p className="text-xs text-muted-foreground">User reports</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => setActiveTab('tickets')}
                    disabled={dashboardStats.openTickets === 0}
                  >
                    <Ticket className="mr-2 h-4 w-4" />
                    {dashboardStats.openTickets > 0 
                      ? `Handle ${dashboardStats.openTickets} Open Tickets`
                      : 'No Open Tickets'
                    }
                  </Button>
                  
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => setActiveTab('moderation')}
                    disabled={dashboardStats.pendingModerations === 0}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {dashboardStats.pendingModerations > 0 
                      ? `Review ${dashboardStats.pendingModerations} Pending Items`
                      : 'No Pending Reviews'
                    }
                  </Button>
                  
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => setActiveTab('business')}
                    disabled={dashboardStats.businessApplications === 0}
                  >
                    <Building2 className="mr-2 h-4 w-4" />
                    {dashboardStats.businessApplications > 0 
                      ? `Process ${dashboardStats.businessApplications} Business Apps`
                      : 'No Pending Applications'
                    }
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.length > 0 ? (
                    recentActivity.slice(0, 6).map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate">
                            <span className="font-medium">
                              {activity.staff_users 
                                ? `${activity.staff_users.first_name} ${activity.staff_users.last_name}`
                                : 'Staff member'
                              }
                            </span>
                            {' '}{activity.action}
                          </p>
                        </div>
                        <span className="text-muted-foreground text-xs flex-shrink-0">
                          {timeAgo(activity.created_at)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No recent activity</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );

  // Component: Support Tickets
  const SupportTickets = () => (
    <div className="space-y-6">
      {/* Header with Filters and Refresh */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tickets by subject, user, or ticket number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select 
            value={ticketFilters.status} 
            onValueChange={(value) => setTicketFilters(prev => ({ ...prev, status: value }))}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={ticketFilters.priority} 
            onValueChange={(value) => setTicketFilters(prev => ({ ...prev, priority: value }))}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={ticketFilters.assigned} 
            onValueChange={(value) => setTicketFilters(prev => ({ ...prev, assigned: value }))}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Assignment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tickets</SelectItem>
              <SelectItem value="mine">My Tickets</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={refreshData}
            disabled={refreshing}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading tickets...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Ticket className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No tickets found</h3>
                <p className="text-muted-foreground text-center">
                  {searchTerm 
                    ? `No tickets match your search "${searchTerm}"`
                    : 'No support tickets match your current filters'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            tickets
              .filter(ticket => 
                !searchTerm || 
                ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ticket.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ticket.ticket_number.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((ticket) => (
                <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="font-mono">
                            {ticket.ticket_number}
                          </Badge>
                          <Badge variant={getPriorityColor(ticket.priority)}>
                            {ticket.priority.toUpperCase()}
                          </Badge>
                          <Badge variant={getStatusColor(ticket.status)}>
                            {ticket.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                          {ticket.assigned_to && (
                            <Badge variant="outline">
                              Assigned{ticket.assigned_to === currentStaff?.id ? ' to me' : ''}
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-2">{ticket.subject}</h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {ticket.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{ticket.user_name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            <span>{ticket.user_email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{timeAgo(ticket.created_at)}</span>
                          </div>
                          {ticket.category && (
                            <Badge variant="outline" className="text-xs">
                              {ticket.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {!ticket.assigned_to && currentStaff && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAssignTicket(ticket.id, currentStaff.id)}
                          >
                            Assign to Me
                          </Button>
                        )}
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" onClick={() => setSelectedTicket(ticket)}>
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Respond
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>
                                Respond to Ticket: {ticket.ticket_number}
                              </DialogTitle>
                              <DialogDescription>
                                {ticket.subject}
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-4">
                              <div className="p-4 bg-muted rounded-lg">
                                <h4 className="font-medium mb-2">Original Message</h4>
                                <p className="text-sm">{ticket.description}</p>
                                <div className="mt-2 text-xs text-muted-foreground">
                                  From: {ticket.user_name} ({ticket.user_email})
                                </div>
                              </div>
                              
                              <div>
                                <Label htmlFor="response">Your Response</Label>
                                <Textarea
                                  id="response"
                                  placeholder="Type your response to help resolve this ticket..."
                                  value={responseMessage}
                                  onChange={(e) => setResponseMessage(e.target.value)}
                                  rows={5}
                                  className="mt-1"
                                />
                              </div>
                            </div>
                            
                            <DialogFooter>
                              <Button 
                                variant="outline" 
                                onClick={() => {
                                  setSelectedTicket(null);
                                  setResponseMessage('');
                                }}
                              >
                                Cancel
                              </Button>
                              <Button 
                                onClick={() => handleTicketResponse(ticket.id, responseMessage, 'in_progress')}
                                disabled={!responseMessage.trim()}
                              >
                                Send Response
                              </Button>
                              <Button 
                                onClick={() => handleTicketResponse(ticket.id, responseMessage, 'resolved')}
                                disabled={!responseMessage.trim()}
                                variant="outline"
                              >
                                Send & Resolve
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </div>
      )}
    </div>
  );

  // Component: Content Moderation
  const ContentModeration = () => (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Moderation</h2>
        <div className="flex gap-2">
          <Select 
            value={moderationFilters.type} 
            onValueChange={(value) => setModerationFilters(prev => ({ ...prev, type: value }))}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Content Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="vehicle">Vehicles</SelectItem>
              <SelectItem value="part">Parts</SelectItem>
              <SelectItem value="service">Services</SelectItem>
              <SelectItem value="review">Reviews</SelectItem>
              <SelectItem value="user_profile">Profiles</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={moderationFilters.status} 
            onValueChange={(value) => setModerationFilters(prev => ({ ...prev, status: value }))}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="escalated">Escalated</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={refreshData}
            disabled={refreshing}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading moderation queue...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {moderationItems.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Eye className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No items to review</h3>
                <p className="text-muted-foreground text-center">
                  All content has been reviewed or no items match your filters
                </p>
              </CardContent>
            </Card>
          ) : (
            moderationItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="capitalize">
                          {item.item_type.replace('_', ' ')}
                        </Badge>
                        <Badge variant={item.priority === 'high' ? 'destructive' : 'secondary'}>
                          {item.priority.toUpperCase()}
                        </Badge>
                        <Badge variant={getStatusColor(item.status)}>
                          {item.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2">
                        {item.item_title || `${item.item_type} #${item.item_id.slice(-8)}`}
                      </h3>
                      <p className="text-muted-foreground mb-3">{item.reason}</p>
                      
                      {item.item_data && (
                        <div className="bg-muted p-3 rounded-lg mb-3">
                          <h4 className="font-medium text-sm mb-1">Item Details:</h4>
                          <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                            {JSON.stringify(item.item_data, null, 2)}
                          </pre>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Submitted {timeAgo(item.created_at)}</span>
                        </div>
                        {item.users && (
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>By {item.users.first_name} {item.users.last_name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {item.status === 'pending' && (
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleModerationReview(item.id, 'reject', 'Content rejected by moderator')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleModerationReview(item.id, 'approve', 'Content approved by moderator')}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );

  // Component: Business Applications
  const BusinessApplications = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Business Applications</h2>
        <Button
          onClick={refreshData}
          disabled={refreshing}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading business applications...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {businessApplications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No pending applications</h3>
                <p className="text-muted-foreground">All business applications have been processed</p>
              </CardContent>
            </Card>
          ) : (
            businessApplications.map((application) => (
              <Card key={application.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant={getStatusColor(application.status)}>
                          {application.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2">
                        {application.application_data?.company_name || 'Business Application'}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm">
                          <span className="font-medium">Applicant:</span>{' '}
                          {application.users 
                            ? `${application.users.first_name} ${application.users.last_name}`
                            : 'Unknown'
                          }
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Email:</span>{' '}
                          {application.users?.email || 'Unknown'}
                        </p>
                        {application.application_data?.business_type && (
                          <p className="text-sm">
                            <span className="font-medium">Business Type:</span>{' '}
                            {application.application_data.business_type}
                          </p>
                        )}
                      </div>

                      {application.application_data && (
                        <div className="bg-muted p-3 rounded-lg mb-3">
                          <h4 className="font-medium text-sm mb-2">Application Details:</h4>
                          <div className="text-xs space-y-1">
                            {Object.entries(application.application_data).map(([key, value]) => (
                              <div key={key}>
                                <span className="font-medium capitalize">
                                  {key.replace(/_/g, ' ')}:
                                </span>{' '}
                                {String(value)}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="text-sm text-muted-foreground">
                        Applied {timeAgo(application.created_at)}
                      </div>
                    </div>
                    
                    {application.status === 'pending' && (
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleBusinessApplicationReview(
                            application.id, 
                            'needs_info', 
                            'Additional information required'
                          )}
                        >
                          Need Info
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleBusinessApplicationReview(
                            application.id, 
                            'rejected', 
                            'Application rejected'
                          )}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleBusinessApplicationReview(
                            application.id, 
                            'approved', 
                            'Application approved - business account activated'
                          )}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );

  // Show loading screen if no staff user
  if (!currentStaff) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading staff dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center gap-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-semibold">Car Mart Staff</h1>
              <p className="text-sm text-muted-foreground">Admin Dashboard</p>
            </div>
          </div>
          
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentStaff.avatar_url} />
                    <AvatarFallback>
                      {currentStaff.first_name[0]}{currentStaff.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">
                      {currentStaff.first_name} {currentStaff.last_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {currentStaff.email}
                    </p>
                  </div>
                  {currentStaff.is_super_staff && (
                    <Badge className="mt-2" variant="destructive">Super Staff</Badge>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="m-6">
          <AlertOctagon className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card h-[calc(100vh-4rem)] sticky top-16">
          <nav className="p-4">
            <div className="space-y-2">
              <Button
                variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('dashboard')}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              
              <Button
                variant={activeTab === 'tickets' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('tickets')}
              >
                <Ticket className="mr-2 h-4 w-4" />
                Support Tickets
                {dashboardStats.openTickets > 0 && (
                  <Badge className="ml-auto" variant="destructive">
                    {dashboardStats.openTickets}
                  </Badge>
                )}
              </Button>
              
              <Button
                variant={activeTab === 'moderation' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('moderation')}
              >
                <Eye className="mr-2 h-4 w-4" />
                Moderation
                {dashboardStats.pendingModerations > 0 && (
                  <Badge className="ml-auto" variant="secondary">
                    {dashboardStats.pendingModerations}
                  </Badge>
                )}
              </Button>
              
              <Button
                variant={activeTab === 'business' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('business')}
              >
                <Building2 className="mr-2 h-4 w-4" />
                Business Apps
                {dashboardStats.businessApplications > 0 && (
                  <Badge className="ml-auto" variant="outline">
                    {dashboardStats.businessApplications}
                  </Badge>
                )}
              </Button>
              
              <Button
                variant={activeTab === 'users' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('users')}
              >
                <Users className="mr-2 h-4 w-4" />
                User Management
              </Button>
              
              {currentStaff.is_super_staff && (
                <>
                  <Separator className="my-4" />
                  <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Super Staff
                  </div>
                  <Button
                    variant={activeTab === 'staff' ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('staff')}
                  >
                    <UserCheck className="mr-2 h-4 w-4" />
                    Staff Management
                  </Button>
                </>
              )}
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'dashboard' && <DashboardOverview />}
          {activeTab === 'tickets' && <SupportTickets />}
          {activeTab === 'moderation' && <ContentModeration />}
          {activeTab === 'business' && <BusinessApplications />}
          {activeTab === 'users' && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">User Management</h3>
              <p className="text-muted-foreground mb-4">
                Search and manage user accounts, handle suspensions, and process verifications
              </p>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Coming Soon
              </Button>
            </div>
          )}
          {activeTab === 'staff' && (
            <div className="text-center py-12">
              <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Staff Management</h3>
              <p className="text-muted-foreground mb-4">
                Manage staff accounts, roles, and permissions
              </p>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Coming Soon
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StaffDashboard;