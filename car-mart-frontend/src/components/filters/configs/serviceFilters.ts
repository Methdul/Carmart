// car-mart-frontend/src/components/filters/configs/serviceFilters.ts
// ✅ FIXED VERSION - Uses exact database values from check-services-fixed.js

import { Wrench, DollarSign, MapPin, Clock, Home, Zap } from 'lucide-react';
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
    id: 'service',
    title: 'Service Type',
    icon: Wrench,
    collapsible: true,
    defaultOpen: true,
    priority: 3,
    filters: [
      {
        id: 'serviceType',
        label: 'Service Type',
        type: 'select',
        placeholder: 'Select service type',
        options: [
          // ✅ EXACT values from your database
          { value: 'Detailing', label: 'Detailing', count: 1 },
          { value: 'Emergency', label: 'Emergency', count: 1 },
          { value: 'Maintenance', label: 'Maintenance', count: 3 },
          { value: 'Repair', label: 'Repair', count: 3 }
        ]
      },
      {
        id: 'priceType',
        label: 'Pricing Type',
        type: 'select',
        placeholder: 'Select pricing type',
        options: [
          // ✅ EXACT values from your database
          { value: 'fixed', label: 'Fixed Price', count: 7 },
          { value: 'hourly', label: 'Hourly Rate', count: 1 }
        ]
      }
    ]
  },
  {
    id: 'location',
    title: 'Location',
    icon: MapPin,
    collapsible: true,
    defaultOpen: false,
    priority: 4,
    filters: [
      {
        id: 'location',
        label: 'Service Location',
        type: 'select',
        placeholder: 'Select location',
        options: [
          // ✅ EXACT values from your database
          { value: 'Colombo', label: 'Colombo', count: 1 },
          { value: 'Colombo (Island-wide)', label: 'Colombo (Island-wide)', count: 1 },
          { value: 'Colombo 03', label: 'Colombo 03', count: 1 },
          { value: 'Colombo 05', label: 'Colombo 05', count: 1 },
          { value: 'Colombo 07', label: 'Colombo 07', count: 1 },
          { value: 'Galle', label: 'Galle', count: 1 },
          { value: 'Kandy', label: 'Kandy', count: 1 },
          { value: 'Negombo', label: 'Negombo', count: 1 }
        ]
      }
    ]
  },
  {
    id: 'features',
    title: 'Service Features',
    icon: Home,
    collapsible: true,
    defaultOpen: false,
    priority: 5,
    filters: [
      {
        id: 'homeService',
        label: 'Home Service Available',
        type: 'checkbox',
        placeholder: 'Service at your location'
      },
      {
        id: 'emergencyService',
        label: 'Emergency Service',
        type: 'checkbox',
        placeholder: '24/7 emergency support'
      },
      {
        id: 'onlineBooking',
        label: 'Online Booking',
        type: 'checkbox',
        placeholder: 'Book appointments online'
      }
    ]
  }
];