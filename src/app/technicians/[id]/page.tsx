"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Star } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageLoader } from "@/components/shared/loading";
import { techniciansApi, getErrorMessage } from "@/lib/api";
import type { TechnicianProfile } from "@/types";
import { formatCurrency } from "@/lib/utils/utils";

export default function TechnicianDetailPage() {
  const params = useParams();
  const [tech, setTech] = useState<TechnicianProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await techniciansApi.getById(params.id as string);
        setTech(res.data || null);
      } catch (err) {
        toast.error(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <PageLoader />
        <Footer />
      </div>
    );
  }

  if (!tech) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="container flex-1 py-20 text-center">
          <h1 className="text-2xl font-bold">Technician not found</h1>
          <Button asChild className="mt-4">
            <Link href="/technicians">Back</Link>
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
          <Link href="/technicians">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Link>
        </Button>

        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-bold">{tech.user?.name || "Technician"}</h1>
            {tech.isVerified && <Badge>Verified</Badge>}
          </div>
          {tech.location && (
            <p className="mt-2 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" /> {tech.location}
            </p>
          )}
          {tech.averageRating != null && (
            <p className="mt-1 flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {tech.averageRating.toFixed(1)} ({tech.totalReviews || 0} reviews)
            </p>
          )}
        </div>

        {tech.bio && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{tech.bio}</p>
            </CardContent>
          </Card>
        )}

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {tech.experienceYears != null && (
              <p>
                <span className="text-muted-foreground">Experience:</span> {tech.experienceYears} years
              </p>
            )}
            {tech.hourlyRate != null && (
              <p>
                <span className="text-muted-foreground">Rate:</span>{" "}
                <span className="font-medium text-primary">{formatCurrency(tech.hourlyRate)}/hr</span>
              </p>
            )}
            <div className="flex flex-wrap gap-1 pt-2">
              {(tech.skills || []).map((s) => (
                <Badge key={s} variant="outline">
                  {s}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {tech.services && tech.services.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tech.services.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.id}`}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50"
                >
                  <span className="font-medium">{s.title}</span>
                  <span className="text-primary font-medium">{formatCurrency(s.price)}</span>
                </Link>
              ))}
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
}
