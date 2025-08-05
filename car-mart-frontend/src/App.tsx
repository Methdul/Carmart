// car-mart-frontend/src/App.tsx
// ✅ UPDATED - SearchPage → VehiclesPage Migration

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // ✅ Added Navigate
import ErrorBoundary, { DefaultErrorFallback } from "@/components/ErrorBoundary";
import { Suspense, lazy } from "react";
import { LoadingSpinner } from "@/components/ErrorBoundary";
import StaffLoginPage from './pages/staff/StaffLoginPage';
import StaffDashboardPage from './pages/staff/StaffDashboardPage';

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const ListVehiclePage = lazy(() => import("./pages/ListVehiclePage"));
const ListRentalPage = lazy(() => import("./pages/ListRentalPage"));

// ✅ NEW: VehiclesPage replaces SearchPage
const VehiclesPage = lazy(() => import("./pages/VehiclesPage"));
// ❌ REMOVED: SearchPage - migrating to VehiclesPage
// const SearchPage = lazy(() => import("./pages/SearchPage"));

const VehicleDetailPage = lazy(() => import("./pages/VehicleDetailPage"));
const RentalDetailPage = lazy(() => import("./pages/RentalDetailPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const PartsPage = lazy(() => import("./pages/PartsPage"));
const PartDetailPage = lazy(() => import("./pages/PartDetailPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage"));
const ListPartsPage = lazy(() => import("./pages/ListPartsPage"));
const ListServicesPage = lazy(() => import("./pages/ListServicesPage"));
const ComparisonPage = lazy(() => import("./pages/ComparisonPage"));
const RentalsPage = lazy(() => import("./pages/RentalsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

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
        if (process.env.NODE_ENV === 'development') {
          console.error('App-level error:', error, errorInfo);
        }
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
                
                {/* AUTHENTICATION ROUTES */}
                <Route path="/auth" element={<SafeRoute element={AuthPage} />} />
                <Route path="/login" element={<SafeRoute element={AuthPage} />} /> 
                <Route path="/register" element={<SafeRoute element={AuthPage} />} />
                
                {/* ✅ VEHICLE ROUTES - Updated */}
                <Route path="/vehicles" element={<SafeRoute element={VehiclesPage} />} />
                <Route path="/vehicles/:id" element={<SafeRoute element={VehicleDetailPage} />} />
                <Route path="/list-vehicle" element={<SafeRoute element={ListVehiclePage} />} />
                
                {/* ✅ MIGRATION REDIRECTS - Keep old URLs working */}
                <Route path="/search" element={<Navigate to="/vehicles" replace />} />
                <Route path="/buy" element={<Navigate to="/vehicles" replace />} />
                <Route path="/buy-vehicles" element={<Navigate to="/vehicles" replace />} />
                
                {/* RENTAL ROUTES */}
                <Route path="/rentals" element={<SafeRoute element={RentalsPage} />} />
                <Route path="/rentals/:id" element={<SafeRoute element={RentalDetailPage} />} />
                <Route path="/list-rental" element={<SafeRoute element={ListRentalPage} />} />
                
                {/* PARTS ROUTES */}
                <Route path="/parts" element={<SafeRoute element={PartsPage} />} />
                <Route path="/parts/:category" element={<SafeRoute element={PartsPage} />} />
                <Route path="/part/:id" element={<SafeRoute element={PartDetailPage} />} />
                <Route path="/list-parts" element={<SafeRoute element={ListPartsPage} />} />
                
                {/* SERVICES ROUTES */}
                <Route path="/services" element={<SafeRoute element={ServicesPage} />} />
                <Route path="/services/:category" element={<SafeRoute element={ServicesPage} />} />
                <Route path="/service/:id" element={<SafeRoute element={ServiceDetailPage} />} />
                <Route path="/list-services" element={<SafeRoute element={ListServicesPage} />} />
                
                {/* USER ROUTES */}
                <Route path="/dashboard" element={<SafeRoute element={DashboardPage} />} />
                <Route path="/compare" element={<SafeRoute element={ComparisonPage} />} />
                
                {/* STAFF ROUTES */}
                <Route path="/staff/login" element={<StaffLoginPage />} />
                <Route path="/staff/dashboard" element={<StaffDashboardPage />} />
                
                {/* 404 */}
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