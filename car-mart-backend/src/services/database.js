const { supabase } = require('../config/database');
const bcrypt = require('bcryptjs');

class VehicleService {
  // Get all vehicles with filtering
  static async getVehicles(filters = {}) {
    let query = supabase
      .from('vehicles')
      .select(`
        *,
        users!vehicles_user_id_fkey (
          first_name,
          last_name,
          phone,
          location
        )
      `)
      .eq('is_active', true);

    // Apply filters
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,make.ilike.%${filters.search}%,model.ilike.%${filters.search}%`);
    }

    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    if (filters.minPrice) {
      query = query.gte('price', filters.minPrice);
    }

    if (filters.maxPrice) {
      query = query.lte('price', filters.maxPrice);
    }

    if (filters.make) {
      query = query.ilike('make', `%${filters.make}%`);
    }

    if (filters.fuelType) {
      query = query.eq('fuel_type', filters.fuelType);
    }

    if (filters.bodyType) {
      query = query.eq('body_type', filters.bodyType);
    }

    if (filters.transmission) {
      query = query.eq('transmission', filters.transmission);
    }

    // Order by created_at desc by default
    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch vehicles: ${error.message}`);
    }

    return data;
  }

  // Get single vehicle by ID
  static async getVehicleById(id) {
    const { data, error } = await supabase
      .from('vehicles')
      .select(`
        *,
        users!vehicles_user_id_fkey (
          first_name,
          last_name,
          phone,
          location,
          email
        )
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Not found
      }
      throw new Error(`Failed to fetch vehicle: ${error.message}`);
    }

    // Increment view count
    await this.incrementViews(id);

    return data;
  }

  // Create new vehicle
  static async createVehicle(vehicleData, userId) {
    const { data, error } = await supabase
      .from('vehicles')
      .insert([{
        ...vehicleData,
        user_id: userId
      }])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create vehicle: ${error.message}`);
    }

    return data;
  }

  // Update vehicle
  static async updateVehicle(id, vehicleData, userId) {
    const { data, error } = await supabase
      .from('vehicles')
      .update(vehicleData)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update vehicle: ${error.message}`);
    }

    return data;
  }

  // Delete vehicle
  static async deleteVehicle(id, userId) {
    const { data, error } = await supabase
      .from('vehicles')
      .update({ is_active: false })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to delete vehicle: ${error.message}`);
    }

    return data;
  }

  // Increment view count
  static async incrementViews(id) {
    const { error } = await supabase
      .rpc('increment_vehicle_views', { vehicle_id: id });

    if (error) {
      console.error('Failed to increment views:', error);
    }
  }
}

class PartService {
  // Get all parts with filtering
  static async getParts(filters = {}) {
    let query = supabase
      .from('parts')
      .select(`
        *,
        users!parts_user_id_fkey (
          first_name,
          last_name,
          phone,
          location
        )
      `)
      .eq('is_active', true);

    // Apply filters
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,brand.ilike.%${filters.search}%,category.ilike.%${filters.search}%`);
    }

    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    if (filters.minPrice) {
      query = query.gte('price', filters.minPrice);
    }

    if (filters.maxPrice) {
      query = query.lte('price', filters.maxPrice);
    }

    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    if (filters.brand) {
      query = query.ilike('brand', `%${filters.brand}%`);
    }

    if (filters.condition) {
      query = query.eq('condition', filters.condition);
    }

    // Order by created_at desc by default
    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch parts: ${error.message}`);
    }

    return data;
  }

  // Get single part by ID
  static async getPartById(id) {
    const { data, error } = await supabase
      .from('parts')
      .select(`
        *,
        users!parts_user_id_fkey (
          first_name,
          last_name,
          phone,
          location,
          email
        )
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Not found
      }
      throw new Error(`Failed to fetch part: ${error.message}`);
    }

    // Increment view count
    await this.incrementViews(id);

    return data;
  }

  // Create new part
  static async createPart(partData, userId) {
    const { data, error } = await supabase
      .from('parts')
      .insert([{
        ...partData,
        user_id: userId
      }])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create part: ${error.message}`);
    }

    return data;
  }

  // Increment view count
  static async incrementViews(id) {
    const { error } = await supabase
      .rpc('increment_part_views', { part_id: id });

    if (error) {
      console.error('Failed to increment views:', error);
    }
  }
}

class UserService {
  // Create new user
  static async createUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    const { data, error } = await supabase
      .from('users')
      .insert([{
        email: userData.email,
        password_hash: hashedPassword,
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone,
        location: userData.location
      }])
      .select('id, email, first_name, last_name, phone, location, account_type, created_at')
      .single();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        throw new Error('Email already exists');
      }
      throw new Error(`Failed to create user: ${error.message}`);
    }

    return data;
  }

  // Get user by email
  static async getUserByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Not found
      }
      throw new Error(`Failed to fetch user: ${error.message}`);
    }

    return data;
  }

  // Get user by ID
    // Get user by ID
    static async getUserById(id) {
    const { data, error } = await supabase
        .from('users')
        .select('*')  // ✅ Select ALL fields including is_active
        .eq('id', id)
        .single();   // ✅ Remove .eq('is_active', true) - we check it in middleware

    if (error) {
        if (error.code === 'PGRST116') {
        return null; // Not found
        }
        throw new Error(`Failed to fetch user: ${error.message}`);
    }

    return data;
    }

  // Update user profile
  static async updateUser(id, userData) {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select('id, email, first_name, last_name, phone, location, account_type, is_verified, created_at')
      .single();

    if (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }

    return data;
  }

  // Verify password
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Update last login
  static async updateLastLogin(id) {
    const { error } = await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Failed to update last login:', error);
    }
  }
}

class ServiceService {
  // Get all services with filtering
  static async getServices(filters = {}) {
    let query = supabase
      .from('services')
      .select(`
        *,
        users!services_user_id_fkey (
          first_name,
          last_name,
          phone,
          location
        )
      `)
      .eq('is_active', true);

    // Apply filters
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,service_type.ilike.%${filters.search}%`);
    }

    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    if (filters.serviceType) {
      query = query.eq('service_type', filters.serviceType);
    }

    if (filters.minPrice) {
      query = query.gte('price', filters.minPrice);
    }

    if (filters.maxPrice) {
      query = query.lte('price', filters.maxPrice);
    }

    // Order by created_at desc by default
    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch services: ${error.message}`);
    }

    return data;
  }

  // Get single service by ID
  static async getServiceById(id) {
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        users!services_user_id_fkey (
          first_name,
          last_name,
          phone,
          location,
          email
        )
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Not found
      }
      throw new Error(`Failed to fetch service: ${error.message}`);
    }

    return data;
  }

  // Create new service
  static async createService(serviceData, userId) {
    const { data, error } = await supabase
      .from('services')
      .insert([{
        ...serviceData,
        user_id: userId
      }])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create service: ${error.message}`);
    }

    return data;
  }
}

module.exports = {
  VehicleService,
  PartService,
  UserService,
  ServiceService
};