// src/components/layouts/FilterLayout.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { BaseFilter } from '@/components/filters/BaseFilter';
import { MobileFilterPanel } from '@/components/filters/MobileFilterPanel';
import { FilterSection, FilterValues } from '@/design-system/types';

interface FilterLayoutProps {
  // Filter props
  filterSections: FilterSection[];
  filters: FilterValues;
  onFiltersChange: (filters: FilterValues) => void;
  
  // Content props
  children: React.ReactNode;
  
  // Layout props
  sidebarWidth?: 'sm' | 'md' | 'lg';
  className?: string;
  loading?: boolean;
  
  // Header content
  title?: string;
  subtitle?: string;
  headerActions?: React.ReactNode;
}

export const FilterLayout: React.FC<FilterLayoutProps> = ({
  filterSections,
  filters,
  onFiltersChange,
  children,
  sidebarWidth = 'md',
  className,
  loading = false,
  title,
  subtitle,
  headerActions
}) => {
  const sidebarWidths = {
    sm: 'w-64',
    md: 'w-72', 
    lg: 'w-80'
  };

  return (
    <div className={cn("py-6", className)}>
      {/* ✅ Centered container for entire layout */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex gap-3">
          {/* Desktop Sidebar Filter */}
          <div className={cn("hidden lg:block", sidebarWidths[sidebarWidth], "flex-shrink-0")}>
            <div className="sticky top-24">
              <BaseFilter
                sections={filterSections}
                initialFilters={filters}
                onFiltersChange={onFiltersChange}
                loading={loading}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header Section - Same width as cards */}
            {(title || subtitle || headerActions) && (
              <div className="max-w-2xl mx-auto px-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    {title && (
                      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        {title}
                      </h1>
                    )}
                    {subtitle && (
                      <p className="text-muted-foreground">
                        {subtitle}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {headerActions}
                    
                    {/* Mobile Filter Trigger */}
                    <MobileFilterPanel
                      sections={filterSections}
                      filters={filters}
                      onFiltersChange={onFiltersChange}
                      loading={loading}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Content - Cards will use their own max-w-2xl */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};