"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface SessionContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  fetchUserProfile: (userId: string) => Promise<void>;
}

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  location: string | null;
  role: 'client' | 'vendor' | null;
  avatar_url: string | null;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      setProfile(null);
      return null;
    } else if (data) {
      setProfile(data as UserProfile);
      return data as UserProfile;
    }
    setProfile(null);
    return null;
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user || null);
        setIsLoading(true); // Start loading when auth state changes

        let fetchedProfile: UserProfile | null = null;
        if (currentSession?.user) {
          fetchedProfile = await fetchUserProfile(currentSession.user.id);
        } else {
          setProfile(null); // Clear profile if no user
        }
        
        setIsLoading(false); // End loading after profile is potentially fetched/cleared

        if (event === 'SIGNED_IN') {
          if (fetchedProfile?.role === 'vendor') {
            navigate('/vendor-dashboard');
          } else {
            navigate('/client-dashboard');
          }
          toast.success('Logged in successfully!');
        } else if (event === 'SIGNED_OUT') {
          navigate('/');
          toast.info('Logged out.');
        }
      }
    );

    // Initial session check
    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user || null);
      setIsLoading(true); // Start loading for initial check

      if (initialSession?.user) {
        await fetchUserProfile(initialSession.user.id);
      } else {
        setProfile(null); // Clear profile if no initial user
      }
      setIsLoading(false); // End loading for initial check
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to log out.');
    }
  };

  return (
    <SessionContext.Provider value={{ session, user, profile, isLoading, signOut, fetchUserProfile }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};