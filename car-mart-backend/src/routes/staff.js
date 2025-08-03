// File: car-mart-backend/src/routes/staff.js
// Complete Staff Management System Routes

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { supabase } = require('../config/database');

// Staff Authentication Middleware
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

// Super Staff Only Middleware
const requireSuperStaff = (req, res, next) => {
  if (!req.staff.is_super_staff) {
    return res.status(403).json({
      success: false,
      message: 'Super staff access required'
    });
  }
  next();
};

// Log Staff Activity
const logActivity = async (staffId, action, targetType = null, targetId = null, details = {}) => {
  try {
    await supabase
      .from('staff_activity_log')
      .insert({
        staff_id: staffId,
        action,
        target_type: targetType,
        target_id: targetId,
        details
      });
  } catch (error) {
    console.error('Failed to log staff activity:', error);
  }
};

// =============================================================================
// AUTHENTICATION ROUTES
// =============================================================================

// POST /api/staff/login - Staff Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Get staff user
    const { data: staff, error } = await supabase
      .from('staff_users')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('is_active', true)
      .single();

    if (error || !staff) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, staff.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    await supabase
      .from('staff_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', staff.id);

    // Generate token
    const token = jwt.sign(
      { staffId: staff.id, type: 'staff' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' } // Staff sessions expire after 8 hours
    );

    // Log login activity
    await logActivity(staff.id, 'login');

    const { password_hash, ...staffResponse } = staff;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        staff: staffResponse,
        token
      }
    });

  } catch (error) {
    console.error('Staff login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

// POST /api/staff/logout - Staff Logout
router.post('/logout', authenticateStaff, async (req, res) => {
  try {
    await logActivity(req.staff.id, 'logout');
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
});

// =============================================================================
// DASHBOARD ROUTES
// =============================================================================

// GET /api/staff/dashboard - Dashboard Overview
router.get('/dashboard', authenticateStaff, async (req, res) => {
  try {
    // Get dashboard statistics
    const [
      { count: totalUsers },
      { count: totalListings },
      { count: openTickets },
      { count: pendingModerations },
      { count: businessApplications },
      { count: activeReports }
    ] = await Promise.all([
      supabase.from('users').select('id', { count: 'exact', head: true }),
      supabase.from('vehicles').select('id', { count: 'exact', head: true }),
      supabase.from('support_tickets').select('id', { count: 'exact', head: true }).eq('status', 'open'),
      supabase.from('moderation_queue').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('business_applications').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('user_reports').select('id', { count: 'exact', head: true }).eq('status', 'pending')
    ]);

    // Get recent activity
    const { data: recentActivity } = await supabase
      .from('staff_activity_log')
      .select(`
        *,
        staff_users!inner(first_name, last_name)
      `)
      .order('created_at', { ascending: false })
      .limit(10);

    // Get urgent tickets assigned to current staff
    const { data: myUrgentTickets } = await supabase
      .from('support_tickets')
      .select('*')
      .eq('assigned_to', req.staff.id)
      .in('priority', ['high', 'urgent'])
      .eq('status', 'open')
      .limit(5);

    res.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalListings,
          openTickets,
          pendingModerations,
          businessApplications,
          activeReports
        },
        recentActivity: recentActivity || [],
        myUrgentTickets: myUrgentTickets || []
      }
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load dashboard'
    });
  }
});

// =============================================================================
// SUPPORT TICKET ROUTES
// =============================================================================

// GET /api/staff/tickets - Get Support Tickets
router.get('/tickets', authenticateStaff, async (req, res) => {
  try {
    const { 
      status = 'all', 
      priority = 'all', 
      assigned = 'all',
      page = 1, 
      limit = 20 
    } = req.query;

    let query = supabase
      .from('support_tickets')
      .select(`
        *,
        staff_users(first_name, last_name)
      `);

    // Apply filters
    if (status !== 'all') query = query.eq('status', status);
    if (priority !== 'all') query = query.eq('priority', priority);
    if (assigned === 'mine') query = query.eq('assigned_to', req.staff.id);
    if (assigned === 'unassigned') query = query.is('assigned_to', null);

    // Pagination
    const offset = (page - 1) * limit;
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data: tickets, error } = await query;

    if (error) throw error;

    res.json({
      success: true,
      data: tickets || []
    });

  } catch (error) {
    console.error('Tickets fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tickets'
    });
  }
});

