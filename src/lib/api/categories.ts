import { apiClient } from "./client";
import type { ApiResponse, Category } from "@/types";

export const categoriesApi = {
  getAll: async () => {
    const { data } = await apiClient.get<ApiResponse<Category[]>>("/categories");
    return data;
  },

  adminGetAll: async () => {
    const { data } = await apiClient.get<ApiResponse<Category[]>>("/admin/categories");
    return data;
  },

  create: async (payload: { name: string; description?: string; icon?: string }) => {
    const { data } = await apiClient.post<ApiResponse<Category>>("/admin/categories", payload);
    return data;
  },

  update: async (id: string, payload: { name?: string; description?: string; icon?: string }) => {
    const { data } = await apiClient.patch<ApiResponse<Category>>(`/admin/categories/${id}`, payload);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await apiClient.delete<ApiResponse>(`/admin/categories/${id}`);
    return data;
  },
};
