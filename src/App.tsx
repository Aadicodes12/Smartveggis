import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClientLoginPage from "./pages/ClientLoginPage";
import VendorLoginPage from "./pages/VendorLoginPage";
import ClientDashboard from "./pages/ClientDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import ClientOrdersPage from "./pages/ClientOrdersPage";
import ClientFavoriteVendorsPage from "./pages/ClientFavoriteVendorsPage";
import AuthPage from "./pages/AuthPage"; // New import
import { LanguageProvider } from "./contexts/LanguageContext"; // New import
import { SessionProvider } from "./contexts/SessionContext"; // New import

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <BrowserRouter>
          <SessionProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} /> {/* New Auth route */}
              <Route path="/client-login" element={<ClientLoginPage />} />
              <Route path="/vendor-login" element={<VendorLoginPage />} />
              <Route path="/client-dashboard" element={<ClientDashboard />} />
              <Route path="/vendor-dashboard" element={<VendorDashboard />} />
              <Route path="/vendor-add-product" element={<AddProductPage />} />
              <Route path="/vendor-edit-product/:productId" element={<EditProductPage />} />
              <Route path="/client-orders" element={<ClientOrdersPage />} />
              <Route path="/client-favorite-vendors" element={<ClientFavoriteVendorsPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SessionProvider>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;