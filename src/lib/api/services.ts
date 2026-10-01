import { apiClient } from "./client";
import type { ApiResponse, Service } from "@/types";

export interface ServiceFilters {
  searchTerm?: string;
  category?: string;
  categoryId?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const servicesApi = {
  getAll: async (filters?: ServiceFilters) => {
    const { data } = await apiClient.get<ApiResponse<Service[]>>("/services", { params: filters });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<Service>>(`/services/${id}`);
    return data;
  },

  getMyServices: async () => {
    const { data } = await apiClient.get<ApiResponse<Service[]>>("/services/my-services");
    return data;
  },

  create: async (payload: {
    title: string;
    description?: string;
    price: number;
    durationMinutes?: number;
    categoryId: string;
    imageUrl?: string;
  }) => {
    const { data } = await apiClient.post<ApiResponse<Service>>("/services", payload);
    return data;
  },

  update: async (
    id: string,
    payload: Partial<{
      title: string;
      description: string;
      price: number;
      durationMinutes: number;
      categoryId: string;
      imageUrl: string;
      isActive: boolean;
    }>
  ) => {
    const { data } = await apiClient.patch<ApiResponse<Service>>(`/services/${id}`, payload);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await apiClient.delete<ApiResponse>(`/services/${id}`);
    return data;
  },
};
