// src/components/filters/BaseFilter.tsx
// Fixed version - no empty string values in Select

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  ChevronUp, 
  RotateCcw, 
  Search, 
  CalendarIcon,
  X,
  Filter
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
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    sections.reduce((acc, section) => ({
      ...acc,
      [section.id]: section.defaultOpen ?? true
    }), {})
  );

  // Update filters when initialFilters change
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // Update filter value and notify parent
  const updateFilter = (filterId: string, value: any) => {
    const newFilters = { ...filters };
    
    // ✅ Handle special "all" value - treat as clearing the filter
    if (value === '' || value === null || value === undefined || value === 'all' ||
        (Array.isArray(value) && value.length === 0)) {
      delete newFilters[filterId];
    } else {
      newFilters[filterId] = value;
    }
    
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({});
    onFiltersChange({});
  };

  // Clear specific filter
  const clearFilter = (filterId: string) => {
    const newFilters = { ...filters };
    delete newFilters[filterId];
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  // Toggle section open/closed
  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Get active filter count
  const activeFilterCount = Object.keys(filters).length;

  // Get filter label for display
  const getFilterLabel = (filterId: string, value: any): string => {
    const section = sections.find(s => s.filters.some(f => f.id === filterId));
    const filter = section?.filters.find(f => f.id === filterId);
    
    if (!filter) return '';

    switch (filter.type) {
      case 'select':
      case 'radio':
        const option = filter.options?.find(opt => opt.value === value);
        return option?.label || value;
      
      case 'checkbox':
      case 'multiselect':
        if (Array.isArray(value)) {
          return value.map(v => {
            const opt = filter.options?.find(opt => opt.value === v);
            return opt?.label || v;
          }).join(', ');
        }
        return value;
      
      case 'range':
        if (Array.isArray(value)) {
          return `₹${value[0].toLocaleString()} - ₹${value[1].toLocaleString()}`;
        }
        return value;
      
      case 'date':
        if (value instanceof Date) {
          return format(value, 'MMM dd, yyyy');
        }
        return value;
      
      default:
        return value?.toString() || '';
    }
  };

  // Render individual filter component
  const renderFilter = (filter: FilterOption) => {
    const value = filters[filter.id];

    switch (filter.type) {
      case 'search':
        return (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={filter.placeholder || `Search ${filter.label.toLowerCase()}...`}
              value={value || ''}
              onChange={(e) => updateFilter(filter.id, e.target.value)}
              className="pl-10"
              disabled={loading}
            />
          </div>
        );

      case 'select':
        return (
          <Select 
            value={value || 'all'} // ✅ Default to 'all' instead of empty string
            onValueChange={(val) => updateFilter(filter.id, val === 'all' ? null : val)}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder={filter.placeholder || `Select ${filter.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {/* ✅ Use 'all' instead of empty string */}
              <SelectItem value="all">All {filter.label}</SelectItem>
              {filter.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center justify-between w-full">
                    <span>{option.label}</span>
                    {option.count && (
                      <span className="text-xs text-muted-foreground ml-2">
                        ({option.count})
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'radio':
        return (
          <RadioGroup
            value={value || ''}
            onValueChange={(val) => updateFilter(filter.id, val)}
            className="space-y-2"
            disabled={loading}
          >
            {filter.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${filter.id}-${option.value}`} />
                <Label htmlFor={`${filter.id}-${option.value}`} className="text-sm font-normal flex-1">
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {option.count && (
                      <span className="text-xs text-muted-foreground">
                        ({option.count})
                      </span>
                    )}
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'range':
        const rangeValue = value || [filter.min || 0, filter.max || 100];
        return (
          <div className="space-y-4">
            <div className="px-2">
              <Slider
                value={rangeValue}
                onValueChange={(val) => updateFilter(filter.id, val)}
                max={filter.max || 100}
                min={filter.min || 0}
                step={filter.step || 1}
                className="w-full"
                disabled={loading}
              />
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>₹{rangeValue[0].toLocaleString()}</span>
              <span>₹{rangeValue[1].toLocaleString()}</span>
            </div>
          </div>
        );

      case 'checkbox':
      case 'multiselect':
        const checkboxValues = value || [];
        return (
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {filter.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${filter.id}-${option.value}`}
                  checked={checkboxValues.includes(option.value)}
                  onCheckedChange={(checked) => {
                    const currentValues = checkboxValues;
                    const newValues = checked
                      ? [...currentValues, option.value]
                      : currentValues.filter((v: string) => v !== option.value);
                    updateFilter(filter.id, newValues);
                  }}
                  disabled={loading}
                />
                <Label 
                  htmlFor={`${filter.id}-${option.value}`} 
                  className="text-sm font-normal flex-1 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {option.count && (
                      <span className="text-xs text-muted-foreground">
                        ({option.count})
                      </span>
                    )}
                  </div>
                </Label>
              </div>
            ))}
          </div>
        );

      case 'date':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-start text-left font-normal"
                disabled={loading}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value ? format(value, 'PPP') : (filter.placeholder || 'Select date')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={value}
                onSelect={(date) => updateFilter(filter.id, date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );

      default:
        return (
          <Input
            type="text"
            placeholder={filter.placeholder}
            value={value || ''}
            onChange={(e) => updateFilter(filter.id, e.target.value)}
            disabled={loading}
          />
        );
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Active Filters */}
      {showActiveFilters && activeFilterCount > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Active Filters ({activeFilterCount})
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-auto p-1 text-muted-foreground hover:text-foreground"
                disabled={loading}
              >
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(([filterId, filterValue]) => (
                <Badge
                  key={filterId}
                  variant="secondary"
                  className="flex items-center gap-1 px-2 py-1"
                >
                  <span className="text-xs">
                    {getFilterLabel(filterId, filterValue)}
                  </span>
                  <button
                    onClick={() => clearFilter(filterId)}
                    className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                    disabled={loading}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter Sections */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
              disabled={loading || activeFilterCount === 0}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {sections
            .sort((a, b) => (a.priority || 0) - (b.priority || 0))
            .map((section) => (
            <div key={section.id}>
              {section.collapsible ? (
                <Collapsible
                  open={openSections[section.id]}
                  onOpenChange={() => toggleSection(section.id)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-0 h-auto font-semibold hover:no-underline"
                      disabled={loading}
                    >
                      <div className="flex items-center gap-2">
                        {section.icon && <section.icon className="h-4 w-4" />}
                        {section.title}
                      </div>
                      {openSections[section.id] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 mt-4">
                    {section.filters.map((filter) => (
                      <div key={filter.id} className="space-y-2">
                        <Label className="text-sm font-medium flex items-center justify-between">
                          {filter.label}
                          {filter.required && (
                            <span className="text-destructive">*</span>
                          )}
                        </Label>
                        {renderFilter(filter)}
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 font-semibold">
                    {section.icon && <section.icon className="h-4 w-4" />}
                    {section.title}
                  </div>
                  <div className="space-y-4">
                    {section.filters.map((filter) => (
                      <div key={filter.id} className="space-y-2">
                        <Label className="text-sm font-medium flex items-center justify-between">
                          {filter.label}
                          {filter.required && (
                            <span className="text-destructive">*</span>
                          )}
                        </Label>
                        {renderFilter(filter)}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default BaseFilter;