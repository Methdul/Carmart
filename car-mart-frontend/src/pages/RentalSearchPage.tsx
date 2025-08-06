// src/pages/RentalSearchPage.tsx
// Complete rental search implementation following Car Mart design system

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  SortAsc,
  MapPin,
  Calendar,
  Fuel,
  Gauge,
  Car,
  Heart,
  Share2,
  Eye,
  Loader2,
  AlertCircle,
  RotateCcw,
  ChevronDown,
  X,
  Clock,
  Users,
  Shield,
  Star,
  Truck,
  DollarSign
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Mock components - replace with your actual components
const Header = () => <div className="h-16 bg-white border-b" />;
const FavoriteButton = ({ itemId }: any) => (
  <Button variant="ghost" size="sm"><Heart className="h-4 w-4" /></Button>
);

// TypeScript interfaces
interface Rental {
  id: string;
  title: string;
  description: string;
  make: string;
  model: string;
  year: number;
  daily_rate: number;
  weekly_rate?: number;
  monthly_rate?: number;
  security_deposit: number;
  location: string;
  fuel_type: string;
  transmission: string;
  body_type: string;
  seats: number;
  doors: number;
  color: string;
  mileage: number;
  condition: string;
  rental_type: 'daily' | 'weekly' | 'monthly';
  minimum_rental_days: number;
  maximum_rental_days: number;
  fuel_policy: string;
  mileage_limit_per_day: number;
  available_from: string;
  features: string[];
  included_items: string[];
  pickup_locations: string[];
  delivery_available: boolean;
  delivery_fee: number;
  insurance_included: boolean;
  images: string[];
  is_featured: boolean;
  views: number;
  booking_count: number;
  average_rating: number;
  total_reviews: number;
  created_at: string;
}

interface SearchFilters {
  q: string;
  make: string;
  model: string;
  minYear: string;
  maxYear: string;
  minDailyRate: string;
  maxDailyRate: string;
  rentalType: string;
  fuelType: string;
  transmission: string;
  bodyType: string;
  minSeats: string;
  location: string;
  deliveryAvailable: string;
  insuranceIncluded: string;
  minRating: string;
}

interface FilterOptions {
  makes: Array<{value: string, label: string, count: number}>;
  models: Array<{value: string, label: string, count: number}>;
  rentalTypes: Array<{value: string, label: string, count: number}>;
  fuelTypes: Array<{value: string, label: string, count: number}>;
  transmissions: Array<{value: string, label: string, count: number}>;
  bodyTypes: Array<{value: string, label: string, count: number}>;
  locations: Array<{value: string, label: string, count: number}>;
}

