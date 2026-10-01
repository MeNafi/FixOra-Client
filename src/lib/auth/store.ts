"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Role, LoginResponse } from "@/types";
import { authApi, clearAuthStorage, getErrorMessage } from "@/lib/api";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<User>;
  register: (payload: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role: "CUSTOMER" | "TECHNICIAN";
  }) => Promise<User>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<User | null>;
  hasRole: (...roles: Role[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      setToken: (token) => {
        if (typeof window !== "undefined") {
          if (token) localStorage.setItem("accessToken", token);
          else localStorage.removeItem("accessToken");
        }
        set({ accessToken: token });
      },

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          // Tries /auth/login first, then falls back to /admin/login
          const res = await authApi.loginAny({ email, password });
          if (!res.success || !res.data) throw new Error(res.message || "Login failed");

          // Backend may return { accessToken, user } or nested shapes
          const payload = res.data as LoginResponse & { accessToken?: string; user?: User };
          const accessToken = payload.accessToken;
          const refreshToken = payload.refreshToken;
          let user = payload.user;

          if (!accessToken) throw new Error("No access token received");

          // If admin login only returned token without full user, fetch /auth/me
          if (!user) {
            if (typeof window !== "undefined") {
              localStorage.setItem("accessToken", accessToken);
              if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
            }
            set({ accessToken, isLoading: true });
            try {
              const meRes = await authApi.me();
              user = meRes.data as User;
            } catch {
              // Minimal admin user so role-based redirect still works
              user = {
                id: "admin",
                name: "Admin",
                email,
                role: "ADMIN",
                activeStatus: "ACTIVE",
              } as User;
            }
          }

          if (typeof window !== "undefined") {
            localStorage.setItem("accessToken", accessToken);
            if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
          }
          set({ user, accessToken, isAuthenticated: true, isLoading: false });
          return user;
        } catch (err) {
          set({ isLoading: false });
          throw new Error(getErrorMessage(err));
        }
      },

      register: async (payload) => {
        set({ isLoading: true });
        try {
          const res = await authApi.register(payload);
          if (!res.success || !res.data) throw new Error(res.message || "Registration failed");
          const { accessToken, refreshToken, user } = res.data;
          if (typeof window !== "undefined") {
            localStorage.setItem("accessToken", accessToken);
            if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
          }
          set({ user, accessToken, isAuthenticated: true, isLoading: false });
          return user;
        } catch (err) {
          set({ isLoading: false });
          throw new Error(getErrorMessage(err));
        }
      },

      logout: async () => {
        try {
          await authApi.logout();
        } catch {
          // ignore
        }
        clearAuthStorage();
        set({ user: null, accessToken: null, isAuthenticated: false });
      },

      fetchMe: async () => {
        const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
        if (!token) {
          set({ user: null, isAuthenticated: false });
          return null;
        }
        set({ isLoading: true });
        try {
          const res = await authApi.me();
          if (res.success && res.data) {
            set({ user: res.data, accessToken: token, isAuthenticated: true, isLoading: false });
            return res.data;
          }
          set({ user: null, isAuthenticated: false, isLoading: false });
          return null;
        } catch {
          clearAuthStorage();
          set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
          return null;
        }
      },

      hasRole: (...roles) => {
        const { user } = get();
        return !!user && roles.includes(user.role);
      },
    }),
    {
      name: "fixora-auth",
      partialize: (s) => ({ user: s.user, accessToken: s.accessToken, isAuthenticated: s.isAuthenticated }),
    }
  )
);
