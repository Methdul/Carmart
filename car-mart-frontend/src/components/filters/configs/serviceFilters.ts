// car-mart-frontend/src/components/filters/configs/serviceFilters.ts
// ✅ COMPLETE SIMPLIFIED VERSION - Create this new file

import { Wrench, DollarSign, MapPin } from 'lucide-react';
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
          { value: 'maintenance', label: 'General Maintenance', count: 45 },
          { value: 'repair', label: 'Repair Work', count: 38 },
          { value: 'body-work', label: 'Body Work & Paint', count: 25 },
          { value: 'electrical', label: 'Electrical Work', count: 22 },
          { value: 'ac-service', label: 'AC Service', count: 18 },
          { value: 'towing', label: 'Towing Service', count: 15 },
          { value: 'inspection', label: 'Vehicle Inspection', count: 12 }
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
        id: 'homeService',
        label: 'Service Type',
        type: 'select',
        placeholder: 'Select service location',
        options: [
          { value: 'home-service', label: 'Home Service Available', count: 34 },
          { value: 'workshop', label: 'Workshop Service', count: 67 },
          { value: 'pickup-drop', label: 'Pickup & Drop', count: 23 }
        ]
      }
    ]
  }
];