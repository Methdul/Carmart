// src/pages/ServiceSearchPage.tsx
// Complete service search implementation following Car Mart design system

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
  Clock,
  Wrench,
  Heart,
  Share2,
  Eye,
  Loader2,
  AlertCircle,
  RotateCcw,
  ChevronDown,
  X,
  DollarSign,
  Star,
  Shield,
  Truck,
  Home,
  Phone,
  Award,
  CheckCircle
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
interface Service {
  id: string;
  title: string;
  description: string;
  service_type: string;
  price: number;
  price_type: 'fixed' | 'hourly' | 'quote';
  duration?: string;
  location: string;
  service_areas: string[];
  warranty_period?: string;
  features: string[];
  requirements: string[];
  images: string[];
  availability?: Record<string, any>;
  home_service: boolean;
  pickup_dropoff: boolean;
  emergency_service: boolean;
  online_booking: boolean;
  equipment_type?: string;
  certifications: string[];
  languages: string[];
  payment_options: string[];
  is_featured: boolean;
  views: number;
  average_rating: number;
  total_reviews: number;
  created_at: string;
}

interface SearchFilters {
  q: string;
  serviceType: string;
  priceType: string;
  minPrice: string;
  maxPrice: string;
  location: string;
  homeService: string;
  pickupDropoff: string;
  emergencyService: string;
  onlineBooking: string;
  minRating: string;
  certification: string;
  language: string;
  paymentOption: string;
}

interface FilterOptions {
  serviceTypes: Array<{value: string, label: string, count: number}>;
  priceTypes: Array<{value: string, label: string, count: number}>;
  locations: Array<{value: string, label: string, count: number}>;
  certifications: Array<{value: string, label: string, count: number}>;
  languages: Array<{value: string, label: string, count: number}>;
  paymentOptions: Array<{value: string, label: string, count: number}>;
}

