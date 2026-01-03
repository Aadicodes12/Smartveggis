"use client";

import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // User is signed in, redirect to client dashboard
        navigate('/client-dashboard');
      }
    });

    // Check initial session state
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/client-dashboard');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t('login_title')}</CardTitle>
          <CardDescription>{t('login_description')}</CardDescription>
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
                    brandAccent: 'hsl(142.1 76.2% 26.3%)', // Darker Green
                  },
                },
              },
            }}
            theme="light" // Use light theme by default
            redirectTo={window.location.origin + '/client-dashboard'} // Redirect after successful auth
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;