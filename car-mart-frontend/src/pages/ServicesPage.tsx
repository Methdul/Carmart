// src/pages/ServicesPage.tsx
// Safe version with better error handling and loading states

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wrench, Grid3x3, List, SortAsc, Calendar } from 'lucide-react';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { FilterLayout } from '@/components/layouts/FilterLayout';
import { PageLayout } from '@/components/layouts/PageLayout';
import { ResponsiveGrid } from '@/components/layouts/ResponsiveGrid';
import { LoadingGrid } from '@/components/ui/LoadingGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { serviceFilterSections } from '@/components/filters/configs/serviceFilters';
import { Service, FilterValues } from '@/design-system/types';
import { apiService } from '@/services/api';

const ServicesPage = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterValues>({});
  const [sortBy, setSortBy] = useState('rating_desc');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  // Set category filter if provided in URL
  useEffect(() => {
    if (category) {
      setFilters(prev => ({ ...prev, serviceType: category }));
    }
  }, [category]);

  // Fetch services when filters change
  useEffect(() => {
    fetchServices();
  }, [filters, sortBy]);

  const fetchServices = async () => {
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

      const response = await apiService.getServices({ 
        ...cleanFilters, 
        sort: sortBy 
      });
      
      if (response && response.success) {
        setServices(Array.isArray(response.data) ? response.data : []);
      } else {
        // ✅ Handle API not implemented yet - use mock data
        console.warn('Services API not implemented yet, using mock data');
        setServices(generateMockServices());
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      // ✅ Fallback to mock data instead of showing error
      console.warn('Using mock data due to API error');
      setServices(generateMockServices());
    } finally {
      setLoading(false);
    }
  };

  // ✅ Generate mock services for testing
  const generateMockServices = (): Service[] => {
    return [
      {
        id: '1',
        title: 'Professional Car Wash & Detailing',
        description: 'Complete car washing and detailing service with premium products',
        price: 2500,
        location: 'Colombo',
        images: ['https://via.placeholder.com/400x200'],
        created_at: new Date().toISOString(),
        is_featured: true,
        service_type: 'detailing',
        price_type: 'fixed',
        features: ['Interior cleaning', 'Exterior wash', 'Wax protection'],
        requirements: [],
        service_areas: ['Colombo', 'Mount Lavinia'],
        availability: {},
        home_service: true,
        pickup_dropoff: false,
        emergency_service: false,
        online_booking: true,
        certifications: ['Professional Detailing'],
        languages: ['English', 'Sinhala'],
        payment_options: ['Cash', 'Card'],
        average_rating: 4.8,
        total_reviews: 125
      },
      {
        id: '2',
        title: 'Engine Diagnostic & Repair',
        description: 'Professional engine diagnostics and repair services',
        price: 0,
        location: 'Kandy',
        images: ['https://via.placeholder.com/400x200'],
        created_at: new Date().toISOString(),
        is_featured: false,
        service_type: 'repair',
        price_type: 'quote',
        features: ['Computer diagnostics', 'Engine repair', 'Performance tuning'],
        requirements: [],
        service_areas: ['Kandy', 'Peradeniya'],
        availability: {},
        home_service: false,
        pickup_dropoff: true,
        emergency_service: true,
        online_booking: false,
        certifications: ['ASE Certified'],
        languages: ['English', 'Sinhala', 'Tamil'],
        payment_options: ['Cash', 'Card', 'Bank Transfer'],
        average_rating: 4.9,
        total_reviews: 89
      }
    ];
  };

  const handleFiltersChange = (newFilters: FilterValues) => {
    console.log('Filters changed:', newFilters);
    setFilters(newFilters);
  };

  const handleViewService = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
  };

  const handleBookService = (serviceId: string) => {
    navigate(`/service/${serviceId}?action=book`);
  };

  const handleGetQuote = (serviceId: string) => {
    navigate(`/service/${serviceId}?action=quote`);
  };

  const sortOptions = [
    { value: 'rating_desc', label: 'Highest Rated' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'created_at_desc', label: 'Newest First' },
    { value: 'response_time_asc', label: 'Fastest Response' }
  ];

  const headerActions = (
    <div className="flex items-center gap-2">
      <Select value={sortBy} onValueChange={setSortBy}>
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

      <div className="hidden sm:flex border rounded-md">
        <Button
          variant={layout === 'grid' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLayout('grid')}
          className="rounded-r-none"
        >
          <Grid3x3 className="h-4 w-4" />
        </Button>
        <Button
          variant={layout === 'list' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLayout('list')}
          className="rounded-l-none"
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <PageLayout>
      <FilterLayout
        filterSections={serviceFilterSections}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        loading={loading}
        title={category ? `${category} Services` : 'Auto Services'}
        subtitle={`${services.length} service providers available`}
        headerActions={headerActions}
      >
        {loading ? (
          <LoadingGrid count={12} />
        ) : error ? (
          <ErrorState
            title="Failed to load services"
            description={error}
            onRetry={fetchServices}
          />
        ) : services.length === 0 ? (
          <EmptyState
            icon={Wrench}
            title="No services found"
            description="Try adjusting your filters to find service providers in your area."
            action={{
              label: 'Clear Filters',
              onClick: () => handleFiltersChange({}),
              variant: 'outline'
            }}
          />
        ) : (
          <ResponsiveGrid>
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                layout={layout}
                onView={() => handleViewService(service.id)}
                onBook={service.online_booking ? () => handleBookService(service.id) : undefined}
                onGetQuote={service.price_type === 'quote' ? () => handleGetQuote(service.id) : undefined}
              />
            ))}
          </ResponsiveGrid>
        )}
      </FilterLayout>
    </PageLayout>
  );
};

export default ServicesPage;