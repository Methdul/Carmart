// File: car-mart-backend/src/services/staffService.js
// Staff-specific database operations

const { supabase } = require('../config/database');
const bcrypt = require('bcrypt');

class StaffService {
  
  // Authentication Methods
  static async authenticateStaff(email, password) {
    try {
      const { data: staff, error } = await supabase
        .from('staff_users')
        .select('*')
        .eq('email', email.toLowerCase())
        .eq('is_active', true)
        .single();

      if (error || !staff) {
        return { success: false, message: 'Invalid credentials' };
      }

      const isValidPassword = await bcrypt.compare(password, staff.password_hash);
      if (!isValidPassword) {
        return { success: false, message: 'Invalid credentials' };
      }

      // Update last login
      await supabase
        .from('staff_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', staff.id);

      const { password_hash, ...staffData } = staff;
      return { success: true, data: staffData };

    } catch (error) {
      console.error('Staff authentication error:', error);
      return { success: false, message: 'Authentication failed' };
    }
  }

  // Dashboard Statistics
  static async getDashboardStats() {
    try {
      const [
        totalUsers,
        totalListings,
        openTickets,
        pendingModerations,
        businessApplications,
        activeReports
      ] = await Promise.all([
        supabase.from('users').select('id', { count: 'exact', head: true }),
        supabase.from('vehicles').select('id', { count: 'exact', head: true }),
        supabase.from('support_tickets').select('id', { count: 'exact', head: true }).eq('status', 'open'),
        supabase.from('moderation_queue').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('business_applications').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('user_reports').select('id', { count: 'exact', head: true }).eq('status', 'pending')
      ]);

      return {
        success: true,
        data: {
          totalUsers: totalUsers.count,
          totalListings: totalListings.count,
          openTickets: openTickets.count,
          pendingModerations: pendingModerations.count,
          businessApplications: businessApplications.count,
          activeReports: activeReports.count
        }
      };

    } catch (error) {
      console.error('Dashboard stats error:', error);
      return { success: false, message: 'Failed to fetch dashboard stats' };
    }
  }

  // Support Ticket Methods
  static async getTickets(filters = {}) {
    try {
      let query = supabase
        .from('support_tickets')
        .select(`
          *,
          assigned_staff:staff_users(first_name, last_name),
          user:users(first_name, last_name, email)
        `);

      // Apply filters
      if (filters.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }
      if (filters.priority && filters.priority !== 'all') {
        query = query.eq('priority', filters.priority);
      }
      if (filters.assignedTo) {
        query = query.eq('assigned_to', filters.assignedTo);
      }

      // Pagination
      const page = filters.page || 1;
      const limit = filters.limit || 20;
      const offset = (page - 1) * limit;

      query = query
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      const { data, error } = await query;

      if (error) throw error;

      return { success: true, data: data || [] };

    } catch (error) {
      console.error('Get tickets error:', error);
      return { success: false, message: 'Failed to fetch tickets' };
    }
  }

  static async createTicket(ticketData) {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .insert(ticketData)
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };

    } catch (error) {
      console.error('Create ticket error:', error);
      return { success: false, message: 'Failed to create ticket' };
    }
  }

  // Moderation Methods
  static async getModerationQueue(filters = {}) {
    try {
      let query = supabase
        .from('moderation_queue')
        .select(`
          *,
          reviewer:staff_users(first_name, last_name),
          submitter:users(first_name, last_name, email)
        `);

      if (filters.type && filters.type !== 'all') {
        query = query.eq('item_type', filters.type);
      }
      if (filters.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      const page = filters.page || 1;
      const limit = filters.limit || 20;
      const offset = (page - 1) * limit;

      query = query
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      const { data, error } = await query;

      if (error) throw error;

      return { success: true, data: data || [] };

    } catch (error) {
      console.error('Get moderation queue error:', error);
      return { success: false, message: 'Failed to fetch moderation queue' };
    }
  }

  // Activity Logging
  static async logActivity(staffId, action, targetType = null, targetId = null, details = {}) {
    try {
      await supabase
        .from('staff_activity_log')
        .insert({
          staff_id: staffId,
          action,
          target_type: targetType,
          target_id: targetId,
          details,
          created_at: new Date().toISOString()
        });

      return { success: true };

    } catch (error) {
      console.error('Log activity error:', error);
      return { success: false };
    }
  }

  // User Management
  static async searchUsers(searchTerm, filters = {}) {
    try {
      let query = supabase
        .from('users')
        .select('*');

      if (searchTerm) {
        query = query.or(`email.ilike.%${searchTerm}%,first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%`);
      }

      if (filters.accountType && filters.accountType !== 'all') {
        query = query.eq('account_type', filters.accountType);
      }

      if (filters.isActive !== undefined) {
        query = query.eq('is_active', filters.isActive);
      }

      const page = filters.page || 1;
      const limit = filters.limit || 20;
      const offset = (page - 1) * limit;

      query = query
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      const { data, error } = await query;

      if (error) throw error;

      return { success: true, data: data || [] };

    } catch (error) {
      console.error('Search users error:', error);
      return { success: false, message: 'Failed to search users' };
    }
  }

  // Business Applications
  static async getBusinessApplications(filters = {}) {
    try {
      let query = supabase
        .from('business_applications')
        .select(`
          *,
          user:users(first_name, last_name, email),
          reviewer:staff_users(first_name, last_name)
        `);

      if (filters.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      const page = filters.page || 1;
      const limit = filters.limit || 20;
      const offset = (page - 1) * limit;

      query = query
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      const { data, error } = await query;

      if (error) throw error;

      return { success: true, data: data || [] };

    } catch (error) {
      console.error('Get business applications error:', error);
      return { success: false, message: 'Failed to fetch business applications' };
    }
  }
}

module.exports = { StaffService };

// =============================================================================

// File: car-mart-backend/src/app.js
// UPDATE YOUR EXISTING app.js - Add these lines:

// Add this import at the top with other routes
const staffRoutes = require('./routes/staff');

// Add this line with other route registrations
app.use('/api/staff', staffRoutes);

// =============================================================================

// File: car-mart-backend/src/middleware/staffAuth.js
// Separate staff authentication middleware

const jwt = require('jsonwebtoken');
const { supabase } = require('../config/database');

const authenticateStaff = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Staff access token required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.type !== 'staff') {
      return res.status(401).json({
        success: false,
        message: 'Invalid staff token'
      });
    }

    const { data: staff } = await supabase
      .from('staff_users')
      .select('*')
      .eq('id', decoded.staffId)
      .eq('is_active', true)
      .single();

    if (!staff) {
      return res.status(401).json({
        success: false,
        message: 'Staff account not found or inactive'
      });
    }

    req.staff = staff;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid staff token'
    });
  }
};

const requireSuperStaff = (req, res, next) => {
  if (!req.staff.is_super_staff) {
    return res.status(403).json({
      success: false,
      message: 'Super staff access required'
    });
  }
  next();
};

const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.staff.role) && !req.staff.is_super_staff) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }
    next();
  };
};

module.exports = {
  authenticateStaff,
  requireSuperStaff,
  requireRole
};