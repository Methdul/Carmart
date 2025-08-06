// src/pages/PartSearchPage.tsx
// Complete parts search implementation following Car Mart design system

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  SortAsc,
  MapPin,
  Calendar,
  Package,
  Settings,
  Heart,
  Share2,
  Eye,
  Loader2,
  AlertCircle,
  RotateCcw,
  ChevronDown,
  X,
  Shield,
  Star
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
interface Part {
  id: string;
  title: string;
  category: string;
  make: string;
  model: string;
  year: number;
  price: number;
  condition: 'new' | 'used' | 'refurbished';
  part_number?: string;
  brand: string;
  location: string;
  images: string[];
  seller_type: 'dealer' | 'private' | 'manufacturer';
  compatibility: string[];
  warranty: string;
  created_at: string;
  views: number;
}

interface SearchFilters {
  q: string;
  category: string;
  make: string;
  model: string;
  minYear: string;
  maxYear: string;
  minPrice: string;
  maxPrice: string;
  condition: string;
  brand: string;
  partNumber: string;
  location: string;
  sellerType: string;
  warranty: string;
}

interface FilterOptions {
  categories: Array<{value: string, label: string, count: number}>;
  makes: Array<{value: string, label: string, count: number}>;
  models: Array<{value: string, label: string, count: number}>;
  conditions: Array<{value: string, label: string, count: number}>;
  brands: Array<{value: string, label: string, count: number}>;
  locations: Array<{value: string, label: string, count: number}>;
}

