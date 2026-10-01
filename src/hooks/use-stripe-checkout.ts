"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { paymentsApi, getErrorMessage } from "@/lib/api";
import type { CreatePaymentResult } from "@/lib/api/payments";

/**
 * Hook that starts a real Stripe Checkout flow.
 *
 * Flow:
 * 1. POST /payments/create { bookingId }
 * 2. Backend creates Stripe Checkout Session and returns paymentUrl
 * 3. Redirect browser to paymentUrl (Stripe-hosted page)
 * 4. After pay → Stripe redirects to /payment/success?session_id=...
 * 5. Success page calls POST /payments/confirm to mark booking PAID
 */
export function useStripeCheckout() {
  const [loading, setLoading] = useState(false);
  const [lastSession, setLastSession] = useState<CreatePaymentResult | null>(null);

  const startCheckout = useCallback(async (bookingId: string) => {
    if (!bookingId) {
      toast.error("Missing booking ID");
      return;
    }

    setLoading(true);
    try {
      const res = await paymentsApi.create(bookingId);

      if (!res.success || !res.data) {
        throw new Error(res.message || "Failed to create payment session");
      }

      const result = res.data;
      setLastSession(result);

      const url = result.paymentUrl;
      if (!url) {
        throw new Error("No Stripe payment URL returned from the server");
      }

      toast.message("Redirecting to Stripe Checkout…", {
        description: "You will complete payment securely on Stripe.",
      });

      // Full-page redirect to Stripe-hosted Checkout
      window.location.href = url;
    } catch (err) {
      toast.error(getErrorMessage(err) || "Could not start payment");
      setLoading(false);
    }
    // Keep loading true during redirect so button stays disabled
  }, []);

  return { startCheckout, loading, lastSession };
}
