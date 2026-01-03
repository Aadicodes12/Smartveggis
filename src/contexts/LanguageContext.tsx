"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string; // Translation function
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    'login_title': 'Login to SmartVegis',
    'login_description': 'Enter your details to access the marketplace.',
    'email_label': 'Email',
    'phone_label': 'Mobile Number',
    'password_label': 'Password',
    'sign_in_button': 'Sign In',
    'sign_up_button': 'Sign Up',
    'forgot_password': 'Forgot password?',
    'no_account': 'Don\'t have an account?',
    'already_account': 'Already have an account?',
    'toggle_language': 'Toggle Language',
    'client_login_redirect': 'Are you a client? Login here',
    'vendor_login_redirect': 'Are you a vendor? Login here',
    'welcome_client': 'Welcome, Client!',
    'welcome_vendor': 'Welcome, Vendor!',
    'profile_card_title': 'Your Profile',
    'first_name': 'First Name',
    'last_name': 'Last Name',
    'email': 'Email',
    'phone': 'Phone',
    'location': 'Location',
    'role': 'Role',
    'update_profile': 'Update Profile',
    'update_success': 'Profile updated successfully!',
    'update_error': 'Failed to update profile.',
    'logout': 'Logout',
  },
  hi: {
    'login_title': 'स्मार्टवेजिस में लॉग इन करें',
    'login_description': 'मार्केटप्लेस तक पहुंचने के लिए अपना विवरण दर्ज करें।',
    'email_label': 'ईमेल',
    'phone_label': 'मोबाइल नंबर',
    'password_label': 'पासवर्ड',
    'sign_in_button': 'साइन इन करें',
    'sign_up_button': 'साइन अप करें',
    'forgot_password': 'पासवर्ड भूल गए?',
    'no_account': 'खाता नहीं है?',
    'already_account': 'पहले से ही खाता है?',
    'toggle_language': 'भाषा बदलें',
    'client_login_redirect': 'क्या आप ग्राहक हैं? यहां लॉग इन करें',
    'vendor_login_redirect': 'क्या आप विक्रेता हैं? यहां लॉग इन करें',
    'welcome_client': 'स्वागत है, ग्राहक!',
    'welcome_vendor': 'स्वागत है, विक्रेता!',
    'profile_card_title': 'आपकी प्रोफाइल',
    'first_name': 'पहला नाम',
    'last_name': 'अंतिम नाम',
    'email': 'ईमेल',
    'phone': 'फ़ोन',
    'location': 'स्थान',
    'role': 'भूमिका',
    'update_profile': 'प्रोफ़ाइल अपडेट करें',
    'update_success': 'प्रोफ़ाइल सफलतापूर्वक अपडेट की गई!',
    'update_error': 'प्रोफ़ाइल अपडेट करने में विफल।',
    'logout': 'लॉग आउट',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'hi' : 'en'));
  };

  const t = (key: string) => {
    return translations[language][key] || key; // Fallback to key if translation not found
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};