const PartSearchPage: React.FC = () => {
  // Mock location and navigation for demo
  const mockLocation = { search: '' };
  const navigate = (path: string) => console.log('Navigate to:', path);
  
  // State management
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    q: '',
    category: '',
    make: '',
    model: '',
    minYear: '',
    maxYear: '',
    minPrice: '',
    maxPrice: '',
    condition: '',
    brand: '',
    partNumber: '',
    location: '',
    sellerType: '',
    warranty: ''
  });
  
  // Filter options from API
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: [],
    makes: [],
    models: [],
    conditions: [],
    brands: [],
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
      category: urlParams.get('category') || '',
      make: urlParams.get('make') || '',
      model: urlParams.get('model') || '',
      minYear: urlParams.get('minYear') || '',
      maxYear: urlParams.get('maxYear') || '',
      minPrice: urlParams.get('minPrice') || '',
      maxPrice: urlParams.get('maxPrice') || '',
      condition: urlParams.get('condition') || '',
      brand: urlParams.get('brand') || '',
      partNumber: urlParams.get('partNumber') || '',
      location: urlParams.get('location') || '',
      sellerType: urlParams.get('sellerType') || '',
      warranty: urlParams.get('warranty') || ''
    };
    
    setFilters(newFilters);
    setSearchQuery(newFilters.q);
    setCurrentPage(parseInt(urlParams.get('page') || '1'));
    setSortBy(urlParams.get('sort') || 'relevance');
    
    // Load initial data and filter options
    loadFilterOptions();
    loadMockData();
  }, []);
  
  // API service for parts search (with mock data for demo)
  const partAPI = {
    async searchParts(searchFilters: SearchFilters, page: number, sort: string) {
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
        
        // In real app: const response = await fetch(`/api/parts?${queryParams}`);
        console.log('Searching parts with params:', queryParams.toString());
        
        // Return mock data for demo
        return {
          success: true,
          data: getMockParts(searchFilters),
          pagination: {
            totalPages: 3,
            totalItems: 25,
            currentPage: page,
            itemsPerPage: 10
          },
          filterOptions: getMockFilterOptions()
        };
      } catch (error) {
        console.error('Parts search error:', error);
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
  const getMockParts = (filters: SearchFilters): Part[] => {
    const mockParts: Part[] = [
      {
        id: '1',
        title: 'Toyota Corolla Brake Pads - Front Set',
        category: 'Brakes',
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        price: 12000,
        condition: 'new',
        part_number: 'BP-TC-2020-F',
        brand: 'Genuine Toyota',
        location: 'Colombo',
        images: ['https://images.unsplash.com/photo-1558618866-a4b5a8d9c55e/'],
        seller_type: 'dealer',
        compatibility: ['Corolla 2018-2022', 'Yaris 2019-2022'],
        warranty: '6 months',
        created_at: '2024-01-15',
        views: 450
      },
      {
        id: '2',
        title: 'Honda Civic Engine Oil Filter',
        category: 'Engine',
        make: 'Honda',
        model: 'Civic',
        year: 2019,
        price: 2500,
        condition: 'new',
        part_number: 'OF-HC-2019',
        brand: 'Honda Genuine',
        location: 'Kandy',
        images: ['https://images.unsplash.com/photo-1486262715619-67b85e0b08d3/'],
        seller_type: 'manufacturer',
        compatibility: ['Civic 2016-2021', 'Accord 2018-2022'],
        warranty: '1 year',
        created_at: '2024-01-10',
        views: 320
      },
      {
        id: '3',
        title: 'Nissan Kicks Headlight Assembly - Left',
        category: 'Lighting',
        make: 'Nissan',
        model: 'Kicks',
        year: 2021,
        price: 35000,
        condition: 'used',
        part_number: 'HL-NK-2021-L',
        brand: 'OEM',
        location: 'Galle',
        images: ['https://images.unsplash.com/photo-1572635196243-4dd75fbdbd7b/'],
        seller_type: 'private',
        compatibility: ['Kicks 2020-2023'],
        warranty: '3 months',
        created_at: '2024-01-08',
        views: 180
      }
    ];
    
    // Apply basic filtering for demo
    return mockParts.filter(part => {
      if (filters.q && !part.title.toLowerCase().includes(filters.q.toLowerCase())) return false;
      if (filters.category && part.category.toLowerCase() !== filters.category.toLowerCase()) return false;
      if (filters.make && part.make.toLowerCase() !== filters.make.toLowerCase()) return false;
      if (filters.model && part.model.toLowerCase() !== filters.model.toLowerCase()) return false;
      if (filters.minPrice && part.price < parseInt(filters.minPrice)) return false;
      if (filters.maxPrice && part.price > parseInt(filters.maxPrice)) return false;
      if (filters.condition && part.condition !== filters.condition) return false;
      return true;
    });
  };
  
  const getMockFilterOptions = (selectedMake?: string): FilterOptions => {
    return {
      categories: [
        { value: 'engine', label: 'Engine Parts', count: 125 },
        { value: 'brakes', label: 'Brake Parts', count: 89 },
        { value: 'suspension', label: 'Suspension', count: 67 },
        { value: 'electrical', label: 'Electrical', count: 54 },
        { value: 'lighting', label: 'Lighting', count: 43 },
        { value: 'body', label: 'Body Parts', count: 78 }
      ],
      makes: [
        { value: 'toyota', label: 'Toyota', count: 145 },
        { value: 'honda', label: 'Honda', count: 112 },
        { value: 'nissan', label: 'Nissan', count: 98 },
        { value: 'suzuki', label: 'Suzuki', count: 85 }
      ],
      models: selectedMake === 'toyota' ? [
        { value: 'corolla', label: 'Corolla', count: 45 },
        { value: 'camry', label: 'Camry', count: 32 },
        { value: 'prius', label: 'Prius', count: 28 }
      ] : selectedMake === 'honda' ? [
        { value: 'civic', label: 'Civic', count: 38 },
        { value: 'accord', label: 'Accord', count: 29 },
        { value: 'crv', label: 'CR-V', count: 24 }
      ] : [],
      conditions: [
        { value: 'new', label: 'New', count: 245 },
        { value: 'used', label: 'Used', count: 156 },
        { value: 'refurbished', label: 'Refurbished', count: 78 }
      ],
      brands: [
        { value: 'genuine', label: 'Genuine OEM', count: 198 },
        { value: 'aftermarket', label: 'Aftermarket', count: 156 },
        { value: 'performance', label: 'Performance', count: 89 }
      ],
      locations: [
        { value: 'colombo', label: 'Colombo', count: 185 },
        { value: 'kandy', label: 'Kandy', count: 67 },
        { value: 'galle', label: 'Galle', count: 45 }
      ]
    };
  };
  
  // Load mock data
  const loadMockData = async () => {
    setLoading(true);
    try {
      const mockData = getMockParts(filters);
      setParts(mockData);
      setTotalResults(mockData.length);
      setTotalPages(Math.ceil(mockData.length / 10));
    } catch (error) {
      setError('Failed to load parts');
    } finally {
      setLoading(false);
    }
  };
  
  // Perform search function
  const performSearch = async (searchFilters: SearchFilters, page: number = 1, sort: string = 'relevance') => {
    try {
      setLoading(true);
      setError('');
      
      const response = await partAPI.searchParts(searchFilters, page, sort);
      
      if (response.success) {
        setParts(response.data || []);
        setTotalPages(response.pagination?.totalPages || 1);
        setTotalResults(response.pagination?.totalItems || 0);
        
        // Update filter options if provided
        if (response.filterOptions) {
          setFilterOptions(response.filterOptions);
        }
      } else {
        throw new Error('Failed to search parts');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
      setParts([]);
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
    
    const newURL = `/parts${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
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
      category: '',
      make: '',
      model: '',
      minYear: '',
      maxYear: '',
      minPrice: '',
      maxPrice: '',
      condition: '',
      brand: '',
      partNumber: '',
      location: '',
      sellerType: '',
      warranty: ''
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
      const response = await partAPI.getFilterOptions(make);
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
    return Object.values(filters).filter(value => value && value.trim() !== '').length;
  };
  
  // Part card component
  const PartCard = ({ part }: { part: Part }) => (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
      <div className="relative">
        {part.images && part.images.length > 0 ? (
          <img
            src={part.images[0]}
            alt={part.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        ) : (
          <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        
        <div className="absolute top-2 left-2">
          <Badge variant={part.seller_type === 'manufacturer' ? 'default' : 
                         part.seller_type === 'dealer' ? 'secondary' : 'outline'}>
            {part.seller_type === 'manufacturer' ? 'OEM' : 
             part.seller_type === 'dealer' ? 'Dealer' : 'Private'}
          </Badge>
        </div>
        
        <div className="absolute top-2 right-2 flex gap-1">
          <FavoriteButton itemId={part.id} />
          <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            {part.category}
          </Badge>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary">
          {part.title}
        </h3>
        
        <div className="text-2xl font-bold text-primary mb-3">
          {formatPrice(part.price)}
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Settings className="h-3 w-3" />
            {part.condition}
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            {part.brand}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {part.year}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {part.location}
          </div>
        </div>
        
        {part.warranty && (
          <div className="flex items-center gap-1 text-xs text-green-600 mb-2">
            <Shield className="h-3 w-3" />
            {part.warranty} warranty
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="h-3 w-3" />
            {part.views || 0} views
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
      
      {/* Category Filter */}
      <div className="space-y-2">
        <Label>Category</Label>
        <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
          <SelectTrigger>
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All categories</SelectItem>
            {filterOptions.categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label} ({category.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
      
      {/* Condition */}
      <div className="space-y-2">
        <Label>Condition</Label>
        <Select value={filters.condition} onValueChange={(value) => handleFilterChange('condition', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any condition</SelectItem>
            {filterOptions.conditions.map((condition) => (
              <SelectItem key={condition.value} value={condition.value}>
                {condition.label} ({condition.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Brand */}
      <div className="space-y-2">
        <Label>Brand</Label>
        <Select value={filters.brand} onValueChange={(value) => handleFilterChange('brand', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any brand</SelectItem>
            {filterOptions.brands.map((brand) => (
              <SelectItem key={brand.value} value={brand.value}>
                {brand.label} ({brand.count})
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
              <h1 className="text-2xl font-bold">Search Parts</h1>
              <p className="text-muted-foreground">
                {loading ? 'Searching...' : `${totalResults.toLocaleString()} parts found`}
              </p>
            </div>
            
            {/* Search Form */}
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search brake pads, engine parts, filters..."
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
                    <SheetTitle>Filter Parts</SheetTitle>
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
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
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
                <span>Searching parts...</span>
              </div>
            ) : parts.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No parts found</h3>
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
                  {parts.map((part) => (
                    <PartCard key={part.id} part={part} />
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

export default PartSearchPage;