import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import ListVehiclePage from "./pages/ListVehiclePage";
import SearchPage from "./pages/SearchPage";
import VehicleDetailPage from "./pages/VehicleDetailPage";
import DashboardPage from "./pages/DashboardPage";
import PartsPage from "./pages/PartsPage";
import ServicesPage from "./pages/ServicesPage";
import ListPartsPage from "./pages/ListPartsPage";
import ComparisonPage from "./pages/ComparisonPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/list-vehicle" element={<ListVehiclePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/vehicle/:id" element={<VehicleDetailPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/parts" element={<PartsPage />} />
          <Route path="/parts/:category" element={<PartsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:category" element={<ServicesPage />} />
          <Route path="/list-parts" element={<ListPartsPage />} />
          <Route path="/compare" element={<ComparisonPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
