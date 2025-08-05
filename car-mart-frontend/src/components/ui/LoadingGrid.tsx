// src/components/ui/LoadingGrid.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { ResponsiveGrid } from '@/components/layouts/ResponsiveGrid';
import { cn } from '@/lib/utils';

interface LoadingGridProps {
  count?: number;
  className?: string;
}

export const LoadingGrid: React.FC<LoadingGridProps> = ({
  count = 6,
  className
}) => {
  return (
    <ResponsiveGrid className={className}>
      {Array.from({ length: count }, (_, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="animate-pulse">
            {/* Image skeleton */}
            <div className="h-48 bg-muted" />
            
            {/* Content skeleton */}
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-6 bg-muted rounded w-1/2" />
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
              <div className="flex gap-2 pt-2">
                <div className="h-8 bg-muted rounded flex-1" />
                <div className="h-8 bg-muted rounded flex-1" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </ResponsiveGrid>
  );
};