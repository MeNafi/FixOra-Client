import { apiClient } from "./client";
import type { ApiResponse, User } from "@/types";

export type UpdateProfilePayload = {
  name?: string;
  phone?: string;
  address?: string;
  profilePhoto?: string | null;
};

export const usersApi = {
  getMe: async () => {
    const { data } = await apiClient.get<ApiResponse<User>>("/users/me");
    return data;
  },

  // Backend uses PATCH /users/me (not PUT)
  updateMe: async (payload: UpdateProfilePayload) => {
    const body: Record<string, unknown> = {};
    if (payload.name !== undefined) body.name = payload.name;
    if (payload.phone !== undefined) body.phone = payload.phone;
    if (payload.address !== undefined) body.address = payload.address;
    if (payload.profilePhoto !== undefined) body.profilePhoto = payload.profilePhoto;

    const { data } = await apiClient.patch<ApiResponse<User>>("/users/me", body);
    return data;
  },
};