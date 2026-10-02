import { apiClient } from "./client";
import type { ApiResponse, Booking, CreateBookingPayload } from "@/types";

export const bookingsApi = {
  create: async (payload: CreateBookingPayload) => {
    const { data } = await apiClient.post<ApiResponse<Booking>>("/bookings", payload);
    return data;
  },

  getAll: async (status?: string) => {
    const { data } = await apiClient.get<ApiResponse<Booking[]>>("/bookings", {
      params: status ? { status } : undefined,
    });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<Booking>>(`/bookings/${id}`);
    return data;
  },

  // ✅ Send direct PATCH request to /bookings/:id
  updateStatus: async (id: string, status: string) => {
    const { data } = await apiClient.patch<ApiResponse<Booking>>(`/bookings/${id}`, {
      status,
    });
    return data;
  },

  cancel: async (id: string) => {
    const { data } = await apiClient.patch<ApiResponse<Booking>>(`/bookings/${id}/cancel`, {});
    return data;
  },
};