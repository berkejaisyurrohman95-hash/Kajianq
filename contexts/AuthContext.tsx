import type { Database } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';
import type { User, AuthChangeEvent, Session } from '@supabase/supabase-js'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Gunakan profiles sebagai referensi utama
type UserProfile = any; 

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  role: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, name: string, role: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const getProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles') // Merujuk langsung ke profiles
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  const refreshProfile = async () => {
    if (user) {
      const profileData = await getProfile(user.id);
      setProfile(profileData);
    }
  };

  const clearAuthData = async () => {
    try {
      await AsyncStorage.removeItem('supabase.auth.token');
    } catch (e) {}
  };

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          const profileData = await getProfile(session.user.id);
          setProfile(profileData);
        }
      } catch (error) {
        console.error('Initial session error:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          const profileData = await getProfile(session.user.id);
          setProfile(profileData);
        } else {
          setUser(null);
          setProfile(null);
          if (event === 'SIGNED_OUT') await clearAuthData();
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error: error.message };
      return {};
    } catch (error) {
      return { error: 'Terjadi kesalahan saat login' };
    }
  };

  const signUp = async (email: string, password: string, name: string, role: string) => {
    try {
      const { data, error: authError } = await supabase.auth.signUp({ 
        email, 
        password,
        options: { data: { full_name: name, role: role } }
      });

      if (authError) return { error: authError.message };

      if (data.user) {
        // PERBAIKAN: Tambahkan 'as any' pada insert untuk melewati proteksi type-check sementara
        const { error: profileError } = await (supabase
          .from('profiles') as any)
          .insert([{
            id: data.user.id,
            nama: name,
            role: role,
            is_verified: false
          }]);

        if (profileError) {
          console.error('Insert profile failed:', profileError);
          return { error: 'Gagal membuat profil di database' };
        }
      }
      return {};
    } catch (error) {
      return { error: 'Terjadi kesalahan sistem saat mendaftar' };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    await clearAuthData();
    setUser(null);
    setProfile(null);
  };

  const value = {
    user,
    profile,
    role: profile?.role ?? null,
    loading,
    signIn,
    signUp,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}