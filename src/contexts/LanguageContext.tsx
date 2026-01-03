"use client";

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

interface LanguageContextType {
  language: 'en' | 'hi';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<'en' | 'hi', Record<string, string>> = {
  en: {
    // General
    navigation: 'Navigation',
    dashboard_home: 'Dashboard Home',
    my_orders: 'My Orders',
    favorite_vendors: 'Favorite Vendors',
    filters: 'Filters',
    category: 'Category',
    category_filter_desc: 'Filter by product category',
    vendor_rating: 'Vendor Rating',
    vendor_rating_filter_desc: 'Filter by vendor rating',
    price_range: 'Price Range',
    price_range_filter_desc: 'Filter by product price range',
    delivery_location: 'Delivery Location',
    delivery_location_filter_desc: 'Filter by delivery location',
    toggle_navigation_menu: 'Toggle navigation menu',
    search_placeholder: 'Search products or vendors...',
    cart: 'Cart',
    your_cart: 'Your Cart ({{count}} items)',
    cart_empty: 'Your cart is empty.',
    total: 'Total',
    proceed_to_checkout: 'Proceed to Checkout',
    notifications: 'Notifications',
    profile: 'Profile',
    remove_item: 'Remove item from cart',

    // Auth Page
    login_title: 'Welcome to SmartVegis',
    login_description: 'Sign in or create an account to continue.',
    email_label: 'Email',
    password_label: 'Password',
    phone_label: 'Phone Number',
    sign_in_button: 'Sign In',
    sign_up_button: 'Sign Up',
    already_account: 'Already have an account? Sign In',
    no_account: 'Don\'t have an account? Sign Up',
    forgot_password: 'Forgot password?',

    // Client Orders Page
    my_orders_title: 'My Orders',
    my_orders_description: 'View the status and details of your past and current orders.',
    order_history: 'Order History',
    no_orders_yet: 'You have no orders yet.',
    order_id: 'Order ID',
    date: 'Date',
    vendor: 'Vendor',
    total: 'Total',
    status: 'Status',
    details: 'Details',
    back_to_dashboard: 'Back to Dashboard',

    // Client Favorite Vendors Page
    favorite_vendors_title: 'My Favorite Vendors',
    favorite_vendors_description: 'Browse your preferred vendors and their offerings.',
    no_favorite_vendors: 'You haven\'t favorited any vendors yet.',
  },
  hi: {
    // General
    navigation: 'नेविगेशन',
    dashboard_home: 'डैशबोर्ड होम',
    my_orders: 'मेरे आदेश',
    favorite_vendors: 'पसंदीदा विक्रेता',
    filters: 'फ़िल्टर',
    category: 'श्रेणी',
    category_filter_desc: 'उत्पाद श्रेणी के अनुसार फ़िल्टर करें',
    vendor_rating: 'विक्रेता रेटिंग',
    vendor_rating_filter_desc: 'विक्रेता रेटिंग के अनुसार फ़िल्टर करें',
    price_range: 'मूल्य सीमा',
    price_range_filter_desc: 'उत्पाद मूल्य सीमा के अनुसार फ़िल्टर करें',
    delivery_location: 'वितरण स्थान',
    delivery_location_filter_desc: 'वितरण स्थान के अनुसार फ़िल्टर करें',
    toggle_navigation_menu: 'नेविगेशन मेनू टॉगल करें',
    search_placeholder: 'उत्पादों या विक्रेताओं को खोजें...',
    cart: 'कार्ट',
    your_cart: 'आपका कार्ट ({{count}} आइटम)',
    cart_empty: 'आपका कार्ट खाली है।',
    total: 'कुल',
    proceed_to_checkout: 'चेकआउट के लिए आगे बढ़ें',
    notifications: 'सूचनाएं',
    profile: 'प्रोफ़ाइल',
    remove_item: 'कार्ट से आइटम हटाएँ',

    // Auth Page
    login_title: 'स्मार्टवेजिस में आपका स्वागत है',
    login_description: 'जारी रखने के लिए साइन इन करें या एक खाता बनाएं।',
    email_label: 'ईमेल',
    password_label: 'पासवर्ड',
    phone_label: 'फ़ोन नंबर',
    sign_in_button: 'साइन इन करें',
    sign_up_button: 'साइन अप करें',
    already_account: 'पहले से ही खाता है? साइन इन करें',
    no_account: 'खाता नहीं है? साइन अप करें',
    forgot_password: 'पासवर्ड भूल गए?',

    // Client Orders Page
    my_orders_title: 'मेरे आदेश',
    my_orders_description: 'अपने पिछले और वर्तमान आदेशों की स्थिति और विवरण देखें।',
    order_history: 'आदेश इतिहास',
    no_orders_yet: 'आपके पास अभी तक कोई आदेश नहीं है।',
    order_id: 'आदेश आईडी',
    date: 'दिनांक',
    vendor: 'विक्रेता',
    total: 'कुल',
    status: 'स्थिति',
    details: 'विवरण',
    back_to_dashboard: 'डैशबोर्ड पर वापस',

    // Client Favorite Vendors Page
    favorite_vendors_title: 'मेरे पसंदीदा विक्रेता',
    favorite_vendors_description: 'अपने पसंदीदा विक्रेताओं और उनके प्रस्तावों को ब्राउज़ करें।',
    no_favorite_vendors: 'आपने अभी तक किसी विक्रेता को पसंदीदा नहीं बनाया है।',
  },
};

const LanguageContextProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const toggleLanguage = useCallback(() => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'hi' : 'en'));
  }, []);

  const t = useCallback((key: string, replacements?: Record<string, string | number>) => {
    let translatedText = translations[language][key] || key;
    if (replacements) {
      for (const rKey in replacements) {
        translatedText = translatedText.replace(`{{${rKey}}}`, String(replacements[rKey]));
      }
    }
    return translatedText;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
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