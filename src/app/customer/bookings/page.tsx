"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { XCircle } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingStatusBadge } from "@/components/shared/status-badge";
import { PageLoader, EmptyState } from "@/components/shared/loading";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { bookingsApi, getErrorMessage } from "@/lib/api";
import type { Booking } from "@/types";
import { formatDate, formatCurrency, actionBtnClass } from "@/lib/utils/utils";

const CANCELLABLE_STATUSES = ["REQUESTED", "ACCEPTED", "PAID"];

function BookingsList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string>("all");
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await bookingsApi.getAll(status === "all" ? undefined : status);
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

  const handleCancel = async () => {
    if (!cancelTarget) return;
    setCancelling(true);
    try {
      await bookingsApi.cancel(cancelTarget.id);
      toast.success("Booking cancelled");
      setCancelTarget(null);
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container flex-1 py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
            <p className="mt-1 text-muted-foreground">Track and manage your service bookings</p>
          </div>
          <Button asChild>
            <Link href="/services">Book a service</Link>
          </Button>
        </div>

        <Tabs value={status} onValueChange={setStatus} className="mb-6">
          <TabsList className="flex flex-wrap h-auto gap-1">
            {["all", "REQUESTED", "ACCEPTED", "PAID", "IN_PROGRESS", "COMPLETED", "CANCELLED"].map((s) => (
              <TabsTrigger key={s} value={s} className="text-xs sm:text-sm">
                {s === "all" ? "All" : s.replace(/_/g, " ")}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {loading ? (
          <PageLoader />
        ) : bookings.length === 0 ? (
          <EmptyState
            title="No bookings found"
            description="You don't have any bookings in this category"
            action={
              <Button asChild>
                <Link href="/services">Browse services</Link>
              </Button>
            }
          />
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <Card key={b.id} className="transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-lg">{b.service?.title || "Service"}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(b.scheduledAt)}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{b.address}</p>
                    {b.totalAmount != null && (
                      <p className="mt-1 font-medium text-primary">{formatCurrency(b.totalAmount)}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <BookingStatusBadge status={b.status} />
                    {CANCELLABLE_STATUSES.includes(b.status) && (
                      <Button
                        variant="outline"
                        size="sm"
                        className={actionBtnClass("cancel")}
                        onClick={() => setCancelTarget(b)}
                      >
                        <XCircle className="mr-1.5 h-3.5 w-3.5" /> Cancel
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/customer/bookings/${b.id}`}>Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <ConfirmDialog
        open={!!cancelTarget}
        onOpenChange={(v) => !v && setCancelTarget(null)}
        title="Cancel this booking?"
        description={
          cancelTarget
            ? `This will cancel "${cancelTarget.service?.title || "this service"}" and notify the technician. This action can't be undone.`
            : undefined
        }
        confirmLabel="Yes, cancel booking"
        cancelLabel="Keep booking"
        loading={cancelling}
        onConfirm={handleCancel}
      />

      <Footer />
    </div>
  );
}

export default function CustomerBookingsPage() {
  return (
    <ProtectedRoute roles={["CUSTOMER"]}>
      <BookingsList />
    </ProtectedRoute>
  );
}
