"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingStatusBadge } from "@/components/shared/status-badge";
import { PageLoader, EmptyState } from "@/components/shared/loading";
import { techniciansApi, getErrorMessage } from "@/lib/api";
import type { Booking } from "@/types";
import { formatDate } from "@/lib/utils/utils";

function TechBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await techniciansApi.getBookings(status === "all" ? undefined : status);
        setBookings(res.data || []);
      } catch (err) {
        toast.error(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    
    load();
  }, [status]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container flex-1 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Booking Management</h1>
          <p className="mt-1 text-muted-foreground">Accept, start, and complete jobs</p>
        </div>

        <Tabs value={status} onValueChange={setStatus} className="mb-6">
          <TabsList className="flex flex-wrap h-auto gap-1">
            {["all", "REQUESTED", "ACCEPTED", "PAID", "IN_PROGRESS", "COMPLETED"].map((s) => (
              <TabsTrigger key={s} value={s} className="text-xs sm:text-sm">
                {s === "all" ? "All" : s.replace(/_/g, " ")}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {loading ? (
          <PageLoader />
        ) : bookings.length === 0 ? (
          <EmptyState title="No bookings" description="No bookings match this filter" />
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <Card key={b.id}>
                <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-lg">{b.service?.title || "Service"}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(b.scheduledAt)}</p>
                    <p className="text-sm text-muted-foreground">{b.address}</p>
                    {b.customer && (
                      <p className="mt-1 text-sm">Customer: {b.customer.name}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <BookingStatusBadge status={b.status} />
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/technician/bookings/${b.id}`}>Manage</Link>
                    </Button>
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

export default function TechBookingsPage() {
  return (
    <ProtectedRoute roles={["TECHNICIAN"]}>
      <TechBookings />
    </ProtectedRoute>
  );
}
