import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type UserTier = 'pulse_only' | 'orbit_only' | 'bundle' | 'admin' | null;

interface AuthContextType {
  user: any;
  tier: UserTier;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, tier: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [tier, setTier] = useState<UserTier>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserTier(session.user.id);
      } else {
        // Fallback for local dev without a logged-in user, treat as bundle to allow editing
        setTier('bundle');
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserTier(session.user.id);
      } else {
        setTier('bundle'); // Fallback for local dev
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserTier = async (userId: string) => {
    const { data, error } = await supabase
      .from('dim_users')
      .select('access_tier')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user tier:', error);
      // Fallback for dev / if table doesn't exist yet
      setTier('bundle'); 
    } else {
      setTier(data?.access_tier || 'pulse_only');
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, tier, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
