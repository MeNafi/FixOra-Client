"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PaymentStatusBadge } from "@/components/shared/status-badge";
import { PageLoader, EmptyState } from "@/components/shared/loading";
import { paymentsApi, getErrorMessage } from "@/lib/api";
import type { Payment } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils/utils";

function PaymentsList() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await paymentsApi.getAll();
        setPayments(res.data || []);
      } catch (err) {
        toast.error(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container flex-1 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Payment History</h1>
          <p className="mt-1 text-muted-foreground">Your past and pending payments</p>
        </div>

        {loading ? (
          <PageLoader />
        ) : payments.length === 0 ? (
          <EmptyState
            title="No payments yet"
            description="Payments will appear here after you pay for a booking"
            action={
              <Button asChild>
                <Link href="/customer/bookings">View bookings</Link>
              </Button>
            }
          />
        ) : (
          <div className="space-y-3">
            {payments.map((p) => (
              <Card key={p.id}>
                <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium">{formatCurrency(p.amount)}</p>
                    <p className="text-sm text-muted-foreground">
                      {p.createdAt ? formatDate(p.createdAt) : "—"}
                    </p>
                    {p.booking?.service && (
                      <p className="text-sm text-muted-foreground">{p.booking.service.title}</p>
                    )}
                  </div>
                  <PaymentStatusBadge status={p.status} />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default function CustomerPaymentsPage() {
  return (
    <ProtectedRoute roles={["CUSTOMER"]}>
      <PaymentsList />
    </ProtectedRoute>
  );
}
