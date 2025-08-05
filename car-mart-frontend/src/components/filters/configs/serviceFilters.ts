// src/components/filters/configs/serviceFilters.ts
import { Wrench, DollarSign, MapPin, Clock, Award, Shield } from 'lucide-react';
import { FilterSection } from '@/design-system/types';

export const serviceFilterSections: FilterSection[] = [
  {
    id: 'search',
    title: 'Search',
    icon: Wrench,
    collapsible: false,
    priority: 1,
    filters: [
      {
        id: 'search',
        label: 'Search services',
        type: 'search',
        placeholder: 'Service type, provider, or keyword...'
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
        id: 'priceRange',
        label: 'Service Price',
        type: 'range',
        min: 1000,
        max: 100000,
        step: 1000
      },
      {
        id: 'priceType',
        label: 'Price Type',
        type: 'checkbox',
        options: [
          { value: 'fixed', label: 'Fixed Price', count: 234 },
          { value: 'hourly', label: 'Hourly Rate', count: 156 },
          { value: 'quote', label: 'Get Quote', count: 89 }
        ]
      }
    ]
  },
  {
    id: 'service_type',
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
          { value: 'maintenance', label: 'Maintenance', count: 156 },
          { value: 'repair', label: 'Repair', count: 234 },
          { value: 'inspection', label: 'Inspection', count: 67 },
          { value: 'modification', label: 'Modification', count: 45 },
          { value: 'restoration', label: 'Restoration', count: 23 },
          { value: 'detailing', label: 'Detailing', count: 89 },
          { value: 'towing', label: 'Towing', count: 34 },
          { value: 'emergency', label: 'Emergency', count: 28 }
        ]
      },
      {
        id: 'specialization',
        label: 'Specialization',
        type: 'checkbox',
        options: [
          { value: 'engine', label: 'Engine Specialist', count: 89 },
          { value: 'transmission', label: 'Transmission', count: 45 },
          { value: 'electrical', label: 'Electrical', count: 67 },
          { value: 'bodywork', label: 'Body Work', count: 78 },
          { value: 'paint', label: 'Paint & Polish', count: 56 },
          { value: 'ac', label: 'A/C Service', count: 34 },
          { value: 'brake', label: 'Brake Specialist', count: 91 },
          { value: 'suspension', label: 'Suspension', count: 38 }
        ]
      }
    ]
  },
  {
    id: 'features',
    title: 'Service Features',
    icon: Shield,
    collapsible: true,
    defaultOpen: false,
    priority: 4,
    filters: [
      {
        id: 'homeService',
        label: 'Home Service',
        type: 'checkbox',
        options: [
          { value: 'true', label: 'Home Service Available', count: 123 }
        ]
      },
      {
        id: 'pickupDropoff',
        label: 'Pickup & Drop-off',
        type: 'checkbox',
        options: [
          { value: 'true', label: 'Pickup & Drop-off', count: 156 }
        ]
      },
      {
        id: 'emergencyService',
        label: 'Emergency Service',
        type: 'checkbox',
        options: [
          { value: 'true', label: '24/7 Emergency', count: 67 }
        ]
      },
      {
        id: 'onlineBooking',
        label: 'Online Booking',
        type: 'checkbox',
        options: [
          { value: 'true', label: 'Online Booking', count: 189 }
        ]
      },
      {
        id: 'warranty',
        label: 'Service Warranty',
        type: 'select',
        placeholder: 'Select warranty',
        options: [
          { value: '1_month', label: '1 Month', count: 45 },
          { value: '3_months', label: '3 Months', count: 89 },
          { value: '6_months', label: '6 Months', count: 156 },
          { value: '1_year', label: '1 Year', count: 78 },
          { value: '2_years', label: '2 Years', count: 23 }
        ]
      }
    ]
  },
  {
    id: 'rating',
    title: 'Rating & Reviews',
    icon: Award,
    collapsible: true,
    defaultOpen: false,
    priority: 5,
    filters: [
      {
        id: 'rating',
        label: 'Minimum Rating',
        type: 'select',
        placeholder: 'Select rating',
        options: [
          { value: '4.5', label: '4.5+ Stars', count: 67 },
          { value: '4.0', label: '4.0+ Stars', count: 123 },
          { value: '3.5', label: '3.5+ Stars', count: 189 },
          { value: '3.0', label: '3.0+ Stars', count: 234 }
        ]
      },
      {
        id: 'certified',
        label: 'Certifications',
        type: 'checkbox',
        options: [
          { value: 'ase_certified', label: 'ASE Certified', count: 45 },
          { value: 'manufacturer_certified', label: 'Manufacturer Certified', count: 67 },
          { value: 'government_licensed', label: 'Government Licensed', count: 189 }
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
    priority: 6,
    filters: [
      {
        id: 'location',
        label: 'Service Area',
        type: 'select',
        placeholder: 'Select area',
        options: [
          { value: 'colombo', label: 'Colombo', count: 89 },
          { value: 'kandy', label: 'Kandy', count: 45 },
          { value: 'galle', label: 'Galle', count: 34 },
          { value: 'jaffna', label: 'Jaffna', count: 23 },
          { value: 'negombo', label: 'Negombo', count: 32 }
        ]
      }
    ]
  }
];