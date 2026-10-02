"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageLoader, EmptyState, CardSkeleton } from "@/components/shared/loading";
import { servicesApi, categoriesApi, getErrorMessage } from "@/lib/api";
import type { Service, Category } from "@/types";
import { formatCurrency } from "@/lib/utils/utils";

function ServicesContent() {
  const searchParams = useSearchParams();
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [svcRes, catRes] = await Promise.all([
          servicesApi.getAll({
            searchTerm: search || undefined,
            category: category || undefined,
            limit: 24,
          }),
          categoriesApi.getAll(),
        ]);
        setServices(svcRes.data || []);
        setCategories(catRes.data || []);
      } catch (err) {
        toast.error(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [search, category]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="mt-1 text-muted-foreground">Find the right service for your home</p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!category ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory("")}
            >
              All
            </Button>
            {categories.map((c) => (
              <Button
                key={c.id}
                variant={category === c.name ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(c.name)}
              >
                {c.name}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : services.length === 0 ? (
          <EmptyState
            title="No services found"
            description="Try adjusting your search or filters"
            action={
              <Button variant="outline" onClick={() => { setSearch(""); setCategory(""); }}>
                Clear filters
              </Button>
            }
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg line-clamp-1">{service.title}</CardTitle>
                      {service.category && (
                        <Badge variant="secondary" className="shrink-0">
                          {service.category.name}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="line-clamp-2">
                      {service.description || "Professional home service"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-primary">{formatCurrency(service.price)}</p>
                    {service.technician?.user && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        by {service.technician.user.name}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/services/${service.id}`}>View details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function ServicesPageFallback() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageLoader />
      <Footer />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<ServicesPageFallback />}>
      <ServicesContent />
    </Suspense>
  );
}

