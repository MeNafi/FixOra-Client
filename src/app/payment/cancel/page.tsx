"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function CancelContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  return (
    <Card className="mx-auto max-w-md text-center border-0 shadow-lg">
      <CardHeader className="space-y-4 pt-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950">
          <XCircle className="h-10 w-10 text-amber-600 dark:text-amber-400" />
        </div>
        <CardTitle className="text-2xl">Payment cancelled</CardTitle>
        <CardDescription>
          You left Stripe Checkout without completing payment. Your booking is still{" "}
          <strong>ACCEPTED</strong> — you can pay anytime from the booking page.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 pb-10">
        {bookingId ? (
          <Button asChild className="rounded-full">
            <Link href={`/customer/bookings/${bookingId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to booking & pay
            </Link>
          </Button>
        ) : (
          <Button asChild className="rounded-full">
            <Link href="/customer/bookings">Back to bookings</Link>
          </Button>
        )}
        <Button variant="outline" asChild className="rounded-full">
          <Link href="/services">Browse services</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <Navbar />
      <main className="container flex flex-1 items-center justify-center py-16">
        <Suspense fallback={null}>
          <CancelContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
