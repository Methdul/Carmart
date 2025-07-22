import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Error Boundary Props
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

// Main Error Boundary Component
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo);
    }
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided, otherwise use default
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <DefaultErrorFallback onRetry={() => this.setState({ hasError: false })} />;
    }

    return this.props.children;
  }
}

// Default Error Fallback Component
interface DefaultErrorFallbackProps {
  onRetry?: () => void;
  title?: string;
  message?: string;
}

export const DefaultErrorFallback: React.FC<DefaultErrorFallbackProps> = ({
  onRetry,
  title = "Something went wrong",
  message = "We're sorry, but something unexpected happened. Please try again."
}) => (
  <div className="min-h-[400px] flex items-center justify-center p-4">
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6 text-destructive" />
        </div>
        <CardTitle className="text-xl text-destructive">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{message}</p>
        <div className="flex gap-2 justify-center">
          {onRetry && (
            <Button onClick={onRetry} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
          <Button onClick={() => window.location.href = '/'}>
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Loading Component
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; message?: string }> = ({ 
  size = 'md',
  message = 'Loading...'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-primary border-t-transparent mb-4`} />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};

// Empty State Component
export const EmptyState: React.FC<{
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}> = ({ icon, title, description, action }) => (
  <div className="text-center py-12">
    {icon && <div className="mx-auto w-12 h-12 mb-4 text-muted-foreground">{icon}</div>}
    <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
    {description && <p className="text-muted-foreground mb-4">{description}</p>}
    {action}
  </div>
);

// API Error Component
export const ApiErrorDisplay: React.FC<{
  error?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}> = ({ error = 'Failed to load data', onRetry, showRetry = true }) => (
  <Card className="border-destructive/20">
    <CardContent className="p-6 text-center">
      <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-4" />
      <h3 className="font-semibold text-destructive mb-2">Error Loading Data</h3>
      <p className="text-muted-foreground mb-4">{error}</p>
      {showRetry && onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </Button>
      )}
    </CardContent>
  </Card>
);

// Safe Image Component with fallback
export const SafeImage: React.FC<{
  src?: string;
  alt: string;
  className?: string;
  fallback?: string;
}> = ({ src, alt, className, fallback = '/api/placeholder/400/300' }) => {
  const [imgSrc, setImgSrc] = React.useState(src || fallback);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setImgSrc(src || fallback);
    setHasError(false);
  }, [src, fallback]);

  const handleError = () => {
    if (!hasError && imgSrc !== fallback) {
      setHasError(true);
      setImgSrc(fallback);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

// Safe data access utility functions
export const safeGet = (obj: any, path: string, defaultValue: any = null) => {
  try {
    return path.split('.').reduce((current, key) => current?.[key], obj) ?? defaultValue;
  } catch {
    return defaultValue;
  }
};

export const safeArray = (arr: any): any[] => {
  return Array.isArray(arr) ? arr : [];
};

export const safeString = (str: any, defaultValue: string = ''): string => {
  return typeof str === 'string' ? str : defaultValue;
};

export const safeNumber = (num: any, defaultValue: number = 0): number => {
  const parsed = Number(num);
  return isNaN(parsed) ? defaultValue : parsed;
};

// Hook for safe API calls
export const useSafeAsync = <T,>(asyncFunction: () => Promise<T>, dependencies: any[] = []) => {
  const [state, setState] = React.useState<{
    data: T | null;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  const execute = React.useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    
    try {
      const result = await asyncFunction();
      setState({ data: result, loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setState({ data: null, loading: false, error: errorMessage });
    }
  }, dependencies);

  React.useEffect(() => {
    execute();
  }, [execute]);

  return { ...state, retry: execute };
};

export default ErrorBoundary;