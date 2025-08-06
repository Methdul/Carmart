// car-mart-frontend/src/components/filters/configs/partFilters.ts
// ✅ COMPLETE SIMPLIFIED VERSION - Replace your existing file

import { Package, DollarSign, Wrench, Shield } from 'lucide-react';
import { FilterSection } from '@/design-system/types';

export const partFilterSections: FilterSection[] = [
  {
    id: 'search',
    title: 'Search',
    icon: Package,
    collapsible: false,
    priority: 1,
    filters: [
      {
        id: 'search',
        label: 'Search parts',
        type: 'search',
        placeholder: 'Part name, brand, or part number...'
      }
    ]
  },
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
    title: 'Category',
    icon: Wrench,
    collapsible: true,
    defaultOpen: true,
    priority: 3,
    filters: [
      {
        id: 'category',
        label: 'Part Category',
        type: 'select',
        placeholder: 'Select category',
        options: [
          { value: 'engine', label: 'Engine Parts', count: 156 },
          { value: 'body', label: 'Body Parts', count: 134 },
          { value: 'electrical', label: 'Electrical', count: 98 },
          { value: 'brake', label: 'Brake System', count: 87 },
          { value: 'suspension', label: 'Suspension', count: 65 },
          { value: 'interior', label: 'Interior', count: 54 },
          { value: 'exhaust', label: 'Exhaust System', count: 43 },
          { value: 'cooling', label: 'Cooling System', count: 32 }
        ]
      },
      {
        id: 'brand',
        label: 'Brand',
        type: 'select',
        placeholder: 'Select brand',
        options: [
          { value: 'genuine', label: 'Genuine/OEM', count: 234 },
          { value: 'bosch', label: 'Bosch', count: 89 },
          { value: 'denso', label: 'Denso', count: 67 },
          { value: 'mann', label: 'Mann Filter', count: 45 },
          { value: 'ngk', label: 'NGK', count: 34 },
          { value: 'brembo', label: 'Brembo', count: 23 }
        ]
      }
    ]
  },
  {
    id: 'condition',
    title: 'Condition',
    icon: Shield,
    collapsible: true,
    defaultOpen: false,
    priority: 4,
    filters: [
      {
        id: 'condition',
        label: 'Condition',
        type: 'select',
        placeholder: 'Select condition',
        options: [
          { value: 'new', label: 'New', count: 345 },
          { value: 'used', label: 'Used - Good', count: 123 },
          { value: 'refurbished', label: 'Refurbished', count: 67 }
        ]
      }
    ]
  }
];