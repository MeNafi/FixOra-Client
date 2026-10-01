import { apiClient } from "./client";
import type { ApiResponse, Payment } from "@/types";

/** Response from POST /payments/create (Stripe Checkout Session) */
export interface CreatePaymentResult {
  paymentId: string;
  transactionId: string;
  amount: number;
  currency: string;
  sessionId: string;
  paymentUrl: string;
}

export const paymentsApi = {
  /**
   * Create a Stripe Checkout Session for an ACCEPTED booking.
   * Backend only accepts { bookingId } — success/cancel URLs come from backend APP_URL.
   * Returns paymentUrl → redirect the customer to Stripe hosted checkout.
   */
  create: async (bookingId: string) => {
    const { data } = await apiClient.post<ApiResponse<CreatePaymentResult>>("/payments/create", {
      bookingId,
    });
    return data;
  },

  /**
   * Fallback confirm after Stripe redirect (when webhook is not running).
   * Verifies the session with Stripe server-side and marks booking PAID.
   */
  confirm: async (payload: { sessionId?: string; transactionId?: string }) => {
    const { data } = await apiClient.post<ApiResponse<Payment>>("/payments/confirm", payload);
    return data;
  },

  getAll: async (status?: string) => {
    const { data } = await apiClient.get<ApiResponse<Payment[]>>("/payments", {
      params: status ? { status } : undefined,
    });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<Payment>>(`/payments/${id}`);
    return data;
  },
};
