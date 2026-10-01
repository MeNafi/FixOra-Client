"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, CreditCard, Search, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingStatusBadge } from "@/components/shared/status-badge";
import { PageLoader, EmptyState } from "@/components/shared/loading";
import { bookingsApi, getErrorMessage } from "@/lib/api";
import { useAuthStore } from "@/lib/auth/store";
import type { Booking } from "@/types";
import { formatDate, formatCurrency } from "@/lib/utils/utils";

function CustomerDashboard() {
  const user = useAuthStore((s) => s.user);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await bookingsApi.getAll();
        setBookings(res.data || []);
      } catch (err) {
        toast.error(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const recent = bookings.slice(0, 5);
  const active = bookings.filter((b) =>
    ["REQUESTED", "ACCEPTED", "PAID", "IN_PROGRESS"].includes(b.status)
  ).length;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container flex-1 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.name?.split(" ")[0]}</h1>
          <p className="mt-1 text-muted-foreground">Manage your bookings and payments</p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active bookings</CardDescription>
              <CardTitle className="text-3xl">{active}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total bookings</CardDescription>
              <CardTitle className="text-3xl">{bookings.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Completed</CardDescription>
              <CardTitle className="text-3xl">
                {bookings.filter((b) => b.status === "COMPLETED").length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/services">
              <Search className="mr-2 h-4 w-4" /> Browse services
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/customer/bookings">
              <Calendar className="mr-2 h-4 w-4" /> All bookings
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/customer/payments">
              <CreditCard className="mr-2 h-4 w-4" /> Payments
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent bookings</CardTitle>
            <CardDescription>Your latest service requests</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <PageLoader />
            ) : recent.length === 0 ? (
              <EmptyState
                title="No bookings yet"
                description="Browse services and book your first technician"
                action={
                  <Button asChild>
                    <Link href="/services">Browse services</Link>
                  </Button>
                }
              />
            ) : (
              <div className="space-y-3">
                {recent.map((b, i) => (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={`/customer/bookings/${b.id}`}
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
                  </motion.div>
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

export default function CustomerPage() {
  return (
    <ProtectedRoute roles={["CUSTOMER"]}>
      <CustomerDashboard />
    </ProtectedRoute>
  );
}
