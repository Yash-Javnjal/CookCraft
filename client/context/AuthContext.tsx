"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

interface User {
  id?: string;
  name: string;
  email: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  favorites: string[];
  isInitialized: boolean;
  login: (email: string, name?: string) => Promise<void>;
  register: (email: string, name: string) => Promise<void>;
  logout: () => void;
  toggleFavorite: (recipeId: string) => Promise<void>;
  isFavorite: (recipeId: string) => boolean;
  signInWithGoogle: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<{ error: any | null }>;
}

function mapSupabaseUserToUser(supabaseUser: { id?: string; email?: string | null; created_at?: string; user_metadata?: any }): User {
  const email = supabaseUser.email ?? "";
  const id = supabaseUser.id;
  const createdAt = supabaseUser.created_at;
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

  return { id, email, name, createdAt };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Helper to sync user with backend DB and load their favorites
  const syncUserWithBackend = async (email: string, name: string, authId?: string, createdAt?: string): Promise<User | null> => {
    try {
      const { api } = await import("../lib/api");
      const res = await api.post<{ success: boolean; data: any }>("/users/sync", { id: authId, email, name, createdAt });
      if (res.data.success && res.data.data) {
        const dbUser = res.data.data;
        const mappedUser: User = {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          createdAt: dbUser.createdAt,
        };
        setUser(mappedUser);

        // Fetch user favorites from backend
        try {
          const favRes = await api.get<{ success: boolean; data: string[] }>(`/favorites/${dbUser.id}`);
          if (favRes.data.success && favRes.data.data) {
            setFavorites(favRes.data.data);
          }
        } catch (favErr) {
          console.error("Error fetching user favorites from backend:", favErr);
        }
        return mappedUser;
      }
    } catch (err) {
      console.error("Error syncing user with backend:", err);
    }
    return null;
  };

  // Load user session and favorites on client mount
  useEffect(() => {
    let mounted = true;

    async function init() {
      if (!supabase) {
        console.warn("Supabase client is not initialized. Auth and OAuth are disabled.");
        
        // Mock fallback if user existed in local storage or something (for dev fallback)
        const storedFavorites = localStorage.getItem("cookcraft_favorites");
        if (storedFavorites) {
          try {
            setFavorites(JSON.parse(storedFavorites));
          } catch (e) {
            console.error("Error parsing stored favorites:", e);
          }
        }
        setIsInitialized(true);
        return;
      }

      // Read current Supabase session
      const { data } = await supabase.auth.getSession();
      const session = data?.session;
      if (mounted && session?.user) {
        const u = mapSupabaseUserToUser(session.user);
        await syncUserWithBackend(u.email, u.name, u.id, u.createdAt);
      }

      // fallback load of favorites from local storage if not synced yet
      const storedFavorites = localStorage.getItem("cookcraft_favorites");
      if (storedFavorites && favorites.length === 0) {
        try {
          setFavorites(JSON.parse(storedFavorites));
        } catch (e) {
          console.error("Error parsing stored favorites:", e);
        }
      }

      setIsInitialized(true);

      // Subscribe to auth changes
      supabase.auth.onAuthStateChange(async (_event, session) => {
        if (!mounted) return;
        if (session?.user) {
          const u = mapSupabaseUserToUser(session.user);
          await syncUserWithBackend(u.email, u.name, u.id, u.createdAt);
        } else {
          setUser(null);
          setFavorites([]);
        }
      });
    }

    init();

    return () => {
      mounted = false;
    };
  }, []);

  // Sync favorites list to localStorage as backup cache
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("cookcraft_favorites", JSON.stringify(favorites));
  }, [favorites, isInitialized]);

  const login = async (email: string, name?: string) => {
    let extractedName = name || "";
    if (!extractedName) {
      const parts = email.split("@")[0].split(/[._-]/);
      extractedName = parts
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ");
      if (!extractedName) extractedName = "Chef";
    }

    await syncUserWithBackend(email, extractedName);
  };

  const register = async (email: string, name: string) => {
    await syncUserWithBackend(email, name);
  };

  const logout = () => {
    if (supabase) {
      supabase.auth.signOut();
    }
    setUser(null);
    setFavorites([]);
    localStorage.removeItem("cookcraft_favorites");
  };

  const signInWithGoogle = async () => {
    if (!supabase) {
      throw new Error("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
    }

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

  const toggleFavorite = async (recipeId: string) => {
    if (!user || !user.id) {
      // User must be signed in to toggle favorites
      return;
    }

    try {
      const { api } = await import("../lib/api");
      const res = await api.post<{ success: boolean; favorited: boolean }>("/favorites/toggle", {
        userId: user.id,
        recipeId,
      });

      if (res.data.success) {
        setFavorites((prev) => {
          if (prev.includes(recipeId)) {
            return prev.filter((id) => id !== recipeId);
          } else {
            return [...prev, recipeId];
          }
        });
      }
    } catch (err) {
      console.error("Error toggling favorite on backend:", err);
      // Fallback toggling locally in case backend is offline
      setFavorites((prev) => {
        if (prev.includes(recipeId)) {
          return prev.filter((id) => id !== recipeId);
        } else {
          return [...prev, recipeId];
        }
      });
    }
  };

  const isFavorite = (recipeId: string) => {
    return favorites.includes(recipeId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        favorites,
        isInitialized,
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
