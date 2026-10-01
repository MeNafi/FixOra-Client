"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Calendar, CreditCard, FolderOpen, Wrench, ArrowRight, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AdminNav } from "@/components/layout/admin-nav";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLoader } from "@/components/shared/loading";
import { adminApi, getErrorMessage } from "@/lib/api";
import type { AdminStats } from "@/types";
import { formatCurrency } from "@/lib/utils/utils";

function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await adminApi.getStats();
        setStats(res.data || {});
      } catch (err) {
        toast.error(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const cards = [
    { label: "Total Users", value: stats?.totalUsers ?? stats?.totalCustomers ?? "—", icon: Users, href: "/admin/users" },
    { label: "Technicians", value: stats?.totalTechnicians ?? "—", icon: Wrench, href: "/admin/technicians" },
    { label: "Bookings", value: stats?.totalBookings ?? "—", icon: Calendar, href: "/admin/bookings" },
    { label: "Revenue", value: stats?.totalRevenue != null ? formatCurrency(stats.totalRevenue) : "—", icon: TrendingUp, href: "/admin/payments" },
  ];

  const managementCards = [
    { title: "User Management", description: "View, ban, and verify users", href: "/admin/users", icon: Users, label: "Manage users" },
    { title: "Technicians", description: "Verify professionals and manage access", href: "/admin/technicians", icon: Wrench, label: "Manage technicians" },
    { title: "Bookings", description: "View all platform bookings", href: "/admin/bookings", icon: Calendar, label: "View bookings" },
    { title: "Payments", description: "Track revenue and transactions", href: "/admin/payments", icon: CreditCard, label: "View payments" },
    { title: "Categories", description: "Create and edit service categories", href: "/admin/categories", icon: FolderOpen, label: "Manage categories" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AdminNav />
      <main className="container flex-1 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Platform overview and management</p>
        </div>

        {loading ? (
          <PageLoader />
        ) : (
          <>
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cards.map((c) => (
                <Card key={c.label}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardDescription>{c.label}</CardDescription>
                    <c.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{c.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {managementCards.map((c) => (
                <Card key={c.href} className="flex flex-col transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{c.title}</CardTitle>
                    <CardDescription>{c.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Button asChild variant="outline">
                      <Link href={c.href}>
                        {c.label} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute roles={["ADMIN"]}>
      <AdminDashboard />
    </ProtectedRoute>
  );
}
