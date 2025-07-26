// car-mart-backend/src/services/database.js
const { supabaseAdmin } = require('../config/database');

class DatabaseService {
  constructor(tableName) {
    this.table = tableName;
    this.db = supabaseAdmin;
  }

  // Generic CRUD operations
  async create(data) {
    try {
      const { data: result, error } = await this.db
        .from(this.table)
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async findById(id) {
    try {
      const { data, error } = await this.db
        .from(this.table)
        .select('*')
        .eq('id', id)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
      return { success: true, data: data || null };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async findAll(filters = {}, options = {}) {
    try {
      let query = this.db.from(this.table).select('*');

      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          query = query.eq(key, value);
        }
      });

      // Apply pagination
      if (options.limit) {
        query = query.limit(options.limit);
      }
      if (options.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
      }

      // Apply ordering
      if (options.orderBy) {
        query = query.order(options.orderBy, { ascending: options.ascending !== false });
      }

      const { data, error } = await query;
      if (error) throw error;

      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async update(id, data) {
    try {
      const { data: result, error } = await this.db
        .from(this.table)
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async delete(id) {
    try {
      const { error } = await this.db
        .from(this.table)
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async count(filters = {}) {
    try {
      let query = this.db.from(this.table).select('*', { count: 'exact', head: true });

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          query = query.eq(key, value);
        }
      });

      const { count, error } = await query;
      if (error) throw error;

      return { success: true, count };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// Specialized service classes
class UserService extends DatabaseService {
  constructor() {
    super('users');
  }

  async findByEmail(email) {
    try {
      const { data, error } = await this.db
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase())
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return { success: true, data: data || null };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async createUser(userData) {
    try {
      // Ensure email is lowercase
      userData.email = userData.email.toLowerCase();
      
      const { data, error } = await this.db
        .from('users')
        .insert(userData)
        .select('id, email, first_name, last_name, phone, avatar_url, bio, location, account_type, is_verified, member_since')
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateLastLogin(userId) {
    try {
      const { error } = await this.db
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', userId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

class VehicleService extends DatabaseService {
  constructor() {
    super('vehicles');
  }

  async searchVehicles(searchParams) {
    try {
      let query = this.db
        .from('vehicles')
        .select(`
          *,
          users(first_name, last_name, account_type, is_verified),
          business_profiles(company_name)
        `)
        .eq('is_active', true);

      // Text search
      if (searchParams.search) {
        query = query.or(`title.ilike.%${searchParams.search}%,make.ilike.%${searchParams.search}%,model.ilike.%${searchParams.search}%`);
      }

      // Location filter
      if (searchParams.location) {
        query = query.ilike('location', `%${searchParams.location}%`);
      }

      // Price range
      if (searchParams.minPrice) {
        query = query.gte('price', parseFloat(searchParams.minPrice));
      }
      if (searchParams.maxPrice) {
        query = query.lte('price', parseFloat(searchParams.maxPrice));
      }

      // Make filter
      if (searchParams.make) {
        query = query.eq('make', searchParams.make);
      }

      // Fuel type filter
      if (searchParams.fuelType) {
        query = query.eq('fuel_type', searchParams.fuelType);
      }

      // Body type filter
      if (searchParams.bodyType) {
        query = query.eq('body_type', searchParams.bodyType);
      }

      // Year range
      if (searchParams.minYear) {
        query = query.gte('year', parseInt(searchParams.minYear));
      }
      if (searchParams.maxYear) {
        query = query.lte('year', parseInt(searchParams.maxYear));
      }

      // Sorting
      const sortBy = searchParams.sortBy || 'created_at';
      const sortOrder = searchParams.sortOrder === 'asc';
      
      if (sortBy === 'price_asc') {
        query = query.order('price', { ascending: true });
      } else if (sortBy === 'price_desc') {
        query = query.order('price', { ascending: false });
      } else if (sortBy === 'year_desc') {
        query = query.order('year', { ascending: false });
      } else if (sortBy === 'mileage_asc') {
        query = query.order('mileage', { ascending: true });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      // Pagination
      const page = parseInt(searchParams.page) || 1;
      const limit = parseInt(searchParams.limit) || 20;
      const offset = (page - 1) * limit;

      query = query.range(offset, offset + limit - 1);

      const { data, error } = await query;
      if (error) throw error;

      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async incrementViews(vehicleId) {
    try {
      const { error } = await this.db
        .rpc('increment_views', { 
          table_name: 'vehicles',
          row_id: vehicleId 
        });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

class PartService extends DatabaseService {
  constructor() {
    super('parts');
  }

  async searchParts(searchParams) {
    try {
      let query = this.db
        .from('parts')
        .select(`
          *,
          users(first_name, last_name, account_type, is_verified),
          business_profiles(company_name)
        `)
        .eq('is_active', true);

      // Text search
      if (searchParams.search) {
        query = query.or(`title.ilike.%${searchParams.search}%,brand.ilike.%${searchParams.search}%,part_number.ilike.%${searchParams.search}%`);
      }

      // Category filter
      if (searchParams.category) {
        query = query.eq('category', searchParams.category);
      }

      // Condition filter
      if (searchParams.condition) {
        query = query.eq('condition', searchParams.condition);
      }

      // Brand filter
      if (searchParams.brand) {
        query = query.ilike('brand', `%${searchParams.brand}%`);
      }

      // Location filter
      if (searchParams.location) {
        query = query.ilike('location', `%${searchParams.location}%`);
      }

      // Price range
      if (searchParams.minPrice) {
        query = query.gte('price', parseFloat(searchParams.minPrice));
      }
      if (searchParams.maxPrice) {
        query = query.lte('price', parseFloat(searchParams.maxPrice));
      }

      // Sorting
      const sortBy = searchParams.sortBy || 'created_at';
      if (sortBy === 'price_asc') {
        query = query.order('price', { ascending: true });
      } else if (sortBy === 'price_desc') {
        query = query.order('price', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      // Pagination
      const page = parseInt(searchParams.page) || 1;
      const limit = parseInt(searchParams.limit) || 20;
      const offset = (page - 1) * limit;

      query = query.range(offset, offset + limit - 1);

      const { data, error } = await query;
      if (error) throw error;

      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

class ServiceProviderService extends DatabaseService {
  constructor() {
    super('services');
  }

  async searchServices(searchParams) {
    try {
      let query = this.db
        .from('services')
        .select(`
          *,
          users(first_name, last_name, account_type, is_verified),
          business_profiles(company_name, experience_years)
        `)
        .eq('is_active', true);

      // Text search
      if (searchParams.search) {
        query = query.or(`title.ilike.%${searchParams.search}%,description.ilike.%${searchParams.search}%,service_type.ilike.%${searchParams.search}%`);
      }

      // Service type filter
      if (searchParams.serviceType && searchParams.serviceType !== 'all') {
        query = query.eq('service_type', searchParams.serviceType);
      }

      // Location filter
      if (searchParams.location) {
        query = query.ilike('location', `%${searchParams.location}%`);
      }

      // Price range
      if (searchParams.minPrice) {
        query = query.gte('price', parseFloat(searchParams.minPrice));
      }
      if (searchParams.maxPrice) {
        query = query.lte('price', parseFloat(searchParams.maxPrice));
      }

      // Additional filters
      if (searchParams.certified) {
        query = query.contains('certifications', [searchParams.certified]);
      }
      
      if (searchParams.homeService) {
        query = query.eq('home_service', true);
      }

      if (searchParams.emergencyService) {
        query = query.eq('emergency_service', true);
      }

      // Sorting
      const sortBy = searchParams.sortBy || 'created_at';
      if (sortBy === 'price_asc') {
        query = query.order('price', { ascending: true });
      } else if (sortBy === 'price_desc') {
        query = query.order('price', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      // Pagination
      const page = parseInt(searchParams.page) || 1;
      const limit = parseInt(searchParams.limit) || 20;
      const offset = (page - 1) * limit;

      query = query.range(offset, offset + limit - 1);

      const { data, error } = await query;
      if (error) throw error;

      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

class MessageService extends DatabaseService {
  constructor() {
    super('messages');
  }

  async getConversations(userId) {
    try {
      const { data, error } = await this.db
        .from('messages')
        .select(`
          conversation_id,
          sender_id,
          recipient_id,
          content,
          created_at,
          is_read,
          users!sender_id(first_name, last_name, avatar_url),
          users!recipient_id(first_name, last_name, avatar_url)
        `)
        .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group by conversation and get latest message for each
      const conversations = {};
      data.forEach(message => {
        const convId = message.conversation_id;
        if (!conversations[convId] || new Date(message.created_at) > new Date(conversations[convId].created_at)) {
          conversations[convId] = message;
        }
      });

      return { success: true, data: Object.values(conversations) };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getConversationMessages(conversationId, userId) {
    try {
      const { data, error } = await this.db
        .from('messages')
        .select(`
          *,
          users!sender_id(first_name, last_name, avatar_url)
        `)
        .eq('conversation_id', conversationId)
        .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

class ReviewService extends DatabaseService {
  constructor() {
    super('reviews');
  }

  async getAverageRating(userId) {
    try {
      const { data, error } = await this.db
        .from('reviews')
        .select('rating')
        .eq('reviewed_user_id', userId);

      if (error) throw error;

      if (!data || data.length === 0) {
        return { success: true, data: { average: 0, count: 0 } };
      }

      const average = data.reduce((sum, review) => sum + review.rating, 0) / data.length;
      return { 
        success: true, 
        data: { 
          average: Math.round(average * 10) / 10, 
          count: data.length 
        } 
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = {
  DatabaseService,
  UserService,
  VehicleService,
  PartService,
  ServiceProviderService,
  MessageService,
  ReviewService
};