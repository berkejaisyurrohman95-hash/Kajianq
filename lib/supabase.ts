import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'admin' | 'asatidz' | 'user' ;
          type: string;
          created_at?: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          role: 'admin' | 'asatidz' | 'user' ;
          type?: string;
          created_at?: string;
        };
      };
    };
  };
};

const supabaseUrl = 'https://orroasltrlfufgfaurke.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ycm9hc2x0cmxmdWZnZmF1cmtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMDE1NzEsImV4cCI6MjA4NjU3NzU3MX0.OkGqg8hshORSDx4NeAwGt2mgSRhtQKzYSjvD2rJ2ZO0'; 

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});