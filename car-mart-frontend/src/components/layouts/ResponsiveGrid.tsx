// src/components/layouts/ResponsiveGrid.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  gap?: 'sm' | 'md' | 'lg';
  minItemWidth?: string;
  maxColumns?: number;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className,
  gap = 'md',
  minItemWidth = '280px',
  maxColumns = 4
}) => {
  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4 md:gap-6',
    lg: 'gap-6 md:gap-8'
  };

  const gridClass = cn(
    // Base grid
    "grid w-full",
    // Responsive columns based on maxColumns
    maxColumns >= 1 && "grid-cols-1",
    maxColumns >= 2 && "sm:grid-cols-2",
    maxColumns >= 3 && "lg:grid-cols-3",
    maxColumns >= 4 && "xl:grid-cols-4",
    maxColumns >= 5 && "2xl:grid-cols-5",
    // Gap
    gapClasses[gap],
    className
  );

  return (
    <div 
      className={gridClass}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${minItemWidth}, 1fr))`
      }}
    >
      {children}
    </div>
  );
};