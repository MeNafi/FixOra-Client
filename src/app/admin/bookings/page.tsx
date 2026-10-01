"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Calendar } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AdminNav } from "@/components/layout/admin-nav";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingStatusBadge } from "@/components/shared/status-badge";
import { PageLoader, EmptyState } from "@/components/shared/loading";
import { adminApi, getErrorMessage } from "@/lib/api";
import type { Booking } from "@/types";
import { formatDate, formatCurrency } from "@/lib/utils/utils";

const STATUS_TABS = ["all", "REQUESTED", "ACCEPTED", "PAID", "IN_PROGRESS", "COMPLETED", "CANCELLED", "DECLINED"];

function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getBookings(status === "all" ? undefined : { status });
      setBookings(res.data || []);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AdminNav />
      <main className="container flex-1 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">All Bookings</h1>
          <p className="mt-1 text-muted-foreground">Platform-wide booking overview</p>
        </div>

        <Tabs value={status} onValueChange={setStatus} className="mb-6">
          <TabsList className="flex h-auto flex-wrap gap-1">
            {STATUS_TABS.map((s) => (
              <TabsTrigger key={s} value={s} className="text-xs sm:text-sm">
                {s === "all" ? "All" : s.replace(/_/g, " ")}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {loading ? (
          <PageLoader />
        ) : bookings.length === 0 ? (
          <EmptyState title="No bookings" description="No bookings match this filter" icon={Calendar} />
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <Card key={b.id}>
                <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-medium">{b.service?.title || "Service"}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(b.scheduledAt)}</p>
                    <p className="text-sm text-muted-foreground">
                      {b.customer?.name || "—"} <span className="text-muted-foreground/60">→</span>{" "}
                      {b.technician?.user?.name || "—"}
                    </p>
                    {b.totalAmount != null && (
                      <p className="text-sm font-medium text-primary">{formatCurrency(b.totalAmount)}</p>
                    )}
                  </div>
                  <BookingStatusBadge status={b.status} />
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

export default function AdminBookingsPage() {
  return (
    <ProtectedRoute roles={["ADMIN"]}>
      <AdminBookings />
    </ProtectedRoute>
  );
}
