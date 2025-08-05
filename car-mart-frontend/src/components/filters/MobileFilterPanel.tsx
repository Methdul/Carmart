// src/components/filters/MobileFilterPanel.tsx
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';
import { BaseFilter } from './BaseFilter';
import { FilterSection, FilterValues } from '@/design-system/types';
import { cn } from '@/lib/utils';

interface MobileFilterPanelProps {
  sections: FilterSection[];
  filters: FilterValues;
  onFiltersChange: (filters: FilterValues) => void;
  loading?: boolean;
  className?: string;
}

export const MobileFilterPanel: React.FC<MobileFilterPanelProps> = ({
  sections,
  filters,
  onFiltersChange,
  loading = false,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeFilterCount = Object.keys(filters).length;

  const handleFiltersChange = (newFilters: FilterValues) => {
    onFiltersChange(newFilters);
  };

  const handleApplyFilters = () => {
    setIsOpen(false);
  };

  return (
    <div className={cn("lg:hidden", className)}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            className="relative flex items-center gap-2"
            disabled={loading}
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="left" 
          className="w-full sm:w-80 p-0 overflow-y-auto"
        >
          <SheetHeader className="p-6 pb-2 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary">
                    {activeFilterCount} active
                  </Badge>
                )}
              </SheetTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-auto p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>
          
          <div className="p-6">
            <BaseFilter
              sections={sections}
              initialFilters={filters}
              onFiltersChange={handleFiltersChange}
              className="border-0 shadow-none"
              loading={loading}
            />
          </div>

          {/* Apply Button */}
          <div className="sticky bottom-0 bg-background border-t p-4">
            <Button 
              onClick={handleApplyFilters}
              className="w-full"
              disabled={loading}
            >
              Apply Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};