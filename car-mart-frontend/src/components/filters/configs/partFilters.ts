// car-mart-frontend/src/components/filters/configs/partFilters.ts
// ✅ FIXED VERSION - Proper case and realistic values

import { Package, DollarSign, Wrench, Shield } from 'lucide-react';
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
          // ✅ Fixed case and realistic automotive categories
          { value: 'Engine Parts', label: 'Engine Parts', count: 156 },
          { value: 'Body Parts', label: 'Body Parts', count: 134 },
          { value: 'Electrical Parts', label: 'Electrical Parts', count: 98 },
          { value: 'Brake System', label: 'Brake System', count: 87 },
          { value: 'Suspension', label: 'Suspension', count: 65 },
          { value: 'Interior Parts', label: 'Interior Parts', count: 54 },
          { value: 'Exhaust System', label: 'Exhaust System', count: 43 },
          { value: 'Cooling System', label: 'Cooling System', count: 32 }
        ]
      },
      {
        id: 'brand',
        label: 'Brand',
        type: 'select',
        placeholder: 'Select brand',
        options: [
          // ✅ Fixed case - real automotive part brands
          { value: 'Genuine OEM', label: 'Genuine OEM', count: 234 },
          { value: 'Bosch', label: 'Bosch', count: 89 },
          { value: 'Denso', label: 'Denso', count: 67 },
          { value: 'Mann Filter', label: 'Mann Filter', count: 45 },
          { value: 'NGK', label: 'NGK', count: 34 },
          { value: 'Brembo', label: 'Brembo', count: 23 },
          { value: 'Mahle', label: 'Mahle', count: 18 }
        ]
      }
    ]
  },
  {
    id: 'details',
    title: 'Part Details',
    icon: Package,
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
          // ✅ Fixed case
          { value: 'New', label: 'New', count: 345 },
          { value: 'Used - Good', label: 'Used - Good', count: 123 },
          { value: 'Refurbished', label: 'Refurbished', count: 67 }
        ]
      },
      {
        id: 'compatibility',
        label: 'Vehicle Make',
        type: 'select',
        placeholder: 'Select vehicle make',
        options: [
          // ✅ Match the vehicle makes from your database
          { value: 'Honda', label: 'Honda', count: 89 },
          { value: 'Toyota', label: 'Toyota', count: 76 },
          { value: 'BMW', label: 'BMW', count: 45 },
          { value: 'Mercedes-Benz', label: 'Mercedes-Benz', count: 34 },
          { value: 'Audi', label: 'Audi', count: 28 },
          { value: 'Nissan', label: 'Nissan', count: 21 }
        ]
      }
    ]
  }
];