const RentalSearchPage: React.FC = () => {
  // Real location and navigation hooks
  const location = useLocation();
  const navigate = useNavigate();
  
  // State management
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    q: '',
    make: 'all',
    model: 'all',
    minYear: '',
    maxYear: '',
    minDailyRate: '',
    maxDailyRate: '',
    rentalType: 'all',
    fuelType: 'all',
    transmission: 'all',
    bodyType: 'all',
    minSeats: 'all',
    location: 'all',
    deliveryAvailable: 'all',
    insuranceIncluded: 'all',
    minRating: 'all'
  });
  
  // Filter options from API
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    makes: [],
    models: [],
    rentalTypes: [],
    fuelTypes: [],
    transmissions: [],
    bodyTypes: [],
    locations: []
  });
  
  // Pagination and sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [sortBy, setSortBy] = useState('relevance');
  
  // Parse URL parameters on component mount
  useEffect(() => {
    // Use real URL parameters from react-router-dom
    const urlParams = new URLSearchParams(location.search);
    
    const newFilters: SearchFilters = {
      q: urlParams.get('q') || '',
      make: urlParams.get('make') || 'all',
      model: urlParams.get('model') || 'all',
      minYear: urlParams.get('minYear') || '',
      maxYear: urlParams.get('maxYear') || '',
      minDailyRate: urlParams.get('minDailyRate') || '',
      maxDailyRate: urlParams.get('maxDailyRate') || '',
      rentalType: urlParams.get('rentalType') || 'all',
      fuelType: urlParams.get('fuelType') || 'all',
      transmission: urlParams.get('transmission') || 'all',
      bodyType: urlParams.get('bodyType') || 'all',
      minSeats: urlParams.get('minSeats') || 'all',
      location: urlParams.get('location') || 'all',
      deliveryAvailable: urlParams.get('deliveryAvailable') || 'all',
      insuranceIncluded: urlParams.get('insuranceIncluded') || 'all',
      minRating: urlParams.get('minRating') || 'all'
    };
    
    setFilters(newFilters);
    setSearchQuery(newFilters.q);
    setCurrentPage(parseInt(urlParams.get('page') || '1'));
    setSortBy(urlParams.get('sort') || 'relevance');
    
    // Load initial data and filter options
    loadFilterOptions();
    
    // If there's a search query from URL, perform search immediately
    if (newFilters.q) {
      console.log('🔍 Loading rentals with search query:', newFilters.q);
      performSearch(newFilters, 1, urlParams.get('sort') || 'relevance');
    } else {
      loadMockData();
    }
  }, [location.search]); // React to URL changes
  
  // API service for rental search (with mock data for demo)
  const rentalAPI = {
    async searchRentals(searchFilters: SearchFilters, page: number, sort: string) {
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        const queryParams = new URLSearchParams();
        
        // Add all non-empty filters to query params
        Object.entries(searchFilters).forEach(([key, value]) => {
          if (value && value.trim() !== '') {
            queryParams.append(key, value);
          }
        });
        
        if (page > 1) queryParams.append('page', page.toString());
        if (sort !== 'relevance') queryParams.append('sort', sort);
        
        // In real app: const response = await fetch(`/api/rentals?${queryParams}`);
        console.log('Searching rentals with params:', queryParams.toString());
        
        // Return mock data for demo
        return {
          success: true,
          data: getMockRentals(searchFilters),
          pagination: {
            totalPages: 3,
            totalItems: 28,
            currentPage: page,
            itemsPerPage: 10
          },
          filterOptions: getMockFilterOptions()
        };
      } catch (error) {
        console.error('Rental search error:', error);
        throw error;
      }
    },
    
    async getFilterOptions(make?: string) {
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        console.log('Loading filter options for make:', make);
        
        return {
          success: true,
          data: getMockFilterOptions(make)
        };
      } catch (error) {
        console.error('Filter options error:', error);
        throw error;
      }
    }
  };
  
  // Mock data functions
  const getMockRentals = (filters: SearchFilters): Rental[] => {
    const mockRentals: Rental[] = [
      {
        id: '1',
        title: 'Toyota Corolla - Daily Rental',
        description: 'Comfortable sedan perfect for city driving and short trips',
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        daily_rate: 3500,
        weekly_rate: 22000,
        monthly_rate: 85000,
        security_deposit: 15000,
        location: 'Colombo',
        fuel_type: 'Petrol',
        transmission: 'Auto',
        body_type: 'Sedan',
        seats: 5,
        doors: 4,
        color: 'Silver',
        mileage: 25000,
        condition: 'Excellent',
        rental_type: 'daily',
        minimum_rental_days: 1,
        maximum_rental_days: 30,
        fuel_policy: 'full-to-full',
        mileage_limit_per_day: 200,
        available_from: '2024-01-01',
        features: ['AC', 'GPS', 'Bluetooth', 'USB Charging'],
        included_items: ['First Aid Kit', 'Emergency Kit', 'Phone Charger'],
        pickup_locations: ['Airport', 'City Center', 'Hotel Pickup'],
        delivery_available: true,
        delivery_fee: 500,
        insurance_included: true,
        images: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2/'],
        is_featured: true,
        views: 1250,
        booking_count: 45,
        average_rating: 4.8,
        total_reviews: 32,
        created_at: '2024-01-15'
      },
      {
        id: '2',
        title: 'Honda Civic - Weekly Special',
        description: 'Stylish and reliable car ideal for longer trips and business travel',
        make: 'Honda',
        model: 'Civic',
        year: 2021,
        daily_rate: 4200,
        weekly_rate: 26000,
        monthly_rate: 95000,
        security_deposit: 20000,
        location: 'Kandy',
        fuel_type: 'Petrol',
        transmission: 'CVT',
        body_type: 'Sedan',
        seats: 5,
        doors: 4,
        color: 'White',
        mileage: 18000,
        condition: 'Excellent',
        rental_type: 'weekly',
        minimum_rental_days: 3,
        maximum_rental_days: 90,
        fuel_policy: 'same-to-same',
        mileage_limit_per_day: 250,
        available_from: '2024-01-01',
        features: ['Sunroof', 'Leather Seats', 'Reverse Camera', 'Cruise Control'],
        included_items: ['Mobile Holder', 'Emergency Kit', 'Road Map'],
        pickup_locations: ['Kandy City', 'Train Station'],
        delivery_available: false,
        delivery_fee: 0,
        insurance_included: true,
        images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d/'],
        is_featured: false,
        views: 890,
        booking_count: 28,
        average_rating: 4.6,
        total_reviews: 19,
        created_at: '2024-01-10'
      },
      {
        id: '3',
        title: 'Nissan Kicks SUV - Family Rental',
        description: 'Spacious SUV perfect for family trips and group travel',
        make: 'Nissan',
        model: 'Kicks',
        year: 2022,
        daily_rate: 5500,
        weekly_rate: 35000,
        monthly_rate: 140000,
        security_deposit: 25000,
        location: 'Galle',
        fuel_type: 'Petrol',
        transmission: 'CVT',
        body_type: 'SUV',
        seats: 7,
        doors: 5,
        color: 'Blue',
        mileage: 12000,
        condition: 'Like New',
        rental_type: 'daily',
        minimum_rental_days: 2,
        maximum_rental_days: 60,
        fuel_policy: 'full-to-full',
        mileage_limit_per_day: 300,
        available_from: '2024-01-01',
        features: ['4WD', 'Backup Camera', 'Bluetooth', 'Roof Rails'],
        included_items: ['Child Seats Available', 'Cooler Box', 'Beach Umbrella'],
        pickup_locations: ['Galle Fort', 'Bus Station', 'Beach Hotels'],
        delivery_available: true,
        delivery_fee: 800,
        insurance_included: true,
        images: ['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7/'],
        is_featured: true,
        views: 2100,
        booking_count: 67,
        average_rating: 4.9,
        total_reviews: 41,
        created_at: '2024-01-08'
      }
    ];
    
    // Apply basic filtering for demo
    return mockRentals.filter(rental => {
      if (filters.q && !rental.title.toLowerCase().includes(filters.q.toLowerCase())) return false;
      if (filters.make && filters.make !== 'all' && rental.make.toLowerCase() !== filters.make.toLowerCase()) return false;
      if (filters.model && filters.model !== 'all' && rental.model.toLowerCase() !== filters.model.toLowerCase()) return false;
      if (filters.minDailyRate && rental.daily_rate < parseInt(filters.minDailyRate)) return false;
      if (filters.maxDailyRate && rental.daily_rate > parseInt(filters.maxDailyRate)) return false;
      if (filters.rentalType && filters.rentalType !== 'all' && rental.rental_type !== filters.rentalType) return false;
      if (filters.fuelType && filters.fuelType !== 'all' && rental.fuel_type.toLowerCase() !== filters.fuelType.toLowerCase()) return false;
      if (filters.transmission && filters.transmission !== 'all' && rental.transmission.toLowerCase() !== filters.transmission.toLowerCase()) return false;
      if (filters.bodyType && filters.bodyType !== 'all' && rental.body_type.toLowerCase() !== filters.bodyType.toLowerCase()) return false;
      if (filters.minSeats && filters.minSeats !== 'all' && rental.seats < parseInt(filters.minSeats)) return false;
      if (filters.location && filters.location !== 'all' && rental.location.toLowerCase() !== filters.location.toLowerCase()) return false;
      if (filters.deliveryAvailable === 'true' && !rental.delivery_available) return false;
      if (filters.insuranceIncluded === 'true' && !rental.insurance_included) return false;
      if (filters.minRating && filters.minRating !== 'all' && rental.average_rating < parseFloat(filters.minRating)) return false;
      return true;
    });
  };
  
  const getMockFilterOptions = (selectedMake?: string): FilterOptions => {
    return {
      makes: [
        { value: 'toyota', label: 'Toyota', count: 45 },
        { value: 'honda', label: 'Honda', count: 32 },
        { value: 'nissan', label: 'Nissan', count: 28 },
        { value: 'suzuki', label: 'Suzuki', count: 25 }
      ],
      models: selectedMake === 'toyota' ? [
        { value: 'corolla', label: 'Corolla', count: 15 },
        { value: 'camry', label: 'Camry', count: 8 },
        { value: 'prius', label: 'Prius', count: 12 }
      ] : selectedMake === 'honda' ? [
        { value: 'civic', label: 'Civic', count: 10 },
        { value: 'accord', label: 'Accord', count: 6 },
        { value: 'crv', label: 'CR-V', count: 8 }
      ] : [],
      rentalTypes: [
        { value: 'daily', label: 'Daily', count: 85 },
        { value: 'weekly', label: 'Weekly', count: 35 },
        { value: 'monthly', label: 'Monthly', count: 12 }
      ],
      fuelTypes: [
        { value: 'petrol', label: 'Petrol', count: 95 },
        { value: 'diesel', label: 'Diesel', count: 25 },
        { value: 'hybrid', label: 'Hybrid', count: 8 }
      ],
      transmissions: [
        { value: 'auto', label: 'Automatic', count: 78 },
        { value: 'manual', label: 'Manual', count: 42 },
        { value: 'cvt', label: 'CVT', count: 25 }
      ],
      bodyTypes: [
        { value: 'sedan', label: 'Sedan', count: 65 },
        { value: 'suv', label: 'SUV', count: 38 },
        { value: 'hatchback', label: 'Hatchback', count: 22 }
      ],
      locations: [
        { value: 'colombo', label: 'Colombo', count: 85 },
        { value: 'kandy', label: 'Kandy', count: 25 },
        { value: 'galle', label: 'Galle', count: 15 }
      ]
    };
  };
  
  // Load mock data
  const loadMockData = async () => {
    setLoading(true);
    try {
      const mockData = getMockRentals(filters);
      setRentals(mockData);
      setTotalResults(mockData.length);
      setTotalPages(Math.ceil(mockData.length / 10));
    } catch (error) {
      setError('Failed to load rentals');
    } finally {
      setLoading(false);
    }
  };
  
  // Perform search function
  const performSearch = async (searchFilters: SearchFilters, page: number = 1, sort: string = 'relevance') => {
    try {
      setLoading(true);
      setError('');
      
      const response = await rentalAPI.searchRentals(searchFilters, page, sort);
      
      if (response.success) {
        setRentals(response.data || []);
        setTotalPages(response.pagination?.totalPages || 1);
        setTotalResults(response.pagination?.totalItems || 0);
        
        // Update filter options if provided
        if (response.filterOptions) {
          setFilterOptions(response.filterOptions);
        }
      } else {
        throw new Error('Failed to search rentals');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
      setRentals([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };
  
  // Update URL with current search parameters
  const updateURL = (newFilters: SearchFilters, page: number, sort: string) => {
    const queryParams = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value.trim() !== '' && value !== 'all') {
        queryParams.append(key, value);
      }
    });
    
    if (page > 1) queryParams.append('page', page.toString());
    if (sort !== 'relevance') queryParams.append('sort', sort);
    
    const newURL = `/rentals${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    window.history.pushState({}, '', newURL);
  };
  
  // Handle filter changes
  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setCurrentPage(1);
    
    // If make changes, clear model and fetch new models
    if (key === 'make') {
      newFilters.model = 'all';
      loadFilterOptions(value === 'all' ? undefined : value);
    }
    
    updateURL(newFilters, 1, sortBy);
    performSearch(newFilters, 1, sortBy);
  };
  
  // Handle search button click
  const handleSearchClick = () => {
    const newFilters = { ...filters, q: searchQuery };
    setFilters(newFilters);
    setCurrentPage(1);
    updateURL(newFilters, 1, sortBy);
    performSearch(newFilters, 1, sortBy);
  };
  
  // Handle sort change
  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    updateURL(filters, currentPage, newSort);
    performSearch(filters, currentPage, newSort);
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL(filters, page, sortBy);
    performSearch(filters, page, sortBy);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Clear all filters
  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      q: '',
      make: 'all',
      model: 'all',
      minYear: '',
      maxYear: '',
      minDailyRate: '',
      maxDailyRate: '',
      rentalType: 'all',
      fuelType: 'all',
      transmission: 'all',
      bodyType: 'all',
      minSeats: 'all',
      location: 'all',
      deliveryAvailable: 'all',
      insuranceIncluded: 'all',
      minRating: 'all'
    };
    
    setFilters(clearedFilters);
    setSearchQuery('');
    setCurrentPage(1);
    updateURL(clearedFilters, 1, 'relevance');
    performSearch(clearedFilters, 1, 'relevance');
  };
  
  // Load filter options (makes, models, etc.)
  const loadFilterOptions = async (make?: string) => {
    try {
      const response = await rentalAPI.getFilterOptions(make);
      if (response.success) {
        setFilterOptions(response.data);
      }
    } catch (error) {
      console.error('Failed to load filter options:', error);
    }
  };
  
  // Format price for display
  const formatPrice = (price: number) => {
    return `Rs ${price.toLocaleString()}`;
  };
  
  // Get active filter count
  const getActiveFilterCount = () => {
    return Object.values(filters).filter(value => value && value.trim() !== '' && value !== 'all').length;
  };
  
  // Rental card component
  const RentalCard = ({ rental }: { rental: Rental }) => (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
      <div className="relative">
        {rental.images && rental.images.length > 0 ? (
          <img
            src={rental.images[0]}
            alt={rental.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        ) : (
          <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
            <Car className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        
        <div className="absolute top-2 left-2 flex gap-1">
          {rental.is_featured && (
            <Badge className="bg-yellow-500 hover:bg-yellow-600">Featured</Badge>
          )}
          <Badge variant="secondary">{rental.rental_type}</Badge>
        </div>
        
        <div className="absolute top-2 right-2 flex gap-1">
          <FavoriteButton itemId={rental.id} />
          <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary">
          {rental.title}
        </h3>
        
        <div className="text-2xl font-bold text-primary mb-2">
          {formatPrice(rental.daily_rate)}/day
        </div>
        
        {rental.weekly_rate && (
          <div className="text-sm text-muted-foreground mb-3">
            Weekly: {formatPrice(rental.weekly_rate)}
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {rental.year}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {rental.seats} seats
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="h-3 w-3" />
            {rental.fuel_type}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {rental.location}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {rental.delivery_available && (
            <Badge variant="outline" className="text-xs">
              <Truck className="h-3 w-3 mr-1" />
              Delivery
            </Badge>
          )}
          {rental.insurance_included && (
            <Badge variant="outline" className="text-xs">
              <Shield className="h-3 w-3 mr-1" />
              Insurance
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {rental.average_rating} ({rental.total_reviews})
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Eye className="h-3 w-3" />
              {rental.views} views
            </div>
          </div>
          
          <Button size="sm">Book Now</Button>
        </div>
      </CardContent>
    </Card>
  );
  
  // Filter sidebar component
  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {getActiveFilterCount() > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>
      
      {/* Make Filter */}
      <div className="space-y-2">
        <Label>Make</Label>
        <Select value={filters.make} onValueChange={(value) => handleFilterChange('make', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select make" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All makes</SelectItem>
            {filterOptions.makes.map((make) => (
              <SelectItem key={make.value} value={make.value}>
                {make.label} ({make.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Model Filter */}
      {filters.make && filters.make !== 'all' && (
        <div className="space-y-2">
          <Label>Model</Label>
          <Select value={filters.model} onValueChange={(value) => handleFilterChange('model', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All models</SelectItem>
              {filterOptions.models.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.label} ({model.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      {/* Daily Rate Range */}
      <div className="space-y-2">
        <Label>Daily Rate Range</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Input
              type="number"
              placeholder="Min rate"
              value={filters.minDailyRate}
              onChange={(e) => handleFilterChange('minDailyRate', e.target.value)}
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Max rate"
              value={filters.maxDailyRate}
              onChange={(e) => handleFilterChange('maxDailyRate', e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Rental Type */}
      <div className="space-y-2">
        <Label>Rental Type</Label>
        <Select value={filters.rentalType} onValueChange={(value) => handleFilterChange('rentalType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any type</SelectItem>
            {filterOptions.rentalTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label} ({type.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Fuel Type */}
      <div className="space-y-2">
        <Label>Fuel Type</Label>
        <Select value={filters.fuelType} onValueChange={(value) => handleFilterChange('fuelType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any fuel type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any fuel type</SelectItem>
            {filterOptions.fuelTypes.map((fuel) => (
              <SelectItem key={fuel.value} value={fuel.value}>
                {fuel.label} ({fuel.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Transmission */}
      <div className="space-y-2">
        <Label>Transmission</Label>
        <Select value={filters.transmission} onValueChange={(value) => handleFilterChange('transmission', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any transmission" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any transmission</SelectItem>
            {filterOptions.transmissions.map((trans) => (
              <SelectItem key={trans.value} value={trans.value}>
                {trans.label} ({trans.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Body Type */}
      <div className="space-y-2">
        <Label>Body Type</Label>
        <Select value={filters.bodyType} onValueChange={(value) => handleFilterChange('bodyType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any body type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any body type</SelectItem>
            {filterOptions.bodyTypes.map((body) => (
              <SelectItem key={body.value} value={body.value}>
                {body.label} ({body.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Minimum Seats */}
      <div className="space-y-2">
        <Label>Minimum Seats</Label>
        <Select value={filters.minSeats} onValueChange={(value) => handleFilterChange('minSeats', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any seats" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any seats</SelectItem>
            <SelectItem value="2">2+ seats</SelectItem>
            <SelectItem value="4">4+ seats</SelectItem>
            <SelectItem value="5">5+ seats</SelectItem>
            <SelectItem value="7">7+ seats</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Location */}
      <div className="space-y-2">
        <Label>Location</Label>
        <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any location</SelectItem>
            {filterOptions.locations.map((loc) => (
              <SelectItem key={loc.value} value={loc.value}>
                {loc.label} ({loc.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Features */}
      <div className="space-y-2">
        <Label>Features</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="delivery"
              checked={filters.deliveryAvailable === 'true'}
              onCheckedChange={(checked) => handleFilterChange('deliveryAvailable', checked ? 'true' : 'all')}
            />
            <Label htmlFor="delivery" className="text-sm">Delivery Available</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="insurance"
              checked={filters.insuranceIncluded === 'true'}
              onCheckedChange={(checked) => handleFilterChange('insuranceIncluded', checked ? 'true' : 'all')}
            />
            <Label htmlFor="insurance" className="text-sm">Insurance Included</Label>
          </div>
        </div>
      </div>
      
      {/* Minimum Rating */}
      <div className="space-y-2">
        <Label>Minimum Rating</Label>
        <Select value={filters.minRating} onValueChange={(value) => handleFilterChange('minRating', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any rating</SelectItem>
            <SelectItem value="4">4+ stars</SelectItem>
            <SelectItem value="4.5">4.5+ stars</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Rental Vehicles</h1>
              <p className="text-muted-foreground">
                {loading ? 'Searching...' : `${totalResults.toLocaleString()} vehicles available for rent`}
              </p>
            </div>
            
            {/* Search Form */}
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search by make, model, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearchClick} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
              </Button>
            </div>
          </div>
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Mobile Filter Button */}
              <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {getActiveFilterCount() > 0 && (
                      <Badge className="ml-2">{getActiveFilterCount()}</Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filter Rentals</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>
              
              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="daily_rate_asc">Price: Low to High</SelectItem>
                  <SelectItem value="daily_rate_desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating_desc">Highest Rated</SelectItem>
                  <SelectItem value="booking_count_desc">Most Popular</SelectItem>
                  <SelectItem value="created_at_desc">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <FilterSidebar />
              </CardContent>
            </Card>
          </div>
          
          {/* Results Content */}
          <div className="flex-1">
            {error && (
              <Alert className="mb-6" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mr-2" />
                <span>Searching rentals...</span>
              </div>
            ) : rentals.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No rentals found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Results Grid/List */}
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {rentals.map((rental) => (
                    <RentalCard key={rental.id} rental={rental} />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = i + Math.max(1, currentPage - 2);
                        return pageNum <= totalPages ? (
                          <Button
                            key={pageNum}
                            variant={pageNum === currentPage ? 'default' : 'outline'}
                            onClick={() => handlePageChange(pageNum)}
                          >
                            {pageNum}
                          </Button>
                        ) : null;
                      })}
                      
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalSearchPage;