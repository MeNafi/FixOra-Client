"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Loader2, XCircle, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { paymentsApi, getErrorMessage } from "@/lib/api";
import { formatCurrency } from "@/lib/utils/utils";

type Status = "confirming" | "success" | "error" | "missing";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const bookingId = searchParams.get("bookingId");
  const [status, setStatus] = useState<Status>(sessionId ? "confirming" : "missing");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const ran = useRef(false);

  useEffect(() => {
    if (!sessionId || ran.current) return;
    ran.current = true;

    const confirm = async () => {
      try {
        const res = await paymentsApi.confirm({ sessionId });
        setStatus("success");
        setMessage(res.message || "Payment verified with Stripe. Your booking is now PAID.");
        if (res.data && typeof (res.data as { amount?: number }).amount === "number") {
          setAmount((res.data as { amount: number }).amount);
        }
        toast.success("Payment successful");
      } catch (err) {
        // Webhook may have already marked it paid — still show success-friendly UI
        const msg = getErrorMessage(err);
        if (/already|paid|completed/i.test(msg)) {
          setStatus("success");
          setMessage("Payment was already confirmed. Your booking is PAID.");
          toast.success("Payment already confirmed");
        } else {
          setStatus("error");
          setMessage(msg || "Could not verify payment. If you were charged, contact support.");
          toast.error(msg);
        }
      }
    };

    confirm();
  }, [sessionId]);

  if (status === "confirming") {
    return (
      <Card className="mx-auto max-w-md text-center border-0 shadow-lg">
        <CardHeader className="space-y-4 pt-10">
          <Loader2 className="mx-auto h-14 w-14 animate-spin text-primary" />
          <CardTitle className="text-2xl">Confirming your payment</CardTitle>
          <CardDescription>
            Verifying the transaction with Stripe. Please do not close this page.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (status === "missing") {
    return (
      <Card className="mx-auto max-w-md text-center border-0 shadow-lg">
        <CardHeader className="space-y-4 pt-10">
          <XCircle className="mx-auto h-14 w-14 text-amber-500" />
          <CardTitle className="text-2xl">No session found</CardTitle>
          <CardDescription>
            We could not find a Stripe session ID. If you completed payment, check your bookings.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 pb-10">
          <Button asChild className="rounded-full">
            <Link href="/customer/bookings">View my bookings</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (status === "error") {
    return (
      <Card className="mx-auto max-w-md text-center border-0 shadow-lg">
        <CardHeader className="space-y-4 pt-10">
          <XCircle className="mx-auto h-14 w-14 text-red-500" />
          <CardTitle className="text-2xl">Verification issue</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 pb-10">
          {bookingId && (
            <Button asChild className="rounded-full">
              <Link href={`/customer/bookings/${bookingId}`}>Back to booking</Link>
            </Button>
          )}
          <Button variant="outline" asChild className="rounded-full">
            <Link href="/customer/bookings">My bookings</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-md text-center border-0 shadow-lg">
      <CardHeader className="space-y-4 pt-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950">
          <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        <CardTitle className="text-2xl">Payment successful</CardTitle>
        <CardDescription>{message}</CardDescription>
        {amount != null && (
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(amount)}
          </p>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-3 pb-10">
        <div className="rounded-xl bg-muted/50 p-4 text-left text-sm space-y-1 mb-2">
          <p className="flex items-center gap-2 font-medium">
            <CreditCard className="h-4 w-4 text-primary" /> Paid securely with Stripe
          </p>
          <p className="text-muted-foreground text-xs">
            The technician can now start the job. You will see status <strong>PAID</strong> on your booking.
          </p>
        </div>
        {bookingId ? (
          <Button asChild className="rounded-full bg-emerald-600 hover:bg-emerald-700">
            <Link href={`/customer/bookings/${bookingId}`}>View this booking</Link>
          </Button>
        ) : (
          <Button asChild className="rounded-full bg-emerald-600 hover:bg-emerald-700">
            <Link href="/customer/bookings">View my bookings</Link>
          </Button>
        )}
        <Button variant="outline" asChild className="rounded-full">
          <Link href="/customer">Go to dashboard</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <Navbar />
      <main className="container flex flex-1 items-center justify-center py-16">
        <Suspense
          fallback={
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          }
        >
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
