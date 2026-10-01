"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Settings, Wrench, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingStatusBadge } from "@/components/shared/status-badge";
import { PageLoader, EmptyState } from "@/components/shared/loading";
import { techniciansApi, getErrorMessage } from "@/lib/api";
import { useAuthStore } from "@/lib/auth/store";
import type { Booking } from "@/types";
import { formatDate } from "@/lib/utils/utils";

function TechDashboard() {
  const user = useAuthStore((s) => s.user);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await techniciansApi.getBookings();
        setBookings(res.data || []);
      } catch (err) {
        toast.error(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const pending = bookings.filter((b) => b.status === "REQUESTED").length;
  const active = bookings.filter((b) => ["ACCEPTED", "PAID", "IN_PROGRESS"].includes(b.status)).length;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container flex-1 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Technician Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Welcome, {user?.name}</p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending requests</CardDescription>
              <CardTitle className="text-3xl">{pending}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active jobs</CardDescription>
              <CardTitle className="text-3xl">{active}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total bookings</CardDescription>
              <CardTitle className="text-3xl">{bookings.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/technician/bookings">
              <Calendar className="mr-2 h-4 w-4" /> Manage bookings
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/technician/services">
              <Wrench className="mr-2 h-4 w-4" /> My services
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/technician/availability">
              <Settings className="mr-2 h-4 w-4" /> Availability
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/technician/profile">Profile</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent bookings</CardTitle>
            <CardDescription>Jobs assigned to you</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <PageLoader />
            ) : bookings.length === 0 ? (
              <EmptyState title="No bookings yet" description="When customers book your services, they will appear here" />
            ) : (
              <div className="space-y-3">
                {bookings.slice(0, 5).map((b) => (
                  <Link
                    key={b.id}
                    href={`/technician/bookings/${b.id}`}
                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div>
                      <p className="font-medium">{b.service?.title || "Service"}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(b.scheduledAt)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookingStatusBadge status={b.status} />
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

export default function TechnicianPage() {
  return (
    <ProtectedRoute roles={["TECHNICIAN"]}>
      <TechDashboard />
    </ProtectedRoute>
  );
}
