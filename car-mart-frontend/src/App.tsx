import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary, { DefaultErrorFallback } from "@/components/ErrorBoundary";
import { Suspense, lazy } from "react";
import { LoadingSpinner } from "@/components/ErrorBoundary";
import StaffLoginPage from './pages/staff/StaffLoginPage';
import StaffDashboardPage from './pages/staff/StaffDashboardPage';

// Lazy load components to prevent initial load crashes
const Index = lazy(() => import("./pages/Index"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const ListVehiclePage = lazy(() => import("./pages/ListVehiclePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const VehicleDetailPage = lazy(() => import("./pages/VehicleDetailPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const PartsPage = lazy(() => import("./pages/PartsPage"));
const PartDetailPage = lazy(() => import("./pages/PartDetailPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage"));
const ListPartsPage = lazy(() => import("./pages/ListPartsPage"));
const ListServicesPage = lazy(() => import("./pages/ListServicesPage")); // ADDED THIS LINE
const ComparisonPage = lazy(() => import("./pages/ComparisonPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Create query client with error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Safe Route component with individual error boundaries
const SafeRoute = ({ element }: { element: React.LazyExoticComponent<any> }) => {
  const Component = element;
  return (
    <ErrorBoundary
      fallback={
        <DefaultErrorFallback 
          title="Page Error"
          message="This page encountered an error. Please try refreshing or go back to the homepage."
        />
      }
    >
      <Suspense fallback={<LoadingSpinner size="lg" message="Loading page..." />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
};

const App = () => {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
          console.error('App-level error:', error, errorInfo);
        }
        
        // In production, you might want to send to an error reporting service
        // Example: Sentry.captureException(error);
      }}
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ErrorBoundary fallback={
            <DefaultErrorFallback 
              title="Application Error"
              message="The application encountered an unexpected error. Please refresh the page."
            />
          }>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<SafeRoute element={Index} />} />
                <Route path="/auth" element={<SafeRoute element={AuthPage} />} />
                <Route path="/list-vehicle" element={<SafeRoute element={ListVehiclePage} />} />
                <Route path="/search" element={<SafeRoute element={SearchPage} />} />
                <Route path="/vehicles/:id" element={<SafeRoute element={VehicleDetailPage} />} />
                <Route path="/dashboard" element={<SafeRoute element={DashboardPage} />} />
                <Route path="/parts" element={<SafeRoute element={PartsPage} />} />
                <Route path="/parts/:category" element={<SafeRoute element={PartsPage} />} />
                <Route path="/part/:id" element={<SafeRoute element={PartDetailPage} />} />
                <Route path="/services" element={<SafeRoute element={ServicesPage} />} />
                <Route path="/services/:category" element={<SafeRoute element={ServicesPage} />} />
                <Route path="/service/:id" element={<SafeRoute element={ServiceDetailPage} />} />
                <Route path="/list-parts" element={<SafeRoute element={ListPartsPage} />} />
                <Route path="/list-services" element={<SafeRoute element={ListServicesPage} />} /> {/* ADDED THIS LINE */}
                <Route path="/compare" element={<SafeRoute element={ComparisonPage} />} />
                <Route path="/staff/login" element={<StaffLoginPage />} />
                <Route path="/staff/dashboard" element={<StaffDashboardPage />} />
                <Route path="*" element={<SafeRoute element={NotFound} />} />
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;