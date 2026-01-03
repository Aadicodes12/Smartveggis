import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClientDashboard from "./pages/ClientDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import ClientOrdersPage from "./pages/ClientOrdersPage";
import ClientFavoriteVendorsPage from "./pages/ClientFavoriteVendorsPage";
import AuthPage from "./pages/AuthPage";
import SessionContextProvider from "./contexts/SessionContext";
import LanguageContextProvider from "./contexts/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageContextProvider>
          <SessionContextProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} /> {/* New Auth Page */}
              <Route path="/client-dashboard" element={<ClientDashboard />} />
              <Route path="/client-orders" element={<ClientOrdersPage />} /> {/* New Client Orders Page */}
              <Route path="/client-favorite-vendors" element={<ClientFavoriteVendorsPage />} /> {/* New Client Favorite Vendors Page */}
              <Route path="/vendor-dashboard" element={<VendorDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SessionContextProvider>
        </LanguageContextProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;