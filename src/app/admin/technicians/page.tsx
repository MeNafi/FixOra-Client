"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { BadgeCheck, ShieldOff, Star, Wrench, Search } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AdminNav } from "@/components/layout/admin-nav";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PageLoader, EmptyState } from "@/components/shared/loading";
import { adminApi, getErrorMessage } from "@/lib/api";
import type { User } from "@/types";
import { getInitials, formatCurrency } from "@/lib/utils/utils";

function TechniciansManagement() {
  const [technicians, setTechnicians] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getTechnicians({ searchTerm: search || undefined });
      setTechnicians(res.data || []);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleVerify = async (tech: User) => {
    const profileId = tech.technicianProfile?.id;
    if (!profileId) {
      toast.error("This technician has no profile yet");
      return;
    }
    setBusyId(tech.id);
    try {
      await adminApi.verifyTechnician(profileId, !tech.technicianProfile?.isVerified);
      toast.success(tech.technicianProfile?.isVerified ? "Verification removed" : "Technician verified");
      load();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setBusyId(null);
    }
  };

  const toggleBan = async (tech: User) => {
    const next = tech.activeStatus === "BANNED" ? "ACTIVE" : "BANNED";
    setBusyId(tech.id);
    try {
      await adminApi.updateUser(tech.id, { activeStatus: next });
      toast.success(next === "BANNED" ? "Technician banned" : "Technician unbanned");
      load();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AdminNav />
      <main className="container flex-1 py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Technicians</h1>
            <p className="mt-1 text-muted-foreground">Verify professionals and manage their access</p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            load();
          }}
          className="mb-6 flex gap-3"
        >
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </form>

        {loading ? (
          <PageLoader />
        ) : technicians.length === 0 ? (
          <EmptyState title="No technicians found" icon={Wrench} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {technicians.map((tech) => {
              const profile = tech.technicianProfile;
              const isBusy = busyId === tech.id;
              return (
                <Card key={tech.id} className="flex flex-col">
                  <CardContent className="flex flex-1 flex-col gap-4 p-5">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12 shrink-0">
                        <AvatarImage src={tech.avatar || undefined} alt={tech.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {getInitials(tech.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold leading-tight">{tech.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{tech.email}</p>
                        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                          {profile?.isVerified ? (
                            <Badge className="gap-1 border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                              <BadgeCheck className="h-3 w-3" /> Verified
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-muted-foreground">
                              Unverified
                            </Badge>
                          )}
                          {tech.activeStatus === "BANNED" && (
                            <Badge variant="destructive">Banned</Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 rounded-lg border bg-muted/40 p-3 text-center text-xs">
                      <div>
                        <p className="flex items-center justify-center gap-1 font-semibold">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          {profile?.averageRating?.toFixed(1) ?? "—"}
                        </p>
                        <p className="mt-0.5 text-muted-foreground">Rating</p>
                      </div>
                      <div>
                        <p className="font-semibold">{profile?.totalReviews ?? 0}</p>
                        <p className="mt-0.5 text-muted-foreground">Reviews</p>
                      </div>
                      <div>
                        <p className="font-semibold">
                          {profile?.hourlyRate != null ? formatCurrency(profile.hourlyRate) : "—"}
                        </p>
                        <p className="mt-0.5 text-muted-foreground">Rate/hr</p>
                      </div>
                    </div>

                    {profile?.skills && profile.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {profile.skills.slice(0, 4).map((skill) => (
                          <Badge key={skill} variant="secondary" className="font-normal">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto flex gap-2 pt-1">
                      <Button
                        size="sm"
                        variant={profile?.isVerified ? "outline" : "default"}
                        className="flex-1"
                        disabled={isBusy || !profile}
                        onClick={() => toggleVerify(tech)}
                      >
                        <BadgeCheck className="mr-1.5 h-4 w-4" />
                        {profile?.isVerified ? "Unverify" : "Verify"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 [--btn-fill:theme(colors.red.600)] border-red-200 text-red-700 dark:border-red-800 dark:text-red-400"
                        disabled={isBusy}
                        onClick={() => toggleBan(tech)}
                      >
                        <ShieldOff className="mr-1.5 h-4 w-4" />
                        {tech.activeStatus === "BANNED" ? "Unban" : "Ban"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default function AdminTechniciansPage() {
  return (
    <ProtectedRoute roles={["ADMIN"]}>
      <TechniciansManagement />
    </ProtectedRoute>
  );
}
