import { apiClient } from "./client";
import type { ApiResponse, User, Booking, Payment, AdminStats, Category } from "@/types";

export const adminApi = {
  getStats: async () => {
    const { data } = await apiClient.get<ApiResponse<AdminStats>>("/admin/stats");
    return data;
  },

  getUsers: async (params?: { role?: string; activeStatus?: string; searchTerm?: string; page?: number; limit?: number }) => {
    const { data } = await apiClient.get<ApiResponse<User[]>>("/admin/users", { params });
    return data;
  },

  getUserById: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<User>>(`/admin/users/${id}`);
    return data;
  },

  updateUser: async (id: string, payload: { activeStatus?: string }) => {
    const { data } = await apiClient.patch<ApiResponse<User>>(`/admin/users/${id}`, payload);
    return data;
  },

  /** Convenience wrapper: technicians are users with role=TECHNICIAN. */
  getTechnicians: async (params?: { searchTerm?: string; page?: number; limit?: number }) => {
    const { data } = await apiClient.get<ApiResponse<User[]>>("/admin/users", {
      params: { ...params, role: "TECHNICIAN" },
    });
    return data;
  },

  verifyTechnician: async (id: string, isVerified: boolean) => {
    const { data } = await apiClient.patch<ApiResponse>(`/admin/technicians/${id}/verify`, { isVerified });
    return data;
  },

  getBookings: async (params?: { status?: string; page?: number; limit?: number }) => {
    const { data } = await apiClient.get<ApiResponse<Booking[]>>("/admin/bookings", { params });
    return data;
  },

  getPayments: async (params?: { status?: string; page?: number; limit?: number }) => {
    const { data } = await apiClient.get<ApiResponse<Payment[]>>("/admin/payments", { params });
    return data;
  },

  getCategories: async () => {
    const { data } = await apiClient.get<ApiResponse<Category[]>>("/admin/categories");
    return data;
  },
};
