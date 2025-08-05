// src/components/ui/ErrorState.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  description = "We encountered an error while loading the content. Please try again.",
  onRetry,
  className
}) => {
  return (
    <Card className={cn("w-full border-destructive/20", className)}>
      <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="mb-4 p-3 rounded-full bg-destructive/10">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        
        <h3 className="text-lg font-semibold mb-2 text-destructive">
          {title}
        </h3>
        
        <p className="text-muted-foreground mb-6 max-w-sm">
          {description}
        </p>
        
        {onRetry && (
          <Button
            variant="outline"
            onClick={onRetry}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
};