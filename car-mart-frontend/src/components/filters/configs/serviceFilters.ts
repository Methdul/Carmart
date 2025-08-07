// car-mart-frontend/src/components/filters/configs/serviceFilters.ts
// ✅ FIXED VERSION - Proper case and realistic values

import { Wrench, DollarSign, MapPin, Star } from 'lucide-react';
import { FilterSection } from '@/design-system/types';

export const serviceFilterSections: FilterSection[] = [
  {
    id: 'price',
    title: 'Price Range',
    icon: DollarSign,
    collapsible: true,
    defaultOpen: true,
    priority: 2,
    filters: [
      {
        id: 'minPrice',
        label: 'Min Price',
        type: 'number',
        placeholder: 'Minimum price (₹)'
      },
      {
        id: 'maxPrice',
        label: 'Max Price',
        type: 'number',
        placeholder: 'Maximum price (₹)'
      }
    ]
  },
  {
    id: 'category',
    title: 'Service Type',
    icon: Wrench,
    collapsible: true,
    defaultOpen: true,
    priority: 3,
    filters: [
      {
        id: 'serviceType',
        label: 'Service Category',
        type: 'select',
        placeholder: 'Select service type',
        options: [
          // ✅ Fixed case - realistic automotive services
          { value: 'General Maintenance', label: 'General Maintenance', count: 145 },
          { value: 'Engine Repair', label: 'Engine Repair', count: 89 },
          { value: 'Body Work & Paint', label: 'Body Work & Paint', count: 67 },
          { value: 'Electrical Work', label: 'Electrical Work', count: 54 },
          { value: 'AC Service', label: 'AC Service', count: 43 },
          { value: 'Brake Service', label: 'Brake Service', count: 38 },
          { value: 'Tyre Service', label: 'Tyre Service', count: 32 },
          { value: 'Towing Service', label: 'Towing Service', count: 28 },
          { value: 'Vehicle Inspection', label: 'Vehicle Inspection', count: 21 }
        ]
      },
      {
        id: 'specialization',
        label: 'Vehicle Type',
        type: 'select',
        placeholder: 'Select vehicle specialization',
        options: [
          // ✅ Fixed case
          { value: 'All Vehicles', label: 'All Vehicles', count: 156 },
          { value: 'Cars Only', label: 'Cars Only', count: 98 },
          { value: 'SUVs & Trucks', label: 'SUVs & Trucks', count: 67 },
          { value: 'Luxury Cars', label: 'Luxury Cars', count: 45 },
          { value: 'Commercial Vehicles', label: 'Commercial Vehicles', count: 23 }
        ]
      }
    ]
  },
  {
    id: 'location',
    title: 'Location & Availability',
    icon: MapPin,
    collapsible: true,
    defaultOpen: false,
    priority: 4,
    filters: [
      {
        id: 'serviceLocation',
        label: 'Service Type',
        type: 'select',
        placeholder: 'Select service location',
        options: [
          // ✅ Fixed case
          { value: 'Workshop Service', label: 'Workshop Service', count: 167 },
          { value: 'Home Service Available', label: 'Home Service Available', count: 89 },
          { value: 'Pickup & Drop', label: 'Pickup & Drop', count: 56 },
          { value: 'Roadside Assistance', label: 'Roadside Assistance', count: 34 }
        ]
      },
      {
        id: 'experienceLevel',
        label: 'Experience Level',
        type: 'select',
        placeholder: 'Select experience level',
        options: [
          // ✅ Fixed case
          { value: '10+ Years', label: '10+ Years Experience', count: 78 },
          { value: '5-10 Years', label: '5-10 Years Experience', count: 92 },
          { value: '2-5 Years', label: '2-5 Years Experience', count: 64 },
          { value: 'Under 2 Years', label: 'Under 2 Years Experience', count: 23 }
        ]
      }
    ]
  },
  {
    id: 'quality',
    title: 'Quality & Reviews',
    icon: Star,
    collapsible: true,
    defaultOpen: false,
    priority: 5,
    filters: [
      {
        id: 'rating',
        label: 'Minimum Rating',
        type: 'select',
        placeholder: 'Select minimum rating',
        options: [
          // ✅ Fixed case
          { value: '4.5', label: '4.5+ Stars', count: 45 },
          { value: '4.0', label: '4.0+ Stars', count: 89 },
          { value: '3.5', label: '3.5+ Stars', count: 134 },
          { value: '3.0', label: '3.0+ Stars', count: 187 }
        ]
      },
      {
        id: 'certified',
        label: 'Certifications',
        type: 'select',
        placeholder: 'Select certification',
        options: [
          // ✅ Fixed case
          { value: 'Certified Mechanic', label: 'Certified Mechanic', count: 67 },
          { value: 'Brand Authorized', label: 'Brand Authorized', count: 34 },
          { value: 'Insurance Approved', label: 'Insurance Approved', count: 23 }
        ]
      }
    ]
  }
];