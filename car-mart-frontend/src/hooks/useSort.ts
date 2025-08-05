// src/hooks/useSort.ts
import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

interface SortOption {
  value: string;
  label: string;
}

interface UseSortProps {
  options: SortOption[];
  defaultSort?: string;
  onSortChange?: (sortBy: string) => void;
  syncWithUrl?: boolean;
}

export const useSort = ({
  options,
  defaultSort,
  onSortChange,
  syncWithUrl = true
}: UseSortProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSort = syncWithUrl ? searchParams.get('sort') || defaultSort || options[0]?.value : defaultSort || options[0]?.value;
  const [sortBy, setSortBy] = useState(initialSort);

  const updateSort = useCallback((newSort: string) => {
    setSortBy(newSort);
    
    if (syncWithUrl) {
      const params = new URLSearchParams(searchParams);
      params.set('sort', newSort);
      setSearchParams(params);
    }
    
    onSortChange?.(newSort);
  }, [searchParams, setSearchParams, syncWithUrl, onSortChange]);

  const currentSortOption = options.find(option => option.value === sortBy) || options[0];

  return {
    sortBy,
    updateSort,
    currentSortOption,
    options
  };
};
