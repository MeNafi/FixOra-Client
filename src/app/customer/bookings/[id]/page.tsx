"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, CreditCard, Star, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookingStatusBadge } from "@/components/shared/status-badge";
import { PageLoader } from "@/components/shared/loading";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { bookingsApi, paymentsApi, reviewsApi, getErrorMessage } from "@/lib/api";
import type { Booking } from "@/types";
import { formatDate, formatCurrency, actionBtnClass } from "@/lib/utils/utils";

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

function BookingDetail() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [cancelOpen, setCancelOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<{ comment?: string }>();

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

  const handleCancel = async () => {
    setActionLoading(true);
    try {
      await bookingsApi.cancel(params.id as string);
      toast.success("Booking cancelled");
      setCancelOpen(false);
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setActionLoading(false);
    }
  };

  const handlePay = async () => {
    setActionLoading(true);
    try {
      // Backend creates a real Stripe Checkout Session (only needs bookingId)
      const res = await paymentsApi.create(params.id as string);
      if (!res.success || !res.data?.paymentUrl) {
        throw new Error(res.message || "Could not create Stripe payment session");
      }
      toast.message("Redirecting to Stripe…", {
        description: "Complete payment securely on Stripe Checkout.",
      });
      // Redirect to Stripe-hosted Checkout page
      window.location.href = res.data.paymentUrl;
    } catch (err) {
      toast.error(getErrorMessage(err));
      setActionLoading(false);
    }
  };

  const onReview = async (data: { comment?: string }) => {
    setActionLoading(true);
    try {
      await reviewsApi.create({
        bookingId: params.id as string,
        rating,
        comment: data.comment,
      });
      toast.success("Review submitted");
      setReviewOpen(false);
      reset();
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
            <Link href="/customer/bookings">Back</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const canCancel = ["REQUESTED", "ACCEPTED", "PAID"].includes(booking.status);
  const canPay = booking.status === "ACCEPTED";
  const canReview = booking.status === "COMPLETED" && !booking.review;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container flex-1 py-10 max-w-3xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/customer/bookings">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to bookings
          </Link>
        </Button>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{booking.service?.title || "Booking"}</h1>
            <p className="text-muted-foreground">#{booking.id.slice(0, 8)}</p>
          </div>
          <BookingStatusBadge status={booking.status} />
        </div>

        <div className="space-y-4">
          <Card>
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
              {booking.technician?.user && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Technician</span>
                  <span className="font-medium">{booking.technician.user.name}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-3">
            {canPay && (
              <Button onClick={handlePay} disabled={actionLoading} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                {actionLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CreditCard className="mr-2 h-4 w-4" />}
                Pay now
              </Button>
            )}
            {canCancel && (
              <Button
                variant="outline"
                onClick={() => setCancelOpen(true)}
                disabled={actionLoading}
                className={actionBtnClass("cancel")}
              >
                <XCircle className="mr-2 h-4 w-4" /> Cancel booking
              </Button>
            )}
            {canReview && (
              <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
                <DialogTrigger asChild>
                  <Button variant="secondary">
                    <Star className="mr-2 h-4 w-4" /> Leave review
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rate your experience</DialogTitle>
                    <DialogDescription>Share feedback about this service</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onReview)} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Rating</Label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setRating(n)}
                            className={`text-2xl ${n <= rating ? "text-amber-400" : "text-muted"}`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="comment">Comment (optional)</Label>
                      <Textarea id="comment" {...register("comment")} placeholder="How was the service?" />
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={actionLoading}>
                        {actionLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit review
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </main>

      <ConfirmDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        title="Cancel this booking?"
        description="This will notify the technician and free up the time slot. This action can't be undone."
        confirmLabel="Yes, cancel booking"
        cancelLabel="Keep booking"
        loading={actionLoading}
        onConfirm={handleCancel}
      />

      <Footer />
    </div>
  );
}

export default function BookingDetailPage() {
  return (
    <ProtectedRoute roles={["CUSTOMER"]}>
      <BookingDetail />
    </ProtectedRoute>
  );
}
