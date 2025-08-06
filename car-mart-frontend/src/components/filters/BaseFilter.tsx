// car-mart-frontend/src/components/filters/BaseFilter.tsx
// ✅ PROFESSIONAL & COMPACT VERSION - ALL FILTERS VISIBLE

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CalendarIcon,
  X,
  Filter,
  RotateCcw,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FilterSection, FilterOption, FilterValues } from '@/design-system/types';
import { format } from 'date-fns';

interface BaseFilterProps {
  sections: FilterSection[];
  initialFilters?: FilterValues;
  onFiltersChange: (filters: FilterValues) => void;
  className?: string;
  showActiveFilters?: boolean;
  loading?: boolean;
}

export const BaseFilter: React.FC<BaseFilterProps> = ({
  sections,
  initialFilters = {},
  onFiltersChange,
  className,
  showActiveFilters = true,
  loading = false
}) => {
  const [filters, setFilters] = useState<FilterValues>(initialFilters);
  const [localValues, setLocalValues] = useState<Record<string, any>>({});

  useEffect(() => {
    setFilters(initialFilters);
    setLocalValues({});
  }, [initialFilters]);

  const hasChanges = Object.keys(localValues).length > 0;
  const activeFilterCount = Object.keys(filters).length;

  // Apply all filters
    // Apply all filters - PRESERVE SEARCH
  const handleApply = () => {
    const newFilters = { ...filters }; // This preserves search and all existing filters
    
    // Apply local changes
    Object.entries(localValues).forEach(([filterId, value]) => {
        if (value === '' || value === null || value === undefined || value === 'all' ||
            (Array.isArray(value) && value.length === 0)) {
        delete newFilters[filterId];
        } else {
        newFilters[filterId] = value;
        }
    });
    
    // ✅ Ensure search is preserved if it exists in original filters
    if (filters.search && !newFilters.search) {
        newFilters.search = filters.search;
    }
    
    setFilters(newFilters);
    setLocalValues({});
    onFiltersChange(newFilters);
    };

  // Clear all
  const handleClear = () => {
    setFilters({});
    setLocalValues({});
    onFiltersChange({});
  };

  // Update local value
  const updateLocal = (filterId: string, value: any) => {
    if (value === '' || value === null || value === undefined || value === 'all' ||
        (Array.isArray(value) && value.length === 0)) {
      const newLocal = { ...localValues };
      delete newLocal[filterId];
      setLocalValues(newLocal);
    } else {
      setLocalValues(prev => ({ ...prev, [filterId]: value }));
    }
  };

  // Get current value
  const getCurrentValue = (filterId: string) => {
    return localValues[filterId] !== undefined ? localValues[filterId] : filters[filterId];
  };

  // Remove specific filter - ALLOW MANUAL SEARCH REMOVAL
  const removeFilter = (filterId: string) => {
    const newFilters = { ...filters };
    const newLocal = { ...localValues };
    delete newFilters[filterId];
    delete newLocal[filterId];
    setFilters(newFilters);
    setLocalValues(newLocal);
    onFiltersChange(newFilters);
    };

  // Get filter display label
  const getFilterLabel = (filterId: string, value: any): string => {
    // ✅ Special case for search filter (removed from config but still used)
    if (filterId === 'search') {
      return `Search: ${value}`;
    }
    
    const section = sections.find(s => s.filters.some(f => f.id === filterId));
    const filter = section?.filters.find(f => f.id === filterId);
    if (!filter) return '';

    switch (filter.type) {
      case 'select':
      case 'radio':
        const option = filter.options?.find(opt => opt.value === value);
        return option?.label || value;
      case 'checkbox':
        if (Array.isArray(value)) {
          return value.map(v => {
            const opt = filter.options?.find(opt => opt.value === v);
            return opt?.label || v;
          }).join(', ');
        }
        return value;
      case 'number':
        if (typeof value === 'number' || !isNaN(Number(value))) {
          const num = Number(value);
          if (num >= 100000) return `₹${(num / 100000).toFixed(0)}L`;
          if (num >= 1000) return `₹${(num / 1000).toFixed(0)}K`;
          return `₹${num}`;
        }
        return value;
      case 'date':
        if (value instanceof Date) return format(value, 'MMM dd');
        return value;
      default:
        return value?.toString() || '';
    }
  };

  // Render compact filter input
  const renderFilter = (filter: FilterOption) => {
    const value = getCurrentValue(filter.id);
    const hasValue = value !== undefined && value !== null && value !== '';

    switch (filter.type) {
      case 'number':
        return (
          <Input
            type="number"
            placeholder={filter.placeholder || "Amount"}
            value={value || ''}
            onChange={(e) => updateLocal(filter.id, e.target.value)}
            className={cn(
              "h-8 text-xs",
              hasValue && "border-primary bg-primary/5"
            )}
          />
        );

      case 'select':
        return (
          <Select 
            value={value || 'all'}
            onValueChange={(val) => updateLocal(filter.id, val === 'all' ? null : val)}
          >
            <SelectTrigger className={cn(
              "h-8 text-xs",
              hasValue && "border-primary bg-primary/5"
            )}>
              <SelectValue placeholder={`Select ${filter.label}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">All</SelectItem>
              {filter.options?.slice(0, 8).map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-xs">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'radio':
        const radioValue = value || '';
        return (
          <div className="grid grid-cols-2 gap-1">
            {filter.options?.slice(0, 4).map((option) => (
              <label
                key={option.value}
                className={cn(
                  "flex items-center space-x-1 p-1.5 rounded text-xs cursor-pointer transition-colors",
                  "hover:bg-muted/50",
                  radioValue === option.value && "bg-primary text-primary-foreground"
                )}
              >
                <input
                  type="radio"
                  name={filter.id}
                  value={option.value}
                  checked={radioValue === option.value}
                  onChange={(e) => updateLocal(filter.id, e.target.value)}
                  className="hidden"
                />
                <span className="truncate">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        const checkboxValue = Array.isArray(value) ? value : [];
        return (
          <div className="grid grid-cols-2 gap-1">
            {filter.options?.slice(0, 6).map((option) => {
              const isChecked = checkboxValue.includes(option.value);
              return (
                <label
                  key={option.value}
                  className={cn(
                    "flex items-center space-x-1 p-1.5 rounded text-xs cursor-pointer transition-colors",
                    "hover:bg-muted/50",
                    isChecked && "bg-primary text-primary-foreground"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                      const newValue = e.target.checked
                        ? [...checkboxValue, option.value]
                        : checkboxValue.filter(v => v !== option.value);
                      updateLocal(filter.id, newValue.length > 0 ? newValue : null);
                    }}
                    className="hidden"
                  />
                  {isChecked && <Check className="h-2 w-2" />}
                  <span className="truncate">{option.label}</span>
                </label>
              );
            })}
          </div>
        );

      case 'date':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-8 text-xs",
                  !value && "text-muted-foreground",
                  hasValue && "border-primary bg-primary/5"
                )}
              >
                <CalendarIcon className="mr-1 h-3 w-3" />
                {value ? format(value, "MMM dd, yyyy") : "Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={value}
                onSelect={(date) => updateLocal(filter.id, date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );

      default:
        return (
          <Input
            placeholder={filter.placeholder || "Enter value"}
            value={value || ''}
            onChange={(e) => updateLocal(filter.id, e.target.value)}
            className={cn(
              "h-8 text-xs",
              hasValue && "border-primary bg-primary/5"
            )}
          />
        );
    }
  };

  return (
    <div className={cn("h-screen flex flex-col bg-background border-r border-border shadow-sm", className)}>
      {/* Header with Apply/Clear */}
      <div className="border-b bg-background">
        <div className="p-4 pb-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-foreground" />
              <h2 className="font-semibold text-sm text-foreground">Filters</h2>
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="text-xs h-4 px-1.5">
                  {activeFilterCount}
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleApply}
                disabled={!hasChanges || loading}
                size="sm"
                className="text-xs h-7 px-3 font-medium"
              >
                Apply
              </Button>
              <Button
                variant="outline"
                onClick={handleClear}
                disabled={activeFilterCount === 0 && !hasChanges}
                size="sm"
                className="text-xs h-7 px-2"
              >
                <RotateCcw className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Status & Active Filters */}
          {hasChanges && (
            <div className="flex items-center gap-2 mb-3 px-2 py-1.5 bg-amber-50 border border-amber-200 rounded text-xs text-amber-700">
              <div className="h-1.5 w-1.5 bg-amber-500 rounded-full"></div>
              <span>Changes pending</span>
            </div>
          )}
          
          {showActiveFilters && activeFilterCount > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-medium text-muted-foreground">Active Filters:</span>
              <div className="flex flex-wrap gap-1">
                {Object.entries(filters).map(([filterId, filterValue]) => (
                  <Badge 
                    key={filterId} 
                    variant="outline" 
                    className="text-xs h-5 px-2 bg-blue-50 border-blue-200 text-blue-700"
                  >
                    {getFilterLabel(filterId, filterValue)}
                    <button
                      onClick={() => removeFilter(filterId)}
                      className="ml-1 hover:text-red-600 transition-colors"
                    >
                      <X className="h-2 w-2" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter Content - Clean Grid Layout */}
      <div className="flex-1 overflow-y-auto bg-gray-50/30">
        <div className="p-4 space-y-6">
          {sections.map((section, index) => (
            <div key={section.id} className="bg-white border border-border rounded-lg shadow-sm">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                  {section.icon && <section.icon className="h-4 w-4 text-gray-600" />}
                  <h3 className="font-medium text-sm text-gray-900">{section.title}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.filters
                    .filter(filter => filter.type !== 'search')
                    .map((filter) => (
                      <div key={filter.id} className="space-y-2">
                        <Label className="text-xs font-medium text-gray-700">
                          {filter.label}
                          {filter.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </Label>
                        {renderFilter(filter)}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer with Quick Actions */}
      <div className="border-t bg-white p-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">
            {hasChanges ? (
              <span className="text-amber-600 font-medium">
                {Object.keys(localValues).length} change{Object.keys(localValues).length !== 1 ? 's' : ''} pending
              </span>
            ) : (
              <span>
                {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
              </span>
            )}
          </span>
          {(hasChanges || activeFilterCount > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={hasChanges ? handleApply : handleClear}
              className="text-xs h-6 px-3 font-medium"
            >
              {hasChanges ? "Apply All" : "Clear All"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BaseFilter;