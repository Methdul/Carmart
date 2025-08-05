// src/hooks/useFilters.ts
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterValues } from '@/design-system/types';

interface UseFiltersProps {
  initialFilters?: FilterValues;
  onFiltersChange?: (filters: FilterValues) => void;
  syncWithUrl?: boolean;
}

export const useFilters = ({
  initialFilters = {},
  onFiltersChange,
  syncWithUrl = true
}: UseFiltersProps = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterValues>(initialFilters);

  // Load filters from URL on mount
  useEffect(() => {
    if (syncWithUrl) {
      const urlFilters: FilterValues = {};
      searchParams.forEach((value, key) => {
        // Skip non-filter params
        if (['page', 'sort', 'layout'].includes(key)) return;
        
        // Parse array values
        if (value.includes(',')) {
          urlFilters[key] = value.split(',');
        } else {
          urlFilters[key] = value;
        }
      });
      
      if (Object.keys(urlFilters).length > 0) {
        setFilters(urlFilters);
      }
    }
  }, [searchParams, syncWithUrl]);

  // Update filters
  const updateFilters = useCallback((newFilters: FilterValues) => {
    setFilters(newFilters);
    
    // Update URL if syncing
    if (syncWithUrl) {
      const params = new URLSearchParams(searchParams);
      
      // Remove existing filter params
      Object.keys(filters).forEach(key => {
        params.delete(key);
      });
      
      // Add new filter params
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          if (Array.isArray(value)) {
            params.set(key, value.join(','));
          } else {
            params.set(key, value.toString());
          }
        }
      });
      
      setSearchParams(params);
    }
    
    // Notify parent
    onFiltersChange?.(newFilters);
  }, [filters, searchParams, setSearchParams, syncWithUrl, onFiltersChange]);

  // Clear filters
  const clearFilters = useCallback(() => {
    updateFilters({});
  }, [updateFilters]);

  // Update single filter
  const updateFilter = useCallback((key: string, value: any) => {
    const newFilters = { ...filters };
    
    if (value === null || value === undefined || value === '') {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    
    updateFilters(newFilters);
  }, [filters, updateFilters]);

  // Get active filter count
  const activeFilterCount = Object.keys(filters).length;

  return {
    filters,
    updateFilters,
    updateFilter,
    clearFilters,
    activeFilterCount
  };
};