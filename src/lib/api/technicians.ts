import { apiClient } from "./client";
import type {
  ApiResponse,
  TechnicianProfile,
  Booking,
  TechnicianProfileUpdate,
  TechnicianBookingAction,
  WeekDay,
} from "@/types";

export interface TechnicianFilters {
  searchTerm?: string;
  skill?: string;
  minRating?: number;
  minRate?: number;
  maxRate?: number;
  location?: string;
  page?: number;
  limit?: number;
}

/** Backend availability slot shape */
export interface BackendAvailabilitySlot {
  id?: string;
  dayOfWeek: WeekDay | string;
  startTime: string;
  endTime: string;
  isActive?: boolean;
  technicianId?: string;
}

export const techniciansApi = {
  getAll: async (filters?: TechnicianFilters) => {
    const { data } = await apiClient.get<ApiResponse<TechnicianProfile[]>>("/technicians", {
      params: filters,
    });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<TechnicianProfile>>(`/technicians/${id}`);
    return data;
  },

  updateProfile: async (payload: TechnicianProfileUpdate) => {
    const { data } = await apiClient.put<ApiResponse<TechnicianProfile>>("/technician/profile", payload);
    return data;
  },

  /** GET /technician/availability */
  getAvailability: async () => {
    const { data } = await apiClient.get<ApiResponse<BackendAvailabilitySlot[]>>(
      "/technician/availability"
    );
    return data;
  },

  /**
   * PUT /technician/availability
   * Body: { slots: [{ dayOfWeek, startTime, endTime, isActive? }] }
   */
  updateAvailability: async (
    slots: { dayOfWeek: string; startTime: string; endTime: string; isActive?: boolean }[]
  ) => {
    const { data } = await apiClient.put<ApiResponse<BackendAvailabilitySlot[]>>(
      "/technician/availability",
      { slots }
    );
    return data;
  },

  getBookings: async (status?: string) => {
    const { data } = await apiClient.get<ApiResponse<Booking[]>>("/technician/bookings", {
      params: status ? { status } : undefined,
    });
    return data;
  },

  updateBooking: async (id: string, action: TechnicianBookingAction["action"]) => {
    const statusMap: Record<string, string> = {
      accept: "ACCEPTED",
      decline: "DECLINED",
      start: "IN_PROGRESS",
      complete: "COMPLETED",
    };
    const status = statusMap[action] || action.toUpperCase();
    const { data } = await apiClient.patch<ApiResponse<Booking>>(`/technician/bookings/${id}`, {
      status,
    });
    return data;
  },
};