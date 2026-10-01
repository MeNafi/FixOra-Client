"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { CreditCard, TrendingUp, CheckCircle2, Clock, RotateCcw } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AdminNav } from "@/components/layout/admin-nav";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentStatusBadge } from "@/components/shared/status-badge";
import { PageLoader, EmptyState } from "@/components/shared/loading";
import { adminApi, getErrorMessage } from "@/lib/api";
import type { Payment } from "@/types";
import { formatDate, formatCurrency } from "@/lib/utils/utils";

const STATUS_TABS = ["all", "COMPLETED", "PENDING", "FAILED", "REFUNDED"];

function PaymentsManagement() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getPayments(status === "all" ? undefined : { status });
      setPayments(res.data || []);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    load();
  }, [load]);

  const stats = useMemo(() => {
    const completed = payments.filter((p) => p.status === "COMPLETED");
    const revenue = completed.reduce((sum, p) => sum + (p.amount || 0), 0);
    return {
      revenue,
      completed: completed.length,
      pending: payments.filter((p) => p.status === "PENDING").length,
      refunded: payments.filter((p) => p.status === "REFUNDED").length,
    };
  }, [payments]);

  const cards = [
    { label: "Total revenue", value: formatCurrency(stats.revenue), icon: TrendingUp },
    { label: "Completed", value: stats.completed, icon: CheckCircle2 },
    { label: "Pending", value: stats.pending, icon: Clock },
    { label: "Refunded", value: stats.refunded, icon: RotateCcw },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AdminNav />
      <main className="container flex-1 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="mt-1 text-muted-foreground">Platform-wide transactions and revenue</p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <Card key={c.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription>{c.label}</CardDescription>
                <c.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{c.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={status} onValueChange={setStatus} className="mb-6">
          <TabsList className="flex h-auto flex-wrap gap-1">
            {STATUS_TABS.map((s) => (
              <TabsTrigger key={s} value={s} className="text-xs sm:text-sm">
                {s === "all" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {loading ? (
          <PageLoader />
        ) : payments.length === 0 ? (
          <EmptyState title="No payments found" icon={CreditCard} />
        ) : (
          <div className="space-y-3">
            {payments.map((p) => (
              <Card key={p.id}>
                <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-medium">
                      {p.booking?.service?.title || "Booking payment"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {p.createdAt ? formatDate(p.createdAt) : "—"}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {p.booking?.customer?.name && (
                        <>Customer: {p.booking.customer.name} · </>
                      )}
                      Ref: {p.stripePaymentIntentId?.slice(0, 18) || p.stripeSessionId?.slice(0, 18) || p.id.slice(0, 8)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-1.5">
                    <span className="text-lg font-bold text-primary">{formatCurrency(p.amount)}</span>
                    <PaymentStatusBadge status={p.status} />
                  </div>
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

export default function AdminPaymentsPage() {
  return (
    <ProtectedRoute roles={["ADMIN"]}>
      <PaymentsManagement />
    </ProtectedRoute>
  );
}