// GET /api/staff/tickets/:id - Get Ticket Details
router.get('/tickets/:id', authenticateStaff, async (req, res) => {
  try {
    const { data: ticket } = await supabase
      .from('support_tickets')
      .select(`
        *,
        staff_users(first_name, last_name),
        users(first_name, last_name, email)
      `)
      .eq('id', req.params.id)
      .single();

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    // Get ticket messages
    const { data: messages } = await supabase
      .from('ticket_messages')
      .select('*')
      .eq('ticket_id', req.params.id)
      .order('created_at', { ascending: true });

    res.json({
      success: true,
      data: {
        ticket,
        messages: messages || []
      }
    });

  } catch (error) {
    console.error('Ticket details error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch ticket details'
    });
  }
});

// POST /api/staff/tickets/:id/assign - Assign Ticket
router.post('/tickets/:id/assign', authenticateStaff, async (req, res) => {
  try {
    const { staffId } = req.body;
    
    const { error } = await supabase
      .from('support_tickets')
      .update({ 
        assigned_to: staffId,
        status: 'in_progress',
        updated_at: new Date().toISOString()
      })
      .eq('id', req.params.id);

    if (error) throw error;

    await logActivity(req.staff.id, 'assign_ticket', 'ticket', req.params.id, { staffId });

    res.json({
      success: true,
      message: 'Ticket assigned successfully'
    });

  } catch (error) {
    console.error('Ticket assign error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to assign ticket'
    });
  }
});

// POST /api/staff/tickets/:id/respond - Respond to Ticket
router.post('/tickets/:id/respond', authenticateStaff, async (req, res) => {
  try {
    const { message, isInternal = false, changeStatus } = req.body;

    // Add message
    await supabase
      .from('ticket_messages')
      .insert({
        ticket_id: req.params.id,
        sender_type: 'staff',
        sender_id: req.staff.id,
        sender_name: `${req.staff.first_name} ${req.staff.last_name}`,
        message,
        is_internal: isInternal
      });

    // Update ticket status if provided
    const updates = { updated_at: new Date().toISOString() };
    if (changeStatus) {
      updates.status = changeStatus;
      if (changeStatus === 'resolved') {
        updates.resolved_at = new Date().toISOString();
      }
    }

    await supabase
      .from('support_tickets')
      .update(updates)
      .eq('id', req.params.id);

    await logActivity(req.staff.id, 'respond_ticket', 'ticket', req.params.id, { changeStatus });

    res.json({
      success: true,
      message: 'Response added successfully'
    });

  } catch (error) {
    console.error('Ticket response error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to respond to ticket'
    });
  }
});

// =============================================================================
// CONTENT MODERATION ROUTES
// =============================================================================

// GET /api/staff/moderation - Get Moderation Queue
router.get('/moderation', authenticateStaff, async (req, res) => {
  try {
    const { 
      type = 'all', 
      status = 'pending',
      page = 1, 
      limit = 20 
    } = req.query;

    let query = supabase
      .from('moderation_queue')
      .select(`
        *,
        staff_users(first_name, last_name),
        users(first_name, last_name, email)
      `);

    if (type !== 'all') query = query.eq('item_type', type);
    if (status !== 'all') query = query.eq('status', status);

    const offset = (page - 1) * limit;
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data: items, error } = await query;

    if (error) throw error;

    res.json({
      success: true,
      data: items || []
    });

  } catch (error) {
    console.error('Moderation queue error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch moderation queue'
    });
  }
});

// POST /api/staff/moderation/:id/review - Review Moderation Item
router.post('/moderation/:id/review', authenticateStaff, async (req, res) => {
  try {
    const { action, notes } = req.body; // action: 'approve' or 'reject'

    const { error } = await supabase
      .from('moderation_queue')
      .update({
        status: action === 'approve' ? 'approved' : 'rejected',
        reviewed_by: req.staff.id,
        reviewed_at: new Date().toISOString(),
        review_notes: notes
      })
      .eq('id', req.params.id);

    if (error) throw error;

    await logActivity(req.staff.id, `moderation_${action}`, 'moderation', req.params.id, { notes });

    res.json({
      success: true,
      message: `Item ${action}d successfully`
    });

  } catch (error) {
    console.error('Moderation review error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to review item'
    });
  }
});

// =============================================================================
// USER MANAGEMENT ROUTES
// =============================================================================

// GET /api/staff/users/search - Search Users
router.get('/users/search', authenticateStaff, async (req, res) => {
  try {
    const { q, type = 'all', page = 1, limit = 20 } = req.query;

    let query = supabase
      .from('users')
      .select('*');

    if (q) {
      query = query.or(`email.ilike.%${q}%,first_name.ilike.%${q}%,last_name.ilike.%${q}%`);
    }

    if (type !== 'all') {
      query = query.eq('account_type', type);
    }

    const offset = (page - 1) * limit;
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data: users, error } = await query;

    if (error) throw error;

    res.json({
      success: true,
      data: users || []
    });

  } catch (error) {
    console.error('User search error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search users'
    });
  }
});

