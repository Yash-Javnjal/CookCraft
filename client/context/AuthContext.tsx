"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  favorites: string[];
  login: (email: string, name?: string) => void;
  register: (email: string, name: string) => void;
  logout: () => void;
  toggleFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
  signInWithGoogle: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<{ error: any | null }>;
}

function mapSupabaseUserToUser(supabaseUser: { email?: string | null; user_metadata?: any }): User {
  const email = supabaseUser.email ?? "";
  const metadataName = typeof supabaseUser.user_metadata?.full_name === "string"
    ? supabaseUser.user_metadata.full_name
    : undefined;

  const name = metadataName
    ? metadataName
    : email
      ? email
          .split("@")[0]
          .split(/[._-]/)
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" ")
      : "Chef";

  return { email, name };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load user session and favorites on client mount
  useEffect(() => {
    let mounted = true;

    async function init() {
      if (!supabase) {
        console.warn("Supabase client is not initialized. Auth and OAuth are disabled.");
        setIsInitialized(true);
        return;
      }

      // Read current Supabase session (no local user storage)
      const { data } = await supabase.auth.getSession();
      const session = data?.session;
      if (mounted && session?.user) {
        const u = mapSupabaseUserToUser(session.user);
        setUser(u);
      }

      // favorites still loaded from localStorage for now
      const storedFavorites = localStorage.getItem("cookcraft_favorites");
      if (storedFavorites) {
        try {
          setFavorites(JSON.parse(storedFavorites));
        } catch (e) {
          console.error("Error parsing stored favorites:", e);
        }
      }

      setIsInitialized(true);

      // Subscribe to auth changes
      supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser(mapSupabaseUserToUser(session.user));
        } else {
          setUser(null);
        }
      });
    }

    init();

    return () => {
      mounted = false;
    };
  }, []);

  // Do not persist user locally. Supabase manages sessions.

  // Sync favorites list to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("cookcraft_favorites", JSON.stringify(favorites));
  }, [favorites, isInitialized]);

  const login = (email: string, name?: string) => {
    // If name is not provided, extract from email (e.g. chef.john@example.com -> Chef John)
    let extractedName = name || "";
    if (!extractedName) {
      const parts = email.split("@")[0].split(/[._-]/);
      extractedName = parts
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ");
      if (!extractedName) extractedName = "Chef";
    }

    const newUser = { email, name: extractedName };
    setUser(newUser);
  };

  const register = (email: string, name: string) => {
    const newUser = { email, name };
    setUser(newUser);
  };

  const logout = () => {
    if (supabase) {
      supabase.auth.signOut();
    }
    setUser(null);
    setFavorites([]);
  };

  const signInWithGoogle = async () => {
    if (!supabase) {
      throw new Error("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
    }

    // Redirects to Google OAuth flow
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  };

  const sendPasswordReset = async (email: string) => {
    if (!supabase) {
      throw new Error("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset`,
    });
    return { error };
  };

  const toggleFavorite = (recipeId: string) => {
    if (!user) {
      // User must be signed in to toggle favorites
      return;
    }

    setFavorites((prev) => {
      if (prev.includes(recipeId)) {
        return prev.filter((id) => id !== recipeId);
      } else {
        return [...prev, recipeId];
      }
    });
  };

  const isFavorite = (recipeId: string) => {
    return favorites.includes(recipeId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        favorites,
        login,
        register,
        logout,
        toggleFavorite,
        isFavorite,
        signInWithGoogle,
        sendPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
