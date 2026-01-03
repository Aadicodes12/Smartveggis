"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define your translations here
const translations = {
  en: {
    navigation: "Navigation",
    dashboard_home: "Dashboard Home",
    my_orders: "My Orders",
    favorite_vendors: "Favorite Vendors",
    filters: "Filters",
    category: "Category",
    category_filter_desc: "Filter by product category",
    vendor_rating: "Vendor Rating",
    vendor_rating_filter_desc: "Filter by vendor's average rating",
    price_range: "Price Range",
    price_range_filter_desc: "Filter products by price range",
    delivery_location: "Delivery Location",
    delivery_location_filter_desc: "Filter by delivery area",
    toggle_navigation_menu: "Toggle navigation menu",
    search_placeholder: "Search products or vendors...",
    cart: "Cart",
    your_cart: "Your Cart ({{count}} items)",
    cart_empty: "Your cart is empty.",
    total: "Total",
    proceed_to_checkout: "Proceed to Checkout",
    notifications: "Notifications",
    profile: "Profile",
    login_title: "Sign In / Sign Up",
    login_description: "Enter your email and password to sign in or create a new account.",
    my_orders_title: "My Orders",
    my_orders_description: "View the status and details of your past and current orders.",
    order_history: "Order History",
    no_orders_yet: "You haven't placed any orders yet.",
    order_id: "Order ID",
    date: "Date",
    vendor: "Vendor",
    total: "Total",
    status: "Status",
    details: "Details",
    back_to_dashboard: "Back to Dashboard",
    favorite_vendors_title: "My Favorite Vendors",
    favorite_vendors_description: "Manage your preferred vendors for quick access to their products.",
    no_favorite_vendors: "You haven't added any favorite vendors yet.",
  },
  // Add other languages here if needed
  // es: {
  //   navigation: "Navegación",
  //   // ...
  // }
};

type Language = keyof typeof translations;
type TranslationKeys = keyof typeof translations['en'];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LanguageContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en'); // Default language

  const t = (key: TranslationKeys, params?: Record<string, string | number>): string => {
    let text = translations[language][key] || key; // Fallback to key if translation not found
    if (params) {
      for (const paramKey in params) {
        text = text.replace(`{{${paramKey}}}`, String(params[paramKey]));
      }
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageContextProvider');
  }
  return context;
};

export default LanguageContextProvider;