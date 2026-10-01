import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import type { ApiResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://fixora-api-chi.vercel.app/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;

      if (refreshToken) {
        try {
          const { data } = await axios.post<ApiResponse<{ accessToken: string }>>(
            `${API_URL}/auth/refresh-token`,
            { refreshToken }
          );
          if (data.data?.accessToken) {
            localStorage.setItem("accessToken", data.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
            return apiClient(originalRequest);
          }
        } catch {
          clearAuthStorage();
          if (typeof window !== "undefined") {
            window.location.href = "/login?session=expired";
          }
        }
      } else {
        clearAuthStorage();
        if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
          window.location.href = "/login?session=expired";
        }
      }
    }

    return Promise.reject(error);
  }
);

export function clearAuthStorage() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiResponse | undefined;
    if (data?.message) return data.message;
    if (data?.errorDetails?.length) {
      return data.errorDetails.map((e) => e.message).join(", ");
    }
    if (error.message === "Network Error") return "Unable to connect to the server. Please check your connection.";
    return error.message || "Something went wrong";
  }
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred";
}

export function getFieldErrors(error: unknown): Record<string, string> {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiResponse | undefined;
    if (data?.errorDetails?.length) {
      return data.errorDetails.reduce(
        (acc, e) => {
          acc[e.path] = e.message;
          return acc;
        },
        {} as Record<string, string>
      );
    }
  }
  return {};
}