// POST /api/staff/users/:id/action - User Actions (suspend, activate, verify)
router.post('/users/:id/action', authenticateStaff, async (req, res) => {
  try {
    const { action, reason } = req.body; // action: 'suspend', 'activate', 'verify', 'unverify'

    const updates = {};
    
    switch (action) {
      case 'suspend':
        updates.is_active = false;
        break;
      case 'activate':
        updates.is_active = true;
        break;
      case 'verify':
        updates.is_verified = true;
        break;
      case 'unverify':
        updates.is_verified = false;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid action'
        });
    }

    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', req.params.id);

    if (error) throw error;

    await logActivity(req.staff.id, `user_${action}`, 'user', req.params.id, { reason });

    res.json({
      success: true,
      message: `User ${action}d successfully`
    });

  } catch (error) {
    console.error('User action error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to perform user action'
    });
  }
});

// =============================================================================
// BUSINESS APPLICATION ROUTES
// =============================================================================

// GET /api/staff/business-applications - Get Business Applications
router.get('/business-applications', authenticateStaff, async (req, res) => {
  try {
    const { status = 'pending', page = 1, limit = 20 } = req.query;

    let query = supabase
      .from('business_applications')
      .select(`
        *,
        users(first_name, last_name, email),
        staff_users(first_name, last_name)
      `);

    if (status !== 'all') query = query.eq('status', status);

    const offset = (page - 1) * limit;
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data: applications, error } = await query;

    if (error) throw error;

    res.json({
      success: true,
      data: applications || []
    });

  } catch (error) {
    console.error('Business applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch business applications'
    });
  }
});

// POST /api/staff/business-applications/:id/review - Review Business Application
router.post('/business-applications/:id/review', authenticateStaff, async (req, res) => {
  try {
    const { action, notes } = req.body; // action: 'approve', 'reject', 'needs_info'

    // Update application
    const { error: appError } = await supabase
      .from('business_applications')
      .update({
        status: action,
        reviewed_by: req.staff.id,
        reviewed_at: new Date().toISOString(),
        review_notes: notes
      })
      .eq('id', req.params.id);

    if (appError) throw appError;

    // If approved, upgrade user account
    if (action === 'approved') {
      const { data: application } = await supabase
        .from('business_applications')
        .select('user_id')
        .eq('id', req.params.id)
        .single();

      if (application) {
        await supabase
          .from('users')
          .update({ account_type: 'business' })
          .eq('id', application.user_id);
      }
    }

    await logActivity(req.staff.id, `business_app_${action}`, 'business_application', req.params.id, { notes });

    res.json({
      success: true,
      message: `Application ${action}d successfully`
    });

  } catch (error) {
    console.error('Business application review error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to review application'
    });
  }
});

// =============================================================================
// SUPER STAFF ONLY ROUTES
// =============================================================================

// GET /api/staff/staff-users - Manage Staff Users (Super Staff Only)
router.get('/staff-users', authenticateStaff, requireSuperStaff, async (req, res) => {
  try {
    const { data: staffUsers, error } = await supabase
      .from('staff_users')
      .select(`
        *,
        creator:created_by(first_name, last_name)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data: staffUsers || []
    });

  } catch (error) {
    console.error('Staff users fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch staff users'
    });
  }
});

// POST /api/staff/staff-users - Create New Staff User (Super Staff Only)
router.post('/staff-users', authenticateStaff, requireSuperStaff, async (req, res) => {
  try {
    const { email, password, firstName, lastName, role, isSuperStaff = false } = req.body;

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const { data: newStaff, error } = await supabase
      .from('staff_users')
      .insert({
        email: email.toLowerCase(),
        password_hash: passwordHash,
        first_name: firstName,
        last_name: lastName,
        role,
        is_super_staff: isSuperStaff,
        created_by: req.staff.id
      })
      .select()
      .single();

    if (error) throw error;

    await logActivity(req.staff.id, 'create_staff_user', 'staff_user', newStaff.id, { role, isSuperStaff });

    const { password_hash, ...staffResponse } = newStaff;

    res.json({
      success: true,
      message: 'Staff user created successfully',
      data: staffResponse
    });

  } catch (error) {
    console.error('Create staff user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create staff user'
    });
  }
});

module.exports = router;