// src/pages/VehicleSearchPage.tsx
// Complete vehicle search implementation following Car Mart design system

import React, { useState, useEffect } from 'react';
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
  X
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
interface Vehicle {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  body_type: string;
  location: string;
  images: string[];
  seller_type: 'dealer' | 'private';
  features: string[];
  created_at: string;
  views: number;
}

interface SearchFilters {
  q: string;
  make: string;
  model: string;
  minYear: string;
  maxYear: string;
  minPrice: string;
  maxPrice: string;
  minMileage: string;
  maxMileage: string;
  fuelType: string;
  transmission: string;
  bodyType: string;
  location: string;
  sellerType: string;
}

interface FilterOptions {
  makes: Array<{value: string, label: string, count: number}>;
  models: Array<{value: string, label: string, count: number}>;
  fuelTypes: Array<{value: string, label: string, count: number}>;
  transmissions: Array<{value: string, label: string, count: number}>;
  bodyTypes: Array<{value: string, label: string, count: number}>;
  locations: Array<{value: string, label: string, count: number}>;
}

const VehicleSearchPage: React.FC = () => {
  // Mock location and navigation for demo
  const mockLocation = { search: '' };
  const navigate = (path: string) => console.log('Navigate to:', path);
  
  // State management
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    q: '',
    make: '',
    model: '',
    minYear: '',
    maxYear: '',
    minPrice: '',
    maxPrice: '',
    minMileage: '',
    maxMileage: '',
    fuelType: '',
    transmission: '',
    bodyType: '',
    location: '',
    sellerType: ''
  });
  
  // Filter options from API
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    makes: [],
    models: [],
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
    // Mock URL parameters for demo - in real app, use useLocation from react-router-dom
    const urlParams = new URLSearchParams(mockLocation.search);
    
    const newFilters: SearchFilters = {
      q: urlParams.get('q') || '',
      make: urlParams.get('make') || '',
      model: urlParams.get('model') || '',
      minYear: urlParams.get('minYear') || '',
      maxYear: urlParams.get('maxYear') || '',
      minPrice: urlParams.get('minPrice') || '',
      maxPrice: urlParams.get('maxPrice') || '',
      minMileage: urlParams.get('minMileage') || '',
      maxMileage: urlParams.get('maxMileage') || '',
      fuelType: urlParams.get('fuelType') || '',
      transmission: urlParams.get('transmission') || '',
      bodyType: urlParams.get('bodyType') || '',
      location: urlParams.get('location') || '',
      sellerType: urlParams.get('sellerType') || ''
    };
    
    setFilters(newFilters);
    setSearchQuery(newFilters.q);
    setCurrentPage(parseInt(urlParams.get('page') || '1'));
    setSortBy(urlParams.get('sort') || 'relevance');
    
    // Load initial data and filter options
    loadFilterOptions();
    loadMockData();
  }, []);
  
  // API service for vehicle search (with mock data for demo)
  const vehicleAPI = {
    async searchVehicles(searchFilters: SearchFilters, page: number, sort: string) {
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
        
        // In real app: const response = await fetch(`/api/vehicles?${queryParams}`);
        console.log('Searching vehicles with params:', queryParams.toString());
        
        // Return mock data for demo
        return {
          success: true,
          data: getMockVehicles(searchFilters),
          pagination: {
            totalPages: 3,
            totalItems: 25,
            currentPage: page,
            itemsPerPage: 10
          },
          filterOptions: getMockFilterOptions()
        };
      } catch (error) {
        console.error('Vehicle search error:', error);
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
  const getMockVehicles = (filters: SearchFilters): Vehicle[] => {
    const mockVehicles: Vehicle[] = [
      {
        id: '1',
        title: '2020 Toyota Corolla XLI',
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        price: 3200000,
        mileage: 15000,
        fuel_type: 'Petrol',
        transmission: 'Manual',
        body_type: 'Sedan',
        location: 'Colombo',
        images: ['https://images.unsplash.com/photo-1549399992-11205259266/'],
        seller_type: 'dealer',
        features: ['Air Conditioning', 'Power Steering', 'Central Locking'],
        created_at: '2024-01-15',
        views: 1250
      },
      {
        id: '2',
        title: '2019 Honda Civic RS Turbo',
        make: 'Honda',
        model: 'Civic',
        year: 2019,
        price: 4800000,
        mileage: 25000,
        fuel_type: 'Petrol',
        transmission: 'Auto',
        body_type: 'Sedan',
        location: 'Kandy',
        images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d/'],
        seller_type: 'private',
        features: ['Turbo Engine', 'Leather Seats', 'Navigation'],
        created_at: '2024-01-10',
        views: 890
      },
      {
        id: '3',
        title: '2021 Nissan Kicks SUV',
        make: 'Nissan',
        model: 'Kicks',
        year: 2021,
        price: 5200000,
        mileage: 8000,
        fuel_type: 'Petrol',
        transmission: 'CVT',
        body_type: 'SUV',
        location: 'Galle',
        images: ['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7/'],
        seller_type: 'dealer',
        features: ['4WD', 'Backup Camera', 'Bluetooth'],
        created_at: '2024-01-08',
        views: 2100
      }
    ];
    
    // Apply basic filtering for demo
    return mockVehicles.filter(vehicle => {
      if (filters.q && !vehicle.title.toLowerCase().includes(filters.q.toLowerCase())) return false;
      if (filters.make && vehicle.make.toLowerCase() !== filters.make.toLowerCase()) return false;
      if (filters.model && vehicle.model.toLowerCase() !== filters.model.toLowerCase()) return false;
      if (filters.minPrice && vehicle.price < parseInt(filters.minPrice)) return false;
      if (filters.maxPrice && vehicle.price > parseInt(filters.maxPrice)) return false;
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
      fuelTypes: [
        { value: 'petrol', label: 'Petrol', count: 85 },
        { value: 'diesel', label: 'Diesel', count: 35 },
        { value: 'hybrid', label: 'Hybrid', count: 12 },
        { value: 'electric', label: 'Electric', count: 3 }
      ],
      transmissions: [
        { value: 'manual', label: 'Manual', count: 78 },
        { value: 'auto', label: 'Automatic', count: 52 },
        { value: 'cvt', label: 'CVT', count: 15 }
      ],
      bodyTypes: [
        { value: 'sedan', label: 'Sedan', count: 65 },
        { value: 'suv', label: 'SUV', count: 38 },
        { value: 'hatchback', label: 'Hatchback', count: 42 }
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
      const mockData = getMockVehicles(filters);
      setVehicles(mockData);
      setTotalResults(mockData.length);
      setTotalPages(Math.ceil(mockData.length / 10));
    } catch (error) {
      setError('Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };
  
  // Perform search function
  const performSearch = async (searchFilters: SearchFilters, page: number = 1, sort: string = 'relevance') => {
    try {
      setLoading(true);
      setError('');
      
      const response = await vehicleAPI.searchVehicles(searchFilters, page, sort);
      
      if (response.success) {
        setVehicles(response.data || []);
        setTotalPages(response.pagination?.totalPages || 1);
        setTotalResults(response.pagination?.totalItems || 0);
        
        // Update filter options if provided
        if (response.filterOptions) {
          setFilterOptions(response.filterOptions);
        }
      } else {
        throw new Error('Failed to search vehicles');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
      setVehicles([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };
  
  // Update URL with current search parameters
  const updateURL = (newFilters: SearchFilters, page: number, sort: string) => {
    const queryParams = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value.trim() !== '') {
        queryParams.append(key, value);
      }
    });
    
    if (page > 1) queryParams.append('page', page.toString());
    if (sort !== 'relevance') queryParams.append('sort', sort);
    
    const newURL = `/vehicles${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    window.history.pushState({}, '', newURL);
  };
  
  // Handle filter changes
  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setCurrentPage(1);
    
    // If make changes, clear model and fetch new models
    if (key === 'make') {
      newFilters.model = '';
      loadFilterOptions(value);
    }
    
    updateURL(newFilters, 1, sortBy);
    performSearch(newFilters, 1, sortBy);
  };
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newFilters = { ...filters, q: searchQuery };
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
      make: '',
      model: '',
      minYear: '',
      maxYear: '',
      minPrice: '',
      maxPrice: '',
      minMileage: '',
      maxMileage: '',
      fuelType: '',
      transmission: '',
      bodyType: '',
      location: '',
      sellerType: ''
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
      const response = await vehicleAPI.getFilterOptions(make);
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
  
  // Format mileage for display
  const formatMileage = (mileage: number) => {
    return `${mileage.toLocaleString()} km`;
  };
  
  // Get active filter count
  const getActiveFilterCount = () => {
    return Object.values(filters).filter(value => value && value.trim() !== '').length;
  };
  
  // Vehicle card component
  const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
      <div className="relative">
        {vehicle.images && vehicle.images.length > 0 ? (
          <img
            src={vehicle.images[0]}
            alt={vehicle.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        ) : (
          <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
            <Car className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        
        <div className="absolute top-2 left-2">
          <Badge variant={vehicle.seller_type === 'dealer' ? 'default' : 'secondary'}>
            {vehicle.seller_type === 'dealer' ? 'Dealer' : 'Private'}
          </Badge>
        </div>
        
        <div className="absolute top-2 right-2 flex gap-1">
          <FavoriteButton itemId={vehicle.id} />
          <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary">
          {vehicle.title}
        </h3>
        
        <div className="text-2xl font-bold text-primary mb-3">
          {formatPrice(vehicle.price)}
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {vehicle.year}
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="h-3 w-3" />
            {formatMileage(vehicle.mileage)}
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="h-3 w-3" />
            {vehicle.fuel_type}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {vehicle.location}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="h-3 w-3" />
            {vehicle.views || 0} views
          </div>
          
          <Button size="sm">View Details</Button>
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
            <SelectItem value="">All makes</SelectItem>
            {filterOptions.makes.map((make) => (
              <SelectItem key={make.value} value={make.value}>
                {make.label} ({make.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Model Filter */}
      {filters.make && (
        <div className="space-y-2">
          <Label>Model</Label>
          <Select value={filters.model} onValueChange={(value) => handleFilterChange('model', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All models</SelectItem>
              {filterOptions.models.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.label} ({model.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
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
      
      {/* Year Range */}
      <div className="space-y-2">
        <Label>Year Range</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Input
              type="number"
              placeholder="Min year"
              value={filters.minYear}
              onChange={(e) => handleFilterChange('minYear', e.target.value)}
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Max year"
              value={filters.maxYear}
              onChange={(e) => handleFilterChange('maxYear', e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Fuel Type */}
      <div className="space-y-2">
        <Label>Fuel Type</Label>
        <Select value={filters.fuelType} onValueChange={(value) => handleFilterChange('fuelType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any fuel type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any fuel type</SelectItem>
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
            <SelectItem value="">Any transmission</SelectItem>
            {filterOptions.transmissions.map((trans) => (
              <SelectItem key={trans.value} value={trans.value}>
                {trans.label} ({trans.count})
              </SelectItem>
            ))}
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
            <SelectItem value="">Any location</SelectItem>
            {filterOptions.locations.map((loc) => (
              <SelectItem key={loc.value} value={loc.value}>
                {loc.label} ({loc.count})
              </SelectItem>
            ))}
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
              <h1 className="text-2xl font-bold">Search Vehicles</h1>
              <p className="text-muted-foreground">
                {loading ? 'Searching...' : `${totalResults.toLocaleString()} vehicles found`}
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
                    <SheetTitle>Filter Vehicles</SheetTitle>
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
                  <SelectItem value="year_desc">Newest First</SelectItem>
                  <SelectItem value="year_asc">Oldest First</SelectItem>
                  <SelectItem value="mileage_asc">Lowest Mileage</SelectItem>
                  <SelectItem value="mileage_desc">Highest Mileage</SelectItem>
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
                <span>Searching vehicles...</span>
              </div>
            ) : vehicles.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No vehicles found</h3>
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
                  {vehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
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

export default VehicleSearchPage;