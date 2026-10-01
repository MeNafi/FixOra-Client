"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageLoader, EmptyState } from "@/components/shared/loading";
import { servicesApi, categoriesApi, getErrorMessage } from "@/lib/api";
import type { Service, Category } from "@/types";
import { formatCurrency } from "@/lib/utils/utils";

function MyServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const { register, handleSubmit, reset } = useForm<{
    title: string;
    description?: string;
    price: number;
    durationMinutes?: number;
  }>();

  const load = async () => {
    setLoading(true);
    try {
      const [svc, cat] = await Promise.all([servicesApi.getMyServices(), categoriesApi.getAll()]);
      setServices(svc.data || []);
      setCategories(cat.data || []);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = async (data: { title: string; description?: string; price: number; durationMinutes?: number }) => {
    if (!categoryId) {
      toast.error("Select a category");
      return;
    }
    setSubmitting(true);
    try {
      await servicesApi.create({
        ...data,
        price: Number(data.price),
        durationMinutes: data.durationMinutes ? Number(data.durationMinutes) : undefined,
        categoryId,
      });
      toast.success("Service created");
      setOpen(false);
      reset();
      setCategoryId("");
      load();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    try {
      await servicesApi.delete(id);
      toast.success("Service deleted");
      load();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container flex-1 py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Services</h1>
            <p className="mt-1 text-muted-foreground">Create and manage your offerings</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New service</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onCreate)} className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input {...register("title", { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea {...register("description")} />
                </div>
                <div className="space-y-2">
                  <Label>Price (BDT)</Label>
                  <Input type="number" {...register("price", { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label>Duration (minutes)</Label>
                  <Input type="number" {...register("durationMinutes")} />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={submitting}>
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <PageLoader />
        ) : services.length === 0 ? (
          <EmptyState title="No services yet" description="Create your first service offering" />
        ) : (
          <div className="space-y-3">
            {services.map((s) => (
              <Card key={s.id}>
                <CardHeader className="flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{s.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{s.description}</p>
                    <p className="mt-1 font-medium text-primary">{formatCurrency(s.price)}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(s.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default function TechServicesPage() {
  return (
    <ProtectedRoute roles={["TECHNICIAN"]}>
      <MyServices />
    </ProtectedRoute>
  );
}
