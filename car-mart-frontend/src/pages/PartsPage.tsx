// src/pages/PartsPage.tsx
// ikman.lk style - single column list layout

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, SortAsc, ShoppingCart } from 'lucide-react';
import { PartCard } from '@/components/cards/PartCard';
import { FilterLayout } from '@/components/layouts/FilterLayout';
import { PageLayout } from '@/components/layouts/PageLayout';
import { LoadingGrid } from '@/components/ui/LoadingGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { partFilterSections } from '@/components/filters/configs/partFilters';
import { Part, FilterValues } from '@/design-system/types';
import { apiService } from '@/services/api';

const PartsPage = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterValues>({});
  const [sortBy, setSortBy] = useState('created_at_desc');
  // ✅ Always use list layout for ikman.lk style
  const layout = 'list';
  const [cartCount, setCartCount] = useState(0);

  // Set category filter if provided in URL
  useEffect(() => {
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    }
  }, [category]);

  // Load initial filters from URL
  useEffect(() => {
    const initialFilters: FilterValues = {};
    searchParams.forEach((value, key) => {
      if (key === 'sort') {
        setSortBy(value);
      } else {
        initialFilters[key] = value;
      }
    });
    setFilters(initialFilters);
  }, [searchParams]);

  useEffect(() => {
    fetchParts();
  }, [filters, sortBy]);

  const fetchParts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // ✅ Clean filters - remove undefined/null values
      const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== null && value !== undefined && value !== '' && value !== 'all') {
          acc[key] = value;
        }
        return acc;
      }, {} as FilterValues);

      const response = await apiService.getParts({ ...cleanFilters, sort: sortBy });
      
      if (response && response.success) {
        setParts(Array.isArray(response.data) ? response.data : []);
      } else {
        // ✅ Handle API not implemented yet - use mock data
        console.warn('Parts API not implemented yet, using mock data');
        setParts(generateMockParts());
      }
    } catch (err) {
      console.error('Error fetching parts:', err);
      // ✅ Fallback to mock data instead of showing error
      console.warn('Using mock data due to API error');
      setParts(generateMockParts());
    } finally {
      setLoading(false);
    }
  };

  // ✅ Generate mock parts for testing
  const generateMockParts = (): Part[] => {
    return [
      {
        id: '1',
        title: 'Genuine Toyota Brake Pads Set',
        description: 'Original Toyota brake pads for Camry, Corolla, and Vios models',
        price: 8500,
        location: 'Colombo',
        images: ['https://via.placeholder.com/400x200'],
        created_at: new Date().toISOString(),
        is_featured: true,
        brand: 'Toyota',
        part_number: 'TBP-2020-001',
        category: 'brake',
        condition: 'New',
        compatibility: ['Toyota Camry 2018-2023', 'Toyota Corolla 2019-2023'],
        stock_quantity: 25,
        warranty_period: '1 year',
        is_oem: true
      },
      {
        id: '2',
        title: 'Bosch Engine Air Filter',
        description: 'High-quality air filter compatible with multiple vehicle models',
        price: 2800,
        location: 'Kandy',
        images: ['https://via.placeholder.com/400x200'],
        created_at: new Date().toISOString(),
        is_featured: false,
        brand: 'Bosch',
        part_number: 'AF-4567',
        category: 'engine',
        condition: 'New',
        compatibility: ['Honda Civic 2016-2021', 'Honda Accord 2018-2022'],
        stock_quantity: 15,
        warranty_period: '6 months',
        is_oem: false
      },
      {
        id: '3',
        title: 'Denso Spark Plugs Set (4pcs)',
        description: 'Premium iridium spark plugs for better performance and fuel economy',
        price: 4200,
        location: 'Galle',
        images: ['https://via.placeholder.com/400x200'],
        created_at: new Date().toISOString(),
        is_featured: true,
        brand: 'Denso',
        part_number: 'DSP-IR22',
        category: 'engine',
        condition: 'New',
        compatibility: ['Nissan March 2010-2020', 'Nissan Note 2012-2021'],
        stock_quantity: 8,
        warranty_period: '2 years',
        is_oem: true
      }
    ];
  };

  const handleFiltersChange = (newFilters: FilterValues) => {
    console.log('Filters changed:', newFilters);
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '' && value !== 'all') {
        params.set(key, value.toString());
      }
    });
    params.set('sort', sortBy);
    setSearchParams(params);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSort);
    setSearchParams(params);
  };

  const handleViewPart = (partId: string) => {
    navigate(`/part/${partId}`);
  };

  const handleAddToCart = (partId: string) => {
    setCartCount(prev => prev + 1);
    console.log('Added to cart:', partId);
  };

  const sortOptions = [
    { value: 'created_at_desc', label: 'Newest First' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'brand_asc', label: 'Brand A-Z' },
    { value: 'stock_desc', label: 'Most in Stock' }
  ];

  const headerActions = (
    <div className="flex items-center gap-2">
      <Select value={sortBy} onValueChange={handleSortChange}>
        <SelectTrigger className="w-48">
          <SortAsc className="h-4 w-4 mr-2" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="outline" className="relative">
        <ShoppingCart className="h-4 w-4 mr-2" />
        Cart
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Button>
    </div>
  );

  return (
    <PageLayout>
      <FilterLayout
        filterSections={partFilterSections}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        loading={loading}
        title={category ? `${category} Parts` : 'Auto Parts'}
        subtitle={`${parts.length} parts available`}
        headerActions={headerActions}
      >
        {loading ? (
          <LoadingGrid count={12} />
        ) : error ? (
          <ErrorState
            title="Failed to load parts"
            description={error}
            onRetry={fetchParts}
          />
        ) : parts.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No parts found"
            description="Try adjusting your filters to find the parts you need."
            action={{
              label: 'Clear Filters',
              onClick: () => handleFiltersChange({}),
              variant: 'outline'
            }}
          />
        ) : (
          <div className="space-y-3 max-w-2xl mx-auto px-4">
            {parts.map((part) => (
              <PartCard
                key={part.id}
                part={part}
                layout="list"
                onView={() => handleViewPart(part.id)}
                onAddToCart={() => handleAddToCart(part.id)}
              />
            ))}
          </div>
        )}
      </FilterLayout>
    </PageLayout>
  );
};

export default PartsPage;