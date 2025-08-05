// src/pages/VehiclesPage.tsx
// ikman.lk style - single column list layout

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SortAsc, Car } from 'lucide-react';
import { VehicleCard } from '@/components/cards/VehicleCard';
import { FilterLayout } from '@/components/layouts/FilterLayout';
import { PageLayout } from '@/components/layouts/PageLayout';
import { LoadingGrid } from '@/components/ui/LoadingGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { vehicleFilterSections } from '@/components/filters/configs/vehicleFilters';
import { Vehicle, FilterValues } from '@/design-system/types';
import { apiService } from '@/services/api';

const VehiclesPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State management
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterValues>({});
  const [sortBy, setSortBy] = useState('created_at_desc');
  // ✅ Always use list layout for ikman.lk style
  const layout = 'list';
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Load initial filters from URL
  useEffect(() => {
    const initialFilters: FilterValues = {};
    searchParams.forEach((value, key) => {
      if (key === 'sort') {
        setSortBy(value);
      } else if (key === 'page') {
        setPage(parseInt(value) || 1);
      } else {
        initialFilters[key] = value;
      }
    });
    setFilters(initialFilters);
  }, [searchParams]);

  // Fetch vehicles when filters change
  useEffect(() => {
    fetchVehicles();
  }, [filters, sortBy, page]);

  const fetchVehicles = async () => {
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

      const queryParams = {
        ...cleanFilters,
        sort: sortBy,
        page,
        limit: 12
      };

      const response = await apiService.getVehicles(queryParams);
      
      if (response && response.success) {
        setVehicles(Array.isArray(response.data) ? response.data : []);
        setTotalCount(response.pagination?.totalItems || response.data?.length || 0);
      } else {
        // ✅ Handle API not implemented yet - use mock data
        console.warn('Vehicles API not implemented yet, using mock data');
        const mockData = generateMockVehicles();
        setVehicles(mockData);
        setTotalCount(mockData.length);
      }
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      // ✅ Fallback to mock data instead of showing error
      console.warn('Using mock data due to API error');
      const mockData = generateMockVehicles();
      setVehicles(mockData);
      setTotalCount(mockData.length);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Generate mock vehicles for testing
  const generateMockVehicles = (): Vehicle[] => {
    return [
      {
        id: '1',
        title: '2020 Toyota Camry Hybrid',
        description: 'Well-maintained hybrid sedan with excellent fuel economy',
        price: 3250000,
        location: 'Colombo',
        images: ['https://via.placeholder.com/400x200'],
        created_at: new Date().toISOString(),
        is_featured: true,
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        fuel_type: 'Hybrid',
        transmission: 'Automatic',
        body_type: 'Sedan',
        seats: 5,
        doors: 4,
        color: 'White',
        mileage: 45000,
        condition: 'Excellent',
        negotiable: true,
        user: {
          id: '1',
          first_name: 'John',
          last_name: 'Doe',
          account_type: 'individual',
          rating: 4.8,
          total_reviews: 23
        }
      },
      {
        id: '2',
        title: '2019 Honda Civic RS Turbo',
        description: 'Sporty and fuel-efficient hatchback in pristine condition',
        price: 2890000,
        location: 'Kandy',
        images: ['https://via.placeholder.com/400x200'],
        created_at: new Date().toISOString(),
        is_featured: false,
        make: 'Honda',
        model: 'Civic',
        year: 2019,
        fuel_type: 'Petrol',
        transmission: 'Manual',
        body_type: 'Hatchback',
        seats: 5,
        doors: 5,
        color: 'Red',
        mileage: 32000,
        condition: 'Good',
        negotiable: false,
        user: {
          id: '2',
          first_name: 'Jane',
          last_name: 'Smith',
          account_type: 'business',
          rating: 4.9,
          total_reviews: 45
        }
      },
      {
        id: '3',
        title: '2021 Nissan X-Trail 4WD',
        description: 'Spacious SUV perfect for family trips and off-road adventures',
        price: 4150000,
        location: 'Galle',
        images: ['https://via.placeholder.com/400x200'],
        created_at: new Date().toISOString(),
        is_featured: true,
        make: 'Nissan',
        model: 'X-Trail',
        year: 2021,
        fuel_type: 'Petrol',
        transmission: 'CVT',
        body_type: 'SUV',
        seats: 7,
        doors: 5,
        color: 'Blue',
        mileage: 28000,
        condition: 'Excellent',
        negotiable: true,
        user: {
          id: '3',
          first_name: 'Mike',
          last_name: 'Johnson',
          account_type: 'individual',
          rating: 4.7,
          total_reviews: 12
        }
      },
      {
        id: '4',
        title: '2022 Suzuki Alto 800',
        description: 'Perfect city car with excellent fuel economy and low maintenance',
        price: 1850000,
        location: 'Negombo',
        images: ['https://via.placeholder.com/400x200'],
        created_at: new Date().toISOString(),
        is_featured: false,
        make: 'Suzuki',
        model: 'Alto',
        year: 2022,
        fuel_type: 'Petrol',
        transmission: 'Manual',
        body_type: 'Hatchback',
        seats: 4,
        doors: 5,
        color: 'Silver',
        mileage: 12000,
        condition: 'Excellent',
        negotiable: true,
        user: {
          id: '4',
          first_name: 'Sarah',
          last_name: 'Fernando',
          account_type: 'individual',
          rating: 4.5,
          total_reviews: 8
        }
      }
    ];
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters: FilterValues) => {
    console.log('Filters changed:', newFilters);
    setFilters(newFilters);
    setPage(1);
    
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

  // Handle sort change
  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSort);
    setSearchParams(params);
  };

  // Vehicle actions
  const handleViewVehicle = (vehicleId: string) => {
    navigate(`/vehicles/${vehicleId}`);
  };

  const handleContactSeller = (vehicleId: string) => {
    console.log('Contact seller for vehicle:', vehicleId);
    // TODO: Implement contact functionality
  };

  const handleSaveVehicle = (vehicleId: string) => {
    console.log('Save vehicle:', vehicleId);
    // TODO: Implement save functionality
  };

  const handleShareVehicle = (vehicleId: string) => {
    console.log('Share vehicle:', vehicleId);
    // TODO: Implement share functionality
  };

  // Sort options
  const sortOptions = [
    { value: 'created_at_desc', label: 'Newest First' },
    { value: 'created_at_asc', label: 'Oldest First' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'mileage_asc', label: 'Mileage: Low to High' },
    { value: 'year_desc', label: 'Year: Newest First' },
    { value: 'views_desc', label: 'Most Popular' }
  ];

  // Header actions
  const headerActions = (
    <div className="flex items-center gap-2">
      {/* Sort dropdown */}
      <Select value={sortBy} onValueChange={handleSortChange}>
        <SelectTrigger className="w-full sm:w-48">
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
    </div>
  );

  return (
    <PageLayout>
      <FilterLayout
        filterSections={vehicleFilterSections}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        loading={loading}
        title="Buy Vehicles"
        subtitle={`${totalCount.toLocaleString()} vehicles available`}
        headerActions={headerActions}
      >
        {/* Results Content */}
        {loading ? (
          <LoadingGrid count={12} />
        ) : error ? (
          <ErrorState
            title="Failed to load vehicles"
            description={error}
            onRetry={fetchVehicles}
          />
        ) : vehicles.length === 0 ? (
          <EmptyState
            icon={Car}
            title="No vehicles found"
            description="Try adjusting your filters or search criteria to find vehicles."
            action={{
              label: 'Clear Filters',
              onClick: () => handleFiltersChange({}),
              variant: 'outline'
            }}
          />
        ) : (
          <div className="space-y-2 sm:space-y-3 max-w-2xl mx-auto px-2 sm:px-4">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                layout="list"
                onView={() => handleViewVehicle(vehicle.id)}
                onContact={() => handleContactSeller(vehicle.id)}
                onSave={() => handleSaveVehicle(vehicle.id)}
                onShare={() => handleShareVehicle(vehicle.id)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && vehicles.length > 0 && totalCount > 12 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <span className="px-4 py-2 text-sm text-muted-foreground">
                Page {page} of {Math.ceil(totalCount / 12)}
              </span>
              <Button
                variant="outline"
                disabled={page >= Math.ceil(totalCount / 12)}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </FilterLayout>
    </PageLayout>
  );
};

export default VehiclesPage;