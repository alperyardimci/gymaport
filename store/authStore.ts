import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isOnboardingComplete: boolean;
  error: string | null;

  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  initialize: () => Promise<void>;
  setOnboardingComplete: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  isOnboardingComplete: false,
  error: null,

  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        set({
          isAuthenticated: true,
          isLoading: false,
          user: {
            id: session.user.id,
            email: session.user.email ?? '',
            emailVerified: !!session.user.email_confirmed_at,
            phoneVerified: !!session.user.phone_confirmed_at,
            language: 'en',
            isOnboardingComplete: false,
            isPremium: false,
            createdAt: session.user.created_at,
            updatedAt: session.user.updated_at ?? session.user.created_at,
          },
        });
      } else {
        set({ isAuthenticated: false, isLoading: false });
      }
    } catch {
      set({ isAuthenticated: false, isLoading: false });
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        set({
          isAuthenticated: true,
          user: {
            id: session.user.id,
            email: session.user.email ?? '',
            emailVerified: !!session.user.email_confirmed_at,
            phoneVerified: !!session.user.phone_confirmed_at,
            language: 'en',
            isOnboardingComplete: get().isOnboardingComplete,
            isPremium: false,
            createdAt: session.user.created_at,
            updatedAt: session.user.updated_at ?? session.user.created_at,
          },
        });
      } else {
        set({ isAuthenticated: false, user: null });
      }
    });
  },

  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    set({ isLoading: false });
    if (error) {
      set({ error: error.message });
      return { error: error.message };
    }
    return { error: null };
  },

  signUp: async (email, password, firstName, lastName) => {
    set({ isLoading: true, error: null });
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName },
      },
    });
    set({ isLoading: false });
    if (error) {
      set({ error: error.message });
      return { error: error.message };
    }
    return { error: null };
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false, isOnboardingComplete: false });
  },

  resetPassword: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) return { error: error.message };
    return { error: null };
  },

  setOnboardingComplete: () => set({ isOnboardingComplete: true }),
  clearError: () => set({ error: null }),
}));
