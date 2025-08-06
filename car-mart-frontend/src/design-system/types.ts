// src/design-system/types.ts
// Fixed version with correct Badge and Button variants

import React from 'react';

// Base item interface that all marketplace items extend
export interface BaseItem {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  created_at: string;
  updated_at?: string;
  is_featured: boolean;
  is_verified?: boolean;
  is_active?: boolean;
  views_count?: number;
  favorites_count?: number;
  user?: {
    id: string;
    first_name: string;
    last_name: string;
    phone?: string;
    email?: string;
    avatar?: string;
    account_type?: string;
    rating?: number;
    total_reviews?: number;
  };
}

// Vehicle specific interface
export interface Vehicle extends BaseItem {
  make: string;
  model: string;
  year: number;
  fuel_type: string;
  transmission: string;
  body_type: string;
  engine_capacity?: number;
  seats?: number;
  doors?: number;
  color?: string;
  mileage?: number;
  condition: string;
  accident_history?: boolean;
  service_history?: string[];
  previous_owners?: number;
  registration_number?: string;
  insurance_expiry?: string;
  negotiable?: boolean;
}

// Rental specific interface
export interface Rental extends BaseItem {
  make: string;
  model: string;
  year: number;
  daily_rate: number;
  weekly_rate?: number;
  monthly_rate?: number;
  security_deposit: number;
  fuel_type: string;
  transmission: string;
  body_type: string;
  seats: number;
  doors?: number;
  color?: string;
  mileage?: number;
  condition: string;
  rental_type: 'daily' | 'weekly' | 'monthly';
  minimum_rental_days: number;
  maximum_rental_days: number;
  fuel_policy: string;
  mileage_limit_per_day: number;
  extra_mileage_charge?: number;
  available_from: string;
  available_until?: string;
  features: string[];
  included_items: string[];
  pickup_locations: string[];
  delivery_available: boolean;
  delivery_fee?: number;
  insurance_included: boolean;
  booking_count?: number;
  average_rating?: number;
  total_reviews?: number;
}

// Part specific interface
export interface Part extends BaseItem {
  brand: string;
  part_number?: string;
  category: string;
  condition: string;
  compatibility: string[];
  stock_quantity?: number;
  warranty_period?: string;
  is_oem?: boolean;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
}

// Service specific interface
export interface Service extends BaseItem {
  service_type: string;
  price_type: 'fixed' | 'hourly' | 'quote';
  duration?: string;
  warranty_period?: string;
  features: string[];
  requirements: string[];
  service_areas: string[];
  availability?: Record<string, any>;
  home_service: boolean;
  pickup_dropoff: boolean;
  emergency_service: boolean;
  online_booking: boolean;
  equipment_type?: string;
  certifications: string[];
  languages: string[];
  payment_options: string[];
  average_rating?: number;
  total_reviews?: number;
  response_time?: string;
}

// ✅ Fixed Card action interface with correct Button variants
export interface CardAction {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'; // ✅ Available variants only
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

// ✅ Fixed Badge interface with correct Badge variants
export interface BadgeInfo {
  label: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline'; // ✅ Available variants only
  icon?: React.ComponentType<{ className?: string }>;
}

// Helper function to map semantic variants to available variants
export const getBadgeVariant = (semantic: 'success' | 'warning' | 'info' | 'error' | 'default'): BadgeInfo['variant'] => {
  switch (semantic) {
    case 'success':
      return 'secondary'; // Green-ish appearance
    case 'warning':
      return 'outline';   // Warning appearance
    case 'info':
      return 'outline';   // Info appearance
    case 'error':
      return 'destructive'; // Error appearance
    default:
      return 'default';
  }
};

// Helper function to map semantic button variants to available variants
export const getButtonVariant = (semantic: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'): CardAction['variant'] => {
  switch (semantic) {
    case 'primary':
      return 'default';     // Primary button
    case 'secondary':
      return 'secondary';   // Secondary button
    case 'success':
      return 'default';     // Success action (use default styling)
    case 'warning':
      return 'outline';     // Warning action
    case 'danger':
      return 'destructive'; // Dangerous action
    default:
      return 'default';
  }
};

// Filter option interface
export interface FilterOption {
  id: string;
  label: string;
  type: 'search' | 'select' | 'range' | 'checkbox' | 'date' | 'multiselect' | 'radio' | 'number';
  options?: { value: string; label: string; count?: number }[];
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  required?: boolean;
  validation?: (value: any) => boolean | string;
}

// Filter section interface
export interface FilterSection {
  id: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  collapsible?: boolean;
  defaultOpen?: boolean;
  filters: FilterOption[];
  priority?: number; // For sorting sections
}

// Filter values interface
export interface FilterValues {
  [key: string]: any;
}

// Sort options interface
export interface SortOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

// Pagination interface
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Search result interface
export interface SearchResult<T = BaseItem> {
  items: T[];
  pagination: PaginationInfo;
  filters: FilterValues;
  sort: string;
  loading: boolean;
  error?: string;
}

// Card layout variants
export type CardLayout = 'grid' | 'list' | 'compact';

// Card size variants
export type CardSize = 'sm' | 'md' | 'lg';

// Theme variants
export type ThemeVariant = 'light' | 'dark' | 'system';

// Responsive breakpoints
export interface Breakpoints {
  xs: number;  // 0px
  sm: number;  // 640px
  md: number;  // 768px
  lg: number;  // 1024px
  xl: number;  // 1280px
  '2xl': number; // 1536px
}

// Component props for extending
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

// Loading state interface
export interface LoadingState {
  loading: boolean;
  error?: string | null;
  data?: any;
}

// Form field interface
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'file' | 'date';
  placeholder?: string;
  required?: boolean;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    min?: number;
    max?: number;
    custom?: (value: any) => boolean | string;
  };
  options?: { value: string; label: string }[];
  disabled?: boolean;
  hidden?: boolean;
  description?: string;
}

// API response interface
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: PaginationInfo;
  filters?: FilterValues;
}