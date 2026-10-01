"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PageLoader } from "@/components/shared/loading";
import { servicesApi, bookingsApi, getErrorMessage } from "@/lib/api";
import { useAuthStore } from "@/lib/auth/store";
import type { Service } from "@/types";
import { formatCurrency } from "@/lib/utils/utils";

const bookingSchema = z.object({
  scheduledAt: z.string().min(1, "Select a date and time"),
  address: z.string().min(5, "Enter a valid address"),
  notes: z.string().optional(),
});

type BookingForm = z.infer<typeof bookingSchema>;

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, hasRole } = useAuthStore();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingForm>({ resolver: zodResolver(bookingSchema) });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await servicesApi.getById(params.id as string);
        setService(res.data || null);
      } catch (err) {
        toast.error(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params.id]);

  const onBook = async (data: BookingForm) => {
    if (!isAuthenticated) {
      toast.error("Please log in to book a service");
      router.push("/login");
      return;
    }
    if (!hasRole("CUSTOMER")) {
      toast.error("Only customers can create bookings");
      return;
    }
    setSubmitting(true);
    try {
      const res = await bookingsApi.create({
        serviceId: params.id as string,
        scheduledAt: new Date(data.scheduledAt).toISOString(),
        address: data.address,
        notes: data.notes,
      });
      toast.success(res.message || "Booking created successfully");
      setBookingOpen(false);
      reset();
      router.push(`/customer/bookings/${res.data?.id}`);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSubmitting(false);
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

  if (!service) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="container flex-1 py-20 text-center">
          <h1 className="text-2xl font-bold">Service not found</h1>
          <Button asChild className="mt-4">
            <Link href="/services">Back to services</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container flex-1 py-10">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/services">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to services
          </Link>
        </Button>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {service.category && <Badge variant="secondary">{service.category.name}</Badge>}
              </div>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">{service.title}</h1>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {service.description || "Professional home service provided by verified technicians."}
              </p>
            </div>

            {service.technician && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Technician</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{service.technician.user?.name || "Technician"}</p>
                  {service.technician.location && (
                    <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {service.technician.location}
                    </p>
                  )}
                  {service.technician.bio && (
                    <p className="mt-2 text-sm text-muted-foreground">{service.technician.bio}</p>
                  )}
                  <Button variant="outline" size="sm" className="mt-4" asChild>
                    <Link href={`/technicians/${service.technician.id}`}>View profile</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-3xl text-primary">{formatCurrency(service.price)}</CardTitle>
                <CardDescription>
                  {service.durationMinutes ? `~${service.durationMinutes} minutes` : "Fixed price"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg">
                      <Calendar className="mr-2 h-4 w-4" /> Book now
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Book this service</DialogTitle>
                      <DialogDescription>
                        Schedule a time and provide your address. The technician will confirm shortly.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onBook)} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="scheduledAt">Date & time</Label>
                        <Input id="scheduledAt" type="datetime-local" {...register("scheduledAt")} />
                        {errors.scheduledAt && (
                          <p className="text-sm text-destructive">{errors.scheduledAt.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Service address</Label>
                        <Input id="address" placeholder="House, road, area, city" {...register("address")} />
                        {errors.address && (
                          <p className="text-sm text-destructive">{errors.address.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes (optional)</Label>
                        <Textarea id="notes" placeholder="Any special instructions..." {...register("notes")} />
                      </div>
                      <DialogFooter>
                        <Button type="submit" disabled={submitting}>
                          {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Confirm booking
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
