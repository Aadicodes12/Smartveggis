"use client";

import React, { useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";

const AuthPage = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [view, setView] = useState<'sign_in' | 'sign_up' | 'forgotten_password' | 'update_password'>('sign_in');

  // Custom localization for Supabase Auth UI
  const localization = {
    en: {
      sign_in: {
        email_label: t('email_label'),
        password_label: t('password_label'),
        email_input_placeholder: 'Your email address',
        password_input_placeholder: 'Your password',
        button_label: t('sign_in_button'),
        social_auth_text: 'Sign in with',
        link_text: t('already_account'),
        forgotten_password_link_text: t('forgot_password'),
        phone_label: t('phone_label'),
        phone_input_placeholder: 'Your phone number',
      },
      sign_up: {
        email_label: t('email_label'),
        password_label: t('password_label'),
        email_input_placeholder: 'Your email address',
        password_input_placeholder: 'Create a password',
        button_label: t('sign_up_button'),
        social_auth_text: 'Sign up with',
        link_text: t('no_account'),
        phone_label: t('phone_label'),
        phone_input_placeholder: 'Your phone number',
      },
      forgotten_password: {
        email_label: t('email_label'),
        email_input_placeholder: 'Your email address',
        button_label: 'Send reset instructions',
        link_text: 'Remember your password?',
      },
      update_password: {
        password_label: t('password_label'),
        password_input_placeholder: 'Your new password',
        button_label: 'Update password',
      },
      magic_link: {
        email_input_placeholder: 'Your email address',
        button_label: 'Send Magic Link',
        link_text: 'Send a magic link email',
      },
      verify_otp: {
        email_input_placeholder: 'Your email address',
        phone_input_placeholder: 'Your phone number',
        email_label: 'Email',
        phone_label: 'Phone',
        token_input_placeholder: 'Your OTP',
        button_label: 'Verify OTP',
        link_text: 'Already have an account?',
      },
    },
    hi: {
      sign_in: {
        email_label: t('email_label'),
        password_label: t('password_label'),
        email_input_placeholder: 'आपका ईमेल पता',
        password_input_placeholder: 'आपका पासवर्ड',
        button_label: t('sign_in_button'),
        social_auth_text: 'इसके साथ साइन इन करें',
        link_text: t('already_account'),
        forgotten_password_link_text: t('forgot_password'),
        phone_label: t('phone_label'),
        phone_input_placeholder: 'आपका मोबाइल नंबर',
      },
      sign_up: {
        email_label: t('email_label'),
        password_label: t('password_label'),
        email_input_placeholder: 'आपका ईमेल पता',
        password_input_placeholder: 'एक पासवर्ड बनाएं',
        button_label: t('sign_up_button'),
        social_auth_text: 'इसके साथ साइन अप करें',
        link_text: t('no_account'),
        phone_label: t('phone_label'),
        phone_input_placeholder: 'आपका मोबाइल नंबर',
      },
      forgotten_password: {
        email_label: t('email_label'),
        email_input_placeholder: 'आपका ईमेल पता',
        button_label: 'रीसेट निर्देश भेजें',
        link_text: 'अपना पासवर्ड याद है?',
      },
      update_password: {
        password_label: t('password_label'),
        password_input_placeholder: 'आपका नया पासवर्ड',
        button_label: 'पासवर्ड अपडेट करें',
      },
      magic_link: {
        email_input_placeholder: 'आपका ईमेल पता',
        button_label: 'मैजिक लिंक भेजें',
        link_text: 'एक मैजिक लिंक ईमेल भेजें',
      },
      verify_otp: {
        email_input_placeholder: 'आपका ईमेल पता',
        phone_input_placeholder: 'आपका मोबाइल नंबर',
        email_label: 'ईमेल',
        phone_label: 'फ़ोन',
        token_input_placeholder: 'आपका ओटीपी',
        button_label: 'ओटीपी सत्यापित करें',
        link_text: 'पहले से ही खाता है?',
      },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t('login_title')}</CardTitle>
          <CardDescription>{t('login_description')}</CardDescription>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="mt-4 self-end flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            {language === 'en' ? 'हिंदी' : 'English'}
          </Button>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            providers={[]} // No third-party providers for now
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(142.1 76.2% 36.3%)', // Green-600
                    brandAccent: 'hsl(142.1 76.2% 30%)', // Darker Green
                  },
                },
              },
            }}
            theme="light" // Use light theme
            view={view}
            onAuthStateChange={(event, session) => {
              if (event === 'SIGNED_IN' || event === 'SIGNED_UP') {
                // SessionContext will handle redirection
              }
            }}
            localization={{
              variables: localization[language],
            }}
            phone
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;