import { apiClient } from "./client";
import type { ApiResponse, LoginResponse, User } from "@/types";

export const authApi = {
  register: async (payload: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role: "CUSTOMER" | "TECHNICIAN";
  }) => {
    const { data } = await apiClient.post<ApiResponse<LoginResponse>>("/auth/register", payload);
    return data;
  },

  /** Customer / Technician login */
  login: async (payload: { email: string; password: string }) => {
    const { data } = await apiClient.post<ApiResponse<LoginResponse>>("/auth/login", payload);
    return data;
  },

  /** Admin-only login (POST /admin/login) */
  adminLogin: async (payload: { email: string; password: string }) => {
    const { data } = await apiClient.post<ApiResponse<LoginResponse>>("/admin/login", payload);
    return data;
  },

  /**
   * Unified login: tries /auth/login first, then falls back to /admin/login.
   * Use this from the single login page so admin + customer + technician all work.
   */
  loginAny: async (payload: { email: string; password: string }) => {
    try {
      return await authApi.login(payload);
    } catch (authErr) {
      try {
        return await authApi.adminLogin(payload);
      } catch {
        throw authErr;
      }
    }
  },

  logout: async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch {
      // ignore
    }
    try {
      await apiClient.post("/admin/logout");
    } catch {
      // ignore
    }
  },

  me: async () => {
    const { data } = await apiClient.get<ApiResponse<User>>("/auth/me");
    return data;
  },

  refreshToken: async (refreshToken: string) => {
    const { data } = await apiClient.post<ApiResponse<{ accessToken: string }>>("/auth/refresh-token", {
      refreshToken,
    });
    return data;
  },
};
