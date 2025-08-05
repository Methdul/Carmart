// src/components/ui/EmptyState.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'secondary';
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className
}) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
        {Icon && (
          <div className="mb-4 p-3 rounded-full bg-muted">
            <Icon className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
        
        <h3 className="text-lg font-semibold mb-2">
          {title}
        </h3>
        
        {description && (
          <p className="text-muted-foreground mb-6 max-w-sm">
            {description}
          </p>
        )}
        
        {action && (
          <Button
            variant={action.variant || 'default'}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};