"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Bell, Home, Package, Heart, Search, Menu, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext"; // Import useLanguage

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantityUnit: string;
  orderedQuantity: number;
}

interface BuyerDashboardLayoutProps {
  children: React.ReactNode;
  cartItems: CartItem[];
  onSearch: (query: string) => void;
  onRemoveFromCart: (productId: string) => void; // New prop for removing items
}

const BuyerDashboardLayout: React.FC<BuyerDashboardLayoutProps> = ({ children, cartItems, onSearch, onRemoveFromCart }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  const { t } = useLanguage(); // Use the translation hook

  const totalCartValue = cartItems.reduce((sum, item) => sum + item.price * item.orderedQuantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const sidebarContent = (
    <nav className="space-y-2 p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">{t('navigation')}</h3>
      <Link to="/client-dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-green-600 bg-green-50 dark:bg-gray-700 dark:text-green-400 transition-all hover:text-green-700 dark:hover:text-green-300">
        <Home className="h-5 w-5" />
        {t('dashboard_home')}
      </Link>
      <Link to="/client-orders" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-all hover:text-green-700 dark:hover:text-green-300">
        <Package className="h-5 w-5" />
        {t('my_orders')}
      </Link>
      <Link to="/client-favorite-vendors" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-all hover:text-green-700 dark:hover:text-green-300">
        <Heart className="h-5 w-5" />
        {t('favorite_vendors')}
      </Link>

      <Separator className="my-6" />

      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">{t('filters')}</h3>
      <div className="space-y-4">
        {/* Placeholder for Category Filter */}
        <div>
          <h4 className="font-medium text-gray-700 dark:text-gray-300">{t('category')}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('category_filter_desc')}</p>
        </div>
        {/* Placeholder for Vendor Rating Filter */}
        <div>
          <h4 className="font-medium text-gray-700 dark:text-gray-300">{t('vendor_rating')}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('vendor_rating_filter_desc')}</p>
        </div>
        {/* Placeholder for Price Range Filter */}
        <div>
          <h4 className="font-medium text-gray-700 dark:text-gray-300">{t('price_range')}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('price_range_filter_desc')}</p>
        </div>
        {/* Placeholder for Delivery Location Filter */}
        <div>
          <h4 className="font-medium text-gray-700 dark:text-gray-300">{t('delivery_location')}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('delivery_location_filter_desc')}</p>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-gray-800 shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">{t('toggle_navigation_menu')}</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <SheetHeader className="p-4 border-b">
                    <SheetTitle className="text-xl font-bold text-green-700 dark:text-green-400">Smartvegis</SheetTitle>
                  </SheetHeader>
                  {sidebarContent}
                </SheetContent>
              </Sheet>
            )}
            <Link to="/client-dashboard" className="text-2xl font-bold text-green-700 dark:text-green-400">
              Smartvegis
            </Link>
          </div>

          <div className="flex-1 mx-4 max-w-md hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder={t('search_placeholder')}
                className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:ring-green-500 focus:border-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          <nav className="flex items-center space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  {cartItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 rounded-full bg-red-500 text-white">
                      {cartItems.length}
                    </Badge>
                  )}
                  <span className="sr-only">{t('cart')}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <h4 className="font-semibold text-lg mb-2">{t('your_cart', { count: cartItems.length })}</h4>
                <Separator className="mb-3" />
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">{t('cart_empty')}</p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <span>{item.name} ({item.orderedQuantity} {item.quantityUnit})</span>
                        <div className="flex items-center gap-2">
                          <span>₹{(item.price * item.orderedQuantity).toFixed(2)}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                            onClick={() => onRemoveFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove {item.name} from cart</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Separator className="my-3" />
                <div className="flex justify-between items-center font-bold text-base">
                  <span>{t('total')}:</span>
                  <span>₹{totalCartValue.toFixed(2)}</span>
                </div>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                  {t('proceed_to_checkout')}
                </Button>
              </PopoverContent>
            </Popover>

            <Button variant="ghost" size="icon">
              <Bell className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              <span className="sr-only">{t('notifications')}</span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              <span className="sr-only">{t('profile')}</span>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Left Column: Navigation & Filters (Hidden on mobile, shown on larger screens) */}
        <aside className="hidden md:block w-64 border-r bg-white dark:bg-gray-800 p-4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          {sidebarContent}
        </aside>

        {/* Right Column: Main Listings */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default BuyerDashboardLayout;