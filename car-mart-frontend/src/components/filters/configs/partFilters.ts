// car-mart-frontend/src/components/filters/configs/partFilters.ts
// ✅ FIXED VERSION - Uses exact database values from check-parts-values.js

import { Package, DollarSign, Settings, Wrench } from 'lucide-react';
import { FilterSection } from '@/design-system/types';

export const partFilterSections: FilterSection[] = [
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
    title: 'Part Category',
    icon: Package,
    collapsible: true,
    defaultOpen: true,
    priority: 3,
    filters: [
      {
        id: 'category',
        label: 'Category',
        type: 'select',
        placeholder: 'Select category',
        options: [
          // ✅ EXACT values from your database
          { value: 'Battery', label: 'Battery', count: 1 },
          { value: 'Brakes', label: 'Brakes', count: 3 },
          { value: 'Engine', label: 'Engine', count: 1 },
          { value: 'Filters', label: 'Filters', count: 1 },
          { value: 'Lighting', label: 'Lighting', count: 2 }
        ]
      }
    ]
  },
  {
    id: 'brand',
    title: 'Brand',
    icon: Wrench,
    collapsible: true,
    defaultOpen: false,
    priority: 4,
    filters: [
      {
        id: 'brand',
        label: 'Part Brand',
        type: 'select',
        placeholder: 'Select brand',
        options: [
          // ✅ EXACT values from your database
          { value: 'Audi', label: 'Audi', count: 1 },
          { value: 'BMW', label: 'BMW', count: 1 },
          { value: 'Brembo', label: 'Brembo', count: 1 },
          { value: 'Honda', label: 'Honda', count: 1 },
          { value: 'Mann Filter', label: 'Mann Filter', count: 1 },
          { value: 'Toyota', label: 'Toyota', count: 3 }
        ]
      }
    ]
  },
  {
    id: 'details',
    title: 'Part Details',
    icon: Settings,
    collapsible: true,
    defaultOpen: false,
    priority: 5,
    filters: [
      {
        id: 'condition',
        label: 'Condition',
        type: 'select',
        placeholder: 'Select condition',
        options: [
          // ✅ EXACT values from your database
          { value: 'New', label: 'New', count: 6 },
          { value: 'Refurbished', label: 'Refurbished', count: 1 },
          { value: 'Used', label: 'Used', count: 1 }
        ]
      },
      {
        id: 'compatibility',
        label: 'Vehicle Make',
        type: 'select',
        placeholder: 'Select vehicle make',
        options: [
          // ✅ Simplified to just vehicle makes (extracted from your compatibility data)
          { value: 'Audi', label: 'Audi', count: 2 },
          { value: 'BMW', label: 'BMW', count: 2 },
          { value: 'Honda', label: 'Honda', count: 2 },
          { value: 'Mercedes', label: 'Mercedes', count: 1 },
          { value: 'Toyota', label: 'Toyota', count: 4 }
        ]
      }
    ]
  }
];