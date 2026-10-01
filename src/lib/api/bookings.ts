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

  cancel: async (id: string) => {
    // Send an explicit (empty) JSON body — some backends reject a
    // body-less PATCH outright, so this keeps the request consistent
    // with every other mutation call in this client.
    const { data } = await apiClient.patch<ApiResponse<Booking>>(`/bookings/${id}/cancel`, {});
    return data;
  },
};
