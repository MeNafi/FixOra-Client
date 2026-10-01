"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Check, X, Play, Flag } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingStatusBadge } from "@/components/shared/status-badge";
import { PageLoader } from "@/components/shared/loading";
import { techniciansApi, bookingsApi, getErrorMessage } from "@/lib/api";
import type { Booking } from "@/types";
import { formatDate, formatCurrency } from "@/lib/utils/utils";

function TechBookingDetail() {
  const params = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const load = async () => {
    try {
      const res = await bookingsApi.getById(params.id as string);
      setBooking(res.data || null);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [params.id]);

 const handleAction = async (action: "accept" | "decline" | "start" | "complete") => {
    setActionLoading(true);
    try {
      // Action অনুযায়ী UpperCase Enum মান নির্ধারণ
      const actionMap: Record<string, string> = {
        accept: "ACCEPT",
        decline: "DECLINE",
        start: "START",
        complete: "COMPLETE",
      };

      const statusMap: Record<string, string> = {
        accept: "ACCEPTED",
        decline: "DECLINED",
        start: "IN_PROGRESS",
        complete: "COMPLETED",
      };

      // ব্যাকএন্ডে action এবং status দুটো ফিল্ডই পাঠানো হচ্ছে যেন Validation ফেল না করে
      await techniciansApi.updateBooking(params.id as string, {
        action: actionMap[action],
        status: statusMap[action],
      } as any);

      toast.success(`Booking ${action}ed successfully`);
      load();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <PageLoader />
        <Footer />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="container flex-1 py-20 text-center">
          <h1 className="text-2xl font-bold">Booking not found</h1>
          <Button asChild className="mt-4">
            <Link href="/technician/bookings">Back</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container flex-1 py-10 max-w-3xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/technician/bookings">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Link>
        </Button>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{booking.service?.title || "Booking"}</h1>
            <p className="text-muted-foreground">#{booking.id.slice(0, 8)}</p>
          </div>
          <BookingStatusBadge status={booking.status} />
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Scheduled</span>
              <span className="font-medium">{formatDate(booking.scheduledAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Address</span>
              <span className="font-medium text-right max-w-[60%]">{booking.address}</span>
            </div>
            {booking.customer && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Customer</span>
                <span className="font-medium">{booking.customer.name}</span>
              </div>
            )}
            {booking.notes && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Notes</span>
                <span className="font-medium text-right max-w-[60%]">{booking.notes}</span>
              </div>
            )}
            {booking.totalAmount != null && (
              <div className="flex justify-between border-t pt-3">
                <span className="text-muted-foreground">Amount</span>
                <span className="text-lg font-bold text-primary">{formatCurrency(booking.totalAmount)}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-3">
          {booking.status === "REQUESTED" && (
            <>
              <Button onClick={() => handleAction("accept")} disabled={actionLoading} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                {actionLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                Accept
              </Button>
              <Button onClick={() => handleAction("decline")} disabled={actionLoading} className="bg-red-600 hover:bg-red-700 text-white">
                <X className="mr-2 h-4 w-4" /> Decline
              </Button>
            </>
          )}
          {booking.status === "PAID" && (
            <Button onClick={() => handleAction("start")} disabled={actionLoading}>
              {actionLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
              Start job
            </Button>
          )}
          {booking.status === "IN_PROGRESS" && (
            <Button onClick={() => handleAction("complete")} disabled={actionLoading} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              {actionLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Flag className="mr-2 h-4 w-4" />}
              Complete job
            </Button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function TechBookingDetailPage() {
  return (
    <ProtectedRoute roles={["TECHNICIAN"]}>
      <TechBookingDetail />
    </ProtectedRoute>
  );
}
