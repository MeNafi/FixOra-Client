import { apiClient } from "./client";
import type { ApiResponse, Review, CreateReviewPayload } from "@/types";

export const reviewsApi = {
  create: async (payload: CreateReviewPayload) => {
    const { data } = await apiClient.post<ApiResponse<Review>>("/reviews", payload);
    return data;
  },

  getMyReviews: async () => {
    const { data } = await apiClient.get<ApiResponse<Review[]>>("/reviews/my-reviews");
    return data;
  },

  getByTechnician: async (technicianId: string) => {
    const { data } = await apiClient.get<ApiResponse<Review[]>>(`/reviews/technician/${technicianId}`);
    return data;
  },
};