const ServiceSearchPage: React.FC = () => {
  // Real location and navigation hooks
  const location = useLocation();
  const navigate = useNavigate();
  
  // State management
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    q: '',
    serviceType: 'all',
    priceType: 'all',
    minPrice: '',
    maxPrice: '',
    location: 'all',
    homeService: 'all',
    pickupDropoff: 'all',
    emergencyService: 'all',
    onlineBooking: 'all',
    minRating: 'all',
    certification: 'all',
    language: 'all',
    paymentOption: 'all'
  });
  
  // Filter options from API
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    serviceTypes: [],
    priceTypes: [],
    locations: [],
    certifications: [],
    languages: [],
    paymentOptions: []
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
      serviceType: urlParams.get('serviceType') || 'all',
      priceType: urlParams.get('priceType') || 'all',
      minPrice: urlParams.get('minPrice') || '',
      maxPrice: urlParams.get('maxPrice') || '',
      location: urlParams.get('location') || 'all',
      homeService: urlParams.get('homeService') || 'all',
      pickupDropoff: urlParams.get('pickupDropoff') || 'all',
      emergencyService: urlParams.get('emergencyService') || 'all',
      onlineBooking: urlParams.get('onlineBooking') || 'all',
      minRating: urlParams.get('minRating') || 'all',
      certification: urlParams.get('certification') || 'all',
      language: urlParams.get('language') || 'all',
      paymentOption: urlParams.get('paymentOption') || 'all'
    };
    
    setFilters(newFilters);
    setSearchQuery(newFilters.q);
    setCurrentPage(parseInt(urlParams.get('page') || '1'));
    setSortBy(urlParams.get('sort') || 'relevance');
    
    // Load initial data and filter options
    loadFilterOptions();
    
    // If there's a search query from URL, perform search immediately
    if (newFilters.q) {
      console.log('🔍 Loading services with search query:', newFilters.q);
      performSearch(newFilters, 1, urlParams.get('sort') || 'relevance');
    } else {
      loadMockData();
    }
  }, [location.search]); // React to URL changes
  
  // API service for service search (with mock data for demo)
  const serviceAPI = {
    async searchServices(searchFilters: SearchFilters, page: number, sort: string) {
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
        
        // In real app: const response = await fetch(`/api/services?${queryParams}`);
        console.log('Searching services with params:', queryParams.toString());
        
        // Return mock data for demo
        return {
          success: true,
          data: getMockServices(searchFilters),
          pagination: {
            totalPages: 3,
            totalItems: 32,
            currentPage: page,
            itemsPerPage: 10
          },
          filterOptions: getMockFilterOptions()
        };
      } catch (error) {
        console.error('Service search error:', error);
        throw error;
      }
    },
    
    async getFilterOptions() {
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        console.log('Loading service filter options');
        
        return {
          success: true,
          data: getMockFilterOptions()
        };
      } catch (error) {
        console.error('Filter options error:', error);
        throw error;
      }
    }
  };
  
  // Mock data functions
  const getMockServices = (filters: SearchFilters): Service[] => {
    const mockServices: Service[] = [
      {
        id: '1',
        title: 'Complete Vehicle Service & Maintenance',
        description: 'Full service including oil change, brake check, and diagnostic scan',
        service_type: 'maintenance',
        price: 4500,
        price_type: 'fixed',
        duration: '2-3 hours',
        location: 'Colombo',
        service_areas: ['Colombo', 'Dehiwala', 'Mount Lavinia'],
        warranty_period: '6 months',
        features: ['Full diagnostic scan', 'Oil and filter change', 'Brake inspection'],
        requirements: ['Vehicle registration', 'Service history'],
        images: ['https://images.unsplash.com/photo-1486754735734-325b5831c3ad/'],
        availability: { weekdays: '8AM-6PM', weekends: '9AM-4PM' },
        home_service: true,
        pickup_dropoff: true,
        emergency_service: false,
        online_booking: true,
        equipment_type: 'Professional Tools',
        certifications: ['ASE Certified', 'ISO 9001'],
        languages: ['English', 'Sinhala', 'Tamil'],
        payment_options: ['Cash', 'Card', 'Bank Transfer'],
        is_featured: true,
        views: 1450,
        average_rating: 4.8,
        total_reviews: 127,
        created_at: '2024-01-15'
      },
      {
        id: '2',
        title: 'Engine Diagnostic & Repair',
        description: 'Professional engine diagnostics and repair services',
        service_type: 'repair',
        price: 0,
        price_type: 'quote',
        duration: 'Varies',
        location: 'Kandy',
        service_areas: ['Kandy', 'Peradeniya', 'Matale'],
        warranty_period: '1 year',
        features: ['Computer diagnostics', 'Engine repair', 'Performance tuning'],
        requirements: ['Detailed problem description'],
        images: ['https://images.unsplash.com/photo-1558618866-a4b5a8d9c55e/'],
        availability: { weekdays: '7AM-7PM', weekends: 'Emergency only' },
        home_service: false,
        pickup_dropoff: true,
        emergency_service: true,
        online_booking: false,
        equipment_type: 'Advanced Diagnostics',
        certifications: ['ASE Certified', 'Engine Specialist'],
        languages: ['English', 'Sinhala'],
        payment_options: ['Cash', 'Card'],
        is_featured: false,
        views: 890,
        average_rating: 4.9,
        total_reviews: 89,
        created_at: '2024-01-10'
      },
      {
        id: '3',
        title: 'Mobile Tire Change Service',
        description: '24/7 emergency tire change and repair service at your location',
        service_type: 'emergency',
        price: 1800,
        price_type: 'fixed',
        duration: '30-45 minutes',
        location: 'Galle',
        service_areas: ['Galle', 'Matara', 'Hikkaduwa'],
        warranty_period: '3 months',
        features: ['Tire change', 'Puncture repair', 'Emergency assistance'],
        requirements: ['Location access', 'Spare tire available'],
        images: ['https://images.unsplash.com/photo-1572635196243-4dd75fbdbd7b/'],
        availability: { allTime: '24/7' },
        home_service: true,
        pickup_dropoff: false,
        emergency_service: true,
        online_booking: true,
        equipment_type: 'Mobile Unit',
        certifications: ['Roadside Assistance Certified'],
        languages: ['English', 'Sinhala'],
        payment_options: ['Cash', 'Mobile Payment'],
        is_featured: true,
        views: 2100,
        average_rating: 4.7,
        total_reviews: 203,
        created_at: '2024-01-08'
      },
      {
        id: '4',
        title: 'Air Conditioning Service & Repair',
        description: 'Complete AC system service, gas refill and repair for all vehicle types',
        service_type: 'repair',
        price: 3200,
        price_type: 'fixed',
        duration: '1-2 hours',
        location: 'Negombo',
        service_areas: ['Negombo', 'Katunayake', 'Ja-Ela'],
        warranty_period: '6 months',
        features: ['AC gas refill', 'Compressor repair', 'Filter replacement'],
        requirements: ['Vehicle access'],
        images: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e/'],
        availability: { weekdays: '8AM-5PM', weekends: 'By appointment' },
        home_service: false,
        pickup_dropoff: true,
        emergency_service: false,
        online_booking: true,
        equipment_type: 'AC Service Tools',
        certifications: ['AC Specialist', 'Refrigerant Certified'],
        languages: ['English', 'Sinhala'],
        payment_options: ['Cash', 'Card'],
        is_featured: false,
        views: 750,
        average_rating: 4.6,
        total_reviews: 156,
        created_at: '2024-01-05'
      }
    ];
    
    // Apply basic filtering for demo
    return mockServices.filter(service => {
      if (filters.q && !service.title.toLowerCase().includes(filters.q.toLowerCase())) return false;
      if (filters.serviceType && filters.serviceType !== 'all' && service.service_type !== filters.serviceType) return false;
      if (filters.priceType && filters.priceType !== 'all' && service.price_type !== filters.priceType) return false;
      if (filters.minPrice && service.price > 0 && service.price < parseInt(filters.minPrice)) return false;
      if (filters.maxPrice && service.price > 0 && service.price > parseInt(filters.maxPrice)) return false;
      if (filters.location && filters.location !== 'all' && !service.service_areas.some(area => area.toLowerCase().includes(filters.location.toLowerCase()))) return false;
      if (filters.homeService === 'true' && !service.home_service) return false;
      if (filters.pickupDropoff === 'true' && !service.pickup_dropoff) return false;
      if (filters.emergencyService === 'true' && !service.emergency_service) return false;
      if (filters.onlineBooking === 'true' && !service.online_booking) return false;
      if (filters.minRating && filters.minRating !== 'all' && service.average_rating < parseFloat(filters.minRating)) return false;
      return true;
    });
  };
  
  const getMockFilterOptions = (): FilterOptions => {
    return {
      serviceTypes: [
        { value: 'maintenance', label: 'General Maintenance', count: 45 },
        { value: 'repair', label: 'Repair Work', count: 38 },
        { value: 'bodywork', label: 'Body Work & Paint', count: 25 },
        { value: 'electrical', label: 'Electrical Work', count: 22 },
        { value: 'ac-service', label: 'AC Service', count: 18 },
        { value: 'towing', label: 'Towing Service', count: 15 },
        { value: 'inspection', label: 'Vehicle Inspection', count: 12 },
        { value: 'emergency', label: 'Emergency Service', count: 28 }
      ],
      priceTypes: [
        { value: 'fixed', label: 'Fixed Price', count: 95 },
        { value: 'hourly', label: 'Hourly Rate', count: 42 },
        { value: 'quote', label: 'Quote Required', count: 18 }
      ],
      locations: [
        { value: 'colombo', label: 'Colombo', count: 85 },
        { value: 'kandy', label: 'Kandy', count: 32 },
        { value: 'galle', label: 'Galle', count: 28 },
        { value: 'negombo', label: 'Negombo', count: 22 }
      ],
      certifications: [
        { value: 'ase-certified', label: 'ASE Certified', count: 67 },
        { value: 'iso-9001', label: 'ISO 9001', count: 45 },
        { value: 'specialist', label: 'Specialist Certified', count: 38 }
      ],
      languages: [
        { value: 'english', label: 'English', count: 142 },
        { value: 'sinhala', label: 'Sinhala', count: 127 },
        { value: 'tamil', label: 'Tamil', count: 89 }
      ],
      paymentOptions: [
        { value: 'cash', label: 'Cash', count: 155 },
        { value: 'card', label: 'Credit/Debit Card', count: 89 },
        { value: 'bank-transfer', label: 'Bank Transfer', count: 45 },
        { value: 'mobile-payment', label: 'Mobile Payment', count: 67 }
      ]
    };
  };
  
  // Load mock data
  const loadMockData = async () => {
    setLoading(true);
    try {
      const mockData = getMockServices(filters);
      setServices(mockData);
      setTotalResults(mockData.length);
      setTotalPages(Math.ceil(mockData.length / 10));
    } catch (error) {
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };
  
  // Perform search function
  const performSearch = async (searchFilters: SearchFilters, page: number = 1, sort: string = 'relevance') => {
    try {
      setLoading(true);
      setError('');
      
      const response = await serviceAPI.searchServices(searchFilters, page, sort);
      
      if (response.success) {
        setServices(response.data || []);
        setTotalPages(response.pagination?.totalPages || 1);
        setTotalResults(response.pagination?.totalItems || 0);
        
        // Update filter options if provided
        if (response.filterOptions) {
          setFilterOptions(response.filterOptions);
        }
      } else {
        throw new Error('Failed to search services');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
      setServices([]);
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
    
    const newURL = `/services${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    window.history.pushState({}, '', newURL);
  };
  
  // Handle filter changes
  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setCurrentPage(1);
    
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
      serviceType: 'all',
      priceType: 'all',
      minPrice: '',
      maxPrice: '',
      location: 'all',
      homeService: 'all',
      pickupDropoff: 'all',
      emergencyService: 'all',
      onlineBooking: 'all',
      minRating: 'all',
      certification: 'all',
      language: 'all',
      paymentOption: 'all'
    };
    
    setFilters(clearedFilters);
    setSearchQuery('');
    setCurrentPage(1);
    updateURL(clearedFilters, 1, 'relevance');
    performSearch(clearedFilters, 1, 'relevance');
  };
  
  // Load filter options
  const loadFilterOptions = async () => {
    try {
      const response = await serviceAPI.getFilterOptions();
      if (response.success) {
        setFilterOptions(response.data);
      }
    } catch (error) {
      console.error('Failed to load filter options:', error);
    }
  };
  
  // Format price for display
  const formatPrice = (price: number, priceType: string) => {
    if (priceType === 'quote') return 'Quote Required';
    const formatted = `Rs ${price.toLocaleString()}`;
    if (priceType === 'hourly') return `${formatted}/hr`;
    return formatted;
  };
  
  // Get active filter count
  const getActiveFilterCount = () => {
    return Object.values(filters).filter(value => value && value.trim() !== '' && value !== 'all').length;
  };
  
  // Service card component
  const ServiceCard = ({ service }: { service: Service }) => (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
      <div className="relative">
        {service.images && service.images.length > 0 ? (
          <img
            src={service.images[0]}
            alt={service.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        ) : (
          <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
            <Wrench className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        
        <div className="absolute top-2 left-2 flex gap-1">
          {service.is_featured && (
            <Badge className="bg-yellow-500 hover:bg-yellow-600">Featured</Badge>
          )}
          <Badge variant="outline" className="capitalize">{service.service_type}</Badge>
        </div>
        
        <div className="absolute top-2 right-2 flex gap-1">
          <FavoriteButton itemId={service.id} />
          <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary">
          {service.title}
        </h3>
        
        <div className="text-2xl font-bold text-primary mb-2">
          {formatPrice(service.price, service.price_type)}
        </div>
        
        {service.duration && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
            <Clock className="h-3 w-3" />
            {service.duration}
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {service.location}
          </div>
          {service.warranty_period && (
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              {service.warranty_period}
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {service.home_service && (
            <Badge variant="outline" className="text-xs">
              <Home className="h-3 w-3 mr-1" />
              Home Service
            </Badge>
          )}
          {service.pickup_dropoff && (
            <Badge variant="outline" className="text-xs">
              <Truck className="h-3 w-3 mr-1" />
              Pickup/Drop
            </Badge>
          )}
          {service.emergency_service && (
            <Badge variant="outline" className="text-xs text-red-600">
              24/7 Emergency
            </Badge>
          )}
          {service.online_booking && (
            <Badge variant="outline" className="text-xs text-green-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              Online Booking
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {service.average_rating} ({service.total_reviews})
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Eye className="h-3 w-3" />
              {service.views} views
            </div>
          </div>
          
          <div className="flex gap-1">
            {service.online_booking ? (
              <Button size="sm">Book Now</Button>
            ) : service.price_type === 'quote' ? (
              <Button size="sm" variant="outline">Get Quote</Button>
            ) : (
              <Button size="sm" variant="outline">
                <Phone className="h-3 w-3 mr-1" />
                Contact
              </Button>
            )}
          </div>
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
      
      {/* Service Type Filter */}
      <div className="space-y-2">
        <Label>Service Type</Label>
        <Select value={filters.serviceType} onValueChange={(value) => handleFilterChange('serviceType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="All service types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All service types</SelectItem>
            {filterOptions.serviceTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label} ({type.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Price Type Filter */}
      <div className="space-y-2">
        <Label>Price Type</Label>
        <Select value={filters.priceType} onValueChange={(value) => handleFilterChange('priceType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any price type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any price type</SelectItem>
            {filterOptions.priceTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label} ({type.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Price Range */}
      <div className="space-y-2">
        <Label>Price Range</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Input
              type="number"
              placeholder="Min price"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Max price"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Location */}
      <div className="space-y-2">
        <Label>Service Area</Label>
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
      
      {/* Service Features */}
      <div className="space-y-2">
        <Label>Service Features</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="homeService"
              checked={filters.homeService === 'true'}
              onCheckedChange={(checked) => handleFilterChange('homeService', checked ? 'true' : 'all')}
            />
            <Label htmlFor="homeService" className="text-sm">Home Service</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="pickupDropoff"
              checked={filters.pickupDropoff === 'true'}
              onCheckedChange={(checked) => handleFilterChange('pickupDropoff', checked ? 'true' : 'all')}
            />
            <Label htmlFor="pickupDropoff" className="text-sm">Pickup & Dropoff</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="emergencyService"
              checked={filters.emergencyService === 'true'}
              onCheckedChange={(checked) => handleFilterChange('emergencyService', checked ? 'true' : 'all')}
            />
            <Label htmlFor="emergencyService" className="text-sm">Emergency Service</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="onlineBooking"
              checked={filters.onlineBooking === 'true'}
              onCheckedChange={(checked) => handleFilterChange('onlineBooking', checked ? 'true' : 'all')}
            />
            <Label htmlFor="onlineBooking" className="text-sm">Online Booking</Label>
          </div>
        </div>
      </div>
      
      {/* Certifications */}
      <div className="space-y-2">
        <Label>Certifications</Label>
        <Select value={filters.certification} onValueChange={(value) => handleFilterChange('certification', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any certification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any certification</SelectItem>
            {filterOptions.certifications.map((cert) => (
              <SelectItem key={cert.value} value={cert.value}>
                {cert.label} ({cert.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Languages */}
      <div className="space-y-2">
        <Label>Languages</Label>
        <Select value={filters.language} onValueChange={(value) => handleFilterChange('language', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any language</SelectItem>
            {filterOptions.languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label} ({lang.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Payment Options */}
      <div className="space-y-2">
        <Label>Payment Options</Label>
        <Select value={filters.paymentOption} onValueChange={(value) => handleFilterChange('paymentOption', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any payment method</SelectItem>
            {filterOptions.paymentOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label} ({option.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
              <h1 className="text-2xl font-bold">Auto Services</h1>
              <p className="text-muted-foreground">
                {loading ? 'Searching...' : `${totalResults.toLocaleString()} services available`}
              </p>
            </div>
            
            {/* Search Form */}
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search services, repairs, maintenance..."
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
                    <SheetTitle>Filter Services</SheetTitle>
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
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating_desc">Highest Rated</SelectItem>
                  <SelectItem value="views_desc">Most Popular</SelectItem>
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
                <span>Searching services...</span>
              </div>
            ) : services.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Wrench className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No services found</h3>
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
                  {services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
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

export default ServiceSearchPage;